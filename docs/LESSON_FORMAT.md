# Writing a lesson

A lesson is one Markdown file. The page renders it in the browser, and C#
fences tagged `exec` become cells a learner can edit and run. The format is
dewlab's (`docs/WRITING_TUTORIALS.md` in dewlab), with C# in place of Python.
Someone who has written a dewlab tutorial should find nothing surprising
here, except for the few differences listed at the end.

This file is the contract between lessons, the page (`web/`) and the lesson
checker (`tools/check-lessons.mjs`). There is one parser,
`web/lesson/parse.js`, and it is used by both the page and the checker. If
something is not described here, it is not part of the format.
`docs/PARSER.md` describes what the parser returns and every error it
reports.

## Files and addresses

```
courses/pdp.yaml                     a course: its series and their lessons
courses/foop.yaml
lessons/<id>/<id>.md                 a lesson (a tutorial)
lessons/<id>/<id>-practice.md        its practice page, if it has one
lessons/<id>/<id>.outputs.json       what every cell printed; written by the checker
lessons/<id>/<id>-practice.outputs.json   the same, for the practice page
lessons/<id>/<picture>.svg           anything else the lesson shows
```

`<id>` is small letters, digits and hyphens. It is the lesson's address,
`lesson.html?id=<id>`; a practice page is `lesson.html?id=<id>-practice`.
Never rename one after a class has used it (see "Cell ids").

## Courses

```yaml
title: Fundamentals of Object-Oriented Programming
code: 5N0541 · QQI Level 5
card: >-
  One or two sentences for the course's card on the home page.
description: >-
  A paragraph or two for the top of the course page.
contents:
- title: Programming with objects
  lessons:
  - objects-and-classes
  - the-moves-you-already-know
explore:
- a-lesson-from-another-module
planned:
  the-moves-you-already-know: "Inside a method: sequence, selection and iteration in a class"
```

`contents` is the reading order. `explore` lists extra lessons: things worth
doing that are not part of the module's outcomes, often brought in from
another dewlab module. A lesson that no course lists is a draft. It still
builds and it can be reached by its address, but nothing links to it.

`planned` gives the title of each listed lesson that is not in `lessons/`
yet, taken from `planning/COURSE_MAP.md`. The course page shows it in its
place, without a link, as *not written yet*, so a reader and a teacher see
the whole course. A course may list only lessons that exist or that
`planned` names; the site build and the checker refuse anything else, which
catches a mistyped id. When a lesson moves into `lessons/`, its own title
takes over, and its `planned` line can go.

## Frontmatter

```yaml
---
title: "Objects and classes: a blueprint and the things made from it"
version: 2026.09.27.1
from: objects-and-classes
worlds:
  game: A game world with heroes, monsters and treasure.
  ocean: An ocean expedition. The numbers are made up.
covers: [FOOP-LO1, FOOP-LO2]
---
```

- `title`: the term a student would search for, a colon, and what the page
  does with it. Use sentence case.
- `version`: a dated version, `YYYY.MM.DD.n`. Bump it when you change what a
  cell does.
- `from`: optional. The id of the dewlab tutorial this lesson translates,
  for traceability.
- `worlds`: optional. The same as dewlab: see "Worlds".
- `covers`: optional. The outcomes the lesson covers, as in dewlab's
  `planning/curriculum/outcomes.yaml`.
- `practice_for: <id>`: on a practice page, the lesson it belongs to.

## Cells students can run

````markdown
```csharp exec
id: a-first-program-1
Console.WriteLine("Hello!");
```
````

The header lines come first, as `key: value`. The code starts at the first
line that is not a header. The headers are:

| Header | Meaning |
|---|---|
| `id:` | Required. Small letters and hyphens, unique in the file. Usually `<section-slug>-<n>`. |
| `hint:` | One line, shown behind a small **?** on the cell. |
| `file:` | The name the cell's code has as a file, such as `Planet.cs`. It is used in labels, error messages and downloads. The default is `Program.cs` for a program cell, and the first type's name plus `.cs` for a types cell. |
| `expect:` | The cell is meant to go wrong, and the prose says so. `expect: CS0103` means it must fail to compile with that error. `expect: exception` means it must compile and then stop with an exception. The checker fails the build if the cell does anything else. |
| `stdin:` | For the checker only: what to type into the program, as a JSON string, for example `stdin: "Ada\n21\n"`. The learner types their own answers; nothing is typed in for them. Without `stdin:`, the checker gives the program no input, so `Console.ReadLine()` returns `null`. |

### Cell kinds, and how cells share code

The page works out each cell's kind from its code and shows it as a label.
Authors never write the kind.

- A **program cell** has statements, or a `static void Main`. It has a
  **Run** button, which becomes **Stop** while the program runs.
- A **types cell** has only declarations: classes, records, interfaces,
  enums, structs and namespaces, with any `using` lines. It has a **Check**
  button, which compiles it and reports errors without running anything.

When a program cell runs, the page builds one ordinary C# program from:

1. every type declared in any cell **above** it that is on show (the shared
   cells, plus the cells in the reader's chosen world), in page order, except
   a class that contains a `Main` method;
2. the cell itself, whose statements are the program's top-level statements
   (or whose `Main` is the entry point).

Statements in the cells above never run. A type declared again lower down
replaces the earlier one, for this cell and the cells below it. This is the
**rules of the road** in `CLAUDE.md`, and every lesson must agree with it:

- An early lesson's cells should each work on their own, because nothing
  carries between them. Repeat the line that makes the list or the variable;
  don't refer to a variable that a cell above made.
- Once a lesson has classes, put each class in a types cell and use it from
  the program cells below.
- Never name a class `Program`. The top-level statements already make one.

### Compiler settings

The page and the exported Visual Studio project use the same settings:

- C# 14 on .NET 10;
- the implicit `using` lines of `dotnet new console` (`System`,
  `System.Collections.Generic`, `System.IO`, `System.Linq`, `System.Net.Http`,
  `System.Threading`, `System.Threading.Tasks`);
- nullable reference types **off**;
- warnings shown, in a quieter style than errors;
- the `en-IE` culture, so `12.5.ToString("C")` is `€12.50` and dates are
  day/month.

`Console.ReadLine()` waits for the learner to type, as it does in a real
console. `Console.Clear()`, `Console.ForegroundColor`,
`Console.BackgroundColor`, `Console.ResetColor()` and `Console.ReadKey()`
work on the page. `ReadKey` takes the first character of a line the learner
types. Files, networking, threads you start yourself, and windows (WinForms,
WPF) do not work on the page. A lesson that needs them says so, and sends
the learner to Visual Studio.

## Blocks attached to a cell

A block is a fence that belongs to the cell above it. With a `for: <cell id>`
header, it belongs to that cell instead. These are the same blocks as in
dewlab.

### hint

Hidden until the reader has tried. The first hint asks a question.

````markdown
```hint
after: 2 errors
What does the first error message name? Which line is it on?
```
````

`after:` is `N errors` (runs that did not compile or that stopped with an
exception), `N runs`, `unsure` (the reader chose "I'm not sure yet" in a
predict block), or `guess differed`. The default is `after: 1 errors`.
On a task whose starter code already runs without an error, that may never
come: give its hints `after: 2 runs`, `unsure` or `guess differed`.
`title:` is optional.

### predict

A guess, written down before the cell runs. The page shows it above its
cell.

````markdown
```predict
type: choice

What will the last line print?

- 12
  - The loop adds each day's spending to the total.
- 4
- Nothing: it stops with an error
```
````

`type:` is `choice`, `number` or `text`. For `number`, `tolerance:` says how
close counts as the same. A question that names a line (*the first line*,
*the second line*, up to *the fifth line*, or *the last line*) is compared
with that line of the output alone; `line:` (`first`, `last` or a number)
names the line when the question doesn't, or overrides it. The checker
fails a page whose output doesn't have the line. No option is marked right. Each option can have a
note: an indented bullet under it. The reader also says how sure they are:
*sure*, *a hunch*, or *I'm not sure yet*. After the run, the page shows the
guess and the output side by side. When they differ, it says nothing about
it. It shows the chosen option's note and asks "Which line explains what you
saw?"

### solution and inputs

```` markdown
```solution
title: with what you've met so far
int Total(List<int> values)
{
    int total = 0;
    foreach (int value in values) total += value;
    return total;
}
---
Notes in Markdown after the `---` line.
```

```inputs
Total(new List<int> { 4, 8, 15 })
Total(new List<int>())        // an empty list
```
````

A `solution` holds C# that replaces the cell's code. An `inputs` block has
one C# expression on each line, with an optional `// note`. Each expression
is evaluated after the cell's own statements, in the same scope, so it can
call a local function or use a variable the cell made. **Compare with a
solution** runs the reader's cell and then the solution with the same
inputs. It fills in a table:

| Input | What your code gave | What a solution gives |
|---|---|---|

Values show as C# would write them: `"text"` in quotes, `[1, 2, 3]` for a
list or an array, `true`, `12.5`. An exception shows as its name. Rows that
differ are highlighted in a colour that means "different", not "wrong". There
are no ticks and no scores.

The checker runs every solution against its inputs, in every world. A
solution that fails to compile, or throws on an input that is not marked
`// throws`, fails the build.

### challenge

````markdown
```csharp challenge
// A running total that never goes below zero.
int[] changes = { 5, -3, -4, 6, -10, 2 };
```
````

Starter code for a page's closing challenge. It is read-only, with a button
that opens it in the learner's own notebook (`notebook.html`) as a new
notebook. There it has no cells above it, so it must compile on its own:
the checker compiles it that way (it doesn't run it) and fails the build if
it doesn't compile.

## Worlds

The syntax is dewlab's:

````markdown
<div class="dl-world" data-world="game">

The hero has 10 health...

```csharp exec
id: your-turn-1--game
...
```

</div>
````

The frontmatter lists the worlds. A cell inside a variant ends its id with
`--<world>`. Blocks stay inside their cell's variant. Variants with nothing
but blank lines between them are one task, shown once per world. The reader
picks a world under the title, and the page remembers the choice.
The checker runs each world separately. For each world, "cells above" means
the shared cells plus that world's cells.

## Everything else

- **Code to read, not run:** a fence without `exec`. `csharp`, `python`
  (for a side-by-side with the Python a learner already knows), `console`
  (what a terminal shows) and `text`.
- **Folds:** `<details class="dl-answer"><summary>answer</summary> …
  </details>` for an answer, `dl-hint` for a hint in prose, and `dl-why` for
  "Why this way?". The line in an answer fold is *Here is one answer. Yours
  may be different and work too.*
- **Maths:** `$…$` inline and `$$…$$` on its own line, rendered with KaTeX.
- **Links:** `[text](lesson:<id>)` goes to another lesson, and the page must
  exist in `lessons/`: the site build and the checker refuse a link that
  goes nowhere. Name a page that isn't written yet by its short title, in
  italics, without a link (`DECISIONS.md` #32). A link to a dewlab page is
  its full address.
- **Pictures:** files beside the lesson, as `![what it shows](picture.svg)`.
  Always write the description.
- `~~struck out~~`, tables, and `- [ ]` task lists work as in dewlab.

## Cell ids

The saved record for a cell is keyed by `<page id>/<cell id>`. Keep an id when
you edit a cell. Choose a new id only when the cell becomes a different task.

## Different from dewlab, on purpose

- **Nothing carries between cells except types.** In dewlab, the cells on a
  page share their variables. Here, each Run is a new program (see "Cell
  kinds").
- **There is no `inputs` guess column and no `tests:` cell yet.** A lesson on
  testing writes its checks in an ordinary program cell.
- **There are no toolkit, dataset, widget or chart cells.** A dewlab lesson
  that depends on them is rewritten around console output, or left out, and
  `planning/COURSE_MAP.md` says which.
- **There is no glossary panel yet.** Define every term in the prose, where
  it first appears.
