# Architecture

The map of dewsharp. `docs/ENGINE_API.md` is the contract between the engine
and the page, `docs/LESSON_FORMAT.md` the contract for lessons, and
`docs/PARSER.md` what the parser gives the page. This file says how the parts
behind those contracts work. `DECISIONS.md` says why.

The first half is the engine. The second half, "The page", is the lesson
page, the notebook and the pages around them.

## Files

| Path | What it is |
|---|---|
| `engine/Dewsharp.Browser/` | The C# engine: a .NET 10 WebAssembly app with Roslyn in it. |
| `engine/Dewsharp.Browser/Engine.cs` | The `[JSExport]` methods the worker calls: `Boot`, `Warm`, `Run`, `Classify`, `Memory`. Compiles, runs, and writes the result as JSON. |
| `engine/Dewsharp.Browser/Assembler.cs` | Builds one C# program from a page's cells (the rules of the road), and gives each cell its kind. |
| `engine/Dewsharp.Browser/Shim.cs` | Generates and compiles `Dewsharp.Page`, the assembly every learner program references: the Console shim, the Environment shim, and the evaluator of the comparison's inputs. |
| `engine/Dewsharp.Browser/RunContext.cs` | One run's console: output batching, the output cap, input, Stop, colours. Also `Console.In`, `Console.Out` and `Console.Error`. |
| `engine/Dewsharp.Browser/Frames.cs` | Turns an exception into frames of the learner's own code, with the cell and line of each, from the program's PDB. |
| `engine/Dewsharp.Browser/Io.cs` | The `[JSImport]` calls into the worker: write, read a line, poll for Stop, phase. |
| `engine/out/wwwroot/_framework/` | The published engine (`npm run build:engine`). Gitignored. |
| `web/engine/runner.js` | The one module the page uses (`docs/ENGINE_API.md`). Owns the worker, the shared buffer, Stop, the timeout, restarts and recycling. |
| `web/engine/worker.js` | The module Web Worker that boots .NET and relays between the runner and the C# side. |
| `web/coi-serviceworker.js` | The service worker: cross-origin isolation, and the runtime cache-first. |
| `web/lesson/parse.js` | The one lesson parser (`docs/PARSER.md`). |
| `web/vendor/` | Third-party code for the browser, written from `node_modules/` by `npm run vendor` and committed: js-yaml, the editor, Markdown and KaTeX bundles, KaTeX's fonts, and the Lexend and OpenDyslexic fonts (`DECISIONS.md` #19 and #33). |
| `web/*.html`, `web/page/` | The pages: see "The page", below. |
| `web/dev.html` | A bare page with a runner on it, for developers and the tests. Not the lesson page. |
| `web/check.html` | "Check this device": a self-test a learner or teacher can open to see whether this browser runs the lessons. |
| `tools/serve.mjs`, `tools/lib/static.mjs` | The dev server. |
| `tools/build-engine.mjs` | `npm run build:engine`: `dotnet publish`. |
| `tools/build-site.mjs`, `tools/lib/lessons.mjs` | `npm run build:site`: assembles `site/`, and writes `lessons/index.json`. |
| `tools/check-lessons.mjs` | `npm run check-lessons`: runs every cell of every lesson in headless Chromium. |
| `tools/vendor.mjs`, `tools/vendor-src/` | `npm run vendor`: refreshes `web/vendor/`. `tools/vendor-src/` holds the entry points of the three esbuild bundles. |
| `tests/parser/` | Unit tests of the parser (`node --test`). |
| `tests/engine/` | Engine tests in headless Chromium, through `runner.js` on `dev.html`. |
| `tests/tools/` | Tests of the lesson checker. |
| `tests/page/` | Page tests in headless Chromium: the lesson page, the notebook, and the pages around them. |
| `tests/fixtures/` | A course and a lesson (with its practice page) that use every part of the format. |
| `dev/setup.sh` | First-time setup: the .NET SDK into `.dotnet/`, `npm ci`, Chromium if missing. |
| `.github/workflows/site.yml` | CI, and the deploy to GitHub Pages. |

`drafts/` holds lessons being ported. Nothing in the build, the server or
the checker reads it.

## How a Run travels

```
page ── runner.run() ──> runner.js ── postMessage {type:'run'} ──> worker.js ── Engine.Run(json) ──> C#
                           │  ▲                                      │  ▲                             │
                           │  └── {type:'out'|'input'|'phase'|'done'}┘  └── __dewsharp.write/readLine/poll/phase
                           └── SharedArrayBuffer: the input line, its state, and the Stop flag ──────┘
```

1. `runner.run()` makes a job and queues it. The runner runs one job at a
   time.
2. The runner clears the Stop flag in the shared buffer and posts
   `{ type: 'run', id, request }` to the worker.
3. `worker.js` calls `Engine.Run(requestJson)`. The C# side assembles the
   program, compiles it with Roslyn and, if it compiled, calls
   `Io.Phase("running", head)`. The runner starts the timeout clock there.
   `head` is the result so far (kinds, files, diagnostics), which the runner
   keeps in case it has to end the worker.
4. The program runs on the worker's only thread. Its output goes through
   `Io.Write`, its input through `Io.ReadLine`.
5. `Engine.Run` returns the result as JSON, and the worker posts
   `{ type: 'done', id, result, memory }`. The runner fills in the fields the
   contract promises (`normalise` in `runner.js`), resolves `job.done`, and
   decides whether to recycle.

## The worker protocol

Every message is a plain object with a `type`. `id` pairs a request with its
messages. `PROTOCOL` (in both files) must match; a runner that meets a
worker of another protocol treats it as a boot failure of kind `changed`.

| Direction | Message | Meaning |
|---|---|---|
| runner → worker | `{ type: 'init', frameworkUrl, protocol }` | Boot .NET from `<frameworkUrl>dotnet.js`. |
| | `{ type: 'buffer', buffer }` | The `SharedArrayBuffer` for input and Stop (only when the page is isolated). |
| | `{ type: 'warm', id }` | The warm-up. |
| | `{ type: 'run', id, request }` | Run or check. `request` is `{ cells, mode, stdin, inputs, live }`. |
| | `{ type: 'classify', id, cells }` | Syntax-only kinds. |
| | `{ type: 'memory', id }` | Memory in use. |
| worker → runner | `{ type: 'progress', loaded, total, bytes }` | Files downloaded so far, at most every 100 ms. `bytes` is what those files cost on the network, summed from the worker's resource timings (`null` if the browser won't say). |
| | `{ type: 'ready', protocol, bootMs, info }` | .NET is up. `info` is `{ culture, framework }`. |
| | `{ type: 'boot-error', code, message }` | .NET could not start. `code` is one of `docs/ENGINE_API.md`'s. |
| | `{ type: 'phase', id, phase: 'running', head }` | The program starts. |
| | `{ type: 'out', id, kind, text }` | Output. For `style`, `text` is JSON `{ fg, bg }`. |
| | `{ type: 'input', id }` | The program waits for a line. |
| | `{ type: 'done', id, result, memory }` | The reply to `warm`, `run`, `classify` and `memory`. `memory` is the wasm heap in bytes. |
| | `{ type: 'crash', id, reason, code, fatal }` | .NET itself stopped: `reason` is `exit` (the program called `System.Environment.Exit` in full) or `fatal` (a stack overflow). |
| | `{ type: 'log', message }` | A message for the developer console. |

`warm` and `run` wait in a chain, one at a time. `classify` and `memory`
don't: they are quick synchronous calls, and they only wait while a program
holds the thread. The worker listens with `addEventListener('message')`:
with `self.onmessage` set, .NET 10 never finishes starting.

The C# side calls JavaScript through `[JSImport]` functions on
`globalThis.__dewsharp`, which `worker.js` defines before .NET starts:
`write(kind, text, flush)` returns the Stop flag, `readLine()` blocks until
the page answers, `poll()` reads the Stop flag, and `phase(phase, head)`
posts the `phase` message.

### The shared buffer

`Int32Array` over the first 16 bytes: `[0]` the input state (0 waiting, 1 a
line, 2 end of input, 3 stop), `[1]` the line's length in bytes, `[2]` the
Stop flag. The line's UTF-8 bytes start at byte 16; a line is at most 64 KB.

To read a line, the worker stores 0 in `[0]`, posts `input`, and sleeps in
`Atomics.wait(ctrl, 0, 0)`. The runner writes the bytes, stores the length and
then the state, and calls `Atomics.notify`. The state is set to 0 before the
`input` message, so an answer that arrives early is not lost. `TextDecoder`
refuses shared memory, so the worker copies the bytes first; `encodeInto`
refuses it too, so the runner encodes and then copies.

## Assembling a program from cells

`Assembler.Build` makes one ordinary C# program from the cells, following the
rules of the road (`CLAUDE.md`). The target is the last cell.

- Each cell is parsed on its own and becomes its own syntax tree, whose text
  starts with `#line 1 "cell:N"`. Diagnostics and PDB lines then come back
  as `cell:N` and a line in the cell, which the engine turns into a cell id,
  a file name, and a line counted from the top of the cell.
- From each cell above the target it keeps the type declarations (in or out
  of a namespace) and blanks out, with spaces, everything else: the
  statements, a class with a `static Main` (rule 5), and a type that a later
  cell declares again (rule 4). Blanking keeps every line and column where
  the learner wrote them. A partial type is never replaced; its parts join.
  A cell that keeps nothing is left out, except for its `global using`
  lines.
- The target is kept whole. Its statements are the program's top-level
  statements, or its `Main` is the entry point.
- A type is "the same type" when its namespace, name and number of type
  parameters match.
- Top-level members that are neither types nor statements (a method written
  outside any class in a types cell) stay where they are, so the learner
  sees C#'s own error in their cell.
- Every tree is parsed with an empty path (spike_a trap 2: with a path,
  Roslyn computes a checksum on another task and then blocks on it while it
  writes the PDB, which the single-threaded runtime can't do).

Every compilation also gets a generated file of `global using` lines: the
implicit usings of `dotnet new console`, and the two aliases of the shims
(below). It starts with `#line hidden`, so nothing in it is ever reported.

The compiler settings (`Engine.ParseOptions` and `Compile` in `Engine.cs`) are
those of `docs/LESSON_FORMAT.md`: C# 14 pinned, the `DEBUG`/`TRACE`/`NET10_0`
symbols a console project defines, nullable off, warning level 10 with
warnings kept as warnings, debug code (so that line numbers are exact), and
`concurrentBuild: false`. References are `Basic.Reference.Assemblies.Net100`
(the runtime's own assemblies ship as Webcil, which Roslyn can't read: trap
1) plus `Dewsharp.Page`.

`mode: "check"` gets diagnostics without emitting anything. A types cell
compiles as a library; a program cell compiles as a program, since only a
program may have top-level statements.

### The comparison's inputs

`Assembler.InputBlock` turns each input into
`global::Dewsharp.Page.Values.Record(i, () => expression);` with the
expression on its own line under `#line 1 "input:i"`. The calls go after the
line that ends the target's last statement, so they are in the same scope
and see its variables and local methods. If the target has no statements (a
types cell, or a `Main`), they go in a file of their own, and CS7022 ("the
entry point is top-level code; Main is ignored") is suppressed.

An input that isn't one complete expression is rejected before compiling.
If the program then has errors inside input spans, each failing input is
noted in its `values` entry, left out, and the program is compiled again.
So there are at most two compiles, however many inputs fail.
`Values.Record` catches an exception from its input, and `Values.Show`
writes the value as C# would (`docs/ENGINE_API.md`, "The comparison").

### Help under two messages

`Engine.Help` adds a sentence under two errors the rules of the road cause:
a class named `Program` next to top-level statements, and CS0103 for a name
that a cell above made with a statement (`VariablesAbove`).

## Running the program

`Engine.Execute` loads the program with `Assembly.Load(pe, pdb)` and calls
its entry point. For an async `Main` or top-level `await`, the compiler adds
a synchronous `<Main>` that blocks on the task, which the single-threaded
runtime can't do; the engine calls the real async method and awaits it
(trap 4). Statics start again on every run, because each run is a new
assembly.

An exception is described by `Frames`: .NET in the browser prints no file
or line (trap 6), so it reads the program's portable PDB with
`System.Reflection.Metadata`, keeps only methods of the learner's assembly,
and names each member as a learner would (`Planet.Orbit()`,
`Planet(string)`, `Check(int)` for a local method, `null` for the top-level
statements).

The published runtime keeps `UseSystemResourceKeys=false` (trap 5: without
it, exception messages are resource keys), is not trimmed (trap 7), and keeps
ICU with the `en-IE` culture set in `Boot` (`12.5.ToString("C")` is `€12.50`,
dates are day/month).

## Output

`Console.Out` and `Console.Error` are `Router` writers, installed once in
`Boot`. Each write goes to `RunContext.Current`, an `AsyncLocal`, so a timer
or an `await` continuation left over from an earlier run writes into that
run's closed context and is dropped (trap 8; `lateWrites` counts them).

`RunContext` passes output to the worker's JavaScript at each finished line,
each 1 KB, or after 25 ms. `worker.js` posts it to the page at most every
25 ms or every 64 KB. Without this batching, a print loop sent 281,000
messages in 0.7 s, the page froze, and Stop could not be pressed
(`spike_c.md`). The page draws at most once per animation frame.

A run may print 1,000,000 characters. Output past that is not shown, and one
`err` chunk says so. The program keeps running, unseen, and still checks for
Stop every 25 ms.

## The Console shim

`DECISIONS.md` #8 and #17. `Shim.Build` runs once, in the warm-up. It
generates the C# source of an assembly called `Dewsharp.Page`, compiles it,
loads it, and keeps a reference to it for every learner program. The
generated global usings include:

```csharp
global using Console = global::Dewsharp.Page.Console;
global using Environment = global::Dewsharp.Page.Environment;
```

`Dewsharp.Page.Console` is generated from `System.Console`'s own public
surface in the reference assemblies: every static method, property and
event, with the same signature, calling the real one. So
`Console.WriteLine("{0} {1}", a, b)`, `Console.Out`, `Console.Write(char[])`
and the rest compile and behave as they do on a desktop, and a compiler
message still says `Console`. Six members are its own:

- `Clear()` sends a `clear` chunk.
- `ForegroundColor` and `BackgroundColor` send a `style` chunk; reading them
  gives the value set, or grey on black.
- `ResetColor()` sends a `style` chunk with both colours `null`.
- `ReadKey()` and `ReadKey(bool)` read a line and return its first
  character as a `ConsoleKeyInfo` (an empty line, or the end of input, is
  Enter).
- `In` returns the run's own reader (its getter throws in browser .NET).

`Dewsharp.Page.Environment` does the same for `System.Environment`, and its
`Exit(int)` ends the run (with its exit code and its output kept) instead of
ending .NET in the worker. A program that writes `System.Environment.Exit`
in full still ends .NET; the worker reports it as a `crash` with reason
`exit`, and the runner starts a new worker and reports `ok` with the code.

The shim can't reference the engine (the engine ships as Webcil, which
Roslyn can't read), so it calls back through delegates in
`Dewsharp.Page.Hooks`, which `Shim.Wire` fills in.

## Input

`Console.SetIn` gives every run a `LineReader` over its `RunContext`
(`Console.In`'s getter throws in browser .NET, but `SetIn` works: trap 3).
`ReadLine`, `Read`, `Peek` and `ReadToEnd` all take lines from
`RunContext.NextLine`, which:

- with live input, flushes the output (so the prompt is on screen), calls
  `Io.ReadLine`, and the worker sleeps until the page answers;
- with `stdin`, reads the next line of that text;
- echoes the line as an `echo` chunk, and returns `null` at the end of input.

The time spent waiting is `inputWaitMs`. The runner pauses the timeout clock
from the `input` message until it answers.

Without cross-origin isolation there is no shared buffer: `readLine()` gives
the end of input at once, so the page passes answers as `stdin`.

## Stop, the timeout, and restarts

Stop has three cases, and each has a test (`tests/engine/input.test.mjs`):

1. **The program waits for input.** The runner answers the read with state 3,
   and C# throws `StopRequestedException` out of `ReadLine`. It takes a few
   milliseconds, and the worker stays.
2. **The program prints.** The runner sets the Stop flag; the next write sees
   it and throws. A program whose `catch (Exception)` catches that exception
   meets it again at its next write or read, because the context stays
   stopped.
3. **The program prints nothing** (`while (true) { }`). After 750 ms
   (`graceMs`), the runner terminates the worker, reports `stopped` with the
   `head` it kept, and starts a new worker. The next run is slower, since the
   new worker compiles cold, unless a warmed spare was ready.

The timeout is a Stop the runner presses itself after 30 seconds of the
program's own time, reported as `timeout`. The clock runs in `runner.js`
from the `phase` message, and pauses while the program waits for input.

Without a shared buffer, Stop always terminates the worker.

A stack overflow, or `System.Environment.Exit`, ends .NET itself. The worker
catches the runtime's exit, reads the type and methods .NET printed on the
console for a stack overflow, and posts `crash`. The runner turns that into
an `exception` result (the frames have cells and members, from `typeCells`
in `head`, but no lines) or an `ok` with the exit code, and replaces the
worker.

## Boot, warm-up and recycling

The runner creates the worker at once. `worker.js` imports
`<frameworkUrl>dotnet.js`, starts the runtime, and calls `Engine.Boot`,
which sets the culture and installs the output routers. Then the runner
sends `warm`: `Engine.Warm` builds the shim and compiles and runs three small
programs (a class used from another cell, with LINQ, string formatting,
`ReadLine`, a local method and an input; one that throws; and a check), with
their output thrown away. That pays for Roslyn's cold start (about 3 s)
before the learner presses Run. If a job is already queued when .NET is up,
the warm-up is skipped.

A boot failure is sorted by `classifyBootError` in `worker.js` into a code,
which `runner.js` turns into a sentence (`docs/ENGINE_API.md`, "When C#
can't start"). The first failure in a tab reloads the page once, which picks
up a new deploy whose `_framework/` names changed.

After each job, the runner reads the worker's wasm heap size from the `done`
message. Past `recycleBytes` (320 MB), it starts a spare worker and warms
it. When the spare is ready and nothing is running, it becomes the worker
and the old one is terminated. A restart after Stop also takes the spare if
it is ready. A fresh worker uses about 145 MB of wasm heap after the
warm-up.

## The service worker

`web/coi-serviceworker.js` is one file with two halves: on a page it
registers itself (a `<script>` in the page's `<head>`), and as a service
worker it handles every fetch in its folder's scope. It is dewsharp's own,
based on coi-serviceworker 0.1.7 (`DECISIONS.md` #20).

1. **Cross-origin isolation.** GitHub Pages can't send headers, so the
   worker adds `Cross-Origin-Opener-Policy: same-origin`,
   `Cross-Origin-Embedder-Policy: require-corp` and
   `Cross-Origin-Resource-Policy: cross-origin` to every response. The first
   visit reloads the page once, so that the page itself comes through the
   worker; a mark in `sessionStorage` prevents a loop. `?sw=off` skips it.
2. **The runtime, cache-first.** A file in `_framework/` whose name carries
   a fingerprint (`name.<10 characters>.wasm`, `.js`, `.dat`, `.pdb`,
   `.json`) never changes, so it comes from the worker's cache
   (`dewsharp-framework-v1`) without asking the network. `dotnet.js` has no
   fingerprint and lists all the others; it always goes to the network
   (revalidated), and each time it arrives the cache drops the files it no
   longer lists. A redeploy then costs a learner only the files that
   changed. `tests/engine/lifecycle.test.mjs` checks that a second visit
   fetches only `dotnet.js`.

Everything outside `_framework/` passes through with the headers added, and
the browser's own HTTP cache applies.

## The build

- `npm run build:engine` runs `dotnet publish engine/Dewsharp.Browser -c
  Release -o engine/out` with the SDK of `global.json` (from `$DOTNET`, then
  `.dotnet/`, then `PATH`). It deletes the old `_framework/` first, since
  every publish writes new fingerprinted names. It takes about 45 s. The
  wasm-tools workload is not needed and not used.
- `npm run build:site` assembles `site/`: `web/`, `lessons/`, `courses/`,
  `_framework/` (without the SDK's `.gz` and `.br` copies, since Pages
  compresses by itself), `lessons/index.json` (`docs/PARSER.md`) and
  `.nojekyll` (Jekyll would leave out `_framework/`). It writes nothing if a
  lesson or a course has a parser error, if a course lists a lesson that
  neither exists nor is planned, or if a `lesson:` link goes nowhere.
- `npm run build` does both.
- `npm run vendor` writes `web/vendor/` (js-yaml, the three esbuild bundles,
  and the fonts); `npm test` fails if a file there is stale.

The site needs no build step of its own: the pages import ES modules
directly, and the bundles in `web/vendor/` are committed.

### Sizes and times

Measured on 27 September 2026 (4 cores, headless Chromium, the server on
localhost, so download time is not included):

| What | Measured |
|---|---|
| `_framework/` | 183 files, 42.6 MB raw, 15.7 MB gzip; a cold boot downloads 15.1 MB gzip in 185 requests |
| Boot (worker start to .NET ready) | 0.87–0.92 s |
| Warm-up | 3.9–4.2 s, so `ready` about 5 s after the page loads |
| First run after the warm-up | 105–145 ms (compile 90–125 ms) |
| Later runs | 80–160 ms |
| First run without a warm-up | 3.2–3.4 s |
| `classify` | 2 ms; a check of a types cell 12–19 ms |
| Recycling | the spare is ready 4.4 s after the threshold; the next run is not slower |
| Wasm heap after the warm-up | 145 MB |
| `check-lessons` on the fixture | 2 pages, 23 runs: 2.3 s of runs, 7.8 s in all with Chromium's start |
| `site/` as published (28 September 2026) | 255 files, 44.7 MB raw, 16.6 MB gzip; without `_framework/`, 2.1 MB raw and 1.2 MB gzip (the fonts, KaTeX and the editor are most of it) |
| A clean `npm run build`, `npm test`, `npm run check-lessons` | 37–61 s (the first includes the NuGet restore), 2 min 53 s, 9.7 s (4 pages, 77 runs) |

## The dev server

`npm run serve` (`tools/serve.mjs`) serves the site straight from its
sources: `web/` at `/`, `lessons/`, `courses/`, and `/_framework/` from the
engine's publish output. `/lessons/index.json` is made on each request. So
nothing is rebuilt between edits, and several people or agents can serve at
once on different ports (`--port`, or `PORT`).

It behaves like GitHub Pages where it matters: `application/wasm`, gzip,
`Cache-Control: max-age=600`, ETags and 304s, and no COOP/COEP headers, so
the service worker has to do its job, as on Pages. `--isolate` sends
COOP/COEP from the server instead; the tests use that with `?sw=off`.
`--site` serves a built `site/`. `--lessons dir` and `--courses dir` serve
other folders (the tests use `tests/fixtures/`). `/__stats` and `/__reset`
count requests and bytes, for the tests.

## The lesson checker

`npm run check-lessons [-- --write] [-- --lessons dir] [-- --jobs n] [ids...]`
(`tools/check-lessons.mjs`) parses every page in `lessons/`, and runs every
cell through the real engine in headless Chromium, the way a reader's
browser would.

- One server, one browser, and up to four pages (`--jobs`, default half the
  cores), each with one runner reused for every lesson it is given.
- For each page and each world (a page without worlds has one), with the
  cells a reader in that world sees above each cell: each program cell runs
  with its `stdin:` (or no input at all, so `ReadLine` gives `null`) and its
  inputs; each types cell runs in check mode; an empty cell doesn't run; each
  solution runs in place of its cell's code (an empty cell's too), with the
  same `stdin:` and inputs. A shared cell runs once, unless a world's cell
  above it changes its program; it then runs once per world. Each challenge
  is compiled alone, in check mode, as it would be in a new notebook.
- It fails on a parser error; on a `lesson:` link to a page that doesn't
  exist, and (when it checks the real `lessons/`) on a course that lists a
  lesson that neither exists nor is planned; on a cell that doesn't do what
  its `expect:` says (no `expect:` means it must compile and run to the
  end); on a solution that doesn't compile and run, or that throws on an
  input not marked `// throws`; on a challenge that doesn't compile on its
  own; on a predict block that asks about a line of the output (its
  question names the line, or `line:` does) that the output doesn't have;
  on an `inputs` block on a cell that reads input;
  and, without `--write`, on any difference from the
  recorded `<page id>.outputs.json` (`docs/PARSER.md`, "Recorded outputs").
  It prints each difference.
- `--write` records instead. Read the diff before you commit it.
- It exits 0 with a note when `lessons/` has no lessons yet.

`tests/tools/check-lessons.test.mjs` runs it on `tests/fixtures/` and checks
that it catches each kind of problem.

## Tests

`npm test` runs, in order:

1. `npm run vendor -- --check`, and the parser's unit tests (`node --test
   tests/parser/`), in well under a second.
2. The engine and checker tests (`node --test --test-concurrency=1
   tests/engine/ tests/tools/`), each file with its own server and
   Chromium, in about two minutes:
   - `traps.test.mjs`: the eight traps of `spike_a.md`, statics, culture, the
     Console shim, `Environment.Exit`, a stack overflow.
   - `input.test.mjs`: live input, a menu loop, end of input, `Read`,
     typed-ahead input, the three kinds of Stop, the timeout, the output
     cap, a prompt written with `Console.Write`.
   - `rules.test.mjs`: the five rules of the road, a class named `Program`,
     errors in a cell above, file names, warnings, compiler settings, check
     mode, `classify`, the comparison (with failing inputs), and the
     prototypes' own scenarios for cells (Model B).
   - `lifecycle.test.mjs`: boot and warm-up, recycling, boot failure (and
     after a deploy), no isolation, the service worker, `check.html`.
   - `tests/tools/check-lessons.test.mjs`: the checker on the fixture.
3. The page tests (`node --test --test-concurrency=1 tests/page/`), on the
   fixture course and lesson (see "The page", "Tests").

The tests need a built engine (`npm run build:engine`). They launch
Playwright without a proxy, since its proxy option also catches localhost.
Set `DUMPIO=1` to see Chromium's own output.

## CI

`.github/workflows/site.yml`, on every pull request and push: the SDK of
`global.json`, Node 22, `npm ci`, Chromium, `npm run build`, `npm test`,
`npm run check-lessons`. On a push to `main`, it uploads `site/` and deploys
it to GitHub Pages. Only one deploy runs at a time (the `pages` group, on the
deploy job alone).

## The page

The pages are static HTML with ES modules. They use only
`web/engine/runner.js` (`docs/ENGINE_API.md`) and `web/lesson/parse.js`
(`docs/PARSER.md`). Every page has `<meta name="robots" content="noindex">`,
loads `coi-serviceworker.js` first in its `<head>`, and then runs dewlab's
settings snippet (`DECISIONS.md` #34) before the first paint.

### Files

| Path | What it is |
|---|---|
| `web/index.html`, `web/page/home.js` | The home page: the courses as cards (from `lessons/index.json`), the notebook, help, teachers, and dewlab. |
| `web/course.html`, `web/page/course.js` | `course.html?c=<course id>`: the series and their lessons in reading order, each lesson's practice page, the Explore list, and a note on lessons with saved work. A lesson not written yet shows its `planned:` title, without a link. |
| `web/lesson.html`, `web/page/lesson.js` | `lesson.html?id=<page id>[&c=<course id>]`: a lesson or a practice page (below). |
| `web/notebook.html`, `web/page/notebook.js` | `notebook.html[?nb=<id>][?challenge=<page id>&n=<k>]`: the learner's own notebooks (below). |
| `web/help.html`, `web/teachers.html`, `web/page/static.js` | The learners' guide and the teachers' page: plain HTML, with the masthead, the foot, and highlighted code added by `static.js`. |
| `web/check.html` | "Check this device" (the engine's half, above), in the same style. |
| `web/page/common.js` | The masthead (wordmark, where the reader is, My notebook, Help, Settings), the Settings panel, the foot, `announce()` for screen readers, the lesson index, previous and next (`placeOf`), downloads and file picking. |
| `web/page/engine.js` | Makes the page's one runner, and ties the status line under the masthead to `onStatus`. |
| `web/page/cell.js` | `CodeCell`: one C# cell with its editor, button, status line, compiler messages and console. Both the lesson page and the notebook use it. |
| `web/page/console.js` | `ConsoleView`: draws output at most once per animation frame, with the Console shim's colours and `Clear`. |
| `web/page/editor.js` | CodeMirror as the page uses it, and highlighting for code to read. |
| `web/page/markdown.js` | markdown-it with the format's extras, and `enhance()`, which highlights code and typesets maths once HTML is in the page. |
| `web/page/guess.js` | `guessMatches`: whether a predict guess is the same as the output, which chooses what the page asks next. |
| `web/page/store.js` | Saved work, in IndexedDB. |
| `web/page/github.js` | The editing mode's GitHub client: a token kept in the browser, and "propose this text as a draft pull request". Knows nothing about lessons. |
| `web/page/edit.js` | The editing surface: the text box, the live list of problems, notes, starter blocks, the preview switch and the proposal form. Knows nothing about lessons. |
| `web/page/project.js` | "Download project": the Visual Studio project and the ZIP. |
| `web/page/style.css` | The look of every page: dewlab's tokens and fonts, and the parts dewlab doesn't have. |

A page that has no C# cell never creates a runner, so it downloads nothing
of .NET. A lesson page and the notebook create one as they start, so .NET
downloads and warms while the reader reads. The status line under the
masthead says what is happening: the files downloaded so far out of how many
and the megabytes they cost ("about 15 MB the first time"), then that the
compiler is starting, then "C# is ready." for a moment. If C# can't start,
it shows the runner's `reason`, a link to `check.html`, and the technical
text in a fold.

### The lesson page

`lesson.js` fetches `lessons/index.json` (for the page's path, its course
and its neighbours), then the page's Markdown, and parses it with
`parseLesson`. It renders `lesson.items` in order:

- **Markdown** through `markdown.js`: tables, task lists, `~~struck~~`,
  `lesson:<id>` links (to `lesson.html?id=<id>`), pictures relative to the
  lesson's folder, `$…$` and `$$…$$` (KaTeX, loaded only on a page with
  maths), headings with ids, and raw HTML, so the `dl-answer`, `dl-hint`
  and `dl-why` folds work as in dewlab.
- **Code to read** as a labelled `<pre>` (C#, Python, Console, or none),
  highlighted with the editor's own parsers.
- **A cell** as a `CodeCell` (below), with its blocks: a predict block above
  it, and under it its hints, its solutions (each in a fold, "A solution,
  <title>"), and its inputs table with **Compare with a solution**.
- **A challenge** as read-only code with **Open in my notebook**, a link to
  `notebook.html?challenge=<page id>&n=<k>`.
- **Worlds.** Items with a `group` are one task. The page draws every
  world's variant and shows only the chosen one. The chooser sits under the
  first heading. The choice is kept in `localStorage`
  (`dewsharp:world:<lesson id>`, shared with the practice page, and
  `dewsharp:world` for lessons not yet opened; `DECISIONS.md` #36).

At the foot: the learning outcomes the page covers, previous and next
(each lesson, then its practice page, in the course's reading order; `c=`
picks the course when two list the lesson), and **Export my work** and
**Import my work**. A page whose Markdown has parser errors still renders,
with the errors in a fold at the top.

A cell's `cells` for `runner.run()` come from `cellsForRun(lesson, item,
{ world, code })`, with the code of each cell above replaced by what is in
its editor now. So an edit to a class above changes the programs below it at
once, as the rules of the road say.

**Hints.** Each run that did not compile or stopped with an exception counts
as an error, and each run counts as a run. A hint appears when its
`after:` is reached, with a short animation (none with reduced motion) and
a screen-reader announcement. `unsure` counts the times the reader chose
"I'm not sure yet", which also opens the first hint. `guess differed` counts
runs whose output differed from the guess. The counts and the hints shown
are saved with the cell, so a hint stays once it has appeared.

**Predict.** The reader picks an option (or types a number or text) and
says how sure they are. After a run, the guess and the output sit side by
side under "Your guess" and "What the program printed", the chosen option's
note appears, and when they differ the page asks "Which line explains what
you saw?". Nothing says whether they match (`DECISIONS.md` #37). Whether
they differ is `guessMatches` in `guess.js`; a question about one line of
the output is compared with that line alone, and a guess that the program
does not compile, or stops with an exception, with what happened.

**The comparison.** **Compare with a solution** runs the reader's cell with
the inputs (`runWithInputs`: `stdin: ''`, so a program that reads input gets
the end of input), then the same cells with the first solution's code in
place of the cell's, and fills the table from the two `values` arrays. A row
whose two values differ (their `display`, or the exception's name) is
highlighted and says *different*. A row where either side did not run
(`not-run`) is not marked; the note under the table says what happened. Without a solution, the button is **Try
these inputs on your code** and the table has one column of results.

### A cell (`cell.js`)

- **The head:** the kind from `runner.classify` (`program`, `types` or
  `empty`, as a label, with a first guess from the code until the engine
  answers; each edit asks again after 400 ms), the file name (`file:`, or
  the engine's), "your version" when the code differs from the page's, and
  the `hint:` header behind a **?**.
- **The editor** (`editor.js`): CodeMirror 6 with the `clike` C# mode, line
  numbers, bracket matching and closing, auto-indent, four-space indents,
  Tab to indent (Escape, then Tab, leaves the editor), Ctrl/Cmd+Enter and
  Shift+Enter to run, undo, search, and the compiler's messages as
  underlines (wavy for errors, dotted for warnings) with gutter marks. Its
  colours are CSS tokens, so dark mode and high contrast apply.
- **The bar:** **Run** (which becomes **Stop** while the program runs) for
  a program cell, **Check** for a types cell, **Reset** to the page's
  version (Ctrl+Z brings the reader's back), **Download project** on a
  program cell, and a status line (`role="status"`) that names the three
  things of the style guide: "compiling…", "Did not compile, so nothing
  ran.", "Ran. (0.12 s)" (with the exit code if it was not 0, and "Ran, with
  1 warning." when the compiler warned, since the list of messages is not
  read aloud), "Stopped with
  an exception on line 3 of Program.cs.", "Stopped.", or the timeout.
- **Compiler messages** in Visual Studio's format,
  `Program.cs(2,19): error CS0103: …`, each a button that moves the cursor
  to its line and column, in its own cell or a cell above. Warnings are grey.
  The engine's `help` sentence sits under its message. After a failed
  compile, the focus moves to the first message. At most 20 are listed, with
  "Read the first message first" when there are several errors.
- **The console** (`role="log"`, `aria-live="polite"`): output as it
  arrives, the reader's typed lines in bold, `Console.Clear()` and the
  colours. A colour with only a foreground uses a token readable on the
  page's background; with a background too it uses the Windows Terminal
  palette. An exception is written under the output with its frames as
  links to their lines, the inner exception, and .NET's own text in a fold.
  The page keeps at most 400,000 characters on screen.
- **Input:** when the program waits, the input row under the output is
  highlighted and takes the focus. Enter sends the line; **End input** ends
  the input (`ReadLine` gives `null`). Without cross-origin isolation
  (`runner.liveInput` false), a cell whose code reads input shows a box for
  the answers, one on each line, and passes them as `stdin`.

### The notebook

A notebook is `{ id, title, cells: [{ id, type: 'code' | 'text', code }] }`
in the `notebooks` store. C# cells are `CodeCell`s whose cells above are the
notebook's code cells above them, so the rules of the road hold as on a
lesson page. Text cells are Markdown without raw HTML, shown rendered, with
**Edit** and **Done** (Ctrl+Enter). The reader can add a C# or text cell
between any two cells, move a cell up or down, duplicate it, and delete it
(with **Bring it back**), and rename, create, duplicate, delete and switch
notebooks. Every change is saved after 700 ms. A challenge link makes a new
notebook with a text cell that links back to the lesson and a code cell with
the challenge's code, then replaces the address with `?nb=<id>`, so a reload
doesn't make it twice.

**Export this notebook** writes `<title>.dewsharp.json`
(`{ format: "dewsharp-notebook", version: 1, title, cells: [{ type, code }] }`),
and **Import a notebook** adds it as a new notebook. **Export my work** and
**Import my work** are there too.

**Download project** (`project.js`, `DECISIONS.md` #38) asks the engine,
in check mode, for the kinds and files of the cells above and which types
a later cell replaced, then writes the ZIP: `<Name>.sln`,
`<Name>/<Name>.csproj`, `<Name>/Program.cs` (the cell), one file per types
cell above, `<Name>/IrishCulture.cs` and `README.txt`. `<Name>` is the
notebook's title, or the lesson and cell ids, in PascalCase. The `.csproj`:

```xml
<OutputType>Exe</OutputType>
<TargetFramework>net10.0</TargetFramework>
<LangVersion>14</LangVersion>
<ImplicitUsings>enable</ImplicitUsings>
<Nullable>disable</Nullable>
```

### Saved work

`store.js` keeps everything in IndexedDB, database `dewsharp`, version 1
(`DECISIONS.md` #35):

| Store | Key | Record |
|---|---|---|
| `work` | `<page id>/<cell id>` (index `page`) | `{ key, page, cell, code, output, predict: { guess, sure, outcome }, hints: { attempts, revealed }, version, saved_at }` |
| `notebooks` | `id` | `{ id, title, cells, created_at, saved_at }` |

`output` is the last run's output, capped at its last 20,000 characters.
`version` is the lesson's `version:` when the record was saved. A lesson
page saves a cell 600 ms after an edit, and at once after a run. On load it
puts each saved cell's code in its editor and its output under it (with the
date it ran), and restores the guess and the hints. If any record's version
differs from the lesson's, a notice at the top says the page has changed and
the reader's code is still there. If IndexedDB is blocked (some private
windows), work is kept in memory and the notebook says it will be lost.

**Export my work** writes `dewsharp-work-<date>.json`:
`{ format: "dewsharp-work", version: 1, exported_at, work: [...], notebooks: [...] }`.
**Import my work** takes that file and keeps, for each record, the copy
saved later. The lesson page reloads to show what came in.

### Settings, look and access

- **Settings** in the masthead: colours (like this device, light, dark),
  contrast, font (serif, sans, Lexend, OpenDyslexic), text size, line width
  and movement. They are written to `localStorage["dewlab:texture"]`, the
  key dewlab uses, and applied at once (`DECISIONS.md` #34).
- **The look** is dewlab's: its colour tokens for light, dark and high
  contrast, Georgia by default, the navy and rust of its wordmark, its
  folds, buttons and cell frame. Class names for things dewlab also has keep
  its `dl-` prefix; dewsharp's own use `ds-`.
- **The keyboard** reaches everything: a skip link, real buttons and
  links, the editor's Escape-then-Tab, and a visible focus ring (3 px) on
  every control. The focus moves to the input row when a program waits, and
  to the first compiler message after a failed compile.
- **Screen readers:** each cell is a labelled region ("Cell 3"), the status
  line and the console are live regions, and hints, world changes and
  notebook changes are announced.
- **Reduced motion:** the device's setting or the page's own turns off the
  animations (the loading dots, the hint's arrival, the running dot).

### Tests

`tests/page/` (run by `npm test`, after the engine tests) serves
`tests/fixtures/` and drives the pages in headless Chromium. `helpers.mjs`
sets a cell's code through `EditorView.findFromDOM`, as a paste would.

- `lesson.test.mjs`: every block renders (kinds, files, predict, hints,
  solutions, the inputs table, code to read, folds, maths, the challenge,
  outcomes, previous and next, the loading line); worlds switch and are
  remembered; Run, live input, End input, a menu with colours and
  `Environment.Exit`, Check, the three outcomes, rule 4 and Ctrl+Enter;
  Stop while waiting and in a silent loop; compiler messages (format, focus,
  click to the line, warnings, the rule-3 help, a hint after an error);
  predict; the comparison; saved work after a reload, Reset and Ctrl+Z, the
  version notice; Export and Import my work; typed-ahead input without
  isolation; a missing page and the practice page.
- `guess.test.mjs`: `guessMatches` on its own, without a browser: a
  question about one line, the whole output, numbers, and *Nothing*.
- `notebook.test.mjs`: add, run, check, rule 3 across cells, text cells,
  rename and reload; move, duplicate, delete and bring back; several
  notebooks; a challenge from a lesson; a notebook file; the project ZIP and
  every file in it.
- `edit.test.mjs`: the editing mode against a stand-in for GitHub: no sign of
  editing without a token; Settings keeps a token only after GitHub accepts
  it; the text box, its problems, the notes on ids and versions and a starter
  block; the preview, which uses and writes no saved work; the proposal and
  what it sends; a page that changed on GitHub meanwhile.
- `site.test.mjs`: every page's `<head>`, the home page, a course page, the
  settings (and a setting written by dewlab), help and teachers.

The page tests also look for the words the style guide rules out (*right*,
*wrong*, *correct*, *well done*, *not yet*) in what the pages show.

### Editing

A person who holds a GitHub token can edit a lesson from its own page
(`DECISIONS.md` #42). There is no separate editor and no server: the browser
talks to GitHub's REST API, and the only thing it can do is propose.

- **The token** is pasted once, in Settings under "For people who edit the
  lessons" (`editingSettings` in `common.js`). It is kept in `localStorage`
  under `dewsharp:edit:token`, and `check()` asks GitHub first whether it
  works and may change the repository. With no token no page shows any sign of
  editing, so a learner never meets it. The token should be a fine-grained one
  for this repository alone, with "Contents" and "Pull requests" on "Read and
  write" (`web/teachers.html`, "Editing a lesson"). It can open a branch and a
  draft pull request. It cannot merge. Any page on the same origin can read
  `localStorage`, so the token's reach is the whole defence: this repository
  only, an expiry date, and every change read before it is merged.
- **The surface** (`edit.js`) is a `<textarea>` holding the page's Markdown,
  exactly as the site has it. Text in is text out: nothing is re-formatted, so
  a proposal contains only what the author changed. This is the reason for a
  plain text box and not a rich editor (`DECISIONS.md` #42).
- **The checks** are the lesson page's, in `lesson.js`: `validate` is
  `parseLesson(text).errors`, the same parser the site build and the checker
  use, so what blocks a proposal is what would block the build. `notes` are
  what the parser cannot know: a cell id that is gone (saved work lives under
  it), and changed code under an unchanged `version:` (with a button that sets
  today's). `describe` lists changed, new and removed cells in the pull request.
- **The preview** draws the draft with the page's own `render()`. While
  `previewing` is true the page reads no saved work and `scheduleSave` and
  `saveNow` do nothing, so a learner's earlier edits to a cell do not replace
  the draft's code, and nothing typed in the preview is saved under a real
  cell id. A test breaks if that guard goes.
- **A proposal** (`propose` in `github.js`) reads the base branch, reads the
  file there and refuses if it is no longer the text the author opened, makes
  a branch `edit/<page id>-<date>-<time>-<three characters>`, writes the file
  with the author's one-line summary as the commit message, and opens a draft
  pull request on `main`. If a step after the branch fails, the branch is
  removed again.
- **Not done in the page:** recording `<id>.outputs.json`. A changed cell fails
  `npm run check-lessons` until someone records it (`--write`) and reads what
  changed. The pull request says so.
- **For another site** (dewlab, say): `github.js` and `edit.js` take their
  repository, token key and checks as arguments and import nothing but `el`,
  `announce` and `count` from `common.js`.
