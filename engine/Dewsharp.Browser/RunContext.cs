using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;

namespace Dewsharp;

/// <summary>Thrown inside the learner's program when they press Stop (or the run times out). A learner's own
/// <c>catch (Exception)</c> can catch it, so every later write or read throws it again.</summary>
public sealed class StopRequestedException() : Exception("The program was stopped.");

/// <summary>Thrown by Environment.Exit (through the shim). It ends the program the way the real call ends a
/// process, except that <c>finally</c> blocks run. Like Stop, every later write or read throws it again.</summary>
public sealed class ExitRequestedException(int code) : Exception($"The program called Environment.Exit({code}).")
{
    public int Code { get; } = code;
}

/// <summary>One run's console: streams output to the page, counts it against the cap, reads input, and holds
/// the colours set through the Console shim. The current run is found through an AsyncLocal (see
/// <see cref="Current"/>), so a timer or an await continuation left over from an earlier run writes into that
/// earlier, closed context and its output is dropped (spike_a trap 8).</summary>
sealed class RunContext
{
    static readonly AsyncLocal<RunContext?> _current = new();
    public static RunContext? Current { get => _current.Value; set => _current.Value = value; }
    public static int LateWrites;

    /// <summary>Output beyond this many characters in one run is not shown. The program keeps running.</summary>
    public const int OutputLimit = 1_000_000;
    public const string LimitNote = "\n[The rest of the output is hidden. This program printed more than 1,000,000 characters.]\n";

    readonly bool _silent;         // warm-up runs post nothing
    readonly bool _live;           // live input over the shared buffer; otherwise typed-ahead text
    readonly StringReader? _typed;
    readonly StringBuilder _pending = new();
    string _pendingKind = "out";
    readonly Stopwatch _sinceCheck = new();   // since output was last handed on; not running: never
    int _total;
    bool _limitHit;

    public bool Closed, Stopped;
    public int? ExitCode;          // set by Environment.Exit (through the shim)
    public int Fg = -1, Bg = -1;   // -1: the page's default colours
    public double InputWaitMs;
    public int InputLines;
    public readonly LineReader Reader;
    public readonly Dictionary<int, ValueRecord> Values = new();

    public RunContext(bool silent, bool live, string? stdin)
    {
        _silent = silent;
        _live = live;
        _typed = live ? null : new StringReader(stdin ?? "");
        Reader = new LineReader(this);
    }

    /// <summary>Appends learner output of the given kind (out, err or echo).</summary>
    public void Write(string kind, string? s)
    {
        if (Closed) { LateWrites++; return; }
        if (Stopped || ExitCode != null) throw Ending();
        if (string.IsNullOrEmpty(s)) return;
        if (_limitHit || _total + s.Length > OutputLimit)
        {
            if (!_limitHit)
            {
                _limitHit = true;
                // Keep what fits, so the output ends exactly at the limit.
                var room = OutputLimit - _total;
                if (room > 0) Append(kind, s.Substring(0, room));
                _total = OutputLimit;
                Flush();
                Post("err", LimitNote, flush: true);
            }
            // Nothing more is shown, but Stop must still work: look at the flag every 25 ms.
            if (!_sinceCheck.IsRunning || _sinceCheck.ElapsedMilliseconds >= 25) { _sinceCheck.Restart(); CheckStop(_silent ? 0 : Io.Poll()); }
            return;
        }
        _total += s.Length;
        Append(kind, s);
    }

    void Append(string kind, string s)
    {
        if (_pending.Length > 0 && kind != _pendingKind) Forward(false);
        _pendingKind = kind;
        _pending.Append(s);
        // Hand each finished line, each 1 KB, and anything written after a pause of 25 ms to the worker's
        // JavaScript, which posts to the page at most every 25 ms (web/engine/worker.js). Output is held there,
        // not here, so that it still reaches the page when .NET itself stops (a stack overflow, or
        // System.Environment.Exit), and a prompt written with Console.Write shows while the program works.
        if (_pending.Length >= 1024 || s.Contains('\n') || !_sinceCheck.IsRunning || _sinceCheck.ElapsedMilliseconds >= 25) Forward(false);
    }

    void Forward(bool flush)
    {
        if (_pending.Length == 0) { if (flush) CheckStop(Post(_pendingKind, "", true)); return; }
        var text = _pending.ToString();
        _pending.Clear();
        _sinceCheck.Restart();
        CheckStop(Post(_pendingKind, text, flush));
    }

    /// <summary>Sends everything written so far to the page now. Throws StopRequestedException if the
    /// learner pressed Stop, unless <paramref name="checkStop"/> is false.</summary>
    public void Flush(bool checkStop = true)
    {
        if (_silent || Closed) { _pending.Clear(); return; }
        var text = _pending.ToString();
        _pending.Clear();
        var flag = Io.Write(_pendingKind, text, true);
        if (checkStop) CheckStop(flag);
    }

    int Post(string kind, string text, bool flush) => _silent || Closed ? 0 : Io.Write(kind, text, flush);

    Exception Ending() => ExitCode is int code ? new ExitRequestedException(code) : new StopRequestedException();

    void CheckStop(int flag)
    {
        if (flag == 1) Stopped = true;
        if (Stopped) throw new StopRequestedException();
    }

    /// <summary>Environment.Exit, through the shim: the output so far goes to the page, and the program
    /// ends with this exit code. Every later write or read ends it again, in case a catch caught it.</summary>
    public Exception Exit(int code)
    {
        if (ExitCode == null)
        {
            try { Flush(checkStop: false); } catch { }
            ExitCode = code;
        }
        return new ExitRequestedException(ExitCode.Value);
    }

    /// <summary>A clear or style chunk, from the Console shim.</summary>
    public void Control(string kind, string text)
    {
        if (Closed) return;
        if (Stopped || ExitCode != null) throw Ending();
        Flush();
        CheckStop(Post(kind, text, true));
    }

    public void Clear() => Control("clear", "");

    public void SetColours(int fg, int bg)
    {
        if (fg == Fg && bg == Bg) return;
        Fg = fg; Bg = bg;
        static string Name(int c) => c < 0 ? "null" : "\"" + ((ConsoleColor)c).ToString() + "\"";
        Control("style", "{\"fg\":" + Name(fg) + ",\"bg\":" + Name(bg) + "}");
    }

    /// <summary>Gets the next line of input: from the page (live) or from the typed-ahead text. The line is
    /// echoed into the output, so the output reads like a terminal. Returns null at the end of input.</summary>
    public string? NextLine()
    {
        if (Closed) return null;
        if (Stopped || ExitCode != null) throw Ending();
        Flush();
        string? line;
        if (_live && !_silent)
        {
            var t = Stopwatch.StartNew();
            line = Io.ReadLine();            // blocks the worker until the page answers
            InputWaitMs += t.Elapsed.TotalMilliseconds;
            if (line == Io.StopSentinel) { Stopped = true; throw new StopRequestedException(); }
        }
        else line = _typed?.ReadLine();
        if (line == null) return null;
        InputLines++;
        Write("echo", line + "\n");
        Flush();
        return line;
    }
}

/// <summary>What one input of the comparison gave.</summary>
sealed record ValueRecord(bool Ok, string? Display, string? Error, string? Message, string Kind);

/// <summary>Console.In for every run. ReadLine is what learners use; Read and Peek take a line at a time and
/// hand it out character by character. (The Console.In getter throws on browser-wasm, but SetIn works:
/// spike_a trap 3.)</summary>
sealed class LineReader(RunContext ctx) : TextReader
{
    string? _buf; int _pos; bool _eof;

    bool Fill()
    {
        if (_buf != null && _pos < _buf.Length) return true;
        if (_eof) return false;
        var s = ctx.NextLine();
        if (s == null) { _eof = true; _buf = null; return false; }
        _buf = s + "\n"; _pos = 0;
        return true;
    }

    public override string? ReadLine()
    {
        if (_buf != null && _pos < _buf.Length)
        {
            var rest = _buf.Substring(_pos, _buf.Length - _pos - 1);
            _buf = null;
            return rest;
        }
        if (_eof) return null;
        var s = ctx.NextLine();
        if (s == null) _eof = true;
        return s;
    }

    public override int Peek() => Fill() ? _buf![_pos] : -1;
    public override int Read() => Fill() ? _buf![_pos++] : -1;

    public override string ReadToEnd()
    {
        var sb = new StringBuilder();
        string? l;
        while ((l = ReadLine()) != null) sb.Append(l).Append('\n');
        return sb.ToString();
    }
}

/// <summary>Console.Out and Console.Error. Installed once; each write goes to the current run.</summary>
sealed class Router(string kind) : TextWriter
{
    public override Encoding Encoding => Encoding.UTF8;
    public override void Write(char value) => RunContext.Current?.Write(kind, value.ToString());
    public override void Write(string? value) => RunContext.Current?.Write(kind, value);
    public override void Write(char[] buffer, int index, int count) => RunContext.Current?.Write(kind, new string(buffer, index, count));
    public override void Write(ReadOnlySpan<char> buffer) => RunContext.Current?.Write(kind, buffer.ToString());
    public override void WriteLine() => RunContext.Current?.Write(kind, "\n");
    public override void WriteLine(string? value) => RunContext.Current?.Write(kind, value + "\n");
    public override void WriteLine(ReadOnlySpan<char> buffer) => RunContext.Current?.Write(kind, buffer.ToString() + "\n");
}
