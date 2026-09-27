# Course map

The plan for dewsharp's two courses: which lessons each has and in what
order, where each lesson comes from in dewlab, what changes because the code
is C#, and the order in which to translate them. Draft 1, 27 September 2026.

Read it in one of three ways:

- **Translating or writing a lesson:** read "Principles of translation", then
  your lesson's entry, then "Batches".
- **Deciding:** the open questions are at the end. `DECISIONS.md` entries 9
  to 15 record the choices this map makes, with what each would cost to
  change.
- **Teaching:** "Teacher notes" stands on its own.

This map does not repeat three other documents. `docs/LESSON_FORMAT.md` says
how a lesson is written, `planning/PEDAGOGICAL_STYLE_GUIDE.md` says how it
reads, and `DECISIONS.md` says why. The course files, `courses/pdp.yaml` and
`courses/foop.yaml`, list the same lessons in the same order. Change a lesson
here and in its course file together.

dewlab is at `/home/user/dewlab` (or <https://github.com/deweydex/dewlab>).
A dewlab page's id is its folder, `tutorials/<id>/<id>.md`, and its practice
page is `<id>-practice.md` beside it.

## How to read a lesson's entry

- **id:** the lesson's address, and half of the key its saved work lives
  under. It keeps dewlab's id wherever the topic maps directly, so that a
  teacher can put the two pages side by side.
- **From:** the dewlab page or pages it draws on. A page from another dewlab
  course says which course.
- **Action:**
  - *translate*: the same page in C#. The prose changes where the code does.
  - *adapt*: the same topic and most of the page. Sections that C# changes are
    rewritten, and some are added or dropped.
  - *replace*: a new page in the old one's place, because the dewlab page is
    about something C# does not have.
  - *new*: no dewlab page teaches it.
  - *drop*: no C# page. No dewlab page of either course is dropped; sections
    are, and each entry says which.
- **Shape:** tutorial, closer look, project, reflection, brief, series-end
  task, mixed set or explore. These are dewlab's page shapes.
- **Covers:** the outcomes, in the codes of dewlab's
  `planning/curriculum/outcomes.yaml` (`PDP-LO4`, `FOOP-LO1`).
- **Worlds:** the worlds the page offers, the one it teaches in first.
- **Size:** S is under eight cells, about half an hour. M is 8 to 15 cells,
  about an hour. L is more than an hour, and a candidate to split; the entry
  says where.
- **Depends on:** the lessons that must be translated first, because this
  one uses their code or their class, or links back to them.
- **Batch:** when it is translated (see "Batches").

## Principles of translation

### What stays

- **The voice.** dewsharp's own style guide now, but the same habits:
  invite and wait, plain words, no verdicts, mistakes on purpose, help after
  an attempt (`PEDAGOGICAL_STYLE_GUIDE.md#voice`).
- **Worlds**, within the style guide's limit of two on a page, plus "your
  own" where it fits (`#worlds`). PDP keeps dewlab's two, secret messages and
  pixel art. FOOP keeps the game and the solar system, plus your own; the
  ocean goes, and the three FOOP pages that taught in it are retold in the
  solar system (`DECISIONS.md` 13). A page teaches in its first world.
- **Predict blocks**, two or three on a page, where a guess is interesting.
  dewlab's pages often have more, counting the cells of `# I think:`
  comments. Keep the ones where C# does something a reader would not expect,
  and let the others run without a guess.
- **Hints** on "your turn" cells, the first one a question.
- **Compare with a solution:** `solution` and `inputs` blocks, and the two
  tiers of solution ("with what you've met so far", "a shorter way you'll
  meet later"). dewlab's `guess: yes` column goes, because dewsharp has none.
- **Practice pages**, one for every tutorial, with dewlab's mix of kinds and
  two or three problems from earlier pages. **Mixed sets**, one for each
  series.
- **Closer looks.** dewlab's six experiment-first pages stay a shape of page
  (powers, dividing, the equals sign, a total, two names, "is a"), and C#
  adds two (`virtual` and `override`, `class` and `struct`). A closer look
  has no worlds and no practice page. Its problems go into the practice page
  of the tutorial it belongs to, and it ends with one thing to read.
- **How a page runs:** it opens by running something and asking about it; a
  line-by-line fold comes after an invitation to change something; it closes
  with a question, a challenge for the notebook, its practice page, and one
  thing to read or watch.
- **Cell ids.** A cell that keeps its task keeps its dewlab id, so a teacher
  can compare the two pages. A cell with a new task gets a new id.

### What changes because of C#

- **Types are declared and fixed.** `int count = 5;`. PDP writes every type.
  FOOP teaches `var` on its second page of classes (see open question 1). A
  value of the wrong type is a compiler error, not a run-time `TypeError`.
- **A compile step.** C# checks the whole program before it runs any of it.
  Many of dewlab's run-time surprises become compiler errors that appear
  before anything runs: a misspelt name (CS0103), text where a number was
  wanted (CS0029), a method that gives nothing back used as if it did
  (CS0029), a `return` inside a loop (CS0161). The pages say so and use it.
  The three things that can happen when you press Run are named the same way
  on every page (`#the-compiler`).
- **Real input.** `Console.ReadLine()` waits for the reader. dewlab's
  stand-ins go: `ask()` over a `typed` list, commented-out `input()`, and the
  `text_input` and `dropdown` widgets. A cell that reads input has `stdin:`
  for the checker only.
- **Each Run is a new program.** dewlab's cells share variables, and
  dewsharp's do not (the rules of the road). An early lesson's cells each work
  on their own, and repeat the line that makes the list. Where a dewlab page
  kept a value from one cell for the next (guess my number; a game started in
  one cell and played in another), the C# page makes it one program, usually
  a loop that reads input. The rules are taught where classes first appear:
  `objects-and-classes` in FOOP, and `building-reusable-tools` in PDP, whose
  first class is a `static class` of methods (`DECISIONS.md` 12).
- **Whole-number division drops the fraction, towards zero, and `%` follows
  it.** `7 / 2` is 3, `-7 / 2` is -3 and `-7 % 3` is -1 (in Python, `7 / 2`
  is 3.5, `-7 // 2` is -4 and `-7 % 3` is 2). A Caesar shift going backwards
  needs `((n % 26) + 26) % 26`. `1 / i` is 0. dewlab's `//` has no C# twin, and needs none.
- **No power operator.** `Math.Pow` gives a `double`, and `^` is exclusive or.
- **No list comprehensions**, no slice with a step, no `enumerate`, no
  negative index. Loops do the work, and ranges (`letters[2..5]`) and the
  index from the end (`letters[^1]`) do the slicing. LINQ is C#'s nearest
  relation to a comprehension, and it is an explore page.
- **Strings cannot be changed**, as in Python, but the compiler says so
  (CS0200). `char` is a type of its own: `'A'` is not `"A"`. `"10" + 2` is
  `"102"`.
- **Arrays and collections.** An array keeps its length; `List<T>` and
  `Dictionary<TKey, TValue>` are classes. Printing any of them prints the
  name of its type, so pages print with `string.Join` or a loop.
- **Value types and reference types.** `int`, `double`, `bool`, `char` and
  structs are copied by `=`; arrays, lists, dictionaries and objects are
  shared. dewlab's pages about two names for one list keep their experiments,
  and gain these names.
- **Methods, not functions.** A method written in a program cell belongs to
  that cell (rule 1), so a solution brings its own copies of the methods it
  needs, as dewlab's already do. `void` replaces "returns `None`". Methods
  and classes are PascalCase, variables camelCase.
- **Exceptions have C#'s names and C#'s report:** `FormatException`,
  `DivideByZeroException` (whole numbers only: `1.0 / 0` is ∞),
  `IndexOutOfRangeException`, `KeyNotFoundException`,
  `NullReferenceException` (new to readers from Python), and
  `InvalidOperationException` (changing a list inside its own `foreach`).
- **Numbers print C#'s way, in the page's culture.** `25`, not `25.0`;
  `€12.50` for money; `double.Parse("12,50")` is 1250 on the page's Irish
  settings. Every number in the prose comes from a recorded output, never
  from dewlab's page (`CLAUDE.md`, "Three traps").
- **Random numbers.** A cell whose output the prose quotes uses a seed
  (`new Random(42)`), so the recorded output is the same on every run.
  `Random.Shared` is for games the reader plays.
- **Blocks dewsharp does not have.** dewlab's `question` blocks
  (fill-in-the-blank, multiple choice) become predicts or prose. Charts become
  tables or drawings in text. Widgets become console input. `tests:` cells
  become ordinary program cells that call a `Check` method the page writes
  (open question 3). There is no `{{include: ...}}`: a FOOP page that builds
  on the class from the page before starts with a types cell that holds it
  (open question 2).
- **Python-only topics go:** `if __name__ == "__main__"`, docstrings (XML
  comments replace them), `__repr__`, `self` (`this` replaces it), doctest,
  pytest, and the underscore convention for "private" (C# has `private`).
- **The maths that only the integrated course needs goes** from the pages PDP
  shares with it in dewlab: sigma notation, the families of numbers,
  sequences as functions, the dot product, and domain and inverse. The dewlab
  sections still exist for a maths course that wants them later.

### What C# adds that the descriptors ask for

FOOP (5N0541):

| The descriptor asks for | Where |
|---|---|
| An IDE: open it, find your way round it, store code, compile and run, code completion, debugging | `the-tools-around-your-code` (a walk-through in Visual Studio), then `namespaces-and-libraries`, `a-front-end-for-a-class` and `your-world-playable` |
| Troubleshoot compiler errors; syntax and semantics | `compiler-errors`, `the-tools-around-your-code`, and every page with a cell meant to fail |
| Compiler and interpreter; source code and machine code; architecture neutrality | `compiler-errors` (a fold) |
| Data types, primitive types, type conversions, enums | `types-and-their-sizes`, `from-python-to-csharp`, `from-a-description-to-classes` (the first `enum`) |
| `do`...`while`, `switch` | `reading-input` |
| Access modifiers, encapsulation | `keeping-details-inside-an-object` |
| Constructors, method overloading | `objects-and-classes`, `one-class-many-methods` |
| Inheritance, single and multiple | `one-parent-many-children`, `virtual-and-override`, `many-classes-one-promise` (interfaces) |
| Class libraries and packages; collection classes | `namespaces-and-libraries`, `from-python-to-csharp`; the extras `asking-a-list-a-question` and `when-a-queue-never-clears` |
| Stress testing | `testing-what-a-class-does` |
| A front end; deploying to an end user | `a-front-end-for-a-class` (a console menu on the page; Windows Forms and publishing in Visual Studio), `your-world-playable` |

PDP (5N2927):

| The descriptor asks for | Where |
|---|---|
| A program that reads data from a user, with input prompts | `storing-and-computing` (the first `ReadLine`), `reading-input` |
| Interpret compiler and linker messages | `compiler-errors` (for the linker: CS5001, CS0017 and CS0246), then every page |
| The range of data each type holds, and the memory it needs; a data dictionary | `types-and-their-sizes` |
| Pre-test, post-test and counting loops | `repeating-yourself` (`while`, `for`), `reading-input` (`do`...`while`) |
| Branching with many conditions | `making-decisions` (`else if`), `reading-input` (`switch`) |
| Local and global variables; scope | `a-total-that-starts-again`, `writing-your-own-functions`, `building-reusable-tools` |
| System-defined functions | `Math`, `string` and `char` methods and `Array.Sort`, from `first-steps` on |
| Debugging tools | `when-it-goes-wrong` (the Visual Studio debugger) |
| Error trapping and reporting | `reading-input` (`TryParse`), `building-reusable-tools` (`throw`, `try` and `catch`) |
| Modules for each member of a team | `from-cells-to-a-program` (a `static class` in its own file), `the-team-project` |

### The page and Visual Studio

The page is where a learner practises; Visual Studio is where the outcomes
about an IDE are met (`#the-ide`). A page that needs Visual Studio says so and
gives the steps, with pictures described in words. These pages have a
Visual Studio part: `from-cells-to-a-program`, `a-program-of-your-own` and
`when-it-goes-wrong` in PDP; `the-tools-around-your-code`,
`testing-what-a-class-does`, `documenting-a-class`,
`namespaces-and-libraries`, `a-front-end-for-a-class` and
`your-world-playable` in FOOP. The classic `static void Main` is shown once,
as code to read, on `the-tools-around-your-code` (the style guide's default).

### FOOP's class chain

In dewlab, FOOP's reader grows one class in their world, a version a page,
and each version lives once in `setup/oop/<world>-<n>.py`. In dewsharp the
page that makes version *n* of a world's class is its source. The next page's
first types cell copies it exactly, with `file:` set to the class's name. Each
entry says which version a page makes. Until the format has includes (open
question 2), an author checks a copy against its source by hand. The "your
own" world never carries the reader's class between pages: the reader copies
it from the last cell of the page before, where it is saved.

## Programming and Design Principles (5N2927)

Twenty-six lessons in three series, and a mixed set at the end of each.
Three lessons are new, and FOOP shares them. dewlab's Programming
Foundations becomes two series, "First programs" and
"Methods, lists and algorithms", so that each has a mixed set of a
manageable size. dewlab's "Working in a Team" keeps its three pages.

| # | Lesson | Title | From dewlab | Action | Batch |
|---|---|---|---|---|---|
| | **First programs** | | | | |
| 1 | `first-steps` | Your first C# program: algorithms, pseudocode and arithmetic | first-steps | translate | 0 |
| 2 | `powers-in-csharp` | Powers: a closer look at Math.Pow and ^ | powers-in-python | adapt | 1 |
| 3 | `storing-and-computing` | Variables and types: numbers, text and single characters | storing-and-computing | adapt | 1 |
| 4 | `compiler-errors` | Compiler errors: what C# checks before it runs anything | reading-an-error-message, when-python-says-no | new | 2 |
| 5 | `dividing-in-csharp` | Dividing: a closer look at /, % and 0.1 | dividing-in-python | adapt | 1 |
| 6 | `types-and-their-sizes` | Types and their sizes: how much a variable can hold | numbers-a-computer-can-hold, how-a-computer-stores-a-number | new | 2 |
| 7 | `making-decisions` | Decisions: if, else if and else | making-decisions | adapt | 2 |
| 8 | `equals-three-ways` | The equals sign: a closer look at =, == and maths | equals-three-ways | translate | 3 |
| 9 | `reading-an-error-message` | Exceptions: when a program stops, and when it runs but is wrong | reading-an-error-message | adapt | 3 |
| 10 | `repeating-yourself` | Loops: repeating steps with while and for | repeating-yourself | adapt | 2 |
| 11 | `a-total-that-starts-again` | Starting a total: a closer look at where a variable lives | a-total-that-starts-again | adapt | 3 |
| 12 | `reading-input` | Reading input: ReadLine, TryParse and a loop that asks again | from-cells-to-a-program, storing-and-computing, reading-an-error-message | new | 4 |
| 13 | `mixed-first-programs` | Mixed problems: first programs | mixed-programming, mixed-instructions-for-a-machine, mixed-decisions-and-logic, mixed-loops-counting-and-chance | new | 5 |
| | **Methods, lists and algorithms** | | | | |
| 14 | `writing-your-own-functions` | Methods: writing your own | writing-your-own-functions | adapt | 3 |
| 15 | `lists-and-sequences` | Arrays and lists: many values under one name | lists-and-sequences | adapt | 3 |
| 16 | `grids-and-references` | Grids and references: arrays of arrays, and two names for one array | comprehensions-and-grids | replace | 4 |
| 17 | `two-names-one-list` | Two names, one list: a closer look at copying | two-names-one-list | translate | 5 |
| 18 | `looking-things-up-by-name` | Dictionaries: looking things up by key | looking-things-up-by-name | adapt | 4 |
| 19 | `a-program-of-your-own` | A program of your own: plan it, build it, release it | a-program-of-your-own | adapt | 5 |
| 20 | `finding-things` | Searching: linear and binary search | finding-things | adapt | 5 |
| 21 | `putting-things-in-order` | Sorting: bubble, insertion and selection sort | putting-things-in-order | adapt | 6 |
| 22 | `building-reusable-tools` | Reusable methods: a class of tools, and tests for them | building-reusable-tools | adapt | 7 |
| 23 | `when-it-goes-wrong` | Debugging: finding bugs in bigger programs | when-it-goes-wrong, finding-where-it-went-wrong | adapt | 8 |
| 24 | `how-we-got-here` | Programming languages: how they came to be | how-we-got-here, many-languages-one-idea | adapt | 5 |
| 25 | `mixed-programming` | Mixed problems: methods, lists and algorithms | mixed-programming | adapt | 9 |
| | **Working in a team** | | | | |
| 26 | `from-cells-to-a-program` | A whole program: from cells to Visual Studio | from-cells-to-a-program | adapt | 8 |
| 27 | `critique-and-reflection` | Code review: reading your own code and someone else's | critique-and-reflection | translate | 6 |
| 28 | `the-team-project` | The team project: a brief | the-team-project | adapt | 9 |
| 29 | `mixed-working-in-a-team` | Mixed problems: working in a team | from-cells-to-a-program, the-team-project, code-other-people-can-read, building-it-together | new | 9 |

### Series: First programs

#### 1. `first-steps`

**Your first C# program: algorithms, pseudocode and arithmetic**

- **From:** `first-steps`; `first-steps-practice`. **Action:** translate. **Shape:** tutorial.
- **Covers:** PDP-LO2, PDP-LO4, PDP-LO5, PDP-LO6, PDP-LO9. **Worlds:** secret messages, pixel art. **Size:** M: about 12 cells, an hour.
- **Depends on:** nothing. **Batch:** 0.
- **What changes in C#:** `Console.WriteLine(...);` replaces `print()`, and the semicolon is met on the first line. The arithmetic changes: `17 / 5` is 3 and `100 / 4` is 25, because two whole numbers give a whole number, and `17.0 / 5` is 3.4. C# has no `//` and no `**`, so the operator table loses both, gains a line on `/` with whole numbers, and sends powers to the closer look. `%` is the same as Python's for positive numbers. One cell is meant to fail (a missing semicolon, `expect: CS1002`), and the page names compiling in the style guide's words, in one paragraph. "How this page works" says the code runs in the browser with nothing to install, and that each Run is a whole program (rule 1, without the word "rule"). The tea algorithm, pseudocode and the two tasks stay.
- **Cells and blocks to rework:** `hello-1` (the predict's options and notes); `how-this-page-works-1` (`100 / 4` prints 25, so its predict changes); `more-operators-1` and the operator table; `remainder-1` stays; `your-turn-1` and `your-turn-2` in both worlds (`47 / 5` and `47 % 5` in place of `//`); `pseudocode-planning-before-coding-1` (`int width = 320;`). New: one cell that fails to compile. dewlab's shared include "when a cell does not do what you expect" becomes a short paragraph written for C#. The clock challenge stays.
- **Practice (`first-steps-practice`):** "A remainder below zero" becomes C#'s own surprise: `-7 % 3` is -1 (Python gives 2). The two power problems move to the closer look's answer folds. "Let Python work it out" uses `$"..."`. Add one problem with a missing semicolon, and one where `7 / 2` is 3.

#### 2. `powers-in-csharp`

**Powers: a closer look at Math.Pow and ^**

- **From:** `powers-in-python`. **Action:** adapt (renamed: the old id names Python). **Shape:** closer look.
- **Covers:** PDP-LO4, PDP-LO9. **Worlds:** none. **Size:** S: two or three cells.
- **Depends on:** `first-steps`. **Batch:** 1.
- **What changes in C#:** Idea A: `^` means a power, as on a calculator. Idea B: C# has no power operator, and `^` does another job. `2 ^ 3` prints 1 with no warning; `2 ** 3` does not compile (CS0193, a message about pointers). `Math.Pow` always gives a `double`, so `int area = Math.Pow(5, 2);` does not compile (CS0266), C#'s own second surprise in place of Python's `-3 ** 2`.
- **Cells and blocks to rework:** Already drafted in `drafts/lessons/powers-in-csharp/` (two cells, with a `NOTES.md` of open points). Review it against the translated `first-steps`: its first sentence assumes `first-steps` shows `Math.Pow`, and "a later page explains casts" links to `storing-and-computing` (a cast from `char` to `int`) and `types-and-their-sizes` (narrowing casts).

#### 3. `storing-and-computing`

**Variables and types: numbers, text and single characters**

- **From:** `storing-and-computing`; `storing-and-computing-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO4, PDP-LO7, PDP-LO11. **Worlds:** secret messages, pixel art. **Size:** L: about 16 cells; if it runs past an hour, move "Putting values into text" to the start of `types-and-their-sizes`.
- **Depends on:** `first-steps`. **Batch:** 1.
- **What changes in C#:** Every variable is declared with a type (`int count = 5;`) and keeps it: `count = "five";` does not compile (CS0029). The types are `int`, `double`, `string` and `bool`, plus `char`, which C# keeps apart from `string`: `'A'` and `"A"` are different types. `ord()` and `chr()` become casts, `(int)'A'` is 65 and `(char)67` is C, and the Caesar shift works on `char` values directly. `"40" + "2"` is 402 as in Python, but `"40" + 2` is 402 too: C# turns the number into text, where Python stopped. Conversion: `int.Parse`, `double.Parse`, `.ToString()` and a cast. f-strings become `$"..."`, with `{ratio:F2}` for decimal places. dewlab's commented-out `input()` cell becomes a real `Console.ReadLine()` with `int.Parse`, which waits for the reader (`stdin:` is for the checker only). Names change from snake_case to camelCase. The decode task changes on purpose: `(0 - 3) % 26` is -3 in C#, not 23, so A moved back three places is not X. The page says so, points to the dividing closer look, and shows `((n % 26) + 26) % 26`. The sets **Z** and **R** (maths notation, MIT-1.1) go.
- **Cells and blocks to rework:** Every cell (declarations). `where-i-might-get-stuck-1` gains `"40" + 2`; `your-turn-2` (six comment guesses) becomes a mix of lines that print and lines that do not compile; `text-you-can-take-apart-2` uses casts; `type-conversion-2` becomes a real input cell; `now-the-implementation-1` in `char`; `your-turn-4--secret-messages` rewritten for the negative remainder; `your-turn-4--pixel-art` builds `$"rgb({red}, {green}, {blue})"`; `putting-values-into-text-1..3` use `$""` and `:F2`. The `inputs` blocks stay: they read variables the cell made.
- **Practice (`storing-and-computing-practice`):** "Allowed names" adds C#'s keywords (`class`, `int`). "Swap them" keeps the spare variable and shows the tuple swap `(a, b) = (b, a)` as the shorter way. "The word False" becomes "a number is not a bool" (`if (1)` does not compile). "25 plus 1 is 251" becomes `"25" + 1` with `ReadLine`. "Counting in cents" mentions `decimal`. "Cutting, or rounding" stays: `(int)-3.7` is -3.

#### 4. `compiler-errors`

**Compiler errors: what C# checks before it runs anything**

- **From:** `reading-an-error-message` (its section on errors caught before the program starts); `when-python-says-no` (Dewey Track); `reading-an-error-message-practice`. **Action:** new. **Shape:** tutorial.
- **Covers:** PDP-LO9, PDP-LO4, FOOP-LO5, FOOP-LO10. **Worlds:** none. **Size:** M: about 12 small cells.
- **Depends on:** `storing-and-computing`. **Batch:** 2.
- **What changes in C#:** Opens with a program whose third line misspells a name, and a predict: what will the first two lines print? Nothing, because C# compiles the whole program first (the style guide's paragraph). Then one message read in its five parts: file, line, column, code and what the compiler found (`Program.cs(3,19): error CS0103: ...`). Then the messages a learner meets most in the first weeks, each from a cell meant to fail: CS1002 (`;` expected), CS0103 (a name it does not know, `print` included), CS1026 and CS1010 (a bracket or a string left open), CS0029 and CS0266 (a value of the wrong type), CS0165 (a variable used before it has a value). Read the first message first: one missing quote can cause three messages. Warnings are shown in a quieter style (CS0219). A fold says what compiling makes: an in-between form that the .NET runtime turns into machine code on each machine (for FOOP's "source code and machine code" and "architecture neutrality"). A second fold names the step that joins a program's parts, which the descriptor calls linking, and the three messages a learner can meet from it: CS5001 (no `Main`), CS0017 (two `Main` methods) and CS0246 (a type it cannot find: a missing `using` or reference).
- **Cells and blocks to rework:** All cells are new. Each failing cell has `expect: CSxxxx`. Four broken programs to fix one at a time, as dewlab's syntax section had. A "your turn" where the reader breaks a working cell on purpose and predicts the code first.
- **Practice (`compiler-errors-practice`):** Name the code before you run; fix the first message and see how many go; a program with three messages from one mistake; error or warning; a message whose line is not the line with the mistake (an unclosed string).
- **Shared:** listed in both courses; one page, one id, one set of saved work.

#### 5. `dividing-in-csharp`

**Dividing: a closer look at /, % and 0.1**

- **From:** `dividing-in-python`. **Action:** adapt (renamed: the old id names Python). **Shape:** closer look.
- **Covers:** PDP-LO4. **Worlds:** none. **Size:** S: three or four cells.
- **Depends on:** `first-steps`. **Batch:** 1.
- **What changes in C#:** The two ideas change sides. Idea A: `/` on two whole numbers drops the part after the point, towards zero. Idea B: it rounds down. In C#, `-7 / 2` is -3 and `-7 % 2` is -1, so idea A matches, where Python agrees with idea B (a `python` fence shows Python's -4 and 1 for readers who know it). C# still keeps `(a / b) * b + a % b` equal to `a`; the price is a remainder that can be negative, which is why the Caesar shift going backwards needed a fix. `1 / 2` is 0 and `1.0 / 2` is 0.5. The 0.1 section stays (`0.1 * 3` is 0.30000000000000004) and adds `decimal`: `0.1m * 3` is 0.3.
- **Cells and blocks to rework:** All three cells, with their predicts.

#### 6. `types-and-their-sizes`

**Types and their sizes: how much a variable can hold**

- **From:** `numbers-a-computer-can-hold` (Dewey Track); `how-a-computer-stores-a-number` (a dewlab draft no course lists); `storing-and-computing-practice` (its floating-point problems). **Action:** new. **Shape:** tutorial.
- **Covers:** PDP-LO4, PDP-LO7, FOOP-LO1. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `storing-and-computing`, `dividing-in-csharp`. **Batch:** 2.
- **What changes in C#:** Opens with a predict: `int.MaxValue + 1`. It prints -2147483648. An `int` has 4 bytes, and it goes round with no error (Python's whole numbers never run out, so this is new to readers from Python). Then the whole-number types and their sizes (`byte`, `short`, `int`, `long`, with `sizeof`), what each can hold (`MinValue`, `MaxValue`) and what that costs in memory, which is PDP's "range of data and amount of RAM". `checked` makes going round an exception. `double`, `float` and `decimal`: how many digits each keeps, and which to use for money. `char` (2 bytes) and `bool` (1 byte); a `string` takes as much as its text. Conversions: widening happens by itself (`int` to `long`, `int` to `double`); narrowing needs a cast, `(int)-3.7` is -3, and `Convert.ToInt32(2.5)` is 2 (it rounds to the even number). Closes with a data dictionary for a small program: each variable's name, type, size and what it holds, the table PDP's first skills demonstration asks for.
- **Cells and blocks to rework:** All new. Pixel art keeps a colour in a `byte` (`255 + 1` is 0 in a `byte`); secret messages count letters in a `byte` and keep codes in `char`.
- **Practice (`types-and-their-sizes-practice`):** Pick the smallest type that holds each value; a byte that goes round; a price in `double` and in `decimal`; a cast that loses a digit; a data dictionary for a program on an earlier page.
- **Shared:** listed in both courses; one page, one id, one set of saved work.

#### 7. `making-decisions`

**Decisions: if, else if and else**

- **From:** `making-decisions`; `making-decisions-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO6, PDP-LO4. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `storing-and-computing`. **Batch:** 2.
- **What changes in C#:** Conditions go in brackets and bodies in braces; `else if` replaces `elif`; `&&`, `||` and `!` replace `and`, `or` and `not`. The opening compares `char` values (`'A' < 'B'`, `'Z' < 'a'`); `"A" < "B"` does not compile (CS0019), a predict where "it does not compile" is the answer. `0 == false` does not compile: a `bool` is not a number in C#, unlike Python. `1 == 1.0` is true. Python's chained comparison (`0 <= x < 64`) does not compile, so the pixel task's shorter way goes. `char.IsUpper(c)` and `"AEIOU".Contains(c)` replace `.isupper()` and `in`. `==` on strings compares the text, and a sentence says so (Java books warn against it). The "classifying numbers" section (number families, MIT-1.1) goes. `switch` waits for `reading-input`, where a menu needs it.
- **Cells and blocks to rework:** Every cell (syntax). `which-comes-first-1` in `char`; the `your-turn-1` comment cell loses `0 == False` or keeps it as the one line that does not compile; `your-turn-2..4` in both worlds (stubs declare `string action = "";` so the cell compiles, and the `inputs` stay); `boolean-operators-combining-conditions-1..3`; `classifying-numbers-...-1` and `your-turn-6` go. Precedence: `!`, then `&&`, then `||`.
- **Practice (`making-decisions-practice`):** "A leap year", "A good password", "Half price" and "A possible triangle" stay. "Which families" and "Is every float rational" go (maths). "One equals sign or two" becomes CS0029.

#### 8. `equals-three-ways`

**The equals sign: a closer look at =, == and maths**

- **From:** `equals-three-ways`. **Action:** translate. **Shape:** closer look.
- **Covers:** PDP-LO4, PDP-LO9. **Worlds:** none. **Size:** S.
- **Depends on:** `making-decisions`. **Batch:** 3.
- **What changes in C#:** Same two ideas and the same experiment. `15 = score;` does not compile (CS0131). `if (score = 15)` does not compile either (CS0029): an `if` needs a `bool`, and C# does not treat an `int` as one, so the classic slip from C cannot happen. The history (Fortran, Pascal's `:=`) stays.
- **Cells and blocks to rework:** Four cells; the two that fail get `expect:`.

#### 9. `reading-an-error-message`

**Exceptions: when a program stops, and when it runs but is wrong**

- **From:** `reading-an-error-message`; `reading-an-error-message-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO9, PDP-LO10. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `compiler-errors`, `making-decisions`. **Batch:** 3.
- **What changes in C#:** Compiler errors now have a page of their own, so this page covers the two kinds of wrong that compiling cannot catch. It opens with the style guide's three things that can happen when you press Run. Runtime errors become exceptions: `FormatException` (`int.Parse("seven")`) and `DivideByZeroException`, which only whole numbers raise (`60.0 / 0` prints ∞, a predict). The exception report gives the type, the message and the line; the line that failed is not always the line responsible (the bill-split cell). The logical-error section stays (`100 + 300 / 2`) and gains a case only C# has: `"10" + 2` compiles and gives 102, where Python stopped. `NameError` and `TypeError` have no place here: C# reports them before the run, on `compiler-errors`.
- **Cells and blocks to rework:** `a-first-error-1` becomes an exception; the syntax section and its four cells go to `compiler-errors`; `runtime-your-turn-1..4` rewritten (1 becomes a logical error, 3 a compiler error that points back); `a-short-traceback-1/2` read an exception report; `when-nothing-looks-wrong-1/2` in both worlds keep their shape. The `dl-traceback` drawing becomes a drawing of what the page shows for an exception, once `web/` draws one.
- **Practice (`reading-an-error-message-practice`):** "A decimal comma" becomes a surprise: on the page's Irish settings `double.Parse("12,50")` gives 1250, not an exception. "Five times two" (`"5" * 2`) does not compile in C#, so it becomes `"5" + 2`.

#### 10. `repeating-yourself`

**Loops: repeating steps with while and for**

- **From:** `repeating-yourself`; `repeating-yourself-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO6, PDP-LO7. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `storing-and-computing`. **Batch:** 2.
- **What changes in C#:** `while` keeps its shape. `for` becomes C#'s loop with three parts (`for (int i = 0; i < 5; i++)`), and a table maps `range(stop)`, `range(start, stop)` and `range(start, stop, step)` onto them. `foreach` goes through a string's characters. `Console.Write` replaces `print(..., end="")`. `i++` and `+=` appear here. The page names `while` a pre-test loop and `for` a counting loop, the descriptor's words. The sigma notation section (MIT-6.4) goes; the accumulator pattern stays, and so does the paragraph on a product starting at 1. The harmonic series moves to the practice page, with C#'s surprise: `1 / i` is 0 for every `i` above 1. Stop is shown on a loop that never ends.
- **Cells and blocks to rework:** Every cell. `a-loop-that-codes-1` in `char`; the trace-by-hand cell stays; `for-loops-...-2` becomes three `for` loops; `your-turn-2/3/6/7` in both worlds (the second-tier solutions that used `.count()` go); sigma cells and `your-turn-3/4/5` go; `nested-loops-1` and the counting cell stay.
- **Practice (`repeating-yourself-practice`):** "Two sigmas" goes. "A sum that never settles", "Five hundred primes", "Adding the digits" and "Up and down to one" (Collatz) stay. Add the harmonic series with `1 / i`.

#### 11. `a-total-that-starts-again`

**Starting a total: a closer look at where a variable lives**

- **From:** `a-total-that-starts-again`. **Action:** adapt. **Shape:** closer look.
- **Covers:** PDP-LO8, PDP-LO6. **Worlds:** none. **Size:** S.
- **Depends on:** `repeating-yourself`. **Batch:** 3.
- **What changes in C#:** The experiment changes. A variable declared inside the loop (`int total = 0;` in the body) exists only inside the loop's braces, so printing `total` after the loop does not compile (CS0103). The two ideas are tested with a print inside the loop, which shows 0 at the start of every day, and then the compiler's refusal after the loop names scope: a variable lives in the braces it was declared in. The letters example stays.
- **Cells and blocks to rework:** Both cells; one gets `expect: CS0103`, and a new cell prints inside the loop.

#### 12. `reading-input`

**Reading input: ReadLine, TryParse and a loop that asks again**

- **From:** `from-cells-to-a-program` (its sections on a loop that waits for quit and on asking until the answer makes sense); `storing-and-computing` (type conversion); `reading-an-error-message` (a number that is not a number). **Action:** new. **Shape:** tutorial.
- **Covers:** PDP-LO4, PDP-LO6, PDP-LO10, FOOP-LO2, FOOP-LO11. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `repeating-yourself`, `reading-an-error-message`, `types-and-their-sizes`. **Batch:** 4.
- **What changes in C#:** Opens with a program that waits: a prompt with `Console.Write`, then `Console.ReadLine()`, then a greeting. The reader types; nothing is typed in for them. `int.Parse` stops with a `FormatException` when someone types "three". `int.TryParse` says whether it worked and hands over the number through `out`; the page shows the pattern once and uses it after that. A loop that has to ask at least once is written twice, first with `while` and a flag, then with `do`...`while`, and the page names the post-test loop. A menu: a `do`...`while` round a `switch` on the choice (`case "1":`, `default:`), with 9 to quit, and `switch` named as a choice between many paths. `ReadLine` gives `null` when input ends (End input), and the menu copes with it. `Console.Clear()` and colours work on the page, and one cell uses them.
- **Cells and blocks to rework:** All new. Every interactive cell has `stdin:` for the checker. The menu task codes or decodes a message (secret messages), or draws a square of a size the reader types (pixel art).
- **Practice (`reading-input-practice`):** An age that must be a whole number from 0 to 120; a menu with a missing `break`; `TryParse` with a decimal comma; a loop that should be `do`...`while`; from earlier: a remainder, a comparison of `char` values.
- **Shared:** listed in both courses; one page, one id, one set of saved work.

#### 13. `mixed-first-programs`

**Mixed problems: first programs**

- **From:** `mixed-programming` (its problems 1, 4, 5 and 6); `mixed-instructions-for-a-machine` (Dewey Track); `mixed-decisions-and-logic` (Dewey Track); `mixed-loops-counting-and-chance` (Dewey Track). **Action:** new. **Shape:** mixed set.
- **Covers:** PDP-LO4, PDP-LO6, PDP-LO7, PDP-LO9, PDP-LO10. **Worlds:** none. **Size:** M.
- **Depends on:** `first-steps`, `storing-and-computing`, `compiler-errors`, `types-and-their-sizes`, `making-decisions`, `reading-an-error-message`, `repeating-yourself`, `reading-input`. **Batch:** 5.
- **What changes in C#:** Problems that each need two or more pages of the series, none labelled: even, odd and zero; FizzBuzz; a calculator that checks its input; a type that is too small for its value; a compiler message that hides a second one; a remainder below zero.
- **Cells and blocks to rework:** All new cells; solutions in two tiers where it helps.

### Series: Methods, lists and algorithms

#### 14. `writing-your-own-functions`

**Methods: writing your own**

- **From:** `writing-your-own-functions`; `writing-your-own-functions-practice`. **Action:** adapt (id kept for cross-reference; the page says once that C# calls a function a method). **Shape:** tutorial.
- **Covers:** PDP-LO8, PDP-LO11. **Worlds:** secret messages, pixel art. **Size:** L: move the scope section to the practice page if it runs past an hour.
- **Depends on:** `repeating-yourself`. **Batch:** 3.
- **What changes in C#:** A method is written in the cell that uses it, with its return type and parameter types: `static void Greet(string name)`, `static int Square(int n)`. The opening predict keeps its point: a method nobody calls prints nothing. A method written in a program cell belongs to that cell (rule 1, still unnamed), so a later cell that needs `Encode` writes it again, or its solution brings it along, as dewlab's solutions already do. A local method can be called above the line that declares it, unlike a Python function (a predict). Return or print: a `void` method gives nothing to store, and `int a = DoubleAndPrint(5);` does not compile (CS0029), so the mistake dewlab shows at run time C# shows before it. The section on functions as machines keeps pure methods and the discount example, and drops domain and inverse as maths (MIT-6.2); decode as encode with `-shift` stays and meets the negative remainder again. Scope: a method's variables do not exist outside it (CS0103). A top-level variable that a method uses is the nearest C# has to a global variable, and a variable of the same name inside a method hides it (inside 10, outside 0). A `static` method cannot use a top-level variable at all (CS8421), which is one way to keep a method pure. Arguments are passed by value; `out` is named, with `TryParse` as the example.
- **Cells and blocks to rework:** Every cell. `defining-a-function-1/2`; the argument-order cell; `your-turn-1/2/5/7` in both worlds, whose `inputs` lose `guess: yes` (dewsharp has no guess column); `return-or-print-1/2` and `your-turn-4` (a compiler error now, `expect: CS0029` on the teaching cell only); the discount cell; the hypotenuse with `Math.Sqrt`; the scope cells; `your-turn-9` and `your-turn-10` become one cell (variables stay in their cell).
- **Practice (`writing-your-own-functions-practice`):** "The wrong number of arguments" becomes CS7036 and CS1501; "Called too soon" becomes a predict with the opposite answer; "Print a print" becomes CS0029; "Two answers at once" can return a tuple.

#### 15. `lists-and-sequences`

**Arrays and lists: many values under one name**

- **From:** `lists-and-sequences`; `lists-and-sequences-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO4, PDP-LO6. **Worlds:** secret messages, pixel art. **Size:** L.
- **Depends on:** `repeating-yourself`. **Batch:** 3.
- **What changes in C#:** C# has two collections where Python has one. An array (`string[] words = { ... };`) keeps its length; a `List<string>` grows with `Add`. The page starts with an array and meets `List<T>` where a loop builds one. Indexes start at 0; the last element is `words[^1]` or `words[words.Length - 1]`. Slices become ranges (`letters[2..5]`), which stop before their second number, so the picture of cuts stays with new labels. Printing an array prints its type (`System.String[]`), a predict almost nobody gets; `string.Join` shows the elements. A string cannot be changed: `word[0] = 'M';` does not compile (CS0200), where Python stopped at run time. `enumerate` goes: a `for` loop with an index does its job. `Split(' ')` makes an array of words. `Length` for arrays and strings, `Count` for lists.
- **Cells and blocks to rework:** Every cell. `lists-ordered-collections-1..4`; `changing-a-list-1` (`List<string>`, `Add`); `changing-a-list-2` keeps its predict with the compiler error as the answer; `building-lists-with-loops-1`; `looping-over-lists-1..3` (`enumerate` becomes `for`); `your-turn-1..4` in both worlds. `where-the-cuts-are.svg` is redrawn with C# ranges.
- **Practice (`lists-and-sequences-practice`):** "Past the end" becomes `IndexOutOfRangeException`; "MOON from NOON" builds a new string; Fibonacci and the golden ratio stay.

#### 16. `grids-and-references`

**Grids and references: arrays of arrays, and two names for one array**

- **From:** `comprehensions-and-grids`; `comprehensions-and-grids-practice`. **Action:** replace (renamed: C# has no comprehensions). **Shape:** tutorial.
- **Covers:** PDP-LO4, PDP-LO8. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `lists-and-sequences`, `writing-your-own-functions`. **Batch:** 4.
- **What changes in C#:** The comprehension section goes: C# has no list comprehension. (LINQ's `Select` and `Where` are its nearest relation, and they go to the explore page `asking-a-list-a-question`.) The page keeps its other halves. Grids: a jagged array `int[][]` holds rows, `picture[1][3]` is row then column, and a rectangular `int[,]` is shown beside it. Nested loops draw it; in pixel art, `Console.BackgroundColor` can draw it in colour. Two names for one array: `int[] copy = row;` shares one array, because an array is a reference type, and `row.ToArray()` makes a copy. A method that changes an array it was given changes the caller's; a method that changes an `int` parameter does not. The grid that was one row: a jagged array whose rows are the same array. Sequences as functions and the dot product go (maths); the ISBN check digit moves to the practice page.
- **Cells and blocks to rework:** The comprehension cells go. `a-grid-is-a-list-of-lists-1..3`; `your-turn-2` in both worlds (the Polybius square as `char[,]`, the negative picture with loops); `two-names-for-one-list-1..4`; `your-turn-3` in both worlds. Cells that keep their task keep their ids; new cells get new ids.
- **Practice (`grids-and-references-practice`):** "There and back" and "Without a list" (comprehensions) go. "A function that adds", "Two rows, one list" and "A copy that is not" stay. Add the ISBN check digit.

#### 17. `two-names-one-list`

**Two names, one list: a closer look at copying**

- **From:** `two-names-one-list`. **Action:** translate. **Shape:** closer look.
- **Covers:** PDP-LO4, PDP-LO8. **Worlds:** none. **Size:** S.
- **Depends on:** `grids-and-references`. **Batch:** 5.
- **What changes in C#:** The same experiment with `int` and `int[]`. After it, the page names the difference: `int` is a value type and an array is a reference type. A `string` is a reference type that cannot be changed, so it behaves like a value. The grid made with `*` becomes a jagged array whose rows are one array.
- **Cells and blocks to rework:** Both cells.

#### 18. `looking-things-up-by-name`

**Dictionaries: looking things up by key**

- **From:** `looking-things-up-by-name`; `looking-things-up-by-name-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO4. **Worlds:** secret messages, pixel art. **Size:** L.
- **Depends on:** `lists-and-sequences`. **Batch:** 4.
- **What changes in C#:** `Dictionary<char, char> key = new() { ['A'] = 'Q', ... };`. A key that is not there stops with `KeyNotFoundException`. `ContainsKey` replaces `in`; `GetValueOrDefault` and `TryGetValue` replace `.get()`, and `TryGetValue` follows the `TryParse` pattern. A `foreach` over a dictionary gives `KeyValuePair<char, int>` values with `.Key` and `.Value`. PDP writes every type (the style guide), so the page writes that type in full, or loops over `.Keys`. Printing a dictionary prints its type, so the page prints its pairs in a loop. The pixel palette keeps each colour as an `int[]`.
- **Cells and blocks to rework:** Every cell; `count_letters` becomes `CountLetters`, and its `inputs` lose the guess column. The "dictionary or list?" cell of comments stays.
- **Practice (`looking-things-up-by-name-practice`):** "The same key twice" becomes an `ArgumentException` from `Add` beside a quiet replace with `[key] =`, a predict; the rest stay.

#### 19. `a-program-of-your-own`

**A program of your own: plan it, build it, release it**

- **From:** `a-program-of-your-own`. **Action:** adapt. **Shape:** project.
- **Covers:** PDP-LO7, PDP-LO5, PDP-LO6. **Worlds:** none. **Size:** S (the work is the learner's, over a week or two).
- **Depends on:** `looking-things-up-by-name`, `reading-input`. **Batch:** 5.
- **What changes in C#:** The opening program is the Caesar coder with methods. A program of your own can now ask its user for input (`reading-input`), so each starting point begins with a menu. The release checklist gains two lines: it compiles with no warning you have not read, and you have downloaded it as a Visual Studio project and kept that copy. No solutions and no practice page, as in dewlab.
- **Cells and blocks to rework:** Two cells and the challenge.

#### 20. `finding-things`

**Searching: linear and binary search**

- **From:** `finding-things`; `finding-things-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO2, PDP-LO7. **Worlds:** secret messages, pixel art. **Size:** M.
- **Depends on:** `lists-and-sequences`, `reading-input`. **Batch:** 5.
- **What changes in C#:** The guess-my-number game becomes one program with real input: `Random.Shared.Next(1, 101)` and a `do`...`while` that reads guesses. In dewlab it needed two cells sharing a secret, which the rules of the road do not allow; with `ReadLine` it is one program, and closer to a real game. `LinearSearch` and `BinarySearch` are methods over `int[]` and `string[]`. Strings are compared with `string.CompareOrdinal`, and the page says why (`<` does not compile on strings). `mid = (low + high) / 2` needs no `//`. The Big O paragraphs stay. `Array.BinarySearch` is named.
- **Cells and blocks to rework:** `guess-my-number-1/2` become one interactive cell with a new id and `stdin:`; `your-turn-1/2` lose `guess: yes`; `your-turn-3` in both worlds (the pixel world's comprehension for `lit` becomes a loop); `putting-it-together-1` keeps its predict.
- **Practice (`finding-things-practice`):** Unchanged problems in C#, plus one on the midpoint of two very large `int` values (it goes round, from `types-and-their-sizes`).

#### 21. `putting-things-in-order`

**Sorting: bubble, insertion and selection sort**

- **From:** `putting-things-in-order`; `putting-things-in-order-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO2, PDP-LO7. **Worlds:** secret messages, pixel art. **Size:** L.
- **Depends on:** `finding-things`. **Batch:** 6.
- **What changes in C#:** The opening predict keeps its point: `Array.Sort` on the strings "10", "9" and "100" gives 10, 100, 9. The swap is a tuple swap, `(a[i], a[i + 1]) = (a[i + 1], a[i]);`, which C# has too. The three sorts are methods over `int[]`. `List.Sort()` sorts in place and gives nothing back, so `var result = numbers.Sort();` does not compile (CS0815), which replaces dewlab's `None` surprise (the predict shows `var` once as code to read, or uses `List<int> result = ...` and CS0029, since PDP writes every type). Sorting with a key needs a method passed to a method; see the open question on lambdas in PDP. Counting comparisons stays.
- **Cells and blocks to rework:** `sorted-in-one-line-1`; `the-swap-1`; the bubble cells; `your-turn-1` (lines in the wrong order) stays; `your-turn-2/3`; `sorting-with-a-key-1/2` and `your-turn-4` in both worlds (reworked or cut, by the lambda decision); `comparing-our-sorts-1/2`.
- **Practice (`putting-things-in-order-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 22. `building-reusable-tools`

**Reusable methods: a class of tools, and tests for them**

- **From:** `building-reusable-tools`; `building-reusable-tools-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO8, PDP-LO10, PDP-LO11, PDP-LO7. **Worlds:** secret messages, pixel art. **Size:** L: the rules of the road add a section; "Handling edge cases" can move to a second page if it runs long.
- **Depends on:** `putting-things-in-order`, `objects-and-classes`. **Batch:** 7.
- **What changes in C#:** This is PDP's first page with a class: a `static class Stats` in a types cell (`Stats.cs`) holds `Mean` and the methods after it, and the program cells below use it and test it. So this page teaches the rules of the road, all five, with a small cell for each, in the style guide's words (`objects-and-classes` does the same for FOOP). `Console` and `Math` are named as classes of the same kind. XML comments (`/// <summary>`) replace docstrings. The four versions of `Mean` gain a C# twist: with `int`, `total / count` is whole-number division, so the version that looks right is dewlab's version c. An empty array: whole-number division by zero stops with `DivideByZeroException`, and `0.0 / 0` is NaN, which is not an exception at all. Tests: dewsharp has no `tests:` cell and no `assert`, so the page writes a small `Check` method once, in the types cell, and the reader's tests are program cells that call it (see the open question on tests). Edge cases: `throw new ArgumentException(...)` replaces `raise ValueError`; `TryMean(values, out double mean)` replaces `return None`, in the `TryParse` shape the reader knows. `try` and `catch` appear where a caller handles the exception.
- **Cells and blocks to rework:** Every cell. `a-mean-that-works-1` (its predict changes: whole-number division); `what-makes-a-good-function-1` becomes the types cell; `testing-as-a-habit-1/2` (the four versions as `MeanA` to `MeanD` in one types cell, compared with four calls rather than a dictionary of methods); `functions-calling-functions-1`; `your-turn-1` and its tests cell (a program cell below); `handling-edge-cases-1/2`; `your-turn-2` in both worlds; `variable-scope-revisited-1`; the challenge checks bubble sort against `Array.Sort` on 100 random arrays. New: one small cell for each rule of the road.
- **Practice (`building-reusable-tools-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 23. `when-it-goes-wrong`

**Debugging: finding bugs in bigger programs**

- **From:** `when-it-goes-wrong`; `when-it-goes-wrong-practice`; `finding-where-it-went-wrong` (Computational Methods). **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO9, PDP-LO10. **Worlds:** secret messages, pixel art. **Size:** L.
- **Depends on:** `building-reusable-tools`, `looking-things-up-by-name`. **Batch:** 8.
- **What changes in C#:** Several of dewlab's run-time bugs are compiler errors in C#, and the page opens with that: a dictionary made inside the loop and returned after it (CS0103), a `return` inside a loop (CS0161, not all code paths return a value), `list.add` (CS1061). Then the bugs C# cannot see before the run: `IndexOutOfRangeException` and `ArgumentOutOfRangeException` (off by one), `KeyNotFoundException`, `NullReferenceException` (new to readers from Python: a list that was declared and never made), and `InvalidOperationException` from removing items inside a `foreach` (in Python the loop quietly skipped one). An exception report through several methods, read in the order the page shows it. The dangerous kind keeps `HasVowel` and the median that sorts its caller's array. The habits keep printing values in the middle, and add the Visual Studio debugger as the next step: a breakpoint, Step Over, Step Into and the Locals window, with steps.
- **Cells and blocks to rework:** `a-count-that-forgets-1` becomes a compiler error with a predict; `errors-from-lists-and-dictionaries-1..4` rewritten (reusing `max` as a name is not a C# trap; `NullReferenceException` takes its place); `reading-a-traceback-1` needs an error that happens at run time (a string shift is now CS1503); `tracebacks-...-1`; `the-dangerous-kind-1..3`; `your-turn-1` in both worlds with its tests as program cells; `debugging-habits-1/2`; `your-turn-2` needs a new bug (`return` in the loop is now CS0161).
- **Practice (`when-it-goes-wrong-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 24. `how-we-got-here`

**Programming languages: how they came to be**

- **From:** `how-we-got-here`; `how-we-got-here-practice`; `many-languages-one-idea` (Dewey Track, for the table). **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO1, PDP-LO3. **Worlds:** secret messages, pixel art. **Size:** L.
- **Depends on:** `lists-and-sequences`, `looking-things-up-by-name`. **Batch:** 5.
- **What changes in C#:** Binary literals work in C# (`0b101010`), and `Convert.ToString(42, 2)` replaces `bin()`. `ToBinary` and `FromBinary` become methods. The section on compilers and interpreters uses C# as the reader's own example: C# compiles to an in-between form, and the .NET runtime turns that into machine code on each machine just before it runs. The table adds C# (2000) and keeps Python (1991) as the language many readers met first. The four paradigms in C#: a loop (procedural), LINQ's `Where` and `Sum` (declarative), a method passed to another method (functional) and a class (object-oriented); the last three are code to read.
- **Cells and blocks to rework:** Every cell; the binary and hexadecimal tasks in both worlds; the paradigm cells become `csharp` fences to read where they use what PDP has not taught.
- **Practice (`how-we-got-here-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 25. `mixed-programming`

**Mixed problems: methods, lists and algorithms**

- **From:** `mixed-programming`. **Action:** adapt. **Shape:** mixed set.
- **Covers:** PDP-LO2, PDP-LO7, PDP-LO8, PDP-LO9, PDP-LO10. **Worlds:** none. **Size:** M.
- **Depends on:** `writing-your-own-functions`, `lists-and-sequences`, `grids-and-references`, `looking-things-up-by-name`, `finding-things`, `putting-things-in-order`, `building-reusable-tools`, `when-it-goes-wrong`, `how-we-got-here`. **Batch:** 9.
- **What changes in C#:** Problems 7 to 20 in C#, with the first six moving to `mixed-first-programs`. "Where the None came from" becomes "where the null came from", or a compiler error. Problems that leaned on comprehensions are solved with loops. One new problem for each page of the series that dewlab's set missed (grids, references).
- **Cells and blocks to rework:** Every cell.

### Series: Working in a team

#### 26. `from-cells-to-a-program`

**A whole program: from cells to Visual Studio**

- **From:** `from-cells-to-a-program`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** PDP-LO5, PDP-LO6, PDP-LO7, PDP-LO8, PDP-LO11, PDP-LO12. **Worlds:** none. **Size:** M.
- **Depends on:** `building-reusable-tools`, `reading-input`. **Batch:** 8.
- **What changes in C#:** The `ask()` stand-in goes: `ReadLine` is real, and `reading-input` has already taught the menu loop and asking again, so those two sections shrink to a recap inside Codebreaker's first release. `FirstValid` over a `string[]` stays, because it tests the deciding without anyone typing. Where a program starts: the top-level statements are the program's `Main`. (The classic `static void Main` is shown on a FOOP page, by the style guide's default; this page says only that Visual Studio's template can show it.) A program in files: Codebreaker's methods go into a `static class Cipher` in a types cell (`Cipher.cs`), and the menu into `Program.cs`, the shape a team uses with one file per person. Running it outside the page: download the cell as a Visual Studio project, open it, and run it with and without the debugger. Three releases of Codebreaker, with `Random.Shared` and real input. The team templates stay; the interface agreement gains the method's signature (`public static bool PlayRound(string word)`).
- **Cells and blocks to rework:** `a-loop-that-stops-itself-1` (`while (true)` and `break`) stays; `a-loop-that-waits-for-quit-1` and `your-turn-1` become real input; `asking-until-...-1` and `your-turn-2` shrink; `one-place-to-start-main-1` splits into `Cipher.cs` and `Program.cs`; the `__name__` section goes; `three-releases-...-1/2` with real input.
- **Practice (`from-cells-to-a-program-practice`):** New (dewlab has none): a menu loop with a bug, a validation method tested with a `string[]`, a `static class` to split out of a long cell, a change log to write.

#### 27. `critique-and-reflection`

**Code review: reading your own code and someone else's**

- **From:** `critique-and-reflection`. **Action:** translate. **Shape:** reflection.
- **Covers:** PDP-LO11, PDP-LO12. **Worlds:** none. **Size:** S.
- **Depends on:** `a-program-of-your-own`. **Batch:** 6.
- **What changes in C#:** No cells. Docstrings become XML comments; the questions about names mention C#'s naming (PascalCase methods, camelCase variables), which is the coding standard PDP-LO11 asks for.
- **Cells and blocks to rework:** Prose only.

#### 28. `the-team-project`

**The team project: a brief**

- **From:** `the-team-project`. **Action:** adapt. **Shape:** brief.
- **Covers:** PDP-LO12, PDP-LO7. **Worlds:** none. **Size:** S.
- **Depends on:** `from-cells-to-a-program`. **Batch:** 9.
- **What changes in C#:** Release 1 of the text adventure is C# with real input: rooms in a `Dictionary<string, Dictionary<string, string>>`, and a loop that asks where to go. The team builds it in Visual Studio, one `static class` per person in its own file, in one project. The page says the team needs one shared place for the project (the college's choice) and leaves submission to the teacher. "Working on one thing at once" stays; its interface agreement is a method signature.
- **Cells and blocks to rework:** One cell.

#### 29. `mixed-working-in-a-team`

**Mixed problems: working in a team**

- **From:** `from-cells-to-a-program`; `the-team-project`; `code-other-people-can-read` (Dewey Track); `building-it-together` (Dewey Track). **Action:** new. **Shape:** mixed set.
- **Covers:** PDP-LO10, PDP-LO11, PDP-LO12. **Worlds:** none. **Size:** S.
- **Depends on:** `from-cells-to-a-program`, `critique-and-reflection`. **Batch:** 9.
- **What changes in C#:** Problems about other people's code: a teammate's `static class` with one method that breaks its agreement; two methods that do the same job; a menu that does not cope with End input; a change log to write from two versions of a method; a method to review against the checklist.
- **Cells and blocks to rework:** All new.

### What PDP leaves out of dewlab's pages

- Every dewlab PDP page has a C# page. None is dropped.
- Sections that belong to the maths course: number families
  (`making-decisions`), sigma notation (`repeating-yourself`), domain and
  inverse (`writing-your-own-functions`), sequences as functions and the dot
  product (`comprehensions-and-grids`).
- Comprehensions and generator expressions (`comprehensions-and-grids`), and
  the "shorter way" solutions that used them.
- `if __name__ == "__main__"` (`from-cells-to-a-program`) and the `ask()`
  stand-in for input (`from-cells-to-a-program`, `the-team-project`).
- The Notebook's Variables panel and files (`the-tools-around-your-code`,
  FOOP): the page has neither, and Visual Studio takes their place.

### Explore: PDP

Extras for a learner who finishes early, or a class with a spare week. None
is needed for an outcome.

#### E1. `a-function-that-calls-itself`

**Recursion: a method that calls itself**

- **From:** `a-function-that-calls-itself` (Dewey Track); `finding-everything-inside-a-folder` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO8, PDP-LO2. **Worlds:** none. **Size:** M.
- **Depends on:** `writing-your-own-functions`, `lists-and-sequences`. **Batch:** 13 (it could start from batch 4).
- **Why:** Recursion is in the maths module's algorithms (MIT-6.8) and in Computational Methods, and PDP's pages leave it out. A folder tree, folders inside folders, is the clearest reason for it.
- **What changes in C#:** A folder tree is built in memory (a `Folder` with a list of files and a list of folders), because the page cannot read real files. A runaway recursion ends the program with a stack overflow, which .NET cannot catch: check what the page does before the lesson shows it.

#### E2. `bits-that-flip`

**Bits that flip: XOR and parity**

- **From:** `bits-that-flip` (Dewey Track). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO4. **Worlds:** none. **Size:** M.
- **Depends on:** `powers-in-csharp`, `types-and-their-sizes`, `repeating-yourself`. **Batch:** 13 (it could start from batch 3).
- **Why:** C#'s `^` is the exclusive or that `powers-in-csharp` found by accident. Hiding a message with XOR, and catching a flipped bit with a parity bit, are small programs with a real use.
- **What changes in C#:** `^`, `&`, `|`, `<<` and `>>` on `int` and `byte`, `Convert.ToString(n, 2)` to see the bits. The matplotlib picture goes.

#### E3. `leaving-it-to-chance`

**Random numbers: seeds and surprises you can repeat**

- **From:** `leaving-it-to-chance` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO10. **Worlds:** none. **Size:** M.
- **Depends on:** `finding-things`. **Batch:** 13 (it could start from batch 6).
- **Why:** Every game on these pages uses `Random`. `new Random(42)` gives the same numbers every run, which is how a game with chance in it can be tested.
- **What changes in C#:** `Random.Shared`, `Next`, `NextDouble`, a seed, choosing from an array, a shuffle. The charts become a histogram of `*` characters.

#### E4. `three-doors`

**The Monty Hall problem: three doors and a simulation**

- **From:** `three-doors` (Programming and Maths, Integrated). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO2, PDP-LO7. **Worlds:** none. **Size:** M.
- **Depends on:** `repeating-yourself`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** Almost everyone doubts the answer, and 10,000 games in a loop settle it. It needs only `Random`, `if` and loops.
- **What changes in C#:** `itertools` goes: nested loops list the cases. The host who is not paying attention stays.

#### E5. `counting-darts`

**Monte Carlo: estimating π with random darts**

- **From:** `counting-darts` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO2. **Worlds:** none. **Size:** M.
- **Depends on:** `repeating-yourself`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** π from random numbers is a result people remember. The estimate settles as the darts go up, and a table of lines shows it without a chart.
- **What changes in C#:** The matplotlib pictures become a table, or a small grid of `#` and `.` for where the darts land.

#### E6. `three-ways-to-make-change`

**Making change: three ways to use the fewest coins**

- **From:** `three-ways-to-make-change` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO2, PDP-LO8. **Worlds:** none. **Size:** M.
- **Depends on:** `looking-things-up-by-name`, `a-function-that-calls-itself`. **Batch:** 14 (it could start from batch 5).
- **Why:** Euro coins make it familiar. The greedy way fails for coins of 1, 3 and 4, a surprise worth an evening, and remembering answers in a `Dictionary` makes the slow way fast.
- **What changes in C#:** `Stopwatch` times the ways; `time` goes.

#### E7. `a-chain-reads-a-book`

**Markov chains: a dictionary that writes like a book**

- **From:** `a-chain-reads-a-book` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO4, PDP-LO7. **Worlds:** none. **Size:** M.
- **Depends on:** `looking-things-up-by-name`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** A dictionary of dictionaries, built from a real book, writes new sentences in the book's voice. Few exercises show as well what a `Dictionary` can do.
- **What changes in C#:** The page cannot load a file, so a public-domain passage is kept as a string in a types cell. `Dictionary<string, Dictionary<string, int>>`.

#### E8. `the-game-of-life`

**The Game of Life: a grid that changes by itself**

- **From:** `comprehensions-and-grids` (its grids, and its reading on cellular automata). **Action:** new. **Shape:** explore.
- **Covers:** PDP-LO7, PDP-LO8. **Worlds:** none. **Size:** M.
- **Depends on:** `grids-and-references`, `reading-input`. **Batch:** 13 (it could start from batch 5).
- **Why:** Four rules on a grid of cells give patterns that move and grow, and surprise the person who wrote them. It needs only grids, loops and methods, and `Console.Clear()` works on the page.
- **What changes in C#:** A `bool[,]` grid, one generation for each press of Enter (a `ReadLine` loop), drawn with `#` and `.`. Check whether `Thread.Sleep` works on the page before offering an animated version.

#### E9. `many-languages-one-idea`

**Many languages, one idea: the same job in five languages**

- **From:** `many-languages-one-idea` (Dewey Track). **Action:** adapt. **Shape:** explore.
- **Covers:** PDP-LO3. **Worlds:** none. **Size:** M.
- **Depends on:** `how-we-got-here`. **Batch:** 13 (it could start from batch 6).
- **Why:** PDP-LO3 asks learners to tell languages apart, and the theory exam asks about it. The same job in C#, Python, SQL, JavaScript and BASIC, read side by side, gives something concrete to compare. A teacher preparing for the exam may move it into the contents.
- **What changes in C#:** Only the C# runs; the others are fences to read.

## Fundamentals of Object-Oriented Programming (5N0541)

Twenty-one lessons in three series, and a mixed set at the end of each. Three
of the lessons are PDP's, shared. The first series is for learners who know
Python and not C#; a learner who took PDP in C# starts at "Classes and objects" (`DECISIONS.md` 11). The
other two series follow dewlab's FOOP in its order, with four new pages:
`virtual-and-override`, `many-classes-one-promise` (interfaces),
`two-names-one-object` and `namespaces-and-libraries`.

| # | Lesson | Title | From dewlab | Action | Batch |
|---|---|---|---|---|---|
| | **Starting in C#** | | | | |
| 1 | `from-python-to-csharp` | C# for Python programmers: the same program in two languages | the-moves-you-already-know, many-languages-one-idea, storing-and-computing, repeating-yourself, writing-your-own-functions | new | 1 |
| 2 | `compiler-errors` | Compiler errors: what C# checks before it runs anything | reading-an-error-message, when-python-says-no | new | 2 |
| 3 | `types-and-their-sizes` | Types and their sizes: how much a variable can hold | numbers-a-computer-can-hold, how-a-computer-stores-a-number | new | 2 |
| 4 | `reading-input` | Reading input: ReadLine, TryParse and a loop that asks again | from-cells-to-a-program, storing-and-computing, reading-an-error-message | new | 4 |
| 5 | `mixed-starting-in-csharp` | Mixed problems: starting in C# | mixed-programming, mixed-instructions-for-a-machine | new | 5 |
| | **Classes and objects** | | | | |
| 6 | `objects-and-classes` | Classes and objects: keeping data and actions together | objects-and-classes | adapt | 0 |
| 7 | `the-moves-you-already-know` | Inside a method: sequence, selection and iteration in a class | the-moves-you-already-know | adapt | 1 |
| 8 | `the-tools-around-your-code` | Visual Studio: the tools around your code | the-tools-around-your-code | adapt | 3 |
| 9 | `keeping-details-inside-an-object` | Encapsulation: private fields, public methods and properties | keeping-details-inside-an-object | adapt | 1 |
| 10 | `one-class-many-methods` | Methods and overloading: giving one class more to do | one-class-many-methods | adapt | 2 |
| 11 | `from-a-description-to-classes` | Designing classes: from a description to classes and enums | from-a-description-to-classes | adapt | 3 |
| 12 | `mixed-classes-and-objects` | Mixed problems: classes and objects | mixed-programming-with-objects | new | 4 |
| | **Classes working together** | | | | |
| 13 | `one-parent-many-children` | Inheritance: one class built on another | one-parent-many-children | adapt | 4 |
| 14 | `virtual-and-override` | Overriding: a closer look at virtual and override | one-parent-many-children, when-is-a-breaks | new | 5 |
| 15 | `when-is-a-breaks` | Inheritance: a closer look at "is a" | when-is-a-breaks | translate | 5 |
| 16 | `many-classes-one-promise` | Interfaces: one promise, many classes | when-is-a-breaks, objects-inside-objects | new | 6 |
| 17 | `objects-inside-objects` | Composition: objects inside other objects | objects-inside-objects | adapt | 7 |
| 18 | `two-names-one-object` | Two names, one object: a closer look at class and struct | two-names-one-list | new | 8 |
| 19 | `testing-what-a-class-does` | Testing a class: hunting for the bug | testing-what-a-class-does | adapt | 8 |
| 20 | `documenting-a-class` | Documenting a class: XML comments that Visual Studio shows | documenting-a-class | adapt | 9 |
| 21 | `a-front-end-for-a-class` | A front end: letting someone use your classes | a-front-end-for-a-class | adapt | 10 |
| 22 | `namespaces-and-libraries` | Namespaces and class libraries: code from other files and other people | the-tools-around-your-code | new | 10 |
| 23 | `your-world-playable` | Your world, playable: the whole course in one program | your-world-playable | adapt | 11 |
| 24 | `mixed-programming-with-objects` | Mixed problems: programming with objects | mixed-programming-with-objects | adapt | 12 |

### Series: Starting in C#

#### 1. `from-python-to-csharp`

**C# for Python programmers: the same program in two languages**

- **From:** `the-moves-you-already-know` (its four moves); `many-languages-one-idea` (Dewey Track); `storing-and-computing`; `repeating-yourself`; `writing-your-own-functions`. **Action:** new. **Shape:** tutorial.
- **Covers:** FOOP-LO1, FOOP-LO2, FOOP-LO8. **Worlds:** none. **Size:** M.
- **Depends on:** `first-steps`. **Batch:** 1.
- **What changes in C#:** For a reader who can write a function and a loop in Python. Each section puts a short Python program (a `python` fence, to read) beside the same program in C# (a cell to run): a value with a type, a decision, a loop over a list, a method. What changes is named once each: declared types; semicolons and braces in place of colons and indenting; compiling before running; `Console.WriteLine` and `$"..."`; `for` with three parts; methods with return types; `7 / 2` is 3. The last section puts Python's list and dictionary beside C#'s three: an array, a `List<int>` and a `Dictionary<string, int>`, and says when to choose each (FOOP-LO8). Each program cell stands alone (rule 1). A reader who took PDP in C# does not need this page.
- **Cells and blocks to rework:** All new.
- **Practice (`from-python-to-csharp-practice`):** Python programs to write again in C#, and C# that looks like Python and does not compile.

#### 2. `compiler-errors`

**Compiler errors: what C# checks before it runs anything**

- Shared with PDP: one page, one id, one set of saved work. Its entry is PDP lesson 4. **Batch:** 2.

#### 3. `types-and-their-sizes`

**Types and their sizes: how much a variable can hold**

- Shared with PDP: one page, one id, one set of saved work. Its entry is PDP lesson 6. **Batch:** 2.

#### 4. `reading-input`

**Reading input: ReadLine, TryParse and a loop that asks again**

- Shared with PDP: one page, one id, one set of saved work. Its entry is PDP lesson 12. **Batch:** 4.

#### 5. `mixed-starting-in-csharp`

**Mixed problems: starting in C#**

- **From:** `mixed-programming`; `mixed-instructions-for-a-machine` (Dewey Track). **Action:** new. **Shape:** mixed set.
- **Covers:** FOOP-LO1, FOOP-LO2, FOOP-LO5, FOOP-LO10. **Worlds:** game, solar system. **Size:** S.
- **Depends on:** `from-python-to-csharp`, `compiler-errors`, `types-and-their-sizes`, `reading-input`. **Batch:** 5.
- **What changes in C#:** A short set for FOOP readers: problems that mix types, conversions, compiler errors and input, in the FOOP worlds.
- **Cells and blocks to rework:** All new.

### Series: Classes and objects

#### 6. `objects-and-classes`

**Classes and objects: keeping data and actions together**

- **From:** `objects-and-classes`; `objects-and-classes-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO1, FOOP-LO3. **Worlds:** game, solar system, your own. **Size:** L: the rules of the road add about five small cells.
- **Depends on:** nothing. **Batch:** 0.
- **What changes in C#:** The opening problem keeps its two points with C# the reader has: a `Dictionary<string, int>` of health by name, where `health["Grase"] = 3;` quietly adds a new entry and Ada's health goes below zero. `Character` is written in a types cell (`Character.cs`), with public fields, a constructor and `TakeDamage` using `Math.Max`, and used from a program cell below it. In C# a class stops both slips: `grace.TakeDamge(5)` and `grace.Heath = 3` both fail to compile (CS1061), where Python allowed the second. A new section teaches the rules of the road, all five, in the style guide's words, with a small cell for each: a class used below, a variable that stays in its cell (the CS0103 the page expects), a class written again replacing the earlier one, and `Main` staying in its cell. Printing an object prints its class's name (`Character`); overriding `ToString()` gives it text. `__repr__` has no C# twin; the challenge meets a `record`, which prints its values by itself. The table of parts keeps class, object, field, method and constructor, with `this` in place of `self`.
- **Cells and blocks to rework:** `a-list-that-goes-wrong-1` (a `Dictionary`, with its predict); `one-thing-many-parts-1` splits into a types cell and a program cell; `your-turn-1` in both worlds and `your-own` split the same way (the solution is a class written again below, rule 4); `printing-an-object-1/2`; `your-class-1` in each world, the first version of the class chain; the challenge becomes a record. New cells, one for each rule. The ocean variants go (two worlds at most).
- **Practice (`objects-and-classes-practice`):** "A constructor without self" becomes `name = name;` in a constructor (warning CS1717: assignment made to same variable). "What self is for" becomes `this`. "Code that builds it again" becomes a `record`. From earlier: CS0103, two names for one list, counting with a condition.

#### 7. `the-moves-you-already-know`

**Inside a method: sequence, selection and iteration in a class**

- **From:** `the-moves-you-already-know`; `the-moves-you-already-know-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO2, FOOP-LO3. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `objects-and-classes`. **Batch:** 1.
- **What changes in C#:** The table of four moves stays, with C# lines. dewlab's fill-in-the-blank `question` has no dewsharp block, so it becomes a predict or a table the reader completes in a comment. This is FOOP's second page of classes, where the style guide teaches `var` (`var jupiter = new Planet(...)`). Storing inside a class changes: in C# a field is reached without `this.`, so `Photos = Photos + 1;` inside `TakePhoto` changes the field. The slip is declaring a new variable in the method, `int photos = Photos + 1;`: the new value goes into it and is gone when the method ends, and the field stays 0, with no message. The page shows both. The tasks keep (`Heaviest`, `WidestMoon` over a `List<int>` field), and `do`...`while` appears as the second iteration move in the challenge (burns left).
- **Cells and blocks to rework:** `the-handful-of-moves-1` (types cell and program cell); `label-the-moves-1` (the question block) becomes a predict or prose; `storing-inside-a-class-1`; `one-method-several-moves-1` in each world (`inputs` such as `new Backpack("Ada", new List<int> { 2, 5, 1, 3 }).Heaviest()`). The ocean variant goes.
- **Practice (`the-moves-you-already-know-practice`):** "Two names that look alike" becomes a variable in a method with the same name as a field. "A fifth move?" stays.

#### 8. `the-tools-around-your-code`

**Visual Studio: the tools around your code**

- **From:** `the-tools-around-your-code`; `the-tools-around-your-code-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO5, FOOP-LO10. **Worlds:** game, solar system, your own. **Size:** L: the Visual Studio walk-through is done at a machine with Visual Studio, and can be its own session.
- **Depends on:** `the-moves-you-already-know`, `compiler-errors`. **Batch:** 3.
- **What changes in C#:** Most of dewlab's "bug two calls deep" slips are compiler errors in C#, and the page says so: `helth` is CS0103, `bag.add` is CS1061, a name where a number was wanted is CS1503, and two values for one parameter is CS1501. Each message names the line with the mistake. The bug two calls deep that still happens at run time is a `List<string>` field that was never made: a `NullReferenceException` in `PickUp`, called from `Loot`, and the exception report lists both methods. Printing what you need to see stays whole. The page has no autocomplete, so "What the editor already knows" moves to Visual Studio: IntelliSense, hovering, F12 to go to a definition, the Error List. "Where a bigger project lives" becomes a walk-through in Visual Studio: download a cell as a project, open it, run it, add a class in its own file, set a breakpoint, step, read the Locals window. This is the FOOP page where the style guide shows the classic `static void Main`, once, as code to read, because the template and older books use it.
- **Cells and blocks to rework:** `a-bug-two-calls-deep-1/2` become compiler errors with `expect:`, plus one `NullReferenceException` cell; the `question` block becomes a predict; `a-bug-two-calls-deep-3` in each world gets a bug that still compiles; `printing-what-you-need-to-see-1/2` in each world; `what-the-editor-already-knows-1` goes; the Notebook section becomes Visual Studio steps, with pictures described in words; the challenge has one compiler error and one logic error.
- **Practice (`the-tools-around-your-code-practice`):** "A class in another file" becomes a Visual Studio task; "A cell that never ends" keeps Stop; "Missing self" becomes a local that hides a field.

#### 9. `keeping-details-inside-an-object`

**Encapsulation: private fields, public methods and properties**

- **From:** `keeping-details-inside-an-object`; `keeping-details-inside-an-object-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO3, FOOP-LO4. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `objects-and-classes`. **Batch:** 1.
- **What changes in C#:** C# has the lock Python lacks: a `private` field cannot be reached from outside its class, and `probe.fuel = 600;` does not compile (CS0122). So "Reaching in from outside" becomes the compiler refusing, and the underscore convention becomes C#'s way of naming a private field. The access modifiers `public` and `private` are named here (`protected` waits for inheritance). A property replaces the getter method: first the getter the reader expects, then `public int Fuel { get; private set; }` as C#'s own way. The page taught in the ocean (a hull safe to 400 m); with two worlds it is retold in the solar system (a probe that refuses a burn bigger than its fuel, dewlab's own solar-system task). The spare tank keeps its point (ten uses of 0.1 leave 1.3877787807814457E-16, not 0) and gains a second fix beside whole units: `decimal`. The callers' lines still do not change.
- **Cells and blocks to rework:** `keeping-details-to-itself-1/2` (types and program cells, retold); `reaching-in-from-outside-1` (`expect: CS0122`) and `-2` (a property); `your-class-2` in each world, the chain's second version; `what-a-caller-needs-to-know-1/2` and the `question` block (a predict: which caller's line stops compiling); the challenge.
- **Practice (`keeping-details-inside-an-object-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 10. `one-class-many-methods`

**Methods and overloading: giving one class more to do**

- **From:** `one-class-many-methods`; `one-class-many-methods-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO3, FOOP-LO4, FOOP-LO8. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `keeping-details-inside-an-object`. **Batch:** 2.
- **What changes in C#:** Methods that use other methods and other objects stay (`LightMinutes`, `IsFartherThan(Planet other)`, `Describe`). Class attributes become `static` fields. Python's trap, `earth.star = ...` quietly making a new attribute, does not exist: `earth.Star` does not compile (CS0176). So that section becomes one value for the whole class, with a count of planets made. New: overloading, which FOOP names. `IsFartherThan(Planet other)` and `IsFartherThan(double distance)` share a name, and C# picks one by the arguments; a second constructor calls the first with `: this(...)`. `Math.Round(x, 1)` replaces `round()`.
- **Cells and blocks to rework:** `sunlight-1` keeps its predict; `giving-it-more-to-do-1/2`; `data-that-belongs-together-1` (a `List<string>` field); `class-attributes-...-1/2` (`static`); `your-class-3` in each world, the third version; new overloading cells.
- **Practice (`one-class-many-methods-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 11. `from-a-description-to-classes`

**Designing classes: from a description to classes and enums**

- **From:** `from-a-description-to-classes`; `from-a-description-to-classes-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO7, FOOP-LO1, FOOP-LO6. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `one-class-many-methods`. **Batch:** 3.
- **What changes in C#:** The noun hunt, the three questions and the cards stay. The description was an ocean expedition; with two worlds it is retold as a solar-system mission (rovers that drive and must not climb too steep a slope, a crew of up to three, rock samples with a name, a depth and whether they hold ice, a log of every drive). "Every crew member has a role" becomes the first `enum`: `enum Role { Commander, Geologist, Engineer }`, a type with a fixed list of values, which FOOP's section on data types names. The skeletons are C# classes whose method bodies `throw new NotImplementedException()`, so a skeleton compiles and runs until a method is called. A small class diagram sits beside the cards.
- **Cells and blocks to rework:** The description and every cell are retold; skeleton cells become types cells (one class each, with `file:`) and a program cell below builds objects; the tasks in each world.
- **Practice (`from-a-description-to-classes-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 12. `mixed-classes-and-objects`

**Mixed problems: classes and objects**

- **From:** `mixed-programming-with-objects` (its problems 1 to 3 and 5 to 8). **Action:** new. **Shape:** mixed set.
- **Covers:** FOOP-LO2, FOOP-LO3, FOOP-LO4, FOOP-LO5, FOOP-LO7. **Worlds:** game, solar system. **Size:** M.
- **Depends on:** `objects-and-classes`, `the-moves-you-already-know`, `the-tools-around-your-code`, `keeping-details-inside-an-object`, `one-class-many-methods`, `from-a-description-to-classes`. **Batch:** 4.
- **What changes in C#:** The half of dewlab's mixed set that the pages up to designing classes can answer, in C# and in the two worlds.
- **Cells and blocks to rework:** All cells.

### Series: Classes working together

#### 13. `one-parent-many-children`

**Inheritance: one class built on another**

- **From:** `one-parent-many-children`; `one-parent-many-children-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO3, FOOP-LO6, FOOP-LO7. **Worlds:** game, solar system, your own. **Size:** L.
- **Depends on:** `from-a-description-to-classes`, `one-class-many-methods`. **Batch:** 4.
- **What changes in C#:** `class Troll : Character`. The parent's method must be `virtual` and the child's `override`; `base.TakeDamage(amount / 2)` replaces `super()`. A child's constructor calls the parent's with `: base(name, health)`. `protected` is named: a field a child can reach and a caller cannot. The class-attribute trap changes: a `static` limit cannot be overridden, so the limit becomes a virtual property (`public virtual int MaxHealth => 10;`) that the troll overrides. Many kinds, one loop: a `List<Character>` holding characters and trolls, each running its own `TakeDamage`. The phoenix that breaks the parent's rule stays.
- **Cells and blocks to rework:** `character-so-far` becomes a types cell holding the chain's third version; every cell; `your-class-4` in each world, the fourth version.
- **Practice (`one-parent-many-children-practice`):** "Through super, or not?" becomes `base`; add a child whose method is missing `override` (warning CS0114 when the parent's method is virtual, CS0108 when it is not).

#### 14. `virtual-and-override`

**Overriding: a closer look at virtual and override**

- **From:** `one-parent-many-children` (its troll); `when-is-a-breaks` (the shape of a closer look). **Action:** new. **Shape:** closer look.
- **Covers:** FOOP-LO3. **Worlds:** none. **Size:** S.
- **Depends on:** `one-parent-many-children`. **Batch:** 5.
- **What changes in C#:** Idea A: a child's method with the same name replaces the parent's. Idea B: it replaces it only when the parent says `virtual` and the child says `override`. The experiment: a `Troll` without either, held in a `Character` variable, takes full damage (the parent's method runs), and held in a `Troll` variable takes half. The compiler did warn (CS0108: hides inherited member). With `virtual` and `override`, both take half. Why idea A is easy to believe: Python works that way. Where else: `new` on purpose, and a warning as a clue.
- **Cells and blocks to rework:** Three or four new cells.

#### 15. `when-is-a-breaks`

**Inheritance: a closer look at "is a"**

- **From:** `when-is-a-breaks`. **Action:** translate. **Shape:** closer look.
- **Covers:** FOOP-LO3, FOOP-LO7. **Worlds:** none. **Size:** S.
- **Depends on:** `one-parent-many-children`. **Batch:** 5.
- **What changes in C#:** `Rectangle` and `Square` in C#, with `Stretch` virtual so that the fix (`Square` overrides `Stretch`) is possible; the Liskov section stays. The penguin's `Fly` needs `virtual` too. The last paragraph points to the next page: a shape both classes can keep the promises of is an interface.
- **Cells and blocks to rework:** Two cells and an answer fold.

#### 16. `many-classes-one-promise`

**Interfaces: one promise, many classes**

- **From:** `when-is-a-breaks` (the shape that square and rectangle can share); `objects-inside-objects` (the astronaut who is two things at once); `one-parent-many-children-practice`. **Action:** new. **Shape:** tutorial.
- **Covers:** FOOP-LO3, FOOP-LO4, FOOP-LO6. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `when-is-a-breaks`. **Batch:** 6.
- **What changes in C#:** An interface is a list of methods a class promises to have, with no code of its own. `IShape` with `Area()` lets `Square` and `Rectangle` sit in one list without one inheriting from the other, and a `List<IShape>` asks each for its area. A class can keep several promises (an astronaut is a crew member and a pilot), which is how C# does what the descriptor calls multiple inheritance: one parent class, many interfaces. An abstract class is shown beside an interface, with when to choose each. Each world gets an interface (`IDamageable` in the game, `ICanPhotograph` in the solar system). .NET's own `IComparable<T>` is named.
- **Cells and blocks to rework:** All new.
- **Practice (`many-classes-one-promise-practice`):** A class that forgets one method of its interface (CS0535); interface or parent class; sorting a list once a class implements `IComparable<T>`.

#### 17. `objects-inside-objects`

**Composition: objects inside other objects**

- **From:** `objects-inside-objects`; `objects-inside-objects-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO6, FOOP-LO7, FOOP-LO8. **Worlds:** game, solar system, your own. **Size:** L.
- **Depends on:** `many-classes-one-promise`, `one-parent-many-children`. **Batch:** 7.
- **What changes in C#:** A `StarSystem` holds a `List<Planet>`, and the copy of the caller's list (`list(moons)`) becomes `new List<string>(moons)`. "Is a, or has a" stays. The four cases that are not clear-cut stay: a dictionary or a class (C# leans to a class, or a `record`); a child class or a flag (the flag can be an `enum`); `Square(Rectangle)`; and the astronaut who is two things at once, who now has interfaces as an answer. One crew member in two submarines becomes one crew member on two rovers: the reference point again, which the closer look after this page takes further.
- **Cells and blocks to rework:** Every cell; `your-class-5` in each world, the fifth version.
- **Practice (`objects-inside-objects-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 18. `two-names-one-object`

**Two names, one object: a closer look at class and struct**

- **From:** `two-names-one-list`; `objects-inside-objects-practice` (one crew member, two submarines). **Action:** new. **Shape:** closer look.
- **Covers:** FOOP-LO1, FOOP-LO8. **Worlds:** none. **Size:** S.
- **Depends on:** `objects-inside-objects`, `two-names-one-list`. **Batch:** 8.
- **What changes in C#:** Idea A: `b = a` makes a copy of the object. Idea B: it gives the same object a second name. With a `class`, idea B holds. The same code with `struct` in place of `class`, and idea A holds: a struct is a value type, copied by `=`, like an `int`. Where else: passing one to a method, and a `List` of structs whose element cannot be changed in place (CS1612).
- **Cells and blocks to rework:** Three or four new cells.

#### 19. `testing-what-a-class-does`

**Testing a class: hunting for the bug**

- **From:** `testing-what-a-class-does`; `testing-what-a-class-does-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO10, FOOP-LO4. **Worlds:** game, solar system, your own. **Size:** L.
- **Depends on:** `objects-inside-objects`, `many-classes-one-promise`. **Batch:** 8.
- **What changes in C#:** The five suspects stay, retold as five probes (the page taught with submarines). Each is a class that implements one interface, so a single `Check(IProbe probe)` tests any of them; dewlab passed classes around as values, and an interface is C#'s way. `assert` becomes the same small `Check` method `building-reusable-tools` writes, and `try`...`catch` reports one failed check and continues. The ten-line runner over `globals()` becomes a list of tests called in turn. A test before the fix, and a test that is wrong, stay. Close enough: `Math.Abs(a - b) < 0.001`, and `decimal`. A stress test, which FOOP names: a loop that runs a method 100,000 times with random input and checks the rule each time. The next step, a test project in Visual Studio with Test Explorer, is described with steps.
- **Cells and blocks to rework:** `five-suspects-1` becomes a types cell with the five classes; every cell; `your-class-6` in each world, the sixth version (five tests, and the open door closed); `tests:` cells become program cells.
- **Practice (`testing-what-a-class-does-practice`):** "What pytest adds" becomes "what a test project adds".

#### 20. `documenting-a-class`

**Documenting a class: XML comments that Visual Studio shows**

- **From:** `documenting-a-class`; `documenting-a-class-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO9. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `testing-what-a-class-does`. **Batch:** 9.
- **What changes in C#:** Docstrings become XML documentation comments: `/// <summary>`, `<param>`, `<returns>`, `<exception>`. On the page they are comments; in Visual Studio they appear when you hover over a name, so the page ends with one Visual Studio step. doctest has no C# twin: "Examples Python can check" becomes examples in `<example>` that a program cell below checks with `Check`. Comments that say why stay. An algorithm written as pseudocode above a method, which FOOP's skills demonstrations ask for, is shown as one more kind of documentation.
- **Cells and blocks to rework:** Every cell; `your-class-7` in each world, the seventh version.
- **Practice (`documenting-a-class-practice`):** Its dewlab problems in C#, with two or three from earlier pages.

#### 21. `a-front-end-for-a-class`

**A front end: letting someone use your classes**

- **From:** `a-front-end-for-a-class`; `a-front-end-for-a-class-practice`. **Action:** adapt. **Shape:** tutorial.
- **Covers:** FOOP-LO11, FOOP-LO4, FOOP-LO5. **Worlds:** game, solar system, your own. **Size:** L.
- **Depends on:** `documenting-a-class`, `reading-input`. **Batch:** 10.
- **What changes in C#:** The deciding stays apart from the asking: `RunChoice` takes the command as text and never reads input, so a program cell tests it with an array of commands. The loop that asks is real: `ReadLine` in a `do`...`while`, with no stand-in. The second front end cannot be a dropdown (dewsharp has no widgets), so it is a numbered menu with a `switch`, `Console.Clear()` between turns and a colour for the hero's health, all of which work on the page. A third front end is a window, in Visual Studio: a Windows Forms app with a button for each command, each calling the same `RunChoice`; the page gives the steps and says it needs Windows. Deploying: publishing the console app to a folder gives a program someone can run without Visual Studio.
- **Cells and blocks to rework:** Each world's "so far" cell becomes a types cell with the seventh version; `deciding-kept-apart-from-asking-1` keeps its predict; `a-loop-that-asks-1` with real input; `a-menu-to-choose-from-1/2` (dropdown) become the numbered menu; `your-class-8` in each world, the eighth version.
- **Practice (`a-front-end-for-a-class-practice`):** "Reading a number" becomes `int.TryParse`; "What the menu does" becomes a `switch` with a missing `break` (CS0163).

#### 22. `namespaces-and-libraries`

**Namespaces and class libraries: code from other files and other people**

- **From:** `the-tools-around-your-code` (its section on where a bigger project lives); `the-tools-around-your-code-practice` (a class in another file). **Action:** new. **Shape:** tutorial.
- **Covers:** FOOP-LO4, FOOP-LO5, FOOP-LO6. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `documenting-a-class`. **Batch:** 10.
- **What changes in C#:** Every program so far has used classes other people wrote: `Console`, `Math`, `List<T>`, `Dictionary`, `Random`. A namespace groups classes (`System.Collections.Generic`), and `using` lets code name them briefly; the page's cells already have the usual `using` lines. The reader puts their world's classes in a namespace of their own, in types cells, and uses them from a program cell. Reading Microsoft's documentation for a class not met yet (`DateTime` or `Stopwatch`). In Visual Studio: a Class Library project for the world's classes, referenced by the console app, which is the separate class library FOOP's third skills demonstration asks for, with CS0246 met on purpose when the reference is missing.
- **Cells and blocks to rework:** All new. Its cells use the seventh version of each world's class and leave the chain as it is; `your-world-playable` puts the eighth version in a namespace, in its Visual Studio part.
- **Practice (`namespaces-and-libraries-practice`):** New: problems of each kind (predict, make, fix, explain), and two or three from earlier pages.

#### 23. `your-world-playable`

**Your world, playable: the whole course in one program**

- **From:** `your-world-playable`. **Action:** adapt. **Shape:** series-end task.
- **Covers:** FOOP-LO6, FOOP-LO7, FOOP-LO10, FOOP-LO11. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `a-front-end-for-a-class`, `namespaces-and-libraries`, `testing-what-a-class-does`. **Batch:** 11.
- **What changes in C#:** The world's eighth version in types cells (one per class, each with `file:`), its tests in a program cell, and a console front end with real input. "What you have" lists the C# pages. Then the world moves to Visual Studio as one solution: a class library with the classes, a console app that uses it (and a Windows Forms app, for readers who want one), and a test project. That is the shape of FOOP's third skills demonstration. The last part asks the reader to add one rule the way the course did: a test first, then the rule, the XML comment and the command.
- **Cells and blocks to rework:** The running, new-game and front-end cells in each world.

#### 24. `mixed-programming-with-objects`

**Mixed problems: programming with objects**

- **From:** `mixed-programming-with-objects`. **Action:** adapt. **Shape:** mixed set.
- **Covers:** FOOP-LO3, FOOP-LO4, FOOP-LO6, FOOP-LO7, FOOP-LO8, FOOP-LO10. **Worlds:** game, solar system, your own. **Size:** M.
- **Depends on:** `your-world-playable`, `virtual-and-override`, `two-names-one-object`. **Batch:** 12.
- **What changes in C#:** The whole course. dewlab's problems in C#, with the polynomial problems leaving with `a-polynomial-class`, and new problems for interfaces, enums, overloading and structs.
- **Cells and blocks to rework:** Every cell; the ocean variants go.

### What FOOP leaves out of dewlab's pages

- The ocean world, on every page (two worlds at most).
- `a-polynomial-class` moves to the explore list (`DECISIONS.md` 15).
- The `dropdown` front end, and the Notebook's panels, which the page does
  not have.
- `question` blocks, which become predicts or prose.

### Explore: FOOP

#### E1. `a-polynomial-class`

**A polynomial class: a project in many methods**

- **From:** `a-polynomial-class`. **Action:** adapt. **Shape:** explore.
- **Covers:** FOOP-LO4, FOOP-LO8. **Worlds:** none. **Size:** M.
- **Depends on:** `one-class-many-methods`. **Batch:** 13 (it could start from batch 3).
- **Why:** dewlab's FOOP lists it, but no outcome needs it beyond the other pages, and its lead-in is a maths page dewsharp does not have. In C# it gains operator overloading (`p + q`), which makes it a good extra.
- **What changes in C#:** `operator +`, `ToString` writing `-5x^2 + 20x + 1.5`, and a copy of the caller's list in the constructor. No worlds, as in dewlab.

#### E2. `a-deck-of-cards`

**A deck of cards: enums, a class and a shuffle**

- **From:** `sorting-a-hand-of-cards` (Dewey Track); `counting-every-outfit` (Dewey Track); `putting-things-in-order`. **Action:** new. **Shape:** explore.
- **Covers:** FOOP-LO1, FOOP-LO3, FOOP-LO7. **Worlds:** game. **Size:** M.
- **Depends on:** `many-classes-one-promise`, `from-a-description-to-classes`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** `Suit` and `Rank` are the enums every C# book uses, for good reason. A `Deck` that shuffles and deals, and a hand sorted through `IComparable`, end in a card game of the reader's own.
- **What changes in C#:** A `Card` record, a `Deck` class with a shuffle (Fisher and Yates) and `Deal`, a hand sorted once `Card` implements `IComparable<Card>`.

#### E3. `asking-a-list-a-question`

**LINQ: asking a list a question**

- **From:** `comprehensions-and-grids` (its comprehensions); `putting-things-in-order` (sorting with a key). **Action:** new. **Shape:** explore.
- **Covers:** FOOP-LO4, FOOP-LO8. **Worlds:** game, solar system. **Size:** M.
- **Depends on:** `lists-and-sequences`, `objects-and-classes`. **Batch:** 13 (it could start from batch 4).
- **Why:** PDP drops the comprehension because C# has none; LINQ is C#'s nearest relation, and it is part of the class library FOOP asks learners to use. Readers who liked comprehensions in Python meet the C# way here.
- **What changes in C#:** `Where`, `Select`, `OrderBy`, `Sum` and `Count` on a `List<Planet>`, each with a lambda, and the loop each one replaces.

#### E4. `when-a-queue-never-clears`

**Simulating a queue: how busy is too busy?**

- **From:** `when-a-queue-never-clears` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** FOOP-LO6, FOOP-LO7, FOOP-LO8. **Worlds:** none. **Size:** M.
- **Depends on:** `objects-and-classes`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** A `Customer` class and .NET's `Queue<T>` simulate a till; the wait grows without limit as the till nears full use, a result worth seeing. It uses a collection class, which FOOP names.
- **What changes in C#:** The charts become a text table. `Queue<T>`, `Enqueue`, `Dequeue`.

#### E5. `a-model-that-corrects-itself`

**The perceptron: a class that learns from its mistakes**

- **From:** `a-model-that-corrects-itself` (Computational Methods). **Action:** adapt. **Shape:** explore.
- **Covers:** FOOP-LO3, FOOP-LO7. **Worlds:** none. **Size:** M.
- **Depends on:** `objects-and-classes`, `grids-and-references`, `leaving-it-to-chance`. **Batch:** 14 (it could start from batch 7).
- **Why:** A `Perceptron` class learns to tell two pixel shapes apart, drawn in `#` and `.`. Its fields change as it trains, which makes an object feel alive. It is long, so it is the last extra.
- **What changes in C#:** `itertools` and matplotlib go; shapes are `bool[,]` grids.

## Lessons with no worlds

These have none: `powers-in-csharp`, `compiler-errors`, `dividing-in-csharp`, `equals-three-ways`, `a-total-that-starts-again`, `mixed-first-programs`, `two-names-one-list`, `a-program-of-your-own`, `mixed-programming`, `from-cells-to-a-program`, `critique-and-reflection`, `the-team-project`, `mixed-working-in-a-team`, `from-python-to-csharp`, `virtual-and-override`, `when-is-a-breaks`, `two-names-one-object`. Nor has any explore page except
`a-deck-of-cards` and `asking-a-list-a-question`. The reasons: a closer look is one experiment; the
compiler page's cells are small broken programs; the bridge page puts one
program in two languages side by side; a project, a reflection and a brief
are the learner's own work; `from-cells-to-a-program` follows one program,
Codebreaker, as dewlab's page does; dewlab's mixed set for PDP has no worlds
either.

## Practice pages and mixed sets

Every lesson whose shape is *tutorial* has a practice page,
`<id>-practice`, written in the same batch by the same author. Its entry
above says what changes from dewlab's. A tutorial that is new, or whose
dewlab page had none (`from-cells-to-a-program`), gets a new one. Closer
looks, projects, the reflection, the brief and the series-end task have no
practice page, as in dewlab.

The practice pages: `first-steps-practice`, `storing-and-computing-practice`, `compiler-errors-practice`, `types-and-their-sizes-practice`, `making-decisions-practice`, `reading-an-error-message-practice`, `repeating-yourself-practice`, `reading-input-practice`, `writing-your-own-functions-practice`, `lists-and-sequences-practice`, `grids-and-references-practice`, `looking-things-up-by-name-practice`, `finding-things-practice`, `putting-things-in-order-practice`, `building-reusable-tools-practice`, `when-it-goes-wrong-practice`, `how-we-got-here-practice`, `from-cells-to-a-program-practice`, `from-python-to-csharp-practice`, `objects-and-classes-practice`, `the-moves-you-already-know-practice`, `the-tools-around-your-code-practice`, `keeping-details-inside-an-object-practice`, `one-class-many-methods-practice`, `from-a-description-to-classes-practice`, `one-parent-many-children-practice`, `many-classes-one-promise-practice`, `objects-inside-objects-practice`, `testing-what-a-class-does-practice`, `documenting-a-class-practice`, `a-front-end-for-a-class-practice`, `namespaces-and-libraries-practice`.

Each series ends with a mixed set, whose problems each need more than one
page of the series and do not say which. PDP: `mixed-first-programs`,
`mixed-programming`, `mixed-working-in-a-team`. FOOP:
`mixed-starting-in-csharp`, `mixed-classes-and-objects`,
`mixed-programming-with-objects`. `docs/LESSON_FORMAT.md` has no `mixed:`
key for a course, so the course files list each mixed set as the last lesson
of its series (open question 4).

## Outcome coverage

The lessons that cover each outcome, in the course's own lessons (explore
pages are not counted). PDP:

| Outcome | Lessons |
|---|---|
| PDP-LO1 | `how-we-got-here` |
| PDP-LO2 | `first-steps`, `finding-things`, `putting-things-in-order`, `mixed-programming` |
| PDP-LO3 | `how-we-got-here` |
| PDP-LO4 | `first-steps`, `powers-in-csharp`, `storing-and-computing`, `compiler-errors`, `dividing-in-csharp`, `types-and-their-sizes`, `making-decisions`, `equals-three-ways`, `reading-input`, `mixed-first-programs`, `lists-and-sequences`, `grids-and-references`, `two-names-one-list`, `looking-things-up-by-name` |
| PDP-LO5 | `first-steps`, `a-program-of-your-own`, `from-cells-to-a-program` |
| PDP-LO6 | `first-steps`, `making-decisions`, `repeating-yourself`, `a-total-that-starts-again`, `reading-input`, `mixed-first-programs`, `lists-and-sequences`, `a-program-of-your-own`, `from-cells-to-a-program` |
| PDP-LO7 | `storing-and-computing`, `types-and-their-sizes`, `repeating-yourself`, `mixed-first-programs`, `a-program-of-your-own`, `finding-things`, `putting-things-in-order`, `building-reusable-tools`, `mixed-programming`, `from-cells-to-a-program`, `the-team-project` |
| PDP-LO8 | `a-total-that-starts-again`, `writing-your-own-functions`, `grids-and-references`, `two-names-one-list`, `building-reusable-tools`, `mixed-programming`, `from-cells-to-a-program` |
| PDP-LO9 | `first-steps`, `powers-in-csharp`, `compiler-errors`, `equals-three-ways`, `reading-an-error-message`, `mixed-first-programs`, `when-it-goes-wrong`, `mixed-programming` |
| PDP-LO10 | `reading-an-error-message`, `reading-input`, `mixed-first-programs`, `building-reusable-tools`, `when-it-goes-wrong`, `mixed-programming`, `mixed-working-in-a-team` |
| PDP-LO11 | `storing-and-computing`, `writing-your-own-functions`, `building-reusable-tools`, `from-cells-to-a-program`, `critique-and-reflection`, `mixed-working-in-a-team` |
| PDP-LO12 | `from-cells-to-a-program`, `critique-and-reflection`, `the-team-project`, `mixed-working-in-a-team` |

FOOP:

| Outcome | Lessons |
|---|---|
| FOOP-LO1 | `types-and-their-sizes`, `from-python-to-csharp`, `mixed-starting-in-csharp`, `objects-and-classes`, `from-a-description-to-classes`, `two-names-one-object` |
| FOOP-LO2 | `reading-input`, `from-python-to-csharp`, `mixed-starting-in-csharp`, `the-moves-you-already-know`, `mixed-classes-and-objects` |
| FOOP-LO3 | `objects-and-classes`, `the-moves-you-already-know`, `keeping-details-inside-an-object`, `one-class-many-methods`, `mixed-classes-and-objects`, `one-parent-many-children`, `virtual-and-override`, `when-is-a-breaks`, `many-classes-one-promise`, `mixed-programming-with-objects` |
| FOOP-LO4 | `keeping-details-inside-an-object`, `one-class-many-methods`, `mixed-classes-and-objects`, `many-classes-one-promise`, `testing-what-a-class-does`, `a-front-end-for-a-class`, `namespaces-and-libraries`, `mixed-programming-with-objects` |
| FOOP-LO5 | `compiler-errors`, `mixed-starting-in-csharp`, `the-tools-around-your-code`, `mixed-classes-and-objects`, `a-front-end-for-a-class`, `namespaces-and-libraries` |
| FOOP-LO6 | `from-a-description-to-classes`, `one-parent-many-children`, `many-classes-one-promise`, `objects-inside-objects`, `namespaces-and-libraries`, `your-world-playable`, `mixed-programming-with-objects` |
| FOOP-LO7 | `from-a-description-to-classes`, `mixed-classes-and-objects`, `one-parent-many-children`, `when-is-a-breaks`, `objects-inside-objects`, `your-world-playable`, `mixed-programming-with-objects` |
| FOOP-LO8 | `from-python-to-csharp`, `one-class-many-methods`, `objects-inside-objects`, `two-names-one-object`, `mixed-programming-with-objects` |
| FOOP-LO9 | `documenting-a-class` |
| FOOP-LO10 | `compiler-errors`, `mixed-starting-in-csharp`, `the-tools-around-your-code`, `testing-what-a-class-does`, `your-world-playable`, `mixed-programming-with-objects` |
| FOOP-LO11 | `reading-input`, `a-front-end-for-a-class`, `your-world-playable` |

FOOP-LO9 (documentation) has one page of its own; the pages after it keep
XML comments on every method they add, so the habit continues to the end of
the course.

## Batches

Lessons are translated in batches. The rules:

1. A batch depends only on earlier batches. The one exception: a tutorial and
   its practice page are one piece of work, written together in the same
   batch, tutorial first.
2. The lessons in a batch do not depend on each other, so they can be
   translated at the same time.
3. A lesson links back only to lessons of earlier batches. A link forward
   ("the next page, …") is added by the batch that writes the page it points
   to: that author adds the link to the earlier page as part of their work.
4. A batch is finished when every cell of its lessons runs in the checker and
   its outputs are recorded (`npm run check-lessons -- --write`, or the native
   checker in `drafts/tools/` until the browser checker exists), and every
   number in its prose comes from those outputs.
5. Josh reviews the two exemplars before batch 1 starts. A change to their
   pattern after that means a pass over every lesson already written.

**Batch 0, the exemplars.** `first-steps` (with its practice page) is the
pattern for PDP and for every early page: the frontmatter, the "How this page
works" paragraph for C#, the first cell meant to fail and the paragraph that
names compiling, how many predicts and of what kind, a task in two worlds,
`solution` and `inputs` on a program cell, the practice page, and the closing
sections. `objects-and-classes` (with its practice page) is the pattern for
every page with classes: types cells with `file:`, the rules of the road in
the style guide's words with a cell for each, a world variant that holds a
types cell and a program cell, a solution that writes a class again below
(rule 4), the first version of the class chain in each world, and a FOOP
practice page. Neither links to another lesson until the lessons it would
link to exist (rule 3).

`powers-in-csharp` already has a draft in `drafts/lessons/`. It sits in batch
1 and is reviewed against `first-steps` when that lands.

| Batch | Lessons (each tutorial with its practice page) |
|---|---|
| 0 | `first-steps`, `objects-and-classes` |
| 1 | `powers-in-csharp`, `storing-and-computing`, `dividing-in-csharp`, `from-python-to-csharp`, `the-moves-you-already-know`, `keeping-details-inside-an-object` |
| 2 | `compiler-errors`, `types-and-their-sizes`, `making-decisions`, `repeating-yourself`, `one-class-many-methods` |
| 3 | `equals-three-ways`, `reading-an-error-message`, `a-total-that-starts-again`, `writing-your-own-functions`, `lists-and-sequences`, `the-tools-around-your-code`, `from-a-description-to-classes` |
| 4 | `reading-input`, `grids-and-references`, `looking-things-up-by-name`, `mixed-classes-and-objects`, `one-parent-many-children` |
| 5 | `mixed-first-programs`, `two-names-one-list`, `a-program-of-your-own`, `finding-things`, `how-we-got-here`, `mixed-starting-in-csharp`, `virtual-and-override`, `when-is-a-breaks` |
| 6 | `putting-things-in-order`, `critique-and-reflection`, `many-classes-one-promise` |
| 7 | `building-reusable-tools`, `objects-inside-objects` |
| 8 | `when-it-goes-wrong`, `from-cells-to-a-program`, `two-names-one-object`, `testing-what-a-class-does` |
| 9 | `mixed-programming`, `the-team-project`, `mixed-working-in-a-team`, `documenting-a-class` |
| 10 | `a-front-end-for-a-class`, `namespaces-and-libraries` |
| 11 | `your-world-playable` |
| 12 | `mixed-programming-with-objects` |
| 13 | `a-function-that-calls-itself`, `bits-that-flip`, `leaving-it-to-chance`, `the-game-of-life`, `many-languages-one-idea`, `a-polynomial-class`, `asking-a-list-a-question` |
| 14 | `three-doors`, `counting-darts`, `three-ways-to-make-change`, `a-chain-reads-a-book`, `a-deck-of-cards`, `when-a-queue-never-clears`, `a-model-that-corrects-itself` |

Batches 13 and 14 are the explore pages. Each could start earlier (its entry
says from which batch), whenever an author is free; they come last so that
they never hold up a course.

## Teacher notes

### Both courses

- **What the page is.** Every page has small C# programs that a learner can
  change and run. The code is compiled and run in the browser, on the
  learner's own device. Nothing is installed, and nothing the learner types
  is sent anywhere.
- **The first visit.** The first page with code downloads about 15 MB. The
  browser keeps a copy, but an update to the site can mean downloading it
  again. On a shared network, ask learners to open
  the site once before the first class. Check whether your lab's computers
  keep browser data from one session to the next. If they do not, saved work
  and the download both go at the end of every session.
- **Saved work** stays in the browser on that device. It does not follow a
  learner to another computer. A learner can download any program cell as a
  Visual Studio project and keep that.
- **Input.** `Console.ReadLine()` waits for the learner to type, as in a real
  console. In a browser that cannot do this (to be tested on your devices;
  Safari on an iPad is the one in doubt), the page asks for the answers before
  the program runs.
- **What the page cannot do:** read or write files, use the network, start
  threads, open a window (Windows Forms, WPF), stop at a breakpoint and run
  code one line at a time, complete a name as you type, or hold a solution
  with several projects. A page that needs any of these says so and sends the learner to
  Visual Studio, with steps.
- **No verdicts, no marks.** The page never says right or wrong and records
  nothing. "Compare with a solution" shows what the learner's code gives and
  what a solution gives, side by side.
- **Settings that differ from a new Visual Studio project.** The page uses
  top-level statements (no `class Program`), and has nullable reference types
  off. A project downloaded from the page has the same settings. A project a
  learner makes from Visual Studio's own template has nullable warnings on,
  and shows warnings (numbers in the CS86xx range) that the page did not.
  They are warnings, not errors.
- **Worlds.** A learner chooses the world on each page, and the task is the
  same size in each. You can suggest one for the class.

### PDP

- **Where the Visual Studio work is:** the debugger on `when-it-goes-wrong`,
  running a downloaded project on `from-cells-to-a-program`, the release on
  `a-program-of-your-own`, and the whole of `the-team-project`, which is built
  in Visual Studio with one file for each member of the team.
- **Submitting work.** Nothing on the page is submitted. Learners submit the
  way your college does: the downloaded Visual Studio project, zipped, with
  the evidence the descriptor asks for (the algorithm as pseudocode or a
  flowchart, test data and its results, screenshots). The team project is
  one Visual Studio project, with its change log.
- **The assessment.**
  - Skills demonstration 1 (30%: types, input and output, operators,
    selection, iteration, test data) fits after "First programs". The data
    dictionary it asks for is taught on `types-and-their-sizes`.
  - Skills demonstration 2 (40%, in teams: modules, parameters, return
    values, system functions, local and global variables) fits after
    "Methods, lists and algorithms", during "Working in a team".
  - The exam (30%: LO1, 3, 6, 7 and 8): `how-we-got-here` covers LO1 and
    LO3, and the extra `many-languages-one-idea` gives LO3 more room.
- **Words in the descriptor that C# answers differently.**
  - *Linker messages:* C# has no separate linking step that a learner runs.
    `compiler-errors` names the three messages a learner can meet when the
    parts of a program are joined (CS5001, CS0017, CS0246).
  - *Global variables:* C# has none in Python's sense.
    `writing-your-own-functions` shows the nearest (a variable at the top of
    the program that a method uses), and `building-reusable-tools` a field of
    a `static class`.
  - *Flowcharts:* the pages use pseudocode; the descriptor accepts either.
- **The classic `Main`.** PDP pages use top-level statements. The one
  `Main` a PDP learner sees is the small cell for rule 5 on
  `building-reusable-tools`. Visual Studio's Console App template has a box,
  "Do not use top-level statements"; leave it clear, to match the pages.

### FOOP

- **Where to start.** A learner who knows Python and not C# starts with
  "Starting in C#". A learner who took PDP in C# starts at "Classes and
  objects"; the first series's mixed set is a quick check.
- **The descriptor asks for an IDE, and for source code made in it.** The
  assessed programs are built in Visual Studio; the page is where learners
  practise. A cell downloads as a Visual Studio project to start from.
  Visual Studio parts: `the-tools-around-your-code` (completion, the
  debugger, several files, and the classic `Main`), `testing-what-a-class-does`
  (a test project), `documenting-a-class` (comments shown on hover),
  `namespaces-and-libraries` (a class library), `a-front-end-for-a-class`
  (a window, and publishing), `your-world-playable` (the whole solution).
- **Windows Forms needs Windows.** A learner with a Mac or a Chromebook at
  home can meet the front-end outcome with the console menu, which runs on
  the page, and build the window in class.
- **The assessment.**
  - Skills demonstration 1 (20%: one class, type conversions) fits after
    `objects-and-classes`, with `types-and-their-sizes`.
  - Skills demonstration 2 (20%: one class built in the IDE, selection,
    loops including `do`...`while`, comments) fits after
    `one-class-many-methods`, with `the-tools-around-your-code` and
    `reading-input`.
  - Skills demonstration 3 (30%: inheritance, a class library, a front end)
    fits after `your-world-playable`, which builds exactly that shape.
  - The exam (30%): Section A (LO3) draws on `objects-and-classes`,
    `keeping-details-inside-an-object`, `one-parent-many-children` and
    `many-classes-one-promise`; Section B (LO2) on `from-python-to-csharp`,
    `the-moves-you-already-know` and `reading-input`; Section C (LO8) on
    `from-python-to-csharp`, `objects-inside-objects` and
    `two-names-one-object`. PDP's `lists-and-sequences` and
    `looking-things-up-by-name` are there for a learner who wants more on
    LO8.
- **One world, all the way through.** A learner's class grows a version a
  page in the world they chose. In the "your own" world, the learner copies
  their class from the last cell of the page before.
- **`var`** appears from `the-moves-you-already-know` on. PDP pages never use
  it.

## Open questions

1. **The style guide counts FOOP's pages** ("`var` on FOOP's second page";
   "*instance*, before FOOP's third page"). FOOP now opens with "Starting in
   C#", which is shared with PDP and writes every type, so the map counts from
   `objects-and-classes`: `the-moves-you-already-know` teaches `var`. The
   style guide could name the lessons instead.
2. **Includes for types cells.** FOOP's class chain copies each version of a
   world's class onto the next page. Should `docs/LESSON_FORMAT.md` gain
   `{{include: <file>}}` for a types cell, so that each version lives once, as
   dewlab's `setup/oop/` files do? Until then, nothing catches a copy that
   has drifted from its source.
3. **Tests without `tests:` or `assert`.** The map has the page write a small
   `Check` method (PDP's `building-reusable-tools`, FOOP's
   `testing-what-a-class-does`). The other choices: `Debug.Assert`, if the page
   compiles with `DEBUG` defined (not known), or a test helper that the page
   provides. Whatever it is, a check that fails says what was expected and
   what came back, never "failed".
4. **Mixed sets in a course file.** The draft course files list each mixed
   set as the last lesson of its series. If the format gains a `mixed:` key,
   as dewlab's has, they move there.
5. **Lambdas in PDP.** Sorting by a key (`putting-things-in-order`) and two of
   the paradigms on `how-we-got-here` pass a method to a method. Show it once
   as code to read, or leave it all to the extra `asking-a-list-a-question`?
6. **Links to lessons not written yet.** The batch rules have a later batch
   add forward links. The checker could instead accept a `lesson:` link to
   any id that a course file lists, and show it as plain text until the
   lesson exists.
7. **Numbers that appear only in an answer fold.** Every number is run, but a
   fold's number may come from no cell on the page (the draft of
   `powers-in-csharp` raises it). A rule is needed: a probe cell in the
   lesson's notes, or a cell the page hides.
8. **Private fields.** `_fuel` (usual in .NET code) or `fuel`? The style
   guide names PascalCase and camelCase and says nothing about private
   fields. `keeping-details-inside-an-object` needs the answer.
9. **What the page shows for an exception** decides the prose on three pages
   (`reading-an-error-message`, `when-it-goes-wrong`,
   `the-tools-around-your-code`). .NET's own report lists the innermost call
   first, the reverse of a Python traceback.
10. **Two things the engine must answer for the extras.** A recursion that
    never stops is a stack overflow, which ends a .NET program and cannot be
    caught: what does the page do (`a-function-that-calls-itself`)? And does
    `Thread.Sleep` work on the page (an animated `the-game-of-life`)?
11. **The college's Visual Studio.** Which version, and do learners have
    Windows? Windows Forms needs it (`a-front-end-for-a-class`). Visual
    Studio Code with the C# extension runs everywhere, without Windows Forms.
12. **Where the compiler page sits.** The synthesis made compiling "Lesson
    1". The map puts `compiler-errors` fourth, after the reader has types to
    get wrong; `first-steps` meets one error and names compiling in a
    paragraph.
13. **FOOP's pair of worlds** is the game and the solar system (`DECISIONS.md`
    13). Josh may prefer the ocean to the solar system.
14. **Rule 5 and the classic `Main`.** Rule 5 ("`Main` stays in its cell")
    needs a cell with a `Main` on the first page with classes
    (`building-reusable-tools` in PDP, `objects-and-classes` in FOOP). The
    style guide shows the classic `Main` once, on a FOOP page. The map reads
    "once" as the template's form (`class Program` with `string[] args`), on
    `the-tools-around-your-code`, and lets rule 5's cell use a `Main` in a
    class with another name. Confirm, or move rule 5's cell to that page.
