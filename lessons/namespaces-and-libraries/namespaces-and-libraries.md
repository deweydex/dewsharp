---
title: "Namespaces and class libraries: code from other files and other people"
version: 2026.09.29.1
from: the-tools-around-your-code
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO4, FOOP-LO5, FOOP-LO6]
---

# Namespaces and class libraries: code from other files and other people

Here is a short program that rolls three dice. Before you run it, read it.
Which names does the program make for itself, and which ones did somebody
else write?

```csharp exec
id: classes-you-did-not-write-1
var dice = new Random(42);
var rolls = new List<int>();
for (int i = 0; i < 3; i++)
{
    rolls.Add(dice.Next(1, 7));
}
int best = Math.Max(rolls[0], Math.Max(rolls[1], rolls[2]));
Console.WriteLine($"You rolled {string.Join(", ", rolls)}. Your best is {best}.");
```

It prints `You rolled 5, 1, 1. Your best is 5.` The 42 is a *seed*: with
the same seed, `Random` gives the same numbers on every run, so this page
can say what the program prints.

The program has four names of its own: `dice`, `rolls`, `i` and `best`.
Somebody else wrote every other name in it. `Random`, `List`, `Math`,
`Console` and `string` are types, and `Next`, `Add`, `Max`, `Join` and
`WriteLine` are their methods. The people who make .NET wrote them, and
every C# program can use them. Every program on these pages has used them,
from its first `Console.WriteLine`.

A *class library* is a collection of classes, and other types, that
somebody wrote for other programs to use. .NET comes with a very large one.
This page asks two questions about it. How does your program find a class
that somebody else wrote? And how can other programs use the classes that
you write? A *namespace*, a named group of types, answers the first
question, and a class library of your own answers the second.

## A type the compiler cannot find

How many different orders can a pack of 52 playing cards be in? The first
card can be any of the 52, the second any of the 51 that are left, and so
on to the last card: 52 × 51 × 50 × ... × 1. That number is too large for
every whole-number type on
[Types and their sizes](lesson:types-and-their-sizes). .NET has a type for
whole numbers with as many digits as they need: `BigInteger`.

The next cell uses it, and it is meant not to compile. Run it, and read
the message.

```csharp exec
id: a-type-the-compiler-cannot-find-1
expect: CS0246
BigInteger orders = 1;
for (int card = 1; card <= 52; card++)
{
    orders = orders * card;
}
Console.WriteLine(orders);
```

It did not compile:

```console
Program.cs(1,1): error CS0246: The type or namespace name 'BigInteger' could not be found (are you missing a using directive or an assembly reference?)
```

[Compiler errors](lesson:compiler-errors) showed this message for `Int`,
with a capital I, a name spelt in another way. Here, `BigInteger` is spelt
exactly as .NET spells it, and the compiler still cannot find it. The
question at the end of the message gives two other reasons: a missing
*using directive*, or a missing *assembly reference*. This time the reason
is the first one. The second one comes further down this page.

`BigInteger` is in a namespace called `System.Numerics`. A *namespace* is a
named group of types. .NET has very many types, and its namespaces put
them in groups, by what they are for: `System.Numerics` holds types for
numbers, and `System.IO` holds types for files and folders. A *using
directive*, or *using line*, is a line at the top of a file: the word
`using`, and the name of a namespace. It lets the code in that file name
the types in that namespace by their short names, such as `BigInteger`.
On these pages, each cell is a file of its own, so a using line works in
its own cell.

Here is the program with a using line at the top, and two more lines at
the end.

```csharp exec
id: a-type-the-compiler-cannot-find-2
using System.Numerics;

BigInteger orders = 1;
for (int card = 1; card <= 52; card++)
{
    orders = orders * card;
}
Console.WriteLine(orders);
Console.WriteLine($"{orders.ToString().Length} digits");
Console.WriteLine($"The largest long: {long.MaxValue}");
```

A pack of 52 cards can be in
80658175170943878571660636856403766975289505440883277824000000000000
orders, a number with 68 digits. The largest `long`, the largest type in
the table on that page, is 9223372036854775807. A `BigInteger` works with
`*`, `=` and `Console.WriteLine` as an `int` does.

A using line comes first in its file, before the statements and before any
class. What happens if it comes last? Move `using System.Numerics;` to the
end of the cell, and run it. Which message comes first, and what does the
second one say?

<details class="dl-answer"><summary>what the two messages say</summary>

The first message is CS0246 for `BigInteger` again, on line 1: a using line
in the wrong place does not work at all. The second is CS1529, on
the last line: *A using clause must precede all other elements defined in
the namespace except extern alias declarations*. *Precede* means *come
before*. A using line must come before everything else in its file.

</details>

## The using lines you do not see

Why did the program with the dice need no using line for `Random`,
`List` or `Console`? It had using lines, and you cannot see them. Every
cell on these pages has seven using lines before its first line, and a new
console project in Visual Studio has the same seven. Written out, they
look like this:

```csharp
global using System;
global using System.Collections.Generic;
global using System.IO;
global using System.Linq;
global using System.Net.Http;
global using System.Threading;
global using System.Threading.Tasks;
```

`global` in front of `using` makes the line work in every file of the
program, not only in the file where it is written. `Console`, `Math`,
`Random` and `string` are in the namespace `System`, and `List` and
`Dictionary` are in `System.Collections.Generic`. `System.Numerics` is not
one of the seven, so `BigInteger` needed a line of its own. The dots in a
name such as `System.Collections.Generic` show namespaces inside
namespaces. A using line gives the short names of one namespace only, and
not of the namespaces inside it: `using System;` does not give you
`BigInteger`.

In Visual Studio, these seven lines are called *implicit usings*.
*Implicit* means that they are there without being written. The line
`<ImplicitUsings>enable</ImplicitUsings>` in a project's `.csproj` file asks
for them, and Visual Studio writes them into a file of its own,
`<project name>.GlobalUsings.g.cs`, in the project's folder
`obj\Debug\net10.0`.

### Full names

Every type has a *full name*: its namespace, a dot, and its short name. The
full name of `BigInteger` is `System.Numerics.BigInteger`. A program can
always use a type's full name, with no using line.

This cell has no using line. What will its first line print?

```csharp exec
id: full-names-1
System.Numerics.BigInteger exact = System.Numerics.BigInteger.Pow(2, 100);
Console.WriteLine(exact);
Console.WriteLine(Math.Pow(2, 100));
```

```predict
type: choice

What will the first line print?

- 1267650600228229401496703205376
  - The full name says which namespace `BigInteger` is in.
- 1.2676506002282294E+30
  - That is how a `double` prints a number this large.
- It does not compile
  - There is no `using System.Numerics;` line.
```

The first line is 1267650600228229401496703205376: 2 to the power of 100,
with every digit. The full name already says where `BigInteger` is, so the
compiler needs no using line to find it. The second line comes from
`Math.Pow(2, 100)`, which gives a `double`: `1.2676506002282294E+30`, which
means $1.2676506002282294 \times 10^{30}$. A `double` keeps only the first
digits of a number this large, and a `BigInteger` keeps all of them.

You have seen a full name before. On
[Classes and objects](lesson:objects-and-classes), printing a list printed
``System.Collections.Generic.List`1[Character]``. That is the full name of
the list's class: `List`, in the namespace `System.Collections.Generic`.
The part after it says what the list holds.

## A namespace of your own

Your own classes can be in a namespace too. A *namespace line* at the top
of a file, the word `namespace` and a name, puts every class in the file
into that namespace. A class with no namespace line, like every class on
these pages so far, is in the *global namespace*: the namespace with no
name. Its full name is its short name.

The cell below puts a class `Path` in a namespace called `Maps`. A path
goes from one place to another, as a game has paths between its rooms.

```csharp exec
id: a-namespace-of-your-own-1
file: Path.cs
namespace Maps;

/// <summary>A path from one place to another.</summary>
class Path
{
    public string From;
    public string To;

    /// <summary>Makes a path between two places.</summary>
    /// <param name="from">The place where the path starts.</param>
    /// <param name="to">The place where the path ends.</param>
    public Path(string from, string to)
    {
        From = from;
        To = to;
    }
}
```

The full name of this class is `Maps.Path`. The program below uses the full
name.

```csharp exec
id: a-namespace-of-your-own-1-program
var route = new Maps.Path("the cave", "the river");
Console.WriteLine($"{route.From} to {route.To}");
Console.WriteLine(route);
```

The second line is `Maps.Path`. `Path` has no `ToString` of its own, so
printing a path prints the full name of its class, as printing the list
did.

Writing `Maps.` in front of `Path` every time is long. A using line should
let the program write `Path` alone, as it did for `BigInteger`. What will
the first line of this program print?

```csharp exec
id: a-namespace-of-your-own-2
expect: CS0104
using Maps;

Path route = new Path("the cave", "the river");
Console.WriteLine($"{route.From} to {route.To}");
```

```predict
type: choice

What will the first line print?

- the cave to the river
  - `using Maps;` lets the program write `Path` alone.
- It does not compile
  - Is `Maps` the only namespace with a class called `Path`?
- Nothing: it stops with an exception
  - Could anything about `Path` be unknown until the program runs?
```

It did not compile:

```console
Program.cs(3,1): error CS0104: 'Path' is an ambiguous reference between 'Maps.Path' and 'System.IO.Path'
```

*Ambiguous* means that it could mean more than one thing. `System.IO`, one
of the seven namespaces that every cell has, has a class called `Path` too,
for the names of files and folders. With `using Maps;`, the program can use
the short names of both namespaces, and it finds two classes called `Path`.
The compiler does not choose between them. It names both, by their full
names.

This clash shows the second reason for namespaces. The first reason is
that they put types in groups, by what they are for. The second is that
two types can have the same short name, when their full names are
different. The people
who write a class library have never seen your program, and two libraries
can each have a class called `Path`. Their full names are different, so
both can be in one program. The same message comes with a class of yours
called `File`, `Timer` or `Task`, in a namespace with a using line, because
each of those names is already in one of the seven.

There are three ways to make this program compile. You can write the full
name, `Maps.Path`, as the program above does. You can give the class
another name, such as `Trail`. Or you can add a line that says which `Path`
this file means: `using Path = Maps.Path;`. Can you add that line under
`using Maps;`, and run it again?

```solution
using Maps;
using Path = Maps.Path;

Path route = new Path("the cave", "the river");
Console.WriteLine($"{route.From} to {route.To}");
---
It prints `the cave to the river`. `using Path = Maps.Path;` is a using line
of another kind. It makes an *alias*, a second name for one type: in this
file, `Path` means `Maps.Path` and nothing else. It works in its own file
only. Another file can still use `System.IO.Path`.
```

### Your turn: your world in a namespace

This task gives your world's classes a namespace of their own. It adds
nothing new to them, so it makes no new version. The cells hold the
seventh version, as it stood at the end of
[Documenting a class](lesson:documenting-a-class), with its comments. The
`Commands` class from [A front end](lesson:a-front-end-for-a-class) is not
here, because this task does not need it.

<div class="dl-world" data-world="game">

The first three cells hold `Character`, `Healer` and `Room`, and the
program below them uses all three. Run the program first. It prints
`Ada (health 8)` and `Cave: 2 standing`.

Can you put the three classes in a namespace called `GameWorld`? Add
`namespace GameWorld;` as the first line of each of the three cells, above
its comment. Then run the program again. It does not compile now, and that
is expected. What do the messages say? What does the program need, so that
it runs again?

```csharp exec
id: your-world-in-a-namespace-1--game
file: Character.cs
/// <summary>
/// One character in the game: a name, and health from 0 up to MaxHealth.
/// A character with 0 health is down.
/// </summary>
class Character
{
    /// <summary>The most health a character can have.</summary>
    public virtual int MaxHealth => 10;

    public string Name;

    /// <summary>The character's health, a whole number from 0 up to MaxHealth.</summary>
    public int Health { get; protected set; }

    /// <summary>Makes a character with a name and some health.</summary>
    /// <param name="name">The character's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    /// <summary>Says whether the character's health is 0.</summary>
    /// <returns>true if the character is down.</returns>
    /// <example>
    /// <code>
    /// new Character("Ada", 0).IsDown()    // true
    /// new Character("Ada", 1).IsDown()    // false
    /// </code>
    /// </example>
    public bool IsDown()
    {
        return Health == 0;
    }

    /// <summary>
    /// Lowers the character's health by amount, stopping at 0.
    /// Refuses a negative amount, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    /// <summary>
    /// Adds amount to the character's health, stopping at MaxHealth.
    /// Refuses a negative amount, or a character who is down, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void Heal(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: healing cannot be negative.");
            return;
        }
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-healer--game
file: Healer.cs
/// <summary>A character who can also heal someone else.</summary>
class Healer : Character
{
    /// <summary>Makes a healer with a name and some health.</summary>
    /// <param name="name">The healer's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Healer(string name, int health) : base(name, health)
    {
    }

    /// <summary>
    /// Asks other to heal by amount, by other's own rules.
    /// Refuses if the healer is down, and prints why.
    /// </summary>
    /// <param name="other">Any character, a healer too.</param>
    /// <param name="amount">A whole number, 0 or more.</param>
    public void HealOther(Character other, int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        other.Heal(amount);
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-room--game
file: Room.cs
/// <summary>A room in the game, and the characters inside it. Nobody is inside twice.</summary>
class Room
{
    public string Name;
    private List<Character> _characters = new List<Character>();

    /// <summary>Makes an empty room.</summary>
    /// <param name="name">The room's name.</param>
    public Room(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return $"{Name}: {Standing().Count} standing";
    }

    /// <summary>
    /// Puts a character in the room.
    /// Refuses a character who is already inside, and prints why.
    /// </summary>
    /// <param name="character">Any character, a healer too.</param>
    public void Enter(Character character)
    {
        if (_characters.Contains(character))
        {
            Console.WriteLine($"Refused: {character.Name} is already in {Name}.");
            return;
        }
        _characters.Add(character);
    }

    /// <summary>Lists the names of the characters in the room who are not down.</summary>
    /// <returns>The names, in the order the characters entered. The list can be empty.</returns>
    /// <example>
    /// <code>
    /// var cave = new Room("Cave");
    /// cave.Enter(new Character("Ada", 10));
    /// cave.Enter(new Character("Grace", 0));
    /// string.Join(", ", cave.Standing())    // "Ada"
    /// </code>
    /// </example>
    public List<string> Standing()
    {
        var names = new List<string>();
        foreach (Character character in _characters)
        {
            if (!character.IsDown())
            {
                names.Add(character.Name);
            }
        }
        return names;
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-program--game
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var cave = new Room("Cave");
cave.Enter(ada);
cave.Enter(mira);
ada.TakeDamage(4);
mira.HealOther(ada, 2);
Console.WriteLine(ada);
Console.WriteLine(cave);
```

```hint
after: 2 errors
Which class does the first message say it cannot find? Which namespace is
that class in now? How did the program with the cards find `BigInteger`?
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

With the namespace line in all three cells, the program gives three
messages, one for each class. The first is *The type or namespace name
'Character' could not be found*. The classes are in `GameWorld` now, and
the program is in the global namespace, so it needs a using line at its
top:

```csharp
using GameWorld;

var ada = new Character("Ada", 10);
```

The rest of the program stays as it was. It prints the same two lines as
before, `Ada (health 8)` and `Cave: 2 standing`. The classes did not
change: only their full names did, to `GameWorld.Character`,
`GameWorld.Healer` and `GameWorld.Room`.

`Healer.cs` and `Room.cs` need no using line, although both use
`Character`. They are in `GameWorld` themselves, and a class can use the
other classes of its own namespace by their short names.

</details>

What if one file has no namespace line? Delete the line from `Healer.cs`
only, and run the program. Which file does the first message name, and
which class can that file not find?

<details class="dl-answer"><summary>what the first message says</summary>

It names `Healer.cs`: it cannot find `Character`. `Healer.cs` is in the
global namespace again, with no using line, and `Character` is in
`GameWorld`. The program's own using line works in the program's file
only.

</details>

Then add the line to `Healer.cs` again. A class that does not compile stops
every cell below it, so leave all three cells with their namespace line
before you continue.

</div>

<div class="dl-world" data-world="solar-system">

The first three cells hold `Probe`, `Lander` and `Mission`, and the program
below them uses all three. Run the program first. It prints `110` and
`Voyager`.

Can you put the three classes in a namespace called `SolarSystem`? Add
`namespace SolarSystem;` as the first line of each of the three cells,
above its comment. Then run the program again. It does not compile now, and
that is expected. What do the messages say? What does the program need, so
that it runs again?

```csharp exec
id: your-world-in-a-namespace-1--solar-system
file: Probe.cs
/// <summary>
/// One space probe: a name, and fuel in kilograms, from 0 up to TankSize.
/// </summary>
class Probe
{
    /// <summary>The most fuel the probe can hold, in kilograms.</summary>
    public virtual int TankSize => 100;

    public string Name;

    /// <summary>The probe's fuel now, in kilograms.</summary>
    public int Fuel { get; private set; }

    /// <summary>Makes a probe with a name and some fuel.</summary>
    /// <param name="name">The probe's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// new Probe("Voyager", 70).CanBurn(-5)    // false
    /// </code>
    /// </example>
    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;    // a burn below 0 would add fuel
        }
        return kg <= Fuel;
    }

    /// <summary>
    /// Burns kg kilograms of fuel. If CanBurn(kg) is false, it changes
    /// nothing, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    /// <summary>Adds kg kilograms of fuel, stopping at TankSize.</summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-lander--solar-system
file: Lander.cs
/// <summary>
/// A probe that can land. Once it has landed, it burns no more fuel.
/// </summary>
class Lander : Probe
{
    private bool _landed = false;

    /// <summary>Makes a lander that has not landed yet.</summary>
    /// <param name="name">The lander's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    /// <summary>Lands the lander. After this, it burns no more fuel.</summary>
    public void Land()
    {
        _landed = true;
    }

    /// <summary>
    /// Says false once the lander has landed. Before that, it answers
    /// as any probe does.
    /// </summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>false after Land(); before that, what Probe.CanBurn gives.</returns>
    /// <example>
    /// <code>
    /// var philae = new Lander("Philae", 40);
    /// philae.Land();
    /// philae.CanBurn(10)    // false
    /// </code>
    /// </example>
    public override bool CanBurn(int kg)
    {
        if (_landed)
        {
            return false;
        }
        return base.CanBurn(kg);
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-mission--solar-system
file: Mission.cs
/// <summary>A mission, and the probes it has launched.</summary>
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    /// <summary>Makes a mission with no probes yet.</summary>
    /// <param name="name">The mission's name.</param>
    public Mission(string name)
    {
        Name = name;
    }

    /// <summary>Adds a probe to the mission.</summary>
    /// <param name="probe">Any probe, a lander too.</param>
    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    /// <summary>Adds together the fuel of every probe in the mission.</summary>
    /// <returns>The total, in kilograms. 0 for a mission with no probes.</returns>
    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }

    /// <summary>Lists the names of the probes that can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>The names, in the order the probes were launched. The list can be empty.</returns>
    public List<string> ReadyFor(int kg)
    {
        var names = new List<string>();
        foreach (Probe probe in _probes)
        {
            if (probe.CanBurn(kg))
            {
                names.Add(probe.Name);
            }
        }
        return names;
    }
}
```

```csharp exec
id: your-world-in-a-namespace-1-program--solar-system
var voyager = new Probe("Voyager", 70);
var philae = new Lander("Philae", 40);
var mission = new Mission("Outer Planets");
mission.Launch(voyager);
mission.Launch(philae);
philae.Land();
Console.WriteLine(mission.TotalFuel());
Console.WriteLine(string.Join(", ", mission.ReadyFor(30)));
```

```hint
after: 2 errors
Which class does the first message say it cannot find? Which namespace is
that class in now? How did the program with the cards find `BigInteger`?
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

With the namespace line in all three cells, the program gives three
messages, one for each class. The first is *The type or namespace name
'Probe' could not be found*. The classes are in `SolarSystem` now, and the
program is in the global namespace, so it needs a using line at its top:

```csharp
using SolarSystem;

var voyager = new Probe("Voyager", 70);
```

The rest of the program stays as it was. It prints the same two lines as
before, `110` and `Voyager`. The classes did not change: only their full
names did, to `SolarSystem.Probe`, `SolarSystem.Lander` and
`SolarSystem.Mission`.

`Lander.cs` and `Mission.cs` need no using line, although both use
`Probe`. They are in `SolarSystem` themselves, and a class can use the
other classes of its own namespace by their short names.

</details>

What if one file has no namespace line? Delete the line from `Lander.cs`
only, and run the program. Which file does the first message name, and
which class can that file not find?

<details class="dl-answer"><summary>what the first message says</summary>

It names `Lander.cs`: it cannot find `Probe`. `Lander.cs` is in the global
namespace again, with no using line, and `Probe` is in `SolarSystem`. The
program's own using line works in the program's file only.

</details>

Then add the line to `Lander.cs` again. A class that does not compile stops
every cell below it, so leave all three cells with their namespace line
before you continue.

</div>

<div class="dl-world" data-world="your-own">

Copy your classes into the first cell, from the first cell of your world on
[A front end](lesson:a-front-end-for-a-class). Give them a namespace named
after your world, such as `namespace DragonValley;`. A namespace's name
follows the same rule as a class's name: a capital letter at the start of
each word, and no spaces. Then, in the second cell, write a program that
uses your classes, with a using line at its top. Which message does the
compiler give without the using line?

```csharp exec
id: your-world-in-a-namespace-1--your-own
// My classes, in a namespace named after my world.
```

```csharp exec
id: your-world-in-a-namespace-1-program--your-own
// A program that uses my classes, with a using line at its top.
```

</div>

## Reading the documentation

When you meet a type that you do not know, its documentation says what it
is for and what it can do. Microsoft documents every type in .NET's class
library, with a page for each one. The *.NET API browser*,
<https://learn.microsoft.com/en-us/dotnet/api/>, has a box to search for
any of them. *API* stands for *application programming interface*: the
types and methods that a library offers to the programs that use it.

Search there for `DateTime`, .NET's type for dates, or open its page:
<https://learn.microsoft.com/en-us/dotnet/api/system.datetime>. The title
is *DateTime Struct*: `DateTime` is a struct, as
[Two names, one object](lesson:two-names-one-object) said. Under the title,
the page gives two facts:

- **Namespace:** `System`. So a program needs the line `using System;`, or
  the full name, `System.DateTime`. `System` is one of the seven, so a cell
  on this page needs no line of its own.
- **Assembly:** a file whose name ends in `.dll`, such as
  `System.Runtime.dll`. An *assembly* is a file of compiled code, and a
  class library becomes one when it is compiled. This is the assembly in
  the question at the end of CS0246. An *assembly reference*, or
  *reference*, tells the compiler that a program may use the types in an
  assembly, and a program can use a type only if it has a reference to the
  assembly that holds it. Every program on this page, and every new project
  in Visual Studio, already has references to .NET's own assemblies.

Further down, tables list what a `DateTime` has: its **Constructors**,
**Properties**, **Methods** and **Operators**, each with one line that says
what it does. The documentation uses .NET's own names for types that you
know: `Int32` for `int`, `Double` for `double`, and `String` for `string`.
It says *instance* where these pages say *object*: an instance of a class
or a struct is one object made from it. Here are three lines from those
tables:

- the constructor `DateTime(Int32, Int32, Int32)`, which makes a date from
  a year, a month and a day, in that order;
- the property `DayOfWeek`: *Gets the day of the week represented by this
  instance.*
- the method `AddDays(Double)`: *Returns a new DateTime that adds the
  specified number of days to the value of this instance.*

*Represented by this instance* means *that this object holds*, and *the
specified number* means *the number that you give it*.

Voyager 1, the probe that has travelled farther from Earth than anything
else people have made, was launched on 5 September 1977. This program uses
all three lines.

```csharp exec
id: reading-the-documentation-1
var launch = new DateTime(1977, 9, 5);
Console.WriteLine(launch.ToLongDateString());
Console.WriteLine(launch.DayOfWeek);
Console.WriteLine(launch.AddDays(100).ToLongDateString());
```

It prints `Monday 5 September 1977`, then `Monday`, then
`Wednesday 14 December 1977`. `ToLongDateString()`, another method in the
table, writes the whole date in words, as the page's Irish settings write
it. `AddDays` returns a new date, as its line in the table says: `launch`
itself does not change. On which day of the week were you born? Change the
date, and run it again.

Voyager 1 reached *interstellar space*, the space between the stars, on 25
August 2012. How many days after its launch was that? The table of
**Operators** on the page for `DateTime` says what `-` does with two dates.
Can you use it?

```csharp exec
id: reading-the-documentation-2
var launch = new DateTime(1977, 9, 5);
var interstellar = new DateTime(2012, 8, 25);
// How many days after the launch did Voyager 1 reach interstellar space?
```

```hint
after: 2 runs
Under **Operators**, find `Subtraction(DateTime, DateTime)`. Its line says
that it returns *a time interval*, and the type of that interval is
`TimeSpan`. Which property on the page for `TimeSpan` gives the number of
whole days?
```

```solution
var launch = new DateTime(1977, 9, 5);
var interstellar = new DateTime(2012, 8, 25);
TimeSpan journey = interstellar - launch;
Console.WriteLine(journey.Days);
---
It prints 12773. Subtracting one `DateTime` from another gives a
`TimeSpan`: a length of time, not a date. Its property `Days` is the number
of whole days in it. `TimeSpan` is in the namespace `System` too, so it
needs no using line.
```

## A class library in Visual Studio

Everything above this part runs here, in the browser. This part needs a
computer with Visual Studio, which runs on Windows. If you are not at one
now, this is a good place to stop, and to return to later.

On the page, the cells above a program cell and the cell itself make one
program. In Visual Studio, that program is a *project*: one program, or one
library, with its own files and its own settings. A *solution* is a group
of projects that Visual Studio opens and builds together, listed in the
file whose name ends in `.sln`. In this part, your world's classes move
into a class library of their own, a second project in the same solution
as the program that uses them.

1. Press **Download project** on the program cell of your world's task,
   after its classes have their namespace line and the program has its
   using line. Unzip the file, open the file whose name ends in `.sln`, as
   on [Visual Studio](lesson:the-tools-around-your-code), and press
   Ctrl+F5. It prints the same two lines as on the page. The project has a
   file for each class cell above the program on this page: your world's
   classes, and `Path.cs` from higher on the page.
2. In **Solution Explorer**, right-click the solution (the top line), and
   choose **Add** > **New Project**. Type `library` in the search box,
   choose **Class Library** for C#, and choose **Next**. Do not choose
   **Class Library (.NET Framework)**, which is an older kind. Name it
   `GameWorld`, or `SolarSystem` in the solar system, or after your own
   world, and choose **Next**. Choose **.NET 10.0 (Long Term Support)**,
   and choose **Create**. The template makes a file called `Class1.cs`.
   Delete it.
3. Right-click the library, and choose **Add** > **Existing Item**. In the
   console app's folder, select your world's class files, such as
   `Character.cs`, `Healer.cs` and `Room.cs`, and choose **Add**. Visual
   Studio copies them into the library. Then delete the same files from the
   console app.
4. Choose **Build** > **Build Solution**, or press Ctrl+Shift+B.

The library compiles, and the console app does not. The first message in
the Error List is CS0246, *The type or namespace name 'GameWorld' could not
be found*, on line 1 of `Program.cs`. In the solar system, it names
`SolarSystem`. More messages can follow it, one for each class that the
program uses: read the first one first. This time the using line is there,
and the namespace is not: the classes are in another project now, and the
console app has no reference to it. Nothing tells the console app that the
library exists.
That is the second reason in the question at the end of the message.

5. In the console app, right-click **Dependencies**, choose **Add Project
   Reference**, tick the library, and choose **OK**. A *project reference*
   lets one project use the classes of another. Build the solution again.

Now the messages are CS0122, and the first is *'Character' is inaccessible
due to its protection level*, or *'Probe' is inaccessible* in the solar
system. *Inaccessible* means that the console app is not allowed to use
it. A class with no access modifier in front of `class` is *internal*:
only code in its own project can use it. On the page, every cell is part
of one program, so `internal` was never a problem. `public` lets every
project with a reference to the library use the class, as it lets code
outside a class use a public method.

6. Open each file in the library, and write `public` in front of `class`,
   such as `public class Character`, or `public class Probe` in the solar
   system. Build the solution again, and it builds with no errors.
   Right-click the console app, choose **Set as Startup Project**, and press
   Ctrl+F5. It prints the same two lines.

If one class is `public` and its parent class is not, the library itself
does not compile. Its message is CS0060: *Inconsistent accessibility*. A
public `Healer` cannot be built on a `Character` that other projects cannot
use, and a public `Lander` cannot be built on a `Probe` that they cannot
use.

Look in the console app's folder, in `bin\Debug\net10.0`. Beside the
program is `GameWorld.dll`, or `SolarSystem.dll`: your class library,
compiled. It is an assembly, as `System.Runtime.dll` is, and any program
with a reference to it can use its public classes. The class library comes
from Visual Studio's template, so it has *nullable reference types* on,
which the page has off (see
[Visual Studio](lesson:the-tools-around-your-code)). The classes of the game
and the solar system give no warning about it. If your own classes give
some, with codes such as CS8618, they are warnings, and the program still
runs.

The third skills demonstration in this module, one of its assessed
projects, asks for this shape: classes in a class library, and a program
that uses them. [Your world, playable](lesson:your-world-playable) builds
the whole of it, with a test project too.

### Libraries from other people

The classes in your library are yours. Other people publish class
libraries for anyone to use, as *packages*. A package is a class library
with a name and a version number, ready to add to a project. Most packages
for C# are on NuGet, at <https://www.nuget.org>. In Visual Studio, choose
**Project** > **Manage NuGet Packages**, choose the **Browse** tab, search
for a package, and choose **Install**. Visual Studio adds a reference to it. Its classes are in
namespaces of their own, and a program uses them with a using line, as it
used `BigInteger`. The page cannot add a package: its cells have .NET's own
class library, and nothing more.

## Looking back

A namespace and a class library both hold classes. Which one does a using
line name, and which one does a reference name? Why did the console app
need both, to use the classes in the library?

A challenge: `Stopwatch` measures how long something takes. Find its page
in the documentation. Which namespace is it in? Can you use it to measure
how long this loop takes, in milliseconds? Run it several times. Is the
time the same each time?

```csharp challenge
// How long does this loop take? A Stopwatch can measure it.
long total = 0;
for (int i = 1; i <= 10000000; i++)
{
    total = total + i;
}
Console.WriteLine(total);
```

The [practice page](lesson:namespaces-and-libraries-practice) has more
problems on namespaces, using lines, class libraries and the documentation,
and three from earlier pages.

Next, [Your world, playable](lesson:your-world-playable) makes one program
from every version of your classes, and then moves it to Visual Studio: a
class library, a console app that uses it, and a test project.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Namespaces and using directives*. C# fundamentals, Microsoft
Learn.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/namespaces>.
The namespace line, using lines, `global using`, implicit usings and the
alias that made `Path` compile, each with a short example.

Microsoft. *.NET API browser*. Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/api/>. The search box for the
documentation of every type in .NET, such as `DateTime` and `Stopwatch`.

Microsoft. *Create a .NET class library*. .NET fundamentals, Microsoft
Learn.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library>.
A class library and a console app that uses it, in one solution, built step
by step in Visual Studio, with the project reference.

Microsoft. *Quickstart: Install and use a NuGet package in Visual Studio
(Windows only)*. NuGet documentation, Microsoft Learn.
<https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio>.
A package from nuget.org, added to a project and used with a using line.
