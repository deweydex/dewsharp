---
title: "Interfaces: one promise, many classes"
version: 2026.09.28.1
from: when-is-a-breaks
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO3, FOOP-LO4, FOOP-LO6]
---

# Interfaces: one promise, many classes

On [Inheritance: a closer look at "is a"](lesson:when-is-a-breaks), a
square built on a rectangle stopped being a square when it was stretched.
One answer was a promise that both classes can keep: an `Area`, and no
`Stretch`. Here are a rectangle and a square again. This time, neither is
built on the other. Each one is a class of its own, with its own `Area`
method.

```csharp exec
id: two-shapes-one-list-1
file: Shapes.cs
class Rectangle
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

class Square
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

A program for a floor plan wants every shape in one list, and one loop
that asks each shape for its area. A list holds one type of thing. Which
type do a rectangle and a square have in common? Only `object`. On
[Inheritance: one class built on another](lesson:one-parent-many-children),
you met `object`: the parent of every class, even a class that names no
parent. So this program keeps the two shapes in a `List<object>`.

This program has a problem in it, on purpose. What do you think will
appear under the cell when you run it?

```csharp exec
id: two-shapes-one-list-1-program
expect: CS1061
var shapes = new List<object> { new Rectangle(3, 4), new Square(3) };
foreach (object shape in shapes)
{
    Console.WriteLine(shape.Area());
}
```

```predict
type: choice

What will appear under the cell?

- 12, and then 9
  - Each object in the list has an `Area` method. Does the compiler look
    at the objects, or at the type of the variable?
- Nothing: it does not compile
  - The compiler checks every line before anything runs.
- 12, and then it stops with an exception
  - Some languages run one line at a time, and stop at the first line
    they cannot complete.
```

It does not compile, and nothing runs. The compiler shows one message,
about line 4:

```console
Program.cs(4,29): error CS1061: 'object' does not contain a definition for 'Area' and no accessible extension method 'Area' accepting a first argument of type 'object' could be found (are you missing a using directive or an assembly reference?)
```

The first part of the message is the part that matters here: *'object'
does not contain a definition for 'Area'*. (The rest is about *extension
methods*, which this course does not use.) In the loop, `shape` is an
`object` variable. The compiler checks each method call against the type
of the variable, as on
[Overriding: a closer look at virtual and override](lesson:virtual-and-override).
An `object` has a `ToString`, but it has no `Area`. Both objects in the
list have one, but the compiler does not look at the objects.

If you know Python: Python runs a program like this one, and prints both
areas. Python searches the object itself for the method, and only when
the line runs. C# checks before anything runs, so it needs the program to
say, in a type, that every shape in the list has an `Area`.

A parent class could say it. But what would the parent's own `Area` do? A
shape in general has no sides to multiply. And a class can have only one
parent, so a class that already has a parent could never join the list.
C# has another kind of type for this job.

## An interface: a promise in code

An *interface* is a list of methods that a class promises to have, with no
code of its own. The cell below starts with one, called `IShape`. It lists
one method, `double Area();`. The line has no body: no curly brackets and
no code, only a semicolon at the end.

Under the interface are the rectangle and the square again, with one
change each. After the class's name come a colon and `IShape`. That says:
this class keeps the promise of `IShape`. The two classes replace the ones
above (rule 4: a class written again further down replaces the earlier
one).

```csharp exec
id: an-interface-1
file: Shapes.cs
interface IShape
{
    double Area();
}

class Rectangle : IShape    // changed
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

class Square : IShape    // changed
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

The program is the first program again, with `object` changed to `IShape`
in two places. What do you think it prints now?

```csharp exec
id: an-interface-1-program
var shapes = new List<IShape> { new Rectangle(3, 4), new Square(3) };
foreach (IShape shape in shapes)
{
    Console.WriteLine(shape.Area());
}
```

It prints `12`, then `9`. The list is a `List<IShape>`, and the loop's
variable is an `IShape`. The interface says that every `IShape` has an
`Area`, so the compiler lets the loop ask for it. When the program runs,
each object runs its own `Area`: the rectangle multiplies its width by its
height, and the square multiplies its side by itself.

A class that names an interface after its colon, and has everything the
interface lists, *implements* the interface. To implement an interface is
to keep its promise. Here, `Rectangle` and `Square` both implement
`IShape`, and neither is built on the other.

Three more things to know about an interface:

- **Its name starts with a capital *I*.** C# does not need it, but C#
  programmers always write it, so that a reader can see from the name
  alone that the type is an interface, and not a class.
- **It is a type.** A variable, a list or a parameter can have an
  interface as its type, as `shape` does. An interface written in a cell
  can be used by the cells below it, as a class can (rule 2).
- **It has no objects of its own.** `new IShape()` does not compile. An
  interface is only a promise, so there is nothing in it to make. The
  objects in a `List<IShape>` are rectangles and squares.

Can you put a third shape in the program's list, a square with sides of
5? Then try to put `new IShape()` in the list too. What does the compiler
say?

<details class="dl-answer"><summary>What each line does</summary>

- `interface IShape` starts the interface. Like a class, it has a name and
  curly brackets.
- `double Area();` is the promise: every `IShape` has a method called
  `Area`, which takes nothing and returns a `double`. It has no `public`.
  Everything an interface lists is public without the word, because a
  promise is made to the code outside the class.
- `class Rectangle : IShape` says that `Rectangle` implements `IShape`. It
  is the same colon that names a parent class.
- `public double Area()` in `Rectangle` keeps the promise. It has the same
  name, the same return type and the same parameters (none) as the line in
  the interface, and it is `public`. It has no `override`, because the
  interface has no method to replace. It has only a promise to keep.
- `return Width * Height;`: the width and the height are `int`s, and
  `Area` returns a `double`. C# converts the `int` to a `double` by
  itself, because every `int` fits in a `double`, as
  [Types and their sizes](lesson:types-and-their-sizes) showed. A
  `double` with nothing after the point prints with no point, so the area
  prints as `12`.
- `new List<IShape> { ... }` makes a list whose elements are `IShape`s. A
  rectangle and a square can both go in it, because both implement
  `IShape`.

</details>

## The compiler checks the promise

A promise is only useful if it is kept. What happens when a class names
`IShape`, but has no `Area`? Here is a circle that does that. This cell is
meant to fail. Press **Check**, and read the message.

```csharp exec
id: the-compiler-checks-the-promise-1
file: Circle.cs
expect: CS0535
class Circle : IShape
{
    public double Radius { get; private set; }

    public Circle(double radius)
    {
        Radius = radius;
    }
}
```

It does not compile: `error CS0535: 'Circle' does not implement interface
member 'IShape.Area()'`. A *member* of a class is a field, a property or
a method that the class has. The members of an interface are the things
it lists: here, one method, `Area`. The compiler reads the promise in
`IShape`, searches `Circle` for an `Area`, and finds none. So it refuses
the class before anything runs, and it names the member that is missing.

In Python, a program with a class like this one runs until a line asks a
circle for its area, and only then stops. That might be weeks later, on
somebody else's computer. In C#, the compiler finds the missing method as
soon as the class is compiled.

Here is `Circle` again, with the method it promised. The area of a circle
is π × r × r, where r is the *radius*: the distance from the centre of the
circle to its edge. `Math.PI` is C#'s value of π. This `Circle` replaces
the one above (rule 4), and the cells below use it.

```csharp exec
id: the-compiler-checks-the-promise-2
file: Circle.cs
class Circle : IShape
{
    public double Radius { get; private set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double Area()
    {
        return Math.PI * Radius * Radius;
    }
}
```

Now three shapes share one list. This time the loop prints each shape
itself, and then its area, rounded to two decimal places with
`Math.Round`. `shape` is still an `IShape` variable, and none of the three
classes has a `ToString` of its own.

```csharp exec
id: the-compiler-checks-the-promise-2-program
var shapes = new List<IShape> { new Rectangle(3, 4), new Square(3), new Circle(2) };
foreach (IShape shape in shapes)
{
    Console.WriteLine($"{shape}: {Math.Round(shape.Area(), 2)}");
}
```

```predict
type: choice

What will the first line print?

- Rectangle: 12
  - Printing an object prints the name of its class, when the class has
    no `ToString` of its own.
- IShape: 12
  - `shape` is an `IShape` variable.
- Nothing: it does not compile
  - `IShape` lists `Area`, and nothing else.
```

It prints `Rectangle: 12`, then `Square: 9` and `Circle: 12.57`. The
variable's type is `IShape`, but the object in it is a `Rectangle`, and C#
asks the object for its text. No shape has a `ToString` of its own, so
each one uses `object`'s, which gives the name of the object's own class.
The compiler allows `{shape}` because every object is an `object`, whatever
the type of its variable. Through an `IShape` variable, a program can use
what `IShape` lists, and what every object has.

The circle joined the list, and the loop did not change. The loop was
written for the promise, not for rectangles and squares, so any class
that keeps the promise can join it.

What does the compiler say when a method is almost the one that the
promise names? In the second `Circle` cell, above the program, can you
change `Area` to `area`, with a small *a*, and press **Check**? Then try
`double Area()` with no `public` in front of it. Which parts of the
message change? Press **Reset** on that cell when you have finished,
because the cells below use it.

## One class, several promises

An astronaut can be a commander and a scientist, both at once. Peggy
Whitson, a biochemist, was the first woman to command the International
Space Station, and she did experiments there too.

Could `Astronaut` have two parent classes, `Commander` and `Scientist`?
No. In C#, a class can have only one parent class, as
[Inheritance](lesson:one-parent-many-children) said. To build one class
on two or more parent classes is called *multiple inheritance*. Some
languages allow it, Python among them. C# does not: the compiler refuses
the class. But a class can implement as many interfaces as it needs. Here
are two interfaces.

```csharp exec
id: one-class-several-promises-1
file: Roles.cs
interface IScientist
{
    string Name { get; }
    string Study(string sample);
}

interface ICommander
{
    string Command(string station);
}
```

`IScientist` lists a property as well as a method: an interface can
promise a property too. `string Name { get; }` promises that code outside
the class can read the scientist's name. It does not say how the class
stores it, or who may change it. So, in full, an interface is a list of
the methods and properties that a class promises to have.

Here are the classes that keep those promises. An astronaut is a crew
member, so `Astronaut` has a parent class, `CrewMember`, and it implements
both interfaces. After the colon, the parent class comes first, and then
the interfaces, with commas between them. A rover is not a crew member,
and it cannot command anything. But a rover on Mars studies rocks, so
`Rover` keeps one promise: `IScientist`.

```csharp exec
id: one-class-several-promises-2
file: Crew.cs
class CrewMember
{
    public string Name { get; private set; }

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Astronaut : CrewMember, IScientist, ICommander
{
    public Astronaut(string name) : base(name)
    {
    }

    public string Study(string sample)
    {
        return $"{Name} looks at {sample} under a microscope.";
    }

    public string Command(string station)
    {
        return $"{Name} commands {station}.";
    }
}

class Rover : IScientist
{
    public string Name { get; private set; }

    public Rover(string name)
    {
        Name = name;
    }

    public string Study(string sample)
    {
        return $"{Name} fires its laser at {sample}.";
    }
}
```

The program asks Peggy Whitson to command the station. Then it puts her
and the rover Curiosity in one list of scientists, and asks each of them
to study a rock.

```csharp exec
id: one-class-several-promises-2-program
var peggy = new Astronaut("Peggy Whitson");
var curiosity = new Rover("Curiosity");
Console.WriteLine(peggy.Command("the space station"));

var scientists = new List<IScientist> { peggy, curiosity };
foreach (IScientist scientist in scientists)
{
    Console.WriteLine(scientist.Study("a rock"));
}
```

It prints `Peggy Whitson commands the space station.`, then
`Peggy Whitson looks at a rock under a microscope.` and
`Curiosity fires its laser at a rock.`

An object has one class, but a variable of several types can hold it.
Peggy's object is an `Astronaut`, and it is also a `CrewMember`, an
`IScientist` and an `ICommander`. So it can go in a `List<IScientist>`,
and it could go in a `List<ICommander>` too. Curiosity is a `Rover` and an
`IScientist`, but not an `ICommander`. Can you add three lines to the
program: one that makes a `List<ICommander>`, and two that `Add` Peggy and
Curiosity to it? Which one does the compiler refuse?

`Astronaut` has no `Name` of its own. It gets `Name` from its parent,
`CrewMember`, and that property keeps `IScientist`'s promise of a `Name`.
A class can keep a promise with a member it gets from its parent.

This is how C# does what other languages do with multiple inheritance: a
class has at most one parent class, and it can implement any number of
interfaces.

## An abstract class: a parent that is only a parent

Some classes share more than a promise. A planet and a moon both have a
name and a width, and both of them orbit something. Problem 6 on the
[practice page for inheritance](lesson:one-parent-many-children-practice)
said that they could be children of one parent, `Body`: the word
astronomers use for any natural object in space.

But what does a body orbit? A planet orbits the Sun, and a moon orbits its
planet. A plain body has no answer, and a program never needs a plain
body. Every body it has is a planet or a moon.

C# has a word for a class like that: `abstract`. An *abstract class* is a
class that is only a parent. A program cannot use `new` to make an object
of it. It makes objects of the child classes. An *abstract method* is a
method in an abstract class with no code: no curly brackets, only a
semicolon, as in an interface. Every child class must override it, so it
is a promise, like a method in an interface. On
[Inheritance](lesson:one-parent-many-children), the message CS0506 named
`abstract` as one of the words that let a child override a method. This is
that word.

```csharp exec
id: an-abstract-class-1
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

class Moon : Body
{
    public string PlanetName;

    public Moon(string name, int width, string planetName) : base(name, width)
    {
        PlanetName = planetName;
    }

    public override string Orbits()
    {
        return PlanetName;
    }
}
```

The program puts a planet and a moon in one `List<Body>`, and prints each
of them. `ToString` is written in `Body`, and it calls `Orbits()`, which
has no code in `Body`.

```csharp exec
id: an-abstract-class-1-program
var bodies = new List<Body>
{
    new Planet("Jupiter", 139820),
    new Moon("Europa", 3122, "Jupiter")
};
foreach (Body body in bodies)
{
    Console.WriteLine(body);
}
```

```predict
type: choice

What will the second line print?

- Europa, 3122 km wide, orbits Jupiter
  - Each object runs its own class's `Orbits`, as it would with
    `virtual`.
- Europa, 3122 km wide, orbits
  - `Body`'s own `Orbits` has no code, so it gives nothing.
- Nothing: it does not compile
  - `ToString` calls a method that has no code.
```

It prints `Jupiter, 139820 km wide, orbits the Sun`, then
`Europa, 3122 km wide, orbits Jupiter`. An abstract method works like a
virtual one: when the program runs, each object runs the version that
belongs to its own class. `Body`'s `ToString` asks for `Orbits()`. A
planet answers `the Sun`, and a moon answers the name of its planet.
`Body` has no version of its own, and it needs none. Every object is a
planet or a moon, and the compiler checks that each of their classes has
an `Orbits`. A child class of `Body` without one does not compile, in the
same way as a class without the method that its interface lists.

So a planet and a moon share a parent that holds their fields, the
constructor that stores them, their `ToString`, and one promise,
`Orbits`. What would the compiler say to `new Body("Ceres", 940)`?
Problem 5 on the practice page tries it.

### An interface, or a parent class?

Both an interface and an abstract class make a promise that other classes
keep. Here is how they differ.

| | An interface | An abstract class |
|---|---|---|
| What it holds | Promises: methods and properties, with no code | Fields, constructors, methods with code, and promises (abstract methods) |
| How many a class can have | As many as it needs | One, because a class has only one parent class |
| Objects of its own, with `new` | None | None |
| What its classes share | Something that each of them can do | What they are, and some data and code |
| On this page | `IShape`, `IScientist`, `ICommander` | `Body` |

Choose a parent class, abstract or not, when the classes are kinds of one
thing ("a moon is a body"), and they share data or code. Choose an
interface when classes that are not kinds of one thing can do the same
thing ("an astronaut can study a rock, and so can a rover"), or when a
class that already has a parent needs to keep one more promise. People
often call the first an "is a" relationship, and the second a "can do"
relationship.

What about the shapes at the top of this page? An abstract class `Shape`,
with an abstract `Area`, would compile too, and the loop would work. But
the rectangle, the square and the circle share no fields and no code. The
parent would hold only a promise, and it would use the one parent class
that each shape can have. An interface makes the same promise, and each
shape can still have a parent class of its own.

<details class="dl-why"><summary>Can an interface have code?</summary>

Since 2019 (C# 8), an interface can give a method a body. A class that
implements the interface and has no version of that method uses the one
in the interface. This is called a *default interface method*, and people
who write libraries use it to add a method to an interface without
breaking every class that already implements it. This course does not use
it: here, an interface is only a list of promises. Microsoft's page on
interfaces, in *Where to read more*, mentions it.

</details>

## Promises that C# already has

C#'s own types keep promises too. `List<string>` has a method, `Sort`,
which puts text in alphabetical order. `List<int>` has the same method,
and it puts numbers in order. So how does `Sort` know how to compare two
strings, or two numbers?

It does not need to know. `string` implements an interface called
`IComparable<string>`, and `int` implements `IComparable<int>`. The
interface promises one method, `CompareTo`, which compares this value with
another, and says which of the two comes first. `Sort` asks two elements to
compare themselves, through that promise. The type in the angle brackets,
`<string>`, is the type of the other value, as `<int>` in `List<int>` is
the type of the elements.

`Sort` was written long before your classes, but it can sort a list of
your own objects in the same way, once their class implements
`IComparable<T>`, with the class's own name in the place of `T`. Problem 4
on the practice page does it.

## Your turn

Each world has a promise, and one class that already keeps it. Can you
make a second class keep it too, a class that is not a kind of the first?
Then one list can hold both, and one loop can treat them alike.

<div class="dl-world" data-world="game">

A bomb hits everything in a room: the characters, and the door. A door is
not a character. It has no name, and nobody heals it. But it can take
damage until it breaks.

The first cell holds `IDamageable`, a promise to have a `Health` and a
`TakeDamage` method, and `Character`, which keeps it. It is a smaller
`Character` than the one on [Inheritance](lesson:one-parent-many-children),
with only what this task needs. Can you make `Door`, in the second cell,
keep the promise too? A door's health never goes below 0, as a
character's never does.

The program adds a door to a `List<IDamageable>`, so it is meant not to
compile until `Door` keeps the promise. Its message says so:
`Argument 1: cannot convert from 'Door' to 'IDamageable'`.

```csharp exec
id: your-turn-1-character--game
file: Character.cs
interface IDamageable
{
    int Health { get; }
    void TakeDamage(int amount);
}

class Character : IDamageable
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
}
```

```csharp exec
id: your-turn-1--game
file: Door.cs
class Door
{
    public int Health { get; private set; }

    public Door(int health)
    {
        Health = health;
    }

    public override string ToString()
    {
        return $"a door (health {Health})";
    }
}
```

```csharp exec
id: your-turn-1-program--game
expect: CS1503
var ada = new Character("Ada", 10);
var door = new Door(6);
var room = new List<IDamageable>();
room.Add(ada);
room.Add(door);

// Two bombs, and each one hits everything in the room for 4.
foreach (IDamageable thing in room)
{
    thing.TakeDamage(4);
    thing.TakeDamage(4);
    Console.WriteLine(thing);
}
```

```inputs
door.Health
ada.Health
door.ToString()
```

```hint
after: 2 errors
What does the first line of `Character` say, after the class's name, that
the first line of `Door` does not? Once `Door` says it, what else must
`Door` have?
```

```hint
after: 3 errors
title: the method's first line
The method's first line is the line in `IDamageable`, with `public` in
front: `public void TakeDamage(int amount)`. `Math.Max(0, ...)` gives the
larger of two numbers, so the health never goes below 0. If the compiler
says CS0535, which member of `IDamageable` is missing from `Door`?
```

```solution
var ada = new Character("Ada", 10);
var door = new Door(6);
var room = new List<IDamageable>();
room.Add(ada);
room.Add(door);

// Two bombs, and each one hits everything in the room for 4.
foreach (IDamageable thing in room)
{
    thing.TakeDamage(4);
    thing.TakeDamage(4);
    Console.WriteLine(thing);
}

class Door : IDamageable
{
    public int Health { get; private set; }

    public Door(int health)
    {
        Health = health;
    }

    public override string ToString()
    {
        return $"a door (health {Health})";
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}
---
`Ada (health 2)`, then `a door (health 0)`. `Door` now has both members
of `IDamageable`, so it keeps the promise. Its `Health` property was there
already, and `TakeDamage` is new. The loop does not know which object is a
character and which is a door, and it does not need to know.

`class Door : Character` would give a door a name, and anything else a
character can do. The interface lets a door share only what it shares
with a character: health, and a way to lose it.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Door` replaces yours for this
program (rule 4).
```

</div>

<div class="dl-world" data-world="solar-system">

The probe Voyager and the Hubble Space Telescope both take photographs. A
probe is not a telescope, and a telescope is not a probe. A probe turns to
face its target with small rockets, which burn fuel. Hubble has no rockets
at all. It turns with spinning wheels, powered by electricity from its
solar panels, so it needs no fuel for a photograph.

The first cell holds `ICanPhotograph`, a promise to have a `Photos` count
and a `Photograph` method, and `Probe`, which keeps it. It is a smaller
`Probe` than the one on [Inheritance](lesson:one-parent-many-children),
with only what this task needs. Can you make `Telescope`, in the second
cell, keep the promise too? Each photograph adds one to its `Photos`, and
uses no fuel.

The program adds the telescope to a `List<ICanPhotograph>`, so it is meant
not to compile until `Telescope` keeps the promise. Its message says so:
`Argument 1: cannot convert from 'Telescope' to 'ICanPhotograph'`.

```csharp exec
id: your-turn-1-probe--solar-system
file: Probe.cs
interface ICanPhotograph
{
    int Photos { get; }
    string Photograph(string target);
}

class Probe : ICanPhotograph
{
    public string Name;
    public int Fuel { get; private set; }
    public int Photos { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public string Photograph(string target)
    {
        if (Fuel < 1)
        {
            return $"{Name} has no fuel to turn towards {target}.";
        }
        Fuel = Fuel - 1;    // turning to face the target burns 1 kg
        Photos = Photos + 1;
        return $"{Name} photographs {target}.";
    }
}
```

```csharp exec
id: your-turn-1--solar-system
file: Telescope.cs
class Telescope
{
    public string Name;
    public int Photos { get; private set; }

    public Telescope(string name)
    {
        Name = name;
    }
}
```

```csharp exec
id: your-turn-1-program--solar-system
expect: CS1503
var voyager = new Probe("Voyager", 1);
var hubble = new Telescope("Hubble");
var cameras = new List<ICanPhotograph>();
cameras.Add(voyager);
cameras.Add(hubble);

foreach (ICanPhotograph camera in cameras)
{
    Console.WriteLine(camera.Photograph("Jupiter"));
    Console.WriteLine(camera.Photograph("Saturn"));
}
Console.WriteLine($"Photos: {voyager.Photos} and {hubble.Photos}");
```

```inputs
hubble.Photos
hubble.Photograph("Mars")
voyager.Photos
```

```hint
after: 2 errors
What does the first line of `Probe` say, after the class's name, that the
first line of `Telescope` does not? Once `Telescope` says it, what else
must `Telescope` have?
```

```hint
after: 3 errors
title: the method's first line
The method's first line is the line in `ICanPhotograph`, with `public` in
front: `public string Photograph(string target)`. It adds one to `Photos`,
and returns a line of text, as `Probe`'s does. If the compiler says
CS0535, which member of `ICanPhotograph` is missing from `Telescope`?
```

```solution
var voyager = new Probe("Voyager", 1);
var hubble = new Telescope("Hubble");
var cameras = new List<ICanPhotograph>();
cameras.Add(voyager);
cameras.Add(hubble);

foreach (ICanPhotograph camera in cameras)
{
    Console.WriteLine(camera.Photograph("Jupiter"));
    Console.WriteLine(camera.Photograph("Saturn"));
}
Console.WriteLine($"Photos: {voyager.Photos} and {hubble.Photos}");

class Telescope : ICanPhotograph
{
    public string Name;
    public int Photos { get; private set; }

    public Telescope(string name)
    {
        Name = name;
    }

    public string Photograph(string target)
    {
        Photos = Photos + 1;    // no fuel: it turns with its wheels
        return $"{Name} photographs {target}.";
    }
}
---
Voyager has fuel for one turn, so it photographs Jupiter and then refuses
Saturn. Hubble photographs both. The last line is `Photos: 1 and 2`.
`Telescope` now has both members of `ICanPhotograph`, so it keeps the
promise. Its `Photos` property was there already, and `Photograph` is
new. The loop does not know which object is a probe and which is a
telescope, and it does not need to know.

`class Telescope : Probe` would give a telescope a tank of fuel that it
never uses. The interface lets a telescope share only what it shares with
a probe: a camera, and a count of its photos.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Telescope` replaces yours for
this program (rule 4).
```

</div>

<div class="dl-world" data-world="your-own">

Think of two things in your world that are not kinds of one another, but
that can do the same thing. A shop and a monster might both be robbed. A
ship and a castle might both be repaired. What is the one thing they can
both do?

Can you write an interface for it, with one method, and a property if it
helps? Then make two of your classes keep its promise. You can copy
classes from your own world on an earlier page, such as
[Inheritance](lesson:one-parent-many-children), where they are saved, or
write two small new ones. In the program, put one object of each class in
one list, and call the interface's method on each of them in one loop.

```csharp exec
id: your-turn-1--your-own
// My interface, and two classes that keep its promise.
```

```csharp exec
id: your-turn-1-program--your-own
// My program: one list that holds both, and one loop.
```

</div>

## Looking back

A parent class says what a thing *is*, and an interface says what a thing
*can do*. On this page, which classes shared a parent, and which shared
only a promise? Could `Circle` have been a child class of `Rectangle`?
Why do you think the course kept `Square` and `Rectangle` apart?

A challenge: a promise can grow. Can you add a second method to
`IShape`, `double Perimeter();`, which gives the length of the shape's
outline: the distance around its edge? Before you run it, how many
messages do you think the compiler will show, and which classes will they
name? Then give each class its `Perimeter`. (The perimeter of a circle is
2 × π × r.) In one file, C# needs the program's statements before any
interface or class, so the interface and the classes come last here.

```csharp challenge
var shapes = new List<IShape> { new Rectangle(3, 4), new Circle(2) };
foreach (IShape shape in shapes)
{
    Console.WriteLine($"{shape}: area {Math.Round(shape.Area(), 2)}");
}

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

class Circle : IShape
{
    public double Radius { get; private set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double Area()
    {
        return Math.PI * Radius * Radius;
    }
}
```

Everything on this page runs here, in the browser, and nothing in it
needs Visual Studio. In Visual Studio, when a class names an interface
and the class is missing some of its members, a light bulb appears beside
the line. It offers *Implement interface*, which writes the first line of
each missing member for you, with a body that throws a
`NotImplementedException` until you write your own.

The [practice page](lesson:many-classes-one-promise-practice) has more
problems on interfaces and abstract classes, and three from earlier pages.
After it, [Composition: objects inside other objects](lesson:objects-inside-objects)
builds classes whose fields hold other objects. It meets the astronaut
again, and asks what to do when the things a person can do change from
one mission to the next.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Interfaces: define behavior for multiple types*. C#
fundamentals.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces>.
Microsoft's own page on interfaces. It calls an interface a *contract*,
where this page says a promise. Its first example uses more of C# than
this course does, so start at the parts *Declare an interface* and
*Implement an interface*: an interface, `ILogger`, kept by two classes.
Its part *Interfaces vs. abstract classes* says when to choose each. It
also names things that this page does not cover: a default interface
method, and an interface that is built on another interface.

Microsoft. *abstract keyword*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstract>.
Its first example is an abstract `Vehicle` with two child classes, `Car`
and `Boat`. They share the parent's constructor and methods, and each
gives its own `Move`, as `Planet` and `Moon` each give their own `Orbits`
here. Its programs start in a `static void Main` inside a class, the
older form that
[Visual Studio: the tools around your code](lesson:the-tools-around-your-code)
showed.

Microsoft. *IComparable&lt;T&gt; Interface*. .NET API reference.
<https://learn.microsoft.com/en-us/dotnet/api/system.icomparable-1>.
The promise that `Sort` uses, in Microsoft's reference. It is written for
people who already use C#. Read its *Remarks* part first: it says that
`List<T>.Sort()` calls `CompareTo`, and it has a table of the three kinds
of number that `CompareTo` returns. Its example, which sorts temperatures,
uses more of C# than this course does.
