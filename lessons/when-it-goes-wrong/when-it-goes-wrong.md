---
title: "Debugging: finding bugs in bigger programs"
version: 2026.09.28.1
from: when-it-goes-wrong
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO9, PDP-LO10]
---

# Debugging: finding bugs in bigger programs

This method is meant to count how often each letter appears in a word.
This page is about mistakes, so many of its cells are meant to fail. What
do you think will happen when you press Run?

```csharp exec
id: a-count-that-forgets-1
expect: CS0103
static Dictionary<char, int> CountLetters(string text)
{
    foreach (char letter in text)
    {
        Dictionary<char, int> counts = new();
        counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
    }
    return counts;
}

Dictionary<char, int> result = CountLetters("BANANA");
foreach (char letter in result.Keys)
{
    Console.WriteLine($"{letter}: {result[letter]}");
}
```

```predict
type: choice

What will happen when you press Run?

- It prints B: 1, A: 3 and N: 2
  - Each letter is counted as the loop repeats.
- It prints A: 1
  - `counts` is made again each time the loop repeats, so each letter
    starts again from nothing.
- It does not compile, so nothing runs
  - `counts` is made inside the loop, and the `return` is outside it.
```

It does not compile, so nothing runs. The compiler's message is:

```console
Program.cs(8,12): error CS0103: The name 'counts' does not exist in the current context
```

A variable exists only between the braces where it was made, from the
line that makes it to the closing `}`. `counts` was made inside the loop's
braces, so at line 8, the `return`, it no longer exists. If you know
Python: there, the same method runs with no message at all, and it counts
only one letter, as the next cell does.

Here is one way to make the compiler accept the method. It makes `counts`
before the loop, so the `return` can see it, and it keeps the line inside
the loop. What does it print now?

```csharp exec
id: a-count-that-forgets-2
static Dictionary<char, int> CountLetters(string text)
{
    Dictionary<char, int> counts = new();
    foreach (char letter in text)
    {
        counts = new();
        counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
    }
    return counts;
}

Dictionary<char, int> result = CountLetters("BANANA");
foreach (char letter in result.Keys)
{
    Console.WriteLine($"{letter}: {result[letter]}");
}
```

It prints `A: 1`. Every name exists now, and every value has the type
it should, so the compiler has nothing to object to. But `counts = new();`
still makes a new, empty dictionary each time the loop repeats, so only
the last letter is counted. The message is gone, and the mistake is still
there. Can you delete that line, and run the cell again?

What we can see is called the *symptom*: first a compiler message, and now
`A: 1`. The mistake in the code that makes it happen is the *cause*: here,
a dictionary made inside the loop, when it belongs before it. The second
version treated the symptom, the message, and left the cause where it was.

A mistake in a program is often called a *bug*. When we find bugs and fix
them, we call it *debugging*. [Exceptions](lesson:reading-an-error-message)
met the three things that can happen when you press Run, in programs of a
few lines. Since then, programs have grown: loops, arrays, lists,
dictionaries, and methods that call methods. Bigger programs bring new
exceptions, longer exception reports, and logical errors that hide much
better. A *logical error* is a mistake in code that compiles and runs, and
gives an answer nobody meant. C# finds some bugs before the program runs,
as it did here. This page is mostly about the ones it cannot find. Most
cells below are meant to fail, or to give an answer nobody meant. The
exercise is to see why.

## Errors from lists and dictionaries

An array, a list and a dictionary each give a new way to ask for something
that is not there. Each one stops the program with an exception of its
own.

| Exception | What it means |
|---|---|
| `IndexOutOfRangeException` | The program asked an array or a string for a position it does not have. |
| `ArgumentOutOfRangeException` | The same, for a `List`: a position the list does not have. |
| `KeyNotFoundException` | The program asked a dictionary for a key it does not have. The message shows the key it asked for. |
| `NullReferenceException` | The program used a variable that holds `null`, which means *no object at all*: no array, no list, no string. |

### Your turn

Before you run each cell, can you write in the comment at its end which of
the three things you think will happen? If you think it will stop with an
exception, which one? All four are meant to fail, so a message is not a
sign that anything is broken. Then run each one, and read the first line
of the message.

```csharp exec
id: errors-from-lists-and-dictionaries-1
expect: exception
string[] letters = { "A", "B", "C" };
Console.WriteLine(letters[letters.Length]);
// I think:
```

```csharp exec
id: errors-from-lists-and-dictionaries-2
expect: exception
Dictionary<char, char> key = new() { ['A'] = 'Q', ['B'] = 'W' };
Console.WriteLine(key['a']);
// I think:
```

```csharp exec
id: errors-from-lists-and-dictionaries-3
expect: CS1061
List<int> row = new() { 0, 255 };
row.add(128);
// I think:
```

```csharp exec
id: errors-from-lists-and-dictionaries-4
expect: exception
string[] words = new string[3];
words[0] = "MEET";
words[1] = "ME";
Console.WriteLine(words[2].Length);
// I think:
```

<details class="dl-answer"><summary>answer</summary>

The first stops with an `IndexOutOfRangeException`: *Index was outside the
bounds of the array.* The positions of an array start at 0, so the last
position is always one less than the length, and `letters[letters.Length]`
asks for the position after the last one. This slip is common enough to
have a name, an *off-by-one error*. With a `List<string>` in place of the
array, and `Count` in place of `Length`, the same slip stops with an
`ArgumentOutOfRangeException`.

The second stops with a `KeyNotFoundException`: *The given key 'a' was not
present in the dictionary.* The dictionary has a capital A, and `'a'` and
`'A'` are different `char` values. The message shows the key the program
asked for, so compare it, letter by letter, with the keys there are.

The third does not compile, so nothing runs: `error CS1061: 'List<int>'
does not contain a definition for 'add'`. A list grows with `Add`, with a
capital letter, as .NET writes the names of its methods. The compiler knows
every method a `List<int>` has, so it finds this before the program starts.
In Python, the same slip is found only when the line runs.

The fourth stops with a `NullReferenceException`: *Object reference not set
to an instance of an object.* `new string[3]` made an array with three
places, and each place holds `null` until a string is put there. The
program put strings in the first two places, and then asked the third,
which holds `null`, for its length.

A list variable that is never given a list is different. `List<int> row;`
and then `row.Add(5);` does not compile at all, because the compiler can
see that no line gave `row` a value. Problem 3 on the practice page shows
its message. The compiler cannot see which places of an array have been
filled, so the fourth cell compiles, and stops when it runs.

</details>

## Exception reports through several methods

When the exception happens inside a method that another method called, the
report shows the whole chain of calls. Here is a small cipher in a class of
its own, `Cipher`, in the file `Cipher.cs`. `EncodeLetter` finds one
letter's code in a key, and `Encode` calls it for each letter of a message.

```csharp exec
id: reading-a-traceback-1
file: Cipher.cs
static class Cipher
{
    public static char EncodeLetter(char letter, Dictionary<char, char> key)
    {
        return key[letter];
    }

    public static string Encode(string message, Dictionary<char, char> key)
    {
        string coded = "";
        foreach (char letter in message)
        {
            coded = coded + EncodeLetter(letter, key);
        }
        return coded;
    }
}
```

This program uses the class to encode two messages. It is meant to stop
with an exception. Run it.

```csharp exec
id: reading-a-traceback-1-program
expect: exception
Dictionary<char, char> key = new() { ['E'] = 'Q', ['M'] = 'D', ['T'] = 'Z' };
Console.WriteLine(Cipher.Encode("MEET", key));
Console.WriteLine(Cipher.Encode("MEET ME", key));
```

It prints `DQQZ`, the first message in code. The second message stops the
program with a `KeyNotFoundException`, and the page shows this report:

```console
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key ' ' was not present in the dictionary.
   at line 5 of Cipher.cs (in Cipher.EncodeLetter(char, Dictionary<char, char>))
   at line 13 of Cipher.cs (in Cipher.Encode(string, Dictionary<char, char>))
   at line 3 of Program.cs
```

It has two parts.

- The first line names the exception, and gives its message. The key
  between the quotes, `' '`, is a space.
- Below it is a list of the calls that were running when the program
  stopped, the most recent first. Each one names a line, its file, and the
  method the line is in. Line 3 of `Program.cs` is in the program's own
  statements, so it names no method.

Visual Studio and Microsoft's documentation call this list a *stack
trace*. **Read it from the top.** The top line is where the program could
go no further: line 5 of `Cipher.cs`, `return key[letter];`. This is *the
line that failed*. Each line below it is one call further out.
`EncodeLetter` was called by line 13, in `Encode`, and `Encode` was called
by line 3 of the program. The program started at the bottom of the list,
and it stopped at the top. The list is the route it took from one to the
other. If you know Python: a traceback is the other way up, with the most
recent call last.

Under the report, the fold *What .NET said, in full* has the same report
in .NET's own words, as a console window in Visual Studio shows it. There,
``Dictionary`2`` is .NET's way to write a dictionary with two types, such
as `Dictionary<char, char>`. In Visual Studio, the list can also start
with a line from inside .NET itself, where the dictionary searches for the
key. Start from the first line that names a file of yours.

Is `EncodeLetter` the problem? It finds a letter in the key, which is what
it is for. The key has no space in it. The space was in the message, on
line 3 of the program. That is *the line that is responsible*. In a real
program, a person would type the message, the program would read it with
`Console.ReadLine()`, and the person typing can type anything. The top of
the report says *what* happened. The lines below it say *how* it came to
happen.

### Your turn

Here is a picture as rows of brightness values, and two methods.
`RowBrightness` gives a row's average brightness, and `BrightestRow` gives
the position of the brightest row.

```csharp exec
id: tracebacks-through-several-functions-1
file: Brightness.cs
static class Brightness
{
    public static int RowBrightness(int[] row)
    {
        int total = 0;
        foreach (int value in row)
        {
            total = total + value;
        }
        return total / row.Length;
    }

    public static int BrightestRow(int[][] picture)
    {
        int best = 0;
        for (int index = 0; index < picture.Length; index++)
        {
            if (RowBrightness(picture[index]) > RowBrightness(picture[best]))
            {
                best = index;
            }
        }
        return best;
    }
}
```

This program is meant to stop with an exception. Can you run it, and read
the report? Which line failed? Which line is responsible? You can write
both in the comments at the end.

```csharp exec
id: tracebacks-through-several-functions-1-program
expect: exception
int[][] first = { new int[] { 10, 20 }, new int[] { 200, 250 }, new int[] { 90, 90 } };
Console.WriteLine(Brightness.BrightestRow(first));
int[][] second = { new int[] { 10, 20 }, new int[0], new int[] { 90, 90 } };
Console.WriteLine(Brightness.BrightestRow(second));

// The line that failed:
// The line that is responsible:
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The line that failed is line 10 of `Brightness.cs`, `return total /
row.Length;`, in `RowBrightness`, with a `DivideByZeroException`. The row
has no values, so `row.Length` is 0, and a whole number cannot be divided
by zero. The line that is responsible is line 4 of `Program.cs`, because its
picture has an empty row, `new int[0]`.

Should `RowBrightness` refuse an empty row with an `ArgumentException` and
a clear message, as `Mean` did on
[Reusable methods](lesson:building-reusable-tools)? Or should the picture
never have had one? That is a question about the whole program, not about
one line.

</details>

## The dangerous kind

Logical errors hide better in bigger programs: inside a method, a loop, or
a condition written weeks ago. Here are three kinds that appear once
programs work with lists and methods. What does this one print?

```csharp exec
id: the-dangerous-kind-1
static bool HasVowel(string word)
{
    foreach (char letter in word)
    {
        if ("AEIOU".Contains(letter))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    return false;
}

Console.WriteLine($"{HasVowel("EGG")} {HasVowel("SKY")} {HasVowel("TREE")}");
```

```predict
type: choice

What will it print?

- True False True
  - EGG and TREE have vowels, and SKY has none.
- True False False
  - The method gives its answer after it has looked at one letter.
```

It prints `True False False`. `return` ends the method at once, so the
`else` stops the search after the first letter. T is not a vowel, and the
rest of TREE is never looked at. The method can say `false` only after
the loop, once every letter has been checked, so the `else` and its
`return false;` do not belong in the loop at all. The method gives the
answer you would expect for `"EGG"` and for `"SKY"`, which is why a bug
like this lasts.

The compiler did check one thing here. The next cell is the same method
without its last line, the `return false;` after the loop. It is meant to
fail. Which line do you think the message names?

```csharp exec
id: the-dangerous-kind-5
expect: CS0161
static bool HasVowel(string word)
{
    foreach (char letter in word)
    {
        if ("AEIOU".Contains(letter))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

Console.WriteLine(HasVowel("EGG"));
```

It does not compile: `error CS0161: 'HasVowel(string)': not all code paths
return a value`. The message names line 1, where the method starts, and
not a line inside it. A word with no letters never enters the loop, so the
method would reach its end with no answer to give. With the last line
there, every path has a `return`, and the compiler has nothing more to
object to. The compiler checks that every path gives an answer. It cannot
check that the answer is the one we meant.

The second kind changes something the caller did not expect to change.

```csharp exec
id: the-dangerous-kind-2
static int Median(int[] numbers)
{
    Array.Sort(numbers);
    return numbers[numbers.Length / 2];
}

int[] readings = { 30, 10, 20 };
Console.WriteLine(Median(readings));
Console.WriteLine(string.Join(", ", readings));
```

The median is 20, the middle value. But the caller's array is now in
order: 10, 20, 30. A change that a method makes outside itself, apart from
the value it returns, is called a *side effect*. An array is a reference
type, so `numbers` and `readings` are two names for one array, as on
[Grids and references](lesson:grids-and-references). If the order of
`readings` mattered (the time they were taken, say), it is now lost, and
nothing said so. A copy would have left it as it was, as on
[Sorting](lesson:putting-things-in-order): `int[] sorted =
numbers.ToArray();`, and then `Array.Sort(sorted);`.

The third kind changes a list while a loop uses it. `Remove(value)`
removes the first element equal to `value` from a list. This is meant to
remove every 0 from a row.

```csharp exec
id: the-dangerous-kind-3
expect: exception
List<int> row = new() { 0, 0, 255, 0 };
foreach (int value in row)
{
    if (value == 0)
    {
        row.Remove(value);
    }
}
Console.WriteLine(string.Join(", ", row));
```

```predict
type: choice

What will happen when you press Run?

- It prints 255
  - Each 0 is removed, and 255 stays.
- It prints 0, 255
  - The list moves under the loop, so the loop misses one 0.
- It stops with an exception
  - The loop and the list disagree about what comes next.
```

It stops with an `InvalidOperationException`, and it is meant to:
*Collection was modified; enumeration operation may not execute.* A
`foreach` cannot continue once its list has changed, because it can no
longer know which element comes next. That is kind: at least it says that
there is a problem. If you know Python: there, the same loop runs with no
message, and it misses one of the 0s, as the next cell does in C#.

A `for` loop with an index does not stop. `RemoveAt(i)` removes the
element at position `i`.

```csharp exec
id: the-dangerous-kind-4
List<int> row = new() { 0, 0, 255, 0 };
for (int i = 0; i < row.Count; i++)
{
    if (row[i] == 0)
    {
        row.RemoveAt(i);
    }
}
Console.WriteLine(string.Join(", ", row));
```

It prints `0, 255`. One 0 is still there. Each removal moves the rest of
the list one place towards the start, under the loop, so the loop skips
the element that moved into the gap. A new list is safer. Its loop only
reads `row`, and never changes it:

```csharp
List<int> kept = new();
foreach (int value in row)
{
    if (value != 0)
    {
        kept.Add(value);
    }
}
```

**This is why we check answers we already know.** Each of these gives an
answer that looks believable. Only an answer you can check for yourself,
on a case chosen to catch the bug, shows that it is not the answer you
meant.

### Your turn

The tests below use `Check`, the same method as on
[Reusable methods](lesson:building-reusable-tools), word for word. A class
does not carry from one page to another, so here it is again, in a cell
of its own. The cells below this one can use it (rule 2: a class written
in a cell can be used by the cells below it).

```csharp exec
id: the-dangerous-kind-check
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

When the two values are equal, the check *holds*, and `Check` does
nothing. When they differ, `Check` stops the program with an exception,
and its message is the claim, the value the claim expected and the value
the program found. **Compare with a solution**, under each task, runs the
tests cell with the inputs in its table. While a check of yours stops the
cell, the table can't show your values, and the note under it says so.

<div class="dl-world" data-world="secret-messages">

This method is meant to reverse a key, so that a code letter finds its
plain letter. It runs, and it gives an answer nobody meant. The cell under
it has one test, and that cell is meant to stop with an exception until
the method is fixed. Can you find the bug, and fix it in the class? Then,
can you add a test of your own, on a different key, that does not hold for
the first version?

```csharp exec
id: your-turn-1--secret-messages
file: KeyTools.cs
static class KeyTools
{
    /// <summary>Returns the key reversed: each value becomes a key.</summary>
    public static Dictionary<char, char> ReverseKey(Dictionary<char, char> key)
    {
        Dictionary<char, char> reverse = new();
        foreach (char letter in key.Keys)
        {
            reverse[letter] = key[letter];
        }
        return reverse;
    }
}
```

```csharp exec
id: your-turn-1-tests--secret-messages
expect: exception
Dictionary<char, char> key = new() { ['C'] = 'E' };
Dictionary<char, char> reverse = KeyTools.ReverseKey(key);
Test.Check("E in the reversed key", 'C', reverse.GetValueOrDefault('E', '?'));
// Your test:

Console.WriteLine("Every check held.");
```

```inputs
KeyTools.ReverseKey(new Dictionary<char, char> { ['A'] = 'Q', ['B'] = 'W' })
KeyTools.ReverseKey(new Dictionary<char, char>())     // an empty key
```

```hint
after: 1 runs
The key has C → E. Which letter should be the key in the reversed
dictionary, and which the value? Which one does the loop use as the key?
```

```solution
Dictionary<char, char> key = new() { ['C'] = 'E' };
Dictionary<char, char> reverse = KeyTools.ReverseKey(key);
Test.Check("E in the reversed key", 'C', reverse.GetValueOrDefault('E', '?'));
Dictionary<char, char> twoPairs = new() { ['A'] = 'Q', ['B'] = 'W' };
Test.Check("W in a reversed key of two pairs", 'B', KeyTools.ReverseKey(twoPairs).GetValueOrDefault('W', '?'));
Console.WriteLine("Every check held.");

static class KeyTools
{
    /// <summary>Returns the key reversed: each value becomes a key.</summary>
    public static Dictionary<char, char> ReverseKey(Dictionary<char, char> key)
    {
        Dictionary<char, char> reverse = new();
        foreach (char letter in key.Keys)
        {
            reverse[key[letter]] = letter;
        }
        return reverse;
    }
}
---
The first version copied the key as it was. On an empty key, both versions
return an empty dictionary, as the second row of the table shows, so a
check on an empty key holds for both, and cannot find the bug. A test
needs at least one pair, and a pair whose two letters differ. The solution
writes `KeyTools` again below its tests, and C# uses this one in place of
yours (rule 4).
```

</div>

<div class="dl-world" data-world="pixel-art">

This method is meant to count the lit pixels in a row. It runs, and it
gives an answer nobody meant. The cell under it has one test, and that
cell is meant to stop with an exception until the method is fixed. Can you
find the bug, and fix it in the class? Then, can you add a test of your
own, on a different row, that does not hold for the first version?

```csharp exec
id: your-turn-1--pixel-art
file: Pixels.cs
static class Pixels
{
    /// <summary>Returns how many pixels in the row are '#'.</summary>
    public static int LitCount(string row)
    {
        int count = 0;
        for (int index = 1; index < row.Length; index++)
        {
            if (row[index] == '#')
            {
                count = count + 1;
            }
        }
        return count;
    }
}
```

```csharp exec
id: your-turn-1-tests--pixel-art
expect: exception
Test.Check("LitCount of ###", 3, Pixels.LitCount("###"));
// Your test:

Console.WriteLine("Every check held.");
```

```inputs
Pixels.LitCount("#.#")
Pixels.LitCount(".##")
Pixels.LitCount("")
```

```hint
after: 1 runs
Which positions does the loop look at, for a row of three pixels? Which
position does a row start at?
```

```solution
Test.Check("LitCount of ###", 3, Pixels.LitCount("###"));
Test.Check("LitCount of #..", 1, Pixels.LitCount("#.."));
Console.WriteLine("Every check held.");

static class Pixels
{
    /// <summary>Returns how many pixels in the row are '#'.</summary>
    public static int LitCount(string row)
    {
        int count = 0;
        foreach (char pixel in row)
        {
            if (pixel == '#')
            {
                count = count + 1;
            }
        }
        return count;
    }
}
---
`index = 1` starts at position 1, so the first pixel, at position 0, is
never looked at. `".##"` gives 2 with the bug, the answer you would
expect, because its first pixel is dark: a check on it holds for both
versions. A test needs a row that starts lit. The solution writes `Pixels`
again below its tests, and C# uses this one in place of yours (rule 4).
```

</div>

## Debugging habits

When a program gives an answer nobody meant, and no message, where do we
start? Two habits help more than any others.

**The first habit: print the values in the middle.** This is meant to give
the average length of the words in a sentence: the number of letters,
divided by the number of words. `"MEET ME AT NOON"` has 12 letters in 4
words, so the average we mean is 3. What does it print?

```csharp exec
id: debugging-habits-1
static double AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        letters = letters + 1;
    }
    int words = sentence.Split(' ').Length;
    return (double)letters / words;    // (double) keeps the part after the point
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
```

It prints 3.75. Somewhere a number is not what we meant, but which? We can
make the program tell us. Here is the same method, with one
`Console.WriteLine` added just before the `return`. It prints each value
in the middle, with a label:

```csharp exec
id: debugging-habits-2
static double AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        letters = letters + 1;
    }
    int words = sentence.Split(' ').Length;
    Console.WriteLine($"letters: {letters}, words: {words}");
    return (double)letters / words;
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
```

```solution
static double AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        if (character != ' ')
        {
            letters = letters + 1;
        }
    }
    int words = sentence.Split(' ').Length;
    Console.WriteLine($"letters: {letters}, words: {words}");
    return (double)letters / words;
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
---
With the `if`, the loop counts a character only when it is not a space.
`letters` is 12 now, and the method gives 3.
```

`words` is 4, which is what we expect. `letters` is 15, and there are
only 12 letters. The loop counted the spaces too. Can you change the loop,
so that it adds 1 only when `character != ' '`? A label on each value
matters, because a column of bare numbers is hard to read. When the bug is
fixed, delete the extra line again.

What does the first program print if you delete `(double)`? Without it,
the method divides two whole numbers, and whole-number division drops the
part after the point. So it prints the answer we expected, from a count we
did not mean. One bug can hide behind another. That is one more reason to
look at the values in the middle, and not only at the answer.

**The second habit: test the small pieces.** A long method can hide a
mistake in many places. Short methods, each tested on its own with
`Check`, can each hide one in only a few. A check that does not hold
stops the program. Its report names the line of that check, and its claim
says which method the check tested.

### Your turn

This program draws a picture from brightness values, with three methods in
a class, `Drawing`. It runs, and it draws something nobody meant. The
first row should be `.-#`, and the second `#+.`.

```csharp exec
id: your-turn-2
file: Drawing.cs
static class Drawing
{
    public static char Shade(int value)
    {
        if (value >= 192)
        {
            return '#';
        }
        else if (value >= 128)
        {
            return '+';
        }
        else if (value >= 64)
        {
            return '-';
        }
        return '.';
    }

    public static string DrawRow(int[] row)
    {
        string line = "";
        foreach (int value in row)
        {
            line = Shade(value) + line;
        }
        return line;
    }

    public static void Draw(int[][] picture)
    {
        foreach (int[] row in picture)
        {
            Console.WriteLine(DrawRow(row));
        }
    }
}
```

The cell below the class draws the picture, and has one test of `Shade`.
Can you add tests to it, one at a time?

1. Test `Shade` on its own, with 200, 130, 100 and 0.
2. Test `DrawRow` on its own, with `{ 0, 100, 200 }`.
3. Which method has the bug? Can you fix it?

```csharp exec
id: your-turn-2-tests
int[][] picture = { new int[] { 0, 100, 200 }, new int[] { 255, 130, 10 } };
Drawing.Draw(picture);

Test.Check("Shade(200)", '#', Drawing.Shade(200));
// Your tests:

Console.WriteLine("Every check held.");
```

```inputs
Drawing.Shade(130)
Drawing.DrawRow(new int[] { 0, 100, 200 })
Drawing.DrawRow(new int[0])                 // an empty row
Drawing.DrawRow(new int[] { 200 })          // one pixel
Drawing.DrawRow(new int[] { 0, 200, 0 })    // the same both ways
```

```hint
after: 1 runs
Which of your checks does not hold? Which method does it test?
```

```hint
after: 3 runs
`Shade` gives what you would expect for all four values. Look at the line
inside the loop in `DrawRow`. At which end of `line` does each new
character appear?
```

```solution
int[][] picture = { new int[] { 0, 100, 200 }, new int[] { 255, 130, 10 } };
Drawing.Draw(picture);

Test.Check("Shade(200)", '#', Drawing.Shade(200));
Test.Check("Shade(130)", '+', Drawing.Shade(130));
Test.Check("Shade(100)", '-', Drawing.Shade(100));
Test.Check("Shade(0)", '.', Drawing.Shade(0));
Test.Check("DrawRow of 0, 100, 200", ".-#", Drawing.DrawRow(new int[] { 0, 100, 200 }));
Console.WriteLine("Every check held.");

static class Drawing
{
    public static char Shade(int value)
    {
        if (value >= 192)
        {
            return '#';
        }
        else if (value >= 128)
        {
            return '+';
        }
        else if (value >= 64)
        {
            return '-';
        }
        return '.';
    }

    public static string DrawRow(int[] row)
    {
        string line = "";
        foreach (int value in row)
        {
            line = line + Shade(value);
        }
        return line;
    }

    public static void Draw(int[][] picture)
    {
        foreach (int[] row in picture)
        {
            Console.WriteLine(DrawRow(row));
        }
    }
}
---
`Shade(value) + line` put each new character in front of the ones before
it, so every row was drawn backwards. `line + Shade(value)` puts it at the
end. An empty row, a row of one pixel, or a row that reads the same both
ways, such as `{ 0, 200, 0 }`, gives the same line with the bug, as the
last three rows of the table show. A check on those alone holds for both
versions. A test needs a row whose two ends differ. The solution writes
`Drawing` again below its tests, and C# uses this one in place of yours
(rule 4).
```

### The next step: a debugger

A `Console.WriteLine` shows one value, at one moment, and only the value
you chose to print. A *debugger* is a tool that pauses a program while it
runs, so that you can look at all its values, with nothing added to your
code. This page cannot pause a program. Visual Studio can, so you need a
computer with Visual Studio for this part. If you are not at one now, this
is a good place to stop, and to return to later.

1. Under the first program of "Debugging habits", the one that prints
   3.75, choose **Download project**. It saves a ZIP file. Unzip it.
2. In Visual Studio, choose **File**, then **Open**, then
   **Project/Solution**, and choose the file that ends in `.sln` in that
   folder. Open `Program.cs` from **Solution Explorer**, the panel that
   lists the project's files. It also lists a file for each class in the
   cells above, such as `Test.cs`, because a project holds every class
   that its program can use. `IrishCulture.cs` makes numbers look as they
   do on the page.
3. Click in the grey margin to the left of the line
   `letters = letters + 1;`. A red dot appears. This is a *breakpoint*: a
   mark on a line where the program pauses, just before the line runs. (F9
   adds or removes a breakpoint on the line where the cursor is.)
4. Press F5 to start the program with the debugger. The program pauses at
   the breakpoint, and a yellow arrow points at the line that runs next.
5. Look at the **Locals** window. If it is not on the screen, choose
   **Debug**, then **Windows**, then **Locals**. It lists the variables of
   the method that is running, with their values. What are `character`
   and `letters`?
6. Press F5 to continue. The program pauses at the breakpoint again, one
   character later. Continue until `character` is a space. What is
   `letters` then? What will it be after the line runs?
7. Press Shift+F5 to stop the program. This is **Stop Debugging**.

<details class="dl-answer"><summary>what the debugger shows</summary>

At the first pause, `character` is `'M'`, and `letters` has not counted
anything yet, because the line has not run. At each pause after that,
`letters` is one more. When `character` is `' '`, a space, `letters` is
the number of letters in MEET. The line runs for the space too, so after
it, `letters` has counted the space as a letter. That is how `letters`
reached 15 in the second program, and here you see it happen without a
single `Console.WriteLine`.

</details>

Two more keys run a program one line at a time, which is called
*stepping*. Remove the breakpoint (click the red dot), and put one on the
last line, `Console.WriteLine(AverageWordLength("MEET ME AT NOON"));`.
Press F5, and the program pauses there.

- F11 is **Step Into**. The line calls a method of yours,
  `AverageWordLength`, so F11 pauses at the first line inside it. You can
  follow the call.
- F10 is **Step Over**. It runs one whole line, with any method that the
  line calls, and pauses at the next line. Press it a few times inside the
  method, and watch the Locals window change.

The **Call Stack** window (**Debug**, then **Windows**, then **Call
Stack**) lists the calls that are running, the most recent at the top. It
is the same list as in an exception report, while the program is still
running. And when an exception stops a program in the debugger, Visual
Studio pauses at the line that failed, with the exception's name and
message beside it.

## Looking back

Which of this page's bugs did the compiler find before the program ran?
Which would a test have caught first, and which would only a person
reading the output notice? What does that say about the tests worth
writing?

Here is a challenge. This program has three bugs, and it runs. On this
picture, it even prints the row you would choose. The comment says what it
is meant to do. Can you find all three? For each one, can you write a
check with `Test.Check` that does not hold until that bug is fixed? The
challenge opens in a new notebook, with no cells above it, so it brings
its own copy of `Test`, at the end.

```csharp challenge
// Busiest returns the position of the first row with the most '#' in it.
static int LitCount(string row)
{
    int count = 0;
    for (int index = 0; index < row.Length - 1; index++)
    {
        if (row[index] == '#')
        {
            count = count + 1;
        }
    }
    return count;
}

static int Busiest(string[] picture)
{
    int best = 0;
    for (int i = 1; i < picture.Length - 1; i++)
    {
        if (LitCount(picture[i]) >= LitCount(picture[best]))
        {
            best = i;
        }
    }
    return best;
}

string[] picture = { "#..#", "####", "##..", "...." };
Console.WriteLine(picture[Busiest(picture)]);

// Your checks here

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

Everything on this page runs here, in the browser, except the debugger.
The debugger needs Visual Studio, and the steps in "The next step: a
debugger" are all you need to start.

The next page, [Programming languages](lesson:how-we-got-here), leaves our
own programs for a while. It looks at the people who made programming
possible, and at what the machine underneath is doing.

The [practice page](lesson:when-it-goes-wrong-practice) has more bugs to
find, and three problems from earlier pages.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Evans, J. (2022). *The Pocket Guide to Debugging*. Wizard Zines.
<https://wizardzines.com/zines/debugging-guide/>. It is short and
illustrated. It is full of the habits on this page, and many more, from
someone who debugs for a living.

Microsoft. *Tutorial: Debug C# code and inspect data*.
<https://learn.microsoft.com/visualstudio/get-started/csharp/tutorial-debugger>.
It shows breakpoints, stepping, the Locals window and the Call Stack, one
step at a time, with pictures, and a few more tools besides. Its program
is written inside a `Main` method, as older programs are, and the steps
are the same.
