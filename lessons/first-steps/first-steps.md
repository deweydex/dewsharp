---
title: "Your first C# program: algorithms, pseudocode and arithmetic"
version: 2026.09.27.1
from: first-steps
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO2, PDP-LO4, PDP-LO5, PDP-LO6, PDP-LO9]
---

# Your first C# program: algorithms, pseudocode and arithmetic

Here is a line of C#. Before you run it, what do you think will appear
under it?

```csharp exec
id: hello-1
Console.WriteLine("Hello, world!");
```

```predict
type: choice

What will appear under the cell?

- Hello, world!
  - `Console.WriteLine` shows the text inside the quotes.
- "Hello, world!"
  - The quotes tell C# where the text starts and ends. Are they part of
    the text?
- Console.WriteLine("Hello, world!");
  - This is what you would see if C# showed the line instead of running
    it.
```

To run a cell, press its **Run** button, or hold Ctrl and press Enter. The
first run on a page can take a few seconds, while C# starts.

That one line is a complete program. A *program* is a set of clear steps,
written carefully enough for a computer to follow. The *console* is where a
program shows its text. On this page, it is the space under the cell.
`Console.WriteLine` is a *method*: a named tool that does one job. Some
languages call it a *function*, and C# calls it a method. The job of
`Console.WriteLine` is to show what is inside its brackets on the console,
and then start a new line. The quotes mark where the text starts and ends,
so they are not shown.

The semicolon, `;`, marks the end of a step. C# needs one at the end of
every step, as a sentence needs a full stop.

This is the first programming page, and everyone starts here. You do not
need to know anything about computers or maths to begin. Over the coming
weeks we learn to program in C#. Programming and maths are closer than most
people expect. A formula is also a set of steps, written for a person
instead of a computer.

## How this page works

Most of this page is text to read. Between the paragraphs are *cells*:
small boxes of C# you can change and run. The result appears underneath.
The C# runs inside this browser tab, on the computer in front of you, and
nobody else can see what you type. You do not need to install anything.

Each Run starts a new program. It runs from the first line of the cell to
the last. A cell does not need anything from the cells above it, so you can
run the cells in any order.

The next cell has a few more lines. A line that starts with `//` is a
*comment*: a note for the people who read the code. C# ignores everything
on a line after the `//`.

```csharp exec
id: how-this-page-works-1
// C# can do arithmetic too.
Console.WriteLine(2 + 3);
Console.WriteLine(10 * 7);
Console.WriteLine(100 / 4);
```

```predict
type: choice

What will the last line show?

- 25
  - 4 goes into 100 exactly 25 times, a whole number.
- 25.0
  - Some languages give every division a decimal point. Does C#?
- 100 / 4
  - Without quotes, C# calculates the sum instead of showing it.
```

The numbers have no quotes around them. C# works with numbers directly.
Text needs quotes, and numbers do not. And `100 / 4` gives `25`. Both
numbers are whole numbers, so C# gives a whole number. That rule holds a
surprise, which we meet a little further down.

## When C# finds a problem

The next cell is meant to fail. Its line has no semicolon at the end. Run
it, and read what appears.

```csharp exec
id: when-csharp-finds-a-problem-1
expect: CS1002
Console.WriteLine("Hello, world!")
```

Nothing is printed. Instead, C# shows a message:

```console
Program.cs(1,35): error CS1002: ; expected
```

Before C# runs a program, it reads all of it and checks it. That is
*compiling*. If it finds a problem, it runs nothing and tells you where the
problem is. The message has five parts:

- `Program.cs` is the file. C# keeps a program's code in a file, and a
  cell's code is in a file called `Program.cs`.
- `(1,35)` is the place: line 1, and the 35th character along it. That is
  just after the closing bracket, where the semicolon should be.
- `error` says that the program cannot run until this is changed.
- `CS1002` is the error's code. Every kind of error has one, and you can
  search for it.
- `; expected` is what the compiler found: it expected a semicolon.

Can you add the semicolon, and run the cell again?

When you press Run, one of three things happens, and this site always names
them the same way:

- **It did not compile.** C# found a problem before it started, so nothing
  ran. When there are several messages, read the first one first. One
  mistake can cause several messages.
- **It stopped with an exception.** The program ran until a line it could
  not complete. The message names that line. A later page shows some.
- **It ran.** Whether the result is what you wanted is for you to decide.

If a cell does something you did not expect after you changed it,
**Reset** returns the cell to the code the page started with. If the page itself
seems stuck, reload it. That starts C# again, fresh.

## A few more things C# can do

C# does a calculation in a fixed order, the same order you may know from
school as BODMAS or PEMDAS: brackets first, then multiplication and
division, then addition and subtraction. What do you think this line
prints? Run it and see.

```csharp exec
id: order-of-operations-1
Console.WriteLine(2 + 3 * 4);
```

It prints 14. C# multiplies first, 3 × 4 is 12, and then adds the 2. To
add first, put brackets round the part that comes first: `(2 + 3) * 4`.
What does that give?

Here are C#'s arithmetic operators. An *operator* is a symbol that does a
calculation, such as `+`. Can you change the numbers and see what each one
does with them?

```csharp exec
id: more-operators-1
Console.WriteLine(17 + 5);
Console.WriteLine(17 - 5);
Console.WriteLine(17 * 5);
Console.WriteLine(17 / 5);           // two whole numbers
Console.WriteLine(17.0 / 5);         // one number with a decimal point
Console.WriteLine(17 % 5);           // the remainder
Console.WriteLine(Math.Pow(2, 3));   // a power: 2 to the power of 3
```

| Operator | What it does | Example | Result |
|---|---|---|---|
| `+` | addition | `17 + 5` | `22` |
| `-` | subtraction | `17 - 5` | `12` |
| `*` | multiplication | `17 * 5` | `85` |
| `/` | division of two whole numbers: the result is a whole number, and the part after the point is dropped | `17 / 5` | `3` |
| `/` | division when one number has a decimal point: the result keeps its decimal part | `17.0 / 5` | `3.4` |
| `%` | remainder, also called modulo | `17 % 5` | `2` |

Here is the surprise: `17 / 5` is 3, not 3.4. When both numbers are whole
numbers, `/` gives a whole number, and it drops whatever comes after the
point. Write one of the numbers with a decimal point, as `17.0`, and C#
keeps the decimal part.

C# has no operator for a power. It has a method instead: `Math.Pow(2, 3)`
is 2 to the power of 3, which is 8. `Math` is a part of C# with many
methods for calculations. A later page looks closely at powers, because the
sign that many people use for a power does something else in C#.

`/` with whole numbers and `%` work as a pair. Five goes into 17 three
times, with 2 left. `17 / 5` counts the whole fives, and `17 % 5` gives
what is left. The remainder appears more often than you might expect. A
number is even when its remainder after dividing by 2 is 0, and a clock
starts again at 0 after 23 because of a remainder.

```csharp exec
id: remainder-1
Console.WriteLine(100 / 7);
Console.WriteLine(100 % 7);
```

```predict
type: number

What will the last line print?
```

```hint
after: unsure
How many whole 7s fit into 100? The first line counts them. What is left
when those 7s are taken from 100?
```

The first line prints 14: seven goes into 100 fourteen times. The second
line prints 2, the part of 100 that is left.

### Your turn

<div class="dl-world" data-world="secret-messages">

A spy sends a message by tapping a key: one tap for A, two for B, three for
C, and so on, up to 26 taps for Z. How many taps does the word CAB take?
And HELLO, where H is the 8th letter, E the 5th, L the 12th and O the 15th?

```csharp exec
id: your-turn-1--secret-messages
// How many taps for CAB?

```

```hint
C is the 3rd letter, A the 1st and B the 2nd. Can you add them inside one
`Console.WriteLine`?
```

```solution
Console.WriteLine(3 + 1 + 2);
Console.WriteLine(8 + 5 + 12 + 12 + 15);
---
CAB takes 6 taps, and HELLO takes 52. Writing each letter's number in the
sum, rather than the total you calculated, shows where the answer came
from.
```

</div>

<div class="dl-world" data-world="pixel-art">

A screen draws a picture out of small squares called pixels. An old games
console had a screen 320 pixels wide and 240 tall. How many pixels is that?
A phone photo is 4000 by 3000 pixels. How many times more is that?

```csharp exec
id: your-turn-1--pixel-art
// How many pixels on the old screen?

```

```hint
A picture 320 wide and 240 tall is 240 rows of 320. How do you find 240
lots of 320?
```

```solution
Console.WriteLine(320 * 240);
Console.WriteLine(4000 * 3000);
Console.WriteLine(4000 * 3000 / (320 * 240));
Console.WriteLine(4000.0 * 3000 / (320 * 240));
---
The old screen has 76,800 pixels, and the photo has 12,000,000. The third
line says the photo has 156 times more. All its numbers are whole, so C#
drops the part after the point. The last line starts with `4000.0`, so it
keeps it: 156.25 times more. The brackets make C# calculate the old
screen's pixels first, before it divides.
```

</div>

## What is an algorithm?

An *algorithm* is a list of clear steps that complete a task. Each step has
only one meaning. We follow algorithms every day without thinking about
them. Here is one for making a cup of tea:

1. Fill the kettle with water.
2. Press the kettle's switch.
3. While the water has not boiled, wait.
4. Pour the water into a cup with a tea bag in it.
5. Wait three minutes.
6. Remove the tea bag.

It starts from a known point: a kettle, water, a cup and a tea bag. The
steps come in a clear order. And it finishes. At the end, there is a cup of
tea.

Step 3 is different from the others. "While the water has not boiled, wait"
repeats the waiting until the water boils. This is a *loop*: a step, or a
group of steps, that repeats until something is true. A later page writes
loops in C#.

When we program, we write algorithms carefully enough for a computer to
follow them. A computer is very fast, but it cannot guess what you meant.
It does exactly what you tell it, and nothing more.

Think of something you do most days: making breakfast, getting to college,
logging in to a computer. Can you write it as numbered steps? How much
detail would somebody need who had never done it before? You could write
the steps on paper, or as comments in any cell on this page.

## Pseudocode: planning before coding

Before we write C#, it helps to plan the steps in plain English.
*Pseudocode* is a plan for a program, written in plain English, sometimes
with a little code-like structure. No computer runs it. Write pseudocode
first. It is one of the most useful habits you can build.

Here is a plan for finding the middle of a screen 320 pixels wide and 240
tall:

```text
GET the width and the height of the screen
DIVIDE the width by 2, to find the middle across
DIVIDE the height by 2, to find the middle down
DISPLAY both
```

And here is the same plan in C#. It keeps the numbers under the names
`width` and `height`. `int` in front of a name says that the name holds a
whole number. A later page, *Variables and types*, explains names like
these.

```csharp exec
id: pseudocode-planning-before-coding-1
// Find the middle of a screen
int width = 320;
int height = 240;
Console.WriteLine($"The middle is at {width / 2}, {height / 2}");
```

It prints `The middle is at 160, 120`. The `$` in front of the quotes lets
you put a value inside the text, in curly brackets, `{ }`. C# calculates
what is inside the curly brackets, and puts the result in the text.

This is the way of working we use all through these pages:

1. Think about what you want to do.
2. Write it as pseudocode.
3. Write each step of the pseudocode in C#.

For a small problem, the pseudocode can feel like extra work. As problems
get bigger, the plan shows you which step you are on.

### Your turn

Can you write the plan first this time? In the cell, write your pseudocode
as comments, one line of plain English for each step, each starting with
`//`. Then change each `0` to the calculation for its step.

<div class="dl-world" data-world="secret-messages">

Spies used to send messages in blocks of five letters, so nobody listening
could count the words. A message has 47 letters. How many full blocks of
five does it make, and how many letters are left for the last one?

```csharp exec
id: your-turn-2--secret-messages
// Plan first, as comments. Then change each 0.
int letters = 47;
int blocks = 0;
int lettersLeft = 0;
Console.WriteLine($"{letters} letters: {blocks} blocks, and {lettersLeft} left");
```

```inputs
blocks          // full blocks of five
lettersLeft     // letters in the short last block
```

```hint
Which operator counts how many whole fives fit, and which one gives what is
left? Both are in the table above.
```

```solution
// GET the number of letters
// DIVIDE by 5, keeping only the whole blocks
// FIND the remainder, the letters left for the last block
int letters = 47;
int blocks = letters / 5;
int lettersLeft = letters % 5;
Console.WriteLine($"{letters} letters: {blocks} blocks, and {lettersLeft} left");
---
Nine full blocks, and two letters left for a short last block. Here we
want `/` to drop the part after the point, because part of a block is not
a block.
```

</div>

<div class="dl-world" data-world="pixel-art">

A row of a picture is 50 pixels wide. You want to fill it with tiles 8
pixels wide. How many whole tiles fit, and how many pixels are left at the
end?

```csharp exec
id: your-turn-2--pixel-art
// Plan first, as comments. Then change each 0.
int row = 50;
int tiles = 0;
int pixelsLeft = 0;
Console.WriteLine($"{row} pixels: {tiles} tiles, and {pixelsLeft} left");
```

```inputs
tiles           // whole tiles in the row
pixelsLeft      // pixels at the end of the row
```

```hint
Which operator counts how many whole 8s fit into 50, and which one gives
what is left? Both are in the table above.
```

```solution
// GET the width of the row
// DIVIDE by the width of a tile, keeping only the whole tiles
// FIND the remainder, the pixels left at the end
int row = 50;
int tiles = row / 8;
int pixelsLeft = row % 8;
Console.WriteLine($"{row} pixels: {tiles} tiles, and {pixelsLeft} left");
---
Six whole tiles, and two pixels left at the end. Here we want `/` to
drop the part after the point, because part of a tile is not a tile.
```

</div>

## Looking back

With two whole numbers, `/` drops the part after the point. With a decimal
point in one of them, it keeps it. When would you want each one? Think of a
question on this page where only one of them gives an answer that makes
sense.

A challenge: a clock shows 22:00. What time will it show 5 hours later? And
40 hours later? Can you make C# start again at 0 after 23, the way a
clock does? One of the operators on this page does it in one step.

```csharp challenge
// It is 22:00. What time will it be 5 hours later?
// Can one operator make the hours start again at 0 after 23?
int now = 22;
int later = now + 5;
Console.WriteLine(later);
```

Next, the [practice page](lesson:first-steps-practice) has more problems
on the operators, algorithms and pseudocode, and one on a message from the
compiler. Later, *Variables and types* gives values names, and shows the
kinds of value C# keeps.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Microsoft. *Hello World*, from *A tour of C#*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/hello-world>.
Microsoft's own first lesson in C#. It covers `Console.WriteLine` and text,
and the next lesson in the same series, *Work with Numbers*, covers
arithmetic, including division with whole numbers.

Microsoft. *Arithmetic operators (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators>.
This is the official reference for the operators on this page, including
the exact behaviour of `/` and `%`.

Miles, R. *The C# Programming Yellow Book*. Free at
<https://www.robmiles.com/c-yellow-book>. A book for people who have never
programmed, written by a university teacher, in a friendly voice. Its first
chapters cover this page's topics at greater length.

Khan Academy. *Intro to algorithms*.
<https://www.khanacademy.org/computing/computer-science/algorithms>. It
goes more slowly, with exercises, if the pace here was too quick.

CrashCourse (2017). *Intro to Algorithms: Crash Course Computer Science
#13.* <https://www.youtube.com/watch?v=rL8X2mlNHPM>. It explains what makes
a set of steps an algorithm, with sorting and finding a route as examples.
The video is about eleven minutes long.
