using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;

namespace Dewsharp;

/// <summary>What the worker calls. Requests and results are JSON strings; their shapes are the ones in
/// docs/ENGINE_API.md (the worker adds nothing but the output chunks, which arrive through Io.Write).</summary>
public static partial class Engine
{
    /// <summary>The compiler settings of docs/LESSON_FORMAT.md, "Compiler settings". The exported Visual
    /// Studio project must match these (C# 14, .NET 10, implicit usings, nullable off, warning level 10).</summary>
    public static readonly CSharpParseOptions ParseOptions = new(LanguageVersion.CSharp14, DocumentationMode.None, SourceCodeKind.Regular,
        preprocessorSymbols: new[] { "DEBUG", "TRACE", "NET", "NET10_0", "NETCOREAPP",
            "NET5_0_OR_GREATER", "NET6_0_OR_GREATER", "NET7_0_OR_GREATER", "NET8_0_OR_GREATER", "NET9_0_OR_GREATER", "NET10_0_OR_GREATER",
            "NETCOREAPP3_1_OR_GREATER", "NETCOREAPP3_0_OR_GREATER" });

    static readonly string[] ImplicitUsings = {
        "System", "System.Collections.Generic", "System.IO", "System.Linq",
        "System.Net.Http", "System.Threading", "System.Threading.Tasks" };

    static IReadOnlyList<MetadataReference>? _bcl;
    static IReadOnlyList<MetadataReference> Bcl =>
        _bcl ??= Basic.Reference.Assemblies.Net100.References.All.Cast<MetadataReference>().ToList();
    static List<MetadataReference>? _refs;
    static SyntaxTree? _globalUsings;
    static int _runs;
    static bool _routerInstalled;

    public const string Culture = "en-IE";

    /// <summary>Called once, right after the runtime starts.</summary>
    [JSExport]
    public static string Boot()
    {
        var ie = new CultureInfo(Culture);
        CultureInfo.DefaultThreadCurrentCulture = ie;
        CultureInfo.DefaultThreadCurrentUICulture = ie;
        CultureInfo.CurrentCulture = ie;
        CultureInfo.CurrentUICulture = ie;
        if (!_routerInstalled)
        {
            Console.SetOut(new Router("out"));
            Console.SetError(new Router("err"));
            _routerInstalled = true;
        }
        return "{\"culture\":\"" + CultureInfo.CurrentCulture.Name + "\",\"framework\":\"" + System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription + "\"}";
    }

    static void EnsureCompiler()
    {
        if (_refs != null) return;
        Shim.Build(Bcl, ParseOptions);
        _refs = Bcl.Append(Shim.Reference).ToList();
        var usings = string.Concat(ImplicitUsings.Select(u => $"global using global::{u};\n")) + Shim.ConsoleAlias + "\n";
        _globalUsings = CSharpSyntaxTree.ParseText(SourceText.From("#line hidden\n" + usings, Encoding.UTF8), ParseOptions, path: "");
    }

    /// <summary>The warm-up: builds the Console shim, then compiles and runs two small programs with their
    /// output thrown away, so that the learner's first Run doesn't pay for Roslyn starting cold.</summary>
    [JSExport]
    public static async Task<string> Warm()
    {
        var sw = Stopwatch.StartNew();
        EnsureCompiler();
        var shimMs = sw.Elapsed.TotalMilliseconds;
        var cells = new List<CellInput> {
            new("warm-types", null, "public class Warm\n{\n    public string Name { get; set; } = \"\";\n    public override string ToString() => $\"{Name} ({Name.Length})\";\n}\n"),
            new("warm-run", null, "var list = new List<Warm> { new Warm { Name = \"a\" } };\nforeach (var w in list.Where(x => x.Name.Length > 0)) Console.WriteLine($\"{w} {1.5:F1}\");\nstring? line = Console.ReadLine();\nint Twice(int n) => n * 2;\nConsole.WriteLine(Twice(2));\n"),
        };
        await RunCore(new Request(cells, "run", "", new[] { "Twice(3)" }, false), silent: true);
        var throwing = new List<CellInput> { new("warm-throw", null, "int[] a = new int[1];\nConsole.WriteLine(a[2]);\n") };
        await RunCore(new Request(throwing, "run", "", null, false), silent: true);
        await RunCore(new Request(cells.Take(1).ToList(), "check", null, null, false), silent: true);
        return "{\"shimMs\":" + Math.Round(shimMs) + ",\"warmMs\":" + Math.Round(sw.Elapsed.TotalMilliseconds) + "}";
    }

    /// <summary>Each cell's kind, from a syntax-only parse. Input: [{id, code}]. Output: {id: kind}.</summary>
    [JSExport]
    public static string Classify(string cellsJson)
    {
        using var doc = JsonDocument.Parse(cellsJson);
        using var ms = new MemoryStream();
        using (var w = new Utf8JsonWriter(ms))
        {
            w.WriteStartObject();
            foreach (var c in doc.RootElement.EnumerateArray())
                w.WriteString(c.GetProperty("id").GetString()!, Assembler.KindOf(Assembler.Parse(c.GetProperty("code").GetString() ?? "", ParseOptions)));
            w.WriteEndObject();
        }
        return Encoding.UTF8.GetString(ms.ToArray());
    }

    [JSExport]
    public static string Memory()
    {
        return "{\"managedBytes\":" + GC.GetTotalMemory(false) + ",\"runs\":" + _runs + ",\"lateWrites\":" + RunContext.LateWrites + "}";
    }

    sealed record Request(List<CellInput> Cells, string Mode, string? Stdin, string[]? Inputs, bool Live);

    /// <summary>Runs or checks the cells. See docs/ENGINE_API.md for the request and the result.</summary>
    [JSExport]
    public static async Task<string> Run(string requestJson)
    {
        Request req;
        try
        {
            using var doc = JsonDocument.Parse(requestJson);
            var r = doc.RootElement;
            var cells = r.GetProperty("cells").EnumerateArray().Select(c => new CellInput(
                c.GetProperty("id").GetString() ?? "",
                c.TryGetProperty("file", out var f) && f.ValueKind == JsonValueKind.String ? f.GetString() : null,
                c.TryGetProperty("code", out var code) ? code.GetString() ?? "" : "")).ToList();
            if (cells.Count == 0) throw new ArgumentException("run needs at least one cell");
            string mode = r.TryGetProperty("mode", out var m) && m.ValueKind == JsonValueKind.String ? m.GetString()! : "run";
            string? stdin = r.TryGetProperty("stdin", out var s) && s.ValueKind == JsonValueKind.String ? s.GetString() : null;
            string[]? inputs = r.TryGetProperty("inputs", out var ins) && ins.ValueKind == JsonValueKind.Array
                ? ins.EnumerateArray().Select(x => x.GetString() ?? "").ToArray() : null;
            bool live = r.TryGetProperty("live", out var l) && l.ValueKind == JsonValueKind.True;
            req = new Request(cells, mode, stdin, inputs, live);
        }
        catch (Exception e) { return HostError("The request was not understood: " + e.Message); }
        try { return await RunCore(req, silent: false); }
        catch (Exception e) { return HostError(e.GetType().Name + ": " + e.Message + "\n" + e.StackTrace); }
    }

    static string HostError(string detail)
    {
        var w = new Json();
        w.Obj(() => { w.Str("outcome", "host-error"); w.Str("detail", detail); });
        return w.ToString();
    }

    sealed record Diag(string Severity, string Code, string Message, string? CellId, string? File, int Line, int Column, int EndLine, int EndColumn, string? Help);

    static async Task<string> RunCore(Request req, bool silent)
    {
        var total = Stopwatch.StartNew();
        EnsureCompiler();
        var cells = req.Cells;
        var inputErrors = new Dictionary<int, ValueRecord>();
        bool check = req.Mode == "check";
        var inputs = check ? null : req.Inputs;
        var program = Assembler.Build(cells, inputs, ParseOptions, inputErrors);
        bool runnable = !check && program.IsProgram;

        (string cellId, string file)? CellOf(string key)
        {
            if (key.StartsWith("cell:") && int.TryParse(key.AsSpan(5), out var i) && i >= 0 && i < cells.Count)
                return (cells[i].Id, program.FileNames[i]);
            return null;
        }

        CSharpCompilation Compile(AssembledProgram p) => CSharpCompilation.Create("LearnerProgram" + (++_runs),
            p.Files.Select(f => f.Tree).Prepend(_globalUsings!), _refs,
            new CSharpCompilationOptions(runnable ? OutputKind.ConsoleApplication : OutputKind.DynamicallyLinkedLibrary,
                optimizationLevel: OptimizationLevel.Debug,
                nullableContextOptions: NullableContextOptions.Disable,
                warningLevel: 10,
                concurrentBuild: false,
                deterministic: true,
                specificDiagnosticOptions: new Dictionary<string, ReportDiagnostic> {
                    ["CS1701"] = ReportDiagnostic.Suppress, ["CS1702"] = ReportDiagnostic.Suppress,
                    // The inputs of a comparison start the program when the target has only a Main.
                    ["CS7022"] = program.InputsInOwnFile ? ReportDiagnostic.Suppress : ReportDiagnostic.Default,
                }));

        var comp = Compile(program);
        var pe = new MemoryStream();
        var pdb = new MemoryStream();
        IEnumerable<Diagnostic> raw;
        bool emitted = false;
        if (!runnable)
            raw = comp.GetDiagnostics();
        else
        {
            var emit = comp.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb));
            raw = emit.Diagnostics;
            emitted = emit.Success;
            // An error inside one input belongs to that input alone: note it, leave the input out, compile again.
            if (!emit.Success && program.InputSpans.Count > 0)
            {
                bool any = false;
                foreach (var d in emit.Diagnostics.Where(d => d.Severity == DiagnosticSeverity.Error))
                {
                    var input = InputAt(program, d);
                    if (input < 0 || inputErrors.ContainsKey(input)) continue;
                    var span = d.Location.GetMappedLineSpan();
                    inputErrors[input] = new ValueRecord(false, null, d.Id, d.GetMessage(CultureInfo.InvariantCulture), "compile-error");
                    any = true;
                }
                if (any)
                {
                    program = Assembler.Build(cells, inputs, ParseOptions, inputErrors);
                    comp = Compile(program);
                    pe = new MemoryStream(); pdb = new MemoryStream();
                    var again = comp.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb));
                    raw = again.Diagnostics;
                    emitted = again.Success;
                }
            }
        }

        var diags = new List<Diag>();
        foreach (var d in raw)
        {
            if (d.Severity < DiagnosticSeverity.Warning || d.IsSuppressed) continue;
            if (InputAt(program, d) >= 0) continue;
            var span = d.Location.GetMappedLineSpan();
            var cell = span.HasMappedPath ? CellOf(span.Path) : null;
            if (d.Location.IsInSource && cell == null && d.Severity == DiagnosticSeverity.Warning) continue;   // from the engine's own lines
            diags.Add(new Diag(d.Severity == DiagnosticSeverity.Error ? "error" : "warning", d.Id, d.GetMessage(CultureInfo.InvariantCulture),
                cell?.cellId, cell?.file,
                span.StartLinePosition.Line + 1, span.StartLinePosition.Character + 1,
                span.EndLinePosition.Line + 1, span.EndLinePosition.Character + 1,
                Help(d, program, cells)));
        }
        // Errors first, then warnings; each group in cell order, then line order.
        var cellOrder = cells.Select((c, i) => (c.Id, i)).GroupBy(x => x.Id).ToDictionary(g => g.Key, g => g.First().i);
        diags = diags.OrderBy(d => d.Severity == "error" ? 0 : 1)
                     .ThenBy(d => d.CellId != null && cellOrder.TryGetValue(d.CellId, out var o) ? o : int.MaxValue)
                     .ThenBy(d => d.Line).ThenBy(d => d.Column).ToList();
        bool errors = diags.Any(d => d.Severity == "error");
        var compileMs = total.Elapsed.TotalMilliseconds;

        void WriteHead(Json w)
        {
            w.Key("kind"); w.Obj(() => { for (int i = 0; i < cells.Count; i++) w.Str(cells[i].Id, program.Kinds[i]); });
            w.Key("files"); w.Obj(() => { for (int i = 0; i < cells.Count; i++) w.Str(cells[i].Id, program.FileNames[i]); });
            w.Key("diagnostics"); w.Arr(() =>
            {
                foreach (var d in diags) w.Obj(() =>
                {
                    w.Str("severity", d.Severity); w.Str("code", d.Code); w.Str("message", d.Message);
                    w.Str("cellId", d.CellId); w.Str("file", d.File);
                    w.Num("line", d.Line); w.Num("column", d.Column); w.Num("endLine", d.EndLine); w.Num("endColumn", d.EndColumn);
                    if (d.Help != null) w.Str("help", d.Help);
                });
            });
            w.Key("replaced"); w.Arr(() =>
            {
                foreach (var r in program.Replaced) w.Obj(() => { w.Str("type", r.Type); w.Str("cellId", r.CellId); w.Str("by", r.ByCellId); });
            });
        }

        string outcome;
        ExceptionInfo? exception = null;
        int? exitCode = null;
        double runMs = 0;
        RunContext? ctx = null;
        bool ran = false;
        if (errors) outcome = "compile-error";
        else if (!runnable || !emitted) outcome = "ok";
        else
        {
            ran = true;
            ctx = new RunContext(silent, req.Live && !silent, req.Stdin);
            var runClock = Stopwatch.StartNew();
            string head = "";
            if (!silent) { var hw = new Json(); hw.Obj(() => WriteHead(hw)); head = hw.ToString(); }
            (outcome, exception, exitCode) = await Execute(pe.ToArray(), pdb.ToArray(), ctx, silent, CellOf, head);
            runMs = runClock.Elapsed.TotalMilliseconds;
        }

        var w = new Json();
        w.Obj(() =>
        {
            w.Str("outcome", outcome);
            w.Bool("ran", ran);
            WriteHead(w);
            if (exception != null) { w.Key("exception"); WriteException(w, exception); }
            if (exitCode is int code) w.Num("exitCode", code); else w.Null("exitCode");
            if (inputs != null)
            {
                w.Key("values"); w.Arr(() =>
                {
                    for (int i = 0; i < inputs.Length; i++)
                    {
                        ValueRecord? v = inputErrors.TryGetValue(i, out var e) ? e : ctx != null && ctx.Values.TryGetValue(i, out var got) ? got : null;
                        w.Obj(() =>
                        {
                            if (v == null) { w.Bool("ok", false); w.Str("kind", "not-run"); w.Null("error"); return; }
                            w.Bool("ok", v.Ok);
                            w.Str("kind", v.Kind);
                            if (v.Ok) w.Str("display", v.Display);
                            else { w.Str("error", v.Error); w.Str("message", v.Message); }
                        });
                    }
                });
            }
            w.Key("timings"); w.Obj(() =>
            {
                w.Num("compileMs", Math.Round(compileMs, 1)); w.Num("runMs", Math.Round(runMs, 1));
                if (ctx != null) { w.Num("inputWaitMs", Math.Round(ctx.InputWaitMs, 1)); w.Num("inputLines", ctx.InputLines); }
            });
        });
        return w.ToString();
    }

    static int InputAt(AssembledProgram p, Diagnostic d)
    {
        if (!d.Location.IsInSource) return -1;
        var tree = d.Location.SourceTree;
        var file = p.Files.FirstOrDefault(f => f.Tree == tree);
        if (file == null) return -1;
        int pos = d.Location.SourceSpan.Start;
        foreach (var (index, (start, end, key)) in p.InputSpans)
            if (key == file.Key && pos >= start && pos < end) return index;
        return -1;
    }

    /// <summary>A plain sentence under a compiler message, for the two mistakes the rules of the road cause.</summary>
    static string? Help(Diagnostic d, AssembledProgram p, List<CellInput> cells)
    {
        if (d.Severity != DiagnosticSeverity.Error) return null;
        var msg = d.GetMessage(CultureInfo.InvariantCulture);
        if (p.DeclaresProgram && msg.Contains("'Program'"))
            return "Give your class a name other than Program. The statements in the cell already make a class called Program.";
        if (d.Id == "CS0103" && d.Location.IsInSource)
        {
            var name = d.Location.SourceTree!.GetText().ToString(d.Location.SourceSpan);
            if (p.VariablesAbove.Contains(name))
                return $"{name} was made in a cell above. Variables stay in their cell, so make it again in this cell.";
        }
        return null;
    }

    static void WriteException(Json w, ExceptionInfo e) => w.Obj(() =>
    {
        w.Str("type", e.Type); w.Str("message", e.Message);
        w.Key("frames"); w.Arr(() =>
        {
            foreach (var f in e.Frames) w.Obj(() => { w.Str("cellId", f.CellId); w.Str("file", f.File); w.Num("line", f.Line); w.Str("member", f.Member); });
        });
        w.Str("trace", e.Trace);
        if (e.Inner != null) { w.Key("inner"); WriteException(w, e.Inner); }
    });

    /// <summary>Loads the learner's assembly and runs its entry point.</summary>
    static async Task<(string outcome, ExceptionInfo? exception, int? exitCode)> Execute(byte[] pe, byte[] pdb, RunContext ctx, bool silent,
        Func<string, (string, string)?> cellOf, string head)
    {
        System.Reflection.Assembly asm;
        asm = System.Reflection.Assembly.Load(pe, pdb);
        var entry = asm.EntryPoint!;
        // For an async Main, or top-level statements with await, the compiler adds a synchronous wrapper <Main>
        // that blocks on the task. The single-threaded runtime can't block ("Cannot wait on monitors on this
        // runtime"), so call the real async method and await it (spike_a trap 4).
        if (entry.Name == "<Main>")
        {
            var real = entry.DeclaringType!.GetMethods(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                .FirstOrDefault(m => m != entry && (m.Name == "<Main>$" || m.Name == "Main") && typeof(Task).IsAssignableFrom(m.ReturnType));
            if (real != null) entry = real;
        }
        object?[]? args = entry.GetParameters().Length == 1 ? new object?[] { Array.Empty<string>() } : null;

        RunContext.Current = ctx;
        Console.SetIn(ctx.Reader);
        try
        {
            if (!silent)
            {
                // Stop pressed while compiling: don't start the program at all.
                if (Io.Poll() == 1) { ctx.Stopped = true; return ("stopped", null, null); }
                Io.Phase("running", head);
            }
            int exit = 0;
            try
            {
                var ret = entry.Invoke(null, args);
                if (ret is Task t) { await t; ret = (t as Task<int>)?.Result; }
                if (ret is int code) exit = code;
                ctx.Flush(checkStop: false);
                return ("ok", null, exit);
            }
            catch (Exception e)
            {
                var ex = e is TargetInvocationException { InnerException: { } inner } ? inner : e;
                try { ctx.Flush(checkStop: false); } catch { }
                if (ex is StopRequestedException || ctx.Stopped) return ("stopped", null, null);
                using var frames = new Frames(asm, pdb, cellOf);
                return ("exception", frames.Describe(ex), unchecked((int)0xE0434352));
            }
        }
        finally
        {
            ctx.Closed = true;
            RunContext.Current = null;
            Console.SetIn(TextReader.Null);
        }
    }
}

/// <summary>A small JSON writer over Utf8JsonWriter.</summary>
sealed class Json
{
    readonly MemoryStream _ms = new();
    readonly Utf8JsonWriter _w;
    public Json() { _w = new Utf8JsonWriter(_ms, new JsonWriterOptions { Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping }); }
    public void Obj(Action body) { _w.WriteStartObject(); body(); _w.WriteEndObject(); }
    public void Arr(Action body) { _w.WriteStartArray(); body(); _w.WriteEndArray(); }
    public void Key(string k) => _w.WritePropertyName(k);
    public void Str(string k, string? v) { if (v == null) _w.WriteNull(k); else _w.WriteString(k, v); }
    public void Num(string k, double v) => _w.WriteNumber(k, v);
    public void Bool(string k, bool v) => _w.WriteBoolean(k, v);
    public void Null(string k) => _w.WriteNull(k);
    public override string ToString() { _w.Flush(); return Encoding.UTF8.GetString(_ms.ToArray()); }
}
