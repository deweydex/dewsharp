# Interactive Console.ReadLine for browser C#: spike

Built on `../spike-program` (Roslyn + .NET 10 in a module Web Worker). This spike adds a program that
prints a prompt, **blocks in `Console.ReadLine()`** until the learner types into the page, then carries on.
Nothing here touches dewlab or dewcode.

## What changed from spike-program

| File | Change |
|---|---|
| `CsRunner/Program.cs` | `interactive` flag on `CompileAndRun`. `RunContext` streams output (a flush when a line ends and 25 ms have passed, at 64 KB, on a stdout/stderr switch, before every read, and at the end) and caps each run at 1,000,000 chars. `JsLineReader : TextReader` becomes `Console.In` (ReadLine, Read, Peek, ReadToEnd). `Io` has two synchronous `[JSImport]`s: `globalThis.__csio.readLine` and `.write`. `StopRequestedException` gives a cooperative Stop. |
| `CsRunner/wwwroot/worker.js` | Defines `globalThis.__csio`. `readLine` uses Atomics.wait on a SharedArrayBuffer, or a synchronous XHR to `stdin-sw.js`, or neither (returns null with a note). A `dying` flag stops a terminated worker from spinning on failed XHRs. |
| `CsRunner/wwwroot/host.js` | `run(files, '', {interactive, onOutput, onInputRequest, timeoutMs})`, `sendLine`, `sendEof`, `stop()` (cooperative first, then terminate and reboot). The timeout pauses while the program waits for input. |
| `CsRunner/wwwroot/stdin-sw.js` | Service worker for the sync-XHR transport. It holds `__stdin__/read` until `__stdin__/answer` arrives, releasing it with `{retry:true}` every `hold` ms (default 20 s). With `?coi=1` it also adds COOP/COEP, doing coi-serviceworker's job. |
| `CsRunner/wwwroot/coi-serviceworker.js` | npm `coi-serviceworker@0.1.7`, byte-identical to dewlab's `assets/vendor/coi-serviceworker.js`. |
| `CsRunner/wwwroot/index.html` | A terminal-style transcript with an input row that appears only while the program waits. Output is drawn once per animation frame, and the screen keeps the last 200,000 chars. `?sw=none|coi|stdin|stdin-coi`, `?transport=auto|atomics|sync-xhr`, `?hold=ms`. |
| `samples/input/*.cs` | Greeting, a 2-file menu program (MenuProgram.cs + Register.cs), a print loop, a silent spin, a catch-all loop, EOF, char reads, ReadKey/Clear/colour probe, async + ReadLine, and Unicode. |
| `tools/serve2.mjs` | A GitHub-Pages-like server that mounts the app at `/csharp/` and puts a "rest of site" page at `/`. `--headers=all|csharp|none`, `--coep=credentialless`, `--root-coi` (mimics dewlab's root-scoped shim). A second origin on port+1 serves the cross-origin test resources, including YouTube's real embed/thumbnail headers. |
| `tools/input.mjs` | The interactive suite (22 checks, plus a long-wait check). Modes: `headers`, `coi`, `sync-xhr`, `stdin-coi`, `none`. |
| `tools/scope.mjs` | COEP matrix, `/csharp/` scoping, dewlab-like root shim, JSPI probe (`SECTION=matrix|scoping|dewlab`). |
| `tools/xhr-probe.mjs`, `tools/zombie-probe.mjs` | Sync-XHR hold/retry cost over a long wait, and what a terminated worker does next. |

## Run

```bash
S=/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad
export PATH=$S/dotnet:$PATH DOTNET_ROOT=$S/dotnet DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
cd $S/spike-input
tools/publish.sh trimrooted -p:RootBcl=true          # ~1 min; writes out/trimrooted
node tools/input.mjs headers  9410                    # server sends COOP/COEP; Atomics
node tools/input.mjs coi      9420                    # no headers; coi-serviceworker in /csharp/
HOLD=2000 LONGWAIT=5000 node tools/input.mjs sync-xhr 9430   # no isolation at all
node tools/input.mjs stdin-coi 9440                   # one SW does stdin + isolation
node tools/scope.mjs 9500                             # matrix + scoping + dewlab-like + JSPI
node tools/serve2.mjs out/trimrooted/wwwroot 8765     # then open http://localhost:8765/csharp/?sw=coi
```

Don't run the scripts with Playwright's `proxy` launch option: it routes localhost through the agent
proxy too, and every page load hangs. This Chromium doesn't trust the proxy CA, so real YouTube
couldn't be loaded; `serve2.mjs` replays YouTube's real response headers instead.

Results: `results-*.json`, `run-*.log`, `scope.log` (matrix and scoping). `results-scope.json` holds only
the last `SECTION=dewlab` run plus JSPI.
