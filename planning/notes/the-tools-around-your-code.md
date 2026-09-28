# the-tools-around-your-code: notes for a reviewer

Ported from dewlab `tutorials/the-tools-around-your-code/` (the tutorial,
its practice page and its glossary, all version 2026.09.26.1), against
`planning/COURSE_MAP.md` (FOOP lesson 8), `docs/LESSON_FORMAT.md`, the
style guide (draft 1) and `DECISIONS.md`, on 27 September 2026. Moved from
`drafts/lessons/` into `lessons/` on 28 September 2026, after a run in the
browser checker and a review against `docs/TRANSLATING.md`. This file was
the draft's `NOTES.md`; the native checker's `*.native.json` files were
deleted with the draft folder.

## Status

Both pages are in `lessons/the-tools-around-your-code/`, at version
2026.09.28.1, with their outputs recorded by the browser checker
(`npm run check-lessons -- --write the-tools-around-your-code
the-tools-around-your-code-practice`). The checker reports no problems
except links to pages that are being moved into `lessons/` in the same
batch (`keeping-details-inside-an-object`, `one-class-many-methods`).

The draft had been written against the course map by the porter, from an
earlier draft that a stopped run left behind. From that earlier draft the
porter kept the printing section and its two world tasks (with the `=+`
bug), the Visual Studio shortcuts, and most of the practice problems.

## Files

- `lessons/the-tools-around-your-code/the-tools-around-your-code.md`: the
  lesson. 27 exec cells (15 shared, and 4 in each of the three worlds),
  3 predicts, 4 hints, 7 solutions, 4 inputs blocks, 1 challenge.
- `lessons/the-tools-around-your-code/the-tools-around-your-code-practice.md`:
  the practice page. 15 exec cells, 3 predicts, 1 hint, 5 solutions, 1
  inputs block.
- The two `*.outputs.json` files beside them, written by the checker.

## What the move changed (28 September 2026)

The browser checker ran every cell. The engine agreed with the native
outputs on every cell that both ran: the same compiler messages, lines and
columns, the same exceptions and the same output. The changes are about
the page's rules, not about the engine.

- **The challenge did not compile, and a challenge must** (decision 40:
  the checker compiles each challenge alone and fails the build if it
  doesn't compile). The compiler-error bug (`Photo.Count`, CS0103) became
  a field that is never made: `public List<string> Photos;`. The compiler
  warns (CS0649) and the program stops with a `NullReferenceException` in
  `Photograph`, which is the habit the page teaches. The logic bug (`Burn`
  stores in a local) stays. Checked in a scratch lesson in the browser
  engine: as given, CS0649 and a `NullReferenceException` at line 24; with
  the list made, `Voyager: 5 photos, 3 kg left`; with both fixes,
  `Voyager: 3 photos, 0 kg left`.
- **Numbers that no cell printed.** Every number in the prose now comes
  from the outputs file (decision 29):
  - "Grace ends with 4 health" (twice): a solution on
    `a-bug-two-calls-deep-1-program` and one on `-2-program`.
  - The CS1061 and CS1501 messages in the table: a new types cell meant to
    fail, `two-more-slips-1`, with `Bag.add(item);` and
    `TakeDamage(hits, size);`. It declares `Character`, and the next
    `Character` replaces it (rule 4), so it stops nothing below. The
    CS1501 row was dewlab's solar-system `Burn(days, Rate)`; it is now the
    same slip in the game's class.
  - `rope, lamp, key`: a new cell pair after the fold,
    `a-bug-the-compiler-cannot-see-2` (the class with `Bag = new();`) and
    `-2-program`.
  - `Bag.Count` is 3: a second input, `ada.Bag.Count`, on the game task.
  - 6, then 2, then 1: a new cell pair, `printing-each-hit-1` and
    `-program`, the class with the `Console.WriteLine` added. The reader no
    longer adds the line to the first class; this cell shows it added.
  - 0 after the armour fix: a solution on `printing-each-hit-1-program`.
  - The solar-system note no longer lists the values of `i` (0 to 4) or
    "position 4", and the game note no longer says "the second line of the
    report" (the report's second line is its first call).
  - Practice: problem 1 is now a runnable cell pair (`which-line-1`,
    `which-line-1-program`, with a solution for `4 packs each`), so lines
    16, 21 and 3 are recorded; Visual Studio's form of the report stays,
    after it. Solutions record 8 (problem 2) and `True` twice (the two
    fixes of the hidden field). Problem 8's cell prints a third line,
    `string.Join`, so `Ada` is recorded. "188", "0 every time" and
    `depth: 120` are gone from the folds.
  - Two numbers from program runs in Visual Studio are now questions, not
    quoted: Grace's health after the potion, and what the shield leaves.
- **Warnings from a class above** (decision 30, and the playbook's
  "Warnings travel"). The first `Bag` class gave CS0649 under every program
  below it in the solar-system and your-own worlds, including the Voyager
  task. The fixed class (`a-bug-the-compiler-cannot-see-2`) now replaces it
  at once. On the practice page, "A local that hides a field" (CS0219,
  CS0649) moved from problem 3 to the last place, problem 10, and says why.
  No cell on either page now shows a warning the prose does not talk about.
- **Hints that could never appear.** A hint's default is `after: 1 errors`,
  and the page counts only runs that did not compile or that stopped. The
  two printing tasks and the practice average run without an error, so
  their hints now have `after: 2 runs`.
- **The exception report** is quoted in the page's own form (from
  `web/page/cell.js`): `Unhandled exception. <type>: <message>`, then
  `at line N of <file> (in <member>)`, most recent first, own code only.
  The program's line names no method, and the prose now says so.
- **The download steps** name the **Download project** button and the
  `.sln` file. The file list was checked with the page's own
  `projectFiles` in headless Chromium: in the game and your-own worlds,
  `Program.cs`, `Character.cs` and `IrishCulture.cs`; in the solar-system
  world, also `Probe.cs` and `Planet.cs`.
- **Links** (decision 32): *Compiler errors* and *Namespaces and class
  libraries* are in italics, since neither is in `lessons/` nor in this
  batch. The *overload* sentence now links `one-class-many-methods`.
- **Plain language.** "the last thing she put in" became "the last thing
  she added". A line at the top says which half of the page happens in
  Visual Studio. `new()` and `+=` are defined where they first appear.
- **Meant to fail, before the run.** The NullReferenceException cell and
  practice problems 1 and 2 now say so above their cells.

## What changed from the Python page, and why

**Title and covers.** The course map's title, "Visual Studio: the tools
around your code", and `covers: [FOOP-LO5, FOOP-LO10]` (IDE; debug and
test). dewlab's page is "Your development environment: finding a bug
inside a class", with FOOP-LO5 for each section.

**Worlds.** Game, solar-system and your-own; ocean dropped. The shared
cells teach in the game world (Ada and Grace), as dewlab's do.

**The opening: two compiler errors.** As the map says, dewlab's first two
cells become compiler errors with `expect:`.

- `a-bug-two-calls-deep-1`: dewlab's `self.helth` is `Helth` (C# reaches a
  field without `this.`), so CS0103 at `Character.cs(16,30)`. dewlab's
  multiple-choice question ("which of the three lines would you change?")
  became the page's first predict: which line will C# name? The three
  options are the three lines a Python traceback would list. The compiler
  names only line 16, and the prose says why: it checks every method before
  anything runs, so it does not follow the route.
- `a-bug-two-calls-deep-2`: dewlab's `take_damage(self.name)` is CS1503 at
  `Character.cs(21,26)`: the caller's line. In Python the error was one
  call further in than the mistake; in C# the message names the mistake.
- `two-more-slips-1` and the table list the four slips from dewlab's page
  that C# finds before running, as the map asks: CS0103, CS1503, CS1061
  (`Bag.add`, dewlab's game bug) and CS1501 (dewlab's solar-system bug,
  two values for a method that takes one). *Overload* gets one sentence,
  because CS1501's message uses it.

**A bug the compiler cannot see (new).** The map's one run-time bug two
calls deep: a `List<string>` field that is never made. `PickUp` fails
(line 15), called from `Loot` (22), called from the program (2). This is
where the exception report is taught: its two parts, the list of calls
read from the top, *the line that failed*, and the note for Python readers
that the order is reversed. A second predict asks what will happen (prints,
does not compile, or stops). dewlab's "which line would you change?" moves
here as a question with an answer fold, because here the answer is
interesting: none of the three. The fold defines `null` and uses the
CS0649 warning; the fixed class follows it. The section ends with the
habit it teaches: for each value on the line that failed, ask where it came
from (a parameter from the caller; a field from the class). *Exception
report* is the course map's term (`reading-an-error-message`); *stack
trace* is named once, as Visual Studio's word.

**Your turn: a bug that still compiles.** Each world keeps
`a-bug-two-calls-deep-3`, with a new bug, because dewlab's bugs (`add`,
`burn(days, rate)`) are now compiler errors.

- game: `EquipLast` calls `Equip(Bag.Count)`, one past the last position.
  `ArgumentOutOfRangeException` in `Equip`, and the mistake is in the
  caller.
- solar-system: dewlab's Juno became Voyager 2, the only probe that has
  visited all four giant planets. `Fly(4)` loops with `i <= planets`, so
  after the four planets `NextPlanet` asks for a position after the last.
  The four planets print first, so the reader sees the program run until
  it stops. The mistake is on the `for` line, above the line the report
  names.
- your-own: two empty cells (class and program), and a prompt that makes an
  exception two calls deep, not a misspelt field (a compiler error now).

Both world bugs have the mistake in the caller, where dewlab had one in the
callee. The shared NullReferenceException already shows a mistake on none
of the named lines, and the caller is the case that the section's habit
("where did this value come from?") is for.

**Printing what you need to see** stays whole, as the map says. The
armour bug is dewlab's (1; then 6, 2, 1; then 0 with the fix). A predict
was added (0, 1 or -2), because most readers will expect 0. "10 take away
4" became "10 minus 4", to keep a phrasal verb out. The game task keeps
dewlab's `if`/`if`/`else` bug (17, then 16). The solar-system bug (dewlab's
`total = 0` inside the loop) does not compile in C# (a variable declared in
the loop is not there for the `return`), so it became `total =+ width;`,
which C# reads as `total = +width;` with no warning: 4821, then 16854. The
last paragraph points ahead to the debugger.

**Where a bigger project lives** is now the Visual Studio walk-through the
map asks for, in five parts, each with numbered steps and what the reader
will see described in words:

1. *A cell as a project*: a clean `Character` and a program with three
   attacks (Ada 7, Grace 0) in new cells, because every `Character` above
   has a bug or has been replaced by a world's class. Download, open the
   `.sln`, Solution Explorer, Ctrl+F5.
2. *What the editor already knows* (dewlab's section, moved here because
   the page has no autocomplete, and `what-the-editor-already-knows-1`
   goes): IntelliSense on `grace.`, the parameter line on `(`, hovering,
   F12, and the Error List with `grace.TakeDamage("lots");` (CS1503, the
   same message as `a-bug-two-calls-deep-2`).
3. *A class in a file of its own*: Add > Class, `Potion.cs`, used from
   `Program.cs`. Visual Studio's start for the file has a namespace, so the
   steps say to replace the whole file; the practice page says what happens
   if the namespace stays (CS0246, probe Q6 below).
4. *Watching the program run*: a breakpoint in `TakeDamage`, F5, Locals
   (`this` and `amount`), F10, the Call Stack as a live exception report,
   F5 to continue, Stop Debugging, and F11. The fold's values: Grace 8 and
   Ada's strength 4 are the constructor's arguments; health 4 after F10 is
   the opener's recorded solution output (the same first attack); the
   second pause is Ada with Grace's strength 3. A scratch run in the browser
   engine, with a `Console.WriteLine` before and after the line, printed
   exactly these pauses.
5. *Main, in older programs*: the one place the style guide shows the
   classic `static void Main`, as code to read, from the .NET 10 template
   (probe P8 below). It explains `Main`, `static`, `string[] args` and the
   namespace line, why the pages use top-level statements, why no class is
   called `Program`, and rule 5. The nullable setting (style guide decision
   4) closes it, with CS8618 on the `Bag` field.

dewlab's Notebook (Files, Variables, Stop) maps onto Solution Explorer, the
Locals window and Stop Debugging.

**Looking back and the challenge.** The question keeps dewlab's shape. The
challenge has two bugs: one the compiler warns about (a list never made),
and one that only a run shows (`Burn` storing in a local). See "What the
move changed" for why it is not a compiler error.

**Where to read more.** *Think Python*'s debugging appendix and the Python
tutorial became two Microsoft Learn pages: *Debugging code for absolute
beginners* and *Tutorial: Debug C# code and inspect data*. Both returned
HTTP 200 on 27 September 2026, and the porter checked the page's
description of each against its text: the first opens with "What did you
expect your code to do? What happened instead?" and fixes "several bugs"
with F10 and F11; the second uses the Locals and Call Stack windows. Both
use a classic `static void Main`, and the page says so.

**Glossary.** dewsharp has no glossary panel, so dewlab's five terms are
defined in the prose: *exception report* and *stack trace* (for
*traceback*), *debugging*, *development environment*, *autocomplete* and
*integrated development environment*. The page also defines *null*,
`new()`, *the line that failed*, *debugger*, *breakpoint*, *stepping*,
*overload*, *top-level statements* and *command line*, and the practice
page *hides* (a field) and *namespace*.

## The practice page, problem by problem

1. **Which line?** dewlab's traceback came from a list passed where a
   number was expected: CS1503 in C#. It became a
   `DivideByZeroException` on a space station: `ShareFood` passes
   `Outside.Count` (0) to `PacksEach`. The reader runs it on the page, and
   the page's report names lines 16, 21 and 3. Visual Studio's console form
   of the same report follows, copied from a real console run (the porter's,
   net10.0), and the page explains `Program.<Main>$` and `Int32`. The
   `question` block became prose and a fold. Fixed, `4 packs each` (the
   solution).
2. **One letter too many.** `AttributeError` became CS1061 at (4,27). C#
   gives no "Did you mean", so the fold shows where the unknown name sits in
   the message. Fixed, 8 (the solution).
3. **An average that is too big.** Python's indenting bug became a
   `foreach` without braces. Retold from the ocean (dives) to the game
   (Ada's scores, the same numbers): 755 before, 188.75 after. The note
   mentions Format Document.
4. **Where the list comes from.** Visual Studio reads the class and runs
   nothing, where dewlab's editor listed names from cells that had run.
5. **A class in another file** became a Visual Studio task, as the map
   says: add `Shield.cs` with `Block(int hit)`, and use it from
   `Program.cs`. The fold covers the namespace that Visual Studio writes
   (CS0246 without `using`, probe Q6 below), and leaves the rest to
   *Namespaces and class libraries*.
6. **A cell that never ends** keeps Stop, and adds Break All, Locals, F10
   and Stop Debugging.
7. **From earlier: a count that never counts** (from
   `the-moves-you-already-know`). The same bug; the fold adds that C# tells
   `Burns` and `burns` apart.
8. **From earlier: an object in a list** (from `objects-and-classes`).
   `__str__` and `__repr__` became `ToString` and `List<T>`'s own
   `ToString`, which prints ``System.Collections.Generic.List`1[Character]``.
   The cell's third line shows `string.Join`.
9. **From earlier: three errors** became **does not compile, or stops?**,
   three runnable cells, from *Compiler errors*, which teaches the three
   things that can happen on Run. `int("twelve")` became `int.Parse`
   (`FormatException`), the index stays (`ArgumentOutOfRangeException`),
   and `"depth: " + 120`, which works in C#, became `int depth = "120";`
   (CS0029). The fold says that `"depth: " + 120` works.
10. **Missing self** became **A local that hides a field**, as the map
    says, and it is last because its class warns (decision 30).
    `bool IsLit = true;` inside `Light` makes a local with the field's
    exact name, so the field stays `False`, with CS0219 and CS0649. Two
    solutions give the two fixes, deleting `bool` or `this.IsLit`; both
    print `True` with no warnings. The fold says that `this.` is C#'s
    `self.`. It differs from the previous page's practice problem 2
    (`int visits`, a different letter case) and from problem 7 here.

## What C# made different, in short

- Most of dewlab's bugs are compiler errors, found before anything runs,
  at the line that has the mistake. The page is built on that.
- The run-time bugs left are values: a field never made (`null`), a
  position one past the end, a count of 0.
- .NET lists the most recent call first, the reverse of Python.
- A field that holds an object starts as `null`; declaring it does not
  make it. The compiler often warns (CS0649, or CS8618 with nullable on).
- A local can hide a field of the same name, and `this.` reaches the field.
- Indenting means nothing to C#; braces do. `=+` compiles.
- Visual Studio can list a class's members before anything runs, because
  every variable has a type.

## The porter's questions, and what was decided

### Open questions for a reviewer

1. **Cell ids for a split cell.** *Decided:* the types cell keeps dewlab's
   id and the program cell is `<id>-program` (`DECISIONS.md` 26, and the
   playbook's checklist). The page already did this. New cells added in
   the move follow the same shape (`a-bug-the-compiler-cannot-see-2` and
   `-2-program`, `printing-each-hit-1` and `-1-program`).
2. **Where solutions go.** *Decided:* on the program cell, with the
   `inputs` and the hints (decision 26). The page already did this, and
   the solutions added in the move are on program cells too.
3. **Page size.** *Decided:* one page. The course map calls it L and says
   the Visual Studio walk-through "can be its own session", not its own
   page; a new page would need a new id and a course map entry. The page
   now says at the top which half happens in Visual Studio, and the
   Visual Studio half says where to stop.
4. **Cell length.** *Decided:* keep the classes whole. The exemplar's class
   cells (`objects-and-classes`) are 17 to 27 lines, and a bug hunt inside
   a class needs the class.
5. **Three predicts.** *Decided:* keep three on each page. The style guide
   allows two or three, and each is where C# does something a reader may
   not expect (which line the compiler names; that it compiles and then
   stops; the 1).
6. **Public fields.** *Decided:* keep them. The exemplar uses public
   fields, and properties are the next page's subject. The CS0649 warnings
   the page uses depend on them.
7. **What the reader has met.** *Decided:* `Math.Max`, `string.Join` and
   `override string ToString()` are taught on `objects-and-classes`; `var`
   on `the-moves-you-already-know`; `for`, `else if` and the three things
   that can happen on Run in "Starting in C#". The two the page used
   without a word now have one: `new()` where the fixed `Bag` appears, and
   `+=` in the moons solution's note.
8. **Visual Studio only?** Open: see below.

### To revisit once the page existed

1. **What the page shows for an exception.** *Decided:* read from
   `web/page/cell.js` (`drawException`): `Unhandled exception. <type>:
   <message>`, then one `at line N of <file> (in <member>)` line per call,
   most recent first, the learner's own code only, and no member for the
   program's statements. The tutorial quotes that form, and "read it from
   the top" holds. This answers course map open question 9 for this page.
2. **How the page writes a compiler message.** *Decided:*
   `formatDiagnostic` writes `<file>(<line>,<column>): <severity> <code>:
   <message>`, with the cell's `file:`. The prose's `Character.cs(16,30)`
   and `Character.cs(21,26)` are what the page shows.
3. **Warnings from cells above.** *Decided for this page:* the fixed `Bag`
   class replaces the warning class at once, and the practice page's
   warning class is last (decision 30). No program on either page shows a
   warning from above that its prose doesn't mention.
4. **The download control.** *Decided:* **Download project** on the cell,
   a ZIP with a `.sln` and a project folder (decision 38). The steps name
   both, and the file list for each world was checked (see "What the move
   changed").
5. **Pictures.** Open: see below.
6. **Compare with a solution** on a program cell whose solution is the
   statements plus a replacement class. *Decided:* this is the exemplar's
   pattern (decision 26), and the checker runs every solution.
7. **Empty "your own" cells.** *Decided:* the page labels an empty cell
   ("An empty cell. Write some C# in it.").
8. **The challenge.** *Decided:* one block, statements then class, as the
   exemplar's challenge is. It must compile on its own (decision 40), so
   its first bug is now one the compiler warns about.

### Links

*Decided:* the move's rule is that a `lesson:` link may go to a page in
`lessons/` or to a page moved in this batch. So the page links
`objects-and-classes`, `the-moves-you-already-know`,
`keeping-details-inside-an-object`, `one-class-many-methods` (the
*overload* sentence) and its own practice page. *Compiler errors* and
*Namespaces and class libraries* are named in italics (decision 32).
`the-moves-you-already-know` already links here with this page's title.

## Open

For Josh.

1. **The challenge has no compiler error.** The course map asks for "one
   compiler error and one logic error"; decision 40 makes a challenge that
   doesn't compile fail the build. The first bug is now a list that is
   never made (warning CS0649, then a `NullReferenceException`), which
   repeats the page's own bug. Other choices: a second logic error, or a
   cell meant to fail as the page's last cell in place of a challenge.
2. **Visual Studio only?** The steps name Visual Studio 2022's keys and
   menus (Ctrl+F5, F5, F9, F10, F11, Shift+F5, F12, Ctrl+Alt+Break,
   Ctrl+K Ctrl+D, View > Solution Explorer, View > Error List, Debug >
   Windows > Locals and Call Stack, Add > Class, Extract All, the "Do not
   use top-level statements" box). Learners on a Mac or at home may use VS
   Code, whose keys differ (course map open question 11). Nobody has
   walked the steps on the college's version yet.
3. **Claims the page's checker can't run.** These come from the porter's
   console project (net10.0) or from knowledge of Visual Studio, not from
   an outputs file: the IntelliSense line `void
   Character.TakeDamage(int amount)`; CS8618 with nullable on; CS0246 for
   `Shield` in a namespace (probe Q6); Visual Studio's console form of the
   station report (`Program.<Main>$`, `Int32`, `Station.cs:line 16`); the
   template's classic `Main` (probe P8). The line numbers in the station
   report match the page's recorded frames.
4. **Pictures.** The map asks for Visual Studio steps "with pictures
   described in words". Each step says in words what the reader will see
   (a red dot, a yellow arrow, the Locals and Call Stack windows).
   Screenshots, with descriptions, could go beside steps 3 and 4 of
   "Watching the program run", once someone has Visual Studio to take them.
5. **The default hint trigger.** `after: 1 errors` never fires on a task
   whose program runs without an error. This page uses `after: 2 runs` on
   its three such tasks. The exemplar's `your-class-1` hints have the
   default and the same problem; `docs/LESSON_FORMAT.md` could say which
   trigger to use for a task that runs.

## Where each number in the prose comes from

| Number or message | Source |
|---|---|
| `Character.cs(16,30)` CS0103; `Character.cs(21,26)` CS1503 | `a-bug-two-calls-deep-1-program`, `-2-program` |
| Grace ends with 4 health (after either fix); 4 after F10 | the solutions of those two cells |
| CS1061 and CS1501 in the table | `two-more-slips-1` |
| NullReferenceException, lines 15, 22, 2; `Character.cs(5,25)` CS0649 | `a-bug-the-compiler-cannot-see-1-program` |
| `rope, lamp, key` | `a-bug-the-compiler-cannot-see-2-program` |
| game: sword; `Bag.Count` is 3; `EquipLast` second in the list | the game task's solution and inputs; its recorded frames |
| solar-system: four planets, then the exception in `NextPlanet` from `Fly` | `a-bug-two-calls-deep-3-program--solar-system` and its solution |
| 1 | `printing-what-you-need-to-see-1-program` |
| 6, 2, 1; then 0 | `printing-each-hit-1-program` and its solution |
| 16 (coins); 16,854 and 4821 (moons) | the printing tasks and their solutions |
| Ada 7, Grace 0 | `where-a-bigger-project-lives-1-program` |
| Grace 8, Ada's strength 4, Grace's strength 3 | the constructor's arguments |
| CS1503 for `"lots"` | the same message as `a-bug-two-calls-deep-2` |
| challenge: 3 photos, 0 kg left | a scratch lesson in the browser engine (the checker compiles a challenge and doesn't run it) |
| practice 1: lines 16, 21, 3; `4 packs each` | `which-line-1-program` and its solution |
| practice 2: (4,27); 8 | `one-letter-too-many-1-program` and its solution |
| practice 3: 188.75 | the average task's solution |
| practice 7: 1 and 1 | `from-earlier-a-count-that-never-counts-1-program` |
| practice 8: `Ada`, ``List`1[Character]``, `Ada` | `from-earlier-an-object-in-a-list-1-program` |
| practice 9: `FormatException`, `ArgumentOutOfRangeException`, CS0029 | the three cells |
| practice 10: `False`, CS0219, CS0649; `True` twice | `a-local-that-hides-a-field-1-program` and its two solutions |
| CS8618; CS0246; the classic `Main`; Visual Studio's report form | not run by the page's checker (Open, item 3) |

## Probes that are still evidence

The porter ran these with the native checker in `drafts/tools/`, whose
output file was deleted with the draft. The other probes the draft had
(P1 to P7, P9 to P11, Q1 to Q4, Q8 to Q10) are now lesson cells, solutions
or inputs, recorded by the browser checker, or were for numbers the pages
no longer quote.

### P8. The classic Main, as the page shows it (runs, and prints Hello, World!)

```csharp
namespace ConsoleApp1;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
```

### Q6. Practice problem 5: Shield in a namespace, without and with `using` (prose: CS0246)

A types cell with the namespace:

```csharp
namespace MyProject;

class Shield
{
    public int Strength;

    public Shield(int strength)
    {
        Strength = strength;
    }

    public int Block(int hit)
    {
        return Math.Max(0, hit - Strength);
    }
}
```

Without `using`, a program cell below gave CS0246:

```csharp
var shield = new Shield(2);
Console.WriteLine(shield.Block(5));
```

With `using MyProject;` at its top, it compiled and ran.
