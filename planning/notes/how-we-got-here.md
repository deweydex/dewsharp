# how-we-got-here: notes for a reviewer

Written from dewlab `tutorials/how-we-got-here/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file, with the table of
characteristics from dewlab's `many-languages-one-idea`. The brief is the
course map's entry (`planning/COURSE_MAP.md`, PDP row 24): action *adapt*,
shape *tutorial*, size L, batch 5, covers PDP-LO1 and PDP-LO3, worlds
secret messages and pixel art. The folder did not exist when this run
started, so there was no partial draft to finish; both pages were written
from the start.

Files:

- `how-we-got-here.md`: the lesson. 13 exec cells, 6 of them in world
  variants (3 tasks in each world); 2 predicts, 11 hints, 7 solutions,
  6 `inputs` blocks, 2 challenges (one for each world), 1 answer fold,
  5 fences to read (the sum for 101010, and the four C# programs of the
  paradigm section that PDP has not taught), 2 tables. No cell is meant to
  fail. One cell is empty on purpose (`your-turn-1`, the reader's working
  as comments; the checker runs its solution in its place).
- `how-we-got-here-practice.md`: the practice page, 21 problems. 16 exec
  cells, 2 of them in world variants; 3 predicts, 6 hints, 4 solutions,
  4 `inputs` blocks, 18 answer folds. One cell is a types cell (`Test`,
  problem 20). Two cells are meant to fail, both with `expect: exception`:
  `from-earlier-a-key-that-is-missing-1` and
  `from-earlier-a-test-that-asks-the-wrong-thing-1`.
- `how-we-got-here.native.json`, `how-we-got-here-practice.native.json`:
  what the native check recorded for every cell, solution and `inputs`
  row, in both worlds.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell of both pages, every solution and every `inputs` row was run
with NativeCheck in both worlds, and the last line it printed was
"No problems." for each page and for the probes; then again with `--json`
for each of the three files. Both pages also went through the real parser,
`web/lesson/parse.js` (`parseLesson` with the page id), with no errors; the
counts above are the parser's. No cell reads input, so no cell has
`stdin:` (dewlab's page read none either). No cell uses `Console.ReadKey`,
`Clear` or colours. The pixel-art challenge mentions `Console.Clear()` in
its prose, as something the reader may add; the challenge's own code does
not use it, and the native check does not run challenges (see "Probes").

## Frontmatter

- `title`: the course map's, "Programming languages: how they came to be".
  dewlab's was "How programming languages came to be". The practice page
  is "Programming languages: practice", the short title and "practice", as
  the other drafted practice pages are named.
- `version: 2026.09.27.1`, as the brief says.
- `from: how-we-got-here`; the practice page has
  `from: how-we-got-here-practice` and `practice_for: how-we-got-here`, as
  the other drafted practice pages do.
- `worlds`: dewlab's two, with dewlab's sentences.
- `covers: [PDP-LO1, PDP-LO3]`, from the course map. dewlab's per-section
  `covers:` also named MIT-1.4, an outcome of the integrated course, which
  goes.
- `year:` is dropped: the format has no such field.

## What the reader already knows

PDP's order puts this page at 24, after `when-it-goes-wrong`. The drafts it
leans on:

- `storing-and-computing`: `(int)'A'` and `(char)67` as casts, a string
  cannot be changed, `ToUpper()`, `+` joining text.
- `first-steps`, `dividing-in-csharp`: `/` with two whole numbers drops the
  part after the point; `%`.
- `types-and-their-sizes` (no draft yet): bytes, the sizes of types,
  `decimal` for money. This page says "Eight bits are a byte" again in
  passing, so it does not depend on that page's wording.
- `compiler-errors` (no draft yet): its fold names the in-between form and
  the .NET runtime. This page names them again in full, so it stands alone
  if that fold changes.
- `writing-your-own-functions`: `static` methods in a program cell, above
  their calls; a method that has no `static` can use a variable of the
  program (the secret-messages challenge's `MoreOftenFirst`).
- `lists-and-sequences`: arrays, `List<T>` and `Add`, ranges such as
  `[1..3]`, `string.Join`.
- `grids-and-references`: `string[][]` (the pixel-art challenge), `==` on
  two arrays compares references (practice 20).
- `looking-things-up-by-name`: `Dictionary<char, int>`, `GetValueOrDefault`
  with and without a default, `Keys`.
- `putting-things-in-order`: *tuple* (the swap), a method's name passed to
  `Array.Sort` with no brackets (`ByLength`), `counts.Keys.ToArray()` and a
  comparison that uses a dictionary (the secret-messages challenge is the
  same shape as its `your-turn-4--secret-messages`).
- `building-reusable-tools`: the rules of the road, `static class Test` with
  `Check<T>` (practice 20), *class* and *field*.
- `when-it-goes-wrong`: `NullReferenceException` (practice 19). Its last
  section already names this page as "The next page, *Programming
  languages*".

New here, each defined where it first appears: *conditional branching*,
*machine code*, *base 10*, *binary*, *bit*, *ASCII*, *byte* (in the hex
section and again in both world solutions), *assembly language*,
*assembler*, *hexadecimal*, *high-level language*, *compiler*,
*interpreter*, *Intermediate Language* (IL), *.NET runtime*,
*characteristics*, *syntax*, *paradigm*, the four paradigms, *LINQ*, a
small method with no name (the word *lambda* is not used), `Func<int,
bool>`, *class* and *object* (for reading), *keyword* (in a secret-messages
hint), *magic number* (practice 17). Methods and tools new here:
`Convert.ToString(n, 2)`, `Convert.ToString(n, 16)`,
`Convert.ToInt32(text, 2)`, `Convert.ToInt32(text, 16)`, `PadLeft`, the
`0b` and `0x` prefixes, `digit - '0'`, and `IndexOf` on a string
(practice 7).

## Links: decision 32

The brief says links use `[text](lesson:<id>)`. `DECISIONS.md` 32 and 39
and `docs/LESSON_FORMAT.md` ("Links") say a `lesson:` link must go to a
page in `lessons/`, and a page not there yet is named by its short title in
italics. Only `first-steps` and `objects-and-classes` are in `lessons/`,
and this page needs neither. So, as in the drafts of `putting-things-in-order`
and `building-reusable-tools`, the one link is the lesson's link to its own
practice page, which moves into `lessons/` with it.

| Where | Italic name now | Link to make when that page is in `lessons/` | That page's batch |
|---|---|---|---|
| lesson, after the `FromBinary` cell | *Variables and types* | `lesson:storing-and-computing` | 1 |
| lesson, secret messages, the vault | *Sorting* | `lesson:putting-things-in-order` | 6 |
| lesson, the functional version | *Sorting* | `lesson:putting-things-in-order` | 6 |
| lesson, after the characteristics table | *Many languages, one idea* | `lesson:many-languages-one-idea` | 13 (explore) |
| lesson, after the four paradigms | *Fundamentals of Object-Oriented Programming* | the FOOP course page, not a lesson | — |
| lesson, before "Where to read more" | *Mixed problems* for this series | `lesson:mixed-programming` | 9 |
| practice 19 | *Dictionaries*, *Debugging* | `lesson:looking-things-up-by-name`, `lesson:when-it-goes-wrong` | 4, 8 |
| practice 20 (twice each) | *Reusable methods*, *Grids and references* | `lesson:building-reusable-tools`, `lesson:grids-and-references` | 7, 4 |
| practice 21 | *Dictionaries* | `lesson:looking-things-up-by-name` | 4 |

Pages that point here, which I did not edit (this run writes only in this
folder): `when-it-goes-wrong.md` ends with "The next page, *Programming
languages*, leaves our own programs for a while", which matches this page's
title and opening.

dewlab's `tutorial:mixed-programming` link becomes the italic name above.

## What changed, and why

### The lesson, section by section

**Opening (`one-number-two-ways-1`).** The same two lines in C#:
`0b101010` is a binary literal in C# too, and `0b101010 == 42` prints
`True` (C# writes a `bool` with a capital T). The predict keeps its three
options; "An error" became "Nothing: it does not compile", in the style
guide's words. "This is the last page of the series" became "the last
lesson of the series, before its mixed problems", because PDP's series
here ends with `mixed-programming`. dewlab's "it looks back" became "it is
about the past" (a phrasal verb).

**Before there were computers.** Prose only, as dewlab's. The definition of
*conditional branching* now names the term before it defines it.

**The only language the machine understands.** The prose is dewlab's, with
*bit* defined here, since both worlds use it. The dewlab cell had `bin()`,
two functions and three prints (the course map's "`ToBinary` and
`FromBinary` become methods"). In C#, with braces on their own lines, that
is about thirty lines, so it became two cells:

- `the-only-language-the-machine-understands-1` keeps the dewlab id and
  the task: `Convert.ToString(42, 2)` (the map's replacement for `bin()`)
  and `ToBinary`, with dewlab's question about `ToBinary(72)` made into a
  choice predict. The wrong-direction option (`0001001`) is the likely
  guess of someone who follows the loop without noticing that each digit
  goes to the front.
- `the-only-language-the-machine-understands-2` is new: `FromBinary` beside
  `Convert.ToInt32("01001000", 2)`, and a third line, `(char)FromBinary(...)`,
  which prints `H`. That line is where *ASCII* is now defined, in shared
  prose: dewlab defined ASCII only in the secret-messages task, but the hex
  section's "all of them are H" and the practice page (problem 5) need it
  in both worlds, and dewsharp has no glossary panel to fall back on.
  `digit - '0'` replaces Python's `int(digit)`; the page says why it works.

`your-turn-1` keeps its comments-only starter. Its answer was a fold with
25 and `1100100`; by decision 29 those numbers must be printed, so the fold
became a `solution` whose two `Convert` lines print them (the style of
`first-steps`' `your-turn-1`, a solution without `inputs`). The note adds a
sentence on how to write a number in binary by hand.

`your-turn-2--secret-messages`: `DecodeBinary(string[] groups)`, with
`FromBinary` in the starter (each Run starts a new program, so the method
must be in the cell). The starter calls `FromBinary(message1945[0])` and
prints 72: without that call, the unused `FromBinary` gives warning
CS8321, and a starter with a warning is one of the pitfalls in
`docs/TRANSLATING.md`. It also gives the first hint something to point at.
`chr()` became the `(char)` cast. The `inputs` lose `guess: yes`; the empty
list became `new string[0]`, as `finding-things` wrote an empty array.

`your-turn-2--pixel-art`: `DrawBinary` returns a `List<string>`, as dewlab
returned a list; the starter makes the empty list and returns it. The
solution note defines *byte* again for this world.

Both world tasks gained a first hint that asks a question (the style
guide); dewlab's hint became the second, `after: 2 runs`.

**Assembly, and why hexadecimal exists.** The prose is dewlab's. The cell
keeps its four lines with C#'s tools (`Convert.ToString(255, 16)` prints
`ff`, small letters; `0x48`; `Convert.ToInt32("48", 16)`;
`Convert.ToString(72, 2)`, since `ToBinary` is not in this cell) and adds
a fifth, `PadLeft(8, '0')`, which prints `01001000`. The paragraph about
the zero in front now shows how to put it back, which the pixel-art task
and practice problems 4 and 18 need. "easy to get wrong" became "mistakes
are easy to make" (the checklist's words).

`your-turn-3--secret-messages` (`DecodeHex`): as dewlab, plus a hint (dewlab
had none).

`your-turn-4--secret-messages` (the vault): dewlab's list of two-element
lists became an array of tuples, `(string, string)[]`, and the loop
`foreach ((string numberBase, string code) in pairs)`. The other choices
were a jagged `string[][]` (each of the 20 entries would need
`new string[] { ... }`) or two arrays side by side (which hides the pairs).
`base` is a C# keyword, so the name is `numberBase`; the second hint says
so, and says that the compiler's first message for `base` (CS1525,
probed below) does not name it: the reader meets one mistake with many
messages, as `compiler-errors` teaches. The solution
prints `Convert.ToInt32("00100000", 2)` as well, so that the 32 in its note
is printed (decision 29).

`your-turn-3--pixel-art` (`DrawHex`): dewlab's hint used
`"0" * (8 - len(bits)) + bits`; the C# hint uses `PadLeft(8, '0')`, which
the lesson now shows. The solution also prints `11000`, the number its note
quotes.

`your-turn-4--pixel-art` (`Rgb`): returns `int[]`; Python's slices
`colour[1:3]` became ranges `colour[1..3]`. The starter prints the three
with `string.Join`, since printing an array prints its type.

**Languages people can read.** dewlab's table gains C# (2000), and Python
(1991) is now "the first language of many programmers" rather than "what
you are writing now", as the map says. The compiler and interpreter
paragraph is dewlab's. Two paragraphs are new, from the map's "uses C# as
the reader's own example": C# compiles to Intermediate Language, and the
.NET runtime makes machine code for each machine just before each part
runs; and on this page, in the browser, the runtime runs the IL with an
interpreter, so compiled or interpreted belongs to the tool, not the
language (the point dewlab's `many-languages-one-idea` makes with BASIC).
Then a table of characteristics for C, Python and C#, taken in shape from
`many-languages-one-idea` (the map: "for the table"), with the rows that
fit these three languages: how it runs, types, blocks of code, made for.
Its paragraph defines *characteristics* and *syntax*, the words of PDP-LO3,
asks in which row C# is closer to Python than to C, and names the explore
page *Many languages, one idea*.

**The same problem, four ways.** The map asks for "a loop (procedural),
LINQ's `Where` and `Sum` (declarative), a method passed to another method
(functional) and a class (object-oriented); the last three are code to
read", and the cells-to-rework line says the paradigm cells become
`csharp` fences where they use what PDP has not taught. `Where` and `Sum`
do not double a list, so the job changed from dewlab's "double every
number" to "the total of the even numbers in an array". dewlab's doubling
survives in practice 15, with `Select`.

- `the-same-problem-four-ways-1` keeps its id and runs the procedural
  version only (12).
- Three fences to read follow, each a whole program that a reader could
  copy into a notebook: `Where` and `Sum` with a lambda (the page calls it
  "a small method with no name" and does not use the word *lambda*);
  `TotalOf(numbers, IsEven)` with `Func<int, bool>`, tied to `ByLength` on
  *Sorting*; and a `NumberList` class with a constructor. Each prints 12
  (probes `l-declarative`, `l-functional`, `l-object-oriented`).
- dewlab's `self` sentence became one on *class* and *object*, in the
  style guide's terms. "None of them is right and the others wrong" became
  "No one of the four is better than the others in every case" (no verdict
  words).
- `the-same-problem-four-ways-2` keeps its id and runs snippets 1 and 2
  (13.70 twice). The prices are `decimal`, the type for money that
  `types-and-their-sizes` is to teach, so they print as 13.70. Snippet 3,
  the `Basket` class, is a fence to read (probe `l-basket` prints 13.70).
  The answer fold gains the style guide's line "Here is one answer. Yours
  may be different and work too." and says that all three print 13.70.

**Looking back.** dewlab's closing question stays. "you can take it as far
as you like" (an idiom) became "and there is no last step".

- The secret-messages challenge counts letters with a
  `Dictionary<char, int>` and sorts them with `MoreOftenFirst`, the
  comparison the reader wrote on *Sorting*; dewlab used `sorted(counts,
  key=...)`. It compiles on its own (probe `l-challenge-secret-messages`,
  first in the probes so that no class is above it).
- The pixel-art challenge keeps its frames as a `string[][]`, and a `for`
  loop replaces `enumerate`. The prose adds that `Console.Clear()` and
  `Console.ReadLine()` work on the page, so a frame can replace the one
  before. The starter does not use them, so the native check can run it
  (probe `l-challenge-pixel-art`).
- The closing lines link the practice page, then name *Mixed problems* in
  italics.

**Where to read more.** dewlab's four sources stay. One is added for C#:
Microsoft's *Managed Execution Process* (checked: it loads, and it describes
CIL and the JIT compiler, which the note tells the reader).

### Predicts

Two on the lesson, both where a guess is interesting: the `0b` literal
(does C# print the digits, the number, or refuse it?) and `ToBinary(72)`
(the digit order). The hex cell has none: its surprises are the same as the
opening's. The practice page has three, as dewlab's had, on problems 19, 20
and 21.

### The practice page

| Problem | dewlab | Here |
|---|---|---|
| Tools (`tools-1`) | built `to_binary` and `from_binary` for later cells | Cells share nothing (rule 1), and C# has both tools built in, so the cell shows the four `Convert` calls and `(char)` on 72, and the prose says that a method of your own must be in its cell. Same id, same job. |
| 1. Binary to base 10 | by hand, "then check" in the tools cell; answer in a fold | New cell `binary-to-base-10-1` prints the four answers and 255 and 256, which the fold quotes (decision 29). |
| 2. Base 10 to binary | the same | New cell `base-10-to-binary-1`. |
| 3. Base 10 to hex | the same | New cell `base-10-to-hex-1`, with `ToUpper()` so that it prints the fold's capitals. The fold says why FFF is twelve binary digits. |
| 4. Hex to binary, straight | the same | New cell `hex-to-binary-straight-1`, with `PadLeft(8, '0')` so that `7E` prints as `01111110`. The prose says the cell goes through a number, and the reader does not need to. |
| 5. Two letters | fold | New cell `two-letters-1`. |
| 6. A colour | fold | New cell `a-colour-1`, with ranges. |
| 7. Reading hex without `int` | `read_hex` stub returning 0, with `digits` in it | Renamed `reading-hex-without-convert-1` (decision 28: the old id names Python's `int()`). A stub with an unused `digits` gives warning CS0219 (probed while writing), so the starter reads the last digit only (`total = digits.IndexOf(character);`, which prints 10) and the task is to complete it: worked, then completed. The first hint is a question. |
| 8–11 | folds | The same, in plain words; "tell ... apart" replaces "separate". |
| 12. Compiled or interpreted | fold | The fold gains a paragraph on the compiler checking the whole program first, which a C# reader has met on every page. "hunting a bug" became "looking for a bug". |
| 13. The overnight batch | fold | "adopted" became "chose"; "from the table" became "from the lesson's table". |
| 14. Which paradigm | four Python snippets | The four in C#, matching the lesson: a `decimal` total and a loop, `prices.Sum()`, `basket.Add(4.50m)` and `basket.Total()`, `TotalOf(numbers, IsEven)`. |
| 15. Back to a loop | fold with Python | New exec cell `back-to-a-loop-1`: `Select(...).ToArray()` runs, and the reader writes the loop; `inputs: doubled` and a solution with an array and a `for` loop. |
| 16. Is one of them right | fold | Heading and question now ask for "the best" (the checklist bans *right*). |
| 17. The first two bytes | fold | New cell `the-first-two-bytes-1` prints 80 P and 75 K. |
| 18. The other way | `hex(n)[2:].upper()` in both worlds | `Convert.ToString(code, 16).ToUpper()`; `ToHexMessage` returns `List<string>`; `RowToHex` pads with `PadLeft(2, '0')`. Each solution prints one more line for the number its note quotes (`41 5A`; `0`). The pixel task gained a first hint that asks a question. |
| 19. From earlier: a key that is missing | `counts.get("B") + 1`: `None + 1`, TypeError | Same id, same point (a missing default, and the exception a step later), in C#'s terms: `GetValueOrDefault('B')` on a `Dictionary<char, string>` gives `null`, and `word.Length` stops with `NullReferenceException` on line 3. With `int` values there would be no exception at all (0 + 1 is 1), and `building-reusable-tools-practice` 16 already shows that. `expect: exception`; the prose says something goes wrong on purpose, without saying what. |
| 20. From earlier: a test that asks the wrong thing | `assert [3, 1, 2].sort() == [1, 2, 3]` | C#'s `Sort` is `void`, which `putting-things-in-order` already shows as CS0029. So the C# version is the test's own mistake: `Test.Check` on two arrays compares references, and stops with `sorted: expected System.Int32[], found System.Int32[]`. A types cell `from-earlier-a-test-that-asks-the-wrong-thing-test` (file `Test.cs`, from *Reusable methods*) sits above the program cell, which keeps the dewlab id. The fold gives a test that holds (probe `p-test-with-join`). |
| 21. From earlier: how many | `counts.get(letter, 0) + 1` | `GetValueOrDefault(letter, 0)`; prints 2. |

### The glossary file

dewsharp has no glossary panel, so each of dewlab's entries is defined in
the prose where it first appears, in both worlds:

| dewlab entry | Here |
|---|---|
| machine code | "The only language the machine understands", first paragraph |
| assembly language, assembler | "Assembly, and why hexadecimal exists", second paragraph |
| high-level language | "Languages people can read", second paragraph |
| compiler, interpreter | the paragraph after the first table |
| paradigm | "The same problem, four ways", first paragraph |
| procedural, declarative, functional, object-oriented | the comment in the first cell and the bold labels above each fence |
| ASCII | after `the-only-language-the-machine-understands-2` (moved out of the secret-messages world) |
| base 10, binary | "The only language the machine understands", second paragraph |
| hexadecimal | "Assembly, and why hexadecimal exists", third paragraph |
| `bin()` | `Convert.ToString(42, 2)`, before the `ToBinary` cell |
| `hex()` | `Convert.ToString(255, 16)`, under the hex cell |

## What C# made different, in short

- Binary and hex literals exist in C# too (`0b`, `0x`), and a `bool`
  prints as `True`.
- `bin()`, `hex()` and `int(text, base)` became `Convert.ToString(n, 2 or
  16)` and `Convert.ToInt32(text, 2 or 16)`. C# writes hex letters small,
  so the page uses `ToUpper()` where the answer is in capitals.
- `"0" * n + bits` became `PadLeft(8, '0')`, which the lesson now shows.
- `chr()` and `ord()` became casts, `(char)` and `(int)`; `int(digit)`
  became `digit - '0'`.
- Each Run starts a new program, so a method (`FromBinary`) is copied into
  every cell that needs it, and the practice page's tools cell no longer
  builds anything for the cells below.
- A pair became a tuple, and `base` cannot be a variable's name.
- C# is the reader's own example of a language that is compiled to an
  in-between form, and on this page it is also interpreted.
- LINQ, a method passed to a method, and a class are shown as code to read,
  as the map asks; the procedural loop runs.
- A method that is declared and never called warns (CS8321), and so does an
  unused variable (CS0219), so two starters were reshaped to avoid them.
- A missing dictionary value gives `null` for `string` and 0 for `int`;
  `Equals` on two arrays compares references.

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. On the page, a compiler
message starts with `Program.cs`; the native check labels it with the cell
id. Line and column match.

| Number or claim | Source |
|---|---|
| 42, `True` | `one-number-two-ways-1` |
| `101010`, `1001000` | `the-only-language-the-machine-understands-1` |
| 72 (twice), `H` | `the-only-language-the-machine-understands-2` |
| `'1' - '0'` is 1, `'0' - '0'` is 0 | probe `l-digit-values` |
| 25, `1100100` | `your-turn-1` solution |
| 72, `HELLO`, `HI`, `""` | `your-turn-2--secret-messages`, its solution and `inputs` |
| six rows, the tree | `your-turn-2--pixel-art` solution |
| `1111` is F, `1010` is A | probe `l-digit-values` |
| `ff`, 72, 72, `1001000`, `01001000` | `assembly-and-why-hexadecimal-exists-1` |
| `CODE`, `HI` | `your-turn-3--secret-messages` solution and `inputs` |
| `THE FIRST PROGRAMMER`, 32 | `your-turn-4--secret-messages` solution |
| CS1525, *Invalid expression term 'string'*, first of many messages | probe `l-base-is-a-keyword` |
| `11000` (five pixels) | `your-turn-3--pixel-art` solution |
| `[30, 144, 255]`, `[255, 215, 0]` | `your-turn-4--pixel-art` solution `inputs` |
| 12 (procedural) | `the-same-problem-four-ways-1` |
| 12 (declarative, functional, object-oriented) | probes `l-declarative`, `l-functional`, `l-object-oriented` |
| 13.70 (snippets 1 and 2) | `the-same-problem-four-ways-2` |
| 13.70 (snippet 3) | probe `l-basket` |
| practice: `1001000`, 72, 48, 72, H | `tools-1` |
| practice 1: 13, 16, 31, 170, 255, 256 | `binary-to-base-10-1` |
| practice 2: 110, 1100, 1100100, 11111111 | `base-10-to-binary-1` |
| practice 3: F, 10, FF, 100, FFF | `base-10-to-hex-1` |
| practice 4: `11111111`, `10100000`, `01111110` | `hex-to-binary-straight-1` |
| practice 5: 72, 73, HI | `two-letters-1` |
| practice 6: 255, 127, 80 | `a-colour-1` |
| practice 7: 10 (the starter), 42, 255, 256 | `reading-hex-without-convert-1`, its solution and `inputs` |
| practice 15: 2, 4, 6, 8, 10; five lines | `back-to-a-loop-1` and its solution |
| practice 17: 80 P, 75 K | `the-first-two-bytes-1` |
| practice 18: `48 49`, `41 5A`, `CC`, `90`, `00`, `0` | the two `the-other-way-1` solutions and `inputs` |
| practice 19: `NullReferenceException`, line 3 | `from-earlier-a-key-that-is-missing-1` |
| practice 20: the message with `System.Int32[]` | `from-earlier-a-test-that-asks-the-wrong-thing-1` |
| practice 20: the test with `string.Join` holds | probe `p-test-with-join` |
| practice 21: 2 | `from-earlier-how-many-1` |

Years and historical facts (1843, 1945, 1957, 1963, 1989, the table) come
from dewlab's page and are not computed. C#'s year is the course map's.

## Once the page UI exists

- The `inputs` of the vault pass a tuple array,
  `new (string, string)[] { ... }`. Check that the comparison table shows
  the expression readably, and that the page's evaluator accepts it.
- The comparison table will show `List<string>` values (`DrawBinary`,
  `DrawHex`, `ToHexMessage`) as `["#.#", ".#."]`. The rows of a picture in
  one line are hard to read; a reviewer may prefer the starter's printed
  picture.
- Several solutions print one line more than the reader's cell (32, `11000`,
  `41 5A`, `0`) so that the numbers in their notes are recorded. Check how
  the page shows a solution's output that has an extra line, and whether the
  browser checker records a solution's output at all (decision 25 lists
  kind, outcome, output, diagnostics, frames and values). If it does not,
  these numbers need a cell of their own.
- Practice 20's exception is thrown inside the types cell (`Test.cs` line 7
  in the native check). Check that the page names that cell and line in a
  way the prose's "the message is strange" still fits.
- `your-turn-1` is an empty cell with a solution and no `inputs`. Check what
  "Compare with a solution" shows then (`first-steps` has the same shape).
- The pixel-art challenge's prose says `Console.Clear()` and
  `Console.ReadLine()` work on the page. Check both in the notebook, where a
  challenge opens.
- The lesson says that, in this browser tab, the .NET runtime runs IL with
  an interpreter. See open question 5.

## Open questions for a reviewer

1. **The job of the four paradigms.** To use `Where` and `Sum`, as the map
   asks, the job is now "the total of the even numbers", not dewlab's
   "double every number". Doubling survives in practice 15 (`Select`).
   Keep, or keep dewlab's job and use `Select` in the declarative fence?
2. **Fences or a cell for the three paradigms PDP does not teach.** I
   followed the map: fences to read, each a whole program, with probes for
   what they print. dewlab ran all four in one cell, which lets the reader
   see all four give the same answer. One runnable cell with all four
   would do that, at the cost of a long cell full of syntax the course
   does not teach. The same goes for snippet 3.
3. **Lambdas in PDP** (the map's open question 5). This page shows
   `number => number % 2 == 0` and `Func<int, bool>` once, as code to read,
   and practice 15 runs `Select(number => number * 2)` without asking the
   reader to write one.
4. **C#'s year.** The map says 2000. Microsoft announced C# in 2000 and
   released version 1.0 with Visual Studio .NET in 2002. The table keeps
   2000; a footnote or "2000–2002" (as LISP has "1958–1960") would be more
   exact.
5. **"In this browser tab, the .NET runtime runs the IL with an
   interpreter."** `planning/evidence/critique.md` and `spike_a.md` say the
   engine interprets the learner's IL (no AOT). .NET's browser runtime
   also compiles often-run parts of the IL to WebAssembly as it runs; the
   page leaves that out. The engine's owner should confirm the sentence.
6. **Batches.** The map puts this page in batch 5 and lists only
   `lists-and-sequences` and `looking-things-up-by-name` under "Depends on".
   The page also leans on *Sorting* (batch 6: tuple, a method passed by
   name, the challenge's comparison), *Reusable methods* (batch 7: `Test`)
   and *Debugging* (batch 8: `NullReferenceException`), as dewlab's page
   leaned on their dewlab versions (dewlab's practice 20 names both). Those
   drafts exist, so the page could be written; the entry's "Depends on"
   could list them, or the page could move to batch 9.
7. **Classes in code to read.** `NumberList` and `Basket` use public fields
   (`Values`, `Prices`), so PDP readers are not shown FOOP's `_field`
   convention (the map's open question 8) without an explanation.
8. **The characteristics table.** Added from `many-languages-one-idea`, with
   three columns and four rows, for PDP-LO3. It overlaps with the explore
   page E9 that will adapt the whole of that dewlab page; E9 can keep its
   larger table.
9. **Practice cells that print the answers.** Problems 1–6 and 17 now have
   a cell that prints the answer (decision 29), and the prose asks the
   reader to work by hand first. dewlab had one tools cell and the reader
   typed each check. A reviewer may prefer cells that print one example
   and a fold for the rest, with the numbers recorded some other way.
10. **Practice 19** now overlaps a little with
    `building-reusable-tools-practice` 16 (`GetValueOrDefault` with no
    default). The two show different results of the same rule (0 for `int`,
    `null` for `string`); keep both, or move one.
11. **Ids.** Renamed: `reading-hex-without-int-1` to
    `reading-hex-without-convert-1` (decision 28). New:
    `the-only-language-the-machine-understands-2`, `binary-to-base-10-1`,
    `base-10-to-binary-1`, `base-10-to-hex-1`, `hex-to-binary-straight-1`,
    `two-letters-1`, `a-colour-1`, `back-to-a-loop-1`,
    `the-first-two-bytes-1`, `from-earlier-a-test-that-asks-the-wrong-thing-test`.
    Every other cell keeps its dewlab id.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
code on a page that the native check does not run (the fences to read and
the challenges). Run them with the same NativeCheck command, passing
`NOTES.md` as the file. The challenges come first, so that no class from
a probe is above them and each compiles as it would in a new notebook. The
cell with `expect:` fails on purpose. None of them is part of either page.

```csharp exec
id: l-challenge-secret-messages
// Lesson, secret-messages challenge, exactly as on the page.
// Paste your classmate's coded paragraph here.
string coded = "WKLV LV D PHVVDJH IURP WKH IURQW OLQH";

Dictionary<char, int> counts = new();
foreach (char character in coded)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}

int MoreOftenFirst(char first, char second)
{
    return counts[second] - counts[first];
}

char[] letters = counts.Keys.ToArray();
Array.Sort(letters, MoreOftenFirst);
Console.WriteLine(string.Join(", ", letters));
// Guess which letter is E. What shift, or what key, does that suggest?
```

```csharp exec
id: l-challenge-pixel-art
// Lesson, pixel-art challenge, exactly as on the page.
// Each frame is a picture: an array of rows.
string[][] frames =
{
    new string[] { "..##..", ".#..#.", "..##.." },
    new string[] { "..##..", ".####.", "..##.." }
};

for (int number = 0; number < frames.Length; number++)
{
    Console.WriteLine($"Frame {number}");
    foreach (string row in frames[number])
    {
        Console.WriteLine(row);
    }
    Console.WriteLine();
}
// Can a method make the frames for you, from a rule?
```

```csharp exec
id: l-digit-values
// Lesson, after the FromBinary cell: the digit characters are numbered in order.
Console.WriteLine('1' - '0');
Console.WriteLine('0' - '0');
// Lesson, hexadecimal: 1111 is F, and 1010 is A.
Console.WriteLine(Convert.ToString(0b1111, 16).ToUpper());
Console.WriteLine(Convert.ToString(0b1010, 16).ToUpper());
```

```csharp exec
id: l-base-is-a-keyword
expect: CS1525
// Lesson, the vault's second hint: the solution with base in place of
// numberBase. The first of many messages is CS1525, at (4,15).
static string CrackTheVault((string, string)[] pairs)
{
    string text = "";
    foreach ((string base, string code) in pairs)
    {
        int number;
        if (base == "bin")
        {
            number = Convert.ToInt32(code, 2);
        }
        else
        {
            number = Convert.ToInt32(code, 16);
        }
        text = text + (char)number;
    }
    return text;
}

(string, string)[] vault = { ("hex", "54"), ("bin", "00100000") };
Console.WriteLine(CrackTheVault(vault));
```

```csharp exec
id: l-declarative
// Lesson, the declarative fence, exactly as on the page.
int[] numbers = { 1, 2, 3, 4, 5, 6 };
int total = numbers.Where(number => number % 2 == 0).Sum();
Console.WriteLine($"Declarative: {total}");
```

```csharp exec
id: l-functional
// Lesson, the functional fence, exactly as on the page.
int[] numbers = { 1, 2, 3, 4, 5, 6 };
Console.WriteLine($"Functional: {TotalOf(numbers, IsEven)}");

static bool IsEven(int number)
{
    return number % 2 == 0;
}

static int TotalOf(int[] values, Func<int, bool> rule)
{
    int total = 0;
    foreach (int value in values)
    {
        if (rule(value))
        {
            total = total + value;
        }
    }
    return total;
}
```

```csharp exec
id: l-object-oriented
// Lesson, the object-oriented fence, exactly as on the page.
NumberList list = new NumberList(new int[] { 1, 2, 3, 4, 5, 6 });
Console.WriteLine($"Object-oriented: {list.EvenTotal()}");

class NumberList
{
    public int[] Values;

    public NumberList(int[] values)
    {
        Values = values;
    }

    public int EvenTotal()
    {
        int total = 0;
        foreach (int value in Values)
        {
            if (value % 2 == 0)
            {
                total = total + value;
            }
        }
        return total;
    }
}
```

```csharp exec
id: l-basket
// Lesson, snippet 3, exactly as on the page.
// Snippet 3
Basket basket = new Basket();
basket.Add(4.50m);
basket.Add(2.20m);
basket.Add(7.00m);
Console.WriteLine(basket.Total());

class Basket
{
    public List<decimal> Prices = new();

    public void Add(decimal price)
    {
        Prices.Add(price);
    }

    public decimal Total()
    {
        return Prices.Sum();
    }
}
```

```csharp exec
id: p-test-with-join
// Practice 20, the fold: a test that compares the elements, as text, holds.
int[] numbers = { 3, 1, 2 };
Array.Sort(numbers);
Test.Check("sorted", "1, 2, 3", string.Join(", ", numbers));
Console.WriteLine("passed");

static class Test
{
    public static void Check<T>(string claim, T expected, T found)
    {
        if (!expected.Equals(found))
        {
            throw new Exception($"{claim}: expected {expected}, found {found}");
        }
    }
}
```
