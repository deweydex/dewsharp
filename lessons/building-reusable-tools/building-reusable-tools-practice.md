---
title: "Reusable methods: practice"
version: 2026.09.28.1
from: building-reusable-tools-practice
practice_for: building-reusable-tools
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Reusable methods: practice

Problems on XML comments, edge cases and tests, and three from earlier
pages. Where a problem has a cell of tests under it, those tests are
yours: add to them. Try each problem before you open anything under it.
Some cells are meant not to compile, or to stop with an exception, and the
problem says so.

The cells follow the rules of the road from
[the lesson](lesson:building-reusable-tools). A class written in a cell
can be used by the cells below it, and variables stay in their cell. Here
is `Test`, from the lesson, for the tests on this page. Each page has its
own cells, so it is written again here.

```csharp exec
id: a-tool-for-tests-1
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

## 1. An XML comment for F

Can you write an XML comment for this method, and give it a better name?

```csharp
public static double F(double a, double b)
{
    return (a + b) / 2;
}
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```csharp
/// <summary>Returns the number halfway between a and b.</summary>
public static double Midpoint(double a, double b)
{
    return (a + b) / 2;
}
```

Here the new name does more than the comment. A good name can make a
comment almost unnecessary. That is a success, and still no reason to
skip the comment.

</details>

## 2. What an XML comment says

An XML comment is for someone who is about to use the method. What three
things should it tell them?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

It should say what the method does, what it needs as input, and what it
returns, including what it does when the input is not what it expects. The
last is the part most often missing, and the part a reader most often
needs. `<exception cref="ArgumentException">values is empty.</exception>`
can save somebody an hour.

In C#, the compiler already checks the types. A method that takes a
`double[]` gets numbers, so the comment need not say so. It still has to
say "not empty", because the compiler does not check that.

</details>

## 3. A comment that is not true

What is the problem with this method's XML comment? The program below it
can show you.

```csharp exec
id: a-comment-that-is-not-true-1
file: Numbers.cs
static class Numbers
{
    /// <summary>Returns the mean of values, or 0 if values is empty.</summary>
    public static double Average(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total / values.Length;
    }
}
```

```csharp exec
id: a-comment-that-is-not-true-1-program
Console.WriteLine(Numbers.Average(new double[] { 4, 5 }));
Console.WriteLine(Numbers.Average(new double[0]));
```

<details class="dl-answer"><summary>answer</summary>

On an empty array, it prints NaN, not 0. The comment promises something
the code does not do. A comment that is not true is worse than none,
because people trust it. Either add the check, or change the sentence. If
you cannot decide which, you have found a question about what the method
is for.

</details>

## 4. The middle value

The *median* is the middle value of an array once it is sorted. With an
even number of values, it is the mean of the two in the middle. Can you
write `Median(double[] values)` in `Stats`, with an XML comment, and add
tests of your own?

The tests cell is meant not to compile until `Median` exists.

```csharp exec
id: the-middle-value-1
file: Stats.cs
static class Stats
{
    // Median, with its XML comment
}
```

```csharp exec
id: the-middle-value-1-tests
expect: CS0117
Test.Check("the median of 5, 1 and 9 is 5", 5, Stats.Median(new double[] { 5, 1, 9 }));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Stats.Median(new double[] { 3, 1, 2 })
Stats.Median(new double[] { 4, 1, 3, 2 })
Stats.Median(new double[] { 7 })
Stats.Median(new double[0])     // throws
```

```hint
after: 2 errors
How can you sort the values without changing the caller's array?
`values.ToArray()` makes a copy, and `Array.Sort` sorts it. The middle
index is `ordered.Length / 2`. When the length is even, which two indexes
are on either side of the middle?
```

```solution
Test.Check("the median of 5, 1 and 9 is 5", 5, Stats.Median(new double[] { 5, 1, 9 }));
Test.Check("the median of 4, 1, 3 and 2 is 2.5", 2.5, Stats.Median(new double[] { 4, 1, 3, 2 }));
double[] marks = { 3, 1, 2 };
Stats.Median(marks);
Test.Check("Median leaves the caller's array in its order", "3, 1, 2", string.Join(", ", marks));
Console.WriteLine("Every check held.");

static class Stats
{
    /// <summary>Returns the middle value of values, which must not be empty.</summary>
    public static double Median(double[] values)
    {
        double[] ordered = values.ToArray();
        Array.Sort(ordered);
        int middle = ordered.Length / 2;
        if (ordered.Length % 2 == 1)
        {
            return ordered[middle];
        }
        return (ordered[middle - 1] + ordered[middle]) / 2;
    }
}
---
`ToArray()` comes first, on purpose. `Array.Sort` changes the array it is
given, and asking for the median must not change the order of the
caller's array. The third check tests exactly that. `{ 4, 1, 3, 2 }` gives
2.5. `ordered.Length / 2` is whole-number division, which suits an index:
it gives a whole number, and drops the fraction.
```

## 5. What breaks them

Can you give an input that breaks each of these: the first `Stats.Mean`
on the lesson page, `Median` from problem 4, and C#'s own `Max()`?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

An empty array breaks all three. `Mean` gives NaN, because 0.0 divided by
0 has no answer: problem 3 shows it, with the same code. `Median` stops
with an `IndexOutOfRangeException`, because it asks for an element of an
empty array: the last input of problem 4 shows it. And `Max()` on an
empty array stops with an `InvalidOperationException`: the last input of
the first task on [the lesson](lesson:building-reusable-tools) shows it.

A method like these makes two assumptions: that its input is numbers, and
that there is at least one of them. In C#, the compiler checks the first
one for you. A `double[]` cannot hold a string, and a program that tries
does not compile. The second is left to you, so it is worth being clear
about it, in the code and in the XML comment.

</details>

## 6. Three ways

A method can meet an input it can't use by throwing an exception, by
returning `false` in the `TryParse` shape, or by returning a default
value. When does each one make sense?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

**Throw** when the call itself was a mistake, and continuing would hide
it: `Stats.Mean(new double[0])` almost always means a mistake earlier in
the program.

**Return `false`**, with the answer in an `out` parameter, when "no
answer" is a normal result that the caller should handle, such as a
number typed by a person who may type a word instead.

**Return a default** only when the default is a real answer, and not
because it is easy. The sum of an empty array is 0: that is what a sum of
nothing is. The mean of an empty array is not 0, and a 0 there is an
invented answer that appears in somebody's report.

</details>

## 7. The mean of true and false

What will this program do? Whatever happens when you run it is meant to
happen, and nothing is broken.

```csharp exec
id: the-mean-of-true-and-false-1
expect: CS0019
bool[] answers = { true, true, false };
int total = 0;
foreach (bool answer in answers)
{
    total = total + answer;
}
Console.WriteLine((double)total / answers.Length);
```

```predict
type: choice

What will it do?

- Print about 0.667
  - `true` counts as 1, and `false` as 0.
- Nothing: it does not compile
  - `answer` is a `bool`, and `total` is an `int`.
- Stop with an exception
  - C# discovers, when it runs, that it cannot add a `bool`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0019: Operator '+' cannot be applied to
operands of type 'int' and 'bool'`. In C#, `true` is not a number, and
the compiler says so before anything runs. (In Python, `True` counts as 1,
and the same program prints a fraction.) Is a mean of yes-or-no answers
useful? It is the fraction that said yes, which is often the number you
wanted. In C#, you count the yeses yourself. Can you change the loop so
that it does?

</details>

```solution
bool[] answers = { true, true, false };
int yes = 0;
foreach (bool answer in answers)
{
    if (answer)
    {
        yes = yes + 1;
    }
}
Console.WriteLine((double)yes / answers.Length);
---
It prints 0.6666666666666666, the fraction that said yes. `(double)` makes
`yes` a `double` before the division, so the fraction is kept.
```

## 8. A good method, and a check that does not hold

Here is a mean, and a test of it. Whatever happens when you run the cell
is meant to happen, and nothing is broken.

```csharp exec
id: a-test-that-fails-a-good-function-1
expect: exception
static double Mean(double[] values)
{
    double total = 0;
    foreach (double value in values)
    {
        total = total + value;
    }
    return total / values.Length;
}

Test.Check("the mean of 0.1 and 0.2 is 0.15", 0.15, Mean(new double[] { 0.1, 0.2 }));
Console.WriteLine("Every check held.");
```

```predict
type: choice

What will it do?

- Print Every check held.
  - The mean of 0.1 and 0.2 is 0.15.
- Stop with an exception
  - A `double` often cannot hold a decimal number exactly.
```

<details class="dl-answer"><summary>why</summary>

It stops with an exception, though the method has no mistake. The message says
`expected 0.15, found 0.15000000000000002`: most decimals cannot be stored
exactly in a `double` (the page
[Dividing](lesson:dividing-in-csharp)). A check that compares two
`double` values for exact equality tests how the computer stores numbers,
not your code. Check that they are close instead: that the difference
between them is tiny. `Math.Abs` gives a number without its minus sign.

</details>

```solution
static double Mean(double[] values)
{
    double total = 0;
    foreach (double value in values)
    {
        total = total + value;
    }
    return total / values.Length;
}

double difference = Mean(new double[] { 0.1, 0.2 }) - 0.15;
Test.Check("the mean of 0.1 and 0.2 is close to 0.15", true, Math.Abs(difference) < 0.000000001);
Console.WriteLine("Every check held.");
---
It prints `Every check held.` The check now asks whether the mean is
within a billionth of 0.15, and it is.
```

## 9. A test that holds at once

You write a test, and every check in it holds the first time. What should
you check?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

Check that it would stop if the code had a mistake. Put a mistake in the
method on purpose: return something else, or change a `<` to a `>`. Then
run the test again. Does it stop the program? A test that holds on code with a
mistake tests nothing, and the four suspects on the lesson page had three
mistakes ready to show it.

</details>

## 10. A test that checks for an exception

How can a test check that `Stats.Mean(new double[0])` throws an
`ArgumentException`, when an exception stops the program?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

It can use `try` and `catch`, from
[the lesson](lesson:building-reusable-tools). The `try` part makes the
call. The line after the call runs only if the call did not throw. The
`catch` part runs only if that kind of exception was thrown.

```csharp
try
{
    Stats.Mean(new double[0]);
    Console.WriteLine("No exception: the check for an empty array is missing.");
}
catch (ArgumentException)
{
    Console.WriteLine("An ArgumentException, as the XML comment promises.");
}
```

A test that checks for an exception matters as much as a test that checks
an answer. Most people skip the first kind.

</details>

## 11. Reads the same both ways

<div class="dl-world" data-world="secret-messages">

A *palindrome* reads the same forwards and backwards, like NOON. Can you
write `IsPalindrome(string text)` in `Letters`, which ignores spaces and
capital letters, so that `"Never odd or even"` counts? Add tests of your
own.

The tests cell is meant not to compile until `IsPalindrome` exists.

```csharp exec
id: reads-the-same-both-ways-1--secret-messages
file: Letters.cs
static class Letters
{
    // IsPalindrome, with its XML comment
}
```

```csharp exec
id: reads-the-same-both-ways-1-tests--secret-messages
expect: CS0117
Test.Check("NOON reads the same both ways", true, Letters.IsPalindrome("NOON"));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Letters.IsPalindrome("Never odd or even")
Letters.IsPalindrome("MEET ME")
Letters.IsPalindrome("")
```

```hint
after: 2 errors
Can you first build a string of the letters only, all in capitals?
`text.ToUpper()` gives the capitals, and a loop can skip the spaces. Then
compare it with itself backwards: a second loop can build the backwards
copy, from the last character to the first.
```

```solution
Test.Check("NOON reads the same both ways", true, Letters.IsPalindrome("NOON"));
Test.Check("MOON does not", false, Letters.IsPalindrome("MOON"));
Console.WriteLine("Every check held.");

static class Letters
{
    /// <summary>
    /// Returns true if text reads the same both ways, ignoring spaces and capitals.
    /// </summary>
    public static bool IsPalindrome(string text)
    {
        string letters = "";
        foreach (char character in text.ToUpper())
        {
            if (character != ' ')
            {
                letters = letters + character;
            }
        }
        string backwards = "";
        for (int i = letters.Length - 1; i >= 0; i--)
        {
            backwards = backwards + letters[i];
        }
        return letters == backwards;
    }
}
---
An empty string reads the same both ways, so it gives `true`. Is that
what you wanted? Your tests are the place to say so.
```

</div>

<div class="dl-world" data-world="pixel-art">

A row of pixels is *symmetric* if it looks the same in a mirror. Can you
write `IsSymmetric(int[][] picture)` in `Pixels`, which gives `true` when
every row of a picture is symmetric? Add tests of your own.

The tests cell is meant not to compile until `IsSymmetric` exists.

```csharp exec
id: reads-the-same-both-ways-1--pixel-art
file: Pixels.cs
static class Pixels
{
    // IsSymmetric, with its XML comment
}
```

```csharp exec
id: reads-the-same-both-ways-1-tests--pixel-art
expect: CS0117
Test.Check("a row of 1, 0, 1 is symmetric", true, Pixels.IsSymmetric(new int[][] { new int[] { 1, 0, 1 } }));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Pixels.IsSymmetric(new int[][] { new int[] { 0, 255, 0 }, new int[] { 255, 0, 255 } })
Pixels.IsSymmetric(new int[][] { new int[] { 1, 2 }, new int[] { 2, 2 } })
Pixels.IsSymmetric(new int[][] { })
```

```hint
after: 2 errors
Can you check the rows one at a time? In a row, `row[i]` has a partner in
the mirror, `row[row.Length - 1 - i]`. As soon as one pair differs, the
answer is `false`.
```

```solution
Test.Check("a row of 1, 0, 1 is symmetric", true, Pixels.IsSymmetric(new int[][] { new int[] { 1, 0, 1 } }));
Test.Check("a row of 1, 1, 0 is not", false, Pixels.IsSymmetric(new int[][] { new int[] { 1, 1, 0 } }));
Console.WriteLine("Every check held.");

static class Pixels
{
    /// <summary>Returns true if every row of picture reads the same both ways.</summary>
    public static bool IsSymmetric(int[][] picture)
    {
        foreach (int[] row in picture)
        {
            for (int i = 0; i < row.Length; i++)
            {
                if (row[i] != row[row.Length - 1 - i])
                {
                    return false;
                }
            }
        }
        return true;
    }
}
---
An empty picture has no row that breaks the rule, so it gives `true`.
That is how "every" works in mathematics too, and it is still worth a
test, so that nobody changes it by accident.
```

</div>

## 12. The longest word

`sentence.Split(' ')` gives an array of the words in a sentence, cut
wherever there is a space. Can you write `LongestWord(string sentence)` in
`Words`, and decide what it gives for a sentence with no words?

The tests cell is meant not to compile until `LongestWord` exists.

```csharp exec
id: the-longest-word-1
file: Words.cs
static class Words
{
    // LongestWord, with its XML comment
}
```

```csharp exec
id: the-longest-word-1-tests
expect: CS0117
Test.Check("there is longer than hi", "there", Words.LongestWord("hi there"));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Words.LongestWord("the quick brown fox")
Words.LongestWord("a bb cc")
Words.LongestWord("")
```

```hint
after: 2 errors
Can you keep the longest word so far in a variable, and look at each word
in turn? What should that variable hold before the loop starts?
```

```solution
Test.Check("there is longer than hi", "there", Words.LongestWord("hi there"));
Test.Check("the first of two long words", "quick", Words.LongestWord("the quick brown fox"));
Test.Check("an empty sentence", "", Words.LongestWord(""));
Console.WriteLine("Every check held.");

static class Words
{
    /// <summary>
    /// Returns the longest word in sentence. When two words are the longest,
    /// the first one is returned. An empty sentence gives an empty string.
    /// </summary>
    public static string LongestWord(string sentence)
    {
        string best = "";
        foreach (string word in sentence.Split(' '))
        {
            if (word.Length > best.Length)
            {
                best = word;
            }
        }
        return best;
    }
}
---
"quick", not "brown": both have five letters, and `>` keeps the first. The
XML comment now says so, and says what an empty sentence gives.
```

## 13. The most frequent

The *mode* is the value that appears most often. Can you write
`Mode(int[] numbers)` in `Stats`, say in its XML comment what happens with
a tie, and test it?

The tests cell is meant not to compile until `Mode` exists.

```csharp exec
id: the-most-frequent-1
file: Stats.cs
static class Stats
{
    // Mode, with its XML comment
}
```

```csharp exec
id: the-most-frequent-1-tests
expect: CS0117
Test.Check("the mode of 4, 4 and 1 is 4", 4, Stats.Mode(new int[] { 4, 4, 1 }));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Stats.Mode(new int[] { 3, 7, 3, 9, 7, 3, 1 })
Stats.Mode(new int[] { 5 })
Stats.Mode(new int[] { 2, 1, 1, 2 })
```

```hint
after: 2 errors
Can you count each value in a `Dictionary<int, int>`, as the page
[Dictionaries](lesson:looking-things-up-by-name) counted letters? Then, which value has the biggest count?
```

```solution
Test.Check("the mode of 4, 4 and 1 is 4", 4, Stats.Mode(new int[] { 4, 4, 1 }));
Test.Check("a tie goes to the value that appears first", 2, Stats.Mode(new int[] { 2, 1, 1, 2 }));
Console.WriteLine("Every check held.");

static class Stats
{
    /// <summary>
    /// Returns the value that appears most often in numbers, which must not
    /// be empty. With a tie, the value that appears first in numbers is returned.
    /// </summary>
    public static int Mode(int[] numbers)
    {
        Dictionary<int, int> counts = new Dictionary<int, int>();
        foreach (int number in numbers)
        {
            counts[number] = counts.GetValueOrDefault(number, 0) + 1;
        }
        int best = numbers[0];
        foreach (int number in numbers)
        {
            if (counts[number] > counts[best])
            {
                best = number;
            }
        }
        return best;
    }
}
---
`{ 2, 1, 1, 2 }` gives 2, because 2 comes first. The second loop visits
the values of the array, not the pairs of the dictionary: the array keeps
its order, and a dictionary does not promise one (the page
[Dictionaries](lesson:looking-things-up-by-name)). A rule for a tie that
nobody wrote in the XML comment is a rule that nobody can test.
```

## 14. From earlier: sorting a string

From [Sorting](lesson:putting-things-in-order). Whatever happens when you
run the cell is meant to happen, and nothing is broken.

```csharp exec
id: from-earlier-sorting-a-string-1
expect: CS1503
string word = "CAB";
Array.Sort(word);
Console.WriteLine(word);
```

```predict
type: choice

What will it print?

- ABC
  - `Array.Sort` puts the letters of a string in order.
- CAB
  - `Array.Sort` sorts a copy, and `word` keeps its order.
- Nothing: it does not compile
  - `Array.Sort` needs an array.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS1503: Argument 1: cannot convert from
'string' to 'System.Array'`. `Array.Sort` changes the array it is given,
and a string is not an array. A string cannot be changed at all (the page
[Arrays and lists](lesson:lists-and-sequences)). To sort its letters,
make an array of them with `word.ToCharArray()`, sort that array, and
make a new string from it with `new string(letters)`.

</details>

```solution
string word = "CAB";
char[] letters = word.ToCharArray();
Array.Sort(letters);
Console.WriteLine(new string(letters));
Console.WriteLine(word);
---
It prints ABC, and then CAB. `word` itself did not change: the sort
changed the array of letters, and the new string was made from that
array.
```

## 15. From earlier: minus one as an index

From [Searching](lesson:finding-things). Whatever happens when you run
the cell is meant to happen, and nothing is broken.

```csharp exec
id: from-earlier-minus-one-as-an-index-1
expect: exception
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

string[] names = { "OTTER", "HERON" };
Console.WriteLine(names[LinearSearch(names, "FOX")]);
```

```predict
type: choice

What will it do?

- Print HERON
  - -1 counts from the end: the last element.
- Stop with an exception
  - FOX is not there, and -1 is not an index.
- Print -1
  - The search gives -1 for "not there".
```

<details class="dl-answer"><summary>why</summary>

It stops with an `IndexOutOfRangeException`. The search said "not there"
with -1, and the caller used the -1 as an index. Indexes start at 0, so
there is no element -1. (The last element is `names[^1]`.) Here the
missing check stops the program at once, at the line that used the -1.
(In Python, `names[-1]` is the last element, and the same mistake quietly
prints HERON.) A caller must check for -1 before it uses the answer:
`if (index != -1)`.

</details>

## 16. From earlier: a key that is not there

From [Dictionaries](lesson:looking-things-up-by-name).

```csharp exec
id: from-earlier-a-key-that-is-not-there-1
Dictionary<char, int> counts = new Dictionary<char, int> { ['E'] = 9 };
Console.WriteLine(counts.GetValueOrDefault('Z'));
```

```predict
type: choice

What will it print?

- 0
  - A missing count is zero.
- Nothing: it stops with an exception
  - Z is not a key.
- An empty line
  - There is no value to print.
```

<details class="dl-answer"><summary>why</summary>

It prints 0. `GetValueOrDefault` never throws. With no default in the
brackets, it returns the default for the dictionary's value type, and for
`int` that is 0. `counts['Z']` would stop with a `KeyNotFoundException`,
as `key['Z']` did on the page about dictionaries. Here the default is a
real answer: Z appears 0 times. That is the third way from problem 6,
used where it makes sense.

</details>
