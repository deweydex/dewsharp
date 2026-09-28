# finding-things: notes for a reviewer

Ported from dewlab `tutorials/finding-things/` (version 2026.09.26.1): the
lesson, its practice page, its glossary file and its picture. The brief is
the course map's entry (`planning/COURSE_MAP.md`, PDP row 20): action
*adapt*, shape *tutorial*, size M, batch 5, depends on
`lists-and-sequences` and `reading-input`.

A run that was stopped part-way had left a full draft of the lesson and the
picture in this folder, but no practice page and no notes. I read the
draft against the brief, the style guide, `docs/TRANSLATING.md` and the
decisions up to 32, kept its structure and most of its prose, and changed
what the section notes below say. The practice page, this file and the
probes are new in this run.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/finding-things/finding-things.md` and
`finding-things-practice.md`, with the picture `range-collapsing.svg`
beside them; their recorded outputs are the two `*.outputs.json` files
beside them, written by the browser checker; and this file was the draft's
`NOTES.md`. The three `*.native.json` files were deleted: the browser
checker's outputs files replace them. "What was done when it moved", just
below, says what changed in the move. The rest of this file is the
porter's, brought up to date (what the move made stale is marked
*(stale)* or rewritten), with the porter's questions settled where the
playbook, the course map, the style guide or the exemplars answer them.
What none of them answers is under "Open", at the end of the questions.

Files:

- `finding-things.md`: the lesson, version `2026.09.28.1`. 11 exec cells,
  2 of them in world variants (10 on show in either world); 3 predicts,
  8 hints, 4 solutions, 4 `inputs` blocks, 2 folds, 1 challenge. One cell
  is meant to fail: `searching-words-1` (`expect: CS0019`). No cell and no
  challenge warns.
- `finding-things-practice.md`: the practice page, version `2026.09.28.1`,
  14 problems. 16 exec cells, 2 of them in world variants (15 on show in
  either world); 3 predicts, 9 hints, 7 solutions, 6 `inputs` blocks, 11
  folds. One cell is meant to fail: `a-middle-with-a-point-2`
  (`expect: CS0266`). No cell warns.
- `range-collapsing.svg`: dewlab's picture, unchanged by the move.
- `finding-things.outputs.json`, `finding-things-practice.outputs.json`:
  what the browser checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/finding-things.md`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write finding-things
  finding-things-practice` ran every cell, solution and `inputs` row of
  both pages in the real engine, in both worlds, and reported no problems.
  On the draft as it came, every output, `inputs` value, solution and
  compiler message (code, line, column and text) was the same as the
  native check's, character for character, except in two ways, both about
  how the page's `Console` works. The page shows each typed line after its
  prompt, as a console does (`Your guess: 1`, then `Higher than 1`), where
  the native check showed the prompts alone (`Your guess: Higher than 1`).
  And the opening game's secret is random, so its output was different on
  each run (78 tries in the browser's first run, 40 in the native one; see
  the next point). The native check wrote a compiler error in an `inputs`
  row as the whole message, and the browser records `{ "compileError":
  "CS0103" }`; that is the same fact. There was no difference in culture
  or number formatting (`50.5`, `6.5`, `True, False, True, True, False`),
  in trimmed APIs (`Random.Shared`, `Array.IndexOf`, `Array.BinarySearch`,
  `Array.LastIndexOf`, `string.CompareOrdinal`, `int[,]` with
  `GetLength`, `GetValueOrDefault` all work), or in stack traces: neither
  page has a cell that stops with an exception. No cell warns, so no
  warning travels down to the cells below.
- **The porter's probes, in the browser.** The 20 probes at the end of
  this file were run in a scratch lesson made from that section (`node
  tools/check-lessons.mjs --lessons <scratch>/lessons --write`). Each gave
  the same output, diagnostics and exception as natively. In particular,
  on the page (culture `en-IE`) `"apple".CompareTo("Banana")` is -1 and
  `string.CompareOrdinal("apple", "Banana")` is 31, and the two rules
  agree on every pair of the page's capital words, so the fold "Why
  CompareOrdinal?" is true on the page, which the porter could not check.
- **The opening game could not pass the checker** (the porter's question
  1). With `Random.Shared` and a `stdin:` of the guesses 1 to 100, the
  output depended on the secret, and `npm run check-lessons` without
  `--write` reported "guess-my-number-3: output differs" on every run. The
  cell is now the porter's choice (b), the probe
  `l-opener-ends-on-no-input`: it reads each guess into `answer`, stops
  with `break` when `Console.ReadLine()` gives `null`, and prints "Yes!
  ..." inside the loop. It has no `stdin:`, so the checker records `I am
  thinking of a whole number from 1 to 100.` and `Your guess: `, the same
  on every run. A reader still plays against a random number, as the
  course map asks (`Random.Shared` "is for games the reader plays"), and
  **End input** now ends the game quietly, where the draft's
  `int.Parse(null)` stopped it with an `ArgumentNullException` (the
  porter's "once the page UI exists"). A new paragraph under the cell says
  what `null` is and when `ReadLine` gives it, in the words of
  `a-program-of-your-own`, whose menu stops the same way, and links there.
  The id is kept. The course map's entry says this cell has `stdin:`;
  with a random secret it cannot, and pass the checker (see "Open").
- **Numbers the prose quoted but no cell printed** (decision 29, and the
  instruction that every number and quoted output comes from a recorded
  output). Each is now printed by a cell, or no longer quoted:
  - Lesson, "How much work is binary search?": dewlab's table (500,000;
    250,000; about 1,000; about 1; probe only) became a cell,
    `how-much-work-is-binary-search-1`. For 15, 100, 30,000 and 1,000,000
    items, it halves the size, rounded down, until nothing is left, prints
    each step, and counts the looks: 4, 7, 15 and 20. The prose before it
    says why this is the most looks a search can need (after a look, at
    most half of the range is left, rounded down). The one cell records
    the picture's fifteen, seven, three and one; "at most 7 looks among
    these 100" (pixel art); "at most 15 looks" for 30,000 words (secret
    messages); "at most 20" for a million; the fold under "Divide and
    conquer" (seven; 100, then 50, 25, 12, 6, 3 and 1); and the
    challenge's "closer to 7". With whole numbers, the twentieth look
    leaves 0, not "about 1", so the table went and the prose reads the
    cell. `putting-things-in-order-practice` problem 18 already uses the
    same model of a look, for 64 items. The Big O paragraphs stay, as the
    course map asks.
  - Lesson, your turn 1: the solution note's "WREN would give -1" and the
    quoted warning CS0162, *Unreachable code detected*, under `index++`
    (probe only), became an invitation: put `else { return -1; }` in, run
    it, and read what WREN gives and what the warning says. Hint 2 quoted
    the text of CS0161 (probe only); it became "Does the message say
    CS0161, and name `LinearSearch`?", as the dictionaries page did for
    CS0029.
  - Lesson, your turn 2, solution note: "3 and 89 each take four looks"
    (89 probe only) became "3 takes four looks, one for each row of the
    picture", and "31 is found at once" became "the first look finds it".
    "`low`, `mid` and `high` all stay at 1" (probe only) became a search to
    try on paper, after which the three "stop changing".
  - Lesson, "Putting it together": "For most targets in this array, binary
    search needs 7 to 9, and never more than 9" (probe only) went. The
    invitation now asks what the most is, and says that the cell that
    counts looks can tell, given the array's size.
  - Practice 2, 4 and 8, problems for paper: each now has a cell under the
    question, to run once the reader has an answer. `counting-looks-1`
    counts with the lesson's `LinearSearchCounted` in an array of 1 to 100
    (`First: 1`, `Last: 100`, `Not there: 100`, `On average: 50.5`).
    `a-trace-1` is the lesson's binary search with one line added, which
    prints `low`, `high` and the index it checks (7, 11, 13, holding 31, 55
    and 72). `at-most-1` is the lesson's halving cell for 1,000 and
    1,000,000 (10 and 20). The page's opening paragraph says so, and still
    asks for paper first.
  - Practice 1: "uses the -1 as an index, it stops with an
    `IndexOutOfRangeException`" (probe only) now names where that is
    recorded: `numbers[-1]` in problem 1 of
    [the practice page about arrays and lists]
    (`lists-and-sequences-practice`, `which-element-2`). Practice 7's fold
    points back to problem 1 for the same exception.
  - Practice 5: the fold named the indexes that binary search checks
    (probe only). It now tells the search with the array's own elements:
    the middle element is 9, so it keeps 5 and 1; 3 is smaller than 5 too;
    but 3 is after 9.
  - Practice 7: `int`'s largest value, 2,147,483,647 (probe only), is now
    printed by a new first line of `a-middle-that-overflows-1`,
    `Console.WriteLine(int.MaxValue);`, and of its solution. The prose
    names `int.MaxValue` and says the first line prints it, and the fold
    starts "After 2147483647". "the part ... that fits in an `int`'s 4
    bytes" became "fits in an `int`": no cell prints the size.
- **Pixel art, your turn 3.** The starter printed only an empty line,
  where its twin in the other world prints `KHOOR with shift 1 is JGNNQ`.
  As on the lists and dictionaries pages, it now prints a line made from
  its given values, `100 lit pixels, from 0 to 9999`, and says so ("so
  that you can see what `lit` holds"); the solution prints the same line,
  and its note says "The last line is ...". The `inputs` are unchanged.
- **Links** (decision 32, and the list of pages moving in this round).
  Every `lesson:` link goes to a page in `lessons/` or on the list:
  [the closer look at starting a total] (`a-total-that-starts-again`,
  new, for "a variable made inside curly brackets exists only inside
  them"), [A program of your own] (`a-program-of-your-own`, new, for
  `null`), [the closer look at dividing] (`dividing-in-csharp`, was
  *Dividing*), [The page about decisions] (`making-decisions`, was
  *Decisions*), [Sorting] (`putting-things-in-order`, was *Sorting*), the
  practice page, and on the practice page [the practice page about arrays
  and lists] (`lists-and-sequences-practice`, new), [Arrays and lists],
  [Grids and references] and [Dictionaries] (were italics). *Reading
  input* and *Types and their sizes* are neither in `lessons/` nor on the
  list, so they stay in italics. `putting-things-in-order` was already in
  `lessons/` by the final check, so the checker reported no link at all.
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in the words of the
  lists, grids and dictionaries pages.
- **Plain words.** "the loop's braces" and "a pair of braces" became
  "curly brackets", the term of `a-total-that-starts-again`, which the
  sentence now links; "Which search does better each time?" became "which
  search makes fewer comparisons?"; the practice page's opening says what
  the checking cells are for.
- **The page, looked at.** Both pages were opened in headless Chromium on
  the real server (`tools/serve.mjs --isolate`), in both worlds, at 390
  and 900 pixels wide: no errors in the console, no sideways scroll, every
  cell labelled PROGRAM with `Program.cs`, and every link answered 200.
  See "Page behaviour, checked when it moved" for the porter's questions
  about the page.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `finding-things: "Searching: linear and binary search"` under
  `planned:`. The playbook's checklist says to delete it when the lesson
  moves; this move was told not to edit the course files.

## Frontmatter

- `title`: "Searching: linear and binary search", the course map's title.
  dewlab's was "Searching a list: linear and binary search".
- `covers: [PDP-LO2, PDP-LO7]`, from the course map. dewlab gave each
  section its own outcomes (MIT-6.8 and MIT-6.6, maths outcomes of the
  integrated course). They go, as the course map says for maths outcomes.
- `worlds`: dewlab's two, with dewlab's descriptions, as the course map
  says for PDP.
- `year:` is dropped: the format has no such field.
- The practice page has `from: finding-things-practice`,
  `practice_for: finding-things`, the same worlds, and no `covers`, as the
  other drafted practice pages do. Its title is "Searching: practice", in
  the pattern of `first-steps-practice` ("Your first C# program:
  practice").

## What changed, and why

### What the reader already knows

PDP's order puts this page after `a-program-of-your-own`. Drafted before
it: `storing-and-computing`, `dividing-in-csharp`, `making-decisions`,
`repeating-yourself`, `a-total-that-starts-again`,
`writing-your-own-functions`, `lists-and-sequences`,
`grids-and-references`, `looking-things-up-by-name`,
`a-program-of-your-own`. Not drafted: `compiler-errors`,
`types-and-their-sizes`, `reading-input`, `mixed-first-programs`.

The page relies on these, from the drafts: methods written as
`static int Name(...)` at the top of a program cell, and the sentence
"Each Run starts a new program, so this cell needs its own copy of ..."
(`writing-your-own-functions`); `Random.Shared.Next(1, 7)`
(`writing-your-own-functions` practice); arrays, `List<T>`, `new()`,
`string.Join`, `Length`, `^1` and ranges (`lists-and-sequences`); `int[,]`
and `GetLength(0)`, reference and value types (`grids-and-references`);
`GetValueOrDefault` and "a dictionary does not promise an order"
(`looking-things-up-by-name`); `"A" < "B"` failing with CS0019
(`making-decisions`, cell `which-comes-first-2`); scope in braces
(`a-total-that-starts-again`). Since the move, also `null` from
`Console.ReadLine()` when there is no more input, and **End input**
(`a-program-of-your-own`, the challenge's menu).

From pages not drafted, it relies on what the course map says they
teach: `do`...`while`, `Console.ReadLine()`, `int.Parse` and `TryParse`
(`reading-input`); `int.MaxValue` and a whole number that overflows
(`types-and-their-sizes`). Practice 7 defines *overflow* in its own fold,
in case that page uses another word.

### Links: decision 32 *(stale)*

*Stale since the move: every name in the table below that is now in
`lessons/`, or on the list of pages moving with this one, is a link, and
*Reading input* and *Types and their sizes* stay in italics (see "Links"
under "What was done when it moved"). The pages that point here now link
to it: `a-program-of-your-own` ("The next page, [Searching]"),
`repeating-yourself` and `putting-things-in-order`, whose four mentions
match this page as it is now. `putting-things-in-order-practice` still
names *Searching* in italics twice (problems on `CompareOrdinal` and on
"at most how many looks"); it is not this move's page to edit.*

The brief said to link with `lesson:`. `DECISIONS.md` 32, which appeared
while I worked, says a page not yet in `lessons/` is named by its short
title in italics, with no link, and `docs/TRANSLATING.md`'s checklist says
the same. Only `first-steps` and `objects-and-classes` are in `lessons/`,
so I followed decision 32. The one link left is the lesson's link to its
own practice page, as both exemplars have (`lesson:first-steps-practice`).
The earlier draft had four `lesson:` links; they are now italics.

| Where | Italic name | Link to add later | That page's batch |
|---|---|---|---|
| lesson, opening | *Reading input* | `lesson:reading-input` | 4 |
| lesson, your turn 2 | *Dividing* | `lesson:dividing-in-csharp` | 1 |
| lesson, searching words | *Decisions* | `lesson:making-decisions` | 2 |
| lesson, looking back | *Sorting* | `lesson:putting-things-in-order` | 6 |
| practice 7 | *Types and their sizes* | `lesson:types-and-their-sizes` | 2 |
| practice 12 | *Arrays and lists* | `lesson:lists-and-sequences` | 3 |
| practice 13 | *Grids and references* | `lesson:grids-and-references` | 4 |
| practice 14 | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |

Pages that point here, which I did not edit (this run writes only in this
folder):

- `a-program-of-your-own.md` line 255: "The next page, Searching: linear
  and binary search, looks at ...", in plain text. By decision 32 it
  becomes *Searching*.
- `putting-things-in-order.md` (a draft that appeared during this run)
  names *Searching* four times. What it says matches this page:
  `string.CompareOrdinal`'s three kinds of answer, `"apple"` and
  `"Banana"` under the two rules, binary search needing sorted data, and
  O(n) and O(log n).
- `repeating-yourself/NOTES.md` lists a forward link here to add.

### The lesson, section by section

**Opening (`guess-my-number-3`).** dewlab's two cells shared `secret` and
`tries`, which the rules of the road do not allow. As the course map says,
they become one program with real input: `Random.Shared.Next(1, 101)` and
a `do`...`while` that reads guesses with `Console.ReadLine()`. The id is
new, as the map asks, and continues dewlab's numbering, so that a teacher
can see which cells it replaces. `stdin:` gives the checker the guesses 1
to 100 in order, so every run finds the secret. The prose explains
`Next`'s upper bound, names the loop from *Reading input*, and adds one
sentence on why `guess` is made before the loop (probe
`l-guess-inside-loop`: CS0103 if it is made inside). The loop uses
`int.Parse`, and the prose says what happens with text that is not a
number (open question 2). *(Stale: the cell has no `stdin:` now, stops
when `ReadLine` gives `null`, and a paragraph says why; see "The opening
game could not pass the checker" under "What was done when it moved".)*

**Linear search.** "Checks each element in turn" became "checks the
elements one at a time" (an idiom). *Target* is defined; dewlab used the
word without defining it.

**Your turn 1.** `LinearSearch(string[] items, string target)`. The stub
returns -1, so it compiles. dewlab's `guess: yes` goes (dewsharp has no
guess column); the prose asks the reader to write down a guess for each
input row by name. The `inputs` gain an empty array
(`new string[0]`), as dewlab's had `[]`. The hint starts with a question
now, and a second hint (`after: 1 errors`) reads CS0161, which is what a
reader meets if the `return -1;` goes (probe `l-no-return-after-loop`).
The solution note gains a C# point: with `return -1;` as an `else` inside
the loop, the compiler warns CS0162 under `index++`, and WREN gives -1
(probe `l-else-return`). *(Stale: the note now invites the reader to try
the `else` and read the warning, and hint 2 names CS0161 without quoting
its text, since no page cell prints either.)*

**Binary search.** The steps and the picture are dewlab's, with `;` after
the assignments and "array" for "list". The picture was drawn for Python's
`//`; C#'s `/` gives the same rows (probe `l-picture-trace`: 15, 7, 3 and
1 left, `mid` at 7, 3, 1 and 0).

**Your turn 2.** The pseudocode says `/ 2` and `ELSE IF`. One paragraph
says why `(low + high) / 2` needs no `//` in C#, pointing to *Dividing*
(the map's "needs no `//`"). The `inputs` gain an empty array. The first
hint is new and asks a question; dewlab's hint, which gives the three
gaps, is the second (`after: 3 runs`). The solution note adds what happens
with `high = mid;` (probe `l-high-equals-mid`: `low`, `mid` and `high`
stay at 1 from the fourth step on). *(Stale: the note now asks the reader
to try that search on paper, and says only that the three "stop
changing"; "3 and 89 each take four looks" became "3 takes four looks,
one for each row of the picture". The first paragraph links
[the closer look at dividing].)*

**Searching words (new section).** dewlab's secret-messages task said
"strings compare alphabetically, so binary search works on the list as it
does on numbers". In C#, `<` on two strings does not compile, and the map
asks the page to say why and to use `string.CompareOrdinal`. So three
cells come before the task:

- `searching-words-1` (`expect: CS0019`): `first < second` on two words.
  The prose says it is meant to fail before the reader runs it, as the
  TRANSLATING checklist asks. The earlier draft had a predict here. I
  removed it: `making-decisions` asks exactly this predict about `"A" <
  "B"`, so here it is a thing to remember, not a guess.
- `searching-words-2`: `CompareOrdinal` on three pairs, with a predict on
  the first line (-10, where most readers expect -1). *Ordinal* is
  defined.
- `searching-words-3`: `BinarySearch(string[] items, string target)`,
  which the secret-messages task copies. `"noon"` gives -1.

A `dl-why` fold, "Why CompareOrdinal?", says what `CompareTo` does
differently. Probe `l-compare-rules` shows `"apple".CompareTo("Banana")`
is -1 and `string.CompareOrdinal("apple", "Banana")` is 31 in the en-IE
culture, and that the two rules agree on every pair of the page's capital
words. The page's engine loads ICU with en-IE (`docs/ARCHITECTURE.md`), so
`CompareTo` should behave the same there; the native check cannot prove
that (see "Once the page UI exists"). *(Checked when it moved: the probe
gives -1, 31 and 0 differing pairs in the browser too, with the culture
`en-IE`.)*

**Your turn 3.** Secret messages: the reader copies `BinarySearch` for
words into the cell (rule 1, in `writing-your-own-functions`' words). The
earlier draft's starter left `coded` and `Decode` unused, with two
warnings that the prose explained. `docs/TRANSLATING.md` says a starter's
variables must be used, so the starter now prints `Decode(coded, 1)`,
which also shows the reader what `Decode` gives (`JGNNQ`). `Decode` keeps
the negative remainder safe with `% 26 + 26) % 26`, as the map says. A
second hint reads CS0103 for a missing `BinarySearch`. Pixel art: `lit` is
filled by a loop (the map: the comprehension becomes a loop), and `points`
is an `int[,]`, which `grids-and-references` teaches with `GetLength(0)`;
dewlab's `for row, column in points` has no C# form. `answers` is a
`List<bool>`, which prints `True, False, ...`. *(Since the move, the
pixel-art starter prints `100 lit pixels, from 0 to 9999` too, and both
worlds' solution notes take their numbers of looks from the new cell in
the next section.)*

**How much work is binary search?** Unchanged but for "cuts in half"
(an idiom), now "removes half". Probes `l-halving-table` and
`l-max-looks`. *(Stale: the table became the cell
`how-much-work-is-binary-search-1`; see "Numbers the prose quoted but no
cell printed" under "What was done when it moved".)*

**Searches that C# already has (new section).** The map says
`Array.BinarySearch` is named. `searches-csharp-has-1` shows
`Array.IndexOf` and `Array.BinarySearch`, with a predict on the -6 that
`Array.BinarySearch` gives for 20. The earlier draft said "Every search in
every program is one of these two ideas". That is not true (the
dictionaries the reader met on the page before are neither), so the
paragraph now says only why knowing them matters, and points to practice
problems 5 and 9.

**Divide and conquer.** Unchanged. The fold's 7, the halvings 100, 50,
25, 12, 6, 3, 1, and 64 and 128 are probes `l-game-guesses`,
`l-game-worst-path` and `l-halving-table`. *(Stale: the fold's 7 and its
halvings are now the second line of `how-much-work-is-binary-search-1`,
and the fold says so. 64 and 128 are arithmetic in the prose, 2 × … × 2.)*

**Putting it together.** `list(range(0, 1000, 3))` becomes a loop that
fills an `int[334]`, and the cell prints its length and its first and last
elements, so the 334 and 999 that dewlab gave in prose are recorded. The
predict stays. "Is there a target where linear search wins" became "makes
fewer comparisons" (a verdict word). "Most targets need 7 to 9, never more
than 9" is probe `l-putting-together-spread` (271 of 334 need 7 to 9; a
target that is not there needs 8 or 9; for 6 targets linear search makes
fewer comparisons, which the page leaves the reader to find). *(Stale:
that sentence went, since no page cell prints it; the invitation now asks
for the most, with the halving cell.)*

**Looking back.** The question and the challenge stay. The earlier draft's
starter had two CS0219 warnings (`low` and `high` unused). The starter now
makes the first guess, `int guess = (low + high) / 2;`, and returns 1, so
it compiles with no warning (probe `l-challenge-starter`) and gives the
reader a first step. Probe `l-challenge-solved` shows one way to finish
it: the average is 5.8, which the page does not state. The closing names
the practice page (a link) and *Sorting* (italics). *(Stale: *Sorting* is
a link now, and a paragraph on Visual Studio comes before the closing.
"Closer to 7" is backed by the halving cell's 7 for 100 items.)*

**Where to read more.** dewlab's two Computerphile videos stay. Their
titles, "Binary Search Algorithm - Computerphile" and "Getting Sorted &
Big O Notation - Computerphile", were confirmed through YouTube's oEmbed
on 27 September 2026; the years and the presenter's name are dewlab's and
were not checked. The earlier draft added Microsoft's *Array.BinarySearch
Method* page. I fetched it on 27 September 2026: its *Remarks* explain the
number below zero and the `~` operator. The earlier note said "read its
first example first", but the page's first example is shown in F# in some
views, so the note now points to *Remarks*. It says that `~result` and
`-result - 1` give the same number (probe `p-where-it-goes-extra`: `~-6`
is 5). dewlab's opening sentence for this section ("Everything here is
covered elsewhere too ...") is back, as the exemplars have it.

### Predicts

The style guide allows two or three. dewlab's lesson had one
(`putting-it-together-1`). This lesson has three:
`searching-words-2` (-10, not -1), `searches-csharp-has-1` (-6, not -1)
and `putting-it-together-1` (8). Each is about a number C# gives that a
reader would not expect.

dewlab's practice page had four (problems 5, 11, 12 and 13). This one has
three: `not-sorted-1`, `a-middle-that-overflows-1` (new, and C#'s own
surprise) and `from-earlier-a-count-that-starts-itself-1`. Problem 12,
the last three letters, keeps its question in the prose, without a block.

### The practice page

dewlab's numbering is kept where the problem is the same. Problems 6 and
7 are C#'s, so dewlab's 7 to 13 move down by one.

| Here | dewlab | What changed |
|---|---|---|
| 1. Why -1 | 1 | The fold says C#'s side: using -1 as an index stops with an `IndexOutOfRangeException` (probe `p-minus-one-index`), where Python reads it as the last element. Since the move, the fold points to `lists-and-sequences-practice` problem 1, where that is recorded. |
| 2. Counting looks | 2 | "Looks at a list" became "checks an array". Numbers: probe `p-counting-looks`. Since the move, a checking cell, `counting-looks-1`, prints them. |
| 3. The last one | 3 (`the-last-one-1`) | `LastIndex(int[] items, int target)`, a stub that compiles, a hint that asks a question, and an empty-array input. The second solution also prints `Array.LastIndexOf(numbers, 4)`, 3. |
| 4. A trace | 4 | Unchanged; probe `p-traces`. Since the move, a checking cell, `a-trace-1`, prints `low`, `high` and each index. |
| 5. Not sorted | 5 (`not-sorted-1`) | A sentence before the cell says the array is not in order (dewlab had none). "An error" became "It stops with an exception". The fold names the two indexes checked (probe `p-traces`); since the move, it tells the search with the array's elements instead. "Wrong answers without complaint" became "can say *not there* about a target that is there, and nothing warns you". |
| 6. A middle with a point | 6, "Why //" | Python needed `//` because `/` gives a float. C# needs nothing, so the problem turns round: `a-middle-with-a-point-1` prints `(0 + 13) / 2` and `/ 2.0` (6 and 6.5), and `a-middle-with-a-point-2` (`expect: CS0266`) keeps the 6.5 in an `int`. Python's run-time `TypeError` becomes a compiler error. |
| 7. A middle that overflows | new | The course map's added problem. `low + high` overflows; the cell prints the sum and the middle, so both numbers in the fold are recorded. The task is `low + (high - low) / 2`. Since the move, the cell and its solution print `int.MaxValue` first, so that 2,147,483,647 is recorded. The solution note cites Joshua Bloch's post on the Google Research blog, 2 June 2006 (fetched 27 September 2026), without its "nine years or so". |
| 8. At most | 7 | Unchanged; probes `l-max-looks` and `l-halving-table`. Since the move, a checking cell, `at-most-1` (the lesson's halving cell for 1,000 and 1,000,000), prints 10 and 20. 1,024 and 1,048,576 are arithmetic in the prose. |
| 9. Where it would go | 8 (`where-it-would-go-1`) | `WhereItGoes(int[] items, int target)`; the stub returns 0. Two hints, the first a question. The note adds why `high = mid;` is safe here, since the lesson warned against it. dewlab's `bisect.bisect_left` note became a second cell, `where-it-would-go-2`, which links the lesson's -6 to the place 5, and shows -1 for a target that goes at index 0. The lesson points here ("as problem 9 on the practice page shows"). |
| 10. Every place | 9 (`every-place-1`) | `List<int> places`. The second tier (a comprehension with `enumerate`) goes: C# has none, and LINQ needs a lambda (course map, open question 5). A hint is added. |
| 11. The first one past a line | 10 (both worlds) | Secret messages: the reader copies `WhereItGoes` and changes it to compare words with `CompareOrdinal`, with a hint for CS0019 and CS0103. The `inputs` add `WhereItGoes(words, "N")` so that the note's 13 is recorded; for the reader's stub, that row is a compiler error until the method exists (decision 18). Pixel art: the `inputs` add `brightnesses.Length - start`, which gives the note's 3. |
| 12. From earlier: the last three | 11 (`from-earlier-the-last-three-1`) | `word[^3..]`. The predict block went (see "Predicts"). |
| 13. From earlier: a method and an array | 12, "counting with a generator" | C# has no generator expression, and `comprehensions-and-grids` became `grids-and-references`. So the problem comes from that page instead: a method that changes an array and an `int` (0 5). New task, new id. |
| 14. From earlier: a count that starts itself | 13 (`from-earlier-a-count-that-starts-itself-1`) | `Dictionary<char, int>` and `GetValueOrDefault`. A dictionary prints its type, so the cell prints its pairs in a loop over `Keys`. "An error" became "It stops with an exception". The fold adds that the order is not promised, as `looking-things-up-by-name` says. |

### The glossary file

dewsharp has no glossary panel, so each of dewlab's entries is defined in
the prose where it first appears:

| dewlab entry | Here |
|---|---|
| search problem | "Linear search", first sentence |
| linear search | the same paragraph |
| O(n) | "How much work is linear search?" |
| sorted | "Binary search", second paragraph |
| binary search | the same paragraph |
| O(log n) | "How much work is binary search?" |
| divide and conquer | "Divide and conquer" |
| `random.randint()` | `Random.Shared.Next(1, 101)`, under the opening cell, with its upper bound |

New terms, each defined where it first appears: *target*, *ordinal*
(lesson), and *overflows* (practice 7). Since the move, also `null`
("C#'s value for *nothing here*", in `a-program-of-your-own`'s words,
under the opening cell), and O(log n) is said, "order log n", as O(n)
was.

## What C# made different, in short

- Two cells sharing a secret became one program that reads real input
  with `ReadLine`, in a `do`...`while`.
- `/` on two `int` values is already whole, so `mid = (low + high) / 2`
  needs no `//`; keeping `/ 2.0` in an `int` is a compiler error (CS0266).
- `<` does not compile on two strings (CS0019). Words are compared with
  `string.CompareOrdinal`, which gives a number below zero, zero or above
  zero, not a `bool`.
- A search method written in one cell must be copied into the next (each
  Run starts a new program).
- The compiler notices a method that can end without a `return` (CS0161)
  and code that can never run (CS0162).
- `int` overflows without an exception, so the middle of two large indexes
  can be below zero.
- C# has both searches: `Array.IndexOf` and `Array.BinarySearch`, whose
  answer for a missing target encodes where it would go.
- -1 as an index stops with an exception, where Python reads it as the
  last element.
- No comprehensions and no `enumerate`: loops fill arrays and lists.
- `Console.ReadLine()` gives `null` when there is no more input (**End
  input** on the page), and a game that reads guesses checks for it.

## Where each number and message in the prose comes from

Rewritten when the page moved. The sources are the recorded outputs,
`lessons/finding-things/finding-things.outputs.json` and
`finding-things-practice.outputs.json` (a shared cell below the world
cells is recorded as `<cell id>@<world>`, the same in both worlds). A
compiler message on the page starts with `Program.cs`; line and column
count from the top of the cell.

| Number or message | Source |
|---|---|
| 1 to 100 | `guess-my-number-3` (the program's first line) |
| WREN, OTTER, FOX and an empty array (the reader's guesses) | the solution of `your-turn-1` gives 3, 0, -1, -1 in the table |
| CS0161 in hint 2 (the code only) | probe `l-no-return-after-loop`, in the browser too |
| fifteen, then seven, three and one | the picture; `how-much-work-is-binary-search-1` (`15 items: 7 3 1 0. At most 4 looks.`) |
| 31 found by the first look; 3 takes four looks | the picture's rows; the solution of `your-turn-2` (7, -1, 0, 14, -1 in the table) |
| CS0019 at (3,19) and its text | `searching-words-1` |
| -10, then 10 and 0 | `searching-words-2` |
| the second search gives -1 | `searching-words-3` (4, then -1) |
| `KHOOR with shift 1 is JGNNQ`; the last line is 3 | the solution of `your-turn-3--secret-messages` |
| 30,000 words: at most 15 looks | `how-much-work-is-binary-search-1` (`30000 items: ... At most 15 looks.`) |
| `100 lit pixels, from 0 to 9999`; `True, False, True, True, False` | the solution of `your-turn-3--pixel-art` |
| at most 7 looks among these 100 | `how-much-work-is-binary-search-1` (`100 items: ... At most 7 looks.`) |
| a million items: at most 20 looks | `how-much-work-is-binary-search-1` (`1000000 items: ... At most 20 looks.`) |
| 3, 7, -6 | `searches-csharp-has-1` |
| seven guesses; 100, then 50, 25, 12, 6, 3 and 1 | `how-much-work-is-binary-search-1` (`100 items: 50 25 12 6 3 1 0. At most 7 looks.`) |
| 334, 0 to 999, 201 and 8 | `putting-it-together-1` |
| the challenge's "closer to 7" | `how-much-work-is-binary-search-1` (100 items) |
| practice 1: -1 as an index stops with an `IndexOutOfRangeException` | `lists-and-sequences-practice`, cell `which-element-2`, recorded there |
| practice 2: 1, 100, 100, 50.5 | `counting-looks-1` |
| practice 3: 3; `Array.LastIndexOf` gives 3 too | the two solutions of `the-last-one-1` (3, 4, -1, -1 in the table) |
| practice 4: `low` 0, 8, 12; `high` 14; indexes 7, 11, 13 holding 31, 55, 72; three looks | `a-trace-1` |
| practice 5: -1 | `not-sorted-1` (9, 5, 1 and 3 in the fold are the array's own elements) |
| practice 6: 6 and 6.5; CS0266 at (3,11) and its text | `a-middle-with-a-point-1`, `a-middle-with-a-point-2` |
| practice 7: 2,147,483,647; -194967296, -97483648; 2050000000 | `a-middle-that-overflows-1` and its solution |
| practice 8: 10 and 20 | `at-most-1` |
| practice 9: 5 | the solution of `where-it-would-go-1` (5, 7, 0, 15, 0 in the table) |
| practice 9: -6, 5, -1 | `where-it-would-go-2` |
| practice 10: 0, 2, 3 | the solution of `every-place-1` |
| practice 11: 12 MEET; 13 | the solution of `the-first-one-past-a-line-1--secret-messages` (12 and 13 in the table) |
| practice 11: 5 128; 3 | the solution of `the-first-one-past-a-line-1--pixel-art` (5 and 3 in the table) |
| practice 12: HMS | `from-earlier-the-last-three-1` |
| practice 13: 0 5 | `from-earlier-a-method-and-an-array-1` |
| practice 14: B 1, A 3, N 2 | `from-earlier-a-count-that-starts-itself-1` |

Claims with no number that no page cell prints, each checked by a probe in
the browser: a `guess` made inside the loop gives CS0103
(`l-guess-inside-loop`); `"apple"` before `"Banana"` with `CompareTo`, and
after it with `CompareOrdinal`, and the two rules agreeing on the page's
capital words (`l-compare-rules`: -1, 31 and 0 pairs, culture `en-IE`);
for a letter that no word starts with, the two places are the same
(`p-where-it-goes-extra`: Q and R both 16); `~result` and `-result - 1`
give the same number (`p-where-it-goes-extra`: 5 and 5). See "Open" for
the fold.

The rest are the tasks' own numbers, carried from dewlab, or arithmetic in
the prose: 50, the middle of 1 to 100; 10 items and a million, in the
definition of O(n); 10,000 pixels, 100 by 100; the shifts 0 to 25 and the
26 letters; 30,000 words, a size; 2 × 2 × 2 × 2 × 2 × 2 = 64 and 128;
2¹⁰ = 1,024 and 2²⁰ = 1,048,576; (1 + 2 + … + 100) / 100 = 50.5, which
`counting-looks-1` also prints; 2 June 2006, a date.

## Page behaviour, checked when it moved

The porter listed these under "Once the page UI exists". Each was looked
at in headless Chromium on the real server (`tools/serve.mjs --isolate`),
at 390 pixels wide unless it says otherwise.

- **The game with real typing, and End input.** Typing 50, then 25, then
  pressing **End input** shows `Your guess: 50`, `Higher than 50`, `Your
  guess: 25`, `Higher than 25`, `Your guess: `, and the state line says
  "Ran.". The `ArgumentNullException` the porter expected is gone, since
  the cell now stops when `ReadLine` gives `null`.
- **The 100-number `stdin:` line.** The cell has no `stdin:` now. Neither
  page's text contains "stdin" in either world.
- **Practice 11 (secret messages), Compare with a solution on the
  starter.** The table shows `0` against `12`, and "did not compile:
  CS0103 (The name 'WhereItGoes' does not exist in the current context)"
  against `13`, each row marked "different", and under it "2 rows are
  different. What does your code do with those inputs?". It reads as
  information about the reader's code, and it names the method to copy,
  as hint 2 does.
- **`range-collapsing.svg`** draws in the light and the dark theme (670 by
  256, shown 361 pixels wide), with its labels ("15 left, then 7" to
  "found 3") readable in both. Its description is the alt text, 197
  characters.
- **`"apple".CompareTo("Banana")` in the browser engine** is -1, as
  natively (probe `l-compare-rules`), so the fold is true on the page.
- **The choice predicts whose answer is "A number below zero".** Not
  clicked through; read from `guessMatches` in `web/page/lesson.js`
  (decision 37). A choice counts as the same as the output only when it
  equals a line of it. `searches-csharp-has-1` prints 3, 7 and -6, so none
  of its three options equals a line, and the page asks "Which line
  explains what you saw?" whichever the reader chose. The same holds for
  practice 7 ("A number below zero") and practice 14 ("B 1, then A 3, then
  N 2", three lines). The page shows the guess and the output side by side
  either way, with no mark. See "Open".
- **The new halving cell**: its long lines wrap inside the output at 390
  pixels, with no sideways scroll, in both themes.

## The porter's questions, and what was decided

1. **The opening game's random output.** *Decided by the course map's
   principles and the playbook:* the map says "`Random.Shared` is for
   games the reader plays", and the playbook says to run the checker
   until it passes without `--write`, and not to change the checker or
   the format to make a lesson pass. Choice (a) is a format change, and
   (c) gives every learner the same secret. Choice (b) keeps both, and it
   is the shape `a-program-of-your-own` already teaches (a loop that stops
   at `null`). The cell is now (b), with no `stdin:`; see "What was done
   when it moved". It departs from the course map entry's "with `stdin:`"
   (see "Open").
2. **`int.Parse` or `int.TryParse`.** *Decided by the style guide's
   `#code`* ("`int.Parse` first, then `int.TryParse` once the page has met
   input that won't convert") *and the playbook* ("with `int.Parse` until
   the page has met `TryParse`"): no cell on this page meets input that
   won't convert, so `int.Parse` stays, and the prose still names the
   `FormatException`. The part about **End input** is settled by question
   1: the loop now stops at `null`, so a `TryParse` version would not
   loop for ever either.
3. **The id `guess-my-number-3`.** *Decided by the course map* ("one
   interactive cell with a new id") *and the playbook's checklist*
   ("dewlab's where the task is the same"): `guess-my-number-1` and `-2`
   are dewlab's ids for other tasks (choosing the number; one guess), so
   the cell takes the next number rather than claim one of them.
   Renaming it costs nothing until a class has used the page.
4. **Numbers in folds that no page cell prints.** *Decided by decision
   29* ("A number the prose needs is printed by a cell ... every number in
   a fold is in the recorded outputs, with no hidden cell"): practice 2, 4
   and 8 have a checking cell under the question, the lesson's
   "Divide and conquer" fold reads the new halving cell, practice 1 points
   to where its exception is recorded, and practice 5 tells its trace with
   the array's elements. The problems still ask for paper first.
5. **Practice 7's source.** Open (below).
6. **Practice 13 in place of dewlab's generator problem.** *Decided by the
   course map:* `grids-and-references` *replaces* dewlab's
   `comprehensions-and-grids` (PDP row 16), so the "from earlier" problem
   that came from that page now comes from its replacement, and its
   principles ask for "two or three problems from earlier pages". The
   problem stays.
7. **Links.** *Decided by decisions 32 and 39 and the list of pages
   moving in this round:* every name that is in `lessons/` or on the list
   is a link now, and *Reading input* and *Types and their sizes* stay in
   italics.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **A game with a random secret, and the checker.** The course map's
  entry says the opening game has `stdin:`. With `Random.Shared`, a typed
  game's output depends on the secret, and the checker, which compares
  every cell's output exactly, cannot pass it. The page stops at `null`
  and has no `stdin:`, so the checker records the first two lines. Other
  games will meet the same (`reading-input` is planned with "a loop that
  asks again"). This wants a numbered entry in `DECISIONS.md`, either
  "a cell whose output depends on chance has no `stdin:`, and stops at
  `null`" (what this page does, at no cost to the format) or a header
  such as `output: varies` that compares only the outcome (a change to
  the format, the parser and the checker), and a line in the course map's
  entry. `DECISIONS.md` and the course map were not changed here, because
  other pages move at the same time.
- **Practice 7's source.** The solution note names Joshua Bloch and the
  Google Research blog post of 2 June 2006. The post says the bug was in
  Java's library for "nine years or so"; the page says "for years", to
  keep a number that no cell prints out of the prose. Keep, shorten, or
  drop the note?
- **Choice predicts whose options describe the output.**
  `searches-csharp-has-1` ("A number below zero, but not -1"), practice 7
  ("A number below zero") and practice 14 ("B 1, then A 3, then N 2")
  never equal a line of the output, so the page asks "Which line explains
  what you saw?" after every choice (decision 37). The dictionaries page
  left the same question open. A change would be to decision 37, not to
  this page.
- **The fold "Why CompareOrdinal?"** says that `"apple"` comes before
  `"Banana"` with `CompareTo`, and after it with `CompareOrdinal`. No page
  cell prints this; a probe shows it is true in the browser. Showing it
  would need a cell in or after the fold, and the fold is a "why" aside.
  `putting-things-in-order` relies on the same sentence. Decision 29
  covers numbers in folds; it does not say whether an order like this
  counts.
- **The lesson's table became a cell.** dewlab's table under "How much
  work is binary search?" (500,000; 250,000; about 1,000; about 1) is now
  `how-much-work-is-binary-search-1`, which halves with whole numbers, so
  its twentieth look leaves 0 where the table said "about 1". The course
  map says "The Big O paragraphs stay", and they do. If the table is
  wanted back, it needs its numbers from a cell (decision 29), such as a
  `double` version of the same loop.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
tests an alternative for a reviewer. Run them with the same NativeCheck
command, passing `NOTES.md` as the file. The cells with `expect:` fail on
purpose. None of them is part of either page.

When the lesson moved, all 20 were run in the browser, in a scratch lesson
made from this section (`node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`), and each gave the same output, diagnostics
and exception as the native check did (the lines are one more than a page
cell's where a probe starts with a comment line). The typed probe
`l-opener-ends-played` showed each guess after its prompt in the browser,
and ended at a different secret, as it does on every run. The numbers
that stayed in the prose are now printed by a page cell (see "Where each
number and message in the prose comes from"), so these cells are a record,
and the source only of the claims with no number listed there.

```csharp exec
id: l-guess-inside-loop
expect: CS0103
// Lesson, opening: a variable made inside the do body is not there for the while line.
int secret = 42;
do
{
    int guess = int.Parse(Console.ReadLine());
}
while (guess != secret);
```

```csharp exec
id: l-no-return-after-loop
expect: CS0161
// Lesson, your turn 1, second hint: without the return after the loop, CS0161.
static int LinearSearch(string[] items, string target)
{
    for (int index = 0; index < items.Length; index++)
    {
        if (items[index] == target)
        {
            return index;
        }
    }
}

string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
Console.WriteLine(LinearSearch(names, "WREN"));
```

```csharp exec
id: l-else-return
// Lesson, your turn 1, solution note: return -1 as an else gives CS0162 and -1 for WREN.
static int LinearSearch(string[] items, string target)
{
    for (int index = 0; index < items.Length; index++)
    {
        if (items[index] == target)
        {
            return index;
        }
        else
        {
            return -1;
        }
    }
    return -1;
}

string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
Console.WriteLine(LinearSearch(names, "WREN"));
```

```csharp exec
id: l-picture-trace
// Lesson, the picture and your turn 2's note: the ranges searching for 3, and the looks for 3, 31 and 89.
int[] items = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
foreach (int target in new int[] { 3, 31, 89 })
{
    int low = 0;
    int high = items.Length - 1;
    int looks = 0;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        looks++;
        Console.WriteLine($"target {target}: low {low}, mid {mid}, high {high}, {high - low + 1} left, items[mid] is {items[mid]}");
        if (items[mid] == target) break;
        else if (target < items[mid]) high = mid - 1;
        else low = mid + 1;
    }
    Console.WriteLine($"target {target}: {looks} looks");
}
```

```csharp exec
id: l-high-equals-mid
// Lesson, your turn 2, solution note: with high = mid, searching for 5 in { 3, 7, 11, 15, 19 } stops shrinking.
int[] items = { 3, 7, 11, 15, 19 };
int target = 5;
int low = 0;
int high = items.Length - 1;
for (int step = 1; step <= 6 && low <= high; step++)
{
    int mid = (low + high) / 2;
    Console.WriteLine($"step {step}: low {low}, mid {mid}, high {high}");
    if (items[mid] == target) break;
    else if (target < items[mid]) high = mid;
    else low = mid + 1;
}
```

```csharp exec
id: l-compare-rules
// Lesson, "Why CompareOrdinal?": the two rules on apple and Banana, and on the page's capital words.
Console.WriteLine("apple".CompareTo("Banana"));
Console.WriteLine(string.CompareOrdinal("apple", "Banana"));
string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST", "M", "N"
};
int differ = 0;
foreach (string first in words)
{
    foreach (string second in words)
    {
        if (Math.Sign(first.CompareTo(second)) != Math.Sign(string.CompareOrdinal(first, second))) differ++;
    }
}
Console.WriteLine($"pairs where the two rules differ: {differ}");
Console.WriteLine(System.Globalization.CultureInfo.CurrentCulture.Name);
```

```csharp exec
id: l-max-looks
// Lesson and practice: the most looks binary search needs, over every target that is there and many that are not.
static int Looks(int[] items, int target)
{
    int low = 0;
    int high = items.Length - 1;
    int looks = 0;
    while (low <= high)
    {
        looks++;
        int mid = (low + high) / 2;
        if (items[mid] == target) return looks;
        else if (target < items[mid]) high = mid - 1;
        else low = mid + 1;
    }
    return looks;
}

foreach (int size in new int[] { 100, 334, 1000, 30000, 1000000 })
{
    int[] items = new int[size];
    for (int i = 0; i < size; i++) items[i] = i * 2;
    int most = 0;
    for (int target = -1; target <= size * 2; target++)
    {
        most = Math.Max(most, Looks(items, target));
    }
    Console.WriteLine($"{size} items: at most {most} looks");
}
```

```csharp exec
id: l-halving-table
// Lesson, "How much work is binary search?": 1,000,000 halved 1, 2, 10 and 20 times; and powers of 2.
double left = 1000000;
for (int step = 1; step <= 20; step++)
{
    left = left / 2;
    if (step == 1 || step == 2 || step == 10 || step == 20) Console.WriteLine($"{step} steps: {left}");
}
Console.WriteLine($"{Math.Pow(2, 6)} {Math.Pow(2, 7)} {Math.Pow(2, 10)} {Math.Pow(2, 20)}");
```

```csharp exec
id: l-game-guesses
// Lesson, "Divide and conquer" and the challenge: always guessing the middle of 1 to 100.
int most = 0;
int total = 0;
for (int secret = 1; secret <= 100; secret++)
{
    int low = 1;
    int high = 100;
    int count = 0;
    while (true)
    {
        int guess = (low + high) / 2;
        count++;
        if (guess == secret) break;
        else if (guess < secret) low = guess + 1;
        else high = guess - 1;
    }
    most = Math.Max(most, count);
    total += count;
}
Console.WriteLine($"at most {most} guesses, {total} in all, average {total / 100.0}");
```

```csharp exec
id: l-game-worst-path
// Lesson, "Divide and conquer" fold: how many numbers are left before each guess, for a secret that needs seven.
int secret = 100;
int low = 1;
int high = 100;
int guess = 0;
do
{
    guess = (low + high) / 2;
    Console.WriteLine($"{high - low + 1} left, guess {guess}");
    if (guess < secret) low = guess + 1;
    else if (guess > secret) high = guess - 1;
}
while (guess != secret);
```

```csharp exec
id: l-putting-together-spread
// Lesson, "Putting it together": binary search's comparisons for every target in the array, and for ones that are not there.
static int BinarySearchCounted(int[] items, int target)
{
    int comparisons = 0;
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        comparisons++;
        int mid = (low + high) / 2;
        if (items[mid] == target) return comparisons;
        else if (target < items[mid]) high = mid - 1;
        else low = mid + 1;
    }
    return comparisons;
}

int[] data = new int[334];
for (int index = 0; index < data.Length; index++) data[index] = index * 3;
int[] howMany = new int[12];
foreach (int target in data) howMany[BinarySearchCounted(data, target)]++;
for (int c = 1; c < 12; c++) if (howMany[c] > 0) Console.WriteLine($"{c} comparisons: {howMany[c]} targets");
int missingLeast = 99;
int missingMost = 0;
for (int target = -1; target <= 1000; target++)
{
    if (target % 3 == 0 && target >= 0 && target <= 999) continue;
    int c = BinarySearchCounted(data, target);
    missingLeast = Math.Min(missingLeast, c);
    missingMost = Math.Max(missingMost, c);
}
Console.WriteLine($"targets not there: {missingLeast} to {missingMost}");
int linearFewer = 0;
for (int index = 0; index < data.Length; index++) if (index + 1 < BinarySearchCounted(data, data[index])) linearFewer++;
Console.WriteLine($"targets where linear search makes fewer: {linearFewer}");
```

```csharp exec
id: l-challenge-starter
// Lesson, the challenge: the starter exactly as on the page. It compiles with no warning, and prints 1.
// Guess my number, played by the computer, for every secret from 1 to 100.
static int GuessesNeeded(int secret)
{
    int low = 1;
    int high = 100;
    int count = 0;
    int guess = (low + high) / 2;    // the first guess: the middle
    count++;
    // Can you keep guessing the middle of what is left, until the guess is the secret?
    return count;
}

Console.WriteLine(GuessesNeeded(50));
```

```csharp exec
id: l-challenge-solved
// Lesson, the challenge: one way to finish it.
static int GuessesNeeded(int secret)
{
    int low = 1;
    int high = 100;
    int count = 0;
    int guess = 0;
    do
    {
        guess = (low + high) / 2;
        count++;
        if (guess < secret) low = guess + 1;
        else if (guess > secret) high = guess - 1;
    }
    while (guess != secret);
    return count;
}

int total = 0;
for (int secret = 1; secret <= 100; secret++) total += GuessesNeeded(secret);
Console.WriteLine(GuessesNeeded(50));
Console.WriteLine(total / 100.0);
```

```csharp exec
id: l-opener-ends-on-no-input
// Open question 1, choice (b): the opening game, stopping when ReadLine gives null. With no stdin, its output is the same on every run.
int secret = Random.Shared.Next(1, 101);
int tries = 0;
int guess = 0;
Console.WriteLine("I am thinking of a whole number from 1 to 100.");
do
{
    Console.Write("Your guess: ");
    string answer = Console.ReadLine();
    if (answer == null)
    {
        break;
    }
    guess = int.Parse(answer);
    tries++;
    if (guess < secret)
    {
        Console.WriteLine($"Higher than {guess}");
    }
    else if (guess > secret)
    {
        Console.WriteLine($"Lower than {guess}");
    }
    else
    {
        Console.WriteLine($"Yes! {guess} it is. That took {tries} tries.");
    }
}
while (guess != secret);
```

```csharp exec
id: l-opener-ends-played
stdin: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75\n76\n77\n78\n79\n80\n81\n82\n83\n84\n85\n86\n87\n88\n89\n90\n91\n92\n93\n94\n95\n96\n97\n98\n99\n100\n"
// Open question 1, choice (b), with guesses typed: it plays to the end as the page's version does.
int secret = Random.Shared.Next(1, 101);
int tries = 0;
int guess = 0;
Console.WriteLine("I am thinking of a whole number from 1 to 100.");
do
{
    Console.Write("Your guess: ");
    string answer = Console.ReadLine();
    if (answer == null)
    {
        break;
    }
    guess = int.Parse(answer);
    tries++;
    if (guess < secret)
    {
        Console.WriteLine($"Higher than {guess}");
    }
    else if (guess > secret)
    {
        Console.WriteLine($"Lower than {guess}");
    }
    else
    {
        Console.WriteLine($"Yes! {guess} it is. That took {tries} tries.");
    }
}
while (guess != secret);
```

```csharp exec
id: p-minus-one-index
expect: exception
// Practice 1: a program that uses -1 as an index stops with an IndexOutOfRangeException.
string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
int place = Array.IndexOf(names, "FOX");
Console.WriteLine(place);
Console.WriteLine(names[place]);
```

```csharp exec
id: p-counting-looks
// Practice 2: linear search on 100 items: first, last, not there, and the average.
static int LinearSearchCounted(int[] items, int target)
{
    int comparisons = 0;
    for (int index = 0; index < items.Length; index++)
    {
        comparisons++;
        if (items[index] == target) return comparisons;
    }
    return comparisons;
}

int[] items = new int[100];
for (int i = 0; i < 100; i++) items[i] = i + 1;
Console.WriteLine(LinearSearchCounted(items, 1));
Console.WriteLine(LinearSearchCounted(items, 100));
Console.WriteLine(LinearSearchCounted(items, 500));
int total = 0;
foreach (int target in items) total += LinearSearchCounted(items, target);
Console.WriteLine(total / 100.0);
```

```csharp exec
id: p-traces
// Practice 4 and 5: the indexes binary search checks, for 72 in the sorted array and for 3 in { 5, 1, 9, 3, 7 }.
static void Trace(int[] items, int target)
{
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        Console.WriteLine($"checks index {mid}, which holds {items[mid]}; low {low}, high {high}");
        if (items[mid] == target) { Console.WriteLine("found"); return; }
        else if (target < items[mid]) high = mid - 1;
        else low = mid + 1;
    }
    Console.WriteLine("not found: -1");
}

Trace(new int[] { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 }, 72);
Trace(new int[] { 5, 1, 9, 3, 7 }, 3);
```

```csharp exec
id: p-where-it-goes-extra
// Practice 9 and 11, and the lesson's reading list: Array.BinarySearch for targets that are not there, ~, and letters no word starts with.
int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(Array.BinarySearch(sortedNumbers, 20));
Console.WriteLine(~Array.BinarySearch(sortedNumbers, 20));
Console.WriteLine(-Array.BinarySearch(sortedNumbers, 20) - 1);
Console.WriteLine(Array.BinarySearch(sortedNumbers, 100));

static int WhereItGoes(string[] items, string target)
{
    int low = 0;
    int high = items.Length;
    while (low < high)
    {
        int mid = (low + high) / 2;
        if (string.CompareOrdinal(items[mid], target) < 0) low = mid + 1;
        else high = mid;
    }
    return low;
}

string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST"
};
Console.WriteLine($"M {WhereItGoes(words, "M")}, N {WhereItGoes(words, "N")}, Q {WhereItGoes(words, "Q")}, R {WhereItGoes(words, "R")}");
```

```csharp exec
id: p-middle-values
// Practice 7: the largest int, and the middle of two large numbers both ways.
int low = 2_000_000_000;
int high = 2_100_000_000;
Console.WriteLine((low + high) / 2);
Console.WriteLine(low + (high - low) / 2);
Console.WriteLine(int.MaxValue);
```
