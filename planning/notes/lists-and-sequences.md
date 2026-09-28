# lists-and-sequences: notes for a reviewer

Ported from dewlab `tutorials/lists-and-sequences/` (version 2026.09.26.1):
the lesson, its practice page, its glossary file and its picture. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 15):
action *adapt*, shape *tutorial*, size L, batch 3, depends on
`repeating-yourself`. No earlier draft of this page existed, so both pages
were written from the start by the porter.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/lists-and-sequences/lists-and-sequences.md` and
`lists-and-sequences-practice.md`, with the picture
`where-the-cuts-are.svg` beside them; their recorded outputs are the two
`*.outputs.json` files, written by the browser checker; and this file was
the draft's `NOTES.md`. The three `*.native.json` files were deleted: the
browser checker's outputs files replace them. "What was done when it
moved", just below, says what changed in the move. The rest of this file
is the porter's, brought up to date (what the move made stale is marked
*(stale)* or rewritten), with the porter's questions settled where the
playbook, the course map, the style guide or the exemplars answer them.
What none of them answers is under "Open", at the end of the questions.

Files:

- `lists-and-sequences.md`: the lesson, version `2026.09.28.1`. 24 exec
  cells, 8 of them in world variants (20 on show in either world); 3
  predicts, 10 hints, 10 solutions, 8 `inputs` blocks, 2 folds (the
  line-by-line fold and "Why count from 0?"), 1 challenge. Three cells are
  meant to fail: `indexes-1` (`expect: exception`), `changing-an-array-2`
  (`expect: CS1061`) and `changing-a-list-2` (`expect: CS0200`). No cell
  and no challenge warns.
- `lists-and-sequences-practice.md`: the practice page, version
  `2026.09.28.1`, 17 problems. 20 exec cells, 2 of them in world variants
  (19 on show in either world); 3 predicts, 7 hints, 15 solutions, 10
  `inputs` blocks, 8 folds. Five cells are meant to fail: `which-element-2`,
  `past-the-end-1` and `a-list-that-grows-1` (`expect: exception`),
  `from-earlier-always-true-1` (`expect: CS0019`) and
  `from-earlier-print-or-return-1` (`expect: CS0029`). No cell warns
  except `which-element-2`, whose CS0251 is the point of the problem.
- `where-the-cuts-are.svg`: dewlab's picture, redrawn with C# ranges.
- `lists-and-sequences.outputs.json`, `lists-and-sequences-practice.outputs.json`:
  what the browser checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/lists-and-sequences.md`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write lists-and-sequences`
  ran every cell, solution and `inputs` row of both pages in the real
  engine, in both worlds. On the draft as it came, every output, value,
  diagnostic and exception was the same as the native check's, character
  for character: no difference in culture or number formatting
  (`133.33333333333334`, `1.6180371352785146`, `1.6666666666666667` print
  as natively), `Console.WriteLine` of a `string[]` (`System.String[]`) or
  a `char[]` (`ALGORITHMS`), trimmed APIs (`Array.Reverse`, `Split`,
  `List<T>` ranges), compiler messages (the same codes, lines, columns and
  text) or exceptions (the same types and messages, at the same lines). The
  porter's 31 probes (at the end of this file) were run in the browser too,
  in a scratch lesson (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`): each did what its comment says, with the
  same output as natively. The probe lines are one more than the page's,
  because each probe starts with a comment line.
- **Starters that warned.** Three lesson starters (`your-turn-2--secret-messages`,
  `your-turn-3--secret-messages`, `your-turn-4--pixel-art`), the lesson's
  challenge and two practice starters (`moon-from-noon-1`,
  `next-door-1--secret-messages`) made variables they did not use, so an
  untouched Run showed CS0219, and the prose explained the warning in
  three places. The playbook's pitfall says a starter's variables must be
  used, and `storing-and-computing`, `making-decisions` and
  `repeating-yourself` settled it the same way when they moved. Each
  starter now prints a line that uses its given values, and each solution
  prints the same line: `A shift of 3:`, `Where E is in MEET ME BY THE OLD
  TREE:`, `Total 0, average 0` (the solution: `Total 800, average
  133.33333333333334`), `Plain: MEETMEATNOON` in the challenge, `NOON`
  above `newWord`, and the message above `doubles`. For parallel worlds,
  `next-door-1--pixel-art` prints its row above `edges` too, and
  `your-turn-2--pixel-art` prints `0 pixels:` (the solutions: `11
  pixels:`), so that no starter's first run is only an empty line. The
  paragraphs about CS0219 went, from the lesson and from the practice
  page's opening. The `inputs` blocks are unchanged.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell or a
  solution, or no longer quoted:
  - Lesson, printing: "an array of `char` is the one kind that
    `Console.WriteLine` prints as text" (probe only). A new cell,
    `printing-an-array-2`, prints `letters` both ways: `ALGORITHMS`, then
    `A L G O R I T H M S`. The sentence that `letters` is an array of
    `char` moved up to it from "Indexes".
  - Lesson, indexes: `letters[10]` and its exception (probe only). The
    invitation became a cell, `indexes-1`, `expect: exception`, which
    prints `S` and then stops at line 3. The prose says it is meant to
    stop before it runs, quotes the report as the page shows it
    (`Unhandled exception. System.IndexOutOfRangeException: Index was
    outside the bounds of the array.` / `at line 3 of Program.cs`), and
    links to [Exceptions].
  - Lesson, the "Why count from 0?" fold: `letters[3]` is `O` (probe
    only) became `letters[9]` is `S`, which two cells print.
  - Lesson, strings: `"NOON"[0]` and `"NOON"[^1]` are `'N'` (probe only)
    became "`word[^1]` is its last letter", with no output quoted.
  - Lesson, arrays cannot grow: the invitation to add `letters.Add('!');`
    and its CS1061 message (probe only) became a cell,
    `changing-an-array-2`, `expect: CS1061`. The prose quotes the start of
    the recorded message, `Program.cs(2,9): error CS1061: 'char[]' does
    not contain a definition for 'Add'`, and says the rest names where
    else the compiler looked.
  - Lesson, lists: "`Console.WriteLine(words)` prints the name of the
    list's type" (probe only; the recorded text is
    ``System.Collections.Generic.List`1[System.String]``) became an
    invitation: "What do you think `Console.WriteLine(words);` prints for
    a list? Can you add it at the end, and see?"
  - Lesson, strings: "`word[1..]` is `"OON"`, so `"M" + word[1..]` is
    `"MOON"`" (probe only) became "`"M" + word[1..]` is one way to build
    it", with a link to practice problem 4, whose solution prints `MOON`.
  - Lesson, `building-lists-with-loops-1`: "the values 0 to 25: 26
    numbers" became "one letter for each value of `number`"; 26 is
    printed.
  - Lesson, `your-turn-2--secret-messages`: "26, 27 and 28 to 0, 1 and 2"
    (probe only) became "For X, Y and Z, `number + shift` is past the last
    position, and `% 26` makes it start again at 0. So the list ends with
    A, B and C", which the solution prints. "With 13, the same table codes
    a message and decodes it" (probe only) became an invitation to find
    it: take a letter, read the letter in the same place in `shifted`,
    then do the same with that letter.
  - Lesson, `your-turn-2--pixel-art`: the note's `value += 25` loop (probe
    only) is now a second solution, *counting in 25s*; the first is
    *counting the steps*. Both print `0 25 ... 250`.
  - Lesson, `your-turn-3--pixel-art`: "With `>=` ... prints 4" (probe
    only) is now a second solution, *keeping the last*, which prints 4;
    the first is *keeping the first*.
  - Lesson, `your-turn-4--pixel-art`: "The total is 800" (probe only) is
    now printed by the solution; the average is quoted as recorded,
    133.33333333333334, "about 133.3". The second hint's "Did it print
    133" (probe only) became "Does your average have nothing after the
    point?".
  - Practice 1: (a), (b), (c) and (e) (probe only). `which-element-1` now
    prints all four and then `numbers[^2]`; the predict asks for the last
    line, which is the number the page compares a guess with
    (decision 37). (f), `numbers[-1]`, is a new cell, `which-element-2`,
    `expect: exception`: CS0251, then `50`, then the exception at line 3.
    (d), `numbers[5]`, stays an invitation, and the fold names the same
    exception as the new cell's. The Python sentence is kept, as "If you
    have used Python".
  - Practice 2: (b) to (f) (probe only). `slices-1` now prints all six
    ranges, in the order of the list; the prose asks for a guess first.
  - Practice 3: `[40, 50]` in Python (not C# output) went; the Python
    sentence keeps its point without numbers.
  - Practice 4: "`word[1..]` is `"OON"`" and "`word` is still `NOON`"
    (probe only). The starter and the solution print `word` above
    `newWord`, so `NOON` is recorded; the note no longer quotes `"OON"`.
  - Practice 7: "1.6180339887…" (probe only) and "1 and 2, then 1"
    (probe only). The invitation to remove `(double)` became a second
    cell, `the-golden-ratio-2`, the same loop without the cast, which
    prints `1`, `2` and then `1` twelve times. The fold now says that the
    answers go up and down in turn, each step smaller, and that the last
    three all start 1.6180, from the recorded lines; the golden ratio is
    still named, with its formula.
  - Practice 8: "`numbers` stays as it was" (probe only). The second
    solution prints `numbers` after `result`: `10, 20, 30, 40, 50`.
  - Practice 10: "The average is 18" (probe only). The solution prints
    `The average is 18` above `above`.
  - Practice 11: "three times" (probe only). The solution prints `It
    appears 3 times.` under `most`.
  - Practice 14: "the second time it takes a number" (probe only) became
    "The body added a number to the list, and then `foreach` went to take
    the next one". The fold quotes the report as the page shows it, at
    line 2, and moved above the task.
  - Practice 16: "2, 5, 8, 11, 14 and 17" (probe only). The cell prints
    each value with `Console.Write`, then the count; the question asks how
    many times the loop runs its body, and what the last line prints.
  - Practice 17: "It prints 8 and ends" read as if the cell ran; it
    became "nothing ran, not even the `Console.WriteLine` inside
    `DoubleAndPrint`". "With `static int` ... would print 8 once" (probe
    only) is now a task with a solution, `DoubleAndReturn`, as on
    [Methods], which prints 8.
- **Cells meant to fail, said before the run.** `changing-a-list-2` and
  practice 3 and 17 carry a predict whose answer is the failure, so the
  prose says "Whatever happens when you run it is meant to happen, and
  nothing is broken", as `making-decisions` does, without giving the
  answer. The new cells say "meant to stop with an exception" or "meant
  not to compile" before them.
- **The picture in a dark theme.** The porter's SVG used the site's CSS
  variables with fallbacks. The page shows it with `<img>`, so the
  variables never reach it: in the dark theme the letters, the cut
  numbers and the three labels were dark grey on near-black, hard to read.
  The picture now has a light card of its own and fixed ink, as
  `from-a-description-to-classes/the-mission-in-boxes.svg` does (a comment
  in the file says why). Checked in headless Chromium, light and dark.
- **Links** (decision 32, and the list of pages moving in this round).
  Every `lesson:` link goes to a page in `lessons/` or one on the list,
  with that page's short title: [Loops] (`repeating-yourself`; the "why"
  fold, building lists, looping; practice 16), [Variables and types]
  (`storing-and-computing`; strings, the cast), [Exceptions]
  (`reading-an-error-message`; `indexes-1`), [Grids and references]
  (`grids-and-references`; "Looking back" and "Where to read more"), the
  practice page's problem 4 (`lists-and-sequences-practice#4-moon-from-noon`),
  [Powers] (practice 5), [Decisions] (practice 15), [Methods]
  (`writing-your-own-functions`; practice 17, twice) and [Debugging]
  (`when-it-goes-wrong`; practice 14, which it meets again). At the final
  check, the checker reported only the links to `grids-and-references`
  and `when-it-goes-wrong`, which are on the list and not moved yet.
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in the words of
  `storing-and-computing` and `repeating-yourself`. It ends with the
  exemplars' "Next, the practice page …", and names
  [Grids and references] as the page after it.
- **Plain words.** "left out by a special rule" became "No special rule
  removes the element at index 5"; "fit together again" became "make the
  whole array again when they are joined"; "count through the indexes"
  (twice) became "count the indexes"; "copies the elements across" became
  "copies the elements into it".
- **Where to read more.** Both Microsoft Learn pages answered HTTP 200 on
  28 September 2026, titled *The array reference type - C# reference* and
  *Explore ranges of data using indices and ranges*. The second says "The
  List<T> supports indices but doesn't support ranges", which .NET 8
  changed (question 3), so the note now says so. Its opening is a code
  listing of each element's index from the start and from the end, not a
  table, and the note says "Its first example lists". YouTube's oEmbed
  gives *What if you had to invent a dynamic array?* by Reducible. Its
  length, "About fourteen minutes", came from dewlab and could not be
  checked from here (the watch page gave no length, and the TubeAlfred
  lookup had no credits), so it went. The year, 2019, is dewlab's and is
  not checked either.
- **The page, looked at.** Both pages were opened in headless Chromium on
  the real server (`launch()` from `tests/engine/helpers.mjs`), in both
  worlds, at 390 and 900 pixels wide: no errors in the console, no
  sideways scroll, every cell labelled PROGRAM. See "Page behaviour"
  below for the porter's UI questions.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `lists-and-sequences: "Arrays and lists: many values under one name"`
  under `planned:`. The playbook's checklist says to delete it when the
  lesson moves; this move was told not to edit the course files.

## Frontmatter

- `title`: "Arrays and lists: many values under one name", the course
  map's title. dewlab's was "Lists and looping over them".
- `covers: [PDP-LO4, PDP-LO6]`, from the course map. dewlab gives outcomes
  for each section, all maths outcomes of the integrated course (MIT-6.3,
  MIT-6.5, MIT-6.7). They go with the maths (course map, "What changes
  because of C#", last bullet).
- `worlds`: dewlab's two, with dewlab's descriptions, as the course map
  says for PDP.
- `year:` is dropped: the format has no such field.
- The practice page has `from: lists-and-sequences-practice` (dewlab's id),
  `practice_for: lists-and-sequences`, the same worlds, and no `covers`, as
  the other drafted practice pages do.

## What changed from dewlab, and why (the porter's notes)

### What the reader already knows

PDP's order is `first-steps` to `mixed-first-programs` (the series "First
programs"), then `writing-your-own-functions`, then this page. Drafted:
`storing-and-computing`, `dividing-in-csharp`, `powers-in-csharp`,
`making-decisions`, `equals-three-ways`, `reading-an-error-message`,
`repeating-yourself` and `a-total-that-starts-again`. Not drafted:
`first-steps`, `compiler-errors`, `types-and-their-sizes`,
`reading-input`, `mixed-first-programs`, and `writing-your-own-functions`
(same batch as this page).

From the drafts, the reader has met: typed variables, `char` and its casts
(`(char)('A' + number)`), `word[0]` for a string's first character, CS0200
when a string's character is changed (`storing-and-computing` practice
21), `Length` on a string, `$"..."`, `%` and the Caesar shift, `if` and
`else`, `&&` and `||`, `"AEIOU".Contains(character)` (a second-tier
solution on `making-decisions`), `while`, `for`, `foreach` over a
string's characters, `+=` and `++`, CS0019 for a `char` compared with a
`string`, the CS0219 warning on stubs, exceptions and their names
(`reading-an-error-message`), and one array: `int[] numbers = { ... };`
with `numbers[0]` and `foreach`, on `repeating-yourself` practice 8, which
says "The page on arrays and lists meets them properly".

Two earlier pages promise that this page explains counting from 0:
`storing-and-computing` ("explains why it is 0, not 1") and
`repeating-yourself` ("the page on arrays and lists shows why"). dewlab's
page never says why. So the lesson gains a "Why count from 0?" fold
(`dl-why`): an index is how far an element is from the start; the
computer finds `letters[3]` by moving 3 elements along; C counted this
way; and `for (int i = 0; i < letters.Length; i++)` gives exactly one
value for each index.

### Links: back only, as the batch rule says *(stale)*

*Stale: the move linked every page on the list of pages moving in this
round (see "Links" under "What was done when it moved"). The two earlier
pages' plain-text mentions below are links already: `repeating-yourself`
and `storing-and-computing` link to this page, and `making-decisions`
links to its practice page.*

This page is batch 3. The lesson links to `repeating-yourself` (batch 2),
`storing-and-computing` (batch 1) and its own practice page. The practice
page links to `powers-in-csharp` (batch 1), `making-decisions` and
`repeating-yourself` (batch 2). Everything else is plain text, and should
become a link when that page lands:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, "Looking back" | "The next page keeps a whole picture in an array of arrays" | `lesson:grids-and-references` | 4 |
| lesson, "Where to read more" | "which the next page uses" | `lesson:grids-and-references` | 4 |
| practice 17 | "From the page on writing your own methods" | `lesson:writing-your-own-functions` | 3 (same batch) |

Earlier pages that point here, which I did not edit (this run writes only
in this folder):

| Page | What it says | What this page does |
|---|---|---|
| `storing-and-computing`, "Looking back" | already a link: "explains why it is 0, not 1" | the fold "Why count from 0?" |
| `repeating-yourself`, for loops | "the page on arrays and lists shows why" (plain text) | the same fold; the link can be added |
| `repeating-yourself` practice 8 | "The page on arrays and lists meets them properly" (plain text) | the section "Arrays: ordered collections"; the link can be added |
| `making-decisions`, `your-turn-4--secret-messages`, second solution | "The page on arrays and lists uses `Contains` on a list too" (plain text) | only the practice page does (problem 12). Link to `lesson:lists-and-sequences-practice`, or reword (open question 11) |

dewlab's links go: `comprehensions-and-grids` (renamed
`grids-and-references`, batch 4) and, on the practice page,
`approaching-a-limit`, a maths page of the integrated course that no
dewsharp course lists.

### The lesson, section by section

**Opening (`a-list-of-words-1`).** The same cell with a `string[]`. The
predict went (see "Predicts" below). The question stays in the prose:
"What do you think the program prints? Run it and see."

**Arrays: ordered collections.** Defines *array*, *element*, *collection*,
the type `string[]`, and `Length` ("as it gave the number of characters in
a string"). `lists-ordered-collections-1` keeps dewlab's task (print the
collection and its length), with the words in place of the letters, and
carries the predict the course map asks for: `Console.WriteLine(words)`
prints `System.String[]`. The options are the four words, the code as
written, and `System.String[]`. A new cell, `printing-an-array-1` (new task,
new id), shows `string.Join` with three separators, and defines
*separator*. One sentence says that a `char[]` is the one kind of array
that `Console.WriteLine` prints as text. That is true because
`Console.WriteLine` has an overload for `char[]` and none for other
arrays; probe `l-char-array-prints-text` shows `char[]`, `int[]` and
`bool[]`. *(The move added `printing-an-array-2`, which prints a `char[]`
both ways.)*

**Indexes.** From here on, the letters are a `char[]`, where dewlab had a
list of one-letter strings. C#'s type for a letter is `char`, which
`storing-and-computing` teaches, and the next section builds a
`List<char>`. Negative indexes become `^1` and `^2`, and the cell adds
`letters[letters.Length - 1]`. An invitation to add `letters[10]` names
`IndexOutOfRangeException` and defines *bound* *(the move made it a cell,
`indexes-1`)*. Then the fold on 0 (see above). dewlab's sentence on
indexing a string keeps `"NOON"[0]` and `"NOON"[^1]`, now `'N'`, a
`char`, and points back to `word[0]` *(the move dropped the two `"NOON"`
examples, which no cell printed, and kept `word[0]` and `word[^1]`)*.

**Taking a range.** dewlab's slices are C#'s ranges, `letters[2..5]`,
`[..3]` and `[7..]`, as the course map says. One sentence says other
languages call it a slice. The predict and its three options stay.
`lists-ordered-collections-4` adds `letters[^3..]`. The picture is redrawn
(`where-the-cuts-are.svg`): the same boxes and cuts, a new row with the
cuts numbered from the end (`^10` to `^0`), and C# labels on the three
bands (`[2..5]`, `[..3]`, `[7..] and [^3..]`). The prose adds one idea:
an index names the cut just before its element, so `letters[3]` and
`letters[^1]` read the same way as a range. The alt text describes the new
row.

**Changing an array, and a list that grows.** dewlab's "Changing a list"
had one kind of collection. C# has two, so the section splits:

- `changing-an-array-1` (new): replace an element of a `char[]`, print
  it, and see that `Length` is still 10. An invitation to add
  `letters.Add('!');` gives CS1061, which is why C# has lists *(the move
  made it a cell, `changing-an-array-2`, `expect: CS1061`)*.
- `changing-a-list-1` keeps its id and its task (replace, add, count),
  with a `List<string>` of the message's words (`SIX`, then `TODAY`), as
  the course map asks. `new()` is used as the style guide says
  (`List<int> scores = new();`). The prose names `Add`, `Count` (not
  `Length`), `^1` and ranges on a list, and that `Console.WriteLine` on a
  list prints its type too.
- `changing-a-list-2` keeps its predict, with "It does not compile, so
  nothing runs" as an option, and `expect: CS0200`. The prose says the
  cell is meant to fail, quotes the message (line 2, column 1, as
  recorded), and defines *read only*, *mutable* and *immutable*.
  `"M" + word[1..]` replaces dewlab's `"M" + word[1:]`.

**Your turn 1.** Both worlds keep their tasks, with a `List<string>` and a
`List<int>`, `^1` for the last word, a range for the middle, and
`string.Join` to print. Each hint gains `after: 1 runs`. A stub that
compiles never gives the default `after: 1 errors`, and the other drafts
do the same.

**Building lists with loops.** `List<char>`, `new()`, and the cast from
`storing-and-computing`. The predict went; the question stays in the
prose. A new paragraph says why a list and not an array: its length need
not be known in advance.

**Your turn 2.** `shifted` is a `List<char>`; the solution note says
which positions `% 26` moves (26, 27 and 28 to 0, 1 and 2, probe
`l-wrap-positions`) and that a shift of 13 codes and decodes (probe
`l-shift-13`). dewlab's "that table undoes itself" was reworded. `fade` is
a `List<int>`; `range(0, 251, 25)` becomes a for loop with `+= 25` (probe
`l-fade-step`).

**Looping over arrays and lists.** `looping-over-lists-1` uses
`"MEET ME AT NOON".Split(' ')`, where dewlab only mentioned `.split()` in
prose; the course map names `Split(' ')`. `enumerate` goes, as the course
map says. `looping-over-lists-2`, dewlab's enumerate cell, becomes the for
loop by index, and dewlab's invitation to try `enumerate(words, 1)`
becomes "number the words from 1" with `{index + 1}` (probe `l-from-one`).
`looping-over-lists-3`, dewlab's `range(len(words))` cell, the "second
way", becomes `foreach` with a counter of its own. The order of the two
ways is swapped, because in C# the for loop is the plain one. dewlab's
advice stays: loop by index when the loop needs another element too.

**Your turn 3.** `places` loops by index over a string, with the CS0019
hint from `repeating-yourself` for `== "E"`. `brightest` loops by index
over an `int[]`; ">= prints 4" is probe `l-brightest-or-equal` *(the move
made it a second solution, *keeping the last*)*. "Without
`max()`" was dropped: `row.Max()` gives the value, not the index, so
nothing needs ruling out.

**Your turn 4.** "Without `sum()`" was dropped for the same reason. The
pixel stub declares `double average = 0;`, because dewlab's stub printed a
variable it had not made, which in C# does not compile. A second hint
(`after: 2 runs`) is about `/` with two `int` values: 133 without the
cast (probe `l-average-whole`) *(the move dropped the 133 from the hint)*. dewlab's "keeps the code right" became
"means the code still works".

**Looking back.** dewlab's question stays, with a range and a for loop
(`letters[0..letters.Length]` is probe `l-fit-together`). A second
question is new: when would you choose an array, and when a list? The
rail-fence challenge keeps dewlab's text, with `List<char>` rails; probes
`l-challenge-starter` and `l-challenge-answer` show that it compiles and
can be solved.

**Where to read more.** *(See "Where to read more" under "What was done
when it moved" for what changed.)* *Think Python* and the Python tutorial go. Two
Microsoft pages replace them: *The array reference type* (whose examples
use `[1, 2, 3]`, so the note says C# accepts both forms, probe
`l-square-brackets`) and *Explore ranges of data using indices and
ranges*. I fetched both on 27 September 2026 to confirm their titles and
what the notes say about them. Reducible's video stays, reworded for a C#
list. Its title and channel were confirmed through YouTube's oEmbed; the
year (2019) and the length (about fourteen minutes) are dewlab's and were
not checked.

### Predicts

The style guide allows two or three. dewlab's lesson had four (the
opening, the slice, the string, the list's length); this lesson keeps
three: `lists-ordered-collections-1` (`System.String[]`, which the course
map asks for), `lists-ordered-collections-3` (where a range stops, which
the picture answers) and `changing-a-list-2` (CS0200, which the course map
asks for). The opening and the alphabet's length keep their questions in
the prose, without a block.

dewlab's practice page had four (problems 1, 3, 15 and 16). This one keeps
three: `which-element-1` (`^2`, now the last line it prints), `past-the-end-1`
(C# stops where Python does not) and `from-earlier-print-or-return-1` (it
does not compile). `from-earlier-how-many-times-1` keeps its question and
fold, without a block. The cells the move added (`printing-an-array-2`,
`indexes-1`, `changing-an-array-2`, `which-element-2`,
`the-golden-ratio-2`) ask for a guess in the prose, with no predict
block.

### The practice page

1. **Which element.** `xs` becomes `numbers` (the style guide's names).
   `xs[-2]` becomes `numbers[^2]`. A new item (f), `numbers[-1]`, for
   readers from Python: warning CS0251, then the same exception as (d).
   *(The move made the cell print (a), (b), (c) and (e) before `^2`, and
   made (f) a cell of its own, `which-element-2`.)*
2. **Ranges.** (a) to (d) as dewlab. The step items, `[::2]` and
   `[::-1]`, have no C# range; they become `[^2..]` and `[1..^1]`, and the
   fold says that a for loop does what a step did. *(The move made the
   cell print all six.)*
3. **Past the end.** The answer changes sides: C# stops with an
   `ArgumentOutOfRangeException`, where Python gives `[40, 50]`. The cell
   has `expect: exception`, and the fold says it is meant to stop. The
   course map says this problem "becomes `IndexOutOfRangeException`"; the
   exception a range past the end really gives is
   `ArgumentOutOfRangeException`. `IndexOutOfRangeException` is in
   problem 1 (d) and in the lesson. The fold defines *argument* in one
   sentence, because the message has the word (open question 9). *(The
   Python `[40, 50]` went: see "What was done when it moved".)*
4. **MOON from NOON.** `word[1..]`. The stub declares `newWord = ""` so
   that it compiles.
5. **Ten squares.** `n ** 2` becomes `number * number`, with a link to the
   powers page for why.
6. **Fibonacci.** `fibs` becomes `fibonacci`; `[-1]` and `[-2]` become
   `[^1]` and `[^2]`. The two solution titles became "with a for loop" and
   "with a while loop", since both use only what the reader has met.
7. **The golden ratio.** The cell divides with `(double)`, and an
   invitation to remove it shows `/` on two `int` values (1 and 2, then 1
   every time, probe `p-golden-whole`). The link to `approaching-a-limit`
   is gone. *(The move made the version without `(double)` a cell,
   `the-golden-ratio-2`.)*
8. **Backwards.** A counting-down for loop into a `List<int>`. The second
   tier, `xs[::-1]`, becomes `numbers[..]` and `Array.Reverse` (probe
   `p-reverse-copy` shows `numbers` unchanged), titled "a shorter way C#
   has", as on `making-decisions` practice (`storing-and-computing`
   practice has "a shorter way you'll meet later"). *(The move made the
   solution print `numbers` too.)* I avoided
   `numbers.Reverse()`: on an array it is LINQ, gives a sequence that
   prints as its type name, and needs `.ToArray()`.
9. **The longest word.** The second tier, `max(words, key=len)`, is gone.
   C#'s equal, `words.MaxBy(word => word.Length)`, needs a lambda (course
   map, open question 5). The stub starts `longest` at `words[0]`, as
   `repeating-yourself` practice 8 does.
10. **Above the average.** `(double)total / numbers.Length`. The note's 18
    and "two numbers" are probe `p-average`. *(The move made the solution
    print the average.)*
11. **Most often.** `numbers.count(n)` has no C# twin without a lambda, so
    the solution counts with a loop inside the loop, and the hint says so.
    The note about the square of the length stays; `repeating-yourself`
    already counted $n \times n$ for nested loops. The stub starts `most`
    at 0, so that "Compare with a solution" shows a difference: at
    `numbers[0]` it would already print 3.
12. **Once each.** `not in` becomes `!once.Contains(number)`, with a hint
    that a list has `Contains` as a string has. This is where
    `making-decisions`' promise about `Contains` on a list is met.
13. **Next door.** Both worlds keep their tasks. `range(len(...) - 1)`
    becomes `index < message.Length - 1`.
14. **A list that grows while a loop reads it** (new). The course map
    names `InvalidOperationException` ("changing a list inside its own
    `foreach`") among C#'s exceptions, and no other page in the map claims
    it. *(Not so: the course map's entry for `when-it-goes-wrong` has
    `InvalidOperationException` "from removing items inside a `foreach`".
    The problem stays, and now names [Debugging] as the page that meets it
    again: see question 7.)* The cell has `expect: exception`; the task is to make it print
    `1, 2, 3, 10, 20, 30`, and the solution keeps the count before the
    loop. The hint's claim that `numbers.Count` in the condition never
    stops is probe `p-grows-with-count`.
15. **From earlier: or joins two conditions.** dewlab's "always true"
    becomes a compiler error in C#: `'E'` is a `char`, not a `bool`
    (CS0019). The id is kept, because the problem (a vowel test that
    does not work) is the same. The task is now to read the message and
    fix the condition.
16. **From earlier: how many times.** Unchanged but for C#'s for loop;
    the predict block went. *(The move made the cell print each value of
    `number`, then the count.)*
17. **From earlier: print or return.** In C#, `int result =
    DoubleAndPrint(4);` does not compile (CS0029, "Cannot implicitly
    convert type 'void' to 'int'"), as the course map says for
    `writing-your-own-functions`. The predict keeps three options, one of
    them "It does not compile". The name `DoubleAndPrint` is the course
    map's. *(The move added a task and a solution, `DoubleAndReturn`,
    which prints 8.)*

### The glossary file

dewsharp has no glossary panel, so each of dewlab's entries is defined in
the prose where it first appears:

| dewlab entry | Here |
|---|---|
| list, element | *array*, *element*, *collection* ("Arrays: ordered collections"); *list* ("Changing an array, and a list that grows") |
| index, zero-based indexing | "Indexes", with `^` for dewlab's negative index |
| slice | *range*, with "some languages call this a slice" |
| mutable, immutable | before and after `changing-a-list-2` |
| `append()` | `Add` |
| `enumerate()` | gone; the for loop by index |
| `.split()` | `Split(' ')`, in `looping-over-lists-1` |

New terms, each defined where it first appears: *separator*, *bound*,
*read only*, `Count`, `new()`, and *dynamic array* (in the reading list).

## What C# made different, in short

- Two collections: an array keeps its length, a `List<T>` grows with
  `Add`. `Length` for arrays and strings, `Count` for lists.
- `Console.WriteLine` on an array or a list prints its type's name
  (`System.String[]`), except for a `char[]`; `string.Join` prints the
  elements.
- `^1` in place of `-1`. A negative index is a warning (CS0251) and then
  an exception.
- Ranges in place of slices: no step, and a range past the end is an
  exception, where Python shortens a slice without a word.
- Changing a string's character does not compile (CS0200), where Python
  stopped at run time.
- An array has no `Add` (CS1061).
- No `enumerate`, no `sum`, no `max(key=...)`, no `list.count(x)`: loops,
  or methods that need lambdas.
- `/` on two `int` values drops the fraction (the average, the golden
  ratio).
- `foreach` over a list that the loop changes stops with an
  `InvalidOperationException`.
- `||` between a `bool` and a `char` does not compile (CS0019).

## Where each number and message in the prose comes from

Every number and quoted output on both pages is in
`lists-and-sequences.outputs.json` or
`lists-and-sequences-practice.outputs.json` (browser checker, 28 September
2026). Cells after the world variants are recorded once per world, as
`<id>@<world>`, with the same output in each.

| Number or message | Recorded by |
|---|---|
| `ME` | `a-list-of-words-1` |
| 4; `System.String[]` | `lists-ordered-collections-1` |
| the three joins | `printing-an-array-1` |
| `ALGORITHMS`; `A L G O R I T H M S` | `printing-an-array-2` |
| A, S, S, S, M; the last of ten at index 9 | `lists-ordered-collections-2` |
| `S`, then the `IndexOutOfRangeException` report at line 3 | `indexes-1` |
| `letters[9]` is `S` (the "why" fold) | `lists-ordered-collections-2`, `indexes-1` |
| G O R | `lists-ordered-collections-3` |
| G O R, A L G, H M S, H M S | `lists-ordered-collections-4` |
| `a L G ...`; still 10 | `changing-an-array-1` |
| CS1061 at (2,9) and the start of its message | `changing-an-array-2` |
| `MEET ME AT SIX`, `... TODAY`, 5 | `changing-a-list-1` |
| CS0200 at (2,1) and its message | `changing-a-list-2` |
| `^1` and ranges work on a list | solution of `your-turn-1--secret-messages` (`TONIGHT`, `BY THE STATION`) |
| `80 120 160`; eight pixels after `Add` | solution of `your-turn-1--pixel-art` |
| 26, A to Z | `building-lists-with-loops-1` |
| D to C, ending A, B, C | solution of `your-turn-2--secret-messages` |
| 0 to 250 in 25s, 11 pixels, both ways | solutions of `your-turn-2--pixel-art` |
| `MEET 4`, `ME 2`, `AT 2`, `NOON 4` | `looping-over-lists-1` |
| 0 to 3 with the words; `words.Length` is 4 | `looping-over-lists-2`, `lists-ordered-collections-1` |
| both loops print the same | `looping-over-lists-2`, `looping-over-lists-3` |
| six E's, at 1, 2, 6, 13, 21, 22 | solution of `your-turn-3--secret-messages` |
| 2 with `>`; 4 with `>=` | solutions of `your-turn-3--pixel-art` |
| 18 | solution of `your-turn-4--secret-messages` |
| 800; 133.33333333333334 | solution of `your-turn-4--pixel-art` |
| the challenge compiles, with no warning | `challenges` in the lesson's outputs file |
| practice 1: 10, 30, 50, 5, then 40 | `which-element-1` |
| practice 1: CS0251 at (3,27) and its text; 50; the exception at line 3 | `which-element-2` |
| practice 2: all six ranges | `slices-1` |
| practice 3: the `ArgumentOutOfRangeException` report at line 2 | `past-the-end-1` |
| practice 4: `NOON`, `MOON` | solution of `moon-from-noon-1` |
| practice 5: the ten squares | solution of `ten-squares-1` |
| practice 6: 1, 1, 2, 3, 5, 8, 13 and the fifteen terms, both ways | solutions of `fibonacci-1` |
| practice 7: up and down in turn; the last three start 1.6180; 1.6180371352785146 | `the-golden-ratio-1` |
| practice 7: 1 and 2, then 1 | `the-golden-ratio-2` |
| practice 8: `50, 40, 30, 20, 10`; `numbers` unchanged | solutions of `backwards-1` |
| practice 9: `HEDGEHOG` | solution of `the-longest-word-1` |
| practice 10: 18; 2 | solution of `above-the-average-1` |
| practice 11: 3, 3 times | solution of `most-often-1` |
| practice 12: `3, 7, 9, 1` | solution of `once-each-1` |
| practice 13: `1, 21`; `1, 4` | solutions of `next-door-1--*` |
| practice 14: the `InvalidOperationException` report at line 2; `1, 2, 3, 10, 20, 30` | `a-list-that-grows-1` and its solution |
| practice 15: CS0019 at (2,5) and its text; `not a vowel` | `from-earlier-always-true-1` and its solution |
| practice 16: 2, 5, 8, 11, 14, 17; 6 | `from-earlier-how-many-times-1` |
| practice 17: CS0029 at (6,14) and its text; 8 | `from-earlier-print-or-return-1` and its solution |

The rest are the tasks' own numbers (ten letters, 255 for white, 128 for
`#`, a shift of 3 or 13, fifteen Fibonacci terms, the cut numbers in the
picture), carried from dewlab, or facts that are not program output: C
in the early 1970s; C#, Java and Python count from 0; the golden ratio is
$(1 + \sqrt{5})/2$; EE, LL, SS and OO are common in English; photo
software finds edges; .NET 8 gave a list ranges.

## Page behaviour, checked when it moved

The porter listed these for "once the page UI exists". Each was looked at
in headless Chromium on the real server.

- **What the page shows for an exception** (course map, open question 9).
  It shows the state line "Stopped with an exception on line 3 of
  Program.cs.", the output so far, and `Unhandled exception. <type>:
  <message>` with `at line 3 of Program.cs` under it, and a fold, *What
  .NET said, in full*. The lesson's `indexes-1` and practice 3 and 14 now
  quote that report as the page shows it; practice 1 names the exception
  in prose. Practice 14's "the line with `foreach`" is line 2, which is
  where the page says the program stopped.
- **A warning, then an exception** (practice 1 (f), now
  `which-element-2`): the page shows `Program.cs(3,27): warning CS0251:
  ...` above the output, then `50`, then the exception report. The fold
  describes them in that order.
- **An empty line of output.** Every starter now prints a line of its own
  before its empty list (see "Starters that warned"), except the practice
  starters that print only an empty list (`ten-squares-1`, `backwards-1`,
  `once-each-1`). Their Run shows "Ran." and one empty line, so the page
  says that the program ran.
- **"Compare with a solution" with lists and arrays.** On practice 8, the
  table shows `result` as `[]` for the starter and `[50, 40, 30, 20, 10]`
  for the solution, and on practice 4 `""` against `"MOON"`, each row
  marked "different". The recorded values show a `List<int>` and an
  `int[]` the same way (`[50, 40, 30, 20, 10]` for both solutions of
  practice 8), and a `List<char>` as `['D', 'E', ...]`.
- **The picture.** It did not read well in a dark theme: fixed (see "The
  picture in a dark theme").
- **The CS1061 message** is now a cell's (`changing-an-array-2`). The page
  shows it whole; the prose quotes its start, and says what the rest is.
- **The challenge starter** no longer warns: it prints `Plain:
  MEETMEATNOON` first.

## The porter's questions, and what was decided

1. **`{ 1, 2, 3 }`, `new() { ... }`, or `[1, 2, 3]`?** *Decided by the
   course map and the style guide:* the course map writes an array as
   `string[] words = { ... };` ("What changes in C#" for this page), and
   the style guide's `#code` writes a list as `List<int> scores = new();`.
   The page keeps both forms, and the reading note says that C# accepts
   `[1, 2, 3]` too. A change to collection expressions for the whole
   course would be a change to the style guide, which is Josh's.
2. **`char[]` for the letters.** *Decided by the course map* ("`char` is a
   type of its own: `'A'` is not `"A"`") *and* `storing-and-computing`,
   which gives a letter the type `char` (`word[0]`). `char[]` stays, and
   the page now shows in a cell what `Console.WriteLine` does with one
   (`printing-an-array-2`).
3. **Ranges on a list need .NET 8 or later.** *Decided by
   `docs/LESSON_FORMAT.md`* ("C# 14 on .NET 10", for the page and the
   exported project) *and decision 38:* every cell and every downloaded
   project has list ranges. `your-turn-1` keeps them. The reading note on
   Microsoft's ranges page, which says that a list "doesn't support
   ranges", now says that this was true before .NET 8. Which Visual Studio
   the college has is the course map's open question 11.
4. **`looping-over-lists-3`.** *Decided by the course map*, whose entry
   lists "`looping-over-lists-1..3` (`enumerate` becomes `for`)" among the
   cells to rework. It stays.
5. **Predicts.** *Decided by the style guide* ("two or three",
   `#how-a-page-teaches`) *and the course map*, which names two of them
   (`System.String[]`, and `changing-a-list-2` "keeps its predict with the
   compiler error as the answer"). The third stays on the range, where the
   picture answers it; the opening keeps its question in the prose.
6. **Practice 9 and 11 without lambdas.** *Decided for this page by the
   course map:* its open question 5 asks whether lambdas are shown once as
   code to read (on `putting-things-in-order` and `how-we-got-here`) or
   left to the extra `asking-a-list-a-question`. Either answer keeps them
   off this page, so the loops stay.
7. **Practice 14.** *Decided by the course map:* "What changes because of
   C#" names `InvalidOperationException` for "changing a list inside its
   own `foreach`", which is this page's topic, and the entry for
   `when-it-goes-wrong` treats it in full. The problem stays here as
   practice, and its fold names [Debugging] as the page that meets it
   again.
8. **Arrays made with a length** (`new int[26]`). *Decided by the style
   guide* ("Define every term where it first appears", `#voice`): the
   draft of `grids-and-references`, the next page, defines `new int[3]`
   and `new int[3][]` where it first needs them (its notes say so). This
   page doesn't need one.
9. **The message in practice 3.** *Decided by the exceptions page and the
   page itself:* `reading-an-error-message` teaches the reader to read the
   whole report, and the page shows it whole. The fold quotes the report
   as the page shows it, and says that `(Parameter 'length')` names a
   parameter of a method inside .NET, not a name in the reader's code.
10. **Practice 17 against `writing-your-own-functions`.** *Checked:* that
    page is in `lessons/`. It writes `static void DoubleAndPrint(int
    number)` above the statements, and its cell meant to fail is CS0029,
    `int a = DoubleAndPrint(5);`. Practice 17 has the same shape, and now
    links to it as [Methods]; its new solution uses that page's
    `DoubleAndReturn`.
11. **`making-decisions`' promise.** *Settled by `making-decisions`:* its
    second solution now says "A list has a `Contains` method too, and
    [the practice page for Arrays and lists] uses it", a link to this
    practice page, where problem 12 uses `once.Contains(number)`.
12. **The Python sentences.** *Decided by the style guide*
    (`#who-reads-this`: "some already have [programmed], perhaps in
    Python") *and `reading-an-error-message`*, which writes "If you know
    Python, ...". Both sentences stay, as "If you have used Python", and
    practice 3's no longer quotes Python's output.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **"a shorter way C# has"** on practice 8's second solution
  (`Array.Reverse`). No page in the course map is known to teach
  `Array.Reverse`, so the exemplars' "a shorter way you'll meet later"
  would promise something the course doesn't give. `making-decisions`
  practice uses the same title, and `repeating-yourself` left the same
  question open. One title for "a C# method the course doesn't teach"
  would settle all three.
- **The video's year.** *What if you had to invent a dynamic array?*
  (Reducible) is confirmed by title and channel. The year, 2019, is
  dewlab's, and its length could not be checked from here, so "About
  fourteen minutes" went.

## Probes

Each cell below checked a claim in the draft's prose that no cell on the
pages printed. None of them is part of either page, and the cells with
`expect:` fail on purpose. When the lesson moved, all 31 were run in the
browser checker in a scratch lesson, with the same results as natively
(see "What was done when it moved"). The claims they supported are now
printed by cells or solutions on the pages, or no longer made, so the
probes are kept here only as a record.

```csharp exec
id: l-letters-10
expect: exception
// Lesson, indexes: letters[10] stops with an IndexOutOfRangeException.
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(letters[10]);
```

```csharp exec
id: l-char-array-prints-text
// Lesson, printing: a char[] prints as text; other arrays print their type.
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
int[] numbers = { 1, 2, 3 };
bool[] answers = { true, false };
Console.WriteLine(letters);
Console.WriteLine(numbers);
Console.WriteLine(answers);
```

```csharp exec
id: l-list-prints-type
// Lesson, lists: Console.WriteLine on a list prints the name of its type.
List<string> words = new() { "MEET", "ME", "AT", "NOON" };
Console.WriteLine(words);
```

```csharp exec
id: l-letters-3
// Lesson, "Why count from 0?": O has three letters before it, and letters[3] is O.
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(letters[3]);
Console.WriteLine(string.Join(" ", letters[..3]));
int count = 0;
for (int i = 0; i < letters.Length; i++)
{
    Console.Write($"{i} ");
    count++;
}
Console.WriteLine();
Console.WriteLine(count);
```

```csharp exec
id: l-noon
// Lesson, indexes: "NOON"[0] and "NOON"[^1] are both the char 'N'.
char first = "NOON"[0];
char last = "NOON"[^1];
Console.WriteLine(first);
Console.WriteLine(last);
Console.WriteLine(first == last);
```

```csharp exec
id: l-fit-together
// Lesson, ranges: letters[..3] and letters[3..] fit together again; letters[0..letters.Length] is the whole array.
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(string.Join(" ", letters[..3]) + " | " + string.Join(" ", letters[3..]));
Console.WriteLine(string.Join(" ", letters[0..letters.Length]));
Console.WriteLine(letters[..3].Length + letters[3..].Length);
```

```csharp exec
id: l-array-add
expect: CS1061
// Lesson, changing an array: an array has no Add.
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
letters.Add('!');
Console.WriteLine(string.Join(" ", letters));
```

```csharp exec
id: l-list-index-and-range
// Lesson, lists: ^1 and ranges work on a list, and a range of a list is a new list (.NET 8 and later).
List<string> words = new() { "MEET", "ME", "AT", "SIX", "TODAY" };
List<string> middle = words[1..4];
Console.WriteLine(words[^1]);
Console.WriteLine(string.Join(" ", middle));
Console.WriteLine(middle.GetType().Name);
middle[0] = "YOU";
Console.WriteLine(string.Join(" ", words));
```

```csharp exec
id: l-word-range
// Lesson, strings: word[1..] is the string "OON", and "M" + word[1..] is "MOON".
string word = "NOON";
string rest = word[1..];
Console.WriteLine(rest);
Console.WriteLine("M" + word[1..]);
Console.WriteLine(word);
```

```csharp exec
id: l-from-one
// Lesson, looping by index: {index + 1} numbers the words from 1.
string[] words = { "MEET", "ME", "AT", "NOON" };
for (int index = 0; index < words.Length; index++)
{
    Console.WriteLine($"{index + 1} {words[index]}");
}
```

```csharp exec
id: l-wrap-positions
// Lesson, your-turn-2 (secret messages): positions 26, 27 and 28 become 0, 1 and 2.
int shift = 3;
for (int number = 23; number < 26; number++)
{
    Console.WriteLine($"{number + shift} {(number + shift) % 26} {(char)((number + shift) % 26 + 'A')}");
}
```

```csharp exec
id: l-shift-13
// Lesson, your-turn-2 (secret messages): with 13, the same table codes and decodes.
List<char> shifted = new();
for (int number = 0; number < 26; number++)
{
    shifted.Add((char)((number + 13) % 26 + 'A'));
}
Console.WriteLine(string.Join(" ", shifted));
char coded = shifted['H' - 'A'];
char decoded = shifted[coded - 'A'];
Console.WriteLine($"H codes to {coded}, and {coded} codes to {decoded}");
```

```csharp exec
id: l-fade-step
// Lesson, your-turn-2 (pixel art): counting in 25s gives the same eleven numbers.
List<int> fade = new();
for (int value = 0; value <= 250; value += 25)
{
    fade.Add(value);
}
Console.WriteLine(string.Join(" ", fade));
Console.WriteLine(fade.Count);
```

```csharp exec
id: l-brightest-or-equal
// Lesson, your-turn-3 (pixel art): with >= the last 250 is kept, index 4.
int[] row = { 30, 90, 250, 120, 250, 60 };
int brightest = 0;
for (int index = 0; index < row.Length; index++)
{
    if (row[index] >= row[brightest])
    {
        brightest = index;
    }
}
Console.WriteLine(brightest);
```

```csharp exec
id: l-average-whole
// Lesson, your-turn-4 (pixel art): the total is 800; without the cast the average is 133.
int[] row = { 30, 90, 250, 120, 250, 60 };
int total = 0;
foreach (int value in row)
{
    total += value;
}
Console.WriteLine(total);
Console.WriteLine(total / row.Length);
Console.WriteLine($"{(double)total / row.Length:F1}");
```

```csharp exec
id: l-square-brackets
// Lesson, reading: C# accepts [1, 2, 3] as well as { 1, 2, 3 } for an array.
int[] withBraces = { 1, 2, 3 };
int[] withBrackets = [1, 2, 3];
Console.WriteLine(string.Join(", ", withBraces));
Console.WriteLine(string.Join(", ", withBrackets));
```

```csharp exec
id: l-challenge-starter
// Lesson, challenge: the starter compiles as it is.
// A rail-fence cipher: even indexes on the top rail, odd on the bottom.
string message = "MEETMEATNOON";
List<char> top = new();
List<char> bottom = new();
// Fill the two rails with a loop, then join them into one coded message.
// Can you get the message back from the coded one?
```

```csharp exec
id: l-challenge-answer
// Lesson, challenge: one answer, which codes and decodes.
string message = "MEETMEATNOON";
List<char> top = new();
List<char> bottom = new();
for (int index = 0; index < message.Length; index++)
{
    if (index % 2 == 0)
    {
        top.Add(message[index]);
    }
    else
    {
        bottom.Add(message[index]);
    }
}
string coded = string.Join("", top) + string.Join("", bottom);
Console.WriteLine(coded);

int half = (coded.Length + 1) / 2;    // the top rail has the extra letter when the length is odd
string decoded = "";
for (int index = 0; index < half; index++)
{
    decoded += coded[index];
    if (half + index < coded.Length)
    {
        decoded += coded[half + index];
    }
}
Console.WriteLine(decoded);
```

```csharp exec
id: p-which-element
// Practice 1: (a), (b), (c) and (e).
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[0]);
Console.WriteLine(numbers[2]);
Console.WriteLine(numbers[^1]);
Console.WriteLine(numbers.Length);
```

```csharp exec
id: p-index-5
expect: exception
// Practice 1 (d): numbers[5] stops with an IndexOutOfRangeException.
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[5]);
```

```csharp exec
id: p-index-minus-1
expect: exception
// Practice 1 (f): numbers[-1] gives warning CS0251, then the same exception.
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[-1]);
```

```csharp exec
id: p-ranges
// Practice 2: (a) to (f), and (d) is a new array.
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(string.Join(", ", numbers[1..3]));
Console.WriteLine(string.Join(", ", numbers[..2]));
Console.WriteLine(string.Join(", ", numbers[3..]));
int[] all = numbers[..];
Console.WriteLine(string.Join(", ", all));
Console.WriteLine(all == numbers);    // false: a different array
Console.WriteLine(string.Join(", ", numbers[^2..]));
Console.WriteLine(string.Join(", ", numbers[1..^1]));
```

```csharp exec
id: p-word-unchanged
// Practice 4: word is still NOON after newWord is made.
string word = "NOON";
string newWord = "M" + word[1..];
Console.WriteLine(word[1..]);
Console.WriteLine(newWord);
Console.WriteLine(word);
```

```csharp exec
id: p-golden-whole
// Practice 7: without (double), 1 and 2, then 1 every time.
int[] fibonacci = { 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };
for (int index = 1; index < fibonacci.Length; index++)
{
    Console.Write($"{fibonacci[index] / fibonacci[index - 1]} ");
}
Console.WriteLine();
Console.WriteLine((1 + Math.Sqrt(5)) / 2);
```

```csharp exec
id: p-reverse-copy
// Practice 8, second solution: numbers stays as it was.
int[] numbers = { 10, 20, 30, 40, 50 };
int[] result = numbers[..];
Array.Reverse(result);
Console.WriteLine(string.Join(", ", result));
Console.WriteLine(string.Join(", ", numbers));
```

```csharp exec
id: p-average
// Practice 10: the average is 18; the numbers above it.
int[] numbers = { 4, 8, 15, 16, 23, 42 };
int total = 0;
foreach (int number in numbers)
{
    total += number;
}
double average = (double)total / numbers.Length;
Console.WriteLine(average);
foreach (int number in numbers)
{
    if (number > average)
    {
        Console.Write($"{number} ");
    }
}
Console.WriteLine();
```

```csharp exec
id: p-most-count
// Practice 11: 3 appears three times.
int[] numbers = { 3, 7, 3, 9, 7, 3, 1 };
int count = 0;
foreach (int number in numbers)
{
    if (number == 3)
    {
        count++;
    }
}
Console.WriteLine(count);
```

```csharp exec
id: p-grows-with-count
// Practice 14, hint: with numbers.Count in the condition, the count grows with the index.
// Stopped after 6 passes here, because the real loop would not stop.
List<int> numbers = new() { 1, 2, 3 };
int passes = 0;
for (int index = 0; index < numbers.Count && passes < 6; index++)
{
    numbers.Add(numbers[index] * 10);
    passes++;
    Console.WriteLine($"index {index}, Count {numbers.Count}");
}
```

```csharp exec
id: p-vowel
// Practice 15: the solution gives vowel for E; "AEIOU".Contains(letter) gives the same answers.
foreach (char letter in new[] { 'T', 'E' })
{
    bool longWay = letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U';
    bool shortWay = "AEIOU".Contains(letter);
    Console.WriteLine($"{letter}: {longWay} {shortWay}");
}
```

```csharp exec
id: p-how-many-values
// Practice 16: the values number takes.
for (int number = 2; number < 20; number += 3)
{
    Console.Write($"{number} ");
}
Console.WriteLine();
```

```csharp exec
id: p-return-instead
// Practice 17: with static int and return, it prints 8 once.
static int DoubleAndPrint(int number)
{
    return number * 2;
}

int result = DoubleAndPrint(4);
Console.WriteLine(result);
```
