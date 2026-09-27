---
title: "Your development environment: finding a bug inside a class — Practice"
version: 2026.09.27.1
from: the-tools-around-your-code-practice
practice_for: the-tools-around-your-code
---

# Your development environment: finding a bug inside a class — Practice

This page has problems on reading stack traces, printing what you need to
see, and the tools around your code, and three from earlier pages. Try
each problem before you open anything under it, and run the cells to test
your guesses.

## 1. Which line?

A ship's cook shares the galley's rations among the crew. The program
stops with this stack trace. This is how Visual Studio's console shows it,
with the folder names left out. `Program.<Main>$` is the name .NET gives to
the statements in `Program.cs`, and `Int32` is .NET's own name for `int`.

```console
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
   at Galley.RationsEach(Int32 people) in Galley.cs:line 16
   at Galley.FeedEveryone() in Galley.cs:line 21
   at Program.<Main>$(String[] args) in Program.cs:line 3
```

Here are the three lines it names:

- line 16 of `Galley.cs`: `return Rations / people;`
- line 21 of `Galley.cs`: `int each = RationsEach(Ashore.Count);`
- line 3 of `Program.cs`: `galley.FeedEveryone();`

`RationsEach` shares the rations among the number of people it is given.
Six of the crew are on board, and nobody is ashore. Which line most likely
holds the mistake?

<details class="dl-answer"><summary>why</summary>

Line 21. Line 16 failed, because C# can't divide a whole number by 0. But
`RationsEach` was written to share the rations among the people it is
given, and line 21 gave it the number of people ashore, which is 0. The
exception appeared on line 16, and line 21 is the line that is
responsible. `RationsEach(OnBoard.Count)` shares 24 rations among 6, and
prints `4 rations each`.

</details>

## 2. One letter too many

```csharp exec
id: one-letter-too-many-1
class Counter
{
    public int Total = 0;

    public void Add(int amount)
    {
        Total = Total + amount;
    }
}
```

```csharp exec
id: one-letter-too-many-2
expect: CS1061
var counter = new Counter();
counter.Add(5);
counter.Add(3);
Console.WriteLine(counter.Totall);
```

Run it. It does not compile, on purpose. Before you read the whole
message, can you find the name that the compiler did not know? Then fix
it: what does the program print?

<details class="dl-answer"><summary>answer</summary>

`Totall`, on line 4. The message begins `Program.cs(4,27): error CS1061:
'Counter' does not contain a definition for 'Totall'`. The name in quotes
after *definition for* is the one the compiler could not find. Fixed, the
program prints `8`: each `Add` changed `Total`, first 0 + 5, then 5 + 3.

Before the fix, nothing ran at all, not even the two `Add` lines. C#
checks the whole program before it runs any of it.

</details>

## 3. Missing public

A lamp has a method, `Light`, that lights it.

```csharp exec
id: missing-public-1
class Lamp
{
    public bool IsLit = false;

    void Light()
    {
        IsLit = true;
    }
}
```

```csharp exec
id: missing-public-2
expect: CS0122
var lamp = new Lamp();
lamp.Light();
Console.WriteLine(lamp.IsLit);
```

```predict
type: choice

What will happen when you run the program?

- It prints `True`.
  - `Light` sets `IsLit` to `true`.
- It prints `False`.
  - `IsLit` starts as `false`.
- It does not compile.
  - `Light` has no `public` in front of it.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `Program.cs(2,6): error CS0122: 'Lamp.Light()' is
inaccessible due to its protection level`. A method written without
`public` is *private*: only code inside its own class can call it. In C#,
private is what a method is when you write nothing in front of it. Write
`public void Light()`, and the program prints `True`. The next page,
[Encapsulation: keeping an object's data behind its methods](lesson:keeping-details-inside-an-object),
is about when private is what you want.

</details>

## 4. An average that is too big

A logbook should give the average depth of its dives. The Nautilus dived
120, 340, 85 and 210 metres, so the average is 188.75. Can you print what
you need inside `AverageDepth`, find the mistake, and fix it?

```csharp exec
id: an-average-that-is-too-big-1
class Logbook
{
    public string Submarine;
    public List<int> Depths;

    public Logbook(string submarine, List<int> depths)
    {
        Submarine = submarine;
        Depths = depths;
    }

    public double AverageDepth()
    {
        double total = 0;
        int count = 0;
        foreach (int depth in Depths)
            total = total + depth;
            count = count + 1;
        return total / count;
    }
}
```

```csharp exec
id: an-average-that-is-too-big-2
var log = new Logbook("Nautilus", new List<int> { 120, 340, 85, 210 });
Console.WriteLine(log.AverageDepth());
```

```inputs
log.AverageDepth()
new Logbook("Alvin", new List<int> { 45, 55 }).AverageDepth()
```

```hint
Print `total` and `count` just before the `return`. Which of the two is
not what you expected?
```

```solution
var log = new Logbook("Nautilus", new List<int> { 120, 340, 85, 210 });
Console.WriteLine(log.AverageDepth());

class Logbook
{
    public string Submarine;
    public List<int> Depths;

    public Logbook(string submarine, List<int> depths)
    {
        Submarine = submarine;
        Depths = depths;
    }

    public double AverageDepth()
    {
        double total = 0;
        int count = 0;
        foreach (int depth in Depths)
        {
            total = total + depth;
            count = count + 1;   // fixed: inside the braces, so inside the loop
        }
        return total / count;
    }
}
---
188.75. Without braces, a `foreach` repeats only the one line under it.
`count = count + 1;` was indented as if it were inside the loop, but C#
does not read the indentation. It ran once, after the loop, and the total
was divided by 1. In Visual Studio, **Format Document** (Ctrl+K, then
Ctrl+D) moves each line to the place where C# reads it, and this bug is
easy to see after that.

`total` is a `double`, so `total / count` keeps the .75. With two `int`
values, C# would drop it and give 188. And `Depths.Count` gives the number
of dives without counting them in the loop at all.

The solution has the program first and the class after it, because C#
needs the statements to come before the class in a file. Its class is used
in place of the one above (rule 4: a class written again further down
replaces the earlier one).
```

## 5. Where the list comes from

In Visual Studio, you type `grace` and a dot, and a list appears with
`Name`, `Health`, `Hits`, `TakeHit` and more in it. Where does Visual
Studio get that list? Does it have to run the program first?

<details class="dl-answer"><summary>answer</summary>

It gets the list from the class, and it runs nothing. `grace` is a
`Character`, so Visual Studio reads the class `Character` and lists what
code outside the class can use: the fields and methods marked `public`,
and the few that every object has. That is why a method without `public`,
such as `Light` in problem 3, is not in the list outside its class.

</details>

## 6. A class in another file

A classmate adds a class `Shape` to their Visual Studio project, in a file
of its own, `Shape.cs`. `Shape` has an `Area()` method. What would they
type in `Program.cs` to make a `Shape` and print its area?

<details class="dl-answer"><summary>answer</summary>

```csharp
var shape = new Shape(...);
Console.WriteLine(shape.Area());
```

The values inside `Shape(...)` depend on how its constructor is written.
Nothing else is needed. Every `.cs` file in a project is compiled into the
same program, as the cells above a program cell are on these pages.

One thing can hide the class. A new class file in Visual Studio can start
with a line such as `namespace MyProject;`. A *namespace* is a named group
of classes. Then `Program.cs` needs `using MyProject;` at its top.
Without it, the compiler says it can't find `Shape` (CS0246).

</details>

## 7. A program that never ends

A program has been running for over a minute, in a loop that never ends.
On this page, what stops it? In Visual Studio, what stops it, and what
would tell you what the loop's variables held?

<details class="dl-answer"><summary>answer</summary>

On this page, **Stop**: the **Run** button becomes **Stop** while a
program runs. After it stops, its variables are gone, because each Run is
a new program. A `Console.WriteLine` inside the loop is the way to see
them here.

In Visual Studio, if you started the program with F5, **Break All** (the
pause button, or Ctrl+Alt+Break) pauses it wherever it is. The **Locals**
window then shows the loop's variables at that moment. **Stop Debugging**
(the red square, or Shift+F5) ends it.

</details>

## 8. From earlier: a count that never counts

From [Sequence, selection and iteration inside a class](lesson:the-moves-you-already-know).

```csharp exec
id: from-earlier-a-count-that-never-counts-1
class Probe
{
    public string Name;
    public int Burns = 0;

    public Probe(string name)
    {
        Name = name;
    }

    public int Burn()
    {
        int burns = Burns + 1;
        return burns;
    }
}
```

```csharp exec
id: from-earlier-a-count-that-never-counts-2
var juno = new Probe("Juno");
Console.WriteLine(juno.Burn());
Console.WriteLine(juno.Burn());
```

```predict
type: choice

What will the second line print?

- 1
  - `burns` is a variable of the method, so the field `Burns` stays at 0.
- 2
  - Each call adds one burn.
```

<details class="dl-answer"><summary>why</summary>

`1`, both times. `Burn` adds 1 to `Burns`, which gives 1, and stores it in
`burns`, a variable of the method that is gone when the method ends. To
C#, `Burns` and `burns` are two different names, because their first
letters differ. So the field `Burns` never changes, and the next call
starts from 0 again. A
`Console.WriteLine(Burns);` inside `Burn` would print 0 every time.
`Burns = Burns + 1;` stores the new count on the object.

</details>

## 9. From earlier: an object in a list

From [Classes and objects](lesson:objects-and-classes).

```csharp exec
id: from-earlier-an-object-in-a-list-1
class Character
{
    public string Name;

    public Character(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return Name;
    }
}
```

```csharp exec
id: from-earlier-an-object-in-a-list-2
var ada = new Character("Ada");
var party = new List<Character> { ada };
Console.WriteLine(ada);
Console.WriteLine(party);
```

```predict
type: choice

What will the second line print?

- `Ada`
  - `ToString` gives the text for an object wherever it appears.
- `[Ada]`
  - A list prints its items between square brackets.
- ``System.Collections.Generic.List`1[Character]``
  - A list prints the name of its type, not its items.
```

<details class="dl-answer"><summary>why</summary>

The first line is `Ada`, from `ToString`. The second is
``System.Collections.Generic.List`1[Character]``. A list has a `ToString`
of its own, and it gives the list's type, not its items. ``List`1`` is
.NET's own name for a `List` with one type between its angle brackets. To
print the items, join them: `Console.WriteLine(string.Join(", ", party));`
prints `Ada`, because `string.Join` calls the `ToString` of each item.

</details>

## 10. From earlier: three mistakes

From [Reading an error message](lesson:reading-an-error-message). What
does each of these cells do? Does it stop with an exception (and which
one), or does it not compile? Decide for all three, then run them. All
three are meant to fail.

```csharp exec
id: from-earlier-three-mistakes-1
expect: exception
int count = int.Parse("twelve");
Console.WriteLine(count);
```

```csharp exec
id: from-earlier-three-mistakes-2
expect: exception
var items = new List<string> { "rope", "lamp" };
Console.WriteLine(items[2]);
```

```csharp exec
id: from-earlier-three-mistakes-3
expect: CS0029
int depth = "120";
Console.WriteLine(depth);
```

<details class="dl-answer"><summary>answer</summary>

The first stops with a `FormatException`: `int.Parse` wants a whole number
written in digits. The second stops with an
`ArgumentOutOfRangeException`: two items have the indexes 0 and 1. The
third does not compile: `error CS0029: Cannot implicitly convert type
'string' to 'int'`. `"120"` is text, even though it looks like a number,
and `int.Parse("120")` makes a number from it.

If you know Python: `"depth: " + 120` is not a mistake in C#. `+` joins a
string and a number, and gives `depth: 120`.

</details>
