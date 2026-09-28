# Notes: the-moves-you-already-know

Ported from dewlab `tutorials/the-moves-you-already-know/` (the page, its
practice page and its glossary), version 2026.09.26.1, on 27 September
2026. Moved from `drafts/lessons/` into `lessons/` on 28 September 2026,
after a review against `docs/TRANSLATING.md`, the style guide, the course
map and the two exemplars. The porter's notes are below, brought up to date
with the page as it now is. Where the review changed something, it says so.

## How it was checked

- `npm run check-lessons -- the-moves-you-already-know
  the-moves-you-already-know-practice`, in the browser engine: 13 runs on
  the page and 20 on the practice page. The recorded outputs are
  `lessons/the-moves-you-already-know/*.outputs.json`, version
  2026.09.28.1. No cell on either page has a warning now.
- Every number and every quoted message in the prose, the folds and the
  solution notes is in those files: `3`, `0`, `Jupiter` and `3`, CS0029 on
  line 2, `5`/`4`/`9` for `Heaviest()`, `5268`/`3475`/`22` for
  `WidestMoon()`; on the practice page `0`, `4` twice, `3122`/`12`/`3475`
  for `NarrowestMoon()`, `11`/`0`/`4` for `TotalWeight()`, CS1061 on line 2,
  CS0029 on line 6, `2`, `5` and `8`, CS0161 on line 12 of
  `Scoreboard.cs`, and `120`.
- The draft's native check could not run a solution against its inputs.
  The browser checker does, so the solution notes begin with the number
  again, as dewlab's did ("It prints 5.").
- Two claims were run in a scratch lesson, because the page can't hold them
  as cells: deleting only `int` in `TakePhoto` gives CS0103 (`The name
  'photos' does not exist in the current context`), and that class can't
  be a cell, since a class that doesn't compile stops every cell below it.
  The prose now asks the reader to try it, and doesn't quote the message.
- The fold of practice problem 9 said "after 8, `step` becomes 11". No
  cell prints 11, so it now says "the next value after 8 is not less than
  11".
- Both Microsoft Learn links returned HTTP 200 on 28 September 2026.

## What changed from the Python page, and why

**Cells follow the rules of the road.** Each Python cell became a types
cell (the class, with `file:`) and a program cell below it. The program
cell is `<id>-program`, and it holds the inputs, the hints and the
solution (`DECISIONS.md` 26). A solution is the program's statements with
the class written again below them (rule 4), as in `objects-and-classes`.
*Review:* the draft had `-2` program cells, and put `solution` and `inputs`
on the types cell. That shape is gone (see "Found in the engine" below).

**Worlds: game, solar-system, your-own.** Ocean is gone. Its practice
problem ("Deepest, too soon", a submarine logbook) moved to the game world
as "The highest score, too soon", with the same numbers (120, 340, 85), so
its cells have new ids: `the-highest-score-too-soon-1`, `-1-program`, `-2`
and `-2-program`.

**`question` blocks became prose.** The format has no `question` block. The
fill-in-the-blank "which move is each line" (page and practice problem 1)
is now a list with an answer fold, as the course map allows.

**A new section, "Storing with `var`".** The style guide says FOOP's second
page teaches `var`. It sits beside storing, because `var` is a way to make a
variable. It has one cell to run and one meant to fail (CS0029: `var` still
fixes the type). The prose states the course rule: `var` only on a line
with `new`. Cells above it write `Planet jupiter = new Planet(...)`, and
cells below it use `var`. *Review:* the prose says "the type is already
written after `new`" in place of "on the right", which is plainer for a
reader in a second language, and gives the Visual Studio step in the words
of `the-tools-around-your-code` ("rest the mouse pointer on").

**"Storing inside a class" is about C#'s own form of the slip.** Python's
`photos = self.photos + 1` became `int photos = Photos + 1;`. It still
prints 0 with no warning. In C#, a new variable is made only by a line that
starts with a type. *Local variable* is defined here. `this` is a reminder
now, with a link to `objects-and-classes`, which teaches it.

**Your turn: the compiler says what is missing.** The starter class is a
types cell with no stub method. The program below calls the method, so it
fails with CS1061 (`expect: CS1061`, decision 27) until the reader writes
it, and the prose says so in the exemplar's words. The first hint is
`after: 2 errors`, because the first run always fails. A second hint gives
the method's first line. The your-own world has two comment-only cells,
`one-method-several-moves-1--your-own` and `-1-program--your-own`, and the
prose says where the reader's class from `objects-and-classes` is saved
(the course map's "FOOP's class chain").

**Python built-ins became LINQ.** `max()`, `min()` and `sum()` became
`Max()`, `Min()` and `Sum()`. The notes say only that they look at every
value, as the loop does.

**The challenge** now has `do`...`while` as a second iteration move, as the
course map's entry asks (the draft had only `while`). It is defined in one
sentence, with a short fence to read, and the reader is asked whether a
`do`...`while` version gives the same count for a probe with 5 kg. The
starter makes that probe. It is one block, statements first and the class
last, and the checker compiles it alone (decision 40).

**Visual Studio.** The page now says that nothing on it needs Visual
Studio, that any program cell downloads as a project that prints the same,
and that the next page is about Visual Studio (`#the-ide`).

**Practice page, where C# acts differently from Python:**
- **2, one name, two variables** (id `two-names-that-look-alike-1`).
  *Review:* rewritten as the course map's entry says: a local variable in a
  method with the same name as a field, `int Visits = 0; Visits = Visits +
  1;`. It prints 0 with no warning, and the fold names `this.Visits` and
  C#'s naming habit. The draft's `int visits = 100;` gave warning CS0219,
  and that warning showed under every program cell below it on the page,
  which decision 30 rules out.
- **8 (was 9), printed, not returned:** storing a `void` method's result is
  CS0029, and nothing prints. The method is `Twice`, not `Double`, because
  `Double` is a .NET type name.
- **7 (was 8), a slip in a name:** `grace.Heath = 3;` is CS1061. The fold
  compares it with a misspelt `Dictionary` key.
- **9 (was 10), a loop that counts:** a runnable cell, so that 2, 5 and 8
  come from a run.
- **10 (was 5), the highest score, too soon:** a `return` inside the loop
  does not compile (CS0161). A second part adds a `return` after the loop,
  and then it prints 120. *Review:* moved to the end of the page. Its first
  class doesn't compile, and decision 30 puts a class like that last, so
  that a reader who edits the class below it can't stop the other
  problems.
- The practice page says once, at the top, that some cells are meant not
  to compile, because saying so in problems 7, 8 and 10 would give the
  answer to their predicts away. The exemplar's practice page does the
  same.

**Titles and links.** *Review:* the page's title is the course map's,
"Inside a method: sequence, selection and iteration in a class", which is
also how `objects-and-classes` names the page (*Inside a method*). The
practice page is "Inside a method: practice", like the exemplar's. Links
go to the pages that are in `lessons/` or move there in the same batch,
with each page's own title or short title as the text: *Variables, types
and text*, *Decisions*, *Loops*, *Methods: writing your own*, and *Visual
Studio: the tools around your code*. *C# for Python programmers* isn't written yet, so it is in
italics (decision 32).

## Conventions

- **Public PascalCase fields** (`public List<int> Moons;`), not properties,
  as in `objects-and-classes`. Encapsulation belongs to
  `keeping-details-inside-an-object`.
- `count = count + 1;` rather than `count++`, so that the storing is plain.
  The answer fold mentions `count++`.
- `new List<int> { ... }`, as in the format document and the exemplars.
- `foreach (int width in Moons)`: an explicit type in the loop, since `var`
  is only for lines with `new`.

## The porter's questions, and what was decided

**Compare with a solution on a types cell.** Decided by decision 26: the
solution and the inputs belong on the program cell, and the solution writes
the class again. The checker runs them there, in every world. The engine
has a fault here all the same (next section).

**Warnings from cells above.** Decided by decision 30, and by the course
map's version of practice problem 2, which has no warning. No cell on
either page shows a warning now. A types cell with a method missing is not
an error, so problems 4 and 5 no longer stop the cells below them.

**Comment-only cells** (the your-own world). Decided by the exemplar,
which has the same pair of comment-only cells; the page shows them.

**The challenge is one block.** Decided by decision 40 and the exemplar's
challenge, which is one block with its type last.

**Link texts.** Decided as above, from each page's own title.

**Cell length.** Decided by the exemplars: their classes are 20 to 25
lines, and their solutions about 30, since a class can't be split across
cells. This page is the same.

**`covers`.** Decided by the course map's entry: `[FOOP-LO2, FOOP-LO3]`.

**`this`.** Decided: `objects-and-classes` teaches it, so this page reminds
the reader and links there.

**Practice page title.** Decided by the exemplar: "Inside a method:
practice".

**The `from:` of the practice page.** Decided by the exemplar:
`from: the-moves-you-already-know-practice`, the dewlab practice page's id.

## Found in the engine

A types cell whose `inputs` all fail to compile makes the engine throw.
The draft's shape did that (the reader's starter class has no `Heaviest`,
so every input is CS1061), and the checker recorded a `host-error`:
`NullReferenceException` in `Dewsharp.Engine.Execute`. The smallest case is
a types cell `class Box { public int Size = 3; }` with the one input
`new Box().Missing()`. With one input that compiles beside it, or on a
program cell, it works. In `engine/Dewsharp.Browser/Engine.cs`, `runnable`
is set from the first build, where the inputs make a program. When every
input fails, the program is built again without them, has no entry point,
and `Execute` reads `asm.EntryPoint!`. The lessons no longer put inputs on
a types cell, so nothing on these pages meets it. It is reported, not
changed.

## Open

These are for Josh.

- **World order.** The shared cells at the top teach with Jupiter (solar
  system), as dewlab's page does, but the frontmatter lists game first, as
  the course map's entry, `objects-and-classes` and dewlab do. The style
  guide says "a page teaches in its first world". The shared cells belong
  to no world, so the page keeps dewlab's opening. Moving the opening into
  the game world would mean a new opening problem.
- **Empty lists.** `Heaviest()`, `WidestMoon()` and `NarrowestMoon()` throw
  `ArgumentOutOfRangeException` on an empty list (the scratch run of the
  draft). The solution notes leave it as a question for the reader ("Try
  … and see what happens"). Should `testing-what-a-class-does` come back
  to it? Its course map entry doesn't say.
- **The course file.** `courses/foop.yaml` still has this lesson's line
  under `planned:`. The checklist says to delete it when the lesson moves
  into `lessons/`; this move was not allowed to edit the course files.
