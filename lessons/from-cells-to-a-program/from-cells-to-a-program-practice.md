---
title: "A whole program: practice"
version: 2026.09.28.1
practice_for: from-cells-to-a-program
---

# A whole program: practice

Problems on menus, answers checked with care, programs in files, and
change logs. Try each one before you open anything under it. Several
programs wait for you to type: type your answers under the cell, as on
[the lesson](lesson:from-cells-to-a-program), and press **End input** if
a program keeps asking. Two cells are meant not to compile, and their
problems say so. There are three problems from earlier pages at the end.

## 1. A menu that does not end

This menu uses a `switch`. The comment at the top says what it should do.
Run it, and type 1, then 9, then 2.

```csharp exec
id: a-menu-that-does-not-end-1
stdin: "1\n9\n2\n"
// 9 should end the program.
while (true)
{
    Console.Write("1: shout   2: whisper   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        break;
    }
    switch (choice)
    {
        case "1":
            Console.WriteLine("MEET ME!");
            break;
        case "2":
            Console.WriteLine("meet me...");
            break;
        case "9":
            Console.WriteLine("Goodbye.");
            break;
        default:
            Console.WriteLine($"There is no choice {choice}");
            break;
    }
}
```

```predict
type: choice

After you type 9, what does the program do?

- It prints Goodbye. and ends
  - `case "9":` ends with `break`.
- It prints Goodbye. and shows the menu again
  - The `break` is inside the `switch`.
- It does not compile
  - A `switch` inside a `while (true)` loop is not allowed.
```

<details class="dl-answer"><summary>why</summary>

It prints `Goodbye.`, and then it shows the menu again, and waits. The
`2` after it prints `meet me...`. In a `switch`, `break` leaves the
`switch`, and the loop around it continues. Only `choice == null`, when
the input ends, ends this loop.

</details>

Can you change it so that 9 ends the program, and keep the `switch`?

```hint
after: 2 runs
What could tell the loop to stop, from inside the `switch`? A `bool` made
before the loop, such as `bool running = true;`, can be the loop's
condition: `while (running)`.
```

```solution
// 9 ends the program.
bool running = true;
while (running)
{
    Console.Write("1: shout   2: whisper   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        break;
    }
    switch (choice)
    {
        case "1":
            Console.WriteLine("MEET ME!");
            break;
        case "2":
            Console.WriteLine("meet me...");
            break;
        case "9":
            Console.WriteLine("Goodbye.");
            running = false;
            break;
        default:
            Console.WriteLine($"There is no choice {choice}");
            break;
    }
}
---
`running = false;` doesn't stop the loop at once. The `switch` finishes,
the loop's body finishes, and then `while (running)` is `false`, so the
loop ends. The `2` typed after the 9 is never read. A `do`...`while` loop
with `while (choice != "9")`, as on [Reading input](lesson:reading-input), works too.
```

## 2. A word for the game

Codebreaker needs words that a player can read. Can you write
`IsGameWord(string text)`? It returns `true` when `text` has 3 to 8
letters, and every one is a capital letter from A to Z. The cell tests it
with an array of words, and no typing.

```csharp exec
id: a-word-for-the-game-1
/// <summary>
/// Returns true if text is a word for Codebreaker: 3 to 8 letters, each
/// a capital from A to Z.
/// </summary>
static bool IsGameWord(string text)
{
    return false;
}

string[] tries = { "OTTER", "otter", "OX", "HERON!", "KINGFISHER" };
foreach (string word in tries)
{
    Console.WriteLine($"{word}: {IsGameWord(word)}");
}
```

```inputs
IsGameWord("OTTER")
IsGameWord("otter")
IsGameWord("OX")
IsGameWord("KINGFISHER")     // 10 letters
IsGameWord("HERON!")
IsGameWord("")
IsGameWord(null)             // what ReadLine gives when the input ends
```

```hint
after: 1 runs
What should the method check first, before it looks at any letter? What
would `text.Length` do if `text` were `null`?
```

```solution
/// <summary>
/// Returns true if text is a word for Codebreaker: 3 to 8 letters, each
/// a capital from A to Z.
/// </summary>
static bool IsGameWord(string text)
{
    if (text == null || text.Length < 3 || text.Length > 8)
    {
        return false;
    }
    foreach (char character in text)
    {
        if (character < 'A' || character > 'Z')
        {
            return false;
        }
    }
    return true;
}

string[] tries = { "OTTER", "otter", "OX", "HERON!", "KINGFISHER" };
foreach (string word in tries)
{
    Console.WriteLine($"{word}: {IsGameWord(word)}");
}
---
`text == null` comes first. `||` checks its right side only when its left
side is `false`: short-circuiting, as with `&&` on the lesson. So when
`text` is `null`, `text.Length` never runs, and there is no
`NullReferenceException`. The loop returns `false` at the first character
that is not a capital. Only a word that passes every character reaches
`return true`.

The cell prints `True` and `False` with a capital letter, because C#
prints a `bool` that way, as on [Decisions](lesson:making-decisions). The
table writes `true` and `false`, as the code does.
```

## 3. One long cell, two files

This cell draws with characters. It runs as it is. Try it.

```csharp exec
id: one-long-cell-two-files-1
/// <summary>Returns a row of width bricks.</summary>
static string Row(int width, char brick)
{
    return new string(brick, width);
}

/// <summary>Returns a box of # characters, width wide and height high, filled with dots.</summary>
static string Box(int width, int height)
{
    string box = Row(width, '#');
    for (int i = 0; i < height - 2; i++)
    {
        box = box + "\n#" + Row(width - 2, '.') + "#";
    }
    return box + "\n" + Row(width, '#');
}

Console.WriteLine(Row(5, '*'));
Console.WriteLine(Box(5, 3));
```

A teammate wants to use `Row` and `Box` in a program of their own. Can
you move them into a `static class Picture`, in the types cell below?
Then the program cell under it can call them, as `Picture.Row` and
`Picture.Box`. The program cell is meant not to compile until `Picture`
has both methods. Its message says what is missing: `'Picture' does not
contain a definition for 'Row'`.

```csharp exec
id: one-long-cell-two-files-2
file: Picture.cs
static class Picture
{
    // Row and Box go here.
}
```

```csharp exec
id: one-long-cell-two-files-2-program
expect: CS0117
Console.WriteLine(Picture.Row(5, '*'));
Console.WriteLine(Picture.Box(5, 3));
```

```inputs
Picture.Row(3, '#')
Picture.Box(4, 4)
```

```hint
after: 2 errors
What does each method need in front of it, so that code outside the class
can call it? Look at `Cipher.Encode` on the lesson.
```

```solution
Console.WriteLine(Picture.Row(5, '*'));
Console.WriteLine(Picture.Box(5, 3));

static class Picture
{
    /// <summary>Returns a row of width bricks.</summary>
    public static string Row(int width, char brick)
    {
        return new string(brick, width);
    }

    /// <summary>Returns a box of # characters, width wide and height high, filled with dots.</summary>
    public static string Box(int width, int height)
    {
        string box = Row(width, '#');
        for (int i = 0; i < height - 2; i++)
        {
            box = box + "\n#" + Row(width - 2, '.') + "#";
        }
        return box + "\n" + Row(width, '#');
    }
}
---
The solution writes `Picture` again, below its statements (rule 4), and
C# uses this one in place of yours. Each method gains `public static`.
Inside the class, `Box` still calls `Row` by its name alone, because both
are in the same class. The program cell is now two lines, and a teammate
can use `Picture` from any cell below it, or from a file of their own in
Visual Studio.
```

## 4. A change log to write

Here are two releases of a small quiz. Run each one. The first answer
typed into each is ` 56`, with a space before it, as a person might type
by mistake.

```csharp exec
id: a-change-log-to-write-1
stdin: " 56\n"
// Quiz, release 1
Console.Write("What is 7 times 8? ");
string answer = Console.ReadLine();
if (answer == "56")
{
    Console.WriteLine("Yes!");
}
else
{
    Console.WriteLine("No: it is 56");
}
```

```csharp exec
id: a-change-log-to-write-2
stdin: " 56\n42\n30\n"
// Quiz, release 2
int[] firsts = { 7, 6, 9 };
int[] seconds = { 8, 7, 4 };
int score = 0;
for (int i = 0; i < firsts.Length; i++)
{
    int product = firsts[i] * seconds[i];
    Console.Write($"What is {firsts[i]} times {seconds[i]}? ");
    string answer = Console.ReadLine();
    if (int.TryParse(answer, out int number) && number == product)
    {
        Console.WriteLine("Yes!");
        score = score + 1;
    }
    else
    {
        Console.WriteLine($"No: it is {product}");
    }
}
Console.WriteLine($"You scored {score} of {firsts.Length}");
```

Can you write the change log entry for release 2? What was added, what
was changed, and what problem is still known? You could write it as
comments in a cell, or on paper.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```text
Release 2, 21 November
- Three questions in place of one, and a score at the end.
- An answer with a space before or after it now counts: " 56" is 56.
- Known problem: the same three questions, in the same order, every time.
```

Release 1 compares the text itself, so ` 56` is not `"56"`, and it
prints `No: it is 56`. Release 2 reads the answer with `int.TryParse`,
which ignores spaces before and after the digits, so ` 56` counts. The
quiz with 42 and 30 prints `You scored 2 of 3`.

A change log is for the people who use the program, and for the team. A
line such as "changed the if" says what changed in the code. A line such
as "an answer with a space now counts" says what changed for the person
who plays.

</details>

## 5. From earlier: a remainder below zero

This problem comes from [Dividing](lesson:dividing-in-csharp). This cell
moves the letter A three places back. What do you think the first line
prints?

```csharp exec
id: a-remainder-below-zero-1
char letter = 'A';
int shift = -3;
int position = letter - 'A';
Console.WriteLine((char)('A' + (position + shift) % 26));
Console.WriteLine((char)('A' + ((position + shift) % 26 + 26) % 26));
Console.WriteLine((position + shift) % 26);
```

```predict
type: choice

What will the first line print?

- X
  - Three places back from A, starting again at Z, is X.
- A character that is not a letter
  - What is `-3 % 26` in C#?
- Nothing: it stops with an exception
  - There is no letter before A.
```

<details class="dl-answer"><summary>why</summary>

The first line prints `>`, and the second prints `X`. The third line
shows why: in C#, `-3 % 26` is -3. The remainder has the sign of the
number before the `%`. Three places before `A` is `>`, which is not a
letter at all. Adding 26 and taking the remainder again moves it into the
range 0 to 25. That is why `Cipher.Encode` on the lesson has
`((position + shift) % 26 + 26) % 26`, and why its test with -5 holds.

</details>

## 6. From earlier: the words in turn

Codebreaker's Release 2 chose each round's word with
`words[rounds % words.Length]`. Which word does round 7 use?

```csharp exec
id: the-words-in-turn-1
string[] words = { "OTTER", "HERON", "BADGER" };
for (int rounds = 0; rounds < 7; rounds++)
{
    int position = rounds % words.Length;
    Console.WriteLine($"Round {rounds + 1}: rounds is {rounds}, position {position}, {words[position]}");
}
```

<details class="dl-answer"><summary>why</summary>

Round 7 uses `OTTER`, at position 0. `rounds` counts from 0, so in round
7, `rounds` is 6. There are three words, and `6 % 3` is 0: the first
word. The positions go 0, 1, 2, 0, 1, 2, 0, so the words start again
after every third round. Can you add a fourth word, and see what changes?

</details>

## 7. From earlier: a method that returns nothing

This problem comes from [Methods](lesson:writing-your-own-functions). A
teammate wrote `ShowScore`. Another teammate calls it. This cell is
meant not to compile. Can you say why, before you run it?

```csharp exec
id: a-method-that-returns-nothing-1
expect: CS0029
static void ShowScore(int score, int rounds)
{
    Console.WriteLine($"You have read {score} of {rounds}");
}

bool finished = ShowScore(1, 2);
Console.WriteLine(finished);
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0029: Cannot implicitly convert type 'void'
to 'bool'`. `ShowScore` is `void`: it prints, and returns nothing, so
there is no value to store in `finished`. An interface agreement would
have shown this before either teammate wrote a line. Its `Returns:` line
for `ShowScore` says "nothing", and its `Prints:` line says "the score".
Delete `bool finished =` and the last line, and the cell runs.

</details>
