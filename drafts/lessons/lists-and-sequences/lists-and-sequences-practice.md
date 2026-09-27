---
title: "Arrays and lists: practice"
version: 2026.09.27.1
from: lists-and-sequences-practice
practice_for: lists-and-sequences
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Arrays and lists: practice

These problems are on arrays and lists, with three from earlier pages.
With indexes and ranges, you learn more by trying things than by solving
them in your head. So run the cells, change them, and test your guesses.
Each problem has an answer or a solution under it, for when you have tried
it. Some cells are meant not to compile, or to stop with an exception, and
the problem says so. A starting cell shows a warning, CS0219, while your
code does not use one of its variables. A warning does not stop the
program.

## 1. Which element

```csharp exec
id: which-element-1
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[^2]);
```

```predict
type: number

What will it print?
```

Then, with the same `numbers`, what does each of these give? Can you try
them in the cell?

- (a) `numbers[0]`
- (b) `numbers[2]`
- (c) `numbers[^1]`
- (d) `numbers[5]`
- (e) `numbers.Length`
- (f) `numbers[-1]`

<details class="dl-answer"><summary>answer</summary>

The cell prints 40, the second element from the end.

(a) 10. (b) 30. (c) 50. (d) The program stops with an exception, an
`IndexOutOfRangeException`. (e) 5. (f) The compiler shows a warning,
CS0251, *Indexing an array with a negative index (array indices always
start at zero)*. Then the program runs, and stops with the same exception
as (d).

An array of 5 elements has indexes 0 to 4, so the last one is always at
`numbers.Length - 1`. There is no index 5. In Python, `numbers[-1]` is the
last element. In C#, an index is never below 0, and the last element is
`numbers[^1]`.

</details>

## 2. Ranges

With `int[] numbers = { 10, 20, 30, 40, 50 };`, what does each range
give?

- (a) `numbers[1..3]`
- (b) `numbers[..2]`
- (c) `numbers[3..]`
- (d) `numbers[..]`
- (e) `numbers[^2..]`
- (f) `numbers[1..^1]`

```csharp exec
id: slices-1
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(string.Join(", ", numbers[1..3]));
```

<details class="dl-answer"><summary>answer</summary>

(a) `20, 30`. (b) `10, 20`. (c) `40, 50`. (d) The whole array, as a new
array. (e) `40, 50`. (f) `20, 30, 40`: every element except the first and
the last.

A range in C# has two numbers at most. Some languages let a slice take a
third number, a step, to take every second element. In C#, a for loop
that adds 2 to its counter does that.

</details>

## 3. Past the end

```csharp exec
id: past-the-end-1
expect: exception
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(string.Join(", ", numbers[3..100]));
```

```predict
type: choice

What will happen when you press Run?

- It prints 40, 50
  - A range stops at the end of the array, however far its number goes.
- It stops with an exception
  - There is no cut 100, so C# cannot take the range.
```

<details class="dl-answer"><summary>why</summary>

It stops with an exception, and this cell is meant to:
`System.ArgumentOutOfRangeException: Specified argument was out of the
range of valid values. (Parameter 'length')`. An *argument* is a value
given to a method, and here C# found one that it cannot use. An array of
five elements has the cuts 0 to 5, so a range that ends at cut 100 goes
past the end. C# does not shorten a range to fit the array. It stops, and
says so.

In Python, the same slice gives `[40, 50]`, with no error. A slice that
asks for more than there is gives less, and says nothing, and that can
hide a mistake.

</details>

## 4. MOON from NOON

A string cannot be changed, but a new one can be built from pieces of it.
Can you set `newWord` to `"MOON"`, using `word`?

```csharp exec
id: moon-from-noon-1
string word = "NOON";
string newWord = "";

Console.WriteLine(newWord);
```

```inputs
newWord
```

```solution
string word = "NOON";
string newWord = "M" + word[1..];
Console.WriteLine(newWord);
---
`word[1..]` is `"OON"`, everything from cut 1 to the end. `word` itself is
still `"NOON"`.
```

## 5. Ten squares

Can you build `squares`, the first ten square numbers, with a loop?

```csharp exec
id: ten-squares-1
List<int> squares = new();

Console.WriteLine(string.Join(", ", squares));
```

```inputs
squares
```

```solution
List<int> squares = new();
for (int number = 1; number <= 10; number++)
{
    squares.Add(number * number);
}
Console.WriteLine(string.Join(", ", squares));
---
`1, 4, 9, 16, 25, 36, 49, 64, 81, 100`. The loop starts at 1, and `<=`
includes 10. C# has no operator for a power, and `Math.Pow` gives a
`double` ([the closer look at powers](lesson:powers-in-csharp)), so
`number * number` is the simplest way to square an `int`.
```

## 6. Fibonacci

The Fibonacci sequence starts 1, 1. After that, each term is the sum of
the two before it: 1, 1, 2, 3, 5, 8, 13, and so on. Can you build
`fibonacci`, a list of the first fifteen terms?

```csharp exec
id: fibonacci-1
List<int> fibonacci = new() { 1, 1 };

Console.WriteLine(string.Join(", ", fibonacci));
```

```inputs
fibonacci
```

```hint
after: 1 runs
`fibonacci[^1]` is the last term so far, and `fibonacci[^2]` is the one
before it. How many times does the loop need to add a term, if two are
there already?
```

```solution
title: with a for loop
List<int> fibonacci = new() { 1, 1 };
for (int count = 0; count < 13; count++)
{
    fibonacci.Add(fibonacci[^1] + fibonacci[^2]);
}
Console.WriteLine(string.Join(", ", fibonacci));
```

```solution
title: with a while loop
List<int> fibonacci = new() { 1, 1 };
while (fibonacci.Count < 15)
{
    fibonacci.Add(fibonacci[^1] + fibonacci[^2]);
}
Console.WriteLine(string.Join(", ", fibonacci));
---
The while loop says what it is waiting for: fifteen terms. `^1` and `^2`
do the rest. "The last two" needs no sums with the length.
```

## 7. The golden ratio

Divide each Fibonacci number by the one before it: 1/1, 2/1, 3/2, 5/3,
and so on. What happens to the answers?

```csharp exec
id: the-golden-ratio-1
int[] fibonacci = { 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };
for (int index = 1; index < fibonacci.Length; index++)
{
    Console.WriteLine((double)fibonacci[index] / fibonacci[index - 1]);
}
```

Then can you remove `(double)`, and run the cell again? What changes, and
why?

<details class="dl-answer"><summary>answer</summary>

The answers come closer and closer to 1.6180339887…, the *golden ratio*,
which is exactly $(1 + \sqrt{5})/2$. They go above it, then below it, then
above again, and each time they come closer. The last one is
1.6180371352785146.

Without `(double)`, both numbers are `int`, and `/` with two `int` values
keeps only the whole part. So the loop prints 1 and 2, and then 1 every
time after that.

The loop goes by index because each step needs two elements: this one,
and the one before it.

</details>

## 8. Backwards

Can you build `result`, the array `numbers` backwards, with a loop?

```csharp exec
id: backwards-1
int[] numbers = { 10, 20, 30, 40, 50 };
List<int> result = new();

Console.WriteLine(string.Join(", ", result));
```

```inputs
result
```

```hint
after: 1 runs
The last index is `numbers.Length - 1`, and the first is 0. Can a for
loop count down between them?
```

```solution
title: with what you've met so far
int[] numbers = { 10, 20, 30, 40, 50 };
List<int> result = new();
for (int index = numbers.Length - 1; index >= 0; index--)
{
    result.Add(numbers[index]);
}
Console.WriteLine(string.Join(", ", result));
---
The loop counts down from the last index to 0. Its condition is
`index >= 0`, so that it includes 0.
```

```solution
title: a shorter way C# has
int[] numbers = { 10, 20, 30, 40, 50 };
int[] result = numbers[..];
Array.Reverse(result);
Console.WriteLine(string.Join(", ", result));
---
`numbers[..]` is a range with no numbers: a new array with every element
of `numbers`. `Array.Reverse` reverses the order of the elements in the
array it is given. It is given the new array, so `numbers` stays as it
was.
```

## 9. The longest word

Can you set `longest` to the longest word in the array?

```csharp exec
id: the-longest-word-1
string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT" };
string longest = words[0];

Console.WriteLine(longest);
```

```inputs
longest
```

```solution
string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT" };
string longest = words[0];
foreach (string word in words)
{
    if (word.Length > longest.Length)
    {
        longest = word;
    }
}
Console.WriteLine(longest);
---
`HEDGEHOG`. `longest` starts at the first word, so the answer is always
one of the words, even when every word is short.
```

## 10. Above the average

How many of these numbers are above their average? Can you set `above`?

```csharp exec
id: above-the-average-1
int[] numbers = { 4, 8, 15, 16, 23, 42 };
int above = 0;

Console.WriteLine(above);
```

```inputs
above
```

```solution
int[] numbers = { 4, 8, 15, 16, 23, 42 };
int total = 0;
foreach (int number in numbers)
{
    total += number;
}
double average = (double)total / numbers.Length;

int above = 0;
foreach (int number in numbers)
{
    if (number > average)
    {
        above++;
    }
}
Console.WriteLine(above);
---
The average is 18, and two numbers are above it. It takes two loops
through the array. The first finds the average, and the second compares
each number with it. One loop cannot do it, because the average depends on
numbers the loop has not reached yet.
```

## 11. Most often

Can you set `most` to the number that appears most often in the array?

```csharp exec
id: most-often-1
int[] numbers = { 3, 7, 3, 9, 7, 3, 1 };
int most = 0;

Console.WriteLine(most);
```

```inputs
most
```

```hint
after: 1 runs
For each number, can a second loop, inside the first, count how many
times it appears? Keep the best number so far, and how many times it
appears.
```

```solution
int[] numbers = { 3, 7, 3, 9, 7, 3, 1 };
int most = numbers[0];
int mostCount = 0;
foreach (int number in numbers)
{
    int count = 0;
    foreach (int other in numbers)
    {
        if (other == number)
        {
            count++;
        }
    }
    if (count > mostCount)
    {
        most = number;
        mostCount = count;
    }
}
Console.WriteLine(most);
---
3, three times. The inner loop reads the whole array, inside a loop that
reads the whole array too, so the work grows with the square of the
length. For seven numbers, nobody notices. For a million, you would wait.
If two numbers tie, the first one found is kept here: the problem did not
say.
```

## 12. Once each

Can you build `once`, the numbers with the repeated ones removed, in the
order they first appear?

```csharp exec
id: once-each-1
int[] numbers = { 3, 7, 3, 9, 7, 3, 1 };
List<int> once = new();

Console.WriteLine(string.Join(", ", once));
```

```inputs
once
```

```hint
after: 1 runs
A list has a `Contains` method, as a string has. What should the loop ask
about `once`, before it adds a number to it?
```

```solution
int[] numbers = { 3, 7, 3, 9, 7, 3, 1 };
List<int> once = new();
foreach (int number in numbers)
{
    if (!once.Contains(number))
    {
        once.Add(number);
    }
}
Console.WriteLine(string.Join(", ", once));
---
`3, 7, 9, 1`. `once` does two jobs: it is the answer, and it is the
record of what the loop has already seen. `once.Contains(number)` is
`true` when `number` is in the list already, and `!` gives the opposite.
```

## 13. Next door

<div class="dl-world" data-world="secret-messages">

Doubled letters are a clue when breaking a code. In English, EE, LL, SS
and OO are common. Can you build `doubles`, a list of the index of every
letter that is the same as the one after it?

```csharp exec
id: next-door-1--secret-messages
string message = "MEET ME BY THE OLD TREE";
List<int> doubles = new();

Console.WriteLine(string.Join(", ", doubles));
```

```inputs
doubles
```

```hint
after: 1 runs
The loop needs each letter and the one after it, so loop by index. The
last letter has nothing after it: where should the loop stop?
```

```solution
string message = "MEET ME BY THE OLD TREE";
List<int> doubles = new();
for (int index = 0; index < message.Length - 1; index++)
{
    if (message[index] == message[index + 1])
    {
        doubles.Add(index);
    }
}
Console.WriteLine(string.Join(", ", doubles));
---
`1, 21`, the EE in MEET and the EE in TREE. The loop stops one index
early, so `index + 1` is never past the end.
```

</div>

<div class="dl-world" data-world="pixel-art">

An *edge* in a picture is where dark meets light. Can you build `edges`,
a list of the index of every pixel below 128 whose right-hand neighbour is
128 or more?

```csharp exec
id: next-door-1--pixel-art
int[] row = { 20, 30, 200, 210, 40, 250, 240, 10 };
List<int> edges = new();

Console.WriteLine(string.Join(", ", edges));
```

```inputs
edges
```

```hint
after: 1 runs
The loop needs each pixel and the one after it, so loop by index. The
last pixel has nothing after it: where should the loop stop?
```

```solution
int[] row = { 20, 30, 200, 210, 40, 250, 240, 10 };
List<int> edges = new();
for (int index = 0; index < row.Length - 1; index++)
{
    if (row[index] < 128 && row[index + 1] >= 128)
    {
        edges.Add(index);
    }
}
Console.WriteLine(string.Join(", ", edges));
---
`1, 4`. The loop stops one index early, so `index + 1` is never past the
end. Photo software finds edges in this way, in every row and every
column.
```

</div>

## 14. A list that grows while a loop reads it

This loop adds to the list that it is reading. What do you think will
happen? Run it and see. The cell is meant to stop with an exception.

```csharp exec
id: a-list-that-grows-1
expect: exception
List<int> numbers = new() { 1, 2, 3 };
foreach (int number in numbers)
{
    numbers.Add(number * 10);
}
Console.WriteLine(string.Join(", ", numbers));
```

Can you change the program, so that it prints `1, 2, 3, 10, 20, 30`?

```hint
after: 1 runs
A for loop can read the list by index, and stop at a count that the
program keeps before the loop starts. Why must it keep the count before
the loop, and not use `numbers.Count` in the condition?
```

```solution
List<int> numbers = new() { 1, 2, 3 };
int count = numbers.Count;    // the count before the loop adds anything
for (int index = 0; index < count; index++)
{
    numbers.Add(numbers[index] * 10);
}
Console.WriteLine(string.Join(", ", numbers));
---
With `index < numbers.Count` in the condition, the count would grow each
time the loop added a number, and the loop would never end.
```

<details class="dl-answer"><summary>why</summary>

The program stops at the line with `foreach`, the second time it takes a
number: `System.InvalidOperationException: Collection was modified;
enumeration operation may not execute.` *Enumeration* is the word .NET
uses for taking the elements one at a time, as `foreach` does. A
`foreach` loop cannot continue after its list has changed, because it
cannot know which element should be next.

</details>

## 15. From earlier: or joins two conditions

From [the page on decisions](lesson:making-decisions). This is meant to
say whether a letter is a vowel. The cell is meant not to compile. What does the message say?

```csharp exec
id: from-earlier-always-true-1
expect: CS0019
char letter = 'T';
if (letter == 'A' || 'E' || 'I' || 'O' || 'U')
{
    Console.WriteLine("vowel");
}
else
{
    Console.WriteLine("not a vowel");
}
```

Can you change the condition, so that the cell prints `not a vowel` for T
and `vowel` for E?

```solution
char letter = 'T';
if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U')
{
    Console.WriteLine("vowel");
}
else
{
    Console.WriteLine("not a vowel");
}
---
Each part has its own comparison. A shorter condition is
`"AEIOU".Contains(letter)`.
```

<details class="dl-answer"><summary>answer</summary>

```console
Program.cs(2,5): error CS0019: Operator '||' cannot be applied to operands of type 'bool' and 'char'
```

`||` joins two conditions, and each side must be a `bool`. The left side,
`letter == 'A'`, is a comparison, so it is a `bool`. The right side, `'E'`,
is only a `char`. A character is not true or false in C#, so the compiler
stops. Each part needs its own comparison: `letter == 'E'`, and so on.

</details>

## 16. From earlier: how many times

From [the page on loops](lesson:repeating-yourself). What will this
print? Can you say before you run it?

```csharp exec
id: from-earlier-how-many-times-1
int count = 0;
for (int number = 2; number < 20; number += 3)
{
    count++;
}
Console.WriteLine(count);
```

<details class="dl-answer"><summary>why</summary>

6. `number` takes the values 2, 5, 8, 11, 14 and 17. The next would be
20, and the condition `number < 20` stops the loop before it.

</details>

## 17. From earlier: print or return

From the page on writing your own methods.

```csharp exec
id: from-earlier-print-or-return-1
expect: CS0029
static void DoubleAndPrint(int number)
{
    Console.WriteLine(number * 2);
}

int result = DoubleAndPrint(4);
Console.WriteLine(result);
```

```predict
type: choice

What will happen when you press Run?

- It prints 8, then 8
  - `result` holds what `DoubleAndPrint` calculated.
- It prints 8, then 0
  - `DoubleAndPrint` prints its answer, and gives nothing back.
- It does not compile, so nothing runs
  - A method that gives nothing back cannot be used after an `=`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile, and this cell is meant to fail. The message is:

```console
Program.cs(6,14): error CS0029: Cannot implicitly convert type 'void' to 'int'
```

`void` means that `DoubleAndPrint` gives nothing back, so there is no
value to put in `result`. It prints 8 and ends. With `static int` in
place of `static void`, and `return number * 2;` in place of the
`Console.WriteLine`, the program would print 8 once, from the last line.

</details>
