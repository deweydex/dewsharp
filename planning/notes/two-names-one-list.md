# two-names-one-list: notes for a reviewer

Ported from dewlab `tutorials/two-names-one-list/two-names-one-list.md`
(version 2026.09.26.1). It is a closer look: two ideas that cannot both be
true, one experiment that decides between them, then why the other idea is
easy to believe and where else the same thing happens. Its home page is
`grids-and-references` (dewlab's `comprehensions-and-grids`), which it
follows in PDP's "Methods, lists and algorithms" series
(`planning/COURSE_MAP.md`, PDP row 17: "translate", shape "closer look",
size S, no worlds, batch 5). dewlab has no practice page for it, and its
glossary file is `entries: []`, so there is neither here. The course map
lists it under "Lessons with no worlds".

`covers: [PDP-LO4, PDP-LO8]` comes from the course map's entry. dewlab's
frontmatter has no `covers:`. `year:` is dropped, because dewsharp's format
has no such field.

Status: written in one run on 27 September 2026, as a draft in
`drafts/lessons/two-names-one-list/`.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/two-names-one-list/two-names-one-list.md`, its
recorded outputs are `lessons/two-names-one-list/two-names-one-list.outputs.json`
(written by the browser checker), and this file was the draft's
`NOTES.md`. The two `*.native.json` files were deleted: the browser
checker's outputs file replaces them. The draft had no pictures and no
practice page. "What was done when it moved", just below, says what
changed in the move. The porter's notes follow it, with anything the move
made stale marked *(stale)* or brought up to date. "The porter's
questions, and what was decided" settles the open questions where the
playbook, the course map, the style guide or the example lessons answer
them; the rest are under "Open".

Files:

- `two-names-one-list.md`: the lesson. Two program cells (the course map's
  "Both cells"), two predicts, three solutions (two on `an-experiment-1`,
  one on `where-else-it-happens-1`), no answer folds, hints, `inputs` or
  challenge.
- `two-names-one-list.outputs.json`: what the browser checker recorded,
  version `2026.09.28.1`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  two-names-one-list` ran the draft's two cells in the real engine. Both
  did what the native check said, with the same text: `an-experiment-1`
  printed `width is 5` and `row[0] is 7`; `where-else-it-happens-1`
  printed `1 0` twice. Neither has a diagnostic. The browser differed from
  the draft in nothing: no culture formatting (the page prints no
  decimals or money), no trimmed API, no stray warning, and `Console`
  behaved as on a computer. The only problem the checker reported was the
  link to `grids-and-references`, which was not in `lessons/` yet; that
  page moved in the same round, and the final check reports no problems.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). All fourteen give what the native check
  gave: `fold-copy-range` and `fold-new-array` print `width is 5` and
  `row[0] is 5`; `fold-to-array` prints `row[0] is 5`;
  `collection-expression` prints `row[0] is 5, otherRow[0] is 7`;
  `list-half` prints `width is 5` and `row[0] is 7`; `same-reference`
  prints `True` and `False`; `which-are-value-types` prints `True` four
  times and `False` three times; `string-half` prints `True`, `False` and
  `word is NOON, other is MOON`; `string-in-place` does not compile,
  CS0200 at (3,1), *Property or indexer 'string.this[int]' cannot be
  assigned to -- it is read only*; `grid-fold` prints `1 0`, `0 0` and
  `0 0`; `grid-one-row` prints `True` and `1 0`; `grid-in-a-loop` prints
  `1 0` twice; `learn-exercise` prints what the Learn unit says it prints
  (`val_A: 2`, `val_B: 5`, `ref_A[0]: 5`, `ref_B[0]: 5`);
  `method-changes-array` prints `20 30 40`. Four new probes cover the rest
  of the Learn unit's code: `learn-new-array`, `learn-one-line` and
  `learn-string` run (the last prints `Hello World!`), and
  `learn-declare` (`int[] data;` alone) runs with one warning, CS0168 at
  (1,7), *The variable 'data' is declared but never used*.
- **Every number and every quoted output now comes from a cell on the
  page** (decision 29, as the powers, equals and total pages did when they
  moved):
  - The answer fold "two changes that do it" said "Both print
    `width is 5`, then `row[0] is 5`", which no recorded output held. It
    became two `solution` blocks on `an-experiment-1`, "with a copy of the
    array" (`row[..]`) and "with a new array" (`new int[] { 7 }`), each
    with its own notes. The checker runs both and records
    `width is 5` and `row[0] is 5` for each. Idea A's prediction ("`row[0]`
    is still 5") is in those outputs too. The fold's opening line ("Here
    are two answers. Yours may be different and work too.") went with the
    fold; the prose now ends its question with "There are two different
    lines you could change."
  - The answer fold "one change that does it" (`1 0`, then `0 0`) became a
    `solution` block on `where-else-it-happens-1`, and the checker records
    `1 0` and `0 0`. "`row` itself is not changed" became "`row` itself
    does not change", from probe `grid-fold` (its third line prints `0 0`).
  - The page shows each solution under its cell as a closed fold, "A
    solution, with a copy of the array", "A solution, with a new array"
    and "A solution". That is the page's layout for every solution.
- **Both predicts ask about the last line.** The page compares a choice
  guess with the whole output and with each line (decision 37). The
  draft's options ("5, then 7"; "`1 0`, then `1 0`") matched no line of
  either output, so every reader was asked "Which line explains what you
  saw?", even one whose guess was the output. The `a-total-that-starts-again`
  move met the same problem and fixed it the same way. Now:
  - `an-experiment-1` asks "What will the last line print?", with
    `row[0] is 5` (idea A, "two copies"), `row[0] is 7` (idea B, "one
    array with two names") and "Something else". dewlab's third option,
    "7, then 7", was about the first line, which both ideas agree on and
    the prose above the cell already settles, so it became "Something
    else", as on the total page.
  - `where-else-it-happens-1` asks "What will the last line print?", with
    `0 0` and `1 0`, in dewlab's order and with no notes, as dewlab had
    none.
  - Checked on the page: with `row[0] is 7` chosen, the page shows idea
    B's note and does not ask the question; with `1 0` chosen, it does not
    ask; with `0 0` chosen, it asks.
- **The two paragraphs on what each idea predicts moved above the cell.**
  The page shows a predict above its cell, so in the draft the reader met
  the question, then the cell, then (after the move to solutions) two
  solution folds, and only then what ideas A and B say. They now come
  before the cell, as on the total page, and the sentence that introduces
  the cell says "The cell below does the same thing twice ... The two
  ideas predict different things for it."
- **The List invitation** says which lines to change: "Change the first
  two lines of the array half to ...", where the draft said "Change the
  array half to ...". "Can you try it?" became "Can you check it?".
  Checked on the page: the edited cell prints `width is 5` and
  `row[0] is 7` (probe `list-half`).
- **The definition of *reference*** is now the words of
  `grids-and-references`, which the reader meets first: "It holds a
  *reference*: where the array is in the computer's memory." The draft
  said "a value that says where the array is kept in the computer's
  memory". *Value type* keeps the words of `storing-and-computing-practice`
  (checked: the same sentence), and *reference type* keeps its own
  one-sentence definition, since `grids-and-references` names it only as
  "a type that works in this way".
- **Visual Studio.** One line before "Where to read more": everything on
  the page runs in the browser, and nothing needs Visual Studio (`#the-ide`;
  the style guide's checklist). The powers, dividing, equals, total and
  "is a" pages have the same line.
- **Where to read more** is in the form the other closer looks use:
  Microsoft, *Exercise - Discover reference types*, with the `en-us`
  address, then what it is. It returned HTTP 200 on 28 September 2026. It
  still runs the `int` and `int[]` experiment (`val_A`, `ref_A`), shows
  `new int[3]`, names the stack and the heap, and tells the reader to
  update the code "in the Visual Studio Code Editor". "It uses Visual
  Studio Code, another editor from Microsoft" became "The exercise uses
  Visual Studio Code, which is a different program from Visual Studio.
  You do not need it: the code in that exercise also runs in a cell on
  this page", the words the total page uses. "Each of its examples" became
  "the code in that exercise", which the probes cover (one of its snippets
  warns, and still runs).
- **Frontmatter.** `version:` is `2026.09.28.1`, because both answer folds
  became solutions that the checker runs, and both predicts changed.
- **The page was looked at** in headless Chromium on the real server
  (`npm run serve -- --isolate`), at 900 and 390 pixels wide. Each cell is
  labelled `program` and `Program.cs`. The predict options render as code,
  there are three solution folds, the links go to `grids-and-references`,
  `writing-your-own-functions`, `lists-and-sequences` and Microsoft Learn,
  there is no sideways scroll at 390 pixels, no verdict word is on the
  page, and the console showed no errors. Run on the page, each cell gave
  what the checker recorded.
- **Not done here: `courses/pdp.yaml`** still has
  `two-names-one-list: "Two names, one list: a closer look at copying"`
  under `planned:`. The playbook's checklist says to delete it when the
  lesson moves; this round's instructions leave the course files to the
  orchestrator.

## What changed from dewlab, and why (the porter's notes)

**The opening** points back to the page before, as dewlab's does. dewlab
wrote `copy = row`; the C# page writes `int[] copy = row;`, which is the
line the course map gives `grids-and-references` ("`int[] copy = row;`
shares one array"). That page is not drafted yet, so this sentence rests on
the map. The link text is "the page about grids", as the other closer looks
use "the page about loops" and "the page about decisions".
*(Brought up to date: `grids-and-references` is now in `lessons/`. Its
cell `two-names-for-one-list-1` has `int[] copy = row;` and
`copy[0] = 255;`, and prints `255, 0, 0, 0`, so the opening is true of it.
See "Notes that were for later".)*

**The two ideas are rewritten so that both are true to C#.** dewlab's idea
B says `other = width` "gives the same value a second name. Nothing is
copied." For Python that is true of numbers too. For a C# `int` it is not:
`int other = width;` copies the number. So the C# ideas are stated with
both halves in view. Idea A: `=` makes a copy, so after `int other =
width;` there are two numbers, and after `int[] otherRow = row;` there are
two arrays. Idea B: `=` gives the value a second name, so after
`int[] otherRow = row;` there is one array with two names. The experiment
still tells them apart only in the array half, and the page says so later
("For the number, both ideas predict 5").

**The experiment is dewlab's, with `int` and `int[]`,** as the map asks.
`row = [5]` becomes `int[] row = { 5 };`. `print(row)` would print
`System.Int32[]` in C#, so each half prints a labelled line:
`width is 5` and `row[0] is 7`. A labelled line also lets the predict ask
for two numbers ("5, then 7") in place of Python's `[7]`. Names are
camelCase (`otherRow`). The cell compiles with no warning: `other` is
assigned from a variable, not only from constants, so CS0219 does not
appear (the native check shows no diagnostics). The predict keeps dewlab's
three options and its two notes. *(Brought up to date: the predict now
asks about the last line, with `row[0] is 5`, `row[0] is 7` and
"Something else"; see "What was done when it moved".)*

**"Look at what the third line of each half does"** became "The difference
is in the third line of each half", which states a fact and gives no order.
The two bullets stay, with "names" and "holds" in place of "the name moves
to 7".

**The answer fold** keeps dewlab's two changes. `row[:]` becomes
`row[..]`, a range with no numbers, which `lists-and-sequences-practice`
already calls "a new array with every element". `row.ToArray()` is named
too, because the map gives it to `grids-and-references`. `other_row = [7]`
becomes `otherRow = new int[] { 7 };`, with one clause on what
`new int[] { 7 }` makes. C#'s collection expression `otherRow = [7];` also
works (probe `collection-expression`), but no earlier draft uses it, and
`lists-and-sequences` writes arrays with `{ }`. The fold now opens with
the format's line, in the plural: "Here are two answers. Yours may be
different and work too." *(Brought up to date: the fold is now two
`solution` blocks on `an-experiment-1`, and its opening line went with it;
see "What was done when it moved".)*

**"Value types and reference types" is new, and replaces one paragraph.**
dewlab explained the result with "a number cannot be changed in place, so
you never see the second name". That is Python's reason, and it is not
C#'s: in C# the number is copied. The map asks the page to name the
difference after the experiment, so the section says:

- the number half cannot tell the ideas apart, and the type decides;
- a variable of type `int` holds its number, and `=` copies it. *Value
  type* is defined in the words `storing-and-computing-practice` already
  uses ("each variable of that type holds its own copy of the value"), and
  that page links here for the other kind;
- a variable of type `int[]` holds a *reference*, "a value that says where
  the array is kept in the computer's memory", and `=` copies the
  reference *(brought up to date: now "where the array is in the
  computer's memory", the words of `grids-and-references`)*. *Reference type* is defined in one sentence. A list is one
  too, with an invitation to try the experiment with `List<int>` (probe
  `list-half` prints 7). This also keeps the page's title honest: it says
  "list", and the experiment uses an array;
- so `=` always copies what the variable after it holds;
- a `string` is a reference type that cannot be changed, so it behaves
  like a value (the map's sentence). The page points back to CS0200 on
  `lists-and-sequences` rather than adding a cell, to keep the page small.
  Probes `string-half` and `string-in-place` back each claim.

One paragraph ties the section to passing by value, from
`writing-your-own-functions`: a parameter gets a copy of its argument's
value, and for an array that value is a reference, so a method can change
the caller's elements (probe `method-changes-array` prints `20 30 40`).
This is the page's link to PDP-LO8 ("parameter passing"), which the map
lists and which the dewlab page did not touch. It ends "as the page about
grids showed", because the map puts that experiment on
`grids-and-references`. It can be cut as one paragraph. *(Brought up to
date: `grids-and-references`, now in `lessons/`, has that experiment:
`BrightenRow` in cell `two-names-for-one-list-3` prints `20, 30, 40`. It
also defines *passing by value* in the words of
`writing-your-own-functions`, as this paragraph does.)*

**"Why idea A feels right" became "Why idea A is easy to believe"**, as in
the other closer looks: *right* is a verdict word. The paper and
shared-document paragraphs stay. The document now becomes the model for a
reference: the variable holds the link, and `=` copies the link. A closing
paragraph gives idea A its due, as the `a-total-that-starts-again` draft
does: `=` does make a copy every time, and for an array it copies the
link.

**"Where else it happens" keeps its task, a grid whose rows are one row.**
Python's `[[0, 0]] * 2` has no C# twin. The map says "a jagged array whose
rows are one array", so the cell is `int[][] grid = { row, row };`. It
prints `1 0` twice, as dewlab's printed `[[1, 0], [1, 0]]`. It keeps the
id `where-else-it-happens-1`. The prose names three names for one array
(`row`, `grid[0]`, `grid[1]`, probe `grid-one-row`). dewlab had no question
after the grid; the C# page adds one, with a fold:
`{ row[..], row[..] }` gives two separate rows (probe `grid-fold`).
*(Brought up to date: the fold is now a `solution` block, and the checker
records its output.)*

This grid is less of a surprise than Python's, because `{ row, row }`
shows the name twice where `* 2` hid it. It still tests whether the reader
carries the idea to a new case. The other shape I tried is a loop that
puts one `row`, made above the loop, into each place of `new int[2][]`
(probe `grid-in-a-loop`, the same output). It is closer to a real mistake,
and it echoes `a-total-that-starts-again` (a line above a loop runs once),
but it needs `new int[2][]`, which no drafted page has taught. See open
question 3. *(Settled: see "The porter's questions", item 3.)*

**Where to read more.** dewlab linked Ned Batchelder's talk on Python names
and values, which is about Python's model and not C#'s. The C# page links
the Microsoft Learn unit
[Exercise - Discover reference types](https://learn.microsoft.com/training/modules/csharp-choose-data-type/5-exercise-reference-types),
from the beginner module "Choose the correct data type in your C# code".
It runs the same experiment (`int val_B = val_A;` and
`int[] ref_B = ref_A;`), at a beginner's level, and its code runs in a cell
here (probe `learn-exercise` prints what the unit says it prints). It was
fetched on 27 September 2026. Two things to know: it says value types "are
stored in the stack", which is a simplification (an `int` inside an array
is stored with the array), and the page says only that the unit names the
stack and the heap and that this page does not need them. Its variable
names (`val_A`, `ref_A`) do not follow C#'s naming, and the page does not
mention it. Microsoft's language reference pages on
[value types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-types)
and
[built-in reference types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/reference-types)
were also read, and left out: both begin with structs, generics and
delegates. *(Brought up to date: the address is now the `en-us` one the
other closer looks use, and the unit was fetched again on 28 September
2026; see "What was done when it moved".)*

## What C# made different, in short

- In C#, `=` copies what a variable holds. For an `int` that is the number,
  so C# really does copy it, where Python gives the number a second name.
  The ideas are restated so that neither says something untrue of C#.
- An array variable holds a reference, and `=` copies the reference. The
  page names *value type*, *reference*, and *reference type*, which the
  Python page had no need for.
- A `string` is a reference type, but it cannot be changed, so it behaves
  like a value.
- Printing an array prints its type's name, so the cells print labelled
  elements and `string.Join`.
- `row[:]` becomes `row[..]` or `row.ToArray()`; `[7]` becomes
  `new int[] { 7 }`.
- A parameter is passed by value, and for an array the value is a
  reference, so a method can change the caller's array.
- Python's `[[0, 0]] * 2` becomes `{ row, row }` in a jagged array.

## Where each number and message in the prose comes from

All from `lessons/two-names-one-list/two-names-one-list.outputs.json`,
except where the table says otherwise. The probes named here ran in the
browser checker as well as the native one.

| Number, message or claim | Source |
|---|---|
| `width is 5`, then `row[0] is 7`; the predict's `row[0] is 7` | cell `an-experiment-1` |
| idea A's "`width` is still 5, and `row[0]` is still 5"; the predict's `row[0] is 5` | `an-experiment-1`, `solutions[0].output` and `solutions[1].output` (`width is 5`, `row[0] is 5`) |
| solution "with a copy of the array": `width is 5`, then `row[0] is 5` | `an-experiment-1`, `solutions[0].output` |
| solution "with a new array": `width is 5`, then `row[0] is 5` | `an-experiment-1`, `solutions[1].output` |
| `row.ToArray()` makes the same kind of copy | probe `fold-to-array` (`row[0] is 5`) |
| `width` still holds 5; "two 5s" | cell `an-experiment-1` (`width is 5`) |
| `row` and `otherRow` hold the same reference; a range makes a different array | probe `same-reference` (`True`, then `False`) |
| `int`, `double`, `bool`, `char` are value types; `int[]`, `List<int>`, `string` are not | probe `which-are-value-types` |
| a `List<int>` gives 7 too (the page quotes no output) | probe `list-half`; checked on the page by editing the cell |
| two string variables can refer to one string; `=` gives one a new string, and the other keeps the first | probe `string-half` (`True`, `False`, `word is NOON, other is MOON`) |
| a string cannot be changed: CS0200 | probe `string-in-place`; also `lists-and-sequences` cell `changing-a-list-2` |
| a method given an array changes the caller's elements | probe `method-changes-array` (`20 30 40`); `grids-and-references` cell `two-names-for-one-list-3` (`20, 30, 40`) |
| `1 0` twice; the predict's `1 0` | cell `where-else-it-happens-1` |
| three names for one array | probe `grid-one-row` (`True`; `row` prints `1 0`) |
| solution: `1 0`, then `0 0` | `where-else-it-happens-1`, `solutions[0].output` |
| solution: `row` itself does not change | probe `grid-fold` (third line `0 0`) |
| the code in the Learn exercise runs in a cell | probes `learn-exercise`, `learn-declare` (runs, with warning CS0168), `learn-new-array`, `learn-one-line`, `learn-string` |

No compiler message is quoted in the lesson, so no line or column needs
checking against the page.

## Notes that were for later, and what became of them

- **`grids-and-references`** moved into `lessons/` in the same round, and
  the three sentences that rested on the map were checked against it
  (`lessons/grids-and-references/grids-and-references.md`, 28 September
  2026). The opening: cell `two-names-for-one-list-1` has
  `int[] copy = row;` and prints `255, 0, 0, 0`. "`row.ToArray()` makes
  the same kind of copy": cell `two-names-for-one-list-2` uses
  `row.ToArray()`, and the prose says `row[..]` does the same. "As the
  page about grids showed": cell `two-names-for-one-list-3`, `BrightenRow`,
  prints `20, 30, 40`, and its table says that a change to an element of
  an array parameter is seen by the caller. That page defines *reference*
  ("where the array is in the computer's memory"), and this page now uses
  the same words. It names *reference type* only as "a type that works in
  this way", so this page keeps its own one-sentence definition, which
  says the same thing. It defines *value types* in other words ("each
  variable holds its own value, and `=` copies the value itself"); this
  page keeps the words of `storing-and-computing-practice`, which the
  reader met first. It also has "The grid that was one row", the loop over
  `new int[3][]` (cell `two-names-for-one-list-4`), which settles open
  question 3. It does not link here yet: see "Open", item 1.
- **The link from `storing-and-computing-practice`** ("Two names, one list
  shows a type where two names share one thing") now reaches this page,
  and the definition of *value type* matches it word for word (checked).
- **Inline code in predict options.** Checked on the page: the options
  render as code (`<code>row[0] is 5</code>`), and the page compares the
  text without the markup, so `row[0] is 7` matches the output's line.
- **The List invitation** asks the reader to change the first two lines of
  the array half of `an-experiment-1`. Their edit is saved under that
  cell's id. There is no `inputs` block, so there is no Compare button.
  The two solutions under the cell are for the question before them, and
  the invitation to try a list comes later, under "Value types and
  reference types"; a reader who opens a solution after changing the cell
  sees the array version, which is what that question asked for.
- **Link text.** "the page about grids", "the page about methods" and "the
  page about arrays and lists" follow the other closer looks in
  `lessons/` ("the page about loops", "the page about exceptions").

## The porter's questions, and what was decided

1. **The restated ideas.** Decided: keep them as written. The course map's
   entry asks for "the same experiment with `int` and `int[]`" and then
   says "After it, the page names the difference", and the style guide's
   "Run first, then name" (`#how-a-page-teaches`) says the same. An idea B
   that said outright it was about the array only would name the
   difference before the reader runs the cell. The page says, right after
   the run, that "For the number, both ideas predict 5", and "Why idea A
   is easy to believe" ends by giving idea A its due, as the total and
   powers pages do.
2. **The passing-by-value paragraph.** Decided: keep it. The course map
   gives this page `covers: [PDP-LO4, PDP-LO8]`, and without this
   paragraph nothing on the page is about parameter passing (PDP-LO8). It
   adds no cell, so the page stays an S page. It no longer leans on the
   map alone: `grids-and-references`, now in `lessons/`, has the
   experiment it points back to (see "Notes that were for later").
3. **Which grid?** Decided: `{ row, row }`, as written. The loop over
   `new int[3][]` is already on `grids-and-references`, as "The grid that
   was one row" (cell `two-names-for-one-list-4`), so it would repeat the
   page before. The course map's entry asks for "a jagged array whose rows
   are one array", which `{ row, row }` is. Probe `grid-in-a-loop` stays
   below, for a practice problem if one is wanted.
4. **The title says "list".** Decided: keep it. The course map keeps
   dewlab's id and this title ("Two names, one list: a closer look at
   copying"), `courses/pdp.yaml` lists the same title, and other pages
   already name it: `storing-and-computing-practice` links to it as "Two
   names, one list", and `objects-and-classes-practice` names *Two names,
   one list*. The invitation to try `List<int>` keeps the title honest.
5. **A string cell?** Decided: no. The course map's entry says "Both
   cells" and "Size: S", and its "Closer looks" says a closer look is one
   experiment. The string paragraph points back to a cell the reader has
   already run (`changing-a-list-2` on `lists-and-sequences`, CS0200).
   Probe `string-half` is below if a later page wants it.
6. **The page opens with prose, not a cell.** Decided: keep it. The course
   map's "Closer looks" keeps dewlab's shape (two ideas, then the
   experiment that tests them), and the powers, dividing, equals, total
   and "is a" pages in `lessons/` open the same way. The two ideas are the
   question the first cell answers.
7. **A challenge at the end?** Decided: no. The course map's "Closer
   looks" says a closer look "has no worlds and no practice page ... and it
   ends with one thing to read", and the other closer looks in `lessons/`
   end the same way. The page now ends with the line on Visual Studio and
   one thing to read.

## Open

For Josh, or for the orchestrator:

1. **Links in.** `grids-and-references`, the home page of this closer
   look, does not link here. Its draft's notes planned one ("The next page
   is a closer look at two names for one array", in "Looking back"), and
   dewlab's page links to its closer look from its first predict note.
   `lessons/grids-and-references/grids-and-references.md` is being moved
   by another agent in this round, and this move may not edit it. The
   natural place is after "It prints `255, 0, 0, 0`. ... One value with
   two names is called *aliasing*." in "Two names for one array", or in
   its closing section.
   `objects-and-classes-practice` names this page in italics ("From *Two
   names, one list*."); now that the page is in `lessons/`, that can
   become a link (decision 32).
2. **`courses/pdp.yaml`** still lists this page under `planned:` (see
   "What was done when it moved").
3. **The grids page and this page define *value type* in different
   words.** This page uses the sentence from
   `storing-and-computing-practice`; `grids-and-references` uses its own.
   Both say the same thing. If Josh wants one sentence everywhere, the
   `storing-and-computing-practice` one is the oldest.

## Probe cells

Run in the browser by copying them into a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`). The
`expect:` cell fails on purpose. The last four (`learn-declare` to
`learn-string`) were added when the page moved.

```csharp exec
id: fold-copy-range
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row[..];
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: fold-to-array
int[] row = { 5 };
int[] otherRow = row.ToArray();
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: fold-new-array
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row;
otherRow = new int[] { 7 };
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: collection-expression
int[] row = { 5 };
int[] otherRow = row;
otherRow = [7];
Console.WriteLine($"row[0] is {row[0]}, otherRow[0] is {otherRow[0]}");
```

```csharp exec
id: list-half
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

List<int> row = new() { 5 };
List<int> otherRow = row;
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: same-reference
int[] row = { 5 };
int[] otherRow = row;
int[] copy = row[..];
Console.WriteLine(ReferenceEquals(row, otherRow));
Console.WriteLine(ReferenceEquals(row, copy));
```

```csharp exec
id: which-are-value-types
Console.WriteLine(typeof(int).IsValueType);
Console.WriteLine(typeof(double).IsValueType);
Console.WriteLine(typeof(bool).IsValueType);
Console.WriteLine(typeof(char).IsValueType);
Console.WriteLine(typeof(int[]).IsValueType);
Console.WriteLine(typeof(List<int>).IsValueType);
Console.WriteLine(typeof(string).IsValueType);
```

```csharp exec
id: string-half
string word = "NOON";
string other = word;
Console.WriteLine(ReferenceEquals(word, other));
other = "MOON";
Console.WriteLine(ReferenceEquals(word, other));
Console.WriteLine($"word is {word}, other is {other}");
```

```csharp exec
id: string-in-place
expect: CS0200
string word = "NOON";
string other = word;
other[0] = 'M';
Console.WriteLine(word);
```

```csharp exec
id: grid-fold
int[] row = { 0, 0 };
int[][] grid = { row[..], row[..] };
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
Console.WriteLine(string.Join(" ", row));
```

```csharp exec
id: grid-one-row
int[] row = { 0, 0 };
int[][] grid = { row, row };
grid[0][0] = 1;
Console.WriteLine(ReferenceEquals(grid[0], grid[1]));
Console.WriteLine(string.Join(" ", row));
```

```csharp exec
id: grid-in-a-loop
int[][] grid = new int[2][];
int[] row = { 0, 0 };
for (int i = 0; i < grid.Length; i++)
{
    grid[i] = row;
}
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
```

```csharp exec
id: learn-exercise
int val_A = 2;
int val_B = val_A;
val_B = 5;

Console.WriteLine("--Value Types--");
Console.WriteLine($"val_A: {val_A}");
Console.WriteLine($"val_B: {val_B}");

int[] ref_A= new int[1];
ref_A[0] = 2;
int[] ref_B = ref_A;
ref_B[0] = 5;

Console.WriteLine("--Reference Types--");
Console.WriteLine($"ref_A[0]: {ref_A[0]}");
Console.WriteLine($"ref_B[0]: {ref_B[0]}");
```

```csharp exec
id: method-changes-array
static void Brighten(int[] pixels)
{
    for (int i = 0; i < pixels.Length; i++)
    {
        pixels[i] = pixels[i] + 10;
    }
}

int[] row = { 10, 20, 30 };
Brighten(row);
Console.WriteLine(string.Join(" ", row));
```

```csharp exec
id: learn-declare
int[] data;
```

```csharp exec
id: learn-new-array
int[] data;
data = new int[3];
```

```csharp exec
id: learn-one-line
int[] data = new int[3];
```

```csharp exec
id: learn-string
string shortenedString = "Hello World!";
Console.WriteLine(shortenedString);
```
