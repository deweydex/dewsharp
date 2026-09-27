---
title: "Powers: a closer look at Math.Pow and ^"
version: 2026.09.27.1
from: powers-in-python
---

# Powers: a closer look at Math.Pow and ^

This page looks closely at one calculation from
[the first page](lesson:first-steps): a power. C# has no operator for a
power. An *operator* is a symbol that does a calculation, such as `+` or
`*`. For a power, C# has a method instead. A *method* is a named piece of
code that does one job, as `Console.WriteLine` does. `Math.Pow(2, 3)` gives
two to the power of three, which is 8.

Many people write a power another way, with `^`, as in `2^3`. Here are two
ideas about what `^` does in C#. Both are reasonable, and they cannot both
be true.

**Idea A.** `^` means a power, as it does on a calculator or in a
spreadsheet. `2 ^ 3` is a shorter way to write `Math.Pow(2, 3)`.

**Idea B.** In C#, only `Math.Pow` gives a power. `^` does some other job.

## An experiment

Idea A says both lines print 8. Idea B says the second line prints
something else. Or C# may not accept `^` here at all. Then the program does
not compile, and neither line prints, because C# checks the whole program
before it runs any of it.

```csharp exec
id: an-experiment-1
Console.WriteLine(Math.Pow(2, 3));
Console.WriteLine(2 ^ 3);
```

```predict
type: choice

What will the second line print?

- 8
  - This is what idea A predicts.
- 1
- Nothing: the program does not compile
```

Run it. The second line prints 1, so idea B matches what happens. `^` is
an operator too, and C# accepts it: the program compiles and runs. `^`
does a job from logic, not arithmetic, so the number it gives is not a
power. That is the dangerous part. Nothing warns you.

Why does the compiler not find the problem? The compiler checks that the
types on each line fit together. `2 ^ 3` passes that check. It is a
calculation with two `int` values, and it gives an `int`. It is not the
calculation you meant, and the compiler has no way to know that.

Can you find two numbers where `^` and `Math.Pow` give the same answer?
Try a few in the cell.

<details class="dl-answer"><summary>one pair that does it</summary>

It is hard to find one. `2 ^ 2` is 0 and `Math.Pow(2, 2)` is 4. `5 ^ 2` is
7 and `Math.Pow(5, 2)` is 25. Even `0 ^ 1` gives 1 and `Math.Pow(0, 1)`
gives 0. With whole numbers from 0 to 20, only `1 ^ 0` and `Math.Pow(1, 0)`
agree: both give 1. So a test with ordinary numbers almost always shows the
mistake, if somebody checks the answer.

Did you try a number with a decimal point, such as `2.5 ^ 2`? Then the
program did not compile. The message was:

```console
error CS0019: Operator '^' cannot be applied to operands of type 'double' and 'int'
```

`^` works with whole numbers, but not with a `double`, so here the compiler
does find the mistake.

</details>

## Why idea A is easy to believe

Idea A is not a strange idea. It is what many tools do. On a calculator,
the power key is often marked `^`. In a spreadsheet, `=2^3` gives 8. In
an email or a message, people type `x^2` when they cannot write a small
raised 2. So `^` means "power" in many places a reader has been before C#.

C# took `^` from the language C, where it does this logic job. C has no
operator for a power either. It has a function for powers, called `pow`,
and C# has the method `Math.Pow`.

If you have written Python, you may know `**` for a power. C# has no `**`,
and `2 ** 3` does not compile. The message, error CS0193, talks about a
*pointer*, which this course does not use. C# reads the second `*` as a
different operator. If you see that message, the line it names probably
has a `**` in it.

## Where else it happens

Here is a second surprise with powers. A square room is 5 metres on each
side, so its floor is 5 squared: 25 square metres. This cell keeps the
answer in an `int`. When you press Run, one of three things can happen.
The program does not compile, and nothing runs. Or it stops with an
*exception*: it runs until it reaches a line it cannot complete. Or it
runs. Which one happens here?

```csharp exec
id: where-else-it-happens-1
expect: CS0266
int area = Math.Pow(5, 2);
Console.WriteLine(area);
```

```predict
type: choice

What will happen when you press Run?

- It runs and prints 25
  - `Math.Pow` gives a `double`. What type is `area`?
- It stops with an exception
  - An exception can happen only while a program runs. Did this one start?
- It does not compile, so nothing runs
```

Run it. It does not compile. This cell is meant to fail, so nothing is
broken. The compiler's message is:

```console
Program.cs(1,12): error CS0266: Cannot implicitly convert type 'double' to 'int'. An explicit conversion exists (are you missing a cast?)
```

Read it in the usual order: the file, the line, the column, the code, and
what the compiler found. Line 1, column 12 is where `Math.Pow` starts.
`Math.Pow` always gives a `double`, a number that can have a decimal part,
even when the answer is a whole number. An `int` holds only whole numbers.
To *convert* a value is to change it to another type. *Implicitly* means
without being told to. C# never converts a `double` to an `int` unless the
code tells it to, because the decimal part could be lost. The end of the
message suggests a *cast*, which is one way to tell C# to convert. A later
page explains casts.

Can you make the cell print 25? It takes one change.

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

Change `int` to `double`: `double area = Math.Pow(5, 2);`. A `double` can
hold what `Math.Pow` gives, and the cell prints 25. `Console.WriteLine` shows a whole `double`
without a decimal point, so the output alone does not tell you the type.

</details>

The two surprises on this page end in different ways. `2 ^ 3` compiled and
ran, and it gave a number that is not a power. `int area = Math.Pow(5, 2);`
did not compile, and the message said where the problem was. The compiler
checks that the types fit. It cannot check that a calculation is the one
you meant. To check that, run the program and read what it prints.

## Where to read more

Microsoft's C# documentation lists every operator and the order C# uses
them in:
[C# operators and expressions](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/).
The page for
[`Math.Pow`](https://learn.microsoft.com/dotnet/api/system.math.pow) shows
what it gives for every kind of number, including some unusual ones.
