---
title: "A whole program: from cells to Visual Studio"
version: 2026.09.27.1
from: from-cells-to-a-program
covers: [PDP-LO5, PDP-LO6, PDP-LO7, PDP-LO8, PDP-LO11, PDP-LO12]
---

# A whole program: from cells to Visual Studio

What do you think this cell prints?

```csharp exec
id: a-loop-that-stops-itself-1
int count = 0;
while (true)
{
    count = count + 1;
    if (count == 3)
    {
        break;
    }
}
Console.WriteLine(count);
```

```predict
type: number

What will it print?
```

It prints 3. `while (true)` would repeat for ever, because `true` never
becomes `false`. `break` leaves the loop at once, from wherever it is, and
the program continues after the loop.

Every program on this site so far has lived in a cell, and each Run was
already a whole program, from its first line to its last. A program that
somebody else can use needs three more things. It keeps asking the person
what to do until they tell it to stop, and it copes when they type
something unexpected. It lives in files, one for each part, so that
several people can write it at the same time. And it runs on their
computer, not on this page. This page takes those three steps. Then it
shows how a team builds such a program in three releases. *The team
project*, two pages from here, needs all of it.

## A loop that waits for quit

The page *Reading input* read what a person types, with
`Console.ReadLine()`. This menu does the same. When you run it, it waits
for you: type a choice, and press Enter. Try 1 and a message, then 2, then
a choice that is not on the menu, and then 9.

```csharp exec
id: a-loop-that-waits-for-quit-1
stdin: "1\nMEET ME\n2\n7\n9\n"
while (true)
{
    Console.WriteLine("1: shout a message   2: count the messages   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        Console.WriteLine(message.ToUpper() + "!");
    }
    else if (choice == "2")
    {
        Console.WriteLine("That was the only one.");
    }
    else
    {
        Console.WriteLine($"There is no choice {choice}");
    }
}
Console.WriteLine("Goodbye.");
```

The menu is a `while (true)` loop with one way out: the choice that says
quit. Every other choice repeats the loop. A program that talks to a
person has that shape, from a cash machine to a game.

`choice == null` is a second way out. `Console.ReadLine()` gives `null`
when there is no more input to read: on this page, when you press **End
input**. Then nobody is left to choose, so the menu ends.

The menu on *Reading input* had a different shape: a `do`...`while` loop
around a `switch`. Why doesn't this one use a `switch`? This cell shows
the reason. It has no input, so it runs as soon as you press Run.

```csharp exec
id: a-loop-that-waits-for-quit-2
for (int round = 1; round <= 3; round++)
{
    switch (round)
    {
        case 2:
            Console.WriteLine("Round 2: break");
            break;
        default:
            Console.WriteLine($"Round {round}");
            break;
    }
}
Console.WriteLine("After the loop");
```

```predict
type: choice

What will it print after `Round 2: break`?

- After the loop
  - `break` leaves the loop, as it did in the first cell on this page.
- Round 3
  - The `break` is inside the `switch`, and the `switch` is inside the
    loop.
- Nothing more: the program ends
  - Perhaps `break` ends the whole program.
```

It prints `Round 3`, and then `After the loop`. Inside a `switch`,
`break` ends the `case` and leaves the `switch`, and nothing more. The
loop around it continues. So in a `while (true)` menu, `case "9": break;`
would never end the program. With a `switch`, the loop needs a condition
of its own, as the `do`...`while` on *Reading input* had. With `if` and
`else if`, as in the menu above, `break` leaves the loop. Both shapes
work. Choose one, and keep the loop's way out where a reader can see it.

### Your turn

Can you add a choice `3`, which prints the message backwards? When you run
it, try 3 and NOON, then 3 and OTTER, and then 9.

```csharp exec
id: your-turn-1
stdin: "3\nNOON\n3\nOTTER\n9\n"
while (true)
{
    Console.WriteLine("1: shout a message   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        Console.WriteLine(message.ToUpper() + "!");
    }
    else
    {
        Console.WriteLine($"There is no choice {choice}");
    }
}
Console.WriteLine("Goodbye.");
```

```hint
Where does a new choice go? Another `else if`, before the `else`. It asks
for the message the same way choice 1 does.
```

```hint
after: 3 errors
A string cannot be changed, so the program builds a new one. A `for` loop
can count down from the last position, `message.Length - 1`, to 0, and add
each character to the end of the new string.
```

```solution
title: with what you've met so far
while (true)
{
    Console.WriteLine("1: shout a message   3: backwards   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        Console.WriteLine(message.ToUpper() + "!");
    }
    else if (choice == "3")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        string backwards = "";
        for (int i = message.Length - 1; i >= 0; i--)
        {
            backwards = backwards + message[i];
        }
        Console.WriteLine(backwards);
    }
    else
    {
        Console.WriteLine($"There is no choice {choice}");
    }
}
Console.WriteLine("Goodbye.");
---
NOON stays NOON, and OTTER becomes RETTO. The menu line needs changing
too, or nobody knows that choice 3 is there. Two choices can each have a
variable called `message`, because each one lives only inside the braces
of its own `else if`.
```

## Asking until the answer makes sense

A person will type anything: `seven` where a number was wanted, 30 where
the most is 25, or nothing at all. A program has to decide what to do
with it. The kindest answer is usually to say what the program wanted,
and ask again. Here is the loop from *Reading input* that asks again, in
a method of its own. Try `seven`, then 30, then 7.

```csharp exec
id: asking-until-the-answer-makes-sense-1
stdin: "seven\n30\n7\n"
/// <summary>
/// Asks until the answer is a whole number from 1 to 25, and gives it in
/// shift. Returns false if the input ends first.
/// </summary>
static bool TryAskShift(out int shift)
{
    while (true)
    {
        Console.Write("Shift, 1 to 25: ");
        string text = Console.ReadLine();
        if (text == null)
        {
            shift = 0;
            return false;
        }
        if (int.TryParse(text, out shift) && shift >= 1 && shift <= 25)
        {
            return true;
        }
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}

if (TryAskShift(out int shift))
{
    Console.WriteLine($"Shift: {shift}");
}
```

`return` inside the loop ends the method, and the loop with it, as soon as
the answer makes sense. The method has the shape of `int.TryParse`: it
returns `true` or `false`, and puts its answer in an `out` parameter. So
when the input ends, the method does not have to invent a shift. It
returns `false`, and the code that called it decides what to do. Inside
it, `int.TryParse(text, out shift)` puts the number straight into the
method's own `out` parameter, `shift`.

### Your turn

The code that decides can be tested with no typing at all, if it is in a
method of its own. Can you write `FirstValid(string[] answers, int low,
int high)`? It checks the answers in order, and returns the position of
the first one that is a whole number from `low` to `high`. If none is, it
returns -1, as `LinearSearch` did on the page *Searching*.

```csharp exec
id: your-turn-2
/// <summary>
/// Returns the position of the first answer that is a whole number from
/// low to high, or -1 if none is.
/// </summary>
static int FirstValid(string[] answers, int low, int high)
{
    return -1;
}

string[] typed = { "seven", "30", "7" };
Console.WriteLine(FirstValid(typed, 1, 25));
```

```inputs
FirstValid(new string[] { "seven", "30", "7" }, 1, 25)
FirstValid(new string[] { "0", "1" }, 1, 25)
FirstValid(new string[] { "-3", "7.5" }, 1, 25)
FirstValid(new string[] { " 7 ", "8" }, 1, 25)       // spaces round the 7
FirstValid(new string[0], 1, 25)                     // no answers at all
FirstValid(new string[] { "-3", "7.5" }, -20, 40)    // a temperature
```

```hint
How can the method visit each answer, and know its position? A `for`
loop gives both, with `i`. What does
`int.TryParse(answers[i], out int number)` tell you, and what else must be
true of `number`?
```

```solution
/// <summary>
/// Returns the position of the first answer that is a whole number from
/// low to high, or -1 if none is.
/// </summary>
static int FirstValid(string[] answers, int low, int high)
{
    for (int i = 0; i < answers.Length; i++)
    {
        if (int.TryParse(answers[i], out int number) && number >= low && number <= high)
        {
            return i;
        }
    }
    return -1;
}

string[] typed = { "seven", "30", "7" };
Console.WriteLine(FirstValid(typed, 1, 25));
---
`int.TryParse` reads `"-3"` as a whole number. It does not count here
only because -3 is below 1. For a temperature from -20 to 40, it counts:
the last input gives 0, the position of `"-3"`. `"7.5"` is not a whole
number, so it never counts. `" 7 "` counts, and its input gives 0 too:
`int.TryParse` ignores spaces before and after the digits. Is that what you want for a shift? Probably. Now it is a
decision you made, and not a surprise.

`FirstValid` is a linear search, with a test in place of `==`. Keeping the
deciding in its own method is what lets a test check it with nobody
typing.
```

## One place to start: Program.cs

A program in cells starts wherever you press Run. A program in Visual
Studio is a *project*: a folder of files that are compiled together, into
one program. One file, `Program.cs`, holds the statements where the
program starts. The other files hold classes, with the methods that do
the detailed work. When a team writes a program, each person can write
one file.

Here is Codebreaker's coder, in two files. The first cell is `Cipher.cs`:
a `static class`, as on the page *Reusable methods*, with the method that
codes a message. It never reads or prints anything. The second cell is
`Program.cs`: the menu, and everything that talks to the person. It uses
`Cipher` from the cell above it (rule 2: a class written in a cell can be
used by the cells below it).

```csharp exec
id: one-place-to-start-main-1
file: Cipher.cs
static class Cipher
{
    /// <summary>
    /// Returns message with each capital letter from A to Z moved shift
    /// places along the alphabet. Every other character stays as it is.
    /// shift can be any whole number, even one below zero.
    /// </summary>
    public static string Encode(string message, int shift)
    {
        string coded = "";
        foreach (char character in message)
        {
            if (character >= 'A' && character <= 'Z')
            {
                int position = character - 'A';
                int moved = ((position + shift) % 26 + 26) % 26;
                coded = coded + (char)('A' + moved);
            }
            else
            {
                coded = coded + character;
            }
        }
        return coded;
    }
}
```

```csharp exec
id: one-place-to-start-main-1-program
stdin: "1\nhello\n3\n9\n"
// Codebreaker's coder: codes messages until the person chooses to quit.
while (true)
{
    Console.Write("1: code a message   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        if (message != null && TryAskShift(out int shift))
        {
            Console.WriteLine(Cipher.Encode(message.ToUpper(), shift));
        }
    }
}
Console.WriteLine("Goodbye.");

/// <summary>
/// Asks until the answer is a whole number from 1 to 25, and gives it in
/// shift. Returns false if the input ends first.
/// </summary>
static bool TryAskShift(out int shift)
{
    while (true)
    {
        Console.Write("Shift, 1 to 25: ");
        string text = Console.ReadLine();
        if (text == null)
        {
            shift = 0;
            return false;
        }
        if (int.TryParse(text, out shift) && shift >= 1 && shift <= 25)
        {
            return true;
        }
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}
```

Try `hello` as the message, and 3 as the shift. It prints `KHOOR`.
`message.ToUpper()` makes the message capitals first, because `Encode`
moves only capital letters. When you read the top of `Program.cs`, you see what the program does, in a
few lines, without any of the arithmetic. The arithmetic is in
`Cipher.cs`. The details of asking are at the bottom, in `TryAskShift`,
because a method written below the statements can be called above them,
as on the page *Methods*. `TryAskShift` is the method from the section
above, written again, because a method in a program cell belongs to that
cell.

Where does the program start? At the first statement in `Program.cs`.
Statements written in a file outside any class, as here, are called
*top-level statements*. The compiler makes them into a method called
`Main`, the method where every C# program starts, and runs them from the
first to the last.
You met a `Main` of your own on *Reusable methods* (rule 5). In a new
**Console App** in Visual Studio, the box *Do not use top-level
statements* is clear, and `Program.cs` starts with statements, as here.
With it ticked, `Program.cs` starts with a class called `Program` and a
`static void Main`: the same start, written the older way. Leave it
clear, to match these pages.

<details class="dl-why"><summary>Why can't Cipher.cs have statements too?</summary>

A program starts in one place. If two files in a project have statements,
C# cannot tell which of them runs first, and it does not compile:
`error CS8802: Only one compilation unit can have top-level statements.`
A *compilation unit* is one file of code. On this page you never see that
message, because each Run is a program built from one program cell, and
the statements in the cells above it never run.

</details>

## Running it outside the page

A program meant for somebody else runs on their computer. Every program
cell on these pages has a **Download project** button. It saves the cell
as a Visual Studio project, in a ZIP file: the program cell as
`Program.cs`, one file for each types cell above it, such as `Cipher.cs`,
and the settings that the page uses. You need a computer with Visual
Studio for this part. If you are not at one now, this is a good place to
stop, and to return to later.

1. Press **Download project** on the cell for `Program.cs` above. Keep the
   ZIP file that you download: it is a copy of this version.
2. Unzip it: right-click it, and choose **Extract All**.
3. In the new folder, double-click the file that ends in `.sln`. Or, in
   Visual Studio, choose **File**, then **Open**, then
   **Project/Solution**, and choose that file. The `.sln` file is a
   *solution*: Visual Studio's name for a set of projects that open
   together. This one holds one project.
4. Look at **Solution Explorer**, the panel that lists the project's
   files. It has `Program.cs` and `Cipher.cs`, as on the page, and one
   more, `IrishCulture.cs`. That file makes money and dates look as they
   do on the page, in the Irish way.
5. Press Ctrl+F5. This is **Start Without Debugging**. A console window
   opens, and the menu waits for you there. Code a message, then choose
   9. When the program ends, press a key to close the window.
6. Now run it with the debugger, as on *Debugging*. Open `Cipher.cs`, and
   click in the grey margin beside the line `string coded = "";` to put a
   breakpoint there. Press F5, **Start Debugging**. In the console window,
   choose 1, and type a message and a shift. The program pauses in
   `Cipher.cs`.
7. Look at the **Call Stack** window. At the top is `Cipher.Encode`.
   Under it is `Program.<Main>$`: the `Main` that the compiler made from
   the statements in `Program.cs`. Two files, one program. Press F10,
   **Step Over**, a few times, and watch `coded` grow in the **Locals**
   window. Shift+F5 stops the program.

The console window is a real console. To end the input there, as **End
input** does on the page, press Ctrl+Z and then Enter, on Windows. Then
`Console.ReadLine()` gives `null`, and the menu ends.

A project that you start yourself, from Visual Studio's **Console App**
template, has one setting that differs from the page: warnings about
`null` are on. A line such as `string choice = Console.ReadLine();` then
shows `warning CS8600`, because `ReadLine` can give `null`. It is a
warning, not an error, and the program still runs. A project that you
download from the page has the page's settings, so it does not show that
warning.

To add a file of your own to a project, right-click the project's name in
**Solution Explorer**, and choose **Add**, then **Class**. Give it the
class's name, such as `Game.cs`. Visual Studio's new file puts the class
inside a `namespace`: a named group of classes. The statements in
`Program.cs` can't see a class in a namespace without a `using` line, so
`Program.cs` does not compile: `error CS0103: The name 'Game' does not
exist in the current context`. The simplest answer is to replace
everything in the new file with the class, as it is on the page.

Without Visual Studio, your notebook keeps a program of your own on this
device. Its cells follow the same rules as this page, they can wait for
typing, and each program cell can be downloaded as a project too. To
share a project, share its ZIP file, the way your class shares work.
Keep the ZIP file of every release. With a copy of each version, you can
see what changed.

## Three releases of a small game

Here is a small game, built the way a team would build it: in three
releases. A *release* is a version of a program that somebody could use
on the day it appears, however little it does. The game is *Codebreaker*:
the computer codes a word with a secret shift, and the player tries to
read it.

**Release 1: the smallest thing that is a game.** It has one round and
one word, written into the code. It asks once, and says whether the
answer is the word. It uses `Cipher` from `Cipher.cs` above (rule 2).

```csharp exec
id: three-releases-of-a-small-game-1
stdin: "KITE\n"
string word = "OTTER";
int shift = Random.Shared.Next(1, 26);
Console.WriteLine($"Decode this: {Cipher.Encode(word, shift)}");
Console.Write("Your answer: ");
string guess = Console.ReadLine();
if (guess == word)
{
    Console.WriteLine("Yes!");
}
else
{
    Console.WriteLine($"No: it was {word}");
}
```

`Random.Shared.Next(1, 26)` chooses the shift: a whole number from 1 up
to 26, but not 26 itself. So each Run shows a different code. Can you
read one? What happens if you type `otter`, in small letters?

Release 1 is almost too small to show anyone, on purpose. It proves that
the three pieces work together: the code that codes, the code that asks,
and the code that checks. Anything built later is built on something that
works.

**Release 2: the game, done properly.** It has a menu, several rounds, a
score, and answers checked with care. One round is now a method,
`PlayRound`, in a file of its own, `Game.cs`. So three people could build
it: one writes `Cipher.cs`, one `Game.cs`, and one `Program.cs`.

```csharp exec
id: three-releases-of-a-small-game-2
file: Game.cs
static class Game
{
    /// <summary>
    /// Plays one round with word, a word in capitals: prints the word in
    /// code, reads the player's answer, and says whether it was the word.
    /// Returns true if the player read it.
    /// </summary>
    public static bool PlayRound(string word)
    {
        int shift = Random.Shared.Next(1, 26);
        Console.WriteLine($"Decode this: {Cipher.Encode(word, shift)}");
        Console.Write("Your answer: ");
        string guess = Console.ReadLine();
        if (guess != null && guess.ToUpper() == word)
        {
            Console.WriteLine("Yes!");
            return true;
        }
        Console.WriteLine($"No: it was {word}");
        return false;
    }
}
```

```csharp exec
id: three-releases-of-a-small-game-2-program
stdin: "1\notter\n1\nBADGER\n2\n9\n"
string[] words = { "OTTER", "HERON", "BADGER" };
int rounds = 0;
int score = 0;
while (true)
{
    Console.Write("1: play   2: score   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        string word = words[rounds % words.Length];
        rounds = rounds + 1;
        if (Game.PlayRound(word))
        {
            score = score + 1;
        }
    }
    else if (choice == "2")
    {
        Console.WriteLine($"You have read {score} of {rounds}");
    }
    else
    {
        Console.WriteLine($"There is no choice {choice}");
    }
}
Console.WriteLine("Goodbye.");
```

A guess is compared in capitals now, so `otter` counts.
`guess != null && guess.ToUpper() == word` checks the answer with care.
`&&` checks its right side only when its left side is `true`, as on the
page *Decisions*. So when the input has ended, and `guess` is `null`,
`guess.ToUpper()` never runs, and there is no `NullReferenceException`.

`words[rounds % words.Length]` takes the words one after another, and
starts again at the first after the last. This uses the remainder again,
like the hours on a clock.

**Release 3: finished, tidied and tested.** Release 3 adds no feature
that a player would notice. It adds what makes Release 2 safe to give to
somebody else:

- an XML comment on every method, saying what it takes and what it
  returns (ours have them already, as every method has since *Reusable
  methods*);
- tests for the parts that can be tested with no typing, such as
  `Cipher.Encode`;
- a word chosen at random from a longer list, with
  `words[Random.Shared.Next(words.Length)]`;
- a change log, saying what each release changed.

The tests use `Check`, from *Reusable methods*, in a file of its own,
`Test.cs`. It does nothing when the value it expects and the value it
finds are equal. When they differ, it stops the program with an exception
that names both.

```csharp exec
id: three-releases-of-a-small-game-check
file: Test.cs
static class Test
{
    /// <summary>
    /// Does nothing if expected and found are equal. If not, stops the
    /// program with an exception that names the claim and both values.
    /// </summary>
    public static void Check<T>(string claim, T expected, T found)
    {
        if (!expected.Equals(found))
        {
            throw new Exception($"{claim}: expected {expected}, found {found}");
        }
    }
}
```

```csharp exec
id: three-releases-of-a-small-game-3
Test.Check("A, B and C move one place", "BCD", Cipher.Encode("ABC", 1));
Test.Check("one place after Z is A", "A", Cipher.Encode("Z", 1));
Test.Check("a space stays a space", "B C", Cipher.Encode("A B", 1));
Test.Check("5 places, then 21 more, is where it started", "OTTER", Cipher.Encode(Cipher.Encode("OTTER", 5), 21));
Test.Check("5 places, then 5 back, is where it started", "OTTER", Cipher.Encode(Cipher.Encode("OTTER", 5), -5));
Console.WriteLine("Every check held.");
```

Can you add a test of your own? What should `Encode` do with small
letters? What does its XML comment promise?

Each release was something a person could play on the day it appeared.

## Templates for a team

Copy these into a shared document, or into a file beside your code, and
complete them. Each is short on purpose.

**An interface agreement** is written before anybody writes code, for
each place where one person's code calls another person's method. It says
what the method is called, what it takes and what it returns, so two people
can build the two sides at the same time. In C#, the method's first line,
its *signature*, already says most of it:

```text
Method:       public static bool PlayRound(string word), in Game.cs
Written by:   ...
Called by:    Program.cs, written by ...
Takes:        word, a word in capitals
Returns:      true if the player read it, false if not
Prints:       the word in code, and whether the answer was the word
Reads:        one line, the player's answer
```

**A team charter** is a short agreement about how the team works. It is
agreed in the first meeting:

```text
Our project, in one sentence:
Who is building which file:
When we meet, and where we talk between meetings:
How we decide when we disagree:
What we do when somebody is stuck: say so on the same day.
```

**A review checklist** is a list of questions for reading each other's
code before a release:

- [ ] Can I tell what each method does from its name and its XML comment?
- [ ] What does it do with an empty array, a zero, a word where a number
  was expected, or `null` when the input ends?
- [ ] Have we written the same thing twice, in two places?
- [ ] Does it compile with no warning that we have not read?
- [ ] Does every check still hold?

**A change log** has one entry for each release: what was added, what was
changed, and any problem still known.

```text
Release 2, 14 November
- Added a menu, several rounds and a score.
- Guesses in small letters now count.
- Known problem: the same three words, in the same order.
```

## Looking back

What was the hardest part of this page to picture: a loop that ends only
when told to, a program in several files, or a program that runs outside
the page? What would you try, to make it clearer to yourself?

A challenge: can you build Release 1 of a game of your own, in any world
you like, on the same shape? It needs a loop, a way to quit, and an
answer checked with care.

```csharp challenge
// Release 1 of a game of your own: a loop, a way to quit,
// and an answer checked with care.
while (true)
{
    Console.Write("1: play   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    if (choice == "1")
    {
        // Your game's one round goes here.
    }
}
Console.WriteLine("Goodbye.");
```

The next page, *Code review*, is about reading code: your own program,
and somebody else's. After it, *The team project* builds a program like
Codebreaker, in a team, in Visual Studio.

The [practice page](lesson:from-cells-to-a-program-practice) has a menu
that does not end, an answer to check, one long cell to make into two
files, a change log to write, and three problems from earlier pages.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Top-level statements: programs without Main methods*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements>.
The official description of the statements in `Program.cs`, and of the
rule that only one file in a project can have them.

Microsoft. *Create a .NET console application*.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio>.
A step-by-step tutorial that makes a new Console App in Visual Studio,
runs it, and changes it to read a name that the person types. The page
covers three editors; choose **Visual Studio** at the top of the page.
It writes `var` in places where these pages write the type. The next
tutorial in the same series is about the debugger.

Microsoft. *Console.ReadLine method*.
<https://learn.microsoft.com/en-us/dotnet/api/system.console.readline>.
The official reference for `ReadLine`. It says when it gives `null`, and
which keys end the input in a console window. It is written for
programmers who know C# well, so read its first few paragraphs.
