---
title: "A front end: practice"
version: 2026.09.28.1
from: a-front-end-for-a-class-practice
practice_for: a-front-end-for-a-class
---

# A front end: practice

This page has problems on front ends, commands and checking what people
type, and three from earlier pages. Try each problem before you open
anything under it, and run the cells to test your guesses. One cell is
meant not to compile, and its problem says so.

The cells follow the rules of the road: a class written in a cell can be
used by the cells below it, and variables stay in their cell.

## 1. Four commands

The first cell holds `Commands`, with a small `RunChoice` for a cave with a
troll. Problems 4, 6 and 7 use it too.

```csharp exec
id: four-commands-1
file: Commands.cs
/// <summary>The commands a player can give in a cave with a troll.</summary>
static class Commands
{
    /// <summary>Runs one command: attack, look or quit.</summary>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit; otherwise true.</returns>
    public static bool RunChoice(string choice)
    {
        if (choice == "attack")
        {
            Console.WriteLine("You swing at the troll.");
        }
        else if (choice == "look")
        {
            Console.WriteLine("A cave, and a troll.");
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

The program gives `RunChoice` four commands, and keeps each answer in a
list.

```csharp exec
id: four-commands-1-program
string[] choices = { "look", "Look", "quit", "attack" };
var results = new List<bool>();
foreach (string choice in choices)
{
    results.Add(Commands.RunChoice(choice));
}
Console.WriteLine(string.Join(", ", results));
```

```predict
type: choice

What will the last line print?

- True, True, False, True
  - Every command returns true except quit, and an unknown one is answered, not stopped.
- True, False, False, True
  - `Look` is not a command, so it stops the game.
- True, True, False
  - Nothing runs after quit.
```

<details class="dl-answer"><summary>why</summary>

`True, True, False, True`. `Look`, with a capital, is not a command, so it
prints `Not a command: Look` and returns `true`. `quit` returns
`false`, but the `foreach` loop does not stop for it: it runs once for each
item in the array. Only a loop that checks the answer, such as the
`do`...`while` loop in [the lesson](lesson:a-front-end-for-a-class), would
stop. C# writes `true` in code, and
prints `True`.

</details>

## 2. Reading a number

A player types how many kilograms a probe should burn, as text. Can you
write `ReadKilograms(string text)`, which returns the number if the text
is a whole number of kilograms, 0 or more, and `null` if it is not? Its
type, `int?`, is an `int` that can also be `null`, which means *no
number*.

```csharp exec
id: reading-a-number-1
Console.WriteLine(ReadKilograms("120"));

int? ReadKilograms(string text)
{
    return int.Parse(text);
}
```

```inputs
ReadKilograms("120")
ReadKilograms(" 40 ")
ReadKilograms("-5")
ReadKilograms("ten")
ReadKilograms("")
```

```hint
after: 2 runs
What does `int.Parse("ten")` do? `int.TryParse`, from [Reading input](lesson:reading-input),
says whether the text is a whole number. It gives the number through
`out`: a variable that `TryParse` sets. What should happen to a whole
number below 0?
```

```solution
Console.WriteLine(ReadKilograms("120"));

int? ReadKilograms(string text)
{
    if (int.TryParse(text, out int kg) && kg >= 0)
    {
        return kg;
    }
    return null;
}
---
`120` and `40`, then `null` for `"-5"`, `"ten"` and the empty text.
`int.Parse("ten")` stops with a `FormatException`, and so does
`int.Parse("")`. `int.TryParse` never stops the program: for text that is
not a whole number, it returns `false`, so the check comes first. Like `int.Parse`,
it accepts spaces at the ends, so `" 40 "` needs nothing more. `"-5"` is a
whole number, and `kg >= 0` refuses it: a burn is never below 0.
```

## 3. Why keep them separate?

`RunChoice` decides what a command means, and a separate loop asks for it.
What would be lost if `RunChoice` called `Console.ReadLine()` itself?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

It could no longer be tested with an array of commands. Every test would
wait for somebody to type. And it could not be given a menu, or a window,
as another front end without being written again. With one job each, you
can test it and use it again.

</details>

## 4. What the menu does

This menu uses the `RunChoice` from problem 1. One line is missing, so it
does not compile: it is meant to fail. Read the first message. Which line
is missing, and where does it go?

```csharp exec
id: what-the-menu-does-1
expect: CS0163
stdin: "2\n1\n3\n"
bool stillPlaying = true;
do
{
    Console.WriteLine("1: attack   2: look   3: quit");
    Console.Write("Choose a number: ");
    switch (Console.ReadLine())
    {
        case "1":
            stillPlaying = Commands.RunChoice("attack");
            break;
        case "2":
            stillPlaying = Commands.RunChoice("look");
        case "3":
        case null:
            stillPlaying = Commands.RunChoice("quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2 or 3.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

```hint
after: 2 errors
Which `case` does the message name? What do the other paths have, at their
end, that this one does not?
```

```solution
bool stillPlaying = true;
do
{
    Console.WriteLine("1: attack   2: look   3: quit");
    Console.Write("Choose a number: ");
    switch (Console.ReadLine())
    {
        case "1":
            stillPlaying = Commands.RunChoice("attack");
            break;
        case "2":
            stillPlaying = Commands.RunChoice("look");
            break;
        case "3":
        case null:
            stillPlaying = Commands.RunChoice("quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2 or 3.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

<details class="dl-answer"><summary>why</summary>

The message is
`error CS0163: Control cannot fall through from one case label ('case "2":') to another`.
The path for `case "2":` has no `break`.
In C#, every path in a `switch` must end, usually with `break`, so that the
lines of one `case` never continue into the next. `case "3":` and
`case null:` have no lines between them, so they are one path, and they
are allowed.

Some other languages, such as C and Java, let the lines of one `case`
continue into the next when there is no `break`. In those languages, a
menu like this one would run: after `look`, it would also run the lines
for `quit`, and the game would end every time the player chose `look`. C#
refuses to compile it, so the mistake cannot reach a player.

Each time the `do`...`while` loop runs its body, the menu asks once, and
the player plays one turn.

</details>

## 5. A command that goes too far

A player's command `burn` calls `probe.Burn(10)`. They choose it five
times, on Juno, a probe with 40 kg of fuel. Where should the refusal come
from: the front end, or the probe?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The probe. `Burn` already asks `CanBurn` first, for every caller: this
front end, the numbered menu, a window, and any front end written next
year. When Juno's fuel is gone, its own `Burn` refuses the burn, and
prints why. A front end that checks the fuel itself would be a second
copy of the rule, and the two copies could become different.

</details>

## 6. From earlier: a promise for RunChoice

From [Documenting a class](lesson:documenting-a-class). Look again at
the documentation comment on `RunChoice`, in the first cell of problem 1.
A caller wants to know what happens when a player types something that is
not a command. What should the comment also say?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

It should say that `RunChoice` prints a line saying the text is not a
command, and returns `true`, so the game continues. That is the refusal
a caller most needs to know about, since players often type something
unexpected:

```csharp
    /// <summary>
    /// Runs one command: attack, look or quit. For any other text, it prints
    /// that the text is not a command, and changes nothing.
    /// </summary>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit; otherwise true, for a command it does not know too.</returns>
```

</details>

## 7. From earlier: a test for a front end

From [Testing a class](lesson:testing-what-a-class-does). The first cell
holds `Test`, with `Check` and `RunAll`, as on that page. Can you write a
test that checks that `RunChoice` from problem 1 returns `false` for
`quit`, and `true` for a word that is not a command?

```csharp exec
id: a-test-for-a-front-end-test
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

As it is, the test has no checks, so it passes, whatever `RunChoice` does.

```csharp exec
id: a-test-for-a-front-end-1
Test.RunAll(new List<Action>
{
    QuitStopsAndNonsenseDoesNot
});

void QuitStopsAndNonsenseDoesNot()
{
    // Your two checks here
}
```

```hint
after: 2 runs
`Test.Check` takes a claim, the value you expect, and the value found.
What value do you expect from `Commands.RunChoice("quit")`?
```

```solution
Test.RunAll(new List<Action>
{
    QuitStopsAndNonsenseDoesNot
});

void QuitStopsAndNonsenseDoesNot()
{
    Test.Check("quit returns false", false, Commands.RunChoice("quit"));
    Test.Check("a word that is not a command returns true", true, Commands.RunChoice("xyzzy"));
}
---
It prints `Not a command: xyzzy`, then `Tests run: 1. Passed: 1.`
Because `RunChoice` is separate from `Console.ReadLine()`, the test
needs two lines. The printing still happens, and the test does not look
at it.
```

## 8. From earlier: one front end, every kind

From [Inheritance](lesson:one-parent-many-children). A front end calls
`probe.Burn(10)`. The probe might be a `Probe` or a `Lander`. Does the
front end need to check which?

<details class="dl-answer"><summary>answer</summary>

No. `Burn` asks `CanBurn`, and `CanBurn` is `virtual`, so each object runs
its own class's version: a lander that has landed refuses through the
`CanBurn` it overrides, and the front end prints whatever happened. That is
polymorphism, working in a front end.

</details>
