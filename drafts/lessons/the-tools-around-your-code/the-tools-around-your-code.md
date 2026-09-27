---
title: "Visual Studio: the tools around your code"
version: 2026.09.27.1
from: the-tools-around-your-code
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO5, FOOP-LO10]
---

# Visual Studio: the tools around your code

Ada attacks Grace. The first cell below is the class `Character`, and the
program in the second cell should print Grace's health after the hit. The
attack uses three lines: the program calls `Attack`, `Attack` calls
`TakeDamage`, and `TakeDamage` changes Grace's health.

One line of the class has a slip in it, on purpose, so both cells are
meant to fail. Before you run the program, make a guess.

```csharp exec
id: a-bug-two-calls-deep-1
file: Character.cs
expect: CS0103
class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Helth - amount);
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Strength);
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-1-program
expect: CS0103
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
Console.WriteLine(grace.Health);
```

```predict
type: choice

When you press Run, which line do you think C# will name?

- Line 3 of the program: `ada.Attack(grace);`
  - The attack starts on this line.
- Line 21 of the class: `other.TakeDamage(Strength);`
  - This is where one method calls the other.
- Line 16 of the class: `Health = Math.Max(0, Helth - amount);`
  - The slip is on this line.
```

## A bug two calls deep

The program does not compile, so nothing ran, not even the attack. The
message is:

```console
Character.cs(16,30): error CS0103: The name 'Helth' does not exist in the current context
```

It names one line, line 16 of `Character.cs`, and that is the line with the
slip. Before C# runs a program, it reads all of it and checks it: every
method of every class, whether or not anything calls the method. So the
compiler does not follow the route from the program to `TakeDamage`. It
names the line where it found the problem. If you know Python: there, this
program would run until it reached the slip, and then list all three lines.

In the class, change `Helth` to `Health`, and run the program again. Grace
ends with 4 health.

Does C# always name the line with the mistake? In the next cells, the
class is written again with `Helth` fixed, and one word in `Attack` has
changed. The program below it uses this version (rule 4: a class written
again further down replaces the earlier one). Both cells are meant to fail.
Run the program.

```csharp exec
id: a-bug-two-calls-deep-2
file: Character.cs
expect: CS1503
class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Name);
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-2-program
expect: CS1503
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
Console.WriteLine(grace.Health);
```

The message is `Character.cs(21,26): error CS1503: Argument 1: cannot
convert from 'string' to 'int'`. `TakeDamage` is the same as before, and it
worked then. The mistake is in the call to it, on line 21: `Attack` passes
`Name`, which is text, where `TakeDamage` expects a whole number. Every
parameter has a type, and the compiler checks each call against it before
the program runs. So the message names the caller's line, and that is the
line with the mistake. Change `Name` to `Strength`, and Grace ends with 4
health again.

The compiler finds many slips inside a class in this way, before anything
runs. Here are four, with what it says about each.

| The slip | The line | What the compiler says |
|---|---|---|
| a name spelt differently from the field | `Health = Math.Max(0, Helth - amount);` | CS0103: The name 'Helth' does not exist in the current context |
| text where a number was expected | `other.TakeDamage(Name);` | CS1503: Argument 1: cannot convert from 'string' to 'int' |
| a method that a list does not have | `Bag.add(item);` | CS1061: 'List<string>' does not contain a definition for 'add' … |
| two values for a method that takes one | `Burn(days, Rate);` | CS1501: No overload for method 'Burn' takes 2 arguments |

A list's method is `Add`, with a capital letter, as .NET's methods are.
*Overload* is C#'s word for one of several methods that share a name. A
later page gives a class two of them. Here the message means that no
method called `Burn` takes two values.

Each message names the line with the mistake. The bugs that are left for
the running program to find are of another kind: a value of the type the
method expects, which is not the value you meant. Or no value at all.

### A bug the compiler cannot see

Ada loots a chest, and each item should go into her bag. `Loot` calls
`PickUp` for each item, and `PickUp` adds the item to the list `Bag`. Every
name here exists, and every value has the type its method expects.

```csharp exec
id: a-bug-the-compiler-cannot-see-1
file: Character.cs
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
id: a-bug-the-compiler-cannot-see-1-program
expect: exception
var ada = new Character("Ada", 10);
ada.Loot(new List<string> { "rope", "lamp", "key" });
Console.WriteLine(string.Join(", ", ada.Bag));
```

```predict
type: choice

What will happen when you press Run?

- It prints `rope, lamp, key`.
  - `Loot` passes each item to `PickUp`, and `PickUp` adds it to the bag.
- It does not compile.
  - Something in the class is missing.
- It stops with an exception.
  - It runs until it reaches a line that it cannot complete.
```

It compiles, with a warning, and then it stops with an exception. This
program is meant to fail too. What it shows is an *exception report*, and
it has two parts.

- The name of the exception, and a message that says what happened:
  `System.NullReferenceException: Object reference not set to an instance
  of an object.`
- A list of the calls that were running when the program stopped, the
  most recent first. Each one names a file, a line and a method:
  1. line 15 of `Character.cs`, in `PickUp`: `Bag.Add(item);`
  2. line 22 of `Character.cs`, in `Loot`: `PickUp(item);`
  3. line 2 of `Program.cs`: `ada.Loot(new List<string> { "rope", "lamp", "key" });`

Visual Studio and Microsoft's documentation call this list a *stack
trace*. Read it from the top. The first line is where the program could go
no further: line 15, `Bag.Add(item);`. This is *the line that failed*.
Each line below it is one call further out. `PickUp` was called by line 22,
in `Loot`, and `Loot` was called by line 2 of the program. Those two lines
are the route the program took to reach line 15.

If you know Python, this list is in the opposite order to a traceback:
.NET puts the most recent call first. In Visual Studio, the list can also
start with lines from inside .NET itself. Start from the first line that
names a file of yours.

Which of the three lines would you change? Choose one, and then read the
next part.

<details class="dl-answer"><summary>which line</summary>

None of the three. Look at the values that line 15 uses, and ask where
each one came from.

- `item` is a parameter, so its value came from the caller. Line 22 gave
  `PickUp` one item, a string, which is what `PickUp` expects.
- `Bag` is a field, so its value comes from the class: from the line that
  declares it, or from the constructor. Neither of them gives it a list.

A field that can hold an object, such as a list, starts as `null`, which
means *no object at all*. `public List<string> Bag;` says that a character
has a bag. It does not make one. So `Bag.Add(item)` asks a list that does
not exist to add an item, and C# stops with a `NullReferenceException`.

The compiler warned you about this one. Look at the warning that came
with the exception: `warning CS0649: Field 'Character.Bag' is never
assigned to, and will always have its default value null`. A warning does
not stop the program, but it often points at a mistake.

To give each character a list of its own when it is made, change the
field's line in the class to `public List<string> Bag = new();`. Then run
the program again. It prints `rope, lamp, key`.

</details>

An exception report shows where the program could go no further. The
mistake can be on that line. It can be one call further out, in the line
that passed a value in. Or it can be where a field got its value, or never
got one. So read the report from the top, and then ask of each value on
the line that failed: where did this value come from?

Finding the mistake that makes a program do something you did not mean,
and fixing it, is called *debugging*.

### Your turn

Each task below is a class and a program that stops with an exception.
Each solution is one program: the statements first, and then the class
written again, because in one file C# needs the statements before any
class. The class in the solution replaces the one in the cell above
(rule 4).

<div class="dl-world" data-world="game">

Ada puts a rope, a lamp and a sword in her bag. Then `EquipLast` should
make her hold the last thing she put in: the sword. Run the program, read
the exception report from the top, and find the mistake. Can you fix it?

```csharp exec
id: a-bug-two-calls-deep-3--game
file: Character.cs
class Character
{
    public string Name;
    public List<string> Bag = new();
    public string Weapon = "bare hands";

    public Character(string name)
    {
        Name = name;
    }

    public void PickUp(string item)
    {
        Bag.Add(item);
    }

    public void Equip(int position)
    {
        Weapon = Bag[position];
    }

    public void EquipLast()
    {
        Equip(Bag.Count);
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-3-program--game
expect: exception
var ada = new Character("Ada");
ada.PickUp("rope");
ada.PickUp("lamp");
ada.PickUp("sword");
ada.EquipLast();
Console.WriteLine($"{ada.Name} holds the {ada.Weapon}.");
```

```inputs
ada.Weapon
```

```hint
The line that failed asks the bag for a position. How many items are in
the bag, and what are their positions? Which line chose the position?
```

```solution
var ada = new Character("Ada");
ada.PickUp("rope");
ada.PickUp("lamp");
ada.PickUp("sword");
ada.EquipLast();
Console.WriteLine($"{ada.Name} holds the {ada.Weapon}.");

class Character
{
    public string Name;
    public List<string> Bag = new();
    public string Weapon = "bare hands";

    public Character(string name)
    {
        Name = name;
    }

    public void PickUp(string item)
    {
        Bag.Add(item);
    }

    public void Equip(int position)
    {
        Weapon = Bag[position];
    }

    public void EquipLast()
    {
        Equip(Bag.Count - 1);   // the last item is one before the count
    }
}
---
The bag holds three items, at positions 0, 1 and 2. `Bag.Count` is 3, one
past the last position. The exception was an
`ArgumentOutOfRangeException`: a position that the list does not have.
`Equip` did what it was asked. The mistake was one call further out, in
`EquipLast`, the second line of the report.
```

</div>

<div class="dl-world" data-world="solar-system">

Voyager 2 is the only probe that has visited all four giant planets:
Jupiter, Saturn, Uranus and Neptune. `Fly(4)` should name the four, and
then stop. Run the program, read the exception report from the top, and
find the mistake. Can you fix it?

```csharp exec
id: a-bug-two-calls-deep-3--solar-system
file: Probe.cs
class Probe
{
    public string Name;
    public List<string> Route;
    public int Visited = 0;

    public Probe(string name, List<string> route)
    {
        Name = name;
        Route = route;
    }

    public string NextPlanet()
    {
        string planet = Route[Visited];
        Visited = Visited + 1;
        return planet;
    }

    public void Fly(int planets)
    {
        for (int i = 0; i <= planets; i++)
        {
            Console.WriteLine($"{Name} passes {NextPlanet()}.");
        }
    }
}
```

```csharp exec
id: a-bug-two-calls-deep-3-program--solar-system
expect: exception
var voyager = new Probe("Voyager 2", new List<string> { "Jupiter", "Saturn", "Uranus", "Neptune" });
voyager.Fly(4);
Console.WriteLine($"{voyager.Name} has passed {voyager.Visited} planets.");
```

```inputs
voyager.Visited
```

```hint
The program named four planets, and then it stopped. How many times does
the loop in `Fly` repeat when `planets` is 4? Count the values that `i`
takes.
```

```solution
var voyager = new Probe("Voyager 2", new List<string> { "Jupiter", "Saturn", "Uranus", "Neptune" });
voyager.Fly(4);
Console.WriteLine($"{voyager.Name} has passed {voyager.Visited} planets.");

class Probe
{
    public string Name;
    public List<string> Route;
    public int Visited = 0;

    public Probe(string name, List<string> route)
    {
        Name = name;
        Route = route;
    }

    public string NextPlanet()
    {
        string planet = Route[Visited];
        Visited = Visited + 1;
        return planet;
    }

    public void Fly(int planets)
    {
        for (int i = 0; i < planets; i++)   // < and not <=: one repeat for each planet
        {
            Console.WriteLine($"{Name} passes {NextPlanet()}.");
        }
    }
}
---
With `i <= planets`, the loop repeats for `i` = 0, 1, 2, 3 and 4: five
times for four planets. The fifth call to `NextPlanet` asked the route for
position 4, one past the last position, and that is an
`ArgumentOutOfRangeException`. `NextPlanet` did what it was asked. The
mistake was in `Fly`, on the `for` line, two lines above the line that the
report names.
```

</div>

<div class="dl-world" data-world="your-own">

Can you make a class of your own stop with an exception two calls deep, on
purpose? Give it a list, and let one method call another with a position
that is not in the list. Before you run it, which lines do you think the
report will name?

```csharp exec
id: a-bug-two-calls-deep-3--your-own
// My class, with a list, and one method that calls another.
```

```csharp exec
id: a-bug-two-calls-deep-3-program--your-own
// A program that makes an object and calls the method that calls the other.
```

</div>

## Printing what you need to see

Not every bug stops the program. Ada takes three hits of 5. Her armour
blocks 1 point of each hit, so each hit costs her 4 health, and three hits
should leave her at 0.

```csharp exec
id: printing-what-you-need-to-see-1
file: Character.cs
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
id: printing-what-you-need-to-see-1-program
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
  - The armour line runs after each hit.
- -2
  - 10 minus three hits of 4 is -2.
```

It prints `1`, and nothing says why. An exception report can't help,
because nothing stopped. We need to see the health after each hit. Add
this line to `TakeHits` in the class, at the end of the loop, under the
armour line. Then run the program again.

```csharp
            Console.WriteLine($"after a hit of {hit}, health is {Health}");
```

Now we can see each step: 6, then 2, then 1. The first two are what we
expected: 10 minus 4 is 6, and 6 minus 4 is 2. The third step is the
surprise. Health 2 and a hit of 4 should leave 0.

<details class="dl-answer"><summary>Why the third hit leaves 1</summary>

The armour line runs after the hit. For the first two hits, that makes no
difference: subtracting 5 and adding 1 is the same as subtracting 4. But
the third hit takes the health from 2 to 0, and `Math.Max(0, ...)` stops it
there. Then the armour line adds 1, and Ada is standing again. The armour
should make the hit smaller before the damage is taken:

```csharp
    public void TakeHits(List<int> hits)
    {
        foreach (int hit in hits)
        {
            TakeDamage(hit - 1);   // the armour blocks 1 point
        }
    }
```

With this version, three hits leave Ada at 0.

</details>

A `Console.WriteLine` inside a method, showing the object's fields at the
moment the method runs, is one of the oldest ways of debugging, and one of
the most used. Delete these lines once you have found the bug. They are
for you, not for the people who use your program. Visual Studio can show
the same values without a change to your code, and the end of this page
shows how.

### Your turn

<div class="dl-world" data-world="game">

Gold is worth 10 points, silver 5, and any other coin 1. Ada collects a
gold, a silver and a copper coin, so she should score 16. Can you print her
score after each coin, find the coin that gives a surprise, and fix it?

```csharp exec
id: printing-what-you-need-to-see-2--game
file: Character.cs
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
id: printing-what-you-need-to-see-2-program--game
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
            else if (coin == "silver")   // else if: one choice, not two
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
With two separate `if` statements, the `else` belongs only to the second
one. A gold coin is not silver, so it scored 10 and then 1 more. `else if`
joins the three paths into one choice.
```

</div>

<div class="dl-world" data-world="solar-system">

Jupiter's four big moons are 16,854 km wide, laid side by side. Can you
print `total` inside the loop, find the line that loses the total, and fix
it?

```csharp exec
id: printing-what-you-need-to-see-2--solar-system
file: Planet.cs
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
id: printing-what-you-need-to-see-2-program--solar-system
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.TotalMoonWidth());
```

```inputs
jupiter.TotalMoonWidth()
new Planet("Mars", new List<int> { 22, 12 }).TotalMoonWidth()
```

```hint
Print `total` inside the loop, after the line that changes it. Does it
ever hold more than one moon's width at a time? Read that line one
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
            total += width;   // +=, and not =+
        }
        return total;
    }
}
---
`total =+ width;` is not `total += width;`. C# reads it as
`total = +width;`: store the width, with a plus sign in front of it. C#
accepts that line, so nothing warned you. Each repeat stored one moon's
width in place of the total, so only the last moon's width was left. The
loop did exactly what it was told.
```

</div>

<div class="dl-world" data-world="your-own">

Can you add a `Console.WriteLine` to one method of your class, showing its
fields at the moment the method runs? Call the method two or three times
from the program. Does every field change the way you expected?

```csharp exec
id: printing-what-you-need-to-see-2--your-own
// My class, with a Console.WriteLine inside one method.
```

```csharp exec
id: printing-what-you-need-to-see-2-program--your-own
// A program that calls that method two or three times.
```

</div>

## Where a bigger project lives

The page you are reading is a small *development environment*: the set of
tools around your code. It has an editor to write in, a compiler that
checks the code, a way to run the code and see what happened, and
exception reports that show where a program stopped.

A real project is bigger. It has many files, with a class in each, and you
change it over many weeks. It lives in a larger development environment,
such as Visual Studio. Visual Studio is an *integrated development
environment*, or *IDE*: one program that holds an editor, the compiler, a
way to run your code and a debugger. A *debugger* is a tool that pauses a
program while it runs, so that you can look at its values.

You need a computer with Visual Studio for the rest of this page. If you
are not at one now, this is a good place to stop, and to return to later.

### A cell as a project

Here are Ada and Grace again, with the slips fixed. This time, Ada attacks
Grace twice, and Grace attacks Ada once. Run the program here first.

```csharp exec
id: where-a-bigger-project-lives-1
file: Character.cs
class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Strength);
    }
}
```

```csharp exec
id: where-a-bigger-project-lives-1-program
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
grace.Attack(ada);
ada.Attack(grace);
Console.WriteLine($"{ada.Name}: {ada.Health} health");
Console.WriteLine($"{grace.Name}: {grace.Health} health");
```

It prints `Ada: 7 health` and `Grace: 0 health`. Now open the same program
in Visual Studio.

1. Download the program cell as a Visual Studio project. Unzip the folder
   that you download.
2. In Visual Studio, choose **File**, then **Open**, then
   **Project/Solution**, and choose the file that ends in `.csproj` in
   that folder.
3. Find **Solution Explorer**, the panel that lists the project's files.
   If you can't see it, choose **View**, then **Solution Explorer**. It
   lists `Program.cs`, from the program cell, and `Character.cs`, from the
   class cell. Double-click a file to open it.
4. Press Ctrl+F5 to run the program. A console window opens, and it shows
   the same two lines as the page. Press a key to close it.

All the `.cs` files in a project are compiled together into one program,
in the same way as the cells above a program cell on this page. That is why
each class on these pages has a cell of its own: in a project, each class
has a file of its own.

### What the editor already knows

The editor on these pages holds your code, and the page compiles it when
you press Run. Visual Studio's editor also reads your code while you type.
In `Program.cs`, click at the end of the last line, and press Enter. Then
try these steps, one at a time.

1. Type `grace` and a dot. What appears before you type anything more?
2. Use the arrow keys to choose `TakeDamage`, and press Tab to finish the
   word.
3. Type an opening bracket, `(`. What does Visual Studio show you now?
4. Rest the mouse pointer on `Attack`, on line 3. What appears?
5. Click in the word `Attack`, and press F12.

As soon as you type the dot, a list appears with Grace's fields and
methods in it: `Attack`, `Health`, `Name`, `Strength` and `TakeDamage`, and
a few that every object has, such as `ToString`. This is *autocomplete*:
the editor offers to finish a name for you. Visual Studio calls it
IntelliSense. When you type the bracket, it shows the method's first line:
`void Character.TakeDamage(int amount)`. That is the type the method
returns (`void`, which means nothing), its class and its name, and the
parameter it expects. It answers a question that debugging often asks, *what does
this method expect?*, before you have finished the call. Resting the
pointer on a name shows the same kind of line for that name. F12 goes to
the definition: Visual Studio opens `Character.cs` at the line where
`Attack` is written.

None of this needed the program to run. Visual Studio knew, because
`grace` is a `Character`, and the class says what a `Character` has. It
reads your code as the compiler does, all the time, as you type.

So a compiler error appears before you run anything. Finish the line as
`grace.TakeDamage("lots");`. A red wavy line appears under `"lots"`. Choose
**View**, then **Error List**. The list has the same message as the second
program on this page, CS1503: Argument 1: cannot convert from 'string' to
'int', with its file and its line. Double-click the message, and Visual
Studio takes you to the line. Delete the line before you continue.

### A class in a file of its own

Now add a second class to the project, in a file of its own.

1. In Solution Explorer, right-click the project's name, and choose
   **Add**, then **Class**.
2. Name it `Potion.cs`, and choose **Add**. Visual Studio makes the file
   and opens it.
3. Visual Studio starts the file with a `namespace` line, which puts the
   class in a named group. A later page is about namespaces. For now,
   replace everything in the file with this class:

   ```csharp
   class Potion
   {
       public int Strength;

       public Potion(int strength)
       {
           Strength = strength;
       }

       public void Heal(Character who)
       {
           who.Health = who.Health + Strength;
       }
   }
   ```

4. At the end of `Program.cs`, add these three lines, and press Ctrl+F5.

   ```csharp
   var potion = new Potion(5);
   potion.Heal(grace);
   Console.WriteLine($"{grace.Name}: {grace.Health} health");
   ```

The last line prints `Grace: 5 health`. `Program.cs` uses `Potion`, and
`Potion` uses `Character`: one program, in three files.

### Watching the program run

A `Console.WriteLine` shows a value at one moment, and only the value you
chose to print. The debugger can pause the program at any line, and show
every value at that moment, with nothing added to your code.

1. In `Character.cs`, find the line inside `TakeDamage`. Click in the grey
   margin to the left of that line. A red dot appears. This is a
   *breakpoint*: a mark on a line where the program pauses, just before
   the line runs. (F9 adds or removes a breakpoint on the line where the
   cursor is.)
2. Press F5 to start the program with the debugger. The program pauses at
   the breakpoint, and a yellow arrow points at the line that runs next.
3. Look at the **Locals** window. If it is not on the screen, choose
   **Debug**, then **Windows**, then **Locals**. It lists the variables of
   the method that is running: `amount`, and `this`, the character that is
   taking the damage. Select the small arrow beside `this` to see its
   fields. Whose health is it, and how much is it?
4. Press F10 to run one line. This is called *stepping*. Look at `Health`
   under `this` again. What changed?
5. Look at the **Call Stack** window (**Debug**, then **Windows**, then
   **Call Stack**). It lists the calls that are running, the most recent at
   the top: `TakeDamage`, then `Attack`, then the program. It is the same
   list as in an exception report, while the program is still running.
6. Press F5 to continue. The program pauses at the breakpoint once for
   each attack. Which character is `this` each time?
7. To end the program at any moment, press Shift+F5, or select the red
   square: this is **Stop Debugging**.

<details class="dl-answer"><summary>what the debugger shows</summary>

The first time the program pauses, `this` is Grace, with 8 health, and
`amount` is 4. After F10, her health is 4. The second pause is Ada, taking
Grace's 3, and the third is Grace again.

</details>

F10 runs the whole line, with any method that the line calls. F11 is
different when the line calls a method: it pauses at the first line inside
that method, so that you can follow the call.

**Stop** on this page does the same as Stop Debugging: **Run** becomes
**Stop** while a program runs. A loop that never ends is the usual reason
to press it.

### Main, in older programs

When you make a new project in Visual Studio, choose **Console App**. The
last page before the project is made, **Additional information**, has a
box called **Do not use top-level statements**. Leave it clear, to match
these pages. If you tick it, `Program.cs` starts like this:

```csharp
namespace ConsoleApp1;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
```

This is the older way to write a C# program, and you will meet it in books
and in many examples, including both of Microsoft's pages at the end of
this one. `Main` is the method where a program starts: C# runs it first.
`static` means that it belongs to the class itself, so no object has to be
made before it runs. `string[] args` holds any words typed after the
program's name when someone starts it from a command line, a window where
you type commands. And `namespace ConsoleApp1;` puts the class in a
namespace named after the project.

The cells on these pages hold *top-level statements*: the lines of a
program, with no `Main` written around them. C# writes the class and its
`Main` for you, and puts your lines inside `Main`. The two forms make the
same program. That is also why no class on these pages is called
`Program`: C# already uses that name for the class it writes. And a cell
with a `Main` of its own is a program of its own (rule 5: `Main` stays in
its cell).

One more setting differs. The project you downloaded has *nullable
reference types* off, as these pages have. A new project from Visual
Studio's template has them on, with the line `<Nullable>enable</Nullable>`
in its `.csproj` file. With the setting on, the compiler warns about more
fields that could be `null`. The first `Bag` on this page, which no line
ever gave a list, would also give warning CS8618. Warnings do not stop a
program from running.

## Looking back

The first message on this page named the line with the slip, and the
second named the line that passed text where a number was expected. The
compiler found both before anything ran. The exception report for Ada's
bag named three lines, and the mistake was on none of them. When a report
names several lines, how will you decide which one to change?

A challenge: this probe has fuel for three photos, at 1 kg each. It has
two bugs. One stops it from compiling. The other lets it run and print a
report that is not what you expect. Can you find both, and make it report
3 photos and 0 kg left? In one file, C# needs the program's statements
before any class, so the class comes last here.

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
    public List<string> Photos = new();

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
        return $"{Name}: {Photo.Count} photos, {Fuel} kg left";
    }
}
```

The [practice page](lesson:the-tools-around-your-code-practice) has more
problems on compiler messages, exception reports, printing what you need
to see and Visual Studio, and three from earlier pages.

Next, [Encapsulation: private fields, public methods and properties](lesson:keeping-details-inside-an-object)
puts the rules about an object's data in one place, where every caller
meets them.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Debugging code for absolute beginners*. Microsoft Learn.
<https://learn.microsoft.com/en-us/visualstudio/debugger/debugging-absolute-beginners>.
This article starts with two questions: what did you expect your code to
do, and what happened instead? Then it uses breakpoints and stepping to
find several bugs in a small C# program.

Microsoft. *Tutorial: Debug C# code and inspect data*. Microsoft Learn.
<https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-debugger>.
This tutorial places breakpoints, runs a program one line at a time, and
reads the Locals and Call Stack windows. Both pages write their programs
with a `static void Main`, the older form above. They run in the same way.
