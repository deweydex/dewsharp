---
title: "Testing a class: hunting for the bug"
version: 2026.09.27.1
from: testing-what-a-class-does
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO10, FOOP-LO4]
---

# Testing a class: hunting for the bug

Here are five versions of a space probe. Each one has a tank that holds
100 kg of fuel, a way to burn fuel, and a way to refuel. Four of them have
a bug each. One seems to have none. Which is which?

The cell starts with an *interface*, `IProbe`. As on *Interfaces*, an
interface is a list of the properties and methods that a class promises to
have. The comments in `IProbe` say what each one promises. Then come five
classes, `ProbeA` to `ProbeE`, and each one keeps the promises of
`IProbe`. At the bottom, `Suspects.All()` makes one probe of each class,
each with a full tank.

```csharp exec
id: five-suspects-1
file: Suspects.cs
interface IProbe
{
    string Name { get; }
    int Fuel { get; }         // in kg: never below 0, never above 100
    bool CanBurn(int kg);     // true when there is enough fuel for the burn
    void Burn(int kg);        // a burn that it cannot do changes nothing
    void Refuel(int kg);      // fills the tank, but never past 100 kg
}

class ProbeA : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeA(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg < Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(100, Fuel + kg);
    }
}

class ProbeB : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeB(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(100, Fuel + kg);
    }
}

class ProbeC : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeC(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(100, Fuel + kg);
    }
}

class ProbeD : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeD(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= 100;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(100, Fuel + kg);
    }
}

class ProbeE : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeE(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Fuel + kg;
    }
}

static class Suspects
{
    // A new list each time, so that no test changes the probes of another.
    public static List<IProbe> All()
    {
        return new List<IProbe>
        {
            new ProbeA("Probe A", 100),
            new ProbeB("Probe B", 100),
            new ProbeC("Probe C", 100),
            new ProbeD("Probe D", 100),
            new ProbeE("Probe E", 100)
        };
    }
}
```

You could read all five closely, line by line, and find the differences.
But a real class changes every week, and nobody reads it closely every
week. A test reads it for you, every time. On this page, tests find the
bugs. The suspects are the classes. Nothing about you is being checked.

## Five suspects

First, here is a tool for tests. `Test` is a `static` class, like `Math`: it holds
methods, and no objects are made from it. Its method `Check` takes a
*claim*, a short sentence that says what should be true, and then two
values: the value the claim expects, and the value the program found. When
the two are equal, `Check` does nothing. When they differ, it *throws* an
exception, as a skeleton's `NotImplementedException` did on *Designing
classes*. The method stops at that line, and the exception's message says
what was expected and what was found.

The `<T>` after `Check` lets it take two values of any one type, as a
`List<T>` holds values of any one type: two `int`s, two `bool`s or two
strings.

```csharp exec
id: five-suspects-check
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
}
```

Here is a first test. `TestProbe` burns 30 kg of a probe's fuel, and checks
what is left. It takes an `IProbe`, so it can test any of the five: whatever
its class, a probe keeps the promises of `IProbe`. The loop gives it each
suspect, one after another.

```csharp exec
id: five-suspects-2
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestProbe(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestProbe(IProbe probe)
{
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
}
```

```predict
type: number

How many of the five suspects will print `every check held`?
```

All five do. `try` and `catch` let the loop continue after a check that
does not hold. `try` runs the lines inside its braces. If one of them
throws an exception, the program jumps to `catch`, which prints the
exception's message. Then the loop continues with the next suspect, and
the program does not stop.

A *test* is code that uses a class and checks what it did. A test
*passes* when every check in it holds. One test that every suspect passes
tells us very little. The bugs are somewhere that a burn of 30 kg never
goes.

Can you add checks to `TestProbe`, so that four suspects print a message
and one prints `every check held`? Think about the edges of what a probe
does: a burn of exactly all the fuel that is left, a burn of a little more
than that, and a refuel past a full tank.

```csharp exec
id: five-suspects-3
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestProbe(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestProbe(IProbe probe)
{
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
    // More checks here
}
```

```hint
after: 2 runs
The tank holds 100 kg. After the burn of 30 kg, 70 kg are left. What
should a burn of 71 kg do? And then a burn of exactly 70 kg? What should
the fuel be after a refuel of 500 kg from there?
```

```solution
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestProbe(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestProbe(IProbe probe)
{
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
    probe.Burn(71);
    Test.Check("a burn of 1 kg more than is left changes nothing", 70, probe.Fuel);
    probe.Burn(70);
    Test.Check("a burn of all the fuel that is left is allowed", 0, probe.Fuel);
    probe.Refuel(500);
    Test.Check("a refuel stops at a full tank", 100, probe.Fuel);
}
---
Probe C holds every check. A refuses a burn of exactly all its fuel:
it found 70, where the claim expected 0. B burns what it has when it
should refuse, and found 0. D compares each burn with the size of the
tank, not with the fuel that is left, so a burn of 71 kg took its fuel to
-1. E fills past its tank, to 500 kg. Each bug shows at an edge: exactly
all the fuel (A), 1 kg more than is left (B and D), and past a full tank
(E).
```

Bugs often live at those edges. A *boundary* is the edge of what a method
allows: exactly at the limit, one step past it, zero, empty. A test at a
boundary finds more bugs than ten tests in the middle.

## Many small tests

One `TestProbe` that checks everything stops at its first check that does
not hold, and says nothing about the rest. Programmers usually write many
small tests instead: one for each promise, each with its own object. Then a
*test runner* runs them all, one after another, and reports every check
that did not hold.

Here is `Test` again, with a runner, `RunAll`, below `Check`. It replaces
the `Test` above, for the cells below it (rule 4: a class written again
further down replaces the earlier one).

```csharp exec
id: ten-lines-that-run-every-test-runner
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

`Action` is C#'s type for a method that has no parameters and returns
nothing. So a `List<Action>` is a list of methods, and `test();` calls
each one. The `catch` catches any exception, so a test that stops for
another reason, such as a `NullReferenceException`, is reported too, and
the tests after it still run.

Here are three tests for Probe C, and a list of them for `RunAll`. A
method's name without brackets, such as `ABurnUsesFuel`, is the method
itself, not a call to it.

```csharp exec
id: ten-lines-that-run-every-test-1
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    ABurnOfAllTheFuelIsAllowed,
    ARefuelStopsAtAFullTank
});

void ABurnUsesFuel()
{
    var probe = new ProbeC("Probe C", 100);
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
}

void ABurnOfAllTheFuelIsAllowed()
{
    var probe = new ProbeC("Probe C", 100);
    probe.Burn(100);
    Test.Check("a burn of all 100 kg is allowed", 0, probe.Fuel);
}

void ARefuelStopsAtAFullTank()
{
    var probe = new ProbeC("Probe C", 60);
    probe.Refuel(50);
    Test.Check("a refuel stops at a full tank", 100, probe.Fuel);
}
```

```predict
type: choice

What will the last line print?

- Tests run: 3. Passed: 3.
  - Probe C held every check in *Five suspects*.
- Tests run: 3. Passed: 1.
  - Two of the tests are at a boundary.
```

It prints `Tests run: 3. Passed: 3.` Change `ProbeC` to `ProbeA` in all
three tests, and run it again. Now one test does not pass, and the other
two still run, and still say so.

Most C# projects that have tests run them in this way, with a *test
framework* such as MSTest. A test framework finds every test in a project
by itself, runs each one, and reports which ones did not pass, and why.
`RunAll` is the same idea, small enough to read. The last part of this
page shows MSTest in Visual Studio.

## A test before the fix

Probe C passed every test so far. But on *Encapsulation*, a refuel of a
negative number of kilograms took fuel away from Juno, and you gave Juno's
`Refuel` a check. Does Probe C have one? A test is a good way to ask a
question when you suspect the answer. Write the test first, and run it
before you change anything.

Here is Probe C again. It replaces the one in the suspects' cell, for the
cells below it (rule 4).

```csharp exec
id: a-test-before-the-fix-1
file: ProbeC.cs
class ProbeC : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeC(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(100, Fuel + kg);
    }
}
```

The program has two tests: one from before, and a new one for the refuel.

```csharp exec
id: a-test-before-the-fix-1-program
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    ANegativeRefuelChangesNothing
});

void ABurnUsesFuel()
{
    var probe = new ProbeC("Probe C", 100);
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
}

void ANegativeRefuelChangesNothing()
{
    var probe = new ProbeC("Probe C", 70);
    probe.Refuel(-50);
    Test.Check("a refuel of -50 kg changes nothing", 70, probe.Fuel);
}
```

The new test does not pass. A refuel of −50 kg took 50 kg of fuel away,
from 70 kg to 20 kg, and nothing refused it. The test from before still
passes. Now the fix, in `Refuel`:

```csharp
    public void Refuel(int kg)
    {
        if (kg < 0)
        {
            return;    // a refuel never takes fuel away
        }
        Fuel = Math.Min(100, Fuel + kg);
    }
```

Can you make that change in the Probe C cell above, and run the tests
again? Now both pass. When you write the test first, it does two things.
It shows that the bug is real, and it shows that the fix made the test
pass, not a lucky run. And the test stays, so if the bug ever returns, a
test says so.

Probe C passed every test in *Five suspects*, and still had this bug. A
test can show that a bug is there. It cannot show that no bug is there.

## Close enough

A test can have a mistake in it, too. On *Encapsulation*, the spare tank's
first version kept its fuel in a `double`. Three uses of 0.1 kg from a full
1 kg leave 0.7 kg. What will the test say?

```csharp exec
id: close-enough-1
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
id: close-enough-1-program
Test.RunAll(new List<Action> { ThreeUsesLeaveSevenTenths });

void ThreeUsesLeaveSevenTenths()
{
    var spare = new FuelTank(1.0);
    spare.Use(0.1);
    spare.Use(0.1);
    spare.Use(0.1);
    Test.Check("three uses of 0.1 kg leave 0.7 kg", 0.7, spare.Kilograms);
}
```

```predict
type: choice

What will the last line print?

- Tests run: 1. Passed: 1.
  - 1 − 3 × 0.1 is 0.7.
- Tests run: 1. Passed: 0.
  - The spare tank on *Encapsulation* was never quite empty.
```

The test does not pass, but the tank is not the problem. The tank has
`0.7000000000000001` kg. A `double` keeps 0.1 very nearly, not exactly, so
two numbers that should be equal can differ in the sixteenth place after
the point. For a `double`, a test asks "close enough?":

```csharp
    Test.Check("three uses of 0.1 kg leave 0.7 kg, to within 0.001 kg", true, Math.Abs(spare.Kilograms - 0.7) < 0.001);
```

`Math.Abs` gives the size of a difference, without its sign. Can you change
the check in the test to this one, and run it again?

The other way changes the class, not the test. The spare tank's third
version on *Encapsulation* kept its fuel in a `decimal`, which keeps 0.1
exactly. With that tank, the first test passes as it is.

When a test does not pass, the first question is: is the mistake in the
code, or in the test?

## A stress test

Every test so far chose its numbers with care, one boundary at a time. A
*stress test* does the opposite. It gives a class many thousands of inputs
chosen at random, and it checks one rule after every step. It can find a
bug that nobody thought to test for.

The program below gives each suspect 100,000 random steps. Each step is a
burn or a refuel, of 0 to 120 kg. After every step, it checks a rule that
`IProbe` promises: the fuel is never below 0 kg, and never above 100 kg.

`new Random(42)` makes a random number generator. The 42 is its *seed*.
With the same seed, it gives the same numbers on every run, so a stress
test that finds a bug finds it again, at the same step. Each suspect makes
its own `Random` with the same seed, so each one gets the same numbers.
`random.Next(0, 121)` gives a whole number from 0 to 120: the second
number is never one of the results. `random.Next(2)` gives 0 or 1, so
about half of the steps are burns.

Which suspects do you think will break the rule?

```csharp exec
id: a-stress-test-1
foreach (IProbe probe in Suspects.All())
{
    Console.WriteLine($"{probe.Name}: {StressTest(probe)}");
}

string StressTest(IProbe probe)
{
    var random = new Random(42);
    for (int step = 1; step <= 100000; step++)
    {
        int kg = random.Next(0, 121);
        if (random.Next(2) == 0)
        {
            probe.Burn(kg);
        }
        else
        {
            probe.Refuel(kg);
        }
        if (probe.Fuel < 0 || probe.Fuel > 100)
        {
            return $"the rule broke at step {step}, with {probe.Fuel} kg";
        }
    }
    return "the rule held for all 100,000 steps";
}
```

Probe D breaks the rule at step 8, with −35 kg, and E at step 4, with 102
kg. A, B and C hold it for all 100,000 steps, and two of them have a bug. A
stress test checks one rule. It finds the bugs that break that rule, and
only those.

What rule would B break? B burns what it has, when it should refuse.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

After a burn, the fuel is what it was before, or exactly `kg` less. In the
loop, a burn becomes:

```csharp
            int before = probe.Fuel;
            probe.Burn(kg);
            if (probe.Fuel != before && probe.Fuel != before - kg)
            {
                return $"the burn rule broke at step {step}";
            }
```

B breaks this rule at step 8, at a burn that asks for more than is left.
The other four hold it for all 100,000 steps, D too: D always burns
exactly what it is asked to. Each rule finds different bugs. A stress test
with both rules finds B, D and E. Only a test at a boundary found A.

</details>

A stress test also finds only what its random numbers reach. Can you change
`random.Next(0, 121)` to `random.Next(-20, 121)`, and run it again? What
happens now?

<details class="dl-answer"><summary>what happens</summary>

All five break the rule, Probe C too, between step 4 and step 29. None of
the five refuses a negative number. A burn of −20 kg adds 20 kg to the
tank, and a refuel of −20 kg takes 20 kg away. So A and C go past 100 kg,
to 113 kg, and B goes below 0, to −13 kg. If you gave Probe C's `Refuel` a
check in *A test before the fix*, C still breaks the rule at the same step,
through `Burn`.

</details>

## Your turn: your class, sixth version

This is the sixth version of your class: five tests for it, with at least
one of them at a boundary. On *Encapsulation*, each world's class still had
one rule missing, and a question in the solution asked about it. Write the
test for that rule first, and run it: it should not pass. Then add the rule
in the class's cell, and run the tests again.

In your world, the first cells hold your classes as they stood at the end
of *Composition*. Your tests go in the last cell. Write each one as a
method, and add its name to the list for `Test.RunAll`, with a comma
between names. When you compare with a solution, the solution's tests run
against the solution's class.

<div class="dl-world" data-world="game">

The first three cells hold `Character` and `Healer`, the fourth version,
and `Room`, the fifth. What does `Heal(-50)` do to a character with 5
health?

```csharp exec
id: your-class-6--game
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
id: your-class-6-healer--game
file: Healer.cs
class Healer : Character
{
    // A healer is a character who can also heal someone else.

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

```csharp exec
id: your-class-6-room--game
file: Room.cs
class Room
{
    public string Name;
    private List<Character> _characters = new List<Character>();

    public Room(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return $"{Name}: {Standing().Count} standing";
    }

    public void Enter(Character character)
    {
        if (_characters.Contains(character))
        {
            Console.WriteLine($"Refused: {character.Name} is already in {Name}.");
            return;
        }
        _characters.Add(character);
    }

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
id: your-class-6-tests--game
Test.RunAll(new List<Action>
{
    AHitTakesHealth
    // Four more: one for Heal(-50), and one at a boundary
});

void AHitTakesHealth()
{
    var ada = new Character("Ada", 10);
    ada.TakeDamage(3);
    Test.Check("a hit of 3 takes 3 health", 7, ada.Health);
}
```

```hint
after: 2 runs
What should `Heal(-50)` do to a character with 5 health? Where are the
boundaries for health: what should a hit that leaves exactly 0 do, and a
heal that reaches exactly `MaxHealth`?
```

```solution
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
---
The refusal of the heal, then `Tests run: 5. Passed: 5.` The one change
is in `Heal`: a negative amount is refused, as it is in `TakeDamage`.
Before the change, a heal of −50 took Ada from 5 health to −45, and she
was not even down, because `IsDown` asks whether her health is exactly 0.

Two of the tests are at a boundary: a hit that leaves exactly 0, and a
heal that reaches exactly `MaxHealth`.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Character` replaces the one
above for this program (rule 4). `Healer`, above, now builds on this one.
```

</div>

<div class="dl-world" data-world="solar-system">

The first three cells hold `Probe` and `Lander`, the fourth version, and
`Mission`, the fifth. What does `Burn(-50)` do to a probe with 70 kg?

```csharp exec
id: your-class-6--solar-system
file: Probe.cs
class Probe
{
    public virtual int TankSize => 100;

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

    public virtual bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: your-class-6-lander--solar-system
file: Lander.cs
class Lander : Probe
{
    // A lander is a probe that can land, and once it has landed, it burns no more.

    private bool _landed = false;

    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    public void Land()
    {
        _landed = true;
    }

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
id: your-class-6-mission--solar-system
file: Mission.cs
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    public Mission(string name)
    {
        Name = name;
    }

    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }

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
id: your-class-6-tests--solar-system
Test.RunAll(new List<Action>
{
    ABurnUsesFuel
    // Four more: one for Burn(-50), and one at a boundary
});

void ABurnUsesFuel()
{
    var voyager = new Probe("Voyager", 100);
    voyager.Burn(30);
    Test.Check("a burn of 30 kg leaves 70 kg", 70, voyager.Fuel);
}
```

```hint
after: 2 runs
What should `Burn(-50)` do to a probe with 70 kg? Where is the boundary
for fuel: can a probe burn exactly all that it has? And what can a lander
do once it has landed?
```

```solution
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

class Probe
{
    public virtual int TankSize => 100;

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

    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;
        }
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
---
The refusal of the burn of −50 kg, then `Tests run: 5. Passed: 5.` The one
change is in `CanBurn`: a negative burn is never possible. Before the
change, a burn of −50 kg took Voyager from 70 kg to 120 kg, past its 100 kg
tank. `Burn` asks `CanBurn`, and so does a lander's own `CanBurn`, through
`base.CanBurn`, so the one fix closes the gap in all three.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Probe` replaces the one above
for this program (rule 4). `Lander` and `Mission`, above, now use this one.
```

</div>

<div class="dl-world" data-world="your-own">

Copy your classes from *Composition* into the first cell. They are saved in
that page's cells in your own world. Which rule is your class missing?
Write its test first, in the second cell, and run it: it should not pass.
Then add the rule in the first cell. Write four more tests, with at least
one at a boundary, and add each name to the list for `Test.RunAll`.

```csharp exec
id: your-class-6--your-own
// My classes so far: the fifth version.
```

```csharp exec
id: your-class-6-tests--your-own
// My five tests, and Test.RunAll with a list of them.
```

</div>

## The next step: tests in Visual Studio

The page's `Test` class and its list of tests are the same idea as a *test
project* in Visual Studio. A test project is a project that holds only
tests, in the same solution as the program it tests. Visual Studio finds
the tests by itself, runs them, and shows each result in a window called
*Test Explorer*. These steps are for Visual Studio 2022 on Windows, with
MSTest, Microsoft's own test framework.

1. Download the last cell of your world, the one with your tests, as a
   Visual Studio project, and open it. Or open a project of your own.
2. In that project, write `public` in front of each class that the tests
   will use, such as `public class Probe` or `public class Character`. A
   test project can use only the public classes of another project.
3. In Solution Explorer, select the solution. Then choose **File** >
   **Add** > **New Project**. Type *test* in the search box, choose
   **MSTest Test Project** for C#, and choose **Next**. Give it a name, such
   as `MyWorld.Tests`, and choose **Create**.
4. In the new project, right-click **Dependencies**, and choose **Add
   Project Reference**. Tick your first project, and choose **OK**.
5. Open the test file that the template made (it has `[TestClass]` in it),
   and write your tests in its class, like this:

```csharp
[TestClass]
public class ProbeTests
{
    [TestMethod]
    public void ABurnUsesFuel()
    {
        var voyager = new Probe("Voyager", 100);
        voyager.Burn(30);
        Assert.AreEqual(70, voyager.Fuel);
    }
}
```

6. Choose **Test** > **Test Explorer** (or press Ctrl+E, then T). In Test
   Explorer, choose **Run All**.

`[TestClass]` and `[TestMethod]` are *attributes*: labels in square
brackets that give extra information about a class or a method. MSTest
runs every method that has `[TestMethod]`, in every class that has
`[TestClass]`, so it needs no list. `Assert.AreEqual` does the job of
`Test.Check`, with the expected value first and the value found second.
When the two values differ, it stops the test, and its message says what
was expected and what was found. Test Explorer
marks each test in its own words, *Passed* or *Failed*, and for a test that
did not pass, it shows the message and the line.

A stress test in a test project is one more `[TestMethod]`, with the loop
inside it.

## Looking back

On this page, a test had a mistake in it once, and all five suspects had
a bug, Probe C too. When a test does not pass, how will you decide which
one to change: the test, or the class?

A challenge: B and D did not pass the same check, for different reasons.
Probe D compared each burn with the size of the tank. Can you write one
test that Probe D does not pass, and every other suspect passes? A
challenge opens as a new notebook, which has none of this page's classes,
so the first step is in the comment at the top.

```csharp challenge
// First, copy IProbe, the five suspects and Test from the top of the
// page into a cell above this one.
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestOnlyD(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestOnlyD(IProbe probe)
{
    // One test here
}
```

Next, the [practice page](lesson:testing-what-a-class-does-practice) has
more problems on tests, boundaries and runners, and three from earlier
pages. After it, *Documenting a class* writes down what each method
promises, in comments that Visual Studio shows.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Get started with unit testing*. Visual Studio documentation.
<https://learn.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing>.
The steps for a test project and Test Explorer, with pictures, and the
same test in MSTest, NUnit and xUnit, the three test frameworks that
Visual Studio has templates for.

Microsoft. *Get started with C# and MSTest*.
<https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-csharp-with-mstest>.
The same work without Visual Studio, from a terminal, with `dotnet test`.
It starts with a test that does not pass, and writes the code after it.

Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley.
The book that made "write the test first" a habit. Its first part is in
Java, which reads much like C#.
