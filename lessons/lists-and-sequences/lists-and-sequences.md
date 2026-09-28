---
title: "Arrays and lists: many values under one name"
version: 2026.09.28.1
from: lists-and-sequences
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4, PDP-LO6]
---

# Arrays and lists: many values under one name

Here is a message, kept as an array of words. What do you think the
program prints? Run it and see.

```csharp exec
id: a-list-of-words-1
string[] words = { "MEET", "ME", "AT", "NOON" };
Console.WriteLine(words[1]);
```

It prints `ME`. The array keeps four words under one name, in order, and
C# counts their positions from 0. Most programs work with many values,
not one: every letter of a message, every pixel in a row of a picture. On
this page we keep them in arrays and lists, choose the ones we want, and
do something with each one in turn.

## Arrays: ordered collections

An *array* is a row of values of one type, kept in order under one name.
Each value in it is an *element*. An array is a *collection*: one value
that holds many others. An array's type is the type of its elements with
square brackets after it: `string[]` is an array of strings, and `int[]`
is an array of whole numbers. The elements go between curly brackets,
with commas between them. `Length` gives the number of elements, as it
gave the number of characters in a string.

What will the last line of this cell print?

```csharp exec
id: lists-ordered-collections-1
string[] words = { "MEET", "ME", "AT", "NOON" };
Console.WriteLine(words.Length);
Console.WriteLine(words);
```

```predict
type: choice

What will the last line print?

- MEET ME AT NOON
  - `Console.WriteLine` prints the four words, one after another.
- { "MEET", "ME", "AT", "NOON" }
  - It prints the array the way the code wrote it.
- System.String[]
  - It prints the name of the array's type.
```

The first line is 4. The last line is `System.String[]`, the name of the
array's type: `System.String` is .NET's full name for C#'s `string`.
`Console.WriteLine` knows how to print a number, a character, a string or
a `bool`. An array can hold any number of values, and `Console.WriteLine`
does not choose a way to print them all. So it prints the name of the
type.

To see the elements, `string.Join` makes one string from them. The string
before the array, in the brackets, is the *separator*: it goes between
each pair of elements.

```csharp exec
id: printing-an-array-1
string[] words = { "MEET", "ME", "AT", "NOON" };
Console.WriteLine(string.Join(", ", words));
Console.WriteLine(string.Join(" ", words));
Console.WriteLine(string.Join("", words));
```

One kind of array is different. In the next cell, `letters` is an array
of `char`, because each element is one character. Each element goes in
single quotes, as a `char` does. What do you think
`Console.WriteLine(letters)` prints?

```csharp exec
id: printing-an-array-2
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(letters);
Console.WriteLine(string.Join(" ", letters));
```

It prints `ALGORITHMS`: the characters side by side, as text. An array of
`char` is the one kind of array that `Console.WriteLine` prints this way.
`string.Join` still puts its separator between them. The rest of this page
prints arrays with `string.Join`, whatever their type.

### Indexes

Each element has a position, called its *index*. The first element is at
index 0, so the last of ten is at index 9. Counting from 0 like this is
called *zero-based indexing*. An index in square brackets, after the
array's name, chooses one element. A `^` before the number counts from the
end: `^1` is the last element, and `^2` is the one before it.

```csharp exec
id: lists-ordered-collections-2
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(letters[0]);                   // the first element
Console.WriteLine(letters[9]);                   // the last of ten
Console.WriteLine(letters[letters.Length - 1]);  // the last, for any length
Console.WriteLine(letters[^1]);                  // the last, counted from the end
Console.WriteLine(letters[^2]);                  // the one before it
```

What happens if you ask for `letters[10]`? The next cell does. It is meant
to stop with an exception. Will it print anything first?

```csharp exec
id: indexes-1
expect: exception
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(letters[9]);
Console.WriteLine(letters[10]);
```

It prints `S`, the element at index 9. Then it stops, and the page shows
this report:

```console
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
   at line 3 of Program.cs
```

There is no element 10, so the program cannot complete line 3. A *bound*
is a limit. An array's bounds are its first index and its last, and 10 is
past the last. [Exceptions](lesson:reading-an-error-message) shows how to
read a report like this one.

<details class="dl-why"><summary>Why count from 0?</summary>

An index says how far an element is from the start of the array. The
first element is at the start, 0 places along. `S` has nine letters
before it, so it is 9 places along, and `letters[9]` is `S`.

In the computer's memory, the elements of an array are kept side by side,
in order. To find `letters[9]`, the computer starts at the first element
and moves 9 places. The language C, from the early 1970s, counted this
way, and C#, Java and Python kept it.

It also fits the for loops from [Loops](lesson:repeating-yourself).
`for (int i = 0; i < letters.Length; i++)` gives `i` ten values, 0 to 9:
one for each index, with nothing to add or subtract.

</details>

A string can be indexed in the same way, and each element is a `char`.
[Variables and types](lesson:storing-and-computing) used `word[0]` for the
first letter of a word, and `word[^1]` is its last letter.

### Taking a range

A *range* takes a part of an array, and gives it as a new array. It is
written in the square brackets, as two numbers with two dots between them.
(Some languages call this a *slice*.) What will this cell print?

```csharp exec
id: lists-ordered-collections-3
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(string.Join(" ", letters[2..5]));
```

```predict
type: choice

What will it print?

- G O R
  - A range stops before its second number.
- G O R I
  - From index 2 to index 5 is four letters: 2, 3, 4 and 5.
- L G O R
  - Counting from 1, the second letter is L.
```

From 2 to 5 looks like four elements, and there are three. The two
numbers do not point at elements. They point at the gaps between them.

```csharp exec
id: lists-ordered-collections-4
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
Console.WriteLine(string.Join(" ", letters[2..5]));
Console.WriteLine(string.Join(" ", letters[..3]));    // no first number: from the start
Console.WriteLine(string.Join(" ", letters[7..]));    // no second number: to the end
Console.WriteLine(string.Join(" ", letters[^3..]));   // from 3 before the end, to the end
```

![The ten letters A, L, G, O, R, I, T, H, M and S in a row. Above each one is its index, 0 to 9. Below, on the boundaries between the letters, are the eleven cuts, numbered 0 to 10 from the start, and under those numbers the same cuts numbered from the end, ^10 to ^0. Underneath, each of three ranges is drawn as a band between the two cuts it names: 2..5 takes G, O and R; ..3 takes A, L and G; and 7.., which is the same as ^3.., takes H, M and S.](where-the-cuts-are.svg)

Ten elements have eleven places to cut. A range names two of those places
and takes everything between them. So `letters[2..5]` means "cut before
G, cut before I, and keep the middle", and that is three letters. No
special rule removes the element at index 5. A cut is a gap, and there is
nothing in a gap to take.

The cuts have numbers from the end too, under the others in the picture.
`^3` is the cut three places before the end, so `letters[^3..]` takes the
last three letters, the same as `letters[7..]`. An index names the cut
just before its element. `letters[3]` is the element after cut 3, and
`letters[^1]` is the element after cut `^1`.

The picture also shows why `letters[..3]` and `letters[3..]` make the
whole array again when they are joined, with nothing missing and nothing
repeated. Both meet at the same cut. Can you change the numbers in the
ranges, and see which letters each one takes?

## Changing an array, and a list that grows

An element of an array can be changed after the array is made. The
program gives it a new value with `=`, as it would a variable.

```csharp exec
id: changing-an-array-1
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
letters[0] = 'a';      // replace the first element
Console.WriteLine(string.Join(" ", letters));
Console.WriteLine(letters.Length);
```

The first letter is now `a`, and there are still 10. An array's length is
fixed when the array is made, so an array cannot grow. The next cell tries
to add an element at the end of `letters`, and it is meant not to compile.
What does the compiler say?

```csharp exec
id: changing-an-array-2
expect: CS1061
char[] letters = { 'A', 'L', 'G', 'O', 'R', 'I', 'T', 'H', 'M', 'S' };
letters.Add('!');
Console.WriteLine(string.Join(" ", letters));
```

It did not compile, so nothing ran. The message starts like this:

```console
Program.cs(2,9): error CS1061: 'char[]' does not contain a definition for 'Add'
```

The rest of the message says where else the compiler looked for an `Add`.
An array has no `Add`, because it cannot grow.

For values that grow, C# has a second collection. A *list* is like an
array whose length can change. `List<string>` is a list of strings: the
type of its elements goes between `<` and `>`. `new()` makes a new list,
and the elements it starts with go between curly brackets after it.

```csharp exec
id: changing-a-list-1
List<string> words = new() { "MEET", "ME", "AT", "NOON" };
words[3] = "SIX";      // replace the last element
Console.WriteLine(string.Join(" ", words));
words.Add("TODAY");    // add one element at the end
Console.WriteLine(string.Join(" ", words));
Console.WriteLine(words.Count);
```

`Add` puts one element at the end of a list. It changes that list, and
gives nothing back. A list's elements are numbered from 0, as an array's
are, and `^1` and ranges work on a list in the same way. A list's number
of elements is `Count`, not `Length`: here it is 5. What do you think
`Console.WriteLine(words);` prints for a list? Can you add it at the end,
and see? This page prints lists with `string.Join`, as it does arrays.

A value that can be changed after it is made is *mutable*. Arrays and
lists are both mutable. A string can be indexed like an array. Can it be
changed like one? Whatever happens when you run the next cell is meant to
happen, and nothing is broken.

```csharp exec
id: changing-a-list-2
expect: CS0200
string word = "NOON";
word[0] = 'M';
Console.WriteLine(word);
```

```predict
type: choice

What will happen when you press Run?

- It prints MOON
  - A string is indexed like an array, so it changes like one.
- It prints NOON
  - C# leaves the string as it was, and continues.
- It does not compile, so nothing runs
  - A string cannot be changed once it is made.
```

This cell is meant to fail. It did not compile, so nothing ran. The
compiler's message is:

```console
Program.cs(2,1): error CS0200: Property or indexer 'string.this[int]' cannot be assigned to -- it is read only
```

*Read only* means that code can read it, but cannot change it. A string is
*immutable*: once it is made, it cannot be changed. To get MOON, build a
new string from pieces of the old one. A range works on a string too, and
gives a string, so `"M" + word[1..]` is one way to build it. Problem 4 on
the [practice page](lesson:lists-and-sequences-practice#4-moon-from-noon)
asks you to try it.

### Your turn

<div class="dl-world" data-world="secret-messages">

A spy's message is kept as a list of words. The meeting place has moved.
Can you change `"BRIDGE"` to `"STATION"`, and add `"TONIGHT"` at the end?
Then can you print the first word, the last word, and a range that takes
`BY`, `THE` and `STATION`?

```csharp exec
id: your-turn-1--secret-messages
List<string> message = new() { "MEET", "ME", "BY", "THE", "BRIDGE" };

Console.WriteLine(string.Join(" ", message));
```

```inputs
message
```

```hint
after: 1 runs
Which index is `"BRIDGE"` at? And which cut comes just before `BY`, and
which just after `STATION`?
```

```solution
List<string> message = new() { "MEET", "ME", "BY", "THE", "BRIDGE" };
message[4] = "STATION";
message.Add("TONIGHT");
Console.WriteLine(message[0]);
Console.WriteLine(message[^1]);
Console.WriteLine(string.Join(" ", message[2..5]));
Console.WriteLine(string.Join(" ", message));
---
`message[^1]` finds the last word however long the message grows, so
nobody has to count the words.
```

</div>

<div class="dl-world" data-world="pixel-art">

A row of a picture is kept as a list of brightnesses, from 0 for black to
255 for white. Can you print the three pixels in the middle of the row?
Then can you make the first pixel white, add a black pixel at the end, and
print the row?

```csharp exec
id: your-turn-1--pixel-art
List<int> row = new() { 0, 40, 80, 120, 160, 200, 240 };

Console.WriteLine(string.Join(" ", row));
```

```inputs
row
```

```hint
after: 1 runs
Seven pixels have eight cuts, from 0 to 7. Which two cuts are on either
side of the middle three?
```

```solution
List<int> row = new() { 0, 40, 80, 120, 160, 200, 240 };
Console.WriteLine(string.Join(" ", row[2..5]));
row[0] = 255;
row.Add(0);
Console.WriteLine(string.Join(" ", row));
---
The middle three are `80 120 160`. Printing them first matters: after
`Add`, the row has eight pixels, and no three are in the middle.
```

</div>

## Building lists with loops

An empty list, `new()` with nothing after it, can be filled one element
at a time. Here a loop builds the alphabet, with the cast from
[Variables and types](lesson:storing-and-computing). How long do you think
the list will be?

```csharp exec
id: building-lists-with-loops-1
List<char> alphabet = new();
for (int number = 0; number < 26; number++)
{
    alphabet.Add((char)('A' + number));
}
Console.WriteLine(string.Join(" ", alphabet));
Console.WriteLine(alphabet.Count);
```

It is 26 long, from A to Z. This is the accumulator pattern from
[Loops](lesson:repeating-yourself), with a list where the total was. The
list starts empty, and gets one more element each time the loop runs its
body: one letter for each value of `number`.

An array cannot grow in this way, because its length is fixed when it is
made. A list is the collection to use when a program does not know, before
it starts, how many elements it will need.

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you build `shifted`, the alphabet moved three places along, so that it
starts `D`, `E`, `F` and ends `A`, `B`, `C`? Kept beside the plain
alphabet, it changes a message into code, one letter at a time.

```csharp exec
id: your-turn-2--secret-messages
int shift = 3;
List<char> shifted = new();

Console.WriteLine($"A shift of {shift}:");
Console.WriteLine(string.Join(" ", shifted));
```

```inputs
shifted
```

```hint
after: 1 runs
The letter at position `number` moves to position `(number + shift) % 26`.
Which letter is at that position?
```

```solution
int shift = 3;
List<char> shifted = new();
for (int number = 0; number < 26; number++)
{
    shifted.Add((char)((number + shift) % 26 + 'A'));
}
Console.WriteLine($"A shift of {shift}:");
Console.WriteLine(string.Join(" ", shifted));
---
For X, Y and Z, `number + shift` is past the last position, and `% 26`
makes it start again at 0. So the list ends with A, B and C. Can you try a
shift of 13? Find a letter in the alphabet, and read the letter in the
same place in `shifted`. Then do the same with that letter. What do you
get?
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you build `fade`, a row of 11 pixels that goes from black towards
white in equal steps: 0, 25, 50, and so on, to 250?

```csharp exec
id: your-turn-2--pixel-art
List<int> fade = new();

Console.WriteLine($"{fade.Count} pixels:");
Console.WriteLine(string.Join(" ", fade));
```

```inputs
fade
```

```hint
after: 1 runs
Eleven pixels means eleven times through the loop. What is pixel number
`step` worth, if each step adds 25?
```

```solution
title: counting the steps
List<int> fade = new();
for (int step = 0; step < 11; step++)
{
    fade.Add(step * 25);
}
Console.WriteLine($"{fade.Count} pixels:");
Console.WriteLine(string.Join(" ", fade));
---
Pixel number `step` is worth `step * 25`, so eleven steps give 0 to 250.
```

```solution
title: counting in 25s
List<int> fade = new();
for (int value = 0; value <= 250; value += 25)
{
    fade.Add(value);
}
Console.WriteLine($"{fade.Count} pixels:");
Console.WriteLine(string.Join(" ", fade));
---
This loop adds 25 to its counter each time, and gives the same eleven
numbers. Its condition is `value <= 250`, so that it includes 250.
```

</div>

## Looping over arrays and lists

[Loops](lesson:repeating-yourself) used `foreach` to take the characters
of a string one at a time. `foreach` takes the elements of an array or a
list in the same way: one at a time, in order.

```csharp exec
id: looping-over-lists-1
string[] words = "MEET ME AT NOON".Split(' ');
foreach (string word in words)
{
    Console.WriteLine($"{word} {word.Length}");
}
```

`Split(' ')` cuts a string into an array of strings, wherever it finds the
character in the brackets. Here that is a space, so
`"MEET ME AT NOON".Split(' ')` gives the same four words as the array at
the top of this page.

Sometimes we need the index as well as the element. A for loop can count
the indexes, one at a time, and use each one to get its element.

```csharp exec
id: looping-over-lists-2
string[] words = { "MEET", "ME", "AT", "NOON" };
for (int index = 0; index < words.Length; index++)
{
    Console.WriteLine($"{index} {words[index]}");
}
```

What would you change to number the words from 1 instead of 0? Can you
try it?

<details class="dl-answer"><summary>What each line does</summary>

- `int index = 0` starts at the first index.
- `index < words.Length` stops the loop after the last index.
  `words.Length` is 4, and the last index is 3.
- `words[index]` is the element at that index.
- To number the words from 1, print `{index + 1}` in place of `{index}`.
  The words stay the same, because `words[index]` still counts from 0.

</details>

There is a second way to get the same pairs: a `foreach` loop, with a
counter of its own.

```csharp exec
id: looping-over-lists-3
string[] words = { "MEET", "ME", "AT", "NOON" };
int index = 0;
foreach (string word in words)
{
    Console.WriteLine($"{index} {word}");
    index++;
}
```

Both loops print the same thing. The for loop says what it means more
plainly, because the index is part of the loop. Use `foreach` when a loop
needs only the elements. Loop by index when it needs the index too, or
another element as well, such as the next one, at `index + 1`.

### Your turn

<div class="dl-world" data-world="secret-messages">

Where does the letter E appear in this message? Can you build `places`, a
list of the index of every E?

```csharp exec
id: your-turn-3--secret-messages
string message = "MEET ME BY THE OLD TREE";
List<int> places = new();

Console.WriteLine($"Where E is in {message}:");
Console.WriteLine(string.Join(", ", places));
```

```inputs
places
```

```hint
after: 1 runs
A for loop can count the indexes of a string too, from 0 to one less than
its `Length`. When the character at `index` is an E, what goes
into `places`?
```

```hint
after: 1 errors
Does the message say CS0019? A `char` and a `string` cannot be compared
with `==`. A single character goes in single quotes: `'E'`.
```

```solution
string message = "MEET ME BY THE OLD TREE";
List<int> places = new();
for (int index = 0; index < message.Length; index++)
{
    if (message[index] == 'E')
    {
        places.Add(index);
    }
}
Console.WriteLine($"Where E is in {message}:");
Console.WriteLine(string.Join(", ", places));
---
There are six, at `1, 2, 6, 13, 21, 22`. The spaces have positions too,
which is why the second word's E is at 6.
```

</div>

<div class="dl-world" data-world="pixel-art">

Which pixel in this row is the brightest? Can you set `brightest` to its
index, with a loop?

```csharp exec
id: your-turn-3--pixel-art
int[] row = { 30, 90, 250, 120, 250, 60 };
int brightest = 0;

Console.WriteLine(brightest);
```

```inputs
brightest
```

```hint
after: 1 runs
Keep the index of the brightest pixel so far. Each time, is this pixel
brighter than the one at that index?
```

```solution
title: keeping the first
int[] row = { 30, 90, 250, 120, 250, 60 };
int brightest = 0;
for (int index = 0; index < row.Length; index++)
{
    if (row[index] > row[brightest])
    {
        brightest = index;
    }
}
Console.WriteLine(brightest);
---
It prints 2. Two pixels are 250, and `>` keeps the first one it finds.
```

```solution
title: keeping the last
int[] row = { 30, 90, 250, 120, 250, 60 };
int brightest = 0;
for (int index = 0; index < row.Length; index++)
{
    if (row[index] >= row[brightest])
    {
        brightest = index;
    }
}
Console.WriteLine(brightest);
---
It prints 4. With `>=`, a pixel as bright as the brightest so far replaces
it, so the loop keeps the last 250. The question did not say which one it
wanted, so the code decides. It is worth saying which one it chose.
```

</div>

### Your turn: adding up an array

<div class="dl-world" data-world="secret-messages">

How many letters does this message have, not counting the spaces between
the words? Can you find `total` with a loop?

```csharp exec
id: your-turn-4--secret-messages
string[] words = { "MEET", "ME", "BY", "THE", "OLD", "TREE" };
int total = 0;

Console.WriteLine(total);
```

```inputs
total
```

```hint
after: 1 runs
Which loop takes each word in turn? What does its body add to `total`?
```

```solution
string[] words = { "MEET", "ME", "BY", "THE", "OLD", "TREE" };
int total = 0;
foreach (string word in words)
{
    total += word.Length;
}
Console.WriteLine(total);
---
18. Each time, the loop adds one word's length to the running total.
```

</div>

<div class="dl-world" data-world="pixel-art">

What is the average brightness of this row? Can you find `average` with a
loop? Is the row closer to `#` or to `.`, if `#` is 128 or more?

```csharp exec
id: your-turn-4--pixel-art
int[] row = { 30, 90, 250, 120, 250, 60 };
int total = 0;
double average = 0;

Console.WriteLine($"Total {total}, average {average}");
```

```inputs
average
```

```hint
after: 1 runs
Which loop takes each pixel in turn? What does its body add to `total`?
And what do you divide `total` by?
```

```hint
after: 2 runs
Does your average have nothing after the point? `total` and `row.Length`
are both `int`, and `/` with two `int` values gives an `int`. The cast
`(double)` before `total` keeps the part after the point.
```

```solution
int[] row = { 30, 90, 250, 120, 250, 60 };
int total = 0;
double average = 0;
foreach (int value in row)
{
    total += value;
}
average = (double)total / row.Length;
Console.WriteLine($"Total {total}, average {average}");
---
The total is 800, and the average is 133.33333333333334, about 133.3, so
the row as a whole is `#`. Dividing by `row.Length`, and not by 6, means
the code still works when the row changes length.
```

</div>

## Looking back

A range stops before its second number, and so does a for loop with `<`.
So `letters[0..letters.Length]` takes the whole array, and
`for (int i = 0; i < letters.Length; i++)` gives every index of it. What
would happen if one of them stopped *at* its second number instead?

An array keeps its length, and a list can grow. When would you choose each
one?

A challenge: a rail-fence cipher writes a message's letters in a zigzag
across two rails, then reads the top rail and then the bottom. The letters
at even indexes go on the top rail, and the rest on the bottom. Can you
code a message this way with a loop? Can you decode it again?

```csharp challenge
// A rail-fence cipher: even indexes on the top rail, odd on the bottom.
string message = "MEETMEATNOON";
Console.WriteLine($"Plain: {message}");
List<char> top = new();
List<char> bottom = new();
// Fill the two rails with a loop, then join them into one coded message.
// Can you get the message back from the coded one?
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:lists-and-sequences-practice) has more
problems about arrays and lists. After it,
[Grids and references](lesson:grids-and-references) keeps a whole picture
in an array of arrays, and shows what happens when two names share one
array.

## Where to read more

Microsoft. *The array reference type (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/arrays>.
This page describes how C# makes and uses arrays, with examples. It also
describes arrays with more than one dimension, which
[Grids and references](lesson:grids-and-references) uses. Many of its
examples write an array's elements between square brackets, `[1, 2, 3]`,
where this page writes `{ 1, 2, 3 }`. C# accepts both.

Microsoft. *Explore ranges of data using indices and ranges.*
<https://learn.microsoft.com/dotnet/csharp/tutorials/ranges-indexes>.
This page explains `^` and `..`. Its first example lists each element with
its index from the start and from the end. It says that a list does not
support ranges. That was true before .NET 8. This page, and a project you
download from it, use .NET 10, where a list has ranges too.

Reducible (2019). *What if you had to invent a dynamic array?*
<https://www.youtube.com/watch?v=5AllG-i_yto>. A *dynamic array* is an
array that can grow, and a C# list is one. A list keeps its elements in
an ordinary array. When that array is full, the list makes a bigger one
and copies the elements into it. This video shows why adding at the end
stays quick, however long the list grows.
