# grids-and-references: notes for a reviewer

Written from dewlab `tutorials/comprehensions-and-grids/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 16):
action *replace*, shape *tutorial*, size M, batch 4, depends on
`lists-and-sequences` and `writing-your-own-functions`. No earlier draft of
this page existed, so both pages were written from the start in this run.

Files:

- `grids-and-references.md`: the lesson. 13 exec cells, 4 of them in world
  variants (11 tasks when a pair of variants counts once); 3 predicts,
  5 hints, 4 solutions, 4 `inputs` blocks, 1 challenge, 1 fold, 2 fences of
  code to read, 2 tables. No cell in the lesson is meant to fail; two
  mistakes are invitations in the prose (CS0623, and a
  `NullReferenceException`), each checked by a probe below.
- `grids-and-references-practice.md`: the practice page, 15 problems. 16
  exec cells, 2 of them in world variants; 3 predicts, 8 hints, 9
  solutions, 5 `inputs` blocks, 9 folds. Two cells are meant to fail:
  `rows-not-there-yet-1` and `different-lengths-1` (`expect: exception`).
- `grids-and-references.native.json`,
  `grids-and-references-practice.native.json`: what the native check
  recorded for every cell, solution and `inputs` row, in both worlds.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for each
page and for the probes, and again with `--json` for each of the three
files. Both pages also went through the real parser, `web/lesson/parse.js`
(`parseLesson`, with the page id), with no errors; the counts above are the
parser's.

## Frontmatter

- `title`: the course map's, "Grids and references: arrays of arrays, and
  two names for one array". dewlab's was "Comprehensions, grids and
  aliasing".
- `from: comprehensions-and-grids` (the practice page:
  `from: comprehensions-and-grids-practice`, as the other drafted practice
  pages do).
- `worlds`: dewlab's two, with dewlab's sentences, as the course map says
  for PDP.
- `covers: [PDP-LO4, PDP-LO8]`, from the course map. dewlab's per-section
  outcomes (MIT-6.2, MIT-6.3, MIT-6.5) are maths outcomes of the integrated
  course, and go with the maths.
- `year:` is dropped: the format has no such field.

## What changed, and why

The action is *replace*: C# has no comprehension, so the first half of
dewlab's page has nothing to translate. The course map says what the new
page keeps: dewlab's grid section and its section on two names for one
list, rebuilt for C#'s two kinds of grid and for reference types, and
nothing of the comprehensions, the sequences or the dot product (which
moves to the practice page as the ISBN check digit).

### What the reader already knows

PDP's order puts this page after `lists-and-sequences` (page 15) and
`writing-your-own-functions` (page 14). Drafted pages it leans on:

- `lists-and-sequences`: arrays, `{ ... }` initialisers, `List<T>` with
  `new()` and `Add`, `string.Join`, ranges and `^`, a range makes a new
  array (its practice problem 2), `char[]` prints as text, CS0200 on
  `word[0] = 'M';`, `IndexOutOfRangeException`.
- `writing-your-own-functions`: `static` methods in a program cell,
  parameters and arguments, *passing by value* (lesson and practice problem
  18), `Mirror(x, width)` returning `width - 1 - x` (your-turn-5, pixel
  art), which the practice page's `Mirror` hint points back to.
- `repeating-yourself`: nested loops and `Console.Write`, the checkerboard.
- `storing-and-computing` practice problem 2: *value type*, defined for
  `int` in a fold, with "Not every type works this way".
- `making-decisions`: "`==` on two strings compares their text" (its line
  121), which practice problem 6 points back to.
- `a-total-that-starts-again`: where `int total = 0;` goes, used by practice
  problem 15.

New to a PDP reader here: `null` and `NullReferenceException` (the FOOP
drafts meet them in `the-tools-around-your-code` and
`keeping-details-inside-an-object`), `new int[3]` (the lists page's open
question 8 asked for it), two-dimensional arrays and `GetLength`.

### Links: back only, as the batch rule says

This page is batch 4. It links to `lists-and-sequences`,
`writing-your-own-functions`, `a-total-that-starts-again` (batch 3),
`repeating-yourself`, `making-decisions` (batch 2),
`storing-and-computing-practice` (batch 1) and its own practice page.
Pages it names in plain text, to become links when they land:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, "Looking back" | "The next page is a closer look at two names for one array" | `lesson:two-names-one-list` | 5 |
| lesson, "Looking back" | "the page on dictionaries" | `lesson:looking-things-up-by-name` | 4 (same batch) |
| practice 12, solution note | "The page on reusable methods, later in the course" | `lesson:building-reusable-tools` | 7 |

Batch rule 3 says the author of a page adds the forward links that point to
it on earlier pages. This run writes only in this folder, so these are
left for whoever merges the drafts:

| Page | What it says now | Change |
|---|---|---|
| `lists-and-sequences`, "Looking back" | "The next page keeps a whole picture in an array of arrays, and shows what happens when two names share one array." (plain text) | link it to `lesson:grids-and-references` |
| `lists-and-sequences`, "Where to read more" | "arrays with more than one dimension, which the next page uses" (plain text) | the same link |
| `storing-and-computing-practice`, problem 2 | links only to `two-names-one-list` for "a type where two names share one thing" | could also name this page, where that type first appears |

dewlab's links go: `grid-of-numbers` (Computational Methods, no dewsharp
page), `building-reusable-tools` (now plain text, above) and
`two-names-one-list` (the first predict's note linked to it; the note now
has no link, because a predict note is short and the link would be
forward).

### The lesson, section by section

**Opening (`a-grid-is-a-list-of-lists-1`).** dewlab opened with two ways
to build a list of squares, a comprehension beside a loop. That goes with
the comprehensions. The page now opens with dewlab's first grid cell and
its predict (`picture[1][3]`: row, then column), which runs something and
asks about it before any term is named. The cell keeps dewlab's id, since
its task is the same. The picture is dewlab's arrow, as an `int[][]` with
`new int[] { ... }` for each row. The invitation to swap the indexes
prints 0 (probe `g-swap`). A short paragraph then says what the page does,
in place of dewlab's opening paragraph.

**A grid is an array of arrays.** Defines *grid*, reads the type
`int[][]`, and names the *jagged array* (Microsoft's term; the page defines
*jagged*). One paragraph explains `new int[] { ... }` and why the lists
page did not need it, and names CS0623 for a row without it (probe
`g-cs0623`). The message's own wording ("Array initializers can only be
used in a variable or field initializer") is not quoted: it has two terms
the reader has not met.

`a-grid-is-a-list-of-lists-2` keeps dewlab's task (draw the grid with
nested loops). dewlab built a string for each row and printed it; this cell
uses `Console.Write` and `Console.WriteLine()`, as `repeating-yourself`'s
checkerboard does, with the same comment on the last line. The prose names
the two loop variables' types (`int[]` and `int`), which is new in C#, and
invites a picture of the reader's own, with rows of different lengths.

The course map says that in pixel art `Console.BackgroundColor` can draw
the grid in colour. This is an invitation in the shared prose, with three
lines of code to read (`ConsoleColor.Blue`, two spaces, `ResetColor`), not
a cell. The native check cannot show colours: probe `g-colour` shows only
that the changed cell compiles and runs. See "Once the page UI exists".

**Two dimensions in one array** (new section, new cell
`two-dimensions-in-one-array-1`). The course map asks for `int[,]` beside
the jagged array. The cell prints `picture[1, 3]`, `GetLength(0)`,
`GetLength(1)` and `Length` (1, 5, 5, 25), with a question in the prose and
no predict block. The page calls `int[,]` a *two-dimensional array* and
says its shape is always a rectangle; Microsoft's page calls it
multidimensional. A table sets the two kinds side by side, and a paragraph
says when to choose each.

**Building a grid** (`a-grid-is-a-list-of-lists-3`). dewlab's cell built a
grid of zeros with `[[0] * size for _ in range(size)]` and a times table
with a comprehension inside a comprehension. C# builds a jagged array with
`new int[size][]` and a `new int[size]` for each row inside the loop, so
the cell builds the times table that way, and prints `timesTable[1][2]`
(6) and row 2 (`3 6 9`). The prose defines `new int[3]` and `new int[3][]`.
An invitation to comment out the row line gives a `NullReferenceException`
at line 8 (probe `g-null-row`, whose comment is last so that its line
numbers are the cell's own), and defines `null`. One sentence says that
`new int[3, 3]` makes every row at once (probe `g-new-2d-zeros`). dewlab's
paragraph on `_` for an unused loop variable goes: C# needs no such
variable here. Its link to the matrices page goes.

**Your turn 2.** The course map asks for the Polybius square as `char[,]`
and the negative picture with loops.

- Secret messages: the square is a `char[,]`, and the pairs, which dewlab
  kept as a list of two-element lists, are an `int[,]` of four rows and two
  columns. So the task practises `[row, column]` and `GetLength(0)` twice
  over, and needs no tuple or pair type. Two hints, `after: 1 runs` and
  `after: 2 runs`, since the stub compiles and runs. The solution note keeps
  dewlab's history of Polybius, reworded so that it says "one side" and "the
  other side", not left and right.
- Pixel art: the picture stays jagged. A stub that printed an empty
  `int[][]` would stop with an `ArgumentNullException` on its first run
  (`string.Join` of a `null` row), so the stub already makes a new row for
  each row of the picture, and the reader fills each row with an inner
  loop. That is the style guide's "completed" step, between the worked cell
  and a blank one. The `inputs` show `negative` and `picture`, so a reader
  who writes `negative[row] = picture[row];` sees the picture change, which
  the next section explains.

**Two names for one array.** `two-names-for-one-list-1` and its predict
keep dewlab's task and options, with `int[]` and `string.Join`. "An error"
became "Nothing: it does not compile", the style guide's words for that
outcome. The prose keeps dewlab's box and labels (as "An array is like a
box", not "Think of"), and *aliasing*. A new paragraph gives the C#
reason, as the course map asks: a *reference*, a *reference type*, and the
*value types* the reader met on `storing-and-computing` practice 2.

`two-names-for-one-list-2` keeps its task with `row.ToArray()`, the course
map's choice. The prose also names `row[..]` (probe `g-range-copy`), which
matches dewlab's `row[:]` and uses a range the reader already has. dewlab's
"Numbers and strings never cause this" is split: an `int` is copied by
`=`, and a string cannot be changed (CS0200 from the lists page, probe
`g-string-cannot-change`; probe `g-string-new-value` shows `=` giving one
name a new string). The page does not say that `string` is a reference
type; the closer look `two-names-one-list` does, in the course map.

**Inside a method.** The course map asks for both halves: a method that
changes an array it was given changes the caller's, and a method that
changes an `int` parameter does not. A new cell, `inside-a-method-1`,
shows the `int` case first (10, as on the methods practice page, problem
18). Then `two-names-for-one-list-3` keeps dewlab's task with an `int[]`,
and gains the page's third predict: after the `int` cell, "`pixels` is a
copy" is a reasonable guess, and it is the guess the methods page taught.
The methods are named `BrightenPixel` and `BrightenRow`, so the two cells
cannot be confused. A table puts dewlab's "two different actions" side by
side, and an invitation to add `pixels = new int[3];` shows the first
action on an array (probe `g-new-array-in-method`), with its answer in a
fold. dewlab's advice ("let its name say which") is kept as "it is worth
deciding", not as an order.

**The grid that was one row** (`two-names-for-one-list-4`). dewlab's
`[[0] * 3] * 3` has no C# twin. The course map asks for "a jagged array
whose rows are the same array". The cell makes one row before the loop
and puts it in every row; that is the mistake a C# reader can really make,
by moving `new` out of a loop. The invitation puts `new int[3]` back into
the loop (probe `g-new-in-loop`), and the prose gives a rule: each time
`new` runs, it makes one array. dewlab's note on copying a grid with
`grid[:]` becomes `grid.ToArray()`, with a loop that copies each row, as
code to read (probe `g-grid-toarray`).

**Your turn 3.** Both worlds keep their tasks. Secret messages: the message
is a `char[]` and the shift uses `char` arithmetic, as
`storing-and-computing` does; `Console.WriteLine` prints a `char[]` as text
(the lists page says so). Pixel art: dewlab's `// 2` becomes `/ 2`, which
is the same for these positive numbers. The solution notes say what
dewlab's did, with `ToArray()`. dewlab's comprehension alternative in the
pixel-art note becomes a loop that builds a new array (probe
`g-darker-loop`).

**Looking back.** dewlab's question stays. The transposition-cipher
challenge stays, now with a `char[,]` filled with `index / 4` and
`index % 4`, which uses whole-number division on purpose. Probes
`g-challenge-starter` and `g-challenge-answer` show that the starter runs
and that the task can be done both ways. The closing names the next two
pages in plain text (see "Links").

**Where to read more.** Batchelder's talk (Python names), the Python
tutorial (comprehensions) and 3Blue1Brown's dot product video go with what
they were about. In their place:

- Microsoft, *The array reference type (C# reference)*, the same page the
  lists page cites. I fetched it on 27 September 2026: its sections
  "Multidimensional arrays" and "Jagged arrays" are the two grids here, and
  "Pass single-dimensional arrays as arguments" shows a method changing the
  caller's array. Its examples use collection expressions, including
  `[[1, 3, 5, 7, 9], [0, 2, 4, 6], [11, 22]]` for a jagged array, which the
  note mentions (probe `g-jagged-collection-expression`).
- Jon Skeet, *Parameter passing in C#*. Fetched the same day: title and
  author as given, sections from "what is a reference type?" to "Parameter
  arrays". About two thirds of it is on reference types, value types and
  value parameters; the rest is on `ref`, `out` and `params`. The note says
  it is written for programmers (open question 10).
- argonaut, *Cellular Automata: Life from Simple Rules*, kept from dewlab,
  with "list of lists" changed to "array of arrays". Its title and channel
  were confirmed through YouTube's oEmbed. The year (2022) and the length
  (seven minutes) are dewlab's, and were not checked: the YouTube tool in
  this session had no credits.

### Predicts

The style guide allows two or three. dewlab's lesson had three (the
opening comprehension, `picture[1][3]`, and `copy = row`). This lesson has
three: `a-grid-is-a-list-of-lists-1` (row, then column),
`two-names-for-one-list-1` (two names), and `two-names-for-one-list-3`
(an array parameter, straight after an `int` parameter that behaves the
other way). The two-dimensional cell and the times table ask in the prose,
without a block.

dewlab's practice page had seven. This one has three:
`a-function-that-adds-1` (a list changed through a parameter),
`a-copy-that-is-not-1` (a copy of the outer array only) and
`same-elements-1` (`==` on two arrays, new, a surprise C# adds). Problems 2,
4, 13 and 14 keep their questions in the prose, with an answer fold.

### The practice page

dewlab's problems, in dewlab's order, and what became of each:

| dewlab | Here | What changed |
|---|---|---|
| 1. What each one gives (comprehensions) | 1. Row, then column (`row-then-column-1`, new id) | A new task: seven expressions on a jagged `grid` and a two-dimensional `table`, one of which does not compile (CS0022; probes `p-row-then-column`, `p-cs0022-table`, `p-cs0022-grid`). |
| 2. There and back | gone | Comprehensions (course map). |
| 3. Without a list | gone | Generator expressions (course map). |
| 4. b = a | 2. A second name for a list (`b-equals-a-1`) | A `List<int>` with `Add`, so the page shows that a list is a reference type too. `a` and `b` became `scores` and `saved` (the style guide's names); the name `saved` states the mistaken belief. `ToList()` makes a separate list (probe `p-tolist`). The predict block went; the question stays. |
| 5. A function that adds | 3. A method that adds (`a-function-that-adds-1`) | `List<string>`, `static void AddItem`. Keeps its predict. |
| 6. Two rows, one list | 4. Two rows, one array (`two-rows-one-list-1`) | `int[][] rows = { row, row };` is C#'s nearest to `[[0] * 3] * 2`. The fixed version is probe `p-two-new-rows`. The predict block went, because the lesson's last grid cell has just shown the same thing. |
| 7. A copy that is not | 5. A copy that is not (`a-copy-that-is-not-1`) | `grid.ToArray()` for `grid[:]`; the fold's loop copy is probe `p-copy-rows`. Keeps its predict. |
| (new) | 6. The same elements, or the same array? (`same-elements-1`) | dewlab's lesson opened with `==` on two lists giving `True`. In C#, `==` on two arrays compares references and gives `False`. It is one of the surprises this page exists for, and nothing else in the map claims it. `SequenceEqual` compares the elements, and strings are the exception (probe `p-same-array`). |
| 8. A times table | 7. A times table (`a-times-table-1`) | An `int[,]`, `new int[4, 4]`. The native check shows a two-dimensional array in an `inputs` row as one flat list, so the inputs are three single elements. |
| (new) | 8. Rows that are not there yet (`rows-not-there-yet-1`) | `NullReferenceException` as a cell, `expect: exception`, with a one-line fix. The lesson meets it only as an invitation. |
| 9. In the square, or out of it | 9. (`in-the-square-1--secret-messages`, `in-the-square-1--pixel-art`) | Secret messages: `Encode(string word, char[,] square)` returns the pairs as one string, `"12 04 20 24"`, since dewlab's list of pairs has no simple C# form; `enumerate` becomes two for loops. The `JAM` input shows what a J does (dewlab asked it in the note). Pixel art: `Mirror(int[][] picture)`, with the stub's `result` already made; the `inputs` show `picture` after the call, and a picture with rows of different lengths. The second solution, "a shorter way C# has", uses `ToArray` and `Array.Reverse`, and its note explains why it reverses a copy (probe `p-reverse-in-place`). |
| 10. Pair by pair | 10. Pair by pair (`pair-by-pair-1`) | A loop by index into `new int[first.Length]`. The second tier (`zip`) goes: C#'s `Zip` needs a lambda for this (course map, open question 5). `xs` and `ys` became `first` and `second`. |
| (the lesson's `your-turn-5--secret-messages`) | 11. A check digit (`a-check-digit-1`, new id) | The course map moves the ISBN check digit here. The dot product is defined in one sentence; the sigma formula goes (maths). The stub prints the dot product as well as the remainder, because a stub that returns 0 would print a remainder of 0 and look like a passing check. The pixel-art brightness version (weights 0.299, 0.587, 0.114) goes, since the map moves only the ISBN. |
| 11. Different lengths | 12. Different lengths (`different-lengths-1`) | `expect: exception`: the first call prints 11, the second stops. dewlab's first tier returned `None`; an `int` method has no such value, so the fold says that, and the one solution is "a way you'll meet later", with `throw` (open question 6). The fold names line 6 and line 12 (probe `p-different-lengths-frames`). |
| 12. Triangles make squares | gone | Sequences as functions (course map: maths). |
| 13. The odd numbers | gone | The same, and it passes a method as a value. |
| 14. From earlier: where the cut is | 13. (`from-earlier-where-the-cut-is-1`) | A string range, `word[2..5]`, from the lists page. The lists lesson asked the same question of a `char[]`; this one gives a string. The predict block went. |
| 15. From earlier: one name, two places | 14. (`from-earlier-one-name-two-places-1`) | `static int AddOne()` with its own `int total = 10;`. It prints 11 and 5. The predict block went. The fold points to problem 3, as dewlab's pointed to problem 5. |
| 16. From earlier: a number that is text | 15. From earlier: a total for each row (`from-earlier-a-total-for-each-row-1`, new id) | `"320" * 2` does not compile in C# (CS0019), and `storing-and-computing` practice 6 already asks exactly that. The new problem takes the closer look at starting a total to a grid: `int total = 0;` above the outer loop gives 2, 5, 6; inside it, 2, 3, 1. |

### The glossary file

dewsharp has no glossary panel, so each term is defined in the prose where
it first appears.

| dewlab entry | Here |
|---|---|
| list comprehension, filter, generator expression | gone, with the comprehensions |
| `sum()`, `max()`, `min()` | gone (they appeared only with comprehensions) |
| `join()` | `string.Join`, from the lists page |
| grid, list of lists | *grid*, *jagged array* ("A grid is an array of arrays"), *two-dimensional array* ("Two dimensions in one array") |
| aliasing | *aliasing*, with *reference*, *reference type* and *value type* ("Two names for one array") |
| sequence | gone (maths) |
| dot product | practice problem 11 |

New terms, each defined where it first appears: *jagged*, `new int[] { ... }`,
`GetLength`, `new int[3]`, `new int[3][]`, `null`, *Polybius square*,
*reference*, *reference type*, `ToArray()`, *transposition cipher*; on the
practice page `ToList()`, `SequenceEqual`, *dot product*, *ISBN-10*. `throw`
appears only in a solution titled "a way you'll meet later", and its note
says what it does.

## What C# made different, in short

- No comprehension: every grid is built and changed with loops.
- Two kinds of grid: a jagged `int[][]`, whose rows are arrays, and a
  two-dimensional `int[,]`, a rectangle with `[row, column]` and
  `GetLength`. Mixing their brackets is CS0022.
- Each row of a jagged array needs its own `new int[]` (CS0623 without it),
  and `new int[3][]` holds three `null`s until the rows are made:
  `NullReferenceException`, new to a PDP reader.
- An array is a reference type, and the page can say so: `=` copies a
  reference, and a parameter gets a copy of the reference, which is still
  passing by value.
- `==` on two arrays compares references, not elements (`False` for two
  equal arrays), where Python's `==` compares the elements.
- A copy is `ToArray()` or a range, `[..]`, and it copies only the outer
  array of a grid.
- An `int` method has no `None`, so "no answer" needs an exception.
- `/` on two `int` values is whole-number division, used on purpose in the
  challenge.

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. The native check labels a
cell's compiler messages and exceptions with the cell id where the page
would show the cell's file; line and column are the same.

| Number or claim | Source |
|---|---|
| 1 (`picture[1][3]`) | lesson cell `a-grid-is-a-list-of-lists-1` |
| 0 after the swap | probe `g-swap` |
| CS0623 for a row without `new int[]` | probe `g-cs0623` |
| the arrow | lesson cell `a-grid-is-a-list-of-lists-2` |
| the colour change compiles and runs | probe `g-colour` (colours not shown natively) |
| 1, 5, 5, 25 | lesson cell `two-dimensions-in-one-array-1` |
| 6 and `3 6 9` | lesson cell `a-grid-is-a-list-of-lists-3` |
| `NullReferenceException`, its message, line 8 | probe `g-null-row` |
| `new int[3, 3]`: three rows, every element 0 | probe `g-new-2d-zeros` |
| HELP | solution of `your-turn-2--secret-messages` |
| the negative; `picture` unchanged | solution of `your-turn-2--pixel-art`, its `inputs` |
| `255, 0, 0, 0` | lesson cell `two-names-for-one-list-1` |
| four zeros; `255, 0, 0, 0` for the copy | lesson cell `two-names-for-one-list-2` |
| `row[..]` is a new array | probe `g-range-copy` |
| `word[0] = 'M';` does not compile; `=` gives a name a new string | probes `g-string-cannot-change`, `g-string-new-value` |
| 10 | lesson cell `inside-a-method-1` |
| `20, 30, 40` | lesson cell `two-names-for-one-list-3` |
| `10, 20, 30` with `pixels = new int[3];` | probe `g-new-array-in-method` |
| `5 0 0` three times | lesson cell `two-names-for-one-list-4` |
| only the first row starts with 5 | probe `g-new-in-loop` |
| `grid.ToArray()` shares the rows; the loop copies them | probe `g-grid-toarray` |
| `MEET`, `PHHW` | solution of `your-turn-3--secret-messages` |
| `100, 75, 50, 25`; the loop alternative | solution of `your-turn-3--pixel-art`; probe `g-darker-loop` |
| the challenge runs and can be done | probes `g-challenge-starter`, `g-challenge-answer` |
| `[[1, 3, 5], [0, 2, 4]]` compiles | probe `g-jagged-collection-expression` |
| practice 1: 4; (a) to (f); CS0022 and its text, both ways | practice cell `row-then-column-1`; probes `p-row-then-column`, `p-cs0022-table`, `p-cs0022-grid` |
| practice 2: `1, 2, 3, 4`; three elements with `ToList()` | practice cell `b-equals-a-1`; probe `p-tolist` |
| practice 3: `a, b, new` | practice cell `a-function-that-adds-1` |
| practice 4: `7 0 0` twice; only the second row with two `new`s | practice cell `two-rows-one-list-1`; probe `p-two-new-rows` |
| practice 5: `1 0`; `0 0` with the loop copy | practice cell `a-copy-that-is-not-1`; probe `p-copy-rows` |
| practice 6: `False`; `True` for `third`, `SequenceEqual`, strings | practice cell `same-elements-1`; probe `p-same-array` |
| practice 7: 4, 16, 6; the table | solution of `a-times-table-1` and its `inputs` |
| practice 8: line 2, `NullReferenceException`; 1 | practice cell `rows-not-there-yet-1` and its solution |
| practice 9: `12 04 20 24`; `JAM` gives two pairs | solution of `in-the-square-1--secret-messages` and its `inputs` |
| practice 9: `Array.Reverse` on the caller's rows | probe `p-reverse-in-place` |
| practice 10: `4, 10, 18` | solution of `pair-by-pair-1` |
| practice 11: 132, remainder 0; 11 × 12; a changed digit changes it | solution of `a-check-digit-1`; probe `p-isbn-one-digit` |
| practice 12: 11, then the exception; line 6 and line 12 | practice cell `different-lengths-1`; probe `p-different-lengths-frames` |
| practice 12: both calls stop at the check with `throw` | probes `p-throw-both`, `p-throw-second` |
| practice 13: `GOR` | practice cell `from-earlier-where-the-cut-is-1` |
| practice 14: 11, then 5 | practice cell `from-earlier-one-name-two-places-1` |
| practice 15: 2, 5, 6; then 2, 3, 1 | practice cell `from-earlier-a-total-for-each-row-1` and its solution |
| 25 places, I and J share one; Polybius and torches; ISBN-10 weights and 11 | carried over from dewlab; facts, not program output |

## Once the page UI exists

- **Colour.** The lesson invites `Console.BackgroundColor = ConsoleColor.Blue`
  with two spaces for each pixel. The native check cannot show colours
  (probe `g-colour` shows the spaces). Check on the page that blue is
  readable in both themes, and that two spaces look close to a square in
  the page's console font. If not, change the colour or the sentence about
  squares.
- **Exceptions.** The lesson says the times table "stops at line 8"; practice
  problem 8 says "line 2"; practice 12's fold says the exception names line
  6, inside the method, and that the call is on line 12. .NET lists the
  innermost frame first (course map, open question 9). Check these against
  what the page shows for an exception.
- **`null` in "Compare with a solution".** The pixel-art `Mirror` stub
  returns rows that are still `null`, which the native check shows as
  `[null, null, null]`. Check that the page shows `null` the same way.
- **A cell that prints nothing.** The `Mirror` stub prints nothing, as
  dewlab's did; the task says so, and points to **Compare with a
  solution**. The Polybius stub prints one empty line.
- **Two-dimensional arrays in the table.** The native check shows an
  `int[,]` in an `inputs` row as one flat list (`[1, 2, 0, 4, ...]`). No
  `inputs` row on either page is a whole two-dimensional array; if the page
  learns to show one as rows, practice 7 could compare the whole table.
- **`char[]` in the table.** `message` and `coded` show as
  `['P', 'H', 'H', 'W']` natively. Check the page does the same.
- **A solution for a cell meant to fail.** Practice 8 and 12 have
  `expect: exception` and a solution, and no `inputs`. Check what
  **Compare with a solution** shows then.
- **The drawing cell** (`a-grid-is-a-list-of-lists-2`) is 22 lines, 7 of
  them the picture. The style guide asks for 5 to 15. See open question 3.

## Open questions for a reviewer

1. **`new int[] { ... }` for each row, or collection expressions?** The
   lists page's open question 1, made sharper here: a five-row picture has
   five `new int[]`, where `[[0, 0, 1, 0, 0], ...]` would have none (probe
   `g-jagged-collection-expression`). The page uses `new` on purpose,
   because it later counts the times `new` runs to count the arrays. The
   Microsoft page it cites uses collection expressions, and the reading
   note says C# accepts both. A decision for the whole course.
2. **`ToArray()`, `ToList()` and `SequenceEqual` are LINQ.** They work
   because `System.Linq` is one of the implicit `using` lines. A Visual
   Studio project without implicit usings needs `using System.Linq;`. The
   course map chose `row.ToArray()`; `row[..]` needs no `using` at all and
   the page names it too. Teach `row[..]` first instead?
3. **The drawing cell is long.** Shorten the picture to three rows (the
   cell would still show the arrow's point), or accept 22 lines because
   seven of them are data?
4. **Colour in the shared section.** The course map says "in pixel art".
   The invitation is shared, because the drawing cell is shared. Move it to
   the pixel-art world only, or drop it?
5. **`null` meets a PDP reader here, as an invitation.** The lesson has no
   cell meant to fail; the exception is an invitation in the prose, and
   practice 8 makes it a cell. Should the lesson have a cell with
   `expect: exception` instead, as the style guide's "mistakes on purpose"
   suggests?
6. **`throw` in practice 12.** PDP meets `throw` on `building-reusable-tools`
   (batch 7). The one solution is titled "a way you'll meet later", and the
   fold explains why nothing the reader has met can say "no answer" from an
   `int` method. Keep, or make problem 12 a discussion with no solution?
7. **Value types, twice.** `storing-and-computing` practice 2 defines
   *value type* in a fold; this page defines *reference type* and leans on
   it; the closer look `two-names-one-list` (batch 5) "names the difference"
   in the course map. Whoever writes that page should check the three agree.
8. **Cell ids that still say "list".** `a-grid-is-a-list-of-lists-1..3`,
   `two-names-for-one-list-1..4`, and on the practice page
   `two-rows-one-list-1`, `a-function-that-adds-1` and `b-equals-a-1` keep
   dewlab's ids, as the course map says for cells that keep their task,
   though their headings now say array or method. Nothing has been in front
   of a class yet, so renaming is still free. Keep for side-by-side
   comparison with dewlab, or rename now?
9. **The Polybius pairs as `int[,]`.** dewlab kept them as a list of pairs.
   An `int[,]` of two columns is short and practises the new brackets, but
   `pairs[i, 0]` is less plain than `row` and `column` from two parallel
   arrays. Which reads better for a Level 5 reader?
10. **Jon Skeet's article** is clear and short at the start, but it is
    written for programmers. Keep it as the second reading, or leave only
    Microsoft's page and the video?
11. **The negative task gives the outer loop.** The stub makes a new row
    for each row, to avoid a first run that stops on a `null` row. Is that
    too much help, or the right "completed" step?
12. **Practice 6, `==` on two arrays,** is new. dewlab's lesson opened with
    `==` on lists giving `True`; this problem shows C# giving `False`. Is it
    better in the lesson, near `two-names-for-one-list-2`, where `row ==
    copy` would print `False` too?

## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.
`g-null-row` keeps its comment at the end and `p-different-lengths-frames`
uses `#line 1`, so that the line numbers they report are the page cell's
own.

```csharp exec
id: g-swap
// Lesson, opening: picture[3][1] is 0, where picture[1][3] is 1.
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 0, 0, 1, 0, 0 },
};
Console.WriteLine(picture[1][3]);
Console.WriteLine(picture[3][1]);
```

```csharp exec
id: g-cs0623
expect: CS0623
// Lesson, "A grid is an array of arrays": a row without new int[] does not compile.
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    { 0, 0, 1, 1, 0 },
};
Console.WriteLine(picture[1][3]);
```

```csharp exec
id: g-jagged-collection-expression
// Lesson, reading: C# also accepts a jagged array written [[...], [...]], with no new int[].
int[][] picture = [[1, 3, 5], [0, 2, 4]];
Console.WriteLine(picture[1][2]);
```

```csharp exec
id: g-colour
// Lesson, colour: the drawing cell with the invited change compiles and runs.
// The native check cannot show colours; it shows the spaces only.
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 0, 0, 1, 0, 0 },
};
foreach (int[] row in picture)
{
    foreach (int value in row)
    {
        if (value == 1)
        {
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.Write("  ");
            Console.ResetColor();
        }
        else
        {
            Console.Write("  ");
        }
    }
    Console.WriteLine("|");    // the probe adds | to show where each row ends
}
```

```csharp exec
id: g-null-row
expect: exception
int size = 3;
int[][] timesTable = new int[size][];
for (int row = 0; row < size; row++)
{
    // timesTable[row] = new int[size];    // a new row of zeros
    for (int column = 0; column < size; column++)
    {
        timesTable[row][column] = (row + 1) * (column + 1);
    }
}
Console.WriteLine(timesTable[1][2]);
Console.WriteLine(string.Join(" ", timesTable[2]));
// Lesson, building a grid: with the line that makes each row commented out, it stops at line 8.
// This comment is last, so that the line numbers are the cell's own.
```

```csharp exec
id: g-new-2d-zeros
// Lesson, building a grid: new int[3, 3] makes three rows at once, every element 0.
int[,] grid = new int[3, 3];
Console.WriteLine(grid.GetLength(0));
Console.WriteLine(grid.GetLength(1));
foreach (int value in grid)
{
    Console.Write($"{value} ");
}
Console.WriteLine();
```

```csharp exec
id: g-range-copy
// Lesson, two names: row[..] is a new array too.
int[] row = { 0, 0, 0, 0 };
int[] copy = row[..];
copy[0] = 255;
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", copy));
Console.WriteLine(row == copy);
```

```csharp exec
id: g-string-cannot-change
expect: CS0200
// Lesson, two names: word[0] = 'M'; does not compile.
string word = "NOON";
word[0] = 'M';
Console.WriteLine(word);
```

```csharp exec
id: g-string-new-value
// Lesson, two names: = gives a name a different string, and the other name keeps the old one.
string word = "NOON";
string other = word;
word = "MOON";
Console.WriteLine(word);
Console.WriteLine(other);
```

```csharp exec
id: g-new-array-in-method
// Lesson, inside a method: with pixels = new int[3]; first, row keeps 10, 20, 30.
static void BrightenRow(int[] pixels)
{
    pixels = new int[3];
    for (int index = 0; index < pixels.Length; index++)
    {
        pixels[index] = pixels[index] + 10;
    }
    Console.WriteLine(string.Join(", ", pixels));    // the probe shows what the loop changed
}

int[] row = { 10, 20, 30 };
BrightenRow(row);
Console.WriteLine(string.Join(", ", row));
```

```csharp exec
id: g-new-in-loop
// Lesson, the grid that was one row: with new int[3] in the loop, only the first row starts with 5.
int[][] grid = new int[3][];
for (int row = 0; row < 3; row++)
{
    grid[row] = new int[3];
}
grid[0][0] = 5;
foreach (int[] pixels in grid)
{
    Console.WriteLine(string.Join(" ", pixels));
}
```

```csharp exec
id: g-grid-toarray
// Lesson, the grid that was one row: grid.ToArray() makes a new outer array with the same rows;
// the loop copies the rows too.
int[][] grid = { new int[] { 0, 0 }, new int[] { 0, 0 } };
int[][] outer = grid.ToArray();
Console.WriteLine(outer == grid);
Console.WriteLine(outer[0] == grid[0]);

int[][] copy = new int[grid.Length][];
for (int row = 0; row < grid.Length; row++)
{
    copy[row] = grid[row].ToArray();
}
copy[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", copy[0]));
```

```csharp exec
id: g-darker-loop
// Lesson, your-turn-3 (pixel art), solution note: a loop that builds the new array as it goes.
int[] row = { 200, 150, 100, 50 };
int[] darker = new int[row.Length];
for (int index = 0; index < darker.Length; index++)
{
    darker[index] = row[index] / 2;
}
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", darker));
```

```csharp exec
id: g-challenge-starter
// Lesson, challenge: the starter compiles and runs as it is.
// Write the message in rows of four, then read it down the columns.
string message = "MEETMEATNOONXXXX";
char[,] grid = new char[4, 4];
for (int index = 0; index < message.Length; index++)
{
    grid[index / 4, index % 4] = message[index];    // row, then column
}
// Read the columns: column 0 is the first letter of every row.
```

```csharp exec
id: g-challenge-answer
// Lesson, challenge: one answer, which codes and then decodes.
string message = "MEETMEATNOONXXXX";
char[,] grid = new char[4, 4];
for (int index = 0; index < message.Length; index++)
{
    grid[index / 4, index % 4] = message[index];
}
string coded = "";
for (int column = 0; column < 4; column++)
{
    for (int row = 0; row < 4; row++)
    {
        coded += grid[row, column];
    }
}
Console.WriteLine(coded);

char[,] back = new char[4, 4];
for (int index = 0; index < coded.Length; index++)
{
    back[index % 4, index / 4] = coded[index];    // the coded text fills the columns
}
string decoded = "";
foreach (char letter in back)
{
    decoded += letter;
}
Console.WriteLine(decoded);
```

```csharp exec
id: p-row-then-column
// Practice 1: (a) to (f).
int[][] grid =
{
    new int[] { 1, 2, 3 },
    new int[] { 4, 5, 6 },
};
int[,] table = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(grid[0][2]);
Console.WriteLine(grid[^1][0]);
Console.WriteLine(grid.Length);
Console.WriteLine(grid[1].Length);
Console.WriteLine(table[1, 2]);
Console.WriteLine(table.Length);
```

```csharp exec
id: p-cs0022-table
expect: CS0022
// Practice 1 (g): table[1][2] does not compile.
int[,] table = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(table[1][2]);
```

```csharp exec
id: p-cs0022-grid
expect: CS0022
// Practice 1, answer: grid[1, 2] does not compile either, with the same code.
int[][] grid =
{
    new int[] { 1, 2, 3 },
    new int[] { 4, 5, 6 },
};
Console.WriteLine(grid[1, 2]);
```

```csharp exec
id: p-tolist
// Practice 2: with ToList(), scores keeps its three elements.
List<int> scores = new() { 1, 2, 3 };
List<int> saved = scores.ToList();
saved.Add(4);
Console.WriteLine(string.Join(", ", scores));
Console.WriteLine(string.Join(", ", saved));
```

```csharp exec
id: p-two-new-rows
// Practice 4: with a new for each row, only the second row starts with 7.
int[][] rows = { new int[3], new int[3] };
rows[1][0] = 7;
Console.WriteLine(string.Join(" ", rows[0]));
Console.WriteLine(string.Join(" ", rows[1]));
```

```csharp exec
id: p-copy-rows
// Practice 5: with the loop copy, the cell prints 0 0.
int[][] grid =
{
    new int[] { 0, 0 },
    new int[] { 0, 0 },
};
int[][] copy = new int[grid.Length][];
for (int row = 0; row < grid.Length; row++)
{
    copy[row] = grid[row].ToArray();
}
copy[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
```

```csharp exec
id: p-same-array
// Practice 6: first == third is True; SequenceEqual compares the elements;
// == on two strings made separately compares their text.
int[] first = { 1, 2, 3 };
int[] second = { 1, 2, 3 };
int[] third = first;
Console.WriteLine(first == third);
Console.WriteLine(first.SequenceEqual(second));
string word = "NO";
word += "ON";
string other = "NOON";
Console.WriteLine(word == other);
```

```csharp exec
id: p-reverse-in-place
// Practice 9 (pixel art), second solution's note: Array.Reverse on picture's rows reverses the caller's picture.
static int[][] Mirror(int[][] picture)
{
    int[][] result = new int[picture.Length][];
    for (int row = 0; row < picture.Length; row++)
    {
        Array.Reverse(picture[row]);
        result[row] = picture[row];
    }
    return result;
}

int[][] picture =
{
    new int[] { 1, 0, 0, 0 },
    new int[] { 1, 1, 0, 0 },
};
int[][] mirrored = Mirror(picture);
Console.WriteLine(string.Join(" ", picture[0]));
Console.WriteLine(string.Join(" ", mirrored[0]));
```

```csharp exec
id: p-isbn-one-digit
// Practice 11: change one digit, and the remainder is no longer 0.
static int DotProduct(int[] first, int[] second)
{
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

int[] weights = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
int[] digits = { 0, 3, 0, 6, 4, 0, 6, 1, 5, 2 };
Console.WriteLine(DotProduct(digits, weights) % 11);
Console.WriteLine(11 * 12);
digits[3] = 7;
Console.WriteLine(DotProduct(digits, weights) % 11);
```

```csharp exec
id: p-different-lengths-frames
try
{
#line 1
static int DotProduct(int[] first, int[] second)
{
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

Console.WriteLine(DotProduct(new int[] { 1, 2 }, new int[] { 3, 4, 5 }));
Console.WriteLine(DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5 }));
#line default
}
catch (IndexOutOfRangeException e)
{
    foreach (System.Diagnostics.StackFrame frame in new System.Diagnostics.StackTrace(e, true).GetFrames())
    {
        if (frame.GetFileLineNumber() > 0)
        {
            Console.WriteLine($"line {frame.GetFileLineNumber()}");
        }
    }
}
// Practice 12, fold: the exception names line 6, inside the method, and the call is on line 12.
// #line 1 numbers the cell's own lines as they are on the page; the try and catch only print the frames.
```

```csharp exec
id: p-throw-both
expect: exception
// Practice 12, solution note: with the throw, the cell's own first call stops at the check.
static int DotProduct(int[] first, int[] second)
{
    if (first.Length != second.Length)
    {
        throw new ArgumentException("DotProduct needs two arrays of the same length");
    }
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

Console.WriteLine(DotProduct(new int[] { 1, 2 }, new int[] { 3, 4, 5 }));
Console.WriteLine(DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5 }));
```

```csharp exec
id: p-throw-second
expect: exception
// Practice 12, solution note: the second call stops at the check in the same way.
static int DotProduct(int[] first, int[] second)
{
    if (first.Length != second.Length)
    {
        throw new ArgumentException("DotProduct needs two arrays of the same length");
    }
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

Console.WriteLine(DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5 }));
```
