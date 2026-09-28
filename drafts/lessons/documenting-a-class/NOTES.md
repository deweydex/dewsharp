# Notes: documenting-a-class (C# draft)

Ported from dewlab `tutorials/documenting-a-class/` (the tutorial, its
practice page and its glossary file, all version 2026.09.26.1). Written on
27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to entry 32), and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 20, batch 9, "adapt", shape
tutorial, size M, worlds game, solar system and your own, covers
FOOP-LO9). It follows the drafts of the pages before it in the series,
above all `objects-inside-objects`, whose class chain it continues.

There was no partial draft: the folder did not exist when this run
started. The native check prints "No problems." for all three files.

Files:

- `documenting-a-class.md`: the tutorial. 19 `csharp exec` cells: 9
  shared (5 types cells, 4 program cells), 4 in the game world, 4 in the
  solar system, 2 in your own. A reader sees 13 (11 in their own world).
  2 predicts, 4 hints, 2 solutions (no `inputs`), 3 answer folds, 6
  fences of code to read, 1 challenge.
- `documenting-a-class-practice.md`: the practice page. 8 problems, 6
  exec cells (3 types cells, 3 program cells), 1 predict, 8 answer folds,
  2 fences of code to read (and one inside a fold).
- `documenting-a-class.native.json`,
  `documenting-a-class-practice.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the
  numbers and messages in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files and on this file: **No problems.**
  Every cell compiles with no warning, so no warning travels down the
  page (`DECISIONS.md` 30).
- `web/lesson/parse.js` reads both files with no errors: 19 and 6 cells.
  The 2 predicts (tutorial), the 4 hints (`after: 2 runs` and
  `after: 4 runs`, two per world), the 2 solutions and the practice
  page's predict are attached to the cells intended, and
  `what-a-method-promises-1-program` reads as `expect: exception`.
- **The class chain.** The six world cells were compared by script with
  their sources in the `objects-inside-objects` draft (`Character` with
  `your-class-5-so-far--game`, `Healer` with
  `your-class-5-so-far-healer--game`, `Probe` and `Lander` with the
  solar-system so-far cells, and `Room` and `Mission` with the classes in
  the `your-class-5-program--<world>` solutions). Four are identical. The
  other two differ by the sixth version's one change each, dewlab's
  `game-6.py` and `solar-system-6.py` in C#: `Character.Heal` refuses a
  negative amount ("Refused: healing cannot be negative."), and
  `Probe.CanBurn` returns `false` for a negative `kg`. The two solutions
  (the seventh version) were compared with those cells with every comment
  removed: the code is identical, so the seventh version adds comments
  and nothing else.
- **The XML in every comment.** The documented classes (the two
  solutions, `what-a-method-promises-1`, `examples-a-program-can-check-1`,
  the challenge and the practice page's `Bag`) were built as one
  Visual Studio-style project with `<GenerateDocumentationFile>true</GenerateDocumentationFile>`,
  which makes the compiler check the comments: 0 warnings. With a `<param>`
  renamed on purpose, the same build gives CS1572 and CS1573, and with a
  stray `<`, CS1570, so the check does run. With the setting off, as on a
  new project and on the page, the renamed `<param>` gives no warning
  (0 warnings). That is why the page never says that the compiler checks
  a comment, except in "Where to read more", which names the setting.
  (The project was in the scratchpad, and is not part of the draft.)

## What changed from the Python page, and why

**Frontmatter.** `year:` goes. The per-section `covers:` becomes
`[FOOP-LO9]`, as in the course map. The worlds are the game, the solar
system and your own, with the sentences the earlier FOOP drafts use; the
ocean goes (`DECISIONS.md` 13). The title is the course map's. dewlab's
glossary had three terms (*docstring*, *doctest*, `help()`). The page
defines their C# counterparts where they first appear: *documentation*,
*documentation comment*, *XML*, *tag*, and later *pseudocode*. It names
docstring and doctest once each, for readers from Python. `help()` has no
C# counterpart on the page: Visual Studio's hover takes its place, in the
last section.

**Links.** `DECISIONS.md` 32: a page that is not in `lessons/` is named by
its short title in italics, with no link. Only `first-steps` and
`objects-and-classes` are in `lessons/`, so every earlier page is named
that way: *Composition*, *Testing a class*, *Visual Studio*, *Two names,
one object*, *Inheritance*, and *A front end* for the next page. The one
link is to this page's own practice page, which moves into `lessons/`
with it. See open question 1.

**The opening.** dewlab opened with a question and a definition, and its
first cell showed `help(Probe)`. On the page, a documentation comment
does nothing that a program can show: the compiler skips it, and .NET
cannot read it back while a program runs (Microsoft's page on XML
documentation comments says so: they are not in the compiled program).
So the style guide's "run first, then name" needed a different first
cell. The page keeps dewlab's two questions, and then runs the probe with
no comments at all: `voyager.Burn(200)` on a probe with 70 kg. The
predict asks what happens, with four answers that a method called `Burn`
could each give (-130, 0, a refusal, an exception). It prints the
refusal, then `70`. The name does not say which, and that is the reason
for documentation. The refusal case is dewlab's own: its question block
asked what `voyager.burn(200)` does to a probe with 70 kg. The probe is
the sixth version's, cut to what the page uses (`Name`, `Fuel`,
`CanBurn`, `Burn`; no `TankSize`, `Refuel` or `virtual`). New ids:
`no-comments-yet-1` (types) and `no-comments-yet-1-program`.

**A comment for the class** (dewlab: "A class docstring"). dewlab's cell
`a-class-docstring-1` printed `help(Probe)`. A second copy of a 35-line
class to show three lines of comment would be mostly repetition, so the
section shows the comment as code to read, with the place it goes ("just
above `class Probe`", where Python's is inside), and invites the reader to
add it to the first cell, press Check, and run the program again. A fold
answers "What changes?": nothing (probe P1). So the reader writes their
first documentation comment, in a cell of their own. dewlab's point about
what a class comment is for stays, with "stand for" (a phrasal verb) as
"represent", and the probe's rule changed to "never below 0", since this
probe has no `TankSize`. The id
`a-class-docstring-1` has no cell here; nothing is saved under it.

**What a method promises.** The four things stay, each now with its tag:
`<summary>`, `<param name="kg">`, `<returns>`, and the refusal. The two
comments for `Burn` stay as code to read. dewlab's multiple-choice
`question` becomes the question in prose, with the answer in a fold.
dewlab's second docstring said "Returns nothing"; the C# one has no
`<returns>`, and a paragraph says why: `void` already says it, and Visual
Studio shows the method's first line with the comment. One more
paragraph says that the `name` in `<param>` must be the parameter's own
name, and one sentence gives the convention of a summary that starts
with a verb in *-s*.

**A method that refuses with an exception** is new. The course map lists
`<exception>` among the tags, and the class chain refuses only by
printing, so the page needs another method. It takes `Farthest()` from
*Composition*, where a star system with no planets stopped with an
`ArgumentOutOfRangeException` at `_planets[0]` (probe P2) and the solution
note asked "What should it do instead?". Here it refuses on purpose with
an `InvalidOperationException` and a message, and the comment says so with
`<exception cref="InvalidOperationException">`. `InvalidOperationException`
is defined in one sentence. The program cell (`expect: exception`, and the
prose says it is meant to stop) prints `Mars`, then stops with the
promised exception. `Planet` and `StarSystem` share one types cell
(`StarSystem.cs`), because the reader does not change them, as
`objects-inside-objects` did with `Shapes.cs`. `Planet`'s old
`// millions of km` comment became its class summary.

**Two kinds of comment** is new: the course map says "Comments that say
why stay". It uses the `//` comment in `Farthest`
(`// safe: the list has at least one planet`), which answers the
*Composition* page's exception, and a comment that only says *what*, as
a contrast, and ends with a question about the reader's own classes.
The style guide's own rule, "Comments say why, never what the line
already says", is what the section teaches.

**A plan in pseudocode** is new: the course map asks for an algorithm
written as pseudocode above a method, "one more kind of documentation".
It is shown, not set as a task, as the map says. The plan is for
`Farthest`, in the capitalised style of `first-steps` (`IF`, `SET`,
`FOR EACH`, `RETURN`), and *pseudocode* is defined again in one sentence
for readers who did not take PDP here. The reader is asked to match each
step to its C#. See open question 5 on the sentence about assessment.

**Examples a program can check** (dewlab: "Examples Python can check";
the ids change, `DECISIONS.md` 28). doctest has no C# twin, and the map
says the examples go in `<example>` and a program cell checks them with
`Check`. So:

- `<example>` and `<code>` are introduced, and one paragraph says why C#
  needs a program for this: a comment never runs.
- `Check` has not been written by any page yet (`building-reusable-tools`
  and `testing-what-a-class-does` are not drafted), so this page writes
  its own, in a types cell of its own: `static class Example` with
  `Check(string call, object expected, object actual)`. It prints one
  line either way, and never a verdict: `..., as the example says`, or
  `the example says X, the code gives Y`, which is open question 3's
  rule in the course map ("says what was expected and what came back").
  `static`, `static class`, `object` as a parameter type and `Equals` are
  each explained in one sentence. See open question 2.
- dewlab's cell becomes a types cell (the probe, with the class comment,
  and comments on `CanBurn` and `Burn`) and a program cell with three
  checks. The comment has three examples from the start, including the
  boundary (70 of 70 kg). It prints three lines that end
  `as the example says`, and one sentence says that C# prints `True` for
  `true`.
- dewlab's experiment ("change `<=` to `<`, add the example, and run
  again") becomes two cells: the teammate's version of the probe (rule 4)
  and the same three checks, with the page's second predict ("Which lines
  will show a difference?"). Only the check at 70 kg does. The paragraphs
  after it keep dewlab's argument, changed for C#: the comment cannot
  notice, because it never runs; the check runs, so it noticed; and only
  the example at the boundary noticed, which is why it is the one worth
  writing. dewlab's "A docstring with examples cannot quietly stop
  telling the truth" is not true of a C# comment, so the page says what
  is true: each example is written twice, once to read and once to run,
  and a larger project keeps the checks in a test project. An invitation
  to change `<` back and run again ends the section.

**Your turn: your class, seventh version.** Each world has three types
cells with the sixth version (one class each, with `file:`), and a
program cell that checks one example. Unlike the pages before, the
program runs from the start (no `expect:`), because a comment changes
nothing that runs, and the prose says so. The ids: `your-class-7--<world>`
(dewlab's) for the parent class, `your-class-7-healer--game`,
`your-class-7-room--game`, `your-class-7-lander--solar-system` and
`your-class-7-mission--solar-system` (new), and
`your-class-7-program--<world>` (new, `DECISIONS.md` 26). The task asks
for a comment on every class, and on every constructor and method a
caller would use (dewlab did not ask for `__init__`; in C#, Visual Studio
shows a constructor's comment when you type `new Probe(`, so the
constructor's parameters are where "fuel in kilograms, from 0 up to
TankSize" belongs).

- The hints wait for runs, not errors (`after: 2 runs`, `after: 4 runs`),
  since the cell never fails. The first asks dewlab's questions; the
  second gives one comment in full.
- The solutions are dewlab's `game-7.py` and `solar-system-7.py` in C#.
  Every example in a comment has a check in the solution's program (3 in
  the game, 5 in the solar system), and every check prints
  `as the example says`. `get_health` and `get_fuel` are the properties
  `Health` and `Fuel` in C#, so their docstrings moved to the properties.
  The `//` comments on `Healer` and `Lander` became their class
  summaries, as dewlab's did. The notes keep dewlab's points, and add why
  `Name` and `ToString` have no comment.
- Game: dewlab ran doctest on `Room.standing`. The program checks a
  `Standing()` example, written with `string.Join` so that `Check`
  compares text: comparing two lists with `Equals` is practice problem 3.
- Solar system: dewlab ran doctest on `Probe.can_burn`, which the shared
  section already did. The program checks the lander's `CanBurn` after
  `Land()` instead, a three-line example, and the solution adds the
  probe's examples, with dewlab's -5 and the 70 kg boundary.
- Your own: two comment cells, as on the page before, and a line of
  prose with the shape of a `Check` call. dewlab's "hardest to put into
  words" (an idiom) became "hardest to describe".

**Wording.** Besides the changes named in this list, dewlab's "sees at
once" became "sees ... without reading its code", and "Nobody touches the
docstring" became "Nobody changes the comment": both are idioms.

**What Visual Studio shows** is new: the course map says the page ends
with one Visual Studio step. It is one section of four numbered steps,
in the style of `the-tools-around-your-code`: download the world's
program cell, rest the pointer on a documented method, start a call and
watch the parameter's text, and type `///` above a method. Each step is a
question, and a fold says what Visual Studio shows. The fold claims only
what Microsoft's page on the recommended tags says: IntelliSense shows
`<summary>`, `<param>` and `<returns>`, and typing `///` inserts
`<summary>` and puts the cursor in it. It does not claim which other tags
`///` writes (the step asks the reader to look). Not checked in Visual
Studio itself: see "What to revisit".

**Looking back and the challenge.** The question is dewlab's, with
"doctest examples" as "the examples in your comments". The challenge is
dewlab's: an example for `Mission.TotalFuel`, then a `TotalFuel` that
skips the last probe. Its starter is statements, then `Example`, a small
`Probe` and `Mission`, because a challenge opens as a new notebook and
sees nothing on this page. It prints `0` as given (probe P5), and a
check of two launched probes shows a difference once `TotalFuel` skips
the last one (probes P6 and P7). "Leaves out" became "skips" (a phrasal
verb).

**Next.** dewlab's next page is `a-front-end-for-a-class` (batch 10), so
it is *A front end*, in italics, with no link (`DECISIONS.md` 32).

**Where to read more.** dewlab gave PEP 257 and Python's doctest. The C#
page gives Microsoft's *Recommended XML documentation tags* and *XML API
documentation comments*, both on Microsoft Learn, fetched on 27 September
2026. The first lists every tag on the page, says which ones IntelliSense
shows, and says that the compiler checks `<param>` names and `cref`
(true once the documentation file is on; see "How it was checked"). The
second describes the documentation file and the `GenerateDocumentationFile`
setting. The page's H1 on Microsoft Learn reads "XML API documentation
comments comments", with the word twice; the draft cites it once.

## The practice page, problem by problem

dewlab's eight problems, in C#. Its `question` blocks become lists and
folds, or a predict. The ocean goes.

1. **Which comment helps?** dewlab's three docstrings for `heal`, as three
   `<summary>` lines. The multiple-choice `question` becomes a list and a
   fold. "count on" became "trust" (a phrasal verb).
2. **A promise for Enter.** dewlab's `Room` held characters. Here it
   holds names, so that the page needs no `Character` class, and so that
   problem 3 can use the same `Room`. `Inside()` replaces `standing()`,
   because a room of names has no health. The types cell
   (`a-promise-for-enter-1`) holds the reader's comment; the program cell
   (`-program`, new) shows the refusal. dewlab had a `solution` block
   running `help()`. A solution here would print the same as the reader's
   code, so "Compare with a solution" would show nothing, and the model
   comment is in a "one answer" fold instead. dewlab's note ("Returns
   nothing" is worth saying, since `result` will be `None`) becomes C#'s
   point: `void` says it, and `var result = hall.Enter("Ada");` does not
   compile, CS0815 (probe P8).
3. **The same names, two lists** (dewlab: "The same list, written
   differently"). dewlab's trap was that doctest compares printed text
   (`['Ada']` against `["Ada"]`). `Check` compares values, so the C# trap
   is different: two lists with the same names are two objects, `Equals`
   says they differ, and both print as their type's name. The problem
   keeps dewlab's question ("does the example pass?") as a predict on
   the first line, and the cell's second line checks the fix, with
   `string.Join` (`DECISIONS.md` 29: the fold's claim is printed by the
   cell). The fold points back to *Composition* (`Contains` and a second
   `Character("Ada", 10)`) and to *Two names, one object*. `Example` is
   written again in a types cell here, because the practice page does not
   see the lesson's cells. The program cell keeps dewlab's id; the types
   cell is `-example`.
4. **A comment that stopped telling the truth** (dewlab: "A docstring
   that stopped telling the truth", ocean). The submarine's hull limit
   becomes a bag in the game that holds up to 20 kg, with the same `<`
   for `<=`. It prints a difference for `CanAdd(20)`, and
   `as the example says` for `CanAdd(21)`. The fold keeps dewlab's answer
   (here the comment is true, so change the code) and its last two
   sentences, with "the other way round" (an idiom) said plainly. `Add`
   prints a refusal, like the chain's methods. New ids, since the world
   and class changed.
5. **Where does it go?** The fill-in-the-blank `question` becomes a list
   with gaps and a fold. C#'s answers differ from Python's (above the
   class, not inside it; `///`, not `>>>`), and the fold says so. Two
   gaps are new: `<returns>` on a `void` method, and `</code>`.
6. **From earlier: a test at the edge.** From *Testing a class*, as
   dewlab's, with "one kilogram past it" as "one kilogram more".
7. **From earlier: what the container asks.** dewlab asked what could
   make `probe.get_fuel()` and `probe._fuel` differ. In C#, a caller
   cannot read a private field at all (CS0122), so the question has no C#
   form. It is retold as a composition question with the same moral (ask
   the object; do not keep a copy): a mission that keeps its own list of
   fuel amounts at launch. After a burn of 20 kg, Voyager has 50 and the
   list still says 70 (probe P3). The fold ends with the promise a comment
   on `Fuel` can make.
8. **From earlier: one sentence for a child class** (dewlab: the
   bathyscaphe, ocean). Retold with the troll from *Inheritance* (the
   draft's `a-limit-of-its-own-4`: `MaxHealth => 20` and half damage).
   The fold's answer adds "rounded down", because `amount / 2` is
   whole-number division: a hit of 7 takes 3 (probe P4). dewlab's last
   sentence stays.

The page has no cell meant to fail, so its introduction does not mention
one.

## What C# made different, in short

- A documentation comment goes above the class or method, not inside it,
  and it is XML with tags, not free text.
- On the page, and in a new Visual Studio project, the compiler skips a
  documentation comment completely. It checks tags and names only when a
  project asks for a documentation file. Nothing in a running program can
  read the comment back, so there is no `help()`: Visual Studio's hover
  is where a comment shows.
- There is no doctest. Examples live in `<example>` and are run by a
  program that calls `Check`, so each example is written twice.
- `void` in the method's first line says "returns nothing", and the
  compiler enforces it (CS0815).
- A method can refuse by throwing, and `<exception cref="...">` names the
  exception. The class chain refuses by printing, so the page shows
  `<exception>` on `Farthest` from *Composition*.
- `Equals` on two lists compares the lists as objects, which turns
  dewlab's "text, not values" trap into "two objects, not their items".
- `get_fuel()` and `get_health()` are the properties `Fuel` and `Health`,
  so their comments go on the properties.

## What to revisit once the page UI or the browser checker exists

- **Visual Studio, for real.** The last section's fold is written from
  Microsoft's documentation, not from a session in Visual Studio. Check
  that the hover shows the summary and the `<returns>` text, that typing
  the opening bracket shows the `<param>` text, and what typing `///`
  above `CanBurn` writes (the fold says only that `<summary>` comes first,
  with the cursor inside it). Check too that a downloaded project of
  `your-class-7-program--game` contains `Example.cs` and the three world
  classes, and that the replaced `Probe` copies above do not appear in
  it.
- **Hints after runs.** The world tasks' hints use `after: 2 runs` and
  `after: 4 runs`. Check that the page counts runs of the program cell,
  and that editing the types cells above (where the reader writes the
  comments) does not need to count.
- **Code inside folds and hints.** Practice problem 2's fold holds a
  `csharp` fence, and the two "one comment, in full" hints hold an
  indented code block with `<summary>` and other tags in it. Check that
  the page renders them as code, and does not read `<summary>` as HTML
  (it would become a `<details>` summary).
- **`<summary>` in prose.** Every tag in the prose is inside backticks.
  Check the same in the rendered predict options and fold titles.
- **A solution that changes only comments.** "Compare with a solution"
  on the two world programs will show the same lines on both sides until
  the reader adds checks. The solutions are there to read, as dewlab's
  were. Check that the page shows the solution's code, not only the
  comparison.
- **Forward links (batch rule 3).** When *A front end*
  (`a-front-end-for-a-class`) exists, the "Next" line becomes a link. The
  pages this one names in italics become links when they reach
  `lessons/`.
- **The class chain's seventh version.** `a-front-end-for-a-class` copies
  it: the two solutions' classes, with their comments. Until the format
  has includes (course map, open question 2), a copy must be checked by
  hand, as above.

## Open questions for a reviewer

1. **The practice page link.** `DECISIONS.md` 32 says to link only to
   pages in `lessons/`. The tutorial links to its own practice page, as
   the `objects-inside-objects` draft does, on the reading that the two
   move into `lessons/` together. If the rule is meant strictly, it
   becomes "The *practice page*".
2. **`Example.Check`.** No page has written `Check` yet. The map says
   `building-reusable-tools` (PDP) writes it and `testing-what-a-class-does`
   (FOOP) uses it, and that a failing check says what was expected and
   what came back. This page's version is its own: a `static class
   Example`, a `string` that names the call, and `object` for the two
   values, with one line printed either way. When the testing page is
   written, one of the two should change so that FOOP has one `Check`.
   If that page's `Check` has another shape (a `bool` condition and a
   message, say), the examples section, the world programs, practice
   problems 3 and 4 and the challenge change with it.
3. **The sixth version.** `testing-what-a-class-does` is not drafted, so
   the sixth version here is dewlab's `-6.py` files applied to the fifth
   version from `objects-inside-objects`: one refusal in each world. If
   the testing page changes the classes in any other way, the six world
   cells here must follow it.
4. **Two predicts.** The opener (what `Burn(200)` does) and the teammate's
   change (which checks notice). The style guide asks for two or three.
   dewlab had none on this page, only `question` blocks. A third could go
   on "A comment for the class" ("What changes?"), which is a fold now.
5. **The sentence about assessment.** "The assessed projects in this
   course ask for the algorithm behind your methods as well as their
   code" rests on the course map's "which FOOP's skills demonstrations ask
   for". I could not read the descriptor PDF here (no PDF tools). If the
   skills demonstrations do not ask for it, that sentence goes, and the
   plan is simply good practice.
6. **Constructors in the task.** The task asks for a comment on every
   constructor, which dewlab did not ask for `__init__`. It makes the
   solutions longer. Drop it if the task is too long for the page's size.
7. **Size.** The map says M. A reader sees 13 cells, but four of them are
   long class cells (two `Probe` copies with comments, and `StarSystem`),
   and the world task has three classes to comment. If it runs over an
   hour in class, the section on exceptions could become a practice
   problem, since *Composition* already set it up.
8. **Ids.** New ids: every shared cell (`no-comments-yet-1`,
   `what-a-method-promises-1`, `examples-a-program-can-check-*`), the
   world cells other than `your-class-7--<world>`, and the practice
   page's `a-promise-for-enter-1-program`,
   `the-same-list-written-differently-example`, `a-comment-that-stopped-1`
   and `-program`. dewlab's `a-class-docstring-1` and
   `examples-python-can-check-1` have no cell here (`DECISIONS.md` 28 for
   the second), and dewlab's `question` ids have no dewsharp block.
   Rename before any class uses the pages, if wanted.
9. **"Where to read more" has two entries,** both Microsoft's. The style
   guide asks for "one thing to read or watch". Keep the tags page only?
10. **Facts in the prose that no cell prints.** That Python calls the idea
    a docstring and has doctest; that Microsoft's documentation starts
    summaries with a verb in *-s*; and what Visual Studio shows. They come
    from dewlab's page, from Microsoft Learn (fetched 27 September 2026),
    and from general knowledge, not from a run.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `Refused: Voyager cannot burn 200 kg now.`, then `70` | lesson cell `no-comments-yet-1-program` |
| with the class comment added, the same two lines | probe P1 |
| *Composition*'s `Farthest()` stopped with `ArgumentOutOfRangeException` at `_planets[0]` | probe P2 (and the `objects-inside-objects` draft's P3) |
| `Mars`, then `InvalidOperationException`, `Vega has no planets, so none is farthest.` | lesson cell `what-a-method-promises-1-program` |
| three lines ending `as the example says`; C# prints `True` | lesson cell `examples-a-program-can-check-1-program` |
| only `CanBurn(70) with 70 kg: the example says True, the code gives False` | lesson cell `examples-a-program-can-check-2-program` |
| game: the program's first line; the solution's 3 checks | lesson cell `your-class-7-program--game` and its solution |
| solar system: the program's first line; the solution's 5 checks | lesson cell `your-class-7-program--solar-system` and its solution |
| the `Standing` example takes four lines | the solution's comment on `Standing` |
| the challenge's `TotalFuel` has no example; the starter prints `0` | probe P5 |
| the challenge: a check notices a `TotalFuel` that skips the last probe | probes P6 and P7 |
| the compiler checks `<param>` names once a documentation file is asked for | the scratch build in "How it was checked" (CS1572, CS1573) |
| practice 2: `Refused: Ada is already in Hall.`, then `Ada` | practice cell `a-promise-for-enter-1-program` |
| practice 2: CS0815 and its message | probe P8 |
| practice 3: the two ``List`1[System.String]`` lines, and `Inside() as text: Ada, as the example says` | practice cell `the-same-list-written-differently-1` |
| practice 3: `Contains` did not find a second `Character("Ada", 10)` | the `objects-inside-objects` draft's probe P6 |
| practice 4: a difference for `CanAdd(20)`, and `as the example says` for `CanAdd(21)` | practice cell `a-comment-that-stopped-1-program` |
| practice 4: with `<=`, both examples hold | probe P9 |
| practice 7: 70 kg, a burn of 20, Voyager has 50, the list still says 70 | probe P3 |
| practice 8: a hit of 7 takes 3 | probe P4 (`Grog (health 7)` from 10) |

No compiler message's line or column is quoted in the prose, so none needs
checking against the page.

## Probes

Run with the NativeCheck command, passing this file. Each probe writes
every class it needs below its statements, so it replaces any class of
the same name from a probe above it (rule 4). P8 is last, because it is
meant not to compile.

### P1. Tutorial, "A comment for the class": the comment changes nothing

```csharp exec
id: p1-the-class-comment-changes-nothing
var voyager = new Probe("Voyager", 70);
voyager.Burn(200);
Console.WriteLine(voyager.Fuel);

/// <summary>
/// One space probe: a name, and fuel in kilograms. The fuel is never below 0.
/// </summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;
        }
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

### P2. Tutorial: *Composition*'s `Farthest()` with no planets

The version the reader wrote on *Composition* (its solution), with no
check for an empty list.

```csharp exec
id: p2-farthest-with-no-planets-before
expect: exception
var vega = new StarSystem("Vega");
Console.WriteLine(vega.Farthest().Name);

class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }
}

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public Planet Farthest()
    {
        Planet best = _planets[0];
        foreach (Planet planet in _planets)
        {
            if (planet.Distance > best.Distance)
            {
                best = planet;
            }
        }
        return best;
    }
}
```

### P3. Practice 7: the mission's own list of fuel, after a burn

```csharp exec
id: p3-a-copy-of-the-fuel
var voyager = new Probe("Voyager", 70);
var outer = new Mission("Outer Planets");
outer.Launch(voyager);
voyager.Burn(20);
Console.WriteLine($"Voyager: {voyager.Fuel}");
Console.WriteLine($"asking each probe: {outer.TotalFuel()}");
Console.WriteLine($"the mission's own list: {outer.TotalFuelAtLaunch()}");

class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Burn(int kg)
    {
        Fuel = Fuel - kg;
    }
}

class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();
    private List<int> _fuelAtLaunch = new List<int>();

    public Mission(string name)
    {
        Name = name;
    }

    public void Launch(Probe probe)
    {
        _probes.Add(probe);
        _fuelAtLaunch.Add(probe.Fuel);
    }

    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }

    public int TotalFuelAtLaunch()
    {
        int total = 0;
        foreach (int fuel in _fuelAtLaunch)
        {
            total = total + fuel;
        }
        return total;
    }
}
```

### P4. Practice 8: the troll takes half of a hit of 7, rounded down

`Character` is the fifth version's, from the `objects-inside-objects`
draft, and `Troll` is the `one-parent-many-children` draft's
`a-limit-of-its-own-4`.

```csharp exec
id: p4-half-a-hit-rounded-down
var grog = new Troll("Grog", 10);
grog.TakeDamage(7);
Console.WriteLine(grog);

class Character
{
    public virtual int MaxHealth => 10;

    public string Name;
    public int Health { get; protected set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }
}

class Troll : Character
{
    public override int MaxHealth => 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

### P5. The challenge, as given

```csharp exec
id: p5-the-challenge-as-given
var outer = new Mission("Outer Planets");
Console.WriteLine(outer.TotalFuel());

static class Example
{
    public static void Check(string call, object expected, object actual)
    {
        if (Equals(expected, actual))
        {
            Console.WriteLine($"{call}: {actual}, as the example says");
        }
        else
        {
            Console.WriteLine($"{call}: the example says {expected}, the code gives {actual}");
        }
    }
}

/// <summary>One space probe: a name, and fuel in kilograms.</summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }
}

/// <summary>A mission, and the probes it has launched.</summary>
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    public Mission(string name)
    {
        Name = name;
    }

    /// <summary>Adds a probe to the mission.</summary>
    /// <param name="probe">Any probe.</param>
    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    /// <summary>Adds together the fuel of every probe in the mission.</summary>
    /// <returns>The total, in kilograms. 0 for a mission with no probes.</returns>
    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }
}
```

### P6. The challenge, one answer: an example for two probes

The classes are P5's (rule 2), so this probe has statements only.

```csharp exec
id: p6-the-challenge-with-an-example
var outer = new Mission("Outer Planets");
outer.Launch(new Probe("Voyager", 70));
outer.Launch(new Probe("Juno", 50));
Example.Check("TotalFuel() with 70 kg and 50 kg", 120, outer.TotalFuel());
```

### P7. The challenge: `TotalFuel` skips the last probe, and the check notices

```csharp exec
id: p7-the-challenge-skips-the-last-probe
var outer = new Mission("Outer Planets");
outer.Launch(new Probe("Voyager", 70));
outer.Launch(new Probe("Juno", 50));
Example.Check("TotalFuel() with 70 kg and 50 kg", 120, outer.TotalFuel());

class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    public Mission(string name)
    {
        Name = name;
    }

    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    public int TotalFuel()
    {
        int total = 0;
        for (int i = 0; i < _probes.Count - 1; i++)
        {
            total = total + _probes[i].Fuel;
        }
        return total;
    }
}
```

### P9. Practice 4, with `<=`: both examples hold

```csharp exec
id: p9-the-bag-with-less-than-or-equal
var bag = new Bag();
Example.Check("CanAdd(20) with an empty bag", true, bag.CanAdd(20));
Example.Check("CanAdd(21) with an empty bag", false, bag.CanAdd(21));

class Bag
{
    public int MaxWeight => 20;
    public int Weight { get; private set; }

    public bool CanAdd(int kg)
    {
        return Weight + kg <= MaxWeight;
    }

    public void Add(int kg)
    {
        if (!CanAdd(kg))
        {
            Console.WriteLine($"Refused: the bag cannot take {kg} kg more.");
            return;
        }
        Weight = Weight + kg;
    }
}
```

### P8. Practice 2: storing what a `void` method returns (CS0815). Last, because it does not compile

```csharp exec
id: p8-storing-what-enter-returns
expect: CS0815
var hall = new Room("Hall");
var result = hall.Enter("Ada");

class Room
{
    public string Name;
    private List<string> _names = new List<string>();

    public Room(string name)
    {
        Name = name;
    }

    public void Enter(string name)
    {
        if (_names.Contains(name))
        {
            Console.WriteLine($"Refused: {name} is already in {Name}.");
            return;
        }
        _names.Add(name);
    }
}
```
