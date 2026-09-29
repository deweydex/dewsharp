---
title: "Many languages, one idea: the same job in five languages"
version: 2026.09.28.1
from: many-languages-one-idea
covers: [PDP-LO3]
---

# Many languages, one idea: the same job in five languages

Here is a week of rainfall, in millimetres, for a town in the west of
Ireland. The numbers are invented, to keep the sums tidy. The program finds
the average, and then counts the days that were wetter than the average.
Before you run it, what do you think the first line will print?

```csharp exec
id: one-job-in-csharp-1
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };

double runningSum = 0;
foreach (double reading in rainfall)
{
    runningSum = runningSum + reading;
}
double average = runningSum / rainfall.Length;
Console.WriteLine($"average: {average}");

int wetDays = 0;
foreach (double reading in rainfall)
{
    if (reading > average)
    {
        wetDays = wetDays + 1;
    }
}
Console.WriteLine($"days above it: {wetDays}");
```

```predict
type: choice

What will the first line print?

- average: 35
  - `runningSum` is the total of the week. Which line divides it?
- average: 5
  - The total is shared equally over the seven days.
- average: 5.0
  - The readings all have a decimal point. Does the average keep one when
    C# prints it?
```

It prints `average: 5`, and then `days above it: 3`. C# prints a `double`
with nothing after its point as a whole number, so the line shows `5`, not
`5.0`.

This page is an extra. It is for the outcome about telling programming
languages apart by their *characteristics* (PDP-LO3), which the theory exam
asks about. It uses what the course has taught by the end of
[Programming languages: how they came to be](lesson:how-we-got-here), and
it adds no new part of C# that you need later.

There are thousands of programming languages. That sounds like a lot to
learn. So let's give five of them the same small job, this week of rain,
and see what changes. Our guess is that you can already read more of them
than you expect.

On this page we:

- give the job to C#, and read it beside Python
- give the same job to SQL, and meet C#'s own way of writing it like SQL
- read the job in JavaScript, and in BASIC from the 1980s
- find what changes from one language to the next
- find four questions that stay the same in every language

Only the C# runs on this page. The other languages are shown to read, not
to run. What they print was checked by running them on a computer,
outside this page.

## One job in C#, and in Python

Before we give the job to other languages, let's ask four questions of the
job itself. We ask the same four questions of every language on this page.

- **What is named?** Seven readings, and an average.
- **What is promised?** A *promise* is what a name or a step says it
  gives. Here, `average` promises to hold the total shared equally over the
  seven days.
- **What happens first?** We must add before we divide, and we must know
  the average before we can compare a day with it.
- **What does the language allow?** Numbers with decimals, and a way to
  take them one at a time.

Here is the same job in Python, the language many people meet first. Read
it slowly beside the C# cell. Which lines can you match?

```python
rainfall_mm = [4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0]

running_sum = 0
for reading in rainfall_mm:
    running_sum = running_sum + reading
average = running_sum / len(rainfall_mm)
print("average:", average)

wet_days = 0
for reading in rainfall_mm:
    if reading > average:
        wet_days = wet_days + 1
print("days above it:", wet_days)
```

Every line has a partner in the C#. The differences are in the *syntax*,
the grammar that a language's code must follow:

- Python has no `{ }`. It uses indentation, the space at the start of a
  line, to mark where a loop or an `if` starts and stops.
- Python writes no types. `running_sum = 0` has no `double` in front of
  it, because in Python the value carries its type, and a name can hold a
  value of any type.
- Python has no `;` at the end of a step. The end of the line is the end
  of the step.
- `len(rainfall_mm)` does the job of `rainfall.Length`, and `print` does
  the job of `Console.WriteLine`.
- Python programmers join the words of a name with `_`, as in
  `running_sum`. C# programmers start each new word with a capital letter,
  as in `runningSum`. This is a habit of each language's programmers, not
  a rule of either language.

Python prints `average: 5.0`, and then `days above it: 3`. Python always
shows the point on a decimal number, even when nothing comes after it.

## The same job in SQL

*SQL* is a language for asking a database questions. A *database* is a
program that keeps data in *tables*, with one row for each thing and one
column for each fact about it. SQL came from SEQUEL, a language that
Donald Chamberlin and Raymond Boyce described at IBM in 1974. A question
in SQL is called a *query*.

First the table is made, with one row for each day:

```text
CREATE TABLE rain_tbl (
    rain_id INTEGER PRIMARY KEY,
    day TEXT,
    rainfall_mm REAL
);
INSERT INTO rain_tbl (day, rainfall_mm) VALUES
    ('Mon', 4.2), ('Tue', 0.0), ('Wed', 12.6), ('Thu', 7.1),
    ('Fri', 0.8), ('Sat', 3.3), ('Sun', 7.0);
```

`INTEGER`, `TEXT` and `REAL` are types. Each column is given its type when
the table is made, as each C# variable is given its type when it is made.
`PRIMARY KEY` gives each row a number of its own, `rain_id`, so that no two
rows can be confused.

Now the average. How many lines of SQL do you think it takes?

```text
SELECT AVG(rainfall_mm) FROM rain_tbl;
```

It takes one line, and no loop. `AVG` gives the average of a column. It
does the job of a method, and SQL calls it a *function*. Then the days
above the average:

```text
SELECT COUNT(*) FROM rain_tbl
WHERE rainfall_mm > (SELECT AVG(rainfall_mm) FROM rain_tbl);
```

The database gives the same two answers as the C# cell: an average of 5,
and 3 days above it. The query in brackets runs first and gives the average.
Then the outer query counts the rows whose rainfall is bigger than that.
`COUNT(*)` counts rows, and `WHERE` keeps only the rows where the condition
is true.

SQL is *declarative*: a program says what result it wants, and the
database decides the steps. C# and Python, as we wrote them above, are
*procedural*: the program says each step, in order. These are two of the
*paradigms*, the ways of organising a program, from the page
[Programming languages: how they came to be](lesson:how-we-got-here). In
SQL we never wrote "start at 0, add each reading". A loop still runs
somewhere inside the database, but it is the database's loop, not ours.

<details class="dl-why"><summary>Why do some people say "sequel"?</summary>

The IBM language was first called SEQUEL, for Structured English Query
Language. The name had to change, because a British aircraft company
already owned SEQUEL as a trade mark, so the letters became SQL. Fifty
years later, people still say it both ways, "sequel" and "S, Q, L".

</details>

C# can be declarative too. On that page, the total of the even numbers
took one line, with `Where` and `Sum`. They are part of [LINQ](lesson:asking-a-list-a-question), a set of
methods in C# for asking questions of arrays, lists and other collections.
LINQ took ideas and names from SQL, such as `Where`, `Count` and `Max`.
Here is the rainfall job in LINQ. Compare it with the two queries above.

```csharp exec
id: the-same-job-in-sql-1
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };

double average = rainfall.Average();
int wetDays = rainfall.Count(reading => reading > average);

Console.WriteLine($"average: {average}");
Console.WriteLine($"days above it: {wetDays}");
```

It prints `average: 5` and `days above it: 3`, as the loops did.
`Average()` does the job of SQL's `AVG`, and `Count(...)` does the job of
`COUNT(*)` with a `WHERE`. `reading => reading > average` is a small method
with no name: it takes a reading, and says whether it is above the
average. `Count` counts the readings for which it says `true`.

### Your turn

In SQL, `SELECT day` in place of `SELECT COUNT(*)` gives the days, not the
count, and `MAX(rainfall_mm)` in place of `AVG(rainfall_mm)` gives the
wettest reading. Can you find both in C#? The cell has the days in an
array of their own, in the same order as the readings.

```csharp exec
id: your-turn-1
string[] days = { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
double average = rainfall.Average();

// 1. The wettest reading

// 2. The days whose reading is above the average

```

```hint
after: 2 runs
On the page [Reusable methods](lesson:building-reusable-tools), which
method gave the largest element of an array?
```

```hint
after: 3 runs
`days[i]` and `rainfall[i]` are the same day, for each index `i`. Can a
`for` loop visit each index, and print `days[i]` when `rainfall[i]` is
above the average?
```

```solution
string[] days = { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };
double average = rainfall.Average();

// 1. The wettest reading
Console.WriteLine(rainfall.Max());

// 2. The days whose reading is above the average
for (int i = 0; i < rainfall.Length; i++)
{
    if (rainfall[i] > average)
    {
        Console.WriteLine(days[i]);
    }
}
---
The wettest reading is 12.6, and the days are Wed, Thu and Sun. In SQL,
the same two answers are `SELECT MAX(rainfall_mm) FROM rain_tbl;` and
`SELECT day FROM rain_tbl WHERE rainfall_mm > (SELECT AVG(rainfall_mm) FROM rain_tbl);`.
SQL keeps a day and its reading in one row, so it never needs the
index `i`. C# keeps them in two arrays here, and the index joins them.
```

## The same job in JavaScript

*JavaScript* is the language that web browsers run: most web pages that
do something when you click use it. Here is the same job in JavaScript.
It is to read, not to run. Which parts can you match with the C# cell at
the top of the page?

```text
const rainfallMm = [4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0];

let runningSum = 0;
for (const reading of rainfallMm) {
  runningSum = runningSum + reading;
}
const average = runningSum / rainfallMm.length;
console.log("average:", average);

let wetDays = 0;
for (const reading of rainfallMm) {
  if (reading > average) {
    wetDays = wetDays + 1;
  }
}
console.log("days above it:", wetDays);
```

JavaScript looks much more like C# than Python does. Both have `{ }` round
a block and `;` at the end of a step, and both write `runningSum`, with a
capital in the middle. Both borrowed those habits from C, the language
from 1972 on the page [Programming languages: how they came to
be](lesson:how-we-got-here). The differences:

- A new name starts with `let` or `const`, not with a type. `let` makes a
  name whose value can change, and `const` makes one whose value never
  changes. JavaScript, like Python, writes no types.
- The opening `{` is at the end of the line, not on a line of its own.
  This is a habit too: C# programmers put the `{` on its own line, as
  Visual Studio does.
- `.length` is `.Length` in C#, and `console.log` is `Console.WriteLine`.

It prints `average: 5`, as C# does, and then `days above it: 3`.
JavaScript has one type for all its numbers, whole or not, and it shows no
point when nothing comes after it.

### Two ways to answer "5" + 1

The bigger differences are in what a language allows. In JavaScript,
`"5" + 1` gives `51`: the text `"5"` and the number 1, joined as text. In
Python, the same line stops with an exception, a `TypeError`. Python will
not guess whether you meant a number or a piece of text. What do you think
C# does?

```csharp exec
id: two-ways-to-answer-1
Console.WriteLine("5" + 1);
Console.WriteLine(int.Parse("5") + 1);
```

```predict
type: choice

What will the first line print?

- 6
  - `"5"` is in quotes. Is it a number, or a piece of text?
- 51
  - `+` with a piece of text joins, as it does in `$"..."`.
- It does not compile
  - C# checks the type of every value before it runs anything.
- It stops with an exception
  - Python stops on this line. Does C#?
```

It prints `51`, and then `6`. Here C# agrees with JavaScript, not with
Python. When one side of `+` is a `string`, C# changes the other side into
text and joins them, as on the page
[Variables and types](lesson:storing-and-computing). To add, you change
the text into a number first, with `int.Parse`, and the second line prints
`6`.

But `+` is the only operator that joins. What does C# do with `"5" - 1`?
JavaScript gives the number 4: it changes `"5"` into a number, because
`-` works only on numbers. The next cell is meant to fail.

```csharp exec
id: two-ways-to-answer-2
expect: CS0019
Console.WriteLine("5" - 1);
```

It does not compile. The message is `Program.cs(1,19): error CS0019:
Operator '-' cannot be applied to operands of type 'string' and 'int'`.
Nothing ran. Here are the three languages side by side:

| | `"5" + 1` | `"5" - 1` |
|---|---|---|
| **Python** | stops with a `TypeError` when the line runs | stops with a `TypeError` when the line runs |
| **JavaScript** | `"51"`, joined as text | `4`, the text changed into a number |
| **C#** | `"51"`, joined as text | does not compile, and nothing runs |

Each language has its own rules about types. JavaScript guesses what you
meant, and it does not stop the program. If you wanted 6, nothing tells
you. Python refuses, but only when that line runs. C# refuses before the program
starts, because it knows the type of every value in the program. In C#,
each variable's type is written in the code and fixed, so the compiler can
check every `-` before anything runs.

## The same job in BASIC

BASIC was made at Dartmouth College in 1964, so that beginners could write
programs. In the 1980s it was built into home computers, such as the
Commodore 64 and the ZX Spectrum: when you started the computer, BASIC
was the first thing on the screen. Here is the same job in the style of the 1980s. Again, it is
to read, not to run.

```text
10 REM A WET WEEK: THE AVERAGE, AND DAYS ABOVE IT
20 DIM R(7)
30 LET T = 0
40 FOR I = 1 TO 7
50 READ R(I)
60 LET T = T + R(I)
70 NEXT I
80 LET A = T / 7
90 PRINT "AVERAGE"; A
100 LET C = 0
110 FOR I = 1 TO 7
120 IF R(I) > A THEN LET C = C + 1
130 NEXT I
140 PRINT "DAYS ABOVE IT"; C
150 DATA 4.2, 0, 12.6, 7.1, 0.8, 3.3, 7
160 END
```

It prints `AVERAGE 5` and `DAYS ABOVE IT 3`. Every line has a number, and the numbers
set the order. `REM` starts a comment, like `//` in C#. `DIM R(7)` makes
room for the readings, like an array. The readings are in a `DATA` line at
the end, and `READ` takes them one at a time. `FOR I = 1 TO 7` counts from
1 to 7, and 7 is included.

The names are single letters, and that was not only a habit. On the
Commodore 64, only the first two letters of a name counted, so `RAINFALL`
and `RAINY` would have been the same name. Programmers kept names short
because the machine could not see the difference between long ones. And
in most home-computer BASICs, a name that ends in `$`, such as `N$`, holds
text. There, the name itself says the type.

Here are lines 30 to 90 in C#, line by line, with `R` as `rainfall`, `I`
as `i`, `T` as `total`, and the loop counting from 1 to 7, as BASIC's does.
The cell is meant to stop with an exception. Can you see which line it
stops on, and why? Then can you change the loop so that it runs?

```csharp exec
id: the-same-job-in-basic-1
expect: exception
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };

double total = 0;
for (int i = 1; i <= 7; i++)
{
    total = total + rainfall[i];
}
Console.WriteLine($"average: {total / 7}");
```

```hint
after: 1 errors
Which reading is at index 1 of a C# array? Which one is at index 0?
```

```hint
after: 2 errors
The array has seven readings. What are the first and the last index of a
C# array of seven?
```

```solution
title: the loop, changed so that it runs
double[] rainfall = { 4.2, 0.0, 12.6, 7.1, 0.8, 3.3, 7.0 };

double total = 0;
for (int i = 0; i < 7; i++)
{
    total = total + rainfall[i];
}
Console.WriteLine($"average: {total / 7}");
---
It prints `average: 5`. The BASIC program counted from 1, because it
filled its array from 1. A C# array's first index is 0, as on the page
[Arrays and lists](lesson:lists-and-sequences), so the seven readings are
at indexes 0 to 6. `foreach (double reading in rainfall)` cannot miss
one, and it cannot ask for index 7.
```

It stops with an `IndexOutOfRangeException` on line 6, the line inside the
loop. The loop never asks for index 0, where Monday's 4.2 is, and it asks
for index 7, which a C# array of seven readings does not have. `R(1)` in
BASIC and `rainfall[1]` in C# name different readings, so a line-by-line
copy is not enough.

### Your turn

Here is a short BASIC program, to read. `STEP -3` makes the loop count
down by 3. Can you write the same program in C#?

```text
10 LET N$ = "ADA"
20 PRINT N$ + " LOVELACE"
30 FOR I = 10 TO 1 STEP -3
40 PRINT I
50 NEXT I
60 END
```

```csharp exec
id: your-turn-2
// The BASIC program, in C#

```

```hint
after: 2 runs
`N$` holds text, because its name ends in `$`. Which C# type holds text?
```

```hint
after: 3 runs
In a C# `for`, the three parts say where `i` starts, how long the loop
runs, and how `i` changes. What goes in each part, for 10, 7, 4 and so on?
```

```solution
string name = "ADA";
Console.WriteLine(name + " LOVELACE");
for (int i = 10; i >= 1; i = i - 3)
{
    Console.WriteLine(i);
}
---
It prints `ADA LOVELACE`, then 10, 7, 4 and 1. `N$` became `string name`:
the type moved from the end of the name to a word in front of it.
`FOR I = 10 TO 1 STEP -3` became three parts: start at 10, run while
`i >= 1`, and subtract 3 each time. BASIC says where to stop with `TO 1`,
and C# says it with `i >= 1`.
```

## What changes from one language to the next

A computer's hardware runs only its own machine code, so every language
needs a program that translates it or runs it. A *compiler* translates the
whole program before it runs. An *interpreter* is a program that reads
another program and follows its instructions one at a time, while it
reads them. The picture shows five ways a program gets from its text to
running.

![Five rows, one for each way a program gets from its text to running. The first BASIC, at Dartmouth: your code, then a compiler translates it all first, then the machine instructions run. BASIC on a home computer of the 1980s: your code, then an interpreter reads a line, does it, and reads the next. Python: your code, then it is compiled to simpler instructions, then an interpreter runs those. JavaScript in Chrome: your code, then an interpreter starts running it, and while it runs, the busiest parts are compiled to machine instructions. C#: your code, then a compiler checks it all and makes IL, then the .NET runtime makes machine code just before each part runs. A note under the rows says that on this page, the .NET runtime interprets the IL, in place of making machine code.](from-code-to-running.svg)

BASIC is in the picture twice. The first BASIC, at Dartmouth, was
compiled, and the BASICs in home computers were interpreted. So is a
language compiled or interpreted? That is a question about the tool, not
about the language. C# is in the picture once, but it runs in two ways.
In Visual Studio, the .NET runtime makes machine code from the IL, the
in-between form the compiler makes. On this page, the .NET runtime reads
the IL with an interpreter.

Here are the differences we found, side by side:

| | C# | Python | SQL | JavaScript | BASIC, 1980s |
|---|---|---|---|---|---|
| **Syntax** | `{ }` marks a block; `;` ends a step | indentation marks a block | one statement, in parts such as `SELECT` and `WHERE` | `{ }` marks a block; `;` ends a step | line numbers set the order |
| **Types** | each variable's type is written and fixed; `"5" - 1` does not compile | a value carries its type; `"5" + 1` stops with an exception | each column's type is given when the table is made | a value carries its type; `"5" + 1` becomes text | a name ending in `$` holds text |
| **How it runs** | compiled to IL, which the .NET runtime runs | compiled to simpler instructions, then interpreted | the database plans the steps itself | interpreted, and compiled while it runs | interpreted, line by line |
| **Where it runs** | on Windows, Mac and Linux, and here in your browser | on almost any computer | inside a database | in every web browser | built into a home computer |
| **Paradigm** | procedural, and declarative with LINQ | procedural | declarative | procedural | procedural |
| **Made for** | general programs, on Microsoft's .NET | readable, general programs | questions about tables of data | making web pages do things | beginners |

These rows are the *characteristics* of a programming language: its
syntax, how it treats types, how it is translated and run, where it runs,
its paradigm, and what it was made for. Two
languages can differ in one row and agree in the next. JavaScript looks
like C# on the page, but in the types row it is closer to Python.

A friend says, "C# is a compiled language." What would be the most careful
reply? What would you say, before you open the fold?

<details class="dl-answer"><summary>one way to answer</summary>

Here is one answer. Yours may be different and work too.

Partly. The C# compiler checks the whole program before anything runs,
and every page shows it: that is why `"5" - 1` did not compile. But the
compiler makes IL, not machine code. In Visual Studio, the .NET runtime
makes machine code from the IL while the program runs, and on this page,
it interprets the IL. Compiled or interpreted belongs to a tool, not to a
language, and C# uses both.

</details>

## What stays the same: the four questions

Now let's ask the four questions of all five programs at once.

| The question | C# | Python | SQL | JavaScript | BASIC |
|---|---|---|---|---|---|
| **What is named?** | `rainfall`, `average` | `rainfall_mm`, `average` | `rain_tbl`, `rainfall_mm` | `rainfallMm`, `average` | `R`, `A` |
| **What is promised?** | the total shared over `rainfall.Length`, or `Average()` | the total shared over `len(...)` | `AVG` gives the average | the total shared over `.length` | `T / 7` |
| **What happens first?** | add, then divide, then compare | add, then divide, then compare | the query in brackets, then the count | add, then divide, then compare | the order of the line numbers |
| **What does the language allow?** | `double[]`, LINQ, a compiler that checks types | lists, `len`, a `TypeError` | tables, `AVG`, `COUNT` | `console.log`, joining text to numbers | `DATA`, `READ`, two-letter names |

The answers change from column to column, and the questions never do. That
is the idea in this page's title. Every language names things, keeps
promises, puts steps in an order, and has rules about what it allows. A
programmer who asks the four questions can start to read a language they
have never seen before.

### Your turn: a language you have never seen

Here is a program in *Ruby*, a language from Japan, made by Yukihiro
Matsumoto in the 1990s. You have probably never read Ruby. Can you ask the
four questions of it? What is named, what is promised, what happens first,
and what does the language allow?

```text
temps = [14, 17, 11, 19]
sum = 0
temps.each do |t|
  sum = sum + t
end
puts sum / temps.length
```

`temps.each do |t| ... end` is Ruby's `foreach`: it runs the lines inside
it once for each temperature, with `t` as the temperature. `puts` prints a
line. Here is the same program in C#. What will its first line print?

```csharp exec
id: what-stays-the-same-1
int[] temps = { 14, 17, 11, 19 };
int sum = 0;
foreach (int temp in temps)
{
    sum = sum + temp;
}
Console.WriteLine(sum / temps.Length);
Console.WriteLine((double)sum / temps.Length);
```

```predict
type: choice

What will the first line print?

- 15
  - `sum` and `temps.Length` are both whole numbers.
- 15.25
  - The total is shared equally over four temperatures.
- 15.0
  - The average of whole numbers can have a decimal part. Does C# show
    one here?
```

<details class="dl-answer"><summary>one way to answer</summary>

Here is one answer. Yours may be different and work too.

- **Named:** `temps`, the four temperatures; `sum`, a running total; `t`,
  each temperature, one at a time.
- **Promised:** `puts` promises to print; `.length` promises the number
  of temperatures.
- **What happens first:** `sum` starts at 0, each temperature is added in
  turn, and the division comes after the loop.
- **What the language allows:** in Ruby, a whole number divided by a
  whole number gives a whole number, as in C#. So the Ruby program prints
  15, as the first line of the C# cell does. The second line changes
  `sum` into a `double` first, with `(double)`, and prints 15.25. Ruby
  does the same with `sum.to_f`.

You read a program in a language you had never seen, by asking four
questions.

</details>

### Your turn: from JavaScript to C#

Here is a JavaScript method, which JavaScript calls a *function*. It
counts how many of a game server's answer times, in milliseconds, were
longer than a limit.

```text
function countOver(values, limit) {
  let count = 0;
  for (const value of values) {
    if (value > limit) {
      count = count + 1;
    }
  }
  return count;
}
console.log(countOver([12, 3, 25, 8, 17], 10));
```

Can you write it in C#, as `CountOver`?

```csharp exec
id: your-turn-3
static int CountOver(int[] values, int limit)
{
    // Your code
    return 0;
}

int[] answerTimes = { 12, 3, 25, 8, 17 };
Console.WriteLine(CountOver(answerTimes, 10));
```

```inputs
CountOver(answerTimes, 10)
CountOver(answerTimes, 100)                // none is over 100
CountOver(new int[] { 10, 10, 11 }, 10)    // 10 is not over 10
CountOver(new int[0], 10)                  // no times at all
```

```hint
after: 2 runs
Which line of the JavaScript makes the count, and what does C# write in
place of `let`?
```

```hint
after: 3 runs
`for (const value of values)` is JavaScript's `foreach`. In C#, it is
`foreach (int value in values)`, with the type written in front of the
name.
```

```solution
static int CountOver(int[] values, int limit)
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

int[] answerTimes = { 12, 3, 25, 8, 17 };
Console.WriteLine(CountOver(answerTimes, 10));
---
It prints 3: 12, 25 and 17 are over 10. `function` became `static int`,
which says the type that the method returns, and each parameter got its
type, `int[]` and `int`. `let` became `int`, `for (const value of values)`
became `foreach (int value in values)`, and `countOver` became
`CountOver`, because C# methods start with a capital. The rest, the
braces, the `if` and the `return`, did not change at all. In LINQ it is
one line: `values.Count(value => value > limit)`.
```

<details class="dl-why"><summary>Why this way?</summary>

This page gave one small job to five languages and compared the results.
Another way is a tour: one page for each language, each with its own
history and its own strengths.

A tour goes deeper into each language. It shows what each one is best at,
such as SQL joining two tables, and a reader who wants to work in
JavaScript would learn more of it.

We chose one job because a comparison needs one thing that does not
change. With the job fixed, every difference you saw belonged to the
languages, not to the task. The cost is that the job was small. It did
not show what makes each language worth learning for its own sake.

</details>

## Looking back

| The question | On this page |
|---|---|
| **What is named?** | the same week of rain, named five ways; a table's columns; two-letter names on the Commodore 64 |
| **What is promised?** | the average as the total shared equally, kept by a loop, by `Average()` and by `AVG`; a query that says what, not how |
| **What happens first?** | add before dividing; the query in brackets before the outer query; line numbers in BASIC |
| **What does the language allow?** | JavaScript joins `"5"` and `1`, and so does C#; C# refuses `"5" - 1` before it runs; SQL has `AVG` built in; a BASIC array counts from 1, and a C# array from 0 |

Which of the five languages would you choose for a job of your own, and
which row of the characteristics table decided it?

A challenge for the notebook: choose a small job of your own, such as the
longest word in a sentence. Write it in C# step by step, and then in LINQ.
Then find a job like it on Rosetta Code (below), in a language you have
never read, and ask the four questions of it. The first step is in the
cell.

```csharp challenge
// One job, two styles: the longest word.
string[] words = { "a", "wet", "week", "in", "the", "west" };

// Step by step
string longest = "";
foreach (string word in words)
{
    if (word.Length > longest.Length)
    {
        longest = word;
    }
}
Console.WriteLine(longest);

// Declarative: can one line of LINQ find it too?
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. The page has no practice page, because it is an extra. The
page [LINQ: asking a list a question](lesson:asking-a-list-a-question),
an extra in the object-oriented course, shows much more of LINQ.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Rosetta Code. *Averages/Arithmetic mean*.
<https://rosettacode.org/wiki/Averages/Arithmetic_mean>. The job of this
page, the average of some numbers, written in hundreds of languages, one
under another. Choose three you have never seen, and ask the four
questions of each.

Microsoft. *Tips for JavaScript and TypeScript developers*, from *A tour of
C#*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-javascript-developers>.
What a JavaScript programmer finds the same in C#, and what they find
different. It is written for programmers, so read it for the list of
differences, not for every detail.

Microsoft. *Tips for Python developers*, from *A tour of C#*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-python-developers>.
The same, for a Python programmer who is learning C#.

Ben Eater (2015). *Comparing C to machine language.*
<https://www.youtube.com/watch?v=yOyaJXpAYZQ>. Ben Eater writes a small
program in C, and then reads the machine code the computer runs for it,
line by line. Ten minutes.
