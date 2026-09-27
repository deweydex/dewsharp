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
    public static async Task<string> CompileAndRun(string[] names, string[] texts, string stdin, bool implicitUsings, bool collectible, bool emitPdb)
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
        var ctx = new RunContext(outW, errW);
        EnsureRouter();
        // Note: the Console.In getter throws PlatformNotSupportedException on browser-wasm, but SetIn works.
        Console.SetIn(new StringReader(stdin));
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
                errW.WriteLine("Unhandled exception. " + FormatException(ex, asm, emitPdb ? pdb.ToArray() : null));
                exit = unchecked((int)0xE0434352);
            }
        }
        finally
        {
            ctx.Closed = true;
            _current.Value = null;
            Console.SetIn(TextReader.Null);
        }
        Mark("run");
        return Result(true, "run", diags, outW.ToString(), errW.ToString(), exit, timings);
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

    sealed class RunContext(StringWriter o, StringWriter e)
    {
        public static int LateWrites;
        public bool Closed;
        public TextWriter? Pick(bool err)
        {
            if (Closed) { LateWrites++; return null; }
            return err ? e : o;
        }
    }

    sealed class Router(bool err) : TextWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
        TextWriter? Target => _current.Value is { } c ? c.Pick(err) : null;
        public override void Write(char value) => Target?.Write(value);
        public override void Write(string? value) => Target?.Write(value);
        public override void Write(char[] buffer, int index, int count) => Target?.Write(buffer, index, count);
        public override void WriteLine(string? value) => Target?.WriteLine(value);
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
