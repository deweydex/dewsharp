# storing-and-computing: notes for a reviewer

Ported from dewlab `tutorials/storing-and-computing/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. It
follows `first-steps` and `powers-in-csharp` in PDP's "Programming
Foundations" series, and comes before `dividing-in-csharp`.

Files:

- `storing-and-computing.md`: the lesson. 22 exec cells, 6 of them in world
  variants; 4 predicts, 4 hints, 8 solutions.
- `storing-and-computing-practice.md`: the practice page. 21 exec cells, 2
  of them in world variants; 7 predicts, 10 solutions.
- `storing-and-computing.native.json`, `storing-and-computing-practice.native.json`:
  what the native check recorded for every cell and solution.
- `NOTES.md`: this file. The probe cells at the end check the claims in the
  prose that no lesson cell prints. Run them with the same NativeCheck
  command, passing `NOTES.md` as the file. The `expect:` probes fail on
  purpose.

Every cell in both pages, and every solution, was run with NativeCheck, in
both worlds: 66 cell runs when both files are passed together. The last
line was "No problems." for the two files together, for each file with
`--json`, and for the probes in this file.

## Frontmatter

- `title`: "Variables, types and text: names for values, and the kinds of
  value C# keeps". dewlab's was "Variables, data types and text", which has
  no colon part. The format asks for "the term, a colon, and what the page
  does with it".
- `covers: [PDP-LO4, PDP-LO7, PDP-LO11]`. dewlab gives outcomes per section
  (LO4 for four sections, LO7 for the Caesar program, LO11 for naming). The
  format here is one list for the page, so the three are merged. All three
  still apply. The new ranges-and-memory cell also serves the PDP
  descriptor's "identify the range of data that it can store and the amount
  of RAM that it requires", which dewlab files under LO4.
- `year:` is dropped. The format has no such field.
- The practice page has `from: storing-and-computing-practice`, which is
  dewlab's id for it.

## What changed, and why

### What the reader already knows

The task says the C# `first-steps` page has introduced variables with
explicit types (`int`, `double`, `string`, `bool`) and `$"..."`. dewlab's
page is where Python learners first meet names and f-strings, so its
opening says "each result was gone as soon as it was shown". Here the
opening says the first page gave values names and types, and this page
looks at both more closely. "Putting values into text" now opens with "You
have used `$"..."` since the first page" and moves on to formats (`:F2`).

`powers-in-csharp` (drafted at the same time, and read before this was
written) defines *operator*, *method* and *exception*, shows CS0266
(*Cannot implicitly convert type 'double' to 'int'*), and says "A later
page explains casts". This page is that page: the type conversion section
refers back to CS0266 and explains casts. It defines *method* again in one
sentence, because a reader may arrive here first.

### The lesson, section by section

**Opening.** Same cell and predict. The third option is "Nothing: the
program does not compile", the wording `powers-in-csharp` uses.

**Variables.** The definition changed from "a name that refers to a value"
(Python's model) to "a name for a place in the computer's memory that holds
a value", which is what a C# variable of a value type is. A new paragraph
separates making a variable (`int count = 5;`, with a type) from giving it
a new value (`count = count + 1;`, without one), and says the type is fixed
for as long as the variable exists. The naming rules gain one line
(keywords), and *snake_case* became *camelCase*, with one sentence on
*PascalCase* for method names (PDP-LO11). The two world tasks now ask for a
type for each variable. Their solutions note that `false` prints as
`False`, which surprises most readers.

**Data types.** The table has five types, not four: `char` is new, because
C# has one and the Caesar shift needs it, and single quotes mean a `char`
in C#, not a string. `float` became `double`. Python's `type()` cell is
gone. C# shows a variable's type where the variable is made, so the cell
in its place asks C# for `int.MinValue`, `int.MaxValue` and `sizeof` for
four types. "Python's integers match the integers in maths" is no longer
true, so the paragraph now says an `int` holds only part of **Z**, and why.
A new cell is a mistake on purpose: `int count = "5";`, `expect: CS0029`,
with the message read in the usual order. That is the point of a
statically typed language, and the prose says the cell is meant to fail.
The `"40" + "2"` predict is kept. The your-turn cell that asked for
`type()` of six expressions now asks what six `+` lines print. They include
`"7" + 2` (72: C# joins, where Python stops) and the left-to-right pair
`7 + 2 + "7"` (97) and `"7" + 7 + 2` (772). A fold explains the pair.

**Text and its characters** (was "Text you can take apart", a phrasal
verb). `len()` became `.Length` and `.upper()` became `.ToUpper()`. The
page says why one has brackets and the other does not. `"ha" * 3` is gone:
C# has no operator that repeats a string (`5 * "3"` is CS0019, used in the
practice page). A third line prints `message` again, to show that
`ToUpper()` left it unchanged. The paragraph after it says that strings
cannot be changed in C#. `ord()`/`chr()` became the casts `(int)'A'` and
`(char)67`, so *cast* is defined here, where it first appears. The cell
also prints `(int)'Z'`, because the prose states 90.

**Type conversion** was rebuilt. Python has `int()`, `float()`, `str()`
and `bool()`. C# has three different things:

1. conversions between numbers, some by themselves (`int` to `double`) and
   some only with a cast (`double` to `int`), with a pointer back to
   CS0266;
2. division of two `int` values, which keeps only the whole part: 90
   minutes is 1 hour, or 1.5 with a cast. This is here because two of the
   page's own tasks (the E share, the megapixels) give 0 without it. It
   links to `dividing-in-csharp` for the closer look.
3. text to number with `int.Parse`/`double.Parse`, and number to text with
   `ToString()`, `+` or `$"..."`.

dewlab's commented-out `input()` cell became a real `Console.ReadLine()`
program with `stdin: "Aoife\n34\n"` for the checker. It introduces
`Console.Write`. The prose invites the reader to type *thirty* and see the
`FormatException`, which is what the style guide asks for before
`int.TryParse`. A summary table of conversions ends the section.

**Putting it together.** The Caesar shift uses `char` arithmetic:
`letter - 'A'` gives an `int` directly, and `(char)(moved + 'A')` goes
back. The predict and its three options are kept (`[` is still what the
number after Z gives). The answer fold "What each line does" is kept. Above
it is a new cell, `now-the-implementation-2`, which prints each step. It
does two jobs. It names *tracing* (PDP-LO10), and it puts the fold's
numbers (23, 0) in a recorded output.

**The backwards shift (secret-messages).** This is the biggest change in
meaning. In Python, `-3 % 26` is 23, so dewlab's hint ("Does `% 26` still
bring the number back into 0 to 25?") expects the answer yes, and its
solution says A becomes X. In C#, `%` truncates towards zero, so `-3 % 26`
is −3, and A with a shift of −3 prints `>`. The hint now asks the same
question, and in C# the answer is no. The solution adds 26 before the `%`,
and its note explains `>` and links to `dividing-in-csharp`. D still
decodes to A with or without the `+ 26`, so the `inputs` row (`newLetter`)
agrees either way.

**The rgb text (pixel-art).** In Python the difficulty was `str()`: `+`
will not join a string and a number. In C# it will, so that difficulty is
gone. The task is kept. The hint now asks which parts of the text never
change, and there are two solutions, one with `+` and one with `$"..."`.

**Putting values into text.** The first cell now prints the same line two
ways, `$"..."` and `+`, and asks which is easier to read. That keeps
dewlab's point ("it is easy to forget a space"). `:.2f` became `:F2`. The
screen ratio uses `double width = 1920;`, so the division keeps its
decimals without a cast. In the E-share task, both counts stay `int`, a
hint (`after: 1 runs`) catches the 0 from integer division, and a second
solution shows `:P1`. In the megapixels task, the solution divides by
`1000000.0`, and a hint catches the 0.

**Looking back.** dewlab asked why Python stops at `"40" + 2`. C# does not
stop there; it joins them. So the first question now asks which behaviour
the reader would rather have, and when C#'s would hide a mistake. A second
question asks why it helps to find a problem before any line runs. The
challenge is the same, with `word[0] - 'A'` and a cast, and it compiles and
prints F (probe `m-challenge`). A line points to the practice page.

**Where to read more.** The Python tutorial was replaced by two Microsoft
Learn pages, *Built-in types* and *Standard numeric format strings*. Both
returned HTTP 200 on 27 September 2026. The two YouTube links and *The Code
Book* are carried over from dewlab. YouTube answered 429 (too many
requests) to the check, so those two links were not confirmed here.

### The practice page

Items 1 to 19 keep dewlab's order, questions and cell ids. Two are new, at
the end, so that the numbering of the others still matches dewlab.

1. **Allowed names:** the same list, with `2ndPlace` and `total_2` for
   `2nd_place`. The answer names the compiler's first message
   (CS1001, *Identifier expected*) and defines *identifier*.
2. **A copy, or a link:** `x`/`y` became `mine`/`yours` (the style guide
   asks for names that read as words). The answer defines *value type* and
   links to `two-names-one-list` for the other kind.
3. **Swap:** `a`/`b` became `first`/`second`. Python's `a, b = b, a` became
   C#'s tuple swap `(first, second) = (second, first);`, titled "a shorter
   way C# has", not "you'll meet later". No later PDP page is known to
   teach it.
5. **What type is it:** there is no `type()`, so the reader checks a guess
   by putting the value in a variable of that type and seeing whether it
   compiles. The list gains `'4'`, `4.0 / 2` and `"4" + 2`. `GetType()` is
   mentioned in the answer, with `System.Int32` explained.
6. **A number times some text:** Python repeats the text. C# does not
   compile (`expect: CS0019`). The predict keeps its three options, with
   the third reworded. The sentence that says the cell is meant to fail
   comes after the cell, so that it does not answer the guess before the
   run. `"5" + 3` gives `53` in C#, where Python stops.
7. **Text that looks like a number:** `int("3.7")` became `int.Parse("3.7")`
   (FormatException) and `int(3.7)` became `(int)3.7`. It now has a cell,
   `expect: exception`, which the prose says is meant to stop.
8. **Cutting, or rounding:** `(int)-3.7`. dewlab's answer says "Rounding
   would give −4 … The two agree on positive numbers and differ on
   negative ones". That is true of truncating and *rounding down*, but not
   of rounding to the nearest number (3.7 rounds to 4). The C# answer
   compares the cast with `Math.Floor`, and mentions `Math.Round` in a
   second paragraph. dewlab's page may want the same fix.
9. **The word False:** Python's `bool("False")` is `True` (a string that is
   not empty counts as true). C# has no such rule: `bool.Parse("False")` is
   `False`. The predict is kept, with notes rewritten for C#, and the
   answer says that C# never treats a number or text as a `bool`
   (`bool member = 1;` is CS0029).
10. **25 plus 1 is 251:** now a real program with `Console.ReadLine()` and
    `stdin: "25\n"`, which prints `251` in C# (string `+` int joins). It
    has a solution with `int.Parse`.
11. **Past the end** (was "Going round"). ROT13 is unchanged. The pixel-art
    variant gains a note on `byte`, the 0 to 255 type, whose cast starts
    again after 255 in the same way (an `inputs` row shows it is 44).
12. **Point one plus point two:** unchanged in C#, with one sentence on
    `==` above the cell. dewlab uses `==` here before its making-decisions
    page, and so does this port. `math.isclose()` has no C# equivalent, so
    that sentence is gone. `Math.Abs` and `1e-9` are explained.
15. **Counting in cents:** dewlab's "fifty items at €0.10 gives
    €4.999999999999998" needs a loop, which this point in the course has
    not met. Two prices, €1.10 + €2.20, give 3.3000000000000003 in one
    line, so the problem now has a cell. The answer adds C#'s `decimal`.
16. **Four answers from two values:** Python's four lines used `*` and
    `str()`. The C# lines show `+` joining, `int.Parse`, and the
    left-to-right order (`1010`, `1055`).
17. **An interpolated string instead** (was "An f-string instead"; the
    cell id `an-f-string-instead-1` is kept).
18. **Decimal places:** `2 / 3` became `2.0 / 3`, with a comment, because
    `2 / 3` is 0 in C#.
19. **A price from cents:** two solutions, `:F2` and `:C`. The `:C` note
    says that the page always uses Ireland's format, and Visual Studio uses
    the computer's region.
20. **One past the largest** (new): `int.MaxValue + 1` overflows to
    `int.MinValue`, with `long` in the answer. It is the other half of the
    range cell on the lesson page.
21. **A letter that stays** (new): `word[0] = 'B';` is CS0200. This is
    where the port shows that strings cannot be changed in place, which the
    lesson page only states. It has a solution with `Replace`.

### The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`, last section), so
no `.glossary.yaml` was written. Every term in dewlab's glossary is defined
in the prose where it first appears, in its C# form: variable, `=`,
camelCase (for snake_case), data type, `int`, `double` (for `float`),
`string` (for `str`), `bool`, concatenate, `Console.ReadLine()` (for
`input()`), `Length` (for `len()`), `ToUpper()` (for `.upper()`), casts
(for `ord()`/`chr()`), interpolated string (for f-string), and `:F2` (for
`:.2f`). The page also defines: keyword, method, PascalCase, integer, bit,
byte, floating-point number, character, string, Boolean, convert, cast,
explicit, `Console.Write`, `int.Parse`, `ToString()`, Caesar shift and
tracing. The practice page adds identifier, value type, operand,
truncating, `decimal`, `byte`, overflow and read only.

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
  prints `>` for A unless 26 is added first.
- Strings cannot be changed in place (`ToUpper()` returns a new one;
  `word[0] = …` is CS0200).
- Nothing counts as `true` or `false` except a `bool`.
- `Console.WriteLine(true)` prints `True`.
- There is no operator that repeats a string.

## Where each number in the prose comes from

Recorded outputs are in the two `.native.json` files. On the page, a
compiler message starts with `Program.cs`, the default file name. The
native check labels it with the cell id instead. Line and column match.

| Number or claim | Source |
|---|---|
| `HELLO!!!`, 6 | lesson cells `a-name-for-a-message-1`, `variables-giving-names-to-things-1` |
| −2,147,483,648, 2,147,483,647, and 4, 8, 2, 1 bytes | lesson cell `data-types-different-kinds-of-information-1` |
| `float` uses 4 bytes ("twice as many") | probe `m-float-size` |
| CS0029 at line 1, column 13, and its text | lesson cell `data-types-different-kinds-of-information-2` |
| 42, 402 | lesson cell `where-i-might-get-stuck-1` |
| 9, 72, 72, 7.5, 97, 772 | lesson cell `your-turn-2` |
| 77 (the middle step of `"7" + 7 + 2`) | probe `m-left-to-right` |
| 12, `MEET AT NOON`, `meet at noon` | lesson cell `text-you-can-take-apart-1` |
| 65, 66, 90, C | lesson cell `text-you-can-take-apart-2` |
| 5 and 3 | lesson cell `type-conversion-1` |
| without `(int)`: CS0266 and its text | probe `m-no-cast` |
| 1 and 1.5 | lesson cell `type-conversion-2` |
| a cast cannot convert text to a number, or a number to text | probes `m-cast-text`, `m-cast-number` (CS0030) |
| 428 and 50 | lesson cell `type-conversion-3` |
| Next year you will be 35 (with 34 typed) | lesson cell `type-conversion-4` |
| *thirty* stops with FormatException at `int.Parse` | probe `m-thirty` |
| table: `double.Parse("3.7")` is 3.7, `42.ToString()` is `"42"` | probe `m-table` |
| X becomes A; `[` without `% 26` | lesson cell `now-the-implementation-1`; probe `m-no-remainder` |
| position 23, moved 0 | lesson cell `now-the-implementation-2` |
| 26 (23 + 3) in the fold | probe `m-left-to-right` |
| D came from A; `-3 % 26` is −3; A prints `>`; with `+ 26`, A becomes X | solution of `your-turn-4--secret-messages`; probe `m-backwards` |
| `>` is three characters before A | probe `m-backwards` (62 and 65) |
| `rgb(30, 144, 255)` | solutions of `your-turn-4--pixel-art` |
| 1.7777777777777777 and 1.78 | lesson cell `putting-values-into-text-2` |
| E is 25.5% (both solutions); `eCount / letters` is 0 | solutions of `putting-values-into-text-3--secret-messages`; probe `m-zero` |
| 307200 pixels, 0.31 megapixels; `pixels / 1000000` is 0 | solution of `putting-values-into-text-3--pixel-art`; probe `m-zero` |
| the challenge prints F | probe `m-challenge` |
| practice 1: allowed names compile; CS1001 first for `2ndPlace` and `class` | probes `p-names-allowed`, `p-name-digit`, `p-name-keyword` |
| practice 2: 5 | practice cell `a-copy-or-a-link-1` |
| practice 5: the nine types; `GetType()` gives `System.Int32`; a type that does not fit names both types | probes `p-types`, `p-type-mismatch` |
| practice 6: CS0019 at line 1, column 19; `53` twice | practice cell `a-number-times-some-text-1`; probe `p-join` |
| practice 7: 3, then FormatException and its text; `(int)double.Parse("3.7")` is 3 | practice cell `text-that-looks-like-a-number-1`; probe `p-parse` |
| practice 8: −3; `Math.Floor(-3.7)` −4; `Math.Round(-3.7)` −4; `Math.Round(3.7)` 4 | practice cell `cutting-or-rounding-1`; probe `p-rounding` |
| practice 9: `False`; capitals in any mix; `bool.Parse("yes")` FormatException; `bool member = 1;` CS0029 and its text | practice cell `the-word-false-1`; probes `p-bool-capitals`, `p-bool-yes`, `p-bool-number` |
| practice 10: 251, then 26 | practice cell `twenty-five-plus-one-1` and its solution |
| practice 11: N becomes A; A becomes N; 44 twice | solution of `thirteen-places-along-1--secret-messages`; probe `p-rot13`; `inputs` of the pixel-art variant |
| practice 12: 0.30000000000000004 and False; `Math.Abs(…) < 1e-9` is true | practice cell `floating-point-1`; probe `p-close-enough` |
| practice 14: 8 hours and 20 minutes | solution of `hours-and-minutes-1` |
| practice 15: 3.3000000000000003; `1.10m + 2.20m` prints 3.30 | practice cell `counting-in-cents-1`; probe `p-decimal` |
| practice 16: 105, 15, 1010, 1055 | practice cell `four-answers-from-two-values-1` |
| practice 17: forgetting `$` prints the brackets | probe `p-no-dollar` |
| practice 18: 1; 0.67, 0.6667, 5.00 | practice cell `putting-values-into-text-practice-1`; probe `p-places` |
| practice 19: €12.34 (both); `totalCents / 100` is 12; €5.00 with `:F2`, €5 without | solutions of `a-price-from-cents-1`; probe `p-cents` |
| practice 20: 2147483647 and −2147483648; `long` uses 8 bytes; `long.MaxValue` | practice cell `one-past-the-largest-1`; probe `p-long` |
| practice 21: CS0200 at line 2, column 1, and its text; BAT | practice cell `a-letter-that-stays-1` and its solution |
| 47 letters, 12 E, 640 × 480, 1920 × 1080, 500 minutes, 1234 cents, €1.10, €2.20, 200 + 100 | the set-up of each task, carried over from dewlab (or chosen here) |
| E is about one letter in eight in English | carried over from dewlab; not program output |

## Once the course map or the page UI exist

- **Link text for pages not yet written.** Links use the ids from the task
  (`lists-and-sequences`, `repeating-yourself`, `making-decisions`,
  `equals-three-ways`, `two-names-one-list`, `reading-an-error-message`,
  `dividing-in-csharp`). Their text is descriptive ("the page on arrays and
  lists", "the page on loops"), or dewlab's title where it will probably
  stay ("Two names, one list", "Equals, three ways", "Reading an error
  message", "Making decisions", "Dividing in C#"). Check each against the
  real titles.
- **"A later page shows how a program can check the text before it
  converts it"** (after the *thirty* experiment) is `int.TryParse`. Link it
  once the course map says which page teaches it.
- **`powers-in-csharp` says "A later page explains casts".** It can link
  here: `lesson:storing-and-computing#type-conversion`.
- **What `first-steps` covers.** This page assumes `first-steps` showed
  `%` (as dewlab's does, with a clock). If it did not, the one sentence
  "`%` gives the remainder after dividing" still defines it. It also
  assumes `first-steps` did not make integer division its surprise. If it
  did, the `type-conversion-2` cell repeats it, and the prose there could
  point back instead.
- **`dividing-in-csharp`.** This page shows `90 / 60` is 1 and `-3 % 26` is
  −3, and sends the reader there for both. That page should look closely at
  truncation towards zero for `/` and `%`, and at 0.1 (practice 12 links to
  it for that).
- **A practice link.** The last paragraph before "Where to read more" links
  to `lesson:storing-and-computing-practice`. If the page adds a practice
  link by itself, delete that paragraph.
- **Warnings on untouched starter cells.** Six starter cells make
  variables that the reader has not used yet. Run as they are, they show
  CS0219 warnings (*assigned but its value is never used*). Examples are
  `putting-values-into-text-3--secret-messages` and `a-price-from-cents-1`.
  Check that the quieter warning style does not read as a failure to a
  reader who has only pressed Run.
- **A broken declaration in a cell above breaks every cell below.** Practice
  problem 1 invites the reader to try `class` as a name. `int class = 1;`
  parses as a (broken) class declaration. Under the rules of the road, it
  then goes into every program below it on the page, and each of those
  stops compiling with errors that name the first cell. The native check
  did exactly this in a scratch run. The page may want to carry types only
  from cells that compile, or to say which cell above caused an error.
  Until then, a reader who tries `class` will see every later practice cell
  fail. The probe `p-name-keyword` is last in this file for the same
  reason.
- **Typed input and "Compare with a solution".** `twenty-five-plus-one-1`
  has a solution and `stdin:`. Check what the page does when the reader
  compares a program that waits for typing.
- **Predict before a cell with `expect:`.** Practice 6 has a choice predict
  on a cell that does not compile, as `powers-in-csharp` does. Check that
  the side-by-side view shows the compiler message there.
- **Folds with code.** Several answer folds contain `csharp` and `console`
  fences. Check that they render inside the fold.

## Open questions for a reviewer

1. **Four guesses on the lesson page.** The style guide asks for two or
   three. dewlab's page has four, and the task says to keep them. The
   weakest in C# is probably the opening one (`HELLO!!!`), because the
   reader has met `string` variables on `first-steps`. The page would still
   open by running something and asking about it without the predict
   block. The practice page has seven guesses, as dewlab's does.
2. **Is the page now too long?** It gained a ranges-and-memory cell, a
   mistake-on-purpose cell, a division cell, a trace cell and a conversion
   table. Each earns its place for C# or for a PDP outcome. If something
   has to go, the conversion table and the trace cell are the easiest to
   lose. If the trace cell goes, the fold's numbers need another source.
3. **Integer division before `dividing-in-csharp`.** The page shows it once
   (`90 / 60`) because two of its own tasks need a `double` division. Is
   that acceptable, or should those tasks use `double` variables and leave
   the surprise to the closer look?
4. **`GetType()` and `System.Int32`.** Mentioned once, in a practice answer.
   Keep it, or leave .NET's full names for FOOP?
5. **The tuple swap** in practice 3 is not taught anywhere in PDP. Keep it
   as "a shorter way C# has", or remove the second solution?
6. **`byte` and `decimal`** appear only in practice answers (11 and 15).
   Are two more type names on this page too many?
7. **Cell ids.** dewlab's ids are kept where the task is the same, including
   two that no longer match their section's heading
   (`where-i-might-get-stuck-1`, `now-the-implementation-1`) and
   `thirteen-places-along-1--pixel-art`, which is not about thirteen places.
   No class has used this page yet, so this is the last free moment to
   rename them.
8. **Thousands separators.** The prose writes −2,147,483,648 where the
   output shows -2147483648. The value is the same. Is that the house style,
   or should the prose copy the output exactly?

## Probe cells

These are not part of the lesson. Each checks a claim in the prose that no
lesson cell prints.

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
id: p-join
Console.WriteLine("5" + "3");
Console.WriteLine("5" + 3);
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
id: p-bool-number
expect: CS0029
bool member = 1;
Console.WriteLine(member);
```

```csharp exec
id: p-rot13
char letter = 'A';
int shift = 13;
int position = letter - 'A';
int moved = (position + shift) % 26;
Console.WriteLine((char)(moved + 'A'));
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
and a declaration in a cell above goes into every program below it.

```csharp exec
id: p-name-keyword
expect: CS1001
int class = 1;
```
