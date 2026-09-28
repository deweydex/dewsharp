# building-reusable-tools: notes for a reviewer

Ported from dewlab `tutorials/building-reusable-tools/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 22):
action *adapt*, shape *tutorial*, size L, batch 7, depends on
`putting-things-in-order` and `objects-and-classes`.

## Moved into `lessons/` (28 September 2026)

The draft was ported and checked with the native checker in `drafts/`.
On 28 September 2026 it moved into `lessons/`, was run in the browser
engine, and was revised against the recorded outputs, the playbook's
checklist (`docs/TRANSLATING.md`) and the style guide. What that changed
is under "What the move changed", and the porter's open questions are
settled under "Open questions", except for two that stay open for Josh.

Files now:

- `lessons/building-reusable-tools/building-reusable-tools.md`: the
  lesson, version 2026.09.28.1. 28 exec cells, 4 of them in world
  variants (so 26 in each world); 2 predicts, 5 hints, 4 solutions,
  3 `inputs` blocks, 1 challenge, 1 fold. Six cells are meant to fail:
  `a-mean-that-works-1` and `handling-edge-cases-2-program`
  (`expect: exception`), `the-rules-of-the-road-3` (`CS0103`), and the
  three tests cells of the tasks (`CS0117`, decision 27).
- `lessons/building-reusable-tools/building-reusable-tools-practice.md`:
  the practice page, version 2026.09.28.1, 16 problems. 18 exec cells,
  4 of them in world variants; 5 predicts, 5 hints, 8 solutions,
  5 `inputs` blocks, 12 folds. Nine cells are meant to fail (six tests
  cells with `CS0117`, and `CS0019`, `CS1503` and two `exception`).
- `building-reusable-tools.outputs.json` and
  `building-reusable-tools-practice.outputs.json` beside them: what the
  browser checker recorded.
- This file, which was `NOTES.md` in the draft folder.

The draft's `*.native.json` files are deleted, and so is the draft folder.
The pages have no pictures.

`npm run check-lessons -- building-reusable-tools` (it checks the practice
page too) reports one problem: the link to `from-cells-to-a-program`,
which moves into `lessons/` in the same batch as this page.

## What the browser showed

The browser checker recorded the same output as the native checker for
every cell, solution and `inputs` row of both pages, in both worlds. The
only differences are in how the two checkers record things, not in what
the code did:

- For a tests cell that does not compile, the browser records each
  `inputs` row as `compileError: CS0117`; the native checker recorded no
  rows.
- The browser records a value as `display` (`127.5`, `'A'`, `"quick"`)
  and an exception by its short name (`ArgumentException`); the native
  checker wrote `System.ArgumentException`.

No culture difference: `NaN`, `∞`, `8.16496580927726`,
`0.15000000000000002` and `0.6666666666666666` print the same in both.
No warnings travel down either page.

The probes at the end of this file were run in the browser too, in a
scratch lesson. Every one gave what the native checker gave. Two details
the native checker could not show:

- `l-check-frames`: .NET's own `StackTrace` text names the methods without
  line numbers (`at Test.Check[Double](String claim, Double expected,
  Double found)`, `at Program.<Main>$(String[] args)`). The page's report
  draws the recorded frames instead, as lines: *at line 11 of Test.cs (in
  Test.Check(string, double, double))*, then *at line 1 of Program.cs*.
  So the lesson's sentence "The report under the message names two lines"
  holds on the page.
- `p-static-classes` prints `True` twice: `Console` and `Math` are static
  classes on the page as well.

Looked at on the page (headless Chromium): the `Stats.cs` label on the
types cells; the CS0103 note under `the-rules-of-the-road-3` (*marks was
made in a cell above. Variables stay in their cell, so make it again in
this cell.*, written by the engine); the report for a check that does not
hold, in `testing-as-a-habit-1` with one expected answer changed; and
**Compare with a solution** on `your-turn-1-tests`, from the starter
(every row *did not compile: CS0117*, marked different) and with a check
of the reader's that does not hold (every row *did not run*, with the
note *Your cell did not reach the inputs. What happened is under the
cell.*). **Download project** on `testing-as-a-habit-1`,
`the-rules-of-the-road-5`, `handling-edge-cases-3` and
`variable-scope-revisited-2` gives a project with `Program.cs` and a file
for each class above (`Stats.cs`, `Test.cs`, `Picture.cs`), which builds
and prints what the page printed.

## What the move changed

Cells (both versions bumped to 2026.09.28.1):

- `your-turn-1-tests`: a fourth `inputs` row,
  `Stats.DataRange(new double[0])  // throws`. The solution note says what
  it shows (`Max()` stops with an `InvalidOperationException`), so that
  claim, and the same claim in practice 5, come from a recorded row and
  not from probe `l-max-empty`.
- `the-middle-value-1-tests` (practice 4): a fourth `inputs` row,
  `Stats.Median(new double[0])  // throws`, which records the
  `IndexOutOfRangeException` that practice 5 names (it was probe
  `p-median-empty`).
- `from-earlier-sorting-a-string-1` (practice 14): the solution prints
  `word` after the sorted letters. It prints ABC, then CAB, so the note's
  claim that `word` did not change is recorded.

Links (step 3 of the move): every page this one names that is in
`lessons/`, or moves there in this batch, is now a `lesson:` link. The
draft named them in italics (its "Links: decision 32" table):
*Methods* (`writing-your-own-functions`, three places), *Exceptions*
(`reading-an-error-message`), *Dictionaries* (`looking-things-up-by-name`,
five places over both pages), *Sorting* (`putting-things-in-order`, two),
*Debugging* (`when-it-goes-wrong`), *A whole program*
(`from-cells-to-a-program`), *Dividing* (`dividing-in-csharp`), *Arrays
and lists* (`lists-and-sequences`) and *Searching* (`finding-things`).
*Reading input* stays in italics: `reading-input` is not in `lessons/` and
not in this batch.

Prose:

- "Which one works?", fold: `{ 1, 2 }` on its own catches b and d as well
  as c, so one array answers "What is the smallest set?". dewlab's fold
  (and the draft) stopped at two arrays. Probe `l-fold-c-one-two` (a 1.5,
  b 1, c 1, d 1) is the evidence; the fold names no number.
- *caller* is defined where the lesson first uses it ("The *caller*, the
  code that called `Mean`, ...").
- `static` in a class and `static` on a method in a cell are connected in
  one sentence (the porter's open question 5).
- The Compare note on `your-turn-1-tests` says what the page shows when a
  check of the reader's stops the cell, in the page's own words.
- Plain words: "has nothing to do with" (twice) became "is not"; "Is that
  written down anywhere?" (a phrasal verb) became "Does the XML comment
  say?"; practice 13's "A tie rule nobody wrote down" became "A rule for a
  tie that nobody wrote in the XML comment"; practice 9's "make sure"
  became a question, "Does it stop the program?"; practice 8's "the method
  is fine" became "the method has no mistake".
- Practice 1, fold: "That is a success, and no reason to skip the name"
  became "... and still no reason to skip the comment". dewlab's sentence
  says "skip the name" too, which reads as a slip for "skip the
  docstring": the name is what made the comment almost unnecessary. The
  lesson says every method from here on has an XML comment, so the fold
  now says the same.

## Frontmatter

- `title`: the course map's, "Reusable methods: a class of tools, and
  tests for them". dewlab's was "Designing and testing good functions".
- `covers: [PDP-LO8, PDP-LO10, PDP-LO11, PDP-LO7]`, the course map's list
  in its order. dewlab gave each section its own outcomes; the format has
  one flat list.
- `worlds`: dewlab's two, with dewlab's descriptions, as the map says for
  PDP.
- `year:` is dropped: the format has no such field.
- The practice page has `from: building-reusable-tools-practice`,
  `practice_for: building-reusable-tools`, the same worlds and no
  `covers`, as the other practice pages do. Its title,
  "Reusable methods: practice", follows `first-steps-practice`.

## What the reader already knows

PDP's order puts this page after `putting-things-in-order`. The page leans
on these pages, all now in `lessons/`: local `static` methods at the top of
a program cell, *parameter*, *argument*, *return*, *pure method*,
`discountRate`, scope and CS0103 for a method's local variable, *modular
programming*, and `out` named with `TryParse` (`writing-your-own-functions`);
arrays, `new int[] { ... }`, `Length`, ranges `[1..]` and `^1`, strings
that cannot be changed (`lists-and-sequences`); `int[][]`
(`grids-and-references`); `Dictionary<char, int>`, counting letters with
`GetValueOrDefault(letter, 0) + 1`, `TryGetValue`, `KeyValuePair`,
`char.IsUpper`, `key['Z']` and "a dictionary does not promise an order"
(`looking-things-up-by-name`); `DivideByZeroException`, and 60.0 / 0
printing ∞ (`reading-an-error-message`, cell `runtime-errors-2`);
`new string('#', row)` (`repeating-yourself-practice`); 0.1 not stored
exactly (`dividing-in-csharp`); `Array.Sort`, `ToArray()` to sort a copy,
the tuple swap, and `BubbleSort` (`putting-things-in-order`);
`LinearSearch` returning -1 (`finding-things`). Each claim above was
checked against the page it names on 28 September 2026.

From a page not yet in `lessons/`, it relies on what the course map says
it teaches: `int.TryParse` with `out` (`reading-input`, named *Reading
input*, as `writing-your-own-functions` also names it).

The map lists `objects-and-classes` (FOOP) as a dependency. A PDP learner
has not read it, so this page uses it only as the pattern for the rules of
the road, and defines *class*, *field* and `static class` itself, without
objects. It says once, in brackets, that the object-oriented course uses
classes to describe kinds of things.

## Pages that point here

- `putting-things-in-order.md` links here already.
- `when-it-goes-wrong.md` (twice: "as `Mean` did on *Reusable methods*"
  and "like the `Check` on *Reusable methods*") and
  `when-it-goes-wrong-practice.md` ("From *Reusable methods*") still name
  this page in italics. Now that this page is in `lessons/`, those three
  can become `[Reusable methods](lesson:building-reusable-tools)`. That
  page is outside this move, so it is not edited here.
- `courses/pdp.yaml` still has this page's line under `planned:` (line
  100). The checklist says to delete it when the page moves; course files
  are outside this move, so it is left for the batch.

## The lesson, section by section

**Opening (`a-mean-that-works-1`).** dewlab's `mean` used `sum()` and
`len()` and stopped with `ZeroDivisionError` on `[]`. The map asks the
predict to change for whole-number division. The C# `Mean` takes `int[]`,
keeps an `int total`, and returns `double`: the version that looks right,
and is dewlab's version c. On `new int[0]` it stops with
`DivideByZeroException`, so the cell has `expect: exception`, and the
prose says before the cell that whatever happens is meant to happen. The
predict gains "Print ∞" (a `double` divided by zero, from *Exceptions*)
and "it does not compile", with notes on why a reader might pick each.
The prose adds one sentence on why the compiler could not see the problem
(a length is a value). The hidden second mistake (c loses the fraction)
is left for the fold in "Which one works?", which reveals that version c
is this method.

**What makes a good method? (`what-makes-a-good-function-1`,
`-program`).** The map: "`what-makes-a-good-function-1` becomes the types
cell". It is `static class Stats` in `Stats.cs`, with `Mean(double[])`
and an XML comment (`<summary>`, `<param>`, `<returns>`), which replaces
the docstring. The program cell under it (decision 26's
`<id>-program`) prints dewlab's two means. The prose explains three new
things: a class (defined without objects), `public static` (with `Console`
and `Math` named as static classes, as the map asks), and the XML comment
and the *contract*. It says what the **Check** button does, in the words of
`objects-and-classes`, and what the `Stats.cs` label means. dewlab's
docstrings began "Give back", which is a phrasal verb; the XML comments say
"Returns", which is also what .NET's own comments say.

**The rules of the road (new section).** Five small cells, in the style
guide's words and the exemplar's shape: a counter that prints `Runs: 1`;
`Stats.Mean(marks)` from the cell below; the same line without `marks`
(`expect: CS0103`, with a one-line solution); `Stats` written again with a
second method, `Total`, and a program that uses it; and `class Report`
with `static void Main()`. Decision 31 names `Game`, the class of
`objects-and-classes`; its point is a `Main` in a class that is not the
template's `class Program`, and `Report` is that shape with a name that
fits a page of statistics. For rule 4, the page asks the reader to call
`Stats.Total` in the cell for rule 2 and see what the compiler says
(CS0117, probe `l-rule2-total`). Rule 5's paragraph adds the Visual Studio
template's "Do not use top-level statements" box, from the course map's
teacher notes.

**Testing as a habit.** C# has no `assert`, and the format has no
`tests:` cell, so the map has the page write a `Check` method once. It is
`Test.Check<T>(string claim, T expected, T found)` in its own types cell
(`testing-as-a-habit-check`, `Test.cs`), not inside `Stats`, word for word
the `Test.Check` of the FOOP pages in `lessons/`. It throws an `Exception`
whose message is `<claim>: expected <x>, found <y>`, so a check that does
not hold stops the program as `assert` did, with no word "failed" (open
question 3 of the map). The page defines *claim* and *holds*, and says in
one sentence that this `Check` is not the **Check** button.
`testing-as-a-habit-1` keeps dewlab's three tests and prints "All three
checks held." dewlab's "change one of the expected answers to something
wrong" became "to a different number" (a verdict word).

**Which one works? (`testing-as-a-habit-2`, `-program`).** dewlab's
heading "Which one is right?" and its "right" and "wrong" became "works",
"gives the mean of every array" and "has a mistake". The four versions
are `Suspects.MeanA` to `MeanD` in one types cell, each with the same
one-line summary (all four promise the same thing). b uses `numbers[1..]`
for dewlab's `numbers[1:]`; c is the opening method, `int total`; d keeps
only the last value. The map asks for "four calls rather than a dictionary
of methods": `TryAll` puts the four calls in a `double[]` and compares each
with the expected mean. The fold keeps dewlab's argument, adds that
`{ 1, 2 }` alone leaves only a, and adds the C# reveal: c differs from a
by one word, and it is the method from the top of the page. The prose asks
"which of the four is the method at the top of this page?" outside the
fold, so the question is there for a reader who does not open it.

**Methods that call methods (`functions-calling-functions-1`,
`-program`).** `Stats` is written again (rule 4) with `Total`, `Mean` and
`StdDev`. There is no list comprehension, so `StdDev` fills a `double[]`
of squares in a `for` loop; `Math.Sqrt` replaces `** 0.5`. The question
"how many times does it call `Mean`?" stays in the prose, not a predict,
since no cell prints the count.

**Your turn 1 (`your-turn-1`, `your-turn-1-tests`).** The map: "`your-turn-1`
and its tests cell (a program cell below)". The types cell keeps
dewlab's id and holds `Stats` with `Total` and `Mean` and a comment where
`DataRange` goes (no `StdDev`, to keep the cell short; the prose says so).
The tests cell keeps dewlab's id `your-turn-1-tests`, and carries the
`inputs`, the hint and the solution. It does not compile until
`DataRange` exists (decision 27, `expect: CS0117`: a missing static member
is CS0117, not CS1061). dewlab's stub `return 0` goes, as decision 27
prefers. The `inputs` lose `guess: yes`, and gain the empty array (see
"What the move changed"). The hint uses `values.Max()` and
`values.Min()`, defined in the hint. The solution writes only `DataRange`
in its `Stats`, to keep it short, and its note says so. dewlab's note
"Your tests run against your function and against this one" is not true
here (the solution replaces the whole cell), so the note says what Compare
does run, and what the page shows when a check of the reader's stops the
cell.

**Handling edge cases.** `handling-edge-cases-1` keeps dewlab's "helpful"
method that prints a message. In C#, dewlab's `if`/`else` shape, with no
`return` in the `if`, does not compile (CS0161, probe `l-cs0161`), so the
C# version prints and then falls through to the division. With `double`,
0.0 / 0 is NaN, which is the map's "`0.0 / 0` is NaN, which is not an
exception at all", and NaN plays the part that dewlab's `None` played: a
value that travels and makes trouble far from its cause. The predict has
five options: dewlab's three (the "stops with an error" option is now a
`DivideByZeroException`), plus ∞ and NaN. The two better ways are in
`Stats` again (`handling-edge-cases-2`): `Mean` throws
`ArgumentException` (for `raise ValueError`), with `<exception>` in its
XML comment, and `TryMean(values, out double mean)` in the `TryParse`
shape (for `return None`), as the map asks. `handling-edge-cases-2-program`
tries both and stops on the last line (`expect: exception`; the prose says
so before the cell). `handling-edge-cases-3` is new: the map's "`try` and
`catch` appear where a caller handles the exception". The descriptor's
"error trapping" (PDP) is met here.

**Your turn 2, both worlds.** Each is a types cell (`Letters.cs`,
`Pixels.cs`) with a comment where the method goes, and a tests cell with
one starter check, `expect: CS0117`, the `inputs`, two hints (the first a
question) and a solution. The empty-input row of each `inputs` block is
marked `// throws`, which the format asks for (the solution throws there
on purpose). Secret messages: `MostCommon(string text)` returns `char`,
counts with `GetValueOrDefault`, and throws `ArgumentException` when
there are no capitals. The note keeps dewlab's question about a tie
(`"ABAB"`), without an answer (probe `l-abab`: `A` for `"ABAB"` and `B`
for `"BABA"`, the letter the dictionary met first, an order it does not
promise). Pixel art: `AverageBrightness(int[] row)` with a `double` total;
the second hint points at versions a and c. 127.5 is recorded (probe
`l-pixel-int-total` shows the `int` total gives 127).

**Variable scope, again.** dewlab's `with_border` is
`Picture.WithBorder(int width)` in a types cell, with the commented-out
line under it in a program cell (CS0103, probe `l-scope-edge`). The map's
teacher notes say this page shows "a field of a `static class`" as the
nearest thing to a global variable, so a second program cell
(`variable-scope-revisited-2`, new) changes `Picture.Brick` and shows that
the same call gives a different box. The prose defines *field* and
*global variable*, ties it to `discountRate` on *Methods*, and adds that a
field does not keep its value from one Run to the next (rule 1). dewlab's
"Information goes in only through parameters" was no longer true with a
field in the class, so the sentence is now about a method's own
variables.

**Looking back.** dewlab's questions stay. The challenge checks
`BubbleSort` against `Array.Sort` on 100 random arrays, as the map says.
dewlab's `assert` stops at the first difference; the C# version prints each
array that sorts differently and a count, so the reader can look for the
shortest one. It compares arrays with `string.Join`, and copies with
`ToArray()`. `Random.Shared`, since nothing quotes its output. The
checker compiles the challenge alone and does not run it (decision 40):
probes `l-challenge` (it prints "100 random arrays. 0 sorted differently
from Array.Sort.") and `l-challenge-broken` (a seeded run with a mistake
in the inner loop's bound, which catches 53 arrays of 100) ran it in the
browser. The last paragraph says what belongs in Visual Studio: nothing
on this page needs it, and **Download project** takes a program there,
with a file for each class.

**Where to read more.** dewlab's two sources were about Python. The four
new ones are Microsoft Learn pages, all fetched on 27 September 2026:
*Static Classes and Static Class Members*, *Exceptions and Exception
Handling*, *Recommended XML documentation tags*, and *Unit testing C# code
in .NET using dotnet test and xUnit* (which plays the part of dewlab's
unittest video: "the second step").

## Predicts

Two on the lesson, where C# does something a reader would not expect:
the opening (an exception from whole numbers, where ∞ is a likely guess)
and `handling-edge-cases-1` (NaN, where ∞ or an exception are likely
guesses). dewlab's page had the same two. Neither lists an answer as
right. No `# I think:` cells.

## The practice page

The intro adds the rules of the road in one sentence each, as
`objects-and-classes-practice` does, and a types cell with `Test`
(`a-tool-for-tests-1`), because each page has its own cells.

1. **An XML comment for F.** Code to read; the fold has `Midpoint` with a
   `<summary>`. Its last sentence changed (see "What the move changed").
2. **What an XML comment says.** The fold gains a C# point: the compiler
   checks "numbers", and the comment still has to say "not empty".
3. **A comment that is not true.** Now two cells (`Numbers.Average`, and a
   program that prints 4.5 and NaN), so the reader can see the problem, and
   the NaN in the fold is recorded. In C# the empty array gives NaN, not
   dewlab's `ZeroDivisionError`.
4. **The middle value.** `Stats.Median` with a tests cell. `sorted()`
   becomes `ToArray()` and `Array.Sort`; the solution adds a check that the
   caller's array keeps its order, which is the reason for the copy. The
   last `inputs` row is the empty array (`// throws`).
5. **What breaks them.** The fold names NaN (problem 3),
   `IndexOutOfRangeException` (problem 4's last row) and
   `InvalidOperationException` (the last row of the lesson's first task).
   dewlab's "breaks on a list holding a string" becomes a compiler error in
   C# (probe `p-string-in-double-array`, CS0029), and the fold says so.
6. **Three ways.** `None` becomes the `TryParse` shape. dewlab's "When is
   each one right?" and "that is right / wrong" became "make sense", "a
   real answer" and "an invented answer". The empty sum is probe
   `p-sum-empty` (0).
7. **The mean of true and false.** In C#, `total + answer` does not compile
   (CS0019), so the predict changes from a number to a choice, and a
   solution counts the yeses (0.6666666666666666).
8. **A good method, and a check that does not hold.** `assert ... ==
   0.15` becomes `Test.Check`; the message shows 0.15000000000000002. The
   solution checks that the difference is below 0.000000001 (dewlab's
   `1e-9`).
9. **A test that holds at once.** Fold only.
10. **A test that checks for an exception.** `try`/`except`/`else`
    becomes `try`/`catch`, with the line after the call in `try` doing the
    work of `else` (C# has no `try`...`else`). Code to read in the fold;
    probe `p-catch-test` runs it.
11. **Reads the same both ways**, both worlds. `[::-1]` becomes a loop
    that builds the backwards copy; `row[::-1]` becomes a comparison of
    `row[i]` with `row[row.Length - 1 - i]`. The empty picture is
    `new int[][] { }`.
12. **The longest word.** `Split(' ')` for `split()`. On `""` it gives one
    empty word, so the method returns `""` either way.
13. **The most frequent.** `Stats.Mode(int[])`. The solution's second loop
    goes through the array, not the dictionary, so that "the value that
    appears first wins" does not depend on the dictionary's order, which
    C# does not promise; the note says so.
14. **From earlier: sorting a string.** dewlab's `sorted("CAB")` gives a
    list. In C#, `Array.Sort(word)` does not compile (CS1503), and the
    solution sorts `ToCharArray()`, then prints `word` to show it did not
    change.
15. **From earlier: minus one as an index.** In Python, `names[-1]` is the
    last element and the mistake prints HERON. In C# it stops with
    `IndexOutOfRangeException`, so the predict's answer changes, and the
    fold says why that is the easier mistake to find.
16. **From earlier: a key that is not there.** `.get("Z")` giving `None`
    becomes `GetValueOrDefault('Z')` giving 0, and the fold ties it to
    problem 6's third way.

Problem 8's id keeps dewlab's `a-test-that-fails-a-good-function-1`
(decision 28 renames only ids that name Python); its heading changed.

## The glossary file

dewsharp has no glossary panel (`docs/LESSON_FORMAT.md`), so each of
dewlab's seven terms is defined in the prose where it first appears:
*docstring* becomes *XML comment*; *contract*; *standard deviation*; *edge
case*; *test*; `assert` becomes `Test.Check` with *claim* and *holds*;
`raise` becomes `throw`. New terms defined on the page: *mean*, *class*,
`static class`, `public`, *XML*, *rules of the road*, *NaN*, *caller*,
`out` (as used in a method we write), `ArgumentException`, `try` and
`catch`, *field*, *global variable*. The glossary's example
"`std_dev([10, 20, 30])` is about 8.165" is in the lesson as the recorded
8.16496580927726.

## What C# made different, in short

- The page is PDP's first with a class, so it gained the rules of the
  road, all five, and a whole section.
- Whole-number division turns dewlab's version c into the version that
  looks right, and the opening method is that version.
- An empty array gives two different results: an exception with `int`, and
  NaN with `double`. NaN takes the place of `None`.
- No `assert` and no `tests:` cells: a `Check` method in a types cell, and
  tests as program cells.
- `raise` becomes `throw new ArgumentException`, `return None` becomes
  `TryMean` with `out`, and `try`/`catch` is taught here, not only in
  practice 10.
- The compiler catches three of dewlab's run-time surprises before the run:
  a `bool` added to an `int`, a string in an array of numbers, and a string
  passed to `Array.Sort`. A fourth, Python's negative index, becomes an
  exception.
- A global variable is a field of a static class.

## Where each number in the prose comes from

All from the browser checker's recorded outputs, 28 September 2026, or
from a probe below, run in the browser.

| Prose | Cell or probe | Recorded |
|---|---|---|
| lesson opening: 20, then `DivideByZeroException` on the `return` line | `a-mean-that-works-1` | `20`; exception at line 8 |
| "It prints 20 and 3" | `what-makes-a-good-function-1-program` | `20`, `3` |
| `Runs: 1` | `the-rules-of-the-road-1` | `Runs: 1` |
| 63 (rules 2 and 3, and rule 3's solution) | `the-rules-of-the-road-2`, `-3` solution | `63` |
| CS0103 and its message | `the-rules-of-the-road-3` | same |
| 189 and 63 | `the-rules-of-the-road-4-program` | `189`, `63` |
| `Mean mark: 63` | `the-rules-of-the-road-5` | `Mean mark: 63` |
| rule 4: what the compiler says in the cell for rule 2 (not quoted) | probe `l-rule2-total` | CS0117 |
| "All three checks held." | `testing-as-a-habit-1` | same |
| the report names two lines | page, and practice `a-test-that-fails-a-good-function-1` | two frames: line 11 of `Test.cs`, and the calling line |
| fold: `{ 10, 20, 30 }` catches b and d, not c | `testing-as-a-habit-2-program` | `a agrees`, `b gives 16.666666666666668`, `c agrees`, `d gives 10` |
| fold: `{ 1, 2 }` catches b, c and d | probe `l-fold-c-one-two` | `a 1.5, b 1, c 1, d 1` |
| 8.16496580927726 | `functions-calling-functions-1-program` | same |
| DataRange: with one value, 0; with none, `InvalidOperationException` | `your-turn-1-tests` solution, last two `inputs` rows | `0`; `InvalidOperationException` |
| the message, then NaN | `handling-edge-cases-1` | `Cannot take the mean of nothing`, `NaN` |
| 60.0 / 0 gave ∞ on *Exceptions* | `reading-an-error-message`, `runtime-errors-2` | `∞` |
| `There is no mean...`, then `ArgumentException`, message | `handling-edge-cases-2-program` | same |
| `No mean mark yet. Mean needs at least one number.`, `The program continues.` | `handling-edge-cases-3` | same |
| pixel art: 127.5 | `your-turn-2-tests--pixel-art` solution, input `{ 0, 255 }` | `127.5` |
| scope: the name the compiler doesn't know (not quoted) | probe `l-scope-edge` | CS0103 for `edge` |
| the first box is made of `#` again | `variable-scope-revisited-2` | `####` ... then `****` ... |
| practice 3: NaN, not 0 | `a-comment-that-is-not-true-1-program` | `4.5`, `NaN` |
| practice 4: 2.5 | `the-middle-value-1-tests` solution, input `{ 4, 1, 3, 2 }` | `2.5` |
| practice 5: NaN, `IndexOutOfRangeException`, `InvalidOperationException` | problem 3; `the-middle-value-1-tests` and `your-turn-1-tests` last rows | as named |
| practice 5: a string in a `double[]` does not compile | probe `p-string-in-double-array` | CS0029 |
| practice 6: the sum of an empty array is 0 | probe `p-sum-empty` | `0` |
| practice 7: CS0019 and its message, and 0.6666666666666666 | `the-mean-of-true-and-false-1` and its solution | same |
| practice 8: 0.15000000000000002; `Every check held.` | `a-test-that-fails-a-good-function-1` and its solution | in the exception's message; same |
| practice 11: an empty string, and an empty picture, give `true` | the two tests cells' solutions, last row | `true` |
| practice 12: "quick" | `the-longest-word-1-tests` solution, input | `"quick"` |
| practice 13: `{ 2, 1, 1, 2 }` gives 2 | `the-most-frequent-1-tests` solution, input | `2` |
| practice 14: CS1503 and its message, then ABC and CAB | `from-earlier-sorting-a-string-1` and its solution | same |
| practice 15: `IndexOutOfRangeException` | `from-earlier-minus-one-as-an-index-1` | same |
| practice 16: 0 | `from-earlier-a-key-that-is-not-there-1` | `0` |

The numbers 0.1, 0.2, 0.15, 55, 70, 64 and the arrays in the tasks are
inputs, not outputs.

## Open questions

The porter's seven questions, each with what was decided on 28 September
2026 and what decided it. Two stay open for Josh, under "Open" below.

1. **One `Test.Check` for the site.** The porter's question: this page's
   `Check<T>(string claim, T expected, T found)` throws when the values
   differ, as `assert` did; the next PDP page, `when-it-goes-wrong`, has
   `Check(string claim, object expected, object found)`, which prints a
   line for every check and never stops.
   *Decided for this page:* keep `Check<T>`, the throwing one. The example
   lessons answer it: every page in `lessons/` with a `Test` class
   (`testing-what-a-class-does`, `documenting-a-class`,
   `mixed-programming-with-objects`, `your-world-playable`,
   `a-front-end-for-a-class-practice`) has this `Check<T>`, word for word.
   Whether `when-it-goes-wrong` should change to it is under "Open".
2. **The name `Check`.** A PDP reader meets the **Check** button and the
   `Check` method on one page.
   *Decided:* keep `Check`. The course map names it (its open question 3,
   and this page's entry), and every `Test` class in `lessons/` uses it.
   The page says in one sentence that the method is not the button.
3. **The rules of the road on a PDP page, and the page's length.** Still
   open: see "Open".
4. **`<T>` in PDP.** `Check<T>` is the first generic method a PDP reader
   sees.
   *Decided:* keep `<T>`, with the page's one sentence that compares it
   with `List<T>`, which `lists-and-sequences` taught.
   `testing-what-a-class-does` explains its `Check<T>` with the same
   comparison, and the method is the one every `Test` class in `lessons/`
   has. Three overloads would bring in overloading, which the course map
   puts in FOOP (`one-class-many-methods`).
5. **`public static` and the earlier `static`.**
   *Decided:* one sentence connects the two meanings. On *Methods*,
   `static` on a method in a cell meant it could use only its parameters
   and its own variables; a `static` method in a class can also use a
   variable that its class keeps, as "Variable scope, again" shows. The
   style guide asks for each term to be defined where it appears, and this
   is where `static` changes what it allows.
6. **Test cell ids.**
   *Decided:* keep `your-turn-1-tests`, `your-turn-2-tests--<world>` and
   the practice page's `-tests` ids. Every one of them is a cell id on
   dewlab's page, whose task is the same, so decision 28 keeps it.
   Decision 26 (`<id>-program`) is for one dewlab cell that becomes two;
   the `-program` cells on these pages are exactly those
   (`what-makes-a-good-function-1-program`, `testing-as-a-habit-2-program`,
   `functions-calling-functions-1-program`,
   `handling-edge-cases-2-program`, `variable-scope-revisited-1-program`,
   `a-comment-that-is-not-true-1-program`). `testing-what-a-class-does`
   (`your-class-6-tests--<world>`) and `when-it-goes-wrong` do the same.
   Each tests cell is the cell that runs, and holds the `inputs`, the hints
   and the solution.
7. **The opening method has two mistakes**, and only the fold of "Which one
   works?" says so.
   *Decided:* keep it in the fold. The style guide's `#how-a-page-teaches`
   puts an answer in a fold that the reader opens after an attempt. The
   question itself, "which of the four is the method at the top of this
   page?", is in the prose above the fold, so every reader meets it.

### Open

For Josh:

- **The page's length (the porter's question 3).** Decision 12 puts all
  five rules of the road here, and the section adds six cells to an L page.
  The course map lets "Handling edge cases" move to a second page "if it
  runs long". The page is 6,057 words and 26 cells in each world; for
  comparison, `writing-your-own-functions` is 5,586 words and 24 cells,
  and `testing-what-a-class-does` 7,267 words. It is kept as one page. If
  it is split, the natural place is after "Your turn" in "Methods that
  call methods": the second page would start at "Handling edge cases", and
  would need its own copy of `Stats` and `Test` in its first cells.
- **`when-it-goes-wrong` has a different `Check`.** It prints a line for
  every check and never stops, with `object` parameters. That version has
  a trap for this page's tests: `Check("...", 20, Stats.Mean(...))` passes
  an `int` and a `double`, `Equals` on the two boxed values is false, and
  it prints "expected 20, found 20" (probe `p-object-check`, same in the
  browser). The generic `Check<T>` turns 20 into 20.0 first. A reader goes
  from this page's `Check` to that page's in one step. One `Check` for the
  site would be simpler; a printing version could keep the generic
  signature. This is a question about `when-it-goes-wrong`, which is
  outside this move.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
tests an alternative for a reviewer. They were first run with the native
checker in `drafts/`, and on 28 September 2026 in the browser engine, in
a scratch lesson (`node tools/check-lessons.mjs --lessons <scratch>/lessons
--write`, `docs/TRANSLATING.md`, "The checker"). Every probe gave the same
result in both; the browser's results are quoted above where they matter.
The cells with `expect:` fail on purpose. None of them is part of either
page. The class that does not compile is last, because every cell below a
class compiles it.

```csharp exec
id: l-fold-c-one-two
// Lesson, fold "one way it goes": { 1, 2 } on its own catches b, c and d (each gives 1).
static double MeanA(int[] numbers) { double total = 0; foreach (int value in numbers) total = total + value; return total / numbers.Length; }
static double MeanB(int[] numbers) { double total = 0; foreach (int value in numbers[1..]) total = total + value; return total / numbers.Length; }
static double MeanC(int[] numbers) { int total = 0; foreach (int value in numbers) total = total + value; return total / numbers.Length; }
static double MeanD(int[] numbers) { double total = 0; foreach (int value in numbers) total = value; return total / numbers.Length; }
int[] pair = { 1, 2 };
Console.WriteLine($"a {MeanA(pair)}, b {MeanB(pair)}, c {MeanC(pair)}, d {MeanD(pair)}");
```

```csharp exec
id: l-rule2-first-stats
file: Stats.cs
// Lesson, rule 4: the first Stats, as in what-makes-a-good-function-1.
static class Stats
{
    public static double Mean(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total / values.Length;
    }
}
```

```csharp exec
id: l-rule2-total
expect: CS0117
// Lesson, rule 4: Stats.Total in the cell for rule 2, under the first Stats.
double[] marks = { 55, 70, 64 };
Console.WriteLine(Stats.Mean(marks));
Console.WriteLine(Stats.Total(marks));
```

```csharp exec
id: l-no-public
expect: CS0122
// Lesson, "public lets code outside the class call the method".
Console.WriteLine(Quiet.Half(10));

static class Quiet
{
    static double Half(double value)
    {
        return value / 2;
    }
}
```

```csharp exec
id: l-rule5-below-main
// Lesson, rule 5: a class with Main.
class Report
{
    static void Main()
    {
        Console.WriteLine("Report's Main");
    }
}
```

```csharp exec
id: l-rule5-below
expect: CS0246
// Lesson, rule 5: "The cells below can't use Report".
Console.WriteLine(typeof(Report).Name);
```

```csharp exec
id: l-check-test
file: Test.cs
static class Test
{
    public static void Check<T>(string claim, T expected, T found)
    {
        if (!expected.Equals(found))
        {
            throw new Exception($"{claim}: expected {expected}, found {found}");
        }
    }
}
```

```csharp exec
id: l-check-frames
// Lesson, testing-as-a-habit-1: the report names the line in Check and the line that called it.
try
{
    Test.Check("the mean of 10, 20 and 30 is 25", 25, 20.0);
}
catch (Exception exception)
{
    Console.WriteLine(exception.Message);
    Console.WriteLine(exception.StackTrace);
}
```

```csharp exec
id: l-sixty
// Lesson, handling-edge-cases-1: 60.0 / 0 is infinity, and 0.0 / 0 is NaN.
double people = 0;
Console.WriteLine(60.0 / people);
Console.WriteLine(0.0 / people);
```

```csharp exec
id: l-max-empty
expect: exception
// Lesson, your-turn-1 solution note, and practice 5: Max() on no values.
double[] none = new double[0];
Console.WriteLine(none.Max());
```

```csharp exec
id: l-cs0161
expect: CS0161
// Lesson, handling edge cases: dewlab's if/else shape, with no return in the if, does not compile.
static double Mean(double[] values)
{
    if (values.Length == 0)
    {
        Console.WriteLine("Cannot take the mean of nothing");
    }
    else
    {
        return values.Sum() / values.Length;
    }
}
Console.WriteLine(Mean(new double[0]));
```

```csharp exec
id: l-abab
// Lesson, secret-messages solution note: what MostCommon gives for a tie. Not quoted in the prose.
static char MostCommon(string text)
{
    Dictionary<char, int> counts = new Dictionary<char, int>();
    foreach (char character in text)
    {
        if (char.IsUpper(character))
        {
            counts[character] = counts.GetValueOrDefault(character, 0) + 1;
        }
    }
    char best = ' ';
    int bestCount = 0;
    foreach (KeyValuePair<char, int> pair in counts)
    {
        if (pair.Value > bestCount)
        {
            best = pair.Key;
            bestCount = pair.Value;
        }
    }
    return best;
}
Console.WriteLine(MostCommon("ABAB"));
Console.WriteLine(MostCommon("BABA"));
```

```csharp exec
id: l-pixel-int-total
// Lesson, pixel-art hint 2: with an int total, { 0, 255 } gives 127, not 127.5.
static double AverageWithIntTotal(int[] row)
{
    int total = 0;
    foreach (int value in row)
    {
        total = total + value;
    }
    return total / row.Length;
}
Console.WriteLine(AverageWithIntTotal(new int[] { 0, 255 }));
```

```csharp exec
id: l-scope-edge-picture
file: Picture.cs
static class Picture
{
    public static char Brick = '#';

    public static string WithBorder(int width)
    {
        string edge = new string(Brick, width);
        string middle = Brick + new string('.', width - 2) + Brick;
        return edge + "\n" + middle + "\n" + edge;
    }
}
```

```csharp exec
id: l-scope-edge
expect: CS0103
// Lesson, variable-scope-revisited-1-program with the // deleted.
Console.WriteLine(Picture.WithBorder(6));
Console.WriteLine(edge);
```

```csharp exec
id: l-challenge
// Lesson, the challenge, exactly as on the page.
static int[] BubbleSort(int[] items)
{
    for (int pass = 0; pass < items.Length - 1; pass++)
    {
        for (int i = 0; i < items.Length - 1 - pass; i++)
        {
            if (items[i] > items[i + 1])
            {
                (items[i], items[i + 1]) = (items[i + 1], items[i]);
            }
        }
    }
    return items;
}

int differences = 0;
for (int trial = 0; trial < 100; trial++)
{
    int[] items = new int[Random.Shared.Next(0, 9)];
    for (int i = 0; i < items.Length; i++)
    {
        items[i] = Random.Shared.Next(0, 10);
    }
    int[] expected = items.ToArray();
    Array.Sort(expected);
    int[] sorted = BubbleSort(items.ToArray());
    if (string.Join(", ", sorted) != string.Join(", ", expected))
    {
        Console.WriteLine($"Sorted differently: {string.Join(", ", items)}");
        differences++;
    }
}
Console.WriteLine($"100 random arrays. {differences} sorted differently from Array.Sort.");
```

```csharp exec
id: l-challenge-broken
// Lesson, the challenge with a mistake (the inner loop stops one place early), seeded.
static int[] BubbleSort(int[] items)
{
    for (int pass = 0; pass < items.Length - 1; pass++)
    {
        for (int i = 0; i < items.Length - 2 - pass; i++)
        {
            if (items[i] > items[i + 1])
            {
                (items[i], items[i + 1]) = (items[i + 1], items[i]);
            }
        }
    }
    return items;
}

Random random = new Random(1);
int differences = 0;
for (int trial = 0; trial < 100; trial++)
{
    int[] items = new int[random.Next(0, 9)];
    for (int i = 0; i < items.Length; i++)
    {
        items[i] = random.Next(0, 10);
    }
    int[] expected = items.ToArray();
    Array.Sort(expected);
    int[] sorted = BubbleSort(items.ToArray());
    if (string.Join(", ", sorted) != string.Join(", ", expected))
    {
        differences++;
        if (differences <= 3)
        {
            Console.WriteLine($"Sorted differently: {string.Join(", ", items)}");
        }
    }
}
Console.WriteLine($"100 random arrays. {differences} sorted differently from Array.Sort.");
```

```csharp exec
id: p-median-empty
expect: exception
// Practice 5: Median, from problem 4's solution, on an empty array.
static double Median(double[] values)
{
    double[] ordered = values.ToArray();
    Array.Sort(ordered);
    int middle = ordered.Length / 2;
    if (ordered.Length % 2 == 1)
    {
        return ordered[middle];
    }
    return (ordered[middle - 1] + ordered[middle]) / 2;
}
Console.WriteLine(Median(new double[0]));
```

```csharp exec
id: p-string-in-double-array
expect: CS0029
// Practice 5: a double[] cannot hold a string.
double[] values = { 1, "two" };
Console.WriteLine(values.Length);
```

```csharp exec
id: p-sum-empty
// Practice 6: the sum of an empty array is 0.
Console.WriteLine(new double[0].Sum());
```

```csharp exec
id: p-catch-test-stats
file: Stats.cs
// Practice 10: a Stats whose Mean throws, as in handling-edge-cases-2.
static class Stats
{
    public static double Mean(double[] values)
    {
        if (values.Length == 0)
        {
            throw new ArgumentException("Mean needs at least one number.");
        }
        return values.Sum() / values.Length;
    }
}
```

```csharp exec
id: p-catch-test
// Practice 10: the fold's code, as written there.
try
{
    Stats.Mean(new double[0]);
    Console.WriteLine("No exception: the check for an empty array is missing.");
}
catch (ArgumentException)
{
    Console.WriteLine("An ArgumentException, as the XML comment promises.");
}
```

```csharp exec
id: p-object-check
// Open question 1: when-it-goes-wrong's Check with object parameters, given an int and a double.
static void CheckObjects(string claim, object expected, object found)
{
    if (Equals(expected, found))
    {
        Console.WriteLine($"{claim}: {found}, as expected");
    }
    else
    {
        Console.WriteLine($"{claim}: expected {expected}, found {found}");
    }
}
CheckObjects("the mean of 10, 20 and 30 is 20", 20, 20.0);
Test.Check("the same claim, with this page's Check<T>", 20, 20.0);
Console.WriteLine("Check<T> said nothing: 20 became 20.0, and the two are equal.");
```

```csharp exec
id: p-static-classes
// Lesson: Console and Math are static classes (C# compiles a static class as abstract and sealed).
Console.WriteLine(typeof(System.Console).IsAbstract && typeof(System.Console).IsSealed);
Console.WriteLine(typeof(Math).IsAbstract && typeof(Math).IsSealed);
```

```csharp exec
id: l-no-static-member
expect: CS0708
// Lesson, "every method in a static class has it": a method without static does not compile. Last, on purpose.
static class Loud
{
    public double Twice(double value)
    {
        return value * 2;
    }
}
```
