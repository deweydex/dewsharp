# Notes: mixed-programming-with-objects (C# draft)

Ported from dewlab `tutorials/mixed-programming-with-objects/` (version
2026.09.26.1). The folder has only the page: there is no practice page
(a mixed set has none) and no `.glossary.yaml`. Written on 28 September
2026 against dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to entry 40), and in `planning/COURSE_MAP.md` the
"Principles of translation" and the entry for this page (FOOP lesson 24,
batch 12, "adapt", shape mixed set, size M, worlds game, solar system and
your own, covers FOOP-LO3, LO4, LO6, LO7, LO8, LO10). The world classes
come from the draft of `your-world-playable` (the eighth version).

There was no partial draft: the folder did not exist when this run
started, so the page was written from the beginning.

Files:

- `mixed-programming-with-objects.md`: the page. 13 problems. 28
  `csharp exec` cells: 19 shared, 4 in the game, 4 in the solar system,
  1 in your own world. A reader in the game or the solar system sees 23
  cells; in their own world, 20. 3 predicts, 7 hints, 11 solutions, 10
  `inputs` blocks, 12 answer folds, 2 fences of code to read, no
  challenge.
- `mixed-programming-with-objects.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probes at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).

## How it was checked

- NativeCheck on the page: **No problems.** No cell gives a warning, so
  no warning travels down the page (`DECISIONS.md` 30). Three cells are
  meant to fail, and each has `expect:` and a sentence before it that
  says so: `a-container-that-asks-1-program--game` and
  `--solar-system` (`expect: CS1061`, decision 27),
  `a-list-that-will-not-sort-1-program` (`expect: exception`). Every
  solution compiles and runs, in every world, with its inputs.
- NativeCheck on this file (the probes): **No problems.**
- `web/lesson/parse.js` (the real parser, run from Node) reads the page
  with no errors: 28 cells, and each predict, hint, `inputs` and
  solution attached to the program cell intended.
- **The class chain.** A script copied the six world classes and `Test`
  into the page from the cells of `your-world-playable` ("Your world,
  running"), and then compared them: each is an exact copy. The two
  solutions that write `Room` and `Mission` again were compared the same
  way: apart from the new method, each is an exact copy of the eighth
  version.
- **Where to read more.** The address was fetched (HTTP 200), its
  `<h1>` is "Polymorphism", and its text has the `Shape` and `Draw`
  example, `base.`, hiding with `new`, and `sealed`, as the page says.
- **The page's guesses.** `guessMatches` in `web/page/lesson.js`
  compares a choice's text with each output line, with spaces squashed.
  The two choice predicts have options that are whole output lines, so
  the page can tell a guess that matches from one that does not. An
  early third option in problem 5, `a vehicle: a space for cars`, was
  the program's *first* line, so a reader who chose it would have been
  told nothing differed; it was removed.

## What changed from the Python page, and why

**Frontmatter.** `year:` and `practice_across:` go (the format has
neither). `covers:` is the course map's list. The worlds are the game,
the solar system and your own; the ocean goes (`DECISIONS.md` 13).

**The introduction** keeps dewlab's two paragraphs, with "an interface"
added to the list of what a problem may want, and gains the practice
page's paragraph on cells meant to fail and the rules of the road
(from `objects-and-classes-practice`), and a line saying that problem 4
is the one set in the reader's world.

**Problem 1, a lifeboat with no name, is retold.** In Python the child
forgot `super().__init__(name)`, and the error appeared later, in the
parent's `describe`. In C#, a child's constructor must call one of its
parent's; if the parent's only constructor takes a name, the child does
not compile (CS7036, probe P7). That would make the problem a class
that does not compile, which only the last cell of a page may hold
(`DECISIONS.md` 30), because every cell below would fail with it. So
`Vessel` has a second constructor, `Vessel() : this("unnamed")`, the
constructor chaining taught with overloading, and the slip compiles and
runs: `unnamed, a lifeboat for 12`. The question keeps dewlab's: which
line would you change, and to what? The answer is still the child's
constructor (`: base(name)`), and the fold invites the reader to delete
the empty constructor and see CS7036, and warns that the cells below
stop compiling until it is back. The `virtual`/`override` note on
`Kind` replaces dewlab's note that `self.kind()` finds the child's.

**Problem 2, the big tank.** Python's class attribute becomes a static
field, as on `one-parent-many-children`. The author of `BigTank` has
added `new`, as the CS0108 warning suggests (probe P6), so the class
compiles with no warning and nothing travels down the page. It prints
100, the same surprise as in dewlab. dewlab's "`self.capacity` would
find it" becomes a virtual property, the fix `one-parent-many-children`
teaches, as a solution (500).

**Problem 3, a squad that grows by itself.** Almost a translation: a
private `List<string>` field, and the fix `new List<string>(names)` from
`objects-inside-objects`. "The underscore did not help" becomes
"`private` did not help", which is a stronger point in C#: the field
really is private, and the caller still changed it. **The predict block
is gone**: C# gives the same answer as Python (3), the style guide
allows two or three predicts, and the course map says to keep the ones
where C# surprises. The question stays in the prose, and a solution (2)
was added.

**Problem 4, a container that asks,** in two worlds and your own. Each
world variant has three types cells, copies of the eighth version with
their XML comments, and the program cell below, `expect: CS1061` until
the reader writes the method (decisions 26 and 27). The types cell that
the reader changes keeps dewlab's id (`a-container-that-asks-1--game`,
`--solar-system`); the program is `...-1-program--<world>`. The
solutions write `Room` or `Mission` again in full (rule 4), with
`Weakest` or `Emptiest` and an XML comment. They add one thing dewlab's
did not: an empty container refuses with an `InvalidOperationException`,
the pattern `documenting-a-class` taught for `Farthest`. An `inputs`
line marked `// throws:` shows it beside whatever the reader's method
does. The ocean variant goes. The your-own variant is one cell: the
reader's classes and a short program, with the program first, as C#
needs.

**Problem 5 is new: a bike in a space for cars** (overloading, with
`virtual` and `override`). The course map asks for new problems on
overloading, interfaces, enums and structs. This one mixes overloading
with inheritance: a `List<Vehicle>` holds a bike, `Describe` (an
override) says "a bike", and `CarPark.SpaceFor` (an overload) still
chooses the `Vehicle` version. C# chooses an override while the program
runs, by the object, and an overload when it compiles, by the type it
can see. The fix is a virtual `Space()` method. It has a predict, a
hint and a solution. It also serves `virtual-and-override`, which is in
this page's "depends on".

**Problem 6, the test that finds the slip** (dewlab's problem 5). dewlab
used a submarine's hull limit of 400 m; the ocean goes, so it is a
probe that may burn all its fuel (70 kg), the same `<=` that
`documenting-a-class` used. dewlab's problem had no cell. This one has
a small cell with the two versions as local methods and one test (30
kg): the reader adds burns and sees which one gives two answers. The
solution (30, 70 and 80 kg) records the line the fold quotes. The id
`the-test-that-finds-the-slip-1` is new.

**Problem 7, an example that almost holds** (dewlab's problem 6). doctest
has no C# twin, and Python's surprise (`35` against `35.0`, because `/`
always gives a decimal) is the opposite of C#'s. The C# twin is
whole-number division: `HalfTank` returns a `double`, and
`return _fuel / 2;` still gives 27 for 55 kg, where the XML example
says 27.5. The program prints the two side by side; there is no
`Example.Check`, because comparing an `int` with a `double` as objects
gives "the example says 35, the code gives 35" (probe P5), which a
mixed problem should not have to explain. dewlab's multiple-choice
`question` becomes a predict whose options are the two possible last
lines. The heading drops "right" (the style guide's verdict words); the
cell id keeps dewlab's `an-example-that-is-almost-right-1`, because the
task is the same (see the open questions). The fold keeps dewlab's two
ways out: divide by `2.0`, or return an `int` and say so in the
comment.

**Problem 8 is new: a list that will not sort** (interfaces and
collections). Four of Jupiter's moons, with real widths (rounded mean
diameters, the same Io as `objects-and-classes-practice`), in a
`List<Moon>`. `moons.Sort()` compiles and stops with an
`InvalidOperationException`: `Failed to compare two elements in the
array.` The fix is `IComparable<Moon>` and `CompareTo`, which the course
map puts on `many-classes-one-promise` and its practice page.

**Problem 9, two jobs in one method** (dewlab's problem 7). The Python
function to read becomes a C# method to read. `input()` becomes
`Console.ReadLine()`, and the answer names `RunChoice`, as
`a-front-end-for-a-class` does.

**Problem 10 is new: a locked door that lets you through** (enums). A
`DoorState` enum gains `Locked`, and `CanWalkThrough` still says
`State != DoorState.Closed`, so a locked door says `True`. The fix is
`== DoorState.Open`, and the fold adds the habit: when an enum gets a
value, search for every place that asks about it. It picks up the flag
from `objects-inside-objects` ("the flag takes a new value ... in every
other method that asks which kind").

**Problem 11 is new: a position that did not move** (structs and
lists). `Position last = path[2]; last.Y = 5;` changes a copy, so the
path prints `(0, 0) (1, 0) (2, 0)`. The fix is `path[2] = last;`. The
fold invites two experiments: `class` in place of `struct` (the path
moves, probe P3) and `path[2].Y = 5;` (CS1612, probe P4), which the
course map lists for `two-names-one-object`.

**Problem 12, class, child, container or flag?** (dewlab's problem 8).
Prose, with C# in the answer: `class Penguin : Animal`, a
`List<Animal>` in `Keeper`, the flag as an enum, and one sentence on an
interface (`ISwimmer`) for a seal, which swims too. "Keepers look after
several animals" became "Each keeper cares for several animals" (a
phrasal verb). "Another good answer" became "another answer that works".

**Problem 13, one more rule, the whole way through** (dewlab's problem
9). "The docstring" becomes "its XML comment". It gains a types cell
with `Test`, an exact copy from `your-world-playable`, so the reader
can write the test first without copying anything. The sentences say
where the world's classes are (problem 4) and that `Commands` must be
copied from *Your world, playable*. The blank cell `one-more-rule-1`
keeps dewlab's id.

**Where to go next** is new. dewlab's mixed set ends at problem 9; the
style guide asks every page to end with somewhere to go. It names the
five explore pages by their short titles in italics, without links,
because they are in later batches (batch rule 3, `DECISIONS.md` 32),
and one thing to read (Microsoft's *Polymorphism*).

**Order.** dewlab's nine problems keep their order. The four new ones
sit among them (5, 8, 10, 11), so that the topics do not arrive as a
block at the end, since "none of them says which" page it comes from.

## What C# made different, in short

- A child that forgets its parent's constructor is a compiler error, not
  a later crash; the problem needs a second constructor to stay a
  run-time puzzle.
- A static field cannot be overridden, and `new` only hides it; a
  virtual property is the fix.
- `private` really stops code outside the class from naming a field,
  and a shared `List` still gets past it.
- Overloads are chosen when the program compiles, overrides when it
  runs: C# has both, and Python has neither in this form.
- Whole-number division, not decimal text, is what makes the example
  fail.
- `Sort` needs `IComparable<T>`, and the compiler cannot see that.
- An enum's new value passes a `!=` test silently.
- A struct in a list is copied, and `path[2].Y = 5;` does not compile.

## What to revisit once the page UI or the browser checker exists

- Run the browser checker, and copy the outputs into
  `lessons/mixed-programming-with-objects/mixed-programming-with-objects.outputs.json`.
  The exception in problem 8: NativeCheck records the outer message,
  `Failed to compare two elements in the array.` .NET also keeps an
  inner exception, `ArgumentException`, `At least one object must
  implement IComparable.` (probe P2), which is the more useful message.
  If the page shows it, the fold should quote it too.
- Problem 1's experiment: a reader who deletes `Vessel()` makes every
  cell below fail to compile, with the error named in
  `a-lifeboat-with-no-name-1`. The fold says so. Check that the
  messages under a program cell lower down make it clear which cell to
  look at.
- The `// throws:` notes on the problem 4 inputs are seen by the
  reader ("throws: a room with nobody in it"). Check how the compare
  table shows a note, and an exception on both sides.
- Problems 1, 2, 3, 4, 5, 7, 8 and 10 have their fix in the types cell
  above the program cell, and the solution writes the class again
  (decision 26). Check that "Compare with a solution" makes this clear.
- The world cells of problem 4 are long (`Character` is 76 lines with
  its comments). If the page gains a way to fold a long types cell,
  these could use it.
- The four new problems' ids, and `the-test-that-finds-the-slip-1`,
  `a-container-that-asks-character--game` and the other helper cells,
  are new keys for saved work.

## Open questions for a reviewer

1. **The course map gives dewlab's problems to two pages.** The entry
   for `mixed-classes-and-objects` (FOOP lesson 12, batch 4) says it
   draws on this dewlab page's "problems 1 to 3 and 5 to 8", "the half
   ... that the pages up to designing classes can answer". But problems
   1 and 2 need inheritance, 3 needs a shared list inside an object, 5
   testing, 6 documentation, 7 a front end and 8 "is a" and "has a": all
   from pages after `from-a-description-to-classes`. Only problem 4's
   first half might fit. This page, whose entry says "dewlab's problems
   in C#", uses all nine. `mixed-classes-and-objects` is not drafted, so
   nothing clashes yet; its author will need new problems (its action
   is already "new"), and the map's "From" line should change.
2. **Size.** The course map says M (8 to 15 cells). A reader sees 23
   cells here, because each class sits in a types cell above its
   program (in FOOP each problem is two cells), and the map asks for
   four new problems on top of dewlab's nine. It is an L. If that is too
   long, the four new problems could move to the practice pages of
   their topics, or the page could split into two sets.
3. **Problem 1 compiles on purpose.** The other choice is dewlab's
   shape with C#'s answer: the child does not compile (CS7036), and the
   reader reads the message. That is simpler and very C#, but it must
   be the page's last cell (decision 30), and problem 13 below it would
   then fail to compile until the reader fixed problem 1. Which does
   the reviewer prefer?
4. **Three predicts** (problems 2, 5 and 7). Problem 3 lost dewlab's
   predict, as above. Problem 11 (the struct) could take one instead of
   problem 5, if the struct is the surprise the reviewer wants guessed.
5. **Ids with "right" in them.** `an-example-that-is-almost-right-1`
   keeps dewlab's id because the task is the same (the course map's
   rule on cell ids), though the heading changed. The new problem 5 was
   named `parked-in-the-wrong-place` at first and renamed to
   `a-bike-in-a-space-for-cars` before anything was saved under it.
6. **Links.** `[Composition](lesson:objects-inside-objects)` and
   `[Your world, playable](lesson:your-world-playable)` are `lesson:`
   links, as this run's task asked. Neither page is in `lessons/` yet,
   so the build would refuse them now (decision 39); they are earlier
   batches, and should land first. The explore pages are italics.
7. **No challenge.** dewlab's mixed set has none, and problem 13 is the
   open task at the end. The style guide asks each page for a challenge
   for the notebook. Add one, or accept problem 13 in its place?
8. **Problem 13's `Test` cell** is an addition, so that "the test
   first" needs no copying. `Commands` is not copied onto the page,
   because it is the reader's own and differs by world; the reader
   copies it. Copy the eighth-version `Commands` of each world into
   problem 4 instead?
9. **`public static new int`.** The modifier order is Visual Studio's
   default order (`static` before `new`). `public new static int`
   compiles the same and may read more easily.

## Where each number and message in the prose comes from

- Problem 1: `unnamed, a lifeboat for 12`: `a-lifeboat-with-no-name-1-program`.
  `Lifeboat 1, a lifeboat for 12`: its solution. CS7036, on the line of
  the constructor: probe P7 (the error is at line 25, column 12, the
  line `public Lifeboat(string name, int seats)`).
- Problem 2: 100: `the-big-tank-1-program`. 500: its solution. "The
  compiler warned ... and suggested the word `new`": probe P6 (CS0108,
  "Use the new keyword if hiding was intended").
- Problem 3: 3: `a-squad-that-grows-1-program`. 2: its solution.
- Problem 4: `Grog (health 4)` and `Philae (fuel 40 kg)`: the two
  solutions. `InvalidOperationException` for an empty container: the
  solutions' `// throws:` inputs. `ArgumentOutOfRangeException` at
  `_characters[0]`: probe P1. "its message says that `Room` does not
  contain a definition for `Weakest`" (and `Mission`, `Emptiest`): the
  CS1061 messages of the two program cells.
- Problem 5: `a vehicle: a space for cars`, `a bike: a space for cars`:
  `a-bike-in-a-space-for-cars-1-program`. `a bike: the bike rack`: its
  solution. `CarPark.SpaceFor(new Bike())` gives the bike rack: its
  input.
- Problem 6: `as meant True, as written False` for 70 kg, and the same
  answers both ways for 30 and 80 kg: the solution of
  `the-test-that-finds-the-slip-1`.
- Problem 7: 27: `an-example-that-is-almost-right-1-program`. 27.5: its
  solution. 55 and the example's 27.5 are in the code.
- Problem 8: `InvalidOperationException`, `Failed to compare two
  elements in the array.`, on the line with `Sort` (line 8):
  `a-list-that-will-not-sort-1-program`. The sorted list: its solution.
  The widths are in the code.
- Problem 10: `True`: `a-locked-door-1-program`. `False`, and the three
  inputs: its solution.
- Problem 11: `(0, 0) (1, 0) (2, 0)`:
  `a-position-that-did-not-move-1-program`. `(0, 0) (1, 0) (2, 5)`: its
  solution. "The path's last position moves" with `class`: probe P3.
  CS1612: probe P4.

## Probes

Each probe checks a claim in the page's prose that no cell on the page
prints. They run with the same NativeCheck command (pass `NOTES.md` as the
file). The rules of the road apply here too, so the probes whose classes
warn or do not compile come last.

### P1. An empty list at index 0 (problem 4's solution notes)

```csharp exec
id: probe-empty-list-index-0
expect: exception
var characters = new List<string>();
Console.WriteLine(characters[0]);
```

### P2. `Sort` on a class with no `CompareTo`: the message inside (problem 8)

The page quotes only the outer message. .NET also keeps an inner
exception, which the page may or may not show.

```csharp exec
id: probe-sort-moon
file: Moon.cs
class Moon
{
    public string Name;
    public int Width;

    public Moon(string name, int width)
    {
        Name = name;
        Width = width;
    }
}
```

```csharp exec
id: probe-sort-inner-message
var moons = new List<Moon> { new Moon("Io", 3643), new Moon("Europa", 3122) };
try
{
    moons.Sort();
}
catch (InvalidOperationException exception)
{
    Console.WriteLine(exception.Message);
    Console.WriteLine(exception.InnerException.GetType().Name);
    Console.WriteLine(exception.InnerException.Message);
}
```

### P3. `Position` as a class: the path's last position moves (problem 11)

```csharp exec
id: probe-position-as-class
file: Position.cs
class Position
{
    public int X;
    public int Y;

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

```csharp exec
id: probe-position-as-class-program
var path = new List<Position> { new Position(0, 0), new Position(1, 0), new Position(2, 0) };
Position last = path[2];
last.Y = 5;
Console.WriteLine(string.Join(" ", path));
```

### P4. `path[2].Y = 5;` with a struct (problem 11)

```csharp exec
id: probe-struct-position
file: Position.cs
struct Position
{
    public int X;
    public int Y;

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

```csharp exec
id: probe-struct-in-place
expect: CS1612
var path = new List<Position> { new Position(0, 0), new Position(1, 0), new Position(2, 0) };
path[2].Y = 5;
Console.WriteLine(path[2].Y);
```

### P5. Why problem 7 prints the two values, and does not use `Example.Check`

`Example.Check` from `documenting-a-class` compares two `object`s. An
`int` 35 and a `double` 35 are not equal as objects, though both print
as `35`. A C# twin of dewlab's `35` against `35.0` would have given this
line, which the page could not explain in a mixed problem.

```csharp exec
id: probe-example-check
file: Example.cs
static class Example
{
    public static void Check(string call, object expected, object actual)
    {
        if (Equals(expected, actual))
        {
            Console.WriteLine($"{call}: {actual}, as the example says");
        }
        else
        {
            Console.WriteLine($"{call}: the example says {expected}, the code gives {actual}");
        }
    }
}
```

```csharp exec
id: probe-example-check-program
Example.Check("HalfTank() with 70 kg", 35, 70 / 2.0);
Example.Check("HalfTank() with 55 kg", 27.5, (double)(55 / 2));
```

### P6. `BigTank` before its author added `new` (problem 2's story)

```csharp exec
id: probe-big-tank-without-new
file: Tank.cs
class Tank
{
    public static int Capacity = 100;

    public int Level { get; private set; }

    public void Fill()
    {
        Level = Capacity;
    }
}

class BigTank : Tank
{
    public static int Capacity = 500;
}
```

```csharp exec
id: probe-big-tank-without-new-program
var tank = new BigTank();
tank.Fill();
Console.WriteLine(tank.Level);
```

### P7. `Vessel` without its constructor with no parameters (problem 1)

This one does not compile, so it is last.

```csharp exec
id: probe-vessel-without-empty-constructor
expect: CS7036
file: Vessel.cs
class Vessel
{
    public string Name;

    public Vessel(string name)
    {
        Name = name;
    }

    public string Describe()
    {
        return $"{Name}, {Kind()}";
    }

    public virtual string Kind()
    {
        return "a vessel";
    }
}

class Lifeboat : Vessel
{
    public int Seats;

    public Lifeboat(string name, int seats)
    {
        Seats = seats;
    }

    public override string Kind()
    {
        return $"a lifeboat for {Seats}";
    }
}
```
