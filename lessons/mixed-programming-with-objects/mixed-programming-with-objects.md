---
title: "Mixed problems: programming with objects"
version: 2026.09.27.1
from: mixed-programming-with-objects
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO3, FOOP-LO4, FOOP-LO6, FOOP-LO7, FOOP-LO8, FOOP-LO10]
---

# Mixed problems: programming with objects

Every problem here uses more than one page of this course, and none of
them says which. You need to decide whether a problem wants a rule, a
child class, a container, an interface, a test, or several of them. That
is a skill of its own, apart from writing any one of them.

Most problems have more than one design that works. Where a problem has a
real decision in it, the answer says what was chosen and why.

Try each problem before you open anything under it, and run the cells to
test your guesses. Some cells are meant not to compile, or to stop with
an exception, and the problem says so before you run them. The cells
follow the rules of the road: a class written in a cell can be used by
the cells below it, a class written again further down replaces the
earlier one, and variables stay in their cell.

Problem 4 is set in the world you chose under the title. The other
problems are the same in every world.

Every problem runs here, in the browser, and needs nothing else. You can
also do problem 13 in Visual Studio, in the solution you made for your
world on [Your world, playable](lesson:your-world-playable).

## 1. A lifeboat with no name

A vessel has a name, and a lifeboat is a kind of vessel with seats.
`Vessel` has two constructors. One takes a name. The other is for a
vessel that has no name yet, and it calls the first with `"unnamed"`.

```csharp exec
id: a-lifeboat-with-no-name-1
file: Vessel.cs
class Vessel
{
    public string Name;

    public Vessel() : this("unnamed")
    {
    }

    public Vessel(string name)
    {
        Name = name;
    }

    public string Describe()
    {
        return $"{Name}, {Kind()}";
    }

    public virtual string Kind()
    {
        return "a vessel";
    }
}

class Lifeboat : Vessel
{
    public int Seats;

    public Lifeboat(string name, int seats)
    {
        Seats = seats;
    }

    public override string Kind()
    {
        return $"a lifeboat for {Seats}";
    }
}
```

```csharp exec
id: a-lifeboat-with-no-name-1-program
var boat = new Lifeboat("Lifeboat 1", 12);
Console.WriteLine(boat.Describe());
```

Run it. It prints a name, but not the lifeboat's. Which line gave the
lifeboat that name? Which line would you change, and to what?

```inputs
boat.Name
boat.Describe()
```

```hint
after: 2 runs
Which constructor of `Vessel` stores a name? When a `Lifeboat` is made,
which constructor of `Vessel` runs?
```

```solution
var boat = new Lifeboat("Lifeboat 1", 12);
Console.WriteLine(boat.Describe());

class Lifeboat : Vessel
{
    public int Seats;

    public Lifeboat(string name, int seats) : base(name)
    {
        Seats = seats;
    }

    public override string Kind()
    {
        return $"a lifeboat for {Seats}";
    }
}
---
`Lifeboat 1, a lifeboat for 12`. The solution writes `Lifeboat` again,
below its program, with `: base(name)` after the constructor's
parameters. This copy replaces the one above for this program (rule 4).
```

<details class="dl-answer"><summary>answer</summary>

It prints `unnamed, a lifeboat for 12`. The line to change is not in
`Describe`, which prints the name. `Lifeboat`'s constructor never passes
`name` to its parent, so the lifeboat's name is never stored. A child's
constructor always runs one of its parent's constructors first. Without
`: base(...)`, C# runs the one with no parameters, and that one names
the vessel `unnamed`. Add `: base(name)` after the parameters of
`Lifeboat`'s constructor:

```csharp
    public Lifeboat(string name, int seats) : base(name)
```

Then it prints `Lifeboat 1, a lifeboat for 12`. Notice too that
`Describe`, in `Vessel`, calls `Kind()`, and for a lifeboat that runs
`Lifeboat`'s `Kind`, because the parent's `Kind` is `virtual` and the
child's is `override`.

The constructor with no parameters is what let the slip compile. Delete
it from `Vessel`, and press **Check** on the cell. `Lifeboat` no longer
compiles, and the message (CS7036) is on the line of the constructor
that has no `: base(...)`. Then add the constructor again. Every cell
below compiles the classes above it, so while a class does not compile,
the cells below it do not compile either.

</details>

## 2. The big tank

A tank fills to its capacity. A big tank holds more, so its author gave
`BigTank` a `Capacity` of its own. The compiler warned that it hides the
`Capacity` in `Tank`, and suggested the word `new`. The author added
`new`, and the warning stopped.

```csharp exec
id: the-big-tank-1
file: Tank.cs
class Tank
{
    public static int Capacity = 100;

    public int Level { get; private set; }

    public void Fill()
    {
        Level = Capacity;
    }
}

class BigTank : Tank
{
    public static new int Capacity = 500;
}
```

```csharp exec
id: the-big-tank-1-program
var tank = new BigTank();
tank.Fill();
Console.WriteLine(tank.Level);
```

```predict
type: number

What will it print?
```

```inputs
tank.Level
```

```solution
title: with a virtual property
var tank = new BigTank();
tank.Fill();
Console.WriteLine(tank.Level);

class Tank
{
    public virtual int Capacity => 100;

    public int Level { get; private set; }

    public void Fill()
    {
        Level = Capacity;
    }
}

class BigTank : Tank
{
    public override int Capacity => 500;
}
---
`500`. `Capacity` is a virtual property now, so `Fill` asks the object,
and a big tank answers with its own. The solution writes both classes
again, below its program, and they replace the ones above (rule 4).
```

<details class="dl-answer"><summary>why</summary>

`100`. `Fill` is written in `Tank`, so there `Capacity` means
`Tank.Capacity`, and the big tank's own 500 is never read. A static
field belongs to one class, and a child cannot override it. The word
`new` only said that the hiding was on purpose. It stopped the warning,
and it changed nothing else.

A virtual property would find the big tank's value:
`public virtual int Capacity => 100;` in `Tank`, and
`public override int Capacity => 500;` in `BigTank`. Then `Fill` asks
the object for its capacity, and each kind of tank gives its own answer.

</details>

## 3. A squad that grows by itself

A squad keeps the names of its members in a private field. What will
this program print?

```csharp exec
id: a-squad-that-grows-1
file: Squad.cs
class Squad
{
    private List<string> _names;

    public Squad(List<string> names)
    {
        _names = names;
    }

    public int Size()
    {
        return _names.Count;
    }
}
```

```csharp exec
id: a-squad-that-grows-1-program
var names = new List<string> { "Ada", "Grace" };
var squad = new Squad(names);
names.Add("Alan");
Console.WriteLine(squad.Size());
```

```inputs
squad.Size()
```

```solution
var names = new List<string> { "Ada", "Grace" };
var squad = new Squad(names);
names.Add("Alan");
Console.WriteLine(squad.Size());

class Squad
{
    private List<string> _names;

    public Squad(List<string> names)
    {
        _names = new List<string>(names);    // a copy of its own
    }

    public int Size()
    {
        return _names.Count;
    }
}
---
`2`. `new List<string>(names)` makes a new list with the same names in
it. Alan joins the caller's list, and the squad's own list stays as it
was.
```

<details class="dl-answer"><summary>why</summary>

`3`. `names` and `_names` are two names for one list, so the caller
changed the squad without calling any of its methods. `private` did not
help. No code outside the class used the name `_names`: it had the same
list under another name. A `List` is a class, so `=`, and passing a list
to a constructor, share one list and never copy it.

`_names = new List<string>(names);` gives the squad a copy of its own.
Can you make that change in `Squad`, and run the program again?

</details>

## 4. A container that asks

This is your world's container, from
[Composition](lesson:objects-inside-objects). Can you give it one more
method, which asks each object it holds a question and chooses between
the answers?

<div class="dl-world" data-world="game">

Can you give `Room` a `Weakest()` method, which returns the character
with the least health?

Here are `Character`, `Healer` and `Room`, as they stood at the end of
[Your world, playable](lesson:your-world-playable), with their XML
comments. `Weakest` goes in `Room`, in its cell. The program below it
is meant not to compile until `Room` has `Weakest`: its message says that
`Room` does not contain a definition for `Weakest`.

```csharp exec
id: a-container-that-asks-character--game
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
id: a-container-that-asks-healer--game
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
id: a-container-that-asks-1--game
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
id: a-container-that-asks-1-program--game
expect: CS1061
var cave = new Room("Cave");
cave.Enter(new Character("Ada", 10));
cave.Enter(new Character("Grog", 4));
cave.Enter(new Healer("Mira", 7));
Console.WriteLine(cave.Weakest());
```

```inputs
cave.Weakest().Name
new Room("Hall").Weakest()    // throws: a room with nobody in it
```

```hint
after: 2 errors
How does `Standing` visit each character in the room? While
`Weakest` visits them, what does it need to remember?
```

```solution
var cave = new Room("Cave");
cave.Enter(new Character("Ada", 10));
cave.Enter(new Character("Grog", 4));
cave.Enter(new Healer("Mira", 7));
Console.WriteLine(cave.Weakest());

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

    /// <summary>Finds the character in the room with the least health.</summary>
    /// <returns>The character with the least health. If two have the same health, the one who entered first.</returns>
    /// <exception cref="InvalidOperationException">Nobody is in the room.</exception>
    public Character Weakest()
    {
        if (_characters.Count == 0)
        {
            throw new InvalidOperationException($"Nobody is in {Name}, so nobody is weakest.");
        }
        Character weakest = _characters[0];    // safe: the room has at least one character
        foreach (Character character in _characters)
        {
            if (character.Health < weakest.Health)
            {
                weakest = character;
            }
        }
        return weakest;
    }
}
---
`Grog (health 4)`. `Weakest` goes beside `Standing`. It asks each
character for its `Health`, which any caller can read, and it keeps the
weakest so far. The solution writes `Room` again, below its program
(rule 4).

A room with nobody in it has no weakest character. This solution refuses
on purpose, with an `InvalidOperationException` whose message says why,
and its XML comment says so, so that a caller knows before the call.
Without the refusal, `_characters[0]` stops with an
`ArgumentOutOfRangeException`, which says much less. Returning `null` is
another design: then every caller must check for `null`.
```

</div>

<div class="dl-world" data-world="solar-system">

Can you give `Mission` an `Emptiest()` method, which returns the probe
with the least fuel?

Here are `Probe`, `Lander` and `Mission`, as they stood at the end of
[Your world, playable](lesson:your-world-playable), with their XML
comments. `Emptiest` goes in `Mission`, in its cell. The program below
it is meant not to compile until `Mission` has `Emptiest`: its message says
that `Mission` does not contain a definition for `Emptiest`.

```csharp exec
id: a-container-that-asks-probe--solar-system
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
id: a-container-that-asks-lander--solar-system
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
id: a-container-that-asks-1--solar-system
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
id: a-container-that-asks-1-program--solar-system
expect: CS1061
var outer = new Mission("Outer Planets");
outer.Launch(new Probe("Voyager", 70));
outer.Launch(new Lander("Philae", 40));
outer.Launch(new Probe("Juno", 55));
Console.WriteLine(outer.Emptiest());
```

```inputs
outer.Emptiest().Name
new Mission("Inner Planets").Emptiest()    // throws: a mission with no probes
```

```hint
after: 2 errors
How does `TotalFuel` visit each probe in the mission? While `Emptiest`
visits them, what does it need to remember?
```

```solution
var outer = new Mission("Outer Planets");
outer.Launch(new Probe("Voyager", 70));
outer.Launch(new Lander("Philae", 40));
outer.Launch(new Probe("Juno", 55));
Console.WriteLine(outer.Emptiest());

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

    /// <summary>Finds the probe in the mission with the least fuel.</summary>
    /// <returns>The probe with the least fuel. If two have the same fuel, the one launched first.</returns>
    /// <exception cref="InvalidOperationException">The mission has no probes.</exception>
    public Probe Emptiest()
    {
        if (_probes.Count == 0)
        {
            throw new InvalidOperationException($"{Name} has no probes, so none is emptiest.");
        }
        Probe emptiest = _probes[0];    // safe: the mission has at least one probe
        foreach (Probe probe in _probes)
        {
            if (probe.Fuel < emptiest.Fuel)
            {
                emptiest = probe;
            }
        }
        return emptiest;
    }
}
---
`Philae (fuel 40 kg)`. `Emptiest` goes beside `ReadyFor`. It asks each
probe for its `Fuel`, which any caller can read, and it keeps the
emptiest so far. The solution writes `Mission` again, below its program
(rule 4).

A mission with no probes has no emptiest probe. This solution refuses on
purpose, with an `InvalidOperationException` whose message says why, and
its XML comment says so, so that a caller knows before the call. Without
the refusal, `_probes[0]` stops with an `ArgumentOutOfRangeException`,
which says much less. Returning `null` is another design: then every
caller must check for `null`.
```

</div>

<div class="dl-world" data-world="your-own">

What question would you like to ask everything your container holds?
Can you write it as a method, with a loop that asks and a choice between
the answers? Copy your classes from
[Your world, playable](lesson:your-world-playable): they are saved in the
first cell of your own world there, under *Your world, running*. Add the
method to your container. Then write a short program, above the classes,
that fills a container and asks it.

```csharp exec
id: a-container-that-asks-1--your-own
// A program that fills my container and asks it the question.
// Then my classes, with one more method in my container.
```

</div>

## 5. A bike in a space for cars

A car park has two kinds of space: bikes go in the bike rack, and every
other vehicle goes in a space for cars. `CarPark` has two overloads of
`SpaceFor`: two methods with the same name, whose parameters have
different types. One takes any `Vehicle`, and the other takes a `Bike`.

```csharp exec
id: a-bike-in-a-space-for-cars-1
file: Vehicle.cs
class Vehicle
{
    public virtual string Describe()
    {
        return "a vehicle";
    }
}

class Bike : Vehicle
{
    public override string Describe()
    {
        return "a bike";
    }
}

static class CarPark
{
    public static string SpaceFor(Vehicle vehicle)
    {
        return "a space for cars";
    }

    public static string SpaceFor(Bike bike)
    {
        return "the bike rack";
    }
}
```

Two vehicles arrive, a vehicle and then a bike, and the program asks
where each one parks.

```csharp exec
id: a-bike-in-a-space-for-cars-1-program
var arrivals = new List<Vehicle> { new Vehicle(), new Bike() };
foreach (Vehicle arrival in arrivals)
{
    Console.WriteLine($"{arrival.Describe()}: {CarPark.SpaceFor(arrival)}");
}
```

```predict
type: choice

What will the second line print?

- a bike: the bike rack
  - The second arrival is a bike, and each method sees that.
- a bike: a space for cars
  - `Describe` is chosen by the object, and `SpaceFor` by the variable.
```

Can you change the code so that the bike parks in the bike rack, and
the loop is still a loop over vehicles?

```inputs
CarPark.SpaceFor(new Bike())    // a value the compiler can see is a Bike
```

```hint
after: 2 runs
One of the two calls already gives a different answer for the bike.
Which one, and what makes it do that?
```

```solution
var arrivals = new List<Vehicle> { new Vehicle(), new Bike() };
foreach (Vehicle arrival in arrivals)
{
    Console.WriteLine($"{arrival.Describe()}: {arrival.Space()}");
}

class Vehicle
{
    public virtual string Describe()
    {
        return "a vehicle";
    }

    public virtual string Space()
    {
        return "a space for cars";
    }
}

class Bike : Vehicle
{
    public override string Describe()
    {
        return "a bike";
    }

    public override string Space()
    {
        return "the bike rack";
    }
}
---
`a vehicle: a space for cars`, then `a bike: the bike rack`. Each
vehicle now says where it parks, so the object decides, as it does for
`Describe`. The loop is still a loop over vehicles, and a new kind of
vehicle with a space of its own needs only its own override. The
solution writes `Vehicle` and `Bike` again (rule 4). This program no
longer needs `CarPark`.
```

<details class="dl-answer"><summary>why</summary>

It prints `a vehicle: a space for cars`, then
`a bike: a space for cars`. The second arrival is a bike, and only
`Describe` notices.

C# chooses between a `virtual` method and its `override` while the
program runs, by the object. The second arrival is a bike, so `Bike`'s
`Describe` runs. C# chooses between overloads when it compiles, by the
types it can see. `arrival` is a `Vehicle` variable, so the compiler
chooses `SpaceFor(Vehicle)`, once, for every arrival. An overload never
looks at the object. With a value whose type the compiler can see is
`Bike`, as in `CarPark.SpaceFor(new Bike())`, it chooses the other one.

So when the answer depends on what kind of object it is, the question
belongs to the object: a virtual method, which each child class can
override.

</details>

## 6. The test that finds the slip

A probe's `CanBurn(kg)` is meant to allow a burn of all the fuel the
probe has, and no more. Somebody wrote `<` where they meant `<=`. Which
one test would find the slip, and which tests would pass either way?

Here are the two versions side by side, as two small methods, for a
probe with 70 kg of fuel, and one test: a burn of 30 kg. Which other
burns would you try? Add them to `burns`, and run it.

```csharp exec
id: the-test-that-finds-the-slip-1
int[] burns = { 30 };
foreach (int kg in burns)
{
    Console.WriteLine($"A burn of {kg} kg: as meant {CanBurnAsMeant(kg)}, as written {CanBurnAsWritten(kg)}");
}

// CanBurn for a probe with 70 kg of fuel, as it was meant and as it was written.
bool CanBurnAsMeant(int kg)
{
    return kg <= 70;
}

bool CanBurnAsWritten(int kg)
{
    return kg < 70;
}
```

```solution
title: three burns
int[] burns = { 30, 70, 80 };
foreach (int kg in burns)
{
    Console.WriteLine($"A burn of {kg} kg: as meant {CanBurnAsMeant(kg)}, as written {CanBurnAsWritten(kg)}");
}

// CanBurn for a probe with 70 kg of fuel, as it was meant and as it was written.
bool CanBurnAsMeant(int kg)
{
    return kg <= 70;
}

bool CanBurnAsWritten(int kg)
{
    return kg < 70;
}
---
Only the burn of exactly 70 kg gives two different answers.
```

<details class="dl-answer"><summary>answer</summary>

A burn of exactly all the fuel, 70 kg: `<` refuses it, and `<=` allows
it. The line for it says `as meant True, as written False`. Burns of
30 kg or 80 kg give the same answer both ways. The two comparisons
disagree only at the boundary, the edge between what the method allows
and what it refuses, so a test belongs there.

</details>

## 7. An example that is almost true

The XML comment on `HalfTank` has an example: half of 55 kg of fuel is
27.5 kg. The program below compares the example with what the code
gives.

```csharp exec
id: an-example-that-is-almost-right-1
file: Satellite.cs
/// <summary>A satellite, and the fuel it carries, in kilograms.</summary>
class Satellite
{
    public string Name;
    private int _fuel;

    public Satellite(string name, int fuel)
    {
        Name = name;
        _fuel = fuel;
    }

    /// <summary>Gives half the satellite's fuel.</summary>
    /// <returns>Half the fuel, in kilograms.</returns>
    /// <example>
    /// <code>
    /// new Satellite("Lumen", 55).HalfTank()    // 27.5
    /// </code>
    /// </example>
    public double HalfTank()
    {
        return _fuel / 2;
    }
}
```

```csharp exec
id: an-example-that-is-almost-right-1-program
var lumen = new Satellite("Lumen", 55);
Console.WriteLine("The example says: 27.5");
Console.WriteLine($"The code gives:   {lumen.HalfTank()}");
```

```predict
type: choice

Does the code give what the example says? What will the last line print?

- The code gives: 27.5
  - `HalfTank` returns a `double`, and a `double` can hold 27.5.
- The code gives: 27
  - `_fuel` and `2` are both whole numbers.
```

```inputs
lumen.HalfTank()
```

```solution
title: dividing by 2.0
var lumen = new Satellite("Lumen", 55);
Console.WriteLine("The example says: 27.5");
Console.WriteLine($"The code gives:   {lumen.HalfTank()}");

/// <summary>A satellite, and the fuel it carries, in kilograms.</summary>
class Satellite
{
    public string Name;
    private int _fuel;

    public Satellite(string name, int fuel)
    {
        Name = name;
        _fuel = fuel;
    }

    /// <summary>Gives half the satellite's fuel.</summary>
    /// <returns>Half the fuel, in kilograms.</returns>
    /// <example>
    /// <code>
    /// new Satellite("Lumen", 55).HalfTank()    // 27.5
    /// </code>
    /// </example>
    public double HalfTank()
    {
        return _fuel / 2.0;
    }
}
---
`27.5`. With `2.0`, one of the two numbers has a decimal point, so the
division keeps the half. The solution writes `Satellite` again (rule 4).
```

<details class="dl-answer"><summary>why</summary>

The code gives `27`, and the example says 27.5. `_fuel` and `2` are
both whole numbers, so `/` drops the fraction and gives 27. Only then
does C# convert 27 to a `double`, for the return. The return type says
what kind of value the method returns. It does not change how the
division inside is done.

There are two ways to make the code and the example agree. The method
can divide by `2.0`, and give 27.5. Or it can return an `int` and
promise a whole number, and the example says 27. That is a design
decision, and the XML comment should then say it clearly.

</details>

## 8. A list that will not sort

Here are four of Jupiter's moons, with their widths in kilometres,
rounded. The program puts them in a list and asks the list to sort
itself. It compiles, and it is meant to stop with an exception. Run it,
and read the message.

```csharp exec
id: a-list-that-will-not-sort-1
file: Moon.cs
class Moon
{
    public string Name;
    public int Width;

    public Moon(string name, int width)
    {
        Name = name;
        Width = width;
    }

    public override string ToString()
    {
        return $"{Name} ({Width} km)";
    }
}
```

```csharp exec
id: a-list-that-will-not-sort-1-program
expect: exception
var moons = new List<Moon>
{
    new Moon("Io", 3643),
    new Moon("Europa", 3122),
    new Moon("Ganymede", 5268),
    new Moon("Callisto", 4821)
};
moons.Sort();
Console.WriteLine(string.Join(", ", moons));
```

What does `Sort` need to know about moons, that nobody has told it? Can
you tell it, in `Moon`, so that the moons are sorted from the narrowest
to the widest?

```inputs
moons[0].Name
moons[3].Name
```

```hint
after: 2 errors
Read the line under the exception that starts `It was caused by`. What
must at least one object do? `Sort` puts a `List<int>` in order with no
help. Which promise can a class make, to say how two of its objects
compare?
```

```hint
after: 3 errors
The promise is the interface `IComparable<Moon>`. Write
`class Moon : IComparable<Moon>`, and give `Moon` its one method,
`public int CompareTo(Moon other)`. It returns a number below 0 when
this moon comes before `other`, 0 when they are in the same place, and a
number above 0 when this moon comes after. Which field of the two moons
does it compare?
```

```solution
var moons = new List<Moon>
{
    new Moon("Io", 3643),
    new Moon("Europa", 3122),
    new Moon("Ganymede", 5268),
    new Moon("Callisto", 4821)
};
moons.Sort();
Console.WriteLine(string.Join(", ", moons));

class Moon : IComparable<Moon>
{
    public string Name;
    public int Width;

    public Moon(string name, int width)
    {
        Name = name;
        Width = width;
    }

    public override string ToString()
    {
        return $"{Name} ({Width} km)";
    }

    public int CompareTo(Moon other)
    {
        return Width.CompareTo(other.Width);    // the narrower moon comes first
    }
}
---
`Europa (3122 km), Io (3643 km), Callisto (4821 km), Ganymede (5268 km)`.
`Moon` now keeps the promise of `IComparable<Moon>`. Its `CompareTo`
says whether this moon comes before another (a number below 0), after it
(a number above 0), or in the same place (0). `int` keeps the same
promise, so `Width.CompareTo(other.Width)` gives that number for two
widths. The solution writes `Moon` again (rule 4). A `CompareTo` that
compares names would sort the moons by name instead.
```

<details class="dl-answer"><summary>why</summary>

It stopped with an exception, `InvalidOperationException`, on line 8,
the line with `Sort`. The message says `Failed to compare two elements
in the array.` Under it, a line says what caused it:
`It was caused by System.ArgumentException: At least one object must implement IComparable.`
`Sort` can put whole numbers or text in order. Nothing told it how to
compare two moons: by width, by name, or in the order they were found?

The compiler saw no problem, because `Sort` is allowed on a list of any
type. While the program runs, `Sort` asks whether one moon can compare
itself with another, and nothing says that it can. A class says that it
can by keeping the promise of the interface `IComparable<Moon>`: one
method, `CompareTo`. To *implement* an interface is to keep its promise:
the class names the interface after a colon, and has each of its
methods.

</details>

## 9. Two jobs in one method

```csharp
void PlayTurn(Character hero, Character monster)
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == "attack")
    {
        monster.TakeDamage(3);
    }
    else if (choice == "rest")
    {
        hero.Heal(2);
    }
}
```

Why is `PlayTurn` hard to test? Can you split it so that it is not?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

It asks and decides in one place, so every test would wait for somebody
to type. Split it into two. `RunChoice(hero, monster, choice)` decides,
and never asks. A loop asks, with `Console.ReadLine()`, and gives each
answer to `RunChoice`. Then a test can call `RunChoice` with each
command in an array, and nobody needs to type. A menu, a prompt or a
test can all use the same method.

</details>

## 10. A locked door you can walk through

In the first version of a game, a door was open or closed, and
`CanWalkThrough` said yes to every door that was not closed. Later,
somebody added `Locked` to `DoorState`, and changed nothing else. It all
still compiled. What does the cellar door say?

```csharp exec
id: a-locked-door-1
file: Door.cs
enum DoorState
{
    Open,
    Closed,
    Locked
}

class Door
{
    public string Name;
    public DoorState State;

    public Door(string name, DoorState state)
    {
        Name = name;
        State = state;
    }

    public bool CanWalkThrough()
    {
        return State != DoorState.Closed;
    }
}
```

```csharp exec
id: a-locked-door-1-program
var cellar = new Door("The cellar door", DoorState.Locked);
Console.WriteLine($"{cellar.Name} is {cellar.State}. Can we walk through? {cellar.CanWalkThrough()}");
```

Which line would you change, and to what? Which test would have found
the slip on the day `Locked` was added?

```inputs
new Door("The gate", DoorState.Open).CanWalkThrough()
new Door("The gate", DoorState.Closed).CanWalkThrough()
new Door("The gate", DoorState.Locked).CanWalkThrough()
```

```hint
after: 2 runs
Which values of `DoorState` does `!= DoorState.Closed` say yes to? Which
values should it say yes to?
```

```solution
var cellar = new Door("The cellar door", DoorState.Locked);
Console.WriteLine($"{cellar.Name} is {cellar.State}. Can we walk through? {cellar.CanWalkThrough()}");

class Door
{
    public string Name;
    public DoorState State;

    public Door(string name, DoorState state)
    {
        Name = name;
        State = state;
    }

    public bool CanWalkThrough()
    {
        return State == DoorState.Open;    // only an open door; any new state says no
    }
}
---
`The cellar door is Locked. Can we walk through? False`. The solution
writes `Door` again (rule 4), and uses `DoorState` from the cell above.
```

<details class="dl-answer"><summary>answer</summary>

It says `True`. `State != DoorState.Closed` says yes to every value
except `Closed`. While `DoorState` had two values, that meant `Open`
only. When `Locked` was added, it meant `Locked` too. The compiler had
no reason to object, because the code still made sense.

`return State == DoorState.Open;` says yes to one value, and no to every
other. A value added later gets no, until somebody decides otherwise.

A test for each value of the enum would have found it: a locked door
that says `True`. When an enum gets a new value, search the code for
every place that asks about it.

</details>

## 11. A position that did not move

A rover drove east, one step at a time, and its path is a list of the
three positions it visited. `Position` is a *struct*: a type that is
written like a class, with the word `struct` in place of `class`. Then
the program moves the last position five steps north. What will it
print?

```csharp exec
id: a-position-that-did-not-move-1
file: Position.cs
struct Position
{
    public int X;
    public int Y;

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

```csharp exec
id: a-position-that-did-not-move-1-program
var path = new List<Position> { new Position(0, 0), new Position(1, 0), new Position(2, 0) };
Position last = path[2];
last.Y = 5;
Console.WriteLine(string.Join(" ", path));
```

Can you add one line, so that the last position in the path moves?

```inputs
path[2].Y
```

```hint
after: 2 runs
What does `last` hold: the position in the list, or a copy of it? How
do you put a new value into a list, at an index?
```

```solution
var path = new List<Position> { new Position(0, 0), new Position(1, 0), new Position(2, 0) };
Position last = path[2];
last.Y = 5;
path[2] = last;    // store the changed copy in the list, in place of the old one
Console.WriteLine(string.Join(" ", path));
---
`(0, 0) (1, 0) (2, 5)`. `path[2] = last;` stores the changed copy in
the list, in place of the old position.
```

<details class="dl-answer"><summary>why</summary>

It prints `(0, 0) (1, 0) (2, 0)`: the path did not change. A struct is
a *value type*, like `int`: each variable holds its own copy of the
value, and `=` copies it. So
`Position last = path[2];` copies the position into `last`, and
`last.Y = 5;` changes the copy, which the list never sees.
`path[2] = last;` stores the changed copy in the list.

Change `struct` to `class` in the cell above, and run the program again.
Now the path's last position moves without that line, because `last`
and `path[2]` are two names for one object. Then make it a struct again.

Why not write `path[2].Y = 5;`? Try it. It does not compile (CS1612).
`path[2]` gives a copy of the struct, with no name, so changing it would
change nothing that the program can see again, and the compiler refuses.

</details>

## 12. Class, child, container or flag?

A zoo keeps animals. Every animal has a name and eats. Penguins also
swim, and lions also roar. Each keeper cares for several animals, and
an animal can be moved to another keeper. Which classes would you write,
and which relationships are "is a" and which "has a"?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`Animal`, with `class Penguin : Animal` and `class Lion : Animal`: a
penguin is an animal, and adds `Swim`. `Keeper` has animals, in a
`List<Animal>`. Moving an animal is two method calls, one keeper's
`Remove` and another keeper's `Add`, so the animal itself never changes
class.

If animals changed kind (they do not), a flag would be the safer design:
a field whose type is an enum, such as `enum Species { Penguin, Lion }`.
Another answer that works has no child classes at all, only a `Sound`
field, if roaring and swimming never become more than a line of text.
And if a seal arrives, which swims too, an interface such as `ISwimmer`
lets a penguin and a seal keep the same promise, and neither is built on
the other.

</details>

## 13. One more rule, from the test to the command

Choose one rule that your world does not have. Can you add it the way
the course did? First write the test, at a boundary, and see it fail.
Then write the rule, in one method, and its XML comment. Then add a
command to `RunChoice`, so that a player can meet the rule.

You can do this here, in the cell below, or in Visual Studio, in your
world's solution from [Your world, playable](lesson:your-world-playable).
In Visual Studio, the test is a `[TestMethod]` in the test project, and
the rule, its XML comment and the command go in the class library.

Here is `Test`, for the test. It is the same as on *Your world,
playable*. In the game and the solar system, the classes of your world
are in problem 4, above. To change one of them, write it again in your
cell, below your test (rule 4). `RunChoice` is in `Commands`, on *Your
world, playable*: copy it into your cell too when you reach the command.
In your own world, copy your classes and your `Commands` into your cell.

```csharp exec
id: one-more-rule-test
file: Test.cs
static class Test
{
    public static void Check<T>(string claim, T expected, T found)
    {
        if (!expected.Equals(found))
        {
            throw new Exception($"{claim}: expected {expected}, found {found}");
        }
    }

    public static void RunAll(List<Action> tests)
    {
        int passed = 0;
        foreach (Action test in tests)
        {
            try
            {
                test();
                passed = passed + 1;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
            }
        }
        Console.WriteLine($"Tests run: {tests.Count}. Passed: {passed}.");
    }
}
```

```csharp exec
id: one-more-rule-1
// The test first. Then the rule, its XML comment and its command.
```

<details class="dl-answer"><summary>one way to check</summary>

Run the test before the rule exists, and see it fail. Run it again after,
and see it pass. Run your other tests too. A new rule sometimes breaks an
old promise, and this is the best time to learn that.

</details>

## Where to go next

This is the last page of the course. If you want more, the pages under
*Explore*, on the course page, go further than the course does:
[A polynomial class](lesson:a-polynomial-class), with `+` for a class
of your own; *A deck of cards*, with enums, a shuffle and a card game;
*LINQ*, which asks a list a question in one line; *Simulating a queue*,
with .NET's own `Queue`; and *The perceptron*, a class that learns.

Microsoft. *Polymorphism*. Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism>.
`virtual`, `override`, `new` and `base`, in Microsoft's words, with a
list of shapes that each draw themselves. Problems 1, 2 and 5 use its
ideas.
