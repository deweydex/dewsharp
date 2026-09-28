---
title: "Searching: practice"
version: 2026.09.28.1
from: finding-things-practice
practice_for: finding-things
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Searching: practice

These problems are on searching, with three from earlier pages. Several ask
you to count comparisons without writing code. Can you try those on paper
first? Each of them has a cell under it, so that you can check your
answers when you have them. Try each problem before you run its cell or
open anything under it. One cell is meant not to compile, and the problem
says so.

## 1. Why -1

Why does `LinearSearch` return -1 when the target is not there, and not 0?

<details class="dl-answer"><summary>answer</summary>

0 is a real index: the first element. A search that returned 0 for "not
there" would look the same as one that found the target first. -1 is never
an index, so it can only mean "not there".

If a program forgets to check, and uses the -1 as an index, it stops with
an `IndexOutOfRangeException`, as `numbers[-1]` did in problem 1 of
[the practice page about arrays and lists](lesson:lists-and-sequences-practice).
Some languages, Python among them, read -1 as the last element, so there
the same slip gives an answer and no message.

</details>

## 2. Counting looks

Linear search checks an array of 100 items, one at a time. How many
comparisons does it make when the target is first? When it is last? When
it is not there? And on average, when the target is there and is equally
likely to be anywhere?

When you have your answers, this cell counts the comparisons, with
`LinearSearchCounted` from the lesson, in an array that holds the numbers
1 to 100.

```csharp exec
id: counting-looks-1
static int LinearSearchCounted(int[] items, int target)
{
    int comparisons = 0;
    for (int index = 0; index < items.Length; index++)
    {
        comparisons++;
        if (items[index] == target)
        {
            return comparisons;
        }
    }
    return comparisons;
}

int[] items = new int[100];
for (int index = 0; index < items.Length; index++)
{
    items[index] = index + 1;
}
Console.WriteLine($"First: {LinearSearchCounted(items, 1)}");
Console.WriteLine($"Last: {LinearSearchCounted(items, 100)}");
Console.WriteLine($"Not there: {LinearSearchCounted(items, 500)}");
int total = 0;
foreach (int target in items)
{
    total += LinearSearchCounted(items, target);
}
Console.WriteLine($"On average: {total / 100.0}");
```

<details class="dl-answer"><summary>answer</summary>

It makes 1, 100 and 100. On average, it checks about half the array:
(1 + 2 + … + 100) / 100 = 50.5. A target that is not there is the worst
case, because linear search has to check everything before it can say no.

</details>

## 3. The last one

Can you write `LastIndex(int[] items, int target)`, which gives the index
of the *last* place the target appears, or -1?

```csharp exec
id: the-last-one-1
static int LastIndex(int[] items, int target)
{
    // Your code
    return -1;
}

int[] numbers = { 4, 2, 4, 4, 1 };
Console.WriteLine(LastIndex(numbers, 4));
```

```inputs
LastIndex(numbers, 4)
LastIndex(numbers, 1)
LastIndex(numbers, 9)        // not there
LastIndex(new int[0], 4)     // an empty array
```

```hint
after: 1 runs
When the loop finds the target, could it remember the index and continue?
Or could the loop start at the end?
```

```solution
title: with what you've met so far
static int LastIndex(int[] items, int target)
{
    int found = -1;
    for (int index = 0; index < items.Length; index++)
    {
        if (items[index] == target)
        {
            found = index;
        }
    }
    return found;
}

int[] numbers = { 4, 2, 4, 4, 1 };
Console.WriteLine(LastIndex(numbers, 4));
---
This one continues to the end of the array, and remembers the latest
match.
```

```solution
title: another way
static int LastIndex(int[] items, int target)
{
    for (int index = items.Length - 1; index >= 0; index--)
    {
        if (items[index] == target)
        {
            return index;
        }
    }
    return -1;
}

int[] numbers = { 4, 2, 4, 4, 1 };
Console.WriteLine(LastIndex(numbers, 4));
Console.WriteLine(Array.LastIndexOf(numbers, 4));
---
Searching from the end can stop at the first match it meets, which is the
last one in the array. C# has this search already: the last line uses
`Array.LastIndexOf`, and gives 3 too.
```

## 4. A trace

We use binary search to find 72 in
`{ 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 }`. Which
indexes does it check, in order? Can you try it on paper? Then this cell,
the lesson's binary search with one line added, prints each index as it
checks it.

```csharp exec
id: a-trace-1
int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
int target = 72;
int low = 0;
int high = sortedNumbers.Length - 1;
while (low <= high)
{
    int mid = (low + high) / 2;
    Console.WriteLine($"low {low}, high {high}: index {mid}, which holds {sortedNumbers[mid]}");
    if (sortedNumbers[mid] == target)
    {
        break;
    }
    else if (target < sortedNumbers[mid])
    {
        high = mid - 1;
    }
    else
    {
        low = mid + 1;
    }
}
```

<details class="dl-answer"><summary>answer</summary>

It checks index 7, then 11, then 13. At index 7 it finds 31, and 72 is
larger, so `low` becomes 8. The middle of 8 and 14 is 11, which holds 55,
so `low` becomes 12. The middle of 12 and 14 is 13, and that holds 72.
That makes three looks.

</details>

## 5. Not sorted

This is the binary search from the lesson. The array it searches is not
in order.

```csharp exec
id: not-sorted-1
static int BinarySearch(int[] items, int target)
{
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        if (items[mid] == target)
        {
            return mid;
        }
        else if (target < items[mid])
        {
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    return -1;
}

int[] numbers = { 5, 1, 9, 3, 7 };
Console.WriteLine(BinarySearch(numbers, 3));
```

```predict
type: choice

What will it print?

- 3
  - 3 is at index 3, and binary search finds it.
- -1
  - Binary search ignores half of the array, and 3 might be in that half.
- It stops with an exception
  - Binary search cannot run on an array that is not sorted.
```

<details class="dl-answer"><summary>why</summary>

It prints -1, and there is no exception. The middle element is 9, and 3
is smaller, so binary search keeps only the elements before 9: 5 and 1.
3 is smaller than 5 too, and then nothing is left. But 3 is in the array,
after 9.

On an array that is not sorted, binary search can say "not there" about a
target that is there, and nothing warns you. Nothing in the method checks
the order. The code that calls it must do that.

</details>

## 6. A middle with a point

Binary search finds the middle with `(low + high) / 2`. What do these two
lines print? Which of the two numbers could be an index?

```csharp exec
id: a-middle-with-a-point-1
int low = 0;
int high = 13;
Console.WriteLine((low + high) / 2);
Console.WriteLine((low + high) / 2.0);
```

Some languages always give a number with a point when they divide, so a
binary search in those languages finds the middle another way. What
happens if a C# binary search keeps the number with a point? The next cell
is meant to fail.

```csharp exec
id: a-middle-with-a-point-2
expect: CS0266
int low = 0;
int high = 13;
int mid = (low + high) / 2.0;
Console.WriteLine(mid);
```

<details class="dl-answer"><summary>answer</summary>

The first cell prints 6, then 6.5. Only 6 could be an index: an array has
an element 6, and no element 6.5.

The second cell does not compile, so nothing runs. The message is:

```console
Program.cs(3,11): error CS0266: Cannot implicitly convert type 'double' to 'int'. An explicit conversion exists (are you missing a cast?)
```

`2.0` is a `double`, so `/` gives a `double`. C# will not put a `double`
into an `int` by itself, because the part after the point would be lost.
With `/ 2`, both numbers are whole, so `/` gives a whole number, and the
middle can be used as an index.

</details>

## 7. A middle that overflows

In a very long array, `low` and `high` can both be large numbers. An `int`
holds whole numbers up to 2,147,483,647, `int.MaxValue`, as the page
*Types and their sizes* showed. The first line of this cell prints it. In
the cell, `low` is 2,000,000,000 and `high` is 2,100,000,000. The `_`
marks in the code make a long number easier to read, and C# ignores them.
What do you think the last line prints?

```csharp exec
id: a-middle-that-overflows-1
Console.WriteLine(int.MaxValue);
int low = 2_000_000_000;
int high = 2_100_000_000;
Console.WriteLine(low + high);
int mid = (low + high) / 2;
Console.WriteLine(mid);
```

```predict
type: choice

What will the last line print?

- 2050000000
  - It is halfway between the two.
- A number below zero
  - `low + high` is larger than an `int` can hold.
- It stops with an exception
  - C# notices that the sum is too large.
```

<details class="dl-answer"><summary>why</summary>

After 2147483647, it prints -194967296, then -97483648, and there is no
exception. The sum of `low` and `high` is larger than an `int` can hold, so
it *overflows*: C# keeps only the part of the result that fits in an
`int`, and continues. That part is -194967296, and half of it is
-97483648. In a binary search, the next line reads `items[mid]`, and an
index below zero stops the search with an `IndexOutOfRangeException`, as
in problem 1.

</details>

Can you change the line that makes `mid`, so that the sum is never larger
than `high`?

```hint
after: 1 runs
How far is it from `low` to `high`? That distance is never larger than
`high`. Can you start at `low`, and add half of that distance?
```

```solution
Console.WriteLine(int.MaxValue);
int low = 2_000_000_000;
int high = 2_100_000_000;
Console.WriteLine(low + high);
int mid = low + (high - low) / 2;
Console.WriteLine(mid);
---
The last line is 2050000000, halfway between the two. `high - low` is the
size of the range, and it is never larger than `high`, so `low` plus half
of it is never larger than `high` either. This is not only a learner's
slip. Joshua Bloch wrote the binary search that comes with Java using
`(low + high) / 2`, and it was there for years before a program with a
very long array stopped because of it (Google Research blog, 2 June 2006).
```

```inputs
mid
```

## 8. At most

What is the largest number of comparisons binary search needs on 1,000
items? On 1,000,000? When you have your answers, this is the cell from the
lesson that halves a size until nothing is left, and counts the looks.

```csharp exec
id: at-most-1
int[] sizes = { 1000, 1000000 };
foreach (int size in sizes)
{
    Console.Write($"{size} items:");
    int left = size;
    int looks = 0;
    while (left > 0)
    {
        left = left / 2;    // after a look, at most half is left
        looks++;
        Console.Write($" {left}");
    }
    Console.WriteLine($". At most {looks} looks.");
}
```

<details class="dl-answer"><summary>answer</summary>

It needs 10 and 20. Ten halvings cover 2¹⁰ = 1,024 items, and twenty cover
2²⁰ = 1,048,576. A thousand times more data costs ten more comparisons.

</details>

## 9. Where it would go

Can you write `WhereItGoes(int[] items, int target)`? It gives the index
where `target` would go in the sorted array `items`, to keep it sorted. If
the target is there already, it gives the index of the first one.

```csharp exec
id: where-it-would-go-1
static int WhereItGoes(int[] items, int target)
{
    // Your code
    return 0;
}

int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(WhereItGoes(sortedNumbers, 20));
```

```inputs
WhereItGoes(sortedNumbers, 20)
WhereItGoes(sortedNumbers, 31)     // there already
WhereItGoes(sortedNumbers, 1)      // before every element
WhereItGoes(sortedNumbers, 100)    // after every element
WhereItGoes(new int[0], 5)         // an empty array
```

```hint
after: 1 runs
Where can the target go? Anywhere from index 0 to `items.Length`, one past
the end. Could `low` and `high` start at those two?
```

```hint
after: 3 runs
While `low < high`, check the middle. If it is smaller than the target,
the place is after it, so `low` moves to `mid + 1`. If not, the place is
at the middle or before it, so `high` moves to `mid`. What do `low` and
`high` hold when they meet?
```

```solution
static int WhereItGoes(int[] items, int target)
{
    int low = 0;
    int high = items.Length;
    while (low < high)
    {
        int mid = (low + high) / 2;
        if (items[mid] < target)
        {
            low = mid + 1;
        }
        else
        {
            high = mid;
        }
    }
    return low;
}

int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(WhereItGoes(sortedNumbers, 20));
---
20 would go at index 5, between 19 and 23. When `low` and `high` meet,
that is the place. In the lesson, `high = mid;` could make the range stop
shrinking. Here it cannot: while `low < high`, `mid` is always below
`high`, so the range becomes smaller each time.
```

On the lesson page, `Array.BinarySearch(sortedNumbers, 20)` gave -6. What
does the second line of this cell print, and how is that number linked to
where 20 would go? Why do you think the last line is not 0?

```csharp exec
id: where-it-would-go-2
int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
int result = Array.BinarySearch(sortedNumbers, 20);
Console.WriteLine(result);
Console.WriteLine(-result - 1);
Console.WriteLine(Array.BinarySearch(sortedNumbers, 1));
```

<details class="dl-answer"><summary>answer</summary>

It prints -6, then 5, which is the place where 20 would go. For a target
that is not there, `Array.BinarySearch` gives minus that place, minus 1.
The minus makes the answer below zero, so it cannot look like the index of
a target it found.

The 1 is there for a target that would go at index 0, such as 1. Minus 0
is still 0, and that would look like "found at index 0". So C# gives -1,
as the last line shows.

</details>

## 10. Every place

Can you fill `places` with every index where 4 appears?

```csharp exec
id: every-place-1
int[] numbers = { 4, 2, 4, 4, 1 };
List<int> places = new();

Console.WriteLine(string.Join(", ", places));
```

```inputs
places
```

```hint
after: 1 runs
Can a loop visit every index? What should it do each time
`numbers[index]` is 4?
```

```solution
int[] numbers = { 4, 2, 4, 4, 1 };
List<int> places = new();
for (int index = 0; index < numbers.Length; index++)
{
    if (numbers[index] == 4)
    {
        places.Add(index);
    }
}
Console.WriteLine(string.Join(", ", places));
---
It prints 0, 2, 3. Finding every place has to check every element, sorted
or not, so this search is linear, whichever way it is written.
```

## 11. The first one past a line

<div class="dl-world" data-world="secret-messages">

In a sorted array of words, where do the words that start with M begin?
The place where `"M"` would go is the answer, because `"M"` comes before
every word that starts with M. Can you set `start` to that place, with
`WhereItGoes` from problem 9?

Each Run starts a new program, so this cell needs its own copy of
`WhereItGoes`. Can you copy yours from problem 9 into the space at the
top, and change it to work on words, as the lesson did for
`BinarySearch`?

```csharp exec
id: the-first-one-past-a-line-1--secret-messages
// Copy WhereItGoes from problem 9 to here, and change it to work on words.

string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST"
};
int start = 0;

Console.WriteLine($"{start} {words[start]}");
```

```inputs
start
WhereItGoes(words, "N")    // where the words that start with M end
```

```hint
after: 1 runs
Which types in `WhereItGoes` change, for an array of words? Where does the
method compare two elements?
```

```hint
after: 1 errors
Does the first message say CS0103, and name `WhereItGoes`? Each Run starts
a new program, so the method must be in this cell. Does it say CS0019,
*Operator '<' cannot be applied to operands of type 'string' and
'string'*? Which method compares two strings?
```

```solution
static int WhereItGoes(string[] items, string target)
{
    int low = 0;
    int high = items.Length;
    while (low < high)
    {
        int mid = (low + high) / 2;
        if (string.CompareOrdinal(items[mid], target) < 0)
        {
            low = mid + 1;
        }
        else
        {
            high = mid;
        }
    }
    return low;
}

string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST"
};
int start = WhereItGoes(words, "M");

Console.WriteLine($"{start} {words[start]}");
---
It prints 12 MEET. The words that start with M run from there up to
`WhereItGoes(words, "N")`, which is 13, so there is one of them. For a
letter that no word starts with, the two places are the same, and there
is nothing between them.
```

</div>

<div class="dl-world" data-world="pixel-art">

These are the brightnesses of a picture's pixels, sorted. Where do the
bright pixels, 128 or more, begin? Can you set `start` to that index, with
`WhereItGoes` from problem 9?

Each Run starts a new program, so this cell needs its own copy of
`WhereItGoes`. Can you copy yours from problem 9 into the space at the
top?

```csharp exec
id: the-first-one-past-a-line-1--pixel-art
// Copy WhereItGoes from problem 9 to here.

int[] brightnesses = { 12, 30, 45, 90, 127, 128, 200, 255 };
int start = 0;

Console.WriteLine($"{start} {brightnesses[start]}");
```

```inputs
start
brightnesses.Length - start    // how many pixels are bright
```

```hint
after: 1 runs
What would `WhereItGoes(brightnesses, 128)` give?
```

```hint
after: 1 errors
Does the message say CS0103, and name `WhereItGoes`? Each Run starts a new
program, so the method must be in this cell. Can you copy it here?
```

```solution
static int WhereItGoes(int[] items, int target)
{
    int low = 0;
    int high = items.Length;
    while (low < high)
    {
        int mid = (low + high) / 2;
        if (items[mid] < target)
        {
            low = mid + 1;
        }
        else
        {
            high = mid;
        }
    }
    return low;
}

int[] brightnesses = { 12, 30, 45, 90, 127, 128, 200, 255 };
int start = WhereItGoes(brightnesses, 128);

Console.WriteLine($"{start} {brightnesses[start]}");
---
It prints 5 128. Everything from index 5 on is bright, so
`brightnesses.Length - start`, which is 3, counts the bright pixels
without checking them one at a time.
```

</div>

## 12. From earlier: the last three

From [Arrays and lists](lesson:lists-and-sequences). What do you think
this prints? Say what you think, then run it.

```csharp exec
id: from-earlier-the-last-three-1
string word = "ALGORITHMS";
Console.WriteLine(word[^3..]);
```

<details class="dl-answer"><summary>why</summary>

It prints `HMS`. `^3` is the cut three places from the end, and a range
with no second number runs to the end.

</details>

## 13. From earlier: a method and an array

From [Grids and references](lesson:grids-and-references). What do you think
this prints?

```csharp exec
id: from-earlier-a-method-and-an-array-1
static void SetToZero(int[] values, int number)
{
    values[0] = 0;
    number = 0;
}

int[] scores = { 7, 8, 9 };
int bonus = 5;
SetToZero(scores, bonus);
Console.WriteLine($"{scores[0]} {bonus}");
```

<details class="dl-answer"><summary>why</summary>

It prints `0 5`. An array is a reference type: `values` and `scores` are
two names for one array, so the method changed the caller's array. An
`int` is a value type: `number` is a copy of `bonus`, and changing the
copy leaves `bonus` as it was.

</details>

## 14. From earlier: a count that starts itself

From [Dictionaries](lesson:looking-things-up-by-name).

```csharp exec
id: from-earlier-a-count-that-starts-itself-1
Dictionary<char, int> counts = new();
foreach (char letter in "BANANA")
{
    counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
}
foreach (char letter in counts.Keys)
{
    Console.WriteLine($"{letter} {counts[letter]}");
}
```

```predict
type: choice

What will it print?

- B 1, then A 3, then N 2
  - Each letter is counted, in the order it first appears.
- A 3, then B 1, then N 2
  - A dictionary keeps its keys in alphabetical order.
- It stops with an exception
  - B is not in `counts` when the loop starts.
```

<details class="dl-answer"><summary>why</summary>

It prints B 1, A 3 and N 2, on three lines. `GetValueOrDefault(letter, 0)`
gives 0 the first time a letter appears, so there is no
`KeyNotFoundException`. The loop met the keys in the order they were
added: B first, because BANANA starts with B. A dictionary does not
promise to keep that order, so a program should not depend on it.

</details>
