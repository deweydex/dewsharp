# from-python-to-csharp: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (FOOP
lesson 1, the first page of "Starting in C#"). The entry names five dewlab
sources: `the-moves-you-already-know` (its four moves),
`many-languages-one-idea` (Dewey Track), `storing-and-computing`,
`repeating-yourself` and `writing-your-own-functions`. No page comes before
it in its series; it depends on `first-steps` only.

Files:

- `lessons/from-python-to-csharp/from-python-to-csharp.md`: the lesson,
  version 2026.09.28.1. 13 program cells (the course map's size M), 2 of
  them meant not to compile (`expect: CS0029`, `expect: CS0103`). 3
  predicts, 4 solutions, 3 hints, 2 `inputs` blocks, 1 challenge, 10
  Python fences to read beside the cells, 3 tables. No worlds (the course
  map's "Lessons with no worlds"). No classes, no `var`.
- `lessons/from-python-to-csharp/from-python-to-csharp-practice.md`: 12
  problems, 12 program cells, version 2026.09.28.3 (bumped twice when two
  of its cells changed after they were first recorded). 5 cells are meant
  not to compile and 1 to stop with an exception. 4 predicts, 10
  solutions, 3 hints, 2 `inputs` blocks, 8 folds, 3 Python fences.
  Problems 9 and 10 are
  "From earlier" (`first-steps`).
- The two `.outputs.json` files, written by the browser checker.

`npm run check-lessons -- from-python-to-csharp` reports no problems (39
runs: 20 on the lesson, 19 on the practice page). I also opened both pages
in headless Chromium (`lesson.html?sw=off&id=…`): every heading and table
renders (the `\|\|` in the last table shows as `||`), and there were no
page errors or console errors.

## What the page does, in order

1. **Opening.** A Python program shares 90 mm of rain between 4 days and
   prints 22.5; the C# twin, `double perDay = totalMm / days;` with two
   `int` values, prints `Rain per day: 22 mm` (a predict). The bullets
   under it name types, statements and semicolons, `Console.WriteLine`
   and `$"..."`, and camelCase. Then why 22 (C# divides the two `int`
   values first), and a solution that changes one word and prints 22.5.
   Who the page is for, and that a PDP-in-C# reader can start at
   `objects-and-classes`. The four moves (storing, sequence, selection,
   iteration) from dewlab's `the-moves-you-already-know`, as the spine of
   the page.
2. **How this page works.** Cells, Run and Ctrl+Enter, nothing installed.
   Each Run starts a new program (rule 1, without the word "rule"), set
   against Python notebooks, whose cells share variables. The three
   outcomes in the style guide's words. Reset.
3. **Storing: a value and its type.** Five declared variables and a table
   of Python types beside C#'s (`char` is new). `7 / 2`, `7.0 / 2`, `%`,
   `Math.Pow`. Then `days = "seven";`: Python allows it, C# does not
   compile it (CS0029, a predict on whether line 2 prints). The style
   guide's paragraph names compiling, and the five parts of the message
   are read as `first-steps` reads them. Link to `compiler-errors`.
4. **Selection: a decision.** `if`/`elif`/`else` beside
   `if`/`else if`/`else`: brackets round the condition, curly brackets
   for a block, indenting only for people, `&&`, `||`, `!`. Then an `if`
   with no curly brackets and two indented lines (a predict on the first
   line of output), and a solution with curly brackets.
5. **Iteration: a loop over a list.** dewlab's week of rain from
   `many-languages-one-idea`: `foreach` over a `double[]` for the average;
   a `for` loop with three parts beside `range(len(...))`, with a link to
   the `range` table on `repeating-yourself`. `35` and `5`, `0` and `7`,
   where Python prints `35.0`, `5.0`, `0.0` and `7.0`. Your turn: count
   the days above the average (a starter that runs, `inputs`, a hint, a
   solution).
6. **A method.** Two Python functions beside two `static` local methods:
   return types, `void`, parameter types, parameter and argument,
   `static`, PascalCase, `:F2`. An invitation to swap the arguments and
   see. Your turn: `Average` as a method (`expect: CS0103` until it is
   written, decision 27), with `NaN` for an empty array.
7. **An array, a list or a dictionary.** `double[]`, `List<double>` and
   `Dictionary<string, int>` beside Python's list and dict; printing a
   list prints its type's name; `string.Join`; `ContainsKey` for `in`;
   `new()`; a table of when to choose each (FOOP-LO8).
8. **The changes in one table**: a phrasebook, Python beside C#.
9. **Looking back**, a challenge (a word count with a dictionary), the
   Visual Studio sentence, what comes next, **Where to read more**.

## What I decided, and why

1. **`from: many-languages-one-idea`.** The page's shape is that page's:
   one small job in two languages, compared line by line, and its week of
   rain (4.2 to 7.0 mm, average 5) is the running example. The four moves
   of `the-moves-you-already-know` give the sections their order, but
   that dewlab page is already the `from:` of dewsharp's own
   `the-moves-you-already-know`. The practice page has
   `from: many-languages-one-idea-practice`, whose `countOver` problem
   became problem 6.
2. **One theme: a week of weather.** Every cell on the lesson is about
   rain, so the page reads as one program in two languages, as the title
   says, and a reader meets new syntax on values they already know. The
   numbers are dewlab's invented ones, and the page says so.
3. **Three predicts, each on a surprise for a Python reader**: `/` with
   two `int` values under a `double`; a type error that stops line 2 from
   running; an `if` with no curly brackets. Not a predict: `7 / 2`, which
   the opening already showed.
4. **The `if` with no curly brackets** is not in the entry's list, but it
   is where "curly brackets in place of indenting" costs a Python reader
   something, and no compiler message warns them (the recorded output has
   no diagnostics). The page teaches it once, then says the site puts
   curly brackets round every block, as Visual Studio does. Practice
   problem 2 has the same trap on a `for` loop.
5. **Compiling is named once**, in the style guide's words, on the CS0029
   cell, with the five parts of the message as `first-steps` gives them.
   `compiler-errors`, the next page, opens with the same surprise (a line
   that has no mistake does not print), so a FOOP reader meets it here
   first. A PDP reader meets it on `first-steps` first too, so the two
   courses agree.
6. **Two tasks, worked then completed then your own.** The count of wet
   days starts from a starter that runs and prints 0 (hint
   `after: 2 runs`); `Average` starts from a program that does not
   compile until the method exists, with two hints (`after: 2 errors`,
   then `after: 3 errors` with the first line). The count of wet days is
   the "counting with a condition" that `objects-and-classes-practice`
   problem 9 calls "From *C# for Python programmers*", so that reference
   now holds.
7. **`static` on every method**, as `writing-your-own-functions` writes
   its local methods, and in its words ("uses only its parameters"). The
   page says "Every method on this page", not "every method on these
   pages", because FOOP's class pages write methods without it.
8. **Explicit types everywhere**, `new List<double> { ... }` in the cells
   (as the exemplars write it), and one sentence on `new()`, since a
   reader meets it on the PDP pages and in Microsoft's documentation.
9. **"The changes in one table".** Not in the entry. A reader coming from
   Python will want one place to look, and a teacher gets the whole page
   on one screen. It holds only what the page shows, plus `Console.Write`,
   `int.Parse`, `double.Parse` and `ToString`, which the next pages use.
   It gives no output, so no number in it needs a run.
10. **Python's output in the prose.** The lesson quotes what the Python
    fences print (`22.5`, `35.0`, `5.0`, `0.0`, `7.0`, the list
    `[4.2, 0.0, 12.6]`, `TypeError`, `ZeroDivisionError`), and the
    practice page quotes `-7 % 3` as 2 and `-7 // 3` as -3. The checker
    can't run Python, so I ran every one of those programs with Python
    3.11 on this machine and copied from its output. The C# numbers all
    come from the outputs files.
11. **Claims checked in a scratch lesson, and not quoted.** These are
    invitations on the page, so the page names no message for them: a
    call with its arguments swapped (`Report(4.2, "Monday")` in the
    scratch lesson) gives two CS1503 errors;
    `readings.Add("dry")` on a `List<double>` gives CS1503;
    `wetDays["Sligo"]` stops with a `KeyNotFoundException`;
    `List<double> readings = new();` compiles; `scores[^2]` is the value
    before the last. The scratch lesson is in my scratchpad, not in the
    repository.
12. **Practice problem 10, the missing semicolon.** The first two
    versions left the semicolon off a declaration (`int days = 7`, then
    `int wetDays = 3`). Both gave CS1003 `',' expected`, not CS1002: C#
    reads the next line as more of the same declaration, as in
    `int days = 7, wetDays = 3;`.
    The problem is "From earlier", so it keeps `first-steps`' CS1002 by
    leaving the semicolon off a `Console.WriteLine` line. The CS1003 case
    would make a good problem on `compiler-errors-practice` ("a message
    that names the wrong thing"), but that page isn't mine to change.
13. **Links.** `first-steps`, `objects-and-classes`, `repeating-yourself`,
    `compiler-errors` and `types-and-their-sizes` exist in `lessons/` now.
    The last two were written at the same time as this page, in the same
    batch; batch rule 3 would have me name them in italics, but the task
    said to link any page that exists now. *Reading input* did not exist
    yet when this was written, so it was in italics (decision 32). It is in
    `lessons/` now, and the review made it a link (see "Review").
14. **Where to read more.** Microsoft's *Roadmap for Python developers
    learning C#* is the best match, and the note says that it uses
    `var`. All four addresses returned HTTP 200 on 28 September 2026.

## What I left out

- From `many-languages-one-idea`: SQL, JavaScript and BASIC, the four
  questions, and compilers against interpreters (`compiler-errors` has a
  fold on what compiling makes). `many-languages-one-idea` is its own
  explore page on the course map.
- Python features with no simple C# twin: list comprehensions and
  slicing with a step (LINQ is the explore page
  `asking-a-list-a-question`), `enumerate` (one sentence), tuples,
  `None` and `null`, and `input()` (a row in the table, and
  `reading-input` teaches it).
- A second-tier solution with LINQ (`rainMm.Count(r => r > average)`),
  because no page before this one teaches a lambda (course map, open
  question 5).
- A cell for the swapped arguments. It would be the 14th cell, and a
  second copy of the two methods, so it is an invitation instead.
- `var`, classes, `do`...`while` and `switch`, which later pages teach.
- A "Why this way?" fold. The page's reason for putting Python beside C#
  is in its first paragraphs.

## Open

These are for Josh.

1. **Length.** The page has 13 cells, inside size M, but with 10 Python
   fences and the phrasebook it is about 27 KB, longer than
   `objects-and-classes` (23 KB, size L). A Python programmer reads the
   Python quickly, so I think it fits an hour. If it does not, the
   phrasebook could move to a help page, or "An array, a list or a
   dictionary" to the start of `types-and-their-sizes`.
2. **An `if` with no curly brackets.** The page shows a form of C# that
   no other page uses, to warn about it. Keep it, or say it in a sentence
   with no cell?
3. **Python output quoted in prose.** "Every number is run" is about C#.
   The Python numbers on this page were run with Python 3.11 by hand, and
   nothing checks them again. Is that acceptable, or should a page that
   compares with Python avoid quoting Python's output?
4. **"From earlier" on FOOP's first page.** No FOOP page comes before it,
   so both earlier problems come from PDP's `first-steps`, which a reader
   who arrives from Python has not read. The problems stand on their own,
   and the link is there for anyone who wants the page. Or should this
   practice page have no "From earlier" problems?
5. **Naming dewlab.** "How this page works" says that in a Python
   notebook the cells often share their variables. Many FOOP readers will
   have used dewlab's Python pages, where they do. Should the page name
   dewlab?
6. **`static` on local methods.** `writing-your-own-functions` and this
   page write `static`; `objects-and-classes-practice` problem 8 writes
   `int AddHit(...)` without it. A rule for the course would settle it.
7. **Pages that can now link here.** `the-moves-you-already-know` (line 82)
   and `objects-and-classes-practice` (problem 9) name this page in
   italics, and `courses/foop.yaml` still lists it under `planned:`. I was
   not to edit those files, so the italics can become links, and the
   `planned:` line can go, in a later change.

## Review

A second reader, 28 September 2026. I read both pages as a Level 5
learner who knows Python and has met no page before this one. Then I read
them as a teacher, against the course-map entry and the pages on either
side (`compiler-errors`, `objects-and-classes`,
`the-moves-you-already-know`). Then I went through the style guide's
checklist and `docs/TRANSLATING.md`'s checklist line by line.

### What I checked, and found to hold

- **Every C# number and quoted output** in the prose, the folds and the
  solution notes of both pages matches the two outputs files, including
  the message places `(3,8)`, `(3,55)` and column 4 of CS1003.
- **Every Python output** the pages quote, re-run with Python 3.11.15:
  22.5, `Galway 7 12.6 True`, 35.0 and 5.0, 0.0 and 7.0 for days 2 and 7,
  `Monday: 4.2 mm, 0.17 inches` and `Wednesday: 12.6 mm, 0.50 inches`,
  the `TypeError` at the second call when the arguments are swapped, the
  `ZeroDivisionError` for no readings, `7.0 mm` and `[4.2, 0.0, 12.6]`,
  the dictionary's lines and `False`, the `TypeError` for `"5" + 1`, and
  2 and -3 for `-7 % 3` and `-7 // 3`. All match.
- **Claims the pages make without a cell**, run in a scratch lesson (in my
  scratchpad, not the repository): `Report(12.6, "Wednesday")` gives two
  CS1503 errors; `readings.Add("dry")` gives CS1503; `wetDays["Sligo"]`
  stops with a `KeyNotFoundException`; `double days = 4;` in the opening
  cell prints 22.5; `List<double> readings = new();` compiles. The
  challenge, completed, prints its counts in the same order as the Python.
- Each program cell works on its own, and the page says only rule 1.
  Solutions and inputs sit on the cells that run. Each predict that asks
  about one line names it, and the checker finds the line. Each first hint
  asks a question. No verdict words, and the prose uses Irish spelling.
- The page does what its entry lists, in the entry's order of ideas, and
  it says that nothing on it needs Visual Studio.

### What I changed

No cell's code changed, so the versions and the outputs files stay as the
writer recorded them. The changes are in the prose, a solution's notes, a
fold and the table.

On the lesson:

1. The opening's "Compare the two, line by line" was an order to think.
   It is now only the question.
2. `storing-2` is the first cell with comments, and a Python reader knows
   `//` as floor division. The page never said what a comment is, and the
   prose after the cell said "C# has no `//`" beside a cell full of `//`.
   A sentence before the cell now defines a *comment* and says that C#'s
   start with `//`, where Python's start with `#`. The sentence after the
   cell now says that C# needs no operator for Python's `//`.
3. The paragraph before `selection-2` gave the answer to its predict
   ("only the one statement after it belongs to the `if`"). That sentence
   now comes after the run, so the code answers first.
4. The `for` loop's second part was one sentence that was hard to follow
   ("C# checks it before the *body*, the lines between the curly
   brackets, runs each time"). It is now three short sentences.
5. `static` was "uses only its parameters", which `Average`, with its own
   `total`, does not fit. It now says what `writing-your-own-functions`
   says: its parameters and the variables it makes itself.
6. `Average`'s inputs table shows `new double[] { 2, 4, 9 }` and
   `new double[0]`, which the page never showed. The solution's notes now
   say what each one makes.
7. "Choose a list: it does everything a Python list does" contradicted the
   paragraph above it (a C# list holds only one type). It now says that a
   list can grow and shrink, as a Python list can.
8. The table gained `input()` beside `Console.ReadLine()`. The writer's
   notes said the row was there, and it wasn't. `compiler-errors`, the next
   page, uses `Console.ReadLine()` and `Console.Write`, so a FOOP reader
   now has both names from this page's table.
9. "Keep it beside you" became "You can return to this table in your
   first weeks of C#."
10. "Looking back": "what did it give you back?" (a phrasal verb) became
    "what did you gain from it?", and "Think of the cell…" (an order to
    think) became a question about that cell.
11. *Reading input* is now a link, because the lesson is in `lessons/`.

On the practice page:

1. Problem 2 said the loop's "last two lines are indented in the same
   way". The cell's last line isn't indented. It now says the two lines
   under the `for` line are.
2. Problem 3 uses *warning* for the first time in FOOP. Its fold now
   defines it: a message about code that compiles but may not do what you
   meant.
3. Problem 7 said each cell has "one line that Python would accept".
   Python would not accept `bool raining = True;` or `Console.WriteLine(...)`.
   It now says that one line in each cell has a Python habit in it.
4. Problem 9's fold said both languages keep `(a / b) * b + (a % b)`
   equal to `a`. In Python, `/` keeps the decimal part, so that is not
   true of Python. The fold now says it with the example's numbers: the
   whole part × 3, plus the remainder, is −7 again. "Rounds down" (a
   phrasal verb) became "gives the next whole number below".
5. Problem 10's fold ended with an order ("Add the semicolon"). It is now
   an invitation, as on `first-steps`.
6. Problem 12: "what do they give you back?" became "what do you gain
   from them?"

`npm run check-lessons -- from-python-to-csharp`, after the changes:
`from-python-to-csharp-practice: 19 runs`, `from-python-to-csharp: 20
runs`, `2 page(s), 39 runs in 7.9 s: no problems.`

### Still open for Josh

The writer's seven questions above stand. My view on four of them, and
three more:

1. **Length (writer's 1).** I would keep the page whole. The Python
   fences are short, and a reader who knows Python reads them quickly. The
   table is the part a teacher will point to most, so it earns its place.
2. **The `if` with no curly brackets (writer's 2).** Keep the cell. It is
   the one place where "indenting only for people" costs a Python reader
   something, and nothing warns them. With the rule now after the run,
   the predict is a real guess.
3. **Python output in the prose (writer's 3).** Every quoted Python
   output was run twice, by the writer and by me (Python 3.11 both times),
   and all of it matches. Nothing will check it again if a cell changes.
   The only Python numbers that depend on a C# cell's data are the week of
   rain's (35.0, 5.0, 0.0, 7.0). If that data changes, those four change
   with it.
4. **"From earlier" (writer's 4).** Problem 9 is the same code, with the
   same cell id, as `first-steps-practice` problem 5, with a new fold
   written for Python readers. The page ids differ, so the saved work
   doesn't collide. A reader who took both courses meets it twice.
5. **New: `compiler-errors` line 76** says that its cells use only what
   the earlier pages met, "`Console.WriteLine` and `Console.ReadLine`".
   For a FOOP reader, the earlier page is this one, which names
   `Console.ReadLine()` only in its table. `compiler-errors` explains
   `ReadLine` where it uses it, so the cell works, but the sentence is
   written for PDP. Its question on that cell sends the reader to
   *Variables and types* for `int.Parse`, which a FOOP reader hasn't read
   (this page's table has `int.Parse`). That page isn't mine to change.
6. **New: "as Visual Studio does"** (curly brackets round every block,
   on the lesson). Visual Studio's own `if` and `for` snippets write the
   curly brackets, and its default C# style prefers them, but it doesn't
   add them to code you type. I left the phrase. "As Visual Studio's own
   code does" would be more exact, if the difference matters.
7. **New: *compile* before it is defined.** The opening predict's third
   option and "How this page works" say *compile* before the Storing
   section defines it, in the style guide's words, on the first cell with
   an error. "How this page works" gives its meaning ("C# found a problem
   before it started, so nothing ran"), and a Python reader has usually
   heard the word. I left it, because defining it earlier would give away
   the CS0029 predict.
