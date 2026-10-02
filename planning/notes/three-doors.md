# three-doors: notes for a reviewer

The PDP extra E4 in `planning/COURSE_MAP.md`: *The Monty Hall problem:
three doors and a simulation*. Adapted from dewlab's `three-doors`
(Programming and Maths, Integrated). Explore shape, no worlds, size M
(8 cells), no practice page. Covers PDP-LO2 and PDP-LO7. Depends on
`repeating-yourself` and `leaving-it-to-chance`.

Files:

- `lessons/three-doors/three-doors.md` (version 2026.09.28.2: the first
  recording was .1; two cells then changed so that every copy of the game
  reads the same way, and one comment was shortened)
- `lessons/three-doors/monty-hall-cases.svg` (the three cases, redrawn for
  a white card; dewlab's used the site's CSS variables)
- `lessons/three-doors/three-doors.outputs.json`

`npm run check-lessons -- three-doors` reports 13 runs and no problems.

## What the page does, in order

1. **The puzzle**, told as dewlab tells it, with an invitation to write a
   guess on paper, and a paragraph saying that this is an extra and what
   it needs (loops, methods, lists, and a seeded generator).
2. **Playing one game** (`playing-one-game-1`). One game step by step,
   with `int seed = 1;` at the top. The host's `if` has the two conditions
   that the page comes back to. With seed 1 the car and the pick are both
   door 1, the host opens door 2, and staying wins. The reader is invited
   to try seeds 2, 3 and 4, or `Random.Shared`.
3. **Why staying feels fine.** dewlab's "one in two" argument, kept.
4. **Playing it ten thousand times** (`playing-it-ten-thousand-times-1`).
   `static bool SwitchingWins(Random generator)` and a loop of 10,000
   games. Defines *simulation*. A number predict on the last line
   (tolerance 0.03). Staying 3391 (0.339), switching 6609 (0.661).
5. **Your turn** (`your-turn-1`). Five seeds, 100 games and then 100,000.
   The shares for 100 games run from 0.610 to 0.750; for 100,000 they are
   all between 0.666 and 0.669. Defines the *law of large numbers*, and
   points back to the running mean on *Random numbers*. Invites the reader
   to add 1000 and 10000 to `sizes`.
6. **Where the two thirds comes from.** The host's `if` as code to read;
   `door != car` is the step the argument misses. A new cell
   (`where-the-two-thirds-comes-from-1`) counts the games in which the host
   had only one door he could open: 6598 of 10,000.
7. **Three cases you can count.** The picture, then nested loops over car
   and pick (`three-cases-counted`) in place of `itertools.product`. A
   choice predict whose options are the output line itself (3, 6 or 9 of
   the 9 pairs). It prints 6. An invitation to print each pair.
8. **A host who is not paying attention**
   (`a-host-who-is-not-paying-attention-1`). `CarelessGame` returns
   `"spoiled"`, `"staying"` or `"switching"`. The prose asks the reader to
   compare its `if` with the knowing host's: `&& door != car` has gone. A
   number predict on the last line. Spoiled 3311, finished 6689, staying
   0.507, switching 0.493.
9. **Your turn: a hundred doors** (`your-turn-2`). The reader writes
   `OtherShutDoor(car, firstPick, generator)`. The starter returns 0 (not
   a door), so it runs and switching never wins. Two hints, an `inputs`
   block, and a solution: 9895 of 10000, 0.990.
10. **A host with a favourite door** (`doors-favourite-door`), from
    dewlab's practice page, problem 1. You always pick door 1; he opens
    door 3 whenever he can. The reader fills the loop. The solution: door
    3 in 20025 games, switching won 9875; door 2 in 9975 games, switching
    won all 9975; over all, 0.662.
11. **Looking back**: dewlab's closing question (why the same goat means
    two thirds in one game and a half in the other), the challenge (any
    number of doors, any number opened), a paragraph on Visual Studio, and
    **Where to read more**.

## What I decided, and why

- **Every generator has a seed.** dewlab's cells use `random.choice` with
  no seed and say "run it a few times". The checker compares every
  recorded output, so an unseeded cell would fail it on the next run; and
  the style guide wants every quoted number recorded. So each cell makes
  `new Random(1)`, and variety comes from changing the seed (the first
  cell has `int seed = 1;` with a comment saying so, and names
  `Random.Shared` for a game nobody can predict). This is also what
  `leaving-it-to-chance` teaches: one generator, many numbers. The methods
  take the generator as a parameter, so a whole run uses one generator.
- **Doors are the numbers 1, 2 and 3**, not dewlab's strings "door 1".
  `generator.Next(1, 4)` uses the "up to 4, but not 4" wording from
  *Searching* and *Random numbers*. The door that is left is
  `6 - firstPick - opened`, with a comment that says why (1 + 2 + 3 is 6).
  dewlab's second loop, which found the other door, would have needed an
  initial value in C# (CS0165), and made the cell longer. The same trick is
  in dewlab's practice page hint.
- **`SwitchingWins` returns one `bool`, not two.** dewlab's `play_once`
  returns a tuple. With a host who knows, exactly one choice wins each
  game, and the prose says so before the cell; staying's count is
  `games - switchingWins`. Tuples appear in PDP only as the swap in
  *Sorting*, so a method that returns two values would be new.
- **The careless host returns a string**, `"spoiled"`, `"staying"` or
  `"switching"`, in place of dewlab's `None` or a tuple. A PDP reader has
  met methods that return strings. An `enum` would be tidier, but PDP does
  not teach one.
- **The host's list stays.** Both hosts build `choicesForHost` with a loop
  and an `if`, so that the one difference between them is `&& door !=
  car`. The prose points at that difference.
- **Nested loops in place of `itertools.product`**, as the map's entry
  asks. The term is from *Loops*, and the page links to it.
- **A new cell counts the games where the host has no choice.** dewlab's
  prose says "in two cases out of three he had no choice" from the picture
  alone. The C# page prints it (6598 of 10,000) so that the claim is a
  recorded number (decision 29), and it comes just before the picture,
  which then explains it.
- **`your-turn-1` prints both sizes.** dewlab asks the reader to change
  100 to 100,000 and quotes the spread in the prose. That prose would
  quote numbers that no cell prints, so the cell prints 100 and 100,000
  games for five seeds, and the prose quotes both lines. The reader still
  has something to change (add 1000 and 10000). The checker ran all 13
  runs of the page, this cell's 500,000 games included, in under three
  seconds.
- **The hundred-door task is split into the host's method and a program
  that uses it.** dewlab's starter is one function that picks the car and
  the pick too. Here the program picks them, and the reader writes only
  the host's part, `OtherShutDoor`. So **Compare with a solution** can
  give it fixed doors: `OtherShutDoor(7, 42, new Random(1))` must be 7 in
  every solution. When the pick is the car the answer is random, so that
  row asks `... != 7`. The solution notes explain the three rows.
- **The solution for a hundred doors uses a list loop**, as the host's
  list did, not dewlab's comprehension.
- **The favourite-door host comes onto the page.** The map gives explore
  pages no practice page, so the page would have lost all of dewlab's
  practice problems. This one follows on from the careless host (the host
  matters, again), it needs only `if` and counters, and it brings the page
  to eight cells, inside size M. Its id is dewlab's practice id,
  `doors-favourite-door`, as the translating guide asks for a cell whose
  task is the same.
- **Three predicts**, each naming its line: two `number` predicts with
  tolerance 0.03 on "the last line", and one `choice` whose options are
  the output line itself.
- **`(double)` and `:F3` are said in one sentence** at their first use.
  *Reusable methods* practice and *Random numbers* use them, but a reader
  of an extra may have missed both.
- **Terms defined where they appear:** Monty Hall problem, random number
  generator and seed (again, briefly, since an extra can be read in any
  order), simulation, share (in the first predict: a number from 0 to 1),
  law of large numbers, nested loops (with a link).
- **"Suppose" in place of dewlab's "Say you choose"**, which is an idiom;
  "write it on paper" in place of "write it down".

## Where each number and quoted output comes from

All from `three-doors.outputs.json`:

| Prose | Cell |
|---|---|
| car behind door 1, you choose 1, host opens 2, switching to 3, `True` and `False` | `playing-one-game-1` |
| 3391, 0.339, 6609, 0.661 | `playing-it-ten-thousand-times-1` |
| 0.610 to 0.750; 0.666 to 0.669 | `your-turn-1` |
| 6598 of 10,000 | `where-the-two-thirds-comes-from-1` |
| `Switching wins in 6 of the 9 pairs.` | `three-cases-counted` |
| 3311, 6689, 0.507, 0.493 | `a-host-who-is-not-paying-attention-1` |
| 0 of 10000 (the starter: "switching never wins"); 9895 of 10000, 0.990; the three rows 7, 100, true | `your-turn-2` and its solution |
| 20025, 9875, 9975, 9975, 0.662 | solution of `doors-favourite-door` |

10,000, 100,000, 30,000, 100, 98 and 9 are numbers written in the code or
the puzzle, not results. "Two thirds" and "one in two" are the page's
reading of those results.

## Probes (a scratch lesson, not part of the page)

The challenge, solved in a scratch lesson and run in the browser engine
(seed 1, 100,000 games each), against the formula
$\frac{n-1}{n} \times \frac{1}{n-1-k}$ for $n$ doors and $k$ opened:

| Doors, opened | Simulated | Formula |
|---|---|---|
| 3, 1 | 0.668 | 0.667 |
| 4, 1 | 0.376 | 0.375 |
| 4, 2 | 0.750 | 0.750 |
| 100, 98 | 0.990 | 0.990 |

A teacher can use this to check a learner's challenge. The page quotes
none of these numbers.

## What I left out

- **dewlab's practice page**, except problem 1 (the favourite door),
  which is now on the page. Left out: the conditional probability formula
  (problem 2), the host who does not always offer (3), four doors (4 and
  5), and the three problems from earlier maths pages (XOR, counting,
  independence). They belong to the integrated maths course, whose pages
  PDP does not have (the map's "maths that only the integrated course
  needs goes").
- **dewlab's links to *Probability* (`what-are-the-chances`) and
  *Checking* (`when-two-methods-agree`).** Neither page is on dewsharp's
  course map, so there is nothing to name. The introduction points to
  *Random numbers* for the simulation and the seed instead.
- **dewlab's per-section `covers:` map** (MIT-5.6, MIT-5.7). The map's
  entry gives PDP-LO2 and PDP-LO7, as one flat list.
- **"the law of large numbers from the last page".** dewsharp has no such
  page. The law is named and defined here, and linked to the running mean
  on *Random numbers*.

## For other files (not done here: the brief allowed only these)

- `courses/pdp.yaml`: the `planned:` line for `three-doors` can go now
  that the lesson is in `lessons/` (`docs/TRANSLATING.md` checklist).
- `lessons/leaving-it-to-chance/leaving-it-to-chance.md`, "Looking back",
  names *The Monty Hall problem* in italics. It can link to
  `lesson:three-doors` now.
- This page names *Monte Carlo* (`counting-darts`) and *Markov chains*
  (`a-chain-reads-a-book`) in italics, because they were not in
  `lessons/` when it was written. They are being written at the same
  time; when they exist, the closing paragraph can link to them.

## Open

Questions only Josh can settle:

1. **The favourite-door host on the tutorial page.** It is a practice
   problem in dewlab. I moved it here because an explore page has no
   practice page, and the page needed it to reach size M. Keep it, or
   give this extra a practice page with dewlab's problems (the question
   `leaving-it-to-chance`'s notes also ask)?
2. **Seeded games in place of "run it a few times".** The checker needs
   every recorded output to repeat, so every generator here has a seed,
   and the page invites the reader to change it or to try
   `Random.Shared`. Is that the right trade, or should the format allow a
   cell whose output the checker does not compare (for example an
   `unseeded` header), so that a page about chance can be unpredictable?
3. **`6 - firstPick - opened`.** It is short and the comment explains it,
   but it works only for doors numbered 1, 2 and 3. dewlab's page used a
   second loop. Is the trick too clever for Level 5?
4. **Doctorates in the reading list.** dewlab says the readers who wrote
   to vos Savant included "people with doctorates", and this page keeps
   the claim, with the word explained. The column is from 1990 and has no
   free link. Keep it, or replace it with a source a learner can open?
5. **Numbers that depend on .NET 10.** As on `leaving-it-to-chance`,
   every seeded number (seed 1's game, 3391, 6598 and the rest) is true
   for .NET 10. The page says so in its Visual Studio paragraph ("on the
   same version of .NET as this page"). Enough?

## Review

A second reader, 1 October 2026. It read the page as a Level 5 learner
who knows only the PDP pages before it, then as a teacher against the
map's entry, then went through `docs/TRANSLATING.md`'s checklist and the
style guide's. It checked every number against `three-doors.outputs.json`.
It changed only prose. No cell changed, so `version:` stays at
2026.09.28.2 and the outputs file is as the writer recorded it.
`npm run check-lessons -- three-doors`: 13 runs, no problems.

### What changed

- **The list at the top matches the page.** It now has six items, in the
  page's order: one game, the answer most people give first, thousands of
  games, the line of code, the three cases, the host. The old list left
  out "Why staying feels fine".
- **What the page needs.** "It needs loops, from Loops, methods and lists,
  and ..." read as if *Loops* were a list of three pages. Now: it needs
  loops, methods and lists, and a seeded generator, and the pages to read
  first are *Loops* and *Random numbers*.
- **The first cell asks a question.** "Run it." became "Run it. Which
  choice wins this game: staying, or switching?" (`#how-a-page-teaches`:
  run something and ask about it). The prose under the cell answers it.
- **`6 - firstPick - opened` is explained in the prose**, not only in a
  comment: the door numbers' sum is 6, so subtracting your door and the
  opened door leaves the one door that is still shut. Josh's open
  question 3 stays, but a reader who skips comments now meets the reason.
- **The warning that the `Random.Shared` invitation causes.** A probe in
  a scratch lesson shows that changing `new Random(seed)` to
  `Random.Shared` gives `warning CS0219: The variable 'seed' is assigned
  but its value is never used` on line 1. The page now says so, and that
  a warning never stops a program (the words of *Compiler errors*). The
  sentence that invites it is now two sentences.
- ***Share* is defined in the prose before the first simulation**, not
  inside the predict: the wins divided by the number of games, a number
  from 0 to 1, where 0.5 is one game in two. The predict now says that
  the last line *ends with* the share (the line also has the count, and
  the page compares the guess with the last number on the line, which is
  the share).
- **`your-turn-1`'s question names what changes.** "Which line do you
  expect to change more from seed to seed?" became "on which line do you
  expect the five shares to differ more?".
- **"The small changes come from the randomness"** came from dewlab,
  where the changes were small. With 100 games they run from 0.610 to
  0.750, so it now says "The differences".
- **"The running mean of the dice"** named something *Random numbers*
  never calls that. Now: on *Random numbers*, the mean of many rolls of a
  die did the same, and seed 7 and seed 8 took different paths and
  finished in the same place (that page's own words; no number is quoted
  from it).
- **"see where their shares fall"** is an idiom; now "see what shares
  they give".
- **"The first argument misses this step"** came straight after "The
  second one, `door != car`", so a reader could take "the first" to mean
  the first condition. Now: *The "one in two" argument misses this step.*
- **"every pair of where the car is and which door you pick"** became
  "every pair: a place for the car, and a door that you pick".
- **`CarelessGame`'s strings.** "returns what happened: `"spoiled"`,
  `"staying"` or `"switching"`" did not say that the last two name the
  choice that won. It does now. "Compare its `if` with ..." became a
  statement: the `if` inside it is the knowing host's `if` without
  `&& door != car`.
- **The favourite-door solution answers the question it was set.** The
  section asks "Should you switch? And if he opens door 2?". The notes
  gave the counts but not the answer; they now add: when he opens door 3,
  switching and staying are equally good; when he opens door 2, switching
  always wins.
- **"here is every version at once"** ("at once" is an idiom) became
  "here is one program for every version".
- **Monte Carlo is a link now.** `counting-darts` is in `lessons/`, and
  it already links back to this page. The closing paragraph follows
  `counting-darts`'s own: [Monte Carlo](lesson:counting-darts), and
  *Markov chains* still in italics, because `lessons/a-chain-reads-a-book/`
  is an empty folder.
- **The vos Savant entry.** "her answer, switch, was a mistake" became
  "Her answer was to switch. Thousands of readers wrote to say that she
  was mistaken, ...".

### Checked, and left as it was

- Every number in the prose, the predicts and the solution notes is in
  the outputs file: seed 1's game, 3391/0.339 and 6609/0.661, 0.610 to
  0.750 and 0.666 to 0.669, 6598, 6 of 9, 3311/6689/0.507/0.493,
  9895/0.990 and the rows 7, 100 and `true`, 20025/9875/9975/9975/0.662.
- The two number predicts name the last line, and the page compares the
  guess with that line's last number (`web/page/guess.js`), which is the
  share in both cells. The choice predict's options are the whole output
  line, so a matching option is the same.
- Each program cell works on its own (rule 1 is said where `your-turn-1`
  repeats `SwitchingWins`). No types cells, so the other rules do not
  arise. Solutions and `inputs` sit under the program cells they run
  against. Hints come after an attempt (`after: 2 runs` on starters that
  already run), and the first hint of each asks a question.
- Everything the page uses is taught before it in PDP: `&&`
  (*Decisions*), `++` and nested loops (*Loops*), `List<int>`, `Add` and
  `Count` (*Arrays and lists*), `static` methods (*Methods*), `Random`,
  seeds and choosing from a list (*Random numbers*). `(double)` and `:F3`
  are explained at their first use.
- No verdict words, Irish spelling, no phrasal verbs left that the grep
  or a reading found. The picture has a full description and does not use
  colour alone (bold and a dashed border mark the boxes too).
- The page opens with the puzzle in prose, not a cell. A cell cannot come
  before the puzzle is told, and the guess on paper is the question it
  asks. This is dewlab's opening, and the reviewer kept it.
- The cells are longer than the style guide's 5 to 15 lines (the careless
  host's is about 50). Each must carry its own copy of the game (rule 3),
  and *Random numbers* has cells of the same size, so they stay.

### Still open for Josh

The writer's five questions above stand. Two more:

6. **The Numberphile video's year.** The link works and the title is
   *Monty Hall Problem - Numberphile* (YouTube's oEmbed answer). The year,
   2016, is copied from dewlab, and the reviewer could not confirm it
   (YouTube refused the page from this machine). Worth a look before the
   page is in front of a class.
7. **"Your turn" on `your-turn-1`.** The cell already runs, and the
   reader's task is to add two sizes and compare. dewlab's heading is
   kept. If a "your turn" should always end in code the reader writes,
   this one could become plain prose under the section.

### For other files (outside this review's brief)

- `courses/pdp.yaml`: the `planned:` line for `three-doors` can go.
- `lessons/leaving-it-to-chance/leaving-it-to-chance.md`, "Looking back",
  can link to `lesson:three-doors` in place of the italics.
