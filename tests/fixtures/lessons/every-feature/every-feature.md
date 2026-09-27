---
title: "Every feature: a lesson that uses each part of the format"
version: 2026.09.27.1
from: every-feature
worlds:
  game: A game world with heroes and treasure.
  space: The solar system. The numbers are real.
covers: [FOOP-LO1, FOOP-LO2]
---

# Every feature

This page is a fixture for the tests. It uses every part of
`docs/LESSON_FORMAT.md` once, so that the parser and the checker meet each
of them. Maths works too: $2^3 = 8$.

## A first program

```csharp exec
id: a-first-program-1
hint: Change the text in quotes, then run it again.
Console.WriteLine("Hello!");
Console.WriteLine($"A ticket costs {12.5:C}.");
Console.WriteLine($"Today is {new DateTime(2026, 9, 3):d}.");
```

```predict
type: choice

What will the second line print?

- A ticket costs €12.50.
  - The page uses Irish settings.
- A ticket costs $12.50.
- Nothing: it does not compile
```

```hint
What does the first line print? Which line prints the price?
```

## Mistakes on purpose

This cell is meant to fail. The compiler finds a name it doesn't know.

```csharp exec
id: mistakes-1
expect: CS0103
int total = 0;
Console.WriteLine(totl);
```

This one compiles, and then stops at a line it cannot complete.

```csharp exec
id: mistakes-2
expect: exception
int[] scores = { 3, 5 };
Console.WriteLine("before");
Console.WriteLine(scores[2]);
```

## Asking a question

```csharp exec
id: asking-1
stdin: "Ada\n21\n"
Console.Write("What is your name? ");
string name = Console.ReadLine();
Console.Write("How old are you? ");
int age = int.Parse(Console.ReadLine());
Console.WriteLine($"Hello, {name}. Next year you will be {age + 1}.");
```

Without `stdin:`, the checker types nothing, so `Console.ReadLine()` gives
`null`.

```csharp exec
id: asking-2
string answer = Console.ReadLine();
Console.WriteLine(answer == null);
```

## A menu with colours

```csharp exec
id: a-menu-1
stdin: "2\nq\n"
Console.Clear();
Console.ForegroundColor = ConsoleColor.Cyan;
Console.WriteLine("1. Start");
Console.WriteLine("2. Help");
Console.ResetColor();
string choice = Console.ReadLine();
Console.WriteLine($"You chose {choice}.");
ConsoleKeyInfo key = Console.ReadKey();
Console.WriteLine(key.Key);
Environment.Exit(3);
```

## Your turn: a total

```csharp exec
id: a-total-1
int Total(List<int> values)
{
    int total = 0;
    return total;
}
```

```inputs
Total(new List<int> { 4, 8, 15 })
Total(new List<int>())           // an empty list
Total(null)                      // throws: there is no list at all
```

```solution
title: with what you've met so far
int Total(List<int> values)
{
    int total = 0;
    foreach (int value in values)
    {
        total += value;
    }
    return total;
}
---
The loop adds each value to `total`.
```

```solution
title: with LINQ
int Total(List<int> values) => values.Sum();
```

## Classes

```csharp exec
id: classes-1
public class Planet
{
    public string Name { get; }

    public Planet(string name)
    {
        Name = name;
    }

    public override string ToString() => $"Planet {Name}";
}
```

```csharp exec
id: classes-2
Planet mars = new Planet("Mars");
Console.WriteLine(mars);
```

```csharp exec
id: classes-3
file: BetterPlanet.cs
public class Planet
{
    public string Name { get; }

    public Planet(string name)
    {
        Name = name;
    }

    public override string ToString() => $"the planet {Name}";
}
```

```csharp exec
id: classes-4
Console.WriteLine(new Planet("Venus"));
```

```hint
for: classes-2
Which cell above makes the class Planet?
```

A class with `Main`, shown once:

```csharp exec
id: classes-5
class Greeter
{
    static void Main()
    {
        Console.WriteLine("Main ran.");
    }
}
```

## In your world

<div class="dl-world" data-world="game">

A hero has a name and some health.

```csharp exec
id: your-world-1--game
public class Hero
{
    public string Name { get; set; } = "Ada";
    public int Health { get; set; } = 10;
}
```

```csharp exec
id: your-world-2--game
Hero hero = new Hero();
Console.WriteLine($"{hero.Name} has {hero.Health} health.");
```

```inputs
new Hero().Health * 2
```

```solution
Hero hero = new Hero();
hero.Health -= 3;
Console.WriteLine($"{hero.Name} has {hero.Health} health.");
```

</div>

<div class="dl-world" data-world="space">

A probe has a name and some fuel.

```csharp exec
id: your-world-1--space
public class Probe
{
    public string Name { get; set; } = "Voyager";
    public int Fuel { get; set; } = 100;
}
```

```csharp exec
id: your-world-2--space
Probe probe = new Probe();
Console.WriteLine($"{probe.Name} has {probe.Fuel} fuel.");
```

```predict
type: number
tolerance: 0

How much fuel will it print?
```

</div>

After the worlds, a shared cell. It runs in each world, since the classes
above it differ.

```csharp exec
id: after-the-worlds-1
Console.WriteLine("Shared, after the worlds.");
```

## Code to read

```csharp
// C# to read, not run.
int count = 3;
```

```python
count = 3
```

```console
Program.cs(2,19): error CS0103: The name 'totl' does not exist in the current context
```

```text
plain text
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

```console
Hello!
```

</details>

## A challenge

```csharp challenge
// A running total that never goes below zero.
int[] changes = { 5, -3, -4, 6, -10, 2 };
```
