# verdict
It works. A static page with no server compiled a 3-file C# console program with Roslyn inside a module Web Worker in headless Chromium, then ran it. The run fed stdin to Console.ReadLine, reported compile errors with the right file and line (Student.cs:21:69), and printed uncaught exceptions with file:line frames (Course.cs:line 14). A while(true){} was stopped by terminating the worker and booting a new one. The cost is a download. In the only variant that both works and is trimmed, a cold boot sends 9.0 MB gzip in 65 requests, against about 5.4 MB for dewlab's Pyodide core. The first compile+run in a fresh worker takes 2.5-3 s. After that a compile+run takes 350-450 ms. Stopping a runaway program costs about 0.4 s to reboot plus about 2 s for the next compile. The SDK defaults do not work out of the box: eight separate problems each broke real runs and needed a fix. The worst is that default trimming breaks every student program, and the fixed trimming still fails any program that uses an API outside the kept list (System.Text.Json failed that way). Memory also grows about 0.5-0.9 MB per run and is never returned, so the worker has to be recycled every so often. None of the eight is a blocker. Together they show that the notebook-style C# mini-IDE is feasible but is its own engine that needs care, not a small addition to the Python runtime. The C# runtime sits in its own folder and loads only when a page imports it (loading from a subfolder was tested), so a separate link-only C# section would add nothing to what the Python pages download.

# worked
- Booting .NET 10 inside a dedicated module Web Worker (`import { dotnet } from './_framework/dotnet.js'` in worker.js, driven by postMessage). Verified: every smoke and bench run reached 'ready' from the worker, and no fallback to the main thread was needed.
- Multi-file compile of Program.cs (top-level statements, `using College;`), Student.cs and Course.cs (namespace College, IEnrollable, abstract Person, Student, MatureStudent, List<T>, Dictionary<K,V>, a LINQ query, interpolation, a caught InvalidOperationException, an uncaught exception from First()). Verified: stdout matches the expected output, including 'Hello, Ada. Next year you will be 22.' read from stdin "Ada\n21\n" (smoke-trimrooted.log).
- Compile-error diagnostics name the right file and line: CS0103 'The name 'Nmae' does not exist' reported as Student.cs line 21 col 69, with and without PDB. Verified in smoke-*.log for every working variant.
- Runtime stack traces with file:line: 'at College.Course.Enrol(Student s) in Course.cs:line 14 / at Program.<Main>$(String[] args) in ThrowInCourse.cs:line 5' and 'Program.cs:line 43' for the async top-level case. Verified in smoke logs. lineInfo='pdb-lookup' shows the lines come from my own PDB reader; the runtime itself never supplied them.
- Async Main (`static async Task<int> Main`) and top-level `await` run after the host awaits the real async method instead of the compiler's sync wrapper. Verified: 'async Main, args=0' printed and exit code 3 captured.
- Stop: Spin.cs (`while (true) { }`) timed out at 3000 ms, then terminate() and a new worker, then 'Hello after restart' printed. terminate-to-ready took 404 ms (trimrooted) and 649 ms (notrim). Verified in bench.json 'stop'.
- Warm-cache worker re-creation fetched 0 bytes (served from HTTP cache under max-age=600): 399-418 ms trimrooted, 707-732 ms notrim. Verified via server byte counter in bench.json.
- Late output isolation: with an AsyncLocal-routed Console, a Timer and a Task.Delay continuation from run 1 no longer print into run 2. Before the fix run 2's stdout contained 'TIMER from run 1' and 'DELAY continuation from run 1' (bench-notrim). After it, run 2 shows only its own lines (bench-trimrooted).
- Static state resets per run, because each compile is a new assembly: Counter.Runs printed 1 on all three runs. Process-wide state persists: AppContext.SetData values carried over (null, 1, 2). Verified in bench.json 'state'.
- Roslyn itself survives full trimming (TrimMode=full, the SDK default): compilation and diagnostics worked in the trimfull variant. Only loading the user's program failed.
- Loading from a subfolder: serving out/trimrooted and opening /wwwroot/ booted and ran normally (tools/extra.mjs). dotnet.js resolves _framework relative to itself.
- The BCL probe (TryAdd, PriorityQueue, Regex, Chunk, Zip, fr-FR/en-IE culture formatting, records with `with`, HashSet, SortedDictionary, Enum.GetValues<T>) ran correctly in trimrooted once the System.Text.Json line was removed.
- GitHub Pages gzips application/wasm: verified with `curl -H 'Accept-Encoding: gzip' https://kripken.github.io/ammo.js/builds/ammo.wasm.wasm`, which returned server: GitHub.com, content-type: application/wasm, content-encoding: gzip.
- A warm-up compile of a one-line program right after boot (median 1.74 s) cut the first real 3-file compile+run to a median of 964 ms (tools/warmup.mjs).

# failed
- SDK default trimming (TrimMode=full) is BROKEN for student code. Every program fails with "Could not load file or assembly 'System.Runtime, Version=10.0.0.0'" because the trimmer deletes facade assemblies the user program references. Fixed with TrimmerRootAssembly for a curated BCL list (RootBcl=true) or PublishTrimmed=false.
- Even with the BCL rooted, anything outside the list fails. A program that mentions System.Text.Json.JsonSerializer died with TypeLoadException before printing anything, because the whole method fails to load. Only the untrimmed build ran it. I did not probe the full API surface a FOOP course might use.
- The runtime never prints file:line in stack traces, even with Assembly.Load(pe, pdb) and MonoConfig.debugLevel set to -1 or 1 through withConfig. Worked around by reading the PDB myself. I did not verify that debugLevel actually took effect inside the worker.
- A collectible AssemblyLoadContext did not reduce memory growth over 200 runs (208 MB plain vs 250 MB collectible at run 200), so unloading on Mono/wasm did not help here.
- Memory grows without bound: wasm memory went 48 MB (boot) to 120 MB (first compile) to 145, 174 and 208 MB by runs 20/40/80, and 208-250 MB by run 200. Not measured past 200 runs or on low-RAM devices (Chromebooks).
- performance.memory is main-thread only and quantized (it read 10,000,000), so it says nothing about the worker. I used the wasm HEAP8 byteLength from getDotnetRuntime(0).Module instead.
- Not tried: the other route to reference assemblies (WasmEnableWebcil=false plus fetching the runtime's own DLLs as MetadataReferences). Its possible upside is that trimmed-away APIs would show up as compile errors rather than runtime TypeLoadExceptions.
- Not tried: IntelliSense or completion. That needs Microsoft.CodeAnalysis.Workspaces and Features, which would add substantially to the download.
- Not tried: multi-threaded wasm (WasmEnableThreads). It needs COOP/COEP headers, which GitHub Pages cannot send.
- Not tested: whether GitHub Pages gzips the ICU .dat files (application/octet-stream). With InvariantGlobalization there are none.
- Only Chromium was available, so Firefox and Safari worker boot are untested. All timings come from a 4-CPU server container, and student laptops may be 2-4x slower on the compile numbers.
- Throttled boot used CDP Network.emulateNetworkConditions with 30 ms latency and one sample per speed, not a median of 3.

# measurements
- trimrooted _framework size (recommended variant): 64 files, 26.84 MB raw, 9.44 MB gzip -9, 7.07 MB brotli (whole wwwroot 67 files, 26.84 MB / 9.44 MB / 7.07 MB) (tools/sizes.py over out/trimrooted/wwwroot, excluding the SDK's .gz/.br siblings)
- notrim _framework size: 183 files, 42.47 MB raw, 15.31 MB gzip -9, 11.60 MB brotli (tools/sizes.py, PublishTrimmed=false)
- trimfull (SDK default, broken for user code) size: 43 files, 22.98 MB raw, 8.22 MB gzip -9, 6.12 MB brotli (tools/sizes.py)
- trimrooted + InvariantGlobalization size: 61 files, 24.22 MB raw, 8.59 MB gzip -9, 6.46 MB brotli (tools/sizes.py)
- TrimMode=partial + rooted BCL size: 72 files, 31.02 MB raw, 11.07 MB gzip -9, 8.10 MB brotli (tools/sizes.py)
- notrim + InvariantGlobalization size: 180 files, 39.86 MB raw, 14.47 MB gzip -9, 10.99 MB brotli (tools/sizes.py)
- Cost of Basic.Reference.Assemblies.Net100 (compile-time refs): 6.23 MB raw, 2.11 MB gzip -9, 1.18 MB brotli (single file) (tools/sizes.py, trimrooted)
- Bytes actually sent at cold boot: trimrooted 9.03 MB in 65 requests; notrim 15.03 MB in 184 requests (byte counter in tools/serve.mjs (serves the SDK's .gz), fresh browser context)
- Estimated download from gzip -9 total at 10/30/100 Mbps: trimrooted 7.6/2.5/0.76 s; trimrooted+invariant 6.9/2.3/0.69 s; notrim 12.2/4.1/1.2 s (bytes*8/bandwidth, no latency)
- Measured cold boot under throttling 10/30/100 Mbps: trimrooted 7.5/2.7/1.2 s; notrim 12.4/4.4/2.1 s (CDP Network.emulateNetworkConditions, 30 ms latency, navigation to worker ready, 1 sample each)
- Cold boot to ready, localhost, empty cache: trimrooted median 485 ms (481-503); notrim median 814 ms (796-953) (tools/bench.mjs, new browser context each, median of 3, headless Chromium)
- Compile+run #1 in a fresh worker (3-file college program, PDB on): trimrooted median 3018 ms (2607-3131); notrim median 2672 ms (2504-2829) (tools/bench.mjs host-side wall time, median of 3 cold workers)
- Compile+run #2 in same worker: trimrooted median 455 ms; notrim median 452 ms (tools/bench.mjs, median of 3)
- Compile+run #5 in same worker: trimrooted median 386 ms; notrim median 371 ms (tools/bench.mjs, median of 3)
- Phase breakdown of a warm run: parse ~15-30 ms, compile+emit ~350-440 ms, load <1 ms, run ~5-20 ms. The first run's compile+emit is ~2.5-3.0 s, and the first-ever access to the reference set costs ~20-30 ms after parse (Stopwatch marks inside CompileAndRun, returned in timings)
- PDB cost on the first run: 3-file program: 2.6 s first run with PDB, 362 ms for the next run without PDB. Warm runs cost ~30-70 ms more with PDB (smoke logs, same worker)
- Worker terminate to ready, warm HTTP cache: trimrooted median 410 ms (399-418), 0 bytes refetched; notrim median 709 ms (runner.restart() x3 in tools/bench.mjs)
- First compile+run after a restart: trimrooted median 2127 ms; notrim median 1748 ms (Hello.cs, one line) (tools/bench.mjs)
- Stop a while(true) loop: timeout fired at 3000 ms; terminate to ready 404 ms (trimrooted), 649 ms (notrim); next run then took 1.6-1.7 s (tools/bench.mjs 'stop')
- Warm-up compile effect: warm-up Hello median 1742 ms, then first real 3-file compile+run median 964 ms (tools/warmup.mjs, 3 fresh contexts, trimrooted)
- Memory growth: wasm memory 48.4 MB after boot, 120.6 MB after first runs, 144.7 at run 20, 173.7 at 40, 208.4 at 80-160, 250 MB at 200 (collectible ALC). GC heap 16.24 MB to 17.65 MB over 200 runs (~7-8 KB/run) (HEAP8.buffer.byteLength via getDotnetRuntime(0).Module plus GC.GetTotalMemory after a forced GC, tools/bench.mjs and tools/extra.mjs)
- Pyodide core download for comparison: ~5.45 MB transferred (pyodide.asm.wasm 2.82 MB, python_stdlib.zip 2.38 MB, pyodide.asm.js 0.22 MB, lock + loader) (curl -w size_download against cdn.jsdelivr.net/pyodide/v0.28.3/full/, the version dewlab uses (assets/pyodide-engine.js:315))
- Publish time: 42-61 s per variant (tools/publish.sh wall clock, 4 CPUs)

# gotchas
- Webcil: .NET 8+ browser builds wrap assemblies in .wasm (Webcil), which Roslyn cannot use as metadata. Fix: embed compile-time reference assemblies from Basic.Reference.Assemblies.Net100 1.8.12 (Program.cs:30). This costs 2.1 MB gzip.
- PDB emit throws 'Cannot wait on monitors on this runtime'. Roslyn's Microsoft.Cci.DebugSourceDocument ctor does `_sourceInfo = Task.Run(sourceInfo)` for every syntax tree with a FilePath (Compilation.CreateDebugDocuments), and the PDB writer later blocks on `.Result` inside the same synchronous Emit. Single-threaded wasm cannot block. Fix: parse each file with path "" and prefix `#line 1 "Student.cs"` (Program.cs:54). Diagnostics use GetMappedLineSpan, so file and line stay correct, and MethodCompiler creates checksum-less documents.
- The Console.In getter throws PlatformNotSupportedException on browser-wasm, but Console.SetIn works (Program.cs:97). Never save or restore Console.In.
- Async Main and top-level await: the compiler's sync `<Main>` wrapper calls GetAwaiter().GetResult() and throws 'Cannot wait on monitors'. Fix: find `<Main>$` or `Main` returning Task and await it from an async [JSExport] that returns Task<string>, which becomes a Promise (Program.cs:119).
- Release wasm builds default to UseSystemResourceKeys=true, so exception messages become keys such as 'NoMatch' or 'Arg_PlatformNotSupported'. Set <UseSystemResourceKeys>false</UseSystemResourceKeys> (CsRunner.csproj:9).
- Default publish trimming (TrimMode=full) deletes the System.Runtime and System.Console facades the student's assembly references, so every program fails at EntryPoint. Root the BCL with TrimmerRootAssembly (CsRunner.csproj:23) or disable trimming. Any API still trimmed away fails the whole method with TypeLoadException before any output, which is confusing for students.
- The runtime prints no file:line even with Assembly.Load(pe, pdb) and a debugLevel set. Read the portable PDB with System.Reflection.Metadata and map StackFrame.GetILOffset() yourself (Program.cs:188).
- Timers, Task.Run and await continuations from run N keep running after run N returns and wrote into run N+1's output. Fix: install a Console writer once that routes by an AsyncLocal run context (Program.cs:98, 224). Callbacks capture the ExecutionContext, so late writes go to the closed run and are dropped.
- Statics reset per run only because each compile is a new assembly. AppContext data and anything in the host survive. Assemblies are never unloaded, a collectible ALC did not help, and wasm memory grows ~0.5-0.9 MB per run, so recycle the worker after N runs, ideally with a pre-warmed spare.
- No cooperative interrupt exists for C#. dewlab's Python stop uses a SharedArrayBuffer interrupt when crossOriginIsolated (/home/user/dewlab/assets/pyodide-engine.js:144-153) and terminate() otherwise (pyodide-engine.js:467). For C#, terminate is the only stop, and it costs a reboot (~0.4 s) plus a cold first compile (~2 s).
- A worker only receives messages after its top-level await finishes, so the host must wait for {type:'ready'} before posting (host.js). Anything posted earlier is lost.
- The wasmbrowser template (Microsoft.NET.Runtime.WebAssembly.Templates) still targets net8.0; change TargetFramework to net10.0. No wasm-tools workload is needed.
- SatelliteResourceLanguages=en removes 13 Roslyn localized satellite folders (Roslyn's Russian resources alone are 0.6 MB raw).
- Fingerprinted file names (e.g. Microsoft.CodeAnalysis.CSharp.<hash>.wasm) change whenever trimming output changes. Committing _framework to a Pages repo therefore adds ~27 MB of new blobs to git history per rebuild, so build it in CI or keep it in a separate repo.
- InvariantGlobalization saves ~0.85 MB gzip, but `new CultureInfo("fr-FR")` then throws CultureNotFoundException, and currency formatting uses the invariant culture.

# code
/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/spike-program (README.md there; app in CsRunner/, harness in tools/, samples in samples/, publish outputs with sizes.json and bench.json in out/<variant>/)

# report
# C# compile-and-run in the browser: spike results

Everything is in `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/spike-program` (README.md explains how to rebuild and run it). The spike did not touch dewlab or dewcode.

## What was built
- `CsRunner/`: a .NET 10 `Microsoft.NET.Sdk.WebAssembly` app with no Blazor UI. It uses Microsoft.CodeAnalysis.CSharp 5.0.0 and Basic.Reference.Assemblies.Net100 1.8.12.
  - The one export, `Runner.CompileAndRun(names[], texts[], stdin, implicitUsings, collectible, emitPdb)`, is an async [JSExport] that returns a Promise of JSON.
  - It parses the files as `SourceCodeKind.Regular` and compiles them as `OutputKind.ConsoleApplication`.
  - It returns diagnostics (file, line, col).
  - If the compile is clean, it emits PE+PDB to memory, loads the assembly, redirects Console, awaits the entry point and returns stdout, stderr and the exit code.
- `wwwroot/worker.js` boots .NET inside a **module Web Worker**. `host.js` (main thread) does run / timeout / terminate / restart. `index.html` is a minimal page.
- `tools/serve.mjs` behaves like GitHub Pages: application/wasm, gzip, max-age=600, ETag.
- `tools/smoke.mjs`, `bench.mjs`, `extra.mjs` and `warmup.mjs` drive headless Chromium through Playwright.

## Functional results (item 2)
| Check | Result |
|---|---|
| 3-file program (top-level statements + namespace College, IEnrollable, abstract Person, Student, MatureStudent, List, Dictionary, LINQ query, interpolation, caught exception, stdin "Ada\n21\n") | Correct output: "Hello, Ada. Next year you will be 22." / "Honours: Alan (91), Grace (73)" / "Caught: Ada is already enrolled on 5N0541" |
| Uncaught exception | `Unhandled exception. System.InvalidOperationException: Sequence contains no matching element ... at Program+<<Main>$>d__0.MoveNext() in Program.cs:line 43` (line 43 is correct) |
| Compile error in the second file | `CS0103 Student.cs line 21 col 69: The name 'Nmae' does not exist in the current context`, correct with and without PDB |
| Uncaught exception thrown in Course.cs | `at College.Course.Enrol(Student s) in Course.cs:line 14` / `at Program.<Main>$(String[] args) in ThrowInCourse.cs:line 5` |
| Stack-trace file/line from the runtime itself | **No.** Assembly.Load(pe, pdb) plus debugLevel -1 or 1 still printed no lines. The lines above come from my own PDB reader (System.Reflection.Metadata), marked lineInfo="pdb-lookup" |
| async Main (`Task<int>`) and top-level await | Work once the host awaits `<Main>$`/`Main` directly |
| BCL probe | Works in notrim and trimrooted, except System.Text.Json under trimming (TypeLoadException) and cultures under InvariantGlobalization (CultureNotFoundException) |

## Size (item 3): `_framework` and the whole wwwroot
| Variant | Files | Raw | gzip -9 | brotli | Works? |
|---|---|---|---|---|---|
| trimfull (SDK default publish) | 43 | 22.98 MB | 8.22 MB | 6.12 MB | **No**: System.Runtime facade trimmed away, so every program fails |
| **trimrooted** (TrimMode=full + TrimmerRootAssembly for 23 BCL assemblies) | 64 | 26.84 MB | 9.44 MB | 7.07 MB | Yes, except APIs outside the root list |
| trimrooted + InvariantGlobalization | 61 | 24.22 MB | 8.59 MB | 6.46 MB | Yes; non-invariant cultures throw |
| TrimMode=partial + rooted | 72 | 31.02 MB | 11.07 MB | 8.10 MB | Yes (same Json failure) |
| notrim (PublishTrimmed=false) | 183 | 42.47 MB | 15.31 MB | 11.60 MB | Yes, everything |
| notrim + invariant | 180 | 39.86 MB | 14.47 MB | 10.99 MB | Yes, except cultures |

wwwroot adds only index.html, host.js and worker.js (about 7 KB). All variants use UseSystemResourceKeys=false and SatelliteResourceLanguages=en. The first, pre-fix publish with 13 satellite languages was 69 files, 28.75 MB raw, 9.67 MB gzip.

Ten largest files in trimrooted (raw / gzip -9 / brotli bytes):

| File | Raw | gzip -9 | brotli |
|---|---|---|---|
| Basic.Reference.Assemblies.Net100 | 6,227,737 | 2,114,290 | 1,184,194 |
| Microsoft.CodeAnalysis.CSharp | 5,238,553 | 1,897,837 | 1,520,644 |
| System.Private.CoreLib (rooted) | 4,751,129 | 1,526,264 | 1,201,979 |
| dotnet.native.wasm | 3,001,422 | 1,183,055 | 976,306 |
| Microsoft.CodeAnalysis | 1,317,653 | 484,577 | 395,427 |
| icudt_no_CJK.dat | 1,107,168 | 316,802 | 222,250 |
| icudt_CJK.dat | 956,416 | 329,303 | 248,840 |
| System.Private.Xml | 769,301 | 239,321 | 198,230 |
| icudt_EFIGS.dat | 550,832 | 195,310 | 143,983 |
| System.Text.RegularExpressions | 370,965 | 157,028 | 132,682 |

Notes on trimming:
- Roslyn survived full trimming: the compile worked in trimfull and gave only IL2104 warnings. What breaks is the user's program, which references the facades.
- Bytes actually sent at cold boot: trimrooted 9.03 MB (65 requests); notrim 15.03 MB (184 requests). The runtime loads every listed assembly eagerly.

Download estimate from gzip -9, with no latency:

| Variant | 10 Mbps | 30 Mbps | 100 Mbps |
|---|---|---|---|
| trimrooted | 7.6 s | 2.5 s | 0.76 s |
| trimrooted + invariant | 6.9 s | 2.3 s | 0.69 s |
| notrim | 12.2 s | 4.1 s | 1.2 s |

Measured with CDP throttling (30 ms latency), trimrooted took 7.5 / 2.7 / 1.2 s and notrim 12.4 / 4.4 / 2.1 s. For comparison, Pyodide 0.28.3 core, which dewlab already loads from jsDelivr (/home/user/dewlab/assets/pyodide-engine.js:315), is about 5.45 MB transferred. GitHub Pages does gzip application/wasm (checked on kripken.github.io: server GitHub.com, content-encoding gzip).

## Worker (item 4)
Booting .NET 10 in a module worker works as-is: `import { dotnet } from './_framework/dotnet.js'` then `dotnet.create()` and `getAssemblyExports`. No main-thread fallback was needed. dewlab's Python runtime uses the same pattern (/home/user/dewlab/assets/pyodide-engine.js:110, /home/user/dewlab/assets/tutorial-runtime.js:3824).

## Stop (item 5)
- `while (true) { }` ran until the 3 s host timeout. The host then terminated the worker and booted a new one: **404 ms** terminate-to-ready (trimrooted), 649 ms (notrim).
- Warm-cache restarts x3 took 399 / 410 / 418 ms (trimrooted) with **0 bytes** refetched.
- The next compile+run after a restart is cold again: 1.6-2.1 s.
- Python in dewlab can interrupt through a SharedArrayBuffer (pyodide-engine.js:144-153). C# has no such route, so terminate is the only stop.

## Timings (item 6): headless Chromium, 4-CPU container, localhost, median of 3
| | trimrooted | notrim |
|---|---|---|
| Cold boot to ready, empty cache (navigation to ready) | 485 ms | 814 ms |
| First compile+run of the 3-file program | 3018 ms (2607-3131) | 2672 ms (2504-2829) |
| Second compile+run, same worker | 455 ms | 452 ms |
| Fifth compile+run | 386 ms | 371 ms |
| Worker re-creation to ready, warm cache | 410 ms | 709 ms |
| First run after re-creation | 2127 ms | 1748 ms |

- Phase split on a warm run: parse 15-30 ms, compile+emit 350-440 ms, load under 1 ms, run 5-20 ms. Nearly all of the first run's time is Roslyn warming up in the interpreter.
- A throwaway warm-up compile right after boot (median 1742 ms) brings the first real compile+run down to a median of 964 ms.
- Emitting a PDB costs about 30-70 ms per warm run.

## State between runs (item 7)
- A static counter in the student class printed 1 on every run. Statics reset because each compile is a new assembly.
- AppContext.SetData persisted across runs (null, 1, 2), so process-wide state survives.
- A Timer (300 ms) and a Task.Delay(400) continuation started in run 1 **did print into run 2** ("TIMER from run 1", "DELAY continuation from run 1") until I routed Console through an AsyncLocal run context. After that fix, run 2 shows only its own output and late writes are dropped and counted.
- Memory (wasm linear memory, via getDotnetRuntime(0).Module.HEAP8):
  - 48 MB after boot and 120 MB after the first compile.
  - Then 145 MB (run 20), 174 MB (40), 208 MB (80-160), and 208-250 MB at run 200.
  - The managed heap grew only ~7-8 KB per run (16.2 to 17.7 MB). The growth is loaded assemblies and interpreter data that Mono never frees.
  - A collectible AssemblyLoadContext made no difference.
  - performance.memory is main-thread only and quantized, so it is useless here.

## Fixes that were required (all found by failing runs)
1. Webcil means Roslyn needs embedded reference assemblies (Basic.Reference.Assemblies.Net100): 2.1 MB gzip.
2. PDB emit threw 'Cannot wait on monitors on this runtime'. Roslyn's DebugSourceDocument does Task.Run(checksum) and later .Result. Fix: empty tree path plus a `#line 1 "File.cs"` prefix (Program.cs:54).
3. The Console.In getter throws PlatformNotSupportedException on browser; only SetIn works (Program.cs:97).
4. The async entry point's sync wrapper blocks and throws. Fix: await `<Main>$` or `Main` directly (Program.cs:119).
5. Exception texts were resource keys ('NoMatch'). Fix: UseSystemResourceKeys=false (CsRunner.csproj:9).
6. The runtime prints no file:line. Fix: my own PDB lookup (Program.cs:188).
7. Default trimming breaks all user programs. Fix: root the BCL (CsRunner.csproj:23) or don't trim.
8. Output leaked between runs. Fix: an AsyncLocal Console router (Program.cs:98, 224).

## Not done or not verified
- Webcil-off with the runtime's own DLLs as references.
- IntelliSense (Workspaces/Features, a larger download).
- Multi-threaded wasm (needs COOP/COEP, which Pages cannot send).
- Firefox and Safari.
- Low-end hardware.
- Whether Pages gzips the ICU .dat files.
- Memory beyond 200 runs.

## What this means for the architecture question
- The C# engine is a self-contained folder (_framework plus two small JS files). It loads only when a page imports worker.js, and it works from a subfolder. A link-only C# section would therefore add nothing to what the Python pages download.
- It is its own engine with its own traps (the eight fixes above, worker recycling, a slow first compile). Keep it isolated from the Pyodide runtime rather than woven through it.
- The build needs the .NET SDK. Its fingerprinted outputs (~27 MB raw) change with every rebuild, which argues for building it in CI or keeping it in a separate repo or Pages site, rather than committing _framework into dewlab's history.