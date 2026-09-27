---
title: "Composition: objects inside other objects"
version: 2026.09.27.1
from: objects-inside-objects
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO6, FOOP-LO7, FOOP-LO8]
---

# Composition: objects inside other objects

A solar system is not one planet. It holds many, and it can answer
questions about all of them at once: how many moons are there in all?
Which planet is farthest out? Is a star system one more kind of planet,
or something else?

## A system holds its planets

A class's fields do not have to be numbers or text. A field can hold a
list of other objects. Here are two classes. A `Planet` knows its name,
its distance from its star, and its moons.

```csharp exec
id: a-system-holds-its-planets-planet
file: Planet.cs
class Planet
{
    public string Name;
    public double Distance;    // millions of km from its star
    private List<string> _moons;

    public Planet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        _moons = new List<string>(moons);    // a copy, not the caller's list
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

The constructor keeps a copy of the list it is given. Without the copy,
the planet and the program that made it would share one list, and the
program could change the planet's moons without asking the planet.

A `StarSystem` knows the name of its star, and it holds `Planet` objects.

```csharp exec
id: a-system-holds-its-planets-star-system
file: StarSystem.cs
class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    public int TotalMoons()
    {
        int total = 0;
        foreach (Planet planet in _planets)
        {
            total = total + planet.MoonCount();
        }
        return total;
    }
}
```

The program below uses both classes (rule 2: a class written in a cell
can be used by the cells below it). It makes a star system and adds three
planets to it. Each planet is made inside the call to `Add`, and has no
variable of its own: the star system's list is the only thing that holds
it. What will the program print?

```csharp exec
id: a-system-holds-its-planets-1
var sol = new StarSystem("the Sun");
sol.Add(new Planet("Earth", 149.6, new List<string> { "the Moon" }));
sol.Add(new Planet("Mars", 228.0, new List<string> { "Phobos", "Deimos" }));
sol.Add(new Planet("Jupiter", 778.5, new List<string> { "Io", "Europa", "Ganymede", "Callisto" }));
Console.WriteLine(sol.TotalMoons());
```

```predict
type: number

What will it print?
```

It prints `7`: one, two and four. (Jupiter has more than 90 known moons.
These are its four big ones.)

Here is what `StarSystem` does, and what it does not do:

- It never stores a distance or a moon of its own.
- Its field `_planets` is a `List<Planet>`: a list that holds `Planet`
  objects, and nothing else. It starts empty, and `Add` adds one planet
  at a time.
- `TotalMoons()` asks each planet for its own `MoonCount()`. It never
  reads a planet's list of moons itself. That list belongs to the planet.
  In C#, `StarSystem` could not read it even if it tried: `_moons` is
  private, so only `Planet`'s own code can use it.

When a class is built from objects of other classes, held in its fields,
we call it *composition*. A star system has planets.

Can you give `StarSystem` a `Farthest()` method, which returns the planet
farthest from the star? The method goes in the `StarSystem` cell above.
The program below calls it, so it does not compile until `StarSystem` has
that method, and that is expected. Write the method, and then run the
program again.

```csharp exec
id: a-system-holds-its-planets-2
expect: CS1061
var sol = new StarSystem("the Sun");
sol.Add(new Planet("Earth", 149.6, new List<string> { "the Moon" }));
sol.Add(new Planet("Jupiter", 778.5, new List<string> { "Io", "Europa", "Ganymede", "Callisto" }));
sol.Add(new Planet("Mars", 228.0, new List<string> { "Phobos", "Deimos" }));
Console.WriteLine(sol.Farthest().Name);
```

```inputs
sol.Farthest().Name
sol.Farthest().MoonCount()
new StarSystem("Vega").Farthest()    // throws: a star system with no planets
```

```hint
after: 2 errors
Which planet should the method start with, as the farthest so far? What
does it compare, for each planet in the list?
```

```hint
after: 3 errors
title: the method's first line
`Farthest` gives back a planet, so its first line is
`public Planet Farthest()`. The loop is the one `Heaviest()` used on
[Sequence, selection and iteration: the moves inside a method](lesson:the-moves-you-already-know):
start with `_planets[0]`, and keep any planet whose `Distance` is bigger.
```

```solution
var sol = new StarSystem("the Sun");
sol.Add(new Planet("Earth", 149.6, new List<string> { "the Moon" }));
sol.Add(new Planet("Jupiter", 778.5, new List<string> { "Io", "Europa", "Ganymede", "Callisto" }));
sol.Add(new Planet("Mars", 228.0, new List<string> { "Phobos", "Deimos" }));
Console.WriteLine(sol.Farthest().Name);

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    public int TotalMoons()
    {
        int total = 0;
        foreach (Planet planet in _planets)
        {
            total = total + planet.MoonCount();
        }
        return total;
    }

    public Planet Farthest()
    {
        Planet best = _planets[0];
        foreach (Planet planet in _planets)
        {
            if (planet.Distance > best.Distance)
            {
                best = planet;
            }
        }
        return best;
    }
}
---
`Jupiter`. The type in front of a method's name can be a class you wrote:
`public Planet Farthest()` gives back a `Planet`. It gives back the planet
itself, not its name, so a caller can ask it anything:
`sol.Farthest().MoonCount()` is 4.

A star system with no planets has no farthest planet. This version stops
with an `ArgumentOutOfRangeException` at `_planets[0]`, because the list
has no first item. What should it do instead?

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `StarSystem` replaces the one
above for this program (rule 4).
```

## Is a, or has a?

[Inheritance: one class built on another](lesson:one-parent-many-children)
built classes on other classes. What if a star system were built on
`Planet`? Here is `StarSystem` as a child class of `Planet`. It replaces
the `StarSystem` above for the cells below it (rule 4: a class written
again further down replaces the earlier one).

```csharp exec
id: is-a-or-has-a-star-system
file: StarSystem.cs
class StarSystem : Planet    // a star system is not a planet
{
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star) : base(star, 0, new List<string>())
    {
    }
}
```

The program asks the new star system for three things that a planet
knows: its name, its distance, and how many moons it has. What will
happen?

```csharp exec
id: is-a-or-has-a-1
var sol = new StarSystem("the Sun");
Console.WriteLine($"{sol.Name} {sol.Distance} {sol.MoonCount()}");
```

```predict
type: choice

What will happen?

- It prints the Sun 0 0
  - A star system is now a planet, with a distance and moons of its own.
- It does not compile
  - The compiler knows that a star system is not a planet.
- It stops with an exception
  - A star system has no distance to give.
```

It prints `the Sun 0 0`. The star system now has a distance from itself,
and moons of its own, and a caller can ask it for either. The program
compiled with no error and no warning. The mistake is in the design, not
in the code. The compiler checks names and types, and every one of them
fits.

C# did give one sign. To build a star system on `Planet`, its constructor
has to give `Planet`'s constructor a distance and a list of moons. A star
system has neither, so we invented them: 0, and an empty list. When a
child class has to invent values for its parent, it is often not a kind
of that parent. And the compiler now trusts `: Planet`, so a
`List<Planet>` would accept a whole star system as one of its planets.

A test helps. Say each sentence aloud, and ask which one is true:

| Sentence | True? | Choose |
|---|---|---|
| "A troll is a character." | Yes | inheritance |
| "A star system is a planet." | No | |
| "A star system has planets." | Yes | composition |

An *is a* relationship means that one class is a special kind of another
class. It calls for inheritance: a troll is a character. A *has a*
relationship means that one object holds other objects. It calls for
composition: a star system has planets.

When both seem to fit, many programmers choose "has a". An object that
holds another can replace it with a different one later. An object that
inherits keeps everything its parent has, even the parts that make no
sense for it.

Here are four pairs. For each one, which sentence is true, "is a" or "has
a"? And which does it call for, inheritance or composition?

- a rover and its crew
- a lander and a probe
- a room and a treasure
- a planet and its moons

<details class="dl-answer"><summary>answer</summary>

- A rover *has* a crew: composition. The `Rover` on
  [Designing classes](lesson:from-a-description-to-classes) keeps its
  crew in a list.
- A lander *is* a probe: inheritance, as `class Lander : Probe` on the
  page about inheritance.
- A room *has* treasure: composition.
- A planet *has* moons: composition. The `Planet` on this page keeps its
  moons in a list.

</details>

## Four cases where programmers disagree

The sentence test decides most cases. Here are four where experienced
programmers disagree, and the reasons for each side.

**A dictionary, a record or a class?** A planet could keep its moons in a
`Dictionary<string, int>`, with each moon's name as a key and its width
in km as the value:
`new Dictionary<string, int> { ["Io"] = 3643, ["Europa"] = 3122 }`.
That needs little code, and it is fine while a moon knows one number.
But every value in a C# dictionary has the same type. The day a moon also
needs the name of the person who found it, which is text, the dictionary
no longer fits.

A record, from
[Designing classes](lesson:from-a-description-to-classes), holds values
of different types in one line:
`record Moon(string Name, int Width, string FoundBy);`. A class is useful
when a moon keeps a rule (a width is never negative) or answers a
question (is it wider than our Moon?). Many designs start with the
smallest thing that works, and write a class the day the first rule
arrives.

**A child class or a flag?** A body in space might be a planet or a dwarf
planet. One design has two child classes, `class Planet : Body` and
`class DwarfPlanet : Body`. Another has one class, with a field that says
which kind it is. That field is a *flag*: a value that says which of a few
cases an object is in. In C#, its type can be an enum, as `Role` was on
[Designing classes](lesson:from-a-description-to-classes), so the kind is
always one of a fixed list.

```csharp exec
id: cases-that-are-not-clear-cut-body
file: Body.cs
enum BodyKind
{
    Planet,
    DwarfPlanet
}

class Body
{
    public string Name;
    public BodyKind Kind;

    public Body(string name, BodyKind kind)
    {
        Name = name;
        Kind = kind;
    }

    public string Describe()
    {
        if (Kind == BodyKind.Planet)
        {
            return $"{Name}, a planet";
        }
        else
        {
            return $"{Name}, a dwarf planet";
        }
    }
}
```

```csharp exec
id: cases-that-are-not-clear-cut-1
var pluto = new Body("Pluto", BodyKind.Planet);
Console.WriteLine(pluto.Describe());
pluto.Kind = BodyKind.DwarfPlanet;    // astronomers decided this in 2006
Console.WriteLine(pluto.Describe());
```

It prints `Pluto, a planet`, then `Pluto, a dwarf planet`. With a flag,
Pluto's change is one line. With child classes, it is harder: an object
cannot change its class, so the program has to make a new `DwarfPlanet`
and put it everywhere the old Pluto was.

But suppose astronomers name a third kind next year. The child classes
take one new class, and nothing else changes. The flag takes a new value
in `BodyKind`, and a new `else if` in `Describe`, and in every other
method that asks which kind a body is.

Which design is easier to change later?

- The flag, always.
- Child classes, always.
- It depends on which change is more likely.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

It depends on which change is more likely. A flag makes it easy for a
thing to change its kind: one line. Child classes make it easy to add a
new kind: one new class, and no old code changes.

</details>

**When "is a" breaks.** In maths, a square is a rectangle. On
[Inheritance: a closer look at "is a"](lesson:when-is-a-breaks), a
`Square` built on a `Rectangle` stopped being a square when it was
stretched. One fix gave `Square` a `Stretch` of its own, which changes
both sides. Here are both classes, with that fix.

```csharp exec
id: cases-that-are-not-clear-cut-shapes
file: Shapes.cs
class Rectangle
{
    public int Width { get; protected set; }
    public int Height { get; protected set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public int Area()
    {
        return Width * Height;
    }

    public virtual void Stretch(int factor)
    {
        Width = Width * factor;
    }
}

class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }

    public override void Stretch(int factor)    // a square keeps its sides equal
    {
        Width = Width * factor;
        Height = Height * factor;
    }
}
```

`AreaAtDoubleWidth` was written for rectangles. It stretches a shape to
twice its width, and returns the new area. It is given a 3 by 3
rectangle, and then a square with sides of 3.

```csharp exec
id: cases-that-are-not-clear-cut-2
Console.WriteLine(AreaAtDoubleWidth(new Rectangle(3, 3)));
Console.WriteLine(AreaAtDoubleWidth(new Square(3)));

int AreaAtDoubleWidth(Rectangle shape)
{
    shape.Stretch(2);
    return shape.Area();
}
```

```predict
type: choice

What will the second line print?

- 18
  - Doubling the width doubles the area, for any rectangle.
- 36
  - The square's own `Stretch` doubles both sides.
```

It prints `18`, then `36`. `AreaAtDoubleWidth` was written for
rectangles, where doubling the width doubles the area. Every rectangle
keeps that promise, except the square. A square must change its height
when its width changes, so it breaks the promise. "Is a" has to hold for
everything the parent does, not only for what the thing is.

[Interfaces: one promise, many classes](lesson:many-classes-one-promise)
gave another answer: an interface with `Area()` and no `Stretch`, such as
`IShape`. `Rectangle` and `Square` can each keep that promise, and
neither is built on the other.

**Two things at once.** An astronaut can be a commander and a scientist,
both at once, and change roles between missions.
`class Commander : Astronaut` and `class Scientist : Astronaut` leave no
place for someone who is both, because a C# class has only one parent
class.

An interface gives one way for a class to be two things: a class can keep
several promises, as in `class Astronaut : ICommander, IScientist`. That
fits when every object of the class is always both. But the promises a
class keeps are fixed when the program is compiled, and an object cannot
change its class. A person's roles change. Composition allows that. An
astronaut *has* roles. Here the roles are an enum, and each astronaut
keeps a list of them.

```csharp exec
id: cases-that-are-not-clear-cut-astronaut
file: Astronaut.cs
enum Role
{
    Commander,
    Scientist,
    Pilot
}

class Astronaut
{
    public string Name;
    private List<Role> _roles;

    public Astronaut(string name, List<Role> roles)
    {
        Name = name;
        _roles = new List<Role>(roles);
    }

    public bool Can(Role role)
    {
        return _roles.Contains(role);
    }
}
```

```csharp exec
id: cases-that-are-not-clear-cut-3
var peggy = new Astronaut("Peggy Whitson", new List<Role> { Role.Commander, Role.Scientist });
Console.WriteLine($"{peggy.Can(Role.Scientist)} {peggy.Can(Role.Pilot)}");
```

It prints `True False`. Peggy Whitson, a biochemist, was the first woman
to command the International Space Station. A person is rarely one kind
of thing for life.

A new mission changes the list, not the class. Can you give `Astronaut` a
method `AddRole(Role role)`, and then add the role of pilot for Peggy
before the program asks?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```csharp
    public void AddRole(Role role)
    {
        if (!_roles.Contains(role))
        {
            _roles.Add(role);
        }
    }
```

With `peggy.AddRole(Role.Pilot);` before the last line, the program
prints `True True`. Peggy is the same object as before, with the same
name. Only her list of roles changed. The `if` keeps each role in the list
once.

</details>

### Your turn: your class, fifth version

This is the fifth version of your class: a new class that holds objects
of the classes you already have. In your world, the first cells hold your
classes as they stood at the end of
[Inheritance: one class built on another](lesson:one-parent-many-children).
Write the new class in the cell after them, and then run the program
below it.

<div class="dl-world" data-world="game">

The first two cells hold `Character` and `Healer`, the fourth version.

```csharp exec
id: your-class-5-so-far--game
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
id: your-class-5-so-far-healer--game
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

A room holds characters. Can you finish `Room`, with an
`Enter(Character character)` method that refuses anyone already inside,
and a `Standing()` method that returns the names of everyone who is not
down (everyone whose health is above 0)? A `ToString()` that says how
many are standing is a useful extra.

The program calls `Enter` and `Standing`, so it does not compile until
`Room` has them, and that is expected.

```csharp exec
id: your-class-5--game
file: Room.cs
class Room
{
    public string Name;

    public Room(string name)
    {
        Name = name;
    }
}
```

```csharp exec
id: your-class-5-program--game
expect: CS1061
var cave = new Room("Cave");
var ada = new Character("Ada", 10);
cave.Enter(ada);
cave.Enter(new Healer("Mira", 10));
cave.Enter(ada);
ada.TakeDamage(12);
Console.WriteLine(string.Join(", ", cave.Standing()));
```

```inputs
cave.Standing()
cave.ToString()
```

```hint
after: 2 errors
What does a room need to remember about the characters inside it? Which
method of a `List` tells you whether something is already in it? And
which of `Character`'s methods answers whether someone is down?
```

```hint
after: 3 errors
title: the methods' first lines
`Enter` gives back nothing, and `Standing` gives back a list of names:
`public void Enter(Character character)` and
`public List<string> Standing()`. The room keeps its characters in a
field, `private List<Character> _characters = new List<Character>();`.
```

```solution
var cave = new Room("Cave");
var ada = new Character("Ada", 10);
cave.Enter(ada);
cave.Enter(new Healer("Mira", 10));
cave.Enter(ada);
ada.TakeDamage(12);
Console.WriteLine(string.Join(", ", cave.Standing()));

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
---
A refusal for Ada's second entry, then `Mira`. `Enter` takes a
`Character`, and a healer is a character, so Mira can enter too.
`Standing()` asks each character `IsDown()`, and a healer answers as a
character does. `Room` keeps one rule of its own: nobody is inside twice.

`Contains` found Ada the second time because she is the same object. A
new `Character("Ada", 10)`, with the same name and the same health, is a
different object, and `Contains` does not find it, so that one could
enter.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Room` replaces the one above
for this program (rule 4).
```

</div>

<div class="dl-world" data-world="solar-system">

The first two cells hold `Probe` and `Lander`, the fourth version.

```csharp exec
id: your-class-5-so-far--solar-system
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
id: your-class-5-so-far-lander--solar-system
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

A mission has probes. Can you finish `Mission`, with a
`Launch(Probe probe)` method, a `TotalFuel()` method, and a
`ReadyFor(int kg)` method that returns the names of the probes that can
burn that much now?

The program calls `Launch`, `TotalFuel` and `ReadyFor`, so it does not
compile until `Mission` has them, and that is expected.

```csharp exec
id: your-class-5--solar-system
file: Mission.cs
class Mission
{
    public string Name;

    public Mission(string name)
    {
        Name = name;
    }
}
```

```csharp exec
id: your-class-5-program--solar-system
expect: CS1061
var outer = new Mission("Outer Planets");
var voyager = new Probe("Voyager", 70);
var philae = new Lander("Philae", 40);
outer.Launch(voyager);
outer.Launch(philae);
philae.Land();
Console.WriteLine(outer.TotalFuel());
Console.WriteLine(string.Join(", ", outer.ReadyFor(30)));
```

```inputs
outer.TotalFuel()
outer.ReadyFor(30)
outer.ReadyFor(100)
```

```hint
after: 2 errors
Both methods need a loop over the mission's probes. Which of `Probe`'s
members answer "how much fuel?" and "can you burn this much?", for a
lander too?
```

```hint
after: 3 errors
title: the methods' first lines
`public void Launch(Probe probe)`, `public int TotalFuel()` and
`public List<string> ReadyFor(int kg)`. The mission keeps its probes in a
field, `private List<Probe> _probes = new List<Probe>();`.
```

```solution
var outer = new Mission("Outer Planets");
var voyager = new Probe("Voyager", 70);
var philae = new Lander("Philae", 40);
outer.Launch(voyager);
outer.Launch(philae);
philae.Land();
Console.WriteLine(outer.TotalFuel());
Console.WriteLine(string.Join(", ", outer.ReadyFor(30)));

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
---
`110`, then `Voyager`. Philae has 40 kg, and it is still not ready: it
has landed, and a lander's own `CanBurn` says so. `Mission` never asks
which kind of probe it has. That is polymorphism, from the page about
inheritance, at work inside a class that holds other objects.

`TotalFuel` reads each probe's `Fuel`. Its `set` is private, so the
mission can read the fuel, and it can never change it.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Mission` replaces the one above
for this program (rule 4).
```

</div>

<div class="dl-world" data-world="your-own">

What in your world holds several of your things? A shop holds stock, a
herd holds animals, a library holds books. Can you write that class, with
at least one method that asks each thing it holds a question?

Your classes are saved on the
[Inheritance](lesson:one-parent-many-children) page, in the first cell of
your own world. Copy them into the first cell here. Write the new class in
the second cell, and a program that uses it in the third.

```csharp exec
id: your-class-5-so-far--your-own
// My classes so far: the fourth version.
```

```csharp exec
id: your-class-5--your-own
// My class that holds my other objects.
```

```csharp exec
id: your-class-5-program--your-own
// My program: one object that holds several others, and one question to it.
```

</div>

## Looking back

Of the four cases where programmers disagree, which one would you have
decided differently before this page? And which one are you still not
sure about?

A challenge: Alpha Centauri has two stars close together, A and B, and a
third, Proxima, farther out. Can you change `StarSystem` so that it can
hold more than one star, without changing how planets are added or
counted? In one file, C# needs the program's statements before any class,
so the classes come last here.

```csharp challenge
var alpha = new StarSystem("Alpha Centauri A");
Console.WriteLine(alpha.Star);

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    public int TotalMoons()
    {
        int total = 0;
        foreach (Planet planet in _planets)
        {
            total = total + planet.MoonCount();
        }
        return total;
    }
}

class Planet
{
    public string Name;
    public double Distance;    // millions of km from its star
    private List<string> _moons;

    public Planet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        _moons = new List<string>(moons);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

The [practice page](lesson:objects-inside-objects-practice) has more
problems on classes that hold other objects, and on choosing between "is
a" and "has a", and three from earlier pages.

The next page is a closer look at what `=` does with an object: does it
make a copy, or give the same object a second name? After it, a page on
testing writes tests that find the mistakes a class hides.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Tutorial: Introduction to Inheritance*. C# fundamentals.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/inheritance>.
Its section "Inheritance and an "is a" relationship" says when a child
class fits, and when a value in a field fits better: a car made by
Packard is a car with the value "Packard", not a `Packard` class. A note
in the same section says that an interface is for a different
relationship, which it calls "can do". Later, its `Square` and
`Rectangle` are both children of one `Shape`, and neither is built on the
other.

Downey, A. B. (2015). *Think Python: How to Think Like a Computer
Scientist* (2nd ed.). Green Tea Press. Free at
<https://greenteapress.com/wp/think-python-2e/>. Section 18.8, "Class
diagrams", names the two relationships on this page: IS-A and HAS-A. Its
code is Python, and the idea is the same in C#.
