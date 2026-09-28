---
title: "Inside a method: sequence, selection and iteration in a class"
version: 2026.09.28.1
from: the-moves-you-already-know
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO2, FOOP-LO3]
---

# Inside a method: sequence, selection and iteration in a class

Jupiter has four large moons: Io, Europa, Ganymede and Callisto. Here is a
planet, written as a class, with a method that counts the moons wider than
a given width. The class is in the first cell, and the program in the
second cell uses it *(rule 2: a class written in a cell can be used by the
cells below it)*.

Our own Moon is 3,475 km across. How many of Jupiter's four moons are
wider?

```csharp exec
id: the-handful-of-moves-1
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
id: the-handful-of-moves-1-program
// The widths of Io, Europa, Ganymede and Callisto, in kilometres
Planet jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.MoonsWiderThan(3475));
```

```predict
type: choice

What will it print?

- 3
  - Three of the four widths are more than 3475.
- 4
  - Every one of Jupiter's large moons is bigger than ours.
- 13732
  - `count` is the sum of the widths of the moons that pass.
```

It prints `3`. Io, Ganymede and Callisto are wider than our Moon. Europa,
at 3,122 km, is a little smaller. `count` grows by 1 for each moon that
passes, not by its width.

## The handful of moves

Nothing inside `MoonsWiderThan` is new. It is built from the moves you
have used in every program so far: on the Programming and Design
Principles pages [Variables, types and text](lesson:storing-and-computing),
[Decisions](lesson:making-decisions) and [Loops](lesson:repeating-yourself),
on *C# for Python programmers*, or in any language you have programmed in
before. There are four of them:

| Move | What it does | In `MoonsWiderThan` |
|---|---|---|
| storing | keeps a value under a name, for a later line to use | `int count = 0;` |
| sequence | runs lines one after another, in the order they are written | its lines, from top to bottom |
| selection | chooses between paths | `if (width > km)` |
| iteration | repeats a step | `foreach (int width in Moons)` |

*Storing* is a program keeping a value under a name, so that a later line
can use it. A *sequence* is a program's lines running one after another.
A *selection* is a program choosing between paths, usually with `if`. An
*iteration* is a program repeating a step, usually with a loop.

Which move is each of these lines? Choose one for each, before you open
the answer.

- `int count = 0;`
- `foreach (int width in Moons)`
- `if (width > km)`
- `count = count + 1;`
- `Moons = moons;`, in the constructor

<details class="dl-answer"><summary>answer</summary>

- `int count = 0;` is storing.
- `foreach (int width in Moons)` is iteration.
- `if (width > km)` is selection.
- `count = count + 1;` is storing, even though it looks like arithmetic.
  First C# adds 1 to `count`, and then it stores the result under `count`
  again. You can also write this line as `count++`, and it is still
  storing.
- `Moons = moons;` is storing.

Every line is also part of a sequence: a method runs its lines in the
order they are written.

</details>

## Storing inside a class

`int count = 0;` and `Moons = moons;` are both storing. But they keep
their values in different places. Here is a probe that counts its photos.
What does the program print after two photos?

```csharp exec
id: storing-inside-a-class-1
file: Probe.cs
class Probe
{
    public string Name;
    public int Photos;

    public Probe(string name)
    {
        Name = name;
        Photos = 0;
    }

    public void TakePhoto()
    {
        int photos = Photos + 1;
    }
}
```

```csharp exec
id: storing-inside-a-class-1-program
Probe voyager = new Probe("Voyager 1");
voyager.TakePhoto();
voyager.TakePhoto();
Console.WriteLine(voyager.Photos);
```

```predict
type: choice

What will it print?

- 0
  - `photos` with a small *p* is a different name from the field `Photos`.
- 2
  - Each call adds one photo.
- 1
  - Each call adds one to the same starting value.
```

It prints `0`, and the compiler says nothing about it. Look at the line
inside `TakePhoto`:

```csharp
int photos = Photos + 1;
```

It starts with a type, `int`, and a line that starts with a type makes a
new variable. Here the new variable is `photos`, with a small *p*. It is
a *local variable*: a variable made inside a method. It belongs to one
call of the method, and when the method ends, it is gone, with its value.
The field `Photos`, with a capital *P*, never changed.

Can you make `TakePhoto` store on the object? In the `Probe` cell, change
that line to `Photos = Photos + 1;`, with no type in front of it. Then
run the program again. How many photos does it count now?

In C#, a line makes a new variable only when it says so, with a type in
front of the name. So if you delete only `int`, and keep the small *p*,
the program does not compile. Try it: which name does the compiler say
it does not know?

So there are two places to store a value inside a class.

- **In a field**, on the object: `Photos = Photos + 1;`. The value stays
  with the object from one method call to the next, and every method in
  the class can use it.
- **In a local variable**, inside a method: `int count = 0;`. The value
  lasts only until the method ends.

As on [Classes and objects](lesson:objects-and-classes), `Photos` on its
own, inside a method, means the field of the object that the method was
called on. `this.Photos` means the same: in `voyager.TakePhoto()`, `this`
is `voyager`.

`count` in `MoonsWiderThan` is meant to disappear. It is needed only while
the loop runs, and the next call starts from 0 again. A photo count is
meant to last, so it lives in a field.

## Storing with `var`

The line that made Jupiter names its type twice:

```csharp
Planet jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
```

`Planet` is at the start of the line, and again after `new`. When the
type is already written after `new` like this, C# lets you write `var`
in place of the first one. What does this program print? Run it and see.

```csharp exec
id: storing-with-var-1
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.Name);
Console.WriteLine(jupiter.MoonsWiderThan(3475));
```

It prints `Jupiter` and `3`, as before. `var` tells the compiler to find
the variable's type from the value after `=`. That value is a new
`Planet`, so `jupiter` is a `Planet`. A line that starts with `var` also
makes a new variable: `var` says so, in the place of the type. In Visual
Studio, rest the mouse pointer on `var`, and it shows the type the
compiler found.

`var` does not mean that the variable can hold a value of any type. Its
type is fixed when the variable is made, as it is for `int count = 0;`.
The next cell is meant to fail: it tries to store a number in `jupiter`.
Run it, and read the message.

```csharp exec
id: storing-with-var-2
expect: CS0029
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
jupiter = 5;
```

It does not compile: `error CS0029: Cannot implicitly convert type 'int'
to 'Planet'`, on line 2. The compiler checks the whole program before it
runs any of it, so nothing ran. It knows that `jupiter` is a `Planet`,
and a number is not a planet.

On these pages, we write `var` only on a line that makes an object with
`new`, where the type is already written after `new`. Everywhere else
we write the type, as in `int count = 0;`, so that you always see it.
After this page, a line that makes an object uses `var`.

## One method, several moves

To find the largest value in a list, a method uses all four moves. It
stores the best value so far, repeats a step for each value in the list,
and chooses whether each one is better than the best so far.

### Your turn

Each task has two cells: a class to change in the first, and a program
that uses it in the second. Change the class, and then run the program.

<div class="dl-world" data-world="game">

A backpack holds items, and a list keeps their weights in kilograms. Can
you give `Backpack` a `Heaviest()` method that returns the largest weight?

The program is meant not to compile until you do. Its message says what
is missing: `'Backpack' does not contain a definition for 'Heaviest'`.

```csharp exec
id: one-method-several-moves-1--game
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
id: one-method-several-moves-1-program--game
expect: CS1061
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.Heaviest());
```

```inputs
ada.Heaviest()
new Backpack("Grace", new List<int> { 4 }).Heaviest()
new Backpack("Alan", new List<int> { 1, 1, 9 }).Heaviest()
```

```hint
after: 2 errors
What does the method need to remember as it looks at each weight? That
is the storing move. What should it start as, before the loop looks at
anything?
```

```hint
after: 3 errors
title: the method's first line
A method that gives back a whole number says so before its name:
`public int Heaviest()`. Its last line is `return`, with the value it
gives back.
```

```solution
var ada = new Backpack("Ada", new List<int> { 2, 5, 1, 3 });
Console.WriteLine(ada.Heaviest());

class Backpack
{
    public string Owner;
    public List<int> Weights;

    public Backpack(string owner, List<int> weights)
    {
        Owner = owner;
        Weights = weights;
    }

    public int Heaviest()
    {
        int best = Weights[0];
        foreach (int weight in Weights)
        {
            if (weight > best)
            {
                best = weight;
            }
        }
        return best;
    }
}
---
It prints 5. The solution writes `Backpack` again, below its program
*(rule 4)*, and C# uses this one in place of yours. `best` starts as the
first weight, so the method works for weights of any size. `Weights.Max()`
gives the same answer in one line: it looks at every weight, as this loop
does. What should an empty backpack return? Try
`new Backpack("Grace", new List<int>())` and see what happens.
```

</div>

<div class="dl-world" data-world="solar-system">

Can you give `Planet` a `WidestMoon()` method that returns the width of
its widest moon? The first cell writes the class again, so that you can
add to it *(rule 4: a class written again further down replaces the
earlier one)*.

The program is meant not to compile until you do. Its message says what
is missing: `'Planet' does not contain a definition for 'WidestMoon'`.

```csharp exec
id: one-method-several-moves-1--solar-system
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
id: one-method-several-moves-1-program--solar-system
expect: CS1061
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.WidestMoon());
```

```inputs
jupiter.WidestMoon()
new Planet("Earth", new List<int> { 3475 }).WidestMoon()
new Planet("Mars", new List<int> { 22, 12 }).WidestMoon()
```

```hint
after: 2 errors
What does the method need to remember as it looks at each width? That
is the storing move. What should it start as, before the loop looks at
anything?
```

```hint
after: 3 errors
title: the method's first line
A method that gives back a whole number says so before its name:
`public int WidestMoon()`. Its last line is `return`, with the value it
gives back.
```

```solution
var jupiter = new Planet("Jupiter", new List<int> { 3643, 3122, 5268, 4821 });
Console.WriteLine(jupiter.WidestMoon());

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
}
---
It prints 5268: Ganymede, the widest moon in the solar system. The
solution writes `Planet` again, below its program *(rule 4)*, and C# uses
this one in place of yours. `best` starts as the first width, so the
method works for moons of any size. `Moons.Max()` gives the same answer
in one line: it looks at every width, as this loop does. What should a
planet with no moons, such as Venus, return? Try
`new Planet("Venus", new List<int>())` and see what happens.
```

</div>

<div class="dl-world" data-world="your-own">

Give a class in your world a list: the scores in a game, the fish in a
net, the heights of the trees in a forest. Can you write a method that
looks at each item in the list and chooses? It might find the largest,
the smallest, or how many pass a test of your own. Write the class in the
first cell, and a program that uses it in the second. Your class from
[Classes and objects](lesson:objects-and-classes) is saved in the last
cell of that page, if you want to copy it here and give it a list.

```csharp exec
id: one-method-several-moves-1--your-own
// My class, with a list, and a method that looks at each item and chooses.
```

```csharp exec
id: one-method-several-moves-1-program--your-own
// My program: one object made from my class, and a call to the method.
```

</div>

## Looking back

Every method on this page was built from storing, sequence, selection and
iteration. A class did not add a fifth move. It added a second place to
store a value: in a field, on the object, where the value lasts from one
method call to the next. In the method you wrote, which variables should
last, and which should disappear when the method ends?

A challenge: a probe burns its fuel in steps of 10 kg, for as long as it
has at least 10 kg left. Can you write `BurnsLeft()`, which counts how
many burns it can make, with a `while` loop? And can you count them and
leave the probe's fuel as it was?

C# has one more loop, `do`...`while`. It checks its condition at the end
of each pass, not at the start, so its lines always run at least once:

```csharp
do
{
    // the lines to repeat
}
while (condition);
```

Can you write `BurnsLeft()` with `do`...`while` too? Does it give the same
count for Pioneer, which starts with less than 10 kg? In one file, C#
wants the statements first and the classes after them, so the class comes
last here.

```csharp challenge
var juno = new Probe("Juno", 75);
var pioneer = new Probe("Pioneer", 5);
Console.WriteLine(juno.BurnsLeft());
Console.WriteLine(juno.Fuel);
Console.WriteLine(pioneer.BurnsLeft());

class Probe
{
    public string Name;
    public int Fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public int BurnsLeft()
    {
        int burns = 0;
        // Repeat while there are at least 10 kg left.
        return burns;
    }
}
```

Everything on this page runs here, on the page, and nothing in it needs
Visual Studio. Any program cell can be downloaded as a Visual Studio
project, and it prints the same there. Visual Studio is the subject of
the next page.

Next, the [practice page](lesson:the-moves-you-already-know-practice) has
more problems on the four moves inside a class, and three from earlier
pages. After it, [Visual Studio: the tools around your code](lesson:the-tools-around-your-code)
is about the mistakes that hide inside methods, and the tools that help
you find them.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Iteration statements: for, foreach, do, and while*. C#
language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements>.
This is the official description of C#'s loops, `do`...`while` among
them, with more of what each one can do than this page shows.

Microsoft. *Declaration statements*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/declarations>.
This page shows how C# makes a local variable, and when you can write
`var` in place of a type.
