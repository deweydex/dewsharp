# a-total-that-starts-again: notes for a reviewer

Ported from dewlab `tutorials/a-total-that-starts-again/a-total-that-starts-again.md`
(version 2026.09.26.1). It is a closer look: dewlab's experiment-first
shape, with two ideas that cannot both be true and one experiment that
decides between them. Its home page is `repeating-yourself`, which it
follows in PDP's "First programs" series (`planning/COURSE_MAP.md`, PDP row
11: "adapt", shape "closer look", size S, no worlds, batch 3). dewlab has
no practice page for it, and its glossary file is `entries: []`, so there
is neither here. The course map lists closer looks under "Lessons with no
worlds".

`covers: [PDP-LO8, PDP-LO6]` comes from the course map's entry. PDP-LO8 is
"Modularisation: functions, procedures, scope, parameter passing" and
PDP-LO6 is "Structured design: pseudocode, storage, selection and
iteration" (dewlab `planning/curriculum/outcomes.yaml`). dewlab's
frontmatter has no `covers:`. The course map's table of what the
descriptors ask for gives "Local and global variables; scope" to this page
first, then `writing-your-own-functions` and `building-reusable-tools`. So
this is the page that names *scope*. `year:` is dropped, because dewsharp's
format has no such field.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/a-total-that-starts-again/a-total-that-starts-again.md`,
its recorded outputs are
`lessons/a-total-that-starts-again/a-total-that-starts-again.outputs.json`
(written by the browser checker), and this file was the draft's
`NOTES.md`. The two `*.native.json` files were deleted: the browser
checker's outputs file replaces them. The draft had no pictures. "What was
done when it moved", just below, says what changed in the move. The
porter's notes follow it, with anything the move made stale marked
*(stale)* or brought up to date. "The porter's questions, and what was
decided" settles the open questions where the playbook, the course map,
the style guide or the example lessons answer them; the rest are under
"Open".

Files:

- `a-total-that-starts-again.md`: the lesson. Three program cells, one of
  them meant not to compile (`expect: CS0103`), two predicts (one choice,
  one text), two hints, two solutions, no answer folds, `inputs` or
  challenge.
- `a-total-that-starts-again.outputs.json`: what the browser checker
  recorded, version `2026.09.28.1`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  a-total-that-starts-again` ran the draft's three cells in the real
  engine. Every one did what the native check said, with the same text,
  line and column: `an-experiment-1` printed `Day 1 starts at 0`,
  `Day 2 starts at 0` and `Day 3 starts at 0`; `where-a-variable-lives-1`
  did not compile, CS0103 at (7,34), *The name 'total' does not exist in the
  current context*, with no other message and no output;
  `where-else-it-happens-1` printed `A`. The browser differed from the
  draft in nothing: no culture formatting (the page prints no decimals or
  money), no trimmed API, no stray warning, and `Console` behaved as on a
  computer.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches the native check's:
  `fold-moved` printed 0, 10 and 20 and `At the end: 30`;
  `day-in-last-line` CS0103 at (7,34) naming `day`; `copied-not-moved`
  CS0136 at (4,9); `assign-inside` printed 0, 0 and 0 and
  `At the end: 10`; `letters-fixed` printed `SEA`; `no-initial-value`
  CS0165 at (4,46); `learn-module-inside` printed
  `Inside the code block: 10`; `learn-module-outside` CS0103 at (7,46),
  the message and place that the Learn module itself shows;
  `learn-module-sample-1` CS0165 at (10,46); `learn-module-sample-2`
  printed both lines with 10. Two new probes cover the rest of the Learn
  module's first exercise: `learn-move-above` gives CS0165 at (5,49), and
  `learn-initialise` prints `Inside the code block: 0` and
  `Outside the code block: 10`, as the module says. (The module prints
  `Program.cs(6,49)` for `learn-move-above`; its listing has the reading
  on line 5, so the module's line number is one out, or its file had a
  blank first line. The page quotes neither.)
- **Every number and every quoted output now comes from a cell on the
  page** (decision 29, as the powers and equals pages did when they moved):
  - The answer fold "one change that does it" (0, 10, 20 and
    `At the end: 30`, from the probe `fold-moved`) became a `solution`
    block on `where-a-variable-lives-1`, the cell that runs. The checker
    runs it and records those four lines. Idea A's prediction in the first
    section (day 1 at 0, day 2 at 10, day 3 at 20) is in that recorded
    output too.
  - The answer fold "the line to remove" (`SEA`, from the probe
    `letters-fixed`) became a `solution` block on
    `where-else-it-happens-1`, and the checker records `SEA`.
  - The page shows each solution under its cell as a closed fold called
    "A solution", above the prose that asks for it. That is the page's
    layout for every solution, and the equals and powers pages have it too.
- **The predict on `an-experiment-1`** asks "What will the last line
  print?", with the options `Day 3 starts at 20` (idea A) and
  `Day 3 starts at 0` (idea B), in place of "Which will you see?" with
  "0, 10 and 20" and "0, 0 and 0". The page compares a choice guess with
  the whole output and with each line (decision 37). "0, 0 and 0" matches
  no line of the output, so every reader was asked "Which line explains
  what you saw?", even one whose guess was the output. The new options are
  the program's own last line, so a guess of idea B now matches. Checked on
  the page: with idea B chosen, the page shows idea B's note and does not
  ask the question. The two ideas still differ on that line, so the
  predict still decides between them.
- **The link to `compiler-errors`** went: that page is not in `lessons/`
  and is not moving in this round, and the checker refused the link
  ("goes nowhere"). The sentence now points to
  [the page about exceptions](lesson:reading-an-error-message), which is
  in `lessons/`, comes before this page in PDP's order, and has a CS0103
  from a misspelt name (`secert`, in `runtime-your-turn-3`): "CS0103 means
  that the compiler found a name it does not know. On the page about
  exceptions, the name was misspelt: `secert` in place of `secret`." The
  page does not name *Compiler errors* in italics: the sentence needs an
  example the reader has seen, and one link is plainer than two page
  names. When `compiler-errors` lands, its batch may add it here.
- **Plain language and terms** (the style guide's `#voice` and
  `#checklist`):
  - *Body* is defined where the page first uses it ("the lines between its
    curly brackets", the words `repeating-yourself` uses), because a closer
    look may be read alone.
  - Before the failing cell, the prose says only that it is meant to fail,
    and asks which line the compiler will name. After it, the outcome is in
    the style guide's words: "It did not compile, so nothing ran, not even
    the loop." The draft said "it does not compile, so nothing runs" before
    the run, which gave the outcome away.
  - *Compiling* is defined at its first use, right after that sentence,
    in the style guide's words. The "Why idea A" section no longer defines
    it a second time: "The compiler reads the whole program once, before
    any of it runs."
  - *Current context* is "the place where the name is used: here, line 7,
    after the loop", not "the part of the program that line 7 is in".
  - "A variable made inside a code block has that code block as its scope"
    became "the scope of a variable made inside a code block ends where
    that code block ends". The paragraph had just said that `total` can be
    used from line 3, where it is made, so the old sentence and that one
    disagreed about where the scope starts.
  - The paragraph on `day` now ties to what `repeating-yourself` says:
    "The page about loops said that each loop's `i` exists only inside that
    loop, and `day` is the same."
  - "Once something is written down" (a phrasal verb) became "Once a proof
    states something".
- **Visual Studio.** One line before "Where to read more": everything on
  the page runs in the browser, and nothing needs Visual Studio
  (`#the-ide`; the style guide's checklist). The powers, dividing and
  equals pages have the same line.
- **Where to read more** keeps its one source, in the form the other
  closer looks use: Microsoft, *Control variable scope and logic using
  code blocks in C#*, with the `en-us` address the other pages use. It
  returned HTTP 200 on 28 September 2026, and its first exercise ("Code
  blocks and variable scope") still makes `value` inside an `if`, shows
  `Program.cs(7,46): error CS0103: The name 'value' does not exist in the
  current context`, and moves the line above the `if`. "Short" went (the
  module has several units). "The module uses Visual Studio Code, another
  editor from Microsoft" became "which is a different program from Visual
  Studio. You do not need it: the examples in that exercise also run in a
  cell on this page." "Another" had nothing on the page to be other than,
  and a reader could take the two programs for one. "Each of its examples"
  became "the examples in that exercise", which the probes cover.
- **Frontmatter.** `version:` is `2026.09.28.1`, because both answer folds
  became solutions that the checker runs, and the predict changed.
- **The page was looked at** in headless Chromium on the real server
  (`npm run serve -- --isolate`), at 900 and 390 pixels wide. Each cell is
  labelled with `Program.cs`. The predict options render as code, KaTeX
  typesets `$t = 0$` (two `.katex` elements), the `console` block reads as
  the prose quotes it, and the links go to `repeating-yourself`,
  `reading-an-error-message` and Microsoft Learn. There is no sideways
  scroll at 390 pixels, and the console showed no errors. Run on the page,
  each cell gave what the checker recorded; the status line said "Did not
  compile, so nothing ran." for `where-a-variable-lives-1`, and its
  message read `Program.cs(7,34): error CS0103: ...`, as the prose quotes
  it.
- **Not done here: `courses/pdp.yaml`** still has
  `a-total-that-starts-again: "Starting a total: a closer look at where a
  variable lives"` under `planned:`. The playbook's checklist says to
  delete it when the lesson moves; this round's instructions leave the
  course files to the orchestrator.

## What changed from dewlab, and why (the porter's notes)

**The title** is the course map's: "a closer look at where a variable
lives", in place of "a closer look at total = 0". The page now teaches
scope as well as the misconception.

**The two ideas are the same.** Idea A says `int total = 0;` makes the
variable once. Idea B says C# runs a line each time it reaches it. The line
in C# has a type in front of it, which makes idea A more tempting than it
was in Python: `int total` looks like a declaration that is made once, and
not like an action. dewlab's "every time round" became "each time the loop
repeats", which is plainer for a reader of English as a second language.

**The experiment is split in two, as the course map asks.** In Python,
dewlab's cell printed the total at the start of each day and again after
the loop, and the end value (10) decided between the ideas as well. In C#
the line after the loop does not compile, because `total` is made inside
the loop's curly brackets (CS0103). So:

1. `an-experiment-1` prints inside the loop only. It keeps dewlab's
   predict, with "and 30 at the end" and "and 10 at the end" removed from
   the options. It prints 0 on all three days, as idea B predicts.
   *(Brought up to date: the predict now asks about the last line; see
   above.)*
2. `where-a-variable-lives-1` is dewlab's whole cell in C#, with the line
   after the loop. It carries `expect: CS0103`, and the prose says before
   the run that it is meant to fail. It asks which line the compiler will
   name, not what it will print.

**Cell ids.** The course map says "Both cells; one gets `expect: CS0103`,
and a new cell prints inside the loop". I read that loosely. The map's
principles say a cell that keeps its task keeps its dewlab id, and
dewlab's `an-experiment-1` had the task "test the two ideas", with the
predict. In C#, the cell that prints inside the loop does that task, so it
keeps `an-experiment-1`. The cell that fails to compile has a new task (see
where a variable lives), so it has a new id, `where-a-variable-lives-1`,
under a new heading. *(Settled: see "The porter's questions", item 1.)*

**"Where a variable lives" is new.** It reads the CS0103 message and
points back to an earlier CS0103 that came from a misspelt name, where
here the name is spelt the same on every line. So the message's *current
context* has to be read, and the page defines it. Then it names *scope*
("the part of a program where a variable's name can be used") and says that
`total` can be used from line 3, where it is made, to the closing curly
bracket on line 6. It names *code block*, because the link at the end uses
that term. It says that nothing ran, not even the loop, in the style
guide's words ("C# checks the whole program before it runs any of it").
*(Brought up to date: the draft pointed back to `compiler-errors`, which
is not in `lessons/`; the page now points to `reading-an-error-message`.
See above.)*

`making-decisions`, now in `lessons/`, already says, in a fold, that "a
variable made inside curly brackets exists only inside them", with the
compiler error it causes, and does not use the word *scope*, because the
map gives scope to this page. This page uses the same sentence, word for
word, and then names it.

One paragraph adds the `for` line's own variable, `day`: its scope is the
whole loop, the `for` line and the body, so the last line cannot print it
either. It is there because a reader who has just learned "inside the curly
brackets" will see that `int day` is outside them. It invites the reader to
change `total` to `day` in the last line (probe `day-in-last-line`).
*(Brought up to date: it now points to the sentence on
`repeating-yourself` that says each loop's `i` exists only inside that
loop. Settled: see "The porter's questions", item 2.)*

**dewlab's question "Can you find a change to the loop that makes idea A's
prediction come true?" moved** from after the first experiment to after
the failing cell. In C#, moving `int total = 0;` above the `for` line does
two things at once: the days start at 0, 10 and 20, and the last line
compiles and prints `At the end: 30`. "Come true" became "print what idea
A predicts", to avoid an idiom. *(Brought up to date: the answer is now a
solution that the checker runs, not a fold.)*

**Two hints on the failing cell.** The first (`after: 2 errors`) asks which
lines run only once and which run once for each day. The second
(`after: 3 errors`) is for the most likely C# mistake: copying
`int total = 0;` above the loop and leaving the one inside, which is
CS0136 (probe `copied-not-moved`, *A local or parameter named 'total'
cannot be declared in this scope because that name is used in an enclosing
local scope to define a local or parameter*). The hint names the code and
explains it without quoting the message, which uses *local*, *parameter*
and *enclosing*, three words this page has not met. The `making-decisions`
draft made the same choice for the same message.

**"Why idea A feels right" became "Why idea A is easy to believe"**, as in
the powers, dividing and equals pages: *right* is a verdict word. The
paragraphs on "let $t = 0$" and the recipe stay. "From then on" became
"after that". *(Brought up to date: the sentence now reads "$t$ is 0 from
that line to the end of the argument", and "Once something is written
down" became "Once a proof states something".)*

dewlab's third paragraph said that Python "does not look at the whole
program and decide what is true. It takes one line at a time". That is not
true of C#, which does read the whole program first. So the paragraph is
rewritten around the compile step, and it gives idea A its due: the
compiler reads `int total = 0;` once, and learns the name, the type and the
scope, before anything runs. The rest happens when the program runs: make
`total` and store 0 in it, now, each time the line is reached. "Make
`total`" is accurate. The C# standard (ECMA-334, section 12.21.6.3,
"Instantiation of local variables"; checked in the draft-v8 text of
`dotnet/csharpstandard` on 27 September 2026) says that a local variable
"is considered to be instantiated when execution enters the scope of the
variable". Its example is this page's experiment: a variable declared in a
`for` body "is instantiated and initialized three times—once for each
iteration of the loop", and moving the declaration outside the loop
"results in a single instantiation". The page does not use the word
*instantiated*, which FOOP needs for objects.

**"Where else it happens" keeps the letters cell** (`SEA` gives `A`). In
Python both lines were `letters = ""`. In C# the one above the loop makes
the variable (`string letters = "";`) and the one inside only gives it a
new value (`letters = "";`), so the cell compiles. The prose says so,
because this is the case that separates the page's two points: a line
inside a loop runs each time, whether or not it makes a variable. dewlab
asked "What would you move?", which did not quite fit, since the fix is to
remove the inner line. The C# page asks "Which line would you remove?" and
adds an answer. *(Brought up to date: the answer is a solution that the
checker runs, and it records `SEA`.)*

**Where to read more.** dewlab linked Python Tutor, which runs a program a
line at a time and draws each variable. Python Tutor does not run C#. The
C# page links Microsoft Learn's beginner module
[Control variable scope and logic using code blocks in C#](https://learn.microsoft.com/en-us/training/modules/csharp-code-blocks/).
Its first exercise, "Code blocks and variable scope", makes a variable
inside an `if`, meets CS0103, moves the line above, and then meets CS0165.
It is on exactly this page's topic, at a beginner's level. It uses Visual
Studio Code, and its examples run in a cell on this page (probes
`learn-module-inside`, `learn-module-outside`, `learn-module-sample-1`,
`learn-module-sample-2`, and, since the move, `learn-move-above` and
`learn-initialise`). Both pages were fetched on 27 September 2026, and the
module again on 28 September 2026.

## What C# made different, in short

- The variable made inside the loop cannot be printed after it (CS0103),
  so dewlab's end value (10) cannot be seen. The experiment prints inside
  the loop, and the compiler's refusal becomes a second finding: scope.
- The declaration has a type in front of it, so a line that makes a
  variable (`int total = 0;`) looks different from one that gives it a new
  value (`total = 0;`). The letters cell uses both.
- C# compiles the whole program first. dewlab's "Python takes one line at
  a time" is not true of C#, and the "why idea A" section is rewritten
  around what the compiler decides once and what the program does each
  time.
- Making `total` twice, once above the loop and once inside it, is its own
  compiler error (CS0136). Python has no such rule.
- The `for` line's variable has the loop as its scope. In Python, `day`
  would still hold 3 after the loop (Python, not run here).

## Where each number and message in the prose comes from

All from `lessons/a-total-that-starts-again/a-total-that-starts-again.outputs.json`,
except where the table says otherwise.

| Number, message or claim | Source |
|---|---|
| `Day 1 starts at 0`, `Day 2 starts at 0`, `Day 3 starts at 0`; the predict's `Day 3 starts at 0` | cell `an-experiment-1` |
| Idea A's prediction: day 1 at 0, day 2 at 10, day 3 at 20; the predict's `Day 3 starts at 20` | `where-a-variable-lives-1`, `solutions[0].output` (what the program prints once the line is moved) |
| "the 10 added on the day before" | the cell's own code (`total + 10`); `Day 2 starts at 10` in the same solution's output |
| CS0103 message, line 7, column 34; nothing ran, not even the loop (empty output) | cell `where-a-variable-lives-1`: `compile-error`, output empty |
| lines 3 to 6; lines 4 and 5 use `total` | the cell's own line numbers |
| `secert` in place of `secret` | `lessons/reading-an-error-message/reading-an-error-message.md`, cell `runtime-your-turn-3` and the prose under it |
| `day` in the last line gives CS0103 naming `day` (the page quotes no message) | probe `day-in-last-line` |
| solution: `Day 1 starts at 0`, `Day 2 starts at 10`, `Day 3 starts at 20`, `At the end: 30` | `where-a-variable-lives-1`, `solutions[0].output` |
| hint 2: CS0136 when `total` is made twice | probe `copied-not-moved` |
| `A` | cell `where-else-it-happens-1` |
| solution: `SEA` | `where-else-it-happens-1`, `solutions[0].output` |
| the Learn module's first exercise: CS0103, then the line moved above the `if`; its examples run in a cell | the module's page, fetched 28 September 2026; probes `learn-module-*`, `learn-move-above`, `learn-initialise` |
| "make `total`" each time the line is reached | the C# standard, section 12.21.6.3 (not run) |

The message in the prose says `Program.cs`, as the page shows it (checked
on the page).

## Notes that were for later, and what became of them

- **Hint counting on a cell meant to fail.** Checked: the page counts
  every run that did not compile as an error, the expected first one
  included (`web/page/lesson.js`, where `attempts.errors` is counted). On
  the page, the first run showed no hint, the second failed run (`day` in
  the last line) opened hint 1, and the third (`int total = 0;` copied
  above the loop, CS0136) opened hint 2. So `after: 2 errors` and
  `after: 3 errors` stand.
- **Hints that need a code in them.** The hint text is rendered as
  Markdown, like the prose, so `total` in hint 2 is code. `CS0136` is
  written as plain text, as the prose writes error codes.
- **The console block.** Checked: the page shows
  `Program.cs(7,34): error CS0103: The name 'total' does not exist in the
  current context` under the cell, as the prose quotes it.
- **KaTeX.** Checked: `$t = 0$` is typeset.
- **Links out.** The opening "the page about loops" stays, the form the
  other closer looks use for their home page ("the page about decisions").
  The link to `compiler-errors` is gone (see above).
- **What the page about loops says.** Checked against
  `lessons/repeating-yourself/repeating-yourself.md`, now in `lessons/`:
  `your-turn-1` has `int total = 0;` above a `while` loop and
  `Console.WriteLine(total);` after it; the page defines a loop's *body*
  as "the lines between its curly brackets"; and it says that "each loop
  makes its own `i`, which exists only inside that loop". So the first
  paragraph and the paragraph on `day` agree with it.
- **Links in.** See "Open", item 1.

## The porter's questions, and what was decided

1. **Which cell keeps `an-experiment-1`?** Decided: the cell that prints
   inside the loop, as the porter chose. The course map's "Principles of
   translation" say that "a cell that keeps its task keeps its dewlab id"
   and "a cell with a new task gets a new id". dewlab's `an-experiment-1`
   carries the predict that decides between the two ideas, and in C# the
   cell that prints inside the loop does that; the cell that fails to
   compile prints nothing, and cannot decide between them. The map's own
   "What changes in C#" says the same: "The two ideas are tested with a
   print inside the loop". Nothing is saved under either id yet.
2. **The paragraph on `day`.** Decided: keep it. It adds no cell (the
   reader changes one word in the cell above it), so the page stays at
   three cells, an S page. `repeating-yourself` already says that a `for`
   loop's `i` exists only inside that loop, and this page is where that
   fact gets its name, so the paragraph ties the two together. The course
   map's rule that a closer look's problems go to its tutorial's practice
   page is about problems; this is an invitation to check one line, in the
   style guide's "give the reader something to try".
3. **CS0165.** Decided: not on this page. The course map gives CS0165 to
   `compiler-errors` ("a variable used before it has a value"), and says a
   closer look's other problems go into its tutorial's practice page. The
   Learn module, linked at the end, shows CS0165 for a reader who wants it.
4. **dewlab's end value, 10.** Decided: not on this page, for the course
   map's reason in item 3 ("Its problems go into the practice page of the
   tutorial it belongs to"). A problem for `repeating-yourself-practice`
   is under "Open", item 2.
5. **"Local" and "global".** Decided: not on this page. The course map's
   entry for `writing-your-own-functions` says "A top-level variable that a
   method uses is the nearest C# has to a global variable", and the draft
   of that page names *scope*, *local* and *global* in its scope section.
   The Learn module defines *local variable* itself.
6. **A challenge at the end?** Decided: no. The course map's "Closer looks"
   says a closer look "has no worlds and no practice page ... and it ends
   with one thing to read", and the powers, dividing and equals pages end
   the same way. The page now ends with the line on Visual Studio and one
   thing to read.
7. **The page opens with prose, not a cell.** Decided: keep it. The course
   map's "Closer looks" keeps dewlab's shape (two ideas, then the
   experiment that tests them), and the powers, dividing and equals pages,
   in `lessons/`, open the same way. The two ideas are the question the
   first cell answers.
8. **"Part of idea A is true in C#."** Decided: keep it. It is accurate
   (the C# standard, as above), and the style guide asks the page to show
   what the code did with no verdict on the reader (`#voice`) and to treat
   the compiler as part of the lesson (`#the-compiler`). The powers page
   opens its section in the same spirit ("Idea A is not a strange idea").

## Open

For Josh, or for the orchestrator:

1. **Links in.** Nothing links to this page yet. Decision 14 says a
   forward link is added by the batch that writes the page it points to,
   and this page is batch 3, so the link from `repeating-yourself` (batch
   2, now in `lessons/`) belongs to this batch. This move may not edit
   another lesson. The natural place is after `your-turn-1`'s paragraph on
   the accumulator pattern
   (`lessons/repeating-yourself/repeating-yourself.md`, after "It adds
   1 + 2 + 3 + 4, and prints 10. ... an accumulator too, of letters instead
   of numbers."): "What happens if `int total = 0;` moves inside the loop?
   [Starting a total](lesson:a-total-that-starts-again) has an
   experiment." The fold on `string pixel;` in
   `lessons/making-decisions/making-decisions.md` ("a variable made inside
   curly brackets exists only inside them") could link here too, since this
   page names what that fold describes.
2. **A problem for `repeating-yourself-practice`**: "This program compiles.
   Why does it print `At the end: 10`?", with `int total = 0;` above the
   loop and `total = 0;` (no `int`) inside it (probe `assign-inside`: it
   prints 0, 0 and 0, and `At the end: 10`). It is dewlab's idea B exactly,
   and it belongs on the practice page of this page's home tutorial (course
   map, "Closer looks"), which this move may not edit.
3. **`courses/pdp.yaml`** still lists this page under `planned:` (see
   "What was done when it moved").

## Probe cells

Run in the browser by copying them into a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`). The
`expect:` cells fail on purpose.

```csharp exec
id: fold-moved
int total = 0;
for (int day = 1; day <= 3; day++)
{
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
Console.WriteLine($"At the end: {total}");
```

```csharp exec
id: day-in-last-line
expect: CS0103
for (int day = 1; day <= 3; day++)
{
    int total = 0;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
Console.WriteLine($"At the end: {day}");
```

```csharp exec
id: copied-not-moved
expect: CS0136
int total = 0;
for (int day = 1; day <= 3; day++)
{
    int total = 0;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
Console.WriteLine($"At the end: {total}");
```

```csharp exec
id: assign-inside
int total = 0;
for (int day = 1; day <= 3; day++)
{
    total = 0;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
Console.WriteLine($"At the end: {total}");
```

```csharp exec
id: letters-fixed
string letters = "";
foreach (char letter in "SEA")
{
    letters = letters + letter;
}
Console.WriteLine(letters);
```

```csharp exec
id: no-initial-value
expect: CS0165
for (int day = 1; day <= 3; day++)
{
    int total;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
```

```csharp exec
id: learn-module-inside
bool flag = true;
if (flag)
{
    int value = 10;
    Console.WriteLine($"Inside the code block: {value}");
}
```

```csharp exec
id: learn-module-outside
expect: CS0103
bool flag = true;
if (flag)
{
    int value = 10;
    Console.WriteLine($"Inside the code block: {value}");
}
Console.WriteLine($"Outside the code block: {value}");
```

```csharp exec
id: learn-module-sample-1
expect: CS0165
bool flag = true;
int value;

if (flag)
{
    value = 10;
    Console.WriteLine($"Inside the code block: {value}");
}

Console.WriteLine($"Outside the code block: {value}");
```

```csharp exec
id: learn-module-sample-2
int value;

if (true)
{
    value = 10;
    Console.WriteLine($"Inside the code block: {value}");
}

Console.WriteLine($"Outside the code block: {value}");
```

```csharp exec
id: learn-move-above
expect: CS0165
bool flag = true;
int value;
if (flag)
{
    Console.WriteLine($"Inside the code block: {value}");
}
value = 10;
Console.WriteLine($"Outside the code block: {value}");
```

```csharp exec
id: learn-initialise
bool flag = true;
int value = 0;
if (flag)
{
    Console.WriteLine($"Inside the code block: {value}");
}
value = 10;
Console.WriteLine($"Outside the code block: {value}");
```
