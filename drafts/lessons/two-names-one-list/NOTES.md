# two-names-one-list: notes for a reviewer

Ported from dewlab `tutorials/two-names-one-list/two-names-one-list.md`
(version 2026.09.26.1). It is a closer look: two ideas that cannot both be
true, one experiment that decides between them, then why the other idea is
easy to believe and where else the same thing happens. Its home page is
`grids-and-references` (dewlab's `comprehensions-and-grids`), which it
follows in PDP's "Methods, lists and algorithms" series
(`planning/COURSE_MAP.md`, PDP row 17: "translate", shape "closer look",
size S, no worlds, batch 5). dewlab has no practice page for it, and its
glossary file is `entries: []`, so there is neither here. The course map
lists it under "Lessons with no worlds".

`covers: [PDP-LO4, PDP-LO8]` comes from the course map's entry. dewlab's
frontmatter has no `covers:`. `year:` is dropped, because dewsharp's format
has no such field.

Status: written in one run on 27 September 2026. There was no partial
draft in this folder. The native check prints "No problems." for both
files.

Files:

- `two-names-one-list.md`: the lesson. Two exec cells (the course map's
  "Both cells"), two predicts, two answer folds.
- `two-names-one-list.native.json`: what the native check recorded for the
  lesson's cells.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).
- `NOTES.native.json`: what the native check recorded for the probes.

## What changed, and why

**The opening** points back to the page before, as dewlab's does. dewlab
wrote `copy = row`; the C# page writes `int[] copy = row;`, which is the
line the course map gives `grids-and-references` ("`int[] copy = row;`
shares one array"). That page is not drafted yet, so this sentence rests on
the map. The link text is "the page about grids", as the other closer looks
use "the page about loops" and "the page about decisions".

**The two ideas are rewritten so that both are true to C#.** dewlab's idea
B says `other = width` "gives the same value a second name. Nothing is
copied." For Python that is true of numbers too. For a C# `int` it is not:
`int other = width;` copies the number. So the C# ideas are stated with
both halves in view. Idea A: `=` makes a copy, so after `int other =
width;` there are two numbers, and after `int[] otherRow = row;` there are
two arrays. Idea B: `=` gives the value a second name, so after
`int[] otherRow = row;` there is one array with two names. The experiment
still tells them apart only in the array half, and the page says so later
("For the number, both ideas predict 5").

**The experiment is dewlab's, with `int` and `int[]`,** as the map asks.
`row = [5]` becomes `int[] row = { 5 };`. `print(row)` would print
`System.Int32[]` in C#, so each half prints a labelled line:
`width is 5` and `row[0] is 7`. A labelled line also lets the predict ask
for two numbers ("5, then 7") in place of Python's `[7]`. Names are
camelCase (`otherRow`). The cell compiles with no warning: `other` is
assigned from a variable, not only from constants, so CS0219 does not
appear (the native check shows no diagnostics). The predict keeps dewlab's
three options and its two notes.

**"Look at what the third line of each half does"** became "The difference
is in the third line of each half", which states a fact and gives no order.
The two bullets stay, with "names" and "holds" in place of "the name moves
to 7".

**The answer fold** keeps dewlab's two changes. `row[:]` becomes
`row[..]`, a range with no numbers, which `lists-and-sequences-practice`
already calls "a new array with every element". `row.ToArray()` is named
too, because the map gives it to `grids-and-references`. `other_row = [7]`
becomes `otherRow = new int[] { 7 };`, with one clause on what
`new int[] { 7 }` makes. C#'s collection expression `otherRow = [7];` also
works (probe `collection-expression`), but no earlier draft uses it, and
`lists-and-sequences` writes arrays with `{ }`. The fold now opens with
the format's line, in the plural: "Here are two answers. Yours may be
different and work too."

**"Value types and reference types" is new, and replaces one paragraph.**
dewlab explained the result with "a number cannot be changed in place, so
you never see the second name". That is Python's reason, and it is not
C#'s: in C# the number is copied. The map asks the page to name the
difference after the experiment, so the section says:

- the number half cannot tell the ideas apart, and the type decides;
- a variable of type `int` holds its number, and `=` copies it. *Value
  type* is defined in the words `storing-and-computing-practice` already
  uses ("each variable of that type holds its own copy of the value"), and
  that page links here for the other kind;
- a variable of type `int[]` holds a *reference*, "a value that says where
  the array is kept in the computer's memory", and `=` copies the
  reference. *Reference type* is defined in one sentence. A list is one
  too, with an invitation to try the experiment with `List<int>` (probe
  `list-half` prints 7). This also keeps the page's title honest: it says
  "list", and the experiment uses an array;
- so `=` always copies what the variable after it holds;
- a `string` is a reference type that cannot be changed, so it behaves
  like a value (the map's sentence). The page points back to CS0200 on
  `lists-and-sequences` rather than adding a cell, to keep the page small.
  Probes `string-half` and `string-in-place` back each claim.

One paragraph ties the section to passing by value, from
`writing-your-own-functions`: a parameter gets a copy of its argument's
value, and for an array that value is a reference, so a method can change
the caller's elements (probe `method-changes-array` prints `20 30 40`).
This is the page's link to PDP-LO8 ("parameter passing"), which the map
lists and which the dewlab page did not touch. It ends "as the page about
grids showed", because the map puts that experiment on
`grids-and-references`. It can be cut as one paragraph.

**"Why idea A feels right" became "Why idea A is easy to believe"**, as in
the other closer looks: *right* is a verdict word. The paper and
shared-document paragraphs stay. The document now becomes the model for a
reference: the variable holds the link, and `=` copies the link. A closing
paragraph gives idea A its due, as the `a-total-that-starts-again` draft
does: `=` does make a copy every time, and for an array it copies the
link.

**"Where else it happens" keeps its task, a grid whose rows are one row.**
Python's `[[0, 0]] * 2` has no C# twin. The map says "a jagged array whose
rows are one array", so the cell is `int[][] grid = { row, row };`. It
prints `1 0` twice, as dewlab's printed `[[1, 0], [1, 0]]`. It keeps the
id `where-else-it-happens-1`. The prose names three names for one array
(`row`, `grid[0]`, `grid[1]`, probe `grid-one-row`). dewlab had no question
after the grid; the C# page adds one, with a fold:
`{ row[..], row[..] }` gives two separate rows (probe `grid-fold`).

This grid is less of a surprise than Python's, because `{ row, row }`
shows the name twice where `* 2` hid it. It still tests whether the reader
carries the idea to a new case. The other shape I tried is a loop that
puts one `row`, made above the loop, into each place of `new int[2][]`
(probe `grid-in-a-loop`, the same output). It is closer to a real mistake,
and it echoes `a-total-that-starts-again` (a line above a loop runs once),
but it needs `new int[2][]`, which no drafted page has taught. See open
question 3.

**Where to read more.** dewlab linked Ned Batchelder's talk on Python names
and values, which is about Python's model and not C#'s. The C# page links
the Microsoft Learn unit
[Exercise - Discover reference types](https://learn.microsoft.com/training/modules/csharp-choose-data-type/5-exercise-reference-types),
from the beginner module "Choose the correct data type in your C# code".
It runs the same experiment (`int val_B = val_A;` and
`int[] ref_B = ref_A;`), at a beginner's level, and its code runs in a cell
here (probe `learn-exercise` prints what the unit says it prints). It was
fetched on 27 September 2026. Two things to know: it says value types "are
stored in the stack", which is a simplification (an `int` inside an array
is stored with the array), and the page says only that the unit names the
stack and the heap and that this page does not need them. Its variable
names (`val_A`, `ref_A`) do not follow C#'s naming, and the page does not
mention it. Microsoft's language reference pages on
[value types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/value-types)
and
[built-in reference types](https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/reference-types)
were also read, and left out: both begin with structs, generics and
delegates.

## What C# made different, in short

- In C#, `=` copies what a variable holds. For an `int` that is the number,
  so C# really does copy it, where Python gives the number a second name.
  The ideas are restated so that neither says something untrue of C#.
- An array variable holds a reference, and `=` copies the reference. The
  page names *value type*, *reference*, and *reference type*, which the
  Python page had no need for.
- A `string` is a reference type, but it cannot be changed, so it behaves
  like a value.
- Printing an array prints its type's name, so the cells print labelled
  elements and `string.Join`.
- `row[:]` becomes `row[..]` or `row.ToArray()`; `[7]` becomes
  `new int[] { 7 }`.
- A parameter is passed by value, and for an array the value is a
  reference, so a method can change the caller's array.
- Python's `[[0, 0]] * 2` becomes `{ row, row }` in a jagged array.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `width is 5`, then `row[0] is 7` | lesson cell `an-experiment-1` |
| idea A's 5 and 5 | probe `fold-copy-range` (what a copied array gives) |
| fold 1: both changes print `width is 5`, then `row[0] is 5`; `row.ToArray()` does the same | probes `fold-copy-range`, `fold-new-array`, `fold-to-array` |
| `row` and `otherRow` hold the same reference; a range makes a different array | probe `same-reference` (`True`, then `False`) |
| `int`, `double`, `bool`, `char` are value types; `int[]`, `List<int>`, `string` are not | probe `which-are-value-types` |
| a `List<int>` gives 7 too | probe `list-half` |
| two string variables can refer to one string; `=` gives one a new string, and the other keeps the first | probe `string-half` (`True`, `False`, `word is NOON, other is MOON`) |
| a string cannot be changed: CS0200 | probe `string-in-place`; also `lists-and-sequences` cell `changing-a-list-2` |
| a method given an array changes the caller's elements | probe `method-changes-array` (`20 30 40`) |
| `1 0` twice | lesson cell `where-else-it-happens-1` |
| three names for one array | probe `grid-one-row` (`True`; `row` prints `1 0`) |
| fold 2: `1 0`, then `0 0`, and `row` is not changed | probe `grid-fold` |
| the Learn unit's experiment runs in a cell | probe `learn-exercise` |

No compiler message is quoted in the lesson, so no line or column needs
checking against the page.

## Once the page UI and the other pages exist

- **`grids-and-references` is not drafted.** Three sentences rest on the
  map's entry for it: the opening (`int[] copy = row;`), "`row.ToArray()`
  makes the same kind of copy", and "as the page about grids showed" (a
  method that changes an array it was given). Check all three against that
  page when it exists. If that page already defines *reference type*, keep
  both definitions in the same words; this page defines it again because a
  closer look may be read on its own. That page should link here, as
  dewlab's does from its first predict note ("There is a closer look at
  this").
- **The link from `storing-and-computing-practice`** ("Two names, one
  list shows a type where two names share one thing") already points here,
  and the definition of *value type* matches it word for word.
- **Inline code in predict options** (`` `1 0`, then `0 0` ``). Check that
  `web/lesson/parse.js` renders it.
- **The List invitation** asks the reader to change two lines of
  `an-experiment-1`. Their edit is saved under that cell's id, which is
  fine, but the Compare button does not apply (there is no solution).
- **Link text.** "the page about grids", "the page about methods" and "the
  page about arrays and lists" should follow whatever the other drafts
  settle on for links in prose.

## Open questions for a reviewer

1. **The restated ideas.** dewlab's idea B ("Nothing is copied") is true in
   Python for numbers and false in C#. The C# ideas are stated with the
   array in view, and the naming section says the number half cannot tell
   them apart. Is that clear enough for a Level 5 reader, or should idea B
   say outright that it is about the array only?
2. **The passing-by-value paragraph.** It is not in dewlab's page. It gives
   the page its link to PDP-LO8 and connects two earlier pages, but it
   leans on `grids-and-references`. Keep it, or leave the method case to
   the grids page alone?
3. **Which grid?** `{ row, row }` (as written) or the loop over
   `new int[2][]` (probe `grid-in-a-loop`)? The loop is the more realistic
   mistake and the better surprise; it needs syntax the grids page may or
   may not teach.
4. **The title says "list".** The map keeps dewlab's id and title, and the
   experiment uses an array, as the map asks. The page covers a `List<int>`
   with one invitation. Is that enough, or should the title say "array"?
   (Changing the title is safe; changing the id is not.)
5. **A string cell?** The string paragraph has no cell of its own, to keep
   the page at two cells. Probe `string-half` is ready if a reviewer wants
   one.
6. **The page opens with prose, not a cell**, as the other closer looks do.
   The style guide's checklist asks a page to open by running something.
7. **A challenge at the end?** The style guide asks every page to end with
   a practice page, a challenge and something to read. The map says a
   closer look has no practice page and ends with one thing to read. This
   page follows the map, as the other closer looks do.

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cell
fails on purpose.

```csharp exec
id: fold-copy-range
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row[..];
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: fold-to-array
int[] row = { 5 };
int[] otherRow = row.ToArray();
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: fold-new-array
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row;
otherRow = new int[] { 7 };
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: collection-expression
int[] row = { 5 };
int[] otherRow = row;
otherRow = [7];
Console.WriteLine($"row[0] is {row[0]}, otherRow[0] is {otherRow[0]}");
```

```csharp exec
id: list-half
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

List<int> row = new() { 5 };
List<int> otherRow = row;
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```csharp exec
id: same-reference
int[] row = { 5 };
int[] otherRow = row;
int[] copy = row[..];
Console.WriteLine(ReferenceEquals(row, otherRow));
Console.WriteLine(ReferenceEquals(row, copy));
```

```csharp exec
id: which-are-value-types
Console.WriteLine(typeof(int).IsValueType);
Console.WriteLine(typeof(double).IsValueType);
Console.WriteLine(typeof(bool).IsValueType);
Console.WriteLine(typeof(char).IsValueType);
Console.WriteLine(typeof(int[]).IsValueType);
Console.WriteLine(typeof(List<int>).IsValueType);
Console.WriteLine(typeof(string).IsValueType);
```

```csharp exec
id: string-half
string word = "NOON";
string other = word;
Console.WriteLine(ReferenceEquals(word, other));
other = "MOON";
Console.WriteLine(ReferenceEquals(word, other));
Console.WriteLine($"word is {word}, other is {other}");
```

```csharp exec
id: string-in-place
expect: CS0200
string word = "NOON";
string other = word;
other[0] = 'M';
Console.WriteLine(word);
```

```csharp exec
id: grid-fold
int[] row = { 0, 0 };
int[][] grid = { row[..], row[..] };
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
Console.WriteLine(string.Join(" ", row));
```

```csharp exec
id: grid-one-row
int[] row = { 0, 0 };
int[][] grid = { row, row };
grid[0][0] = 1;
Console.WriteLine(ReferenceEquals(grid[0], grid[1]));
Console.WriteLine(string.Join(" ", row));
```

```csharp exec
id: grid-in-a-loop
int[][] grid = new int[2][];
int[] row = { 0, 0 };
for (int i = 0; i < grid.Length; i++)
{
    grid[i] = row;
}
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
```

```csharp exec
id: learn-exercise
int val_A = 2;
int val_B = val_A;
val_B = 5;

Console.WriteLine("--Value Types--");
Console.WriteLine($"val_A: {val_A}");
Console.WriteLine($"val_B: {val_B}");

int[] ref_A= new int[1];
ref_A[0] = 2;
int[] ref_B = ref_A;
ref_B[0] = 5;

Console.WriteLine("--Reference Types--");
Console.WriteLine($"ref_A[0]: {ref_A[0]}");
Console.WriteLine($"ref_B[0]: {ref_B[0]}");
```

```csharp exec
id: method-changes-array
static void Brighten(int[] pixels)
{
    for (int i = 0; i < pixels.Length; i++)
    {
        pixels[i] = pixels[i] + 10;
    }
}

int[] row = { 10, 20, 30 };
Brighten(row);
Console.WriteLine(string.Join(" ", row));
```
