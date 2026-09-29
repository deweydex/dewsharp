---
title: "Powers: a closer look at Math.Pow and ^"
version: 2026.09.28.1
from: powers-in-python
covers: [PDP-LO4, PDP-LO9]
---

# Powers: a closer look at Math.Pow and ^

In [Your first C# program](lesson:first-steps#a-few-more-things-c-can-do),
`Math.Pow(2, 3)` gave 8: two to the power of three. C# has no operator for
a power: no symbol that does it, as `*` does multiplication. It has a
method, `Math.Pow`, instead.

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
  - This is what idea B allows: `^` does some other job, so it gives some
    other number.
- Nothing: the program does not compile
  - This is idea B too, if C# does not accept `^` between two whole
    numbers.
```

Run it. The second line prints 1, so idea B matches what happens. `^` is
an operator too, and C# accepts it: the program compiles and runs. `^`
does a job from logic, not arithmetic, so the number it gives is not a
power. That is the dangerous part. Nothing warns you.

Why does the compiler not find the problem? Every value in C# has a
*type*: the kind of value it is. `2` and `3` are both `int` values, whole
numbers. The compiler checks that the types on each line fit together.
`2 ^ 3` passes that check: `^` takes two `int` values and gives an `int`.
It is not the calculation you meant, and the compiler has no way to know
that.

Can you find two numbers where `^` and `Math.Pow` give the same answer?
This cell tries three pairs. Each line prints what `^` gives, and then
what `Math.Pow` gives, for the same two numbers. Change the numbers in a
line, in both places, or copy a line and try a pair of your own.

```csharp exec
id: an-experiment-2
Console.WriteLine($"{2 ^ 2} and {Math.Pow(2, 2)}");
Console.WriteLine($"{5 ^ 2} and {Math.Pow(5, 2)}");
Console.WriteLine($"{0 ^ 1} and {Math.Pow(0, 1)}");
```

<details class="dl-answer"><summary>one pair that does it</summary>

Here is one answer. Yours may be different and work too.

1 and 0 is one pair that does it: `1 ^ 0` and `Math.Pow(1, 0)` give the
same number. Add a line for that pair to the cell, and run it. Pairs like
this are hard to find. The three pairs in the cell give 0 and 4, 7 and
25, and 1 and 0, and most pairs are like them. So a test with ordinary
numbers almost always shows the mistake, if somebody checks the answer.

Did you try a number with a decimal point, such as `2.5 ^ 2`? Then the
program did not compile. `^` works only with whole numbers, so here the
compiler does find the mistake.

</details>

## Why idea A is easy to believe

Idea A is not a strange idea. It is what many tools do. On a calculator,
the power key is often marked `^`. In a spreadsheet, `=2^3` gives 8. In
an email or a message, people type `x^2` when they cannot write a small
raised 2. So `^` means "power" in many places a reader has been before C#.

C# took `^` from the language C, where it does this logic job. C has no
operator for a power either. It has a function for powers, called `pow`,
and C# has the method `Math.Pow`. An extra lesson in this course,
[Bits that flip](lesson:bits-that-flip), shows what the logic job is, and what it is good for.

If you have written Python, you may know `**` for a power. C# has no `**`.
The next cell is meant not to compile. What do you think the compiler's
message says?

```csharp exec
id: why-idea-a-is-easy-to-believe-1
expect: CS0193
Console.WriteLine(2 ** 3);
```

The message, error CS0193, points at the second `*`, and it talks about a
*pointer*, a part of C# that this course does not use. C# reads the second
`*` as a different operator. If you see that message, the line it names
probably has a `**` in it.

## Where else it happens

Here is a second surprise with powers. A square room is 5 metres on each
side, so its floor is 5 squared: 25 square metres. This cell keeps the
answer in an `int`. It is meant to fail. After a Run, the page says which
of three things happened, as on the first page: it did not compile, it
stopped with an exception, or it ran. Which do you think it will be?

```csharp exec
id: where-else-it-happens-1
expect: CS0266
int area = Math.Pow(5, 2);
Console.WriteLine(area);
```

```predict
type: choice

What will happen when you press Run?

- It runs, and prints a number that is not 25
  - That is what `2 ^ 3` did. Is this the same kind of mistake?
- It stops with an exception
  - An exception can happen only while a program runs. Did this one start?
- It does not compile, so nothing runs
```

It does not compile. The compiler's message is:

```console
Program.cs(1,12): error CS0266: Cannot implicitly convert type 'double' to 'int'. An explicit conversion exists (are you missing a cast?)
```

Read it as on the first page: the file, the place, the code, and what the
compiler found. Line 1, the 12th character along it, is where `Math.Pow`
starts. `Math.Pow` always gives a `double`: a number that can have a
decimal part, even when the answer is a whole number. An `int` holds only
whole numbers. To *convert* a value is to change it to another type.
*Implicitly* means without being told to. C# never converts a `double` to
an `int` unless the code tells it to, because the decimal part could be
lost. The end of the message suggests a *cast*, which is one way to tell
C# to convert. [The next page](lesson:storing-and-computing#type-conversion)
explains casts, and [Types and their sizes](lesson:types-and-their-sizes) has more on them.

Can you make the cell print 25? It takes one change.

```solution
double area = Math.Pow(5, 2);
Console.WriteLine(area);
---
Change `int` to `double`. A `double` can hold what `Math.Pow` gives, and
the cell prints 25. `Console.WriteLine` shows a whole `double` without a
decimal point, so the output alone does not tell you the type. The
message suggests another way, a cast: `int area = (int)Math.Pow(5, 2);`.
```

Why does `Math.Pow` give a `double`, even for 5 squared? Many powers are
not whole numbers. What do you think these lines print?

```csharp exec
id: where-else-it-happens-2
Console.WriteLine(Math.Pow(2, 10));
Console.WriteLine(Math.Pow(10, 2));
Console.WriteLine(Math.Pow(2, 0.5));
Console.WriteLine(Math.Pow(2, -1));
```

<details class="dl-answer"><summary>answer</summary>

They print 1024, 100, 1.4142135623730951 and 0.5. A power of 0.5 is a
square root: `Math.Pow(2, 0.5)` is the square root of 2. A power below
zero is one divided by the number: `Math.Pow(2, -1)` is 1 divided by 2.
Only a `double` can hold answers like these, so `Math.Pow` always gives
one.

</details>

The two surprises on this page end in different ways. `2 ^ 3` compiled and
ran, and it gave a number that is not a power. `int area = Math.Pow(5, 2);`
did not compile, and the message said where the problem was. The compiler
checks that the types fit. It cannot check that a calculation is the one
you meant. To check that, run the program and read what it prints.

Everything on this page runs here, in the browser, and nothing needs
Visual Studio.

## Where to read more

Microsoft. *C# operators and expressions*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/>.
The official list of C#'s operators, and the order C# uses them in. `^`
is on the list. `Math.Pow` is not, because it is a method, not an
operator.
