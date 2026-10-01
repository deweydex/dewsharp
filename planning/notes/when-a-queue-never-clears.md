# Notes: when-a-queue-never-clears

A new page, written on 29 September 2026 from its entry in
`planning/COURSE_MAP.md` (FOOP explore E4, "Simulating a queue: how busy
is too busy?": action *adapt*, shape explore, size M, no worlds, covers
FOOP-LO6, FOOP-LO7 and FOOP-LO8, depends on `objects-and-classes` and
`leaving-it-to-chance`). Written against dewsharp's `CLAUDE.md`,
`docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md` and
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), with
`asking-a-list-a-question` (the FOOP extra before it) and the two
exemplars as the pattern. It adapts dewlab's `when-a-queue-never-clears`
(Computational Methods): its sections, its questions, its model and its
reading list. Version 2026.09.28.2 (see "How it was checked").

Files:

- `lessons/when-a-queue-never-clears/when-a-queue-never-clears.md`: the
  page. 14 `csharp exec` cells: 4 types cells (`Arrivals`, `Customer`,
  `Till`, `Simulation`) and 10 program cells. 2 predicts, 2 hints,
  1 solution with 4 inputs, 1 challenge, 2 folds, 1 picture.
- `lessons/when-a-queue-never-clears/a-queue-at-the-counter.svg`: the
  queue after the first program, with `Dequeue` at the front and
  `Enqueue` at the back. Drawn on its own white card, as the other
  pictures are, with a `<title>` and a description in the Markdown.
- `lessons/when-a-queue-never-clears/when-a-queue-never-clears.outputs.json`,
  written by `npm run check-lessons -- --write when-a-queue-never-clears`.
- No practice page. The course map's entry names none, and its list of
  practice pages has no entry for an explore page.

## How it was checked

- `npm run check-lessons -- when-a-queue-never-clears`, without
  `--write`: 17 runs, no problems. Every cell not meant to fail compiles
  with no warning, so no warning travels down the page.
- One cell is meant to fail, and the prose says so before the reader
  runs it: `a-line-at-the-counter-2` (`expect: exception`,
  `System.InvalidOperationException: Queue empty.` on line 4).
- The page was first recorded as 2026.09.28.1. Four cells then changed
  (below), so the version is now 2026.09.28.2, and the outputs were
  recorded again.
- Every number and every quoted output in the prose, the folds and the
  solution note was compared with the outputs file: `Served: Aoife`,
  `Next: Brian`, `Waiting: 3`, `Brian, Chen, Dara`; the ten steps
  `2, 0, 0, 0, 1, 2, 0, 0, 1, 0`, 0.61 and 0.60; 132 served, 0.49 and 3
  steps; 0.4 and 2.3; the table's 0.25, 1.01, 2.30, 15.58, 8.59, 8.08
  and 12.25; 43, 155, 277 and 370; 5.22, 16.03 and 42.18; 4.79, 0.00,
  0.39 and 3.66.
- Numbers in the prose that no cell prints are the utilisation levels
  (60%, 90%, 94%, 98%), read from the chance with the page's own formula,
  as dewlab's page does, and "one step out of fifty" for 98% busy. The
  first two are printed as the `busy` column of the hockey-stick table
  (0.60, 0.90), and the lab bench prints the utilisation for any chance.
- Two claims were run in a scratch lesson in the browser engine
  (`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`):
  `counter[1]` on a `Queue<string>` is `CS0021: Cannot apply indexing
  with [] to an expression of type 'Queue<string>'`; and the challenge
  runs (`Served: 19798`, `Average wait: 18.48 steps`), and a version in
  which a customer who finds 5 or more waiting leaves gives
  `Served: 18837`, `Average wait: 2.07 steps`, `Left: 978`. The page
  quotes none of these numbers.
- The page was opened in headless Chromium (`tools/serve.mjs --isolate`):
  14 cells with the expected kinds and file names, the picture loads,
  4 lesson links, no console errors.
- Links: `namespaces-and-libraries` (its section "The using lines you do
  not see" exists), `objects-and-classes`, `leaving-it-to-chance` and
  `objects-inside-objects`, all in `lessons/`. *The perceptron*
  (`a-model-that-corrects-itself`) is not in `lessons/` yet, so it is
  named in italics without a link.

## What the page does, and why

- **It opens with `Queue<T>` alone.** The style guide wants a page to open
  by running something and asking about it. dewlab's page opens with a
  paragraph about queues and goes straight to a simulation, using a
  Python list as the queue. The C# page opens with four names in a
  `Queue<string>` and a predict on who is served first, then names
  *first in, first out*, `Enqueue`, `Dequeue`, `Peek` and `Count`, and
  shows the empty-queue exception on purpose. The course map's entry asks
  for `Queue<T>`, `Enqueue` and `Dequeue`, and says that the page is
  there because FOOP names collection classes; this section is where
  that happens. A fold says why a queue rather than a list.
- **Classes that model the café (FOOP-LO7), and a program built from
  them (FOOP-LO6).** dewlab has two functions. The C# page has four small
  classes, each in its own types cell: `Arrivals` (the door, with its own
  seeded `Random`), `Customer` (remembers when it arrived, and works out
  its wait), `Till` (a `Queue<Customer>`, a capacity, and the waits), and
  `Simulation`, which holds an `Arrivals` and a `Till` and runs the loop.
  The loop is shown first in a program cell, and then moved into
  `Simulation` so that every later cell can use it (rule 2). The groups
  experiment reuses `Till` and `Customer` with a different way of
  arriving, and the page points out that the till did not need to
  change. "Looking back" asks which class would change for two other
  changes to the model.
- **The course map's entry asks for "a `Customer` class".** The page has
  it, and adds the other three, because a `Customer` alone would leave
  the loop and the waits in loose variables, which is what FOOP asks
  learners to move away from.
- **Charts become text** (the entry: "the charts become a text table").
  The hockey stick is a table with a bar of `#` for each level (one `#`
  for half a step), and the unstable queue prints every 200th customer's
  wait with a bar (one `#` for 10 steps). The lab bench has no chart.
- **The formula column.** dewlab's page states the exact average wait,
  u / (4(1 − u)), in prose. The C# page prints it beside each simulated
  wait, so the claim that the two are close is recorded, not asserted.
- **Longer runs than dewlab's.** With seed 1 and 20,000 steps, .NET's
  generator gave a 90%-busy wait of 2.71 against the formula's 2.25, and
  18.48 against 12.25 at 98%. Scratch runs with seeds 1 to 8 showed that
  seed 1 is simply high over its first 20,000 steps (the other seeds gave
  2.03 to 2.30 at 90%), and that 200,000 steps with seed 1 give 2.30. So
  the hockey-stick cells and the groups cell run 200,000 steps. The
  checker ran all 17 of the page's runs in about 4.5 s. The "Your turn" method keeps
  dewlab's 20,000, and its solution note uses the difference between two
  seeds (4.79 and 3.66) to make dewlab's point that one run close to full
  tells you less than you might think.
- **Predicts (2):** who is served first (a choice whose options are the
  first line itself, with a note that names a stack for the reader who
  chooses Chen), and the 90%-busy average wait (`type: number`,
  tolerance 0.5, "What will the second line print?"), which is dewlab's
  predict. A third would have gone on the empty queue, but that cell
  must say before it runs that it is meant to stop.
- **Worlds.** None, as the entry says. dewlab's four worlds become one
  "Your turn" at an airport check-in desk (dewlab's *queues and crowds*
  world), because its second desk and its "after the rush" both teach
  something about the model.
- **"Your turn"** is a completed-code task: write `MeanWait` in three
  lines from `Simulation`. The starter returns 0 so that it compiles and
  runs, and its hints use `after: 2 runs` and `after: 3 runs`. `static`
  on the local method is explained in one sentence, in the words that
  `from-python-to-csharp` and `writing-your-own-functions` use.
- **`Till Till`.** `Simulation`'s field has the same name as its class,
  as .NET's own code often does. The page says in two sentences that C#
  allows it, and how to read `shop.Till.AverageWait()`.
- **Explicit types everywhere, no `var`,** because the page depends only
  on `objects-and-classes`, which comes before `var` is taught. Fields
  are public, as on `objects-and-classes`; `private` is not needed.
- **Visual Studio:** nothing on the page needs it, and the closing lines
  say so.
- **Spelling:** *utilisation* in prose and in the code's variable name.

## Left out

- dewlab's four worlds (at most two on a page, and the entry says none).
- matplotlib's plots of the hockey stick and of the unstable queue's
  waits; the lab bench's plot.
- The Kendall (1953) paper from dewlab's reading list: it is a
  mathematics paper, and the C# page's list starts with Microsoft's
  reference for `Queue<T>`. The video and the Harchol-Balter book stay.
- `Stack<T>`, `PriorityQueue<TElement, TPriority>`, `TryDequeue` and
  `TryPeek`. `Stack<T>` is named twice, in a predict note and in "Where
  to read more", as the collection that works the other way.
- `private` fields and properties, which would suit `Till.Waits` and
  `Till.Waiting` but would need `keeping-details-inside-an-object`
  first.
- LINQ's `Average` and `Max` for the waits: `Till` has two small loops
  instead, so the page does not depend on the LINQ extra.

## Open

Questions only Josh can settle:

1. **Four classes, or one.** The entry names "a `Customer` class and
   .NET's `Queue<T>`". The page has four classes (`Arrivals`, `Customer`,
   `Till`, `Simulation`), to serve FOOP-LO6 and FOOP-LO7. Is that the
   shape you want for this extra, or would you prefer the simulation as
   one method over a `Queue<Customer>`, closer to dewlab's page and
   shorter?
2. **Composition before its page.** `Simulation` holds an `Arrivals` and a
   `Till`, which is the subject of *Composition*
   (`objects-inside-objects`, FOOP's 17th page). The page links to it and
   explains the idea in a sentence. Is that fine for an extra that may be
   read straight after *Classes and objects*, or should the entry's
   "Depends on" add `objects-inside-objects`?
3. **The formula.** The hockey-stick table prints u / (4(1 − u)) beside
   the simulated wait, and says only that "a longer calculation than this
   page has room for" gives it. Keep the column, move the formula into a
   fold, or leave it out of a FOOP page?
4. **Run length.** The hockey stick and the groups run 200,000 steps
   (the checker ran the whole page in about 4.5 s), because seed 1 is unusually high
   over 20,000 steps. The alternative is 20,000 steps with another seed
   chosen because it is close to the formula, which would be quicker but
   hides the choice. Is 200,000 acceptable on the slowest machines your
   classes use?
5. **Version.** The task asked for 2026.09.28.1. The cells changed after
   the first recording (longer runs, a finer bar, one more printed line),
   so the page follows `docs/LESSON_FORMAT.md` and is 2026.09.28.2. No
   class has seen either version.
6. **No practice page.** As for the other extras. If colleagues teach
   from it, a short practice page could reuse dewlab's practice problems
   (a queue with a break, a second till, customers who leave).

## Review

A second reading on 29 September 2026, as a Level 5 learner who has met
only the pages before this one, as a teacher, and against the checklists
in `docs/TRANSLATING.md` and the style guide. Only the prose changed. No
cell's code, id, predict, hint, solution code or inputs changed, so the
version stays 2026.09.28.2 and the outputs file was not written again.
`npm run check-lessons -- when-a-queue-never-clears`: 17 runs, no
problems.

What changed:

- **A term used before it was defined.** *namespace* appeared with no
  definition. It is defined on *Compiler errors*, but an extra can be read
  long after that, so the page now says it again in one sentence, in that
  page's words: *a group of types with a name of its own*.
- **Phrasal verbs.** *leave(s) out* (five times) became *drop(s)*, *does
  not say* or *does not include*; *checks in one passenger* became *serves
  one passenger*; *is thought of as nearly full* became *engineers call …
  nearly full*.
- **The rules of the road.** The page moved the loop into `Simulation`
  without saying why a class was needed. It now says so with rules 3 and
  2: the cells below cannot use a loop in a program cell, but they can
  use a class.
- **Statements that were not quite true.** "Every experiment on the rest
  of this page runs the same loop" is now "Most": the groups cell has its
  own loop. "The last experiment on this page uses that" pointed at the
  groups cell, which is not the last; it now names it. "We changed one
  part" in *Looking back* now says which: `Arrivals` was replaced, and
  `Till` and `Customer` were kept. The challenge's classes are "its own,
  shorter copies", because its `Customer` has no `WaitUntil`. The fold on
  `Serve` said that `Dequeue` "would stop"; it is the program that stops.
- **The hockey stick.** "Rise steeply, like the blade of a hockey stick"
  had the parts the wrong way round: the blade is the flat part. It now
  says *a short flat blade, and then a long handle that rises*.
- **"A group of arrivals"** in the explanation of the steep rise meant
  something other than the groups section further down. It is now
  *several people arrive close together*.
- **Every number is run.** The solution note said "One desk is 94% busy",
  a number no cell prints. It now says *nearly full*. The other
  percentages (60%, 90%, 98%) are printed in the `busy` column of the
  hockey-stick table, and "one step out of fifty" follows from 0.98 there.
- **Plain words.** *clears* is glossed where the rule is stated (*or
  becomes empty again*); *rush* is glossed where the airport task uses it,
  because the inputs and the solution keep the words "after the rush";
  "a lunch rush" became *busiest at lunchtime*. "Each class *models*" no
  longer italicises a term that the page defines later (*model*); it now
  says *describes*, as *Classes and objects* does. "Change them, run it"
  on the lab bench is now a question. The video's one long sentence is
  three.

Checked and left as it is: every quoted number and output against the
outputs file (all match); the two predicts (the first and second line are
named, and no option is marked); `expect: exception` with the prose
before the cell; the hints on "Your turn" (`after: 2 runs`, the first a
question); the solution and inputs on the cell that runs; Irish spelling
(*utilisation*); links to four lessons in `lessons/`, and *The
perceptron* in italics; `NextDouble`, `(double)`, `new string('#', n)`
and `static` on a local method, all met on earlier pages, and `,10`,
which the page explains.

Still open for Josh, besides the six questions above:

7. **`leaving-it-to-chance` is a PDP extra.** A FOOP learner who came
   from Python through *Starting in C#* has not met it. The page says
   what a seed and `NextDouble` do in two sentences, so it can be read
   without it; should the entry's "Depends on" say that it is optional?
8. **Run time on slow machines** (question 4) is the one choice with a
   cost a teacher would notice: the hockey-stick table and the groups
   cell each take a noticeable moment on the checker's machine.
