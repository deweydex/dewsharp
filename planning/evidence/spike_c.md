# verdict
Interactive console input works for browser C#, and dewlab already has the piece it needs. The C# program blocks in a real `Console.ReadLine()` while the learner types into the page. The prompt is on screen before it blocks, and the next prompt appears 1.3-18 ms after Enter. A two-file, three-option menu loop with bad input ran to the end, and so did EOF, char-level reads, ReadLine after an await, and non-ASCII input. The mechanism is a custom `Console.In` whose ReadLine calls a synchronous [JSImport]. That call flushes output with postMessage and then waits with Atomics.wait on a SharedArrayBuffer. This needs cross-origin isolation, which every hosted dewlab page already has: dewlab ships coi-serviceworker at the site root to get a SharedArrayBuffer for its Python Stop button. In a test that copies that setup, a `/csharp/` page with no service worker of its own was isolated and the interactive run worked. The shared buffer also allows a cheap Stop. Stop while waiting for input took 12-15 ms, and stopping a print loop took 55-83 ms, both without rebooting the worker. Only a loop that prints nothing still needs terminate and a reboot (about 1.2-1.4 s). Fallback without isolation: a sync XHR that a service worker holds open until the learner answers. It passed the same suite and survived a 75 s wait, but its Stop mid-run is always terminate. If C# lives in a separate repo, coi-serviceworker served from `/csharp/` isolates only that folder (tested: the rest of the site was not isolated and not controlled), at the cost of one extra page load on the first visit. Three traps turned up, each fixed in the prototype. (1) With streamed output, a runaway print loop froze the page until output was rate-limited and capped. (2) A worker killed with terminate() kept running for about 2 s. With the sync-XHR transport it sent about 1,400 requests a second, because each failed read threw into the learner's catch-all loop. (3) A `/csharp/` service worker that doesn't itself add COOP/COEP breaks the page when it takes over from dewlab's root shim. What an isolated page loses: cross-origin iframes without COEP, including YouTube embeds unless the iframe has the `credentialless` attribute, and, under require-corp, cross-origin images without CORP. JSPI exists in this Chromium 141, but .NET 10's shipped runtime does not use it. Overall, interactive input does not stand in the way of a notebook-style C# mini-IDE, and dewlab's existing isolation is the reason why.

# worked
- Prompt on screen before blocking: with the Atomics transport, the transcript was exactly 'What is your name? ' when the stdin-request arrived, the input row was visible, and no result had come back 300 ms later (tools/input.mjs checks 1-4; headers, coi, stdin-coi and sync-xhr modes).
- Main thread keeps running while the worker is blocked: 31-32 animation frames in 500 ms in every mode.
- Typed input resumes the program: Greeting.cs asked twice and printed 'Hello, Ada! Next year you will be 22.'. The run's final transcript echoes the typed lines like a terminal.
- Three-option menu loop: MenuProgram.cs + Register.cs (namespace, classes, primary constructors, List, switch, int.TryParse validation loop) took 11 inputs, including 'twenty' and 'x', and reached every branch and 'Goodbye.' with exit code 0. Every stdin-request arrived with the right prompt ('Choose an option: ', 'Name: ', 'Age: ') already on the page. Passed in all four transport modes.
- Stop while blocked in ReadLine: cooperative in 12-15 ms (a shared-buffer flag makes readLine return a sentinel, and C# throws StopRequestedException). The next run reached its first prompt 124-160 ms later with no reboot.
- Stop while printing in a loop (Atomics transport): cooperative in 55-83 ms. Every output flush reads the stop flag and throws inside the program.
- Stop of a silent while(true){i++}: terminate + reboot. Stop to ready took 1.19-1.39 s (graceMs 750 + restart 436-643 ms). The next run reached its prompt 1.7 s later, a cold compile.
- Stop against a catch(Exception) loop: finished cooperatively in 13 ms. The learner's catch swallowed the first StopRequestedException and printed 'Oops: Stopped by the learner.', then its own Console output threw again from inside the catch and ended the run.
- End input -> ReadLine returns null, Console.Read returns -1. Console.Read char by char then ReadLine for the rest ('a=x b=y rest='z tail''). ReadLine after `await Task.Delay` in top-level code. 'héllo 👋 日本' round-trips (11 UTF-16 chars).
- Run timeout counts only the program's own time: a 4 s pause before typing did not trip a 3 s timeout (host.js pauseTimer/resumeTimer).
- 10 further interactive runs in the same worker all passed.
- coi-serviceworker 0.1.7 (npm, byte-identical to /home/user/dewlab/assets/vendor/coi-serviceworker.js), served with no COOP/COEP from the server: one reload (2 navigations), then crossOriginIsolated=true in page and worker. All 22 checks pass with the Atomics transport.
- Scoping: coi-serviceworker.js served from /csharp/ registers with scope /csharp/ only. A later visit to / was crossOriginIsolated=false and not controlled, and a cross-origin image without CORP loaded there. First visit: 69 requests / 9.05 MB, so no double download despite the reload. Second visit: 1 request, 0 bytes.
- dewlab-like root shim (serve2 --root-coi, like build.py:7633-7635 + shell.html:9): /csharp/ with no service worker of its own was controlled by /coi-serviceworker.js, crossOriginIsolated=true, used the Atomics transport, and ran the interactive greeting.
- One service worker doing both jobs (stdin-sw.js?coi=1): isolated, Atomics transport, 22/22. It also kept isolation when layered under the root shim.
- sync-XHR transport, no isolation at all (stdin-sw.js): 22/22 plus the long-wait check. Next prompt 3.7-16.8 ms after Enter. A 75 s wait with the default 20 s hold cost 3 held requests and 3 retries, and the answer then arrived (service worker counters survived, so it was not restarted).
- Output streaming with backpressure: a print loop shows 16,664 lines, then '[Output limit reached...]', and the page stays clickable, so Stop works.
- No transport available: ReadLine returns null and the program prints '[This page cannot pause for typing: ...]' instead of hanging.
- JSPI present in the browser: WebAssembly.Suspending and WebAssembly.promising are both functions in HeadlessChrome 141.0.7390.37.

# failed
- Firefox and Safari: not tested (only Chromium is installed in /opt/pw-browsers). coi-serviceworker 0.1.7 asks for COEP credentialless on any browser without window.chrome/window.netscape (coi-serviceworker.js:67). Whether Safari isolates under that is unverified, and Safari is common on school iPads and Macs.
- Real YouTube embed: headless Chromium does not trust the agent proxy CA (net::ERR_CERT_AUTHORITY_INVALID in both the headless shell and full Chromium), and TLS verification was not disabled. Instead the real response headers (curl -I, 2026-09-27) were replayed on a local cross-origin frame: youtube.com/embed sends CORP cross-origin but COEP/COOP only as *-Report-Only, and i.ytimg.com thumbnails send CORP cross-origin + ACAO *.
- Console.ReadKey, Console.ForegroundColor and Console.WindowWidth throw PlatformNotSupportedException on browser-wasm. ReadKey does not go through Console.In, so a custom reader cannot fix it. Console.Clear() did not throw but clears nothing on the page. Console.KeyAvailable returns False. 'Press any key to continue' and coloured menus in student code will need a source rewrite or a shim; none was built.
- A loop that prints nothing and never reads cannot be stopped cooperatively. It needs terminate + reboot, and the terminated worker keeps executing for about 2 s (observed with sync-XHR).
- With the sync-XHR transport, Stop of a running (not waiting) program is always terminate + reboot (~0.4 s restart), because the worker cannot see a stop flag without shared memory.
- Stop is cooperative only if the learner's code lets the exception out. A catch-all loop whose catch prints nothing falls back to terminate after the 750 ms grace period.
- JSPI with .NET 10: not usable. Runtime pack microsoft.netcore.app.runtime.mono.browser-wasm 10.0.12 has zero 'jspi' references in dotnet.js, dotnet.runtime.js or dotnet.native.js. The only mention is in dotnet.js.map, from the bundled wasm-feature-detect library, and it tests the obsolete 'Suspender' API. Using it would need a custom runtime build; not pursued, as instructed.
- Service worker lifetime under real Chrome power-saving, mobile browsers, or a learner leaving the tab for more than 5 minutes: only 75 s was tested. The 20 s hold/retry design is meant to stay under Chrome's per-event limits, but that is not verified beyond 75 s.
- Python input() in dewlab via the same Atomics technique (Pyodide's setStdin): assessed from dewlab's code only, not prototyped.
- results-scope.json was overwritten by the last SECTION=dewlab run. The full COEP matrix and scoping results are in scope.log.

# measurements
- Next prompt after Enter, Atomics transport (real headers): greeting 6.4 ms; menu loop 1.3-15.3 ms (10 samples) (performance.now() between host sendLine() and the next stdin-request message, headless Chromium 141, localhost, tools/input.mjs headers)
- Next prompt after Enter, Atomics via coi-serviceworker: greeting 7.4 ms; menu 1.5-18.5 ms (same, tools/input.mjs coi)
- Next prompt after Enter, sync-XHR via service worker (no isolation): greeting 4.9 ms; menu 3.7-16.8 ms (same, tools/input.mjs sync-xhr)
- 11-input menu run, compile to Goodbye: compile_emit 417-478 ms; run total 780-862 ms, of which input wait 328-378 ms (Playwright typing) (C# Stopwatch timings in the run result)
- First run in a fresh worker, Run click to first prompt: 1.84-2.01 s (compile_emit 1.81-1.97 s) (Date.now() in the harness around runSource until inputRequests >= 1)
- Stop while blocked in ReadLine: 12-15 ms, cooperative (no reboot); next run to its prompt 124-160 ms (host.stop() timing; all four transports)
- Stop a printing loop: Atomics: 55-83 ms cooperative; sync-XHR: 379-399 ms (terminate + reboot) (host.stop() timing)
- Stop a silent spin loop: Atomics: 1.19-1.39 s (750 ms grace + 436-643 ms reboot); next run to prompt 1.7 s (host.stop() timing)
- Terminated worker keeps executing after terminate(): about 1.9 s; ~2,685 sync XHRs from the dead run before the fix, 3 after (tools/zombie-probe.mjs: SW read keys (token:runId:seq) kept climbing for run 1 until 2.6-3.3 s after the Stop click; terminate() was at ~0.75 s)
- sync-XHR hold/retry cost of a long wait: 75 s wait: 3 held requests, 3 retries (hold 20 s); 5 s wait: 2/2 (hold 2 s) (stdin-sw.js counters via __stdin__/stats, tools/xhr-probe.mjs)
- coi-serviceworker first visit to /csharp/: 2 navigations; 833 ms to ready; 69 requests / 9.05 MB (gzip); second visit 691 ms, 1 request, 0 bytes (serve2.mjs byte and request counters, fresh browser context, tools/scope.mjs scoping section)
- Cold boot to ready: real headers 659 ms nav-to-ready; coi 1,023 ms (includes the reload); sync-XHR SW 593 ms (harness Date.now() from goto to bootInfo, localhost)
- Output flood before backpressure: 281,165 lines reached the page in 0.7 s; the main thread was unresponsive and a Stop click timed out after 30 s (first run of tools/input.mjs headers before the fix)
- Output after backpressure: 16,664 lines then a limit note (1,000,000-char cap per run); Stop click lands (tools/input.mjs check 'output streams...')
- Download size: _framework 64 files, 9.44 MB gzip-9 (unchanged from spike-program trimrooted) (tools/sizes.py after publish)
- COEP matrix (require-corp headers or coi default in Chrome): blocked: cross-origin img without CORP, cross-origin iframe without COEP, iframe with YouTube's embed headers; loads: img with CORP, img with YouTube thumbnail headers, CORS fetch, iframe with COEP, any iframe with the credentialless attribute (tools/scope.mjs matrix, image naturalWidth and postMessage from each frame)
- COEP matrix (credentialless, via headers or coi forced): same as require-corp except the cross-origin img without CORP loads; iframes without COEP and YouTube-header iframes are still blocked unless the credentialless attribute is set (tools/scope.mjs matrix)

# gotchas
- Streamed output needs backpressure, or Stop stops working. A while(true) Console.WriteLine pushed 281k lines in 0.7 s, and the main thread spent all its time on message events and DOM appends. Fix: flush only when a line ends and 25 ms have passed, or at 64 KB (Program.cs:285). Cap output at 1,000,000 chars per run, which also bounds wasm memory (Program.cs:257). Draw at most once per animation frame and keep the last 200,000 chars on screen (index.html:58-60). dewlab's Python runtime has no output cap either (grep found none).
- terminate() does not stop a worker at once. The terminated worker went on executing for about 2 s. In a sync XHR, the aborted request threw into C#, the learner's catch (Exception) swallowed it, and the dead worker sent ~1,400 XHRs/s. Fix: on any XHR failure set a `dying` flag, so every later read returns the stop sentinel and every write reports Stop, with no network traffic (worker.js:53). Never throw a plain JS Error into student code from readLine: it becomes a catchable JSException.
- Longest service worker scope wins. A /csharp/-scoped service worker that doesn't add COOP/COEP takes /csharp/ away from dewlab's root coi shim. Result: 'Boot failed: worker error' on the page it claims (an isolated page cannot start a worker whose script arrives without COEP), and after a reload the page is no longer isolated. Any /csharp/ service worker must do both jobs (stdin-sw.js?coi=1) or not exist.
- Inside dewlab no extra isolation work is needed. assets/shell.html:9 and compose/notebook.html:9 already load the root-scoped coi-serviceworker, and build.py:7633-7635 copies it to the site root. Adding a service worker for C# would be the risky part.
- Atomics.wait is only allowed in workers, and TextDecoder refuses views on shared memory: copy with data.slice() before decoding (worker.js:43). Write the answer with Atomics.store and then Atomics.notify (host.js:84). Clear the state to 0 before posting the stdin-request, so an answer that arrives early is not lost (worker.js:35-38).
- Clear the stop flag at the start of every run, or the next run stops immediately (host.js call()).
- The run timeout must pause while the program waits for the learner, or a slow typist trips it (host.js:100).
- Console.In's getter still throws on browser-wasm, but Console.SetIn(new JsLineReader(ctx)) works, and Console.ReadLine/Read go through it (Program.cs:99). Console.ReadKey does not; it throws PlatformNotSupportedException, as do ForegroundColor and WindowWidth.
- A cooperative Stop is an exception inside the learner's program, so their catch (Exception) can see it ('Oops: Stopped by the learner.'). Keep the 750 ms terminate fallback in the host (host.js:120).
- Without the stop flag, the only way to tell a busy sync-XHR worker to stop is terminate(). A sync XHR per flush could carry the flag but was not tried.
- The sync-XHR service worker must answer held reads with {retry:true} well inside Chrome's event limits (20 s default, stdin-sw.js:14,34), and must store answers that arrive before the read (stdin-sw.js:43).
- coi-serviceworker cannot add headers to opaque (no-cors, cross-origin) responses. It passes status-0 responses through untouched (coi-serviceworker.js:38-40), so under require-corp a cross-origin image without CORP stays blocked even though the shim sets CORP on everything else.
- YouTube embeds send only report-only COEP, so they are blocked on an isolated page unless the iframe carries the `credentialless` attribute (Chromium). Plain YouTube links, which is how dewlab uses videos today, are unaffected.
- Playwright's `proxy` launch option also routes localhost through the proxy, and every local page load then hangs. Launch without a proxy for localhost tests.
- `pkill -f <script name>` in the same shell command as the script name kills the calling shell (exit 144). Kill by PID instead.

# code
/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/spike-input (README.md; app in CsRunner/, published build in out/trimrooted/wwwroot, harness in tools/input.mjs, tools/scope.mjs, tools/serve2.mjs, tools/xhr-probe.mjs, tools/zombie-probe.mjs; samples in samples/input/; results in results-*.json, run-*.log, scope.log)

# report
# Interactive `Console.ReadLine()` for browser C#

## How dewlab handles Python `input()` today

Python has no interactive `input()` on dewlab. Pyodide moved into a Web Worker in 7.77 (/home/user/dewlab/DECISIONS_LOG.md:1666). Since then the site has said that "a cell cannot wait for typing". Pages instead write the typing in advance, as a `typed` list read by a small `ask()` helper (DECISIONS_LOG.md:4877), or use `text_input`/`dropdown` widgets (DECISIONS_LOG.md:4951).

The pieces an Atomics-based `input()` would need are already deployed, though:

- **The site is already isolated.** Every hosted page loads coi-serviceworker from the site root: /home/user/dewlab/assets/shell.html:9 and /home/user/dewlab/compose/notebook.html:9, with the file copied to the root by /home/user/dewlab/build.py:7633-7635 and stripped from the offline export at build.py:5996. So every hosted page is cross-origin isolated (DECISIONS_LOG.md:1683).
- **The shared buffer is used only for Stop.** That isolation exists to get a `SharedArrayBuffer` for Python's Stop button: /home/user/dewlab/assets/pyodide-engine.js:144-147, /home/user/dewlab/assets/tutorial-runtime.js:3857, and `pyodide.setInterruptBuffer` at /home/user/dewlab/assets/pyodide-worker.js:362-363.
- **No stdin today.** No stdin hook exists in pyodide-worker.js.

I reused that approach: the same coi-serviceworker and a `SharedArrayBuffer`. The shared buffer now carries a line of input and a stop flag, not just an interrupt.

## How it works

1. **The C# side** (Program.cs):
   - `Console.SetIn(new JsLineReader(ctx))` (Program.cs:99).
   - `JsLineReader.ReadLine` goes to `RunContext.ReadLine` (Program.cs:301). That flushes pending output and then calls `[JSImport("globalThis.__csio.readLine")] static partial string? ReadLine()` (Program.cs:390).
   - Output goes through a routed `TextWriter` into `RunContext`, which streams it with `[JSImport("globalThis.__csio.write")]` (Program.cs:392). The JS call returns 1 if Stop was pressed; C# then throws `StopRequestedException` (Program.cs:298, 314).
2. **The worker** (worker.js):
   - `readLine` stores 0, posts `stdin-request`, then `Atomics.wait(ctrl, 0, 0)` (worker.js:35-38).
   - On wake it decodes the line from the shared buffer (worker.js:43). State 2 means EOF (null); state 3 means Stop (a sentinel string).
3. **The host** (host.js):
   - Writes the UTF-8 line, stores the length and state, then `Atomics.notify` (host.js:84).
   - Stop sets a flag in the shared buffer (host.js:125). If nothing happens within 750 ms it terminates the worker and reboots it.
4. **Fallback transport**:
   - The worker makes a synchronous XHR to `__stdin__/read`, which `stdin-sw.js` holds until the page POSTs `__stdin__/answer`. It releases the request with `{retry:true}` every 20 s (stdin-sw.js:14, 34).
   - Answers that arrive before the read are stored (stdin-sw.js:43).

## Step 1: Atomics with real COOP/COEP headers (verified, 22/22)

Headless Chromium 141 with Playwright, running `node tools/input.mjs headers`.

- **Prompt before blocking.** The transcript was exactly `What is your name? ` at the moment of the stdin-request, and the input row was visible. There was no result 300 ms later, and the page drew 31 frames in 500 ms.
- **Resuming.** Typing resumes the program. The next prompt appeared 6.4 ms after Enter.
- **Menu loop.**
  - The program: 2 files (MenuProgram.cs + Register.cs) with a `Student` class, a `Register` holding a `List`, a `switch` menu (1 Add / 2 List / 3 Quit) and an `int.TryParse` retry loop.
  - Script: 11 inputs `2,1,Ada,twenty,21,1,Grace,85,x,2,3`.
  - All branches ran, including 'Please type a whole number.' and "'x' is not an option". Exit code 0.
  - Every prompt was already on screen when input was requested.
  - Next prompt after Enter: 1.3-15.3 ms. Compile 462 ms, whole run 795 ms.
- **Stop while blocked.** Cooperative, 14.5 ms, with no reboot. The next run reached its prompt 160 ms later.
- **Other Stops.**
  - A printing loop stopped cooperatively in 55 ms.
  - A silent spin needed terminate + reboot: 1.19 s. The next run reached its prompt 1.7 s later.
  - A `catch (Exception)` loop stopped cooperatively in 13 ms. The learner saw "Oops: Stopped by the learner." once, then the program stopped.
- **Other input shapes.**
  - End input: ReadLine returned null and `Console.Read` returned -1.
  - Char-level `Console.Read` worked.
  - ReadLine after `await Task.Delay` worked.
  - Unicode round-trips.
  - A 4 s pause before typing didn't trip a 3 s timeout, because the timeout pauses while waiting.
  - 10 more runs in the same worker passed.
- **Console probe.** `Console.ReadKey`, `ForegroundColor` and `WindowWidth` throw PlatformNotSupportedException. `Clear` doesn't throw (but clears nothing on the page). `KeyAvailable` is False.
- **Bug found and fixed.** The first version streamed every 4 KB. An infinite print loop pushed 281k lines in 0.7 s, the main thread froze, and the Stop click timed out after 30 s. With flushes limited to every 25 ms or 64 KB, a 1 M-char cap per run and per-frame drawing, Stop lands.

## Step 2: coi-serviceworker without headers

**It works.** npm coi-serviceworker 0.1.7 is byte-identical to dewlab's vendored copy. Served from `/csharp/` with no COOP/COEP on the server:

- One reload (2 navigations), then `crossOriginIsolated` is true in the page and the worker.
- 22/22 checks pass with the Atomics transport. Next prompt 1.5-18.5 ms after Enter.
- First visit: 1.0 s to ready, 69 requests, 9.05 MB, with no double download. Second visit: 0 bytes.

**Scoping works.** Served from `/csharp/`, the service worker registers with scope `/csharp/` only. The site root `/` was not controlled and not isolated, and a cross-origin image without CORP loaded there.

**Inside dewlab it isn't needed.** With a dewlab-style root shim (`--root-coi`), `/csharp/` was already controlled by `/coi-serviceworker.js` and already isolated. It ran interactively with no service worker of its own.

**Trap.** A `/csharp/`-scoped service worker that doesn't add COOP/COEP takes over from the root shim (longest scope wins).
- The page it claims fails with 'Boot failed: worker error': an isolated page cannot start a worker whose script arrives without COEP.
- After a reload, the page is no longer isolated.
- A merged worker (`stdin-sw.js?coi=1`) keeps isolation and passes 22/22.

**What breaks (tools/scope.mjs, scope.log):**

| On an isolated page | require-corp (headers or coi's Chrome default) | credentialless |
|---|---|---|
| cross-origin `<img>` without CORP | BLOCKED (coi can't add headers to opaque responses) | loads |
| `<img>` with CORP / YouTube thumbnail headers | loads | loads |
| CORS fetch | ok | ok |
| cross-origin iframe without COEP | BLOCKED | BLOCKED |
| iframe that sends COEP | loads | loads |
| iframe with YouTube embed headers (CORP but only report-only COEP) | BLOCKED | BLOCKED |
| any of those iframes with the `credentialless` attribute | loads | loads |

Real YouTube couldn't be loaded: Chromium doesn't trust the proxy CA, and I didn't disable TLS checks. The YouTube rows replay YouTube's real response headers, fetched with curl -I.

dewlab links to videos rather than embedding them, so its pages are not affected today. Because dewlab is already isolated site-wide, C# adds no new COEP restrictions to it.

## Step 3: sync-XHR fallback, no isolation (verified, 22/22)

- `stdin-sw.js` with no COOP/COEP: `crossOriginIsolated` false, transport sync-xhr.
- Next prompt after Enter: 3.7-16.8 ms.
- Stop while blocked: 13 ms, cooperative (the service worker answers `stop`).
- Stop while running: always terminate + reboot, about 0.4 s.
- Long waits: a 75 s wait with the default 20 s hold cost 3 held requests and 3 retries, and the answer arrived.
- Needs one reload on the first visit, like coi.

**Bug found and fixed.** After terminate(), the old worker ran for about 2 s more. Each aborted sync XHR threw into C#, the learner's catch-all swallowed it, and ~2,685 reads reached the service worker in about 2 s. After the fix, the old run sends none: the worker sets a `dying` flag and returns the stop sentinel from then on (worker.js:53).

## Step 4: JSPI

- **In the browser: yes.** Chromium 141 exposes `WebAssembly.Suspending` and `WebAssembly.promising`.
- **In .NET 10: no.** The 10.0.12 browser-wasm runtime's dotnet.js, dotnet.runtime.js and dotnet.native.js contain no JSPI code. The only mention is in dotnet.js.map, from a bundled feature-detection library that tests the obsolete `Suspender` API.
- **Not usable without a custom runtime build, and not needed:** Atomics already blocks the worker cleanly.

## What this means for the C# plan

- **Interactive input is not the hard part.** Console menus, prompts and validation loops, the core of PDP/FOOP exercises, run for real.
- **Inside dewlab, use the Atomics transport.** Put the C# engine in its own folder and don't add a service worker, because the root shim already isolates the site.
- **In a separate repo, use coi-serviceworker from the C# folder.** Or use one merged worker, if the sync-XHR fallback is wanted for browsers where isolation fails.
- **Python can use the same technique.** It would give Python a real `input()` (Pyodide `setStdin` with a synchronous reader over the same shared buffer). That would replace the typed-list workaround.
- **Things still to handle:**
  - `Console.ReadKey` and colours (needs a shim).
  - Output flooding (fixed here; dewlab's Python runtime has no output cap either).
  - Terminated workers that keep running for about 2 s.
  - Safari/Firefox behaviour under coi's credentialless default (untested).