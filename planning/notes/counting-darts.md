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
