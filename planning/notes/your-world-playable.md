# Notes: your-world-playable

Ported from dewlab `tutorials/your-world-playable/` (the tutorial and its
glossary file, version 2026.09.26.1; the page has no practice page, and
its glossary has no entries) on 27 September 2026, as a draft in
`drafts/lessons/your-world-playable/`. Moved into
`lessons/your-world-playable/` on 28 September 2026, checked in the
browser engine, and revised; the page is now version 2026.09.28.1.
Written against dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to entry 40), and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 23, batch 11, "adapt", shape
series-end task, size M, worlds game, solar system and your own, covers
FOOP-LO6, FOOP-LO7, FOOP-LO10, FOOP-LO11). The class chain continues from
`testing-what-a-class-does` (the tests, and `Test`) and
`a-front-end-for-a-class` (the eighth version), both in `lessons/`.

Files:

- `lessons/your-world-playable/your-world-playable.md`: the page. 19
  `csharp exec` cells: 2 shared (`Test`, and the blank
  `making-it-yours-1`), 7 in the game world, 7 in the solar system, 3 in
  your own. A reader in the game or the solar system sees 9 cells; in
  their own world, 5. 4 predicts (two in each of the two worlds, so a
  reader there meets two), 2 hints, 2 solutions (no `inputs`), 1 answer
  fold, 6 fences of code to read, no challenge.
- `lessons/your-world-playable/your-world-playable.outputs.json`, written
  by `npm run check-lessons -- --write your-world-playable`.

The page has no practice page, as in dewlab: the course map gives
series-end tasks none.

## How it was checked

- **The browser checker** (`npm run check-lessons -- your-world-playable`):
  17 runs. Every cell compiles with no warning, so no warning travels down
  the page (`DECISIONS.md` 30). No cell is meant to fail, so none has
  `expect:`. It reported the link to `mixed-programming-with-objects`
  until that page, moved in the same batch, reached `lessons/`; the last
  run, without `--write`, reports no problems.
- **The draft in the browser.** Before any change, the draft's cells were
  run with `--write`. Every output was the same as the native checker's,
  except that the browser shows each typed command after its prompt
  (`What now? look`), as a console does. The prose quoted no line of the
  games, so nothing in it had to change for that.
- **The class chain, by script** (`web/lesson/parse.js` from Node).
  `Character`, `Healer`, `Room`, `Probe`, `Lander` and `Mission` are
  identical to the `your-class-8-so-far-*` cells of
  `a-front-end-for-a-class`. `Test` is identical to
  `ten-lines-that-run-every-test-runner` in `testing-what-a-class-does`,
  and the two test programs to the solutions of
  `your-class-6-tests--<world>` there. The draft's two `Commands` had the
  same code as the solutions of `your-class-8-program--<world>` on
  `a-front-end-for-a-class`, but other XML comments and one other `//`
  comment, because that page was not written when the draft was. They
  are now exact copies, and so is the `Commands` in the game's solution,
  plus the new rule and its sentence.
- **Probes in the browser** (below): the capital letters, the end of the
  input, and the two new rules against the five tests.
- **The page itself**, in headless Chromium, in each world
  (`lesson.html?sw=off&id=your-world-playable`): no page errors; the
  kinds are `types` for the class cells (with `Test.cs`, `Character.cs`
  and so on), `program` for the three program cells, and `empty` for the
  blank ones; no XML tag in a cell or in the prose became an HTML
  element. The game's front end, run with `Attack` typed and then
  **End input**, printed `Not a command: Attack`, then `What now?` and
  `Goodbye.`.
- **Download project** on `your-world-front-end--game` and
  `--solar-system`, clicked in the page: the ZIP holds `Program.cs`,
  `Test.cs`, the world's three classes, `Commands.cs`, `IrishCulture.cs`,
  the `.csproj`, the `.sln` and `README.txt`, as "The program, as a
  project" says. The names are `YourWorldPlayableYourWorldFrontEndGame`
  and `YourWorldPlayableYourWorldFrontEndSolarSystem` (`projectName` in
  `web/page/project.js`).
- **The Visual Studio section**, with the .NET 10 SDK's command line
  (10.0.401), not Visual Studio (nothing here runs Windows), for both
  worlds. The downloaded project builds with 0 warnings and plays the
  recorded game. A `classlib` project (`GameWorld`, `SolarSystem`: .NET
  10, `Nullable` enabled) with the class files moved in, `namespace` and
  `public` added: 0 warnings. The console app then gives, for the game,
  `Program.cs(1,15): error CS0246: The type or namespace name 'Character'
  could not be found (are you missing a using directive or an assembly
  reference?)`, CS0246 for `Healer` and `Character`, and `error CS0103:
  The name 'Commands' does not exist in the current context`; for the
  solar system, CS0246 for `Lander` and CS0103 for `Commands`. With the
  `using` line and no reference: one error, CS0246 naming the namespace.
  With the reference and no `using` line: the same errors as with
  neither. With both: 0 warnings, and the same game. An `mstest` project
  (the .NET 10 template: MSTest 4.0.2, `Nullable` enabled, a `Test1.cs`
  in `namespace <Name>.Tests`) with the five tests as `[TestMethod]`s and
  no `using` line: 5 passed, 0 warnings. `Assert.AreEqual(true, ...)`
  gives `warning MSTEST0037: Use 'Assert.IsTrue' instead of
  'Assert.AreEqual'`. `dotnet publish` wrote a folder with the program
  and `GameWorld.dll` (`SolarSystem.dll`), and the published program
  played.
- **Where to read more.** Each address was fetched. The draft's three
  tutorial addresses now redirect; the page gives the addresses they
  redirect to, and each title is the page's own `<h1>`. Microsoft's OOP
  tutorial does continue its introduction to classes, which is the
  tutorial `objects-and-classes` lists, and its test tutorial uses MSTest.

## What changed in the move to `lessons/`

- **Version** 2026.09.27.1 to 2026.09.28.1: four cells changed.
- **`Commands`**, in both worlds and in the game's solution: the exact
  eighth version from `a-front-end-for-a-class` (above). Only comments
  changed; the outputs did not.
- **The two front ends** gain the `if (choice == null)` that
  `a-front-end-for-a-class` teaches in "A loop that asks". Without it,
  **End input** on the page gives `RunChoice` a `null`, which is not a
  command, and the loop asks again with no end. `bool stillPlaying =
  true;` and `} while (stillPlaying);` now match that page's loop, which
  is also how Visual Studio lays out a `do`...`while`.
- **A predict on each world's test program**: what the first line prints.
  The refusal that `Heal` (or `Burn`) prints inside a passing test is the
  guess worth making, and the paragraph after it says why a printed
  refusal is not a failed test. See question 3.
- **Links** (question 1): every mention of a page in `lessons/` is a
  link, as the other pages there do; *Interfaces* and *Namespaces and
  class libraries*, not written yet, are in italics (`DECISIONS.md` 32);
  *Mixed problems* became a link, because it moves in the same batch.
- **"What you have", item 9** now names both front ends of
  `a-front-end-for-a-class`, the loop and the numbered menu, as that page
  makes them. The three tool pages "add" tools, since two of them are
  not written yet. The your-own world asks for classes and `Commands` in
  the first cell, and a front end that may be the reader's menu.
- **The Visual Studio section.** It now opens with the line the other
  pages use for a Visual Studio part ("Everything above this part runs
  here..."). The solution's tree no longer calls the console app
  `GameWorld.Play`: the reader's console app is the downloaded project,
  whose name the page gives (`YourWorldPlayableYourWorldFrontEndGame`).
  *Class library*, *namespace* and *project reference* are defined where
  they first appear, since *Namespaces and class libraries* is not
  written. The class library step chooses .NET 10, as
  `a-front-end-for-a-class` does. The fold covers the solar system's
  messages too. A sentence says why the test file needs no `using` line.
  The nullable paragraph points back to the explanation on
  `the-tools-around-your-code`.
- **Where to read more**: the current addresses, and a link for
  *Classes and objects*.
- Small wording: "on the way" (an idiom) went; the first paragraph after
  the worlds says "the one on this page", since a reader in their own
  world sees no other.

## What changed from the Python page, and why

This is the porter's account, kept for the reasoning, and brought up to
date where the move changed it.

**Frontmatter.** `year:` goes. The per-section `covers:` becomes one
list, the course map's. The title says "course" where dewlab's said
"series", as the course map's title does: the class chain runs across two
series here ("Classes and objects" and "Classes working together"). The
worlds are the game, the solar system and your own. The ocean goes
(`DECISIONS.md` 13). dewlab's glossary file is empty.

**What you have.** dewlab's nine pages, in C#: the constructor and
`ToString` for `__init__` and `__str__`; a private field behind a
property for "a private field with a getter"; a static field for "a
class attribute"; XML comments with examples that a program checks for
docstrings and doctest; `RunChoice`, tested with an array, and two front
ends, for dewlab's `run_choice`, "tested with a list, and a menu to play
from". A new paragraph names the three FOOP pages that add tools and no
version, because the course map says "What you have" lists the C#
pages, and two of them are used in the second half.

**Your world, running.** dewlab had three cells per world: all the
classes, the tests and the runner in one (with `{{include:}}`), a cell
that starts a new game, and a cell with a `dropdown` that plays one turn
each time it is run, using the variables of the cell above.

- The classes go into types cells, one class each, with `file:`, as the
  course map asks. So "Download project" gives one file per class, which
  is what the Visual Studio section moves into a library. The types cell
  holding the first class keeps dewlab's id (`your-world-running--<world>`,
  `DECISIONS.md` 26); the others are `your-world-running-<class>--<world>`.
- `run_tests()` over `globals()` becomes `Test.RunAll` with a
  `List<Action>`, from `testing-what-a-class-does`. `Test` is the same in
  every world, so it is one shared types cell above the worlds.
- The tests are a program cell, `your-world-running-program--<world>`
  (decision 26's `<id>-program`).
- dewlab's new-game cell and front-end cell become one program,
  `your-world-front-end--<world>`: it makes the objects, and then a
  `do`...`while` loop reads a command with `Console.ReadLine()` and calls
  `Commands.RunChoice`, until `quit`. Rule 3 (variables stay in their
  cell) makes this necessary, and the course map's principles ("a game
  started in one cell and played in another ... becomes one program,
  usually a loop that reads input") say how. So the ids
  `your-world-new-game--<world>` are gone. `stdin:` gives the checker a
  game of six commands, one of them not a command (`dance`, `orbit`).
- The question under each world's game asks what `Attack` or `Burn`, with
  a capital letter, does. `a-front-end-for-a-class` asks the same, and its
  challenge makes the front end accept it; here it is a reminder, before
  "Show it to somebody" asks what a stranger typed. The page leaves the
  answer to the run (probes P1 and P4).

**Your world in Visual Studio** is new. The course map asks for it: the
world as one solution, with a class library, a console app that uses it,
and a test project, "the shape of FOOP's third skills demonstration",
plus a Windows Forms app "for readers who want one". It starts from
"Download project", because that project already holds one file per
class; the reader then adds a library, moves the classes into it, meets
CS0246, adds the reference and the `using` line, adds an MSTest project
as `testing-what-a-class-does` did, and publishes as
`a-front-end-for-a-class` did. The code to read is at column 0 between
short numbered lists, not inside a list item: the parser takes a fence
indented up to three spaces as a block of its own, which would break the
list. A window gets one sentence: `a-front-end-for-a-class` builds it,
and this page only says where it fits.

**Making it yours.** dewlab's paragraph, its ideas in each world and its
blank cell stay (`making-it-yours-1`). The order changes to the course
map's: a test first, then the rule, its XML comment and a command. The
worked first step is new: in the game and the solar system, a test for a
rule the world is missing, run before the rule exists, with a predict on
its last line, a hint, and a solution that writes the class again below
(rule 4, `DECISIONS.md` 26). The two rules are real gaps in the chain: a
hero who is down can still attack (nothing in `RunChoice` asks), and
`Refuel` accepts a negative number of kilograms (dewlab's
`solar-system-8.py` has the same gap). The ideas lose `super()`: the
game's monster that fights back becomes a child class that `RunChoice`
asks how hard it hits, and the solar system's `Orbiter` asks which method
of `Probe` must be `virtual` first (`Burn` is not virtual in the chain;
only `CanBurn` and `TankSize` are). "Show it to somebody" gains the
published program.

**Looking back.** dewlab's four questions stay. "There are no right
answers to them" and "put in the right place" used a word the style
guide bans; they are now "there is no answer to find on a page" and
"hardest to find a place for". "Where did they get stuck?" is now "Where
did they stop, unsure what to do next?". The line about the Notebook
becomes one about Visual Studio, where the world now is.

**The end of the page.** No practice page and no challenge, as in
dewlab: a series-end task is its own challenge. The next page is linked.
**Where to read more** replaces Sweigart's Python games book and the
Python tutorial with Microsoft's three tutorials that match the Visual
Studio section (a class library, testing it, publishing) and Microsoft's
object-oriented programming tutorial.

## What C# made different, in short

- A method must be in a class, so `RunChoice` lives in
  `static class Commands`, in a types cell of its own.
- Each Run is a new program, so the game cannot be started in one cell
  and played in another: one program, with a loop that reads real input.
- Classes live in types cells, one per class with `file:`, which makes
  "Download project" give the files the Visual Studio section needs.
- A test runner cannot find tests by name, so the tests are a
  `List<Action>` for `Test.RunAll`, and MSTest's `[TestMethod]` in Visual
  Studio.
- A class needs `public` to be used from another project, and a
  namespace needs `using` or the build fails with CS0246: both are
  compiler messages the reader meets on purpose.

## The eighth version

The draft had to guess the eighth version, because
`a-front-end-for-a-class` was not written. That page is now in
`lessons/`, and it makes the same `static class Commands`, with
`RunChoice(Character hero, Healer healer, Character monster, string
choice)` and `RunChoice(Probe probe, string choice)`, the same commands,
amounts and messages. This page now copies its comments too. The
draft's two worries about it are settled there: a window shows what
`RunChoice` prints by sending `Console` into a `StringWriter`
(`Console.SetOut`), and `RunChoice` is `static`, called as
`Commands.RunChoice(...)`.

## The porter's questions

The numbers are the porter's. Questions 4 and 8 are under "Open".

### Decided

1. **Links or italics.** Settled by `DECISIONS.md` 32 and 39 and by this
   batch's list of pages: a link to each page in `lessons/`, and to
   `mixed-programming-with-objects`, which moves in the same batch; the
   short title in italics for *Interfaces* (`many-classes-one-promise`)
   and *Namespaces and class libraries* (`namespaces-and-libraries`).
   Every later mention of a page in `lessons/` is a link too, as on
   `documenting-a-class` and `a-front-end-for-a-class`, so that italics
   mean only "not written yet" and a later batch can find them.
2. **The worked first step.** Kept. The course map's entry asks for "a
   test first, then the rule, the XML comment and the command", and the
   style guide asks for a first step anyone can take and for "worked,
   then completed, then your own".
3. **One predict for each reader.** The style guide asks for two or
   three. Each world's test program now has one on its first line (the
   refusal printed inside a passing test), so a reader in the game or
   the solar system meets two. The question about capital letters stays
   in the prose, since its answer is the same as on
   `a-front-end-for-a-class`.
5. **`Commands.RunChoice`, static.** Settled by
   `a-front-end-for-a-class`, which makes exactly this class (see "The
   eighth version").
6. **Naming the assessment.** Kept, reworded as `documenting-a-class`
   did: "The third skills demonstration in this module, one of its
   assessed projects, asks for this shape". The course map's teacher
   notes say "Skills demonstration 3 (30%: inheritance, a class library,
   a front end) fits after `your-world-playable`, which builds exactly
   that shape", and its entry for this page says the same.
7. **The Visual Studio section is long.** Kept. It now opens with the
   line that `testing-what-a-class-does` and `a-front-end-for-a-class`
   use at the start of a Visual Studio part, which names it a good place
   to stop, so a class can take it as a second session.

Also decided in the move:

- **The front end is the loop, not the numbered menu.** The eighth
  version on `a-front-end-for-a-class` ends with a numbered menu, and
  dewlab's page played from a menu. This page keeps the porter's loop
  that reads a command: that page teaches it too ("A loop that asks"),
  the course map asks only for "a console front end with real input",
  and "Show it to somebody" asks what a stranger typed that nobody
  planned for, which a player who types words meets at once. The
  your-own world may use either, and "What you have" names both.

### Open

For Josh:

1. **The page opens with a list, not a run** (the porter's question 4).
   The playbook says to keep dewlab's order and headings; the style
   guide's checklist asks whether a page opens by running something. The
   two disagree here. The page keeps dewlab's order: a series-end task
   names no new idea at its start, and with "Your world, running" first
   the page would still open with `Test` and four long class cells (types
   cells, with **Check**, not **Run**) before the first program.
2. **Names in the solution** (the porter's question 8). The library is
   `GameWorld` or `SolarSystem`, and the test project `GameWorld.Tests`
   or `SolarSystem.Tests`. The console app keeps the name "Download
   project" gives it. When *Namespaces and class libraries* is written,
   this page should use the names it chooses, and its CS0246 steps
   should be checked against these.
3. **Visual Studio, for real.** The steps were run with the .NET command
   line, not in Visual Studio. To check once on a college PC: the menu
   names (**Add** > **New Project**, **Add** > **Existing Item**, **Add
   Project Reference**, **Set as Startup Project**, **Test Explorer**);
   that the Error List shows the CS0246 for `Character` (or `Lander`)
   first, as the command line does; that Visual Studio offers
   `Assert.IsTrue` for `Assert.AreEqual(true, ...)` (the command line
   gives warning MSTEST0037); and that the published folder holds the
   library's `.dll`.
4. **A reader in their own world meets no predict.** Every predict on
   the page is in the game or the solar system, because the your-own
   cells are the reader's to write.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `Refused: healing cannot be negative.`, then `Tests run: 5. Passed: 5.` | cell `your-world-running-program--game` |
| `Refused: Voyager cannot burn -50 kg now.`, then `Tests run: 5. Passed: 5.` | cell `your-world-running-program--solar-system` |
| Philae starts with 40 kg of fuel | the first line of `your-world-front-end--solar-system` |
| the three lines of the game's first step; "hit Grog for 3" (8 expected, 5 found) | cell `a-test-first--game` |
| the two lines of the solar system's first step; "removed 50 kg" (70 expected, 20 found) | cell `a-test-first--solar-system` |
| `Refused: Ada is down.`, then `Tests run: 1. Passed: 1.` | the solution of `a-test-first--game` |
| `Refused: Voyager cannot refuel -50 kg.`, then `Tests run: 1. Passed: 1.` | the solution of `a-test-first--solar-system` |
| `refuel` always adds 20 kg | the code of `Commands`, and `your-world-front-end--solar-system`, where one refuel takes Philae from 20 kg to 40 kg |
| the name `YourWorldPlayableYourWorldFrontEndGame` | "Download project" in the page, and `projectName` |
| CS0246 and CS0103 and their text, one message naming the namespace, `GameWorld.dll`, `Assert.IsTrue` | the command-line build in "How it was checked" |
| CS8600 and CS8618 | named as examples of nullable warnings; none happened, and the page says the classes give none |

No compiler message's line or column is quoted in the prose.

## Probes

Run in the browser with the checker, from a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), on
28 September 2026. The scratch lesson was made by script from the page's
own cells: `Test`, the game's four classes, then P1 to P3, then the solar
system's four classes (whose `Commands` replaces the game's below it,
rule 4), then P4 to P6. The draft's native probes P1 to P4 are the same
experiments; these replace them.

- **P1.** `your-world-front-end--game` with `stdin: "Attack\nattack\nquit\n"`:
  `What now? Attack`, `Not a command: Attack`, then the attack
  (`Ada (health 8) | Grog (health 5)`), and `Goodbye.`.
- **P2.** `your-world-front-end--game` with `stdin: "look\n"`: after the
  look, `ReadLine` gives `null`, the `if` makes it `quit`, and the
  program prints `Goodbye.`.
- **P3.** The five tests of `your-world-running-program--game`, with the
  solution's `Commands` (the new rule) written below them: the same two
  lines as without the rule. None of the five tests calls `RunChoice`.
- **P4.** `your-world-front-end--solar-system` with
  `stdin: "Burn\nburn\nquit\n"`: `Not a command: Burn`, then
  `Philae (fuel 30 kg)`, and `Mission over.`.
- **P5.** `your-world-front-end--solar-system` with `stdin: "status\n"`:
  the status, then `Mission over.`.
- **P6.** The five tests of `your-world-running-program--solar-system`,
  with the solution's `Probe` (the new rule) written below them: the
  same two lines as without the rule.
