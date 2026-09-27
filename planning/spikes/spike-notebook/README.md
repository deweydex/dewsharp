# Notebook-style C# in the browser: feasibility spike

Builds on `../spike-program` (copied, not modified). Question: can C# cells share state the way the
Python notebook's cells do, in a static page with no server? Nothing here touches dewlab or dewcode.

## Layout

```
CsRunner/Program.cs        base runner (CompileAndRun), unchanged
CsRunner/Notebook.cs       Model A (SubReset/SubRun: live shared state via script submissions)
                           Model B (NotebookAssemble: cells -> ordinary multi-file program)
                           Hybrid (LibBuild: declaration cells -> ordinary library; SubRun cells reference it)
                           Script API attempt (ScriptRun) behind WITH_SCRIPTING
CsRunner/Completion.cs     stretch: Roslyn CompletionService, behind WITH_COMPLETION
CsRunner/Json.cs           reflection-free JSON writer
CsRunner/wwwroot/*.js      worker gained a generic {type:'call', method, args}; host gained invoke()
tools/scriptA.mjs          the four-cell test (A: 'own' executor; 'raw'/'refs': Script API)
tools/semantics.mjs        what C# script changes for FOOP teaching (one case per behaviour)
tools/modelB.mjs           Model B cases and failure modes
tools/bench-nb.mjs         Model A: cold boot, per-cell latency, stop+replay, memory over 200 cells
tools/scale.mjs            20 class cells + 1 statement cell, Model A vs Model B
tools/hybrid.mjs           hybrid: library of declarations + live script cells, rebuild/reset behaviour
tools/completion.mjs       completion probes
tools/college-timing.mjs   base 3-file program timing in this build (reconciles with the base spike)
*.log                      the runs quoted in the report
out/nb                     recommended build (no extra packages)
out/withScripting          + Microsoft.CodeAnalysis.CSharp.Scripting (only to show it fails)
out/completion             + CSharp.Features/Workspaces
```

## Rebuild and run

```bash
S=/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad
export PATH=$S/dotnet:$PATH DOTNET_ROOT=$S/dotnet DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
cd $S/spike-notebook
tools/publish.sh nb -p:RootBcl=true
tools/publish.sh withScripting -p:RootBcl=true -p:WithScripting=true
tools/publish.sh completion -p:RootBcl=true -p:WithCompletion=true
node tools/scriptA.mjs out/nb/wwwroot 8811 own        # four cells, Model A
node tools/semantics.mjs out/nb/wwwroot 8815          # [filter]
node tools/modelB.mjs out/nb/wwwroot 8830             # [filter]
node tools/bench-nb.mjs out/nb/wwwroot 8820
node tools/scale.mjs out/nb/wwwroot 8850
node tools/hybrid.mjs out/nb/wwwroot 8880
node tools/completion.mjs out/completion/wwwroot 8840
```

Note: piping a harness into `head` kills it (SIGPIPE through tee); redirect to a file instead.

## Model A in one paragraph

`Script.RunAsync` cannot run in the browser (it always builds a reference from `typeof(object).Assembly.Location`,
which is empty). The script *language* is in the compiler, so `SubRun` calls
`CSharpCompilation.CreateScriptCompilation(name, tree, refs, options, previousCompilation, returnType: null)`,
emits PE+PDB, loads into one custom AssemblyLoadContext that resolves earlier cells by name, and calls the
`<Factory>(object[] submissions)` entry point with one shared array, the way Roslyn's ScriptExecutionState
does. Cells with nothing to emit (only `using`s) join the chain without taking a slot.
