# putting-things-in-order: notes for a reviewer

Written from dewlab `tutorials/putting-things-in-order/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 21):
action *adapt*, shape *tutorial*, size L, batch 6, depends on
`finding-things`. The folder did not exist when this run started, so there
was no partial draft to finish; both pages were written from the start.

Files:

- `putting-things-in-order.md`: the lesson. 14 exec cells, 2 of them in
  world variants (13 tasks when the pair of variants counts once);
  3 predicts, 7 hints, 5 solutions, 5 `inputs` blocks, 1 challenge, 1 fold
  ("Why"), 3 fences to read (the spare-variable swap, the insertion-sort
  pseudocode, one compiler message), 1 table. Three cells are meant to
  fail: `your-turn-1` and `your-turn-2` (`expect: CS0103`, until the
  reader puts the lines in order) and `sorting-with-a-key-2`
  (`expect: CS0029`, the predict). One cell is empty on purpose
  (`comparing-our-sorts-2`, the reader's experiments).
- `putting-things-in-order-practice.md`: the practice page, 20 problems.
  16 exec cells, 2 of them in world variants; 3 predicts, 5 hints,
  6 solutions, 5 `inputs` blocks, 15 folds. One cell is meant to fail:
  `the-guard-goes-first-1` (`expect: exception`).
- `putting-things-in-order.native.json`,
  `putting-things-in-order-practice.native.json`: what the native check
  recorded for every cell, solution and `inputs` row, in both worlds.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for each
page and for the probes, and again with `--json` for each of the three
files. Both pages also went through the real parser, `web/lesson/parse.js`
(`parseLesson`, with the page id), with no errors; the counts above are
the parser's. No cell reads input, so no cell has `stdin:` (dewlab's page
read none either). No cell uses `Console.ReadKey`, `Clear` or colours.

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

## Links: decision 32

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
  `ByLength()` shows CS7036 (probe `p-brackets`).
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
  `p-no-rule`).

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
sorts inside it, and an insertion sort for 16 elements or fewer.
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

**Where to read more.** Bingmann and Polylog: titles and authors checked
through YouTube's oEmbed on 27 September 2026; the years and Polylog's
length (four minutes) are dewlab's and were not checked. Computerphile is
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
| 13. The best first | 13, both worlds | `Score` and `Lit` as dewlab's. The reader also writes the comparison method (`HigherScoreFirst`, `MoreLitFirst`) and the `Array.Sort` line. `"ETAOIN".Contains(letter)` replaces `in`. Both starters warn CS8321, and the prose says so. The pixel-art stub prints the rows as a picture. The secret-messages solution prints the two best scores (12, then 10). |
| 14. A function that calls itself | 14 (`a-function-that-calls-itself-1`, id kept) | "A method that calls itself". The fold names a *stack overflow* in place of `RecursionError`. No cell shows one: in .NET it ends the program and cannot be caught, and the native check runs cells in its own process (course map, open question 10). |
| 15. Better than n log n | 15 | Unchanged. |
| 16. One more item | 16 | Array or list: an array needs a new array one longer; `List<int>.Insert` moves the elements after the index. "About 20" points to problem 8's `Math.Log2`. |
| 17. Correct, and slower | 17. The same answers, more work | Retitled and reworded with no *correct*, *right* or *wrong* (style guide). "Students" became "learners". |
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

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. The native check labels a
cell's compiler messages and exceptions with the cell id where the page
would show `Program.cs`; line and column are the same.

| Number or claim | Source |
|---|---|
| 9, 10, 100 and 10, 100, 9 | lesson cell `sorted-in-one-line-1` |
| 64 reaches 90 in one pass | lesson cell `bubble-sort-let-things-rise-1` |
| 6, then 5, ... 1; 21 in total; the last pass swaps nothing | lesson cell `bubble-sort-let-things-rise-2` |
| the scrambled cells do not compile, many messages CS0103 | lesson cells `your-turn-1`, `your-turn-2` |
| `[2, 1, 3]` for `{ 3, 1, 2 }` | lesson cell `your-turn-3`, its `inputs` |
| OWL before BAT | lesson cell `sorting-with-a-key-1` |
| CS7036 with `ByLength()` | probe `p-brackets` |
| `Array.Sort` is unstable | Microsoft's page; probe `p-unstable` |
| "apple" before "Banana"; `CompareOrdinal` as the rule; capitals agree | probe `p-word-rules` |
| CS0029 and its message, `Program.cs(2,20)` | lesson cell `sorting-with-a-key-2` |
| sorting a copy keeps the old order | probe `p-sort-a-copy` |
| H, then W; three letters on | solution of `your-turn-4--secret-messages` |
| CS8321 on the pixel-art starter | lesson cell `your-turn-4--pixel-art` |
| blue, red, grey, green, yellow | solution of `your-turn-4--pixel-art` |
| `InvalidOperationException` with no rule | probe `p-no-rule` |
| 4950 and 19900 | lesson cell `comparing-our-sorts-1` |
| 2147483647; 45, 499500, 499999500000 | lesson cell `comparing-our-sorts-3` |
| below zero with `int` | probe `p-int-overflow` (-364189984) |
| 16 elements or fewer; three sorts inside | Microsoft's *Array.Sort Method* page (a sourced fact, not output) |
| insertion sort quick on nearly sorted; bubble sort the same count | probe `p-experiments` |
| the challenge can be done | probes `p-challenge-starter`, `p-challenge-answer` |
| practice 1: `1, 4, 2, 5, 8`, three swaps | practice cell `one-pass-1` |
| practice 2: two passes; `1, 2, 4, 5, 8`; four passes | practice cell `how-many-passes-1` |
| practice 3: the sorted parts | practice cell `insertion-traced-1` |
| practice 4: places 0 to 3 | practice cell `selection-traced-1` |
| practice 5: 45, 190; about four times | practice cell `counting-comparisons-1` (780, 3160) |
| practice 6: 9, not 45; reversed unchanged | solution of `stop-when-it-is-sorted-1` and its `inputs` |
| practice 7: n − 1 on sorted data; selection always the same | probe `p-experiments` (9 and 45 for 10 items) |
| practice 8: 499999500000; 49999.95 s; almost fourteen hours; about 20; about twenty million; about two seconds | solution of `a-million-items-1` |
| practice 9: `data` unchanged | solution of `selection-sort-from-nothing-1`, its `inputs` |
| practice 10: `IndexOutOfRangeException` at line 6 | practice cell `the-guard-goes-first-1` |
| practice 13: 12, then 10 | solution of `the-best-first-1--secret-messages` |
| practice 13: `####`, `#..#`, `#.#.`, `....`; 2 lit | solution of `the-best-first-1--pixel-art`, its `inputs` |
| practice 16: about 20 | practice 8's solution (`Math.Log2`) |
| practice 17: 45 | practice 5 |
| practice 18: 32, 16, 8, 4, 2, 1, 0; 7 | practice cell `from-earlier-at-most-how-many-looks-1` |
| practice 19: `[B, W]` | practice cell `from-earlier-a-loop-over-a-dictionary-1` |
| practice 20: `10, 20, 30`; `30, 10, 20` with `ToArray()` | practice cell `from-earlier-two-names-for-one-array-1`; probe `p-sort-a-copy` |
| E is the most common letter, then T; 2ᵏ and n! | carried over from dewlab; facts, not program output |

## Once the page UI exists

- **The scrambled cells.** `your-turn-1` shows 22 messages natively
  (20 errors, 2 warnings) and `your-turn-2` shows 23 (21 and 2). Check how the page
  shows that many, and which it shows first: the native list starts with
  syntax errors (CS1525 for the first, CS1002 for the second), not CS0103. The prose says the
  messages need not be read, and names no message, so it holds either way.
  Check that the page's "meant to fail" signal (from `expect:`) is visible
  before the reader runs the cell.
- **`expect:` on a cell the reader edits.** When the reader puts the lines
  in order, the cell compiles, which is not what `expect: CS0103` says.
  Check that the page does not present that as a problem.
- **An empty cell.** `comparing-our-sorts-2` is `empty` (only comments).
  Check its label and its buttons.
- **The `inputs` table.** Values natively: `['H', 'W']` for `char[]`,
  nested `[[0, 0, 255], ...]` for `int[][]`, `""` for an empty string.
  Check the page shows them the same way.
- **The exception line.** Practice 10's fold says line 6. .NET lists the
  innermost frame first (course map, open question 9); here there is one
  frame.
- **CS8321 warnings.** Three starters warn on purpose (`your-turn-4--pixel-art`,
  `the-best-first-1--secret-messages`, `the-best-first-1--pixel-art`), and
  each says so above the cell.
- **Number predict on a cell with several lines.** Practice 18 asks about
  the last line, as `first-steps-practice` asks about the first.
- **Cells recorded per world.** Shared cells below the world variants
  (`comparing-our-sorts-*`, practice 14 and 18 to 20) are recorded once
  per world; their output is the same in both.

## Open questions for a reviewer

1. **A method passed to a method, in PDP.** The course map's open question
   5 asks whether sorting by a key waits for lambdas. This page passes a
   *named* method (`Array.Sort(words, ByLength)`), with no lambda, in the
   lesson (`sorting-with-a-key-1`, `your-turn-4` in both worlds) and on the
   practice page (12 and 13). It rests on the contract the reader met with
   `CompareOrdinal`, and dewlab's PDP page did the same in Python
   (`key=len`). The other choices: cut the section and your-turn-4 (the
   course map allows "reworked or cut"), or use `Array.Sort(keys, items)`,
   which sorts one array by a second array of keys with no method at all,
   but is a different idea from dewlab's. Decide with open question 5.
2. **Lines out of order, with braces.** The shuffled cells keep the braces
   in place and put each line at its slot's indentation, so the task is
   about meaning. The other choice: a stub that compiles, with the lines
   listed as comments or in prose, and the reader types them in with their
   braces. That gives readable feedback at every step, at the cost of more
   typing and a different task. Which suits a Level 5 reader better, given
   20-odd messages on a first run?
3. **Long cells.** Over the style guide's 15 lines: lesson
   `bubble-sort-let-things-rise-2` (23), `your-turn-1` (16), `your-turn-2`
   (17), `your-turn-3` (18), `your-turn-4--pixel-art` (22),
   `comparing-our-sorts-1` (27); practice `counting-comparisons-1` (29),
   `stop-when-it-is-sorted-1` (18), `the-best-first-1--secret-messages`
   (30), `a-function-that-calls-itself-1` (19). Most of the length is
   braces on their own lines; dewlab's versions were 9 to 17 lines. Split
   some (for example, the counted sort as its own cell above the loop), or
   accept them?
4. **New cells on the practice page.** Problems 2, 3, 4 and 8 gained cells
   so that their folds' numbers are recorded (decision 29). The first three
   print the answer to a trace, so a reader can run before tracing. Each
   asks for the trace first. Keep, or put those numbers in probes and keep
   dewlab's cell-free problems?
5. **Practice 20 is new.** dewlab's "nothing back" would be the third
   `void`-to-something CS0029 a reader meets on two pages. Keep the
   replacement (two names for one array, sorted), or keep dewlab's?
6. **A sourced number that no cell prints.** "16 elements or fewer" comes
   from Microsoft's page, in the lesson and in practice 7. Allowed, as a
   fact with its source named, or cut?
7. **`ToArray()` is LINQ.** As in `grids-and-references` (its open question
   2): it works through the implicit `using System.Linq;`. This page uses
   it for copies and for `counts.Keys.ToArray()`. `items[..]` would copy an
   array with no `using`; nothing replaces the `Keys` one as briefly.
8. **Subtraction as a comparison.** `first.Length - second.Length` and
   `counts[second] - counts[first]` are safe for these small numbers, and
   they show the contract plainly. With very large `int` values a
   subtraction can wrap (the lesson shows wrapping a few sections later),
   which is why .NET code often writes `first.CompareTo(second)`. Mention
   it on this page, or leave it for *Reusable methods*?
9. **`long` and wrapping** lean on *Types and their sizes*, which is not
   drafted in `drafts/`. Whoever writes it should check that it teaches
   `long` and `int.MaxValue`, and says what happens past the largest `int`
   in words that agree with this page ("continues from the smallest
   `int`").
10. **Links.** The task text for this run asked for `lesson:` links; decision
    32 asks for italics for pages not in `lessons/`. This page follows
    decision 32 and links only its own practice page. Confirm that reading.

## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.

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
