---
title: "Encapsulation: practice"
version: 2026.09.28.1
from: keeping-details-inside-an-object-practice
practice_for: keeping-details-inside-an-object
---

# Encapsulation: practice

This page has problems on private fields, public methods and properties,
and three from earlier pages. Try each problem before you open anything
under it, and run the cells to test your guesses.

Some cells on this page are meant to fail. When one of them does not
compile, or stops with an exception, nothing is broken: the message is
part of the answer. The cells follow the rules of the road from the
lesson: a class written in a cell can be used by the cells below it, and
variables stay in their cell.

## 1. A line that skips the rule

Voyager has 70 kg of fuel, and its fuel is a property with a private
`set`.

```csharp exec
id: around-the-rule-1
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

```csharp exec
id: around-the-rule-1-program
expect: CS0272
var voyager = new Probe("Voyager", 70);
voyager.Burn(80);
voyager.Fuel = voyager.Fuel - 80;
Console.WriteLine(voyager.Fuel);
```

```predict
type: choice

What happens when you run the program?

- It prints the refusal, then -10
  - The third line changes `Fuel` without the rule in `Burn`.
- It prints the refusal, then 70
  - The rule in `Burn` keeps the fuel safe.
- It does not compile
  - Only `Probe`'s own methods can change `Fuel`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0272: The property or indexer 'Probe.Fuel'
cannot be used in this context because the set accessor is inaccessible`,
on line 3. Nothing runs, not even the first burn. An *accessor* is C#'s
name for the `get` or the `set` part of a property. The `get` of `Fuel` is
public, so the program can read `voyager.Fuel`. Its `set` is private, so
only the code inside `Probe` can change it. In Python, the same line would
run, and nothing would check it.

</details>

## 2. Room for four

The lander Selene has room for 4 crew. Can you make `Board` refuse anyone
once there are already 4 on board?

```csharp exec
id: room-for-four-1
file: Lander.cs
class Lander
{
    public string Name;
    private List<string> _crew = new List<string>();

    public Lander(string name)
    {
        Name = name;
    }

    public string CrewNames()
    {
        return string.Join(", ", _crew);
    }

    public void Board(string person)
    {
        _crew.Add(person);
    }
}
```

```csharp exec
id: room-for-four-1-program
var selene = new Lander("Selene");
foreach (string person in new List<string> { "Ada", "Grace", "Alan", "Katherine", "Mary" })
{
    selene.Board(person);
}
Console.WriteLine(selene.CrewNames());
```

```inputs
selene.CrewNames()
```

```hint
after: 2 runs
How many people are on board when `Board` should refuse? `_crew.Count`
gives the number of names in the list.
```

```solution
var selene = new Lander("Selene");
foreach (string person in new List<string> { "Ada", "Grace", "Alan", "Katherine", "Mary" })
{
    selene.Board(person);
}
Console.WriteLine(selene.CrewNames());

class Lander
{
    public string Name;
    private List<string> _crew = new List<string>();

    public Lander(string name)
    {
        Name = name;
    }

    public string CrewNames()
    {
        return string.Join(", ", _crew);
    }

    public void Board(string person)
    {
        if (_crew.Count >= 4)
        {
            Console.WriteLine($"Refused: {Name} has room for 4.");
            return;
        }
        _crew.Add(person);
    }
}
---
It prints one refusal, for Mary, and then the four names before hers.
`>= 4` refuses the fifth person: with 4 on board, there is no room. The
list is private, so `Board` is the only way onto the lander, and the rule
in it checks every person.
```

## 3. The heating

A thermostat keeps a room between 5 and 30 degrees. This time,
`Temperature` is a property whose `set` has a body.

```csharp exec
id: the-heating-1
file: Thermostat.cs
class Thermostat
{
    private int _temperature;

    public Thermostat(int temperature)
    {
        _temperature = temperature;
    }

    public int Temperature
    {
        get
        {
            return _temperature;
        }
        set
        {
            if (value < 5 || value > 30)
            {
                Console.WriteLine("Refused: choose 5 to 30 degrees.");
                return;
            }
            _temperature = value;
        }
    }
}
```

```csharp exec
id: the-heating-1-program
var heating = new Thermostat(20);
heating.Temperature = 35;
heating.Temperature = 22;
Console.WriteLine(heating.Temperature);
```

Before you run it: what will the program print? The line
`heating.Temperature = 35;` looks like a line that changes a value from
outside the class. On the lesson page, `juno.Fuel = 600;` did not
compile. Why does this line compile, and does it skip the rule?

<details class="dl-answer"><summary>answer</summary>

`Refused: choose 5 to 30 degrees.`, then `22`.

`Temperature` is a property, and this time its `set` is public, with a
check inside it. A `set` can hold code, as a method can. Inside a `set`,
`value` is C#'s name for the value on the right of the `=`. So
`heating.Temperature = 35;` runs the `set` with `value` equal to 35, and
the check refuses it. `juno.Fuel = 600;` did not compile because the `set`
of `Fuel` was private.

A line that looks like it stores a value can run a rule, if the class
makes the value a property. The callers write `=`, and the class still
decides.

</details>

## 4. Which are private?

Which of these fields and methods can code outside `Station` use?

```csharp exec
id: which-are-private-1
file: Station.cs
class Station
{
    public string Name;
    private int _oxygen;
    int _alarms;
    public int _checks;

    public Station(string name)
    {
        Name = name;
        _oxygen = 80;
        _alarms = 0;
        _checks = 3;
    }

    public int GetOxygen()
    {
        return _oxygen;
    }

    public bool HasAlarms()
    {
        return _alarms > 0;
    }
}
```

Decide for each line of the program below. Then run it to test your
answers: the compiler names every line that it refuses.

```csharp exec
id: which-are-private-1-program
expect: CS0122
var station = new Station("Lumen");
Console.WriteLine(station.Name);
Console.WriteLine(station._oxygen);
Console.WriteLine(station.GetOxygen());
Console.WriteLine(station._alarms);
Console.WriteLine(station._checks);
```

<details class="dl-answer"><summary>answer</summary>

The compiler refuses line 3, `station._oxygen`, and line 5,
`station._alarms`, both with `error CS0122`. The other four lines are
allowed.

- `_oxygen` is private, because `private` says so.
- `_alarms` is private too: a field with no access modifier in front of
  it is private.
- `_checks` starts with an underscore, but it is public. The compiler
  reads the word `public`, not the name. The underscore is a convention
  for private fields, so this name tells a reader something that is not
  true.
- `Name` and `GetOxygen()` are public, so that other code can use them.

</details>

## 5. Enough for the trip

The spare tank from the lesson page keeps whole grams. `HasEnough` says
whether the tank holds enough fuel for a trip.

```csharp exec
id: enough-for-the-trip-1
file: FuelTank.cs
class FuelTank
{
    private int _grams;

    public FuelTank(double kilograms)
    {
        _grams = (int)Math.Round(kilograms * 1000);
    }

    public bool HasEnough(double kilograms)
    {
        return (int)Math.Round(kilograms * 1000) <= _grams;
    }
}
```

```csharp exec
id: enough-for-the-trip-1-program
var spare = new FuelTank(1.0);
Console.WriteLine(spare.HasEnough(0.999));
Console.WriteLine(spare.HasEnough(1.001));
Console.WriteLine(spare.HasEnough(1.0));
```

```predict
type: choice

What will the last line print?

- True
  - Exactly 1 kg is 1000 g, and `<=` allows equal.
- False
  - Using all of the fuel leaves nothing, so it is not enough.
```

<details class="dl-answer"><summary>why</summary>

`True`, `False`, `True`. The tank keeps its 1 kg as whole grams, and
`HasEnough` changes the trip's kilograms into whole grams too. So it
compares two whole numbers, with no tiny errors. A trip of 0.999 kg needs
less than the tank holds, so `True`. A trip of 1.001 kg needs more, so
`False`. A trip of 1.0 kg needs exactly what the tank holds, and `<=`
allows equal, so `True`.

</details>

## 6. A change the callers never see

A caller writes `Console.WriteLine(spare.Kilograms);` for the tank on the
lesson page. Later, the class's writer changes the class so that it
keeps a `double` again, as the first tank did. Does the caller's line need
to change?

And what if the class's writer had made the field public, as
`public int _grams;`, and a caller had written
`Console.WriteLine(spare._grams / 1000.0);`?

<details class="dl-answer"><summary>answer</summary>

`Console.WriteLine(spare.Kilograms);` does not need to change. The class's
writer changes the property `Kilograms` so that it gives the `double`, and
every caller gets the new version.

`Console.WriteLine(spare._grams / 1000.0);` stops compiling, because the
class has no `_grams` any more. The compiler finds every line like it
before anything runs. In Python, such a line stops only when it runs. But
every one of those lines has to change. When `_grams` is private, the
compiler refuses that line from the start, so no caller can depend on it.

</details>

## 7. Two ideas, one class

Encapsulation and abstraction usually appear together. Are they two names
for one idea, or two ideas?

<details class="dl-answer"><summary>one answer</summary>

They are two ideas, seen from two sides. Encapsulation is about where the
data and its rules live: inside the object, where only the class's own
methods change the data. Abstraction is about what a caller has to know:
what `juno.Burn(60)` does, not the `if` inside it. When the data is
private, a caller needs to see only the public methods and properties.

</details>

## 8. From earlier: storing on the object

From [Inside a method](lesson:the-moves-you-already-know). This probe
should count the burns it refuses. What will the last line print?

```csharp exec
id: from-earlier-storing-on-the-object-1
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public int Refusals { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
        Refusals = 0;
    }

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            int refusals = Refusals + 1;
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

```csharp exec
id: from-earlier-storing-on-the-object-1-program
var juno = new Probe("Juno", 100);
juno.Burn(150);
juno.Burn(200);
Console.WriteLine(juno.Refusals);
```

```predict
type: choice

What will the last line print?

- 0
  - `refusals` is a variable of the method, so the property `Refusals` never changes.
- 2
  - Both burns were refused, and each one counted.
```

<details class="dl-answer"><summary>why</summary>

`0`. The count was stored in `refusals`, a local variable of `Burn`, which
is gone when the method ends. The line that stores the count on the object
is `Refusals = Refusals + 1;`, with no type in front of it. `Refusals` is
a property with a private `set`, so `Burn`, inside the class, can change
it, and the program can only read it.

</details>

## 9. From earlier: a list that was never made

From [Visual Studio](lesson:the-tools-around-your-code). This lander keeps
its crew in a private list.

```csharp exec
id: from-earlier-a-list-that-was-never-made-1
file: Lander.cs
class Lander
{
    public string Name;
    private List<string> _crew;

    public Lander(string name)
    {
        Name = name;
    }

    public void Board(string person)
    {
        _crew.Add(person);
    }

    public int CrewCount()
    {
        return _crew.Count;
    }
}
```

The program stops with an exception, on purpose. Which line does the
exception name? Is the mistake on that line? The compiler also gave a
warning before the program ran: what does it say?

```csharp exec
id: from-earlier-a-list-that-was-never-made-1-program
expect: exception
var selene = new Lander("Selene");
selene.Board("Ada");
Console.WriteLine(selene.CrewCount());
```

<details class="dl-answer"><summary>answer</summary>

It stops with a `NullReferenceException`: `Object reference not set to an
instance of an object.` The line it names is line 13 of `Lander.cs`,
`_crew.Add(person);`, inside `Board`. The mistake is not on that line. The
field `_crew` was never given a list, so it holds `null`, which means no
object at all, and a list that does not exist cannot add a name. The
warning said so before anything ran: `warning CS0649: Field
'Lander._crew' is never assigned to, and will always have its default
value null`.

Making a field private stops other code from using it, but it does not
make the list.

</details>

To give each lander a list of its own when it is made, the field's line
becomes `private List<string> _crew = new List<string>();`. Here is the
class with that one change. What does the program under it print?

```csharp exec
id: from-earlier-a-list-that-was-never-made-2
file: Lander.cs
class Lander
{
    public string Name;
    private List<string> _crew = new List<string>();

    public Lander(string name)
    {
        Name = name;
    }

    public void Board(string person)
    {
        _crew.Add(person);
    }

    public int CrewCount()
    {
        return _crew.Count;
    }
}
```

```csharp exec
id: from-earlier-a-list-that-was-never-made-2-program
var selene = new Lander("Selene");
selene.Board("Ada");
Console.WriteLine(selene.CrewCount());
```

It prints `1`, and there is no warning. This `Lander` replaces the one
above it for the cells below it, so the warning is gone from them too.

## 10. From earlier: printed, not returned

From [Classes and objects](lesson:objects-and-classes).

```csharp exec
id: from-earlier-printed-not-returned-2
expect: CS0161
file: Character.cs
class Character
{
    public string Name;

    public Character(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        Console.WriteLine(Name);
    }
}
```

```csharp exec
id: from-earlier-printed-not-returned-2-program
expect: CS0161
var ada = new Character("Ada");
Console.WriteLine(ada);
```

```predict
type: choice

What happens when you run the program?

- It prints `Ada`
  - `ToString` shows the name.
- It prints `Ada` twice
  - `ToString` prints once, and `Console.WriteLine` prints again.
- It does not compile
  - `ToString` has to return text, and this one returns nothing.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0161: 'Character.ToString()': not all code
paths return a value`, on line 10 of `Character.cs`. The message is about
the class in the cell above, so the class cell and the program both show
it. `string` in front of `ToString` says that it returns text. This one
prints the name and returns nothing. C# finds this before anything runs,
so nothing is printed. Write `return Name;`, and let `Console.WriteLine`
do the printing.

</details>
