---
title: "Two names, one object: a closer look at class and struct"
version: 2026.09.28.1
from: two-names-one-list
covers: [FOOP-LO1, FOOP-LO8]
---

# Two names, one object: a closer look at class and struct

On the
[practice page for composition](lesson:objects-inside-objects-practice#1-one-crew-member-two-rovers),
Ada boarded two rovers, and then her oxygen fell to 40. Both rovers saw
the change. Neither rover held a copy of Ada: both lists held the one
`CrewMember` object.

So when does C# copy an object, and when does it give the same object a
second name? A rover on Mars keeps its landing site, a place on the map,
in a `Position` variable called `start`. Then the line
`Position here = start;` makes a second variable, for where the rover is
now. Here are two ideas about what that line does.
Both are reasonable, and they cannot both be true.

**Idea A.** `Position here = start;` makes a copy of the position. After
it, there are two positions, and a change to one does not change the
other.

**Idea B.** `Position here = start;` gives the same position a second
name. Nothing is copied. After it, there is one position, and `start` and
`here` are two names for it.

This page writes the type of every variable, and not `var`, because the
type is what the experiment is about.

## An experiment

Here is `Position`, a small class for a place on a map. `X` is how many
kilometres east of the landing site the place is, and `Y` is how many
kilometres north. Its `ToString` gives the two numbers in brackets.

```csharp exec
id: an-experiment-1-position
file: Position.cs
class Position
{
    public int X;    // km east of the landing site
    public int Y;    // km north of the landing site

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

The program keeps the landing site in `start`, and the rover's position in
`here`. Then the rover drives 5 km east.

Idea A says that `here` is a copy, so `start` stays at the landing site.
Idea B says that `start` and `here` are two names for one position, so
`start` moves with the rover.

```csharp exec
id: an-experiment-1-program
Position start = new Position(0, 0);
Position here = start;
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
```

```predict
type: choice

What will the first line print?

- `start is (0, 0)`
  - This is what idea A predicts: two positions.
- `start is (5, 0)`
  - This is what idea B predicts: one position with two names.
- Something else
```

Run it. It prints `start is (5, 0)`, then `here is (5, 0)`, as idea B
predicts. The landing site moved with the rover.

`new` makes an object, and this program uses `new` once. So there is one
`Position` object. `Position here = start;` did not make a second one. It
gave the object a second name, and `here.X = 5;` changed that one object.

Can you change the second line of the program, so that `start` stays at
the landing site?

```hint
after: 2 runs
How many times does the program use `new`? How many positions does that
make?
```

```solution
title: with a second object
Position start = new Position(0, 0);
Position here = new Position(start.X, start.Y);
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
---
Change the second line to
`Position here = new Position(start.X, start.Y);`. It prints
`start is (0, 0)`, then `here is (5, 0)`. `new` makes a second object,
with the same numbers as the first. Now there are two positions, and
`here.X = 5;` changes only the second one.
```

## The same code, with struct

C# has a second way to write a type with fields, a constructor and
methods. A *struct* is a type that is written like a class, with the word
`struct` in place of `class`. Here is `Position` again, as a struct.
Nothing else in it changes. It replaces the class above for the cells
below it. That is rule 4: a class written again further down replaces the
earlier one, and so does a struct with the same name.

```csharp exec
id: the-same-code-with-struct-1-position
file: Position.cs
struct Position
{
    public int X;    // km east of the landing site
    public int Y;    // km north of the landing site

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

The program is the same as the experiment's, line for line. What do you
think changes?

```csharp exec
id: the-same-code-with-struct-1-program
Position start = new Position(0, 0);
Position here = start;
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
```

```predict
type: choice

What will the first line print?

- `start is (0, 0)`
  - `here` is a copy of `start`, as idea A says.
- `start is (5, 0)`
  - The program is the same as before, line for line.
- Nothing: it does not compile
  - A struct is a different kind of type. Can the program use it in the
    same way as the class?
```

Run it. It prints `start is (0, 0)`, then `here is (5, 0)`. This time
it is as idea A says: `here` is a copy, and the landing site stays where
it was. One word changed in the type, and `=` did something different.

## Value types and reference types

So which idea is true? For a class, idea B. For a struct, idea A. The type
decides.

A *reference* is a value that says where an object is in the computer's
memory. A class is a *reference type*: a type whose variables hold a
reference to an object, and not the object itself. `new` makes an object,
and its result is a reference to that object. `Position here = start;`
copies the reference, and not the object. So `start` and `here` hold the
same reference, and there is one position.

A struct is a *value type*: each variable of that type holds its own copy
of the value. When `Position` is a struct, `new Position(0, 0)` gives a
value with two fields, `X` and `Y`, and not a reference. `start` holds
that value itself. `Position here = start;` copies both fields into
`here`. So there are two positions, one in each variable, although the
program uses `new` only once.

![Two drawings of the experiment after here.X = 5. On the left, Position is a class: the variables start and here each hold an arrow, and both arrows point to one object, whose X is 5 and whose Y is 0. On the right, Position is a struct: the variables start and here each hold a position of their own. The one in start has X 0 and Y 0, and the one in here has X 5 and Y 0.](two-names-one-object.svg)

So `=` always copies what the variable after it holds. For a struct, that
is every field. For a class, it is the reference, and the two variables
share one object.

You have met value types before. `int`, `double`, `bool` and `char` are
value types, and in .NET each of them is a struct: `int` is the struct
that .NET calls `Int32`. That is why `int other = width;` copies the
number. An enum, such as `Role` on
[Designing classes](lesson:from-a-description-to-classes), is a value type
too. Arrays, lists, dictionaries, strings, records and every class you
have written are reference types.
[Two names, one list](lesson:two-names-one-list), a closer look in
Programming and Design Principles, does the same experiment with an `int`
and an array.

## Why each idea is easy to believe

Idea A is how numbers behave. `int other = width;` followed by
`other = 7;` never changes `width`, so the habit forms: `=` copies. And
`Position here = start;` looks exactly like `int other = width;`. Nothing
in that line says whether `Position` is a class or a struct. Only the
first line of the type says so, and in a bigger program that line is in
another file. In Visual Studio, rest the mouse pointer on a type's name:
the line that appears says `class` or `struct` before the name. Or click
in the name of a type you wrote, and press F12. Visual Studio opens the
type's file at its first line, as on
[Visual Studio: the tools around your code](lesson:the-tools-around-your-code).

Idea B is how Python works. In Python, `here = start` gives the object a
second name, whatever its type. A reader who knows Python expects idea B
every time, and the struct is the surprise.

So there is some truth in each idea. `=` makes a copy every time, as idea
A says. For a class, what it copies is the reference, so the object gets
a second name, as idea B says. The question to ask is not "does `=`
copy?", but "what does this variable hold: the value itself, or a
reference to an object?"

## Class or struct?

When you write a type, which should it be? Ask whether two of them with
the same values are the same thing.

- Two crew members with the same name and the same oxygen are still two
  people. Every rover that Ada boards must see the same Ada, so
  `CrewMember` is a class. If it were a struct, each rover would hold its
  own copy of Ada, and her oxygen would fall in neither rover.
- Two positions with the same `X` and `Y` are the same place. A copy of a
  position is as good as the first one, so `Position` can be a struct.

Most of the types you write are classes. Microsoft's documentation for C#
says that a struct is for a small type that represents one value, as
`int` does. A position, a colour and a date are examples, and .NET's own
`DateTime` is a struct. It also recommends a struct that cannot change
once it is made. `=` copies a struct, and nothing in the line says so. So
when a struct can change, it is easy to change a copy by mistake. The
`Position` on this page can change, so that the experiment can show the
copy. The next section shows what else that allows.

Look at the classes you have written in your world. Is there one whose
objects are small values, where a copy would be as good as the first?

## Where else it happens

### A struct passed to a method

`Drive` moves a position east. `Position` is still the struct from
*The same code, with struct*, above (rule 4). What do you think the last
line prints? Run it and see.

```csharp exec
id: where-else-it-happens-1
Position here = new Position(0, 0);
Drive(here, 5);
Console.WriteLine($"here is {here}");

void Drive(Position position, int km)
{
    position.X = position.X + km;
}
```

It prints `here is (0, 0)`. The rover did not move. When a method is
called, each parameter gets a copy of its argument's value. This is called
*passing by value*. For a struct, that value is every field, so `position`,
in `Drive`, is a copy of `here`, and `Drive` moved the copy.

With the `Position` class, the value would be a reference, and `Drive`
would move the caller's position. That is how both rovers held the one
Ada, on the practice page for composition. `Board` was given a reference
to her, and stored it in its list.

Can you change `Drive` so that it returns the moved position, and the
program keeps it in `here`?

```hint
after: 2 runs
A method that returns a `Position` has `Position` in front of its name,
where `Drive` has `void`. Which line of the program could store what it
returns?
```

```solution
Position here = new Position(0, 0);
here = Drive(here, 5);
Console.WriteLine($"here is {here}");

Position Drive(Position position, int km)
{
    position.X = position.X + km;
    return position;
}
---
It prints `here is (5, 0)`. `Drive` still moves its own copy, and then
returns it. `here = Drive(here, 5);` stores the moved position in `here`.
For a struct, a method like `Drive` usually has this shape: it returns the
new value, and the caller decides where to keep it.
```

### A list of structs

A list of structs has a surprise of its own. The next cell is meant to
fail. It keeps a rover's path as a list of positions, and tries to move
the last position 3 km north.

```csharp exec
id: where-else-it-happens-2
expect: CS1612
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
path[1].Y = 3;
Console.WriteLine(string.Join(" ", path));
```

It does not compile:

```console
Program.cs(2,1): error CS1612: Cannot modify the return value of 'List<Position>.this[int]' because it is not a variable
```

`List<Position>.this[int]` is C#'s name for the square brackets of a
list, with a whole number inside, as in `path[1]`. A list's square
brackets work like a method: they find the element, and return a copy of
it. That copy is not in any variable, so a change to it would be lost at
once, and nothing would say so. So the compiler refuses the line. With
the `Position` class, the copy is a reference to the object in the list,
so the same line compiles, and it changes the position in the list.

Can you change the program so that the last position moves 3 km north,
and the list keeps the change?

```hint
after: 2 errors
The list gives you a copy. Can you keep that copy in a variable of your
own, change it there, and then store it in the list again with `=`?
```

```solution
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
Position last = path[1];
last.Y = 3;
path[1] = last;
Console.WriteLine(string.Join(" ", path));
---
It prints `(0, 0) (5, 3)`. `Position last = path[1];` copies the element
into a variable, `last.Y = 3;` changes the variable, and `path[1] = last;`
stores the changed copy in the list, in place of the old position.
`path[1] = new Position(5, 3);` gives the same result in one line.
```

<details class="dl-why"><summary>Why does an array of structs allow it?</summary>

With an array in place of the list, `path[1].Y = 3;` compiles, and it
changes the position in the array. An array's square brackets are not
like a method. `path[1]` is the element itself, inside the array, so
there is no copy to lose. Can you check? Change the first line of the
cell above to
`Position[] path = { new Position(0, 0), new Position(5, 0) };`, and run
it.

</details>

Everything on this page runs here, in the browser, and nothing needs
Visual Studio.

Next, [Testing a class](lesson:testing-what-a-class-does) writes tests
that find the mistakes a class hides.

## Where to read more

Microsoft. *The C# type system*. C# fundamentals.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/>.
Its section *Value types and reference types* says in two short
paragraphs what this page's experiment shows: `=` copies the data of a
value type, and gives two variables of a reference type the same object.
Its section *Choose which kind of type* says when to write a struct and
when to write a class, and that most types are classes. It also names the
*managed heap*, a part of the computer's memory, which this page does not
need. Its example uses a `record struct`, a kind of struct that this page
does not use.

Microsoft. *Structure types*. C# language reference.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct>.
The two recommendations in *Class or struct?*, above, are from this page,
which says *structure type* for a struct. Its first paragraphs, before
the first heading, say what a struct is usually for, name .NET's numbers,
`bool`, `char` and `DateTime` as structs, and recommend a struct that
cannot change. The rest of the page is about
parts of structs that these pages do not use.
