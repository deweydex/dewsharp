---
title: "LINQ: asking a list a question"
version: 2026.09.28.1
from: comprehensions-and-grids
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
covers: [FOOP-LO4, FOOP-LO8]
---

# LINQ: asking a list a question

This page is an extra. It uses what the course teaches by the end of
[Classes and objects](lesson:objects-and-classes), with the lists and
loops of [Arrays and lists](lesson:lists-and-sequences), and it adds one
part of C#: a way to ask a list a question in one line.

The questions on this page are about the eight planets of our solar
system, and the next two cells hold them. The first is the class `Planet`.
It keeps a planet's name, its *diameter* (its width, straight through its
centre, in kilometres) and its distance from the Sun, in millions of
kilometres. Its `ToString` gives the planet's name, so `string.Join` can
print a list of planets, as on the Classes and objects page.

```csharp exec
id: eight-planets-1
file: Planet.cs
class Planet
{
    public string Name;
    public int Diameter;
    public double Distance;

    public Planet(string name, int diameter, double distance)
    {
        Name = name;
        Diameter = diameter;
        Distance = distance;
    }

    public override string ToString()
    {
        return Name;
    }
}
```

The second cell holds one method, `Planets()`, which makes a new list of
the eight planets each time it is called. `static` means that the method
belongs to the class `SolarSystem` itself, and not to an object made from
it. So a program calls it with the class's name, `SolarSystem.Planets()`,
as it calls `Math.Max`. The class is `static` too, because no program makes
an object from it. Variables stay in their cell (rule 3), so every program
about the planets starts with the same line:
`List<Planet> planets = SolarSystem.Planets();`.

```csharp exec
id: eight-planets-2
file: SolarSystem.cs
static class SolarSystem
{
    public static List<Planet> Planets()
    {
        return new List<Planet>
        {
            new Planet("Mercury", 4879, 57.9),
            new Planet("Venus", 12104, 108.2),
            new Planet("Earth", 12756, 149.6),
            new Planet("Mars", 6792, 228.0),
            new Planet("Jupiter", 142984, 778.5),
            new Planet("Saturn", 120536, 1432.0),
            new Planet("Uranus", 51118, 2867.0),
            new Planet("Neptune", 49528, 4515.0),
        };
    }
}
```

The program below asks the list a question, in its second line. Before
you run it, can you read the question? What do you think the program
prints first?

```csharp exec
id: a-first-question-1
List<Planet> planets = SolarSystem.Planets();
List<Planet> giants = planets.Where(planet => planet.Diameter > 40000).ToList();
Console.WriteLine(string.Join(", ", giants));
Console.WriteLine(giants.Count);
```

```predict
type: choice

What will the first line print?

- Jupiter, Saturn, Uranus, Neptune
  - `Where` keeps each planet whose diameter is more than 40,000 km.
- Mercury, Venus, Earth, Mars
  - `Where` removes each planet that passes the test.
- False, False, False, False, True, True, True, True
  - `Where` gives the test's answer for each planet.
```

The first line is `Jupiter, Saturn, Uranus, Neptune`, and the second is
`4`: the four giant planets. Read the second line aloud, from the word
after `=`: *the planets, where the planet's diameter is more than 40,000,
as a list*. `Where` keeps each planet that passes a test, in the order of the
list, and does not keep the others. `ToList()` puts the planets that
`Where` kept into a new list, `giants`. The list `planets` does not change.

`Where` is part of *LINQ*, which is short for *Language-Integrated Query*.
A *query* is a question asked of data. LINQ is a set of methods, part of
.NET, for asking questions of arrays, lists and other *collections*
(values that hold many other values). Every list has these methods, as
well as its own methods, such as `Add`.

The test is inside the brackets of `Where`:
`planet => planet.Diameter > 40000`. The next section explains what it is.

## The loop inside `Where`

You could find the giant planets without LINQ, with a loop you already
know. Here is that loop. Run it, and compare what it prints with the cell
above.

```csharp exec
id: the-loop-inside-where-1
List<Planet> planets = SolarSystem.Planets();
List<Planet> giants = new List<Planet>();
foreach (Planet planet in planets)
{
    if (planet.Diameter > 40000)
    {
        giants.Add(planet);
    }
}
Console.WriteLine(string.Join(", ", giants));
```

It prints the same four names: `Jupiter, Saturn, Uranus, Neptune`.
`Where` does what this loop does. It takes each planet, one after
another, tests it, and keeps the planets that pass. A loop still runs
inside `Where`, but it is C#'s loop, not ours. We write only the part that changes from one
question to the next: the test.

### A method with no name

So `Where` needs to know how to test one planet. We give it a method: one
that takes a planet, and returns `true` to keep it or `false` to drop it.
Here is that method, `IsGiant`, with a name of its own.

```csharp exec
id: a-method-with-no-name-1
static bool IsGiant(Planet planet)
{
    return planet.Diameter > 40000;
}

List<Planet> planets = SolarSystem.Planets();
List<Planet> giants = planets.Where(IsGiant).ToList();
Console.WriteLine(string.Join(", ", giants));
```

It prints `Jupiter, Saturn, Uranus, Neptune` again. The method's name goes
to `Where` with no brackets after it. With no brackets, C# does not call
the method on that line. It gives the method itself to `Where`, and
`Where` calls it once for each planet. The PDP page
[Sorting](lesson:putting-things-in-order) gives `Array.Sort` a method in
the same way.

A method that is used in one place only does not need a name. C# lets us
write it in the place where it is used, without one:

```csharp
planet => planet.Diameter > 40000
```

This is a *lambda*: a method with no name, written where it is used. It has
the same parts as `IsGiant`, with less to write.

| In `IsGiant` | In the lambda |
|---|---|
| `static bool IsGiant` | Nothing. It has no name, and C# finds the type that it returns. |
| `(Planet planet)`, the parameter | `planet`, before the `=>`. C# knows that it is a `Planet`, because `Where` was called on a list of planets. |
| `{ return planet.Diameter > 40000; }` | `planet.Diameter > 40000`, after the `=>`: the value that it returns. |

The arrow `=>` stands between the lambda's parameter and the value it
returns. You can read the lambda as *for each planet: is its diameter more
than 40,000?* The name before `=>` is our choice. We call it `planet`
because each value it takes is one planet.

## `Select`: a new value from each element

`Where` keeps some of the elements, as they are. `Select` keeps every
element, and makes a new value from each one. Its lambda says how.

Light travels about 17.99 million kilometres in a minute. How many
minutes does sunlight take to reach each planet? And what does the second
question in this program ask?

```csharp exec
id: a-new-value-from-each-element-1
List<Planet> planets = SolarSystem.Planets();
List<double> minutes = planets
    .Select(planet => Math.Round(planet.Distance / 17.99, 1))
    .ToList();
Console.WriteLine(string.Join(", ", minutes));

List<string> giantSizes = planets
    .Where(planet => planet.Diameter > 40000)
    .Select(planet => $"{planet.Name} ({planet.Diameter} km)")
    .ToList();
Console.WriteLine(string.Join(", ", giantSizes));
```

The first line has one number for each planet, in the list's order.
Sunlight takes 8.3 minutes to reach Earth, and 251 minutes to reach
Neptune. `Math.Round(number, 1)` rounds a number to one digit after the
point. `minutes` is a `List<double>`, not a `List<Planet>`: `Select` can
make values of any type, and the new list holds the type that its lambda
returns. Here is the loop that the first `Select` does for us:

```csharp
List<double> minutes = new List<double>();
foreach (Planet planet in planets)
{
    minutes.Add(Math.Round(planet.Distance / 17.99, 1));
}
```

The second question is two questions, one after the other: *the planets,
where the diameter is more than 40,000, and from each of those, its name
and its diameter*. `Select` is called on the answer that `Where` gives.
Methods called one after another like this, each on the answer of the one
before it, make a *chain*. A chain is easier to read with one method on
each line.
The dot at the start of a line shows that it continues the line above.

If you have written Python, you may know a *list comprehension*, which
does both jobs in one expression:

```python
giant_names = [planet.name for planet in planets if planet.diameter > 40000]
```

LINQ says the same thing in the order that the work is done. First the
test, with `Where`, then the new value, with `Select`:

```csharp
List<string> giantNames = planets
    .Where(planet => planet.Diameter > 40000)
    .Select(planet => planet.Name)
    .ToList();
```

Does the order of a chain matter? The next cell asks the same two
questions in the opposite order. It is meant to fail: run it, and read
the message.

```csharp exec
id: a-new-value-from-each-element-2
expect: CS1061
List<Planet> planets = SolarSystem.Planets();
List<string> giantNames = planets
    .Select(planet => planet.Name)
    .Where(planet => planet.Diameter > 40000)
    .ToList();
Console.WriteLine(string.Join(", ", giantNames));
```

```hint
after: 2 errors
Which of the two questions needs a planet's diameter? After `Select`, what
is each element: a planet, or something else?
```

It does not compile. The message, on line 4, begins `error CS1061:
'string' does not contain a definition for 'Diameter'`. After `Select`, each
element is a planet's name, a `string`, and a string has no diameter. The
lambda's parameter is still called `planet`, but its name does not change
its type.
The compiler knows that here it is a `string`, and it checks the lambda
before anything runs. Can you swap lines 3 and 4, so that the program
compiles?

## `Count` and `Sum`: one number from a whole list

Some questions have a number for an answer. `Count` counts the elements
that pass a test. `Sum` gives the total of one value from each element,
and its lambda says which value.

A list already has a `Count` of its own, with no brackets: the number of
its elements. LINQ's `Count`, with a test in its brackets, counts only the
elements that pass the test.

A picture that people often share says that all the other planets would
fit, side by side, in the space between the Earth and the Moon. The
Moon's centre is, on average, 384,400 km from the Earth's centre. The
program below asks two questions. The first counts the planets closer to
the Sun than Earth. The second asks: would the other seven planets fit?
Run it and see.

```csharp exec
id: one-number-from-a-whole-list-1
List<Planet> planets = SolarSystem.Planets();
int closer = planets.Count(planet => planet.Distance < 149.6);
Console.WriteLine($"Closer to the Sun than Earth: {closer}");

// The Moon's centre is 384,400 km from the Earth's, on average.
int row = planets
    .Where(planet => planet.Name != "Earth")
    .Sum(planet => planet.Diameter);
Console.WriteLine($"The other seven, side by side: {row} km");
Console.WriteLine(row < 384400);
```

Two planets are closer to the Sun than Earth: Mercury and Venus. The row
of the other seven is 387941 km long, so the last line is `False`. At the
Moon's average distance, they do not fit. The row is a little too long,
and the real gap is smaller still, because it is measured from the Earth's
surface to the Moon's surface, not from centre to centre.

Here are the loops that `Count` and `Sum` do for us. You have written loops
like these: `MoonsWiderThan`, on the page
[Inside a method](lesson:the-moves-you-already-know), is a count like the
first one.

```csharp
int closer = 0;
foreach (Planet planet in planets)
{
    if (planet.Distance < 149.6)
    {
        closer = closer + 1;
    }
}

int row = 0;
foreach (Planet planet in planets)
{
    if (planet.Name != "Earth")
    {
        row = row + planet.Diameter;
    }
}
```

### Your turn

Each task has two cells: a class in the first, and a program that uses it
in the second. The class is ready, so the work is in the program. Change
the program, and run it.

<div class="dl-world" data-world="game">

Ada opens a chest in a cave. Each item in it has a weight, in kilograms,
and a value, in gold coins. Can you set `totalWeight` to the weight of
everything in the chest, and `treasure` to the names of the items worth 20
gold or more? Change the `0` and the empty list, and keep the rest.

```csharp exec
id: your-turn-1--game
file: Item.cs
class Item
{
    public string Name;
    public int Weight;
    public int Value;

    public Item(string name, int weight, int value)
    {
        Name = name;
        Weight = weight;
        Value = value;
    }

    public override string ToString()
    {
        return Name;
    }
}
```

```csharp exec
id: your-turn-1-program--game
List<Item> chest = new List<Item>
{
    new Item("Rope", 3, 4),
    new Item("Lamp", 2, 15),
    new Item("Gold cup", 5, 80),
    new Item("Map", 1, 25),
    new Item("Shield", 8, 30),
    new Item("Bread", 1, 2),
};
int totalWeight = 0;
List<string> treasure = new List<string>();
Console.WriteLine($"Weight: {totalWeight} kg");
Console.WriteLine($"Worth 20 or more: {string.Join(", ", treasure)}");
```

```inputs
totalWeight
treasure
```

```hint
after: 2 runs
Which question gives one number from the whole chest? And which two
questions, one after the other, give the names of some of the items?
```

```hint
after: 3 runs
title: the order of the two
Keep the items first, and then take their names: `Where`, then `Select`,
then `ToList()`.
```

```solution
List<Item> chest = new List<Item>
{
    new Item("Rope", 3, 4),
    new Item("Lamp", 2, 15),
    new Item("Gold cup", 5, 80),
    new Item("Map", 1, 25),
    new Item("Shield", 8, 30),
    new Item("Bread", 1, 2),
};
int totalWeight = chest.Sum(item => item.Weight);
List<string> treasure = chest
    .Where(item => item.Value >= 20)
    .Select(item => item.Name)
    .ToList();
Console.WriteLine($"Weight: {totalWeight} kg");
Console.WriteLine($"Worth 20 or more: {string.Join(", ", treasure)}");
---
20 kg, and the Gold cup, the Map and the Shield. `Sum` needs a lambda to
say which value to add. An item is not a number, but its weight is. One
loop could find both answers. Which is easier to read aloud: the loop, or
the two lines of LINQ?
```

</div>

<div class="dl-world" data-world="solar-system">

Mercury, the smallest planet, is 4,879 km across. The list below holds
the eight widest moons in the solar system, and the planet that each one
belongs to. Is any moon wider than a planet? Can you set
`widerThanMercury` to the names of the moons wider than 4,879 km, and
`ofJupiter` to how many of the eight belong to Jupiter? Change the empty
list and the `0`, and keep the rest.

```csharp exec
id: your-turn-1--solar-system
file: Moon.cs
class Moon
{
    public string Name;
    public string PlanetName;
    public int Diameter;

    public Moon(string name, string planetName, int diameter)
    {
        Name = name;
        PlanetName = planetName;
        Diameter = diameter;
    }

    public override string ToString()
    {
        return Name;
    }
}
```

```csharp exec
id: your-turn-1-program--solar-system
List<Moon> moons = new List<Moon>
{
    new Moon("Ganymede", "Jupiter", 5268),
    new Moon("Titan", "Saturn", 5150),
    new Moon("Callisto", "Jupiter", 4821),
    new Moon("Io", "Jupiter", 3643),
    new Moon("the Moon", "Earth", 3475),
    new Moon("Europa", "Jupiter", 3122),
    new Moon("Triton", "Neptune", 2707),
    new Moon("Titania", "Uranus", 1577),
};
List<string> widerThanMercury = new List<string>();
int ofJupiter = 0;
Console.WriteLine($"Wider than Mercury: {string.Join(", ", widerThanMercury)}");
Console.WriteLine($"Jupiter's: {ofJupiter}");
```

```inputs
widerThanMercury
ofJupiter
```

```hint
after: 2 runs
Which two questions, one after the other, give the names of some of the
moons? And which question gives one number: how many moons pass a test?
```

```hint
after: 3 runs
title: a test for Jupiter's moons
`moon.PlanetName == "Jupiter"` is `true` for a moon of Jupiter, and
`false` for any other moon.
```

```solution
List<Moon> moons = new List<Moon>
{
    new Moon("Ganymede", "Jupiter", 5268),
    new Moon("Titan", "Saturn", 5150),
    new Moon("Callisto", "Jupiter", 4821),
    new Moon("Io", "Jupiter", 3643),
    new Moon("the Moon", "Earth", 3475),
    new Moon("Europa", "Jupiter", 3122),
    new Moon("Triton", "Neptune", 2707),
    new Moon("Titania", "Uranus", 1577),
};
List<string> widerThanMercury = moons
    .Where(moon => moon.Diameter > 4879)
    .Select(moon => moon.Name)
    .ToList();
int ofJupiter = moons.Count(moon => moon.PlanetName == "Jupiter");
Console.WriteLine($"Wider than Mercury: {string.Join(", ", widerThanMercury)}");
Console.WriteLine($"Jupiter's: {ofJupiter}");
---
Ganymede and Titan: two moons are wider than the planet Mercury. And 4 of
the eight belong to Jupiter. Wider does not mean heavier, though: Mercury
is heavier than either of them. What would you change to find the moons
wider than our own Moon?
```

</div>

## `OrderBy`: sorting by a key

`OrderBy` puts elements in order. Its lambda gives one value for each
element, called its *key*, and `OrderBy` sorts the elements by their
keys, the smallest first. What do you think this program prints?

```csharp exec
id: sorting-by-a-key-1
List<Planet> planets = SolarSystem.Planets();
planets.OrderBy(planet => planet.Diameter);
Console.WriteLine(string.Join(", ", planets));
```

```predict
type: choice

What will it print?

- Mercury, Mars, Venus, Earth, Neptune, Uranus, Saturn, Jupiter
  - `OrderBy` sorts the list by diameter, the smallest first.
- Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
  - `OrderBy` gives the sorted planets as a new answer, and leaves the list as it was.
- It does not compile
  - The sorted planets are not kept anywhere.
```

It prints `Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune`,
the order the list had at the start. `OrderBy` does not change the list.
Like `Where` and `Select`, it gives its answer as something new, and this
program does nothing with that answer. (A list's own `Sort` method is
different: it changes the list, as on the PDP page
[Sorting](lesson:putting-things-in-order).)

Can you change the program so that it prints the planets in order of
size? Under the cell there is a solution, for when you want to compare.

`OrderByDescending` sorts the other way, with the largest key first.
*Descending* means going down. The solution uses both.

```solution
title: the planets in order of size
List<Planet> planets = SolarSystem.Planets();
List<Planet> bySize = planets.OrderBy(planet => planet.Diameter).ToList();
Console.WriteLine(string.Join(", ", bySize));

List<Planet> largestFirst = planets
    .OrderByDescending(planet => planet.Diameter)
    .ToList();
Console.WriteLine(string.Join(", ", largestFirst));
---
The first line is `Mercury, Mars, Venus, Earth, Neptune, Uranus, Saturn,
Jupiter`, from the smallest to the largest, and the second line is the same
planets from the largest to the smallest.
```

On the PDP page Sorting, `Array.Sort` is given a method that compares two
elements and says which one comes first. A key is simpler: one value for
each element, and C# compares the values. The key can be any value
that C# can sort, such as a number or a piece of text, and the lambda can
calculate it. The loop that `OrderBy` does for us is a whole sort, such as
that page's insertion sort.

### Your turn

<div class="dl-world" data-world="game">

Ada's bag has room for only a few more kilograms. The best items to take
are the ones worth the most gold for each kilogram they weigh. Can you set
`best` to the items in the chest in that order, the best first? The class
`Item` is the one in the first cell of the task above (rule 2: a class
written in a cell can be used by the cells below it).

```csharp exec
id: your-turn-2--game
List<Item> chest = new List<Item>
{
    new Item("Rope", 3, 4),
    new Item("Lamp", 2, 15),
    new Item("Gold cup", 5, 80),
    new Item("Map", 1, 25),
    new Item("Shield", 8, 30),
    new Item("Bread", 1, 2),
};
List<Item> best = new List<Item>();
Console.WriteLine(string.Join(", ", best));
```

```inputs
best
```

```hint
after: 2 runs
Which method puts the largest key first? And what is the key: which
number, calculated from one item, says how good that item is to take?
```

```hint
after: 3 runs
title: the key
For one item, the gold for each kilogram is `item.Value / item.Weight`.
```

```solution
List<Item> chest = new List<Item>
{
    new Item("Rope", 3, 4),
    new Item("Lamp", 2, 15),
    new Item("Gold cup", 5, 80),
    new Item("Map", 1, 25),
    new Item("Shield", 8, 30),
    new Item("Bread", 1, 2),
};
List<Item> best = chest
    .OrderByDescending(item => item.Value / item.Weight)
    .ToList();
Console.WriteLine(string.Join(", ", best));
Console.WriteLine(string.Join(", ", best.Select(item => item.Value / item.Weight)));
---
The Map, the Gold cup and the Lamp come first. The solution's second line
prints each item's key, in the same order: 25, 16, 7, 3, 2 and 1 gold
for each kilogram. `/` with two whole numbers drops the part after the
point, so the Lamp's 15 gold for 2 kg gives 7. For these six items, the
order is the same when the part after the point is kept. Can you think of
two items for which it would not be?
```

</div>

<div class="dl-world" data-world="solar-system">

Venus is sometimes called Earth's twin. Is it the planet whose width is
closest to Earth's 12,756 km? Can you set `likeEarth` to the planets in
order of how close their diameter is to Earth's, the closest first?
`Math.Abs` gives a number without its minus sign, so it gives the
difference between two widths whichever one is larger.

```csharp exec
id: your-turn-2--solar-system
List<Planet> planets = SolarSystem.Planets();
List<Planet> likeEarth = new List<Planet>();
Console.WriteLine(string.Join(", ", likeEarth));
```

```inputs
likeEarth
```

```hint
after: 2 runs
What is the key: which number, calculated from one planet, says how far
its diameter is from Earth's? Should the smallest key come first, or the
largest?
```

```hint
after: 3 runs
title: the key
For one planet, the difference is `planet.Diameter - 12756`. For a planet
narrower than Earth, that is below zero. What does `Math.Abs` do to it?
```

```solution
List<Planet> planets = SolarSystem.Planets();
List<Planet> likeEarth = planets
    .OrderBy(planet => Math.Abs(planet.Diameter - 12756))
    .ToList();
Console.WriteLine(string.Join(", ", likeEarth));
Console.WriteLine(string.Join(", ", likeEarth.Select(planet => Math.Abs(planet.Diameter - 12756))));
---
Earth comes first, because its diameter is 0 km from its own. Venus is
next, only 652 km narrower: a twin, as people say. The solution's second
line prints each planet's key, in the same order, so you can see why each
one is where it is.
```

</div>

## A question, not an answer

Every question on this page so far that kept its answer in a variable
ended with `ToList()`, or with `Count` or `Sum`. What does `Where` give without `ToList()`? The next cell is
meant to fail. Run it, and read the message.

```csharp exec
id: a-question-not-an-answer-1
expect: CS0266
List<Planet> planets = SolarSystem.Planets();
List<Planet> giants = planets.Where(planet => planet.Diameter > 40000);
Console.WriteLine(string.Join(", ", giants));
```

It does not compile. The message, on line 2, begins
`error CS0266: Cannot implicitly convert type
'System.Collections.Generic.IEnumerable<Planet>' to
'System.Collections.Generic.List<Planet>'`. `Where` does not give a list.
It gives an `IEnumerable<Planet>`: a *sequence* of planets. A sequence
gives its values one at a time, when something asks for them. `foreach`
can ask for them, and so can `string.Join`, `Count` and `Sum`. Every list
is a sequence too, but this sequence is not a list. *Enumerable* means that
its values can be counted out, one at a time. The *I* at the start
of `IEnumerable` says that it is an *interface*: a list of methods that a
class promises to have. The page
[Interfaces](lesson:many-classes-one-promise) explains them. Here it is
enough to know that `foreach` can read a sequence.

The message ends with a question: *are you missing a cast?* A *cast*,
such as `(List<Planet>)` in front of a value, asks C# to convert the value
to that type. Here the answer is no. With the cast, the program compiles,
and then it stops with an exception, because this sequence is not a
list. Can you make the program compile in two other ways: by adding `.ToList()` at the
end of line 2, or by writing `IEnumerable<Planet>` in place of
`List<Planet>` at its start?

A sequence holds a surprise. Astronomers have searched for a ninth planet,
far beyond Neptune, for years. Suppose that they find one tomorrow: this
program makes the sequence `giants`, counts it, adds the new planet to the
list, and counts `giants` again. The new planet's numbers are invented. A
sequence has no `Count` of its own, so the program uses LINQ's `Count()`,
with nothing in its brackets, which counts every element.

```csharp exec
id: a-question-not-an-answer-2
List<Planet> planets = SolarSystem.Planets();
IEnumerable<Planet> giants = planets.Where(planet => planet.Diameter > 40000);
Console.WriteLine(giants.Count());

planets.Add(new Planet("Planet Nine", 60000, 70000));
Console.WriteLine(giants.Count());
```

```predict
type: choice

What will the second line print?

- 4
  - `giants` was filled on its own line, before the ninth planet was added.
- 5
  - `Count()` asks the question again, of the list as it is now.
- It stops with an exception
  - The list changed after `giants` was made from it.
```

The first line is `4`, and the second is `5`. `giants` does not hold four
planets. It holds the question: *the planets, where the diameter is more
than 40,000*. Each time something reads it, the question is asked again,
of the list as it is at that moment. By the second `Count()`, the list had
a ninth planet, wide enough to pass the test.

That is why this page ends a question with `ToList()` when it keeps the
answer in a variable. `ToList()` asks the question once, and keeps the
answer in a new list, which does not change when `planets` does. Can you
add `.ToList()` to the second line, and write `List<Planet>` at its
start? What does the program print then?

```solution
for: a-question-not-an-answer-2
title: the same program with ToList()
List<Planet> planets = SolarSystem.Planets();
List<Planet> giants = planets.Where(planet => planet.Diameter > 40000).ToList();
Console.WriteLine(giants.Count());

planets.Add(new Planet("Planet Nine", 60000, 70000));
Console.WriteLine(giants.Count());
---
Both lines are `4`. Now `giants` is a list, not a question. `ToList()`
asked the question once, before the ninth planet was added, and the list
kept the four planets that passed.
```

Most of the time, the two ways give the same answer. They differ when the
list changes between the moment the question is written and the moment
the answer is read.

## Looking back

A loop says *how* to find an answer, step by step. A line of LINQ says
*what* the answer is, and C# runs the loop. On this page, which was easier
for you to read: the loops, or the lines of LINQ? Which would be easier to
change, if the question changed? Is there a question on this page where
you would still choose a loop?

A challenge: on the page
[Inside a method](lesson:the-moves-you-already-know), `Planet` counted and
compared its moons with loops. The `Planet` in the challenge below has
three methods: two from that page, and `HasMoonWiderThan`, which is new.
Each one is a loop. Can you write each one as a single line of LINQ,
starting with `return`? `MoonsWiderThan` needs a method from this page.
The other two need methods that this page did not show, `Max` and `Any`. Can you find
what each one does, from its name, or from Microsoft's list of LINQ's
methods (in "Where to read more", below)? And what does each method do for
a planet with no moons, such as Venus, before and after your change?

```csharp challenge
Planet jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.MoonsWiderThan(3475));
Console.WriteLine(jupiter.WidestMoon());
Console.WriteLine(jupiter.HasMoonWiderThan(5000));

class Planet
{
    public string Name;
    public List<int> Moons;

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    // Each method is a loop. Can each one be one line of LINQ?
    public int MoonsWiderThan(int km)
    {
        int count = 0;
        foreach (int width in Moons)
        {
            if (width > km)
            {
                count = count + 1;
            }
        }
        return count;
    }

    public int WidestMoon()
    {
        int best = Moons[0];
        foreach (int width in Moons)
        {
            if (width > best)
            {
                best = width;
            }
        }
        return best;
    }

    public bool HasMoonWiderThan(int km)
    {
        foreach (int width in Moons)
        {
            if (width > km)
            {
                return true;
            }
        }
        return false;
    }
}
```

Everything on this page runs here, on the page, and nothing in it needs
Visual Studio. Any program cell can be downloaded as a Visual Studio
project, and it prints the same there. LINQ's methods are in the
namespace `System.Linq`. It is one of the using lines that every cell,
and every new console project, has without writing it: see "The using
lines you do not see", on the page
[Namespaces and class libraries](lesson:namespaces-and-libraries). In a
project without that line, the program does not compile: the compiler
finds no method called `Where` for a list.

Next, if you came here from
[Classes and objects](lesson:objects-and-classes),
[Inside a method](lesson:the-moves-you-already-know) looks inside
methods, at the loops that LINQ does for you. Another extra,
*Simulating a queue*, uses a second collection class from .NET: a queue,
where the first to arrive is the first to be served.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Write LINQ queries* (C# guide).
<https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/write-linq-queries>.
This page shows LINQ in two forms. The first is the one on this page:
method calls with lambdas. The second, *query syntax*, reads more like a
sentence, with the words `from`, `where` and `select`. The compiler
changes the second form into the first, so the two do the same work.

Microsoft. *Lambda expressions and anonymous functions* (C# reference).
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions>.
*Anonymous* means without a name. This is the official description of
lambdas, with more of what they can do than this page shows, such as a
lambda with two parameters.

Microsoft. *Enumerable Class* (.NET API reference).
<https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable>.
The list of every LINQ method, `Any` and `Max` among them, for the
challenge. The remarks near the top of the page explain why a question
waits until something reads it, which Microsoft calls *deferred
execution*. *Deferred* means delayed.
