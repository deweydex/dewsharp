# putting-things-in-order: notes for a reviewer

Written from dewlab `tutorials/putting-things-in-order/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 21):
action *adapt*, shape *tutorial*, size L, batch 6, depends on
`finding-things`. The folder did not exist when the porter's run started,
so there was no partial draft to finish; both pages were written from the
start.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/putting-things-in-order/putting-things-in-order.md`
and `putting-things-in-order-practice.md`; their recorded outputs are the
two `*.outputs.json` files beside them, written by the browser checker;
and this file was the draft's `NOTES.md`. The three `*.native.json` files
were deleted: the browser checker's outputs files replace them. "What was
done when it moved", just below, says what changed in the move. The rest
of this file is the porter's, brought up to date (what the move made stale
is marked *(stale)* or rewritten), with the porter's questions settled
where the playbook, the course map, the style guide or the exemplars
answer them. What none of them answers is under "Open", at the end of the
questions.

Files:

- `putting-things-in-order.md`: the lesson, version `2026.09.27.1`. 14
  exec cells, 2 of them in world variants (13 on show in either world);
  3 predicts, 7 hints, 5 solutions, 5 `inputs` blocks, 1 challenge, 1 fold
  ("Why"), 3 fences to read (the spare-variable swap, the insertion-sort
  pseudocode, one compiler message), 1 table. Three cells are meant to
  fail: `your-turn-1` and `your-turn-2` (`expect: CS0103`, until the
  reader puts the lines in order) and `sorting-with-a-key-2`
  (`expect: CS0029`, the predict). One cell is empty on purpose
  (`comparing-our-sorts-2`, the reader's experiments). One cell warns on
  purpose, and the prose says so: `your-turn-4--pixel-art` (CS8321).
- `putting-things-in-order-practice.md`: the practice page, version
  `2026.09.28.1`, 20 problems. 16 exec cells, 2 of them in world variants
  (15 on show in either world); 3 predicts, 5 hints, 6 solutions,
  5 `inputs` blocks, 15 folds. One cell is meant to fail:
  `the-guard-goes-first-1` (`expect: exception`). No cell warns.
- `putting-things-in-order.outputs.json`,
  `putting-things-in-order-practice.outputs.json`: what the browser
  checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/putting-things-in-order.md`.

The counts are the parser's (`parseLesson`, with the page id), which
reports no errors on either page. No cell reads input, so no cell has
`stdin:` (dewlab's page read none either). No cell uses `Console.ReadKey`,
`Clear` or colours.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  putting-things-in-order` ran every cell, solution and `inputs` row of
  both pages in the real engine, in both worlds (21 runs for the lesson, 26
  for the practice page). On the draft as it came, every output, value,
  compiler message and exception was what the porter's notes quote from
  the native check: no difference in culture or number formatting (the
  practice page's doubles print as `49999.95`, `13.888874999999999`,
  `19.931568569324174` and `1.9931568569324174`, with a point, on the
  page's `en-IE` settings), in trimmed APIs (`ToArray`, `Keys.ToArray`,
  `Math.Log2`, `string.CompareOrdinal`, `Array.Sort` with a method), in
  how a value shows in the `inputs` table (`['H', 'W']`,
  `[[0, 0, 255], ...]`, `""`), or in the exception
  (`IndexOutOfRangeException`, one frame, line 6). Two things differed in
  what the record shows, and neither in what the code does:
  - The native check listed the scrambled cells' messages starting with
    syntax errors (CS1525, CS1002). The browser lists them by line and
    column, so the first is CS0103, `The name 'items' does not exist in
    the current context`, at (1,2) in `your-turn-1` and (1,1) in
    `your-turn-2`. The counts are the porter's: 20 errors and 2 warnings,
    and 21 and 2. The prose names no message, and says that most are
    names that do not exist, which holds (13 of the 20 and 12 of the 21
    are CS0103).
  - The checker records a program cell's run **with its `inputs`
    appended** (`tools/check-lessons.mjs` makes one run per cell), and
    the page's **Run** button runs the cell without them
    (`web/page/cell.js`: inputs go only to **Compare with a solution**).
    Practice 13's two starters have inputs that call `Score` and `Lit`,
    so their record had no warning, but a reader pressing Run saw CS8321
    (probes `p-starter-13-secret-messages` and `-pixel-art`, under
    "Probes"). The draft's "Run as it is, the cell shows a warning,
    CS8321" was true on the page and missing from the record. The fix is
    below.

  The porter's nine probes (at the end of this file) were run in the
  browser too, in a scratch lesson (`node tools/check-lessons.mjs
  --lessons <scratch>/lessons --write`). Each did what its comment says,
  with the output the porter's notes give: CS7036 at (13,19) for
  `p-brackets`, `-364189984` for `p-int-overflow`, `668` against `4950`
  for `p-challenge-answer`, `InvalidOperationException` (`Failed to
  compare two elements in the array.`) for `p-no-rule`, and 9, 11, 30 and
  45 comparisons for insertion sort in `p-experiments`, with 45 every time
  for the other two.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell, or no
  longer quoted:
  - Lesson, "Sorting by another rule": "It does not compile: the
    compiler's message, CS7036, says that a call to `ByLength` needs its
    two arguments" (probe `p-brackets` only) became a question: "Which
    method does the compiler's message name, and what does it say is
    missing?"
  - Lesson, the fold "Which rule does Array.Sort use for words?": "so
    `"apple"` comes before `"Banana"`" (probe `p-word-rules` only) went.
    The fold now points to `CompareTo` on [Searching], whose own fold makes
    the same point with the same two words.
  - Lesson, `your-turn-4--pixel-art`, the solution's note: "so it stops
    with an `InvalidOperationException`" (probe `p-no-rule` only) became
    "What do you think `Array.Sort(colours);` does, with no rule of your
    own? Can you try it?"
  - Lesson, after `comparing-our-sorts-3`: "The last count is then a
    number below zero" (probe `p-int-overflow` only) became "What is the
    last count now?", with the reason after it.
  - Lesson and practice 7: "for a part of 16 elements or fewer"
    (Microsoft's page; no cell) became "for a small part of the array".
    This settles the porter's question 6.
  - Lesson, the table: its counts are written as the cell prints them
    (`1000000`, `499999500000`), without the draft's thousands
    separators.
  - Lesson, `your-turn-4--secret-messages`, the solution's note: "three
    letters on" became "3 letters later in the alphabet", the recorded
    `3`.
  - Lesson, "Where to read more": "The video is four minutes long"
    (Polylog; dewlab's, never checked) went. YouTube answered the check on
    28 September 2026 with HTTP 429.
  - Practice 13, both worlds (the CS8321 point above): each starter now
    calls its method once, as `writing-your-own-functions` did for its
    stubs, so that a Run shows something and there is no CS8321. The
    secret-messages starter prints `Score {Score(best)}: {best}` (recorded
    `Score 0: `), and the pixel-art starter prints each row with
    `Lit(row)` beside it (`#..# 0` and so on). The two sentences about
    CS8321 went, and each task says what its last line prints. Run again
    in a scratch lesson with no inputs, as the Run button runs them, the
    new starters print the same as the record, with no diagnostics. The
    solutions print the same lines, so their notes' numbers are recorded
    now: `Score 12: THE ENEMY IS AT THE BRIDGE` and `The next best scores
    10`; `#### 4`, `#..# 2`, `#.#. 2`, `.... 0`.
  - Practice 17: "and the other 90" (no cell) became "as bubble sort did
    in problem 5, and the other makes twice as many"; "the difference is
    millionths of a second" (no cell) became "too small for anyone to
    notice".
  - Practice 20: "With `int[] saved = scores.ToArray();`, `saved` would
    keep `30, 10, 20`" (probe `p-sort-a-copy` only) became an invitation
    to make that change and run the cell again.
  - Lesson and practice 7: "n − 1 comparisons" on sorted data (probe
    `p-experiments` only) became "each element after the first is
    compared once, with the element before it".
- **Links** (decision 32, and the list of pages moving in this round).
  Every `lesson:` link goes to a page in `lessons/` or one on the list.
  New: [Searching] (`finding-things`: four on the lesson, and practice 12
  and 18), [Grids and references] (`grids-and-references`: the lesson,
  and practice 11 and 20), [Methods] (`writing-your-own-functions`, the
  secret-messages task), [Dictionaries] (`looking-things-up-by-name`,
  practice 19) and [Reusable methods] (`building-reusable-tools`, the
  lesson's ending). *Types and their sizes* stays in italics:
  `types-and-their-sizes` is not in `lessons/` and not on the list. The
  first run after the edit reported only the link to
  `building-reusable-tools`, which is on the list; by the final check that
  page had moved into `lessons/` too, and the check reported no problems.
  `finding-things` already links forward to this page
  ("[Sorting](lesson:putting-things-in-order) looks at the other side of
  the problem").
- **Visual Studio.** The lesson now says, before its closing links, that
  everything on the page runs in the browser and none of it needs Visual
  Studio, and that **Download project** saves a cell as a Visual Studio
  project, which prints the same there, in the words of
  `lists-and-sequences` and `looking-things-up-by-name`. It then ends with
  the exemplars' "Next, the practice page ... After it, ...".
- **Plain words.** Phrasal verbs and idioms: "gives it back" and "gives
  nothing back" (the predict's notes) became "returns it" and "returns
  nothing"; "leaves the loop at once" became "ends the loop there";
  "matters a lot" became "matters very much"; "at once" (twice), "anyway"
  (twice) and "by hand" (twice) went; "out of order", which can also mean
  "broken", became "not in order" and "shuffled like cards"; "the order
  they came in" became "the order they had at the start"; "settled" became
  "in their final places". *Stable* is now defined before *unstable* (the
  style guide: say what a thing is before what it is not). `long` is
  defined where it first appears, since the page it leans on, *Types and
  their sizes*, is not written yet. The pseudocode fence now has a
  sentence that names it, and merge sort is named as one of the faster
  sorts. Practice 10's fold now says what `&&` does ("If that side is
  `false`, the whole `&&` is `false`, and C# does not check the second
  side"), where the draft said C# "stops as soon as one side is `false`".
  `Brightness` is described without "weighs ... in thousandths". Shell
  sort's "say 4" went (no cell uses a gap of 4). The Computerphile note
  says "the way the work grows with the size of the data" for "the growth
  rate", and "the time each step takes" for "the constant factor".
- **Invitations.** The swap now asks "Which two numbers change places?"
  before its cell, and says after it that 20 and 40 did (recorded
  `10, 40, 30, 20, 50`). "Sorting by another rule" asks which word comes
  first by length before its cell. Practice 5's question moved above its
  cell, with "Can you guess, and then run the cell?". The two scrambled
  tasks now say that the last two lines are in place too, so that "the
  other six (nine) lines" is exact.
- **Meant to fail.** `sorting-with-a-key-2` now says before the cell
  "Whatever happens when you run it is meant to happen, and nothing is
  broken", as `lists-and-sequences` does for its predict on a cell meant
  to fail, so the predict keeps its point. After the cell it says "It did
  not compile, so nothing ran" (the style guide's words; the draft had
  "It does not compile, so nothing runs").
- **Where to read more.** On 28 September 2026 Microsoft's *Array.Sort
  Method* answered HTTP 200. Its remarks say "This method uses the
  introspective sort (introsort) algorithm as follows: If the partition
  size is less than or equal to 16 elements, it uses an insertion sort
  algorithm", then heapsort and quicksort, and "This implementation
  performs an unstable sort", as the lesson says. The note now calls the
  part *Remarks*, as `finding-things` does for its own Microsoft page.
  YouTube's oEmbed gives *15 Sorting Algorithms in 6 Minutes* by Timo
  Bingmann, *Getting Sorted & Big O Notation - Computerphile*, and *The
  Simplest Sorting Algorithm (You’ve Never Heard Of)* by Polylog. The
  watch pages answered HTTP 429, so the years and what each video says
  are the porter's and dewlab's, and were not checked.
- **The page, looked at.** Both pages were opened in headless Chromium on
  the real server (`launch()` from `tests/engine/helpers.mjs`), in both
  worlds, at 390 and 900 pixels wide: no errors in the console, no
  sideways scroll, no author errors, and every cell labelled PROGRAM except
  `comparing-our-sorts-2`, labelled EMPTY. The cells the prose describes
  were run on the page: see "Page behaviour, checked when it moved".
- **Version.** The practice page is `2026.09.28.1`, since problem 13's
  cells and solutions changed. The lesson keeps `2026.09.27.1`: no cell's
  code, solution or input changed, only the prose, the notes and the
  predict's option notes.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `putting-things-in-order: "Sorting: bubble, insertion and selection
  sort"` under `planned:`. The playbook's checklist says to delete it when
  the lesson moves; this move was told not to edit the course files.

## Frontmatter

- `title`: the course map's, "Sorting: bubble, insertion and selection
  sort". dewlab's was "Sorting a list: ...": the page now sorts arrays.
  The practice page is "Sorting: practice", as the other drafted practice
  pages are named.
- `from: putting-things-in-order`; the practice page has
  `from: putting-things-in-order-practice` and `practice_for`, as the other
  drafted practice pages do.
- `worlds`: dewlab's two, with dewlab's sentences (course map, PDP).
- `covers: [PDP-LO2, PDP-LO7]`, from the course map. dewlab's per-section
  `covers:` (MIT-6.8) is an outcome of the integrated course and goes.
- `year:` is dropped: the format has no such field.

## Links: decision 32 *(stale)*

*(stale: every page in the table below is now a link, except *Types and
their sizes*; see "Links" under "What was done when it moved". The
porter's question 10 is settled below.)*

`DECISIONS.md` 32 (added while this run was working) says a lesson names a
page that is not in `lessons/` yet by its short title, in italics, with no
link, and `docs/TRANSLATING.md`'s checklist says the same. Only
`first-steps` and `objects-and-classes` are in `lessons/`, and this page
links to neither. So every earlier page is named in italics. The task text
for this run said that links use `[text](lesson:<id>)`; I read that as the
form a link takes, and decision 32 as which pages get one. The one link is
to this page's own practice page, which is written with it and moves into
`lessons/` with it (batch rule 1), as the exemplar `first-steps` links to
its own. If the reviewer reads decision 32 as covering that link too, it
becomes "the practice page, *Sorting: practice*".

| Where | Italic name now | Link to make when that page is in `lessons/` | That page's batch |
|---|---|---|---|
| lesson, opening; "Sorting by another rule" (twice, one in the fold); "Comparing our sorts" | *Searching* | `lesson:finding-things` | 5 |
| lesson, after `sorting-with-a-key-2`; practice 11 and 20 | *Grids and references* | `lesson:grids-and-references` | 4 |
| lesson, secret-messages your turn | *Methods* | `lesson:writing-your-own-functions` | 3 |
| lesson, after `comparing-our-sorts-3` | *Types and their sizes* | `lesson:types-and-their-sizes` | 2 |
| lesson, "Looking back" | *Reusable methods* (the next page) | `lesson:building-reusable-tools` | 7 |
| practice 12 hint, 18 | *Searching* | `lesson:finding-things` | 5 |
| practice 19 | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |

Forward links that point here, for whoever merges (batch rule 3):
`finding-things` ends with "The next page, Sorting: bubble, insertion and
selection sort, looks at the other side of the problem." in plain text.
Under decision 32 that becomes *Sorting*, and a link once this page is in
`lessons/`.

dewlab's links go with what they pointed to: `comprehensions-and-grids`
(its `generate_sequence` and its "change or return a new list") now points
to *Grids and references* for reference types; the Python HOWTO goes.

## What changed, and why

### What the reader already knows

PDP's order puts this page after `finding-things` (page 20). Drafted pages
it leans on:

- `finding-things`: `string.CompareOrdinal` and its below zero / zero /
  above zero answer, which is exactly the contract of a comparison method,
  so the "rule of your own" section is built on it; O(n) and O(log n);
  `Array.IndexOf` and `Array.BinarySearch` as methods of `Array`;
  `new int[0]` for an empty array; `(low + high) / 2`.
- `grids-and-references`: an array is a reference type, a method that
  changes an array it was given changes the caller's, and `ToArray()`
  makes a copy.
- `writing-your-own-functions`: `static` methods in a program cell,
  `void`, CS0029 for `int a = DoubleAndPrint(5);`, and a method without
  `static` that uses a top-level variable (`WithDiscount`); its practice
  page defines *tuple*.
- `lists-and-sequences`: ranges and `^1`, `List<T>`, `string.Join`,
  `IndexOutOfRangeException`.
- `looking-things-up-by-name`: `Dictionary<char, int>`, `.Keys`,
  `KeyValuePair`, and "a dictionary does not promise any order".
- `repeating-yourself`: `i--`, nested loops. `a-program-of-your-own` and
  `reading-input`: `break` in a `switch` (practice 6's hint explains
  `break` for a loop).

New here: *tuple* (defined again in the lesson, since the practice page
that defines it may have been skipped), passing a method's name to another
method, *stable* and *unstable*, `List<T>.Sort`, `long` (named, taught on
*Types and their sizes*), *flag*, *guard*, *recursion*, *stack overflow*.
*(stale: `long` is now defined in one sentence where it first appears,
since *Types and their sizes* is not written yet.)*

### The lesson, section by section

**Opening (`sorted-in-one-line-1`).** dewlab's `sorted()` becomes
`Array.Sort`, which sorts in place, so the cell prints the arrays after
the call. The predict and its point are dewlab's ("10, 100, 9"). A new
paragraph says that `Array.Sort` changes the array it is given, which the
`void` predict later relies on.

**The swap (`the-swap-1`).** C# has the same one-line swap with tuples,
`(numbers[1], numbers[3]) = (numbers[3], numbers[1]);`. "Right-hand side"
became "the tuple after the `=`" (the style guide's checklist forbids the
word *right*). The spare-variable version is now code to read, where
dewlab gave it in the prose.

**Bubble sort.** Both cells keep their tasks and ids. The second cell now
prints each pass's comparisons as well as its swaps, so that "6, then 5,
... 21 in total" in the prose is recorded output (decision 29). Its ranges
use a variable, `settledFrom`, because `data[..stillToCheck - 1]` parses
as `(..stillToCheck) - 1` in C# (the range operator binds tighter than
`-`). *Pass* is now defined.

**Your turn 1 and 2 (lines out of order).** The course map says
`your-turn-1` stays. In C#, braces carry the structure that indentation
carries in Python, so the braces are fixed in their places and only the
statement lines are shuffled, in dewlab's shuffled order, each placed at
the indentation of the slot it lands in. The reader moves six (then nine)
lines. dewlab's hint "The indentation tells you which line belongs inside
which" becomes prose: in C#, the braces show it, and the indentation is for
people. As shuffled, each cell does not compile (22 and 23 messages
natively), so each has `expect: CS0103` and the prose says before the cell
that it is meant to fail and that the messages need not be read. Two hints
each (a question after 1 error, more after 3). The methods return
`int[]`, the array they sorted, as dewlab's returned the list, so that the
`inputs` table can show the result. See open question 2.

**Selection sort (`your-turn-3`).** The same broken method and the same
three inputs; the recorded values show `[2, 1, 3]` and `[2, 1, 3, 4]` for
the reader's first run. The hint defines *trace*.

**Sorting by another rule** (dewlab: "Sorting with a key"). C# has no
`key=`. The nearest thing a PDP reader can use without a lambda is a
comparison method passed by name: `Array.Sort(words, ByLength)`, where
`ByLength` returns below zero, 0 or above zero, the same contract as
`string.CompareOrdinal` from the page before. This is "a method passed to a
method", which the course map ties to open question 5 (lambdas in PDP). No
lambda appears anywhere on either page. See open question 1.

- `sorting-with-a-key-1` keeps its words and its two rules (by length, by
  last letter, with `first[^1] - second[^1]`). An invitation to write
  `ByLength()` shows CS7036 (probe `p-brackets`). *(stale: the prose now
  asks what the message names, and quotes no code.)*
- dewlab's "Words with the same length keep the order they came in" is not
  true of `Array.Sort` in general. Microsoft's page says it is unstable
  (fetched 27 September 2026), and probe `p-unstable` shows equal-length
  words changing places in an array of 20. On this five-word array OWL does
  stay before BAT, because .NET uses an insertion sort for 16 elements or
  fewer. The prose says so without promising it, and defines *stable* and
  *unstable*.
- A new fold, "Which rule does Array.Sort use for words?", ties the page
  back to the searching page's own fold: `Array.Sort` on strings uses the
  language rules, `CompareOrdinal` does not, and
  `Array.Sort(words, string.CompareOrdinal)` sorts in the order that binary
  search expects (probe `p-word-rules`).
- `sorting-with-a-key-2`: dewlab's `None` surprise becomes a compiler
  error, as the course map says: `List<int> result = numbers.Sort();` is
  CS0029, with `List<int>` written out (PDP writes every type; no `var`).
  The predict's three options keep dewlab's two ideas and add "does not
  compile". The paragraph after it names `void`, points to reference types,
  and shows how to sort a copy (probe `p-sort-a-copy`).

**Your turn 4.** Both worlds keep their task and data.

- Secret messages: `counts` is a `Dictionary<char, int>`, and the reader
  writes `MoreOftenFirst`, a method with no `static` that uses `counts`,
  as dewlab's `how_often` used a global. `counts.Keys.ToArray()` makes the
  array to sort. The `inputs` row is `byCount[..2]` (dewlab: `[:3]`),
  because the third place is a tie (K and L, 3 each). The solution prints
  the two letter distances, so "three letters on" is recorded.
- Pixel art: dewlab's `brightness` returned a `float`. A comparison method
  must return an `int`, and a `double` difference would need a cast that
  turns 0.5 into 0, so `Brightness` works in thousandths with whole
  numbers (299, 587, 114). The order is dewlab's: blue, red, grey, green,
  yellow. The starter warns CS8321 (nothing calls `Brightness`), and the
  prose says so. dewlab's note ("without `key=`, `sorted()` compares the
  lists element by element") becomes C#'s behaviour: with no rule,
  `Array.Sort` on arrays stops with `InvalidOperationException` (probe
  `p-no-rule`). *(stale: the note now asks the reader to try it.)*

**Comparing our sorts.** `comparing-our-sorts-1` keeps its sizes and
predict (the page's third); `list(range(size, 0, -1))` becomes a loop that
fills a `new int[size]`, and the copy is `items.ToArray()`. A new cell,
`comparing-our-sorts-3`, prints the formula's counts for the table's three
sizes and `int.MaxValue`, so that the table's numbers are recorded (dewlab
rounded them to "about 500,000" and "500,000,000,000"; the table now gives
the exact counts). It uses `long`, and invites the reader to try `int`,
which prints a number below zero for a million (probe `p-int-overflow`):
C#'s whole-number arithmetic wraps without a message, which is one of the
things the course map says C# adds. "Python's own `sorted()` is built on
the same idea" becomes what Microsoft's page says about `Array.Sort`: three
sorts inside it, and an insertion sort for 16 elements or fewer. *(stale:
"for a small part of the array" now, with no number.)*
`comparing-our-sorts-2` stays an empty cell, with a comment that says what
to copy into it (each Run starts a new program). Probe `p-experiments` is
one answer.

**Looking back.** dewlab's question stays; its claims are backed by probe
`p-experiments` (insertion sort: 9 comparisons on 10 items in order, 11 on
an array nearly in order; bubble and selection sort: 45 every time). The
Shell sort challenge stays, with `// 2` as `/ 2`; probes
`p-challenge-starter` and `p-challenge-answer` show that the starter runs
and that the task can be done (668 comparisons against insertion sort's
4950 on 100 items in reverse order). The next page is named in italics.
*(stale: it is a link now, after the paragraph on Visual Studio.)*

**Where to read more.** Bingmann and Polylog: titles and authors checked
through YouTube's oEmbed on 27 September 2026; the years and Polylog's
length (four minutes) are dewlab's and were not checked. *(stale: the
length went from the page.)* Computerphile is
dewlab's and is also cited by the searching page. The Python HOWTO becomes
Microsoft's *Array.Sort Method* page (fetched the same day: its remarks
name introsort with insertion sort, heapsort and quicksort, and say "This
implementation performs an unstable sort"). dewlab's "It looks wrong, but
it sorts" became "It looks as if it cannot work, but it sorts" (no
*wrong*).

### Predicts

Three in the lesson, as in dewlab's two plus one: the opening (strings),
`sorting-with-a-key-2` (CS0029), and `comparing-our-sorts-1` (the size
doubles). The third is new; dewlab asked the same question in the prose.
Three on the practice page: problems 18, 19 and 20, all "from earlier",
as dewlab's were.

### The practice page

dewlab's problems, in dewlab's order:

| dewlab | Here | What changed |
|---|---|---|
| 1. One pass | 1 (`one-pass-1`) | `{ 5, 1, 4, 2, 8 }`, prints after each swap. |
| 2. How many passes | 2, with a new cell `how-many-passes-1` | The cell prints the array after each of the four passes, so the fold's numbers are recorded (decision 29). The problem asks for a trace first. |
| 3. Insertion, traced | 3, with a new cell `insertion-traced-1` | The cell prints the sorted part after each element is placed. The fold explains why the second 1 lands after the first (the `while` stops at an element that is not larger), defines *stable*, and says that `Array.Sort` is not, pointing to problem 12. |
| 4. Selection, traced | 4, with a new cell `selection-traced-1` | Prints the array after the swap for each place; place 3 swaps 25 with itself, which the fold now says. |
| 5. Counting comparisons | 5 (`counting-comparisons-1`) | Loops fill the arrays; the copy is `ToArray()`. 45 and 190 both ways. |
| 6. Stop when it is sorted | 6 (`stop-when-it-is-sorted-1`) | `bool swapped`, `break;`. The inputs are written-out arrays. The hint explains `break` for a loop. |
| 7. Best and worst on sorted data | 7 | Adds that `Array.Sort` itself uses insertion sort for small parts (Microsoft's page). |
| 8. A million items | 8, with a new cell `a-million-items-1` | A starter with `long`; the solution calculates n(n − 1)/2, the seconds and hours, log₂ n, n log n and its seconds, so every number in the note is recorded. |
| 9. Selection sort from nothing | 9 (`selection-sort-from-nothing-1`) | Returns a copy made with `ToArray()`. A fourth `inputs` row, `data`, shows whether the caller's array stayed as it was. |
| 10. The guard goes first | 10, with a new cell `the-guard-goes-first-1` | In Python the swapped guard read `items[-1]` quietly; in C# it stops with `IndexOutOfRangeException` at line 6. The cell shows it (`expect: exception`), and the fold says why C#'s behaviour helps. |
| 11. Why copy | 11 | `int[] copy = items.ToArray();`; reference types; points to problem 20. |
| 12. Length, then letters | 12 (`length-then-letters-1`) | dewlab's first solution sorted twice and relied on a stable sort; `Array.Sort` is not stable, so the one solution is a comparison method that compares lengths and then `CompareOrdinal`. That is dewlab's second tier (the tuple key) without a lambda. The note describes the sort-twice way, for a stable sort. |
| 13. The best first | 13, both worlds | `Score` and `Lit` as dewlab's. The reader also writes the comparison method (`HigherScoreFirst`, `MoreLitFirst`) and the `Array.Sort` line. `"ETAOIN".Contains(letter)` replaces `in`. Both starters warn CS8321, and the prose says so. The pixel-art stub prints the rows as a picture. The secret-messages solution prints the two best scores (12, then 10). *(stale: the starters now call their method once, so neither warns; the rows print with their counts, and the secret-messages lines are `Score 12: ...` and `The next best scores 10`.)* |
| 14. A function that calls itself | 14 (`a-function-that-calls-itself-1`, id kept) | "A method that calls itself". The fold names a *stack overflow* in place of `RecursionError`. No cell shows one: in .NET it ends the program and cannot be caught, and the native check runs cells in its own process (course map, open question 10). |
| 15. Better than n log n | 15 | Unchanged. |
| 16. One more item | 16 | Array or list: an array needs a new array one longer; `List<int>.Insert` moves the elements after the index. "About 20" points to problem 8's `Math.Log2`. |
| 17. Correct, and slower | 17. The same answers, more work | Retitled and reworded with no *correct*, *right* or *wrong* (style guide). "Students" became "learners". The second sort makes "twice as many" comparisons, not 90, since no cell prints 90. |
| 18. From earlier: at most how many looks | 18 | The cell now prints what is left after each look, and the predict asks about the last line, so the fold's halvings are recorded. |
| 19. From earlier: a loop over a dictionary | 19 | In C# a `foreach` over a dictionary gives `KeyValuePair` values, so the cell prints each pair, and the answer is `[B, W]`, not `B`. The predict's options are dewlab's three. |
| 20. From earlier: nothing back | 20. From earlier: two names for one array (`from-earlier-two-names-for-one-array-1`, new id) | dewlab's problem (`append` returns `None`) is CS0029 in C#, which the lesson's own predict already shows with `Sort`, and which `lists-and-sequences-practice` 17 shows with `void`. A third copy teaches nothing new. The new problem sorts `scores` and prints `saved`, a second name for it, which is the reference-type point that problem 11 asks about. See open question 5. |

### The glossary file

dewsharp has no glossary panel, so each term is defined in the prose where
it first appears.

| dewlab entry | Here |
|---|---|
| swap | *swapping*, "The swap"; *tuple* defined beside it |
| bubble sort | "Bubble sort: let things rise"; *pass* defined there too |
| `sorted()`, `key=` | `Array.Sort` (opening) and a rule of your own passed by name ("Sorting by another rule") |
| `.sort()` | `List<int>`'s `Sort`, and `void` (`sorting-with-a-key-2`) |
| insertion sort | "Insertion sort: sort like you sort cards" |
| selection sort | "Selection sort: find the smallest" |
| O(n^2) | "Comparing our sorts" |

New terms, each defined where it first appears: *tuple*, *pass*,
*trace* (lesson hint; practice introduction), *unstable* and *stable*
(lesson; practice 3), *flag* (practice 6 hint), *guard* (practice 10),
*recursion* and *stack overflow* (practice 14).

## What C# made different, in short

- `Array.Sort` and `List<T>.Sort` sort in place and return nothing. There
  is no `sorted()`; a copy is `ToArray()`.
- dewlab's `None` from `.sort()` is a compiler error: CS0029, `void` to
  `List<int>`.
- No `key=`. A rule is a method with two parameters that returns below
  zero, 0 or above zero, passed by name, which is the contract the reader
  already met in `string.CompareOrdinal`. A brightness in `double` does not
  fit that contract without care, so the pixel world works in whole
  thousandths.
- `Array.Sort` is not stable, so dewlab's "same length keeps its order"
  and its sort-twice solution change.
- Braces, not indentation, carry the structure, which changes how the two
  "lines out of order" tasks are laid out.
- A negative index is an exception in C#, so the swapped guard is a cell
  that stops, where Python read the last element.
- The count of comparisons for a million items is larger than an `int`,
  and `int` arithmetic wraps without a message.
- A `foreach` over a dictionary gives pairs, not keys.

## Where each number and message in the prose comes from

Brought up to date when the lesson moved. Every source is the browser
checker's `lessons/putting-things-in-order/<page>.outputs.json`; a shared
cell below the worlds is recorded once per world (`<id>@<world>`), with
the same output in both. A line and column count from the top of the
cell, as the page shows them (`Program.cs(2,20)`).

| Number or claim | Source |
|---|---|
| 9, 10, 100 and 10, 100, 9 | lesson cell `sorted-in-one-line-1` |
| 20 and 40 change places | lesson cell `the-swap-1` (`10, 40, 30, 20, 50`) |
| 64 reaches 90 in one pass | lesson cell `bubble-sort-let-things-rise-1` |
| 6, then 5, ... 1; 21 in total; the last pass swaps nothing | lesson cell `bubble-sort-let-things-rise-2` |
| the scrambled cells do not compile; most messages are names that do not exist | lesson cells `your-turn-1` (13 of 20 errors CS0103), `your-turn-2` (12 of 21) |
| `[2, 1, 3]` for `{ 3, 1, 2 }`; `{ 5, 4, 3, 2, 1 }` sorted anyway | lesson cell `your-turn-3`, its `inputs` |
| OWL before BAT | lesson cell `sorting-with-a-key-1` |
| `Array.Sort` is unstable; three sorts inside it; insertion sort for a small part | Microsoft's *Array.Sort Method*, *Remarks* (a sourced fact, not output; checked 28 September 2026). Probe `p-unstable` shows it happen. |
| CS0029 and its message, `Program.cs(2,20)` | lesson cell `sorting-with-a-key-2` |
| H, then W; 3 letters later | solution of `your-turn-4--secret-messages` |
| CS8321 on the pixel-art starter | lesson cell `your-turn-4--pixel-art` (at (1,12)) |
| blue, red, grey, green, yellow | solution of `your-turn-4--pixel-art` |
| 4950 and 19900 | lesson cell `comparing-our-sorts-1@<world>` |
| 2147483647; 45, 499500, 499999500000 | lesson cell `comparing-our-sorts-3@<world>` |
| practice 1: `1, 4, 2, 5, 8`, three swaps | practice cell `one-pass-1` |
| practice 2: two passes; `1, 2, 4, 5, 8`; four passes | practice cell `how-many-passes-1` |
| practice 3: the sorted parts | practice cell `insertion-traced-1` |
| practice 4: places 0 to 3 | practice cell `selection-traced-1` |
| practice 5: 45, 190; about four times | practice cell `counting-comparisons-1` (780, 3160) |
| practice 6: 9, not 45; reversed unchanged | solution of `stop-when-it-is-sorted-1` and its `inputs` |
| practice 8: 499999500000; 49999.95 s; almost fourteen hours; about 20; about twenty million; about two seconds | solution of `a-million-items-1` (`13.888874999999999` hours, `19.931568569324174`, `19931568.569324173`, `1.9931568569324174`) |
| practice 9: `data` unchanged | solution of `selection-sort-from-nothing-1`, its `inputs` |
| practice 10: `IndexOutOfRangeException` at line 6 | practice cell `the-guard-goes-first-1` |
| practice 13: 12, then 10 | solution of `the-best-first-1--secret-messages` (`Score 12: ...`, `The next best scores 10`) |
| practice 13: `####`, `#..#`, `#.#.`, `....`; 2 lit | solution of `the-best-first-1--pixel-art` (`#..# 2`, `#.#. 2`) |
| practice 16: about 20 | practice 8's solution (`Math.Log2`) |
| practice 17: 45 | practice 5 |
| practice 18: 32, 16, 8, 4, 2, 1, 0; 7 | practice cell `from-earlier-at-most-how-many-looks-1@<world>` |
| practice 19: `[B, W]` | practice cell `from-earlier-a-loop-over-a-dictionary-1@<world>` |
| practice 20: `10, 20, 30` | practice cell `from-earlier-two-names-for-one-array-1@<world>` |
| E is the most common letter, then T; 2ᵏ and n!; n − 1 passes; n(n − 1)/2 | carried over from dewlab; facts and formulas, not program output |

No longer in the prose, since no cell printed them: CS7036 (a question
now), "apple" before "Banana" (the fold points to [Searching]),
`InvalidOperationException` (a question now), the count below zero with
`int` (a question now), "16 elements or fewer", "n − 1 comparisons" on
sorted data, 90 comparisons, "millionths of a second", `30, 10, 20` with
`ToArray()` (an invitation now), and Polylog's four minutes.

## Page behaviour, checked when it moved

The porter listed these for "once the page UI exists". Each was looked at
in headless Chromium on the real server.

- **The scrambled cells.** `your-turn-1` on the page: "Did not compile,
  so nothing ran.", then the first 20 messages, from
  `Program.cs(1,2): error CS0103: The name 'items' does not exist in the
  current context`, then "And 2 more. Read the first message first: one
  mistake can cause several messages." (`drawDiagnostics` in
  `web/page/cell.js` shows 20; `your-turn-2`'s 23 give "And 3 more".) The
  prose says there are many and that they need not all be read, which
  fits. The page has no "meant to fail" signal of its own: nothing in
  `web/page/` reads `expect:`, which only the checker uses. So the
  sentence before each cell is the reader's signal, and both cells have
  one.
- **`expect:` on a cell the reader edits.** For the same reason, a
  reader's cell that compiles is simply "Ran.", and the page shows
  nothing about `expect:`.
- **An empty cell.** `comparing-our-sorts-2` is labelled EMPTY, with Run,
  Reset and Download project.
- **The `inputs` table.** The recorded displays are the native ones:
  `['H', 'W']` for a `char[]`, `[[0, 0, 255], ...]` for an `int[][]`,
  `""` for an empty string.
- **The exception line.** `the-guard-goes-first-1` on the page: "Stopped
  with an exception on line 6 of Program.cs.", then `Unhandled exception.
  System.IndexOutOfRangeException: Index was outside the bounds of the
  array.` and `at line 6 of Program.cs`, one frame, with the fold *What
  .NET said, in full*. Practice 10's fold says line 6.
- **CS8321 warnings.** Only `your-turn-4--pixel-art` warns now. On the
  page it says "Ran." with `Program.cs(1,12): warning CS8321: The local
  function 'Brightness' is declared but never used` under it, as the
  prose says. Practice 13's new starters say "Ran." with no message.
- **Number predict on a cell with several lines.** Practice 18's last line
  is `7`, and decision 37 compares a number guess with the last number the
  program printed, which is that `7`.
- **Cells recorded per world.** The shared cells below the world variants
  (`comparing-our-sorts-*`, practice 14 and 18 to 20) are recorded once
  per world, with the same output in both.

## The porter's questions, and what was decided

1. **A method passed to a method, in PDP:** open (below).
2. **Lines out of order, with braces.** *Decided by the course map*
   ("`your-turn-1` (lines in the wrong order) stays") *and the style
   guide's* "Mistakes on purpose" (`#how-a-page-teaches`), with decision
   27's reason for a task that starts out not compiling: the compiler's
   message is the first feedback. The cell and the braces stay as the
   porter laid them out. On the page the reader sees "Did not compile",
   the first 20 messages, and "Read the first message first", and the
   prose says before the cell that it is meant to fail and that the
   messages need not all be read. The other form (a stub that compiles,
   with the lines in prose) would be a different task, and the course map
   keeps this one.
3. **Long cells.** *Decided by the style guide's* `#code`, as
   `grids-and-references` decided its question 3: the test for splitting a
   cell is "a cell with two ideas in it wants to be two cells", and each of
   these has one (one pass shown in full; one sort to put in order; one
   sort to count). Most of their length is braces on lines of their own,
   which `#code` asks for. The split the porter suggests, the counted sort
   in its own cell above the loop, cannot work on a PDP page: a method
   written in a program cell stays in that cell (rule 1), and only a type
   carries down, which PDP meets on `building-reusable-tools`. They stay.
4. **New cells on the practice page** (problems 2, 3, 4 and 8). *Decided
   by decision 29:* a number the prose needs is printed by a cell. Each
   problem asks for the trace or the estimate before the cell. They stay.
5. **Practice 20 is new.** *Decided by the course map:* the practice page
   has "its dewlab problems in C#, with two or three from earlier pages",
   and the course map's "What stays" says the same. dewlab's problem 20
   (`append` returns nothing) is, in C#, the CS0029 that this page's own
   lesson teaches with `Sort` (`sorting-with-a-key-2`), so it would not be
   a problem "from earlier". Its replacement comes from
   [Grids and references], an earlier page, and it stays.
6. **A sourced number that no cell prints** ("16 elements or fewer").
   *Decided by `CLAUDE.md`,* "Every number is run": the number went from
   both pages, which now say "for a small part of the array". The reading
   list sends the reader to Microsoft's *Remarks*, which give it.
7. **`ToArray()` is LINQ.** *Decided by `docs/LESSON_FORMAT.md`* (the
   compiler settings include the implicit `using System.Linq;`, on the page
   and in a downloaded project) *and the course map* ("`row.ToArray()`
   makes a copy"), as `grids-and-references` decided its question 2. It
   stays.
8. **Subtraction as a comparison:** open (below).
9. **`long` and wrapping** lean on *Types and their sizes*: open (below),
   as a check for whoever writes that page. This page now defines `long`
   where it first appears, so it does not depend on that page.
10. **Links.** *Decided by decision 32 and the list of pages moving in
    this round:* a page in `lessons/` or on the list gets a link, and any
    other page its short title in italics. See "Links" under "What was done
    when it moved".

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **A method passed to a method, in PDP** (the porter's question 1; the
  course map's open question 5). The page passes a *named* method to
  `Array.Sort` (`Array.Sort(words, ByLength)`), with no lambda, in the
  lesson (`sorting-with-a-key-1`, `your-turn-4` in both worlds) and on the
  practice page (12 and 13). It rests on the below zero / zero / above
  zero contract the reader met with `string.CompareOrdinal`, and dewlab's
  PDP page did the same in Python (`key=len`). The course map lets this
  section be "reworked or cut, by the lambda decision", and its open
  question 5 offers "show it once as code to read, or leave it all to the
  extra `asking-a-list-a-question`". Named methods are a third choice.
  Cutting would remove "Sorting by another rule", `your-turn-4` and
  practice 12 and 13; showing a lambda would add one line of code to
  read.
- **Subtraction as a comparison** (the porter's question 8).
  `first.Length - second.Length` and `counts[second] - counts[first]` are
  safe for these small numbers, and they show the contract plainly. With
  very large `int` values a subtraction can wrap (this page shows wrapping
  a few sections later), which is why .NET code often writes
  `first.CompareTo(second)`. Say so on this page, or leave it for
  [Reusable methods]'s edge cases?
- **`long` and wrapping on *Types and their sizes*** (the porter's
  question 9). That page is not written. Whoever writes it should teach
  `long` and `int.MaxValue`, and describe what happens past the largest
  `int` in words that agree with this page ("C# does not stop the
  program. It continues from the smallest `int`").
- **Two videos not checked.** YouTube refused the watch pages (HTTP 429)
  on 28 September 2026, so the Computerphile note ("why the way the work
  grows ... matters more than the time each step takes") and the Polylog
  note ("two loops and one swap") are dewlab's descriptions, and the
  years are dewlab's. Someone with the videos to hand could confirm them.

## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.

When the lesson moved, all nine were run in the browser, in a scratch
lesson (a copy of this section under a frontmatter, `node
tools/check-lessons.mjs --lessons <scratch>/lessons --write`). Each did what
its comment says, with the same output as natively (see "The browser run",
above). Two more were run beside them and are not kept here, since they
were copies of page cells: `p-starter-13-secret-messages` and
`p-starter-13-pixel-art`, the draft's practice 13 starters with no inputs,
as the Run button runs them. Each ran with CS8321 (at (19,12) for `Score`,
(1,12) for `Lit`), which the page's record did not show. The same copies of
the new starters print what the record shows (`Score 0: `, and the four
rows with `0`), with no diagnostics. Most of the claims below are no longer
in the prose: "Where each number and message in the prose comes from"
says which.

```csharp exec
id: p-brackets
expect: CS7036
// Lesson, "Sorting by another rule": with brackets after ByLength, the cell does not compile (CS7036).
static int ByLength(string first, string second)
{
    return first.Length - second.Length;
}

static int ByLastLetter(string first, string second)
{
    return first[^1] - second[^1];
}

string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
Array.Sort(words, ByLength());
Console.WriteLine(string.Join(", ", words));
Array.Sort(words, ByLastLetter);
Console.WriteLine(string.Join(", ", words));
```

```csharp exec
id: p-unstable
// Lesson, "Sorting by another rule": Array.Sort is not stable. With more than 16 elements,
// words of the same length do not keep the order they came in.
static int ByLength(string first, string second)
{
    return first.Length - second.Length;
}

string[] words =
{
    "AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST",
    "UV", "WX", "A", "B", "C", "D", "E", "F", "G", "H"
};
Array.Sort(words, ByLength);
Console.WriteLine(string.Join(", ", words));
```

```csharp exec
id: p-word-rules
// Lesson, fold "Which rule does Array.Sort use for words?": language rules put "apple" before "Banana";
// string.CompareOrdinal as the rule puts every capital first.
string[] words = { "apple", "Banana", "cherry" };
Array.Sort(words);
Console.WriteLine(string.Join(", ", words));
Array.Sort(words, string.CompareOrdinal);
Console.WriteLine(string.Join(", ", words));
string[] capitals = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
string[] ordinal = capitals.ToArray();
Array.Sort(capitals);
Array.Sort(ordinal, string.CompareOrdinal);
Console.WriteLine(string.Join(", ", capitals));
Console.WriteLine(string.Join(", ", ordinal));
```

```csharp exec
id: p-sort-a-copy
// Lesson, after sorting-with-a-key-2: sorting a copy made with ToArray() keeps the old order too.
int[] numbers = { 3, 1, 2 };
int[] sorted = numbers.ToArray();
Array.Sort(sorted);
Console.WriteLine(string.Join(", ", numbers));
Console.WriteLine(string.Join(", ", sorted));

// Practice 20, fold: with ToArray(), saved keeps 30, 10, 20.
int[] scores = { 30, 10, 20 };
int[] saved = scores.ToArray();
Array.Sort(scores);
Console.WriteLine(string.Join(", ", saved));
```

```csharp exec
id: p-no-rule
expect: exception
// Lesson, your-turn-4 (pixel art), solution note: with no rule, Array.Sort cannot compare two arrays.
int[][] colours =
{
    new int[] { 255, 0, 0 },
    new int[] { 0, 255, 0 },
    new int[] { 0, 0, 255 },
};
Array.Sort(colours);
```

```csharp exec
id: p-int-overflow
// Lesson, comparing-our-sorts-3 with int in place of long: the last count is below zero.
Console.WriteLine($"The largest int: {int.MaxValue}");
int[] sizes = { 10, 1000, 1000000 };
foreach (int size in sizes)
{
    Console.WriteLine($"{size} items: {size * (size - 1) / 2} comparisons");
}
```

```csharp exec
id: p-experiments
// Lesson, comparing-our-sorts-2 (one answer), "Looking back" and practice 7: insertion sort makes n - 1
// comparisons on an array in order; selection sort always makes n(n - 1)/2; so does bubble sort.
static int InsertionCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int i = 1; i < copy.Length; i++)
    {
        int current = copy[i];
        int j = i - 1;
        while (j >= 0)
        {
            comparisons++;
            if (copy[j] <= current)
            {
                break;
            }
            copy[j + 1] = copy[j];
            j--;
        }
        copy[j + 1] = current;
    }
    return comparisons;
}

static int SelectionCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int i = 0; i < copy.Length - 1; i++)
    {
        int smallest = i;
        for (int j = i + 1; j < copy.Length; j++)
        {
            comparisons++;
            if (copy[j] < copy[smallest])
            {
                smallest = j;
            }
        }
        (copy[i], copy[smallest]) = (copy[smallest], copy[i]);
    }
    return comparisons;
}

static int BubbleSortCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int pass = 0; pass < copy.Length - 1; pass++)
    {
        for (int i = 0; i < copy.Length - 1 - pass; i++)
        {
            comparisons++;
            if (copy[i] > copy[i + 1])
            {
                (copy[i], copy[i + 1]) = (copy[i + 1], copy[i]);
            }
        }
    }
    return comparisons;
}

int[] inOrder = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
int[] reversed = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
int[] noOrder = { 4, 9, 1, 7, 3, 10, 6, 2, 8, 5 };
int[] nearlyInOrder = { 1, 2, 3, 5, 4, 6, 7, 8, 10, 9 };
foreach (int[] data in new int[][] { inOrder, nearlyInOrder, noOrder, reversed })
{
    Console.WriteLine($"{string.Join(" ", data)}: bubble {BubbleSortCounted(data)}, insertion {InsertionCounted(data)}, selection {SelectionCounted(data)}");
}
```

```csharp exec
id: p-challenge-starter
// Lesson, challenge: the starter compiles and runs as it is (it prints the array unsorted).
// Shell sort: insertion sort on elements gap places apart, for smaller and smaller gaps.
static int[] ShellSort(int[] items)
{
    int gap = items.Length / 2;
    while (gap > 0)
    {
        // An insertion sort, where "the element before" is gap places back.
        gap = gap / 2;
    }
    return items;
}

int[] numbers = { 64, 34, 25, 12, 22, 11, 90 };
Console.WriteLine(string.Join(", ", ShellSort(numbers)));
```

```csharp exec
id: p-challenge-answer
// Lesson, challenge: one answer, with comparisons counted against insertion sort on 100 items in reverse order.
static int ShellSortCounted(int[] items)
{
    int comparisons = 0;
    int gap = items.Length / 2;
    while (gap > 0)
    {
        for (int i = gap; i < items.Length; i++)
        {
            int current = items[i];
            int j = i - gap;
            while (j >= 0)
            {
                comparisons++;
                if (items[j] <= current)
                {
                    break;
                }
                items[j + gap] = items[j];
                j -= gap;
            }
            items[j + gap] = current;
        }
        gap = gap / 2;
    }
    return comparisons;
}

static int InsertionCounted(int[] items)
{
    int comparisons = 0;
    for (int i = 1; i < items.Length; i++)
    {
        int current = items[i];
        int j = i - 1;
        while (j >= 0)
        {
            comparisons++;
            if (items[j] <= current)
            {
                break;
            }
            items[j + 1] = items[j];
            j--;
        }
        items[j + 1] = current;
    }
    return comparisons;
}

int[] small = { 64, 34, 25, 12, 22, 11, 90 };
Console.WriteLine($"{ShellSortCounted(small)} comparisons: {string.Join(", ", small)}");
int[] first = new int[100];
int[] second = new int[100];
for (int i = 0; i < 100; i++)
{
    first[i] = 100 - i;
    second[i] = 100 - i;
}
Console.WriteLine($"Shell sort: {ShellSortCounted(first)}, insertion sort: {InsertionCounted(second)}");
```
