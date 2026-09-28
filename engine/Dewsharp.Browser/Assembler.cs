using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;

namespace Dewsharp;

public sealed record CellInput(string Id, string? File, string Code);

/// <summary>A type from a cell above that a later cell replaced (rule 4).</summary>
public sealed record Replacement(string Type, string CellId, string ByCellId);

/// <summary>One source file of the assembled program, and where its lines come from.</summary>
sealed record SourceFile(string Key, int CellIndex, SyntaxTree Tree);

/// <summary>The program built from the cells, ready to compile.</summary>
sealed class AssembledProgram
{
    public required List<SourceFile> Files;
    public required string[] Kinds;
    public required string[] FileNames;
    public required bool IsProgram;              // compile as a console program (otherwise a library)
    public required bool InputsInOwnFile;        // the target had no statements, so the inputs start the program
    public required List<Replacement> Replaced;
    public required HashSet<string> VariablesAbove;   // names made by statements in cells above (for help)
    public required HashSet<string> MethodsAbove;     // local methods written in cells above (for help)
    public required Dictionary<int, string> ProjectCode;   // a types cell above with some types replaced: its code without them
    public required bool DeclaresProgram;        // some included cell declares a top-level class Program
    public required Dictionary<int, (int start, int end, string key)> InputSpans;   // input index -> span in its tree
    public required Dictionary<string, int> TypeCells;   // simple name of each type in the program -> its cell
}

/// <summary>Builds one ordinary C# program from a page's cells, following the rules of the road
/// (CLAUDE.md; docs/LESSON_FORMAT.md, "Cell kinds"). The target is the last cell.
/// <list type="number">
/// <item>From every cell above the target it keeps the type declarations (classes, records, structs,
/// interfaces, enums, delegates, in or out of namespaces) and drops the statements, any class that contains
/// a static Main, and any type that a later cell (or the target) declares again.</item>
/// <item>It keeps the whole target: its statements are the program's top-level statements, or its Main is
/// the entry point.</item>
/// </list>
/// Nothing is moved: dropped code is overwritten with spaces, so every line and column stays where the
/// learner wrote it. Each cell becomes its own file, starting with <c>#line 1 "cell:N"</c> and parsed with an
/// empty path (spike_a trap 2: a syntax tree with a path makes Roslyn start a Task for its checksum and later
/// block on it while writing the PDB, which the single-threaded runtime can't do).</summary>
static class Assembler
{
    public static CompilationUnitSyntax Parse(string code, CSharpParseOptions options) =>
        (CompilationUnitSyntax)CSharpSyntaxTree.ParseText(code, options).GetRoot();

    /// <summary>A cell's kind, from its syntax alone: program (statements, or a static Main), types (only
    /// declarations and using lines), or empty (nothing but comments and white space).</summary>
    public static string KindOf(CompilationUnitSyntax root)
    {
        if (root.Members.Any(m => m is GlobalStatementSyntax)) return "program";
        if (TopTypes(root).Any(t => HasStaticMain(t.decl))) return "program";
        if (root.Members.Count > 0 || root.Usings.Count > 0 || root.AttributeLists.Count > 0 || root.Externs.Count > 0) return "types";
        return "empty";
    }

    public static string DefaultFileName(CompilationUnitSyntax root, string kind)
    {
        if (kind == "types")
        {
            var first = TopTypes(root).FirstOrDefault();
            if (first.decl != null) return Name(first.decl) + ".cs";
        }
        return "Program.cs";
    }

    static string Name(MemberDeclarationSyntax d) => d switch
    {
        BaseTypeDeclarationSyntax t => t.Identifier.ValueText,
        DelegateDeclarationSyntax dd => dd.Identifier.ValueText,
        _ => "",
    };

    public static bool HasStaticMain(MemberDeclarationSyntax decl) =>
        decl is TypeDeclarationSyntax td && td.Members.OfType<MethodDeclarationSyntax>()
            .Any(m => m.Identifier.ValueText == "Main" && m.Modifiers.Any(SyntaxKind.StaticKeyword));

    /// <summary>Top-level types (not nested ones), with their full name: namespace, name and generic arity.</summary>
    public static IEnumerable<(string fullName, MemberDeclarationSyntax decl)> TopTypes(SyntaxNode n, string prefix = "")
    {
        switch (n)
        {
            case CompilationUnitSyntax cu:
                foreach (var m in cu.Members) foreach (var t in TopTypes(m, prefix)) yield return t;
                break;
            case BaseNamespaceDeclarationSyntax ns:
                foreach (var m in ns.Members) foreach (var t in TopTypes(m, prefix + ns.Name.ToString().Replace(" ", "") + ".")) yield return t;
                break;
            case BaseTypeDeclarationSyntax { Identifier.IsMissing: true }:
            case DelegateDeclarationSyntax { Identifier.IsMissing: true }:
                break;   // "int class = 1;": a broken statement, not a type (see Build)
            case BaseTypeDeclarationSyntax td:
                yield return (prefix + td.Identifier.ValueText + (td is TypeDeclarationSyntax { TypeParameterList: { } tp } ? "`" + tp.Parameters.Count : ""), td);
                break;
            case DelegateDeclarationSyntax dd:
                yield return (prefix + dd.Identifier.ValueText + (dd.TypeParameterList is { } dtp ? "`" + dtp.Parameters.Count : ""), dd);
                break;
        }
    }

    static bool IsPartial(MemberDeclarationSyntax d) => d.Modifiers.Any(SyntaxKind.PartialKeyword);

    /// <summary>The code with the given spans cut out, and never more than one blank line in a row.</summary>
    static string WithoutSpans(string code, List<TextSpan> spans)
    {
        var sb = new StringBuilder();
        int pos = 0;
        foreach (var s in spans.OrderBy(s => s.Start))
        {
            if (s.Start > pos) sb.Append(code, pos, s.Start - pos);
            pos = Math.Max(pos, s.End);
        }
        if (pos < code.Length) sb.Append(code, pos, code.Length - pos);
        var lines = sb.ToString().Replace("\r\n", "\n").Split('\n').Select(l => l.TrimEnd()).ToList();
        var outLines = new List<string>();
        foreach (var l in lines)
            if (l.Length > 0 || (outLines.Count > 0 && outLines[^1].Length > 0)) outLines.Add(l);
        while (outLines.Count > 0 && outLines[^1].Length == 0) outLines.RemoveAt(outLines.Count - 1);
        return string.Join("\n", outLines) + "\n";
    }

    /// <summary>Overwrites the given spans with spaces, keeping line breaks, so positions don't move.</summary>
    static string Blank(string code, IEnumerable<TextSpan> spans)
    {
        var chars = code.ToCharArray();
        foreach (var s in spans)
            for (int k = s.Start; k < s.End && k < chars.Length; k++)
                if (chars[k] != '\n' && chars[k] != '\r') chars[k] = ' ';
        return new string(chars);
    }

    public static AssembledProgram Build(IReadOnlyList<CellInput> cells, IReadOnlyList<string>? inputs, CSharpParseOptions options,
        Dictionary<int, ValueRecord> inputErrors)
    {
        int target = cells.Count - 1;
        var roots = cells.Select(c => Parse(c.Code, options)).ToArray();
        var kinds = roots.Select(KindOf).ToArray();
        var fileNames = cells.Select((c, i) => string.IsNullOrWhiteSpace(c.File) ? DefaultFileName(roots[i], kinds[i]) : c.File!).ToArray();

        // Which cell owns each type: the last one that declares it (rule 4). Classes with a Main in the cells
        // above are left out altogether (rule 5), so they own nothing. Partial types are never replaced.
        var owner = new Dictionary<string, int>();
        for (int i = 0; i <= target; i++)
            foreach (var (name, decl) in TopTypes(roots[i]))
            {
                if (IsPartial(decl)) continue;
                if (i < target && HasStaticMain(decl)) continue;
                owner[name] = i;
            }

        var files = new List<SourceFile>();
        var replaced = new List<Replacement>();
        var variablesAbove = new HashSet<string>();
        var methodsAbove = new HashSet<string>();
        var projectCode = new Dictionary<int, string>();
        bool declaresProgram = false;
        var inputSpans = new Dictionary<int, (int, int, string)>();

        for (int i = 0; i < target; i++)
        {
            var root = roots[i];
            var drop = new List<TextSpan>();
            int kept = 0;
            foreach (var m in root.Members.OfType<GlobalStatementSyntax>())
            {
                drop.Add(m.Span);
                CollectVariables(m, variablesAbove, methodsAbove);
            }
            // A statement such as "int class = 1;" parses as a statement and then a class with no name. The
            // class is part of the broken statement, so it stays in its cell like the statement.
            foreach (var m in root.Members)
                if (m is BaseTypeDeclarationSyntax { Identifier.IsMissing: true } or DelegateDeclarationSyntax { Identifier.IsMissing: true })
                    drop.Add(m.Span);
            var replacedHere = new List<TextSpan>();
            foreach (var (name, decl) in TopTypes(root))
            {
                if (HasStaticMain(decl)) { drop.Add(decl.Span); continue; }
                if (!IsPartial(decl) && owner.TryGetValue(name, out var by) && by != i)
                {
                    drop.Add(decl.Span);
                    replacedHere.Add(decl.FullSpan);
                    replaced.Add(new Replacement(name.Split('`')[0], cells[i].Id, cells[by].Id));
                    continue;
                }
                kept++;
                if (name == "Program") declaresProgram = true;
            }
            // Top-level members that are neither types nor statements (a field or method written outside any
            // class) are errors in ordinary C#; they stay, so the learner sees the error in their cell.
            foreach (var m in root.Members)
                if (m is not GlobalStatementSyntax && m is not BaseNamespaceDeclarationSyntax && m is not BaseTypeDeclarationSyntax && m is not DelegateDeclarationSyntax)
                    kept++;
            // For Download project: a types cell that keeps some of its types, without the ones replaced below.
            if (kept > 0 && replacedHere.Count > 0 && kinds[i] == "types")
                projectCode[i] = WithoutSpans(cells[i].Code, replacedHere);
            string text;
            if (kept == 0)
            {
                // Nothing of this cell reaches the program. Only its `global using` lines still apply.
                var globals = root.Usings.Where(u => u.GlobalKeyword.IsKind(SyntaxKind.GlobalKeyword)).ToList();
                if (globals.Count == 0) continue;
                var keep = globals.Select(u => u.Span).ToList();
                text = Blank(cells[i].Code, new[] { root.FullSpan }.SelectMany(full => Complement(full, keep)));
            }
            else text = Blank(cells[i].Code, drop);
            files.Add(MakeFile("cell:" + i, i, text, options));
        }

        // The target: all of it, with the inputs of a comparison (if any) after its statements.
        var targetRoot = roots[target];
        foreach (var (name, decl) in TopTypes(targetRoot)) if (name == "Program") declaresProgram = true;
        var targetCode = cells[target].Code;
        bool targetHasStatements = targetRoot.Members.Any(m => m is GlobalStatementSyntax);
        bool inputsInOwnFile = false;
        var inputCode = inputs is { Count: > 0 } ? InputBlock(inputs, options, inputErrors, out var spans) : null;
        if (inputCode == null)
            files.Add(MakeFile("cell:" + target, target, targetCode, options));
        else if (targetHasStatements)
        {
            // After the line that holds the end of the last statement, then back to the cell's own numbering.
            var last = targetRoot.Members.OfType<GlobalStatementSyntax>().Last();
            int end = last.Span.End;
            int nl = targetCode.IndexOf('\n', end);
            string before, after;
            if (nl < 0) { before = targetCode + "\n"; after = ""; }
            else { before = targetCode.Substring(0, nl + 1); after = targetCode.Substring(nl + 1); }
            int nextLine = before.Count(ch => ch == '\n') + 1;
            var header = "#line 1 \"cell:" + target + "\"\n";
            var text = header + before + inputCode.Text + "#line " + nextLine + " \"cell:" + target + "\"\n" + after;
            int offset = header.Length + before.Length;
            foreach (var (k, s) in inputCode.Spans) inputSpans[k] = (s.start + offset, s.end + offset, "cell:" + target);
            files.Add(new SourceFile("cell:" + target, target, CSharpSyntaxTree.ParseText(SourceText.From(text, Encoding.UTF8), options, path: "")));
        }
        else
        {
            files.Add(MakeFile("cell:" + target, target, targetCode, options));
            files.Add(new SourceFile("inputs", -1, CSharpSyntaxTree.ParseText(SourceText.From(inputCode.Text, Encoding.UTF8), options, path: "")));
            foreach (var (k, s) in inputCode.Spans) inputSpans[k] = (s.start, s.end, "inputs");
            inputsInOwnFile = true;
        }

        bool isProgram = kinds[target] == "program" || inputCode != null;
        var typeCells = new Dictionary<string, int>(StringComparer.Ordinal);
        foreach (var (name, index) in owner) typeCells[name.Split('`')[0].Split('.').Last()] = index;
        return new AssembledProgram
        {
            Files = files, Kinds = kinds, FileNames = fileNames, IsProgram = isProgram, InputsInOwnFile = inputsInOwnFile,
            Replaced = replaced, VariablesAbove = variablesAbove, MethodsAbove = methodsAbove, ProjectCode = projectCode, DeclaresProgram = declaresProgram && (targetHasStatements || inputCode != null),
            InputSpans = inputSpans,
            TypeCells = typeCells,
        };
    }

    static IEnumerable<TextSpan> Complement(TextSpan full, List<TextSpan> keep)
    {
        int pos = full.Start;
        foreach (var k in keep.OrderBy(s => s.Start))
        {
            if (k.Start > pos) yield return TextSpan.FromBounds(pos, k.Start);
            pos = Math.Max(pos, k.End);
        }
        if (pos < full.End) yield return TextSpan.FromBounds(pos, full.End);
    }

    static SourceFile MakeFile(string key, int index, string code, CSharpParseOptions options) =>
        new(key, index, CSharpSyntaxTree.ParseText(SourceText.From("#line 1 \"" + key + "\"\n" + code, Encoding.UTF8), options, path: ""));

    static void CollectVariables(GlobalStatementSyntax g, HashSet<string> names, HashSet<string> methods)
    {
        switch (g.Statement)
        {
            case LocalDeclarationStatementSyntax ld:
                foreach (var v in ld.Declaration.Variables) names.Add(v.Identifier.ValueText);
                break;
            case LocalFunctionStatementSyntax lf:
                methods.Add(lf.Identifier.ValueText);
                break;
            case ExpressionStatementSyntax es:
                foreach (var d in es.DescendantNodes().OfType<SingleVariableDesignationSyntax>()) names.Add(d.Identifier.ValueText);
                break;
        }
    }

    sealed record InputCode(string Text, List<(int index, (int start, int end) span)> Spans);

    /// <summary>One <c>Values.Record(i, () => expression)</c> per input. Each expression sits on its own line
    /// under <c>#line 1 "input:i"</c>, so an error in it is reported for that input alone. An input that isn't
    /// a single complete expression is rejected here, before it can break the parse of the lines after it.</summary>
    static InputCode? InputBlock(IReadOnlyList<string> inputs, CSharpParseOptions options, Dictionary<int, ValueRecord> errors, out List<(int, (int, int))> spans)
    {
        var sb = new StringBuilder();
        spans = new();
        for (int i = 0; i < inputs.Count; i++)
        {
            if (errors.ContainsKey(i)) continue;
            var expr = inputs[i].Trim();
            var parsed = SyntaxFactory.ParseExpression(expr, options: options);
            var err = parsed.GetDiagnostics().FirstOrDefault(d => d.Severity == DiagnosticSeverity.Error);
            if (expr.Length == 0 || err != null || expr.Contains('\n'))
            {
                errors[i] = new ValueRecord(false, null, err?.Id ?? "CS1525",
                    err?.GetMessage() ?? "Each input must be one C# expression.", "compile-error");
                continue;
            }
            int start = sb.Length;
            sb.Append("#line hidden\nglobal::Dewsharp.Page.Values.Record(").Append(i).Append(", () =>\n#line 1 \"input:").Append(i).Append("\"\n")
              .Append(expr).Append("\n#line hidden\n);\n");
            spans.Add((i, (start, sb.Length)));
        }
        if (spans.Count == 0) return null;
        return new InputCode(sb.ToString(), spans);
    }
}
