# Notes: a-model-that-corrects-itself

A new page, written on 2 October 2026 from its entry in
`planning/COURSE_MAP.md` (FOOP explore E5, "The perceptron: a class that
learns from its mistakes": action *adapt*, shape explore, size M, no
worlds, covers FOOP-LO3 and FOOP-LO7, depends on `objects-and-classes`,
`grids-and-references` and `leaving-it-to-chance`). Written against
dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md` and
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), with the two exemplars and
`when-a-queue-never-clears` (the FOOP extra before it) as the pattern. It
adapts dewlab's `a-model-that-corrects-itself` (Computational Methods):
its sections, its questions, its model, its "your world" task and its
reading list.

A partial draft was in `lessons/a-model-that-corrects-itself/` from a run
that a usage limit stopped: cells with no prose, recorded once. This page
keeps its idea (a `Picture` class over a `bool[,]`, a `Perceptron` class, a
class that makes messy pictures, the bird and fox task, the challenge) and
rewrites the rest. Its outputs were recorded again from the new cells.

Files:

- `lessons/a-model-that-corrects-itself/a-model-that-corrects-itself.md`:
  the page. 17 `csharp exec` cells: 5 types cells (`Picture`, `Perceptron`
  twice, `Example` with `ShapePair`, and `Perceptron` for the reader's
  task) and 12 program cells. 2 predicts, 5 hints, 3 solutions (one with
  4 inputs), 1 challenge, 2 folds, 1 `text` fence, 1 formula.
- `lessons/a-model-that-corrects-itself/a-model-that-corrects-itself.outputs.json`,
  written by `npm run check-lessons -- --write a-model-that-corrects-itself`.
- No practice page and no pictures. The course map's entry names no
  practice page, and its list of practice pages has none for an explore
  page. The shapes are drawn in `#` and `.` by the page's own cells, as
  the entry asks, so a picture would repeat them.

## How it was checked

- `npm run check-lessons -- a-model-that-corrects-itself`, without
  `--write`: 22 runs, no problems. Every cell not meant to fail compiles
  with no warning, so no warning travels down the page.
- One cell is meant to fail, and the prose says so before the reader runs
  it: `your-turn-1-program` (`expect: CS1061`, `'Perceptron' does not
  contain a definition for 'Train'`, at (8,7)). Its solution runs, and its
  four inputs give 0, 4, 50 and 12.
- Version 2026.09.28.1, as the task asked. The cells were settled in a
  scratch lesson first (`node tools/check-lessons.mjs --lessons <scratch>
  --write`), so the real page was recorded once, and only prose changed
  after that. The draft had been recorded under the same version; no class
  has seen either.
- Every number and quoted output in the prose, the folds, the hints and
  the solution notes was compared with the outputs file: 8 pixels; `0` and
  `0`; `plus:  0`, `cross: 1`, then `plus:  1`, `cross: 0`; 20 pictures,
  the first three with label 0; mistakes 2 and 7 corrections after pass 1,
  mistakes 0 and 21 corrections from pass 4; `0.05: mistakes 0,
  corrections 21` and the weights 0.05 / 0.50, -0.15 / -1.50, bias 0.05 /
  0.50; 512, 148 and 10; the 10 pictures (7 crosses called 1, all with the
  middle-left pixel black; 3 plus signs called 0, all with it white); the
  weights 0.50, 2.50, 0.50, 2.00, -1.00, -1.50 and 0.00; totals 6.00 and
  -5.00; 4 pixels, 0 in 20, 4 in 50, 12 corrections.
- Numbers I took out because no cell printed them: "pixel 4 is in row
  `4 / 3`, which is 1"; "0.5 or -0.5" for a correction; "four pictures"
  for `perShape` 2; "a million pixels"; "five times as important". The
  count 512 is printed by `EveryPicture().Count` so that $2^9 = 512$ is
  recorded, not asserted.
- Claims run in the scratch lesson in the browser engine, and not quoted
  as numbers:
  - **The learning rate.** Over seeds 1 to 40, a model with 0.25 or 0.125
    makes the same mistakes as one with 0.5 after every pass, every time.
    A model with 0.05 differs after at least one pass for 33 of the 40
    seeds, and ends differently for some (seed 5: 33 against 16 test
    mistakes). With seed 1, the page's seed, the two end the same (the
    recorded cell), though after pass 1 the 0.05 model makes 3 mistakes
    where the 0.5 model makes 2. The cause is that a `double` cannot hold
    0.05, so a total that should be exactly 0 comes out at about
    ±1.4E-17, and `> 0` answers the other way. This is the fold *Is that
    always so?* and lab bench question 4.
  - **The bird and fox task.** 4 pictures are in the test set with both
    labels, and each of the model's 4 mistakes is the label-0 copy of one
    of them. The solution note says this without a number.
  - **The lab bench questions.** `flips = 4`: 8 mistakes in 20 training
    pictures, 81 in 222 test pictures. `perShape = 2`: 65 in 164.
    100 passes: the same as 10 (no change after pass 4).
  - **The challenge.** OR is learned in 20 passes (weights 0.5, 0.5, bias
    0); exclusive or is not (it answers 1, 1, 0, 0 for 0, 1, 1, 0). The
    checker only compiles the challenge (`DECISIONS.md` 40), and the page
    asks the questions without the answers.
- The page was opened in headless Chromium (`tools/serve.mjs --isolate`):
  17 cells with the expected kinds and file names (`Picture.cs`,
  `Perceptron.cs`, `ShapePair.cs`, `Program.cs`), the formula renders, 7
  lesson links load, no console errors. Running cell 1, the learning-rate
  cell and the reader's task on the page gave the recorded output, and the
  task's CS1061 message.
- Links: `objects-and-classes`, `grids-and-references`,
  `leaving-it-to-chance` (twice), `dividing-in-csharp`,
  `powers-in-csharp` and `when-a-queue-never-clears`, all in `lessons/`.
- The reading list: the three dewlab sources (the Spanning Tree video is
  in dewlab's `planning/video-library/picks.csv` for this page), and
  Microsoft's "What is ML.NET and how does it work?", whose address
  answered 200 with that title on 2 October 2026.

## What the page does, and why

- **An object whose fields change itself (FOOP-LO3, FOOP-LO7).** The
  entry's "why" is that the fields change as it trains, which makes an
  object feel alive. So the intro starts from the objects of earlier pages,
  which change only when a program calls `TakeDamage` or `Burn`, and the
  page says three times where the change comes from: after the training
  loop ("No line outside the class set them. `Learn` did"), after the
  weights ("The object found that itself"), and in *Looking back*, which
  asks which of the four fields changed, which line changed each, and
  which never changed after the constructor (`LearningRate`). dewlab's
  model is two lists and a function; the C# page has four small classes,
  each a thing from the problem: `Picture`, `Example` (a picture and its
  label), `ShapePair` (the two shapes, and the training and test sets made
  from them) and `Perceptron`.
- **`bool[,]`, as the entry asks.** The first cell draws a plus from a
  `bool[,]` (the two-dimensional array of *Grids and references*), and
  `Picture` keeps its pixels in one. With `bool` pixels, the model adds the
  weights of the black pixels, and a paragraph says that books multiply
  each pixel by its weight, which gives the same total.
- **The model is a class written twice.** `Perceptron` first has only
  `Weights`, `Bias`, `Total` and `Predict`, so the reader meets the rule
  before the learning. It is written again in *Running it again and
  again* with `LearningRate`, `Corrections`, `Learn`, `Mistakes` and
  `ToString` (rule 4, named in the prose). A third copy is the reader's,
  for `Train`. `Total` is its own method so that *What the model learned*
  can print the totals of the clean shapes (dewlab's practice problem 6).
- **"Mistakes", not "right".** dewlab counts the examples the model gets
  right, and its prose says *correctly*, *right* and *wrong*. The style
  guide allows none of those words, so the C# model counts its mistakes
  (`Mistakes`), the outputs say `mistakes 2`, and the prose says that an
  answer *matches* its label. The output is `mistakes 2, corrections 7`
  rather than `2 mistakes`, so that one mistake never prints as
  `1 mistakes`. `correction` and `Corrections` are kept: they describe the
  model, as the course map's title and dewlab's id do.
- **`direction`, not `error`.** dewlab's `error = label - guess`. On these
  pages *error* means a compiler error, so the C# name is `direction`
  (1, -1 or 0), which is also what it does: the way the weights move.
- **Section 1's task changed.** dewlab asks the reader to set the
  top-middle weight to 1.0. The C# cell starts with the top-left weight at
  1.0, so the model says 1 for the cross, and asks the reader to move it.
  The hint asks which pixels are black in one shape and white in the
  other, and the solution note asks about the other arms and the centre
  without answering (no cell prints those).
- **Predicts (2).** The new model's answer for the plus ("What will the
  first line print?": 1, 0, *It does not compile*), and the smaller
  learning rate ("What will the second line print?", with three lines as
  options, one of them the output). dewlab's learning-rate *your turn*
  became a cell that trains both models side by side, because a cell that
  prints the answer gives the prose recorded numbers. Other questions on
  the page are prose questions with no predict block (what the first cell
  draws, what `Switched(4)` draws, why 512, whether the arms' weights are
  above 0), so the page has two guesses, not six.
- **The learning rate and `double`.** dewlab says a smaller rate takes the
  same epochs and gives weights exactly ten times smaller. That is true
  with exact numbers and false now and then in C# (and in Python), because
  of 0.05 (see "How it was checked"). The page keeps dewlab's 0.05, shows
  the recorded result for seed 1, says "with exact numbers" in the
  explanation, and adds a `dl-why` fold that explains the tiny totals with
  a link to *Dividing*, and says that 0.5, 0.25 and 0.125 always agree.
  Lab bench question 4 lets the reader find a seed where they do not.
- **The middle-left pixel.** The C# training set is not dewlab's, so the
  numbers differ (dewlab: 12 of 20 in the first epoch, 141 of 149 on the
  test). The C# model leans on the middle-left pixel (2.50, against 0.50
  for the middle-right), and all 10 of its test mistakes follow from it.
  The solution note of *Which pictures?* points this out, and *What the
  model learned* explains it with dewlab's point that the sizes record
  which pixels were black in the pictures that caused a correction.
  dewlab's counts of how often each weight moved were left out: they need
  a counter per weight, and the page has made its point without them.
- **The test set.** dewlab uses `itertools.combinations`. `ShapePair`
  instead makes every picture a 3 by 3 grid can show (`EveryPicture`,
  which doubles a list once for each pixel) and keeps the ones exactly
  `flips` pixels from a shape and not in the training set. That works for
  any number of flips, which the bird and fox task (2) and the lab bench
  need, with only loops and lists. The prose explains the count 512 and
  says that `EveryPicture` makes the pictures one pixel at a time, but it
  does not walk through the method: the page is about the perceptron.
- **Random numbers.** `Messy` uses `generator.Shuffle(spots)` and
  `spots[..flips]`, both taught on *Random numbers* (`choosing-from-a-list`),
  and the page says what each does in one sentence for a reader who has
  not met that page. The seed is passed into `TrainingSet`, as the queue
  page passes it into `Arrivals`.
- **The reader's task.** dewlab's "Your world" had four worlds; the entry
  says none, so the page keeps one pair, dewlab's *living systems* (a
  bird's footprint and a fox's pawprint), drawn in a `text` fence. The
  task is a method of the class, `Train`, so that the training loop the
  page repeated in six cells finally lives in one place (FOOP-LO3). It
  follows decisions 26 and 27: a types cell `your-turn-1` with the class,
  a program cell `your-turn-1-program` that does not compile until `Train`
  exists, with the inputs, two hints and a solution that writes the class
  again below its statements. The note explains the 4 mistakes with
  dewlab's "meet in the middle" point, without dewlab's counts.
- **The lab bench comes before the reader's task**, the reverse of
  dewlab's order. The task's types cell holds a `Perceptron` that the
  reader is editing, and a class that does not compile stops every cell
  below it (`docs/TRANSLATING.md`), so it is the last cell on the page. The
  lab bench prints the model too, so that question 3 (other seeds) shows
  the weights change.
- **The challenge** is the draft's: a two-input perceptron that learns OR,
  and the question whether it can learn exclusive or. It answers dewlab's
  last paragraph ("a single perceptron ... cannot learn some patterns at
  all") with something to run, and it names exclusive or as the "job from
  logic" that *Powers* says `^` does, with a link.
- **Explicit types everywhere, no `var`,** because the page depends only
  on `objects-and-classes`, which comes before `var` is taught. Fields are
  public, as on `objects-and-classes`. `return;` in a `void` method,
  `"\n"`, `!`, `,6` and `:F2` are each explained where they first appear.
- **Cell ids** are dewlab's, including `a-model-that-starts-out-wrong-*`
  under the heading *A model that knows nothing* (the heading changed
  because *starts out* is a phrasal verb and *wrong* a verdict) and
  `what-the-model-actually-learned-1`. Ids are not shown on the page.
  dewlab's `your-world-1--<world>` became `your-turn-1` and
  `your-turn-1-program`, as the queue page did, because the page has no
  worlds.
- **Visual Studio:** nothing needs it, and the closing lines say so.
  `Random.Shuffle` needs .NET 8 or later; the downloaded project targets
  .NET 10.

## Left out

- dewlab's four worlds (the entry says none), and its world solutions for
  the queue, the spread of a disease and the meteor streaks.
- matplotlib: the picture of the two shapes and the accuracy graph. The
  shapes are drawn in `#` and `.`, and the graph is the per-pass lines.
- The dot product and the link to *Matrix multiplication*, and the link to
  *Systems of equations*: maths pages that dewsharp does not have.
  The intro's link to the module's earlier models ("a matrix
  transformation, a system of equations and even the π estimate") became
  the earlier objects of FOOP.
- dewlab's counts of how often each weight moved (13 times, 6 down; the
  centre 19 times, 10 up and 9 down). No cell prints them.
- dewlab's practice page. Its ideas that fit are on the page in another
  form: the totals of the clean shapes (problem 6), the model and the
  training as two things (problem 9), and the pictures with both labels
  (problem 10) in the task's note.
- `Score` as a share (dewlab's accuracy, 0.95). The page uses counts, so
  that every number is an integer from an output.

## Open

Questions only Josh can settle:

1. **Size.** The entry says M (8 to 15 cells). The page has 17, as the
   draft did: the entry also says "It is long, so it is the last extra".
   Two cells could go without losing a section: the opening `bool[,]`
   drawing (the `Picture` class does the same), or the learning-rate cell
   (it could become a lab bench question). Keep 17, or trim to 15?
2. **0.05 or 0.125.** The page keeps dewlab's learning rate of 0.05 and
   explains in a fold why it sometimes disagrees with 0.5 in C#. The other
   choice is 0.125: every claim would then be exact for every seed, and
   the fold could go, but the reader would meet an odd-looking number and
   lose the link to *Dividing*. Which do you prefer for a FOOP extra?
3. **Verdict words and the model.** The page never says *right*, *wrong*
   or *correct*, even about the model, and counts `Mistakes`. It does use
   *correction* and the field `Corrections`, and keeps the ids
   `a-model-that-starts-out-wrong-*` from dewlab. Is *correction* fine,
   and should ids that contain *wrong* be renamed while no class has used
   the page (it would cost nothing now)?
4. **`ShapePair` does more than the page explains.** `EveryPicture` and
   `TestSet` are read-if-you-like code: the prose says what they give, not
   how each line works. Is that acceptable on an extra, or would you
   rather have a fold that walks through `EveryPicture`?
5. **Depends on `leaving-it-to-chance`**, a PDP extra that a FOOP learner
   who came from Python has not met. The page says what `Shuffle`,
   `spots[..flips]` and the seed do in a sentence each. Should the entry
   say that page is optional, as the queue page's notes also asked?
6. **No practice page**, as for the other extras. If colleagues teach
   from it, dewlab's practice page has problems that would translate
   easily (a bias of 5 and no weights; training on the reversed list;
   accuracy as a share; a blank picture; a tenth pixel that is always 0).
7. **The course file.** `courses/foop.yaml` still has this page under
   `planned:`. Now that the page is in `lessons/`, that line can go
   (`docs/TRANSLATING.md`, checklist); this task did not allow editing
   course files. The queue page names *The perceptron* in italics, and
   can now link to it.
