# Notes: a-polynomial-class

Ported from dewlab `tutorials/a-polynomial-class/` (the tutorial and its
glossary, version 2026.09.26.1, and the three class files it includes,
`setup/polynomial/tidy.py`, `printed.py` and `added.py`) on 27 September
2026, as a draft in `drafts/lessons/a-polynomial-class/`. Moved into
`lessons/a-polynomial-class/` on 28 September 2026, checked in the browser
engine, and revised; the page is now version 2026.09.28.1. Written against
dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` (to entry
40; entry 15 moves this page to FOOP's explore list), and the entry for
this page in `planning/COURSE_MAP.md` (FOOP explore E1, batch 13,
"adapt", shape explore, size M, no worlds, covers FOOP-LO4 and FOOP-LO8).

Files:

- `lessons/a-polynomial-class/a-polynomial-class.md`: the page. 17
  `csharp exec` cells: 8 types cells (each `file: Polynomial.cs`) and 9
  program cells. 3 predicts, 4 hints, 4 solutions (each with `inputs`),
  1 challenge. No worlds, and no practice page (an explore page has
  none).
- `lessons/a-polynomial-class/a-polynomial-class.outputs.json`, written
  by `npm run check-lessons -- --write a-polynomial-class`.
- This file. The draft's `*.native.json` files (the native checker's
  outputs) were deleted in the move.

## How it was checked

- **The browser checker** (`npm run check-lessons -- a-polynomial-class`):
  22 runs (17 cells, 4 solutions, 1 challenge). The last run, without
  `--write`, reports no problems. Every cell that is not meant to fail
  compiles with no warning, so no warning travels down the page
  (`DECISIONS.md` 30).
- **The first browser run, on the draft as moved**, recorded the same
  output as the native check for every cell, every solution and every
  input, as the porter's notes listed the native results (the
  `*.native.json` files were deleted in the move, before this
  comparison): no difference of culture, formatting, warnings or
  exception text. It reported two problems: the link to `two-names-one-object`,
  which is not in `lessons/`, and the challenge, which did not compile
  on its own (CS0246, `Polynomial` not found; `DECISIONS.md` 40). Both
  are fixed (below).
- **Each `solution`** sits on a program cell, as the statements followed
  by the whole class, so the checker runs it with the class replacing
  the reader's (rule 4), as "Compare with a solution" does:
  - Degree: the starter does not compile (CS1061, each input CS1061);
    the solution prints `2` and gives `2`, `1`, `0`.
  - ToString: the starter prints `Polynomial` and gives `"Polynomial"`
    four times; the solution gives `"-5x^2 + 20x + 1.5"`, `"x^2 - 1"`,
    `"2x^3 - x + 3"`, `"0"`.
  - Add: the starter does not compile (CS1061 for the three inputs that
    call `Add`; `first.ToString()` is recorded as `not-run`, because the
    cell's own statements do not compile); the solution gives
    `"2x + 1"`, `"3x^2 + 2x + 1"`, `1`, and `"3x^2 + 2x + 1"` for
    `first` after the Add.
  - Derivative: the starter does not compile (CS1061); the solution
    prints `-10x + 20` and `0`, and gives `"-10x + 20"`, `0`, `"0"`.
- **The cells meant to fail** carry `expect:`: CS1061 on the Degree,
  Add and Derivative programs (the method the reader is asked to write),
  and CS0019 on `first + second` before `operator +` exists. The prose
  says each is meant to fail before the reader runs it; the CS0019 cell
  has a predict, so its lead-in uses the other pages' line, "Whatever
  happens when you run it is meant to happen, and nothing is broken."
- **The probes** (at the end of this file) ran in the browser engine as
  a scratch lesson, `node tools/check-lessons.mjs --lessons <scratch>
  --write`: 8 runs, no problems. They check the messages and texts the
  prose quotes that no lesson cell prints.
- **The page, served** (`npm run serve -- --port 8767 --isolate`) and
  loaded in headless Chromium: no page errors; the class cells show
  **Check** and `Polynomial.cs`, the programs **Run** and `Program.cs`;
  *Two names, one object* shows in italics with no link.
- **The addresses** in the page (two dewlab pages, two Microsoft Learn
  pages) returned HTTP 200 on 28 September 2026.

## What changed in the move to `lessons/`

- **Version** 2026.09.27.1 to 2026.09.28.1: cells were split, renamed
  and added, and the challenge changed.
- **Cell ids follow `DECISIONS.md` 26.** dewlab has seven cells, each a
  class and its program. Each is now a types cell with dewlab's id and a
  program cell `<id>-program` below it, which holds the predict, the
  inputs, the hint and the solution. That is the shape of every FOOP
  page in `lessons/`. The draft had numbered the two halves `-1` and
  `-2`, and three of its tasks sent the reader to a class cell further
  up the page (Degree to the first cell of the page). Now each task has
  its own class directly above its program, so the reader's work is
  saved under dewlab's id for that task. That adds two types cells
  (`the-highest-power-1`, 19 lines, and
  `printing-it-the-way-we-write-it-1`, 31 lines). No class has used the
  page, so no saved work is lost.

  | Draft id | Now |
  |---|---|
  | `a-ball-in-the-air-1` (types) | `a-ball-in-the-air-1` |
  | `a-ball-in-the-air-2` | `a-ball-in-the-air-1-program` |
  | (none: Degree went into `a-ball-in-the-air-1`) | `the-highest-power-1` (types, new) |
  | `the-highest-power-1` | `the-highest-power-1-program` |
  | `a-rule-for-the-coefficients-1` (types) | `a-rule-for-the-coefficients-1` |
  | `a-rule-for-the-coefficients-2` | `a-rule-for-the-coefficients-1-program` |
  | `a-rule-for-the-coefficients-3` (types) | `a-rule-for-the-coefficients-2` |
  | `a-rule-for-the-coefficients-4` | `a-rule-for-the-coefficients-2-program` |
  | (none: ToString went into `a-rule-for-the-coefficients-3`) | `printing-it-the-way-we-write-it-1` (types, new) |
  | `printing-it-the-way-we-write-it-1` | `printing-it-the-way-we-write-it-1-program` |
  | `polynomials-that-make-polynomials-1` (types) | `polynomials-that-make-polynomials-1` |
  | `polynomials-that-make-polynomials-2` | `polynomials-that-make-polynomials-1-program` |
  | (none: Derivative went into `a-plus-sign-for-polynomials-2`) | `polynomials-that-make-polynomials-2` (types, new: the Add solution's class) |
  | `polynomials-that-make-polynomials-3` | `polynomials-that-make-polynomials-2-program` |
  | `a-plus-sign-for-polynomials-1` | `a-plus-sign-for-polynomials-1` (a program alone, like `overloading-2` on `one-class-many-methods`) |
  | `a-plus-sign-for-polynomials-2` (types) | `a-plus-sign-for-polynomials-2` |
  | `a-plus-sign-for-polynomials-3` | `a-plus-sign-for-polynomials-2-program` |

- **The derivative comes before the operator section** (question 2,
  below). dewlab put `derivative` straight after `add`, in the same
  section, and `+` in its closing challenge; the page now keeps that
  order, with the operator section where dewlab's challenge asked for
  `__add__`. So the derivative's types cell is the Add solution's class,
  and the operator's class is the only one with `operator +`. In the
  draft's order, the split would have shown the same 97-line class twice
  in a row. The first stage's line "The last stage of this page answers
  that" became "A later stage of this page answers that."
- **The operator's class** has no `Evaluate` and no `Derivative`, since
  its program uses neither, and the prose says so, as it does for the
  class without `Evaluate` in "A rule for the coefficients". It is 88
  lines, not 97.
- **The challenge compiles on its own** (`DECISIONS.md` 40). It carries
  `Polynomial` (the constructor with both rules, `Degree()` and
  `ToString()`), with `Multiply` and `operator *` as stubs that hold
  `throw new NotImplementedException();`, as the skeletons on
  `from-a-description-to-classes` do. The prose explains the stub in
  that page's words, since a reader who came from
  `one-class-many-methods` has not met it. Run as given, it stops with
  `NotImplementedException` in `Multiply` (probe P6); with one answer it
  prints `x^2 - 1` twice (probe P1).
- **Links.** *Two names, one object* is in italics with no link
  (`DECISIONS.md` 32), and the sentence says what it is about. The
  first mention of encapsulation is a link to
  `keeping-details-inside-an-object`, with that page's definition in a
  clause, since the term was used without one.
- **Every number is run.** Two numbers in solution notes came from
  reading code or from a probe, not from a cell: "`_coefficients.Count -
  1` is 2" (Degree) and "`"10" + 2` gives `"102"`" (ToString, and the
  operator predict's second note). Both sentences now say the same thing
  without the number.
- **Terms.** "C# has no operator for a power" used *operator* before the
  page defines it (at CS0019); it is now "no symbol for a power". The
  ToString section calls `^` "a different calculation, called *exclusive
  or*", not "a different operator". *Derivative* is defined in one
  sentence where it first appears. "*Overloading* is the word that...",
  not "It is the word that...".
- **A Visual Studio line**, in the words the other FOOP pages use:
  nothing on the page needs Visual Studio, any program cell downloads as
  a project that prints the same, and its project holds one
  `Polynomial.cs`, the last copy above that cell (`DECISIONS.md` 38).
- **The comment** `// A copy, so that the caller's list and this one are
  two lists` is now in every copy of the constructor with both rules,
  not only the first.
- **Wording.** "the pages up to" became "what the course teaches by the
  end of"; "thrown straight up" became "thrown straight upwards"; "checks
  each power below it in turn" became "checks the powers below it, one at
  a time"; the Degree hint's "look at" became "check"; the ToString
  hint's "from the highest power down" became "to the lowest". The
  Degree solution's note on rule 4 uses the exemplar's words ("The
  solution writes `Polynomial` again, below its program (rule 4), and C#
  uses this one in place of yours").

## What changed from the Python page, and why

**The shape stays.** One class, built a stage at a time, following the
thrown ball: `Evaluate`, `Degree` (the trailing zero in `{ 1, 2, 0 }` is
the trap), a constructor with two rules (no zero at the top; a copy of the
caller's list), a `ToString` that writes `-5x^2 + 20x + 1.5`, `Add`, and
for readers who know derivatives, `Derivative`, which answers the opening
question (the ball is highest at 2 s). Each stage has a question, a hint
that opens with a question, a solution with notes, and `inputs`. Every
number in dewlab's prose came out the same in C#.

**Cells follow the rules of the road.** dewlab's cells each held the class
(written out, or included from `setup/polynomial/`) and the program. Here
each class is a types cell (`file: Polynomial.cs`) and the program cell
below uses it. There are eight copies of the class, and each replaces the
one above it (rule 4):

| Cell | Version | Lines | What the reader adds to it |
|---|---|---|---|
| `a-ball-in-the-air-1` | `Evaluate` | 19 | nothing |
| `the-highest-power-1` | `Evaluate` | 19 | `Degree()` |
| `a-rule-for-the-coefficients-1` | a loop `Degree()`, no `Evaluate` | 21 | nothing: it holds the predict's class |
| `a-rule-for-the-coefficients-2` | both rules, one-line `Degree()` (dewlab's `tidy.py`) | 31 | nothing |
| `printing-it-the-way-we-write-it-1` | the same | 31 | `ToString()` |
| `polynomials-that-make-polynomials-1` | with `ToString()` (dewlab's `printed.py`) | 73 | `Add()` |
| `polynomials-that-make-polynomials-2` | with `Add()` (dewlab's `added.py`) | 93 | `Derivative()` |
| `a-plus-sign-for-polynomials-2` | `Add()` and `operator +`, no `Evaluate` | 88 | nothing |

This keeps dewlab's design, "each starter is the stage before's answer":
a reader who did not finish one stage starts the next from a class that
works. The prose says, each time, that the class below is for the reader
to change, and that a new copy replaces the reader's (with an invitation
to copy their own `ToString()` into it). Each program makes its own
polynomial (rule 3 is named once, at the first task).

**A task starter that does not compile.** In Python, calling
`height.degree()` before it exists raised `AttributeError` when the line
ran. In C# the compiler refuses the whole program first (CS1061). So the
Degree, Add and Derivative starters carry `expect: CS1061` (`DECISIONS.md`
27), the prose says so and quotes the message, and their hints wait for
`after: 2 errors` (the first failure comes before the reader has written
anything). The ToString starter runs (it prints `Polynomial`), so its hint
waits for `after: 2 runs`.

**`Degree` needs `return 0;` for the compiler.** New in the Degree
solution's notes: without the last `return 0;`, the class does not
compile (CS0161: not all code paths return a value; probe P4). Python
would have returned `None`.

**Aliasing, with C#'s words.** dewlab's point stands unchanged: the
program changes the polynomial without touching the private field, and
prints `3`. The prose says why in C# terms: `List<double>` is a class, a
variable of a class type holds a *reference*, and `=` copies the
reference. It adds a C# sentence that follows from
`keeping-details-inside-an-object`: `private` stops other code from using
the name `_coefficients`, not from changing the list through a name of its
own. `list(coefficients)` became `new List<double>(coefficients)`.
Python's `coefficients[-1]` and `pop()` became a local `top`, the index of
the highest power, with `RemoveAt(top)`: C#'s `_coefficients[^1]` would be
shorter, but a FOOP reader from Python may not have met the index from the
end, and `_coefficients[_coefficients.Count - 1]` made an 86-character
line. dewlab linked to `comprehensions-and-grids` for aliasing; the C#
page links to `two-names-one-list` (PDP) and names *Two names, one object*
(FOOP, not written yet), because a FOOP reader from Python may not have
taken PDP in C#.

**Printing.** Python's `print(height)` showed the memory form; C# prints
the class's name, `Polynomial`, as `objects-and-classes` teaches.
`__str__` became `public override string ToString()`. `abs()` became
`Math.Abs`, and `str(size)` became `text + size`. The prose adds a note
that `^` in C# code is exclusive or, not a power (the course map's "no
power operator"); in `ToString`'s text it is only a character. The
solution's notes add that each `+` on a string makes a new string (strings
cannot be changed).

**`Add` stays, and `private` gets one more sentence.** In Python,
`other._coefficients` worked by convention. In C# it compiles because
`private` means private to the class, not to the object. The prose says
so before the task, because a reader would otherwise not know how `Add`
can reach the other polynomial's list.

**Operator overloading moved from the challenge into the page.** dewlab's
challenge asked for `__add__`. The course map says the C# page gains
`operator +`, so it is a short worked section, "A plus sign for
polynomials", after the derivative, where dewlab's challenge was:

1. `a-plus-sign-for-polynomials-1`: `first + second` with the class as it
   stands, `expect: CS0019`, with a predict. The predict's second option
   (`3x^2 + 2x + 1-3x^2`, `+` joining two texts) is what the two
   `ToString()` results joined would give (probe P2).
2. `a-plus-sign-for-polynomials-2` (types): the class with `Add` and
   `public static Polynomial operator +(Polynomial left, Polynomial right)`,
   read in four parts. `static` is tied to the static fields of
   `one-class-many-methods`, and *operator overloading* to method
   overloading on the same page. The claim that C# needs both `public`
   and `static` is probe P5 (CS0558 without either).
3. `a-plus-sign-for-polynomials-2-program`: `first + second` prints
   `2x + 1`, and dewlab's challenge line, `height + Polynomial([-1.5])`,
   now runs in the page: `-5x^2 + 20x`, the height above the hand.

The challenge became `Multiply` and `operator *`: dewlab's `multiply`
with the operator on top.

**The rest.**

- `question` (multiple choice, "the greatest height") became a `choice`
  predict with dewlab's three options and notes. The aliasing `predict`
  stays a `number` predict. The operator predict is new. That is three
  predicts, the most the style guide allows.
- dewlab's `Polynomial([1.5, 20, -5])` became
  `new Polynomial(new List<double> { 1.5, 20, -5 })`, in the programs and
  in every `inputs` line (question 3).
- `var` is used for a line whose type is written on the right, as FOOP
  does from `the-moves-you-already-know` on. Local variables inside the
  class that start from a literal (`double total = 0;`,
  `string text = "";`) write their type.
- Private field `_coefficients`, as on `keeping-details-inside-an-object`.
- dewlab's glossary terms (polynomial, coefficient, degree) are defined in
  the prose where they first appear, because dewsharp has no glossary
  panel yet. So are *reference*, *operator*, *operand*, *operator
  overloading* and *derivative*.
- The two maths pages the Python page linked to (`expressions-come-alive`
  and `rates-of-change`) have no dewsharp page, so they are linked by their
  full dewlab addresses, as `LESSON_FORMAT.md` allows, and the prose says
  they are Python pages (question 5).
- "Where to read more" cites Microsoft Learn (operator overloading; the
  `List<T>` constructors) in place of *Think Python* and the Python
  language reference.
- "Next" keeps dewlab's pointer to the designing-classes page, and says
  "if you came here from" Methods and overloading, because an explore
  page is not in the course's reading order.
- Wording: phrasal verbs from dewlab's text were replaced ("leave out"
  became "skip", "walks down" became "checks the powers below it, one at
  a time", "go through" and "look at" were rephrased), and "a nuisance"
  became "make extra work". "Which method was the hardest to get exactly
  right?" became "Which method took you the most attempts before it did
  what you wanted?", because *right* is a verdict word. The parameters of
  `operator +` keep Microsoft's names, `left` and `right`; the prose
  describes them as "written before the `+`" and "after it". "Looking
  back" stays as the closing heading, as on `objects-and-classes`.
- One question was added to "Looking back": `private` and the copy each
  close one door, so why does the class need both?

## What C# made different, in short

- A method that does not exist yet is a compiler error (CS1061), so every
  "add a method" task starts from a program that does not compile.
- A method that returns a value must return one on every path (CS0161).
- The list is a reference type; `private` guards the name, not the list.
  The copy in the constructor is the only guard for the list.
- `private` is per class, so `other._coefficients` compiles in `Add`.
- `+` between two objects of a new class does not compile (CS0019) until
  the class declares `public static ... operator +`. This is the page's
  new section.
- No power operator: `Math.Pow`, and `^` is exclusive or.
- Printing an object prints its class's name until `ToString()` is
  overridden.

## The porter's questions

The numbers are the porter's, from "Open questions for a reviewer" and
"What should change once the page UI or the browser checker exists" (the
second list's items are marked "UI"). Question 1 and UI item 1 are under
"Open", with the course-wide half of question 3.

### Decided

2. **Where the operator section sits.** After the derivative, before
   "Looking back". The playbook says to keep dewlab's order: dewlab put
   `derivative` straight after `add`, in "Polynomials that make
   polynomials", and asked for `+` in the closing challenge, which is
   where the operator section now sits. With the split cells of
   `DECISIONS.md` 26, the draft's order would also have shown the same
   97-line class twice in a row (the operator's worked class, then the
   derivative's starter). The cost: the ball's answer now comes before
   the last section, not at the end, and the first stage says "a later
   stage" answers it. The operator section still ends on the ball (its
   height above the hand).
3. **`new Polynomial(new List<double> { 1.5, 20, -5 })`, for this page.**
   Kept. Every page in `lessons/` writes `new List<T> { ... }`, and none
   uses a collection expression (`[1.5, 20, -5]`); a `params`
   constructor would hide the list that the aliasing section depends
   on. Whether collection expressions should appear anywhere in the
   course is a course-wide question, under "Open".
4. **`Degree()` stays a method.** dewlab's task is a method, its first
   version has a loop, and C# does not need a property here. The style
   guide and the course map say nothing that asks for a property.
5. **The links to dewlab's Python maths pages.** Kept.
   `docs/LESSON_FORMAT.md` allows a dewlab page by its full address, the
   course map's entry names the missing maths lead-in as the reason this
   page is an extra, and the prose says both are Python pages. Both
   addresses returned HTTP 200 on 28 September 2026.
6. **`covers`.** `[FOOP-LO4, FOOP-LO8]`, the course map's entry.
7. **Batch and links.** Settled by `DECISIONS.md` 32 and 39 and by this
   batch's list of pages: links to `one-class-many-methods`,
   `objects-and-classes`, `two-names-one-list`,
   `keeping-details-inside-an-object` and
   `from-a-description-to-classes`, all in `lessons/`; *Two names, one
   object* (`two-names-one-object`, not written yet) in italics. The
   link texts are each page's short title, or its full title where the
   sentence names the page as the next one to read.
8. **The rules of the road by number.** The style guide's
   `#rules-of-the-road` says that after the first page with classes, a
   page points back to them in this form; the page depends on
   `one-class-many-methods`, which comes after `objects-and-classes`,
   where the rules are taught.

- **UI 2, where the reader writes.** Settled by the split
  (`DECISIONS.md` 26): each task's class is directly above its program,
  and the prose says "the class below is ... for you to change".
- **UI 3, Compare with a solution.** Each solution is the statements and
  then the whole class, so it replaces the reader's class for that run
  (rule 4), as on `objects-and-classes`; the browser checker runs every
  solution that way, and each gives the values above.
- **UI 4, inputs on a starter that does not compile.** Recorded, not
  changed: each input that calls the missing method is `compileError:
  CS1061`, and `first.ToString()` on the Add starter is `not-run`. How
  the Compare table shows those rows is the page's to decide; it is the
  same on every page with an `expect: CS1061` task.
- **UI 5, the challenge.** Settled by `DECISIONS.md` 40: it now compiles
  on its own, with stubs (above).
- **UI 6, a half-edited class.** Each task's class now affects only the
  cells below it until the next copy replaces it. One case remains: the
  CS0019 cell sits under the derivative's class, so a reader whose
  `Derivative` does not compile yet sees that error there, not CS0019.
  The same was true of a half-written `Add` in the draft's order.

### Open

For Josh:

1. **Size, and the long class cells** (the porter's question 1 and UI
   item 1). The page now has 17 cells, 8 of them copies of `Polynomial`
   (19 to 93 lines; the Derivative solution is 112 lines with its
   statements), against the course map's size M (8 to 15 cells) and the
   style guide's 5 to 15 lines for a cell. The split of `DECISIONS.md` 26
   added two cells and a 93-line copy; the other FOOP pages repeat their
   class in the same way. Includes for types cells (the course map's open
   question 2), or a cell that folds its unchanged methods, would let the
   last copies show only their new methods. Without either, the other
   choice is fewer stages on the page (for example, the derivative as a
   challenge), which would lose the answer to the page's opening
   question.
2. **Collection expressions, course-wide** (the other half of question
   3). `new Polynomial([1.5, 20, -5])` (C# 12) would match Python's list
   and shorten every program and input line on this page. No page in
   `lessons/` uses one. If the course adopts them, a page before this one
   should teach them.

## Where each number and message in the prose comes from

| Number or claim | Source |
|---|---|
| `0 s: 1.5 m` … `4 s: 1.5 m`; greatest `21.5` after 2 s | `a-ball-in-the-air-1-program` |
| The ball's polynomial has degree 2 | `the-highest-power-1-program`, solution (prints `2`) |
| CS1061 for `Degree` | `the-highest-power-1-program` |
| `2`, `1`, `0` | `the-highest-power-1-program`, solution with inputs |
| CS0161 message | probe P4 |
| `3` | `a-rule-for-the-coefficients-1-program` |
| `1`, then `1, 2, 0, 3` | `a-rule-for-the-coefficients-2-program` |
| printing a list prints its type's name | probe P3; `objects-and-classes`, `printing-an-object-2-program` |
| `Polynomial` | `printing-it-the-way-we-write-it-1-program` |
| `-5x^2 + 20x + 1.5`, `x^2 - 1`, `2x^3 - x + 3`, `0` | `printing-it-the-way-we-write-it-1-program`, solution with inputs |
| CS1061 for `Add` | `polynomials-that-make-polynomials-1-program` |
| `2x + 1`, degree 1, `first` still `3x^2 + 2x + 1` | `polynomials-that-make-polynomials-1-program`, solution with inputs |
| CS1061 for `Derivative` | `polynomials-that-make-polynomials-2-program` |
| `-10x + 20`, `0` at 2 s, `0` for `{ 7 }`; 21.5 m at 2 s | `polynomials-that-make-polynomials-2-program`, solution with inputs; `a-ball-in-the-air-1-program` |
| CS0019 message | `a-plus-sign-for-polynomials-1` |
| predict option `3x^2 + 2x + 1-3x^2` | probe P2 |
| `public static` both needed (CS0558) | probe P5 |
| `2x + 1`, then `-5x^2 + 20x` | `a-plus-sign-for-polynomials-2-program` |
| `x^2 - 1` for $(x + 1)(x - 1)$ | probe P1 |
| the challenge compiles, and stops in `Multiply` with `NotImplementedException` | the checker's `challenges` entry; probe P6 |

The numbers in the opening paragraph (20 metres a second, 1.5 m, 10 m/s²,
9.8, and the coefficients −5, 20 and 1.5) are the problem's givens, and
the predict options 41.5 and 81.5 are guesses, not outputs.

## Probes

Each probe is one program: its statements, then its class. They ran in
the browser engine on 28 September 2026 as one scratch lesson, in the
order below; the probes whose class does not compile come last, because
a class in a program cell carries down to the cells below it. What each
printed:

| Probe | Recorded |
|---|---|
| P1 `probe-challenge-multiply` | `x^2 - 1`, twice |
| P2 `probe-texts-joined` | `3x^2 + 2x + 1-3x^2` |
| P3 `probe-print-a-list` | ``System.Collections.Generic.List`1[System.Double]``, `1, 2, 0, 3`, `102` |
| P6 `probe-challenge-as-given` (`expect: exception`) | `System.NotImplementedException`, "The method or operation is not implemented.", in `Polynomial.Multiply(Polynomial)` |
| P7 `probe-challenge-answered` | `x^2 - 1`, twice |
| P4 `probe-degree-without-return` (`expect: CS0161`) | `'Polynomial.Degree()': not all code paths return a value` |
| P5 `probe-operator-not-static`, `probe-operator-not-public` (`expect: CS0558`) | `User-defined operator 'Polynomial.operator +(Polynomial, Polynomial)' must be declared static and public`, for each |

P3's `102` is no longer quoted on the page (see "Every number is run",
above). P6 is the page's challenge exactly as it stands, run as a
program; P7 is the same with P1's `Multiply` and `operator *` in place of
the stubs.

### P1. The challenge, with one answer (prose: $x^2 - 1$)

```csharp exec
id: probe-challenge-multiply
var first = new Polynomial(new List<double> { 1, 1 });     // x + 1
var second = new Polynomial(new List<double> { -1, 1 });   // x - 1
Console.WriteLine(first.Multiply(second));
Console.WriteLine(first * second);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Multiply(Polynomial other)
    {
        var product = new List<double>();
        for (int i = 0; i < _coefficients.Count + other._coefficients.Count - 1; i++)
        {
            product.Add(0);
        }
        for (int mine = 0; mine < _coefficients.Count; mine++)
        {
            for (int theirs = 0; theirs < other._coefficients.Count; theirs++)
            {
                product[mine + theirs] = product[mine + theirs] + _coefficients[mine] * other._coefficients[theirs];
            }
        }
        return new Polynomial(product);
    }

    public static Polynomial operator *(Polynomial left, Polynomial right)
    {
        return left.Multiply(right);
    }
}
```

### P2. The operator predict's second option: the two texts joined

```csharp exec
id: probe-texts-joined
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first.ToString() + second.ToString());

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }
}
```

### P3. Printing a list prints its type; `"10" + 2` (prose: "printing a list itself prints only the name of its type"; the draft quoted `"102"`, which the page no longer does)

```csharp exec
id: probe-print-a-list
var numbers = new List<double> { 1, 2, 0, 3 };
Console.WriteLine(numbers);
Console.WriteLine(string.Join(", ", numbers));
Console.WriteLine("10" + 2);
```

### P4. `Degree()` without its last `return 0;` (prose: CS0161)

```csharp exec
id: probe-degree-without-return
expect: CS0161
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height.Degree());

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public int Degree()
    {
        for (int power = _coefficients.Count - 1; power >= 0; power--)
        {
            if (_coefficients[power] != 0)
            {
                return power;
            }
        }
    }
}
```

### P5. `operator +` without `static`, then without `public` (prose: C# needs both)

```csharp exec
id: probe-operator-not-static
expect: CS0558
var first = new Polynomial();
Console.WriteLine(first + first);

class Polynomial
{
    public Polynomial Add(Polynomial other)
    {
        return this;
    }

    public Polynomial operator +(Polynomial left, Polynomial right)
    {
        return left.Add(right);
    }
}
```

```csharp exec
id: probe-operator-not-public
expect: CS0558
var first = new Polynomial();
Console.WriteLine(first + first);

class Polynomial
{
    public Polynomial Add(Polynomial other)
    {
        return this;
    }

    static Polynomial operator +(Polynomial left, Polynomial right)
    {
        return left.Add(right);
    }
}
```

### P6. The challenge exactly as the page gives it, run as a program (prose: the stubs let the class compile; calling one stops the program)

```csharp exec
id: probe-challenge-as-given
expect: exception
var first = new Polynomial(new List<double> { 1, 1 });     // x + 1
var second = new Polynomial(new List<double> { -1, 1 });   // x - 1
Console.WriteLine(first.Multiply(second));
Console.WriteLine(first * second);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Multiply(Polynomial other)
    {
        throw new NotImplementedException();
    }

    public static Polynomial operator *(Polynomial left, Polynomial right)
    {
        throw new NotImplementedException();
    }
}
```

### P7. The challenge with P1's `Multiply` and `operator *` in place of the stubs (prose: $x^2 - 1$)

```csharp exec
id: probe-challenge-answered
var first = new Polynomial(new List<double> { 1, 1 });     // x + 1
var second = new Polynomial(new List<double> { -1, 1 });   // x - 1
Console.WriteLine(first.Multiply(second));
Console.WriteLine(first * second);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Multiply(Polynomial other)
    {
        var product = new List<double>();
        for (int i = 0; i < _coefficients.Count + other._coefficients.Count - 1; i++)
        {
            product.Add(0);
        }
        for (int mine = 0; mine < _coefficients.Count; mine++)
        {
            for (int theirs = 0; theirs < other._coefficients.Count; theirs++)
            {
                product[mine + theirs] = product[mine + theirs] + _coefficients[mine] * other._coefficients[theirs];
            }
        }
        return new Polynomial(product);
    }

    public static Polynomial operator *(Polynomial left, Polynomial right)
    {
        return left.Multiply(right);
    }
}
```
