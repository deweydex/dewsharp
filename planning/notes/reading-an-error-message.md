# reading-an-error-message: notes for a reviewer

Ported from dewlab `tutorials/reading-an-error-message/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. In PDP it
is lesson 9 of "First programs", after `equals-three-ways` and before
`repeating-yourself` (`planning/COURSE_MAP.md`, action *adapt*, batch 3). It
depends on `compiler-errors` and `making-decisions`, and the course map's
entry for it was the brief.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/reading-an-error-message/reading-an-error-message.md`
and `reading-an-error-message-practice.md` beside it, with their recorded
outputs (`*.outputs.json`, written by the browser checker), and this file
was the draft's `NOTES.md`. The two `*.native.json` files were deleted: the
browser checker's outputs files replace them. "What was done when it moved",
just below, says what changed in the move. The porter's notes follow it,
with anything the move made stale marked *(stale)* or brought up to date.
"The porter's questions, and what was decided" settles the open questions
where the playbook, the course map, the style guide or the exemplars answer
them; the rest are under "Open".

Files:

- `reading-an-error-message.md`: the lesson. 14 exec cells, 2 of them in
  world variants, so 13 in each world; 3 predicts, 2 hints, 3 solutions, 2
  `inputs` blocks, 1 answer fold and 1 challenge. Version `2026.09.28.1`.
- `reading-an-error-message-practice.md`: the practice page. 13 exec cells,
  no worlds; 2 predicts, 2 hints and 1 hint fold, 6 solutions, 2 `inputs`
  blocks and 9 answer folds. Version `2026.09.28.1`.
- `reading-an-error-message.outputs.json`,
  `reading-an-error-message-practice.outputs.json`: what the browser checker
  recorded.

## What was done when it moved

- **The browser run of the draft as it was.** `npm run check-lessons --
  --write reading-an-error-message` ran every cell, solution and input in
  the real engine. Every cell did what the draft's notes say the native
  check did, with the same text, line and column: `You typed three.` and a
  `FormatException` at line 4 (`a-first-error-1`); `The price is €12.` and
  a `FormatException` for `free` at line 4; `∞`; `102`; the
  `FormatException` for `not a number`; CS0103 at (2,19) with the CS0219
  warning at (1,8); a `DivideByZeroException` at line 3; `12`;
  `Each person pays €20` and a `DivideByZeroException` at line 5; the
  `FormatException` for `seven` at line 3; `The middle is at 250`; `[`;
  `280`, with `A` and `140` from the solutions. On the practice page: `52`,
  `24`, CS0019, the `FormatException` for `twelve`, CS0103 with CS0219,
  CS0020, the `OverflowException` with its `Int32` message, `The price is
  1250`, `0% of the letters are E.` and a `DivideByZeroException` at line 5,
  `16.666666666666664`, `.`, CS1002 at (9,27), and `301`, with every
  solution's output as the draft says. The two worries in the draft's "To
  revisit" list about the browser's culture data came to nothing: `∞` prints
  as `∞`, and `12,50` reads as 1250 on the page's `en-IE` settings.
- **What the checker refused.** Four problems: three `lesson:compiler-errors`
  links (that page is not in `lessons/` and not moving in this round), and
  the challenge, which did not compile (CS1002, line 5). Decision 40 has the
  checker compile each challenge alone and fail one that doesn't compile,
  because a challenge opens in a new notebook. The draft's challenge had a
  missing `;` on purpose. Both are fixed; see below.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches the native check's,
  including German settings (`de-DE`) reading `12,50` as 12.5. One new probe,
  `x-variable-over-constant-zero`, found a claim in the draft that is not
  true in general (next item).
- **CS0020 needs two constants.** The draft said that `60 / 0` does not
  compile because "the compiler can see the 0", and practice 4 said the same
  of `17 % 0`. But `bill / 0`, with `bill` a variable, compiles and stops
  with a `DivideByZeroException` (probe `x-variable-over-constant-zero`,
  line 2). C# calculates a division of two whole-number constants while it
  compiles, and only then finds the zero. The lesson now defines *constant*
  in one sentence and says this, and practice 4's answer says "Both numbers
  are constants, written in the code, so the compiler calculates `17 % 0`
  itself".
- **What the page shows for an exception.** `web/` now draws one
  (`web/page/cell.js`, `drawException`). Run on the page, the bill cell
  shows the status line *Stopped with an exception on line 5 of
  Program.cs.*, then under the output:

  ```console
  Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
     at line 5 of Program.cs
  ```

  `line 5 of Program.cs` is a button that moves the cursor to line 5 (tried
  on the page), and a fold, *What .NET said, in full*, holds .NET's own
  text: `System.DivideByZeroException: Attempted to divide by zero.` and
  `   at Program.<Main>$(String[] args) in Program.cs:line 5`. The draft's
  `console` fence was the `dotnet run` text, which the page does not show.
  The course map's entry says the `dl-traceback` drawing "becomes a drawing
  of what the page shows for an exception, once `web/` draws one", so the
  fence now shows the page's report, as `first-steps` shows a compiler
  message in a `console` fence. The list under it reads `at line 5 of
  Program.cs` and says that pressing it moves the cursor. A second fence
  shows the fold's text, and one sentence says that a console window writes
  it after `Unhandled exception.`, with the folders before `Program.cs`
  (`dotnet run` of the same program, SDK 10.0.401, 28 September 2026:
  `Unhandled exception. System.DivideByZeroException: Attempted to divide by
  zero.` and `   at Program.<Main>$(String[] args) in <folders>/Program.cs:line
  5`). The sentence on `Program.<Main>$` stays, under the fold's fence. The
  opening's "the page names the problem ... and the line where the program
  stopped" is true of the page as it is, and now says "Under the output".
- **Every number and every quoted output now comes from a cell on the page**
  (decision 29; the playbook's step 4):
  - `A moves to D.` (typing `3` in the opening) came only from a probe. The
    checker can type one answer for a cell, and it types `three`. The prose
    now says "the program runs to the end, and says where A moves to", and
    quotes nothing. (Typing `3` on the page does print `A moves to D.`.)
  - `error CS0020: Division by constant zero` came from a probe. A new cell,
    `runtime-errors-3` (`expect: CS0020`), prints a line and then divides
    `60 / 0`. The prose says before it that it is meant to fail, and asks
    whether the first line prints. Nothing prints, and the message is quoted
    from the recorded diagnostic, (2,19). This was the porter's open question
    5.
  - 2147483647, the largest `int` (probe), left the lesson's table and
    practice 4. They say that the number is too big for an `int`.
  - 200 (halfway between 100 and 300) is now recorded:
    `when-nothing-looks-wrong-1` has a solution with the brackets, which
    prints `The middle is at 200`, and the prose asks the reader to add them
    and run it again.
  - 23, 26 and 0 in the secret-messages solution note came from a probe. The
    `inputs` block now has `position` and `moved` as well as `newLetter`, so
    the comparison table records 23, 26 and `'['` for the cell and 23, 0
    and `'A'` for the solution. The note no longer says "`3 % 26`, which is
    3" (it says the remainder "left it as it was"); the hint still asks
    "What is `3 % 26`?".
  - 420 in the pixel-art hint came from a probe. The hint now asks the reader
    to add 90, 120 and 210 and divide by 3.
  - Practice 1: the CS1003 message in (a) and `105` in (b) came from probes.
    (a) now says that it does not compile and that an `if` needs brackets;
    (b) says that it prints the 10 and the 5 side by side, as one piece of
    text.
  - Practice 2: "`int.Parse(typed) + 2` gives 7" (probe) became a question
    and a `solution` block, which the checker runs with the cell's `stdin:`
    and which prints 7.
  - Practice 4: "`value + 3` ... prints `123`" (probe) became "`value + 3`
    compiles".
  - Practice 5: "a price a hundred times too big" became "a price far too
    big".
  - Practice 7: 1200 (probe) became `eCount * 100`.
  - Practice 9: "about 16.67%" became the recorded `16.666666666666664%`.
  - Practice 13: "still prints 301" for `"..." + int.Parse(age) + 1`
    (probe) became "still joins the 1 to the end".
- **The predict on `runtime-errors-2`.** Its third option was "∞, the sign
  for infinity". The page compares a choice guess with the output's lines
  (decision 37), and the output is `∞`, so a reader who chose that option
  would have been asked "Which line explains what you saw?". The option is
  now `∞`, and "∞ is the sign for infinity" moved into its note. Checked on
  the page: choosing `∞` and running hides the question.
- **The challenge compiles.** It keeps dewlab's shape as far as decision 40
  allows: the program has one exception (`int.Parse("16 million")`) and one
  logical error (`width + height / 2`), and the prose asks the reader to
  find both, then to add a mistake of the third kind and read what the
  compiler says. Its comment says "One exception and one logical error."
  Recorded as `ok` in check mode. Probes `t-challenge-semicolon` and
  `t-challenge-fixed` back the prose.
- **The title** lost *wrong* (the porter's open question 1): "Exceptions:
  when a program stops, and when it finishes with an answer nobody meant".
  The heading repeats it. The short title is still *Exceptions*, the name
  other pages already use for this page.
- **The three outcomes** use the style guide's words, as `first-steps`
  does: **It did not compile.**, **It stopped with an exception.**, **It
  ran.**, and the table under them has a column "What happened" with the
  same words. One sentence adds that the line beside the Run button names
  the outcome in the same words every time, which is true of the page
  (*Did not compile, so nothing ran.*, *Stopped with an exception on line 4
  of Program.cs.*, *Ran.*). Elsewhere the prose keeps the present tense,
  for a prediction ("it does not compile"), as `equals-three-ways` does.
- **Links** (decisions 32 and 39). `compiler-errors` is not in `lessons/`
  and not moving, so its three links became its short title in italics,
  *Compiler errors*. "A later page, on reading input" became "A later page,
  *Reading input*". Two pages that move in this round became links, as the
  draft's notes asked once they exist: "A later page,
  [Debugging](lesson:when-it-goes-wrong), returns to the three kinds there"
  (its draft names *Exceptions* as the page before, and has sections on
  exceptions, exception reports and logical errors), and practice 11's
  "[Reusable methods](lesson:building-reusable-tools) writes those checks as
  tests" (its draft's "Testing as a habit" does). Until those two land, the
  checker reports both links as going nowhere.
- **A *warning* is defined** where it first appears, under
  `runtime-your-turn-3`, in the words of `equals-three-ways` and
  `objects-and-classes-practice` ("A warning never stops a program"), and
  the message is quoted from the recorded diagnostic. Practice 4's answer
  now names the same clue under `mesage`.
- **Plain language.** "point at it" became "show where it is", "C# got
  further" became "the program went further: it compiled, and then it ran",
  "it has the last section of the page to itself" became "the last section
  of the page is about it", and "worth looking for a string on one side of a
  `+`" became "worth checking whether one side of a `+` is a string". The
  practice page's first paragraph said every problem has "an answer in a
  fold"; several have a solution, and one only a predict, so it says "Most
  problems have an answer or a solution under them".
- **Visual Studio.** The closing paragraph says that everything on the page
  runs in the browser and nothing on it needs Visual Studio, and that
  *Debugging* uses Visual Studio's debugger (`#the-ide`; the style guide's
  checklist).
- **Where to read more** is unchanged. The address answered HTTP 200 on 28
  September 2026, with the title *Exceptions and Exception Handling - C#*.
- **Frontmatter.** Both pages are `2026.09.28.1`: the lesson has a new
  cell, a changed challenge, a changed predict, new inputs and a new
  solution; the practice page has a new solution.
- **The pages were looked at** in headless Chromium on the real server, at
  900 and 390 pixels wide. Every cell is labelled PROGRAM with `Program.cs`.
  Typing `3` into `a-first-error-1` printed `A moves to D.` and *Ran.*;
  typing `three` stopped on line 4. `runtime-errors-3` said *Did not
  compile, so nothing ran.* with the CS0020 message. The CS0219 warning
  under `runtime-your-turn-3` shows in the quieter grey style under the red
  error. Both worlds show their own task, and "Compare with a solution"
  fills the tables (23, 26 against 23, 0; 280 against 140). On the practice
  page, typing `12,50` printed `The price is 1250`. There is no sideways
  scroll at 390 pixels, and the console showed no errors.
- **Not done here: `courses/pdp.yaml`** still has
  `reading-an-error-message` under `planned:`, with the course map's old
  title. The playbook's checklist says to delete that line when the lesson
  moves; this round leaves the course files to the orchestrator. Once it
  goes, the course page shows the lesson's own (new) title.

## What changed from dewlab, and why (the porter's notes)

### The shape of the page

dewlab's page teaches three kinds of wrong: syntax errors, runtime errors
and logical errors. In C# the first kind became a page of its own,
`compiler-errors` (batch 2, not drafted yet). So this page is about the two
kinds that compiling cannot catch, as the course map says. It keeps dewlab's
order: an opening mistake, the three kinds, the errors that happen while a
program runs, reading the report, and the logical errors, with the two world
tasks at the end.

The thread that holds the C# page together is new, and C# gives it: **the
compiler checks types, and it cannot check values.** A type problem is a
compiler error before anything runs. A value problem (text that is not
digits, a 0 to divide by) is an exception while it runs, or a logical error
that nobody reports. The page says this in plain words after the your-turn
cells, where the reader has just seen one of each. *(Brought up to date:
the one value the compiler does check is a division of two constants,
CS0020, which the page now shows in a cell.)*

### What the reader already knows

Taken from the course map's entries for the pages before this one. *(Brought
up to date: `first-steps`, `storing-and-computing`, `powers-in-csharp`,
`dividing-in-csharp`, `making-decisions` and `equals-three-ways` are now in
`lessons/`; `compiler-errors` and `types-and-their-sizes` are not written
yet.)*

- *exception* is defined on `powers-in-csharp`, with the three things that
  can happen when you press Run *(brought up to date: `first-steps`, in
  `lessons/`, names the three outcomes in the style guide's words, and
  `powers-in-csharp` and `storing-and-computing` use *exception* without a
  definition; so this page's own definition is the first one)*;
- `storing-and-computing` has `int.Parse`, `double.Parse`,
  `Console.ReadLine()`, casts, `char` arithmetic and the Caesar shift, and
  says that typing *thirty* stops with a `FormatException`;
- `compiler-errors` reads a message in five parts, meets CS0103 and CS0029,
  says to read the first message first, and shows warnings (CS0219);
- `dividing-in-csharp` shows that `/` on two `int` values keeps only the
  whole part;
- `types-and-their-sizes` has `int.MaxValue` and overflow;
- `making-decisions` has `if`, `else if` and `else`.

The page defines *exception* again in one sentence, because it is the
page's subject, and because a reader may arrive here first. *(The move
added one-sentence definitions of *warning* and *constant* for the same
reason.)*

### The lesson, section by section

**Opening (`a-first-error-1`).** dewlab opened with a misspelt name, which
is CS0103 in C# and belongs to `compiler-errors`. The course map says this
cell "becomes an exception". It is now a program that asks how many places
to move each letter, with a real `Console.ReadLine()`. The reader types `3`
(it runs) and then `three` (it stops with a `FormatException` at line 4).
The prose says the word is a mistake on purpose. The checker types `three`
(`stdin: "three\n"`, `expect: exception`). This opening makes the page's
main point at once: the compiler found nothing, because the problem is in a
value that nobody knew until the program ran. dewlab's paragraphs on why
messages matter are kept, adapted: a .NET report puts its most useful line
at the top, not the bottom, and the page now names four things it is
about, not three.

**Three kinds of wrong** became **Three things can happen when you press
Run**, in the style guide's words (`#the-compiler`). The course map asks for
this opening. *Runtime error* and *run time* are named once, as the words
some books use for an exception. *Logical error* keeps dewlab's definition.
The table has the same three rows, with "C#, while the program runs" in
place of "Python". *(Brought up to date: the labels are now the past-tense
outcomes, and the table's columns are "What happened", "What it means" and
"What finds the mistake".)*

**Errors that happen while it runs** became **Exceptions: errors that
happen while a program runs**.

- `runtime-errors-1`: dewlab's `delivery` was a name never made
  (NameError), which does not compile in C#. The C# cell keeps the price and
  the delivery, and makes the delivery the text `"free"`, so `int.Parse`
  stops at line 4 after line 2 has printed. The question "Will anything
  print at all?" is kept; the prose now says before the run that the cell is
  meant to stop, and asks whether anything prints before it stops.
- The table of errors lost `NameError` and `TypeError` (compiler errors in
  C#: CS0103, CS0029, CS0019). `ValueError` became `FormatException`, and
  `ZeroDivisionError` became `DivideByZeroException`. `OverflowException`
  is new (`int.Parse("3000000000")`), because a Python whole number never
  runs out and a C# `int` does, and `types-and-their-sizes` has just shown
  it. dewlab's sentence about "Did you mean: 'score'?" is gone: the C#
  compiler does not suggest names. *(Brought up to date: the row no longer
  gives 2147483647.)*
- `runtime-errors-2` is new: the course map's predict on a `double` divided
  by zero. It prints ∞. A paragraph after it shows that dividing by zero can
  end in each of the three ways. *(Brought up to date: the option is now
  `∞`, and the first of the three ways is the new cell `runtime-errors-3`,
  not a probe; see "What was done when it moved".)*
- `runtime-your-turn-1..4`, as the course map says: 1 is now a logical
  error (`"10" + 2` prints 102), 2 is a `FormatException`, 3 is CS0103, a
  compiler error, and 4 is a `DivideByZeroException`. The comment guesses
  now ask which of the three things will happen. The prose before the cells
  says three of the four are meant to fail, without saying which. The prose
  after them notices the CS0219 warning under CS0103, which names `secret`
  as never used: a clue to the misspelling.
- `runtime-the-fix-1` keeps its cell and its predict (12). The paragraph
  after it was dewlab's `TypeError` versus `ValueError`, "the pair people
  confuse most". In C# the pair is a type problem (found before the run) and
  a value problem (found during the run, or never).

**Reading a traceback** became **Reading an exception report**.

- `a-short-traceback-1`, the bill split, is the same program in C#. It
  prints `Each person pays €20` and stops at line 5.
- dewlab's `dl-traceback` drawing is replaced by a `console` fence. *(Stale:
  the draft's fence was the `dotnet run` text. It is now the page's own
  report, with a second fence for the fold *What .NET said, in full*; see
  "What was done when it moved".)* The list after it reads the report from
  the top, not from the bottom: *Unhandled*, the exception's name,
  `System.`, the message, and the place. One sentence tells readers from
  Python that a .NET report is the other way up. "The line that failed is
  not always the line that is responsible" is unchanged.
- `a-short-traceback-2`: dewlab set `typed = "seven"` "as if somebody had
  typed" it. Now the program really asks, the reader types `seven`, and the
  checker has `stdin: "seven\n"`. That changes the answer to "which line is
  responsible": the value arrived from the keyboard, so the fix is for the
  program to say what to type and check what it got. dewlab has no answer
  fold here; one is added, because the question now has a less obvious
  answer, and it points to the later page on reading input (`TryParse`),
  *Reading input*.

**When nothing looks wrong** became **When there is no message** (see the
porter's question 2).

- `when-nothing-looks-wrong-1` is the same (250 where 200 was meant, in
  `int`), with its predict. *(The move added a solution, which records
  200.)*
- A paragraph adds the course map's "case only C# has": `"10" + 2` compiles
  and gives 102, where Python stops. The reader met it in
  `runtime-your-turn-1`, so the paragraph points back to it rather than
  adding a cell.
- `when-nothing-looks-wrong-2` keeps both worlds. The secret-messages
  variant uses `char` arithmetic, as `storing-and-computing` does, and
  prints `[`; its note explains 23, 26 and `[`. The pixel-art variant is in
  `int` and prints 280 (140 with brackets). Their hints now have
  `after: 1 runs`, because these cells run without an error, and the
  default (`after: 1 errors`) would never show them. *(The move added
  `position` and `moved` to the secret-messages inputs, so that the note's
  numbers are recorded, and rewrote the pixel-art hint without 420.)*

**Looking back.** The question is asked in terms of the three things that
can happen when you press Run. The challenge keeps its shape (one mistake
of each kind), rebuilt for C#. *(Stale: a challenge must compile (decision
40), so the missing `;` went; the reader now adds the third kind.)* The
closing paragraph keeps dewlab's "most exact and most patient help", and
links to the practice page.

**Where to read more.** The Corey Schafer video (Python `try`/`except`) is
replaced by Microsoft Learn's *Exceptions and Exception Handling* for C#.
dewlab's video library (`planning/video-library/`) has no C# video on
exceptions.

### The practice page

Problems keep dewlab's order and ids. One problem is new
(`naming-the-error-early-6`), inside problem 4.

1. **Which kind:** the same four, rewritten, and one new. (a) `if total >
   10` without brackets does not compile (CS1003, then CS1026: probe
   `p-if-no-brackets`). (b) `10 + "5"` joins, where Python stopped. (c)
   `int.Parse("thirty")`. (d) an `int` average over a count of 0. (e) is
   new: a `double` average over 0 is ∞, a logical error.
2. **Five times two** became **Five plus two**, as the course map says:
   `"5" * 2` does not compile in C#, so the problem is `"5" + 2`, with a real
   `ReadLine` (`stdin: "5\n"`), and prints 52. The id `five-times-two-1` is
   kept (the porter's question 8). *(The move added a solution that prints
   7.)*
3. **A number from text:** the same, with `int.Parse` (24).
4. **Name the error** became **Name what happens**. The comments now ask
   which of the three things happens. The first cell, a `TypeError` in
   Python, is now `value * 3`, which does not compile (CS0019); the answer
   says `value + 3` compiles, the reverse of dewlab's note. The third
   (`mesage`) is CS0103, and the answer says that the C# compiler, unlike
   Python, does not suggest a name. The fifth, `17 % 0`, does not compile
   in C# (CS0020): both numbers are constants. The new sixth is an
   `OverflowException` (`int.Parse("8000000000")`), with `Int32` explained.
   The prose says all five are meant to fail.
5. **A decimal comma:** the course map's surprise. On the page's `en-IE`
   settings, `double.Parse("12,50")` is 1250, not an exception, because the
   comma separates thousands. It is now a real `ReadLine` program
   (`stdin: "12,50\n"`). The answer says that with German settings the same
   text is twelve and a half (probe `p-german-comma`, 12.5 in the browser
   too), and keeps dewlab's point that the person typing made no mistake.
6. **Where to look first:** the report is read from the top. The syntax
   marker half became "which compiler message first", which names
   *Compiler errors*.
7. **The line that failed, and the line responsible:** dewlab's
   `letters + extra` was a `TypeError`, a compiler error in C#. The new
   program finds what share of 47 letters are E (the numbers from
   `storing-and-computing`'s task), and `eCount / letters * 100` is 0, so
   `100 / ePercent` stops with a `DivideByZeroException` at line 5. Line 3
   is responsible, and line 4 even printed `0%`. It draws on
   `dividing-in-csharp`, one of the "problems from earlier pages" the map
   asks for. A solution (multiply first: 25%, one letter in 4) is added.
8. **Some output, then an exception:** the same idea, in C#'s words.
9. **Up by how much:** `old` and `new` became `oldPrice` and `newPrice`
   (`new` is a keyword in C#). They are `double`, so that the only mistake
   is the one the problem is about: with `int`, `10 / 60` would be 0 before
   the `* 100`. It prints 16.666666666666664; the solution prints 20. Its
   hint has `after: 1 runs`.
10. **Exactly on the line:** the same, with braces. `string pixel;` is
    given a value in both branches.
11. **The habit that catches them:** "ten percent of 50 is 5" became "a
    rise from 50 to 60 is 20%", from problem 9. *(Brought up to date:
    `building-reusable-tools` moves in this round, so it is now a link.)*
12. **Two at once:** dewlab's two syntax errors are one compiler error in
    C# (a missing `;`, CS1002) and one exception (`"12O"`, with the letter
    O for a zero). Fixing the first shows the second, which keeps dewlab's
    point in C# terms: a new message after a fix can mean the program got
    further. (A C# compiler reports every error it finds, not only the
    first, so dewlab's "Python stops at the first thing it cannot read" is
    not true here and is gone.)
13. **Next year:** now a real `ReadLine` (`stdin: "30\n"`). In C# it prints
    `Next year you will be 301`, where Python stopped with a `TypeError`. The
    solution note adds a C# point: `"..." + int.Parse(age) + 1` still joins
    the 1 to the end, because the `+` signs go from left to right (probe
    `p-next-year-parse`).
14. **Better news:** the same, with "compiler error" and "exception".

### The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`), so no
`.glossary.yaml` was written. dewlab's terms, and what became of them:

- syntax error, runtime error, logical error: *compiler error* (defined on
  `compiler-errors`, and here in one line), *exception* and *runtime error*
  (defined here), *logical error* (defined here);
- `SyntaxError` and `IndentationError`: `compiler-errors` (C# has no
  indentation rule);
- `NameError`, `TypeError`: compiler errors in C# (CS0103; CS0029 and
  CS0019);
- `ValueError`: `FormatException` (defined in the table);
- `ZeroDivisionError`: `DivideByZeroException` (defined in the table);
- traceback: *exception report* (read in its parts).

New here, each defined where it first appears: `OverflowException`,
*infinity*, *run time*, *constant*, *warning*, *.NET*, *unhandled*, an
exception's *message*, and `Program.<Main>$`. The practice page adds
`Int32`.

## What C# made different, in short

- Most of dewlab's runtime errors are compiler errors in C#: a name that
  does not exist, and text used as a number (`"5" * 2`). They left for
  `compiler-errors`, and the page is about values, not types.
- `+` with a string joins without complaint, so two of dewlab's `TypeError`
  problems are now logical errors (102, 52, 301).
- Whole-number division by zero is an exception; `double` division by zero
  is ∞ with no exception; and a division of two whole-number constants does
  not compile (CS0020), while a constant 0 under a variable compiles and
  throws.
- `int` has a limit, so `int.Parse` has a second exception,
  `OverflowException`.
- The report is read from the top.
- Input is real, so the reader types the mistake themselves, and the
  "responsible line" for bad input is the keyboard.
- `double.Parse` reads a comma as a thousands separator on Irish settings,
  so the decimal comma is a silent logical error, not an exception.
- Integer division makes the "line responsible" problem in the practice
  page (`12 / 47` is 0).

## Where each number and message in the prose comes from

From the two `*.outputs.json` files beside the pages, except where the table
says otherwise. The page shows a compiler message with `Program.cs`, and
the recorded diagnostics give the line and column.

| Number, message or claim | Source |
|---|---|
| typing `three`: `You typed three.`, the `FormatException` and its message, line 4 | `a-first-error-1` |
| typing `3`: it runs to the end (nothing quoted) | probe `t-first-error-typed-3`; typed on the page too |
| `The price is €12.`; the `FormatException` for `free` | `runtime-errors-1` |
| `int.Parse("3000000000")` stops with an `OverflowException` | probe `t-overflow` (no number quoted) |
| a `DivideByZeroException` with `%` as well as `/` | probe `t-remainder-zero` |
| ∞, larger than any number | `runtime-errors-2`; probe `t-double-zero` (`True`) |
| nothing prints; `Program.cs(2,19): error CS0020: Division by constant zero` | `runtime-errors-3` |
| a variable divided by a constant 0 compiles and throws | probe `x-variable-over-constant-zero` |
| 102; the `FormatException` for `not a number`; CS0103 and the CS0219 warning, with their text; the `DivideByZeroException` | `runtime-your-turn-1..4` |
| 12 | `runtime-the-fix-1` |
| `int.Parse(Console.ReadLine())` stops when somebody types `thirty` | probe `t-thirty` |
| `Each person pays €20`; the report, line 5 | `a-short-traceback-1`; the report's words and the fold's text as the page drew them (`web/page/cell.js`), checked on the page |
| a console window writes the fold's text after `Unhandled exception.`, with the folders | `dotnet run` of the bill program, SDK 10.0.401, 28 September 2026 |
| typing `seven`: the `FormatException` and its message, line 3 | `a-short-traceback-2` |
| `double.Parse` reads `7` and `7.5` | probe `t-hours-typed` |
| 250; then 200 with brackets | `when-nothing-looks-wrong-1` and its solution |
| `[`, then A with brackets; 23, 26 and 0 | `when-nothing-looks-wrong-2--secret-messages`: its output and the `position`, `moved`, `newLetter` values, for the cell and its solution |
| 280, then 140 | `when-nothing-looks-wrong-2--pixel-art` and its solution |
| 255, the largest value of a colour | the pixel-art world's set-up (`storing-and-computing` and `making-decisions` give colours from 0 to 255) |
| the challenge compiles; one exception and one logical error | `challenges[0]` (`ok`); probes `t-challenge-semicolon`, `t-challenge-fixed` |
| Python stops at `"10" + 2` | `python3 -c 'print("10" + 2)'`: `TypeError: can only concatenate str (not "int") to str` (the porter, 27 September) |
| Python names the error on a traceback's last line | dewlab's own page |
| practice 1: (a) does not compile; (b) joins; (c) `FormatException`; (d) `DivideByZeroException`; (e) ∞ | probes `p-if-no-brackets`, `p-joins`, `p-thirty`, `p-int-average`, `p-double-average` (∞, as `runtime-errors-2` records) |
| practice 2: 52; 7 | `five-times-two-1` and its solution |
| practice 3: 24 | `a-number-from-text-1` |
| practice 4: CS0019 and its text; `value + 3` compiles; `FormatException`; CS0103 and CS0219; CS0020 and its text; `OverflowException` and its text; `long.Parse("8000000000")` reads it | `naming-the-error-early-1..6`; probes `p-joins`, `p-long`, `t-remainder-zero` |
| practice 5: 1250; 12.5 with German settings | `naming-the-error-early-4`; probe `p-german-comma` |
| practice 7: `0% of the letters are E.`, the `DivideByZeroException` at line 5; 25; `One letter in 4 is E.` | `reading-a-short-traceback-1` and its solution |
| practice 9: 16.666666666666664; 20 | `when-nothing-looks-wrong-practice-1` and its solution |
| practice 10: `.` at 128 with `>`, `#` with `>=` | `when-nothing-looks-wrong-practice-2` and its solution; probe `p-boundary` for 127 and 129 |
| practice 11: 200; 20% | the lesson's `when-nothing-looks-wrong-1` solution; practice 9's solution |
| practice 12: CS1002; then a `FormatException` for `12O`; `.` for 120 | `fixing-early-1` and its solution; probe `p-two-at-once-first-fix` |
| practice 13: 301; 31 | `fixing-early-2` and its solution; probe `p-next-year-parse` for "still joins" |
| 640 × 480, 60, 3 people, 14 an hour, 47 and 12, 50 and 60, 128 | the set-up of each task, carried over from dewlab or from `storing-and-computing` |

## Notes that were for later, and what became of them

- **What the page shows for an exception** (course map open question 9).
  Done: see "What was done when it moved". The sentence under the opening
  cell and the report section now describe what the page draws.
- **∞ and 1250 in the browser.** Checked: both are what the draft said.
- **A cell that fails only with some typing.** `a-first-error-1` and
  `a-short-traceback-2` have `expect: exception` because of what the
  checker types. The page does not show `expect:` at all (nothing in
  `web/page/` reads it), so a reader who types `3` or `7` sees *Ran.* and no
  label that says otherwise. Nothing to change.
- **Warnings under errors.** Checked: under `runtime-your-turn-3`, the
  CS0219 warning is grey, under the red CS0103 error, in the list labelled
  "Compiler messages". It reads as a second, quieter message. The lesson
  now defines *warning* before it uses the warning as a clue.
- **Compare with a solution on cells whose own code fails**
  (`reading-a-short-traceback-1`, `fixing-early-1`) **and on a cell with
  `stdin:`** (`fixing-early-2`). None of them has an `inputs` block, and
  the page draws the comparison only for a cell with inputs, so each shows
  its solution as a fold and nothing else. The one `stdin:` cell that
  gained a solution in the move, `five-times-two-1`, has no inputs either.
  Nothing to change. (For a page that has both: the page runs the solution
  with `stdin: ''`, `web/page/lesson.js`, `compareBlock`.)
- **The challenge.** Done: it compiles now, and the checker records it.
- **Forward links.** Done for `when-it-goes-wrong` and
  `building-reusable-tools`, which move in this round. `reading-input` is
  not written, so it is *Reading input* in italics.
- **Back links to `compiler-errors`.** Still to check against the real page
  when it is written: the prose assumes it reads a message in five parts,
  meets CS0103, says "read the first message first" with an example, and
  shows a warning. It is *Compiler errors* in italics until then.

## The porter's questions, and what was decided

1. **"Wrong" in the title.** Decided: changed, to "Exceptions: when a
   program stops, and when it finishes with an answer nobody meant". The
   style guide (`#voice`, "No verdicts") and the playbook's checklist both
   list *wrong* with no exception, and `equals-three-ways` made the same
   change for "feels right". "An answer nobody meant" is the page's own
   phrase (the ∞ paragraph, the challenge). The course map's title and the
   `planned:` line in `courses/pdp.yaml` still have the old one; see
   "Open", item 1.
2. **The renamed heading and the `when-nothing-looks-wrong-*` ids.**
   Decided: the heading stays "When there is no message" (the style guide's
   verdict rule), and the ids stay. The course map says "a cell that keeps
   its task keeps its dewlab id, so a teacher can compare the two pages",
   and the playbook renames only ids that name Python (decision 28). The
   heading anchor is not a contract; nothing links to it.
3. **Four `FormatException` cells.** Not answered by any of the documents:
   see "Open", item 2.
4. **`OverflowException`.** Kept, without the number 2147483647, which no
   cell prints. Whether it belongs here or only on `types-and-their-sizes`
   is for Josh: see "Open", item 3.
5. **CS0020 as prose.** Decided: a cell, `runtime-errors-3`. The playbook's
   step 4 and decision 29 say that a number or message the prose needs is
   printed by a cell, and the prose quoted the message. The cell also found
   that the draft's reason was not the whole truth (see "CS0020 needs two
   constants"). The lesson has 13 cells in each world, still an M page.
6. **`Program.<Main>$`.** Decided: the sentence stays, moved under the
   second fence. The page's own report leaves the name out (`at line 5 of
   Program.cs`), but its fold *What .NET said, in full* shows it, and so
   does a console window, so a reader who opens the fold or runs the
   program in Visual Studio meets it.
7. **"C#, while the program runs".** Decided: kept. The style guide's
   `#the-compiler` names all three outcomes as what C# does, and `#voice`
   asks for common words; the page names .NET where the report needs it
   (`System.`).
8. **Practice ids kept for changed tasks.** Decided: kept. The course map
   treats "Five times two" as the same problem in C# ("it becomes
   `"5" + 2`"), and its rule and the playbook's keep a dewlab id wherever
   the task is the same; decision 28 renames only ids that name Python.
9. **`"12O"` in practice 12.** Not answered by any of the documents: see
   "Open", item 4.
10. **"Stack trace".** Decided: not on this page. The course map's entry
    calls it an *exception report*, the style guide's terms table has no
    entry for either, and `when-it-goes-wrong` (moving in this round)
    introduces *stack trace* where a report first has several lines.
11. **The practice page's title.** Decided: "Exceptions: practice". Both
    exemplars use the form "<short title>: practice" ("Your first C#
    program: practice", "Classes and objects: practice"), and so does every
    practice page in `lessons/`.

## Open

For Josh:

1. **The title in the course map and the course file.** The lesson's title
   is now "Exceptions: when a program stops, and when it finishes with an
   answer nobody meant" (question 1). `planning/COURSE_MAP.md` (the PDP
   table, row 9, and the entry's heading) still has "... when it runs but
   is wrong", and so does the `planned:` line in `courses/pdp.yaml`, which
   the checklist says should be deleted now that the lesson is in
   `lessons/`. Neither file was edited in this move.
2. **Four `FormatException` cells** in the lesson (the opening,
   `runtime-errors-1`, `runtime-your-turn-2`, `a-short-traceback-2`). It is
   the exception a PDP learner meets most, and each cell asks something
   different, but `runtime-errors-1` could become a
   `DivideByZeroException` or an `OverflowException` for variety.
3. **`OverflowException`** is not in the course map's entry. It is in the
   lesson's table and in practice 4, and nowhere else. Keep it, or leave
   overflow to `types-and-their-sizes`?
4. **`"12O"` in practice 12.** The letter O for a zero is a real typing
   mistake, and the exception's message quotes it. In some fonts, including
   some dyslexia fonts, O and 0 are hard to tell apart. Keep it, or use
   another value (`"12 0"`, `"one20"`)?
5. **The challenge lost its compiler error.** Decision 40 makes the checker
   refuse a challenge that doesn't compile, so the challenge has two kinds
   of mistake and asks the reader to add the third. If dewlab's "one of
   each kind" matters, the other choice is a cell with `expect: CS1002`
   after the challenge, which would count as a fifteenth cell.

## Probe cells

These are not part of the lesson. Each checks a claim in the prose that no
lesson cell prints. `t-` probes are for the lesson, `p-` probes for the
practice page, and `x-` probes were added when the page moved. They were
run in the browser on 28 September 2026 by copying them into a scratch
lesson (`node tools/check-lessons.mjs --lessons <scratch>/lessons
--write`). The `expect:` probes fail on purpose. Some are no longer needed,
because a cell on the page now prints what they printed; they are kept as
the record of what the draft relied on.

```csharp exec
id: t-first-error-typed-3
stdin: "3\n"
Console.Write("How many places should each letter move? ");
string typed = Console.ReadLine();
Console.WriteLine($"You typed {typed}.");
int shift = int.Parse(typed);
char moved = (char)('A' + shift);
Console.WriteLine($"A moves to {moved}.");
```

```csharp exec
id: t-constant-zero
expect: CS0020
Console.WriteLine(60 / 0);
```

```csharp exec
id: t-double-zero
Console.WriteLine(60.0 / 0);
double infinity = 60.0 / 0;
Console.WriteLine(infinity > double.MaxValue);
```

```csharp exec
id: t-int-max
Console.WriteLine(int.MaxValue);
Console.WriteLine(byte.MaxValue);
```

```csharp exec
id: t-overflow
expect: exception
int stock = int.Parse("3000000000");
Console.WriteLine(stock);
```

```csharp exec
id: t-remainder-zero
expect: exception
int zero = 0;
Console.WriteLine(17 % zero);
```

```csharp exec
id: t-thirty
stdin: "thirty\n"
expect: exception
int age = int.Parse(Console.ReadLine());
Console.WriteLine(age);
```

```csharp exec
id: t-hours-typed
stdin: "7.5\n"
Console.Write("How many hours did you work? ");
string typed = Console.ReadLine();
double hours = double.Parse(typed);
double pay = hours * 14;
Console.WriteLine($"You earned €{pay}.");
Console.WriteLine(double.Parse("7"));
```

```csharp exec
id: t-middle
int left = 100;
int right = 300;
Console.WriteLine((left + right) / 2);
Console.WriteLine(right / 2);
```

```csharp exec
id: t-letter-steps
char letter = 'X';
int shift = 3;
int position = letter - 'A';
Console.WriteLine(position);
Console.WriteLine(shift % 26);
Console.WriteLine(position + shift % 26);
Console.WriteLine((char)(26 + 'A'));
Console.WriteLine((position + shift) % 26);
```

```csharp exec
id: t-brightness-steps
int red = 90;
int green = 120;
int blue = 210;
Console.WriteLine(red + green + blue);
Console.WriteLine((red + green + blue) / 3);
Console.WriteLine(blue / 3);
```

```csharp exec
id: t-challenge-as-given
expect: CS1002
int width = 64;
int height = 48;
int pixels = width * height;
Console.WriteLine($"Pixels: {pixels}")
int bytesNeeded = pixels * 3;
Console.WriteLine($"Kilobytes: {bytesNeeded / 1024}");
int averageSide = width + height / 2;
Console.WriteLine($"Average side: {averageSide}");
string colourText = "16 million";
int colours = int.Parse(colourText);
Console.WriteLine($"Colours: {colours}");
```

```csharp exec
id: t-challenge-semicolon
expect: exception
int width = 64;
int height = 48;
int pixels = width * height;
Console.WriteLine($"Pixels: {pixels}");
int bytesNeeded = pixels * 3;
Console.WriteLine($"Kilobytes: {bytesNeeded / 1024}");
int averageSide = width + height / 2;
Console.WriteLine($"Average side: {averageSide}");
string colourText = "16 million";
int colours = int.Parse(colourText);
Console.WriteLine($"Colours: {colours}");
```

```csharp exec
id: t-challenge-fixed
int width = 64;
int height = 48;
int pixels = width * height;
Console.WriteLine($"Pixels: {pixels}");
int bytesNeeded = pixels * 3;
Console.WriteLine($"Kilobytes: {bytesNeeded / 1024}");
int averageSide = (width + height) / 2;
Console.WriteLine($"Average side: {averageSide}");
string colourText = "16000000";
int colours = int.Parse(colourText);
Console.WriteLine($"Colours: {colours}");
```

```csharp exec
id: p-if-no-brackets
expect: CS1003
int total = 12;
if total > 10 { Console.WriteLine(total); }
```

```csharp exec
id: p-joins
Console.WriteLine(10 + "5");
string value = "12";
Console.WriteLine(value + 3);
Console.WriteLine(int.Parse("5") + 2);
```

```csharp exec
id: p-thirty
expect: exception
int age = int.Parse("thirty");
Console.WriteLine(age);
```

```csharp exec
id: p-int-average
expect: exception
int total = 12;
int count = 0;
int average = total / count;
Console.WriteLine(average);
```

```csharp exec
id: p-double-average
double total = 12;
double count = 0;
double average = total / count;
Console.WriteLine(average);
```

```csharp exec
id: p-long
Console.WriteLine(long.Parse("8000000000"));
```

```csharp exec
id: p-german-comma
Console.WriteLine(double.Parse("12,50", new System.Globalization.CultureInfo("de-DE")));
Console.WriteLine(double.Parse("12,50"));
Console.WriteLine(double.Parse("12.50"));
```

```csharp exec
id: p-percent-steps
int letters = 47;
int eCount = 12;
Console.WriteLine(eCount / letters);
Console.WriteLine(eCount * 100);
Console.WriteLine(eCount * 100 / letters);
```

```csharp exec
id: p-up-by-how-much
double oldPrice = 50;
double newPrice = 60;
double change = (newPrice - oldPrice) / newPrice * 100;
Console.WriteLine(newPrice - oldPrice);
Console.WriteLine($"{change:F2}");
```

```csharp exec
id: p-boundary
int[] tries = { 127, 128, 129 };
foreach (int brightness in tries)
{
    string before = brightness > 128 ? "#" : ".";
    string after = brightness >= 128 ? "#" : ".";
    Console.WriteLine($"{brightness}: {before} {after}");
}
```

```csharp exec
id: p-two-at-once-first-fix
expect: exception
string typed = "12O";
int brightness = int.Parse(typed);
if (brightness >= 128)
{
    Console.WriteLine("#");
}
else
{
    Console.WriteLine(".");
}
```

```csharp exec
id: p-next-year-parse
stdin: "30\n"
Console.Write("How old are you? ");
string age = Console.ReadLine();
Console.WriteLine("Next year you will be " + int.Parse(age) + 1);
```

```csharp exec
id: x-variable-over-constant-zero
expect: exception
int bill = 60;
Console.WriteLine(bill / 0);
```

```csharp exec
id: x-double-infinity-twelve
double total = 12;
double count = 0;
Console.WriteLine(total / count);
Console.WriteLine(-12.0 / 0);
```

What the browser recorded for them (28 September 2026):
`t-first-error-typed-3` printed `You typed 3.` and `A moves to D.`;
`t-constant-zero` CS0020 at (1,19); `t-double-zero` `∞`, `True`;
`t-int-max` `2147483647`, `255`; `t-overflow` `OverflowException` at
line 1; `t-remainder-zero` `DivideByZeroException` at line 2; `t-thirty`
`FormatException` at line 1; `t-hours-typed` `You earned €105.`, `7`;
`t-middle` `200`, `150`; `t-letter-steps` `23`, `3`, `26`, `[`, `0`;
`t-brightness-steps` `420`, `140`, `70`; `t-challenge-as-given` CS1002 at
(4,39); `t-challenge-semicolon` `Pixels: 3072`, `Kilobytes: 9`,
`Average side: 88`, then `FormatException` at line 10;
`t-challenge-fixed` `Average side: 56`, `Colours: 16000000`;
`p-if-no-brackets` CS1003 at (2,4) and CS1026 at (2,15); `p-joins`
`105`, `123`, `7`; `p-thirty` `FormatException`; `p-int-average`
`DivideByZeroException` at line 3; `p-double-average` `∞`; `p-long`
`8000000000`; `p-german-comma` `12.5`, `1250`, `12.5`; `p-percent-steps`
`0`, `1200`, `25`; `p-up-by-how-much` `10`, `16.67`; `p-boundary`
`127: . .`, `128: . #`, `129: # #`; `p-two-at-once-first-fix`
`FormatException` for `12O` at line 2; `p-next-year-parse` `Next year you
will be 301`; `x-variable-over-constant-zero` `DivideByZeroException` at
line 2; `x-double-infinity-twelve` `∞`, `-∞`.
