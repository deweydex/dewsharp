---
title: "Dictionaries: looking things up by key"
version: 2026.09.28.1
from: looking-things-up-by-name
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4]
---

# Dictionaries: looking things up by key

Two spies share a key: a table that says which letter stands for which.
Here are its first five letters, kept in a C# dictionary. What will the
program print?

```csharp exec
id: a-shared-key-1
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
Console.WriteLine($"{key['C']}{key['A']}{key['B']}");
```

```predict
type: choice

What will it print?

- EQW
  - C# finds each letter in the key, and gives its code letter.
- CAB
  - The three letters are joined as they are.
- Nothing: it does not compile
  - A dictionary finds a value by its position, like an array, and `'C'` is not a position.
```

It prints `EQW`, which is CAB in code. An array finds a value by its
position. A dictionary finds a value by a key we choose, here a letter.
Most of this page is about that one change, and what it makes easy: a
cipher's key, a picture's palette (the colours it uses), and counting how
often each thing appears.

## Making a dictionary

A *dictionary* is a collection of pairs. Each pair joins a *key*, the name
we find something by, to a *value*, what is stored under that key. To
*look up* a value is to find it by its key.

A dictionary's type names two types between `<` and `>`: first the type
of its keys, then the type of its values. `Dictionary<char, string>` has a
`char` for each key and a `string` for each value. We make a dictionary in
the same way as a list:

- `new()` makes it, and the pairs it starts with go between curly brackets
  after it;
- each pair is the key in square brackets, then `=`, then the value:
  `['r'] = "red"`;
- commas go between the pairs.

```csharp exec
id: making-a-dictionary-1
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
Console.WriteLine(palette['r']);
Console.WriteLine(palette.Count);
Console.WriteLine(palette);
```

To find a value by its key, we write the dictionary's name, then the key
in square brackets: `palette['r']`. These are the brackets an array uses
for an index, with a key inside them where an array has a position.
`Count` gives the number of pairs, as it gave the number of elements in a
list: here, 3.

The last line prints the name of the dictionary's type, as
`Console.WriteLine` did for an array and a list. (The `` `2 `` in the name
says that the type takes two types between `<` and `>`.) A loop, further
down this page, prints every pair.

The name comes from a paper dictionary. You find a word, and its meaning
is beside it. Each key appears only once in a dictionary, but two keys can
share a value. Every key has the first type, and every value has the
second. A value can be of any type, an array included.

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you set `coded` to the word BEAD, in the code of this key?

```csharp exec
id: your-turn-1--secret-messages
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
string coded = "";
Console.WriteLine($"BEAD in code: {coded}");
```

```inputs
coded
```

```hint
after: 1 runs
Which code letter does `key['B']` give? BEAD needs one lookup for each of
its four letters.
```

```hint
after: 1 errors
Does the message say CS0029, and name `'int'` and `'string'`? Two `char`
values joined with `+` give a number: C# adds the numbers the letters are
stored as, as `moved + 'A'` did on
[the page about variables](lesson:storing-and-computing). Can you put the
four letters into one string with `$"..."`?
```

```solution
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
string coded = $"{key['B']}{key['E']}{key['A']}{key['D']}";
Console.WriteLine($"BEAD in code: {coded}");
---
WTQR. Four lookups, one for each letter. A loop can do the lookups for a
word of any length, and it does, further down this page.
```

</div>

<div class="dl-world" data-world="pixel-art">

A screen makes each colour from red, green and blue, each from 0 to 255.
Here a palette keeps each colour as an array of the three. Inside a
dictionary's curly brackets, each array needs its own `new int[]`, as each
row of a grid did on [the page about grids](lesson:grids-and-references).
Can you set `green` to the green part of the colour `'o'`?

```csharp exec
id: your-turn-1--pixel-art
Dictionary<char, int[]> palette = new()
{
    ['#'] = new int[] { 0, 0, 0 },
    ['.'] = new int[] { 255, 255, 255 },
    ['o'] = new int[] { 255, 165, 0 }
};
int green = 0;
Console.WriteLine(green);
```

```inputs
green
```

```hint
after: 1 runs
`palette['o']` is an array of three numbers. Which index is the green one?
```

```solution
Dictionary<char, int[]> palette = new()
{
    ['#'] = new int[] { 0, 0, 0 },
    ['.'] = new int[] { 255, 255, 255 },
    ['o'] = new int[] { 255, 165, 0 }
};
int green = palette['o'][1];
Console.WriteLine(green);
---
165. `palette['o']` is the array `{ 255, 165, 0 }`, orange, and `[1]`
chooses its second number. Two lookups, one after the other: first by key,
then by index.
```

</div>

## Adding and changing values

A dictionary is mutable, like a list: a program can change it after it is
made. The two middle lines here have the same shape. How many pairs will
the palette have at the end?

```csharp exec
id: adding-and-changing-values-1
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
palette['g'] = "green";
palette['r'] = "dark red";
Console.WriteLine(palette['r']);
Console.WriteLine(palette.Count);
```

```predict
type: number

How many pairs will it have at the end?
```

Four. `'g'` was not a key yet, so C# added a new pair. `'r'` was a key
already, so C# replaced its value. The two lines look the same. The only
difference is whether the key is already there. The pairs between the
curly brackets, when the dictionary is made, follow the same rule:
`['r'] = "red"` there does the same as the line `palette['r'] = "red";`
after it.

A value can be used to calculate its own new value, the way
`total = total + number;` did on
[the page about loops](lesson:repeating-yourself):

```csharp exec
id: adding-and-changing-values-2
Dictionary<char, int> counts = new() { ['E'] = 4, ['T'] = 2 };
counts['E'] = counts['E'] + 1;
Console.WriteLine(counts['E']);
```

C# calculates the part after `=` first. It reads 4, and adds 1. Then it
stores 5 under `'E'`. `counts['E'] += 1;` and `counts['E']++;` do the
same, as they do for a variable. We use this further down to count
things.

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you build `key`, a dictionary for the whole Caesar shift of 3, with a
loop? Each capital letter is a key, and the letter three places along is
its value. Then can you set `coded` to HELLO in that code, with a second
loop?

```csharp exec
id: your-turn-2--secret-messages
int shift = 3;
Dictionary<char, char> key = new();

string coded = "";
Console.WriteLine($"HELLO with a shift of {shift}: {coded}");
```

```inputs
key.Count
coded
```

```hint
after: 1 runs
`new()` with nothing after it makes an empty dictionary. For each number
from 0 to 25, the key is `(char)('A' + number)`. Which letter is its
value?
```

```solution
int shift = 3;
Dictionary<char, char> key = new();
for (int number = 0; number < 26; number++)
{
    key[(char)('A' + number)] = (char)((number + shift) % 26 + 'A');
}

string coded = "";
foreach (char letter in "HELLO")
{
    coded += key[letter];
}
Console.WriteLine($"HELLO with a shift of {shift}: {coded}");
---
KHOOR. The arithmetic happens once, when the key is made. After that,
coding a letter is one lookup, and the key could be any table at all, not
only a shift.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you build `shades`, a dictionary from a level, 0 to 4, to a
brightness? Level 0 is 0, level 4 is 255, and the others are in between,
each a quarter of 255 more than the last, rounded to the nearest whole
number. Then can you add a level 5, which is also 255?

The cell prints how many pairs `shades` has. Can you print some of the
pairs too, such as `shades[1]`? **Compare with a solution** shows them
all.

```csharp exec
id: your-turn-2--pixel-art
Dictionary<int, int> shades = new();

Console.WriteLine($"{shades.Count} pairs");
```

```inputs
shades
```

```hint
after: 1 runs
`new()` with nothing after it makes an empty dictionary. For each level
from 0 to 4, the brightness is `(int)Math.Round(level * 255 / 4.0)`. How
do you store it under that level?
```

```hint
after: 2 runs
Are some of your brightnesses a little smaller than a solution's?
`level * 255 / 4` divides one `int` by another, so the part after the
point is gone before `Math.Round` sees it. `4.0` is a `double`, so
`level * 255 / 4.0` keeps it.
```

```solution
Dictionary<int, int> shades = new();
for (int level = 0; level < 5; level++)
{
    shades[level] = (int)Math.Round(level * 255 / 4.0);
}
shades[5] = 255;
Console.WriteLine($"{shades.Count} pairs");
Console.WriteLine($"level 1 is {shades[1]}, level 3 is {shades[3]}");
---
Six pairs, with the brightnesses 0, 64, 128, 191, 255 and 255. The keys
here are whole numbers, `int`. `shades[1]` looks like an index, but it is
a key: C# finds the pair whose key is 1, wherever that pair is.
```

</div>

## Checking whether a key is there

What happens if we ask for a key that is not in the dictionary? This cell
is meant to stop with an exception. What does the first line of the
report say?

```csharp exec
id: checking-whether-a-key-is-there-1
expect: exception
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key['Z']);
```

It stops at line 5, with this report:

```console
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'Z' was not present in the dictionary.
   at line 5 of Program.cs
```

A `KeyNotFoundException` means that C# searched for a key and did not
find it. The message names the key, here `'Z'`. Often the key you meant is
there, written another way: `'a'` and `'A'` are two different keys.

We can ask before we look. `ContainsKey` checks whether a key is in a
dictionary, and gives `true` or `false`. What will the last line print?

```csharp exec
id: checking-whether-a-key-is-there-2
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key.ContainsKey('A'));
Console.WriteLine(key.ContainsKey('Z'));
Console.WriteLine(key.ContainsKey('Q'));
```

```predict
type: choice

What will the last line print?

- True
  - Q is in the dictionary: it is A's code letter.
- False
  - `ContainsKey` checks the keys, and Q is a value.
```

It prints `False`. `ContainsKey` checks the keys of a dictionary, and does
not check the values. (`ContainsValue` checks the values, but it has to
check every pair to know.) With `if`, `ContainsKey` lets a program decide
before it asks for a value:

```csharp exec
id: checking-whether-a-key-is-there-3
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
char letter = 'Z';
if (key.ContainsKey(letter))
{
    Console.WriteLine(key[letter]);
}
else
{
    Console.WriteLine($"{letter} is not in the key");
}
```

### A default for a missing key

`GetValueOrDefault` does that check and the lookup in one step.
`key.GetValueOrDefault(letter, '?')` gives the letter's value if the
letter is a key. If it is not, it gives the *default*: the value we choose
to get when nothing else is there.

```csharp exec
id: looking-up-with-a-default-1
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key.GetValueOrDefault('A', '?'));
Console.WriteLine(key.GetValueOrDefault('Z', '?'));
```

With no default in the brackets, `GetValueOrDefault` uses C#'s own
default for the type of the values. What do you think that is for an
`int`?

```csharp exec
id: looking-up-with-a-default-3
Dictionary<char, int> counts = new() { ['E'] = 4, ['T'] = 2 };
Console.WriteLine(counts.GetValueOrDefault('E'));
Console.WriteLine(counts.GetValueOrDefault('Z'));
```

It prints 4, then 0: C#'s default for an `int` is 0. For a `string`, it is
`null`, which means "no string at all".

A third way suits a program that does one thing when the key is there,
and something else when it is not. `TryGetValue` works like
`int.TryParse`, from *Reading input*. It gives `true` or `false`, and when
it gives `true`, it puts the value into the variable after `out`. `out`
marks a variable that the method fills.

```csharp exec
id: looking-up-with-a-default-2
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
char letter = 'B';
if (key.TryGetValue(letter, out char code))
{
    Console.WriteLine($"{letter} codes to {code}");
}
else
{
    Console.WriteLine($"{letter} is not in the key");
}
```

Can you change `'B'` to `'Z'`, and run it again?

Which of the three should you use? It depends on what a missing key means.

- If a missing key is a mistake, `key[letter]` stops the program with a
  `KeyNotFoundException`, and the report names the key.
- If a missing key is normal, such as a space in a message,
  `GetValueOrDefault` gives a sensible default, and the program continues.
- If the program must do something different for a missing key,
  `TryGetValue` checks whether the key is there and gives its value in one
  step.

## Looping over a dictionary

A `foreach` loop can take the pairs of a dictionary one at a time. Each
pair is a `KeyValuePair<char, string>`: one key and one value together,
with the dictionary's two types. `pair.Key` is the pair's key, and
`pair.Value` is its value. For only the keys, a loop can take
`palette.Keys`, and for only the values, `palette.Values`.

```csharp exec
id: looping-over-a-dictionary-1
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
foreach (char character in palette.Keys)
{
    Console.WriteLine(character);
}
foreach (KeyValuePair<char, string> pair in palette)
{
    Console.WriteLine($"{pair.Key} is {pair.Value}");
}
```

A dictionary does not promise to keep its pairs in any order. Here, the
loop meets them in the order they were added, but a program should not
depend on that. When the order matters, such as the order of the words in
a message, a program keeps the values in an array or a list.

### Your turn

<div class="dl-world" data-world="secret-messages">

A key codes a message. To decode it, we need the key reversed: each code
letter is a key, and the plain letter is its value. Can you build
`decodeKey` from `key` with a loop, and use it to set `plain`?

```csharp exec
id: your-turn-3--secret-messages
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
Dictionary<char, char> decodeKey = new();

string message = "EQRT";
string plain = "";
Console.WriteLine($"{message} decodes to {plain}");
```

```inputs
decodeKey
plain
```

```hint
after: 1 runs
`foreach (KeyValuePair<char, char> pair in key)` gives each pair. In
`decodeKey`, which of the two is the key, and which is the value?
```

```solution
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
Dictionary<char, char> decodeKey = new();
foreach (KeyValuePair<char, char> pair in key)
{
    decodeKey[pair.Value] = pair.Key;
}

string message = "EQRT";
string plain = "";
foreach (char code in message)
{
    plain += decodeKey[code];
}
Console.WriteLine($"{message} decodes to {plain}");
---
CADE, a name. Reversing a key like this works only because no two letters
share a code letter. If two did, the second would replace the first, and
the message could not be decoded.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you fill `drawn` with this picture, with each character replaced by
its colour's name? Each row of the picture becomes one string in `drawn`,
with a space between the names. Can you use `GetValueOrDefault`, so that
a character missing from the palette shows as `?`?

```csharp exec
id: your-turn-3--pixel-art
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
string[] picture = { "#r#", ".x." };
List<string> drawn = new();

foreach (string line in drawn)
{
    Console.WriteLine(line);
}
```

```inputs
drawn
```

```hint
after: 1 runs
Can you make one row at a time? Start a `List<string>` of names for the
row. For each character in the row, add
`palette.GetValueOrDefault(character, "?")`. When the row is done,
`string.Join(" ", names)` makes it one string to add to `drawn`.
```

```solution
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
string[] picture = { "#r#", ".x." };
List<string> drawn = new();
foreach (string row in picture)
{
    List<string> names = new();
    foreach (char character in row)
    {
        names.Add(palette.GetValueOrDefault(character, "?"));
    }
    drawn.Add(string.Join(" ", names));
}

foreach (string line in drawn)
{
    Console.WriteLine(line);
}
---
The second row has an `x`, which the palette does not have. With
`palette[character]`, the program would stop at the `x` with a
`KeyNotFoundException`, as `key['Z']` did above. With
`GetValueOrDefault`, it shows `?` and continues. Which is better depends
on whether an unknown character is a mistake.
```

</div>

## Counting things

How often does each letter appear in a piece of text? We do not know the
letters before we start, so we cannot make a variable for each one. A
dictionary can do it. Each letter is a key, and its count is the value.

```text
START with an empty dictionary
FOR each letter in the text
    IF the letter is already a key: ADD 1 to its count
    OTHERWISE: store the letter with a count of 1
DISPLAY each letter and its count
```

Before you run the cell, can you count the Es by hand?

```csharp exec
id: counting-things-1
string text = "MEET ME BY THE TREE";
Dictionary<char, int> counts = new();
foreach (char letter in text)
{
    if (counts.ContainsKey(letter))
    {
        counts[letter] = counts[letter] + 1;
    }
    else
    {
        counts[letter] = 1;
    }
}
foreach (KeyValuePair<char, int> pair in counts)
{
    Console.WriteLine($"'{pair.Key}' {pair.Value}");
}
```

The space has a count too, because a space is a `char` like any other.
The quotes round each key make the space easy to see.

This is the accumulator pattern again, with one accumulator for each key.
`GetValueOrDefault` makes the loop shorter. Why is the default 0 here?

```csharp exec
id: counting-things-2
string text = "MEET ME BY THE TREE";
Dictionary<char, int> counts = new();
foreach (char letter in text)
{
    counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
}
foreach (KeyValuePair<char, int> pair in counts)
{
    Console.WriteLine($"'{pair.Key}' {pair.Value}");
}
```

The first time a letter appears, it has no count yet, so
`GetValueOrDefault` gives 0, and 0 + 1 stores a count of 1. After that, it
gives the count so far. Both cells make the same counts. (With no default
in the brackets, it would give 0 as well, because 0 is the default of an
`int`. Writing the 0 says so plainly.)

### Your turn

Can you write `CountLetters(string text)`, which returns a dictionary of
how often each capital letter appears in `text`, and ignores everything
else? Before you compare with a solution, can you write down what you
think your method gives for each case?

```csharp exec
id: your-turn-4
static Dictionary<char, int> CountLetters(string text)
{
    Dictionary<char, int> counts = new();
    // Your code: count each capital letter in text
    return counts;
}

foreach (KeyValuePair<char, int> pair in CountLetters("BANANA"))
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

```inputs
CountLetters("BANANA")
CountLetters("MEET ME")        // the space is not counted
CountLetters("")               // an empty text
```

```hint
after: 1 runs
The loop in the cell above counts everything. `char.IsUpper`, from
[the page about decisions](lesson:making-decisions), can decide which
characters to count. Where does the `if` go?
```

```solution
static Dictionary<char, int> CountLetters(string text)
{
    Dictionary<char, int> counts = new();
    foreach (char character in text)
    {
        if (char.IsUpper(character))
        {
            counts[character] = counts.GetValueOrDefault(character, 0) + 1;
        }
    }
    return counts;
}

foreach (KeyValuePair<char, int> pair in CountLetters("BANANA"))
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
---
`CountLetters("BANANA")` gives B 1, A 3 and N 2. An empty text gives an
empty dictionary, with no pairs: no letters, no counts.
```

<div class="dl-world" data-world="secret-messages">

In English, E is the most common letter, then T and A. This is a weakness
in every Caesar shift: the most common letter in a coded message is
probably a coded E. Which letter is most common in this message? Can you
set `most`?

```csharp exec
id: your-turn-5--secret-messages
string message = "WKH HQHPB LV PHHWLQJ DW WKH EULGJH DW WKUHH";
Dictionary<char, int> counts = new();
foreach (char character in message)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}

char most = '?';
Console.WriteLine($"{most} {counts.GetValueOrDefault(most, 0)}");
```

```inputs
most
```

```hint
after: 1 runs
Take each pair of `counts` in turn, and keep the letter with the biggest
count so far. Is this pair's count bigger than the count of `most`?
```

```solution
string message = "WKH HQHPB LV PHHWLQJ DW WKH EULGJH DW WKUHH";
Dictionary<char, int> counts = new();
foreach (char character in message)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}

char most = '?';
foreach (KeyValuePair<char, int> pair in counts)
{
    if (pair.Value > counts.GetValueOrDefault(most, 0))
    {
        most = pair.Key;
    }
}
Console.WriteLine($"{most} {counts.GetValueOrDefault(most, 0)}");
---
H, nine times. If H is a coded E, the shift is 3, because H is three
letters after E. Can you decode the message with a shift of 3, and see
whether it reads as English?
```

</div>

<div class="dl-world" data-world="pixel-art">

Which colour does this picture use most? Can you count every character in
it, and set `most` to the most common one?

```csharp exec
id: your-turn-5--pixel-art
string[] picture =
{
    "..rr..",
    ".rrrr.",
    "rr##rr",
    ".rrrr."
};
Dictionary<char, int> counts = new();

char most = '?';
Console.WriteLine($"{most} {counts.GetValueOrDefault(most, 0)}");
```

```inputs
most
```

```hint
after: 1 runs
Two loops, one inside the other: one over the rows, and one over the
characters of each row. Then take each pair of `counts` in turn, and keep
the character with the biggest count so far.
```

```solution
string[] picture =
{
    "..rr..",
    ".rrrr.",
    "rr##rr",
    ".rrrr."
};
Dictionary<char, int> counts = new();
foreach (string row in picture)
{
    foreach (char character in row)
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}

char most = '?';
foreach (KeyValuePair<char, int> pair in counts)
{
    if (pair.Value > counts.GetValueOrDefault(most, 0))
    {
        most = pair.Key;
    }
}
Console.WriteLine($"{most} {counts.GetValueOrDefault(most, 0)}");
---
`r`, 14 times. An image file can store a picture this way: a palette of
the colours it uses, and each pixel as a short key into it.
```

</div>

## Dictionary or list?

Arrays, lists and dictionaries all keep many values together. Here they
are side by side.

| | Array or list | Dictionary |
|---|---|---|
| We find a value by | its position: `row[0]` | its key: `key['A']` |
| Its type names | one type: `int[]`, `List<int>` | two types: `Dictionary<char, char>` |
| It is a good choice when | order matters, or the values have no names | each value has a name we find it by |
| An example | the pixels in a row | a cipher's key |
| A missing item gives | `IndexOutOfRangeException` for an array, `ArgumentOutOfRangeException` for a list | `KeyNotFoundException` |

One question decides most cases. Will you find values by a name? If so,
use a dictionary. If you care about the order, or you only use the values
one at a time, use an array, or a list if the number of values can change.
And they work together. A dictionary's value can be an array, as the
palette of colours was.

For each of these, would you use an array, a list or a dictionary? Can you
write your answer, and your reason, as a comment in the cell?

1. The ten songs in a playlist, in the order they play.
2. The number of goals each player on a team has scored.
3. The rainfall on each day of March.
4. A phrasebook that gives the English word for each Irish word.
5. The people waiting in a queue.

```csharp exec
id: dictionary-or-list-1
// 1.
// 2.
// 3.
// 4.
// 5.
```

<details class="dl-answer"><summary>one way to answer</summary>

Here is one answer. Yours may be different and work too.

1. A list, `List<string>`. The order the songs play in matters most, and
   songs can be added.
2. A dictionary, `Dictionary<string, int>`. Each player's name is the key,
   and their goals are the value.
3. An array, `double[]`, with 31 elements. The position is the day: index
   0 is the 1st of March. March always has 31 days, so the length never
   changes.
4. A dictionary, `Dictionary<string, string>`. Each Irish word is a key,
   and its English word is the value stored under it.
5. A list, `List<string>`. In a queue, the order is what matters: who is
   first, and who is next. People join it and leave it, so its length
   changes.

Some could be more than one. The rainfall could be a dictionary with the
date as its key. Your reason matters more than which one you chose.

</details>

## Looking back

An array answers "what is at position 3?", and a dictionary answers "what
goes with this key?". Think of a program you use every day: a phone's
contacts, a shopping app, a game. Where do you think it keeps values
under names, and where in order?

A challenge: can you crack a Caesar shift with no key at all? Count the
letters in the coded message, guess that the most common one is a coded
E, find the shift, and decode the message. Does one letter have the
biggest count, or do two share it? What if a guess gives nonsense? Can you
try another letter, or guess that it is a coded T, then A? When a shift
goes backwards past A, `%` can give a number below zero, as
[the closer look at dividing](lesson:dividing-in-csharp) showed.

```csharp challenge
// Crack this Caesar shift: count, guess E, find the shift, decode.
string message = "WKLV LV D PHVVDJH IURP WKH IURQW OLQH";
Dictionary<char, int> counts = new();
foreach (char character in message)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}
foreach (KeyValuePair<char, int> pair in counts)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:looking-things-up-by-name-practice) has
more problems about dictionaries. After it,
[A program of your own](lesson:a-program-of-your-own) is a chance to build
something with everything so far: a cipher tool, a pixel-art maker, or an
idea of your own.

## Where to read more

Microsoft. *Dictionary<TKey,TValue> Class.*
<https://learn.microsoft.com/dotnet/api/system.collections.generic.dictionary-2>.
This is the reference page for C#'s dictionary. Its long example adds
pairs with `Add`, as practice problem 2 does, and uses `ContainsKey`,
`TryGetValue`, `Keys`, `Values` and a `foreach` over the pairs. It also
uses `Remove`, which removes a pair. The page says that the order of the
pairs in a loop is *undefined*: C# makes no promise about it. It is
written for programmers who know C# well, so read the example first.

Singh, S. (1999). *The Code Book: The Secret History of Codes and
Codebreaking*. Fourth Estate. Chapter 1 tells how Arab scholars in the
ninth century cracked substitution ciphers by counting letters, which is
the challenge above, done by hand.

SimonDev (2021). *Hash Tables, Associative Arrays, and Dictionaries (Data
Structures and Optimization).* <https://www.youtube.com/watch?v=S5NY1fqisSY>.
A C# `Dictionary` is a *hash table*, as Microsoft's page above says. This
video shows how a hash table finds a value from its key without checking
every pair, and what happens when two keys need the same place.
