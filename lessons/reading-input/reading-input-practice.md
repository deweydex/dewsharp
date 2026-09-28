---
title: "Reading input: practice"
version: 2026.09.28.1
practice_for: reading-input
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Reading input: practice

These problems are on reading input: `Console.ReadLine()`, `TryParse`,
loops that ask again, and menus, with two from earlier pages. Many cells
wait for you to type, and each problem says what to try. When you test a
program that reads input, try an answer that makes sense, the answers at
its limits, a word, nothing at all, and **End input**. Some cells are meant
not to compile, or to stop with an exception, and the problem says so.
When that happens, nothing is broken: the message is part of the answer.
Each problem has an answer or a solution under it, for when you have
tried it.

## 1. Which texts are whole numbers

`int.TryParse` returns `true` when the text it is given is a whole number.
Which of these do you think it reads?

```csharp exec
id: which-texts-are-whole-numbers-1
string nothing = null;
Console.WriteLine($"-3: {int.TryParse("-3", out int number)}, {number}");
Console.WriteLine($"4.5: {int.TryParse("4.5", out number)}, {number}");
Console.WriteLine($"' 42 ': {int.TryParse(" 42 ", out number)}, {number}");
Console.WriteLine($"'4 2': {int.TryParse("4 2", out number)}, {number}");
Console.WriteLine($"'': {int.TryParse("", out number)}, {number}");
Console.WriteLine($"+7: {int.TryParse("+7", out number)}, {number}");
Console.WriteLine($"3000000000: {int.TryParse("3000000000", out number)}, {number}");
Console.WriteLine($"null: {int.TryParse(nothing, out number)}, {number}");
```

```predict
type: choice

What will the second line print?

- 4.5: False, 0
  - A whole number has no decimal point.
- 4.5: True, 4
  - A cast from `double` to `int` keeps the whole part. Does `TryParse`?
- 4.5: True, 5
  - 4.5 is nearer to 5 than 4 is. Does `TryParse` round?
```

What do you think the other lines print? Say what you think, then run it.

<details class="dl-answer"><summary>answer</summary>

`TryParse` reads `-3`, ` 42 ` and `+7`, and returns `false` for the rest.

- `4.5` has a decimal point, and a whole number has none. `TryParse` does
  not round the number or cut it. It returns `false`, and `number` is 0.
- Spaces at the start and at the end are allowed: ` 42 ` gives 42. A space
  in the middle is not: `4 2` gives `false`.
- The empty string, `""`, has no digits at all.
- `+7` gives 7. A plus sign is allowed, as a minus sign is.
- 3000000000 is written in digits, but it is too large for an `int`, as
  [Types and their sizes](lesson:types-and-their-sizes) showed. `TryParse`
  returns `false` for it too.
- `null`, which `Console.ReadLine()` returns when the input has ended,
  gives `false`.

After a `false`, `number` is always 0, whatever it held before.

</details>

## 2. Nothing at all

What does `int.Parse` do when there is nothing to read? Run this cell,
and press Enter without typing anything. It is meant to stop with an
exception.

```csharp exec
id: nothing-at-all-1
stdin: "\n"
expect: exception
Console.Write("How many letters? ");
string typed = Console.ReadLine();
int letters = int.Parse(typed);
Console.WriteLine($"{letters} letters.");
```

This cell is the same program. Run it, and press **End input** without
typing anything. It is meant to stop with an exception too. Is it the same
exception?

```csharp exec
id: nothing-at-all-2
expect: exception
Console.Write("How many letters? ");
string typed = Console.ReadLine();
int letters = int.Parse(typed);
Console.WriteLine($"{letters} letters.");
```

<details class="dl-answer"><summary>answer</summary>

The first stops with a `FormatException`: *The input string '' was not in
a correct format.* An empty line is still a string, `""`, and it has no
digits in it.

The second stops with an `ArgumentNullException`: *Value cannot be null.
(Parameter 's')*. After **End input**, `Console.ReadLine()` returns `null`,
so `int.Parse` has no string at all. An *argument* is a value passed to a
method, and this one was `null`. A *parameter* is the name that a method
uses, inside itself, for an argument. `(Parameter 's')` says which
argument it was: inside `int.Parse`, the string it is given is called `s`.

So the line with `int.Parse` can stop with three different exceptions: a
`FormatException` for a word or an empty line, an `ArgumentNullException`
for no input at all, and an `OverflowException` for a number too large
for an `int`, as the table on [Exceptions](lesson:reading-an-error-message)
said. `int.TryParse` returns `false` for all of them, as problem 1 showed.

</details>

## 3. A decimal comma

In many countries, people write a decimal comma: 12,50, not 12.50.
`double.TryParse` works as `int.TryParse` does, for a number with a
decimal point. Run this cell, and type `12,50`, with a comma.

```csharp exec
id: a-decimal-comma-1
stdin: "12,50\n"
Console.Write("Price in euro: ");
string typed = Console.ReadLine();
if (double.TryParse(typed, out double price))
{
    Console.WriteLine($"The price is {price}.");
}
else
{
    Console.WriteLine($"{typed} is not a number.");
}
```

```predict
type: choice

What will the last line print?

- The price is 12.5.
  - The comma is where the decimal point would be.
- The price is 1250.
  - In Ireland, a comma can separate the thousands, as in 1,250.
- 12,50 is not a number.
  - `TryParse` returns `false` for text it cannot read.
```

<details class="dl-answer"><summary>answer</summary>

It prints `The price is 1250.` This page reads numbers the way they are
written in Ireland, where a comma separates the thousands. So
`double.TryParse` read `12,50` as 1250, and returned `true`. `TryParse`
says whether the text is a number. It does not say whether it is the
number the person meant. On a computer with German settings, the same
program reads `12,50` as twelve and a half.

The person made no mistake: they wrote a price the way it is written
where they live. Problem 5 on
[the practice page for Exceptions](lesson:reading-an-error-message-practice)
read the same text with `double.Parse`, and the price was the same.

</details>

Can you make the program ask the person to write a point, when the text
has a comma in it? `typed.Contains(',')` is `true` when `typed` has a
comma in it.

```hint
after: 2 runs
Which check has to come first: the comma, or `TryParse`? And what does
`typed.Contains(',')` do if `typed` is `null`?
```

```solution
Console.Write("Price in euro, such as 12.50: ");
string typed = Console.ReadLine();
if (typed != null && typed.Contains(','))
{
    Console.WriteLine("Please write the price with a point, such as 12.50.");
}
else if (double.TryParse(typed, out double price))
{
    Console.WriteLine($"The price is {price}.");
}
else
{
    Console.WriteLine($"{typed} is not a number.");
}
---
With `12,50`, it prints `Please write the price with a point, such as
12.50.` The prompt says what to type too. `typed != null` comes first:
`&&` checks the question after it only when the question before it is
`true`, so the program never asks `null` whether it has a comma.
```

## 4. An age from 0 to 120

Can you write a program that asks for an age, and asks again until the
answer is a whole number from 0 to 120? Then it prints the age next year.
When you run it, try `forty`, then 130, then -1, and then 41.

```csharp exec
id: an-age-from-0-to-120-1
stdin: "forty\n130\n-1\n41\n"
// Ask for an age until it is a whole number from 0 to 120.
// Then print the age next year.

```

```hint
after: 1 runs
Which three things must be true of an age that makes sense? The shift
loop on [the lesson page](lesson:reading-input) asked three questions
too, joined by `&&`.
```

```solution
int age;
bool makesSense;
do
{
    Console.Write("Age, 0 to 120: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out age) && age >= 0 && age <= 120;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 0 to 120.");
    }
}
while (!makesSense);
Console.WriteLine($"Next year you will be {age + 1}.");
---
It asks four times, and prints `Next year you will be 42.` 0 and 120 are
both ages that make sense, so the comparisons are `>=` and `<=`. The
prompt says what the limits are, so the person knows before they type.
```

## 5. A loop that should be do...while

This program runs, and it asks again until the width makes sense. Try
`wide`, then 100, then 32. But two of its lines are written twice. Which
ones, and why does a `while` loop need them twice? Can you write it with
`do`...`while`, so that each line is written once?

```csharp exec
id: a-loop-that-should-be-do-while-1
stdin: "wide\n100\n32\n"
Console.Write("Width, 1 to 64: ");
string typed = Console.ReadLine();
int width;
while (!int.TryParse(typed, out width) || width < 1 || width > 64)
{
    Console.Write("Width, 1 to 64: ");
    typed = Console.ReadLine();
}
Console.WriteLine($"A row {width} pixels wide.");
```

```hint
after: 2 runs
The first two lines ask before the loop, so that the condition has an
answer to check. Which kind of loop asks first, and checks after?
```

```solution
string typed;
int width;
do
{
    Console.Write("Width, 1 to 64: ");
    typed = Console.ReadLine();
}
while (!int.TryParse(typed, out width) || width < 1 || width > 64);
Console.WriteLine($"A row {width} pixels wide.");
---
It prints `A row 32 pixels wide.` A `while` loop checks before its body,
so it needs an answer before the loop starts, and the lines that ask
appear twice. A `do` loop asks first, so they appear once. `typed` is made
above the `do`, because the `while` line uses it.

The condition says when to ask *again*, so it is the opposite of the
flag on the lesson page: the text is not a whole number, or it is below
1, or it is above 64. `||` checks the question after it only when the
question before it is `false`, so the width is compared only when
`TryParse` returned `true`.
```

## 6. Why the loop needs = 0

This is the first shift loop from the lesson, with `int shift;` in place
of `int shift = 0;`, and without the line that says what it wanted. It is
meant not to compile. Which line do you think the compiler's message
names?

```csharp exec
id: why-the-loop-needs-a-value-1
stdin: "7\n"
expect: CS0165
int shift;
bool makesSense = false;
while (!makesSense)
{
    Console.Write("Shift, 1 to 25: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out shift) && shift >= 1 && shift <= 25;
}
Console.WriteLine($"A moves to {(char)('A' + shift)}.");
```

<details class="dl-answer"><summary>answer</summary>

```console
Program.cs(9,46): error CS0165: Use of unassigned local variable 'shift'
```

Line 9, column 46 is `shift`, in the last line. C# checks that a variable
has a value before a line uses it. `TryParse` gives `shift` a value, but
only inside the loop's body. A `while` loop checks its condition first,
and C# does not look at the value `makesSense` holds, so it cannot be sure
that the body runs at all. If the body never ran, `shift` would have no
value on line 9.

</details>

Can you make it compile with a `do`...`while` loop, and no starting value
for `shift`?

```solution
int shift;
bool makesSense;
do
{
    Console.Write("Shift, 1 to 25: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out shift) && shift >= 1 && shift <= 25;
}
while (!makesSense);
Console.WriteLine($"A moves to {(char)('A' + shift)}.");
---
With 7, it prints `A moves to H.` The body of a `do` loop always runs, so
C# knows that `TryParse` has given `shift` a value before the last line.
`int shift = 0;` works too, but the 0 is a value that nobody chose.
```

## 7. A path with no end

In this menu, the path for 1 has no `break`. In C and in Java, a path
with no `break` continues into the path under it, so choice 1 would say
hello, and then goodbye. The cell is meant not to compile. What do you
think C# says?

```csharp exec
id: a-path-with-no-end-1
stdin: "1\n2\n9\n"
expect: CS0163
string choice;
do
{
    Console.Write("1: say hello   2: say goodbye   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("Hello!");
        case "2":
            Console.WriteLine("Goodbye!");
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
```

<details class="dl-answer"><summary>answer</summary>

```console
Program.cs(8,9): error CS0163: Control cannot fall through from one case label ('case "1":') to another
```

*Control* here means the order in which lines run. To *fall through* is to
continue from the end of one path into the next. C# does not allow it:
every path must end, with `break` or another way out. So a path cannot
run the next one by accident, when somebody forgets a `break`.

Two labels with nothing between them, like `case "9":` and `case null:`,
are allowed. They are one path with two labels, and nothing falls
through.

</details>

Can you make it compile, so that 1 says hello and 2 says goodbye?

```solution
string choice;
do
{
    Console.Write("1: say hello   2: say goodbye   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("Hello!");
            break;
        case "2":
            Console.WriteLine("Goodbye!");
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
---
With 1, 2 and 9, it prints `Hello!` and then `Goodbye!`, one for each
choice.
```

## 8. Q for quit

Many programs quit with Q as well as with a number. Can you make this
menu quit with `9`, `q` or `Q`? When you run it, try 1, and then Q.

```csharp exec
id: q-for-quit-1
stdin: "1\nQ\n"
string choice;
do
{
    Console.Write("1: say hello   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("Hello!");
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```hint
after: 2 runs
Two labels, one under the other, share one path, as `case "9":` and
`case null:` do. Which other line decides whether the menu ends?
```

```hint
after: 3 runs
The `while` line could list every way to quit. Or the path that quits
could set a flag, a `bool` called `quit`, and the `while` line could ask
only the flag. Which is easier to change later?
```

```solution
bool quit = false;
do
{
    Console.Write("1: say hello   9 or Q: quit   Choose: ");
    string choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("Hello!");
            break;
        case "9":
        case "q":
        case "Q":
        case null:
            quit = true;
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (!quit);
---
With 1 and then Q, it prints `Hello!`, and the menu ends. The `switch`
already knows which choices quit, so it records that in a flag, and the
`while` line asks only the flag. Without the flag, the `while` line would
have to list all four ways to quit again, and a fifth would need a change
in two places. `choice` can now be made inside the loop, because the
`while` line no longer uses it.
```

## 9. One more choice

<div class="dl-world" data-world="secret-messages">

This is the menu from the lesson. Can you add a choice 3, which moves the
letter back one place? The letter before A is Z. When you run it, try 3,
then 1, then 3 again, and then 9.

```csharp exec
id: one-more-choice-1--secret-messages
stdin: "3\n1\n3\n9\n"
char letter = 'A';
string choice;
do
{
    Console.WriteLine($"The letter is {letter}.");
    Console.Write("1: next letter   2: return to A   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            letter = (char)((letter - 'A' + 1) % 26 + 'A');
            break;
        case "2":
            letter = 'A';
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
Console.WriteLine("Goodbye.");
```

```hint
after: 2 runs
The path for 1 adds 1 to the letter's position. What does the path for 3
add? And what happens to A's position, 0, when you take 1 from it?
```

```solution
char letter = 'A';
string choice;
do
{
    Console.WriteLine($"The letter is {letter}.");
    Console.Write("1: next letter   2: return to A   3: previous letter   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            letter = (char)((letter - 'A' + 1) % 26 + 'A');
            break;
        case "2":
            letter = 'A';
            break;
        case "3":
            letter = (char)((letter - 'A' - 1 + 26) % 26 + 'A');
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
Console.WriteLine("Goodbye.");
---
From A, choice 3 gives Z. Choice 1 then gives A again, and 3 gives Z
once more. Adding 26 before `% 26` keeps the number from going below 0:
in C#, the remainder keeps the sign of the number before the `%`.
```

</div>

<div class="dl-world" data-world="pixel-art">

This menu makes a grey pixel brighter, 64 steps at a time, and never
past 255, the brightest a colour can be. Can you add a choice 2, which
makes it darker, 64 steps at a time, and never below 0? When you run it,
try 1, 1, and then 2 four times, and then 9.

```csharp exec
id: one-more-choice-1--pixel-art
stdin: "1\n1\n2\n2\n2\n2\n9\n"
int brightness = 128;
string choice;
do
{
    Console.WriteLine($"The brightness is {brightness}.");
    Console.Write("1: brighter   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            brightness = brightness + 64;
            if (brightness > 255)
            {
                brightness = 255;
            }
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```hint
after: 2 runs
The path for 1 adds 64, and then, if the brightness is above 255, makes
it 255. What are the two steps for the path for 2?
```

```solution
int brightness = 128;
string choice;
do
{
    Console.WriteLine($"The brightness is {brightness}.");
    Console.Write("1: brighter   2: darker   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            brightness = brightness + 64;
            if (brightness > 255)
            {
                brightness = 255;
            }
            break;
        case "2":
            brightness = brightness - 64;
            if (brightness < 0)
            {
                brightness = 0;
            }
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine($"There is no choice {choice}.");
            break;
    }
}
while (choice != "9" && choice != null);
---
The brightness goes from 128 to 192, and then to 255, the most it can be.
Choice 2 then gives 191, 127 and 63, and the fourth time it stops at 0.
```

</div>

## 10. From earlier: one capital letter

From [Decisions](lesson:making-decisions): C# compares two `char` values
by the numbers they are stored as, and the capitals A to Z are numbered in
order. This program asks for a capital letter, and says where it is in
the alphabet. `typed[0]` is the first character of the text, as a
`char`: C# counts the characters from 0.

Run it and type `Q`. Then run it again, and type a small `q`. Then run it
once more, and press Enter without typing anything. That is meant to stop
with an exception.

```csharp exec
id: from-earlier-one-capital-letter-1
stdin: "\n"
expect: exception
Console.Write("A capital letter: ");
string typed = Console.ReadLine();
char letter = typed[0];
if (letter >= 'A' && letter <= 'Z')
{
    Console.WriteLine($"{letter} is letter {letter - 'A' + 1} of the alphabet.");
}
else
{
    Console.WriteLine($"{letter} is not a capital letter.");
}
```

With nothing typed, which line stops, and why? And what does the program
do with a small `q`?

<details class="dl-answer"><summary>answer</summary>

The empty line stops at line 3 with an `IndexOutOfRangeException`: *Index
was outside the bounds of the array.* .NET gives the same message for the
characters of a string. An empty string has no character 0, so `typed[0]`
has nothing to give. After **End input**, `typed` is `null`,
and `typed[0]` has no string to look in at all.

A small `q` is stored as a larger number than `Z`, so `letter <= 'Z'` is
`false` for it, and the program takes the `else` path.

</details>

Can you make the program say `Please type one capital letter.` when the
text is empty, has more than one character, or is `null`?

```hint
after: 2 runs
`typed.Length` is the number of characters in the text. Which checks have
to come before `typed[0]`, so that it is used only when there is a first
character?
```

```solution
Console.Write("A capital letter: ");
string typed = Console.ReadLine();
if (typed != null && typed.Length == 1 && typed[0] >= 'A' && typed[0] <= 'Z')
{
    char letter = typed[0];
    Console.WriteLine($"{letter} is letter {letter - 'A' + 1} of the alphabet.");
}
else
{
    Console.WriteLine("Please type one capital letter.");
}
---
With nothing typed, it prints `Please type one capital letter.` The order
of the checks matters. `&&` checks the question after it only when the
question before it is `true`. So `typed.Length` is asked only when `typed`
is not `null`, and `typed[0]` only when there is exactly one character.
```

## 11. From earlier: a clock

From [Your first C# program](lesson:first-steps). It is 22:00. This
program asks how many hours from now, and says what time it will be. Run
it, and type 30.

```csharp exec
id: from-earlier-a-clock-1
stdin: "30\n"
int now = 22;
Console.Write($"It is {now}:00. How many hours from now? ");
string typed = Console.ReadLine();
if (int.TryParse(typed, out int hours))
{
    int later = now + hours;
    Console.WriteLine($"It will be {later}:00.");
}
else
{
    Console.WriteLine("Please type a whole number of hours.");
}
```

A clock starts again at 0 after 23. Can you make this one do the same,
with one operator from the first page?

```hint
after: 2 runs
There are 24 hours in a day. Which operator gives what is left after
dividing by 24?
```

```solution
int now = 22;
Console.Write($"It is {now}:00. How many hours from now? ");
string typed = Console.ReadLine();
if (int.TryParse(typed, out int hours))
{
    int later = (now + hours) % 24;
    Console.WriteLine($"It will be {later}:00.");
}
else
{
    Console.WriteLine("Please type a whole number of hours.");
}
---
With 30, it prints `It will be 4:00.` What does it say if you type -30?
`TryParse` reads -30, because it is a whole number, and in C# the
remainder keeps the sign of the number before the `%`. Should the program
accept that answer at all, or ask for a number that is 0 or more?
```
