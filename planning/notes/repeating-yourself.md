# repeating-yourself: notes for a reviewer

Ported from dewlab `tutorials/repeating-yourself/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file. The brief is the
course map's entry (`planning/COURSE_MAP.md`, PDP row 10): action *adapt*,
shape *tutorial*, size M, batch 2, depends on `storing-and-computing`. No
earlier draft of this page existed, so both pages were written from the
start by the porter.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/repeating-yourself/repeating-yourself.md` and
`repeating-yourself-practice.md`; their recorded outputs are the two
`*.outputs.json` files beside them, written by the browser checker; and
this file was the draft's `NOTES.md`. The three `*.native.json` files were
deleted: the browser checker's outputs files replace them. "What was done
when it moved", just below, says what changed in the move. The rest of this
file is the porter's, brought up to date (what the move made stale is
marked *(stale)* or rewritten), with the porter's questions settled where
the playbook, the course map, the style guide or the exemplars answer
them. What none of them answers is under "Open", at the end of the
questions.

Files:

- `repeating-yourself.md`: the lesson, version `2026.09.28.1`. 17 exec
  cells, 8 of them in world variants (13 on show in either world); 3
  predicts, 11 hints, 9 solutions, 4 `inputs` blocks, 1 answer fold, 1
  challenge. No cell is meant to fail, and no cell warns.
- `repeating-yourself-practice.md`: the practice page, version
  `2026.09.28.1`, 21 problems. 22 exec cells, 2 of them in world variants
  (21 on show in either world); 3 predicts, 5 hints, 19 solutions, 12
  `inputs` blocks, 8 answer folds. No cell is meant to fail, and no cell
  warns.
- `repeating-yourself.outputs.json`, `repeating-yourself-practice.outputs.json`:
  what the browser checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/repeating-yourself.md`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write repeating-yourself`
  ran every cell, solution and `inputs` row of both pages in the real
  engine, in both worlds. On the draft as it came, every output and value
  was the same as the native check's, character for character: no
  difference in culture or number formatting (`12.5`, `0.78125`,
  `2.9289682539682538`, `7.485470860550343` all print as natively),
  `Console.Write`, trimmed APIs (`Max()` from LINQ ran) or exceptions. One
  diagnostic differed: the native check recorded CS0219 on `width` in
  `your-turn-2--pixel-art`, and the browser checker did not. The browser
  checker compiles a cell together with its `inputs` rows, and that cell's
  `inputs` include `width`, so `width` counted as used. A reader who
  presses **Run** on the page gets no `inputs`, and would see the
  warning that the prose promised. That cell no longer warns (below), so
  the lesson doesn't depend on it; the checker's behaviour is reported to
  the orchestrator, not changed. The porter's probes (at the end of this
  file) were run in the browser too, in a scratch lesson (`node
  tools/check-lessons.mjs --lessons <scratch>/lessons --write`): all 25 did
  what their comments say, with the same outputs and the same messages as
  natively (CS0103 at (6,19), CS0019 at (6,9), CS0642 at (4,19) in the
  probe's own lines).
- **Starters that warned.** Four lesson starters and six practice
  starters made variables they did not use, so an untouched Run showed
  CS0219, and the prose explained the warning in each world of the lesson
  and in the practice intro. The playbook's pitfall says a starter's
  variables must be used, and `storing-and-computing` and
  `making-decisions` settled it the same way when they moved. Each starter
  now prints a line that uses its given values, and each solution prints
  the same line: `Q to E: shift 12`, `13 steps: 68 pixels wide`,
  `E appears 6 times in MEET ME BY THE OLD TREE`, `..##.###..#: 6 pixels
  lit`; on the practice page `RETTO backwards is OTTER`, `##..#. mirrored
  is .#..##`, `Checked up to 3571: 500 primes, with a sum of 824693`,
  `Sum of the digits of 9876543: 42`, `From 27: 111 steps, highest 9232`,
  `K moved backwards 10 places is A`. Three starters changed shape to do
  that: the digits solution works on a copy, `remaining`, so that `number`
  keeps its value for the last line; the Collatz starter has `int start =
  27;`, and the problem now invites other starting numbers; and "one letter
  back" has `char original = letter;` for the reader to replace, with a new
  `inputs` block, `original`. The three paragraphs about CS0219 went. The
  existing `inputs` blocks are unchanged, so "Compare with a solution"
  compares the same values as before.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell or a
  solution, or no longer quoted:
  - Lesson, while loops: "doubling again would make 128" became "When
    `side` is 64, `side * 2 <= 64` is `false`". "It prints only `Done`"
    (probe only) became "the body never runs at all, and only the line
    after the loop prints".
  - Lesson, the "why 1" fold: `5! = 0` (probe only) went; the fold keeps
    the reason, zero times any number is zero.
  - Lesson, nested loops: "the `if` runs 32 times" (probe only) became
    "$4 \times 8$ times, once for every pixel", from the four rows of eight
    that the cell prints.
  - Lesson, `your-turn-2--pixel-art`: "Thirteen steps" became "13 steps",
    as recorded.
  - Practice 1: "the four loops give ..." (probe only). The first loop,
    `i = 0; i < 5`, is the lesson's own; the other three are a new cell,
    `range-2`, that the reader runs after saying what it gives. The fold
    quotes its three lines. The predict's second option is now just
    `After the loop`, the output's own line, so a reader who picks it is
    not asked "Which line explains what you saw?" (decision 37).
  - Practice 2: "100 each" (probe only). The two loop headers are now a
    cell, `how-many-numbers-1`, that counts both:
    `100 numbers, then 100 numbers`.
  - Practice 3: "fifty steps" and "ninety-nine steps" (probe only) became
    "visits only the odd numbers" and "visits every number from 1 to 99 ...
    about twice as many steps".
  - Practice 5: the "one change that does it" fold became a `solution`
    block, *one change*, so 2.9289682539682538 is recorded. "Then 0 nine
    times" (probe only) became "every term after it adds nothing, so the
    total stays 1".
  - Practice 6: the 13! fold's four numbers (probe only) are now printed by
    a new cell, `ten-factorial-2`: `13! in an int: 1932053504`,
    `13! in a long: 6227020800`, `The largest int: 2147483647`. `long`'s
    largest value went from the fold. The numbers are written as printed,
    without commas.
  - Practice 7: the answer fold became a `solution` block, *after 1,000
    terms and after 10,000*, which prints both sums (7.485470860550343 and
    9.787606036044348; the note keeps "about 7.485" and "about 9.788").
    "More than $10^{43}$ terms to reach 100" was an estimate from a
    formula, printed by no cell; it became "far more terms than any
    computer could add".
  - Practice 8: "starting at 0 gives 0, and starting at `numbers[0]` gives
    -3" (probe only) became the reason, and "Can you try both starts with
    `{ -3, -17, -4 }`?".
  - Practice 9: "It prints 10 for ever" became "the loop prints `number`
    again and again". CS0642 and *Possible mistaken empty statement* are
    printed by no cell on this page (a cell that never ends can't be
    recorded), so the fold now says the compiler shows a warning at the
    semicolon, as it does after an `if` on the
    [Decisions practice page](lesson:making-decisions-practice), where
    CS0642 is recorded.
  - Practice 10: the values (probe only). `halving-1` now prints each value
    and then `7 halvings`, and a new cell, `halving-2`, does the same with
    an `int`: `50 25 12 6 3 1 0` and `7 halvings`. The predict still asks
    for the count, the last number printed.
  - Practice 12: "$2^{20}$" (probe only). The starter now has
    `int doublings = 0;` and prints `2 to the power 0 is 1`; the solution
    prints `2 to the power 20 is 1048576`, and `doublings` is a second
    `inputs` row. "1,048,576 bytes" is written as printed, 1048576.
  - Practice 14: "33 multiples of 3 and 14 of 7 ... 47" (probe only). A
    second solution, *three counts*, counts each set and prints
    `33 + 14 - 4 = 43`, which is inclusion–exclusion done by the program.
    The note no longer quotes 47.
  - Practice 16: the solution now prints the last number checked, so the
    note adds "the 500th prime is 3571".
  - Practice 19: "`200 / 60` is 3 ... `200 % 60` is 20" (probe only). The
    problem is now a cell, `from-earlier-a-remainder-1`, with `inputs`
    `hours` and `minutes`, and its answer fold became a solution:
    `200 minutes: 3 hours and 20 minutes`.
  - Practice 20: "the number before `%` is -8 ... prints `9` ... `S`" (probe
    only) became an invitation: "Can you try `'C'`, with `+ 26` and
    without it?", with the reason, and "the result is not a capital
    letter".
- **Links** (decision 32, and the list of pages moving in this round). The
  porter linked forward to nothing. Every `lesson:` link now goes to a page
  in `lessons/` or one on the list, with that page's short title:
  [Variables and types] (lesson opening and for loops; practice 20), [Arrays and lists]
  (`lists-and-sequences`; lesson, for loops; practice 8), [Searching] and
  [Sorting] (`finding-things`, `putting-things-in-order`; nested loops),
  [Methods] (`writing-your-own-functions`; "Looking back"),
  [Starting a total] (`a-total-that-starts-again`; the closing "Next"),
  [Your first C# program] (practice 19), [Dividing] (practice 5 and 20),
  [Decisions] (practice 21) and the Decisions practice page (practice 9).
  *Reading input* and *Types and their sizes* are not on the list, so they
  are named in italics. At the final check, the checker reported
  only the links to `lists-and-sequences`, `finding-things` and
  `putting-things-in-order`, which are on the list and not moved yet.
- **`foreach` named where it is first used.** The opening now says "A loop
  that takes the items of something one at a time, like this one, is a
  *foreach loop*", after the reader has run it (question 3).
- **Reset, not Ctrl+Z.** Every lesson cell has a **Reset** button, which
  puts the page's code back. The loop that never ends now says "Then press
  **Reset**, and the cell has the page's code again."
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in
  `storing-and-computing`'s words. It ends with the exemplars' "Next, the
  practice page …", and names [Starting a total] as the page after it.
- **Plain words.** "mirrored from left to right" (practice 15) became "the
  last pixel comes first, and the first comes last"; "drops below 1"
  (practice 10) became "is below 1"; "meets them properly" (practice 8)
  became "looks at them in full". The heading "Looking back" is the
  exemplars'.
- **Where to read more.** The Microsoft Learn page answered HTTP 200 on 28
  September 2026, titled *Iteration statements - for, foreach, do, and
  while*. YouTube's oEmbed gives the video's title as *The Simplest Math
  Problem No One Can Solve - Collatz Conjecture*, by Veritasium, and the
  page now uses that title. Its length, "About twenty-two minutes", came
  from dewlab and could not be checked from here (the watch page and the
  TubeAlfred lookup gave no length), so it went. The year, 2021, is
  dewlab's and is not checked either.
- **The page, looked at.** Both pages were opened in headless Chromium on
  `npm run serve -- --isolate`, in both worlds, at 390 and 900 pixels
  wide: no errors in the console, no sideways scroll, and every cell
  labelled PROGRAM, or EMPTY for the five blank "your turn" cells. See
  "Page behaviour" below for the porter's UI questions.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `repeating-yourself: "Loops: repeating steps with while and for"` under
  `planned:`. The playbook's checklist says to delete it when the lesson
  moves; this move was told not to edit the course files.

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

## What changed from dewlab, and why (the porter's notes)

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
`!`, `char.IsUpper`, and the CS0219 warning on a stub. *(Stale: all of
these pages except `compiler-errors` and `types-and-their-sizes` are now in
`lessons/`, `first-steps` among them.)*

`storing-and-computing` ends with a challenge (moving `CAT` one letter at a
time with `word[0]`) and the line "[The page on loops](lesson:repeating-yourself)
does the tedious part for you". This page opens by doing exactly that, and
links back to it. *(Stale: that line is now "[Loops](lesson:repeating-yourself)
shows how to make C# repeat that part for you", which the opening still
answers.)*

### Links: back only, as the batch rule says *(stale)*

*Since the move, links follow decision 32 and the list of pages moving in
this round: see "Links" under "What was done when it moved".*

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
the reader has seen it work (run first, then name). *(Stale: since the
move, the opening names the* foreach loop *right after the first run; see
question 3.)* A new sentence says
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

*(Stale since the move: the invitation now says only that the body never
runs and only the line after the loop prints, without quoting `Done`; the
loop that never ends now ends with* **Reset***, not Ctrl+Z; and "doubling
again would make 128" became "`side * 2 <= 64` is `false`".)*

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
before the cell, in each world, as `making-decisions` does. *(Stale: since
the move no starter warns, and the two paragraphs went; see "Starters that
warned".)* Secret
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
  *(Stale: the fold no longer quotes `5! = 0`.)*

The harmonic series moves to the practice page (problem 5), with `1 / i`.
The sum of 1 to 100 and 10! were already practice problems 4 and 6.

**Nested loops (`nested-loops-1`).** Same checkerboard, in C# with
`Console.Write`. 15 lines with braces on their own lines. The $n^2$
paragraph stays; its two links (searching, sorting) are plain text. The
probe `l-nested-count` counts the 32 times the `if` runs. *(Stale: the
links are now [Searching] and [Sorting], and the prose says
$4 \times 8$ times, not 32.)*

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
*method*). *(Stale: it is now [Methods](lesson:writing-your-own-functions);
"a third kind of loop" became "one more loop", since `foreach` was already
the third; and the page now names `do`...`while` a* post-test loop*.)*

**Where to read more.** Khan Academy's sigma video goes with the section.
The Python tutorial becomes Microsoft's *Iteration statements* page. The
Veritasium video on Collatz stays: the practice page has the Collatz
problem. *(Since the move: the title is YouTube's, with a hyphen, and the
length, which could not be checked, went.)*

### The practice page

*Much of this list is stale since the move. "Numbers and messages the
prose quoted but no cell printed" and "Starters that warned", under "What
was done when it moved", say what changed in problems 1, 2, 3, 5, 6, 7, 8,
9, 10, 12, 14 to 20, and the links in 5, 8, 9, 19, 20 and 21.*

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

## Where each number and message in the prose comes from

Every number, printed value and quoted output that the prose, the folds and
the solution notes give is in `repeating-yourself.outputs.json` or
`repeating-yourself-practice.outputs.json` (browser checker, version
`2026.09.28.1`). A cell below a world's cells is recorded once per world,
as `<cell id>@<world>`, with the same result in both.

| Number, value or output | Recorded by |
|---|---|
| `FDW` | lesson `a-loop-that-codes-1` |
| 2, 4, 8, 16, 32, 64, `Done` | lesson `while-loops-repeat-until-done-1` |
| 10 | lesson `your-turn-1` |
| 8, then 2 | lesson `shorter-ways-to-change-a-variable-1` |
| shift 12 | solution of `your-turn-2--secret-messages` |
| 13 steps, 68 pixels | solution of `your-turn-2--pixel-art` |
| 0 to 4, the last line 4 | lesson `for-loops-when-you-know-how-many-times-1` |
| `1 2 3 4 5`, `0 5 10 15`, 10 down to 1 and `Liftoff!` | lesson `for-loops-when-you-know-how-many-times-2` |
| `A D` to `Z C` | both solutions of `your-turn-3--secret-messages` |
| the 16-pixel row | solution of `your-turn-3--pixel-art` |
| `5! = 120` | lesson `multiplying-as-you-go-1` |
| four rows of eight | lesson `nested-loops-1` |
| `B C D E F` | solution of `your-turn-6--secret-messages` |
| the hollow square | solution of `your-turn-6--pixel-art` |
| 21, 42, 63, 84; four | lesson `building-up-gradually-counting-with-conditions-1` |
| E appears 6 times | solution of `your-turn-7--secret-messages` |
| 6 pixels lit | solution of `your-turn-7--pixel-art` |
| practice 1: only `After the loop`; 1 to 4, 0 3 6 9, 5 to 1 | practice `range-1`, `range-2` |
| practice 2: 100 each | practice `how-many-numbers-1` |
| practice 4: 5050 | solution of `one-to-a-hundred-1` |
| practice 5: 1; 2.9289682539682538 | practice `a-sum-of-fractions-1` and its solution |
| practice 6: 3628800; 1932053504, 6227020800, 2147483647 | solution of `ten-factorial-1`; practice `ten-factorial-2` |
| practice 7: about 7.485 and about 9.788 | practice `a-sum-that-never-settles-1` and its solution |
| practice 8: 22 | solution of `the-largest-1` |
| practice 10: the two lists of values; 7 halvings each; ends at 0 | practice `halving-1`, `halving-2` |
| practice 12: 1048576, $2^{20}$ | solution of `past-a-million-1` |
| practice 13: the two triangles | both solutions of `a-triangle-1` |
| practice 14: 43; 33, 14, 4 | both solutions of `three-or-seven-1` |
| practice 15: `OTTER`, `.#..##` | solutions of `backwards-1--*` |
| practice 16: 824693; 3571 | solution of `five-hundred-primes-1` |
| practice 17: 42 | solution of `adding-the-digits-1` |
| practice 18: 111 steps, 9232 | solution of `up-and-down-to-one-1` |
| practice 19: 3 hours and 20 minutes | solution of `from-earlier-a-remainder-1` |
| practice 20: A | solution of `from-earlier-one-letter-back-1` |

Claims that quote no number or output, and that the prose keeps, are
backed by the probes below, run in the browser: with `int side = 64;` the
body never runs (`l-side-64`); without the change, `side` stays 1
(`l-without-the-change`); `+=` on a string, `-=`, `*=` and `--`
(`l-string-plus-equals-char`); the while loop to read prints the same as
the for loop (`l-while-equivalent`); each loop's `i` exists only inside it
(`l-loop-variable-scope`); the table's five shapes (`l-table-rows`); a
product that starts at 0 stays 0 (`l-product-from-zero`); CS0019 for a
`char` compared with `"E"`, which the second hint on `your-turn-7` names
(`l-char-with-string`); the challenge's answer is shift 3
(`l-challenge-answer`; the starter compiles, also in the outputs file under
`challenges`); both starts for a negative array, and `Max()`
(`p-largest-negative`); the warning after `while (...);`
(`p-semicolon-after-while`); `'C'` without `+ 26` is not a capital letter
(`p-letter-c`); with `>= 64` first, 128 and 200 give `-`
(`p-order-of-questions`).

The numbers that set up each task (a picture 64 pixels wide, 3 + 5 a step,
16 pixels, 6 by 6, 1 to 100, 1,000 and 10,000 terms, 13!, 200 minutes, a
shift of 10, 9,876,543, 27) are the task's own, from dewlab. 5! as the
number of ways to arrange five things, Gauss's fifty pairs of 101, and a
"megabyte" of 1048576 bytes are facts carried over from dewlab, not
program output; the last is the recorded 1048576.

## Page behaviour, checked when it moved

The porter listed these for "once the page UI exists". Each was looked at
in headless Chromium on the real server.

- **A loop that never ends, printing.** With `side = side * 2;` deleted,
  the cell prints `1` without end. After three seconds the page showed
  145204 characters and then "[The rest of the output is hidden. This
  program printed more than 1,000,000 characters.]" (decision 24). The
  page stayed usable; **Stop** ended the program in 80 ms, with the state
  "Stopped." The invitation stays as it is.
- **Ctrl+Z after Stop.** Every lesson cell has **Reset**, which puts the
  page's code back ("Back to the page's version. Ctrl+Z in the editor
  brings yours back."). After Reset the cell ran and printed its recorded
  output. The lesson now names **Reset**.
- **Empty stubs.** The five comment-only cells show the label EMPTY (the
  kind's title: "An empty cell. Write some C# in it."). The checker runs
  their solutions in their place.
- **Stub warnings.** Settled by the playbook: no starter warns now (see
  "Starters that warned").
- **"Compare with a solution" for stubs whose start is the answer's
  start.** `the-largest-1` still starts `largest` at `numbers[0]`, so an
  untouched starter gives 3 against the solution's 22, as the porter
  expected.
- **A fence with one line of C#.** The opening's `foreach (char letter in
  word)` fence renders as code to read, with no label and no Run button.
- **The `range` table** fits at 390 pixels wide (361 of 361 pixels), with
  no sideways scroll.

## The porter's questions, and what was decided

1. **Stop without a cell.** *Decided for the page:* the invitation to break
   `while-loops-repeat-until-done-1` stays, and it was checked on the page
   (see "Page behaviour"): the course map asks that "Stop is shown on a
   loop that never ends", and the page shows it. Whether the format should
   gain `expect: stop` is a change to the format and the checker, which the
   documents don't settle: Open (below).
2. **The Python column in the table.** *Decided by the course map:* "a
   table maps `range(stop)`, `range(start, stop)` and
   `range(start, stop, step)` onto them". The column stays last, with the
   sentence that it is for readers who have used Python.
3. **`foreach` before its name.** *Decided by the style guide:* "Define
   every term where it first appears" (`#voice`) and "Run first, then
   name" (`#how-a-page-teaches`). The opening now names the *foreach loop*
   right after the first run; the for-loop section still calls it the third
   loop.
4. **`for-loops-when-you-know-how-many-times-2` is 17 lines.** *Decided by
   the style guide:* `#code`'s limit of fifteen lines is there so that "a
   cell with two ideas" becomes two cells, and braces go on their own
   lines. This cell has one idea, three shapes of one loop, and it stays,
   as `making-decisions` kept its 19-line else-if cell. The new practice
   cell `range-2` is 17 lines for the same reason.
5. **The 13! fold and *Types and their sizes*.** *Decided by the style
   guide* ("Write for the reader at home", `#who-reads-this`) *and
   decision 32:* that page is not written, so the fold says what it needs
   in full, and names *Types and their sizes* in italics. It is short now
   that its numbers are in a cell. The batch that adds the link can shorten
   it.
6. **`+ 26` in `your-turn-2--secret-messages`.** *Decided by the course
   map* ("What changes because of C#": "A Caesar shift going backwards
   needs `((n % 26) + 26) % 26`"): it stays, so that the backwards shift
   has one shape on every page. Practice 20 invites the reader to see what
   happens without it.
7. **Three predicts on each page.** *Decided by the style guide:* "two or
   three" (`#how-a-page-teaches`). Each page keeps three. The cells added
   in the move (`range-2`, `how-many-numbers-1`, `ten-factorial-2`,
   `halving-2`) ask for a guess in the prose, with no predict block.
8. **$n^2$ and $5!$.** *Decided by the course map:* its list of the maths
   that goes (sigma notation, the families of numbers, sequences as
   functions, the dot product, domain and inverse) doesn't include either,
   and it keeps "the paragraph on a product starting at 1". Both stay.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **`expect: stop`** (question 1). The checker can't record a cell that is
  meant never to end, so the page shows **Stop** by inviting the reader to
  delete a line. A cell of its own would need a new `expect:` value (run
  for a moment, press Stop, pass if it was still running) in the format,
  the parser and the checker.
- **"a shorter way you'll meet later"** on practice 13's second solution,
  `new string('#', row)`. No page in the course map is known to teach
  `new string(char, count)`. Keep the title, retitle it (for example "a
  shorter way C# has", the same question `making-decisions` asks), or have
  a later page (*Arrays and lists*, say) teach it?
- **The video's length and year.** *The Simplest Math Problem No One Can
  Solve - Collatz Conjecture* (Veritasium) is confirmed by title and
  channel. Its length could not be checked from here, so "About
  twenty-two minutes" went; the year, 2021, is dewlab's and not checked.

## Probes

Each cell below checked a claim in the draft's prose that no cell on the
pages printed. None of them is part of either page, and the cells with
`expect:` fail on purpose. The porter ran them with the native check. When
the page moved, they were run in the browser: copy this section into a
scratch lesson (`<scratch>/lessons/ry-probes/ry-probes.md`, with a
`title:` and a `version:`), and run `node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`. All 25 did what their comments say, with the
native outputs. Several claims they backed are now printed by a cell on the
page, or no longer made (see "What was done when it moved"); the probes
stay as the record.

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
