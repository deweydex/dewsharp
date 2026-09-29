# namespaces-and-libraries: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (FOOP
lesson 22: "new", shape tutorial, size M, worlds game, solar system and
your own, covers FOOP-LO4, FOOP-LO5 and FOOP-LO6, batch 10, depends on
`documenting-a-class`). No dewlab page teaches namespaces or class
libraries. The entry names two dewlab sources, and the page draws on both:

- `the-tools-around-your-code`, "Where a bigger project lives": a real
  project has several files, with a class in one file used from another.
  `from:` names it.
- `the-tools-around-your-code-practice`, problem 6, "A class in another
  file": a classmate's `Shape` in `shapes.py`, and the answer "the module's
  name, a dot, then the class's name". It became practice problem 3 here,
  with `Shapes.Circle`, and the practice page's `from:` names it.

The page also picks up three threads that earlier dewsharp pages left for
it: `compiler-errors` defined *namespace*, *using directive* and *assembly
reference* in a fold about CS0246; `the-tools-around-your-code` (and its
practice problem 5) told the reader to delete the `namespace` line Visual
Studio writes, "A later page ... is about them"; `a-front-end-for-a-class`
showed `namespace CaveWindow;` in `Form1.cs` and sends the reader here next.

Files:

- `lessons/namespaces-and-libraries/namespaces-and-libraries.md`: the
  tutorial, version 2026.09.29.1 (after the review). 17 `csharp exec`
  cells: 7 shared before the task (1 types cell, 6 program cells), 4 in the game, 4 in the solar
  system, 2 in your own, and 2 shared after the task. A reader sees 13 in
  the game or the solar system and 11 in their own world: size M. Two cells
  are meant not to compile (`expect: CS0246`, `expect: CS0104`), and the
  prose says so before each run or asks for a guess. 2 predicts, 3 hints, 2
  solutions (no `inputs`), 5 answer folds (4 before the review), 1 challenge,
  no pictures.
- `lessons/namespaces-and-libraries/namespaces-and-libraries-practice.md`:
  the practice page, version 2026.09.28.1. 9 problems (fix 2, predict 2,
  make 2, explain 3; problems 7 to 9 are from earlier pages), 8 exec cells
  (2 types cells, 5 program cells, 1 empty cell), 2 predicts, 5 hints, 5
  solutions (no `inputs`), 5 answer folds. No worlds, as in the exemplar
  `objects-and-classes-practice`.
- The two `.outputs.json` files, written by the browser checker.
- This file.

`npm run check-lessons -- namespaces-and-libraries` (both pages) reports no
problems: 26 runs on the tutorial, 12 on the practice page.

## What the page does, in order

1. **Opening** (no heading, as the exemplars do). A program that rolls
   three dice with `new Random(42)`, and a question before it runs: which
   names did you write? Four are the reader's; `Random`, `List`, `Math`,
   `Console`, `string` and their methods are somebody else's. *Seed*,
   *class library* and *namespace* are defined, and the page's two
   questions are set: how does a program find a class somebody else wrote,
   and how do other programs use yours?
2. **A type the compiler cannot find.** The number of orders of a pack of
   52 cards is too large for every whole-number type, so the page uses
   `BigInteger`. The cell is meant not to compile (CS0246), and the page
   quotes the message and points back to `compiler-errors`, where the same
   code came from `Int`. *Namespace*, *using directive* (also called a
   *using line*) are defined; the fixed program prints the 68-digit number,
   its digit count and the largest `long` (the largest `ulong` before the
   review). An invitation: move the using
   line to the end, and read the second message.
3. **The using lines you do not see.** The seven implicit usings, shown as
   code to read, in the `global using` form that .NET writes; `global`,
   namespaces inside namespaces, *implicit usings* and where Visual Studio
   keeps them. **Full names:** a predict on a cell that writes
   `System.Numerics.BigInteger` with no using line, with `Math.Pow(2, 100)`
   beside it; then the callback to the ``System.Collections.Generic.List`1[Character]``
   that `objects-and-classes` printed.
4. **A namespace of your own.** *Namespace line* and *global namespace*.
   A types cell with `namespace Maps;` and a `Path` class (with XML
   comments, so that the habit from `documenting-a-class` continues); a
   program that uses `Maps.Path` and prints `Maps.Path`, the full name; then
   a predict on the same program with `using Maps;`, which does not compile:
   CS0104, `'Path' is an ambiguous reference between 'Maps.Path' and
   'System.IO.Path'`. The two reasons for namespaces; three ways out (full
   name, another name, an alias); a solution with the alias.
5. **Your turn: your world in a namespace.** The seventh version of each
   world's classes, copied from the `your-class-8-so-far-*` cells of
   `a-front-end-for-a-class`, in three types cells, and a program that runs
   as given. The reader adds `namespace GameWorld;` (`SolarSystem;`) to each
   cell, meets CS0246 in the program, and adds the using line. A hint after
   two errors, a fold with one answer, and an invitation to delete the line
   from one file and see the message move into that file. The your-own
   world copies its classes from `a-front-end-for-a-class`.
6. **Reading the documentation.** The .NET API browser; the page for
   `DateTime`: its namespace, its assembly (*assembly* and *API* defined,
   and the *assembly reference* of CS0246 explained), its tables, .NET's
   names for types (`Int32`, `Double`, `String`) and *instance*. Three lines
   quoted from the tables; a program with Voyager 1's launch date; a task
   (days from the launch to interstellar space) that needs the table of
   operators and the page for `TimeSpan`, with a hint and a solution.
7. **A class library in Visual Studio.** *Project*, *solution*, *project
   reference*, *internal*, *inaccessible*. Six steps: download the world's
   program, add a Class Library, move the class files, build (CS0246 naming
   the namespace: the missing reference), add the project reference, build
   (CS0122: `internal`), add `public`, build and run. CS0060 for a public
   class built on an internal one; the `.dll` in `bin\Debug\net10.0`;
   nullable warnings; the third skills demonstration. **Libraries from
   other people:** *package*, NuGet, **Project** > **Manage NuGet
   Packages**, and why the page cannot add one.
8. **Closing.** A question (which one does a using line name, and which one
   a reference?), a `Stopwatch` challenge, the practice page, the next page,
   and four things to read.

## What I decided, and why

1. **`BigInteger` as the type outside the seven namespaces.** The map names
   `DateTime` or `Stopwatch` for the documentation, and says nothing about
   which type meets CS0246 first. `BigInteger` gives a reason to want a new
   type (a number that no type on `types-and-their-sizes` can hold), its
   output is fixed, and it is in `System.Numerics`, which is not one of the
   seven. `Stopwatch` prints a different time on every run, so the checker
   could not record it: it is the challenge, which the checker compiles and
   does not run (decision 40). `StringBuilder`, the example
   `compiler-errors` names, is practice problem 1.
2. **`DateTime` for the documentation.** It is in `System`, so the reading
   is about the page, not about a using line; its output is fixed when the
   date is; `from-a-description-to-classes-practice` and
   `two-names-one-object` already name it, the second as a struct. The
   three lines quoted from its tables (`DayOfWeek`, `AddDays`) and the one
   from the subtraction operator were fetched from Microsoft Learn on 28
   September 2026. The constructor is described, not quoted.
3. **The clash is `Maps.Path` against `System.IO.Path`.** A game has paths
   between rooms, and `System.IO` is one of the seven, so a reader who puts
   a `Path` in a namespace of their own meets this message for real. It
   gives the second reason for namespaces, and a reason for full names.
   `File`, `Timer` and `Task` were checked to give the same CS0104 (see
   "Probes"), so the page names them.
4. **The world task has a fold, not a solution.** A solution replaces only
   the program cell. To compile with the reader's classes still in the
   global namespace, it would have to bring all three classes, about 150
   lines with their comments, in a `namespace GameWorld { }` block after its
   statements. And even then C# would use the reader's global `Character`
   in the top-level statements, because a type in the global namespace
   comes before one from a using line, so the comparison would show
   nothing. The starting program runs, so its two lines are recorded, and
   the fold says that the finished program prints the same two lines.
5. **The task's program runs at first, rather than starting with
   `expect:`.** Decision 27 has a program start out not compiling when it
   uses something the reader has not written. Here the reader writes
   nothing new; the task is to move the classes and follow the compiler to
   the using line. Starting from a program that runs lets the reader meet
   CS0246 from their own edit, and then fix it, which is the order the page
   has taught. No types cell on the page ever fails to compile as given.
6. **The seventh version, without `Commands`, as the map says.** The page
   says so in one sentence, so that a reader who has just made the eighth
   on `a-front-end-for-a-class` is not puzzled. The classes are copied
   exactly (by script, from `your-class-8-so-far-*`), so a reader who
   compares the two pages sees the same code.
7. **File-scoped namespaces only.** Visual Studio's templates and
   Microsoft's page write `namespace X;`, and the tools page already showed
   `namespace ConsoleApp1;`. The block-scoped form, `namespace X { }`, is not
   shown anywhere on the page, so that a Level 5 reader meets one form. (See
   "Open", question 6.)
8. **The seven implicit usings are shown as `global using` lines.** That is
   exactly what .NET writes (the generated `GlobalUsings.g.cs`, checked with
   the SDK), and it explains why a using line in one file can reach every
   file. `global` gets one sentence.
9. **A using line stays in its file**, said in the task's fold and in
   practice problem 2, and not as a sixth rule of the road. Each cell is its
   own file (decision 16), so this is C#'s own rule, and the page says it in
   those words: "a using line works only in its own file, and each cell is a
   file of its own".
10. **Two predicts.** The full name (will it compile without a using line?)
    and the clash (will `using Maps;` let the program write `Path`?). Each
    asks about "the first line", and each has the real output, or "It does
    not compile", among its options. The opening program has no predict: its
    question is about reading the code, and its output is seeded dice.
11. **The Visual Studio part meets the three messages in turn**: CS0246
    naming the namespace (the reference), CS0122 (`internal`), and CS0060
    (a public class on an internal parent). The map asks for "CS0246 met on
    purpose when the reference is missing"; CS0122 is where FOOP-LO4's
    access modifiers meet the class library, and the practice page's
    problem 6 has a table of the four modifiers the course uses.
12. **Names.** `GameWorld` and `SolarSystem`, the names
    `your-world-playable` already uses for its library (its notes, open
    question 2, asked this page to choose; these are kept, so that the two
    pages agree).
13. **Links.** Every page named is in `lessons/`, so every mention is a
    link. No italics for pages not written.
14. **`var`** is used where the type is written on the right, as FOOP
    pages do from `the-moves-you-already-know`. `BigInteger orders = 1;`
    and `TimeSpan journey = ...` write the type, because the type is the
    point there.

## What I left out

- `using static` (Microsoft's page has it), `extern alias` and `global::`.
- Namespaces with dots in the reader's own code (`GameWorld.Items`), and
  Visual Studio's rule that a new file's namespace follows the project's
  name and folder ("Default namespace").
- `internal` in a cell. On the page every cell is one program, so a
  cell cannot show a class that another project cannot reach. It is met
  in Visual Studio, and in practice problem 6 as an explanation.
- `protected internal`, `private protected` and `file`: the practice
  table says "the four access modifiers of this course".
- A NuGet walk-through with a named package. A college network can block
  nuget.org, and the step list could not be checked here. The page names
  the menu and what a package is.
- Printing a type's assembly at run time. On the page (and in any .NET
  program) `typeof(Random).Assembly` is `System.Private.CoreLib`, where the
  documentation names the reference assembly, `System.Runtime.dll`. It
  would confuse the documentation section.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `You rolled 5, 1, 1. Your best is 5.` | `classes-you-did-not-write-1` |
| `Program.cs(1,1): error CS0246: ... 'BigInteger' ...` | `a-type-the-compiler-cannot-find-1` |
| 80658175170943878571660636856403766975289505440883277824000000000000, 68 digits, 9223372036854775807 | `a-type-the-compiler-cannot-find-2` |
| CS0246 then CS1529 when the using line is moved to the end (the fold) | probe P1, and the review's scratch lesson |
| 1267650600228229401496703205376 and `1.2676506002282294E+30` (predict options, prose) | `full-names-1` |
| ``System.Collections.Generic.List`1[Character]`` | `printing-an-object-2-program` on `objects-and-classes` (its prose quotes it) |
| `Maps.Path`, `the cave to the river` | `a-namespace-of-your-own-1-program` |
| `Program.cs(3,1): error CS0104: ...` | `a-namespace-of-your-own-2` |
| `the cave to the river` after the alias | the solution of `a-namespace-of-your-own-2` |
| `Ada (health 8)`, `Cave: 2 standing`; `110`, `Voyager` | `your-world-in-a-namespace-1-program--game`, `--solar-system` |
| three CS0246 messages, the first for `Character` (`Probe`); the finished program prints the same lines; with one file left out, the first message is in `Healer.cs` (`Lander.cs`) and cannot find `Character` (`Probe`) | probes P3 and P4, and the page itself in headless Chromium (see "How it was checked") |
| `Monday 5 September 1977`, `Monday`, `Wednesday 14 December 1977` | `reading-the-documentation-1` |
| 12773 | the solution of `reading-the-documentation-2` |
| CS0246 naming `GameWorld` (`SolarSystem`) on line 1, CS0122 for `Character` (`Probe`), CS0060, `GameWorld.dll` in `bin\Debug\net10.0`, no nullable warnings | the command-line build (see "How it was checked") |
| Practice: `Io Europa Ganymede Callisto` | the solution of `a-line-built-piece-by-piece-1` |
| Practice: the 68-digit option, and CS0246 for `BigInteger` | `a-using-line-in-a-cell-above-1-program` and its solution |
| Practice: `Console.WriteLine(Cards.Orders(52));` compiles with no using line | probe P6 |
| Practice: 12.566370614359172 | the solution of `a-class-in-another-file-1-program` |
| Practice: the five reward days | the solution of `a-reward-every-thirty-days-1` |
| Practice: `Monday 5 September 1977`, and no warning | `a-date-that-does-not-change-1` (no diagnostics recorded) |
| Practice: CS0246 for `Int` and for `Stopwatch`; `5` | `one-code-two-reasons-1` and its solution |
| Practice: `Program.cs(3,15): error CS0122: 'Character' is inaccessible due to its protection level` | the command-line build of the downloaded project |

## How it was checked

- **The browser checker**, `npm run check-lessons -- --write
  namespaces-and-libraries`, then without `--write`: no problems.
- **The page in headless Chromium** (`tests/page/helpers.mjs`, the real
  `lessons/`), in each world and on the practice page: no page errors;
  every link answers 200; KaTeX draws the one formula; every class cell is
  labelled *types* with its file (`Path.cs`, `Character.cs` ...), every
  program cell *program*, and the your-own cells *empty*. The task was then
  done by hand in the game and the solar system: the program ran; with the
  three namespace lines it showed exactly three CS0246 messages, for
  `Character`, `Healer` and `Room` (`Probe`, `Lander`, `Mission`); with the
  using line it printed the recorded two lines; with the line deleted from
  `Healer.cs` (`Lander.cs`) the first message was
  `Healer.cs(2,16): error CS0246: ... 'Character' ...`
  (`Lander.cs(4,16)`, `'Probe'`), and `reading-the-documentation-1` below
  it did not compile either, as the page warns.
- **Download project** on the game's program, after the task: the ZIP holds
  `Program.cs`, `Path.cs`, `Character.cs`, `Healer.cs`, `Room.cs`,
  `IrishCulture.cs`, the `.csproj`, the `.sln` and `README.txt`, as step 1
  says.
- **The Visual Studio steps, with the .NET 10 SDK's command line**
  (10.0.401), not Visual Studio, on that downloaded project: it built with
  0 warnings and printed the two lines; with a `classlib` project
  `GameWorld` (the .NET 10 template, `Nullable` enabled) holding the three
  files, the console app gave one error,
  `Program.cs(1,7): error CS0246: The type or namespace name 'GameWorld' could not be found`;
  with the project reference, CS0122 for `Character`, `Healer`, `Room` and
  their methods; with `public` on each class, 0 warnings and the same two
  lines, and `GameWorld.dll` beside the program in `bin/Debug/net10.0`. The
  same for the solar system (`SolarSystem`, CS0122 for `Probe` first, `110`
  and `Voyager`). With `Healer` and `Room` public and `Character` not, the
  library gave CS0060 and CS0051. The generated
  `obj/Debug/net10.0/<name>.GlobalUsings.g.cs` holds exactly the seven
  `global using` lines the page shows.
- **Where to read more.** Each address was fetched. The namespaces page's
  address is its canonical one (`fundamentals/program-structure/namespaces`;
  the old `fundamentals/types/namespaces` redirects there), and its title is
  *Namespaces and using directives*. The class library tutorial's steps
  (**Add** > **New Project**, **Dependencies** > **Add Project Reference**,
  **Set as StartUp Project**) match the page's. The NuGet quickstart uses
  **Project** > **Manage NuGet Packages**.

## Probes

Run in the browser engine from scratch lessons
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`).

- **P1.** `using` after a statement: CS0246 first, then CS1529, *A using
  clause must precede all other elements ...*. (The page's invitation to
  move the using line to the end; the page asks, and does not quote.)
- **P2.** `typeof(Console).Namespace` is `Dewsharp.Page` on the page, and
  `typeof(Console).FullName` is `Dewsharp.Page.Console`, where Visual
  Studio gives `System` and `System.Console` (decision 8's shim). The page
  never prints either; `typeof(Random).Namespace` and the others are
  `System`, `System.Collections.Generic` and `System.Text` as expected.
- **P3.** The seventh version of each world in every state of the task, each
  state on a page of its own: only `Character` namespaced (Healer.cs and
  Room.cs fail, 5 and 4 errors, then the program's own); all three and no
  using line (three CS0246, one per class); all three and the using line
  (runs, same two lines). The same for the solar system.
- **P4.** All three namespaced but `Healer` (`Lander`), with the using line:
  the first message is in `Healer.cs` (`Lander.cs`), CS0246 for `Character`
  (`Probe`), then CS1503 in the program.
- **P5.** `Clocks.Timer`, `Todo.Task` and `Papers.File` with a using line
  each give CS0104 against `System.Threading.Timer`,
  `System.Threading.Tasks.Task` and `System.IO.File`. `using Maps;` with
  `Path.GetExtension("notes.txt")` is CS0104 too. The alias
  `using Path = Maps.Path;` compiles.
- **P6.** A types cell with `using System.Numerics;` does not give the
  program below it the name `BigInteger` (CS0246); `Console.WriteLine(
  Cards.Orders(52));` and `var orders = Cards.Orders(10);` compile without
  it.
- **P7.** `launch.AddDays(1);` alone compiles with no warning, and `launch`
  is unchanged.
- **P8.** When a world's classes stay in their cells above and namespaced
  copies of them are added in cells below (instead of editing the cells),
  the program with no using line still runs: the global `Character` from
  the cell above is still there, since a class written again replaces the
  earlier one only when its namespace and name both match (decision 16).
  The page's task edits the cells themselves, so a reader does not meet
  this; a teacher who adds copies lower on a page would.

## For other pages (not done here: the brief allows only these files)

- `courses/foop.yaml`: the `planned:` line for `namespaces-and-libraries`
  can go now that the page is in `lessons/`.
- Pages that name this one in italics (decision 32) can now link to it:
  `the-tools-around-your-code` ("A later page, *Namespaces and class
  libraries*", step 3 of "A class in a file of its own"), its practice page
  (problem 5's fold), `a-front-end-for-a-class` (two places: the `Form1.cs`
  notes and "Next"), and `your-world-playable` ("What you have").
- `your-world-playable`, "Your world in Visual Studio", defines *class
  library*, *namespace*, *project* and *solution* as if for the first time,
  and repeats the library steps with the eighth version and a test project.
  It could now point back to this page for the definitions and for the
  three messages, and keep its steps. Its steps and names agree with this
  page's (`GameWorld`, `SolarSystem`, the same menus, CS0246 with the using
  line and no reference).
- `your-world-playable`'s "Where to read more" gives the class library
  tutorial as `create-class-library?pivots=vs`. The page's pivot is called
  `visualstudio`, so `pivots=vs` probably selects nothing; Visual Studio is
  the page's first pivot, so the reader still sees it. This page gives the
  address with no pivot.

## Open

Questions only Josh can settle.

1. **Two Visual Studio walk-throughs of a class library.** This page moves
   the seventh version into a library, meeting CS0246, CS0122 and CS0060;
   `your-world-playable` does it again with the eighth version and a test
   project. Keep both (this one first, smaller, about the messages), or
   shorten one to point at the other?
2. **Seventh or eighth version.** The map says this page uses the seventh
   version and leaves the chain alone, so the task has no `Commands`, one
   page after the reader made it. Should the task use the eighth version,
   so that the library built here is the one `your-world-playable` needs?
3. **No "Compare with a solution" on the world task** (decision 4 above).
   Is a fold enough, or should the task change shape so that a solution can
   work (for example, a small new class written in the namespace by the
   reader, with the seventh version untouched)?
4. **`BigInteger` and 52!** as the first type outside the seven. Is a
   68-digit number a good hook for your learners, or would a plainer type
   (`StringBuilder`, which `compiler-errors` names) serve better?
5. **The alias** (`using Path = Maps.Path;`). It is Microsoft's own answer
   to a clash, and it is in the solution. Is it one idea too many at Level
   5, beside the full name and a new class name?
6. **Block-scoped namespaces** (`namespace Maps { ... }`) are not shown.
   Visual Studio's templates write the file-scoped form, but older books,
   Microsoft's `Stopwatch` example and many answers online use braces.
   Show it once, as code to read?
7. **Reading the real documentation.** Microsoft's lines use words such as
   *instance*, *represented*, *specified* and *initializes*, in English
   only. The page explains *instance* and quotes three lines. Is that
   enough for a reader in their second language, or should the page give a
   short list of the documentation's common words?
8. **Packages.** The descriptor's "class libraries and packages" gets one
   paragraph and the menu name, not a walk-through with a named package.
   Can your labs reach nuget.org, and do you want the steps?
9. **Visual Studio, for real.** The steps were checked with the .NET
   command line, not Visual Studio. To check once on a college PC: the menu
   names (**Add** > **New Project**, **Add** > **Existing Item**,
   **Dependencies** > **Add Project Reference**, **Set as Startup
   Project**, **Project** > **Manage NuGet Packages**), that the Error List
   shows one CS0246 naming the namespace before the reference is added, and
   where Visual Studio keeps `<name>.GlobalUsings.g.cs`.

## Review

A second agent read both pages on 29 September 2026, once as a Level 5
learner who knows only the pages before this one, once as a teacher, and
then against the checklists in `docs/TRANSLATING.md` and
`planning/PEDAGOGICAL_STYLE_GUIDE.md#checklist`. The page does what its
course-map entry asks, in the entry's order, and the world classes are
exact copies of `your-class-8-so-far-*` on `a-front-end-for-a-class`
(checked by script). No verdict words, no American spellings. Every number
and message in the prose matches the outputs files.

### What changed

The tutorial's version is now 2026.09.29.1, because one cell changed; its
outputs were recorded again with `--write`. The practice page changed in
prose only, so it keeps 2026.09.28.1.

1. **`a-type-the-compiler-cannot-find-2` prints the largest `long`, not
   the largest `ulong`.** The prose called `ulong` "the largest
   whole-number type on that page", but the table on `types-and-their-sizes`
   ends at `long`, and that page names `ulong` once and says "This course
   does not use them". The line is now `The largest long:
   9223372036854775807`, from the recorded output, and the prose says "the
   largest type in the table on that page".
2. **The opening question** asked "Which of the names in it did you write",
   but the reader wrote none of them. It now asks which names the program
   makes for itself, and which ones somebody else wrote, as the answer
   paragraph already did.
3. **"Each cell is a file of its own"** is now said where a using line is
   defined. Before, the lesson relied on it (the task's fold: "works in the
   program's file only") and only the practice page said it.
4. **A fold for the using line moved to the end.** The page asked "Which
   message comes first, and what does the second one say?" and gave no
   answer; the second message is CS1529, whose English (*A using clause
   must precede all other elements ...*) is hard for a reader in their
   second language. The fold names both messages and glosses *precede*.
   Checked in a scratch lesson in the browser engine: CS0246 at (1,1), then
   CS1529 on the last line.
5. **A definition of *reference*** where the documentation section first
   uses it ("a program can use a type only if it has a reference to the
   assembly"). The Visual Studio part used it later without one; it now
   uses the defined word, not in italics.
6. **Glosses for Microsoft's words.** *Represented by this instance* and
   *the specified number* each get a plain meaning under the three quoted
   lines (open question 7 asked about this; this is the smallest help).
7. **Namespace bullet**: "That is the using line a program needs" became
   the line itself, `using System;`, or the full name `System.DateTime`.
8. **The second reason for namespaces** was one sentence whose "this"
   pointed forward ("Namespaces put types in groups by what they are for,
   and this is the other reason that they exist"). It is now three short
   sentences that name both reasons. The sentence on `File`, `Timer` and
   `Task` now says when the clash comes: a class in a namespace, with a
   using line. A class `Path` in the global namespace does not clash: in the
   review's scratch lesson it compiled and ran, with `System.IO` among the
   seven.
9. **The alias** is defined as "a second name for one type", not only
   named.
10. **Visual Studio part:**
    - Step 2 warns against **Class Library (.NET Framework)**, as
      `a-front-end-for-a-class` warns against the older Windows Forms
      template. Searching `library` shows both.
    - "The Error List has one message" became "The first message in the
      Error List is CS0246 ... More messages can follow it, one for each
      class that the program uses: read the first one first." `dotnet
      build` gives one message, because the command-line compiler stops
      after an error in a using line. The page's engine does not stop
      there: in the scratch lesson, `using GameWorld;` with no
      `GameWorld` gave CS0246 for `GameWorld` and again for `Character`.
      Visual Studio's Error List shows **Build + IntelliSense** by default,
      and IntelliSense reports all messages, as the page does. So the
      number of messages depends on the Error List's filter, and the page
      no longer states it.
    - CS0060 says "its parent class" (the course's word, from
      `one-parent-many-children`) in place of "the class it is built on",
      and gives the solar system's pair too. Checked with the .NET 10
      SDK: a public `Lander` on an internal `Probe` is CS0060.
    - NuGet: **Browse** tab added. The package manager can open on
      **Installed**, where a search finds nothing new.
11. **Smaller wording:** "later on this page" became "further down this
    page" (the rules of the road's words); "a great many" became "very
    many"; "Then why did" became "Why did"; "as on *Two names, one object*"
    became "as *Two names, one object* said"; the your-own task asks which
    message the compiler gives, not what "the program says"; "Looking
    back" asks about "the classes in the library", not `Character`, which
    the solar system does not have.
12. **Practice problem 7:** "the second line keeps it nowhere, so it is
    gone" became "does not store it anywhere, so it is lost".

The notes above were brought up to date where these changes made them
stale: the tutorial's version, the number of folds, the `long` line, and
the table of sources.

### Checked and left as it was

- The predicts on `a-namespace-of-your-own-2` and
  `a-using-line-in-a-cell-above-1-program` have *It does not compile* as an
  option, with no warning before the run, which is the pattern of
  `a-total-that-starts-again` and others. The predict is the warning.
- The command-line claims of the Visual Studio part, again with the .NET
  10 SDK (10.0.401): one CS0246 naming the namespace, then CS0122 for
  `Character`, `Healer` and `HealOther` once the reference is added, then
  CS0060 and CS0051 with `Healer` public and `Character` internal, then a
  build with no errors and `GameWorld.dll` in `bin/Debug/net10.0`.
- **Add** > **New Project** (with `>`) is kept. `a-front-end-for-a-class`
  writes "**Add**, then **Existing Item**", but `testing-what-a-class-does`
  and `your-world-playable`, the next page, write `>`, and this page should
  agree with the page that repeats its steps.

### Still open for Josh

The nine questions under "Open" stand. The review's view on each, for
what it is worth:

1. **Two walk-throughs:** keep both. This one is about three messages,
   and `your-world-playable` could point back to it for the definitions
   and the messages (a change for that page, not made here).
2. **Seventh or eighth version:** the seventh, as the map says. The page
   explains the missing `Commands` in one sentence.
3. **Fold, not a solution:** the fold is enough. The writer's reason holds:
   a solution would run against the reader's global classes and show
   nothing.
4. **`BigInteger`:** a good hook. It needs no new maths beyond
   multiplication, and 68 digits against the 19 of a `long` makes the
   point.
5. **The alias:** it is in the invitation and the solution only, and now
   has a definition. Keep it, or cut the invitation's third way and the
   solution with it.
6. **Block-scoped namespaces:** still not shown. Microsoft's `Stopwatch`
   page, which the challenge sends the reader to, has examples in that
   form, so a short "code to read" with braces could help there.
7. **Documentation English:** two glosses added (above). A short list of
   the documentation's common words (*instance*, *specified*,
   *represented*, *initializes*, *gets or sets*) is still a choice for
   Josh.
8. **Packages:** unchanged.
9. **Visual Studio, for real:** still to check on a college PC, now with
   one more point: how many messages the Error List shows before the
   reference is added, with its filter on **Build + IntelliSense** and on
   **Build Only**. The page says only which one comes first.

One new question:

10. **The page and `dotnet build` differ after an error in a using line.**
    The page's engine reports every message (as IntelliSense does), and
    `dotnet build` stops after the using line's error. With the using line
    moved to the end of `a-type-the-compiler-cannot-find-2`, the page shows
    CS0246 and CS1529, and the downloaded project, built, shows CS1529
    only. The fold describes the page, where the reader tries it. Is that
    difference worth a sentence, or a line in `docs/ENGINE_API.md`?
