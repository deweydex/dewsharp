---
title: "Designing classes: from a description to classes and enums"
version: 2026.09.27.1
from: from-a-description-to-classes
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO7, FOOP-LO1, FOOP-LO6]
---

# Designing classes: from a description to classes and enums

So far, every page has given you a class and asked you to change it. A
real program starts before that, with a description of what it should do,
in words, and no code at all. Here is one. Read it once, to the end.
Which of the things in it would you make into a class?

> The Red Plains mission to Mars has two rovers, the Dune and the Crater.
> Each rover drives across the surface, and neither may climb a slope
> steeper than its wheels allow. Each carries a crew of up to three, and
> every crew member has a role: commander, geologist or engineer. On each
> drive, the crew collect rock samples, and for each one they note its
> name, the depth it was dug from, and whether it holds ice. The mission
> keeps a log of every drive: which rover, how far it went, and what it
> found. At the end of each day, mission control wants to know the longest
> drive, and how many samples held ice.

Write your list on paper before you continue. There is no single answer,
and this page shows three.

## Reading a description

A good first step is to find the nouns, the names of things: mission,
rover, surface, slope, wheels, crew, crew member, role, drive, sample,
name, depth, ice, log, day, mission control. Every class is a noun, but
most nouns are not classes. Three questions sort them.

- **Does it know several things, or do something?** A sample knows its
  name, its depth, and whether it holds ice: three facts that belong
  together. It might be a class. A depth is one number. It is a field of
  something else.
- **Does it keep a rule?** "Neither may climb a slope steeper than its
  wheels allow" is a rule, and it belongs to the rover, as the rule about
  fuel belonged to the probe on
  [Encapsulation](lesson:keeping-details-inside-an-object). "A crew of up
  to three" is another rule, and it belongs to the rover too.
- **Is it inside the program at all?** Mission control is the team that
  uses the program. It asks the questions, and it is not one of the
  program's objects. A day is when the questions are asked, not a thing
  the program keeps.

The verbs are the other half: drives, climb, carries, collect, note,
keeps, wants to know. A verb usually becomes a method, on the class that
does it, or on the class that knows what the answer needs.

How would you sort these four? For each one, which of the two would you
choose?

- "The steepest slope a rover can climb": a field of `Rover`, or a class
  of its own?
- "A sample": a class of its own, or a field of `Drive`?
- "Mission control": the team that uses the program, or a class of its
  own?
- "Wants to know the longest drive": a method, or a field, on the class
  that keeps the drives?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

- The steepest slope is one number, so it is a field of `Rover`.
- A sample keeps three facts together, so it can be a class of its own.
  A drive keeps a list of samples.
- Mission control is the team that uses the program, so it is not a
  class.
- "Wants to know" is a question, so it is a method: `Longest()`, on the
  class that keeps the drives.

</details>

## A fixed list of values

One noun is still left: *role*. A role is one value, so it is a field of
a crew member. But what type is that field? It could be a `string`. Here
are a crew's roles, as strings, and a loop that counts the geologists. How
many will the program count?

```csharp exec
id: a-fixed-list-of-values-1
var roles = new List<string> { "Commander", "Geologist", "geologist" };
int geologists = 0;
foreach (string role in roles)
{
    if (role == "Geologist")
    {
        geologists = geologists + 1;
    }
}
Console.WriteLine($"Geologists: {geologists}");
```

```predict
type: number

How many geologists will it count?
```

It prints `Geologists: 1`. The third role was typed with a small *g*,
and `"geologist"` is a different string from `"Geologist"`. C# had no
reason to stop it: both are strings. A role of `"Pilot"`, which the
mission does not have, would compile too.

C# has a type for a value that must come from a fixed list. It is an
*enum*: a type with a fixed list of named values. (The name is short for
*enumeration*, a list of things named one by one.) Here is an enum for
the three roles. It goes in a types cell, and the cells below can use
it, as they can use a class (rule 2).

```csharp exec
id: a-fixed-list-of-values-2
file: Role.cs
enum Role
{
    Commander,
    Geologist,
    Engineer
}
```

`Role` is now a type, as `int` and `string` are, and it has exactly three
values. Each value is written with the type's name in front of it:
`Role.Geologist`. Here is the same count, with roles of type `Role`. What
will the last line print?

```csharp exec
id: a-fixed-list-of-values-3
var roles = new List<Role> { Role.Commander, Role.Geologist, Role.Geologist };
int geologists = 0;
foreach (Role role in roles)
{
    if (role == Role.Geologist)
    {
        geologists = geologists + 1;
    }
}
Console.WriteLine($"Geologists: {geologists}");
Console.WriteLine(roles[0]);
```

```predict
type: choice

What will the last line print?

- Commander
  - An enum value prints as its name.
- Role.Commander
  - It prints the way it was written in the code.
- 0
  - The first value in the list is number 0.
```

It prints `Geologists: 2`, then `Commander`. An enum value prints as its
name, without the type in front. (Underneath, each value is also a whole
number, counted from 0 in the order of the list, so `(int)Role.Engineer`
is 2. A program rarely needs the number. The names are the point.)

What if a role is typed with a small *g* again? The next program is meant
to fail. Run it, and read the message.

```csharp exec
id: a-fixed-list-of-values-4
expect: CS0117
var roles = new List<Role> { Role.Commander, Role.Geologist, Role.geologist };
Console.WriteLine(roles.Count);
```

It does not compile: `error CS0117: 'Role' does not contain a definition
for 'geologist'`. `Role.Pilot` gets the same message, with `'Pilot'`. With
strings, the slip ran and gave a count that was too small, with no
message. With an enum, the compiler finds it before anything runs,
because it knows every value that the type can have. That is the reason
to choose an enum: when a value must be one of a fixed list, the list
belongs in the code, where the compiler can check it.

## A card for each class

Before any code, designers often write each class on a small card, with
three parts:

- the class's name;
- its *responsibilities*: what it knows, and what it does;
- its *collaborators*: the other classes it works with.

A card like that is called a *CRC card*, for class, responsibilities and
collaborators. Cards are easy to change. You can move them on a table,
remove one, or join two into one, and all of that is much harder once
the code exists. Here is one set of cards for the mission.

| Class | Knows | Does | Works with |
|---|---|---|---|
| `Rover` | its name, the steepest slope it can climb, its crew | climbs a slope, if it is not too steep; takes a crew member on board (up to three) | `CrewMember` |
| `CrewMember` | a name, a role | nothing yet | `Role` |
| `Sample` | a name, the depth it was dug from, whether it holds ice | nothing yet | |
| `Drive` | which rover, how far it went, the samples found | collects a sample; counts the samples with ice | `Sample` |
| `Log` | every drive | adds a drive; finds the longest; counts the samples with ice | `Drive` |

`Role` has no card, because it is not a class. It is the enum from the
section above, and it only lists values.

The same design can be drawn as a *class diagram*. Each class is a box,
with its name at the top, then its fields, then its methods. A line joins
two classes when one keeps the other, and the word on the line says how
many it keeps.

![A class diagram of the Red Plains mission, in two rows of three boxes. Top row: Rover (fields Name, SteepestSlope and crew; methods Climb and Board) is joined to CrewMember by a line marked "up to 3". CrewMember (fields Name and Role; nothing yet) is joined to the enum Role by a line marked "one"; Role lists Commander, Geologist and Engineer. Bottom row: Log (field drives; methods Add and Longest) is joined to Drive by a line marked "many". Drive (fields RoverName, Distance and samples; methods Collect and SamplesWithIce) is joined to Sample by a line marked "many". Sample has the fields Name, Depth and HasIce, and nothing yet.](the-mission-in-boxes.svg)

Two cards say "nothing yet". When a type only knows things, and does
nothing, does it need to be a whole class? C# has a shorter way to write
a type whose only job is to hold values. It is a *record*:

```csharp
record CrewMember(string Name, Role Role);
```

That one line makes a type with a `Name` and a `Role`, and a constructor
that takes both. (In `Role Role`, the first word is the type and the
second is the name. C# allows a name to be the same word as its type.) A
class is useful when it has a rule to keep or a question to answer. So
far, a crew member has neither.

## More than one good answer

Here are two other designs for the same paragraph.

**Design B: fewer classes.** Only `Rover`, `Drive` and `Log` are
classes. A crew member and a sample are records, one line each, with no
methods of their own. It has less code, and loses nothing today. But when
mission control asks a new question about samples, such as "which were
dug from deeper than 50 cm?", the answer goes in `Drive` or `Log`,
because a sample only holds values.

**Design C: a mission that holds everything.** A `Mission` class holds
the rovers and the drives, and answers mission control's questions
itself. There is no `Log`. There is one object to ask, and one place to
look. But `Mission` now does two jobs: it manages the rovers, and it
keeps the records. As the program grows, a class with two jobs tends to
become a class with five.

Each one is a good answer. They trade the same things in different
amounts:

- more classes give every rule and every question its own home, but mean
  more code, and more places to look;
- fewer classes mean less code, but a rule with no home is copied to
  every place that needs it.

Mission control adds a new rule: "a sample from less than 10 cm deep is
never kept". Which design gives that rule the most natural home: design
B, with records for samples; the first design, with a `Sample` class and
`Drive.Collect`; or design C, with everything in `Mission`?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The first design has `Drive.Collect`, and every sample passes through
that one method. One check there keeps the rule for every drive. Design B
can do the same, if its `Drive` has a `Collect` method too: records for
samples change nothing here. In design C, `Mission` can keep the rule,
and it has one more job to do.

</details>

## From cards to skeletons

The last step before real code is a *skeleton*: each class with its
fields and its constructor, and every method named, with its parameters
and the type it returns, but with nothing inside yet.

In Python, each method in a skeleton holds `pass`. C# has no `pass`. A
method that says it returns an `int` must return an `int`, so C# does
not allow its body to be empty. In a skeleton, each method's body is one
line instead: `throw new NotImplementedException();`. `throw` stops the
program with an exception. `NotImplementedException` is an exception
whose name says what happened: the method is not *implemented*, which
means not written yet. Visual Studio writes the same line when it makes
a new method for you.

Here is a skeleton for part of the design: the sample, the drive and
the log. Each class is in a cell of its own, as it would be in a file of
its own. The program in the fourth cell uses all three (rule 2: a class
written in a cell can be used by the cells below it). What will happen
when you run it?

```csharp exec
id: from-cards-to-skeletons-sample
file: Sample.cs
class Sample
{
    public string Name;
    public int Depth;    // centimetres below the surface
    public bool HasIce;

    public Sample(string name, int depth, bool hasIce)
    {
        Name = name;
        Depth = depth;
        HasIce = hasIce;
    }
}
```

```csharp exec
id: from-cards-to-skeletons-drive
file: Drive.cs
class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}
```

```csharp exec
id: from-cards-to-skeletons-log
file: Log.cs
class Log
{
    private List<Drive> _drives = new List<Drive>();

    public void Add(Drive drive)
    {
        throw new NotImplementedException();
    }

    public int Longest()    // the distance of the longest drive
    {
        throw new NotImplementedException();
    }
}
```

```csharp exec
id: from-cards-to-skeletons-1
expect: exception
var log = new Log();
var drive = new Drive("Dune", 340);
drive.Collect(new Sample("basalt", 20, false));
log.Add(drive);
Console.WriteLine(log.Longest());
```

```predict
type: choice

What will happen when you run it?

- It prints 340
  - The only drive was 340 m long.
- It prints 0
  - The methods have nothing real in them yet.
- It does not compile
  - None of the methods has any code in it.
- It stops with an exception
  - A method with no body yet throws when it is called.
```

It compiles, and then it stops with an exception:
`System.NotImplementedException: The method or operation is not
implemented.` It stops at line 15 of `Drive.cs`, the `throw` inside
`Collect`, which is the first method the program calls. Nothing is
printed. Nothing is broken: stopping at the first method with no body is
what a skeleton is meant to do.

Two things happened, one after the other. First, C# compiled the
program, and that checked the cards against each other. `Collect` was
given a `Sample`, `Add` was given a `Drive`, and `Longest()` returns an
`int`, which `Console.WriteLine` can print. If a call had no method to go
to, or gave a method a value of a type it does not take, nothing would
have run. Then the program ran, until it called a method with no body
yet. The exception shows where that method is: it is the next one to
write.

Can you give `Collect` its body? It needs one line, which adds the sample
to the list `_samples`. Change it in the `Drive` cell, and then run the
program again. Where does it stop now?

<details class="dl-answer"><summary>where it stops</summary>

It stops at the `throw` in `Add`, the next method the program calls. Each
method you write takes the program one call further. The challenge at the
end of this page is to write them all.

</details>

Why not leave a method's body empty, as `{ }`? Can you delete the
`throw` line from `Longest`, and check the `Log` cell? What does the
compiler say? (Afterwards, write the line again, so that the program
below the `Log` cell still compiles.)

<details class="dl-answer"><summary>what the compiler says</summary>

It does not compile: `error CS0161: 'Log.Longest()': not all code paths
return a value`. `Longest` says it returns an `int`, and an empty body
returns nothing.

A `void` method, such as `Collect`, can have an empty body, and it
compiles. But then it does nothing, with no message, and a method like
that is easy to forget. A method that throws `NotImplementedException`
cannot be forgotten: the first program that calls it stops there.

</details>

### Your turn

<div class="dl-world" data-world="game">

Read the description of this game. Which classes would you choose? Write
your cards first. Then write the skeleton: your classes in the first
cell, and in the second, a program that makes one object of each class.

> In the Cave of Echoes, a party of heroes explores rooms. Each hero has a
> name and health, and can carry up to three things. Rooms hold heroes and
> treasure, and a treasure has a name and a value in gold. Monsters wait
> in some rooms: a monster has a name, health and strength, and attacks
> the first hero it meets. The game ends when every hero is down (has 0
> health), or when the party has found 100 gold.

Your `Character`, from the pages before, could be one of the cards.

```csharp exec
id: from-cards-to-skeletons-2--game
// My skeleton for the Cave of Echoes: one class for each card.
```

```hint
Which nouns know several things? Which one keeps the rule about carrying
three things? And what is the one line inside a method that is not
written yet?
```

```csharp exec
id: from-cards-to-skeletons-2-program--game
// My program: one object of each class.
```

```solution
var ada = new Hero("Ada", 10);
var troll = new Monster("Troll", 12, 3);
var cup = new Treasure("gold cup", 40);
var hall = new Room("Great Hall");
Console.WriteLine($"{ada.Name}, {troll.Name}, {cup.Name}, {hall.Name}");

class Hero
{
    public string Name;
    public int Health { get; private set; }
    private List<Treasure> _bag = new List<Treasure>();

    public Hero(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void PickUp(Treasure treasure)    // refuses a fourth thing
    {
        throw new NotImplementedException();
    }

    public void TakeDamage(int amount)
    {
        throw new NotImplementedException();
    }
}

class Monster
{
    public string Name;
    public int Health { get; private set; }
    public int Strength;

    public Monster(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void Attack(Hero hero)
    {
        throw new NotImplementedException();
    }

    public void TakeDamage(int amount)
    {
        throw new NotImplementedException();
    }
}

record Treasure(string Name, int Gold);

class Room
{
    public string Name;
    private List<Hero> _heroes = new List<Hero>();
    private List<Treasure> _treasure = new List<Treasure>();

    public Room(string name)
    {
        Name = name;
    }

    public void Enter(Hero hero)
    {
        throw new NotImplementedException();
    }
}
---
One good answer, with three classes and a record. `Hero` keeps the
carrying rule, and `Room` holds heroes and treasure. A treasure only
knows two things, so it is a record here. It could become a class if the
party ever asked it a question. Your `Character` could be the `Hero`
card: it already has a name, health and `TakeDamage`, and its methods
are already written.

"The game ends when…" needs a home too. Would you give it a `Game` class,
or a method on `Room`? And compare `Hero` and `Monster`: both have a
name, health and `TakeDamage`. Writing that twice is the problem that a
later page, on inheritance, solves.
```

</div>

<div class="dl-world" data-world="solar-system">

Read the description of this mission. Which classes would you choose?
Write your cards first. Then write the skeleton: your classes in the
first cell, and in the second, a program that makes one object of each
class.

> The Outer Planets mission sends probes to Jupiter and Saturn. Each
> probe carries fuel, and can burn it to change course, but never more
> than it has. Each planet has a name, a distance from the Sun, and moons.
> A probe orbits one planet at a time, and photographs the moons of the
> planet it orbits. Mission control wants to know how much fuel is left
> across the mission, and which moons have been photographed.

Your `Probe`, from the pages before, could be one of the cards.

```csharp exec
id: from-cards-to-skeletons-2--solar-system
// My skeleton for the Outer Planets mission: one class for each card.
```

```hint
Which nouns know several things? Which one keeps the rule about fuel?
And what is the one line inside a method that is not written yet?
```

```csharp exec
id: from-cards-to-skeletons-2-program--solar-system
// My program: one object of each class.
```

```solution
var jupiter = new Planet("Jupiter", 778.5, new List<string> { "Io", "Europa", "Ganymede", "Callisto" });
var juno = new Probe("Juno", 100);
var mission = new Mission("Outer Planets");
Console.WriteLine($"{mission.Name}: {juno.Name} to {jupiter.Name}");

class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun
    public List<string> Moons;

    public Planet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        Moons = moons;
    }
}

class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public Planet Orbiting { get; private set; }    // null until it reaches a planet
    private List<string> _photographed = new List<string>();

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Burn(int kg)    // never more than it has
    {
        throw new NotImplementedException();
    }

    public void Orbit(Planet planet)
    {
        throw new NotImplementedException();
    }

    public void PhotographMoons()    // the moons of the planet it orbits
    {
        throw new NotImplementedException();
    }
}

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
        throw new NotImplementedException();
    }

    public int FuelLeft()
    {
        throw new NotImplementedException();
    }

    public List<string> Photographed()
    {
        throw new NotImplementedException();
    }
}
---
One good answer, with three classes. A moon is a name here, in a list on
its planet. If the mission started to ask about moons (their size, who
found them), a `Moon` class would be worth writing. `Orbiting` is a
property that no line gives a value yet, so it starts as `null`: C#'s
value for "no object". A probe that is still travelling orbits no
planet. Your `Probe` could be this card: it already keeps the rule about
fuel, and its `Burn` is already written.

Notice the types the methods return. `FuelLeft()` returns an `int`, and
`Photographed()` returns a `List<string>`. A skeleton makes you decide
the type of each answer, before any of it is written.
```

</div>

<div class="dl-world" data-world="your-own">

Can you write a paragraph about your world, of four or five sentences?
Say what things are in it, what each one knows, what each one does, and
one or two rules. Then do what this page did: find the nouns and the
verbs, write a card for each class, and write the skeleton. Is one of
your nouns a fixed list of values, which could be an enum? Your class
from the pages before should be one of the cards. Does it still look the
same, next to the others?

Your class is saved on the
[Methods and overloading](lesson:one-class-many-methods) page, in the
first cell of your own world.

```csharp exec
id: from-cards-to-skeletons-2--your-own
// My world's skeleton: one class for each card, and an enum if I need one.
```

```csharp exec
id: from-cards-to-skeletons-2-program--your-own
// My program: one object of each class.
```

</div>

## Looking back

Which noun in your world's description was hardest to decide about: a
class, a field, an enum, or none of them? And what could make you decide
differently later?

A challenge: can you complete the mission's skeleton, so that mission
control's two questions have answers? What is the longest drive, and how
many samples held ice? In one file, C# needs the program's statements
before any class, so the classes come last here.

```csharp challenge
var log = new Log();
var first = new Drive("Dune", 340);
first.Collect(new Sample("basalt", 20, false));
first.Collect(new Sample("clay", 45, true));
var second = new Drive("Crater", 1200);
second.Collect(new Sample("sandstone", 80, true));
log.Add(first);
log.Add(second);
Console.WriteLine(log.Longest());
Console.WriteLine(log.SamplesWithIce());

class Sample
{
    public string Name;
    public int Depth;    // centimetres below the surface
    public bool HasIce;

    public Sample(string name, int depth, bool hasIce)
    {
        Name = name;
        Depth = depth;
        HasIce = hasIce;
    }
}

class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}

class Log
{
    private List<Drive> _drives = new List<Drive>();

    public void Add(Drive drive)
    {
        throw new NotImplementedException();
    }

    public int Longest()    // the distance of the longest drive
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}
```

The [practice page](lesson:from-a-description-to-classes-practice) has
more problems on designing classes and on enums, and three from earlier
pages.

This is the last tutorial in the series "Classes and objects". The
series ends with a page of mixed problems. After that, a page on
inheritance takes two classes that share most of what they know, such as
a hero and a monster, and builds both from one.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Beck, K. and Cunningham, W. (1989). "A Laboratory for Teaching
Object-Oriented Thinking". *OOPSLA '89 Conference Proceedings*, 1–6.
<https://c2.com/doc/oopsla89/paper.html>. This is the short paper where
CRC cards began. It was written to teach what this page teaches: how to
think in objects before writing them.

Microsoft. *Enumeration types*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum>.
This page shows how to write an enum, how to choose the number behind
each value, and how to convert a value to its number, and a number to a
value.
