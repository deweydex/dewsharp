---
title: "Encapsulation: private fields, public methods and properties"
version: 2026.09.28.1
from: keeping-details-inside-an-object
worlds:
  solar-system: A solar system, with planets, moons and the probes sent to them.
  game: A game world, with characters, the things they carry, and rooms.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO3, FOOP-LO4]
---

# Encapsulation: private fields, public methods and properties

Juno is a space probe with 100 kg of fuel. Here is its class, `Probe`,
with a rule inside `Burn`: the probe refuses a burn that needs more fuel
than it has. The class is in the first cell, and the program in the
second cell uses it *(rule 2: a class written in a cell can be used by the
cells below it)*.

The program tells Juno to burn 150 kg, and then 30 kg. How much fuel is
left at the end?

```csharp exec
id: keeping-details-to-itself-1
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
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

```csharp exec
id: keeping-details-to-itself-1-program
var juno = new Probe("Juno", 100);
juno.Burn(150);
juno.Burn(30);
Console.WriteLine(juno.Fuel);
```

```predict
type: choice

What will the last line print?

- 70
  - The first burn is refused, and the second one happens.
- -80
  - Both burns happen.
- 0
  - The first burn uses all the fuel, and the second is refused.
```

It prints the refusal, then `70`. The first burn needs more fuel than Juno
has, so `Burn` refuses it and changes nothing. `return;`, with no value
after it, ends a `void` method immediately, so the line that changes
`Fuel` never runs. The second burn happens.

## One place for the rules

Every burn uses one method, `Burn`, so that method is the place for the
rule. The check is not copied into every line of the program that burns
fuel. Any code that calls `Burn` gets the check, whether its writer
remembered the rule or not.

This idea has a name. *Encapsulation* means keeping an object's data
inside the object, so that only the object's own methods change it. Code
outside the class asks the object to make a change, and the object's
methods decide how. The rules about the data then live in one place, next
to the data itself.

But the other methods need rules too. Here is `Probe` again, with a second
method, `Refuel`, which adds fuel *(rule 4: a class written again further
down replaces the earlier one)*. What does `Refuel(-150)` do to this
probe? Run the program and see.

Can you make `Refuel` refuse a negative number of kilograms, as `Burn`
refuses a burn that is too big? Change the class in the first cell, and
then run the program in the second cell again. The program makes its own
Juno *(rule 3: variables stay in their cell)*.

```csharp exec
id: keeping-details-to-itself-2
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
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
```

```csharp exec
id: keeping-details-to-itself-2-program
var juno = new Probe("Juno", 100);
juno.Refuel(-150);
Console.WriteLine(juno.Fuel);
```

```inputs
juno.Fuel
```

```hint
after: 2 runs
What shape does the check in `Burn` have? An `if`, a message, and
`return;`. What is the condition this time? And where must the check go,
so that `return;` ends the method before `Fuel` changes?
```

```solution
var juno = new Probe("Juno", 100);
juno.Refuel(-150);
Console.WriteLine(juno.Fuel);

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
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        if (kg < 0)
        {
            Console.WriteLine("Refused: a refuel cannot be negative.");
            return;
        }
        Fuel = Fuel + kg;
    }
}
---
It prints the refusal, then `100`. Without the check, a refuel of −150 kg
left Juno with −50 kg, less than an empty tank, and the rule in `Burn`
never checked it. The solution writes `Probe` again, below its program
*(rule 4)*, and C# uses this one in place of yours. In one file, C# wants
the statements first and the classes after them.

Can a program change the fuel in some other way, where neither rule
checks it?
```

## Changing a field from outside

The rule in `Burn` works when code calls `Burn`. But does C# make code
call it? `Fuel` is a public field, so a program can change it with `=`,
as it changes any variable. With the `Probe` above, what does this
program print? Run it and see.

```csharp exec
id: reaching-in-from-outside-1
var juno = new Probe("Juno", 100);
juno.Burn(150);               // through the method: refused
juno.Fuel = juno.Fuel - 150;  // to the field directly: nothing checks it
Console.WriteLine(juno.Fuel);
```

It prints the refusal, then `-50`. The method refused the burn, but the
next line changed the field directly, and nothing stopped it. The word
`public` in front of `Fuel` allows that: any code, anywhere in the
program, can read and change a public field.

C# can lock a field, so that only the class's own methods can use it. The
word for the lock is `private`. A *private* field is one that only the
code inside its own class can read or change. `public` and `private` are
*access modifiers*: words in front of a field, a method or a class that
say which code can use it. C# has a few more, such as `protected`, which a
later page meets, with inheritance. A field or a method with no access
modifier in front of it is private.

Here is the probe again, with its fuel made private. It has only `Burn`,
to keep it short. The field has a new name, `_fuel`. C# programmers write
the name of a private field with a small first letter and an underscore
in front. That is a *convention*: a habit that programmers agree to
follow. The compiler does not check it. It shows a person who reads the
code that the field is private. The word `private` is what the compiler
checks. (In Python, the underscore is the only sign, and nothing stops
code that ignores it. In C#, `private` is the lock, and the underscore is
the sign.)

Code outside the class can no longer read `_fuel`, so the class has a
method that reads it for that code: `GetFuel()`. A *getter* is a method
that returns the value of a private field, so that code outside the class
can read the value without changing it.

```csharp exec
id: reaching-in-from-outside-2
file: Probe.cs
class Probe
{
    public string Name;
    private int _fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        _fuel = fuel;
    }

    public int GetFuel()
    {
        return _fuel;
    }

    public void Burn(int kg)
    {
        if (kg > _fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        _fuel = _fuel - kg;
    }
}
```

This `Probe` replaces the earlier one for the cells below it *(rule 4)*.
Here Juno burns 60 kg, and then 60 kg again. What does the program print?

```csharp exec
id: reaching-in-from-outside-2-program
var juno = new Probe("Juno", 100);
juno.Burn(60);
juno.Burn(60);
Console.WriteLine(juno.GetFuel());
```

The first burn happens, the second is refused, and it prints `40`. Code
outside the class now reads the fuel with `GetFuel()`, and changes it only
with `Burn`.

What happens now to the program that changed the fuel from outside? The
next cell tries the same thing, with `_fuel`. It is meant to fail. Run it,
and read the first message.

```csharp exec
id: reaching-in-from-outside-3
expect: CS0122
var juno = new Probe("Juno", 100);
juno.Burn(150);
juno._fuel = juno._fuel - 150;
Console.WriteLine(juno.GetFuel());
```

It does not compile: `error CS0122: 'Probe._fuel' is inaccessible due to
its protection level`, on line 3. *Inaccessible* means that this code is
not allowed to use it. Line 3 uses `_fuel` twice, so the message comes
twice. The compiler checks the whole program before it runs any of it, so
nothing ran, not even the first burn.

### A property: C#'s own way to read a private value

Many languages use a getter like `GetFuel()`. C# has its own way, a
property. A *property* is how C# lets code outside a class read or change
a value that the class guards. Code outside the class uses a property as
if it were a field, but the class decides who may read it and who may
change it. Here is the probe with a property, `Fuel`, in the place of the
private field and the getter:

```csharp exec
id: reaching-in-from-outside-4
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

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

The line `public int Fuel { get; private set; }` has three parts:

- `public int Fuel` is a property of type `int`, which code anywhere can
  see.
- `get` is the part that reads the value. It has no access modifier of its
  own, so it is public, like the property.
- `private set` is the part that changes the value. It is private, so only
  `Probe`'s own methods can change `Fuel`.

C# keeps the value in a hidden private field, which it makes for you. A
property like this one, with only `get` and `set` between its braces, is
an *automatic property*. Microsoft's pages call it an *automatically
implemented property*.

```csharp exec
id: reaching-in-from-outside-4-program
var juno = new Probe("Juno", 100);
juno.Burn(60);
juno.Burn(60);
Console.WriteLine(juno.Fuel);
```

It prints the refusal and `40`, as the program with the getter did. The
program reads `juno.Fuel` as if it were a field, and inside the class,
`Burn` changes `Fuel` as if it were a field. But the program cannot change
it. Can you add the line `juno.Fuel = 600;` to the program? What does the
compiler say about it?

This is the usual shape of a class in C#: the data is private, and code
outside the class uses the public methods and properties.

### Your turn: your class, second version

This is the second version of the class you started in
[Classes and objects](lesson:objects-and-classes): one rule, kept by a
method, and the field it protects made private, with a property that code
outside the class can read.

Each task has two cells: a class to change in the first, and a program
that uses it in the second. Change the class, and then run the program.

<div class="dl-world" data-world="game">

A hit of −5 heals Ada. Can you make `TakeDamage` refuse a negative
amount, and change `Health` into a property that code outside the class
can read but not change?

The first cell holds the first version of `Character`, from the last task
on [Classes and objects](lesson:objects-and-classes).

```csharp exec
id: your-class-2--game
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
id: your-class-2-program--game
var ada = new Character("Ada", 10);
ada.TakeDamage(-5);
Console.WriteLine(ada);
```

```inputs
ada.ToString()
ada.Health
```

```hint
after: 2 runs
Which two things need to change? First the check, at the top of
`TakeDamage`: what is the condition? Then the line `public int Health;`:
what does it become, so that code outside the class can read `Health`,
but only the class can change it?
```

```solution
var ada = new Character("Ada", 10);
ada.TakeDamage(-5);
Console.WriteLine(ada);

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
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
---
It prints the refusal, then `Ada (health 10)`. The solution writes
`Character` again, below its program *(rule 4)*. Apart from the check,
only one line changed: `public int Health;` became `public int Health {
get; private set; }`. Every other line in the class still says `Health`,
and still works, because inside the class the property can be read and
changed as the field was. `Heal` has no check yet: what would
`ada.Heal(-50)` do? And `Name` is still a public field. Should code
outside the class be able to change a character's name?
```

</div>

<div class="dl-world" data-world="solar-system">

Voyager has 70 kg of fuel left and is told to burn 80. It burns what it
has, and nothing says so. Can you make `Burn` refuse a burn bigger than
the fuel that is left, and change `Fuel` into a property that code
outside the class can read but not change?

The first cell holds the first version of `Probe`, from the last task on
[Classes and objects](lesson:objects-and-classes). It replaces the probe
from higher on this page *(rule 4)*.

```csharp exec
id: your-class-2--solar-system
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
```

```csharp exec
id: your-class-2-program--solar-system
var voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Burn(80);
Console.WriteLine(voyager);
```

```inputs
voyager.ToString()
voyager.Fuel
```

```hint
after: 2 runs
Which two things need to change? First the check, at the top of `Burn`:
when should it refuse? Then the line `public int Fuel;`: what does it
become, so that code outside the class can read `Fuel`, but only the
class can change it?
```

```solution
var voyager = new Probe("Voyager", 100);
voyager.Burn(30);
voyager.Burn(80);
Console.WriteLine(voyager);

class Probe
{
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

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}
---
It prints the refusal, then `Voyager (fuel 70 kg)`. The solution writes
`Probe` again, below its program *(rule 4)*. Now that `Burn` checks first,
`Math.Max(0, ...)` is no longer needed, so the burn is a plain
subtraction. Apart from `Burn`, only one line changed: `public int Fuel;`
became `public int Fuel { get; private set; }`. What would
`voyager.Burn(-50)` do to this version?
```

</div>

<div class="dl-world" data-world="your-own">

Which rule does your world have that your class does not keep yet? A
shop's stock cannot go below zero. A creature cannot run faster than its
top speed. Can you keep the rule in a method, make the field it protects
private, and let code outside the class read it with a property?

Your class from [Classes and objects](lesson:objects-and-classes) is saved
in that page's last cell. Copy it into the first cell here to start, and
write a program that uses it in the second.

```csharp exec
id: your-class-2--your-own
// My class, second version: one rule, kept by a method, and a property.
```

```csharp exec
id: your-class-2-program--your-own
// My program: an object made from my class, and a call that the rule refuses.
```

</div>

## What a caller needs to know

A *caller* is any code that uses an object's methods and properties, such
as `juno.Burn(60)` and `juno.Fuel`.

*Abstraction* is the other half of encapsulation, seen from the caller's
side. Abstraction means that a caller uses what a method does, without
needing to know how it does it. `juno.Burn(60)` tells you what will
happen: the probe burns 60 kg, or it refuses. You do not need to know how
the fuel is stored, or that an `if` guards it.

That gives the class's writer freedom: the inside of the class can change,
and its callers never notice. Here is a reason to change it. Juno carries
a spare tank with 1 kg of fuel, for small changes to its path. Each small
burn uses 0.1 kg. After 10 small burns, is the tank empty?

```csharp exec
id: what-a-caller-needs-to-know-1
file: FuelTank.cs
class FuelTank
{
    public double Kilograms { get; private set; }

    public FuelTank(double kilograms)
    {
        Kilograms = kilograms;
    }

    public void Use(double amount)
    {
        Kilograms = Kilograms - amount;
    }

    public bool IsEmpty()
    {
        return Kilograms == 0;
    }
}
```

```csharp exec
id: what-a-caller-needs-to-know-1-program
var spare = new FuelTank(1.0);
for (int i = 0; i < 10; i++)
{
    spare.Use(0.1);
}
Console.WriteLine(spare.Kilograms);
Console.WriteLine(spare.IsEmpty());
```

```predict
type: choice

What will the last line print?

- False
  - Something is left in the tank after 10 burns.
- True
  - Ten burns of 0.1 kg use 1 kg.
```

It prints `1.3877787807814457E-16`, then `False`. `E-16` means "times ten
to the power of −16": the decimal point moves 16 places to the left. So
that first number is very nearly 0, but it is not 0. A `double` keeps a
number in binary, with only the digits 0 and 1, and 0.1 has no exact
binary form, in the same way that ⅓ has no exact decimal form (0.3333…).
So the tank keeps a number very close to 0.1, and each `Use` adds a tiny
error. Ten of them leave a tank that is never quite empty.

A whole number is stored exactly. So the tank below keeps its fuel in
whole grams, in a private field, `_grams`. The constructor and `Use`
change kilograms to grams, and the property `Kilograms` changes grams to
kilograms. `Math.Round` gives the nearest whole number, and `(int)`
changes it into an `int`.

`Kilograms` is still a property, but now its `get` has a body, like a
method. It calculates the kilograms from the grams each time code reads
it. A property can do that, and a field cannot.

```csharp exec
id: what-a-caller-needs-to-know-2
file: FuelTank.cs
class FuelTank
{
    private int _grams;

    public FuelTank(double kilograms)
    {
        _grams = (int)Math.Round(kilograms * 1000);
    }

    public double Kilograms
    {
        get
        {
            return _grams / 1000.0;   // 1000.0, so that the fraction is kept
        }
    }

    public void Use(double amount)
    {
        _grams = _grams - (int)Math.Round(amount * 1000);
    }

    public bool IsEmpty()
    {
        return _grams == 0;
    }
}
```

Compare the program below with the program above it. It is the same
program, run with the new `FuelTank` *(rule 4)*.

```csharp exec
id: what-a-caller-needs-to-know-2-program
var spare = new FuelTank(1.0);
for (int i = 0; i < 10; i++)
{
    spare.Use(0.1);
}
Console.WriteLine(spare.Kilograms);
Console.WriteLine(spare.IsEmpty());
```

```predict
type: choice

The inside of `FuelTank` changed. Which of the program's lines stops
compiling?

- None of them
  - The program uses only `Use`, `Kilograms` and `IsEmpty`, and the new class still has all three.
- `Console.WriteLine(spare.Kilograms);`
  - The class keeps grams now, not kilograms.
- `spare.Use(0.1);`
  - `Use` works in grams now.
```

None of them, and now it prints `0` and `True`. The way the fuel is stored
is completely different. But the program used only the public methods and
the property, so it did not need to change.

C# has a second way to keep 0.1 exactly: the type `decimal`. A `decimal`
keeps a number with the digits 0 to 9, as we write numbers on paper, so
0.1 has an exact form. C# programs use it for money. It needs more memory
than a `double`, and arithmetic with it is slower, so a `double` is still
the usual choice for measurements.

Here is the tank a third time, with its fuel in a private `decimal`.
`(decimal)` changes a `double` into a `decimal`, and `(double)` changes a
`decimal` into a `double`. When `(decimal)` changes the `double` 0.1, the
result is exactly 0.1. What will the same program print this time?

```csharp exec
id: what-a-caller-needs-to-know-3
file: FuelTank.cs
class FuelTank
{
    private decimal _kilograms;

    public FuelTank(double kilograms)
    {
        _kilograms = (decimal)kilograms;
    }

    public double Kilograms
    {
        get
        {
            return (double)_kilograms;
        }
    }

    public void Use(double amount)
    {
        _kilograms = _kilograms - (decimal)amount;
    }

    public bool IsEmpty()
    {
        return _kilograms == 0;
    }
}
```

```csharp exec
id: what-a-caller-needs-to-know-3-program
var spare = new FuelTank(1.0);
for (int i = 0; i < 10; i++)
{
    spare.Use(0.1);
}
Console.WriteLine(spare.Kilograms);
Console.WriteLine(spare.IsEmpty());
```

It prints `0` and `True` again. There are three different insides, and
the program is the same for all three. That is what encapsulation and
abstraction protect. In Python, a caller could still use a private field
such as `_grams`, and that caller would stop working when the field
changed. In C#, the compiler refuses such a line from the start, so no
caller can depend on how the class keeps its data.

## Looking back

In C#, the compiler checks `private`, and nothing checks the underscore in
`_fuel`. So what is each one for, and who is it for?

A challenge: a health bar that starts full at `1.0` has the same problem
as the spare tank. Ten hits of `0.1` do not bring Ada's health to 0.
Can you change the inside of the class so that it keeps whole hit points,
100 for a full bar, or a `decimal`, without changing the six lines above
the class? In one file, C# wants the statements first and the classes
after them, so the class comes last here.

```csharp challenge
var ada = new Character("Ada");
for (int i = 0; i < 10; i++)
{
    ada.TakeDamage(0.1);
}
Console.WriteLine($"{ada.Health} {ada.IsDown()}");

class Character
{
    public string Name;
    public double Health { get; private set; }

    public Character(string name)
    {
        Name = name;
        Health = 1.0;   // a full health bar
    }

    public void TakeDamage(double fraction)
    {
        Health = Math.Max(0, Health - fraction);
    }

    public bool IsDown()
    {
        return Health == 0;
    }
}
```

Everything on this page runs here, on the page, and nothing in it needs
Visual Studio. Any program cell can be downloaded as a Visual Studio
project, and it prints the same there. In Visual Studio, the list that
appears when you type `juno` and a dot shows only what code outside the
class may use, so a private field is not in it.

The [practice page](lesson:keeping-details-inside-an-object-practice) has
more problems on private fields, methods and properties, and three from
earlier pages. After it,
[Methods and overloading: giving one class more to do](lesson:one-class-many-methods)
gives a class more methods, and keeps its rules working as it grows.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Access Modifiers*. C# programming guide.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers>.
This page lists every access modifier in C#, including the ones this page
leaves for later, and says what each one allows.

Microsoft. *Properties*. C# programming guide.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties>.
This page shows automatic properties, properties with a body in `get` and
`set`, and a `set` that checks a value before it stores it.

Microsoft. *Floating-point numeric types*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types>.
This page compares `float`, `double` and `decimal`, and says why 0.1 is
exact in a `decimal` and not in a `double`.
