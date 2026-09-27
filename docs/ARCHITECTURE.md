# Architecture

The map of dewsharp. `docs/ENGINE_API.md` is the contract between the engine
and the page, `docs/LESSON_FORMAT.md` the contract for lessons, and
`docs/PARSER.md` what the parser gives the page. This file says how the parts
behind those contracts work. `DECISIONS.md` says why.

This is the engine's half. The page's half (the lesson page, the notebook,
the course pages) is described by whoever builds it, below "The page".

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
| `web/vendor/` | Third-party browser modules, copied from `node_modules/` by `npm run vendor` and committed. Only js-yaml so far. |
| `web/dev.html` | A bare page with a runner on it, for developers and the tests. Not the lesson page. |
| `web/check.html` | "Check this device": a self-test a learner or teacher can open to see whether this browser runs the lessons. |
| `tools/serve.mjs`, `tools/lib/static.mjs` | The dev server. |
| `tools/build-engine.mjs` | `npm run build:engine`: `dotnet publish`. |
| `tools/build-site.mjs`, `tools/lib/lessons.mjs` | `npm run build:site`: assembles `site/`, and writes `lessons/index.json`. |
| `tools/check-lessons.mjs` | `npm run check-lessons`: runs every cell of every lesson in headless Chromium. |
| `tools/vendor.mjs` | `npm run vendor`: refreshes `web/vendor/`. |
| `tests/parser/` | Unit tests of the parser (`node --test`). |
| `tests/engine/` | Engine tests in headless Chromium, through `runner.js` on `dev.html`. |
| `tests/tools/` | Tests of the lesson checker. |
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
  lesson or a course has a parser error.
- `npm run build` does both.
- `npm run vendor` copies js-yaml into `web/vendor/`; `npm test` fails if the
  copy is stale.

The site is static and needs no bundler: the page imports ES modules
directly.

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
  same `stdin:` and inputs. A shared cell runs once,
  unless a world's cell above it changes its program; it then runs once per
  world.
- It fails on a parser error; on a cell that doesn't do what its `expect:`
  says (no `expect:` means it must compile and run to the end); on a
  solution that doesn't compile and run, or that throws on an input not
  marked `// throws`; and, without `--write`, on any difference from the
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

Not built yet. The lesson page, the notebook and the course pages use only
`web/engine/runner.js` (`docs/ENGINE_API.md`) and `web/lesson/parse.js`
(`docs/PARSER.md`), and load `coi-serviceworker.js` from their `<head>`.
