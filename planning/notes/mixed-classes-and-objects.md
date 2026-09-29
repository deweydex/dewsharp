# mixed-classes-and-objects: notes for a reviewer

A new page, written on 28 September 2026 from its entry in
`planning/COURSE_MAP.md` (FOOP lesson 12, batch 4, action *new*, shape
*mixed set*, size M, worlds game and solar system, covers FOOP-LO2, LO3,
LO4, LO5 and LO7, from dewlab's `mixed-programming-with-objects`, "its
problems 1 to 3 and 5 to 8"). It is the last page of FOOP's second series,
Classes and objects, after `objects-and-classes`,
`the-moves-you-already-know`, `the-tools-around-your-code`,
`keeping-details-inside-an-object`, `one-class-many-methods` and
`from-a-description-to-classes`, and before `one-parent-many-children`. A
mixed set has no practice page (`COURSE_MAP.md`, "Practice pages and mixed
sets"), so there is none.

Files:

- `lessons/mixed-classes-and-objects/mixed-classes-and-objects.md`: the
  page, version `2026.09.28.2`. Seven problems, a "Looking back" question,
  a challenge in each world, one reading. 24 `csharp exec` cells, 12 in
  each world (6 types cells and 6 program cells); a reader sees 12. 6
  predicts (3 in each world), 20 hints, 14 solutions (problem 4 has two in
  each world), 10 `inputs` blocks, 14 answer folds (all inside a world),
  2 challenges. One program in each world is meant to stop with an
  exception (`expect: exception`), and the problem says so before the
  reader runs it. No cell is meant not to compile.
- `lessons/mixed-classes-and-objects/mixed-classes-and-objects.outputs.json`,
  written by `npm run check-lessons -- --write mixed-classes-and-objects`.
- This file.

The version is `.2` because cell code changed once after the first
recording, on the same day: trailing comments on long lines (a
constructor in problem 1, the solutions of problems 3, 5 and 6, and four
methods in the challenges) moved onto a line of their own, so that they
neither wrap in a cell nor run past the edge of a challenge at the page's
reading width. That moved `Label`'s `return` from line 21 to line 22, and
the folds of problem 1 quote the new number. No cell id changed. Nobody
has used the page.

## The brief, and where each part is

| The course map asks for | Where |
|---|---|
| A mixed set, size M (8 to 15 cells, about an hour) | Seven problems, 12 cells a reader sees |
| "The half of dewlab's mixed set that the pages up to designing classes can answer" | Every problem needs only this series and the first; see "Decisions", 1 |
| dewlab's problems 1 to 3 and 5 to 8 | Problems 1 to 7 here, in the same order; see "What came from dewlab" |
| In C# and in the two worlds | Game and solar system, in every problem, the same size in both |
| Covers FOOP-LO2, LO3, LO4, LO5, LO7 | LO2 (the fundamental instructions): problems 4, 5 and 6 (selection, a loop, input). LO3 (classes, objects, methods, fields, encapsulation, abstraction): problems 1, 2 and 3. LO4 (modular, reusable code): problems 3 and 6 (what a class gives out; one method split into two, so that a test and a menu can both use it). LO5 (the IDE): problem 1 (reading an exception report, and the debugger steps for Visual Studio), and **Download project** in the introduction. LO7 (modelling): problem 7 and the challenge |

| Problem | Kind | Needs | Cell meant to fail |
|---|---|---|---|
| 1. An object with no name | Fix | `objects-and-classes` (constructors), `one-class-many-methods` (a second constructor, `: this(...)`, a static field), `the-tools-around-your-code` (read the report, then ask where each value on the line came from; `null`) | `an-object-with-no-name-1-program` (`expect: exception`) |
| 2. A limit that moved | Predict, then Fix | `one-class-many-methods` (static and instance fields), `objects-and-classes` (constructors), `keeping-details-inside-an-object` (a property with a private `set`) | none |
| 3. A list that grows by itself | Predict, then Fix | `keeping-details-inside-an-object` (private, a property whose `get` has a body), `one-class-many-methods` (a private list with a rule), two names for one list (`objects-and-classes-practice` and `from-a-description-to-classes-practice`, "From earlier") | none |
| 4. The test that finds the slip | Make, then Fix | `the-moves-you-already-know` (selection), `one-class-many-methods` (a method that answers a question), test data at a limit (`mixed-starting-in-csharp`, problem 4, and `reading-input`) | none |
| 5. An example that is almost true | Predict, then Fix | `the-moves-you-already-know` (a loop in a method; the game's `Backpack` and the solar system's `Planet` with moon widths), whole-number division (`from-python-to-csharp`), a method's return type | none |
| 6. Two jobs in one method | Explain, then Make | `reading-input` (`ReadLine`), `one-class-many-methods` (a method with a parameter), `from-a-description-to-classes` (which class has which job) | none |
| 7. Class, field, list or enum? | Explain | `from-a-description-to-classes` (nouns, enums, records, cards), `one-class-many-methods` (a list of objects in a class) | no cell |

## Decisions, and why

1. **The problems keep dewlab's ideas and are rebuilt for this series.**
   The entry names dewlab's problems 1 to 3 and 5 to 8, and it also says
   the page is the half that the pages up to designing classes can
   answer. Those two do not agree: dewlab's problems 1, 2 and 8 need
   inheritance (`super`, a child's class attribute, "is a"), 5 a test,
   6 a doctest, and 7 a front end. So each problem keeps the dewlab
   problem's point and gets a new body that needs only this series:
   - 1, a child's constructor that never calls its parent's, became a
     second constructor that never calls the first (`: this(...)`, from
     `one-class-many-methods`). The point stays: the mistake is in a
     constructor, and the report names a later method that reads the
     field.
   - 2, a method that reads a class value where the object's own was
     wanted, became a static limit that each constructor writes, so the
     last object made sets the limit for all.
   - 3, a list that a caller changed after passing it in, became a list
     that a property gives out. Passing a list in is already on two
     practice pages of this series, and on `mixed-programming-with-objects`
     problem 3, so the page takes the other direction.
   - 5, a boundary test, stays a boundary test, on a new method in each
     world (`IsBadlyHurt`, `IsLow`), with the tests in the program.
   - 6, a doctest that says `35` where Python gives `35.0`, became a
     comment whose example says 2.75 (4213.5) where C# gives 2 (4213):
     whole-number division inside a method that returns a `double`.
   - 7, two jobs in one function, stays, with a class method that reads
     the keyboard, and a cell that runs.
   - 8, class, child, container or flag, became class, field, list or
     enum: the same shape of description, with no child classes, since
     inheritance is the next page. The answer names that page as the
     third answer.
2. **Not a copy of `mixed-programming-with-objects`.** That page (FOOP
   lesson 24) already has dewlab's problems 1 to 3 and 5 to 8 in C#, with
   inheritance, XML comments and a front end. Repeating them here would
   give a reader the same problems twice. So no problem on this page is
   one of that page's, and its problems 6, 7, 9 and 12 read as a second,
   deeper visit to problems 4 to 7 here. See "Open", 1.
3. **Ids are this page's own.** No task is the same as a dewlab cell's, so
   no dewlab id is kept (`DECISIONS.md` 9 keeps an id when the task is the
   same). Each problem's types cell is `<slug>-1--<world>` and its program
   `<slug>-1-program--<world>` (decision 26). "An example that is almost
   true" follows `mixed-programming-with-objects`, which changed dewlab's
   "almost right" (a verdict word in a heading).
4. **Both worlds, the same size, and no "your own".** The entry names two
   worlds. Each problem has a game and a solar-system variant with the
   same shape, the same number of cells and blocks, and its own story and
   numbers. Folds are inside each world, because each quotes that world's
   output. The page teaches in the game first. A reader whose last world
   was "your own" meets the game (decision 36).
5. **The classes are the world's own, cut to the problem.** Problems 1, 2,
   4 and 6 start from `Character` or `Probe` as `one-class-many-methods`
   left them (the third version: a static `MaxHealth` or `TankSize`, a
   property with a private `set`), with only the parts the problem needs
   and one change somebody made. Problems 3 and 5 use classes the series
   met: the game's `Backpack` and the solar system's `Planet` with moon
   widths (`the-moves-you-already-know`), and `Planet` with a private list
   of moons (`one-class-many-methods`). The page does not make a version
   of the class chain; `one-parent-many-children` starts from the third
   version.
6. **Kinds are labelled**, as on `mixed-starting-in-csharp`, the mixed set
   before this one in FOOP, with the same four kinds and the same words in
   the introduction.
7. **Each task is written before its cell.** The page shows hints and
   solutions directly under a cell, so text between a cell and its blocks
   appears after **A solution** (`mixed-starting-in-csharp` notes, 10).
   For the predict-then-fix problems the question before the cell does not
   give the answer away: "can you change `Character`, so that the program
   does what its author meant?", "so that a character never carries more
   than three things?", "if the code and its comment do not agree".
8. **Three predicts in each world**, on problems 2, 3 and 5, where C# does
   something a reader may not expect: a constructor that changes a static
   limit, a get-only property whose list can still be changed, and an
   `int` division inside a `double` method. Each option is a whole output
   line, or "It does not compile", so the page can compare a guess with
   the line the question names (`first`, `last`, or the whole output). No
   option is marked, and each note is a reason or a question.
9. **Problem 1 has no predict.** The style guide asks the prose to say
   that a cell is meant to stop with an exception before it runs, and
   then a guess has little left to find. The fold quotes the report as the
   page shows it (checked in the browser, below).
10. **Problem 4 has the tests in the program, and two solutions.** The
    first solution adds the tests at the boundary and just past it, and
    runs against the class as the page gives it, so its recorded output
    has the line that finds the slip (`Alan, 3 health: False, expected
    True`; `Pioneer, 10 kg: False, expected True`). The second adds the
    fix. *Test* is defined where it appears, since *Testing a class*
    (`testing-what-a-class-does`) comes later.
11. **Problem 6 reads input, so it has `stdin:` and no `inputs` block.**
    The checker's answers are `attack` then `rest`, and `burn` then
    `photo`; the solution notes quote what the program printed with them
    and say which answers gave it. The solutions call `Act` with no input.
12. **Every solution writes its class again below its program** (rule 4),
    so **Compare with a solution** uses the solution's class.
13. **No warnings, no compiler errors.** No cell, solution or challenge
    gives a warning, so nothing travels down the page (decision 30), and
    "Looking back" can say that every program compiled.
14. **A "Looking back" question**, as the tutorials have, about what showed
    each problem: a report, an output, or a test. It has no fold.
15. **The challenge continues problem 7.** It is the first answer's design
    as a skeleton (the enum, `Pet` or `Spacecraft`, `Hero` or `Team`), with
    `throw new NotImplementedException();` in each method, as
    `from-a-description-to-classes` writes skeletons. The checker compiles
    it alone. It does not use a room that asks each character a question,
    which is dewlab's problem 4 and `mixed-programming-with-objects`
    problem 4, left for after *Composition*.
16. **One reading.** Microsoft, *Use constructors (C# programming
    guide)*: fetched (HTTP 200); its `<h1>` is "Use constructors (C#
    programming guide)", and it has a class with three constructors
    (`Employee`), a constructor that calls another with `this`, and
    `base`, and it writes some members with `=>`, as the page says.
17. **Terms defined here**, although the series defined most of them:
    `ToUpper()`, *test*, *boundary*. `null` is used as
    `the-tools-around-your-code` defines it ("no object at all").

## What came from dewlab

From `tutorials/mixed-programming-with-objects/mixed-programming-with-objects.md`
(version 2026.09.26.1):

- The introduction's first two sentences ("Every problem here draws on
  more than one page of this series, and none of them says which ... a
  skill of its own, apart from writing any one of them").
- Problems 1, 2, 3, 5, 6, 7 and 8, as ideas, rebuilt (see "Decisions", 1).
  The headings keep dewlab's where the idea is the same: "The test that
  finds the slip", "Two jobs in one method" (dewlab: function), "An
  example that is almost true" (dewlab: almost right), and "A list that
  grows by itself" (dewlab: a squad).
- Problem 5's answer ("the two comparisons disagree only at the boundary,
  so a test belongs there"), problem 7's answer (ask and decide in one
  place; split it so that a menu, a prompt or a test can use it), and
  problem 8's answer (moving an animal is two method calls, and the
  animal never changes; another answer has no child classes, only a
  field).

## Left out

- dewlab's problem 4 (a container that asks each object a question) and
  problem 9 (one more rule, the whole way through): the entry leaves them
  out. They need *Composition* and the whole course.
- The ocean world, and "your own" (the entry names two worlds).
- Inheritance, doctest and the front end, which the dewlab problems used:
  later pages.
- A read-only list (`IReadOnlyList<string>`, `AsReadOnly()`) as a third
  fix for problem 3: it needs an interface, which *Interfaces*
  (`many-classes-one-promise`) teaches. The fold gives a copy, and a
  design with no list at all.

## How it was checked

- **The browser checker.** `npm run check-lessons -- --write
  mixed-classes-and-objects`: 50 runs, no problems. Then
  `npm run check-lessons -- mixed-classes-and-objects`, without `--write`:
  "1 page(s), 50 runs: no problems." Both challenges compile alone.
- **Every number and quoted output** in the prose, the folds and the
  solution notes was copied from the outputs file after the last
  `--write`: the report's lines (22 and 4), each first or last line the
  predicts ask about, each solution's output, and the values of the
  `inputs` that the solution notes of problem 5 mention (5 for Grace's
  backpack, 17 for Mars, both ways). The numbers in the stories (8 and 10
  health, a limit of 30, 70 kg, the moon widths, 2.75 and 4213.5 in the
  comments) are values in the code.
- **The parser** (`web/lesson/parse.js`) reads the page with no errors,
  and attaches each predict, hint, `inputs` and solution to the program
  cell intended.
- **The page itself**, in headless Chromium through `tools/serve.mjs`, in
  each world: 12 cells on show, each types cell labelled `TYPES` with its
  file name and each program cell `PROGRAM` with `Program.cs`; every
  `lesson:` link answers 200; no errors in the console. Running problem
  1's program shows the report exactly as the fold quotes it, in both
  worlds.

## Open

Questions only Josh can settle.

1. **Two pages from the same dewlab problems.** The course map gives
   dewlab's problems 1 to 3 and 5 to 8 to this page and all of dewlab's
   problems to `mixed-programming-with-objects`, which already translates
   them. This page rebuilds the ideas for the series before inheritance,
   so that no problem appears twice (Decisions, 1 and 2). Is that what the
   map meant? The other choices: this page takes the problems themselves
   and the last page drops them, or the map's entry for this page names
   new problems.
2. **Labels for the kinds of problem.** This page and
   `mixed-starting-in-csharp` label each problem (Predict, Fix, Make,
   Explain); `mixed-first-programs` and `mixed-programming-with-objects`
   do not. Should every mixed set label them, or none?
3. **No "your own" world on a mixed set whose series has one.** Every
   tutorial in Classes and objects offers "your own"; the entry gives this
   page two worlds, and a reader in their own world meets the game. Is a
   "your own" variant wanted for any problem (for example, problem 7 on
   the reader's own description)?
4. **LO5 on this page** rests on reading an exception report and on the
   optional Visual Studio debugger steps in problem 1. Is that enough to
   list FOOP-LO5, or should the page have a Visual Studio task of its own?

For a later batch, not questions: `courses/foop.yaml` still lists this
page under `planned:`, and `from-a-description-to-classes` names it in
italics, *Mixed problems*; both can change now that the page is in
`lessons/` (decisions 32 and 39). This page links only to pages in
`lessons/`.

## Review

Reviewed on 29 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one (the series Starting in C#,
then `objects-and-classes` to `from-a-description-to-classes`, with their
practice pages), once as a teacher against the course map's entry, and
then line by line against the checklists in `docs/TRANSLATING.md` and the
style guide.

The page does what its entry asks, and the writer's reasons for
rebuilding dewlab's problems hold: every problem needs only the pages
before inheritance. Every term is defined on this page or on an earlier
page of the series, with the same word: *the line that failed*, *exception
report*, `null` as "no object at all" and **Locals** (`the-tools-around-your-code`),
*property*, *getter* and a `get` with a body (`keeping-details-inside-an-object`),
*static field*, *instance field* and `: this(...)` (`one-class-many-methods`),
*enum*, *skeleton* and *responsible* (`from-a-description-to-classes`),
*test data* (`reading-input`), and a copy made with
`new List<string>(...)` (`from-a-description-to-classes-practice`,
problem 9). *Test*, *boundary* and `ToUpper()` are defined here. Each
program cell works on its own and uses only the types cell above it in
its world; each solution writes its class again below its program (rule
4). The three predicts in each world name their line or are about a cell
with one line of output, and each has the recorded line among its
options. The one cell meant to stop with an exception has
`expect: exception`, and the problem says so before the run. Solutions
and `inputs` sit on the program cells; problem 6, which reads input, has
`stdin:` and no `inputs`. The recorded outputs have no diagnostics, so
"Looking back" is right to say that the compiler reported nothing in
problems 1 to 5. The reading was fetched again (HTTP 200, the same
`<h1>`, the `Employee` class with three constructors, one with
`: this(...)`, and members written with `=>`).

### What I changed in the page

`version:` went from `2026.09.28.2` to `2026.09.29.1`, because the
solutions of problem 6 changed, and the page was recorded again with
`--write`. The new outputs file differs from the writer's only in its
`version` line and in the two solutions of problem 6. Every other output
is the same, so every other number the prose quotes still holds. No cell
id changed.

1. **Problem 6's solutions were not tests, in the page's own sense.**
   Problem 4 defines a *test* as a run of a method "with a value whose
   answer you know before you run it", which "shows the answer it gave
   beside the answer that was expected". Problem 6's solution is titled
   "a method that decides, and a test", and its fold says "a test calls
   it with each choice, as the solution does", but the solution only
   printed the two objects. Each solution now calls `Act` once for each
   choice and prints the value beside the value expected, in problem 4's
   form: `attack: troll health 9, expected 9` and
   `rest: Ada health 8, expected 8`; `burn: fuel 60 kg, expected 60 kg`
   and `photo: photos 1, expected 1`. The solution notes quote those
   lines from the outputs file, and say that they are the values the
   program gives when you type `attack` then `rest` (`burn` then
   `photo`). The old note ended "and nobody typed anything" after a list
   of outputs that the typed run also prints, which read oddly.
2. **A teacher's fold, "which pages each problem uses"**, after "Where to
   go next", as `mixed-first-programs`, `mixed-programming` and
   `mixed-starting-in-csharp` have. The page listed the six pages of the
   series but not which problem needs which, so a teacher meeting the
   page could not see it at once. Two pages from the first series are in
   the table where a problem needs them (`reading-input` for test data
   and `ReadLine`, `from-python-to-csharp` for whole-number division).
   Problem 3 links to the practice page of Designing classes, where the
   copy with `new List<string>(...)` was met.
3. **Phrasal verbs.** "what type of value comes back" (problem 5, both
   worlds) became "the type of the value that the method returns"; "the
   choice comes in as a parameter" became "the choice is one of its
   parameters" ("is its parameter" in the solar system); "asks, and
   passes each answer on" became "the statements ask the question, and
   pass each answer to `Act`"; "the program talks to the person" became
   "the program asks the player" ("asks mission control").
4. **Problem 5's fold.** "Only after that does `return` turn the answer
   into a `double`" is an inverted sentence, hard for a reader in a
   second language; it is now "Then `return` turns that whole number
   into a `double`, and a `double` of 2 prints as `2`" (4213 in the
   solar system). "Which Visual Studio shows beside every call to the
   method" was not what `documenting-a-class` shows (a summary when the
   pointer rests on a name, and while a call is typed); it now uses that
   page's own words, "wherever the method is used".
5. **Problem 4.** "Both show what was expected" could mean that each
   line prints the word *expected*, which every line does. It is now
   "Both give the answer that was expected", and the solution notes say
   "gives the answer that was expected" in the same way. The first
   solution's note used *boundary*, which is defined in the answer fold
   below it, and the page shows solutions directly under the cell, so a
   reader could meet the word before its definition; the note now says
   "at 4 health, is one more than 3" (11 and 10 in the solar system).
6. **Problem 1's fold.** "The fix is one line", followed by a solution
   whose second constructor has an empty body, left a reader to wonder
   where `Health = MaxHealth;` went. It now says the fix adds one line,
   and that the old line "has nothing left to do, so the solution
   deletes it". "So ask where `Name` gets its value." was an order to
   think; it is a question now. The Visual Studio steps named no file
   and asked "which fields have a value" at a moment when neither line
   had run, so `Health` showed 0 and `Name` `null`; they now say which
   file holds the breakpoint, and add F10 (stepping, from
   `the-tools-around-your-code`), so the reader sees `Health` change and
   `Name` stay `null`.
7. **Problem 2.** "no character could have more than `MaxHealth` health:
   10" became "no character could have more health than `MaxHealth`,
   which is 10" (and "which is 100" for the tank). The solar-system fold
   had no counterpart of the game's pointer to *Inheritance*, although
   "Where to go next" says that page gives problem 2 another answer; it
   now has one (`one-parent-many-children` makes `TankSize` a virtual
   property, "ready for a child with a bigger tank").
8. **Problem 3.** The fold explained the aliasing with "A `List` is a
   class, so `return` gives the caller the same list": the link between
   *class* and *not copied* is taught later (`two-names-one-object`). It
   now points to what the reader has met: "`return` gives the caller the
   list itself, never a copy, in the same way as a list passed to a
   method or to a constructor" (`objects-and-classes-practice`, problem
   8; `from-a-description-to-classes-practice`, problem 9). The second
   hint asked "Where could that line go?" about an expression, not a
   line; it now asks "Where in `Character` could it go?" (`Planet`).
9. **Problem 7.** "has one home" (a figure of speech) became "lives in one
   place", as `objects-and-classes` says of a rule. The solar-system
   description opened "Mission control keeps a record of its
   spacecraft", and *record* is a C# type the reader met on
   `from-a-description-to-classes`, in a problem that asks which C#
   construct each noun becomes; it now opens "Mission control watches
   many spacecraft". The answer called mission control "the people who
   use the program"; it now uses `from-a-description-to-classes`'s words,
   "the team that uses the program".
10. **The introduction** ended "That is a skill of its own, apart from
    writing any one of them"; it now says "Deciding what a problem needs
    is a skill of its own", as `mixed-starting-in-csharp` does.
    `ToUpper()` "gives a string in capital letters" became "gives the same
    text in capital letters" (problem 1, both worlds).

Three long source lines in problem 2 were wrapped again; nothing a reader
sees changed there.

### Checked, and left as it was

- Every number and quoted output in the prose, the folds and the solution
  notes, against the new outputs file: the report's lines 22 and 4, and
  its text, in both worlds; `Ada (health 13)`, `Troll (health 30)`,
  `Voyager (fuel 120 kg)`, `Juno (fuel 450 kg)` and the solutions' 10 and
  100; the two refusals and the lines with 3 and 4 things (2 and 3
  moons); the four test lines of each world's two solutions in problem 4;
  `2`, `2.75`, 5 for Grace's backpack, `4213`, `4213.5` and 17 for Mars;
  the four new lines of problem 6. The other numbers in the prose (8, 10,
  25, 30, 70, 400, 500, 50, the weights and widths, 3 and 10 as limits)
  are values written in the code.
- No *right*, *wrong*, *correct* or *well done*; no ticks. *Mistake* and
  *slip* are used as `the-tools-around-your-code` uses them. Irish and
  British spelling (*kilometres*, *refuelled*, *programme* for the space
  programme).
- The predicts: three in each world, at the points where C# does
  something a reader may not expect, as the writer chose. Problem 1 has
  none, for the writer's reason (decision 9).

### Open, for Josh

The writer's four questions stand as they are ("Open", 1 to 4). Two
notes to go with them:

- On question 4 (LO5): the Visual Studio steps in problem 1 now include
  stepping as well as a breakpoint and the Locals window, but they are
  still optional and inside a fold. If LO5 needs a Visual Studio task
  that every learner does on this page, it is a new problem, not a change
  to problem 1.
- On question 2 (labels): the page now has the teacher's fold that three
  of the four other mixed sets have, so the labels are the only
  difference in shape left between this page and `mixed-first-programs`.

Still for a later batch, as the writer said: `courses/foop.yaml` lists
this page under `planned:`, and `from-a-description-to-classes` names it
in italics without a link. This review did not touch either file.
