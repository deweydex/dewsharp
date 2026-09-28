---
title: "Dictionaries: practice"
version: 2026.09.28.1
from: looking-things-up-by-name-practice
practice_for: looking-things-up-by-name
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Dictionaries: practice

These problems are on dictionaries, with three from earlier pages. Can you
try each problem before you open anything under it? The cells are there
for you to run, to change, and to test your guesses in. Some cells are
meant not to compile, or to stop with an exception, and the problem says
so.

## 1. Five lookups

With this `key`, what does each of these give? The cell tries them in
this order. Say what you think each line will be, then run it. Whatever
happens when you run it is meant to happen, and nothing is broken.

- (a) `key['B']`
- (b) `key.Count`
- (c) `key.ContainsKey('W')`
- (d) `key.GetValueOrDefault('D', '?')`
- (e) `key['D']`

```csharp exec
id: five-lookups-1
expect: exception
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key['B']);
Console.WriteLine(key.Count);
Console.WriteLine(key.ContainsKey('W'));
Console.WriteLine(key.GetValueOrDefault('D', '?'));
Console.WriteLine(key['D']);
```

<details class="dl-answer"><summary>answer</summary>

(a) `W`. (b) 3, the number of pairs. (c) `False`, because `ContainsKey`
checks the keys, and W is a value. (d) `?`, the default. (e) The program
stops at line 9 with a `KeyNotFoundException`: *The given key 'D' was not
present in the dictionary.*

</details>

## 2. The same key twice

This dictionary is given the key `'E'` twice. What happens?

```csharp exec
id: the-same-key-twice-1
Dictionary<char, int> counts = new() { ['E'] = 1, ['T'] = 4, ['E'] = 2 };
Console.WriteLine(counts['E']);
Console.WriteLine(counts.Count);
```

```predict
type: choice

What will it print?

- 1, then 3
  - A dictionary keeps every pair it is given, and finds the first E.
- 2, then 2
  - A key appears once, so the later value replaces the first.
- It stops with an exception
  - C# meets the second E while the program runs, and stops.
- Nothing: it does not compile
  - C# will not allow the same key twice.
```

A dictionary also has a method `Add`, as a list has. `counts.Add('E', 3);`
adds a pair too. This second cell is meant to stop with an exception.
Which line do you think stops it, and why?

```csharp exec
id: the-same-key-twice-2
expect: exception
Dictionary<char, int> counts = new() { ['E'] = 1, ['T'] = 4 };
counts['E'] = 2;
Console.WriteLine(counts['E']);
counts.Add('E', 3);
Console.WriteLine(counts['E']);
```

<details class="dl-answer"><summary>why</summary>

The first cell prints 2, then 2. Each key appears only once, and the
second `['E'] = 2` replaces the first one's value, as `counts['E'] = 2;`
would. C# gives no warning, so a repeated key can lose a value without
anyone noticing.

The second cell prints 2, and then stops at line 4 with an
`ArgumentException`: *An item with the same key has already been added.
Key: E*. An *argument* is a value given to a method, and here the key
given to `Add` is one the dictionary already has. So `[key] = value` adds
a pair or replaces its value, and `Add` only adds.

Some programs, and some books, make a dictionary with `Add`'s shape:
`new() { { 'E', 1 }, { 'T', 4 } }`. Each inner pair of curly brackets
calls `Add`. What do you think a repeated key does there? Can you try it
in the first cell?

</details>

## 3. The first pair

An array's first element is at `[0]`. Is a dictionary's first pair there
too? Whatever happens when you run the cell is meant to happen, and
nothing is broken.

```csharp exec
id: the-first-pair-1
expect: CS1503
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key[0]);
```

```predict
type: choice

What will happen when you press Run?

- It prints Q
  - `[0]` is the first pair's value, as in an array.
- It stops with an exception
  - There is no key 0.
- Nothing: it does not compile
  - The keys are `char` values, and 0 is an `int`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile. The compiler's message is:

```console
Program.cs(5,23): error CS1503: Argument 1: cannot convert from 'int' to 'char'
```

The key's type is `char`, so the compiler checks that what goes between
the square brackets is a `char`. A dictionary finds values by key, never
by position. With a `Dictionary<int, int>`, such as `shades` in the
lesson's pixel-art task, `shades[1]` does compile, and it finds the pair
whose key is 1, wherever that pair is.

</details>

## 4. Two changes

What do you think this prints? Run it and see.

```csharp exec
id: two-changes-1
Dictionary<char, int> counts = new() { ['E'] = 2 };
counts['T'] = counts.GetValueOrDefault('T', 0) + 1;
counts['E'] = counts['E'] + 1;
Console.WriteLine($"E {counts['E']}, T {counts['T']}");
```

<details class="dl-answer"><summary>why</summary>

`E 3, T 1`. `GetValueOrDefault('T', 0)` gives 0 for a missing key, so T
starts at 1 with no exception. `counts['T'] + 1` would have stopped the
program with a `KeyNotFoundException`, as (e) did in problem 1, because T
was not a key yet.

</details>

## 5. How many in all

Can you set `total` to the number of pixels counted in `counts`?

```csharp exec
id: how-many-in-all-1
Dictionary<char, int> counts = new() { ['r'] = 14, ['.'] = 8, ['#'] = 2 };
int total = 0;

Console.WriteLine(total);
```

```inputs
total
```

```hint
after: 1 runs
`counts.Values` gives the counts without their keys. What does a loop
over them add to `total`?
```

```solution
title: with what you've met so far
Dictionary<char, int> counts = new() { ['r'] = 14, ['.'] = 8, ['#'] = 2 };
int total = 0;
foreach (int count in counts.Values)
{
    total += count;
}
Console.WriteLine(total);
```

```solution
title: a shorter way C# has
Dictionary<char, int> counts = new() { ['r'] = 14, ['.'] = 8, ['#'] = 2 };
int total = counts.Values.Sum();
Console.WriteLine(total);
---
`counts.Values` gives the values without the keys, and `Sum()` adds them:
24.
```

## 6. The rarest

Which letter appears least often? Can you set `rarest`?

```csharp exec
id: the-rarest-1
Dictionary<char, int> counts = new()
{
    ['H'] = 9, ['W'] = 6, ['K'] = 3, ['D'] = 2, ['P'] = 1, ['B'] = 1
};
char rarest = '?';

Console.WriteLine(rarest);
```

```inputs
rarest
```

```hint
after: 1 runs
Can you start with a letter that is a key, such as `'H'`, as the rarest so
far? Take each pair in turn. Is its count smaller than the count of the
rarest so far?
```

```solution
Dictionary<char, int> counts = new()
{
    ['H'] = 9, ['W'] = 6, ['K'] = 3, ['D'] = 2, ['P'] = 1, ['B'] = 1
};
char rarest = 'H';
foreach (KeyValuePair<char, int> pair in counts)
{
    if (pair.Value < counts[rarest])
    {
        rarest = pair.Key;
    }
}
Console.WriteLine(rarest);
---
P. B has the same count, and `<` keeps the first one the loop meets.
Starting from `'H'` works because H is a key. Starting from `'?'` would
stop the program with a `KeyNotFoundException`, because `'?'` is not a
key, and `counts[rarest]` needs one.
```

## 7. By first letter

Can you fill `groups`, a dictionary that keeps the words in lists, by
their first letter? Its type, `Dictionary<char, List<string>>`, says that
each key is a `char` and each value is a list of strings.

```csharp exec
id: by-first-letter-1
string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
Dictionary<char, List<string>> groups = new();

foreach (KeyValuePair<char, List<string>> pair in groups)
{
    Console.WriteLine($"{pair.Key}: {string.Join(", ", pair.Value)}");
}
```

```inputs
groups
```

```hint
after: 1 runs
The first time a letter appears, its value needs to be a new list,
`new List<string>()`. After that, the word is added to that list. How
does the loop know which of the two to do?
```

```solution
string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
Dictionary<char, List<string>> groups = new();
foreach (string word in words)
{
    char first = word[0];
    if (!groups.ContainsKey(first))
    {
        groups[first] = new List<string>();
    }
    groups[first].Add(word);
}

foreach (KeyValuePair<char, List<string>> pair in groups)
{
    Console.WriteLine($"{pair.Key}: {string.Join(", ", pair.Value)}");
}
---
`O: OTTER, OWL`, `H: HEDGEHOG, HARE` and `B: BAT`. The values are lists,
and a list is a reference type, so `groups[first].Add(word)` changes the
list inside the dictionary.
```

## 8. Counting a vote

A class voted for the colour of a poster. Can you fill `votes` with how
many votes each colour got?

```csharp exec
id: counting-a-vote-1
string[] ballots = { "red", "blue", "red", "green", "red", "blue" };
Dictionary<string, int> votes = new();

foreach (KeyValuePair<string, int> pair in votes)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

```inputs
votes
```

```solution
string[] ballots = { "red", "blue", "red", "green", "red", "blue" };
Dictionary<string, int> votes = new();
foreach (string colour in ballots)
{
    votes[colour] = votes.GetValueOrDefault(colour, 0) + 1;
}

foreach (KeyValuePair<string, int> pair in votes)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
---
red 3, blue 2 and green 1. The loop does not need to know the colours
before it starts. A new colour gets a count the first time it appears.
```

## 9. Two arrays into one dictionary

A key has been kept as two arrays, in matching order. Can you fill `key`,
with each plain letter as a key and its code letter as the value?

```csharp exec
id: two-lists-into-one-1
char[] plain = { 'A', 'B', 'C', 'D' };
char[] code = { 'X', 'M', 'Q', 'L' };
Dictionary<char, char> key = new();

foreach (KeyValuePair<char, char> pair in key)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

```inputs
key
```

```hint
after: 1 runs
A for loop can count the indexes of `plain`. At each index, which
element is the key, and which is the value?
```

```solution
title: with what you've met so far
char[] plain = { 'A', 'B', 'C', 'D' };
char[] code = { 'X', 'M', 'Q', 'L' };
Dictionary<char, char> key = new();
for (int index = 0; index < plain.Length; index++)
{
    key[plain[index]] = code[index];
}

foreach (KeyValuePair<char, char> pair in key)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

```solution
title: a shorter way C# has
char[] plain = { 'A', 'B', 'C', 'D' };
char[] code = { 'X', 'M', 'Q', 'L' };
Dictionary<char, char> key = plain.Zip(code).ToDictionary();

foreach (KeyValuePair<char, char> pair in key)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
---
`Zip` joins the two arrays into pairs, element by element, and
`ToDictionary` makes each pair a key and a value. Two arrays in matching
order are easy to break: sort one, and the pairs no longer match. One
dictionary keeps each pair together.
```

## 10. Array, list or dictionary

For each of these, would you use an array, a list or a dictionary? Why?

1. The moves in a game of chess, in the order they were played.
2. The colour of each character in a pixel-art palette.
3. How many times each word appears in a book.
4. The high scores on a game's leaderboard, best first.

<details class="dl-answer"><summary>one way to answer</summary>

Here is one answer. Yours may be different and work too.

1. A list, because the order matters, and each move adds one more.
2. A dictionary, `Dictionary<char, string>`, because you find a colour by
   its character.
3. A dictionary, `Dictionary<string, int>`. Each word is a key, and its
   count is the value.
4. A list, because the order matters, though each entry holds two values,
   a name and a score.

</details>

## 11. Letting things through

<div class="dl-world" data-world="secret-messages">

This key has only the letters it needs. Can you write
`Decode(string message, Dictionary<char, char> key)`, which decodes each
letter that is in the key, and leaves anything else, such as a space, as
it is?

```csharp exec
id: letting-things-through-1--secret-messages
static string Decode(string message, Dictionary<char, char> key)
{
    string plain = "";
    // Your code: decode each character of message
    return plain;
}

Dictionary<char, char> key = new()
{
    ['W'] = 'B', ['T'] = 'E', ['Q'] = 'A', ['R'] = 'D'
};
Console.WriteLine(Decode("WTQR", key));
```

```inputs
Decode("WTQR", key)
Decode("WTQR WTQR", key)    // with a space
Decode("", key)             // an empty message
```

```hint
after: 1 runs
`key.GetValueOrDefault(character, character)` gives the character's
decoded letter if the character is a key. What does it give if it is not?
```

```solution
static string Decode(string message, Dictionary<char, char> key)
{
    string plain = "";
    foreach (char character in message)
    {
        plain += key.GetValueOrDefault(character, character);
    }
    return plain;
}

Dictionary<char, char> key = new()
{
    ['W'] = 'B', ['T'] = 'E', ['Q'] = 'A', ['R'] = 'D'
};
Console.WriteLine(Decode("WTQR", key));
---
The default in `GetValueOrDefault` can be the thing we asked for. Here
that means "if there is no code for it, leave it as it is".
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `Brightness(string row, Dictionary<char, int> shades)`,
which turns a row of characters into a list of brightnesses with the
`shades` dictionary, and makes any character it does not know 0?

```csharp exec
id: letting-things-through-1--pixel-art
static List<int> Brightness(string row, Dictionary<char, int> shades)
{
    List<int> values = new();
    // Your code: add a brightness for each character of row
    return values;
}

Dictionary<char, int> shades = new() { ['#'] = 255, ['+'] = 128, ['.'] = 32 };
Console.WriteLine(string.Join(" ", Brightness("#+.", shades)));
```

```inputs
Brightness("#+.", shades)
Brightness("# x", shades)    // a space and an x
Brightness("", shades)       // an empty row
```

```hint
after: 1 runs
`shades.GetValueOrDefault(character, 0)` gives the character's brightness
if the character is a key, and 0 if it is not.
```

```solution
static List<int> Brightness(string row, Dictionary<char, int> shades)
{
    List<int> values = new();
    foreach (char character in row)
    {
        values.Add(shades.GetValueOrDefault(character, 0));
    }
    return values;
}

Dictionary<char, int> shades = new() { ['#'] = 255, ['+'] = 128, ['.'] = 32 };
Console.WriteLine(string.Join(" ", Brightness("#+.", shades)));
---
`Brightness("# x", shades)` gives 255, 0 and 0: a space and an x are both
unknown, so both are black. Is that what you want? For a space, probably.
For an x, it might hide a mistake in the picture.
```

</div>

## 12. From earlier: two names for one dictionary

From [the page about grids](lesson:grids-and-references).

```csharp exec
id: from-earlier-two-names-1
Dictionary<char, char> key = new() { ['A'] = 'Q' };
Dictionary<char, char> spare = key;
spare['B'] = 'W';
Console.WriteLine(key.Count);
```

```predict
type: choice

What will it print?

- 1
  - Only `spare` was changed.
- 2
  - `key` and `spare` are two names for one dictionary.
```

<details class="dl-answer"><summary>why</summary>

2. A dictionary is a reference type, like an array and a list.
`Dictionary<char, char> spare = key;` copies the reference, so `key` and
`spare` name one dictionary: aliasing, as with an array. For a separate
copy, `new(key)` makes a new dictionary with the same pairs. Can you
change the second line to `Dictionary<char, char> spare = new(key);`, and
run it again?

</details>

## 13. From earlier: counting from 1

From [the page about arrays and lists](lesson:lists-and-sequences). What
will the last line print? Run it and see.

```csharp exec
id: from-earlier-counting-from-1-1
char[] letters = { 'X', 'Y', 'Z' };
for (int index = 0; index < letters.Length; index++)
{
    Console.WriteLine($"{index + 1} {letters[index]}");
}
```

<details class="dl-answer"><summary>why</summary>

`3 Z`. The number printed is `index + 1`, so it starts at 1. The array's
own indexes are still 0 to 2, so `letters[index]` still starts at X.

</details>

## 14. From earlier: which error

From [the page about exceptions](lesson:reading-an-error-message). What
happens with each of these: does the program stop with an exception, does
it not compile, or does it run? Can you try each one in the cell, in place
of `"12" + 5`?

- (a) `int.Parse("12.5")`
- (b) `numbers[3]`
- (c) `"12" + 5`
- (d) `"12" * 5`

```csharp exec
id: from-earlier-which-error-1
int[] numbers = { 1, 2, 3 };
Console.WriteLine("12" + 5);
```

<details class="dl-answer"><summary>answer</summary>

(a) It stops with a `FormatException`, because `int.Parse` wants a whole
number written in digits, and `"12.5"` has a point. `double.Parse` can
read it.

(b) It stops with an `IndexOutOfRangeException`, because three elements
have the indexes 0 to 2.

(c) It runs, and prints 125. `+` with a string joins text, so C# turns 5
into text first.

(d) It does not compile, so nothing runs. C# has no `*` for a string and
a number.

</details>
