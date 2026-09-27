# powers-in-csharp: notes for a reviewer

Ported from dewlab `tutorials/powers-in-python/powers-in-python.md`
(version 2026.09.26.1), a "closer look" page (dewlab DECISIONS_LOG 7.261)
that sits after `first-steps`. dewlab has no practice page for it, and its
glossary file has `entries: []`, so there is neither here. A closer look
keeps no worlds. dewlab's frontmatter has no `covers:`, so this one has none
either; `year:` is dropped because dewsharp's format has no such field.

Files:

- `powers-in-csharp.md`: the lesson. Two exec cells.
- `powers-in-csharp.native.json`: what the native check recorded for them.
- `NOTES.md`: this file. The probe cells at the end are runnable with the
  same NativeCheck command (pass `NOTES.md` as the file).

## What changed, and why

**The pair of ideas.** Python's page compares `**` with `^`. C# has no
operator for a power, so the page compares `Math.Pow` with `^`. The title
became "Powers: a closer look at Math.Pow and ^". The opening now defines
*operator* and *method* in one sentence each, because `Math.Pow` is the
first method on the page that is not `Console.WriteLine`, and the functions
page that says "C# calls a function a method" comes much later.

**The experiment** keeps its cell and its predict. `Math.Pow(2, 3)` prints 8
and `2 ^ 3` prints 1, as in Python. The third option "An error" became
"Nothing: the program does not compile". In C# a failed compile prints
nothing, not even the first line, and the prose above the cell says so. That
is the compile step from `first-steps`, used again.

**New paragraph: why the compiler says nothing.** This is the C# point of
the page. The compiler checks that types fit; `2 ^ 3` is two `int` values
giving an `int`, so it passes. It cannot know which calculation you meant.

**The first answer fold** keeps dewlab's pairs, in C# (all re-run: see the
probe). It gains one paragraph: `2.5 ^ 2` does not compile (CS0019), because
`^` is not defined for `double`. Python only finds that at run time (a
TypeError), so here C# behaves differently and the page says so.

**"Why idea A feels right" became "Why idea A is easy to believe".** The
style guide's list of verdict words includes *right*, and dewlab's own
closer-look template describes this section as explaining why the other idea
"is so easy to believe". The section anchor changes; nothing links to it.

**The history sentence.** "Python took `^` from C and `**` from Fortran"
became "C# took `^` from C, and C has no power operator either; it has a
function, `pow`, and C# has the method `Math.Pow`." A new short paragraph
is for learners who know Python: `2 ** 3` does not compile in C#, and the
message (CS0193) is about pointers, because C# reads `**` as `*` followed by
a pointer operator. It tells the reader what to look for when they meet it.

**"Where else it happens" has a new second surprise.** Python's was
`-3 ** 2` printing -9 (powers before the minus sign). That does not carry
over: C# has no power operator, and the brackets of `Math.Pow` say which
number is raised. `Math.Pow(-3, 2)` is 9 and `-Math.Pow(3, 2)` is -9 (probe
below), with no surprise either way. C#'s own second surprise with powers is
the type: `Math.Pow` always gives a `double`, so
`int area = Math.Pow(5, 2);` does not compile (CS0266). This cell is a
mistake on purpose (`expect: CS0266`). Its predict offers the style guide's
three outcomes (does not compile / stops with an exception / runs), which
the prose above it names and defines. The prose says after the run that the
cell is meant to fail, so the guess stays open before it. The message is
read in the order `first-steps` teaches; the page explains *convert* and
*implicitly*, and says a later page explains casts. The fold changes `int`
to `double`, and notes that `Console.WriteLine` shows a whole `double` as
`25`, not `25.0` (Python learners expect `25.0`).

**A closing paragraph** puts the two surprises side by side: one compiled
and gave a number that is not a power, the other did not compile and said
where. The compiler checks types, not intentions.

**Where to read more:** Python's operator-precedence page became Microsoft
Learn's
[C# operators and expressions](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/)
(it has the precedence list) and the
[`Math.Pow`](https://learn.microsoft.com/dotnet/api/system.math.pow) page.
Both returned HTTP 200 on 27 September 2026.

## What C# made different, in short

- No power operator. A power is a method call, and it returns a `double`.
- `^` compiles for whole numbers and quietly gives the wrong kind of answer,
  exactly as in Python. For a `double` it does not compile, where Python
  fails only at run time.
- A failed compile runs nothing, so "the second line fails" means "neither
  line prints".
- `Console.WriteLine` prints a whole `double` without `.0`.
- The native check labels a message with the cell id
  (`where-else-it-happens-1(1,12)`); on the page the default file name is
  `Program.cs`, so the prose shows `Program.cs(1,12): error CS0266: …`. Line
  and column match the native output.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| 8 and 1 (experiment) | lesson cell `an-experiment-1` |
| CS0266 at line 1, column 12, and its text | lesson cell `where-else-it-happens-1` |
| 8 for `Math.Pow(2, 3)` in the opening | lesson cell `an-experiment-1` |
| `2 ^ 2` 0, `Math.Pow(2, 2)` 4, `5 ^ 2` 7, `Math.Pow(5, 2)` 25, `0 ^ 1` 1, `Math.Pow(0, 1)` 0, `1 ^ 0` and `Math.Pow(1, 0)` both 1 | probe `fold-numbers` below |
| only the pair 1, 0 agrees for 0 to 20 | probe `fold-search` below |
| `2.5 ^ 2` gives CS0019, and its text | probe `fold-decimal` below |
| `2 ** 3` gives CS0193 | probe `python-power` below |
| the fix prints 25 | probe `fold-fix` below |
| `=2^3` gives 8 in a spreadsheet; 5 metres, 25 square metres | not program output: carried over from dewlab, or the set-up of the task |

The fold claims are not in lesson cells, so the browser checker's
`outputs.json` will not record them. A reviewer may want a rule for numbers
that appear only in answer folds.

## Once the course map or the page UI exist

- **The link to first-steps has no section anchor.** dewlab linked to
  `first-steps#a-few-more-things-python-can-do`. The C# `first-steps` was
  being written at the same time and was not on disk when this was written.
  The opening sentence assumes that page shows `Math.Pow` (dewlab's operator
  table has `**`) and links here. If it does not, change the first sentence,
  and add an anchor to the link once the section exists.
- **"A later page explains casts"** has no link. Link it once the course map
  says which page (probably `storing-and-computing`).
- **Course map:** place it straight after `first-steps`, as dewlab does
  (PDP "Programming Foundations"), and in a "closer looks" group if the map
  has one.
- **A choice predict before a cell that fails to compile.** The format says
  the page shows the guess and the output side by side. For
  `where-else-it-happens-1` the "output" is a compiler message. Check that
  the page shows the message there, and that the option "It does not
  compile, so nothing runs" reads sensibly next to it.
- **A `console` fence inside a `dl-answer` fold** (the CS0019 message).
  Check that the renderer shows it as a block inside the fold.
- **The fixed answer-fold line.** The second fold has *Here is one answer.
  Yours may be different and work too.* The first does not: from 0 to 20
  there is only one pair, so "yours may be different" would mislead.

## Open questions for a reviewer

1. The style guide says every page ends with a practice page, a challenge
   and something to read. dewlab's closer looks end with reading only. Keep
   it that way, or add a small challenge?
2. Should the page name `^`? It is *exclusive or*. dewlab does not name it.
   C# could show it with `bool` (`true ^ false` is `True`, `true ^ true` is
   `False`: probe `xor-bool`), which `first-steps` introduced. And C# gives
   `^` a second job later, "from the end" in `list[^1]`; the lists page may
   want to link back here.
3. Keep the Python paragraph (CS0193)? It helps learners who come from
   Python and costs others one paragraph.
4. The page defines *exception* inside the three-outcomes sentence. If
   `first-steps` already defines it, shorten that sentence here.
5. Python's `-3 ** 2` surprise is gone (see above). Is a one-line note about
   `Math.Pow(-3, 2)` wanted, or is it better left out?
6. The first predict has no "It stops with an exception" option (dewlab had
   a plain "An error"). Three options seemed enough; add a fourth?

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cells
fail on purpose.

```csharp exec
id: fold-numbers
Console.WriteLine(2 ^ 2);
Console.WriteLine(Math.Pow(2, 2));
Console.WriteLine(5 ^ 2);
Console.WriteLine(Math.Pow(5, 2));
Console.WriteLine(0 ^ 1);
Console.WriteLine(Math.Pow(0, 1));
Console.WriteLine(1 ^ 0);
Console.WriteLine(Math.Pow(1, 0));
Console.WriteLine(Math.Pow(-3, 2));
Console.WriteLine(-Math.Pow(3, 2));
```

```csharp exec
id: fold-search
for (int a = 0; a <= 20; a++)
{
    for (int b = 0; b <= 20; b++)
    {
        if ((a ^ b) == Math.Pow(a, b))
        {
            Console.WriteLine($"{a} ^ {b} and Math.Pow({a}, {b}) agree");
        }
    }
}
```

```csharp exec
id: fold-decimal
expect: CS0019
Console.WriteLine(2.5 ^ 2);
```

```csharp exec
id: python-power
expect: CS0193
Console.WriteLine(2 ** 3);
```

```csharp exec
id: fold-fix
double area = Math.Pow(5, 2);
Console.WriteLine(area);
```

```csharp exec
id: xor-bool
Console.WriteLine(true ^ false);
Console.WriteLine(true ^ true);
```
