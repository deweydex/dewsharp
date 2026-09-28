---
title: "Testing a class: practice"
version: 2026.09.28.1
from: testing-what-a-class-does-practice
practice_for: testing-what-a-class-does
---

# Testing a class: practice

This page has problems on tests, boundaries and runners, and three from
earlier pages. Try each problem before you open anything under it, and run
the cells to test your guesses.

The first cell holds `Test`, with `Check` and `RunAll`, as on
[the lesson](lesson:testing-what-a-class-does). The cells below use it
(rule 2: a class written in a cell can be used by the cells below it).

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

## 1. Where are the boundaries?

`TakeDamage` refuses a negative amount, and health stops at 0. A character
has 10 health. Which amount, of 0, 3, 5, 10 and 11, fits each sentence?

- A hit of ___ is at a boundary: it leaves exactly 0.
- A hit of ___ is at a boundary too: it is the smallest amount that is not
  refused.
- A hit of ___ is one step past a boundary: it is more than all the
  health the character has.

<details class="dl-answer"><summary>why</summary>

10, 0 and 11. A hit of 3 or 5 is in the middle, where bugs are least
likely. If the check for a negative amount were written `amount <= 0`, a
hit of 0 would print a refusal, though a hit of 0 is allowed. The health
would not change either way, so only a test at 0, and a look at what it
prints, would show that. Without `Math.Max`, a hit of 11 would take health
below 0, and a test at 11 would show that. A test at 10 checks that a
character is down at exactly 0.

</details>

## 2. Which tests run?

```csharp exec
id: which-tests-run-1
Test.RunAll(new List<Action> { TestOne, TestThree });

void TestOne()
{
}

void CheckTwo()
{
    Test.Check("check two", 3, 1 + 1);
}

void TestThree()
{
    Test.Check("sums", 3, 1 + 1);
}
```

```predict
type: choice

What will the last line print?

- Tests run: 2. Passed: 1.
  - Only the methods in the list are run.
- Tests run: 3. Passed: 1.
  - Every method with a check in it is a test.
- Tests run: 3. Passed: 2.
  - `CheckTwo` passes, because nothing calls it.
```

<details class="dl-answer"><summary>why</summary>

`sums: expected 3, found 2`, then `Tests run: 2. Passed: 1.` `CheckTwo`
never runs: it is not in the list. The compiler noticed, and said so in a
warning: CS8321, *The local function 'CheckTwo' is declared but never
used*. C# calls a method that is written among a program's statements, as
`CheckTwo` is, a *local function*. A warning does not stop the program, so
it is easy to miss. In a test project, a method without `[TestMethod]` is
never run either.

</details>

## 3. Twice in the hall

This `Room` should refuse anyone who is already inside, and it does not.

```csharp exec
id: twice-in-the-hall-1
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
        _names.Add(name);
    }

    public int Count()
    {
        return _names.Count;
    }
}
```

Here is a test that sends Ada into the hall twice. Run it on this version.
Can you then change `Room`, above, so that the test passes?

```csharp exec
id: twice-in-the-hall-tests
Test.RunAll(new List<Action> { NobodyEntersTwice });

void NobodyEntersTwice()
{
    var hall = new Room("Hall");
    hall.Enter("Ada");
    hall.Enter("Ada");
    Test.Check("Ada is in the hall once", 1, hall.Count());
}
```

```hint
after: 2 runs
Before `Enter` adds a name, what should it ask? Which method of a `List`
tells you whether something is already in it?
```

```solution
Test.RunAll(new List<Action> { NobodyEntersTwice });

void NobodyEntersTwice()
{
    var hall = new Room("Hall");
    hall.Enter("Ada");
    hall.Enter("Ada");
    Test.Check("Ada is in the hall once", 1, hall.Count());
}

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

    public int Count()
    {
        return _names.Count;
    }
}
---
The test makes a room, sends Ada in twice, and expects a count of 1. On
the first version it does not pass: the count is 2. On this version, the
second `Enter` is refused, and the test passes.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Room` replaces the one above for
this program (rule 4).
```

## 4. A test with a mistake in it

```csharp exec
id: a-test-that-is-wrong-1
Test.RunAll(new List<Action> { ThreeTenths });

void ThreeTenths()
{
    Test.Check("three tenths", 0.3, 0.1 * 3);
}
```

Run it. Is the mistake in the code, or in the test? Can you change
whichever one it is, so that the test passes?

```solution
title: close enough
Test.RunAll(new List<Action> { ThreeTenths });

void ThreeTenths()
{
    Test.Check("three tenths, to within 0.001", true, Math.Abs(0.1 * 3 - 0.3) < 0.001);
}
---
It prints `Tests run: 1. Passed: 1.` `Math.Abs` gives the size of the
difference, without its sign, and the test asks only whether it is less
than 0.001.
```

```solution
title: with decimal
Test.RunAll(new List<Action> { ThreeTenths });

void ThreeTenths()
{
    Test.Check("three tenths", 0.3m, 0.1m * 3);
}
---
It prints `Tests run: 1. Passed: 1.` The `m` after a number makes it a
`decimal`, and a `decimal` keeps 0.1 exactly, so `0.1m * 3` is exactly
`0.3m`.
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The test. `0.1 * 3` is `0.30000000000000004`, very nearly 0.3, because a
`double` keeps 0.1 very nearly, not exactly. The multiplication did what
a `double` does. The test asked for two `double` values to be exactly
equal, and that was the mistake. The two solutions under the cell change
the test in two ways: a check that asks "close enough?", and a check with
`decimal` values, which keep 0.1 exactly.

</details>

## 5. What a test project adds

`Test.RunAll` runs a list of tests. What would you want a real test tool to
do that `RunAll` does not?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

Find the tests by itself, in every file, so that there is no list to change
each time you write a test. Say which test did not pass, on which line, and
with which values. Run only the tests you choose. Give each test a fresh
start, so that no test changes anything the next one uses. Show the
results in a window, and run them all again with one click. A test project
in Visual Studio, with MSTest and Test Explorer, does all of these. MSTest
makes a new object of the test class for each test method, which is how
each test gets its fresh start.

</details>

## 6. From earlier: the same object in two places

From [Composition](lesson:objects-inside-objects).

```csharp exec
id: from-earlier-the-same-object-1
file: Mission.cs
class Mission
{
    public string Name;
    private List<string> _probes = new List<string>();

    public Mission(string name)
    {
        Name = name;
    }

    public void Launch(string probe)
    {
        _probes.Add(probe);
    }

    public int Count()
    {
        return _probes.Count;
    }
}
```

```csharp exec
id: from-earlier-the-same-object-1-program
var outer = new Mission("Outer");
var inner = new Mission("Inner");
outer.Launch("Voyager");
inner.Launch("Voyager");
Console.WriteLine(outer.Count() + inner.Count());
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`2`. Each mission makes its own list, when the mission is made, so each
counts one. The same name in both lists is two entries, not one shared
entry.

</details>

## 7. From earlier: through the parent

From [Inheritance](lesson:one-parent-many-children). A `Knight` is a
`Character` whose armour takes 2 from every hit. It overrides
`TakeDamage`, and passes the rest of the hit to the parent's
`TakeDamage`, which refuses a negative amount and stops health at 0.

```csharp exec
id: from-earlier-through-the-parent-1-character
file: Character.cs
class Character
{
    public string Name;
    public int Health { get; protected set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
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
}
```

```csharp exec
id: from-earlier-through-the-parent-1-knight
file: Knight.cs
class Knight : Character
{
    public Knight(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(Math.Max(0, amount - 2));
    }
}
```

Which of these tests does the knight pass? Decide, and then run the tests.

- (a) A hit of 5 leaves a knight of 10 health at 7.
- (b) A hit of −3 leaves a knight at 10.
- (c) A hit of 20 leaves a knight at 0.

```csharp exec
id: from-earlier-through-the-parent-1-program
Test.RunAll(new List<Action> { AHitOf5, AHitOfMinus3, AHitOf20 });

void AHitOf5()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(5);
    Test.Check("(a) a hit of 5 leaves 7", 7, knight.Health);
}

void AHitOfMinus3()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(-3);
    Test.Check("(b) a hit of -3 leaves 10", 10, knight.Health);
}

void AHitOf20()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(20);
    Test.Check("(c) a hit of 20 leaves 0", 0, knight.Health);
}
```

<details class="dl-answer"><summary>why</summary>

All three: `Tests run: 3. Passed: 3.` (a) The knight's armour takes 2 from
the hit, and the parent takes the rest from 10 health, which leaves 7.
(b) `Math.Max(0, amount - 2)` is never below 0, so the parent is given a
hit of 0, which changes nothing. The parent never sees the −3, so nothing
prints a refusal. (c) The parent is given a hit bigger than the knight's
health, and its own `Math.Max(0, ...)` stops health at 0. The knight
passes (c) because it calls `base.TakeDamage`: the parent's rules do that
work.

</details>

## 8. From earlier: a skeleton's first test

From [Designing classes](lesson:from-a-description-to-classes). Each
method of a skeleton holds one line: `throw new NotImplementedException();`.
Here is a skeleton of a small log of a rover's drives, and two tests of it.

```csharp exec
id: from-earlier-a-skeletons-first-test-1
file: Log.cs
class Log
{
    public void Add(int distance)    // metres
    {
        throw new NotImplementedException();
    }

    public int Longest()    // the longest distance added so far
    {
        throw new NotImplementedException();
    }
}
```

```csharp exec
id: from-earlier-a-skeletons-first-test-1-program
Test.RunAll(new List<Action> { TheLongestOfTwoDrives, OneDriveIsTheLongest });

void TheLongestOfTwoDrives()
{
    var log = new Log();
    log.Add(340);
    log.Add(1200);
    Test.Check("the longest of 340 m and 1200 m is 1200 m", 1200, log.Longest());
}

void OneDriveIsTheLongest()
{
    var log = new Log();
    log.Add(340);
    Test.Check("one drive of 340 m is the longest", 340, log.Longest());
}
```

```predict
type: choice

What will the last line print?

- Tests run: 2. Passed: 0.
  - `RunAll` catches each exception, and continues with the next test.
- Nothing: it stops with an exception
  - On [Designing classes](lesson:from-a-description-to-classes), a skeleton's method stopped the program.
- Nothing: it does not compile
  - None of the methods has any real code in it.
```

<details class="dl-answer"><summary>why</summary>

It prints `The method or operation is not implemented.` twice, then
`Tests run: 2. Passed: 0.` Each test calls a method that throws a
`NotImplementedException`. The `catch` in `RunAll` catches it, prints its
message, and continues with the next test. On
[Designing classes](lesson:from-a-description-to-classes), nothing caught
the exception, so it stopped the program. The program compiles,
because the skeleton has every method that the tests call.

</details>

Why might you write a test like these before you write the method?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

Written before the method, the test says exactly what the method must do,
and the method is finished when the test passes. This is the test first,
as in [A test before the fix](lesson:testing-what-a-class-does#a-test-before-the-fix)
on the lesson.

</details>
