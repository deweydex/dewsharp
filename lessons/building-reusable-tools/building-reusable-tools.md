---
title: "Reusable methods: a class of tools, and tests for them"
version: 2026.09.28.1
from: building-reusable-tools
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO8, PDP-LO10, PDP-LO11, PDP-LO7]
---

# Reusable methods: a class of tools, and tests for them

Here is a method that calculates the average of an array of whole
numbers: its *mean*, the total divided by how many numbers there are. It
works on the first array. What happens on the second? Whatever happens
when you run the cell is meant to happen, and nothing is broken.

```csharp exec
id: a-mean-that-works-1
expect: exception
static double Mean(int[] numbers)
{
    int total = 0;
    foreach (int value in numbers)
    {
        total = total + value;
    }
    return total / numbers.Length;
}

Console.WriteLine(Mean(new int[] { 10, 20, 30 }));
Console.WriteLine(Mean(new int[0]));
```

```predict
type: choice

What will the last line do?

- Print 0
  - There are no numbers, so the mean is nothing.
- Print ∞
  - The method divides by the length, and the length is 0.
- Stop with an exception
  - `total` and `numbers.Length` are both whole numbers.
- Nothing: it does not compile
  - The compiler can see that the array is empty.
```

It prints 20, and then it stops with a `DivideByZeroException`, on the
line with `return`. `total` and `numbers.Length` are both whole numbers,
and C# cannot divide a whole number by zero. The compiler did not find
the problem, because it checks names and types, and the length of an
array is a value, which is known only when the program runs.

The method works for every array its author tried, and stops on one they
did not. This page shows how to write methods that other people, and you
next month, can trust. We say what a method promises, test that it keeps
the promise, and decide on purpose what it does with the inputs nobody
expected. And we move our methods into a class of their own, where every
cell below can use them.

## What makes a good method?

A good method does one thing, and makes clear what it does. Here is a
mean again, in a new place: a class of its own, called `Stats`. As you
read it, what makes it easy to use?

The first cell below holds only a class, so it has a **Check** button in
place of **Run**. A class on its own does nothing, because it has no
statements to run. **Check** compiles the class, and tells you about any
problem. The program in the second cell uses the class.

```csharp exec
id: what-makes-a-good-function-1
file: Stats.cs
static class Stats
{
    /// <summary>
    /// Returns the mean of the numbers in values.
    /// </summary>
    /// <param name="values">The numbers. The array must not be empty.</param>
    /// <returns>The mean, as a double.</returns>
    public static double Mean(double[] values)
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
id: what-makes-a-good-function-1-program
Console.WriteLine(Stats.Mean(new double[] { 10, 20, 30 }));
Console.WriteLine(Stats.Mean(new double[] { 1, 2, 3, 4, 5 }));
```

It prints 20 and 3. Three things in the first cell are new.

**A class.** `static class Stats` makes a class called `Stats`. A *class*
is a named part of a program that keeps methods together. (The course on
object-oriented programming uses classes to describe kinds of things, and
makes objects from them. A `static` class is simpler: nothing is made from
it, and it only keeps methods together.) Until now, a method belonged to
the cell it was written in. A class written in a cell can be used by every
cell below it, so every program on this page can call `Stats.Mean`.

**`public static`.** `public` lets code outside the class call the
method. `static` goes with the `static` on the class: every method in a
static class has it. Here, `static` means that the method belongs to the
class itself. (On the page [Methods](lesson:writing-your-own-functions),
`static` in front of a method in a cell meant that the method could use
only its parameters and its own variables. A `static` method in a class
can also use a variable that its class keeps, as the section "Variable
scope, again" shows.) To call the method, we write the class's name, a
dot, and the method's name: `Stats.Mean(...)`. You have used two static
classes already: `Console`, since the first page, as in
`Console.WriteLine`, and `Math`, as in `Math.Sqrt`. `Stats` is one of our
own.

**An XML comment.** The lines that start with `///` describe the method,
just above it. *XML* is a way to mark the parts of a text with names in
angle brackets, such as `<summary>`. The `<summary>` says what the method
does, `<param>` says what it needs, and `<returns>` says what it returns.
Together, those are the method's *contract*: its promise. Give it this,
and it gives you that. In Visual Studio, the summary appears when you rest
the mouse pointer on the method's name, anywhere in the program. So anyone
can use `Stats.Mean` without reading its code. From here on, every method
we write has an XML comment. One clear sentence in `<summary>` is often
enough.

The label on the first cell says `Stats.cs`: the name that the cell's code
would have as a file. In Visual Studio, each class usually has a file of
its own, named after it.

## The rules of the road

Until this page, each cell was a program on its own. Now a class written
in one cell is used in the cells below it. Five rules say how the cells on
a page share code. We call them the *rules of the road*. Every page with
classes follows them, so each one has a small cell here. Run each one.

### 1. Each Run starts a new program

**Each Run starts a new program.** It runs from the first line of the cell
to the last.

```csharp exec
id: the-rules-of-the-road-1
int runs = 0;
runs = runs + 1;
Console.WriteLine($"Runs: {runs}");
```

Run it three times. It prints `Runs: 1` each time. The second Run does not
start from where the first one finished: each Run starts again, at the
first line. Every page so far has worked this way.

### 2. A class can be used below

**A class written in a cell can be used by the cells below it.** So can
an interface, a record, an enum or a struct, which the course on
object-oriented programming meets.

```csharp exec
id: the-rules-of-the-road-2
double[] marks = { 55, 70, 64 };
Console.WriteLine(Stats.Mean(marks));
```

It prints 63. This cell has no class in it. It uses `Stats`, from
`Stats.cs` higher up the page.

### 3. Variables stay in their cell

**Variables stay in their cell.** Nothing that a cell's statements made is
there for the next cell. The next cell is meant to fail: it tries to use
`marks`, from the cell above.

```csharp exec
id: the-rules-of-the-road-3
expect: CS0103
Console.WriteLine(Stats.Mean(marks));
```

It does not compile: `error CS0103: The name 'marks' does not exist in the
current context`. Under the message, the page adds a line: *marks was
made in a cell above. Variables stay in their cell, so make it again in
this cell.* A class can be used in the cells below it, and a variable
can't. Can you make this cell work by adding one line at the top?

```solution
double[] marks = { 55, 70, 64 };
Console.WriteLine(Stats.Mean(marks));
---
It prints 63. This `marks` is a new array, made in this cell.
```

### 4. A class written again replaces the earlier one

**A class written again further down replaces the earlier one.** Here is
`Stats` again, with one change: a second method, `Total`, and a `Mean`
that uses it.

```csharp exec
id: the-rules-of-the-road-4
file: Stats.cs
static class Stats
{
    /// <summary>Returns the sum of the numbers in values.</summary>
    public static double Total(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total;
    }

    /// <summary>Returns the mean of values, which must not be empty.</summary>
    public static double Mean(double[] values)
    {
        return Total(values) / values.Length;
    }
}
```

```csharp exec
id: the-rules-of-the-road-4-program
double[] marks = { 55, 70, 64 };
Console.WriteLine(Stats.Total(marks));
Console.WriteLine(Stats.Mean(marks));
```

It prints 189 and 63. Inside the class, `Mean` calls `Total` by its name
alone, with no `Stats.` in front, because both are in the same class.

This cell uses the new `Stats`, and so does every cell below it, until
another cell writes `Stats` again. The cells above still use the first
one. Can you add `Console.WriteLine(Stats.Total(marks));` to the cell for
rule 2, and run it there? What does the compiler say? The cell for rule 2
is above this one, so it uses the first `Stats`, which has no `Total`.

### 5. `Main` stays in its cell

**`Main` stays in its cell.** Visual Studio, and many books, start a
program with a method called `Main`, inside a class. A cell can have one
too, and **Run** starts the program there.

```csharp exec
id: the-rules-of-the-road-5
class Report
{
    static void Main()
    {
        double[] marks = { 55, 70, 64 };
        Console.WriteLine($"Mean mark: {Stats.Mean(marks)}");
    }
}
```

It prints `Mean mark: 63`. A class that has a `Main` stays in its cell,
with its `Main`, as statements do. The cells below can't use `Report`, and
running them never runs this `Main`. On these pages we write statements,
as in every other cell, and not `Main`. (In Visual Studio, a new Console
App has a box, *Do not use top-level statements*. Leave it unticked, and
a new program starts with statements, as these pages do.)

## Testing as a habit

A *test* gives a method an input whose answer we already know, and checks
that the method gives that answer. C# has no statement for this, so we
write a small method of our own, `Check`, in a class of its own, `Test`.
It is in the cell below, and every cell under it can use it (rule 2).

`Check` takes a *claim*: a short sentence that says what should be true.
Then it takes two values: the value the claim expects, and the value the
program found. When the two are equal, we say that the check *holds*,
and `Check` does nothing. When they differ, it *throws* an exception: it
stops the program, as the `DivideByZeroException` at the top of this page
did, but with a message of our own. The message says what was expected
and what was found. (`Check` is our method. It is not the **Check**
button, which compiles a cell.)

```csharp exec
id: testing-as-a-habit-check
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

The `<T>` after `Check` lets it take two values of any one type, as a
`List<T>` holds values of any one type: two numbers, two `char` values, or
two `bool` values. `expected.Equals(found)` is `true` when the two values
are equal. `throw` stops the method with the exception after it. A later
section of this page says more about `throw`.

Here are three tests of `Stats.Mean`.

```csharp exec
id: testing-as-a-habit-1
Test.Check("the mean of 10, 20 and 30 is 20", 20, Stats.Mean(new double[] { 10, 20, 30 }));
Test.Check("the mean of one number is that number", 42, Stats.Mean(new double[] { 42 }));
Test.Check("the mean of -10 and 10 is 0", 0, Stats.Mean(new double[] { -10, 10 }));
Console.WriteLine("All three checks held.");
```

Can you change one of the expected answers to a different number, and run
it again? A check that holds says nothing. A check that does not hold
stops the program with its claim, the value it expected and the value it
found. The report under the message names two lines: the line in `Check`
that threw, and under it, the line in this cell that called `Check`. Now
we do some detective work.

### Which one works?

Four people wrote `Mean`. One version gives the mean of every array. The
other three each have a mistake of their own, and each gives the mean of
some arrays. Can your tests tell which one works?

The four versions are in a class of their own, `Suspects`.

```csharp exec
id: testing-as-a-habit-2
file: Suspects.cs
static class Suspects
{
    /// <summary>Returns the mean of numbers.</summary>
    public static double MeanA(int[] numbers)
    {
        double total = 0;
        foreach (int value in numbers)
        {
            total = total + value;
        }
        return total / numbers.Length;
    }

    /// <summary>Returns the mean of numbers.</summary>
    public static double MeanB(int[] numbers)
    {
        double total = 0;
        foreach (int value in numbers[1..])
        {
            total = total + value;
        }
        return total / numbers.Length;
    }

    /// <summary>Returns the mean of numbers.</summary>
    public static double MeanC(int[] numbers)
    {
        int total = 0;
        foreach (int value in numbers)
        {
            total = total + value;
        }
        return total / numbers.Length;
    }

    /// <summary>Returns the mean of numbers.</summary>
    public static double MeanD(int[] numbers)
    {
        double total = 0;
        foreach (int value in numbers)
        {
            total = value;
        }
        return total / numbers.Length;
    }
}
```

`TryAll` gives one array to all four versions, and compares each answer
with the mean you know the array has.

```csharp exec
id: testing-as-a-habit-2-program
static void TryAll(int[] numbers, double expected)
{
    string[] names = { "a", "b", "c", "d" };
    double[] answers =
    {
        Suspects.MeanA(numbers),
        Suspects.MeanB(numbers),
        Suspects.MeanC(numbers),
        Suspects.MeanD(numbers),
    };
    for (int i = 0; i < names.Length; i++)
    {
        if (answers[i] == expected)
        {
            Console.WriteLine($"{names[i]} agrees");
        }
        else
        {
            Console.WriteLine($"{names[i]} gives {answers[i]}");
        }
    }
}

TryAll(new int[] { 10, 20, 30 }, 20);
```

Can you add more calls to `TryAll`, each with an array and the mean you
know it has? Which arrays catch which versions? What is the smallest set
of arrays that leaves only one version agreeing every time? And which of
the four is the method at the top of this page?

<details class="dl-answer"><summary>one way it goes</summary>

Here is one answer. Yours may be different and work too.

`{ 10, 20, 30 }` catches b, which skips the first number, and d, which
keeps only the last. It does not catch c. The mean of that array is a
whole number, so whole-number division gives the same answer. An array
whose mean is not a whole number, such as `{ 1, 2 }`, catches c, because
c loses the fraction. So `{ 10, 20, 30 }` and `{ 1, 2 }` together leave
only a. In fact, `{ 1, 2 }` on its own catches b and d as well, so one
array is enough. Can you see why?

Look at c again. Apart from its name and its `public`, it is the method
from the top of this page, word for word. It differs from a in one word:
`int total`, where a has `double total`. With `int`,
`total / numbers.Length` divides two whole numbers, and the fraction is
gone before the answer becomes a `double`. The top of the page tried one
array, and its mean was a whole number.

The tests have not caught a mistake in a. That does not prove a has none.
Each test is a question, and a good set asks different questions: a
middle case, an edge, and a case where two different mistakes would give
different answers.

</details>

## Methods that call methods

Small, tested methods can be the parts of bigger ones. The *standard
deviation* measures how widely numbers are spread around their mean. To
find it:

1. Find the mean.
2. For each value, take its difference from the mean, and square it.
3. Find the mean of those squares.
4. Take the square root.

Here is `Stats` again, with `StdDev` added. It replaces the `Stats` above
for the cells below it (rule 4). How many times does `StdDev` call
`Mean`?

```csharp exec
id: functions-calling-functions-1
file: Stats.cs
static class Stats
{
    /// <summary>Returns the sum of the numbers in values.</summary>
    public static double Total(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total;
    }

    /// <summary>Returns the mean of values, which must not be empty.</summary>
    public static double Mean(double[] values)
    {
        return Total(values) / values.Length;
    }

    /// <summary>Returns the standard deviation of values, which must not be empty.</summary>
    public static double StdDev(double[] values)
    {
        double average = Mean(values);
        double[] squares = new double[values.Length];
        for (int i = 0; i < values.Length; i++)
        {
            double difference = values[i] - average;
            squares[i] = difference * difference;
        }
        return Math.Sqrt(Mean(squares));
    }
}
```

```csharp exec
id: functions-calling-functions-1-program
Console.WriteLine(Stats.StdDev(new double[] { 10, 20, 30 }));
```

It prints 8.16496580927726. `StdDev` calls `Mean` twice: once for the
numbers, and once for the squared differences. `Math.Sqrt` gives the
square root. The averaging code is written once, in `Mean`. If a mistake
appears in `Mean`, one change there fixes `StdDev` too, and each method
can be tested on its own. This is the main idea of modular programming,
from the page [Methods](lesson:writing-your-own-functions): a large
program built from small pieces, each one tested on its own.

### Your turn

The *range* of an array, in statistics, is the difference between its
largest and smallest values. It is not the same thing as C#'s ranges,
such as `letters[2..5]`. Can you add `DataRange(double[] values)` to `Stats`, in
the first cell, with an XML comment? (That `Stats` has `Total` and `Mean`,
and no `StdDev`, to keep the cell short.) Then, in the second cell, can you
write your own tests for it: one for an ordinary array, one for an array
where every value is the same, and one for an array with negative numbers?

The second cell is meant not to compile until `DataRange` exists. Its
message says what is missing: `'Stats' does not contain a definition for
'DataRange'`.

```csharp exec
id: your-turn-1
file: Stats.cs
static class Stats
{
    /// <summary>Returns the sum of the numbers in values.</summary>
    public static double Total(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total;
    }

    /// <summary>Returns the mean of values, which must not be empty.</summary>
    public static double Mean(double[] values)
    {
        return Total(values) / values.Length;
    }

    // DataRange, with its XML comment
}
```

```csharp exec
id: your-turn-1-tests
expect: CS0117
Test.Check("the range of 1, 5 and 3 is 4", 4, Stats.DataRange(new double[] { 1, 5, 3 }));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Stats.DataRange(new double[] { 3, 9, 4 })
Stats.DataRange(new double[] { -5, 5 })
Stats.DataRange(new double[] { 7 })
Stats.DataRange(new double[0])     // throws
```

```hint
after: 2 errors
What are the largest and smallest values of `{ 1, 5, 3 }`?
`values.Max()` gives the largest element of an array, and `values.Min()`
the smallest. What do you get when you take one from the other?
```

```solution
Test.Check("the range of 1, 5 and 3 is 4", 4, Stats.DataRange(new double[] { 1, 5, 3 }));
Test.Check("the range of 6, 6 and 6 is 0", 0, Stats.DataRange(new double[] { 6, 6, 6 }));
Test.Check("the range of -8, 2 and -3 is 10", 10, Stats.DataRange(new double[] { -8, 2, -3 }));
Console.WriteLine("Every check held.");

static class Stats
{
    /// <summary>
    /// Returns the difference between the largest and smallest values,
    /// in an array that must not be empty.
    /// </summary>
    public static double DataRange(double[] values)
    {
        return values.Max() - values.Min();
    }
}
---
The solution writes `Stats` again, below its tests (rule 4), and C# uses
this one in place of yours. It has only `DataRange`, to keep it short.
Yours keeps `Total` and `Mean` too. **Compare with a solution** runs your
cell, with your tests and your `Stats`, and then this solution, with its
tests and this `Stats`. The table shows what each `DataRange` gives for
the same inputs. When a check of yours stops your cell, the table can't
show your values, and the note under it says so. Look at the check as
well as the method: was the expected answer the one you meant?

With one value, the range is 0. With no values, `Max()` stops with an
`InvalidOperationException`: that is the last row. The next section is
about arrays like that one.
```

## Handling edge cases

An empty array is an *edge case*: an unusual input, at the edge of what a
method expects, that it has to handle on purpose. There are three things a
method can do with one. Here is the one that looks helpful.

```csharp exec
id: handling-edge-cases-1
static double Mean(double[] values)
{
    if (values.Length == 0)
    {
        Console.WriteLine("Cannot take the mean of nothing");
    }
    double total = 0;
    foreach (double value in values)
    {
        total = total + value;
    }
    return total / values.Length;
}

double result = Mean(new double[0]);
Console.WriteLine(result + 1);
```

```predict
type: choice

What happens?

- It prints the message, and then it stops.
  - The message tells the person about the problem.
- It prints the message, then stops with a DivideByZeroException.
  - The method divides by `values.Length`, which is 0.
- It prints the message, then ∞.
  - `total` is a `double`, and a `double` divided by zero is infinity.
- It prints the message, then NaN.
  - NaN is short for "not a number".
- It prints the message, then 1.
  - With nothing to add, the mean counts as 0.
```

It prints the message, and then `NaN`. *NaN* is short for *not a number*.
It is a `double` value for a calculation that has no answer, and 0.0
divided by 0 is one of those. (On the page
[Exceptions](lesson:reading-an-error-message), 60.0 divided by 0 gave ∞,
which is an answer: bigger than any number. 0.0 divided by 0 could be any
number at all.) NaN is not an exception. The program continues, and
anything added to NaN is NaN, so `result + 1` is NaN too. A NaN travels
through every calculation it meets, and appears far from its cause: a
report says NaN, and nobody knows why.

`Console.WriteLine` is for the person watching. The *caller*, the code
that called `Mean`, never sees the message. It gets a NaN, and continues.

The two better ways both tell the caller. Here is `Stats` again, with a
`Mean` that throws an exception for an empty array, and a new method,
`TryMean`.

```csharp exec
id: handling-edge-cases-2
file: Stats.cs
static class Stats
{
    /// <summary>Returns the sum of the numbers in values.</summary>
    public static double Total(double[] values)
    {
        double total = 0;
        foreach (double value in values)
        {
            total = total + value;
        }
        return total;
    }

    /// <summary>Returns the mean of values.</summary>
    /// <exception cref="ArgumentException">values is empty.</exception>
    public static double Mean(double[] values)
    {
        if (values.Length == 0)
        {
            throw new ArgumentException("Mean needs at least one number.");
        }
        return Total(values) / values.Length;
    }

    /// <summary>
    /// Finds the mean of values. Returns false, with a mean of 0, if values is empty.
    /// </summary>
    public static bool TryMean(double[] values, out double mean)
    {
        if (values.Length == 0)
        {
            mean = 0;
            return false;
        }
        mean = Total(values) / values.Length;
        return true;
    }
}
```

The program below tries both on an empty array. It is meant to stop with
an exception on its last line.

```csharp exec
id: handling-edge-cases-2-program
expect: exception
double[] empty = new double[0];

if (Stats.TryMean(empty, out double mean))
{
    Console.WriteLine($"The mean is {mean}");
}
else
{
    Console.WriteLine("There is no mean: the array is empty.");
}

Console.WriteLine(Stats.Mean(empty));
```

It prints `There is no mean: the array is empty.`, and then it stops with
an `ArgumentException`. The exception's message is the text after `throw`:
`Mean needs at least one number.`

`TryMean` has the shape of `int.TryParse`, from *Reading input*, and of
`TryGetValue`, from the page [Dictionaries](lesson:looking-things-up-by-name).
It returns `true` or `false`, and it puts its answer in an `out`
parameter. `out` marks a parameter that the method fills. The method must
give it a value before it returns, on every path through it: here, 0 when
there is no mean. The `false` tells the caller not to use that 0, and the
caller checks with `if`.

`throw` stops the method with an exception of its own, at the place the
problem is, with a message that names the problem. `ArgumentException` is
the exception that .NET uses for an argument that a method can't accept.
The XML comment says what happens at the edge, with `<exception>`: which
exception, and when. This `Stats` has no `StdDev`, so the cells below this
one can't use it (rule 4).

Which should you choose? If an empty array is normal, and the caller can
do something sensible with no answer, return `false`, as `TryMean` does.
If an empty array is a mistake, throw an exception. A mistake that stops
the program at once is much easier to find than one that travels.

A caller that expects an exception can be ready for it. `try` runs the
lines between its curly brackets. If one of them throws an exception, the
program jumps to `catch`, and runs the lines there, in place of stopping.

```csharp exec
id: handling-edge-cases-3
double[] marks = new double[0];

try
{
    Console.WriteLine($"Mean mark: {Stats.Mean(marks)}");
}
catch (ArgumentException exception)
{
    Console.WriteLine($"No mean mark yet. {exception.Message}");
}
Console.WriteLine("The program continues.");
```

It prints `No mean mark yet. Mean needs at least one number.`, and then
`The program continues.` The line in `try` never printed, because `Mean`
threw before `Console.WriteLine` had anything to print.
`catch (ArgumentException exception)` catches that kind of exception only,
and gives it a name, `exception`. Its `Message` is the text that `Mean`
wrote after `throw`. Catch an exception only where the program can do
something sensible with it, as here: print a note, and continue. Can you
put a number in `marks`, and run the cell again?

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you write `MostCommon(string text)`, in the class `Letters`, which
returns the capital letter that appears most often in `text`? When `text`
has no capital letters at all, it throws an `ArgumentException`. Give it
an XML comment that says both. Then, in the second cell, can you write
your own tests for it?

The second cell is meant not to compile until `MostCommon` exists. Its
message says what is missing: `'Letters' does not contain a definition
for 'MostCommon'`.

```csharp exec
id: your-turn-2--secret-messages
file: Letters.cs
static class Letters
{
    // MostCommon, with its XML comment
}
```

```csharp exec
id: your-turn-2-tests--secret-messages
expect: CS0117
Test.Check("the most common capital in AAB is A", 'A', Letters.MostCommon("AAB"));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Letters.MostCommon("BANANA")
Letters.MostCommon("MEET ME")
Letters.MostCommon("no capitals")     // throws
```

```hint
after: 2 errors
How can the method count each capital letter? The page
[Dictionaries](lesson:looking-things-up-by-name) counted letters with `counts[letter] = counts.GetValueOrDefault(letter, 0) + 1;`.
If there were no capitals, what does the dictionary hold after the loop?
```

```hint
after: 4 errors
If `counts.Count` is 0 after the loop, throw. If not, loop over the
dictionary, and keep the letter with the biggest count so far, as a loop
that finds the largest number does.
```

```solution
Test.Check("the most common capital in AAB is A", 'A', Letters.MostCommon("AAB"));
Test.Check("small letters do not count", 'E', Letters.MostCommon("see THEE"));
Console.WriteLine("Every check held.");

static class Letters
{
    /// <summary>
    /// Returns the capital letter that appears most often in text.
    /// </summary>
    /// <exception cref="ArgumentException">text has no capital letters.</exception>
    public static char MostCommon(string text)
    {
        Dictionary<char, int> counts = new Dictionary<char, int>();
        foreach (char character in text)
        {
            if (char.IsUpper(character))
            {
                counts[character] = counts.GetValueOrDefault(character, 0) + 1;
            }
        }
        if (counts.Count == 0)
        {
            throw new ArgumentException("MostCommon needs at least one capital letter.");
        }
        char best = ' ';
        int bestCount = 0;
        foreach (KeyValuePair<char, int> pair in counts)
        {
            if (pair.Value > bestCount)
            {
                best = pair.Key;
                bestCount = pair.Value;
            }
        }
        return best;
    }
}
---
The solution writes `Letters` again, below its tests (rule 4), and C#
uses this one in place of yours. The XML comment says what happens at the
edge, so a caller knows to expect it. What does `MostCommon` give for
`"ABAB"`, where two letters tie? Does the XML comment say? It could.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `AverageBrightness(int[] row)`, in the class `Pixels`, which
returns the mean brightness of a row of pixels? For a row with no pixels,
it throws an `ArgumentException`. Give it an XML comment that says both.
Then, in the second cell, can you write your own tests for it?

The second cell is meant not to compile until `AverageBrightness` exists.
Its message says what is missing: `'Pixels' does not contain a definition
for 'AverageBrightness'`.

```csharp exec
id: your-turn-2--pixel-art
file: Pixels.cs
static class Pixels
{
    // AverageBrightness, with its XML comment
}
```

```csharp exec
id: your-turn-2-tests--pixel-art
expect: CS0117
Test.Check("the mean of 100 and 200 is 150", 150, Pixels.AverageBrightness(new int[] { 100, 200 }));
// Your tests here

Console.WriteLine("Every check held.");
```

```inputs
Pixels.AverageBrightness(new int[] { 0, 255 })
Pixels.AverageBrightness(new int[] { 90 })
Pixels.AverageBrightness(new int[0])     // throws
```

```hint
after: 2 errors
What should happen first, before any adding or dividing? After a check
for the empty row, the row has at least one pixel, and dividing by its
length is safe.
```

```hint
after: 4 errors
What type does the total need, so that `{ 0, 255 }` gives a mean with a
fraction? Look at versions a and c of `Mean`, above.
```

```solution
Test.Check("the mean of 100 and 200 is 150", 150, Pixels.AverageBrightness(new int[] { 100, 200 }));
Test.Check("the mean of one pixel is that pixel", 90, Pixels.AverageBrightness(new int[] { 90 }));
Console.WriteLine("Every check held.");

static class Pixels
{
    /// <summary>Returns the mean brightness of a row of pixels.</summary>
    /// <exception cref="ArgumentException">row is empty.</exception>
    public static double AverageBrightness(int[] row)
    {
        if (row.Length == 0)
        {
            throw new ArgumentException("AverageBrightness needs at least one pixel.");
        }
        double total = 0;
        foreach (int value in row)
        {
            total = total + value;
        }
        return total / row.Length;
    }
}
---
The solution writes `Pixels` again, below its tests (rule 4), and C# uses
this one in place of yours. `{ 0, 255 }` gives 127.5, which is not a whole
brightness. Should it round? The XML comment says "the mean", so it does
not. A caller who wants a pixel value can round it.
```

</div>

## Variable scope, again

Our methods now live in a class, and call each other, so it is worth
looking again at *scope*, from the page
[Methods](lesson:writing-your-own-functions): the part of a program where
a name can be used. Each method has its own workspace, and the
variables made inside it disappear when it finishes.

```csharp exec
id: variable-scope-revisited-1
file: Picture.cs
static class Picture
{
    public static char Brick = '#';

    /// <summary>Returns a box of Brick characters, width wide and three rows high.</summary>
    public static string WithBorder(int width)
    {
        string edge = new string(Brick, width);
        string middle = Brick + new string('.', width - 2) + Brick;
        return edge + "\n" + middle + "\n" + edge;
    }
}
```

```csharp exec
id: variable-scope-revisited-1-program
Console.WriteLine(Picture.WithBorder(6));

// What happens if this line runs? Delete the // at its start, and run the cell.
// Console.WriteLine(edge);
```

Can you delete the `//`, and run the cell? Which name does the compiler
say it doesn't know? `edge` exists only inside `WithBorder`, while it
runs. It is not part of the class, and no code outside the method can use
it. That helps us. Many methods can each have a variable called `total`
or `edge`, and each one is separate from the others. A method's own
variables stay inside it, and it sends a value to its caller only through
`return`.

`WithBorder` uses one more variable, and the next cell shows it.

```csharp exec
id: variable-scope-revisited-2
Console.WriteLine(Picture.WithBorder(4));
Picture.Brick = '*';
Console.WriteLine(Picture.WithBorder(4));
```

`Brick` is written in the class, outside every method. A variable like
that is a *field* of the class. Every method in the class can use it,
even a `static` one, because `Brick` is `static` too, and belongs to the
same class. `public` lets code outside the class use it too, and change
it. The same call, `Picture.WithBorder(4)`, gave two different boxes,
because a line outside the method changed `Brick`.

A public field of a static class is the nearest thing C# has to a *global
variable*: a variable that every part of a program can use and change. It
has the same problem as `discountRate` on the page
[Methods](lesson:writing-your-own-functions): to know what
a method returns, you have to know what every other line did to the field.
A field suits a value that stays the same. A parameter is clearer for a
value that changes.

A field does not keep its value from one Run to the next. Run the cell
again: its first box is made of `#` again. Each Run starts a new program
(rule 1), and `Brick` starts again with its first value.

## Looking back

A check that holds tells you less than a check that does not. Why do you
think that is? What would make you trust a method you did not write?

A challenge: can you test your bubble sort from the page
[Sorting](lesson:putting-things-in-order) on a hundred arrays nobody
chose? This program makes each array at random,
sorts it, and compares the answer with C#'s own `Array.Sort`. Can you
change `BubbleSort` so that it has a mistake, and see what the program
prints? What is the shortest array that catches it?

```csharp challenge
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

int differences = 0;
for (int trial = 0; trial < 100; trial++)
{
    int[] items = new int[Random.Shared.Next(0, 9)];
    for (int i = 0; i < items.Length; i++)
    {
        items[i] = Random.Shared.Next(0, 10);
    }
    int[] expected = items.ToArray();
    Array.Sort(expected);
    int[] sorted = BubbleSort(items.ToArray());
    if (string.Join(", ", sorted) != string.Join(", ", expected))
    {
        Console.WriteLine($"Sorted differently: {string.Join(", ", items)}");
        differences++;
    }
}
Console.WriteLine($"100 random arrays. {differences} sorted differently from Array.Sort.");
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project, which prints the same there. The classes
it uses from the cells above go into the project too, each in a file of
its own, such as `Stats.cs` and `Test.cs`.

The [practice page](lesson:building-reusable-tools-practice) has more
problems on XML comments, edge cases and tests, and three from earlier
pages. The next page, [Debugging](lesson:when-it-goes-wrong), uses these
habits to find mistakes in a program of several methods. Later,
[A whole program](lesson:from-cells-to-a-program) puts a class like
`Stats` in a file of its own, in Visual Studio, as a team does when each
person writes one part.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Static classes and static class members*.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members>.
The official description of a static class, such as `Stats` or `Math`,
and of the fields and methods it can hold. Its example is a static class
that converts temperatures.

Microsoft. *Exceptions and exception handling*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/>.
A short page on `throw`, `try` and `catch`, with a method that throws an
exception and a caller that catches it.

Microsoft. *Recommended XML documentation tags*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags>.
Every tag an XML comment can have, including `<summary>`, `<param>`,
`<returns>` and `<exception>`, and which ones Visual Studio shows. It is
written for programmers who know C# well, so read the part on each tag you
use.

Microsoft. *Unit testing C# code in .NET using dotnet test and xUnit*.
<https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-xunit>.
This page tests with a `Check` method of our own. That is the first step.
A testing library, such as xUnit, is the second: it finds your tests, runs
them all, and lists the ones that did not hold. The tutorial writes a test
before the code it tests, as the tasks on this page did.
