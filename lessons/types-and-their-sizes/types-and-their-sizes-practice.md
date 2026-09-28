---
title: "Types and their sizes: practice"
version: 2026.09.28.1
practice_for: types-and-their-sizes
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Types and their sizes: practice

These problems are about what each type can hold, how much memory it
uses, and what happens when a value moves from one type to another. Three
of them are like programs on earlier pages, with a change to a type. Try
each one before you open anything under it. Say what you think first,
then run it. Some cells are meant not to compile, and the problem says
so.

## 1. The smallest type that holds it

Which type would you choose for each of these values? Choose the smallest
type that holds every value the variable could need.

- a pixel's green, from 0 to 255
- a Caesar shift, from 0 to 25
- one letter of a secret message
- the number of people in Ireland: 5,149,139 in the 2022 census
- the number of people on Earth: more than 8,000,000,000
- the price of a ticket, €12.50
- a temperature, such as 21.5 °C
- whether a door is open
- the number of days in a year

You can try each one in this cell. The first line is done. If a value does
not fit its type, the program does not compile.

```csharp exec
id: the-smallest-type-that-holds-it-1
byte green = 140;
Console.WriteLine(green);
```

```hint
after: 2 runs
The table of types in the lesson's section *A data dictionary* has each
type's size and what it holds. Which is the first row where the value
fits?
```

```solution
byte green = 140;
byte shift = 13;
char letter = 'Q';
int peopleInIreland = 5149139;
long peopleOnEarth = 8100000000;
decimal ticketPrice = 12.50m;
double temperature = 21.5;
bool doorOpen = false;
short daysInAYear = 365;
Console.WriteLine($"{green} {shift} {letter} {peopleInIreland} {peopleOnEarth}");
Console.WriteLine($"{ticketPrice} {temperature} {doorOpen} {daysInAYear}");
---
Here is one answer. Yours may be different and work too. The people on
Earth need a `long`: they are more than the largest `int`. The price is
money, so it is a `decimal`, and its `m` keeps its two decimal places,
12.50. The days in a year fit in a `short`, but most programmers would use
an `int`, and so would the shift: in a small program, the memory saved is
too small to matter, and `int` needs no casts. In the same way, a `float`
would hold the temperature, but `double` is C#'s usual type for a
measurement.
```

What does the compiler say when a value does not fit? This cell is meant
not to compile.

```csharp exec
id: the-smallest-type-that-holds-it-2
expect: CS0031
byte green = 300;
Console.WriteLine(green);
```

<details class="dl-answer"><summary>the message</summary>

```console
Program.cs(1,14): error CS0031: Constant value '300' cannot be converted to a 'byte'
```

`300` is a literal: a value written in the code. The compiler can see
that 300 does not fit in a `byte`, so it says so before anything
runs. When the value comes from a calculation, as `red + 1` did in the
lesson, the compiler cannot see it, and the cast decides what happens.

</details>

## 2. A byte below zero

<div class="dl-world" data-world="secret-messages">

A spy's program keeps the number of unread messages in a `byte`. It is
already 0, and the program subtracts 1 from it by mistake.

```csharp exec
id: a-byte-below-zero-1--secret-messages
byte unread = 0;
unread = (byte)(unread - 1);
Console.WriteLine(unread);
```

```predict
type: choice

What will it print?

- -1
  - One less than 0.
- 0
  - A `byte` cannot go below 0, so it stays there.
- 255
  - Below 0, a `byte` starts again at its largest value.
- It stops with an exception
  - A `byte` has no numbers below zero.
```

<details class="dl-answer"><summary>why</summary>

It prints 255: no unread messages became 255 of them. A `byte` has no
numbers below zero, so the cast keeps only the part of -1 that fits. The
values of a `byte` are in a circle, like the values of an `int` in the
lesson's picture: one step below 0 is the largest `byte`, 255.

</details>

</div>

<div class="dl-world" data-world="pixel-art">

A pixel's brightness is kept in a `byte`, and it is already 0, as dark as
it can be. A dimmer subtracts 1 from it.

```csharp exec
id: a-byte-below-zero-1--pixel-art
byte brightness = 0;
brightness = (byte)(brightness - 1);
Console.WriteLine(brightness);
```

```predict
type: choice

What will it print?

- -1
  - One less than 0.
- 0
  - A `byte` cannot go below 0, so it stays there.
- 255
  - Below 0, a `byte` starts again at its largest value.
- It stops with an exception
  - A `byte` has no numbers below zero.
```

<details class="dl-answer"><summary>why</summary>

It prints 255: the darkest pixel became the brightest. A `byte` has no
numbers below zero, so the cast keeps only the part of -1 that fits. The
values of a `byte` are in a circle, like the values of an `int` in the
lesson's picture: one step below 0 is the largest `byte`, 255.

</details>

</div>

## 3. One past the largest, written in the code

The lesson kept `int.MaxValue` in a variable before it added 1. This cell
adds 1 to it directly. It is meant not to compile. What do you think the
message says?

```csharp exec
id: one-past-the-largest-written-in-the-code-1
expect: CS0220
Console.WriteLine(int.MaxValue + 1);
```

<details class="dl-answer"><summary>why</summary>

The message is:

```console
Program.cs(1,19): error CS0220: The operation overflows at compile time in checked mode
```

`int.MaxValue` and `1` are both *constants*: values that are fixed in the
code, before the program runs. A literal is one kind of constant. So the
compiler does the sum itself, while it checks the program, and it always
checks a sum of constants for overflow. *At compile time* means while the
program is compiled, before it runs, and *in checked mode* means with the
checks that `checked` asks for. With a variable, as in the lesson, the sum
waits until the program runs, and then C# checks only where the code says
`checked`.

</details>

## 4. A century in seconds

A year has `60 * 60 * 24 * 365` seconds. This program keeps a century's
seconds in a `long`, which is large enough to hold them. Run it. What
does the second line print, and why? Can you make it print the number of
seconds in a century?

```csharp exec
id: a-century-in-seconds-1
int secondsInAYear = 60 * 60 * 24 * 365;
long secondsInACentury = secondsInAYear * 100;
Console.WriteLine(secondsInAYear);
Console.WriteLine(secondsInACentury);
```

```inputs
secondsInACentury
```

```hint
after: 2 runs
`secondsInAYear` is an `int`, and `100` is an `int`. What type is
`secondsInAYear * 100`, before C# puts it in the `long`?
```

```solution
int secondsInAYear = 60 * 60 * 24 * 365;
long secondsInACentury = (long)secondsInAYear * 100;
Console.WriteLine(secondsInAYear);
Console.WriteLine(secondsInACentury);
---
It prints 3153600000. C# calculates the part after the `=` first, and
only then puts the answer in the variable. `secondsInAYear * 100` is two
`int` values, so C# multiplies them as `int` values, and the answer
overflows before it reaches the `long`. The cast makes `secondsInAYear` a
`long` first, so the multiplication is done with `long` values, and the
answer fits. Making `secondsInAYear` a `long` works too.
```

## 5. A price in double and in decimal

Three tickets cost €1.10 each. This cell keeps the price as a `double` and
as a `decimal`.

```csharp exec
id: a-price-in-double-and-in-decimal-1
double priceAsDouble = 1.10;
decimal priceAsDecimal = 1.10m;
Console.WriteLine(priceAsDouble * 3);
Console.WriteLine(priceAsDecimal * 3);
```

```predict
type: choice

What will the first line print?

- 3.3
  - Three times 1.10 is 3.30.
- 3.30
  - The price has two decimal places, so the answer has two.
- 3.3000000000000003
  - A `double` cannot store 1.10 exactly.
```

<details class="dl-answer"><summary>why</summary>

The first line prints 3.3000000000000003, and the second prints 3.30. A
`double` stores a number in binary, and 1.10 has no exact binary form, as
0.1 had none on [Dividing](lesson:dividing-in-csharp). The small
difference grows when it is multiplied. A `decimal` stores a number in
decimal digits, as we write it, so 1.10 is exact, and it keeps the two
decimal places. Money is counted in exact cents, so it belongs in a
`decimal`, or in whole cents in an `int`, as in
[Counting in cents](lesson:storing-and-computing-practice#14-counting-in-cents).

</details>

## 6. A cast that loses a digit

A price of €1234567.89 is kept in a `double`, and then cast to a `float`.

```csharp exec
id: a-cast-that-loses-a-digit-1
double price = 1234567.89;
float rough = (float)price;
Console.WriteLine(price);
Console.WriteLine(rough);
```

```predict
type: choice

What will the second line print?

- 1234567.89
  - A `float` has a decimal point too.
- 1234567.9
  - A `float` keeps fewer digits than a `double`.
- 1234567
  - A cast drops the part after the point.
```

<details class="dl-answer"><summary>why</summary>

It prints 1234567.9. A `float` keeps about half the digits of a
`double`: here it kept 8, and it rounded the last one, so the 89 cents
became 90. A cast to a `float` keeps the decimal point, but not every digit.
Only a cast to a whole-number type, such as `(int)`, drops the part after
the point.

This is why money is never kept in a `float`. The larger the number, the
fewer digits are left for the cents.

</details>

## 7. An average that lost its half

This program is like the ones on [Dividing](lesson:dividing-in-csharp),
with one change: the answer is kept in a `double`. It finds the average of
7 points over 2 games, and a `double` can hold a decimal part. Run it.
Where did the .5 go? Can you make it print 3.5?

```csharp exec
id: an-average-that-lost-its-half-1
int totalPoints = 7;
int games = 2;
double average = totalPoints / games;
Console.WriteLine(average);
```

```inputs
average
```

```hint
after: 2 runs
What does `/` do with two `int` values? The `double` is before the `=`.
Does C# know about it when it divides?
```

```solution
int totalPoints = 7;
int games = 2;
double average = (double)totalPoints / games;
Console.WriteLine(average);
---
It prints 3.5. As in problem 4, C# calculates the part after the `=`
first. `totalPoints / games` is two `int` values, so it gives the whole
number 3, and only then does C# widen 3 to a `double`. The cast makes
`totalPoints` a `double` first, so `/` keeps the decimal part.
```

## 8. The next letter

This program is like the Caesar shift on
[Variables and types](lesson:storing-and-computing), with one change: it
does the arithmetic on a `char`, and keeps the answer in the same `char`.
It moves a letter one place along the alphabet. It is meant not to
compile. Can you read the message, and make it print B?

```csharp exec
id: the-next-letter-1
expect: CS0266
char letter = 'A';
letter = letter + 1;
Console.WriteLine(letter);
```

```inputs
letter
```

```hint
after: 2 errors
The message is like the one for `red + 1` in the lesson. What did a cast
do there?
```

```solution
char letter = 'A';
letter = (char)(letter + 1);
Console.WriteLine(letter);
---
It prints B. The message was *Cannot implicitly convert type 'int' to
'char'*. `letter + 1` is arithmetic, so C# does it with an `int`, and the
answer is a number, not a letter. An `int` can be below zero, or far
larger than the number of any character, so C# will not convert an `int`
to a `char` by itself. The cast asks for the character with that number,
B.
```

## 9. Weeks in ten bits

GPS, the system that finds where a phone is, counts weeks in 10 bits. How
many different weeks can 10 bits count, before the count starts again at
0? About how many years is that? A year has a little more than 52 weeks.

```csharp exec
id: weeks-in-ten-bits-1
// How many patterns do 10 bits have?

```

```hint
after: 2 runs
The lesson found the patterns in 8 bits with `Math.Pow`. What changes for
10 bits?
```

```solution
double weeks = Math.Pow(2, 10);
Console.WriteLine(weeks);
Console.WriteLine($"{weeks / 52:F1} years");
---
10 bits have 1024 patterns, so the count can hold 1024 different weeks.
That is about 19.7 years. A year has a little more than
52 weeks, so the true time is a little shorter. The video *Why didn't GPS
crash?*, at the end of the lesson, tells what happened when the count
started again at 0.
```

## 10. Halves

```csharp exec
id: halves-1
Console.WriteLine(Convert.ToInt32(0.5));
Console.WriteLine(Convert.ToInt32(1.5));
Console.WriteLine(Convert.ToInt32(2.5));
Console.WriteLine(Convert.ToInt32(3.5));
```

```predict
type: number

What will the first line print?
```

What will the other three lines print? Say what you think, then run it.

<details class="dl-answer"><summary>why</summary>

0, 2, 2 and 4. Each number is exactly halfway between two whole numbers,
and `Convert.ToInt32` chooses the even one each time: 0.5 becomes 0, and
1.5 becomes 2. Two of the four halves went down and two went up. A
program that adds many rounded numbers stays close to the true total this
way.

</details>

## 11. A data dictionary for a program you have met

This program comes from
[Variables and types](lesson:storing-and-computing#type-conversion). It
asks two questions, and waits for you to type the answers. Can you write
its data dictionary as comments at the top of the cell: each variable's
name, type, size and what it holds?

```csharp exec
id: a-data-dictionary-for-a-program-you-have-met-1
stdin: "Aoife\n34\n"
Console.Write("What is your name? ");
string userName = Console.ReadLine();
Console.WriteLine($"Hello, {userName}");

Console.Write("How old are you? ");
string ageText = Console.ReadLine();
int userAge = int.Parse(ageText);
Console.WriteLine($"Next year you will be {userAge + 1}");
```

```hint
after: 2 runs
The program has three variables. Two of them hold the same age. How are
they different?
```

```solution
// Name      Type    Size                                  What it holds
// userName  string  2 bytes for each character, and more  the name the person typed
// ageText   string  2 bytes for each character, and more  the age as the person typed it, as text
// userAge   int     4 bytes                               the age as a whole number, from int.Parse
Console.Write("What is your name? ");
string userName = Console.ReadLine();
Console.WriteLine($"Hello, {userName}");

Console.Write("How old are you? ");
string ageText = Console.ReadLine();
int userAge = int.Parse(ageText);
Console.WriteLine($"Next year you will be {userAge + 1}");
---
Here is one answer. Yours may be different and work too. `ageText` and
`userAge` hold the same age in two types. A data dictionary shows why
the program needs both: `Console.ReadLine()` always gives a string, and
only a number can have 1 added to it. An age fits in a `byte`, but
`int.Parse` gives an `int`, so a `byte` here would need a cast, or
`byte.Parse`.
```

## 12. Why not long for everything?

A `long` holds every value an `int` holds, and far more. So why not use
`long` for every whole number, and never meet overflow?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A `long` uses more memory than an `int`. For one variable that does not
matter much. A program that keeps millions of numbers, such as a picture
or a table of results, needs the extra bytes millions of times. And many
of the values that C# gives are `int` values, such as a string's `Length`
and what `int.Parse` gives, so a program full of `long` values would need
casts.

A `long` can overflow too. It has a largest value, only much further
away. For each variable, ask: what is the largest value it could ever
need? A data dictionary is the place to write the answer.

</details>
