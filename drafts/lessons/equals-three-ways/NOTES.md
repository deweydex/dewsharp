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

Files:

- `equals-three-ways.md`: the lesson. Five exec cells, three predicts.
- `equals-three-ways.native.json`: what the native check recorded for them.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).

## What changed, and why

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
letter. The C# `storing-and-computing` draft says the same, in the same
words.

**"Why idea A feels right" became "Why idea A is easy to believe".** *Right*
is one of the style guide's verdict words, and the powers and dividing
drafts made the same change. The cell under it keeps its dewlab id,
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
fact that Python does not have: in C#, an assignment has a value, the value
it stored. The page states that fact (probe `assignment-value` runs it, and
Microsoft's assignment-operator page, linked at the end, says it), defines
*implicitly* again in one clause, and adds that in C the same line compiles
and its body always runs. The question "What happens here?" became "What do
you think the compiler will say about it?", with the cell said to be meant
to fail before the run, as the style guide asks. There is still no predict
block on it, so the page keeps three.

The cell gained a line, `Console.WriteLine($"The score is {score}.");`.
Without it, nothing reads `score`, and the compiler adds warning CS0219
("assigned but its value is never used") under the error (probe
`dewlab-shape`). With it, there is one message, and the cell also shows
again that nothing runs when a program does not compile: not even the line
before the mistake.

**New: a `bool` in the `if` (`where-else-it-happens-2`).** This is the one
thing the page adds, and it can be removed as one piece (the paragraph
before the cell, the cell, its predict, the two paragraphs and the message
after it, the second fold, and the closing paragraph). The course map says
that because an `if` needs a `bool`, "the classic slip from C cannot
happen". That is true for an `int`, and not for a `bool`:
`if (seeThrough = true)` compiles, runs the body, and leaves `seeThrough`
changed. The compiler gives warning CS0665, *Assignment in conditional
expression is always constant; did you mean to use == instead of = ?*. So
C# does ask Python's question, but as a warning, and only here. This is the
C# form of the misconception the page is about, and it gives the page's
third message for PDP-LO9. The cell prints `seeThrough is now True` at the
end, which shows the assignment happened and also removes a CS0219 warning
(the same reason as above). Its predict offers the style guide's outcomes
(does not compile / runs and prints / runs and does not print), with a note
on each unexpected option that points at the line of evidence. The fold
gives `== true` and then `if (seeThrough)`, which has no `=` to slip on.

**A closing paragraph** puts the three mistakes side by side: two did not
compile because the types did not fit, and one did, and only a warning
showed it. It follows the powers page's closing paragraph ("The compiler
checks that the types fit. It cannot check that a calculation is the one
you meant").

**Where to read more.** dewlab linked the Python tutorial's first pages.
The C# page links Microsoft's
[Assignment operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/assignment-operator)
(it says "the result of an assignment expression is the value assigned to
the left-hand operand", the fact this page depends on) and
[Equality operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/equality-operators).
Both returned HTTP 200 on 27 September 2026.

## What C# made different, in short

- A failed compile prints nothing, so idea A's prediction is "does not
  compile", not "an error".
- `15 = score;` is CS0131, and its message does not suggest `==`.
- An assignment is an expression with a value, so `if (score = 15)` is a
  type error (CS0029), not a syntax error, and its message is about `int`
  and `bool`, not about `=`.
- With a `bool`, `if (x = true)` compiles and runs. C# warns (CS0665), and
  the warning asks the "did you mean ==" question that Python's error asks.
- `bool` prints as `True` and `False`, while the code writes `true` and
  `false`.
- A variable that is only ever assigned a constant gets warning CS0219.
  Both `if` cells read their variable so that each shows one message.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| 10, 5 and 15 (experiment 1) | lesson cell `an-experiment-1` prints 15; 10 and 5 are its set-up |
| `False` (experiment 2); capital letter | lesson cell `an-experiment-2` |
| 20 (`score + 5`) | probe `twenty` |
| CS0131 message, line 2, column 1 | lesson cell `why-idea-a-feels-right-1` |
| CS0029 message, line 3, column 5; nothing runs | lesson cell `where-else-it-happens-1` |
| an assignment's value is the value it stored (15) | probe `assignment-value` |
| fold 1: `The score is 15.`, then `Fifteen!` | probe `fold-1` |
| `Skip this pixel.`, `seeThrough is now True`, CS0665 at line 2, column 5 | lesson cell `where-else-it-happens-2` |
| fold 2: only `seeThrough is now False`, and no warning | probe `fold-2` |
| `if (seeThrough)` does the same | probe `fold-2-bool` |
| Fortran 1957; Pascal's `:=`; C's `if (score = 15)` compiles and always runs | not run here: history, and C, which the checker cannot compile |

The messages in the prose say `Program.cs`, as the page will show them.
The native check names the file after the cell id
(`why-idea-a-feels-right-1(2,1)`); line, column, code and text are the
same.

## Once the course map or the page UI exist

- **Links in.** dewlab links here from two places: the `==` paragraph under
  the comparison table on `making-decisions` ("The equals sign: a closer
  look ... has an experiment that shows the difference") and a predict note
  on `expressions-come-alive` (an MIT course page, not in PDP). The C#
  `making-decisions` should keep its link, to `lesson:equals-three-ways`.
- **The opening link text**, "the page about decisions", should become the
  C# page's real title once it exists. The map calls it "Decisions: if, else
  if and else".
- **Overlap with `making-decisions-practice`.** The map turns that page's
  "One equals sign or two" into CS0029. So a learner may meet
  `if (score = 15)` there before meeting it here. That is fine for a closer
  look, but the practice problem's note is a natural place for a link to
  this page, and it should not give away the CS0665 case.
- **Overlap with `storing-and-computing`.** The C# draft of that page
  already runs `count = count + 1` with a predict and says that `=` is not
  "is equal to". dewlab's pages overlap in the same way, and this page does
  not mention it.
- **`compiler-errors`** (map row 4) teaches warnings and CS0219 before this
  page. This page still defines *warning* in one sentence, because a closer
  look may be read on its own. If `compiler-errors` settles on a wording for
  "warning", use the same one here.
- **Course map text.** Its entry for this page says "the classic slip from
  C cannot happen" and "Four cells". If the `bool` cell stays, the entry
  should say five cells and that the slip survives with a `bool`, with a
  warning.
- **How the page shows a warning.** The prose quotes the CS0665 warning and
  says it "does not stop the program". Check that the page shows the warning
  next to the output (LESSON_FORMAT says "in a quieter style"), and that a
  screen reader announces it.
- **Predict options with code in them** (`` It runs, and prints `Skip this
  pixel.` ``). Check that `web/lesson/parse.js` renders inline code in an
  option.
- **KaTeX** renders `$x = 5$` and `$5 = x$` inline. Check it.

## Open questions for a reviewer

1. **Keep the `bool` cell?** It is the only thing this page adds, and it
   makes the page five cells where the map says four. It shows that the
   compiler's help with `=` and `==` comes from types, and stops where the
   types fit, which is the C# lesson of the page. Without it, the page ends
   on the reassuring half ("C# does not compile this") and the learner never
   sees the case that still bites.
2. **The warning appears only for a constant.** `if (seeThrough = hidden)`,
   with `hidden` a `bool` variable, compiles and runs with no warning at all
   (probe `no-warning-with-variable`). The page does not say so. Say it in
   the fold, leave it for a practice problem, or leave it out?
3. **A fourth `=` in C#.** `int score = 10;` makes a variable and gives it a
   first value; `score = 15;` changes it. Writing the type twice,
   `int score = score + 5;`, is CS0128 (probe `declare-twice`). The page
   does not separate the two, because `storing-and-computing` already has.
   Worth a sentence?
4. **Yoda conditions.** C programmers write `15 == score` so that a slip to
   `15 = score` does not compile. C# does not need it for an `int`. Not on
   the page; mention it only if a teacher expects it.
5. **A challenge at the end?** The style guide wants a practice page, a
   challenge and something to read; the map says a closer look ends with
   one thing to read. The powers and dividing drafts asked the same.
6. **The page opens with prose, not a cell.** The closer-look shape states
   the two ideas before the experiment, as the powers draft does. The style
   guide's checklist asks that a page open by running something. The first
   cell is about fifteen lines down.

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cells
fail on purpose.

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
