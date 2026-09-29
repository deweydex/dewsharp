---
title: "Visual Studio: practice"
version: 2026.09.28.1
from: the-tools-around-your-code-practice
practice_for: the-tools-around-your-code
---

# Visual Studio: practice

This page has problems on compiler messages, exception reports, printing
what you need to see and Visual Studio, and three from earlier pages. Try
each problem before you open anything under it, and run the cells to test
your guesses. Problems 5 and 6 need a computer with Visual Studio.

Some cells on this page are meant to fail. When one of them does not
compile, or stops with an exception, nothing is broken: the message is
part of the answer. The cells follow the rules of the road from the
lesson: a class written in a cell can be used by the cells below it, and
variables stay in their cell.

## 1. Which line?

A space station shares its food packs among the crew on board. Six of the
crew are on board, and nobody is outside on a spacewalk. `PacksEach`
shares the food packs among the number of people it is given. The program
is meant to stop with an exception.

```csharp exec
id: which-line-1
file: Station.cs
class Station
{
    public int FoodPacks;
    public List<string> Aboard;
    public List<string> Outside;

    public Station(int foodPacks, List<string> aboard, List<string> outside)
    {
        FoodPacks = foodPacks;
        Aboard = aboard;
        Outside = outside;
    }

    public int PacksEach(int people)
    {
        return FoodPacks / people;
    }

    public void ShareFood()
    {
        int each = PacksEach(Outside.Count);
        Console.WriteLine($"{each} packs each");
    }
}
```

```csharp exec
id: which-line-1-program
expect: exception
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var station = new Station(24, crew, new List<string>());
station.ShareFood();
```

Run the program. The exception report names three lines:

- line 16 of `Station.cs`: `return FoodPacks / people;`
- line 21 of `Station.cs`: `int each = PacksEach(Outside.Count);`
- line 3 of `Program.cs`: `station.ShareFood();`

Which line most likely holds the mistake?

<details class="dl-answer"><summary>why</summary>

Line 21. Line 16 is the line that failed, because C# can't divide a whole
number by 0. But `PacksEach` was written to share the packs among the
people it is given, and line 21 gave it the number of people outside, which
is 0. The exception appeared on line 16, and line 21 is the line that is
responsible. With `PacksEach(Aboard.Count)`, the station shares the packs
among the six on board. The solution under the program has that change.

</details>

```solution
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var station = new Station(24, crew, new List<string>());
station.ShareFood();

class Station
{
    public int FoodPacks;
    public List<string> Aboard;
    public List<string> Outside;

    public Station(int foodPacks, List<string> aboard, List<string> outside)
    {
        FoodPacks = foodPacks;
        Aboard = aboard;
        Outside = outside;
    }

    public int PacksEach(int people)
    {
        return FoodPacks / people;
    }

    public void ShareFood()
    {
        int each = PacksEach(Aboard.Count);   // the people on board share the food
        Console.WriteLine($"{each} packs each");
    }
}
---
It prints `4 packs each`.
```

Visual Studio's console window shows the same report in its own form.
Without the folder names, it is:

```console
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
   at Station.PacksEach(Int32 people) in Station.cs:line 16
   at Station.ShareFood() in Station.cs:line 21
   at Program.<Main>$(String[] args) in Program.cs:line 3
```

The same three lines are there, in the same order. `Program.<Main>$` is the
name that .NET gives to the statements in `Program.cs`, and `Int32` is
.NET's own name for `int`.

## 2. One letter too many

The program below is meant to fail.

```csharp exec
id: one-letter-too-many-1
file: Counter.cs
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
id: one-letter-too-many-1-program
expect: CS1061
var counter = new Counter();
counter.Add(5);
counter.Add(3);
Console.WriteLine(counter.Totall);
```

Run the program. Before you read the whole message, can you find the name
that the compiler did not know? Then fix it: what
does the program print?

<details class="dl-answer"><summary>answer</summary>

`Totall`, on line 4. The message starts `Program.cs(4,27): error CS1061:
'Counter' does not contain a definition for 'Totall'`. The name in quotes
after *definition for* is the one that the compiler could not find. With
`Total`, the program prints `8`: each `Add` changed `Total`, first 0 + 5,
and then 5 + 3.

Before the fix, nothing ran at all, not even the two `Add` lines. C#
checks the whole program before it runs any of it.

</details>

```solution
var counter = new Counter();
counter.Add(5);
counter.Add(3);
Console.WriteLine(counter.Total);
---
It prints 8.
```

## 3. An average that is too big

Ada has played four rounds, and she scored 120, 340, 85 and 210. Her
average score is 188.75. Can you print what you need inside
`AverageScore`, find the mistake, and fix it?

```csharp exec
id: an-average-that-is-too-big-1
file: Player.cs
class Player
{
    public string Name;
    public List<int> Scores;

    public Player(string name, List<int> scores)
    {
        Name = name;
        Scores = scores;
    }

    public double AverageScore()
    {
        double total = 0;
        int count = 0;
        foreach (int score in Scores)
            total = total + score;
            count = count + 1;
        return total / count;
    }
}
```

```csharp exec
id: an-average-that-is-too-big-1-program
var ada = new Player("Ada", new List<int> { 120, 340, 85, 210 });
Console.WriteLine(ada.AverageScore());
```

```inputs
ada.AverageScore()
new Player("Grace", new List<int> { 45, 55 }).AverageScore()
```

```hint
after: 2 runs
What are `total` and `count` just before the `return`? Print them there.
Which of the two is not what you expected?
```

```solution
var ada = new Player("Ada", new List<int> { 120, 340, 85, 210 });
Console.WriteLine(ada.AverageScore());

class Player
{
    public string Name;
    public List<int> Scores;

    public Player(string name, List<int> scores)
    {
        Name = name;
        Scores = scores;
    }

    public double AverageScore()
    {
        double total = 0;
        int count = 0;
        foreach (int score in Scores)
        {
            total = total + score;
            count = count + 1;   // inside the braces, so inside the loop
        }
        return total / count;
    }
}
---
Without braces, a `foreach` repeats only the one line under it.
`count = count + 1;` is indented as if it were inside the loop, but C#
does not read the indenting. The line ran once, after the loop, and the
total was divided by 1. In Visual Studio, **Format Document** (Ctrl+K,
then Ctrl+D) indents each line as C# reads it, and after that the bug is
easy to see.

`total` is a `double`, so `total / count` keeps the .75. With two `int`
values, C# would drop it. And `Scores.Count` gives the number of scores
without counting them in the loop at all.
```

## 4. Where the list comes from

In Visual Studio, you type `grace` and a dot, and a list appears with
`Attack`, `Health`, `Name`, `Strength` and `TakeDamage` in it. Where does
Visual Studio get that list? Does it have to run the program first?

<details class="dl-answer"><summary>answer</summary>

It gets the list from the class, and it runs nothing. `grace` is a
`Character`, so Visual Studio reads the class `Character` and lists what
code outside the class can use: the fields and methods marked `public`,
and the few that every object has. A method without `public` in front of
it would not be in the list outside its class. The next page,
[Encapsulation](lesson:keeping-details-inside-an-object), is about why you
might want that.

</details>

## 5. A class in a file of its own

This one is done in Visual Studio, in the project from the tutorial page.
A shield blocks some of each hit. Can you add a class `Shield` to the
project, in a file of its own, `Shield.cs`?

- It has a field, `Strength`, which the constructor sets.
- It has a method, `Block(int hit)`, which returns what is left of the
  hit: the hit minus the shield's strength, but never less than 0.

Then, at the end of `Program.cs`, make a shield of strength 2, and print
what it leaves of a hit of 5 and of a hit of 1. What does the program
print?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`Shield.cs`:

```csharp
class Shield
{
    public int Strength;

    public Shield(int strength)
    {
        Strength = strength;
    }

    public int Block(int hit)
    {
        return Math.Max(0, hit - Strength);
    }
}
```

At the end of `Program.cs`:

```csharp
var shield = new Shield(2);
Console.WriteLine(shield.Block(5));
Console.WriteLine(shield.Block(1));
```

Nothing else is needed: every `.cs` file in a project is compiled into the
same program, as the cells above a program cell are on these pages. Is
each number what the description of `Block` says?

If you kept the `namespace` line that Visual Studio wrote at the top of
`Shield.cs`, `Program.cs` can't find the class. The compiler says
`error CS0246: The type or namespace name 'Shield' could not be found`. A
*namespace* is a named group of classes, and code outside the group needs
a `using` line to name them briefly. Delete the namespace line and its
braces, or add `using` and the namespace's name at the top of
`Program.cs`. A later page, [Namespaces and class libraries](lesson:namespaces-and-libraries), is about
them.

</details>

## 6. A program that never ends

A program has been running for over a minute, in a loop that never ends.
On this page, what stops it? In Visual Studio, what stops it, and what
would show you what the loop's variables held?

<details class="dl-answer"><summary>answer</summary>

On this page, **Stop**: the **Run** button becomes **Stop** while a
program runs. After it stops, its variables are gone, because each Run is
a new program. A `Console.WriteLine` inside the loop is the way to see
them here.

In Visual Studio, if you started the program with F5, **Break All** (the
pause button, or Ctrl+Alt+Break) pauses it wherever it is. The **Locals**
window then shows the loop's variables at that moment, and F10 runs the
loop one line at a time. **Stop Debugging** (the red square, or Shift+F5)
ends it.

</details>

## 7. From earlier: a count that never counts

From [Inside a method: sequence, selection and iteration in a class](lesson:the-moves-you-already-know).

```csharp exec
id: from-earlier-a-count-that-never-counts-1
file: Probe.cs
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
id: from-earlier-a-count-that-never-counts-1-program
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

`1`, both times. `Burn` adds 1 to `Burns`, and stores the result in
`burns`, a local variable that is gone when the method ends. To C#,
`Burns` and `burns` are two different names, because their first letters
differ. So the field `Burns` never changes, and the next call starts from
0 again. A `Console.WriteLine(Burns);` inside `Burn` would show that the
field never changes. `Burns = Burns + 1;` stores the new count on the
object.

</details>

## 8. From earlier: an object in a list

From [Classes and objects](lesson:objects-and-classes).

```csharp exec
id: from-earlier-an-object-in-a-list-1
file: Character.cs
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
id: from-earlier-an-object-in-a-list-1-program
var ada = new Character("Ada");
var party = new List<Character> { ada };
Console.WriteLine(ada);
Console.WriteLine(party);
Console.WriteLine(string.Join(", ", party));
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
.NET's own name for a `List` with one type between its angle brackets. The
third line joins the items: `string.Join` calls the `ToString` of each
item, so it prints `Ada`.

</details>

## 9. From earlier: does not compile, or stops?

From [Compiler errors](lesson:compiler-errors). When you press Run, three things can happen: the
program does not compile, it stops with an exception, or it runs. Which
one happens for each of these cells, and if it stops, with which
exception? Decide for all three, and then run them. All three are meant to
fail.

```csharp exec
id: from-earlier-does-not-compile-or-stops-1
expect: exception
int count = int.Parse("twelve");
Console.WriteLine(count);
```

```csharp exec
id: from-earlier-does-not-compile-or-stops-2
expect: exception
List<string> items = new() { "rope", "lamp" };
Console.WriteLine(items[2]);
```

```csharp exec
id: from-earlier-does-not-compile-or-stops-3
expect: CS0029
int depth = "120";
Console.WriteLine(depth);
```

<details class="dl-answer"><summary>answer</summary>

The first stops with a `FormatException`: `int.Parse` wants a whole number
written in digits. The second stops with an
`ArgumentOutOfRangeException`: the two items are at positions 0 and 1. The
third does not compile: `error CS0029: Cannot implicitly convert type
'string' to 'int'`. `"120"` is text, even though it looks like a number,
and `int.Parse("120")` makes a number from it.

If you know Python: `"depth: " + 120` is not a mistake in C#. `+` joins a
string and a number into one string.

</details>

## 10. A local that hides a field

A lamp has a method, `Light`, that should light it. This problem is last
on the page because its class gives two warnings, and a class's warnings
appear under every program below it.

```csharp exec
id: a-local-that-hides-a-field-1
file: Lamp.cs
class Lamp
{
    public string Room;
    public bool IsLit;

    public Lamp(string room)
    {
        Room = room;
    }

    public void Light()
    {
        bool IsLit = true;
    }
}
```

```csharp exec
id: a-local-that-hides-a-field-1-program
var hall = new Lamp("Hall");
hall.Light();
Console.WriteLine(hall.IsLit);
```

```predict
type: choice

What will the program print?

- True
  - `Light` sets `IsLit` to `true`.
- False
  - A line that starts with a type makes a new variable.
- Nothing: it does not compile.
  - There are two things called `IsLit`.
```

<details class="dl-answer"><summary>why</summary>

`False`. `bool IsLit = true;` starts with a type, so it makes a new local
variable inside `Light`, and this one has exactly the field's name. Inside
`Light`, after that line, `IsLit` means the local variable: it *hides* the
field. The local is gone when the method ends, and the field was never
changed. The compiler allows this, and it gives two warnings.
`warning CS0219: The variable 'IsLit' is assigned but its value is never
used` is about the local variable. `warning CS0649: Field 'Lamp.IsLit' is
never assigned to, and will always have its default value false` is about
the field.

There are two fixes. Delete `bool`, so that the line stores in the field.
Or change the line to `this.IsLit = true;`. `this` is the object that the
method was called on, so `this.IsLit` always means the field, even when a
local variable has the same name. If you know Python, `this.` is C#'s
`self.`, but C# needs it only when a name is hidden. The two solutions
under the program are the two fixes, and both print `True`.

</details>

```solution
title: without bool
var hall = new Lamp("Hall");
hall.Light();
Console.WriteLine(hall.IsLit);

class Lamp
{
    public string Room;
    public bool IsLit;

    public Lamp(string room)
    {
        Room = room;
    }

    public void Light()
    {
        IsLit = true;   // no type in front, so this is the field
    }
}
---
It prints `True`, with no warnings.
```

```solution
title: with this
var hall = new Lamp("Hall");
hall.Light();
Console.WriteLine(hall.IsLit);

class Lamp
{
    public string Room;
    public bool IsLit;

    public Lamp(string room)
    {
        Room = room;
    }

    public void Light()
    {
        this.IsLit = true;   // this.IsLit is always the field
    }
}
---
It prints `True`, with no warnings.
```
