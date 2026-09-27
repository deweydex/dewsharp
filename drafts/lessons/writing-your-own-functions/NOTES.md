# writing-your-own-functions: notes for a reviewer

Ported from dewlab `tutorials/writing-your-own-functions/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 14):
action *adapt*, shape *tutorial*, size L, batch 3, depends on
`repeating-yourself`, covers PDP-LO8 and PDP-LO11, worlds secret messages
and pixel art. The id keeps dewlab's name (`DECISIONS.md` 9); the page says
*method*.

Status: written in one run on 27 September 2026. There was no partial
draft: the folder did not exist. Every cell, every solution and every
`inputs` row of both pages was run with NativeCheck, in both worlds, and
the last line printed was "No problems." for each page, for the probes at
the end of this file, and again for each file with `--json`.

Files:

- `writing-your-own-functions.md`: the lesson. 22 exec cells, 8 of them in
  world variants (18 tasks when a pair of variants counts once); 3
  predicts, 13 hints, 10 solutions, 6 `inputs` blocks, 1 answer fold, 1
  challenge, 2 cells meant to fail (`expect: CS0029`, `expect: CS0019`).
- `writing-your-own-functions-practice.md`: the practice page, 23
  problems. 20 exec cells, 2 of them in world variants; 4 predicts, 5
  hints, 10 solutions, 9 `inputs` blocks, 3 cells meant to fail
  (`expect: CS0161`, `CS0029`, `CS0019`).
- `writing-your-own-functions.native.json`,
  `writing-your-own-functions-practice.native.json`: what NativeCheck
  recorded for every cell, solution and input.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).
- `NOTES.native.json`: what NativeCheck recorded for the probes.

## Frontmatter

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

## What changed, and why

### What the reader already knows

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

### Links: back only, as the batch rule says

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

### The lesson, section by section

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
invitation to delete `return second;`, which gives CS0161, and the page
defines *code path*. This is the first of C#'s "the compiler checks every
path" points, and practice 8 uses it again.

**Your turn 2.** dewlab's sentence about a guess column goes (dewsharp has
none). It now says that **Compare with a solution** runs both on each case,
and asks the reader to write a guess down first. Each stub returns a
placeholder (`return "";`) so that it compiles, and calls the method once,
so that a Run shows something and there is no CS8321. The `Checker`
solution's note is new: `-1 % 2` is -1 in C#, so a method that asks
`== 1` for the odd pixel returns `#` for `Checker(-1, 0)` (probe). dewlab's
input `checker(-1, 0)` is kept for this reason.

**Return or print?** `return-or-print-1` is dewlab's cell. dewlab's second
cell printed `a is None`. In C# it does not compile
(`expect: CS0029`, "Cannot implicitly convert type 'void' to 'int'"), and
the prose says before the run that it is meant to fail, asking which line
the compiler will name, as `a-total-that-starts-again` does. An invitation
to delete two lines shows `b is 10` and `b + 1 is 11` (probe). `None` is
gone; `void` replaces it, and the table's last row now asks what is in
front of the method's name.

**`your-turn-4`** starts as a cell that does not compile. The compiler
gives CS0019 ("Operator '*' cannot be applied to operands of type 'void'
and 'int'"), not CS0029, so the cell has `expect: CS0019`. The course map
says "`expect: CS0029` on the teaching cell only"; I read that as CS0029 on
`return-or-print-2`, and this cell carries the code the compiler gives.
The prose says it is meant to fail and that the task is to change it.

**Methods as input-output machines.** The $f(x) = x^2$ paragraph stays,
shortened (dewlab's −3 example is gone). The discount cell is dewlab's,
with the method written *without* `static`, and the prose says so before
the run. It prints 45 and 37.5 (not 45.0: C# prints no `.0`). *Pure
method* is defined as dewlab defines a pure function. Then an invitation to
write `static` in front of the method gives CS8421, and this is where the
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
because `-12 % 26` is -12 (probe). So a reader whose `Encode` came from the
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
probe). dewlab's sentence "Giving a name a value inside a function never
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
the reviewer wants one.

### The practice page

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

The practice page has four predicts, as dewlab's has. Two more problems
(18 and 21) ask their question in prose instead, to stay near the style
guide's "two or three".

### The glossary file

dewsharp has no glossary panel (`docs/LESSON_FORMAT.md`), so each of
dewlab's entries is defined in the prose where it first appears: *call*,
*body*, *parameter*, *argument*, *return* (lesson, "Writing a method");
`None` becomes `void` ("no value"); *pure* (machines section); *scope*,
*local*, *global* (scope section); *modular programming* (Looking back).
*Domain* and *inverse* are gone with the maths. New terms defined where
they appear: *method*, *function*, *local function*, *declared*, *return
type*, *code path*, `static`, *hides*, *passing by value*, `out`; on the
practice page *overload*, *side effect*, *edge cases*, *tuple*, *prime*.

## What C# made different, in short

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

## Where each number in the prose comes from

Lesson (from `writing-your-own-functions.native.json` unless a probe is
named):

| Prose | Source |
|---|---|
| `Program.cs(1,13): warning CS8321` | `defining-a-function-1` |
| the password twice | `defining-a-function-2` |
| `Greet(42)` does not compile | probe `w-greet-int` (CS1503) |
| `dog is a Rex.` | `defining-a-function-3` |
| 49 (and 144 printed) | `functions-reusable-algorithms-2` |
| returns 10, returns 5 | `giving-a-value-back-1` |
| `Program.cs(1,12): error CS0161` | probe `w-larger-no-return` |
| only one line | `return-or-print-1` (prints `10`) |
| `Program.cs(11,9): error CS0029` | `return-or-print-2` |
| `b is 10`, `b + 1 is 11`, CS8321 | probe `w-return-or-print-without-a` |
| 48 | `your-turn-4` solution and its input |
| "the call stands for 24" | probe `w-add-postage-24` |
| $f(x) = x^2$: 3 gives 9 | probe `w-square-of-three` |
| 45 and 37.5 | `functions-as-input-output-machines-1` |
| `Program.cs(5,28): error CS8421` | probe `w-discount-static` |
| `-1 % 2` is -1; `Checker(-1, 0)` gives `#` with `== 1` | probe `w-checker-equals-one` |
| -12, `-12 % 26` is -12 not 14, `HELL5` | probe `w-decode-plain-encode` |
| `OTTER` | `your-turn-5--secret-messages` solution, input 2 |
| `Mirror(Mirror(3, 8), 8)` is 3 | `your-turn-5--pixel-art` solution, input 3 |
| 25 and 5 | `functions-that-use-other-functions-1` |
| shift 3, `THIS IS A SECRET`; 26 lines | `your-turn-7--secret-messages` solution |
| `Program.cs(12,19): error CS0103` | probe `w-area-outside` |
| inside 10, outside 0 | `scope-where-variables-live-2` |
| `outside: 10` without `int` | probe `w-count-no-type` |
| a `static` method cannot change it | probe `w-count-static` (CS8421) |
| made *above* the method | probe `w-variable-below-method` (CS0841) |
| 55, 7.75 and 1000 | `your-turn-9` solution |
| could not change `total` "even by mistake" | probe `w-total-static-no-type` |

Practice (from `writing-your-own-functions-practice.native.json` unless a
probe is named):

| Prose | Source |
|---|---|
| 1 (a) CS8321, (b) `Hi!` twice, (c) `Program.cs(6,1)` CS0201 | probes `w-p-wave-a`, `w-p-wave-b`, `w-p-wave-c` |
| 2 `cat is a Tom.`, CS7036 and CS1501 at (6,1) | probes `w-p-describe-swapped`, `w-p-args-one`, `w-p-args-three` |
| 3 `hello!` | `called-too-soon-1`; CS0841 at (1,19): probe `w-p-variable-too-soon` |
| 5 `-3 % 2` is -1, `!= 1` says -3 is even | probe `w-p-iseven-not-one` |
| 6 `Factorial(0)` gives 1 | `factorial-1` solution |
| 7 True, False, False | `found-or-not-found-1` |
| 8 CS0161 on line 1, CS0162 at `divisor++` | `one-step-too-far-in-1`; `False` for 9 with two returns: probe `w-p-return-false-both` |
| 9 prints 3; 3.5 with `2.0` | `half-of-seven-1`; probe `w-p-half-point-zero` |
| 10 `Program.cs(1,16): error CS0029` | `print-a-print-1` |
| 11 22; CS0019 with `void` | `two-rooms-1` and its solution |
| 12 (b) CS8421 with `static`; (c) compiles | probes `w-p-price-with-tax-static`, `w-p-roll-static` |
| 13 ROT13 twice gives the message back | probe `w-p-rot13-twice` |
| 14 3; `DivideByZeroException`; ∞ | `an-input-it-cannot-take-1`; probes `w-p-share-zero`, `w-p-share-double` |
| 15 True False False; 15; the fifteen primes; `IsPrime(1)` True without the guard | `functions-that-use-other-functions-2`, `counting-primes-1` solution; probes `w-p-primes-below-50`, `w-p-prime-without-guard` |
| 17 (-3, -1); `Math.DivRem`; two names | `two-answers-at-once-1` inputs; probe `w-p-tuple-names` |
| 18 `outside: 5`, 6 | `a-copy-of-the-value-1`; `score = AddOne(score)`: probe `w-p-copy-returned` |
| 19 `10 0` | `scope-1` |
| 20 `Hello, Ada`, 5, CS8421 twice, pass-in version prints 5 | probes `w-p-read-outside`, `w-p-change-outside`, `w-p-read-outside-static`, `w-p-change-outside-static`, `w-p-pass-in-return` |
| 21 4; 33, 11, 3, 1 | `from-earlier-how-many-times-1`; probe `w-p-how-many-times-trace` |
| 22 `-` for 200 | probe `w-p-biggest-first` |
| 23 `0.00`, `0.67`, 0, 0.6666666666666666 | probe `w-p-two-decimal-places` |

The message positions (`Program.cs(line,col)`) in the prose are
NativeCheck's positions, which name the cell id where the page names
`Program.cs`. Each probe that backs a quoted position has the same lines
as the cell after the reader's edit.

## To revisit once the page UI exists

- **Warnings on untouched cells.** `defining-a-function-1` shows CS8321 on
  purpose. `counting-primes-1` shows it too (its stub does not call
  `IsPrime` yet); the practice intro says so. Check the quieter style does
  not read as a failure.
- **Empty stubs.** `your-turn-1--*` are comments only (kind `empty`), with a
  hint `after: 1 runs`. Check that a Run of an empty cell counts, as the
  loops draft also needs.
- **`inputs` rows that fail on an untouched stub.** In
  `your-turn-5--secret-messages`, `Decode(Encode("OTTER", 5), 5)` does not
  compile until the reader copies `Encode` in. `your-turn-4`,
  `one-step-too-far-in-1` and `two-rooms-1` do not compile at all until
  changed. Check what **Compare with a solution** shows in those rows.
- **Values the checker formats.** A multi-line string
  (`DrawCheckerboard(4, 2)`) and a tuple (`(3, 2)`). Check both display as
  the format promises.
- **The engine's help for CS0103.** When a name from a cell above is a
  method, `Engine.cs` says "`Encode` was made in a cell above. Variables
  stay in their cell, so make it again in this cell." For a method the
  word *Variables* is off; "Encode was made in a cell above. Each Run
  starts a new program, so write it again in this cell" would fit this
  page. That is outside this folder, so it is only noted here.
- **A predict on a cell meant to fail.** `print-a-print-1` has a choice
  predict with "It does not compile" as an option, and the sentence saying
  the cell is meant to fail comes after the predict. Check that the
  expected-failure styling does not answer the guess before the run.
- **An exception inside a method.** Practice 14 stops in `ShareEqually`.
  The prose names only the exception, because what the page shows for the
  frames is open question 9 of the course map.

## Open questions for a reviewer

1. **The page's length.** 22 exec cells and 18 tasks; the map says "move
   the scope section to the practice page if it runs past an hour", and by
   the map's own sizes it will. I kept scope on the lesson: the map's
   "What changes in C#" and "Cells and blocks to rework" describe the scope
   cells as lesson content, the teacher notes name this page for "local
   and global variables", and a practice page is problems rather than
   teaching. If it must move, the cut is the section "Scope: where
   variables live" (two cells, `your-turn-9`, and the paragraphs on passing
   by value and `out`); practice problems 18 to 20 already cover most of
   it.
2. **`static` from the first cell.** The map's examples have it, and it
   gives CS8421 its point. But the reader meets a keyword on the first line
   whose meaning waits until the machines section, and Microsoft Learn's
   module writes methods without it. The other choice: no `static` until
   the machines section, then `static` from there on.
3. **Methods above their calls.** dewlab's order, and "read the name before
   you see it used". Microsoft's module and much C# code put local functions
   at the end. Either works; the pages after this one should agree.
4. **The calls-above predict appears twice**, in the lesson
   (`defining-a-function-2`) and in practice 3, because the map asks for a
   predict in both places. Practice 3's fold adds the contrast with a
   variable (CS0841), so it is not only a repeat.
5. **Copying methods into later cells.** `your-turn-5` and `your-turn-7`
   ask the reader to copy their own `Encode`, `Decode` or `Checker` in
   (rule 1, as the map says). The other choice is a stub that includes a
   finished `Encode`, which would show the answer to `your-turn-2` above
   its fold.
6. **`expect: CS0019` on `your-turn-4`** (see the lesson section above).
7. **All three lesson predicts are in the first section.** The later
   guesses (return or print, discount, inside and outside) are questions
   in the prose. Move one predict later (the discount cell is the likeliest)
   and drop the argument-order predict?
8. **Numbers stated as maths.** "$f(x) = x^2$ takes 3 and gives 9", "13 and
   13 make the whole 26" and "sides 3 and 4, the longest side is 5" are
   backed by runs, but the course map's open question 7 (numbers with no
   cell) applies to lines like these.
9. **A method that reads input.** A practice problem such as
   `AskForNumber(string question)`, a `do`...`while` with `int.TryParse`,
   would join this page to `reading-input`. I left it out until
   `reading-input` settles what a loop does when `ReadLine` returns `null`
   (End input); without that, such a loop never ends.
10. **Cell length.** `functions-that-use-other-functions-1` is 17 lines and
    `counting-primes-1` 24, because each method's braces take their own
    lines. Accept, or allow one-line bodies here?
11. **Python.** dewlab's page compared nothing with other languages. This
    page mentions Python nowhere, even where C# is the opposite
    (a method changing a top-level variable). A PDP learner in C# may never
    have used Python, so I left it out; a one-line `python` fence in
    practice 20 would help a reader who has.

## Probes

Each cell below checks a claim in the prose that no cell on either page
prints. Run them with the same NativeCheck command, passing `NOTES.md` as
the file. The cells with `expect:` fail on purpose. None of them is part of
either page.

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
