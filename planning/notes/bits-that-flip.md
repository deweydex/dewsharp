# Notes: bits-that-flip

A new dewsharp page, written on 29 September 2026 from the course map's
PDP explore entry E2: "Bits that flip: XOR and parity", from dewlab's
`bits-that-flip` (Dewey Track), action *adapt*, shape *explore*, covers
PDP-LO4, no worlds, size M, depends on `powers-in-csharp`,
`types-and-their-sizes` and `repeating-yourself`. The entry names no
practice page, and an explore page has none (COURSE_MAP.md, "Practice
pages and mixed sets"), so there is none.

Read before writing: dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md`, `docs/TRANSLATING.md`, the course
map's reading guide, principles and the PDP explore entries; the
exemplars `first-steps` and `objects-and-classes`; the three pages it
depends on, plus `making-decisions` (for `&&`, `||` and `!=`),
`storing-and-computing` (for `letter - 'A'`) and `how-we-got-here` (the
course's own page on binary and hex, which comes later in PDP); and
dewlab's `bits-that-flip.md`, its practice page, glossary and picture.

Files:

- `lessons/bits-that-flip/bits-that-flip.md`: version 2026.09.28.2. 14
  `csharp exec` cells, all program cells; 3 predicts, 5 hints, 6
  solutions (3 of them on the last "your turn"), 1 `inputs` block, 1
  challenge, 2 pictures, 1 "Why this way?" fold.
- `lessons/bits-that-flip/parity-check.svg`: dewlab's picture, drawn
  again for a white card (dewlab's used its page's CSS variables). Three
  rows of eight bits and the parity bit; flipped bits have a thick border
  and a pink fill *and* the word "flipped" under them, so colour is not
  the only signal. `<title>`, `<desc>`, and dewlab's description in the
  Markdown.
- `lessons/bits-that-flip/flipped-colour.svg`: new. The two colours,
  `FF8800` and `0077FF`, labelled, in place of dewlab's matplotlib bar
  chart (the course map: "The matplotlib picture goes").
- `lessons/bits-that-flip/bits-that-flip.outputs.json`, written by the
  checker.

## What the page does, in order

1. **The buoy's puzzle**, kept from dewlab: how can land notice one
   flipped bit in a message it has never seen? Then the link back to
   *Powers*, where `2 ^ 3` printed 1: this page says what `^` is.
2. **XOR on single bits.** The four lines, with a predict on the last
   one. XOR is named after it runs; "tea or coffee" for exclusive or, and
   `||` from Decisions as the other "or". The stairs light. `^` against
   `!=` on `bool` (dewlab's `same_rule` over a truth table becomes four
   printed lines). Your turn: three switches, with the three nested loops
   given and one `0` to change.
3. **A switch that flips.** Flip and leave; toggle; the shuffle button,
   pressed three times; `^=`; $b \oplus k \oplus k = b$.
4. **XOR on whole numbers.** Binary place values in two sentences,
   `Convert.ToString(n, 2)` and `PadLeft`, a table to complete by hand,
   then the cell. *Bitwise* and *mask* are named after it runs. The reader
   is invited to put 2 and 3 in the cell to see why *Powers* printed 1.
5. **Flipping a colour.** Hex in one paragraph, `0x`, `ToString("X6")`,
   orange to blue, and the picture. Your turn: flip it again, a colour of
   your own, the mask `0xFF0000`.
6. **Hiding a message** (new, see decisions). XOR each `char` with a key,
   then the same loop again; predict on the second line. Vernam and the
   one-time pad, moved here from dewlab's practice page.
7. **Four more operators on bits** (new): `&`, `|`, `<<`, `>>`, one cell,
   a table, `1 << n` as a mask and a power of 2, `>>` as division, `& 1`
   for odd, and a sentence on brackets with `&` in a comparison.
8. **Counting the 1s: parity.** Parity and parity bit defined; 14 by
   hand; one line of eight XORs; then the parity loop with one gap
   (dewlab's toolkit cell), with `inputs`, two hints and a solution.
9. **Catching a flipped bit.** `0b`, the reading as a `byte` (and why
   `^` on bytes needs a cast, pointing back to *Types and their sizes*),
   one flip caught, two flips missed (predict on the last line), the
   picture, where parity is used, Hamming's weekend. Your turn: noise of
   your own, three and four flips, the parity bit flipping; three
   solutions, one for each case.
10. **Looking back.** dewlab's "Why this way?" fold, a question, the
    challenge (dewlab practice problem 15, two keys that act as one),
    "no practice page", a pointer to *Programming languages* for binary
    and hex, and "nothing needs Visual Studio".
11. **Where to read more.** Microsoft's reference for the bitwise and
    shift operators; dewlab's Spanning Tree video on Hamming codes.

## Decisions, and why

- **No methods.** The entry's "Depends on" lists `powers-in-csharp`,
  `types-and-their-sizes` and `repeating-yourself`, and not
  `writing-your-own-functions`. So a reader may not have met a method.
  dewlab's toolkit function `parity_bit` became a `foreach` loop in the
  cell, with the same one gap (`parity ^ 0` → `parity ^ (bit - '0')`).
  The cost: dewlab's comparison table had six calls; this one has one
  row (`parity`), and the solution's note invites two more strings. The
  catch cells repeat the loop, because each cell works on its own and
  there is no method to call.
- **The parity bit is written into the catch cells** (`int parityBit =
  1;`), not worked out a second time in the cell. The prose says where it
  came from (the `bits-parity-1` and `bits-toolkit` outputs). A second
  loop would push each catch cell past 20 lines.
- **The catch cells use a `byte`**, not an `int`, because the reading is
  one byte and the entry asks for the operators "on `int` and `byte`".
  That needs `(byte)(sent ^ noise)`, which the prose explains by pointing
  back to what *Types and their sizes* found for `+`. The CS0266 that
  appears without the cast was checked in a probe (below), and the page
  describes it without quoting it.
- **"Passes the check?"** in place of dewlab's "Looks right?". The page's
  output line would otherwise print the word *right* on every catch cell,
  and the style guide's checklist asks that no line says it. The first
  recording printed "Looks right?"; the line was changed after that, so
  the version went from 2026.09.28.1 to 2026.09.28.2.
- **Cell ids are dewlab's** where the task is the same (decision 28):
  `bits-single-1`, `bits-single-2`, `bits-your-three-switches`,
  `bits-toggle-1`, `bits-whole-1`, `bits-colour-1`, `bits-your-colour`,
  `bits-parity-1`, `bits-toolkit`, `bits-catch-1`, `bits-catch-2`,
  `bits-your-noise`. `bits-toolkit` keeps its id although dewsharp has
  no toolkit, because decision 28 renames only ids that name Python (see
  Open). The two new cells follow dewlab's prefix: `bits-hiding-a-message-1`
  and `bits-more-operators-1`.
- **A section on hiding a message.** The course map's "Why" names it
  ("Hiding a message with XOR, and catching a flipped bit with a parity
  bit, are small programs with a real use"), and dewlab's main page has
  no such section (only the PIN problems on its practice page). It uses
  `foreach` over a string and `(char)`, both met on the pages this one
  depends on. The key is 7: a probe showed that the key 42 turns each
  space into a new line, so the page uses a key that keeps every
  character of `MEET AT NOON` printable, and says only that some keys
  give characters the console cannot show well.
- **A section on `&`, `|`, `<<` and `>>`**, because the entry's "What
  changes in C#" lists them. It is one cell and a table, placed before
  parity so that `1 << 5` can serve as a mask in the last "your turn".
  `~` is left out (named only in "Where to read more").
- **Binary and hex are explained on this page**, briefly, because the
  course's own page on them, `how-we-got-here`, comes after this page's
  dependencies. The page links to it for more.
- **The opening.** dewlab opened with the buoy and two warm-up questions
  from dewlab pages dewsharp does not have (*Everything is ones and
  zeros*, *True, false and every case*). The warm-ups go; the buoy stays,
  followed at once by the first cell, so the page still opens by running
  something and asking about it.
- **Three predicts**: the last line of the single-bit cell, the second
  line of the message cell, and the last line of the two-flip cell. Each
  names its line. The shuffle cell asks "on or off?" in prose, without a
  block, to stay within two or three.
- **The "Four questions" table and "What we have now" glossary table are
  left out.** The first belongs to dewlab's Dewey Track framework; the
  second is a glossary, and dewsharp defines each term in the prose where
  it first appears.
- **Hints wait for `after: 2 runs`** on the tasks whose starter runs
  without an error (LESSON_FORMAT.md).

## Where each number and quoted output comes from

All from `bits-that-flip.outputs.json` (version 2026.09.28.2):

- 0, 1, 1, 0 and "the last line prints 0": `bits-single-1`.
- `True` twice, `False` twice: `bits-single-2`.
- The four rows with light 1: the solution of `bits-your-three-switches`.
- 1, 0, 1: `bits-toggle-1`.
- `1100`, `1010`, `0110`, 6: `bits-whole-1`.
- `FF8800`, `0077FF`: `bits-colour-1`. `FF8800` again and `008800`: the
  solution of `bits-your-colour`.
- `JBBS'FS'IHHI`, `MEET AT NOON`: `bits-hiding-a-message-1`.
- `1000`, `1110`, `0110`, 8, 3, 1: `bits-more-operators-1`.
- 1: `bits-parity-1`. `00001110: parity bit 1`: the solution of
  `bits-toolkit`.
- 10 and `False`: `bits-catch-1`. 8 and `True`: `bits-catch-2`.
- 9 / `False`, 1 / `True`, 14 / `False`: the three solutions of
  `bits-your-noise`.
- "`2 ^ 3` printed 1": `powers-in-csharp.outputs.json`, `an-experiment-1`.

Numbers that no cell prints, and that come from definitions: the place
values 1, 2, 4, 8; "12 is 8 + 4" and "10 is 8 + 2" (their binary is
printed by `bits-whole-1`); 0 to 255 for a byte (printed on *Types and
their sizes*); hex digits 10 to 15, `F` is `1111`; "255 minus what it
was"; the years 1917, 1947 and 1950, which come from dewlab's page and
practice page.

## Probes (a scratch lesson, not part of the page)

Run with `node tools/check-lessons.mjs --lessons <scratch>/lessons
--write`:

- `Console.WriteLine(reading & 1 == 0);` does not compile: `(2,19): error
  CS0019: Operator '&' cannot be applied to operands of type 'int' and
  'bool'`. This backs the page's sentence about brackets.
- `byte received = sent ^ noise;` with two `byte` values does not
  compile: CS0266, "Cannot implicitly convert type 'int' to 'byte'".
- The message XORed with 42: the space became a new line.
- `2468 ^ 1357` is 3305, then `^ 4000` is 841, and `1357 ^ 4000` is 2797.
  These are the challenge's answers; the page does not print them, and
  the challenge's starter prints the first two when a reader runs it.

## Left out

- dewlab's warm-up questions, `truth_table`, `same_rule`, `to_binary`,
  `to_hex` and the toolkit mechanism.
- The matplotlib chart (replaced by `flipped-colour.svg`).
- "The space we're in" box: its point, that the check assumes at most one
  flip, lives in the "Why this way?" fold and the two-flip section.
- The Four questions table and the "What we have now" table.
- dewlab's practice page, which has seventeen problems (seven-segment
  display, the music-app settings mask, Schlomi's parity function, the
  short colour mask, parity by counting, the fitness watch, XOR as
  addition mod 2, `looks_right`, the XOR swap, the PIN lock, Schlomo's
  two keys, XOR from `and` and `or`, one parity bit or sixteen). Only
  Schlomo's two keys is used, as the challenge.

## For other files (not changed here: the brief allowed only these)

- `courses/pdp.yaml`: the `planned:` line for `bits-that-flip` can go,
  now that the lesson exists (TRANSLATING.md checklist).
- `lessons/powers-in-csharp/powers-in-csharp.md` names this page as
  *Bits that flip*, in italics without a link. It could now link to
  `lesson:bits-that-flip`.

## Open

1. **Methods on an explore page.** This page avoids methods because its
   "Depends on" does not list `writing-your-own-functions`. With a
   `ParityBit(string bits)` method, the gap task would have a comparison
   table of several calls, as in dewlab, and the catch cells would be
   shorter. Should explore pages assume methods, or keep strictly to
   their listed dependencies?
2. **`bits-toolkit`.** Decision 28 keeps dewlab's id when the task is the
   same, and renames only ids that name Python. This id names dewlab's
   toolkit, which dewsharp does not have. Keep it for traceability, or
   rename it (for example `bits-parity-loop`) before the page is used?
3. **Four more operators.** The entry asks for `&`, `|`, `<<` and `>>`.
   The page gives them one cell and a table. Is that the weight you want
   on an extra page about XOR, or should they have tasks of their own
   (for example, reading one bit with `(reading >> i) & 1`)?
4. **dewlab's practice problems.** An explore page has no practice page,
   so sixteen of dewlab's seventeen problems have no home in dewsharp.
   Should this page get a practice page after all, or should some of
   them (the XOR swap, the settings mask, one parity bit or sixteen) go
   into `mixed-first-programs` or `mixed-programming`?
5. **"Passes the check?"** replaced dewlab's "Looks right?" to keep
   *right* off the page. Is that reading of the style guide what you
   want, for text that a program prints about data (not about the
   reader)?
6. **Hex before `how-we-got-here`.** This page defines hex in one
   paragraph for the colour section. `how-we-got-here` teaches it
   properly, later in the course. Is a short definition here acceptable,
   or should the colour section go, and the page stay with binary only?
7. **The PPS number.** The page keeps dewlab's sentence that the check
   letter of an Irish PPS number "uses a similar idea". It is one extra
   character that catches a mistyped digit, but it is calculated with a
   weighted sum and a remainder, not with parity. Keep the sentence, or
   say more precisely what the similarity is?

## Review

A second reading on 29 September 2026. I read the page as a Level 5
learner, then as a teacher, and then went through the TRANSLATING.md and
style guide checklists. Every number and quoted output in the prose,
solutions and SVG descriptions matches `bits-that-flip.outputs.json`.
Each of the three predicts names its line, and the checker compares its
options with that line. Each program cell works on its own. The solutions
and the one `inputs` block sit on the cell that runs. The page has no
verdict words: *right* appears only as a direction ("from the right").

No cell's code changed, so the version stays 2026.09.28.2 and the outputs
file was not rewritten. The changes are all in prose and hints:

- **For the teacher:** a short paragraph after the opening says the page is
  an extra that the module's outcomes do not need, and names what it uses
  (*Loops*, and `byte` from *Types and their sizes*). E1 does the same.
  "The tool for it" became "The tool for noticing", so that it still points
  to the buoy's question.
- **Terms defined where they first appear:** *base 2*, from base 10 ("each
  place is worth 10 times the place on its right"); $b$ and $k$ in
  $b \oplus k \oplus k = b$; *teleprinter*. "Relay computer", "modems" and
  "servers" were terms that nothing explained, so they became plain words.
- **Shorter or clearer sentences:** the hex paragraph is split into three
  sentences. "C# writes the two numbers one above the other" was not what C#
  does, so it became "Think of the two numbers written one above the
  other". "`!=` compares two whole values" could be read as "two whole
  numbers", so it became "asks whether two values are different". `<<` now
  says "the number on its right says how many places". The "Why this way?"
  fold had "a reading that had changed passing the check", which is now "a
  changed reading that passed the check". Colour task 2 had "What do you
  expect first?", which is now "What do you expect, before you run it?".
- **Invite, and wait:** after `bits-single-2`, the prose asked the reader
  to try all four settings and then gave the answer ("The two lines agree
  every time"). Now it asks "Do the first two lines agree every time?".
- **`2 ^ 3` in the whole-numbers cell:** the prose now says to change
  *every* 12 and 10, since each line has them. The binary is written as the
  cell prints it (`0010`, `0011`, `0001`), not as `10`, `11` and `01`.
- **Idioms and phrasal verbs:** "back where it started" (twice), "toy
  lock", "look at the limit", "left a job running ... over a weekend". The
  Hamming paragraph is rewritten in plain sentences, with the same facts
  and dates (1947, 1950, from dewlab).
- **The `&` sentence** used `reading` before the page had any variable of
  that name. It is now `(number & 1) == 0`.
- **The first hint on `bits-your-noise`** began with a statement that gave
  the mask away. It now asks two questions. A second hint (`after: 3
  runs`, "a mask to start from") keeps the example `0b00000111`.
- **PPS number (open question 7):** the sentence now says the check letter
  uses a similar idea "with a different calculation". It no longer
  suggests that the check letter is a parity bit, and the point dewlab
  made stays.

Checked, and left as it is:

- The `bits-toolkit` id (open question 2), because the choice is Josh's.
  It costs nothing to rename it now, before any class uses the page, and
  it costs saved work afterwards.
- "Passes the check?" (open question 5). This is text that a program
  prints about data, and it keeps *right* off the page.
- `byte noise = 1 << 5;` in "Your turn" compiles, because `1 << 5` is a
  constant that fits in a `byte`.

Still open for Josh: questions 1 to 6 above, unchanged. For question 7,
the change above is a proposal, and he can revert it or remove the
sentence.

Final check: `npm run check-lessons -- bits-that-flip` gave
"bits-that-flip: 22 runs, 3.2 s / 1 page(s), 22 runs in 10.3 s: no
problems."
