---
title: "Exceptions: practice"
version: 2026.09.28.1
from: reading-an-error-message-practice
practice_for: reading-an-error-message
---

# Exceptions: practice

Here your guess is the exercise. Before you run a cell, can you say which
of the three things will happen when you press Run? Will it not compile,
stop with an exception, or run? If it runs, what will it print? Then run
it, and read the message from the top. Many cells on this page are meant to
fail, so a message is part of the problem, not a sign that you broke
anything. Most problems have an answer or a solution under them, for when
you have tried them.

Everything here uses only variables and their types, arithmetic, text,
`Console.WriteLine` and `Console.ReadLine`, `int.Parse` and `double.Parse`,
and `if`. There are no new tools, only new messages to read.

## 1. Which kind

For each of these, what happens when you press Run? Does it not compile,
does it stop with an exception, or does it run? If it runs, is its answer
one that anybody meant?

- (a) `if total > 10 { Console.WriteLine(total); }`
- (b) `Console.WriteLine(10 + "5");`
- (c) `int age = int.Parse("thirty");`
- (d) `int average = total / count;`, where `total` and `count` are `int`
  variables, and `count` is 0
- (e) `double average = total / count;`, where `total` and `count` are
  `double` variables, `total` is 12, and `count` is 0

<details class="dl-answer"><summary>answer</summary>

(a) It does not compile, so nothing runs. An `if` needs brackets round
its condition: `if (total > 10)`.

(b) It runs, and prints the 10 and the 5 side by side, as one piece of
text. `+` with a string on one side joins the two. If somebody meant 15, it
is a logical error.

(c) It stops with a `FormatException`. `int.Parse` wants a string and got
one, but `"thirty"` is not written in digits.

(d) It stops with a `DivideByZeroException`. In real programs, this
exception usually comes from a count that is 0 when the code expected it
not to be.

(e) It runs, and `average` is ∞. 12 divided by zero, as a `double`, is
infinity, and there is no exception. An average of ∞ is an answer nobody
meant: a logical error.

</details>

## 2. Five plus two

Somebody wanted the answer 7. Run the cell, and type `5` when it asks.

```csharp exec
id: five-times-two-1
stdin: "5\n"
Console.Write("Type a number: ");
string typed = Console.ReadLine();
Console.WriteLine(typed + 2);
```

```predict
type: choice

If you type 5, what will it print?

- 7
  - 5 plus 2 is 7.
- 52
  - `+` with a string on one side joins the two.
- Nothing: it does not compile
  - Can `+` join text and a number?
```

<details class="dl-answer"><summary>why</summary>

It prints `52`, with no message. This is a logical error. `+` with a
string on one side joins the two, and `Console.ReadLine()` always gives a
string, even when somebody types digits. The line looks as if it should
add, because 5 plus 2 is 7, until you see that `typed` is a string.

</details>

Can you change the last line so that it prints 7?

```solution
Console.Write("Type a number: ");
string typed = Console.ReadLine();
Console.WriteLine(int.Parse(typed) + 2);
---
`int.Parse` converts the text to a number first, so `+` adds, and the
program prints 7.
```

## 3. A number from text

```csharp exec
id: a-number-from-text-1
int price = int.Parse("12");
Console.WriteLine(price * 2);
```

```predict
type: number

What will it print?
```

## 4. Name what happens

Before you run each cell, can you write in its comment what you think will
happen? All five are meant to fail, each in its own way. If one will stop
with an exception, which exception?

```csharp exec
id: naming-the-error-early-1
expect: CS0019
string value = "12";
Console.WriteLine(value * 3);
// I think:
```

```csharp exec
id: naming-the-error-early-2
expect: exception
int count = int.Parse("twelve");
Console.WriteLine(count);
// I think:
```

```csharp exec
id: naming-the-error-early-3
expect: CS0103
string message = "OTTER";
Console.WriteLine(mesage);
// I think:
```

```csharp exec
id: naming-the-error-early-5
expect: CS0020
Console.WriteLine(17 % 0);
// I think:
```

```csharp exec
id: naming-the-error-early-6
expect: exception
int population = int.Parse("8000000000");
Console.WriteLine(population);
// I think:
```

<details class="dl-answer"><summary>answer</summary>

The first does not compile: `error CS0019: Operator '*' cannot be applied
to operands of type 'string' and 'int'`. C# will not multiply a string by
a number, but it will join the two: `value + 3` compiles.

The second stops with a `FormatException`. The type fits, because
`int.Parse` wants a string, but the content is not a number.

The third does not compile: `error CS0103: The name 'mesage' does not
exist in the current context`. Python would suggest `message` here, and the
C# compiler does not. But its message names `mesage`, and its line and
column show where it is, so the message has already found the mistake for
you. The warning under it, CS0219, says that `message` is never used: the
same clue as on the lesson page.

The fourth does not compile either: `error CS0020: Division by constant
zero`. A remainder is a kind of division. Both numbers are constants,
written in the code, so the compiler calculates `17 % 0` itself, and finds
the zero. With a variable that holds 0, the program compiles, and then
stops with a `DivideByZeroException`.

The fifth stops with an `OverflowException`, and the message *Value was
either too large or too small for an Int32.* `Int32` is .NET's own name for
`int`. 8000000000 is written in digits, but it is too big for an `int`.
A `long` holds bigger whole numbers, and `long.Parse("8000000000")` reads
it.

</details>

## 5. A decimal comma

In many countries, people write a decimal comma: 12,50, not 12.50. What do
you think will happen if you type `12,50`, with a comma? You can write your
guess in the comment, and then run the cell and try it.

```csharp exec
id: naming-the-error-early-4
stdin: "12,50\n"
Console.Write("Price: ");
string typed = Console.ReadLine();
double price = double.Parse(typed);
Console.WriteLine($"The price is {price}");
// I think:
```

<details class="dl-answer"><summary>answer</summary>

It runs, and prints 1250. There is no exception. On this page, C# reads
numbers the way they are written in Ireland, where a comma separates the
thousands, as in 1,250. So `double.Parse` read `12,50` as 1250, a price
far too big. That is a logical error, and a hard one to find.

On a computer with German settings, where a comma separates the whole part
from the decimal part, the same program reads `12,50` as twelve and a half.
The person typing made no mistake. They wrote a price the way it is
written where they live. The program needs to say what to type, or check
what it got.

</details>

## 6. Where to look first

In an exception report, where do you find the exception that stopped the
program? And when the compiler gives several messages, which one do you
read first?

<details class="dl-answer"><summary>answer</summary>

At the top. The first line names the exception and gives its message. The
line under it says where: the file and the line number.

For the compiler, read the first message first. One mistake can cause
several messages, and fixing the first one often makes the others
disappear. [Compiler errors](lesson:compiler-errors) has an example.

</details>

## 7. The line that failed, and the line responsible

A code-breaker counts the letters of a message. There are 47 letters, and
12 of them are E. This cell is meant to stop with an exception. Which line
failed, and which line is *responsible*?

```csharp exec
id: reading-a-short-traceback-1
expect: exception
int letters = 47;
int eCount = 12;
int ePercent = eCount / letters * 100;
Console.WriteLine($"{ePercent}% of the letters are E.");
Console.WriteLine($"One letter in {100 / ePercent} is E.");
```

<details class="dl-hint"><summary>stuck? here are some steps</summary>

1. Read the report from the top. What exception is it?
2. Which line does the report name? That is the line that failed.
3. What value did `ePercent` have? The output above the report shows it.
   Which line gave it that value?

</details>

<details class="dl-answer"><summary>answer</summary>

Line 5 failed, with a `DivideByZeroException`. Line 3 is responsible.
`eCount / letters` is 12 divided by 47, and when both numbers are `int`,
`/` keeps only the whole part, which is 0
([Dividing in C#](lesson:dividing-in-csharp) has more on this). 0 times
100 is still 0, and line 4 printed it: `0% of the letters are E.` Line 5
is written the way it should be. It was given a 0.

</details>

Once you know which line is responsible, can you change it so that the
program runs to the end?

```solution
int letters = 47;
int eCount = 12;
int ePercent = eCount * 100 / letters;
Console.WriteLine($"{ePercent}% of the letters are E.");
Console.WriteLine($"One letter in {100 / ePercent} is E.");
---
Multiplying first means that the division starts from `eCount * 100`,
not from 12, so the whole part is 25, not 0. Then the program prints
`One letter in 4 is E.`
```

## 8. Some output, then an exception

Some of your output appeared above an exception report. What does that
tell you?

<details class="dl-answer"><summary>answer</summary>

It tells you that the program compiled, started, and ran until it reached
a line it could not complete. A compiler error prints nothing of yours at
all, because nothing runs. The output is useful too: it shows values the
program had before it stopped, as `0%` did in problem 7.

</details>

## 9. Up by how much

A price goes from 50 to 60. It goes up by 10, which is 20% of the old
price. A percentage change is measured against the old value. This program
runs. Does it agree?

```csharp exec
id: when-nothing-looks-wrong-practice-1
double oldPrice = 50;
double newPrice = 60;
double change = (newPrice - oldPrice) / newPrice * 100;
Console.WriteLine($"Change: {change}%");
```

```inputs
change
```

```hint
after: 1 runs
Which number does the code divide by? Which one should it divide by?
```

```solution
double oldPrice = 50;
double newPrice = 60;
double change = (newPrice - oldPrice) / oldPrice * 100;
Console.WriteLine($"Change: {change}%");
---
It divided by the new price, and gave 16.666666666666664%, not 20%. That
is close enough to believe, which is why nobody notices it.
```

## 10. Exactly on the line

A pixel is drawn as `#` when its brightness is 128 or more. Can you run the
cell with `brightness` set to 127, then 128, then 129?

```csharp exec
id: when-nothing-looks-wrong-practice-2
int brightness = 128;
string pixel;
if (brightness > 128)
{
    pixel = "#";
}
else
{
    pixel = ".";
}
Console.WriteLine(pixel);
```

```inputs
pixel
```

```solution
int brightness = 128;
string pixel;
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
With `>`, a brightness of exactly 128 was drawn as `.`. Logical errors are
often at a boundary, so try the boundary itself, one below it and one above
it.
```

## 11. The habit that catches them

What is the one habit that catches logical errors?

<details class="dl-answer"><summary>answer</summary>

Try the program on answers you already know. Before you trust a program on
numbers you cannot check, give it numbers you can: halfway between 100 and
300 is 200, and a rise from 50 to 60 is 20%. If the program says something
else, you have found something. A later page,
[Reusable methods](lesson:building-reusable-tools), writes those checks as
tests that you can run again.

</details>

## 12. Two at once

This program has two mistakes, and it is meant to fail. Can you fix them?
Run it after each fix.

```csharp exec
id: fixing-early-1
expect: CS1002
string typed = "12O";
int brightness = int.Parse(typed);
if (brightness >= 128)
{
    Console.WriteLine("#");
}
else
{
    Console.WriteLine(".")
}
```

```hint
What happens if you fix only the line that the message names, and run it
again? Is there a new message? Which line does it name now?
```

```solution
string typed = "120";
int brightness = int.Parse(typed);
if (brightness >= 128)
{
    Console.WriteLine("#");
}
else
{
    Console.WriteLine(".");
}
---
The compiler told you about the missing `;` only. The other mistake is in
a value: `"12O"` has the letter O where the digit 0 should be. The compiler
cannot see that, so it appeared only when the program ran, as a
`FormatException`. So a new message after a fix does not mean the fix
failed. It can mean that the program went further: it compiled, and then
it ran.
```

## 13. Next year

Run the cell, and type an age, such as `30`. What does it print? Can you
fix the last line?

```csharp exec
id: fixing-early-2
stdin: "30\n"
Console.Write("How old are you? ");
string age = Console.ReadLine();
Console.WriteLine("Next year you will be " + age + 1);
```

```solution
Console.Write("How old are you? ");
string age = Console.ReadLine();
int years = int.Parse(age);
Console.WriteLine($"Next year you will be {years + 1}");
---
`age` is a string, so `"Next year you will be " + age` joins, and `+ 1`
joins a 1 to the end: 30 becomes 301. C# does the `+` signs from left to
right. Converting is not enough on its own:
`"Next year you will be " + int.Parse(age) + 1` still joins the 1 to the
end, because the first `+` has already made a string. Inside `$"..."`,
`{years + 1}` adds first, and then puts the answer into the text.
```

## 14. Better news

Why is a message better news than no message?

<details class="dl-answer"><summary>one answer</summary>

A message says where and what. A compiler error stops you before anything
happens, and an exception names the line and the reason. A logical error
says nothing at all. It may not be found for weeks, and by then the program
has printed a great deal of confident output that nobody meant.

</details>
