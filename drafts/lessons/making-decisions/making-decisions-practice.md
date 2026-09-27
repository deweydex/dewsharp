---
title: "Decisions: practice"
version: 2026.09.27.1
from: making-decisions-practice
practice_for: making-decisions
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Decisions: practice

Before you write an `if`, find which values make its condition `true`.
When a decision goes a way you did not expect, look first at the
condition, not the lines under it. Each problem has an answer or a
solution under it, for when you have tried it. Some cells are meant not to
compile, and the problem says so. A starting cell whose variables your
code does not use yet shows a warning, CS0219. A warning does not stop the
program.

## 1. Capitals and small letters

```csharp exec
id: capitals-and-small-letters-1
Console.WriteLine('a' < 'B');
```

```predict
type: choice

What will it print?

- True
  - In the alphabet, a comes before b.
- False
  - Capital letters have smaller numbers than small letters.
```

Then can you try `'a' - 'A'`, `10 == 10.0` and `"10" == 10` in the cell?

<details class="dl-answer"><summary>why</summary>

`False`. C# compares two `char` values by the numbers they are stored as.
`'B'` is 66 and `'a'` is 97, so every capital comes before every small
letter, even one later in the alphabet.

`'a' - 'A'` is 32: each small letter is 32 places after its capital.
`10 == 10.0` is `True`, because both are the number ten. `"10" == 10`
does not compile. The message is CS0019, *Operator '==' cannot be applied
to operands of type 'string' and 'int'*: C# does not compare text with a
number.

</details>

## 2. One equals sign or two

What is the difference between `=` and `==`? This cell has one of them
where it needs the other, and it is meant to fail. Can you say what the
compiler will find, before you run it?

```csharp exec
id: one-equals-sign-or-two-1
expect: CS0029
int lives = 3;
if (lives = 0)
{
    Console.WriteLine("Game over");
}
Console.WriteLine($"Lives left: {lives}");
```

<details class="dl-answer"><summary>answer</summary>

`=` stores a value in a variable. `==` asks a question, and gives `true`
or `false`.

The cell does not compile. The message is:

```console
Program.cs(2,5): error CS0029: Cannot implicitly convert type 'int' to 'bool'
```

`lives = 0` stores 0 in `lives`. In C#, that also has a value of its own,
the value it stored: the `int` 0. The condition of an `if` must be a
`bool`, and C# does not treat a number as one. With `lives == 0`, the cell prints `Lives left: 3`.

In C, the language that C# takes these signs from, `if (lives = 0)`
compiles. It stores 0 in `lives`, and the body never runs: the player has
no lives left, and the program never says "Game over". A later page, a
closer look at the equals sign, has more.

</details>

## 3. Strictly between

Can you set `between` to `true` when `number` is strictly between 10 and
20, and to `false` otherwise?

```csharp exec
id: strictly-between-1
int number = 15;
bool between = false;

Console.WriteLine(between);
```

```inputs
between
```

```solution
int number = 15;
bool between = number > 10 && number < 20;
Console.WriteLine(between);
---
"Strictly between" does not include 10 and 20 themselves, so the
comparisons are `>` and `<`, not `>=` and `<=`.
```

Maths writes this as $10 < n < 20$. Can you try `10 < number < 20` in the
cell? What does the compiler say?

<details class="dl-answer"><summary>what the compiler says</summary>

It does not compile. The message is CS0019, *Operator '<' cannot be
applied to operands of type 'bool' and 'int'*. C# does `10 < number`
first, and that gives a `bool`. Then it tries to ask whether that `bool`
is less than 20, and a `bool` is not a number. Some languages, Python
among them, read the maths form as two comparisons joined by "and". C#
needs the `&&`.

</details>

## 4. Three ifs instead of else if

```csharp exec
id: three-ifs-instead-of-elif-1
int brightness = 150;
if (brightness >= 64)
{
    Console.WriteLine("-");
}
if (brightness >= 128)
{
    Console.WriteLine("+");
}
if (brightness >= 192)
{
    Console.WriteLine("#");
}
```

How many lines will it print for a brightness of 150? And for 200?

<details class="dl-answer"><summary>why</summary>

Two lines for 150, `-` and `+`, and three for 200. Separate `if`
statements are separate questions, and C# asks each one in turn. `else if`
means "otherwise, ask this", so only one path runs. A pixel should get one
character, so it needs `else if`, with the check with the largest number
first.

</details>

## 5. Positive, negative or zero

Can you set `sign` to `"positive"`, `"negative"` or `"zero"`, whatever
`number` holds?

```csharp exec
id: positive-negative-or-zero-1
int number = 0;
string sign = "";

Console.WriteLine(sign);
```

```inputs
sign
```

```solution
int number = 0;
string sign = "";
if (number > 0)
{
    sign = "positive";
}
else if (number < 0)
{
    sign = "negative";
}
else
{
    sign = "zero";
}
Console.WriteLine(sign);
---
There are three cases, and zero has to be one of them. With
`if (number >= 0)` for "positive", zero is called positive, and zero is
exactly the value a tester tries first.
```

## 6. Even and positive

Can you set `description` to something like `"even and positive"` or
`"odd and negative"`, from two separate decisions?

```csharp exec
id: even-and-positive-1
int number = -7;
string description = "";

Console.WriteLine(description);
```

```inputs
description
```

```solution
title: with what you've met so far
int number = -7;
string parity;
if (number % 2 == 0)
{
    parity = "even";
}
else
{
    parity = "odd";
}
string sign;
if (number > 0)
{
    sign = "positive";
}
else if (number < 0)
{
    sign = "negative";
}
else
{
    sign = "zero";
}
string description = $"{parity} and {sign}";
Console.WriteLine(description);
---
Even or odd, and the sign, are two separate questions, so the code makes
two separate decisions. One long `if` would need six paths. The test for
even is `== 0`. Problem 17 shows why, in C#, a test for odd with `== 1`
misses some odd numbers.
```

```solution
title: a shorter way C# has
int number = -7;
string parity = number % 2 == 0 ? "even" : "odd";
string sign = number > 0 ? "positive" : number < 0 ? "negative" : "zero";
string description = $"{parity} and {sign}";
Console.WriteLine(description);
---
`number % 2 == 0 ? "even" : "odd"` is an if-else that fits in one line.
It gives `"even"` when the condition is `true`, and `"odd"` when it is
`false`. The `?` and `:` together are called the *conditional operator*.
```

## 7. And, or, not

This cell prints every result of `&&` and `||`, for every pair of `bool`
values.

```csharp exec
id: boolean-operators-1
Console.WriteLine($"true,  true:   && gives {true && true},   || gives {true || true}");
Console.WriteLine($"true,  false:  && gives {true && false},  || gives {true || false}");
Console.WriteLine($"false, true:   && gives {false && true},  || gives {false || true}");
Console.WriteLine($"false, false:  && gives {false && false},  || gives {false || false}");
```

What does each of these give: `true && false`, `true || false`, `!true`,
`!(5 > 3)`, `(5 > 3) && (2 > 4)`, `(5 > 3) || (2 > 4)`? You can check each
one by adding a line to the cell.

<details class="dl-answer"><summary>answer</summary>

`False`, `True`, `False`, `False`, `False`, `True`.

</details>

## 8. Half price

A cinema charges half price to anyone under 16 or over 65. Can you set
`halfPrice` for any `age`?

```csharp exec
id: half-price-1
int age = 70;
bool halfPrice = false;

Console.WriteLine(halfPrice);
```

```inputs
halfPrice
```

```solution
int age = 70;
bool halfPrice = age < 16 || age > 65;
Console.WriteLine(halfPrice);
---
With `&&`, nobody would get half price: no age is both under 16 and over
65. When a condition is `true` for nothing, or for everything, look at the
operator first.
```

## 9. A good password

A password is acceptable when it has at least 8 characters and contains a
digit. `password.Length` gives the number of characters. Can you set
`acceptable`?

```csharp exec
id: a-good-password-1
string password = "otter2026";
bool hasDigit = true;
bool acceptable = false;

Console.WriteLine(acceptable);
```

```inputs
acceptable
```

```solution
string password = "otter2026";
bool hasDigit = true;
bool acceptable = password.Length >= 8 && hasDigit;
Console.WriteLine(acceptable);
---
There is no `== true` on the end. `hasDigit` is already `true` or `false`,
so comparing it with `true` adds a step and says nothing new.
```

## 10. A leap year

A year is a leap year when it can be divided by 4, except that a century is
not, unless it can also be divided by 400. So 2024 is, 1900 is not, and 2000
is. Can you set `isLeap` for any `year`?

```csharp exec
id: a-leap-year-1
int year = 1900;
bool isLeap = false;

Console.WriteLine(isLeap);
```

```inputs
isLeap
```

```hint
after: 1 runs
Can you write it in two parts: "divided by 4 and not a century", or
"divided by 400"? Can you write each part on its own first?
```

```solution
int year = 1900;
bool isLeap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
Console.WriteLine(isLeap);
---
C# does not need the round brackets, because it does `&&` before `||`.
They are there for the reader. Try 2024, 2000, 2023 and 1600 too.
```

## 11. Two opposites

Can you write `!(a > b)` in a simpler way? Then, for two `bool` values,
can you write `!(a && b)` in a simpler way?

<details class="dl-answer"><summary>answer</summary>

`a <= b`. The opposite of "greater than" is "less than *or equal to*".
People often forget the equal case.

`!a || !b`. The opposite of "both" is "at least one is not". This is one
of De Morgan's laws. The other says that the opposite of "either" is
"neither": `!(a || b)` is the same as `!a && !b`.

</details>

## 12. A condition that protects

```csharp exec
id: a-condition-that-protects-1
int number = 0;
if (number != 0 && 10 / number > 1)
{
    Console.WriteLine("yes");
}
else
{
    Console.WriteLine("no");
}
```

```predict
type: choice

What will it print?

- yes
  - 10 divided by something is more than 1.
- no
  - The first half is `false`, so the whole `&&` is `false`.
- It stops with an exception
  - Dividing a whole number by zero stops a C# program.
```

<details class="dl-answer"><summary>why</summary>

It prints `no`, with no exception. C# checks the two sides of an `&&` in
order. When the first side is `false`, C# does not check the second side
at all, because nothing there could make the whole thing `true`. This is
called *short-circuiting*, and here it protects the division. `||` does
the same when its first side is `true`. Swap the two conditions, and the
program stops with a `DivideByZeroException`.

C# also has `&` and `|`, with a single character. With two `bool` values
they give the same answers as `&&` and `||`, but they always check both
sides. With `&` in this cell, the program stops with the same exception.

</details>

## 13. Opposite signs

Can you set `opposite` to `true` when one of `first` and `second` is
negative and the other is positive?

```csharp exec
id: opposite-signs-1
int first = 0;
int second = -5;
bool opposite = false;

Console.WriteLine(opposite);
```

```inputs
opposite
```

```solution
title: with what you've met so far
int first = 0;
int second = -5;
bool opposite = (first < 0 && second > 0) || (first > 0 && second < 0);
Console.WriteLine(opposite);
```

```solution
title: a shorter way
int first = 0;
int second = -5;
bool opposite = (first < 0) != (second < 0);
Console.WriteLine(opposite);
---
This asks whether "`first` is negative" and "`second` is negative" differ.
The two solutions give different answers for zero: here, with 0 and -5,
the first gives `False` and this one `True`. The question did not say what
to do with zero. When a question has a gap, whoever writes the code
decides, and should say how.
```

## 14. Near a hundred

Can you set `near` to `true` when `number` is within 20 of 100, or within
20 of 200? `Math.Abs` gives the size of a number without its sign:
`Math.Abs(-7)` is 7.

```csharp exec
id: near-a-hundred-1
int number = 185;
bool near = false;

Console.WriteLine(near);
```

```inputs
near
```

```solution
int number = 185;
bool near = Math.Abs(number - 100) <= 20 || Math.Abs(number - 200) <= 20;
Console.WriteLine(near);
---
`Math.Abs(number - target) <= 20` is the general shape of "within 20 of".
It saves two comparisons for each target.
```

## 15. One more path

<div class="dl-world" data-world="secret-messages">

The tutorial's Caesar shift moves capitals. Can you set `moved` so that a
small letter moves too, counting from `'a'`, and anything else stays as it
is?

```csharp exec
id: one-more-path-1--secret-messages
char character = 'q';
int shift = 3;
char moved = ' ';

Console.WriteLine(moved);
```

```inputs
moved
```

```hint
after: 1 runs
Three paths: a capital counts from `'A'`, a small letter from `'a'`, and
anything else stays as it is. Which method from the tutorial tells a
capital from a small letter?
```

```solution
char character = 'q';
int shift = 3;
char moved = ' ';
if (char.IsUpper(character))
{
    moved = (char)((character - 'A' + shift) % 26 + 'A');
}
else if (char.IsLower(character))
{
    moved = (char)((character - 'a' + shift) % 26 + 'a');
}
else
{
    moved = character;
}
Console.WriteLine(moved);
---
`q` moves to `t`. The two letter paths are the same shift, with a
different starting letter.
```

</div>

<div class="dl-world" data-world="pixel-art">

A colour pixel has a red, a green and a blue, each from 0 to 255. Its
brightness is roughly the average of the three. Can you set `pixel` to
`"#"` when the brightness is 128 or more, and to `"."` otherwise?

```csharp exec
id: one-more-path-1--pixel-art
int red = 200;
int green = 40;
int blue = 90;
string pixel = "";

Console.WriteLine(pixel);
```

```inputs
pixel
```

```hint
after: 1 runs
Can you find the brightness first, and give it a name? Then there are two
paths, as in the tutorial.
```

```solution
int red = 200;
int green = 40;
int blue = 90;
string pixel = "";
int brightness = (red + green + blue) / 3;
if (brightness >= 128)
{
    pixel = "#";
}
else
{
    pixel = ".";
}
Console.WriteLine(pixel);
---
The brightness is 110, so it is `.`. The `/` here has two `int` values,
so it drops any part after the point. That cannot change the answer:
dropping a fraction never moves a number past a whole number such as 128.

An eye sees green as brighter than red or blue, so real programs weigh
the three differently. The plain average is a fair start.
```

</div>

## 16. A possible triangle

A triangle is possible when each side is shorter than the other two added
together. Can you set `possible` for any three sides?

```csharp exec
id: a-possible-triangle-1
int sideA = 1;
int sideB = 10;
int sideC = 2;
bool possible = false;

Console.WriteLine(possible);
```

```inputs
possible
```

```solution
int sideA = 1;
int sideB = 10;
int sideC = 2;
bool possible = sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
Console.WriteLine(possible);
---
All three comparisons are needed. Checking only `sideA + sideB > sideC`
lets 1, 10, 2 through, because the long side is not the one in the
`sideC` place.
```

## 17. An odd number below zero

This problem uses an idea from
[the closer look at dividing](lesson:dividing-in-csharp).

```csharp exec
id: an-odd-number-below-zero-1
int number = -7;
if (number % 2 == 1)
{
    Console.WriteLine("odd");
}
else
{
    Console.WriteLine("even");
}
```

```predict
type: choice

What will it print?

- odd
  - -7 is odd, and odd numbers leave a remainder of 1.
- even
```

Can you find why it prints what it does? Then can you change the
condition so that the cell prints `odd` for -7, and for 7 too?

```hint
after: 1 runs
What does `-7 % 2` give in C#? Can you print it?
```

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

The cell prints `even`, and -7 is odd. `-7 % 2` is -1 in C#. A remainder
has the same sign as the number being divided, so for an odd number below
zero it is -1, never 1. So `number % 2 == 1` is `false` for every odd
number below zero.

Ask whether the remainder is not 0: `if (number % 2 != 0)`. That is
`true` for 7, where the remainder is 1, and for -7, where it is -1.

</details>

## 18. A semicolon too many

This cell has one character too many, on purpose. What do you think it
prints for a brightness of 100?

```csharp exec
id: a-semicolon-too-many-1
int brightness = 100;
if (brightness >= 192);
{
    Console.WriteLine("#");
}
```

<details class="dl-answer"><summary>why</summary>

It prints `#`, though 100 is less than 192. The semicolon after the
condition ends the if statement, so its body is empty. The lines in the
curly brackets are no longer part of the `if`, and they run every time.

The program compiles, and the compiler shows a *warning*: a message about
code that compiles, but may not do what you meant. It does not stop the
program. This one is:

```console
Program.cs(2,23): warning CS0642: Possible mistaken empty statement
```

Line 2, column 23 is the semicolon. Delete it, and the cell prints nothing
for 100.

</details>

## 19. A path with no value

This cell is meant to fail. Can you make it compile in two different
ways?

```csharp exec
id: a-path-with-no-value-1
expect: CS0165
int brightness = 100;
string pixel;
if (brightness >= 128)
{
    pixel = "#";
}
Console.WriteLine(pixel);
```

```hint
after: 1 errors
When the brightness is below 128, which line gives `pixel` a value?
```

<details class="dl-answer"><summary>two ways</summary>

Here is one answer. Yours may be different and work too.

The message is:

```console
Program.cs(7,19): error CS0165: Use of unassigned local variable 'pixel'
```

*Unassigned* means it has no value. Before C# uses a variable, it checks
that every path to that line has given it one. When the brightness is
below 128, no line does.

One way is to add an `else` whose body is `pixel = ".";`. Then both paths
give `pixel` a value. The other is to give `pixel` a value where it is
made, `string pixel = ".";`, and keep the `if` as it is. The `if` changes
the value only when the brightness is 128 or more. Both print `.` for 100.

The compiler checks the paths, and not the value that `brightness` holds
this time. The error is there even when the brightness is 200.

</details>
