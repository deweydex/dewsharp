---
title: "The Game of Life: a grid that changes by itself"
version: 2026.09.28.1
from: comprehensions-and-grids
covers: [PDP-LO7, PDP-LO8]
---

# The Game of Life: a grid that changes by itself

Here is a grid with four shapes on it, drawn with `#` and `.`. Each time
you press Enter, the program draws the grid again, one step later. Run it,
and press Enter a few times. What does each shape do?

```csharp exec
id: a-grid-that-changes-1
stdin: "\n\n\n\n\n\n\n\nq\n"
string[] picture =
{
    "........................",
    ".#......................",
    "..#...........###.......",
    "###.....................",
    "...................###..",
    "..................###...",
    "........................",
    "...............##.......",
    "...............##.......",
    "........................",
};
bool[,] grid = FromPicture(picture);
int generation = 0;
string typed;
do
{
    Console.Clear();
    Console.WriteLine($"Generation {generation}");
    Draw(grid);
    Console.Write("Press Enter for the next generation, or type q to stop: ");
    typed = Console.ReadLine();
    grid = Step(grid);
    generation++;
}
while (typed != null && typed != "q");

// The methods that the program above uses

static bool[,] FromPicture(string[] picture)
{
    bool[,] grid = new bool[picture.Length, picture[0].Length];
    for (int row = 0; row < picture.Length; row++)
    {
        for (int column = 0; column < picture[row].Length; column++)
        {
            grid[row, column] = picture[row][column] == '#';
        }
    }
    return grid;
}

static void Draw(bool[,] grid)
{
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            if (grid[row, column])
            {
                Console.Write("#");
            }
            else
            {
                Console.Write(".");
            }
        }
        Console.WriteLine();
    }
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            bool inside = nearRow >= 0 && nearRow < grid.GetLength(0)
                && nearColumn >= 0 && nearColumn < grid.GetLength(1);
            if (inside && !itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}

static bool WillBeAlive(bool alive, int neighbours)
{
    if (alive)
    {
        return neighbours == 2 || neighbours == 3;
    }
    return neighbours == 3;
}

static bool[,] Step(bool[,] grid)
{
    bool[,] next = new bool[grid.GetLength(0), grid.GetLength(1)];
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            int neighbours = CountNeighbours(grid, row, column);
            next[row, column] = WillBeAlive(grid[row, column], neighbours);
        }
    }
    return next;
}
```

The program waits after each picture. Press Enter without typing anything,
and it draws the next one. To stop, type `q` and press Enter, or press
**End input**. Each time, the program empties the console and draws the
whole grid again, so you can watch the shapes change.

Here is what the four shapes do:

- The square of four `#`, near the bottom, never changes.
- The line of three `#`, at the top, changes from across to down, and then
  back to across, with every step.
- The shape of six `#`, on the right, changes too, and after every second
  step it is back where it started.
- The shape of five `#`, at the top left, moves. Compare generation 0 with
  generation 4: it has the same shape, one row lower and one column
  further right.

This is the *Game of Life*. The mathematician John Conway invented it in
1970. It is a game with no players: you choose the first picture, and after
that, the rules decide everything. Each square of the grid is a *cell*. A
cell is *alive*, drawn as `#`, or *dead*, drawn as `.`. Each picture is a
*generation*, and the program counts the generations from 0.

On this page, a *cell* is always a square of the grid. The boxes of code on
the page are called *programs*.

People who study the Game of Life have given names to shapes like these. A
shape that never changes, like the square, is a *still life*. A shape that
returns to its first picture after a few generations, like the line of
three, is an *oscillator*. A shape that moves across the grid is a
*spaceship*, and the spaceship of five cells at the top left is called a
*glider*.

Nothing in the program says "move the glider". Every cell follows the same
four short rules, and the movement comes from the rules alone. A grid of
cells that all follow the same simple rules, where each cell looks only at
the cells next to it, is called a *cellular automaton*. The Game of Life is
the most famous one.

This page is an extra. It uses the grids of
[Grids and references](lesson:grids-and-references), the methods of
[Methods](lesson:writing-your-own-functions), and the loop that reads input
from [Reading input](lesson:reading-input). On it, we write the four rules
in C#.

## How the program is built

The program is longer than most on these pages, and you do not need to read
all of it now. At the top are the picture and a loop. Under them are five
methods, which the loop uses:

| Method | Its job |
|---|---|
| `FromPicture` | makes the grid from the picture |
| `Draw` | draws the grid on the console |
| `CountNeighbours` | counts the live cells next to one cell |
| `WillBeAlive` | uses the rules to decide whether one cell will be alive in the next generation |
| `Step` | makes the next generation of the whole grid |

The loop calls methods that are written under it. C# reads and checks the
whole program before it runs any of it, so a call can come before its
method, as [Methods](lesson:writing-your-own-functions) found. On this
page, each program has its statements at the top and its methods under
them, because the picture at the top is the part you will change most
often.

Each Run starts a new program. It runs from the first line of the program
to the last. So each program on this page has its own copy of every method
it uses.

### A grid of true and false

The grid is a `bool[,]`: a two-dimensional array, as on
[Grids and references](lesson:grids-and-references), whose elements are
`bool` values. `true` is a live cell, and `false` is a dead one. In the
next program, no line gives `grid[0, 0]` a value.

```csharp exec
id: a-grid-of-true-and-false-1
bool[,] grid = new bool[3, 4];    // 3 rows and 4 columns
grid[1, 2] = true;
Console.WriteLine(grid[1, 2]);
Console.WriteLine(grid[0, 0]);
Console.WriteLine(grid.GetLength(0));
Console.WriteLine(grid.GetLength(1));
```

```predict
type: choice

What will the second line of the output be?

- False
  - `new bool[3, 4]` gives every element a value before any other line
    runs.
- True
  - `grid[1, 2] = true;` makes one element `true`. Is `grid[0, 0]` that
    element?
- Nothing: it does not compile
  - C# does not let a program read a variable before it has a value. Is
    an element of an array a variable of that kind?
```

It prints `True`, then `False`, then 3 and 4. `new bool[3, 4]` makes a grid
of 3 rows and 4 columns, and every element starts as `false`. So a new grid
holds only dead cells, and a program needs to set only the live ones.
`Console.WriteLine` shows a `bool` as `True` or `False`, with a capital
letter. In C# code, the two values are `true` and `false`.

`FromPicture`, in the first program, makes its grid in the same way. It
makes a new `bool[,]` with one row for each string of the picture, and one
column for each character of the first string. Then two loops, one inside
the other, visit every character. `picture[row][column]` is one character
of the picture, a `char`, and `picture[row][column] == '#'` is `true` when
that character is `#`. So each `#` becomes `true`, and each `.` stays
`false`.

`Draw` does the opposite. It visits every element of the grid, writes `#`
for `true` and `.` for `false`, and starts a new line after each row.
`grid.GetLength(0)` is the number of rows, and `grid.GetLength(1)` is the
number of columns.

The loop at the top is a `do`...`while` loop, as on
[Reading input](lesson:reading-input). It draws one generation and reads a
line. Then `grid = Step(grid);` makes `grid` name the next generation.
`Console.Clear()` empties the console before each picture, so each
generation appears in the same place. The loop continues until you type
`q`, or until `Console.ReadLine()` returns `null` because the input has
ended.

Can you change the picture in the first program? Add a `#` next to one of
the shapes, and see what happens to that shape. Keep every row of the
picture the same length as the first row: a longer row makes `FromPicture`
stop with an exception.

## The rules

Each cell has eight *neighbours*: the cells next to it above and below, on
the left and the right, and on the four diagonals. For a cell at `row` and
`column`, the neighbours are in the rows from `row - 1` to `row + 1`, and
in the columns from `column - 1` to `column + 1`.

![Nine squares in three rows of three. The square in the middle is the cell, at row and column. The eight squares around it are its neighbours. The row above is row − 1, and the row below is row + 1. The column on the left is column − 1, and the column on the right is column + 1.](neighbours.svg)

To make the next generation, each cell counts its live neighbours. Then
four rules decide what the cell will be:

1. A live cell with fewer than two live neighbours dies, as if it were
   lonely.
2. A live cell with two or three live neighbours stays alive.
3. A live cell with more than three live neighbours dies, as if the grid
   were too crowded.
4. A dead cell with exactly three live neighbours becomes alive. Every other
   dead cell stays dead.

Every cell changes at the same moment. So every count uses the grid as it
is now, in this generation. This page returns to that sentence later.

## Counting the neighbours

`CountNeighbours` counts the live neighbours of one cell. It uses two
loops, one inside the other, to visit the nine places in the picture above:
`nearRow` goes from `row - 1` to `row + 1`, and for each `nearRow`,
`nearColumn` goes from `column - 1` to `column + 1`. `itself` is `true` for
the place in the middle, which is the cell itself, and a cell is not its
own neighbour. For every other place that holds a live cell, the method
adds 1 to `count`.

This program makes a grid of 5 rows and 5 columns, with a line of three
live cells across the middle row. Then it prints the count for every cell
of the grid: one line for each row, and one digit for each cell.
`line += ...` adds each count to the end of the text in `line`.

This program is meant to stop with an exception. When it stops, you have
not broken anything. Before you run it, which cell of the grid do you think it is counting when
it stops?

```csharp exec
id: counting-the-neighbours-1
expect: exception
bool[,] grid = new bool[5, 5];    // every cell starts as false: dead
grid[2, 1] = true;
grid[2, 2] = true;
grid[2, 3] = true;

for (int row = 0; row < 5; row++)
{
    string line = "";
    for (int column = 0; column < 5; column++)
    {
        line += CountNeighbours(grid, row, column);
    }
    Console.WriteLine(line);
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            if (!itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}
```

It prints nothing, and it stops with an exception. The report under the
program names an `IndexOutOfRangeException`, with the message *Index was
outside the bounds of the array.* Under the message are two lines that
start with `at`. The first points to line 24, inside `CountNeighbours`,
and the second points to line 11, the line that called the method.

An *index* is the position of an element in an array, and an array's
*bounds* are its first and last index. The first cell that the program
counts is at row 0 and column 0, in the top left corner. For that cell,
`nearRow` starts at −1, and the grid has no row −1. So
`grid[nearRow, nearColumn]` asks for an element that is not there, and the
program cannot complete line 24.

A cell at the edge of the grid has neighbours outside it. Conway's own
grid has no edges: it has no end in any direction. A program's grid has
edges, so each program must decide what happens
there. This program decides that a place outside the grid counts as a dead
cell. So `CountNeighbours` must count only the places that are inside the
grid.

### Your turn

Can you change `CountNeighbours`, so that it counts only the places that
are inside the grid? Then the program prints a count for every cell.

```inputs
CountNeighbours(grid, 0, 0)    // the top left corner
CountNeighbours(grid, 1, 2)    // above the middle
CountNeighbours(grid, 2, 2)    // the middle
CountNeighbours(grid, 4, 4)    // the bottom right corner
```

```hint
after: 2 errors
For the corner cell, `nearRow` starts at −1. Which values of `nearRow` are
inside the grid? And which values of `nearColumn`?
```

```hint
after: 3 errors
`grid.GetLength(0)` is the number of rows, and `grid.GetLength(1)` is the
number of columns. A place is inside the grid when `nearRow` is 0 or more
and less than the number of rows, and the same is true for `nearColumn`.
Can you keep that in a `bool`, and add it to the `if`?
```

```solution
bool[,] grid = new bool[5, 5];    // every cell starts as false: dead
grid[2, 1] = true;
grid[2, 2] = true;
grid[2, 3] = true;

for (int row = 0; row < 5; row++)
{
    string line = "";
    for (int column = 0; column < 5; column++)
    {
        line += CountNeighbours(grid, row, column);
    }
    Console.WriteLine(line);
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            bool inside = nearRow >= 0 && nearRow < grid.GetLength(0)
                && nearColumn >= 0 && nearColumn < grid.GetLength(1);
            if (inside && !itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}
---
It prints five lines of counts, one for each row: `00000`, `12321`,
`11211`, `12321` and `00000`.

`inside` is `true` only for a place in the grid. It comes first in the
`if`, and `&&` checks the question after it only when the question before
it is `true`, as [Reading input](lesson:reading-input) found. So when
`inside` is `false`, C# never asks for `grid[nearRow, nearColumn]`. With
`inside` last in the `if`, the program stops with the exception again: the
order of the questions matters.
```

Here are the counts from one answer, with the line of three in the middle
row:

```console
00000
12321
11211
12321
00000
```

Can you use these counts and the four rules to find the next generation, on
paper? Which cells will be alive?

<details class="dl-answer"><summary>the next generation, by the rules</summary>

In the middle row, the cell in the middle has 2 live neighbours, so it
stays alive (rule 2). The cells at each end of the line have 1 each, so
they die (rule 1). Directly above and directly below the middle cell, the
counts are 3. Those two cells are dead, so each one becomes alive (rule 4).
No other cell has a count of 3. So the line of three across becomes a line
of three down:

```text
.....
..#..
..#..
..#..
.....
```

That is what the line of three did in the first program.

</details>

## The rules in a method

`WillBeAlive` takes two values: whether a cell is alive now, and how many
live neighbours it has. It returns `true` if the cell will be alive in the
next generation, and `false` if it will be dead. For now, it returns
`alive`, so every cell stays as it is.

This program calls `WillBeAlive` for every number of neighbours from 0 to
8. Each line shows what the method returns for a cell that is alive now,
and for a cell that is dead now. Run it, and read the table.

```csharp exec
id: the-rules-in-a-method-1
for (int neighbours = 0; neighbours <= 8; neighbours++)
{
    bool liveCellNext = WillBeAlive(true, neighbours);
    bool deadCellNext = WillBeAlive(false, neighbours);
    Console.WriteLine($"Neighbours: {neighbours}   live cell: {liveCellNext}   dead cell: {deadCellNext}");
}

static bool WillBeAlive(bool alive, int neighbours)
{
    // The four rules go here. For now, every cell stays as it is.
    return alive;
}
```

Every line says `live cell: True   dead cell: False`, whatever the number
of neighbours. Can you change `WillBeAlive`, so that it follows the four
rules? Three of the rules are about a live cell, and one is about a dead
cell.

```inputs
WillBeAlive(true, 1)     // a live cell with 1 live neighbour
WillBeAlive(true, 2)
WillBeAlive(true, 3)
WillBeAlive(true, 4)     // a live cell with 4 live neighbours
WillBeAlive(false, 2)
WillBeAlive(false, 3)    // a dead cell with 3 live neighbours
```

```hint
after: 2 runs
Which rules are about a live cell, and which rule is about a dead cell? Can
an `if (alive)` separate the two kinds of cell?
```

```hint
after: 3 runs
For a live cell, which numbers of neighbours give `true`? `||` means *or*:
`neighbours == 2 || neighbours == 3` is `true` when either side is `true`.
```

```solution
title: one rule for a live cell, one for a dead cell
for (int neighbours = 0; neighbours <= 8; neighbours++)
{
    bool liveCellNext = WillBeAlive(true, neighbours);
    bool deadCellNext = WillBeAlive(false, neighbours);
    Console.WriteLine($"Neighbours: {neighbours}   live cell: {liveCellNext}   dead cell: {deadCellNext}");
}

static bool WillBeAlive(bool alive, int neighbours)
{
    if (alive)
    {
        return neighbours == 2 || neighbours == 3;
    }
    return neighbours == 3;
}
---
Now only two lines have a `True` in them. With 2 neighbours, a live cell
is `True` and a dead cell is `False`. With 3 neighbours, both are `True`.

Rules 1, 2 and 3 are in the first `return`: a live cell is alive in the
next generation with 2 or 3 neighbours, and with any other number it dies.
A `return` ends the method at once, so the last line runs only for a dead
cell. That line is rule 4.
```

```solution
title: in one line
for (int neighbours = 0; neighbours <= 8; neighbours++)
{
    bool liveCellNext = WillBeAlive(true, neighbours);
    bool deadCellNext = WillBeAlive(false, neighbours);
    Console.WriteLine($"Neighbours: {neighbours}   live cell: {liveCellNext}   dead cell: {deadCellNext}");
}

static bool WillBeAlive(bool alive, int neighbours)
{
    return neighbours == 3 || (alive && neighbours == 2);
}
---
The same table. `neighbours == 3` is `true` for both kinds of cell: a live
cell with 3 neighbours stays alive, and a dead cell with 3 becomes alive.
The only other way to be alive in the next generation is to be a live cell
with 2 neighbours. C# checks `&&` before `||`, as
[Decisions](lesson:making-decisions) found, so the brackets change
nothing. They are there for the person who reads the line.
```

## All the cells at once

`Step` makes the next generation of the whole grid. For each cell, it
counts the neighbours, and it asks `WillBeAlive` what the cell will be.
Here is a first version of `Step`. It puts each new value into `grid`, in
the place of the old value, and at the end it returns `grid`. The program starts with the
line of three across, and draws four generations: 0, 1, 2 and 3.

By the rules, the line of three changes from across to down, as it did in
the first program. Each grid is drawn under its `Generation` line, so the
middle row of generation 1 is the tenth line of the output. What do you
expect that line to be?

```csharp exec
id: all-the-cells-at-once-1
bool[,] grid = new bool[5, 5];
grid[2, 1] = true;
grid[2, 2] = true;
grid[2, 3] = true;

for (int generation = 0; generation <= 3; generation++)
{
    Console.WriteLine($"Generation {generation}");
    Draw(grid);
    grid = Step(grid);
}

static bool[,] Step(bool[,] grid)
{
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            int neighbours = CountNeighbours(grid, row, column);
            grid[row, column] = WillBeAlive(grid[row, column], neighbours);
        }
    }
    return grid;
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            bool inside = nearRow >= 0 && nearRow < grid.GetLength(0)
                && nearColumn >= 0 && nearColumn < grid.GetLength(1);
            if (inside && !itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}

static bool WillBeAlive(bool alive, int neighbours)
{
    if (alive)
    {
        return neighbours == 2 || neighbours == 3;
    }
    return neighbours == 3;
}

static void Draw(bool[,] grid)
{
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            if (grid[row, column])
            {
                Console.Write("#");
            }
            else
            {
                Console.Write(".");
            }
        }
        Console.WriteLine();
    }
}
```

```predict
type: choice
line: 10

What will line 10 of the output be, the middle row of generation 1?

- `..#..`
  - The middle cell has 2 live neighbours, and each end has 1. This is
    what the rules give, as the counts in the section above showed.
- `.###.`
  - This would mean that no cell in the middle row changed.
- `.#.#.`
  - This would mean that the middle cell died, and the cells at each end
    stayed alive. Which count could give that?
```

The middle row is `.#.#.`, and generation 1 is not a line down. It has
four live cells, in a shape that the rules do not give:

```console
Generation 1
.....
..##.
.#.#.
.....
.....
```

Generations 2 and 3 are a square of four, a still life. The line of three
has stopped changing.

The problem is the order in which `Step` changes the cells. It visits row 1
before row 2, and it changes each cell of row 1 as it goes. When it reaches
row 2, it counts the neighbours of each cell there, and some of those
neighbours are in row 1. They have already changed: they are in generation
1, and the count needs generation 0. In the same way, each cell of a row
changes before `Step` counts the cell to its right. The rules say that
every cell changes at the same moment, so every count must use generation
0.

[Grids and references](lesson:grids-and-references) found that a method
can change the array it was given. Here, `Step` changes the array that it
is still reading.

### Your turn

Can you change `Step`, so that every count uses generation 0? `Step` can
make a second grid, `next`, of the same size. It reads only from `grid`,
puts each new value into `next`, and returns `next`.

```hint
after: 2 runs
Which grid does `CountNeighbours` read from? In which grid does `Step` put
each new value? Can they be two different grids?
```

```hint
after: 3 runs
`new bool[grid.GetLength(0), grid.GetLength(1)]` makes a grid of the same
size as `grid`, with every cell dead. Which line puts a new value into a
cell, and which grid should that line change? What should `Step` return at
the end?
```

```solution
bool[,] grid = new bool[5, 5];
grid[2, 1] = true;
grid[2, 2] = true;
grid[2, 3] = true;

for (int generation = 0; generation <= 3; generation++)
{
    Console.WriteLine($"Generation {generation}");
    Draw(grid);
    grid = Step(grid);
}

static bool[,] Step(bool[,] grid)
{
    bool[,] next = new bool[grid.GetLength(0), grid.GetLength(1)];
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            int neighbours = CountNeighbours(grid, row, column);
            next[row, column] = WillBeAlive(grid[row, column], neighbours);
        }
    }
    return next;
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            bool inside = nearRow >= 0 && nearRow < grid.GetLength(0)
                && nearColumn >= 0 && nearColumn < grid.GetLength(1);
            if (inside && !itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}

static bool WillBeAlive(bool alive, int neighbours)
{
    if (alive)
    {
        return neighbours == 2 || neighbours == 3;
    }
    return neighbours == 3;
}

static void Draw(bool[,] grid)
{
    for (int row = 0; row < grid.GetLength(0); row++)
    {
        for (int column = 0; column < grid.GetLength(1); column++)
        {
            if (grid[row, column])
            {
                Console.Write("#");
            }
            else
            {
                Console.Write(".");
            }
        }
        Console.WriteLine();
    }
}
---
Generation 1 is the line of three down, as the rules say, and generation 2
is the line across again, the same as generation 0.

`next` starts with every cell dead, and `Step` sets each cell of `next`
once. It never changes `grid`, so every count uses generation 0. Then the
line `grid = Step(grid);` makes `grid` name the new generation. This is the
`Step` of the first program on the page.
```

## Shapes of your own

The first program on this page is yours to change. Here are some shapes to
try in its picture. Put one in an empty part of the picture, away from the
other shapes, or near one of them to see what happens when they meet. Keep
every row the same length. Then press Enter, and watch.

A *beehive*, which has six cells:

```text
.##.
#..#
.##.
```

The *R-pentomino*. A *pentomino* is a shape made of five squares, and this
one is shaped like the letter R:

```text
.##
##.
.#.
```

A line of ten cells:

```text
##########
```

Which of these is a still life? Which one changes for the longest? Can you
find a shape of three cells that is gone after one generation? And a shape
of four cells, other than the square, that never changes? What happens when
two gliders meet?

## Looking back

The program has four rules, and not one word about gliders. Before you
ran it, could you have said from the rules alone that a shape of five
cells would move across the grid? What does that tell you about reading a
program, and running it?

The program counts a place outside the grid as a dead cell. In the first
program, press Enter until the glider reaches the bottom of the grid. What
happens to it there? Why do you think that happens?

A challenge: on a grid whose edges join, the row above the top row is the
bottom row, and the column to the left of the left column is the right
column. A glider that leaves at the bottom then returns at the top. Can
you change `CountNeighbours`, so that the edges join?

The program in the challenge has one live cell in each corner of the grid.
With edges that join, the four corners are neighbours of each other. How
many live neighbours should each corner have? `%` gives a remainder, and a
remainder can make a row number start again at 0, as a clock starts again
at 0 after 23. Be careful with −1: in C#, a remainder keeps the sign of the
number before the `%`, as [Variables and types](lesson:storing-and-computing)
found. When your `CountNeighbours` works, can you copy it into the first
program on this page, and watch the glider?

```csharp challenge
// Edges that join: can you change CountNeighbours, so that the row above
// the top row is the bottom row, and the column to the left of the left
// column is the right column?
bool[,] grid = new bool[5, 5];    // one live cell in each corner
grid[0, 0] = true;
grid[0, 4] = true;
grid[4, 0] = true;
grid[4, 4] = true;

for (int row = 0; row < 5; row++)
{
    string line = "";
    for (int column = 0; column < 5; column++)
    {
        line += CountNeighbours(grid, row, column);
    }
    Console.WriteLine(line);
}

static int CountNeighbours(bool[,] grid, int row, int column)
{
    int count = 0;
    for (int nearRow = row - 1; nearRow <= row + 1; nearRow++)
    {
        for (int nearColumn = column - 1; nearColumn <= column + 1; nearColumn++)
        {
            bool itself = nearRow == row && nearColumn == column;
            bool inside = nearRow >= 0 && nearRow < grid.GetLength(0)
                && nearColumn >= 0 && nearColumn < grid.GetLength(1);
            if (inside && !itself && grid[nearRow, nearColumn])
            {
                count++;
            }
        }
    }
    return count;
}
```

## The page and Visual Studio

Everything on this page runs here, in the browser. **Download project**,
on any program, saves it as a Visual Studio project, which prints the same
there.

In Visual Studio, the game can also play by itself, with no Enter to press.
In the downloaded project of the first program, replace everything from the
line `int generation = 0;` to the `while` line at the end of the loop with
this loop. `Thread.Sleep(200)` makes the program wait for 200 milliseconds,
a fifth of a second, before it continues.

```csharp
for (int generation = 0; generation <= 50; generation++)
{
    Console.Clear();
    Console.WriteLine($"Generation {generation}");
    Draw(grid);
    grid = Step(grid);
    Thread.Sleep(200);    // wait 200 milliseconds: a fifth of a second
}
```

On this page, the console of a program like this stays empty while the
program waits, and it shows only the last picture, when the program ends.
So this version belongs in Visual Studio.

This is an extra page, so it has no practice page. Would you like a first
picture that is different every time? The extra page
[Random numbers](lesson:leaving-it-to-chance) shows how a program chooses
numbers at random, with `Random`, and a random number for each cell can
decide whether it starts alive.

## Where to read more

Gardner, M. (1970). *Mathematical Games: The fantastic combinations of John
Conway's new solitaire game "life".* Scientific American, October 1970.
<https://web.stanford.edu/class/sts145/Library/life.pdf>. This is the
magazine column that first described the game to the world. It plays the
game with counters on a board, where this page uses `#` and `.`.

Numberphile. *Inventing Game of Life (John Conway).*
<https://www.youtube.com/watch?v=R9Plq-D1gEk>. A video in which John Conway
himself talks about how he invented the game.

Microsoft. *The array reference type (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/arrays>.
This page describes how C# makes and uses arrays. Its section
"Multidimensional arrays" is about grids like the `bool[,]` on this page,
and it passes one to a method, as this page does.
