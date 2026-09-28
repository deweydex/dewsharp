---
title: "Two names, one list: a closer look at copying"
version: 2026.09.28.1
from: two-names-one-list
covers: [PDP-LO4, PDP-LO8]
---

# Two names, one list: a closer look at copying

On [the page about grids](lesson:grids-and-references),
`int[] copy = row;` did not copy anything, and a change to `copy` appeared
in `row`. Here are two ideas about what `=` does when there is a variable
after it, as in `int other = width;`. Both are reasonable, and they cannot
both be true.

**Idea A.** `=` makes a copy. After `int other = width;`, there are two
numbers, and a change to one does not change the other. In the same way,
after `int[] otherRow = row;`, there are two arrays.

**Idea B.** `=` gives the same value a second name. Nothing is copied.
After `int[] otherRow = row;`, there is one array, and `row` and
`otherRow` are two names for it.

## An experiment

The cell below does the same thing twice: once with a number, and once
with an array. The two ideas predict different things for it.

Idea A says nothing changes: `width` is still 5, and `row[0]` is still 5.

Idea B says something different for each half. In the first half,
`other = 7;` gives the name `other` a new value, so `width` is still 5. In
the second half, `row` and `otherRow` are two names for one array, and
`otherRow[0] = 7;` changes that array. So `row[0]` shows the change.

```csharp exec
id: an-experiment-1
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row;
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
```

```predict
type: choice

What will the last line print?

- `row[0] is 5`
  - This is what idea A predicts: two copies.
- `row[0] is 7`
  - This is what idea B predicts: one array with two names.
- Something else
```

Run it. It prints `width is 5`, then `row[0] is 7`, as idea B predicts.
The difference is in the third line of each half.

- `other = 7;` gives the variable `other` a new value. `width` still
  holds 5.
- `otherRow[0] = 7;` does not give `otherRow` a new value. It changes an
  element of the array itself, and `row` names that same array.

Can you change one line of the array half so that `row[0]` stays 5? There
are two different lines you could change.

```solution
title: with a copy of the array
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row[..];
otherRow[0] = 7;
Console.WriteLine($"row[0] is {row[0]}");
---
Change the second line of the array half to `int[] otherRow = row[..];`.
A range with no numbers makes a new array with every element of `row`, so
`otherRow[0] = 7;` changes the new array. The cell prints `width is 5`,
then `row[0] is 5`. `row.ToArray()` makes the same kind of copy.
```

```solution
title: with a new array
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");

int[] row = { 5 };
int[] otherRow = row;
otherRow = new int[] { 7 };
Console.WriteLine($"row[0] is {row[0]}");
---
Change the third line of the array half to `otherRow = new int[] { 7 };`.
`new int[] { 7 }` makes a new array whose one element is 7. Like
`other = 7;`, this line gives `otherRow` a new value, and `row` still
names the first array. The cell prints `width is 5`, then `row[0] is 5`.
```

## Value types and reference types

For the number, both ideas predict 5. So the first half cannot show which
idea C# follows. The answer depends on the type: C# copies an `int`, and it
does not copy an array.

A variable of type `int` holds its number itself. `int other = width;`
copies the 5 into `other`, so there are two 5s, one in each variable. An
`int` is a *value type*: each variable of that type holds its own copy of
the value. `double`, `bool` and `char` are value types too.

A variable of type `int[]` does not hold the array. It holds a
*reference*: where the array is in the computer's memory.
`int[] otherRow = row;` copies the reference, and not the array. So `row`
and `otherRow` hold the same reference, and there is one array. An array
is a *reference type*: a type whose variables hold a reference to the
value, and not the value itself. A list is a reference type too. Can you
check it? Change the first two lines of the array half to
`List<int> row = new() { 5 };` and `List<int> otherRow = row;`, and run
the cell again.

So `=` always copies what the variable after it holds. For a value type,
that is the value. For a reference type, it is the reference, and the two
variables share one value.

A method's parameter follows the same rule. On
[the page about methods](lesson:writing-your-own-functions), each
parameter got a copy of its argument's value: *passing by value*. For an
array, that value is a reference. So a method that is given an array can
change the elements of the caller's array, as the page about grids showed.

A `string` is a reference type as well. Two `string` variables can refer
to one string. But a string cannot be changed once it is made: on
[the page about arrays and lists](lesson:lists-and-sequences),
`word[0] = 'M';` did not compile (CS0200). So the only way to change a
`string` variable is to give it a new string with `=`, as `other = 7;`
gave `other` a new number. The other variable still refers to the first
string. Nothing can change a string, so it behaves like a value.

## Why idea A is easy to believe

Idea A is how numbers behave, and we all use numbers for years before we
meet an array. `other = width;` followed by `other = 7;` never changes
`width`, so the habit forms: `=` copies. It is also how paper works. Write
a number on a second sheet, change the second sheet, and the first stays
the same.

An array is more like a document that is shared online. Two people can
have the link to the same document. When one of them edits it, the other
sees the edit, because there is only one document. A reference is like
that link. `int[] otherRow = row;` gives `otherRow` a copy of the link,
and not a copy of the document.

So there is some truth in the habit. `=` does make a copy, every time. For
an array, what it copies is the link.

## Where else it happens

A grid can have the same surprise. On the page about grids, a grid was an
array of rows. Its type was `int[][]`: an array whose elements are arrays
of `int`, one for each row. What will this print?

```csharp exec
id: where-else-it-happens-1
int[] row = { 0, 0 };
int[][] grid = { row, row };
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
```

```predict
type: choice

What will the last line print?

- `0 0`
- `1 0`
```

It prints `1 0` twice. `{ row, row }` did not make two rows. It put the
same reference into the grid twice. So there is one array, with three
names: `row`, `grid[0]` and `grid[1]`.

Can you change the second line so that the grid has two rows of its own,
and only the first row changes?

```solution
int[] row = { 0, 0 };
int[][] grid = { row[..], row[..] };
grid[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
Console.WriteLine(string.Join(" ", grid[1]));
---
Change the second line to `int[][] grid = { row[..], row[..] };`. Each
range makes a new array, so the grid holds references to two different
arrays. The cell prints `1 0`, then `0 0`, and `row` itself does not
change.
```

Everything on this page runs here, in the browser, and nothing needs
Visual Studio.

## Where to read more

Microsoft. *Exercise - Discover reference types*.
<https://learn.microsoft.com/en-us/training/modules/csharp-choose-data-type/5-exercise-reference-types>.
A short exercise for beginners on Microsoft Learn. It does this page's
experiment with an `int` and an array of one element, and it shows how C#
makes an array with `new`. It also names two parts of the computer's
memory, the *stack* and the *heap*, which this page does not need. The
exercise uses Visual Studio Code, which is a different program from Visual
Studio. You do not need it: the code in that exercise also runs in a cell
on this page.
