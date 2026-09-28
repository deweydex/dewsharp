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

**16 — Each cell is its own file in the assembled program, and what a cell
above doesn't contribute is blanked out, not moved.** The engine parses each
cell alone, keeps its type declarations, and overwrites its statements, any
class with a `Main`, and any type a later cell declares again with spaces.
Each file starts with `#line 1 "cell:N"`. Every line and column then stays
where the learner wrote it, so a compiler message and a stack frame name the
cell and the line in it with no arithmetic, and the file of each cell is what
the exported Visual Studio project would hold. A type is "the same" when its
namespace, name and number of type parameters match; partial types join
instead of replacing each other. Check mode compiles a program cell as a
program, not as a library as the first contract said, because only a
program may have top-level statements; a types cell still compiles as a
library (`docs/ARCHITECTURE.md`, "Assembling a program from cells").
*Cost to change: low. It is `Assembler.cs`, and `tests/engine/rules.test.mjs`
says what must still hold.*

**17 — The Console shim is generated from `System.Console` itself, and
`Environment` is shimmed the same way.** Decision 8 says which five members
work on the page. Writing the pass-through by hand would miss overloads, and a
missing one is a compiler error in a learner's ordinary code. So the engine
generates the class at warm-up from the reference assemblies the learner
compiles against: every public static member, with its own signature,
calling the real one. `Environment` gets the same treatment, because
`Environment.Exit` in browser .NET ends the whole runtime in the worker; the
shim makes it end the run, keep the output, and report the exit code. A
program that writes `System.Environment.Exit` in full still ends the runtime,
and the runner replaces the worker and reports the same thing. A stack
overflow also ends the runtime; the runner reports it as an exception with
the cells and members .NET printed, but no line numbers.
*Cost to change: low. It is `Shim.cs`. Dropping the Environment shim would
make `Environment.Exit` cost a cold restart.*

**18 — The comparison compiles at most twice.** All the inputs are compiled
with the cell in one program. If some fail to compile, the engine notes each
failing input in its own `values` entry, leaves those inputs out, and
compiles again. The other choice was one compile per input, which is simpler
but costs about 100 ms per input, and a cell has up to ten.
*Cost to change: low. It is one loop in `Engine.RunCore`.*

**19 — Third-party code for the browser is a committed copy in
`web/vendor/`, and the site has no bundler.** The page and Node import the
same ES modules. js-yaml 4 reads the frontmatter and the course files: it is
the YAML library most widely used, it ships an ES module, and it is 100 KB
unminified. `npm run vendor` makes the copy from `node_modules/`, and the
tests fail if the copy is stale. A bundler would add a build step in front of
every page edit, for one dependency.
*Cost to change: low. A bundler can be added when the page needs an editor
(CodeMirror), and `web/vendor/` then becomes its output.*

**20 — dewsharp writes its own service worker, based on coi-serviceworker
0.1.7.** It does two jobs. It isolates the page (COOP `same-origin`, COEP
`require-corp`, always; coi-serviceworker would send `credentialless` to
browsers that may not support it). And it serves the fingerprinted files in
`_framework/` from its own cache without asking the network, dropping the
ones that a new `dotnet.js` no longer lists. With GitHub Pages' ten-minute
cache alone, a learner would download the whole 15 MB again after every
deploy. The vendored coi-serviceworker can't do the second job, and two
service workers can't share a scope (`spike_c.md`).
*Cost to change: low. It is one file of about 120 lines, and a test covers
each job.*

**21 — The timeout and the Stop grace period are timed by the runner, in
JavaScript.** The runner starts the clock when the program starts, pauses it
from the moment the program asks for input until the page answers, and
presses Stop itself after 30 s of the program's own time. A program that
doesn't answer Stop within 750 ms has its worker ended, whether a person or
the clock pressed it. A clock inside .NET could not end a loop that never
prints, and the runner already knows when the program waits.
*Cost to change: low. It is `Job` in `runner.js`.*

**22 — The worker is replaced at 320 MB of WebAssembly memory, by a spare
that is warmed first.** A fresh worker uses about 145 MB after its warm-up,
and each run adds 0.5–0.9 MB that .NET in the browser never gives back. 320
MB leaves room for 200 to 350 runs, and stays well under what a phone gives
one tab. The spare boots and warms while the old worker keeps serving (about
4.4 s), and takes over only when nothing is running.
*Cost to change: one constant, `RECYCLE_BYTES` in `runner.js`.*

**23 — If .NET can't start, the page reloads itself once, then says why.**
The commonest cause is a deploy while the page was open: the old page asks for
`_framework/` files that no longer exist, and a reload fixes it. A mark in
`sessionStorage` allows one reload per tab, and a successful start clears
it. After that, the page shows one of five sentences, chosen by the kind of
failure (`docs/ENGINE_API.md`, "When C# can't start").
*Cost to change: low. The page can turn it off with
`reloadOnBootFailure: false`, as `check.html` does.*

**24 — Past 1,000,000 characters, output is hidden, and the program keeps
running.** The page shows one line saying so. The program ends as it would
have ended, and it can still be stopped, or it times out. Stopping it at the
limit would report `stopped` for a program the learner didn't stop, and the
cap exists to protect the page, not to judge the program.
*Cost to change: low. It is `RunContext.Write`.*

**25 — The checker records one outputs file per page, keyed by cell id, with
no timings.** A practice page gets its own file
(`<id>-practice.outputs.json`), since it is a page with its own cells. A
shared cell whose program differs by world (a world's class is above it) is
recorded once per world, as `<cell id>@<world>`. Only what a cell does is
recorded (its kind, outcome, output, diagnostics, frames and values), so the
file changes only when a cell's behaviour changes, and a diff in review shows
exactly that (`docs/PARSER.md`, "Recorded outputs").
*Cost to change: low before lessons exist; after that, every outputs file is
rewritten with `--write` in one change.*

**26 — When a dewlab cell becomes a types cell and a program cell, the
types cell keeps the dewlab id, and the program cell is `<id>-program`.**
So `your-turn-1--game` holds the class the reader changes, and
`your-turn-1-program--game` below it holds the program, with the `inputs`,
the hints and the solution. The solution writes the class again under its
statements (rule 4), so that "Compare with a solution" replaces the reader's
class with the solution's. The types cell holds the reader's own work, so it
keeps the key that work is saved under, and the drafts of
`keeping-details-inside-an-object` and `from-a-description-to-classes`
already use this shape (`docs/TRANSLATING.md`).
*Cost to change: nothing until a class has used the lessons. After that, a
renamed id loses the work saved under it.*

**27 — A task whose program uses something the reader has not written yet
starts out not compiling, and says so.** The program cell has `expect:
CS1061` (a method the class doesn't have yet) or `expect: CS0246` (a class
that doesn't exist yet), and the prose says that the message names what is
missing. The other choice was a stub, an empty method for the reader to
fill, which compiles from the start. The compiler's message is the style
guide's first feedback (`#the-compiler`), and it names the method to write.
The stub leaves the reader less to do.
*Cost to change: low. It is one cell per task.*

**28 — Cell ids that name Python are renamed, as decision 9 renamed lesson
ids.** `let-python-work-it-out-1` is `let-csharp-calculate-it-1`, and
`from-a-plan-to-python-1--<world>` is `from-a-plan-to-csharp-1--<world>`,
in `first-steps-practice`. Every other cell whose task is the same keeps its
dewlab id, even where its code changed.
*Cost to change: nothing until a class has used the lessons.*

**29 — A number the prose needs is printed by a cell.** Where dewlab said
"try `5 % 17` too" and gave the answer only in a fold, the C# cell prints
both lines, and its predict asks about the first one. So every number in a
fold is in the recorded outputs, with no hidden cell. This is the answer
the exemplars give to the course map's open question 7.
*Cost to change: low. It changes cells, not the format.*

**30 — A class meant to cause warnings goes last on its page.** Every cell
below a class compiles it, and shows its warnings (rule 2). So
`objects-and-classes-practice` moves "A constructor that stores nothing"
(dewlab's problem 2) to the end, and the cells above it stay free of its
two CS1717 warnings. A class that doesn't compile would stop every cell
below it, so a lesson never has one, except as its last cell.
*Cost to change: low. It is the order of problems on one page.*

**31 — Rule 5 is taught with a `Main` in a class called `Game`.** The
cell for rule 5 in `objects-and-classes` is `class Game` with `static void
Main()`, run on its own, and the prose says that the cells below can't use
it. This is how the course map reads its open question 14: the template's
`class Program` with `string[] args` is shown once, on
`the-tools-around-your-code`.
*Cost to change: one cell and its paragraph.*

**32 — A lesson names a page that isn't in `lessons/` yet by its short
title, in italics, and doesn't link to it.** *Variables and types*, not
`[Variables and types](lesson:storing-and-computing)`. The short title is
the part of the course map's title before the colon. A link to a page that
doesn't exist would reach the site broken (decision 39 now makes the build
refuse one), and decision 14 has a later batch add the links. Italics
let that batch find each one by its title, and the reader still learns
where the idea comes next. The other choice was to say
nothing about later pages, as the course map's rule for links alone would
allow, but dewlab's pages send the reader on, and the style guide asks for
"somewhere to go" (`docs/TRANSLATING.md`, checklist).
*Cost to change: low. A search for each short title in italics finds every
place to change.*

**33 — The editor, Markdown and KaTeX are esbuild bundles, committed in
`web/vendor/`.** Decision 19 left room for a bundler once the page needed
CodeMirror. `npm run vendor` bundles CodeMirror 6 (C# from
`@codemirror/legacy-modes`' `clike` mode, Python from `lang-python`),
markdown-it and KaTeX with esbuild, from entry points in
`tools/vendor-src/`, and copies KaTeX's and the reader's fonts. The output
is committed, so the site, the dev server and CI need no bundling step, and
`npm test` fails if a file is stale. The page's own code in `web/page/` is
never bundled: it is plain ES modules that import the bundles. The other
choice was to write the bundles at build time and ignore them in git, which
keeps about 1 MB out of the history but makes `npm run serve` depend on a
build.
*Cost to change: low. Add the three files to `.gitignore`, and call
`npm run vendor` from `npm run build` and before `npm run serve`.*

**34 — The reader's settings are dewlab's, under dewlab's key.** Every
page's `<head>` has dewlab's snippet (`dewlab/assets/shell.html`), which
reads `localStorage["dewlab:texture"]` before the first paint, and the
tokens in `web/page/style.css` are dewlab's. Both sites are served from
`deweydex.github.io`, so a theme, font, size, width, contrast or motion
setting made on one shows on the other. dewsharp's Settings panel offers
those six and writes only the keys it shows, so dewlab's other settings
(its cell buttons, indent, line numbers) survive a change made here. Like
dewlab, the page drops a stored link colour that is only dewlab's default,
since no one shade of orange is readable on both backgrounds.
*Cost to change: low. A key of dewsharp's own would separate the two
sites' settings; the snippet and `common.js` name it.*

**35 — Saved work is in IndexedDB, and a work file merges by date.** The
database `dewsharp` has two stores: `work`, one record per cell a learner
has touched, keyed `<page id>/<cell id>` (code, output capped at 20,000
characters, the guess, the hints shown, the lesson's version, `saved_at`),
and `notebooks`. The world chosen on a page, and the settings, are small
enough for `localStorage`. *Import my work* keeps whichever copy of a
record was saved later, so an old file never overwrites newer work, and
nothing is deleted by an import. The other choice was `localStorage` for
everything, as dewlab does; it is limited to about 5 MB for the whole
site, which a notebook with long outputs could reach.
*Cost to change: moderate once learners have saved work: a new store needs
a migration from this one (`web/page/store.js`).*

**36 — The page chooses a world for a lesson the reader has not opened
yet.** A lesson remembers its world (`dewsharp:world:<lesson id>`), and its
practice page shares the choice. A lesson opened for the first time starts
in the world the reader chose last on any page (`dewsharp:world`), if it
offers that world, and otherwise in its first world. FOOP builds one class
per world across many pages (decision 13), so a reader who chose the solar
system should not have to choose it again on every page.
*Cost to change: low. It is `chooseWorld` in `web/page/lesson.js`.*

**37 — A guess is compared with the output only to choose what the page
asks next, and the result is never shown.** A `number` guess is the same as
the last number the program printed, within `tolerance:`. A `choice` or
`text` guess is the same when it equals the whole output or one of its
lines, ignoring spaces. When they differ, or the reader chose *I'm not sure
yet*, the page asks "Which line explains what you saw?", and `after: guess
differed` hints count it. The page shows the guess and the output side by
side in both cases, with no mark (`docs/LESSON_FORMAT.md`, "predict").
*Cost to change: low. It is `guessMatches` in `web/page/lesson.js`.*

**38 — "Download project" writes a solution that builds as it is.** The
ZIP holds `<Name>.sln`, `<Name>/<Name>.csproj` with the compiler settings of
`docs/LESSON_FORMAT.md`, the program cell as its own file, one file for each
types cell above it that a later cell does not replace (rule 4), a
`README.txt`, and `IrishCulture.cs`, a `[ModuleInitializer]` that sets the
`en-IE` culture, since a project has no setting for it. Statements in cells
above are left out (rule 3), and so is the Console shim. The files are
stored without compression, so the page needs no ZIP library. The project
from the page tests builds with no warnings and prints what the page
printed (`dotnet run`, 27 September 2026). The other choice for the culture
was to leave it to the machine, but then `{12.5:C}` prints in another
currency on a lab PC set to another region.
*Cost to change: low. It is `web/page/project.js`.*

**39 — A course file lists its whole plan, and names the lessons not written
yet under `planned:`.** The course page shows a planned lesson in its place,
by the title the course map gives it, with *not written yet* and no link. So
a teacher sees the whole programme from the first day, and a learner sees
where a lesson sits. The site build and the checker refuse a course that
lists an id that is neither in `lessons/` nor under `planned:`, and a
`[text](lesson:<id>)` link to a page that isn't in `lessons/` (the gap that
decision 32 left to review by hand). The other choice was to list only the
lessons that exist and keep the plan in `planning/COURSE_MAP.md`; the course
pages would then show one lesson each until the drafts land, and a teacher
would have to read a planning file to see the course. Before this, the page
made a title from the id, which could not say what the lesson is about.
*Cost to change: low. Delete the `planned:` blocks and the ids they name
from `contents:`, and the course page shows only what exists.*

**40 — The checker compiles each challenge alone, and doesn't run it.** A
challenge opens in a new notebook, with no cells above it, so the checker
compiles it the same way, in check mode, and fails the build if it doesn't
compile. It is recorded under `challenges` in the page's outputs file.
Running it was the other choice, but a challenge is starter code: it may
wait for input, loop until the reader adds a way out, or print nothing yet,
and none of that is a fault. Before this, a challenge that didn't compile
would have reached the site unnoticed (the exemplars' report found this).
*Cost to change: low. It is one loop in `checkPage`, in
`tools/check-lessons.mjs`; running instead of checking would need a
`stdin:` for challenges that read input.*
