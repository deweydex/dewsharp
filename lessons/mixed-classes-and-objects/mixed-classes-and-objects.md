---
title: "Mixed problems: classes and objects"
version: 2026.09.29.1
from: mixed-programming-with-objects
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
covers: [FOOP-LO2, FOOP-LO3, FOOP-LO4, FOOP-LO5, FOOP-LO7]
---

# Mixed problems: classes and objects

Every problem on this page needs more than one page of the series Classes
and objects, and none of them says which. Part of each problem is to
decide what it needs: a constructor, a private field, a static field, a
method that answers a question, a test, or a new class. Deciding what a
problem needs is a skill of its own.

Each problem says what kind it is:

- **Predict:** say what a cell will do, and then run it.
- **Fix:** find why a program does something that nobody meant, and
  change it.
- **Make:** write part of a program.
- **Explain:** answer in words.

Choose a world under the title: a game, or a solar system. The problems
are the same in both worlds, with a different story. Most of them start
from the class you grew in this series, `Character` or `Probe`, with one
change that somebody made to it. Each problem shows only the parts of the
class that it needs.

Try each problem before you open anything under it. One program is meant
to stop with an exception, and its problem says so before you run it. The
cells follow the rules of the road: a class written in a cell can be used
by the cells below it, a class written again further down replaces the
earlier one, and variables stay in their cell. So each problem writes its
class again, and each program makes its own objects.

Every problem runs here, in the browser. To try one in Visual Studio,
press **Download project** on its program cell. Problem 1 has steps for
the debugger, if you have Visual Studio.

## 1. An object with no name

<div class="dl-world" data-world="game">

**Fix.** A new character should start with full health. So somebody gave
`Character` a second constructor, which takes only a name. Here is
`Character`, with only the parts this problem needs. `Label()` makes a
line for the top of the screen, with the character's name in capital
letters: `ToUpper()` gives the same text in capital letters.

The program makes Ada with a name and a health, and Alan with only a
name. It is meant to stop with an exception. Run it, and read the report
from the top. Which line would you change, and to what?

```csharp exec
id: an-object-with-no-name-1--game
file: Character.cs
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

    // A new character starts with full health.
    public Character(string name)
    {
        Health = MaxHealth;
    }

    public string Label()
    {
        return $"{Name.ToUpper()} (health {Health} of {MaxHealth})";
    }
}
```

```csharp exec
id: an-object-with-no-name-1-program--game
expect: exception
var ada = new Character("Ada", 8);
var alan = new Character("Alan");
Console.WriteLine(ada.Label());
Console.WriteLine(alan.Label());
```

```inputs
alan.Name
alan.Label()
```

```hint
Look at the line that failed. Which value on it could be `null`, with no
object at all? Where does that value come from, for Alan?
```

```hint
after: 2 errors
Alan was made with one argument, so which constructor ran? Which field
does that constructor never give a value?
```

```solution
var ada = new Character("Ada", 8);
var alan = new Character("Alan");
Console.WriteLine(ada.Label());
Console.WriteLine(alan.Label());

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

    public Character(string name)
        : this(name, MaxHealth)
    {
    }

    public string Label()
    {
        return $"{Name.ToUpper()} (health {Health} of {MaxHealth})";
    }
}
---
It prints `ADA (health 8 of 10)`, then `ALAN (health 10 of 10)`. The
solution writes `Character` again, below its program *(rule 4)*. The
second constructor's body is empty now: `: this(name, MaxHealth)` runs
the first constructor, with Alan's name and full health, and that
constructor stores both fields.
```

<details class="dl-answer"><summary>why</summary>

The program printed Ada's line, and then it stopped. Under it, the page
shows this report:

```console
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at line 22 of Character.cs (in Character.Label())
   at line 4 of Program.cs
```

It names two lines: line 22 of `Character.cs`, in `Label`, and line 4 of
the program, which called `Label`. Neither of them is the line to change.

Line 22 is the `return` in `Label`. `Name.ToUpper()` asks `Name` for its
capital letters, and for Alan, `Name` is `null`: no string at all. A
method cannot be called on nothing, so C# stopped with a
`NullReferenceException`.

So where does `Name` get its value? Only the first constructor stores it.
Alan was made with one argument, so C# ran the second constructor, and
that one stores `Health` and nothing else. A field that can hold an
object, such as a `string`, starts as `null`, and Alan's `Name` stayed
`null`. The mistake was in the constructor, and it caused the exception
later, in another method. The compiler found nothing to report, because a
constructor is allowed to leave a field without a value.

The fix adds one line to the second constructor, so that it runs the
first one, with full health:

```csharp
    public Character(string name)
        : this(name, MaxHealth)
```

Then both fields are stored in one place, the first constructor, and
every constructor uses it. The line `Health = MaxHealth;` has nothing
left to do, so the solution deletes it.

If you have Visual Studio, you can watch the mistake happen. Press
**Download project** on the program cell, and open the project. In
`Character.cs`, put a breakpoint on the line `Health = MaxHealth;`, and
press F5. When the program pauses there, find `this` in the **Locals**
window, and press F10 to run the line. Which field has a value now, and
which is still `null`? Press Shift+F5 to stop.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Fix.** A new probe should start with a full tank. So somebody gave
`Probe` a second constructor, which takes only a name. Here is `Probe`,
with only the parts this problem needs. `Label()` makes a line for mission
control's screen, with the probe's name in capital letters: `ToUpper()`
gives the same text in capital letters.

The program makes Voyager with a name and some fuel, and Juno with only a
name. It is meant to stop with an exception. Run it, and read the report
from the top. Which line would you change, and to what?

```csharp exec
id: an-object-with-no-name-1--solar-system
file: Probe.cs
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

    // A new probe starts with a full tank.
    public Probe(string name)
    {
        Fuel = TankSize;
    }

    public string Label()
    {
        return $"{Name.ToUpper()} (fuel {Fuel} of {TankSize} kg)";
    }
}
```

```csharp exec
id: an-object-with-no-name-1-program--solar-system
expect: exception
var voyager = new Probe("Voyager", 70);
var juno = new Probe("Juno");
Console.WriteLine(voyager.Label());
Console.WriteLine(juno.Label());
```

```inputs
juno.Name
juno.Label()
```

```hint
Look at the line that failed. Which value on it could be `null`, with no
object at all? Where does that value come from, for Juno?
```

```hint
after: 2 errors
Juno was made with one argument, so which constructor ran? Which field
does that constructor never give a value?
```

```solution
var voyager = new Probe("Voyager", 70);
var juno = new Probe("Juno");
Console.WriteLine(voyager.Label());
Console.WriteLine(juno.Label());

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

    public Probe(string name)
        : this(name, TankSize)
    {
    }

    public string Label()
    {
        return $"{Name.ToUpper()} (fuel {Fuel} of {TankSize} kg)";
    }
}
---
It prints `VOYAGER (fuel 70 of 100 kg)`, then `JUNO (fuel 100 of 100 kg)`.
The solution writes `Probe` again, below its program *(rule 4)*. The
second constructor's body is empty now: `: this(name, TankSize)` runs the
first constructor, with Juno's name and a full tank, and that constructor
stores both fields.
```

<details class="dl-answer"><summary>why</summary>

The program printed Voyager's line, and then it stopped. Under it, the
page shows this report:

```console
Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at line 22 of Probe.cs (in Probe.Label())
   at line 4 of Program.cs
```

It names two lines: line 22 of `Probe.cs`, in `Label`, and line 4 of the
program, which called `Label`. Neither of them is the line to change.

Line 22 is the `return` in `Label`. `Name.ToUpper()` asks `Name` for its
capital letters, and for Juno, `Name` is `null`: no string at all. A
method cannot be called on nothing, so C# stopped with a
`NullReferenceException`.

So where does `Name` get its value? Only the first constructor stores it.
Juno was made with one argument, so C# ran the second constructor, and
that one stores `Fuel` and nothing else. A field that can hold an object,
such as a `string`, starts as `null`, and Juno's `Name` stayed `null`.
The mistake was in the constructor, and it caused the exception later, in
another method. The compiler found nothing to report, because a
constructor is allowed to leave a field without a value.

The fix adds one line to the second constructor, so that it runs the
first one, with a full tank:

```csharp
    public Probe(string name)
        : this(name, TankSize)
```

Then both fields are stored in one place, the first constructor, and
every constructor uses it. The line `Fuel = TankSize;` has nothing left
to do, so the solution deletes it.

If you have Visual Studio, you can watch the mistake happen. Press
**Download project** on the program cell, and open the project. In
`Probe.cs`, put a breakpoint on the line `Fuel = TankSize;`, and press
F5. When the program pauses there, find `this` in the **Locals** window,
and press F10 to run the line. Which field has a value now, and which is
still `null`? Press Shift+F5 to stop.

</details>

</div>

## 2. A limit that moved

<div class="dl-world" data-world="game">

**Predict**, then **Fix**. On the earlier pages, no character could have
more health than `MaxHealth`, which is 10. Then the game added a troll,
which can have up to 30. So somebody gave the constructor a third
parameter, `maxHealth`: the most health this character can have. `Heal`
never raises the health above `MaxHealth`.

Ada heals 5, and the troll heals 10. What will the first line print?
Then, can you change `Character`, so that the program does what its
author meant?

```csharp exec
id: a-limit-that-moved-1--game
file: Character.cs
class Character
{
    public static int MaxHealth = 10;

    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health, int maxHealth)
    {
        Name = name;
        Health = health;
        MaxHealth = maxHealth;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

```csharp exec
id: a-limit-that-moved-1-program--game
var ada = new Character("Ada", 8, 10);
var troll = new Character("Troll", 25, 30);
ada.Heal(5);
troll.Heal(10);
Console.WriteLine(ada);
Console.WriteLine(troll);
```

```predict
type: choice

What will the first line print?

- Ada (health 10)
  - Ada was made with a limit of 10, and `Heal` stops there.
- Ada (health 13)
  - `Heal` stops at `MaxHealth`. What is `MaxHealth` when Ada heals?
- It does not compile
  - `MaxHealth` is `static`. Can a constructor change it?
```

```inputs
ada.Health
troll.Health
```

```hint
after: guess differed
When Ada heals, what is `MaxHealth`? Which line of the program gave it
that value?
```

```hint
after: 2 runs
How many `MaxHealth` values are there in this program: one for each
character, or one for the whole class? Which word in the class decides
that?
```

```solution
var ada = new Character("Ada", 8, 10);
var troll = new Character("Troll", 25, 30);
ada.Heal(5);
troll.Heal(10);
Console.WriteLine(ada);
Console.WriteLine(troll);

class Character
{
    public string Name;
    public int Health { get; private set; }
    public int MaxHealth { get; private set; }

    public Character(string name, int health, int maxHealth)
    {
        Name = name;
        Health = health;
        MaxHealth = maxHealth;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
---
It prints `Ada (health 10)`, then `Troll (health 30)`. The solution writes
`Character` again, below its program *(rule 4)*. `MaxHealth` has no
`static` now, and it is a property, like `Health`: each character has a
limit of its own, which code outside the class can read and only the
class can change.
```

<details class="dl-answer"><summary>why</summary>

It prints `Ada (health 13)`, then `Troll (health 30)`. Ada went past her
limit of 10, and nothing refused it.

`MaxHealth` is a static field, so there is one `MaxHealth`, for the whole
class, and not one for each character. Each call to the constructor
stores its limit in that one field. The line that made Ada stored 10,
and then the line that made the troll stored 30 in the same place. When
Ada healed, `Heal` read `MaxHealth`, and found the troll's 30. The
compiler said nothing: inside the class, a static field is used by its
name, as an instance field is.

Delete `static`, and each character has a limit of its own. A static
field is for a value that is the same for every object of the class. Once
a troll can have more health than Ada, the limit belongs to each
character. The next page, [Inheritance](lesson:one-parent-many-children),
gives another answer for the troll: a class of its own, built on
`Character`.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Predict**, then **Fix**. On the earlier pages, every probe's tank held
`TankSize` kilograms of fuel, which is 100. Then the mission added Juno,
whose tank holds 500 kg. So somebody gave the constructor a third
parameter, `tankSize`: the most fuel this probe can hold. `Refuel` never
fills the tank past `TankSize`.

Each probe is refuelled with 50 kg. What will the first line print?
Then, can you change `Probe`, so that the program does what its author
meant?

```csharp exec
id: a-limit-that-moved-1--solar-system
file: Probe.cs
class Probe
{
    public static int TankSize = 100;

    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel, int tankSize)
    {
        Name = name;
        Fuel = fuel;
        TankSize = tankSize;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: a-limit-that-moved-1-program--solar-system
var voyager = new Probe("Voyager", 70, 100);
var juno = new Probe("Juno", 400, 500);
voyager.Refuel(50);
juno.Refuel(50);
Console.WriteLine(voyager);
Console.WriteLine(juno);
```

```predict
type: choice

What will the first line print?

- Voyager (fuel 100 kg)
  - Voyager was made with a tank of 100 kg, and `Refuel` stops there.
- Voyager (fuel 120 kg)
  - `Refuel` stops at `TankSize`. What is `TankSize` when Voyager is
    refuelled?
- It does not compile
  - `TankSize` is `static`. Can a constructor change it?
```

```inputs
voyager.Fuel
juno.Fuel
```

```hint
after: guess differed
When Voyager is refuelled, what is `TankSize`? Which line of the program
gave it that value?
```

```hint
after: 2 runs
How many `TankSize` values are there in this program: one for each probe,
or one for the whole class? Which word in the class decides that?
```

```solution
var voyager = new Probe("Voyager", 70, 100);
var juno = new Probe("Juno", 400, 500);
voyager.Refuel(50);
juno.Refuel(50);
Console.WriteLine(voyager);
Console.WriteLine(juno);

class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public int TankSize { get; private set; }

    public Probe(string name, int fuel, int tankSize)
    {
        Name = name;
        Fuel = fuel;
        TankSize = tankSize;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
---
It prints `Voyager (fuel 100 kg)`, then `Juno (fuel 450 kg)`. The
solution writes `Probe` again, below its program *(rule 4)*. `TankSize`
has no `static` now, and it is a property, like `Fuel`: each probe has a
tank size of its own, which code outside the class can read and only the
class can change.
```

<details class="dl-answer"><summary>why</summary>

It prints `Voyager (fuel 120 kg)`, then `Juno (fuel 450 kg)`. Voyager's
tank now holds more than its 100 kg, and nothing refused it.

`TankSize` is a static field, so there is one `TankSize`, for the whole
class, and not one for each probe. Each call to the constructor stores
its tank size in that one field. The line that made Voyager stored 100,
and then the line that made Juno stored 500 in the same place. When
Voyager was refuelled, `Refuel` read `TankSize`, and found Juno's 500.
The compiler said nothing: inside the class, a static field is used by
its name, as an instance field is.

Delete `static`, and each probe has a tank size of its own. A static
field is for a value that is the same for every object of the class. Once
Juno's tank can hold more than Voyager's, the tank size belongs to each
probe. The next page, [Inheritance](lesson:one-parent-many-children),
builds one class on another, and that gives another answer: a class for
a kind of probe with a bigger tank, built on `Probe`.

</details>

</div>

## 3. A list that grows by itself

<div class="dl-world" data-world="game">

**Predict**, then **Fix**. A character carries up to three things. The
list `_bag` is private, and `Carry` refuses a fourth thing. The property
`Bag` has only a `get`, so that code outside the class can see what the
character carries.

Ada tries to carry a rope, a lamp, a key and a sword. Then the program
adds a shield. What will the last line print? Then, can you change
`Character`, so that a character never carries more than three things?
Keep `Bag`, so that the program still compiles.

```csharp exec
id: a-list-that-grows-by-itself-1--game
file: Character.cs
class Character
{
    public string Name;
    private List<string> _bag = new List<string>();

    public Character(string name)
    {
        Name = name;
    }

    public List<string> Bag
    {
        get
        {
            return _bag;
        }
    }

    public void Carry(string item)
    {
        if (_bag.Count == 3)
        {
            Console.WriteLine($"Refused: {Name} carries three things already.");
            return;
        }
        _bag.Add(item);
    }
}
```

```csharp exec
id: a-list-that-grows-by-itself-1-program--game
var ada = new Character("Ada");
ada.Carry("rope");
ada.Carry("lamp");
ada.Carry("key");
ada.Carry("sword");
ada.Bag.Add("shield");
Console.WriteLine($"{ada.Name} carries {ada.Bag.Count} things: {string.Join(", ", ada.Bag)}");
```

```predict
type: choice

What will the last line print?

- Ada carries 3 things: rope, lamp, key
  - `Carry` refused the sword, and nothing else added to the bag.
- Ada carries 4 things: rope, lamp, key, shield
  - `ada.Bag.Add` is not `Carry`.
- It does not compile
  - `Bag` has no `set`.
```

```inputs
ada.Bag.Count
```

```hint
after: guess differed
How many lists are there in this program: one, or two? What does the
`get` of `Bag` give the program?
```

```hint
after: 2 runs
`new List<string>(_bag)` makes a new list, with the same things in it.
Where in `Character` could it go?
```

```solution
var ada = new Character("Ada");
ada.Carry("rope");
ada.Carry("lamp");
ada.Carry("key");
ada.Carry("sword");
ada.Bag.Add("shield");
Console.WriteLine($"{ada.Name} carries {ada.Bag.Count} things: {string.Join(", ", ada.Bag)}");

class Character
{
    public string Name;
    private List<string> _bag = new List<string>();

    public Character(string name)
    {
        Name = name;
    }

    public List<string> Bag
    {
        get
        {
            // A copy, so that the bag itself stays inside the class.
            return new List<string>(_bag);
        }
    }

    public void Carry(string item)
    {
        if (_bag.Count == 3)
        {
            Console.WriteLine($"Refused: {Name} carries three things already.");
            return;
        }
        _bag.Add(item);
    }
}
---
It prints the refusal, then `Ada carries 3 things: rope, lamp, key`. The
solution writes `Character` again, below its program *(rule 4)*. Now
`Bag` gives the program a copy of the bag. `ada.Bag.Add("shield")` adds
the shield to that copy, and nothing keeps the copy, so Ada's own bag
never changes.
```

<details class="dl-answer"><summary>why</summary>

It prints the refusal, then `Ada carries 4 things: rope, lamp, key,
shield`. `Carry` refused the sword, but the shield went into the bag, and
no rule checked it.

The `get` of `Bag` returns `_bag`: the list itself, and not a copy. So
`ada.Bag` and `_bag` are two names for one list, and
`ada.Bag.Add("shield")` adds to that one list without calling `Carry`.
`private` stops code outside the class from using the name `_bag`. It
does not stop that code from reaching the list by another name. And a
property with only a `get` stops a line such as
`ada.Bag = new List<string>();`, which would put a new list in the place
of the old one. It does not stop a change to the list that it gives.

`return` gives the caller the list itself, never a copy, in the same way
as a list passed to a method or to a constructor.
`return new List<string>(_bag);` gives a copy. Can you make that
change, and run the program again? Another design gives code outside the
class no list at all, only methods that answer a question about the bag,
such as `ItemCount()` or `Has(string item)`.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Predict**, then **Fix**. A planet keeps the names of its moons. The list
`_moons` is private, and `AddMoon` refuses a moon that the planet has
already. The property `Moons` has only a `get`, so that code outside the
class can see the moons.

Mars gets Phobos, Deimos, and Phobos a second time. Then the program adds
Phobos again, a third time. What will the last line print? Then, can you
change `Planet`, so that a planet never has the same moon twice? Keep
`Moons`, so that the program still compiles.

```csharp exec
id: a-list-that-grows-by-itself-1--solar-system
file: Planet.cs
class Planet
{
    public string Name;
    private List<string> _moons = new List<string>();

    public Planet(string name)
    {
        Name = name;
    }

    public List<string> Moons
    {
        get
        {
            return _moons;
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
}
```

```csharp exec
id: a-list-that-grows-by-itself-1-program--solar-system
var mars = new Planet("Mars");
mars.AddMoon("Phobos");
mars.AddMoon("Deimos");
mars.AddMoon("Phobos");
mars.Moons.Add("Phobos");
Console.WriteLine($"{mars.Name} has {mars.Moons.Count} moons: {string.Join(", ", mars.Moons)}");
```

```predict
type: choice

What will the last line print?

- Mars has 2 moons: Phobos, Deimos
  - `AddMoon` refused the second Phobos, and nothing else added to the
    list.
- Mars has 3 moons: Phobos, Deimos, Phobos
  - `mars.Moons.Add` is not `AddMoon`.
- It does not compile
  - `Moons` has no `set`.
```

```inputs
mars.Moons.Count
```

```hint
after: guess differed
How many lists are there in this program: one, or two? What does the
`get` of `Moons` give the program?
```

```hint
after: 2 runs
`new List<string>(_moons)` makes a new list, with the same moons in it.
Where in `Planet` could it go?
```

```solution
var mars = new Planet("Mars");
mars.AddMoon("Phobos");
mars.AddMoon("Deimos");
mars.AddMoon("Phobos");
mars.Moons.Add("Phobos");
Console.WriteLine($"{mars.Name} has {mars.Moons.Count} moons: {string.Join(", ", mars.Moons)}");

class Planet
{
    public string Name;
    private List<string> _moons = new List<string>();

    public Planet(string name)
    {
        Name = name;
    }

    public List<string> Moons
    {
        get
        {
            // A copy, so that the list itself stays inside the class.
            return new List<string>(_moons);
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
}
---
It prints the refusal, then `Mars has 2 moons: Phobos, Deimos`. The
solution writes `Planet` again, below its program *(rule 4)*. Now `Moons`
gives the program a copy of the list. `mars.Moons.Add("Phobos")` adds
Phobos to that copy, and nothing keeps the copy, so the planet's own list
never changes.
```

<details class="dl-answer"><summary>why</summary>

It prints the refusal, then `Mars has 3 moons: Phobos, Deimos, Phobos`.
`AddMoon` refused the second Phobos, but the third went into the list,
and no rule checked it.

The `get` of `Moons` returns `_moons`: the list itself, and not a copy.
So `mars.Moons` and `_moons` are two names for one list, and
`mars.Moons.Add("Phobos")` adds to that one list without calling
`AddMoon`. `private` stops code outside the class from using the name
`_moons`. It does not stop that code from reaching the list by another
name. And a property with only a `get` stops a line such as
`mars.Moons = new List<string>();`, which would put a new list in the
place of the old one. It does not stop a change to the list that it
gives.

`return` gives the caller the list itself, never a copy, in the same way
as a list passed to a method or to a constructor.
`return new List<string>(_moons);` gives a copy. Can you make that
change, and run the program again? Another design gives code outside the
class no list at all, only methods that answer a question about the
moons, such as `MoonCount()` or `HasMoon(string moon)`.

</details>

</div>

## 4. The test that finds the slip

<div class="dl-world" data-world="game">

**Make**, then **Fix**. A healer in the game helps only characters who
are badly hurt: with 3 health or less. `IsBadlyHurt()` is meant to say
whether a character is badly hurt. Somebody wrote `<` where they meant
`<=`.

A *test* runs a method with a value whose answer you know before you run
it, and shows the answer it gave beside the answer that was expected.
The program below has two tests. Both give the answer that was expected,
so the slip is still hidden. Which test would you add to find it? Add it
to the program, and run it. Then, can you fix `IsBadlyHurt`?

```csharp exec
id: the-test-that-finds-the-slip-1--game
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

    public bool IsBadlyHurt()    // 3 health or less
    {
        return Health < 3;
    }
}
```

```csharp exec
id: the-test-that-finds-the-slip-1-program--game
var ada = new Character("Ada", 8);
var grace = new Character("Grace", 1);
Console.WriteLine($"Ada, 8 health: {ada.IsBadlyHurt()}, expected False");
Console.WriteLine($"Grace, 1 health: {grace.IsBadlyHurt()}, expected True");
```

```inputs
new Character("Ada", 8).IsBadlyHurt()
new Character("Alan", 3).IsBadlyHurt()
new Character("Mira", 4).IsBadlyHurt()
new Character("Grace", 1).IsBadlyHurt()
```

```hint
after: 2 runs
`<` and `<=` give the same answer for most values of `Health`. For which
value do they give different answers?
```

```solution
title: the tests that find it
var ada = new Character("Ada", 8);
var grace = new Character("Grace", 1);
var alan = new Character("Alan", 3);
var mira = new Character("Mira", 4);
Console.WriteLine($"Ada, 8 health: {ada.IsBadlyHurt()}, expected False");
Console.WriteLine($"Grace, 1 health: {grace.IsBadlyHurt()}, expected True");
Console.WriteLine($"Alan, 3 health: {alan.IsBadlyHurt()}, expected True");
Console.WriteLine($"Mira, 4 health: {mira.IsBadlyHurt()}, expected False");
---
With `IsBadlyHurt` as the page gives it, the third line is
`Alan, 3 health: False, expected True`: that test finds the slip. The
fourth test, at 4 health, is one more than 3, and it gives the answer
that was expected.
```

```solution
title: the tests and the fix
var ada = new Character("Ada", 8);
var grace = new Character("Grace", 1);
var alan = new Character("Alan", 3);
var mira = new Character("Mira", 4);
Console.WriteLine($"Ada, 8 health: {ada.IsBadlyHurt()}, expected False");
Console.WriteLine($"Grace, 1 health: {grace.IsBadlyHurt()}, expected True");
Console.WriteLine($"Alan, 3 health: {alan.IsBadlyHurt()}, expected True");
Console.WriteLine($"Mira, 4 health: {mira.IsBadlyHurt()}, expected False");

class Character
{
    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public bool IsBadlyHurt()    // 3 health or less
    {
        return Health <= 3;
    }
}
---
Every line now gives the answer that was expected, and the third is
`Alan, 3 health: True, expected True`. The solution writes `Character`
again, below its program *(rule 4)*, with `<=` in `IsBadlyHurt`.
```

<details class="dl-answer"><summary>answer</summary>

A test with exactly 3 health. For 3, `<` gives `False` and `<=` gives
`True`, and only `True` is what the comment promises. For 8 and for 1,
both comparisons give the same answer, so those two tests could never
find the slip.

The two comparisons disagree only at 3: the *boundary*, the edge between
the values that a method says yes to and the values that it says no to.
So a test belongs at the boundary, and another just past it, at 4. When
you choose tests for a method of your own, find its boundaries first.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Make**, then **Fix**. Mission control shows a warning when a probe's
fuel is low: 10 kg or less. `IsLow()` is meant to say whether a probe's
fuel is low. Somebody wrote `<` where they meant `<=`.

A *test* runs a method with a value whose answer you know before you run
it, and shows the answer it gave beside the answer that was expected.
The program below has two tests. Both give the answer that was expected,
so the slip is still hidden. Which test would you add to find it? Add it
to the program, and run it. Then, can you fix `IsLow`?

```csharp exec
id: the-test-that-finds-the-slip-1--solar-system
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

    public bool IsLow()    // 10 kg or less
    {
        return Fuel < 10;
    }
}
```

```csharp exec
id: the-test-that-finds-the-slip-1-program--solar-system
var voyager = new Probe("Voyager", 70);
var juno = new Probe("Juno", 4);
Console.WriteLine($"Voyager, 70 kg: {voyager.IsLow()}, expected False");
Console.WriteLine($"Juno, 4 kg: {juno.IsLow()}, expected True");
```

```inputs
new Probe("Voyager", 70).IsLow()
new Probe("Pioneer", 10).IsLow()
new Probe("Cassini", 11).IsLow()
new Probe("Juno", 4).IsLow()
```

```hint
after: 2 runs
`<` and `<=` give the same answer for most values of `Fuel`. For which
value do they give different answers?
```

```solution
title: the tests that find it
var voyager = new Probe("Voyager", 70);
var juno = new Probe("Juno", 4);
var pioneer = new Probe("Pioneer", 10);
var cassini = new Probe("Cassini", 11);
Console.WriteLine($"Voyager, 70 kg: {voyager.IsLow()}, expected False");
Console.WriteLine($"Juno, 4 kg: {juno.IsLow()}, expected True");
Console.WriteLine($"Pioneer, 10 kg: {pioneer.IsLow()}, expected True");
Console.WriteLine($"Cassini, 11 kg: {cassini.IsLow()}, expected False");
---
With `IsLow` as the page gives it, the third line is
`Pioneer, 10 kg: False, expected True`: that test finds the slip. The
fourth test, at 11 kg, is one more than 10, and it gives the answer that
was expected.
```

```solution
title: the tests and the fix
var voyager = new Probe("Voyager", 70);
var juno = new Probe("Juno", 4);
var pioneer = new Probe("Pioneer", 10);
var cassini = new Probe("Cassini", 11);
Console.WriteLine($"Voyager, 70 kg: {voyager.IsLow()}, expected False");
Console.WriteLine($"Juno, 4 kg: {juno.IsLow()}, expected True");
Console.WriteLine($"Pioneer, 10 kg: {pioneer.IsLow()}, expected True");
Console.WriteLine($"Cassini, 11 kg: {cassini.IsLow()}, expected False");

class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool IsLow()    // 10 kg or less
    {
        return Fuel <= 10;
    }
}
---
Every line now gives the answer that was expected, and the third is
`Pioneer, 10 kg: True, expected True`. The solution writes `Probe` again,
below its program *(rule 4)*, with `<=` in `IsLow`.
```

<details class="dl-answer"><summary>answer</summary>

A test with exactly 10 kg. For 10, `<` gives `False` and `<=` gives
`True`, and only `True` is what the comment promises. For 70 and for 4,
both comparisons give the same answer, so those two tests could never
find the slip.

The two comparisons disagree only at 10: the *boundary*, the edge
between the values that a method says yes to and the values that it says
no to. So a test belongs at the boundary, and another just past it, at
11. When you choose tests for a method of your own, find its
boundaries first.

</details>

</div>

## 5. An example that is almost true

<div class="dl-world" data-world="game">

**Predict**, then **Fix**. A backpack keeps the weights of the things in
it, in kilograms. The comment above `AverageWeight` gives an example: for
things of 2, 5, 1 and 3 kg, the average is 2.75 kg. The method returns a
`double`, so it can give a number with a decimal part.

What will the program print? Then, if the code and its comment do not
agree, which one would you change? Can you make them agree?

```csharp exec
id: an-example-that-is-almost-true-1--game
file: Backpack.cs
class Backpack
{
    public string Owner;
    public List<int> Weights;    // kilograms

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }

    // The average weight of the things in the backpack, in kilograms.
    // For example, for 2, 5, 1 and 3 kg, it gives 2.75.
    public double AverageWeight()
    {
        int total = 0;
        foreach (int weight in Weights)
        {
            total = total + weight;
        }
        return total / Weights.Count;
    }
}
```

```csharp exec
id: an-example-that-is-almost-true-1-program--game
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.AverageWeight());
```

```predict
type: choice

What will it print?

- 2.75
  - The method returns a `double`, as the comment says.
- 2
  - Which types are `total` and `Weights.Count`?
- 3
  - A `double` is rounded to the nearest whole number.
```

```inputs
ada.AverageWeight()
new Backpack("Grace", new List<int> { 4, 6 }).AverageWeight()
new Backpack("Alan", new List<int> { 1, 2 }).AverageWeight()
```

```hint
after: guess differed
`total` and `Weights.Count` are both `int`. What does `/` do with two
whole numbers? And when does the answer become a `double`?
```

```hint
after: 2 runs
The division keeps its decimal part when one of its two numbers is a
`double`. Which variable could be a `double` from the start?
```

```solution
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.AverageWeight());

class Backpack
{
    public string Owner;
    public List<int> Weights;    // kilograms

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }

    // The average weight of the things in the backpack, in kilograms.
    // For example, for 2, 5, 1 and 3 kg, it gives 2.75.
    public double AverageWeight()
    {
        // A double, so that the division keeps its decimal part.
        double total = 0;
        foreach (int weight in Weights)
        {
            total = total + weight;
        }
        return total / Weights.Count;
    }
}
---
It prints `2.75`, as the comment says. The solution writes `Backpack`
again, below its program *(rule 4)*. `total` is a `double` now, so
`total / Weights.Count` divides a `double` by an `int`, and keeps the
decimal part. **Compare with a solution** shows why an example with a
decimal part was worth writing: for Grace's backpack, 4 kg and 6 kg, both
versions give 5.
```

<details class="dl-answer"><summary>why</summary>

It prints `2`. `total` is an `int`, and `Weights.Count` is an `int`, so
`/` divides two whole numbers, and drops the part after the point. Then
`return` turns that whole number into a `double`, and a `double` of 2
prints as `2`. The type in front of the method's name is the type of the
value that the method returns. It does not change how a calculation
inside the method is done.

There are two ways to make the code and the comment agree. You can
change the code, so that the division keeps its decimal part:
`double total = 0;`, as in the solution, or
`(double)total / Weights.Count`. Or you can change the promise: if whole
kilograms are enough for the game, the method returns an `int`, and the
comment says that the average drops the part after the point. Which one
to choose depends on what the game needs, and somebody has to decide it.

A comment with an example is a small promise to the people who read the
code, and nothing checks it. A later page,
[Documenting a class](lesson:documenting-a-class), writes examples as XML
comments, which Visual Studio shows wherever the method is used.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Predict**, then **Fix**. A planet keeps the widths of its large moons,
in kilometres. The comment above `AverageMoonWidth` gives an example: for
Jupiter's four large moons, 3643, 3122, 5268 and 4821 km wide, the
average is 4213.5 km. The method returns a `double`, so it can give a
number with a decimal part.

What will the program print? Then, if the code and its comment do not
agree, which one would you change? Can you make them agree?

```csharp exec
id: an-example-that-is-almost-true-1--solar-system
file: Planet.cs
class Planet
{
    public string Name;
    public List<int> Moons;    // widths in kilometres

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    // The average width of the planet's moons, in kilometres.
    // For example, for 3643, 3122, 5268 and 4821 km, it gives 4213.5.
    public double AverageMoonWidth()
    {
        int total = 0;
        foreach (int width in Moons)
        {
            total = total + width;
        }
        return total / Moons.Count;
    }
}
```

```csharp exec
id: an-example-that-is-almost-true-1-program--solar-system
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.AverageMoonWidth());
```

```predict
type: choice

What will it print?

- 4213.5
  - The method returns a `double`, as the comment says.
- 4213
  - Which types are `total` and `Moons.Count`?
- 4214
  - A `double` is rounded to the nearest whole number.
```

```inputs
jupiter.AverageMoonWidth()
new Planet("Mars", new List<int> { 22, 12 }).AverageMoonWidth()
new Planet("Uranus", new List<int> { 1578, 1523 }).AverageMoonWidth()
```

```hint
after: guess differed
`total` and `Moons.Count` are both `int`. What does `/` do with two whole
numbers? And when does the answer become a `double`?
```

```hint
after: 2 runs
The division keeps its decimal part when one of its two numbers is a
`double`. Which variable could be a `double` from the start?
```

```solution
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.AverageMoonWidth());

class Planet
{
    public string Name;
    public List<int> Moons;    // widths in kilometres

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    // The average width of the planet's moons, in kilometres.
    // For example, for 3643, 3122, 5268 and 4821 km, it gives 4213.5.
    public double AverageMoonWidth()
    {
        // A double, so that the division keeps its decimal part.
        double total = 0;
        foreach (int width in Moons)
        {
            total = total + width;
        }
        return total / Moons.Count;
    }
}
---
It prints `4213.5`, as the comment says. The solution writes `Planet`
again, below its program *(rule 4)*. `total` is a `double` now, so
`total / Moons.Count` divides a `double` by an `int`, and keeps the
decimal part. **Compare with a solution** shows why an example with a
decimal part was worth writing: for Mars's two moons, 22 km and 12 km,
both versions give 17.
```

<details class="dl-answer"><summary>why</summary>

It prints `4213`. `total` is an `int`, and `Moons.Count` is an `int`, so
`/` divides two whole numbers, and drops the part after the point. Then
`return` turns that whole number into a `double`, and a `double` of 4213
prints as `4213`. The type in front of the method's name is the type of
the value that the method returns. It does not change how a calculation
inside the method is done.

There are two ways to make the code and the comment agree. You can
change the code, so that the division keeps its decimal part:
`double total = 0;`, as in the solution, or
`(double)total / Moons.Count`. Or you can change the promise: if whole
kilometres are enough for the mission, the method returns an `int`, and
the comment says that the average drops the part after the point. Which
one to choose depends on what the mission needs, and somebody has to
decide it.

A comment with an example is a small promise to the people who read the
code, and nothing checks it. A later page,
[Documenting a class](lesson:documenting-a-class), writes examples as XML
comments, which Visual Studio shows wherever the method is used.

</details>

</div>

## 6. Two jobs in one method

<div class="dl-world" data-world="game">

**Explain**, then **Make**. `TakeTurn` asks the player what to do, and
then does it: `attack` takes 3 health from the monster, and `rest` heals
the character by 2. Run the program. It waits for you to type, twice:
type `attack` and press Enter, and then type `rest` and press Enter.

Suppose you want a test for `TakeTurn`: a program that checks, with
nobody at the keyboard, that `attack` takes 3 health from the monster and
that `rest` heals 2. Why is `TakeTurn` hard to test? Can you split it, so
that a test can call the part that decides, and nobody needs to type?

```csharp exec
id: two-jobs-in-one-method-1--game
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
        Health = Math.Max(0, Health - amount);
    }

    public void TakeTurn(Character monster)
    {
        Console.Write($"{Name}, attack or rest? ");
        string choice = Console.ReadLine();
        if (choice == "attack")
        {
            monster.TakeDamage(3);
        }
        else if (choice == "rest")
        {
            Health = Math.Min(10, Health + 2);
        }
    }
}
```

```csharp exec
id: two-jobs-in-one-method-1-program--game
stdin: "attack\nrest\n"
var ada = new Character("Ada", 6);
var troll = new Character("Troll", 12);
ada.TakeTurn(troll);
ada.TakeTurn(troll);
Console.WriteLine(ada);
Console.WriteLine(troll);
```

```hint
after: 2 runs
Which lines of `TakeTurn` ask, and which lines decide? Could the part
that decides get the choice as a parameter?
```

```solution
title: a method that decides, and a test
var ada = new Character("Ada", 6);
var troll = new Character("Troll", 12);
ada.Act("attack", troll);
Console.WriteLine($"attack: troll health {troll.Health}, expected 9");
ada.Act("rest", troll);
Console.WriteLine($"rest: Ada health {ada.Health}, expected 8");

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
        Health = Math.Max(0, Health - amount);
    }

    // Decides, and never asks.
    public void Act(string choice, Character monster)
    {
        if (choice == "attack")
        {
            monster.TakeDamage(3);
        }
        else if (choice == "rest")
        {
            Health = Math.Min(10, Health + 2);
        }
    }
}
---
It prints `attack: troll health 9, expected 9`, then
`rest: Ada health 8, expected 8`, and nobody typed anything. These are
the values that the program above gives when you type `attack` and then
`rest`. The solution writes `Character` again, below its program
*(rule 4)*, with `Act` in the place of `TakeTurn`.
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`TakeTurn` does two jobs in one method: it asks, and it decides. So every
test of it would wait for somebody to type. Split the two jobs.
`Act(choice, monster)` decides, and never asks: the choice is one of its
parameters. A test calls it with each choice, as the solution does. In
the program that a player uses, the statements ask the question, and
pass each answer to `Act`:

```csharp
Console.Write("Ada, attack or rest? ");
ada.Act(Console.ReadLine(), troll);
```

A loop that asks again, a menu, and a test can all use the same `Act`.
And `Character` no longer knows about the keyboard. It keeps the rules
of the game, and the program asks the player. This is the question
from [Designing classes](lesson:from-a-description-to-classes) again:
which part of the program is responsible for each job?

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Explain**, then **Make**. `TakeTurn` asks mission control what to do,
and then does it: `burn` uses 10 kg of fuel, and `photo` takes a
photograph. Run the program. It waits for you to type, twice: type
`burn` and press Enter, and then type `photo` and press Enter.

Suppose you want a test for `TakeTurn`: a program that checks, with
nobody at the keyboard, that `burn` uses 10 kg and that `photo` adds one
photograph. Why is `TakeTurn` hard to test? Can you split it, so that a
test can call the part that decides, and nobody needs to type?

```csharp exec
id: two-jobs-in-one-method-1--solar-system
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public int Photos { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg, photos {Photos})";
    }

    public void TakeTurn()
    {
        Console.Write($"{Name}, burn or photo? ");
        string choice = Console.ReadLine();
        if (choice == "burn")
        {
            Fuel = Math.Max(0, Fuel - 10);
        }
        else if (choice == "photo")
        {
            Photos = Photos + 1;
        }
    }
}
```

```csharp exec
id: two-jobs-in-one-method-1-program--solar-system
stdin: "burn\nphoto\n"
var voyager = new Probe("Voyager", 70);
voyager.TakeTurn();
voyager.TakeTurn();
Console.WriteLine(voyager);
```

```hint
after: 2 runs
Which lines of `TakeTurn` ask, and which lines decide? Could the part
that decides get the choice as a parameter?
```

```solution
title: a method that decides, and a test
var voyager = new Probe("Voyager", 70);
voyager.Act("burn");
Console.WriteLine($"burn: fuel {voyager.Fuel} kg, expected 60 kg");
voyager.Act("photo");
Console.WriteLine($"photo: photos {voyager.Photos}, expected 1");

class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public int Photos { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg, photos {Photos})";
    }

    // Decides, and never asks.
    public void Act(string choice)
    {
        if (choice == "burn")
        {
            Fuel = Math.Max(0, Fuel - 10);
        }
        else if (choice == "photo")
        {
            Photos = Photos + 1;
        }
    }
}
---
It prints `burn: fuel 60 kg, expected 60 kg`, then
`photo: photos 1, expected 1`, and nobody typed anything. These are the
values that the program above gives when you type `burn` and then
`photo`. The solution writes `Probe` again, below its program
*(rule 4)*, with `Act` in the place of `TakeTurn`.
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`TakeTurn` does two jobs in one method: it asks, and it decides. So every
test of it would wait for somebody to type. Split the two jobs.
`Act(choice)` decides, and never asks: the choice is its parameter. A
test calls it with each choice, as the solution does. In the program
that mission control uses, the statements ask the question, and pass
each answer to `Act`:

```csharp
Console.Write("Voyager, burn or photo? ");
voyager.Act(Console.ReadLine());
```

A loop that asks again, a menu, and a test can all use the same `Act`.
And `Probe` no longer knows about the keyboard. It keeps the rules of the
probe, and the program asks mission control. This is the question from
[Designing classes](lesson:from-a-description-to-classes) again: which
part of the program is responsible for each job?

</details>

</div>

## 7. Class, field, list or enum?

<div class="dl-world" data-world="game">

**Explain.** Here is a short description of one part of a game.

> Each hero can keep several pets. Every pet has a name, and eats.
> Dragons also breathe fire, and owls also carry letters. A pet can be
> given to another hero.

Which classes would you write? Would each of the other nouns be a field,
a list, or an enum? And when a pet is given to another hero, what
changes: the pet, or the heroes?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

- `Pet` is a class. A pet knows its name and what kind of pet it is, and
  it does things: it eats, and it does its trick.
- The kind of pet, dragon or owl, is one of a fixed list, so it can be
  an enum, `enum PetKind { Dragon, Owl }`, and a field of `Pet`.
  Breathing fire and carrying letters are then one method, `Trick()`,
  which chooses by the kind, with an `if`.
- `Hero` is a class, with a list of pets, `List<Pet>`, in a private
  field. A method such as `Adopt` adds a pet, so a rule about pets, such
  as how many a hero can keep, lives in one place.
- Giving a pet to another hero changes two lists: one hero's list loses
  the pet, and the other hero's list gains it. The pet itself does not
  change, and it is not copied. It is the same object, in another list.

Another answer that works has no enum: a field `Trick`, a string such as
`"breathes fire"`, if the trick is never more than a line of text. The
next page, [Inheritance](lesson:one-parent-many-children), gives a third
answer, with a class for dragons and a class for owls, each built on
`Pet`. The challenge below starts from the first answer.

</details>

</div>

<div class="dl-world" data-world="solar-system">

**Explain.** Here is a short description of one part of a space
programme.

> Mission control watches many spacecraft. Every spacecraft has a name,
> and uses fuel. Landers also land on a surface, and orbiters
> also take photographs from orbit. Each flight team is responsible for
> several spacecraft, and a spacecraft can be moved to another team.

Which classes would you write? Would each of the other nouns be a field,
a list, or an enum? And when a spacecraft is moved to another team, what
changes: the spacecraft, or the teams?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

- `Spacecraft` is a class. A spacecraft knows its name, its fuel and
  what kind of spacecraft it is, and it does things: it burns fuel, and
  it does its job.
- The kind of spacecraft, lander or orbiter, is one of a fixed list, so
  it can be an enum, `enum CraftKind { Lander, Orbiter }`, and a field of
  `Spacecraft`. Landing and taking photographs from orbit are then one
  method, `Job()`, which chooses by the kind, with an `if`.
- `Team` is a class, with a list of spacecraft, `List<Spacecraft>`, in a
  private field. A method such as `Take` adds a spacecraft, so a rule
  about the team's spacecraft, such as how many it is responsible for,
  lives in one place.
- Moving a spacecraft to another team changes two lists: one team's list
  loses it, and the other team's list gains it. The spacecraft itself
  does not change, and it is not copied. It is the same object, in
  another list.
- Mission control is the team that uses the program, as on
  [Designing classes](lesson:from-a-description-to-classes), so it is
  not a class.

Another answer that works has no enum: a field `Job`, a string such as
`"lands on a surface"`, if the job is never more than a line of text.
The next page, [Inheritance](lesson:one-parent-many-children), gives a
third answer, with a class for landers and a class for orbiters, each
built on `Spacecraft`. The challenge below starts from the first answer.

</details>

</div>

## Looking back

In problems 1 to 5, every program compiled, and the compiler reported
nothing. What showed you each problem: an exception report, a line of
output that you did not expect, or a test? Which of them would a person
who uses the program have noticed?

## A challenge

<div class="dl-world" data-world="game">

Here is the design from the answer to problem 7, as a skeleton. Can you
write the body of each method, so that the program shows each hero's
pets, before and after Ada gives Ember to Grace? `GiveTo` should refuse a
pet that the hero does not have. In one file, C# needs the program's
statements before any class, so the classes come last here.

```csharp challenge
var ada = new Hero("Ada");
var grace = new Hero("Grace");
var ember = new Pet("Ember", PetKind.Dragon);
ada.Adopt(ember);
ada.Adopt(new Pet("Hoot", PetKind.Owl));
Console.WriteLine($"{ada.Name}: {ada.PetNames()}");
ada.GiveTo(ember, grace);
Console.WriteLine($"{ada.Name}: {ada.PetNames()}");
Console.WriteLine($"{grace.Name}: {grace.PetNames()}");
Console.WriteLine(ember.Trick());

enum PetKind
{
    Dragon,
    Owl
}

class Pet
{
    public string Name;
    public PetKind Kind;

    public Pet(string name, PetKind kind)
    {
        Name = name;
        Kind = kind;
    }

    // A dragon breathes fire, and an owl carries a letter.
    public string Trick()
    {
        throw new NotImplementedException();
    }
}

class Hero
{
    public string Name;
    private List<Pet> _pets = new List<Pet>();

    public Hero(string name)
    {
        Name = name;
    }

    public void Adopt(Pet pet)
    {
        throw new NotImplementedException();
    }

    // Refuses a pet that this hero does not have.
    public void GiveTo(Pet pet, Hero other)
    {
        throw new NotImplementedException();
    }

    public string PetNames()
    {
        throw new NotImplementedException();
    }
}
```

</div>

<div class="dl-world" data-world="solar-system">

Here is the design from the answer to problem 7, as a skeleton. Can you
write the body of each method, so that the program shows each team's
spacecraft, before and after Philae moves to the second team? `MoveTo`
should refuse a spacecraft that the team does not have. In one file, C#
needs the program's statements before any class, so the classes come last
here.

```csharp challenge
var alpha = new Team("Team Alpha");
var beta = new Team("Team Beta");
var philae = new Spacecraft("Philae", CraftKind.Lander);
alpha.Take(philae);
alpha.Take(new Spacecraft("Juno", CraftKind.Orbiter));
Console.WriteLine($"{alpha.Name}: {alpha.CraftNames()}");
alpha.MoveTo(philae, beta);
Console.WriteLine($"{alpha.Name}: {alpha.CraftNames()}");
Console.WriteLine($"{beta.Name}: {beta.CraftNames()}");
Console.WriteLine(philae.Job());

enum CraftKind
{
    Lander,
    Orbiter
}

class Spacecraft
{
    public string Name;
    public CraftKind Kind;

    public Spacecraft(string name, CraftKind kind)
    {
        Name = name;
        Kind = kind;
    }

    // A lander lands, and an orbiter takes photographs from orbit.
    public string Job()
    {
        throw new NotImplementedException();
    }
}

class Team
{
    public string Name;
    private List<Spacecraft> _craft = new List<Spacecraft>();

    public Team(string name)
    {
        Name = name;
    }

    public void Take(Spacecraft craft)
    {
        throw new NotImplementedException();
    }

    // Refuses a spacecraft that this team does not have.
    public void MoveTo(Spacecraft craft, Team other)
    {
        throw new NotImplementedException();
    }

    public string CraftNames()
    {
        throw new NotImplementedException();
    }
}
```

</div>

## Where to go next

Next, [Inheritance: one class built on another](lesson:one-parent-many-children)
starts the third series, Classes working together. It builds one class on
another, and that gives problems 2 and 7 another answer.

If a problem here took you a long time, the page it needs is one of the
six in this series:
[Classes and objects](lesson:objects-and-classes),
[Inside a method](lesson:the-moves-you-already-know),
[Visual Studio: the tools around your code](lesson:the-tools-around-your-code),
[Encapsulation](lesson:keeping-details-inside-an-object),
[Methods and overloading](lesson:one-class-many-methods) and
[Designing classes](lesson:from-a-description-to-classes). The fold below
says which pages each problem uses.

<details class="dl-hint"><summary>which pages each problem uses</summary>

For a teacher, or for anybody who is stuck: these are the pages whose
ideas each problem uses.

| Problem | Pages |
|---|---|
| 1. An object with no name | [Classes and objects](lesson:objects-and-classes), [Methods and overloading](lesson:one-class-many-methods), [Visual Studio](lesson:the-tools-around-your-code) |
| 2. A limit that moved | [Methods and overloading](lesson:one-class-many-methods), [Encapsulation](lesson:keeping-details-inside-an-object), [Classes and objects](lesson:objects-and-classes) |
| 3. A list that grows by itself | [Encapsulation](lesson:keeping-details-inside-an-object), [Methods and overloading](lesson:one-class-many-methods), [the practice page for Designing classes](lesson:from-a-description-to-classes-practice) |
| 4. The test that finds the slip | [Inside a method](lesson:the-moves-you-already-know), [Methods and overloading](lesson:one-class-many-methods), [Reading input](lesson:reading-input) |
| 5. An example that is almost true | [Inside a method](lesson:the-moves-you-already-know), [C# for Python programmers](lesson:from-python-to-csharp), [Encapsulation](lesson:keeping-details-inside-an-object) |
| 6. Two jobs in one method | [Reading input](lesson:reading-input), [Designing classes](lesson:from-a-description-to-classes), [Classes and objects](lesson:objects-and-classes) |
| 7. Class, field, list or enum? | [Designing classes](lesson:from-a-description-to-classes), [Encapsulation](lesson:keeping-details-inside-an-object), [Methods and overloading](lesson:one-class-many-methods) |

</details>

## Where to read more

Microsoft. *Use constructors (C# programming guide)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/using-constructors>.
This page shows a class with three constructors, and a constructor that
runs another one with `: this(...)`, as the fix in problem 1 does. Some
of its examples write a constructor or a method with `=>`: a short way to
write one whose body is a single line, which these pages have not used.
