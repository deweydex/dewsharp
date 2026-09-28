---
title: "Debugging: practice"
version: 2026.09.28.1
from: when-it-goes-wrong-practice
practice_for: when-it-goes-wrong
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Debugging: practice

Here your guess is the exercise. Before you run a cell, can you say which
of the three things will happen? It does not compile, it stops with an
exception (and which one), or it runs (and with what answer). Then run it,
and see why. Many cells on this page are meant to fail, so a message is
not a sign that anything is broken. There are three problems from earlier
pages at the end.

## 1. Which error

```csharp exec
id: which-error-1
expect: exception
string word = "OTTER";
Console.WriteLine(word[5]);
```

```predict
type: choice

What will happen when you press Run?

- It prints R
  - The fifth letter of OTTER is R.
- It stops with an IndexOutOfRangeException
  - The positions of a string start at 0.
- It does not compile
  - The compiler can count the letters in "OTTER".
```

<details class="dl-answer"><summary>why</summary>

It stops with an `IndexOutOfRangeException`: *Index was outside the bounds
of the array.* A string is indexed like an array, and it stops like one.
Its positions start at 0, so the last position is one less than its
length, and `word[5]` asks for the position after the last letter of
OTTER. The compiler does not compare a position with the length of a
string, even a string written in the program. A position is a value, and
the compiler checks types.

</details>

## 2. A count that starts from nothing

This is meant to count one E, in a dictionary that starts empty. What do
you think it prints?

```csharp exec
id: a-count-that-starts-from-nothing-1
expect: exception
Dictionary<char, int> counts = new();
counts['E'] = counts['E'] + 1;
Console.WriteLine(counts['E']);
```

<details class="dl-answer"><summary>why</summary>

It stops with a `KeyNotFoundException`: *The given key 'E' was not present
in the dictionary.* C# calculates the value after the `=` first, and that
asks for a key that is not there yet. `counts.GetValueOrDefault('E', 0) + 1`
gives a missing key the value 0 first, as on
[Dictionaries](lesson:looking-things-up-by-name).

</details>

## 3. A list that was never made

This is meant to start a list of names, and add one. It is meant to fail.
Does it compile?

```csharp exec
id: a-list-that-was-never-made-1
expect: CS0165
List<string> names;
names.Add("Ada");
Console.WriteLine(names.Count);
```

<details class="dl-answer"><summary>answer</summary>

It does not compile: `error CS0165: Use of unassigned local variable
'names'`. `List<string> names;` makes a variable that can hold a list, and
gives it no list. The compiler can see that no line gives `names` a value
before `names.Add`, so nothing runs. `List<string> names = new();` makes
the list, and the program runs.

In the lesson, an array of strings stopped with a `NullReferenceException`
instead. The compiler can follow a variable from line to line. It cannot
see which places of an array have been filled.

</details>

## 4. Two things to find

Here is a palette, which gives a colour's name for each character of a row
of pixels, in a class of its own.

```csharp exec
id: two-things-to-find-1
file: Palette.cs
static class Palette
{
    public static string ColourOf(char character, Dictionary<char, string> palette)
    {
        return palette[character];
    }

    public static List<string> RowColours(string row, Dictionary<char, string> palette)
    {
        List<string> colours = new();
        foreach (char character in row)
        {
            colours.Add(ColourOf(character, palette));
        }
        return colours;
    }
}
```

This program is meant to stop with an exception. Run it, and read the
report. Which line failed, and which line is responsible?

```csharp exec
id: two-things-to-find-1-program
expect: exception
Dictionary<char, string> palette = new() { ['#'] = "black", ['.'] = "white" };
Console.WriteLine(string.Join(", ", Palette.RowColours("#.#", palette)));
Console.WriteLine(string.Join(", ", Palette.RowColours("#x#", palette)));
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The first row prints `black, white, black`. Then line 5 of `Palette.cs`,
`return palette[character];`, fails with a `KeyNotFoundException`: *The
given key 'x' was not present in the dictionary.* The line responsible is
line 3 of `Program.cs`, whose row has an `x` that the palette does not
know. Or the palette is responsible, for not knowing it. Which one to
change depends on whether the `x` was meant to be there.

</details>

## 5. The whole chain

Why does an exception report show the whole chain of calls, and not only
the line that failed?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The line that failed often does exactly what it should, and the cause is
somewhere else in the program. A value is made in one place and used in
another. The chain shows how the value travelled, call by call, so you can
follow it to the place where it was made.

</details>

## 6. The same name twice

This is meant to print each row's number, and its row of four `#`.

```csharp exec
id: the-same-name-twice-1
expect: CS0136
for (int i = 0; i < 3; i++)
{
    string line = "";
    for (int i = 0; i < 4; i++)
    {
        line = line + "#";
    }
    Console.WriteLine($"{i} {line}");
}
```

```predict
type: choice

What will happen when you press Run?

- It prints 0 ####, then 1 ####, then 2 ####
  - Each loop has its own `i`.
- It prints the same number on every line
  - The inner loop changes `i`, and the outer loop uses the same `i`.
- It does not compile
  - Two variables called `i`, one inside the other, would be confusing.
```

```solution
for (int row = 0; row < 3; row++)
{
    string line = "";
    for (int column = 0; column < 4; column++)
    {
        line = line + "#";
    }
    Console.WriteLine($"{row} {line}");
}
---
Each loop has a name of its own, so the inner loop cannot change the
outer loop's variable.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0136: A local or parameter named 'i' cannot
be declared in this scope because that name is used in an enclosing local
scope to define a local or parameter`. The inner loop makes a second `i`,
inside the braces of the first, and C# does not allow that: inside the
inner loop, nobody could tell which `i` a line meant. If you know Python:
there, the same program runs, the inner loop changes the outer loop's
variable, and every line shows the same number.

Give each loop its own name, as the solution under the cell does: `row`
and `column`, say. Then it prints `0 ####`, `1 ####` and `2 ####`.

</details>

## 7. Which thing is the loop counting?

Each task below has a test cell under its class, and the tests use the
lesson's `Check` method. A class does not carry from one page to another,
so here it is again. The cells below this one can use it (rule 2).

```csharp exec
id: counting-in-the-wrong-thing-check
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

<div class="dl-world" data-world="secret-messages">

This is meant to count the Es in a word. It runs, and it gives 0 for every
word, so the test cell under it is meant to stop with an exception until
the method is fixed. Can you find the bug, and fix it? Then, can you add a
test of your own that does not hold for the first version?

```csharp exec
id: counting-in-the-wrong-thing-1--secret-messages
file: Letters.cs
static class Letters
{
    /// <summary>Returns how many times E appears in the word.</summary>
    public static int CountE(string word)
    {
        int count = 0;
        for (int letter = 0; letter < word.Length; letter++)
        {
            if (letter == 'E')
            {
                count = count + 1;
            }
        }
        return count;
    }
}
```

```csharp exec
id: counting-in-the-wrong-thing-1-tests--secret-messages
expect: exception
Test.Check("CountE of EYE", 2, Letters.CountE("EYE"));
// Your test:

Console.WriteLine("Every check held.");
```

```inputs
Letters.CountE("TREE")
Letters.CountE("SKY")
Letters.CountE("")
```

```hint
after: 1 runs
Can you add `Console.WriteLine($"letter: {letter}");` inside the loop? What
is `letter`, each time the loop repeats?
```

```solution
Test.Check("CountE of EYE", 2, Letters.CountE("EYE"));
Test.Check("CountE of TREE", 2, Letters.CountE("TREE"));
Console.WriteLine("Every check held.");

static class Letters
{
    /// <summary>Returns how many times E appears in the word.</summary>
    public static int CountE(string word)
    {
        int count = 0;
        foreach (char letter in word)
        {
            if (letter == 'E')
            {
                count = count + 1;
            }
        }
        return count;
    }
}
---
`letter` counted the positions, so it was an `int`, not a letter. C#
compared each position with `'E'`, which is a number underneath, and no
position was equal to it, so the count stayed at 0. The compiler saw
nothing to object to, because comparing two numbers is allowed. A word
with no E gives 0 either way, as the `"SKY"` row of the table shows, so a
check on it holds for both versions. The solution writes `Letters` again
below its tests, and C# uses this one in place of yours (rule 4).
```

</div>

<div class="dl-world" data-world="pixel-art">

This is meant to return one column of a picture, from the top row down. It
gives an answer you would expect for some pictures. The test cell under it
is meant to stop with an exception until the method is fixed. Can you find
the bug, and fix it? Then, can you add a test of your own that does not
hold for the first version?

```csharp exec
id: counting-in-the-wrong-thing-1--pixel-art
file: Columns.cs
static class Columns
{
    /// <summary>Returns column c of the picture, from the top row down.</summary>
    public static List<int> Column(int[][] picture, int c)
    {
        List<int> values = new();
        for (int row = 0; row < picture.Length; row++)
        {
            values.Add(picture[c][row]);
        }
        return values;
    }
}
```

```csharp exec
id: counting-in-the-wrong-thing-1-tests--pixel-art
expect: exception
int[][] square = { new int[] { 1, 2 }, new int[] { 3, 4 } };
Test.Check("column 0 of the square", "1, 3", string.Join(", ", Columns.Column(square, 0)));
// Your test:

Console.WriteLine("Every check held.");
```

```inputs
Columns.Column(new int[][] { new int[] { 1, 2 }, new int[] { 3, 4 } }, 0)
Columns.Column(new int[][] { new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 } }, 0)
Columns.Column(new int[][] { new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 } }, 2)
```

```hint
after: 1 runs
A picture is `picture[row][column]`: the row first. Which index is the row
here, and which is the column?
```

```solution
int[][] square = { new int[] { 1, 2 }, new int[] { 3, 4 } };
Test.Check("column 0 of the square", "1, 3", string.Join(", ", Columns.Column(square, 0)));
int[][] wide = { new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 } };
Test.Check("column 2 of a wide picture", "3, 6", string.Join(", ", Columns.Column(wide, 2)));
Console.WriteLine("Every check held.");

static class Columns
{
    /// <summary>Returns column c of the picture, from the top row down.</summary>
    public static List<int> Column(int[][] picture, int c)
    {
        List<int> values = new();
        for (int row = 0; row < picture.Length; row++)
        {
            values.Add(picture[row][c]);
        }
        return values;
    }
}
---
The two indexes were swapped, so the method returned part of row `c`. On
a square picture, that is still a list of the length you expect, with
values nobody meant, and no message. On a picture wider than it is tall,
it can stop with an `IndexOutOfRangeException`, as the last row of the
table shows for the first version. That is lucky: at least it says there
is a problem. The solution writes `Columns` again below its tests, and C#
uses this one in place of yours (rule 4).
```

</div>

## 8. What the loop sees

This is meant to count the words longer than four letters. It counts the
letters in each word, and checks the count at each space. It prints 1,
and there are two such words: BRIDGE and TONIGHT. Can you add a
`Console.WriteLine` with a label inside the loop, and find where the count
stops matching what you expect?

```csharp exec
id: where-it-stops-being-right-1
static int LongWords(string sentence)
{
    int count = 0;
    int letters = 0;
    foreach (char character in sentence)
    {
        if (character == ' ')
        {
            if (letters > 4)
            {
                count = count + 1;
            }
            letters = 0;
        }
        else
        {
            letters = letters + 1;
        }
    }
    return count;
}

Console.WriteLine(LongWords("MEET ME BY THE BRIDGE TONIGHT"));
```

```inputs
LongWords("MEET ME BY THE BRIDGE TONIGHT")
LongWords("TONIGHT")          // one word, and no space
LongWords("")
```

```hint
after: 1 runs
Where does a word end, for this method? Can you print `letters` each time
the method decides that a word has ended?
```

```solution
static int LongWords(string sentence)
{
    int count = 0;
    foreach (string word in sentence.Split(' '))
    {
        if (word.Length > 4)
        {
            count = count + 1;
        }
    }
    return count;
}

Console.WriteLine(LongWords("MEET ME BY THE BRIDGE TONIGHT"));
---
A labelled line in the `if` that finds a space,
`Console.WriteLine($"a word of {letters} letters");`, prints one line for
each word but the last. TONIGHT has no space after it, so the method never
decides that it has ended, and never checks it. The `"TONIGHT"` row of the
table shows the same thing on its own. `Split(' ')` makes the words, the
last one too. Another fix keeps the loop, and checks `letters` once more
after it.
```

## 9. Test the pieces

This is meant to decode a message by moving each letter back. It prints
nonsense. Can you test each piece on its own, with a letter whose answer
you know, and find the one with the bug?

The three comment lines at the top are a *log*: what you guessed the cause
was, what you did to test the guess, and what happened. With a log, you
never test the same idea twice, and somebody else can see what you have
already tried. Can you fill it in as you go?

```csharp exec
id: test-the-pieces-1
// Guess:
// Test:
// What happened:

static char ShiftBack(char letter, int shift)
{
    return (char)((letter - 'A' + shift) % 26 + 'A');
}

static string Decode(string message, int shift)
{
    string plain = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            plain = plain + ShiftBack(character, shift);
        }
        else
        {
            plain = plain + character;
        }
    }
    return plain;
}

Console.WriteLine(Decode("PHHW PH", 3));
```

```inputs
ShiftBack('D', 3)       // three letters back from D is A
ShiftBack('A', 3)       // three letters back from A is X
Decode("PHHW PH", 3)
-3 % 26                 // C#'s remainder of a number below zero
```

```hint
after: 1 runs
Can you add `Console.WriteLine(ShiftBack('D', 3));` above the last line?
What should it print?
```

```solution
static char ShiftBack(char letter, int shift)
{
    return (char)(((letter - 'A' - shift) % 26 + 26) % 26 + 'A');
}

static string Decode(string message, int shift)
{
    string plain = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            plain = plain + ShiftBack(character, shift);
        }
        else
        {
            plain = plain + character;
        }
    }
    return plain;
}

Console.WriteLine(Decode("PHHW PH", 3));
---
`ShiftBack('D', 3)` should give A, three letters back, and it gives G:
`+ shift` moves forward. With `- shift`, it gives A, and the message
decodes to MEET ME. `Decode` had no bug from the start. A test of `Decode`
would have shown a problem too, but a test of the smallest piece says
exactly which line.

One more C# detail. With `- shift` alone, `ShiftBack('A', 3)` would give
a character that is not a letter, because C#'s `%` keeps the sign of the
number before it, as on [Dividing](lesson:dividing-in-csharp): the last
row of the table shows that `-3 % 26` is -3. Adding 26 before the last
`% 26` keeps the position between 0 and 25, so three letters back from A
is X.
```

## 10. Explain it to a duck

Some programmers keep a rubber duck on their desk. When they cannot find a
bug, they explain their code to the duck, line by line, out loud. Why
would that help?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

When you explain a line, you have to say what it does, not what you meant
it to do. The bug is in the gap between the two. Halfway through an
explanation, people often stop and say "oh". The duck does nothing, and
that helps. It does not interrupt, and it does not already know what the
code is meant to do. A classmate who lets you finish works as well.

</details>

## 11. From earlier: throw on purpose

From [Reusable methods](lesson:building-reusable-tools). What will each
of the last three lines do?

```csharp exec
id: from-earlier-throw-on-purpose-1
expect: exception
static int Half(int n)
{
    if (n % 2 == 1)
    {
        throw new ArgumentException("Half needs an even number");
    }
    return n / 2;
}

Console.WriteLine(Half(8));
Console.WriteLine(Half(-7));
Console.WriteLine(Half(7));
```

<details class="dl-answer"><summary>why</summary>

It prints 4 for 8. For -7 it prints -3, with no exception. For 7 it stops
with `System.ArgumentException: Half needs an even number`. The exception
is the method's own, with its own message, at the place the problem was
found. Without the `throw`, `Half(7)` would return a whole number, and
nothing would say that the half was lost.

Why does -7 not stop the program? In C#, the remainder of a number below
zero is below zero too, as on [Dividing](lesson:dividing-in-csharp), so
`-7 % 2` is not 1, and the check does not stop it. `n % 2 != 0` stops
both.

</details>

## 12. From earlier: nearly in order

From [Sorting](lesson:putting-things-in-order). An array is already
sorted, except for its last element. Which of the three sorts does least
work on it?

<details class="dl-answer"><summary>answer</summary>

Insertion sort does least work. Every element but the last is already in
place, so each one costs one comparison, and only the last is moved back
to where it belongs. Selection sort still searches the whole unsorted part
every time, and bubble sort, with no way to know that the array is
sorted, still makes every comparison.

</details>

## 13. From earlier: a number and a letter

From [Variables and types](lesson:storing-and-computing) and
[Arrays and lists](lesson:lists-and-sequences).

```csharp exec
id: from-earlier-a-number-and-a-letter-1
string word = "AB";
for (int index = 0; index < word.Length; index++)
{
    Console.WriteLine(index + word[index]);
}
```

```predict
type: choice

What will it print?

- 0A, then 1B
  - `+` joins the position and the letter.
- 65, then 67
  - A `char` is a number underneath.
- Nothing: it does not compile
  - An `int` and a `char` are different types.
```

<details class="dl-answer"><summary>why</summary>

It prints 65, then 67. `word[index]` is a `char`, and a `char` is a number
underneath. `+` between an `int` and a `char` adds the two numbers: the
first line is 0 plus the number for A, and the second is 1 plus the number
for B. `+` joins only when one side is a `string`. Can you change the line
to `Console.WriteLine($"{index}{word[index]}");`, and run it again? If
you know Python: there, the same idea stops with a `TypeError`.

</details>
