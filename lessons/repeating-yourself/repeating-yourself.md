---
title: "Loops: repeating steps with while and for"
version: 2026.09.28.1
from: repeating-yourself
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO6, PDP-LO7]
---

# Loops: repeating steps with while and for

On [Variables and types](lesson:storing-and-computing), moving a whole
word three places along the alphabet meant writing the same line once for
every letter. A *loop* is code that runs the same lines more than once. Here is a loop that moves every letter of a word, however long
the word is. What will it print?

```csharp exec
id: a-loop-that-codes-1
string word = "CAT";
string coded = "";
foreach (char letter in word)
{
    int position = letter - 'A';
    char moved = (char)((position + 3) % 26 + 'A');
    coded = coded + moved;
}
Console.WriteLine(coded);
```

```predict
type: text

What will it print?
```

It prints `FDW`: C moved to F, A to D, and T to W. This line takes the
characters of `word` one at a time:

```csharp
foreach (char letter in word)
```

Each time, it puts the next character in `letter`, a `char`, and runs the
lines between the curly brackets. So those lines ran three times, once for
each letter of `CAT`. A loop that takes the items of something one at a
time, like this one, is a *foreach loop*.

A string cannot be changed once it is made. So `coded + moved` makes a new
string, one character longer, and `coded` becomes the name for the new
one. Can you change the word to your own name, in capitals, and run it
again? The loop works for a word of any length.

Our programs can run lines in order, one after another, and they can
choose between paths. This page adds the third thing every program is
built from: *repetition*, running lines again. Programmers also call it
*iteration*.

## While loops: repeat until done

A *while loop* runs its *body*, the lines between its curly brackets, again
and again, for as long as a condition stays `true`. It is for "continue
until…". Here a square pattern doubles in size, again and again, until the
next doubling would not fit on a picture 64 pixels wide.

```csharp exec
id: while-loops-repeat-until-done-1
int side = 1;
while (side * 2 <= 64)
{
    side = side * 2;
    Console.WriteLine(side);
}
Console.WriteLine("Done");
```

```predict
type: number

What is the last number it prints?
```

It prints 2, 4, 8, 16, 32 and 64, then `Done`. When `side` is 64,
`side * 2 <= 64` is `false`, so the loop stops. The last line comes after
the closing curly bracket, so it is not part of the loop, and it runs once,
at the end.

A while loop needs three things:

1. a starting state: `int side = 1;`
2. a condition, which C# checks before the body runs each time:
   `side * 2 <= 64`
3. a change inside the body that, in the end, makes the condition `false`:
   `side = side * 2;`

C# checks the condition *before* the body, even the first time. What if
the square is already 64 pixels wide? Can you change the first line to
`int side = 64;`, and run the cell? The condition is `false` at the start,
so the body never runs at all, and only the line after the loop prints. A
loop that checks its condition before its body is called a *pre-test
loop*, and `while` is one.

What happens without the third thing? The condition never becomes
`false`, so the loop never stops. It is worth seeing once. Can you delete
the line `side = side * 2;` and run the cell? While a program runs, its
**Run** button becomes **Stop**. Press **Stop** to end the program. Then
press **Reset**, and the cell has the page's code again.

### Trace it by hand

Before you run the next cell, can you write the values of `total` and
`number` for each time the body runs, in the comments at the bottom? What
will it print at the end?

```csharp exec
id: your-turn-1
int total = 0;
int number = 1;

while (number <= 4)
{
    total = total + number;
    number = number + 1;
}

Console.WriteLine(total);

// Your trace:
// number = 1: total becomes ?, number becomes ?
// number = 2: total becomes ?, number becomes ?
// number = 3: total becomes ?, number becomes ?
// number = 4: total becomes ?, number becomes ?
```

It adds 1 + 2 + 3 + 4, and prints 10. It starts a total at zero, then adds
to it again and again. This is the *accumulator pattern*, one of the most
common shapes in programming. An *accumulator* is a variable that collects
a result as a loop runs. `coded`, in the first cell on this page, was an
accumulator too, of letters instead of numbers.

### Shorter ways to change a variable

Lines like `total = total + number;` are so common that C# has a shorter
way to write them. What do you think this cell prints?

```csharp exec
id: shorter-ways-to-change-a-variable-1
int total = 0;
total += 5;       // the same as total = total + 5;
total += 3;
Console.WriteLine(total);

int count = 0;
count++;          // the same as count = count + 1;
count++;
Console.WriteLine(count);
```

It prints 8, then 2. `total += 5;` adds 5 to `total`, and `count++;` adds 1
to `count`. `-=` and `*=` work in the same way, for subtracting and for
multiplying, and `count--;` subtracts 1. `+=` works on a string too:
`coded += moved;` adds a character to the end of `coded`.

### Your turn

<div class="dl-world" data-world="secret-messages">

In English, E is the most common letter. So in a message coded with a
Caesar shift, the most common letter is probably E, moved. Suppose the
most common letter in a coded message is Q. Can you try the shifts 0, 1, 2
and so on, until moving Q backwards by the shift gives E? Which shift is it?

```csharp exec
id: your-turn-2--secret-messages
char letter = 'Q';
int shift = 0;

Console.WriteLine($"{letter} to E: shift {shift}");
```

```inputs
shift
```

```hint
after: 1 runs
What does the loop ask before each step? It continues while moving Q
backwards by `shift` gives a letter other than E. Moving backwards is the
Caesar shift with `- shift` in place of `+ shift`.
```

```hint
after: 2 runs
Can you keep the moved letter in a variable of its own, `char moved`?
Then the condition is `moved != 'E'`, and the body adds 1 to `shift` and
moves Q again. Add 26 before `% 26`, so that the number is never below 0.
```

```solution
char letter = 'Q';
int shift = 0;
char moved = letter;
while (moved != 'E')
{
    shift++;
    moved = (char)((letter - 'A' - shift + 26) % 26 + 'A');
}
Console.WriteLine($"{letter} to E: shift {shift}");
---
The shift is 12. A code-breaker who finds it can move every letter of the
message backwards by 12. This is the oldest way to break a Caesar shift: count
the letters.
```

</div>

<div class="dl-world" data-world="pixel-art">

A pattern starts 3 pixels wide, and each step makes it 5 pixels wider. How
many steps until it is at least 64 pixels wide?

```csharp exec
id: your-turn-2--pixel-art
int width = 3;
int steps = 0;

Console.WriteLine($"{steps} steps: {width} pixels wide");
```

```inputs
steps
width
```

```hint
after: 1 runs
Which two things change each time the body runs? And what does the loop
ask before each step: is the width still less than 64?
```

```solution
int width = 3;
int steps = 0;
while (width < 64)
{
    width += 5;
    steps++;
}
Console.WriteLine($"{steps} steps: {width} pixels wide");
---
13 steps, and the pattern ends 68 pixels wide. A while loop suits
this, because nobody knew the number of steps in advance: the loop found
it.
```

</div>

## For loops: when you know how many times

When we know how many times to repeat, a *for loop* is simpler. What will
the last line of this cell be?

```csharp exec
id: for-loops-when-you-know-how-many-times-1
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
```

```predict
type: number

What will the last line be?
```

It prints 0, 1, 2, 3 and 4. The last line is 4, not 5. The first line of
the loop has three parts, separated by semicolons:

1. `int i = 0` runs once, before anything else. It makes the loop's
   counter, `i`, and gives it its first value. `i` is the name programmers
   usually give a loop's counter.
2. `i < 5` is the condition. C# checks it before the body runs each time,
   as in a while loop.
3. `i++` runs after the body, each time. It adds 1 to `i`.

So `i` is 0, 1, 2, 3 and 4 while the body runs. When `i` becomes 5, the
condition `i < 5` is `false`, and the loop stops. Counting from 0 is very
common in C#, and [Arrays and lists](lesson:lists-and-sequences) shows
why.

These are the three things a while loop needs, in one line. This while
loop does the same as the cell:

```csharp
int i = 0;
while (i < 5)
{
    Console.WriteLine(i);
    i++;
}
```

A for loop puts the start, the condition and the change on one line, where
a reader sees all three together. It is called a *counting loop*, because
it is the loop to use when you know how many times to repeat.

The first cell on this page used a third loop, `foreach`. It takes the
characters of a string one at a time, and later pages use it for the items
of arrays and lists too. When you want every item in turn, and do not need
a counter, `foreach` is the simplest of the three.

A for loop can start at any number, and change its counter by any amount.
`Console.Write`, from [Variables and types](lesson:storing-and-computing),
prints without starting a new line. `Console.WriteLine()`, with nothing in the brackets, ends the
line.

```csharp exec
id: for-loops-when-you-know-how-many-times-2
for (int i = 1; i <= 5; i++)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

for (int i = 0; i < 20; i += 5)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

for (int i = 10; i > 0; i--)
{
    Console.Write($"{i} ");
}
Console.WriteLine("Liftoff!");
```

The first loop uses `<=`, so it includes 5. The second adds 5 each time,
and stops before 20. The third starts at 10 and subtracts 1 each time,
while `i` is above 0. Each loop makes its own `i`, which exists only
inside that loop, so the next loop can make an `i` of its own.

| The loop | The values `i` takes | In Python |
|---|---|---|
| `for (int i = 0; i < stop; i++)` | from 0, stopping before `stop` | `range(stop)` |
| `for (int i = start; i < stop; i++)` | from `start`, stopping before `stop` | `range(start, stop)` |
| `for (int i = start; i <= last; i++)` | from `start` to `last`, including `last` | `range(start, last + 1)` |
| `for (int i = start; i < stop; i += step)` | from `start`, adding `step` each time, stopping before `stop` | `range(start, stop, step)` |
| `for (int i = start; i > stop; i--)` | from `start`, subtracting 1 each time, stopping before `stop` | `range(start, stop, -1)` |

The last column is for readers who have used Python: its `range` gives the
same numbers.

### Your turn

<div class="dl-world" data-world="secret-messages">

A code-breaker's table shows every letter beside the letter it becomes.
Can you print the whole alphabet, 26 lines, each with a letter and that
letter moved three places along? `A D`, `B E`, and so on, to `Z C`.

```csharp exec
id: your-turn-3--secret-messages
// 26 lines: each letter, and where a shift of 3 moves it

```

```hint
after: 1 runs
Which loop gives the positions 0 to 25? `(char)(position + 'A')` changes
a position to its letter.
```

```solution
title: counting positions
for (int position = 0; position < 26; position++)
{
    char letter = (char)(position + 'A');
    char moved = (char)((position + 3) % 26 + 'A');
    Console.WriteLine($"{letter} {moved}");
}
---
Read each line from its second letter to its first, and the same table
decodes a message.
```

```solution
title: counting letters
for (char letter = 'A'; letter <= 'Z'; letter++)
{
    char moved = (char)((letter - 'A' + 3) % 26 + 'A');
    Console.WriteLine($"{letter} {moved}");
}
---
A `char` is stored as a number, so `letter++` moves it to the next
character, and `letter <= 'Z'` compares the two numbers. A for loop can
count with a `char` as well as an `int`.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you print one row of a checkerboard 16 pixels wide: `#` in the even
columns and `.` in the odd ones, all on one line?

```csharp exec
id: your-turn-3--pixel-art
// One row, 16 pixels: #.#.#.#.#.#.#.#.

```

```hint
after: 1 runs
Which loop gives the columns 0 to 15? `Console.Write("#")` prints without
starting a new line.
```

```solution
for (int column = 0; column < 16; column++)
{
    if (column % 2 == 0)
    {
        Console.Write("#");
    }
    else
    {
        Console.Write(".");
    }
}
Console.WriteLine();
---
The last `Console.WriteLine()` ends the line. Without it, the program ends
in the middle of a line, and anything printed after the loop would
continue on the same line as the row.
```

</div>

## Multiplying as you go

An accumulator can multiply, too. $5 \times 4 \times 3 \times 2 \times 1$
is written $5!$, and called *5 factorial*. It is the number of ways to
arrange five different things in a row. In C#, `!` means "not", so a
program cannot write $5!$ the way maths does. It uses a loop.

```csharp exec
id: multiplying-as-you-go-1
int number = 5;
int product = 1;     // multiplying by 1 changes nothing
for (int i = 1; i <= number; i++)
{
    product *= i;
}
Console.WriteLine($"{number}! = {product}");
```

It prints `5! = 120`. Why does `product` start at 1 and not at 0? What
would happen if it started at 0? You can change it and run the cell.

<details class="dl-answer"><summary>why 1</summary>

Zero times any number is zero. So a product that starts at 0 stays at 0,
however many times the loop multiplies.

A sum starts at 0, because adding 0 changes nothing. A product starts at
1, because multiplying by 1 changes nothing. Each accumulator starts at
the value that changes nothing.

</details>

## Nested loops

A loop can hold another loop. These are *nested loops*. Each time the
outer loop runs its body, the inner loop runs from start to finish. What do
you think this one draws?

```csharp exec
id: nested-loops-1
for (int row = 0; row < 4; row++)
{
    for (int column = 0; column < 8; column++)
    {
        if ((row + column) % 2 == 0)
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

It draws a checkerboard, four rows of eight. The outer loop runs 4 times,
and each time the inner loop runs 8 times, so the `if` runs $4 \times 8$
times, once for every pixel. Adding `row` to `column` moves the pattern one
place along on each row.

If the outer loop runs $n$ times, and the inner loop runs $n$ times for
each, the total is $n \times n$, or $n^2$. Counting the steps a program
takes matters on two later pages, [Searching](lesson:finding-things) and
[Sorting](lesson:putting-things-in-order).

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you print a table of the first five letters, A to E, moved by the
shifts 1, 2 and 3, one row for each shift? The first row is `B C D E F`.

```csharp exec
id: your-turn-6--secret-messages
// One row for each shift: 1, 2 and 3

```

```hint
after: 1 runs
Which loop picks the shift, and which loop picks the letter? The outer
loop picks a shift. The inner loop takes the positions 0 to 4, and prints
each moved letter with `Console.Write`.
```

```solution
for (int shift = 1; shift <= 3; shift++)
{
    for (int position = 0; position < 5; position++)
    {
        char moved = (char)((position + shift) % 26 + 'A');
        Console.Write($"{moved} ");
    }
    Console.WriteLine();
}
---
Each row is the alphabet moved one place further along. A cipher table
like this, with all 26 rows, was once printed on cards for people who
sent coded messages by hand.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you draw a hollow square, 6 pixels by 6: `#` round the edge, and `.`
inside?

```csharp exec
id: your-turn-6--pixel-art
// A 6 by 6 square: # on the edges, . inside

```

```hint
after: 1 runs
When is a pixel on the edge? Its row is the first or the last, or its
column is the first or the last. How many comparisons is that, and which
operator joins them?
```

```solution
int size = 6;
for (int row = 0; row < size; row++)
{
    for (int column = 0; column < size; column++)
    {
        if (row == 0 || row == size - 1 || column == 0 || column == size - 1)
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
---
Change `size` and the same loops draw a square of any size. The edge is
row 0 and row `size - 1`, because the rows are numbered from 0.
```

</div>

## Counting with conditions

An `if` inside a loop lets us count, or add, only some of the values. How
many numbers from 1 to 100 can be divided by both 3 and 7? Can you guess
before you run it?

```csharp exec
id: building-up-gradually-counting-with-conditions-1
int count = 0;
for (int i = 1; i <= 100; i++)
{
    if (i % 3 == 0 && i % 7 == 0)
    {
        count++;
        Console.Write($"{i} ");
    }
}
Console.WriteLine();
Console.WriteLine($"Total: {count}");
```

There are four: 21, 42, 63 and 84. A number divided by both 3 and 7 is
divided by 21, so the loop could have asked `i % 21 == 0`, and found the
same four.

### Your turn

<div class="dl-world" data-world="secret-messages">

Code-breakers count letters. How many E's are in this message? Can you
count them with a loop?

```csharp exec
id: your-turn-7--secret-messages
string message = "MEET ME BY THE OLD TREE";
int count = 0;

Console.WriteLine($"E appears {count} times in {message}");
```

```inputs
count
```

```hint
after: 1 runs
Which loop takes each character of a string in turn? What does its body
ask about each character?
```

```hint
after: 1 errors
Does the message say CS0019? A `char` and a `string` cannot be compared
with `==`. A single character goes in single quotes: `'E'`.
```

```solution
string message = "MEET ME BY THE OLD TREE";
int count = 0;
foreach (char letter in message)
{
    if (letter == 'E')
    {
        count++;
    }
}
Console.WriteLine($"E appears {count} times in {message}");
---
E appears 6 times. Counting every letter this way, and finding the most common, is the
first step in breaking a Caesar shift.
```

</div>

<div class="dl-world" data-world="pixel-art">

A row of a picture is written as text: `#` for a lit pixel and `.` for a
dark one. How many pixels are lit in this row? Can you count them with a
loop?

```csharp exec
id: your-turn-7--pixel-art
string row = "..##.###..#";
int count = 0;

Console.WriteLine($"{row}: {count} pixels lit");
```

```inputs
count
```

```hint
after: 1 runs
Which loop takes each character of a string in turn? What does its body
ask about each character?
```

```hint
after: 1 errors
Does the message say CS0019? A `char` and a `string` cannot be compared
with `==`. A single character goes in single quotes: `'#'`.
```

```solution
string row = "..##.###..#";
int count = 0;
foreach (char pixel in row)
{
    if (pixel == '#')
    {
        count++;
    }
}
Console.WriteLine($"{row}: {count} pixels lit");
---
6 pixels are lit. A program that draws a picture counts, and changes,
pixels in the same way, one row at a time.
```

</div>

## Looking back

A for loop and a while loop can do the same job, as the loop that printed
0 to 4 showed. When would you choose each one? And a while loop checks its
condition before its body, even the first time. Can you think of a
program that must run its body at least once, before there is anything to
check? C# has one more loop for that, `do`...`while`. It checks its
condition after the body, so it is a *post-test loop*. *Reading input*
uses it, for a program that asks a question again until the answer makes
sense.

A challenge: this message was coded with a Caesar shift, but nobody told
you the shift. Can you try all 26 shifts, and print what each one gives?
One of them reads as English.

```csharp challenge
// Try every shift. Which one reads as English?
string message = "WKLV LV D VHFUHW";
for (int shift = 0; shift < 26; shift++)
{
    string decoded = "";
    foreach (char letter in message)
    {
        // Move each capital backwards by shift. Leave the spaces as they are.
        decoded += letter;
    }
    Console.WriteLine($"{shift} {decoded}");
}
```

The first cell on this page coded one word with one loop.
[Methods](lesson:writing-your-own-functions) gives a loop like that a name,
so that you can use it again without writing it all again.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:repeating-yourself-practice) has more
problems about loops. After it,
[Starting a total](lesson:a-total-that-starts-again) looks closely at a
total that starts at 0, and at where a variable lives.

## Where to read more

Microsoft. *Iteration statements (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/iteration-statements>.
This page describes C#'s four loops, `for`, `foreach`, `do` and `while`,
with examples.

Veritasium (2021). *The Simplest Math Problem No One Can Solve - Collatz
Conjecture.* <https://www.youtube.com/watch?v=094y1Z2wpJg>. If a number is
even, halve it. If it is odd, multiply it by 3 and add 1. Repeat. Every
number anyone has tried reaches 1, but nobody has proved that every number
will. The rule is a while loop of a few lines, and the practice page has
it.
