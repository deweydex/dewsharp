---
title: "Classes and objects: keeping data and actions together"
version: 2026.09.27.1
from: objects-and-classes
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO1, FOOP-LO3]
---

# Classes and objects: keeping data and actions together

A game keeps the health of its characters in a dictionary, under each
character's name. Grace is hit, and her health becomes 3. Ada falls into
a pit, and loses 15 health. What does the line for Grace print?

```csharp exec
id: a-list-that-goes-wrong-1
Dictionary<string, int> health = new Dictionary<string, int>
{
    ["Ada"] = 10,
    ["Grace"] = 8,
};

health["Grase"] = 3;                   // Grace is hit
health["Ada"] = health["Ada"] - 15;    // Ada falls into a pit

foreach (string name in health.Keys)
{
    Console.WriteLine($"{name} {health[name]}");
}
```

```predict
type: choice

What will the line for Grace print?

- Grace 3
  - The line for Grace set her health to 3.
- Grace 8
  - `"Grase"` is a different key, so Grace's health never changed.
- Nothing: it stops with an exception
  - There is no key called `"Grase"`.
- Nothing: it does not compile
  - C# checks every name in a program before it runs any of it.
```

It prints `Grace 8`, then a third line, `Grase 3`. Above them is `Ada -5`.
Two things went wrong, and C# said nothing about either. The compiler
checks the names in your code, but a key is text in quotes, and the
compiler does not check what text says. So the misspelt key quietly made a
new entry, `"Grase"`, and left Grace's health alone. And Ada's health went
below zero, which the game's rules say it never should.

So where does the rule "health never goes below 0" live? It is not in one
place. Every line that changes a health has to remember it. And where does
the list of characters live? It is not in one place either. Any line can
add a key, on purpose or by a slip. Nothing in the code connects a
character to the rules about it. That connection lives only in the
programmer's head, and it holds only as long as they are careful.

## One thing, many parts

A *class* is an answer to both questions. It describes one kind of thing:
the data it holds, and the actions it can do.

The class is in the first cell below. A cell that holds only a class has a
**Check** button in place of **Run**, because a class on its own does
nothing: it is a description, and a program must use it. **Check** compiles
the class, and tells you about any problem. The program in the second cell
uses the class.

```csharp exec
id: one-thing-many-parts-1
file: Character.cs
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}
```

```csharp exec
id: one-thing-many-parts-1-program
Character ada = new Character("Ada", 10);
Character grace = new Character("Grace", 8);
grace.TakeDamage(5);
ada.TakeDamage(15);
Console.WriteLine($"{ada.Name} {ada.Health}");
Console.WriteLine($"{grace.Name} {grace.Health}");
```

It prints `Ada 0` and `Grace 3`. The data a character has is listed in one
place, at the top of the class. The rule lives in one place, `TakeDamage`,
and `Math.Max(0, ...)` stops health going below zero, however hard the
hit. `Math.Max` gives the larger of two numbers, so the result is never
less than 0.

And a class stops both slips. The next cell is meant to fail. It has the
same kind of slips as the dictionary: a misspelt method, and a misspelt
piece of data.

```csharp exec
id: one-thing-many-parts-2
expect: CS1061
Character grace = new Character("Grace", 8);
grace.TakeDamge(5);
grace.Heath = 3;
```

It does not compile, and the compiler found both slips. The first message
is `error CS1061: 'Character' does not contain a definition for
'TakeDamge'`, on line 2. The second is the same error for `Heath`, on line
3. The compiler knows everything a `Character` has, because the class
lists it in one place. A misspelt name is not a new entry, as it was in the
dictionary. It is a compiler error, and nothing runs. (Python allows the
second slip, and quietly adds a new piece of data.)

A class does not stop every slip. `grace.Health = -5;` still compiles,
because `Health` is a name the class has. A later page is about keeping
details like that inside an object. Now we can name the parts.

| Part | In the code | What it is |
|---|---|---|
| *class* | `Character` | A description of what a character has (a name, a health) and what it can do (take damage). |
| *object* | `ada`, `grace` | One thing made from a class, with `new`. Each object has its own values for the fields the class describes. |
| *field* | `Name`, `Health` | A piece of data that one object carries with it. |
| *method* | `TakeDamage` | A named block of code in a class that does one job. It works on the fields of one particular object. |
| *constructor* | `public Character(string name, int health)` | The method that `new` runs each time it makes an object. It has the class's name and no return type. It sets the new object's fields from the values passed in. |

Inside `TakeDamage`, `Health` means the health of the object that the
method was called on. When we write `grace.TakeDamage(5)`, that object is
`grace`, so `Health` is Grace's health, and nobody else's. That is why a
hit on Grace cannot touch Ada. C# has a name for that object: `this`.
Inside a method, `this.Health` means the same as `Health`. (Python calls it
`self`, and needs it every time.)

Can you make a third character in the program cell, and hit them twice?

<details class="dl-answer"><summary>What each line does</summary>

- `class Character` starts the description. Nothing is made yet.
- `public string Name;` and `public int Health;` are the fields. Every
  character has a name and a health. `public` lets code outside the class
  use them.
- `public Character(string name, int health)` is the constructor. `Name =
  name;` stores the name it was given in the new object's field `Name`.
- `public void TakeDamage(int amount)` is a method. `void` says that it
  gives nothing back. Inside it, `Health` is the health of whichever
  character it was called on.
- `Character ada = new Character("Ada", 10);` makes an object. `new` makes
  it, and runs the constructor with `name` as `"Ada"` and `health` as 10.
- `grace.TakeDamage(5);` calls the method on Grace.

</details>

## The rules of the road

On this page, a class is written in one cell and used in the cells below
it. Five rules say how the cells on a page share code. We call them the
*rules of the road*. Every page with classes follows them, so each one has
a small cell here. Run each one.

### 1. Each Run starts a new program

**Each Run starts a new program.** It runs from the first line of the cell
to the last.

```csharp exec
id: the-rules-of-the-road-1
int hits = 0;
hits = hits + 1;
Console.WriteLine($"Hits: {hits}");
```

Run it three times. It prints `Hits: 1` each time. The second Run does not
start from where the first one finished: each Run starts again, at the
first line.

### 2. A class can be used below

**A class written in a cell can be used by the cells below it.** So can an
interface, a record, an enum or a struct, which later pages meet.

```csharp exec
id: the-rules-of-the-road-2
Character alan = new Character("Alan", 9);
alan.TakeDamage(4);
Console.WriteLine($"{alan.Name} {alan.Health}");
```

It prints `Alan 5`. This cell has no class in it. It uses `Character`, from
`Character.cs` higher up the page.

### 3. Variables stay in their cell

**Variables stay in their cell.** Nothing that a cell's statements made is
there for the next cell. The next cell is meant to fail: it tries to use
`alan`, from the cell above.

```csharp exec
id: the-rules-of-the-road-3
expect: CS0103
alan.TakeDamage(2);
Console.WriteLine(alan.Health);
```

It does not compile: `error CS0103: The name 'alan' does not exist in the
current context`. Under the message, the page adds a line: *alan was made
in a cell above. Variables stay in their cell, so make it again in this
cell.* To use an object again, make it again, or write a method that makes
it. Can you make this cell work by adding one line at the top?

```solution
Character alan = new Character("Alan", 9);
alan.TakeDamage(2);
Console.WriteLine(alan.Health);
---
It prints 7. This Alan is a new object. The hit of 4 in the cell above
never happened to him.
```

### 4. A class written again replaces the earlier one

**A class written again further down replaces the earlier one.** Here is
`Character` again, with one change: `TakeDamage` now says what happened.

```csharp exec
id: the-rules-of-the-road-4
file: Character.cs
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
        Console.WriteLine($"{Name} takes {amount} damage, and has {Health} health.");
    }
}
```

```csharp exec
id: the-rules-of-the-road-4-program
Character ada = new Character("Ada", 10);
ada.TakeDamage(3);
```

It prints `Ada takes 3 damage, and has 7 health.` This cell uses the new
`Character`, and so does every cell below it, until another cell writes
`Character` again. The cells above still use the first one: run the cell
for rule 2 again, and it still prints only `Alan 5`.

### 5. `Main` stays in its cell

**`Main` stays in its cell.** Visual Studio, and many books, start a
program with a method called `Main`, inside a class. A cell can have one
too, and **Run** starts the program there.

```csharp exec
id: the-rules-of-the-road-5
class Game
{
    static void Main()
    {
        Character ada = new Character("Ada", 10);
        ada.TakeDamage(3);
    }
}
```

It prints the same line as the cell above. A class that has a `Main` stays
in its cell, with its `Main`, as statements do. The cells below can't use
`Game`, and running them never runs this `Main`. On these pages we write
statements, as in every other cell, and not `Main`.

## Your turn

Each task has two cells: a class to change in the first, and a program
that uses it in the second. Change the class, and then run the program.

<div class="dl-world" data-world="game">

Can you give `Character` a `Heal` method, with the same shape as
`TakeDamage`, that adds to the character's health?

The program is meant not to compile until you do. Its message says what
is missing: `'Character' does not contain a definition for 'Heal'`.

```csharp exec
id: your-turn-1--game
file: Character.cs
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}
```

```csharp exec
id: your-turn-1-program--game
expect: CS1061
Character ada = new Character("Ada", 4);
ada.Heal(3);
Console.WriteLine(ada.Health);
```

```inputs
ada.Health
```

```hint
after: 2 errors
Look at `TakeDamage`. Inside it, `Health` is this character's health. What
should it become in `Heal`?
```

```solution
Character ada = new Character("Ada", 4);
ada.Heal(3);
Console.WriteLine(ada.Health);

class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
---
It prints 7. The solution writes `Character` again, below its program
(rule 4), and C# uses this one in place of yours. In one file, C# wants the
statements first and the classes after them. Should there be a most that a
character can heal to? That would be a second rule, and it would live in
`Heal`, in one place.
```

</div>

<div class="dl-world" data-world="solar-system">

A probe carries fuel, in kilograms, and `Burn` uses some, never going
below empty. Can you give it a `Refuel` method that adds fuel?

The program is meant not to compile until you do. Its message says what
is missing: `'Probe' does not contain a definition for 'Refuel'`.

```csharp exec
id: your-turn-1--solar-system
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }
}
```

```csharp exec
id: your-turn-1-program--solar-system
expect: CS1061
Probe voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Refuel(15);
Console.WriteLine(voyager.Fuel);
```

```inputs
voyager.Fuel
```

```hint
after: 2 errors
Look at `Burn`. Inside it, `Fuel` is this probe's fuel. What should it
become in `Refuel`?
```

```solution
Probe voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Refuel(15);
Console.WriteLine(voyager.Fuel);

class Probe
{
    public string Name;
    public int Fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
---
It prints 85. The solution writes `Probe` again, below its program (rule
4), and C# uses this one in place of yours. In one file, C# wants the
statements first and the classes after them. A real probe cannot be
refuelled once it is launched, so perhaps `Refuel` belongs to a probe on
the launch pad. What a class allows is a decision about the world it
describes.
```

</div>

<div class="dl-world" data-world="your-own">

Choose a kind of thing in your world: a creature, a vehicle, a shop, a
spell. What two or three fields would one of them carry? What is one thing
it can do? Can you write the class in the first cell, with a constructor
and that one method? Then, in the second cell, can you make two objects
from it, and call the method on one of them?

```csharp exec
id: your-turn-1--your-own
// My class: its fields, a constructor and one method.
```

```csharp exec
id: your-turn-1-program--your-own
// Two objects made from my class.
```

</div>

## Printing an object

We printed `ada.Name` and `ada.Health` one at a time. What happens if we
print the whole object?

```csharp exec
id: printing-an-object-1
Character ada = new Character("Ada", 10);
Console.WriteLine(ada);
```

It prints `Character`: the name of the object's class. It tells us what
kind of thing the object is, and not much else.

`Console.WriteLine` shows an object by calling its `ToString` method, which
gives the object as text. Every class has a `ToString` already, and the one
it has from the start gives the class's name. A class can give its own
version instead. Here is `Character` again, with its own `ToString`.

```csharp exec
id: printing-an-object-2
file: Character.cs
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }
}
```

```csharp exec
id: printing-an-object-2-program
Character ada = new Character("Ada", 10);
Character grace = new Character("Grace", 8);
Console.WriteLine(ada);

List<Character> party = new List<Character> { ada, grace };
Console.WriteLine(party);
Console.WriteLine(string.Join(", ", party));
```

```predict
type: choice

What will the second line show?

- [Ada (health 10), Grace (health 8)]
  - `ToString` gives the text for each object, wherever it is.
- System.Collections.Generic.List`1[Character]
  - A list is an object too, with its own `ToString`.
- Nothing: it does not compile
  - `Console.WriteLine` can't show a list.
```

The first line is `Ada (health 10)`. `override` says that this `ToString`
takes the place of the one the class had from the start. `ToString`
*returns* the text: it gives it back to the code that called it. It does
not print it. `Console.WriteLine` does the printing.

The second line is ``System.Collections.Generic.List`1[Character]``. A list
is an object too, and its own `ToString` gives only its class's name: a
`List` of `Character`. To show what is in a list, `string.Join` joins the
text of each object, with `", "` between them. That is the third line:
`Ada (health 10), Grace (health 8)`.

### Your turn: your class, first version

This is the first version of the class you will grow over the next pages:
one class, with a constructor, a `ToString` and its methods.

<div class="dl-world" data-world="game">

Can you give `Character` a `ToString` that shows its name and health, like
`Ada (health 7)`, and keep `TakeDamage` and `Heal`?

```csharp exec
id: your-class-1--game
file: Character.cs
class Character
{
    public string Name;
    public int Health;

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
```

```csharp exec
id: your-class-1-program--game
Character ada = new Character("Ada", 10);
ada.TakeDamage(3);
Console.WriteLine(ada);
```

```inputs
ada.ToString()
new Character("Grace", 8).ToString()
```

```hint
after: 2 runs
Look at the `ToString` in the class in *Printing an object*, above. What
does it return? Which word in front of it says that it takes the place of
the one the class had from the start?
```

```solution
Character ada = new Character("Ada", 10);
ada.TakeDamage(3);
Console.WriteLine(ada);

class Character
{
    public string Name;
    public int Health;

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

    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
---
`ada.ToString()` is what `Console.WriteLine(ada)` shows: `Ada (health 7)`.
The next pages build on this class.
```

</div>

<div class="dl-world" data-world="solar-system">

Can you give `Probe` a `ToString` that shows its name and fuel, like
`Voyager (fuel 70 kg)`, and keep `Burn` and `Refuel`?

```csharp exec
id: your-class-1--solar-system
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
```

```csharp exec
id: your-class-1-program--solar-system
Probe voyager = new Probe("Voyager", 100);
voyager.Burn(30);
Console.WriteLine(voyager);
```

```inputs
voyager.ToString()
new Probe("Juno", 12).ToString()
```

```hint
after: 2 runs
Look at the `ToString` in the `Character` class in *Printing an object*,
above. What would a probe's `ToString` return? Which word in front of it
says that it takes the place of the one the class had from the start?
```

```solution
Probe voyager = new Probe("Voyager", 100);
voyager.Burn(30);
Console.WriteLine(voyager);

class Probe
{
    public string Name;
    public int Fuel;

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
        Fuel = Math.Max(0, Fuel - kg);
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
---
`voyager.ToString()` is what `Console.WriteLine(voyager)` shows:
`Voyager (fuel 70 kg)`. The next pages build on this class.
```

</div>

<div class="dl-world" data-world="your-own">

Can you give your class a `ToString` that shows what a person would want to
know about one object, and print two objects with it? This is the first
version of your class. The next pages build on it, and each one starts
with a copy of it, from this cell.

```csharp exec
id: your-class-1--your-own
// My class, with a constructor, ToString and its methods.
```

```csharp exec
id: your-class-1-program--your-own
// Two objects made from my class, printed.
```

</div>

## Looking back

Loose variables, dictionaries and methods can do everything a class can.
Nothing here was impossible before. A class changes where the rules and the
fields live, and how much you have to hold in your head as a program grows
past one character, one probe, one anything. Of the two problems at the top
of the page, the misspelt key and the broken rule, which do you think a
class solves better?

A challenge: C# has a short way to write a class that mostly holds values:
a *record*. The line at the bottom of this program is a whole record, and
C# writes its constructor and its `ToString` for it. What does the program
print? Can you give the record its own `ToString`, so that the list shows
the code that would make each character again, like
`new Character("Ada", 10)`?

```csharp challenge
List<Character> party = new List<Character>
{
    new Character("Ada", 10),
    new Character("Grace", 8),
    new Character("Alan", 9),
};
Console.WriteLine(string.Join(", ", party));

record Character(string Name, int Health);
```

Next, the [practice page](lesson:objects-and-classes-practice) has more
problems on classes and objects, and three from earlier pages. After it,
[Inside a method](lesson:the-moves-you-already-know) looks inside methods, and finds the moves you already
know.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Classes and objects tutorial*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/classes>.
Microsoft's own tutorial builds a bank account class, step by step, from
the same starting point as this page.

Microsoft. *C# classes*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes>.
This is the official description of what a class is. It covers more than
this page has room for, such as what else a class can hold.

Microsoft. *C# record types*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records>.
For the challenge: what a record is, and what C# writes for you.

Miles, R. *The C# Programming Yellow Book*. Free at
<https://www.robmiles.com/c-yellow-book>. A book for people learning C#,
in a friendly voice. Its chapters on objects cover this page's topics at
greater length.
