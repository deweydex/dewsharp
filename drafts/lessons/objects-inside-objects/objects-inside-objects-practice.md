---
title: "Composition: practice"
version: 2026.09.27.1
from: objects-inside-objects-practice
practice_for: objects-inside-objects
---

# Composition: practice

This page has problems on classes that hold other objects, and on
choosing between "is a" and "has a", and three from earlier pages.
Several have more than one good answer, and the answers say which one
they chose, and why. Try each problem before you open anything under it,
and run the cells to test your guesses.

One cell on this page is meant not to compile. When that happens,
nothing is broken: the message is part of the answer.

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
id: one-crew-member-two-rovers-2
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

`40 40`. Neither rover holds a copy of Ada. A list of objects holds a
*reference* to each one: a value that says where the object is, not the
object itself. Both lists hold a reference to the one `CrewMember`
object, so a change to her is seen by both.

In the real world, one person cannot be in two rovers, so a `Board`
method might refuse someone already on board another rover. A closer look
after this page, on class and struct, asks when C# copies an object and
when it does not.

</details>

## 2. Gold in the vault

`Treasure` here is a record, as on
[Designing classes](lesson:from-a-description-to-classes): one line, with
a name and an amount of gold. A room can hide treasure. Can you give
`Room` a `Gold()` method that returns the total gold of every treasure
hidden in it?

The program calls `Gold()`, so it does not compile until `Room` has that
method, and that is expected. Write the method in the first cell, and then
run the program.

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
id: gold-in-the-vault-2
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
`62`, and a room with no treasure gives 0. The room asks each treasure
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
or as a class? What would change your mind?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A record is enough while samples only hold facts:
`record Sample(string Name, int Depth, bool HasIce);`. A class is useful
when a rule arrives (a depth is never negative) or a question does (was
it dug from deeper than 50 cm?). A record can have a method too, so a
question alone does not need a class. A rule that every sample must keep
is the stronger reason. Both answers work today. What to avoid is the
same rule written again in every place that makes a sample.

</details>

## 6. Hero or monster: child class or flag?

A game has heroes and monsters. One design has `class Hero : Character`
and `class Monster : Character`. Another has one `Character` class with a
field `Side`, of an enum type with the two values `Side.Hero` and
`Side.Monster`. A spell can turn a monster into a hero. Which design
needs less work for the spell?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The flag works better here. The spell changes one field. With child
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
A program that asks every `Bird` to fly gets "cannot fly" from a method
it expected to fly, as `AreaAtDoubleWidth` on the tutorial page got a
square's area. It is the square and the rectangle again.

The closer look on "is a" gave one fix: a parent that promises less,
`Bird` with no `Fly`, and `class FlyingBird : Bird` for the birds that
do. An interface gives a second: only the birds that fly keep a promise
such as `ICanFly`, with `Fly()` in it, and a penguin does not.

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
anyone can read `Fuel`. For a probe in flight, both give the same answer.
Why ask?

<details class="dl-answer"><summary>answer</summary>

For Philae, after it has landed, they differ. Philae has 40 kg, so
`30 <= philae.Fuel` is `true`, but `philae.CanBurn(30)` is `false`: a
lander that has landed burns nothing. `CanBurn` is the promise each probe
keeps, with every rule of its own class. A mission that compares the
fuel itself knows only one rule, and it misses every rule that a kind of
probe adds.

C# stops a caller from reaching a private field, as it stopped
`juno._fuel` on the Encapsulation page. It cannot stop a caller from
writing a rule again, in its own code, instead of asking.

</details>

## 10. From earlier: a child with no parent's constructor

From [Inheritance: one class built on another](lesson:one-parent-many-children).
A gas giant is a planet with rings, or without. The program makes Saturn,
and prints what it knows.

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
- It does not compile
  - `GasGiant`'s constructor must run one of `Planet`'s constructors.
```

<details class="dl-answer"><summary>why</summary>

It does not compile: `error CS7036: There is no argument given that
corresponds to the required parameter 'name' of 'Planet.Planet(string)'`.
A child's constructor always runs one of its parent's constructors first.
With no `: base(...)`, C# runs the one that takes no values, and `Planet`
has none. `: base(name)`, after the gas giant's constructor, runs
`Planet`'s constructor with the name, and then the program prints `True`
and `Saturn`.

In Python, the same classes run: the program prints `True`, and stops
with an error only when it asks for the name.

</details>
