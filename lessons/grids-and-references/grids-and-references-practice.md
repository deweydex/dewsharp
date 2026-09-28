---
title: "Grids and references: practice"
version: 2026.09.28.1
from: comprehensions-and-grids-practice
practice_for: grids-and-references
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Grids and references: practice

These problems are on grids and on two names for one array, with three
from earlier pages. Each problem has an answer or a solution under it, for
when you have tried it. Some cells are meant not to compile, or to stop
with an exception, and the problem says so.

## 1. Row, then column

The cell below prints `grid[1][0]` first: row 1, column 0. Then it prints
(a) to (f), in order. What do you think each of them gives? Run the cell
and see.

- (a) `grid[0][2]`
- (b) `grid[^1][0]`
- (c) `grid.Length`
- (d) `grid[1].Length`
- (e) `table[1, 2]`
- (f) `table.Length`

```csharp exec
id: row-then-column-1
int[][] grid =
{
    new int[] { 1, 2, 3 },
    new int[] { 4, 5, 6 },
};
int[,] table = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(grid[1][0]);
Console.WriteLine(grid[0][2]);
Console.WriteLine(grid[^1][0]);
Console.WriteLine(grid.Length);
Console.WriteLine(grid[1].Length);
Console.WriteLine(table[1, 2]);
Console.WriteLine(table.Length);
```

<details class="dl-answer"><summary>answer</summary>

The first line is 4: row 1, column 0.

(a) 3. (b) 4: `^1` is the last row, and `[0]` is the first element in it.
(c) 2, the number of rows. (d) 3, the number of elements in row 1. (e) 6.
(f) 6, the number of elements, not the number of rows.

</details>

What about `table[1][2]`, and `grid[1, 2]`? The next cell tries both. It
is meant not to compile.

```csharp exec
id: row-then-column-2
expect: CS0022
int[][] grid =
{
    new int[] { 1, 2, 3 },
    new int[] { 4, 5, 6 },
};
int[,] table = { { 1, 2, 3 }, { 4, 5, 6 } };
Console.WriteLine(table[1][2]);
Console.WriteLine(grid[1, 2]);
```

<details class="dl-answer"><summary>answer</summary>

It did not compile, so nothing ran. The compiler gives two messages, one
for each line, with the same code:

```console
Program.cs(7,19): error CS0022: Wrong number of indices inside []; expected 2
Program.cs(8,19): error CS0022: Wrong number of indices inside []; expected 1
```

*Indices* is another word for indexes. A two-dimensional array takes both
indexes in one pair of square brackets, `table[1, 2]`, so it expects 2
there. A jagged array takes one index in each pair, `grid[1][2]`, so it
expects 1.

</details>

## 2. A second name for a list

The second line of this cell is meant to keep a copy of the scores, before
the third line changes the list. What do you think the last line prints?
Run it and see.

```csharp exec
id: b-equals-a-1
List<int> scores = new() { 1, 2, 3 };
List<int> saved = scores;
saved.Add(4);
Console.WriteLine(string.Join(", ", scores));
```

<details class="dl-answer"><summary>why</summary>

`1, 2, 3, 4`. A list is a reference type, as an array is.
`List<int> saved = scores;` copied the reference, not the list, so both
names lead to one list, and `Add` changed that list.
`List<int> saved = scores.ToList();` makes a separate list with the same
elements. Can you change the second line to that, and run the cell again?

</details>

## 3. A method that adds

```csharp exec
id: a-function-that-adds-1
static void AddItem(List<string> items)
{
    items.Add("new");
}

List<string> things = new() { "a", "b" };
AddItem(things);
Console.WriteLine(string.Join(", ", things));
```

```predict
type: choice

What will it print?

- a, b
  - What happens inside a method stays inside it.
- a, b, new
  - `items` and `things` are two names for one list.
```

<details class="dl-answer"><summary>why</summary>

`a, b, new`. The method never gave `items` a new value with `=`, which
would have changed only its own copy. It changed the list that `items`
leads to, and `things` leads to the same list. It is problem 2 again, with
the second name made by a call.

</details>

## 4. Two rows, one array

What do you think this cell prints?

```csharp exec
id: two-rows-one-list-1
int[] row = new int[3];
int[][] rows = { row, row };
rows[1][0] = 7;
Console.WriteLine(string.Join(" ", rows[0]));
Console.WriteLine(string.Join(" ", rows[1]));
```

<details class="dl-answer"><summary>why</summary>

`7 0 0`, twice. `{ row, row }` did not make two rows. It put two references
to one array into the grid. Two separate rows each need their own `new`:
`int[][] rows = { new int[3], new int[3] };`. Can you change the second
line to that, and run the cell again? Which rows start with 7 now?

</details>

## 5. A copy that is not

```csharp exec
id: a-copy-that-is-not-1
int[][] grid =
{
    new int[] { 0, 0 },
    new int[] { 0, 0 },
};
int[][] copy = grid.ToArray();
copy[0][0] = 1;
Console.WriteLine(string.Join(" ", grid[0]));
```

```predict
type: choice

What will it print?

- 0 0
  - `grid.ToArray()` made a copy, so `grid` is left as it was.
- 1 0
  - The copy is a new outer array, which holds the same rows.
```

<details class="dl-answer"><summary>why</summary>

`1 0`. `grid.ToArray()` made a new outer array, and put in it references to
the same two rows. So `copy[0]` and `grid[0]` are one row with two names.
To copy the rows as well, a loop copies each one:

```csharp
int[][] copy = new int[grid.Length][];
for (int row = 0; row < grid.Length; row++)
{
    copy[row] = grid[row].ToArray();
}
```

Can you put these lines in place of the line with `grid.ToArray()`, and run
the cell again?

</details>

## 6. The same elements, or the same array?

```csharp exec
id: same-elements-1
int[] first = { 1, 2, 3 };
int[] second = { 1, 2, 3 };
Console.WriteLine(first == second);
```

```predict
type: choice

What will it print?

- True
  - They hold the same elements, in the same order.
- False
  - They are two different arrays.
```

<details class="dl-answer"><summary>why</summary>

`False`. For two arrays, `==` asks whether the two names lead to the same
array. It does not compare the elements. `first` and `second` were each
made by a line of their own, so they are two arrays.

</details>

So how can a program ask whether two arrays hold the same elements?
`first.SequenceEqual(second)` compares them one by one, in order. What do
you think this cell prints?

```csharp exec
id: same-elements-2
int[] first = { 1, 2, 3 };
int[] second = { 1, 2, 3 };
int[] third = first;
Console.WriteLine(first == third);
Console.WriteLine(first.SequenceEqual(second));
```

<details class="dl-answer"><summary>why</summary>

`True`, twice. `third` is a second name for the array that `first` names,
so `first == third` finds one array. `SequenceEqual` finds the same
elements in `first` and `second`, in the same order. Strings are
different: `==` on two strings compares their text, as
[the page on decisions](lesson:making-decisions) said.

</details>

## 7. A times table

Can you fill `timesTable`, a grid of 4 rows and 4 columns, so that its first
row is `1 2 3 4` and its last row is `4 8 12 16`?

```csharp exec
id: a-times-table-1
int[,] timesTable = new int[4, 4];
// Your code: fill every element

for (int row = 0; row < timesTable.GetLength(0); row++)
{
    for (int column = 0; column < timesTable.GetLength(1); column++)
    {
        Console.Write($"{timesTable[row, column]} ");
    }
    Console.WriteLine();
}
```

```inputs
timesTable[0, 3]
timesTable[3, 3]
timesTable[2, 1]
```

```hint
after: 1 runs
What goes at row 2, column 1? The table starts at 1, and the indexes start
at 0. Which two numbers are multiplied there?
```

```solution
int[,] timesTable = new int[4, 4];
for (int row = 0; row < 4; row++)
{
    for (int column = 0; column < 4; column++)
    {
        timesTable[row, column] = (row + 1) * (column + 1);
    }
}

for (int row = 0; row < timesTable.GetLength(0); row++)
{
    for (int column = 0; column < timesTable.GetLength(1); column++)
    {
        Console.Write($"{timesTable[row, column]} ");
    }
    Console.WriteLine();
}
---
One pair of loops fills the table, and the second pair prints it.
`new int[4, 4]` made every row at once, so there is no row to make before
it is filled. Row 2, column 1 holds 3 × 2, which is 6.
```

## 8. Rows that are not there yet

This cell is meant to stop with an exception. Before you run it, which line
do you think will stop it? Then can you add one line, so that it prints 1?

```csharp exec
id: rows-not-there-yet-1
expect: exception
int[][] grid = new int[3][];
grid[0][0] = 1;
Console.WriteLine(grid[0][0]);
```

```hint
What does `new int[3][]` put in each of its three places?
```

```solution
int[][] grid = new int[3][];
grid[0] = new int[4];
grid[0][0] = 1;
Console.WriteLine(grid[0][0]);
---
The cell stops at line 2 with a `NullReferenceException`. `new int[3][]`
made an array that can hold three rows, and each place holds `null`: no
row yet. `grid[0] = new int[4];` makes row 0, four zeros, before the next
line changes one of them. Rows 1 and 2 are still `null`, and nothing in
this program uses them.
```

## 9. In the square, or out of it

<div class="dl-world" data-world="secret-messages">

Can you write `Encode(string word, char[,] square)`, which gives the
Polybius pairs for a word? For each letter, it gives the letter's row and
column in the square, counting from 0: `"12"` for H.

```csharp exec
id: in-the-square-1--secret-messages
static string Encode(string word, char[,] square)
{
    List<string> pairs = new();
    // Your code: add a pair, such as "12", for each letter
    return string.Join(" ", pairs);
}

char[,] square =
{
    { 'A', 'B', 'C', 'D', 'E' },
    { 'F', 'G', 'H', 'I', 'K' },
    { 'L', 'M', 'N', 'O', 'P' },
    { 'Q', 'R', 'S', 'T', 'U' },
    { 'V', 'W', 'X', 'Y', 'Z' },
};
Console.WriteLine(Encode("HELP", square));
```

```inputs
Encode("HELP", square)
Encode("OTTER", square)
Encode("", square)          // an empty word
Encode("JAM", square)       // J is not in the square
```

```hint
after: 1 runs
For one letter, which two loops, one inside the other, can check every row
and every column of the square? When the element there is the letter,
what does the method add to `pairs`?
```

```hint
after: 2 runs
`$"{row}{column}"` makes one string from the two numbers, such as `"12"`.
```

```solution
static string Encode(string word, char[,] square)
{
    List<string> pairs = new();
    foreach (char letter in word)
    {
        for (int row = 0; row < square.GetLength(0); row++)
        {
            for (int column = 0; column < square.GetLength(1); column++)
            {
                if (square[row, column] == letter)
                {
                    pairs.Add($"{row}{column}");
                }
            }
        }
    }
    return string.Join(" ", pairs);
}

char[,] square =
{
    { 'A', 'B', 'C', 'D', 'E' },
    { 'F', 'G', 'H', 'I', 'K' },
    { 'L', 'M', 'N', 'O', 'P' },
    { 'Q', 'R', 'S', 'T', 'U' },
    { 'V', 'W', 'X', 'Y', 'Z' },
};
Console.WriteLine(Encode("HELP", square));
---
Three loops, one inside the next: each letter, each row, each column.
`JAM` gives only two pairs, because no place in the square holds J, so the
J adds nothing. What should `Encode` do with a J? The square keeps I and J
in one place, so one choice is to code a J as an I.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `Mirror(int[][] picture)`, which returns a new picture with
each row reversed, and leaves `picture` itself as it was? The cell prints
nothing at first. **Compare with a solution** shows what your `Mirror`
gives, and what `picture` holds after the call.

```csharp exec
id: in-the-square-1--pixel-art
static int[][] Mirror(int[][] picture)
{
    int[][] result = new int[picture.Length][];
    // Your code: a new row for each row of picture, backwards
    return result;
}

int[][] picture =
{
    new int[] { 1, 0, 0, 0 },
    new int[] { 1, 1, 0, 0 },
    new int[] { 1, 1, 1, 0 },
};
int[][] mirrored = Mirror(picture);
```

```inputs
mirrored
picture                                                        // after the call
Mirror(new int[][] { new int[] { 1, 2, 3 } })
Mirror(new int[][] { new int[] { 1, 2 }, new int[] { 3, 4, 5 } })   // rows of different lengths
```

```hint
after: 1 runs
For one row, can you make a new array of the same length, and fill it from
the end of the old row? On the page about methods, `Mirror(x, width)` gave
the column that `x` moves to: `width - 1 - x`.
```

```solution
title: with what you've met so far
static int[][] Mirror(int[][] picture)
{
    int[][] result = new int[picture.Length][];
    for (int row = 0; row < picture.Length; row++)
    {
        int width = picture[row].Length;
        result[row] = new int[width];
        for (int column = 0; column < width; column++)
        {
            result[row][column] = picture[row][width - 1 - column];
        }
    }
    return result;
}

int[][] picture =
{
    new int[] { 1, 0, 0, 0 },
    new int[] { 1, 1, 0, 0 },
    new int[] { 1, 1, 1, 0 },
};
int[][] mirrored = Mirror(picture);
```

```solution
title: a shorter way C# has
static int[][] Mirror(int[][] picture)
{
    int[][] result = new int[picture.Length][];
    for (int row = 0; row < picture.Length; row++)
    {
        result[row] = picture[row].ToArray();
        Array.Reverse(result[row]);
    }
    return result;
}

int[][] picture =
{
    new int[] { 1, 0, 0, 0 },
    new int[] { 1, 1, 0, 0 },
    new int[] { 1, 1, 1, 0 },
};
int[][] mirrored = Mirror(picture);
---
`Array.Reverse` reverses an array in place: it changes the array it is
given. So this solution reverses a copy of each row. With
`Array.Reverse(picture[row])`, the caller's picture would be reversed too,
and the `picture` row of the table would show it.
```

</div>

## 10. Pair by pair

Can you fill `products` with the two arrays multiplied element by element?
`{ 1, 2, 3 }` and `{ 4, 5, 6 }` give `4, 10, 18`.

```csharp exec
id: pair-by-pair-1
int[] first = { 1, 2, 3 };
int[] second = { 4, 5, 6 };
int[] products = new int[first.Length];
// Your code: first times second, at each index

Console.WriteLine(string.Join(", ", products));
```

```inputs
products
```

```hint
after: 1 runs
The loop needs the same index in both arrays. Which loop gives the index,
and not only the element?
```

```solution
int[] first = { 1, 2, 3 };
int[] second = { 4, 5, 6 };
int[] products = new int[first.Length];
for (int index = 0; index < first.Length; index++)
{
    products[index] = first[index] * second[index];
}
Console.WriteLine(string.Join(", ", products));
---
A `foreach` loop gives each element of one array, but not the index, and
the index is what finds the partner in the other array.
```

## 11. A check digit

A code can find mistakes as well as hide things. An old book number, an
ISBN-10, has ten digits, with the weights 10, 9, 8 and so on, to 1. When
each digit is multiplied by its weight, the sum of the results can always
be divided by 11. If one digit is copied with a mistake, it no longer can.

Multiplying two arrays pair by pair and adding the results is called a
*dot product*. Can you write `DotProduct(int[] first, int[] second)`, and
use it to check the number 0-306-40615-2?

```csharp exec
id: a-check-digit-1
static int DotProduct(int[] first, int[] second)
{
    // Your code: multiply each pair, and return the total
    return 0;
}

int[] digits = { 0, 3, 0, 6, 4, 0, 6, 1, 5, 2 };
int[] weights = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
Console.WriteLine(DotProduct(digits, weights));
Console.WriteLine(DotProduct(digits, weights) % 11);
```

```inputs
DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 })
DotProduct(digits, weights)
DotProduct(new int[0], new int[0])      // two empty arrays
```

```hint
after: 1 runs
A for loop can give every index of `first`, one at a time. At each index,
multiply the two elements, and add the result to a running total.
```

```solution
static int DotProduct(int[] first, int[] second)
{
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

int[] digits = { 0, 3, 0, 6, 4, 0, 6, 1, 5, 2 };
int[] weights = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
Console.WriteLine(DotProduct(digits, weights));
Console.WriteLine(DotProduct(digits, weights) % 11);
---
The dot product is 132, which is 11 × 12, so the remainder is 0. Can you
change one digit, and see the remainder change? What should `DotProduct` do
when the two arrays have different lengths? Problem 12 asks.
```

## 12. Different lengths

This is the `DotProduct` from problem 11. The cell is meant to stop with an
exception. What does each line do, and which is worse? Then, what do you
think `DotProduct` should do when the two arrays have different lengths?

```csharp exec
id: different-lengths-1
expect: exception
static int DotProduct(int[] first, int[] second)
{
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

Console.WriteLine(DotProduct(new int[] { 1, 2 }, new int[] { 3, 4, 5 }));
Console.WriteLine(DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5 }));
```

<details class="dl-answer"><summary>what each line does</summary>

The first call prints 11. It used the first two elements of `second`, and
ignored the 5, with no message. The second call stops with an exception,
because `second` has no index 2. The page shows this report:

```console
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
   at line 6 of Program.cs (in DotProduct(int[], int[]))
   at line 12 of Program.cs
```

The quiet answer is the more dangerous of the two. It answers a question
that nobody asked, and nothing shows that it happened. The exception at
least stops the program, and says what the problem is. The report names
two lines. Line 6, inside `DotProduct`, is where `second[index]` failed.
Line 12 is the call that ran the method, and it is the line that is
responsible: it gave two arrays of different lengths.
[Exceptions](lesson:reading-an-error-message) reads a report in the same
way.

</details>

```solution
title: a way you'll meet later
static int DotProduct(int[] first, int[] second)
{
    if (first.Length != second.Length)
    {
        throw new ArgumentException("DotProduct needs two arrays of the same length");
    }
    int total = 0;
    for (int index = 0; index < first.Length; index++)
    {
        total += first[index] * second[index];
    }
    return total;
}

Console.WriteLine(DotProduct(new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 }));
---
`throw` stops the method with an exception of its own, and a message that
says what the problem is. With this `DotProduct` in the cell, the first
call stops at the check, before the method reads any element, and the
report gives the message.
[Reusable methods](lesson:building-reusable-tools), later in the course,
shows `throw`. With only what you've met so far, `DotProduct` has no good
way to say "no answer": it returns an `int`, and every `int` could be a
real dot product, even 0 or -1.
```

## 13. From earlier: where the cut is

From [the page on arrays and lists](lesson:lists-and-sequences). What do
you think this cell prints?

```csharp exec
id: from-earlier-where-the-cut-is-1
string word = "ALGORITHMS";
Console.WriteLine(word[2..5]);
```

<details class="dl-answer"><summary>why</summary>

`GOR`. A range takes a part of a string in the same way as a part of an
array, and gives a new string. The numbers are the cuts between the
letters, and a range keeps what lies between two cuts: three letters.

</details>

## 14. From earlier: one name, two places

From [the page on methods](lesson:writing-your-own-functions).

```csharp exec
id: from-earlier-one-name-two-places-1
int total = 5;

static int AddOne()
{
    int total = 10;
    return total + 1;
}

Console.WriteLine(AddOne());
Console.WriteLine(total);
```

What do you think the last line prints? Run it and see.

<details class="dl-answer"><summary>why</summary>

5. The first line prints 11. The line `int total = 10;` has a type in front
of it, so it made a new variable, local to `AddOne`. The `total` outside
never changed. Compare problem 3: there, no variable got a new value, and a
list was changed through a second name.

</details>

## 15. From earlier: a total for each row

From [the closer look at starting a total](lesson:a-total-that-starts-again).
This program is meant to print how many pixels are on in each row: 2, then
3, then 1. What does it print? Can you move one line, so that it prints 2,
3 and 1?

```csharp exec
id: from-earlier-a-total-for-each-row-1
int[][] picture =
{
    new int[] { 1, 0, 1, 0 },
    new int[] { 1, 1, 1, 0 },
    new int[] { 0, 0, 1, 0 },
};
int total = 0;
foreach (int[] row in picture)
{
    foreach (int pixel in row)
    {
        total += pixel;
    }
    Console.WriteLine(total);
}
```

```hint
after: 1 runs
Where does each row's count start? How many times does the line
`int total = 0;` run?
```

```solution
int[][] picture =
{
    new int[] { 1, 0, 1, 0 },
    new int[] { 1, 1, 1, 0 },
    new int[] { 0, 0, 1, 0 },
};
foreach (int[] row in picture)
{
    int total = 0;
    foreach (int pixel in row)
    {
        total += pixel;
    }
    Console.WriteLine(total);
}
---
It printed 2, 5 and 6: a running total for the whole picture. Inside the
outer loop, `int total = 0;` runs once for each row, so each row's count
starts at 0. It is the closer look's experiment again, with a grid.
```
