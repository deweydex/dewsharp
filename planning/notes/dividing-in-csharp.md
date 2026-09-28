# dividing-in-csharp: notes for a reviewer

Ported from dewlab `tutorials/dividing-in-python/dividing-in-python.md`
(version 2026.09.26.1). It is a "closer look" page (dewlab DECISIONS_LOG
7.261). In dewsharp's PDP course it is fifth in "First programs", after
`compiler-errors` and before `types-and-their-sizes`
(`planning/COURSE_MAP.md`, entry 5). dewlab has no practice page for it,
and its glossary file has `entries: []`, so there is neither here. A closer
look keeps no worlds ("Lessons with no worlds").

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/dividing-in-csharp/dividing-in-csharp.md`, its
recorded outputs are `lessons/dividing-in-csharp/dividing-in-csharp.outputs.json`
(written by the browser checker), and this file was the draft's
`NOTES.md`. The `*.native.json` file was deleted: the browser checker's
outputs file replaces it. "What was done when it moved", just below, says
what changed in the move. The porter's notes follow it, with anything the
move made stale marked. "The porter's questions, and what was decided"
settles the open questions where the playbook, the course map, the style
guide or the exemplars answer them; the rest are under "Open".

Files:

- `dividing-in-csharp.md`: the lesson. Seven program cells, none meant to
  fail; three predicts (two `choice`, one `number`); one hint; one
  solution with an `inputs` block; two answer folds; one `python` fence to
  read. No challenge.
- `dividing-in-csharp.outputs.json`: what the browser checker recorded.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write dividing-in-csharp`
  ran the draft's five cells in the real engine. Every one printed what
  the native check printed, character for character: `3`, `3.5`; `-3.5`,
  `-3`; `-3 twos, and a remainder of -1`, `-7`; `-3`;
  `0.30000000000000004`, `0.3`. Negative numbers print with an ordinary
  hyphen-minus (U+002D) under `en-IE` in the browser too, so the porter's
  worry about U+2212 does not arise. The prose writes every printed
  number with the same character, as `first-steps-practice` does.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches the native check's.
  The results are at the end of this file, with three probes that ran only
  in the browser.
- **Every number in a fold or a solution note now comes from a cell on the
  page** (decision 29). The draft's folds quoted numbers that only the
  probes printed, so:
  - A new cell, `an-experiment-2`, sits under the experiment. It
    introduces `Math.Floor` in one sentence ("a method that rounds a
    `double` down to a whole number") and prints three lines, each with
    what `/` gives and then what rounding down gives: `3 and 3`,
    `-3 and -4`, `-4 and -4`. The question "Can you find a division where
    `/` gives the same answer as rounding down, and one where it does not?
    What decides which?" now comes after it, and invites the reader to
    change a line or copy one, as `powers-in-csharp`'s `an-experiment-2`
    does. The fold "what decides it" quotes those three lines. This also
    runs `Math.Floor`, which the draft named but did not run (the porter's
    question 6).
  - The clock's answer fold became a `solution` block with an `inputs`
    block (`earlier`) on `where-else-it-happens-2` (the clock; see "Cell
    ids" below), so "the cell prints 21" is recorded: the solution's
    output is `21`, and its value for `earlier` is `21` where the cell's is
    `-3`. This is the exemplar's shape for "Can you make this cell work?"
    (`powers-in-csharp`, `where-else-it-happens-1`; `objects-and-classes`,
    `the-rules-of-the-road-3`), and the page then offers "Compare with a
    solution". The solution fence sits after the question in the Markdown,
    as in `powers-in-csharp`; the page shows it under the cell.
  - The `decimal` fold asked the reader to change `0.1` to `0.1m` in the
    cell that has the 0.1 predict, and quoted `0.3` from a probe. A new
    cell, `where-else-it-happens-3`, prints `0.1 * 3` and `0.1m * 3` one
    under the other, and the prose asks "What do you think the second line
    prints?". The fold quotes its second line, `0.3`. This also settles
    the porter's worry about a second run with changed code on a cell with
    a predict: the reader no longer needs to edit that cell.
- **`1 / 2` is 0 and `1.0 / 2` is 0.5** are on the page now. The course
  map's entry names them ("`1 / 2` is 0 and `1.0 / 2` is 0.5"), and the
  draft left them out. They are the last two lines of the opening cell,
  `dividing-two-ways-1`, and the prose after it says "The last two lines
  divide 1 by 2 in the same two ways". The opening now asks "What do you
  think these lines print?" rather than "these two lines".
- **A `python` fence** shows `print(-7 // 2)` and `print(-7 % 2)` with
  `# -4` and `# 1`, as the course map's entry asks ("a `python` fence
  shows Python's -4 and 1 for readers who know it"). It sits in "Why idea
  B is easy to believe", where the draft already named Python's `//`. The
  numbers were checked with `python3` (it printed `-4`, `1`, and `-7` for
  `-7 // 2 * 2 + -7 % 2`). The checker does not run `python` fences; like
  `first-steps-practice`'s "Python, for one, gives 2", these are about
  another language, not about a C# cell.
- **The pair `/` and `%` no longer implies that only C#'s rule makes a
  pair.** The draft said "C#'s rule is the one that lets `/` and `%` work
  as a pair", but Python's `//` and `%` rebuild the number too (dewlab's
  page says so). The section now says "In C#, `/` and `%` still work as a
  pair, as on the first page" (`first-steps` says "`/` with whole numbers
  and `%` work as a pair"), and ends "Python's answers rebuild -7 too,
  with -4 and 1. Each language chose one rule for `/`, and its `%`
  follows it." That is the course map's point: C# keeps
  `(a / b) * b + a % b` equal to `a`, and the price is a remainder that
  can be negative.
- **Cell ids.** The 0.1 cell is `where-else-it-happens-1`, dewlab's id for
  the same task (playbook step 3 and checklist: "dewlab's where the task is
  the same"). The draft had given that id to the new clock cell and
  `where-else-it-happens-2` to the 0.1 cell. Now the clock is
  `where-else-it-happens-2`, although it comes first on the page, and the
  new `decimal` cell is `where-else-it-happens-3`. Numbers out of page
  order already exist (`storing-and-computing` has `your-turn-4` after
  `your-turn-2`, keeping dewlab's). The page has not been in front of a
  class, so this is the time to choose (see "Open").
- **Links.** The opening now links both pages it builds on:
  `[Your first C# program](lesson:first-steps#a-few-more-things-c-can-do)`,
  the section with the operator table and "`/` with whole numbers and `%`
  work as a pair", and `[Variables and types](lesson:storing-and-computing)`,
  by its short title, as the porter asked once the page existed. The clock
  solution's note links to
  `storing-and-computing#putting-it-together-a-small-program`, where the
  secret-messages task decodes with `+ 26`. "Later pages compare `double`
  values by asking whether they are close" named no page, and the course
  map gives that job to no later PDP page; it now says "A program that
  compares two `double` values asks whether they are close ... [The practice
  page for Variables and types](lesson:storing-and-computing-practice#11-point-one-plus-point-two)
  shows how": that problem shows `Math.Abs(a - b) < 1e-9`, and it links
  here. All four targets are in `lessons/`, and the anchors are the ones
  the page makes (checked in the browser).
- **Plain language.** "moves it up the number line, towards zero, and not
  down" became "moves the answer towards zero: -3 is nearer to zero than
  -3.5 is. Rounding down would move it the other way, away from zero, to
  -4." "Try a few in the cell" became the invitation under
  `an-experiment-2`. "What time was it 5 hours ago?" became "5 hours
  earlier", to match the variable `earlier`.
- **Frontmatter.** `covers: [PDP-LO4]`, from the course map's entry (the
  style guide's checklist asks each page to name its outcomes; dewlab's
  page has none). `version:` is `2026.09.28.1`: two cells are new, one
  cell gained two lines, and a solution and inputs were added.
- **Visual Studio.** One line before "Where to read more": everything on
  the page runs in the browser, and nothing needs Visual Studio
  (`#the-ide`; the style guide's checklist; the same line as
  `powers-in-csharp`).
- **Where to read more** keeps one source, as the course map says a closer
  look does ("it ends with one thing to read") and as `powers-in-csharp`
  does: Microsoft, *Arithmetic operators (C# reference)*, in
  `first-steps`'s form. It returned HTTP 200 on 28 September 2026, and it
  has the parts the description names: "Integer division" (the answer
  "rounded toward zero"), "Integer remainder" (the sign matches the left
  operand), "Round-off errors" (`3 * 0.1 == 0.3` is False, and `1 / 3.0m`
  times 3 is not 1) and "Arithmetic overflow and division by zero". The
  description quotes "rounded toward zero" and says it is idea A in other
  words, so a reader who follows the link meets Microsoft's words already
  explained. The Floating-Point Guide and its C# page went; the Microsoft
  page covers 0.1 and `decimal` too.
- **The page was looked at** in headless Chromium on the real page
  (`npm run serve -- --isolate`, `/lesson.html?sw=off&id=dividing-in-csharp`),
  at 900 and 390 pixels wide: seven cells, each labelled PROGRAM with
  `Program.cs`; the first predict shows the options `-3`, `-4` and
  `-3.5` as options, not as a nested list; KaTeX typesets
  `-3 \times 2 + (-1) = -7`; the hint on the clock is hidden after one
  Run and appears after the second; "Compare with a solution" fills one
  row, `earlier`, with `-3` and `21`, marked *different*; the two folds,
  the hint and the solution open with their text; the `python` fence is
  labelled; "Learning outcomes this page covers: PDP-LO4."; no sideways
  scroll at 390 pixels, and no console errors.
- **Not done here: `courses/pdp.yaml`** still has
  `dividing-in-csharp: "Dividing: a closer look at /, % and 0.1"` under
  `planned:`. The playbook's checklist says to delete it when the lesson
  moves; this round's instructions leave the course files to the
  orchestrator. Also not done, because it is another page:
  `first-steps-practice` names this page in italics ("A later page,
  *Dividing*, looks closely at `/` and `%`", in problem 4's solution note),
  under decision 32. Now that the page exists, that can become a link.

## What changed from dewlab, and why (the porter's notes)

**The answer to the experiment is the other idea.** Python's page asks
whether `//` removes the decimal part (idea A) or rounds down (idea B), and
Python rounds down: `-7 // 2` is -4. C# has no `//`. Its `/` with two `int`
values removes the decimal part, which moves a negative answer towards zero:
`-7 / 2` is -3. So the same two ideas and the same experiment now end with
idea A. The section "Why idea A feels right" became "Why idea B is easy to
believe". That also removes *right*, one of the style guide's verdict
words; the powers page made the same change.

**A new opening cell, `dividing-two-ways-1`.** It prints `7 / 2` (3) and
`7.0 / 2` (3.5), and since the move `1 / 2` (0) and `1.0 / 2` (0.5). In
C#, `/` does two kinds of dividing and the types decide which. The two
ideas make no sense until the reader has seen that, and the dewsharp style
guide asks a page to open by running something. The two ideas use 7 and 2,
which the cell has just printed, rather than dewlab's 17 and 5 from
`first-steps`. *(Stale: the draft's opening linked only to
`storing-and-computing`; it now links `first-steps` too, see above.)*

**The experiment's predict became a choice.** dewlab used `type: number`.
dewlab's closer-look template (`docs/templates/where-the-total-starts.md`)
asks for a predict that names the idea behind each option, and the page
states both ideas' answers just above the cell, so the choice is between
them. A third option, -3.5, catches the reader who expects C# to keep the
decimal part; its note asks whether -7 and 2 are `int` or `double`.

**"Why idea B is easy to believe"** keeps dewlab's first paragraph
(positive numbers hide the difference). It adds that some tools do round
down (a spreadsheet's `INT`, Python's `//`) and that C# does when asked,
with `Math.Floor`. *(Stale: `Math.Floor` is now introduced and run in
`an-experiment-2`, and Python's two answers are in a `python` fence.)*

**The pair `/` and `%` now has a cell** (`why-idea-b-is-easy-to-believe-1`).
dewlab stated `-7 // 2` is -4 and `-7 % 2` is 1 in prose only. Here the
numbers come from a cell, because every number in the prose must be run.
The point is reversed: Python's remainder is never negative when you divide
by a positive number; C#'s has the sign of the number being divided, so
`-7 % 2` is -1. The page defines *sign* where it first uses it.

**"Where else it happens" gains a clock** (with a number predict, a hint
and, since the move, a solution and inputs). A negative remainder is the
practical cost of C#'s rule: `% 24` no longer keeps an hour from 0 to 23
when the hour goes below 0. `(2 - 5) % 24` is -3, and adding 24 before the
`%` gives 21. The note says the same fix (adding 26) serves a Caesar shift
that moves a letter backwards. The page has three predicts, the most the
style guide allows. *(Stale: the clock's id is now
`where-else-it-happens-2`, see "Cell ids" above.)*

**The 0.1 surprise is kept** (`where-else-it-happens-1`, dewlab's cell and
choice predict), with *binary* defined and "floats" changed to "`double`
values". C# prints `0.30000000000000004` exactly as Python does.

**New: `decimal`.** One paragraph, a cell (since the move) and one fold. C#
has a type that stores 0.1 exactly, made for money, and C# learners in PDP
meet prices early. The course map's entry asks for it.

**Where to read more.** dewlab linked the Python tutorial's page on floating
point. That page's examples are Python. *(Stale: the draft linked
Microsoft's page and The Floating-Point Guide; the page now keeps
Microsoft's page only, see above.)*

## What C# made different, in short

- No `//`. One operator, `/`, does whole-number and decimal division, and
  the types of the two numbers choose. `7 / 2` is 3; `7.0 / 2` is 3.5;
  `1 / 2` is 0.
- Whole-number division removes the decimal part (towards zero), where
  Python rounds down. So the page's experiment comes out the other way.
- `%` can give a negative remainder. That breaks the "start again" use of
  `%` for numbers below 0, which Python never shows.
- `double` prints `0.30000000000000004` exactly as Python's `float` does.
- C# has `decimal`, which Python has only as a library module.
- Negative numbers print with an ordinary hyphen-minus (`-3`) under
  `en-IE`, natively and in the browser. The prose uses the same character.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| 3 and 3.5 (opening; ideas A and B for 7 and 2), 0 and 0.5 (`1 / 2`, `1.0 / 2`) | cell `dividing-two-ways-1`: `3`, `3.5`, `0`, `0.5` |
| -3.5 and -3 (experiment) | cell `an-experiment-1`: `-3.5`, `-3` |
| idea B gives -4 for -3.5; "rounding down would move it ... to -4" | cell `an-experiment-2`, second line `-3 and -4` |
| 3 and 3, -3 and -4, -4 and -4 (fold "what decides it") | cell `an-experiment-2` |
| -4 and 1 (Python), and "Python's answers rebuild -7 too" | the `python` fence, checked with `python3` (`-4`, `1`, `-7`); not a C# cell |
| -3, -1 and -7 (the `/` and `%` pair) | cell `why-idea-b-is-easy-to-believe-1` |
| a remainder is negative or 0 when the number divided is negative (no number quoted) | probe `remainder-sign`: `-1`, `0`, `-1`, `1` |
| -3 (the clock) | cell `where-else-it-happens-2` |
| 21 (the clock, fixed) | the solution of `where-else-it-happens-2`: output `21`, value of `earlier` `21` |
| "works when `hoursBack` is 24 or less" | probes `clock-fix-range` (no differences for 0 to 24) and `clock-thirty` (30 hours back gives -4) |
| adding 26 fixes a Caesar shift backwards past A | `storing-and-computing`, `your-turn-4--secret-messages`, solution "for A"; probe `caesar-back` |
| 0.30000000000000004 and 0.3 | cell `where-else-it-happens-1` |
| 0.3 for `0.1m * 3` (decimal fold) | cell `where-else-it-happens-3`, second line |
| "when either number is a `double`" (no number quoted) | probes `fold-numbers` (`7 / 2.0` is 3.5) and `either-number` |
| a spreadsheet's `INT` rounds down | not program output: carried over from dewlab, as `powers-in-csharp` kept `=2^3` |
| 2 o'clock, 5 hours, 24 hours, 21:00 and 9 in the evening, 26 letters, 0.333… | the set-up of the task, or arithmetic in the prose |

## The porter's questions, and what was decided

From "Once the course map or the page UI exist":

- **The storing-and-computing port needs this page's fix.** Done by that
  page: `your-turn-4--secret-messages` decodes with `+ 26`, its solution
  note says why, and it links here ("[Dividing](lesson:dividing-in-csharp)
  looks at `%` and numbers below 0"). This page's clock solution now points
  back to that task.
- **Links in.** `storing-and-computing` links here twice (after
  `type-conversion-4`, and in the note above), and its practice page links
  here from the 0.1 + 0.2 predict (problem 11), as the porter hoped.
  `first-steps` does not link here; `first-steps-practice` names the page
  in italics, which can now become a link (see "Not done here" above).
- **The opening link text.** Decided: "Variables and types", the short
  title of `storing-and-computing` (decision 32's form of a page's name).
- **Course map placement.** Done by the map: fifth in PDP's "First
  programs", after `compiler-errors`, and listed so in `courses/pdp.yaml`.
- **Predict options that start with a minus sign.** Checked: the parser
  gives the options `-3`, `-4` and `-3.5`, with their notes, and the page
  shows three options, not a nested list.
- **`hint` with `after: 2 runs`.** Checked in the browser: the page counts
  every Run, the one that settles the guess included, so the hint is
  hidden after the first Run and appears after the second, which is one
  attempt at the change. That is what the porter intended.
- **The decimal fold asks the reader to edit a cell that has a predict.**
  No longer arises: `decimal` has its own cell, `where-else-it-happens-3`.
- **KaTeX.** Checked: `$-3 \times 2 + (-1) = -7$` is typeset.
- **The browser's number format.** Settled by `outputs.json`: hyphen-minus,
  as the native check printed.

From "Open questions for a reviewer":

1. **Keep `decimal`?** Decided by the course map: the entry says "The 0.1
   section stays ... and adds `decimal`: `0.1m * 3` is 0.3." It stays, now
   with a cell of its own. `storing-and-computing-practice` ("Counting in
   cents") has already named `decimal`, so it is not new to every reader.
2. **Division by zero.** Decided by the course map: not on this page. The
   map puts `DivideByZeroException` and `60.0 / 0` printing ∞ on
   `reading-an-error-message` (*Exceptions*: "`DivideByZeroException`,
   which only whole numbers raise (`60.0 / 0` prints ∞, a predict)") and
   whole-number division by zero in `Mean` on `building-reusable-tools`,
   and this page's entry does not list it. The one thing to read says that
   Microsoft's page covers it. The browser probes are below for those
   pages' authors: `7 / 0` is CS0020 at (1,19), *Division by constant
   zero*; `7 / zero` stops with `System.DivideByZeroException`; `7.0 / 0`
   prints `∞`.
3. **A challenge at the end?** Decided: no. The course map's "Closer looks"
   says a closer look "has no worlds and no practice page ... and it ends
   with one thing to read", as `powers-in-csharp` does.
4. **The word for idea A.** Open (below).
5. **The clock or the Caesar shift?** Decided: the clock stays, and the
   Caesar shift is pointed to. The course map's entry names the Caesar
   shift as the reason the negative remainder matters ("which is why the
   Caesar shift going backwards needed a fix"), and
   `storing-and-computing` now shows that fix, but only in its
   secret-messages world. The clock needs only `int`, and every reader has
   met it: `first-steps` says "a clock starts again at 0 after 23 because
   of a remainder", and its challenge makes the hours start again with one
   operator. So the page teaches with the clock, and the clock solution's
   note links back to the secret-messages task, which "had the same
   problem ... Adding 26 solved it in the same way."
6. **Spreadsheet and Python claims.** Decided: keep both. The Python
   answers are now in the `python` fence the course map's entry asks for,
   checked with `python3`. The spreadsheet's `INT` is kept as
   `powers-in-csharp` kept "In a spreadsheet, `=2^3` gives 8": carried
   over from dewlab, and not program output. `Math.Floor` is now run, in
   `an-experiment-2`.

## Open

For Josh:

1. **The word for idea A.** The page describes it ("removes the part after
   the decimal point") and never names it. Two names are near: Microsoft's
   "rounded toward zero", which "Where to read more" now quotes and ties
   to idea A, and *truncating*, which `storing-and-computing-practice`
   (problem 7, "Cutting, or rounding") defines for a cast: "A cast to
   `int` removes the part after the decimal point, which moves the number
   towards zero. That is called *truncating*." Neither the course map nor
   the style guide says whether a closer look names its idea. If it should,
   one sentence after the experiment would do it: "Removing the part after
   the point is called *truncating*." It changes no cell.
2. **Two predicts can be counted the other way from what they ask**
   (decision 37). `an-experiment-1` asks "What will the last line print?",
   but the option `-3.5` equals the first line, so the page counts it as
   the same: it shows the option's note but does not ask "Which line
   explains what you saw?" (the same as `powers-in-csharp`'s open item 2).
   And `where-else-it-happens-1` asks "Will the two lines be the same?"
   with the options *Yes* and *No*, which can never equal a line of the
   output, so every guess counts as different, *No* included, and the page
   asks "Which line explains what you saw?" after either. Nothing on these
   cells waits for `after: guess differed`, so nothing else is lost. Both
   predicts are dewlab's, and a fix belongs in the page (a way for a
   predict to name the line it asks about, or to say that it is a yes/no
   question), not in this lesson.
3. **The page has seven cells; the course map's entry says three or four.**
   Each new cell follows a rule: `an-experiment-2` and
   `where-else-it-happens-3` hold numbers their folds quote (decision 29),
   the clock (`where-else-it-happens-2`) and
   `why-idea-b-is-easy-to-believe-1` are the porter's, and the opening
   cell holds the `1 / 2` the entry names. It is still an S page (under
   eight cells). If it should be shorter, `an-experiment-2` is the cell to
   cut; then its fold must lose its `Math.Floor` numbers, and "the whole
   number just below -3.5 is -4" is again unrun.
4. **Cell ids out of page order.** The clock, first in "Where else it
   happens", is `where-else-it-happens-2`, because the 0.1 cell below it
   keeps dewlab's `where-else-it-happens-1`. If page order matters more
   than matching dewlab, swap the two ids now, before a class has used the
   page. After that, the ids are a contract.

## Probe cells

Run with the NativeCheck command, passing this file, or in the browser by
copying them into a scratch lesson (`node tools/check-lessons.mjs
--lessons <scratch>/lessons --write`). The `expect:` cells fail on purpose.

```csharp exec
id: fold-numbers
Console.WriteLine(7 / 2);
Console.WriteLine(-7 / 2);
Console.WriteLine(-8 / 2);
Console.WriteLine(Math.Floor(-7.0 / 2));
Console.WriteLine(Math.Floor(7.0 / 2));
Console.WriteLine(7 / 2.0);
```

```csharp exec
id: remainder-sign
Console.WriteLine(-7 % 2);
Console.WriteLine(-8 % 2);
Console.WriteLine(-9 % 4);
Console.WriteLine(7 % 2);
```

```csharp exec
id: clock-fix
int hour = 2;
int hoursBack = 5;
int earlier = (hour - hoursBack + 24) % 24;
Console.WriteLine(earlier);
```

```csharp exec
id: clock-fix-range
// For every hour from 0 to 23 and every hoursBack from 0 to 24, compare
// the fix with a remainder that never goes below 0.
int differences = 0;
for (int hour = 0; hour <= 23; hour++)
{
    for (int hoursBack = 0; hoursBack <= 24; hoursBack++)
    {
        int fixedHour = (hour - hoursBack + 24) % 24;
        int alwaysPositive = ((hour - hoursBack) % 24 + 24) % 24;
        if (fixedHour != alwaysPositive || fixedHour < 0)
        {
            differences++;
        }
    }
}
Console.WriteLine($"differences: {differences}");
Console.WriteLine((0 - 25 + 24) % 24);
```

```csharp exec
id: caesar-back
int position = 0;
int shift = -3;
Console.WriteLine((position + shift) % 26);
Console.WriteLine((char)('A' + (position + shift) % 26));
Console.WriteLine((char)('A' + (position + shift + 26) % 26));
```

```csharp exec
id: decimal-fold
Console.WriteLine(0.1m * 3);
Console.WriteLine(0.3);
```

```csharp exec
id: zero-constant
expect: CS0020
Console.WriteLine(7 / 0);
```

```csharp exec
id: zero-variable
expect: exception
int zero = 0;
Console.WriteLine(7 / zero);
```

```csharp exec
id: zero-double
Console.WriteLine(7.0 / 0);
```

Added when the page moved, run only in the browser:

```csharp exec
id: either-number
Console.WriteLine(7 / 2.0);
Console.WriteLine(1 / 2.0);
```

```csharp exec
id: clock-thirty
int hour = 2;
int hoursBack = 30;
Console.WriteLine((hour - hoursBack + 24) % 24);
Console.WriteLine(((hour - hoursBack) % 24 + 24) % 24);
```

```csharp exec
id: seven-over-minus-two
Console.WriteLine($"{7 / -2} and {Math.Floor(7.0 / -2)}");
```

Browser results (28 September 2026), the same as the native check's where
both ran: `fold-numbers` 3, -3, -4, -4, 3, 3.5; `remainder-sign` -1, 0,
-1, 1; `clock-fix` 21; `clock-fix-range` `differences: 0`, then -1 (25
hours back is past the fix's range); `caesar-back` -3, `>`, X;
`decimal-fold` 0.3, 0.3; `zero-constant` CS0020 at (1,19), *Division by
constant zero*; `zero-variable` stops with `System.DivideByZeroException`;
`zero-double` ∞; `either-number` 3.5, 0.5; `clock-thirty` -4, 20;
`seven-over-minus-two` `-3 and -4` (it is the answer's sign that matters,
not the first number's, as the fold says).
