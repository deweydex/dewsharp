---
title: "The equals sign: a closer look at =, == and maths"
version: 2026.09.27.1
from: equals-three-ways
covers: [PDP-LO4, PDP-LO9]
---

# The equals sign: a closer look at =, == and maths

On [the page about decisions](lesson:making-decisions), one equals sign
stored a value in a variable, and two equals signs asked a question. In
maths, one equals sign says that two things are the same. That is three
jobs for the equals sign. Here are two ideas about what `=` does in C#.
Both are reasonable, and they cannot both be true.

**Idea A.** `=` means what it means in maths. `score = score + 5;` says
that `score` and `score + 5` are the same, so it can never be true.

**Idea B.** `=` is an instruction. C# calculates the part after the `=`,
and then stores the answer in the variable before it.

## An experiment

The two ideas predict different things for this cell. Idea A says the
second line can never be true, so C# does not accept it: the program does
not compile, and nothing runs. Idea B says C# adds 5 to 10, and stores the
new value, 15, in `score`.

```csharp exec
id: an-experiment-1
int score = 10;
score = score + 5;
Console.WriteLine(score);
```

```predict
type: choice

Which will you see?

- Nothing: the program does not compile
  - This is what idea A predicts.
- 15
  - This is what idea B predicts.
- 10
```

Run it. It prints 15, as idea B predicts. The second line did not state a
fact about `score`. It was an instruction, and C# ran it once. An
instruction that stores a value in a variable is called an *assignment*.

Now let's ask C# the question from idea A: is `score` the same as
`score + 5`? `==` asks whether two values are equal. It gives a `bool`:
`true` or `false`. What will this print?

```csharp exec
id: an-experiment-2
int score = 15;
Console.WriteLine(score == score + 5);
```

```predict
type: choice

What will it print?

- True
- False
```

It prints `False`. (C# prints a `bool` with a capital letter.) 15 is not
the same as 20. In maths, "score equals score plus 5" is false, and `==` says
so. `=` never asks this question.

## Why idea A is easy to believe

In maths, $x = 5$ and $5 = x$ say the same thing. The sign works both
ways, and it states a fact. Most of us used `=` in maths for years before
we met it in a program, so the maths meaning comes first.

Here is a way to see that `=` in C# does not work both ways. This cell is
meant to fail.

```csharp exec
id: why-idea-a-feels-right-1
expect: CS0131
int score = 15;
15 = score;
```

It does not compile, so nothing runs. The compiler's message is:

```console
Program.cs(2,1): error CS0131: The left-hand side of an assignment must be a variable, property or indexer
```

Line 2, column 1 is where `15` starts. The *left-hand side* of an
assignment is the part before the `=`. C# can store a value in a variable.
It cannot store a value in the number 15. (The message also names a
property and an indexer. They are other places that can hold a value, and
this page does not need them.)

Fortran used `=` for this instruction in 1957, and most languages since
have done the same. C uses `=` to store a value and `==` to ask whether two
values are equal, and C# writes them in the same way. Some languages, such
as Pascal, write `:=` to store a value, so that `=` can keep its maths
meaning.

## Where else it happens

An `if` needs a question. To ask whether `score` is 15, it needs `==`.
This cell has one equals sign in its `if`, and it is meant to fail. What do
you think the compiler will say about it?

```csharp exec
id: where-else-it-happens-1
expect: CS0029
int score = 15;
Console.WriteLine($"The score is {score}.");
if (score = 15)
{
    Console.WriteLine("Fifteen!");
}
```

It does not compile, so nothing runs, not even the first
`Console.WriteLine`. The message is:

```console
Program.cs(3,5): error CS0029: Cannot implicitly convert type 'int' to 'bool'
```

Line 3, column 5 is where `score = 15` starts, inside the brackets. The
condition of an `if` must be a `bool`. In C#, an assignment does two
things. It stores a value, and it also gives that value, as a calculation
does. So `score = 15` stores 15 in `score`, and it gives 15, an `int`. The
message says that C# cannot convert that `int` to a `bool` *implicitly*,
which means by itself, without being told to. C# does not treat a number
as a `bool`, so the program does not compile.

The message does not mention `==`. It names two types, because the problem
the compiler found is about types. In C, the language that C# takes these signs
from, `if (score = 15)` compiles, and its body runs every time. Because
C# asks for a `bool` in an `if`, this mistake does not compile.

Can you make the cell print `Fifteen!`?

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

Write `if (score == 15)`. One equals sign stores a value. Two ask a
question. The cell prints `The score is 15.`, and then `Fifteen!`.

</details>

The compiler found that mistake because an `int` is not a `bool`. So what
happens when the variable is a `bool` already? Here a pixel is not
see-through, and the program should skip the pixel only when it is.

```csharp exec
id: where-else-it-happens-2
bool seeThrough = false;
if (seeThrough = true)
{
    Console.WriteLine("Skip this pixel.");
}
Console.WriteLine($"seeThrough is now {seeThrough}");
```

```predict
type: choice

What will happen when you press Run?

- It does not compile, so nothing runs
  - In the cell above, `score = 15` gave the `if` an `int`. What does
    `seeThrough = true` give it?
- It runs, and prints `Skip this pixel.`
- It runs, and does not print `Skip this pixel.`
  - `seeThrough` is `false` on the first line. What does the last line of
    the output say it is now?
```

Run it. It compiles and runs, and it prints `Skip this pixel.` The last
line says `seeThrough is now True`. `seeThrough = true` stored `true` in
`seeThrough`, and the value of that assignment is `true`, a `bool`. So the
`if` has what it needs, and the program changed the value it meant to ask
about.

The compiler did say something. A *warning* is a message about code that
compiles, but may not do what you meant. It does not stop the program.
This one is:

```console
Program.cs(2,5): warning CS0665: Assignment in conditional expression is always constant; did you mean to use == instead of = ?
```

The *conditional expression* is the condition of the `if`. *Always
constant* means it has the same value every time: `seeThrough = true` is
always `true`. Then the compiler asks the question this page is about.

Can you add one character so that the cell prints only
`seeThrough is now False`?

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

Write `if (seeThrough == true)`. Now the `if` asks a question, and
`seeThrough` keeps its value. The cell prints only
`seeThrough is now False`, and the warning is gone.

A `bool` can also be the whole condition: `if (seeThrough)` asks the same
question, and it has no `=` in it at all.

</details>

So the compiler found two of the mistakes on this page, and nothing ran.
C# cannot store a value in the number 15, and an `if` cannot use an `int`.
The third mistake compiled, because its types fit: the `if` got a `bool`.
The program ran, and it changed the value it was meant to ask about. Only
the warning showed the problem, so a warning is worth reading as closely
as an error.

## Where to read more

Microsoft's C# documentation describes what `=` does, and what an
assignment gives as its value:
[Assignment operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/assignment-operator).
Its page on
[equality operators](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/equality-operators)
describes `==` and `!=` for every type.
