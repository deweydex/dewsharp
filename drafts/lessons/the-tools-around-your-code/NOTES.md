# the-tools-around-your-code: notes for a reviewer

Ported from dewlab `tutorials/the-tools-around-your-code/` (the tutorial and
its practice page, both version 2026.09.26.1, and the glossary file). It is
FOOP's third page, after `objects-and-classes` and
`the-moves-you-already-know`, and the page the rest of the course leans on
for FOOP-LO5, "Work within a modern integrated development environment".

Files:

- `the-tools-around-your-code.md`: the lesson. 21 exec cells (8 of them
  class cells, 4 of them empty "your own" cells), 4 solutions, 4 hints,
  2 predicts, 1 challenge.
- `the-tools-around-your-code-practice.md`: the practice page. 13 exec
  cells, 1 solution, 1 hint, 3 predicts.
- `native-check.json`: what the native check recorded for both files.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check every
  number in the prose that does not come from a lesson cell.

## The one big change: C# finds dewlab's bugs before they run

Nearly every bug on dewlab's page is a compiler error in C#:

| dewlab's bug | What it is in C# |
|---|---|
| `self.helth` (the opener) | CS0103 or CS1061: the compiler names the line |
| `other.take_damage(self.name)`, a string for a number | CS1503, at the caller's line |
| game: `self.bag.add(item)`, a list has no `add` | CS1061 (and `Add` exists) |
| ocean: `oxygen` without `self.` | no `self` in C#; a field is reached without it |
| solar system: `self.burn(days, self.rate)`, one argument too many | CS1501 |
| challenge: `self.photo` | CS1061 |
| practice 2: `counter.totall` | CS1061 |
| practice 3: `def start():` without `self` | no counterpart |

So the page could not keep dewlab's bugs and still teach reading a stack
trace. It now teaches two things. First, the compiler checks names and
types before anything runs, and when a value of the wrong type is passed,
it names the caller's line (a new cell, `a-bug-two-calls-deep-5`,
`expect: CS1503`, with a predict). Second, a stack trace is for a value of
the expected type that is not the value you meant. Every exception on the
page was rebuilt around that idea.

## What changed, and why, section by section

**Frontmatter.** `year:` is dropped (dewsharp has no such field). The worlds
are game, solar-system and your-own, as asked; ocean is dropped. dewlab's
`covers:` gives FOOP-LO5 to all four sections, so this page has
`covers: [FOOP-LO5]`.

**Opening and "A bug two calls deep".** dewlab's Ada attacks Grace became
Grace takes two hits, because the chain needed a method that takes a value
and fails on some values. `Character` keeps a `List<int> Hits`, and
`Hit(int number)` counts hits from 1, as players do, while the list counts
from 0.

- Cell 1 (`-1` class, `-2` program): `Hits[number]`, an off-by-one on the
  line that failed. `ArgumentOutOfRangeException`. The stack trace names
  line 22 (`Hit`), line 28 (`Report`) and line 4 (`Program.cs`); the
  mistake is on the top line.
- Cell 2 (`-3` class, `-4` program): `Hit` fixed, and `Report` asks for hit
  number 0. The same exception and the same failing line (22); the mistake
  is in the caller, line 27. This replaces dewlab's "one word in `attack`
  has changed". `Report` computes the first and the last hit on separate
  lines, so the stack trace names one call; that moves the caller's line
  from 28 to 27 between the two cells, and the prose says "the line that
  failed is line 22 again", not "the same three lines".
- dewlab's multiple-choice question became a plain list of the three lines
  and "Choose one, and then read the next part". dewsharp has no
  `question` block. The notes under dewlab's options are dropped.
- New: .NET prints a stack trace with the line that failed at the top, the
  opposite of Python. The page says "read a stack trace from the top" and
  has one sentence for readers who know Python. It also warns that Visual
  Studio's console shows frames inside .NET (`List`1.get_Item`) above the
  learner's own; the engine leaves them out (`docs/ENGINE_API.md`), and a
  real console run shows them (checked in a scratch project).
- The phrases "the line that failed" and "the line that is responsible"
  are taken from dewlab's PDP pages (`when-it-goes-wrong`,
  `reading-an-error-message`), so the FOOP page uses the words PDP used.
- *Index* and *non-negative* are defined, because the .NET message uses
  them.

**Your turn (bugs two calls deep).** Each task is now a class cell and a
program cell. The solutions are one program: the statements, then the fixed
class, because C# needs top-level statements first (CS8803). The solution's
class replaces the class cell above (rule 4); the native check confirms
that this works and that the `inputs` see it.

- game: `NullReferenceException`. `public List<string> Bag;` is never made.
  The mistake is on none of the three lines the stack trace names, a third
  case that the page's "Looking back" question covers. The compiler gives
  `warning CS0649`, and the solution note uses it: read the warnings.
  `null` is defined in the note.
- solar system: `Burn` throws an `ArgumentException` when it is asked for
  more fuel than the probe has; `Travel` passes `days * Fuel` where it
  meant `days * Rate`. Both are `int`, so the compiler can't help: the
  clearest "right type, not the value you meant" case. `throw` is
  introduced in one sentence before the cell. dewlab's PDP teaches `raise`
  (`building-reusable-tools`), and I assumed the C# PDP teaches `throw`.
- your own: two empty cells (class, program) where dewlab had one. The
  prompt changed from "misspell a field" (a compiler error in C#) to "ask a
  list for a position that is not in it".

**Printing what you need to see.** The opener keeps dewlab's bug exactly
(the armour line after `Math.Max`): 1, and 6, 2, 1 with the added line, and
0 with the fold's fix (probes P1 and P2). A predict was added before it
(0 / 1 / -2), because most readers will expect 0. The added line is shown
as code to read, as dewlab did; the reader types it into the class cell and
runs the program cell.

- game: the coins keep dewlab's bug (`if`, `if`, `else` where `else if` was
  meant): 17, then 16. The same bug exists in C#.
- solar system: dewlab's bug (`total = 0` inside the loop) does not compile
  in C#: a variable declared inside the loop is not there for the `return`
  after it (CS0103). It became `total =+ width;`, which C# reads as
  `total = +width;` and accepts without a warning. It still gives 4821, the
  last moon, so the note keeps dewlab's "only the last moon was left". This
  assumes the C# PDP taught `+=`.
- your own: two empty cells.
- The last paragraph points to the Visual Studio debugger at the end of
  the page, because a breakpoint does what the `Console.WriteLine` did.

**What the editor already knows.** dewlab tried autocomplete and hover in
the page's own editor. Nothing in dewsharp says its editor has either
(`docs/ENGINE_API.md` has no completion call, and `web/` is empty), so the
section now happens in Visual Studio, which is also what FOOP-LO5 asks for:
download the program cell as a project, type `grace.` (IntelliSense), type
`(` after `Hit` (the method's first line, `int Character.Hit(int number)`),
and type `"first"` as the argument (the red wavy line, CS1503). It ties
back to the stack trace question: the method's first line says what it
expects. The page's own parts (editor, compiler, Run, stack traces) are
named as a small development environment. It gets its own `Character`
class cell, because the worlds above have replaced `Character` with
classes of their own (rule 4).

**Where a bigger project lives.** dewlab described its Notebook: Files,
Variables and Stop. This became Visual Studio: Solution Explorer (one class
per file, the reason each class on these pages has a cell of its own),
breakpoints with the Locals and Call Stack windows (in place of dewlab's
Variables panel), and Stop Debugging, with the page's own Stop. The
shortcuts (margin click, F5, F10, F11, Shift+F5) were checked against
Microsoft's debugger tutorial. A short paragraph at the end is style guide
decision 4: the downloaded project has nullable reference types off, a new
project has them on, and then a field like the game world's `Bag` also
gets CS8618 (checked in a scratch project with nullable on).

**Looking back and the challenge.** The question keeps dewlab's shape and
adds the compiler as a third answer. The challenge keeps two bugs, one that
stops the program and one that does not: the `Photos` list is never made
(a `NullReferenceException`, with CS0649 as a clue), and `Burn` stores the
new fuel in a local variable. Probe P3: as given it stops; with the list
made it prints `Voyager: 5 photos, 3 kg left`; with both fixes,
`Voyager: 3 photos, 0 kg left`. The statements come before the class.

**Where to read more.** *Think Python*'s debugging appendix and the Python
tutorial's errors section became two Microsoft Learn pages, both fetched and
read on 27 September 2026: *Debugging code for absolute beginners* (the
same advice as Think Python's appendix: what did you expect, what happened;
it fixes two bugs in a C# program) and *Tutorial: Debug C# code and inspect
data*. Both use a classic `static void Main`, and the page says so in one
sentence.

**Glossary.** dewsharp has no glossary panel yet, so the five glossary
terms are defined in the prose where they first appear: *stack trace* (in
place of *traceback*), *debugging*, *development environment*,
*autocomplete* and *integrated development environment*. The page also
defines *index*, *non-negative*, *null*, *breakpoint*, and (on the
practice page) *private* and *namespace*.

## The practice page, problem by problem

1. **Which line?** dewlab's traceback came from a list passed where a
   number was expected, a compiler error in C#. It became a
   `DivideByZeroException`: `FeedEveryone` passes `Ashore.Count` (0) to
   `RationsEach`. The stack trace is in Visual Studio's console form, copied
   from a real run (probe P4 and a scratch project; lines 16, 21 and 3),
   with the folders removed. The page explains `Program.<Main>$` and
   `Int32`. Question became prose with a fold.
2. **One letter too many.** `AttributeError` became CS1061
   (`expect: CS1061`). C# gives no "Did you mean", so the fold shows where
   the unknown name sits in the message, and that nothing ran at all.
3. **Missing self** became **Missing public** (CS0122, with a predict).
   Python's missing `self` has no C# counterpart. A method without
   `public` is the slip a C# learner meets at this point, and it leads into
   the next page. The class is a `Lamp` with `Light()`, not `SwitchOn()`,
   to keep a phrasal verb out of the prose.
4. **An average that is too big.** Python's indentation bug became a
   `foreach` without braces, with the second line indented as if it were
   inside. `total` is a `double`, so the fix gives 188.75; the note says an
   `int` total would give 188 (probe P6) and mentions Format Document.
5. **Where the list comes from.** The answer changed: Visual Studio reads
   the class and runs nothing, where dewlab's editor listed the names from
   cells that had run.
6. **A class in another file.** No `import` in C#. The answer covers
   namespaces and `using` (probe P7: CS0246 without it, 12 with it).
7. **A cell that never ends.** Stop on the page; Break All, Locals and
   Stop Debugging in Visual Studio.
8. **A count that never counts.** The same bug. The fold adds that C# tells
   names apart by case (`Burns` and `burns`).
9. **An object in a list.** `__str__` and `__repr__` became `ToString` and
   `List<T>`'s own `ToString`, which prints
   ``System.Collections.Generic.List`1[Character]``. The fold shows
   `string.Join` (probe P9). This assumes the C# `objects-and-classes`
   teaches `override string ToString()`.
10. **Three errors** became **three mistakes**, as three runnable cells with
    `expect:`. `int("twelve")` became `int.Parse("twelve")`
    (`FormatException`); the index stays (`ArgumentOutOfRangeException`);
    `"depth: " + 120` works in C#, so the third became `int depth = "120";`
    (CS0029), and the fold says `"depth: " + 120` is fine in C# (probe
    P10).

## What C# made different, in short

- Most slips are compiler errors, found before anything runs, at the line
  that made them.
- A stack trace reads from the top, and Visual Studio's shows .NET's own
  frames too.
- `null` fields and `NullReferenceException` are the new class bug, and
  the compiler often warns about them (CS0649, or CS8618 with nullable on).
- Indentation means nothing to C#; braces do.
- `=+` compiles.
- Visual Studio can list a class's members before anything runs, because
  every variable has a type.

## What should change once the course map or the page UI exist

- **How the page shows an exception.** The prose assumes the message,
  with the list of frames under it, the line that failed first, each frame
  giving the file, the line and the method. `docs/ENGINE_API.md` returns
  exactly that (`exception.frames`, the learner's own frames only, `member`
  null for the statements), but the page does not exist yet. Check "Under
  the exception's message is a stack trace", "The first line of code under
  it" and the three bullets against it.
- **The download control.** "Download the program cell below as a Visual
  Studio project" names no button. The prose also assumes the exported
  project has a `Character.cs` beside `Program.cs`. It avoids saying "two
  files", because in the solar-system world the cells above also declare
  `Probe` and `Planet`, and the export may include them.
- **Warnings.** The game world's note says the compiler warned "before the
  program ran". Check that the page shows warnings on a Run that then
  throws.
- **Compare with a solution** when the solution holds the statements and
  a replacement class. The native check runs it; the page should too.
- **The challenge** is statements then a class in one block. How does it
  open in the notebook: one cell, or split into a class cell and a program
  cell?
- **If the page's editor gains completion or hover**, "What the editor
  already knows" can start on the page and then move to Visual Studio.
- **Links** use unchanged ids: `keeping-details-inside-an-object`,
  `documenting-a-class`, `the-moves-you-already-know`,
  `objects-and-classes`, `reading-an-error-message`. Their titles are
  dewlab's; update them if the C# pages are titled differently.
- **Cell ids** are new. dewlab's `a-bug-two-calls-deep-3--game` (one
  cell) became `-6--game` (class) and `-7--game` (program), and so on,
  because each task is now two cells. Nothing has been in front of a class,
  so nothing is lost.
- **The practice page's `from:`** is `the-tools-around-your-code-practice`,
  the dewlab practice page's own address. The format says `from:` is a
  tutorial id; change it to the tutorial's id if that is the convention.

## Open questions for a reviewer

1. **Public fields or properties?** Every class here uses public fields
   (`public int Health;`), because properties and access belong to the next
   page. Does the C# `objects-and-classes` use fields or auto-properties? If
   properties, the classes here should follow, and the CS0649 warning in the
   game world would change (an auto-property gives no CS0649).
2. **What the C# PDP has taught:** `throw` (solar-system task), `+=`
   (solar-system printing task), `string.Join` (game task), `Math.Max`,
   `new()` for a field, and stack traces through several methods. The page
   assumes all of them.
3. **Cell length.** The class cells are 20 to 30 lines, against the style
   guide's 5 to 15. A bug hunt inside a class needs the class; with braces
   on their own lines, C# is about twice as long as dewlab's Python.
4. **The opener's `Hit(int number)`, counting from 1.** It is the smallest
   way I found to get the same exception twice, once from the line that
   failed and once from its caller. Is it too made-up?
5. **Visual Studio only?** The page names Visual Studio's keys and windows
   throughout. If some learners use VS Code or Rider, the IDE sections need
   a note.
6. **Two stack trace forms.** The lesson describes the page's form (not yet
   built); practice problem 1 shows Visual Studio's (`Program.<Main>$`,
   `Int32`). Is it worth teaching both, or should the page show .NET's own
   form too?
7. **The predict before the CS1503 cell.** The prose says the cell is meant
   to fail only after the run, so that the guess stays open (as the
   powers-in-csharp draft does). Is that acceptable under the style guide's
   "the prose says the cell is meant to fail"?

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| lines 22, 28, 4 and 22, 27, 4; the exception text | lesson cells `-2`, `-4` (top frame, native check); full frames from a scratch console project built from the same cells |
| `Grace: 1 health. First hit: 4. Last hit: 3.` after either fix | lesson cell `what-the-editor-already-knows-2` (the same class) |
| `Program.cs(3,29): error CS1503` | lesson cell `a-bug-two-calls-deep-5` |
| game: `rope, lamp, key`, CS0649 text | lesson cell `-7--game` and its solution |
| solar system: 1000 in the message, 70 | lesson cell `-7--solar-system` and its solution |
| 1; 6, 2, 1; 0 | lesson cell `printing-what-you-need-to-see-2`; probes P1, P2 |
| 17 and 16; 4821 and 16854 | the printing tasks and their solutions |
| CS8618 with nullable on | scratch project, nullable enabled |
| challenge: 5 photos, 3 kg; 3 photos, 0 kg | probe P3 |
| practice 1: lines 16, 21, 3; `4 rations each` | scratch project; probe P4 |
| practice 2: (4,27), 8 | practice cell; probe P5 |
| practice 3: (2,6), `True` | practice cell; probe P5 |
| practice 4: 188.75, 188 | practice solution; probe P6 |
| practice 6: CS0246 | probe P7 |
| practice 8: 1 and 1; 0 each time | practice cell; probe P8 |
| practice 9: `Ada`, ``List`1[Character]``, `Ada` from `string.Join` | practice cell; probe P9 |
| practice 10: the three outcomes, CS0029 text, `depth: 120` | practice cells; probe P10 |

## Probes

### P1. The printing section, with the reader's line added (prose: 6, then 2, then 1)

```csharp exec
id: probe-printing-1
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

    public void TakeHits(List<int> hits)
    {
        foreach (int hit in hits)
        {
            TakeDamage(hit);
            Health = Health + 1;   // the armour blocks 1 point
            Console.WriteLine($"after a hit of {hit}, health is {Health}");
        }
    }
}
```

```csharp exec
id: probe-printing-2
var ada = new Character("Ada", 10);
ada.TakeHits(new List<int> { 5, 5, 5 });
Console.WriteLine(ada.Health);
```

### P2. The fix in the fold "Why the third hit leaves 1" (the three hits should leave 0)

```csharp exec
id: probe-printing-3
var ada = new Character("Ada", 10);
ada.TakeHits(new List<int> { 5, 5, 5 });
Console.WriteLine(ada.Health);

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

    public void TakeHits(List<int> hits)
    {
        foreach (int hit in hits)
        {
            TakeDamage(hit - 1);   // the armour blocks 1 point
        }
    }
}
```

### P3. The closing challenge, as given, then with one fix, then with both

```csharp exec
id: probe-challenge-1
expect: exception
var voyager = new Probe("Voyager", 3);
foreach (string target in new List<string> { "Jupiter", "Io", "Europa", "Saturn", "Titan" })
{
    voyager.Photograph(target);
}
Console.WriteLine(voyager.Report());

class Probe
{
    public string Name;
    public int Fuel;
    public List<string> Photos;

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Photograph(string target)
    {
        if (Fuel > 0)
        {
            Photos.Add(target);
            Burn(1);
        }
    }

    public void Burn(int kg)
    {
        int fuel = Math.Max(0, Fuel - kg);
    }

    public string Report()
    {
        return $"{Name}: {Photos.Count} photos, {Fuel} kg left";
    }
}
```

```csharp exec
id: probe-challenge-2
var voyager = new Probe("Voyager", 3);
foreach (string target in new List<string> { "Jupiter", "Io", "Europa", "Saturn", "Titan" })
{
    voyager.Photograph(target);
}
Console.WriteLine(voyager.Report());

class Probe
{
    public string Name;
    public int Fuel;
    public List<string> Photos = new();

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Photograph(string target)
    {
        if (Fuel > 0)
        {
            Photos.Add(target);
            Burn(1);
        }
    }

    public void Burn(int kg)
    {
        int fuel = Math.Max(0, Fuel - kg);
    }

    public string Report()
    {
        return $"{Name}: {Photos.Count} photos, {Fuel} kg left";
    }
}
```

```csharp exec
id: probe-challenge-3
var voyager = new Probe("Voyager", 3);
foreach (string target in new List<string> { "Jupiter", "Io", "Europa", "Saturn", "Titan" })
{
    voyager.Photograph(target);
}
Console.WriteLine(voyager.Report());

class Probe
{
    public string Name;
    public int Fuel;
    public List<string> Photos = new();

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public void Photograph(string target)
    {
        if (Fuel > 0)
        {
            Photos.Add(target);
            Burn(1);
        }
    }

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }

    public string Report()
    {
        return $"{Name}: {Photos.Count} photos, {Fuel} kg left";
    }
}
```

### P4. Practice problem 1: the galley. The stack trace on the page was copied from a real console run of these two cells (lines 16, 21 and 3); this check shows the top frame only

```csharp exec
id: probe-galley-1
class Galley
{
    public int Rations;
    public List<string> OnBoard;
    public List<string> Ashore;

    public Galley(int rations, List<string> onBoard, List<string> ashore)
    {
        Rations = rations;
        OnBoard = onBoard;
        Ashore = ashore;
    }

    public int RationsEach(int people)
    {
        return Rations / people;
    }

    public void FeedEveryone()
    {
        int each = RationsEach(Ashore.Count);
        Console.WriteLine($"{each} rations each");
    }
}
```

```csharp exec
id: probe-galley-2
expect: exception
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var galley = new Galley(24, crew, new List<string>());
galley.FeedEveryone();
```

```csharp exec
id: probe-galley-3
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var galley = new Galley(24, crew, new List<string>());
galley.FeedEveryone();

class Galley
{
    public int Rations;
    public List<string> OnBoard;
    public List<string> Ashore;

    public Galley(int rations, List<string> onBoard, List<string> ashore)
    {
        Rations = rations;
        OnBoard = onBoard;
        Ashore = ashore;
    }

    public int RationsEach(int people)
    {
        return Rations / people;
    }

    public void FeedEveryone()
    {
        int each = RationsEach(OnBoard.Count);
        Console.WriteLine($"{each} rations each");
    }
}
```

### P5. Practice problems 2 and 3, fixed (prose: 8, and True)

```csharp exec
id: probe-counter-fixed
var counter = new Counter();
counter.Add(5);
counter.Add(3);
Console.WriteLine(counter.Total);

class Counter
{
    public int Total = 0;

    public void Add(int amount)
    {
        Total = Total + amount;
    }
}
```

```csharp exec
id: probe-lamp-fixed
var lamp = new Lamp();
lamp.Light();
Console.WriteLine(lamp.IsLit);

class Lamp
{
    public bool IsLit = false;

    public void Light()
    {
        IsLit = true;
    }
}
```

### P6. Practice problem 4: the same fix with an int total (prose: 188)

```csharp exec
id: probe-average-int
int total = 0;
int count = 0;
foreach (int depth in new List<int> { 120, 340, 85, 210 })
{
    total = total + depth;
    count = count + 1;
}
Console.WriteLine(total / count);
```

### P7. Practice problem 6: a class in a namespace, without and with using (prose: CS0246)

```csharp exec
id: probe-namespace-1
namespace MyProject;

class Shape
{
    public double Width = 3;
    public double Height = 4;

    public double Area()
    {
        return Width * Height;
    }
}
```

```csharp exec
id: probe-namespace-2
expect: CS0246
var shape = new Shape();
Console.WriteLine(shape.Area());
```

```csharp exec
id: probe-namespace-3
using MyProject;

var shape = new Shape();
Console.WriteLine(shape.Area());
```

### P8. Practice problem 8: a Console.WriteLine(Burns) inside Burn (prose: 0 every time)

```csharp exec
id: probe-burns-print
var juno = new Probe("Juno");
Console.WriteLine(juno.Burn());
Console.WriteLine(juno.Burn());

class Probe
{
    public string Name;
    public int Burns = 0;

    public Probe(string name)
    {
        Name = name;
    }

    public int Burn()
    {
        Console.WriteLine(Burns);
        int burns = Burns + 1;
        return burns;
    }
}
```

### P9. Practice problem 9: string.Join on the party (prose: Ada)

```csharp exec
id: probe-join
var ada = new Character("Ada");
var party = new List<Character> { ada };
Console.WriteLine(string.Join(", ", party));

class Character
{
    public string Name;

    public Character(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return Name;
    }
}
```

### P10. Practice problem 10: joining a string and a number, and int.Parse (prose: depth: 120)

```csharp exec
id: probe-depth
Console.WriteLine("depth: " + 120);
int depth = int.Parse("120");
Console.WriteLine(depth + 1);
```
