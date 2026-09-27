# when-is-a-breaks: notes for a reviewer

Ported from dewlab `tutorials/when-is-a-breaks/when-is-a-breaks.md`
(version 2026.09.26.1) and its glossary file. It is a closer look: two
ideas that cannot both be true, one experiment that decides between them,
then why the other idea is easy to believe, where else the same thing
happens, and one thing to read. Its home page is `one-parent-many-children`
(`planning/COURSE_MAP.md`, FOOP row 15: "translate", shape "closer look",
size S, worlds none, batch 5, covers FOOP-LO3 and FOOP-LO7). dewlab has no
practice page for it, so there is none here.

`covers: [FOOP-LO3, FOOP-LO7]` comes from the course map's entry. dewlab's
`year:` is dropped, because dewsharp's format has no such field.

Status: written in one run on 27 September 2026. There was no partial draft:
the folder did not exist when the run started. The native check prints "No
problems." for both files.

Files:

- `when-is-a-breaks.md`: the lesson. Six exec cells (four types cells, two
  program cells), one predict, two answer folds, no worlds.
- `when-is-a-breaks.native.json`: what the native check recorded for the
  lesson's cells.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).
- `NOTES.native.json`: what the native check recorded for the probes.

## No worlds

The brief for this run said to keep the game and the solar system, plus
"your own" where dewlab has it. The course map's entry overrides that: it
says "Worlds: none", and the page is in the map's list "Lessons with no
worlds" ("a closer look is one experiment"). dewlab's page has no worlds
either. So the frontmatter has no `worlds:` and no cell id ends in `--`.

## What changed, and why

**The opening** points back to the home page, as dewlab's does.
`class Troll(Character):` becomes `class Troll : Character`, and the quoted
reading "a troll is a character" is the one the C# draft of
`one-parent-many-children` uses ("The first line of the class, `class Troll
: Character`, says "a troll is a character""). dewlab added ", plus
something different"; I left it out, because the C# page does not say it.
The two ideas keep dewlab's words, with `class X : Y` for `X(Y)`. "whatever
real life says" became "even when "is a" is true in real life", which is
plainer and has no idiom.

**The experiment becomes three cells.** The course map says "Two cells and
an answer fold", meaning dewlab's two cells. Under the rules of the road each
class goes in a types cell above the program that uses it, so dewlab's first
cell becomes `Rectangle.cs`, `Square.cs` and a three-line program, and the
penguin cell does the same (`Bird.cs`, `Penguin.cs`, a program). Six cells
is still under the map's eight for size S. The ids number the cells in page
order (`an-experiment-1` to `-3`, `where-else-it-happens-1` to `-3`), as
the `one-parent-many-children` draft does (types cell `-1`, program `-2`).
The reader's change to `Square` is saved under `an-experiment-2`.

**`Rectangle` in C#.** The map asks for `Stretch` to be `virtual`, "so that
the fix (`Square` overrides `Stretch`) is possible", and it is, from the
start. The sides are properties with `protected set`, not public fields:

- `protected` is what the home page has just taught (`Health { get;
  protected set; }`), and it is what the fix needs. With `private set`, the
  fix fails with CS0272 on both sides (probe `private-set`).
- With public fields, the program could break the square itself
  (`tile.Height = 5;`), which is a different lesson. With `protected set`,
  that line does not compile (probe `caller-cannot-set`, CS0272), so the
  only way to change a square is through its methods, and the only thing
  that breaks it is the parent's own method. That is the point of the page.

The sides and the factor are `int`, so the numbers are dewlab's: sides of 3,
a stretch of 2, and `width 6 height 3 area 18`. `area()` becomes `Area()`,
a method, as dewlab's is, and not a property. `super().__init__(side,
side)` becomes `: base(side, side)`. The program uses `var` (FOOP, after
`the-moves-you-already-know`), and prints one labelled line with `$"..."`.

**Two sentences between the cells are new.** One says what `Stretch` does
and why it is `virtual`, and what `protected set` allows; the other says
what `Square`'s constructor does. dewlab's Python needed neither. The first
also states the parent's promise ("the height stays as it was"), which the
fold uses later.

**The predict** keeps its question, its first two options and their notes.
The third option, "An error", became "Nothing: it does not compile", with
the note "C# does not let a square be stretched sideways". In C#, the first
place a reader expects a refusal is the compiler, and the style guide names
the three outcomes the same way on every page. There is one predict on the
page, as in dewlab (see open question 3).

**After the run.** "Python raised no error" became "The program compiled
with no error and no warning, and it ran to its last line" (the check shows
no diagnostics for any cell). A new paragraph asks why the compiler did not
stop it: the compiler checks names and types, and the square's rule is
written nowhere in the code. This is the part C# adds: a reader who has met
the compiler as the first feedback on every page may expect it to catch
this, and it cannot.

**The invitation** keeps dewlab's two questions, and says where the change
goes: "in its cell", then "run the program again". On the page, a reader
edits a types cell (Check) and then runs the program cell below it, and a
reader at home should not have to guess that.

**The fold** keeps dewlab's summary, "one change, and what it costs", and
opens with the format's line. Its code is the C# override (code to read, in
a `csharp` fence), and one sentence says why it may change `Height`. With it,
the program prints `width 6 height 6 area 36` (probe `fold-override`).
dewlab's "a program that stretched every rectangle sideways ... now gets
squares that are also twice as tall" is kept, with a `List<Rectangle>`, and
is backed by probe `row-after-the-fix` (the rectangle's height stays 2, the
square's goes from 3 to 6). "the parent's promise" is spelled out in the
sentence before it. dewlab's closing answer, a `Shape` with `area` and no
`stretch`, stays.

**"Why idea A feels right" became "Why idea A is easy to believe"**, as in
the other closer looks, because *right* is a verdict word. "the words ... are
correct" became "the sentence ... is true" for the same reason. ("four right
angles" stays: it is the maths term.) One paragraph is new: in C#, "used
anywhere the parent is used" is exact. A `Rectangle` variable can hold a
`Square`, and a `List<Rectangle>` can hold squares (probe
`rectangle-holds-square`), as the `List<Character>` on the home page held a
troll and a phoenix. The compiler trusts the promise in `: Rectangle`, and
only the person who writes the child class can check it.

**The principle is defined in the prose,** because dewsharp has no glossary
panel. The definition is dewlab's glossary entry, shortened to one sentence:
"an object of a child class must work anywhere an object of its parent class
works, and nothing may break". *Substitution* is defined too, because it is
a hard word for a reader of English as a second language.

**The penguin** follows the map: `Fly` is `virtual`, and `Penguin`
overrides it. `[Bird(), Penguin()]` becomes `new List<Bird> { new Bird(),
new Penguin() }`, looped with `foreach`, the shape of the home page's
"Many kinds, one loop". `fly` returns a string, as dewlab's does. dewlab's
question "What will the last line do?" became a sentence on what the
program does and "What will it print?", because "the last line" was
ambiguous once the loop has braces. The page then says what it prints
(`flies away`, then `cannot fly`), as the other closer looks do after
their second cell.

**A fold for the penguin is new.** dewlab left "What would you change about
`Bird`?" open. A reader at home has nobody to ask, so a fold gives one
answer: remove `Fly` from `Bird`, give flying birds a class of their own,
`FlyingBird : Bird`, and keep the birds that flee in a `List<FlyingBird>`.
Its last paragraph makes a C# point that closes the loop on "the compiler
reads neither": once the promise is in the types, the compiler checks it. A
penguin put in a `List<FlyingBird>` does not compile. The fold quotes the
part of the message both ways of writing it share, `cannot convert from
'Penguin' to 'FlyingBird'`, and no code: a collection initializer reports
CS1950 first and CS1503 second, and `Add` reports CS1503 alone (probes
`penguin-not-a-flying-bird`, `penguin-add`). The fold's design runs as
written (probe `penguin-fold`).

**The last paragraph points to the next page,** as the map asks: a parent
that both classes can keep the promises of is an interface. It names
*interface* and defines it in one sentence ("a list of methods that a class
promises to have, with no code in them"). The link is plain text ("The next
page, on interfaces"), because `many-classes-one-promise` is batch 6 and
batch rule 3 lets a page link back only to earlier batches.

**Where to read more** keeps dewlab's one reference, Barbara Liskov's 1987
talk, with its DOI link, and says it is written for computer scientists,
with examples not in C#. "won the Turing Award in 2008" became "for 2008",
because the award for 2008 was announced in March 2009 (search results from
CACM, "Liskov Wins Turing Award", and CRA, 27 September 2026). The ACM
Digital Library returned 403 to the fetch, so I could not confirm that the
paper is free to read there; see open question 5.

## What C# made different, in short

- A class goes in a types cell above the program that uses it, so each of
  dewlab's two cells became three.
- The fix needs the parent's permission: `Stretch` must be `virtual`, and
  the sides need a `set` the child can use (`protected`). In Python the
  child could replace any method and set any attribute.
- The compiler is the reader's first feedback, so the page says why it did
  not catch the broken square (the rule is not in the types), and the
  penguin fold shows it catching the same mistake once the promise is in the
  types.
- "Used anywhere the parent is used" is something C# checks at compile time:
  a `Rectangle` variable can hold a `Square`. The page names it.
- `super().__init__` becomes `: base(...)`; `[Bird(), Penguin()]` becomes a
  `List<Bird>`; methods are PascalCase.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `width 6 height 3 area 18`; no error and no warning | lesson cell `an-experiment-3` (no diagnostics) |
| sides of 3, stretched by 2 | the code of `an-experiment-3` |
| `tile` is still a `Square` object | probe `still-a-square` (`Square`, `True`, and `False` for width equal to height) |
| other code can only read the sides | probe `caller-cannot-set` (CS0272) |
| fold: `width 6 height 6 area 36` | probe `fold-override` |
| fold: a row stretched twice as wide gets squares twice as tall | probes `row-before-the-fix` and `row-after-the-fix` (the square's height 3, then 6; the rectangle's stays 2) |
| fold: it can change `Height` because the `set` is `protected` | probe `private-set` (CS0272 with `private set`) |
| a `Rectangle` variable and a `List<Rectangle>` can hold a `Square` | probe `rectangle-holds-square` |
| `flies away`, then `cannot fly`; it compiles and runs | lesson cell `where-else-it-happens-3` |
| fold: the `FlyingBird` design runs | probe `penguin-fold` |
| fold: `cannot convert from 'Penguin' to 'FlyingBird'` | probes `penguin-not-a-flying-bird` (CS1950, then CS1503) and `penguin-add` (CS1503) |
| 1987, *Data Abstraction and Hierarchy*, DOI 10.1145/62138.62141 | dewlab's page; web search (ACM DL, Wikipedia), 27 September 2026 |
| Turing Award for 2008 | dewlab's page; web search (CACM, CRA, Britannica), 27 September 2026 |

No compiler message's line or column is quoted, so none needs checking
against the page.

## Once the page UI and the other pages exist

- **`one-parent-many-children` is a draft in progress** (no NOTES yet when
  this was written). This page relies on four things in it: the first line
  `class Troll : Character` read as "a troll is a character"; `virtual`,
  `override` and `protected` taught there; `: base(...)`; and a
  `List<Character>` holding a troll and a phoenix ("Many kinds, one loop").
  Check each when that page is final.
- **The link to this page.** Batch rule 3 gives this batch the job of
  linking to this page from earlier pages. dewlab links here from the "Is it
  a kind?" answer on `one-parent-many-children-practice` ("Even a real "is a
  kind of" can go wrong in code. ... builds a square on a rectangle, and
  watches it stop being a square."). That practice page is not drafted, and
  this run may write only in this folder. When it exists, the same sentence
  with `[Inheritance: a closer look at "is a"](lesson:when-is-a-breaks)` fits
  there.
- **`virtual-and-override`** (FOOP 14, batch 5) comes just before this page
  in reading order, but it is in the same batch, so neither page links to
  the other and this page does not rely on it. This page leaves out hiding
  and `new` for that reason. Probe `hidden-with-new` shows the case that
  page is about, in this page's classes: with a non-virtual `Stretch` and a
  `Square.Stretch` that hides it (warning CS0108), a square stretched through
  a `Square` variable stays square (6 and 6), and through a `Rectangle`
  variable does not (6 and 3). If that page wants a second example, this is
  one. If it ends with a "Next" line, it should point here.
- **`many-classes-one-promise`** should check the one-sentence definition
  of *interface* in this page's last paragraph, and add the link on "The
  next page, on interfaces".
- **The fold's code** is a `csharp` fence inside a `<details>` fold. The
  parser keeps it in the markdown item; check that the page renders it as
  code.
- **Editing a types cell, then running the cell below.** The invitation
  depends on this working as the format says (Check on `an-experiment-2`,
  Run on `an-experiment-3`). There is no `solution` block, so Compare does
  not apply.

## Open questions for a reviewer

1. **`Stretch` virtual from the start.** The map asks for it, and the page
   says why in one sentence. The other choice is a `Stretch` that is not
   virtual, so that the reader's first attempt at the fix meets CS0506, as
   on the home page (probe `not-virtual`). That repeats a lesson the reader
   has just had, and makes the fold longer. I followed the map.
2. **Six cells where the map says two.** Each dewlab cell became two types
   cells and a program. `Rectangle` and `Square` could share one types cell
   (and `Bird` and `Penguin` another), for four cells, but then the
   reader's fix edits a cell that also holds the parent. One class a cell
   matches the home page.
3. **One predict.** dewlab has one, and asks about the penguin in prose.
   The style guide asks for two or three a page where a guess is
   interesting. The penguin's output is not much of a surprise, so I left
   it in prose.
4. **The penguin fold is new.** dewlab left the question open. Keep it, or
   leave the question open and let the last paragraph answer it?
5. **Where to read more.** Liskov's talk is the source, but it is an
   academic paper, hard going for a Level 5 reader in a second language, and
   I could not confirm free access. R. C. Martin's "The Liskov Substitution
   Principle" (*C++ Report*, March 1996), which dewlab cites on
   `objects-inside-objects`, uses this exact square and rectangle, and its
   C++ reads much like C#; it has no stable address I could find. Microsoft
   Learn has no page on the principle that I found, only an archived TechNet
   wiki article. Which should the page give?
6. **The page opens with prose, not a cell,** as the other closer looks do.
   The style guide's checklist asks a page to open by running something.
7. **No challenge.** The map says a closer look ends with one thing to read,
   and this page follows the map, as the other closer looks do.
8. **The definition of *interface*** ("a list of methods that a class
   promises to have, with no code in them") is simpler than C# since
   version 8, where an interface may hold default code. It should match
   whatever `many-classes-one-promise` says.
9. **"Promise".** The page uses dewlab's word throughout: a child class
   promises to do what its parent does. It is never defined, only shown
   (`Stretch` promises that the height stays as it was). Is that clear
   enough for a reader of English as a second language?

## Probe cells

Run with the NativeCheck command, passing this file. The `expect:` cells
fail on purpose. Types carry down under the rules of the road, including
types declared in a program cell. So the three probes whose classes fail or
warn (`not-virtual`, `private-set`, `hidden-with-new`) come last, and each
declares both classes again, replacing the ones above it. Anything placed
below them picks up their classes and their messages.

```csharp exec
id: rectangle
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

```csharp exec
id: square-as-on-the-page
file: Square.cs
class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }
}
```

```csharp exec
id: still-a-square
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine(tile.GetType().Name);
Console.WriteLine(tile is Square);
Console.WriteLine(tile.Width == tile.Height);
```

```csharp exec
id: rectangle-holds-square
Rectangle shape = new Square(3);
var row = new List<Rectangle> { new Rectangle(3, 2), new Square(3) };
Console.WriteLine(shape.GetType().Name);
Console.WriteLine(row[1].GetType().Name);
```

```csharp exec
id: row-before-the-fix
var row = new List<Rectangle> { new Rectangle(3, 2), new Square(3) };
foreach (Rectangle shape in row)
{
    shape.Stretch(2);
    Console.WriteLine($"{shape.GetType().Name}: width {shape.Width} height {shape.Height} area {shape.Area()}");
}
```

```csharp exec
id: caller-cannot-set
expect: CS0272
var tile = new Square(3);
tile.Height = 5;
Console.WriteLine(tile.Height);
```

```csharp exec
id: square-with-the-fold
file: Square.cs
class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }

    public override void Stretch(int factor)
    {
        Width = Width * factor;
        Height = Height * factor;
    }
}
```

```csharp exec
id: fold-override
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine($"width {tile.Width} height {tile.Height} area {tile.Area()}");
```

```csharp exec
id: row-after-the-fix
var row = new List<Rectangle> { new Rectangle(3, 2), new Square(3) };
foreach (Rectangle shape in row)
{
    shape.Stretch(2);
    Console.WriteLine($"{shape.GetType().Name}: width {shape.Width} height {shape.Height} area {shape.Area()}");
}
```

```csharp exec
id: penguin-fold
var fleeing = new List<FlyingBird> { new FlyingBird() };
foreach (FlyingBird bird in fleeing)
{
    Console.WriteLine(bird.Fly());
}
var everyone = new List<Bird> { new FlyingBird(), new Penguin() };
Console.WriteLine(everyone.Count);

class Bird
{
}

class FlyingBird : Bird
{
    public virtual string Fly()
    {
        return "flies away";
    }
}

class Penguin : Bird
{
}
```

```csharp exec
id: penguin-not-a-flying-bird
expect: CS1950
var fleeing = new List<FlyingBird> { new Penguin() };
Console.WriteLine(fleeing.Count);
```

```csharp exec
id: penguin-add
expect: CS1503
var fleeing = new List<FlyingBird>();
fleeing.Add(new Penguin());
Console.WriteLine(fleeing.Count);
```

```csharp exec
id: not-virtual
expect: CS0506
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine($"width {tile.Width} height {tile.Height}");

class Rectangle
{
    public int Width { get; protected set; }
    public int Height { get; protected set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public void Stretch(int factor)
    {
        Width = Width * factor;
    }
}

class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }

    public override void Stretch(int factor)
    {
        Width = Width * factor;
        Height = Height * factor;
    }
}
```

```csharp exec
id: private-set
expect: CS0272
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine($"width {tile.Width} height {tile.Height}");

class Rectangle
{
    public int Width { get; private set; }
    public int Height { get; private set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public virtual void Stretch(int factor)
    {
        Width = Width * factor;
    }
}

class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }

    public override void Stretch(int factor)
    {
        Width = Width * factor;
        Height = Height * factor;
    }
}
```

```csharp exec
id: hidden-with-new
var tile = new Square(3);
tile.Stretch(2);
Console.WriteLine($"as a Square: width {tile.Width} height {tile.Height}");
Rectangle shape = new Square(3);
shape.Stretch(2);
Console.WriteLine($"as a Rectangle: width {shape.Width} height {shape.Height}");

class Rectangle
{
    public int Width { get; protected set; }
    public int Height { get; protected set; }

    public Rectangle(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public void Stretch(int factor)
    {
        Width = Width * factor;
    }
}

class Square : Rectangle
{
    public Square(int side) : base(side, side)
    {
    }

    public void Stretch(int factor)
    {
        Width = Width * factor;
        Height = Height * factor;
    }
}
```
