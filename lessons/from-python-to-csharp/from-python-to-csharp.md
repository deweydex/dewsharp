---
title: "C# for Python programmers: the same program in two languages"
version: 2026.09.28.1
from: many-languages-one-idea
covers: [FOOP-LO1, FOOP-LO2, FOOP-LO8]
---

# C# for Python programmers: the same program in two languages

Here is a short Python program. It shares 90 mm of rain equally between
4 days, and prints `Rain per day: 22.5 mm`.

```python
total_mm = 90
days = 4
per_day = total_mm / days
print(f"Rain per day: {per_day} mm")
```

Under it is the same program in C#. Which line of C# does the job of each
line of Python?

```csharp exec
id: the-same-program-1
int totalMm = 90;
int days = 4;
double perDay = totalMm / days;
Console.WriteLine($"Rain per day: {perDay} mm");
```

```predict
type: choice

What will the C# program print?

- Rain per day: 22.5 mm
  - The Python program prints this, and `perDay` is a `double`: a number
    with a decimal point.
- Rain per day: 22 mm
  - `totalMm` and `days` are both whole numbers.
- Nothing: it does not compile
  - Can a `double` hold what you get when you divide two whole numbers?
```

To run a cell, press its **Run** button, or hold Ctrl and press Enter. The
first run on a page can take a few seconds, while C# starts.

It prints `Rain per day: 22 mm`. Every line of the Python has a partner in
the C#, and nearly every line changed a little:

- `int` and `double` are *types*. A type is the kind of value a variable
  holds. `int` holds a whole number, and `double` holds a number with a
  decimal point, like Python's `float`. In C#, every variable is made with
  its type, and its type never changes.
- A semicolon, `;`, ends each *statement*. A statement is one complete
  instruction, like one line of Python.
- `Console.WriteLine` does the job of `print`. The `$` in front of the
  quotes does the job of Python's `f`: C# puts the value of each `{ }`
  into the text.
- The names are `totalMm` and `perDay`, with a capital letter at the start
  of each new word. This style is called *camelCase*. Python programmers
  write `total_mm`. Each is a habit of its language's programmers, and not
  a rule of the language.

Why does it print 22? In C#, `/` with two whole numbers gives a whole
number, and it drops the part after the point. C# does the division
first, with two `int` values, and gets 22. Only then does it store the 22
in `perDay`. The type of `perDay` does not change how the division is
done.

Can you make the program print 22.5, by changing one word?

```solution
double totalMm = 90;
int days = 4;
double perDay = totalMm / days;
Console.WriteLine($"Rain per day: {perDay} mm");
---
It prints `Rain per day: 22.5 mm`. With a `double` on one side of the `/`,
C# keeps the part after the point. `double days = 4;` works too.
```

This page is for you if you can write a function and a loop in Python,
and you have not written C# before. If you took Programming and Design
Principles in C#, you have met everything on this page already, and you
can start at [Classes and objects](lesson:objects-and-classes).

Every program you wrote in Python was built from four moves. *Storing*
keeps a value under a name, so that a later line can use it. *Sequence*
runs lines one after another, in the order they are written. *Selection*
chooses between paths, usually with `if`. *Iteration* repeats steps,
usually with a loop. C# has the same four moves, and only the way you
write them changes. Sequence is the same in both languages: the lines run
from the first to the last. This page takes the other three moves, one
section each, with the same program in Python and in C#. Then come
methods, and the collections that hold many values.

## How this page works

Most of this page is text to read. Between the paragraphs are *cells*:
small C# programs that you can change and run. The result appears under
the cell. The C# runs inside this browser tab, on your own device, and
nobody else can see what you type. You do not need to install anything.

Each Run starts a new program. It runs from the first line of the cell to
the last. In a Python notebook, the cells often share their variables, so
a cell can use a list that a cell above it made. Here, they do not. A cell
never needs anything from the cells above it, and each cell makes the
values it uses, even when the cell above made them too.

When you press Run, one of three things happens, and this site always
names them the same way:

- **It did not compile.** C# found a problem before it started, so nothing
  ran. The next section shows one.
- **It stopped with an exception.** The program ran until a line it could
  not complete. An *exception* is what C# calls this kind of problem.
  Python uses the same word for a `KeyError` or a `ZeroDivisionError`.
- **It ran.** Whether the result is what you wanted is for you to decide.

If a cell does something you did not expect after you changed it,
**Reset** returns the cell to the code the page started with.

## Storing: a value and its type

Here is a program that stores four values in Python.

```python
town = "Galway"
days = 7
wettest = 12.6
umbrella = True
print(town, days, wettest, umbrella)
```

And here it is in C#, with a fifth value.

```csharp exec
id: storing-1
string town = "Galway";
int days = 7;
double wettest = 12.6;
bool umbrella = true;
char first = town[0];
Console.WriteLine($"{town} {days} {wettest} {umbrella} {first}");
```

It prints `Galway 7 12.6 True G`. Each line that makes a variable starts
with the variable's type. That is *declaring* the variable: making it,
with its type and its name. Python makes a variable the first time a line
stores a value in it. C# makes it on the line that starts with its type.

| Python | C# | What it holds |
|---|---|---|
| `int` | `int` | a whole number: `7` |
| `float` | `double` | a number with a decimal point: `12.6` |
| `str` | `string` | text, between double quotes: `"Galway"` |
| a `str` of one character | `char` | one character, between single quotes: `'G'` |
| `bool` | `bool` | `true` or `false`, written with small letters |

Python lets you write text between single or double quotes. C# keeps the
two apart. `"G"` is a `string` that holds one character, and `'G'` is a
`char`. So `town[0]`, the first character of `town`, is a `char`. And
`umbrella` is `true` in the code, but it prints as `True`.

Some arithmetic changes too. In the next cell, each line ends with a
*comment*: a note for the people who read the code. In C#, a comment
starts with `//`, and C# ignores the rest of the line, as Python ignores
the rest of a line after `#`. Here, each comment gives the line's partner
in Python. What do you think each line prints? Run it and see.

```csharp exec
id: storing-2
Console.WriteLine(7 / 2);           // Python: 7 // 2
Console.WriteLine(7.0 / 2);         // Python: 7 / 2
Console.WriteLine(7 % 2);           // the remainder, as in Python
Console.WriteLine(Math.Pow(7, 2));  // Python: 7 ** 2
```

`7 / 2` is 3, and `7.0 / 2` is 3.5. So C# needs no operator for Python's
`//`: `/` with two whole numbers already does its job, for numbers above
zero. (Below zero, the two languages disagree: the practice page has an
example.) C# has no `**` either. `Math.Pow(7, 2)`, 7 to the power of 2,
does its job, and it prints 49.

In Python, a variable can hold a number on one line and text on the next.
This Python program prints 7, and its third line is allowed:

```python
days = 7
print(days)
days = "seven"
```

The C# version has the same three lines. Its third line is a mistake, on
purpose: it stores text in `days`, whose type is `int`.

```csharp exec
id: storing-3
expect: CS0029
int days = 7;
Console.WriteLine(days);
days = "seven";
```

```predict
type: choice

What will appear under the cell?

- 7
  - The Python program prints this. Can `days` hold text in C#?
- 7, and then a message about line 3
  - Some languages run a program one line at a time, and stop at the
    first line they cannot run. Is C# one of them?
- Only a message about line 3
  - C# checks the whole program before it runs any of it.
```

Only a message appears. Not even the 7 is printed:

```console
Program.cs(3,8): error CS0029: Cannot implicitly convert type 'string' to 'int'
```

Before C# runs a program, it reads all of it and checks it. That is
*compiling*, and the part of C# that does it is the *compiler*. If it
finds a problem, it runs nothing and tells you where the problem is. The
message has five parts:

- `Program.cs` is the file. A cell's code is kept in a file called
  `Program.cs`.
- `(3,8)` is the place: line 3, and the 8th character along it, where
  `"seven"` starts.
- `error` says that the program cannot run until this is changed.
- `CS0029` is the error's code. You can search for it.
- The rest is what the compiler found. *Implicitly* means "by itself":
  C# will not change a `string` into an `int` without being asked.

This is the biggest change from Python. Python checks a line when it
reaches it, and its variables can hold any type. C# checks the types in
the whole program before it runs a line of it. The next page,
[Compiler errors](lesson:compiler-errors), is about reading these
messages. Can you change line 3, so that the cell compiles?

## Selection: a decision

Here is a decision in Python, with three paths.

```python
rain_mm = 7.1
if rain_mm == 0:
    print("A dry day")
elif rain_mm < 5:
    print("Some showers")
else:
    print("A wet day")
```

And here is the same decision in C#.

```csharp exec
id: selection-1
double rainMm = 7.1;
if (rainMm == 0)
{
    Console.WriteLine("A dry day");
}
else if (rainMm < 5)
{
    Console.WriteLine("Some showers");
}
else
{
    Console.WriteLine("A wet day");
}
```

It prints `A wet day`. Can you change `7.1` to `0`, and then to `3.3`, and
run it each time?

This is what changed:

- The *condition*, the test that is `true` or `false`, goes between round
  brackets, `( )`, and there is no colon after it.
- The lines that belong to the `if` go between curly brackets, `{ }`. The
  curly brackets and the lines between them are a *block*. In Python,
  *indenting*, the spaces at the start of a line, marks a block. In C#,
  the curly brackets mark it, and the indenting is only for the people who
  read the code.
- `else if` does the job of `elif`.
- `==`, `!=`, `<`, `>`, `<=` and `>=` are the same as in Python. `and`,
  `or` and `not` become `&&`, `||` and `!`, as in
  `if (rainMm > 0 && rainMm < 5)`.

The indenting is only for people, and that has a result a Python
programmer does not expect. C# allows an `if` with no curly brackets, as
in the next cell. What do you think the first line of its output will be?

```csharp exec
id: selection-2
double rainMm = 0.8;
if (rainMm > 5)
    Console.WriteLine("A wet day.");
    Console.WriteLine("Bring an umbrella.");
Console.WriteLine("Have a good day.");
```

```predict
type: choice

What will the first line print?

- Have a good day.
  - 0.8 is not more than 5, so the two indented lines do not run, as in
    Python.
- Bring an umbrella.
  - With no curly brackets, only one statement belongs to the `if`.
- A wet day.
  - Is 0.8 more than 5?
```

The first line is `Bring an umbrella.`, and then comes
`Have a good day.` With no curly brackets, only the one statement after
the `if` belongs to it: `Console.WriteLine("A wet day.");`. The next line
is indented as if it belonged to the `if` too, but C# does not read the
indenting, so that line runs every time. The compiler says nothing about
it, because the code follows C#'s rules. That is why the pages on this
site put curly brackets round every block, even a block of one line, as
Visual Studio does. Can you add them, so that the
umbrella line belongs to the `if`?

```solution
double rainMm = 0.8;
if (rainMm > 5)
{
    Console.WriteLine("A wet day.");
    Console.WriteLine("Bring an umbrella.");
}
Console.WriteLine("Have a good day.");
---
It prints only `Have a good day.` Now both lines are in the `if`'s block,
and 0.8 is not more than 5, so neither of them runs.
```

## Iteration: a loop over a list

Here is a week of rain in Galway, in millimetres, and a loop that finds
the average. (The numbers are invented.) In Python:

```python
rain_mm = [4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0]
total = 0
for reading in rain_mm:
    total = total + reading
average = total / len(rain_mm)
print(f"Total: {total} mm")
print(f"Average: {average} mm")
```

Python prints `Total: 35.0 mm` and `Average: 5.0 mm`. Here is the same
program in C#.

```csharp exec
id: iteration-1
double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
double total = 0;
foreach (double reading in rainMm)
{
    total = total + reading;
}
double average = total / rainMm.Length;
Console.WriteLine($"Total: {total} mm");
Console.WriteLine($"Average: {average} mm");
```

It prints `Total: 35 mm` and `Average: 5 mm`.

- `double[]` is an *array* of `double` values: a row of values of one
  type, kept in order under one name. It is the nearest thing in C# to a
  Python list that never grows. Its values go between curly brackets. The
  last section of this page compares it with C#'s other collections.
- `foreach (double reading in rainMm)` does the job of
  `for reading in rain_mm:`. The loop's variable is declared with its type
  too.
- `rainMm.Length` does the job of `len(rain_mm)`.
- C# prints 35 and 5, where Python prints 35.0 and 5.0. A `double` with
  nothing after the point prints with no `.0`. It is still a `double`.

Python's `for i in range(...)` has a partner too. This Python prints each
day's number and its rain:

```python
rain_mm = [4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0]
for i in range(len(rain_mm)):
    print(f"Day {i + 1}: {rain_mm[i]} mm")
```

In C#, a loop that counts is a `for` loop:

```csharp exec
id: iteration-2
double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
for (int i = 0; i < rainMm.Length; i++)
{
    Console.WriteLine($"Day {i + 1}: {rainMm[i]} mm");
}
```

The three parts of `for (int i = 0; i < rainMm.Length; i++)` are separated
by semicolons:

1. `int i = 0` runs once, before anything else. It makes the loop's
   counter, `i`, and gives it its first value.
2. `i < rainMm.Length` is the condition. The loop's *body* is the lines
   between the curly brackets. Each time, C# checks the condition before
   the body runs, and the loop stops when the condition is `false`.
3. `i++` runs after the body, each time. It adds 1 to `i`, as `i += 1`
   does in Python. (`+=` works in C# too.)

So `i` counts from 0, and stops before the array's length, as
`range(len(rain_mm))` does. [Loops](lesson:repeating-yourself) has a
table that puts each form of `range` beside its `for` loop. C# has no
`enumerate`: a `for` loop with a counter does its job, as here. And
C#'s `while` loop is Python's, with the condition between round brackets
and the body between curly brackets.

Look at day 2 and day 7 in the output. They are `0` and `7`, where Python
prints `0.0` and `7.0`, for the same reason as the average.

### Your turn

The average is 5 mm. How many days had more rain than that? Can you add a
loop that counts them? The cell runs as it is, and it prints 0 until you
do.

```csharp exec
id: your-turn-1
double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
double average = 5;    // from the first cell in this section
int wetDays = 0;
// A loop here: add 1 to wetDays for each day with more than the average

Console.WriteLine($"Days above {average} mm: {wetDays}");
```

```inputs
wetDays
```

```hint
after: 2 runs
Which loop takes each reading in turn? Inside it, what should happen to a
reading that is more than `average`?
```

```solution
double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
double average = 5;
int wetDays = 0;
foreach (double reading in rainMm)
{
    if (reading > average)
    {
        wetDays = wetDays + 1;
    }
}
Console.WriteLine($"Days above {average} mm: {wetDays}");
---
It prints 3: the days with 12.6, 7.1 and 7 mm, as the cell above showed.
This loop uses all four moves: storing (`wetDays`), sequence, iteration
(`foreach`) and selection (`if`). `wetDays++;` does the same as
`wetDays = wetDays + 1;`.
```

## A method

Python calls a named block of code that does one job a *function*. C#
calls it a *method*, and so do these pages. Here are two functions in
Python.

```python
def to_inches(mm):
    return mm / 25.4

def report(day, mm):
    print(f"{day}: {mm} mm, {to_inches(mm):.2f} inches")

report("Monday", 4.2)
report("Wednesday", 12.6)
```

And here are the same two in C#, as methods.

```csharp exec
id: a-method-1
static double ToInches(double mm)
{
    return mm / 25.4;
}

static void Report(string day, double mm)
{
    Console.WriteLine($"{day}: {mm} mm, {ToInches(mm):F2} inches");
}

Report("Monday", 4.2);
Report("Wednesday", 12.6);
```

It prints `Monday: 4.2 mm, 0.17 inches` and
`Wednesday: 12.6 mm, 0.50 inches`, as the Python does. The first line of a
method says more than Python's `def` line:

- The type of the value the method returns comes before its name. To
  *return* a value is to send it to the code that called the method.
  `ToInches` returns a `double`. `void` says that `Report` returns nothing.
  A Python function with no `return` still returns `None`. A `void` method
  returns nothing at all, so there is nothing to store.
- Each *parameter* has its type. A parameter is the name, inside the
  method, for a value that the method is given: `string day` and
  `double mm`. The value itself, such as `4.2`, is an *argument*.
- `static` says that the method can use only its parameters and the
  variables it makes itself, and no variable from the lines around it.
  Every method on this page starts with `static`.
- A method's name is in *PascalCase*: every word starts with a capital
  letter, the first one too.

And `{ToInches(mm):F2}` shows the value with two digits after the point,
as `:.2f` does in Python.

C# checks each argument's type against its parameter's type, at every
call, before the program runs. What do you think happens if the two
arguments in the last call change places, `Report(12.6, "Wednesday");`?
Can you try it? Python would print Monday's line, and then stop with a
`TypeError` at the second call.

### Your turn

Can you write the loop from the first cell of *Iteration* as a method,
`Average`? It takes an array of `double` values, and returns their
average. The program below is meant not to compile until you write it.
Its message says that the compiler does not know the name `Average` yet.

```csharp exec
id: your-turn-2
expect: CS0103
// Your Average method here

double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
Console.WriteLine(Average(rainMm));
```

```inputs
Average(new double[] { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 })
Average(new double[] { 2, 4, 9 })
Average(new double[] { 10 })
Average(new double[0])          // no readings at all
```

```hint
after: 2 errors
Look at the first cell of *Iteration*. Which lines find the total? What
must the method's first line say about what it takes, and what it
returns?
```

```hint
after: 3 errors
The first line can be `static double Average(double[] values)`. Inside
the method, a loop finds the total of `values`, and the method returns
the total divided by `values.Length`.
```

```solution
static double Average(double[] values)
{
    double total = 0;
    foreach (double value in values)
    {
        total = total + value;
    }
    return total / values.Length;
}

double[] rainMm = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
Console.WriteLine(Average(rainMm));
---
It prints 5. In the table, `new double[] { 2, 4, 9 }` makes an array
with no name, to give to `Average`, and `new double[0]` makes an array
with no values. For that empty array, in the last row, `Average` returns
`NaN`, which means "not a number": 0 divided by 0, with `double` values.
Python stops with a `ZeroDivisionError` in the same place. What do you
think the average of no readings should be?
```

## An array, a list or a dictionary

A *collection* is one value that holds many others. Python has two that
you use every day: the list and the dictionary. C# has three for the same
jobs: the array, the list and the dictionary. Here is the list in
Python, once as a week that never grows, and once as readings that grow
one at a time:

```python
week = [4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0]
print(f"{len(week)} days, the last one {week[-1]} mm")

readings = [4.2, 0.0]
readings.append(12.6)
print(f"{len(readings)} readings: {readings}")
```

In C#, the week is an array, and the readings are a list.

```csharp exec
id: collections-1
double[] week = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
Console.WriteLine($"{week.Length} days, the last one {week[^1]} mm");

List<double> readings = new List<double> { 4.2, 0.0 };
readings.Add(12.6);                     // like append in Python
Console.WriteLine($"{readings.Count} readings: {string.Join(", ", readings)}");
Console.WriteLine(readings);
```

- An array's length is fixed when the array is made. `week` holds seven
  readings, and always will, so it has no `Add`. `week[^1]` is the last
  value, like `week[-1]` in Python: `^1` means "one from the end".
- A *list*, `List<double>`, is like an array that can grow. The type of
  its values goes between `<` and `>`. `new List<double> { 4.2, 0.0 }`
  makes a list that starts with two values. `Add` does the job of
  `append`, and `Count` gives the number of values in a list, where an
  array has `Length`.
- The last line prints
  ``System.Collections.Generic.List`1[System.Double]``: the name of the
  list's type, and not its values. Python prints a list's values, as
  `[4.2, 0.0, 12.6]`. In C#, `string.Join(", ", readings)` joins the
  values into one piece of text, with `", "` between them.

A Python list can hold a number and a piece of text together. A C#
collection holds only the type it names, so `readings.Add("dry");` does
not compile.

Here is a Python dictionary: the number of wet days in three towns.

```python
wet_days = {"Galway": 3, "Dublin": 1}
wet_days["Cork"] = 2
wet_days["Dublin"] = wet_days["Dublin"] + 1
for town in wet_days:
    print(f"{town}: {wet_days[town]}")
print("Sligo" in wet_days)
```

And here it is in C#.

```csharp exec
id: collections-2
Dictionary<string, int> wetDays = new Dictionary<string, int>
{
    ["Galway"] = 3,
    ["Dublin"] = 1,
};
wetDays["Cork"] = 2;                    // a new key makes a new pair
wetDays["Dublin"] = wetDays["Dublin"] + 1;
foreach (string town in wetDays.Keys)
{
    Console.WriteLine($"{town}: {wetDays[town]}");
}
Console.WriteLine(wetDays.ContainsKey("Sligo"));   // like "Sligo" in wet_days
```

A *dictionary* holds pairs. Each pair has a *key*, the name you find a
value by, and the *value* stored under that key. `Dictionary<string, int>`
has a `string` for each key and an `int` for each value. Each pair it
starts with is written as `["Galway"] = 3`. `wetDays.Keys` gives the keys,
one at a time, and `ContainsKey` does the job of Python's `in`. Reading a
key that is not in the dictionary stops the program with an exception, as
Python stops with a `KeyError`. Can you add a line that prints
`wetDays["Sligo"]`, and read the exception's name?

You will also meet a shorter way to make a collection:
`List<double> readings = new();`. `new()` makes a new value of the type
written at the start of the line, so the type is written only once.

So which one should you choose?

| In Python | In C# | Choose it when |
|---|---|---|
| a list that never grows | an array: `double[]` | the number of values is known when the collection is made, and it does not change: the seven days of a week |
| a list | a list: `List<double>` | values are added or removed while the program runs: a reading every hour |
| a dictionary | a dictionary: `Dictionary<string, int>` | you find a value by a name, and not by its place: the wet days of a town |

When you are not sure, choose a list: it can grow and shrink, as a Python
list can. An array is simpler, and it tells the next person who reads the
code that its length will not change.

## The changes in one table

Here is everything on this page that changes between Python and C#, and a
few more that you will meet soon. You can return to this table in your
first weeks of C#.

| Python | C# |
|---|---|
| `# a comment` | `// a comment` |
| `days = 7` | `int days = 7;` |
| `print(x)` | `Console.WriteLine(x);` |
| `print(x, end="")` | `Console.Write(x);` |
| `f"{x} mm"` | `$"{x} mm"` |
| `f"{x:.2f}"` | `$"{x:F2}"` |
| `True`, `False` | `true`, `false` |
| `and`, `or`, `not` | `&&`, `\|\|`, `!` |
| a colon, then indenting | a block between curly brackets, `{ }` |
| `elif` | `else if` |
| `for x in values:` | `foreach (double x in values)` |
| `for i in range(n):` | `for (int i = 0; i < n; i++)` |
| `7 // 2` | `7 / 2`, with two whole numbers above zero |
| `7 / 2` | `7.0 / 2` |
| `2 ** 3` | `Math.Pow(2, 3)` |
| `len(values)` | `values.Length` for an array or a string; `values.Count` for a list or a dictionary |
| `values[-1]` | `values[^1]` |
| `values.append(x)` | `values.Add(x);` |
| `key in counts` | `counts.ContainsKey(key)` |
| `input()` | `Console.ReadLine()` |
| `int("42")`, `float("2.5")` | `int.Parse("42")`, `double.Parse("2.5")` |
| `str(42)` | `42.ToString()` |
| `def area(width, height):` | `static int Area(int width, int height)` |
| a function with no `return` | a `void` method |
| `snake_case` names | `camelCase` for variables and parameters; `PascalCase` for methods |

## Looking back

C# asked you to write a type for every variable, every parameter and
every method on this page. What did that cost you? And what did you gain
from it? What did the cell that tried to store `"seven"` in `days` show
you?

A challenge: here is a Python program that counts how often each word
appears in a sentence.

```python
words = "the rain in the west is the rain".split()
counts = {}
for word in words:
    if word in counts:
        counts[word] = counts[word] + 1
    else:
        counts[word] = 1
for word in counts:
    print(word, counts[word])
```

Can you write it in C#, with a `Dictionary<string, int>`? The starter
splits the sentence into words for you. `Split(' ')` cuts a `string` at
each space, and gives an array of the pieces.

```csharp challenge
string[] words = "the rain in the west is the rain".Split(' ');
Dictionary<string, int> counts = new Dictionary<string, int>();
// A loop that counts each word, then a loop that prints each count.
Console.WriteLine($"{words.Length} words, {counts.Count} counted");
```

Everything on this page runs here, and nothing on it needs Visual Studio.
Any program cell can be downloaded as a Visual Studio project, and it
prints the same there.

Next, the [practice page](lesson:from-python-to-csharp-practice) has
Python programs to write again in C#, and C# that looks like Python and
does not compile. After it, [Compiler errors](lesson:compiler-errors)
reads the compiler's messages closely,
[Types and their sizes](lesson:types-and-their-sizes) shows what each
type can hold, and [Reading input](lesson:reading-input) asks the person
at the keyboard for values.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Roadmap for Python developers learning C#*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-python-developers>.
Microsoft's own page for readers who know Python. It is short. It names
what the two languages share, what is different in C#, and what Python
has that C# does not. It uses `var`, which these pages meet later.

Microsoft. *A tour of the C# language*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview>.
An overview of the whole language, with links to more on each part.

Microsoft. *Selecting a collection class*.
<https://learn.microsoft.com/en-us/dotnet/standard/collections/selecting-a-collection-class>.
For the last section: the questions to ask when you choose a collection,
and which collection each answer leads to.

Miles, R. *The C# Programming Yellow Book*. Free at
<https://www.robmiles.com/c-yellow-book>. A book for people learning C#,
in a friendly voice. Its early chapters cover this page's topics at
greater length.
