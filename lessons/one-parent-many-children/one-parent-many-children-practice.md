---
title: "Inheritance: practice"
version: 2026.09.28.1
from: one-parent-many-children-practice
practice_for: one-parent-many-children
---

# Inheritance: practice

This page has problems on child classes, overriding and `base`, and three
from earlier pages. Try each problem before you open anything under it,
and run the cells to test your guesses.

Some cells on this page are meant not to compile, and the problem says so
or asks you to guess. When that happens, nothing is broken: the message is
part of the answer.

## 1. Which Describe?

```csharp exec
id: which-describe-1
file: Vehicle.cs
class Vehicle
{
    public virtual string Describe()
    {
        return "a vehicle";
    }
}

class Rover : Vehicle
{
    public override string Describe()
    {
        return $"a rover, which is {base.Describe()}";
    }
}
```

```csharp exec
id: which-describe-2
foreach (Vehicle vehicle in new List<Vehicle> { new Vehicle(), new Rover() })
{
    Console.WriteLine(vehicle.Describe());
}
```

```predict
type: choice

What will the last line print?

- a rover, which is a vehicle
  - `Rover.Describe` adds to the parent's answer through `base`.
- a rover, which is a rover, which is a vehicle
  - `base.Describe()` calls `Rover.Describe` again.
- a vehicle
  - A rover is a vehicle, so it uses `Vehicle.Describe`.
```

<details class="dl-answer"><summary>why</summary>

`a vehicle`, then `a rover, which is a vehicle`. The rover's own
`Describe` runs, because it overrides the parent's. Inside it,
`base.Describe()` runs the parent's `Describe`, once.

Neither class has a constructor. A class with no constructor of its own
gets an empty one from C#, so `new Vehicle()` and `new Rover()` still
work.

</details>

## 2. A commander with no name

A commander is a crew member who commands a rover. `CrewMember` has two
constructors: one that takes a name, and one for a place on the crew that
nobody fills yet.

```csharp exec
id: a-commander-with-no-name-1
file: CrewMember.cs
class CrewMember
{
    public string Name;

    public CrewMember(string name)
    {
        Name = name;
    }

    public CrewMember() : this("Nobody")
    {
    }
}

class Commander : CrewMember
{
    public string RoverName;

    public Commander(string name, string roverName)
    {
        RoverName = roverName;
    }
}
```

Run the program. It gives the commander the name Ada, but Ada is not the
name it prints. Can you fix it with one change?

```csharp exec
id: a-commander-with-no-name-2
var ada = new Commander("Ada", "Dune");
Console.WriteLine($"{ada.Name} commands the {ada.RoverName}");
```

```inputs
ada.Name
ada.RoverName
```

```hint
after: 2 runs
Which of `CrewMember`'s two constructors ran? Where in `Commander` would
you tell C# which one to run, and with what?
```

```solution
var ada = new Commander("Ada", "Dune");
Console.WriteLine($"{ada.Name} commands the {ada.RoverName}");

class Commander : CrewMember
{
    public string RoverName;

    public Commander(string name, string roverName) : base(name)
    {
        RoverName = roverName;
    }
}
---
`Ada commands the Dune`. A child's constructor always runs one of its
parent's constructors first. With no `: base(...)`, C# runs the parent's
constructor that takes no values, and that one stores `"Nobody"`.
`: base(name)` runs the constructor that takes a name, and gives it the
commander's name to store.

If `CrewMember` had no constructor without values, `Commander` would not
compile at all. The error would be CS7036, which the tutorial's troll
had with no constructor of its own.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Commander` replaces the one
above for this program (rule 4).
```

## 3. Through base, or not?

Each of these two creatures is a child class of `Character`, and needs a
`TakeDamage` of its own. Should its `TakeDamage` call
`base.TakeDamage(...)`, or replace the parent's without calling it?

- A knight's armour blocks 2 of every hit. Every other rule about damage
  still applies to a knight.
- A ghost cannot be hurt by an ordinary hit at all.

<details class="dl-answer"><summary>why</summary>

The knight changes only the amount, so the parent's rules still apply:
`base.TakeDamage(...)`, with a smaller hit. The next problem writes it.

A ghost is never hurt, and hurting is what the parent's method does. So
the ghost's `TakeDamage` does not call it. It can be one line that prints
"The ghost feels nothing."

Both need the word `virtual` on `TakeDamage` in `Character`, and the word
`override` on the child's `TakeDamage`.

</details>

## 4. A knight in armour

Can you write `Knight`, a character whose armour blocks 2 of every hit? A
hit of 1 or 2 does no harm at all.

The first cell holds `Character` as the
[tutorial](lesson:one-parent-many-children) left it: its fourth version.
The second holds the start of `Knight`. Change `Knight`, and then run the
program in the third cell.

```csharp exec
id: a-knight-in-armour-1
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
id: a-knight-in-armour-2
file: Knight.cs
class Knight : Character
{
    public Knight(string name, int health) : base(name, health)
    {
    }
}
```

```csharp exec
id: a-knight-in-armour-3
var lancelot = new Knight("Lancelot", 10);
lancelot.TakeDamage(5);
Console.WriteLine(lancelot);
lancelot.TakeDamage(1);
Console.WriteLine(lancelot);
```

```inputs
lancelot.ToString()
lancelot.Health
```

```hint
after: 2 runs
Which method already keeps the rules about damage? After the armour,
what should the amount be for a hit of 5? And for a hit of 1?
```

```hint
after: 3 runs
title: the method's first line
The knight replaces its parent's `TakeDamage`, so its first line is
`public override void TakeDamage(int amount)`. `Math.Max(0, x)` gives
`x`, or 0 when `x` is less than 0.
```

```solution
var lancelot = new Knight("Lancelot", 10);
lancelot.TakeDamage(5);
Console.WriteLine(lancelot);
lancelot.TakeDamage(1);
Console.WriteLine(lancelot);

class Knight : Character
{
    public Knight(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(Math.Max(0, amount - 2));
    }
}
---
`Lancelot (health 7)`, twice: the hit of 1 does no harm.
`Math.Max(0, ...)` gives 0 in place of any amount below 0. Without it, a
hit of 1 would reach the parent as an amount below 0, and the parent's
first rule would refuse it, with a message about negative damage.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Knight` replaces the one above
for this program (rule 4).
```

## 5. The tanker's tank

A tanker is a probe with a bigger tank. Each class here keeps its tank
size in a static field.

```csharp exec
id: the-tankers-tank-1
file: Probe.cs
class Probe
{
    public static int TankSize = 100;

    public int Fuel { get; private set; }

    public Probe(int fuel)
    {
        Fuel = fuel;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}

class Tanker : Probe
{
    public static int TankSize = 500;

    public Tanker(int fuel) : base(fuel)
    {
    }
}
```

```csharp exec
id: the-tankers-tank-2
var tanker = new Tanker(300);
tanker.Refuel(100);
Console.WriteLine(tanker.Fuel);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`100`: refuelling lowered the tanker's fuel from 300 to 100. The compiler
warned about it: `warning CS0108: 'Tanker.TankSize' hides inherited member
'Probe.TankSize'. Use the new keyword if hiding was intended.`

`Refuel` is written in `Probe`, so the `TankSize` it reads is
`Probe.TankSize`, which is always 100. The tanker's 500 is a second field,
which `Refuel` never reads.

</details>

Here are both classes again, with the tank size as a virtual property, as
the tutorial did with `MaxHealth`. They replace the two above (rule 4: a
class written again further down replaces the earlier one).

```csharp exec
id: the-tankers-tank-3
file: Probe.cs
class Probe
{
    public virtual int TankSize => 100;

    public int Fuel { get; private set; }

    public Probe(int fuel)
    {
        Fuel = fuel;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}

class Tanker : Probe
{
    public override int TankSize => 500;

    public Tanker(int fuel) : base(fuel)
    {
    }
}
```

The program is the same. What does it print now?

```csharp exec
id: the-tankers-tank-4
var tanker = new Tanker(300);
tanker.Refuel(100);
Console.WriteLine(tanker.Fuel);
```

It prints `400`. `Refuel` asks the object for its `TankSize`, and a
tanker answers 500.

## 6. Is it a kind?

For each of these, is the child a kind of its parent?

- `class Commander : CrewMember`: is a commander a kind of crew member?
- `class Engine : Rover`: is an engine a kind of rover?
- `class Moon : Planet`: is a moon a kind of planet?

<details class="dl-answer"><summary>why</summary>

A commander is a crew member with something more, a rover to command, so
a child class fits.

A rover *has* an engine. An engine is not a kind of rover, so it would be
a field of `Rover`, not a child of it. A later page,
[Composition: objects inside other objects](lesson:objects-inside-objects),
builds classes that hold other objects in this way.

A moon and a planet share a lot (a name, a size, an orbit), but a moon is
not a planet. Both could be children of one parent, perhaps `Body`, the
word astronomers use for any natural object in space.

Even a true "is a kind of" can cause problems in code. A later closer
look, [Inheritance: a closer look at "is a"](lesson:when-is-a-breaks),
builds a square on a rectangle, and watches it stop being a square.

</details>

## 7. From earlier: class or field?

From [Designing classes: from a description to classes and enums](lesson:from-a-description-to-classes).
A description says: "Each dragon has a name, a colour and a hoard of
treasure, and guards its hoard: nobody may take more than one piece at a
time." Which of name, colour and hoard would you make a class?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The name is a field: one value. The colour is a field too, and if the
game has a fixed list of colours, its type could be an enum. The hoard
keeps a rule (one piece at a time) and holds many things. So it could be a
class, or a private `List<string>` on the dragon, with a `Take()` method
that keeps the rule. Either can work.

</details>

## 8. From earlier: where the mistake is

From [Visual Studio: the tools around your code](lesson:the-tools-around-your-code).
A healer is a character who can also heal someone else, as in the
tutorial's game world. This `Healer` is a child of the `Character` in
problem 4 (rule 2: a class written in a cell can be used by the cells
below it).

```csharp exec
id: where-the-mistake-is-1
file: Healer.cs
class Healer : Character
{
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

In the program, `"5"` is text. `HealOther` would receive it as `amount`
and pass it to `Heal`, and only `Heal` adds the amount to a number.

```csharp exec
id: where-the-mistake-is-2
expect: CS1503
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, "5");
Console.WriteLine(ada);
```

```predict
type: choice

Where will C# report the problem?

- At line 3 of the program, `mira.HealOther(ada, "5");`
  - `HealOther` takes an `int`, and the compiler checks every call against its parameters.
- In `HealOther`, at `other.Heal(amount);`
  - The middle call gives the amount to `Heal`.
- In `Heal`, at the line with `Math.Min`
  - That is where the text would meet a number.
```

<details class="dl-answer"><summary>why</summary>

It does not compile, and the message names line 3 of the program:
`error CS1503: Argument 2: cannot convert from 'string' to 'int'`. The
quotes make `"5"` a string, and the second parameter of `HealOther` is an
`int`. The compiler checks each call against the method's parameters
before anything runs, so the text never reaches `Heal`. Write `5`, with
no quotes, and run the program again.

In Python, the same program runs until the text meets a number inside
`heal`, and only then stops, two calls away from the line to change.

</details>

## 9. From earlier: stored, or gone?

From [Inside a method: sequence, selection and iteration in a class](lesson:the-moves-you-already-know).
This healer counts the heals it gives. It replaces the `Healer` of problem
8 (rule 4).

```csharp exec
id: stored-or-gone-1
file: Healer.cs
class Healer : Character
{
    public int HealsGiven { get; private set; }

    public Healer(string name, int health) : base(name, health)
    {
    }

    public void HealOther(Character other, int amount)
    {
        other.Heal(amount);
        int healsGiven = HealsGiven + 1;
    }
}
```

```csharp exec
id: stored-or-gone-2
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, 2);
mira.HealOther(ada, 2);
Console.WriteLine(mira.HealsGiven);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`0`. `int healsGiven = HealsGiven + 1;` starts with a type, so it makes a
new local variable, which is gone when the call ends. The property
`HealsGiven` never changed. `HealsGiven = HealsGiven + 1;`, with no type in
front, changes the property itself, so the healer keeps its count.

</details>

## 10. An override that is missing

Here is problem 1's `Rover` again, with one word missing: `override`. It
replaces the `Rover` of problem 1 for the cells below it (rule 4). This
problem is the last on the page, because the compiler warns about this
class, and a warning shows in every cell below the class that causes it.

```csharp exec
id: an-override-that-is-missing-1
file: Rover.cs
class Rover : Vehicle
{
    public string Describe()
    {
        return $"a rover, which is {base.Describe()}";
    }
}
```

The program asks a rover for its description twice: first on its own, and
then in a list of vehicles.

```csharp exec
id: an-override-that-is-missing-2
Console.WriteLine(new Rover().Describe());
foreach (Vehicle vehicle in new List<Vehicle> { new Vehicle(), new Rover() })
{
    Console.WriteLine(vehicle.Describe());
}
```

```predict
type: choice

What will the last line print?

- a rover, which is a vehicle
  - The rover's own `Describe` runs, as it did in problem 1.
- a vehicle
  - In the loop, the rover is held in a `Vehicle` variable.
```

<details class="dl-answer"><summary>why</summary>

`a rover, which is a vehicle`, then `a vehicle` twice. The compiler warned
about it: `warning CS0114: 'Rover.Describe()' hides inherited member
'Vehicle.Describe()'. To make the current member override that
implementation, add the override keyword. Otherwise add the new keyword.`

Without `override`, a rover has two methods called `Describe`: its
parent's, and its own, which *hides* the parent's. Which one runs depends
on the type of the variable. `new Rover().Describe()` asks a `Rover`, and
finds the rover's own. In the loop, `vehicle` is a `Vehicle` variable,
and it finds the parent's. With `override`, a rover has one `Describe`,
and every variable finds it.

If `Vehicle`'s `Describe` were not `virtual` either, the warning would be
CS0108, the one the tutorial's troll had for its `MaxHealth`, and the
program would print the same three lines. *Overriding*, a later closer
look, tries this with the troll.

</details>
