---
title: "Inheritance: one class built on another"
version: 2026.09.27.1
from: one-parent-many-children
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
  your-own: A world of your own, with a class you design and grow page by page.
covers: [FOOP-LO3, FOOP-LO6, FOOP-LO7]
---

# Inheritance: one class built on another

In a game, heroes and monsters share most of what they know: a name,
health, and a way to take damage. A troll is a character too, with a
thicker hide: it takes half damage. Do we have to copy the whole
`Character` class to write a `Troll`?

Here is `Character` as it stood at the end of
[Methods and overloading](lesson:one-class-many-methods), in the game
world: its third version. The cells below use it (rule 2: a class written
in a cell can be used by the cells below it).

```csharp exec
id: character-so-far
file: Character.cs
class Character
{
    public static int MaxHealth = 10;

    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
    }

    public void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

## A class built on another class

`Troll` below has a constructor and nothing else. It has no `ToString`,
no `TakeDamage` and no `Heal` of its own. The program under it makes a
troll called Grog, hits it for 7, and prints it. What will the first line
print?

```csharp exec
id: a-class-built-on-another-class-1
file: Troll.cs
class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }
}
```

```csharp exec
id: a-class-built-on-another-class-2
var grog = new Troll("Grog", 10);
grog.TakeDamage(7);
Console.WriteLine(grog);
grog.Heal(2);
Console.WriteLine(grog);
```

```predict
type: choice

What will the first line print?

- Grog (health 3)
  - A troll uses `Character`'s `TakeDamage` and `ToString`.
- Troll
  - Printing an object prints its class's name, and `Troll` has no `ToString` of its own.
- Nothing: it does not compile
  - `Troll` has no `TakeDamage` of its own.
```

It prints `Grog (health 3)`, then `Grog (health 5)`. The first line of
the class, `class Troll : Character`, says "a troll is a character". This
is *inheritance*: a way to build a new class on a class that already
exists. The new class gets everything the existing class has, and changes
or adds only what is different.

Two names help us talk about it:

- The *parent class* is the existing class, here `Character`. It gives
  its fields, properties and methods to the new class, with no new code.
- The *child class* is the new class, here `Troll`. Its first line has
  its own name, a colon, and the name of its parent.

Microsoft's documentation says *base class* for the parent and *derived
class* for the child. In C#, a class can have only one parent class. A
parent can have many children.

One thing does not pass from a parent to a child: its constructors. A
child class writes its own. The part `: base(name, health)`, after the
troll's constructor, means: first run the parent's constructor, with these
values. The word `base` means the parent class. `Character`'s constructor
stores the name and the health, as it does for every character. Then the
troll's own constructor runs, and its body is empty, because a troll has
nothing more to store. It is like `: this(...)` on
[Methods and overloading](lesson:one-class-many-methods), which runs
another constructor of the same class.

What happens without it? Can you delete the troll's constructor, all
three lines of it, and press Check? What does the compiler say? Then write
the constructor again before you continue.

<details class="dl-answer"><summary>what the compiler says</summary>

It does not compile: `error CS7036: There is no argument given that
corresponds to the required parameter 'name' of
'Character.Character(string, int)'`. A class with no constructor of its
own gets an empty one from C#, and that one runs the parent's constructor
with no values. `Character`'s constructor needs a name and a health, so
the compiler refuses.

</details>

### A method of its own

A troll has a thicker hide, so it takes half damage. For that, `Troll`
needs a `TakeDamage` of its own. Here is one. It passes half the amount to
`Character`'s own `TakeDamage`: `base.TakeDamage(...)` means "run the
parent's `TakeDamage`". This cell is meant to fail. Press Check, and read
the message.

```csharp exec
id: a-method-of-its-own-1
file: Troll.cs
expect: CS0506
class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

It does not compile: `error CS0506: 'Troll.TakeDamage(int)': cannot
override inherited member 'Character.TakeDamage(int)' because it is not
marked virtual, abstract, or override`. An *inherited member* is a field,
property or method that a child class gets from its parent. The message
says that a child cannot replace one of its parent's methods unless the
parent allows it.

In C#, the parent decides. A *virtual* method is a method that a child
class may replace. The parent marks it with the word `virtual`. The child
replaces it with a method of the same name, marked `override`. Replacing
a parent's method in a child class is called *overriding*. (`abstract` is
another way to allow it, which a later page meets.)

You have written `override` before, in `public override string
ToString()`. Every class in C# has a parent, even when it names none: a
class called `object`. `object` has a virtual method, `ToString`, which
gives the name of the object's class. That is why a program prints
`Character` for a character whose class has no `ToString` of its own.
Each `ToString` you have written overrides the one in `object`.

Here is `Character` again, with one word added: `TakeDamage` is now
`virtual`. It replaces the `Character` above for the cells below it
(rule 4: a class written again further down replaces the earlier one).

```csharp exec
id: a-method-of-its-own-2
file: Character.cs
class Character
{
    public static int MaxHealth = 10;

    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
    }

    public virtual void TakeDamage(int amount)    // changed
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

And here is the same troll, under the new `Character`:

```csharp exec
id: a-method-of-its-own-3
file: Troll.cs
class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

The program is the same as the first one on this page. Grog has 10
health, and a hit of 7. What do you think it prints now?

```csharp exec
id: a-method-of-its-own-4
var grog = new Troll("Grog", 10);
grog.TakeDamage(7);
Console.WriteLine(grog);
grog.Heal(2);
Console.WriteLine(grog);
```

It prints `Grog (health 7)`, then `Grog (health 9)`.

Why does the troll call `base.TakeDamage`, and not change `Health`
itself? First, it cannot: `Health` has a `private set`, and *private*
means that only `Character`'s own code can use it. A child is a different
class. Second, and more important: `Character.TakeDamage` already keeps
two rules. A negative hit is refused, and health stops at 0. When the
troll uses it, trolls keep both rules too, and nobody writes either rule
again. Can you add `grog.TakeDamage(-8);` to the program? What does it
print?

<details class="dl-answer"><summary>What each line does</summary>

- `class Troll : Character` makes a class whose parent is `Character`.
- `public Troll(string name, int health) : base(name, health)` is the
  troll's constructor. `: base(name, health)` runs `Character`'s
  constructor first, and it stores the name and the health.
- `public override void TakeDamage(int amount)` gives trolls their own
  `TakeDamage`, in the place of `Character`'s.
- `base.TakeDamage(amount / 2)` runs `Character`'s own `TakeDamage`, with
  half the amount. `/` between two whole numbers gives a whole number,
  and drops the fraction, so 7 / 2 is 3.
- `grog.Heal(2)`: `Troll` has no `Heal`, so C# uses the one in
  `Character`. `Console.WriteLine(grog)` uses `Character`'s `ToString` in
  the same way.
- `grog.TakeDamage(-8)` passes -4 to `Character`'s `TakeDamage`, which
  prints `Refused: damage cannot be negative.` and leaves Grog's health
  as it was.

</details>

## A limit of its own

A troll can also be tougher: up to 20 health, where a person has 10.
`Character` keeps its limit in a static field, `MaxHealth`. So here the
troll has a static field of its own with the same name, set to 20. Grog
has 18 health, and heals 5. What will it print?

```csharp exec
id: a-limit-of-its-own-1
file: Troll.cs
class Troll : Character
{
    public static int MaxHealth = 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

```csharp exec
id: a-limit-of-its-own-2
var grog = new Troll("Grog", 18);
grog.Heal(5);
Console.WriteLine(grog);
```

```predict
type: choice

What will it print?

- Grog (health 20)
  - 18 and 5 is 23, and a troll stops at its own 20.
- Grog (health 23)
  - Nothing stops a troll at 20.
- Grog (health 10)
  - `Heal` reads a limit that is not the troll's.
```

It prints `Grog (health 10)`: healing *lowered* Grog from 18 to 10. The
compiler warned about it: `warning CS0108: 'Troll.MaxHealth' hides
inherited member 'Character.MaxHealth'. Use the new keyword if hiding was
intended.` A *warning* is a message about code that compiles, but may not
do what you meant. It does not stop the program, but it often points at a
mistake.

Here is the last line of `Heal`, in the `Character` cell above:

```csharp
        Health = Math.Min(MaxHealth, Health + amount);
```

`Heal` is written in `Character`, so there `MaxHealth` means
`Character.MaxHealth`, and that is always 10. The troll's 20 is a second
field, which `Heal` never reads. This is what *hides* means in the
warning: the child has a member with the same name as a member of its
parent, and the parent's code still uses its own. The word `new`, which
the warning suggests, would only say that the hiding is on purpose. It
would not change what `Heal` reads.

A static field belongs to one class, and a child cannot override it. A
property can be virtual, as a method can. So the limit becomes a virtual
property. A property whose `get` only returns a value can be written on
one line, with `=>`:

```csharp
public virtual int MaxHealth => 10;
```

It means the same as `public virtual int MaxHealth { get { return 10; }
}`. It has no `set`, so no code can change it. Here is `Character` with
that one line changed. It replaces the one above (rule 4).

```csharp exec
id: a-limit-of-its-own-3
file: Character.cs
class Character
{
    public virtual int MaxHealth => 10;    // changed

    public string Name;
    public int Health { get; private set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
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

    public void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

And here is the troll with its own limit, marked `override`:

```csharp exec
id: a-limit-of-its-own-4
file: Troll.cs
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

It is the same program: Grog has 18 health, and heals 5. Where does Grog
stop now?

```csharp exec
id: a-limit-of-its-own-5
var grog = new Troll("Grog", 18);
grog.Heal(5);
Console.WriteLine(grog);
```

It prints `Grog (health 20)`. `Heal` reads `MaxHealth`, and now each
object gives its own answer: 10 for a character, and 20 for a troll.

So when a child class might need a value of its own, the value is a
virtual property, not a static field. One thing changes for code outside the
class. A static field is read through the class, as
`Character.MaxHealth`. A property belongs to each object, so it is read
through an object, as `grog.MaxHealth`.

## Another kind of creature

`Troll` overrides `TakeDamage`, and still calls the parent's version
through `base`. A phoenix is different. A character is *down* when its
health is 0. When a phoenix is down, it can still heal: it rises from its
own ashes. `Character.Heal` refuses anyone who is down, so a phoenix
cannot use it. `Phoenix` needs a `Heal` of its own, which changes `Health`
itself.

This cell is meant to fail. Press Check. There are two messages this
time.

```csharp exec
id: another-kind-of-creature-1
file: Phoenix.cs
expect: CS0272
class Phoenix : Character
{
    public Phoenix(string name, int health) : base(name, health)
    {
    }

    public override void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

It does not compile. Read the first message first.

- `error CS0506: 'Phoenix.Heal(int)': cannot override inherited member
  'Character.Heal(int)' because it is not marked virtual, abstract, or
  override`. You have met this one: `Heal` is still not virtual.
- `error CS0272: The property or indexer 'Character.Health' cannot be
  used in this context because the set accessor is inaccessible`. The
  *set accessor* is the `set` part of a property. It is private, so only
  `Character`'s own code can use it, and `Phoenix` is a different class,
  even though it is a child.

So `Character` needs two changes. `Heal` becomes `virtual`. And `Health`
needs a `set` that a child class can use, but a caller cannot. That is
what the access modifier `protected` does. A *protected* member is one
that the code of its own class, and the code of every child class, can
use. Code anywhere else cannot. On
[Encapsulation](lesson:keeping-details-inside-an-object) you met the access
modifiers `public` and `private`. `protected` is a third, made for child
classes.

Here is `Character` with both changes. It is its fourth version, and the
rest of this page uses it.

```csharp exec
id: another-kind-of-creature-2
file: Character.cs
class Character
{
    public virtual int MaxHealth => 10;

    public string Name;
    public int Health { get; protected set; }    // changed

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
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

    public virtual void Heal(int amount)    // changed
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

And here is the same phoenix, under it:

```csharp exec
id: another-kind-of-creature-3
file: Phoenix.cs
class Phoenix : Character
{
    public Phoenix(string name, int health) : base(name, health)
    {
    }

    public override void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

Ember is a phoenix with 10 health. A hit of 15 takes all of Ember's
health, and then Ember heals 5. What will the last line print?

```csharp exec
id: another-kind-of-creature-4
var ember = new Phoenix("Ember", 10);
ember.TakeDamage(15);
Console.WriteLine($"{ember} {ember.IsDown()}");
ember.Heal(5);
Console.WriteLine(ember);
```

```predict
type: choice

What will the last line print?

- Ember (health 5)
  - The phoenix's own `Heal` has no check for being down.
- Ember (health 0)
  - Nobody who is down can be healed.
```

It prints `Ember (health 0) True`, then `Ember (health 5)`. The two
overrides are two different decisions:

- `Troll.TakeDamage` calls `base.TakeDamage`, because the parent's rules
  still apply to a troll. Only the amount changes.
- `Phoenix.Heal` does not call `base.Heal`, because the parent's rule is
  the one thing a phoenix breaks. It writes its own line instead, and
  keeps the rule that still applies: never above `MaxHealth`.

`Phoenix` does not override `TakeDamage` at all. A phoenix is hurt like
anyone else, so it keeps its parent's version. A parent can have many
children, each changing something different, and none of them changes the
others.

`protected` lets a phoenix change `Health`. Can the program change it
too? Can you add the line `ember.Health = 50;` to the program? What does
the compiler say?

<details class="dl-answer"><summary>what the compiler says</summary>

It does not compile: `error CS0272: The property or indexer
'Character.Health' cannot be used in this context because the set
accessor is inaccessible`. It is the same message the phoenix had before
`protected`. The program is not `Character`, and it is not a child of
`Character`, so its code cannot use a protected `set`. Only a
character's own methods, and a child's, can change its health.

</details>

## Many kinds, one loop

A person, a troll and a phoenix are all characters. So a
`List<Character>` can hold all three, and one loop can treat them alike.
Each one takes a hit of 12, and then heals 4. What will each line print?

```csharp exec
id: many-kinds-one-loop-1
var party = new List<Character>
{
    new Character("Ada", 10),
    new Troll("Grog", 20),
    new Phoenix("Ember", 10)
};
foreach (Character member in party)
{
    member.TakeDamage(12);
    member.Heal(4);
    Console.WriteLine(member);
}
```

It prints the refusal for Ada, then `Ada (health 0)`, `Grog (health 18)`
and `Ember (health 4)`. The same two lines did three different things:

- Ada lost all her health. She was down, so she could not be healed.
- Grog took half the hit, 6, and went from 20 to 14. Then he healed to
  18.
- Ember was down too, and healed anyway.

In the loop, `member` is a `Character` variable, and the compiler knows
nothing more about it. But when the program runs, each object runs the
version of the method that belongs to its own class: a troll's
`TakeDamage`, and a phoenix's `Heal`. That is what `virtual` and
`override` make possible. This is *polymorphism*: one method name that
works across several classes, where each object runs its own version. The
loop never asks which kind of character it has.

### Your turn: your class, fourth version

This is the fourth version of your class. The third is on
[Methods and overloading](lesson:one-class-many-methods). It gets at most
one child class, and one sentence, as a comment, that says why the child
is a kind of the parent. A class with no child is an answer too, if you
can say why. Is there a static field that a child might want its own
value for? Then it can become a virtual property, as `MaxHealth` did.

<div class="dl-world" data-world="game">

A healer is a character who can also heal someone else. Can you give
`Healer` a method `HealOther(Character other, int amount)`? A healer who
is down cannot heal anyone. The parent of `Healer` is the fourth version
of `Character`, from the section above, so `Character` does not need to
change.

The program calls `HealOther`, so it does not compile until `Healer` has
that method, and that is expected. Write the method in the `Healer` cell,
and then run the program again.

```csharp exec
id: your-class-4--game
file: Healer.cs
class Healer : Character
{
    public Healer(string name, int health) : base(name, health)
    {
    }
}
```

```csharp exec
id: your-class-4-program--game
expect: CS1061
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, 5);
Console.WriteLine(ada);
```

```inputs
ada.ToString()
mira.ToString()
```

```hint
after: 2 errors
Which of `Character`'s methods already does the healing, and keeps its
rules? How does one object ask another object to do something?
```

```hint
after: 3 errors
title: the method's first line
`HealOther` returns nothing, so its first line is
`public void HealOther(Character other, int amount)`. Inside it,
`IsDown()` asks about the healer, and `other.Heal(amount)` asks the other
character to heal.
```

```solution
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, 5);
Console.WriteLine(ada);

class Healer : Character
{
    // A healer is a character who can also heal someone else.

    public Healer(string name, int health) : base(name, health)
    {
    }

    public void HealOther(Character other, int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        other.Heal(amount);
    }
}
---
`Ada (health 9)`. `HealOther` does not change Ada's health itself: it
asks Ada to `Heal`, so Ada's own rules decide, down or not, and her own
`MaxHealth`. A healer is still a character: it can take damage, and be
healed, with nothing new written. And `other` is a `Character`, so a
healer can heal a troll or a phoenix too. Which `Heal` runs for each of
them?

In one file, C# needs the program's statements before any class, so the
class comes after them here. This copy of `Healer` replaces the one above
for this program (rule 4).
```

</div>

<div class="dl-world" data-world="solar-system">

A lander is a probe that can land, and once it has landed, it burns no
more fuel. Can you finish `Lander`, with a `Land()` method? Which one
method of `Probe` would you override, so that `Burn` refuses after
landing without being written again? And what must `Probe` say first?

The first cell holds `Probe` as
[Methods and overloading](lesson:one-class-many-methods) left it. The
second holds the start of `Lander`. Change both, and then run the program
in the third cell. The program calls `Land()`, so it does not compile
until `Lander` has that method, and that is expected.

```csharp exec
id: your-class-4--solar-system
file: Probe.cs
class Probe
{
    public static int TankSize = 100;

    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine("Refused: not enough fuel for that burn.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: your-class-4-lander--solar-system
file: Lander.cs
class Lander : Probe
{
    public Lander(string name, int fuel) : base(name, fuel)
    {
    }
}
```

```csharp exec
id: your-class-4-program--solar-system
expect: CS1061
var philae = new Lander("Philae", 40);
philae.Burn(10);
philae.Land();
philae.Burn(5);
Console.WriteLine(philae);
```

```inputs
philae.ToString()
philae.CanBurn(5)
new Lander("Beagle 2", 40).CanBurn(5)
```

```hint
after: 2 errors
`Burn` asks `CanBurn(kg)` before it burns. For a lander, whose
`CanBurn` would you like that to be? What should a lander that has landed
answer?
```

```hint
after: 3 errors
title: what a lander remembers
A lander needs a field that remembers whether it has landed, such as
`private bool _landed = false;`, and `Land()` sets it to `true`. If the
compiler says CS0506, which word does `CanBurn` need in `Probe`?
```

```solution
var philae = new Lander("Philae", 40);
philae.Burn(10);
philae.Land();
philae.Burn(5);
Console.WriteLine(philae);

class Probe
{
    public virtual int TankSize => 100;

    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public virtual bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}

class Lander : Probe
{
    // A lander is a probe that can land, and once it has landed, it burns no more.

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
---
A refusal, then `Philae (fuel 30 kg)`. `Lander` overrides `CanBurn`
only. `Burn` is written in `Probe`, and it asks `CanBurn(kg)`. For a
lander, that runs `Lander`'s version: the parent's method calls the
child's. That works because `CanBurn` is `virtual` in `Probe`.

Three lines of `Probe` changed. `CanBurn` is `virtual`. The refusal now
says "cannot burn 5 kg now", because "not enough fuel" is no longer the
only reason. And `TankSize` is a virtual property now, as `MaxHealth` is
on this page, ready for a child with a bigger tank.

In one file, C# needs the program's statements before any class, so the
classes come after them here. These copies replace the ones above for
this program (rule 4).
```

</div>

<div class="dl-world" data-world="your-own">

Is there a kind of your thing that is a special case: it does one thing
differently, or one thing more? Write at most one child class, with a
comment of one sentence that says why it is a kind of your class. Which
of your class's methods does the child override, and which word does the
parent need for that? If no kind fits your world, write that sentence
instead. That is a design decision too.

Your class is saved on the
[Methods and overloading](lesson:one-class-many-methods) page, in the
first cell of your own world. Copy it into the first cell here to start,
and write your child class in the same cell.

```csharp exec
id: your-class-4--your-own
// My class, fourth version: at most one child class, and why.
```

```csharp exec
id: your-class-4-program--your-own
// My program: a list that holds my class and its child, and one loop.
```

</div>

## Looking back

`Troll.TakeDamage` called `base.TakeDamage`, and `Phoenix.Heal` did not
call `base.Heal`. What did each one keep of its parent, and what did each
one replace?

A challenge: a zombie is a character that rises again, once. The first
time a hit brings its health to 0, it rises again with 5 health. Can you
write `Zombie`'s `TakeDamage`, and keep every rule that `Character`'s
`TakeDamage` already has? In one file, C# needs the program's statements
before any class, so the classes come last here.

```csharp challenge
var mort = new Zombie("Mort", 10);
mort.TakeDamage(12);
Console.WriteLine(mort);
mort.TakeDamage(12);
Console.WriteLine(mort);

class Zombie : Character
{
    private bool _risen = false;

    public Zombie(string name, int health) : base(name, health)
    {
    }
}

// Character, fourth version, from this page.
class Character
{
    public virtual int MaxHealth => 10;

    public string Name;
    public int Health { get; protected set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
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

    public virtual void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

The [practice page](lesson:one-parent-many-children-practice) has more
problems on child classes, overriding and `base`, and three from earlier
pages.

The next page is a closer look at `virtual` and `override`. It asks what
happens when a child's method has the same name as its parent's, with no
`virtual` and no `override`.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Inheritance: derive types to create more specialized
behavior*. C# fundamentals.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance>.
This page says what a derived class gets from its base class, and what it
does not get (its constructors). It also shows that every class is built
on `object`.

Microsoft. *Polymorphism*. C# fundamentals.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism>.
This page puts several kinds of shape in one `List<Shape>`, and draws
each one with its own `Draw`, as this page's loop does with characters.
It also covers hiding a member with `new`, which this page only names.

Microsoft. *The base keyword*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/base>.
This page shows both uses of `base`: calling the parent's version of a
method, and choosing which of the parent's constructors runs.
