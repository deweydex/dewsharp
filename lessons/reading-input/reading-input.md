---
title: "Reading input: ReadLine, TryParse and a loop that asks again"
version: 2026.09.28.2
from: from-cells-to-a-program
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4, PDP-LO6, PDP-LO10, FOOP-LO2, FOOP-LO11]
---

# Reading input: ReadLine, TryParse and a loop that asks again

This program asks you a question, and then it waits for your answer. What
do you think it does with the answer? Run it and see.

```csharp exec
id: a-program-that-waits-1
stdin: "Aoife\n"
Console.Write("What is your name? ");
string name = Console.ReadLine();
Console.WriteLine($"Hello, {name}.");
Console.WriteLine($"Your name has {name.Length} characters.");
```

When you run it, the question appears, with a box under it, and the cursor
moves into the box. Type your name, and press Enter. Nothing is typed for
you: the program waits for as long as you take. With the name Aoife, it
prints `Hello, Aoife.` and `Your name has 5 characters.` The page shows
what you typed after the question, as a console does. It shows it in
bold, so that you can tell your typing from the program's text.

What a person types into a program while it runs is called *input*. The
text that asks for it, here `What is your name? `, is a *prompt*. Two lines
do this work:

- `Console.Write` shows text on the console, as `Console.WriteLine` does,
  but it does not start a new line after the text. So the person types
  the answer on the same line as the prompt. The space at the end of the
  prompt separates the question from the answer.
- `Console.ReadLine()` waits until the person types a line and presses
  Enter. Then it gives the program the line they typed, as a `string`,
  without the Enter. To *return* a value is to send it to the code that
  called the method. `Console.ReadLine()` returns a `string`, and `name`
  holds it.

In most programs so far, the values were written in the code, and you
knew them before the program ran. Input is different: nobody knows what a
person will type until they type it. They may type a word where the
program wanted a number, a number that makes no sense, or nothing at all.
This page reads input, converts it to a number, and asks again when the
answer makes no sense. At the end, it builds a menu, a shape that many
programs use when a person chooses what they do next.

## Text that should be a number

`Console.ReadLine()` always returns a string, even when the person types
digits. To calculate with a number that somebody typed, a program has to
convert the text to a number first. `int.Parse`, from
[Variables and types](lesson:storing-and-computing), reads a string as a
whole number.

This program asks how wide a square is, in pixels, and says how many
pixels the square has. Run it and type `12`. Then run it again, and type
the word `three`, as a person might. The word is a mistake on purpose, so
nothing is broken.

```csharp exec
id: text-that-should-be-a-number-1
stdin: "three\n"
expect: exception
Console.Write("How wide is the square, in pixels? ");
string typed = Console.ReadLine();
int side = int.Parse(typed);
Console.WriteLine($"A square {side} pixels wide has {side * side} pixels.");
```

With `three`, the program stops with an exception. An *exception* is how a
running program reports a line that it cannot complete: the program stops
at that line, and the exception names the problem. Under the output, the
page shows this report:

```console
Unhandled exception. System.FormatException: The input string 'three' was not in a correct format.
   at line 3 of Program.cs
```

`int.Parse` can read a whole number written in digits, and `three` is
written in letters. So the program stopped at line 3, and the last line
never ran. [Exceptions](lesson:reading-an-error-message) met this
exception too, and said that the fix belongs in the program. The person
did nothing strange: they answered the question in words. A program that
reads input has to expect answers like that one.

## Checking before converting

`int.TryParse` *tries* to read a string as a whole number, and it never
stops the program. What do you think the second line of this cell prints?

```csharp exec
id: checking-before-converting-1
string typed = "42";
bool worked = int.TryParse(typed, out int number);
Console.WriteLine($"{typed}: {worked}, {number}");

typed = "seven";
worked = int.TryParse(typed, out number);
Console.WriteLine($"{typed}: {worked}, {number}");
```

```predict
type: choice

What will the second line print?

- seven: False, 0
  - `TryParse` gives `number` a value every time, even when the text is
    not a number.
- seven: False, 42
  - `number` held 42 after the first `TryParse`. Does the second one leave
    it as it was?
- seven: True, 7
  - Can `TryParse` read a number that is written in words?
- It stops with a FormatException, as int.Parse did
  - Does `TryParse` stop the program when the text is not a number?
```

The first line prints `42: True, 42`, and the second prints
`seven: False, 0`. `int.TryParse` gives two answers:

- It returns a `bool`: `true` if the text is a whole number, and `false`
  if it is not. Here, `worked` holds it.
- It puts the number in the variable after the word `out`. `out` marks a
  variable that the method fills. `out int number` makes a new `int`
  variable, `number`, for `TryParse` to fill. The second time, `number`
  already exists, so that line has no `int`, in the same way that it has
  no `bool` in front of `worked`.

When the text is not a whole number, `TryParse` returns `false`, and it
puts 0 in `number`. That 0 is not what anybody typed. So a program uses
the number only when `TryParse` returned `true`.

Can you change `"seven"` to other text, and see which ones `TryParse`
reads: `"-3"`, `"4.5"`, `" 42 "` with spaces round it, or `""`, with
nothing between the quotes? The first problem on the
[practice page](lesson:reading-input-practice) tries these and a few more.

Here is the square program again, with `TryParse` in place of
`int.Parse`. Run it, and type `three` again. Then try `12`.

```csharp exec
id: checking-before-converting-2
stdin: "three\n"
Console.Write("How wide is the square, in pixels? ");
string typed = Console.ReadLine();
if (int.TryParse(typed, out int side))
{
    Console.WriteLine($"A square {side} pixels wide has {side * side} pixels.");
}
else
{
    Console.WriteLine($"{typed} is not a whole number of pixels.");
}
```

With `three`, it prints `three is not a whole number of pixels.`, and the
program ends with no exception. `TryParse` returns a `bool`, so it can be
the condition of an `if`, and the number is used only on the path where
`TryParse` returned `true`. This is the pattern for reading a number from
a person, and the rest of this page uses it:

1. Read the line with `Console.ReadLine()`.
2. Ask `int.TryParse` whether it is a whole number.
3. Use the number only when the answer is `true`. When it is `false`, say
   what you wanted.

Checking what a person typed, before the program uses it, is called
*input validation*.

What does the program say if you type `-4`? Can a square be -4 pixels
wide?

## Asking again

The program above no longer stops with an exception. But after one answer
that makes no sense, it ends, and the person has to run it again. And a
whole number is not always an answer that makes sense: a square cannot be
-4 pixels wide. A kinder program says what it wanted, and asks again, until the answer
makes sense.

This program asks for a *shift*: how many places a secret code moves each
letter along the alphabet, from 1 to 25. It asks again until the answer is
a whole number in that range. Run it, and try `seven`, then `30`, then
`7`.

```csharp exec
id: asking-again-1
stdin: "seven\n30\n7\n"
int shift = 0;
bool makesSense = false;
while (!makesSense)
{
    Console.Write("Shift, 1 to 25: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out shift) && shift >= 1 && shift <= 25;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}
Console.WriteLine($"A moves to {(char)('A' + shift)}.");
```

It asks three times. `seven` is not a whole number, and 30 is more than
25, so after each of them the program says what it wanted. With 7, it
prints `A moves to H.`

`makesSense` records whether the answer makes sense yet. A `bool` variable
that records something like this is often called a *flag*. The loop
continues while the flag is `false`: `!` means *not*, so `!makesSense` is
`true` while the answer does not make sense.

The line that sets the flag asks three questions, joined by `&&`. Is the
text a whole number? Is it 1 or more? Is it 25 or less? `&&` checks the
question after it only when the question before it is `true`. So when
`TryParse` returns `false`, C# does not check the range of a number that
nobody typed.

Look at the first two lines. The flag starts as `false`, but nothing has
been typed yet, so nothing has failed to make sense. That `false` is there
only so that the loop's body runs the first time. And `shift` starts as 0,
which is not a shift at all. C# has a loop for a question that must be
asked at least once.

### A loop that checks after

Both loops in this cell start with `count` at 10. What do you think the
cell prints?

```csharp exec
id: asking-again-2
int count = 10;
while (count < 3)
{
    Console.WriteLine($"while: {count}");
    count++;
}

count = 10;
do
{
    Console.WriteLine($"do: {count}");
    count++;
}
while (count < 3);
```

```predict
type: choice

What will the first line print?

- while: 10
  - Is 10 less than 3? A `while` loop asks before its body runs.
- do: 10
  - A `do` loop runs its body first, and asks after it.
- Nothing: neither loop runs its body
  - 10 is not less than 3, so both conditions are `false` from the start.
```

It prints one line, `do: 10`. 10 is not less than 3, so both conditions
are `false`. The `while` loop checks its condition before its body, so its
body never runs. [Loops](lesson:repeating-yourself) called a loop like
that a *pre-test loop*. The `do` loop runs its body first, and checks its
condition after it. So its body always runs at least once. A loop that checks its condition after its body is a
*post-test loop*, and C# writes it with `do` and `while`:

```csharp
do
{
    // the body, which always runs at least once
}
while (condition);
```

The `while` line of a `do` loop ends with a semicolon. The `while` line of
a `while` loop does not.

A question that must be asked at least once suits a post-test loop. Here
is the shift program again, with a `do`...`while` loop. Try `seven`, `30`
and `7` again.

```csharp exec
id: asking-again-3
stdin: "seven\n30\n7\n"
int shift;
bool makesSense;
do
{
    Console.Write("Shift, 1 to 25: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out shift) && shift >= 1 && shift <= 25;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}
while (!makesSense);
Console.WriteLine($"A moves to {(char)('A' + shift)}.");
```

It asks the same questions, and prints the same lines. The body of the
loop did not change. The `while` line moved to the end, and at the top,
`shift` and `makesSense` have no starting values. The body always runs,
and gives each of them a value, before any line uses them. C# checks that
a variable has a value before a line uses it, and it knows that the body
of a `do` loop runs at least once. Problem 6 on the practice page shows
what C# says about the `while` loop without its `= 0`.

`shift` and `makesSense` are made above the `do`, not inside its curly
brackets. The `while` line and the last line come after the closing curly
bracket, and a variable made inside curly brackets exists only inside
them. [Starting a total](lesson:a-total-that-starts-again) looked closely
at this.

### Your turn

<div class="dl-world" data-world="secret-messages">

A spy sends a letter by tapping a key: one tap for A, two for B, and so
on, up to 26 taps for Z. This program asks how many taps, and says which
letter they make. It asks once. Run it, and type `30`: is that a letter?
Can you make it ask again until the answer is a whole number from 1 to 26?

```csharp exec
id: your-turn-1--secret-messages
stdin: "twenty\n30\n8\n"
Console.Write("Taps, 1 to 26: ");
string typed = Console.ReadLine();
if (int.TryParse(typed, out int taps))
{
    char letter = (char)('A' + taps - 1);
    Console.WriteLine($"{taps} taps is the letter {letter}.");
}
else
{
    Console.WriteLine("Please type a whole number from 1 to 26.");
}
```

```hint
after: 2 runs
Which lines have to run again when the answer makes no sense? In the
shift program, which lines are between the `do` and the `while`?
```

```hint
after: 3 runs
The loop needs a flag that is `true` when the answer makes sense: a whole
number, 1 or more, and 26 or less. Can you write it with `&&`, as
`makesSense` was written for the shift?
```

```hint
after: 1 errors
Does the message say CS0103 or CS0165? A variable made inside the loop's
curly brackets does not exist after them. Can you make `taps` above the
`do`, with `int taps;`, and write `out taps` inside the loop?
```

```solution
int taps;
bool makesSense;
do
{
    Console.Write("Taps, 1 to 26: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out taps) && taps >= 1 && taps <= 26;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 1 to 26.");
    }
}
while (!makesSense);
char letter = (char)('A' + taps - 1);
Console.WriteLine($"{taps} taps is the letter {letter}.");
---
With `twenty`, 30 and then 8, it asks three times, and prints `8 taps is
the letter H.` The program finds the letter only after the loop, when `taps`
is sure to make sense.
```

</div>

<div class="dl-world" data-world="pixel-art">

A grey pixel has the same amount of red, green and blue, each from 0 to
255. This
program asks for a brightness, and writes the grey the way a web page
writes a colour. It asks once. Run it, and type `300`: is that a colour?
Can you make it ask again until the answer is a whole number from 0 to
255?

```csharp exec
id: your-turn-1--pixel-art
stdin: "bright\n300\n200\n"
Console.Write("Brightness, 0 to 255: ");
string typed = Console.ReadLine();
if (int.TryParse(typed, out int brightness))
{
    Console.WriteLine($"The grey is rgb({brightness}, {brightness}, {brightness}).");
}
else
{
    Console.WriteLine("Please type a whole number from 0 to 255.");
}
```

```hint
after: 2 runs
Which lines have to run again when the answer makes no sense? In the
shift program, which lines are between the `do` and the `while`?
```

```hint
after: 3 runs
The loop needs a flag that is `true` when the answer makes sense: a whole
number, 0 or more, and 255 or less. Can you write it with `&&`, as
`makesSense` was written for the shift?
```

```hint
after: 1 errors
Does the message say CS0103 or CS0165? A variable made inside the loop's
curly brackets does not exist after them. Can you make `brightness` above
the `do`, with `int brightness;`, and write `out brightness` inside the
loop?
```

```solution
int brightness;
bool makesSense;
do
{
    Console.Write("Brightness, 0 to 255: ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out brightness) && brightness >= 0 && brightness <= 255;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 0 to 255.");
    }
}
while (!makesSense);
Console.WriteLine($"The grey is rgb({brightness}, {brightness}, {brightness}).");
---
With `bright`, 300 and then 200, it asks three times, and prints `The
grey is rgb(200, 200, 200).` 0 and 255 are inside the range, so the
comparisons are `>=` and `<=`.
```

</div>

## When there is no more input

`Console.ReadLine()` returns the line that the person typed. If they press
Enter without typing anything, it returns an *empty string*, `""`: a
string with no characters in it. But sometimes there is no line to read
at all, because the input has ended. On this page, that happens when you
press **End input**. In a console window on Windows, it happens when the
person presses Ctrl+Z and then Enter. It also happens when a program reads
its input from a file, and reaches the end of the file.

Here is the first program on this page again. Run it, and press
**End input** without typing anything. The cell is meant to stop with an
exception, so nothing is broken.

```csharp exec
id: when-there-is-no-more-input-1
expect: exception
Console.Write("What is your name? ");
string name = Console.ReadLine();
Console.WriteLine($"Hello, {name}.");
Console.WriteLine($"Your name has {name.Length} characters.");
```

It prints `Hello, .`, and then it stops at line 4 with a
`NullReferenceException`, and the message *Object reference not set to an
instance of an object.* When the input has ended, `Console.ReadLine()`
returns `null`, C#'s value for *nothing here*. A `string` variable that
holds `null` holds no string at all, not even an empty one. In `$"..."`,
`null` shows as nothing, so line 3 runs. But `name.Length` on line 4 asks
the string for its length, and there is no string to ask. The message is
.NET's way of saying that `name` holds nothing to ask.

(If you know Python: there, `input()` itself stops with an `EOFError` when
the input has ended. C# returns `null` instead, and here the program
stops later, on line 4, which asks `name` for its length.)

A program that reads input checks for `null` before it uses what it read.
Can you make this one print `Nobody is there.` when `name` is `null`, and
greet the person as before when it is not?

```hint
after: 2 errors
Which question, asked with `if`, is `true` when there is no name? `==`
can compare a string with `null`.
```

```solution
Console.Write("What is your name? ");
string name = Console.ReadLine();
if (name == null)
{
    Console.WriteLine("Nobody is there.");
}
else
{
    Console.WriteLine($"Hello, {name}.");
    Console.WriteLine($"Your name has {name.Length} characters.");
}
---
With **End input**, it prints `Nobody is there.` The check comes before
the line that asks for `name.Length`, so that line runs only when there
is a name.
```

`int.TryParse` needs no check of its own: it returns `false` for `null`,
as it does for any text that is not a whole number. But look again at the
loops that asked for a shift. After **End input**, `Console.ReadLine()`
returns `null` every time it is called, at once, without waiting.
`TryParse` returns `false`, so the loop asks again, and gets `null` again.
It never waits, and it never ends. If you try it, press **Stop**. The menu
in the next section checks for `null`, so that it ends when the input
ends.

## A menu: many paths from one choice

A program that a person uses for a while often shows a *menu*: a list of
choices, each with a number. The person chooses one, the program does it,
and the menu appears again, until the person chooses to quit. Here is a
small one. It keeps a letter, and moves it along the alphabet. Run it, and
try 1, 1, then 7, which is not on the menu, then 2, and then 9.

```csharp exec
id: a-menu-1
stdin: "1\n1\n7\n2\n9\n"
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

The letter moves from A to B, and then to C. For 7, the program prints
`There is no choice 7.` Then 2 returns the letter to A, and 9 ends the
program with `Goodbye.`

The menu must appear at least once, so the loop is a `do`...`while`. It
continues while the choice is not `"9"` and the input has not ended.
`choice` is made above the `do`, so that the `while` line can use it.

Inside the loop is a *switch statement*. It chooses one path from many,
by the value in its brackets. Here the value is `choice`, and C# compares
it with the value after each `case`:

- `case "1":` is a *case label*. The lines under it run when `choice` is
  `"1"`, and they are that choice's path.
- `break` ends the path, and leaves the `switch`. Every path must end, and
  `break` is the usual way. Problem 7 on the practice page shows what the
  compiler says about a path with no end.
- `case "9":` and `case null:` are two labels on one path. The path does
  nothing but `break`, and then the `while` line ends the loop. So when the
  input ends, the menu ends, as if the person had chosen 9.
- `default:` is the path for every value that no `case` names, such as
  `"7"`.

A `break` in a `switch` leaves the `switch`, and not the loop around it.
That is why the loop has a condition of its own, in its `while` line.

`if` and `else if` can make the same choice, as on
[Decisions](lesson:making-decisions). A `switch` suits a menu, because it
names the value once, and then lists the paths, one under another, like a
table.

What does the menu do if you type `one`, or `1` with a space after it? A
`switch` compares the text exactly as it was typed.

### Colours and a clean screen

A console program can clear the console, and write in colour, on this page
and in a console window. `Console.Clear()` empties the console.
`Console.ForegroundColor = ConsoleColor.Green;` makes the text written
after it green, and `Console.ResetColor()` returns to the console's own
colours. `ConsoleColor` lists the colours a console has, such as `Green`,
`Red`, `Yellow` and `Blue`.

This program asks for a secret word, and then clears the console, so that
nobody behind you can read it. Then it asks for the word again. Run it,
and type the same word twice. Then run it again, and type two different
words.

```csharp exec
id: colours-and-a-clean-screen-1
stdin: "OTTER\nOTTER\n"
Console.Write("Choose a secret word: ");
string secret = Console.ReadLine();
Console.Clear();    // hide the secret word
Console.Write("Type it again: ");
string again = Console.ReadLine();
if (again == secret)
{
    Console.ForegroundColor = ConsoleColor.Green;
    Console.WriteLine("The two are the same.");
}
else
{
    Console.ForegroundColor = ConsoleColor.Red;
    Console.WriteLine("The two are different.");
}
Console.ResetColor();
```

After the first word, the console is empty, and only the second question
is there. With the same word twice, it prints `The two are the same.` in
green. The colour is never the only signal: the words say it too, for
anyone who cannot see the colour.

### Your turn

The menu below already runs, and it has one thing missing. Can you add it?

<div class="dl-world" data-world="secret-messages">

This menu asks for a word, and codes it with a Caesar shift of 3 each time
you choose 1. Can you add a choice 2, which decodes the word, moving each
letter backwards 3 places? When you run it, try `HELLO`, then 1, 1, 2 and 9.

```csharp exec
id: your-turn-2--secret-messages
stdin: "HELLO\n1\n1\n2\n9\n"
Console.Write("A word, in capitals: ");
string word = Console.ReadLine();
string choice;
do
{
    Console.WriteLine($"The word is {word}.");
    Console.Write("1: code it   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            string coded = "";
            foreach (char letter in word)
            {
                coded += (char)((letter - 'A' + 3) % 26 + 'A');
            }
            word = coded;
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
Where does a new choice go? Another `case`, with its own path, before
`default`. Which part of the line that moves each letter has to change?
```

```hint
after: 1 errors
Does the message say CS0128? The paths of a `switch` share one pair of
curly brackets, so two paths cannot each make a variable called `coded`.
Can you give the new one another name, such as `decoded`?
```

```hint
after: 3 runs
Moving backwards 3 places is `- 3`. Add 26 before `% 26`, so that the
number is never below 0, as on
[Variables and types](lesson:storing-and-computing).
```

```solution
Console.Write("A word, in capitals: ");
string word = Console.ReadLine();
string choice;
do
{
    Console.WriteLine($"The word is {word}.");
    Console.Write("1: code it   2: decode it   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            string coded = "";
            foreach (char letter in word)
            {
                coded += (char)((letter - 'A' + 3) % 26 + 'A');
            }
            word = coded;
            break;
        case "2":
            string decoded = "";
            foreach (char letter in word)
            {
                decoded += (char)((letter - 'A' - 3 + 26) % 26 + 'A');
            }
            word = decoded;
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
HELLO becomes KHOOR, then NKRRU, and choice 2 returns it to KHOOR.
The menu line needs a change too, or nobody knows that choice 2 is there.
Each `foreach` loop can have its own `letter`, because each one lives only
inside its own loop.
```

</div>

<div class="dl-world" data-world="pixel-art">

This menu draws a square of `#` each time you choose 1, but the square is
always 3 pixels wide. Can you make choice 1 ask for the size, from 1 to
20? If the answer is not a whole number from 1 to 20, it can say so, and
the menu appears again. When you run it, try 1 and 4, then 1 and `big`,
and then 9.

```csharp exec
id: your-turn-2--pixel-art
stdin: "1\n4\n1\nbig\n9\n"
string choice;
do
{
    Console.Write("1: draw a square   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            int size = 3;
            for (int row = 0; row < size; row++)
            {
                for (int column = 0; column < size; column++)
                {
                    Console.Write("#");
                }
                Console.WriteLine();
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
Where does the size come from now? A prompt, `Console.ReadLine()` and
`int.TryParse`, as in the square program near the top of this page.
```

```hint
after: 3 runs
Can the loops that draw go inside an `if`, whose condition is true only
when the size is a whole number from 1 to 20? Then the `else` can say
what the program wanted.
```

```hint
after: 1 errors
Does the message say CS0128? The program makes `size` twice: once with
`int size = 3;`, and once with `out int size`. Which of the two lines
should stay?
```

```solution
string choice;
do
{
    Console.Write("1: draw a square   9: quit   Choose: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Size, 1 to 20: ");
            string typed = Console.ReadLine();
            if (int.TryParse(typed, out int size) && size >= 1 && size <= 20)
            {
                for (int row = 0; row < size; row++)
                {
                    for (int column = 0; column < size; column++)
                    {
                        Console.Write("#");
                    }
                    Console.WriteLine();
                }
            }
            else
            {
                Console.WriteLine("Please type a whole number from 1 to 20.");
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
With 4, it draws four rows of `####`. With `big`, it says what it wanted,
and the menu appears again. The menu itself is the loop that asks again,
so choice 1 needs no loop of its own.
```

</div>

## Looking back

This page read a number in three ways. It trusted the input, with
`int.Parse`. It checked it once, with `int.TryParse`. And it asked until
the answer made sense, with a `do`...`while` loop. When is each one
enough? Can you think of a program where stopping with an exception would
do no harm, and one where it would?

The inputs you choose, to try a program with, are called *test data*. A
program that reads a number from 1 to 25 deserves more than one try.
What would you type to test it? Can you make a list before you open the
answer?

<details class="dl-answer"><summary>one list</summary>

Here is one answer. Yours may be different and work too.

A number in the middle; the two limits, 1 and 25; the numbers just outside
them, 0 and 26; a word; nothing at all; and **End input**. A program that
has `<` where it needs `<=` gives a different answer only at a limit, so
try each limit.

</details>

A challenge: on [Exceptions](lesson:reading-an-error-message), a bill was
shared between some people. This program asks for the bill and the number
of people. Before you change it, what do you think it prints for 0
people? Can you make it ask again until the bill is a number above 0, and
the number of people is a whole number from 1 to 20? `double.TryParse`
works as `int.TryParse` does, for a number with a decimal point.

```csharp challenge
// Share a bill. Can you make it ask again until the bill is a number
// above 0, and the number of people is a whole number from 1 to 20?
Console.Write("The bill, in euro: ");
double bill = double.Parse(Console.ReadLine());
Console.Write("How many people? ");
int people = int.Parse(Console.ReadLine());
Console.WriteLine($"Each person pays €{bill / people:F2}.");
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project. There, the program asks its questions in a
console window. Ctrl+Z and then Enter makes `Console.ReadLine()` return
`null` there, as **End input** does here.

Next, the [practice page](lesson:reading-input-practice) has more problems
on input, `TryParse`, loops that ask again and menus, and two from earlier
pages. After it, each course ends its first series with a set of mixed
problems: *Mixed problems: first programs* in Programming and Design
Principles, and *Mixed problems: starting in C#* in Fundamentals of
Object-Oriented Programming. Later,
[A whole program](lesson:from-cells-to-a-program) puts the loop that asks
again into a method of its own, and
[A front end](lesson:a-front-end-for-a-class) builds a menu for a class.

## Where to read more

Microsoft. *Console.ReadLine Method.*
<https://learn.microsoft.com/dotnet/api/system.console.readline>. The
official description of `Console.ReadLine`. Its remarks say when it
returns `null`, with an example that reads lines until the input ends.

Microsoft. *How to convert a string to a number.*
<https://learn.microsoft.com/dotnet/csharp/programming-guide/types/how-to-convert-a-string-to-a-number>.
This page compares `Parse` and `TryParse`, and says which text each one
can read, such as a number with spaces round it.

Microsoft. *Iteration statements (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/iteration-statements>.
Its part on the `do` statement describes the post-test loop from this
page.

Microsoft. *if and switch statements (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/selection-statements>.
Its part on `switch` describes case labels, `default`, and the other kinds
of `case` that C# allows, which this course does not use.
