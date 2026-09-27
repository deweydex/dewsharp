using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Loader;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;

// The app's own Main does nothing; the page drives everything through [JSExport]s.
Console.WriteLine("CsRunner runtime started");

public static partial class Runner
{
    static IReadOnlyList<MetadataReference>? _refs;
    static int _runCounter;
    static string _lineInfo = "none"; // where the last formatted stack trace got file:line from

    static IReadOnlyList<MetadataReference> Refs =>
        _refs ??= Basic.Reference.Assemblies.Net100.References.All.Cast<MetadataReference>().ToList();

    static readonly string[] ImplicitUsings = {
        "System", "System.Collections.Generic", "System.IO", "System.Linq",
        "System.Net.Http", "System.Threading", "System.Threading.Tasks" };

    /// <summary>Compile the given files as one console program and run it.
    /// Returns a JSON object: { ok, phase, diagnostics[], stdout, stderr, exitCode, timings{} }.</summary>
    [JSExport]
    public static async Task<string> CompileAndRun(string[] names, string[] texts, string stdin, bool implicitUsings, bool collectible, bool emitPdb, bool interactive)
    {
        var sw = Stopwatch.StartNew();
        var timings = new Dictionary<string, double>();
        void Mark(string k) { timings[k] = sw.Elapsed.TotalMilliseconds; }

        var parseOpts = new CSharpParseOptions(LanguageVersion.Latest, DocumentationMode.None, SourceCodeKind.Regular);
        var trees = new List<SyntaxTree>();
        for (int i = 0; i < names.Length; i++)
        {
            // Roslyn creates a Task.Run(checksum) per syntax tree that has a FilePath and later blocks on
            // .Result while writing the PDB (Microsoft.Cci.DebugSourceDocument). The single-threaded browser
            // runtime cannot block ("Cannot wait on monitors on this runtime"), so when emitting a PDB we give
            // the tree NO path and map it back to the student's file name with a #line directive instead.
            // Diagnostics use GetMappedLineSpan, so file names and line numbers stay correct.
            var text = emitPdb ? $"#line 1 \"{names[i]}\"\n{texts[i]}" : texts[i];
            trees.Add(CSharpSyntaxTree.ParseText(SourceText.From(text, Encoding.UTF8), parseOpts, path: emitPdb ? "" : names[i]));
        }
        if (implicitUsings)
            trees.Add(CSharpSyntaxTree.ParseText(
                SourceText.From(string.Concat(ImplicitUsings.Select(u => $"global using global::{u};\n")), Encoding.UTF8), parseOpts, path: emitPdb ? "" : "GlobalUsings.g.cs"));
        Mark("parse");
        var refs = Refs;
        Mark("refs");

        var asmName = "UserProgram" + (++_runCounter);
        var comp = CSharpCompilation.Create(asmName, trees, refs,
            new CSharpCompilationOptions(OutputKind.ConsoleApplication,
                optimizationLevel: OptimizationLevel.Debug,
                nullableContextOptions: NullableContextOptions.Enable,
                concurrentBuild: false));

        using var pe = new MemoryStream();
        using var pdb = new MemoryStream();
        var emit = emitPdb
            ? comp.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb))
            : comp.Emit(pe);
        Mark("compile_emit");

        var diags = emit.Diagnostics
            .Where(d => d.Severity >= DiagnosticSeverity.Warning)
            .Select(d => {
                var span = d.Location.GetMappedLineSpan();
                return new Diag(d.Severity.ToString(), d.Id, span.Path ?? "", span.StartLinePosition.Line + 1,
                    span.StartLinePosition.Character + 1, d.GetMessage());
            }).ToList();

        if (!emit.Success)
            return Result(false, "compile", diags, "", "", -1, timings);

        var outW = new StringWriter();
        var errW = new StringWriter();
        // Console output is routed by an AsyncLocal "current run". Timers, Task.Run and await continuations
        // capture the ExecutionContext, so a callback started by run N still writes to run N's (closed) sink
        // instead of appearing in run N+1's output. Late writes are counted, not shown.
        var ctx = new RunContext(outW, errW, interactive);
        EnsureRouter();
        // Note: the Console.In getter throws PlatformNotSupportedException on browser-wasm, but SetIn works.
        // Interactive runs read from the page: JsLineReader.ReadLine flushes pending output and then calls a
        // synchronous JS function that blocks the worker (Atomics.wait or a sync XHR) until the learner types.
        Console.SetIn(interactive ? new JsLineReader(ctx) : new StringReader(stdin));
        _current.Value = ctx;
        int exit = 0;
        try
        {
            Assembly asm;
            if (collectible)
            {
                var alc = new AssemblyLoadContext(asmName, isCollectible: true);
                pe.Position = 0; pdb.Position = 0;
                asm = alc.LoadFromStream(pe, emitPdb ? pdb : null);
            }
            else
            {
                asm = emitPdb ? Assembly.Load(pe.ToArray(), pdb.ToArray()) : Assembly.Load(pe.ToArray());
            }
            Mark("load");
            var entry = asm.EntryPoint ?? throw new InvalidOperationException("no entry point");
            // For an async Main (or top-level statements that use await) the compiler emits a synchronous
            // wrapper "<Main>" that calls .GetAwaiter().GetResult() on the real async method. Blocking like that
            // throws "Cannot wait on monitors on this runtime" in single-threaded wasm, so call the async method
            // ("<Main>$" for top-level statements, "Main" otherwise) directly and await it.
            if (entry.Name == "<Main>")
            {
                var real = entry.DeclaringType!.GetMethods(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                    .FirstOrDefault(m => m != entry && (m.Name == "<Main>$" || m.Name == "Main") && typeof(Task).IsAssignableFrom(m.ReturnType));
                if (real != null) entry = real;
            }
            object?[]? args = entry.GetParameters().Length == 1 ? new object?[] { Array.Empty<string>() } : null;
            object? ret;
            try
            {
                ret = entry.Invoke(null, args);
                if (ret is Task t) { await t; ret = (t as Task<int>)?.Result; }
                if (ret is int code) exit = code;
            }
            catch (Exception e)
            {
                var ex = e is TargetInvocationException tie && tie.InnerException != null ? tie.InnerException : e;
                if (ex is StopRequestedException) { ctx.Stopped = true; exit = 130; }
                else
                {
                    ctx.Append(true, "Unhandled exception. " + FormatException(ex, asm, emitPdb ? pdb.ToArray() : null) + "\n", checkStop: false);
                    exit = unchecked((int)0xE0434352);
                }
            }
        }
        finally
        {
            ctx.Flush(checkStop: false);
            ctx.Closed = true;
            _current.Value = null;
            Console.SetIn(TextReader.Null);
        }
        Mark("run");
        timings["inputWaitMs"] = Math.Round(ctx.InputWaitMs, 1);
        timings["inputLines"] = ctx.InputLines;
        timings["flushes"] = ctx.Flushes;
        return Result(true, ctx.Stopped ? "stopped" : "run", diags, outW.ToString(), errW.ToString(), exit, timings);
    }

    /// <summary>Format an exception like the .NET console host does, but (a) stop at the runner's own frames
    /// and (b) add "in File.cs:line N" for the student's frames by reading the portable PDB ourselves,
    /// because the browser runtime does not do it by default.</summary>
    static string FormatException(Exception ex, Assembly userAsm, byte[]? pdbBytes)
    {
        MetadataReaderProvider? prov = pdbBytes != null ? MetadataReaderProvider.FromPortablePdbImage(System.Collections.Immutable.ImmutableArray.Create(pdbBytes)) : null;
        var reader = prov?.GetMetadataReader();
        var sb = new StringBuilder();
        _lineInfo = "none";
        void Append(Exception e, bool inner)
        {
            if (inner) sb.Append(" ---> ");
            sb.Append(e.GetType().FullName).Append(": ").Append(e.Message);
            if (e.InnerException != null) { Append(e.InnerException, true); sb.AppendLine().Append("   --- End of inner exception stack trace ---"); }
            var st = new StackTrace(e, true);
            foreach (var f in st.GetFrames())
            {
                var m = f.GetMethod();
                if (m == null) continue;
                var owner = m.DeclaringType; while (owner?.DeclaringType != null) owner = owner.DeclaringType;
                if (owner == typeof(Runner) || owner?.FullName?.StartsWith("System.Reflection.") == true) break;
                // Frames that only rethrow across an await: .NET prints a separator line instead.
                if (owner?.Namespace is "System.Runtime.ExceptionServices" or "System.Runtime.CompilerServices") continue;
                sb.AppendLine().Append("   at ").Append(m.DeclaringType?.FullName).Append('.').Append(m.Name)
                  .Append('(').Append(string.Join(", ", m.GetParameters().Select(p => p.ParameterType.Name + " " + p.Name))).Append(')');
                string? file = f.GetFileName(); int line = f.GetFileLineNumber();
                if (file != null) _lineInfo = "runtime";
                else if (reader != null && m.Module.Assembly == userAsm) _lineInfo = "pdb-lookup";
                if (file == null && reader != null && m.Module.Assembly == userAsm && f.GetILOffset() >= 0)
                    (file, line) = Lookup(reader, m.MetadataToken, f.GetILOffset());
                if (file != null) sb.Append(" in ").Append(file).Append(":line ").Append(line);
            }
        }
        Append(ex, false);
        prov?.Dispose();
        return sb.ToString();
    }

    static (string?, int) Lookup(MetadataReader reader, int methodToken, int ilOffset)
    {
        try
        {
            var handle = MetadataTokens.MethodDefinitionHandle(methodToken & 0xFFFFFF);
            var info = reader.GetMethodDebugInformation(handle.ToDebugInformationHandle());
            SequencePoint? best = null;
            foreach (var sp in info.GetSequencePoints())
            {
                if (sp.IsHidden) continue;
                if (sp.Offset > ilOffset) break;
                best = sp;
            }
            if (best is SequencePoint b)
                return (reader.GetString(reader.GetDocument(b.Document).Name), b.StartLine);
        }
        catch { }
        return (null, 0);
    }

    [JSExport]
    public static string Memory()
    {
        var gc = GC.GetGCMemoryInfo();
        return $"{{\"totalMemory\":{GC.GetTotalMemory(false)},\"heapSize\":{gc.HeapSizeBytes},\"runs\":{_runCounter}}}";
    }

    [JSExport]
    public static string Collect()
    {
        GC.Collect(); GC.WaitForPendingFinalizers(); GC.Collect();
        return Memory();
    }

    static readonly AsyncLocal<RunContext?> _current = new();
    static bool _routerInstalled;
    static void EnsureRouter()
    {
        if (_routerInstalled) return;
        Console.SetOut(new Router(false)); Console.SetError(new Router(true));
        _routerInstalled = true;
    }

    /// <summary>One run's console. Keeps the full transcript (returned in the result) and, for interactive
    /// runs, streams output to the page: pending text is posted when a line ends and 25 ms have passed since
    /// the last post, when 4 KB have piled up, when the stream switches between stdout and stderr, before
    /// every read, and at the end of the run. Each post also tells us whether the learner pressed Stop.</summary>
    sealed class RunContext(StringWriter o, StringWriter e, bool stream)
    {
        public static int LateWrites;
        public bool Closed, Stopped;
        public int InputLines, Flushes;
        public double InputWaitMs;
        readonly StringBuilder _pending = new();
        bool _pendingErr;
        readonly Stopwatch _sinceFlush = Stopwatch.StartNew();

        /// <summary>Output beyond this many characters per run is dropped (a runaway print loop would otherwise
        /// flood the page and grow wasm memory without bound). The program keeps running until Stop.</summary>
        public const int OutputLimit = 1_000_000;
        int _total;
        bool _limitHit;

        public void Append(bool err, string? s, bool checkStop = true)
        {
            if (Closed) { LateWrites++; return; }
            if (string.IsNullOrEmpty(s)) return;
            if (_total + s.Length > OutputLimit)
            {
                if (!_limitHit)
                {
                    _limitHit = true;
                    const string note = "\n[Output limit reached: anything more this program prints is hidden.]\n";
                    e.Write(note);
                    if (stream) { if (_pending.Length > 0 && !_pendingErr) Flush(checkStop); _pendingErr = true; _pending.Append(note); Flush(checkStop); }
                }
                // Still give Stop a chance, at most every 25 ms.
                if (stream && checkStop && _sinceFlush.ElapsedMilliseconds >= 25) Flush(checkStop);
                return;
            }
            _total += s.Length;
            (err ? e : o).Write(s);
            if (!stream) return;
            if (_pending.Length > 0 && err != _pendingErr) Flush(checkStop);
            _pendingErr = err;
            _pending.Append(s);
            // Post when a line has ended and 25 ms have passed, or when 64 KB have piled up.
            if (_pending.Length >= 65536 || (_sinceFlush.ElapsedMilliseconds >= 25 && s.Contains('\n'))) Flush(checkStop);
        }

        /// <summary>Post pending output to the page. Throws StopRequestedException if the learner pressed Stop
        /// (checked on every flush, so a program that keeps printing can be stopped without killing the worker).</summary>
        public void Flush(bool checkStop = true)
        {
            if (!stream || Closed) return;
            var text = _pending.ToString();
            _pending.Clear();
            _sinceFlush.Restart();
            Flushes++;
            int status = Io.Write(text, _pendingErr);
            if (status == 1 && checkStop) throw new StopRequestedException();
        }

        public string? ReadLine()
        {
            Flush();
            var t = Stopwatch.StartNew();
            string? line = Io.ReadLine();   // blocks the worker until the page answers
            InputWaitMs += t.Elapsed.TotalMilliseconds;
            if (line == "\u0003STOP") throw new StopRequestedException();
            if (line != null) { InputLines++; o.Write(line + "\n"); } // the transcript echoes what was typed, as a terminal would
            _sinceFlush.Restart();
            return line;
        }
    }

    sealed class StopRequestedException() : Exception("Stopped by the learner.");

    /// <summary>Console.In for interactive runs. ReadLine is the path students use; Read/Peek are built on it
    /// a line at a time. Console.ReadKey is not routed through Console.In and still throws on browser-wasm.</summary>
    sealed class JsLineReader(RunContext ctx) : TextReader
    {
        string? _buf; int _pos; bool _eof;
        bool Fill()
        {
            if (_buf != null && _pos < _buf.Length) return true;
            if (_eof) return false;
            var s = ctx.ReadLine();
            if (s == null) { _eof = true; _buf = null; return false; }
            _buf = s + "\n"; _pos = 0; return true;
        }
        public override string? ReadLine()
        {
            if (_buf != null && _pos < _buf.Length) { var rest = _buf.Substring(_pos).TrimEnd('\n'); _buf = null; return rest; }
            if (_eof) return null;
            var s = ctx.ReadLine();
            if (s == null) _eof = true;
            return s;
        }
        public override int Peek() => Fill() ? _buf![_pos] : -1;
        public override int Read() => Fill() ? _buf![_pos++] : -1;
        public override string ReadToEnd() { var sb = new StringBuilder(); string? l; while ((l = ReadLine()) != null) sb.Append(l).Append('\n'); return sb.ToString(); }
    }

    sealed class Router(bool err) : TextWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
        RunContext? Ctx => _current.Value;
        public override void Write(char value) { if (Ctx is { } c) c.Append(err, value.ToString()); }
        public override void Write(string? value) { if (Ctx is { } c) c.Append(err, value); }
        public override void Write(char[] buffer, int index, int count) { if (Ctx is { } c) c.Append(err, new string(buffer, index, count)); }
        public override void WriteLine(string? value) { if (Ctx is { } c) c.Append(err, value + "\n"); }
        public override void WriteLine() { if (Ctx is { } c) c.Append(err, "\n"); }
    }

    record Diag(string severity, string id, string file, int line, int col, string message);

    static string Result(bool ok, string phase, List<Diag> diags, string stdout, string stderr, int exit, Dictionary<string, double> timings)
    {
        using var ms = new MemoryStream();
        using (var w = new Utf8JsonWriter(ms))
        {
            w.WriteStartObject();
            w.WriteBoolean("ok", ok);
            w.WriteString("phase", phase);
            w.WriteStartArray("diagnostics");
            foreach (var d in diags)
            {
                w.WriteStartObject();
                w.WriteString("severity", d.severity); w.WriteString("id", d.id); w.WriteString("file", d.file);
                w.WriteNumber("line", d.line); w.WriteNumber("col", d.col); w.WriteString("message", d.message);
                w.WriteEndObject();
            }
            w.WriteEndArray();
            w.WriteString("stdout", stdout);
            w.WriteString("stderr", stderr);
            w.WriteNumber("exitCode", exit);
            w.WriteString("lineInfo", _lineInfo);
            w.WriteNumber("lateWritesDroppedSoFar", RunContext.LateWrites);
            w.WriteStartObject("timings");
            foreach (var kv in timings) w.WriteNumber(kv.Key, Math.Round(kv.Value, 1));
            w.WriteEndObject();
            w.WriteEndObject();
        }
        return Encoding.UTF8.GetString(ms.ToArray());
    }
}

/// <summary>Synchronous calls into the worker's JavaScript (worker.js defines globalThis.__csio).</summary>
static partial class Io
{
    /// <summary>Blocks until the page sends a line; null means end of input.</summary>
    [JSImport("globalThis.__csio.readLine")] internal static partial string? ReadLine();
    /// <summary>Posts output to the page; returns 1 if the learner has pressed Stop, else 0.</summary>
    [JSImport("globalThis.__csio.write")] internal static partial int Write(string text, bool err);
}
