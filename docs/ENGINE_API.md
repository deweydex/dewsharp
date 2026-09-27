# The engine and the page: the contract

The page (`web/`) never talks to .NET directly. It uses one JavaScript module,
`web/engine/runner.js`. That module owns the Web Worker, the .NET runtime
inside it, the shared buffer for input and Stop, and restarts. This file is
the contract between that module and everything that uses it: the lesson
page, the notebook, `check.html` and `tools/check-lessons.mjs`. Change it
only together with its callers, and update this file in the same change.

## Starting

```js
import { createRunner } from "./engine/runner.js";

const runner = createRunner({ frameworkUrl: new URL("../_framework/", import.meta.url) });
runner.onStatus((status, detail) => { /* ... */ });
await runner.ready();          // resolves after boot and a warm-up compile
```

`status` is one of:

| Status | Meaning |
|---|---|
| `loading` | Downloading or starting .NET. `detail` is `{ loaded, total }` in bytes, when known. |
| `warming` | Compiling a one-line program so that the learner's first Run is quick. |
| `ready` | Idle and ready. |
| `busy` | A run or a check is in progress. |
| `restarting` | The worker is being replaced, after Stop on a silent loop, a crash, or recycling. |
| `unavailable` | .NET could not start. `detail.reason` says why, in words a learner can read. |

The runner boots when it is created. A page that has no C# cells doesn't
create one.

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
  onOutput(chunk) {},                 // { kind: "out" | "err" | "echo" | "clear" | "style", text?, style? }
  onInputRequest() {},                // the program is waiting in ReadLine/Read/ReadKey
});

job.sendLine("Ada");                  // answer an input request
job.endInput();                       // end of input: ReadLine returns null
job.stop();                           // Stop
const result = await job.done;
```

The target is the last cell. The engine applies the rules of the road
(`docs/LESSON_FORMAT.md`, "Cell kinds"): it keeps the types declared in the
cells above, except classes with a `Main`, and lets a later declaration of the
same type replace an earlier one. It then compiles one program, with the
target's statements as its top-level statements, or the target's `Main` as
its entry point. `mode: "check"` compiles the same cells as a library and
never runs anything.

Output arrives while the program runs. `echo` is the learner's typed line,
sent back so that the console reads like a terminal. `clear` comes from
`Console.Clear()`. `style` carries `{ fg, bg }` colour names from
`Console.ForegroundColor` and `Console.BackgroundColor`. The page must draw
output at most once per animation frame. The engine caps each run at
1,000,000 characters and then sends one last `err` chunk saying the limit was
reached.

`result`:

```js
{
  outcome: "ok" | "compile-error" | "exception" | "stopped" | "timeout" | "host-error",
  kind: { "planet": "types", "your-turn-1": "program" },   // each cell's kind, as the engine saw it
  diagnostics: [
    { severity: "error" | "warning", code: "CS0103", message: "The name 'Nmae' does not exist in the current context",
      cellId: "your-turn-1", file: "Program.cs", line: 2, column: 19, endLine: 2, endColumn: 23 }
  ],
  exception: { type: "System.InvalidOperationException", message: "...",
               frames: [ { cellId: "planet", file: "Planet.cs", line: 14, member: "Planet.Orbit()" } ] },
  exitCode: 0,
  values: [ { ok: true, display: "[1, 2, 3]" }, { ok: false, error: "DivideByZeroException" } ],   // one per input
  timings: { compileMs, runMs },
}
```

- Lines and columns are one-based, and they count from the top of the cell,
  not from the top of the assembled program.
- `frames` lists only the learner's own code. Frames inside .NET or inside
  the engine are left out.
- `timeout` means the program ran for longer than 30 seconds of its own time.
  Time spent waiting for the learner to type does not count.
- `host-error` is the engine's own failure, never the learner's. The page
  says so in those words.

## The comparison

With `inputs: ["Total(new List<int> { 4, 8 })", ...]`, the engine appends one
evaluation per input after the target's own statements, in the same scope,
and fills `result.values` in the same order. A compile error in one input is
reported for that input alone, in its `values` entry, and the others still
run. The page runs the reader's cell and then the solution (the same `cells`,
with the target's `code` replaced) and draws the table from the two
`values` arrays.

## Stop

`job.stop()` first asks the program to stop by itself, which takes a few
milliseconds while it waits for input or prints. If it hasn't stopped after
750 ms, the runner terminates the worker and starts a new one. Either way,
`result.outcome` is `stopped`. After a restart, the next Run is slower,
because the compiler starts cold.

## Knowing a cell's kind without running it

```js
const kinds = await runner.classify([{ id, code }, ...]);   // { id: "types" | "program" | "empty" }
```

This is a syntax-only parse. It is fast, and the page calls it after each
edit (with a short delay) to keep the labels right.

## Input without cross-origin isolation

Live input needs `SharedArrayBuffer`, which needs the page to be
cross-origin isolated (`coi-serviceworker.js`). If it isn't, `runner.liveInput`
is `false`. The page then asks for the answers before the run and passes them
as `stdin`. Stop always terminates the worker in that case.

## Recycling

Memory grows by about 0.5–0.9 MB on every run, and .NET in the browser never
gives it back. The runner replaces the worker while it is idle, once the
worker's memory passes a threshold (set in `runner.js`). It warms the new
worker before the old one goes, so the learner never waits for it.
