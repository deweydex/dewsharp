# verdict
A notebook where C# cells share live state can run in the browser, but not through the package built for that job. Microsoft.CodeAnalysis.CSharp.Scripting's CSharpScript.Create/RunAsync fails on every cell, with or without references supplied from bytes, because it always builds a reference from typeof(object).Assembly.Location, which is empty in wasm. The scripting language itself lives in the compiler, though. About 100 lines around CSharpCompilation.CreateScriptCompilation plus a small submission executor run all four requested cells correctly. Variables carry across cells, a class can be redefined, a throw reports cell4:line 3, and state survives exceptions and compile errors. In a fresh worker the first cell takes about 1.3 s and the second about 0.6 s; after that a cell takes 65-160 ms. The download adds nothing over the base prototype (9.04 MB gzip in 65 requests, identical). The cost is language fit. C# script is not the C# a FOOP course teaches. Namespaces are forbidden. Every class is nested in Submission#0, so an object with no ToString prints "Submission#0+Student". Extension methods in a static class fail to compile. Main is ignored. A redefined class is a second type with the same name, which gives errors like "cannot convert from 'Student [cell2(1)]' to 'Student [cell1(1)]'". Script also accepts forms ordinary C# rejects, such as top-level private fields and uninitialised locals. Memory also grows faster the longer the notebook runs: 250 MB of wasm after 200 cells. The "declarations persist, statements run" model keeps ordinary C#, and namespaces, interfaces, extension methods, partial classes and a student-written Main all work. It shares no variables, though, and each run recompiles every declaration: about 775 ms for 20 class cells. A hybrid tested last looks best for FOOP. Declaration cells compile as an ordinary library, and statement cells run as live script cells against it. It keeps ordinary C# types and live variables. The one cost is that editing a class forces a restart and a re-run of the statement cells. Roslyn semantic completion also works in the browser but adds about 6.3 MB gzip, and its first request takes 3.2 s. Overall: feasible, but it is a separate engine with its own semantics to design, not a small addition to the Python runtime.

# worked
- Four-cell shared-state sequence using own executor over CSharpCompilation.CreateScriptCompilation (CsRunner/Notebook.cs:238-296). Cell1 `var total=0; class Student`, cell2 printed 'Ada has 15 credits; total = 15' and showed the value 15, cell3 redefined Student with Describe() and printed 'Grace (20 credits)', cell4 threw with stack 'Submission#0.Check(Student s) in cell4:line 3 / ...MoveNext() in cell4:line 6', cell5 still saw total=15 and grace. Verified in headless Chromium: scriptA-own-nb.log, repeated 3 passes.
- Variable inspector and Jupyter-style value display: the last expression without a semicolon comes back as the returnValue (cell2 `total` -> 15 System.Int32), and variables are read from submission fields (Notebook.cs Variables()). Verified: scriptA-own-nb.log.
- State survives a compile error (`keep = "x"` CS0029, then `keep + 1` -> 2) and an exception (variables assigned before the throw keep their values; later ones read default: before=1, after=0). Verified: semantics.log.
- C# script behaviours relevant to FOOP, each run in the browser (semantics.log): namespace block and file-scoped namespace -> CS7021; Console.WriteLine(obj) and typeof(Student).FullName -> 'Submission#0+Student' (GetType().Name and nameof give 'Student', records print normally); static fields and constructors persist across cells (Counter.Count=2), and top-level static/const are accepted; extension method in a static class -> CS1109 'StudentExt is a nested class', C# 14 extension block -> CS9283, top-level `static string Whisper(this string s)` works; interfaces including default members work; access modifiers are enforced on members (CS0122); `protected class` gives CS0628 'sealed type'; top-level `private int hidden`, `public int shown` and `private void Helper()` are accepted; `static void Main` and `class Program { static void Main }` are ignored with CS7022, and calling Program.Main gives CS0122; inheritance across cells works; partial classes do not merge across cells (CS1061); usings carry across cells; top-level await and Console.ReadLine with stdin work; nullable warnings are reported.
- Redefinition semantics verified (semantics.log): a later cell sees the new class; old instances keep the old type (`ada is Student` False plus warning CS0184); a method from cell1 rejects the new type with CS1503 'cannot convert from Student [cell2(1)] to Student [cell1(1)]'; redefining an interface or base class breaks old implementers (CS0266, CS0029); `var ada` can be redeclared with a new type; a redefined method takes over (Sq(3) 9 -> 27).
- Model B, 'declarations persist, statements run' (Notebook.cs:329 NotebookAssemble + base CompileAndRun), verified in modelB.log: namespaces, file-scoped namespaces, interfaces, extension methods, partial classes across cells, and ToString printing 'School.Student' all behave as ordinary C#; exceptions map to cell4:line 3 and cell6:line 4; lastWins replaces a redefined class; a student-written Main alone runs.
- Model B failure modes verified (modelB.log): an earlier statement cell's variable -> CS0103; a duplicate class without lastWins -> CS0101 plus 15 cascading diagnostics; re-running an earlier cell sees only declarations above it; in replay mode the same variable declared in two cells -> CS0128, Random gives a different value on every run (800/125/878), and earlier cells consume stdin; an error in any earlier declaration cell breaks every later cell; usings are per cell (CS0246) but `global using` carries; a student `class Program` plus any statement cell -> CS0260.
- Hybrid, library plus live cells (Notebook.cs LibBuild, tools/hybrid.mjs, hybrid.log): declaration cells with `namespace School;`, an internal class and an extension method compile as a library; script cells use them with shared variables (printed 'School.Student', `ada.IsFullTime()` True, total carried to 16); the exception mapped to 'decl1:line 7' and 'stmt2:line 2'. Rebuilding the library without a reset -> CS0433 'Student exists in both lib1 and lib2'; after a reset and a replay of the 3 statement cells it works (78+64+66 ms).
- Roslyn CompletionService in the browser (CsRunner/Completion.cs, completion.log): `s.` on a Student from another cell -> Credits, Enrol, Name plus object members (private field correctly hidden); `Console.Wr` -> Write, WriteLine; `new Stu` -> Student; `fo` -> for/foreach keywords and snippets. Compile+run in the same worker still works afterwards.
- Download size: the recommended build out/nb sent 9,043,890 bytes gzip in 65 requests, exactly the base trimrooted figure, because only CreateScriptCompilation (already in Microsoft.CodeAnalysis.CSharp) is used. Measured by bench-nb.mjs with the server's byte counter.

# failed
- CSharpScript.Create(...).RunAsync / ContinueWithAsync (the Scripting package) FAILS in the browser on every cell. It throws NotSupportedException 'Can't create a metadata reference to an assembly without location' from Script.GetReferencesForCompilation, which always calls CreateFromAssembly(typeof(object).Assembly) (decompiled at spike-notebook/.decomp/Script.cs:258). This happens with ScriptOptions.Default and with .WithReferences(bytes). ScriptOptions.CreateFromFileFunc is internal and runs only after the Location check throws, so there is no public workaround short of forking Roslyn scripting. Log: scriptapi-fails.log (10 failures).
- Referencing the Scripting package anyway adds 0.57 MB gzip: System.Text.Encoding.CodePages 0.51 MB, Scripting 0.03 MB. Measured on out/withScripting; not needed.
- Not tried: the default per-submission Assembly.Load(byte[]) path. I used one custom AssemblyLoadContext that resolves earlier cells by name from the start.
- Not tried: stopping a runaway cell without losing state. terminate() is the only stop and it discards every variable. Only replay was measured.
- Model B memory not re-measured. The base spike measured 0.5-0.9 MB per run, and Model B is the same compile-a-program path.
- Model B optimisation not tried: compile the declarations once and reference them. The hybrid does effectively this for Model A.
- Hybrid limits: the InternalsVisibleTo pool covers only the next 500 cell assembly names (a hack); editing a declaration needs a reset plus replay of the statement cells (verified CS0433 otherwise); not benchmarked beyond the timings in hybrid.log.
- Completion: a trimmed Features/Workspaces build was not tried. The MEF assemblies were rooted whole, because MEF finds its parts by reflection. Also not tried: lazy-loading the completion engine separately, hover, signature help, completion inside script (Submission) documents.
- Completion printed an unhandled PlatformNotSupportedException (Process.GetCurrentProcess in Microsoft.CodeAnalysis.Host.DefaultPersistentStorageConfiguration..cctor) to the console. Completion and running kept working; side effects were not investigated.
- Only headless Chromium on Linux was tested. Not tested: Firefox, Safari, mobile, a throttled network for these variants (the out/nb download is byte-identical to the base prototype, whose throttled timings apply), and any notebook UI (everything was driven from harness scripts).

# measurements
- Model A first cell in a fresh worker: 1257 / 1311 / 1422 ms (3 cold boots); second cell 585-633 ms; later cells 79-153 ms (tools/bench-nb.mjs, fresh browser context each time, host-measured round trip, headless Chromium, 4-CPU container, localhost)
- Model A warm cell latency: 64-125 ms per cell (second pass of the same 5 cells); median 51-59 ms for small cells over 200 cells (tools/bench-nb.mjs and scriptA.mjs passes 2-3)
- Model A download vs base: +0 bytes: 9,043,890 bytes gzip in 65 requests (base trimrooted identical); _framework 64 files, 26.86 MB raw, 9.45 MB gzip-9, 7.08 MB brotli (serve.mjs byte counter on cold boot; tools/sizes.py on out/nb)
- Scripting package size, if referenced: +0.57 MB gzip (CodePages 512,767 B, Scripting 29,726 B, CSharp.Scripting 5,284 B); 10.01 MB gzip total (per-file gzip -9 diff of out/withScripting vs spike-program/out/trimrooted)
- Stop a runaway cell and restore state: terminate->ready 350 ms; replay of 5 cells 2205 ms (1184, 673, 166, 101, 81); total 2.67 s (tools/bench-nb.mjs: `while(true){}` with a 2 s timeout, restart, re-run cells 1-5, check total==15)
- Model A memory over 200 cells: wasm 100 MB -> 121 / 145 / 174 / 250 MB at 50/100/150/200 cells; managed heap 16 -> 25 / 44 / 73 / 114 MB (growth speeds up) (tools/bench-nb.mjs, GC.Collect then GetTotalMemory, HEAP8.buffer.byteLength)
- Model B run latency, small notebook: first run 1.2 s; then 60-180 ms per run (4-6 cells) (tools/modelB.mjs (assemble + CompileAndRun), modelB.log)
- Growth with notebook size: 20 class cells (~200 lines) + 1 statement cell: Model B 673-909 ms per run (median 775); Model A 97-157 ms per class cell, statement cell 162-255 ms (tools/scale.mjs after a warm-up compile)
- Base 3-file college program in this build: first 3131 ms, then 349-429 ms (base build same run: 2606, then 364-464) (tools/college-timing.mjs on out/nb and spike-program/out/trimrooted)
- Hybrid library build: 1690 ms cold (first compile in worker), 300-388 ms warm; first script cell after it 777 ms, then 45-107 ms (tools/hybrid.mjs, hybrid.log)
- Completion download: 15,470,463 bytes gzip in 95 requests (+6.4 MB, +30 requests vs out/nb); _framework 43.48 MB raw, 15.72 MB gzip-9, 11.88 MB brotli (serve.mjs byte counter; sizes.py on out/completion)
- Completion latency: first request 3.2 s (MEF host 0.65-0.68 s, workspace +0.5 s, first completion ~2 s); warm member lists 114-400 ms; statement-start list (3,595 items) 760-880 ms (tools/completion.mjs, two runs)
- Worker memory after completion: wasm 173.7 MB after 7 completions + 1 run (tools/completion.mjs memory probe)

# gotchas
- CSharpScript/Script.RunAsync is unusable in browser-wasm (Assembly.Location is ''). Fix: skip the Scripting package. Call CSharpCompilation.CreateScriptCompilation(name, tree, refs, options, previousCompilation, returnType) yourself, emit, load, and call the `<Factory>(object[] submissions)` entry point with one shared array whose slot 0 is the globals object (Notebook.cs:238-296).
- CreateScriptCompilation(..., returnType: typeof(object)) gives CS0400 'System.Object, System.Private.CoreLib ... could not be found', because the reference set has System.Runtime, not CoreLib. Fix: pass returnType: null, which defaults to object (Notebook.cs:250).
- A cell with nothing to emit (only `using` directives) fails Emit with zero errors. If you drop it, its usings vanish. Fix: as Roslyn's ScriptBuilder does, chain the compilation as previousScriptCompilation but give it no state slot (Notebook.cs:256-260).
- Advance the submission slot and the previous-compilation chain only if the submission's constructor stored itself in the array (`_subs[_subCount] != null`). That way a cell that throws keeps its variables, and a compile error leaves the state untouched (Notebook.cs:284).
- Load every submission into one AssemblyLoadContext whose Load() override returns earlier cells' assemblies by name, so cell N resolves cells 1..N-1 (Notebook.cs:218).
- C# script nests every type in Submission#0. Default ToString prints 'Submission#0+Student', stack frames read 'Submission#0+<<Initialize>>d__0.MoveNext()', and Model B frames read 'Program.<<Main>$>g__Check|0_0'. A student-facing runner has to rewrite frame names.
- C# script rejects namespaces (CS7021) and extension methods in a static class (CS1109), and ignores Main (CS7022). It accepts forms that ordinary C# rejects: `int counter; counter++;` works in script but is CS0165 in a program; `private int x = 3;` at top level works in script but is CS0116 in a program. Students would learn two dialects.
- A redefined class in script is a different type with the same display name. The errors read 'cannot convert from Student [cell2(1)] to Student [cell1(1)]', and the same pattern applies to redefined interfaces and base classes.
- Model A memory grows faster the longer a session runs, because each compilation keeps the whole previous chain (114 MB managed heap / 250 MB wasm after 200 cells). Plan for 'Restart' and 'Restart & run all', as the Python notebook already offers (/home/user/dewlab/compose/notebook.html:398-400).
- Stopping a runaway cell means terminate(), which loses every variable. The Python engine can interrupt in place when crossOriginIsolated (/home/user/dewlab/assets/pyodide-engine.js:144-153). For C#, restoring state means replaying the cells: 2.2 s for 5 cells, because the first cells in a fresh worker are cold.
- Model B needs rules the student can see. A cell with any top-level statement is a statement cell, and its usings are hoisted. `private int x` parses as a member, not a statement, so that cell becomes a broken declaration file that breaks every later run. A student `class Program` collides with the class generated for top-level statements (CS0260). Redefinitions need a last-definition-wins rule, or CS0101 cascades.
- Model B replay mode brings Python-like variable flow but reruns side effects: Random changes each run, earlier ReadLines consume stdin, and a variable declared in two cells is CS0128.
- The hybrid (library for declarations, script for statements) needs internal types visible across assemblies. Fix used: InternalsVisibleTo for the next 500 submission assembly names. Rebuilding the library under a new name while old cells still reference the old one gives CS0433, so a declaration edit must reset state and replay.
- CompletionService needs the Features/Workspaces/System.Composition assemblies rooted against trimming, because MEF finds its parts by reflection. It adds about 6.3 MB gzip and logs an unhandled PlatformNotSupportedException (Process.GetCurrentProcess) from DefaultPersistentStorageConfiguration, which did not stop completion.
- Harness trap: `node harness | tee log | head` kills the run through SIGPIPE when head exits. Redirect to a file instead.

# code
/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/spike-notebook (README.md; engine in CsRunner/Notebook.cs, CsRunner/Completion.cs; harnesses in tools/; logs *.log; builds in out/nb, out/withScripting, out/completion)

# report
# Notebook-style C# in the browser

Prototype: `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/spike-notebook`. It is a copy of the base spike-program with three new files: `CsRunner/Notebook.cs`, `Completion.cs` and `Json.cs`. Nothing in dewlab or dewcode was touched. All results come from headless Chromium in a 4-CPU container on localhost. The quoted runs are in the `*.log` files there.

## 1. Live shared state between cells (C# script)

### The Scripting package does not work in the browser
`CSharpScript.Create(code, opts).RunAsync(...)` and `ContinueWithAsync` fail on every cell with `NotSupportedException: Can't create a metadata reference to an assembly without location`. This happens with `ScriptOptions.Default` and with `.WithReferences(<reference assemblies from bytes>)` (`scriptapi-fails.log`).

The cause is `Script.GetReferencesForCompilation`, which always calls `CreateFromAssembly(typeof(object).Assembly)`. That reads `Assembly.Location`, which is `""` on browser-wasm (decompiled at `.decomp/Script.cs:258`). The hook that could replace it, `ScriptOptions.CreateFromFileFunc`, is internal and runs only after the location check has already thrown. Referencing the package also costs 0.57 MB gzip, most of it System.Text.Encoding.CodePages.

### What does work: drive the compiler directly
The scripting language lives in the compiler: submissions, classes nested in `Submission#0`, and variables stored as fields. `SubRun` (`Notebook.cs:238-296`) does five things:
- calls `CSharpCompilation.CreateScriptCompilation(name, tree, refs, opts, previousCompilation, returnType: null)`;
- emits the PE and a PDB;
- loads the result into one AssemblyLoadContext that resolves earlier cells by name;
- calls `<Factory>(object[] submissions)` with one shared array;
- advances the chain only if the submission's constructor filled its slot, as Roslyn's `ScriptExecutionState` does.

Three traps had to be fixed along the way:
- `returnType: typeof(object)` gives CS0400, because System.Private.CoreLib is not in the reference set.
- A cell containing only usings "fails" to emit with no errors. It has to join the chain anyway, or its usings are lost.
- The runtime prints no file:line, so line numbers come from our own PDB lookup.

### The four requested cells (`scriptA-own-nb.log`)
| cell | result |
|---|---|
| 1 `var total = 0;` + `class Student` (constructor, method) | ok; variables: total=0 |
| 2 uses `total` and `Student`, ends with `total` | prints "Ada has 15 credits; total = 15", value 15 |
| 3 redefines `Student` with `Describe()` | prints "Grace (20 credits)"; old `ada` keeps the old type (`ada is Student` is False, warning CS0184) |
| 4 throws | "InvalidOperationException: Grace has too many credits at Submission#0.Check(Student s) in cell4:line 3 ... in cell4:line 6"; state kept |
| 5 | sees total=15 and grace after the exception |

**Latency** (3 cold boots): the first cell in a fresh worker takes 1257-1422 ms and the second 585-633 ms. After that a cell takes 79-153 ms, and 64-125 ms on the second pass. Across 200 small cells the median was 51-59 ms.

**Download:** zero added bytes. The recommended build sends 9,043,890 bytes gzip in 65 requests, identical to the base prototype, because `CreateScriptCompilation` is already in Microsoft.CodeAnalysis.CSharp.

**Stopping a runaway cell:** `terminate()` is the only stop. It takes 350 ms and loses all state. Replaying 5 cells to restore it took 2.2 s, so 2.7 s in all.

**Memory:** wasm memory went from 100 MB to 121, 145, 174 and 250 MB at 50, 100, 150 and 200 cells. The managed heap went from 16 MB to 114 MB, and it grows faster the longer the session runs, because each compilation keeps the whole previous chain. Per-cell latency stayed flat. A "Restart" and "Restart & run all" pair is needed, as the Python notebook already has (`/home/user/dewlab/compose/notebook.html:398-400`).

## 2. What C# script changes for FOOP (each behaviour run, `semantics.log`)
- **Namespaces:** `namespace School { }` and `namespace School;` both give CS7021 "Cannot declare namespace in script code".
- **Classes nested in Submission#0:** `Console.WriteLine(obj)` and `typeof(Student).FullName` both give `Submission#0+Student`. `GetType().Name` and `nameof` give `Student`. Records print normally. Stack frames read `Submission#0+<<Initialize>>d__0.MoveNext()`.
- **Static members:** static fields and constructors work and persist across cells (Counter.Count = 2). Top-level `static int Twice(...)`, `static int shared`, `const` and `static class` are all accepted.
- **Extension methods:** a `static class StringExt { public static string Shout(this string s) ... }` gives CS1109 "must be defined in a top level static class; StringExt is a nested class". The C# 14 `extension(...)` block gives CS9283. A top-level `static string Whisper(this string s)` works, but that form is script-only.
- **Interfaces:** they work, including default interface members. Redefining `IShape` in a later cell means `new Circle()` no longer converts to it (CS0266 "An explicit conversion exists").
- **Access modifiers:** they are enforced on members (CS0122). `protected class D` gives CS0628 "new protected member declared in sealed type". Top-level `private int hidden`, `public int shown` and `private void Helper()` are accepted. Ordinary C# rejects all of them with CS0116 (verified in Model B).
- **Main:** `static void Main()` and `class Program { static void Main(string[] args) }` are both ignored with CS7022 "entry point of the program is global code". Calling `Program.Main(...)` gives CS0122.
- **Redefinition:** later cells see the new class. A method from cell 1 rejects the new type with CS1503 "cannot convert from 'Student [cell2(1)]' to 'Student [cell1(1)]'". `ada.Credits` on an old instance gives CS1061. Redefining a base class breaks old subclasses (CS0029 "Cannot implicitly convert type 'Dog' to 'Animal'"). `var ada = "string"` may redeclare with a new type. A redefined method takes over (Sq(3): 9, then 27). Partial classes do not merge across cells (CS1061).
- **Other differences:**
  - `int counter; counter++;` is legal in script. It is CS0165 in a program.
  - Usings carry to later cells.
  - Top-level `await`, `Console.ReadLine` and nullable warnings all work.
  - A compile error leaves state untouched.
  - After a throw, variables assigned before it keep their values and later ones read as default.

## 3. "Declarations persist, statements run" (Model B, ordinary C#)
`NotebookAssemble` (`Notebook.cs:329`) turns cells 0..current into one ordinary program, which is then compiled by the base `CompileAndRun`:
- A cell with no top-level statements becomes its own `.cs` file, with `#line` pointing back to the cell.
- A mixed cell's types go to a side file.
- Only the current cell's statements run. With `replay=true`, the statements of every cell up to the current one run.
- With `lastWins=true`, a class declared again in a later cell replaces the earlier one.
- If a student's `Main` exists and there are no statements, it becomes the entry point.

**What works as ordinary C#** (`modelB.log`): `namespace School;`, interfaces, extension methods in a static class, partial classes across cells, `School.Student` in output, exceptions reported at cell4:line 3 and cell6:line 4, and a student-written Main.

**What the student would see** (`modelB.log`):
- A variable from an earlier statement cell: CS0103 "The name 'total' does not exist in the current context". No live state is shared, and statics reset on every run.
- Re-running an earlier cell sees only the declarations above it.
- A duplicate class without last-wins: CS0101 plus 15 cascading errors.
- An error in any earlier declaration cell breaks every later cell. `private int hidden = 3;` parses as a declaration, so it produces CS0116 on every later run.
- Usings are per cell (CS0246). `global using` carries.
- A student `class Program` plus any statement cell: CS0260.
- Replay mode gives Python-like flow, but:
  - the same variable declared in two cells is CS0128;
  - side effects rerun, so Random gave 800, 125 and 878 on three runs;
  - earlier cells consume stdin.

**Cost:** the first run takes 1.2 s. Small notebooks then take 60-180 ms per run. With 20 class cells (~200 lines) each run takes 673-909 ms (median 775), because every declaration is recompiled. Model A handles the same notebook at 97-157 ms per class cell (`scale.log`).

## 3b. Hybrid (tested because A and B each lose something)
Declaration cells compile as an ordinary library (`LibBuild`), and statement cells run as script submissions that reference it (`hybrid.log`):
- `namespace School;`, an internal class and an extension method all work.
- Variables are shared live (total carried from 15 to 16).
- Output prints `School.Student`.
- The exception maps to `decl1:line 7` and `stmt2:line 2`.

Internal types are made visible through InternalsVisibleTo for the next 500 cell assembly names. Editing a declaration and rebuilding without a reset gives CS0433 "Student exists in both lib1 and lib2". A reset plus a replay of the statement cells takes 78+64+66 ms here. The library build takes 1.7 s cold and 0.3-0.4 s warm. This looks like the best fit for FOOP, because students write ordinary C# classes. The cost is one clear rule: changing a class restarts the notebook and re-runs the statement cells.

## 4. Stretch: semantic completion
`CompletionService` over an `AdhocWorkspace` works in the browser (`Completion.cs`, `completion.log`):
- `s.` on a Student from another cell offers Credits, Enrol and Name; the private field is correctly hidden.
- `Console.Wr` offers Write and WriteLine.
- `new Stu` offers Student.
- `fo` offers the for and foreach keywords and snippets.

It costs about 6.4 MB more gzip: 15,470,463 bytes sent in 95 requests. The first request takes 3.2 s (MEF 0.68 s, workspace 0.5 s, first completion ~2 s). After that, member lists take 114-400 ms and statement-start lists (3,595 items) take 760-880 ms. The MEF assemblies must be kept whole against trimming. An unhandled PlatformNotSupportedException (Process.GetCurrentProcess) is logged but does no visible harm. For comparison, the Python pages complete with jedi against the live page namespace (`/home/user/dewlab/assets/pyodide-engine.js:200-210`).

## What this means
A C# notebook with shared state is feasible in a static page, at no extra download over the program runner and with faster cells (65-160 ms). It rests on a custom engine, because the official Scripting API cannot run in wasm. The script dialect conflicts with the object-oriented material FOOP teaches: namespaces, top-level types, extension methods, Main, ToString output and redefinition all behave differently. So the choice is a design decision, not a technical blocker:
- Model B keeps ordinary C# but shares no state.
- The hybrid keeps ordinary C# types and live variables, and needs a restart when a class changes.

Either way it is its own engine, with its own restart, stop and replay story. That supports keeping the C# runtime in its own folder or repository, loaded only by C# pages.