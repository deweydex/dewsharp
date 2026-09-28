# equals-three-ways: notes for a reviewer

Ported from dewlab `tutorials/equals-three-ways/equals-three-ways.md`
(version 2026.09.26.1). It is a "closer look" page (dewlab DECISIONS_LOG
7.261), and its home page is `making-decisions`: in dewlab's PDP course it
sits straight after that page, and `planning/COURSE_MAP.md` keeps it there
(PDP row 8, "translate", shape "closer look", size S). dewlab has no
practice page for it, and its glossary file has `entries: []`, so there is
neither here. A closer look keeps no worlds, and the course map lists this
page under "Lessons with no worlds".

`covers: [PDP-LO4, PDP-LO9]` comes from the course map's entry for the page.
dewlab's frontmatter has no `covers:`. PDP-LO4 is "procedural syntax ...
operators" and PDP-LO9 is "interpret compiler and linker messages and react
appropriately"; the page reads three compiler messages, so LO9 fits it
better in C# than it did in Python. `year:` is dropped, because dewsharp's
format has no such field.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/equals-three-ways/equals-three-ways.md`, its
recorded outputs are `lessons/equals-three-ways/equals-three-ways.outputs.json`
(written by the browser checker), and this file was the draft's `NOTES.md`.
The two `*.native.json` files were deleted: the browser checker's outputs
file replaces them. "What was done when it moved", just below, says what
changed in the move. The porter's notes follow it, with anything the move
made stale marked *(stale)* or brought up to date. "The porter's questions,
and what was decided" settles the open questions where the playbook, the
course map, the style guide or the exemplars answer them; the rest are
under "Open".

Files:

- `equals-three-ways.md`: the lesson. Five program cells, two of them
  meant not to compile (`expect: CS0131`, `expect: CS0029`), three choice
  predicts, two solutions, no answer folds, hints, `inputs` or challenge.
- `equals-three-ways.outputs.json`: what the browser checker recorded,
  version `2026.09.28.1`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write equals-three-ways`
  ran the draft's five cells in the real engine. Every one did what the
  native check said, with the same text, line and column:
  `an-experiment-1` printed `15`; `an-experiment-2` printed `False`;
  `why-idea-a-feels-right-1` did not compile, CS0131 at (2,1);
  `where-else-it-happens-1` did not compile, CS0029 at (3,5), with no other
  message; `where-else-it-happens-2` ran, printed `Skip this pixel.` and
  `seeThrough is now True`, with warning CS0665 at (2,5). The browser
  differed from the draft in nothing: no culture formatting, no trimmed
  API, no stray warning.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches the native check's:
  `20` for `twenty`; `15`, `15` for `assignment-value`; `The score is 15.`,
  `Fifteen!` for `fold-1`; `seeThrough is now False` for `fold-2` and for
  `fold-2-bool`; CS0029 at (2,5) plus warning CS0219 for `dewlab-shape`;
  `Skip this pixel.`, `seeThrough is now True` and no message at all for
  `no-warning-with-variable`; CS0128 at (2,5) for `declare-twice`.
- **Every number and every quoted output now comes from a cell on the page**
  (decision 29; the powers page made the same changes when it moved):
  - The prose said "15 is not the same as 20", and 20 came only from the
    probe `twenty`. `an-experiment-2` now prints `score + 5` on its first
    line and asks `score == score + 5` after it, so it prints `20` and
    `False`. The sentence before the cell says it prints `score + 5` first
    and then asks the question, and the predict asks "What will the last
    line print?" ("second line" could mean the second line of code, which
    prints 20, or of output, which is `False`). The page compares a
    choice guess with each line (decision 37); `True` and `False` match no
    line but the second, so the comparison can't be fooled here, as it can
    on the powers page.
  - The first answer fold ("The cell prints `The score is 15.`, and then
    `Fifteen!`", probe `fold-1`) became a `solution` block on
    `where-else-it-happens-1`. The checker runs it and records both lines.
    The question before it gained "It takes one change.", as on the powers
    page.
  - The second answer fold ("The cell prints only `seeThrough is now
    False`, and the warning is gone", probe `fold-2`) became a `solution`
    block on `where-else-it-happens-2`. The checker records its output,
    `seeThrough is now False`, and no diagnostics, so "the warning is gone"
    is recorded too. Its note keeps the fold's second paragraph on
    `if (seeThrough)`, which quotes no output (probe `fold-2-bool` backs
    "asks the same question").
  - The page shows a solution under its cell, as a closed fold called
    "A solution", so both now sit under their cells and above the prose
    that asks for them. That is the page's layout for every solution, and
    the exemplars and the powers page have it too.
- **One sentence added to the first experiment**: "C# checks the whole
  program before it runs any of it", the reason why idea A predicts that
  nothing prints. `first-steps` defines compiling; a closer look may be
  read alone, and the powers page says the same thing in the same place.
- **Visual Studio.** One line before "Where to read more": everything on
  the page runs in the browser, and nothing needs Visual Studio
  (`#the-ide`; the style guide's checklist). The powers page has the same
  line.
- **Where to read more** keeps one source, as the course map says a closer
  look does ("it ends with one thing to read"), in `first-steps`'s form:
  Microsoft, *Assignment operators (C# reference)*, whose first paragraph
  says "The result of an assignment expression is the value assigned to the
  left-hand operand", the fact this page depends on. It returned HTTP 200 on
  28 September 2026. The *Equality operators* page went: it covers `==` for
  records, delegates and strings, dense for a Level 5 reader, and the page
  needs none of it.
- **Frontmatter.** `version:` is `2026.09.28.1`, because `an-experiment-2`
  changed and two solutions were added.
- **The link** to `lesson:making-decisions` stays. That page is being moved
  into `lessons/` in the same round, so the checker's report that the link
  "goes nowhere" is expected until it lands.
- **The page was looked at** in headless Chromium on the real server, at
  900 and 390 pixels wide. Each cell is labelled PROGRAM with `Program.cs`.
  Each cell, run on the page, gave what the checker recorded, and the
  status line said "Did not compile, so nothing ran." for the two that fail.
  The two compiler errors and the warning read as the prose quotes them. The
  warning shows under the Run bar in the quieter style, above the output,
  and the editor underlines `seeThrough = true`. The predict options with
  code in them render the code as code. KaTeX typesets `$x = 5$` and
  `$5 = x$`. There is no sideways scroll at 390 pixels, and the console
  showed no errors.
- **Not done here: `courses/pdp.yaml`** still has
  `equals-three-ways: "The equals sign: a closer look at =, == and maths"`
  under `planned:`. The playbook's checklist says to delete it when the
  lesson moves; this round's instructions leave the course files to the
  orchestrator.

## What changed from dewlab, and why (the porter's notes)

**The two ideas and the first experiment are the same.** `score = score +
5;` prints 15, as idea B predicts. Idea A's option was "An error"; it is now
"Nothing: the program does not compile", because in C# a line that cannot
be accepted stops the whole program before anything prints (the powers page
made the same change). Idea B's wording says "stores the answer in the
variable before it", not "gives the answer the name on the left": C# pages
talk about variables, and "left" and "right" wait for the compiler message
that uses them. After the run, the page names the thing it has just seen:
an *assignment*. The CS0131 and CS0665 messages below both use that word,
so it has to be defined first.

"The second line was not a statement about `score`" became "did not state a
fact about `score`". In C#, *statement* is the name for a line of code such
as `score = score + 5;`, so the old sentence would say something untrue.

**The second experiment is the same**, `score == score + 5` printing
`False`. The page adds one sentence: C# prints a `bool` with a capital
letter. The C# `storing-and-computing` page says the same, in the same
words. *(Brought up to date: the cell now also prints `score + 5` first;
see above.)*

**"Why idea A feels right" became "Why idea A is easy to believe".** *Right*
is one of the style guide's verdict words, and the powers and dividing
pages made the same change. The cell under it keeps its dewlab id,
`why-idea-a-feels-right-1`, because the course map says a cell that keeps
its task keeps its id, and ids are a contract. The heading anchor changes;
nothing links to it.

**`15 = score;` fails in a different way.** Python stops with a
`SyntaxError` whose message asks "Maybe you meant '==' instead of '='?".
C# gives CS0131, *The left-hand side of an assignment must be a variable,
property or indexer*, and does not mention `==`. The page reads the message
in the usual order (line, column, what it found), defines *left-hand side*,
and says in one sentence that a property and an indexer are other places
that can hold a value and this page does not need them. The sentence "The
error message even asks whether you meant `==`" is gone, because it is not
true in C#.

**The history paragraph** keeps Fortran (1957) and Pascal's `:=`, and gains
one sentence: C uses `=` and `==` as C# does, and C# writes them the same
way.

**`if (score = 15)` is the biggest change.** Python stops before running
and asks again whether you meant `==`. C# gives CS0029, *Cannot implicitly
convert type 'int' to 'bool'*, which a learner cannot read without one
fact that Python does not have: in C#, an assignment does two things. It
stores a value, and it also gives that value, as a calculation does. The
page states that fact (probe `assignment-value` runs it, and Microsoft's
assignment-operator page, linked at the end, says it), ties *implicitly* to
the message and defines it again in one clause (the powers and
`storing-and-computing` pages defined it first), and adds that in C the
same line compiles and its body always runs. The question "What happens
here?" became "What do you think the compiler will say about it?", with the
cell said to be meant to fail before the run, as the style guide asks.
There is still no predict block on it, so the page keeps three.

dewlab's "An `if` needs a question, so it needs `==`" became "An `if` needs
a question. To ask whether `score` is 15, it needs `==`.", because an `if`
can also ask with `<` or `>`. "Types are what the compiler checks" became
"the problem the compiler found is about types", because the compiler
checks names and brackets too.

The cell gained a line, `Console.WriteLine($"The score is {score}.");`.
Without it, nothing reads `score`, and the compiler adds warning CS0219
("assigned but its value is never used") under the error (probe
`dewlab-shape`). With it, there is one message, and the cell also shows
again that nothing runs when a program does not compile: not even the line
before the mistake.

**New: a `bool` in the `if` (`where-else-it-happens-2`).** This is the one
thing the page adds, and it can be removed as one piece (the paragraph
before the cell, the cell, its predict and its solution, the two paragraphs
and the message after it, the question before the solution, and the closing
paragraph). The course map says that because an `if` needs a `bool`, "the
classic slip from C cannot happen". That is true for an `int`, and not for
a `bool`: `if (seeThrough = true)` compiles, runs the body, and leaves
`seeThrough` changed. The compiler gives warning CS0665, *Assignment in
conditional expression is always constant; did you mean to use == instead
of = ?*. So C# does ask Python's question, but as a warning, and only here.
This is the C# form of the misconception the page is about, and it gives
the page's third message for PDP-LO9. The cell prints `seeThrough is now
True` at the end, which shows the assignment happened and also removes a
CS0219 warning (the same reason as above). Its predict offers the style
guide's outcomes (does not compile / runs and prints / runs and does not
print), with a note on each unexpected option that points at the line of
evidence. The solution gives `== true`, and its note gives `if (seeThrough)`,
which has no `=` to slip on.

**A closing paragraph** puts the three mistakes side by side: the compiler
found two and nothing ran, and the third compiled because its types fit,
and only a warning showed it. (An earlier wording said both compiler errors
came from types that did not fit. That is true of CS0029 and not of CS0131,
where `15` is not a variable, so it was changed.) It follows the powers
page's closing paragraph ("The compiler checks that the types fit. It
cannot check that a calculation is the one you meant").

**Where to read more.** dewlab linked the Python tutorial's first pages.
The C# page links Microsoft's *Assignment operators*. *(Brought up to
date: the draft also linked *Equality operators*; see above.)*

## What C# made different, in short

- A failed compile prints nothing, so idea A's prediction is "does not
  compile", not "an error".
- `15 = score;` is CS0131, and its message does not suggest `==`.
- An assignment is an expression with a value, so `if (score = 15)` is a
  type error (CS0029), not a syntax error, and its message is about `int`
  and `bool`, not about `=`.
- With a `bool`, `if (x = true)` compiles and runs. C# warns (CS0665), and
  the warning asks the "did you mean ==" question that Python's error asks.
  With a `bool` variable in place of `true`, it warns about nothing
  (probe `no-warning-with-variable`).
- `bool` prints as `True` and `False`, while the code writes `true` and
  `false`.
- A variable that is only ever assigned a constant gets warning CS0219.
  Both `if` cells read their variable so that each shows one message.

## Where each number and message in the prose comes from

All from `lessons/equals-three-ways/equals-three-ways.outputs.json`, except
where the table says otherwise.

| Number, message or claim | Source |
|---|---|
| 15 (idea B's prediction; "It prints 15") | cell `an-experiment-1`, output `15`; 10 and 5 are its own code |
| 20 and `False` (experiment 2); the capital letter | cell `an-experiment-2`, output `20`, `False`; 15 is its own code |
| CS0131 message, line 2, column 1 | cell `why-idea-a-feels-right-1` |
| CS0029 message, line 3, column 5; nothing runs, not even the first line | cell `where-else-it-happens-1`: `compile-error`, output empty |
| an assignment gives the value it stored ("it gives 15, an `int`") | 15 is the cell's own code; probe `assignment-value` prints `15`, `15`; the CS0029 message names `int` |
| `The score is 15.`, then `Fifteen!` (first solution) | `where-else-it-happens-1`, `solutions[0].output` |
| `Skip this pixel.`, `seeThrough is now True`, CS0665 at line 2, column 5 | cell `where-else-it-happens-2` |
| only `seeThrough is now False`, and no warning (second solution) | `where-else-it-happens-2`, `solutions[0]`: that output, and no `diagnostics` |
| `if (seeThrough)` asks the same question (no output quoted) | probe `fold-2-bool` |
| C's `if (score = 15)` compiles and its body always runs | not run by the checker; `gcc -Wall` on 28 September 2026 compiled it (with a `-Wparentheses` warning) and it printed `Fifteen!` |
| Fortran 1957; Pascal's `:=`; $x = 5$ and $5 = x$ | not program output: history, and maths |

The messages in the prose say `Program.cs`, as the page shows them
(checked on the page).

## Notes that were for later, and what became of them

- **Links in.** dewlab links here from the `==` paragraph on
  `making-decisions` and from a predict note on `expressions-come-alive`
  (an MIT course page, not in PDP). The C# `making-decisions` draft names
  this page in prose ("A later page, a closer look at the equals sign"), in
  the lesson and in its practice page, and its NOTES list
  `lesson:equals-three-ways` as a link to add. That page is moving in the
  same round, so the link is its to add; nothing to do here.
- **The opening link text.** Decided: it stays "the page about decisions",
  the form `dividing-in-csharp` uses for its home page ("the page about
  variables and types"). It is plainer than the title *Decisions: if, else
  if and else*, and says what the page is.
- **Overlap with `making-decisions-practice`.** Checked the draft: its
  "One equals sign or two" answer reads CS0029, says that `lives = 0` "also
  has a value of its own, the value it stored" (the same fact as this
  page), and ends "A later page, a closer look at the equals sign, has
  more". It does not give away CS0665.
- **Overlap with `storing-and-computing`.** That page runs
  `count = count + 1` with a predict and says `=` does not mean "is equal
  to". dewlab's pages overlap in the same way, and this page does not
  mention it.
- **`compiler-errors`** is not written yet, and is not moving in this
  round, so the page can't link to it. This page defines *warning* in one
  sentence ("a message about code that compiles, but may not do what you
  meant. It does not stop the program."), which agrees with
  `objects-and-classes-practice` ("A warning never stops a program").
- **Course map text.** See "Open", item 1.
- **How the page shows a warning.** Checked: under the Run bar, in the
  quieter style, as a button that moves the cursor to line 2, column 5, in
  a list labelled "Compiler messages". It is readable with a screen reader
  and reachable from the keyboard. It is not announced: see "Open", item 3.
- **Predict options with code in them.** Checked: `Skip this pixel.`
  renders as code in the options.
- **KaTeX.** Checked: `$x = 5$` and `$5 = x$` are typeset.

## The porter's questions, and what was decided

1. **Keep the `bool` cell?** Kept for now, and left for Josh (see "Open",
   item 1). The course map's reason for four cells is that "the classic slip
   from C cannot happen", and the recorded output of
   `where-else-it-happens-2` shows that it can, with a `bool`. The page is
   still an S page (under eight cells). No document answers whether a
   closer look may add a section the map does not list.
2. **The warning appears only for a constant.** Decided: not on this page.
   The course map's "Closer looks" says a closer look's problems "go into
   the practice page of the tutorial it belongs to", which is
   `making-decisions-practice`. The browser confirms the fact (probe
   `no-warning-with-variable`: it ran, printed `Skip this pixel.` and
   `seeThrough is now True`, and gave no message at all), so it would make
   a good problem there, after "One equals sign or two". That page is not
   this move's to edit; see "Open", item 2. The closing paragraph says
   "Only the warning showed the problem", which is true of this cell and
   does not claim that the compiler always warns.
3. **A fourth `=` (`int score = 10;` makes a variable).** Decided: leave it
   out. `storing-and-computing`, in `lessons/`, already says it, under
   `variables-giving-names-to-things-1`: "The first line starts with a
   type, `int`, because it makes the variable. The second line has no
   type, because `count` already exists."
4. **Yoda conditions.** Decided: leave them out. Neither dewlab's page nor
   the course map's entry has them (the playbook's first checklist item),
   and C# does not need them for an `int`, which the page already shows.
5. **A challenge at the end?** Decided: no. The course map's "Closer looks"
   says a closer look "has no worlds and no practice page ... and it ends
   with one thing to read", which is dewlab's shape too, and the powers
   page decided the same. The page now ends with its closing paragraph, the
   line on Visual Studio, and one thing to read.
6. **The page opens with prose, not a cell.** Decided: keep it. The course
   map's entry says "Same two ideas and the same experiment", and its
   "Closer looks" keeps dewlab's shape: two ideas, then the experiment that
   tests them. The two ideas are the question the first cell answers, and
   `powers-in-csharp`, in `lessons/`, opens the same way.

## Open

For Josh:

1. **The `bool` cell, and the course map's entry.** The page has five
   cells, where the map's entry says four, and the fifth,
   `where-else-it-happens-2`, is a section neither dewlab nor the map has.
   The map's entry also says that "the classic slip from C cannot happen";
   the recorded output shows that with a `bool` it compiles and runs, with
   warning CS0665. If the cell stays, the entry should say five cells and
   that the slip survives with a `bool`, as a warning. If it goes, it can be
   removed as one piece (listed under "New: a `bool` in the `if`" above),
   and the map's sentence should still say "for an `int`". The course map
   was not edited in this move.
2. **A problem for `making-decisions-practice`**: `if (seeThrough =
   hidden)`, with `hidden` a `bool` variable, compiles and runs with no
   warning at all. It is the one case on this page that nothing catches.
   It belongs on the practice page of this page's home tutorial (course
   map, "Closer looks"), which is moving in this round and which this move
   may not edit.
3. **A warning is not announced to a screen reader** (a page matter, in
   `web/page/cell.js`, not this lesson's). When `where-else-it-happens-2`
   runs, the status line, which is a live region, says only "Ran. (0.14 s)".
   The warning is in the "Compiler messages" list, which is not a live
   region. A screen-reader user hears that the program ran, and nothing
   tells them a warning appeared, on the one page whose point is that a
   warning is worth reading. A status such as "Ran, with 1 warning." would
   fix it. Nothing in this lesson can.

## Probe cells

Run in the browser by copying them into a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`). The
`expect:` cells fail on purpose.

```csharp exec
id: twenty
int score = 15;
Console.WriteLine(score + 5);
```

```csharp exec
id: assignment-value
int score = 10;
Console.WriteLine(score = 15);
Console.WriteLine(score);
```

```csharp exec
id: fold-1
int score = 15;
Console.WriteLine($"The score is {score}.");
if (score == 15)
{
    Console.WriteLine("Fifteen!");
}
```

```csharp exec
id: fold-2
bool seeThrough = false;
if (seeThrough == true)
{
    Console.WriteLine("Skip this pixel.");
}
Console.WriteLine($"seeThrough is now {seeThrough}");
```

```csharp exec
id: fold-2-bool
bool seeThrough = false;
if (seeThrough)
{
    Console.WriteLine("Skip this pixel.");
}
Console.WriteLine($"seeThrough is now {seeThrough}");
```

```csharp exec
id: dewlab-shape
expect: CS0029
int score = 15;
if (score = 15)
{
    Console.WriteLine("Fifteen!");
}
```

```csharp exec
id: no-warning-with-variable
bool seeThrough = false;
bool hidden = true;
if (seeThrough = hidden)
{
    Console.WriteLine("Skip this pixel.");
}
Console.WriteLine($"seeThrough is now {seeThrough}");
```

```csharp exec
id: declare-twice
expect: CS0128
int score = 10;
int score = score + 5;
```
