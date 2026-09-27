# C# compiled and run in the browser: feasibility spike

A throwaway prototype that answers one question: can a static page (GitHub Pages, no server) compile a
multi-file C# console program with Roslyn and run it, entirely in the student's browser, inside a Web
Worker that can be killed and restarted? Answer: yes, with several non-obvious fixes listed below.

Nothing here touches dewlab or dewcode.

## Layout

```
CsRunner/                  .NET 10 browser-wasm app (Microsoft.NET.Sdk.WebAssembly, no Blazor)
  CsRunner.csproj          packages + trimming knobs (RootBcl, UseSystemResourceKeys, ...)
  Program.cs               [JSExport] Runner.CompileAndRun and helpers
  wwwroot/worker.js        boots .NET inside a module Web Worker; postMessage protocol
  wwwroot/host.js          main-thread CSharpRunner class: start / run / timeout / restart
  wwwroot/index.html       minimal page (one editor box, stdin box, Run, Stop)
samples/college/*.cs       3-file PDP/FOOP-style test program (+ Student.error.cs)
samples/misc/*.cs          async Main, static state, leaking timers, infinite loop, BCL probe
tools/publish.sh           publish one variant to out/<name> and print its sizes
tools/sizes.py             raw / gzip -9 / brotli totals + 10 largest files
tools/serve.mjs            static server that behaves like GitHub Pages (application/wasm, gzip, max-age=600)
tools/smoke.mjs            functional checks in headless Chromium
tools/bench.mjs            timings: cold boot, compile+run #1/#2/#5, restart, stop, state, memory, throttled
out/<variant>/             publish outputs, with sizes.json and bench.json
*.log                      raw logs of the runs reported in the findings
```

## Rebuild and run

```bash
S=/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad
export PATH=$S/dotnet:$PATH DOTNET_ROOT=$S/dotnet DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
cd $S/spike-program

# The recommended variant: trimmed, with the BCL a student program touches rooted.
tools/publish.sh trimrooted -p:RootBcl=true
# Other variants used in the report:
tools/publish.sh notrim -p:PublishTrimmed=false
tools/publish.sh trimfull                                   # SDK default; BROKEN for user code (see below)
tools/publish.sh trimrooted-inv -p:RootBcl=true -p:InvariantGlobalization=true

# Look at it in a browser
node tools/serve.mjs out/trimrooted/wwwroot 8765            # then open http://localhost:8765/

# Automated checks (headless Chromium via the global Playwright install)
node tools/smoke.mjs out/trimrooted/wwwroot 8801
node tools/bench.mjs out/trimrooted/wwwroot 8802 --throttle # writes out/trimrooted/bench.json
```

No wasm-tools workload is needed: without it the SDK uses the prebuilt runtime (no AOT, no native
relinking). `dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates` provides the `wasmbrowser`
template this started from (it still targets net8.0; the csproj was changed to net10.0).

## The protocol

`host.js` owns one worker. `runner.run(files, stdin, {timeoutMs, emitPdb, collectible, implicitUsings})`
posts `{type:'run', names, texts, stdin, ...}`; the worker calls the C# export and posts back
`{ok, phase:'compile'|'run'|'timeout', diagnostics:[{severity,id,file,line,col,message}], stdout, stderr,
exitCode, lineInfo, timings}`. On timeout the host `terminate()`s the worker and `restart()` boots a new one.

## Fixes that were needed (each one found by a failing run)

1. **Roslyn cannot read the runtime's own assemblies** (Webcil) -> reference assemblies come from the
   `Basic.Reference.Assemblies.Net100` package (6.2 MB raw, 2.1 MB gzip).
2. **Emitting a PDB deadlocks-then-throws** ("Cannot wait on monitors on this runtime"): Roslyn's
   `DebugSourceDocument` does `Task.Run(checksum)` and later `.Result` inside the same synchronous Emit.
   Fix: parse each file with an empty path and prefix `#line 1 "Student.cs"`; diagnostics use the
   mapped span, so file and line stay right, and no checksum task is created.
3. **`Console.In` getter throws PlatformNotSupportedException** on browser; `Console.SetIn` works. Never
   read `Console.In` in the host code.
4. **Async Main / top-level `await` throws** "Cannot wait on monitors": the compiler's synchronous
   `<Main>` wrapper blocks on the task. Fix: find `<Main>$` / `Main` returning Task and await it.
5. **Exception messages are resource keys** ("NoMatch") because Release wasm sets
   `UseSystemResourceKeys=true`. Fix: `<UseSystemResourceKeys>false</UseSystemResourceKeys>`.
6. **The runtime never prints file:line**, even with a PDB loaded and `debugLevel` set. Fix: read the
   portable PDB with System.Reflection.Metadata and map each user frame's IL offset ourselves.
7. **Default trimming (TrimMode=full) breaks every student program**: the trimmer deletes facade
   assemblies such as `System.Runtime`, which the compiled program references. Fix: `RootBcl=true`
   roots a curated list of BCL assemblies (see csproj). Anything outside the list (System.Text.Json in
   the probe) fails with TypeLoadException before the program prints anything.
8. **Timers and Task continuations from run N printed into run N+1.** Fix: Console output is routed
   through an `AsyncLocal` run context; callbacks capture the ExecutionContext, so late writes go to
   run N's closed sink and are dropped (counted in `lateWritesDroppedSoFar`).

## Headline numbers (headless Chromium, 4-CPU Linux container, localhost; median of 3)

| | trimrooted (recommended) | notrim |
|---|---|---|
| `_framework` files / raw / gzip -9 / brotli | 64 / 26.8 MB / 9.44 MB / 7.07 MB | 183 / 42.5 MB / 15.3 MB / 11.6 MB |
| bytes actually sent at cold boot (gzip) | 9.03 MB in 65 requests | 15.0 MB in 184 requests |
| cold boot to ready, localhost | 485 ms | 814 ms |
| cold boot to ready, throttled 10 / 30 / 100 Mbps | 7.5 / 2.7 / 1.2 s | 12.4 / 4.4 / 2.1 s |
| compile+run #1 / #2 / #5 (3-file program) | 3.0 s / 455 ms / 386 ms | 2.7 s / 452 ms / 371 ms |
| terminate -> new worker ready (warm cache) | 410 ms (0 bytes refetched) | 709 ms |
| first compile+run after a restart | 2.1 s | 1.7 s |

Other variants (sizes only): trimfull 8.22 MB gzip but broken for user code; trimrooted +
InvariantGlobalization 8.59 MB gzip (cultures other than invariant then throw); TrimMode=partial + rooted
11.07 MB gzip; notrim + invariant 14.47 MB gzip.

Memory: wasm linear memory is ~48 MB after boot, ~120 MB after the first compile, then grows in steps to
~208 MB after 100-200 runs (~0.5-0.9 MB per run, never returned). A collectible AssemblyLoadContext made
no difference. The managed GC heap only grows ~8 KB per run. Plan to recycle the worker after N runs.
