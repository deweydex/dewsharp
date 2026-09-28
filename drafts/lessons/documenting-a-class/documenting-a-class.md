---
title: "Documenting a class: XML comments that Visual Studio shows"
version: 2026.09.27.1
from: documenting-a-class
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO9]
---

# Documenting a class: XML comments that Visual Studio shows

Somebody on your team wants to use your class. They have not read its
code, and they should not have to. What do they need to know? What would
you want to know about somebody else's class before you used it?

Here is the probe from the solar-system world, with no comments at all.
The class is in the first cell, and a program that uses it is in the
second. A probe with 70 kg of fuel is asked to burn 200 kg. What do you
think happens? Try to answer from the name `Burn` alone, before you read
its code.

```csharp exec
id: no-comments-yet-1
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;
        }
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

```csharp exec
id: no-comments-yet-1-program
var voyager = new Probe("Voyager", 70);
voyager.Burn(200);
Console.WriteLine(voyager.Fuel);
```

```predict
type: choice

What will the program print?

- -130
  - `Burn` subtracts 200 from 70.
- 0
  - The fuel stops at 0, as a character's health did.
- A line that says the burn was refused, then 70
  - `Burn` asks `CanBurn` first.
- Nothing: it stops with an exception
  - A probe cannot burn fuel it does not have.
```

It prints `Refused: Voyager cannot burn 200 kg now.`, then `70`. Each of
the four guesses is something a method called `Burn` could do. The name
does not say which. You learned which by running the program, or by
reading the code.

A teammate who uses your class should not have to do either. They need
*documentation*: text written for the people who use your code, which
says what a class is for and what each of its methods does.

In C#, documentation goes in a *documentation comment*: comment lines that
start with three slashes, `///`, just above a class or a method. The
compiler skips them, as it skips any comment. (In Python, the same idea is
called a docstring.)

The text in a documentation comment is written in *XML*, a way of marking
each part of a text with tags. A *tag* is a name in angle brackets, such
as `<summary>`. The same name with a slash, `</summary>`, ends the part.
The text between the two is the summary: a short description of the class
or the method.

## A comment for the class

Here is a documentation comment for the probe's class. It goes on the
lines just above `class Probe`:

```csharp
/// <summary>
/// One space probe: a name, and fuel in kilograms. The fuel is never below 0.
/// </summary>
class Probe
```

Can you add these three lines to the first cell on this page, above
`class Probe`, and press **Check** on that cell? Then run the program
again. What changes?

<details class="dl-answer"><summary>answer</summary>

Nothing changes. The class compiles, and the program prints the same two
lines as before, because the compiler skips every comment, with two
slashes or three. A documentation comment is for people. It is for Visual
Studio too, which shows the summary when you rest the mouse pointer on
the name `Probe`. The last section of this page shows how.

</details>

A class comment answers one question: what does one object of this class
represent? It says what the object knows, and any rule that holds for
every object of the class. Here, a probe knows its name and its fuel, and
its fuel is never below 0. What the methods do belongs in their own
comments.

## What a method promises

A method's comment is a promise to whoever calls it. A good one says four
things, and each has its own tag:

- what the method does, in a sentence or two: `<summary>`;
- what each parameter should be: `<param name="kg">`, one for each
  parameter, with the parameter's own name;
- what it returns, if it returns anything: `<returns>`;
- what happens when the method refuses.

Here are two comments for the same `Burn`:

```csharp
    /// <summary>Burns fuel.</summary>
    public void Burn(int kg)
```

```csharp
    /// <summary>
    /// Burns kg kilograms of fuel. If CanBurn(kg) is false, it changes
    /// nothing, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Burn(int kg)
```

A caller wants to know what `voyager.Burn(200)` does to a probe with
70 kg, as in the first program on this page. Which comment tells them?

<details class="dl-answer"><summary>answer</summary>

The second. The first comment is true, but it does not help a caller: it
says what the name `Burn` already said. The second answers the questions
a caller has before they call it. The refusal matters most, because at a
refusal, the caller's program and the method disagree about what should
happen.

</details>

The second comment has no `<returns>`. `Burn` is `void`, and the
method's first line already says that it returns nothing. Visual Studio
shows that line together with the comment. A method that returns a value
gets a `<returns>` tag, which says what the value means: for `CanBurn`,
`true` if the probe can burn that much now.

Most method summaries start with a verb that ends in *-s*: *Burns*,
*Adds*, *Says*. Microsoft's documentation of .NET's own classes does the
same, so your comments read like theirs.

### A method that refuses with an exception

`Burn` refuses by printing a line and changing nothing. Many C# methods
refuse in another way: they throw an exception. A caller needs to know
which exception, and when. That goes in an `<exception>` tag.

On *Composition*, a star system with no planets had no farthest planet,
and `Farthest()` stopped with an `ArgumentOutOfRangeException` at
`_planets[0]`. That page asked what it should do instead. Here is one
answer: refuse on purpose, with an exception whose message says why, and
put the refusal in the comment. `InvalidOperationException` is .NET's
exception for a request that an object cannot do in its present state.

```csharp exec
id: what-a-method-promises-1
file: StarSystem.cs
/// <summary>A planet: its name, and its distance from its star in millions of km.</summary>
class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }
}

/// <summary>A star, and the planets that orbit it.</summary>
class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    /// <summary>Adds a planet to the star system.</summary>
    /// <param name="planet">Any planet.</param>
    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    /// <summary>Finds the planet farthest from the star.</summary>
    /// <returns>The farthest planet. If two are equally far, the one added first.</returns>
    /// <exception cref="InvalidOperationException">The star system has no planets.</exception>
    public Planet Farthest()
    {
        if (_planets.Count == 0)
        {
            throw new InvalidOperationException($"{Star} has no planets, so none is farthest.");
        }
        Planet farthest = _planets[0];    // safe: the list has at least one planet
        foreach (Planet planet in _planets)
        {
            if (planet.Distance > farthest.Distance)
            {
                farthest = planet;
            }
        }
        return farthest;
    }
}
```

`cref` names the class of the exception. The program below asks the
Sun's system for its farthest planet, and then asks Vega's system, which
has no planets. It is meant to stop with an exception.

```csharp exec
id: what-a-method-promises-1-program
expect: exception
var sol = new StarSystem("the Sun");
sol.Add(new Planet("Earth", 149.6));
sol.Add(new Planet("Mars", 228.0));
Console.WriteLine(sol.Farthest().Name);

var vega = new StarSystem("Vega");
Console.WriteLine(vega.Farthest().Name);
```

It prints `Mars`, and then it stopped with an exception:
`InvalidOperationException`, with the message `Vega has no planets, so
none is farthest.` That is what the comment promised. A caller who reads
the comment knows to add a planet first.

## Two kinds of comment

`Farthest` has a comment of each kind. The `///` lines above it are for
the caller, who uses the method and does not read its code. The `//`
comment inside it is for the next person who reads the code, perhaps you,
next year:

```csharp
        Planet farthest = _planets[0];    // safe: the list has at least one planet
```

It says *why* the line is safe, which the line cannot say by itself. On
*Composition*, this same line stopped the program. A comment that says
only *what* a line does adds nothing, because the line already says it:

```csharp
        return farthest;    // return the farthest planet
```

Which lines in your own classes would a newcomer ask *why?* about? Those
are the lines that need a `//` comment.

### A plan in pseudocode

There is one more kind of documentation: the steps of a method, written
before its code. *Pseudocode* is a plan for a program, in plain English,
written in the shape of code. No computer runs it. Here is a plan for
`Farthest`:

```text
IF there are no planets
    STOP with an exception that says why
SET the farthest so far to the first planet
FOR EACH planet
    IF it is farther from the star than the farthest so far
        SET the farthest so far to this planet
RETURN the farthest so far
```

Compare it with `Farthest` in the `StarSystem` cell above. Which lines of
C# did each step become?

Write the plan first when a method has several steps. It can stay in the
code afterwards, as `//` comments above the method, for the next person
who reads it. The assessed projects in this course ask for the algorithm
behind your methods as well as their code, and a plan like this one is a
way to show it.

## Examples a program can check

A documentation comment can also hold examples: a line of code that uses
the method, and the answer it gives. A reader sees how the method is
used, without reading its code. An example goes between `<example>` and
`</example>`, and its code between `<code>` and `</code>`.

In Python, a module called doctest can run the examples in a docstring,
and check each answer. C# has nothing like it, because a comment never
runs. So we check the examples in a program. Here is a small class for
that. `Example.Check` prints one line for each example: what the example
says, and what the code gives.

```csharp exec
id: examples-a-program-can-check-example
file: Example.cs
static class Example
{
    public static void Check(string call, object expected, object actual)
    {
        if (Equals(expected, actual))
        {
            Console.WriteLine($"{call}: {actual}, as the example says");
        }
        else
        {
            Console.WriteLine($"{call}: the example says {expected}, the code gives {actual}");
        }
    }
}
```

`Check` is `static`: it belongs to the class itself, not to an object, so
a program calls it as `Example.Check(...)`, with no object made first.
`Math.Max` works in the same way. A `static class` holds only static
members. A parameter of type `object` accepts a value of any type,
because every type in C# is built on `object`. `Equals(expected, actual)`
says whether the two values are the same.

Here is the probe again, with the class comment, and comments on
`CanBurn` and `Burn`. It replaces the probe in the first cell for the
cells below it (rule 4: a class written again further down replaces the
earlier one). The comment on `CanBurn` has three examples, and the
program below it checks them.

```csharp exec
id: examples-a-program-can-check-1
file: Probe.cs
/// <summary>
/// One space probe: a name, and fuel in kilograms. The fuel is never below 0.
/// </summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// </code>
    /// </example>
    public bool CanBurn(int kg)
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
}
```

```csharp exec
id: examples-a-program-can-check-1-program
var voyager = new Probe("Voyager", 70);
Example.Check("CanBurn(30) with 70 kg", true, voyager.CanBurn(30));
Example.Check("CanBurn(80) with 70 kg", false, voyager.CanBurn(80));
Example.Check("CanBurn(70) with 70 kg", true, voyager.CanBurn(70));
```

Each of the three lines ends with `as the example says`. C# writes `true`
in code, and prints `True`.

Now suppose a teammate changes one character in `CanBurn`, `<=` to `<`,
so that a probe can no longer burn its very last kilogram. Nobody changes
the comment, which is what often happens in real projects. Here is their
version. It replaces the probe above (rule 4).

```csharp exec
id: examples-a-program-can-check-2
file: Probe.cs
/// <summary>
/// One space probe: a name, and fuel in kilograms. The fuel is never below 0.
/// </summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// </code>
    /// </example>
    public bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;    // a burn below 0 would add fuel
        }
        return kg < Fuel;
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
}
```

The program is the same three checks as before.

```csharp exec
id: examples-a-program-can-check-2-program
var voyager = new Probe("Voyager", 70);
Example.Check("CanBurn(30) with 70 kg", true, voyager.CanBurn(30));
Example.Check("CanBurn(80) with 70 kg", false, voyager.CanBurn(80));
Example.Check("CanBurn(70) with 70 kg", true, voyager.CanBurn(70));
```

```predict
type: choice

Which lines will show a difference?

- None of them
  - Nobody changed the comment, so the examples say the same as before.
- Only the line for CanBurn(70)
  - 30 and 80 give the same answer with `<` as with `<=`.
- All three
  - Every check calls the method that changed.
```

Only the last line shows a difference: `CanBurn(70) with 70 kg: the
example says True, the code gives False`. The comment now promises
something the code does not do, and the comment cannot notice, because it
never runs. The check runs, so it noticed, the first time it ran after
the change.

The examples at 30 and 80 give the same answer with `<` as with `<=`.
Only the example at the boundary, all 70 of 70 kg, noticed. That is why
the example at the boundary is the one worth writing.

Each example is written twice: in the comment, for a person to read, and
in the program, to run. When you change one, change the other. In a
larger project, the checks go in a test project, as *Testing a class*
described, and they run every time the code changes. Can you change `<`
back to `<=` in the teammate's cell, and run the program again?

### Your turn: your class, seventh version

This is the seventh version of your class: a documentation comment on
every class, and on every constructor and method a caller would use, with
the four things a method promises. Give at least one method an example,
at a boundary if you can, and a check for each example in the program
cell.

The first cells of your world hold your classes as they were at the end
of *Testing a class*: the sixth version. Write the comments in them, and
the checks in the program below them. The program compiles and runs from
the start, because a comment changes nothing that runs. Run it after each
check you add.

<div class="dl-world" data-world="game">

The first three cells hold `Character`, `Healer` and `Room`. The program
checks one example, for `Standing`. `string.Join` turns the list of names
into text, so that `Check` compares text with text.

```csharp exec
id: your-class-7--game
file: Character.cs
class Character
{
    public virtual int MaxHealth => 10;

    public string Name;
    public int Health { get; protected set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
    }

    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

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
id: your-class-7-healer--game
file: Healer.cs
class Healer : Character
{
    // A healer is a character who can also heal someone else.

    public Healer(string name, int health) : base(name, health)
    {
    }

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
id: your-class-7-room--game
file: Room.cs
class Room
{
    public string Name;
    private List<Character> _characters = new List<Character>();

    public Room(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return $"{Name}: {Standing().Count} standing";
    }

    public void Enter(Character character)
    {
        if (_characters.Contains(character))
        {
            Console.WriteLine($"Refused: {character.Name} is already in {Name}.");
            return;
        }
        _characters.Add(character);
    }

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
id: your-class-7-program--game
var cave = new Room("Cave");
cave.Enter(new Character("Ada", 10));
cave.Enter(new Character("Grace", 0));
Example.Check("Standing() with Ada, and Grace down", "Ada", string.Join(", ", cave.Standing()));
```

```hint
after: 2 runs
Who will call each method, and what would they want to know before the
call? What does the method do when it refuses?
```

```hint
after: 4 runs
title: one comment, in full
Here is a comment for `IsDown`, with two examples, one on each side of
the boundary:

    /// <summary>Says whether the character's health is 0.</summary>
    /// <returns>true if the character is down.</returns>
    /// <example>
    /// <code>
    /// new Character("Ada", 0).IsDown()    // true
    /// new Character("Ada", 1).IsDown()    // false
    /// </code>
    /// </example>

A check for the first example is
`Example.Check("IsDown() at 0 health", true, new Character("Ada", 0).IsDown());`.
```

```solution
var cave = new Room("Cave");
cave.Enter(new Character("Ada", 10));
cave.Enter(new Character("Grace", 0));
Example.Check("Standing() with Ada, and Grace down", "Ada", string.Join(", ", cave.Standing()));
Example.Check("IsDown() at 0 health", true, new Character("Ada", 0).IsDown());
Example.Check("IsDown() at 1 health", false, new Character("Ada", 1).IsDown());

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
---
One set of comments. Each method says what it does, what its parameter
should be, and what it refuses. `IsDown` and `Standing` have examples,
and the program checks every one. The example in `Standing` takes four
lines, because it has to make a room first: an example can be as many
lines as it needs. The healer's old `//` comment became its class
summary, where Visual Studio can show it.

`Name` has no comment: a comment could only say what its name already
says. `ToString` has none either, because nobody calls it by name: C#
calls it when a character is printed.

In one file, C# needs the program's statements before any class, so the
classes come after them here. These copies replace the ones above for
this program (rule 4).
```

</div>

<div class="dl-world" data-world="solar-system">

The first three cells hold `Probe`, `Lander` and `Mission`. The program
checks one example, for a lander that has landed.

```csharp exec
id: your-class-7--solar-system
file: Probe.cs
class Probe
{
    public virtual int TankSize => 100;

    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;
        }
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: your-class-7-lander--solar-system
file: Lander.cs
class Lander : Probe
{
    // A lander is a probe that can land, and once it has landed, it burns no more.

    private bool _landed = false;

    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    public void Land()
    {
        _landed = true;
    }

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
id: your-class-7-mission--solar-system
file: Mission.cs
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    public Mission(string name)
    {
        Name = name;
    }

    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }

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
id: your-class-7-program--solar-system
var philae = new Lander("Philae", 40);
philae.Land();
Example.Check("CanBurn(10) after Land()", false, philae.CanBurn(10));
```

```hint
after: 2 runs
Who will call each method, and what would they want to know before the
call? What does the method do when it refuses?
```

```hint
after: 4 runs
title: one comment, in full
Here is a comment for the lander's `CanBurn`. It says only what is
different about a lander:

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
```

```solution
var philae = new Lander("Philae", 40);
philae.Land();
Example.Check("CanBurn(10) after Land()", false, philae.CanBurn(10));
var voyager = new Probe("Voyager", 70);
Example.Check("CanBurn(30) with 70 kg", true, voyager.CanBurn(30));
Example.Check("CanBurn(80) with 70 kg", false, voyager.CanBurn(80));
Example.Check("CanBurn(70) with 70 kg", true, voyager.CanBurn(70));
Example.Check("CanBurn(-5) with 70 kg", false, voyager.CanBurn(-5));

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
---
One set of comments. The lander's `CanBurn` says only what is different
about a lander, and leaves the rest to the promise that `Probe.CanBurn`
already makes. `Burn` says where its refusal comes from, `CanBurn`,
rather than saying it all again. The lander's old `//` comment became its
class summary, where Visual Studio can show it.

`Name` has no comment: a comment could only say what its name already
says. `ToString` has none either, because nobody calls it by name: C#
calls it when a probe is printed. `Mission.TotalFuel` has no example yet.
The challenge at the end of the page asks for one.

In one file, C# needs the program's statements before any class, so the
classes come after them here. These copies replace the ones above for
this program (rule 4).
```

</div>

<div class="dl-world" data-world="your-own">

Your classes are saved on *Testing a class*, in the last cells of your
own world. Copy them into the first cell here. Give every class a
comment, and every constructor and method a caller would use. Which
method's refusal was hardest to describe? Then give one method an
example, and check it in the second cell, with a line such as
`Example.Check("what the call is", what the example says, the call itself);`.

```csharp exec
id: your-class-7--your-own
// My classes, with documentation comments: the seventh version.
```

```csharp exec
id: your-class-7-program--your-own
// A check for each example in my comments.
```

</div>

## What Visual Studio shows

On this page, a documentation comment is a comment and nothing more.
Visual Studio reads it while you type, and shows it wherever the class or
the method is used. You need a computer with Visual Studio for this
section.

1. Download the program cell at the end of your world's task as a Visual
   Studio project, and open it, as you did on *Visual Studio*.
2. In `Program.cs`, rest the mouse pointer on a method that you gave a
   comment, such as `Standing` in the game, or `CanBurn` in the solar
   system. What appears under the method's first line?
3. At the end of `Program.cs`, start a call to a method with a parameter,
   such as `new Character("Mo", 5).Heal(` or `new Probe("Juno", 50).Burn(`.
   When you type the opening bracket, what does Visual Studio show about
   the parameter?
4. In one of your class files, click on the empty line just above a
   method with no comment, and type `///`. What does Visual Studio write
   for you?

<details class="dl-answer"><summary>what Visual Studio shows</summary>

In step 2, the method's first line appears, with the text of its
`<summary>` under it, and the text of `<returns>` for a method that
returns a value. In step 3, Visual Studio shows the method's first line
and its summary, and the text of `<param>` for the parameter you are
typing. That is why the name in `<param name="...">` must be the
parameter's own name. In step 4, Visual Studio writes the tags for you,
with `<summary>` first, and puts the cursor inside it.

A teammate who uses your class sees what each method promises at the
moment they need it, without opening your file.

</details>

## Looking back

Your tests on *Testing a class* and the examples in your comments both
check what the class does. What is each one better at?

A challenge: `Mission.TotalFuel` has no example. Can you write one that
makes a mission, launches two probes and gives the total, and a check for
it? Then change `TotalFuel` so that it skips the last probe, and see
whether your check notices. In one file, C# needs the program's
statements before any class, so the classes come last here.

```csharp challenge
var outer = new Mission("Outer Planets");
Console.WriteLine(outer.TotalFuel());

static class Example
{
    public static void Check(string call, object expected, object actual)
    {
        if (Equals(expected, actual))
        {
            Console.WriteLine($"{call}: {actual}, as the example says");
        }
        else
        {
            Console.WriteLine($"{call}: the example says {expected}, the code gives {actual}");
        }
    }
}

/// <summary>One space probe: a name, and fuel in kilograms.</summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }
}

/// <summary>A mission, and the probes it has launched.</summary>
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    public Mission(string name)
    {
        Name = name;
    }

    /// <summary>Adds a probe to the mission.</summary>
    /// <param name="probe">Any probe.</param>
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
}
```

The [practice page](lesson:documenting-a-class-practice) has more
problems on documentation comments and examples, and three from earlier
pages.

Next, *A front end* lets someone use your classes without writing any C#
at all.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Recommended XML documentation tags*. C# reference, Microsoft
Learn.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags>.
Every tag on this page is here, and more, with the text of each that
Visual Studio shows. It also says what the compiler can check, such as a
`<param>` whose name matches no parameter, once a project asks it to
write a documentation file.

Microsoft. *XML API documentation comments*. C# reference, Microsoft
Learn. <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/>.
How the compiler turns documentation comments into a file of their own,
which other tools make into web pages, and the setting that turns it on.
