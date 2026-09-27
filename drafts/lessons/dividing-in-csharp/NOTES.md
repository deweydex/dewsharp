# dividing-in-csharp: notes for a reviewer

Ported from dewlab `tutorials/dividing-in-python/dividing-in-python.md`
(version 2026.09.26.1). It is a "closer look" page (dewlab DECISIONS_LOG
7.261), and its home page is `storing-and-computing`: in dewlab's PDP
course it sits straight after that page. dewlab has no practice page for it,
and its glossary file has `entries: []`, so there is neither here. A closer
look keeps no worlds. dewlab's frontmatter has no `covers:`, and
`planning/curriculum/outcomes.yaml` does not name the page, so there is no
`covers:` here either. `year:` is dropped because dewsharp's format has no
such field.

Files:

- `dividing-in-csharp.md`: the lesson. Five exec cells.
- `dividing-in-csharp.native.json`: what the native check recorded for them.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).

## What changed, and why

**The answer to the experiment is the other idea.** Python's page asks
whether `//` removes the decimal part (idea A) or rounds down (idea B), and
Python rounds down: `-7 // 2` is -4. C# has no `//`. Its `/` with two `int`
values removes the decimal part, which moves a negative answer towards zero:
`-7 / 2` is -3. So the same two ideas and the same experiment now end with
idea A. The section "Why idea A feels right" became "Why idea B is easy to
believe". That also removes *right*, one of the style guide's verdict
words; the powers page made the same change.

**A new opening cell, `dividing-two-ways-1`.** It prints `7 / 2` (3) and
`7.0 / 2` (3.5). In C#, `/` does two kinds of dividing and the types
decide which. The two ideas make no sense until the reader has seen that,
and the dewsharp style guide asks a page to open by running something. The
cell also means the page does not depend on what the C# `first-steps` or
`storing-and-computing` showed about `/`. The two ideas now use 7 and 2,
which the cell has just printed, rather than dewlab's 17 and 5 from
`first-steps`. The opening link goes to `storing-and-computing`, the home
page, where dewlab linked to a section of `first-steps`.

**The experiment's predict became a choice.** dewlab used `type: number`.
dewlab's closer-look template (`docs/templates/where-the-total-starts.md`)
asks for a predict that names the idea behind each option, and the page
states both ideas' answers just above the cell, so the choice is between
them. A third option, -3.5, catches the reader who expects C# to keep the
decimal part; its note asks whether -7 and 2 are `int` or `double`.

**"Why idea B is easy to believe"** keeps dewlab's first paragraph
(positive numbers hide the difference), turned round. It adds that some
tools do round down (a spreadsheet's `INT`, Python's `//`) and that C# does
when asked, with `Math.Floor`. `Math.Floor` is named in one sentence and not
run on the page; the probe below checks it.

**The pair `/` and `%` now has a cell** (`why-idea-b-is-easy-to-believe-1`).
dewlab stated `-7 // 2` is -4 and `-7 % 2` is 1 in prose only. Here the
numbers come from a cell, because every number in the prose must be run.
The point is reversed: Python's remainder is never negative when you divide
by a positive number; C#'s has the sign of the number being divided, so
`-7 % 2` is -1. The page defines *sign* where it first uses it.

**"Where else it happens" gains a clock** (`where-else-it-happens-1`, with a
number predict, a hint and an answer fold). A negative remainder is the
practical cost of C#'s rule: `% 24` no longer keeps an hour from 0 to 23
when the hour goes below 0. `(2 - 5) % 24` is -3, and adding 24 before the
`%` gives 21. The fold says the same fix (adding 26) serves a Caesar shift
that moves a letter backwards. The page now has three predicts, the most
the style guide allows.

**The 0.1 surprise is kept** (`where-else-it-happens-2`, dewlab's cell and
choice predict), with *binary* defined and "floats" changed to "`double`
values". C# prints `0.30000000000000004` exactly as Python does.

**New: `decimal`.** One paragraph and one fold. C# has a type that stores
0.1 exactly, made for money, and C# learners in PDP meet prices early. The
reader changes `0.1` to `0.1m` in the cell and sees both lines print 0.3.
This is the only new thing the page introduces that dewlab's did not, and it
can be removed without touching anything else (see open question 1).

**Where to read more.** dewlab linked the Python tutorial's page on floating
point. That page's examples are Python. The C# page links Microsoft's
[Arithmetic operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/arithmetic-operators)
(it states that integer `/` rounds towards zero and that `%` takes the sign
of the left operand) and [The Floating-Point Guide](https://floating-point-gui.de/)
with its [C# page](https://floating-point-gui.de/languages/csharp/), which
shows `double` and `decimal`. All three returned HTTP 200 on 27 September
2026.

## What C# made different, in short

- No `//`. One operator, `/`, does whole-number and decimal division, and
  the types of the two numbers choose. `7 / 2` is 3; `7.0 / 2` is 3.5.
- Whole-number division removes the decimal part (towards zero), where
  Python rounds down. So the page's experiment comes out the other way.
- `%` can give a negative remainder. That breaks the "go back round" use of
  `%` for negative numbers, which Python never shows.
- `double` prints `0.30000000000000004` exactly as Python's `float` does.
- C# has `decimal`, which Python has only as a library module.
- The native check prints negative numbers with an ordinary hyphen-minus
  (`-3`) under `en-IE`. The prose uses the same character.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| 3 and 3.5 (opening; ideas A and B for 7 and 2) | lesson cell `dividing-two-ways-1` |
| -3.5 and -3 (experiment) | lesson cell `an-experiment-1` |
| idea B gives -4 for -3.5 | probe `fold-numbers` (`Math.Floor(-7.0 / 2)`) |
| -3, -1 and -7 (the `/` and `%` pair) | lesson cell `why-idea-b-is-easy-to-believe-1` |
| a remainder is negative or 0 when the number divided is negative | probe `remainder-sign` |
| -3 (the clock) | lesson cell `where-else-it-happens-1` |
| 21 (the clock, fixed), and "works when `hoursBack` is 24 or less" | probes `clock-fix` and `clock-fix-range` |
| adding 26 fixes a Caesar shift backwards past A | probe `caesar-back` |
| 0.30000000000000004 and 0.3 | lesson cell `where-else-it-happens-2` |
| `0.1m * 3` prints 0.3 (decimal fold) | probe `decimal-fold` |
| `7 / 2` 3, `-7 / 2` -3, `-8 / 2` -4 (first fold) | probe `fold-numbers` |
| "when either number is a `double`" | probe `fold-numbers` (`7 / 2.0`) |
| a spreadsheet's `INT` and Python's `//` round down | not run here: dewlab's page ran `-7 // 2` (-4); `INT` is spreadsheet behaviour |
| 2 o'clock, 5 hours, 24 hours, 26 letters | the set-up of the task |

The fold claims are not in lesson cells, so the browser checker's
`outputs.json` will not record them (the same question the powers page
raised).

## Once the course map or the page UI exist

- **The storing-and-computing port needs this page's fix.** dewlab's
  `storing-and-computing` has a secret-messages task (`your-turn-4`) that
  decodes with a shift of -3, and its solution note says that for A, "`% 26`
  brings it back round to X". In C#, `(0 - 3) % 26` is -3, so the letter
  becomes `>`, not X (probe `caesar-back`). Whoever ports that page needs
  `+ 26` or a different note, and that note is the natural place for a link
  to this page.
- **Links in.** dewlab links here from the 0.1 + 0.2 predict on
  `storing-and-computing-practice` and from `first-steps`' operator table.
  The C# ports should link to `lesson:dividing-in-csharp` from the same
  places, and the storing page's `%` material is a third place.
- **The opening link text**, "the page about variables and types", assumes
  the C# `storing-and-computing` keeps dewlab's subject. Use its real title
  once it exists.
- **Course map:** after `storing-and-computing` in PDP "Programming
  Foundations", as dewlab has it, and in a "closer looks" group if the map
  has one.
- **Predict options that start with a minus sign** (`- -3`, `- -4`,
  `- -3.5`). dewlab's parser accepts these (there are several in dewlab), but
  check that `web/lesson/parse.js` does too, and that the page shows `-3`,
  not a nested list.
- **`hint` with `after: 2 runs`** on the clock cell. The first run tests the
  guess; the hint should wait for one attempt after that. Check how the page
  counts the run that settles a prediction.
- **The decimal fold asks the reader to edit a cell that has a predict.**
  Check that a second run with changed code does not change the recorded
  guess and output comparison.
- **KaTeX** renders `$-3 \times 2 + (-1) = -7$` inline. Check it.
- **The browser's number format.** The prose writes `-3` with a
  hyphen-minus, as the native check printed. If browser .NET formats
  `en-IE` negatives with U+2212 (some ICU data does), the prose and the
  outputs would differ. `outputs.json` from the browser checker settles it.

## Open questions for a reviewer

1. **Keep `decimal`?** It is a C# answer to the 0.1 problem, and PDP
   programs handle money. But a closer look is about one idea, and dewlab's
   glossary note says a closer look "introduces nothing new of its own". The
   paragraph and its fold can be removed as one piece.
2. **Division by zero.** C# gives all three of the style guide's outcomes
   here: `7 / 0` does not compile (CS0020, "Division by constant zero"),
   `7 / zero` with an `int` variable stops with a DivideByZeroException, and
   `7.0 / 0` runs and prints ∞ (probes `zero-constant`, `zero-variable`,
   `zero-double`). It would make a strong "Where else it happens" for the
   compiler, but it is a different idea from this page's. Perhaps
   `when-it-goes-wrong` is its home.
3. **A challenge at the end?** The style guide wants a practice page, a
   challenge and something to read. dewlab's closer looks end with reading
   only. The powers page asked the same question.
4. **The word for idea A.** Microsoft says integer division "rounds towards
   zero", and the usual word is *truncate*. The page uses neither and
   describes it ("removes the part after the decimal point"). Name it?
5. **The clock or the Caesar shift?** The clock needs only `int`. The
   Caesar shift is closer to the page before, but it needs `char`
   arithmetic, and the C# `storing-and-computing` may not have taught it in
   the shared part. The fold mentions the Caesar shift in one sentence.
6. **Spreadsheet and Python claims** in "Why idea B is easy to believe" are
   not run by this page's checker. Keep them, or keep only `Math.Floor`?

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cells
fail on purpose.

```csharp exec
id: fold-numbers
Console.WriteLine(7 / 2);
Console.WriteLine(-7 / 2);
Console.WriteLine(-8 / 2);
Console.WriteLine(Math.Floor(-7.0 / 2));
Console.WriteLine(Math.Floor(7.0 / 2));
Console.WriteLine(7 / 2.0);
```

```csharp exec
id: remainder-sign
Console.WriteLine(-7 % 2);
Console.WriteLine(-8 % 2);
Console.WriteLine(-9 % 4);
Console.WriteLine(7 % 2);
```

```csharp exec
id: clock-fix
int hour = 2;
int hoursBack = 5;
int earlier = (hour - hoursBack + 24) % 24;
Console.WriteLine(earlier);
```

```csharp exec
id: clock-fix-range
// For every hour from 0 to 23 and every hoursBack from 0 to 24, compare
// the fix with a remainder that never goes below 0.
int differences = 0;
for (int hour = 0; hour <= 23; hour++)
{
    for (int hoursBack = 0; hoursBack <= 24; hoursBack++)
    {
        int fixedHour = (hour - hoursBack + 24) % 24;
        int alwaysPositive = ((hour - hoursBack) % 24 + 24) % 24;
        if (fixedHour != alwaysPositive || fixedHour < 0)
        {
            differences++;
        }
    }
}
Console.WriteLine($"differences: {differences}");
Console.WriteLine((0 - 25 + 24) % 24);
```

```csharp exec
id: caesar-back
int position = 0;
int shift = -3;
Console.WriteLine((position + shift) % 26);
Console.WriteLine((char)('A' + (position + shift) % 26));
Console.WriteLine((char)('A' + (position + shift + 26) % 26));
```

```csharp exec
id: decimal-fold
Console.WriteLine(0.1m * 3);
Console.WriteLine(0.3);
```

```csharp exec
id: zero-constant
expect: CS0020
Console.WriteLine(7 / 0);
```

```csharp exec
id: zero-variable
expect: exception
int zero = 0;
Console.WriteLine(7 / zero);
```

```csharp exec
id: zero-double
Console.WriteLine(7.0 / 0);
```
