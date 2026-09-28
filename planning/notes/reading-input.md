# reading-input: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (PDP
lesson 12; FOOP lesson 4, shared: one page, one id, one set of saved work).
Action *new*, shape *tutorial*, size M, batch 4, worlds secret messages and
pixel art. It draws on three dewlab pages: `from-cells-to-a-program` (its
sections "A loop that waits for quit" and "Asking until the answer makes
sense"), `storing-and-computing` ("Type conversion", with its commented-out
`input()` cell) and `reading-an-error-message` (the `ValueError` from
`int("not a number")`, and the practice page's decimal comma). `from:`
names the first, the page whose two sections this one grows from.

Files:

- `lessons/reading-input/reading-input.md`: the lesson, version
  `2026.09.28.2`. 14 exec cells, all program cells: 10 shared and 4 in
  world variants, so 12 on show in either world. 2 predicts (both
  `choice`), 13 hints, 5 solutions, no `inputs` blocks, 1 answer fold
  (the hint and the fold were added in review), 1
  challenge. 2 cells are meant to stop with an exception, and the prose
  says so before the reader runs them (`text-that-should-be-a-number-1`,
  `when-there-is-no-more-input-1`). 11 cells read input and have
  `stdin:`; `when-there-is-no-more-input-1` reads input and has none, on
  purpose: the checker's "no input" is the reader's **End input**. No cell
  warns. No classes, no `var`.
- `lessons/reading-input/reading-input-practice.md`: the practice page,
  version `2026.09.28.1`, 11 problems. 14 exec cells, 2 of them in world
  variants (13 on show in either world), 1 of them empty (problem 4). 2
  predicts, 9 hints, 10 solutions, 6 answer folds. 5 cells are meant to
  fail, and each problem says so: two exceptions in problem 2, CS0165 in
  problem 6, CS0163 in problem 7, and an exception in problem 10.
- The two `.outputs.json` files, written by the browser checker.

`npm run check-lessons -- reading-input` reports no problems (50 runs). I
also opened the lesson in headless Chromium (`npm run serve -- --isolate`,
`lesson.html?sw=off&id=reading-input`) and drove it as a learner: typed
`Aoife`, then an empty line, into the first cell; pressed **End input** in
`when-there-is-no-more-input-1` (it stopped on line 4 with a
`NullReferenceException`, as recorded); typed `seven`, `30`, `7` into the
`do` loop; typed `1`, `one` and `1 ` into the menu and then pressed
**End input** (the menu printed `There is no choice one.`, `There is no
choice 1 .` and then `Goodbye.`: `case null` ends it); and typed `OTTER`
and `otter` into the colour cell (the console was cleared after the first
word, and `The two are different.` was red). Every cell is labelled
*program* and `Program.cs`. Both pages loaded with no page errors, and the
world chooser shows both worlds.

## What the page does, in order

1. **Opening.** A program that waits: `Console.Write` for the prompt,
   `Console.ReadLine()`, a greeting and the name's length. The reader types;
   nothing is typed for them. Defines *input*, *prompt*, *returns*.
2. **Text that should be a number.** The square program with `int.Parse`,
   run with `three` (`expect: exception`), and the page's report quoted.
   Defines *exception* again in one sentence, for FOOP readers who met it
   only on `types-and-their-sizes`.
3. **Checking before converting.** `int.TryParse` on `"42"` and `"seven"`,
   with a predict on the second line (the distractor `seven: False, 42`
   asks whether a failed `TryParse` keeps the old value). Defines `out`.
   Then the square program with the pattern shown once (`if
   (int.TryParse(...))`), a three-step list, and *input validation*.
4. **Asking again.** The shift loop with `while` and a flag (defines
   *flag*); the experiment with `while` and `do` from 10, with a predict;
   names *post-test loop* against the *pre-test loop* of
   `repeating-yourself`; the same shift loop with `do`...`while`. Your
   turn in each world: make a program that asks once ask until the answer
   is in range (taps 1 to 26; a grey 0 to 255).
5. **When there is no more input.** Empty string and `null`; **End
   input**, Ctrl+Z on Windows, and the end of a file. The first program
   again, stopping with a `NullReferenceException`, and a solution that
   checks for `null`. Why the loops above would never end after **End
   input**.
6. **A menu.** A `do`...`while` round a `switch` with 9 to quit and
   `case null:` beside `case "9":`. Defines *switch statement* and *case
   label*; `break`, two labels on one path, `default`; `break` leaves only
   the `switch`. One cell with `Console.Clear()` and colours (a secret word
   typed twice). Your turn in each world: add decoding (secret messages),
   or make choice 1 ask for the square's size (pixel art).
7. **Looking back.** Three ways to read a number; *test data*, with the
   list a reader would try; a challenge (the bill from
   `reading-an-error-message`, asking again); Visual Studio; next pages.

## What I decided, and why

- **The first program is the shape every later page quotes.** Later pages
  already describe this page: `from-cells-to-a-program` says "Here is the
  loop from *Reading input* that asks again ... Try `seven`, then 30,
  then 7", and "The menu on *Reading input* ... had a different shape: a
  `do`...`while` loop around a `switch`", with a condition of its own;
  `a-program-of-your-own` gives a starter with `case "9": case null:` and
  `while (choice != "9" && choice != null)`; `a-front-end-for-a-class`
  says "A `switch`, as on *Reading input*, chooses one path from many by
  the value in its brackets. Each `case` is one value, `default` is the
  path for every other value, and each path ends with `break`";
  `writing-your-own-functions`, `looking-things-up-by-name` and
  `building-reusable-tools` say "`out` marks a variable (or parameter)
  that the method fills". So the shift loop uses the prompt `Shift, 1 to
  25: ` and the message `Please type a whole number from 1 to 25.`, the
  menu has exactly that shape, and the definitions use those words.
- **`null` comes before the menu.** The course map lists it after the
  menu ("the menu copes with it"). Taught first, the menu can have
  `case null:` from its first line, and there is no second copy of a
  25-line menu that only adds null handling.
- **The loops that ask again do not check for `null`.** After **End
  input** they ask again at once and for ever (the engine's end of input
  is sticky: `LineReader._eof` in `engine/Dewsharp.Browser/RunContext.cs`).
  The page says so, and says to press **Stop**. A null check in every loop
  would add three lines to the page's central example at the moment it is
  first taught. `from-cells-to-a-program` puts the same loop in a method
  that returns `false` when the input ends. See "Open", 2.
- **No `inputs` blocks.** On the page, **Compare with a solution** runs
  both the reader's cell and the solution with `stdin: ''`
  (`web/page/lesson.js`, `compareBlock`; `web/page/cell.js`,
  `runWithInputs`), so a program that reads input gets `null` at its first
  `ReadLine`, and a loop that asks again would spin until the 30-second
  limit. So every interactive task has a solution to read, and no table.
  The only candidate that doesn't read input is the clock in the practice
  page's problem 11, and it reads input on purpose. See "Open", 1.
- **Hints wait for runs, not errors**, on every task whose starter runs
  (`after: 2 runs`, `after: 3 runs`), as the format says. Each "your turn"
  also has an `after: 1 errors` hint for the error a reader is most likely
  to meet: CS0103 or CS0165 when the variable is made inside the `do`, and
  CS0128 when a second `case` makes a variable with the same name as the
  first (the paths of a `switch` share one scope; probed below).
- **Two predicts on the lesson**, where C# does something a reader would
  not expect: a failed `TryParse` sets its `out` variable to 0, and a
  `do` loop runs its body once when its condition is `false` from the
  start. The `int.Parse` exception gets no predict: PDP readers met it on
  `reading-an-error-message`, whose first cell is the same mistake, and
  FOOP readers know it from Python's `ValueError`. Each predict asks about
  one line, and its options include that line exactly.
- **The CS0165 point lives on the practice page.** `int shift;` with no
  value compiles before a `do` loop and not before a `while` loop. The
  lesson says why in two sentences, and problem 6 records the message, so
  the lesson quotes no message it did not record.
- **Worlds.** PDP's two, as the course map says; no "your own" (a shared
  page with PDP worlds, as `types-and-their-sizes` does). The shared cells
  use both worlds' material (a square in pixels, a shift, a letter), as
  `making-decisions` does; each "your turn" is the same size in both
  worlds.
- **The pixel-art menu task changes choice 1 rather than adding choice 2.**
  The course map asks for "a square of a size the reader types". Adding a
  second choice would repeat the secret-messages task; asking for the size
  inside a `case` uses the `TryParse` pattern and a range, and shows that
  a menu is itself the loop that asks again.
- **Colours.** One cell, as the entry asks: a secret word typed twice,
  with `Console.Clear()` between, so the clear has a reason, and green or
  red with words that say the same thing (the style guide's access rule:
  colour is never the only signal). `a-front-end-for-a-class` introduces
  them again for FOOP with an enum; this page does not use the word
  *enum*, because PDP has not met it.
- **The challenge** reuses the bill from `reading-an-error-message`
  (`double.Parse`, `int.Parse`), so PDP readers meet the same program
  again, now asking until each answer makes sense. It introduces
  `double.TryParse` by name only; the practice page's problem 3 uses it.
- **`from: from-cells-to-a-program`.** The entry is *new* and names three
  sources; this is the one whose sections the page grows from.
- **Version `2026.09.28.2`.** The lesson was recorded as `.1`, then two
  cells changed: the first cell's greeting became two lines (so that the
  `null` cell shows `Hello, .` before it stops), and the colour cell's
  comment became shorter (it wrapped in the editor). The practice page's
  cells have not changed since it was first recorded.
- **Cell ids** are new, `<section-slug>-<n>`, and world cells end in
  their world. No dewlab cell is kept with the same task, so no dewlab id
  was kept.

## Where each number and quoted output comes from

All from `reading-input.outputs.json` and
`reading-input-practice.outputs.json`:

- Lesson: `Hello, Aoife.`, `Your name has 5 characters.`
  (`a-program-that-waits-1`); the `FormatException` report and line 3
  (`text-that-should-be-a-number-1`); `42: True, 42`, `seven: False, 0`
  (`checking-before-converting-1`); `three is not a whole number of
  pixels.` (`-2`); `A moves to H.` (`asking-again-1` and `-3`); `do: 10`
  (`asking-again-2`); `8 taps is the letter H.`, `The grey is rgb(200,
  200, 200).` (the two `your-turn-1` solutions); `Hello, .`, line 4, the
  `NullReferenceException` message, `Nobody is there.`
  (`when-there-is-no-more-input-1` and its solution); the letters A, B, C,
  `There is no choice 7.`, `Goodbye.` (`a-menu-1`); `The two are the
  same.` (`colours-and-a-clean-screen-1`); KHOOR, NKRRU, KHOOR (the
  secret-messages `your-turn-2` solution); four rows of `####` (the
  pixel-art solution).
- Practice: every value in problem 1's fold (`which-texts-are-whole-numbers-1`);
  both exceptions and messages in problem 2; `The price is 1250.` and the
  solution's line in problem 3; `Next year you will be 42.`; `A row 32
  pixels wide.`; CS0165 at (9,46) and `A moves to H.`; CS0163 at (8,9)
  and its message; `Hello!`, `Goodbye!`; Z, A, Z in problem 9 (secret
  messages) and 128, 192, 255, 191, 127, 63, 0 (pixel art); the
  `IndexOutOfRangeException` message and line 3 in problem 10; `It will be
  4:00.` in problem 11.
- The limits in the prose (1 to 25, 0 to 255, 0 and 26 as test data) are
  the tasks' own ranges, not results.

## What I left out

- dewlab's `ask()` and `typed` stand-in, and its paragraph: C# waits for
  real input (the course map's principle).
- dewlab's `first_valid` task, which tests the deciding code with no
  typing: it needs a method, which PDP meets on the next series's first
  page. `from-cells-to-a-program` has it as `FirstValid`.
- `.isdigit()` and its short-circuit: `TryParse` does the job, and the
  page keeps dewlab's point about the short-circuit, with `&&`.
- `try` and `catch`: `building-reusable-tools` teaches them, and
  `TryParse` is the descriptor's "error trapping" here.
- `Console.ReadKey`, `string.IsNullOrWhiteSpace`, `Trim`, `char.IsDigit`,
  `switch` expressions, pattern `case`s and `goto case`: none is needed,
  and the last reading link says other kinds of `case` exist.
- CS8070 (a last `case` with no `break`): probed, and left out; CS0163
  makes the point.
- The worlds' third option, "your own": PDP pages have none.

## Probes

Run in the browser engine in a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), 20
cells, before the page was written:

- `int.Parse` with `three` gives `FormatException` (*The input string
  'three' was not in a correct format.*); with an empty line,
  `FormatException` with `''`; with no input, `ArgumentNullException`
  (*Value cannot be null. (Parameter 's')*).
- `int.TryParse`: `42` true, `seven` false and 0, `-3` true, `4.5` false,
  ` 42 ` true, `""` false, `null` (through a variable) false,
  `3000000000` false, `12,50` false, `1,250` false, `+7` true, `07` true.
  `double.TryParse("12,50")` is true and 1250 on the page's `en-IE`
  culture.
- `int.TryParse(null, out int g)` with a literal `null` does not compile:
  CS0121, *The call is ambiguous between ...
  'int.TryParse(ReadOnlySpan<byte>, out int)' and 'int.TryParse(string?,
  out int)'*. A `string` variable that holds `null` is fine.
- The `while` shift loop without `= 0` is CS0165 at (9,46); the `do`
  version with `int shift;` compiles.
- A variable made inside `do { }` is CS0103 in the `while` line.
- `out int size` in an `if` condition is still in scope after the `if`;
  in a `while` condition it is not (CS0103).
- Two `case`s that each make `string word`, or each have `out int size`
  in an `if`, give CS0128: the sections of a `switch` share one scope.
- Missing `break` is CS0163 at the label; missing on the last section is
  CS8070.
- After the input ends, every further `ReadLine` returns `null` at once
  (`hello`, then `True`, `True`).
- `Console.Clear()` is recorded as `\f`; colours are not recorded.

## For other pages (not done here: the brief allowed only these files)

- `courses/pdp.yaml` (line 82) and `courses/foop.yaml` (line 77) still have
  a `planned:` line for `reading-input`. The playbook says to delete it now
  that the lesson exists.
- These pages name *Reading input* in italics, and can now link to it
  (decision 32): `storing-and-computing` (line 355),
  `reading-an-error-message` (380), `making-decisions` (664),
  `repeating-yourself` (717), `types-and-their-sizes` (709),
  `from-python-to-csharp` (767), `writing-your-own-functions` (1030),
  `looking-things-up-by-name` (444), `finding-things` (55),
  `a-program-of-your-own` (60, 75), `building-reusable-tools` (740),
  `from-cells-to-a-program` (49, 93, 135, 233) and its practice page
  (114), and `a-front-end-for-a-class` (236, 279) and its practice page
  (122). Line numbers are as of 28 September 2026.
- `docs/TRANSLATING.md`, "C# pitfalls we hit", could gain three lines:
  `int.TryParse(null, ...)` with a literal `null` is CS0121 in .NET 10;
  the sections of a `switch` share one scope, so two `case`s cannot each
  make a variable of the same name (CS0128), even as `out int x` inside an
  `if`; and **Compare with a solution** runs with no input, so a cell that
  reads input should have no `inputs` block.

## Open

Questions only Josh can settle:

1. **Compare with a solution and input.** The page runs the comparison
   with no input (`stdin: ''`), so this page's six "your turn" tasks, all
   of which read input, have a solution to read and no comparison table.
   Should the comparison pass the cell's `stdin:` header, or the lines the
   reader typed on their last run, so that interactive tasks can have an
   `inputs` block? That is a change to `web/page/lesson.js` and the
   format, not to this page.
2. **Loops that never end after End input.** The shift loops, the taps and
   grey tasks, and practice problems 4 to 6 ask again for ever once the
   input has ended; the page tells the reader to press **Stop**. Is that
   acceptable on the page that teaches `null`, or should every loop that
   asks again also stop on `null` (three more lines each, with a second
   way out of the loop)?
3. **Is End input like Ctrl+Z?** On the page, the end of input is final:
   every later `ReadLine` returns `null` at once. In a Windows console,
   Ctrl+Z and Enter makes one `ReadLine` return `null`; I have not checked
   whether a later `ReadLine` waits for typing again. The page says only
   that Ctrl+Z makes `ReadLine` return `null`. Someone with Windows and
   Visual Studio could check this in a minute.
4. **"Error trapping".** PDP's descriptor says *error trapping and
   reporting*. The page calls checking input *input validation*, the term
   `a-front-end-for-a-class` uses. Should it also name the descriptor's
   words, for teachers and for the skills demonstration?
5. **Test data.** PDP's first skills demonstration asks for test data and
   its results. The page defines *test data* in "Looking back" and gives
   one list of what to try, but has no task where the learner writes a
   test table. Is that enough here, or should the practice page have one?
6. **Size.** 12 cells on show in each world, plus the challenge, is at the
   top of the course map's M (8 to 15 cells, about an hour). The colour
   cell could move to the practice page if a class runs out of time.
7. **`typed[0]` in practice problem 10.** PDP readers have seen a string
   indexed only once (`storing-and-computing`'s challenge) before
   `lists-and-sequences`, which comes after this page. The problem says
   what `typed[0]` is. Keep it, or replace it with a check that needs no
   index?
8. **The Python aside.** "(If you know Python, its `input()` stops with an
   `EOFError` at this point.)" helps FOOP readers, who come from Python,
   and means nothing to PDP readers. Keep it?

## Review

Reviewed on 28 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one (PDP: `storing-and-computing`,
`making-decisions`, `reading-an-error-message`, `repeating-yourself`,
`a-total-that-starts-again`; FOOP: `from-python-to-csharp`,
`compiler-errors`, `types-and-their-sizes`), once as a teacher against the
course map's entry and the later pages that already quote this one
(`from-cells-to-a-program`, `a-program-of-your-own`,
`a-front-end-for-a-class`, `finding-things`, `looking-things-up-by-name`,
`writing-your-own-functions`), and then line by line against the
checklists in `docs/TRANSLATING.md` and the style guide.

The page does what its entry asks, and it fits the pages on either side:
it uses the words that earlier pages used (*pre-test loop*, *exception*,
"a variable made inside curly brackets exists only inside them", the three
outcomes), and the words that later
pages quote from it (*`out` marks a variable that the method fills*, the
shift loop's prompt and message, the menu's shape with `case null:`).
Every program cell stands alone. Every number and quoted output in the
prose, the folds and the solution notes is in the two outputs files: I
checked each one against them, including the exception reports, the
CS0165 at (9,46) and the CS0163 at (8,9). What failed is below, and it was
fixed in the page.

No cell's code changed, so neither `version:` changed, and both outputs
files are as the writer recorded them. The final
`npm run check-lessons -- reading-input` (no `--write`): 24 runs and 26
runs, 50 runs in 9.4 s, no problems.

### Also checked, and found as the page says

- The page's own words for its controls: the help page says "A box appears
  under the output, and the cursor moves into it"; the echo of typed text
  is bold (`.ds-echo`, `font-weight: 600`); the buttons are **End input**,
  **Stop** and **Download project** (`web/page/cell.js`,
  `web/page/lesson.js`).
- A solution with no `inputs` block shows as a fold, *A solution*, with no
  **Compare** button (`web/page/lesson.js`), so the six interactive tasks
  are not broken: they have a solution to read.
- The four reading links. The `Console.ReadLine` page's remarks do say that
  Ctrl+Z (then Enter, on Windows) makes it return `null`, and it has
  examples that read until `null`, one of them a `do`...`while`. *How to
  convert a string to a number* does compare `Parse` and `TryParse`, and
  says both "ignore white space at the beginning and at the end".

### Changed in the lesson

1. **Two claims that were not exact.**
   - The Python aside said `input()` "stops with an `EOFError` at this
     point", after the paragraph about line 4. Python stops at the line
     that reads, not at the line that uses the value. It now says so, in
     a paragraph of its own: `input()` itself stops, and C# returns
     `null` and stops later, on line 4.
   - After the `do` version of the shift loop: "The body of the loop did
     not change. What changed is at the top". The `while` line also moved
     to the end. It now says both.
2. ***Return* is defined in the words later pages use**: "To *return* a
   value is to send it to the code that called the method"
   (`from-python-to-csharp`, `writing-your-own-functions`). It was
   "When a method gives a value back ... we say that it *returns*",
   with a phrasal verb.
3. **The `NullReferenceException` message is read for the learner.**
   *Object reference not set to an instance of an object* uses three words
   the reader doesn't have yet (*reference*, *instance*, and *object* for
   PDP). One sentence now says that it is .NET's way of saying that `name`
   holds nothing to ask. The page doesn't define the three words.
4. **"As `-4` showed"** assumed the reader had tried `-4`, which the page
   only invited. It now says the point: a square cannot be -4 pixels wide.
5. **The test data list waits for the reader.** "What would you type to
   test it?" was answered in the next sentence. The list is now in an
   answer fold, *one list*, with the fold's usual line, and one more
   sentence on why the limits matter (`<` in place of `<=` differs only
   at a limit).
6. **A hint for the likeliest error in the pixel-art menu task**
   (`your-turn-2--pixel-art`), which had none, where every other task has
   one: `after: 1 errors`, CS0128, `size` made twice. Probed: keeping
   `int size = 3;` and adding `out int size` in the same `case` is CS0128
   at (12,45); `out size` compiles.
7. **Plainer wording**, each for a reason in `#voice`:
   - "The space at the end of the prompt keeps the two apart" (a phrasal
     verb) became "separates the question from the answer".
   - "The page shows what you typed in bold, after the question, as a
     console does" read as if a console shows it in bold. It is now two
     sentences.
   - "the shape of almost every program that talks to a person" (an
     overclaim, and an idiom) became "a shape that many programs use when
     a person chooses what they do next".
   - "Two lines do the new work": for PDP readers neither line is new
     (`storing-and-computing`). Now "Two lines do this work".
   - "So its body runs once before the condition is checked at all"
     became "So its body always runs at least once", the words the
     post-test loop is then defined by.
   - The colour paragraph now shows the line that sets a colour,
     `Console.ForegroundColor = ConsoleColor.Green;`, in place of
     "`Console.ForegroundColor` sets the colour", which is not what a
     property does on its own.
   - "Each task below is a menu": a reader sees one task, in their world.
   - "A grey pixel has the same red, green and blue" now says "the same
     amount of".
8. **A link** to the practice page where the lesson first names it
   ("The first problem on the practice page").

### Changed on the practice page

9. **Problem 2 defines *parameter*** before it uses it: "A *parameter* is
   the name that a method uses, inside itself, for an argument." It
   defined *argument* and then read `(Parameter 's')` without the word.
   These are the style guide's two terms, kept apart.
10. **Problem 7, C and Java.** "In C, and in Java, a program like this
    would run the path for 1, and then continue into the path for 2." C
    has no `switch` on strings, so no program like this one compiles in
    C. It now says what both languages do: a path with no `break`
    continues into the path under it.
11. **Problem 10** says that .NET gives the *array* message for the
    characters of a string too. A PDP reader has not met an array, and
    the message names one.
12. **Plainer wording:** "as far as it can tell" (an idiom) in problem 6
    became "it cannot be sure that the body runs at all"; "makes sure" in
    problem 9's pixel-art hint became "if the brightness is above 255,
    makes it 255"; "when a text is a whole number" (problem 1) became
    "when the text it is given is a whole number"; "ask for a point"
    (problem 3) became "ask the person to write a point".

### Still open for Josh

The writer's eight questions above ("Open") stand. On each, what a second
reader thinks:

1. **Compare and input.** Agreed: a page change, not a lesson change. Of
   the two ideas, the cell's `stdin:` would give every reader the same
   table, and the lines the reader typed would compare their own run.
2. **Loops that never end after End input.** I would keep the page as it
   is. The central loop stays short where `do`...`while` is taught, the
   page says what happens and what to press, and
   `from-cells-to-a-program` adds the `null` check in a method. The cost
   is one paragraph that asks the reader to press **Stop** on the page
   that teaches `null`.
3. **Ctrl+Z on Windows.** Still unchecked. Microsoft's page says only
   that Ctrl+Z then Enter makes `ReadLine` return `null`, as the lesson
   does. The lesson's claim that every later `ReadLine` returns `null`
   at once is limited to **End input** on the page, so it stays true
   whichever way Windows behaves.
4. **"Error trapping".** The course map's table lists this page for the
   descriptor's *error trapping and reporting*. A teacher who looks for
   those words will not find them. One clause would do it ("... is
   called *input validation*, one kind of *error trapping*"); it was left
   out, because it gives a Level 5 reader two names for one idea on one
   line.
5. **Test data.** The list is now in a fold, after a question. No task
   asks for a test table. The practice page's problem 4 could ask for
   one, with its own four inputs as the first rows.
6. **Size.** Unchanged: 12 cells in each world, plus the challenge.
7. **`typed[0]`** in practice problem 10. Unchanged.
8. **The Python aside.** Kept, and now true (change 1 above).

Found in this review:

9. **The `planned:` lines.** `courses/pdp.yaml` line 82 and
   `courses/foop.yaml` line 77 still give *Reading input* a `planned:`
   line. The playbook's checklist says to delete it now that the lesson
   exists; the brief for this review doesn't allow edits to `courses/`.
10. **Nullable reference types.** The style guide's decision 4 says a page
    that exports to Visual Studio mentions the setting. This page teaches
    `null`, and a reader who types `string name = Console.ReadLine();` in
    a project they made themselves in Visual Studio sees warning CS8600,
    because Visual Studio's template has the setting on. The downloaded
    project has it off, like the page, so the page's own advice is
    enough. `a-program-of-your-own` (PDP) and
    `the-tools-around-your-code` (FOOP) explain the setting later. Should
    this page say one sentence about it too?
11. **A browser that cannot pause a program.** There, a cell that reads
    input shows a box for the answers in advance (`web/page/cell.js`,
    `typedBox`), and there is no **End input** button: the input ends
    after the last line written. The lesson's instructions assume the
    live box: "the program waits for as long as you take", "press
    **End input**". The other box has a label of its own that says what to
    do, and there the cell that is meant to stop with a
    `NullReferenceException` needs the box left empty, not a button. Is
    one sentence on the help page enough, or should a lesson that reads
    input say so?
