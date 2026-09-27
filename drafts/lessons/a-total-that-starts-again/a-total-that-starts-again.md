---
title: "Starting a total: a closer look at where a variable lives"
version: 2026.09.27.1
from: a-total-that-starts-again
covers: [PDP-LO8, PDP-LO6]
---

# Starting a total: a closer look at where a variable lives

On [the page about loops](lesson:repeating-yourself), a total started at 0
above the loop, and the loop added to it each time it repeated. The line
`int total = 0;` sat above every loop that made a total. What happens when
that line moves inside the loop? Here are two ideas. Both are reasonable,
and they cannot both be true.

**Idea A.** `int total = 0;` makes the variable `total`. That happens once,
however many times the program reaches the line.

**Idea B.** C# runs a line each time it reaches it. A line inside a loop is
reached each time the loop repeats.

## An experiment

The two ideas predict different things for this loop. Idea A says the total
keeps growing: day 1 starts at 0, day 2 at 10 and day 3 at 20. Idea B says
every day starts again at 0.

```csharp exec
id: an-experiment-1
for (int day = 1; day <= 3; day++)
{
    int total = 0;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
```

```predict
type: choice

Which will you see?

- 0, 10 and 20
  - This is what idea A predicts.
- 0, 0 and 0
  - This is what idea B predicts.
- Something else
```

Run it. Every day starts at 0, as idea B predicts. The body of the loop
runs three times, and each time, `int total = 0;` runs first. So the 10
added on the day before is lost.

## Where a variable lives

The page about loops printed the total after the loop, when the adding was
finished. This cell adds that line at the end. It is meant to fail: it
does not compile, so nothing runs. Before you run it, which line do you
think the compiler will name?

```csharp exec
id: where-a-variable-lives-1
expect: CS0103
for (int day = 1; day <= 3; day++)
{
    int total = 0;
    Console.WriteLine($"Day {day} starts at {total}");
    total = total + 10;
}
Console.WriteLine($"At the end: {total}");
```

```hint
after: 2 errors
Which lines of this program run only once, and which run once for each
day?
```

```hint
after: 3 errors
Does the message say CS0136? Then the program makes `total` twice: once
above the loop, and once inside it. C# does not let a program make a
second `total` inside the curly brackets where the first one can still be
used. Which of the two lines should stay?
```

The message is:

```console
Program.cs(7,34): error CS0103: The name 'total' does not exist in the current context
```

Line 7, column 34 is where `total` starts, in the last line. On [the page
about compiler errors](lesson:compiler-errors), CS0103 came from a name
that the compiler did not know. Here the name is spelt the same way on
every line, and lines 4 and 5 use it with no problem. So `total` exists,
but not on line 7. The *current context* is the part of the program that
line 7 is in. Nothing ran, not even the loop, because C# checks the whole
program before it runs any of it.

`int total = 0;` is between the loop's curly brackets. A variable made
inside curly brackets exists only inside them. After the closing curly
bracket on line 6, there is no `total`. The part of a program where a
variable's name can be used is called the variable's *scope*. `total` can
be used from line 3, where it is made, to the closing curly bracket on
line 6. Microsoft's documentation calls the lines between a pair of curly
brackets a *code block*. A variable made inside a code block has that code
block as its scope.

The `for` line makes a variable too: `day`. Its scope is the whole loop:
the `for` line and the body. So the last line cannot print `day`
either. Can you check it? Change `total` to `day` in the last line, run
it, and see which name the message gives.

Can you find a change that makes the program print what idea A predicts,
and lets the last line compile? There is one, and it moves one line.

<details class="dl-answer"><summary>one change that does it</summary>

Here is one answer. Yours may be different and work too.

Move `int total = 0;` above the `for` line. Then it runs once, before the
loop, and the total grows: day 1 starts at 0, day 2 at 10 and day 3 at 20.
`total` is now made outside the loop's curly brackets, so its scope reaches
the last line, and the program prints `At the end: 30`.

</details>

## Why idea A is easy to believe

Idea A is how mathematics works. When a proof says "let $t = 0$", $t$ is
0 from that line to the end of the argument. It is not said again at
every step. Once something is written down, it stays true. That is what
"let" means.

A recipe works in the same way. "Start with an empty bowl" is said once,
and nobody empties the bowl again at every step. So a line that looks like
preparation feels like something that happens once, before the real work.

Part of idea A is true in C#. C# reads the whole program once, before it
runs any of it: that is compiling. When the compiler reads
`int total = 0;`, it learns that `total` is the name of an `int`, and it
finds the name's scope. That is decided once, before anything runs.

The rest happens when the program runs. Then the line is an instruction:
make `total` and store 0 in it, now. The program runs the line each time
it reaches it, and inside the loop it reaches the line once for each day.
So `int total = 0;` is not a fact about `total`, as "let" is in a proof.
It is an action.

## Where else it happens

The same thing happens with anything a loop is meant to collect. Here
`letters` is made above the loop, so the last line can use it. The line
inside the loop has no type in front of it. It does not make a new
variable: it gives `letters` a new value. What do you think this prints?

```csharp exec
id: where-else-it-happens-1
string letters = "";
foreach (char letter in "SEA")
{
    letters = "";
    letters = letters + letter;
}
Console.WriteLine(letters);
```

```predict
type: text

What will `letters` hold at the end?
```

It prints `A`. The program compiles, because the scope of `letters`
reaches the last line. But each time the loop repeats, `letters = "";`
empties it, and only the last letter is left. A line inside a loop runs
each time the loop repeats, whether it makes a variable or gives one a new
value.

Which line would you remove, so that `letters` holds all three letters?

<details class="dl-answer"><summary>the line to remove</summary>

Here is one answer. Yours may be different and work too.

Remove `letters = "";` from inside the loop. The line above the loop gives
`letters` its first value, once, and the cell prints `SEA`.

</details>

## Where to read more

Microsoft Learn has a short module for beginners,
[Control variable scope and logic using code blocks in C#](https://learn.microsoft.com/training/modules/csharp-code-blocks/).
Its first exercise makes a variable inside the curly brackets of an `if`,
meets the same CS0103 message, and then moves the line above the `if`. The
module uses Visual Studio Code, another editor from Microsoft. You can
also try each of its examples in a cell on this page.
