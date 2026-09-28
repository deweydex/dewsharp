---
title: "Dividing: a closer look at /, % and 0.1"
version: 2026.09.28.1
from: dividing-in-python
covers: [PDP-LO4]
---

# Dividing: a closer look at /, % and 0.1

[Your first C# program](lesson:first-steps#a-few-more-things-c-can-do)
showed that `/` with two whole numbers gives a whole number.
[Variables and types](lesson:storing-and-computing) showed that every value
has a type. Dividing is one place where the types of the numbers change the
answer. What do you think these lines print? Run the cell and see.

```csharp exec
id: dividing-two-ways-1
Console.WriteLine(7 / 2);
Console.WriteLine(7.0 / 2);
Console.WriteLine(1 / 2);
Console.WriteLine(1.0 / 2);
```

The first line prints 3, and the second prints 3.5. The only difference is
the decimal point in `7.0`. The last two lines divide 1 by 2 in the same
two ways: `1 / 2` is 0, because half of 1 has no whole part, and `1.0 / 2`
is 0.5.

`7` and `2` are both `int` values: whole numbers. When both numbers are
`int` values, `/` gives an `int`, so the answer has no decimal part. `7.0`
is a `double`, a number that can have a decimal part. When either number
is a `double`, `/` gives a `double`, and the answer keeps its .5. So C# has
one sign, `/`, for two kinds of dividing, and the types of the two numbers
decide which one happens.

With positive numbers, `/` with two `int` values seems to remove the part
after the decimal point. Here are two ideas about what it does. Both are
reasonable, and they cannot both be true.

**Idea A.** `/` with two `int` values divides, then removes everything
after the decimal point. `7.0 / 2` is 3.5, so `7 / 2` is 3.

**Idea B.** `/` with two `int` values divides, then rounds down, to the
whole number just below the answer. 3.5 rounds down to 3.

For 7 and 2, both ideas give 3. We need a case where they give different
answers.

## An experiment

`-7.0 / 2` is -3.5. Idea A removes the .5 and gives -3. Idea B rounds down.
On a number line, the whole number just below -3.5 is -4, so idea B gives
-4.

```csharp exec
id: an-experiment-1
Console.WriteLine(-7.0 / 2);
Console.WriteLine(-7 / 2);
```

```predict
type: choice

What will the last line print?

- -3
  - This is what idea A predicts.
- -4
  - This is what idea B predicts.
- -3.5
  - This is what the line above prints. Are -7 and 2 `int` values or
    `double` values?
```

Run it. The last line prints -3, as idea A predicts. C# removes the part
after the decimal point. For a negative answer, that moves the answer
towards zero: -3 is nearer to zero than -3.5 is. Rounding down would move
it the other way, away from zero, to -4.

C# can round down too, when a program asks it to. `Math.Floor` is a method
that rounds a `double` down to a whole number. Each line of this cell
prints what `/` gives, and then what rounding down gives, for the same two
numbers.

```csharp exec
id: an-experiment-2
Console.WriteLine($"{7 / 2} and {Math.Floor(7.0 / 2)}");
Console.WriteLine($"{-7 / 2} and {Math.Floor(-7.0 / 2)}");
Console.WriteLine($"{-8 / 2} and {Math.Floor(-8.0 / 2)}");
```

Can you find a division where `/` gives the same answer as rounding down,
and one where it does not? What decides which? Change the numbers in a
line, in both places, or copy a line and try a division of your own.

<details class="dl-answer"><summary>what decides it</summary>

When the answer is positive, removing the decimal part and rounding down
give the same answer: `7 / 2` is 3, and so is `Math.Floor(7.0 / 2)`. When
the answer is negative and not whole, removing the decimal part gives the
whole number nearer to zero: `-7 / 2` is -3, where rounding down gives -4.
When the division is exact, there is nothing to remove or round: `-8 / 2`
is -4 both ways.

</details>

## Why idea B is easy to believe

Most of the numbers we divide are positive: people, prices, minutes. For
all of them, removing the decimal part and rounding down give the same
answer. So people often say that dividing whole numbers "rounds down", and
with positive numbers, nothing ever shows the difference.

Some tools do round down. A spreadsheet's `INT` rounds down, and so does
`Math.Floor`, as the cell above showed. If you have written Python, you may
know `//`, which divides and then rounds down. Python gives these answers:

```python
print(-7 // 2)    # -4
print(-7 % 2)     # 1
```

So idea B is a real rule. It is not the rule that `/` follows in C#.

In C#, `/` and `%` still work as a pair, as on the first page. `%` gives
the *remainder*: the part that is left after the division.

```csharp exec
id: why-idea-b-is-easy-to-believe-1
int twos = -7 / 2;
int remainder = -7 % 2;
Console.WriteLine($"{twos} twos, and a remainder of {remainder}");
Console.WriteLine(twos * 2 + remainder);
```

`-7 / 2` is -3 and `-7 % 2` is -1, and $-3 \times 2 + (-1) = -7$, the
number we started with. The whole number and the remainder always rebuild
the number. For that to work with -3, the remainder has to be -1. A
number's *sign* says whether it is positive or negative. In C#, a
remainder has the same sign as the number being divided, so when that
number is negative, the remainder is negative or 0. Python's answers
rebuild -7 too, with -4 and 1. Each language chose one rule for `/`, and
its `%` follows it.

## Where else it happens

A negative remainder matters in a program that counts in a circle, as a
clock does. A 24-hour clock shows the hours from 0 to 23, and after 23 it
starts again at 0. `% 24` is meant to keep an hour in that range. It is 2
o'clock in the morning. What time was it 5 hours earlier?

```csharp exec
id: where-else-it-happens-2
int hour = 2;
int hoursBack = 5;
int earlier = (hour - hoursBack) % 24;
Console.WriteLine(earlier);
```

```predict
type: number

What will it print?
```

```hint
after: 2 runs
How many hours can you add to a time without changing what the clock
shows?
```

It prints -3, and a clock has no hour -3. Five hours before 2 o'clock is
21:00, which is 9 in the evening. `2 - 5` is -3, and `%` kept its sign.

Can you change the calculation so that the cell prints 21?

```inputs
earlier
```

```solution
int hour = 2;
int hoursBack = 5;
int earlier = (hour - hoursBack + 24) % 24;    // + 24, so it is never below 0
Console.WriteLine(earlier);
---
Add 24 before the `%`. 24 hours is a whole day, so adding it does not
change the time on the clock. It makes the number 0 or more before `%`
sees it, and the cell prints 21. This works when `hoursBack` is 24 or
less. The secret-messages task on
[Variables and types](lesson:storing-and-computing#putting-it-together-a-small-program)
had the same problem, with a Caesar shift that moves a letter backwards,
past A. Adding 26 solved it in the same way.
```

Decimals have a surprise of their own. What will this print?

```csharp exec
id: where-else-it-happens-1
Console.WriteLine(0.1 * 3);
Console.WriteLine(0.3);
```

```predict
type: choice

Will the two lines be the same?

- Yes
  - Three tenths are 0.3.
- No
```

It prints 0.30000000000000004, and then 0.3. A computer stores numbers in
*binary*, with only the digits 0 and 1. 0.1 has no exact binary form, in
the same way that a third has no exact decimal form (0.333…). A `double`
holds 0.1 as the nearest number it can, and multiplying by 3 makes the
small difference bigger.

So two calculations that should give the same decimal can differ in the
last few digits. A program that compares two `double` values asks whether
they are close, not whether they are exactly the same.
[The practice page for Variables and types](lesson:storing-and-computing-practice#11-point-one-plus-point-two)
shows how.

C# has one more type for numbers with a decimal point: `decimal`. It
stores a number in decimal digits, as we write it, so 0.1 is exact. It is
made for money, where a total must be exact to the cent. A `decimal`
number ends in `m`, as in `0.1m`. This cell does the same calculation
twice, first with a `double` and then with a `decimal`. What do you think
the second line prints?

```csharp exec
id: where-else-it-happens-3
Console.WriteLine(0.1 * 3);
Console.WriteLine(0.1m * 3);
```

<details class="dl-answer"><summary>why</summary>

The second line prints 0.3. `0.1m * 3` is a `decimal` calculation, and a
`decimal` holds 0.1 exactly, so three of them make exactly 0.3. A `double`
is faster, and it can hold much larger and much smaller numbers, so C#
programs use `double` for measurements, such as a distance or a
temperature, and `decimal` for money.

</details>

Everything on this page runs here, in the browser, and nothing needs
Visual Studio.

## Where to read more

Microsoft. *Arithmetic operators (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/arithmetic-operators>.
The official description of what `/` and `%` do with every type of number.
Its part on integer division says that the answer is "rounded toward
zero", which is idea A in other words. Its part on round-off errors
multiplies 0.1 by 3, as this page did, and shows that a `decimal` cannot
hold a third exactly. It also says what happens when a program divides by
zero.
