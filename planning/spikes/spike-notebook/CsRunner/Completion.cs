#if WITH_COMPLETION
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Completion;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Host.Mef;
using Microsoft.CodeAnalysis.Text;

public static partial class Runner
{
    static AdhocWorkspace? _ws;
    static DocumentId? _docId;

    /// <summary>Semantic completion at 'position' in 'code', compiled as one regular C# file together with
    /// 'context' files (other cells' declarations). Returns {items:[{text, tags, inline}], ms}.</summary>
    [JSExport]
    public static async Task<string> Complete(string[] contextTexts, string code, int position)
    {
        var sw = Stopwatch.StartNew();
        var t = new Dictionary<string, double>();
        var res = new Dictionary<string, object?> { ["timings"] = t };
        try
        {
            if (_ws == null)
            {
                var host = MefHostServices.Create(MefHostServices.DefaultAssemblies);
                t["mef"] = sw.Elapsed.TotalMilliseconds;
                _ws = new AdhocWorkspace(host);
                var pid = ProjectId.CreateNewId();
                _ws.AddProject(ProjectInfo.Create(pid, VersionStamp.Create(), "cells", "cells", LanguageNames.CSharp,
                    compilationOptions: new CSharpCompilationOptions(OutputKind.ConsoleApplication, nullableContextOptions: NullableContextOptions.Enable, concurrentBuild: false),
                    parseOptions: new CSharpParseOptions(LanguageVersion.Latest),
                    metadataReferences: Refs));
                _ws.AddDocument(pid, "GlobalUsings.cs", SourceText.From(string.Concat(ImplicitUsings.Select(u => $"global using global::{u};\n"))));
                _docId = _ws.AddDocument(pid, "cell.cs", SourceText.From("")).Id;
                t["workspace"] = sw.Elapsed.TotalMilliseconds;
            }
            var sol = _ws.CurrentSolution;
            var proj = sol.GetDocument(_docId!)!.Project;
            foreach (var d in proj.Documents.Where(d => d.Name.StartsWith("ctx")).ToList()) proj = proj.RemoveDocument(d.Id);
            for (int i = 0; i < contextTexts.Length; i++) proj = proj.AddDocument($"ctx{i}.cs", SourceText.From(contextTexts[i])).Project;
            var doc = proj.GetDocument(_docId!)!.WithText(SourceText.From(code));
            var svc = CompletionService.GetService(doc) ?? throw new InvalidOperationException("no CompletionService");
            t["doc"] = sw.Elapsed.TotalMilliseconds;
            var list = await svc.GetCompletionsAsync(doc, position);
            t["complete"] = sw.Elapsed.TotalMilliseconds;
            res["count"] = list.ItemsList.Count;
            // Rank like an editor would: items whose text starts with what is typed, first.
            var typed = code[..position].Reverse().TakeWhile(ch => char.IsLetterOrDigit(ch) || ch == '_').Reverse().ToArray();
            var prefix = new string(typed);
            res["prefix"] = prefix;
            res["items"] = list.ItemsList
                .Where(i => prefix.Length == 0 || i.FilterText.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                .OrderBy(i => i.SortText).Take(25)
                .Select(i => (object?)(i.DisplayText + " [" + string.Join(",", i.Tags) + "]")).ToList();
            res["ok"] = true;
        }
        catch (Exception e) { res["ok"] = false; res["error"] = e.ToString(); }
        t["total"] = sw.Elapsed.TotalMilliseconds;
        return J.Write(res);
    }
}
#endif
