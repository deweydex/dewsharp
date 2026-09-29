---
title: "Namespaces and class libraries: practice"
version: 2026.09.28.1
from: the-tools-around-your-code-practice
practice_for: namespaces-and-libraries
---

# Namespaces and class libraries: practice

This page has problems on namespaces, using lines, class libraries and
reading the documentation, and three from earlier pages. Try each problem
before you open anything under it, and run the cells to test your guesses.
Some cells are meant not to compile, and the problem says so or asks you to
guess. When that happens, nothing is broken: the message is part of the
answer.

The cells follow the rules of the road: a class written in a cell can be
used by the cells below it, and variables stay in their cell.

## 1. A line built piece by piece

`StringBuilder` is a type for text that grows piece by piece. A string
cannot be changed, so `text = text + moon` makes a new string each time. A
`StringBuilder` adds to itself. This program builds a line from the names
of Jupiter's four largest moons. It is meant not to compile. The
documentation for `StringBuilder` says that it is in the namespace
`System.Text`. Can you make the program compile?

```csharp exec
id: a-line-built-piece-by-piece-1
expect: CS0246
var line = new StringBuilder();
foreach (string moon in new List<string> { "Io", "Europa", "Ganymede", "Callisto" })
{
    line.Append(moon);
    line.Append(' ');
}
Console.WriteLine(line.ToString().Trim());
```

```hint
after: 2 errors
Which name does the message say it cannot find? Which line lets a file use
the short names of one namespace?
```

```solution
using System.Text;

var line = new StringBuilder();
foreach (string moon in new List<string> { "Io", "Europa", "Ganymede", "Callisto" })
{
    line.Append(moon);
    line.Append(' ');
}
Console.WriteLine(line.ToString().Trim());
---
It prints `Io Europa Ganymede Callisto`. `System.Text` is not one of the
seven namespaces that every cell has, so `StringBuilder` needs a using line
of its own. The full name works too, with no using line:
`var line = new System.Text.StringBuilder();`.
```

## 2. A using line in a cell above

The first cell holds `Cards`, a class with one method, `Orders`, which
gives the number of orders a pack of cards can be in. Its file has a using
line at the top, for `BigInteger`. The program in the second cell uses
`Cards` (rule 2: a class written in a cell can be used by the cells below
it). What will its first line print?

```csharp exec
id: a-using-line-in-a-cell-above-1
file: Cards.cs
using System.Numerics;

/// <summary>Counts the orders that a pack of cards can be in.</summary>
static class Cards
{
    /// <summary>The number of orders that n cards can be in: n × (n - 1) × ... × 1.</summary>
    /// <param name="n">The number of cards, 0 or more.</param>
    public static BigInteger Orders(int n)
    {
        BigInteger orders = 1;
        for (int card = 1; card <= n; card++)
        {
            orders = orders * card;
        }
        return orders;
    }
}
```

```csharp exec
id: a-using-line-in-a-cell-above-1-program
expect: CS0246
BigInteger orders = Cards.Orders(52);
Console.WriteLine(orders);
```

```predict
type: choice

What will the first line print?

- 80658175170943878571660636856403766975289505440883277824000000000000
  - `Cards` is in the cell above, and its file has the using line.
- It does not compile
  - Which file has the using line, and which file writes `BigInteger`?
- Nothing: it stops with an exception
  - Could anything about `BigInteger` be unknown until the program runs?
```

```solution
using System.Numerics;

BigInteger orders = Cards.Orders(52);
Console.WriteLine(orders);
```

<details class="dl-answer"><summary>why</summary>

It does not compile:
`Program.cs(1,1): error CS0246: The type or namespace name 'BigInteger' could not be found (are you missing a using directive or an assembly reference?)`.
A class can be used by the cells below it, but a using line works only in
its own file, and each cell is a file of its own. So the first cell can
write `BigInteger`, and the second cannot. Two files in one Visual Studio
project work the same way.

Add `using System.Numerics;` at the top of the second cell, and it prints
the number. Another way: `Console.WriteLine(Cards.Orders(52));` compiles
with no using line, because the program never writes the name
`BigInteger`.

</details>

## 3. A class in another file

A classmate has written a class `Circle`, in the namespace `Shapes`, in a
file of its own: the first cell. Can you write a program in the second
cell that makes a circle with a radius of 2, and prints its area?

```csharp exec
id: a-class-in-another-file-1
file: Circle.cs
namespace Shapes;

/// <summary>A circle, with its radius.</summary>
class Circle
{
    public double Radius;

    /// <summary>Makes a circle.</summary>
    /// <param name="radius">The distance from the centre to the edge.</param>
    public Circle(double radius)
    {
        Radius = radius;
    }

    /// <summary>The area inside the circle.</summary>
    /// <returns>π × radius × radius.</returns>
    public double Area()
    {
        return Math.PI * Radius * Radius;
    }
}
```

```csharp exec
id: a-class-in-another-file-1-program
// A circle with a radius of 2, and its area.
```

```hint
after: 1 errors
Which namespace is `Circle` in? What are the two ways for a program to
name a class that is in another namespace?
```

```solution
using Shapes;

var circle = new Circle(2);
Console.WriteLine(circle.Area());
---
It prints 12.566370614359172. The using line lets the program write
`Circle` alone. The full name works as well, with no using line:
`var circle = new Shapes.Circle(2);`. The pattern is the same for any class
in a namespace: the namespace, a dot, and the class's name.
```

## 4. Where does it come from?

The documentation for `Stopwatch`, a class that measures time, starts like
this:

```text
Stopwatch Class
Namespace: System.Diagnostics
```

Which line lets a program on this page write `Stopwatch` alone? What could
the program write instead, with no using line? And does a new console
project in Visual Studio need a reference, to use `Stopwatch`?

<details class="dl-answer"><summary>answer</summary>

The using line is `using System.Diagnostics;`. Without it, the program can
write the full name, `System.Diagnostics.Stopwatch`.

A new project needs no reference for it. `Stopwatch` is part of .NET's own
class library, and every new project already has references to .NET's own
assemblies. A reference is for a class library that is not part of .NET:
one of your own, as in
[the lesson](lesson:namespaces-and-libraries), or a package from NuGet.

</details>

## 5. A reward every thirty days

A game gives its players a reward on 1 January 2026, and then every 30
days. This program prints the day of the first reward. Can you make it
print the days of the first five?

```csharp exec
id: a-reward-every-thirty-days-1
var first = new DateTime(2026, 1, 1);
Console.WriteLine(first.ToLongDateString());
```

```hint
after: 2 runs
Which loop runs five times? On the day of the fourth reward, how many days
have passed since the first? `AddDays` gives a new date, some days later.
```

```solution
var first = new DateTime(2026, 1, 1);
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(first.AddDays(30 * i).ToLongDateString());
}
---
The five days are Thursday 1 January, Saturday 31 January, Monday 2 March,
Wednesday 1 April and Friday 1 May 2026. `30 * i` is 0 the first time, so
the first line is the first day itself. `first` never changes: each call
to `AddDays` returns a new date.
```

## 6. Inaccessible

A classmate has moved their classes into a class library. Their console app
has a reference to the library, and a using line for its namespace, and it
still does not compile:

```console
Program.cs(3,15): error CS0122: 'Character' is inaccessible due to its protection level
```

What is missing? And why did the same class work before, when it was in
the console app?

<details class="dl-answer"><summary>answer</summary>

The word `public`, in front of `class Character`, and in front of every
other class in the library that the console app uses. A class with no
access modifier is `internal`: only code in its own project can use it.
When the class was in the console app, the program was in the same
project, so `internal` was enough.

Here are the four access modifiers of this course, and who can use a class
or a member that has each one:

| Modifier | Who can use it |
|---|---|
| `private` | Code inside the same class. A field or a method with no modifier is `private`. |
| `protected` | Code inside the same class, and inside its child classes. |
| `internal` | Code in the same project. A class with no modifier is `internal`. |
| `public` | Any code, in this project or in any project with a reference to it. |

[Encapsulation](lesson:keeping-details-inside-an-object) met `private` and
`public`, and [Inheritance](lesson:one-parent-many-children) met
`protected`.

</details>

## 7. From earlier: a date that does not change

From [A front end](lesson:a-front-end-for-a-class), where `Trim()` and
`ToLower()` return a new string and leave the first one as it was. What
will this program print?

```csharp exec
id: a-date-that-does-not-change-1
var launch = new DateTime(1977, 9, 5);
launch.AddDays(1);
Console.WriteLine(launch.ToLongDateString());
```

```predict
type: choice

What will the line print?

- Monday 5 September 1977
  - `AddDays` returns a new date.
- Tuesday 6 September 1977
  - The second line adds a day to `launch`.
- It does not compile
  - The second line does nothing with what `AddDays` gives back.
```

<details class="dl-answer"><summary>why</summary>

It prints `Monday 5 September 1977`. `AddDays` returns a new `DateTime`,
one day later, and the second line does not store it anywhere, so it is
lost. To change `launch`, the line must store the new date in it:
`launch = launch.AddDays(1);`. C# compiles the second line as it is,
without a warning.

A `DateTime` never changes once it is made. It is a struct, and
[Two names, one object](lesson:two-names-one-object) gives Microsoft's
guideline: a struct should not change once it is made. So each of its
methods that seems to change a date returns a new one instead, as each
method of a string does.

</details>

## 8. From earlier: one code, two reasons

From [Compiler errors](lesson:compiler-errors). This program is meant not
to compile. Both of its messages have the same code, CS0246. Does each one
need the same change? Can you make it compile?

```csharp exec
id: one-code-two-reasons-1
expect: CS0246
Int count = 5;
var watch = new Stopwatch();
Console.WriteLine(count);
```

```hint
after: 2 errors
Which name does each message say it cannot find? Which one is spelt in
another way from the type you know, and which one is in a namespace that
is not one of the seven?
```

```solution
using System.Diagnostics;

int count = 5;
var watch = new Stopwatch();
Console.WriteLine(count);
---
It prints `5`. The first message cannot find `Int`: the type is `int`, with
a small i, so the change is to the spelling. The second cannot find
`Stopwatch`, which is spelt as .NET spells it, and is in
`System.Diagnostics`: the change is a using line. The same code has a third
reason, which you meet in Visual Studio: a class library with no reference,
as in [the lesson](lesson:namespaces-and-libraries). Read the name in the
message, and then decide which reason it is.
```

## 9. From earlier: comments for a library

From [Documenting a class](lesson:documenting-a-class). Somebody uses your
class library in Visual Studio. They see your XML comments when they rest
the mouse pointer on a name, and they never see your code. In a file that
starts with `namespace GameWorld;`, where does the comment for a class go?
Which of your comments matter most now?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The namespace line comes first, then the comment, then the class, as in
`Path.cs` in the lesson:

```csharp
namespace GameWorld;

/// <summary>A character who can also heal someone else.</summary>
public class Healer : Character
{
```

The comment belongs to the class, so it goes directly above it. The
comments that matter most now are the ones on the public classes and their
public members, because those are all that another project can use, and
the comments are all that its programmer sees of them.

</details>
