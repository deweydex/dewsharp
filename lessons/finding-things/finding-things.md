---
title: "Searching: linear and binary search"
version: 2026.09.28.1
from: finding-things
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO2, PDP-LO7]
---

# Searching: linear and binary search

The computer is thinking of a whole number from 1 to 100. Run the program,
and type a guess when it asks. It tells you whether the number is higher or
lower than your guess, and asks again, until you find it.

```csharp exec
id: guess-my-number-3
int secret = Random.Shared.Next(1, 101);
int tries = 0;
int guess = 0;
Console.WriteLine("I am thinking of a whole number from 1 to 100.");
do
{
    Console.Write("Your guess: ");
    string answer = Console.ReadLine();
    if (answer == null)
    {
        break;    // End input: there are no more guesses
    }
    guess = int.Parse(answer);
    tries++;
    if (guess < secret)
    {
        Console.WriteLine($"Higher than {guess}");
    }
    else if (guess > secret)
    {
        Console.WriteLine($"Lower than {guess}");
    }
    else
    {
        Console.WriteLine($"Yes! {guess} it is. That took {tries} tries.");
    }
}
while (guess != secret);
```

How many tries did it take? Run it again for a new number, and play once
more. What was your first guess, and why that one?

`Random.Shared.Next(1, 101)` chooses the number. It gives a whole number
chosen at random, from the first number up to the second, but not the
second itself: here, 1 to 100. The loop is a `do`...`while` loop, from
the page *Reading input*. It runs its body first and checks its condition
after, so the program always asks at least once. `guess` is made before
the loop, and not inside it, because the `while` line after the loop's
curly brackets must be able to use it. A variable made inside curly
brackets exists only inside them, as
[the closer look at starting a total](lesson:a-total-that-starts-again)
showed.

`Console.ReadLine()` gives `null`, C#'s value for *nothing here*, when
there is no more input: on the page, when you press **End input**. Then
the game stops, as the menu did in
[A program of your own](lesson:a-program-of-your-own). If you type
something that is not a whole number, `int.Parse` stops the program with a
`FormatException`, and you can run it again.

Most people who play a few times start at 50, and then guess the middle of
whatever is left. Each answer removes half of the numbers still possible.
That is the idea behind one of the two ways to search on this page, and the
reason it is so much quicker than the other.

## Linear search: the straightforward approach

In the *search problem*, we want to find one item in a collection. The item
we want is the *target*. *Linear search* checks the elements one at a
time, from the start of the array. It stops when it finds the target, or
when it reaches the end. You would use it to find a friend's name on a
guest list that is in no order.

```text
FOR each index i in the array:
    IF items[i] equals the target:
        RETURN i
RETURN -1, because the target is not there
```

### Your turn

Can you write the pseudocode in C#, as the method `LinearSearch(string[]
items, string target)`? It returns the index where it finds the target, or
-1 if the target is not in the array. Before you compare with a solution,
can you write what you think your method gives for WREN, for OTTER,
for FOX, which is not in the array, and for an empty array?

```csharp exec
id: your-turn-1
static int LinearSearch(string[] items, string target)
{
    // Your code: check the elements one at a time
    return -1;
}

string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
Console.WriteLine(LinearSearch(names, "WREN"));
```

```inputs
LinearSearch(names, "WREN")
LinearSearch(names, "OTTER")        // the first one
LinearSearch(names, "FOX")          // not there
LinearSearch(new string[0], "FOX")  // an empty array, with no elements
```

```hint
after: 1 runs
Which loop visits every index?
`for (int index = 0; index < items.Length; index++)` is one. Where does
the `return -1;` go, so that it runs only once the whole array has been
checked?
```

```hint
after: 1 errors
Does the message say CS0161, and name `LinearSearch`? The compiler asks
what the method returns when the loop ends without finding the target, or
when the array is empty and the loop never runs. Which line answers that?
```

```solution
static int LinearSearch(string[] items, string target)
{
    for (int index = 0; index < items.Length; index++)
    {
        if (items[index] == target)
        {
            return index;
        }
    }
    return -1;
}

string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
Console.WriteLine(LinearSearch(names, "WREN"));
---
The `return -1;` is after the loop, not inside it. Inside the loop, as an
`else`, it would stop the search after the first element. Can you try it?
Put `else { return -1; }` after the `if`, and run the cell. What does WREN
give now? The compiler notices something too: what does its warning say
about `index++`?
```

### How much work is linear search?

With 10 items, linear search might need 10 comparisons. With a million, it
might need a million. In the worst case, the work grows at the same rate as
the size of the array. This is written *O(n)*, said "order n". It means
that the time grows in proportion to n, the number of items. Twice as many
items means up to twice as many comparisons.

## Binary search: the power of sorted data

Think about finding a word in a paper dictionary. You would not start at
page one. You would open it near the middle, see whether your word comes
before or after that page, and so remove half of the dictionary with one
look. Then you would do the same with the half that is left.

This is *binary search*. It works only on data that is *sorted*: in order,
from smallest to largest. Step by step:

1. Remember the part of the array that is still possible. Two indexes mark
   its ends: `low` and `high`.
2. Check the middle element, at index `mid`.
3. If the middle element is the target, the search is finished.
4. If the target is smaller, search the first half: `high = mid - 1;`.
5. If the target is larger, search the second half: `low = mid + 1;`.
6. Repeat from step 2, until the target is found, or nothing is left.

![Four passes over a fifteen-item sorted array, searching for 3. The range
still to search shrinks from fifteen cells to seven, then three, then one,
with low, mid and high marked under it each time.](range-collapsing.svg)

Count the shaded cells in each row, from top to bottom: fifteen, then
seven, then three, then one. Binary search is quick because it halves the
range each time. Most mistakes happen in the halving too. `mid - 1` and
`mid + 1` make the range smaller each time. If either is different, the
range can stop shrinking, and the loop never ends.

### Your turn

Here is the pseudocode, with three gaps:

```text
SET low = 0
SET high = length of the array - 1
WHILE low <= high:
    SET mid = (low + high) / 2
    IF items[mid] equals target:
        ???
    ELSE IF target < items[mid]:
        ???
    ELSE:
        ???
RETURN -1
```

In C#, `(low + high) / 2` is always a whole number, so it can be used as
an index. `/` with two whole numbers drops the fraction, as
[the closer look at dividing](lesson:dividing-in-csharp) showed.

Can you fill the gaps, and write `BinarySearch(int[] items, int target)`?

```csharp exec
id: your-turn-2
static int BinarySearch(int[] items, int target)
{
    // Your code: the pseudocode, with its three gaps filled
    return -1;
}

int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(BinarySearch(sortedNumbers, 31));
```

```inputs
BinarySearch(sortedNumbers, 31)
BinarySearch(sortedNumbers, 20)     // not there
BinarySearch(sortedNumbers, 3)      // the first element
BinarySearch(sortedNumbers, 89)     // the last element
BinarySearch(new int[0], 5)         // an empty array
```

```hint
after: 1 runs
What should the method return when `items[mid]` is the target? When the
target is smaller than `items[mid]`, which half can still hold it, and
which end of the range moves?
```

```hint
after: 3 runs
The three gaps are: return `mid`; move `high` to just before `mid`; move
`low` to just after `mid`. Why just before and just after, and not `mid`
itself?
```

```solution
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

int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(BinarySearch(sortedNumbers, 31));
---
31 is exactly in the middle, so the first look finds it. 3 takes four
looks, one for each row of the picture. `mid` has been checked already, so
the new range does not include it. With `high = mid;`, the range can stop
shrinking. Can you try it on paper? Search for 5 in `{ 3, 7, 11, 15, 19 }`
that way. After a few looks, `low`, `mid` and `high` stop changing, and
the loop never ends.
```

### Searching words

Binary search works on words too, if they are in alphabetical order. The
search asks whether the target comes before `items[mid]`. For numbers, `<`
answers that. [The page about decisions](lesson:making-decisions) tried
`<` on two strings, `"A"` and `"B"`. Do you remember what happened? The
next cell tries it on two words, and it is meant to fail.

```csharp exec
id: searching-words-1
expect: CS0019
string first = "HELLO";
string second = "HOUSE";
Console.WriteLine(first < second);
```

It does not compile, so nothing runs. The compiler's message is:

```console
Program.cs(3,19): error CS0019: Operator '<' cannot be applied to operands of type 'string' and 'string'
```

In C#, `<` compares two numbers, or two `char` values, but not two
strings. For strings, C# has a method. `string.CompareOrdinal(first,
second)` compares two strings one character at a time, from the start,
until two characters differ. It compares those two by their numbers, as
`<` does for two `char` values. *Ordinal* means "by the characters'
numbers". It gives a whole number:

- below zero when `first` comes before `second`;
- 0 when the two strings are the same;
- above zero when `first` comes after `second`.

What do you think the first line of this cell prints?

```csharp exec
id: searching-words-2
Console.WriteLine(string.CompareOrdinal("HELLO", "HOUSE"));
Console.WriteLine(string.CompareOrdinal("HOUSE", "HELLO"));
Console.WriteLine(string.CompareOrdinal("NOON", "NOON"));
```

```predict
type: choice

What will the first line print?

- -1
  - HELLO comes before HOUSE, and -1 is the simplest number below zero.
- -10
  - E and O are the first two letters that differ, and E is 10 places
    before O.
- 1
  - The method says whether the second word comes after the first.
```

HELLO and HOUSE have the same first letter, so C# compares their second
letters. E is 10 places before O, so the first line is -10. Only one thing
about the number matters to a search: whether it is below zero, zero, or
above zero.

So where the search for numbers asks `target < items[mid]`, a search for
words asks `string.CompareOrdinal(target, items[mid]) < 0`. Here is the
whole method for words. It compares once for each look, and keeps the
answer in `order`.

```csharp exec
id: searching-words-3
static int BinarySearch(string[] items, string target)
{
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        int order = string.CompareOrdinal(target, items[mid]);
        if (order == 0)
        {
            return mid;
        }
        else if (order < 0)
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

string[] words = { "AND", "BIRD", "CODE", "HELLO", "NOON", "SPY", "TREE" };
Console.WriteLine(BinarySearch(words, "NOON"));
Console.WriteLine(BinarySearch(words, "noon"));
```

The second search gives -1. A small n is a different character from a
capital N, with a different number, so `"noon"` is not in the array.

<details class="dl-why"><summary>Why CompareOrdinal?</summary>

C# has other ways to compare two strings. `first.CompareTo(second)`
follows the rules of a language, the ones a paper dictionary follows, so
`"apple"` comes before `"Banana"`. `string.CompareOrdinal` follows only
the characters' numbers, and every capital letter has a smaller number
than every small letter, so `"apple"` comes after `"Banana"`.
`CompareOrdinal` gives the same answer on every computer, whatever
language the computer is set to.

A binary search must compare by the same rule that put the array in order.
The words on this page are all in capitals, and for capitals, the two
rules agree.

</details>

### Your turn

<div class="dl-world" data-world="secret-messages">

A codebreaker tries every shift on a coded word, and checks each decoding
against an array of English words, kept in alphabetical order. Can you
fill `found` with the shifts whose decoding is in `words`?

Each Run starts a new program, so this cell needs its own copy of
`BinarySearch` for words. Can you copy it from the cell above into the
space at the top? The cell already decodes the word with one shift, so
that you can see what `Decode` gives.

```csharp exec
id: your-turn-3--secret-messages
// Copy BinarySearch for words to here.

static string Decode(string word, int shift)
{
    string plain = "";
    foreach (char letter in word)
    {
        int position = letter - 'A';
        plain += (char)(((position - shift) % 26 + 26) % 26 + 'A');
    }
    return plain;
}

string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST"
};
string coded = "KHOOR";
Console.WriteLine($"{coded} with shift 1 is {Decode(coded, 1)}");
List<int> found = new();

Console.WriteLine(string.Join(", ", found));
```

```inputs
found
```

```hint
after: 1 runs
Can you try every shift from 0 to 25? For each one, decode the word, and
ask `BinarySearch(words, ...)` whether the decoding is there. It is there
when the answer is not -1.
```

```hint
after: 1 errors
Does the message say CS0103, and name `BinarySearch`? The method is in
another cell, and each Run starts a new program. Can you copy it into this
cell?
```

```solution
static int BinarySearch(string[] items, string target)
{
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        int mid = (low + high) / 2;
        int order = string.CompareOrdinal(target, items[mid]);
        if (order == 0)
        {
            return mid;
        }
        else if (order < 0)
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

static string Decode(string word, int shift)
{
    string plain = "";
    foreach (char letter in word)
    {
        int position = letter - 'A';
        plain += (char)(((position - shift) % 26 + 26) % 26 + 'A');
    }
    return plain;
}

string[] words =
{
    "AND", "ARE", "BIRD", "BRIDGE", "CODE", "DOOR", "EAST", "FROM", "HELLO", "HOUSE",
    "KEY", "LETTER", "MEET", "NIGHT", "NOON", "OTTER", "SPY", "THE", "TREE", "WEST"
};
string coded = "KHOOR";
Console.WriteLine($"{coded} with shift 1 is {Decode(coded, 1)}");
List<int> found = new();
for (int shift = 0; shift < 26; shift++)
{
    if (BinarySearch(words, Decode(coded, shift)) != -1)
    {
        found.Add(shift);
    }
}
Console.WriteLine(string.Join(", ", found));
---
The last line is 3: shift 3 gives HELLO. A real word list has tens of
thousands of words. For 30,000 words, binary search needs at most 15 looks
to tell whether a word is there, as the next section shows, where linear
search could need 30,000. The codebreaker does that 26 times, once for
each shift.
```

</div>

<div class="dl-world" data-world="pixel-art">

A picture 100 pixels wide and 100 tall has 10,000 pixels. Number them
along each row, so that the pixel at `row` and `column` is number
`row * 100 + column`. This picture is a diagonal line: in each row, the lit
pixel is the one whose column is the same as its row. `lit` is the sorted
array of the lit pixels' numbers. Each row of `points` is one point, its
row and then its column. Can you fill `answers` with `true` or `false` for
each point, with binary search?

Each Run starts a new program, so this cell needs its own copy of your
`BinarySearch`. Can you copy it from your turn above into the space at the
top? The cell already prints how many pixels are lit, and the first and
last numbers in `lit`, so that you can see what `lit` holds.

```csharp exec
id: your-turn-3--pixel-art
// Copy your BinarySearch method to here.

int[] lit = new int[100];
for (int row = 0; row < 100; row++)
{
    lit[row] = row * 100 + row;
}
Console.WriteLine($"{lit.Length} lit pixels, from {lit[0]} to {lit[^1]}");
int[,] points = { { 42, 42 }, { 42, 43 }, { 0, 0 }, { 99, 99 }, { 50, 49 } };
List<bool> answers = new();

Console.WriteLine(string.Join(", ", answers));
```

```inputs
answers
```

```hint
after: 1 runs
For each point, can you find its number, `row * 100 + column`? Is that
number in `lit`? It is when `BinarySearch` does not return -1.
`points.GetLength(0)` is the number of points.
```

```hint
after: 1 errors
Does the message say CS0103, and name `BinarySearch`? The method is in
another cell, and each Run starts a new program. Can you copy it into this
cell?
```

```solution
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

int[] lit = new int[100];
for (int row = 0; row < 100; row++)
{
    lit[row] = row * 100 + row;
}
Console.WriteLine($"{lit.Length} lit pixels, from {lit[0]} to {lit[^1]}");
int[,] points = { { 42, 42 }, { 42, 43 }, { 0, 0 }, { 99, 99 }, { 50, 49 } };
List<bool> answers = new();
for (int i = 0; i < points.GetLength(0); i++)
{
    int number = points[i, 0] * 100 + points[i, 1];
    answers.Add(BinarySearch(lit, number) != -1);
}
Console.WriteLine(string.Join(", ", answers));
---
The last line is `True, False, True, True, False`. Keeping only the lit
pixels, in order, saves space when most of a picture is empty. Binary
search needs at most 7 looks among these 100, as the next section shows.
```

</div>

### How much work is binary search?

Each look checks the middle element. If it is not the target, the search
keeps only the part before it or the part after it, and neither part is
more than half of the range. So after each look, at most half of the range
is left, rounded down. The most looks a search can need is the number of
times its size can be halved like that before nothing is left. This cell
counts them for four sizes: the fifteen numbers in `sortedNumbers`, the
hundred numbers of the game at the top, a word list of 30,000 words, and a
million items.

```csharp exec
id: how-much-work-is-binary-search-1
int[] sizes = { 15, 100, 30000, 1000000 };
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

The first line is the picture's search again: fifteen items, then seven,
three and one. A million items need at most 20 looks, where linear search
might need a million. That is the difference between *O(log n)* and O(n).
O(log n), said "order log n", means that the time grows with the number of
times n can be halved before it reaches 1, and that number grows very
slowly as n grows. Can you add a size of your own to `sizes`?

There is a cost. The data must be sorted first, and sorting takes time. So
binary search is worth it when the same data is searched many times, which
happens very often.

### Searches that C# already has

C# has both searches already, as methods of `Array`. What do you think
the last line prints?

```csharp exec
id: searches-csharp-has-1
string[] names = { "OTTER", "HERON", "BADGER", "WREN", "HARE", "STOAT" };
Console.WriteLine(Array.IndexOf(names, "WREN"));

int[] sortedNumbers = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 40, 42, 55, 68, 72, 89 };
Console.WriteLine(Array.BinarySearch(sortedNumbers, 31));
Console.WriteLine(Array.BinarySearch(sortedNumbers, 20));
```

```predict
type: choice

What will the last line print?

- -1
  - Our `BinarySearch` gives -1 for a target that is not there.
- A number below zero, but not -1
  - The number might say more than "not there".
- It stops with an exception
  - 20 is not in the array.
```

`Array.IndexOf` is a linear search. It gives the index, or -1 if the target
is not there. `Array.BinarySearch` is a binary search, and like ours, it
needs a sorted array. For a target that is not there, it gives a number
below zero, but not always -1: here, -6. That number says where 20 would
go, as problem 9 on the practice page shows.

So why write them ourselves? Knowing how each one works tells you when it
will be quick, and what it needs from its data. `Array.BinarySearch`
cannot know whether its array is sorted, just as ours cannot. Problem 5 on
the practice page shows what a binary search does with an array that is
not in order.

## Divide and conquer

Binary search is our first example of *divide and conquer*: split a
problem into smaller pieces, solve the pieces, and combine the answers. It
is one of the most useful ideas in the design of algorithms. A phone finds
a contact this way. You find a page in a book this way. A doctor who
halves the possible causes with each test works this way too.

In the game at the top of this page, what is the largest number of guesses
you could need, if you always guess the middle of what is left? How do you
know?

<details class="dl-answer"><summary>answer</summary>

You could need seven. Each guess leaves at most half of the numbers still
possible: 100, then at most 50, 25, 12, 6, 3 and 1. That is the second
line of the cell that counts looks, for 100 items. You can also see it
this way. Six halvings cover 2 × 2 × 2 × 2 × 2 × 2 = 64 numbers, which is
not enough, and seven cover 128, which is.

</details>

## Putting it together

This cell counts the comparisons both searches make, for the same target
in the same array. The array holds 0, 3, 6, 9 and so on, up to 999, and the
target is 600.

```csharp exec
id: putting-it-together-1
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

static int BinarySearchCounted(int[] items, int target)
{
    int comparisons = 0;
    int low = 0;
    int high = items.Length - 1;
    while (low <= high)
    {
        comparisons++;
        int mid = (low + high) / 2;
        if (items[mid] == target)
        {
            return comparisons;
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
    return comparisons;
}

int[] data = new int[334];
for (int index = 0; index < data.Length; index++)
{
    data[index] = index * 3;
}
int target = 600;
Console.WriteLine($"The array holds {data.Length} numbers, from {data[0]} to {data[^1]}.");
Console.WriteLine($"Linear search: {LinearSearchCounted(data, target)} comparisons");
Console.WriteLine($"Binary search: {BinarySearchCounted(data, target)} comparisons");
```

```predict
type: number
tolerance: 1

How many comparisons will binary search make?
```

Linear search makes 201 comparisons, and binary search 8. Can you try a
few more targets: the first number in the array, the last, a number in the
middle, and one that is not there? For each one, which search makes fewer
comparisons? Is there a target where linear search makes fewer? And what is
the most that binary search can need here? The cell that counts looks can
tell you, if you give it this array's size.

## Looking back

Binary search needs sorted data, and sorting takes time. When is it worth
sorting an array first, and when is a linear search the better choice?

A challenge: how many guesses does the game at the top need on average, if
you always guess the middle? Can you play it for every secret number from
1 to 100, count the guesses for each, and find the average? Is it closer
to 7, or lower? The starter makes the first guess, and stops there.

```csharp challenge
// Guess my number, played by the computer, for every secret from 1 to 100.
static int GuessesNeeded(int secret)
{
    int low = 1;
    int high = 100;
    int count = 0;
    int guess = (low + high) / 2;    // the first guess: the middle
    count++;
    // Can you keep guessing the middle of what is left, until the guess is the secret?
    return count;
}

Console.WriteLine(GuessesNeeded(50));
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:finding-things-practice) has more problems
on searching, and three from earlier pages. After it,
[Sorting](lesson:putting-things-in-order) looks at the other side of the
problem: how data is put in order.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Pound, M. (Computerphile) (2023). *Binary Search Algorithm*.
<https://www.youtube.com/watch?v=hDn8iOc30Tk>. It explains the same
halve-and-repeat idea as this page, with a different worked example.

Computerphile (2013). *Getting Sorted & Big O Notation*.
<https://www.youtube.com/watch?v=kgBjXUE_Nwc>. It explains where O(log n)
and O(n) come from, and how the same notation applies to sorting as well as
searching.

Microsoft. *Array.BinarySearch Method*.
<https://learn.microsoft.com/en-us/dotnet/api/system.array.binarysearch>.
The reference page for C#'s own binary search. The part called *Remarks*
explains the number below zero that it gives for a target that is not
there. It writes `~result` where problem 9 on the practice page writes
`-result - 1`, and the two give the same number. The page is written for
programmers who already know C#.
