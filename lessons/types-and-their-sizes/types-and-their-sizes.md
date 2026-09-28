---
title: "Types and their sizes: how much a variable can hold"
version: 2026.09.28.2
from: numbers-a-computer-can-hold
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4, PDP-LO7, FOOP-LO1]
---

# Types and their sizes: how much a variable can hold

`int.MaxValue` is the largest value that an `int` can hold. This program
keeps it in a variable, and then adds 1 to it. What do you think the
second line prints? Run it and see.

```csharp exec
id: one-past-the-largest-1
int biggest = int.MaxValue;
Console.WriteLine(biggest);
int onePast = biggest + 1;
Console.WriteLine(onePast);
```

```predict
type: choice

What will the second line print?

- 2147483648
  - One more than the first line.
- -2147483648
  - A number below zero. Where could that come from?
- It prints the first line, then stops with an exception
  - The answer is too large for an `int`, and C# notices.
- Nothing: it does not compile
  - C# checks the whole program before it runs any of it.
```

It prints -2147483648, the smallest `int`. There is no error and no
warning. The program added 1 to the largest `int`, and the answer is the
smallest one.

Each of C#'s number types keeps its values in a fixed amount of memory. A
*bit* is a single 0 or 1, and a *byte* is 8 bits. An `int` always uses 4
bytes. So there is a largest `int`, 2147483647, as the first line shows.
When a calculation passes it, C# does not stop the program. It starts
again from the smallest `int`, and continues from there. This is called
*overflow*: the answer is too large for its type, and C# keeps only the
part that fits.

![A circle with the int values in order around it, like the hours on a clock. 0 is at the bottom, with 1 just after it on the right and -1 just before it on the left. The numbers get larger along the right side of the circle, to 2147483647 at the top. One more step, marked "+ 1", crosses the top of the circle to -2147483648. From there, the numbers below zero continue along the left side, through to -1, next to 0 again.](int-circle.svg)

If you have written Python, this is new. A Python whole number has no
largest value: it grows as large as it needs to. A C# `int` never grows.
This page is about what each of C#'s types can hold, how much memory it
uses, and what happens when a value moves from one type to another.

## Bits, bytes and patterns

Why is the largest `int` 2147483647? Where does a number like that come
from? Think of a bit as a light that is off or on. One light has 2
patterns: off, and on. Two lights have 4: off-off, off-on, on-off and
on-on. Each new light
doubles the number of patterns, because every old pattern can come with
the new light off, or with it on. So 8 bits, one byte, have
2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 patterns: 2 to the power of 8.

What do you think each line prints?

```csharp exec
id: bits-bytes-and-patterns-1
Console.WriteLine(Math.Pow(2, 8));    // 1 byte
Console.WriteLine(Math.Pow(2, 16));   // 2 bytes
Console.WriteLine(Math.Pow(2, 32));   // 4 bytes: an int
```

One byte has 256 patterns, so it can hold 256 different numbers. Four
bytes have 4294967296 patterns. An `int` shares them equally: half for
the numbers below zero, and half for zero and the numbers above it. So
the smallest `int` is -2147483648, and the largest is 2147483647. There
is one fewer above zero, because zero uses one of the patterns.

## Four types for whole numbers

C# has more than one type for whole numbers. They differ in how much
memory they use, and so in what they can hold. `sizeof` gives the number
of bytes that a type uses. Every number type also knows its smallest and
largest value, as `MinValue` and `MaxValue`.

```csharp exec
id: four-types-for-whole-numbers-1
Console.WriteLine($"byte:  {sizeof(byte)} byte,  {byte.MinValue} to {byte.MaxValue}");
Console.WriteLine($"short: {sizeof(short)} bytes, {short.MinValue} to {short.MaxValue}");
Console.WriteLine($"int:   {sizeof(int)} bytes, {int.MinValue} to {int.MaxValue}");
Console.WriteLine($"long:  {sizeof(long)} bytes, {long.MinValue} to {long.MaxValue}");
```

| Type | Size | Smallest | Largest |
|---|---|---|---|
| `byte` | 1 byte | 0 | 255 |
| `short` | 2 bytes | -32,768 | 32,767 |
| `int` | 4 bytes | -2,147,483,648 | 2,147,483,647 |
| `long` | 8 bytes | -9,223,372,036,854,775,808 | 9,223,372,036,854,775,807 |

A `byte` has no numbers below zero. All 256 of its patterns are for 0 to
255.

`int` is the usual choice, for counts, scores, ages and positions. A whole
number written in the code, such as `5`, is an `int`, and many of C#'s own
methods take and give `int` values. Choose `long` when a value could pass
the largest `int`, such as the number of people on Earth, or the bytes on
a disk. Choose `byte` when a value is always from 0 to 255, like one
part of a colour, and a program keeps very many of them. `short` is not
used often. It is for very many small numbers, where memory matters. C#
has other types for whole numbers too, such as `sbyte`, `ushort`, `uint`
and `ulong`. Each of these four has the same size as one of the four
above, and a different range. This course does not use them.

## What a type costs in memory

The computer's memory that a program uses while it runs is called
*RAM*. Each variable uses the bytes of its type. For one variable, that
does not matter much. For a million, it does.

A photo 1920 pixels wide and 1080 tall has three colour values for each
pixel: one for red, one for green and one for blue. Each value is from 0
to 255. How much memory do they need?

```csharp exec
id: what-a-type-costs-in-memory-1
int pixels = 1920 * 1080;
int colourValues = pixels * 3;    // red, green, blue
int asBytes = colourValues * sizeof(byte);
int asInts = colourValues * sizeof(int);
Console.WriteLine($"{colourValues} colour values");
Console.WriteLine($"As byte: {asBytes} bytes");
Console.WriteLine($"As int:  {asInts} bytes");
```

The same 6,220,800 colour values need 6,220,800 bytes as `byte` values,
and 24,883,200 bytes as `int` values. That is four times as much memory,
for exactly the same picture. Every value fits in one byte, so the other
three bytes of each `int` would hold only zeros. This is why the size of
a type matters. In a program that keeps a lot of data, choose each type
with care.

## Checking for overflow

Overflow gives no warning. The program continues with a number that makes
no sense. `checked(...)`, around a calculation, asks C# to check it. If
the answer does not fit its type, the program stops with an exception. An
*exception* is a problem that stops a program while it runs, at the line
where it happens. This cell is meant to stop with an exception.

```csharp exec
id: checking-for-overflow-1
expect: exception
int biggest = int.MaxValue;
int onePast = checked(biggest + 1);
Console.WriteLine(onePast);
```

It stops at line 2, and the page shows this report:

```console
Unhandled exception. System.OverflowException: Arithmetic operation resulted in an overflow.
   at line 2 of Program.cs
```

`OverflowException` is the name of the exception. Line 3 never runs, so
nothing is printed. The program stops at the line where the number
stopped making sense. Without `checked`, it would continue with a number
that makes no sense.

<details class="dl-why"><summary>Why doesn't C# check every calculation?</summary>

A check takes a little time, and a program can do millions of
calculations every second. So C# checks only where the code asks, with
`checked`. A Visual Studio project can ask C# to check every calculation
in the program instead, with a setting called `CheckForOverflowUnderflow`.

There is one place where C# always checks. When every value in a
calculation is fixed in the code, as `5` and `int.MaxValue` are, the
compiler does the calculation itself, before the program runs, and it
checks the answer. The practice page has an example.

</details>

## Numbers with a decimal point

C# has three types for a number with a decimal point: `float`, `double`
and `decimal`. They differ in size, and in how many digits they keep. Here
each one holds a third, whose 3s continue for ever. What do you think each
line shows?

```csharp exec
id: numbers-with-a-decimal-point-1
float thirdFloat = 1f / 3;        // f: a float
double thirdDouble = 1.0 / 3;     // a point and no letter: a double
decimal thirdDecimal = 1m / 3;    // m: a decimal
Console.WriteLine(thirdFloat);
Console.WriteLine(thirdDouble);
Console.WriteLine(thirdDecimal);
Console.WriteLine(sizeof(float));
Console.WriteLine(sizeof(double));
Console.WriteLine(sizeof(decimal));
```

The first three lines are the thirds. Each type keeps as many digits as
its size allows, and rounds the last one. Here the `float` keeps 8
digits, and its last one is rounded up to 4. The `double` keeps 16, and
the `decimal` keeps 28. The last three lines are the sizes: a `float` uses
4 bytes, a `double` 8, and a `decimal` 16.

The largest value that each one can hold is different again:

```csharp exec
id: numbers-with-a-decimal-point-2
Console.WriteLine(float.MaxValue);
Console.WriteLine(double.MaxValue);
Console.WriteLine(decimal.MaxValue);
```

`E+38` means "times 10 to the power of 38", so the largest `float` is
$3.4028235 \times 10^{38}$. The largest `double` goes much further, to
`E+308`. The largest `decimal` is only 79228162514264337593543950335. So
each type is good at something different:

- `double` is C#'s usual type for a number with a decimal point. It is for
  measurements, such as a distance, a temperature or a time. It keeps
  about 16 digits, over a huge range.
- `decimal` is for money. It keeps 28 digits, and it stores 0.1 exactly,
  as [Dividing](lesson:dividing-in-csharp) showed. It is slower than a
  `double`, and it uses 16 bytes.
- `float` uses half the memory of a `double`, and keeps about half the
  digits. Games and graphics use it: they keep millions of numbers, and a
  few digits are enough to place something on a screen.

A number written with a decimal point, such as `1.10`, is a `double`. So a
`float` or a `decimal` needs its letter. This cell is meant not to
compile. It keeps a price in a `decimal`. What does the compiler say?

```csharp exec
id: numbers-with-a-decimal-point-3
expect: CS0664
decimal price = 1.10;
Console.WriteLine(price * 3);
```

The message is:

```console
Program.cs(1,17): error CS0664: Literal of type double cannot be implicitly converted to type 'decimal'; use an 'M' suffix to create a literal of this type
```

A *literal* is a value written in the code, such as `1.10`, `5` or
`"HELLO"`. A *suffix* is a letter at the end of a literal. The compiler
reads `1.10` as a `double`, and it will not put a `double` into a
`decimal` by itself. Can
you make the cell compile? The message says how.

```inputs
price * 3
```

```hint
after: 2 errors
Which letter does the message ask for? Where does it go?
```

```solution
decimal price = 1.10m;
Console.WriteLine(price * 3);
---
It prints 3.30. The `m` makes `1.10` a `decimal` literal, and a small `m`
works as well as the `M` in the message. A `decimal` keeps the two decimal
places of `1.10`, so the answer looks like a price. The
[practice page](lesson:types-and-their-sizes-practice) does the same sum
with a `double`.
```

## Characters, true or false, and text

What do you think each line of this cell prints?

```csharp exec
id: characters-true-or-false-and-text-1
string message = "MEET AT NOON";
Console.WriteLine(sizeof(char));
Console.WriteLine(sizeof(bool));
Console.WriteLine(message.Length);
Console.WriteLine(message.Length * sizeof(char));
```

A `char` uses 2 bytes, which is 16 bits. So it has 65536 patterns, as the
second line of the cell in *Bits, bytes and patterns* showed. That is
enough for the letters of
many alphabets, not only A to Z: `'é'`, `'ñ'` and `'Ω'` are all `char`
values.

A `bool` uses 1 byte, although `true` and `false` need only one bit. Each
byte of memory has its own number, called its *address*, and a single bit
has none. So one byte is the smallest amount of memory that a variable
can use.

A `string` has no fixed size. Each of its characters is a `char`, so this
message of 12 characters needs 24 bytes for its characters. A string needs
some bytes more, to keep its length.

## Converting from one type to another

A type name in brackets before a value, such as `(int)` in `(int)3.7`, is
a *cast*. It asks C# to convert the value to that type. C# needs a cast to
convert a `double` to an `int`, but it converts an `int` to a `double` by
itself, as [Variables and types](lesson:storing-and-computing#type-conversion)
showed. The sizes explain why.

A *widening* conversion goes to a type that can hold every value of the
old type, so nothing is lost. Every `int` fits in a `long`, and in a
`double`. C# makes these conversions by itself. A *narrowing* conversion
goes to a type that cannot hold every value of the old type, so part of
the value may be lost. A `long` to an `int` is narrowing, and so are a
`double` to an `int` and an `int` to a `byte`. C# makes these only when
the code asks, with a cast.

A red of 200, made 100 brighter, is 300. What do you think the last line
prints?

```csharp exec
id: converting-from-one-type-to-another-1
int brighter = 300;
long asLong = brighter;           // widening: C# does it by itself
double asDouble = brighter;       // widening too
byte asByte = (byte)brighter;     // narrowing: only with a cast
Console.WriteLine(asLong);
Console.WriteLine(asDouble);
Console.WriteLine(asByte);
```

```predict
type: choice

What will the last line print?

- 300
  - The cast changes the type, and keeps the value.
- 255
  - A `byte` stops at its largest value.
- 44
  - A `byte` starts again at 0 after 255, as an `int` started again after
    its largest value.
- It stops with an exception
  - 300 does not fit in a `byte`.
```

The last line prints 44. 300 does not fit in a `byte`, and the cast keeps
only the part that fits. After 255, a `byte` starts again at 0, and 300
becomes 44. If you chose pixel art on
[the practice page for Variables and types](lesson:storing-and-computing-practice#10-past-the-end),
you met this number there: `300 % 256` is 44 too. The cast did what the
code asked, and nothing warned you.

A pixel's red is kept in a `byte`, at its brightest, 255. The next cell
adds 1 to it. It is meant to fail. After a Run, the page says which of
three things happened: it did not compile, it stopped with an exception,
or it ran. Which do you think it will be?

```csharp exec
id: converting-from-one-type-to-another-2
expect: CS0266
byte red = 255;
red = red + 1;
Console.WriteLine(red);
```

It does not compile. The message is:

```console
Program.cs(2,7): error CS0266: Cannot implicitly convert type 'int' to 'byte'. An explicit conversion exists (are you missing a cast?)
```

It is CS0266, the message from
[Compiler errors](lesson:compiler-errors#a-value-of-another-type) about a
conversion that could lose something. But `red` is a `byte`, so where does
the `int` come from? C# does no arithmetic on a `byte`: it converts each
`byte` to an `int` first. And `1`, like every whole number written in the
code, is an `int` already. So `red + 1` is an `int`. An `int` does not
always fit in a `byte`, so C# will not convert it by itself. Can you add a
cast, so that the cell compiles? What will it print then?

```inputs
red
```

```hint
after: 2 errors
The cast has to convert all of `red + 1`, not only `red`. What do
brackets do in a calculation?
```

```solution
byte red = 255;
red = (byte)(red + 1);
Console.WriteLine(red);
---
It prints 0. The brightest red became no red at all, with no error.
`red + 1` is an `int`, and the cast keeps only the part that fits in a
`byte`. The brackets matter: `(byte)red + 1` converts only `red`, and
then adds 1, so the answer is an `int` again, and the cell still does not
compile.
```

A cast from `double` to `int` keeps the whole part and drops the rest, as
`(int)3.7` did. `Convert.ToInt32` converts to an `int` too, but it rounds
to the nearest whole number. `Convert` is part of .NET, the system that
runs C# programs, and `Int32` is .NET's own name for `int`: an *integer*,
or whole number, in 32 bits. What do you think the second line prints?

```csharp exec
id: converting-from-one-type-to-another-3
Console.WriteLine((int)2.5);
Console.WriteLine(Convert.ToInt32(2.5));
Console.WriteLine(Convert.ToInt32(3.5));
Console.WriteLine((int)-3.7);
Console.WriteLine(Convert.ToInt32(-3.7));
Console.WriteLine(Math.Round(2.5));
```

```predict
type: choice

What will the second line print?

- 2
  - The same as the cast in the first line.
- 3
  - 2.5 is halfway, and halfway rounds up, as at school.
- 2.5
  - Can an `int` have a decimal part?
```

The second line prints 2, and the third prints 4. With a cast, -3.7
becomes -3. With `Convert.ToInt32`, it becomes -4, the nearest whole
number. But 2.5 is exactly halfway between 2 and 3. There,
`Convert.ToInt32` chooses the even number: 2.5 becomes 2, and 3.5 becomes
4. This is called *rounding to even*, or *banker's rounding*. When a
program rounds every half up, a total of many rounded numbers grows too
large. Rounding to the even number rounds down about as often as it
rounds up, so the total stays close. `Math.Round` does the same, as the
last line shows. (So does Python's `round`.)

### Your turn

<div class="dl-world" data-world="secret-messages">

A spy's program counts the letters in each day's messages. It keeps each
count in a `byte`, to save memory. Today's three messages have 120, 90
and 75 letters. What does the program print for the total? Where did the
other letters go? Can you change the program so that it prints the true
total?

```csharp exec
id: your-turn-1--secret-messages
byte first = 120;
byte second = 90;
byte third = 75;
byte total = (byte)(first + second + third);
Console.WriteLine($"Letters today: {total}");
```

```inputs
total
```

```hint
after: 2 runs
What is the largest value that a `byte` can hold? Is the total of the
three messages larger than that?
```

```solution
byte first = 120;
byte second = 90;
byte third = 75;
int total = first + second + third;
Console.WriteLine($"Letters today: {total}");
---
It prints 285. Each count fits in a `byte`, but their total does not.
`first + second + third` is already an `int`, so an `int` total needs no
cast, and nothing is lost. In the program you started with, the cast made
the program compile, and it also hid the overflow: 285 letters became 29.
```

</div>

<div class="dl-world" data-world="pixel-art">

A brush makes a pixel brighter by adding 100 to its red. The red is a
`byte`. What does the program print for a red of 200? Is that brighter?
Can you change the program so that the red stops at 255, the brightest
that a `byte` can hold? `Math.Min(a, b)` gives the smaller of two
numbers.

```csharp exec
id: your-turn-1--pixel-art
byte red = 200;
byte brighter = (byte)(red + 100);
Console.WriteLine($"Red after the brush: {brighter}");
```

```inputs
brighter
```

```hint
after: 2 runs
`red + 100` is an `int`. Which is smaller: that number, or 255? Which one
should the brush keep?
```

```solution
byte red = 200;
byte brighter = (byte)Math.Min(red + 100, 255);
Console.WriteLine($"Red after the brush: {brighter}");
---
It prints 255. The program you started with printed 44: the cast kept
only the part of 300 that fits in a `byte`, and the bright red became
almost black. `Math.Min` gives the smaller of `red + 100` and 255, so the
answer always fits, and the cast loses nothing.
[Decisions](lesson:making-decisions) shows another way, with `if`.
```

</div>

## A data dictionary

Here are the types on this page, with the sizes and values that the cells
above printed:

| Type | Size | What it holds |
|---|---|---|
| `byte` | 1 byte | a whole number from 0 to 255 |
| `short` | 2 bytes | a whole number from -32,768 to 32,767 |
| `int` | 4 bytes | a whole number from -2,147,483,648 to 2,147,483,647 |
| `long` | 8 bytes | a whole number from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| `float` | 4 bytes | a number with a decimal point: about 8 digits, up to 3.4028235E+38 |
| `double` | 8 bytes | a number with a decimal point: about 16 digits, up to 1.7976931348623157E+308 |
| `decimal` | 16 bytes | a number with a decimal point: 28 digits, up to 79228162514264337593543950335 |
| `char` | 2 bytes | one character |
| `bool` | 1 byte | `true` or `false` |
| `string` | 2 bytes for each character, and some more | text |

Many books call all of these except `string` *primitive types*: the
simplest types, built into the language, each holding one value of a
fixed size. A `string` is built in too, but it has no fixed size.

A *data dictionary* is a table that lists every variable in a program:
its name, its type, its size, and what it holds. A programmer can write
one before the program, as part of the plan. Later, it tells anybody who
reads the program what each name means, and why each type was chosen. In
Programming and Design Principles, the brief for the first assessed
program asks for one.

Here is the Caesar shift from
[Variables and types](lesson:storing-and-computing#putting-it-together-a-small-program)
again. It moves a letter three places along the alphabet, and after Z it
starts again at A.

```csharp exec
id: a-data-dictionary-1
char letter = 'X';
int shift = 3;
int position = letter - 'A';            // A is 0, B is 1
int moved = (position + shift) % 26;    // 0 again after Z
char newLetter = (char)(moved + 'A');
Console.WriteLine($"{letter} becomes {newLetter}");
```

And here is its data dictionary:

| Name | Type | Size | What it holds |
|---|---|---|---|
| `letter` | `char` | 2 bytes | the letter to move: a capital letter, from A to Z |
| `shift` | `int` | 4 bytes | how many places to move it along the alphabet, from 0 to 25 |
| `position` | `int` | 4 bytes | the letter's place in the alphabet, counting A as 0, from 0 to 25 |
| `moved` | `int` | 4 bytes | the place after the move, from 0 to 25 |
| `newLetter` | `char` | 2 bytes | the letter after the move: a capital letter, from A to Z |

`shift`, `position` and `moved` hold only 0 to 25, so a `byte` could hold
each of them, in 1 byte and not 4. Why might a programmer still choose
`int`? For five variables, the memory saved is too small to matter. For a
million values, it would matter. And arithmetic gives an `int`, even on a
`char`: `letter - 'A'` is an `int`, as `red + 1` was. So `position` and
`moved` would each need a cast to be a `byte`. A data dictionary is a good
place to explain a choice like this.

### Your turn

Can you write a data dictionary for this program? Write it as comments at
the top of the cell: one line for each variable, with its name, its type,
its size and what it holds. Could any variable use a smaller type?

<div class="dl-world" data-world="secret-messages">

```csharp exec
id: your-turn-2--secret-messages
string message = "MEET AT NOON";
int shift = 3;
int letterCount = message.Length;
char firstLetter = message[0];
bool sent = false;
Console.WriteLine($"{letterCount} characters, starting with {firstLetter}, shift {shift}, sent: {sent}");
```

```hint
after: 2 runs
Start with one variable, such as `sent`. What is its type? What does the
table of types say about its size?
```

```solution
// Name         Type    Size                                  What it holds
// message      string  2 bytes for each character, and more  the message to send
// shift        int     4 bytes                               how many places to move each letter, from 0 to 25
// letterCount  int     4 bytes                               how many characters the message has
// firstLetter  char    2 bytes                               the first character of the message
// sent         bool    1 byte                                whether the message has been sent
string message = "MEET AT NOON";
int shift = 3;
int letterCount = message.Length;
char firstLetter = message[0];
bool sent = false;
Console.WriteLine($"{letterCount} characters, starting with {firstLetter}, shift {shift}, sent: {sent}");
---
Here is one answer. Yours may be different and work too. `shift` could be
a `byte`, because it holds only 0 to 25. `letterCount` could be a `short`
for a short message, but a message can be longer than 32,767 characters,
so `int` is safer. `message[0]` is the first character of the message, and
it is a `char`.
```

</div>

<div class="dl-world" data-world="pixel-art">

This program keeps each part of a colour in an `int`. Which type would you
choose for them?

```csharp exec
id: your-turn-2--pixel-art
string title = "Sunset";
int width = 64;
int height = 48;
int red = 255;
int green = 140;
int blue = 0;
bool inColour = true;
Console.WriteLine($"{title}: {width} × {height}, rgb({red}, {green}, {blue}), in colour: {inColour}");
```

```hint
after: 2 runs
What is the smallest and the largest value that `red` could ever hold?
Which type in the table holds exactly that range?
```

```solution
// Name      Type    Size                                  What it holds
// title     string  2 bytes for each character, and more  the picture's name
// width     int     4 bytes                               the width in pixels
// height    int     4 bytes                               the height in pixels
// red       byte    1 byte                                the red part of the colour, from 0 to 255
// green     byte    1 byte                                the green part of the colour, from 0 to 255
// blue      byte    1 byte                                the blue part of the colour, from 0 to 255
// inColour  bool    1 byte                                whether the picture is in colour
string title = "Sunset";
int width = 64;
int height = 48;
byte red = 255;
byte green = 140;
byte blue = 0;
bool inColour = true;
Console.WriteLine($"{title}: {width} × {height}, rgb({red}, {green}, {blue}), in colour: {inColour}");
---
Here is one answer. Yours may be different and work too. Each part of a
colour is from 0 to 255, which is exactly the range of a `byte`, so it
needs 1 byte and not 4. The width and the height could be a `short` for a
small picture, but a picture can be wider than 32,767 pixels, so `int` is
safer. The program prints the same line with either type.
```

</div>

## Looking back

Overflow gave an answer that made no sense, and nothing warned you.
`checked` stopped the program instead. Which would you rather have in a
program that keeps a bank balance? In a game that counts points? Why?

A challenge: many computers count time as the number of seconds since the
start of 1970. Some older ones keep that count in an `int`. In which year
does the count pass the largest `int`? What would the computer's clock say
one second later?

```csharp challenge
// Many computers count time in seconds,
// from the start of 1970, in an int.
// In which year does the count pass the largest int?
int secondsInADay = 60 * 60 * 24;
Console.WriteLine(secondsInADay);
Console.WriteLine(int.MaxValue);
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio.

Next, the [practice page](lesson:types-and-their-sizes-practice) has more
problems on sizes, overflow and conversions, and a data dictionary for a
program from an earlier page. The next lesson depends on your course:
[Decisions](lesson:making-decisions) in Programming and Design Principles,
and [Reading input](lesson:reading-input) in Fundamentals of
Object-Oriented Programming.

## Where to read more

Microsoft. *Integral numeric types (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types>.
The official table of C#'s types for whole numbers, with the range and
size of each one, including the ones that this course does not use.

Microsoft. *Floating-point numeric types (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types>.
The same for `float`, `double` and `decimal`: how far each one reaches, how
many digits it keeps, and when to choose `decimal`.

Microsoft. *Built-in numeric conversions (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/numeric-conversions>.
Which conversions C# makes by itself, and which need a cast. It also says
that a few of the conversions C# makes by itself can lose digits at the
end of a number, such as an `int` to a `float`.

Stand-up Maths (2019). *Why didn't GPS crash?*
<https://www.youtube.com/watch?v=iyz7dSnZItw>. GPS counts weeks with only
10 bits, so the count starts again at zero every 1024 weeks. Matt Parker
explains what happened when it did, in 2019. The video is about twelve
minutes long.
