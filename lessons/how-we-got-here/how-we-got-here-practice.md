---
title: "Programming languages: practice"
version: 2026.09.27.1
from: how-we-got-here-practice
practice_for: how-we-got-here
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Programming languages: practice

Problems on binary, hexadecimal and ASCII, on the history and the
paradigms, and three from earlier pages. Try each conversion by hand
before you run its cell, because the cell prints the answers. The aim is
that you can read the notation yourself, without C# reading it for you.

## Tools

The lesson's tools for binary, hex and characters are part of C#, so any
cell can use them. Here is what each one does with 72.

```csharp exec
id: tools-1
Console.WriteLine(Convert.ToString(72, 2));
Console.WriteLine(Convert.ToInt32("01001000", 2));
Console.WriteLine(Convert.ToString(72, 16));
Console.WriteLine(Convert.ToInt32("48", 16));
Console.WriteLine((char)72);
```

`Convert.ToString(number, 2)` writes a number in binary, and
`Convert.ToString(number, 16)` writes it in hex. `Convert.ToInt32(text, 2)`
and `Convert.ToInt32(text, 16)` read the text back as a number. `(char)`
gives the character with that code. A method of your own, such as
`FromBinary`, is different: each Run starts a new program, so it must be in
the cell that calls it.

## 1. Binary to base 10

Change these binary numbers to base 10 by hand: `1101`, `10000`, `11111`,
`10101010`. Then run the cell to check. It also prints two more, for the
answer below.

```csharp exec
id: binary-to-base-10-1
Console.WriteLine(Convert.ToInt32("1101", 2));
Console.WriteLine(Convert.ToInt32("10000", 2));
Console.WriteLine(Convert.ToInt32("11111", 2));
Console.WriteLine(Convert.ToInt32("10101010", 2));

Console.WriteLine(Convert.ToInt32("11111111", 2));
Console.WriteLine(Convert.ToInt32("100000000", 2));
```

<details class="dl-answer"><summary>answer</summary>

They are 13, 16, 31 and 170. `11111` is 31, not 32. A row of ones is
always one less than the next power of two: eight ones, `11111111`, are
255, and a one with eight zeros is 256. That is why a byte holds 0 to 255,
and not 0 to 256.

</details>

## 2. Base 10 to binary

Change these to binary by hand: 6, 12, 100, 255. Then run the cell to
check.

```csharp exec
id: base-10-to-binary-1
Console.WriteLine(Convert.ToString(6, 2));
Console.WriteLine(Convert.ToString(12, 2));
Console.WriteLine(Convert.ToString(100, 2));
Console.WriteLine(Convert.ToString(255, 2));
```

<details class="dl-answer"><summary>answer</summary>

They are 110, 1100, 1100100 and 11111111. 12 is 6 moved one place to the
left. When you double a number in binary, you add a 0 at the end, the way
you do when you multiply by ten in base 10.

</details>

## 3. Base 10 to hex

Change these to hexadecimal by hand: 15, 16, 255, 256, 4095. Then run the
cell to check. `ToUpper()` writes the hex letters as capitals.

```csharp exec
id: base-10-to-hex-1
Console.WriteLine(Convert.ToString(15, 16).ToUpper());
Console.WriteLine(Convert.ToString(16, 16).ToUpper());
Console.WriteLine(Convert.ToString(255, 16).ToUpper());
Console.WriteLine(Convert.ToString(256, 16).ToUpper());
Console.WriteLine(Convert.ToString(4095, 16).ToUpper());
```

<details class="dl-answer"><summary>answer</summary>

They are F, 10, FF, 100 and FFF. Each hex digit is four binary digits, so
FF is eight binary digits, one byte, and FFF is twelve.

</details>

## 4. Hex to binary, straight

Change `FF`, `A0` and `7E` from hex to binary by hand, without using base
10. The cell goes through a number on its way, but you do not need to.

```csharp exec
id: hex-to-binary-straight-1
Console.WriteLine(Convert.ToString(Convert.ToInt32("FF", 16), 2).PadLeft(8, '0'));
Console.WriteLine(Convert.ToString(Convert.ToInt32("A0", 16), 2).PadLeft(8, '0'));
Console.WriteLine(Convert.ToString(Convert.ToInt32("7E", 16), 2).PadLeft(8, '0'));
```

<details class="dl-answer"><summary>answer</summary>

They are `11111111`, `10100000` and `01111110`. Each hex digit becomes four
binary digits on its own: F is 1111, A is 1010, 0 is 0000, 7 is 0111 and E
is 1110. No base 10 is needed. That is the main reason hex exists.

</details>

## 5. Two letters

Decode `01001000 01001001` as ASCII, by hand. Then run the cell to check.

```csharp exec
id: two-letters-1
int first = Convert.ToInt32("01001000", 2);
int second = Convert.ToInt32("01001001", 2);
Console.WriteLine($"{first} {second}");
Console.WriteLine($"{(char)first}{(char)second}");
```

<details class="dl-answer"><summary>answer</summary>

The codes are 72 and 73, which are H and I. The message is `HI`.

</details>

## 6. A colour

The web colour `#FF7F50` is two hex digits each for red, green and blue.
What are the three in base 10? Try it by hand, then run the cell.

```csharp exec
id: a-colour-1
string colour = "#FF7F50";
Console.WriteLine(Convert.ToInt32(colour[1..3], 16));
Console.WriteLine(Convert.ToInt32(colour[3..5], 16));
Console.WriteLine(Convert.ToInt32(colour[5..7], 16));
```

<details class="dl-answer"><summary>answer</summary>

They are 255, 127 and 80. This colour is called coral.

</details>

## 7. Reading hex without Convert

This `ReadHex` reads a hex string such as `"2A"` without `Convert`. For now
it returns only the value of the last digit. `digits.IndexOf(character)`
gives the position of a character in the string `digits`, and the position
is the digit's value. Can you make it read the whole number?

```csharp exec
id: reading-hex-without-convert-1
static int ReadHex(string text)
{
    string digits = "0123456789ABCDEF";
    int total = 0;
    foreach (char character in text)
    {
        total = digits.IndexOf(character);
    }
    return total;
}

Console.WriteLine(ReadHex("2A"));
```

```inputs
ReadHex("2A")
ReadHex("FF")
ReadHex("100")
```

```hint
after: 1 runs
`FromBinary` in the lesson read binary one digit at a time. What did it do
to the total before it added each new digit?
```

```hint
after: 2 runs
It is `FromBinary` with 16 in place of 2. At each digit, multiply the total
so far by 16, and add the digit's value.
```

```solution
static int ReadHex(string text)
{
    string digits = "0123456789ABCDEF";
    int total = 0;
    foreach (char character in text)
    {
        total = total * 16 + digits.IndexOf(character);
    }
    return total;
}

Console.WriteLine(ReadHex("2A"));
---
`total * 16 + digit` is how to read a number in any base: move everything
up one place, then add the new digit. Change the 16 and the digits, and the
same method reads base 7.
```

## 8. Why binary

Why do computers use binary, and not base 10?

<details class="dl-answer"><summary>answer</summary>

The hardware has two states. A transistor is on or off, high voltage or
low, and base 2 matches that exactly. A circuit that had to tell ten
voltage levels apart would be harder to build and easier to fool. Base 10
is about people's fingers, not about machines.

</details>

## 9. Why hex

Why does hexadecimal exist, when computers do not use it?

<details class="dl-answer"><summary>answer</summary>

Hex exists for people. One hex digit is exactly four binary digits, so a
byte is two hex digits, and a long binary pattern becomes short enough to
read and copy without losing count. It is binary, written shorter.

</details>

## 10. Lovelace

What did Ada Lovelace do, and why does it matter that the machine was never
built?

<details class="dl-answer"><summary>answer</summary>

She wrote a step-by-step method for the Analytical Engine to calculate a
sequence of numbers, with loops and conditional branching, in notes to a
translation that became longer than the paper. The machine was never built,
and that matters. A program does not need a working machine to exist. It
is a list of exact instructions, whether or not anything can follow them
yet.

</details>

## 11. In order

Put these in order, and say what each one made easier: high-level
languages, machine code, assembly language.

<details class="dl-answer"><summary>answer</summary>

1. Machine code, in the 1940s: binary the hardware runs directly.
2. Assembly, in the 1950s: short names like `ADD` in place of binary,
   changed back into binary by an assembler.
3. High-level languages, from 1957: code that reads like English or
   mathematics, no longer tied to one kind of machine.

Each step made things easier for people. The hardware never needed any of
them.

</details>

## 12. Compiled or interpreted

Why does a compiled program usually run faster? And why is an interpreted
language usually quicker to try a change in?

<details class="dl-answer"><summary>answer</summary>

A compiled program was translated before it ran, so no time is spent
translating while it runs, and the compiler could look at the whole
program to make it faster. An interpreted program is translated as it
runs, which takes time, but there is no extra step before you see what a
changed line does. When you are looking for a bug, that is worth a great
deal.

A compiler has one more thing to offer, which you have met on every page
of this course: it checks the whole program before it runs any of it. So
some mistakes never reach a run at all.

</details>

## 13. The overnight batch

A bank processes the day's payments overnight, in one large batch. Which
language from the lesson's table would you expect to find doing that job?
Why?

<details class="dl-answer"><summary>answer</summary>

You would expect COBOL, and a surprising amount of this work still runs on
it. It was made in 1959 for business data, and banks chose it early. Code
that has worked, and been checked, for decades is not replaced without a
very good reason.

</details>

## 14. Which paradigm

Which paradigm is each one closest to? What told you?

- (a) `decimal total = 0;`, then a loop that adds each price to it
- (b) `prices.Sum()`
- (c) `basket.Add(4.50m);`, then `basket.Total()`
- (d) `TotalOf(numbers, IsEven)`

<details class="dl-answer"><summary>answer</summary>

(a) Procedural: a variable changed step by step. (b) Declarative: it says
what the answer is. (c) Object-oriented: the basket keeps its prices, and
adding and totalling are things it does. (d) Functional: a method,
`IsEven`, is given to another method as a value.

</details>

## 15. Back to a loop

This cell doubles every number in a declarative way. `Select` makes a new
value from each element, and `ToArray()` puts the new values in an array.
Can you write the same in the procedural style, with a loop and no
`Select`?

```csharp exec
id: back-to-a-loop-1
int[] numbers = { 1, 2, 3, 4, 5 };
int[] doubled = numbers.Select(number => number * 2).ToArray();
Console.WriteLine(string.Join(", ", doubled));
```

```inputs
doubled
```

```hint
after: 1 runs
How long is `doubled`? Can you make an array of that length first, and then
fill it one element at a time?
```

```solution
int[] numbers = { 1, 2, 3, 4, 5 };
int[] doubled = new int[numbers.Length];
for (int i = 0; i < numbers.Length; i++)
{
    doubled[i] = numbers[i] * 2;
}
Console.WriteLine(string.Join(", ", doubled));
---
The loop uses five lines in place of one, to do the same thing. Which is
easier to read depends on who is reading it.
```

## 16. Is one of them the best

Is one of the four paradigms the best one?

<details class="dl-answer"><summary>answer</summary>

No. They are habits of thought. A procedural loop is clearer for a
beginner. A declarative line is clearer once you are used to it. An object
helps when there is data to remember between steps, and makes things
harder when there is not. A program that mixes all four without a plan is
harder to read than one that keeps to one.

</details>

## 17. The first two bytes

A file's first two bytes are `50 4B` in hex. What are they as characters,
and what might they tell you about the file? Try the conversion by hand,
then run the cell.

```csharp exec
id: the-first-two-bytes-1
int first = Convert.ToInt32("50", 16);
int second = Convert.ToInt32("4B", 16);
Console.WriteLine($"{first} {(char)first}");
Console.WriteLine($"{second} {(char)second}");
```

<details class="dl-answer"><summary>answer</summary>

They are 80 and 75, which are P and K. `PK` starts every ZIP file. They are
the initials of Phil Katz, who wrote the ZIP format in 1989. Many formats
start with a few fixed bytes like these, a *magic number*, and software
often reads them to decide what a file is, without trusting its name.

</details>

## 18. The other way

<div class="dl-world" data-world="secret-messages">

Can you write `ToHexMessage`, which returns each character's ASCII code as
two hex digits, the way the 1958 memory dump was written?

```csharp exec
id: the-other-way-1--secret-messages
static List<string> ToHexMessage(string text)
{
    List<string> groups = new();
    // Your code
    return groups;
}

Console.WriteLine(string.Join(" ", ToHexMessage("HI")));
```

```inputs
ToHexMessage("HI")
ToHexMessage("CODE")
ToHexMessage("")      // no characters at all
```

```hint
after: 1 runs
`(int)character` gives a character's code. Which `Convert` method writes a
number in hex, and what makes its letters capitals?
```

```solution
static List<string> ToHexMessage(string text)
{
    List<string> groups = new();
    foreach (char character in text)
    {
        groups.Add(Convert.ToString((int)character, 16).ToUpper());
    }
    return groups;
}

Console.WriteLine(string.Join(" ", ToHexMessage("HI")));
Console.WriteLine(string.Join(" ", ToHexMessage("AZ")));
---
`(int)` gives the code, and `Convert.ToString(code, 16)` writes it in hex.
The capital letters run from A, which is 41 in hex, to Z, which is 5A, as
the last line shows, so two hex digits are always enough for them.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `RowToHex`, which changes a row of eight pixels, `#` and `.`,
into the two hex digits a game would store it as?

```csharp exec
id: the-other-way-1--pixel-art
static string RowToHex(string row)
{
    // Your code
    return "";
}

Console.WriteLine(RowToHex("##..##.."));
```

```inputs
RowToHex("##..##..")
RowToHex("#..#....")
RowToHex("........")      // a dark row
```

```hint
after: 1 runs
What are the binary digits of `"##..##.."`, with 1 for each `#` and 0 for
each `.`?
```

```hint
after: 2 runs
Build those digits as a string. Then `Convert.ToInt32(bits, 2)` gives the
number, and `Convert.ToString(number, 16)` writes it in hex. `ToUpper()`
and `PadLeft(2, '0')` finish the job.
```

```solution
static string RowToHex(string row)
{
    string bits = "";
    foreach (char pixel in row)
    {
        if (pixel == '#')
        {
            bits = bits + "1";
        }
        else
        {
            bits = bits + "0";
        }
    }
    string hex = Convert.ToString(Convert.ToInt32(bits, 2), 16).ToUpper();
    return hex.PadLeft(2, '0');
}

Console.WriteLine(RowToHex("##..##.."));
Console.WriteLine(Convert.ToString(Convert.ToInt32("00000000", 2), 16));
---
`"##..##.."` is `CC`, and a dark row is `00`. Without `PadLeft`, a dark row
would be `0`, one digit, as the last line shows. A program that reads two
digits for each row would then read every row after it from the wrong
place.
```

</div>

## 19. From earlier: a key that is missing

From *Dictionaries* and *Debugging*. Something in this cell does not go as
planned, on purpose. What will it do?

```csharp exec
id: from-earlier-a-key-that-is-missing-1
expect: exception
Dictionary<char, string> codeWords = new() { ['A'] = "ALFA" };
string word = codeWords.GetValueOrDefault('B');
Console.WriteLine(word.Length);
```

```predict
type: choice

What will it do?

- Print 0
  - A missing word has no letters.
- Stop with a KeyNotFoundException
  - B is not a key.
- Stop with a NullReferenceException
  - `GetValueOrDefault` gives `null`, and `null` has no `Length`.
```

<details class="dl-answer"><summary>why</summary>

It stops with a `NullReferenceException`, on line 3. With no default in its
brackets, `GetValueOrDefault` returns the default for the dictionary's
value type. For `string`, that default is `null`: no string at all, so it
has no `Length`. The mistake is the missing default,
`GetValueOrDefault('B', "")`, and the exception appears a step later, on
the line that uses the word.

</details>

## 20. From earlier: a test that asks the wrong thing

From *Reusable methods* and *Grids and references*. The first cell is the
`Test` class from *Reusable methods*. A class written in a cell can be used
by the cells below it (rule 2).

```csharp exec
id: from-earlier-a-test-that-asks-the-wrong-thing-test
file: Test.cs
static class Test
{
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
id: from-earlier-a-test-that-asks-the-wrong-thing-1
expect: exception
int[] numbers = { 3, 1, 2 };
Array.Sort(numbers);
int[] expected = { 1, 2, 3 };
Test.Check("sorted", expected, numbers);
Console.WriteLine("passed");
```

```predict
type: choice

What will it do?

- Print passed
  - The array, sorted, is 1, 2, 3.
- Stop with an exception
  - `Check` finds that the two arrays are not equal.
```

<details class="dl-answer"><summary>why</summary>

It stops with an exception, and its message is strange:
`sorted: expected System.Int32[], found System.Int32[]`. `Array.Sort` did
its job, and `numbers` is 1, 2, 3. The test asks the wrong question.
`Equals` on two arrays asks whether they are the same array, not whether
they hold the same elements, as `==` did on the page *Grids and
references*. These are two arrays, so the answer is no. The mistake is in
the test itself. `Test.Check("sorted", "1, 2, 3", string.Join(", ",
numbers));` compares the elements, as text, and the test holds.

</details>

## 21. From earlier: how many

From *Dictionaries*.

```csharp exec
id: from-earlier-how-many-1
Dictionary<char, int> counts = new();
foreach (char letter in "HELLO")
{
    counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
}
Console.WriteLine(counts['L']);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

The answer is 2. The loop counts each letter as it meets it, and there are
two Ls.

</details>
