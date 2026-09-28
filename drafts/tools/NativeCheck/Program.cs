// NativeCheck: runs every C# cell of a draft lesson with the native .NET SDK, under the
// rules of the road in docs/LESSON_FORMAT.md, and prints what each cell printed.
//
// It is a stand-in for the browser checker (tools/check-lessons.mjs) while that is being
// built, so that drafts can be written with every cell run. It is not the source of truth:
// the browser engine is. What it cannot check natively it says so (Console.ReadKey, colours,
// Clear), rather than guessing.
//
//   dotnet run --project drafts/tools/NativeCheck -- drafts/lessons/<id>/<id>.md [more.md ...] [--json]
//
// Exit code 0 when every cell did what its headers say (expect:), 1 otherwise.

using System.Collections;
using System.Globalization;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

var files = args.Where(a => !a.StartsWith("--")).ToList();
bool json = args.Contains("--json");
if (files.Count == 0) { Console.Error.WriteLine("usage: NativeCheck <lesson.md> [...] [--json]"); return 2; }

var culture = new CultureInfo("en-IE");
CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;
CultureInfo.CurrentCulture = culture;

var realOut = Console.Out;
int problems = 0;
var report = new List<object>();
foreach (var path in files)
{
    var lesson = Lesson.Parse(path);
    foreach (var e in lesson.Errors) { realOut.WriteLine($"{path}:{e}"); problems++; }
    var worlds = lesson.Worlds.Count > 0 ? lesson.Worlds.Cast<string>().ToList() : new List<string> { null };
    foreach (var world in worlds)
    {
        var visible = lesson.Cells.Where(c => c.World == null || c.World == world).ToList();
        for (int k = 0; k < visible.Count; k++)
        {
            var cell = visible[k];
            if (world != null && cell.World == null && worlds.IndexOf(world) > 0 && !lesson.DependsOnWorld(visible, k, world))
                continue; // a shared cell whose program does not change with the world: checked in the first world only
            var result = Runner.RunCell(visible, k, cell.Code, cell.Stdin, cell.Inputs);
            bool ok = Expect.Matches(cell.Expect, result, out string why);
            if (!ok) problems++;
            realOut.WriteLine($"── {Path.GetFileName(path)} · {cell.Id}{(world != null ? $" · world {world}" : "")} · line {cell.Line} · {result.Kind} · {result.Outcome}{(ok ? "" : "  ✗ " + why)}");
            foreach (var d in result.Diagnostics) realOut.WriteLine("   " + d);
            if (result.Output.Length > 0) realOut.WriteLine(Indent(result.Output));
            if (result.Exception != null) realOut.WriteLine("   ! " + result.Exception);
            foreach (var n in result.Notes) realOut.WriteLine("   note: " + n);
            for (int i = 0; i < result.Values.Count; i++) realOut.WriteLine($"   input {cell.Inputs[i]}  →  {result.Values[i]}");
            var sols = new List<object>();
            foreach (var sol in cell.Solutions)
            {
                var sr = Runner.RunCell(visible, k, sol, cell.Stdin, cell.Inputs);
                bool solOk = sr.Outcome is "ok" && sr.Values.All(v => !v.StartsWith("compile error"));
                if (!solOk) problems++;
                realOut.WriteLine($"   solution · {sr.Outcome}{(solOk ? "" : "  ✗ a solution must compile and run")}");
                foreach (var d in sr.Diagnostics) realOut.WriteLine("      " + d);
                if (sr.Output.Length > 0) realOut.WriteLine(Indent(sr.Output, "      | "));
                if (sr.Exception != null) realOut.WriteLine("      ! " + sr.Exception);
                for (int i = 0; i < sr.Values.Count; i++) realOut.WriteLine($"      input {cell.Inputs[i]}  →  {sr.Values[i]}");
                sols.Add(new { sr.Outcome, sr.Output, sr.Values, sr.Diagnostics, sr.Exception });
            }
            report.Add(new { file = path, cell = cell.Id, world, result.Kind, result.Outcome, result.Output, result.Diagnostics, result.Exception, result.Values, solutions = sols, expectMet = ok });
        }
    }
}
if (json)
{
    var outPath = files.Count == 1 ? Path.ChangeExtension(files[0], ".native.json") : "native-check.json";
    File.WriteAllText(outPath, JsonSerializer.Serialize(report, new JsonSerializerOptions { WriteIndented = true }));
    realOut.WriteLine($"wrote {outPath}");
}
realOut.WriteLine(problems == 0 ? "No problems." : $"{problems} problem(s).");
return problems == 0 ? 0 : 1;

static string Indent(string s, string prefix = "   | ") =>
    string.Join("\n", s.TrimEnd('\n').Split('\n').Select(l => prefix + l));

// ------------------------------------------------------------------------------------------
class Cell
{
    public string Id, World, Code, Expect, Stdin, File; public int Line;
    public List<string> Solutions = new(); public List<string> Inputs = new();
}

class Lesson
{
    public List<string> Worlds = new(); public List<Cell> Cells = new(); public List<string> Errors = new();
    static readonly Regex Header = new(@"^(id|hint|file|expect|stdin|for|title|after|type|tolerance):\s?(.*)$");

    public bool DependsOnWorld(List<Cell> visible, int k, string world) =>
        visible.Take(k).Any(c => c.World == world);

    public static Lesson Parse(string path)
    {
        var l = new Lesson();
        var lines = System.IO.File.ReadAllLines(path);
        int i = 0;
        if (lines.Length > 0 && lines[0].Trim() == "---")
        {
            i = 1; bool inWorlds = false;
            for (; i < lines.Length && lines[i].Trim() != "---"; i++)
            {
                if (Regex.IsMatch(lines[i], @"^worlds:\s*$")) { inWorlds = true; continue; }
                if (inWorlds && Regex.Match(lines[i], @"^\s{2}([a-z0-9-]+):") is { Success: true } m) { l.Worlds.Add(m.Groups[1].Value); continue; }
                if (!lines[i].StartsWith(" ")) inWorlds = false;
            }
            i++;
        }
        string world = null; Cell last = null; var ids = new HashSet<string>();
        for (; i < lines.Length; i++)
        {
            var line = lines[i];
            var wm = Regex.Match(line, "^<div class=\"dl-world\" data-world=\"([a-z0-9-]+)\">\\s*$");
            if (wm.Success) { world = wm.Groups[1].Value; if (!l.Worlds.Contains(world)) l.Errors.Add($"{i + 1}: world '{world}' is not in the frontmatter"); continue; }
            if (world != null && line.Trim() == "</div>") { world = null; continue; }
            var fm = Regex.Match(line, @"^(`{3,})\s*([a-z#]+)?\s*([a-z]+)?\s*$");
            if (!fm.Success) continue;
            string fence = fm.Groups[1].Value, lang = fm.Groups[2].Value, tag = fm.Groups[3].Value;
            int start = i + 1, end = start;
            while (end < lines.Length && lines[end].TrimEnd() != fence) end++;
            var body = lines.Skip(start).Take(end - start).ToList();
            int startLine = start + 1;
            i = end;
            var headers = new Dictionary<string, string>();
            int h = 0;
            while (h < body.Count && Header.Match(body[h]) is { Success: true } hm) { headers[hm.Groups[1].Value] = hm.Groups[2].Value.Trim(); h++; }
            var code = string.Join("\n", body.Skip(h));
            if (lang == "csharp" && tag == "exec")
            {
                if (!headers.TryGetValue("id", out var id)) { l.Errors.Add($"{startLine}: a csharp exec cell has no id:"); continue; }
                if (!ids.Add(id)) l.Errors.Add($"{startLine}: the id '{id}' is used twice");
                if (world != null && !id.EndsWith("--" + world)) l.Errors.Add($"{startLine}: '{id}' is inside the '{world}' world, so it must end in --{world}");
                string stdin = null;
                if (headers.TryGetValue("stdin", out var s))
                {
                    try { stdin = JsonSerializer.Deserialize<string>(s); }
                    catch { l.Errors.Add($"{startLine}: stdin: must be a JSON string, such as \"Ada\\n21\\n\""); }
                }
                last = new Cell { Id = id, World = world, Code = code, Line = startLine, Expect = headers.GetValueOrDefault("expect"), Stdin = stdin, File = headers.GetValueOrDefault("file") };
                l.Cells.Add(last);
            }
            else if (lang is "solution" or "inputs" && tag == "")
            {
                var target = headers.TryGetValue("for", out var f) ? l.Cells.LastOrDefault(c => c.Id == f) : last;
                if (target == null) { l.Errors.Add($"{startLine}: a {lang} block has no cell to belong to"); continue; }
                if (lang == "solution")
                {
                    var solLines = body.Skip(h).TakeWhile(x => x.Trim() != "---");
                    target.Solutions.Add(string.Join("\n", solLines));
                }
                else
                {
                    foreach (var x in body.Skip(h))
                    {
                        var expr = Regex.Replace(x, @"\s*//.*$", "").Trim();
                        if (expr.Length > 0) target.Inputs.Add(expr);
                    }
                }
            }
        }
        return l;
    }
}

class Result
{
    public string Kind = "program", Outcome = "ok", Output = "", Exception;
    public List<string> Diagnostics = new(), Notes = new(), Values = new();
    public List<string> ErrorCodes = new();
}

static class Expect
{
    public static bool Matches(string expect, Result r, out string why)
    {
        why = "";
        if (expect == null)
        {
            if (r.Outcome is "ok") return true;
            why = $"it ended with '{r.Outcome}' but has no expect: header"; return false;
        }
        if (Regex.IsMatch(expect, @"^CS\d{4}$"))
        {
            if (r.Outcome == "compile-error" && r.ErrorCodes.Contains(expect)) return true;
            why = $"expect: {expect}, but it ended with '{r.Outcome}' ({string.Join(", ", r.ErrorCodes)})"; return false;
        }
        if (expect == "exception")
        {
            if (r.Outcome == "exception") return true;
            why = $"expect: exception, but it ended with '{r.Outcome}'"; return false;
        }
        why = $"unknown expect: '{expect}'"; return false;
    }
}

static class Runner
{
    static readonly CSharpParseOptions Parse = new(LanguageVersion.CSharp14);
    const string GlobalUsings = "global using System;\nglobal using System.Collections.Generic;\nglobal using System.IO;\nglobal using System.Linq;\nglobal using System.Net.Http;\nglobal using System.Threading;\nglobal using System.Threading.Tasks;\n";

    static IEnumerable<(string name, BaseTypeDeclarationSyntax decl, MemberDeclarationSyntax top)> TopTypes(SyntaxNode n, string prefix = "", MemberDeclarationSyntax top = null)
    {
        switch (n)
        {
            case CompilationUnitSyntax cu:
                foreach (var m in cu.Members) foreach (var t in TopTypes(m, prefix, m)) yield return t; break;
            case BaseNamespaceDeclarationSyntax ns:
                foreach (var m in ns.Members) foreach (var t in TopTypes(m, prefix + ns.Name + ".", top)) yield return t; break;
            case BaseTypeDeclarationSyntax td:
                yield return (prefix + td.Identifier.Text, td, top); break;
        }
    }

    static bool HasMain(SyntaxNode n) => n.DescendantNodesAndSelf().OfType<MethodDeclarationSyntax>()
        .Any(m => m.Identifier.Text == "Main" && m.Modifiers.Any(SyntaxKind.StaticKeyword));

    public static Result RunCell(List<Cell> visible, int k, string targetCode, string stdin, List<string> inputs)
    {
        var r = new Result();
        var roots = new CompilationUnitSyntax[k + 1];
        for (int j = 0; j <= k; j++)
            roots[j] = (CompilationUnitSyntax)CSharpSyntaxTree.ParseText(j == k ? targetCode : visible[j].Code, Parse).GetRoot();
        var target = roots[k];
        bool hasStatements = target.Members.OfType<GlobalStatementSyntax>().Any();
        bool isProgram = hasStatements || HasMain(target);
        r.Kind = isProgram ? "program" : "types";
        if (target.Members.Count == 0 && target.Usings.Count == 0) { r.Kind = "empty"; return r; }

        // Which cell owns each type name: the last one that declares it (the target counts).
        var owner = new Dictionary<string, int>();
        for (int j = 0; j <= k; j++)
            foreach (var t in TopTypes(roots[j]))
                if (!t.decl.Modifiers.Any(SyntaxKind.PartialKeyword)) owner[t.name] = j;

        var trees = new List<SyntaxTree> { CSharpSyntaxTree.ParseText(GlobalUsings, Parse, path: "__usings.cs", encoding: Encoding.UTF8) };
        for (int j = 0; j < k; j++)
        {
            var root = roots[j]; var id = visible[j].Id;
            var kept = new StringBuilder();
            int Line(SyntaxNode s) => s.GetLocation().GetLineSpan().StartLinePosition.Line + 1;
            foreach (var u in root.Usings) kept.Append($"#line {Line(u)} \"{id}\"\n{u.ToFullString().Trim()}\n");
            bool any = false;
            foreach (var m in root.Members)
            {
                if (m is GlobalStatementSyntax) continue;
                var tops = TopTypes(m).ToList();
                if (tops.Count > 0 && tops.All(t => !t.decl.Modifiers.Any(SyntaxKind.PartialKeyword) && owner[t.name] != j))
                { foreach (var t in tops) r.Notes.Add($"{t.name} from {id} is replaced by a later cell"); continue; }
                if (HasMain(m)) continue; // Main stays in its cell (rule 5)
                if (m is FileScopedNamespaceDeclarationSyntax fs)
                {
                    kept.Append($"#line {Line(fs)} \"{id}\"\nnamespace {fs.Name};\n");
                    foreach (var inner in fs.Members)
                    {
                        var innerTops = TopTypes(inner, fs.Name + ".").ToList();
                        if (innerTops.Count > 0 && innerTops.All(t => owner[t.name] != j && !t.decl.Modifiers.Any(SyntaxKind.PartialKeyword))) continue;
                        if (HasMain(inner)) continue;
                        kept.Append($"#line {Line(inner)} \"{id}\"\n{inner.ToFullString()}\n");
                    }
                    any = true; continue;
                }
                kept.Append($"#line {Line(m)} \"{id}\"\n{m.ToFullString()}\n");
                any = true;
            }
            if (any) trees.Add(CSharpSyntaxTree.ParseText(kept.ToString(), Parse, path: id + ".cs", encoding: Encoding.UTF8));
        }

        var targetId = visible[k].Id;
        var targetTree = CSharpSyntaxTree.ParseText(targetCode, Parse, path: targetId, encoding: Encoding.UTF8);
        var refs = Basic.Reference.Assemblies.Net100.References.All.ToList();

        if (!isProgram)
        {
            var lib = Compile(trees.Append(targetTree), refs, OutputKind.DynamicallyLinkedLibrary, r, out _, out _);
            if (lib) r.Outcome = "ok";
            return r;
        }

        if (!Compile(trees.Append(targetTree), refs, OutputKind.ConsoleApplication, r, out var pe, out var pdb)) return r;
        Execute(pe, pdb, stdin, r);

        foreach (var input in inputs)
        {
            // Each input is its own program: the target's statements, then one display of the value.
            var withInput = AppendAfterStatements(targetCode, $"\n__DewsharpShow.Value(({input}));\n");
            var rr = new Result();
            var tt = CSharpSyntaxTree.ParseText(withInput, Parse, path: targetId, encoding: Encoding.UTF8);
            var show = CSharpSyntaxTree.ParseText(ShowSource, Parse, path: "__show.cs", encoding: Encoding.UTF8);
            if (!Compile(trees.Append(tt).Append(show), refs, OutputKind.ConsoleApplication, rr, out var pe2, out var pdb2))
            { r.Values.Add("compile error: " + string.Join("; ", rr.Diagnostics.Where(d => d.Contains("error")))); continue; }
            Execute(pe2, pdb2, stdin, rr);
            var marker = rr.Output.LastIndexOf("\u0001", StringComparison.Ordinal);
            r.Values.Add(rr.Outcome == "exception" ? rr.Exception.Split(':')[0] : marker >= 0 ? rr.Output[(marker + 1)..].TrimEnd('\n') : "(no value)");
        }
        return r;
    }

    static string AppendAfterStatements(string code, string extra)
    {
        var root = (CompilationUnitSyntax)CSharpSyntaxTree.ParseText(code, Parse).GetRoot();
        var lastStatement = root.Members.OfType<GlobalStatementSyntax>().LastOrDefault();
        int at = lastStatement?.FullSpan.End ?? root.Usings.LastOrDefault()?.FullSpan.End ?? 0;
        return code[..at] + extra + code[at..];
    }

    const string ShowSource = """
        static class __DewsharpShow
        {
            public static void Value(object v) { System.Console.Out.Write("\u0001" + Format(v) + "\n"); }
            static string Format(object v) => v switch
            {
                null => "null",
                string s => "\"" + s + "\"",
                char c => "'" + c + "'",
                bool b => b ? "true" : "false",
                System.Collections.IDictionary d => "{" + string.Join(", ", Entries(d)) + "}",
                System.Collections.IEnumerable e => "[" + string.Join(", ", System.Linq.Enumerable.Select(System.Linq.Enumerable.Cast<object>(e), Format)) + "]",
                _ => System.Convert.ToString(v, System.Globalization.CultureInfo.CurrentCulture),
            };
            // A generic Dictionary enumerates KeyValuePairs, so Cast<DictionaryEntry> throws; its IDictionary
            // enumerator gives DictionaryEntry.
            static System.Collections.Generic.IEnumerable<string> Entries(System.Collections.IDictionary d)
            {
                var e = d.GetEnumerator();
                while (e.MoveNext()) yield return Format(e.Key) + ": " + Format(e.Value);
            }
        }
        """;

    static bool Compile(IEnumerable<SyntaxTree> trees, List<PortableExecutableReference> refs, OutputKind kind, Result r, out byte[] pe, out byte[] pdb)
    {
        pe = pdb = null;
        var options = new CSharpCompilationOptions(kind, nullableContextOptions: NullableContextOptions.Disable,
            optimizationLevel: OptimizationLevel.Debug, allowUnsafe: false);
        var comp = CSharpCompilation.Create("Cell" + Guid.NewGuid().ToString("N")[..8], trees, refs, options);
        using var peStream = new MemoryStream(); using var pdbStream = new MemoryStream();
        var emit = comp.Emit(peStream, pdbStream, options: new Microsoft.CodeAnalysis.Emit.EmitOptions(debugInformationFormat: Microsoft.CodeAnalysis.Emit.DebugInformationFormat.PortablePdb));
        foreach (var d in emit.Diagnostics.Where(d => d.Severity >= DiagnosticSeverity.Warning && d.Id != "CS8019"))
        {
            var span = d.Location.GetMappedLineSpan();
            r.Diagnostics.Add($"{span.Path}({span.StartLinePosition.Line + 1},{span.StartLinePosition.Character + 1}): {d.Severity.ToString().ToLower()} {d.Id}: {d.GetMessage(CultureInfo.GetCultureInfo("en"))}");
            if (d.Severity == DiagnosticSeverity.Error) r.ErrorCodes.Add(d.Id);
        }
        if (!emit.Success) { r.Outcome = "compile-error"; return false; }
        pe = peStream.ToArray(); pdb = pdbStream.ToArray();
        return true;
    }

    static void Execute(byte[] pe, byte[] pdb, string stdin, Result r)
    {
        var alc = new AssemblyLoadContext("cell", isCollectible: true);
        var asm = alc.LoadFromStream(new MemoryStream(pe), new MemoryStream(pdb));
        var entry = asm.EntryPoint;
        var output = new StringWriter();
        var oldOut = Console.Out; var oldErr = Console.Error; var oldIn = Console.In;
        var src = entry.GetParameters().Length == 1 ? new object[] { Array.Empty<string>() } : null;
        var task = Task.Run(() =>
        {
            Console.SetOut(output); Console.SetError(output); Console.SetIn(new StringReader(stdin ?? ""));
            try
            {
                var ret = entry.Invoke(null, src);
                if (ret is Task t) t.GetAwaiter().GetResult();
            }
            catch (TargetInvocationException tie) { Fail(tie.InnerException); }
            catch (Exception e) { Fail(e); }
            void Fail(Exception e)
            {
                r.Outcome = "exception";
                var frame = new System.Diagnostics.StackTrace(e, true).GetFrames()?.FirstOrDefault(f => f.GetFileName() != null);
                var where = frame != null ? $" (at {Path.GetFileName(frame.GetFileName())} line {frame.GetFileLineNumber()})" : "";
                r.Exception = $"{e.GetType().FullName}: {e.Message}{where}";
                if (e is InvalidOperationException or IOException or PlatformNotSupportedException && e.StackTrace?.Contains("System.Console") == true)
                    r.Notes.Add("this used a Console feature the native check cannot run (ReadKey, Clear or colours); the page supports it");
            }
        });
        if (!task.Wait(TimeSpan.FromSeconds(10)))
        {
            r.Outcome = "timeout";
            r.Notes.Add("still running after 10 s; it keeps running in the background of this check");
        }
        Console.SetOut(oldOut); Console.SetError(oldErr); Console.SetIn(oldIn);
        r.Output = output.ToString();
        if (r.Outcome != "timeout") alc.Unload();
    }
}
