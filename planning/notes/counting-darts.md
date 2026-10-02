# Notes: counting-darts

A new dewsharp page, written on 29 September 2026 from the course map's PDP
explore entry E5: "Monte Carlo: estimating π with random darts", from
dewlab's `counting-darts` (Computational Methods), action *adapt*, shape
*explore*, covers PDP-LO2, no worlds, size M, depends on
`repeating-yourself` and `leaving-it-to-chance`. The entry names no
practice page, and an explore page has none (COURSE_MAP.md, "Practice pages
and mixed sets"), so there is none.

Read before writing: dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md`, `docs/TRANSLATING.md`, the course
map's reading guide, principles and PDP explore entries; the exemplars
`first-steps` and `objects-and-classes`; `leaving-it-to-chance` (the page
just before it in the explore list, and one it depends on) and its notes;
`bits-that-flip`'s notes; the parts of `writing-your-own-functions`,
`storing-and-computing`, `dividing-in-csharp`, `grids-and-references` and
`reading-input` that this page leans on; and dewlab's `counting-darts.md`,
its practice page and its glossary.

Files:

- `lessons/counting-darts/counting-darts.md`: version 2026.09.28.3. 13
  `csharp exec` cells, all program cells; 2 predicts, 6 hints, 4 solutions,
  1 `inputs` block, 2 answer folds, 1 challenge, 1 picture.
- `lessons/counting-darts/quarter-circle.svg`: the unit square, the
  quarter circle, a radius of 1, and the two points from the first
  `InsideCircle` cell. Inside is a filled dot and outside an empty ring,
  each with its label, so colour is not the only signal. It has a `<title>`
  and `<desc>`, and a description in the Markdown. dewlab's page has no
  picture here; its first chart comes later.
- `lessons/counting-darts/counting-darts.outputs.json`, written by the
  checker.

`npm run check-lessons -- counting-darts`: 19 runs, no problems.

## What the page does, in order

1. **10,000 darts, and a number the reader knows** (`darts-at-a-square-1`).
   The loop with no method, seed 0: `7895 of 10000 darts hit`, then 3.158.
   The page opens by running something and asking which number it is near.
   Then it defines π, the *Monte Carlo method*, *simulation* (again, as
   `leaving-it-to-chance` did) and *Monte Carlo simulation*.
2. **A question you can answer by throwing things.** The square, the
   quarter circle and the picture; the ratio $\pi/4$; *radius* and
   *estimate* defined; Pythagoras as the test. `InsideCircle` on (0.2, 0.3)
   and (0.9, 0.9). A predict on (0.6, 0.8): "What will the second line
   print?" It prints `1` and `True`. The predict's note for `False` points
   back to `0.1 + 0.2` on *Dividing*, so a reader who remembers that has a
   real reason to doubt. An invitation to try `<`.
3. **Where the darts land** (new). 1,500 darts on a `char[][]` grid of 20
   lines by 40 characters: `#` inside, `.` outside. The curve is plain to
   see. This is the course map's "small grid of `#` and `.` for where the
   darts land", in place of dewlab's scatter plots. A list explains the
   three lines a reader may not know.
4. **One dart at a time.** `EstimatePi(darts, seed)` with
   `return 4 * hits / darts;` and a predict ("What will the cell print?").
   It prints `3`; the solution (`4.0`) prints 3.216. The prose says why a
   mistake that looks plausible needs a test with a known answer. Your
   turn: more darts, with `Math.PI` and `Math.Abs` defined; the solution
   prints 1,000, 10,000 and 100,000 darts with their distance from π.
5. **Watching it settle.** dewlab's matplotlib line becomes a table: a line
   after 10, 20, 40, ... 10,240 darts, each with the running estimate and
   the estimate minus π. dewlab's three observations are kept, told from
   the recorded numbers. Your turn: the same program with seed 1, and a
   fold that quotes both tables.
6. **More darts, better on average.** One table, three seeds (0, 1, 2) by
   four dart counts, of the distance from π. Seed 0 improves on every row;
   seed 1 is further from π at 10,000 than at 1,000; seed 2 is further at
   100,000 than at 10,000. Then four seeds at 100,000 with their mean.
   Accuracy and precision; the $1/\sqrt{n}$ rule. Your turn: a small
   calculator cell for "how many darts for four decimal places" (solution
   prints 1000000000), then an invitation to time ten million darts, with a
   fold that uses no number.
7. **Any shape at all.** dewlab's "Your world" task in one setting, the
   atoll: write `EstimateArea(width, height, darts, seed)`, with `OnReef`
   given. `inputs`, two hints, a solution that also prints the exact area.
8. **Lab bench.** Twenty runs of 10,000 darts: lowest, highest, gap, mean;
   four questions.
9. **Looking back**, the challenge (two friends at the gate), the other
   extras, a paragraph on Visual Studio, and **Where to read more**.

## What I decided, and why

- **Seed 0 everywhere, and x before y.** Every cell makes `new Random(0)`
  (or the seed it is given) and draws `x` and then `y`, so the opening
  cell, `EstimatePi(10000, 0)` and the tables all agree: the reader meets
  3.158 three times, and 3.216 twice. The reef task inherits this, so a
  reader who draws `x` first gives exactly the solution's numbers in
  **Compare with a solution**.
- **The whole-number division as a planned surprise.** C# adds a trap that
  Python's `4 * hits / n` does not have. `4 * hits / darts` prints `3`,
  which looks like a fair answer for π, and it compiles with no warning
  (checked: the recording has no diagnostics for that cell). That makes it
  a better predict than dewlab's, and a reason for a test. It ties back to
  *Dividing*, and the reef solution's note says why `width * height` comes
  first.
- **The (0.6, 0.8) predict.** I expected floating-point trouble here
  (`0.8 * 0.8` is `0.6400000000000001` in a probe), but the sum prints `1`
  and the test gives `True`. The page says only what the cell printed. The
  `False` option's note invites the doubt, and the prose then says the
  point is exactly on the curve and that `<=` decides it.
- **Two predicts, both naming what they compare.** "What will the second
  line print?" and "What will the cell print?" (a one-line output). The
  other guesses ("what will the last column do?", "will every row be
  closer?") are asked in prose, as dewlab does, because their answer is a
  whole table, not one line.
- **No methods passed to methods.** dewlab's `estimate_area(inside, width,
  height, n, seed)` takes a function. Passing a method is not taught in PDP
  (the map's open question 5), so `EstimateArea` calls `OnReef` by name,
  and the note says that a new shape needs only a new `OnReef`.
- **No worlds.** The map gives the page none, and the style guide allows
  two at most. Of dewlab's four "Your world" tasks, the atoll became the
  task (it is an area with a known answer, and it needs `width` and
  `height`), and the two friends at the gate became the challenge (it is
  the widest idea: an "area" that is a chance). The wildfire and the
  asteroid's shadow were left out.
- **A copy of `EstimatePi` in each cell that uses it** (rule 1: each Run is
  a new program), with the test written inside the loop rather than a call
  to `InsideCircle`, to keep the copies to 15 lines. The prose says so
  where the method first appears.
- **Tables in place of charts.** The running estimate prints on doubling
  counts (10, 20, 40, ... 10,240), so a short table spans the wild start
  and the narrow end. Alignment (`{dart,5}`, `,7:F4`) is defined in one
  sentence; no earlier PDP page uses it. dewlab's lab-bench histogram
  became lowest, highest, gap and mean: 20 values in 10 bins would be a
  long cell for little gain.
- **Every quoted number is recorded.** Where dewlab's prose computed a
  number from printed ones (the average of four runs; how much worse one
  row is than another), the cell prints it (the four-seed cell prints each
  run's distance from π and the mean's), or the prose does not say it (no
  "three times further"). The calculator cell exists so that the fold's
  1000000000 is a recorded output (decision 29). The time question has no
  number, because a time differs on each machine and would make the
  recording differ on each run.
- **"Decimal places that match π"** in place of dewlab's "correct decimal
  places", and "an exact answer" and "close" in place of "exactly right"
  and "roughly right": the style guide's checklist asks that no line says
  *correct* or *right*.
- **Terms defined where they appear:** π, Monte Carlo method, simulation,
  Monte Carlo simulation, radius, estimate, running estimate, mean,
  accuracy, precision, square root (by its symbol), atoll, lagoon;
  `Math.PI`, `Math.Abs`, `Console.Write`, `{value,n}`, `:F4`,
  `ToCharArray`, `new string(line)`.
- **The grid cell is 27 lines**, past the style guide's fifteen. It is a
  cell to run and look at, not one to write, and the list under it explains
  the three lines that are new. Splitting it would leave half a picture.
- **Links.** `repeating-yourself`, `writing-your-own-functions`,
  `leaving-it-to-chance`, `dividing-in-csharp`, `storing-and-computing` and
  `three-doors` exist in `lessons/`. `three-doors` appeared there while this
  page was being written (it is part of the same batch), so the closing
  paragraph links to it. *Markov chains* is named in italics without a
  link.

## Where each number and quoted output comes from

All from `counting-darts.outputs.json`:

| Prose | Cell |
|---|---|
| `7895 of 10000 darts hit`, 3.158 | `darts-at-a-square-1` |
| `True`, `False` | `a-question-you-can-answer-by-throwing-things-1` |
| `1`, `True` | `a-question-you-can-answer-by-throwing-things-2` |
| the curve between `#` and `.` | `where-the-darts-land-1` |
| `3`; 3.216 | `one-dart-at-a-time-1` and its solution |
| 3.216, 0.07441; 3.158, 0.01641; 3.14764, 0.00605 | solution of `one-dart-at-a-time-2` |
| 2.4000, -0.7416, 2.6000, 3.1598, 0.0182, six lines below, 640 | `watching-it-settle-1` |
| 3.2000 (four lines), 1,280, 3.1344, -0.0072, 0.1584, 0.0334, 0.0279 | `watching-it-settle-2` |
| 0.34159, 0.07441, 0.01641, 0.00605, 0.01041, 0.03201, 0.00439, 0.00775 | `more-is-not-reliably-better-1` |
| 3.14764, 3.14572, 3.13384, 3.13620, 3.14085, 0.00074 | `more-is-not-reliably-better-3` |
| "off by less than a hundredth" (0.00605, 0.00413, 0.00775, 0.00539) | `more-is-not-reliably-better-3` |
| 1000000000 | solution of `more-is-not-reliably-better-2` |
| 2.28, 2.3418, 2.356 | solution of `any-shape-at-all-1` |
| 3.1112, 3.1736, 0.0624, 3.1455 | `lab-bench-1` |

Numbers written in the code or the maths (10,000, 1,500, 20 by 40, 4,
$\pi/4$, $\sqrt{100} = 10$, $100 \times 100$) are not results.

## Probes (a scratch lesson, not part of the page)

Run in the browser engine with `node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`. The page quotes none of these; they are for a
teacher.

- Speed: `EstimatePi(1000000, 0)` took about 0.2 s in the checker's
  headless Chromium. A learner's machine will differ.
- The challenge, with `if (Math.Abs(first - second) <= 10)`: `They meet in
  30617 of 100000 trials.` The exact chance is $1 - (5/6)^2 = 11/36$,
  which prints as 0.3055555555555556.
- Lab bench question 1 (`darts = 1000000`): lowest 3.1373, highest 3.1452,
  gap 0.0079 (from 0.0624): about eight times smaller, where the rule says
  about ten. The mean is 3.1416.
- Question 2: the mean of 20 runs of 10,000 is off by 0.00393; one run of
  200,000 (seed 0) gives 3.1443, off by 0.00267. On this seed, one long
  run does a little better.
- Question 3 (`x + y <= 1`): mean 2.0048, lowest 1.9564, highest 2.0460.
- Question 4: with 1,000,000 darts the lowest run is 3.1373; with
  5,000,000 all 20 runs are between 3.1404 and 3.1428. 20 runs of
  5,000,000 took longer than the checker's 30 seconds, so a reader who
  tries it should expect to wait.
- The first draft of the grid cell used 400 darts; the curve was hard to see, so the
  page uses 1,500.

## What I left out

- **dewlab's practice page.** The map's rule gives practice pages to
  tutorials, and this is an explore page. Its best problems are candidates
  for a practice page if Josh wants one (see Open): the area under
  $y = x^2$, the 10-dart question ("3.2 is the closest possible"), the
  rectangle that is too small or too large, the grid in place of random
  points, and "who made a mistake?" for 3.19 against 3.11.
- **Three of dewlab's four worlds** (wildfire, asteroid shadow, and the
  friends as a task; the friends became the challenge).
- **The matplotlib charts** (running estimate, histogram): tables instead,
  as the map says.
- **Timing** (dewlab's practice problem 6, `time.perf_counter`). `Stopwatch`
  is met only in FOOP (`namespaces-and-libraries`), and a time would make
  the recorded output differ on every run. The page invites the reader to
  time a run by watching it.
- **Two of dewlab's reading list**: *Think Stats* and Robert and Casella's
  graduate text. The PurpleMind video on matchsticks was left out to keep
  the list short; Microsoft's `Random.NextDouble` page was added as the C#
  source.
- **The "hundred trillion digits" of π** in dewlab's practice fold. The
  page says "far more places than anyone needs", with no number.

## Open

Questions only Josh can settle:

1. **A practice page for this extra?** dewlab's has twelve problems, and
   several (the lens between two circles, the grid against random points,
   the rectangle that is too small) teach things this page only touches.
   The map gives explore pages none. The same question is open for
   `leaving-it-to-chance`.
2. **The grid cell is 27 lines.** It is the one place the map asks for a
   picture made of characters. Is a long "run and look" cell acceptable, or
   should it become an SVG of the same 1,500 darts?
3. **Seeded numbers and versions of .NET.** Every number on the page is
   for .NET 10's `new Random(seed)`. Microsoft says another version may
   give other numbers for the same seed; `leaving-it-to-chance` says so,
   and this page says only "on the same version of .NET as this page". Is
   that enough?
4. **The $1/\sqrt{n}$ rule is stated, not shown to be true.** dewlab does
   the same. The lab bench's question 1 lets a reader test it (a probe gives
   about eight times, not ten). Is a stated rule acceptable at Level 5 on an
   extra page, or should the page say less about it?
5. **Covers PDP-LO2 only.** The page also uses methods, loops and a test
   with a known answer; the map gives it only LO2. Should it also name
   PDP-LO7 or PDP-LO10, as `three-doors` names LO7?
6. **The link to `three-doors`** assumes that page ships in the same batch.
   If it does not, the closing paragraph should go back to naming it in
   italics, or the checker will refuse the page.

## Review

Reviewed on 2 October 2026 as a Level 5 learner, as a teacher, and against
`docs/TRANSLATING.md` and the style guide's checklists. The page was at
version 2026.10.01.1 when the review began (the "Files" list above still
says 2026.09.28.3). It is now 2026.10.02.1, and `npm run check-lessons --
counting-darts` runs 19 times with no problems. No cell output changed, so
no number in the prose changed. I checked every number in the prose, the
folds and the solution notes against `counting-darts.outputs.json`: each
result is recorded. The only numbers that are not results are the ones in
the code and the maths (1,500 darts, 200,000 as 20 times 10,000, 0.2 and
0.9 as points) and the citation (1949, 44(247), 335-341).

### What I changed

Terms and ideas that were used before they were taught:

- **Seed and random number generator** are now defined in one sentence each
  where the page first leans on them (the same words as `three-doors`). The
  first cell uses `new Random(0)` before any prose, so the paragraph after
  it says what the 0 is.
- **How a dart becomes a point.** Nothing said that `random.NextDouble()`
  gives a number from 0 up to 1, or that the pair `x`, `y` is a point in the
  square. The page now says it, with `x` as the distance from the left side
  and `y` as the distance from the bottom, before the quarter-circle
  argument uses it.
- **Share** is defined where it first appears ("a part of the whole,
  written as a number from 0 to 1").
- **`x^2` and the sign for "at most".** The maths now says that $x^2$ means
  $x \times x$ and that $\le$ means "is less than or equal to", or "is at
  most". "The square of the distance" is gone in the prose, because a
  learner has just read about a square: it is "the distance multiplied by
  itself". "Square root" no longer appears before its definition (the old
  "has no square root in it" is now "never finds the distance itself").
  The comment in `OnReef` says the same, and a new comment says where 0.25
  comes from (the lagoon's radius, 0.5, multiplied by itself).
- **`:F5`** first appears under `one-dart-at-a-time-2`, with no
  explanation. It is now explained there, and the paragraph before the
  running-estimate table explains only the new part (`,5` and `,7`, the
  width).
- **The cast `(int)`** is named, with a link to `types-and-their-sizes`, and
  the bullet now also covers `(int)(x * 40)`, which it had left out.
- **`mean`** is also called "average" where it is defined.

Statements that were not true, or not shown:

- "Can you change one character to keep it?" (the `4` becomes `4.0`, which
  is two characters). Now "Can you change the `4`", in the prose and in the
  first hint.
- "`new string(line)` ... so that `Console.WriteLine` can print it":
  `Console.WriteLine(char[])` also works. It now says only that the line
  prints as one line of text.
- "With more darts, it still moves, but it stays closer to π" contradicts the
  page's later point that more darts are not better on every run. Now "it
  keeps moving, but each move is smaller".
- "on every path the estimate comes closer to π in the same way", from two
  tables. Now "both paths", and the fold ends with an invitation to try a
  third seed.
- "This page shows the rule at work" for the $1/\sqrt{n}$ rule. The page
  does not show it (the probe in this file found about eight times, not ten,
  for the gap in lab bench question 1). Now "This page does not prove the
  rule. The Lab bench, further down, lets you test it."
- "Two decimal places that match π": 3.13384 matches π in one decimal place,
  not two. Now "good to about two decimal places" (and "four" in the fold),
  and "a typical error that is ten times smaller is about one more decimal
  place".
- "Runs of 100,000 darts disagree in the second decimal place": two of the
  four runs agree to the second place. Now "can disagree".
- "Darts are accurate" / "nobody calculates π this way" / "the first example
  that everyone meets": now "Here the darts are accurate", "nobody who
  needs many digits of π uses this method", "a common first example".
- "There is no formula for π anywhere in the method": the area of a circle is
  the basis of the method. Now "`EstimatePi` has no value of π in it ... the
  share is π/4 because the shape is a quarter circle".
- "Now try one large run in one of the cells above" is now "any cell above
  that calls `EstimatePi`", with the call to type.

Words and sentences:

- Idioms and phrasal verbs: "as it goes", "line up", "as it is", "the other
  direction", "under all of this", "fall on both sides", "off in the same
  direction", "come from one direction". The third observation under the
  running-estimate table is now headed "It can be on either side of π".
- Long, hard sentences were cut, and several paragraphs with odd line breaks
  were rewrapped.
- "How often does a design fail when it is busy?" is now "How often does a
  website stop working when many people use it at once?". "Only statistics
  can say" is now "statistics, a part of mathematics, says".
- The `EstimateArea` paragraph named a parameter `darts` and then said
  "throws `darts` darts". It now lists the four parameters, then says what
  the method does. The `inputs` block says that `Math.Round(..., 3)` rounds
  to 3 decimal places, because the learner sees that expression in the
  table.
- The alt text of the picture now mentions the dashed radius.
- The closing paragraph now says what belongs in Visual Studio: a very long
  run, because the page stops a program after 30 seconds (checked in
  `docs/ARCHITECTURE.md`) and a downloaded project has no such limit.
- The Microsoft entry says what the method gives ("the two numbers for every
  dart"). The page it links to exists, and has an example (checked).

Cells changed: `any-shape-at-all-1` (two comments, and the starter and the
solution), and an `inputs` note. No cell id, no code that runs and no
output changed. I bumped the version and ran `--write` anyway.

### Checked and left as it is

- It does what its course-map entry says: dewlab's sections in dewlab's
  order, the matplotlib pictures as a table and a grid of `#` and `.`, no
  worlds, covers PDP-LO2 ("Algorithms and their real-world application"),
  13 cells (size M), depends on `repeating-yourself` and
  `leaving-it-to-chance`. It fits after `three-doors`, which links to it.
- No verdict words (the only "bad" is "it is not a bad seed"), no ticks,
  Irish spelling, a first hint that is a question on every cell, predicts
  with no option marked, a line named in the predict that asks about one
  line, and solutions and inputs on the cells that run.
- Each program cell works on its own, and the page says why where a method is
  copied (rule 1).
- The cell ids `more-is-not-reliably-better-1, -3, -2` are out of page order.
  They are dewlab's ids, so they stay.
- I opened the page with `npm run serve`: no console errors, and the picture
  and the maths show as they should.

### Still open for Josh

The six questions above stand. Added by the review:

7. **How many guesses?** The style guide says two or three. The page has two
   predict blocks, two guesses in prose before a run (the last column of the
   settling table, and "will every row be closer"), and the opening
   question. The weakest is the predict on (0.6, 0.8), where the paper
   calculation is already the guess. I kept it: its note on `False` sends a
   reader back to `0.1 * 3` on *Dividing*. Delete it if the page should have
   one fewer.
8. **The grid cell** is 25 lines of code (the notes above say 27). I added
   "longer than most ... for running and looking at, and you do not need to
   write it", and left the cell whole.
9. **Lab bench question 4** needs about five million darts a run, so about a
   hundred million darts in all, which took longer than 30 seconds in the
   checker. The page says what to do (make `runs` smaller, or use Visual
   Studio). Is that enough, or should the question be dropped?
10. **The reading list** keeps dewlab's descriptions of Metropolis and Ulam
    ("problems that nobody could solve in any other way") and of the
    AlphaPhoenix video ("four minutes", sensors "shaped to do the same job").
    I could not check either: YouTube refused the request, and the video
    tool had no credits. `doi.org` answers a script with 403 and goes on to
    the publisher's page. Please check the video.

Outside this page (I did not edit them):

- `lessons/leaving-it-to-chance/leaving-it-to-chance.md`, in its closing
  paragraph, still says that *The Monty Hall problem* and *Monte Carlo* "are
  not written yet". Both pages exist now, so they can be links, as
  `three-doors` links here.
- `courses/pdp.yaml` still lists `three-doors` and `counting-darts` under
  `planned:`. Both are in `lessons/`, so the lines can go
  (`docs/TRANSLATING.md`, last item of the checklist).
