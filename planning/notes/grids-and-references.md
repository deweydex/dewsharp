# grids-and-references: notes for a reviewer

Written from dewlab `tutorials/comprehensions-and-grids/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 16):
action *replace*, shape *tutorial*, size M, batch 4, depends on
`lists-and-sequences` and `writing-your-own-functions`. No earlier draft of
this page existed, so both pages were written from the start by the porter.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/grids-and-references/grids-and-references.md` and
`grids-and-references-practice.md`; their recorded outputs are the two
`*.outputs.json` files beside them, written by the browser checker; and
this file was the draft's `NOTES.md`. The three `*.native.json` files were
deleted: the browser checker's outputs files replace them. "What was done
when it moved", just below, says what changed in the move. The rest of
this file is the porter's, brought up to date (what the move made stale is
marked *(stale)* or rewritten), with the porter's questions settled where
the playbook, the course map, the style guide or the exemplars answer
them. What none of them answers is under "Open", at the end of the
questions.

Files:

- `grids-and-references.md`: the lesson, version `2026.09.28.1`. 16 exec
  cells, 4 of them in world variants (14 on show in either world); 3
  predicts, 5 hints, 5 solutions, 4 `inputs` blocks, 1 fold, 1 challenge, 4
  fences of code to read, 2 tables. Two cells are meant to fail:
  `a-grid-is-an-array-of-arrays-1` (`expect: CS0623`) and
  `building-a-grid-1` (`expect: exception`). No cell and no challenge
  warns.
- `grids-and-references-practice.md`: the practice page, version
  `2026.09.28.1`, 15 problems. 18 exec cells, 2 of them in world variants
  (17 on show in either world); 3 predicts, 8 hints, 9 solutions, 5
  `inputs` blocks, 11 folds. Three cells are meant to fail:
  `row-then-column-2` (`expect: CS0022`), `rows-not-there-yet-1` and
  `different-lengths-1` (`expect: exception`). No cell warns.
- `grids-and-references.outputs.json`,
  `grids-and-references-practice.outputs.json`: what the browser checker
  recorded, per world.
- `NOTES.md` is now this file, `planning/notes/grids-and-references.md`.

The counts are the parser's (`parseLesson`, with the page id), which
reports no errors on either page.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  grids-and-references grids-and-references-practice` ran every cell,
  solution and `inputs` row of both pages in the real engine, in both
  worlds. On the draft as it came, every output, value, compiler message
  and exception was the same as the native check's, character for
  character: no difference in culture or number formatting (the pages
  print only whole numbers), in how `Console.WriteLine` prints a `char[]`
  (`PHHW`), in trimmed APIs (`ToArray`, `ToList`, `SequenceEqual`,
  `Array.Reverse`, `GetLength`), in how a value shows in the `inputs` table
  (`['P', 'H', 'H', 'W']`, `[[1, 1, 0, 1, 1], ...]`, `[null, null, null]`),
  or in exceptions (the same types, messages and lines; the browser also
  records the second frame of practice 12, line 12, and the method's name,
  `DotProduct(int[], int[])`). No cell warned. The porter's 27 probes (at
  the end of this file) were run in the browser too, in a scratch lesson
  (`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`):
  26 did what their comments say, with the same output as natively. The
  one that differed is `p-different-lengths-frames`, which prints its own
  stack frames with `StackFrame.GetFileLineNumber()`: in the browser it
  printed `11` and no line numbers. .NET in the browser keeps no line
  numbers in a stack trace, and the page finds them with its own look-up
  in the program's debug information (`planning/evidence/spike_b.md`), so
  a program that reads its own frames sees 0. The page's report is what
  the lesson quotes, and it names lines 6 and 12, as the probe did
  natively.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell, or no
  longer quoted:
  - Lesson, "A grid is an array of arrays": "the compiler's message is
    CS0623" (probe `g-cs0623` only). A new cell,
    `a-grid-is-an-array-of-arrays-1`, `expect: CS0623`, has a row with no
    `new int[]`. The prose says before it that it is meant not to
    compile, quotes the recorded message (`Program.cs(4,5): error CS0623:
    Array initializers can only be used in a variable or field
    initializer. Try using a new expression instead.`), defines *array
    initializer* and *new expression*, and asks the reader to add the
    `new int[]`. The porter left the message unquoted because of its
    terms; the page shows it whole anyway, so the prose now explains it.
  - Lesson, "Building a grid": the `NullReferenceException`, its message
    and line 8 (probe `g-null-row` only). The invitation to comment out
    the row line became a cell, `building-a-grid-1`, `expect: exception`:
    the times table with that line commented out. The prose asks which
    line will stop it, then quotes the report as the page shows it
    (`Unhandled exception. System.NullReferenceException: Object reference
    not set to an instance of an object.` / `at line 8 of Program.cs`),
    and asks the reader to delete the `//`. This settles the porter's
    question 5.
  - Lesson, "Inside a method": the fold's `10, 20, 30` after adding
    `pixels = new int[3];` (probe `g-new-array-in-method` only). The
    invitation became a cell, `inside-a-method-2`, which is
    `two-names-for-one-list-3` with that line added; the fold follows it,
    as an explanation of what the reader has seen.
  - Lesson, "The grid that was one row": "only the first row starts with
    5" (probe `g-new-in-loop` only) became a question, "Which rows start
    with 5 now?", with the reason after it. The sentence on
    `grid.ToArray()` now points to practice problem 5, whose cell shows it.
  - Lesson, `your-turn-3--pixel-art`: the note's loop that builds the new
    array (probe `g-darker-loop` only) is now a second solution,
    *building a new array*; the first is *copying first*. Both print `200,
    150, 100, 50` above `100, 75, 50, 25`, as the lists page did with its
    notes (`lists-and-sequences`, "counting the steps").
  - Practice 1: (a) to (g) (probes only). `row-then-column-1` now prints
    `grid[1][0]` and then (a) to (f), in order, and the prose asks for
    guesses first. (g), and the answer's `grid[1, 2]`, are a new cell,
    `row-then-column-2`, `expect: CS0022`, which gives both messages
    (`expected 2` at (7,19), `expected 1` at (8,19)); its fold quotes them
    and defines *indices*.
  - Practice 2: "then `scores` keeps its three elements" (probe `p-tolist`
    only) became an invitation to change the line to `ToList()` and run it
    again.
  - Practice 4: "Then only the second row starts with 7" (probe
    `p-two-new-rows` only) became "Which rows start with 7 now?".
  - Practice 5: "With that copy, the cell prints `0 0`" (probe
    `p-copy-rows` only) became an invitation to put the loop in place of
    `grid.ToArray()`.
  - Practice 6: `first == third` and `SequenceEqual` (probe
    `p-same-array` only). A second cell, `same-elements-2`, prints both
    (`True`, `True`), with a question before it and its own fold. The
    first cell's predict still asks about one line only, so the page
    compares the guess with that line (decision 37).
  - Practice 12: the fold now quotes the report as the page shows it,
    three lines, with the method's frame (`at line 6 of Program.cs (in
    DotProduct(int[], int[]))`) and the call's (`at line 12 of
    Program.cs`), and names line 12 as the line that is *responsible*, in
    the words of [Exceptions] (`reading-an-error-message`), which it now
    links to. The solution note no longer says that "both calls" stop at
    the check: with the `throw`, the first call stops the program, so the
    second never runs (probe `p-throw-both`).
- **A wrong reference.** The lesson said that *value type* was found in
  problem 2 of `storing-and-computing-practice`. It is problem 1 ("A copy,
  or a link"), and the lesson now says so.
- **Links** (decision 32, and the list of pages moving in this round).
  Every `lesson:` link goes to a page in `lessons/` or one on the list.
  New: [the page about arrays and lists] for CS0200 (`lists-and-sequences`),
  practice problem 5
  (`grids-and-references-practice#5-a-copy-that-is-not`), [Two names, one
  list] (`two-names-one-list`) and [Dictionaries]
  (`looking-things-up-by-name`) in "Looking back", which were plain text;
  and on the practice page [Reusable methods] (`building-reusable-tools`,
  practice 12's solution note, plain text before) and [Exceptions]
  (`reading-an-error-message`, practice 12's fold). At the final check,
  the checker reported only the link to `building-reusable-tools`, which
  is on the list and not moved yet.
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in the words of
  `lists-and-sequences` and `repeating-yourself`. It ends with the
  exemplars' "Next, the practice page ...".
- **Plain words.** "leaves it out of the second row" became "the second
  row has no `new int[]`"; "left out the 5 without a word" became
  "ignored the 5, with no message"; "go over every index" became "give
  every index ..., one at a time"; "named after `null`" became "comes from
  `null`"; "as long as `row`" (which could read as "if") became "with the
  same length as `row`"; "side by side" in "Looking back" became "one
  experiment on an `int` and on an array". *Caller* is now defined where
  it first appears ("the array of the code that called it, its
  *caller*").
- **Where to read more.** All three answered HTTP 200 on 28 September
  2026. Microsoft's page is titled *The array reference type - C#
  reference*, with sections "Multidimensional arrays", "Jagged arrays",
  "Pass single-dimensional arrays as arguments" (whose text says "passing
  an array by value doesn't prevent changes to the array elements"), and
  a jagged array written `[[1, 3, 5, 7, 9], [0, 2, 4, 6], [11, 22]]`, as
  the note says. Jon Skeet's *Parameter passing in C#* has the sections
  the note describes, then "Reference parameters", "Output parameters"
  and "Parameter arrays", so the note now names `ref`, `out` and
  `params`. YouTube's oEmbed gives *Cellular Automata: Life from Simple
  Rules* by argonaut, and the watch page gives 26 November 2022 (so
  dewlab's year is right) and the chapters: "Compute Shaders" at 3:11 and
  "Outro" at 6:37, and "Simulation written in C# using the Unity engine".
  The note now says "about seven minutes" and that the second half is
  about making it run fast in Unity, a game engine whose programs are
  written in C#.
- **The page, looked at.** Both pages were opened in headless Chromium on
  the real server (`launch()` from `tests/engine/helpers.mjs`), in both
  worlds, at 390 and 900 pixels wide: no errors in the console, no
  sideways scroll, no author errors, every cell labelled PROGRAM. The
  cells meant to fail, and practice 12, were run on the page. See "Page
  behaviour" below for what it showed.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `grids-and-references: "Grids and references: arrays of arrays, and two
  names for one array"` under `planned:`. The playbook's checklist says to
  delete it when the lesson moves; this move was told not to edit the
  course files.

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

## What changed from dewlab, and why (the porter's notes)

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
- `storing-and-computing` practice problem 1 (the porter wrote 2): *value
  type*, defined for `int` in a fold, with "Not every type works this
  way".
- `making-decisions`: "`==` on two strings compares their text" (its line
  121), which practice problem 6 points back to.
- `a-total-that-starts-again`: where `int total = 0;` goes, used by practice
  problem 15.

New to a PDP reader here: `null` and `NullReferenceException` (the FOOP
drafts meet them in `the-tools-around-your-code` and
`keeping-details-inside-an-object`), `new int[3]` (the lists page's open
question 8 asked for it), two-dimensional arrays and `GetLength`.

### Links: back only, as the batch rule says *(stale)*

*(Stale: the move made the three links in the first table, and
`lists-and-sequences` already links here in both places the second table
names. The last row is still only a suggestion: it is problem 1 of
`storing-and-computing-practice`, not 2, and that page is not this move's
to edit.)*

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
the reader has not met. *(Stale: this is now a cell meant to fail,
`a-grid-is-an-array-of-arrays-1`, and the prose quotes and explains the
message.)*

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
that the changed cell compiles and runs. See "Page behaviour" (the colour
was checked on the page when it moved).

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
numbers are the cell's own), and defines `null`. *(Stale: the invitation
is now a cell meant to fail, `building-a-grid-1`.)* One sentence says that
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
*value types* the reader met on `storing-and-computing` practice 1 (the
porter wrote 2).

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
fold. *(Stale: the invitation is now a cell, `inside-a-method-2`, and the
fold follows it.)* dewlab's advice ("let its name say which") is kept as "it is worth
deciding", not as an order.

**The grid that was one row** (`two-names-for-one-list-4`). dewlab's
`[[0] * 3] * 3` has no C# twin. The course map asks for "a jagged array
whose rows are the same array". The cell makes one row before the loop
and puts it in every row; that is the mistake a C# reader can really make,
by moving `new` out of a loop. The invitation puts `new int[3]` back into
the loop (probe `g-new-in-loop`), and the prose gives a rule: each time
`new` runs, it makes one array. *(The move made "only the first row starts
with 5" a question.)* dewlab's note on copying a grid with
`grid[:]` becomes `grid.ToArray()`, with a loop that copies each row, as
code to read (probe `g-grid-toarray`).

**Your turn 3.** Both worlds keep their tasks. Secret messages: the message
is a `char[]` and the shift uses `char` arithmetic, as
`storing-and-computing` does; `Console.WriteLine` prints a `char[]` as text
(the lists page says so). Pixel art: dewlab's `// 2` becomes `/ 2`, which
is the same for these positive numbers. The solution notes say what
dewlab's did, with `ToArray()`. dewlab's comprehension alternative in the
pixel-art note becomes a loop that builds a new array (probe
`g-darker-loop`). *(Stale: that loop is now a second solution, *building a
new array*.)*

**Looking back.** dewlab's question stays. The transposition-cipher
challenge stays, now with a `char[,]` filled with `index / 4` and
`index % 4`, which uses whole-number division on purpose. Probes
`g-challenge-starter` and `g-challenge-answer` show that the starter runs
and that the task can be done both ways. The closing names the next two
pages in plain text (see "Links"). *(Stale: they are links now, and the
paragraph on Visual Studio is new.)*

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
  this session had no credits. *(Checked when it moved: see "Where to read
  more" under "What was done when it moved".)*

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
4, 13 and 14 keep their questions in the prose, with an answer fold, and so
do the second cells of problems 1 and 6, which the move added. The new
cells in the lesson (`a-grid-is-an-array-of-arrays-1`, `building-a-grid-1`,
`inside-a-method-2`) ask in the prose too, so each page still has three
predict blocks.

### The practice page

dewlab's problems, in dewlab's order, and what became of each:

| dewlab | Here | What changed |
|---|---|---|
| 1. What each one gives (comprehensions) | 1. Row, then column (`row-then-column-1`, new id) | A new task: seven expressions on a jagged `grid` and a two-dimensional `table`, one of which does not compile (CS0022; probes `p-row-then-column`, `p-cs0022-table`, `p-cs0022-grid`). *Moved:* the cell now prints (a) to (f), and (g) is a second cell, `row-then-column-2`, `expect: CS0022`, with `grid[1, 2]` too. |
| 2. There and back | gone | Comprehensions (course map). |
| 3. Without a list | gone | Generator expressions (course map). |
| 4. b = a | 2. A second name for a list (`b-equals-a-1`) | A `List<int>` with `Add`, so the page shows that a list is a reference type too. `a` and `b` became `scores` and `saved` (the style guide's names); the name `saved` states the mistaken belief. `ToList()` makes a separate list (probe `p-tolist`). The predict block went; the question stays. *Moved:* the fold invites the `ToList()` change, and quotes no output for it. |
| 5. A function that adds | 3. A method that adds (`a-function-that-adds-1`) | `List<string>`, `static void AddItem`. Keeps its predict. |
| 6. Two rows, one list | 4. Two rows, one array (`two-rows-one-list-1`) | `int[][] rows = { row, row };` is C#'s nearest to `[[0] * 3] * 2`. The fixed version is probe `p-two-new-rows`. The predict block went, because the lesson's last grid cell has just shown the same thing. *Moved:* the fold asks "Which rows start with 7 now?" in place of the answer. |
| 7. A copy that is not | 5. A copy that is not (`a-copy-that-is-not-1`) | `grid.ToArray()` for `grid[:]`; the fold's loop copy is probe `p-copy-rows`. Keeps its predict. *Moved:* the fold invites the loop copy, and quotes no output for it. The lesson now points here. |
| (new) | 6. The same elements, or the same array? (`same-elements-1`) | dewlab's lesson opened with `==` on two lists giving `True`. In C#, `==` on two arrays compares references and gives `False`. It is one of the surprises this page exists for, and nothing else in the map claims it. `SequenceEqual` compares the elements, and strings are the exception (probe `p-same-array`). *Moved:* a second cell, `same-elements-2`, prints `first == third` and `SequenceEqual`, with its own fold. |
| 8. A times table | 7. A times table (`a-times-table-1`) | An `int[,]`, `new int[4, 4]`. The native check shows a two-dimensional array in an `inputs` row as one flat list, so the inputs are three single elements. |
| (new) | 8. Rows that are not there yet (`rows-not-there-yet-1`) | `NullReferenceException` as a cell, `expect: exception`, with a one-line fix. The lesson meets it only as an invitation. |
| 9. In the square, or out of it | 9. (`in-the-square-1--secret-messages`, `in-the-square-1--pixel-art`) | Secret messages: `Encode(string word, char[,] square)` returns the pairs as one string, `"12 04 20 24"`, since dewlab's list of pairs has no simple C# form; `enumerate` becomes two for loops. The `JAM` input shows what a J does (dewlab asked it in the note). Pixel art: `Mirror(int[][] picture)`, with the stub's `result` already made; the `inputs` show `picture` after the call, and a picture with rows of different lengths. The second solution, "a shorter way C# has", uses `ToArray` and `Array.Reverse`, and its note explains why it reverses a copy (probe `p-reverse-in-place`). |
| 10. Pair by pair | 10. Pair by pair (`pair-by-pair-1`) | A loop by index into `new int[first.Length]`. The second tier (`zip`) goes: C#'s `Zip` needs a lambda for this (course map, open question 5). `xs` and `ys` became `first` and `second`. |
| (the lesson's `your-turn-5--secret-messages`) | 11. A check digit (`a-check-digit-1`, new id) | The course map moves the ISBN check digit here. The dot product is defined in one sentence; the sigma formula goes (maths). The stub prints the dot product as well as the remainder, because a stub that returns 0 would print a remainder of 0 and look like a passing check. The pixel-art brightness version (weights 0.299, 0.587, 0.114) goes, since the map moves only the ISBN. |
| 11. Different lengths | 12. Different lengths (`different-lengths-1`) | `expect: exception`: the first call prints 11, the second stops. dewlab's first tier returned `None`; an `int` method has no such value, so the fold says that, and the one solution is "a way you'll meet later", with `throw` (open question 6). The fold names line 6 and line 12 (probe `p-different-lengths-frames`). *Moved:* the fold quotes the page's report and links to [Exceptions]; the solution note links to [Reusable methods]. |
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
practice page `ToList()`, `SequenceEqual`, *dot product*, *ISBN-10*. The
move added *array initializer* and *new expression* (the CS0623 cell),
*caller* ("Inside a method") and, on the practice page, *indices* (the
CS0022 fold). `throw`
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

## Where each number and message in the prose comes from

Every number and quoted output on both pages is in
`grids-and-references.outputs.json` or
`grids-and-references-practice.outputs.json` (browser checker, 28
September 2026). Cells after the world variants are recorded once per
world, as `<id>@<world>`, with the same output in each.

| Number or message | Recorded by |
|---|---|
| 1 (`picture[1][3]`) | `a-grid-is-a-list-of-lists-1` |
| CS0623 at (4,5) and its message | `a-grid-is-an-array-of-arrays-1` |
| the arrow drawn in `#` and `.` (not quoted) | `a-grid-is-a-list-of-lists-2` |
| 1, 5, 5, 25 | `two-dimensions-in-one-array-1` |
| 6; `3 6 9` | `a-grid-is-a-list-of-lists-3` |
| nothing printed, then the `NullReferenceException` report at line 8 | `building-a-grid-1` |
| a new array's elements are 0 (`new int[3]`, `new int[3, 3]`) | `two-names-for-one-list-4` (`5 0 0`); practice `a-times-table-1`, whose starter prints a new `int[4, 4]` as zeros |
| HELP | solution of `your-turn-2--secret-messages` |
| the negative; `picture` unchanged | solution of `your-turn-2--pixel-art` and its `inputs` |
| `255, 0, 0, 0` | `two-names-for-one-list-1` |
| four zeros in `row`; 255 in `copy` | `two-names-for-one-list-2` |
| 10 | `inside-a-method-1` |
| `20, 30, 40` | `two-names-for-one-list-3` |
| `10, 20, 30` (the fold) | `inside-a-method-2` |
| one change in all three rows | `two-names-for-one-list-4` |
| `MEET`, `PHHW` | solution of `your-turn-3--secret-messages` |
| `row` unchanged, both ways | the two solutions of `your-turn-3--pixel-art` |
| the challenge compiles, with no warning | `challenges` in the lesson's outputs file |
| practice 1: 4; 3, 4, 2, 3, 6, 6 | `row-then-column-1` |
| practice 1: CS0022 at (7,19) `expected 2`, and at (8,19) `expected 1` | `row-then-column-2` |
| practice 2: `1, 2, 3, 4` | `b-equals-a-1` |
| practice 3: `a, b, new` | `a-function-that-adds-1` |
| practice 4: `7 0 0`, twice | `two-rows-one-list-1` |
| practice 5: `1 0` | `a-copy-that-is-not-1` |
| practice 6: `False`; `True`, `True` | `same-elements-1`; `same-elements-2` |
| practice 7: 4, 16, 6; `1 2 3 4` and `4 8 12 16` | solution of `a-times-table-1` and its `inputs` |
| practice 8: the exception at line 2; 1 | `rows-not-there-yet-1` and its solution |
| practice 9: `"12"` for H; `JAM` gives two pairs | solution of `in-the-square-1--secret-messages` (`12 04 20 24`) and its `inputs` (`00 21`) |
| practice 9: the `Mirror` starter prints nothing | `in-the-square-1--pixel-art` |
| practice 10: `4, 10, 18` | solution of `pair-by-pair-1` |
| practice 11: 132; remainder 0 | solution of `a-check-digit-1` |
| practice 12: 11; the report at line 6, in `DotProduct(int[], int[])`, and line 12 | `different-lengths-1` |
| practice 13: `GOR` | `from-earlier-where-the-cut-is-1` |
| practice 14: 11, then 5 | `from-earlier-one-name-two-places-1` |
| practice 15: 2, 5, 6; then 2, 3, 1 | `from-earlier-a-total-for-each-row-1` and its solution |

The rest are the tasks' own numbers (the pictures, 255, a shift of 3, the
ISBN's digits and weights), arithmetic on a recorded number (132 is 11 ×
12), claims that earlier pages record (`word[0] = 'M';` is CS0200 on
`lists-and-sequences`, cell `changing-a-list-2`; a range makes a new
array, `lists-and-sequences` "Taking a range" and practice 2; `==` on two
strings compares their text, `making-decisions`), or facts that are not
program output: 25 places in a Polybius square, with I and J sharing one;
Polybius and the torches; an ISBN-10's weights and the 11. Behaviour that
the prose describes without quoting an output was checked by the porter's
probes, run in the browser when the page moved (`g-swap`, `g-range-copy`,
`g-string-new-value`, `g-new-in-loop`, `g-grid-toarray`, `g-challenge-*`,
`g-jagged-collection-expression`, `p-tolist`, `p-two-new-rows`,
`p-copy-rows`, `p-reverse-in-place`, `p-isbn-one-digit`, `p-throw-*`).

## Page behaviour, checked when it moved

The porter listed these for "once the page UI exists". Each was looked at
in headless Chromium on the real server.

- **Colour.** The invited change to `a-grid-is-a-list-of-lists-2`
  (`ConsoleColor.Blue`, two spaces, `ResetColor`) was typed into the cell
  and run, in the light and the dark theme. The page draws each pixel as
  a blue block (`rgb(59, 120, 255)`), readable on both console
  backgrounds, and the arrow is clear. Each block is two characters wide,
  a little wider than it is tall, with a thin gap between rows, so "two
  side by side are closer to a square" holds. Nothing changes.
- **Exceptions** (course map, open question 9). The page shows the state
  line ("Stopped with an exception on line 8 of Program.cs." for
  `building-a-grid-1`, line 2 for practice 8, line 6 for practice 12),
  the output so far, and `Unhandled exception. <type>: <message>` with one
  `at line N of Program.cs` line for each frame, and a fold, *What .NET
  said, in full*. For practice 12 the first frame reads `at line 6 of
  Program.cs (in DotProduct(int[], int[]))` and the second `at line 12 of
  Program.cs`. The lesson and practice 12 now quote the report as the page
  shows it; practice 8's solution note names the line and the exception.
- **Compiler messages.** `a-grid-is-an-array-of-arrays-1` shows "Did not
  compile, so nothing ran." and the one CS0623 message, as quoted.
  `row-then-column-2` shows both CS0022 messages and then "Read the first
  message first: one mistake can cause several messages." The fold
  explains both messages, so it reads well with that line.
- **`null` in "Compare with a solution".** The table shows the runner's
  display of each value (`showValue` in `web/page/lesson.js`), and the
  recorded display of the `Mirror` starter's `mirrored` is `[null, null,
  null]`, as natively.
- **A cell that prints nothing.** The `Mirror` starter shows "Ran." and
  the console's own line, *It printed nothing.* The task says so, and
  points to **Compare with a solution**. The Polybius starter prints one
  empty line.
- **Two-dimensional arrays in the table.** No `inputs` row on either page
  is a whole two-dimensional array, so this did not arise.
- **`char[]` in the table.** `message` and `coded` show as `['P', 'H',
  'H', 'W']`, as natively.
- **A solution for a cell meant to fail.** Practice 8 and 12 have a
  solution and no `inputs`. The page draws a comparison table only for a
  cell with `inputs`, so these show the solution as a fold under the cell,
  and nothing else.
- **The drawing cell's length:** see question 3.

## The porter's questions, and what was decided

1. **`new int[] { ... }` for each row, or collection expressions?**
   *Decided by the course map and the style guide,* as
   `lists-and-sequences` decided its question 1: the course map writes an
   array as `{ ... }` (its entry for `lists-and-sequences`), and inside a
   jagged array that form needs `new int[]` on each row. This page also
   counts the times `new` runs to count the arrays. The reading note says that C# accepts
   `[[1, 3, 5], [0, 2, 4]]` too. A change to collection expressions for
   the whole course would be a change to the style guide, which is Josh's.
2. **`ToArray()`, `ToList()` and `SequenceEqual` are LINQ.** *Decided by
   the course map* ("`row.ToArray()` makes a copy") *and
   `docs/LESSON_FORMAT.md`*, whose compiler settings include the implicit
   `using System.Linq;` for the page and the exported project (decision
   38), so every cell and every downloaded project compiles them. A
   project made from Visual Studio's own Console App template has the
   same implicit `using` lines. `ToArray()` stays first, and `row[..]`
   stays named beside it.
3. **The drawing cell is long.** *Decided by the style guide's* `#code`:
   the test for splitting a cell is "a cell with two ideas in it wants to
   be two cells", and this cell has one (draw a grid with nested loops).
   Seven of its lines are the picture, which the cell must make again
   because each program cell works on its own. `repeating-yourself`'s
   `nested-loops-1`, in `lessons/`, is the same shape. It stays, so that
   the reader sees the arrow they met in the first cell.
4. **Colour in the shared section.** *Decided by `docs/LESSON_FORMAT.md`:*
   a world variant holds a task, with its own cell, "shown once per
   world". The colour is not a task but a change to the shared drawing
   cell, so it stays in the shared prose, as three lines of code to read.
   The course map's "in pixel art" reads here as "in a picture made of
   pixels", which is what the shared cell draws in both worlds. It was
   checked on the page (see "Page behaviour"). If Josh meant the
   pixel-art world only, the paragraph would move into a pixel-art task
   with a cell of its own.
5. **`null` as an invitation, or a cell meant to fail?** *Decided by the
   style guide* ("Mistakes on purpose", `#how-a-page-teaches`) *and
   decision 29*, as `lists-and-sequences` did with `indexes-1`: the
   invitation is now `building-a-grid-1`, `expect: exception`, and the
   prose quotes the report the page shows.
6. **`throw` in practice 12.** *Decided by the course map:* its
   descriptor table puts `throw` on `building-reusable-tools` ("Error
   trapping and reporting"), and "What stays" keeps the two tiers of
   solution, the second of which is "a way you'll meet later". The
   solution stays, and its note now links to [Reusable methods].
7. **Value types, twice.** *Checked:* `two-names-one-list` is now in
   `lessons/`. It defines a *value type* as a type whose variables each
   hold "its own copy of the value", the words of
   `storing-and-computing-practice` problem 1, and a *reference type* as
   one whose variables hold a reference; this page says the same in
   shorter words. It also says that a method given an array can change
   the caller's elements, "as the page about grids showed", which
   `two-names-for-one-list-3` does. The three agree.
8. **Cell ids that still say "list".** *Decided by the course map*
   ("Cells that keep their task keep their ids") *and decision 28*, which
   renames only ids that name Python. They stay.
9. **The Polybius pairs as `int[,]`:** open (below).
10. **Jon Skeet's article:** open (below). It exists, with the sections
    the note describes.
11. **The negative task gives the outer loop.** *Decided by the style
    guide:* "Worked, then completed, then your own"
    (`#how-a-page-teaches`). The starter is the completed step, a program
    with a gap to fill, between the worked drawing cell and the blank
    tasks of the practice page. It stays.
12. **Practice 6 in the lesson?** *Decided by the style guide and the
    course map:* the lesson already has its three predicts ("two or three
    times on a page"), and the course map's list of the lesson's cells
    does not include it. It stays on the practice page, which now also
    shows `SequenceEqual` in a cell.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **The Polybius pairs** (`your-turn-2--secret-messages`). An `int[,]` of
  two columns practises the new brackets, but `pairs[i, 0]` is less plain
  than `row` and `column` from two arrays side by side. Which reads better
  for a Level 5 reader?
- **Jon Skeet's article** is short and clear at the start, but it is
  written for programmers. Keep it as the second reading, or leave only
  Microsoft's page and the video?
- **"a shorter way C# has"** on practice 9's second solution
  (`Array.Reverse`), as on `lists-and-sequences-practice` problem 8 and
  `making-decisions` practice. No page in the course map is known to
  teach `Array.Reverse`, so the exemplars' "a shorter way you'll meet
  later" would promise something the course doesn't give. One title for
  "a C# method the course doesn't teach" would settle all of them
  (`lists-and-sequences` left the same question open).

## Probes

Each cell below checked a claim in the draft's prose that no cell on the
pages printed. None of them is part of either page, and the cells with
`expect:` fail on purpose. When the lesson moved, all 27 were run in the
browser, in a scratch lesson (a copy of this section under a frontmatter,
`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`). Each
did what its comment says, with the same output as natively, except
`p-different-lengths-frames`, which reads its own stack frames: in the
browser they have no line numbers, so it printed only `11` (see "What was
done when it moved"). The claims that the page now quotes are printed by
page cells instead (see "Where each number and message in the prose comes
from").

The porter's note: `g-null-row` keeps its comment at the end and
`p-different-lengths-frames` uses `#line 1`, so that the line numbers they
report are the page cell's own. They were run natively with the same
NativeCheck command, passing `NOTES.md` as the file.

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
