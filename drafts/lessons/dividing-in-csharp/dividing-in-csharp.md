---
title: "Dividing: a closer look at /, % and 0.1"
version: 2026.09.27.1
from: dividing-in-python
---

# Dividing: a closer look at /, % and 0.1

On [the page about variables and types](lesson:storing-and-computing),
every value had a type. Dividing is one place where the types of the
numbers change the answer. What do you think these two lines print? Run
the cell and see.

```csharp exec
id: dividing-two-ways-1
Console.WriteLine(7 / 2);
Console.WriteLine(7.0 / 2);
```

The first line prints 3, and the second prints 3.5. The only difference is
the decimal point in `7.0`.

`7` and `2` are both `int` values: whole numbers. When both numbers are
`int` values, `/` gives an `int`, so the answer has no decimal part. `7.0`
is a `double`, a number that can have a decimal part. When either number
is a `double`, `/` gives a `double`, and the answer keeps its .5. So C# has
one sign, `/`, for two kinds of dividing, and the types of the two numbers
decide which one happens.

With positive numbers, `/` with two `int` values seems to remove the part
after the decimal point. Here are two ideas about what it does. Both
are reasonable, and they cannot both be true.

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

Run it. It prints -3, as idea A predicts. C# removes the part after the
decimal point. For a negative answer, that moves it up the number line,
towards zero, and not down.

Can you find a division where `/` gives the same answer as rounding down,
and one where it does not? What decides which? Try a few in the cell.

<details class="dl-answer"><summary>what decides it</summary>

When the answer is positive, removing the decimal part and rounding down
give the same answer: `7 / 2` is 3. When the answer is negative and not
whole, removing the decimal part gives the whole number nearer to zero:
`-7 / 2` is -3, where rounding down would give -4. When the division is
exact, there is nothing to remove or round: `-8 / 2` is -4.

</details>

## Why idea B is easy to believe

Most of the numbers we divide are positive: people, prices, minutes. For
all of them, removing the decimal part and rounding down give the same
answer. So people often say that dividing whole numbers "rounds down", and
with positive numbers, nothing ever shows the difference.

Some tools do round down. A spreadsheet's `INT` rounds down, and so does
`//` in Python. C# rounds down too, when a program asks it to: `Math.Floor`
is a method that rounds a `double` down to the whole number just below it.
So idea B is a real rule. It is not the rule that `/` follows in C#.

C#'s rule is the one that lets `/` and `%` work as a pair. `%` gives the
*remainder*: the part that is left after the division.

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
number is negative, the remainder is negative or 0.

## Where else it happens

A negative remainder matters in a program that counts in a circle, as a
clock does. A 24-hour clock shows the hours from 0 to 23, and after 23 it
starts again at 0. `% 24` is meant to keep an hour in that range. It is 2
o'clock in the morning. What time was it 5 hours ago?

```csharp exec
id: where-else-it-happens-1
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
21:00, which is 9 in the evening. `2 - 5` is -3, and `%` kept its
sign.

Can you change the calculation so that the cell prints 21?

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

Add 24 before the `%`:

```csharp
int earlier = (hour - hoursBack + 24) % 24;
```

24 hours is a whole day, so adding it does not change the time on the
clock. It makes the number positive before `%` sees it, and the cell
prints 21. This works when `hoursBack` is 24 or less. A Caesar shift has
the same problem when it moves a letter backwards, past A, and adding 26
solves it in the same way.

</details>

Decimals have a surprise of their own. What will this print?

```csharp exec
id: where-else-it-happens-2
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
last few digits. Later pages compare `double` values by asking whether
they are close, not whether they are exactly the same.

C# has one more type for numbers with a decimal point: `decimal`. It
stores a number in decimal digits, as we write it, so 0.1 is exact. It is
made for money, where a total must be exact to the cent. A `decimal`
number ends in `m`, as in `0.1m`. Can you change `0.1` to `0.1m` in the
cell and run it again? What changes?

<details class="dl-answer"><summary>what changes</summary>

The first line prints 0.3, the same as the second. `0.1m * 3` is a
`decimal` calculation, and a `decimal` holds 0.1 exactly, so three of them
make exactly 0.3. A `double` is faster, and it can hold much larger and
much smaller numbers, so C# programs use `double` for measurements, such
as a distance or a temperature, and `decimal` for money.

</details>

## Where to read more

Microsoft's C# documentation describes what `/` and `%` do with every type
of number, including what happens when you divide by zero:
[Arithmetic operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/arithmetic-operators).

[The Floating-Point Guide](https://floating-point-gui.de/) explains, in
plain words, why 0.1 is not exact, and what programmers do about it. Its
[page for C#](https://floating-point-gui.de/languages/csharp/) shows both
`double` and `decimal`.
