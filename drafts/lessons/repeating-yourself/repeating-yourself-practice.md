---
title: "Loops: practice"
version: 2026.09.27.1
from: repeating-yourself-practice
practice_for: repeating-yourself
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Loops: practice

These problems are on loops, with three from earlier pages. Before you
write any loop, ask three questions. What does the loop collect as it
runs? What does that start at? What makes the loop stop? Each problem has
an answer or a solution under it, for when you have tried it. A starting
cell shows a warning, CS0219, while your code does not use one of its
variables. A warning does not stop the program.

## 1. What a for loop gives

```csharp exec
id: range-1
for (int i = 5; i < 5; i++)
{
    Console.WriteLine(i);
}
Console.WriteLine("After the loop");
```

```predict
type: choice

What will it print?

- 5, then After the loop
  - `i` starts at 5, so the first line is 5.
- After the loop, and nothing before it
  - The condition is checked before the body runs, even the first time.
- 0, 1, 2, 3 and 4, then After the loop
  - This is what `int i = 0` would give.
```

Then can you say which numbers these four loops give, and try each one in
the cell?

- `for (int i = 0; i < 5; i++)`
- `for (int i = 1; i < 5; i++)`
- `for (int i = 0; i < 10; i += 3)`
- `for (int i = 5; i > 0; i--)`

<details class="dl-answer"><summary>answer</summary>

The cell prints only `After the loop`. `i` starts at 5, and `5 < 5` is
`false`, so the body never runs. A for loop checks its condition before
the body, as a while loop does.

The four loops give 0 to 4; 1 to 4; 0, 3, 6 and 9; and 5 down to 1. With
`<`, the number in the condition is never included. So for "1 to n",
programmers write `i <= n`, or `i < n + 1`.

</details>

## 2. How many numbers

How many numbers does this loop give?

```csharp
for (int i = 1; i <= 100; i++)
```

And this one?

```csharp
for (int i = 0; i < 100; i++)
```

<details class="dl-answer"><summary>answer</summary>

100 each. They give different numbers, but the same count of them. With
`<` and a step of 1, the count is the stop minus the start: $100 - 0$. This
is one reason programmers like to count from 0 and stop before the end.

</details>

## 3. The odd numbers

Can you print the odd numbers from 1 to 99, all on one line? Then can you
do it a second way?

```csharp exec
id: the-odd-numbers-1
// The odd numbers from 1 to 99, on one line

```

```solution
title: counting in twos
for (int number = 1; number < 100; number += 2)
{
    Console.Write($"{number} ");
}
Console.WriteLine();
---
The loop takes fifty steps, and every step prints.
```

```solution
title: counting in ones, with an if
for (int number = 1; number < 100; number++)
{
    if (number % 2 == 1)
    {
        Console.Write($"{number} ");
    }
}
Console.WriteLine();
---
This one takes ninety-nine steps, with a test at each. Both print the same
line. The first says what it means more directly.
```

## 4. One to a hundred

Can you find the sum of the numbers from 1 to 100 with a loop?

```csharp exec
id: one-to-a-hundred-1
int total = 0;

Console.WriteLine(total);
```

```inputs
total
```

```solution
int total = 0;
for (int i = 1; i <= 100; i++)
{
    total += i;
}
Console.WriteLine(total);
---
5050. There is a story that the young Gauss saw it as fifty pairs, each
with a sum of 101, which gives the formula $\frac{n(n + 1)}{2}$. When a
formula like that exists, it is an easy test for your loop.
```

## 5. A sum of fractions

The *harmonic series* is the sum $1 + \frac{1}{2} + \frac{1}{3} +
\frac{1}{4} + \dots$, adding $\frac{1}{i}$ for each whole number $i$. This
cell adds its first 10 terms.

```csharp exec
id: a-sum-of-fractions-1
double total = 0;
for (int i = 1; i <= 10; i++)
{
    total += 1 / i;
}
Console.WriteLine(total);
```

```predict
type: choice

What will it print?

- about 2.93
  - One, plus a half, plus a third, and so on, up to a tenth.
- 1
  - What is `1 / 2` when both numbers are `int`?
- It does not compile
  - Can an `int` be added to a `double`?
```

Can you find why it prints what it does? Then can you change one thing,
so that the cell adds the fractions?

```hint
after: 1 runs
What does `1 / 2` give in C#, when both numbers are `int`? And `1 / 3`?
```

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

The cell prints 1. `1` and `i` are both `int`, so `1 / i` is division of
whole numbers, and it drops the part after the decimal point. For every
`i` above 1, that leaves 0. So the loop adds 1, then 0 nine times.
`total` is a `double`, but that does not change the division: C# divides
first, and then adds the 0 to `total`.

Write `1.0 / i` instead. `1.0` is a `double`, so the division keeps its
decimal places, and the cell prints 2.9289682539682538.
[Dividing in C#](lesson:dividing-in-csharp) looks at `/` more closely.

</details>

## 6. Ten factorial

Can you calculate 10! with a loop? Why does the accumulator start at 1,
and not at 0?

```csharp exec
id: ten-factorial-1
int product = 1;

Console.WriteLine(product);
```

```inputs
product
```

```solution
int product = 1;
for (int i = 1; i <= 10; i++)
{
    product *= i;
}
Console.WriteLine(product);
---
3628800. Starting at 0, it would be 0 for ever, because zero times any
number is zero. Each accumulator starts at the value that changes nothing:
0 for a sum, 1 for a product.
```

What does the same loop give for 13!? Can you change the 10 to 13 in your
cell, and run it?

<details class="dl-answer"><summary>what happens</summary>

It prints 1932053504, and 13! is 6,227,020,800. That is too big for an
`int`, whose largest value is 2,147,483,647. When an `int` passes its
largest value, it starts again from its smallest value, and continues
from there, with no error. The result is still a number, so nothing warns
you that it is not 13!.

`long` holds whole numbers up to 9,223,372,036,854,775,807. With
`long product = 1;`, the loop prints 6227020800.

</details>

## 7. A sum that never settles

What is the sum $1 + \frac{1}{2} + \frac{1}{3} + \dots$ after 1,000 terms?
After 10,000? Does it settle at some value?

```csharp exec
id: a-sum-that-never-settles-1
double total = 0;
for (int i = 1; i <= 1000; i++)
{
    total += 1.0 / i;
}
Console.WriteLine(total);
```

<details class="dl-answer"><summary>answer</summary>

About 7.485 after 1,000 terms, and about 9.788 after 10,000. It never
settles. The sum grows without limit, but so slowly that it needs more
than $10^{43}$ terms to reach 100. So "the terms are getting smaller" is
not enough to make a sum stop growing.

</details>

## 8. The largest

Can you find the largest number in a row of numbers with a loop? The
curly brackets in the first line make an *array*: several values of one
type under one name. The page on arrays and lists meets them properly. For
now, `foreach (int number in numbers)` takes each number in turn, and
`numbers[0]` is the first one.

```csharp exec
id: the-largest-1
int[] numbers = { 3, 17, 4, 22, 8 };
int largest = numbers[0];

Console.WriteLine(largest);
```

```inputs
largest
```

```solution
int[] numbers = { 3, 17, 4, 22, 8 };
int largest = numbers[0];
foreach (int number in numbers)
{
    if (number > largest)
    {
        largest = number;
    }
}
Console.WriteLine(largest);
---
22. C# arrays have a method that does this, `numbers.Max()`, but the loop
is how it works inside.
```

The cell starts `largest` at the first number in the array. Why not at 0?

<details class="dl-answer"><summary>answer</summary>

Starting at 0, an array of numbers that are all below zero would report 0
as its largest, and 0 is not in the array. With `{ -3, -17, -4 }`,
starting at 0 gives 0, and starting at `numbers[0]` gives -3. The first
number is in the array, so the answer is always one of the array's
numbers.

</details>

## 9. A loop that never ends

What will this do, and why?

```csharp
int number = 10;
while (number > 0)
{
    Console.WriteLine(number);
}
```

<details class="dl-answer"><summary>answer</summary>

It prints 10 for ever. Nothing inside the loop changes `number`, so the
condition never becomes `false`. Every while loop needs something inside
it that moves it towards stopping. When a loop never stops, check that
first. On this page, **Stop** ends a program that is running.

A semicolon straight after the condition, `while (number > 0);`, does the
same, even when the body changes `number`. The semicolon is an empty
statement, and it becomes the loop's whole body, so nothing ever changes
`number`. The compiler shows warning CS0642, *Possible mistaken empty
statement*, at the semicolon.

</details>

## 10. Halving

```csharp exec
id: halving-1
double number = 100;
int count = 0;
while (number >= 1)
{
    number = number / 2;
    count++;
}
Console.WriteLine(count);
```

```predict
type: number

How many times does it halve 100 before the value drops below 1?
```

<details class="dl-answer"><summary>why</summary>

Seven: 50, 25, 12.5, 6.25, 3.125, 1.5625 and 0.78125. With
`int number = 100;`, each `/ 2` drops the part after the decimal point:
50, 25, 12, 6, 3, 1 and 0. That is also seven, and the loop still ends, at
0.

</details>

## 11. While or for

When would you use `while`, when `for`, and when `foreach`?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`foreach` is for every item of a string, an array or a list: every letter
of a message. `for` is for a known count: every number from 1 to 100, or
every column of a picture. `while` is for a condition: until the shift
gives E, or until the answer stops changing. Each is awkward in another's
job. A while loop counting to ten needs its own counter, written in three
places, and a for loop that has to stop early needs a way to leave the
loop.

</details>

## 12. Past a million

Can you find the smallest power of 2 above 1,000,000?

```csharp exec
id: past-a-million-1
int power = 1;

Console.WriteLine(power);
```

```inputs
power
```

```solution
int power = 1;
while (power <= 1_000_000)
{
    power *= 2;
}
Console.WriteLine(power);
---
1048576, which is $2^{20}$. C# lets you write `1_000_000` with
underscores, to make a big number easier to read. This is why a
"megabyte" is sometimes 1,048,576 bytes, not a million.
```

## 13. A triangle, and a triangle the other way

Can you print a triangle five rows tall: one `#` on the first row, and five
on the last? Then the same triangle mirrored, so that every row ends in the
same column?

```csharp exec
id: a-triangle-1
// Five rows: # on the first, ##### on the last

```

```solution
title: with what you've met so far
for (int row = 1; row <= 5; row++)
{
    for (int column = 1; column <= row; column++)
    {
        Console.Write("#");
    }
    Console.WriteLine();
}
for (int row = 1; row <= 5; row++)
{
    for (int space = 1; space <= 5 - row; space++)
    {
        Console.Write(" ");
    }
    for (int column = 1; column <= row; column++)
    {
        Console.Write("#");
    }
    Console.WriteLine();
}
---
For the second triangle, the spaces are the hard part. How do you know it
is `5 - row` spaces, not `5 - row - 1`? Try the first and last rows, not
the middle ones: a count that is one too many, or one too few, usually
shows at the first or the last row.
```

```solution
title: a shorter way you'll meet later
for (int row = 1; row <= 5; row++)
{
    Console.WriteLine(new string('#', row));
}
for (int row = 1; row <= 5; row++)
{
    Console.WriteLine(new string(' ', 5 - row) + new string('#', row));
}
---
`new string('#', row)` makes a string of `row` copies of the character
`#`. The inner loop is still there, inside C#'s own code.
```

## 14. Three or seven

How many numbers from 1 to 100 can be divided by 3 *or* by 7?

```csharp exec
id: three-or-seven-1
int count = 0;

Console.WriteLine(count);
```

```inputs
count
```

```solution
int count = 0;
for (int i = 1; i <= 100; i++)
{
    if (i % 3 == 0 || i % 7 == 0)
    {
        count++;
    }
}
Console.WriteLine(count);
---
43. There are 33 multiples of 3 and 14 of 7, and 33 + 14 is 47, not 43:
the four multiples of 21 were counted twice. Subtracting them once is
called inclusion–exclusion.
```

## 15. Backwards

<div class="dl-world" data-world="secret-messages">

Some of the simplest codes write a message backwards. Can you reverse
`"RETTO"` with a loop?

```csharp exec
id: backwards-1--secret-messages
string message = "RETTO";
string backwards = "";

Console.WriteLine(backwards);
```

```inputs
backwards
```

```hint
after: 1 runs
An accumulator can add to the front as well as the end. What does
`letter + backwards` do, where `backwards + letter` would add to the end?
```

```solution
string message = "RETTO";
string backwards = "";
foreach (char letter in message)
{
    backwards = letter + backwards;
}
Console.WriteLine(backwards);
---
Each new letter goes in front of the ones before it, so the last letter
comes first: `OTTER`.
```

</div>

<div class="dl-world" data-world="pixel-art">

A row of pixels, written `#` for lit and `.` for dark, can be mirrored
from left to right. Can you mirror `"##..#."` with a loop?

```csharp exec
id: backwards-1--pixel-art
string row = "##..#.";
string mirrored = "";

Console.WriteLine(mirrored);
```

```inputs
mirrored
```

```hint
after: 1 runs
An accumulator can add to the front as well as the end. What does
`pixel + mirrored` do, where `mirrored + pixel` would add to the end?
```

```solution
string row = "##..#.";
string mirrored = "";
foreach (char pixel in row)
{
    mirrored = pixel + mirrored;
}
Console.WriteLine(mirrored);
---
Each new pixel goes in front of the ones before it, so the row is
mirrored: `.#..##`. Do it to every row of a picture, and the picture faces
the other way.
```

</div>

## 16. Five hundred primes

A *prime* is a whole number above 1 that only 1 and itself divide. Can you
find the sum of the first 500 primes?

```csharp exec
id: five-hundred-primes-1
int total = 0;
int found = 0;
int number = 1;

Console.WriteLine(total);
```

```inputs
total
```

```hint
after: 1 runs
Why is the outer loop a while loop? Nobody knows in advance which number is
the 500th prime. Inside it, a second loop tries each divisor from 2
upwards. Do you need to try divisors bigger than the square root of
`number`?
```

```solution
int total = 0;
int found = 0;
int number = 1;
while (found < 500)
{
    number++;
    bool isPrime = true;
    int divisor = 2;
    while (divisor * divisor <= number)
    {
        if (number % divisor == 0)
        {
            isPrime = false;
        }
        divisor++;
    }
    if (isPrime)
    {
        total += number;
        found++;
    }
}
Console.WriteLine(total);
---
824693. A divisor bigger than the square root of `number` always has a
partner smaller than it, so there is nothing new to find above the square
root. That is why the test is `divisor * divisor <= number`, and it is
what makes the program fast enough to finish.
```

## 17. Adding the digits

Can you find the sum of the digits of 9,876,543, without changing the
number to text?

```csharp exec
id: adding-the-digits-1
int number = 9876543;
int total = 0;

Console.WriteLine(total);
```

```inputs
total
```

```hint
after: 1 runs
What does `number % 10` give? What does `number / 10` do to `number`, when
both are `int`?
```

```solution
int number = 9876543;
int total = 0;
while (number > 0)
{
    total += number % 10;
    number = number / 10;
}
Console.WriteLine(total);
---
42. `% 10` gives the last digit, and `/ 10` removes it, because dividing
two `int` values drops the part after the decimal point. That pair takes
the digits of any number, one at a time, from the end.
```

## 18. Up and down to one

The Collatz rule says: if a number is even, halve it. If it is odd,
multiply it by three and add one. Starting from 27, how many steps does it
take to reach 1, and how high does it climb on the way?

```csharp exec
id: up-and-down-to-one-1
int number = 27;
int steps = 0;
int highest = 27;

Console.WriteLine($"{steps} steps, highest {highest}");
```

```inputs
steps
highest
```

```solution
int number = 27;
int steps = 0;
int highest = 27;
while (number != 1)
{
    if (number % 2 == 0)
    {
        number = number / 2;
    }
    else
    {
        number = 3 * number + 1;
    }
    steps++;
    if (number > highest)
    {
        highest = number;
    }
}
Console.WriteLine($"{steps} steps, highest {highest}");
---
111 steps, and it climbs as high as 9232. Nobody has proved that this rule
reaches 1 for every starting number, and nobody has found one that does
not. So this loop is known to stop for every number anyone has tried, but
not known to stop in general, which is an unusual thing for a program this
short.
```

## 19. From earlier: a remainder

From [the first page](lesson:first-steps). A film is 200 minutes long. How
many whole hours is that, and how many minutes remain?

<details class="dl-answer"><summary>answer</summary>

`200 / 60` is 3 hours, and `200 % 60` is 20 minutes. With two `int`
values, `/` counts the whole hours, and `%` gives what is left.

</details>

## 20. From earlier: one letter back

From [the page about variables and types](lesson:storing-and-computing).
A Caesar shift of 10 moved a letter, and it became K. Which letter was it?

```csharp exec
id: from-earlier-one-letter-back-1
char letter = 'K';
int shift = 10;

```

```solution
char letter = 'K';
int shift = 10;
int position = letter - 'A';
int moved = (position - shift + 26) % 26;
Console.WriteLine((char)(moved + 'A'));
---
A. Moving backwards is the same shift with a minus. Adding 26 before `% 26`
matters for a letter before K. Try `'C'`: without `+ 26`, the number
before `%` is -8, `%` keeps its sign, and the program prints `9`. With
`+ 26`, it prints `S`.
[Dividing in C#](lesson:dividing-in-csharp) looks at `%` and negative
numbers.
```

## 21. From earlier: the order of the questions

From the page on decisions. This gives every brightness from 64 up the
same character. Why?

```csharp
if (brightness >= 64)
{
    pixel = "-";
}
else if (brightness >= 128)
{
    pixel = "+";
}
else if (brightness >= 192)
{
    pixel = "#";
}
```

<details class="dl-answer"><summary>answer</summary>

C# runs the body of the first condition that is `true`, and skips the
rest. Every brightness of 128 or 192 is also 64 or more, so the first
path catches them all. With `>=`, the check with the largest number goes
first.

</details>
