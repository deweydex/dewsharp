# making-decisions: notes for a reviewer

Ported from dewlab `tutorials/making-decisions/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file. The brief is the
course map's entry (`planning/COURSE_MAP.md`, PDP row 7): action *adapt*,
shape *tutorial*, size M, batch 2, depends on `storing-and-computing`. No
earlier draft of this page existed; both pages were written from scratch
in this run.

Files:

- `making-decisions.md`: the lesson. 17 exec cells, 6 of them in world
  variants (14 tasks when a pair of variants counts once); 3 predicts, 8
  hints, 7 solutions, 2 cells meant to fail.
- `making-decisions-practice.md`: the practice page, 19 problems. 19 exec
  cells, 2 of them in world variants; 3 predicts, 5 hints, 13 solutions, 2
  cells meant to fail.
- `making-decisions.native.json`, `making-decisions-practice.native.json`:
  what the native check recorded for every cell and solution.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell in both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for the
two pages together, for each page with `--json`, and for the probes in this
file.

## Frontmatter

- `title`: "Decisions: if, else if and else", the course map's title.
  dewlab's was "Making decisions with if, elif and else".
- `covers: [PDP-LO6, PDP-LO4]`, from the course map. dewlab gives outcomes
  for each section (LO6 for five sections, and MIT-1.1 for the number
  families, which are gone). dewlab's `touches: [MIT-2.4]` on the Boolean
  operators section is a maths outcome, and it is dropped with the rest of
  the integrated-course maths (course map, "What changes because of C#",
  last bullet).
- `year:` is dropped: the format has no such field.
- The practice page has `from: making-decisions-practice` (dewlab's id for
  it, as the `storing-and-computing` draft does) and
  `practice_for: making-decisions`. Its title is "Decisions: practice",
  in the pattern of "Variables, types and text: practice".

## What changed, and why

### What the reader already knows

PDP's order is `first-steps`, `powers-in-csharp`, `storing-and-computing`,
`compiler-errors`, `dividing-in-csharp`, `types-and-their-sizes`, then this
page. From the drafts and the course map, the reader has met: typed
variables (`int`, `double`, `char`, `string`, `bool`), `bool` printing as
`True`, casts such as `(int)'A'`, `char` arithmetic in the Caesar shift,
`%` and its negative remainder, `Console.ReadLine`, `$"..."`, a method, and
the shape of a compiler message (file, line, column, code, text), with
CS0029, CS0103, CS0165 and the warning CS0219 on the compiler page.

Only `first-steps` and `storing-and-computing` are known in detail
(`storing-and-computing` and `dividing-in-csharp` are drafted;
`first-steps`, `compiler-errors` and `types-and-their-sizes` are not). So
this page defines *operand*, *warning* (on the practice page) and
*unassigned* again where it uses them, and reads each compiler message in
the usual order, rather than relying on the compiler page.

### Links: back only, as the batch rule says

The course map's batch rule 3: a lesson links back only to lessons of
earlier batches, and a forward link is added by the author of the page it
points to. This page is batch 2. It links to one other lesson,
`dividing-in-csharp` (batch 1), from practice 17, and to its own practice
page. Everything dewlab linked forward is now plain text, and should
become a link when that page lands:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, "Comparisons" | "A later page, a closer look at the equals sign" | `lesson:equals-three-ways` | 3 (already drafted, and it links back here) |
| practice 2 | "A later page, a closer look at the equals sign" | `lesson:equals-three-ways` | 3 |
| lesson, `your-turn-4--secret-messages`, second solution | "The page on arrays and lists" | `lesson:lists-and-sequences` | 3 |
| lesson, "Looking back" | "the page on loops" | `lesson:repeating-yourself` | 2 (same batch) |
| lesson, "Looking back" | "the page on reading input" | `lesson:reading-input` | 4 |

dewlab's "Looking back" also sent the reader to `reading-an-error-message`
before loops. That sentence is gone: in C# the page after this one in the
map is `equals-three-ways`, and `reading-an-error-message` is about
exceptions, which this page does not raise. Practice 11 linked to dewlab's
`logic-and-truth`, which no dewsharp course lists. The link is gone; the
fold states both of De Morgan's laws instead.

### The lesson, section by section

**Opening.** `which-comes-first-1` compares `char` values, `'A' < 'B'` and
`'Z' < 'a'`, as the course map says. The cell gains a third line that prints
the two numbers (`Z is stored as 90, and a as 97`), so that the prose's 90
and 97 come from the page's own output rather than from reasoning. The
predict now asks about "the second line". One sentence says that C# prints
`True` for `true`.

**`"A" < "B"`, a new cell** (`which-comes-first-2`, `expect: CS0019`), with a
predict where "It does not compile, so nothing runs" is one of three
options. The sentence that says the cell is meant to fail comes after the
cell, so that it does not answer the guess before the run (the
`storing-and-computing` practice page does the same). The message is read
in the usual order, and *operand* is defined. The page then says it uses
`char` for single characters, which is why every world task below uses
`char`.

**Comparisons.** The six-operator cell and table are the same. "One equals
sign gives a name a value" became "stores a value in a variable". The
`your-turn-1` guessing cell keeps its id and five of its six lines. `0 ==
False` is replaced by `'a' == 97` (True in C#: a `char` compares as its
number), which is C#'s own surprise and ties back to the casts of
`storing-and-computing`. `0 == false` then gets a cell of its own,
`comparisons-true-or-false-2`, meant to fail with CS0019, said so before
the run. The course map allowed either dropping it or keeping it as "the
one line that does not compile" inside `your-turn-1`; a failing line
inside the guessing cell would stop the other five from printing, so it
has its own cell. The Boole paragraph stays, turned round: Boole wrote
true as 1 and false as 0, and C# keeps the two apart.

A paragraph says that `==` on strings compares the text, with the sentence
about Java books that the course map asks for. `1 == 1.0` is explained
(the `int` is converted to `double`).

**If statements.** The same cell in `char`. The prose now says what C#
needs that Python did not: round brackets round the condition, curly
brackets round the body, and no semicolon after the condition. The
paragraph on indentation is reversed: in C#, the curly brackets decide
which lines belong to the `if`, and indentation is for the reader. One
sentence sends the reader to the practice page for the semicolon trap
(practice 18).

**If and else.** The same cell and predict, with `string pixel;` before the
`if`. A `dl-why` fold explains the line: a variable made inside curly
brackets exists only inside them (CS0103 if each body makes its own), and
C# checks that every path gives it a value (practice 19, CS0165). This is
new to readers from Python, and every task below depends on it. The
course map gives scope its closer look on `a-total-that-starts-again`; the
fold names it in two sentences and does not use the word *scope*.

**Your turn 2** (both worlds). The stubs declare `string action = "";` and
`string shade = "";`, as the course map says, so the cell compiles and
the `inputs` row has something to read. The prose says why, and says that
the stub shows a CS0219 warning until the reader's `if` uses `character`
or `x`. Each gains a second hint, `after: 1 errors`, for the most likely
C# mistake: writing `string action = "keep";` inside the body, which is
CS0136 (probed in a scratch run: *A local or parameter named 'action'
cannot be declared in this scope...*). The hint asks a question and does
not quote the message, because the reader could also meet CS0128 or
another one.

**Else if.** "Elif: multiple paths" became "Else if: many paths". The cell
keeps its dewlab id, `elif-multiple-paths-1`, because the task is the same
(course map: a cell that keeps its task keeps its dewlab id). A sentence
after the cell says that 200 prints `#`. *Boundary* is defined. "Mistakes
often hide at a boundary" became "Mistakes are often at a boundary"
(idiom). "the biggest threshold goes first" became "the check with the
largest number goes first".

**Your turn 3.** Secret messages: `.isupper()`/`.islower()` became
`char.IsUpper`/`char.IsLower`, introduced as methods in one sentence.
Pixel art: the variable `where` became `place`, because `where` is a C#
contextual keyword (it compiles as a name, but the editor may colour it as
a keyword, and it reads oddly to anyone who later meets LINQ).

**Boolean operators.** `and`, `or`, `not` became `&&`, `||`, `!`, with the
English words in the table's new "Name" column. One sentence says where
`|` is on an Irish or British keyboard, because many learners have never
typed it. The precedence sentence is `!`, then `&&`, then `||`, as the
course map says. "turns True into False" became "changes true to false"
(phrasal verb).

**Your turn 4.** Secret messages: the first solution continues a long
condition on a second line with no brackets, and says why C# allows it
(a statement ends at its semicolon). The second solution uses
`"AEIOU".Contains(character)` for Python's `in`, as the course map says.
Pixel art: the "shorter way" (Python's chained `0 <= x < 64`) goes, as the
course map says. Its note now points to practice 3, where the chained form
is tried and does not compile.

**Classifying numbers** and `your-turn-6` are gone (course map: MIT-1.1,
maths that only the integrated course needs). dewlab's glossary entry for
the number families goes with them.

**Looking back.** The question about order is the same. The challenge is
in `char` (probes `m-challenge`, `m-challenge-answer`: Q becomes T, Z
becomes C, and a possible answer leaves ' ' and '?' as they are). The
sequence/selection/repetition paragraph stays, with *repetition* now
defined, and gains one sentence on `switch`, which the course map places
on `reading-input` (the PDP descriptor's "branching with many
conditions"). A line points to the practice page.

**Where to read more.** The two Khan Academy videos are Python and are
replaced by two Microsoft Learn reference pages (*if and switch
statements*, *Boolean logical operators*); both returned HTTP 200 on 27
September 2026, and their titles were checked. The Stand-up Maths video
stays: YouTube's oEmbed endpoint confirmed the title *Leap Years: we can
do better* by Stand-up Maths. The page itself answered 429, so the length
("about twelve minutes") is carried over from dewlab and not checked here.

### The practice page

dewlab's numbering is kept up to 15. Two problems go (16 "Which families"
and 17 "Is every float rational", maths, as the course map says), so
dewlab's 18 becomes 16. Three new problems follow, 17 to 19. The intro
gains one sentence on the CS0219 warning that most starting cells show.

1. **Capitals and small letters.** `"Apple" < "apple"` does not compile in
   C#, and the opening of the lesson already shows that. The cell is now
   `'a' < 'B'` (False: small a comes after capital B, though a comes
   before b in the alphabet), with the predict's notes swapped to fit.
   The things to try are `'a' - 'A'` (32), `10 == 10.0` and `"10" == 10`,
   which does not compile in C# (CS0019), where Python said False.
   dewlab's sentence "a simple sort puts Zoe before adam" is gone: C#'s
   `Array.Sort` of strings uses the culture's order, so it would not be
   true here.
2. **One equals sign or two** became a cell meant to fail with CS0029, as
   the course map says. The cell prints `lives` after the `if` so that
   the only message is the error (without that line there is also a
   CS0219 warning). The answer reads the message, says an assignment has a
   value (the same words as `equals-three-ways`), and says what the line
   does in C. It overlaps with `equals-three-ways`, which comes next in
   PDP; the practice problem is the short version.
3. **Strictly between.** One solution with `&&`. The second solution
   (Python's chained comparison) became an invitation to try
   `10 < number < 20` and read the compiler's CS0019 (probe `p-chain`).
4. **Three ifs instead of else if.** The same, with braces. Cell id kept.
5. **Positive, negative or zero.** `n` became `number` (the style guide asks
   for names that read as words). "zero gets the wrong name" became "zero
   is called positive" (verdict word).
6. **Even and positive.** The second solution uses C#'s conditional
   operator `?:` for Python's one-line `if`/`else`, titled "a shorter way
   C# has" (as `storing-and-computing` titles its tuple swap), because no
   later PDP page is known to teach it. The first solution's note points
   to problem 17.
7. **And, or, not.** dewlab's cell uses two nested loops over
   `[True, False]`. The C# page has no loops yet, so the cell writes the
   four rows out, one line each. dewlab's sentence "It uses a loop ... For
   now, you only need its output" is gone with the loop.
8. **Half price**, 9. **A good password** (`len()` became `.Length`), and
   10. **A leap year** keep their tasks, as the course map says.
11. **Two opposites.** The second part now says "for two `bool` values",
    and the fold states both of De Morgan's laws, since the link to
    dewlab's logic page is gone.
12. **A condition that protects.** `ZeroDivisionError` became
    `DivideByZeroException`; the predict's third option is "It stops with
    an exception". The fold explains short-circuiting in order ("first
    side", "second side") and adds one paragraph on `&` and `|`, because a
    reader who types a single `&` gets code that compiles and does not
    short-circuit (probes `p-protect-single-and`, `p-single-and-or-same`).
13. **Opposite signs.** `a`/`b` became `first`/`second`. The second
    solution's title is "a shorter way", not "you'll meet later": it uses
    only what this page teaches.
14. **Near a hundred.** `abs()` became `Math.Abs`.
15. **One more path.** Secret messages: `char.IsUpper`/`IsLower` and `char`
    arithmetic with casts. Pixel art: the average is now an `int` division.
    For 200, 40 and 90 it is exactly 110, as in dewlab, and the note says
    why dropping the fraction cannot change the answer for a whole-number
    boundary (probe `p-brightness` checks every sum from 0 to 765). Both
    variants gained a first hint.
16. **A possible triangle.** `a`, `b`, `c` became `sideA`, `sideB`,
    `sideC`.
17. **An odd number below zero** (new, from `dividing-in-csharp`):
    `number % 2 == 1` prints `even` for -7, because `-7 % 2` is -1. A
    predict, a hint that asks the reader to print `-7 % 2`, and a fold with
    `!= 0`. This is the course map's "two or three problems from earlier
    pages".
18. **A semicolon too many** (new): `if (...);` compiles with warning
    CS0642 and the body always runs. The lesson promises this problem.
    Python cannot make this mistake, and C books warn about it.
19. **A path with no value** (new, `expect: CS0165`): a variable given a
    value on one path only. Two ways to make it compile, and the fact that
    the compiler checks paths, not values (probe `p-no-value-200`). The
    lesson's `dl-why` fold promises this problem.

### The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`, last section), so
no `.glossary.yaml` was written. Each dewlab entry is defined in the prose
where it first appears, in its C# form: comparison operators, if statement
(and *condition*, *body*), if-else, `else if` (for `elif`), Boolean
operators `&&`, `||`, `!` (for `and`, `or`, `not`, with the same
precedence rule), `char.IsUpper`/`char.IsLower` (for `.isupper()`,
`.islower()`), and selection. The number families entry goes with its
section. New terms defined on the lesson: operand, indentation, boundary,
sequence, repetition. On the practice page: conditional operator,
short-circuiting, warning, unassigned.

## What C# made different, in short

- Brackets round every condition, curly brackets round every body, and no
  semicolon after the condition (practice 18 shows the one that compiles).
- `<` works on `char` and not on `string` (CS0019). `==` works on both,
  and compares a string's text.
- A `char` compares as its number (`'a' == 97` is true); a `bool` is not a
  number (`0 == false` is CS0019), and an `if` needs a `bool` (CS0029 for
  `if (lives = 0)`).
- No chained comparisons: `10 < number < 20` is CS0019.
- A variable used after an `if` must be made before it, and every path
  must give it a value (CS0103, CS0165). Python has neither rule, and
  every task on the page depends on it.
- `%` keeps the sign, so `number % 2 == 1` misses negative odd numbers.
- `&&`, `||`, `!`, plus `&` and `|`, which do not short-circuit.
- No `in` for text: `"AEIOU".Contains(character)`.
- `?:` for Python's one-line conditional.

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. On the page, a compiler
message starts with `Program.cs`; the native check labels it with the cell
id. Line and column match.

| Number or claim | Source |
|---|---|
| True, True; Z is 90, a is 97 | lesson cell `which-comes-first-1` |
| CS0019 at line 1, column 19, strings, and its text | lesson cell `which-comes-first-2` |
| the six results of the operator table cell | lesson cell `comparisons-true-or-false-1` |
| `"abc" == "abc"` True, `"abc" == "ABC"` False; `1 == 1.0` and `'a' == 97` True | lesson cell `your-turn-1` |
| CS0019 at line 1, column 19, `int` and `bool`, and its text | lesson cell `comparisons-true-or-false-2` |
| with `?`, only the last line runs | lesson cell `if-statements-choosing-a-path-1` |
| 128 gives `#` | lesson cell `if-else-two-paths-1` |
| CS0103 when each body makes its own `pixel` | probe `m-each-body-own-variable` |
| CS0219 on the stubs | lesson cells `your-turn-2--secret-messages`, `your-turn-2--pixel-art` |
| keep, dark | solutions of `your-turn-2` in both worlds |
| 200 gives `#` | lesson cell `elif-multiple-paths-1` |
| with `>= 64` first, 200 gives `-` | probe `m-order-swapped` |
| small (for `e`); `?`, a digit and `.` reach the `else` | solution of `your-turn-3--secret-messages`; probe `m-other-characters` |
| right (for 70) | solution of `your-turn-3--pixel-art` |
| True, True, draw this pixel | lesson cells `boolean-operators-combining-conditions-1..3` |
| True for `O` (both solutions) | solutions of `your-turn-4--secret-messages` |
| False for (10, 50) | solution of `your-turn-4--pixel-art` |
| the challenge compiles; Q becomes T | probe `m-challenge` |
| practice 1: False; 66, 97, 32, True; CS0019 for `"10" == 10` and its text | practice cell `capitals-and-small-letters-1`; probes `p-char-numbers`, `p-text-and-number` |
| practice 2: CS0029 at line 2, column 5, and its text; `Lives left: 3` with `==` | practice cell `one-equals-sign-or-two-1`; probe `p-lives-fixed` |
| practice 3: CS0019, `bool` and `int`, and its text | probe `p-chain` |
| practice 4: two lines for 150, three for 200 | practice cell `three-ifs-instead-of-elif-1`; probe `p-three-ifs-200` |
| practice 5: zero; `>= 0` calls zero positive | solution of `positive-negative-or-zero-1`; probe `p-zero-positive` |
| practice 6: odd and negative (both solutions) | solutions of `even-and-positive-1` |
| practice 7: the truth table; False, True, False, False, False, True | practice cell `boolean-operators-1`; probe `p-truth-answers` |
| practice 8: True for 70; with `&&` nobody | solution of `half-price-1`; probe `p-half-price-and` |
| practice 9: True | solution of `a-good-password-1` |
| practice 10: 1900 False; 2024 and 2000 True | solution of `a-leap-year-1`; probe `p-leap-years` |
| practice 11: both laws, and `!(a > b)` is `a <= b` | probe `p-de-morgan` |
| practice 12: no; DivideByZeroException when swapped, and with `&`; `&` and `\|` agree with `&&` and `\|\|` | practice cell `a-condition-that-protects-1`; probes `p-protect-swapped`, `p-protect-single-and`, `p-single-and-or-same` |
| practice 13: the first solution False, the second True | solutions of `opposite-signs-1` |
| practice 14: `Math.Abs(-7)` is 7; True for 185 | probe `p-abs`; solution of `near-a-hundred-1` |
| practice 15: `q` becomes `t`; brightness 110, `.`; the fraction never matters | solutions of `one-more-path-1` in both worlds; probe `p-brightness` |
| practice 16: False for 1, 10, 2 | solution of `a-possible-triangle-1` |
| practice 17: even; `-7 % 2` is -1; `!= 0` says odd for 7 and -7 | practice cell `an-odd-number-below-zero-1`; probe `p-minus-seven` |
| practice 18: `#`; CS0642 at line 2, column 23, and its text; nothing for 100 without the semicolon | practice cell `a-semicolon-too-many-1`; probe `p-semicolon-deleted` |
| practice 19: CS0165 at line 7, column 19, and its text; `.` both ways; the error at 200 | practice cell `a-path-with-no-value-1`; probes `p-no-value-else`, `p-no-value-start`, `p-no-value-200` |
| brightness 0 to 255, 64 × 48 pixels, ages 16 and 65, 8 characters, the leap-year rule, 20 of 100 and 200 | the set-up of each task, carried over from dewlab |
| Boole in the 1840s | carried over from dewlab and `storing-and-computing`; not program output |

## Once the page UI exists

- **Stub warnings.** Six lesson stubs and eleven practice stubs show
  CS0219 on their first run, because the starting variables are not used
  until the reader's code uses them. The lesson says so at the first stub
  in each world, and the practice page in its intro. Check that the
  quieter warning style does not read as a failure. If the page can hide
  warnings on a cell the reader has not changed, both sentences can go.
- **Predicts on cells meant to fail.** `which-comes-first-2` has a choice
  predict on a cell with `expect: CS0019`. Check that the side-by-side view
  shows the compiler message as the result, and that the expected-failure
  styling does not answer the guess before the reader runs it.
- **A pipe in a table.** The operator table writes `a \|\| b` inside a
  code span so that the table parser does not split the cell. GitHub and
  markdown-it render `\|` there as `|`. Check what `web/lesson/parse.js`
  and its Markdown renderer do.
- **`dl-why` with HTML in its summary.** The fold's summary uses `<code>`
  tags, because Markdown is often not parsed inside an HTML `<summary>`.
  Check what dewsharp's renderer does with it.
- **Solutions and inputs for a stub whose answer matches its start.** In
  `your-turn-4--pixel-art`, `a-leap-year-1`, `a-possible-triangle-1`
  and the first solution of `opposite-signs-1`, the starting `false` is
  also the solution's answer for the given values (dewlab's values are
  kept, because they test a boundary or a trap). "Compare with a
  solution" will show no difference for an untouched stub. That is
  dewlab's behaviour too, but there the stub failed with a NameError.
- **Hints `after: 1 runs` on stubs.** Each "your turn" has a first hint
  after one run, because the stub runs and prints an empty line or
  `False`. Check that a run of the untouched stub counts.

## Open questions for a reviewer

1. **Forward links.** The page follows batch rule 3 and links forward to
   nothing. `equals-three-ways` is already drafted, and it links here. Add
   the link now, or wait for the batch-3 pass? The table under "Links"
   lists every place.
2. **`'a' == 97` in `your-turn-1`.** It replaces `0 == False` as the
   "surprise" line. It is true, and it links to casts, but a reader might
   take it as licence to compare letters with numbers. Keep it, or use a
   plainer sixth line?
3. **Two CS0019 cells on the lesson.** `"A" < "B"` and `0 == false` fail
   with the same code for different reasons. Is one enough? The course map
   asks for both points; the second could become a sentence with the
   message in a `console` fence and no cell.
4. **The `dl-why` fold on `string pixel;`.** It teaches, in two
   sentences, what `a-total-that-starts-again` teaches as its closer look.
   Too early, or needed here because every task on this page and its
   practice page puts a variable before an `if`?
5. **Nineteen practice problems.** dewlab has eighteen; this has sixteen
   of them and three new. Problems 18 and 19 are the ones most specific to
   C#; if the page must be shorter, 11 ("Two opposites") and 14 ("Near a
   hundred") are the easiest to lose.
6. **"Some books about Java warn that `==` does not compare the text".**
   The course map asks for this sentence. It names a language the reader
   has probably never used. Keep, or say only "`==` compares the text"?
7. **Braces on their own lines make the else-if cell 19 lines**, past the
   style guide's fifteen. It is one idea, and braces are never left out on
   this page. Is that the right trade, or should a single-line body drop
   its braces once the reader has seen them?
8. **`"left"` and `"right"` as values** in `your-turn-3--pixel-art`. They
   are directions, not verdicts, but a search for the verdict word *right*
   will find them.

## Probes

Each cell below checks a claim in the prose that no lesson cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.

```csharp exec
id: m-order-swapped
// Tutorial, "What happens" fold: with >= 64 first, 200 becomes -.
int brightness = 200;
string pixel;
if (brightness >= 64)
{
    pixel = "-";
}
else if (brightness >= 128)
{
    pixel = "+";
}
else if (brightness >= 192)
{
    pixel = "#";
}
else
{
    pixel = ".";
}
Console.WriteLine(pixel);
```

```csharp exec
id: m-each-body-own-variable
expect: CS0103
// Tutorial, dl-why fold: a variable made in each body does not exist after it.
int brightness = 128;
if (brightness >= 128)
{
    string pixel = "#";
}
else
{
    string pixel = ".";
}
Console.WriteLine(pixel);
```

```csharp exec
id: m-other-characters
// Tutorial, your-turn-3--secret-messages: ?, a digit and a full stop reach the else.
string Kind(char character)
{
    if (char.IsUpper(character)) return "capital";
    else if (char.IsLower(character)) return "small";
    else if (character == ' ') return "space";
    else return "other";
}
Console.WriteLine(Kind('?'));
Console.WriteLine(Kind('7'));
Console.WriteLine(Kind('.'));
Console.WriteLine(Kind('E'));
Console.WriteLine(Kind(' '));
```

```csharp exec
id: m-boolean-questions
// Tutorial: "What changes if character is 'q' in the first cell, or '!' in the second?"
char first = 'q';
Console.WriteLine(first >= 'A' && first <= 'Z');
char second = '!';
Console.WriteLine(second == ' ' || second == '.');
```

```csharp exec
id: m-challenge
// Tutorial, the challenge's starter code as it is, and what it gives for Z.
char character = 'Q';
int shift = 3;
int position = character - 'A';
int moved = (position + shift) % 26;
Console.WriteLine((char)(moved + 'A'));
char last = 'Z';
Console.WriteLine((char)((last - 'A' + shift) % 26 + 'A'));
```

```csharp exec
id: m-challenge-answer
// Tutorial, a possible answer to the challenge, for a reviewer.
char[] tries = { 'Q', 'Z', ' ', '?' };
foreach (char character in tries)
{
    int shift = 3;
    char moved = character;
    if (character >= 'A' && character <= 'Z')
    {
        moved = (char)((character - 'A' + shift) % 26 + 'A');
    }
    Console.WriteLine($"'{character}' becomes '{moved}'");
}
```

```csharp exec
id: p-char-numbers
// Practice 1: the numbers in the answer fold.
Console.WriteLine((int)'B');
Console.WriteLine((int)'a');
Console.WriteLine('a' - 'A');
Console.WriteLine(10 == 10.0);
```

```csharp exec
id: p-text-and-number
expect: CS0019
// Practice 1: "10" == 10 does not compile.
Console.WriteLine("10" == 10);
```

```csharp exec
id: p-lives-fixed
// Practice 2: with ==, the cell prints Lives left: 3.
int lives = 3;
if (lives == 0)
{
    Console.WriteLine("Game over");
}
Console.WriteLine($"Lives left: {lives}");
```

```csharp exec
id: p-chain
expect: CS0019
// Practice 3: the maths form does not compile.
int number = 15;
bool between = 10 < number < 20;
Console.WriteLine(between);
```

```csharp exec
id: p-three-ifs-200
// Practice 4: three lines for 200.
int brightness = 200;
if (brightness >= 64)
{
    Console.WriteLine("-");
}
if (brightness >= 128)
{
    Console.WriteLine("+");
}
if (brightness >= 192)
{
    Console.WriteLine("#");
}
```

```csharp exec
id: p-zero-positive
// Practice 5: with >= 0 for positive, zero is called positive.
int number = 0;
string sign;
if (number >= 0)
{
    sign = "positive";
}
else
{
    sign = "negative";
}
Console.WriteLine(sign);
```

```csharp exec
id: p-truth-answers
// Practice 7: the six answers in the fold.
Console.WriteLine(true && false);
Console.WriteLine(true || false);
Console.WriteLine(!true);
Console.WriteLine(!(5 > 3));
Console.WriteLine((5 > 3) && (2 > 4));
Console.WriteLine((5 > 3) || (2 > 4));
```

```csharp exec
id: p-half-price-and
// Practice 8: with && nobody gets half price (every age from 0 to 120).
bool anyone = false;
for (int age = 0; age <= 120; age++)
{
    if (age < 16 && age > 65) anyone = true;
}
Console.WriteLine(anyone);
```

```csharp exec
id: p-leap-years
// Practice 10: 2024 is, 1900 is not, 2000 is; and the years it invites.
bool IsLeap(int year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
foreach (int year in new[] { 2024, 1900, 2000, 2023, 1600 })
{
    Console.WriteLine($"{year}: {IsLeap(year)}");
}
```

```csharp exec
id: p-de-morgan
// Practice 11: both of De Morgan's laws, and !(a > b) is a <= b, for every case tried.
bool allSame = true;
foreach (bool a in new[] { true, false })
{
    foreach (bool b in new[] { true, false })
    {
        if (!(a && b) != (!a || !b)) allSame = false;
        if (!(a || b) != (!a && !b)) allSame = false;
    }
}
for (int a = -3; a <= 3; a++)
{
    for (int b = -3; b <= 3; b++)
    {
        if (!(a > b) != (a <= b)) allSame = false;
    }
}
Console.WriteLine(allSame);
```

```csharp exec
id: p-protect-swapped
expect: exception
// Practice 12: swap the two conditions, and it stops with DivideByZeroException.
int number = 0;
if (10 / number > 1 && number != 0)
{
    Console.WriteLine("yes");
}
else
{
    Console.WriteLine("no");
}
```

```csharp exec
id: p-protect-single-and
expect: exception
// Practice 12: with & in place of &&, it stops with the same exception.
int number = 0;
if (number != 0 & 10 / number > 1)
{
    Console.WriteLine("yes");
}
else
{
    Console.WriteLine("no");
}
```

```csharp exec
id: p-single-and-or-same
// Practice 12: & and | give the same answers as && and || for two bool values.
bool same = true;
foreach (bool a in new[] { true, false })
{
    foreach (bool b in new[] { true, false })
    {
        if ((a & b) != (a && b) || (a | b) != (a || b)) same = false;
    }
}
Console.WriteLine(same);
```

```csharp exec
id: p-abs
// Practice 14: Math.Abs(-7) is 7.
Console.WriteLine(Math.Abs(-7));
```

```csharp exec
id: p-brightness
// Practice 15, pixel-art: the brightness is 110; and dropping the fraction never
// changes which side of 128 an average is on, for every sum from 0 to 765.
int red = 200;
int green = 40;
int blue = 90;
Console.WriteLine((red + green + blue) / 3);
bool alwaysSame = true;
for (int sum = 0; sum <= 765; sum++)
{
    if ((sum / 3 >= 128) != (sum / 3.0 >= 128)) alwaysSame = false;
}
Console.WriteLine(alwaysSame);
```

```csharp exec
id: p-minus-seven
// Practice 17: -7 % 2 is -1, and != 0 says odd for 7 and for -7.
Console.WriteLine(-7 % 2);
Console.WriteLine(7 % 2);
foreach (int number in new[] { 7, -7 })
{
    Console.WriteLine(number % 2 != 0 ? "odd" : "even");
}
```

```csharp exec
id: p-semicolon-deleted
// Practice 18: without the semicolon, nothing prints for 100 (only the marker line).
int brightness = 100;
if (brightness >= 192)
{
    Console.WriteLine("#");
}
Console.WriteLine("(end)");
```

```csharp exec
id: p-no-value-else
// Practice 19, the first way: an else.
int brightness = 100;
string pixel;
if (brightness >= 128)
{
    pixel = "#";
}
else
{
    pixel = ".";
}
Console.WriteLine(pixel);
```

```csharp exec
id: p-no-value-start
// Practice 19, the second way: a value where it is made.
int brightness = 100;
string pixel = ".";
if (brightness >= 128)
{
    pixel = "#";
}
Console.WriteLine(pixel);
```

```csharp exec
id: p-no-value-200
expect: CS0165
// Practice 19: the error is there even when the brightness is 200.
int brightness = 200;
string pixel;
if (brightness >= 128)
{
    pixel = "#";
}
Console.WriteLine(pixel);
```
