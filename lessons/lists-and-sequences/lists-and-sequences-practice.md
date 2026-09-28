---
title: "Arrays and lists: practice"
version: 2026.09.28.1
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
the problem says so.

## 1. Which element

```csharp exec
id: which-element-1
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[0]);
Console.WriteLine(numbers[2]);
Console.WriteLine(numbers[^1]);
Console.WriteLine(numbers.Length);
Console.WriteLine(numbers[^2]);
```

```predict
type: number

What will the last line print?
```

What will the four lines before it print? Say what you think, then run
it. Then can you add `Console.WriteLine(numbers[5]);` at the end, and run
it again?

If you have used Python, you may expect `numbers[-1]` to be the last
element. The next cell tries it, and it is meant to stop with an
exception. What does C# say before it stops?

```csharp exec
id: which-element-2
expect: exception
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[^1]);
Console.WriteLine(numbers[-1]);
```

<details class="dl-answer"><summary>answer</summary>

The first cell prints 10, 30, 50 and 5, and then 40, the second element
from the end.

An array of 5 elements has the indexes 0 to 4, so the last one is always
at `numbers.Length - 1`. There is no index 5, so `numbers[5]` stops the
program with an `IndexOutOfRangeException`, the same exception as the
second cell's.

In the second cell, the compiler shows a warning, CS0251, *Indexing an
array with a negative index (array indices always start at zero)*. A
warning does not stop the program, so it runs, and prints 50. Then it
stops at line 3, with an `IndexOutOfRangeException`. In C#, an index is
never below 0, and the last element is `numbers[^1]`.

</details>

## 2. Ranges

With `int[] numbers = { 10, 20, 30, 40, 50 };`, what does each range
give? The cell prints them in this order. Say what you think each line
will be, then run it.

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
Console.WriteLine(string.Join(", ", numbers[..2]));
Console.WriteLine(string.Join(", ", numbers[3..]));
Console.WriteLine(string.Join(", ", numbers[..]));
Console.WriteLine(string.Join(", ", numbers[^2..]));
Console.WriteLine(string.Join(", ", numbers[1..^1]));
```

<details class="dl-answer"><summary>answer</summary>

(a) `20, 30`. (b) `10, 20`. (c) `40, 50`. (d) `10, 20, 30, 40, 50`: a
range with no numbers takes every element, into a new array. (e)
`40, 50`. (f) `20, 30, 40`: every element except the first and the last.

A range in C# has two numbers at most. Some languages let a slice take a
third number, a step, to take every second element. In C#, a for loop
that adds 2 to its counter does that.

</details>

## 3. Past the end

This range goes past the end of the array. Whatever happens when you run
it is meant to happen, and nothing is broken.

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

It stops with an exception, and this cell is meant to. The page shows
this report:

```console
Unhandled exception. System.ArgumentOutOfRangeException: Specified argument was out of the range of valid values. (Parameter 'length')
   at line 2 of Program.cs
```

An *argument* is a value given to a method, and here C# found one that it
cannot use. `(Parameter 'length')` names a parameter of a method inside
.NET, the one that takes the range. It is not a name in your code. An
array of five elements has the cuts 0 to 5, so a range that ends at cut
100 goes past the end. C# does not shorten a range to fit the array. It
stops, and says so.

If you have used Python: a Python slice that asks for more than there is
gives less, with no error. That can hide a mistake.

</details>

## 4. MOON from NOON

A string cannot be changed, but a new one can be built from pieces of it.
Can you set `newWord` to `"MOON"`, using `word`?

```csharp exec
id: moon-from-noon-1
string word = "NOON";
string newWord = "";

Console.WriteLine(word);
Console.WriteLine(newWord);
```

```inputs
newWord
```

```solution
string word = "NOON";
string newWord = "M" + word[1..];
Console.WriteLine(word);
Console.WriteLine(newWord);
---
`word[1..]` is everything from cut 1 to the end of `word`. The first line
shows that `word` itself is still `NOON`.
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
`double` ([Powers](lesson:powers-in-csharp) looks at it closely), so
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

Here is the same loop without `(double)`. What changes, and why?

```csharp exec
id: the-golden-ratio-2
int[] fibonacci = { 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };
for (int index = 1; index < fibonacci.Length; index++)
{
    Console.WriteLine(fibonacci[index] / fibonacci[index - 1]);
}
```

<details class="dl-answer"><summary>answer</summary>

The answers go up and down in turn, and each step is smaller than the one
before. They come closer and closer to one number: the last three all
start 1.6180, and the last one is 1.6180371352785146. That number is the
*golden ratio*, which is exactly $(1 + \sqrt{5})/2$.

Without `(double)`, both numbers are `int`, and `/` with two `int` values
keeps only the whole part. So the second cell prints 1 and 2, and then 1
every time after that.

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
Console.WriteLine(string.Join(", ", numbers));
---
`numbers[..]` is a range with no numbers: a new array with every element
of `numbers`. `Array.Reverse` reverses the order of the elements in the
array it is given. It is given the new array, so `numbers` stays as it
was, as the second line shows.
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
Console.WriteLine($"The average is {average}");
Console.WriteLine(above);
---
The average is 18, and 2 numbers are above it. It takes two loops
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
Console.WriteLine($"It appears {mostCount} times.");
---
3, and it appears 3 times. The inner loop reads the whole array, inside a
loop that reads the whole array too, so the work grows with the square of
the length. For seven numbers, nobody notices. For a million, you would wait.
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

Console.WriteLine(message);
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
Console.WriteLine(message);
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

Console.WriteLine(string.Join(" ", row));
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
Console.WriteLine(string.Join(" ", row));
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

<details class="dl-answer"><summary>why</summary>

It stops at line 2, the line with `foreach`, and the page shows this
report:

```console
Unhandled exception. System.InvalidOperationException: Collection was modified; enumeration operation may not execute.
   at line 2 of Program.cs
```

*Enumeration* is the word .NET uses for taking the elements one at a time,
as `foreach` does. The body added a number to the list, and then `foreach`
went to take the next one. A `foreach` loop cannot continue after its list
has changed, because it cannot know which element should be next.
[Debugging](lesson:when-it-goes-wrong) meets this exception again, in a
loop that removes elements from a list.

</details>

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

## 15. From earlier: or joins two conditions

From [Decisions](lesson:making-decisions). This is meant to say whether a
letter is a vowel. The cell is meant not to compile. What does the message
say?

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

<details class="dl-answer"><summary>answer</summary>

```console
Program.cs(2,5): error CS0019: Operator '||' cannot be applied to operands of type 'bool' and 'char'
```

`||` joins two conditions, and each side must be a `bool`. The left side,
`letter == 'A'`, is a comparison, so it is a `bool`. The right side, `'E'`,
is only a `char`. A character is not true or false in C#, so the compiler
stops. Each part needs its own comparison: `letter == 'E'`, and so on.

</details>

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

## 16. From earlier: how many times

From [Loops](lesson:repeating-yourself). How many times does this loop
run its body? What will the last line print? Can you say before you run
it?

```csharp exec
id: from-earlier-how-many-times-1
int count = 0;
for (int number = 2; number < 20; number += 3)
{
    Console.Write($"{number} ");
    count++;
}
Console.WriteLine();
Console.WriteLine(count);
```

<details class="dl-answer"><summary>why</summary>

6. `number` takes the values 2, 5, 8, 11, 14 and 17, as the first line
shows. After 17, `number` becomes 20, the condition `number < 20` is
`false`, and the loop stops.

</details>

## 17. From earlier: print or return

From [Methods](lesson:writing-your-own-functions). Whatever happens when
you run this is meant to happen, and nothing is broken.

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

It did not compile, and this cell is meant to fail. The message is:

```console
Program.cs(6,14): error CS0029: Cannot implicitly convert type 'void' to 'int'
```

`void` means that `DoubleAndPrint` gives nothing back, so there is no
value to put in `result`. The program did not compile, so nothing ran, not
even the `Console.WriteLine` inside `DoubleAndPrint`.

</details>

Can you change the program, so that it prints 8 once, from its last
line?

```solution
static int DoubleAndReturn(int number)
{
    return number * 2;
}

int result = DoubleAndReturn(4);
Console.WriteLine(result);
---
`static int` says that the method gives back an `int`, and `return` gives
it back. The method no longer prints, so its name changes too:
`DoubleAndReturn`, as on [Methods](lesson:writing-your-own-functions).
```
