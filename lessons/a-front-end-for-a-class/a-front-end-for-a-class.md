---
title: "A front end: letting someone use your classes"
version: 2026.09.28.1
from: a-front-end-for-a-class
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO11, FOOP-LO4, FOOP-LO5]
---

# A front end: letting someone use your classes

Here is the game world's `Character`, as it stood at the end of
[Documenting a class](lesson:documenting-a-class), with its documentation
comments. You have met every method in it. Press **Check** on the cell, and the class compiles.

```csharp exec
id: the-game-so-far
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

The program below it uses the class to play a short fight in a cave. Ada
attacks Grog, and then Grog hits Ada. Then Ada rests. Run it.

```csharp exec
id: a-program-only-its-author-can-use-1
var ada = new Character("Ada", 10);
var grog = new Character("Grog", 8);
grog.TakeDamage(3);
ada.TakeDamage(2);
Console.WriteLine($"{ada} | {grog}");
ada.Heal(2);
Console.WriteLine(ada);
```

Can you change it so that Ada attacks twice before she rests? What did you
need to know to do that?

## A program only its author can use

To play this game now, you write C#: `grog.TakeDamage(3)`, then a
`Console.WriteLine`, then `ada.Heal(2)`. To play a different fight, you
change the code and run it again. A friend who has never written C# could
not play it at all. The classes work. But to use them, you have to write
code.

A *front end* is the part of a program that lets somebody use it without
reading or writing any of its code. It asks them a plain question, turns
the answer into a method call, and shows what happened. On this page we
build two front ends for the same classes, and then a third, a window, in
Visual Studio.

## Deciding, separate from asking

The front end has two jobs. It asks what the player wants, and it decides
what that means. We write the code that decides first, as a method,
`RunChoice`. It takes the command as text, and it never asks for it. So we
can test it with an array of commands, before anybody types anything.

`RunChoice` is in a class of its own, `Commands`, in a types cell. A method
written in a program cell belongs to that cell, but a class in a types cell
can be used by every cell below it (rule 2: a class written in a cell can
be used by the cells below it). So the test and both front ends on this
page share one `RunChoice`. `RunChoice` is `static`, as `Test.Check` was on
[Testing a class](lesson:testing-what-a-class-does): it belongs to the
class, so a program calls it as `Commands.RunChoice(...)`, with no object
made first.

```csharp exec
id: deciding-kept-apart-from-asking-1
file: Commands.cs
/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: look, attack, rest or quit. For any other text, it
    /// prints that the text is not a command, and changes nothing.
    /// </summary>
    /// <param name="hero">The player's character.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the game stops; otherwise true.</returns>
    public static bool RunChoice(Character hero, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine(hero);
            Console.WriteLine(monster);
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
        else if (choice == "rest")
        {
            hero.Heal(2);
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

The program below it gives `RunChoice` six commands from an array, one
after another. What will the third line print?

```csharp exec
id: deciding-kept-apart-from-asking-1-program
var ada = new Character("Ada", 10);
var grog = new Character("Grog", 8);
string[] choices = { "look", "attack", "attack", "rest", "dance", "quit" };
bool stillPlaying = true;
foreach (string choice in choices)
{
    stillPlaying = Commands.RunChoice(ada, grog, choice);
}
Console.WriteLine($"still playing: {stillPlaying}");
```

```predict
type: choice

What will the third line print?

- Ada (health 8) | Grog (health 5)
  - Grog takes 3, and then hits Ada for 2.
- Ada (health 10) | Grog (health 5)
  - Only Grog is hurt by an attack.
- Grog (health 8)
  - The third line is still part of `look`.
```

It prints `Ada (health 8) | Grog (health 5)`. Each command in the array
runs one call: two attacks, a rest, and `dance`, which is not a command,
so `RunChoice` says so and continues. `quit` returns `false`, the one
answer that means "stop", and the last line is `still playing: False`.
C# writes `false` in code, and prints `False`.

`RunChoice` never calls `Console.ReadLine()`. It acts on whatever `choice`
it is given, as any method acts on its arguments. So we can test it with an
array, and later give it a second front end with no change at all.

## A loop that asks

A real front end asks, in a loop, until the player quits. This one uses
`do`...`while`, which you met on *Reading input*. It runs the lines in its
braces first, and checks its condition after them, so the player is always
asked at least once.

Run it. The program waits for you to type a command and press Enter. Try
`look`, then `attack`, then `fly`, and then `quit`.

```csharp exec
id: a-loop-that-asks-1
stdin: "look\nattack\nfly\nquit\n"
var ada = new Character("Ada", 10);
var grog = new Character("Grog", 8);
bool stillPlaying = true;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";    // the input has ended, so nobody is left to play
    }
    stillPlaying = Commands.RunChoice(ada, grog, choice);
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

`Console.ReadLine()` gives `null`, C#'s value for *nothing here*, when
there is no more input to read: on this page, when you press **End input**. Then nobody is left to type, so
the loop treats it as `quit`. Without the `if`, `RunChoice` would be given
`null`. It would answer `null` as it answers any text it does not know,
return `true`, and the loop would ask again, with no end.

A player will type things nobody planned for: `fly`, `Attack` with a
capital, an empty line. A front end has to expect that, because the player
has never seen `RunChoice` and cannot change it. When a program checks what
a person typed before it uses it, we call that *input validation*. Here the
`else` in `RunChoice` does it. Anything unknown gets an answer, and the loop
continues. Run it again, and type `Attack`. What happens, and should it?

## A menu to choose from

A player does not have to type a word at all. Here is a second front end
for the same `RunChoice`: a numbered menu. The player types a number, and a
`switch` turns it into a command. A `switch`, as on *Reading input*, chooses
one path from many by the value in its brackets. Each `case` is one value,
`default` is the path for every other value, and each path ends with
`break`. `case null:` sits under `case "4":`, so the two share one path:
when the input ends, the game ends, as if the player had chosen 4.

Run it, and type the word `attack` first, not a number.

```csharp exec
id: a-menu-to-choose-from-1
stdin: "attack\n2\n3\n4\n"
var ada = new Character("Ada", 10);
var grog = new Character("Grog", 8);
bool stillPlaying = true;
do
{
    Console.WriteLine("1: look   2: attack   3: rest   4: quit");
    Console.Write("Choose a number: ");
    switch (Console.ReadLine())
    {
        case "1":
            stillPlaying = Commands.RunChoice(ada, grog, "look");
            break;
        case "2":
            stillPlaying = Commands.RunChoice(ada, grog, "attack");
            break;
        case "3":
            stillPlaying = Commands.RunChoice(ada, grog, "rest");
            break;
        case "4":
        case null:
            stillPlaying = Commands.RunChoice(ada, grog, "quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2, 3 or 4.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

```predict
type: choice

You type `attack`, the word. What will the program print next?

- Ada (health 8) | Grog (health 5)
  - `RunChoice` knows the word `attack`.
- Not a command: attack
  - `RunChoice` answers any text it does not know.
- Choose 1, 2, 3 or 4.
  - The `switch` looks for a number.
- Nothing: it stops with an exception
  - `attack` is not a number.
```

It prints `Choose 1, 2, 3 or 4.`, and then the menu again. The word never
reaches `RunChoice`. The `switch` compares what was typed with `"1"`, `"2"`,
`"3"` and `"4"`, and `default` takes everything else. Then try 2, 3 and 4.

This front end needed only a `switch`, because the code that decides was
already written and tested. We now have two front ends. The classes do not
know which one is asking, and neither does `RunChoice`.

A menu also changes what input validation has to do. The menu's own
`default` answers anything that is not on the menu, so `RunChoice` is only
ever given one of its four commands. A window with a button for each
command does more: a player cannot choose `fly` at all, because there is
no button for it. A front end that makes a mistake impossible is often
kinder than one that catches it afterwards. `RunChoice` still keeps its
`else`, for the front ends that let people type.

### Colours, and a clean screen

A console front end can do two more things for the player.
`Console.Clear()` empties the console, so that each turn starts on a clean
screen. `Console.ForegroundColor` sets the colour of the text written after
it, until `Console.ResetColor()` restores the console's own colours.
`ConsoleColor` is an *enum*, as on
[Designing classes](lesson:from-a-description-to-classes): a type with a
fixed list of named values. It has one value for each colour a console
has, such as `ConsoleColor.Green` and `ConsoleColor.Red`.

Here is the menu again. It shows Ada's health in green, or in red when it
is 3 or less, and it clears the console after each choice. Ada starts with
5 health here, so that you see the red after one attack.

```csharp exec
id: a-menu-to-choose-from-2
stdin: "2\n2\n3\n4\n"
var ada = new Character("Ada", 5);
var grog = new Character("Grog", 8);
bool stillPlaying = true;
do
{
    Console.ForegroundColor = ConsoleColor.Green;
    if (ada.Health <= 3)
    {
        Console.ForegroundColor = ConsoleColor.Red;
    }
    Console.WriteLine(ada);
    Console.ResetColor();
    Console.WriteLine("1: look   2: attack   3: rest   4: quit");
    Console.Write("Choose a number: ");
    string number = Console.ReadLine();
    Console.Clear();
    switch (number)
    {
        case "1":
            stillPlaying = Commands.RunChoice(ada, grog, "look");
            break;
        case "2":
            stillPlaying = Commands.RunChoice(ada, grog, "attack");
            break;
        case "3":
            stillPlaying = Commands.RunChoice(ada, grog, "rest");
            break;
        case "4":
        case null:
            stillPlaying = Commands.RunChoice(ada, grog, "quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2, 3 or 4.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

The colours and the clean screen belong to this front end, so they are in
its code. `RunChoice` and `Character` did not change, and the test with an
array still prints plain lines.

The program clears the console after it reads the number, and before it
runs the command. Can you move `Console.Clear();` to the first line inside
the loop, and run it again? What does the player no longer see?

<details class="dl-answer"><summary>answer</summary>

The result of each command. `RunChoice` prints what happened, and then the
loop starts again immediately. If the first line inside the loop clears the
console, it clears that result before anybody can read it. The player sees
only Ada's health and the menu.

</details>

### Your turn: your class, eighth version

This is the eighth version of your world: a `RunChoice` for your classes,
tested with an array of commands, and a numbered menu for someone to play
with.

The first cells in your world hold your classes as they stood at the end of
[Documenting a class](lesson:documenting-a-class): the seventh version,
with their comments. In the game and the solar system, the cell below them
holds `Commands`, with no `RunChoice` yet. Write your `RunChoice` there,
with a documentation comment. This `Commands` replaces the one above, for
the cells below it (rule 4: a class written again further down replaces
the earlier one).

The program below it tests `RunChoice` with an array. It does not compile
at first, and it is meant not to: the first message says that `Commands`
does not contain a definition for `RunChoice`. That is the method to
write. Then give it a numbered menu, in the last cell.

<div class="dl-world" data-world="game">

The first three cells hold `Character`, `Healer` and `Room`.

```csharp exec
id: your-class-8-so-far--game
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
id: your-class-8-so-far-healer--game
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
id: your-class-8-so-far-room--game
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

The party has a healer now. Can you write a `RunChoice(Character hero,
Healer healer, Character monster, string choice)` with the commands
`look`, `attack`, `heal` and `quit`, where `heal` has the healer heal the
hero by 2?

```csharp exec
id: your-class-8--game
file: Commands.cs
/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    // Your RunChoice here: look, attack, heal and quit.
}
```

```csharp exec
id: your-class-8-program--game
expect: CS0117
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
string[] choices = { "look", "attack", "heal", "sing", "quit" };
bool stillPlaying = true;
foreach (string choice in choices)
{
    stillPlaying = Commands.RunChoice(ada, mira, grog, choice);
}
Console.WriteLine($"still playing: {stillPlaying}");
```

```hint
after: 2 errors
Start from this page's `RunChoice`. What does the `heal` command need that
`rest` did not? Which of the healer's methods does it call?
```

```solution
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
string[] choices = { "look", "attack", "heal", "sing", "quit" };
bool stillPlaying = true;
foreach (string choice in choices)
{
    stillPlaying = Commands.RunChoice(ada, mira, grog, choice);
}
Console.WriteLine($"still playing: {stillPlaying}");

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
---
The array prints a look, an attack, `Ada (health 10)` after Mira's heal, and
`Not a command: sing`, then `still playing: False`. Mira's `HealOther`
calls Ada's own `Heal`, so Ada's own rules still hold: her health stops
at `MaxHealth`, and a character who is down is not healed.

In one file, C# needs the program's statements before any class, so
`Commands` comes after them here. This copy replaces yours for this
program (rule 4).
```

Now the menu. Can you copy the menu from *A menu to choose from* into this
cell, and change it for this game: Mira in the party, and a number for
`heal`?

```csharp exec
id: your-class-8-menu--game
stdin: "2\n3\n7\n4\n"
// A numbered menu for RunChoice: look, attack, heal and quit.
```

```hint
after: 2 runs
Which line shows the menu? Which `case` becomes `heal`, and which
argument does each call to `RunChoice` now need?
```

```solution
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
bool stillPlaying = true;
do
{
    Console.WriteLine("1: look   2: attack   3: heal   4: quit");
    Console.Write("Choose a number: ");
    switch (Console.ReadLine())
    {
        case "1":
            stillPlaying = Commands.RunChoice(ada, mira, grog, "look");
            break;
        case "2":
            stillPlaying = Commands.RunChoice(ada, mira, grog, "attack");
            break;
        case "3":
            stillPlaying = Commands.RunChoice(ada, mira, grog, "heal");
            break;
        case "4":
        case null:
            stillPlaying = Commands.RunChoice(ada, mira, grog, "quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2, 3 or 4.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");

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
---
The menu is the one on this page, with Mira added to each call, and
`heal` in place of `rest`. `Commands` comes after the statements, as in
the solution above.
```

</div>

<div class="dl-world" data-world="solar-system">

The first three cells hold `Probe`, `Lander` and `Mission`.

```csharp exec
id: your-class-8-so-far--solar-system
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
id: your-class-8-so-far-lander--solar-system
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
id: your-class-8-so-far-mission--solar-system
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

Can you write a `RunChoice(Probe probe, string choice)` with the commands
`burn` (10 kg), `refuel` (20 kg), `status` and `quit`? The program tests
it with an array of commands. Then Philae lands, and the program asks for
its status once more.

```csharp exec
id: your-class-8--solar-system
file: Commands.cs
/// <summary>The commands a player can give to a probe.</summary>
static class Commands
{
    // Your RunChoice here: burn, refuel, status and quit.
}
```

```csharp exec
id: your-class-8-program--solar-system
expect: CS0117
var philae = new Lander("Philae", 40);
string[] choices = { "burn", "status", "refuel", "orbit", "quit" };
bool stillFlying = true;
foreach (string choice in choices)
{
    stillFlying = Commands.RunChoice(philae, choice);
}
Console.WriteLine($"still flying: {stillFlying}");
philae.Land();
Commands.RunChoice(philae, "status");
```

```hint
after: 2 errors
Each command is one `else if`, and each calls one of the probe's methods.
What should `status` show, so that a player knows whether the next burn
will work?
```

```solution
var philae = new Lander("Philae", 40);
string[] choices = { "burn", "status", "refuel", "orbit", "quit" };
bool stillFlying = true;
foreach (string choice in choices)
{
    stillFlying = Commands.RunChoice(philae, choice);
}
Console.WriteLine($"still flying: {stillFlying}");
philae.Land();
Commands.RunChoice(philae, "status");

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
---
`Philae (fuel 30 kg)`, the status with `True`, `Philae (fuel 50 kg)`
after the refuel, `Not a command: orbit`, and `still flying: False`. After
`philae.Land()`, the last line is
`Philae (fuel 50 kg) | can burn 10 kg: False`: 50 kg in the tank, and
still no burn.

`status` asks `CanBurn`. `CanBurn` is `virtual`, and a lander runs its
own, so once Philae has landed, the status says `False`. The front end
never needed to know about landers.

In one file, C# needs the program's statements before any class, so
`Commands` comes after them here. This copy replaces yours for this
program (rule 4).
```

Now the menu. Can you copy the menu from *A menu to choose from* into this
cell, and change it for the probe: a number for each of its four commands?

```csharp exec
id: your-class-8-menu--solar-system
stdin: "1\n1\n1\n1\n1\n3\n2\n7\n4\n"
// A numbered menu for RunChoice: burn, refuel, status and quit.
```

```hint
after: 2 runs
Which line shows the menu? What does each `case` pass to `RunChoice` now?
```

```solution
var philae = new Lander("Philae", 40);
bool stillFlying = true;
do
{
    Console.WriteLine("1: burn   2: refuel   3: status   4: quit");
    Console.Write("Choose a number: ");
    switch (Console.ReadLine())
    {
        case "1":
            stillFlying = Commands.RunChoice(philae, "burn");
            break;
        case "2":
            stillFlying = Commands.RunChoice(philae, "refuel");
            break;
        case "3":
            stillFlying = Commands.RunChoice(philae, "status");
            break;
        case "4":
        case null:
            stillFlying = Commands.RunChoice(philae, "quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2, 3 or 4.");
            break;
    }
} while (stillFlying);
Console.WriteLine("Goodbye.");

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
---
The menu is the one on this page, with the probe's four commands. The
fuel rules stay in the probe. Choose 1 five times: the fifth burn prints
`Refused: Philae cannot burn 10 kg now.`, from the probe's own `Burn`, and
the status then says `False`. The menu never checks the fuel itself.
`Commands` comes after the statements, as in the solution above.
```

</div>

<div class="dl-world" data-world="your-own">

Copy your classes from
[Documenting a class](lesson:documenting-a-class) into the first cell. In the
second cell, write `Commands`, with a `RunChoice` for your world: three or
four commands, and `quit`. Test it in the third cell with an array of
commands, including one that is not a command. Then give it a numbered
menu, in the last cell.

```csharp exec
id: your-class-8-so-far--your-own
// My classes so far: the seventh version, with their comments.
```

```csharp exec
id: your-class-8--your-own
// Commands, with my RunChoice and its documentation comment.
```

```csharp exec
id: your-class-8-program--your-own
// A test of RunChoice: an array of commands, one of them not a command.
```

```csharp exec
id: your-class-8-menu--your-own
// A numbered menu for my RunChoice.
```

</div>

## A third front end: a window

Most programs that people use have a *window*, with buttons to press. On a
computer with Windows and Visual Studio, you can give the cave a window,
with a button for each command. Each button calls the same `RunChoice`.

Everything above this part runs here, in the browser. The rest of this
page needs a computer with Visual Studio. If you are not at one now, this
is a good place to stop, and to return to later.

This part also needs Windows. It uses *Windows Forms*, a kind of Visual
Studio project for programs with windows, and Windows Forms runs only on
Windows. The page cannot show a window. If you have no Windows computer at
home, the console menu above is a front end too, and you can build the
window in class.

1. Press **Download project** on the program cell in *Deciding, separate
   from asking*, and unzip the file: right-click it, and choose
   **Extract All**. The project's folder holds `Character.cs` and
   `Commands.cs`, beside the program.
2. In Visual Studio, choose **Create a new project**. Type `winforms` in the
   search box, choose **Windows Forms App** for C#, and choose **Next**. Do
   not choose **Windows Forms App (.NET Framework)**, which is an older
   kind. Name the project `CaveWindow`, choose **Next**, choose
   **.NET 10.0 (Long Term Support)**, and choose **Create**. Visual Studio
   shows an empty window, `Form1`, in its *designer*: the part of Visual
   Studio where you place things on a window.
3. In **Solution Explorer**, right-click the project `CaveWindow`, and
   choose **Add**, then **Existing Item**. Choose `Character.cs` and
   `Commands.cs` in the folder from step 1. Visual Studio copies them into
   the project.
4. Choose **View**, then **Toolbox**, and drag four **Button**s and one
   **Label** onto the window. Choose **View**, then **Properties Window**.
   Select each button, one at a time, and set its **Text** to `Look`,
   `Attack`, `Rest` and `Quit`, and its **(Name)** to `lookButton`,
   `attackButton`, `restButton` and `quitButton`. Set the label's
   **(Name)** to `resultLabel`.
5. Right-click the window in the designer, and choose **View Code**. Visual
   Studio opens `Form1.cs`. Inside the class `Form1`, add the two fields
   above its constructor, and the method `Play` below it, as in the code
   after these steps.
6. Return to the designer, and double-click the **Look** button. Visual
   Studio writes an empty method for it, `lookButton_Click`, and shows it.
   Inside its braces, write `Play("look");`. Do the same for the other
   three buttons, with `"attack"`, `"rest"` and `"quit"`.
7. Press F5. The window opens. Press its buttons.

Here is `Form1.cs` when it is finished:

```csharp
namespace CaveWindow;

public partial class Form1 : Form
{
    private Character ada = new Character("Ada", 10);
    private Character grog = new Character("Grog", 8);

    public Form1()
    {
        InitializeComponent();
    }

    /// <summary>Runs one command, and shows what it printed in the label.</summary>
    /// <param name="choice">The command, as text.</param>
    private void Play(string choice)
    {
        var screen = new StringWriter();
        Console.SetOut(screen);    // a window has no console, so collect what RunChoice writes
        bool stillPlaying = Commands.RunChoice(ada, grog, choice);
        resultLabel.Text = screen.ToString();
        if (!stillPlaying)
        {
            Close();
        }
    }

    private void lookButton_Click(object sender, EventArgs e)
    {
        Play("look");
    }

    private void attackButton_Click(object sender, EventArgs e)
    {
        Play("attack");
    }

    private void restButton_Click(object sender, EventArgs e)
    {
        Play("rest");
    }

    private void quitButton_Click(object sender, EventArgs e)
    {
        Play("quit");
    }
}
```

Four things are new here.

- **Visual Studio wrote the first lines.** `Form1 : Form` makes `Form1` a
  child class of `Form`, .NET's class for a window, as on
  [Inheritance](lesson:one-parent-many-children). `partial` says that the
  class continues in a second file, `Form1.Designer.cs`, where the
  designer keeps the buttons and the label. `InitializeComponent()`, in
  that file, makes them. The line at the top puts `Form1` in a
  *namespace*, a named group of classes, which *Namespaces and class
  libraries* is about.
- **Fields, not variables.** In the console front ends, `ada` and `grog`
  were variables, and the loop kept the program running between turns. A
  window has no loop that you write. Windows runs a method each time a
  button is pressed, and the method ends. So `ada` and `grog` are fields of
  the form: they last as long as the window is open.
- **A window has no console.** `RunChoice` writes with
  `Console.WriteLine`. `Console.SetOut(screen)` sends everything that
  `Console` writes into `screen`, a `StringWriter`: a piece of text kept in
  memory. Then the label shows that text.
- **`Close()`** closes the window, and that ends the program.

`RunChoice` did not change, and neither did `Character`. The window is a
third front end for them, and they do not know it is there. Which lines
would you add to give the window a fifth button?

## Giving your program to someone

A program you run from Visual Studio needs Visual Studio. To give your game
to a friend, you *publish* it: Visual Studio makes a folder with everything
the program needs, and your friend runs the program from that folder.
Putting a program where the people who use it can run it is called
*deploying* it.

1. Press **Download project** on the cell in *Colours, and a clean
   screen*, unzip it, and open the project. Press Ctrl+F5 to check that it
   runs. A console window opens, with the menu and its colours.
2. On the toolbar, change **Debug** to **Release**. **Release** makes the
   program for other people to use, without the extra information that
   the debugger needs.
3. In **Solution Explorer**, right-click the project (not the solution),
   and choose **Publish**.
4. Choose **Folder**, then **Next**. Choose **Folder** again, then **Next**.
   Choose **Finish**, and then **Close**.
5. Choose **Publish**. Visual Studio writes the folder `publish`, inside
   `bin\Release\net10.0` in the project's folder.
6. Open that folder, and double-click the file whose name ends in `.exe`.
   The game runs in a console window of its own, with no Visual Studio.

That folder is your program. Zip it, or copy it to a memory stick, and your
friend can run it on a Windows computer. The computer needs .NET 10, since
a program published in this way uses the .NET that is installed. Under
**Show all settings**, **Deployment Mode** can be set to
**Self-contained**, which puts .NET into the folder too: the folder is much
larger, and the computer needs nothing installed. The same steps publish
the window, `CaveWindow`.

On a Mac or on Linux, the command `dotnet publish`, typed in a terminal in
the project's folder, makes the same kind of folder.

## Looking back

`RunChoice` never asked for anything. So it could be tested with an array,
and given two more front ends with no change. Which other method in your
classes would be easier to test if it did one job fewer?

A challenge: players type `Attack`, ` attack ` and `ATTACK`, and mean the
same thing. Can you make the front end accept all three, without changing
`RunChoice`? A string has a method `Trim()`, which gives the same text
without the spaces at its ends, and `ToLower()`, which gives it with every
letter small. Neither one changes the string it is called on: a string in
C# cannot be changed, so each returns a new string. In one file, C#
needs the program's statements before any class, so the class comes last
here.

```csharp challenge
bool stillPlaying = true;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";    // the input has ended, so nobody is left to play
    }
    stillPlaying = Commands.RunChoice(choice);
} while (stillPlaying);
Console.WriteLine("Goodbye.");

/// <summary>The commands a player can give in a cave with a troll.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: attack, look or quit. For any other text, it prints
    /// that the text is not a command.
    /// </summary>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit; otherwise true.</returns>
    public static bool RunChoice(string choice)
    {
        if (choice == "attack")
        {
            Console.WriteLine("You swing at the troll.");
        }
        else if (choice == "look")
        {
            Console.WriteLine("A cave, and a troll.");
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

The [practice page](lesson:a-front-end-for-a-class-practice) has more
problems on front ends, commands and checking what people type, and three
from earlier pages.

Next, *Namespaces and class libraries* puts classes in a library of their
own, which other programs can use. After it,
[Your world, playable](lesson:your-world-playable) makes one program from
every version of your class, with its tests, for someone else to play or
explore.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Create a Windows Forms app tutorial*. Windows Forms
documentation, Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/desktop/winforms/get-started/create-app-visual-studio>.
A window with a list of names, a box to type in and a button, built step by
step in Visual Studio, with pictures of each step.

Microsoft. *Publish a .NET console application*. .NET documentation,
Microsoft Learn.
<https://learn.microsoft.com/en-us/dotnet/core/tutorials/publish-console-app>.
The steps of "Giving your program to someone", with pictures, and what each
file in the `publish` folder is for.

CrashCourse (2017). *Keyboards & Command Line Interfaces: Crash Course
Computer Science #22.* <https://www.youtube.com/watch?v=4RPtJ9UyHS0>.
Before windows and a mouse, people used programs the way this page's menu
does: type something, and read the answer.
