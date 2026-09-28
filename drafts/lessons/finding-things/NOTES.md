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

Files:

- `finding-things.md`: the lesson. 10 exec cells, 2 of them in world
  variants (9 tasks when the pair counts once); 3 predicts, 8 hints,
  4 solutions, 4 `inputs` blocks, 1 challenge, 2 folds. One cell is meant
  to fail (`searching-words-1`, `expect: CS0019`).
- `finding-things-practice.md`: the practice page, 14 problems. 13 exec
  cells, 2 of them in world variants; 3 predicts, 9 hints, 7 solutions,
  6 `inputs` blocks, 11 folds. One cell is meant to fail
  (`a-middle-with-a-point-2`, `expect: CS0266`).
- `range-collapsing.svg`: dewlab's picture. The labels are unchanged; the
  earlier run gave each CSS variable a fallback colour
  (`var(--dl-muted, #6b6b6b)`), as `lists-and-sequences` did for its
  picture, so that it draws when opened on its own.
- `finding-things.native.json`, `finding-things-practice.native.json`: what
  the native check recorded for every cell, solution and `inputs` row.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for
each page, and for the probes in this file.

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
(`a-total-that-starts-again`).

From pages not drafted, it relies on what the course map says they
teach: `do`...`while`, `Console.ReadLine()`, `int.Parse` and `TryParse`
(`reading-input`); `int.MaxValue` and a whole number that overflows
(`types-and-their-sizes`). Practice 7 defines *overflow* in its own fold,
in case that page uses another word.

### Links: decision 32

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
number (open question 2).

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
(probe `l-else-return`).

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
stay at 1 from the fourth step on).

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
that (see "Once the page UI exists").

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
`List<bool>`, which prints `True, False, ...`.

**How much work is binary search?** Unchanged but for "cuts in half"
(an idiom), now "removes half". Probes `l-halving-table` and
`l-max-looks`.

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
`l-game-worst-path` and `l-halving-table`.

**Putting it together.** `list(range(0, 1000, 3))` becomes a loop that
fills an `int[334]`, and the cell prints its length and its first and last
elements, so the 334 and 999 that dewlab gave in prose are recorded. The
predict stays. "Is there a target where linear search wins" became "makes
fewer comparisons" (a verdict word). "Most targets need 7 to 9, never more
than 9" is probe `l-putting-together-spread` (271 of 334 need 7 to 9; a
target that is not there needs 8 or 9; for 6 targets linear search makes
fewer comparisons, which the page leaves the reader to find).

**Looking back.** The question and the challenge stay. The earlier draft's
starter had two CS0219 warnings (`low` and `high` unused). The starter now
makes the first guess, `int guess = (low + high) / 2;`, and returns 1, so
it compiles with no warning (probe `l-challenge-starter`) and gives the
reader a first step. Probe `l-challenge-solved` shows one way to finish
it: the average is 5.8, which the page does not state. The closing names
the practice page (a link) and *Sorting* (italics).

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
| 1. Why -1 | 1 | The fold says C#'s side: using -1 as an index stops with an `IndexOutOfRangeException` (probe `p-minus-one-index`), where Python reads it as the last element. |
| 2. Counting looks | 2 | "Looks at a list" became "checks an array". Numbers: probe `p-counting-looks`. |
| 3. The last one | 3 (`the-last-one-1`) | `LastIndex(int[] items, int target)`, a stub that compiles, a hint that asks a question, and an empty-array input. The second solution also prints `Array.LastIndexOf(numbers, 4)`, 3. |
| 4. A trace | 4 | Unchanged; probe `p-traces`. |
| 5. Not sorted | 5 (`not-sorted-1`) | A sentence before the cell says the array is not in order (dewlab had none). "An error" became "It stops with an exception". The fold names the two indexes checked (probe `p-traces`). "Wrong answers without complaint" became "can say *not there* about a target that is there, and nothing warns you". |
| 6. A middle with a point | 6, "Why //" | Python needed `//` because `/` gives a float. C# needs nothing, so the problem turns round: `a-middle-with-a-point-1` prints `(0 + 13) / 2` and `/ 2.0` (6 and 6.5), and `a-middle-with-a-point-2` (`expect: CS0266`) keeps the 6.5 in an `int`. Python's run-time `TypeError` becomes a compiler error. |
| 7. A middle that overflows | new | The course map's added problem. `low + high` overflows; the cell prints the sum and the middle, so both numbers in the fold are recorded. The task is `low + (high - low) / 2`. The solution note cites Joshua Bloch's post on the Google Research blog, 2 June 2006 (fetched 27 September 2026), without its "nine years or so". |
| 8. At most | 7 | Unchanged; probes `l-max-looks` and `l-halving-table`. |
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
(lesson), and *overflows* (practice 7).

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

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. On the page, a compiler
message starts with `Program.cs`; the native check labels it with the cell
id. Line and column match.

| Number or claim | Source |
|---|---|
| 1 to 100 | `guess-my-number-3` (the program's first line) |
| CS0103 if `guess` is made inside the loop | probe `l-guess-inside-loop` |
| WREN 3, OTTER 0, FOX -1, empty -1 | solution of `your-turn-1` (inputs) |
| CS0161 without the return after the loop | probe `l-no-return-after-loop` |
| CS0162 under `index++`; WREN gives -1 | probe `l-else-return` |
| 15, 7, 3, 1 in the picture | probe `l-picture-trace` |
| 31 at once; 3 and 89 take four looks | probe `l-picture-trace`; solution of `your-turn-2` (7, 0, 14) |
| `low`, `mid`, `high` stay at 1 | probe `l-high-equals-mid` |
| CS0019 at (3,19) and its text | lesson cell `searching-words-1` |
| -10, 10, 0; E is 10 places before O | lesson cell `searching-words-2` |
| 4 and -1 (`"noon"`) | lesson cell `searching-words-3` |
| apple before Banana with `CompareTo`, after with `CompareOrdinal`; the rules agree on capitals | probe `l-compare-rules` |
| `KHOOR with shift 1 is JGNNQ`; 3 | solution of `your-turn-3--secret-messages` |
| 30,000 words: at most 15 looks | probe `l-max-looks` |
| `True, False, True, True, False` | solution of `your-turn-3--pixel-art` |
| at most 7 looks among 100 | probe `l-max-looks` |
| 500,000; 250,000; about 1,000; about 1 | probe `l-halving-table` |
| a million items: at most 20 | probe `l-max-looks` |
| 3, 7, -6 | lesson cell `searches-csharp-has-1` |
| at most seven guesses; 100, 50, 25, 12, 6, 3, 1; 64 and 128 | probes `l-game-guesses`, `l-game-worst-path`, `l-halving-table` |
| 334, 0 to 999, 201 and 8 | lesson cell `putting-it-together-1` |
| 7 to 9 for most targets, never more than 9 | probe `l-putting-together-spread` |
| the challenge starter compiles with no warning | probe `l-challenge-starter` |
| `~result` and `-result - 1` agree | probe `p-where-it-goes-extra` |
| practice 1: -1 as an index stops with `IndexOutOfRangeException` | probe `p-minus-one-index` |
| practice 2: 1, 100, 100, 50.5 | probe `p-counting-looks` |
| practice 3: 3, 4, -1, -1; `Array.LastIndexOf` gives 3 | solutions of `the-last-one-1` |
| practice 4: indexes 7, 11, 13; 31 and 55 | probe `p-traces` |
| practice 5: -1; 9 at index 2, then 5 | practice cell `not-sorted-1`; probe `p-traces` |
| practice 6: 6 and 6.5; CS0266 at (3,11) and its text | practice cells `a-middle-with-a-point-1`, `a-middle-with-a-point-2` |
| practice 7: 2,147,483,647 | probe `p-middle-values` |
| practice 7: -194967296, -97483648; 2050000000 | practice cell `a-middle-that-overflows-1` and its solution |
| practice 8: 10 and 20; 1,024 and 1,048,576 | probes `l-max-looks`, `l-halving-table` |
| practice 9: 5, 7, 0, 15, 0 | solution of `where-it-would-go-1` (inputs) |
| practice 9: -6, 5, -1 | practice cell `where-it-would-go-2` |
| practice 10: 0, 2, 3 | solution of `every-place-1` |
| practice 11: 12 MEET; 13 | solution of `the-first-one-past-a-line-1--secret-messages` (inputs) |
| practice 11: Q and R give the same place | probe `p-where-it-goes-extra` |
| practice 11: 5 128; 3 | solution of `the-first-one-past-a-line-1--pixel-art` (inputs) |
| practice 12: HMS | practice cell `from-earlier-the-last-three-1` |
| practice 13: 0 5 | practice cell `from-earlier-a-method-and-an-array-1` |
| practice 14: B 1, A 3, N 2 | practice cell `from-earlier-a-count-that-starts-itself-1` |

## Once the page UI exists

- Play the opening game with real typing, and press **End input** during
  it: `int.Parse(null)` stops with an `ArgumentNullException`, which the
  prose does not mention (open question 2).
- The opening cell's `stdin:` line is 100 numbers long. It is for the
  checker only; confirm the page never shows it.
- Practice 11 (secret messages): the reader's column shows a compiler
  error for the `WhereItGoes(words, "N")` row until the method is written.
  Check that this reads as information, not as a fault.
- `range-collapsing.svg` with the page's CSS variables, in light and dark
  themes.
- `"apple".CompareTo("Banana")` in the browser engine: the fold relies on
  ICU with en-IE. It is -1 natively; if the browser gives a number above
  zero, the fold is not true on the page.
- The predicts' notes after a run, particularly the choice predicts whose
  answer is "A number below zero".

## Open questions for a reviewer

1. **The opening game's output is random, and the browser checker compares
   outputs exactly.** `guess-my-number-3` uses `Random.Shared`, as the
   course map says, so each run records a different number of guesses.
   `npm run check-lessons` without `--write` will report a difference on
   every run, and the lesson cannot pass it as it is. The native check
   passes because it does not compare with a recorded file. Three ways out:
   (a) a header, such as `output: varies`, that tells the checker to
   compare only the outcome (a format change); (b) the version in probe
   `l-opener-ends-on-no-input`, which stops when `ReadLine` gives `null`,
   has no `stdin:`, and records only its first two lines, the same on
   every run (it is four lines longer, and it plays the game the same way
   with typed guesses: probe `l-opener-ends-played`); (c) `new Random(42)`
   for the checker's sake, which would give every learner the same secret.
   I kept the map's version and did not change the checker or the format.
2. **`int.Parse` or `int.TryParse` in the opening game.** The style guide
   says `TryParse` once the page has met input that won't convert, and
   `reading-input` meets it. I kept `int.Parse` to keep the first cell
   short (it is already 20 lines of code), and the prose says what happens
   with text that is not a number. `TryParse` needs a guard against `null`
   too, or the loop never ends after **End input**.
3. **The id `guess-my-number-3`.** It is new, as the map asks. A reviewer
   may prefer a name that does not suggest cells 1 and 2 exist on the page.
4. **Numbers in folds that no page cell prints** (course map, open question
   7). Practice 1, 2, 4 and 8, and the lesson's "Divide and conquer" fold,
   are problems for paper, as in dewlab, so their numbers are backed by
   probes here, not by a page cell. Decision 29 would have a cell print
   them. A checking cell after each would do it, at the cost of turning a
   paper problem into a coding one.
5. **Practice 7's source.** The solution note names Joshua Bloch and the
   Google Research blog post of 2 June 2006. The post says the bug was in
   Java's library for "nine years or so"; the page says "for years", to
   keep a number that no cell prints out of the prose. Keep, shorten, or
   drop the note?
6. **Practice 13 replaces dewlab's generator problem** with one from
   `grids-and-references`. `grids-and-references-practice` has problems of
   the same kind; a reviewer may prefer a different earlier page.
7. **Links.** The brief asked for `lesson:` links; decision 32 asks for
   italics until a page is in `lessons/`. I followed decision 32. The
   table under "Links" lists the eight names to turn into links.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
tests an alternative for a reviewer. Run them with the same NativeCheck
command, passing `NOTES.md` as the file. The cells with `expect:` fail on
purpose. None of them is part of either page.

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
