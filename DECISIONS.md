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

**7 — dewsharp has its own style guide, written for C#.** Josh, 27
September 2026: "lets see if we can start the style guide from scratch so we
are more efficient--we don't want to inherit mistakes, we can do it on our own
as C# will likely require different decisions". A copy of dewlab's guide was
replaced the same day by `planning/PEDAGOGICAL_STYLE_GUIDE.md`, draft 1. It
keeps the file name so that existing references still resolve. It is shorter.
It is built around what C# changes: the compiler as the first feedback, the
rules of the road, and real console input. Its open decisions are listed at
its end. The goal, in Josh's words: "so long as the language is super clear
for the user (and the teacher)".
*Cost to change: low. It is one file, and the lessons follow it.*

**8 — The page shims part of `Console`.** `Clear`, `ForegroundColor`,
`BackgroundColor`, `ResetColor` and `ReadKey` throw
PlatformNotSupportedException in browser .NET, and console menus in PDP and
FOOP use them. An injected `global using` alias points `Console` at a class
that passes every other call through to `System.Console` and implements these
five on the page. The exported Visual Studio project leaves the alias out.
*Cost to change: low.*


**9 — The course map keeps dewlab's lesson ids where the topic maps, and
renames three.** `powers-in-python` becomes `powers-in-csharp`, following the
draft already begun under that id, and `dividing-in-python` becomes
`dividing-in-csharp` to match. `comprehensions-and-grids` becomes
`grids-and-references`, because C# has no comprehension and the page is
rebuilt round grids and references. `writing-your-own-functions` keeps its
id, though the page says *method*, so that a teacher can set a dewlab page
beside its C# page (`planning/COURSE_MAP.md`).
*Cost to change: nothing until a class has used the lessons. After that, a
renamed id loses the work saved under it (`CLAUDE.md`, "Three traps").*

**10 — Compiling, types and their sizes, and reading input each get a lesson,
shared by both courses.** The descriptors name all three. PDP asks learners to
interpret compiler and linker messages, to know the range and memory of each
type, and to write a program that reads from a user. FOOP asks them to
troubleshoot compiler errors, convert between types and use `do`...`while`.
C# makes each of these unavoidable, where Python let dewlab mention them in
passing. One page serves both courses, so a fix is made once, and a learner's
saved work is the same in both.
*Cost to change: low. A course file lists a lesson or drops it. Splitting a
shared page into one page for each course would give the second copy a new
id.*

**11 — FOOP opens with a short series, "Starting in C#", for learners who
know Python.** dewlab's FOOP assumes Python functions and loops. The C# FOOP
cannot assume C#, because learners arrive from dewlab's Python PDP, from this
site's C# PDP, or from neither. The series is one new page that puts Python
beside C#, the three shared pages of decision 10, and a mixed set. A learner
who took PDP in C# starts at "Classes and objects". The style guide counts
FOOP's pages ("`var` on FOOP's second page"); the map counts them from
`objects-and-classes`, because the first series is shared with PDP, which
writes every type.
*Cost to change: low. It is a change to `courses/foop.yaml`, and
`objects-and-classes` is written to stand on its own either way.*

**12 — PDP teaches the rules of the road on `building-reusable-tools`, with a
static class of methods.** A PDP learner meets a class for the first time
there: a `static class` of tested methods in a types cell, used by the cells
below it. It is also the shape the team project needs, with one file for each
person (`from-cells-to-a-program`). Until that page, every PDP cell stands
alone and repeats what it needs. The other choice was to keep PDP free of
classes and leave files to Visual Studio, but then the pages would never show
the modules a team divides its work into.
*Cost to change: moderate. Moving the rules to another page means rewriting
that section on two pages.*

**13 — FOOP's worlds are the game and the solar system, plus "your own".**
The style guide allows two worlds on a page, and a FOOP reader's class grows
page by page in one world, so the pair must be the same on every page. dewlab
taught three FOOP pages in the ocean. The map retells them in the solar
system: a probe's fuel for encapsulation, a mission to design classes for,
and five probes to test. The solar system has real data (Jupiter's moons,
the minutes light takes to reach Neptune), and dewlab already has
solar-system variants of those three pages to start from.
*Cost to change: moderate. Another pair means retelling the pages taught in
the world that goes, and every version of that world's class.*

**14 — Lessons are translated in batches, with `first-steps` and
`objects-and-classes` first, as exemplars.** Each batch depends only on
earlier ones, and a tutorial and its practice page are written together. The
two exemplars set the pattern for every later lesson (the map lists what
they settle), and Josh reviews them before batch 1. A lesson links only to
lessons of earlier batches; a forward link is added by the batch that writes
the page it points to.
*Cost to change: low. The batches are an order of work, computed from each
lesson's dependencies in the map.*

**15 — `a-polynomial-class` moves to FOOP's explore list.** dewlab's FOOP
lists it as a project. No FOOP outcome needs it beyond the other pages, its
lead-in is a maths page this site does not have, and dewlab's own log says it
can make a reader anxious about the mathematics rather than the code (dewlab
`DECISIONS_LOG.md` 7.242). As an extra it gains C#'s operator overloading.
*Cost to change: low. It is one line in a course file.*
