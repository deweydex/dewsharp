# making-decisions: notes for a reviewer

Ported from dewlab `tutorials/making-decisions/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file. The brief is the
course map's entry (`planning/COURSE_MAP.md`, PDP row 7): action *adapt*,
shape *tutorial*, size M, batch 2, depends on `storing-and-computing`. No
earlier draft of this page existed; both pages were written from scratch
by the porter.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/making-decisions/making-decisions.md` and
`making-decisions-practice.md`; their recorded outputs are the two
`*.outputs.json` files beside them, written by the browser checker; and
this file was the draft's `NOTES.md`. The three `*.native.json` files were
deleted: the browser checker's outputs files replace them. "What was done
when it moved", just below, says what changed in the move. The rest of this
file is the porter's, brought up to date (what the move made stale is
marked *(stale)* or rewritten), with the porter's questions settled where
the playbook, the course map, the style guide or the exemplars answer
them. What none of them answers is under "Open", at the end of the
questions.

Files:

- `making-decisions.md`: the lesson, version `2026.09.28.1`. 17 exec
  cells, 6 of them in world variants (14 on show in either world); 3
  predicts, 8 hints, 7 solutions, 6 `inputs` blocks, 1 answer fold, 1
  "why" fold, 2 cells meant not to compile, 1 challenge.
- `making-decisions-practice.md`: the practice page, version
  `2026.09.28.1`, 19 problems. 23 exec cells, 2 of them in world variants
  (22 on show in either world); 3 predicts, 5 hints, 18 solutions, 11
  `inputs` blocks, 11 answer folds, 5 cells meant to fail (four that do
  not compile, one that stops with an exception).
- `making-decisions.outputs.json`, `making-decisions-practice.outputs.json`:
  what the browser checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/making-decisions.md`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write making-decisions`
  ran every cell, solution and `inputs` row of both pages in the real
  engine, in both worlds. On the draft as it came, every output, value,
  compiler message, line and column was the same as the native check's.
  Nothing differed in culture, number formatting, `Console`, trimmed APIs
  or exceptions. The porter's probes (at the end of this file) were run in
  the browser too, in a scratch lesson (`node tools/check-lessons.mjs
  --lessons <scratch>/lessons --write`), with seven more for claims the
  prose keeps. Every one printed what the prose says (see "Probe cells").
  The one difference from the native report is that the browser also shows
  the two CS0219 warnings on `m-each-body-own-variable`, beside its CS0103;
  that probe backs no quoted message now.
- **Starters that warned.** Six lesson starters and eleven practice
  starters made variables they did not use, so an untouched Run showed
  CS0219, and the prose explained the warning twice in the lesson and once
  in the practice intro. The playbook's pitfall says a starter's variables
  must be used, as in `first-steps`' `your-turn-2`, and
  `storing-and-computing` settled it the same way when it moved. Each
  starter now prints a line that uses its given values, in the
  `first-steps` shape (`$"{letters} letters: {blocks} blocks, ..."`), and
  each solution prints the same line: for example `'e': small`,
  `Column 6: dark`, `(10, 50) is on the picture: False`,
  `-7: odd and negative`, `Sides 1, 10 and 2: False`,
  `rgb(200, 40, 90): .`. The three paragraphs about CS0219 went. No cell on
  either page warns now, except `a-semicolon-too-many-1`, whose CS0642 is
  the point of the problem. The `inputs` blocks are unchanged, so "Compare
  with a solution" compares the same values as before.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell or a
  solution, or no longer quoted:
  - Lesson, the "Why is `pixel` made before the `if`?" fold: the CS0103
    code and message (probe only) went. The fold now says the compiler
    would find a name it does not know there, in the style guide's words,
    and asks "Can you try it?".
  - Lesson, the "What happens" fold under the else-if cell: "It would
    become `-`" (probe only) became the reason, without the character: C#
    checks `>= 64` first, runs its body, and never reaches the check for
    `#`; then "Can you move the checks in the cell, and see?".
  - Lesson, `your-turn-2--secret-messages`: "at the moment, the question
    mark would be shifted" became "Which path does the question mark
    take?".
  - Practice 1: the cell now prints four lines, as `first-steps-practice`'s
    `which-comes-first-1` does: `'a' < 'B'`, then `a is stored as 97, and
    B as 66`, `'a' - 'A' is 32` and `10 == 10.0 is True`, with the predict
    on the first line. The later lines carry labels so that a guess of
    `True` cannot match one of them (decision 37). `"10" == 10` is a new
    cell, `capitals-and-small-letters-2` (`expect: CS0019`), said to be
    meant to fail before it runs, with its message in a fold.
  - Practice 2: "With `lives == 0`, the cell prints `Lives left: 3`" became
    a `solution` block (recorded), and the question gained "Then can you
    make it compile? It takes one change.", as `equals-three-ways` did.
  - Practice 3: the chained comparison is a new cell, `strictly-between-2`
    (`expect: CS0019`), so its message is recorded:
    `Program.cs(2,16): error CS0019: Operator '<' cannot be applied to
    operands of type 'bool' and 'int'`.
  - Practice 4: "and three for 200" (probe only) went from the fold. The
    question now asks the reader to say what 200 prints before trying it.
  - Practice 7: the six answers (probe only) are now printed by a new cell,
    `boolean-operators-2`, in the lesson's `// I think:` shape. The fold
    keeps the six answers, which are now recorded.
  - Practice 12: "Swap the two conditions, and the program stops with a
    `DivideByZeroException`" is a new cell, `a-condition-that-protects-2`
    (`expect: exception`), said before it runs to be meant to stop. Its
    fold quotes the recorded type and message, *Attempted to divide by
    zero.*, and links to *Exceptions*. The `&` claim no longer quotes an
    exception: "So `&` in the first cell would not protect the division
    either."
  - Practice 14: "`Math.Abs(-7)` is 7" (probe only) became a definition
    in words: "how far the number is from 0". The note's "saves two
    comparisons" (dewlab's; one `Math.Abs` test replaces two comparisons)
    became "It replaces two comparisons for each target, one for each side
    of it."
  - Practice 15, pixel art: "The brightness is 110" was printed by no cell.
    The solution now prints `Brightness: 110` before its result line.
  - Practice 17: the answer fold became a `solution` block, whose first
    line prints the remainder, as the hint suggests, so `-1` and `odd` are
    recorded. "That is `true` for 7" became "Try 7 too."
  - Practice 18: "Delete it, and the cell prints nothing for 100" became a
    `solution` block without the semicolon, recorded with no output, and
    the question gained "Then can you make it print nothing for 100? It
    takes one change."
  - Practice 19: "Both print `.` for 100" became two `solution` blocks,
    *with an else* and *with a value where it is made*, both recorded as
    `.`. The problem already asked for two ways. "The error is there even
    when the brightness is 200" became a question: "Does the error go away
    when the brightness is 200? Try it."
- **Cells meant to fail, and their predicts.** The playbook's checklist
  wants the prose to say that a cell is meant to fail before the reader
  runs it; the porter put that sentence after `which-comes-first-2`, so as
  not to answer its predict. It now has `storing-and-computing`'s sentence
  before the cell, "Whatever happens when you run it is meant to happen,
  and nothing is broken", which reassures without answering. The practice
  intro now has the exemplars' line: some cells are meant not to compile,
  or to stop with an exception, and "nothing is broken: the message is
  part of the answer".
- **Links** (decision 32, and the list of pages moving in this round). The
  porter linked forward to nothing. Every `lesson:` link now goes to a page
  in `lessons/` or one on the list, with that page's short title:
  [The equals sign] (lesson, twice; practice 2), [Loops]
  (`repeating-yourself`), [Exceptions] (`reading-an-error-message`, practice
  12), [Dividing] (practice 17), and "the practice page for Arrays and
  lists" (`lists-and-sequences-practice`). The lesson itself does not use
  `Contains` on a list; its practice page's problem 12, "Once each", does,
  and the porter of `lists-and-sequences` flagged this sentence. *Reading
  input* is not on the list, so it is named in italics. The checker
  reports the links to `repeating-yourself` and
  `lists-and-sequences-practice` until those pages land.
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in
  `storing-and-computing`'s words. It ends with the exemplars' "Next, the
  practice page …", and names [The equals sign] as the page after it.
- **`your-turn-3--pixel-art`.** The values are now `"left of the
  picture"`, `"on the picture"` and `"right of the picture"` (question 8
  below): with the starter's new line, a bare `"right"` would print as
  `Column 70: right`.
- **Plain words.** "lets 1, 10, 2 through" (practice 16) became "accepts
  1, 10 and 2". Two long prose lines were rewrapped.
- **Where to read more.** Both Microsoft Learn pages answered HTTP 200 on
  28 September 2026, with the titles the page gives. YouTube's oEmbed gives
  the title *Leap Years: we can do better* by Stand-up Maths. The length,
  "About twelve minutes", came from dewlab and could not be checked from
  here (the watch page and the TubeAlfred lookup gave no length), so it
  went. The year, 2016, is dewlab's and is not checked either.
- **The page, looked at.** Both pages were opened in headless Chromium on
  `npm run serve -- --isolate`, in both worlds, at 390 and 900 pixels
  wide: no errors in the console, no sideways scroll, every cell labelled
  PROGRAM (`Program.cs`). The cells meant to fail, run on the page, showed
  what the checker recorded: "Did not compile, so nothing ran." with each
  message, "Stopped with an exception on line 2 of Program.cs." with
  `System.DivideByZeroException: Attempted to divide by zero.`, and the
  CS0642 warning above `#`. See "Page behaviour" below for the porter's UI
  questions.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `making-decisions: "Decisions: if, else if and else"` under `planned:`.
  The playbook's checklist says to delete it when the lesson moves; this
  move was told not to edit the course files. And
  `storing-and-computing-practice`, problem 10, "Past the end" (pixel art),
says
  "[Decisions](lesson:making-decisions) shows how to stop at 255 instead".
  This page teaches `if` and `else`, which is what stopping at 255 needs,
  but it never stops a value at 255 itself. That sentence is the other
  page's to change ("shows how" could become "has what you need").

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
- `version:` was `2026.09.27.1`; it is `2026.09.28.1` since the move.
- The practice page has `from: making-decisions-practice` (dewlab's id for
  it, as the `storing-and-computing` draft does) and
  `practice_for: making-decisions`. Its title is "Decisions: practice",
  in the pattern of "Variables, types and text: practice".

## What changed from dewlab, and why (the porter's notes)

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

### Links *(stale)*

The porter followed the course map's batch rule 3 and linked forward to
nothing, with a table of the plain-text places to link later. The move
settled all of them (see "Links" under "What was done when it moved"):
`equals-three-ways`, `repeating-yourself` and `lists-and-sequences-practice`
are links now, and *Reading input* is in italics.

dewlab's "Looking back" also sent the reader to `reading-an-error-message`
before loops. That sentence is gone: in C# the page after this one in the
map is `equals-three-ways`, and `reading-an-error-message` is about
exceptions. Practice 12 now links to it, for the one exception on these
pages. Practice 11 linked to dewlab's `logic-and-truth`, which no dewsharp
course lists. The link is gone; the fold states both of De Morgan's laws
instead.

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
cell, so that it does not answer the guess before the run. *(Since the
move: a sentence before the cell says whatever happens is meant to
happen; see "Cells meant to fail" above.)* The message is read
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
brackets exists only inside them (CS0103 if each body makes its own; since
the move the fold no longer quotes the code, and asks the reader to try
it), and C# checks that every path gives it a value (practice 19, CS0165). This is
new to readers from Python, and every task below depends on it. The
course map gives scope its closer look on `a-total-that-starts-again`; the
fold names it in two sentences and does not use the word *scope*.

**Your turn 2** (both worlds). The stubs declare `string action = "";` and
`string shade = "";`, as the course map says, so the cell compiles and
the `inputs` row has something to read. The prose says why. *(Stale: the
porter's stubs showed CS0219 and the prose explained it; since the move
each stub prints its given value too, and neither warns.)* Each gains a second hint, `after: 1 errors`, for the most likely
C# mistake: writing `string action = "keep";` inside the body, which is
CS0136 (probed in a scratch run: *A local or parameter named 'action'
cannot be declared in this scope...*). The hint asks a question and does
not quote the message, because the reader could also meet CS0128 or
another one.

**Else if.** "Elif: multiple paths" became "Else if: many paths". The cell
keeps its dewlab id, `elif-multiple-paths-1`, because the task is the same
(course map: a cell that keeps its task keeps its dewlab id). A sentence
after the cell says that 200 prints `#`. *Boundary* is defined. *(Since the
move, the "What happens" fold gives the reason without the character.)* "Mistakes
often hide at a boundary" became "Mistakes are often at a boundary"
(idiom). "the biggest threshold goes first" became "the check with the
largest number goes first".

**Your turn 3.** Secret messages: `.isupper()`/`.islower()` became
`char.IsUpper`/`char.IsLower`, introduced as methods in one sentence.
Pixel art: the variable `where` became `place`, because `where` is a C#
contextual keyword (it compiles as a name, but the editor may colour it as
a keyword, and it reads oddly to anyone who later meets LINQ). *(Since the
move, its values are "left of the picture" and "right of the picture".)*

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
is tried and does not compile. The second secret-messages solution's
pointer to lists now links to the practice page for *Arrays and lists*.

**Classifying numbers** and `your-turn-6` are gone (course map: MIT-1.1,
maths that only the integrated course needs). dewlab's glossary entry for
the number families goes with them.

**Looking back.** The question about order is the same. The challenge is
in `char` (probes `m-challenge`, `m-challenge-answer`: Q becomes T, Z
becomes C, and a possible answer leaves ' ' and '?' as they are). The
sequence/selection/repetition paragraph stays, with *repetition* now
defined, and gains one sentence on `switch`, which the course map places
on `reading-input` (the PDP descriptor's "branching with many
conditions"). A line points to the practice page. *(Since the move: links
to [Loops] and [The equals sign], *Reading input* in italics, and a line
on Visual Studio.)*

**Where to read more.** The two Khan Academy videos are Python and are
replaced by two Microsoft Learn reference pages (*if and switch
statements*, *Boolean logical operators*); both returned HTTP 200 on 27
September 2026, and their titles were checked. The Stand-up Maths video
stays: YouTube's oEmbed endpoint confirmed the title *Leap Years: we can
do better* by Stand-up Maths. The page itself answered 429, so the length
("about twelve minutes") was carried over from dewlab. *(Since the move:
the length went, because it could not be checked.)*

### The practice page

dewlab's numbering is kept up to 15. Two problems go (16 "Which families"
and 17 "Is every float rational", maths, as the course map says), so
dewlab's 18 becomes 16. Three new problems follow, 17 to 19. The intro
gained one sentence on the CS0219 warning that most starting cells showed.
*(Stale: since the move no starter warns, and the intro has the exemplars'
"nothing is broken" line instead. Four cells were added in the move,
without new problems: `capitals-and-small-letters-2`, `strictly-between-2`,
`boolean-operators-2` and `a-condition-that-protects-2`. See "What was
done when it moved".)*

1. **Capitals and small letters.** `"Apple" < "apple"` does not compile in
   C#, and the opening of the lesson already shows that. The cell is now
   `'a' < 'B'` (False: small a comes after capital B, though a comes
   before b in the alphabet), with the predict's notes swapped to fit.
   The things to try are `'a' - 'A'` (32), `10 == 10.0` and `"10" == 10`,
   which does not compile in C# (CS0019), where Python said False.
   dewlab's sentence "a simple sort puts Zoe before adam" is gone: C#'s
   `Array.Sort` of strings uses the culture's order, so it would not be
   true here. *(Since the move, the cell prints the three things to try
   that compile, and `"10" == 10` has its own cell meant to fail.)*
2. **One equals sign or two** became a cell meant to fail with CS0029, as
   the course map says. The cell prints `lives` after the `if` so that
   the only message is the error (without that line there is also a
   CS0219 warning). The answer reads the message, says an assignment has a
   value (the same words as `equals-three-ways`), and says what the line
   does in C. It overlaps with `equals-three-ways`, which comes next in
   PDP; the practice problem is the short version. *(Since the move it has
   a solution with `==`, and links to [The equals sign].)*
3. **Strictly between.** One solution with `&&`. The second solution
   (Python's chained comparison) became an invitation to try
   `10 < number < 20` and read the compiler's CS0019 (probe `p-chain`).
   *(Since the move that is a cell meant to fail, `strictly-between-2`.)*
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
   now, you only need its output" is gone with the loop. *(Since the move,
   the six expressions to guess are a second cell, `boolean-operators-2`.)*
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
    *(Since the move, the swapped condition is a cell meant to stop with an
    exception, `a-condition-that-protects-2`, with its own fold.)*
13. **Opposite signs.** `a`/`b` became `first`/`second`. The second
    solution's title is "a shorter way", not "you'll meet later": it uses
    only what this page teaches.
14. **Near a hundred.** `abs()` became `Math.Abs`. *(Since the move, it is
    defined in words, without `Math.Abs(-7)`.)*
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
    `!= 0` *(since the move, a solution that prints the remainder first)*. This is the course map's "two or three problems from earlier
    pages".
18. **A semicolon too many** (new): `if (...);` compiles with warning
    CS0642 and the body always runs. The lesson promises this problem.
    *(Since the move it has a solution without the semicolon.)*
    Python cannot make this mistake, and C books warn about it.
19. **A path with no value** (new, `expect: CS0165`): a variable given a
    value on one path only. Two ways to make it compile, and the fact that
    the compiler checks paths, not values (probe `p-no-value-200`). The
    lesson's `dl-why` fold promises this problem. *(Since the move the two
    ways are two solutions, and 200 is a question.)*

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

## Where each number and message in the prose comes from

Every number, printed value and compiler or exception message that the
prose, the folds and the solution notes quote is in
`making-decisions.outputs.json` or `making-decisions-practice.outputs.json`
(browser checker, version `2026.09.28.1`). A cell below a world's cells is
recorded once per world, as `<cell id>@<world>`, with the same result in
both.

| Number, value or message | Recorded by |
|---|---|
| True, True; Z is 90, a is 97 | lesson `which-comes-first-1` |
| CS0019 at (1,19), `string` and `string` | lesson `which-comes-first-2` |
| `"abc" == "abc"` True, `"abc" == "ABC"` False; `1 == 1.0` and `'a' == 97` True | lesson `your-turn-1` |
| CS0019 at (1,19), `int` and `bool` | lesson `comparisons-true-or-false-2` |
| with `?`, only the last line runs | lesson `if-statements-choosing-a-path-1` |
| 128 gives `#` | lesson `if-else-two-paths-1` |
| 200 gives `#` | lesson `elif-multiple-paths-1` |
| `onPicture` is False for (10, 50) | solution of `your-turn-4--pixel-art` |
| practice 1: False; 97 and 66; 32; `10 == 10.0` True | practice `capitals-and-small-letters-1` |
| practice 1: CS0019 at (1,19), `string` and `int` | practice `capitals-and-small-letters-2` |
| practice 2: CS0029 at (2,5); `Lives left: 3` with `==` | practice `one-equals-sign-or-two-1` and its solution |
| practice 3: CS0019 at (2,16), `bool` and `int` | practice `strictly-between-2` |
| practice 4: two lines for 150, `-` and `+` | practice `three-ifs-instead-of-elif-1` |
| practice 7: False, True, False, False, False, True | practice `boolean-operators-2` |
| practice 12: `no`; `DivideByZeroException`, *Attempted to divide by zero.*, nothing printed | practice `a-condition-that-protects-1`, `a-condition-that-protects-2` |
| practice 13: the first solution False, the second True | solutions of `opposite-signs-1` |
| practice 15: `q` moves to `t`; brightness 110, `.` | solutions of `one-more-path-1` in both worlds |
| practice 17: `even`; `-7 % 2` is -1; `odd` with `!= 0` | practice `an-odd-number-below-zero-1` and its solution |
| practice 18: `#`; CS0642 at (2,23); nothing printed without the semicolon | practice `a-semicolon-too-many-1` and its solution |
| practice 19: CS0165 at (7,19); `.` both ways | practice `a-path-with-no-value-1` and its two solutions |

Claims that quote no number or output, and that the prose keeps, are
backed by the probes below, run in the browser: a question mark, a digit
and a full stop reach the `else` (`m-other-characters`); with `>= 64`
first, the check for `#` is never reached (`m-order-swapped`); the
challenge's starter compiles (also in the outputs file, under
`challenges`); `>= 0` puts zero on the positive path (`p-zero-positive`);
`&&` gives half price to nobody (`p-half-price-and`); De Morgan's laws and
`!(a > b)` is `a <= b` (`p-de-morgan`); `&` does not protect the division
(`p-protect-single-and`); a whole-number average never crosses 128
differently from the exact one (`p-brightness`); one comparison accepts
1, 10 and 2 (`x-triangle-one-check`); the compiler checks paths, not
values (`p-no-value-200`).

The numbers that set up each task (brightness 0 to 255, 64 × 48 pixels,
ages 16 and 65, 8 characters, the leap-year rule, within 20 of 100 and 200,
the columns 0 to 63 and the boundaries to try) are the task's own, from
dewlab. Boole in the 1840s is history, carried over from dewlab.

## Page behaviour, checked when it moved

The porter listed these for "once the page UI exists". Each was looked at
in headless Chromium on the real server.

- **Stub warnings.** Settled by the playbook: no starter warns now (see
  "Starters that warned").
- **Predicts on cells meant to fail.** Before a run, `which-comes-first-2`
  shows no error marks in the editor and no status line, so nothing
  answers the guess. After the run, the status says "Did not compile, so
  nothing ran." and the message follows, as the prose quotes it.
- **A pipe in a table.** The Boolean operators table renders its middle row
  as `a || b`, in one cell.
- **`dl-why` with HTML in its summary.** The summary renders "Why is
  `pixel` made before the `if`?" with both words as code.
- **Solutions and inputs for a stub whose answer matches its start.**
  Still true, and left as dewlab has it: in `your-turn-4--pixel-art`,
  `a-leap-year-1`, `a-possible-triangle-1` and the first solution of
  `opposite-signs-1`, the starting `false` is also the solution's value for
  the given numbers, so "Compare with a solution" shows no difference for
  an untouched starter. Each task's prose or note invites other values.
- **Hints `after: 1 runs` on stubs.** One Run of the untouched
  `your-turn-2--pixel-art` shows its first hint; the `after: 1 errors` hint
  stays hidden.

## The porter's questions, and what was decided

1. **Forward links.** *Decided by decision 32 and the list of pages moving
   in this round:* every place the porter listed is now a link or, for
   *Reading input*, a short title in italics (see "Links" under "What was
   done when it moved").
2. **`'a' == 97` in `your-turn-1`.** Open (below).
3. **Two CS0019 cells on the lesson.** *Decided: both stay as cells.* The
   course map asks for both points ("`"A" < "B"` does not compile (CS0019),
   a predict" and "`0 == false` does not compile"). Turning the second into
   a sentence with the message in a `console` fence would quote a message
   no cell prints, which decision 29 rules out, and the style guide prefers
   a cell that fails on purpose to a paragraph about it (`#how-a-page-teaches`,
   "Mistakes on purpose"). They fail for different reasons, and the prose
   after each says which.
4. **The `dl-why` fold on `string pixel;`.** *Decided: it stays.* The format
   has `dl-why` for exactly this, a "Why this way?" fold
   (`docs/LESSON_FORMAT.md`, "Everything else"), and the style guide asks
   for a term to be explained where it is first used. Every task on both
   pages puts a variable before an `if`, so this is the first use. The fold
   does not name *scope*, which stays for `a-total-that-starts-again`.
5. **Nineteen practice problems.** *Decided: all nineteen stay.* The course
   map's entry names the only two dewlab problems that go ("Which
   families", "Is every float rational") and says four more stay; nothing
   in it asks for a shorter page. Problem 17 is the course map's "problem
   from an earlier page", and 18 and 19 are the two C# mistakes that the
   lesson promises. The move added four cells to existing problems, not new
   problems.
6. **The sentence about Java books.** *Decided by the course map:* "`==` on
   strings compares the text, and a sentence says so (Java books warn
   against it)." It stays.
7. **Braces on their own lines make the else-if cell 19 lines.** *Decided
   by the style guide:* `#code` says "Put each brace on its own line, as
   Visual Studio does", with no exception for a one-line body. Its limit of
   fifteen lines is there so that a cell with two ideas becomes two cells,
   and this cell has one idea, four paths of one `if`. It stays at 19.
8. **`"left"` and `"right"` as values.** *Decided by the style guide
   (`#voice`: no verdicts; plain words for a reader in a second
   language):* the values are now `"left of the picture"` and `"right of
   the picture"`. Since the move the starter prints `Column 70: ...`, and
   `Column 70: right` reads like a verdict on the reader's code.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **`'a' == 97` in `your-turn-1`** (question 2). It replaced `0 == False`
  as the sixth guess. It is C#'s own surprise, and it follows from the
  page's opening (a `char` is compared by its number), but a reader might
  take it as permission to compare letters with numbers. The course map
  says only that `0 == False` goes or becomes a line that does not compile.
  Keep it, or use a plainer sixth line?
- **The conditional operator's title.** Practice 6's second solution uses
  `?:`, titled "a shorter way C# has". The course map's two tiers are
  "with what you've met so far" and "a shorter way you'll meet later", and
  no page in the course map teaches `?:`. Is a third title acceptable, or
  should the solution go, or should a later page (*Reading input*, say)
  teach `?:` so that the second tier fits?
- **The video's length and year.** *Leap Years: we can do better* (Stand-up
  Maths) is confirmed by title and channel. Its length could not be
  checked from here, so "About twelve minutes" went; the year, 2016, is
  dewlab's and not checked. Either can be added back once someone has
  looked.

## Probe cells

Each cell below checked a claim in the draft's prose that no cell on the
pages printed. None of them is part of either page, and the cells with
`expect:` fail on purpose. The porter ran them with the native check. When
the page moved, they were run in the browser: copy this section into a
scratch lesson (`<scratch>/lessons/md-probes/md-probes.md`, with a
`title:` and a `version:`), and run `node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`. All 33 did what their comments say. The
browser also reported two CS0219 warnings on `m-each-body-own-variable`.
Several claims they backed are now printed by a cell on the page, or no
longer made (see "What was done when it moved"); the probes stay as the
record. The last seven, `x-...`, were added in the move for claims the
prose keeps.

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

```csharp exec
id: x-shift-other-characters
// Lesson, your-turn-2 secret messages: a letter and a question mark take the "shift" path.
string Action(char character)
{
    string action = "";
    if (character == ' ')
    {
        action = "keep";
    }
    else
    {
        action = "shift";
    }
    return action;
}
Console.WriteLine(Action('Q'));
Console.WriteLine(Action('?'));
Console.WriteLine(Action(' '));
```

```csharp exec
id: x-shade-seven
// Lesson, your-turn-2 pixel art note: x = 7 is light.
int x = 7;
string shade = "";
if (x % 2 == 0)
{
    shade = "dark";
}
else
{
    shade = "light";
}
Console.WriteLine(shade);
```

```csharp exec
id: x-place-boundaries
// Lesson, your-turn-3 pixel art hint: the boundaries -1, 0, 63 and 64.
string Place(int x)
{
    if (x < 0) return "left of the picture";
    else if (x < 64) return "on the picture";
    else return "right of the picture";
}
Console.WriteLine(Place(-1));
Console.WriteLine(Place(0));
Console.WriteLine(Place(63));
Console.WriteLine(Place(64));
```

```csharp exec
id: x-elif-boundaries
// Lesson, else if: the boundaries 64, 128 and 192.
string Pixel(int brightness)
{
    if (brightness >= 192) return "#";
    else if (brightness >= 128) return "+";
    else if (brightness >= 64) return "-";
    else return ".";
}
Console.WriteLine(Pixel(63));
Console.WriteLine(Pixel(64));
Console.WriteLine(Pixel(128));
Console.WriteLine(Pixel(192));
```

```csharp exec
id: x-space-both-lines
// Lesson, if statements: with a space, both lines run.
char character = ' ';
if (character == ' ')
{
    Console.WriteLine("A space: leave it where it is.");
}
Console.WriteLine("On to the next character.");
```

```csharp exec
id: x-triangle-one-check
// Practice 16: checking only sideA + sideB > sideC accepts 1, 10 and 2.
int sideA = 1;
int sideB = 10;
int sideC = 2;
Console.WriteLine(sideA + sideB > sideC);
```

```csharp exec
id: x-shift-challenge-z
// Lesson challenge: the starter as given moves a space too (to '=', 61), which the challenge asks the reader to stop.
char character = ' ';
int shift = 3;
int position = character - 'A';
int moved = (position + shift) % 26;
Console.WriteLine((int)(char)(moved + 'A'));
```

Browser results for the added probes: `shift`, `shift`, `keep`; `light`;
`left of the picture`, `on the picture`, `on the picture`, `right of the
picture`; `.`, `-`, `+`, `#`; both lines; `True`; `61`.
