---
title: "Inside a method: practice"
version: 2026.09.28.1
from: the-moves-you-already-know-practice
practice_for: the-moves-you-already-know
---

# Inside a method: practice

This page has problems on the four moves inside a class, and three from
earlier pages. Try each problem before you open anything under it, and
run the cells to test your guesses.

Some cells on this page are meant not to compile. When one of them stops
at the compiler, nothing is broken: the message is part of the answer.

The cells follow the rules of the road from
[Classes and objects](lesson:objects-and-classes). A class written in a
cell can be used by the cells below it, and variables stay in their cell.

## 1. A loop that chooses when to stop

This method burns a probe's fuel in steps of 10 kg. `Fuel` is a field of
the probe.

```csharp
public int BurnAll()
{
    int burns = 0;
    while (Fuel >= 10)
    {
        Fuel = Fuel - 10;
        burns = burns + 1;
    }
    return burns;
}
```

Which move is each of these lines: storing, sequence, selection or
iteration?

- `int burns = 0;`
- `while (Fuel >= 10)`
- `Fuel = Fuel - 10;`

<details class="dl-answer"><summary>answer</summary>

`int burns = 0;` is storing. `while (Fuel >= 10)` is iteration.
`Fuel = Fuel - 10;` is storing.

A `while` line has a condition in it, like an `if`, so it can look like
selection. But its job is to repeat. It runs its lines again and again,
and the condition only decides when to stop. That makes it iteration.
`Fuel = Fuel - 10;` stores in a field, on the object, so the fuel stays
burnt after the method ends.

</details>

## 2. One name, two variables

A room counts how many times someone enters it. Look at the first line
inside `Enter`.

```csharp exec
id: two-names-that-look-alike-1
file: Room.cs
class Room
{
    public string Name;
    public int Visits;

    public Room(string name)
    {
        Name = name;
        Visits = 0;
    }

    public void Enter()
    {
        int Visits = 0;
        Visits = Visits + 1;
    }
}
```

```csharp exec
id: two-names-that-look-alike-1-program
var hall = new Room("Hall");
hall.Enter();
hall.Enter();
Console.WriteLine(hall.Visits);
```

```predict
type: choice

What will it print?

- 2
  - Each call to `Enter` adds 1 to the room's visits.
- 1
  - Each call starts again from 0, and adds 1.
- 0
  - `int Visits = 0;` makes a new local variable, and the field never changes.
```

<details class="dl-answer"><summary>why</summary>

`0`. `int Visits = 0;` starts with a type, so it makes a new local
variable inside one call of `Enter`, with the same name as the field.
Inside `Enter`, the name `Visits` now means the local variable, so the
next line adds 1 to it. The local variable is gone when the call ends.
The field `Visits` stays at the value the constructor gave it.

The compiler says nothing about it: C# allows a local variable with the
same name as a field. Inside `Enter`, `this.Visits` still means the
field. In C#, the name of a local variable usually starts with a small
letter. So a local variable called `Visits`, with a capital *V*, is a
reason to read its line again.

Delete the line `int Visits = 0;`, and run the program again. What does
it print now?

</details>

## 3. The same question twice

```csharp exec
id: the-same-question-twice-1
file: Planet.cs
class Planet
{
    public string Name;
    public List<int> Moons;

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

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
}
```

```csharp exec
id: the-same-question-twice-1-program
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.MoonsWiderThan(3000));
Console.WriteLine(jupiter.MoonsWiderThan(3000));
```

```predict
type: choice

What will the second line print?

- 4
  - Each call starts `count` from 0 again.
- 8
  - The second call adds to the first call's count.
```

<details class="dl-answer"><summary>why</summary>

`4`, both times. `int count = 0;` is the first line of the method, so
every call starts from 0. That is why `count` is a local variable and not
a field. If it were a field, what would the second call print?

</details>

## 4. The narrowest moon

Can you give `Planet` a `NarrowestMoon()` method? The program below the
class calls it, so the program does not compile until the method exists.
Its message says what is missing: `'Planet' does not contain a definition
for 'NarrowestMoon'`.

```csharp exec
id: the-narrowest-moon-1
file: Planet.cs
class Planet
{
    public string Name;
    public List<int> Moons;

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }
}
```

```csharp exec
id: the-narrowest-moon-1-program
expect: CS1061
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.NarrowestMoon());
```

```inputs
jupiter.NarrowestMoon()
new Planet("Mars", new List<int> { 22, 12 }).NarrowestMoon()
new Planet("Earth", new List<int> { 3475 }).NarrowestMoon()
```

```solution
title: with what you've met so far
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.NarrowestMoon());

class Planet
{
    public string Name;
    public List<int> Moons;

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    public int NarrowestMoon()
    {
        int best = Moons[0];
        foreach (int width in Moons)
        {
            if (width < best)
            {
                best = width;
            }
        }
        return best;
    }
}
---
It prints 3122: Europa. The method has the same shape as `Heaviest()`
and `WidestMoon()` on the lesson page, with `<` in place of `>`.
```

```solution
title: a shorter way
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.NarrowestMoon());

class Planet
{
    public string Name;
    public List<int> Moons;

    public Planet(string name, List<int> moons)
    {
        Name = name;
        Moons = moons;
    }

    public int NarrowestMoon()
    {
        return Moons.Min();
    }
}
---
`Min()` looks at every width for you, as the loop does.
```

## 5. How heavy is the backpack?

Can you give `Backpack` a `TotalWeight()` method that adds every weight
in it? The program below the class calls it, so the program does not
compile until the method exists. Its message says what is missing:
`'Backpack' does not contain a definition for 'TotalWeight'`.

```csharp exec
id: how-heavy-1
file: Backpack.cs
class Backpack
{
    public string Owner;
    public List<int> Weights;

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }
}
```

```csharp exec
id: how-heavy-1-program
expect: CS1061
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.TotalWeight());
```

```inputs
ada.TotalWeight()
new Backpack("Grace", new List<int>()).TotalWeight()   // an empty backpack
new Backpack("Alan", new List<int> { 4 }).TotalWeight()
```

```solution
title: with what you've met so far
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.TotalWeight());

class Backpack
{
    public string Owner;
    public List<int> Weights;

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }

    public int TotalWeight()
    {
        int total = 0;
        foreach (int weight in Weights)
        {
            total = total + weight;
        }
        return total;
    }
}
---
It prints 11. An empty backpack gives back 0, the value that `total`
started with, because the loop never runs. There is no selection here:
every weight counts.
```

```solution
title: a shorter way
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.TotalWeight());

class Backpack
{
    public string Owner;
    public List<int> Weights;

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }

    public int TotalWeight()
    {
        return Weights.Sum();
    }
}
---
`Sum()` adds every weight for you, as the loop does.
```

## 6. A fifth move?

A class gives a program fields, a constructor and methods. Does it give it
a fifth move, beside storing, sequence, selection and iteration?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

No, it does not add a fifth move. A class adds a second place to store
values: in a field, on the object, where a value lasts from one method
call to the next and every method can use it. The code inside each method
is still built from the same four moves.

</details>

## 7. From earlier: a slip in a name

From [Classes and objects](lesson:objects-and-classes).

```csharp exec
id: from-earlier-a-slip-in-a-name-1
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
}
```

```csharp exec
id: from-earlier-a-slip-in-a-name-1-program
expect: CS1061
var grace = new Character("Grace", 8);
grace.Heath = 3;
Console.WriteLine(grace.Health);
```

```predict
type: choice

What happens when you run the program?

- It prints 8
  - `Heath` is a new field, so `Health` is unchanged.
- It prints 3
  - The line sets Grace's health to 3.
- It does not compile
  - A `Character` has no field called `Heath`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS1061: 'Character' does not contain a
definition for 'Heath'`, on line 2. So nothing is printed. A C# class
lists its fields, and the compiler checks every name you use against that
list before it runs anything. A key in a `Dictionary` is different: the
compiler cannot check a key, so a misspelt key quietly adds a new entry.

</details>

## 8. From earlier: printed, not returned

From [Methods: writing your own](lesson:writing-your-own-functions).

```csharp exec
id: from-earlier-printed-not-returned-1
expect: CS0029
void Twice(int number)
{
    Console.WriteLine(number * 2);
}

int result = Twice(4);
Console.WriteLine(result);
```

```predict
type: choice

What happens when you run the program?

- It prints 8, then 8
  - `Twice(4)` prints 8, and gives 8 back.
- It prints 8, then 0
  - `Twice` prints 8, but gives nothing back.
- It does not compile
  - `void` says that `Twice` gives nothing back, so there is nothing to store in `result`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0029: Cannot implicitly convert type 'void'
to 'int'`, on line 6. Nothing is printed, not even the line inside
`Twice`. `void` in front of a method's name says that the method gives
nothing back. `Twice` prints its answer, but a caller gets nothing to
store. A method that gives back a whole number has `int` in front of its
name, and ends with `return`. `Heaviest()` on the lesson page is the same:
it has to `return` its answer for a caller to use it.

</details>

## 9. From earlier: a loop that counts

From [Loops](lesson:repeating-yourself). How many lines does this print,
and what is the last one? Try to answer before you run it.

```csharp exec
id: from-earlier-a-loop-that-counts-1
for (int step = 2; step < 11; step += 3)
{
    Console.WriteLine(step);
}
```

<details class="dl-answer"><summary>answer</summary>

Three lines: 2, 5 and 8. `step` starts at 2 and grows by 3 each time. The
loop stops when `step < 11` is no longer true: the next value after 8 is
not less than 11.

</details>

## 10. The highest score, too soon

A game keeps a player's scores. Look at where `return best;` is in this
method.

```csharp exec
id: the-highest-score-too-soon-1
file: Scoreboard.cs
expect: CS0161
class Scoreboard
{
    public string Player;
    public List<int> Scores;

    public Scoreboard(string player, List<int> scores)
    {
        Player = player;
        Scores = scores;
    }

    public int HighestScore()
    {
        int best = Scores[0];
        foreach (int score in Scores)
        {
            if (score > best)
            {
                best = score;
            }
            return best;
        }
    }
}
```

```csharp exec
id: the-highest-score-too-soon-1-program
expect: CS0161
var board = new Scoreboard("Ada", new List<int> { 120, 340, 85 });
Console.WriteLine(board.HighestScore());
```

```predict
type: choice

What happens when you run the program?

- It prints 120
  - `return` is inside the loop, so the method stops on the first score.
- It prints 340
  - The loop looks at every score before it returns.
- It prints 85
  - `best` ends as the last score in the list.
- It does not compile
  - The compiler finds a path through the method that never reaches `return`.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0161: 'Scoreboard.HighestScore()': not all
code paths return a value`, on line 12 of `Scoreboard.cs`: the method's
first line. `return best;` is inside the loop's
braces, so it is one of the lines that repeat. The compiler checks every
path through the method before it runs anything. If the list were empty,
the loop would run no times, and the method would reach its last brace
with nothing to return. C# does not allow that.

</details>

What if the `return` stays inside the loop, and a second `return best;`
goes after the loop? The class below does that, and now the program
compiles *(rule 4: a class written again further down replaces the
earlier one)*. What does it print?

```csharp exec
id: the-highest-score-too-soon-2
file: Scoreboard.cs
class Scoreboard
{
    public string Player;
    public List<int> Scores;

    public Scoreboard(string player, List<int> scores)
    {
        Player = player;
        Scores = scores;
    }

    public int HighestScore()
    {
        int best = Scores[0];
        foreach (int score in Scores)
        {
            if (score > best)
            {
                best = score;
            }
            return best;
        }
        return best;
    }
}
```

```csharp exec
id: the-highest-score-too-soon-2-program
var board = new Scoreboard("Ada", new List<int> { 120, 340, 85 });
Console.WriteLine(board.HighestScore());
```

<details class="dl-answer"><summary>why</summary>

`120`. The `return` inside the loop runs with the first score, and a
`return` ends the method there. The loop never reaches 340. Delete the
`return` inside the loop, so that only the one after the loop is left,
and run the program again. What does it print now? The braces decide
which lines repeat: a line inside the loop's braces runs once for each
score, until a `return` ends the method.

</details>
