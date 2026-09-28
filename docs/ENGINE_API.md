# The engine and the page: the contract

The page (`web/`) never talks to .NET directly. It uses one JavaScript module,
`web/engine/runner.js`. That module owns the Web Worker, the .NET runtime
inside it, the shared buffer for input and Stop, and restarts. This file is
the contract between that module and everything that uses it: the lesson
page, the notebook, `check.html` and `tools/check-lessons.mjs`. Change it
only together with its callers, and update this file in the same change.
`docs/ARCHITECTURE.md` describes how it works inside.

## Starting

```js
import { createRunner } from "./engine/runner.js";

const runner = createRunner({ frameworkUrl: new URL("../_framework/", import.meta.url) });
runner.onStatus((status, detail) => { /* ... */ });
await runner.ready();          // resolves after boot and a warm-up compile
```

`createRunner(options)` starts booting at once. Its options:

| Option | Default | Meaning |
|---|---|---|
| `frameworkUrl` | required | The folder that holds `dotnet.js` (the published `_framework/`). |
| `workerUrl` | `worker.js` beside `runner.js` | The engine's worker script. |
| `timeoutMs` | `30000` | A run's own time before it ends as `timeout`. `run()` can override it. |
| `graceMs` | `750` | How long Stop waits for the program to stop by itself. |
| `recycleBytes` | `RECYCLE_BYTES` (320 MB) | Memory above which an idle runner replaces its worker. |
| `warm` | `true` | Compile and run a small program at boot, so the first Run is quick. |
| `reloadOnBootFailure` | `true` | Reload the page once if .NET can't start (see "When C# can't start"). |

`onStatus(fn)` calls `fn(status, detail)` at once with the current status,
and again on every change. It returns a function that stops the calls.
`runner.status` holds the current status. `status` is one of:

| Status | Meaning |
|---|---|
| `loading` | Downloading or starting .NET. `detail` is `{ loaded, total, unit: "files", bytes }`: files downloaded so far, out of how many, and the bytes they cost on the network so far (compressed; `null` if the browser won't say). .NET 10 reports files, not bytes, so there is no total in bytes; the page says "about 15 MB" for that. |
| `warming` | Compiling a one-line program so that the learner's first Run is quick. |
| `ready` | Idle and ready. |
| `busy` | A run or a check is in progress. |
| `restarting` | The worker is being replaced, after Stop on a silent loop, a crash, or a timeout that the program didn't answer. |
| `unavailable` | .NET could not start. `detail` is `{ reason, code, technical }`: `reason` says why, in words a learner can read. |

The runner boots when it is created. A page that has no C# cells doesn't
create one. `ready()` rejects when the status becomes `unavailable`, with an
`Error` that has the same `reason`, `code` and `technical`.

### When C# can't start

`code` sorts the failure, and `reason` is the sentence to show:

| `code` | When | `reason` |
|---|---|---|
| `download` | A file could not be fetched. | C# could not be downloaded. Check that you are online, then reload the page. |
| `changed` | A file the page expects is gone or different, usually because the site was deployed while the page was open. | This site was updated while the page was open. Reload the page to get the new version. |
| `unsupported` | No WebAssembly or no module workers. | This browser cannot run C#. Try the newest Chrome, Edge, Firefox or Safari. |
| `memory` | .NET ran out of memory while starting. | The device ran out of memory while starting C#. Close some other tabs, then reload the page. |
| `other` | Anything else. | C# could not start on this page. Reload the page. If that does not help, try another browser. |

`technical` is the error itself, for a "details" fold or a bug report. With
`reloadOnBootFailure`, the first failure in a browser tab (except
`unsupported`) reloads the page instead, once: a reload picks up a new deploy.
A mark in `sessionStorage` stops a second reload, and a successful boot clears
it.

## Running a cell

```js
const job = runner.run({
  cells: [                            // the cells on show above the target, in page order, then the target last
    { id: "planet", file: "Planet.cs", code: "public class Planet { ... }" },
    { id: "your-turn-1", code: "var p = new Planet(\"Mars\");\nConsole.WriteLine(p);" },
  ],
  mode: "run",                        // "run" | "check"
  stdin: undefined,                   // a string: typed-ahead input, and no prompts. undefined: live input
  inputs: undefined,                  // an array of C# expressions, for the comparison (see below)
  timeoutMs: undefined,               // optional: this run's own time limit
  onOutput(chunk) {},                 // { kind: "out" | "err" | "echo" | "clear" | "style", text?, style? }
  onInputRequest() {},                // the program is waiting in ReadLine/Read/ReadKey
});

job.sendLine("Ada");                  // answer an input request
job.endInput();                       // end of input: ReadLine returns null
job.stop();                           // Stop
const result = await job.done;
```

`cellsForRun()` in `web/lesson/parse.js` builds `cells` from a parsed lesson
(`docs/PARSER.md`). `file` is optional: without it the engine names a cell's
file itself (the first type's name plus `.cs` for a types cell, `Program.cs`
otherwise) and returns the names in `result.files`.

The target is the last cell. The engine applies the rules of the road
(`docs/LESSON_FORMAT.md`, "Cell kinds"): it keeps the types declared in the
cells above, except classes with a `Main`, and lets a later declaration of the
same type replace an earlier one. It then compiles one program, with the
target's statements as its top-level statements, or the target's `Main` as
its entry point. `mode: "check"` compiles the same cells and never runs
anything: as a library when the target is a types cell, and as a program
when it is a program cell (only a program may have top-level statements).

The runner runs one job at a time. A `run()` made while another job is busy,
or while the worker restarts, waits its turn; Stop on a waiting job ends it
at once with `stopped` and nothing run.

Output arrives while the program runs. `echo` is the learner's typed line,
sent back so that the console reads like a terminal (typed-ahead lines are
echoed too, as the program reads them). `clear` comes from
`Console.Clear()`. `style` carries `style: { fg, bg }` from
`Console.ForegroundColor` and `Console.BackgroundColor`: each is a
`ConsoleColor` name (`"Red"`, `"DarkYellow"`) or `null` for the page's own
colour, and `Console.ResetColor()` sends both as `null`. The page must draw
output at most once per animation frame. The worker posts output at most
every 25 ms. The engine caps each run at 1,000,000 characters and then sends
one last `err` chunk saying the limit was reached; the program goes on
running, unseen, until it ends or is stopped.

`sendLine(text)` sends the first line of `text`. A line sent before the
program asks is kept for its next read. `sendLine` and `endInput` return
`false` when they do nothing: the job has finished, or it runs with `stdin`.

`result`:

```js
{
  outcome: "ok" | "compile-error" | "exception" | "stopped" | "timeout" | "host-error",
  ran: true,                          // the program started (false for check mode and compile errors)
  kind: { "planet": "types", "your-turn-1": "program" },   // each cell's kind, as the engine saw it
  files: { "planet": "Planet.cs", "your-turn-1": "Program.cs" },   // each cell's file name
  diagnostics: [
    { severity: "error" | "warning", code: "CS0103", message: "The name 'Nmae' does not exist in the current context",
      cellId: "your-turn-1", file: "Program.cs", line: 2, column: 19, endLine: 2, endColumn: 23,
      help: "..." }                   // help: only on the messages described below
  ],
  replaced: [ { type: "Planet", cellId: "planet", by: "planet-2" } ],   // rule 4: types a later cell replaced
  exception: { type: "System.InvalidOperationException", message: "...",
               frames: [ { cellId: "planet", file: "Planet.cs", line: 14, member: "Planet.Orbit()" } ],
               trace: "...", inner: null },
  exitCode: 0,
  values: [ { ok: true, kind: "value", display: "[1, 2, 3]" },
            { ok: false, kind: "exception", error: "DivideByZeroException", message: "Attempted to divide by zero." },
            { ok: false, kind: "compile-error", error: "CS0117", message: "..." },
            { ok: false, kind: "not-run", error: null } ],   // one per input; only when inputs were given
  timings: { compileMs, runMs, wallMs, inputWaitMs, inputLines },
  detail: "...",                      // only for host-error: what went wrong, for a bug report
}
```

- Every field is always there (`exception` and `exitCode` may be `null`),
  except `values`, which is there only when `inputs` was given, and `detail`.
- Lines and columns are one-based, and they count from the top of the cell,
  not from the top of the assembled program. A diagnostic outside every cell
  (rare: a missing reference) has `cellId` and `file` null.
- Diagnostics come errors first, then warnings, each in cell order and then
  line order. Warnings never stop a run. Show them in a quieter style.
- `help` is a plain sentence the page can show under the compiler's message.
  There are two: under an error about a class named `Program` ("Give your
  class a name other than Program. ..."), and under CS0103 when the name was
  a variable made in a cell above ("... Variables stay in their cell, so make
  it again in this cell.").
- `frames` lists only the learner's own code, innermost first. Frames inside
  .NET or inside the engine are left out. `member` is `null` for a line of
  top-level statements, and a local method shows as `Name(int)`. After a
  stack overflow, the frames have a cell and a member but `line` is `null`,
  since .NET stops before the engine can read the program's line table.
  `trace` is .NET's own text, for a "details" fold. `inner` is the inner
  exception, in the same shape, or `null`.
- `exitCode` is the program's: `Main`'s return value, or the code given to
  `Environment.Exit`, which ends the run with outcome `ok` and keeps the
  output so far. It is `null` when the program didn't finish.
- `timeout` means the program ran for longer than 30 seconds of its own time.
  Time spent waiting for the learner to type does not count.
- `stopped` and `timeout` keep `kind`, `files` and `diagnostics` (the
  warnings) once the program has started, even when the worker had to be
  replaced. A job stopped before it started has empty ones.
- `host-error` is the engine's own failure, never the learner's. The page
  says so in those words.
- `timings` are in milliseconds. `wallMs` is from `run()` to the result,
  queueing included. `inputWaitMs` and `inputLines` are there only when the
  program ran.

## The comparison

With `inputs: ["Total(new List<int> { 4, 8 })", ...]`, the engine appends one
evaluation per input after the target's own statements, in the same scope,
and fills `result.values` in the same order. A compile error in one input is
reported for that input alone, in its `values` entry, and the others still
run. An input that is not one C# expression is reported the same way. The
page runs the reader's cell and then the solution (the same `cells`, with the
target's `code` replaced) and draws the table from the two `values` arrays.

- `display` is the value as C# would write it: `"text"` in quotes, `'c'`,
  `true`, `12.5` (always with a point, whatever the culture), `null`,
  `[1, 2, 3]` for a list or an array, `{ ["Ada"] = 3 }` for a dictionary,
  `(1, "a")` for a tuple, `Suit.Hearts` for an enum, and `ToString()` for
  anything else. A long value is cut at 2,000 characters, and a collection
  at 100 items. A method that returns nothing (`void`) shows as
  `(no value)`.
- An input that throws gives `kind: "exception"` and the exception's short
  name in `error`.
- `not-run` means the program never reached the inputs: it didn't compile,
  it stopped with an exception before them, it was stopped, or it timed out.
- Inputs work on a types cell and on a cell with `Main` too. The inputs are
  then the program's only statements, so a `Main` does not run, and they can
  use the cell's types (`Stats.Twice(4)`). If every input of a types cell
  fails to compile, nothing is left to run: `outcome` is `ok`, `ran` is
  false, and each input's `values` entry has its error.
- The target's own output still arrives through `onOutput`.

## Stop

`job.stop()` first asks the program to stop by itself, which takes a few
milliseconds while it waits for input or prints. If it hasn't stopped after
750 ms, the runner terminates the worker and starts a new one. Either way,
`result.outcome` is `stopped`. After a restart, the next Run is slower,
because the compiler starts cold, unless a warmed spare worker was ready
(see "Recycling"). A timeout is a Stop that the runner presses itself, and
ends as `timeout`.

## Knowing a cell's kind without running it

```js
const kinds = await runner.classify([{ id, code }, ...]);   // { id: "types" | "program" | "empty" }
```

This is a syntax-only parse. It is fast (a few milliseconds), and the page
calls it after each edit (with a short delay) to keep the labels right. A
cell is `program` if it has a statement or a `static Main`, `types` if it has
only declarations and `using` lines, and `empty` if it has nothing but
comments and white space. While a program runs, `classify` waits for it.

## Input without cross-origin isolation

Live input needs `SharedArrayBuffer`, which needs the page to be
cross-origin isolated (`coi-serviceworker.js`). If it isn't, `runner.liveInput`
is `false`. The page then asks for the answers before the run and passes them
as `stdin`. Stop always terminates the worker in that case. With live input,
a `stdin` string still works, and the program is then never waiting.

## Recycling

Memory grows by about 0.5–0.9 MB on every run, and .NET in the browser never
gives it back. The runner replaces the worker while it is idle, once the
worker's memory passes a threshold (`RECYCLE_BYTES` in `runner.js`, 320 MB).
It warms the new worker before the old one goes, so the learner never waits
for it. A run that starts while the spare warms uses the old worker.

## For tools and tests

- `runner.stats`: `{ boots, restarts, recycles, runs, lastBootMs,
  lastWarmMs, lastRecycleMs, memory }`.
- `await runner.memory()`: `{ wasmBytes, managedBytes, runs, lateWrites }`
  from the worker.
- `runner.dispose()` ends the worker and every job (as `host-error`). The
  runner can't be used afterwards.
- `RECYCLE_BYTES` is exported.
