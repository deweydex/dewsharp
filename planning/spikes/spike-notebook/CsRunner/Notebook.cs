using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
#if WITH_SCRIPTING
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
#endif
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;

// Notebook experiments. Model A = Roslyn scripting (C# Script, shared live state between cells).
// Model B = "declarations persist, statements run": each run compiles an ordinary C# program.
public static partial class Runner
{
    // ---------------------------------------------------------------- probes
    [JSExport]
    public static string Probe()
    {
        var d = new Dictionary<string, object?>
        {
            ["corlibLocation"] = typeof(object).Assembly.Location,
            ["runnerLocation"] = typeof(Runner).Assembly.Location,
            ["tpa"] = (AppContext.GetData("TRUSTED_PLATFORM_ASSEMBLIES") as string)?.Length.ToString() ?? "null",
            ["baseDirectory"] = AppContext.BaseDirectory,
            ["cwd"] = SafeCwd(),
        };
        return J.Write(d);
    }
    static string SafeCwd() { try { return Directory.GetCurrentDirectory(); } catch (Exception e) { return "throws " + e.GetType().Name; } }

#if WITH_SCRIPTING
    // ---------------------------------------------------------------- Model A: C# scripting
    static ScriptState<object>? _sstate;
    static int _scriptCells;

    [JSExport]
    public static string ScriptReset() { _sstate = null; _scriptCells = 0; return "ok"; }

    static ScriptOptions? _sopts;
    // mode: "raw"      = ScriptOptions.Default, untouched (what a tutorial on the web would tell you to do)
    //       "refs"     = ScriptOptions.Default.WithReferences(<reference assemblies from bytes>)
    static ScriptOptions OptionsFor(string mode) => mode switch
    {
        "raw" => ScriptOptions.Default,
        _ => _sopts ??= ScriptOptions.Default
                .WithReferences(Refs)
                .WithImports(ImplicitUsings)
                .WithEmitDebugInformation(false)
                .WithOptimizationLevel(OptimizationLevel.Debug)
                .WithLanguageVersion(LanguageVersion.Latest),
    };

    [JSExport]
    public static async Task<string> ScriptRun(string cellId, string code, string stdin, string mode)
    {
        var sw = Stopwatch.StartNew();
        var timings = new Dictionary<string, double>();
        var res = new Dictionary<string, object?> { ["cell"] = cellId, ["timings"] = timings };
        var outW = new StringWriter(); var errW = new StringWriter();
        var ctx = new RunContext(outW, errW);
        EnsureRouter();
        Console.SetIn(new StringReader(stdin));
        _current.Value = ctx;
        try
        {
            var opts = OptionsFor(mode);
            timings["options"] = sw.Elapsed.TotalMilliseconds;
            // #line maps diagnostics (and, on re-emit, the PDB) to the cell's name without giving the tree a
            // FilePath, which would trigger Roslyn's Task.Run checksum + blocking wait (see base spike, fix 2).
            var text = $"#line 1 \"{cellId}\"\n{code}";
            ScriptState<object> st;
            if (_sstate == null) st = await CSharpScript.Create(text, opts).RunAsync(null, _ => true);
            else st = await _sstate.ContinueWithAsync(text, opts, catchException: _ => true);
            timings["compile_run"] = sw.Elapsed.TotalMilliseconds;
            _sstate = st; _scriptCells++;
            res["ok"] = st.Exception == null;
            res["phase"] = st.Exception == null ? "run" : "exception";
            res["diagnostics"] = DiagList(st.Script.GetCompilation().GetDiagnostics().Where(d => d.Severity >= DiagnosticSeverity.Warning));
            res["returnValue"] = st.ReturnValue is null ? null : Show(st.ReturnValue);
            res["returnType"] = st.ReturnValue?.GetType().FullName;
            if (st.Exception != null)
                errW.WriteLine("Unhandled exception. " + FormatScriptException(st.Exception, st.Script));
            // Visible variables, newest first, deduplicated by name (a later 'var x' shadows an earlier one).
            var seen = new HashSet<string>();
            var vars = new List<object?>();
            for (int i = st.Variables.Length - 1; i >= 0; i--)
            {
                var v = st.Variables[i];
                if (!seen.Add(v.Name)) continue;
                vars.Add(new Dictionary<string, object?> { ["name"] = v.Name, ["type"] = v.Type.FullName, ["value"] = Show(v.Value) });
            }
            vars.Reverse();
            res["variables"] = vars;
            timings["total"] = sw.Elapsed.TotalMilliseconds;
        }
        catch (CompilationErrorException cee)
        {
            res["ok"] = false; res["phase"] = "compile";
            res["diagnostics"] = DiagList(cee.Diagnostics);
            timings["total"] = sw.Elapsed.TotalMilliseconds;
        }
        catch (Exception e)
        {
            res["ok"] = false; res["phase"] = "host-error";
            res["hostError"] = e.ToString();
        }
        finally
        {
            ctx.Closed = true; _current.Value = null; Console.SetIn(TextReader.Null);
        }
        res["stdout"] = outW.ToString(); res["stderr"] = errW.ToString();
        res["cellsInState"] = _scriptCells;
        return J.Write(res);
    }

#endif

    static string? Show(object? v)
    {
        if (v == null) return "null";
        string s;
        try { s = v is string str ? "\"" + str + "\"" : v.ToString() ?? ""; } catch (Exception e) { s = "<ToString threw " + e.GetType().Name + ">"; }
        return s.Length > 200 ? s[..200] + "..." : s;
    }

    static List<object?> DiagList(IEnumerable<Diagnostic> ds) => ds.Select(d =>
    {
        var span = d.Location.GetMappedLineSpan();
        return (object?)new Dictionary<string, object?>
        {
            ["severity"] = d.Severity.ToString(), ["id"] = d.Id, ["file"] = span.Path ?? "",
            ["line"] = span.StartLinePosition.Line + 1, ["col"] = span.StartLinePosition.Character + 1, ["message"] = d.GetMessage(),
        };
    }).ToList();

#if WITH_SCRIPTING
    /// <summary>The Script API gives no access to the PDB it could have emitted, and the runtime prints no
    /// file:line anyway. So on an exception we re-emit the compilation of each submission on the stack
    /// (tokens and IL offsets are the same for the same Compilation object) with a portable PDB and map
    /// the frames ourselves. Cost is paid only when a cell throws.</summary>
    static string FormatScriptException(Exception ex, Script script)
    {
        var comps = new Dictionary<string, Compilation>();
        for (var s = script; s != null; s = s.Previous) { var c = s.GetCompilation(); comps[c.AssemblyName!] = c; }
        return FormatWithPdbs(ex, asmName =>
        {
            if (!comps.TryGetValue(asmName, out var c)) return null;
            using var pe = new MemoryStream(); var pdb = new MemoryStream();
            var er = c.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb));
            return er.Success ? pdb.ToArray() : null;
        });
    }

#endif

    static string FormatWithPdbs(Exception ex, Func<string, byte[]?> pdbFor)
    {
        var readers = new Dictionary<string, MetadataReader?>();
        MetadataReader? ReaderFor(string asmName)
        {
            if (readers.TryGetValue(asmName, out var r)) return r;
            var bytes = pdbFor(asmName);
            r = bytes == null ? null : MetadataReaderProvider.FromPortablePdbImage(ImmutableArray.Create(bytes)).GetMetadataReader();
            return readers[asmName] = r;
        }
        var sb = new StringBuilder();
        void Append(Exception e, bool inner)
        {
            if (inner) sb.Append(" ---> ");
            sb.Append(e.GetType().FullName).Append(": ").Append(e.Message);
            if (e.InnerException != null) { Append(e.InnerException, true); sb.AppendLine().Append("   --- End of inner exception stack trace ---"); }
            foreach (var f in new StackTrace(e, true).GetFrames())
            {
                var m = f.GetMethod(); if (m == null) continue;
                var owner = m.DeclaringType; while (owner?.DeclaringType != null) owner = owner.DeclaringType;
                if (owner == typeof(Runner) || owner?.Namespace?.StartsWith("Microsoft.CodeAnalysis") == true
                    || owner?.FullName?.StartsWith("System.Reflection.") == true) break;
                if (owner?.Namespace is "System.Runtime.ExceptionServices" or "System.Runtime.CompilerServices") continue;
                sb.AppendLine().Append("   at ").Append(m.DeclaringType?.FullName).Append('.').Append(m.Name)
                  .Append('(').Append(string.Join(", ", m.GetParameters().Select(p => p.ParameterType.Name + " " + p.Name))).Append(')');
                var an = m.Module.Assembly.GetName().Name;
                var rd = an != null ? ReaderFor(an) : null;
                if (rd != null && f.GetILOffset() >= 0)
                {
                    var (file, line) = Lookup(rd, m.MetadataToken, f.GetILOffset());
                    if (file != null) sb.Append(" in ").Append(file).Append(":line ").Append(line);
                }
            }
        }
        Append(ex, false);
        return sb.ToString();
    }

    // ---------------------------------------------------------------- Model A2: our own submission executor
    // Script.RunAsync cannot work in the browser: Script.GetReferencesForCompilation always adds
    // MetadataReference for typeof(object).Assembly via its Location, which is "" on browser-wasm, and throws.
    // The scripting *semantics* live in the compiler (CSharpCompilation.CreateScriptCompilation), so we drive
    // that directly and do what ScriptBuilder + ScriptExecutionState do at run time (about 60 lines).
    static CSharpCompilation? _prevComp;
    static object?[] _subs = new object?[16];
    static int _subCount = 1;          // slot 0 is the globals object (none here)
    static int _subSerial;
    static SubmissionAlc _alc = new();
    static readonly Dictionary<string, byte[]> _pdbs = new();
    static readonly string _session = Guid.NewGuid().ToString("N")[..8];

    sealed class SubmissionAlc() : System.Runtime.Loader.AssemblyLoadContext("submissions")
    {
        public readonly Dictionary<string, Assembly> ByName = new();
        protected override Assembly? Load(AssemblyName n) => n.Name != null && ByName.TryGetValue(n.Name, out var a) ? a : null;
    }

    static readonly CSharpParseOptions ScriptParse = new(LanguageVersion.Latest, DocumentationMode.None, SourceCodeKind.Script);
    static CSharpCompilationOptions ScriptCompOpts(bool nullable) => new(OutputKind.DynamicallyLinkedLibrary,
        scriptClassName: "Submission#0", usings: ImplicitUsings, optimizationLevel: OptimizationLevel.Debug,
        allowUnsafe: true, concurrentBuild: false,
        nullableContextOptions: nullable ? NullableContextOptions.Enable : NullableContextOptions.Disable);

    [JSExport]
    public static string SubReset()
    {
        _prevComp = null; _subs = new object?[16]; _subCount = 1; _alc = new SubmissionAlc(); _pdbs.Clear(); _libRef = null;
        return "ok";
    }

    [JSExport]
    public static async Task<string> SubRun(string cellId, string code, string stdin, bool nullable)
    {
        var sw = Stopwatch.StartNew();
        var timings = new Dictionary<string, double>();
        var res = new Dictionary<string, object?> { ["cell"] = cellId, ["timings"] = timings };
        var outW = new StringWriter(); var errW = new StringWriter();
        var ctx = new RunContext(outW, errW);
        EnsureRouter();
        try
        {
            var tree = CSharpSyntaxTree.ParseText(SourceText.From($"#line 1 \"{cellId}\"\n{code}", Encoding.UTF8), ScriptParse, path: "");
            var asmName = $"cell{++_subSerial}-{_session}";
            var comp = CSharpCompilation.CreateScriptCompilation(asmName, tree, _libRef == null ? Refs : Refs.Append(_libRef), ScriptCompOpts(nullable), _prevComp, returnType: null); // typeof(object) would need System.Private.CoreLib metadata (CS0400)
            timings["parse"] = sw.Elapsed.TotalMilliseconds;
            using var pe = new MemoryStream(); using var pdb = new MemoryStream();
            var emit = comp.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb));
            timings["compile_emit"] = sw.Elapsed.TotalMilliseconds;
            res["diagnostics"] = DiagList(emit.Diagnostics.Where(d => d.Severity >= DiagnosticSeverity.Warning));
            // A cell with nothing to run (only usings, say) "fails" to emit with no errors. Roslyn's ScriptBuilder
            // treats that as a no-op submission that still joins the chain (so its usings carry forward) and does
            // not take a state slot (the compiler skips code-less submissions when numbering slots).
            if (!emit.Success && !emit.Diagnostics.Any(d => d.Severity == DiagnosticSeverity.Error))
            { _prevComp = comp; res["ok"] = true; res["phase"] = "run"; res["variables"] = Variables(); res["note"] = "no code to run"; return Finish(); }
            if (!emit.Success) { res["ok"] = false; res["phase"] = "compile"; res["allDiagnostics"] = DiagList(emit.Diagnostics); return Finish(); }
            pe.Position = 0;
            var asm = _alc.LoadFromStream(pe);
            _alc.ByName[asmName] = asm; _pdbs[asmName] = pdb.ToArray();
            var ep = comp.GetEntryPoint(default)!;
            var type = asm.GetType(ep.ContainingType.MetadataName, throwOnError: true)!;
            var factory = type.GetMethod(ep.MetadataName, BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)!
                              .CreateDelegate<Func<object?[], Task<object>>>();
            timings["load"] = sw.Elapsed.TotalMilliseconds;
            if (_subCount >= _subs.Length) Array.Resize(ref _subs, _subs.Length * 2);
            Console.SetIn(new StringReader(stdin));
            _current.Value = ctx;
            object? ret = null;
            try { ret = await factory(_subs); res["ok"] = true; res["phase"] = "run"; }
            catch (Exception e)
            {
                res["ok"] = false; res["phase"] = "exception";
                errW.WriteLine("Unhandled exception. " + FormatWithPdbs(e, n => _pdbs.TryGetValue(n, out var b) ? b : null));
            }
            finally
            {
                // Same bookkeeping as Roslyn's ScriptExecutionState: the submission's constructor stored itself
                // in its slot before running, so the cell's variables survive even if it threw.
                if (_subs[_subCount] != null) { _subCount++; _prevComp = comp; }
            }
            timings["run"] = sw.Elapsed.TotalMilliseconds;
            res["returnValue"] = ret is null ? null : Show(ret);
            res["returnType"] = ret?.GetType().FullName;
            res["variables"] = Variables();
            res["submissionType"] = type.FullName;
            return Finish();
        }
        catch (Exception e) { res["ok"] = false; res["phase"] = "host-error"; res["hostError"] = e.ToString(); return Finish(); }

        string Finish()
        {
            ctx.Closed = true; _current.Value = null; Console.SetIn(TextReader.Null);
            timings["total"] = sw.Elapsed.TotalMilliseconds;
            res["stdout"] = outW.ToString(); res["stderr"] = errW.ToString(); res["cellsInState"] = _subCount - 1;
            return J.Write(res);
        }
    }

    // ---------------------------------------------------------------- Hybrid: declarations as a real library
    // Declaration cells compile as an ordinary library (namespaces, top-level types, extension methods all
    // normal C#); statement cells run as script submissions that reference it, so variables are shared live.
    // 'class Student' is internal by default, so the library grants InternalsVisibleTo to the next 500
    // submission assembly names. Rebuilding the library means a new assembly name, so it needs a state reset.
    static MetadataReference? _libRef;
    static int _libVersion;

    [JSExport]
    public static string LibBuild(string[] names, string[] texts)
    {
        var sw = Stopwatch.StartNew();
        var parseOpts = new CSharpParseOptions(LanguageVersion.Latest);
        var trees = names.Select((n, i) => CSharpSyntaxTree.ParseText(SourceText.From($"#line 1 \"{n}\"\n{texts[i]}", Encoding.UTF8), parseOpts, path: "")).ToList();
        var ivt = new StringBuilder();
        for (int k = _subSerial + 1; k <= _subSerial + 500; k++)
            ivt.Append($"[assembly: System.Runtime.CompilerServices.InternalsVisibleTo(\"cell{k}-{_session}\")]\n");
        trees.Add(CSharpSyntaxTree.ParseText(SourceText.From(ivt.ToString(), Encoding.UTF8), parseOpts, path: ""));
        trees.Add(CSharpSyntaxTree.ParseText(SourceText.From(string.Concat(ImplicitUsings.Select(u => $"global using global::{u};\n")), Encoding.UTF8), parseOpts, path: ""));
        var asmName = $"lib{++_libVersion}-{_session}";
        var comp = CSharpCompilation.Create(asmName, trees, Refs, new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary,
            optimizationLevel: OptimizationLevel.Debug, nullableContextOptions: NullableContextOptions.Enable, concurrentBuild: false));
        using var pe = new MemoryStream(); using var pdb = new MemoryStream();
        var emit = comp.Emit(pe, pdb, options: new EmitOptions(debugInformationFormat: DebugInformationFormat.PortablePdb));
        var res = new Dictionary<string, object?> { ["ok"] = emit.Success, ["assembly"] = asmName,
            ["diagnostics"] = DiagList(emit.Diagnostics.Where(d => d.Severity >= DiagnosticSeverity.Warning)) };
        if (emit.Success)
        {
            var bytes = pe.ToArray();
            var asm = _alc.LoadFromStream(new MemoryStream(bytes));
            _alc.ByName[asmName] = asm; _pdbs[asmName] = pdb.ToArray();
            _libRef = MetadataReference.CreateFromImage(bytes);
        }
        res["ms"] = sw.Elapsed.TotalMilliseconds;
        return J.Write(res);
    }

    static List<object?> Variables()
    {
        var seen = new HashSet<string>(); var vars = new List<object?>();
        for (int i = _subCount - 1; i >= 1; i--)
        {
            var sub = _subs[i]; if (sub == null) continue;
            foreach (var f in sub.GetType().GetFields(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).Reverse())
            {
                if (f.Name.StartsWith("<") || !seen.Add(f.Name)) continue;
                object? v; try { v = f.GetValue(sub); } catch { v = "?"; }
                vars.Add(new Dictionary<string, object?> { ["name"] = f.Name, ["type"] = f.FieldType.FullName, ["value"] = Show(v), ["cellSlot"] = i });
            }
        }
        vars.Reverse();
        return vars;
    }

    // ---------------------------------------------------------------- Model B: declarations persist
    /// <summary>Turn notebook cells 0..current into an ordinary multi-file C# program.
    /// Type/namespace declarations from every cell up to 'current' are kept (a cell that is only
    /// declarations becomes its own file, so namespaces and usings behave as in a normal .cs file).
    /// Statements come only from the current cell, or from every cell up to it when replay=true.
    /// With lastWins, a non-partial type declared again in a later cell replaces the earlier one.
    /// Returns {names[], texts[], notes[], markers}.</summary>
    [JSExport]
    public static string NotebookAssemble(string[] cellIds, string[] codes, int current, bool replay, bool lastWins)
    {
        var sw = Stopwatch.StartNew();
        var parseOpts = new CSharpParseOptions(LanguageVersion.Latest);
        var names = new List<string>(); var texts = new List<string>(); var notes = new List<object?>();
        var programUsings = new List<string>(); var seenUsing = new HashSet<string>();
        var programBody = new StringBuilder();
        // Pass 1: find the last cell that declares each top-level (non-partial) type, for lastWins.
        var owner = new Dictionary<string, int>();
        var roots = new CompilationUnitSyntax[current + 1];
        for (int i = 0; i <= current; i++)
        {
            roots[i] = (CompilationUnitSyntax)CSharpSyntaxTree.ParseText(codes[i], parseOpts).GetRoot();
            foreach (var t in TopTypes(roots[i]))
                if (!t.decl.Modifiers.Any(SyntaxKind.PartialKeyword)) owner[t.fullName] = i;
        }
        for (int i = 0; i <= current; i++)
        {
            var root = roots[i]; var id = cellIds[i]; var src = codes[i];
            var hasStatements = root.Members.OfType<GlobalStatementSyntax>().Any();
            bool Keep(MemberDeclarationSyntax m)
            {
                if (m is GlobalStatementSyntax) return false;
                if (!lastWins) return true;
                // A namespace member: keep unless every type inside is owned by a later cell.
                var tops = TopTypes(m).ToList();
                if (tops.Count == 0) return true;
                var keep = tops.Any(t => t.decl.Modifiers.Any(SyntaxKind.PartialKeyword) || owner[t.fullName] == i);
                if (!keep) foreach (var t in tops) notes.Add($"{id}: '{t.fullName}' is replaced by the version in {cellIds[owner[t.fullName]]}");
                return keep;
            }
            int Line(SyntaxNode n) => n.GetLocation().GetLineSpan().StartLinePosition.Line + 1;
            if (!hasStatements)
            {
                // Declaration-only cell: the whole cell is one ordinary .cs file (unless all of it was replaced).
                var members = root.Members.ToList();
                if (members.All(Keep) || !lastWins) { names.Add(id + ".cs"); texts.Add($"#line 1 \"{id}\"\n{src}"); }
                else
                {
                    var sb = new StringBuilder();
                    foreach (var u in root.Usings) sb.Append($"#line {Line(u)} \"{id}\"\n{u.ToFullString().Trim()}\n");
                    foreach (var m in members.Where(Keep)) sb.Append($"#line {Line(m)} \"{id}\"\n{m.ToFullString()}\n");
                    names.Add(id + ".cs"); texts.Add(sb.ToString());
                }
                continue;
            }
            // Statement cell. Its usings go to the program file (deduplicated); its types to a side file.
            var types = root.Members.Where(m => m is not GlobalStatementSyntax).Where(Keep).ToList();
            if (types.Count > 0)
            {
                var sb = new StringBuilder();
                foreach (var u in root.Usings) sb.Append($"#line {Line(u)} \"{id}\"\n{u.ToFullString().Trim()}\n");
                foreach (var m in types) sb.Append($"#line {Line(m)} \"{id}\"\n{m.ToFullString()}\n");
                names.Add(id + ".types.cs"); texts.Add(sb.ToString());
            }
            if (i == current || replay)
            {
                foreach (var u in root.Usings)
                    if (seenUsing.Add(u.ToString())) programUsings.Add($"#line {Line(u)} \"{id}\"\n{u.ToFullString().Trim()}\n");
                if (replay) programBody.Append($"global::System.Console.Out.Write(\"\\u0001{id}\\u0001\");\n");
                foreach (var g in root.Members.OfType<GlobalStatementSyntax>())
                    programBody.Append($"#line {Line(g)} \"{id}\"\n{g.ToFullString()}\n");
            }
        }
        // No statements to run: if the student wrote their own static Main, let it be the entry point (C# forbids
        // top-level statements alongside it being used); otherwise add a bare "return;" so the program links.
        bool studentMain = roots.Take(current + 1).Any(r => r.DescendantNodes().OfType<MethodDeclarationSyntax>()
            .Any(m => m.Identifier.Text == "Main" && m.Modifiers.Any(SyntaxKind.StaticKeyword)));
        if (programBody.Length > 0 || !studentMain)
        {
            var program = string.Concat(programUsings) + (programBody.Length > 0 ? programBody.ToString() : "return;\n");
            names.Insert(0, "__notebook_main.cs"); texts.Insert(0, program);
        }
        return J.Write(new Dictionary<string, object?> { ["names"] = names, ["texts"] = texts, ["notes"] = notes, ["assembleMs"] = sw.Elapsed.TotalMilliseconds });
    }

    static IEnumerable<(string fullName, BaseTypeDeclarationSyntax decl)> TopTypes(SyntaxNode n, string prefix = "")
    {
        switch (n)
        {
            case CompilationUnitSyntax cu:
                foreach (var m in cu.Members) foreach (var t in TopTypes(m, prefix)) yield return t;
                break;
            case BaseNamespaceDeclarationSyntax ns:
                foreach (var m in ns.Members) foreach (var t in TopTypes(m, prefix + ns.Name + ".")) yield return t;
                break;
            case BaseTypeDeclarationSyntax td:
                yield return (prefix + td.Identifier.Text + (td is TypeDeclarationSyntax { TypeParameterList: { } tp } ? "`" + tp.Parameters.Count : ""), td);
                break;
            case DelegateDeclarationSyntax:
                break;
        }
    }
}
