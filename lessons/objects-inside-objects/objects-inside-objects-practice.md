---
title: "Composition: practice"
version: 2026.09.28.1
from: objects-inside-objects-practice
practice_for: objects-inside-objects
---

# Composition: practice

This page has problems on classes that hold other objects, and on
choosing between "is a" and "has a", and three from earlier pages.
Several have more than one answer that works, and the answers say which
one they chose, and why. Try each problem before you open anything under
it, and run the cells to test your guesses. Some cells are meant not to
compile, and the problem says so.

The cells follow the rules of the road from the lesson. A class written in
a cell can be used by the cells below it, and variables stay in their
cell.

## 1. One crew member, two rovers

A crew member has a name and oxygen. A rover keeps a list of the crew on
board, and can say how much oxygen they have in all.

```csharp exec
id: one-crew-member-two-rovers-1
file: CrewMember.cs
class CrewMember
{
    public string Name;
    public int Oxygen = 100;

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Rover
{
    public string Name;
    private List<CrewMember> _crew = new List<CrewMember>();

    public Rover(string name)
    {
        Name = name;
    }

    public void Board(CrewMember member)
    {
        _crew.Add(member);
    }

    public int OxygenLeft()
    {
        int total = 0;
        foreach (CrewMember member in _crew)
        {
            total = total + member.Oxygen;
        }
        return total;
    }
}
```

Ada boards the Dune, and then the Crater. After that, her oxygen falls
to 40.

```csharp exec
id: one-crew-member-two-rovers-1-program
var ada = new CrewMember("Ada");
var dune = new Rover("Dune");
var crater = new Rover("Crater");
dune.Board(ada);
crater.Board(ada);
ada.Oxygen = 40;
Console.WriteLine($"{dune.OxygenLeft()} {crater.OxygenLeft()}");
```

```predict
type: choice

What will it print?

- 40 40
  - Both rovers hold the same crew member.
- 100 40
  - The Dune took Ada on board before her oxygen changed.
- 40 100
  - Only the last rover sees the change.
```

<details class="dl-answer"><summary>why</summary>

It prints `40 40`. Neither rover holds a copy of Ada. A list of objects holds a
*reference* to each one: a value that says where the object is, not the
object itself. Both lists hold a reference to the one `CrewMember`
object, so a change to her is seen by both.

In the real world, one person cannot be in two rovers, so a `Board`
method might refuse someone already on board another rover. *Two names,
one object*, the closer look after the tutorial, asks when C# copies an
object and when it does not.

</details>

## 2. Gold in the vault

`Treasure` here is a record, as on
[Designing classes](lesson:from-a-description-to-classes): one line, with
a name and an amount of gold. A room can hide treasure. Can you give
`Room` a `Gold()` method that returns the total gold of every treasure
hidden in it?

The program calls `Gold()`, so it is meant not to compile until `Room`
has that method. Its message says what is missing: `'Room' does not
contain a definition for 'Gold'`. Write the method in the first cell, and
then run the program.

```csharp exec
id: gold-in-the-vault-1
file: Room.cs
record Treasure(string Name, int Gold);

class Room
{
    public string Name;
    private List<Treasure> _treasure = new List<Treasure>();

    public Room(string name)
    {
        Name = name;
    }

    public void Hide(Treasure treasure)
    {
        _treasure.Add(treasure);
    }
}
```

```csharp exec
id: gold-in-the-vault-1-program
expect: CS1061
var vault = new Room("Vault");
vault.Hide(new Treasure("crown", 50));
vault.Hide(new Treasure("ring", 12));
Console.WriteLine(vault.Gold());
```

```inputs
vault.Gold()
new Room("Hall").Gold()    // a room with no treasure
```

```hint
after: 2 errors
What does the method need to remember as it looks at each treasure? What
should that start as, before the loop looks at anything?
```

```solution
var vault = new Room("Vault");
vault.Hide(new Treasure("crown", 50));
vault.Hide(new Treasure("ring", 12));
Console.WriteLine(vault.Gold());

class Room
{
    public string Name;
    private List<Treasure> _treasure = new List<Treasure>();

    public Room(string name)
    {
        Name = name;
    }

    public void Hide(Treasure treasure)
    {
        _treasure.Add(treasure);
    }

    public int Gold()
    {
        int total = 0;
        foreach (Treasure treasure in _treasure)
        {
            total = total + treasure.Gold;
        }
        return total;
    }
}
---
It prints `62`, and a room with no treasure gives 0. The room asks each treasure
for its gold, and knows nothing else about treasure.

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Room` replaces the one above
for this program (rule 4). `Treasure` is not written again, so the record
in the cell above is used.
```

## 3. Is, or has?

For each sentence, which word fits: *is* or *has*?

- A mission ___ rovers.
- A rocket ___ engines.
- A dwarf planet ___ a body in space.
- A library ___ books.
- A scientist ___ an astronaut, on one mission at least.

<details class="dl-answer"><summary>why</summary>

Has, has, is, has, and the last is the hard one: a scientist is an
astronaut only while they fly. The tutorial's answer was that an
astronaut *has* roles, so the sentence to trust is "an astronaut has the
role of scientist".

</details>

## 4. A fleet that is a rover

A *fleet* is a group of rovers that drive together. Someone writes
`class Fleet : Rover`, with the `Rover` of problem 1, so that a fleet can
say how much oxygen its crews have, as a rover can. What problems would
that cause?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A fleet would get a name, a crew and an `OxygenLeft` of its own. Its crew
would be one more list, beside the rovers, and `Board` would put a person
on the fleet, not on any rover in it. So `OxygenLeft` would count only the
people who boarded the fleet itself. "A fleet is a rover" is false, and
every inherited member shows it.

C# gives a sign too. If `Rover`'s only constructor takes a name, a fleet's
constructor has to pass one to it with `: base(...)`, as the star system
on the tutorial page had to invent a distance for `Planet`.

A fleet *has* rovers: a `List<Rover>`. Its own `OxygenLeft()` can ask
each rover for its `OxygenLeft()`, and add the answers.

</details>

## 5. A sample: record or class?

The Red Plains mission records rock samples: a name, the depth it was dug
from, and whether it holds ice. Would you write each sample as a record,
or as a class? What would make you choose the other?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A record is enough while samples only hold facts:
`record Sample(string Name, int Depth, bool HasIce);`. A class is useful
when a rule arrives (a depth is never negative) or a question does (was
it dug from deeper than 50 cm?). A record can have a method too, so a
question alone does not need a class. A rule that every sample must keep
is the stronger reason. Both answers work today. Avoid one thing: the
same rule written again in every place that makes a sample.

</details>

## 6. Hero or monster: child class or flag?

A game has heroes and monsters. One design has `class Hero : Character`
and `class Monster : Character`. Another has one `Character` class with a
field `Side`, of an enum type with the two values `Side.Hero` and
`Side.Monster`. A spell can make a monster a hero. Which design
needs less work for the spell?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The flag needs less work for the spell: it changes one field. With child
classes, the program would have to make a new `Hero` and put it
everywhere the monster was, because an object cannot change its class.

If heroes and monsters behave very differently (heroes carry things,
monsters guard rooms), child classes keep each set of methods in one
place, and the spell costs more work. It depends on which change the
game needs more.

</details>

## 7. A bird that cannot fly

```csharp
class Bird
{
    public virtual string Fly()
    {
        return "flies away";
    }
}

class Penguin : Bird
{
    public override string Fly()
    {
        return "cannot fly";
    }
}
```

A penguin is a bird. Which of these describes the problem with this
design?

- Nothing: overriding `Fly` is what overriding is for.
- `Bird` promises that every bird can fly, and a penguin breaks the
  promise.
- `Penguin` should not have a parent at all.

<details class="dl-answer"><summary>why</summary>

`Bird` promises that every bird can fly, and a penguin breaks the promise.
A program that asks every `Bird` to fly expects each one to fly away, and
the penguin answers "cannot fly". On the tutorial page, the square broke
what `AreaAtDoubleWidth` expected of a rectangle in the same way. It is
the square and the rectangle again.

[Inheritance: a closer look at "is a"](lesson:when-is-a-breaks) gave one
fix: a parent that promises less, `Bird` with no `Fly`, and
`class FlyingBird : Bird` for the birds that do. An interface gives a
second: only the birds that fly keep a promise such as `ICanFly`, with
`Fly()` in it, and a penguin does not.

</details>

## 8. From earlier: whose rule?

From [Designing classes](lesson:from-a-description-to-classes). "A room
may hold at most six characters." Would that rule belong in `Room` or in
`Character`?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

In `Room`. The room knows how many are inside, and `Enter` is the one
method that every character must call to enter. A character would have
to ask the room anyway.

</details>

## 9. From earlier: asking, not reaching

From [Encapsulation](lesson:keeping-details-inside-an-object). On the
tutorial page, `Mission.ReadyFor(kg)` asks each probe
`probe.CanBurn(kg)`. It could have compared `kg <= probe.Fuel` itself:
anyone can read `Fuel`. Why ask?

Here are `Probe` and `Lander` from the tutorial, with only the members
this problem needs.

```csharp exec
id: from-earlier-asking-not-reaching-1
file: Probe.cs
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public virtual bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }
}

class Lander : Probe
{
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

The program compares Philae's fuel with 30 kg, and then asks Philae, once
in flight and once after it has landed. Which line do you think will
show a difference?

```csharp exec
id: from-earlier-asking-not-reaching-1-program
var philae = new Lander("Philae", 40);
Console.WriteLine($"In flight: {30 <= philae.Fuel} {philae.CanBurn(30)}");
philae.Land();
Console.WriteLine($"Landed: {30 <= philae.Fuel} {philae.CanBurn(30)}");
```

<details class="dl-answer"><summary>answer</summary>

It prints `In flight: True True`, then `Landed: True False`. In flight,
both give the same answer. After Philae has landed, they differ: it still
has 40 kg, so the comparison says `True`, but `CanBurn(30)` says `False`,
because a lander that has landed burns nothing. `CanBurn` is the promise
each probe keeps, with every rule of its own class. A mission that
compares the fuel itself knows only one rule, and it misses every rule
that a kind of probe adds.

C# stops a caller from reaching a private field, as it stopped
`juno._fuel` on the Encapsulation page. It cannot stop a caller from
writing a rule again, in its own code, instead of asking.

</details>

## 10. From earlier: a child with no parent's constructor

From [Inheritance: one class built on another](lesson:one-parent-many-children).
A gas giant is a planet with rings, or without. The program makes Saturn,
and prints what it knows. What do you think will happen? Whatever it does
when you run it, nothing is broken: what happens is the answer.

```csharp exec
id: from-earlier-a-child-with-no-parents-fields-1
expect: CS7036
var saturn = new GasGiant("Saturn", true);
Console.WriteLine(saturn.Rings);
Console.WriteLine(saturn.Name);

class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }
}

class GasGiant : Planet
{
    public bool Rings;

    public GasGiant(string name, bool rings)
    {
        Rings = rings;
    }
}
```

```predict
type: choice

What will happen?

- It prints True, then Saturn
  - `GasGiant` gets the name from `Planet`.
- It prints True, then an empty line
  - The name was never stored.
- Nothing: it does not compile
  - `GasGiant`'s constructor must run one of `Planet`'s constructors.
```

```solution
var saturn = new GasGiant("Saturn", true);
Console.WriteLine(saturn.Rings);
Console.WriteLine(saturn.Name);

class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }
}

class GasGiant : Planet
{
    public bool Rings;

    public GasGiant(string name, bool rings) : base(name)
    {
        Rings = rings;
    }
}
---
It prints `True`, then `Saturn`. `: base(name)`, after the gas giant's
constructor, runs `Planet`'s constructor with the name first.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS7036: There is no argument given that
corresponds to the required parameter 'name' of 'Planet.Planet(string)'`.
A child's constructor always runs one of its parent's constructors first.
With no `: base(...)`, C# runs the one that takes no values, and `Planet`
has none. The solution under the cell adds `: base(name)`, so that
`Planet`'s constructor runs with the name.

In Python, the same classes run, and the program stops with an error
only at the line that asks for the name.

</details>
