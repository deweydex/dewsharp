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

## Review

Reviewed on 2 October 2026 with fresh eyes: once as a Level 5 learner who
has read *Classes and objects* and nothing else, once as a teacher against
the course map's entry (E5), and then line by line against the checklists
in `docs/TRANSLATING.md` and the style guide. The page does what the entry
asks: a `Perceptron` that tells two pixel shapes apart, in `#` and `.`, on
`bool[,]` grids, with fields that change as it trains. It covers FOOP-LO3
and LO7, it has no worlds, and it fits after the queue page, with nothing
that needs Visual Studio. What failed is below, and it was fixed in the
page. `version:` is now 2026.10.02.1. Only comments and one `inputs` block
changed in the cells, and `npm run check-lessons -- --write
a-model-that-corrects-itself` recorded the page again: the only difference
in the outputs file is the version. Every number in the prose, the folds,
the hints, the predict notes and the solution notes was compared with that
file again, and the last run was clean: 22 runs, no problems.

### Missing or wrong in the page

- **No heading for the model.** The notes said the section was called *A
  model that knows nothing*, but the heading was not in the page. The
  rule, the `Perceptron` class, the first predict and *one weight by hand*
  all sat under *A picture is an object*. The heading is there now.
- **"An object changes only when a line of code tells it to."** `Learn` is
  also called by a line of code, so the contrast did not hold. The opening
  now says what is different: on earlier pages the program decides how
  much an object changes (`TakeDamage(5)`, `Burn(30)`), and here the
  program only shows an example and the object decides for itself.
- **"Every neural network is built on the same idea"** was too strong. It
  now says a network is made of many small models like this one.
- **"The weights and the bias are ordinary `double` fields."** `Weights` is
  a `double[,]`. It now says ordinary numbers, kept in fields. The
  sentence that lists the fields now names `Bias` too.
- **"Many layers of units like ours"** used two words nothing defined. It
  now says many small models like ours, in layers.
- **The fold *Is that always so?*** said that in C# the two learning rates
  agree *nearly*, and that other seeds *sometimes* disagree. Both
  understated it. See "The learning rate", below.
- **The solution note of the tracks task** said a picture two switches
  from both tracks is in the test set twice. It is, unless it is in the
  training set, and two of the six such pictures are (run in the scratch
  lesson, not on the page). The note now says *unless it is in the
  training set*. Its last sentence (*each mistake ... came from its
  weights*) claimed more than anyone had shown. It now says what is true:
  none of the 10 mistakes on the plus and cross test set came from a
  picture with two labels.

### Used before it was taught, or not defined

- *Two-dimensional array* was named and not defined. It now says: an array
  with rows and columns.
- *Random number generator*: `new Random(1)` was in a program with only
  the seed explained. The prose now says that `new Random(1)` makes a
  random number generator, and that its seed makes it give the same
  numbers every time. The `Messy` bullet says the generator is given to it.
  A FOOP learner who has not read *Random numbers* can start here.
- `Example` was explained in brackets, after `ShapePair` used it. It comes
  first now. The `ShapePair` paragraph (seven sentences, four ideas) is a
  list, one item for each method, and `flips` is said to be the number of
  pixels switched.
- `Switched` had no reason where it first appears. It now says it is for
  the messy pictures later. It said the method "numbers the pixels", which
  it does not (the numbering is a rule for `spot`).
- The page repeated `Picture plus = ...` in eight cells, and used a class
  from a cell above, without saying why. It now names rule 2 and rule 3 once,
  in the style guide's words, and says that the first cell with only a
  class has a **Check** button.
- The page did not say where to write `Train`. It now says: in the first
  cell, then run the program in the second, as *Classes and objects* does.
- *Encapsulation* (FOOP-LO3) is not on this page, and the page lets code
  outside the class reach `Weights`. It now says, in one sentence with a
  link, that *Encapsulation* shows how a class can stop that.
- FOOP-LO7 (model things from the problem) was never said to the reader.
  *Looking back* now says the page made four classes, one for each thing in
  the problem.

### Words

- *Is no use* and *does well* (about the model) became sentences about
  mistakes and about what a model is for.
- *Easy* (*for a plus and a cross, that is easy*) became *nine numbers are
  not many*. *By hand* became *yourself* and *ourselves*, and the heading
  *Your turn: one weight by hand* is now *Your turn: set one weight
  yourself*.
- *Has not looked at a single pixel* (a phrasal verb, and not true: the
  model did use every pixel, with a weight of 0) became *No pixel can
  change an answer yet*. *Look at the sizes* became *the sizes are not
  equal*. *Call* (*the model called a cross a plus*) became *said 1*.
- *Come out*, *comes in* and *step by step* became *be*, *is in* and *ends
  with*.
- Sentences of 26 to 36 words were split where they were longest (the
  `Switched`, `Learn`, learning-rate and test-set sentences, and the list
  of earlier pages in the opening, which is now a list).
- *Why do you think there are that many?* came before the reader had seen
  the number. It is now *How many do you think there are?*
- *Which 10 pictures does the model give another label?* is now *The model
  makes 10 mistakes on the test set. Which pictures are they?* The two
  comments in the cells that said *gives another label* now say *the
  model's answer is not the label*.
- *How well does a model ... do* (lab bench) became *How many mistakes does
  a model make*, as the other questions count them.
- The *Powers* link said `^` is exclusive or *as Powers says*. Powers says
  `^` does *a job from logic*, and names no job. The page now says what the
  job is, and that Powers said the first part.
- The tracks picture was two shapes side by side in a `text` fence, which a
  screen reader reads across: `#.# #.#`, then `.#.` and nothing. It is now
  one shape, then the other, each with its name. A fox's pawprint has *four
  marks*, not *four pads*.
- *Look at* (a phrasal verb) is gone from the prose.

### Explained better

- The two numbers after pass 1 (2 mistakes, 7 corrections) looked like a
  mismatch. It now says the corrections were made during the pass, and the
  mistakes are counted at the end of it.
- The predict answer on the smaller learning rate said *the weights show
  why*, but the weights only show what is the same. The paragraph now
  says what the weights show, then *Why?*, then the reason, in short
  sentences.
- *Can you check?* now follows *`Switched` left `plus` as it was*, with the
  line to add. The old prose said `plus` did not change, and no cell
  printed it.
- The page said the clean plus and cross give 1 and 0 and that neither was
  seen. It now also says both answers match the labels.
- The challenge now says what it prints (a label and the model's answer
  for each pair of inputs), so the reader knows what to read.
- The `inputs` block of `your-turn-1-program` has a note on each line, so
  that the **Compare with a solution** table says what each row asks.

### The learning rate: what was run

The writer's note said a model with 0.05 differs from one with 0.5 "for 33
of 40 seeds, and sometimes ends differently". This review counted again
over seeds 1 to 40, with the page's own classes in a scratch lesson (not in
the repository), and counted two things:

- The mistakes on the training set after each of the ten passes differ for
  21 of the 40 seeds.
- The mistakes on the test set, or the number of corrections, at the end
  differ for 29 of the 40 seeds. Seed 1 (the page's) is one of the 11 where
  they agree, and after pass 1 even seed 1 differs (3 mistakes with 0.05,
  2 with 0.5).

So the page's rule (*a tenth of every number, the same decisions*) is exact
only with exact numbers, and for most seeds it fails in this engine. The
page now says so before the fold, and the fold says *not always* and *many
other seeds*. It gives no count, because no cell prints one.

With 0.25 or 0.125, the model's answer for every one of the 512 pictures
was the same as with 0.5, after every pass, for 60 seeds. That is what the
fold says. With 0.05 and seed 5, the smallest total that is not 0 was
1.3877787807814457E-17, and 22 of the 512 totals were that small, where
exact numbers would give 0 (the fast model had 64 exact zeros).

### Checked and left alone

- Every number in the prose, the folds and the notes (the list is in "How
  it was checked", and was run again).
- The 10 pictures: 7 crosses called 1, all with the middle-left pixel
  black, and 3 plus signs called 0, all with it white. Read from the
  recorded output, one by one.
- Two predicts, each where a guess is interesting; no option marked right;
  each question names its line; hints ask a question first; the cell meant to fail has `expect: CS1061` and the prose says it
  is meant to fail before it runs; solutions and `inputs` are on the cell
  that runs.
- `Perceptron` is written three times: the first version, the second, and
  the reader's copy. The reader's copy is the second version without its
  comments, and the solution's class is that plus `Train`. Compared by
  script.
- The challenge compiles on its own. Run as an ordinary cell in the scratch
  lesson: OR is learned in 20 passes, and exclusive or is not (it says 1,
  1, 0, 0 for labels 0, 1, 1, 0).
- Lab bench questions, run in the scratch lesson (none of the numbers is on
  the page): `flips` 4 gives 8 mistakes on 20 training pictures and 81 on
  222 test pictures; `perShape` 2 gives 65 on 164; 100 passes give the same
  10 mistakes and 21 corrections as 10 passes. A picture 3 switches from
  one shape is never 3 switches from the other, as the tracks note says.
- 20 + 148 = 168, every picture exactly 3 switches from a shape (2 × 84),
  so the 20 training pictures are all different. Not on the page.
- Opened in headless Chromium (`tools/serve.mjs --isolate`, a scratch
  script outside the repository): 17 cells, with the kinds and files the page
  expects; the new heading; the seven lesson links load; the first cell
  and the reader's task run; no console errors.
- No `right`, `wrong`, `correct` or `well done` in the prose. The ids
  `a-model-that-starts-out-wrong-*` stay (see the first question below).

### Answers to the writer's questions, and what is open for Josh

1. **Size (17 cells, the entry says M, 8 to 15).** Keep 17. Both cells the
   writer named do work: the opening cell is the "run first" opener and the
   only place the reader sees a `bool[,]` written out, and the
   learning-rate cell is a section dewlab has and the page's second
   predict. Five of the 17 are classes. If Josh wants 15, cut the
   learning-rate cell and its fold (that also settles question 2) and the
   opening cell; the page would then have one predict, not two. Or change
   the entry to say M, with 17 cells, 5 of them classes.
2. **0.05 or 0.125.** Open. The facts are above: with 0.05 the page's
   explanation holds for seed 1 and fails for most others. The page now
   says so, in prose and in a fold, and lab bench question 4 lets the
   reader find a seed. 0.125 would print `0.63` and `0.13` at two decimals
   (a quarter of 2.50 is 0.625), so it is not neat. 0.25 prints neatly
   (half of every weight) and is exact for every seed, but it is not "much
   smaller", and the fold and the link to *Dividing* would go. I would keep
   0.05: the caveat is a good one for a C# course, and it is now stated
   plainly.
3. **Verdict words.** *Correction* is fine: it names what the model does
   and says nothing about the reader's work. Keep the ids. They show only
   in the file name of a downloaded project, and the course map's rule is
   that a cell that keeps its task keeps its dewlab id, so that a teacher
   can put the two pages side by side. If Josh prefers to rename them, it
   costs nothing now and loses that.
4. **`ShapePair`.** Acceptable on an extra. The code has comments, the prose
   says what each method gives, and the test-set section says what
   `EveryPicture` and `TestSet` do. Open if Josh wants a fold: the one to
   explain is `EveryPicture` (doubling a list once for each pixel).
5. **`leaving-it-to-chance`.** The page now says what `Random`, a seed,
   `Shuffle` and a range do, in a sentence each, so it can be read without
   that page. `grids-and-references` is a PDP page that the FOOP course
   does not list, and the page now defines a two-dimensional array in a
   sentence. The entry's "Depends on" could say *helpful, not needed*. This
   review did not edit the course map.

Open, and outside this task:

- **`courses/foop.yaml`** still lists this page under `planned:` (it can
  go), and *Simulating a queue* ends with *The perceptron* in italics, with
  no link (it can link now). Neither file could be edited here.
- **The word *model*.** *Simulating a queue* defines it as a simplified copy
  of something real, made to answer a question. This page defines it as a
  rule that makes a decision from some numbers. Each is defined where it
  first appears, and each is right for its page. A reader who does both
  extras meets two meanings. If Josh wants one, change one page.
- **`file: ShapePair.cs`** holds `Example` as well. LESSON_FORMAT's default
  would be `Example.cs`. A Visual Studio project downloaded from this cell
  has one file with two classes.
- **No practice page**, as for the other extras.
