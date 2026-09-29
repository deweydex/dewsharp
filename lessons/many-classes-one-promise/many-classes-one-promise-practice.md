---
title: "Interfaces: practice"
version: 2026.09.28.1
from: one-parent-many-children-practice
practice_for: many-classes-one-promise
---

# Interfaces: practice

This page has problems on interfaces and abstract classes, and three from
earlier pages. Try each problem before you open anything under it, and run
the cells to test your guesses.

Some cells on this page are meant not to compile, or to stop with an
exception, and the problem says so or asks you to guess. When that
happens, nothing is broken: the message is part of the answer. The cells
follow the rules of the road: a class or an interface written in a cell
can be used by the cells below it, and a class written again further down
replaces the earlier one.

## 1. What an interface lets you see

Here are `IShape`, `Rectangle` and `Square`, as the tutorial left them.

```csharp exec
id: what-an-interface-lets-you-see-1
file: Shapes.cs
interface IShape
{
    double Area();
}

class Rectangle : IShape
{
    public int Width { get; private set; }
    public int Height { get; private set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public double Area()
    {
        return Width * Height;
    }
}

class Square : IShape
{
    public int Side { get; private set; }

    public Square(int side)
    {
        Side = side;
    }

    public double Area()
    {
        return Side * Side;
    }
}
```

The program keeps a square in an `IShape` variable, and asks it for its
area, and then for its side.

```csharp exec
id: what-an-interface-lets-you-see-2
expect: CS1061
IShape tile = new Square(3);
Console.WriteLine(tile.Area());
Console.WriteLine(tile.Side);
```

```predict
type: choice

What will appear under the cell?

- 9, and then 3
  - The object in `tile` is a square, and every square has a `Side`.
- 9, and then a message from the compiler
  - The program runs until it reaches line 3.
- Nothing: it does not compile
  - The compiler checks each line against the type of the variable.
```

Can you make the program print both lines, by changing one word?

```solution
Square tile = new Square(3);
Console.WriteLine(tile.Area());
Console.WriteLine(tile.Side);
---
It prints `9`, then `3`. With a `Square` variable, the compiler knows
everything a square has, `Side` included. `var tile = new Square(3);`
works too, because `var` gives the variable the type on the right of the
`=`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile, and nothing runs: `error CS1061: 'IShape' does not
contain a definition for 'Side'`, on line 3. `tile` is an `IShape`
variable. The compiler checks each call against the variable's type, and
`IShape` promises only an `Area`. The object in `tile` is a square, and it
has a `Side`, but the compiler does not look at the object.

An interface variable limits what a program can use, and that is its
purpose. A method that takes an `IShape` can use only `Area`, so it works
for every shape, and never depends on anything that only squares have.

</details>

## 2. Interface or parent class?

For each pair of classes, would you give them a parent class, or an
interface that both of them keep? Why?

- A `Knight` and a `Troll`. Both have a name and health, and each takes
  damage in its own way.
- A `Door` and a `Character`. Both can take damage.
- A `Planet` and a `Moon`. Both have a name and a width, and both orbit
  something.
- A `Probe` and a `Telescope`. Both can take photographs.
- A `Shop` and a `Character`. Both have money, which a thief can steal.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

- **A knight and a troll: a parent class**, `Character`. Both are kinds of
  character, and they share data (a name, health) and code (the rules
  about damage). Each one overrides `TakeDamage`.
- **A door and a character: an interface**, `IDamageable`, as in the
  tutorial's game world. A door is not a kind of character, and it shares
  nothing with one except a way to be hurt.
- **A planet and a moon: a parent class**, `Body`, which can be abstract,
  as in the tutorial. They are kinds of one thing, and they share fields
  and a `ToString`.
- **A probe and a telescope: an interface**, `ICanPhotograph`, as in the
  tutorial's solar system. They can do the same thing, and they share
  nothing else.
- **A shop and a character: an interface**, such as `IHasMoney`. A shop is
  not a kind of character, and a character is not a kind of shop. An
  interface lets both keep one promise about money, and each class keeps
  its own parent class, if it has one.

A useful test is the sentence. "A troll *is a* character" reads well, so a
parent class fits. "A door *is a* character" does not, but "a door *can*
take damage" does, so an interface fits.

</details>

## 3. The birds that fly

On [Inheritance: a closer look at "is a"](lesson:when-is-a-breaks), a
penguin could not keep `Bird`'s promise to fly. Here is a `Bird` that
promises nothing about flying. A sparrow flies, and a penguin does not. A
bat flies too, and it is not a bird at all.

```csharp exec
id: the-birds-that-fly-1
file: Birds.cs
class Bird
{
    public string Name;

    public Bird(string name)
    {
        Name = name;
    }
}

class Sparrow : Bird
{
    public Sparrow() : base("sparrow")
    {
    }

    public string Fly()
    {
        return "The sparrow flies over the wall.";
    }
}

class Penguin : Bird
{
    public Penguin() : base("penguin")
    {
    }
}

class Bat
{
    public string Fly()
    {
        return "The bat flies out of the cave.";
    }
}
```

The program wants one list of everything that can fly. Can you write the
interface `ICanFly`, with one method, `string Fly()`, in the first cell,
and make each class that can fly keep its promise?

The program uses `ICanFly`, so it is meant not to compile until you write
it. It shows several messages. Read the first one first: it says that the
compiler cannot find the name `ICanFly`.

```csharp exec
id: the-birds-that-fly-2
expect: CS0246
var fliers = new List<ICanFly>();
fliers.Add(new Sparrow());
fliers.Add(new Bat());
foreach (ICanFly flier in fliers)
{
    Console.WriteLine(flier.Fly());
}
```

```inputs
fliers.Count
fliers[1].Fly()
```

```hint
after: 2 errors
An interface is written like a class, with the word `interface` in place
of `class`. What goes inside it: the whole method, or only its first line?
```

```hint
after: 3 errors
title: two first lines
`Sparrow` already has a parent, so its first line names the parent first:
`class Sparrow : Bird, ICanFly`. `Bat` names no parent:
`class Bat : ICanFly`.
```

```solution
var fliers = new List<ICanFly>();
fliers.Add(new Sparrow());
fliers.Add(new Bat());
foreach (ICanFly flier in fliers)
{
    Console.WriteLine(flier.Fly());
}

interface ICanFly
{
    string Fly();
}

class Sparrow : Bird, ICanFly
{
    public Sparrow() : base("sparrow")
    {
    }

    public string Fly()
    {
        return "The sparrow flies over the wall.";
    }
}

class Bat : ICanFly
{
    public string Fly()
    {
        return "The bat flies out of the cave.";
    }
}
---
`The sparrow flies over the wall.`, then `The bat flies out of the cave.`
The sparrow and the bat already had a `Fly` method. The interface makes
that method a promise that the compiler can check, and it gives the list
a type that both of them belong to.

The penguin is still a `Bird`, and it keeps no promise to fly. So
`fliers.Add(new Penguin());` does not compile. On the closer look at
"is a", one answer was a class `FlyingBird`, a child of `Bird`. An
interface does the same job, and the bat can join it, which no child
class of `Bird` could do.

The solution writes the interface and both classes again, below its
program (rule 4). In one file, C# needs the program's statements before
any interface or class.
```

## 4. The weakest first

A healer wants to see the party in order of health, weakest first. `Sort`
puts a `List<int>` in order with no help. Will it do the same for a list
of characters? This program is meant to stop with an exception. Run it,
and read the line of the report that starts with *It was caused by*.

```csharp exec
id: the-weakest-first-1
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
id: the-weakest-first-2
expect: exception
var party = new List<Character>
{
    new Character("Ada", 7),
    new Character("Grog", 3),
    new Character("Mira", 9)
};
party.Sort();
Console.WriteLine(string.Join(", ", party));
```

What does `Sort` need to know about characters that nobody has told it?
Can you tell it, in `Character`, so that the party is sorted from the
lowest health to the highest?

```inputs
party[0].Name
party[2].Name
```

```hint
after: 2 errors
Which promise does `int` keep, so that `Sort` can compare two numbers?
The tutorial's section *Promises that C# already has* names it.
```

```hint
after: 3 errors
title: the promise and its method
Write `class Character : IComparable<Character>`, and give `Character`
its one method, `public int CompareTo(Character other)`. It returns a
number below 0 when this character comes before `other`, 0 when they are
in the same place, and a number above 0 when this character comes after.
`int` keeps the same promise, so `Health.CompareTo(other.Health)` gives
that number for two healths.
```

```solution
var party = new List<Character>
{
    new Character("Ada", 7),
    new Character("Grog", 3),
    new Character("Mira", 9)
};
party.Sort();
Console.WriteLine(string.Join(", ", party));

class Character : IComparable<Character>
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

    public int CompareTo(Character other)
    {
        return Health.CompareTo(other.Health);    // the lower health comes first
    }
}
---
`Grog (health 3), Ada (health 7), Mira (health 9)`. `Character` now
implements `IComparable<Character>`: it keeps the promise to compare
itself with another character. `Sort` asks two characters to compare
themselves, and each answer comes from `CompareTo`. A `CompareTo` that
compares names would sort the party by name instead.

The solution writes `Character` again, below its program (rule 4).
```

<details class="dl-answer"><summary>why it stopped</summary>

It stopped with an exception, `InvalidOperationException`, on line 7, the
line with `Sort`. The message says `Failed to compare two elements in the
array.` Under it, a line says what caused it:
`It was caused by System.ArgumentException: At least one object must implement IComparable.`

The compiler saw no problem, because `Sort` is allowed on a list of any
type. While the program runs, `Sort` asks each character to compare
itself with another, through an interface, and a `Character` keeps no
such promise. The message names `IComparable`, an older form of the same
promise, without the angle brackets. `int` and `string` keep both forms,
which is why a list of numbers or of text sorts with no help.

</details>

## 5. A body that is only a parent

Here are `Body` and `Planet` from the tutorial. `Body` is abstract.

```csharp exec
id: a-body-that-is-only-a-parent-1
file: Bodies.cs
abstract class Body
{
    public string Name;
    public int Width;    // in km

    public Body(string name, int width)
    {
        Name = name;
        Width = width;
    }

    public abstract string Orbits();

    public override string ToString()
    {
        return $"{Name}, {Width} km wide, orbits {Orbits()}";
    }
}

class Planet : Body
{
    public Planet(string name, int width) : base(name, width)
    {
    }

    public override string Orbits()
    {
        return "the Sun";
    }
}
```

Ceres is a round body 940 km wide, in the belt of asteroids between Mars
and Jupiter. It orbits the Sun, but astronomers do not call it a planet.
This program makes it a plain `Body`.

```csharp exec
id: a-body-that-is-only-a-parent-2
expect: CS0144
var ceres = new Body("Ceres", 940);
Console.WriteLine(ceres);
```

```predict
type: choice

What will appear under the cell?

- Ceres, 940 km wide, orbits
  - `Body`'s `Orbits` has no code, so it gives nothing.
- Nothing: it does not compile
  - `Body` is abstract.
- It stops with an exception
  - The program runs until `ToString` calls `Orbits`.
```

Astronomers call Ceres a *dwarf planet*. Can you write a class
`DwarfPlanet`, a child of `Body`, and make Ceres one? You can write it in
the first cell, under `Planet`.

```solution
var ceres = new DwarfPlanet("Ceres", 940);
Console.WriteLine(ceres);

class DwarfPlanet : Body
{
    public DwarfPlanet(string name, int width) : base(name, width)
    {
    }

    public override string Orbits()
    {
        return "the Sun";
    }
}
---
It prints `Ceres, 940 km wide, orbits the Sun`. `DwarfPlanet` must
override `Orbits`, because `Body` makes it abstract. Without it, the class
does not compile, and the message names the member that is missing, as
for a class that forgets the method of its interface.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `DwarfPlanet` replaces yours
for this program (rule 4).
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0144: Cannot create an instance of the
abstract type or interface 'Body'`. An *instance* of a class is another
word for an object made from it. `Body` is abstract, so no object can be
made from it, only from its child classes. `new IShape()` gives the same
error, CS0144. Its message names both kinds of type, an abstract type and
an interface, because neither has objects of its own.

</details>

## 6. A child keeps its parent's promise

`Character` keeps the promise of `IDamageable`. `Troll` is a child of
`Character`, with its own `TakeDamage`, and its first line does not name
`IDamageable` at all. This `Character` replaces the one in problem 4
(rule 4).

```csharp exec
id: a-child-keeps-its-parents-promise-1
file: Character.cs
interface IDamageable
{
    int Health { get; }
    void TakeDamage(int amount);
}

class Character : IDamageable
{
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

    public virtual void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}

class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

The program puts a character and a troll in a `List<IDamageable>`, and
hits each of them for 8.

```csharp exec
id: a-child-keeps-its-parents-promise-2
var room = new List<IDamageable>();
room.Add(new Character("Ada", 10));
room.Add(new Troll("Grog", 10));
foreach (IDamageable thing in room)
{
    thing.TakeDamage(8);
    Console.WriteLine(thing);
}
```

```predict
type: choice

What will the second line print?

- Grog (health 6)
  - The troll runs its own `TakeDamage`, and takes half the hit.
- Grog (health 2)
  - Through an `IDamageable` variable, the troll takes the whole hit.
- Nothing: it does not compile
  - `Troll`'s first line does not name `IDamageable`.
```

<details class="dl-answer"><summary>why</summary>

`Ada (health 2)`, then `Grog (health 6)`. A troll is a character, and a
character keeps the promise of `IDamageable`, so a troll keeps it too,
with nothing written in `Troll`. A child class gets its parent's promises,
as it gets its parent's members.

Through the `IDamageable` variable `thing`, the troll runs its own
`TakeDamage`, because it overrides `Character`'s virtual one. So it takes
half of the 8.

</details>

## 7. From earlier: who may change the health?

From [Inheritance: one class built on another](lesson:one-parent-many-children).
This program uses the `Troll` from problem 6.

```csharp exec
id: who-may-change-the-health-1
expect: CS0272
var grog = new Troll("Grog", 10);
grog.Health = 50;
Console.WriteLine(grog);
```

```predict
type: choice

What will appear under the cell?

- Grog (health 50)
  - The program sets Grog's health to 50.
- Nothing: it does not compile
  - `Health` has a `protected set`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0272: The property or indexer
'Character.Health' cannot be used in this context because the set
accessor is inaccessible`. `Health` has a `protected set`, so only the
code of `Character` and of its child classes, such as `Troll`, can change
it. The program is neither of them.

`IDamageable` promises a `Health` with only a `get`. So a program that
holds Grog in an `IDamageable` variable could not change his health
either, even if the `set` were public: through the interface, it sees
only what the interface promises.

</details>

## 8. From earlier: two methods, one name

From [Methods and overloading](lesson:one-class-many-methods). A kitchen
scale shows whole grams, or kilograms with a decimal point. `Weigh` has
two overloads.

```csharp exec
id: two-methods-one-name-1
file: Scale.cs
class Scale
{
    public string Weigh(int grams)
    {
        return $"{grams} g";
    }

    public string Weigh(double kilograms)
    {
        return $"{kilograms} kg";
    }
}
```

```csharp exec
id: two-methods-one-name-2
var scale = new Scale();
Console.WriteLine(scale.Weigh(500));
Console.WriteLine(scale.Weigh(0.5));
Console.WriteLine(scale.Weigh(2));
```

```predict
type: choice

What will the last line print?

- 2 g
  - `2` has no decimal point.
- 2 kg
  - `2` is a small number, so it must be kilograms.
- Nothing: it does not compile
  - Both overloads could take a 2.
```

<details class="dl-answer"><summary>why</summary>

`500 g`, then `0.5 kg`, then `2 g`. C# chooses an overload from the types
of the arguments, when it compiles the program. `2` is an `int`, so the
call runs the overload that takes an `int`. An `int` could become a
`double`, but C# prefers the overload that needs no change. To weigh 2
kilograms, write `2.0`.

</details>

## 9. From earlier: a fixed list of kinds

From [Designing classes: from a description to classes and enums](lesson:from-a-description-to-classes).
A game has three kinds of potion: healing, strength and speed. Each
potion has a kind and a size. Would you write an enum for the kind, three
child classes of `Potion`, or an interface that each kind of potion
keeps?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

If the three kinds differ only in a name, and one method can treat them
all with an `if` or a `switch`, an enum is enough:
`enum PotionKind { Healing, Strength, Speed }`, and a field of that type
in `Potion`.

If each kind does something different when a character drinks it, with
its own code, then each kind can be a child class of `Potion`, with its
own override of a method such as `Drink`. `Potion` could be abstract,
because there is no potion of no kind.

An interface fits when things that are not potions can be drunk too,
such as a bowl of soup. Then `IDrinkable` could be kept by `Potion` and by
`Soup`, and neither would be built on the other.

</details>

## 10. A promise forgotten

This problem is the last on the page, because its class does not
compile, and a class that does not compile stops every cell below it.

A barrel can be hit until it breaks. It keeps its health in a private
field, and it names `IDamageable`, from problem 6. Press **Check**. The
cell is meant not to compile.

```csharp exec
id: a-promise-forgotten-1
file: Barrel.cs
expect: CS0535
class Barrel : IDamageable
{
    private int _health = 3;

    public void TakeDamage(int amount)
    {
        _health = Math.Max(0, _health - amount);
    }
}
```

```csharp exec
id: a-promise-forgotten-2
expect: CS0535
var barrel = new Barrel();
barrel.TakeDamage(2);
Console.WriteLine(barrel.Health);
```

Which member of `IDamageable` does `Barrel` not have? Can you give it that
member, in the first cell, without changing the private field?

```inputs
barrel.Health
```

```hint
after: 2 errors
Read the message. Which member of `IDamageable` does it name? Is that
member a method or a property?
```

```hint
after: 3 errors
title: a property that only reads
A property whose `get` only returns a value can be written on one line,
with `=>`, as `MaxHealth` was on
[Inheritance](lesson:one-parent-many-children):
`public int Health => _health;`
```

```solution
var barrel = new Barrel();
barrel.TakeDamage(2);
Console.WriteLine(barrel.Health);

class Barrel : IDamageable
{
    private int _health = 3;

    public int Health => _health;

    public void TakeDamage(int amount)
    {
        _health = Math.Max(0, _health - amount);
    }
}
---
It prints `1`. `IDamageable` promises a `Health` with a `get`, and
`public int Health => _health;` is a property with only a `get`, which
returns the private field. The promise says what code outside the class
can read. It does not say how the class stores it.

The solution writes `Barrel` again, below its program (rule 4).
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0535: 'Barrel' does not implement interface
member 'IDamageable.Health'`. `IDamageable` promises two members: a
`Health` property and a `TakeDamage` method. `Barrel` has the method, but
its health is only in a private field, `_health`, which code outside the
class cannot read. A field is not a property, so a field with the same
name would not keep the promise either.

</details>
