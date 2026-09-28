# types-and-their-sizes: notes for a reviewer

A new page, written on 28 September 2026 from its entry in
`planning/COURSE_MAP.md` (PDP lesson 6, FOOP lesson 3: one page, one id,
one set of saved work). The course map's action is *new*: no dewlab page
teaches this, so the page is written for C#, and it draws on three dewlab
sources for ideas, questions and problems (below). It comes after
`storing-and-computing` and `dividing-in-csharp` in PDP, and after
`from-python-to-csharp` and `compiler-errors` in FOOP.

Files:

- `lessons/types-and-their-sizes/types-and-their-sizes.md`: the lesson,
  version `2026.09.28.2`. A reader sees 15 cells in each world: 13 shared
  cells, and two "your turn" cells in the chosen world. All are program
  cells. Three predicts (all `choice`); three cells meant to fail, each
  with `expect:` and a sentence before it that says so; four hints; six
  solutions (four with `inputs`); one "Why this way?" fold; one challenge;
  one picture.
- `lessons/types-and-their-sizes/types-and-their-sizes-practice.md`: the
  practice page, version `2026.09.28.1`. Twelve problems, 12 cells in each
  world. Problem 2 is in both worlds; the rest are shared.
- `lessons/types-and-their-sizes/int-circle.svg`: the `int` values drawn
  on a circle, with a description in the lesson.
- `lessons/types-and-their-sizes/*.outputs.json`: written by the browser
  checker.

The version is `.2` because four cells changed after the first recording
(shorter comments and shorter lines, so that the code does not wrap in the
editor, and the float cell prints its sizes on lines of their own). Nobody
had used the page, so no saved work is affected, and no cell id changed.

## The brief, and where each part of it is

| The course map asks for | Where |
|---|---|
| Opens with a predict: `int.MaxValue + 1` prints -2147483648 | `one-past-the-largest-1`, with a variable (see decision 2) |
| An `int` has 4 bytes, and goes round with no error; new to readers from Python | the prose after it, the picture, and a paragraph for Python readers |
| `byte`, `short`, `int`, `long`, with `sizeof`, `MinValue`, `MaxValue` | "Four types for whole numbers", `four-types-for-whole-numbers-1`, and its table |
| What that costs in memory ("range of data and amount of RAM") | "What a type costs in memory", `what-a-type-costs-in-memory-1` |
| `checked` makes going round an exception | "Checking for overflow", `checking-for-overflow-1` (`expect: exception`) |
| `double`, `float`, `decimal`: digits, and which to use for money | "Numbers with a decimal point", three cells, the last one CS0664 |
| `char` (2 bytes), `bool` (1 byte), a `string` as much as its text | "Characters, true or false, and text" |
| Widening by itself, narrowing with a cast, `(int)-3.7` is -3, `Convert.ToInt32(2.5)` is 2 | "Converting from one type to another", three cells |
| A data dictionary for a small program | "A data dictionary": the Caesar shift, and a "your turn" in each world |
| Pixel art keeps a colour in a `byte` (`255 + 1` is 0); secret messages count letters in a `byte` and keep codes in `char` | `converting-from-one-type-to-another-2` and the two `your-turn-1` tasks; `char` in the data dictionaries |
| Practice: the smallest type; a byte that goes round; a price in `double` and `decimal`; a cast that loses a digit; a data dictionary for an earlier program | practice problems 1, 2, 5, 6 and 11 |

## Decisions, and why

1. **`from: numbers-a-computer-can-hold`.** The course map lists three
   sources. This one is first, its subject is the page's (what a
   computer's numbers can hold), and it gave the most: "Python's ints
   never run out", the doubling of patterns with each light (its seven
   segments), and its reading, *Why didn't GPS crash?*. From
   `how-a-computer-stores-a-number` came the idea of overflow as a word, a
   largest value for each type, "count in whole units" for money, and the
   Java sentence about an `int` that starts again at a large negative
   number. From `storing-and-computing-practice` (dewlab's and dewsharp's)
   came the floating-point problems, which dewsharp's version already has
   (0.1 + 0.2, "Counting in cents", `1.10m + 2.20m`), so this page does not
   repeat them: it links to "Counting in cents" and does the price with
   `* 3` instead. dewlab's number families, logarithms, `digit_at`,
   `assert`, docstrings and the Patriot missile story were not used (see
   "Left out").
2. **The opening keeps `int.MaxValue` in a variable.** The course map says
   "Opens with a predict: `int.MaxValue + 1`. It prints -2147483648." In
   C#, `Console.WriteLine(int.MaxValue + 1);` does not compile: both are
   constants, so the compiler does the sum and checks it (CS0220, probe
   `p-const-onepast`). Written with a variable, the sum waits until the
   program runs, and it prints -2147483648 as the map says. The page opens
   that way, and the constant version became practice problem 3, which
   the lesson's "Why this way?" fold points to. The cell prints
   `int.MaxValue` first, so the prose can quote 2147483647 from a
   recorded line.
3. **The words for overflow agree with the pages that already name this
   one.** `repeating-yourself-practice` ("starts again from its smallest
   value, and continues from there, with no error"),
   `putting-things-in-order` ("C# does not stop the program. It continues
   from the smallest `int`"; its notes asked for exactly this) and
   `finding-things-practice` ("C# keeps only the part of the result that
   fits"). The lesson says: "C# does not stop the program. It starts again
   from the smallest `int`, and continues from there. This is called
   *overflow*: the answer is too large for its type, and C# keeps only the
   part that fits." The course map's "goes round" is not used: the
   playbook's checklist lists *go round* as a phrasal verb to avoid.
4. **A picture of the `int` values on a circle.** Overflow is easier to
   see than to read about. The picture is an SVG with a light background
   of its own (`#f6f4f0`, the page's cell colour) and dark text, because a
   lesson picture is shown with `<img>`, which cannot use the page's CSS
   colours, and `currentColor` in an `<img>` is black on a dark page. It
   was drawn in headless Chromium to check it. Its only numbers are 0, 1,
   -1 and the two recorded limits.
5. **Bits and patterns before the four types.** The largest `int` looks
   like an arbitrary number until the reader sees where it comes from.
   dewlab's seven segments (each light doubles the patterns) became "a
   light that is off or on", and `Math.Pow` (met on `first-steps` and
   `powers-in-csharp`) prints 256, 65536 and 4294967296. The prose says an
   `int` shares its patterns equally between the numbers below zero and
   the rest, without the words *two's complement*.
6. **Uses of each type are in the prose, not the table.** A fifth column
   ("Used for") made the table too wide for the page at 900 pixels once
   the `long` limits were in it (seen in a screenshot). The four columns
   are the ones the code prints.
7. **Memory: one photo, in `byte` and in `int`.** 1920 × 1080 pixels, three
   colour values each: 6,220,800 bytes against 24,883,200. This is PDP's
   "the amount of RAM that it requires", with one number the reader can
   compare. *RAM* is defined in one sentence. Megabytes are not used, so
   no rounded number appears that no cell printed.
8. **`checked(...)`, the expression, not the block.** One line, no braces.
   The "Why this way?" fold names the project setting
   `CheckForOverflowUnderflow` (Microsoft Learn, *Compiler Options:
   language feature rules*, fetched 28 September 2026: default `false`).
   It does not give a Visual Studio menu path, which was not seen.
9. **The digits of each decimal type come from a third.** The prose counts
   the digits in the recorded output (8, 16 and 28) and says "here". It
   does not quote Microsoft's table ("~6-9 digits", "~15-17", "28-29"),
   because no cell prints those numbers; the reading list sends the reader
   to that table. The largest values print as `3.4028235E+38` and
   `1.7976931348623157E+308`, so `E+38` is explained in one sentence, with
   KaTeX for $3.4028235 \times 10^{38}$.
10. **Money: a `decimal` literal without its `m` (CS0664).** It is the
    first message a learner meets with `decimal`, and it teaches *literal*
    and *suffix*. The solution prints 3.30, and the `double` version of
    the same sum (3.3000000000000003) is practice problem 5, so the
    lesson does not repeat `dividing-in-csharp`'s `0.1 * 3`.
11. **`char`, `bool`, `string`.** `char` is 2 bytes and "has the 65536
    patterns of the second line of the patterns cell"; `bool` is 1 byte
    because each byte has an *address* and a bit has none. A string's size
    is "2 bytes for each character, and some more" with no overhead number,
    since the overhead depends on the runtime and no cell can print it.
    `sizeof(string)` (CS0233) was probed and left out: one more failing
    cell for a small point.
12. **"255 + 1 in a byte" does not compile in C#.** The course map says
    "Pixel art keeps a colour in a `byte` (`255 + 1` is 0 in a `byte`)".
    `red = red + 1;` with a `byte` is CS0266 (*Cannot implicitly convert
    type 'int' to 'byte'*), because C# does arithmetic on a `byte` as an
    `int`. The page makes that the lesson: a cell meant to fail, the
    reason, and a solution with `(byte)(red + 1)` that prints 0. `++` and
    `+=` would compile and give 0 too (probe `p-byte-sum-cast`), but
    neither is taught before `repeating-yourself`.
13. **`(byte)300` is 44, and the page says where the reader may have met
    44.** `storing-and-computing-practice` shows `300 % 256` is 44, but
    only in the pixel-art world, so the sentence begins "If you chose
    pixel art on the practice page for Variables and types".
14. **Rounding to even.** The predict asks about `Convert.ToInt32(2.5)`.
    The prose gives both names, *rounding to even* and *banker's
    rounding*, says why it exists in one sentence (a total of many rounded
    halves does not grow), and that `Math.Round` and Python's `round` do
    the same.
15. **Your turn, in the two worlds.** Secret messages: three letter counts
    in `byte` variables, a total cast to `byte` (29), made into an `int`
    (285). Pixel art: a brush on a `byte` red (44), kept at 255 with
    `Math.Min`, which is introduced in the task in one sentence (the same
    job `Math.Max` does in `objects-and-classes`). Both show that a cast
    makes a program compile and hides the overflow. They differ in the fix
    (a type, or a limit), and each is one line.
16. **The data dictionary.** Columns: name, type, size, what it holds, as
    the course map says. The worked example is the Caesar shift from
    `storing-and-computing`, which the reader has run, and the prose
    discusses why `shift`, `position` and `moved` stay `int` though a
    `byte` would hold each (changed in review: see "Review").
    The "your turn" asks for the dictionary as comments at the top of the
    cell, because the page has no other place to write that is saved. The
    pixel-art version also asks for a type for the colour values; the
    secret-messages version asks whether any variable could be smaller.
    The solutions have no `inputs`: the program prints the same line
    either way.
17. **A summary table of every type**, with the sizes and ranges the cells
    printed, opens the data dictionary section, so that the reader has
    one place to look up a size. *Primitive types* is defined there in one
    sentence, for FOOP-LO1 ("the simplest types, built into the language,
    each holding one value of a fixed size"), and the sentence says that a
    `string` is built in but has no fixed size.
18. **For FOOP readers.** The page is shared, and FOOP readers know
    Python. One paragraph says that a Python whole number has no largest
    value, and the rounding paragraph notes Python's `round`. The page
    writes every type (PDP's rule, and FOOP's until
    `the-moves-you-already-know`). *Exception*, *.NET* and `Int32` are
    defined where they appear, because a FOOP reader may arrive here
    without PDP's `first-steps`; so are *bit* and *byte*, which
    `storing-and-computing` defined for PDP readers.
19. **Links.** Only to pages in `lessons/`: `dividing-in-csharp`,
    `storing-and-computing` (two anchors), `storing-and-computing-practice`
    (two anchors, both checked against its headings after it changed
    during this work), `making-decisions`, and the practice page. In
    review, two more: `reading-input` (the next page for FOOP, which is now
    in `lessons/`, so it is a link and no longer italics) and
    `compiler-errors#a-value-of-another-type` (where both courses met
    CS0266, which the `byte` cell gives again).
20. **The challenge** is the year-2038 question (seconds since 1970 in an
    `int`). It compiles alone, as decision 40 needs, and the prose gives no
    year, so no unrecorded number appears. `p-2038` in the probes has the
    answer for a teacher: 24855 days, 68.05 years, 2038.05.

### The practice page

Twelve problems. The course map's five, three that go back to earlier
pages with a change to a type (as the principles ask: "two or three
problems from earlier pages"), and four more.

1. **The smallest type that holds it** (the map's). Nine values, one cell
   to try them in, a solution that declares all nine and prints them, and
   a second cell meant not to compile (`byte green = 300;`, CS0031), which
   shows that the compiler checks a literal. The note says that most
   programmers would still use `int` for small whole numbers. The census
   figure, 5,149,139 (2022), is the one dewlab's practice page uses.
2. **A byte below zero** (the map's "a byte that goes round"), in both
   worlds: unread messages, or a pixel's brightness, at 0, minus 1, is
   255.
3. **One past the largest, written in the code**: CS0220, the constant
   version of the lesson's opening. The fold defines *constant* (and says
   a literal is one kind), and explains *at compile time* and *in checked
   mode* from the message.
4. **A century in seconds** (goes back to `first-steps`' arithmetic):
   `long secondsInACentury = secondsInAYear * 100;` still overflows,
   because the product is an `int` before it reaches the `long`. The
   solution casts first. This is the most common real overflow mistake,
   and the lesson does not show it.
5. **A price in double and in decimal** (the map's): 3.3000000000000003
   against 3.30.
6. **A cast that loses a digit** (the map's): `(float)1234567.89` prints
   1234567.9. This was chosen over `(int)` of a large `long` (which loses
   the front of the number, not "a digit") and over an `int` in a `float`
   (which prints 123456790 while it holds 123456792, too subtle here).
7. **An average that lost its half** (goes back to `dividing-in-csharp`):
   `double average = totalPoints / games;` prints 3.
8. **The next letter** (goes back to `storing-and-computing`):
   `letter = letter + 1;` with a `char` is CS0266, the same message as the
   lesson's `byte`.
9. **Weeks in ten bits**: GPS, from dewlab's reading. `Math.Pow(2, 10)` is
   1024, about 19.7 years.
10. **Halves**: `Convert.ToInt32` of 0.5, 1.5, 2.5 and 3.5.
11. **A data dictionary for a program you have met** (the map's):
    `storing-and-computing`'s `type-conversion-2`, which reads a name and
    an age with `ReadLine` (`stdin:` for the checker), because two of its
    variables hold the same age in two types.
12. **Why not long for everything?** An answer fold, no cell.

## Left out, and why

- `sbyte`, `ushort`, `uint`, `ulong`, `nint`, `nuint`: named once as types
  the course does not use. `BigInteger`: not named.
- `unchecked`, and the `checked { }` block: one form of `checked` is
  enough.
- `int.Parse` and `OverflowException`: `reading-an-error-message` has it,
  in its table and practice 4. The two pages name the same exception from
  two causes, and agree.
- Infinity and NaN: `reading-an-error-message` shows `1.0 / 0` as ∞.
  `double.MaxValue * 10` is ∞ on the page too (probe `p-infinity`).
- A `double` cast to an `int` when the value is too large: the result is
  unspecified in C#, and the page and a computer differ (see "Found in the
  engine").
- `int` to `float` losing digits, although C# converts it by itself: the
  reading list names it, and the page's widening paragraph speaks only of
  `int` to `long` and `int` to `double`, which lose nothing.
- The `f` suffix's own CS0664 (`float price = 1.10;`): the `decimal` one
  teaches the same thing.
- `int?` (an `int` that can be `null`): `a-front-end-for-a-class`'s notes
  hoped this page or `reading-input` would teach it. It is not in this
  page's entry, and it belongs with `TryParse` on `reading-input`.
- Hexadecimal and binary literals, and the digit separator `_`
  (`finding-things-practice` explains `_` itself).
- dewlab's number families, logarithms, `digit_at`, `assert` and
  docstrings (maths or Python-only, and the course map drops the maths),
  and the Patriot missile story from `how-a-computer-stores-a-number`
  (twenty-eight deaths is heavy for a page whose tone is light; the GPS
  video gives a real case of a count that starts again).

## Where each number in the prose comes from

Every number below is in `types-and-their-sizes.outputs.json` or
`types-and-their-sizes-practice.outputs.json`. Thousands separators are
added in the prose, as `first-steps` does.

| Prose | Cell |
|---|---|
| -2147483648, 2147483647 (opening, picture, patterns section) | `one-past-the-largest-1` |
| 256, 65536, 4294967296 | `bits-bytes-and-patterns-1` |
| sizes 1, 2, 4, 8; -32,768 to 32,767; the `int` and `long` limits; "all 256 of its patterns" | `four-types-for-whole-numbers-1`, `bits-bytes-and-patterns-1` |
| 6,220,800; 24,883,200; "four times" and "three bytes" (the sizes 1 and 4) | `what-a-type-costs-in-memory-1` |
| the `OverflowException` report, line 2 | `checking-for-overflow-1` |
| 8, 16 and 28 digits; "rounded up to 4"; 4, 8 and 16 bytes | `numbers-with-a-decimal-point-1` |
| 3.4028235E+38, E+308, 79228162514264337593543950335 | `numbers-with-a-decimal-point-2` |
| CS0664 at (1,17); 3.30 | `numbers-with-a-decimal-point-3` and its solution |
| 2 and 1 bytes; 12 characters, 24 bytes | `characters-true-or-false-and-text-1` |
| 300, 44 | `converting-from-one-type-to-another-1` |
| CS0266 at (2,7); 0 | `converting-from-one-type-to-another-2` and its solution |
| 2, 4, -3, -4, and `Math.Round`'s 2 | `converting-from-one-type-to-another-3` |
| 29, 285 | `your-turn-1--secret-messages` and its solution |
| 44, 255 | `your-turn-1--pixel-art` and its solution |
| 32,767 in the data dictionary notes | `four-types-for-whole-numbers-1` |
| Practice: 12.50 | `the-smallest-type-that-holds-it-1` solution |
| Practice: CS0031 at (1,14) | `the-smallest-type-that-holds-it-2` |
| Practice: 255 | `a-byte-below-zero-1--*` |
| Practice: CS0220 at (1,19) | `one-past-the-largest-written-in-the-code-1` |
| Practice: 3153600000 | `a-century-in-seconds-1` solution |
| Practice: 3.3000000000000003, 3.30 | `a-price-in-double-and-in-decimal-1` |
| Practice: 1234567.9, 8 digits, 89 cents became 90 | `a-cast-that-loses-a-digit-1` |
| Practice: 3, 3.5 | `an-average-that-lost-its-half-1` and its solution |
| Practice: B, and the CS0266 message | `the-next-letter-1` and its solution |
| Practice: 1024, 19.7 | `weeks-in-ten-bits-1` solution |
| Practice: 0, 2, 2, 4 | `halves-1` |

Numbers that are data in a question, not results (1920 × 1080, 120, 90 and
75 letters, 5,149,139 people, 1970, 10 bits, 52 weeks), and numbers from
the course's reading (1024 weeks and 2019 in the GPS video's description,
taken from dewlab's reading list, whose video library gives 12.3 minutes),
are not results of the page's code.

## Found in the engine

- **A `double` too large for an `int`, cast with `(int)`.** On the page,
  `(int)3e9` is -2147483648, and so are `(int)-3e9` and
  `(int)double.NaN` (scratch probes `q-nan` and `p-convert-overflow`). With
  `dotnet run` on .NET 10.0.12, x64 Linux, en-IE, the same lines print
  2147483647, -2147483648 and 0. C# says the result of this cast is
  "an unspecified value" outside a `checked` context (Microsoft Learn,
  *Built-in numeric conversions*), so both are C#; but a program that the
  learner downloads to Visual Studio would print something different from
  the page. This page and its practice page avoid the case. The engine and
  the page were not changed.
- Everything else compared with `dotnet run` was the same, character for
  character: `123456789` kept in a `float` printing 123456790 while `(int)` of it is
  123456792, `(float)2.718281828459045` as 2.7182817, `1f / 3` as
  0.33333334, `1m / 3` with 28 digits, `1.10m * 3` as 3.30, and
  `double.MaxValue * 10` as ∞.

## Probes

Run in the browser engine with
`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`, from
two scratch lessons (`tats-probes`, `tats-probes2`). Only results that the
page does not already record:

| Probe | Result |
|---|---|
| `Console.WriteLine(int.MaxValue + 1);` | CS0220 (1,19) |
| `byte asByte = (byte)300;` | CS0221 (1,15), *use 'unchecked' syntax to override* |
| `byte red = 256;` | CS0031 |
| `red = (byte)red + 1;` | CS0266 (2,7) |
| `byte` 255, then `++` and `+= 1` | 0 and 0 |
| `int.MinValue - 1`; a `byte` 0 minus 1 | 2147483647; 255 |
| `short` 32767 plus 1, cast | -32768 |
| `int big = 5000000000;` / `3000000000;` | CS0266 from `long` / from `uint` |
| `sizeof(string)` | CS0233, and warning CS8500 |
| `(int)'á'`, `(int)'Ω'`, `(int)char.MaxValue` | 225, 937, 65535 |
| `float price = 1.10;` | CS0664 (1,15), *use an 'F' suffix* |
| `1.10f * 3`; `0.1f + 0.2f` | 3.3000002; 0.3 |
| `float.MinValue`, `double.MinValue`, `decimal.MinValue` | the negatives of the largest values |
| `decimal.MaxValue + 1` | `OverflowException` (*too large or too small for a Decimal*) |
| `Convert.ToInt32(3e9)` | `OverflowException` (*too large or too small for an Int32*) |
| `Math.Round(2.5, MidpointRounding.AwayFromZero)` | 3 |
| `(int)8_100_000_000L`; `(int)3_000_000_000L` | -489934592; -1294967296 |
| `long.MaxValue` as a `double` | 9.223372036854776E+18 |
| the year-2038 challenge, worked | 86400; 24855; 68.04928131416838; 2038.0492813141684 |

## Open

Questions only Josh can settle. The page has a default for each.

1. **The opening.** The course map's line, `int.MaxValue + 1`, does not
   compile in C# (CS0220). The page keeps the value in a variable first,
   and moves the literal version to practice problem 3. Is that the
   opening you want, or should the page open on the compile error and
   then show the variable?
2. **`255 + 1` in a `byte`.** The course map expected it to print 0. It
   does not compile without a cast (C# does `byte` arithmetic as `int`),
   and the page teaches that with a cell meant to fail. Is one more
   failing cell here welcome, on a page that already has two, or should
   the `byte` start with `(byte)(red + 1)` and explain it afterwards?
3. **The data dictionary's columns.** The page uses name, type, size and
   what it holds (with the range inside "what it holds"), as the course
   map says. Does the college's brief for PDP's first skills
   demonstration ask for other columns, such as an example value, a
   validation rule or a separate range column? If so, the two tables and
   the three solutions should match it.
4. **"In Programming and Design Principles, the first assessed program
   asks for one."** This is from the course map's teacher notes. Is it
   true of your college's brief, and is it welcome on a page that FOOP
   readers also see?
5. **Pictures in dark mode.** Lesson pictures are shown with `<img>`, which
   cannot use the page's colours. This picture carries its own light
   background, so it is readable in both themes but is a light box on a
   dark page. The existing pictures (`range-collapsing.svg`,
   `where-the-cuts-are.svg`, `the-mission-in-boxes.svg`) use
   `currentColor` with no background, which an `<img>` draws in black, so
   on a dark page they should show black lines on dark grey (not looked
   at here). Which should pictures do?
6. **The engine's `(int)` of an out-of-range `double`** (above) differs
   from .NET on a computer. C# allows both, but a downloaded project can
   print a different number from the page. Should `docs/LESSON_FORMAT.md`
   or `TRANSLATING.md` say so, as a pitfall for authors?
7. **Size.** 15 cells in each world is the top of the course map's M. The
   practice page has 12 problems. Nobody has timed a learner on either.
   If the lesson must lose something, the largest-values cell
   (`numbers-with-a-decimal-point-2`) and the summary table are the easiest
   to lose, but PDP's "range of data" is in them.

## For the batch that adds forward links

Five pages name this one in italics (decision 32), and can now link to it:
`storing-and-computing` ("*Types and their sizes*, shows what happens past
the largest one"), `powers-in-csharp` ("*Types and their sizes* has more
on them"), `repeating-yourself-practice` (the 13! fold),
`finding-things-practice` (problem 7) and `putting-things-in-order`
(`comparing-our-sorts-3`). Each says what this page does. Not changed
here: the task was to edit no other lesson.

## Review

Reviewed on 28 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one (PDP: `storing-and-computing`,
`compiler-errors`, `dividing-in-csharp`; FOOP: `from-python-to-csharp`,
`compiler-errors`), once as a teacher against the course map's entry, and
then line by line against the checklists in `docs/TRANSLATING.md` and the
style guide. The page does what its entry asks, in the order it asks, and
every number in the prose, the folds and the solution notes is in the two
outputs files. What failed is below, and it was fixed in the page.

No cell's code changed, so neither `version:` changed, and both outputs
files are as the writer recorded them. The final
`npm run check-lessons -- types-and-their-sizes types-and-their-sizes-practice`
(no `--write`): 29 runs and 37 runs, 66 runs in 9.5 s, no problems.

### Two claims that were not true

Both were checked in the browser engine with a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`):

| Probe | Result |
|---|---|
| `byte-shift`: the Caesar shift with `byte shift = 3;`, and no cast | compiles, prints `X becomes A` |
| `byte-position`: `byte position = letter - 'A';` | CS0266 (2,17) |
| `byte-plus-byte`: `byte c = a + b;` with two `byte` values | CS0266 (3,10) |

1. **"Line 2 has no `int` in it"** (after `converting-from-one-type-to-another-2`).
   It has one: `1`, and the page itself says in "Four types for whole
   numbers" that a whole number written in the code is an `int`. A reader
   who noticed would stop trusting the paragraph. It now names the message
   as the CS0266 from *Compiler errors* (a conversion that could lose
   something, linked), says that `red` is a `byte`, that C# converts each
   `byte` to an `int` first (probe `byte-plus-byte`), and that `1` is an
   `int` already.
2. **"A `byte` here would need casts"** (the paragraph under the Caesar
   shift's data dictionary), said of `shift`. It would not (probe
   `byte-shift`). The paragraph now says that `shift`, `position` and
   `moved` could each be a `byte`; that for five variables the memory
   saved is too small to matter; and that `position` and `moved` would
   each need a cast, because `letter - 'A'` is an `int`, as `red + 1` was
   (probe `byte-position`). Decision 16 above now says so.

### Changed in the lesson

3. ***Cast* is defined** where "Converting from one type to another"
   starts, in `storing-and-computing`'s words ("A type name in brackets
   before a value ... is a *cast*. It asks C# to convert the value to that
   type."). A FOOP reader met the word in `compiler-errors` without a
   definition.
4. **The overflow question is asked once.** "Checking for overflow" asked
   "Which would you rather have ...?" and answered it in the next sentence
   ("stopping is safer"), and "Looking back" asked it again. The section
   now says what `checked` did, and the question waits, unanswered, for
   "Looking back".
5. **The Caesar shift is introduced** with one sentence on what it does,
   for FOOP readers, who have not seen `storing-and-computing`.
6. **Say the thing first:** "`Convert` is part of .NET, the system that
   runs C# programs, and `Int32` is .NET's own name for `int`: an
   *integer*, or whole number, in 32 bits." (*.NET* was used before it was
   defined, and *integer* was not defined for FOOP readers.)
7. **Plain words.** "a rounder number" (an idiom) became "Where does a
   number like that come from?"; "the numbers from zero up" became "zero
   and the numbers above it", as the picture says; "always stays from 0 to
   255" became "is always from 0 to 255"; "the second line of the patterns
   cell" names the section; "write down" (a phrasal verb) became
   "explain"; "grow up" and "grow down" in the picture's description
   became "get larger along" and "continue along"; "a program that keeps
   large amounts of data chooses its types" became "In a program that
   keeps a lot of data, choose each type with care"; the data
   dictionary's "Written before the program, it is part of the plan. Read
   later, it ..." became two sentences with subjects; the rounding
   sentences and the 39-word narrowing sentence were split; "a letter at
   the end" became "a letter at the end of a literal"; "The brightest red
   became black" became "no red at all", since only the red part is 0.
8. **"C# has four more types for whole numbers"** became "other types ...
   such as" the four, because C# also has `nint` and `nuint`, and the
   Microsoft page in the reading list shows them. Its note, "the four
   that this course does not use", became "the ones".
9. **The fold "Why doesn't C# check every calculation?"** said the
   compiler checks "when every number in a calculation is written in the
   code". `int.MaxValue` is not written as a number, and practice problem
   3 depends on it. Now: "when every value in a calculation is fixed in
   the code, as `5` and `int.MaxValue` are".
10. **Links:** *Reading input* is a link now (it is in `lessons/`), and
    the `byte` cell links back to *Compiler errors*. "The first assessed
    program asks for one" became "the brief for the first assessed program
    asks for one", because a program does not ask. Whether the brief does
    is still open 4.

### Changed on the practice page

11. Problem 1's hint sent the reader to "the lesson's last section". The
    table of types is in "A data dictionary", which is not the last. The
    hint now names it.
12. Problem 1's fold named `red + 100`, which only pixel-art readers saw.
    It now names `red + 1`, from a cell that every reader has.
13. Problem 4 asked "Why is the second line below zero?" before the reader
    ran it. It now asks "What does the second line print, and why?". Its
    hint's "their product" is now `secondsInAYear * 100`.
14. Problem 8's hint said the message is "the same as" the lesson's; it
    names `char`, not `byte`, so it is "like" it. The note's "A `char` has
    no numbers below zero" became "An `int` can be below zero, or far
    larger than the number of any character".
15. Problem 9's hint had no `after:`, so it waited for an error (the
    default, `after: 1 errors`), and an empty cell that runs gives none.
    It is `after: 2 runs` now, as `docs/LESSON_FORMAT.md` says for a task
    whose starter runs.
16. Problem 12: "the answer of `int.Parse`" became "what `int.Parse`
    gives"; "A `long` does not end overflow either" became "A `long` can
    overflow too"; "where the answer is written down" became "the place to
    write the answer".

### Checked, and left as it was

- Every program cell works on its own, and the page never says "rules".
- Three predicts on the lesson, each on a line it names; four in each
  world on the practice page, within what `first-steps-practice` (7) and
  `objects-and-classes-practice` (6) have.
- Three cells meant to fail, each with `expect:` and a sentence before it;
  the three outcomes in the style guide's words.
- No *right*, *wrong*, *correct* or *well done*, and Irish and British
  spelling (*colour*) throughout the prose.
- Every hint starts from something the reader has, and asks a question.
- Solutions, `inputs` and hints are on the cell that runs.
- The exception report is in the page's own format (`web/page/cell.js`,
  `drawException`).
- Anchors in `lesson:` links match the headings (`web/page/markdown.js`,
  `slug`).

### Still open for Josh

The writer's seven questions under "Open" stand, with the page's defaults.
Two more, found in review:

8. **Two stale `planned:` lines.** `courses/pdp.yaml` and
   `courses/foop.yaml` still have `planned:` lines for
   `types-and-their-sizes` and `reading-input`, which are both in
   `lessons/` now. The checklist in `docs/TRANSLATING.md` says to delete
   them. This review was not allowed to edit the course files.
9. **Long comment lines in the data dictionary solutions** (up to 111
   characters) wrap in the editor, so their columns do not line up on a
   narrow screen. They were left: it is a matter of layout, and the
   columns line up in Visual Studio. One variable to a comment block of
   two lines would fix it, if it matters.
