---
title: "Mixed problems: methods, lists and algorithms"
version: 2026.09.28.1
from: mixed-programming
covers: [PDP-LO2, PDP-LO7, PDP-LO8, PDP-LO9, PDP-LO10]
---

# Mixed problems: methods, lists and algorithms

Every problem on this page needs more than one page of this series, and
none of them says which. That is on purpose. A problem does not say that
it needs a dictionary and then a sort, or a loop inside a loop. Seeing
that is a skill of its own, apart from writing any one of them, and this
page is practice for it.

Most problems have more than one answer that works. Many of them hide a
decision that the question does not make: which word comes first when two
words tie, or what a method returns when there is nothing to find. Where a
problem hides one, its solution says what it decided, and why. Your method
can decide another way and work too. An XML comment, or a comment beside
the line, is the place to say which way you decided.

Try each problem before you open anything under it. Most problems ask for
a method, and **Compare with a solution** runs your method and a solution
on the same cases, side by side. Before you compare, can you write what
you think your method gives for each case? Two cells are meant to stop
with an exception, and the problem says so before you run them. Each Run
starts a new program (rule 1), so every cell has its own copy of each
method it uses, and you can do the problems in any order.

## 1. The longest word, however it is written

Can you write `LongestWord(string sentence)`, which returns the longest
word in the sentence, in capitals, and without its punctuation?
*Punctuation* means the marks between and around words, such as commas,
full stops and question marks.

```csharp exec
id: the-longest-word-however-it-is-written-1
static string LongestWord(string sentence)
{
    return "";
}

Console.WriteLine(LongestWord("Meet me, at the bridge!"));
```

```inputs
LongestWord("Meet me, at the bridge!")
LongestWord("a bb cc")        // two words of the same length
LongestWord("... !!")         // punctuation, and no letters
```

```hint
after: 2 runs
Which method puts a string in capitals, and which one cuts it into words?
Once a word is in capitals, which of its characters does `char.IsUpper`
say `true` for?
```

```solution
static string LongestWord(string sentence)
{
    string longest = "";
    foreach (string word in sentence.ToUpper().Split(' '))
    {
        // In capitals, IsUpper is true for a letter, and false for punctuation.
        string letters = "";
        foreach (char character in word)
        {
            if (char.IsUpper(character))
            {
                letters += character;
            }
        }
        if (letters.Length > longest.Length)    // >, so a tie goes to the first word
        {
            longest = letters;
        }
    }
    return longest;
}

Console.WriteLine(LongestWord("Meet me, at the bridge!"));
---
`BRIDGE`. A loop, a decision inside it, a string built one character at a
time, and the longest so far: four ideas from earlier pages, in one
method. With
`>`, a tie goes to the first word, so `"a bb cc"` gives `BB`. A "word"
that is only punctuation has no letters in it, so it never becomes the
longest, and `"... !!"` gives an empty string, `""`.
```

## 2. The three commonest words

Can you set `top` to the three words that appear most often in this
sentence, the most common first?

```csharp exec
id: the-three-commonest-words-1
string sentence = "the cat sat on the mat and the dog sat on the cat";
string[] words = sentence.Split(' ');
string[] top = new string[0];

Console.WriteLine($"{words.Length} words. The three commonest: {string.Join(", ", top)}");
```

```inputs
top
```

```hint
after: 2 runs
How did the page [Dictionaries](lesson:looking-things-up-by-name) count
how often each letter appears? Can a dictionary count words in the same
way?
```

```hint
after: 3 runs
On the page [Sorting](lesson:putting-things-in-order), `Array.Sort` took
a method that says which of two elements comes first. Can a method with no
`static` in front of it use `counts`? `counts.Keys.ToArray()` makes an
array of the words, and a range can take the first three.
```

```solution
title: by count
string sentence = "the cat sat on the mat and the dog sat on the cat";
string[] words = sentence.Split(' ');

Dictionary<string, int> counts = new();
foreach (string word in words)
{
    counts[word] = counts.GetValueOrDefault(word, 0) + 1;
}

// No static, so that it can use counts.
int MoreOftenFirst(string first, string second)
{
    return counts[second] - counts[first];
}

string[] byCount = counts.Keys.ToArray();
Array.Sort(byCount, MoreOftenFirst);
string[] top = byCount[..3];

Console.WriteLine($"{words.Length} words. The three commonest: {string.Join(", ", top)}");
foreach (string word in byCount)
{
    Console.WriteLine($"{word}: {counts[word]}");
}
---
It prints `the, cat, sat`. The lines under it give each word's count:
`the` appears 4 times, and `cat`, `sat` and `on` appear 2 times each. So
the question hides a decision. Three words tie, and only two of them fit
in the top three.

This solution does not decide. Here the three kept the order in which they
first appear in the sentence, and `on` is fourth. But nothing promised
that. The page [Sorting](lesson:putting-things-in-order) said that
`Array.Sort` does not promise to keep equal elements in the order they had
at the start. The page [Dictionaries](lesson:looking-things-up-by-name)
said that a dictionary does not promise an order for its keys. So another
version of .NET could give a different third word, and nothing in the code
would say why.
```

```solution
title: with a rule for a tie
string sentence = "the cat sat on the mat and the dog sat on the cat";
string[] words = sentence.Split(' ');

Dictionary<string, int> counts = new();
foreach (string word in words)
{
    counts[word] = counts.GetValueOrDefault(word, 0) + 1;
}

// More often first. For two words that appear equally often, alphabetical order.
int MoreOftenFirst(string first, string second)
{
    if (counts[first] != counts[second])
    {
        return counts[second] - counts[first];
    }
    return string.CompareOrdinal(first, second);
}

string[] byCount = counts.Keys.ToArray();
Array.Sort(byCount, MoreOftenFirst);
string[] top = byCount[..3];

Console.WriteLine($"{words.Length} words. The three commonest: {string.Join(", ", top)}");
foreach (string word in byCount)
{
    Console.WriteLine($"{word}: {counts[word]}");
}
---
It prints `the, cat, on`. This `MoreOftenFirst` decides the tie. When two
words appear equally often, it compares the words themselves with
`string.CompareOrdinal`, so the three words that appear 2 times come in
alphabetical order: `cat`, `on`, `sat`. Now the answer is the same on every
computer. Another rule works too, such as the word that appears first in
the sentence. What matters is that the code decides, and that a comment
says how.
```

## 3. Anagrams

Two words are *anagrams* when they use the same letters, the same number
of times each, as LISTEN and SILENT do. Here is a method, `SameLetters`,
that counts the letters of each word in a dictionary, and compares the two
dictionaries. What will the first line print?

```csharp exec
id: anagrams-1
static Dictionary<char, int> CountLetters(string word)
{
    Dictionary<char, int> counts = new();
    foreach (char letter in word)
    {
        counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
    }
    return counts;
}

static bool SameLetters(string first, string second)
{
    return CountLetters(first) == CountLetters(second);
}

Console.WriteLine(SameLetters("LISTEN", "SILENT"));
Console.WriteLine(SameLetters("LOOP", "LOOP"));
```

```predict
type: choice

What will the first line print?

- True
  - LISTEN and SILENT have the same letters, so their counts are the same.
- False
  - `==` asks a question about the two dictionaries, not about their pairs.
- Nothing: it does not compile
  - `==` cannot compare two dictionaries.
```

It prints `False`, and the second line is `False` too. By this method,
LOOP is not even an anagram of itself. Can you change `SameLetters`, so
that it says `True` for two anagrams, and `False` for two words that are
not?

```inputs
SameLetters("LISTEN", "SILENT")
SameLetters("LOOP", "POLO")
SameLetters("LOOP", "PLOP")
SameLetters("LOOP", "LOOPS")    // one letter more
```

```hint
after: 2 runs
On the [practice page for grids](lesson:grids-and-references-practice),
what did `==` ask about two arrays? A dictionary is a reference type, as
an array is.
```

```hint
after: 3 runs
Two counts are the same when they have the same number of keys, and each
key in one has the same value in the other. Which method of a dictionary
gives a key's value, or says that the key is not there?
```

```solution
title: with the counts
static Dictionary<char, int> CountLetters(string word)
{
    Dictionary<char, int> counts = new();
    foreach (char letter in word)
    {
        counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;
    }
    return counts;
}

static bool SameLetters(string first, string second)
{
    Dictionary<char, int> firstCounts = CountLetters(first);
    Dictionary<char, int> secondCounts = CountLetters(second);
    if (firstCounts.Count != secondCounts.Count)
    {
        return false;
    }
    foreach (KeyValuePair<char, int> pair in firstCounts)
    {
        if (!secondCounts.TryGetValue(pair.Key, out int count) || count != pair.Value)
        {
            return false;
        }
    }
    return true;
}

Console.WriteLine(SameLetters("LISTEN", "SILENT"));
Console.WriteLine(SameLetters("LOOP", "LOOP"));
---
`True`, twice. This `SameLetters` compares the two dictionaries pair by
pair. First it checks that both have the same number of keys. Then it
checks that each key in the first has the same value in the second.
`TryGetValue` gives `false` for a key that the second dictionary does not
have. Why does the method need the check on `Count`? If your method is
like this one, can you delete that check, and compare with a solution
again? Which case changes?
```

```solution
title: another way
static bool SameLetters(string first, string second)
{
    char[] firstLetters = first.ToCharArray();
    char[] secondLetters = second.ToCharArray();
    Array.Sort(firstLetters);
    Array.Sort(secondLetters);
    return firstLetters.SequenceEqual(secondLetters);
}

Console.WriteLine(SameLetters("LISTEN", "SILENT"));
Console.WriteLine(SameLetters("LOOP", "LOOP"));
---
`True`, twice. Sorting the letters of both words puts the same letters in
the same order, if they are the same letters. `ToCharArray` makes a new
array of a word's letters, so the sort leaves the word itself as it was.
`SequenceEqual`, from the
[practice page for grids](lesson:grids-and-references-practice), compares
two arrays element by element, in order.
```

<details class="dl-answer"><summary>why the first version says False</summary>

A dictionary is a reference type, as an array and a list are. For two
dictionaries, `==` asks whether the two names lead to the same
dictionary. It does not compare their pairs. Each call to `CountLetters`
makes a new dictionary with `new()`, so the two sides of `==` are always
two different dictionaries, even when their pairs are the same. The
compiler finds no problem, because `==` can compare any two references.

Strings are different: `==` on two strings compares their text. So the
second solution could also compare two strings made from the sorted
letters: `new string(firstLetters) == new string(secondLetters)`.

</details>

## 4. Ten thousand searches

You have a sorted array of a million numbers, and 10,000 numbers to find
in it. How would you find them? And how much faster is that than the
obvious way?

Can you decide before you run the cell? It does the arithmetic. First it
counts the looks that one binary search needs, as the page
[Searching](lesson:finding-things) did.

```csharp exec
id: ten-thousand-searches-1
int size = 1000000;
int searches = 10000;

// The most looks one binary search needs: halve the array until nothing is left.
int looks = 0;
for (int left = size; left > 0; left = left / 2)
{
    looks++;
}

long binary = (long)searches * looks;
long linear = (long)searches * (size / 2);    // on average, half the array
long sortFirst = (long)size * looks;          // a sort that takes about n log n

Console.WriteLine($"One binary search: at most {looks} looks");
Console.WriteLine($"Binary search, {searches} times: {binary} comparisons");
Console.WriteLine($"Linear search, {searches} times: {linear} comparisons");
Console.WriteLine($"Linear search makes {linear / binary} times as many");
Console.WriteLine($"Sorting first: {sortFirst} comparisons");
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

Binary search for each one. One binary search of a million numbers needs
at most 20 looks, so 10,000 searches need about 200000 comparisons. The
obvious way, a linear search for each one, checks half the array on
average: about 5000000000 comparisons, five thousand million. That is
25000 times as many.

What if the array were not sorted? A sort that takes about $n \log n$
steps, as `Array.Sort` does, costs about 20000000 comparisons here. The
cell finds it as `size` times `looks`, because $\log n$ is the number of
times n can be halved, as on the page [Searching](lesson:finding-things).
Even with the sort first, binary search makes far fewer comparisons than
linear search. Sorting once is worth it when the same data is searched
many times, as that page said.

Why `(long)`? 5000000000 is larger than the largest `int`. Can you delete
`(long)` from the line that makes `linear`, and run the cell again? It
prints a number that is far too small, and no message. `linear` is a
`long`, but `searches * (size / 2)` multiplies two `int` values, so C#
calculates an `int`. The answer is too large for an `int`, so it
overflows, as on the page
[Types and their sizes](lesson:types-and-their-sizes), before it reaches
`linear`. The type on the left of `=` does not change how C# calculates
what is on the right. `(long)` in front of `searches` makes the
multiplication a `long` one.

</details>

## 5. A pair with a given sum

Can you write `PairWithSum(int[] numbers, int target)`, which returns two
numbers from the array whose sum is `target`, as an array of two? When no
two numbers have that sum, it returns an empty array, `new int[0]`.

```csharp exec
id: a-pair-that-adds-up-1
static int[] PairWithSum(int[] numbers, int target)
{
    return new int[0];
}

int[] numbers = { 2, 7, 11, 15 };
Console.WriteLine(string.Join(" + ", PairWithSum(numbers, 9)));
```

```inputs
PairWithSum(new int[] { 2, 7, 11, 15 }, 9)
PairWithSum(new int[] { 3, 5, 8 }, 100)    // no pair has that sum
PairWithSum(new int[] { 5, 1 }, 10)        // 5 + 5, but there is only one 5
PairWithSum(new int[0], 5)                 // an empty array
```

```hint
after: 2 runs
How many pairs can four numbers make? Can one loop inside another visit
each pair once?
```

```hint
after: 3 runs
What does your method give for the third case? Where does the inner loop
start, so that a number is never paired with itself?
```

```solution
title: with what you've met so far
static int[] PairWithSum(int[] numbers, int target)
{
    for (int i = 0; i < numbers.Length; i++)
    {
        for (int j = i + 1; j < numbers.Length; j++)
        {
            if (numbers[i] + numbers[j] == target)
            {
                return new int[] { numbers[i], numbers[j] };
            }
        }
    }
    return new int[0];    // no pair: an empty array, not null
}

int[] numbers = { 2, 7, 11, 15 };
Console.WriteLine(string.Join(" + ", PairWithSum(numbers, 9)));
---
`[2, 7]` for the first case, and an empty array, `[]`, for the other
three. One loop inside another tries every pair. The inner loop starts at
`i + 1`, so a number is never paired with itself, and no pair is tried
twice. For n numbers there are about n × n / 2 pairs, so the work grows
with the square of the length, as it did for bubble sort.

An empty array, not `null`, says that there is no pair. Then a caller can
print the answer, or ask for its `Length`, without checking for `null`
first. Problem 8 shows what a `null` can do.
```

```solution
title: a faster way
static int[] PairWithSum(int[] numbers, int target)
{
    Dictionary<int, bool> seen = new();
    foreach (int number in numbers)
    {
        // Has the number that completes this pair appeared already?
        if (seen.ContainsKey(target - number))
        {
            return new int[] { target - number, number };
        }
        seen[number] = true;
    }
    return new int[0];
}

int[] numbers = { 2, 7, 11, 15 };
Console.WriteLine(string.Join(" + ", PairWithSum(numbers, 9)));
---
The same answers, in one pass. For each number, the method asks whether
the number that would complete the pair has appeared already. That is a
question for a dictionary, not a search. A dictionary finds a key without
checking every key, so the work grows with the length of the array, and
not with its square. The method asks before it stores the number, so a
number is never paired with itself. `seen` uses only its keys, and its
values are never read. The arithmetic is the same as in the first
solution. The question changed.
```

## 6. By surname

A *surname* is a family name. Here it is the last word of each name. Can
you sort these names by surname?

```csharp exec
id: by-surname-1
string[] names = { "Ada Lovelace", "Alan Turing", "Grace Hopper", "Karen Spärck Jones" };
Array.Sort(names);
Console.WriteLine(string.Join(", ", names));
```

It sorts them by the first name, because `Array.Sort` compares the whole
strings, from their first letters. Can you give `Array.Sort` a rule, so
that it sorts by the last word of each name?

```inputs
names
```

```hint
after: 2 runs
On the page [Sorting](lesson:putting-things-in-order), `Array.Sort` took
a second argument: a method that says which of two elements comes first.
Which part of each name should that method compare?
```

```hint
after: 3 runs
`name.Split(' ')` gives an array of the words in a name. Which index is
the last word? `string.CompareOrdinal` compares two strings.
```

```solution
static string LastWord(string name)
{
    return name.Split(' ')[^1];
}

static int BySurname(string first, string second)
{
    return string.CompareOrdinal(LastWord(first), LastWord(second));
}

string[] names = { "Ada Lovelace", "Alan Turing", "Grace Hopper", "Karen Spärck Jones" };
Array.Sort(names, BySurname);
Console.WriteLine(string.Join(", ", names));
---
`Grace Hopper, Karen Spärck Jones, Ada Lovelace, Alan Turing`.
`BySurname` compares the last words, and `Array.Sort` uses it each time
it compares two names.

Taking the last word is a guess about names. It does not hold for Karen
Spärck Jones. Her surname is two words, Spärck Jones, and the sort put
her between Hopper and Lovelace, as if her surname were Jones. Many Irish
surnames have two words too, such as Ní
Dhomhnaill and Mac Giolla. It does not hold for a name written with the
family name first, as Chinese, Hungarian and Japanese names often are, or
for a person with one name. It works for most of this list. Not every
name in the world has its surname in its last word, so an XML comment on
`BySurname` should say what it does.
```

## 7. Merging two sorted arrays

To *merge* two sorted arrays is to make one sorted list from all their
elements. Can you write `Merge(int[] first, int[] second)`, which does
that without sorting anything?

```csharp exec
id: merging-two-sorted-lists-1
static List<int> Merge(int[] first, int[] second)
{
    List<int> result = new();
    return result;
}

List<int> merged = Merge(new int[] { 1, 4, 9 }, new int[] { 2, 3, 10 });
Console.WriteLine(string.Join(", ", merged));
```

```inputs
Merge(new int[] { 1, 4, 9 }, new int[] { 2, 3, 10 })
Merge(new int[0], new int[] { 5 })          // one array is empty
Merge(new int[] { 2, 2 }, new int[] { 2 })
```

```hint
after: 2 runs
Can you keep an index into each array, `i` for `first` and `j` for
`second`? The smallest element not used yet is `first[i]` or `second[j]`.
Which one goes into `result` next, and what happens to its index?
```

```hint
after: 3 runs
When one array has no elements left, what happens to the elements that
are still in the other one? Are they in order already?
```

```solution
static List<int> Merge(int[] first, int[] second)
{
    List<int> result = new();
    int i = 0;
    int j = 0;
    while (i < first.Length && j < second.Length)
    {
        if (first[i] <= second[j])    // <=, so that equal elements keep their order
        {
            result.Add(first[i]);
            i++;
        }
        else
        {
            result.Add(second[j]);
            j++;
        }
    }
    // One array has no elements left. The rest of the other is in order already.
    while (i < first.Length)
    {
        result.Add(first[i]);
        i++;
    }
    while (j < second.Length)
    {
        result.Add(second[j]);
        j++;
    }
    return result;
}

List<int> merged = Merge(new int[] { 1, 4, 9 }, new int[] { 2, 3, 10 });
Console.WriteLine(string.Join(", ", merged));
---
`1, 2, 3, 4, 9, 10`. Each time the first loop runs its body, the smaller
of the two elements not used yet goes into `result`. When one array has
no elements left, the rest of the other one is in order already, so the
last two loops add it at the end as it is. `<=`, not `<`, takes from
`first` when two elements are equal. So equal elements keep the order
they had at the start: the merge is *stable*, a word from the page
[Sorting](lesson:putting-things-in-order).

Merging is the main step of *merge sort*, which that page named as a sort
that takes about $n \log n$ steps. Merge sort splits an array into pieces
of one element each, and a piece of one element is sorted already. Then
it merges the pieces in pairs, and then those in pairs, until one sorted
array is left.
```

## 8. Where the null came from

This program finds somebody on a team by the first letter of their name,
and makes a badge for them. It stops with an exception, and it is meant
to. Run it, and read the report. Which line failed, and which line is
responsible? You can write both in the comments at the end.

```csharp exec
id: where-the-null-came-from-1
expect: exception
static string FindName(string[] names, char initial)
{
    foreach (string name in names)
    {
        if (name[0] == initial)
        {
            return name;
        }
    }
    return null;
}

static string Badge(string[] names, char initial)
{
    string name = FindName(names, initial);
    return $"{name.ToUpper()}, {name.Length} letters";
}

string[] team = { "Ada", "Grace", "Alan" };
Console.WriteLine(Badge(team, 'G'));
Console.WriteLine(Badge(team, 'L'));

// The line that failed:
// The line that is responsible:
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

It prints `GRACE, 5 letters`. Then it stops with a
`NullReferenceException`, and the page shows this report:

```console
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at line 16 of Program.cs (in Badge(string[], char))
   at line 21 of Program.cs
```

The line that failed is line 16, in `Badge`. `name.ToUpper()` asks `name`
for its text in capitals, and `name` holds `null`: no string at all. Line
21 is the line that called `Badge`, with `'L'`.

The line that is responsible is `return null;`, in `FindName`. Nobody's
name starts with L, so `FindName` returned `null`, and nothing in its
first line says that it can. `Badge` trusted it, and used the `null` as a
name. A `null` travels, as a NaN did on the page
[Reusable methods](lesson:building-reusable-tools), and the report names
the place where it was used, not the place where it was made.

There are several ways to change the program, and each one is a decision.
`FindName` could throw an `ArgumentException`, as `Mean` did on
[Reusable methods](lesson:building-reusable-tools), with a message that
names the letter. It could have the shape of `int.TryParse`: return
`true` or `false`, and put the name in an `out` parameter. Or `Badge`
could check whether `name == null` before it uses it. Whichever you
choose, an XML comment should say what happens when no name starts with
the letter, so that the next caller knows before the call.

</details>

Can you change the program, so that it prints a badge for G, and for L a
sentence that says nobody's name starts with L?

```hint
after: 2 errors
Which method knows that nobody was found: `FindName`, or `Badge`? How can
it tell the other one, without a `null`?
```

```solution
title: with the shape of TryParse
/// <summary>Finds the first name in names that starts with initial.</summary>
/// <returns>true, with the name in found; false if no name starts with initial.</returns>
static bool TryFindName(string[] names, char initial, out string found)
{
    foreach (string name in names)
    {
        if (name[0] == initial)
        {
            found = name;
            return true;
        }
    }
    found = "";    // an out parameter needs a value on every path
    return false;
}

static string Badge(string[] names, char initial)
{
    if (!TryFindName(names, initial, out string name))
    {
        return $"Nobody's name starts with {initial}.";
    }
    return $"{name.ToUpper()}, {name.Length} letters";
}

string[] team = { "Ada", "Grace", "Alan" };
Console.WriteLine(Badge(team, 'G'));
Console.WriteLine(Badge(team, 'L'));
---
It prints `GRACE, 5 letters`, then `Nobody's name starts with L.`
`TryFindName` has the shape of `int.TryParse`, `TryGetValue` and
`Stats.TryMean`. It returns `false` when nobody's name starts with the
letter, and its XML comment says so. `Badge` checks the `bool` before it
uses `name`, so a missing name cannot travel.

In some languages, a method that prints its answer where it should return
it gives its caller an empty value, like this `null`, and the mistake
appears lines later. In C#, the compiler finds that mistake before the
program runs (CS0029), as the page
[Methods](lesson:writing-your-own-functions) showed.
```

## 9. A list that will not empty

```csharp exec
id: a-list-that-will-not-empty-1
static void StartAgain(List<int> items)
{
    items = new();
}

List<int> row = new() { 1, 2, 3 };
StartAgain(row);
Console.WriteLine($"{row.Count} elements: {string.Join(", ", row)}");
```

```predict
type: choice

What will it print?

- 0 elements:
  - `items` and `row` name one list, so an empty `items` is an empty `row`.
- 3 elements: 1, 2, 3
  - `items = new();` gives the name `items` a new list, inside the method.
- Nothing: it does not compile
  - A parameter cannot be given a new value.
```

It prints `3 elements: 1, 2, 3`. The list is not empty.

<details class="dl-answer"><summary>why</summary>

`items = new();` gives the parameter `items` a new, empty list, inside the
method. That changes only the method's own name, `items`, which now leads
to the new list. `row` still names the first list, and nothing changed
that list. This is the first row of the table on the page
[Grids and references](lesson:grids-and-references): a parameter that
gets a new value with `=` changes only the method's own copy. A method that changes the list its parameter names, as `Add` does,
changes the caller's list, because the two names lead to one list.

These few lines need two pages: passing by value, from
[Methods](lesson:writing-your-own-functions), and two names for one list,
from [Two names, one list](lesson:two-names-one-list).

</details>

Can you change `StartAgain`, so that `row` is empty after the call?

```hint
after: 2 runs
Which of the two can the caller see: a parameter that gets a new list, or
a change to the list that the parameter names?
```

```hint
after: 3 runs
A list has a method, `Clear`, that removes every element from the list
itself. Which list does `items.Clear()` empty?
```

```solution
static void StartAgain(List<int> items)
{
    items.Clear();    // empties the list that items names, which is the caller's list
}

List<int> row = new() { 1, 2, 3 };
StartAgain(row);
Console.WriteLine($"{row.Count} elements: {string.Join(", ", row)}");
---
It prints `0 elements:`. `items.Clear()` changes the list that `items`
names, and that list is the caller's `row`. Another way works too: a
method that returns a new, empty list, and a caller that stores it with
`row = ...;`. Which of the two is clearer to somebody who reads only the
call?
```

## 10. Any base

Can you write `ToBase(int number, int numberBase)`, which returns a whole
number written in any base from 2 to 16, as text, with the digits
`0123456789ABCDEF`? This version finds the last digit only. (The
parameter is called `numberBase`, because C# keeps the word `base` for a
job of its own.)

```csharp exec
id: any-base-1
static string ToBase(int number, int numberBase)
{
    string digits = "0123456789ABCDEF";
    return digits[number % numberBase].ToString();    // the last digit only
}

Console.WriteLine(ToBase(42, 2));
```

```inputs
ToBase(42, 2)
ToBase(255, 16)
ToBase(42, 8)
ToBase(0, 2)
```

```hint
after: 2 runs
How did `ToBinary`, on the page
[Programming languages](lesson:how-we-got-here), find each digit, and
where in the text did it put it? Where did it use the number 2?
```

```hint
after: 3 runs
What does your method give for 0? What did `ToBinary` do with 0?
```

```solution
static string ToBase(int number, int numberBase)
{
    string digits = "0123456789ABCDEF";
    if (number == 0)
    {
        return "0";
    }
    string text = "";
    while (number > 0)
    {
        text = digits[number % numberBase] + text;
        number = number / numberBase;
    }
    return text;
}

Console.WriteLine(ToBase(42, 2));
Console.WriteLine(ToBase(255, 16));
Console.WriteLine(Convert.ToString(255, 16));
---
`101010`, `FF` and `52`, and `0` for 0. This is `ToBinary` with
`numberBase` in place of 2. `number % numberBase` is the last digit, and
`number / numberBase` drops it. `digits[...]` writes the digit as a
character, so a digit above 9 is a letter, from A to F. One method covers
binary, hexadecimal and every base between them: the base is a parameter,
not a new program.

The last line is C#'s own `Convert.ToString(255, 16)`: `ff`, with small
letters. `Convert.ToString` knows only a few bases, and this method knows
every base from 2 to 16.
```

## 11. A week of steps

Here are the steps somebody walked on each day of one week. Can you write
`Report(int[] steps)`, which returns a dictionary of four numbers? Each
number has a key of its own:

- `"most"`: the day with the most steps, counting the days from 1;
- `"fewest"`: the day with the fewest steps;
- `"above average"`: how many days were above the week's average;
- `"longest run"`: the most days above the average, one after another.

```csharp exec
id: a-week-of-steps-1
static Dictionary<string, int> Report(int[] steps)
{
    Dictionary<string, int> report = new();
    return report;
}

int[] week = { 4200, 8100, 9000, 3000, 7600, 8800, 9100 };
Console.WriteLine($"A week of {week.Length} days:");
foreach (KeyValuePair<string, int> pair in Report(week))
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

```inputs
Report(week)
Report(new int[] { 5000 })    // one day
```

```hint
after: 2 runs
The average needs every day before any day can be compared with it. How
many loops does that take?
```

```hint
after: 3 runs
The run needs two numbers as the loop goes: the run now, and the longest
run so far. What happens to the run now on a day above the average, and on
a day that is not?
```

```solution
static Dictionary<string, int> Report(int[] steps)
{
    // The first loop: the most, the fewest, and the total for the average.
    int most = 0;       // the index of the day with the most steps so far
    int fewest = 0;
    int total = 0;
    for (int day = 0; day < steps.Length; day++)
    {
        if (steps[day] > steps[most])
        {
            most = day;
        }
        if (steps[day] < steps[fewest])
        {
            fewest = day;
        }
        total += steps[day];
    }
    double average = (double)total / steps.Length;

    // The second loop: the days above the average, and the longest run of them.
    int above = 0;
    int run = 0;
    int longestRun = 0;
    foreach (int daySteps in steps)
    {
        if (daySteps > average)
        {
            above++;
            run++;
        }
        else
        {
            run = 0;
        }
        if (run > longestRun)
        {
            longestRun = run;
        }
    }

    Dictionary<string, int> report = new()
    {
        ["most"] = most + 1,    // the days count from 1, and the indexes from 0
        ["fewest"] = fewest + 1,
        ["above average"] = above,
        ["longest run"] = longestRun,
    };
    return report;
}

int[] week = { 4200, 8100, 9000, 3000, 7600, 8800, 9100 };
Console.WriteLine($"A week of {week.Length} days:");
foreach (KeyValuePair<string, int> pair in Report(week))
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
---
Day 7 has the most steps, and day 4 the fewest. 5 days are above the
average, and the longest run of them, one after another, is 3 days. The
average needs every day first, so there are two loops. The first finds
the total, and the second compares each day with the average. `most` and
`fewest` are indexes, which count from 0, so the report adds 1 to each.
If two days tie for the most steps, `>` keeps the first of them.

The two numbers for the run, the run now and the longest run so far, are
worth remembering. The same lines find the longest run of anything: wins
one after another, dry days, or the same letter again and again in a
message. For one day, that day has
the most steps and the fewest, and it is not above its own average, so
the last two numbers are 0.
```

## 12. Sorted, and the same things

Can you write `IsSorted(int[] items)`, which says whether an array is in
order, smallest first? And `SameItems(int[] first, int[] second)`, which
says whether two arrays hold the same elements, in any order?

```csharp exec
id: sorted-and-the-same-things-1
static bool IsSorted(int[] items)
{
    return false;
}

static bool SameItems(int[] first, int[] second)
{
    return false;
}

int[] before = { 3, 1, 2 };
int[] after = { 1, 2, 3 };
Console.WriteLine($"Is after sorted? {IsSorted(after)}");
Console.WriteLine($"The same items? {SameItems(before, after)}");
Console.WriteLine($"before is {string.Join(", ", before)}");
```

```inputs
IsSorted(new int[] { 1, 2, 2, 5 })
IsSorted(new int[] { 3, 1 })
IsSorted(new int[0])                                        // an empty array
SameItems(new int[] { 3, 1, 2 }, new int[] { 1, 2, 3 })
SameItems(new int[] { 1, 1 }, new int[] { 1 })
before                                                      // after the program's own call to SameItems
```

```hint
after: 2 runs
Which pairs of elements does `IsSorted` need to compare? Can one pair be
enough to say `false`?
```

```hint
after: 3 runs
Does the last line under the cell still say `before is 3, 1, 2`?
`Array.Sort` changes the array it is given, and a parameter is one more
name for the caller's array. How can `SameItems` sort a copy?
```

```solution
static bool IsSorted(int[] items)
{
    for (int i = 0; i < items.Length - 1; i++)
    {
        if (items[i] > items[i + 1])
        {
            return false;
        }
    }
    return true;
}

static bool SameItems(int[] first, int[] second)
{
    // Sort copies, so that the caller's arrays keep their order.
    int[] firstSorted = first.ToArray();
    int[] secondSorted = second.ToArray();
    Array.Sort(firstSorted);
    Array.Sort(secondSorted);
    return firstSorted.SequenceEqual(secondSorted);
}

int[] before = { 3, 1, 2 };
int[] after = { 1, 2, 3 };
Console.WriteLine($"Is after sorted? {IsSorted(after)}");
Console.WriteLine($"The same items? {SameItems(before, after)}");
Console.WriteLine($"before is {string.Join(", ", before)}");
---
It prints `Is after sorted? True` and `The same items? True`, and then
`before is 3, 1, 2`, as it was at the start. `IsSorted` compares each
element with the next one, and one pair out of order is enough to say
`false`. An empty array has no pairs, so nothing in it is out of order,
and `IsSorted` says `true`.

`SameItems` sorts copies. `ToArray` makes a new array with the same
elements, so `Array.Sort` changes the copy, and `before` keeps its order.
A `SameItems` that sorts `first` itself changes the caller's array,
because the parameter is one more name for it, and the last line under
the cell shows the change.

These two methods together are how to test a sort. A sort's answer must
be in order, and it must hold the same elements that it was given. `IsSorted`
alone accepts a sort that returns an empty array every time, and
`SameItems` alone accepts a sort that changes nothing.
```

## 13. The missing number

An array holds every whole number from 1 to `n`, except one. Can you write
`Missing(int[] numbers, int n)`, which finds the missing number, and does
as little work as it can?

```csharp exec
id: the-missing-number-1
static int Missing(int[] numbers, int n)
{
    return 0;
}

Console.WriteLine(Missing(new int[] { 1, 2, 4, 5 }, 5));
```

```inputs
Missing(new int[] { 1, 2, 4, 5 }, 5)
Missing(new int[] { 2, 3 }, 3)
Missing(new int[0], 1)
```

```hint
after: 2 runs
Before you look at the array, what should the total of the numbers from 1
to `n` be? Problem 4 on the
[practice page for loops](lesson:repeating-yourself-practice) found a
formula for it.
```

```hint
after: 3 runs
The total of the numbers from 1 to `n` is $\frac{n(n + 1)}{2}$. What is
the difference between that and the total of the array?
```

```solution
static int Missing(int[] numbers, int n)
{
    int total = 0;
    foreach (int number in numbers)
    {
        total += number;
    }
    return n * (n + 1) / 2 - total;
}

Console.WriteLine(Missing(new int[] { 1, 2, 4, 5 }, 5));
---
3, 1 and 1. The method adds the array once, and takes that total from the
total that the numbers from 1 to `n` should have. There is no sort and no
search. Sorting the array and searching it for the gap works too, and so
does a search for each number from 1 to `n`, but each of them does more
work. The formula uses something you *know* about the data, not only what
you can see in it, and that is often where a short answer is.

For a very large `n`, `n * (n + 1)` is too large for an `int`, as the
counts in problem 4 were, and a `long` holds it.
```

## 14. Mines next door

In the game Minesweeper, a field of squares hides some mines. Each square
that is not a mine shows how many mines are next to it: in the eight
squares around it, above, below, beside and on the diagonals. Here the
field is an `int[][]`, with 1 for a mine and 0 for a square with none.

`MinesAround(field, row, column)` counts the mines next to one square. It
works in the middle of the field. The second call asks about the square in
the top left corner, and it is meant to stop with an exception.

```csharp exec
id: mines-next-door-1
expect: exception
static int MinesAround(int[][] field, int row, int column)
{
    int mines = 0;
    for (int r = row - 1; r <= row + 1; r++)
    {
        for (int c = column - 1; c <= column + 1; c++)
        {
            if (field[r][c] == 1)
            {
                mines++;
            }
        }
    }
    return mines;
}

int[][] field =
{
    new int[] { 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 0 },
    new int[] { 1, 0, 0, 0 },
};
Console.WriteLine(MinesAround(field, 1, 1));
Console.WriteLine(MinesAround(field, 0, 0));
```

It prints 3 for the square in row 1 and column 1. Then it stops with an
`IndexOutOfRangeException`, at line 8, in `MinesAround`. Can you make
`MinesAround` work for every square, at the edges and in the corners too?
And what should it give for a square that is a mine itself? Can you
decide, and write your decision in a comment?

```inputs
MinesAround(field, 1, 1)
MinesAround(field, 0, 0)    // the top left corner
MinesAround(field, 2, 3)    // the bottom right corner
MinesAround(field, 1, 2)    // a square that is a mine itself
```

```hint
after: 1 errors
Which index is outside the bounds of the array? For the square in row 0
and column 0, which rows and columns does the loop try?
```

```hint
after: 2 errors
Before the loop reads `field[r][c]`, can an `if` check that `r` is a row
of the field, and `c` a column of that row? Which operator joins two
checks, and stops at the first one that is `false`?
```

```hint
after: 2 runs
Does your method count the square it was asked about? When `r` is `row`
and `c` is `column`, should it count?
```

```solution
static int MinesAround(int[][] field, int row, int column)
{
    int mines = 0;
    for (int r = row - 1; r <= row + 1; r++)
    {
        for (int c = column - 1; c <= column + 1; c++)
        {
            bool inField = r >= 0 && r < field.Length && c >= 0 && c < field[r].Length;
            bool itself = r == row && c == column;
            if (inField && !itself && field[r][c] == 1)
            {
                mines++;
            }
        }
    }
    return mines;
}

int[][] field =
{
    new int[] { 0, 1, 0, 0 },
    new int[] { 0, 0, 1, 0 },
    new int[] { 1, 0, 0, 0 },
};
Console.WriteLine(MinesAround(field, 1, 1));
Console.WriteLine(MinesAround(field, 0, 0));
---
3 and 1. The checks for the edges come first, in `inField`, and `&&`
stops at the first check that is `false`. So the method asks for
`field[r].Length` only when row `r` is there, and it reads `field[r][c]`
only inside the field. The order matters: with `field[r][c] == 1` first, the method
would read outside the field before it checked.

The hidden decision is the square itself. In the game, a mine's own square
shows no number, so the game never asks. This solution never counts the
square it was asked about, so a mine with one mine next to it gives 1, the
last case in the table. The first version counted the square itself too,
but in the middle of the field that square had no mine, so nobody could
see it.
```

## 15. Somebody else's method

You are given somebody else's method. It compiles, and it gives the
answers its author expected. What would you check before you use it in
your own program?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

- What it does with nothing: an empty array, an empty string, 0.
  Problems 5, 7, 12 and 13 each tried an empty array, and problem 1 a
  sentence with no letters in it.
- What it does with `null`, if a caller could pass one, and whether it
  can return `null` itself, as `FindName` did in problem 8.
- Whether it changes what it is given, or only reads it. An array or a
  list that you pass to it is your own, under one more name (problems 9
  and 12).
- Whether it gives the same answer every time for the same input, or
  depends on something outside it.
- What it does with input it was not written for: a number below zero
  where a count was expected, or a word where a number was.
- What its XML comment promises, and whether a test agrees.

It probably works on the cases it was written for. The problems are at
the edges, where code you did not write meets data you did not expect.

</details>

<details class="dl-hint"><summary>which pages each problem uses</summary>

For a teacher, or for anybody who is stuck: these are the pages whose
ideas each problem uses.

| Problem | Pages |
|---|---|
| 1. The longest word, however it is written | [Methods](lesson:writing-your-own-functions), [Arrays and lists](lesson:lists-and-sequences), [Loops](lesson:repeating-yourself) |
| 2. The three commonest words | [Dictionaries](lesson:looking-things-up-by-name), [Sorting](lesson:putting-things-in-order), [Arrays and lists](lesson:lists-and-sequences) |
| 3. Anagrams | [Dictionaries](lesson:looking-things-up-by-name), [Grids and references](lesson:grids-and-references), [Sorting](lesson:putting-things-in-order) |
| 4. Ten thousand searches | [Searching](lesson:finding-things), [Sorting](lesson:putting-things-in-order), [Types and their sizes](lesson:types-and-their-sizes) |
| 5. A pair with a given sum | [Methods](lesson:writing-your-own-functions), [Arrays and lists](lesson:lists-and-sequences), [Dictionaries](lesson:looking-things-up-by-name), [Searching](lesson:finding-things) |
| 6. By surname | [Sorting](lesson:putting-things-in-order), [Arrays and lists](lesson:lists-and-sequences), [Searching](lesson:finding-things) |
| 7. Merging two sorted arrays | [Arrays and lists](lesson:lists-and-sequences), [Loops](lesson:repeating-yourself), [Sorting](lesson:putting-things-in-order) |
| 8. Where the null came from | [Debugging](lesson:when-it-goes-wrong), [Reusable methods](lesson:building-reusable-tools), [Methods](lesson:writing-your-own-functions) |
| 9. A list that will not empty | [Methods](lesson:writing-your-own-functions), [Grids and references](lesson:grids-and-references), [Two names, one list](lesson:two-names-one-list) |
| 10. Any base | [Programming languages](lesson:how-we-got-here), [Methods](lesson:writing-your-own-functions), [Loops](lesson:repeating-yourself) |
| 11. A week of steps | [Arrays and lists](lesson:lists-and-sequences), [Dictionaries](lesson:looking-things-up-by-name), [Methods](lesson:writing-your-own-functions) |
| 12. Sorted, and the same things | [Reusable methods](lesson:building-reusable-tools), [Sorting](lesson:putting-things-in-order), [Grids and references](lesson:grids-and-references) |
| 13. The missing number | [Loops](lesson:repeating-yourself), [Arrays and lists](lesson:lists-and-sequences), [Searching](lesson:finding-things) |
| 14. Mines next door | [Grids and references](lesson:grids-and-references), [Debugging](lesson:when-it-goes-wrong), [Decisions](lesson:making-decisions) |
| 15. Somebody else's method | [Reusable methods](lesson:building-reusable-tools), [Debugging](lesson:when-it-goes-wrong) |

</details>

## Looking back

Which problem took you longest? Was the hard part the C#, or deciding
what the method should do? Several problems on this page had code that
compiled, and then did something that nobody meant: `==` on two
dictionaries, a parameter that got a new list, a `null` that travelled,
and a sort that could change its caller's array. Which of them would a
test have found, and which test would you write?

A challenge: can you draw a whole Minesweeper field? Copy your
`MinesAround` from problem 14 into the notebook, in place of the one that
gives 0. Then print the field, with `*` for each mine, and on every other
square the number of mines next to it.

```csharp challenge
// Copy your MinesAround from problem 14 in place of this one.
static int MinesAround(int[][] field, int row, int column)
{
    return 0;
}

int[][] field =
{
    new int[] { 0, 1, 0, 0, 0 },
    new int[] { 0, 0, 1, 0, 0 },
    new int[] { 1, 0, 0, 0, 1 },
    new int[] { 0, 0, 0, 1, 0 },
};

// Can you print the whole field: * for a mine,
// and the number of mines next door on every other square?
Console.WriteLine($"Mines next to the top left corner: {MinesAround(field, 0, 0)}");
```

This is the last page of the series *Methods, lists and algorithms*. The
next series, *Working in a team*, starts with
[A whole program](lesson:from-cells-to-a-program). There, methods like
the ones on this page go into a class of their own, in a file of their
own, in Visual Studio, as they do when each person on a team writes one
part.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project, which prints the same there.

## Where to read more

Exercism. *C# track*. <https://exercism.org/tracks/csharp>. More problems
of this kind, in C#, free. Each problem has tests that say what your code
should give, and a volunteer mentor can read your solution and comment on
it, if you ask.

Advent of Code. <https://adventofcode.com>. A set of programming puzzles
every December, for any language. The first puzzles of each year need
what this series taught: loops, arrays, dictionaries and sorting. The
puzzles from earlier years are all still there, with their stories.

Stand-up Maths. *Someone improved my code by 40,832,277,770%*.
<https://www.youtube.com/watch?v=c33AZBnRHks>. Matt Parker wrote a program
to solve a word puzzle, and it ran for about a month. People who watched
his videos wrote programs that solve the same puzzle in a small part of a
second, mostly by choosing better algorithms and better ways to keep the
words. Problem 4 on this page is a small example of the same idea. The
video is about 29 minutes long.
