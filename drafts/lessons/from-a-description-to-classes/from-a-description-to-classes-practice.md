---
title: "Designing classes: practice"
version: 2026.09.27.1
from: from-a-description-to-classes-practice
practice_for: from-a-description-to-classes
---

# Designing classes: practice

This page has problems on turning a description into classes, on enums,
and three from earlier pages. Most have more than one good answer. The
answers under them say what was chosen, and why. Try each problem before
you open anything under it.

Some cells on this page are meant not to compile, or to stop with an
exception. When that happens, nothing is broken: the message is part of
the answer.

## 1. Class or field?

A library's description says: "Each book has a title, an author and a due
date. Members borrow books, and a member may have at most five at once."

For each of these, which of the two would you choose?

- A book's title: a field, or a class of its own?
- A member: a class of its own, or a field of `Book`?
- A due date: a field, or a class of its own?

<details class="dl-answer"><summary>why</summary>

A title is one value, so it is a field, of type `string`. A member knows
things (a name, the books borrowed) and keeps a rule (at most five), so a
member needs a class. A due date is one value, so it is a field too. C#
already has a type for dates, `DateTime`, which can answer questions such
as how many days lie between two dates. So a due date can stay a field,
of type `DateTime`, even if the library starts to charge a fine for each
day a book is late.

</details>

## 2. Nouns on a bus

> A bus company runs buses on routes. Each route has a number and a list
> of stops. Each bus has a driver and seats for 50. A passenger taps a
> card to board, and the card's balance pays the fare.

Which nouns would you make into classes? Write your cards before you open
the answer.

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

`Route` (a number and its stops; it could answer "does this route stop
here?"), `Bus` (a route, a driver, and the rule of 50 seats), and `Card`
(a balance, and the rule that a fare needs enough of it). The driver and
the stop are names, kept as fields, until they need to do something. The
passenger is interesting. In this description, the card does everything
a passenger does. Another good answer makes `Passenger` a class that has
a card.

</details>

## 3. Whose rule is it?

"A book can be borrowed by one member at a time." Which class is the most
natural home for that rule: `Member`, `Book` or `Library`?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

`Book` is one good home. A `Borrow(Member member)` method on the book
can refuse when the book is already on loan, and every loan passes
through it. `Library` is another good answer, if the library handles
every loan. `Member` would need to ask every other member, and that is a
sign that the rule belongs somewhere else.

</details>

## 4. A card with nothing to do

A design has a colour that knows a red, a green and a blue value, and
does nothing. Here it is as a record: a type whose only job is to hold
values. What will the program print?

```csharp exec
id: a-card-with-nothing-to-do-1
file: Colour.cs
record Colour(int Red, int Green, int Blue);
```

```csharp exec
id: a-card-with-nothing-to-do-2
var orange = new Colour(255, 128, 0);
Console.WriteLine(orange);
```

```predict
type: choice

What will it print?

- Colour
  - An object of a class with no `ToString()` prints as its type's name.
- Colour { Red = 255, Green = 128, Blue = 0 }
  - A record prints its values.
- 255, 128, 0
  - It prints the three numbers it was given.
```

It prints `Colour { Red = 255, Green = 128, Blue = 0 }`. C# gives every
record a `ToString()` of its own, which shows every value it holds.

Would you keep the colour as a record, or make it a class?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

A record, today: it only holds three numbers. It needs a class when it
keeps a rule (each value from 0 to 255) or answers a question (how
bright is it? what is its opposite?). A record can have methods too, so
either one can work. A class is the usual choice when a type has rules
to keep.

</details>

## 5. One of a fixed list?

Which of these would you make an enum: a type with a fixed list of named
values?

- the name of a rover;
- the kind of rock in a sample: basalt, clay, sandstone, and so on;
- the day of the week;
- the depth a sample was dug from.

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

- A rover's name can be any text, and the list is not fixed. It is a
  `string`.
- The kind of rock depends on the mission. If the geologists choose from
  a fixed list, it can be an enum, and the compiler checks every value.
  If they may name a new kind of rock at any time, it is a `string`.
- The day of the week is a fixed list of seven. .NET already has an enum
  for it, `DayOfWeek`, with values from `DayOfWeek.Sunday` to
  `DayOfWeek.Saturday`.
- A depth is a number, so it is an `int` or a `double`.

</details>

## 6. A crew with an engineer

Mission control adds a rule: a rover may not leave the base without an
engineer on board. Before `Rover` can keep that rule, it needs to answer a
question: `HasEngineer()`. The first cell has the roles and a record for
a crew member, and the second has `Rover`, with `HasEngineer()` still a
skeleton.

```csharp exec
id: a-crew-with-an-engineer-1
file: CrewMember.cs
enum Role
{
    Commander,
    Geologist,
    Engineer
}

record CrewMember(string Name, Role Role);
```

```csharp exec
id: a-crew-with-an-engineer-2
file: Rover.cs
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
        if (_crew.Count == 3)
        {
            Console.WriteLine($"Refused: {Name} has a crew of three.");
            return;
        }
        _crew.Add(member);
    }

    public bool HasEngineer()
    {
        throw new NotImplementedException();
    }
}
```

Run the program. It stops with `NotImplementedException`, which is
expected: the method has no body yet. Can you write `HasEngineer()` in
the `Rover` cell, and run the program again?

```csharp exec
id: a-crew-with-an-engineer-3
expect: exception
var dune = new Rover("Dune");
dune.Board(new CrewMember("Ada", Role.Commander));
dune.Board(new CrewMember("Alan", Role.Engineer));
Console.WriteLine(dune.HasEngineer());
```

```inputs
dune.HasEngineer()
new Rover("Crater").HasEngineer()      // a rover with no crew
```

```hint
after: 2 errors
What does `HasEngineer()` need to look at, one crew member at a time?
When can it return `true` at once? And when does it know that the answer
is `false`?
```

```solution
var dune = new Rover("Dune");
dune.Board(new CrewMember("Ada", Role.Commander));
dune.Board(new CrewMember("Alan", Role.Engineer));
Console.WriteLine(dune.HasEngineer());

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
        if (_crew.Count == 3)
        {
            Console.WriteLine($"Refused: {Name} has a crew of three.");
            return;
        }
        _crew.Add(member);
    }

    public bool HasEngineer()
    {
        foreach (CrewMember member in _crew)
        {
            if (member.Role == Role.Engineer)
            {
                return true;
            }
        }
        return false;
    }
}
---
`True` for the Dune, and `false` for a rover with no crew. The loop
returns `true` at the first engineer it finds. It reaches
`return false;` only when no crew member is an engineer. `member.Role ==
Role.Engineer` compares two values of the enum, as `==` compares two
numbers.
```

## 7. A skeleton that does not fit

This skeleton was written from cards. Run the program. Which card was
missing a responsibility?

```csharp exec
id: a-skeleton-that-does-not-fit-1
file: Route.cs
class Route
{
    public int Number;
    public List<string> Stops;

    public Route(int number, List<string> stops)
    {
        Number = number;
        Stops = stops;
    }
}
```

```csharp exec
id: a-skeleton-that-does-not-fit-2
file: Bus.cs
class Bus
{
    public Route Route;

    public Bus(Route route)
    {
        Route = route;
    }

    public void Board()    // one more passenger, up to 50
    {
        throw new NotImplementedException();
    }
}
```

```csharp exec
id: a-skeleton-that-does-not-fit-3
expect: CS1061
var bus = new Bus(new Route(46, new List<string> { "Library", "Station", "Harbour" }));
Console.WriteLine(bus.Route.StopsAt("Station"));
```

```inputs
new Route(46, new List<string> { "Library", "Station" }).StopsAt("Station")
new Route(46, new List<string> { "Library", "Station" }).StopsAt("Harbour")
```

```hint
after: 2 errors
Which class does the message name? What does the program ask that class,
which its card did not say it could answer?
```

```solution
var bus = new Bus(new Route(46, new List<string> { "Library", "Station", "Harbour" }));
Console.WriteLine(bus.Route.StopsAt("Station"));

class Route
{
    public int Number;
    public List<string> Stops;

    public Route(int number, List<string> stops)
    {
        Number = number;
        Stops = stops;
    }

    public bool StopsAt(string stop)
    {
        return Stops.Contains(stop);
    }
}
---
`True`. The program asks a route "do you stop here?", and the `Route`
card did not say it could answer. That is what a skeleton is for: it
shows the gap before the real code is written. In C#, it shows it even
earlier, before anything runs: `error CS1061: 'Route' does not contain a
definition for 'StopsAt'`.
```

## 8. One more paragraph

The tutorial's description of the Red Plains mission said little about
the crew. Here is one more paragraph from it. Can you write cards for it,
and then a skeleton, with a program that makes one object of each class?

> Each rover carries a crew of up to three. A crew member has a name and
> a role, and uses oxygen while the rover travels: 1 litre for every
> 100 m. A rover may not travel if any of its crew would have no oxygen
> left.

The first cell starts with the `Role` enum from the tutorial.

```csharp exec
id: one-more-paragraph-1
enum Role
{
    Commander,
    Geologist,
    Engineer
}

// My skeleton for a rover and its crew
```

```csharp exec
id: one-more-paragraph-2
// My program: one object of each class.
```

```solution
var ada = new CrewMember("Ada", Role.Commander, 50);
var dune = new Rover("Dune");
Console.WriteLine($"{ada.Name}, {ada.Role}, on the {dune.Name}");

enum Role
{
    Commander,
    Geologist,
    Engineer
}

class CrewMember
{
    public string Name;
    public Role Role;
    private int _oxygen;    // litres

    public CrewMember(string name, Role role, int oxygen)
    {
        Name = name;
        Role = role;
        _oxygen = oxygen;
    }

    public void Breathe(int litres)
    {
        throw new NotImplementedException();
    }

    public bool HasOxygenFor(int litres)
    {
        throw new NotImplementedException();
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

    public void Board(CrewMember member)    // refuses a fourth crew member
    {
        throw new NotImplementedException();
    }

    public void Travel(int metres)    // asks each crew member HasOxygenFor(metres / 100)
    {
        throw new NotImplementedException();
    }
}
---
One good answer. The oxygen rule changes the card for `CrewMember`: now
it knows its oxygen, and it does something, so it has a reason to be a
class and not a record. `Rover.Travel` asks each crew member the
question, and each crew member answers for itself. The rule about oxygen
is kept with the oxygen.
```

## 9. From earlier: two names for one list

From the practice page of
[Classes and objects](lesson:objects-and-classes-practice).

```csharp exec
id: from-earlier-two-names-for-one-list-1
file: Route.cs
class Route
{
    private List<string> _stops;

    public Route(List<string> stops)
    {
        _stops = stops;
    }

    public int StopCount()
    {
        return _stops.Count;
    }
}
```

```csharp exec
id: from-earlier-two-names-for-one-list-2
var stops = new List<string> { "Library", "Station" };
var route = new Route(stops);
stops.Add("Harbour");
Console.WriteLine(route.StopCount());
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`3`. `stops` and `_stops` are two names for one list, so the program
changed the route without calling any of its methods. A list is not
copied when it is passed to a constructor: the route keeps the same list
the program has. `_stops = new List<string>(stops);` in the constructor
gives the route a copy of its own, and then the program prints `2`.

</details>

## 10. From earlier: one fare for all

From [Methods and overloading](lesson:one-class-many-methods).

```csharp exec
id: from-earlier-one-fare-for-all-1
file: Bus.cs
class Bus
{
    public static int Fare = 2;

    public int Number;

    public Bus(int number)
    {
        Number = number;
    }

    public int Cost(int passengers)
    {
        return passengers * Fare;
    }
}
```

This `Bus` replaces the one from problem 7 (rule 4: a class written
again further down replaces the earlier one). What will the program
print?

```csharp exec
id: from-earlier-one-fare-for-all-2
var bus46 = new Bus(46);
var bus10 = new Bus(10);
Bus.Fare = 3;
Console.WriteLine($"{bus46.Cost(2)} {bus10.Cost(2)}");
```

```predict
type: choice

What will it print?

- 6 6
  - There is one `Fare`, in the class, and both buses read it.
- 4 4
  - Each bus kept the fare it had when it was made.
```

<details class="dl-answer"><summary>why</summary>

`6 6`. `Fare` is a static field, so there is one fare, for the whole
class. Both buses were made before the change, and both read the new
fare. A line that tries to give one bus a fare of its own,
`bus46.Fare = 1;`, does not compile (CS0176): a static field is used
through its class, `Bus.Fare`.

</details>

## 11. From earlier: a rule with a gap

From [Encapsulation: private fields, public methods and properties](lesson:keeping-details-inside-an-object).
This `Card` refuses a fare that it cannot pay.

```csharp exec
id: from-earlier-a-rule-with-a-gap-1
file: Card.cs
class Card
{
    public int Balance { get; private set; }

    public Card(int balance)
    {
        Balance = balance;
    }

    public void Pay(int fare)
    {
        if (fare > Balance)
        {
            Console.WriteLine("Refused: not enough on the card.");
            return;
        }
        Balance = Balance - fare;
    }
}
```

```csharp exec
id: from-earlier-a-rule-with-a-gap-2
var card = new Card(10);
card.Pay(4);
card.Pay(20);
Console.WriteLine(card.Balance);
```

Can you add a line to the program that changes the balance without
calling `Pay`? Try `card.Balance = 50;` first. Then, is there a call to
`Pay` that adds money to the card, when it should only remove money?

<details class="dl-answer"><summary>answer</summary>

`card.Balance = 50;` does not compile: `error CS0272: The property or
indexer 'Card.Balance' cannot be used in this context because the set
accessor is inaccessible`. The `set` is private, so only `Card`'s own
code can change the balance.

The call is harder to see: `card.Pay(-5);` compiles, and it passes the
check, since −5 is not more than the balance. Then `Balance - fare` adds
5, and the balance goes from 6 to 11. A rule in a method only checks the
cases its writer thought of. What one line in `Pay` would refuse a
negative fare?

</details>
