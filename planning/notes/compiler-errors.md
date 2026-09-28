# compiler-errors: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (PDP
lesson 4; FOOP lesson 2, shared: one page, one id, one set of saved work).
It draws on three dewlab pages: `reading-an-error-message` (its section
"Errors Python catches before it starts", its four broken programs, and
its "three kinds of wrong"), `when-python-says-no` (Dewey Track: "Mistakes
Python finds before it starts" and "Compilers, linkers and Python") and
`reading-an-error-message-practice`. `from:` names the first of them.
dewsharp's own `reading-an-error-message` also has that `from:`; it took
the exceptions and the logical errors, and this page took the compiler
errors.

Files:

- `lessons/compiler-errors/compiler-errors.md`: the lesson. 12 program
  cells, 10 of them meant not to compile (`expect:` on each, and the prose
  says so before the reader runs it). 3 predicts, all `choice`. 9
  solutions, 2 hints, 2 folds (`dl-why`), 3 tables, 1 challenge. No worlds
  (the course map's "Lessons with no worlds"). No classes, no `var`.
- `lessons/compiler-errors/compiler-errors-practice.md`: 11 problems, 14
  program cells, 11 of them meant not to compile. 2 predicts, 7 solutions
  (problem 7 has two), 4 hints, 11 answer folds. Two problems are "From
  earlier" (7 and 9).
- The two `.outputs.json` files, written by the browser checker.

`npm run check-lessons -- compiler-errors` reports no problems (43 runs).
I also opened both pages in headless Chromium (`lesson.html?sw=off&id=…`):
every cell is labelled *program*, the status lines and the messages are the
ones the prose quotes, the warning shows in grey above the output, and
there were no page errors.

## What the page does, in order

1. **Opening.** `mesage.Length` on line 3; a predict ("What will appear
   under the cell?"). Nothing prints. The style guide's paragraph names
   compiling, then *compiler* and *compiler error* are defined. A solution
   records `MEET AT NOON` and `12`.
2. **Compiling: C# checks first.** What the compiler checks; a paragraph
   for readers who know Python; the three outcomes in the style guide's
   words; why finding a mistake before running is useful. Fold *What does
   compiling make?*: source code, processor, machine code, IL, the .NET
   runtime, the JIT compiler, architecture neutral, interpreter (FOOP's
   "compiler and interpreter; source code and machine code; architecture
   neutrality", from the course map's "What C# adds").
3. **Reading a message.** The five parts in a table, from the opening's
   message; *does not exist*, *current context*; clicking a message;
   Visual Studio's red wavy line and Error List (the same words as
   `the-tools-around-your-code`).
4. **The messages you will meet most.** One small section each: CS0103
   (`print` and `console`), CS1010 with CS1026 and CS1002 (one missing
   quote, three messages, and "read the first message first"), CS0029
   (`int age = Console.ReadLine();`, with a predict on which of the three
   outcomes), CS0266 (and why it has a different code from CS0029),
   CS0165, and the warning CS0219 (with a predict).
5. **Your turn: four broken programs.** CS0246, CS1012, CS1003, CS1026,
   each with a solution, and a paragraph on each afterwards. Fold *What
   joins the parts of a program?*: linker and linking, libraries,
   references, `using` lines, and CS0246, CS5001 and CS0017.
6. **Your turn: break it on purpose.** A working cell; the reader writes
   the code they expect in a comment, then breaks one thing at a time.
7. **The codes on this page**: a table of all eleven codes.
8. **Looking back**, the challenge, what comes next, **Where to read
   more**.

## What I decided, and why

1. **The opening misspells `message` as `mesage`, not `total` as `totl`.**
   The style guide's example message is about `totl`. I tried it first
   (`int total = 12 + 30;` then `Console.WriteLine(totl);`). The compiler
   then also warns that `total` is never used (CS0219 on line 1, in the
   scratch probe), which puts a warning on the first cell of the page,
   before warnings are taught. `mesage.Length` keeps the column at 19 on
   line 3 and gives one message. `mesage` is dewlab's own misspelling on
   its `a-first-error-1`. The course map asks for "what will the first two
   lines print?". Only line 2 prints in this program, so the predict asks
   "What will appear under the cell?", and its options describe the output.
   A question that named a line would not work on a cell whose output is
   empty.
2. **The five parts of a message follow the style guide**: the file, the
   line, the column, the code, and what the compiler found. The word
   `error` (or `warning`) is described separately, in the paragraph under
   the table. `first-steps` counts five parts differently (the file, the
   place, `error`, the code, what the compiler found). See "Open", 1.
3. **Codes beyond the course map's list.** The map lists CS1002, CS0103,
   CS1026, CS1010, CS0029, CS0266, CS0165 and CS0219. All are on the page.
   CS1002 has no cell of its own in the lesson: `first-steps` already has
   one, it appears as the third message in `a-quote-left-open-1`, and
   practice problem 4 has three of them. Added, because the probes showed
   a learner meets them with the same mistakes:
   - **CS1003** (`Syntax error, ',' expected`). A missing semicolon after
     a declaration, followed by another statement, gives CS1003, not
     CS1002 (`int count = 5` then `Console.WriteLine(count);` is
     `(2,14) CS1003`). This is C#'s case of dewlab's "the marker points a
     little to the side", so it is the third broken program, and the prose
     explains why the compiler asks for a comma.
   - **CS1012**: text in single quotes, a habit from Python. It replaces
     dewlab's indentation program, which has no C# counterpart.
   - **CS0246**: `Int` with a capital I. It gives the linking fold a real
     message on the page.
   - Practice only: **CS0117** (`Console.Writeline`), **CS0019**
     (`"12" * 3`, met in `storing-and-computing-practice`), **CS0168**
     (declared and never used).
4. **Four broken programs, as dewlab's syntax section had.** dewlab's four
   were a misspelt keyword, an unclosed string, a line not indented, and an
   unclosed bracket. Here: a type the compiler cannot find, text in single
   quotes, a step with no end, and a bracket that never closes. The
   unclosed string is the lesson's "A quote left open" section, and
   practice problem 3.
5. **CS5001 and CS0017 are named in the fold, not run.** Both need a class
   with a `Main`. PDP's first class is on `building-reusable-tools`
   (lesson 22), and `CLAUDE.md` says early PDP pages mention only rule 1.
   The course map's entry says the fold "names" them. The fold describes
   each in plain words and quotes no message text, because no cell on the
   page records it. The scratch probe confirmed that the page can produce
   both (see "Probes", below), so a later page could show them.
6. **The fold on compiling uses the words of `how-we-got-here`**:
   *Intermediate Language*, or IL; the *.NET runtime*; "changes the IL into
   machine code". It says that on the page the runtime runs the IL with an
   interpreter (`planning/evidence/spike_a.md` and `critique.md`: Roslyn
   and the learner's code run under the WebAssembly interpreter). It leaves
   out that .NET's WebAssembly runtime also compiles code that runs often
   into WebAssembly as it goes. That detail is true, and it would not help a
   Level 5 reader. *Just in time* and *architecture neutral* are defined
   where they appear.
7. **Predicts: three on the lesson, two on the practice page.** Two of the
   lesson's are on cells meant not to compile, where the interesting
   question is which of the three outcomes happens. The warning's predict
   has `MEET AT NOON` as an option, which is the output itself, so the page
   can see that a guess matched. The practice page's predicts are both on
   cells that run, and each has the output among its options.
8. **The break-it task has no answer fold.** Each answer would quote a
   message that no cell records. The reader's own run is the answer. The
   list ends with deleting the `$`, which gives no message at all (the
   variable `letters` is still used, and a non-constant value never gives
   CS0219). What each mistake gives, from the probe, is below, for
   teachers.
9. **The challenge changed.** dewlab's challenge is a program with one
   error of each kind in it. A `challenge` block must compile on its own
   (decision 40), so this one starts from a program that compiles, and asks
   for five different codes at once, and whether the first message is
   always about the first change.
10. **Input.** `a-value-of-another-type-1` has `stdin: "34\n"`. The cell
    itself never runs, but its solution reads a line, and the checker runs
    the solution with the cell's `stdin:`. The solution's note quotes
    `Next year you will be 35` from that run.
11. **Terms defined where they first appear**: compiling, compiler,
    compiler error, source code, processor, machine code, IL, .NET runtime,
    JIT compiler, architecture, architecture neutral, interpreter, column,
    *does not exist*, *current context*, constant, newline, convert,
    implicitly, explicit, assign, unassigned, local variable, warning,
    literal, syntax, linker, linking, library, reference, `using` line. The
    practice page adds *declare* and *operands* (the latter again, as in
    `storing-and-computing-practice`).
12. **Links** go only to pages in `lessons/`: `first-steps`,
    `storing-and-computing`, `powers-in-csharp`, `dividing-in-csharp`,
    `reading-an-error-message` (*Exceptions*), `how-we-got-here`, and the
    practice pages. *Types and their sizes* is in italics (decision 32).
    The next page differs by course, so the closing paragraph names
    *Dividing* (PDP's next) and *Types and their sizes* (next in both).
13. **"Where to read more"**: Microsoft's *Compiler messages* page and
    *Managed execution process* (both fetched on 28 September 2026; the
    first says to type the code in *Filter by title*, the second describes
    CIL and the JIT compiler), and CrashCourse #11, which `how-we-got-here`
    already cites and dewlab's video library lists at 11.9 minutes.

## What I left out

- dewlab's runtime errors, tracebacks and logical errors: they are on
  dewsharp's `reading-an-error-message`.
- `when-python-says-no`'s warm-up questions (dewsharp has no `question`
  blocks), its "four questions" frame (a Dewey Track idea that no dewsharp
  page uses), the Harvard Mark II moth aside, and its "Why this way?" fold
  about putting errors early. The fold could come back if Josh wants the
  reason for the page's place in the course on the page itself.
- dewlab's claim that the compiler reports only one mistake at a time. C#
  reports every mistake it can find in one pass, so the practice page
  shows the other side: a change can remove messages, and it can also
  reveal a new one (problem 2).
- A separate "several mistakes" cell in the lesson. The practice page has
  it (problem 4), and the lesson says so.

## Probes

Run in the browser engine, in a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), on 28
September 2026. None of these is quoted on the page.

- `class Game { static void Main(int x) { … } }`: `(1,1) error CS5001:
  Program does not contain a static 'Main' method suitable for an entry
  point`, and `warning CS0028: 'Game.Main(int)' has the wrong signature to
  be an entry point`.
- Two classes, each with `static void Main()`: `(3,17) error CS0017:
  Program has more than one entry point defined. Compile with /main to
  specify the type that contains the entry point.`
- A class with `static void main()` (small m) is a *types* cell, so it is
  checked, not run, and gives no message.
- `StringBuilder letters = new StringBuilder("HELLO");` gives two CS0246
  messages; with `using System.Text;` above it, it prints `HELLO`.
- `int age = (int)"34";` is `CS0030: Cannot convert type 'string' to
  'int'` (so "not even with a cast", in the CS0029 paragraph, holds).
- `int count = 5, total = 0;` compiles and prints `5 0`.
- `int total = 12 + 30;` then `Console.WriteLine(totl);`: CS0103 and
  CS0219 (decision 1).

What each mistake in "break it on purpose" gives (the cell's lines 3 to 5):

| Mistake | Messages |
|---|---|
| no semicolon on line 3 | CS1003 on line 3; CS0103 `letters` on line 5 |
| no closing quote on line 3 | CS1010, CS1003 on line 3; CS0103 `letters` on line 5 |
| `Letters` in the last line | CS0103 `Letters` |
| `string` in place of `int` on line 4 | CS0029, `int` to `string` |
| no `= message.Length` | CS0165 `letters` |
| no last `)` | CS1026 |
| no `$` | none: it runs, and prints the curly brackets |

(The probe had no comment lines at the top, so its line numbers were two
lower; the codes are the same.)

## For other pages (not done here: the brief allows only these files)

- **Links that can now be made.** `compiler-errors` exists, so these
  mentions of *Compiler errors* in italics can become
  `[Compiler errors](lesson:compiler-errors)` (decision 14 has the batch
  that writes a page add them): `storing-and-computing.md` (the closing
  "Next" paragraph), `storing-and-computing-practice.md` (problem 5's
  fold), `reading-an-error-message.md` (two places near the top),
  `reading-an-error-message-practice.md` (problem 6's fold),
  `objects-and-classes-practice.md` (problem 7) and
  `the-tools-around-your-code-practice.md` (problem 9).
  `a-total-that-starts-again`'s notes say its sentence about CS0103 could
  link here too.
- **The course files.** `courses/pdp.yaml` and `courses/foop.yaml` still
  list `compiler-errors` under `planned:`. The playbook's checklist says to
  delete that line once the lesson is in `lessons/`.
- **`reading-an-error-message`'s notes** ask whether this page reads a
  message in five parts, meets CS0103, shows "read the first message
  first" with an example, and shows a warning. It does all four
  (`a-first-error-1`, `a-quote-left-open-1`, `warnings-1`), and practice
  problems 2 and 3 are examples of a change that removes other messages.
- **A page behaviour.** On a cell meant not to compile, the page always
  counts a guess as different from the output (`web/page/lesson.js`,
  `notePrediction`: a match is tested only when the outcome is `ok`). So a
  reader who chose "Only a message about line 3" is still asked "Which
  line explains what you saw?", and `after: guess differed` hints would
  count it. None of this page's hints uses `guess differed`, and the note
  under the chosen option still explains. See "Open", 4.

## Open

Questions only Josh can settle.

1. **The five parts of a message.** The style guide's `#the-compiler` lists
   the file, the line, the column, the code, and what the compiler found.
   `first-steps` lists the file, the place (line and column together),
   `error`, the code, and what the compiler found. This page follows the
   style guide. Should `first-steps` change to match, or the style guide
   to match `first-steps`?
2. **CS5001 and CS0017 are named, not shown.** Is naming them enough for
   PDP's "interpret compiler and linker messages", or should a later page
   with classes (`building-reusable-tools` in PDP, `the-tools-around-your-code`
   in FOOP) run a cell for each? The probes show the page can produce both.
3. **"Next" on a shared page.** This page is fourth in PDP (next:
   *Dividing*) and second in FOOP (next: *Types and their sizes*). It names
   both in one sentence. Should shared pages have a standard way to say
   what comes next in each course?
4. **Guesses on cells that do not compile.** Should the page treat "Only a
   message" (or *Nothing*) as the same as a program that did not compile,
   as it treats *Nothing* for a program that printed nothing (decision 37)?
   As it is, the reader is asked "Which line explains what you saw?" after
   a guess that matched.
5. **How much Python.** The page mentions Python four times: in the first
   predict's note, in a paragraph for readers who know it, for `print`, and
   for single quotes. That helps FOOP readers and people who tried Python
   before. Is it too much for a PDP reader who has never seen Python?

## Review

A second reader went through both pages on 28 September 2026: once as a
Level 5 learner who has read only `first-steps`, `powers-in-csharp` and
`storing-and-computing` (PDP) or `from-python-to-csharp` (FOOP), once as a
teacher against the course map's entry, and then against the playbook's
checklist and the style guide's. Every quoted message, line, column and
output was checked against the two `.outputs.json` files, and all of them
match. No cell's code changed, so the versions and the outputs files are
as the writer left them. `npm run check-lessons -- compiler-errors`
reports no problems (43 runs).

### What changed in the lesson

- **The opening.** "a name that is not quite the name of anything" (vague,
  and *not quite* is an idiom) became "a name with a letter missing".
- **What the reader has met.** The paragraph after the first solution said
  that pages "met" errors. It now says that *you* met them, on which page,
  and adds one sentence for FOOP readers: [C# for Python
  programmers](lesson:from-python-to-csharp) showed the same CS0029. "all of
  these messages" became "messages like these".
- **Compiling.** "Only when the whole program passes does anything run"
  (inverted, hard for a second-language reader) became "Nothing runs until
  the whole program passes these checks". The Python paragraph said that
  Python "checks that a program is written in Python"; it now says that
  Python checks some things first, such as a bracket or a quote that never
  closes. The sentence before the three outcomes now starts as
  `first-steps` and `from-python-to-csharp` do ("one of three things
  happens, and this site always names them the same way"), and says where
  the words appear: beside the **Run** button (`web/page/cell.js` writes
  *Did not compile, so nothing ran*, *Stopped with an exception…*, *Ran*).
  "can wait for weeks" became "can be there for weeks".
- **Terms that were used before they were defined.** *.NET* (first used in
  the fold *What does compiling make?*, and defined nowhere in PDP before
  it) now has a sentence. *Namespace* (in CS0246's message) is defined in
  the paragraph about the first broken program. *Visual Studio* gets a
  short description at its first mention. The fold on linking ties the
  message's words to the page's: *using directive* is the `using` line, and
  *assembly reference* is the reference. *JIT compiler, for just in time*
  became "JIT is short for *just in time*".
- **The five parts.** One sentence now bridges to the earlier pages:
  `first-steps`, `powers-in-csharp` and `from-python-to-csharp` all call
  `(line,column)` the *place*. The page keeps the style guide's five parts.
  Open question 1 still stands; this sentence can go when it is settled.
- **CS0103.** "CS0103 nearly always means that a name is spelt in two ways"
  was not true of the cell above it (`print` is not a misspelling). It now
  says what to do when you meet CS0103, and that the two names are often
  the same name spelt in two ways.
- **A quote left open.** "Add the closing quote after the `!`, and all
  three disappear" became a question the reader answers by running it.
  "Make the change that the first message asks for" became "Change the
  place that the first message names": two sections below, CS1003 asks for
  a comma when the change is a semicolon, so the old words would have led
  a reader to add a comma. The practice page had the same wording (below).
- **A value of another type.** The prose said the cell "is meant not to
  compile" and then asked which of the three outcomes it would be, which
  gave the predict away. It now says "meant to fail", as
  `powers-in-csharp` does before the same kind of predict.
- **Warnings** became a section of its own (`##`). Under *The messages you
  will meet most*, the sentence "Each cell in this section is meant not to
  compile" was not true of `warnings-1`, which runs. The heading's anchor
  (`#warnings`) is unchanged, and nothing linked to it.
- **The four broken programs.** The CS1012 hint became "Which quotes does
  a `string` use, and which does a `char` use?". The CS1003 paragraph now
  says "the compiler read lines 2 and 3 as one step" instead of "continued
  into line 3, as if … were one step". The CS1026 paragraph said column 20
  was "just before the semicolon"; column 20 *is* the semicolon (`int
  result = (5 + 3;`), so it now says that the compiler expected a `)`
  there. *Literal* is now tied to the *constant* of CS1010, since both were
  defined as "a value written in the code".
- **The fold on linking.** CS5001's row said "In Visual Studio. There, and
  in many books, a program starts in a method called `Main`", but a new
  Visual Studio project uses top-level statements, as
  `the-tools-around-your-code` says. It now says that the program has no
  place to start, gives an example (an empty `Program.cs`), and drops
  "statements", a word PDP has not used (it says *step*). A probe with the
  .NET 10 SDK confirmed that an empty `Program.cs` in a console project
  gives CS5001. "It looks for every part" became "It searches for every
  part".
- **The codes table.** "What to look for" became "What to check". CS0029's
  row now covers every CS0029 on both pages (`string` to `bool` and to
  `char`, and `int` to `string` in *break it on purpose*), not only text
  and numbers.
- **Looking back.** "The compiler found every mistake on this page" was not
  true: *break it on purpose* ends with a missing `$` that the compiler
  does not find. It now says "nearly every", and names the `$`.
- **The closing.** "none of it needs Visual Studio", as the other pages say.
  What comes next now uses the sentence that `types-and-their-sizes` uses
  for the same problem ("The next lesson depends on your course: …"), and
  *Types and their sizes* is now a link, because the page is in `lessons/`
  (`from-python-to-csharp` already links it). "assembly" in the video's
  description became "assembly language", so that it is not confused with
  the *assembly reference* in the fold.

### What changed in the practice page

- Problem 1 links the lesson's table
  (`lesson:compiler-errors#the-codes-on-this-page`). Its answer on CS0266
  no longer says that an `int` cannot hold the decimal part "without a
  cast" (it cannot hold it with one either).
- Problem 2 was titled "Change what the first message asks", and asked the
  reader to "make the change that the first message asks for". That
  message is CS1003, which asks for a comma, and the change it needs is a
  semicolon. The title is now "Change one place, and count again", and the
  task says "change only the place that the first message names". Problem
  8's fold says the same.
- Problem 5 had no sentence before its cell. It now says what the program
  was meant to print, so the reader knows what the program is for.
- Problem 6 said "Which of them runs?" and then "The second is meant not to
  compile", which answered the question. It now says "One of them is meant
  not to compile. Which one do you think runs?"
- Problem 7's link goes to problem 5 of `storing-and-computing-practice`,
  where CS0019 first appeared.
- Problem 9 opened with a sentence that had no verb ("From [Your first C#
  program], [Powers] and [Variables and types]."). It is now "This problem
  comes from …".
- Problem 11, "Better news" / "better news than", became "Which is more
  useful?" / "more useful than", which reads literally.

### What I checked and left

- Every program cell works on its own, and no cell uses anything that the
  reader has not met (`Console.Write`, `.Length`, `int.Parse` and casts are
  all in `storing-and-computing`). There are no classes, so the page needs
  only rule 1, and it does not name the rules.
- Three predicts on the lesson and two on the practice page. No option is
  marked right. The one question that names a line (practice problem 9,
  *the second line*) has that line in its output.
- Every cell meant to fail has `expect:`, and the prose says so before the
  reader runs it (problem 6 now says "one of them").
- No *right*, *wrong*, *correct* or *well done*; no American spellings.
- Hints: every first hint asks a question, and every hint is on a cell
  that fails to compile, so `after: 2 errors` always comes.
- Solutions and inputs are on the cells that run them.
- The course map's entry: every code it lists is on the page; the two
  folds, the four broken programs and *break it on purpose* are there; the
  practice page has the five kinds of problem it lists, plus two from
  earlier pages. CS1002 has no cell of its own in the lesson (the writer's
  decision 3); it is the third message of `a-quote-left-open-1` and has its
  own practice problem, and `first-steps` has a cell. I agree with that.

### Still open for Josh (added by the review)

6. **A FOOP link on a shared page.** The lesson now links
   `from-python-to-csharp` once, for readers who came from Python. PDP
   readers see it too. Is one sentence like this the way a shared page
   should speak to both courses at its start, as `types-and-their-sizes`
   does at its end?
7. **The course files** still list `compiler-errors` under `planned:` in
   `courses/pdp.yaml` and `courses/foop.yaml` (the playbook says to delete
   the line once the lesson is in `lessons/`). The brief does not allow this
   review to edit them.

Open question 3 ("Next" on a shared page) is now answered in practice by
`types-and-their-sizes`' sentence, which this page copies. It still needs
Josh's word if every shared page is to say it the same way.
