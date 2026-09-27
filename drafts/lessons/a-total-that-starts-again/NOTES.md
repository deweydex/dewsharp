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

Status: written in one run on 27 September 2026. There was no partial
draft. The native check prints "No problems." for both files.

Files:

- `a-total-that-starts-again.md`: the lesson. Three exec cells, two
  predicts, two hints, two answer folds.
- `a-total-that-starts-again.native.json`: what the native check recorded
  for the lesson's cells.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).
- `NOTES.native.json`: what the native check recorded for the probes.

## What changed, and why

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
under a new heading. The literal reading would give the failing cell
`an-experiment-1` and the new cell a new id, placed above it. No class has
used this page, so either is safe now. See open question 1.

**"Where a variable lives" is new.** It reads the CS0103 message in the
five parts that `compiler-errors` teaches, and points back to that page:
there, CS0103 came from a misspelt name, and here the name is spelt the
same on every line. So the message's *current context* has to be read, and
the page defines it. Then it names *scope* ("the part of a program where a
variable's name can be used") and says that `total` can be used from line
3, where it is made, to the closing curly bracket on line 6. It names
*code block*, because the link at the end uses that term. It says that
nothing ran, not even the three days, in the style guide's words ("C#
checks the whole program before it runs any of it").

The `making-decisions` draft already says, in a fold, that "a variable made
inside curly brackets exists only inside them", with CS0103, and does not
use the word *scope*, because the map gives scope to this page. This page
uses the same sentence, word for word, and then names it.

One paragraph adds the `for` line's own variable, `day`: its scope is the
whole loop, the `for` line and the body, so the last line cannot print it
either. It is there because a reader who has just learned "inside the curly
brackets" will see that `int day` is outside them. It invites the reader to
change `total` to `day` in the last line (probe `day-in-last-line`).

**dewlab's question "Can you find a change to the loop that makes idea A's
prediction come true?" moved** from after the first experiment to after
the failing cell. In C#, moving `int total = 0;` above the `for` line does
two things at once: the days start at 0, 10 and 20, and the last line
compiles and prints `At the end: 30` (probe `fold-moved`). "Come true"
became "print what idea A predicts", to avoid an idiom.

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
the powers, dividing and equals drafts: *right* is a verdict word. The
paragraphs on "let $t = 0$" and the recipe stay. "From then on" became
"after that".

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
adds an answer fold (probe `letters-fixed` prints `SEA`).

**Where to read more.** dewlab linked Python Tutor, which runs a program a
line at a time and draws each variable. Python Tutor does not run C#. The
C# page links Microsoft Learn's beginner module
[Control variable scope and logic using code blocks in C#](https://learn.microsoft.com/training/modules/csharp-code-blocks/).
Its first exercise, "Code blocks and variable scope", makes a variable
inside an `if`, meets CS0103, moves the line above, and then meets CS0165.
It is on exactly this page's topic, at a beginner's level. It uses Visual
Studio Code, and its examples run in a cell on this page (probes
`learn-module-inside`, `learn-module-outside`, `learn-module-sample-2`).
Both pages were fetched on 27 September 2026.

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

| Number, message or claim | Source |
|---|---|
| "Day 1 starts at 0", "Day 2 starts at 0", "Day 3 starts at 0" | lesson cell `an-experiment-1` |
| Idea A's prediction: 0, 10 and 20 | probe `fold-moved` (what the program prints once the line is moved) |
| CS0103 message, line 7, column 34; nothing runs, not even the loop (empty output) | lesson cell `where-a-variable-lives-1` |
| lines 3 to 6; lines 4 and 5 use `total` | the cell's own line numbers |
| `day` in the last line gives CS0103 naming `day` | probe `day-in-last-line` |
| fold: 0, 10, 20, and `At the end: 30` | probe `fold-moved` |
| hint 2: CS0136 when `total` is made twice | probe `copied-not-moved` |
| `A` | lesson cell `where-else-it-happens-1` |
| fold: `SEA` | probe `letters-fixed` |
| the Learn module's examples run in a cell; its CS0103 and CS0165 | probes `learn-module-inside`, `learn-module-outside`, `learn-module-sample-1`, `learn-module-sample-2` |
| "make `total`" each time the line is reached | the C# standard, section 12.21.6.3 (not run) |

The message in the prose says `Program.cs`, as the page will show it. The
native check names the file after the cell id
(`where-a-variable-lives-1(7,34)`). The line, column, code and text are the
same.

## Once the page UI exists

- **Hint counting on a cell meant to fail.** `where-a-variable-lives-1`
  fails on its first run, as it should. The hints are set to `after: 2
  errors` and `after: 3 errors` on the assumption that that first run
  counts as one error. If the page does not count a run that met its
  `expect:`, both numbers should drop by one. A reader who tries `day` in
  the last line, as the prose invites, adds one more error, so the first
  hint can appear before they try to move a line. It reads fine either way.
- **Hints that need a code in them** (`CS0136`). Check that inline code in
  a hint renders.
- **The console block.** The prose quotes the CS0103 message in a `console`
  fence with `Program.cs`. Check that it matches what the page shows under
  the cell (the file label defaults to `Program.cs` for a program cell).
- **KaTeX** renders `$t = 0$` inline.
- **Links in.** dewlab links here from `repeating-yourself`, in its sigma
  section, which the C# page drops (see the last bullet for where the C#
  link could go). The `making-decisions` fold on `string pixel;` could link
  here as well, since this page names what that fold describes.
- **Links out.** The page links `repeating-yourself` and `compiler-errors`,
  both of earlier batches (2), as decision 14 allows. `compiler-errors` is
  not in this page's "Depends on" in the map, but it comes before this page
  in PDP's order. The opening link text "the page about loops" and "the page
  about compiler errors" should become the real titles once those pages
  exist, if the other drafts settle on titles in links.
- **What the page about loops says.** The first paragraph assumes the C#
  `repeating-yourself` has `int total = 0;` above a loop, and prints the
  total after the loop. A draft of that page appeared in
  `drafts/lessons/repeating-yourself/` while this one was written (another
  run, still in progress at 13:34). Its `your-turn-1` has `int total = 0;`
  above a `while` loop and `Console.WriteLine(total);` after it, and it
  defines *body* as "the lines between its curly brackets", the sense this
  page uses. So both assumptions hold today. Check again when that page is
  final.
- **The link from the page about loops to this one.** Decision 14 says a
  forward link is added by the batch that writes the page it points to.
  This page is batch 3 and `repeating-yourself` is batch 2, so the link
  from there to here belongs to this batch. It is not added, because this
  run may write only in this folder. The natural place is after
  `your-turn-1`'s paragraph on the accumulator pattern: "What happens if
  `int total = 0;` moves inside the loop? [Starting a total](lesson:a-total-that-starts-again)
  has an experiment."

## Open questions for a reviewer

1. **Which cell keeps `an-experiment-1`?** I gave it to the cell that
   prints inside the loop, because that cell keeps dewlab's task and
   predict. The map's wording could be read the other way. Nothing is
   saved under either id yet.
2. **The paragraph on `day`.** It adds a second scope case to an S page.
   It could move to a practice problem on `repeating-yourself-practice`
   instead ("print the loop's counter after the loop").
3. **CS0165.** If the reader removes `= 0` and leaves `int total;` inside
   the loop, the compiler says *Use of unassigned local variable 'total'*
   (probe `no-initial-value`). It is on the same topic, and the Learn
   module shows it. The page leaves it out, because it would fail with no
   loop at all, so it says nothing about the loop. A candidate for the
   practice page.
4. **dewlab's end value, 10.** If the reader makes `total` above the loop
   and leaves `total = 0;` (no `int`) inside it, the program compiles,
   every day starts at 0, and it prints `At the end: 10` (probe
   `assign-inside`), which is dewlab's idea B exactly. The page does not
   show it, because the letters cell makes the same point. It would make a
   good practice problem: "This program compiles. Why does it print 10?"
5. **"Local" and "global".** The descriptor names local and global
   variables. The page does not use either word. In C#, every variable a
   program cell makes is a *local variable* (the compiler's messages say
   so, as CS0136 does), and "global" has no plain meaning until methods
   appear. `writing-your-own-functions` seems the place to name both.
6. **A challenge at the end?** The style guide asks every page to end
   with a practice page, a challenge and something to read. The map says a
   closer look has no practice page and ends with one thing to read. This
   page follows the map, as the other closer looks do.
7. **The page opens with prose, not a cell.** As in the other closer
   looks, the two ideas come before the experiment. The first cell is about
   twenty lines down. The checklist asks a page to open by running
   something.
8. **"Part of idea A is true in C#."** The page gives idea A some ground
   (the compiler decides the name and the scope once). This is accurate,
   and it respects the reader who held idea A, but it is a change of tone
   from dewlab, which said only that Python works differently. Keep it?

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cells
fail on purpose.

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
