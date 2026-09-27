# repeating-yourself: notes for a reviewer

Ported from dewlab `tutorials/repeating-yourself/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file. The brief is the
course map's entry (`planning/COURSE_MAP.md`, PDP row 10): action *adapt*,
shape *tutorial*, size M, batch 2, depends on `storing-and-computing`. No
earlier draft of this page existed, so both pages were written from the
start in this run.

Files:

- `repeating-yourself.md`: the lesson. 17 exec cells, 8 of them in world
  variants (13 tasks when a pair of variants counts once); 3 predicts, 11
  hints, 9 solutions, 1 challenge. No cell is meant to fail.
- `repeating-yourself-practice.md`: the practice page, 21 problems. 17 exec
  cells, 2 of them in world variants; 3 predicts, 5 hints, 15 solutions. No
  cell is meant to fail.
- `repeating-yourself.native.json`, `repeating-yourself-practice.native.json`:
  what the native check recorded for every cell, solution and `inputs` row.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for the
two pages together, for each page with `--json`, and for the probes in this
file.

## Frontmatter

- `title`: "Loops: repeating steps with while and for", the course map's
  title. dewlab's was "Repeating steps with loops".
- `covers: [PDP-LO6, PDP-LO7]`, from the course map. dewlab gives outcomes
  for each section: PDP-LO6 for the while, for and nested-loop sections,
  and MIT-6.7 and MIT-6.4 (maths outcomes of the integrated course) for the
  for loop, sigma and counting sections. The MIT outcomes go with the
  maths (course map, "What changes because of C#", last bullet).
- `year:` is dropped: the format has no such field.
- The practice page has `from: repeating-yourself-practice` (dewlab's id
  for it, as the other drafts do) and `practice_for: repeating-yourself`.
  Its title is "Loops: practice", in the pattern of "Decisions: practice".
- The worlds are dewlab PDP's two, secret messages and pixel art, with
  dewlab's descriptions, as the other PDP drafts have them.

## What changed, and why

### What the reader already knows

PDP's order is `first-steps`, `powers-in-csharp`, `storing-and-computing`,
`compiler-errors`, `dividing-in-csharp`, `types-and-their-sizes`,
`making-decisions`, `equals-three-ways`, `reading-an-error-message`, then
this page. Of those, `storing-and-computing`, `dividing-in-csharp`,
`powers-in-csharp`, `making-decisions`, `equals-three-ways` and
`reading-an-error-message` are drafted; `first-steps`, `compiler-errors`
and `types-and-their-sizes` are not. From the drafts, the reader has met:
typed variables, `char` arithmetic and casts in the Caesar shift, `%` and
its negative remainder with the `+ 26` fix, `Console.Write` and
`Console.WriteLine`, `$"..."`, `word[0]`, strings that cannot be changed
(CS0200 on the `storing-and-computing` practice page), `long` (same
practice page), `if`, `else if` and `else` with braces, `&&`, `||` and
`!`, `char.IsUpper`, and the CS0219 warning on a stub.

`storing-and-computing` ends with a challenge (moving `CAT` one letter at a
time with `word[0]`) and the line "[The page on loops](lesson:repeating-yourself)
does the tedious part for you". This page opens by doing exactly that, and
links back to it.

### Links: back only, as the batch rule says

Batch rule 3: a lesson links back only to lessons of earlier batches. This
page is batch 2. It links to `storing-and-computing` (batch 1) in its
opening, and to its own practice page. The practice page links to
`first-steps` (batch 0), `storing-and-computing` and `dividing-in-csharp`
(batch 1). Everything else is plain text, and should become a link when
that page lands:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, for loops | "the page on arrays and lists shows why" | `lesson:lists-and-sequences` | 3 |
| lesson, nested loops | "the later pages about searching and sorting" | `lesson:finding-things`, `lesson:putting-things-in-order` | 5, 6 |
| lesson, "Looking back" | "The page on reading input uses it" (`do`...`while`) | `lesson:reading-input` | 4 |
| lesson, "Looking back" | "A later page, on writing your own methods" | `lesson:writing-your-own-functions` | 3 |
| practice 8 | "The page on arrays and lists meets them properly" | `lesson:lists-and-sequences` | 3 |
| practice 21 | "From the page on decisions" | `lesson:making-decisions` | 2 (same batch) |

Two earlier pages point here and need nothing: `storing-and-computing`'s
challenge already links here, and so do FOOP's
`the-moves-you-already-know` and its practice problem 10 (which uses
`step += 3`, taught here). `making-decisions`, in the same batch, says
"the page on loops" in plain text in its "Looking back"; its notes already
list that link as one to add. I did not edit either page: this run writes
only in this folder.

dewlab's links to `approaching-a-limit` (practice 7) and `venn-diagrams`
(practice 14) are gone. They are maths pages of the integrated course, and
no dewsharp course lists them.

### The lesson, section by section

**Opening (`a-loop-that-codes-1`).** The loop is in `char`, as the course
map asks: `foreach (char letter in word)`, `letter - 'A'`, and a cast back
to `char`, the way `storing-and-computing` wrote the Caesar shift. The text
predict stays. The prose shows the `foreach` line in a fence of its own and
says what it does; the name `foreach` comes in the for-loop section, after
the reader has seen it work (run first, then name). A new sentence says
that `coded + moved` makes a new string, because a string cannot be
changed: the course map lists immutable strings among C#'s differences, and
the reader met CS0200 on the `storing-and-computing` practice page. The
page defines *loop*, *repetition* and *iteration* here. *Iteration* is
there because FOOP's `the-moves-you-already-know` names the four moves
(storing, sequence, selection, iteration) and points to this page for
loops.

**While loops (`while-loops-repeat-until-done-1`).** Same program and
number predict. Two additions, both invitations to change the cell rather
than new cells:

- `int side = 64;` prints only `Done`. That shows that `while` checks
  before the body, and the page names it a *pre-test loop*, the
  descriptor's word (course map, "What C# adds": pre-test, post-test and
  counting loops).
- The loop that never ends: delete `side = side * 2;`, run it, and press
  **Stop**. The course map asks that "Stop is shown on a loop that never
  ends". It cannot be a cell of its own: the checker has no `expect:` for
  a program that is meant never to end, and NativeCheck would record a
  timeout as a problem. So the page invites the change, as dewlab's page
  did ("It is worth seeing once"). The probe `l-without-the-change` shows,
  with a guard, that `side` stays 1 and the condition stays true.

**Trace it by hand (`your-turn-1`).** Same cell, id and comment trace, with
`n` renamed `number` (the style guide: names that read as words, `i` for a
loop index only). The prose now says it prints 10. *Accumulator* is
defined on its own, as well as *accumulator pattern*.

**Shorter ways to change a variable (`shorter-ways-to-change-a-variable-1`,
new).** The course map says `i++` and `+=` appear here. They get one small
cell before the for loop needs them, with the long form in a comment.
`-=`, `*=`, `--` and `+=` on a string are named in a sentence; the probe
`l-string-plus-equals-char` runs them. `*=` is used in the factorial cell,
and `--` in the countdown.

**While your turn (`your-turn-2`, both worlds).** Same tasks, ids and
`inputs`. Each stub shows CS0219 (an unused variable), and the page says so
before the cell, in each world, as `making-decisions` does. Secret
messages: the solution keeps the moved letter in a variable, `char moved`,
so that the three parts of a while loop are each on a line of their own;
dewlab's one-line condition (`chr(...) != "E"`) would be a long cast in
C#. It adds 26 before `% 26`, the pattern from `storing-and-computing`,
though Q never needs it. The hint that said "does not give E yet" now says
"gives a letter other than E" (no *not yet*). A second hint names
`char moved`. Pixel art: `+=` and `++` in the solution. The first hint in
each world is now a question.

**For loops (`for-loops-when-you-know-how-many-times-1` and `-2`).** C#'s
for loop has three parts, and the page names each and then shows the same
loop as a while loop, as code to read: "These are the three things a while
loop needs, in one line." It names the for loop a *counting loop*
(descriptor's word) and `foreach` as the third loop. Cell `-2` became
three for loops with `Console.Write($"{i} ")` in place of
`print(i, end=" ")`: 1 to 5 with `<=`, 0 to 15 in fives, and the countdown
with `i--`. A sentence says each loop's `i` exists only inside that loop
(the probe `l-loop-variable-scope` fails with CS0103, as the closer look
`a-total-that-starts-again` will show). The `range` table is rebuilt: the
C# loop's shape, the values `i` takes, and Python's `range` in a last
column, "for readers who have used Python". It has a row for `<=`, which
Python has no form for, and a row counting down (the probe `l-table-rows`
runs each shape).

**For your turn (`your-turn-3`, both worlds).** Same tasks and ids. Secret
messages has two solutions: counting positions with an `int`, and counting
letters with a `char` (`for (char letter = 'A'; letter <= 'Z';
letter++)`), which C# allows and Python's `range` does not. Neither is "a
shorter way you'll meet later", so they have plain titles. dewlab's note
"Read from the right-hand column back to the left" became "Read each line
from its second letter to its first" (no *right*). Pixel art: dewlab's note
said the final `print()` stops "the next cell" continuing the row; in C#
each Run is a new program, so the note now says that anything printed
after the loop, in this program, would continue on the row.

**Sigma notation: gone.** The section, its three cells and the non-world
`your-turn-3`, `your-turn-4` and `your-turn-5` go, as the course map says
(MIT-6.4 is a maths outcome). The two things it asked to keep are here:

- the accumulator pattern, in "Trace it by hand";
- the paragraph on a product starting at 1, in a new short section,
  **Multiplying as you go** (`multiplying-as-you-go-1`, new): 5! with
  `product *= i`, then the question "Why does `product` start at 1?" and
  its answer in a fold (the probe `l-product-from-zero` prints `5! = 0`).
  The words "identity element" go with the maths. One sentence says that
  `!` means *not* in C#, since the reader met it on the decisions page.

The harmonic series moves to the practice page (problem 5), with `1 / i`.
The sum of 1 to 100 and 10! were already practice problems 4 and 6.

**Nested loops (`nested-loops-1`).** Same checkerboard, in C# with
`Console.Write`. 15 lines with braces on their own lines. The $n^2$
paragraph stays; its two links (searching, sorting) are plain text. The
probe `l-nested-count` counts the 32 times the `if` runs.

**Nested your turn (`your-turn-6`, both worlds).** Same tasks and ids.

**Counting with conditions (`building-up-gradually-counting-with-conditions-1`).**
The heading loses "Building up gradually", because *build up* is a phrasal
verb. The cell id keeps dewlab's, because ids are a contract and a teacher
compares the two pages by them. The cell is the same, with `&&` and
`Console.Write`.

**Counting your turn (`your-turn-7`, both worlds).** Same tasks, ids and
`inputs`. The second-tier solutions (`.count()`) go, as the course map
says; C#'s nearest is LINQ with a lambda, which the map leaves out of PDP
(open question 5). A second hint, after an error, names CS0019: a reader
from Python will write `letter == "E"`, and in C# a `char` and a `string`
cannot be compared with `==` (the probe `l-char-with-string`). The pixel
solution gains a note, since dewlab's had none on its first tier.

**Looking back.** The sigma question goes. In its place: when to choose a
for loop or a while loop, and a program that must run its body at least
once. That leads to one sentence on `do`...`while`, the post-test loop,
which `reading-input` teaches: so the page names all three loops the
descriptor lists. The challenge (every Caesar shift of `WKLV LV D VHFUHW`)
is in C#, with `+=` on a string; the probe `l-challenge-starter` shows the
starter code compiles and runs, and `l-challenge-answer` shows shift 3
gives `THIS IS A SECRET`. dewlab's "Next, Writing your own functions"
becomes "A later page, on writing your own methods" (the style guide says
*method*).

**Where to read more.** Khan Academy's sigma video goes with the section.
The Python tutorial becomes Microsoft's *Iteration statements* page. The
Veritasium video on Collatz stays: the practice page has the Collatz
problem.

### The practice page

The intro keeps dewlab's three questions (what the loop collects, what it
starts at, what makes it stop), each as its own question, and adds the
sentence on CS0219 that `making-decisions-practice` has.

1. **What a for loop gives** (`range-1`, was "What range gives"). `range(5, 5)`
   became `for (int i = 5; i < 5; i++)`, with a line after the loop so that
   the cell prints something. The text predict became a choice, because
   "nothing" is hard to type as a guess. The four follow-up ranges became
   four for-loop headers in a list. The fold names the pre-test again.
2. **How many numbers.** Same question, as two for loops. 100 each (probe
   `p-how-many`).
3. **The odd numbers.** Two solutions, one for each way dewlab's note
   described, so that "Compare with a solution" can show both. The step
   counts, 50 and 99, are from the probe `p-odd-steps`.
4. **One to a hundred.** Same, 5050. "The story goes" became "There is a
   story" (an idiom).
5. **A sum of fractions** (`a-sum-of-fractions-1`, new; replaces "Two
   sigmas"). The course map's added problem: the harmonic series with
   `1 / i`, which prints 1, as a choice predict. The fold explains
   whole-number division and shows `1.0 / i` (2.9289682539682538). dewlab's
   sum of squares from "Two sigmas" is gone with the sigma notation.
6. **Ten factorial.** Same, 3628800. New follow-up with a fold: 13! in an
   `int` prints 1932053504, because it passes `int.MaxValue`, and `long`
   gives 6227020800 (probe `p-thirteen-factorial`). An accumulator that
   grows too big is a C# surprise that Python's whole numbers never show.
7. **A sum that never settles.** Uses `1.0 / i`, after problem 5. About
   7.485 (the cell) and 9.788 (probe `p-ten-thousand-terms`). "More than
   $10^{43}$ terms to reach 100" is dewlab's; the probe prints the usual
   estimate, $e^{100 - 0.5772\ldots}$, which is 1.509…×10^43. That is an
   estimate from a formula, not a count.
8. **The largest.** The list became an array, `int[] numbers = { ... }`,
   with *array* defined in one sentence, as dewlab defined *list*. The stub
   starts `largest` at `numbers[0]`, because a C# stub must compile (dewlab's
   stub raised a NameError). So the problem asks, after the solution, why
   the cell does not start at 0, and a fold answers with `{ -3, -17, -4 }`
   (probe `p-largest-negative`, which also prints `numbers.Max()`).
9. **A loop that never ends.** Code to read, as in dewlab. The fold names
   **Stop**, and adds a C# case: `while (number > 0);` never ends either,
   with warning CS0642 (probe `p-semicolon-after-while`, with 0 so that it
   ends). The reader met CS0642 on `making-decisions-practice`, problem 18.
10. **Halving.** `x` became `number` (a double); `x // 2` became an `int`
    `/ 2`. Both halve seven times (probe `p-halving-values`).
11. **While or for.** Now three loops, with `foreach`. "one good answer"
    became "one answer", with the style guide's line.
12. **Past a million.** C# has `1_000_000` too. $2^{20}$ from the probe
    `p-two-to-twenty`.
13. **A triangle, and a triangle the other way.** C# has no `"#" * row`, so
    the first solution uses nested loops, and `new string('#', row)` is "a
    shorter way you'll meet later". "Aligned on the right" became "mirrored,
    so that every row ends in the same column" (no *right*). "Off-by-one
    slips live at the edges" became plain words.
14. **Three or seven.** Same, 43. The second tier (a generator in `sum`)
    goes, and so does the Venn link. The counts 33, 14 and 4 are from the
    probe `p-multiples`.
15. **Backwards** (both worlds). Same, with `letter + backwards`, a `char`
    plus a `string`.
16. **Five hundred primes.** Same algorithm, with `isPrime` and `divisor`
    for `is_prime` and `d`. 824693.
17. **Adding the digits.** `// 10` became `/ 10`, and the note says why
    that works in C#. 42.
18. **Up and down to one.** Same, with `/ 2`. 111 steps, 9232.
19. **From earlier: a remainder.** `200 // 60` became `200 / 60`; links to
    `first-steps`.
20. **From earlier: one letter back.** In `char`, with `+ 26`. The note adds
    what happens for C without `+ 26`: it prints `9` (probe `p-letter-c`).
    It links to `storing-and-computing` and `dividing-in-csharp`.
21. **From earlier: the order of the questions.** In C#, as code to read.
    Plain text to the decisions page (same batch).

### The glossary file

dewsharp has no glossary panel, so each term is defined in the prose where
it first appears. dewlab's entries: *while loop* (lesson, "While loops"),
*for loop* (lesson, "For loops"), *range()* (the table's Python column; C#
has no `range`), *accumulator pattern* (lesson, "Trace it by hand"),
*sigma notation* (gone), *product notation and factorial* (factorial in
"Multiplying as you go"; Π notation gone), *harmonic series* (practice 5),
*nested loops* (lesson), *iteration* (lesson, opening). New terms defined
on the lesson: loop, repetition, body (again), pre-test loop, counting
loop, accumulator, `foreach`, `+=`, `++`, `--`, `-=`, `*=`. On the
practice page: array, prime, inclusion–exclusion (named only, as dewlab
does).

## What C# made different, in short

- Three loops, not two: `while`, `for` with three parts, and `foreach` for
  the characters of a string. Python's `for ... in range(...)` becomes C#'s
  `for`, and Python's `for ... in word` becomes `foreach`.
- `++`, `--`, `+=`, `-=` and `*=`.
- `Console.Write` for `print(..., end="")`, and `Console.WriteLine()` to end
  a line.
- `1 / i` is 0 for every `i` above 1, and `/ 10` drops the last digit.
- An `int` accumulator can pass `int.MaxValue` without an error (13!).
- `letter == "E"` does not compile when `letter` is a `char` (CS0019).
- A `char` can be a loop's counter (`letter++`).
- A semicolon after `while (...)` is an empty body (CS0642).
- A string cannot be changed, so `coded + moved` makes a new one.
- No `"#" * row`: `new string('#', row)`, or a loop.
- Each Run is a new program, so the note about "the next cell" continuing
  a line went.

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. On the page, a compiler
message starts with `Program.cs`; the native check labels it with the cell
id. Line and column match.

| Number or claim | Source |
|---|---|
| `FDW` | lesson cell `a-loop-that-codes-1` |
| 2, 4, 8, 16, 32, 64, `Done`; 128 is the next doubling | lesson cell `while-loops-repeat-until-done-1` |
| with `int side = 64;`, only `Done` | probe `l-side-64` |
| without `side = side * 2;`, the condition stays true | probe `l-without-the-change` |
| 10 | lesson cell `your-turn-1` |
| 8, then 2; `-=`, `*=`, `--`, `+=` on a string | lesson cell `shorter-ways-to-change-a-variable-1`; probe `l-string-plus-equals-char` |
| CS0219 on the stubs | lesson cells `your-turn-2--*`, `your-turn-7--*`; practice stubs |
| shift 12 | solution of `your-turn-2--secret-messages` |
| 13 steps, 68 pixels | solution of `your-turn-2--pixel-art` and its `inputs` |
| 0 to 4, last line 4 | lesson cell `for-loops-when-you-know-how-many-times-1` |
| the while version prints the same | probe `l-while-equivalent` |
| `1 2 3 4 5`, `0 5 10 15`, 10 down to 1 | lesson cell `for-loops-when-you-know-how-many-times-2` |
| each loop's `i` exists only inside it | probe `l-loop-variable-scope` (CS0103) |
| the table's five shapes | probe `l-table-rows` |
| `A D` to `Z C`, both solutions | solutions of `your-turn-3--secret-messages` |
| the 16-pixel row | solution of `your-turn-3--pixel-art` |
| `5! = 120`; `5! = 0` from 0 | lesson cell `multiplying-as-you-go-1`; probe `l-product-from-zero` |
| four rows of eight; 32 times | lesson cell `nested-loops-1`; probe `l-nested-count` |
| `B C D E F` | solution of `your-turn-6--secret-messages` |
| the hollow square | solution of `your-turn-6--pixel-art` |
| 21, 42, 63, 84; 4 | lesson cell `building-up-gradually-counting-with-conditions-1` |
| six E's; CS0019 for `"E"` | solution of `your-turn-7--secret-messages`; probe `l-char-with-string` |
| six lit pixels | solution of `your-turn-7--pixel-art` |
| the challenge compiles; shift 3 | probes `l-challenge-starter`, `l-challenge-answer` |
| practice 1: only `After the loop`; the four loops | practice cell `range-1`; probe `p-four-loops` |
| practice 2: 100 each | probe `p-how-many` |
| practice 3: 50 and 99 steps | solutions of `the-odd-numbers-1`; probe `p-odd-steps` |
| practice 4: 5050 | solution of `one-to-a-hundred-1` |
| practice 5: 1; 1 then 0 nine times; 2.9289682539682538 | practice cell `a-sum-of-fractions-1`; probe `p-fractions-terms` |
| practice 6: 3628800; 1932053504, 6227020800, 2147483647, 9223372036854775807 | solution of `ten-factorial-1`; probe `p-thirteen-factorial` |
| practice 7: 7.485, 9.788, more than $10^{43}$ | practice cell `a-sum-that-never-settles-1`; probe `p-ten-thousand-terms` (an estimate) |
| practice 8: 22; 0 and -3; `Max()` | solution of `the-largest-1`; probe `p-largest-negative` |
| practice 9: CS0642 and its text, at the semicolon | probe `p-semicolon-after-while` |
| practice 10: 7; the two lists of values | practice cell `halving-1`; probe `p-halving-values` |
| practice 12: 1048576, $2^{20}$ | solution of `past-a-million-1`; probe `p-two-to-twenty` |
| practice 13: the two triangles | solutions of `a-triangle-1` |
| practice 14: 43; 33, 14, 4, 47 | solution of `three-or-seven-1`; probe `p-multiples` |
| practice 15: `OTTER`, `.#..##` | solutions of `backwards-1--*` |
| practice 16: 824693 | solution of `five-hundred-primes-1` |
| practice 17: 42 | solution of `adding-the-digits-1` |
| practice 18: 111 steps, 9232 | solution of `up-and-down-to-one-1` |
| practice 19: 3 and 20 | probe `p-film` |
| practice 20: A; -8, `9` and `S` for C | solution of `from-earlier-one-letter-back-1`; probe `p-letter-c` |
| practice 21: 64, 128 and 200 all give `-` | probe `p-order-of-questions` |
| 5! is the number of ways to arrange five things; Gauss's pairs of 101; 1,048,576 bytes in a "megabyte" | carried over from dewlab; facts, not program output |
| the picture 64 pixels wide, 3 + 5 a step, 16 pixels, 6 by 6, 1 to 100, 200 minutes, shift 10 | the set-up of each task, carried over from dewlab |

## Once the page UI exists

- **A loop that never ends, printing.** The lesson invites the reader to
  delete `side = side * 2;`, which prints `1` without end until **Stop**.
  Check that the page stays usable while output grows that fast, that
  **Stop** reaches the worker, and whether the output needs a limit. If
  the page cannot cope, change the invitation so that the loop prints
  nothing (move the `Console.WriteLine` after the loop), or leave it to
  the practice page's code to read.
- **Ctrl+Z after Stop.** The lesson says "write the line again, or press
  Ctrl+Z to undo the change". Check that the editor's undo works after a
  Run, and whether the page has a button that restores a cell's code; if
  it has, name it instead.
- **Empty stubs.** Five exec cells hold only a comment (`your-turn-3--*`,
  `your-turn-6--*` in the lesson; `the-odd-numbers-1` and `a-triangle-1`
  in the practice page). NativeCheck calls them "empty". Check what the
  page shows for such a cell (Run or Check), and whether a run of it
  counts for `after: 1 runs` on their hints.
- **Stub warnings.** Four lesson stubs and six practice stubs show
  CS0219 on their first run. The lesson says so at the first stub in each
  world; the practice page says so in its intro. `from-earlier-one-letter-back-1`
  shows two warnings and prints nothing.
- **"Compare with a solution" for stubs whose start is the answer's
  start.** `the-largest-1` starts `largest` at `numbers[0]`, so its
  untouched stub gives 3 against the solution's 22. That is what it should
  show; check the table reads that way.
- **A fence with one line of C#.** The opening shows
  `foreach (char letter in word)` as a `csharp` fence of its own, which is
  not a whole statement. Check that the renderer does not try to label it
  or run it.
- **The `range` table** has five columns' worth of code in its first
  column. Check it at phone width; it may need to become a list.

## Open questions for a reviewer

1. **Stop without a cell.** The course map says "Stop is shown on a loop
   that never ends". The page invites the reader to break the while-loop
   cell, rather than giving a cell that never ends, because the checker
   cannot pass a program that is meant never to stop. Should the format
   gain something like `expect: stop` (run for a second, then press Stop,
   and pass if it was still running)? Then the page could have a cell of
   its own for it.
2. **The Python column in the table.** The course map asks for a table that
   maps `range` onto the for loop. A PDP reader who has never seen Python
   gains nothing from it. The page puts Python last and says it is for
   readers who have used Python. Keep, move to a fold, or drop?
3. **`foreach` before its name.** The first cell uses `foreach`, as the
   course map asks, and names it only in the for-loop section. Is that too
   long a wait, or is it "run first, then name"?
4. **`for-loops-when-you-know-how-many-times-2` is 17 lines**, past the
   style guide's fifteen. It is one idea, three shapes of the same loop.
   Split into two cells, or keep?
5. **The new problem on 13!** (practice 6's second fold) depends on what
   `types-and-their-sizes` teaches about an `int` passing its largest
   value. That page is not drafted, so the fold says it again in full.
   Shorten it once that page lands?
6. **`+ 26` in `your-turn-2--secret-messages`.** Q never needs it, since
   the shift stops at 12. It is there so the reader's decoding pattern is
   the same as on `storing-and-computing`. Keep, or leave it out and let
   the practice page's problem 20 show when it matters?
7. **Three predicts on each page**, the most the style guide allows. The
   lesson keeps dewlab's three (the opening, the doubling square, the
   counting loop). The practice page has `range-1`, the new
   `a-sum-of-fractions-1` and `halving-1`.
8. **`n²` and 5!.** The page keeps $n^2$ and $5!$ in KaTeX, though the
   sigma section is gone. Both are small, and the reader has seen `%` and
   $c = c + 1$ in maths notation on earlier pages. Keep?

## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.

```csharp exec
id: l-side-64
// Lesson, while section: with int side = 64; it prints only Done.
int side = 64;
while (side * 2 <= 64)
{
    side = side * 2;
    Console.WriteLine(side);
}
Console.WriteLine("Done");
```

```csharp exec
id: l-without-the-change
// Lesson, while section: without side = side * 2; the condition stays true.
// Stopped after 5 passes here, because the real cell never ends.
int side = 1;
int passes = 0;
while (side * 2 <= 64 && passes < 5)
{
    Console.WriteLine(side);
    passes++;
}
Console.WriteLine($"side is still {side}; side * 2 <= 64 is {side * 2 <= 64}");
```

```csharp exec
id: l-string-plus-equals-char
// Lesson, shorter ways: += works on a string with a char; -=, *= and -- work too.
string coded = "FD";
char moved = 'W';
coded += moved;
Console.WriteLine(coded);
int count = 5;
count--;
count -= 2;
count *= 10;
Console.WriteLine(count);
```

```csharp exec
id: l-while-equivalent
// Lesson, for section: the while loop shown as code to read prints 0 to 4.
int i = 0;
while (i < 5)
{
    Console.WriteLine(i);
    i++;
}
```

```csharp exec
id: l-loop-variable-scope
expect: CS0103
// Lesson, for section: each loop's i exists only inside that loop.
for (int i = 0; i < 3; i++)
{
    Console.Write($"{i} ");
}
Console.WriteLine(i);
```

```csharp exec
id: l-table-rows
// Lesson, the table: each loop shape, with start 2, stop 7, last 6, step 2.
int start = 2;
int stop = 7;
int last = 6;
int step = 2;
for (int i = 0; i < stop; i++) Console.Write($"{i} ");
Console.WriteLine("   range(7)");
for (int i = start; i < stop; i++) Console.Write($"{i} ");
Console.WriteLine("   range(2, 7)");
for (int i = start; i <= last; i++) Console.Write($"{i} ");
Console.WriteLine("   range(2, 6 + 1)");
for (int i = start; i < stop; i += step) Console.Write($"{i} ");
Console.WriteLine("   range(2, 7, 2)");
for (int i = stop; i > start; i--) Console.Write($"{i} ");
Console.WriteLine("   range(7, 2, -1)");
```

```csharp exec
id: l-product-from-zero
// Lesson, "why 1" fold: starting product at 0 prints 5! = 0.
int number = 5;
int product = 0;
for (int i = 1; i <= number; i++)
{
    product *= i;
}
Console.WriteLine($"{number}! = {product}");
```

```csharp exec
id: l-nested-count
// Lesson, nested loops: the if runs 32 times.
int times = 0;
for (int row = 0; row < 4; row++)
{
    for (int column = 0; column < 8; column++)
    {
        times++;
    }
}
Console.WriteLine(times);
```

```csharp exec
id: l-char-with-string
expect: CS0019
// Lesson, your-turn-7 second hint: a char compared with a string does not compile.
string message = "MEET ME BY THE OLD TREE";
int count = 0;
foreach (char letter in message)
{
    if (letter == "E")
    {
        count++;
    }
}
Console.WriteLine(count);
```

```csharp exec
id: l-challenge-starter
// Lesson, the challenge's starter code as it is: it compiles, and prints the message unchanged.
string message = "WKLV LV D VHFUHW";
for (int shift = 0; shift < 26; shift++)
{
    string decoded = "";
    foreach (char letter in message)
    {
        // Move each capital backwards by shift. Leave the spaces as they are.
        decoded += letter;
    }
    Console.WriteLine($"{shift} {decoded}");
}
```

```csharp exec
id: l-challenge-answer
// Lesson, one answer to the challenge, for a reviewer: shift 3 reads as English.
string message = "WKLV LV D VHFUHW";
for (int shift = 0; shift < 26; shift++)
{
    string decoded = "";
    foreach (char letter in message)
    {
        if (letter >= 'A' && letter <= 'Z')
        {
            decoded += (char)((letter - 'A' - shift + 26) % 26 + 'A');
        }
        else
        {
            decoded += letter;
        }
    }
    Console.WriteLine($"{shift} {decoded}");
}
```

```csharp exec
id: p-four-loops
// Practice 1: the four loops in the answer fold.
for (int i = 0; i < 5; i++) Console.Write($"{i} ");
Console.WriteLine();
for (int i = 1; i < 5; i++) Console.Write($"{i} ");
Console.WriteLine();
for (int i = 0; i < 10; i += 3) Console.Write($"{i} ");
Console.WriteLine();
for (int i = 5; i > 0; i--) Console.Write($"{i} ");
Console.WriteLine();
```

```csharp exec
id: p-how-many
// Practice 2: both loops give 100 numbers.
int first = 0;
for (int i = 1; i <= 100; i++) first++;
int second = 0;
for (int i = 0; i < 100; i++) second++;
Console.WriteLine($"{first} {second}");
```

```csharp exec
id: p-odd-steps
// Practice 3: the first solution takes 50 steps, the second 99.
int stepsInTwos = 0;
for (int number = 1; number < 100; number += 2) stepsInTwos++;
int stepsInOnes = 0;
for (int number = 1; number < 100; number++) stepsInOnes++;
Console.WriteLine($"{stepsInTwos} {stepsInOnes}");
```

```csharp exec
id: p-fractions-terms
// Practice 5: 1 / i is 1, then 0 nine times; with 1.0 / i the total is 2.9289682539682538.
for (int i = 1; i <= 10; i++) Console.Write($"{1 / i} ");
Console.WriteLine();
double total = 0;
for (int i = 1; i <= 10; i++)
{
    total += 1.0 / i;
}
Console.WriteLine(total);
```

```csharp exec
id: p-thirteen-factorial
// Practice 6: 13! in an int and in a long, and the two largest values.
int product = 1;
for (int i = 1; i <= 13; i++) product *= i;
Console.WriteLine(product);
long bigProduct = 1;
for (int i = 1; i <= 13; i++) bigProduct *= i;
Console.WriteLine(bigProduct);
Console.WriteLine(int.MaxValue);
Console.WriteLine(long.MaxValue);
```

```csharp exec
id: p-ten-thousand-terms
// Practice 7: 10,000 terms, and an estimate of the terms needed to reach 100.
double total = 0;
for (int i = 1; i <= 10000; i++)
{
    total += 1.0 / i;
}
Console.WriteLine(total);
// The sum of n terms is close to ln(n) + 0.5772..., so it reaches 100 near n = e^(100 - 0.5772...).
Console.WriteLine(Math.Exp(100 - 0.5772156649015329));
```

```csharp exec
id: p-largest-negative
// Practice 8: starting at 0 or at numbers[0], for an array below zero; and Max().
int[] numbers = { -3, -17, -4 };
int fromZero = 0;
int fromFirst = numbers[0];
foreach (int number in numbers)
{
    if (number > fromZero) fromZero = number;
    if (number > fromFirst) fromFirst = number;
}
Console.WriteLine($"{fromZero} {fromFirst}");
int[] others = { 3, 17, 4, 22, 8 };
Console.WriteLine(others.Max());
```

```csharp exec
id: p-semicolon-after-while
// Practice 9: a semicolon after the condition gives warning CS0642.
// number is 0, so this probe ends; with 10 it would never end.
int number = 0;
while (number > 0);
{
    Console.WriteLine(number);
    number--;
}
```

```csharp exec
id: p-halving-values
// Practice 10: the values with a double, and with an int.
double number = 100;
while (number >= 1)
{
    number = number / 2;
    Console.Write($"{number} ");
}
Console.WriteLine();
int whole = 100;
int count = 0;
while (whole >= 1)
{
    whole = whole / 2;
    count++;
    Console.Write($"{whole} ");
}
Console.WriteLine();
Console.WriteLine(count);
```

```csharp exec
id: p-two-to-twenty
// Practice 12: 1048576 is 2 to the power 20.
Console.WriteLine(Math.Pow(2, 20));
```

```csharp exec
id: p-multiples
// Practice 14: 33 multiples of 3, 14 of 7, 4 of 21; 33 + 14 is 47, less 4 is 43.
int threes = 0;
int sevens = 0;
int both = 0;
for (int i = 1; i <= 100; i++)
{
    if (i % 3 == 0) threes++;
    if (i % 7 == 0) sevens++;
    if (i % 21 == 0) both++;
}
Console.WriteLine($"{threes} {sevens} {both} {threes + sevens} {threes + sevens - both}");
```

```csharp exec
id: p-film
// Practice 19: 200 minutes.
Console.WriteLine(200 / 60);
Console.WriteLine(200 % 60);
```

```csharp exec
id: p-letter-c
// Practice 20: C with a shift of 10 backwards, without and with + 26.
char letter = 'C';
int shift = 10;
int position = letter - 'A';
Console.WriteLine(position - shift);
Console.WriteLine((char)((position - shift) % 26 + 'A'));
Console.WriteLine((char)((position - shift + 26) % 26 + 'A'));
```

```csharp exec
id: p-order-of-questions
// Practice 21: with >= 64 first, 64, 128 and 200 all give -.
int[] brightnesses = { 64, 128, 200 };
foreach (int brightness in brightnesses)
{
    string pixel = ".";
    if (brightness >= 64)
    {
        pixel = "-";
    }
    else if (brightness >= 128)
    {
        pixel = "+";
    }
    else if (brightness >= 192)
    {
        pixel = "#";
    }
    Console.WriteLine($"{brightness} {pixel}");
}
```
