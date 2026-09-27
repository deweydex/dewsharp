# Notes: the-moves-you-already-know (C# draft)

Ported from dewlab `tutorials/the-moves-you-already-know/` (the page, its
practice page and its glossary), version 2026.09.26.1. Written against
dewsharp's `docs/LESSON_FORMAT.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`
(draft 1) and `CLAUDE.md`, 27 September 2026.

## How it was checked

- `NativeCheck` on both files: **No problems.** 28 `csharp exec` cells
  (12 on the page, 16 on the practice page). The outputs are in
  `the-moves-you-already-know.native.json` and
  `the-moves-you-already-know-practice.native.json`.
- NativeCheck compiles a types cell's `solution`, but it does not run it
  against the cell's `inputs` (it returns early for a types cell). So I also
  ran a scratch copy of each file in which every solution replaces its
  starter class, and the inputs run on the program cell below. Values:
  - `Heaviest()`: 5, 4, 9. `WidestMoon()`: 5268, 3475, 22.
  - `NarrowestMoon()` (both solutions): 3122, 12, 3475.
  - `TotalWeight()` (both solutions): 11, 0, 4.
- Also run in scratch, because the prose claims them without a cell of
  their own: `Photos = Photos + 1;` makes the probe print 2. Deleting only
  `int` gives CS0103. `Weights.Max()` gives 5. `Weights[0]` on an empty
  list throws ArgumentOutOfRangeException. The challenge starter compiles
  and prints 0 and 75, and a working `BurnsLeft()` gives 7 and leaves 75.
  With only the outer `return`, `HighestScore()` gives 340. A misspelt
  `Dictionary` key adds a second entry.
- The solution notes state no numbers that the native check did not print.
  dewlab's notes began with the result ("5.", "5268:", "3122:", "11 kg");
  I removed those, and kept the names (Ganymede, Europa), which the scratch
  runs confirm. The Compare table shows the values.
- Every CS code and message quoted in the prose is copied from the check's
  output. I quoted the message only, not the `file(line,col)` part, because
  the page names files differently from the native check.
- Both Microsoft Learn links returned HTTP 200 on 27 September 2026.

## What changed from the Python page, and why

**Cells follow the rules of the road.** Each Python cell became a types
cell (the class) and a program cell below it (the statements). Each
program cell makes its own objects (rule 3), and the page points back to
rules 2 and 4 where it relies on them.

**Worlds: game, solar-system, your-own.** Ocean is gone. Its practice
problem ("Deepest, too soon", a submarine logbook) moved to the game world
as "The highest score, too soon", with the same numbers (120, 340, 85).

**`question` blocks became prose.** The format has no `question` block. The
fill-in-the-blank "which move is each line" (page and practice problem 1)
is now a list with an answer fold.

**A new section, "Storing with `var`".** The style guide says FOOP's second
page teaches `var`. It sits beside storing, because `var` is a way to make a
variable. It has one cell to run and one meant to fail (CS0029: `var` still
fixes the type). The prose states the course rule: `var` only on a line
with `new`. Cells above it write `Planet jupiter = new Planet(...)`, and
cells below it use `var`.

**"Storing inside a class" is about C#'s own form of the slip.** Python's
`photos = self.photos + 1` became `int photos = Photos + 1;`. It still
prints 0 with no warning (checked). In C#, a new variable is made only by a
line that starts with a type, and deleting only `int` gives a compiler
error. The page says both. `self.` became "a field, on the object", with
one sentence on `this`. "Local variable" is defined here.

**Your turn: the compiler says what is missing.** The starter class is a
types cell with no stub method. The program below calls the method, so it
fails with CS1061 (`expect: CS1061`) until the reader writes it. The
prose says the failure is expected and quotes the message. Changes:
- The first hint moved to the program cell, with `after: 2 errors`,
  because the first run always fails.
- A second hint gives the method's first line (`public int Heaviest()`),
  which Python did not need.
- `solution` and `inputs` are on the types cell. The inputs are
  self-contained (`new Backpack(...).Heaviest()`).
- The your-own world has two comment-only cells, one for the class and one
  for the program. If a reader writes both in one cell with the class
  first, they get CS8803.

**Python built-ins became LINQ.** `max()`, `min()` and `sum()` became
`Max()`, `Min()` and `Sum()`. The notes say only that they look at every
value, as the loop does, and not that they are the same loop inside.

**Practice problems where C# acts differently from Python:**
- **2, two names that look alike:** `int visits = 100;` gives warning
  CS0219. The answer fold points to it.
- **5, the highest score:** a `return` inside the loop does not compile
  (CS0161, not all code paths return a value). The problem now has a
  second part, in which a second `return` after the loop lets it compile
  and print 120. That keeps Python's point that a `return` ends the method
  on the first pass.
- **8, a slip in a name:** `grace.Heath = 3;` is a compiler error (CS1061).
  In Python it quietly made a new field. The fold compares it with a
  misspelt `Dictionary` key, which C# cannot check.
- **9, printed, not returned:** storing a `void` method's result is
  CS0029, and nothing prints. Python printed 8 and then None. The method
  is `Twice`, not `Double`, because `Double` is a .NET type name.
- **10, a loop that counts:** the read-only snippet became a runnable cell,
  so that 2, 5 and 8 come from a run.
- Because several cells are meant to fail, and saying which ones before a
  guess would give the answer away, the practice page says once at the
  top that some cells are meant not to compile.

**The challenge** is one Program.cs, with statements before the class,
because C# requires that order in a file. The prose says so.

**The rest:**
- Titles follow dewsharp's form ("term: what the page does with it").
- The page now ends with a link to its practice page.
- "Where to read more" cites Microsoft Learn (iteration statements, and
  declaration statements for `var`) in place of the Python tutorial and
  *Think Python*.
- The glossary terms (storing, sequence, selection, iteration) are defined
  in the prose where they first appear, because dewsharp has no glossary
  panel yet. So are *local variable*, `var` and `this`.

## Conventions I chose

- **Public PascalCase fields** (`public List<int> Moons;`), not properties.
  Encapsulation (private, properties) belongs to
  keeping-details-inside-an-object, and the style guide describes a property
  as guarding a value. The draft of the-tools-around-your-code does the
  same. The objects-and-classes draft did not exist while I wrote this. If
  it uses auto-properties, each field here is a one-line change.
- `count = count + 1;` rather than `count++`, so that the storing is plain.
  The answer fold mentions `count++`.
- `new List<int> { ... }` rather than collection expressions (`[ ... ]`),
  to match the format document's examples.
- `foreach (int width in Moons)`: an explicit type in the loop, since `var`
  is only for lines with `new`.

## What should change once the page UI, the checker or the course map exist

1. **Compare with a solution on a types cell.** `ENGINE_API.md` says the
   page runs the solution as "the same `cells`, with the target's `code`
   replaced", and appends inputs "after the target's own statements". For a
   types cell there are no statements. NativeCheck's own placement puts the
   inputs at the top of the file, before the class, and that compiles. So
   the engine side works. What is missing: (a) the checker should evaluate
   a types cell's inputs and run its solutions against them, not stop at
   compiling; (b) the page needs to offer Compare on a types cell. Every
   FOOP "add a method to this class" task needs this. Until then, the
   solution values here are checked only by the scratch run above.
2. **Warnings from cells above.** Each program compiles every class above
   it, so practice problem 2's CS0219 warning appears under every later
   program on that page (see the JSON). The engine gives each diagnostic a
   `cellId`. The page could show only the target cell's warnings, or show
   the others under "from a cell above". The same applies to errors: an
   unfinished types cell (problem 4 or 6) stops every program below it
   from compiling, even programs that don't use that class. The page could
   name the cell in words a learner can read.
3. **Comment-only cells** (the your-own world) have kind `empty`. The page
   needs a label and buttons for them, because they become a types cell and
   a program cell once the reader writes in them.
4. **The challenge** is one block. If the notebook splits a challenge into
   a types cell and a program cell, split this one: the class first, then
   the three statements.
5. **Link texts.** The PDP lessons' C# titles are unknown, so the links say
   "variables and types", "decisions", "loops", "writing your own methods".
   The "Next" link uses the title in the current draft of
   the-tools-around-your-code. Check them against `planning/COURSE_MAP.md`
   once it exists.
6. **Cell length.** With a brace on its own line, a class runs 12 to 25
   lines, and a solution up to 37. That is over the guide's 5 to 15.
   Splitting a class across cells isn't possible, so either the guide
   should allow for it, or the page should fold long starter classes.

## Open questions for a reviewer

- **World order.** The shared prose teaches with Jupiter (solar-system),
  but the frontmatter lists game first, to match dewlab and the next page.
  The guide says "a page teaches in its first world". Should solar-system
  come first here, or should the opening move to the game world?
- **`covers`.** I kept `[FOOP-LO2]`. The `var` section is about types, so it
  may also count toward FOOP-LO1 ("data types used in object oriented
  programs").
- **`this`** gets one sentence. If objects-and-classes already teaches
  `this` (for example, `this.name = name` in a constructor), that sentence
  can become a reminder.
- **Empty lists.** `Heaviest()` and `WidestMoon()` throw
  ArgumentOutOfRangeException on an empty list. The notes leave that as a
  question for the reader ("Try … and see what happens"). Should a later
  page (testing-what-a-class-does) come back to it?
- **Practice page title.** I used "Sequence, selection and iteration:
  practice". dewlab uses "… — Practice". This should match whatever the
  other ported practice pages use.
- **The `from:` of the practice page** is
  `the-moves-you-already-know-practice`. The format doesn't say whether a
  practice page's `from:` names the dewlab practice file or the tutorial.
