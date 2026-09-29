---
title: "Programming languages: how they came to be"
version: 2026.09.28.1
from: how-we-got-here
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO1, PDP-LO3]
---

# Programming languages: how they came to be

Here is a number, written two ways. What do you think the cell will print?

```csharp exec
id: one-number-two-ways-1
Console.WriteLine(0b101010);
Console.WriteLine(0b101010 == 42);
```

```predict
type: choice

What will the first line print?

- 101010
  - It prints the digits written after the 0b.
- 42
  - 0b means the digits are binary, and C# shows the number in base 10.
- Nothing: it does not compile
  - A number cannot start with 0b.
```

It prints 42, and then `True`. `0b` in front of a number tells C# that its
digits are *binary*. Binary is the way a computer stores 42, and C# shows
the number the way people write it. Underneath every program on every page
so far, everything was patterns like that one.

This is the last lesson of the series, before its mixed problems, and it is
about the past: a program written before there was a machine to run it, the
on-and-off patterns the first computers read, and the languages that made
those patterns easier for people to write. Almost every part of
programming that looks like a strange choice was a decision somebody made
for a reason, and the reasons still hold. At each step in the story, a
message or a picture is left in the *notation* of its time: the way people
wrote numbers and letters then. To read it, you write the code that
translates it.

## Before there were computers

By 1843, Charles Babbage had designed a machine called the Analytical
Engine. It was mechanical, made of gears and cards, with no electricity,
and it was never finished in his lifetime.

**Ada Lovelace** was translating a paper about the machine into English.
The paper was by an Italian engineer, Luigi Menabrea, and it was written in
French. Lovelace added notes of her own, and one of them described, step
by step, how the Engine could calculate a sequence of numbers, with loops
and with conditional branching. *Conditional branching* means that the
Engine chooses its next step from a result, as `if` and `else` do. Her
notes were longer than the paper she was translating.

Most historians call her the first computer programmer. She wrote her
program more than a century before there was an electronic computer to
run it. **A program does not need a working machine to exist.** It is a
list of exact instructions. The rest of this page is about how machines
follow those instructions. It is a story about how people made them easier
to write, again and again, for a hundred and eighty years.

## The only language the machine understands

ENIAC, built in 1945, had no programming language at all. Engineers
programmed it by moving cables between boards and setting switches. A few
years later, machines could read their instructions from memory, but the
instructions were still patterns of on and off. *Machine code* is the
computer's own language: instructions that the *hardware*, the machine
itself, runs directly. In machine code, every instruction, number and
letter is written in binary.

We count in *base 10*, also called decimal, with ten digits, 0 to 9,
probably because we have ten fingers. Each position in a number is worth a
power of 10, so 42 means 4 tens and 2 ones. *Binary* is base 2. It has two
digits, 0 and 1, and each position is worth a power of 2: 1, 2, 4, 8, 16,
32, and so on. One binary digit is a *bit*.

```text
101010  =  1 × 32 + 0 × 16 + 1 × 8 + 0 × 4 + 1 × 2 + 0 × 1  =  42
```

Why binary? A computer is built from very small electronic switches:
*transistors* today, and *vacuum tubes* in ENIAC's day. A switch works best
with two states: on or off, high voltage or low. Base 2 matches those
exactly. (ENIAC itself still counted in base 10, with a ring of ten
circuits for each digit. The machines after it moved to binary, because
two states are simpler to build and more reliable.)

`Convert.ToString(42, 2)` writes 42 in base 2, as text. The method
`ToBinary` in this cell does the same job by hand. Before you run it, what
do you think `ToBinary(72)` will print?

```csharp exec
id: the-only-language-the-machine-understands-1
static string ToBinary(int number)
{
    if (number == 0)
    {
        return "0";
    }
    string text = "";
    while (number > 0)
    {
        text = (number % 2) + text;
        number = number / 2;
    }
    return text;
}

Console.WriteLine(Convert.ToString(42, 2));
Console.WriteLine(ToBinary(72));
```

```predict
type: choice

What will the last line print?

- 1001000
  - 72 is 64 + 8, and those two powers of 2 are the ones.
- 0001001
  - The loop finds the last digit first, with `number % 2`.
- 72
  - The method prints the number it was given.
```

It prints `101010`, and then `1001000`. `ToBinary` finds the last digit
first, `number % 2`, so it puts each new digit at the front of `text`. A
number joined to a string with `+` gives a string, so `text` grows by one
digit on each pass of the loop. Then `number / 2` drops the digit it has
just used: with two whole numbers, `/` drops the part after the point.

For the opposite job, from binary digits to a number, C# has
`Convert.ToInt32("01001000", 2)`. Here it is beside a method that does the
same job by hand.

```csharp exec
id: the-only-language-the-machine-understands-2
static int FromBinary(string text)
{
    int total = 0;
    foreach (char digit in text)
    {
        total = total * 2 + (digit - '0');
    }
    return total;
}

Console.WriteLine(FromBinary("01001000"));
Console.WriteLine(Convert.ToInt32("01001000", 2));
Console.WriteLine('1' - '0');
Console.WriteLine((char)FromBinary("01001000"));
```

The first two lines print 72. At each digit, `FromBinary` doubles the total
so far and adds the new digit. You do the same in base 10 without thinking,
with ten in place of two. `digit - '0'` is the digit's value. The
characters `'0'` to `'9'` are numbered in order, as the letters are, so
`'1' - '0'` is 1, as the third line shows.

Text is kept as numbers too. *ASCII*, from 1963, is a code that gives each
character a number, and 72 is the code for `H`. C# gives each character the
same number as ASCII does, for the characters ASCII has, so the last line
prints `H`. `(char)` is the cast from the page
[Variables and types](lesson:storing-and-computing): it gives the character
with that number.

### Your turn

Try these by hand first, and write your working as comments. Then check
each one with `Convert`.

1. What is binary `11001` in base 10?
2. How do you write 100 in binary?

```csharp exec
id: your-turn-1
// 1. Binary 11001 = ?
//    Working:

// 2. 100 in binary = ?
//    Working:

// Check both here, with Convert.
```

```solution
// 1. 11001 = 16 + 8 + 1 = 25
// 2. 100 = 64 + 32 + 4, so 1100100
Console.WriteLine(Convert.ToInt32("11001", 2));
Console.WriteLine(Convert.ToString(100, 2));
---
`11001` is 25. 100 is 64 + 32 + 4, which is `1100100`. To write a number
in binary by hand, subtract the largest power of 2 that fits, then the
largest that fits in what is left, and so on until nothing is left. Each
power you used is a 1, and each one you did not use is a 0.
```

<div class="dl-world" data-world="secret-messages">

An operator from the 1940s has left a message, written in ASCII. (The
message is invented: ASCII came later.) Each group of eight binary digits
is one letter's code, so `01001000` is `H`. Can you write `DecodeBinary`,
which returns the message in the groups?

```csharp exec
id: your-turn-2--secret-messages
static int FromBinary(string text)
{
    int total = 0;
    foreach (char digit in text)
    {
        total = total * 2 + (digit - '0');
    }
    return total;
}

static string DecodeBinary(string[] groups)
{
    // Your code
    return "";
}

string[] message1945 = { "01001000", "01000101", "01001100", "01001100", "01001111" };
Console.WriteLine(FromBinary(message1945[0]));
Console.WriteLine(DecodeBinary(message1945));
```

```inputs
DecodeBinary(message1945)
DecodeBinary(new string[] { "01001000", "01001001" })
DecodeBinary(new string[0])      // no groups at all
```

```hint
after: 1 runs
The first line under the cell is what `FromBinary` gives for the first
group. What does `(char)` do with that number?
```

```hint
after: 2 runs
For each group, `FromBinary` gives a number, and `(char)` makes the number
a character. Can you add each character to a string, and return the string
after the loop?
```

```solution
static int FromBinary(string text)
{
    int total = 0;
    foreach (char digit in text)
    {
        total = total * 2 + (digit - '0');
    }
    return total;
}

static string DecodeBinary(string[] groups)
{
    string text = "";
    foreach (string group in groups)
    {
        text = text + (char)FromBinary(group);
    }
    return text;
}

string[] message1945 = { "01001000", "01000101", "01001100", "01001100", "01001111" };
Console.WriteLine(FromBinary(message1945[0]));
Console.WriteLine(DecodeBinary(message1945));
---
HELLO. The groups are all eight digits long, so every letter takes the
same space, and the message can be cut into letters without a separator.
Eight bits are a *byte*, so each letter here takes one byte.
```

</div>

<div class="dl-world" data-world="pixel-art">

A *sprite* is a small picture that a game moves on the screen. Early games
kept their sprites as rows of binary digits, one bit for each pixel: 1 lit,
0 dark. Can you write `DrawBinary`, which returns the picture as rows of
`#` and `.`?

```csharp exec
id: your-turn-2--pixel-art
static List<string> DrawBinary(string[] rows)
{
    List<string> lines = new();
    // Your code
    return lines;
}

string[] sprite = { "00011000", "00111100", "01111110", "11111111", "00011000", "00011000" };
foreach (string line in DrawBinary(sprite))
{
    Console.WriteLine(line);
}
```

```inputs
DrawBinary(new string[] { "101", "010" })
DrawBinary(sprite)
DrawBinary(new string[0])      // no rows at all
```

```hint
after: 1 runs
What should the row `"101"` become? Which character goes where each `'1'`
is, and which goes where each `'0'` is?
```

```hint
after: 2 runs
For each row, build a line: `#` for each `'1'`, and `.` for each `'0'`.
Then `lines.Add(line)` adds the line to the list.
```

```solution
static List<string> DrawBinary(string[] rows)
{
    List<string> lines = new();
    foreach (string row in rows)
    {
        string line = "";
        foreach (char bit in row)
        {
            if (bit == '1')
            {
                line = line + "#";
            }
            else
            {
                line = line + ".";
            }
        }
        lines.Add(line);
    }
    return lines;
}

string[] sprite = { "00011000", "00111100", "01111110", "11111111", "00011000", "00011000" };
foreach (string line in DrawBinary(sprite))
{
    Console.WriteLine(line);
}
---
A tree. Eight bits are a *byte*, so with eight pixels a row, one bit each,
each row is one byte, and the whole picture is six bytes. That mattered when
a machine had only a few thousand bytes of memory.
```

</div>

## Assembly, and why hexadecimal exists

Binary is tiring to write by hand, and mistakes are easy to make.
`01001000` and `01001100` differ in one digit, and you have to count to
find it. People found two answers, and both were for people. The machines
needed neither.

*Assembly language* gives each machine instruction a short name, such as
`ADD`, `MOV` or `JMP`, in place of a binary pattern. An *assembler* is a
program that changes those names into binary. It is the first time in
this story that a program's job is to write another program.

*Hexadecimal*, base 16, became the usual short way to write binary. It
uses the digits 0 to 9 and then the letters A to F, for ten to fifteen. One
hex digit is exactly four binary digits: `1111` is `F`, and `1010` is `A`.
So a byte, eight binary digits, is exactly two hex digits. (Some early
machines used base 8 for the same job. Hexadecimal became the standard in
the 1960s, along with the eight-bit byte.) Hex exists only for this reason.
It is binary, written shorter, for the person reading it.

```csharp exec
id: assembly-and-why-hexadecimal-exists-1
Console.WriteLine(Convert.ToString(255, 16));
Console.WriteLine(0x48);
Console.WriteLine(Convert.ToInt32("48", 16));
Console.WriteLine(Convert.ToString(72, 2));
Console.WriteLine(Convert.ToString(72, 2).PadLeft(8, '0'));
```

`Convert.ToString(255, 16)` writes 255 in hex. C# writes the letters
small, `ff`, and `ToUpper()` makes them capitals, as it does for any text.
`0x` in front of a number tells C# that its digits are hex, as `0b` did
for binary, so `0x48` is 72. `Convert.ToInt32("48", 16)` reads hex from a
string.

The fourth line prints `1001000`. Above, `FromBinary` read `01001000`. The
zero in front was never part of the number, the way nobody writes 72 as
072. `PadLeft(8, '0')` adds zeros at the left of the text until it is eight
characters long, and the last line shows the zero again. `48` in hex, 72,
`1001000` and `01001000` are one number written four ways, and all of them
are H.

### Your turn

<div class="dl-world" data-world="secret-messages">

Here is a memory dump from 1958: a copy of what was in a computer's
memory, and this time it is in hex. Can you write `DecodeHex`?

```csharp exec
id: your-turn-3--secret-messages
static string DecodeHex(string[] groups)
{
    // Your code
    return "";
}

string[] memoryDump1958 = { "43", "4F", "44", "45" };
Console.WriteLine(DecodeHex(memoryDump1958));
```

```inputs
DecodeHex(memoryDump1958)
DecodeHex(new string[] { "48", "49" })
```

```hint
after: 1 runs
It is `DecodeBinary` with hex in place of binary. Which line of the cell
above reads hex from a string?
```

```solution
static string DecodeHex(string[] groups)
{
    string text = "";
    foreach (string group in groups)
    {
        text = text + (char)Convert.ToInt32(group, 16);
    }
    return text;
}

string[] memoryDump1958 = { "43", "4F", "44", "45" };
Console.WriteLine(DecodeHex(memoryDump1958));
---
CODE. Two hex digits for each letter, where binary took eight: the same
bytes, four times shorter to write.
```

Then there is the vault. Each entry is a pair: the base its code is
written in, and the code. Two values together in round brackets are a
*tuple*, as in the swap on the page
[Sorting](lesson:putting-things-in-order), so `(string, string)[]` is
an array of pairs of strings. You have written both halves already. Can
you put them into one method, with an `if` to choose between them?

```csharp exec
id: your-turn-4--secret-messages
static string CrackTheVault((string, string)[] pairs)
{
    // Your code
    return "";
}

(string, string)[] vault =
{
    ("hex", "54"), ("hex", "48"), ("hex", "45"), ("bin", "00100000"),
    ("hex", "46"), ("hex", "49"), ("hex", "52"), ("hex", "53"), ("hex", "54"),
    ("bin", "00100000"), ("hex", "50"), ("hex", "52"), ("hex", "4F"),
    ("hex", "47"), ("hex", "52"), ("hex", "41"), ("hex", "4D"), ("hex", "4D"),
    ("hex", "45"), ("hex", "52")
};
Console.WriteLine(CrackTheVault(vault));
```

```inputs
CrackTheVault(vault)
CrackTheVault(new (string, string)[] { ("bin", "01001000"), ("hex", "49") })
```

```hint
after: 1 runs
`foreach ((string numberBase, string code) in pairs)` gives the two values
of each pair a name. When `numberBase` is `"bin"`, which base does
`Convert.ToInt32` need, and which does it need for `"hex"`?
```

```hint
after: 2 runs
Why `numberBase`, and not `base`? `base` is a *keyword*: a word that C#
keeps for itself, so it cannot be the name of a variable. With `base` in
the `foreach`, the compiler gives many messages for that one word, and the
first one does not name `base` at all.
```

```solution
static string CrackTheVault((string, string)[] pairs)
{
    string text = "";
    foreach ((string numberBase, string code) in pairs)
    {
        int number;
        if (numberBase == "bin")
        {
            number = Convert.ToInt32(code, 2);
        }
        else
        {
            number = Convert.ToInt32(code, 16);
        }
        text = text + (char)number;
    }
    return text;
}

(string, string)[] vault =
{
    ("hex", "54"), ("hex", "48"), ("hex", "45"), ("bin", "00100000"),
    ("hex", "46"), ("hex", "49"), ("hex", "52"), ("hex", "53"), ("hex", "54"),
    ("bin", "00100000"), ("hex", "50"), ("hex", "52"), ("hex", "4F"),
    ("hex", "47"), ("hex", "52"), ("hex", "41"), ("hex", "4D"), ("hex", "4D"),
    ("hex", "45"), ("hex", "52")
};
Console.WriteLine(CrackTheVault(vault));
Console.WriteLine(Convert.ToInt32("00100000", 2));
---
THE FIRST PROGRAMMER: somebody from the first section of this page. The
two binary entries are 32, the code for a space, as the last line shows.
```

</div>

<div class="dl-world" data-world="pixel-art">

Games kept their sprites in hex, two hex digits for each row of eight
pixels. Can you write `DrawHex`, which returns the picture as rows of `#`
and `.`? Each row has to become eight binary digits, zeros in front
included.

```csharp exec
id: your-turn-3--pixel-art
static List<string> DrawHex(string[] rows)
{
    List<string> lines = new();
    // Your code
    return lines;
}

string[] invader = { "18", "3C", "7E", "DB", "FF", "24", "5A", "A5" };
foreach (string line in DrawHex(invader))
{
    Console.WriteLine(line);
}
```

```inputs
DrawHex(new string[] { "FF", "81" })
DrawHex(invader)
```

```hint
after: 1 runs
The cell above reads `"48"` as a number, and writes that number in binary.
How many binary digits does the same give for `"18"`?
```

```hint
after: 2 runs
`Convert.ToString(Convert.ToInt32(row, 16), 2)` gives the binary digits,
without the zeros in front. `PadLeft(8, '0')` adds them again. Then draw
each bit, as you did with binary.
```

```solution
static List<string> DrawHex(string[] rows)
{
    List<string> lines = new();
    foreach (string row in rows)
    {
        string bits = Convert.ToString(Convert.ToInt32(row, 16), 2).PadLeft(8, '0');
        string line = "";
        foreach (char bit in bits)
        {
            if (bit == '1')
            {
                line = line + "#";
            }
            else
            {
                line = line + ".";
            }
        }
        lines.Add(line);
    }
    return lines;
}

string[] invader = { "18", "3C", "7E", "DB", "FF", "24", "5A", "A5" };
foreach (string line in DrawHex(invader))
{
    Console.WriteLine(line);
}
Console.WriteLine(Convert.ToString(Convert.ToInt32("18", 16), 2));
---
An invader, eight bytes. Without the zeros in front, `"18"` would be
`11000`, as the last line shows: five pixels wide, and the picture would
lean to the left.
```

Web pages still write colours in hex: `#1E90FF` is two hex digits each for
red, green and blue. Can you write `Rgb`, which returns the three as
numbers?

```csharp exec
id: your-turn-4--pixel-art
static int[] Rgb(string colour)
{
    // Your code
    return new int[] { 0, 0, 0 };
}

Console.WriteLine(string.Join(", ", Rgb("#1E90FF")));
```

```inputs
Rgb("#1E90FF")
Rgb("#FFD700")
Rgb("#000000")
```

```hint
after: 1 runs
Where in `"#1E90FF"` is the red pair? A range picks part of a string, as it
picks part of an array.
```

```hint
after: 2 runs
`colour[1..3]` is the red pair: the characters at 1 and 2, because a range
stops before its second number. Which ranges are the green and the blue?
```

```solution
static int[] Rgb(string colour)
{
    int red = Convert.ToInt32(colour[1..3], 16);
    int green = Convert.ToInt32(colour[3..5], 16);
    int blue = Convert.ToInt32(colour[5..7], 16);
    return new int[] { red, green, blue };
}

Console.WriteLine(string.Join(", ", Rgb("#1E90FF")));
---
`[30, 144, 255]`, the blue called dodger blue, and `[255, 215, 0]`, gold.
Three bytes fit in six hex digits, with no doubt about where one ends and
the next starts.
```

</div>

## Languages people can read

Assembly was still tied to one kind of machine. Its instruction names
matched that machine's own instructions, so a program for one computer
would not run on another. Nobody enjoyed writing every program again for
every new machine.

The next step was the *high-level language*: code that reads more like
English or mathematics, which software translates into machine code, so a
person does not have to.

| Year | Language | What it was for |
|---|---|---|
| 1957 | FORTRAN | Scientific and engineering calculation |
| 1959 | COBOL | Business data processing |
| 1958–1960 | LISP | Symbolic and mathematical reasoning, and the ancestor of functional programming |
| 1972 | C | Systems programming, close to the hardware |
| 1991 | Python | General purpose and readable, and the first language of many programmers |
| 2000 | C# | General purpose, from Microsoft, and what you are writing now |

There are two ways to run a program written in a high-level language. A
*compiler* translates the whole program into machine code *before* it
runs, into a file the machine can run on its own. C works this way. An
*interpreter* reads the program and runs it *while it reads*. Python works
this way. To be exact, Python first translates your code into an
in-between form called bytecode, and interprets that. But for the person
writing it, Python behaves like an interpreted language.

C# is your own example, and it sits between the two. You have met its
compiler on every page: before C# runs a program, it reads all of it and
checks it. But the compiler does not make machine code. It makes an
in-between form, called *Intermediate Language*, or IL. When the program
runs, the *.NET runtime*, the part of .NET that runs C# programs, changes
the IL into machine code for the machine it is on, just before each part
runs. So one compiled program can run on Windows, on a Mac and on Linux,
and each machine makes its own machine code.

This page is one more case. In this browser tab, the .NET runtime runs the
IL with an interpreter. So the same C# is compiled, and then interpreted.
Compiled or interpreted is a fact about the tool that runs a language, not
about the language itself.

A compiled program usually runs faster than an interpreted one, and an
interpreted language is usually quicker to try things in while you are
writing. **Can you see how each follows from the difference above?**

Here are three of these languages side by side.

| | C | Python | C# |
|---|---|---|---|
| **How it runs** | compiled to machine code before it runs | compiled to bytecode, which an interpreter runs | compiled to IL, which the .NET runtime changes into machine code as it runs |
| **Types** | each variable's type is written in the code, and it is fixed | a value carries its type, and a name can hold a value of any type | each variable's type is written in the code, and it is fixed |
| **Blocks of code** | `{ }` marks where a block starts and stops | indentation marks a block | `{ }` marks where a block starts and stops |
| **Made for** | systems programming, close to the hardware | readable, general programs | general programs, on Microsoft's .NET |

These rows are what people mean by the *characteristics* of a programming
language: how it is translated and run, how it treats types, its *syntax*
(the grammar its code must follow), and what it was made for. Two languages
can agree in one row and differ in the next. C# looks like C on the page,
with its curly brackets and semicolons. In which row is C# closer to
Python than to C? The extra page [Many languages, one idea](lesson:many-languages-one-idea) gives one job
to five languages, and compares them row by row.

## The same problem, four ways

A *paradigm* is a way of organising a program: a set of habits about where
the logic goes and what the pieces are. Most languages encourage one, and
C# allows several. Here is one job, the total of the even numbers in an
array, done four ways. The first is the way these pages have written every
program so far. Run it.

```csharp exec
id: the-same-problem-four-ways-1
int[] numbers = { 1, 2, 3, 4, 5, 6 };

// Procedural: step-by-step instructions that change something as they go.
int total = 0;
foreach (int number in numbers)
{
    if (number % 2 == 0)
    {
        total = total + number;
    }
}
Console.WriteLine($"Procedural: {total}");
```

It prints 12, the total of 2, 4 and 6. The other three ways use parts of C#
that this course does not teach. They are here to read, not to write, and
each one finds the same total.

**Declarative**: say what the answer is, not how to build it.

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6 };
int total = numbers.Where(number => number % 2 == 0).Sum();
Console.WriteLine($"Declarative: {total}");
```

Read the middle line from left to right: the numbers, where the number is
even, and their sum. `Where` and `Sum` are part of [LINQ](lesson:asking-a-list-a-question), a set of methods
in C# for asking questions of arrays, lists and other collections.
`number => number % 2 == 0` is a small method with no name. It takes a
number, and says whether it is even. The line has no loop and no running
total. A loop still runs inside `Where`, but it is C#'s loop, not ours.

**Functional**: a method is a value, and one method can be given to
another.

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6 };
Console.WriteLine($"Functional: {TotalOf(numbers, IsEven)}");

static bool IsEven(int number)
{
    return number % 2 == 0;
}

static int TotalOf(int[] values, Func<int, bool> rule)
{
    int total = 0;
    foreach (int value in values)
    {
        if (rule(value))
        {
            total = total + value;
        }
    }
    return total;
}
```

`TotalOf` is given `IsEven` with no brackets after it, as `Array.Sort` was
given `ByLength` on the page [Sorting](lesson:putting-things-in-order).
`Func<int, bool>` is the type of a method that takes an `int` and returns a
`bool`. Give `TotalOf` another rule, such as a method `IsOdd`, and it
totals other numbers, with no change inside `TotalOf`.

**Object-oriented**: keep the data, and what you do with it, together.

```csharp
NumberList list = new NumberList(new int[] { 1, 2, 3, 4, 5, 6 });
Console.WriteLine($"Object-oriented: {list.EvenTotal()}");

class NumberList
{
    public int[] Values;

    public NumberList(int[] values)
    {
        Values = values;
    }

    public int EvenTotal()
    {
        int total = 0;
        foreach (int value in Values)
        {
            if (value % 2 == 0)
            {
                total = total + value;
            }
        }
        return total;
    }
}
```

`NumberList` is a *class*: a description of a new kind of thing. `new
NumberList(...)` makes one *object* from it, one particular list, which
carries its values and knows how to total the even ones.

The procedural version says *how*, step by step. The declarative version
says *what*. The functional version treats `IsEven` as a value, given to
another method. And the object-oriented version makes a new kind of thing,
a `NumberList`, that keeps its values and the method that uses them
together. No one of the four is better than the others in every case.
They are habits of thought, and which one suits depends on the problem, and
on who will read the code. The object-oriented course, *Fundamentals of
Object-Oriented Programming*, builds classes properly.

Here are three *snippets*: short pieces of code. For each one, which
paradigm is it closest to, and what told you? Snippets 1 and 2 are in the
cell, and you can run them. The prices are `decimal`, C#'s type for money:
a number with `m` after it is a `decimal`. Snippet 3 uses a class, which
the object-oriented course teaches, so it is here to read.

```csharp exec
id: the-same-problem-four-ways-2
decimal[] prices = { 4.50m, 2.20m, 7.00m };

// Snippet 1
decimal total = 0;
foreach (decimal price in prices)
{
    total = total + price;
}
Console.WriteLine(total);

// Snippet 2
Console.WriteLine(prices.Sum());
```

```csharp
// Snippet 3
Basket basket = new Basket();
basket.Add(4.50m);
basket.Add(2.20m);
basket.Add(7.00m);
Console.WriteLine(basket.Total());

class Basket
{
    public List<decimal> Prices = new();

    public void Add(decimal price)
    {
        Prices.Add(price);
    }

    public decimal Total()
    {
        return Prices.Sum();
    }
}
```

<details class="dl-answer"><summary>one way to answer</summary>

Here is one answer. Yours may be different and work too.

1 is procedural: a running total, changed step by step. 2 is declarative:
it says the answer is the sum of the prices, and C# runs the loop. 3 is
object-oriented: the basket holds its prices, and adding to it and
totalling it are things the basket does. Snippets 1 and 2 both print
13.70, and snippet 3 finds the same total. The clues matter most. They are
a changing variable, a description of the answer, and a thing that carries
its own data.

</details>

## Looking back

This page has two big ideas. The first: every step, from assembly to C#,
made things easier for people. The hardware never needed any of them, and
it still needs binary, as it always has. The second: a notation is a tool
with a purpose. Hexadecimal is a choice made to help people read, not a fact
about computers. Which step do you think made the biggest difference to
what a person could build?

This is the end of the series, before its mixed problems. Here is something
to make with all of it. The first step is easy, and there is no last step.

<div class="dl-world" data-world="secret-messages">

**Break a classmate's cipher.** Each of you codes a paragraph of English, a
few sentences long, with a cipher of your own, and you swap paragraphs.
Then write a program that breaks the other's cipher without the key. The
first step is a Caesar shift. You break it by counting letters and guessing
that the most common one is E. In a short text, the most common letter is
not always E. Is it, in the sample in the cell? A harder step is a key
where any letter can be coded as any other. You break it by matching the
order of its letters, most common first, to the order in English, E, T, A,
O, I, N, and you change the rest by hand, one word at a time.

```csharp challenge
// Paste your classmate's coded paragraph here.
string coded = "WKLV LV D PHVVDJH IURP WKH IURQW OLQH";

Dictionary<char, int> counts = new();
foreach (char character in coded)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}

int MoreOftenFirst(char first, char second)
{
    return counts[second] - counts[first];
}

char[] letters = counts.Keys.ToArray();
Array.Sort(letters, MoreOftenFirst);
Console.WriteLine(string.Join(", ", letters));
// Guess which letter is E. What shift, or what key, does that suggest?
```

</div>

<div class="dl-world" data-world="pixel-art">

**Make a pixel-art animation.** An animation is a list of pictures, the
frames, shown one after another. The first step is two frames of a sprite,
one with its eyes open and one with them shut, printed one under the other.
A harder step is frames made by a rule, such as a sprite that moves one
pixel to the right each frame, a picture that grows from its middle, or a
palette that changes its colours in turn. `Console.Clear()` empties the
console, and `Console.ReadLine()` waits for Enter, so each frame can
replace the one before.

```csharp challenge
// Each frame is a picture: an array of rows.
string[][] frames =
{
    new string[] { "..##..", ".#..#.", "..##.." },
    new string[] { "..##..", ".####.", "..##.." }
};

for (int number = 0; number < frames.Length; number++)
{
    Console.WriteLine($"Frame {number}");
    foreach (string row in frames[number])
    {
        Console.WriteLine(row);
    }
    Console.WriteLine();
}
// Can a method make the frames for you, from a rule?
```

</div>

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

The [practice page](lesson:how-we-got-here-practice) has more conversions
to try by hand, questions on the history and the paradigms, and three
problems from earlier pages. After it, [Mixed problems](lesson:mixed-programming) for this series
reviews the whole series, with no label on which page each problem needs.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Computerphile (2016). *Computer Science's Wonder Woman: Ada Lovelace*.
<https://www.youtube.com/watch?v=wnHHzBY1SPQ>. It tells the fuller story
of the translator's note that became longer than the paper it was
translating.

Khan Academy. *The Binary Number System*.
<https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information/xcae6f4a7ff015e7d:binary-numbers/v/the-binary-number-system>.
This video explains binary more slowly, with worked examples, for anyone
who wants a second example before trying the conversions.

Eater, B. *Build an 8-Bit Computer*. <https://eater.net/8bit>. On video,
Ben Eater builds everything this page only describes: machine code, binary
and an instruction set. He builds it by hand, one logic gate at a time.

CrashCourse (2017). *The First Programming Languages: Crash Course Computer
Science #11.* <https://www.youtube.com/watch?v=RU1u-js7db8>. It goes from
machine code to assembly to FORTRAN, and explains why each step made
programs easier for people to write. The video is about eleven minutes
long.

Microsoft. *Managed Execution Process*.
<https://learn.microsoft.com/en-us/dotnet/standard/managed-execution-process>.
It describes the steps this page names for C#: the compiler makes IL, and
the runtime changes the IL into machine code while the program runs. It
calls IL *CIL*, and the part of the runtime that makes machine code the
*JIT compiler*. It is written for programmers, so read it for the steps,
not for every detail.
