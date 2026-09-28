---
title: "Grids and references: arrays of arrays, and two names for one array"
version: 2026.09.28.1
from: comprehensions-and-grids
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4, PDP-LO8]
---

# Grids and references: arrays of arrays, and two names for one array

Here is a small picture, kept as five rows of numbers. A 1 is a pixel that
is on, and a 0 is a pixel that is off. Before you run the cell, what do you
think `picture[1][3]` will be?

```csharp exec
id: a-grid-is-a-list-of-lists-1
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 0, 0, 1, 0, 0 },
};
Console.WriteLine(picture[1][3]);
```

```predict
type: choice

What will it print?

- 1
  - The first index chooses row 1, and the second chooses column 3 in that row.
- 0
  - Across 3 and down 1, the way a graph gives x before y.
```

It prints 1. `picture[1]` is a whole row, `{ 0, 0, 1, 1, 0 }`, and `[3]`
chooses one element from that row. So a grid's index is the row first, then
the column: down, then across. A graph gives x first, which is across, so
the two orders are easy to confuse. Can you swap the two numbers, to
`picture[3][1]`, and run it again?

On this page, we keep a whole picture in one variable, and draw it with
loops. Then we meet the idea about arrays that is most likely to surprise
you: two names for one array.

## A grid is an array of arrays

A picture, a board and a table are all *grids*: values in rows and columns.
`picture` keeps a grid as an array of rows, and each row is an array of
`int`. Its type, `int[][]`, says the same thing: an array whose elements
are `int[]`. So `picture[1]` is an `int[]`, one whole row, and
`picture[1][3]` is one `int`.

An array whose elements are arrays is called a *jagged array*. *Jagged*
means with an uneven edge. Each row is an array of its own, so the rows can
have different lengths.

Each row is made with `new int[] { ... }`, which makes a new array of `int`
with the elements between the curly brackets. On
[the page about arrays and lists](lesson:lists-and-sequences), a line such
as `int[] row = { 1, 2, 3 };` needed no `new int[]`, because the type was
already at the start of the line. Inside another array, each row needs its
own `new int[]`. What happens without it? In the next cell, the second row
has no `new int[]`. The cell is meant not to compile.

```csharp exec
id: a-grid-is-an-array-of-arrays-1
expect: CS0623
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    { 0, 0, 1, 1, 0 },
};
Console.WriteLine(picture[1][3]);
```

It did not compile, so nothing ran. The compiler's message is:

```console
Program.cs(4,5): error CS0623: Array initializers can only be used in a variable or field initializer. Try using a new expression instead.
```

An *array initializer* is the list of elements between curly brackets.
C# accepts one on its own only straight after the `=` that gives a
variable its first value, where the type is already written. Line 4 is
not in that place. The message's last sentence says what to do: a *new
expression* is code that starts with `new`, such as
`new int[] { 0, 0, 1, 1, 0 }`. Can you add `new int[]` at the start of
line 4, and run the cell again?

To draw the grid, a loop takes each row, and a loop inside it takes each
value in that row. These are the nested loops from
[the page on loops](lesson:repeating-yourself).

```csharp exec
id: a-grid-is-a-list-of-lists-2
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
    new int[] { 0, 0, 1, 1, 0 },
    new int[] { 0, 0, 1, 0, 0 },
};
foreach (int[] row in picture)
{
    foreach (int value in row)
    {
        if (value == 1)
        {
            Console.Write("#");
        }
        else
        {
            Console.Write(".");
        }
    }
    Console.WriteLine();    // the row is complete: start a new line
}
```

The outer loop's variable, `row`, is a whole row, so its type is `int[]`.
The inner loop's variable, `value`, is one pixel, so its type is `int`. Can
you draw a picture of your own? You can change the 0s and 1s, and add or
remove rows. The rows do not need to be the same length.

The page can draw in colour too. `Console.BackgroundColor` sets the colour
behind the next text the program writes, and `Console.ResetColor()` returns
to the usual colours. Can you replace `Console.Write("#");` with these three
lines, and `Console.Write(".");` with `Console.Write("  ");`, and run the
cell again?

```csharp
Console.BackgroundColor = ConsoleColor.Blue;
Console.Write("  ");
Console.ResetColor();
```

Each pixel is now two spaces wide, because a character is taller than it is
wide, and two side by side are closer to a square.

### Two dimensions in one array

C# has a second way to keep a grid. What do you think each line of this
cell prints?

```csharp exec
id: two-dimensions-in-one-array-1
int[,] picture =
{
    { 0, 0, 1, 0, 0 },
    { 0, 0, 1, 1, 0 },
    { 1, 1, 1, 1, 1 },
    { 0, 0, 1, 1, 0 },
    { 0, 0, 1, 0, 0 },
};
Console.WriteLine(picture[1, 3]);
Console.WriteLine(picture.GetLength(0));    // the number of rows
Console.WriteLine(picture.GetLength(1));    // the number of columns
Console.WriteLine(picture.Length);          // the number of elements
```

It prints 1, then 5, 5 and 25. `int[,]` is a *two-dimensional array*: one
array with rows and columns, in which every row has the same length. Its
shape is always a rectangle. Its elements go between curly brackets, with
one pair of curly brackets for each row, and no `new int[]`. One pair of
square brackets takes both indexes, with a comma between them:
`picture[1, 3]` is row 1, column 3, as before. `GetLength(0)` gives the
number of rows, and `GetLength(1)` the number of columns. `Length` gives
the number of elements, all 25 of them.

| | `int[][]`, a jagged array | `int[,]`, a two-dimensional array |
|---|---|---|
| What it is | an array of rows; each row is an array | one array, with rows and columns |
| One element | `picture[1][3]` | `picture[1, 3]` |
| One whole row | `picture[1]`, an `int[]` | none: a row is not an array of its own |
| Rows of different lengths | possible | not possible |
| The number of rows | `picture.Length` | `picture.GetLength(0)` |
| The number of columns | `picture[row].Length`, for each row | `picture.GetLength(1)` |

Which should a program use? A two-dimensional array is the simpler of the
two when every row has the same length, as in a board or a picture. A
jagged array is the one to use when the rows have different lengths, or
when a program needs a whole row as an array of its own, to give to a
method or to print with `string.Join`.

### Building a grid

`new int[3]` makes an array of three `int` values, each 0 to start.
`new int[3][]` makes an array that can hold three rows, but it does not
make the rows. So a program that builds a jagged array makes each row in a
loop. This one builds a times table. What do you think `timesTable[1][2]`
will be?

```csharp exec
id: a-grid-is-a-list-of-lists-3
int size = 3;
int[][] timesTable = new int[size][];
for (int row = 0; row < size; row++)
{
    timesTable[row] = new int[size];    // a new row of zeros
    for (int column = 0; column < size; column++)
    {
        timesTable[row][column] = (row + 1) * (column + 1);
    }
}
Console.WriteLine(timesTable[1][2]);
Console.WriteLine(string.Join(" ", timesTable[2]));
```

It prints 6, then `3 6 9`. Counting from 0, `timesTable[1][2]` is row 1,
column 2: the second row and the third column. So it holds 2 × 3, which is
6. The `+ 1` in each pair of brackets is there because the table starts at
1, and the indexes start at 0.

What happens without the line that makes each row? The next cell is the
same program, with `//` at the start of that line, so it is a comment and
does not run. The cell is meant to stop with an exception. Which line do
you think will stop it?

```csharp exec
id: building-a-grid-1
expect: exception
int size = 3;
int[][] timesTable = new int[size][];
for (int row = 0; row < size; row++)
{
    // timesTable[row] = new int[size];    // a new row of zeros
    for (int column = 0; column < size; column++)
    {
        timesTable[row][column] = (row + 1) * (column + 1);
    }
}
Console.WriteLine(timesTable[1][2]);
Console.WriteLine(string.Join(" ", timesTable[2]));
```

It prints nothing. It stops, and the page shows this report:

```console
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at line 8 of Program.cs
```

`new int[size][]` made an array for three rows, and each place in it
holds `null`, which means "no array here". Line 8 tries to put a number
into row 0, and there is no row 0, so the program cannot complete line 8.
The exception's name, `NullReferenceException`, comes from `null`, and its
message says the same thing in .NET's words. Can you delete the `//`, and run the cell again?

A two-dimensional array needs no such step. `new int[3, 3]` makes all three
rows at once, with every element 0.

### Your turn

<div class="dl-world" data-world="secret-messages">

A *Polybius square* codes each letter as two numbers: its row and its
column in a grid of the alphabet. There are 25 places, so I and J share
one. Each row of `pairs` is one letter's row and column, counting from 0
as C# does. Can you set `word` to the word that the pairs spell?

```csharp exec
id: your-turn-2--secret-messages
char[,] square =
{
    { 'A', 'B', 'C', 'D', 'E' },
    { 'F', 'G', 'H', 'I', 'K' },
    { 'L', 'M', 'N', 'O', 'P' },
    { 'Q', 'R', 'S', 'T', 'U' },
    { 'V', 'W', 'X', 'Y', 'Z' },
};
int[,] pairs = { { 1, 2 }, { 0, 4 }, { 2, 0 }, { 2, 4 } };
string word = "";

Console.WriteLine(word);
```

```inputs
word
```

```hint
after: 1 runs
How many letters are in the word? Which method of `pairs` gives that
number?
```

```hint
after: 2 runs
For letter number `i`, its row is `pairs[i, 0]` and its column is
`pairs[i, 1]`. Which element of `square` is at that row and column?
```

```solution
char[,] square =
{
    { 'A', 'B', 'C', 'D', 'E' },
    { 'F', 'G', 'H', 'I', 'K' },
    { 'L', 'M', 'N', 'O', 'P' },
    { 'Q', 'R', 'S', 'T', 'U' },
    { 'V', 'W', 'X', 'Y', 'Z' },
};
int[,] pairs = { { 1, 2 }, { 0, 4 }, { 2, 0 }, { 2, 4 } };
string word = "";
for (int i = 0; i < pairs.GetLength(0); i++)
{
    word += square[pairs[i, 0], pairs[i, 1]];
}
Console.WriteLine(word);
---
HELP. `pairs` is a grid too, with one row for each letter and two columns.
The Greek historian Polybius described a square like this for signalling
with torches: the torches raised on one side gave the row, and the torches
on the other side gave the column.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you make `negative`, the same picture with every 1 changed to 0, and
every 0 changed to 1? The cell already makes a new row for each row of the
picture. Can you fill each row?

```csharp exec
id: your-turn-2--pixel-art
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 1, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
};
int[][] negative = new int[picture.Length][];
for (int row = 0; row < picture.Length; row++)
{
    negative[row] = new int[picture[row].Length];
    // Your code: fill this row, with 0 and 1 swapped
}
foreach (int[] pixels in negative)
{
    Console.WriteLine(string.Join(" ", pixels));
}
```

```inputs
negative
picture
```

```hint
after: 1 runs
For one pixel, what is `1 - value` when `value` is 0? And when it is 1?
Which loop, inside the loop that is there, can take every column of the
row?
```

```solution
int[][] picture =
{
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 0, 1, 1, 1, 0 },
    new int[] { 1, 1, 1, 1, 1 },
};
int[][] negative = new int[picture.Length][];
for (int row = 0; row < picture.Length; row++)
{
    negative[row] = new int[picture[row].Length];
    for (int column = 0; column < picture[row].Length; column++)
    {
        negative[row][column] = 1 - picture[row][column];
    }
}
foreach (int[] pixels in negative)
{
    Console.WriteLine(string.Join(" ", pixels));
}
---
The inner loop fills one row, and the outer loop does that for every row.
`picture` itself is unchanged: the loops built a new grid, and the
`picture` row of the table shows the picture as it was.
```

</div>

## Two names for one array

An array can have more than one name. Before you run this cell, what do you
think `row` will hold at the end?

```csharp exec
id: two-names-for-one-list-1
int[] row = { 0, 0, 0, 0 };
int[] copy = row;
copy[0] = 255;
Console.WriteLine(string.Join(", ", row));
```

```predict
type: choice

What will it print?

- 0, 0, 0, 0
  - `copy` is a copy, so a change to it leaves `row` as it was.
- 255, 0, 0, 0
  - `copy` and `row` are two names for the same array.
- Nothing: it does not compile
  - An array cannot be given a second name.
```

It prints `255, 0, 0, 0`. The line `int[] copy = row;` did not copy the
array. It gave the same array a second name. An array is like a box, and
each name is like a label on it. The line put a second label on the same
box, so a change made with one name is seen with the other. One value with
two names is called *aliasing*.

Here is how it happens. A variable of an array type does not hold the
elements. It holds a *reference*: where the array is in the computer's
memory. `int[] copy = row;` copies the reference, so both names lead to the
one array. A type that works in this way is a *reference type*. Arrays and
lists are reference types. `int`, `double`, `bool` and `char` are *value
types*: each variable holds its own value, and `=` copies the value itself,
as problem 1 on
[the practice page about variables](lesson:storing-and-computing-practice)
found.

To get a separate array, a program makes a new one. `row.ToArray()` makes a
new array with the same elements. So does `row[..]`, the range from the
start to the end, because a range always makes a new array.

```csharp exec
id: two-names-for-one-list-2
int[] row = { 0, 0, 0, 0 };
int[] copy = row.ToArray();
copy[0] = 255;
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", copy));
```

Now `row` keeps its four zeros, and only `copy` starts with 255.

Numbers never cause this: `int saved = count;` copies the number. Strings
never cause it either. A string cannot be changed after it is made
(`word[0] = 'M';` does not compile, as
[the page about arrays and lists](lesson:lists-and-sequences) found), so
`=` can only give a name a different string. The other names keep the old
one.

### Inside a method

A method's parameter is one more name. [The page on
methods](lesson:writing-your-own-functions) found that each parameter gets
a copy of its argument's value: *passing by value*. So a method that gives
its `int` parameter a new value changes only its own copy.

```csharp exec
id: inside-a-method-1
static void BrightenPixel(int pixel)
{
    pixel = pixel + 10;
}

int brightness = 10;
BrightenPixel(brightness);
Console.WriteLine(brightness);
```

It prints 10. Here is the same idea with an array. What do you think this
cell prints?

```csharp exec
id: two-names-for-one-list-3
static void BrightenRow(int[] pixels)
{
    for (int index = 0; index < pixels.Length; index++)
    {
        pixels[index] = pixels[index] + 10;
    }
}

int[] row = { 10, 20, 30 };
BrightenRow(row);
Console.WriteLine(string.Join(", ", row));
```

```predict
type: choice

What will it print?

- 10, 20, 30
  - `pixels` is a copy, as the `int` parameter was.
- 20, 30, 40
  - `pixels` and `row` are two names for one array.
```

It prints `20, 30, 40`. The method changed the array of the code that
called it, its *caller*. `pixels` did get a copy of its argument's value,
as the page on methods said. But the value in `row` is a reference, so
`pixels` got a copy of the reference, and it leads to the same array.

So there are two different actions, and only one of them is seen outside
the method:

| Inside the method | Seen by the code that called it? |
|---|---|
| A parameter gets a new value with `=`, such as `pixel = pixel + 10;` | No. It changes only the method's own copy. |
| An element of an array parameter changes, such as `pixels[index] = ...;` | Yes. The caller's name leads to the same array. |

What if the method gives `pixels` a new value first? The next cell is the
same, with one new line at the start of `BrightenRow`:
`pixels = new int[3];`. What do you think `row` holds now?

```csharp exec
id: inside-a-method-2
static void BrightenRow(int[] pixels)
{
    pixels = new int[3];
    for (int index = 0; index < pixels.Length; index++)
    {
        pixels[index] = pixels[index] + 10;
    }
}

int[] row = { 10, 20, 30 };
BrightenRow(row);
Console.WriteLine(string.Join(", ", row));
```

<details class="dl-answer"><summary>what happens</summary>

It prints `10, 20, 30`. The new line gives `pixels` a new value, a new
array of three zeros, so the loop changes that array. `row` still leads to
the old array, and nothing changed it. This is the first row of the table:
a parameter that gets a new value with `=`.

</details>

A method that changes the array it was given can surprise the code that
calls it. So it is worth deciding on purpose whether a method returns a new
array or changes the one it was given, and letting its name say which.

### The grid that was one row

The times-table cell made each row inside its loop, with `new int[size]`.
Why not make one row before the loop, and use it for every row? This cell
does that, and then changes one element.

```csharp exec
id: two-names-for-one-list-4
int[] zeros = new int[3];
int[][] grid = new int[3][];
for (int row = 0; row < 3; row++)
{
    grid[row] = zeros;
}
grid[0][0] = 5;
foreach (int[] pixels in grid)
{
    Console.WriteLine(string.Join(" ", pixels));
}
```

One change appears in all three rows. The loop did not make three rows. It
put a reference to the same array into the grid three times. There is one
row, with four names: `zeros`, `grid[0]`, `grid[1]` and `grid[2]`.

Can you change the line in the loop to `grid[row] = new int[3];`, and run
the cell again? Which rows start with 5 now? `new int[3]` now runs once
each time the loop repeats, so it makes three separate rows. Each time
`new` runs, it makes one new array, so the number of times `new` runs is
the number of arrays.

The same thing happens when a grid is copied with `grid.ToArray()`. That
makes a new outer array, and puts references to the same rows in it.
Problem 5 on the
[practice page](lesson:grids-and-references-practice#5-a-copy-that-is-not)
shows it. To copy the rows too, a loop copies each one:

```csharp
int[][] copy = new int[grid.Length][];
for (int row = 0; row < grid.Length; row++)
{
    copy[row] = grid[row].ToArray();
}
```

### Your turn

<div class="dl-world" data-world="secret-messages">

This code is meant to keep a message, and make a coded copy of it. It loses
the message. Can you see why, and change it so that `message` stays `MEET`?

```csharp exec
id: your-turn-3--secret-messages
char[] message = { 'M', 'E', 'E', 'T' };
char[] coded = message;
for (int index = 0; index < coded.Length; index++)
{
    coded[index] = (char)((coded[index] - 'A' + 3) % 26 + 'A');
}
Console.WriteLine(message);
Console.WriteLine(coded);
```

```inputs
message
coded
```

```hint
after: 1 runs
After `char[] coded = message;`, how many arrays are there? How could
`coded` start as a separate array with the same letters?
```

```solution
char[] message = { 'M', 'E', 'E', 'T' };
char[] coded = message.ToArray();
for (int index = 0; index < coded.Length; index++)
{
    coded[index] = (char)((coded[index] - 'A' + 3) % 26 + 'A');
}
Console.WriteLine(message);
Console.WriteLine(coded);
---
With `message.ToArray()`, `coded` starts as a new array, so the loop
changes only that one. The message stays `MEET`, and the code is `PHHW`.
`Console.WriteLine` prints a `char[]` as text, as the page about arrays and
lists found.
```

</div>

<div class="dl-world" data-world="pixel-art">

This code is meant to keep a row of pixels, and make a darker copy of it.
It loses the original. Can you see why, and change it so that `row` stays
as it was?

```csharp exec
id: your-turn-3--pixel-art
int[] row = { 200, 150, 100, 50 };
int[] darker = row;
for (int index = 0; index < darker.Length; index++)
{
    darker[index] = darker[index] / 2;
}
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", darker));
```

```inputs
row
darker
```

```hint
after: 1 runs
After `int[] darker = row;`, how many arrays are there? How could `darker`
start as a separate array with the same pixels?
```

```solution
title: copying first
int[] row = { 200, 150, 100, 50 };
int[] darker = row.ToArray();
for (int index = 0; index < darker.Length; index++)
{
    darker[index] = darker[index] / 2;
}
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", darker));
---
With `row.ToArray()`, `darker` starts as a new array, so the loop changes
only that one.
```

```solution
title: building a new array
int[] row = { 200, 150, 100, 50 };
int[] darker = new int[row.Length];
for (int index = 0; index < darker.Length; index++)
{
    darker[index] = row[index] / 2;
}
Console.WriteLine(string.Join(", ", row));
Console.WriteLine(string.Join(", ", darker));
---
`new int[row.Length]` makes a new array of zeros, with the same length as
`row`, and the loop fills it. The loop reads `row` and never changes it.
```

</div>

## Looking back

Two names for one array is the idea on this page most likely to surprise
you, weeks from now, in a program much longer than these. When is it
useful that a method can change the array it was given? When could it
cause trouble?

A challenge: write a message in rows of four letters, then read it down the
columns. That is a *transposition cipher*, and the same move changes a
grid's rows into its columns. Can you read the coded message down the
columns of this grid? Can you decode it again?

```csharp challenge
// Write the message in rows of four, then read it down the columns.
string message = "MEETMEATNOONXXXX";
char[,] grid = new char[4, 4];
for (int index = 0; index < message.Length; index++)
{
    grid[index / 4, index % 4] = message[index];    // row, then column
}
// Read the columns: column 0 is the first letter of every row.
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:grids-and-references-practice) has more
problems about grids and references. After it,
[Two names, one list](lesson:two-names-one-list) looks closely at two
names for one array, with one experiment on an `int` and on an array. Then
[Dictionaries](lesson:looking-things-up-by-name) keeps values under names
of their own, and uses one to hold a cipher's key.

## Where to read more

Microsoft. *The array reference type (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/arrays>.
This page describes how C# makes and uses arrays. Its sections
"Multidimensional arrays" and "Jagged arrays" are about the two kinds of
grid on this page, and its part on passing an array to a method shows a
method that changes the caller's array. Many of its examples write elements
between square brackets, where this page writes curly brackets. Its jagged
arrays look like `[[1, 3, 5], [0, 2, 4]]`, with no `new int[]`. C# accepts
both ways.

Skeet, J. *Parameter passing in C#.*
<https://jonskeet.uk/csharp/parameters.html>. This article is written for
programmers, and its first sections are short and clear. They explain
reference types, value types, and what a method's parameter receives, as
this page does. The rest is about `ref`, `out` and `params` parameters,
which these pages do not write.

argonaut (2022). *Cellular Automata: Life from Simple Rules.*
<https://www.youtube.com/watch?v=wbPgoZ2d0Nw>. This video shows a grid of
cells, where each cell counts its neighbours to decide what it will be
next. The rules of Conway's Game of Life can use an array of arrays like
the ones on this page. It is about seven minutes long. The second half is
about making it run fast in Unity, a game engine whose programs are
written in C#.
