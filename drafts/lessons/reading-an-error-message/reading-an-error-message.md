---
title: "Exceptions: when a program stops, and when it runs but is wrong"
version: 2026.09.27.1
from: reading-an-error-message
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO9, PDP-LO10]
---

# Exceptions: when a program stops, and when it runs but is wrong

This program asks how many places to move each letter of a secret message.
Run it, and type `3` when it asks. Then run it again, and type the word
`three`. The word is a mistake on purpose, so nothing is broken. What does
the page show the second time?

```csharp exec
id: a-first-error-1
stdin: "three\n"
expect: exception
Console.Write("How many places should each letter move? ");
string typed = Console.ReadLine();
Console.WriteLine($"You typed {typed}.");
int shift = int.Parse(typed);
char moved = (char)('A' + shift);
Console.WriteLine($"A moves to {moved}.");
```

With `3`, the program runs to the end: `A moves to D.` With `three`, it
prints `You typed three.`, and then it stops. The page names the problem,
`System.FormatException: The input string 'three' was not in a correct
format.`, and the line where the program stopped: line 4.

This is new. On [the page about compiler errors](lesson:compiler-errors), a
mistake in one line meant that nothing ran at all. C# checks the whole
program before it runs any of it. That is compiling. Here, the compiler
found no problem: `int.Parse` takes a string, and `typed` is a string. The
problem is not in the types. It is in the value, in what somebody typed, and
nobody knows that until the program runs.

The program stopped with an *exception*. An exception is how a running
program reports a line that it cannot complete. The program stops at that
line, and the exception names the problem. This one is a `FormatException`:
`int.Parse` can read a whole number written in digits, and `three` is not
written in digits.

By now you have written code that did not do what you meant. Everybody
does, all the time, and it never stops happening. With experience, you find
the cause more quickly, mostly because you learn to read the message. An
exception's report puts its most useful line at the top, and it writes in a
style you have not met yet. It sometimes names a line that is not the line
with the mistake. And some mistakes give no message at all. This page is
about all four.

So here we break things on purpose. Many cells below are meant to fail, and
the page says so. Every cell uses only what we have met so far:
variables and their types, arithmetic, text, `Console.WriteLine`,
`Console.ReadLine`, `int.Parse` and `double.Parse`, and `if`, `else if` and
`else`.

A message here is a fact about one line, on one run. It is not a fact about
whether you can learn to program.

## Three things can happen when you press Run

When you press Run, one of three things happens. Each one comes from a
different kind of mistake, so if you know which one you have, you know
where to look.

**It does not compile.** C# found a problem before the program started, so
nothing runs. The compiler's message gives the file, the line, the column,
the error's code, and what the compiler found.
[Compiler errors](lesson:compiler-errors) is the page about these.

**It stops with an exception.** The program compiled, and it started. It
ran until it reached a line that it could not complete, and it stopped
there. Some books call this a *runtime error*: an error at *run time*,
which is the time while the program runs.

**It runs.** The program runs to the end, and nothing stops it. Whether the
answer is the one you wanted is for you to decide. When it is not, the
program has a *logical error*: a mistake in code that compiles and runs,
and gives a different answer from the one you meant. No message appears,
and nothing stops. This is the dangerous kind, and it has the last section
of the page to itself.

| When you press Run | What happens | What finds the mistake |
|---|---|---|
| it does not compile | nothing runs | the compiler, before the program starts |
| it stops with an exception | the program stops partway | C#, while the program runs |
| it runs, with an answer you did not mean | the program finishes | only you |

## Exceptions: errors that happen while a program runs

An exception is different from a compiler error in one important way. The
compiler checked every line, and it found no problem. The program starts,
does some work, and stops when it reaches a line that it cannot complete.

This cell is meant to stop with an exception. Will anything print before
it stops?

```csharp exec
id: runtime-errors-1
expect: exception
int price = 12;
Console.WriteLine($"The price is €{price}.");
string delivery = "free";
Console.WriteLine($"With delivery: €{price + int.Parse(delivery)}");
```

The first `Console.WriteLine` printed `The price is €12.` The second did
not, because `int.Parse` cannot read `free` as a number. An exception can
happen only after the program has started, so the lines before it have run,
and what they printed is there to read.

Here are the exceptions you can meet with what we know so far, and what
each one is telling you.

| Exception | What it means |
|---|---|
| `FormatException` | A method that reads text, such as `int.Parse`, was given text that is not written the way it needs. `int.Parse("free")` gives it a string, which is what it wants, but not a string of digits. |
| `OverflowException` | The text is a number, but it is too big or too small for the type. `int.Parse("3000000000")` stops with one, because an `int` holds numbers up to 2147483647. |
| `DivideByZeroException` | A whole number was divided by zero, with `/` or `%`. This nearly always means that a value was zero when you expected it not to be. |

The table says *a whole number*. What happens when a `double` is divided by
zero?

```csharp exec
id: runtime-errors-2
double bill = 60.0;
double people = 0;
Console.WriteLine(bill / people);
```

```predict
type: choice

What will it print?

- Nothing: it stops with a DivideByZeroException
  - This is what happens with `int` values. What type are `bill` and
    `people`?
- 0
  - Sharing 60 among nobody gives nobody anything. Is that what dividing
    does?
- ∞, the sign for infinity
  - The closer the number you divide by is to 0, the bigger the answer.
```

It prints ∞, the sign for *infinity*, a value larger than any number. A
`double` has a value for infinity, and 60.0 divided by zero is infinity.
So the program runs to the end, with an answer nobody meant. For a bill,
that is a logical error, and a harder one to find than an exception.

So dividing by zero can end in each of the three ways. With the zero
written in the line, as `60 / 0`, the program does not compile. The
compiler can see the 0, and it says `error CS0020: Division by constant
zero`. With an `int` variable that holds 0, the program compiles, and stops
with a `DivideByZeroException`. And with a `double`, it runs, and prints ∞.

### Your turn

Before you run each cell below, can you write in the comment at its end
which of the three things you think will happen? If you think it will stop
with an exception, which one? If you think it will run, what will it print?
Three of the four are meant to fail, so a message is not a sign that you
broke anything. Then run each one. Where it did something different, what
did you expect the values to be?

```csharp exec
id: runtime-your-turn-1
string number = "10";
Console.WriteLine(number + 2);
// I think:
```

```csharp exec
id: runtime-your-turn-2
expect: exception
int count = int.Parse("not a number");
Console.WriteLine(count);
// I think:
```

```csharp exec
id: runtime-your-turn-3
expect: CS0103
string secret = "OTTER";
Console.WriteLine(secert);
// I think:
```

```csharp exec
id: runtime-your-turn-4
expect: exception
int pixels = 640 * 480;
int columns = 0;
Console.WriteLine($"Rows: {pixels / columns}");
// I think:
```

Compare the first two. In both, a string is used where a number was meant.
In the first, `+` has a string on one side, so it joins the two, and prints
102. There is no message, and nothing stops. If you meant 12, that is a
logical error. In the second, the type is fine: `int.Parse` wants a string,
and it got one. But the content is not a number, and that is a
`FormatException`.

The third did not compile, so nothing ran. Its message is `error CS0103:
The name 'secert' does not exist in the current context`. A name that the
compiler does not know is a compiler error in C#, found before the program
starts. Under it, a warning says that `secret` is assigned but its value is
never used. That is a clue: the program never used `secret`, because the
second line asked for `secert`. The fourth stopped with a
`DivideByZeroException`, because `columns` is 0.

`int.Parse("not a number")` stopped, and `int.Parse("10")` works, but both
are strings. What does this one print?

```csharp exec
id: runtime-the-fix-1
string number = "10";
Console.WriteLine(int.Parse(number) + 2);
```

```predict
type: number

What will it print?
```

It prints 12. `int.Parse` converts the text to a number first, and then `+`
adds.

Here is the difference between the first two cells. The compiler checks
types. In `number + 2`, it sees a string and an `int`, and C# knows what
`+` does with those: it joins them. In `int.Parse("not a number")`, it sees
a string, the type that `int.Parse` wants. The compiler never reads what a
string holds. So a problem with a type is found before the program runs. A
problem with a value is found while it runs, or not at all.

Where does a `FormatException` like this come from in a real program? Most
often from `Console.ReadLine()`. It always gives a string, and the person
typing can type anything at all. `int.Parse(Console.ReadLine())` works well
until somebody types `thirty`.

## Reading an exception report

When an exception stops a program, C# writes a report. The report says
which exception it was, what happened, and where. For the short programs we
write now, it has only two lines.

This cell is meant to stop with an exception. Run it. Which line number
does the report name?

```csharp exec
id: a-short-traceback-1
expect: exception
int bill = 60;
int people = 3;
Console.WriteLine($"Each person pays €{bill / people}");
people = people - 3;
Console.WriteLine($"Each person pays €{bill / people}");
```

Here is the same report, as .NET writes it in a console window, such as the
one Visual Studio opens. (.NET is the system that runs C# programs. The
folder names before `Program.cs` are not shown here.) On this page, the
report names the same parts.

```console
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
   at Program.<Main>$(String[] args) in Program.cs:line 5
```

**Read it from the top.**

- `Unhandled exception.` says that a report is starting. *Unhandled* means
  that no code in the program was ready for the exception, so the program
  stopped.
- `System.DivideByZeroException` is the exception's name. It says what kind
  of problem stopped the program. The `System.` at its start says that the
  name comes from .NET itself.
- `Attempted to divide by zero.` is the exception's *message*: what
  happened, in one sentence.
- The line under it says where: `Program.cs:line 5`, the file and the line.
  `Program.<Main>$` is the name .NET gives to the statements in
  `Program.cs`, the main part of the program. Once our programs have
  methods of their own, a report can name them too, one line for each.

If you know Python, this is the other way up from a Python traceback, which
names the error on its last line. .NET names the exception on its first
line.

Now look more closely. The line that failed is line 5. But is line 5 the
mistake? It is the same as line 3, and line 3 worked. The problem is in the
value that line 5 was given: `people` is 0. Which line made it 0?

The answer is line 4. So the line that *failed* is not always the line that
is *responsible*. The report tells you where the program stopped. Then you
read the lines above it, to find where the value came from.

### Your turn

This program asks how many hours you worked, and calculates your pay. Run
it, and type the word `seven`, as somebody might. The word is a mistake on
purpose.

1. Read the report from the top.
2. What is the exception's name? What does its message say?
3. Which line failed?
4. Which line is *responsible*? Is it the same line?
5. You can write your answers in the comments at the end of the cell.

```csharp exec
id: a-short-traceback-2
stdin: "seven\n"
expect: exception
Console.Write("How many hours did you work? ");
string typed = Console.ReadLine();
double hours = double.Parse(typed);
double pay = hours * 14;
Console.WriteLine($"You earned €{pay}.");

// The exception's name:
// The line that failed:
// The line that is responsible:
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

It is a `FormatException`, and its message is *The input string 'seven'
was not in a correct format.* Line 3 failed: `double.Parse` can read `7`
or `7.5`, and it cannot read `seven`.

The value arrived on line 2, from the keyboard. So no line of the code is
responsible in the way that line 4 of the bill was. The person typed a word
where the program needed digits, and nothing told them what to type. The
fix belongs in the program. It can say what to type, and it can check what
it was given before it converts it. A later page, on reading input, shows
how.

</details>

## When there is no message

Most of the mistakes so far have shown a message. What about this one? It finds the
middle of a line of pixels on a screen, between the pixel at 100 and the
pixel at 300.

```csharp exec
id: when-nothing-looks-wrong-1
int left = 100;
int right = 300;
int middle = left + right / 2;
Console.WriteLine($"The middle is at {middle}");
```

```predict
type: number

What will it print?
```

There is no message, and no report. The program printed a number. Is it
the middle?
Halfway between 100 and 300 is 200, and the program says 250.

C# did exactly what the line says. Division happens before addition, so
only `right` was divided by 2. The line needs brackets:
`(left + right) / 2`. Nothing will tell you this. You have to know what the
answer should be.

Here is a logical error that C# allows and Python stops. In the cells above,
`number + 2` printed 102. Python stops at that line, because it will not
join text and a number. C# joins them, and says nothing. When a program
prints two numbers side by side where you expected one, it is worth looking
for a string on one side of a `+`.

**So we try answers we already know.** Before you trust a program on
numbers you cannot check, give it numbers you can check. If it says 250
where you know the answer is 200, you have found something. This habit is
often worth more than any tool for finding mistakes.

### Your turn

This program runs, and gives a different answer from the one it was meant
to give. Can you find where, with an answer you already know?

<div class="dl-world" data-world="secret-messages">

It is meant to move the letter X three places along, which should give A:
X, Y, Z, and then A again. What does it give?

```csharp exec
id: when-nothing-looks-wrong-2--secret-messages
char letter = 'X';
int shift = 3;
int position = letter - 'A';
int moved = position + shift % 26;
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
```

```inputs
newLetter
```

```hint
after: 1 runs
Which happens first, `+` or `%`? What is `3 % 26`?
```

```solution
char letter = 'X';
int shift = 3;
int position = letter - 'A';
int moved = (position + shift) % 26;
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
---
`%` happens before `+`, as `*` and `/` do. So the line calculated
`3 % 26`, which is 3, and added it to 23, X's position. That makes 26, one
place past Z, and `(char)` shows it as `[`. The brackets make the remainder
apply to the whole sum, so 26 starts again at 0, which is A.
```

</div>

<div class="dl-world" data-world="pixel-art">

It is meant to find a pixel's brightness, the average of its red, green
and blue. For red 90, green 120 and blue 210, the average is 140. What does
it give?

```csharp exec
id: when-nothing-looks-wrong-2--pixel-art
int red = 90;
int green = 120;
int blue = 210;
int brightness = red + green + blue / 3;
Console.WriteLine(brightness);
```

```inputs
brightness
```

```hint
after: 1 runs
Try the numbers yourself: 90 + 120 + 210 is 420, and 420 divided by 3 is
140. Which part of the line did C# divide?
```

```solution
int red = 90;
int green = 120;
int blue = 210;
int brightness = (red + green + blue) / 3;
Console.WriteLine(brightness);
---
Only `blue` was divided, so the program said 280. That is more than 255,
the largest value a colour can have, so it cannot be a brightness at all.
The brackets make C# add first.
```

</div>

## Looking back

Which of the three things that can happen when you press Run do you expect
to give you the most trouble? What could you do while you write code,
rather than after, to find it sooner?

A challenge: this program has one mistake of each kind in it. Can you find
all three? One stops it before it starts, one stops it partway, and one
lets it finish with an answer nobody meant.

```csharp challenge
// One compiler error, one exception and one logical error.
int width = 64;
int height = 48;
int pixels = width * height;
Console.WriteLine($"Pixels: {pixels}")
int bytesNeeded = pixels * 3;
Console.WriteLine($"Kilobytes: {bytesNeeded / 1024}");
int averageSide = width + height / 2;
Console.WriteLine($"Average side: {averageSide}");
string colourText = "16 million";
int colours = int.Parse(colourText);
Console.WriteLine($"Colours: {colours}");
```

A compiler message or an exception report is the most exact and most
patient help you will get all day. It names a place and a kind of problem,
every time. You can practise reading one calmly, as this page did: break
things on purpose, when nothing depends on them. Soon our programs will
repeat steps, keep lists and divide their work into methods. A later page,
on debugging bigger programs, returns to the three kinds there.

The [practice page](lesson:reading-an-error-message-practice) has more
messages to read, and more logical errors to find.

## Where to read more

Microsoft. *Exceptions and Exception Handling.*
<https://learn.microsoft.com/dotnet/csharp/fundamentals/exceptions/>. This
page shows how a program can handle the exceptions from this page on
purpose, with `try` and `catch`, rather than stop at the line that caused
them.
