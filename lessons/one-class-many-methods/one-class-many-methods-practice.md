---
title: "Methods and overloading: practice"
version: 2026.09.28.1
from: one-class-many-methods-practice
practice_for: one-class-many-methods
---

# Methods and overloading: practice

This page has problems on classes with many methods, on overloading and
on static fields, and three from earlier pages. Try each problem before
you open anything under it, and run the cells to test your guesses. Some
cells are meant not to compile, and the problem says so or asks you to
guess. When that happens, nothing is broken: the message is part of the
answer.

The cells follow the rules of the road from the lesson. A class written in
a cell can be used by the cells below it, and a class written again
further down replaces the earlier one.

## 1. Two questions for one planet

```csharp exec
id: two-questions-1
file: Planet.cs
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
}
```

```csharp exec
id: two-questions-1-program
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0);
var jupiter = new Planet("Jupiter", 778.5);
Console.WriteLine(earth.IsFartherThan(mars));
Console.WriteLine(jupiter.Describe());
```

```predict
type: choice

What will the last line print?

- Jupiter: sunlight takes 43.3 minutes
  - `Describe` asks `LightMinutes` for Jupiter's number.
- Jupiter: sunlight takes 8.3 minutes
  - `Describe` gives Earth's number, from the first planet made.
```

<details class="dl-answer"><summary>why</summary>

`False`, then `Jupiter: sunlight takes 43.3 minutes`. Earth is closer to
the Sun than Mars, so it is not farther. `Describe` was called on
`jupiter`, so inside it, `LightMinutes()` is called on Jupiter too, and
works with Jupiter's own distance.

</details>

## 2. The closer of two

Can you add a `CloserOf(Planet other)` method, which returns whichever of
the two planets is closer to the Sun? Can it use `IsFartherThan`?

The program calls `CloserOf`, so it does not compile until the class has
that method. That is expected. Write the method in the class, and then run
the program again.

```csharp exec
id: the-closer-of-two-1
file: Planet.cs
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
}
```

```csharp exec
id: the-closer-of-two-1-program
expect: CS1061
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.CloserOf(earth).Name);
```

```inputs
new Planet("Mars", 228.0).CloserOf(new Planet("Earth", 149.6)).Name
new Planet("Earth", 149.6).CloserOf(new Planet("Mars", 228.0)).Name
```

```hint
after: 2 errors
Does the method return a name, or a planet? What type goes before its
name, then? And if this planet is farther than `other`, which one is
closer?
```

```solution
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.CloserOf(earth).Name);

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

    public Planet CloserOf(Planet other)
    {
        if (IsFartherThan(other))
        {
            return other;
        }
        return this;
    }
}
---
`Earth`, in both orders. The method returns a whole `Planet`, so the
program can ask it anything: its `Name`, or its `Distance`. `this` is the
planet the method was called on, so `return this;` returns that planet.
```

## 3. One star, renamed

```csharp exec
id: one-star-renamed-1
file: Planet.cs
class Planet
{
    public static string Star = "the Sun";

    public string Name;

    public Planet(string name)
    {
        Name = name;
    }

    public string Orbits()
    {
        return $"{Name} orbits {Star}";
    }
}
```

```csharp exec
id: one-star-renamed-1-program
expect: CS0176
var earth = new Planet("Earth");
var mars = new Planet("Mars");
earth.Star = "Proxima";
Planet.Star = "Sol";
Console.WriteLine(earth.Orbits());
Console.WriteLine(mars.Orbits());
```

```predict
type: choice

What happens when you run the program?

- It prints Earth orbits Proxima, then Mars orbits Sol
  - `earth.Star = ...` gives Earth a star of its own.
- It prints Earth orbits Sol, then Mars orbits Sol
  - Changing `Star` through the class changes it for every planet.
- It does not compile
  - A static field is used through the class, not through an object.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0176: Member 'Planet.Star' cannot be
accessed with an instance reference; qualify it with a type name
instead`. The message is about line 3, `earth.Star = "Proxima";`. There
is one `Star`, in the class, so C# refuses a line that treats it as if it
belonged to Earth. Nothing ran, not even the first two lines.

In Python, a line like `earth.star = "Proxima"` runs. It gives Earth a
value of its own, with no message, and Mars never sees it. If each planet
in your program needs a star of its own, make `Star` an instance field,
without `static`, and give it a value in the constructor.

</details>

## 4. A planet counter

```csharp exec
id: a-planet-counter-1
file: Planet.cs
class Planet
{
    public static int PlanetsMade = 0;

    public string Name;

    public Planet(string name)
    {
        Name = name;
        PlanetsMade = PlanetsMade + 1;
    }
}
```

```csharp exec
id: a-planet-counter-1-program
foreach (string name in new List<string> { "Mercury", "Venus", "Earth", "Mars" })
{
    new Planet(name);
}
Console.WriteLine(Planet.PlanetsMade);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`4`. Each `new Planet(name)` runs the constructor, which adds one to the
count in the class. None of the four planets was stored in a variable,
but each one was made.

`PlanetsMade` is a public field, so any program can change it:
`Planet.PlanetsMade = 0;` compiles and resets the count. How could you let
a program read the count, but not change it? The
[Encapsulation](lesson:keeping-details-inside-an-object) page has the
answer: a property with a private `set`. `static` works on a property
too: `public static int PlanetsMade { get; private set; }`. Then only
`Planet`'s own code can change the count.

</details>

## 5. Moons for everyone

This class keeps its moons in a static field.

```csharp exec
id: moons-for-everyone-1
file: Planet.cs
class Planet
{
    public static List<string> Moons = new List<string>();

    public string Name;

    public Planet(string name)
    {
        Name = name;
    }

    public void AddMoon(string moon)
    {
        Moons.Add(moon);
    }

    public string MoonNames()
    {
        return string.Join(", ", Moons);
    }
}
```

```csharp exec
id: moons-for-everyone-1-program
var mars = new Planet("Mars");
var earth = new Planet("Earth");
mars.AddMoon("Phobos");
Console.WriteLine(earth.MoonNames());
```

```predict
type: choice

What will it print?

- Phobos
  - There is one list, in the class, and every planet shares it.
- An empty line
  - No moon was added to Earth.
```

<details class="dl-answer"><summary>why</summary>

`Phobos`: Earth has Mars's moon. `static` makes one list, for the whole
class, and `AddMoon` and `MoonNames` use that one list, whichever planet
they are called on. That is why the tutorial's `Planet` has
`private List<string> _moons`, without `static`: each planet gets a list
of its own.

</details>

## 6. One limit or many

`Probe.TankSize` is a static field, so every probe's tank holds 100 kg.
Suppose your program has two probes: Voyager, whose tank holds 100 kg,
and Juno, whose tank holds 500 kg. Should `TankSize` be a static field or
an instance field?

<details class="dl-answer"><summary>one answer</summary>

Make it an instance field: `public int TankSize;`, given a value in the
constructor for each probe. A static field says "every probe is the same
here", and these two are not. If every probe in your program has the
same tank, a static field is simpler.

</details>

## 7. A full tank to start

A new probe usually starts with a full tank. Can you give `Probe` a second
constructor, which takes only a name, so that `new Probe("Juno")` makes a
probe with `TankSize` kilograms of fuel?

The program makes a probe with only a name, so it does not compile until
the class has that constructor. That is expected. Read what the compiler
says, and then write the constructor.

```csharp exec
id: a-full-tank-to-start-1
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

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }
}
```

```csharp exec
id: a-full-tank-to-start-1-program
expect: CS7036
var juno = new Probe("Juno");
Console.WriteLine(juno);
```

```inputs
juno.ToString()
new Probe("Voyager", 40).ToString()
```

```hint
after: 2 errors
Which constructor already stores a name and an amount of fuel? How does a
second constructor ask it to do that, before its own body runs?
```

```solution
var juno = new Probe("Juno");
Console.WriteLine(juno);

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

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }
}
---
`Juno (fuel 100 kg)`. The new constructor's body is empty: `: this(name,
TankSize)` runs the first constructor, which does all the work. The two
constructors are overloads, so `new Probe("Voyager", 40)` still runs the
first one.
```

## 8. Two methods, one name

This planet has one `Describe` that returns a sentence, and one that
prints it.

```csharp exec
id: two-methods-one-name-1
file: Planet.cs
expect: CS0111
class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }

    public string Describe()
    {
        return $"{Name} is a planet.";
    }

    public void Describe()
    {
        Console.WriteLine(Describe());
    }
}
```

```csharp exec
id: two-methods-one-name-1-program
expect: CS0111
var mars = new Planet("Mars");
mars.Describe();
```

```predict
type: choice

What happens when you run the program?

- It prints Mars is a planet.
  - The `void` one runs, and it asks the other one for the sentence.
- It does not compile
  - Two methods with one name must have different parameters.
```

```solution
var mars = new Planet("Mars");
mars.PrintDescription();

class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }

    public string Describe()
    {
        return $"{Name} is a planet.";
    }

    public void PrintDescription()
    {
        Console.WriteLine(Describe());
    }
}
---
It prints `Mars is a planet.` The method that prints has a name of its
own now. The solution writes `Planet` again, below its program *(rule 4)*,
and C# uses this one in place of the class above.
```

<details class="dl-answer"><summary>why</summary>

It does not compile. Read the first message first: `error CS0111: Type
'Planet' already defines a member called 'Describe' with the same
parameter types`. Neither `Describe` has a parameter, so their parameters
are the same. The other messages say that a call is *ambiguous*: it
could mean either method. The same mistake causes them.

C# chooses between overloads by the arguments in a call, and
`mars.Describe()` has no arguments to show which of the two it means.
What a method returns does not count. Give the second method a name of its own, such as
`PrintDescription()`, and call `mars.PrintDescription();` in the program.
Then it prints `Mars is a planet.`

The message is about the class in the cell above, so the class cell and
the program both show it.

</details>

## 9. From earlier: reaching in

From [Encapsulation: private fields, public methods and properties](lesson:keeping-details-inside-an-object).

```csharp exec
id: from-earlier-reaching-in-1
file: Planet.cs
class Planet
{
    public string Name;
    private List<string> _moons = new List<string>();

    public Planet(string name)
    {
        Name = name;
    }

    public void AddMoon(string moon)
    {
        if (_moons.Contains(moon))
        {
            Console.WriteLine("Refused: already a moon.");
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

This `Planet` replaces the one from problem 8 *(rule 4: a class written
again further down replaces the earlier one)*, so problem 8's messages do
not appear below it.

```csharp exec
id: from-earlier-reaching-in-1-program
expect: CS0122
var mars = new Planet("Mars");
mars.AddMoon("Phobos");
mars._moons.Add("Phobos");
Console.WriteLine(mars.MoonCount());
```

```predict
type: choice

What will it print?

- 2
  - Line 3 adds Phobos to the list itself, and no rule checks it.
- 1
  - The rule in `AddMoon` keeps Phobos out the second time.
- Nothing: it does not compile
  - `_moons` is private, and line 3 is outside the class.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0122: 'Planet._moons' is inaccessible due to
its protection level`. The rule is in `AddMoon`, and line 3 tries to use
the private list directly, where the rule would never run. The compiler
refuses that line, so nothing runs.

In Python, the same steps run, and the second Phobos is added: the
underscore asks a program not to use the list, and nothing stops it. In C#, `private` is the lock, and the
underscore is only a sign for a person reading the code.

</details>

## 10. From earlier: one argument short

From [Visual Studio: the tools around your code](lesson:the-tools-around-your-code).

```csharp exec
id: from-earlier-one-argument-short-1
file: Planet.cs
expect: CS7036
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

    public Planet FartherOf(Planet other)
    {
        if (IsFartherThan())
        {
            return this;
        }
        return other;
    }
}
```

```csharp exec
id: from-earlier-one-argument-short-1-program
expect: CS7036
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.FartherOf(earth).Name);
```

```solution
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.FartherOf(earth).Name);

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

    public Planet FartherOf(Planet other)
    {
        if (IsFartherThan(other))
        {
            return this;
        }
        return other;
    }
}
---
It prints `Mars`. The solution writes `Planet` again, below its program
*(rule 4)*, and C# uses this one in place of the class above.
```

The class has a slip in it, so the program is meant not to compile. Run
it, and read the message. Which line do you change, and to what?

<details class="dl-answer"><summary>answer</summary>

Line 19 of `Planet.cs`, the class cell: `IsFartherThan()` needs the other planet, as
`IsFartherThan(other)`. The message, `error CS7036: There is no argument
given that corresponds to the required parameter 'other' of
'Planet.IsFartherThan(Planet)'`, names the parameter that has no value,
and the method it belongs to. In Python, this mistake stopped the
program with an exception, only when the line ran. C# finds it before
anything runs. With the fix, the program prints `Mars`.

The message changes when a method has overloads. Before you fix the
slip, can you add the lesson's second `IsFartherThan`, the one that takes
a `double`, to the class? What does the compiler say now, and why?

</details>

## 11. From earlier: which move?

From [Inside a method: sequence, selection and iteration in a class](lesson:the-moves-you-already-know).
Here is another way to write `MoonCount`:

```csharp
public int MoonCount()
{
    int count = 0;
    foreach (string moon in _moons)
    {
        count = count + 1;
    }
    return count;
}
```

Which move is each of these lines: storing, sequence, selection or
iteration? And which move is not in the method at all?

- `int count = 0;`
- `foreach (string moon in _moons)`
- `count = count + 1;`

<details class="dl-answer"><summary>why</summary>

- `int count = 0;` is storing.
- `foreach (string moon in _moons)` is iteration.
- `count = count + 1;` is storing too.

There is no selection: nothing is chosen, because every moon counts. The
method stores a starting count, and repeats a step for each moon.
`_moons.Count` gives the same answer in one line.

</details>
