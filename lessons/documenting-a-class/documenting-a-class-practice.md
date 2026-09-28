---
title: "Documenting a class: practice"
version: 2026.09.28.1
from: documenting-a-class-practice
practice_for: documenting-a-class
---

# Documenting a class: practice

This page has problems on documentation comments and on testing the
examples in them, and three from earlier pages. Try each problem before
you open anything under it, and run the cells to test your guesses.

The cells follow the rules of the road: a class written in a cell can be
used by the cells below it, and variables stay in their cell. The first
cell holds `Test`, with `Check` and `RunAll`, as on
[the lesson](lesson:documenting-a-class). The cells below use it.

```csharp exec
id: the-test-class
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

## 1. Which comment helps?

A caller wants to know what `ada.Heal(-50)` does. Which of these three
summaries tells them?

- `/// <summary>Heals the character.</summary>`
- `/// <summary>Adds amount to Health. Uses Math.Min and MaxHealth.</summary>`
- `/// <summary>Adds amount to Health, stopping at MaxHealth. Refuses a negative amount, or a character who is down, and prints why.</summary>`

<details class="dl-answer"><summary>why</summary>

The third. The first repeats the method's name. The second tells the
caller about the inside of the method, which they should not need, and
which may change. The third says what a caller can trust the method to
do, including what happens with -50.

</details>

## 2. A promise for Enter

A room keeps a list of the names of the people inside it. Can you write a
documentation comment for `Enter`, in the first cell, that says the four
things a method promises: what it does, what its parameter should be,
what it returns, and what it refuses? The program in the second cell
shows what `Enter` does.

```csharp exec
id: a-promise-for-enter-1
file: Room.cs
class Room
{
    public string Name;
    private List<string> _names = new List<string>();

    public Room(string name)
    {
        Name = name;
    }

    public void Enter(string name)
    {
        if (_names.Contains(name))
        {
            Console.WriteLine($"Refused: {name} is already in {Name}.");
            return;
        }
        _names.Add(name);
    }

    public List<string> Inside()
    {
        return new List<string>(_names);
    }
}
```

```csharp exec
id: a-promise-for-enter-1-program
var hall = new Room("Hall");
hall.Enter("Ada");
hall.Enter("Ada");
Console.WriteLine(string.Join(", ", hall.Inside()));
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```csharp
    /// <summary>
    /// Puts someone in the room. Refuses a name that is already inside,
    /// and prints why.
    /// </summary>
    /// <param name="name">The name of the person who enters.</param>
    public void Enter(string name)
```

There is no `<returns>`, because `Enter` is `void`. A Python docstring
said "Returns nothing", so that nobody would try to keep an answer from
it. In C#, the compiler stops that line before it runs:
`var result = hall.Enter("Ada");` does not compile, with
`error CS0815: Cannot assign void to an implicitly-typed variable`.

</details>

## 3. The same names, two lists

`Inside()` now has an example in its comment:

```csharp
    /// <example>
    /// <code>
    /// var hall = new Room("Hall");
    /// hall.Enter("Ada");
    /// hall.Inside()    // a list with one name in it, "Ada"
    /// </code>
    /// </example>
```

The program below tests the example twice: first with a list, as the
example is written, and then with the list joined into one string.

```csharp exec
id: the-same-list-written-differently-1
Test.RunAll(new List<Action> { TheListItself, TheListAsText });

void TheListItself()
{
    var hall = new Room("Hall");
    hall.Enter("Ada");
    Test.Check("Inside() is a list with Ada in it", new List<string> { "Ada" }, hall.Inside());
}

void TheListAsText()
{
    var hall = new Room("Hall");
    hall.Enter("Ada");
    Test.Check("Inside(), joined into one string, is Ada", "Ada", string.Join(", ", hall.Inside()));
}
```

```predict
type: choice

What will the first test do?

- It passes
  - Both lists hold one name, "Ada".
- It does not pass
  - `Equals` asks whether two lists are the same list.
- It does not compile
  - Until now, `Check` has compared numbers, `true` and `false`, and strings.
```

<details class="dl-answer"><summary>why</summary>

The first test does not pass: ``Inside() is a list with Ada in it:
expected System.Collections.Generic.List`1[System.String], found
System.Collections.Generic.List`1[System.String]``. Printing a list
prints the name of its type, not the names inside it, so both sides look
the same. But `Equals` does not compare what two lists hold. For two
lists, it asks whether they are the same list: one object, perhaps with
two names, as on *Two names, one object*. Here there are two lists, one
made by the test and one by `Inside()`, so the check does not hold. It is
the same reason why `Contains` on
[Composition](lesson:objects-inside-objects) did not find a second
`new Character("Ada", 10)`.

The second test compares a string with a string, `"Ada"` with `"Ada"`,
and it passes, so the program ends with `Tests run: 2. Passed: 1.` When a
method returns a list, write its test with `string.Join`, and compare
strings.

Python's doctest compared the text that Python printed. `Check` compares
values, with `Equals`, and for a list that means the list itself.

</details>

## 4. A comment that stopped telling the truth

A bag in the game holds things, up to 20 kg in all. This method's comment
and its code disagree. Run the program. Which one would you change?

```csharp exec
id: a-comment-that-stopped-1
file: Bag.cs
/// <summary>A bag that holds things, up to MaxWeight kilograms in all.</summary>
class Bag
{
    /// <summary>The most the bag can hold, in kilograms.</summary>
    public int MaxWeight => 20;

    /// <summary>What the bag holds now, in kilograms.</summary>
    public int Weight { get; private set; }

    /// <summary>Says whether the bag can take kg more kilograms.</summary>
    /// <param name="kg">A weight in kilograms, 0 or more.</param>
    /// <returns>true if the bag would then hold no more than MaxWeight.</returns>
    /// <example>
    /// <code>
    /// new Bag().CanAdd(20)    // true: an empty bag can take all 20 kg
    /// new Bag().CanAdd(21)    // false
    /// </code>
    /// </example>
    public bool CanAdd(int kg)
    {
        return Weight + kg < MaxWeight;
    }

    /// <summary>
    /// Puts kg more kilograms in the bag. If CanAdd(kg) is false, it
    /// changes nothing, and prints why.
    /// </summary>
    /// <param name="kg">A weight in kilograms, 0 or more.</param>
    public void Add(int kg)
    {
        if (!CanAdd(kg))
        {
            Console.WriteLine($"Refused: the bag cannot take {kg} kg more.");
            return;
        }
        Weight = Weight + kg;
    }
}
```

```csharp exec
id: a-comment-that-stopped-1-program
Test.RunAll(new List<Action> { AnEmptyBagCanTake20, AnEmptyBagCannotTake21 });

void AnEmptyBagCanTake20()
{
    Test.Check("an empty bag can take 20 kg", true, new Bag().CanAdd(20));
}

void AnEmptyBagCannotTake21()
{
    Test.Check("an empty bag cannot take 21 kg", false, new Bag().CanAdd(21));
}
```

<details class="dl-answer"><summary>answer</summary>

The first test does not pass: `an empty bag can take 20 kg: expected
True, found False`, then `Tests run: 2. Passed: 1.` The example says that
an empty bag can take 20 kg, and the code says no: it uses `<`, so the
bag refuses anything that would make it hold exactly 20 kg. The bag is
made to hold up to 20 kg, so here the comment tells the truth, and the
code is the one to change: `Weight + kg <= MaxWeight`.

Sometimes the code does what was meant, and it is the comment that no
longer says what the code does. Either way, the test found the
disagreement.

</details>

## 5. Where does it go?

What fills each gap?

- A class's documentation comment goes on the lines ___ the class.
- A method's documentation comment goes on the lines ___ the method.
- Each line of a documentation comment starts with ___.
- What a parameter should be goes in a ___ tag.
- The comment of a `void` method has no ___ tag.
- An example's code goes between `<code>` and ___.

<details class="dl-answer"><summary>answer</summary>

Just above; just above; `///`; `<param>`; `<returns>`; `</code>`.

In Python, a docstring goes on the first line inside the class or the
method. In C#, the comment goes above it.

</details>

## 6. From earlier: a test at the edge

From [Testing a class](lesson:testing-what-a-class-does).
`Probe.CanBurn(kg)` says whether a probe can burn `kg` kilograms now. A
probe has 70 kg. Which two values of `kg` would you test first, and why?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

70 and 71: exactly all of the fuel, and one kilogram more. That is the
boundary, where a `<` written for `<=` would show, as it did on
[the lesson](lesson:documenting-a-class). 0 and -1 are the other edge.

</details>

## 7. From earlier: what the container asks

From [Composition](lesson:objects-inside-objects). `Mission.TotalFuel()`
adds `probe.Fuel` for each probe. Someone suggests another way: the
mission keeps its own list of fuel amounts, written when each probe is
launched, and adds those. Both give the same number on the day of the
launch. What could make them differ later?

<details class="dl-answer"><summary>answer</summary>

A burn. Voyager is launched with 70 kg, and then burns 20 kg. Voyager's
own `Fuel` is now lower, and the mission's list still says 70, the amount
at the launch. `probe.Fuel` asks the probe, and the probe always knows its
own fuel. The comment on `Fuel` can say so: *The probe's fuel now, in
kilograms.* A copy of a value stops telling the truth when the value
changes.

</details>

## 8. From earlier: one sentence for a child class

From [Inheritance](lesson:one-parent-many-children). A class starts:

```csharp
class Troll : Character
{
    public override int MaxHealth => 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

Can you write its class comment in one sentence: the same sentence you
might have given as the reason for the child class?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

`/// <summary>A character that is hard to defeat: its health can reach 20,
and it takes half of any damage, rounded down.</summary>`

*Rounded down* is worth saying: `amount / 2` is whole-number division,
so a hit of 7 takes 3, as it did to Grog on that page. The reason a child
class exists is the most useful thing its comment can say.

</details>
