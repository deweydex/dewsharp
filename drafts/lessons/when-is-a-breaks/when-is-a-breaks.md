---
title: "Inheritance: a closer look at \"is a\""
version: 2026.09.27.1
from: when-is-a-breaks
covers: [FOOP-LO3, FOOP-LO7]
---

# Inheritance: a closer look at "is a"

On [Inheritance: one class built on another](lesson:one-parent-many-children),
the first line `class Troll : Character` said "a troll is a character".
The words "is a" are a good guide to when a child class fits. But are they
always enough? Here are two ideas. Both are reasonable, and they cannot
both be true.

**Idea A.** If every X is a Y in real life, or in maths, then
`class X : Y` is a safe child class. A square is a rectangle, so
`class Square : Rectangle` is safe.

**Idea B.** A child class promises to do everything its parent can do,
and to stay what it is. If one of the parent's methods would break the
child's own rule, the child class does not fit, even when "is a" is true
in real life.

## An experiment

Here is a rectangle that can be stretched sideways, and a square built on
it. A square's rule is that its width and its height are the same.

```csharp exec
id: an-experiment-1
file: Rectangle.cs
class Rectangle
{
    public int Width { get; protected set; }
    public int Height { get; protected set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public int Area()
    {
        return Width * Height;
    }

    public virtual void Stretch(int factor)
    {
        Width = Width * factor;
    }
}
```

`Stretch` makes a rectangle wider. It multiplies the width by `factor`, and
the height stays as it was. `Stretch` is `virtual`, so a child class may
override it. The `set` of each side is `protected`, so `Rectangle` and its
child classes can change the sides, and other code can only read them.

```csharp exec
id: an-experiment-2
file: Square.cs
class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }
}
```

`Square` has a constructor and nothing else. It passes the side to
`Rectangle`'s constructor twice: once as the width, and once as the height.
So a new square keeps its rule. This program makes a square with sides of
3, and stretches it by 2.

```csharp exec
id: an-experiment-3
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine($"width {tile.Width} height {tile.Height} area {tile.Area()}");
```

Idea A says the square stays a square: a square is a rectangle, so it can
do whatever a rectangle does. Idea B says `Stretch` changes one side only,
so the square will break its own rule.

```predict
type: choice

What will it print?

- width 6 height 6 area 36
  - This is what idea A predicts: a square stays a square.
- width 6 height 3 area 18
  - This is what idea B predicts: `Stretch` changes one side only.
- Nothing: it does not compile
  - C# does not let a square be stretched sideways.
```

Run it. It prints `width 6 height 3 area 18`. The program compiled with no
error and no warning, and it ran to its last line. `tile` is still a
`Square` object. But its sides are 6 and 3, so it is not a square any
more. The class did not keep its own rule, as idea B predicted.

Why did the compiler not stop it? The compiler checks names and types, and
here every one of them fits. `Square` has a `Stretch` method, because it
gets `Rectangle`'s, and each side is an `int`. The square's rule is
written nowhere in the code. It is only in the class's name, and in what
we know about squares, and the compiler reads neither.

Can you change `Square`, in its cell, so that stretching keeps it square?
Then run the program again. Is the result still something a program that
uses rectangles would expect?

<details class="dl-answer"><summary>one change, and what it costs</summary>

Here is one answer. Yours may be different and work too.

`Square` can have its own `Stretch`, which overrides `Rectangle`'s and
changes both sides:

```csharp
    public override void Stretch(int factor)
    {
        Width = Width * factor;
        Height = Height * factor;
    }
```

It can change `Height`, because the `set` of each side is `protected`.
With this method in `Square`, the program prints
`width 6 height 6 area 36`. Now a square stays square.

But `Rectangle`'s `Stretch` made a promise: the width changes, and the
height stays as it was. A program might stretch every rectangle in a
`List<Rectangle>`, to make a row of them twice as wide. With this
`Square`, it gets squares that are also twice as tall. The child keeps
its own rule by breaking the parent's promise.

Another way is to give the two classes a parent whose promises they can
both keep, such as a `Shape` with `Area`, and no `Stretch`.

</details>

## Why idea A is easy to believe

Idea A is true in maths. Every square is a rectangle: four right angles,
with opposite sides equal. A square is a rectangle with one more rule: all
four sides are equal. So the sentence "a square is a rectangle" is true,
and it sounds like exactly what inheritance means.

But a square in maths never changes. A square in a program can change,
because it has methods. So "is a" in a program means more than "belongs
to the group". It means "can be used anywhere the parent is used, and
nothing breaks".

In C#, "used anywhere the parent is used" is exact. A variable of type
`Rectangle` can hold a `Square`, and a `List<Rectangle>` can hold squares,
as the `List<Character>` on the page about inheritance held a troll and a
phoenix. The compiler allows it because of `: Rectangle` in the square's
first line. It trusts the promise in that line. Only the person who writes
the child class can check that the child keeps it.

Computer scientists call this rule the *Liskov substitution principle*: an
object of a child class must work anywhere an object of its parent class
works, and nothing may break. *Substitution* means putting one thing in the
place of another, here a child object in the place of a parent object. The
principle is named after Barbara Liskov, who described it in 1987.

## Where else it happens

A penguin is a bird. Here is a `Bird` class with a method that every bird
in this program is meant to have. `Fly` is `virtual`, so a child class may
override it.

```csharp exec
id: where-else-it-happens-1
file: Bird.cs
class Bird
{
    public virtual string Fly()
    {
        return "flies away";
    }
}
```

```csharp exec
id: where-else-it-happens-2
file: Penguin.cs
class Penguin : Bird
{
    public override string Fly()
    {
        return "cannot fly";
    }
}
```

This program puts a bird and a penguin in one list, and asks each of them
to fly. What will it print?

```csharp exec
id: where-else-it-happens-3
var birds = new List<Bird> { new Bird(), new Penguin() };
foreach (Bird bird in birds)
{
    Console.WriteLine(bird.Fly());
}
```

It prints `flies away`, then `cannot fly`. It compiles, and it runs. But a
program that tells every bird to fly when a cat comes cannot move the
penguin away. Is `class Penguin : Bird` a good child class here? What
would you change about `Bird`?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

In this program, `Bird` promises that every bird can fly, and a penguin
cannot keep that promise. `Penguin` has a `Fly` method, but the method
does not fly. So `Penguin` breaks its parent's promise, as the square did.
A penguin is a bird in real life, but it cannot be used everywhere a
`Bird` is used in this program.

One change is to remove `Fly` from `Bird`, so that `Bird` promises only
what every bird in the program can do. The birds that fly get a class of
their own, `class FlyingBird : Bird`, with `Fly` in it. `Penguin` stays a
child of `Bird`. The program that moves the birds away from the cat keeps
them in a `List<FlyingBird>`. Now each class keeps every promise of its
parent.

The compiler can help now, because the promise is in the types. A penguin
is not a `FlyingBird`, so a line that puts a penguin in a
`List<FlyingBird>` does not compile. The compiler says that it
`cannot convert from 'Penguin' to 'FlyingBird'`.

</details>

In both answers, the parent promises less: a `Shape` with only `Area`,
and a `Bird` with no `Fly`. A `Shape` like that needs no code of its own,
only a promise that every shape has an `Area`. C# has a kind of type for
exactly that, called an *interface*: a list of methods that a class
promises to have, with no code in them. The next page, on interfaces,
writes one.

## Where to read more

Barbara Liskov won the Turing Award for 2008, one of the highest prizes in
computer science. Her 1987 talk, *Data Abstraction and Hierarchy*, is where
the principle comes from:
<https://doi.org/10.1145/62138.62141>. It is written for computer
scientists, and its examples are not in C#.
