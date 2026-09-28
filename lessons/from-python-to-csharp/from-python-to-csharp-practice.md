---
title: "C# for Python programmers: practice"
version: 2026.09.28.3
from: many-languages-one-idea-practice
practice_for: from-python-to-csharp
---

# C# for Python programmers: practice

This page has problems for a Python programmer who is starting in C#.
Some show a
Python program and ask you to write it again in C#. Some show C# that a
Python habit has broken. Two are from an earlier page. Try each one before
you open anything under it, and say what you think before you run a cell.
Some cells are meant not to compile, and one is meant to stop with an
exception. Each Run starts a new program, so each cell makes the values it
uses.

## 1. Text and a number

In Python, `"5" + 1` stops with a `TypeError`: Python will not join text
and a number. What does C# do with the same line?

```csharp exec
id: text-and-a-number-1
Console.WriteLine("5" + 1);
Console.WriteLine(int.Parse("5") + 1);
```

```predict
type: choice

What will the first line print?

- 6
  - C# reads the text as a number, and adds.
- 51
  - C# changes the number into text, and joins the two.
- Nothing: it does not compile
  - `"5"` is a `string`, and `1` is an `int`.
```

<details class="dl-answer"><summary>why</summary>

The first line prints `51`. When one side of `+` is a `string`, C#
changes the other side into text, and joins them. So `"5" + 1` is the
text `51`, where Python stopped. Nothing warns you about it. Remember it
when a program reads a number as text, for example from the keyboard.

The second line prints `6`. `int.Parse("5")` reads the text as a whole
number, as `int("5")` does in Python, and then `+` adds.

</details>

## 2. Curly brackets and a loop

This loop has no curly brackets. The two lines under the `for` line are
indented in the same way.

```csharp exec
id: curly-brackets-and-a-loop-1
int count = 0;
for (int day = 1; day <= 3; day++)
    Console.WriteLine($"Day {day}");
    count = count + 1;
Console.WriteLine(count);
```

```predict
type: number

What will the last line print?
```

<details class="dl-answer"><summary>why</summary>

It prints `Day 1`, `Day 2` and `Day 3`, and then `1`. With no curly
brackets, only the one statement after the `for` line belongs to the
loop. `count = count + 1;` is indented as if it belonged to the loop too,
but C# does not read the indenting. So that line runs once, after the
loop has finished.

The pages on this site put curly brackets round every block, even a
block of one line, so that this can't happen. Can you add them, so that
the loop counts the days?

</details>

```solution
int count = 0;
for (int day = 1; day <= 3; day++)
{
    Console.WriteLine($"Day {day}");
    count = count + 1;
}
Console.WriteLine(count);
---
It prints the three days, and then 3. Both lines are in the loop's block
now, so both run each time.
```

## 3. The last score

In Python, `scores[-1]` is the last value in a list. What does C# do with
it?

```csharp exec
id: the-last-score-1
expect: exception
int[] scores = { 3, 5, 2 };
Console.WriteLine(scores[-1]);
```

```predict
type: choice

What will appear under the cell?

- 2
  - The last value, as in Python.
- A warning, and then it stops with an exception
  - C# numbers an array's values from 0, and has no value at -1.
- Only a message: it does not compile
  - The compiler can see the -1 before the program runs.
```

<details class="dl-answer"><summary>why</summary>

It compiles, with a warning, in a quieter style than an error:
`warning CS0251: Indexing an array with a negative index (array indices
always start at zero)`. A *warning* is a message about code that compiles
but may not do what you meant. A warning does not stop a program, so it
runs.
Then it stops on line 2 with an `IndexOutOfRangeException`: *Index was
outside the bounds of the array.* An array's values are numbered from 0,
and there is nothing at -1.

C#'s way to count from the end is `^`: `scores[^1]` is the last value,
and `scores[^2]` the one before it. Can you change the line, and run it
again?

</details>

```solution
int[] scores = { 3, 5, 2 };
Console.WriteLine(scores[^1]);
---
It prints 2, the last score.
```

## 4. Write it again: Fahrenheit

Here is a Python function that changes a temperature in degrees Celsius
into degrees Fahrenheit.

```python
def to_fahrenheit(celsius):
    return celsius * 9 / 5 + 32

print(to_fahrenheit(37))
```

Can you write it as a C# method, `ToFahrenheit`, and call it with 37?

```csharp exec
id: write-it-again-fahrenheit-1
// Your ToFahrenheit method, and a line that calls it

```

```inputs
ToFahrenheit(100)
ToFahrenheit(-40)
ToFahrenheit(37)      // a body temperature
```

```hint
after: 2 runs
A method's first line needs the type it returns, and a type for its
parameter. Which type keeps the part after the point?
```

```solution
static double ToFahrenheit(double celsius)
{
    return celsius * 9 / 5 + 32;
}

Console.WriteLine(ToFahrenheit(37));
---
It prints 98.6. With `int` in place of `double`, `celsius * 9 / 5`
divides two whole numbers, and the part after the point is lost. If your
method gives a whole number in the last row, look at its types.
```

## 5. Write it again: counting down

This Python loop counts down from 10 in steps of 3.

```python
for i in range(10, 0, -3):
    print(i)
```

Can you write it in C#, with a `for` loop?

```csharp exec
id: write-it-again-counting-down-1
// Your for loop here

```

```hint
after: 2 runs
A `for` loop's first line has three parts: where `i` starts, the
condition that must be `true` for the body to run, and how `i` changes
each time. What is each one here?
```

```solution
for (int i = 10; i > 0; i -= 3)
{
    Console.WriteLine(i);
}
---
It prints 10, 7, 4 and 1. `range(10, 0, -3)` stops before 0, so the
condition is `i > 0`. `i -= 3` takes 3 from `i` each time the body has
run, as `i = i - 3` does.
```

## 6. Write it again: counting over a limit

A game server times each answer it sends, in milliseconds. This Python
function counts how many of the times are over a limit.

```python
def count_over(values, limit):
    count = 0
    for value in values:
        if value > limit:
            count = count + 1
    return count

print(count_over([12, 3, 25, 8, 17], 10))
```

Can you write `CountOver` in C#? Its first parameter is a `List<int>`.

```csharp exec
id: write-it-again-counting-over-a-limit-1
// Your CountOver method, and a line that calls it

```

```inputs
CountOver(new List<int> { 12, 3, 25, 8, 17 }, 10)
CountOver(new List<int> { 1, 2 }, 10)
CountOver(new List<int>(), 10)       // an empty list
```

```hint
after: 2 runs
What does the method return, and what type is it? Each line of the Python
has a partner in C#. Which line becomes a `foreach`?
```

```solution
static int CountOver(List<int> values, int limit)
{
    int count = 0;
    foreach (int value in values)
    {
        if (value > limit)
        {
            count = count + 1;
        }
    }
    return count;
}

Console.WriteLine(CountOver(new List<int> { 12, 3, 25, 8, 17 }, 10));
---
It prints 3: 12, 25 and 17 are over 10. For an empty list, the loop's
body never runs, and the method returns the 0 that `count` started with.
```

## 7. Three Python habits

In each cell below, one line has a Python habit in it, and each cell is
meant not to compile. Can you find the line before you run the cell? Then
run it, read the message, and change the line so that the cell runs.

```csharp exec
id: three-python-habits-1
expect: CS1061
List<int> scores = new List<int> { 3, 5, 2 };
scores.append(4);
Console.WriteLine(string.Join(", ", scores));
```

```solution
List<int> scores = new List<int> { 3, 5, 2 };
scores.Add(4);
Console.WriteLine(string.Join(", ", scores));
---
It prints `3, 5, 2, 4`. The message said `'List<int>' does not contain a
definition for 'append'`. A C# list's method is `Add`, with a capital
letter, as every C# method name has.
```

```csharp exec
id: three-python-habits-2
expect: CS0103
List<int> scores = new List<int> { 3, 5, 2 };
Console.WriteLine(len(scores));
```

```solution
List<int> scores = new List<int> { 3, 5, 2 };
Console.WriteLine(scores.Count);
---
It prints 3. The message said `The name 'len' does not exist in the
current context`. C# has no `len`. A list knows its own `Count`, and an
array or a string knows its `Length`.
```

```csharp exec
id: three-python-habits-3
expect: CS0103
bool raining = True;
if (raining)
{
    Console.WriteLine("Bring an umbrella");
}
```

```solution
bool raining = true;
if (raining)
{
    Console.WriteLine("Bring an umbrella");
}
---
It prints `Bring an umbrella`. The message said `The name 'True' does not
exist in the current context`. In C#, `true` and `false` are written with
small letters, even though a `bool` prints as `True` or `False`.
```

## 8. One habit, five messages

This `if` is written as Python writes it. The cell is meant not to
compile. How many messages do you think one habit can cause? Run it, and
count them.

```csharp exec
id: one-habit-five-messages-1
expect: CS1003
int temperature = 22;
if temperature > 20:
    Console.WriteLine("A warm day");
```

<details class="dl-answer"><summary>why</summary>

Five messages, all on line 2. The first is `error CS1003: Syntax error,
'(' expected`, at the 4th character, where `temperature` starts. The
compiler expected the round bracket that starts a condition. The other
four, from `) expected` to `Type or namespace definition, or end-of-file
expected`, come from the same mistake: after it, the compiler cannot read
the rest of the line as C#. Read the first message first. When you
change the thing it names, the others often go too.

</details>

```solution
int temperature = 22;
if (temperature > 20)
{
    Console.WriteLine("A warm day");
}
---
It prints `A warm day`. The condition goes between round brackets, with
no colon, and the body goes between curly brackets.
```

## 9. From earlier: a remainder below zero

From [Your first C# program](lesson:first-steps). In Python, `-7 % 3` is
2, and `-7 // 3` is -3.

```csharp exec
id: a-remainder-below-zero-1
Console.WriteLine(-7 % 3);
Console.WriteLine(-7 / 3);
Console.WriteLine(-7.0 / 3);
```

```predict
type: number

What will the first line print?
```

<details class="dl-answer"><summary>why</summary>

It prints -1, and the second line prints -2. Both are different from
Python.

The third line shows the division with its decimal part:
-2.3333333333333335. C#'s `/` with two whole numbers drops the part after
the point, and gives -2. Python's `//` gives the next whole number below
instead, -3. Each language then chooses its remainder so that the whole
part × 3, plus the remainder, is −7 again. In C#, (−2 × 3) + (−1) is −7.
In Python, (−3 × 3) + 2 is −7. So in C#, `%` gives a number below zero when
the number on its left is below zero.

It matters when you move code from Python to C#. A secret code that
moves letters backwards along the alphabet with `%` works in Python and
gives a number below zero in C#.

</details>

## 10. From earlier: a missing semicolon

From [Your first C# program](lesson:first-steps). This cell is meant not
to compile. Can you find the line with the problem before you run it?

```csharp exec
id: a-missing-semicolon-1
expect: CS1002
int days = 7;
int wetDays = 3;
Console.WriteLine($"{wetDays} wet days out of {days}")
Console.WriteLine("Bring an umbrella");
```

<details class="dl-answer"><summary>why</summary>

The message is `Program.cs(3,55): error CS1002: ; expected`. Line 3 has
no semicolon, and the 55th character along it is just after its closing
bracket. A Python statement ends at the end of its line. A C# statement
ends at its semicolon, and a new line does not end it. Nothing ran, not
even lines 1 and 2. Can you add the semicolon, and run the cell again?

</details>

```solution
int days = 7;
int wetDays = 3;
Console.WriteLine($"{wetDays} wet days out of {days}");
Console.WriteLine("Bring an umbrella");
---
It prints `3 wet days out of 7`, and then `Bring an umbrella`.
```

## 11. An array, a list or a dictionary?

For each of these, which would you choose: an array, a `List<string>`, or
a `Dictionary<string, int>`? Why?

1. The names of the twelve months.
2. The names of the people who join a queue, one at a time.
3. Each learner's score, found by the learner's name.
4. The names of the people in a class this year, where people join and
   leave during the year.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

1. An array. There are always twelve months, so its length never needs
   to change.
2. A `List<string>`. It grows each time a person joins, with `Add`.
3. A `Dictionary<string, int>`. You find a score by a name, and not by a
   place in a row.
4. A `List<string>`, because it grows and shrinks. A list has a `Remove`
   method for the people who leave.

When you are not sure, a list is a good first choice, because it can do
what an array does and grow as well. An array says something useful to
the next person who reads the code: this length will not change.

</details>

## 12. What do the types cost?

Python did not ask you for a single type. C# asked for one on every
variable, every parameter and every method. What does writing them cost
you? And what do you gain from them?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

They cost time and words: `int days = 7;` is longer than `days = 7`, and
a method's first line is longer than a `def` line. You also have to know
the type of a value before you store it.

They give you mistakes found before the program runs. `days = "seven";`
did not compile, and nor does a call to `Report` with its two arguments
swapped. In Python, the first is allowed, and the second stops the
program only when it reaches that line. That might be after an hour of
running, or while somebody else is using the program. The types also say
what a method takes and returns, in its first line, so a reader knows
without reading its body. The next page,
[Compiler errors](lesson:compiler-errors), is about the messages the
types make possible.

</details>
