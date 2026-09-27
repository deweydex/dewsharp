# reading-an-error-message: notes for a reviewer

Ported from dewlab `tutorials/reading-an-error-message/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. In PDP it
is lesson 9 of "First programs", after `equals-three-ways` and before
`repeating-yourself` (`planning/COURSE_MAP.md`, action *adapt*, batch 3). It
depends on `compiler-errors` and `making-decisions`, and the course map's
entry for it was the brief.

Files:

- `reading-an-error-message.md`: the lesson. 13 exec cells, 2 of them in
  world variants, so 12 in each world; 3 predicts, 2 hints, 2 solutions, 2
  `inputs` blocks, 1 answer fold and 1 challenge.
- `reading-an-error-message-practice.md`: the practice page. 13 exec cells,
  no worlds; 2 predicts, 2 hints and 1 hint fold, 5 solutions, 2 `inputs`
  blocks and 9 answer folds.
- `reading-an-error-message.native.json`,
  `reading-an-error-message-practice.native.json`: what the native check
  recorded for every cell, input and solution.
- `NOTES.md`: this file. The probe cells at the end check the claims in the
  prose that no lesson cell prints. Run them with the same NativeCheck
  command, passing `NOTES.md` as the file. The `expect:` probes fail on
  purpose.

Every cell on both pages, and every solution, was run with NativeCheck, in
both worlds. The last line was "No problems." for the two pages together,
for each page with `--json`, and for the probes in this file.

## Frontmatter

- `title`: "Exceptions: when a program stops, and when it runs but is
  wrong", the course map's title (see open question 1). dewlab's was
  "Reading an error message". The id stays `reading-an-error-message`, as
  the map says.
- `covers: [PDP-LO9, PDP-LO10]`, from the course map. dewlab gives PDP-LO9
  for each of its five sections. The C# page adds LO10 ("the testing
  process"), which it serves with the habit of trying answers you already
  know and with reading back from the line that failed to the line that is
  responsible.
- `worlds`: dewlab PDP's two, secret messages and pixel art, with dewlab's
  descriptions. As in dewlab, only one task has variants
  (`when-nothing-looks-wrong-2`); everything else is shared.
- `year:` is dropped. The format has no such field.
- The practice page has `from: reading-an-error-message-practice` and
  `practice_for: reading-an-error-message`, and no worlds, as in dewlab. Its
  title is "Exceptions: practice", in the form the `storing-and-computing`
  draft uses.

## What changed, and why

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
cells, where the reader has just seen one of each.

### What the reader already knows

Taken from the course map's entries for the pages before this one (none of
`first-steps`, `compiler-errors`, `types-and-their-sizes` or
`making-decisions` is drafted yet):

- *exception* is defined on `powers-in-csharp`, with the three things that
  can happen when you press Run;
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
page's subject, and because a reader may arrive here first.

### The lesson, section by section

**Opening (`a-first-error-1`).** dewlab opened with a misspelt name, which
is CS0103 in C# and belongs to `compiler-errors`. The course map says this
cell "becomes an exception". It is now a program that asks how many places
to move each letter, with a real `Console.ReadLine()`. The reader types `3`
(it runs: `A moves to D.`) and then `three` (it stops with a
`FormatException` at line 4). The prose says the word is a mistake on
purpose. The checker types `three` (`stdin: "three\n"`, `expect:
exception`). This opening makes the page's main point at once: the
compiler found nothing, because the problem is in a value that nobody knew
until the program ran. dewlab's paragraphs on why messages matter are kept,
adapted: a .NET report puts its most useful line at the top, not the
bottom, and the page now names four things it is about, not three.

**Three kinds of wrong** became **Three things can happen when you press
Run**, in the style guide's words (`#the-compiler`): it does not compile,
it stops with an exception, it runs. The course map asks for this opening.
*Runtime error* and *run time* are named once, as the words some books use
for an exception. *Logical error* keeps dewlab's definition. The table has
the same three rows, with "C#, while the program runs" in place of
"Python".

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
  compiler does not suggest names.
- `runtime-errors-2` is new: the course map's predict on a `double` divided
  by zero. It prints ∞. A paragraph after it shows that dividing by zero can
  end in each of the three ways: `60 / 0` does not compile (CS0020), an
  `int` variable holding 0 stops with an exception, and a `double` runs and
  prints ∞. The first of these is a probe, not a cell (open question 5).
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
- dewlab's `dl-traceback` drawing is replaced, for now, by a `console`
  fence with the report exactly as `dotnet run` printed it for this program
  (see "Where each number comes from"), with the folders removed from the
  path. The course map says the drawing returns "once `web/` draws one".
  The list after it reads the report from the top, not from the bottom:
  *Unhandled*, the exception's name, `System.`, the message, the file and
  line, and `Program.<Main>$`. One sentence tells readers from Python that a
  .NET report is the other way up. "The line that failed is not always the
  line that is responsible" is unchanged.
- `a-short-traceback-2`: dewlab set `typed = "seven"` "as if somebody had
  typed" it. Now the program really asks, the reader types `seven`, and the
  checker has `stdin: "seven\n"`. That changes the answer to "which line is
  responsible": the value arrived from the keyboard, so the fix is for the
  program to say what to type and check what it got. dewlab has no answer
  fold here; one is added, because the question now has a less obvious
  answer, and it points to the later page on reading input (`TryParse`).

**When nothing looks wrong** became **When there is no message** (see open
question 2).

- `when-nothing-looks-wrong-1` is the same (250 where 200 was meant, in
  `int`), with its predict.
- A paragraph adds the course map's "case only C# has": `"10" + 2` compiles
  and gives 102, where Python stops. The reader met it in
  `runtime-your-turn-1`, so the paragraph points back to it rather than
  adding a cell.
- `when-nothing-looks-wrong-2` keeps both worlds. The secret-messages
  variant uses `char` arithmetic, as `storing-and-computing` does, and
  prints `[`; its note explains 23, 26 and `[`. The pixel-art variant is in
  `int` and prints 280 (140 with brackets). Their hints now have
  `after: 1 runs`, because these cells run without an error, and the
  default (`after: 1 errors`) would never show them.

**Looking back.** The question is asked in terms of the three things that
can happen when you press Run. The challenge keeps its shape (one mistake
of each kind), rebuilt for C#: a missing `;` (CS1002), `int.Parse("16
million")` (a `FormatException`, where dewlab had a name never made), and
`width + height / 2`. The closing paragraph keeps dewlab's "most exact and
most patient help", and links to the practice page.

**Where to read more.** The Corey Schafer video (Python `try`/`except`) is
replaced by Microsoft Learn's *Exceptions and Exception Handling* for C#,
which returned HTTP 200 on 27 September 2026 with that title. dewlab's
video library (`planning/video-library/`) has no C# video on exceptions.

### The practice page

Problems keep dewlab's order and ids. One problem is new
(`naming-the-error-early-6`), inside problem 4.

1. **Which kind:** the same four, rewritten, and one new. (a) `if total >
   10` without brackets is CS1003. (b) `10 + "5"` prints 105 in C#, where
   Python stopped. (c) `int.Parse("thirty")`. (d) an `int` average over a
   count of 0. (e) is new: a `double` average over 0 is ∞, a logical error.
2. **Five times two** became **Five plus two**, as the course map says:
   `"5" * 2` does not compile in C#, so the problem is `"5" + 2`, with a real
   `ReadLine` (`stdin: "5\n"`), and prints 52. The id `five-times-two-1` is
   kept (open question 8).
3. **A number from text:** the same, with `int.Parse` (24).
4. **Name the error** became **Name what happens**. The comments now ask
   which of the three things happens. The first cell, a `TypeError` in
   Python, is now `value * 3`, which does not compile (CS0019); the answer
   says `value + 3` gives 123, the reverse of dewlab's note. The third
   (`mesage`) is CS0103, and the answer says that the C# compiler, unlike
   Python, does not suggest a name. The fifth, `17 % 0`, does not compile
   in C# (CS0020): the compiler sees the constant 0. The new sixth is an
   `OverflowException` (`int.Parse("8000000000")`), with `Int32` explained.
   The prose says all five are meant to fail.
5. **A decimal comma:** the course map's surprise. On the page's `en-IE`
   settings, `double.Parse("12,50")` is 1250, not an exception, because the
   comma separates thousands. It is now a real `ReadLine` program
   (`stdin: "12,50\n"`). The answer says that with German settings the same
   text is twelve and a half (probe `p-german-comma`), and keeps dewlab's
   point that the person typing made no mistake.
6. **Where to look first:** the report is read from the top. The syntax
   marker half became "which compiler message first", which links back to
   `compiler-errors`.
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
   the `* 100`. It prints 16.666666666666664 (about 16.67, probe); the
   solution prints 20. Its hint has `after: 1 runs`.
10. **Exactly on the line:** the same, with braces. `string pixel;` is
    given a value in both branches.
11. **The habit that catches them:** "ten percent of 50 is 5" became "a
    rise from 50 to 60 is 20%", from problem 9. The link to
    `building-reusable-tools` is plain text (batch rule 3).
12. **Two at once:** dewlab's two syntax errors are one compiler error in
    C# (a missing `;`, CS1002) and one exception (`"12O"`, with the letter
    O for a zero). Fixing the first shows the second, which keeps dewlab's
    point in C# terms: a new message after a fix can mean the program got
    further. (A C# compiler reports every error it finds, not only the
    first, so dewlab's "Python stops at the first thing it cannot read" is
    not true here and is gone.)
13. **Next year:** now a real `ReadLine` (`stdin: "30\n"`). In C# it prints
    `Next year you will be 301`, where Python stopped with a `TypeError`. The
    solution note adds a C# point: `"..." + int.Parse(age) + 1` still gives
    301, because the `+` signs go from left to right (probe
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
*infinity*, *run time*, *.NET*, *unhandled*, an exception's *message*, and
`Program.<Main>$`. The practice page adds `Int32`.

## What C# made different, in short

- Most of dewlab's runtime errors are compiler errors in C#: a name that
  does not exist, and text used as a number (`"5" * 2`). They left for
  `compiler-errors`, and the page is about values, not types.
- `+` with a string joins without complaint, so two of dewlab's `TypeError`
  problems are now logical errors (102, 52, 301).
- Whole-number division by zero is an exception; `double` division by zero
  is ∞ with no exception; and a constant 0 does not compile (CS0020).
- `int` has a limit, so `int.Parse` has a second exception,
  `OverflowException`.
- The report is read from the top.
- Input is real, so the reader types the mistake themselves, and the
  "responsible line" for bad input is the keyboard.
- `double.Parse` reads a comma as a thousands separator on Irish settings,
  so the decimal comma is a silent logical error, not an exception.
- Integer division makes the "line responsible" problem in the practice
  page (`12 / 47` is 0).

## Where each number in the prose comes from

Recorded outputs are in the two `.native.json` files. On the page, a
compiler message starts with `Program.cs`. The native check labels it with
the cell id instead; line and column match. For an exception, the native
check prints the type, the message and `(at <cell id> line N)`.

| Number or claim | Source |
|---|---|
| typing `3`: `You typed 3.`, `A moves to D.` | probe `t-first-error-typed-3` |
| typing `three`: `You typed three.`, FormatException and its message, line 4 | lesson cell `a-first-error-1` |
| `The price is €12.`, then FormatException for `free` at line 4 | lesson cell `runtime-errors-1` |
| `int.Parse("3000000000")` stops with OverflowException; `int` holds up to 2147483647 | probes `t-overflow`, `t-int-max` |
| DivideByZeroException with `%` as well as `/` | probe `t-remainder-zero` |
| ∞, larger than any number | lesson cell `runtime-errors-2`; probe `t-double-zero` |
| `60 / 0`: `error CS0020: Division by constant zero` | probe `t-constant-zero` |
| 102; FormatException for `not a number`; CS0103 and the CS0219 warning; DivideByZeroException | lesson cells `runtime-your-turn-1..4` |
| 12 | lesson cell `runtime-the-fix-1` |
| `int.Parse(Console.ReadLine())` stops when somebody types `thirty` | probe `t-thirty` |
| `Each person pays €20`, then DivideByZeroException at line 5 | lesson cell `a-short-traceback-1` |
| the console report (`Unhandled exception. ...`, `Program.<Main>$(String[] args)`, `Program.cs:line 5`) | `dotnet run` of the same program in a scratch console project (SDK 10.0.401), 27 September 2026; the path before `Program.cs` removed |
| typing `seven`: FormatException and its message, line 3 | lesson cell `a-short-traceback-2` |
| `double.Parse` reads `7` and `7.5` | probe `t-hours-typed` |
| 250; 200 halfway | lesson cell `when-nothing-looks-wrong-1`; probe `t-middle` |
| `[`, then A with brackets; 3, 23, 26, 0 | lesson cell `when-nothing-looks-wrong-2--secret-messages` and its solution; probe `t-letter-steps` |
| 280, then 140; 420; 255 is the largest colour value | lesson cell `when-nothing-looks-wrong-2--pixel-art` and its solution; probes `t-brightness-steps`, `t-int-max` |
| the challenge: CS1002, then FormatException after the `;` is fixed | probes `t-challenge-as-given`, `t-challenge-semicolon`, `t-challenge-fixed` |
| Python stops at `"10" + 2` | `python3 -c 'print("10" + 2)'`: `TypeError: can only concatenate str (not "int") to str` (not a NativeCheck probe) |
| Python names the error on a traceback's last line | dewlab's own page; not run here |
| practice 1: CS1003 first (then CS1026); 105; FormatException; DivideByZeroException; ∞ | probes `p-if-no-brackets`, `p-joins`, `p-thirty`, `p-int-average`, `p-double-average` |
| practice 2: 52; `int.Parse(typed) + 2` is 7 | practice cell `five-times-two-1`; probe `p-joins` |
| practice 3: 24 | practice cell `a-number-from-text-1` |
| practice 4: CS0019 and its text; `value + 3` prints 123; FormatException; CS0103; CS0020; OverflowException and its text; `long.Parse("8000000000")` works; 2147483647 | practice cells `naming-the-error-early-1..6`; probes `p-joins`, `p-long`, `t-int-max`, `t-remainder-zero` |
| practice 5: 1250; 12.5 with German settings | practice cell `naming-the-error-early-4`; probe `p-german-comma` |
| practice 7: `0% of the letters are E.`, DivideByZeroException at line 5; 12 / 47 is 0; 1200, 25, one letter in 4 | practice cell `reading-a-short-traceback-1` and its solution; probe `p-percent-steps` |
| practice 9: 10; 16.666666666666664 (about 16.67); 20 | practice cell `when-nothing-looks-wrong-practice-1` and its solution; probe `p-up-by-how-much` |
| practice 10: `.` at 128 with `>`, `#` with `>=`; 127, 128, 129 | practice cell `when-nothing-looks-wrong-practice-2` and its solution; probe `p-boundary` |
| practice 11: 200; 20% | probe `t-middle`; solution of practice 9 |
| practice 12: CS1002; then FormatException for `12O` at line 2; `.` for 120 | practice cell `fixing-early-1` and its solution; probe `p-two-at-once-first-fix` |
| practice 13: 301; 31; `+ int.Parse(age) + 1` still 301 | practice cell `fixing-early-2` and its solution; probe `p-next-year-parse` |
| 640 × 480, 60, 3 people, 14 an hour, 47 and 12, 50 and 60, 128 | the set-up of each task, carried over from dewlab or from `storing-and-computing` |

## To revisit once the page UI exists

- **What the page shows for an exception** (course map open question 9).
  The prose says "The page names the problem, `System.FormatException: ...`,
  and the line", and, under the console fence, "On this page, the report
  names the same parts". The engine returns the type, the message and
  frames with a line (`docs/ENGINE_API.md`), so the parts are safe, but the
  words and the order are not. When `web/` draws an exception, check both
  sentences, and replace the console fence with a drawing of the page's
  own report if the course map's plan still holds.
- **∞ and 1250 in the browser.** Both depend on the `en-IE` culture data.
  The native check has the SDK's ICU. Browser .NET may ship different
  globalisation data, and `∞` could be `Infinity`, or the comma rule could
  differ. The browser checker's `outputs.json` settles it; if either
  changes, the predict's third option, the paragraph after it, practice
  1(e) and practice 5 change with it.
- **A cell that fails only with some typing.** `a-first-error-1` has
  `expect: exception` because the checker types `three`, but the reader
  types `3` first and it runs. If the page marks an `expect:` cell as
  "meant to fail" in its own label, that label is misleading on the first
  run. The same holds for `a-short-traceback-2`, where a reader who types
  `7` sees it run.
- **Warnings under errors.** `runtime-your-turn-3` and
  `naming-the-error-early-3` show CS0219 under CS0103. The lesson uses it
  as a clue. Check that the quieter warning style reads as a clue and not
  as a second failure.
- **Compare with a solution** on cells whose own code fails:
  `reading-a-short-traceback-1` (`expect: exception`) and `fixing-early-1`
  (`expect: CS1002`). What does the reader's column show before they
  change anything? And `fixing-early-2` has `stdin:` and a solution: check
  what the comparison does with a program that waits for typing.
- **The challenge** is a `csharp challenge` fence, which the checker does
  not run. The three probes `t-challenge-*` stand in for it.
- **Forward links to add** when their pages exist (batch rule 3; they are
  plain text now): "A later page, on reading input, shows how" (the answer
  fold of `a-short-traceback-2`) goes to `reading-input` (batch 4); "A
  later page, on debugging bigger programs" (Looking back) goes to
  `when-it-goes-wrong` (batch 8); "A later page, on reusable methods"
  (practice 11) goes to `building-reusable-tools` (batch 7).
- **Back links** go to pages not drafted yet: `compiler-errors` (three
  times; the prose assumes it reads a message in five parts, meets CS0103,
  says "read the first message first" with an example, and shows a
  warning) and the practice page. Check them against the real pages.

## Open questions for a reviewer

1. **"Wrong" in the title.** The course map's title ends "when it runs but
   is wrong", and the style guide lists *wrong* as a verdict word. It
   describes a program, not the reader's work, so it was kept. An
   alternative with the same meaning: "Exceptions: when a program stops,
   and when it runs to an answer you did not mean".
2. **A heading renamed.** "When nothing looks wrong" became "When there is
   no message", for the same reason (the `equals-three-ways` draft renamed
   "Why idea A feels right" the same way). The cell ids
   `when-nothing-looks-wrong-*` are kept, so they no longer match their
   heading. No class has used the page, so this is the last free moment to
   rename them.
3. **Four `FormatException` cells** in the lesson (the opening,
   `runtime-errors-1`, `runtime-your-turn-2`, `a-short-traceback-2`). It is
   the exception a PDP learner meets most, and each cell asks something
   different, but `runtime-errors-1` could become a `DivideByZeroException`
   or an `OverflowException` for variety.
4. **`OverflowException`** is not in the course map's entry. It was added
   to the table, to practice 4 and to nowhere else. Keep it, or leave
   overflow to `types-and-their-sizes`?
5. **CS0020 as prose.** `60 / 0` not compiling is stated from a probe, not
   shown in a cell. A small cell with `expect: CS0020` would make "each of
   the three ways" a run rather than a claim, at the cost of a fourteenth
   cell. Practice 4 has one (`17 % 0`).
6. **`Program.<Main>$`** is explained in one sentence. It is what a learner
   sees in Visual Studio, but it is heavy for a first report. If the page's
   own report leaves it out, that sentence can go.
7. **"C#, while the program runs"** in the three-things table. Strictly it
   is .NET that raises the exception. The page names .NET later, in the
   report section. Is "C#" the plainer choice here?
8. **Practice ids kept for changed tasks.** `five-times-two-1` is now
   "five plus two", `naming-the-error-early-*` is "name what happens", and
   `reading-a-short-traceback-1` has new code (the same question). The
   course map treats each as the same problem in C#, so the ids are
   dewlab's. `naming-the-error-early-6` is new.
9. **`"12O"` in practice 12.** The letter O for a zero is a real typing
   mistake, and the exception's message quotes it. In some fonts,
   including some dyslexia fonts, O and 0 are hard to tell apart. Keep it,
   or use another value (`"12 0"`, `"one20"`)?
10. **Two FOOP drafts use "stack trace"** (`the-tools-around-your-code`).
    This PDP page says *exception report* and does not use "stack trace",
    because its reports have one line of place. `when-it-goes-wrong` could
    introduce "stack trace" when a report has several.
11. **Practice title.** "Exceptions: practice" follows
    `storing-and-computing-practice`; the FOOP drafts use "… — Practice".
    One form should be chosen for all practice pages.

## Probe cells

These are not part of the lesson. Each checks a claim in the prose that no
lesson cell prints. `t-` probes are for the lesson, `p-` probes for the
practice page.

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
