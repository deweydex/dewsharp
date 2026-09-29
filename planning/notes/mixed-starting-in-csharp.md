# mixed-starting-in-csharp: notes for a reviewer

A new page, written on 28 September 2026 from its entry in
`planning/COURSE_MAP.md` (FOOP lesson 5, batch 5, action *new*, shape
*mixed set*, size S, worlds game and solar system, covers FOOP-LO1, LO2,
LO5 and LO10). It is the last page of FOOP's first series, Starting in C#,
after `from-python-to-csharp`, `compiler-errors`, `types-and-their-sizes`
and `reading-input`, and before `objects-and-classes`. A mixed set has no
practice page (`COURSE_MAP.md`, "Practice pages and mixed sets"), so there
is none.

Files:

- `lessons/mixed-starting-in-csharp/mixed-starting-in-csharp.md`: the page,
  version `2026.09.28.3`. Six problems. 12 `csharp exec` cells, 6 in each
  world, all program cells; a reader sees 6. 4 predicts (2 in each world),
  24 hints (22 before the review), 12 solutions (problem 4 has two in
  each world), no `inputs` blocks, 5 answer folds (shared by both
  worlds), 1 fold of pages for a teacher (added in the review), 2
  challenges (one in each world), 2 Python fences to read (problem 1, one
  in each world). Three
  cells in each world are meant not to compile, each with `expect:` and a
  sentence before it that says so (see the table below).
- `lessons/mixed-starting-in-csharp/mixed-starting-in-csharp.outputs.json`,
  written by `npm run check-lessons -- --write mixed-starting-in-csharp`.
- This file.

The version is `.3` because cell code changed twice after the first
recording, on the same day: a comment in problem 4 (*percent* became
Irish spelling, and then a shorter comment), and shorter output lines in
problems 3, 4 and 5, so that no line wraps in the editor at the page's
reading width. No cell id changed. Nobody has used the page.

## The brief, and where each part is

| The course map asks for | Where |
|---|---|
| A short set (size S: under eight cells, about half an hour) | Six problems, six cells a reader sees |
| For FOOP readers | Problem 1 puts a Python program beside the C#; the introduction says that a reader who took PDP in C# can use the page as a quick check (the FOOP teacher notes say so) |
| Problems that mix types, conversions, compiler errors and input | Each problem needs at least two pages of the series (table below) |
| In the FOOP worlds | Game and solar system, in every problem that has a cell; the frontmatter's descriptions are the FOOP pages' own |
| Draws on `mixed-programming` and `mixed-instructions-for-a-machine` | See "What came from dewlab" |
| Covers FOOP-LO1, LO2, LO5, LO10 | LO1 (data types): problems 2 to 5. LO2 (the fundamental instructions): problems 4 and 5, and the challenge. LO5 (the IDE: troubleshooting compiler errors, the course map's row for it): problems 1 to 3, and the paragraph on **Download project** and Visual Studio's Error List. LO10 (debug and test): problems 2, 4, 5 and 6 |

| Problem | Kind | Needs | Cells meant to fail |
|---|---|---|---|
| 1. A method that never runs | Predict, then Fix | `from-python-to-csharp` (methods, parameters, arguments), `compiler-errors` (reading a message, one change at a time) | `a-method-that-never-runs-1` (CS0201) |
| 2. A number typed as text | Predict, then Fix | `reading-input` (`ReadLine` returns a string, `TryParse`), `from-python-to-csharp` and its practice page (`+` joins text), `compiler-errors` (a new code, CS0019) | `a-number-typed-as-text-2` (CS0019) |
| 3. Too large for an int | Fix | `types-and-their-sizes` (`long`, what a cast keeps), `compiler-errors` (CS0266, and a message whose suggestion is not the answer), `/` and `%` | `too-large-for-an-int-1` (CS0266) |
| 4. The test data that finds it | Fix | `types-and-their-sizes` (`byte`, a cast that keeps only the part that fits), `reading-input` (test data at the limits, from its "Looking back"), a loop over an array | none |
| 5. A number the person chooses | Make | `reading-input` (`do`...`while`, a flag, `TryParse` and a range), problem 3's `long`, and a division that 0 would stop | none |
| 6. Which kind of problem was it? | Explain | The three things that can happen when you press Run, over problems 1 to 5 | no cell |

## Decisions, and why

1. **The problems are written to this series, not translated.** The
   action is *new*. dewlab's two sources are for Python readers, and most
   of their problems need a toolkit (`digit_at`, `to_binary`,
   `pixel_row`), a later page (sorting, dictionaries, binary search), or a
   Python surprise that C# does not have. So each problem takes an idea
   or a shape from a dewlab problem and is rebuilt around what the four C#
   pages teach. See "What came from dewlab".
2. **`from: mixed-instructions-for-a-machine`.** The entry lists
   `mixed-programming` first. But more of this page comes from the Dewey
   Track set: the problem kinds (Predict, Make, Fix, Explain), a function
   named and not called (its problem 4), a number that arrives as text
   (its problem 12), a promise that holds only inside its space (its
   problem 13), and a whole number too large for its type (its problem 15,
   where Python does not mind and "an ordinary whole number stops at 64
   bits" in many languages). From `mixed-programming` came the
   introduction's first paragraph and the idea of a decision that the
   question does not make (problem 4's "Should the hero leave the other
   coins in the room?").
3. **Every problem with a cell is in both worlds, and the numbers match.**
   The entry says the page is in the FOOP worlds. Problems 1 to 5 each
   have a game variant and a solar-system variant of the same size, as the
   teacher notes ask ("the task is the same size in each"). Problem 4 uses
   the same numbers in both (60, a limit of 100, tests 10 and 30), so a
   teacher has one set of answers. Problem 6 is the same in both worlds,
   and its answer names no world's numbers. There is no "your own"
   variant: the entry names two worlds, and no problem here grows a class.
   The first world, game, is the one the page teaches in.
4. **No classes.** The page comes before `objects-and-classes`, so it uses
   only rule 1, in the words the early pages use ("Each Run starts a new
   program, so each cell makes the values it uses"), and never says
   "rules". The world objects are plain variables: a hero's `health`, a
   probe's `fuel`. The two methods in problem 1 are `static` local
   methods in a program cell, as `from-python-to-csharp` writes them.
5. **The names and numbers agree with the FOOP pages.** Ada is the game's
   hero (`objects-and-classes`); Juno with 12 kg of fuel is
   `objects-and-classes`' second probe. The speed of light is written as
   `one-class-many-methods` writes it, 299,792 km a second. The solar
   problems avoid the light-minutes to Neptune, because that is the
   opening predict of `one-class-many-methods`, and use Voyager 1
   instead: about 25,000,000,000 km from Earth (real, rounded), and about
   17 km a second (real, rounded).
6. **Problem 2 has two cells, so that its message is recorded.** The `-`
   version is a cell of its own with `expect: CS0019`, not an invitation
   to change `+` in the first cell, so that the message the fold quotes is
   in the outputs file. The fold quotes it without its place, because the
   column differs between the worlds (36 in the game, 28 in the solar
   system).
7. **Problem 3 lets the compiler lead.** Its first message suggests a
   cast; a cast of this constant does not compile either (CS0221, probe
   `p-hoard-cast`), and `long` on line 1 brings new CS0266 messages on the
   lines that divide (probes `p-hoard-long1`, `p-voyager-long1`,
   `p-voyager-long2`). The fold says what happens in words and quotes no
   message that no cell on the page records.
8. **Problem 4 puts the test data in the program.** A cell that reads
   input can't have an `inputs` block, and a reader's own typing is never
   recorded, so the numbers in the solution notes would have had no
   source. An array of test values and a loop make the output a small
   table: every value the notes quote is in a solution's recorded output,
   and the reader practises the habit (choose values at a limit and just
   past it) with the same lines. The first solution is the buggy program
   with more test data ("test data that finds it"); the second is the fix.
   Two kinds of answer nobody meant: past the purse's limit (101) and past
   the `byte`'s (0 and 4).
9. **Problem 5 starts from problem 3's fixed program.** Each program cell
   works on its own, so its starter repeats problem 3's lines with `long`.
   That shows problem 3's answer to a reader who skips it; the page says
   "Here is the hoard from problem 3 again, in a `long`". The loop is the
   `do`...`while` with a flag from `reading-input`, and its hints use the
   same words. The third hint no longer names CS0165 or CS0103 (as
   `reading-input`'s do), because this page records neither.
10. **Each task is written before its cell.** The page shows a cell's
    hints and its solution directly under the cell, wherever the fences
    are in the Markdown. Text written between a cell and its solution
    fence therefore appears after **A solution**. So each task question is
    in the paragraph before its cell, and the explanation is in a fold
    after the problem, as `mixed-programming-with-objects` does.
11. **Kinds are labelled.** Each problem opens with its kind in bold, as
    dewlab's Dewey Track mixed set does, and the introduction lists the
    four kinds. `mixed-programming-with-objects` and `mixed-first-programs`
    do not label their problems; see "Open".
12. **A challenge, one in each world.** The style guide asks every page for
    a challenge; the two other finished mixed sets have none. This one is
    a menu for problem 4's purse or battery, which draws on every page of
    the series. It compiles alone (recorded under `challenges`).
13. **One reading.** Microsoft's *Casting and type conversions*: fetched
    (HTTP 200); its sections are implicit conversions, explicit
    conversions, conversions with helper classes (`Parse`, `Convert`) and
    exceptions at run time, and it opens with CS0029. The page says it
    mentions conversions between classes, which it does (base and derived
    classes, interfaces).
14. **Terms defined where they first appear on this page**, although the
    series defined them: *statement*, *assignment*, *increment*,
    *decrement*, *call*, *parameter*, *argument* (problem 1); *operator*,
    *operand* (problem 2); *hoard*, *cast*, *literal*, *implicitly*,
    *explicit conversion* (problem 3); `byte`, *test data* (problem 4).
    `Math.Min` is defined in a hint, since only the pixel-art world of
    `types-and-their-sizes` met it.

## What came from dewlab

- `mixed-instructions-for-a-machine` problem 4 (a robot pen's function
  named and not called: Python prints only `Done.`) became problem 1. In
  C# the line does not compile (CS0201), which is the point for a Python
  reader. Its Python is shown beside the C#.
- Problem 12 there (a number from a web form, as text) became problem 2.
  Python stopped with a `TypeError`; C#'s `+` joins text and runs, and its
  `-` does not compile, so the problem now shows both sides of the
  compiler.
- Problems 13 and 15 there (a promise outside its space; a number too
  large for an ordinary whole number) became problems 3 and 4.
- Problem 18's closing line ("to compare two, turn both into the smaller
  unit first") was not used; the idea of a score in two parts went,
  because the FOOP worlds have no natural one.
- `mixed-programming`'s introduction ("Every problem here needs more than
  one page of the series, and none of them says which") and its "hidden
  decision" solutions became the introduction and problem 4's last
  question. Its problem 20 ("what would you check before you use it?")
  became the test-data fold of problem 5, in the words of
  `reading-input`'s "Looking back".

## Left out

- Everything in the two dewlab pages that needs a toolkit, a widget, a
  maths page or a later C# page: `digit_at` and the seven-segment display,
  the pixel font, binary and hex, `log10`, the number spaces ℕ and ℤ,
  `0.1 + 0.2` (on `dividing-in-csharp`, which FOOP does not list), the GAA
  scores, and all of `mixed-programming` problems 2, 3, 7 to 19
  (lists, sorting, dictionaries, searching).
- `mixed-programming` problems 1, 4, 5 and 6 (even, odd and zero;
  FizzBuzz; threes and fives; two discounts) are the course map's
  problems for `mixed-first-programs`, written in the same batch, so this
  page does not repeat them. A reader who took PDP in C# and uses this
  page as a quick check meets new problems.
- The `inputs` block and **Compare with a solution** table: every cell
  either reads input (problems 2 and 5, whose solutions read it too) or
  shows its own table of tests (problem 4).
- A predict on problem 3: the problem says it does not compile before the
  reader runs it (style guide), so a guess about it would be empty.

## How it was checked

- **The browser checker.** `npm run check-lessons -- --write
  mixed-starting-in-csharp`: 26 runs, no problems. Then
  `npm run check-lessons -- mixed-starting-in-csharp`, without `--write`:
  no problems. Six cells are meant not to compile (three in each world),
  each with `expect:` and a sentence before it that says so. No cell,
  solution or challenge gives a warning.
- **The page itself**, in headless Chromium (`npm run serve --isolate`,
  `lesson.html?sw=off&id=mixed-starting-in-csharp`), in both worlds: six
  cells on show, each labelled *program* and `Program.cs`; every
  `lesson:` link answers 200; no console errors. Problem 1 shows
  *Did not compile, so nothing ran.* and the CS0201 message at (6,1).
  Problem 2's first cell, with 3 (or 15) typed, shows `Ada's health: 73`
  (or `Fuel: 7015 kg`), the recorded output. At 900 px wide, no line of
  code wraps.
- **Every number and every quoted output** in the prose, folds, hints and
  solution notes was checked against the outputs file after the last
  `--write`. Numbers that are only values in the code (5,000,000,000,
  299,792, 60, 100, 17) are the problem's data, not results.
- **Claims that no cell records** were run as probes in the browser
  checker, in a scratch lesson (`node tools/check-lessons.mjs --lessons
  <scratch> --write`). The page states their outcome in words and quotes
  none of their messages or numbers:

| Probe | Code | What it did | Where the page relies on it |
|---|---|---|---|
| `p-emptyparen` | `ShowHero();` | CS7036, *There is no argument given that corresponds to the required parameter 'name' of 'ShowHero(string, int)'* at (6,1) | Problem 1's hint ("What does it need from each call?") |
| `p-swapped` | `ShowHero(10, "Ada");` | two CS1503, one for each argument | Problem 1's solution note (order of arguments) |
| `p-hoard-cast`, `p-voyager-cast` | `(int)5000000000`, `(int)25000000000` | CS0221, *Constant value '…' cannot be converted to a 'int' (use 'unchecked' syntax to override)* | Problem 3's fold: "the compiler refuses the cast too, with a different message" |
| `p-hoard-long1` | `long hoard`, the rest `int` | CS0266 on lines 3 and 4 | Problem 3's fold: new messages on the lines after it |
| `p-voyager-long1`, `p-voyager-long2` | `long distance`, then `long seconds` | CS0266 on line 3; then on lines 4 and 5 | The same |
| `p-hoard-cast2` | `(int)(hoard / 2)` | runs, and prints `Each hero gets -1794967296 coins, and 0 stay with the dragon.` | Problem 3's fold: "A cast is safe only while every value fits" (the page gives no number) |
| `p-unchecked` | `unchecked((int)5000000000)` | 705032704 | Not used on the page; the message suggests `unchecked` |
| `p-divzero`, `p-zero-allowed`, `p-speed-zero-allowed` | problem 5's solution with `>= 0`, input 0 | stops with `System.DivideByZeroException: Attempted to divide by zero.` on the line that divides | Problem 5's fold (the experiment) and problem 6's answer ("could have stopped with an exception") |
| `p-end-input` | problem 5's solution, with input `none` and then none | asks again for ever; the checker stopped it at 30 s | Problem 5's fold: "the loop asks again at once, and never ends" |
| `p-plus-null` | problem 2's first cell with no input | prints `Ada's health: 7` (`7 + null` joins nothing) | Not used |

## For whoever merges this batch

These are small, and the brief did not allow me to make them:

- `courses/foop.yaml` still lists `mixed-starting-in-csharp` under
  `planned:`. The page's own title now takes over, so that line can go
  (`docs/TRANSLATING.md`, checklist).
- `lessons/reading-input/reading-input.md`, line 909, names this page in
  italics, *Mixed problems: starting in C#*, because it did not exist. It
  can become `[Mixed problems: starting in C#](lesson:mixed-starting-in-csharp)`
  (decision 14: the batch that writes a page adds the forward links to
  it).

## Open

Questions only Josh can settle:

1. **Size.** The entry says S, and the page is S: six problems, six cells
   a reader sees, about half an hour. `mixed-first-programs`, PDP's set for
   the same four shared pages and more, is M with nine. Is a short set
   right for FOOP's first series, or should it grow (a problem with
   `switch`, one with `double.TryParse` and the decimal comma)?
2. **Labelled kinds.** This page labels each problem Predict, Fix, Make or
   Explain, as dewlab's Dewey Track set does. The other two finished
   mixed sets do not. Should every mixed set label its problems, or none?
3. **A challenge on a mixed set.** The style guide asks every page to end
   with one; the other mixed sets have none. Keep it here, and add one to
   the others, or drop it?
4. **Real numbers that change.** Voyager 1's distance from Earth grows by
   about half a billion km a year, so "about 25,000,000,000 km" and the
   23 hours of problem 3 will drift. Should the page give a year ("in
   2026"), or keep the round number and say that it is rounded?
5. **Python on a page that PDP readers may use.** Problem 1 shows a
   Python program beside the C#, for FOOP's readers from Python. A PDP
   reader who uses the page as a quick check may not know Python. The
   prose says what the Python prints, so the problem works without it.
   Is that enough?
6. **`from:`.** The entry lists `mixed-programming` first, and this page
   says `from: mixed-instructions-for-a-machine`, because most of its
   problems come from there (decision 2). Is `from:` "the page it
   translates" (then neither, since the action is *new*), or "the page it
   draws on most"?

## Review

A second reader went through the page on 29 September 2026: once as a
Level 5 learner who knows only the four pages before it, once as a
teacher against the course-map entry, and then through the checklists in
`docs/TRANSLATING.md` and `PEDAGOGICAL_STYLE_GUIDE.md#checklist`. Every
number and quoted message was checked again against the outputs file.

No cell's code changed, so `version:` stays `2026.09.28.3` and the
outputs file was not rewritten (`LESSON_FORMAT.md`: bump when you change
what a cell does). The changes are to prose, hints and folds.

### What changed

1. **Problem 3's fold said something that is not so.** It said "each
   change lets the compiler check a little further". The compiler checks
   every line on every Run. The new messages after `long` on line 1 are
   on lines that had no problem while the variable was an `int` (probes
   `p-hoard-long1`, `p-voyager-long1`). The fold now says that, and
   ends with the same advice: after each change, run it again and read
   the first message.
2. **Why the cast is refused.** The fold said the number "does not fit in
   an `int` at all", which does not explain why a cast of a `long`
   variable compiles and this one does not. It now says that the number
   is written in the code, so the compiler sees before anything runs that
   it does not fit. This is the idea of the fold "Why doesn't C# check
   every calculation?" on `types-and-their-sizes`.
3. **The first message of problem 3 is quoted in full,** in a `console`
   block, as the other folds quote theirs. Before, it was cut short
   inside backticks.
4. **Voyager 1's distance.** NASA gives 25.9 billion km (one light-day)
   on 18 November 2026, so "about 25,000,000,000 km" was already 3% short
   and will drift further. The prose now says "more than 25,000,000,000 km
   away, and it is farther away every day", which stays true. The code
   and every output are the same. Problem 5 now says that the program
   *uses* 25,000,000,000 km, as problem 3 did. This answers the old open
   question 4 without a year on the page.
5. **Problem 1 has a hint before the one about arguments.** The only
   hint asked about the method's parameters, but a reader who sees CS0201
   first needs to see that the line should *call* the method. The new
   first hint (`after: 2 errors`) points at the message's list; the old
   one is now `after: 3 errors`.
6. **Terms before use.** Problem 1's solution notes now define
   *parameter* and *argument* before the sentence that uses them.
7. **The kinds.** *Fix* now reads "find why a program does not compile,
   or does something that nobody meant", because problems 1 and 3 are
   Fix problems that start with a compiler error.
8. **Plainer sentences.** "That is a skill of its own, apart from writing
   any one of them" became "Deciding what a problem needs is a skill of
   its own". "with a different story and different numbers" became "The
   story changes, and so do some of the numbers" (problem 4 uses the same
   numbers in both worlds). "nothing stops" (problem 2's notes) became
   "the program ends with no exception", `reading-input`'s words. "the
   same program, with `-`" became "does the same for a hit (a burn)",
   because the prompt and the names change too. "easily" went from
   problem 3's notes.
9. **An order to think.** Problem 6 opened with "Think about problems 1
   to 5." (style guide, `#voice`: a task is a question, never an order to
   think). It now asks "In problems 1 to 5, which programs did the
   compiler stop?"
10. **Small accuracy fixes.** Problem 4's solar prose said the charge "is
    never more than 100", on a problem where it becomes 101; it now says
    "should never be". Problem 5's "When you run it" (the starter reads
    no input) became "When you run your version". Problem 6's answer said
    `+` "joined two numbers as text"; it now says it joined a number and
    the typed text, where it was meant to add. The challenge said "Each
    choice asks how many coins", which choice 9 does not.
11. **A fold of pages for a teacher.** Both PDP mixed sets end with a
    `dl-hint` fold, "which pages each problem uses". This page listed only
    the four pages of the series. It now has the same fold, after that
    list, so a teacher sees at once what each problem draws on.
12. **"This page" in the reading** meant two different pages in one
    paragraph. The second is now "Microsoft's page".

Checked and left as they were: every number in the prose, the folds, the
hints and the solution notes is in the outputs file, or is data written
in the code (5,000,000,000, 299,792, 60, 100, 10, 30, 17); the two
predicts in each world are where C# surprises a Python reader; the
predict on problem 2 names *the last line*; each cell meant not to
compile has `expect:` and a sentence before it; each cell works on its
own, and the page says only rule 1, in the early pages' words; solutions
are on the cells the reader changes; no verdict words, and no phrasal
verbs except "look at", which the finished pages use too.

`npm run check-lessons -- mixed-starting-in-csharp`: 26 runs, no
problems.

### For whoever merges this batch

- `lessons/mixed-classes-and-objects/mixed-classes-and-objects.md`, the
  FOOP mixed set written in the same batch, has the same list of kinds,
  with the old wording of **Fix**. If it keeps the list, it can take this
  page's wording, so that the two pages say the same thing the same way.
- The two items already under "For whoever merges this batch" above
  still stand (`planned:` in `courses/foop.yaml`, and the forward link
  on `reading-input`).

### Still open for Josh

The writer's questions 1, 2, 5 and 6 stand. Two have changed:

- **Question 3 (a challenge on a mixed set)** is mostly answered by the
  other pages. `mixed-first-programs`, `mixed-programming` and
  `mixed-classes-and-objects` each end with a challenge now; only
  `mixed-programming-with-objects` has none. The question is only
  whether that page gains one.
- **Question 4 (Voyager 1's distance)** is answered for now by "more
  than 25,000,000,000 km". If Josh would rather the page used the real
  figure, 26,000,000,000 km changes the code of two cells, and their
  recorded answers (about 24 hours; 48 and 27 years).
- **Question 2 (labelled kinds)** now has two FOOP pages that label and
  two PDP pages that do not, so the answer is a question of the course,
  FOOP against PDP, as much as of mixed sets.
