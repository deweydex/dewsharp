---
title: "Testing a class: practice"
version: 2026.09.27.1
from: testing-what-a-class-does-practice
practice_for: testing-what-a-class-does
---

# Testing a class: practice

This page has problems on tests, boundaries and runners, and three from
earlier pages. Try each problem before you open anything under it, and run
the cells to test your guesses.

The first cell holds `Test`, with `Check` and `RunAll`, as on the lesson.
The cells below use it (rule 2: a class written in a cell can be used by
the cells below it).

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
- A hit of ___ is one step past a boundary: without `Math.Max`, it would
  leave −1.

<details class="dl-answer"><summary>why</summary>

10, 0 and 11. A hit of 3 or 5 is in the middle, where bugs are least
likely. If the check for a negative amount were written `amount <= 0`, it
would refuse a hit of 0, and a test at 0 would show it. Without `Math.Max`,
a hit of 11 would leave −1, and a test at 11 would show that. A test at 10
checks that a character is down at exactly 0.

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
never runs: it is not in the list. C# noticed, and said so in a warning:
CS8321, *The local function 'CheckTwo' is declared but never used*. A
warning does not stop the program, so it is easy to miss. In a test
project, a method without `[TestMethod]` is never run either.

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

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The test. `0.1 * 3` is `0.30000000000000004`, very nearly 0.3, because a
`double` keeps 0.1 very nearly, not exactly. For a `double`, a test asks
"close enough?":

```csharp
    Test.Check("three tenths, to within 0.001", true, Math.Abs(0.1 * 3 - 0.3) < 0.001);
```

A `decimal` keeps 0.1 exactly, so this check passes as it is:
`Test.Check("three tenths", 0.3m, 0.1m * 3);`. The `m` after a number makes
it a `decimal`.

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

From *Composition*.

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

From *Inheritance*. A `Knight` is a `Character` whose armour takes 2 from
every hit. It overrides `TakeDamage`, and passes the rest of the hit to
the parent's `TakeDamage`, which refuses a negative amount and stops health
at 0:

```csharp
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

Which of these tests does the knight pass, if `Character` keeps its own
rules?

- (a) A hit of 5 leaves a knight of 10 health at 7.
- (b) A hit of −3 leaves a knight at 10.
- (c) A hit of 20 leaves a knight at 0.

<details class="dl-answer"><summary>answer</summary>

All three. (a) 5 − 2 is 3, and 10 − 3 is 7. (b) `Math.Max(0, -5)` is 0,
and a hit of 0 changes nothing. (c) 18 is passed to the parent, whose
`Math.Max(0, ...)` stops health at 0. The knight passes (c) because it
calls `base.TakeDamage`: the parent's rules do that work.

</details>

## 8. From earlier: a skeleton's first test

From *Designing classes*. Each method of a skeleton holds one line:
`throw new NotImplementedException();`. When `Test.RunAll` runs a test of a
skeleton's method, what does it show? And why might you write that test
before the method?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The test does not pass. The method throws a `NotImplementedException`, the
`catch` in `RunAll` catches it, and `RunAll` prints its message: `The
method or operation is not implemented.` Then the other tests still run.
Written before the method, the test says exactly what the method must do,
and the method is finished when the test passes. This is the test first,
as in *A test before the fix* on the lesson.

</details>
