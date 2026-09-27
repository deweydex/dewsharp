---
title: "Your development environment: finding a bug inside a class"
version: 2026.09.27.1
from: the-tools-around-your-code
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO5]
---

# Your development environment: finding a bug inside a class

Grace takes two hits in a game: 4, and then 3. The first cell below is a
class, `Character`, that keeps a list of the hits a character takes. The
second cell is a program that uses it, and it should print a report on
Grace. Run the program. It stops with an exception, on purpose: it runs
until it reaches a line it can't complete, and stops there. The exception
names three lines of code.

```csharp exec
id: a-bug-two-calls-deep-1
class Character
{
    public string Name;
    public int Health;
    public List<int> Hits = new();

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeHit(int amount)
    {
        Hits.Add(amount);
        Health = Math.Max(0, Health - amount);
    }

    // Players count hits from 1: the first hit is hit number 1.
    public int Hit(int number)
    {
        return Hits[number];
    }

    public string Report()
    {
        string first = $"First hit: {Hit(1)}.";
        string last = $"Last hit: {Hit(Hits.Count)}.";
        return $"{Name}: {Health} health. {first} {last}";
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-2
expect: exception
var grace = new Character("Grace", 8);
grace.TakeHit(4);
grace.TakeHit(3);
Console.WriteLine(grace.Report());
```

Which of the three lines would you change? Choose one, and then read the
next part.

- Line 22 of `Character.cs`: `return Hits[number];`
- Line 28 of `Character.cs`: `string last = $"Last hit: {Hit(Hits.Count)}.";`
- Line 4 of `Program.cs`: `Console.WriteLine(grace.Report());`

## A bug two calls deep

Under the exception's message is a *stack trace*: the list of the calls
that were running when the program stopped. Read a stack trace from the
top.

- The first line names the exception and says what happened:
  `System.ArgumentOutOfRangeException: Index was out of range. Must be
  non-negative and less than the size of the collection. (Parameter
  'index')`. An *index* is a position in a list, and the first position
  is 0. *Non-negative* means 0 or more.
- The first line of code under it is the line that failed: line 22 of
  `Character.cs`, inside `Hit`.
- Each line below that is one call further out. `Hit` was called by line
  28, inside `Report`. And `Report` was called by line 4 of `Program.cs`,
  the program you ran.

If you know Python, this is the other way up from a Python traceback.
.NET puts the line that failed at the top. In Visual Studio, the list can
also have lines from inside .NET itself, above your own, such as
``System.Collections.Generic.List`1.get_Item``. Start from the first line
of your own code.

This time the mistake is on the top line. Grace's list holds two hits, at
positions 0 and 1. The comment says the first hit is number 1, so hit
number 2 is at position 1. But `Hits[number]` asks for position 2, one
past the end. Lines 28 and 4 are fine. They are the route the program took
to reach line 22. Change line 22 to `return Hits[number - 1];`, and run
the program again. It prints `Grace: 1 health. First hit: 4. Last hit: 3.`

Is the mistake always on the top line? In the next class, `Hit` has the
fix, and one number in `Report` has changed. The program under it uses
this version (rule 4: a class written again further down replaces the
earlier one). Run the program, and read the stack trace from the top.

```csharp exec
id: a-bug-two-calls-deep-3
class Character
{
    public string Name;
    public int Health;
    public List<int> Hits = new();

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeHit(int amount)
    {
        Hits.Add(amount);
        Health = Math.Max(0, Health - amount);
    }

    // Players count hits from 1: the first hit is hit number 1.
    public int Hit(int number)
    {
        return Hits[number - 1];
    }

    public string Report()
    {
        string first = $"First hit: {Hit(0)}.";
        string last = $"Last hit: {Hit(Hits.Count)}.";
        return $"{Name}: {Health} health. {first} {last}";
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-4
expect: exception
var grace = new Character("Grace", 8);
grace.TakeHit(4);
grace.TakeHit(3);
Console.WriteLine(grace.Report());
```

The exception is the same, and the line that failed is line 22 again,
inside `Hit`. But `Hit` is the method you just fixed, and it worked for
hit numbers 1 and 2. This time the number came from its caller. Line 27,
in `Report`, asks for hit number 0. Hit numbers start at 1, so `Hit` asks
the list for position -1, and there is no such position. Line 27 is the
line that is responsible. Change `Hit(0)` to `Hit(1)`, and the report
prints again.

A stack trace shows where the program could go no further. The mistake
can be one call further out, in the line that passed in a value. So read a
stack trace from the top, and then ask of each line below it: did this
line give the method above it what that method expects? A class's mistakes
often hide where one method calls another.

What if a method is given a value of a type it does not expect? In this
cell, the program passes Grace's name to `Hit`, where `Hit` expects a
number. When you press Run, one of three things can happen. The program
does not compile, and nothing runs. Or it stops with an exception. Or it
runs. Which one happens here?

```csharp exec
id: a-bug-two-calls-deep-5
expect: CS1503
var grace = new Character("Grace", 8);
grace.TakeHit(4);
Console.WriteLine(grace.Hit(grace.Name));
```

```predict
type: choice

What will happen when you press Run?

- It prints a number.
  - `Hit` returns an `int`. What type is `grace.Name`?
- It stops with an exception.
  - An exception can happen only while a program runs. Did this one start?
- It does not compile, so nothing runs.
```

It does not compile. This cell is meant to fail, so nothing is broken. The
message is `Program.cs(3,29): error CS1503: Argument 1: cannot convert
from 'string' to 'int'`. Every parameter has a type, and the compiler
checks each call against it before the program runs. It names the line
that passed the name, the caller, without running anything. So many
mistakes of this kind never reach a stack trace in C#. What the compiler
can't check is the value itself. 0 and 1 are both `int` values, so
`Hit(0)` compiles. A stack trace shows the mistakes that the compiler
can't find: a value of the type a method expects, which is not the value
you meant.

Finding the mistake that makes a program do something you did not mean,
and fixing it, is called *debugging*.

### Your turn

<div class="dl-world" data-world="game">

Ada loots a chest, and each item should go into her bag. Run the program,
read the stack trace from the top, and find the mistake. Can you fix it?

```csharp exec
id: a-bug-two-calls-deep-6--game
class Character
{
    public string Name;
    public int Health;
    public List<string> Bag;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void PickUp(string item)
    {
        Bag.Add(item);
    }

    public void Loot(List<string> items)
    {
        foreach (string item in items)
        {
            PickUp(item);
        }
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-7--game
expect: exception
var ada = new Character("Ada", 10);
ada.Loot(new List<string> { "rope", "lamp", "key" });
Console.WriteLine(string.Join(", ", ada.Bag));
```

```inputs
ada.Bag
```

```hint
The top line of the stack trace uses `Bag`. What is in `Bag` before the
first item goes in? Which line of the class makes the list?
```

```solution
var ada = new Character("Ada", 10);
ada.Loot(new List<string> { "rope", "lamp", "key" });
Console.WriteLine(string.Join(", ", ada.Bag));

class Character
{
    public string Name;
    public int Health;
    public List<string> Bag = new();   // fixed: each character gets a list of its own

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void PickUp(string item)
    {
        Bag.Add(item);
    }

    public void Loot(List<string> items)
    {
        foreach (string item in items)
        {
            PickUp(item);
        }
    }
}
---
`rope, lamp, key`. The line that failed was `Bag.Add(item);`, but the
mistake was on none of the three lines. `Bag` was declared, and no list was
ever made for it. A field that holds an object starts as `null`, which
means *no object at all*. Nothing can be added to nothing, so the program
stopped with a `NullReferenceException`. `= new();` makes an empty list
each time a character is made.

The compiler warned you about this before the program ran:
`warning CS0649: Field 'Character.Bag' is never assigned to, and will
always have its default value null`. A warning does not stop the program,
but it is worth reading.

This solution has the program first and the class after it, in one cell,
because C# needs the statements to come before the class in a file. Its
class is used in place of the one above (rule 4: a class written again
further down replaces the earlier one).
```

</div>

<div class="dl-world" data-world="solar-system">

Juno burns 3 kg of fuel for each day it travels. It starts with 100 kg, so
after 10 days it should have 70 kg left. `Burn` refuses to burn more fuel
than the probe has: `throw` stops the program with an exception that the
code makes, with a message of its own. Run the program, read the stack
trace from the top, and find the mistake. Can you fix it?

```csharp exec
id: a-bug-two-calls-deep-6--solar-system
class Probe
{
    public string Name;
    public int Fuel;
    public int Rate;   // kg of fuel burned each day

    public Probe(string name, int fuel, int rate)
    {
        Name = name;
        Fuel = fuel;
        Rate = rate;
    }

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            throw new ArgumentException($"{Name} has only {Fuel} kg of fuel, not {kg}.");
        }
        Fuel = Fuel - kg;
    }

    public void Travel(int days)
    {
        Burn(days * Fuel);
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-7--solar-system
expect: exception
var juno = new Probe("Juno", 100, 3);
juno.Travel(10);
Console.WriteLine(juno.Fuel);
```

```inputs
juno.Fuel
```

```hint
The message has two numbers in it. Where does the 1000 come from? Which
line made it?
```

```solution
var juno = new Probe("Juno", 100, 3);
juno.Travel(10);
Console.WriteLine(juno.Fuel);

class Probe
{
    public string Name;
    public int Fuel;
    public int Rate;   // kg of fuel burned each day

    public Probe(string name, int fuel, int rate)
    {
        Name = name;
        Fuel = fuel;
        Rate = rate;
    }

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            throw new ArgumentException($"{Name} has only {Fuel} kg of fuel, not {kg}.");
        }
        Fuel = Fuel - kg;
    }

    public void Travel(int days)
    {
        Burn(days * Rate);   // fixed: the kilograms for each day, not the fuel in the tank
    }
}
---
70 kg. `Burn` did its job: it refused to burn more fuel than Juno has. The
mistake was one call further out, in `Travel`, which multiplied the days
by the fuel in the tank, not by the rate: 10 × 100 is 1000. `Fuel` and
`Rate` are both `int` values, so the compiler could not know which one you
meant.

This solution has the program first and the class after it, in one cell,
because C# needs the statements to come before the class in a file. Its
class is used in place of the one above (rule 4: a class written again
further down replaces the earlier one).
```

</div>

<div class="dl-world" data-world="your-own">

Can you make your own class stop with an exception, on purpose? Give it a
list, and let one method ask another for a position that is not in the
list. Before you run it, which lines do you think the stack trace will
name?

```csharp exec
id: a-bug-two-calls-deep-6--your-own
// My class, with a list, and one method that calls another.
```

```csharp exec
id: a-bug-two-calls-deep-7--your-own
// A program that makes an object and calls the method that calls the other.
```

</div>

## Printing what you need to see

Not every bug stops with an exception. Ada takes three hits of 5. Her
armour blocks 1 point of each hit, so each hit costs her 4 health, and
three hits should leave her at 0. Run the program.

```csharp exec
id: printing-what-you-need-to-see-1
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void TakeHits(List<int> hits)
    {
        foreach (int hit in hits)
        {
            TakeDamage(hit);
            Health = Health + 1;   // the armour blocks 1 point
        }
    }
}
```

```csharp exec
id: printing-what-you-need-to-see-2
var ada = new Character("Ada", 10);
ada.TakeHits(new List<int> { 5, 5, 5 });
Console.WriteLine(ada.Health);
```

```predict
type: choice

What will the program print?

- 0
  - Each hit costs 4, and three hits of 4 are more than 10.
- 1
  - The armour line runs after each hit has landed.
- -2
  - 10 take away three hits of 4 is -2.
```

It prints `1`, and nothing says why. A stack trace can't help, because
nothing stopped. We need to see the health after each hit. Add this line
to `TakeHits` in the class, at the end of the loop, under the armour line.
Then run the program again.

```csharp
            Console.WriteLine($"after a hit of {hit}, health is {Health}");
```

Now we can see each step: 6, then 2, then 1. The first two are what we
expected: 10 take away 4 is 6, and 6 take away 4 is 2. The third step is
the surprise. Health 2 and a hit of 4 should leave 0.

<details class="dl-answer"><summary>Why the third hit leaves 1</summary>

The armour line runs after the hit has landed. For the first two hits,
that makes no difference: taking 5 away and adding 1 is the same as taking
4 away. But the third hit takes the health from 2 to 0, and
`Math.Max(0, ...)` stops it there. Then the armour line adds 1, and Ada is
standing again. The armour should make the hit smaller before it lands:

```csharp
    public void TakeHits(List<int> hits)
    {
        foreach (int hit in hits)
        {
            TakeDamage(hit - 1);   // the armour blocks 1 point
        }
    }
```

</details>

A `Console.WriteLine` inside a method, showing the object's fields at the
moment the method runs, is one of the oldest ways of debugging, and one of
the most used. Delete these lines once you have found the bug. They are
for you, not for the people who use your program. Visual Studio has a tool
that shows the same thing without a change to your code: see
[Where a bigger project lives](#where-a-bigger-project-lives), at the end
of this page.

### Your turn

<div class="dl-world" data-world="game">

Gold is worth 10 points, silver 5, and any other coin 1. Ada collects a
gold, a silver and a copper coin, so she should score 16. Can you print her
score after each coin, find the coin that gives a surprise, and fix it?

```csharp exec
id: printing-what-you-need-to-see-3--game
class Character
{
    public string Name;
    public int Score;

    public Character(string name)
    {
        Name = name;
    }

    public void Collect(List<string> coins)
    {
        foreach (string coin in coins)
        {
            if (coin == "gold")
            {
                Score = Score + 10;
            }
            if (coin == "silver")
            {
                Score = Score + 5;
            }
            else
            {
                Score = Score + 1;
            }
        }
    }
}
```

```csharp exec
id: printing-what-you-need-to-see-4--game
var ada = new Character("Ada");
ada.Collect(new List<string> { "gold", "silver", "copper" });
Console.WriteLine(ada.Score);
```

```inputs
ada.Score
```

```hint
Which coin gives a score you did not expect? For that coin, which of the
`if` lines and the `else` line run?
```

```solution
var ada = new Character("Ada");
ada.Collect(new List<string> { "gold", "silver", "copper" });
Console.WriteLine(ada.Score);

class Character
{
    public string Name;
    public int Score;

    public Character(string name)
    {
        Name = name;
    }

    public void Collect(List<string> coins)
    {
        foreach (string coin in coins)
        {
            if (coin == "gold")
            {
                Score = Score + 10;
            }
            else if (coin == "silver")   // fixed: else if, not a second if
            {
                Score = Score + 5;
            }
            else
            {
                Score = Score + 1;
            }
        }
    }
}
---
16. With two separate `if` statements, the `else` belongs only to the
second one. A gold coin is not silver, so it scored 10 and then 1 more.
`else if` joins the three paths into one choice.
```

</div>

<div class="dl-world" data-world="solar-system">

Jupiter's four big moons are 16,854 km wide, laid side by side. Can you
print `total` inside the loop, find the line that loses the total, and fix
it?

```csharp exec
id: printing-what-you-need-to-see-3--solar-system
class Planet
{
    public string Name;
    public List<int> Moons;   // the width of each moon, in km

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    public int TotalMoonWidth()
    {
        int total = 0;
        foreach (int width in Moons)
        {
            total =+ width;
        }
        return total;
    }
}
```

```csharp exec
id: printing-what-you-need-to-see-4--solar-system
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.TotalMoonWidth());
```

```inputs
jupiter.TotalMoonWidth()
new Planet("Mars", new List<int> { 22, 12 }).TotalMoonWidth()
```

```hint
Print `total` after it changes, inside the loop. Does it ever hold more
than one moon's width at a time? Read the line that changes it one
character at a time.
```

```solution
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.TotalMoonWidth());

class Planet
{
    public string Name;
    public List<int> Moons;   // the width of each moon, in km

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    public int TotalMoonWidth()
    {
        int total = 0;
        foreach (int width in Moons)
        {
            total += width;   // fixed: +=, not =+
        }
        return total;
    }
}
---
16854. `total =+ width;` is not `total += width;`. C# reads it as
`total = +width;`: store the width, with a plus sign in front of it. That
is a line C# accepts, so nothing warned you. Each repeat stored one moon's
width in place of the total, so only the last moon was left: 4821. The loop
did exactly what it was told.
```

</div>

<div class="dl-world" data-world="your-own">

Can you add a `Console.WriteLine` to one method of your class, showing its
fields at the moment the method runs? Call the method two or three times
from the program. Does every field change the way you expected?

```csharp exec
id: printing-what-you-need-to-see-3--your-own
// My class, with a Console.WriteLine inside one method.
```

```csharp exec
id: printing-what-you-need-to-see-4--your-own
// A program that calls that method two or three times.
```

</div>

## What the editor already knows

The page you are reading is a small *development environment*: the set of
tools around your code. It gives you an editor to write in, a compiler
that checks the code before it runs, a way to run it and see what
happened, and the stack traces that help you find why it stopped.

Visual Studio is a much larger one. It is an *integrated development
environment*, or *IDE*: an editor that reads your code as you write it,
and helps. Let's try some of what it can do, with the class from the start
of this page, fixed.

1. Download the program cell below as a Visual Studio project, and open it
   in Visual Studio.
2. In `Program.cs`, click at the end of the last line, and press Enter.
   Type `grace` and a dot. What appears before you type anything more?
3. Use the arrow keys to choose `Hit`, and press Tab to finish the word.
4. Now type an opening bracket, `(`. What does Visual Studio show you?

```csharp exec
id: what-the-editor-already-knows-1
class Character
{
    public string Name;
    public int Health;
    public List<int> Hits = new();

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeHit(int amount)
    {
        Hits.Add(amount);
        Health = Math.Max(0, Health - amount);
    }

    // Players count hits from 1: the first hit is hit number 1.
    public int Hit(int number)
    {
        return Hits[number - 1];
    }

    public string Report()
    {
        string first = $"First hit: {Hit(1)}.";
        string last = $"Last hit: {Hit(Hits.Count)}.";
        return $"{Name}: {Health} health. {first} {last}";
    }
}
```

```csharp exec
id: what-the-editor-already-knows-2
var grace = new Character("Grace", 8);
grace.TakeHit(4);
grace.TakeHit(3);
Console.WriteLine(grace.Report());
```

As soon as you type the dot, a list appears with Grace's fields and
methods in it: `Name`, `Health`, `Hits`, `TakeHit`, `Hit` and `Report`,
and a few that every object has, such as `ToString` and `Equals`. This is
called *autocomplete*: the editor offers to finish a name for you. Visual
Studio calls it IntelliSense. When you type the bracket, Visual Studio
shows the first line of `Hit`: `int Character.Hit(int number)`. That is
the type it returns, its name, and the parameter it expects. It answers
the question a stack trace asks, *what does this method expect?*, before
you have written the call. (A later page,
[Documenting a class](lesson:documenting-a-class), adds a description that
appears here too.)

Neither of those needed the program to run. Visual Studio knew, because
`grace` is a `Character`, and the class says what a `Character` has. It
reads your code as the compiler does. Try one more thing: finish the line
as `Console.WriteLine(grace.Hit("first"));`. A red wavy line appears under
`"first"` before you run anything, with the same CS1503 message that this
page showed you.

## Where a bigger project lives

The cells on a page like this one are small, and each Run is a new
program. A real project is much bigger. It has many files, with a class in
each, and you change it over many weeks. The project you downloaded is the
start of one. Three parts of Visual Studio help most.

- **Solution Explorer** lists the project's files. The project you
  downloaded has `Program.cs`, from the program cell, and `Character.cs`,
  from the class cell above it. Each class on these pages has a cell of its
  own for the same reason that each class in a project has a file of its
  own. All the files in a project are compiled together into one program,
  as the cells above a program cell are here.
- **Breakpoints** pause a program while it runs. A *breakpoint* is a mark
  on a line: the program pauses just before that line runs. In
  `Character.cs`, click in the grey margin to the left of
  `Hits.Add(amount);`, and a red dot appears. Press F5 to start the
  program. It pauses there each time `TakeHit` runs: twice, for Grace's two
  hits. While it waits, the **Locals** window lists every variable in the
  method, and `this`, the object the method was called on, with all its
  fields. Press F10 to run one line, F11 to follow a call into the method
  it calls, and F5 to continue. The **Call Stack** window shows the list of
  calls that are running, as a stack trace does. A breakpoint shows what a
  `Console.WriteLine` would, with nothing added to your code.
- **Stop Debugging**, the red square, or Shift+F5, ends a program at once,
  even one in a loop that never ends. You do not have to wait for it, or
  close Visual Studio. On this page, **Run** becomes **Stop** while a
  program runs, and does the same.

The project you downloaded has one setting that a new Visual Studio
project does not. A setting called *nullable reference types* is off in
it, as it is on these pages. A new project has it on, and then the
compiler warns about more fields that could be `null`, such as a list
field that no constructor makes (CS8618).

## Looking back

The stack trace at the top of this page named three lines, and the mistake
was on the top one. In the second, the line that failed was the same, and
the mistake was one line further down, in the method that called it. And
some mistakes never reach a stack trace at all, because the compiler finds
them first. When a stack trace names several lines, how will you decide
which one to change?

A challenge: this probe has fuel for three photos, at 1 kg each. It has two
bugs. One stops the program with an exception, and one does not. Can you
find both, and make it report 3 photos and 0 kg left?

```csharp challenge
var voyager = new Probe("Voyager", 3);
foreach (string target in new List<string> { "Jupiter", "Io", "Europa", "Saturn", "Titan" })
{
    voyager.Photograph(target);
}
Console.WriteLine(voyager.Report());

class Probe
{
    public string Name;
    public int Fuel;
    public List<string> Photos;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Photograph(string target)
    {
        if (Fuel > 0)
        {
            Photos.Add(target);
            Burn(1);
        }
    }

    public void Burn(int kg)
    {
        int fuel = Math.Max(0, Fuel - kg);
    }

    public string Report()
    {
        return $"{Name}: {Photos.Count} photos, {Fuel} kg left";
    }
}
```

Next, [Encapsulation: keeping an object's data behind its methods](lesson:keeping-details-inside-an-object)
puts the rules about an object's data in one place, where every caller
meets them.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Debugging code for absolute beginners*. Microsoft Learn.
<https://learn.microsoft.com/en-us/visualstudio/debugger/debugging-absolute-beginners>.
This article starts with two questions: what did you expect your code to
do, and what happened? Then it uses breakpoints to find two bugs in a
small C# program.

Microsoft. *Tutorial: Debug C# code and inspect data*. Microsoft Learn.
<https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-debugger>.
This tutorial places breakpoints, runs a program one line at a time, and
reads the Locals and Call Stack windows. The sample programs in both are
written in an older style, with a `static void Main` in a class. They run
in the same way.
