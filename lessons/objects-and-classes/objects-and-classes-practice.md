---
title: "Classes and objects: practice"
version: 2026.09.27.1
from: objects-and-classes-practice
practice_for: objects-and-classes
---

# Classes and objects: practice

This page has problems on classes, objects and printing them, and three
from earlier pages. Try each problem before you open anything under it,
and run the cells to test your guesses. Some cells are meant not to
compile, and the problem says so.

The cells follow the rules of the road from the lesson. A class written in
a cell can be used by the cells below it, and variables stay in their
cell.

## 1. Two characters

```csharp exec
id: one-thing-many-parts-1
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

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}
```

```csharp exec
id: one-thing-many-parts-1-program
Character ada = new Character("Ada", 10);
Character grace = new Character("Grace", 10);
ada.TakeDamage(4);
Console.WriteLine(grace.Health);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`10`. Only Ada was hit. Inside `TakeDamage`, `Health` is the health of the
object that the method was called on, so `ada.TakeDamage(4)` changes
Ada's health and never touches Grace's.

</details>

## 2. A class of your own making

Can you write an `Asteroid` class? It stores a name and a width, in
kilometres. Write it in the first cell. The program in the second cell
makes an asteroid called Vesta, 525 km wide.

The program is meant not to compile until your class exists. Its message
says that the compiler does not know the name `Asteroid` yet.

```csharp exec
id: a-class-of-your-own-making-1
// Your Asteroid class here
```

```csharp exec
id: a-class-of-your-own-making-1-program
expect: CS0246
Asteroid vesta = new Asteroid("Vesta", 525);
Console.WriteLine($"{vesta.Name} {vesta.Width}");
```

```inputs
vesta.Name
vesta.Width
new Asteroid("Pallas", 512).Width
```

```hint
after: 2 errors
Look at `Character` in problem 1. What are its fields, and what does its
constructor do with the values it is given?
```

```solution
Asteroid vesta = new Asteroid("Vesta", 525);
Console.WriteLine($"{vesta.Name} {vesta.Width}");

class Asteroid
{
    public string Name;
    public int Width;

    public Asteroid(string name, int width)
    {
        Name = name;
        Width = width;
    }
}
---
`Vesta 525`. Most constructors have this shape: the class's name, the
values that a new object needs to start with, and a line that stores each
one in a field.
```

## 3. What `this` is for

Inside `TakeDamage`, the line `Health = Math.Max(0, Health - amount);`
doesn't say whose health it means. How does C# know? And what is `this`?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A method like `TakeDamage` is called through an object, as in
`grace.TakeDamage(5)`. Inside the method, `Health` is that object's field.
`this` is C#'s name for that object, so `this.Health` means the same as
`Health`. Through it, the method knows whose fields to read and change.
`Math.Max` is called through its class, `Math`, not through an object, so
inside it there is no `this`.

Problem 10 has a slip that writing `this.` would have caught.

</details>

## 4. A probe in a list

```csharp exec
id: objects-and-classes-practice-printing-1
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }
}
```

```csharp exec
id: objects-and-classes-practice-printing-1-program
Probe voyager = new Probe("Voyager", 70);
Console.WriteLine(voyager);

List<Probe> probes = new List<Probe> { voyager };
Console.WriteLine(probes);
```

```predict
type: choice

What will the second line show?

- [Voyager (fuel 70 kg)]
  - `ToString` gives the text for an object wherever it is.
- System.Collections.Generic.List`1[Probe]
  - A list is an object too, and has its own `ToString`.
```

<details class="dl-answer"><summary>why</summary>

`Voyager (fuel 70 kg)`, from the probe's own `ToString`, then
``System.Collections.Generic.List`1[Probe]``. A list's `ToString` gives
only its class's name: a `List` of `Probe`. To show what is in it,
`string.Join(", ", probes)` joins the text of each object.

</details>

## 5. Code that makes it again

A *record* is a short way to write a class that mostly holds values. This
one line makes a `Probe` with a `Name` and a `Fuel`. C# writes its
constructor and its `ToString` for it. It replaces the `Probe` class from
problem 4 for the cells below it.

```csharp exec
id: code-that-builds-it-again-1
file: Probe.cs
record Probe(string Name, int Fuel);
```

```csharp exec
id: code-that-builds-it-again-1-program
Probe voyager = new Probe("Voyager", 70);
Console.WriteLine(voyager);
```

```predict
type: choice

What will it print?

- Probe
  - That is what an object with no `ToString` of its own shows.
- Probe { Name = Voyager, Fuel = 70 }
  - A record's `ToString` shows its values.
- Nothing: it does not compile
  - The record has no constructor.
```

It prints `Probe { Name = Voyager, Fuel = 70 }`. Can you give the record a
`ToString` of its own, so that it shows `new Probe("Voyager", 70)`: the
code that would make the same probe again?

```inputs
voyager.ToString()
new Probe("Juno", 12).ToString()
```

```hint
A record can have a body in curly brackets, after its first line, with
methods in it, as a class has. How did `ToString` look in problem 4? How
do you put a `"` inside text?
```

```solution
Probe voyager = new Probe("Voyager", 70);
Console.WriteLine(voyager);

record Probe(string Name, int Fuel)
{
    public override string ToString()
    {
        return $"new Probe(\"{Name}\", {Fuel})";
    }
}
---
`new Probe("Voyager", 70)`: the code that would make it again. Inside text,
`\"` is a quote mark that is part of the text, not the end of it.
```

## 6. A dictionary or a class?

A game keeps 30 characters, each with a name and a health, and one rule:
health never goes below 0. The same game keeps a list of 30 place names,
with nothing to check. Which would you keep as a class, and which as a
plain list or dictionary?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

Keep the characters as a class. There is a rule to keep, and a method is
one place to keep it. Keep the place names as a plain list. A name has no
rule and no actions, so a class would only add code. There is room to
disagree here. A place might grow a description, or exits to other places,
and then a class becomes useful.

</details>

## 7. From earlier: a name that is not there

From [Compiler errors](lesson:compiler-errors). This cell uses `Character` from problem 1.

```csharp exec
id: from-earlier-a-name-that-is-not-there-1
expect: CS0103
Character ada = new Character("Ada", 10);
ada.TakeDamage(3);
Console.WriteLine(Ada.Health);
```

```predict
type: choice

What will it print?

- 7
  - Ada had 10 health, and took 3 damage.
- Nothing: it does not compile
  - One name in the program is not quite the name of anything.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS0103: The name 'Ada' does not exist in the
current context`, on line 3. The variable is `ada`, with a small *a*.
C# sees a capital letter and a small letter as different letters, so
`Ada` is a different name, and nothing has that name. Change it to `ada`,
and it prints the health.

</details>

## 8. From earlier: one list, two names

From [Two names, one list](lesson:two-names-one-list).

```csharp exec
id: from-earlier-one-list-two-names-1
List<int> adaHits = new List<int> { 3 };
int count = AddHit(adaHits, 5);
Console.WriteLine(string.Join(", ", adaHits));

int AddHit(List<int> hits, int amount)
{
    hits.Add(amount);
    return hits.Count;
}
```

```predict
type: choice

What will it print?

- 3, 5
  - `hits` and `adaHits` are two names for one list.
- 3
  - The method changed its own copy.
```

<details class="dl-answer"><summary>why</summary>

`3, 5`. The method gets the list itself, not a copy, so `Add` changes the
one list that both names point to. An object passed to a method works the
same way: a method that is given a `Character` can change that character.

</details>

## 9. From earlier: counting with a condition

From [C# for Python programmers](lesson:from-python-to-csharp). Here are the widths of five of Saturn's moons, in
kilometres, rounded. How many are wider than Iapetus, at 1,469 km? Can you
write a loop that counts them?

```csharp exec
id: from-earlier-counting-with-a-condition-1
// Titan, Rhea, Iapetus, Dione and Tethys
List<int> widths = new List<int> { 5150, 1528, 1469, 1123, 1062 };
int wider = 0;

Console.WriteLine(wider);
```

```inputs
wider
```

```hint
Which loop visits each width in turn? What does it do with a width that
is more than 1469?
```

```solution
// Titan, Rhea, Iapetus, Dione and Tethys
List<int> widths = new List<int> { 5150, 1528, 1469, 1123, 1062 };
int wider = 0;
foreach (int width in widths)
{
    if (width > 1469)
    {
        wider = wider + 1;
    }
}
Console.WriteLine(wider);
---
2: Titan and Rhea. Iapetus itself is not wider than 1469, so `>` leaves it
out.
```

## 10. A constructor that stores nothing

This constructor has a slip that the compiler lets through. The program
compiles, and the compiler warns about it. What does it print?

```csharp exec
id: a-constructor-that-stores-nothing-1
file: Moon.cs
class Moon
{
    public string Name;
    public int Width;

    public Moon(string name, int width)
    {
        name = name;
        width = width;
    }
}
```

```csharp exec
id: a-constructor-that-stores-nothing-1-program
Moon io = new Moon("Io", 3643);
Console.WriteLine($"Name: {io.Name}");
Console.WriteLine($"Width: {io.Width}");
```

```predict
type: choice

What will it print?

- Name: Io, and Width: 3643
  - The constructor was given both values.
- no name, and Width: 0
  - The constructor's two lines don't change the fields.
- Nothing: it does not compile
  - Something in the constructor is not right.
```

<details class="dl-answer"><summary>why</summary>

It prints `Name: ` with nothing after it, and `Width: 0`. Inside the
constructor, `name` is the parameter, with a small *n*. So `name = name;`
copies the parameter into itself, and the field `Name` never gets a value.
The compiler warns about it, in a quieter style than an error: `warning
CS1717: Assignment made to same variable; did you mean to assign something
else?`, once for each line. It also warns that the fields are never given
a value (CS0649).

A field that nobody gives a value starts with one of its own: `null` for
text, which shows as nothing, and 0 for a number. A warning never stops a
program, so it is worth reading the warnings when a program runs but does
not do what you expected.

Change the two lines to `Name = name;` and `Width = width;`. Or write
`this.Name = name;`, which says in words that `Name` is the field of this
object. With `this.` in front, the slip can't happen quietly: `this.name`
does not compile, because a `Moon` has no field called `name`.

</details>
