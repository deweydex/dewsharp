# Decisions

Each entry: what was decided, why, and what it would cost to change. Numbered
in order; never renumbered. The evidence behind the first entries is in
`planning/evidence/` (three prototypes, outside research, and a review of
the original plan).

---

**1 — C# lives in its own repository, not in dewlab.** 27 September 2026.
dewlab's pages boot Pyodide as soon as they have a cell, every page loads the
shared CodeMirror bundle, and its build (`build.py`) knows only Python and
SQL cells. Weaving C# through it would touch its three largest files and
every downloaded tutorial (`planning/evidence/critique.md`). A folder inside
dewlab would either commit tens of megabytes of runtime into its history, or
put a .NET build in front of every Python publish. A fork or dewcode would
bring in dewlab's Python build. A separate repository ships on its own
schedule, and it can be deleted without leaving anything behind in dewlab.
Josh chose this on 27 September 2026.
*Cost to change: moderate. Both sites share the origin `deweydex.github.io`,
so saved work would survive a move to `/dewlab/csharp/`. But the address
would change, and dewlab's deploy would need to fetch the runtime.*

**2 — Roslyn and .NET 10 run in a Web Worker in the learner's browser.** No
server. Prototype measurements are in `planning/evidence/spike_a.md`: a cold
first visit downloads 15 MB untrimmed. The first compile takes about 2.5–3 s,
or about 1 s after a warm-up compile at boot, and each Run after that about
0.4 s. Microsoft retired Try .NET, and WasmSharp can't run a console program
(`research.md`).
*Cost to change: high. It is the whole engine.*

**3 — The runtime is not trimmed.** Josh, 27 September 2026: 15 MB is fine,
and twice that would be fine on the college network. With trimming, a
program that uses an API the trimmer removed stops before it prints anything
(a TypeLoadException), and the checker can't foresee what a learner will
type.
*Cost to change: one build property, plus a corpus of programs to test it
with.*

**4 — Cells follow the rules of the road: types carry down, statements and
variables don't.** Each Run compiles one ordinary C# program. It contains the
types from the cells above, plus the cell being run (`CLAUDE.md`). Running
cells as C# script submissions shares variables, but it teaches a different
dialect: no namespaces, and objects print as `Submission#0+Student`
(`spike_b.md`). Microsoft's scripting package does not run in the browser at
all. A hybrid (live variables on top of a library of classes) works in the
prototype. It would bring back restart-and-replay, and loss of state on
Stop. It is set aside until a class shows it is needed.
*Cost to change: moderate. The engine keeps both paths, and lessons written
under this rule would still run under the hybrid.*

**5 — `Console.ReadLine()` waits for the learner.** A custom `Console.In`
blocks the worker on `Atomics.wait` until the page sends a line. This needs
cross-origin isolation. On GitHub Pages it comes from
`coi-serviceworker.js`, served from this site's own folder and scoped to it
(`spike_c.md`). Without isolation, the page asks for the answers before the
run.
*Cost to change: low.*

**6 — Lessons are rendered in the browser from Markdown, with dewlab's
format.** The grammar is dewlab's, with C# in place of Python, so writing a
lesson feels the same (`docs/LESSON_FORMAT.md`). A single parser serves the
page and the checker. The checker runs every cell in the real browser
engine, so it catches failures that happen only in WebAssembly.
*Cost to change: moderate.*

**7 — Student-facing text follows dewlab's pedagogical style guide.** The
guide is copied into `planning/`, with a C# section at its end. Josh, 27
September 2026: "so long as the language is super clear for the user (and
the teacher)".
*Cost to change: low.*

**8 — The page shims part of `Console`.** `Clear`, `ForegroundColor`,
`BackgroundColor`, `ResetColor` and `ReadKey` throw
PlatformNotSupportedException in browser .NET, and console menus in PDP and
FOOP use them. An injected `global using` alias points `Console` at a class
that passes every other call through to `System.Console` and implements these
five on the page. The exported Visual Studio project leaves the alias out.
*Cost to change: low.*
