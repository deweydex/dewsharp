---
title: "Methods and overloading: giving one class more to do"
version: 2026.09.27.1
from: one-class-many-methods
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO3, FOOP-LO4, FOOP-LO8]
---

# Methods and overloading: giving one class more to do

Light from the Sun takes time to reach a planet. Here is a class for a
planet, with one method, which finds how many minutes the light takes.
The distances are averages, in millions of kilometres. The class is in the
first cell, and the program in the second cell uses it (rule 2: a class
written in a cell can be used by the cells below it).

`Math.Round(x, 1)` gives `x` rounded to one decimal place. To Earth, the
light takes 8.3 minutes. How long do you think it takes to reach Neptune?

```csharp exec
id: sunlight-1
class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double LightMinutes()
    {
        double seconds = Distance * 1000000 / 299792;    // light: 299,792 km a second
        return Math.Round(seconds / 60, 1);
    }
}
```

```csharp exec
id: sunlight-2
var earth = new Planet("Earth", 149.6);
var neptune = new Planet("Neptune", 4515.0);
Console.WriteLine(earth.LightMinutes());
Console.WriteLine(neptune.LightMinutes());
```

```predict
type: number
tolerance: 10

How many minutes for Neptune?
```

It prints `8.3`, then `251`: more than four hours. When you see Neptune
through a telescope, you see it as it was four hours ago. (C# prints
`251`, not `251.0`. A `double` with nothing after the point prints as a
whole number.)

## Giving it more to do

A planet can answer more than one question. Below, the class grows two
more methods. `IsFartherThan(Planet other)` compares this planet with
another one. `Describe()` makes a sentence, and asks `LightMinutes()` for
its number. This `Planet` replaces the one above for the cells below it
(rule 4: a class written again further down replaces the earlier one).
What will the two lines of the program print?

```csharp exec
id: giving-it-more-to-do-1
class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double LightMinutes()
    {
        double seconds = Distance * 1000000 / 299792;
        return Math.Round(seconds / 60, 1);
    }

    public bool IsFartherThan(Planet other)    // new
    {
        return Distance > other.Distance;
    }

    public string Describe()    // new
    {
        return $"{Name}: sunlight takes {LightMinutes()} minutes";
    }
}
```

```csharp exec
id: giving-it-more-to-do-2
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0);
Console.WriteLine(mars.IsFartherThan(earth));
Console.WriteLine(mars.Describe());
```

It prints `True`, then `Mars: sunlight takes 12.7 minutes`.

Notice what the new methods did not need. Neither one was given the
distance. Both found it in the field `Distance`, on the object that the
method was called on. `IsFartherThan` also reads another planet's
distance, as `other.Distance`, because `other` is a `Planet` too. And
`Describe` does not calculate the minutes again. It calls
`LightMinutes()`, by its name alone. Inside a class, a method can call
another method of the same object by its name, as it reads a field by its
name. (`this.LightMinutes()` means the same.)

This is *reusable* code: code that is written once and used again, in
many places. Each new job for a planet is a method that can use
everything the object already carries, and it works for every planet you
make.

A method outside the class can be reused too:
`LightMinutes(double distance)` would work on any distance. The
difference is where the data lives. That method needs the distance given
to it on every call. A method of `Planet` finds the distance on the
object, so a call only has to say what is new.

Can you add a `LightHours()` method, which returns the time in hours,
rounded to one decimal place? Can it use `LightMinutes()`?

The program below calls `LightHours()`. Until the class has that method,
the program does not compile, and that is expected. Run it first, and read
what the compiler says is missing. Then add the method to the class in the
first cell of this section, and run the program again.

```csharp exec
id: giving-it-more-to-do-3
expect: CS1061
var neptune = new Planet("Neptune", 4515.0);
Console.WriteLine(neptune.LightHours());
```

```inputs
neptune.LightHours()
new Planet("Jupiter", 778.5).LightHours()
```

```hint
after: 2 errors
Which method already knows the minutes, and how many minutes are in an
hour? How does one method of `Planet` call another?
```

```hint
after: 3 errors
title: the method's first line
A method that gives back a `double` says so before its name:
`public double LightHours()`. Its last line is `return`, with the value it
gives back.
```

```solution
var neptune = new Planet("Neptune", 4515.0);
Console.WriteLine(neptune.LightHours());

class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double LightMinutes()
    {
        double seconds = Distance * 1000000 / 299792;
        return Math.Round(seconds / 60, 1);
    }

    public bool IsFartherThan(Planet other)
    {
        return Distance > other.Distance;
    }

    public string Describe()
    {
        return $"{Name}: sunlight takes {LightMinutes()} minutes";
    }

    public double LightHours()    // new
    {
        return Math.Round(LightMinutes() / 60, 1);
    }
}
---
`4.2` hours for Neptune. `LightHours` asks `LightMinutes` and divides by
60, so the calculation with the speed of light is written in one place
only. If the speed of light in `LightMinutes` were mistyped, a fix there
would fix both methods.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Planet` replaces the one above
for this program (rule 4).
```

## Data that belongs together

An object can keep as many fields as it needs. A planet's moons belong to
it, so they can live in the planet too, in a list. This version does not
have the methods from above, to keep the cell short.

The list `_moons` is private, and `AddMoon` keeps a rule: no moon is added
twice. `_moons.Contains(moon)` is `true` when the list already holds that
moon. What will the last line of the program print?

```csharp exec
id: data-that-belongs-together-1
class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun
    private List<string> _moons = new List<string>();

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public void AddMoon(string moon)
    {
        if (_moons.Contains(moon))
        {
            Console.WriteLine($"Refused: {moon} is already a moon of {Name}.");
            return;
        }
        _moons.Add(moon);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

```csharp exec
id: data-that-belongs-together-2
var earth = new Planet("Earth", 149.6);
earth.AddMoon("the Moon");
var mars = new Planet("Mars", 228.0);
mars.AddMoon("Phobos");
mars.AddMoon("Deimos");
mars.AddMoon("Phobos");
foreach (Planet planet in new List<Planet> { earth, mars })
{
    Console.WriteLine($"{planet.Name} {planet.MoonCount()}");
}
```

```predict
type: choice

What will the last line print?

- Mars 2
  - The second Phobos is refused.
- Mars 3
  - Every call to `AddMoon` adds a moon.
```

The second Phobos is refused, and the last line is `Mars 2`.

Notice what the loop does not need. There is no second list of moon
counts, which would have to match a list of planets, in the same order.
Each planet carries its own name, distance and moons. To get one planet's
name and moons together, we ask that one planet. `new List<Planet>
{ earth, mars }` is a list of objects: a list can hold objects of a class
you wrote, as it holds numbers and strings.

Why is `_moons` private, when `Name` and `Distance` are public? The moons
have a rule to keep: no moon is added twice. If the list were public, a
program could write `mars._moons.Add("Phobos");`, and the rule in
`AddMoon` would never run. Nothing on this page changes a planet's name or
distance after the planet is made, and no rule guards them. A field is
made private when there is a rule to keep.

## One name, two methods: overloading

`IsFartherThan(Planet other)` compares a planet with another planet. But
sometimes a program has only a distance, such as 778.5 million km,
Jupiter's distance from the Sun. It would be useful to write
`mars.IsFartherThan(778.5)` too.

A class can have two methods with the same name, if their parameters are
different. Here is `Planet` with two methods called `IsFartherThan`: one
takes a `Planet`, and one takes a `double`.

```csharp exec
id: overloading-1
class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public bool IsFartherThan(Planet other)
    {
        return Distance > other.Distance;
    }

    public bool IsFartherThan(double distance)    // new
    {
        return Distance > distance;
    }
}
```

```csharp exec
id: overloading-2
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0);
Console.WriteLine(mars.IsFartherThan(earth));
Console.WriteLine(mars.IsFartherThan(778.5));    // Jupiter's distance
```

It prints `True`, then `False`.

Methods in one class with the same name and different parameters are
*overloads* of that name, and writing them is *overloading*. C# chooses
which overload to call from the arguments: how many there are, and what
type each one has. `earth` is a `Planet`, so the first call runs the
method that takes a `Planet`. `778.5` is a `double`, so the second call
runs the method that takes a `double`.

You have used overloads before. `Math.Round` has an overload that takes
only a number, and one that also takes how many decimal places to keep.
`Console.WriteLine` has overloads for a `string`, an `int`, a `double`, a
`bool` and more.

C# makes its choice when it compiles the program, before anything runs.
So what happens when no overload fits? Can you add the line
`Console.WriteLine(mars.IsFartherThan("Jupiter"));` to the program? What
does the compiler say?

<details class="dl-answer"><summary>what the compiler says</summary>

It does not compile: `error CS1503: Argument 1: cannot convert from
'string' to 'Planet'`. The message names only one of the two methods, but
neither of them takes a string, so nothing runs.

</details>

### A second constructor

A constructor can have overloads too. Here is the planet with moons again,
with a second constructor, which takes a list of moons as well.

```csharp exec
id: overloading-3
class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun
    private List<string> _moons = new List<string>();

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public Planet(string name, double distance, List<string> moons)
        : this(name, distance)
    {
        foreach (string moon in moons)
        {
            AddMoon(moon);
        }
    }

    public void AddMoon(string moon)
    {
        if (_moons.Contains(moon))
        {
            Console.WriteLine($"Refused: {moon} is already a moon of {Name}.");
            return;
        }
        _moons.Add(moon);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

```csharp exec
id: overloading-4
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0, new List<string> { "Phobos", "Deimos" });
Console.WriteLine($"{earth.Name} {earth.MoonCount()}");
Console.WriteLine($"{mars.Name} {mars.MoonCount()}");
```

It prints `Earth 0`, then `Mars 2`. Earth is made with two arguments, so C#
runs the first constructor. Mars is made with three, so C# runs the
second.

The line `: this(name, distance)` belongs to the second constructor. It
means: first run the other constructor of this class, the one that takes
a name and a distance. That constructor stores `Name` and `Distance`.
Then the second constructor's own body runs, and adds each moon. So the
lines that store the name and the distance are written once, in one
constructor, and both constructors use them.

The second constructor adds the moons with `AddMoon`, not with
`_moons.Add`. So the rule still holds for the moons in its list. Can you
make Mars with `"Phobos"` twice in its list? What does the program print
then?

## One value for the whole class

Every field so far belongs to one object. Earth's distance and Mars's
distance are two separate values. A field like this is an *instance
field*. *Instance* is another word for an object: `mars` is an instance
of `Planet`, and each instance has its own value of the field.

Sometimes a value is the same for every object of a class. Every planet
here orbits the same star. A *static field* belongs to the class itself,
not to any one object, and there is only one of it. The word `static` in
front of a field makes it belong to the class.

In the class below, `Star` is a static field. The method `Orbits()` reads
it by its name alone, as it reads `Name`. Near the end, the program
changes `Star` once, through the class: `Planet.Star`. What will the last
two lines print?

```csharp exec
id: class-attributes-and-instance-attributes-1
class Planet
{
    public static string Star = "the Sun";

    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public string Orbits()
    {
        return $"{Name} orbits {Star}";
    }
}
```

```csharp exec
id: class-attributes-and-instance-attributes-2
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0);
Console.WriteLine(earth.Orbits());
Console.WriteLine(mars.Orbits());

Planet.Star = "Sol";    // the Sun's Latin name
Console.WriteLine(earth.Orbits());
Console.WriteLine(mars.Orbits());
```

```predict
type: choice

What will the last two lines print?

- Earth orbits Sol, then Mars orbits Sol
  - There is one `Star`, and both planets read it.
- Earth orbits the Sun, then Mars orbits the Sun
  - Each planet kept its own copy of `Star` when it was made.
- Earth orbits the Sun, then Mars orbits Sol
  - Only the planet made last sees the change.
```

Both planets show `Sol`. There is only one `Star`, kept in the class, and
`earth.Orbits()` and `mars.Orbits()` both read that one value. Their
distances stay separate, because each distance is an instance field.

Outside the class, a program uses a static field through the name of the
class, as in `Planet.Star`. What if it uses it through a planet instead?
The next program is meant to fail. Run it, and read the message.

```csharp exec
id: class-attributes-and-instance-attributes-3
expect: CS0176
var earth = new Planet("Earth", 149.6);
Console.WriteLine(earth.Star);
```

It does not compile: `error CS0176: Member 'Planet.Star' cannot be
accessed with an instance reference; qualify it with a type name
instead`. The *members* of a class are the things declared inside it,
such as its fields, properties and methods. An *instance reference* is a name for an object, such as
`earth`. *Qualify it with a type name* means: write the name of the class
in front of it, as `Planet.Star`. The compiler checks the whole program
before it runs any of it, so nothing ran.

(In Python, `earth.star` works. And `earth.star = "Proxima"` makes a new
value on Earth alone, with no message, and leaves the star of every other
planet as it was. Most Python programmers make that mistake at least
once. In C#, the compiler refuses both lines.)

A static field can also keep a count across every object. Here, the
constructor adds one to `PlanetsMade` each time a planet is made. How
many does the last line report?

```csharp exec
id: class-attributes-and-instance-attributes-4
class Planet
{
    public static int PlanetsMade = 0;

    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
        PlanetsMade = PlanetsMade + 1;
    }
}
```

```csharp exec
id: class-attributes-and-instance-attributes-5
var mercury = new Planet("Mercury", 57.9);
var venus = new Planet("Venus", 108.2);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(Planet.PlanetsMade);
```

It prints `3`. Each planet adds one to the same count, because there is
only one `PlanetsMade`, in the class. The count belongs to the class, so
the program reads it through the class, as `Planet.PlanetsMade`. Each Run
starts a new program (rule 1), so the count starts at 0 again on every
run.

You have used static members since your first program. `Math.Round`,
`Math.Max` and `Console.WriteLine` are static methods. You call each one
through the name of its class, `Math` or `Console`, and you never make a
`Math` object first.

| | Instance field | Static field |
|---|---|---|
| How it is written | without `static`: `public double Distance;` | with `static`: `public static string Star = "the Sun";` |
| Who has it | each object has its own value | one value, for the whole class |
| Inside the class | by its name: `Distance` | by its name: `Star` |
| Outside the class | through an object: `mars.Distance` | through the class: `Planet.Star` |
| What a change does | `mars.Distance = 230.0;` changes Mars's only | `Planet.Star = "Sol";` changes it for every planet |

### Your turn: your class, third version

This is the third version of the class you grew in
[Encapsulation: private fields, public methods and properties](lesson:keeping-details-inside-an-object).
It gets a method that answers a question, used inside another method, and
a static field that the whole class shares.

<div class="dl-world" data-world="game">

Ada heals to 13, above the 10 a character can have, and Grace heals after
she is down (her health is 0). Can you give `Character` a static field
`MaxHealth`, set to 10, and a method `IsDown()`? Then can you make `Heal`
refuse to heal a character who is down, using `IsDown()`, and never raise
the health above `MaxHealth`?

The first cell holds `Character` as
[Encapsulation](lesson:keeping-details-inside-an-object) left it. Change
the class there, and then run the program in the second cell.

```csharp exec
id: your-class-3--game
file: Character.cs
class Character
{
    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
```

```csharp exec
id: your-class-3-program--game
var ada = new Character("Ada", 8);
ada.Heal(5);
Console.WriteLine(ada);
var grace = new Character("Grace", 3);
grace.TakeDamage(5);
grace.Heal(4);
Console.WriteLine(grace);
```

```inputs
ada.ToString()
grace.ToString()
ada.IsDown()
grace.IsDown()
```

```hint
after: 2 runs
`IsDown()` answers a question, so what type does it return? Inside
`Heal`, how do you ask it about this character? And `Math.Min` gives the
smaller of two values, as `Math.Max` gives the larger.
```

```solution
var ada = new Character("Ada", 8);
ada.Heal(5);
Console.WriteLine(ada);
var grace = new Character("Grace", 3);
grace.TakeDamage(5);
grace.Heal(4);
Console.WriteLine(grace);

class Character
{
    public static int MaxHealth = 10;

    public string Name;
    public int Health { get; private set; }

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

    public void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
---
`Ada (health 10)`, then a refusal, and `Grace (health 0)`. `Heal` asks
`IsDown()`, and reads the limit as `MaxHealth`, so a change to that one
line changes the limit for every character. What does `ada.Heal(-50)` do
to this version? And could a second constructor, `new Character("Alan")`,
start a character at `MaxHealth`?
```

</div>

<div class="dl-world" data-world="solar-system">

Voyager's tank holds 100 kg, but `Refuel` will fill it past that. Can you
give `Probe` a static field `TankSize`, set to 100, and a method
`CanBurn(int kg)`, which says whether the probe has enough fuel for a
burn? Then can you make `Burn` use `CanBurn` for its check, and `Refuel`
never fill past `TankSize`?

The first cell holds `Probe` as
[Encapsulation](lesson:keeping-details-inside-an-object) left it. Change
the class there, and then run the program in the second cell.

```csharp exec
id: your-class-3--solar-system
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

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
```

```csharp exec
id: your-class-3-program--solar-system
var voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Burn(80);
voyager.Refuel(50);
Console.WriteLine(voyager);
```

```inputs
voyager.CanBurn(80)
voyager.CanBurn(150)
voyager.ToString()
```

```hint
after: 2 runs
What does `CanBurn(kg)` return: a number, or `true` or `false`? Inside
`Burn`, how do you ask it about this probe? `!` in front of a `bool` gives
the opposite. And `Math.Min` gives the smaller of two values, as
`Math.Max` gives the larger.
```

```solution
var voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Burn(80);
voyager.Refuel(50);
Console.WriteLine(voyager);

class Probe
{
    public static int TankSize = 100;

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

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
---
The refusal, then `Voyager (fuel 100 kg)`. `Burn` asks `CanBurn(kg)`, and
a program can ask it too, before a burn: `voyager.CanBurn(80)`. What does
`voyager.Burn(-50)` do to this version? And could a second constructor,
`new Probe("Juno")`, start a probe with a full tank?
```

</div>

<div class="dl-world" data-world="your-own">

Can you give your class a method that answers a question about one
object, and use it inside another method? And is there a value that every
object of your class shares, which could be a static field?

Your class is saved on the
[Encapsulation](lesson:keeping-details-inside-an-object) page, in the
first cell of your own world. Copy it into the first cell here to start,
and write a program that uses it in the second.

```csharp exec
id: your-class-3--your-own
// My class, third version: a question, used by another method, and a static field.
```

```csharp exec
id: your-class-3-program--your-own
// My program: objects made from my class, and a call that asks the question.
```

</div>

## Looking back

Most methods on this page found what they needed on the object, with
nothing given to them. So when does a method still need a parameter?
What do the parameters of `IsFartherThan(Planet other)` and
`AddMoon(string moon)` bring, that the object does not already have?

A challenge: Johannes Kepler found that a planet's year, in Earth years,
is its distance from the Sun, measured in Earth distances, to the power
1.5. `Math.Pow(x, 1.5)` gives `x` to the power 1.5. Can you give `Planet`
a `YearLength()` method? How long is a year on Neptune? In one file, C#
needs the program's statements before any class, so the class comes last
here.

```csharp challenge
Console.WriteLine(new Planet("Mars", 228.0).YearLength());
Console.WriteLine(new Planet("Neptune", 4515.0).YearLength());

class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double YearLength()
    {
        // Earth is 149.6 million km from the Sun.
        return 0;
    }
}
```

The [practice page](lesson:one-class-many-methods-practice) has more
problems on methods, overloading and static fields, and three from
earlier pages.

Next, [Designing classes: from a description to classes and enums](lesson:from-a-description-to-classes)
decides what the classes should be, before any code is written.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Member overloading*. .NET framework design guidelines.
<https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/member-overloading>.
This page gives Microsoft's advice for overloads: in every overload of a
name, use the same parameter names, and keep the parameters in the same
order, so that the overloads are easy to use.

Microsoft. *Static classes and static class members*. C# programming
guide.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members>.
This page shows static fields and static methods, and a whole class made
of them, as `Math` is.

Microsoft. *Using constructors*. C# programming guide.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/using-constructors>.
This page shows a class with several constructors, and a constructor that
calls another one with `: this(...)`.

NASA. *Planetary Fact Sheet*.
<https://nssdc.gsfc.nasa.gov/planetary/factsheet/>. It has the distances
on this page, and much more about every planet, for your own `Planet`
class.
