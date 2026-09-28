# writing-your-own-functions: notes for a reviewer

Ported from dewlab `tutorials/writing-your-own-functions/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 14):
action *adapt*, shape *tutorial*, size L, batch 3, depends on
`repeating-yourself`, covers PDP-LO8 and PDP-LO11, worlds secret messages
and pixel art. The id keeps dewlab's name (`DECISIONS.md` 9); the page says
*method*.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/writing-your-own-functions/writing-your-own-functions.md`,
its practice page is
`lessons/writing-your-own-functions/writing-your-own-functions-practice.md`,
their recorded outputs are the two `*.outputs.json` files beside them
(written by the browser checker), and this file was the draft's
`NOTES.md`. The three `*.native.json` files were deleted: the browser
checker's outputs files replace them (they are still in git at the commit
before the move). The draft had no pictures. "What was done when it
moved", just below, says what changed in the move. The porter's notes
follow it, with anything the move made stale marked *(stale)*. "The
porter's questions, and what was decided" settles the open questions where
the playbook, the course map, the style guide or the example lessons
answer them; the rest are under "Open".

Files:

- `writing-your-own-functions.md`: the lesson. 24 exec cells in the file:
  16 shared, and 4 tasks with one variant for each world, so 20 in each
  world. 3 predicts, 13 hints, 11 solutions, 6 `inputs` blocks, 1 answer
  fold, 1 challenge, 5 cells meant to fail (`expect: CS0161`, `CS0029`, `CS0019`, `CS8421`,
  `CS0103`). Version `2026.09.28.1`.
- `writing-your-own-functions-practice.md`: the practice page, 23
  problems. 28 exec cells in the file: 26 shared, and 1 task with one
  variant for each world, so 27 in each world. 3 predicts, 14 answer
  folds, 5 hints, 11 solutions, 9 `inputs` blocks, 5 cells meant to fail
  (`expect: CS0201`, `CS7036`, `CS0161`, `CS0029`, `CS0019`). Version
  `2026.09.28.1`.
- `writing-your-own-functions.outputs.json`,
  `writing-your-own-functions-practice.outputs.json`: what the browser
  checker recorded.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  writing-your-own-functions writing-your-own-functions-practice` ran the
  draft as it came (43 and 41 runs): no problems. Compared with the native
  checker's files (from git), every cell, solution and `inputs` row in
  both worlds had the same outcome, the same output, and the same
  messages, with the same code, line, column and text. The browser differed
  from the draft in nothing the prose depends on:
  - no culture difference: the page prints `37.5`, `7.75`, `0.67` and
    `0.6666666666666666` with a point under `en-IE`, as the native run did;
  - no trimmed API, no stray warning, and `Console` behaved as on a
    computer (`Console.Write` and `Console.WriteLine()` in `DrawSquare`);
  - the only differences are in how a value is recorded. A string with
    line breaks is written as C# would write it, `"#.#.\n.#.#\n"`, where
    the native file held real line breaks (the prose quotes neither). The
    native checker recorded no values for a cell that does not compile;
    the browser records `not-run` (`your-turn-4`, `one-step-too-far-in-1`)
    or, for `two-rooms-1`, the input's own CS0019.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probes" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). All 43 match the native run exactly: the
  same outcome, output, and message text, line and column. Six new probes
  (the last six below) back the "Where to read more" paragraph and the
  scope question.
- **Every number and every quoted output now comes from a cell on the
  page** (decision 29, as the other moved pages did). The draft's prose
  quoted many results from probes only. Each is now printed by a cell or a
  solution, or no longer quoted:
  - Lesson, `Larger`: "Can you delete `return second;`" and its CS0161
    message (probe only) became a new cell meant to fail,
    `giving-a-value-back-2` (`expect: CS0161`), `Larger` without its last
    line. The prose says before it that it is meant to fail and asks which
    line the compiler will name; after it, "It did not compile, so nothing
    ran", the recorded message `Program.cs(1,12)`, and why the compiler
    names the method's first line.
  - Lesson, `return-or-print-2`: "delete line 11 ... prints `b is 10` and
    `b + 1 is 11`, and CS8321" (probe only) became a question ("Can you make
    the cell compile ... What does it print then?") and a `solution` block,
    recorded with those two lines and its CS8321 warning at (6,13).
  - Lesson, `your-turn-4` note: "the call stands for 24" (probe only)
    became "the call `AddPostage(20)` gives a number".
  - Lesson, machines: "$f(x) = x^2$ takes 3 and gives 9" (probe only)
    became "takes 7 and gives 49, as `Square(7)` did above" (recorded by
    `functions-reusable-algorithms-2`).
  - Lesson, machines: "Can you write `static` in front ... It does not
    compile" and its CS8421 message (probe only) became a new cell meant to
    fail, `functions-as-input-output-machines-2` (`expect: CS8421`), the
    discount program with `static`. The message `Program.cs(5,28)` is
    recorded.
  - Lesson, `your-turn-2--pixel-art` note: "`-1 % 2` is -1 ... returns `#`"
    (probe only) became a question: compare your answer for
    `Checker(-1, 0)` with the solution's (recorded `"."`), and what does
    `%` give below zero, with a link to the dividing page, which records
    `-7 % 2` as -1.
  - Lesson, `your-turn-5--secret-messages` note: "-12", "14" and `HELL5`
    (probe only) became the reason in words (a position below zero, and `%`
    keeps the minus sign) and "compare the third case, `Decode("URYYB",
    13)`, with this one's" (recorded `"HELLO"`).
  - Lesson, scope: "delete the `//` ... CS0103 at (12,19)" (probe only).
    `scope-where-variables-live-1` is now itself the cell meant to fail
    (`expect: CS0103`), with the line uncommented. The prose says so before
    it, and asks what the compiler will say and whether the first lines
    will run. The recorded message is at (11,19), and the empty output
    backs "Nothing ran, not even the first lines". Then: "Can you delete
    the last line, and run the cell again?"
  - Lesson, scope: "delete `int` ... the last line prints `outside: 10`"
    (probe only) became a question, "What does the last line print now?",
    and the reason without the output.
  - Practice 1: the three fences became three cells,
    `three-ways-to-write-wave-1`, `-2` and `-3` (the last `expect:
    CS0201`), so CS8321, `Hi!` twice and the CS0201 message at (6,1) are
    recorded. The question says before them that whatever happens is meant
    to happen.
  - Practice 2: the CS7036 and CS1501 messages (probes only) are recorded
    by a new cell meant to fail, `defining-and-calling-2`
    (`expect: CS7036`), with both wrong calls; the second message is now at
    (7,1), the call's own line. `cat is a Tom.` (probe only) went: the fold
    says the swapped call compiles and swaps the name and the animal, "as
    `dog is a Rex.` did on the lesson page".
  - Practice 3: the CS0841 message (probe only) went; the fold states the
    rule for a variable and asks "What does the compiler say about this
    program? Can you try it in the cell?".
  - Practice 5 note: "`-3 % 2` is -1 ... says -3 is even" (probe only)
    became the same question as the checker note, with the dividing link.
  - Practice 8 note: "So 9 looks as if it had no factor" (probe only)
    became the reason: the method returns on the first number it tries.
  - Practice 9: "With `number / 2.0`, the cell prints 3.5" (probe only)
    became a question and a `solution` block, recorded as `3.5`, in the
    shape of `first-steps-practice`'s "Half of seven".
  - Practice 13 note: "13 and 13 make the whole 26" became "two shifts of
    13 move each letter the whole length of the alphabet".
  - Practice 14: `DivideByZeroException` is named, with a link to the
    exceptions page, whose table defines it; "`12.0 / 0` is ∞" (probe only)
    became "Can you try it, and see what the method returns?".
  - Practice 15 note: the fifteen primes (probe only) went, with "`IsPrime(1)`
    would say `True`" (probe only): the note keeps the recorded 15, the
    reason in words, and "Can you delete the `if` ... and see?".
  - Practice 20: (a) and (b) are now cells, `reading-and-changing-outside-1`
    and `-2`, so `Hello, Ada` and 5 are recorded.
  - Practice 21: `from-earlier-how-many-times-1` now prints each value and
    then `4 steps`, so 33, 11, 3 and 1 are recorded (the shape
    `repeating-yourself-practice`'s `halving-1` took when it moved).
  - Practice 22: the fence became a cell,
    `from-earlier-the-biggest-first-1`, with `int brightness = 200;` and a
    `Console.WriteLine`, so `-` is recorded. The question no longer states
    the output before the run.
  - Practice 23: the question became a cell,
    `from-earlier-two-decimal-places-1`, printing the four values the fold
    quotes: `0.00`, `0.67`, 0 and 0.6666666666666666.
- **Cells meant to fail.** Before each one, the prose says it is meant to
  fail and asks a question; after it, the outcome is in the style guide's
  words: "It did not compile, so nothing ran." `return-or-print-2` said "it
  does not compile, so nothing runs" before the run, which gave the answer
  away; it now says only that it is meant to fail. `print-a-print-1` has a
  predict with "It does not compile" as an option, so, as
  `making-decisions` did, the sentence before it is "Whatever happens when
  you run it is meant to happen, and nothing is broken", and "This cell is
  meant to fail" after the predict went. The practice intro has the line
  the other practice pages have: some cells are meant not to compile, and
  "nothing is broken: the message is part of the answer".
- **Predicts.** The lesson keeps three. The practice page had four; the
  style guide and the course map ask for two or three, kept where C#
  surprises a reader. `scope-1` (`10 0`) repeats the lesson's inside and
  outside cell and behaves as Python's would, so its predict became a
  prose question ("What do you think it prints? Run it and see."). The
  three left are the calls-above predict the course map asks for, the
  whole-number division inside a `double` method, and the `void` that
  cannot be stored.
- **Links** (decision 32 and this round's list). New links:
  [the closer look at starting a total](lesson:a-total-that-starts-again)
  (in `lessons/`), [Arrays and lists](lesson:lists-and-sequences) (moved in
  this round, now in `lessons/`), the practice page from the paragraph on
  passing by value, and on the practice page
  [Reusable methods](lesson:building-reusable-tools) and
  [the page about exceptions](lesson:reading-an-error-message). "The page
  on reading input" is now *Reading input*, in italics: that page is
  neither in `lessons/` nor moving in this round. The checker reports the
  link to `building-reusable-tools` until that page lands; it is on this
  round's list.
- **Plain language** (`#voice`). Phrasal verbs and idioms went: "add up
  to" (twice), "write down" (three times), "stands for" (twice), "keeps
  out", and the heading "how many times round", now "how many steps". The
  tuple in practice 17 is `(int times, int remainder)`, not `leftOver`. The
  opening now defines *warning* in one sentence ("a message about
  something that may be a mistake"), where the draft said only what it
  does not do. Practice 22's question says what the program is meant to
  print, and asks what it does print.
- **Visual Studio.** One line before "Next": everything on the page runs
  in the browser, none of it needs Visual Studio, and **Download project**
  saves a program as a Visual Studio project. The loops and variables
  pages have the same line.
- **Where to read more** keeps its one source, with the `en-us` address the
  other pages use. It returned the module on 28 September 2026: nine
  units, Visual Studio Code, methods written without `static`, and in its
  second unit "It's common to define all methods at the end of a program".
  "Short" went. "Visual Studio Code, another editor from Microsoft" became
  "which is a different program from Visual Studio. You do not need it",
  as on `a-total-that-starts-again`. "You can try its examples in a cell"
  became "the whole programs in its second part ... also run in a cell":
  the four whole programs in that unit run on the page and print what the
  unit shows (probes `learn-*`), and its bare signatures, such as
  `void SayHello();`, are not programs (CS8112).
- **Frontmatter.** `version:` is `2026.09.28.1` on both pages, because
  cells changed and new cells were added. The ids of the draft's cells are
  unchanged; the new cells have new ids.
- **The pages were looked at** in headless Chromium on the real server
  (`node tools/serve.mjs --isolate`), at 390 and 900 pixels wide, in both
  worlds: 20 cells on the lesson and 27 on the practice page in each
  world, every one labelled `program` or `empty` and `Program.cs`; KaTeX
  typesets 2 formulas on the lesson and 3 on the practice page; no
  sideways scroll and no console errors. Run on the page,
  `defining-a-function-1` said "Ran." with
  `Program.cs(1,13): warning CS8321: ...` under it, and
  `giving-a-value-back-2`, `functions-as-input-output-machines-2`,
  `scope-where-variables-live-1` and `print-a-print-1` said "Did not
  compile, so nothing ran." with the messages the prose quotes. See also
  "Notes that were for later".
- **Not done here: `courses/pdp.yaml`** still has
  `writing-your-own-functions: "Methods: writing your own"` under
  `planned:`. The playbook's checklist says to delete it when the lesson
  moves; this round's instructions leave the course files to the
  orchestrator.

## The porter's notes

These are the porter's notes on the draft, as written, with the lines the
move changed marked *(stale)*. "What was done when it moved" says what
replaced them.

### Frontmatter

- `title: "Methods: writing your own"`, the course map's title. dewlab's was
  "Writing your own functions".
- `version: 2026.09.27.1`, `from: writing-your-own-functions`, and the two
  worlds with dewlab's descriptions, word for word, as the sibling drafts
  have them.
- `covers: [PDP-LO8, PDP-LO11]`, from the course map. dewlab gives
  outcomes for each section: PDP-LO8 for five, and MIT-6.2 (touching
  MIT-3.1) for "functions as input-output machines". The maths outcomes go
  with domain and inverse (course map, "What changes because of C#", last
  bullet). `year:` is dropped: the format has no such field.
- The practice page has `from: writing-your-own-functions-practice` and
  `practice_for: writing-your-own-functions`, and the title
  "Methods: practice", in the pattern of "Loops: practice".

### What changed, and why

#### What the reader already knows

PDP's order puts this page 14th, after `first-steps`, `powers-in-csharp`,
`storing-and-computing`, `compiler-errors`, `dividing-in-csharp`,
`types-and-their-sizes`, `making-decisions`, `equals-three-ways`,
`reading-an-error-message`, `repeating-yourself`,
`a-total-that-starts-again`, `reading-input` and `mixed-first-programs`.
From the drafts that exist and the course map, the reader has met: typed
variables, `char` arithmetic and casts in the Caesar shift, the negative
remainder and its fix `((n % 26) + 26) % 26`, `$"..."` and `:F2`, `if` and
`else if`, `char.IsUpper`, `while`, `for`, `foreach` over a string, `+=` and
`++`, nested loops, `Console.Write`, the shape of a compiler message, CS0103
for a name out of scope (`a-total-that-starts-again` names *scope* and
*code block*), exceptions and their reports, and `int.TryParse` with `out`
(`reading-input`, not drafted yet). The word *method* is defined on
`storing-and-computing` and `powers-in-csharp`, for C#'s own methods.

`first-steps`, `compiler-errors`, `types-and-their-sizes` and
`reading-input` are not drafted, so this page defines again the words it
leans on (*compiling*, *warning*, *scope*), in one sentence each.

#### Links: back only, as the batch rule says *(stale)*

*(stale: the move added these links, as "What was done when it moved" says; `reading-input` is named in italics.)*

Batch rule 3: a lesson links back only to lessons of earlier batches. This
page is batch 3. It links to `repeating-yourself` (batch 2),
`powers-in-csharp` and `dividing-in-csharp` (batch 1) and its own practice
page. The practice page links to `dividing-in-csharp`,
`repeating-yourself`, `making-decisions` (batch 2) and
`storing-and-computing` (batch 1). Everything else is plain text:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, "Scope" | "The closer look at starting a total" | `lesson:a-total-that-starts-again` | 3 (same batch; drafted) |
| lesson, "Scope" | "from the page on reading input" | `lesson:reading-input` | 4 |
| lesson, "Looking back" | "The next page, on arrays and lists" | `lesson:lists-and-sequences` | 3 (same batch) |
| practice 14 | "A later page, on reusable methods and tests for them" | `lesson:building-reusable-tools` | 7 |

`repeating-yourself` ends with "A later page, on writing your own methods,
gives a loop like that a name" in plain text. Its author, or the batch-3
pass, can link it here now.

#### The lesson, section by section

**How a method is written.** Each method is a `static` local function
among top-level statements, as the course map asks
(`static void Greet(string name)`, `static int Square(int n)`). The page
writes each method above its calls, as dewlab's page did, and says once
that C# allows either order. Braces are on their own lines, so a
three-method cell runs to 17 lines, past the style guide's fifteen.

**Opening** (`defining-a-function-1`, `defining-a-function-2`). The first
predict keeps dewlab's point: a method nobody calls prints nothing. In C#
the cell also shows warning CS8321 ("declared but never used"), and the
prose reads it as the compiler saying the same thing. The page then names
*method*, says once that other languages say *function*, and names *local
function*, because the compiler's messages use that word (CS8321, CS8421).
The second cell puts the two calls above the method, with a predict: it
prints twice, the C# answer that the course map asks for ("A local method
can be called above the line that declares it... (a predict)"). One
paragraph states rule 1 in the style guide's words, without the word
"rule": the cell writes `Secret` again because each Run starts a new
program.

**Writing a method.** `Greet`, with a fold that reads the first line part
by part: parameter list, `void` (with *return* defined), and `static`
("works only with what it is given"; the full meaning comes in the
machines section). No semicolon after the first line. *Parameter* and
*argument* use the style guide's definitions. One sentence says a
parameter has a type, so `Greet(42)` does not compile (probe). The
argument-order cell and its text predict are dewlab's; the prose adds that
the compiler accepts the swapped call because both arguments are strings.

**Your turn 1.** `PrintCodeTable(int shift)` and `DrawSquare(int size)`.
dewlab's pixel hint used `"#" * size`, which C# does not have; the hint now
points to the nested loops on the loops page. The stubs are comments only,
as the loops draft's stubs are.

**Returning a value.** `Square` uses `number * number` (no power operator;
links to the powers closer look). *Return type* is defined. `Larger` keeps
dewlab's shape with `first` and `second` for `a` and `b`. New: an
invitation to delete `return second;`, which gives CS0161 *(stale: now the cell `giving-a-value-back-2`)*, and the page
defines *code path*. This is the first of C#'s "the compiler checks every
path" points, and practice 8 uses it again.

**Your turn 2.** dewlab's sentence about a guess column goes (dewsharp has
none). It now says that **Compare with a solution** runs both on each case,
and asks the reader to write a guess down first. Each stub returns a
placeholder (`return "";`) so that it compiles, and calls the method once,
so that a Run shows something and there is no CS8321. The `Checker`
solution's note is new: `-1 % 2` is -1 in C#, so a method that asks
`== 1` for the odd pixel returns `#` for `Checker(-1, 0)` (probe). dewlab's
input `checker(-1, 0)` is kept for this reason. *(stale: the note now asks a question in place of the probe's numbers.)*

**Return or print?** `return-or-print-1` is dewlab's cell. dewlab's second
cell printed `a is None`. In C# it does not compile
(`expect: CS0029`, "Cannot implicitly convert type 'void' to 'int'"), and
the prose says before the run that it is meant to fail, asking which line
the compiler will name, as `a-total-that-starts-again` does. An invitation
to delete two lines shows `b is 10` and `b + 1 is 11` (probe) *(stale: now a `solution` block)*. `None` is
gone; `void` replaces it, and the table's last row now asks what is in
front of the method's name.

**`your-turn-4`** starts as a cell that does not compile. The compiler
gives CS0019 ("Operator '*' cannot be applied to operands of type 'void'
and 'int'"), not CS0029, so the cell has `expect: CS0019`. The course map
says "`expect: CS0029` on the teaching cell only"; I read that as CS0029 on
`return-or-print-2`, and this cell carries the code the compiler gives.
The prose says it is meant to fail and that the task is to change it.

**Methods as input-output machines.** The $f(x) = x^2$ paragraph stays,
shortened (dewlab's −3 example is gone) *(stale: 7 and 49 now)*. The discount cell is dewlab's,
with the method written *without* `static`, and the prose says so before
the run. It prints 45 and 37.5 (not 45.0: C# prints no `.0`). *Pure
method* is defined as dewlab defines a pure function. Then an invitation to
write `static` in front of the method gives CS8421 *(stale: now the cell `functions-as-input-output-machines-2`)*, and this is where the
page says what `static` does: a static method can use only its parameters
and its own variables, the compiler checks it, and so `static` helps to
keep a method pure. The course map put CS8421 in its scope sentence; it
fits here better, where the method becomes pure, and the scope section
refers to it again.

The paragraph on *domain* goes (maths, MIT-6.2). *Inverse* is not named:
the "your turn" says "some methods undo others". The tasks stay.

**Your turn 5.** `Decode` by calling `Encode(message, -shift)`, as the map
asks, "meets the negative remainder again". The stub asks the reader to
copy their own `Encode` into the cell (rule 1: "a later cell that needs
`Encode` writes it again"). A hint `after: 1 errors` names CS0103 and says
why. The solution brings its own `Encode` with `+ 26) % 26`, and its note
shows what happens without it: `Decode("URYYB", 13)` gives `HELL5`,
because `-12 % 26` is -12 (probe). *(stale: the note now gives the reason in words, and points to the third case.)* So a reader whose `Encode` came from the
first solution sees a highlighted difference on the third case.
`Mirror` is dewlab's task, with "left to right" rephrased as "faces the
other way" (a search for the word *right* should find nothing on the
page).

**Methods that use other methods.** `Square`, `SumOfSquares`,
`Hypotenuse`, with `Math.Sqrt` for `** 0.5` and a sentence on why
`Hypotenuse` returns a `double`. `a` and `b` stay as parameter names here,
because the prose gives the formula $a^2 + b^2 = c^2$.

**Your turn 7.** Both stubs ask the reader to copy their methods from the
tasks above; both solutions bring every method they need.

**Scope.** Kept on the lesson, with three changes from dewlab:

1. `scope-where-variables-live-1` is dewlab's cell. Deleting the `//`
   gives CS0103 at line 12 (probe), and the prose says nothing ran.
   *(stale: the cell is now itself meant to fail, `expect: CS0103`, at
   line 11.)*
2. New prose: *passing by value* (a parameter gets a copy) and `out`, with
   `int.TryParse` as the example, as the map asks. A new practice problem
   (18) shows passing by value with a run.
3. *Global variable*: C# has none in Python's sense. The page says that a
   top-level variable that a method without `static` uses is "the nearest
   thing C# has", as the teacher notes put it. A probe found a limit that
   the prose now states: the variable must be made *above* the method.
   One made below it gives CS0841 ("Cannot use local variable before it is
   declared"), even in a method without `static`.

`scope-where-variables-live-2` is dewlab's cell with a method without
`static`: `int count = 10;` inside hides the `count` outside (inside 10,
outside 0), which C# has allowed since C# 8. Then the C# difference:
deleting `int` makes the line change the `count` outside (`outside: 10`,
probe). *(stale: the prose now asks what it prints.)* dewlab's sentence "Giving a name a value inside a function never
changes a variable outside it" is true in Python and not in C#, so it is
gone. The page says a `static` method cannot do it at all (probe: CS8421).

**`your-turn-9`** and `your-turn-10` are one cell, as the map asks. The id
`your-turn-9` is kept. The cell makes `int total = 1000;` below the place
for the reader's methods, prints it at the end, and asks why it is still
1000. dewlab had no solution; this page adds one, and a hint, so that the
task has help after an attempt.

**Looking back.** dewlab's question about testing, and the E-counting
challenge, with an `Encode` that has the `+ 26` fix. The challenge
compiles and prints `0 WKH HDJOH ...` as given; one answer finds shift 3,
`THE EAGLE HAS LANDED AT THREE` (probes). *Modular programming* is defined
as dewlab defines it.

**Where to read more.** dewlab listed three (the Python tutorial, Think
Python, CrashCourse). The style guide asks for one thing to read or watch.
It is Microsoft Learn's module *Write your first C# method* (nine units,
checked on 27 September 2026). It writes methods as local functions among
top-level statements, as this page does, but without `static` and often
below the calls; the sentence says both. The CrashCourse video
(`l26oaHV7D40`) is not tied to a language and could be a second item if
the reviewer wants one. *(stale: see "What was done when it moved" for the address and wording.)*

#### The practice page

dewlab's 22 problems, in dewlab's order, with one new problem (18). The
intro drops the guess column and says that every cell has its own copy of
each method, and that an uncalled method shows CS8321.

| # | dewlab | Here |
|---|---|---|
| 1 | Three ways to write wave | Same three. (c) `Wave;` does not compile in C# (CS0201), where Python showed `<function ...>`. |
| 2 | The wrong number of arguments | CS7036 and CS1501, as the map asks; *overload* defined in one sentence. Retitled "Too few arguments, or too many" to keep the word *wrong* off the page. Id kept. |
| 3 | Called too soon | Now an exec cell with a predict, with the opposite answer: it prints `hello!`. The fold adds the contrast: a variable used above its line does not compile (CS0841). New id `called-too-soon-1` (dewlab's was a fence to read). |
| 4 | Countdown | `for` counting down with `--`; the hint's indentation point becomes "inside the curly brackets or after them". |
| 5 | Is it even | New case `IsEven(-3)`: `number % 2 != 1` says -3 is even in C# (probe). |
| 6 | Factorial | Same. |
| 7 | Found, or not found | dewlab's `inputs` with a guess column and no solution become three `Console.WriteLine` lines and a "why" fold, because Compare needs a solution. |
| 8 | One step too far in | Now a compiler error: `return false;` inside the loop gives CS0161 (the loop may run zero times) and warning CS0162 at `divisor++`. `expect: CS0161`. The second hint shows the logical error that remains if the reader adds a second `return false;` (probe: `False` for 9). |
| 9 | Half of ten | Replaced by "Half of seven" (new id `half-of-seven-1`): `static double Half(int number) { return number / 2; }` prints 3. dewlab's point (a print gives `None`) is a compiler error in C#, and problems 10 and 11 and the lesson already make it. |
| 10 | Print a print | `string shown = Console.WriteLine("hi");`, CS0029, as the map asks. `Console.WriteLine(Console.WriteLine("hi"))` gives CS1503 "cannot convert from 'void' to 'bool'" (the compiler reports the `bool` overload), which is harder to read. Retitled "What WriteLine returns"; id kept. |
| 11 | Two rooms | The cell now calls the sum, so it fails with CS0019 (`void` and `void`), `expect: CS0019`. |
| 12 | Which are pure | The four methods as one C# fence with braces on their own lines. The answer adds that (b) cannot be `static` (CS8421, probe) and (c) can be (probe), so `static` does not make a method pure. *Side effect* as dewlab. |
| 13 | Its own inverse | Retitled "A method that undoes itself" (*inverse* is maths the map drops). Ids kept. |
| 14 | Outside the domain | "An input it cannot take": an exec cell with `ShareEqually(int total, int people)`; 0 gives `DivideByZeroException`, and with `double` it returns ∞ (probes). New id `an-input-it-cannot-take-1`. |
| 15 | Counting primes | The counting cell carries `HasFactor` and `IsPrime` (rule 1), so it is 24 lines, and the first cell 22. |
| 16 | Distance on a screen | `Math.Sqrt`. |
| 17 | Two answers at once | A tuple, `(int, int)`, as the map allows; *tuple* defined. New case `(-7, 2)` gives `(-3, -1)`. Mentions `Math.DivRem` and `out`. |
| 18 | (new) A copy of the value | Passing by value, with a run. |
| 19 | A count inside and outside | dewlab's, with a method without `static`. Id `scope-1` kept. dewlab's comment "a new, local count" is gone: it gave the answer. |
| 20 | One works, one does not | C# is the other way from Python here: both compile, and `Add` changes `total`. Retitled "Reading and changing a variable outside"; the answer shows CS8421 with `static` and the clear way (pass in, return). |
| 21 | From earlier: how many times round | `/` on `int`; the fold's 33, 11, 3, 1 come from a probe. The predict became a prose question (see below). |
| 22 | From earlier: the biggest first | `else if`, with `string pixel = ".";` so that the fence is valid C#. |
| 23 | From earlier: two decimal places | `$"{2 / 3:F2}"` is `0.00` in C#, a surprise dewlab's Python did not have; `2.0 / 3` gives `0.67`. |

*(stale in part: problems 1, 2, 3, 5, 8, 9, 13, 14, 15, 17, 19, 20, 21, 22
and 23 changed in the move, and problem 21 is now "From earlier: how many
steps". "What was done when it moved" says how.)*

The practice page has four predicts, as dewlab's has. *(stale: three now; `scope-1`'s is a prose question.)* Two more problems
(18 and 21) ask their question in prose instead, to stay near the style
guide's "two or three".

#### The glossary file

dewsharp has no glossary panel (`docs/LESSON_FORMAT.md`), so each of
dewlab's entries is defined in the prose where it first appears: *call*,
*body*, *parameter*, *argument*, *return* (lesson, "Writing a method");
`None` becomes `void` ("no value"); *pure* (machines section); *scope*,
*local*, *global* (scope section); *modular programming* (Looking back).
*Domain* and *inverse* are gone with the maths. New terms defined where
they appear: *method*, *function*, *local function*, *declared*, *return
type*, *code path*, `static`, *hides*, *passing by value*, `out`; on the
practice page *overload*, *side effect*, *edge cases*, *tuple*, *prime*.

### What C# made different, in short

- A method's first line says its return type and each parameter's type, and
  a stub must return a value to compile (CS0161 otherwise).
- Mistakes that Python shows at run time appear before anything runs:
  storing what a `void` method returns (CS0029), calculating with it
  (CS0019), the wrong number of arguments (CS7036, CS1501), a name without
  brackets (CS0201), a `return` inside a loop (CS0161).
- A local function can be called above the lines that make it; a variable
  cannot be used above its line (CS0841).
- Each Run is a new program, so every cell that uses a method has its own
  copy, and the "your turn" cells that build on an earlier method ask the
  reader to copy theirs in.
- `static` stops a method using the program's variables (CS8421). Without
  `static`, a method can read *and change* a top-level variable made above
  it: the opposite of Python's rule that an assignment makes a local.
- `%` keeps the sign, so `Decode` through `Encode(-shift)` needs the
  `+ 26` fix, and `Checker(-1, 0)` and `IsEven(-3)` catch a test for `== 1`.
- `/` on two `int` values drops the fraction, even when the method returns
  a `double` (practice 9, 23).
- `1.0 / 0` is ∞ and does not stop the program (practice 14).

## Where each number and message in the prose comes from

All from the two outputs files (`lessons/writing-your-own-functions/*.outputs.json`,
version `2026.09.28.1`), except where the table says otherwise. A cell
recorded as `<id>@<world>` gives the same in both worlds. The messages in
the prose say `Program.cs`, as the page shows them (checked on the page).

Lesson:

| Number, message or claim | Source |
|---|---|
| nothing appears; `Program.cs(1,13): warning CS8321 ...` | `defining-a-function-1` |
| the password twice | `defining-a-function-2` |
| `Greet(42)` does not compile (no message quoted) | probe `w-greet-int` (CS1503) |
| `dog is a Rex.` | `defining-a-function-3` |
| 49 (and 144 printed); $f(x) = x^2$ takes 7 and gives 49 | `functions-reusable-algorithms-2` |
| returns 10, returns 5 | `giving-a-value-back-1` (8, 10, 5) |
| `Program.cs(1,12): error CS0161 ...`; nothing ran; line 1 | `giving-a-value-back-2` |
| only one line; `DoubleAndPrint(5)` showed 10 | `return-or-print-1` |
| `Program.cs(11,9): error CS0029 ...`; nothing ran | `return-or-print-2` |
| `b is 10`, `b + 1 is 11`, CS8321 | `return-or-print-2`, `solutions[0]` (output, and the warning at (6,13)) |
| 48; CS0019 and `'void' and 'int'` in the hint | `your-turn-4`: its message, and `solutions[0]` and its input |
| 45 and 37.5 | `functions-as-input-output-machines-1` |
| `Program.cs(5,28): error CS8421 ...`; nothing ran | `functions-as-input-output-machines-2` |
| `Checker(-1, 0)`: the solution's answer | `your-turn-2--pixel-art`, `solutions[0].values[3]` (`"."`) |
| `OTTER`; the third case, `Decode("URYYB", 13)` | `your-turn-5--secret-messages`, `solutions[0].values` (`"HELLO"`, `"OTTER"`, `"HELLO"`) |
| `Mirror(Mirror(3, 8), 8)` is 3 | `your-turn-5--pixel-art`, `solutions[0].values[2]` |
| 25 and 5; sides 3 and 4, the longest side 5 | `functions-that-use-other-functions-1` |
| 26 lines; shift 3, `THIS IS A SECRET` | `your-turn-7--secret-messages`, `solutions[0].output` |
| `Program.cs(11,19): error CS0103 ...`; nothing ran, not even the first lines | `scope-where-variables-live-1` (empty output) |
| inside 10, outside 0 | `scope-where-variables-live-2` |
| without `int`, the line changes the `count` outside (no output quoted) | probe `without-int-count` (`outside: 10`) |
| a `static` method cannot change a variable outside | `functions-as-input-output-machines-2`; probe `w-count-static` |
| a variable made *above* the method | probe `w-variable-below-method` (CS0841 below it) |
| 55, 7.75 and 1000 | `your-turn-9`, `solutions[0].output` |
| the methods could not change `total`, "even by mistake" | probe `w-total-static-no-type` |
| the Learn module: nine units, Visual Studio Code, no `static`, methods at the end; its whole programs run in a cell | the module's pages, fetched 28 September 2026; probes `learn-*` |

Practice:

| Number, message or claim | Source |
|---|---|
| 1 (a) CS8321, (b) `Hi!` twice, (c) `Program.cs(6,1)` CS0201 | `three-ways-to-write-wave-1`, `-2`, `-3` |
| 2 the swapped call compiles and swaps them | probe `w-p-describe-swapped`; `dog is a Rex.` is the lesson's `defining-a-function-3` |
| 2 CS7036 at (6,1) and CS1501 at (7,1) | `defining-and-calling-2` |
| 3 `hello!` | `called-too-soon-1` |
| 3 a variable used above its line does not compile (no message quoted) | probe `w-p-variable-too-soon` (CS0841) |
| 5 `IsEven(-3)`: the solution's answer | `is-it-even-1`, `solutions[0].values[4]` (`false`) |
| 6 `Factorial(0)` gives 1 | `factorial-1`, `solutions[0].values[2]` |
| 7 True, False, False | `found-or-not-found-1` |
| 8 CS0161 on line 1; CS0162 at `divisor++` | `one-step-too-far-in-1` ((1,13) and (3,45)) |
| 9 3; 3.5 | `half-of-seven-1` and its `solutions[0]` |
| 10 `Program.cs(1,16): error CS0029 ...` | `print-a-print-1` |
| 11 22; CS0019 and `void` | `two-rooms-1` and its solution |
| 12 (b) CS8421 with `static`; (c) compiles with `static` | probes `w-p-price-with-tax-static`, `w-p-roll-static` |
| 13 `OTTER`; 255, 55, 200 | `its-own-inverse-1--*`, `solutions[0].values` |
| 14 3; `DivideByZeroException` | `an-input-it-cannot-take-1`; probe `w-p-share-zero`; `reading-an-error-message` defines it |
| 14 with `double`, the program does not stop (no value quoted) | probe `w-p-share-double` (∞) |
| 15 `True False False`; 15 | `functions-that-use-other-functions-2`; `counting-primes-1`, `solutions[0]` |
| 17 (-3, -1); `Math.DivRem` | `two-answers-at-once-1`, `solutions[0].values[2]`; probe `w-p-tuple-names` |
| 18 `outside: 5`; 6 | `a-copy-of-the-value-1` |
| 19 `10 0` | `scope-1` |
| 20 `Hello, Ada`, 5 | `reading-and-changing-outside-1`, `-2` |
| 20 CS8421 with `static` (no message quoted) | probes `w-p-read-outside-static`, `w-p-change-outside-static` |
| 21 4 steps; 33, 11, 3, 1 | `from-earlier-how-many-times-1` |
| 22 `-` | `from-earlier-the-biggest-first-1` |
| 23 `0.00`, `0.67`, 0, 0.6666666666666666 | `from-earlier-two-decimal-places-1` |

## Notes that were for later, and what became of them

- **Warnings on untouched cells.** Checked on the page:
  `defining-a-function-1` says "Ran." in its status line, with the
  CS8321 message under it in the quieter style. It does not read as a
  failure. `counting-primes-1` shows CS8321 too (recorded at (13,13)), and
  the practice intro says why.
- **Empty stubs.** Checked on the page: **Run** on
  `your-turn-1--secret-messages`, which holds only comments, says
  "Compiled. Nothing ran." and counts as a run, so its `after: 1 runs`
  hint appears (`afterRun` in `web/page/lesson.js`).
- **`inputs` rows that fail on an untouched stub.** Checked on the page.
  In `your-turn-5--secret-messages`, **Compare with a solution** shows the
  second row as "did not compile: CS0103 (The name 'Encode' does not exist
  in the current context)", marked different, beside `"OTTER"`. On
  `your-turn-4` it shows "did not run" and "Your cell did not reach the
  inputs. What happened is under the cell." Both are what the task
  expects before the reader's change.
- **Values the checker formats.** Checked on the page:
  `DrawCheckerboard(4, 2)` shows as `"#.#.\n.#.#\n"`, as C# would write
  the string, and the tuple as `(3, 2)`.
- **The engine's help for CS0103.** Confirmed on the page, and still open:
  see "Open", item 2.
- **A predict on a cell meant to fail.** The page gives a cell with
  `expect:` no mark of its own before it runs (nothing in `web/page/`
  reads `expect`), so the predict on `print-a-print-1` is not answered
  before the run. Checked in a screenshot.
- **An exception inside a method.** Practice 14 names the exception and
  links to the exceptions page. It quotes no frames.

## The porter's questions, and what was decided

1. **The page's length.** Not decided here: see "Open", item 1.
2. **`static` from the first cell.** Decided: keep. The course map's
   entry writes its examples with it (`static void Greet(string name)`,
   `static int Square(int n)`) and says that CS8421 "is one way to keep a
   method pure". The fold on `Greet` says in one line what `static` does,
   and the machines section shows it with a recorded cell.
3. **Methods above their calls.** Decided: keep dewlab's order, methods
   above the calls. The playbook's first step keeps a dewlab page's order
   and changes what C# changes, and C# allows both orders. The page says
   so after the calls-above predict, and "Where to read more" says that
   the Learn module often puts them at the end. A later page may choose
   the other order; this page tells the reader that both work.
4. **The calls-above predict twice.** Decided: keep both. The course
   map's entry asks for a predict on the lesson ("A local method can be
   called above the line that declares it ... (a predict)") and for
   "Called too soon" to become "a predict with the opposite answer" on the
   practice page.
5. **Copying methods into later cells.** Decided: keep. The course map's
   entry says "a later cell that needs `Encode` writes it again, or its
   solution brings it along", and each solution does bring its own.
6. **`expect: CS0019` on `your-turn-4`.** Decided: keep. The code gives
   CS0019, and the checker fails a cell whose `expect:` does not match.
   Decision 27 has a task that starts out not compiling say so, which the
   prose does. The map's "`expect: CS0029` on the teaching cell only" is
   met by `return-or-print-2`.
7. **All three lesson predicts in the first section.** Decided: keep the
   three. Two are dewlab's (the playbook's first step keeps its predicts)
   and one is the course map's. The later sections now have cells meant
   to fail, and each asks a question before its run ("which line do you
   think the compiler will name?"), so the reader still guesses before
   running there, in prose.
8. **Numbers stated as maths.** Decided by decision 29: $f(x) = x^2$ now
   takes 7 and gives 49, which `Square(7)` printed; "13 and 13 make the
   whole 26" became words without the sum; the 3, 4 and 5 triangle is
   printed by `functions-that-use-other-functions-1`.
9. **A method that reads input.** Decided: not on this page. The course
   map's entry lists the practice page's changes, and this is not one of
   them, and *Reading input* is not written yet. It is an idea for when
   that page lands (see "Open", item 5).
10. **Cell length.** Decided: keep the braces on their own lines. The
    style guide's `#code` asks for that, "as Visual Studio does", with no
    exception. Its limit of fifteen lines is there because "a cell with two
    ideas in it wants to be two cells"; `functions-that-use-other-functions-1`
    and `counting-primes-1` each hold one idea, and their length comes
    from the brace lines and from the copies each Run needs.
11. **Python.** Decided: no Python on this page, as on `first-steps`,
    PDP's exemplar, which says "Some languages give every division a
    decimal point" without naming one. A PDP learner may never have met
    Python. (FOOP's `objects-and-classes` names Python, for readers who
    come to FOOP from it.)

## Open

For Josh, or for the orchestrator:

1. **The page's length.** The course map says to move the scope section to
   the practice page "if it runs past an hour", and only a class can say
   whether it does. The move added three cells meant to fail (two new
   cells, and `scope-where-variables-live-1` now fails on purpose), so the
   lesson has 20 cells in each world. The
   scope section stays, for the porter's reasons: the course map's entry
   describes the scope cells as lesson content, and the teacher notes name
   this page for "local and global variables". If it must move, the cut is
   "Scope: where variables live" (two cells, `your-turn-9`, and the
   paragraphs on passing by value and `out`); practice problems 18 to 20
   already cover most of it.
2. **The engine's help under CS0103 names rule 3, and calls a method a
   variable.** On the page, `your-turn-5--secret-messages` with
   `Console.WriteLine(Encode("OTTER", 5));` and no copy of `Encode` shows
   `Program.cs(1,19): error CS0103: The name 'Encode' does not exist in the
   current context`, and under it "Encode was made in a cell above.
   Variables stay in their cell, so make it again in this cell." `Encode`
   is a method, a stub in `your-turn-2--secret-messages` above it, and
   `CollectVariables` in `engine/Dewsharp.Browser/Assembler.cs` counts a
   local function among the "variables above" that `Help` in
   `engine/Dewsharp.Browser/Engine.cs` names. On a PDP page before
   `building-reusable-tools`, the rules are not named yet. A sentence for a
   local function could be "Encode was written in a cell above. Each Run
   starts a new program, so write it again in this cell." The page's own
   hint (`after: 1 errors`) already says that. Not changed: `engine/` is
   outside this move.
3. **`courses/pdp.yaml`** still lists this page under `planned:` (see
   "What was done when it moved").
4. **The link to `building-reusable-tools`** in practice 14 goes nowhere
   until that page lands in this round; the checker reports it until then.
5. **A practice problem that reads input**, once *Reading input* lands:
   `AskForNumber(string question)`, a `do`...`while` with `int.TryParse`,
   returning the number. It needs that page's answer to what a loop does
   when `ReadLine` returns `null`.
6. **Two practice problems called "Half of seven".** Problem 9 here and
   problem 4 on `first-steps-practice` share the title and the id
   `half-of-seven-1` (saved work is keyed by page and cell, so the ids do
   not clash). This one is about the division inside a `double` method,
   and the other about `7 / 2` alone. Rename this one's title if a class
   finds the two confusing; the id should stay.

## Probes

Each cell below checks a claim in the prose that no cell on either page
prints. The porter ran them with NativeCheck; on 28 September 2026 they ran
in the browser, copied into a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), and
every one gave what NativeCheck gave. Since the move, several back claims
the pages no longer make: "What was done when it moved" says which. The
last six probes are new. The cells with `expect:` fail on purpose. None of
them is part of either page.

```csharp exec
id: w-greet-int
expect: CS1503
// Lesson, "Writing a method": Greet(42) does not compile.
static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

Greet(42);
```

```csharp exec
id: w-larger-no-return
expect: CS0161
static int Larger(int first, int second)
{
    if (first > second)
    {
        return first;
    }
}

Console.WriteLine(Larger(3, 8));
Console.WriteLine(Larger(10, 2));
Console.WriteLine(Larger(5, 5));
```

```csharp exec
id: w-return-or-print-without-a
static int DoubleAndReturn(int number)
{
    return number * 2;
}

static void DoubleAndPrint(int number)
{
    Console.WriteLine(number * 2);
}

int b = DoubleAndReturn(5);
Console.WriteLine($"b is {b}");
Console.WriteLine($"b + 1 is {b + 1}");
```

```csharp exec
id: w-add-postage-24
// Lesson, your-turn-4 solution note: the call stands for 24.
static int AddPostage(int price)
{
    return price + 4;
}

Console.WriteLine(AddPostage(20));
```

```csharp exec
id: w-square-of-three
// Lesson, machines section: f(x) = x squared takes 3 and gives 9.
static int Square(int number)
{
    return number * number;
}

Console.WriteLine(Square(3));
```

```csharp exec
id: w-discount-static
expect: CS8421
double discountRate = 0.10;

static double WithDiscount(double price)
{
    return price - price * discountRate;
}

Console.WriteLine(WithDiscount(50));
discountRate = 0.25;
Console.WriteLine(WithDiscount(50));
```

```csharp exec
id: w-checker-equals-one
// Lesson, your-turn-2--pixel-art solution note.
static string Checker(int x, int y)
{
    if ((x + y) % 2 == 1)
    {
        return ".";
    }
    return "#";
}

Console.WriteLine(Checker(-1, 0));
Console.WriteLine(-1 % 2);
```

```csharp exec
id: w-decode-plain-encode
// Lesson, your-turn-5--secret-messages solution note: without + 26.
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)((position + shift) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

Console.WriteLine(Decode("URYYB", 13));
Console.WriteLine('B' - 'A' - 13);
Console.WriteLine(-12 % 26);
Console.WriteLine((-12 % 26 + 26) % 26);
```

```csharp exec
id: w-area-outside
expect: CS0103
static double CalculateArea(double radius)
{
    double pi = 3.14159;
    double area = pi * radius * radius;
    return area;
}

double result = CalculateArea(5);
Console.WriteLine(result);

// What happens if this line runs? Delete the // at its start, and run the cell.
Console.WriteLine(area);
```

```csharp exec
id: w-count-no-type
int count = 0;

void SetCount()
{
    count = 10;
    Console.WriteLine($"inside: {count}");
}

SetCount();
Console.WriteLine($"outside: {count}");
```

```csharp exec
id: w-count-static
expect: CS8421
int count = 0;

static void SetCount()
{
    count = 10;
    Console.WriteLine($"inside: {count}");
}

SetCount();
Console.WriteLine($"outside: {count}");
```

```csharp exec
id: w-variable-below-method
expect: CS0841
// Lesson, scope: a method without static can use a variable made above it, not below it.
void ShowCount()
{
    Console.WriteLine(count);
}

int count = 5;
ShowCount();
```

```csharp exec
id: w-total-static-no-type
expect: CS8421
// Lesson, your-turn-9 solution note: a static method cannot change the total outside.
static int SumUpTo(int last)
{
    total = 0;
    for (int number = 1; number <= last; number++)
    {
        total += number;
    }
    return total;
}

int total = 1000;
Console.WriteLine(SumUpTo(10));
Console.WriteLine(total);
```

```csharp exec
id: w-challenge-as-given
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

string message = "WKH HDJOH KDV ODQGHG DW WKUHH";
int bestShift = 0;
// Try every shift, count the E's, and keep the best.
Console.WriteLine($"{bestShift} {Encode(message, -bestShift)}");
```

```csharp exec
id: w-challenge-one-answer
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

string message = "WKH HDJOH KDV ODQGHG DW WKUHH";
int bestShift = 0;
int mostEs = -1;
for (int shift = 0; shift < 26; shift++)
{
    int count = 0;
    foreach (char letter in Encode(message, -shift))
    {
        if (letter == 'E')
        {
            count++;
        }
    }
    if (count > mostEs)
    {
        mostEs = count;
        bestShift = shift;
    }
}
Console.WriteLine($"{bestShift} {Encode(message, -bestShift)}");
```

```csharp exec
id: w-p-wave-a
static void Wave()
{
    Console.WriteLine("Hi!");
}
```

```csharp exec
id: w-p-wave-b
static void Wave()
{
    Console.WriteLine("Hi!");
}

Wave();
Wave();
```

```csharp exec
id: w-p-wave-c
expect: CS0201
static void Wave()
{
    Console.WriteLine("Hi!");
}

Wave;
```

```csharp exec
id: w-p-describe-swapped
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("cat", "Tom");
```

```csharp exec
id: w-p-args-one
expect: CS7036
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("Tom");
```

```csharp exec
id: w-p-args-three
expect: CS1501
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("Tom", "cat", "grey");
```

```csharp exec
id: w-p-variable-too-soon
expect: CS0841
Console.WriteLine(greeting);
string greeting = "Hi";
```

```csharp exec
id: w-p-iseven-not-one
static bool IsEven(int number)
{
    return number % 2 != 1;
}

Console.WriteLine(IsEven(-3));
Console.WriteLine(-3 % 2);
```

```csharp exec
id: w-p-return-false-both
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
        return false;
    }
    return false;
}

Console.WriteLine(HasFactor(9));
```

```csharp exec
id: w-p-half-point-zero
static double Half(int number)
{
    return number / 2.0;
}

Console.WriteLine(Half(7));
```

```csharp exec
id: w-p-print-a-print-nested
expect: CS1503
// Practice 10: why the cell stores the result instead (see the table above).
Console.WriteLine(Console.WriteLine("hi"));
```

```csharp exec
id: w-p-price-with-tax-static
expect: CS8421
double taxRate = 0.23;

static double PriceWithTax(double price)
{
    return price * (1 + taxRate);
}

Console.WriteLine(PriceWithTax(10));
```

```csharp exec
id: w-p-roll-static
static int Roll()
{
    return Random.Shared.Next(1, 7);
}

int roll = Roll();
Console.WriteLine(roll >= 1 && roll <= 6);
```

```csharp exec
id: w-p-rot13-twice
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)((position + shift) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

Console.WriteLine(Encode("OTTER", 13));
Console.WriteLine(Encode(Encode("OTTER", 13), 13));
```

```csharp exec
id: w-p-share-zero
expect: exception
static int ShareEqually(int total, int people)
{
    return total / people;
}

Console.WriteLine(ShareEqually(12, 0));
```

```csharp exec
id: w-p-share-double
static double ShareEqually(double total, double people)
{
    return total / people;
}

Console.WriteLine(ShareEqually(12, 0));
Console.WriteLine(12.0 / 0);
```

```csharp exec
id: w-p-prime-without-guard
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

static bool IsPrime(int number)
{
    return !HasFactor(number);
}

Console.WriteLine(IsPrime(1));
Console.WriteLine(HasFactor(1));
```

```csharp exec
id: w-p-primes-below-50
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

static bool IsPrime(int number)
{
    if (number < 2)
    {
        return false;
    }
    return !HasFactor(number);
}

for (int number = 1; number < 50; number++)
{
    if (IsPrime(number))
    {
        Console.Write($"{number} ");
    }
}
Console.WriteLine();
```

```csharp exec
id: w-p-tuple-names
static (int, int) DivideWithRemainder(int number, int divisor)
{
    return (number / divisor, number % divisor);
}

(int times, int leftOver) = DivideWithRemainder(17, 5);
Console.WriteLine($"{times} {leftOver}");
Console.WriteLine(Math.DivRem(17, 5));
```

```csharp exec
id: w-p-copy-returned
static int AddOne(int number)
{
    return number + 1;
}

int score = 5;
score = AddOne(score);
Console.WriteLine(score);
```

```csharp exec
id: w-p-read-outside
string greeting = "Hello";

string Greet(string name)
{
    return greeting + ", " + name;
}

Console.WriteLine(Greet("Ada"));
```

```csharp exec
id: w-p-change-outside
int total = 0;

void Add(int amount)
{
    total = total + amount;
}

Add(5);
Console.WriteLine(total);
```

```csharp exec
id: w-p-read-outside-static
expect: CS8421
string greeting = "Hello";

static string Greet(string name)
{
    return greeting + ", " + name;
}

Console.WriteLine(Greet("Ada"));
```

```csharp exec
id: w-p-change-outside-static
expect: CS8421
int total = 0;

static void Add(int amount)
{
    total = total + amount;
}

Add(5);
Console.WriteLine(total);
```

```csharp exec
id: w-p-pass-in-return
static int Add(int total, int amount)
{
    return total + amount;
}

int total = 0;
total = Add(total, 5);
Console.WriteLine(total);
```

```csharp exec
id: w-p-how-many-times-trace
int number = 100;
while (number > 1)
{
    number = number / 3;
    Console.WriteLine(number);
}
```

```csharp exec
id: w-p-biggest-first
int brightness = 200;
string pixel = ".";
if (brightness >= 64)
{
    pixel = "-";
}
else if (brightness >= 192)
{
    pixel = "#";
}
Console.WriteLine(pixel);
```

```csharp exec
id: w-p-two-decimal-places
Console.WriteLine($"{2 / 3:F2}");
Console.WriteLine($"{2.0 / 3:F2}");
Console.WriteLine(2 / 3);
Console.WriteLine(2.0 / 3);
```

```csharp exec
id: without-int-count
// Lesson, scope: without int, the line changes the count outside.
int count = 0;

void SetCount()
{
    count = 10;
    Console.WriteLine($"inside: {count}");
}

SetCount();
Console.WriteLine($"outside: {count}");
```

The last five are the programs in the second unit of the Learn module,
*Understand the syntax of methods*, as the unit writes them. The four
whole programs print what the unit shows (`Hello World!`;
`Contents of Array:` and `1 2 3 4 5`; the three lines before, in and
after the call). A bare signature is not a program: CS8112.

```csharp exec
id: learn-say-hello-defined
void SayHello() 
{
    Console.WriteLine("Hello World!");
}

SayHello();
```

```csharp exec
id: learn-say-hello-called-first
SayHello();

void SayHello() 
{
    Console.WriteLine("Hello World!");
}
```

```csharp exec
id: learn-print-array
int[] a = {1,2,3,4,5};

Console.WriteLine("Contents of Array:");
PrintArray();

void PrintArray()
{
    foreach (int x in a)
    {
        Console.Write($"{x} ");
    }
    Console.WriteLine();
}
```

```csharp exec
id: learn-before-after
Console.WriteLine("Before calling a method");
SayHello();
Console.WriteLine("After calling a method");

void SayHello() 
{
    Console.WriteLine("Hello World!");
}
```

```csharp exec
id: learn-signature-only
expect: CS8112
void SayHello();
```
