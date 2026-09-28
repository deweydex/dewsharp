---
title: "Sorting: practice"
version: 2026.09.27.1
from: putting-things-in-order-practice
practice_for: putting-things-in-order
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Sorting: practice

These problems are on sorting, with three from earlier pages. Can you
trace the short ones by hand before you run anything? To *trace* a sort is
to follow it step by step on paper, and write the array after each
step. Once you have traced a sort, you can find the mistakes in it. If you
have only run it, you usually cannot. Each problem has an answer or a
solution under it, for when you have tried it. Some cells are meant not to
compile, or to stop with an exception, and the problem says so.

## 1. One pass

Can you trace one full pass of bubble sort over `{ 5, 1, 4, 2, 8 }`? What
is the array after the pass? The cell prints the array after each swap, to
check your trace.

```csharp exec
id: one-pass-1
int[] items = { 5, 1, 4, 2, 8 };
for (int i = 0; i < items.Length - 1; i++)
{
    if (items[i] > items[i + 1])
    {
        (items[i], items[i + 1]) = (items[i + 1], items[i]);
        Console.WriteLine(string.Join(", ", items));
    }
}
```

<details class="dl-answer"><summary>answer</summary>

The array is `1, 4, 2, 5, 8`. The 5 is swapped with 1, then 4, then 2, and
stops at 8. It travelled to its place in one pass, which is what
"bubbling" means.

</details>

## 2. How many passes

How many passes does bubble sort need on `{ 5, 1, 4, 2, 8 }` before the
array is sorted? How many does a plain bubble sort make? Can you trace it
first, and then run the cell, which prints the array after each pass?

```csharp exec
id: how-many-passes-1
int[] items = { 5, 1, 4, 2, 8 };
for (int pass = 0; pass < items.Length - 1; pass++)
{
    for (int i = 0; i < items.Length - 1 - pass; i++)
    {
        if (items[i] > items[i + 1])
        {
            (items[i], items[i + 1]) = (items[i + 1], items[i]);
        }
    }
    Console.WriteLine($"After pass {pass + 1}: {string.Join(", ", items)}");
}
```

<details class="dl-answer"><summary>answer</summary>

Two passes sort it. After the second, it is `1, 2, 4, 5, 8`. A plain bubble
sort still makes all four passes, because it never checks whether the array
is sorted. Problem 6 changes that.

</details>

## 3. Insertion, traced

Can you trace insertion sort over `{ 3, 1, 4, 1, 5 }`? Write the sorted
part on paper after each element is placed. The cell prints it, to check
your trace.

```csharp exec
id: insertion-traced-1
int[] items = { 3, 1, 4, 1, 5 };
for (int i = 1; i < items.Length; i++)
{
    int current = items[i];
    int j = i - 1;
    while (j >= 0 && items[j] > current)
    {
        items[j + 1] = items[j];
        j--;
    }
    items[j + 1] = current;
    Console.WriteLine(string.Join(", ", items[..(i + 1)]));
}
```

<details class="dl-answer"><summary>answer</summary>

Start with `3`: one element is always sorted. Insert 1: `1, 3`. Insert 4:
`1, 3, 4`. Insert 1: `1, 1, 3, 4`. Insert 5: `1, 1, 3, 4, 5`.

The second 1 landed *after* the first. The `while` stops at the first
element that is not larger than `current`, and the first 1 is not larger.
So equal elements keep the order they started in, and a sort that does
that is *stable*. It matters when data is sorted twice, by two different
rules. `Array.Sort` is not stable, and problem 12 shows what to do
instead.

</details>

## 4. Selection, traced

Can you trace selection sort over `{ 64, 25, 12, 22, 11 }`? The cell prints
the array after the swap for each place.

```csharp exec
id: selection-traced-1
int[] items = { 64, 25, 12, 22, 11 };
for (int i = 0; i < items.Length - 1; i++)
{
    int smallest = i;
    for (int j = i + 1; j < items.Length; j++)
    {
        if (items[j] < items[smallest])
        {
            smallest = j;
        }
    }
    (items[i], items[smallest]) = (items[smallest], items[i]);
    Console.WriteLine($"Place {i}: {string.Join(", ", items)}");
}
```

<details class="dl-answer"><summary>answer</summary>

1. The smallest is 11. It is swapped into place 0: `11, 25, 12, 22, 64`.
2. The smallest of the rest is 12: `11, 12, 25, 22, 64`.
3. Then 22: `11, 12, 22, 25, 64`.
4. Then 25, already in its place. It is swapped with itself, and the array
   is sorted.

There is at most one swap for each place. Selection sort makes the fewest
swaps of the three, which matters when it is slow to move an element.

</details>

## 5. Counting comparisons

```csharp exec
id: counting-comparisons-1
static int BubbleCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int pass = 0; pass < copy.Length - 1; pass++)
    {
        for (int i = 0; i < copy.Length - 1 - pass; i++)
        {
            comparisons++;
            if (copy[i] > copy[i + 1])
            {
                (copy[i], copy[i + 1]) = (copy[i + 1], copy[i]);
            }
        }
    }
    return comparisons;
}

int[] sizes = { 10, 20, 40, 80 };
foreach (int size in sizes)
{
    int[] backwards = new int[size];
    int[] inOrder = new int[size];
    for (int i = 0; i < size; i++)
    {
        backwards[i] = size - i;
        inOrder[i] = i + 1;
    }
    Console.WriteLine($"{size} items: {BubbleCounted(backwards)} reversed, {BubbleCounted(inOrder)} in order");
}
```

How many comparisons does bubble sort make on 10 items? On 20? Does it
matter whether they start in order?

<details class="dl-answer"><summary>answer</summary>

It makes 45 and 190, in order or not. It is always n(n − 1)/2. The loops
run the same number of times whatever they find, and only the swaps
depend on the data. If you double n, it makes about four times as many
comparisons.

</details>

## 6. Stop when it is sorted

Can you change `BubbleCounted` so that it stops as soon as a pass swaps
nothing, and still returns the number of comparisons?

```csharp exec
id: stop-when-it-is-sorted-1
static int BubbleCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int pass = 0; pass < copy.Length - 1; pass++)
    {
        for (int i = 0; i < copy.Length - 1 - pass; i++)
        {
            comparisons++;
            if (copy[i] > copy[i + 1])
            {
                (copy[i], copy[i + 1]) = (copy[i + 1], copy[i]);
            }
        }
    }
    return comparisons;
}

Console.WriteLine(BubbleCounted(new int[] { 5, 1, 4, 2, 8 }));
```

```inputs
BubbleCounted(new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 })    // already in order
BubbleCounted(new int[] { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 })    // reversed
BubbleCounted(new int[] { 5, 1, 4, 2, 8 })
```

```hint
after: 1 runs
A variable that records whether something has happened is a *flag*. Can
you make `bool swapped = false;` at the start of each pass, and set it to
`true` when a swap happens? After the pass, if nothing was swapped,
`break;` leaves the loop at once.
```

```solution
static int BubbleCounted(int[] items)
{
    int[] copy = items.ToArray();
    int comparisons = 0;
    for (int pass = 0; pass < copy.Length - 1; pass++)
    {
        bool swapped = false;
        for (int i = 0; i < copy.Length - 1 - pass; i++)
        {
            comparisons++;
            if (copy[i] > copy[i + 1])
            {
                (copy[i], copy[i + 1]) = (copy[i + 1], copy[i]);
                swapped = true;
            }
        }
        if (!swapped)
        {
            break;
        }
    }
    return comparisons;
}

Console.WriteLine(BubbleCounted(new int[] { 5, 1, 4, 2, 8 }));
---
Ten items in order now cost one pass, 9 comparisons, not 45. Reversed,
nothing changes: every pass swaps something. Real data is often nearly in
order, and there the flag saves most of the work.
```

## 7. Best and worst on sorted data

Which of the three sorts does best on an array that is already sorted?
Which gains nothing?

<details class="dl-answer"><summary>answer</summary>

Insertion sort does best. Each element is already in its place, so it makes
n − 1 comparisons and moves nothing. Fast sorts in real software often give
small pieces of the job to insertion sort for that reason. C#'s own
`Array.Sort` does: Microsoft's page on it says that it uses an insertion
sort for a part of 16 elements or fewer.

Selection sort gains nothing. It searches the whole rest of the array for
the smallest every time, whatever the order. Bubble sort with the flag
from problem 6 matches insertion sort. Without it, it matches selection
sort.

</details>

## 8. A million items

For a million items, about how many comparisons does an n² sort make? At
ten million comparisons a second, how long does that take? Can you
estimate first, and then make C# calculate it?

```csharp exec
id: a-million-items-1
long items = 1000000;
long comparisons = 0;    // Your code: n(n - 1) / 2
Console.WriteLine($"{items} items: {comparisons} comparisons");
```

```solution
long items = 1000000;
long comparisons = items * (items - 1) / 2;
Console.WriteLine($"{items} items: {comparisons} comparisons");
Console.WriteLine($"{comparisons / 10000000.0} seconds");
Console.WriteLine($"{comparisons / 10000000.0 / 3600} hours");
Console.WriteLine($"log2 of {items}: {Math.Log2(items)}");
Console.WriteLine($"n log n: {items * Math.Log2(items)} comparisons");
Console.WriteLine($"{items * Math.Log2(items) / 10000000} seconds");
---
About n(n − 1)/2, which is 499999500000: about five hundred billion. At
ten million a second, that is 49999.95 seconds, almost fourteen hours.
`long` holds the count, because the count is too large for an `int`, as
the lesson showed. The last three lines are for a sort that takes about
n log n steps. log₂ of a million is about 20, so that sort makes about
twenty million comparisons on the same data, which take about two seconds.
A faster computer does not help much with a difference that large.
```

## 9. Selection sort from nothing

Can you write `SelectionSort(int[] items)` without looking at the lesson,
so that it returns a new sorted array and leaves `items` as it was?

```csharp exec
id: selection-sort-from-nothing-1
static int[] SelectionSort(int[] items)
{
    // Your code: sort a copy of items, and return the copy
    return items;
}

int[] data = { 64, 25, 12, 22, 11 };
int[] sorted = SelectionSort(data);
Console.WriteLine(string.Join(", ", sorted));
Console.WriteLine(string.Join(", ", data));
```

```inputs
SelectionSort(new int[] { 64, 25, 12, 22, 11 })
SelectionSort(new int[] { 3, 1, 2 })
SelectionSort(new int[0])
data          // after the cell's own call: is it as it was?
```

```hint
after: 1 runs
`items.ToArray()` makes a copy. Can you sort the copy with the selection
sort from the lesson, and return it?
```

```solution
static int[] SelectionSort(int[] items)
{
    int[] copy = items.ToArray();
    for (int i = 0; i < copy.Length - 1; i++)
    {
        int smallest = i;
        for (int j = i + 1; j < copy.Length; j++)
        {
            if (copy[j] < copy[smallest])
            {
                smallest = j;
            }
        }
        (copy[i], copy[smallest]) = (copy[smallest], copy[i]);
    }
    return copy;
}

int[] data = { 64, 25, 12, 22, 11 };
int[] sorted = SelectionSort(data);
Console.WriteLine(string.Join(", ", sorted));
Console.WriteLine(string.Join(", ", data));
---
It keeps the *index* of the smallest, not its value. With only the value,
it could not make the swap, because it would not know where the value came
from. `ToArray()` makes the copy, so the caller's array stays as it was.
```

## 10. The guard goes first

In insertion sort, the `while` line is
`while (j >= 0 && items[j] > current)`. Why does `j >= 0` come first? This
cell has the two sides in the other order. It is meant to stop with an
exception.

```csharp exec
id: the-guard-goes-first-1
expect: exception
int[] items = { 3, 1, 2 };
for (int i = 1; i < items.Length; i++)
{
    int current = items[i];
    int j = i - 1;
    while (items[j] > current && j >= 0)
    {
        items[j + 1] = items[j];
        j--;
    }
    items[j + 1] = current;
}
Console.WriteLine(string.Join(", ", items));
```

<details class="dl-answer"><summary>answer</summary>

`j >= 0` is a *guard*: it stops the loop when `j` is below 0, before the
start of the array. C# checks the first side of an `&&` first, and stops as
soon as one side is `false`. With the guard first, when `j` reaches -1, C# finds that
`j >= 0` is `false`, and never reads `items[j]`.

With the sides in the other order, C# reads `items[-1]` first. An array
has no index -1, so the program stops with an
`IndexOutOfRangeException` at line 6. In Python, `items[-1]` is the last
element, so the same mistake reads the last element and gives no message.
C# stops, and names the line, which makes the mistake easier to find.

</details>

## 11. Why copy

Why do `BubbleCounted` and `SelectionSort` above start with
`int[] copy = items.ToArray();`?

<details class="dl-answer"><summary>answer</summary>

They sort a copy, so that the caller's array stays as it was. Without it,
`int[] sorted = SelectionSort(data);` would sort `data` too. An array is a
reference type, so the parameter `items` and the caller's `data` would be
two names for one array, as on the page *Grids and references*. Problem 20
shows the same thing with `Array.Sort`, which sorts the array it is given.

</details>

## 12. Length, then letters

Can you write `ByLengthThenLetters`, so that `Array.Sort` puts these names
in order of length, with names of the same length in alphabetical order?

```csharp exec
id: length-then-letters-1
static int ByLengthThenLetters(string first, string second)
{
    // Your code: a number below zero when first comes first
    return 0;
}

string[] names = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE", "WREN" };
Array.Sort(names, ByLengthThenLetters);
Console.WriteLine(string.Join(", ", names));
```

```inputs
names
```

```hint
after: 1 runs
When the two lengths are different, the length decides. When they are the
same, which method from the page *Searching* compares two words?
```

```solution
static int ByLengthThenLetters(string first, string second)
{
    if (first.Length != second.Length)
    {
        return first.Length - second.Length;
    }
    return string.CompareOrdinal(first, second);
}

string[] names = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE", "WREN" };
Array.Sort(names, ByLengthThenLetters);
Console.WriteLine(string.Join(", ", names));
---
The length decides first. Only when two names have the same length does
`CompareOrdinal` compare their letters. For this rule, no two different
names are equal, so it does not matter that `Array.Sort` is not stable.
With a stable sort, there is another way: sort by the letters first, and
then by length. The second sort keeps the alphabetical order among names of
the same length, as problem 3 showed.
```

## 13. The best first

<div class="dl-world" data-world="secret-messages">

A codebreaker tries every shift, and sorts the decodings so that the most
English-looking comes first. A rough score counts how many of its letters
are E, T, A, O, I or N. Can you write `Score(string text)`, and set `best`
to the decoding with the highest score?

Run as it is, the cell shows a warning, CS8321, because nothing calls
`Score` until your code does. A warning does not stop the program.

```csharp exec
id: the-best-first-1--secret-messages
static string Decode(string message, int shift)
{
    string plain = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            plain += (char)(((position - shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            plain += character;
        }
    }
    return plain;
}

static int Score(string text)
{
    // Your code: count the letters of text that are E, T, A, O, I or N
    return 0;
}

string message = "WKH HQHPB LV DW WKH EULGJH";
string[] decodings = new string[26];
for (int shift = 0; shift < 26; shift++)
{
    decodings[shift] = Decode(message, shift);
}
string best = "";
Console.WriteLine(best);
```

```inputs
Score("THE ENEMY")
Score("XYZ")
best
```

```hint
after: 1 runs
`"ETAOIN".Contains(letter)` is `true` for those six letters. Can you count
the letters of `text` for which it is `true`? Then a rule such as
`HigherScoreFirst` can sort `decodings`, and `best` is the first.
```

```solution
static string Decode(string message, int shift)
{
    string plain = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            plain += (char)(((position - shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            plain += character;
        }
    }
    return plain;
}

static int Score(string text)
{
    int count = 0;
    foreach (char letter in text)
    {
        if ("ETAOIN".Contains(letter))
        {
            count++;
        }
    }
    return count;
}

static int HigherScoreFirst(string first, string second)
{
    return Score(second) - Score(first);
}

string message = "WKH HQHPB LV DW WKH EULGJH";
string[] decodings = new string[26];
for (int shift = 0; shift < 26; shift++)
{
    decodings[shift] = Decode(message, shift);
}
Array.Sort(decodings, HigherScoreFirst);
string best = decodings[0];
Console.WriteLine(best);
Console.WriteLine($"{Score(decodings[0])}, then {Score(decodings[1])}");
---
THE ENEMY IS AT THE BRIDGE, with a score of 12. The next best scores 10.
On a short message, a score this rough can tie, and then a person has to
read the first few.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `Lit(string row)`, which counts the `#` in a row, and sort
`busiestFirst` so that the rows go from the most lit to the least?

Run as it is, the cell shows a warning, CS8321, because nothing calls
`Lit` until your code does. A warning does not stop the program.

```csharp exec
id: the-best-first-1--pixel-art
static int Lit(string row)
{
    // Your code: count the # characters in row
    return 0;
}

string[] picture = { "#..#", "####", "....", "#.#." };
string[] busiestFirst = picture.ToArray();

foreach (string row in busiestFirst)
{
    Console.WriteLine(row);
}
```

```inputs
Lit("#..#")
Lit("....")
busiestFirst
```

```hint
after: 1 runs
Can you count the `#` characters with a loop? Then a rule such as
`MoreLitFirst` can sort `busiestFirst`, with the row that has more lit
pixels first.
```

```solution
static int Lit(string row)
{
    int count = 0;
    foreach (char pixel in row)
    {
        if (pixel == '#')
        {
            count++;
        }
    }
    return count;
}

static int MoreLitFirst(string first, string second)
{
    return Lit(second) - Lit(first);
}

string[] picture = { "#..#", "####", "....", "#.#." };
string[] busiestFirst = picture.ToArray();
Array.Sort(busiestFirst, MoreLitFirst);

foreach (string row in busiestFirst)
{
    Console.WriteLine(row);
}
---
`####`, `#..#`, `#.#.`, `....`. The two rows with 2 lit pixels tie.
`Array.Sort` does not promise which of them comes first. Here, they kept
the order they had in `picture`.
```

</div>

## 14. A method that calls itself

Binary search can be written so that it calls itself on a smaller range,
in place of a loop. A method that calls itself uses *recursion*. What does
every recursive method need, so that it stops?

```csharp exec
id: a-function-that-calls-itself-1
static int BinarySearch(int[] items, int target, int low, int high)
{
    if (low > high)
    {
        return -1;
    }
    int mid = (low + high) / 2;
    if (items[mid] == target)
    {
        return mid;
    }
    if (target < items[mid])
    {
        return BinarySearch(items, target, low, mid - 1);
    }
    return BinarySearch(items, target, mid + 1, high);
}

int[] numbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(BinarySearch(numbers, 72, 0, numbers.Length - 1));
```

<details class="dl-answer"><summary>answer</summary>

It needs two things. The first is a case that returns without calling the
method again. Here, that is an empty range, `low > high`, or the target
found. The second is a call that always moves closer to that case. Here,
each call has a smaller range. Without either one, the method calls
itself again and again, until the program has no more memory for calls
that have not finished. .NET calls this a *stack overflow*, and it ends
the program.

</details>

## 15. Better than n log n

Can any sort beat about n log n comparisons, for any array?

<details class="dl-answer"><summary>answer</summary>

No sort that works by comparing can do it, and that has been proved. Each
comparison answers one yes-or-no question, so k comparisons can separate
at most 2ᵏ orders. An array of n elements can be in n! orders, and you
need about n log n questions to separate them all. Sorts that do not
compare, such as counting sort, can beat it, but only when something is
known about the data, such as that it is whole numbers in a small range.

</details>

## 16. One more item

You have a sorted array of a million items, and one new item to add. What
is the cheapest way to keep it sorted?

<details class="dl-answer"><summary>answer</summary>

Find its place with binary search, about 20 comparisons (log₂ of a
million, from problem 8), and insert it there. A new sort of the whole
array would take about twenty million. There is still a cost. An array
keeps its length, so the new item needs a new array, one longer, with
every element copied into it. A `List<int>` can grow, and its `Insert`
method puts a value at an index, but every element after that index moves
one place towards the end, and that work grows with n.

</details>

## 17. The same answers, more work

Two learners write sorts that give the same sorted arrays. One makes 45
comparisons on ten items, and the other 90. Is the second one a worse
sort?

<details class="dl-answer"><summary>answer</summary>

Not for ten items. The two give the same answers, and the second is
slower. Those are two different things. Is ten items the real size? Then
the difference is millionths of a second, and code that is easy to read
matters more. If the real input is ten million items, the difference
matters a lot. First make it give the answers you want, then measure it,
then make it faster where the measurement says it matters.

</details>

## 18. From earlier: at most how many looks

From the page *Searching*. What is the largest number of comparisons
binary search can need on a sorted array of 64 items?

```csharp exec
id: from-earlier-at-most-how-many-looks-1
int looks = 0;
int left = 64;
while (left > 0)
{
    left = left / 2;
    looks++;
    Console.WriteLine($"After look {looks}: {left} left");
}
Console.WriteLine(looks);
```

```predict
type: number

What will the last line print?
```

<details class="dl-answer"><summary>why</summary>

It can need 7. Each look halves what is left: 32, 16, 8, 4, 2, 1, and
then nothing. Six halvings of 64 leave one item, which still has to be
looked at. That makes seven looks.

</details>

## 19. From earlier: what a loop over a dictionary gives

From the page *Dictionaries*.

```csharp exec
id: from-earlier-a-loop-over-a-dictionary-1
Dictionary<char, char> key = new() { ['A'] = 'Q', ['B'] = 'W' };
foreach (KeyValuePair<char, char> pair in key)
{
    Console.WriteLine(pair);
}
```

```predict
type: choice

What will the last line print?

- B
  - A loop over a dictionary gives its keys.
- W
  - A loop over a dictionary gives its values.
- [B, W]
  - A loop over a dictionary gives each pair.
```

<details class="dl-answer"><summary>why</summary>

It prints `[B, W]`. A `foreach` over a dictionary gives each pair, a
`KeyValuePair`, and a pair prints its key and its value in square
brackets. `pair.Key` is `B`, and `pair.Value` is `W`. For the keys alone,
a loop can take `key.Keys`. Here the pairs came in the order they were
added, but a dictionary does not promise any order.

</details>

## 20. From earlier: two names for one array

From the page *Grids and references*.

```csharp exec
id: from-earlier-two-names-for-one-array-1
int[] scores = { 30, 10, 20 };
int[] saved = scores;
Array.Sort(scores);
Console.WriteLine(string.Join(", ", saved));
```

```predict
type: choice

What will it print?

- 30, 10, 20
  - `saved` kept the order from before the sort.
- 10, 20, 30
  - `saved` and `scores` are two names for one array.
```

<details class="dl-answer"><summary>why</summary>

It prints `10, 20, 30`. `int[] saved = scores;` makes no copy. An array is
a reference type, so `saved` and `scores` are two names for one array, and
`Array.Sort` sorted that array. With `int[] saved = scores.ToArray();`,
`saved` would keep `30, 10, 20`.

</details>
