---
title: "Sorting: bubble, insertion and selection sort"
version: 2026.09.27.1
from: putting-things-in-order
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO2, PDP-LO7]
---

# Sorting: bubble, insertion and selection sort

C# can sort an array in one line, with `Array.Sort`. Here it sorts three
numbers, and then the same three written as strings. What will the last
line print?

```csharp exec
id: sorted-in-one-line-1
int[] numbers = { 10, 9, 100 };
Array.Sort(numbers);
Console.WriteLine(string.Join(", ", numbers));

string[] texts = { "10", "9", "100" };
Array.Sort(texts);
Console.WriteLine(string.Join(", ", texts));
```

```predict
type: choice

What will the last line print?

- 9, 10, 100
  - They are the same numbers, so they sort the same way.
- 10, 100, 9
  - Strings are compared character by character, from the first.
```

The numbers sort as numbers, and the strings as text. `"10"` and `"100"`
both start with 1, which comes before 9, so both go first. The same rule
puts `file10` before `file9` in many lists of files. Every sort needs a
rule that says which of two things comes first.

`Array.Sort` does not make a new array. It changes the array it is given,
so after the call, `numbers` itself is in order.

In a real program, `Array.Sort` is the way to sort. Still, this page builds
three sorts of its own: bubble sort, insertion sort and selection sort.
Each is short enough to remember. When you build them, you see what
sorting costs, and why some ways are far slower than others. The page
before this one, [Searching](lesson:finding-things), showed why sorting
matters: binary search needs sorted data.

## The swap

Every sort here moves elements by *swapping* two of them: exchanging their
places. C# does it in one line. Which two numbers change places?

```csharp exec
id: the-swap-1
int[] numbers = { 10, 20, 30, 40, 50 };
(numbers[1], numbers[3]) = (numbers[3], numbers[1]);
Console.WriteLine(string.Join(", ", numbers));
```

Each side of the `=` is a *tuple*: values together in brackets. C# first
reads both values of the tuple after the `=`, and only then puts them in
the places named before the `=`. So 20 and 40 change places, and the
other numbers stay where they were. A swap can also use a spare variable,
which keeps one value safe while the other moves. Many languages have only
this way:

```csharp
int spare = numbers[1];
numbers[1] = numbers[3];
numbers[3] = spare;
```

## Bubble sort: let things rise

*Bubble sort* compares each pair of neighbours, from the start of the array
to the end, and swaps any pair that is not in order. One trip from the
start to the end is a *pass*. After one pass, the largest element has
risen to the end, as a bubble rises in water. Then bubble sort makes
another pass.

In this array, 90 is already at the end. 64, the next largest, starts at the
front. Where will it be after one pass?

```csharp exec
id: bubble-sort-let-things-rise-1
int[] data = { 64, 34, 25, 12, 22, 11, 90 };
Console.WriteLine($"Start: {string.Join(", ", data)}");
for (int i = 0; i < data.Length - 1; i++)
{
    if (data[i] > data[i + 1])
    {
        (data[i], data[i + 1]) = (data[i + 1], data[i]);
        Console.WriteLine($"  Swapped {i} and {i + 1}: {string.Join(", ", data)}");
    }
    else
    {
        Console.WriteLine($"  No swap at {i}: {string.Join(", ", data)}");
    }
}
Console.WriteLine($"After one pass: {string.Join(", ", data)}");
```

64 moves one place towards the end at every swap, until it meets 90. A pass
carries the largest element it meets with it, so after each pass, one more
element is in its final place. An array of n elements needs at most n − 1
passes. Here is the whole sort. A bar, `|`, divides the array: the
elements after the bar are in their final places.

```csharp exec
id: bubble-sort-let-things-rise-2
int[] data = { 64, 34, 25, 12, 22, 11, 90 };
int comparisons = 0;
Console.WriteLine($"Start: {string.Join(", ", data)}");

for (int pass = 0; pass < data.Length - 1; pass++)
{
    int compared = 0;
    int swaps = 0;
    for (int i = 0; i < data.Length - 1 - pass; i++)
    {
        compared++;
        if (data[i] > data[i + 1])
        {
            (data[i], data[i + 1]) = (data[i + 1], data[i]);
            swaps++;
        }
    }
    comparisons += compared;
    int settledFrom = data.Length - 1 - pass;
    string notSettled = string.Join(", ", data[..settledFrom]);
    string settled = string.Join(", ", data[settledFrom..]);
    Console.WriteLine($"Pass {pass + 1}: {notSettled} | {settled}   compared: {compared}, swapped: {swaps}");
}

Console.WriteLine($"Comparisons in total: {comparisons}");
```

There are three things to see. The bar moves one place towards the start
on every pass. Each pass makes one comparison fewer than the last: 6, then
5, and so on down to 1, which makes 21 in total. And the last pass swaps
nothing, because the array was sorted before it ran, and bubble sort had
no way to know. Can you try an array of your own: one already sorted, and
one in reverse order?

### Your turn

Here are the lines of `BubbleSort`, shuffled like cards. The braces are
already where they belong, and so are the last two lines. In C#, the
braces show which lines belong inside which; the indentation is only for
the people who read the code. Can you move the other six lines, so that
`BubbleSort` returns the array sorted from smallest to largest? It sorts
the array it is given, and returns it too, so that the last line can print
it.

As it is, the cell does not compile. It is meant to fail until the lines
are in order, and nothing is broken. The compiler finds many problems, and
most of them are names that do not exist where they are used. You do not
need to read them all. When the lines are in order, the cell compiles and
runs.

```csharp exec
id: your-turn-1
expect: CS0103
(items[i], items[i + 1]) = (items[i + 1], items[i]);
{
    return items;
    {
        for (int i = 0; i < items.Length - 1 - pass; i++)
        {
            static int[] BubbleSort(int[] items)
            {
                if (items[i] > items[i + 1])
            }
        }
    }
    for (int pass = 0; pass < items.Length - 1; pass++)
}

int[] numbers = { 5, 2, 9, 1 };
Console.WriteLine(string.Join(", ", BubbleSort(numbers)));
```

```inputs
BubbleSort(new int[] { 5, 2, 9, 1 })
BubbleSort(new int[] { 1, 2, 3 })        // already sorted
BubbleSort(new int[] { 7 })              // one element
BubbleSort(new int[0])                   // an empty array
```

```hint
after: 1 errors
Which line names the method? It has to come before the first brace. Which
loop uses `pass`, the variable that the other loop makes?
```

```hint
after: 3 errors
From the top: the method's first line, the loop over the passes, the loop
over `i`, the `if`, the swap, and `return items;` last. Why does the
`return` have to wait until both loops have finished?
```

```solution
static int[] BubbleSort(int[] items)
{
    for (int pass = 0; pass < items.Length - 1; pass++)
    {
        for (int i = 0; i < items.Length - 1 - pass; i++)
        {
            if (items[i] > items[i + 1])
            {
                (items[i], items[i + 1]) = (items[i + 1], items[i]);
            }
        }
    }
    return items;
}

int[] numbers = { 5, 2, 9, 1 };
Console.WriteLine(string.Join(", ", BubbleSort(numbers)));
---
The inner loop stops `pass` places earlier on each pass, because that many
elements are already in their final places at the end. With one element
or none, the outer loop's condition is `false` from the start, so the
loop never runs, and the method returns the array as it was.
```

## Insertion sort: sort like you sort cards

*Insertion sort* works the way most people sort a hand of playing cards:
take the cards one at a time, and put each new one into its place among
the cards already sorted. In an array, it keeps a sorted part at the start.
It takes the next element, and moves each larger element in the sorted part
one place towards the end, until the gap is where the new element belongs.
Here are its steps in pseudocode:

```text
FOR each index i from 1 to the end:
    SET current = items[i]
    SET j = i - 1
    WHILE j >= 0 AND items[j] > current:
        MOVE items[j] one place towards the end
        DECREASE j by 1
    PUT current at position j + 1
RETURN items
```

### Your turn

Here are the lines of `InsertionSort`, shuffled, with the braces and the
last two lines where they belong. Can you move the other nine lines into
order? As before, the cell is meant to fail until they are.

```csharp exec
id: your-turn-2
expect: CS0103
items[j + 1] = current;
{
    j--;
    {
        static int[] InsertionSort(int[] items)
        int current = items[i];
        return items;
        {
            while (j >= 0 && items[j] > current)
            for (int i = 1; i < items.Length; i++)
        }
        items[j + 1] = items[j];
    }
    int j = i - 1;
}

int[] numbers = { 5, 2, 9, 1 };
Console.WriteLine(string.Join(", ", InsertionSort(numbers)));
```

```inputs
InsertionSort(new int[] { 5, 2, 9, 1 })
InsertionSort(new int[] { 1, 2, 3 })
InsertionSort(new int[] { 3, 3, 1 })     // two the same
InsertionSort(new int[0])
```

```hint
after: 1 errors
Can you follow the pseudocode above, one line at a time? `current` has to
keep a copy of `items[i]` before anything moves into its place.
```

```hint
after: 3 errors
The `while` line uses `current` and `j`. Which two lines make them, and
where do those lines have to be?
```

```solution
static int[] InsertionSort(int[] items)
{
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
    }
    return items;
}

int[] numbers = { 5, 2, 9, 1 };
Console.WriteLine(string.Join(", ", InsertionSort(numbers)));
---
The `while` stops at the first element that is not larger than `current`.
So in an array already in order, each element after the first is compared
once, with the element before it, and nothing moves. That is where
insertion sort beats the other two.
```

## Selection sort: find the smallest

*Selection sort* finds the smallest element in the part of the array not
yet sorted, and swaps it to the front of that part. Then it finds the next
smallest, and so on. With a hand of cards, you would search all of them for
the lowest, put it first, and then search the rest.

### Your turn

This selection sort has a mistake in it. It sorts some arrays and not
others, so one test that gives a sorted array proves little. Can you find
an array it does not sort, and then change the method so that it sorts
every array?

```csharp exec
id: your-turn-3
static int[] SelectionSort(int[] items)
{
    for (int i = 0; i < items.Length - 1; i++)
    {
        int smallest = i;
        for (int j = i + 1; j < items.Length; j++)
        {
            if (items[j] < items[i])
            {
                smallest = j;
            }
        }
        (items[i], items[smallest]) = (items[smallest], items[i]);
    }
    return items;
}

int[] numbers = { 5, 4, 3, 2, 1 };
Console.WriteLine(string.Join(", ", SelectionSort(numbers)));
```

```inputs
SelectionSort(new int[] { 5, 4, 3, 2, 1 })
SelectionSort(new int[] { 3, 1, 2 })
SelectionSort(new int[] { 4, 1, 3, 2 })
```

```hint
after: 1 runs
Can you trace `{ 3, 1, 2 }` on paper? To *trace* code is to follow it one
step at a time, and write each variable's new value on paper. When `j`
reaches 2, which element is `items[j]` compared with? Which element does
it need to be compared with?
```

```solution
static int[] SelectionSort(int[] items)
{
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
    }
    return items;
}

int[] numbers = { 5, 4, 3, 2, 1 };
Console.WriteLine(string.Join(", ", SelectionSort(numbers)));
---
The first version compared each element with `items[i]`, the first of the
unsorted part, and not with the smallest found so far. So it found the
*last* element smaller than the first, which is not always the smallest.
It still sorted `{ 5, 4, 3, 2, 1 }`, and gave `[2, 1, 3]` for
`{ 3, 1, 2 }`. A reversed array is a good test, and not enough on its own.
```

## Sorting by another rule

`Array.Sort` puts numbers in order of size, and words in alphabetical
order. It can follow a rule of your own instead. The rule is a method that
takes two elements and says which of them comes first. It answers the way
`string.CompareOrdinal` does on the page [Searching](lesson:finding-things):
with a number below zero when the first element comes first, 0 when the
two are equal for this rule, and a number above zero when the second comes
first. Which word do you think comes first by length?

```csharp exec
id: sorting-with-a-key-1
static int ByLength(string first, string second)
{
    return first.Length - second.Length;
}

static int ByLastLetter(string first, string second)
{
    return first[^1] - second[^1];
}

string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
Array.Sort(words, ByLength);
Console.WriteLine(string.Join(", ", words));
Array.Sort(words, ByLastLetter);
Console.WriteLine(string.Join(", ", words));
```

`ByLength` sorts by length, and `ByLastLetter` by the last letter. The
method's name goes to `Array.Sort` with no brackets after it. With no
brackets, C# does not call the method on that line. It gives the method
itself to `Array.Sort`, which calls it each time it compares two elements.
Can you add brackets, `ByLength()`, and run the cell? Which method does the
compiler's message name, and what does it say is missing?

OWL and BAT have the same length, so for `ByLength`, neither comes first.
Here OWL stayed before BAT, the order they had at the start. A sort that
always keeps equal elements in the order they had at the start is
*stable*. `Array.Sort` does not promise that. Microsoft's page on
`Array.Sort` says that it is *unstable*: two elements that are equal for
the rule may change places.

<details class="dl-why"><summary>Which rule does Array.Sort use for words?</summary>

For strings, `Array.Sort` follows the rules of a language, as `CompareTo`
does on the page [Searching](lesson:finding-things). The binary search on
that page compares with `string.CompareOrdinal`, where every capital
letter comes before every small letter. A binary search must compare by
the same rule that put the array in order.

`string.CompareOrdinal` is itself a method that takes two strings and
returns a number, so it can be the rule: `Array.Sort(words,
string.CompareOrdinal);` sorts in the order that search expects. For words
all in capitals, as on these pages, the two rules agree.

</details>

A `List<int>` has a `Sort` method of its own, which sorts that list. What
will this cell do? Whatever happens when you run it is meant to happen,
and nothing is broken.

```csharp exec
id: sorting-with-a-key-2
expect: CS0029
List<int> numbers = new() { 3, 1, 2 };
List<int> result = numbers.Sort();
Console.WriteLine(string.Join(", ", result));
```

```predict
type: choice

What will happen when you press Run?

- It prints 1, 2, 3
  - `Sort` sorts the list, and returns it.
- It prints 3, 1, 2
  - `result` holds the list from before it was sorted.
- It does not compile, so nothing runs
  - `Sort` changes the list it belongs to, and returns nothing.
```

This cell is meant to fail. It did not compile, so nothing ran. The
compiler's message is:

```console
Program.cs(2,20): error CS0029: Cannot implicitly convert type 'void' to 'System.Collections.Generic.List<int>'
```

`Sort` is `void`. It changes `numbers` itself, as `Add` does, and returns
nothing, so there is nothing to put in `result`. `Array.Sort` is `void`
too. A method can change a list or an array it was given, because both are
reference types, as the page
[Grids and references](lesson:grids-and-references) showed. To keep the
old order and the sorted one too, sort a copy: `int[] sorted =
numbers.ToArray();`, and then `Array.Sort(sorted);`.

### Your turn

<div class="dl-world" data-world="secret-messages">

Here are the letter counts of a coded message. Can you write
`MoreOftenFirst`, so that `Array.Sort` puts the letters of `byCount` in
order, most common first? In English, the most common letters are E, then
T. What do the first two tell you?

`counts.Keys.ToArray()` makes an array of the dictionary's keys.
`MoreOftenFirst` has no `static` in front of it, so it can use `counts`,
as `WithDiscount` used `discountRate` on the page
[Methods](lesson:writing-your-own-functions).

```csharp exec
id: your-turn-4--secret-messages
Dictionary<char, int> counts = new()
{
    ['W'] = 6, ['K'] = 3, ['H'] = 9, ['Q'] = 2, ['P'] = 2, ['B'] = 1, ['L'] = 3,
    ['V'] = 1, ['J'] = 2, ['D'] = 2, ['E'] = 1, ['U'] = 2, ['G'] = 1
};

int MoreOftenFirst(char first, char second)
{
    // Your code: a number below zero when first is the more common letter
    return 0;
}

char[] byCount = counts.Keys.ToArray();
Array.Sort(byCount, MoreOftenFirst);
Console.WriteLine(string.Join(", ", byCount));
```

```inputs
byCount[..2]      // the two most common
```

```hint
after: 1 runs
`ByLength` returned `first.Length - second.Length`, so the shorter word
came first. Here, the letter with the larger count comes first. Which
count goes first in the subtraction?
```

```solution
Dictionary<char, int> counts = new()
{
    ['W'] = 6, ['K'] = 3, ['H'] = 9, ['Q'] = 2, ['P'] = 2, ['B'] = 1, ['L'] = 3,
    ['V'] = 1, ['J'] = 2, ['D'] = 2, ['E'] = 1, ['U'] = 2, ['G'] = 1
};

int MoreOftenFirst(char first, char second)
{
    return counts[second] - counts[first];
}

char[] byCount = counts.Keys.ToArray();
Array.Sort(byCount, MoreOftenFirst);
Console.WriteLine(string.Join(", ", byCount));
Console.WriteLine($"H is {'H' - 'E'} letters after E, and W is {'W' - 'T'} after T");
---
H, then W. If H is a coded E and W a coded T, both are 3 letters later in
the alphabet, so the shift is probably 3. Two letters that agree are much
stronger evidence than one.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `DarkerFirst`, so that `Array.Sort` puts these colours in
order of how bright they look, darkest first? `Brightness` gives a number
for how bright a colour looks. It counts green most and blue least, as an
eye does.

Run as it is, the cell shows a warning, CS8321, because nothing calls
`Brightness` until your code does. A warning does not stop the program.

```csharp exec
id: your-turn-4--pixel-art
static int Brightness(int[] colour)
{
    return 299 * colour[0] + 587 * colour[1] + 114 * colour[2];
}

static int DarkerFirst(int[] first, int[] second)
{
    // Your code: a number below zero when first is the darker colour
    return 0;
}

int[][] colours =
{
    new int[] { 255, 0, 0 },
    new int[] { 0, 255, 0 },
    new int[] { 0, 0, 255 },
    new int[] { 255, 255, 0 },
    new int[] { 128, 128, 128 },
};
Array.Sort(colours, DarkerFirst);
foreach (int[] colour in colours)
{
    Console.WriteLine(string.Join(", ", colour));
}
```

```inputs
colours
```

```hint
after: 1 runs
Which method says how bright a colour is? `DarkerFirst` can call it for
`first` and for `second`. Which subtraction gives a number below zero when
`first` is the darker one?
```

```solution
static int Brightness(int[] colour)
{
    return 299 * colour[0] + 587 * colour[1] + 114 * colour[2];
}

static int DarkerFirst(int[] first, int[] second)
{
    return Brightness(first) - Brightness(second);
}

int[][] colours =
{
    new int[] { 255, 0, 0 },
    new int[] { 0, 255, 0 },
    new int[] { 0, 0, 255 },
    new int[] { 255, 255, 0 },
    new int[] { 128, 128, 128 },
};
Array.Sort(colours, DarkerFirst);
foreach (int[] colour in colours)
{
    Console.WriteLine(string.Join(", ", colour));
}
---
Blue, red, grey, green, yellow. Pure blue looks darker than pure red, and
pure green brighter than mid-grey. `Array.Sort` does not know how to
compare two arrays by itself. What do you think `Array.Sort(colours);`
does, with no rule of your own? Can you try it?
```

</div>

## Comparing our sorts

All three sorts give the same sorted array. Which does less work? A good
measure is the number of comparisons. This cell counts them for bubble
sort, on arrays of 10, 50, 100 and 200 items, each in reverse order. What
do you think happens to the count when the size doubles?

```csharp exec
id: comparing-our-sorts-1
static int BubbleSortCounted(int[] items)
{
    int[] copy = items.ToArray();    // sort a copy, and leave the caller's array as it was
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

int[] sizes = { 10, 50, 100, 200 };
foreach (int size in sizes)
{
    int[] backwards = new int[size];
    for (int i = 0; i < size; i++)
    {
        backwards[i] = size - i;
    }
    Console.WriteLine($"Size {size}: {BubbleSortCounted(backwards)} comparisons");
}
```

```predict
type: choice

When the size doubles from 100 to 200, what happens to the number of
comparisons?

- It doubles
  - Twice as many items, twice as much work.
- It becomes about four times as many
  - Twice as many items, and each pass is about twice as long too.
- It grows by about 100
  - One more comparison for each new item.
```

When the size doubles, the comparisons become about four times as many:
4950 for 100 items, 19900 for 200. Each of the three sorts makes about
$\frac{n(n-1)}{2}$ comparisons in its worst case, and that grows in
proportion to $n^2$. This is written $O(n^2)$, as the page
[Searching](lesson:finding-things) wrote O(n) and O(log n). This cell uses
the formula for three sizes:

```csharp exec
id: comparing-our-sorts-3
Console.WriteLine($"The largest int: {int.MaxValue}");
long[] sizes = { 10, 1000, 1000000 };
foreach (long size in sizes)
{
    Console.WriteLine($"{size} items: {size * (size - 1) / 2} comparisons");
}
```

`long` is a type for whole numbers, like `int`, that can hold much larger
numbers. The sizes here are `long` values, not `int`. The largest `int` is
2147483647, and the last count is much larger. The page *Types and their
sizes* has more about the largest value each type can hold. Can you change
`long` to `int` in both places, and run the cell again? What is the last
count now? When the result of a calculation with `int` values is larger
than the largest `int`, C# does not stop the program. It continues from
the smallest `int`, and the answer makes no sense.

| Items | Comparisons | Time |
|---|---|---|
| 10 | 45 | instant |
| 1000 | 499500 | still quick |
| 1000000 | 499999500000 | a long wait |

Faster sorts exist. One of them, merge sort, takes about $n \log n$
steps, and C#'s own `Array.Sort` also takes about $n \log n$. Microsoft's
page on `Array.Sort` says that it uses three sorts inside it, and that for
a small part of the array, it uses an insertion sort, the sort you built
above.

Can you add a counter to your insertion sort and your selection sort, and
run all three on the same arrays: one in no order, one already in order,
and one in reverse order? Does each one always make the same number of
comparisons, or does it depend on the array? Each Run starts a new
program, so this cell needs its own copy of each sort.

```csharp exec
id: comparing-our-sorts-2
// Your experiments: three sorts, three kinds of array.
// Copy each sort to here, and give it a counter, as BubbleSortCounted has.
```

## Looking back

Insertion sort is quick on an array that is nearly in order, and bubble
sort makes the same number of comparisons whatever it is given. What would
you want to know about your data before you chose one?

A challenge: *Shell sort* makes insertion sort faster. It first compares
elements that are a gap apart, then a smaller gap, and finishes with a gap
of 1, which is an ordinary insertion sort. By then the array is nearly in
order, where insertion sort is at its quickest. Can you build it, and count
its comparisons against insertion sort's?

```csharp challenge
// Shell sort: insertion sort on elements gap places apart, for smaller and smaller gaps.
static int[] ShellSort(int[] items)
{
    int gap = items.Length / 2;
    while (gap > 0)
    {
        // An insertion sort, where "the element before" is gap places back.
        gap = gap / 2;
    }
    return items;
}

int[] numbers = { 64, 34, 25, 12, 22, 11, 90 };
Console.WriteLine(string.Join(", ", ShellSort(numbers)));
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:putting-things-in-order-practice) has
more problems about sorting, and three from earlier pages. After it,
[Reusable methods](lesson:building-reusable-tools) makes the testing you
did here into a habit: arrays chosen to find a sort's mistakes become tests
that a program runs for you.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Bingmann, T. (2013). *15 Sorting Algorithms in 6 Minutes*.
<https://www.youtube.com/watch?v=kPRA0W1kECg>. It shows each sort as
sound and as pictures, both together. The difference between the $n^2$
sorts and the $n \log n$ ones is easier to see here than in any table of
numbers.

Computerphile (2013). *Getting Sorted & Big O Notation*.
<https://www.youtube.com/watch?v=kgBjXUE_Nwc>. It explains why the way the
work grows with the size of the data matters more than the time each step
takes. That is the main idea of "Comparing our sorts" above.

Microsoft. *Array.Sort Method*.
<https://learn.microsoft.com/dotnet/api/system.array.sort>. The reference
page for C#'s own sort, with every way to call it, including with a rule
of your own. The part called *Remarks* says which sorts it uses inside it,
and that it is not stable. The page is written for programmers who know
C# well, so read the *Remarks* first.

Polylog (2022). *The Simplest Sorting Algorithm (You've Never Heard Of).*
<https://www.youtube.com/watch?v=_W0yUJlscRA>. The algorithm has two loops
and one swap. It looks as if it cannot work, but it sorts. Polylog shows
why it works. Compare it with the three sorts on this page. Which one is it
closest to?
