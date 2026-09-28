# storing-and-computing: notes for a reviewer

Ported from dewlab `tutorials/storing-and-computing/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. It
follows `first-steps` and `powers-in-csharp` in PDP's "First programs"
series, and comes before `compiler-errors` and `dividing-in-csharp`.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/storing-and-computing/storing-and-computing.md` and
`storing-and-computing-practice.md`; their recorded outputs are the two
`*.outputs.json` files beside them, written by the browser checker; and
this file was the draft's `NOTES.md`. The two `*.native.json` files were
deleted: the browser checker's outputs files replace them. "What was done
when it moved", just below, says what changed in the move. The rest of this
file is the porter's, brought up to date, with the porter's questions
settled where the playbook, the course map, the style guide or the
exemplars answer them. What none of them answers is under "Open", at the
end of the questions.

Files:

- `storing-and-computing.md`: the lesson. 22 exec cells, 6 of them in world
  variants; 3 predicts, 4 hints, 9 solutions, 2 `inputs` blocks, 1 cell
  meant to fail, 1 challenge.
- `storing-and-computing-practice.md`: the practice page. 22 exec cells, 2
  of them in world variants; 7 predicts, 10 solutions, 4 `inputs` blocks,
  4 cells meant to fail (three compiler errors, one exception).
- `storing-and-computing.outputs.json`,
  `storing-and-computing-practice.outputs.json`: what the browser checker
  recorded, per world.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  storing-and-computing` ran every cell and solution in the real engine, in
  both worlds (90 runs). Every number and every message the draft's prose
  quoted came out the same in the browser as in the native check: nothing
  differed in culture, formatting, exceptions or `Console`. The probes at
  the end of this file were run in the browser too, in a scratch lesson,
  and every one printed what the table below says. What the browser run
  did show is the six starter cells with CS0219 warnings (below), and the
  engine fault under "Found in the engine".
- **Starters that warned.** Six starter cells made variables they never
  used, so an untouched Run showed CS0219 (*assigned but its value is never
  used*). The playbook's pitfall says a starter's variables must be used,
  as in `first-steps`' `your-turn-2`. Each starter now prints a line that
  uses them: `your-turn-4--pixel-art` prints the three numbers,
  `putting-values-into-text-3--secret-messages` prints
  `12 of the 47 letters are E`, `putting-values-into-text-3--pixel-art`
  prints `640 × 480` for the reader to extend, and the practice page's
  `thirteen-places-along-1--secret-messages`, `hours-and-minutes-1` and
  `a-price-from-cents-1` print their given values. No cell on either page
  warns now.
- **Numbers the prose needed but no cell printed** (decision 29, and the
  instruction that every number and quoted output comes from a recorded
  output). Each was either printed by a cell or taken out of the prose:
  - `now-the-implementation-2` prints `position + shift: 26`, for the
    fold's 26.
  - The fold under `your-turn-2` no longer says `77`: "it joins the 7 to
    it".
  - "`double` uses 8 bytes, twice as many as `float`": the `float` half
    went. *Types and their sizes* has `float`.
  - The conversion table's Example column is code only. `double.Parse
    ("3.7")` is 3.7 and `42.ToString()` is `"42"` were printed by no cell.
  - The backwards shift: `-3 % 26` is −3 and "A prints `>`" were printed by
    no cell. The task now has two solutions, *for D* (prints A, and is the
    one "Compare with a solution" uses) and *for A* (prints X). The *for A*
    note explains the sign of the remainder without quoting −3 or `>`.
  - The E-share and megapixel hints no longer quote `0.0%` and
    `0.00 megapixels`; the E-share note says "12 divided by 47 has no whole
    part at all".
  - Practice 5 (was 6): a second cell, `a-number-times-some-text-2`,
    prints `"5" + "3"` and `"5" + 3`, so the fold's two `53`s are recorded.
  - Practice 6 (was 7): `(int)double.Parse("3.7")` is 3 became a question.
  - Practice 7 (was 8): the cell prints `(int)-3.7`, `Math.Floor(-3.7)`,
    `Math.Round(-3.7)` and `Math.Round(3.7)`, with the predict on the first
    line, as `first-steps-practice`'s `which-comes-first-1` does. The
    fold's −3, −4, −4 and 4 are recorded; its 3 for `(int)3.7` is problem
    6's first line.
  - Practice 8 (was 9): "any mix of capitals" and "`bool.Parse("yes")`
    stops with a `FormatException`" became a question. `bool member = 1;`
    is now a cell, `the-word-false-2`, `expect: CS0029`, and its message is
    recorded (see question 9 under "The practice page" below).
  - Practice 10 (was 11), secret messages: the solution also moves the
    answer 13 places again, so "A becomes N" is recorded.
  - Practice 14 (was 15): "`1.10m + 2.20m` prints 3.30" became a question.
  - Practice 17 (was 18): the cell prints `:F0`, `:F2`, `:F4` and
    `$"{5:F2}"`, with the predict on the first line.
  - Practice 18 (was 19): "`totalCents / 100` would give 12" and "€5.00,
    not €5" became questions.
  - Practice 4 (was 5): the `GetType()` paragraph went (question 4 below).
  - Practice "One past the largest" went (see "The practice page").
- **Cell ids.** The course map's entry says "`type-conversion-2` becomes a
  real input cell", and the playbook keeps dewlab's id where the task is
  the same. dewlab's `type-conversion-1` reads `"42"` as a number and adds
  8; its `type-conversion-2` is the input cell. So the section now follows
  dewlab's order: `type-conversion-1` (`int.Parse`, 428 and 50),
  `type-conversion-2` (`ReadLine`), and then the two new cells,
  `type-conversion-3` (a cast between numbers) and `type-conversion-4`
  (dividing with a cast). In the draft these four were numbered 3, 4, 1
  and 2.
- **Title.** Decision 32 makes a page's short title "the part of the course
  map's title before the colon", and `first-steps` already names this page
  *Variables and types* twice. So the title is the course map's,
  "Variables and types: numbers, text and single characters", and the
  practice page is "Variables and types: practice".
- **Links** (decision 32 and the list of pages moving now). Every `lesson:`
  link goes to a page in `lessons/` or one moving in this round, with that
  page's short title as its text: [Dividing], [Arrays and lists], [Loops],
  [Two names, one list], [Decisions], [The equals sign]. Three pages that
  are not moving now are named in italics: *Types and their sizes*,
  *Reading input* (for "a later page shows how a program can check the
  text") and *Compiler errors*. The practice page's pointer to "Reading an
  error message" for compiler messages now names *Compiler errors*: in
  dewsharp, `reading-an-error-message` is about exceptions.
- **The sets Z and R went.** The course map's entry: "The sets **Z** and
  **R** (maths notation, MIT-1.1) go." The paragraphs on `int` and
  `double` now say the same without them.
- **Integer division points back.** `first-steps` makes `17 / 5` its
  surprise, so `type-conversion-4` now says "On the first page, `/` with
  two whole numbers gave a whole number", and teaches only the cast.
- **Visual Studio.** The style guide's checklist asks each page to say what
  belongs in Visual Studio. "Looking back" now says that nothing on this
  page needs it, and that **Download project** saves a cell as a project
  that prints the same. Practice 18's `:C` note now says that a project
  from **Download project** uses Ireland's settings too (decision 38), and
  a new project made in Visual Studio uses the computer's region.
- **Plain words.** "find out" became "see", "Take your time" became
  "Spend longer on", "tedious" became "Which part do you have to write
  again and again?", and "not a whole number written down" became "not a
  whole number". Practice 5's cell is meant to fail, and the checklist asks
  the prose to say so before the reader runs it; the sentence before the
  cell now says "Whatever happens when you run it is meant to happen, and
  nothing is broken", which reassures without answering the predict.
- **The page, looked at.** Both pages opened in headless Chromium at 390
  and 700 pixels wide: no errors in the console, no sideways scroll, the
  folds with `csharp` and `console` fences inside render inside the fold,
  and the cell labels show *PROGRAM*.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has this
  lesson's line under `planned:`. The checklist says to delete it when the
  lesson moves; this move was told not to edit the course files. And
  `powers-in-csharp` says "A later page explains casts"; it could now link
  here.

## Frontmatter

- `title`: the course map's (see above). The draft had "Variables, types
  and text: names for values, and the kinds of value C# keeps".
- `covers: [PDP-LO4, PDP-LO7, PDP-LO11]`, the course map's. dewlab gives
  outcomes per section (LO4 for four sections, LO7 for the Caesar program,
  LO11 for naming). The format here is one list for the page. The
  ranges-and-memory cell also serves the PDP descriptor's "identify the
  range of data that it can store and the amount of RAM that it requires",
  which dewlab files under LO4.
- `year:` is dropped. The format has no such field.
- The practice page has `from: storing-and-computing-practice`, which is
  dewlab's id for it.

## What changed from dewlab, and why

### What the reader already knows

`first-steps` gave values names and types (`int width = 320;`), used
`$"..."`, defined *method*, *operator* and *compiling*, and made `17 / 5`
its surprise. `powers-in-csharp` shows CS0266 (*Cannot implicitly convert
type 'double' to 'int'*), defines *convert* and *implicitly*, and says "A
later page explains casts". This page is that page: the type conversion
section refers back to CS0266 and explains casts.

### The lesson, section by section

**Opening.** The same cell. The predict went (question 1): the prose asks
"What do you think the last line prints? Run it and see."

**Variables.** The definition changed from "a name that refers to a value"
(Python's model) to "a name for a place in the computer's memory that holds
a value", which is what a C# variable of a value type is. A paragraph
separates making a variable (`int count = 5;`, with a type) from giving it
a new value (`count = count + 1;`, without one), and says the type is fixed
for as long as the variable exists. The naming rules gain one line
(keywords), and *snake_case* became *camelCase*, with one sentence on
*PascalCase* for method names (PDP-LO11). The two world tasks ask for a
type for each variable. Their solutions note that `false` prints as
`False`.

**Data types.** The table has five types: `char` is new, because C# has
one and the Caesar shift needs it, and single quotes mean a `char` in C#.
`float` became `double`. Python's `type()` cell is gone. In its place, a
cell asks C# for `int.MinValue`, `int.MaxValue` and `sizeof` for four
types. A new cell is a mistake on purpose: `int count = "5";`,
`expect: CS0029`, with the message read in the usual order. The
`"40" + "2"` predict is kept. The your-turn cell that asked for `type()`
of six expressions now asks what six `+` lines print, including `"7" + 2`
(72: C# joins, where Python stops) and the left-to-right pair
`7 + 2 + "7"` (97) and `"7" + 7 + 2` (772). A fold explains the pair.

**Text and its characters** (was "Text you can take apart", a phrasal
verb). `len()` became `.Length` and `.upper()` became `.ToUpper()`. `"ha" *
3` is gone: C# has no operator that repeats a string (practice 5). A third
line prints `message` again, to show that `ToUpper()` left it unchanged.
`ord()`/`chr()` became the casts `(int)'A'` and `(char)67`, so *cast* is
defined here. The cell also prints `(int)'Z'`, because the prose states 90.

**Type conversion** was rebuilt, in dewlab's order: text to a number and
back (`int.Parse`, `double.Parse`, `ToString()`, `+`); a real
`Console.ReadLine()` program with `stdin: "Aoife\n34\n"` for the checker,
which introduces `Console.Write` and invites the reader to type *thirty*;
then conversions between numbers, by themselves (`int` to `double`) and
with a cast (`double` to `int`), with a pointer back to CS0266; then
division with a cast, pointing back to `first-steps`. A table of the
conversions ends the section.

**Putting it together.** The Caesar shift uses `char` arithmetic:
`letter - 'A'` gives an `int`, and `(char)(moved + 'A')` goes back. The
predict and its three options are kept. Above the fold "What each line
does" is `now-the-implementation-2`, which prints each step. It names
*tracing* (PDP-LO10), and puts the fold's numbers (23, 26, 0) in a
recorded output.

**The backwards shift (secret messages).** In Python, `-3 % 26` is 23, so
dewlab's solution says A becomes X. In C#, `%` keeps the sign of the
number before it, so A with a shift of −3 prints `>`. The hint asks
dewlab's question, and in C# the answer is no. Both solutions add 26
before the `%`. The *for A* note explains why, shows the course map's
general form, `((position + shift) % 26 + 26) % 26`, and links to
*Dividing*. D decodes to A with or without the `+ 26`, so the `inputs` row
agrees either way.

**The rgb text (pixel art).** In Python the difficulty was `str()`. In C#,
`+` joins a string and a number, so that difficulty is gone. The task is
kept. The hint asks which parts of the text never change, and there are two
solutions, one with `+` and one with `$"..."`.

**Putting values into text.** The first cell prints the same line two
ways, `$"..."` and `+`, and asks which is easier to read. `:.2f` became
`:F2`. The screen ratio uses `double width = 1920;`. In the E-share task,
both counts stay `int`, a hint (`after: 1 runs`) asks what `eCount /
letters` gives, and a second solution shows `:P1`. In the megapixels task,
the solution divides by `1000000.0`.

**Looking back.** dewlab asked why Python stops at `"40" + 2`. C# does
not stop there, so the first question asks which behaviour the reader
would rather have. A second asks why it helps to find a problem before
any line runs. The challenge is dewlab's, with `word[0] - 'A'` and a cast;
it compiles on its own, and prints F (probe `m-challenge`). Then the line
on Visual Studio, the practice page, and the next page, *Compiler errors*.

**Where to read more.** The Python tutorial was replaced by two Microsoft
Learn pages, *Built-in types* and *Standard numeric format strings*. The
two YouTube videos and *The Code Book* are carried over from dewlab. On 28
September 2026 all four links answered 200, and YouTube's oEmbed gave the
two videos' titles as the page gives them.

### The practice page

dewlab's problems keep their questions and cell ids. The order changed in
one place: "Allowed names" moved from first to last (question 10 under
"Found in the engine"), so the others are numbered one lower than dewlab's.
One problem is new, and one the porter added went.

1. **A copy, or a link:** `x`/`y` became `mine`/`yours`. The answer
   defines *value type* and links to *Two names, one list*.
2. **Swap:** `first`/`second`. The tuple swap
   `(first, second) = (second, first);` is the second solution (question
   5).
3. **Names that explain:** unchanged.
4. **What type is it:** there is no `type()`, so the reader checks a guess
   by putting the value in a variable of that type. The list gains `'4'`,
   `4.0 / 2` and `"4" + 2`.
5. **A number times some text:** Python repeats the text. C# does not
   compile (`expect: CS0019`). A second cell shows `"5" + "3"` and
   `"5" + 3`, which both give `53` in C#.
6. **Text that looks like a number:** `int.Parse("3.7")` (a
   `FormatException`, `expect: exception`) beside `(int)3.7`.
7. **Cutting, or rounding:** `(int)-3.7`, `Math.Floor`, `Math.Round`.
   dewlab's answer says "Rounding would give −4 … The two agree on positive
   numbers and differ on negative ones", which is true of rounding *down*,
   not of rounding to the nearest number. The C# answer compares the cast
   with `Math.Floor`, and `Math.Round` separately. dewlab's page may want
   the same fix.
8. **The word False:** `bool.Parse("False")` is `False`, and a second
   cell, `the-word-false-2`, is the course map's "a number is not a bool"
   (question 9 below).
9. **25 plus 1 is 251:** a real program with `Console.ReadLine()` and
   `stdin: "25\n"`, which prints `251`. Its solution uses `int.Parse`.
10. **Past the end** (was "Going round"). ROT13; the solution moves the
    answer 13 places again. The pixel-art variant's `byte` note went
    (question 6).
11. **Point one plus point two:** unchanged in C#, with one sentence on
    `==` above the cell. `math.isclose()` has no C# twin, so `Math.Abs`
    and `1e-9` are explained.
12. **Exact in binary:** unchanged.
13. **Hours and minutes:** unchanged.
14. **Counting in cents:** €1.10 + €2.20 gives 3.3000000000000003 in one
    line, so the problem has a cell (dewlab's fifty items at €0.10 needs a
    loop). The answer adds `decimal`, as the course map asks.
15. **Four answers from two values:** `+` joining, `int.Parse`, and the
    left-to-right order (`1010`, `1055`).
16. **An interpolated string instead** (was "An f-string instead"; the
    cell id `an-f-string-instead-1` is kept).
17. **Decimal places:** `2.0 / 3`, because `2 / 3` is 0 in C#.
18. **A price from cents:** two solutions, `:F2` and `:C`.
19. **A letter that stays** (new): `word[0] = 'B';` is CS0200, which shows
    that strings cannot be changed in place. It has a solution with
    `Replace`. The course map has `lists-and-sequences` meet CS0200
    again.
20. **Allowed names:** dewlab's list, with `2ndPlace` and `total_2` for
    `2nd_place`, and the course map's two keywords, `class` and `int`.

The porter's "One past the largest" (`int.MaxValue + 1`) went. The course
map's entry for `types-and-their-sizes` opens that page with exactly that
predict, and the practice page of the page before would give its answer
away. The lesson's sentence that pointed to it now points to *Types and
their sizes*.

### The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`, last section), so
no `.glossary.yaml` was written. Every term in dewlab's glossary is defined
in the prose where it first appears, in its C# form: variable, `=`,
camelCase (for snake_case), data type, `int`, `double` (for `float`),
`string` (for `str`), `bool`, concatenate, `Console.ReadLine()` (for
`input()`), `Length` (for `len()`), `ToUpper()` (for `.upper()`), casts
(for `ord()`/`chr()`), interpolated string (for f-string), and `:F2` (for
`:.2f`). The page also defines keyword, PascalCase, integer, bit, byte,
floating-point number, character, string, Boolean, convert, cast,
explicit, `Console.Write`, `int.Parse`, `ToString()`, Caesar shift and
tracing. The practice page adds value type, operand, truncating,
`decimal`, read only and identifier.

## What C# made different, in short

- Types are written, fixed, and checked before anything runs, so the page
  has a mistake on purpose (CS0029) and uses compiling to check guesses.
- `char` is its own type, and single quotes mean a `char`.
- `int` has a range and a size. Python's integers have neither.
- `+` joins a string and a number without complaint, and works left to
  right. Python stops at `"40" + 2`. This changes one world task, two
  practice problems and the first "Looking back" question.
- `int / int` keeps only the whole part, so three places needed a `double`
  (a cast, `100.0`, or `double` variables).
- `%` keeps the sign of the number before it, so the backwards Caesar shift
  needs 26 added first.
- Strings cannot be changed in place (`ToUpper()` returns a new one;
  `word[0] = …` is CS0200).
- Nothing counts as `true` or `false` except a `bool`.
- `Console.WriteLine(true)` prints `True`.
- There is no operator that repeats a string.

## Where each number in the prose comes from

Every number and quoted output below is in
`lessons/storing-and-computing/storing-and-computing.outputs.json` or
`storing-and-computing-practice.outputs.json`, except where the table
names another page.

| Number or claim | Recorded by |
|---|---|
| `HELLO!!!`, 6 | `a-name-for-a-message-1`, `variables-giving-names-to-things-1` |
| `False`, `True` in the your-turn notes | the solutions of `your-turn-1--<world>` |
| −2,147,483,648, 2,147,483,647, 4 and 8 bytes | `data-types-different-kinds-of-information-1` |
| CS0029 at (1,13), and its text | `data-types-different-kinds-of-information-2` |
| 42, 402 | `where-i-might-get-stuck-1` |
| 9, 72, 7.5, 97, 772 | `your-turn-2` |
| 12, `MEET AT NOON`, `meet at noon` | `text-you-can-take-apart-1` |
| 65, 66, 90, C | `text-you-can-take-apart-2` |
| 428 and 50 | `type-conversion-1` |
| the prompts and typed lines | `type-conversion-2` |
| 5 and 3 | `type-conversion-3` |
| CS0266's text (*Cannot implicitly convert … are you missing a cast?*) | `powers-in-csharp`, `where-else-it-happens-1`; the same text for this cell without `(int)` is probe `m-no-cast` |
| 1 and 1.5 | `type-conversion-4` |
| X becomes A | `now-the-implementation-1` |
| 23, 26, 0 in the fold; 65 | `now-the-implementation-2`; `text-you-can-take-apart-2` |
| D came from A; A came from X | the two solutions of `your-turn-4--secret-messages` |
| `rgb(30, 144, 255)` | the solutions of `your-turn-4--pixel-art` |
| E is 25.5% (both solutions) | the solutions of `putting-values-into-text-3--secret-messages` |
| 307200 pixels, 0.31 megapixels | the solution of `putting-values-into-text-3--pixel-art` |
| practice 1: 5 | `a-copy-or-a-link-1` |
| practice 5: CS0019 at (1,19) and its text; `53` twice | `a-number-times-some-text-1`, `a-number-times-some-text-2` |
| practice 6: 3; FormatException and its text | `text-that-looks-like-a-number-1` |
| practice 7: −3, −4, −4, 4 | `cutting-or-rounding-1` |
| practice 8: `False`; CS0029 at (1,15) and its text | `the-word-false-1`, `the-word-false-2` |
| practice 9: 251, then 26 | `twenty-five-plus-one-1` and its solution |
| practice 10: A, then N; 44 | the solution of `thirteen-places-along-1--secret-messages`; the `inputs` and solution of the pixel-art variant |
| practice 11: 0.30000000000000004 and False | `floating-point-1` |
| practice 13: 8 hours and 20 minutes | the solution of `hours-and-minutes-1` |
| practice 14: 3.3000000000000003 | `counting-in-cents-1` |
| practice 15: 105, 15, 1010, 1055 | `four-answers-from-two-values-1` |
| practice 17: 1, 0.67, 0.6667, 5.00 | `putting-values-into-text-practice-1` |
| practice 18: €12.34 (both) | the solutions of `a-price-from-cents-1` |
| practice 19: CS0200 at (2,1) and its text; BAT | `a-letter-that-stays-1` and its solution |
| 47 letters, 12 E, 640 × 480, 1920 × 1080, 500 minutes, 1234 cents, €1.10, €2.20, 200 + 100 | the set-up of each task |
| E is about one letter in eight in English | dewlab's; a fact about English, not program output |

Claims without a number, checked by the probes below in the browser: the
character after Z is `[` (`m-no-remainder`); *thirty* stops at the
`int.Parse` line with a `FormatException` (`m-thirty`); a cast cannot
convert text (CS0030, `m-cast-text`, `m-cast-number`); A without `+ 26`
gives a character before A (`m-backwards`: `>`, which is 62); the general
form stays from 0 to 25 for shifts from −100 to 100 (`m-general-form`); a
name that is not allowed gives *Identifier expected* (`p-name-digit`,
`p-name-keyword`, `p-name-int`); forgetting `$` prints the brackets
(`p-no-dollar`).

## Once the page UI and the other pages exist

- **Link text for pages not yet written.** Settled when the page moved:
  see "Links" above.
- **"A later page shows how a program can check the text before it
  converts it"** is `int.TryParse`. Settled: it names *Reading input*,
  which the course map says teaches `TryParse`.
- **`powers-in-csharp` says "A later page explains casts".** It can link
  here, now that this page is in `lessons/`. That is `powers-in-csharp`'s
  change, not this page's.
- **What `first-steps` covers.** Settled: it shows `%` with a clock, and it
  makes `17 / 5` its surprise, so this page points back to it.
- **`dividing-in-csharp`.** This page shows `90 / 60` is 1 and sends the
  reader there for `/`, and for `%` below 0. Practice 11 links to it for
  0.1.
- **A practice link.** Settled by the exemplars: `first-steps` and
  `objects-and-classes` both end "Looking back" with "Next, the practice
  page …", and so does this page.
- **Warnings on untouched starter cells.** Settled by the playbook's
  pitfall: every starter now uses its variables, and no cell warns.
- **A broken declaration in a cell above breaks every cell below.**
  Confirmed in the browser; see "Found in the engine".
- **Typed input and "Compare with a solution".** Settled:
  `twenty-five-plus-one-1` has no `inputs` block, so the page shows no
  comparison for it.
- **Predict before a cell with `expect:`.** Practice 5 has one, as
  `powers-in-csharp` does. The page shows the guess beside what happened
  (decision 37). Nobody has yet looked at that view for a cell that does
  not compile.
- **Folds with code.** Settled: the parser keeps a fold whole with its
  fences, and the page renders `csharp` and `console` fences inside it
  (seen in the browser).

## Found in the engine

**A keyword typed as a name in a cell above breaks every cell below.** On
the practice page, "Allowed names" invites the reader to try each name in
its cell. `int class = 1;` does not compile in that cell (CS1001 at (1,5),
CS1002, CS1001 at (1,11), CS1514, CS1513, CS8803, CS1525), which is
expected. But the engine also carries the broken `class` declaration into
every program cell below it (rule 2), and each of those then fails with
three messages that name the cell above: CS1001 *Identifier expected*,
CS1514 *{ expected* and CS1513 *} expected*, all at (1,15). Line 1 of that
cell is 14 characters long, so column 15 is past its end; the same CS1001
in the cell itself is at (1,11). A reader on page 3 has not met rule 2, so
the later cells seem to break for no reason, and their work is saved that
way. A two-cell scratch lesson shows it: `int class = 1;` (`expect:
CS1001`), then `Console.WriteLine("below");`, which does not compile.
As a program of its own (`dotnet run`), the second cell prints
`below`. `int int = 1;` does not do this. The page now puts "Allowed
names" last, as decision 30 does for a class that doesn't compile, so no
cell is below it. Nothing in the engine was changed. Possible fixes: carry
types only from cells that compile, or not carry a declaration that has
missing tokens, and map the column to the cell's own line.

## The porter's questions, and what was decided

1. **Four guesses on the lesson page.** *Decided: three.* The style guide
   and the playbook's checklist ask for two or three, where C# does
   something a reader would not expect. The opening `HELLO!!!` predict went,
   as the porter suggested: the reader has met `string` values on
   `first-steps`, and the page still opens by running something and asking
   about it, in the prose. The three that stay are `count = count + 1`,
   `"40" + "2"` and the Caesar shift. The practice page keeps seven, as
   `first-steps-practice` has seven.
2. **Is the page now too long?** Open (below).
3. **Integer division before `dividing-in-csharp`.** *Decided by
   `first-steps`:* integer division is not new here, since `first-steps`
   makes `17 / 5` its surprise. `type-conversion-4` points back to it and
   teaches only the cast, which two of this page's tasks need.
4. **`GetType()` and `System.Int32`.** *Decided: taken out.* No cell
   printed `System.Int32` (decision 29), the problem is complete without it
   (the reader checks a type by compiling), and the course map puts types
   and their sizes on `types-and-their-sizes`. It can come back with a cell
   that prints it.
5. **The tuple swap.** *Decided by the course map:* "'Swap them' keeps the
   spare variable and shows the tuple swap `(a, b) = (b, a)` as the shorter
   way." Its title is now the course map's second tier, "a shorter way
   you'll meet later": the course map has `putting-things-in-order` swap
   with a tuple.
6. **`byte` and `decimal`.** *Decided by the course map:* `decimal` stays
   ("'Counting in cents' mentions `decimal`"). `byte` went, with the
   `(byte)brighter` input row: `types-and-their-sizes` keeps a pixel's
   colour in a `byte` and shows `255 + 1` in a `byte`.
7. **Cell ids.** *Decided by the playbook:* keep dewlab's id where the task
   is the same, even where the heading changed
   (`where-i-might-get-stuck-1`, `now-the-implementation-1`,
   `thirteen-places-along-1--pixel-art`, `an-f-string-instead-1`). The
   type conversion cells were renumbered to match dewlab's tasks (see
   "Cell ids" above).
8. **Thousands separators.** *Decided by `first-steps`*, which writes
   76,800 and 12,000,000 in its prose where the output shows 76800 and
   12000000. The prose keeps −2,147,483,648.
9. **"The word False" and the course map.** The course map says it
   "becomes 'a number is not a bool' (`if (1)` does not compile)". *Decided:*
   it keeps dewlab's `bool.Parse("False")` predict and adds
   `the-word-false-2`, `bool member = 1;` (`expect: CS0029`), for the
   course map's point. `if` is not taught until *Decisions*, and a
   declaration shows the same thing with what the page has.
10. **`your-turn-2` and the course map.** The course map says the six
    comment guesses become "a mix of lines that print and lines that do
    not compile". *Decided: all six lines print.* One line that does not
    compile stops the whole cell, so the other lines' numbers could not be
    recorded (decision 29), and the reader would have to delete a line to
    see any output. The lines that do not compile are elsewhere, each in
    its own cell: `int count = "5";` just above (CS0029), and practice 5
    (`5 * "3"`, CS0019).

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **Length** (question 2). The course map says L, "about 16 cells; if it
  runs past an hour, move 'Putting values into text' to the start of
  `types-and-their-sizes`". The page has 22 cells, of which a reader sees
  19 in one world. Nobody has timed a learner on it. If something has to
  go, the conversion table and the trace cell are the easiest to lose (the
  fold's numbers would then need another cell).
- **"Allowed names" is last.** It moved there because of the engine fault
  above. If the engine stops carrying a broken declaration, it can go back
  to first, where dewlab has it.
- **The general form of the backwards shift.** The course map asks the page
  to show `((n % 26) + 26) % 26`. Both solutions use the simpler
  `(position + shift + 26) % 26`, which is enough for a shift back of up to
  26 places, and the *for A* note shows the general form in one sentence.
  Is one sentence enough, or should a solution use it?

## Probe cells

These are not part of the lesson. Each checks a claim in the prose that no
lesson cell prints. They ran with NativeCheck in the draft and, when the
page moved, with the browser checker: copy this section into a scratch
lesson under a frontmatter with a `title:` and a `version:`, and run
`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`. The
`expect:` probes fail on purpose. Some probes check claims the page no
longer makes (`m-float-size`, `m-left-to-right`, `m-table`, `m-zero`,
`p-types`, `p-parse`, `p-rounding`, `p-bool-capitals`, `p-close-enough`,
`p-decimal`, `p-places`, `p-cents`, `p-long`); they are kept for the
record of what the draft said.

```csharp exec
id: m-float-size
Console.WriteLine(sizeof(float));
Console.WriteLine(sizeof(double));
```

```csharp exec
id: m-left-to-right
Console.WriteLine("7" + 7);
Console.WriteLine(23 + 3);
```

```csharp exec
id: m-no-cast
expect: CS0266
double price = 5;
int whole = 3.7;
Console.WriteLine(price);
Console.WriteLine(whole);
```

```csharp exec
id: m-cast-text
expect: CS0030
int number = (int)"42";
Console.WriteLine(number);
```

```csharp exec
id: m-cast-number
expect: CS0030
string text = (string)42;
Console.WriteLine(text);
```

```csharp exec
id: m-thirty
stdin: "Aoife\nthirty\n"
expect: exception
Console.Write("What is your name? ");
string userName = Console.ReadLine();
Console.WriteLine($"Hello, {userName}");

Console.Write("How old are you? ");
string ageText = Console.ReadLine();
int userAge = int.Parse(ageText);
Console.WriteLine($"Next year you will be {userAge + 1}");
```

```csharp exec
id: m-table
Console.WriteLine(double.Parse("3.7"));
string text = 42.ToString();
Console.WriteLine(text);
```

```csharp exec
id: m-no-remainder
char letter = 'X';
int shift = 3;
int position = letter - 'A';
int moved = position + shift;
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
```

```csharp exec
id: m-backwards
char letter = 'A';
int shift = -3;
int position = letter - 'A';
Console.WriteLine(-3 % 26);
Console.WriteLine((char)((position + shift) % 26 + 'A'));
Console.WriteLine((char)((position + shift + 26) % 26 + 'A'));
Console.WriteLine((int)'>');
Console.WriteLine((int)'A');
```

```csharp exec
id: m-general-form
int[] shifts = { -3, -26, -30, -100, 3, 30, 100 };
foreach (int shift in shifts)
{
    for (int position = 0; position < 26; position++)
    {
        int moved = ((position + shift) % 26 + 26) % 26;
        if (moved < 0 || moved > 25) Console.WriteLine($"out of range {position} {shift} {moved}");
    }
}
Console.WriteLine("done");
```

```csharp exec
id: m-zero
int letters = 47;
int eCount = 12;
Console.WriteLine(eCount / letters);
int pixels = 640 * 480;
Console.WriteLine(pixels / 1000000);
```

```csharp exec
id: m-challenge
string word = "CAT";
int shift = 3;
Console.WriteLine((char)((word[0] - 'A' + shift) % 26 + 'A'));
```

```csharp exec
id: p-names-allowed
int total = 1;
int _hidden = 2;
int Total = 3;
int total_2 = 4;
Console.WriteLine(total + _hidden + Total + total_2);
```

```csharp exec
id: p-name-digit
expect: CS1001
int 2ndPlace = 1;
```

```csharp exec
id: p-name-int
expect: CS1001
int int = 1;
```

```csharp exec
id: p-types
int a = 42;
double b = 42.0;
string c = "42";
char d = '4';
bool e = true;
int f = 4 / 2;
double g = 4.0 / 2;
string h = "4" + "2";
string i = "4" + 2;
Console.WriteLine($"{a} {b} {c} {d} {e} {f} {g} {h} {i}");
Console.WriteLine((4 / 2).GetType());
```

```csharp exec
id: p-type-mismatch
expect: CS0266
int check = 4.0 / 2;
Console.WriteLine(check);
```

```csharp exec
id: p-parse
Console.WriteLine(double.Parse("3.7"));
Console.WriteLine((int)double.Parse("3.7"));
```

```csharp exec
id: p-rounding
Console.WriteLine(Math.Floor(-3.7));
Console.WriteLine(Math.Round(-3.7));
Console.WriteLine(Math.Round(3.7));
Console.WriteLine((int)3.7);
```

```csharp exec
id: p-bool-capitals
Console.WriteLine(bool.Parse("fAlSe"));
Console.WriteLine(bool.Parse("TRUE"));
```

```csharp exec
id: p-bool-yes
expect: exception
Console.WriteLine(bool.Parse("yes"));
```

```csharp exec
id: p-close-enough
double a = 0.1 + 0.2;
double b = 0.3;
Console.WriteLine(Math.Abs(a - b) < 1e-9);
Console.WriteLine(1e-9 == 0.000000001);
```

```csharp exec
id: p-decimal
Console.WriteLine(1.10m + 2.20m);
```

```csharp exec
id: p-no-dollar
string name = "Aoife";
Console.WriteLine("Hello, {name}.");
Console.WriteLine($"Hello, {name}.");
```

```csharp exec
id: p-places
double share = 2.0 / 3;
Console.WriteLine($"{share:F2}");
Console.WriteLine($"{share:F4}");
Console.WriteLine($"{5:F2}");
```

```csharp exec
id: p-cents
int totalCents = 1234;
Console.WriteLine(totalCents / 100);
int wholeEuro = 500;
Console.WriteLine($"Total: €{wholeEuro / 100.0:F2}");
Console.WriteLine($"Total: €{wholeEuro / 100.0}");
```

```csharp exec
id: p-long
Console.WriteLine(sizeof(long));
Console.WriteLine(long.MaxValue);
```

This one is last, because `int class = 1;` parses as a class declaration,
and the engine carries a declaration in a cell above into every program
below it (see "Found in the engine"). The cell after it shows that.

```csharp exec
id: p-name-keyword
expect: CS1001
int class = 1;
```

```csharp exec
id: p-below-keyword
expect: CS1001
Console.WriteLine("below");
```
