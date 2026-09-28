# building-reusable-tools: notes for a reviewer

Ported from dewlab `tutorials/building-reusable-tools/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 22):
action *adapt*, shape *tutorial*, size L, batch 7, depends on
`putting-things-in-order` and `objects-and-classes`.

No earlier draft was in this folder when this run started, so everything
here is new in this run.

Files:

- `building-reusable-tools.md`: the lesson. 28 exec cells, 4 of them in
  world variants (so 26 in each world); 2 predicts, 5 hints, 4 solutions,
  3 `inputs` blocks, 1 challenge, 1 fold. Six cells are meant to fail:
  `a-mean-that-works-1` and `handling-edge-cases-2-program`
  (`expect: exception`), `the-rules-of-the-road-3` (`CS0103`), and the
  three tests cells of the tasks (`CS0117`, decision 27).
- `building-reusable-tools-practice.md`: the practice page, 16 problems.
  18 exec cells, 4 of them in world variants; 5 predicts, 5 hints,
  8 solutions, 5 `inputs` blocks, 12 folds. Nine cells are meant to fail
  (six tests cells with `CS0117`, and `CS0019`, `CS1503` and two
  `exception`).
- `building-reusable-tools.native.json`,
  `building-reusable-tools-practice.native.json`: what the native check
  recorded for every cell, solution and `inputs` row.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for
each page, and for the probes in this file.

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
  `covers`, as the other drafted practice pages do. Its title,
  "Reusable methods: practice", follows `first-steps-practice`.

## What the reader already knows

PDP's order puts this page after `putting-things-in-order`. The page leans
on these drafts: local `static` methods at the top of a program cell,
*parameter*, *argument*, *return*, *pure method*, `discountRate`, scope and
CS0103 for a method's local variable, *modular programming*, and `out`
named with `TryParse` (`writing-your-own-functions`); arrays, `new int[]
{ ... }`, `Length`, ranges `[1..]` and `^1`, strings that cannot be changed
(`lists-and-sequences`); `int[][]` (`grids-and-references`);
`Dictionary<char, int>`, `GetValueOrDefault`, `KeyValuePair`, `char.IsUpper`
and "a dictionary does not promise an order" (`looking-things-up-by-name`);
`DivideByZeroException`, ∞ for a `double` divided by zero, and the
exception report (`reading-an-error-message`); `numbers.Max()`, named in a
solution note (`repeating-yourself-practice`); `Array.Sort`, `ToArray()`
to sort a copy, the tuple swap, and `BubbleSort` (`putting-things-in-order`);
`LinearSearch` returning -1 (`finding-things`).

From pages not drafted, it relies on what the course map says they teach:
`int.TryParse` with `out` (`reading-input`), and 0.1 not being stored
exactly (`dividing-in-csharp` is drafted; its cell prints
0.30000000000000004).

The map lists `objects-and-classes` (FOOP) as a dependency. A PDP learner
has not read it, so this page uses it only as the pattern for the rules of
the road, and defines *class*, *field* and `static class` itself, without
objects. It says once, in brackets, that the object-oriented course uses
classes to describe kinds of things.

## Links: decision 32

The brief says links use `lesson:`. `DECISIONS.md` 32 and 39, and
`docs/LESSON_FORMAT.md` ("Links"), say a `lesson:` link must go to a page
in `lessons/`, and a page not yet there is named by its short title in
italics. Only `first-steps` and `objects-and-classes` are in `lessons/`, and
neither is a page this one needs to link to. So the one link is the
lesson's link to its own practice page, as both exemplars have; it
resolves when the two pages move into `lessons/` together.

| Where | Italic name | Link to add later | That page's batch |
|---|---|---|---|
| lesson, methods that call methods | *Methods* | `lesson:writing-your-own-functions` | 3 |
| lesson, handling edge cases | *Reading input* | `lesson:reading-input` | 4 |
| lesson, variable scope (twice) | *Methods* | `lesson:writing-your-own-functions` | 3 |
| lesson, looking back | *Sorting* | `lesson:putting-things-in-order` | 6 |
| lesson, looking back | *Debugging* | `lesson:when-it-goes-wrong` | 8 |
| lesson, looking back | *A whole program* | `lesson:from-cells-to-a-program` | 8 |
| lesson, your turn 2 (hint) | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |
| practice 8 | *Dividing* | `lesson:dividing-in-csharp` | 1 |
| practice 13 | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |
| practice 14 | *Sorting*, *Arrays and lists* | `lesson:putting-things-in-order`, `lesson:lists-and-sequences` | 6, 3 |
| practice 15 | *Searching* | `lesson:finding-things` | 5 |
| practice 16 | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |

Pages that point here, which I did not edit (this run writes only in this
folder): `putting-things-in-order.md` ("The next page, *Reusable methods*,
makes the testing you did here into a habit") and `when-it-goes-wrong.md`
(twice: "as `Mean` did on *Reusable methods*", which matches this page's
`Mean` that throws `ArgumentException`; and "like the `Check` on
*Reusable methods*", see open question 1).

## The lesson, section by section

**Opening (`a-mean-that-works-1`).** dewlab's `mean` used `sum()` and
`len()` and stopped with `ZeroDivisionError` on `[]`. The map asks the
predict to change for whole-number division. The C# `Mean` takes `int[]`,
keeps an `int total`, and returns `double`: the version that looks right,
and is dewlab's version c. On `new int[0]` it stops with
`DivideByZeroException`, so the cell has `expect: exception`, and the
prose says it is meant to stop after the reader has guessed. The predict
gains "Print ∞" (a `double` divided by zero, from *Exceptions*) and "it
does not compile", with notes on why a reader might pick each. The prose
adds one sentence on why the compiler could not see the problem (a length
is a value). The hidden second mistake, `{ 1, 2 }` giving 1, is left for
the fold in "Which one works?", which reveals that version c is this
method.

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
with `static void Main()` (decision 31's shape, with a PDP name). For rule
4, the page asks the reader to call `Stats.Total` in the cell for rule 2
and see CS0117 there (probe `l-rule2-total`). Rule 5's paragraph adds the
Visual Studio template's "Do not use top-level statements" box, from the
course map's teacher notes.

**Testing as a habit.** C# has no `assert`, and the format has no
`tests:` cell, so the map has the page write a `Check` method once. It is
`Test.Check<T>(string claim, T expected, T found)` in its own types cell
(`testing-as-a-habit-check`, `Test.cs`), not inside `Stats`: see open
question 1. It throws an `Exception` whose message is
`<claim>: expected <x>, found <y>`, so a check that does not hold stops
the program as `assert` did, with no word "failed" (open question 3 of the
map). The page defines *claim* and *holds*, and says in one sentence that
this `Check` is not the **Check** button (open question 2).
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
with the expected mean. The fold keeps dewlab's argument, and adds the C#
reveal: c differs from a by one word, and it is the method from the top of
the page. "`{ 1, 2 }` catches c: it gives 1" is probe `l-fold-c-one-two`.

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
`inputs`, the hint and the solution, as decision 26 puts them on the
program cell. It does not compile until `DataRange` exists (decision 27,
`expect: CS0117`: a missing static member is CS0117, not CS1061). dewlab's
stub `return 0` goes, as decision 27 prefers. The `inputs` lose
`guess: yes`. The hint uses `values.Max()` and `values.Min()`, defined in
the hint. The solution writes only `DataRange` in its `Stats`, to keep it
short, and its note says so. dewlab's note "Your tests run against your
function and against this one" is not true here (the solution replaces the
whole cell), so the note says what Compare does run.

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
promise). Pixel art: `AverageBrightness(int[]
row)` with a `double` total; the second hint points at versions a and c.
127.5 is recorded (probe `l-pixel-int-total` shows the `int` total gives
127).

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
checker does not run challenges: probes `l-challenge` (it prints "100
random arrays. 0 sorted differently from Array.Sort.") and
`l-challenge-broken` (a seeded run with a mistake in the inner loop's
bound, which catches arrays).

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
   `<summary>`.
2. **What an XML comment says.** The fold gains a C# point: the compiler
   checks "numbers", and the comment still has to say "not empty".
3. **A comment that is not true.** Now two cells (`Numbers.Average`, and a
   program that prints 4.5 and NaN), so the reader can see the problem, and
   the NaN in the fold is recorded. In C# the empty array gives NaN, not
   dewlab's `ZeroDivisionError`.
4. **The middle value.** `Stats.Median` with a tests cell. `sorted()`
   becomes `ToArray()` and `Array.Sort`; the solution adds a check that the
   caller's array keeps its order, which is the reason for the copy.
5. **What breaks them.** The fold names NaN, `IndexOutOfRangeException`
   and `InvalidOperationException` (probes `p-median-empty`,
   `l-max-empty`). dewlab's "breaks on a list holding a string" becomes a
   compiler error in C# (probe `p-string-in-double-array`, CS0029), and the
   fold says so.
6. **Three ways.** `None` becomes the `TryParse` shape. dewlab's "When is
   each one right?" and "that is right / wrong" became "make sense", "a
   real answer" and "a made-up answer". The empty sum is probe
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
    solution sorts `ToCharArray()`.
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
`static class`, `public`, *XML*, *rules of the road*, *NaN*, `out` (as
used in a method we write), `ArgumentException`, `try` and `catch`,
*field*, *global variable*. The glossary's example "`std_dev([10, 20,
30])` is about 8.165" is in the lesson as the recorded 8.16496580927726.

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

| Prose | Cell or probe | Recorded |
|---|---|---|
| lesson opening: 20, then `DivideByZeroException` on the `return` line | `a-mean-that-works-1` | `20`; exception at line 8 |
| "It prints 20 and 3" | `what-makes-a-good-function-1-program` | `20`, `3` |
| `Runs: 1` | `the-rules-of-the-road-1` | `Runs: 1` |
| 63 (rules 2 and 3, and rule 3's solution) | `the-rules-of-the-road-2`, `-3` solution | `63` |
| 189 and 63 | `the-rules-of-the-road-4-program` | `189`, `63` |
| `Mean mark: 63` | `the-rules-of-the-road-5` | `Mean mark: 63` |
| rule 4: CS0117 in the cell for rule 2 | probe `l-rule2-total` | CS0117 |
| "All three checks held." | `testing-as-a-habit-1` | same |
| the report names two lines | probe `l-check-frames` | two frames, in `Test.Check` and the calling cell |
| fold: `{ 1, 2 }` and c gives 1 | probe `l-fold-c-one-two` | `a 1.5, b 1, c 1, d 1` |
| 8.16496580927726 | `functions-calling-functions-1-program` | same |
| DataRange: with one value, 0 | `your-turn-1-tests` solution, input `{ 7 }` | `0` |
| DataRange: `Max()` on no values, `InvalidOperationException` | probe `l-max-empty` | same |
| NaN, and the message | `handling-edge-cases-1` | `Cannot take the mean of nothing`, `NaN` |
| 60.0 / 0 is ∞ | probe `l-sixty` | `∞`, `NaN` |
| `There is no mean...`, then `ArgumentException`, message | `handling-edge-cases-2-program` | same |
| `No mean mark yet. Mean needs at least one number.` | `handling-edge-cases-3` | same |
| pixel art: 127.5 | `your-turn-2-tests--pixel-art` solution, input `{ 0, 255 }` | `127.5` |
| scope: CS0103 for `edge` | probe `l-scope-edge` | CS0103 |
| the two boxes of `#` and `*` | `variable-scope-revisited-1-program`, `-2` | as drawn |
| practice 3: NaN, not 0 | `a-comment-that-is-not-true-1-program` | `4.5`, `NaN` |
| practice 4: 2.5 | `the-middle-value-1-tests` solution, input | `2.5` |
| practice 5: the three exceptions and NaN | probes `p-median-empty`, `l-max-empty`, problem 3 | as named |
| practice 5: a string in a `double[]` does not compile | probe `p-string-in-double-array` | CS0029 |
| practice 6: the sum of an empty array is 0 | probe `p-sum-empty` | `0` |
| practice 7: CS0019 and 0.6666666666666666 | `the-mean-of-true-and-false-1` and its solution | same |
| practice 8: 0.15000000000000002 | `a-test-that-fails-a-good-function-1` | in the exception's message |
| practice 12: "quick" | `the-longest-word-1-tests` solution, input | `"quick"` |
| practice 13: `{ 2, 1, 1, 2 }` gives 2 | `the-most-frequent-1-tests` solution, input | `2` |
| practice 14: CS1503, then ABC | `from-earlier-sorting-a-string-1` and its solution | same |
| practice 15: `IndexOutOfRangeException` | `from-earlier-minus-one-as-an-index-1` | same |
| practice 16: 0 | `from-earlier-a-key-that-is-not-there-1` | `0` |

The numbers 0.1, 0.2, 0.15, 55, 70, 64 and the arrays in the tasks are
inputs, not outputs.

## Once the page UI exists

- **The report for a check that does not hold.** The lesson says the
  report "names two lines: the line in `Check` that threw, and under it,
  the line in this cell that called `Check`". That is what .NET's stack
  trace holds (probe `l-check-frames`) and what `drawException` in
  `web/page/cell.js` draws, frame by frame. The native check prints only
  the first frame. Look at it on the page, in `testing-as-a-habit-1` with
  one expected answer changed.
- **Compare with a solution on a tests cell.** The `inputs` are evaluated
  after the cell's own statements. If one of the reader's checks does not
  hold, `Check` throws before the inputs, and the reader's column is
  `not-run` for every row (`docs/ENGINE_API.md`, "The comparison"). The
  solution's column is still filled. Check that the page makes this clear,
  or consider putting the `inputs` and the solution on the types cell,
  which the engine supports ("Inputs work on a types cell") but the
  native check does not run, and decision 26 does not use.
- **The Check button and `Test.Check`.** See open question 2. Look at how
  the two read side by side on the page.
- **Rule 4 in the cell for rule 2.** The page asks the reader to add
  `Stats.Total` to an earlier cell. Check that the page's message for
  CS0117 there is clear, and that the reader can undo the change.
- **NaN and ∞** print as `NaN` and `∞` natively in `en-IE`; confirm the page
  prints the same.
- **The `Stats.cs` label.** The prose says the label on the types cell
  shows `Stats.cs`. Confirm the page shows `file:`.

## Open questions for a reviewer

1. **One `Test.Check` for the site.** This page's `Check<T>(string claim,
   T expected, T found)` throws when the values differ and says nothing
   when they are equal, as `assert` did. The FOOP draft
   `testing-what-a-class-does` has the same method, word for word. The
   PDP draft `when-it-goes-wrong` (the next page) has
   `Check(string claim, object expected, object found)`, which prints a
   line for every check and never stops. The `object` version has a trap
   this page would hit at once: `Check("...", 20, Stats.Mean(...))` passes
   an `int` and a `double`, and `Equals` on two boxed values of different
   types is false, so it prints "expected 20, found 20" (probe
   `p-object-check`). The generic version converts 20 to a `double`. I
   suggest one version for the whole site, and the generic, throwing one;
   `when-it-goes-wrong` would then need to change. If the page's authors
   prefer a `Check` that prints and continues (every check runs, and the
   `inputs` of a Compare always run), the generic signature still
   applies.
2. **The name `Check`.** The course map names it, but a PDP reader meets
   the **Check** button (for types cells) and the `Check` method on the
   same page, for the first time. The page says in one sentence that they
   are unrelated. Another name (`Test.Equal`, as xUnit's `Assert.Equal`)
   would remove the clash; it would have to change on three drafts.
3. **The rules of the road on a PDP page.** Decision 12 puts all five
   here, and the section adds six cells to an L page. The map allows
   "Handling edge cases" to move to a second page if the page runs long.
   It is about 5,800 words, 26 cells per world. I kept it as one page;
   the natural split is after "Your turn 1".
4. **`<T>` in PDP.** `Check<T>` is the first generic method a PDP learner
   sees. The page explains it in one sentence by comparison with
   `List<T>`. The alternative, three overloads of `Check`, would bring in
   overloading, which is a FOOP topic.
5. **`public static` and the earlier `static`.** *Methods* taught `static`
   on a local method as "it can use only its parameters and its own
   variables". Here `static` on a class member means that the member
   belongs to the class. The page says only that every method in a static
   class has it. Is that enough, or should one sentence connect the two
   meanings?
6. **Test cell ids.** New cells: `testing-as-a-habit-check` (the `Test`
   class), `handling-edge-cases-3`, `variable-scope-revisited-2`,
   `a-tool-for-tests-1` (practice), and the `-program` cells of decision
   26. The two tasks' tests cells keep dewlab's ids (`your-turn-1-tests`,
   `your-turn-2-tests--<world>`) and act as decision 26's program cells, so
   no `your-turn-1-program` exists. That follows the map's words ("its
   tests cell (a program cell below)"), and differs from decision 26's
   naming.
7. **The opening method has two mistakes.** It is version c, so it also
   gives 1 for `{ 1, 2 }`, which the reader learns only in the fold of
   "Which one works?". A reader who does not open that fold never learns
   it. The fold could be prose instead.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
tests an alternative for a reviewer. Run them with the same NativeCheck
command, passing `NOTES.md` as the file. The cells with `expect:` fail on
purpose. None of them is part of either page. The class that does not
compile is last, because every cell below a class compiles it.

```csharp exec
id: l-fold-c-one-two
// Lesson, fold "one way it goes": { 1, 2 } catches c, which gives 1.
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
