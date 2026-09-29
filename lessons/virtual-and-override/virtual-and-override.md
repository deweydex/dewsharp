---
title: "Overriding: a closer look at virtual and override"
version: 2026.09.28.1
from: one-parent-many-children
covers: [FOOP-LO3]
---

# Overriding: a closer look at virtual and override

On [Inheritance: one class built on another](lesson:one-parent-many-children),
a troll took half damage. The troll's `TakeDamage` said `override`, and
`Character`'s `TakeDamage` said `virtual`. When `Character`'s method did
not say `virtual`, the troll with `override` did not compile (CS0506). So
what happens when a child class has a method with the same name as its
parent's, with no `virtual` and no `override`? Here are two ideas. Both
are reasonable, and they cannot both be true.

**Idea A.** A method in a child class replaces the parent's method with
the same name. `virtual` and `override` only say so, for the people who
read the code. Without them, a troll still runs the troll's `TakeDamage`,
every time.

**Idea B.** The child's method replaces the parent's only when the
parent's method says `virtual` and the child's says `override`. Without
those words, a troll has two methods called `TakeDamage`, and the type of
the variable that holds the troll decides which one runs.

## An experiment

Here is a smaller `Character` than the one on the inheritance page. It
has only a name, health, `ToString` and `TakeDamage`, and `TakeDamage`
has no `virtual`.

```csharp exec
id: an-experiment-1-character
file: Character.cs
class Character
{
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

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}
```

And here is a troll with a `TakeDamage` of its own, with no `override`.
It passes half the amount to `Character`'s `TakeDamage`, through `base`,
as the troll on the inheritance page did.

```csharp exec
id: an-experiment-1-troll
file: Troll.cs
class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

The program makes two trolls, each with 10 health, and hits each of them
for 7. Grog is held in a `Troll` variable. Brak is held in a `Character`
variable. A variable whose type is a parent class can hold an object of a
child class, because a troll is a character.
[The loop on the inheritance page](lesson:one-parent-many-children#many-kinds-one-loop)
did the same: `member` was a `Character` variable, and one of the objects
it held was a troll.

So two types matter here. Every variable has a type, fixed when the
variable is made. Every object has a class, fixed when `new` makes it.
The variable `brak` has the type `Character`, and the object it holds is
a `Troll`. This page writes the type of each variable, and not `var`,
because that type is what the experiment is about.

Both ideas agree about Grog: a troll in a `Troll` variable runs the
troll's `TakeDamage`, and takes half the hit. For Brak, idea A says the
same. Idea B says that a `Character` variable finds `Character`'s
`TakeDamage`, so Brak takes the whole hit.

```csharp exec
id: an-experiment-1-program
Troll grog = new Troll("Grog", 10);
Character brak = new Troll("Brak", 10);
grog.TakeDamage(7);
brak.TakeDamage(7);
Console.WriteLine(grog);
Console.WriteLine(brak);
```

```predict
type: choice

What will the second line print?

- Brak (health 7)
  - This is what idea A predicts: a troll runs the troll's `TakeDamage`, whatever the variable.
- Brak (health 3)
  - This is what idea B predicts: a `Character` variable finds `Character`'s `TakeDamage`.
- Nothing: it does not compile
  - The troll has a method with the same name as its parent's, and neither method says `virtual` or `override`.
```

Run it. It prints `Grog (health 7)`, then `Brak (health 3)`, as idea B
predicts. Brak is a troll, and it took the whole hit of 7.

The program ran to its last line, but the compiler did say something.
Above the output, the page shows a warning:

```console
Troll.cs(7,17): warning CS0108: 'Troll.TakeDamage(int)' hides inherited member 'Character.TakeDamage(int)'. Use the new keyword if hiding was intended.
```

A *warning* is a message about code that compiles, but may not do what
you meant. It does not stop the program. Line 7 of `Troll.cs` is the
troll's `TakeDamage`. An *inherited member* is a field, property or
method that a child class gets from its parent. *Hides* means that the
troll now has two methods called `TakeDamage`: `Character`'s, and its
own. Through a `Troll` variable, C# finds the troll's own method, which
hides `Character`'s. But `Character`'s method is still there, and
through a `Character` variable, C# finds it. The troll on the
inheritance page had the same warning for its static field `MaxHealth`.

Why does the type of the variable decide? Without `virtual`, the
compiler chooses which `TakeDamage` each line runs, before the program
runs. It uses only the type of each variable. `brak` is a `Character`
variable, so `brak.TakeDamage(7)` runs `Character`'s method. The
compiler does not ask what `brak` will hold when the program runs.

With `virtual`, the choice waits until the program runs. Then C# asks
the object itself for its class. If that class has an `override` of the
method, C# runs it.

Can you make Brak take half the hit too, by adding one word to
`TakeDamage` in each of the two classes above? Then run the program
again.

```hint
after: 2 runs
Which word does a parent's method need, so that a child may replace it?
Which word does the child's method need, to say that it replaces it?
```

```solution
title: with virtual and override
Troll grog = new Troll("Grog", 10);
Character brak = new Troll("Brak", 10);
grog.TakeDamage(7);
brak.TakeDamage(7);
Console.WriteLine(grog);
Console.WriteLine(brak);

class Character
{
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

    public virtual void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}

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
---
It prints `Grog (health 7)`, then `Brak (health 7)`, and there is no
warning. The solution adds `virtual` to `Character`'s `TakeDamage`, and
`override` to the troll's. Now a troll has one `TakeDamage`, its own, and every
variable finds it, whatever the variable's type.

The solution writes `Character` and `Troll` again, below its program
(rule 4: a class written again further down replaces the earlier one),
and C# uses these in place of yours. In one file, C# wants the
statements first and the classes after them.
```

## Why idea A is easy to believe

Idea A is how Python works. Here is the same troll in Python:

```python
class Troll(Character):
    def take_damage(self, amount):
        super().take_damage(amount // 2)
```

In Python, `class Troll(Character)` makes `Character` the troll's parent,
and `super()` does the job of `base`. `amount // 2` is half the amount,
as a whole number.

Python has no `virtual` and no `override`. A method in a child class
always replaces the parent's method with the same name. A Python
variable has no type of its own: only the object has a class. So Python
has only the object to ask, and the troll's method runs every time.

In C#, a variable has a type too. So two types could decide which method
runs: the type of the variable, and the class of the object. In C#, a
method is not virtual unless it says so, and for a method that is not
virtual, the type of the variable decides. `virtual` gives the choice to
the object.

Often, the two ideas give the same answer. When the variable's type is
the object's own class, as it was for Grog, both ideas predict the
troll's method. The difference appears only when a variable whose type
is the parent holds a child object. That happens in three common places:
a `List<Character>` that holds a troll, a loop variable of type
`Character`, and a parameter of type `Character`. And those are exactly
the places where a program treats many kinds of character alike, as the
loop on the inheritance page did.

Why does C# ask for two words? The parent says `virtual`, because the
person who writes the parent knows which of its methods a child may need
to change. The child says `override`, so that anyone who reads the child
sees that it replaces something. There is a third reason too. A parent
class can gain a method, years later, with the same name as a method in
your child class. In C#, your method does not replace the parent's
method unless you say so. Your method hides it, and the compiler warns
you the next time you compile. Then you decide what your method should
do. The Microsoft page in *Where to read more* shows an example.

## Where else it happens

### Hiding on purpose

The warning suggested a word: *Use the new keyword if hiding was
intended.* A *keyword* is a word that C# keeps for its own use, such as
`class`, `int` or `new`. `new` in front of a method says that the method
hides its parent's method on purpose. It is the same word that makes an
object, with a different job.

Here is the troll from the experiment again, with `new` on its
`TakeDamage`. It replaces the troll above for the cells below it (rule
4: a class written again further down replaces the earlier one).

```csharp exec
id: hiding-on-purpose-1-troll
file: Troll.cs
class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public new void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

The program is the same as the experiment's. What do you think `new`
changes?

```csharp exec
id: hiding-on-purpose-1-program
Troll grog = new Troll("Grog", 10);
Character brak = new Troll("Brak", 10);
grog.TakeDamage(7);
brak.TakeDamage(7);
Console.WriteLine(grog);
Console.WriteLine(brak);
```

It prints `Grog (health 7)`, then `Brak (health 3)`: Brak took the whole
hit again, as it did in the experiment without `virtual` and
`override`. The only difference is that there is no warning. `new` did
not change which method runs. It told the compiler that the hiding is on
purpose, so the compiler had nothing to warn about.

So when would you want `new`? You will not want it often. A method that
hides its parent's method makes one object behave in two ways, and the
type of a variable decides which. `new` is for a parent class that you
cannot change, which gains a method with the same name as one of yours.
Such a class is often in a *library*: a set of classes that someone else
wrote, for many programs to use. When you see CS0108, and you can change
the parent class, the two words you usually want are `virtual` and
`override`.

### A warning as a clue

Every class in C# has a parent, even a class that names none: `object`.
`object` has a virtual method, `ToString`, which gives the name of the
object's class. The inheritance page showed this, and every `ToString`
you have written overrides the one in `object`.

Here is a class whose `ToString` has no `override`. It is the last class
on this page, because the compiler warns about it, and a warning shows in
every cell below the class that causes it.

```csharp exec
id: a-warning-as-a-clue-1-potion
file: Potion.cs
class Potion
{
    public string Effect;

    public Potion(string effect)
    {
        Effect = effect;
    }

    public string ToString()
    {
        return $"a potion of {Effect}";
    }
}
```

The program prints a potion in three ways: with `ToString()`, on its
own, and inside a line of text.

```csharp exec
id: a-warning-as-a-clue-1-program
Potion potion = new Potion("healing");
Console.WriteLine(potion.ToString());
Console.WriteLine(potion);
Console.WriteLine($"You find {potion}.");
```

```predict
type: choice

What will the second line print?

- a potion of healing
  - `Console.WriteLine` shows an object by calling its `ToString`.
- Potion
  - `Console.WriteLine` receives the potion as an `object`.
- Nothing: it does not compile
  - The potion's `ToString` has no `override`.
```

It prints `a potion of healing`, then `Potion`, then `You find Potion.`
The warning this time is a different one:

```console
Potion.cs(10,19): warning CS0114: 'Potion.ToString()' hides inherited member 'object.ToString()'. To make the current member override that implementation, add the override keyword. Otherwise add the new keyword.
```

This is the case the experiment did not try: the parent's method says
`virtual`, and the child's does not say `override`. The result is the
same as with neither word. A potion has two methods called `ToString`:
`object`'s, and its own, which only hides `object`'s.

`potion.ToString()` uses a `Potion` variable, so C# finds the potion's
own `ToString`. `Console.WriteLine` was written long before
`Potion`, and it receives the potion in a parameter of type `object`.
Through that parameter, C# finds `object`'s `ToString`. That method is
virtual, so C# searches `Potion` for an `override` of it, and finds
none. So it runs `object`'s own `ToString`, and the second line is the
class's name. The text in `$"..."` is built by code that was also
written before `Potion`, and it finds `object`'s `ToString` in the same
way.

The warning is a clue, and it names the fix: *add the override keyword*.
Can you add it to the potion's `ToString`, and run the program again?

```solution
title: with override
Potion potion = new Potion("healing");
Console.WriteLine(potion.ToString());
Console.WriteLine(potion);
Console.WriteLine($"You find {potion}.");

class Potion
{
    public string Effect;

    public Potion(string effect)
    {
        Effect = effect;
    }

    public override string ToString()
    {
        return $"a potion of {Effect}";
    }
}
---
It prints `a potion of healing` twice, then
`You find a potion of healing.`, and there is no warning. With
`override`, a potion has one `ToString`, and `Console.WriteLine` finds
it through its `object` parameter.

The solution writes `Potion` again, below its program (rule 4), and C#
uses this one in place of yours.
```

Problem 10 on the
[practice page for inheritance](lesson:one-parent-many-children-practice)
was this case too: a rover whose `Describe` did not say `override`, and
a loop that held the rover in a `Vehicle` variable.

### The words, side by side

Here is every case from this page and the inheritance page. *The parent*
means the parent's method, and *the child* means the child's method with
the same name.

| The parent says | The child says | What happens |
|---|---|---|
| `virtual` | `override` | It compiles, with no warning. The child's method replaces the parent's, and every variable finds the child's. |
| no word | no word | It compiles, with warning CS0108. The child's method hides the parent's, and the type of the variable decides which one runs. |
| `virtual` | no word | It compiles, with warning CS0114. The child's method hides the parent's, as in the row above. |
| no word | `override` | It does not compile: CS0506, as on the [inheritance page](lesson:one-parent-many-children). |
| `virtual`, or no word | `new` | It compiles, with no warning. The child's method hides the parent's, on purpose. |

Only the first row replaces the parent's method. In each of the other
rows that compile, a variable whose type is the parent still finds the
parent's method.

Everything on this page runs here, in the browser, and nothing needs
Visual Studio. In Visual Studio, a program with a warning compiles and
runs too, and the warning is in the Error List (**View**, then **Error
List**).

Next, [Inheritance: a closer look at "is a"](lesson:when-is-a-breaks)
builds a square on a rectangle, and asks when a child class fits at all.

## Where to read more

Microsoft. *Knowing When to Use Override and New Keywords*. C#
programming guide.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/knowing-when-to-use-override-and-new-keywords>.
It does this page's experiment with two classes, `BaseClass` and
`DerivedClass`, and a variable `bcdc` whose type is `BaseClass` and
which holds a `DerivedClass` object. It gives `BaseClass` a second
method, with the same name as a method in `DerivedClass`, and the
compiler warns, as it did for the troll. Then it tries `new` and
`override` side by side. It says *base class* for a parent and *derived
class* for a child. Its programs start with `class Program` and
`static void Main`, the older form that
[Visual Studio: the tools around your code](lesson:the-tools-around-your-code)
showed.
