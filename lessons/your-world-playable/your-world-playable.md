---
title: "Your world, playable: the whole course in one program"
version: 2026.09.28.1
from: your-world-playable
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO6, FOOP-LO7, FOOP-LO10, FOOP-LO11]
---

# Your world, playable: the whole course in one program

Every page since [Classes and objects](lesson:objects-and-classes) added
one thing to the classes in your world. On this page, they all run
together in one program: a world that someone else can play, or explore,
without reading a line of your code, and with all its tests passing.
Then the world moves to Visual Studio, and it is yours to grow.

## What you have

Here is what each page added to your world:

1. [Classes and objects](lesson:objects-and-classes): a class, with a
   constructor and `ToString`.
2. [Encapsulation](lesson:keeping-details-inside-an-object): one rule,
   kept by a method, and a private field behind a property.
3. [Methods and overloading](lesson:one-class-many-methods): a method
   that answers a question, used by another method, and a static field.
4. [Designing classes](lesson:from-a-description-to-classes): cards for
   the classes your world needs, before any code.
5. [Inheritance](lesson:one-parent-many-children): at most one child
   class, and one sentence that says why it is a kind of its parent.
6. [Composition](lesson:objects-inside-objects): a class that holds
   your objects.
7. [Testing a class](lesson:testing-what-a-class-does): five tests, one
   of them at a boundary, and one missing rule added.
8. [Documenting a class](lesson:documenting-a-class): XML comments on
   every class and method a caller uses, with examples that a program
   checks.
9. [A front end](lesson:a-front-end-for-a-class): a `RunChoice` method
   that decides what each command does, tested with an array of
   commands, and two front ends that ask the player for a command: a
   loop that reads it, and a numbered menu.

Three more pages add tools, not a new version:
[Visual Studio](lesson:the-tools-around-your-code), where a program is
files in a project; [Interfaces](lesson:many-classes-one-promise), where several classes keep one
promise; and [Namespaces and class libraries](lesson:namespaces-and-libraries), where classes live in a
project of their own, for other projects to use. Visual Studio and class
libraries return in the second half of this page.

## Your world, running

Here is one world with all of it. Every class is in its eighth version,
as it stood at the end of [A front end](lesson:a-front-end-for-a-class),
with its XML comments. Each class has a cell of its own, with the file
name it will have in Visual Studio. Below the classes are two programs:
the five tests from [Testing a class](lesson:testing-what-a-class-does),
and the game itself.

First, here is `Test`, from the same page. `Check` compares what a claim
expects with what the program found, and `RunAll` runs a list of tests
and counts the ones that pass. It is the same in every world.

```csharp exec
id: your-world-running-test
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

<div class="dl-world" data-world="game">

The next four cells hold `Character`, `Healer` and `Room`, with their
comments, and `Commands`. `Commands` is the `static` class that holds
`RunChoice`: the method that decides what each command does, and never
asks for one.

```csharp exec
id: your-world-running--game
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
id: your-world-running-healer--game
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
id: your-world-running-room--game
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
id: your-world-running-commands--game
file: Commands.cs
/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: look, attack, heal or quit. For any other text, it
    /// prints that the text is not a command, and changes nothing.
    /// </summary>
    /// <param name="hero">The player's character.</param>
    /// <param name="healer">The healer in the hero's party.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the game stops; otherwise true.</returns>
    public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine($"{hero} | {healer} | {monster}");
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // a monster that is down cannot hit the hero
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "heal")
        {
            healer.HealOther(hero, 2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

The first program runs the five tests. What will it print first?

```csharp exec
id: your-world-running-program--game
Test.RunAll(new List<Action>
{
    AHitTakesHealth,
    AHitToExactlyZeroLeavesAdaDown,
    AHealOfANegativeAmountChangesNothing,
    AHealStopsAtMaxHealth,
    NobodyDownIsStanding
});

void AHitTakesHealth()
{
    var ada = new Character("Ada", 10);
    ada.TakeDamage(3);
    Test.Check("a hit of 3 takes 3 health", 7, ada.Health);
}

void AHitToExactlyZeroLeavesAdaDown()
{
    var ada = new Character("Ada", 10);
    ada.TakeDamage(10);
    Test.Check("a hit of 10 leaves Ada down", true, ada.IsDown());
}

void AHealOfANegativeAmountChangesNothing()
{
    var ada = new Character("Ada", 5);
    ada.Heal(-50);
    Test.Check("a heal of -50 changes nothing", 5, ada.Health);
}

void AHealStopsAtMaxHealth()
{
    var ada = new Character("Ada", 9);
    ada.Heal(5);
    Test.Check("a heal stops at MaxHealth", 10, ada.Health);
}

void NobodyDownIsStanding()
{
    var cave = new Room("Cave");
    var ada = new Character("Ada", 10);
    cave.Enter(ada);
    cave.Enter(new Healer("Mira", 10));
    ada.TakeDamage(12);
    Test.Check("only Mira is standing", "Mira", string.Join(", ", cave.Standing()));
}
```

```predict
type: choice

What will the first line print?

- Tests run: 5. Passed: 5.
  - All five tests pass, so the count is all there is to print.
- Refused: healing cannot be negative.
  - `Heal` prints why it refuses, even when a test calls it.
- a heal of -50 changes nothing: expected 5, found 5
  - `Test.Check` prints each claim it checks.
```

It prints `Refused: healing cannot be negative.`, from the test that
heals Ada by -50, and then `Tests run: 5. Passed: 5.` The first line is
not a test that failed. `Heal` refused the -50, as its comment promises,
and printed why. Then `Test.Check` found Ada's health as the claim
expected. A test passes when its check finds what the claim expects,
whatever else the classes print.

The second program is the game. It starts a new game, and then asks for
a command, again and again, until the player types `quit`. The `if` is
the one from *A loop that asks*, on
[A front end](lesson:a-front-end-for-a-class): when the input ends, the
game ends too. Run it, and play: type a command after each `What now?`.
What happens when you type `Attack`, with a capital letter?

```csharp exec
id: your-world-front-end--game
stdin: "look\nattack\nattack\nheal\ndance\nquit\n"
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
Console.WriteLine("A new game: Ada and Mira against Grog.");
Console.WriteLine("Commands: look, attack, heal, quit");

bool stillPlaying = true;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";    // the input has ended, so nobody is left to play
    }
    stillPlaying = Commands.RunChoice(ada, mira, grog, choice);
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

</div>

<div class="dl-world" data-world="solar-system">

The next four cells hold `Probe`, `Lander` and `Mission`, with their
comments, and `Commands`. `Commands` is the `static` class that holds
`RunChoice`: the method that decides what each command does, and never
asks for one.

```csharp exec
id: your-world-running--solar-system
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
id: your-world-running-lander--solar-system
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
id: your-world-running-mission--solar-system
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
id: your-world-running-commands--solar-system
file: Commands.cs
/// <summary>The commands a player can give to a probe.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command for the probe: burn (10 kg), refuel (20 kg), status
    /// or quit. For any other text, it prints that the text is not a
    /// command, and changes nothing.
    /// </summary>
    /// <param name="probe">Any probe, a lander too.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the mission stops; otherwise true.</returns>
    public static bool RunChoice(Probe probe, string choice)
    {
        if (choice == "burn")
        {
            probe.Burn(10);
            Console.WriteLine(probe);
        }
        else if (choice == "refuel")
        {
            probe.Refuel(20);
            Console.WriteLine(probe);
        }
        else if (choice == "status")
        {
            Console.WriteLine($"{probe} | can burn 10 kg: {probe.CanBurn(10)}");
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

The first program runs the five tests. What will it print first?

```csharp exec
id: your-world-running-program--solar-system
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    AProbeCanBurnAllThatItHas,
    ANegativeBurnChangesNothing,
    ALandedLanderCannotBurn,
    OnlyReadyProbesAreListed
});

void ABurnUsesFuel()
{
    var voyager = new Probe("Voyager", 100);
    voyager.Burn(30);
    Test.Check("a burn of 30 kg leaves 70 kg", 70, voyager.Fuel);
}

void AProbeCanBurnAllThatItHas()
{
    var voyager = new Probe("Voyager", 70);
    Test.Check("a probe with 70 kg can burn 70 kg", true, voyager.CanBurn(70));
}

void ANegativeBurnChangesNothing()
{
    var voyager = new Probe("Voyager", 70);
    voyager.Burn(-50);
    Test.Check("a burn of -50 kg changes nothing", 70, voyager.Fuel);
}

void ALandedLanderCannotBurn()
{
    var philae = new Lander("Philae", 40);
    philae.Land();
    Test.Check("a landed lander cannot burn 5 kg", false, philae.CanBurn(5));
}

void OnlyReadyProbesAreListed()
{
    var outer = new Mission("Outer Planets");
    var philae = new Lander("Philae", 40);
    outer.Launch(new Probe("Voyager", 70));
    outer.Launch(philae);
    philae.Land();
    Test.Check("only Voyager is ready for 30 kg", "Voyager", string.Join(", ", outer.ReadyFor(30)));
}
```

```predict
type: choice

What will the first line print?

- Tests run: 5. Passed: 5.
  - All five tests pass, so the count is all there is to print.
- Refused: Voyager cannot burn -50 kg now.
  - `Burn` prints why it refuses, even when a test calls it.
- a burn of -50 kg changes nothing: expected 70, found 70
  - `Test.Check` prints each claim it checks.
```

It prints `Refused: Voyager cannot burn -50 kg now.`, from the test that
burns -50 kg, and then `Tests run: 5. Passed: 5.` The first line is not
a test that failed. `Burn` refused the -50 kg, as its comment promises,
and printed why. Then `Test.Check` found Voyager's fuel as the claim
expected. A test passes when its check finds what the claim expects,
whatever else the classes print.

The second program is the mission. It starts with the lander Philae and
40 kg of fuel, and then asks for a command, again and again, until the
player types `quit`. The `if` is the one from *A loop that asks*, on
[A front end](lesson:a-front-end-for-a-class): when the input ends, the
mission ends too. Run it, and fly: type a command after each
`Command:`. What happens when you type `Burn`, with a capital letter?

```csharp exec
id: your-world-front-end--solar-system
stdin: "status\nburn\nburn\nrefuel\norbit\nquit\n"
var philae = new Lander("Philae", 40);
Console.WriteLine("A new mission: Philae, with 40 kg of fuel.");
Console.WriteLine("Commands: burn, refuel, status, quit");

bool stillFlying = true;
do
{
    Console.Write("Command: ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";    // the input has ended, so nobody is left to fly
    }
    stillFlying = Commands.RunChoice(philae, choice);
} while (stillFlying);
Console.WriteLine("Mission over.");
```

</div>

<div class="dl-world" data-world="your-own">

Copy your classes and your `Commands` from
[A front end](lesson:a-front-end-for-a-class) into the first cell: they
are saved in the last cells of that page, in your own world. Put your
five tests from [Testing a class](lesson:testing-what-a-class-does) in
the second cell, with `Test.RunAll` and a list of them. Put a front end
in the third: your numbered menu, or a loop that asks for a command, as
the game and the solar system do. Do all your tests pass, together, in
one program?

```csharp exec
id: your-world-running--your-own
// My classes and Commands: the eighth version.
```

```csharp exec
id: your-world-running-program--your-own
// My five tests, and Test.RunAll with a list of them.
```

```csharp exec
id: your-world-front-end--your-own
// My front end: a new game, and a loop or a menu that asks for a command.
```

</div>

Your own version of this world may be different from the one on this
page, with other names, another child class or another rule. That is how
it should be: it is your world. Is every piece from *What you have* in
it? Do all its tests pass?

## Your world in Visual Studio

Everything above this part runs here, in the browser. This part needs a
computer with Visual Studio, which runs on Windows. If you are not at
one now, this is a good place to stop, and to return to later.

On the page, your world is a column of cells. In Visual Studio, it
becomes one *solution*: a group of projects that Visual Studio builds
together, listed in one `.sln` file. A *project* is one program, or one
library, with its own files and its own settings. Your world's solution
has three projects, one for each job:

```text
the solution         the file whose name ends in .sln
  GameWorld          a class library: Character.cs, Healer.cs, Room.cs, Commands.cs
  the console app    the project you download: Program.cs, the game
  GameWorld.Tests    a test project: the five tests
```

A *class library* is a project that holds classes for other projects to
use. It has no program of its own, so it does not run by itself. In the
solar system, the library is `SolarSystem`, and the test project is
`SolarSystem.Tests`. The classes live in the class library, and they do
not know who uses them. The console app is one user of the classes, and
the test project is another. A window, if you build one, is one more
project beside them. The third skills demonstration in this module, one
of its assessed projects, asks for this shape: classes, one of them
built on another, in a class library, with a front end that uses them.

### The program, as a project

Press **Download project** on the game, the second program in
*Your world, running*, and open it, as on
[Visual Studio](lesson:the-tools-around-your-code). In the solar system,
it is the mission; in your own world, your front end. The project has a
file for each class above the program, `Test.cs` too, and the program
itself is in `Program.cs`. Its name is made from the names of the page
and the cell, such as `YourWorldPlayableYourWorldFrontEndGame`. It is
the console app, and it can keep that name. Press Ctrl+F5. It runs in a
console window, as it did on the page.

### A class library for your classes

1. In Solution Explorer, right-click the solution (the top line), and
   choose **Add** > **New Project**. Choose **Class Library** for C#,
   and choose **Next**. Name it after your world, such as `GameWorld` or
   `SolarSystem`, and choose **Next**. Choose **.NET 10.0 (Long Term
   Support)**, and choose **Create**. The template makes a file called
   `Class1.cs`. Delete it.
2. Right-click the library, and choose **Add** > **Existing Item**. In
   the console app's folder, select every class file except `Program.cs`,
   `Test.cs` and `IrishCulture.cs`, and choose **Add**. Visual Studio
   copies them into the library. Then delete the same files from the
   console app. In your own world, all your classes are in one file, and
   they can stay together in it.
3. Open each file in the library. Add a namespace line at the top, and
   write `public` in front of `class`:

```csharp
namespace GameWorld;

public class Character
{
```

A *namespace* is a named group of classes. `namespace GameWorld;` puts
every class in its file into the group `GameWorld`. In `Commands.cs`,
the class line is `public static class Commands`. A class with no access
modifier is *internal*: only the project it is in can use it. `public`
lets the other projects use it too.

Now build the solution: choose **Build** > **Build Solution**, or press
Ctrl+Shift+B. The library compiles, and the console app does not. What
does the first message in the Error List say? Why can the console app no
longer find `Character`?

<details class="dl-answer"><summary>what the Error List says</summary>

The first message is `error CS0246: The type or namespace name
'Character' could not be found (are you missing a using directive or an
assembly reference?)`. The classes are in another project now, and the
console app has no reference to it. So, for the console app, `Character`
does not exist. `Healer` gets the same message, and `Commands` gets
`error CS0103: The name 'Commands' does not exist in the current
context`. In the solar system, the first message names `Lander`, and
`Commands` gets CS0103 too. The next two steps fix all of them. With the
reference and without the `using` line, the messages stay, because the
classes are in the namespace `GameWorld` or `SolarSystem`. With the
`using` line and without the reference, there is one message, and it
names the namespace itself.

</details>

### The console app, using the library

1. In the console app, right-click **Dependencies**, choose **Add Project
   Reference**, tick the library, and choose **OK**. A *project
   reference* lets one project use the public classes of another.
2. Add this line at the top of `Program.cs`, with your library's name.
   It lets the program name the classes in the namespace `GameWorld`
   without writing `GameWorld.` in front of each one.

```csharp
using GameWorld;
```

Right-click the console app, and choose **Set as Startup Project**. Press
Ctrl+F5. It is the same game, and its classes are now in the library.

### A test project for your tests

1. Right-click the solution, choose **Add** > **New Project**, and choose
   **MSTest Test Project**, as on
   [Testing a class](lesson:testing-what-a-class-does). Name it
   `GameWorld.Tests` or `SolarSystem.Tests`, and give it a reference to
   the library, as you did for the console app.
2. In the test file that the template made, write your five tests, each
   as a `[TestMethod]`, with `Assert.AreEqual` in place of `Test.Check`:

```csharp
namespace GameWorld.Tests;

[TestClass]
public class CharacterTests
{
    [TestMethod]
    public void AHitTakesHealth()
    {
        var ada = new Character("Ada", 10);
        ada.TakeDamage(3);
        Assert.AreEqual(7, ada.Health);
    }
}
```

The test file needs no `using GameWorld;` line. Its namespace,
`GameWorld.Tests`, is inside `GameWorld`, so it can already name the
library's classes. For a check of `true` or `false`, MSTest has
`Assert.IsTrue` and `Assert.IsFalse`, such as
`Assert.IsTrue(ada.IsDown());`. Visual Studio suggests them if you write
`Assert.AreEqual(true, ...)`. Then choose **Test** > **Test Explorer**,
and **Run All**. The console app no longer needs `Test.cs`, because the
test project does its job. You can delete it.

The class library and the test project come from Visual Studio's
templates, so they have *nullable reference types* on, which the page
has off (see [Visual Studio](lesson:the-tools-around-your-code)). With
the setting on, the compiler warns about values that could be `null`,
with codes such as CS8600 and CS8618. The classes on this page give no
such warning. If your own classes give some, they are warnings, and the
program still runs. To match the page, change
`<Nullable>enable</Nullable>` to `<Nullable>disable</Nullable>` in the
project's file. The console app you downloaded has `disable` already.

### Publishing

Publish the console app to a folder, as on
[A front end](lesson:a-front-end-for-a-class). The folder holds a program
that someone can run without Visual Studio. Look inside it: your class
library is there too, as a file of its own, such as `GameWorld.dll`. If
you built the window on that page, it can be a fourth project in this
solution, with a reference to the library, like the console app.

## Making it yours

The interesting part starts when your world runs. Choose something to
add, and add it the way this course did: first a test, which does not
pass until the rule is there; then the rule, in a method; then its XML
comment; then a command, so that a player can reach it. You can do this
on the page, in the cells above, or in Visual Studio.

<div class="dl-world" data-world="game">

Here is the first step for one small rule. Ada has 0 health, so she is
down. Can she still attack? The test below says she cannot: Ada attacks
Grog, and the test checks that Grog's health did not change.

```csharp exec
id: a-test-first--game
Test.RunAll(new List<Action>
{
    ADownHeroCannotAttack
});

void ADownHeroCannotAttack()
{
    var ada = new Character("Ada", 0);
    var mira = new Healer("Mira", 10);
    var grog = new Character("Grog", 8);
    Commands.RunChoice(ada, mira, grog, "attack");
    Test.Check("a hero who is down cannot hurt Grog", 8, grog.Health);
}
```

```predict
type: choice

What will the last line print?

- Tests run: 1. Passed: 1.
  - Ada is down, so her attack does nothing.
- Tests run: 1. Passed: 0.
  - Nothing in `RunChoice` asks whether the hero is down.
```

It prints three lines:

```console
Ada (health 0) | Grog (health 5)
a hero who is down cannot hurt Grog: expected 8, found 5
Tests run: 1. Passed: 0.
```

Ada, with 0 health, hit Grog for 3. The test found a rule that the game
is missing, and it passes once the rule is there.

Can you add the rule to `RunChoice`, in the `Commands` cell above, and
run the test again? Then give the rule a sentence in the XML comment of
`RunChoice`.

```hint
after: 2 runs
Where in `RunChoice` does an attack happen? What could it ask about the
hero first, and which method of `Character` answers that question?
```

```solution
Test.RunAll(new List<Action>
{
    ADownHeroCannotAttack
});

void ADownHeroCannotAttack()
{
    var ada = new Character("Ada", 0);
    var mira = new Healer("Mira", 10);
    var grog = new Character("Grog", 8);
    Commands.RunChoice(ada, mira, grog, "attack");
    Test.Check("a hero who is down cannot hurt Grog", 8, grog.Health);
}

/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: look, attack, heal or quit. For any other text, it
    /// prints that the text is not a command, and changes nothing.
    /// A hero who is down cannot attack: the attack is refused, and nobody is hurt.
    /// </summary>
    /// <param name="hero">The player's character.</param>
    /// <param name="healer">The healer in the hero's party.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the game stops; otherwise true.</returns>
    public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine($"{hero} | {healer} | {monster}");
        }
        else if (choice == "attack" && hero.IsDown())
        {
            Console.WriteLine($"Refused: {hero.Name} is down.");
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // a monster that is down cannot hit the hero
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "heal")
        {
            healer.HealOther(hero, 2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
---
The solution prints `Refused: Ada is down.`, and then
`Tests run: 1. Passed: 1.` The rule is one more `else if`, before the
one for the attack: an attack by a hero who is down is refused, and
nobody is hurt. The XML comment of `RunChoice` says so too, so that a
caller knows before the call. The rule needs no new command, because it
is part of `attack`. Does the new rule change what the five tests in
*Your world, running* print? Run them again, and see.

In one file, C# needs the program's statements before any class, so
`Commands` comes after them here. This copy replaces the one above for
this program (rule 4: a class written again further down replaces the
earlier one).
```

</div>

<div class="dl-world" data-world="solar-system">

Here is the first step for one small rule. `Burn` refuses a negative
number of kilograms. Does `Refuel`? The test below refuels Voyager by
-50 kg, and checks that its fuel did not change.

```csharp exec
id: a-test-first--solar-system
Test.RunAll(new List<Action>
{
    ANegativeRefuelChangesNothing
});

void ANegativeRefuelChangesNothing()
{
    var voyager = new Probe("Voyager", 70);
    voyager.Refuel(-50);
    Test.Check("a refuel of -50 kg changes nothing", 70, voyager.Fuel);
}
```

```predict
type: choice

What will the last line print?

- Tests run: 1. Passed: 1.
  - `Refuel` stops at `TankSize`, so the fuel is always between 0 and
    `TankSize`.
- Tests run: 1. Passed: 0.
  - Nothing in `Refuel` asks whether `kg` is below 0.
```

It prints two lines:

```console
a refuel of -50 kg changes nothing: expected 70, found 20
Tests run: 1. Passed: 0.
```

A refuel of -50 kg removed 50 kg of fuel. The test found a rule that the
probe is missing, and it passes once the rule is there.

Can you add the rule to `Refuel`, in the `Probe` cell above, and run the
test again? Then give the rule a sentence in the XML comment of
`Refuel`.

```hint
after: 2 runs
How does `CanBurn` refuse a negative number of kilograms? What could
`Refuel` ask about `kg` before it changes the fuel?
```

```solution
Test.RunAll(new List<Action>
{
    ANegativeRefuelChangesNothing
});

void ANegativeRefuelChangesNothing()
{
    var voyager = new Probe("Voyager", 70);
    voyager.Refuel(-50);
    Test.Check("a refuel of -50 kg changes nothing", 70, voyager.Fuel);
}

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

    /// <summary>
    /// Adds kg kilograms of fuel, stopping at TankSize.
    /// Refuses a negative kg, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Refuel(int kg)
    {
        if (kg < 0)
        {
            Console.WriteLine($"Refused: {Name} cannot refuel {kg} kg.");
            return;
        }
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
---
The solution prints `Refused: Voyager cannot refuel -50 kg.`, and then
`Tests run: 1. Passed: 1.` The rule has the same shape as the refusal in
`Burn`: it checks first, prints why, and changes nothing. The XML
comment of `Refuel` says so too.

A player cannot reach this rule from the front end, because `refuel`
always adds 20 kg. The rule protects the probe from every other caller,
such as a teammate's code, so it needs no command.

In one file, C# needs the program's statements before any class, so
`Probe` comes after them here. This copy replaces the one above for this
program (rule 4: a class written again further down replaces the earlier
one). `Lander` and `Mission`, above, now use this one.
```

</div>

<div class="dl-world" data-world="your-own">

In your own world, the first step is the same. Which rule is your world
missing? Write its test first, in the last cell of this page, and run
it. What does it print before the rule is there?

</div>

Here are some things you could add. Your own idea may be better than any
of them.

<div class="dl-world" data-world="game">

- Treasure: a `Treasure` class with a value in gold, a room that holds
  it, and a hero who can carry at most three things.
- A second room, and a command to move between the two rooms.
- A monster that hits harder when its health is low: a child class of
  `Character`, which `RunChoice` asks how hard it hits.

</div>

<div class="dl-world" data-world="solar-system">

- Planets and moons: a probe that orbits one planet at a time, and
  photographs its moons.
- A mission that answers the question "which moons have we
  photographed?"
- An `Orbiter`: a child class of `Probe` that uses less fuel for every
  burn. Which method of `Probe` must be `virtual` first?

</div>

<div class="dl-world" data-world="your-own">

- The rule in your world that you have not written.
- A second container: something that holds your containers.
- A command that a player would try first, and that your front end does
  not have.

</div>

```csharp exec
id: making-it-yours-1
// My addition: its test first, then the rule, its XML comment and its command.
// The test goes here. The rule goes in a class above, or in a new class below the test.
```

Then show it to somebody. Ask someone who has never seen your code to
play, or explore, for five minutes, on this page or with the program you
published from Visual Studio. Watch, and do not help. What did they type
that you never planned for? Where did they stop, unsure what to do next?
A front end is finished when a stranger can use it, and the only way to
know is to watch one try.

## Looking back

These questions are for you, and for a conversation with your teacher or
a classmate if you want one. They ask about your own work, so there is no
answer to find on a page.

- Which of your classes changed most between the first page and this
  one? What made it change?
- Which rule was hardest to find a place for?
- Which test found something you did not expect?
- If you started your world again tomorrow, what would you design
  differently on the first page?

Your code is saved on this page, in this browser, on this device. In
Visual Studio, your world is a solution of files that you can keep, copy
and grow for as long as you like.

Next, [Mixed problems](lesson:mixed-programming-with-objects) has
problems from the whole course, in the game and the solar system.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one. The first three are Microsoft's own tutorials,
with the steps in Visual Studio.

Microsoft. *Tutorial: Create a .NET class library*. Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library?pivots=vs>.
The steps of *Your world in Visual Studio*, with more detail: a class
library, and a console app that uses it, in one solution.

Microsoft. *Tutorial: Test a .NET class library*. Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/test-class-library?pivots=vs>.
A test project beside the class library, with MSTest.

Microsoft. *Tutorial: Publish a .NET console application*. Microsoft
Learn.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/publish-console-app?pivots=vs>.
How to give your program to someone who does not have Visual Studio.

Microsoft. *Object-Oriented programming (C#)*. Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop>.
A bank account that grows, as your world did, with the four ideas this
course used, in Microsoft's words: abstraction, encapsulation,
inheritance and polymorphism. It continues the tutorial on classes that
[Classes and objects](lesson:objects-and-classes) named in its list to
read.
