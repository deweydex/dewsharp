# the-tools-around-your-code: notes for a reviewer

Ported from dewlab `tutorials/the-tools-around-your-code/` (the tutorial,
its practice page and its glossary, all version 2026.09.26.1), against
`planning/COURSE_MAP.md` (FOOP lesson 8), `docs/LESSON_FORMAT.md`, the
style guide (draft 1) and `DECISIONS.md`, on 27 September 2026.

## Status of this draft

A run stopped mid-page had left a full draft here. It was written before
the course map existed (its notes said "once the course map ... exist"),
and it differed from the map's brief in the title, the covers, the opening,
the cell ids and the challenge. I rewrote both pages against the map. From
that draft I kept the parts that the map does not change and that still
worked: the printing section and its two world tasks (with the `=+` bug),
the Visual Studio shortcuts (which that run had checked against Microsoft's
debugger tutorial), and most of the practice problems (Which line, One
letter too many, An average, Where the list comes from, the three from
earlier), retold where they were set in the ocean.

## Files

- `the-tools-around-your-code.md`: the lesson. 22 exec cells (9 types
  cells, 9 program cells and 4 empty "your own" cells), 3 predicts,
  4 hints, 4 solutions with inputs, 1 challenge.
- `the-tools-around-your-code-practice.md`: the practice page. 13 exec
  cells, 3 predicts, 1 hint, 1 solution with inputs.
- `the-tools-around-your-code.native.json`,
  `the-tools-around-your-code-practice.native.json`: what the native check
  recorded for each page.
- `NOTES.md` (this file) and `NOTES.native.json`: the probe cells at the
  end run with the same NativeCheck command. They check every number and
  message in the prose that no lesson cell prints.

## How it was checked

- NativeCheck on each page and on this file: **No problems.**
- NativeCheck prints only the top call of an exception. The other lines of
  each exception report in the prose come from a real console project
  (net10.0, nullable off), with the types cell as `Character.cs`,
  `Probe.cs` or `Station.cs` and the program as `Program.cs`:

  ```console
  Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
     at Character.PickUp(String item) in Character.cs:line 15
     at Character.Loot(List`1 items) in Character.cs:line 22
     at Program.<Main>$(String[] args) in Program.cs:line 2
  ```

  Game task: `Equip` line 19, `EquipLast` line 24, `Program.cs` line 5,
  with `List`1.get_Item` above them. Solar-system task: `NextPlanet` line
  15, `Fly` line 24, `Program.cs` line 2. Practice problem 1: `PacksEach`
  line 16, `ShareFood` line 21, `Program.cs` line 3 (the report on the
  page is copied from this run, with the folders removed).
- The same project with `<Nullable>enable</Nullable>` gives, for the first
  `Bag` class: `warning CS8618: Non-nullable field 'Bag' must contain a
  non-null value when exiting constructor.` (as well as CS0649).
- `dotnet new console --use-program-main` on .NET 10.0.401 gives the
  classic `Main` exactly as the page shows it, with `namespace MainDemo;`
  in place of `namespace ConsoleApp1;` (the name follows the project).
- The Visual Studio keys and menu paths (Ctrl+F5, F5, F9, F10, F11,
  Shift+F5, F12, Ctrl+Alt+Break, Ctrl+K Ctrl+D, View > Solution Explorer,
  View > Error List, Debug > Windows > Locals and Call Stack,
  Add > Class, the "Do not use top-level statements" box on "Additional
  information") are Visual Studio 2022's, from my knowledge of it, and so
  are the IntelliSense line `void Character.TakeDamage(int amount)` and the
  red dot and yellow arrow. I had no Visual Studio to run them in.
  Someone should walk the steps once on the college's version (course map
  open question 11).

## What changed from the Python page, and why

**Title and covers.** The course map's title, "Visual Studio: the tools
around your code", and `covers: [FOOP-LO5, FOOP-LO10]` (IDE; debug and
test). dewlab's page is "Your development environment: finding a bug
inside a class", with FOOP-LO5 for each section.

**Worlds.** Game, solar-system and your-own; ocean dropped. The shared
cells teach in the game world (Ada and Grace), as dewlab's do.

**The opening: two compiler errors.** As the map says, dewlab's first two
cells become compiler errors with `expect:`.

- `a-bug-two-calls-deep-1`: dewlab's `self.helth` is `Helth` (C# reaches a
  field without `this.`), so CS0103 at `Character.cs(16,30)`. dewlab's
  multiple-choice question ("which of the three lines would you change?")
  became the page's first predict: which line will C# name? The three
  options are the three lines a Python traceback would list. The compiler
  names only line 16, and the prose says why: it checks every method before
  anything runs, so it does not follow the route.
- `a-bug-two-calls-deep-2`: dewlab's `take_damage(self.name)` is CS1503 at
  `Character.cs(21,26)`: the caller's line. In Python the error was one
  call further in than the mistake; in C# the message names the mistake.
- A table then lists the four slips from dewlab's page that C# finds before
  running, as the map asks: CS0103, CS1503, CS1061 (`Bag.add`, dewlab's
  game bug) and CS1501 (`Burn(days, Rate)`, dewlab's solar-system bug).
  The CS1061 and CS1501 messages come from probes P10 and P11. *Overload*
  gets one sentence, because CS1501's message uses it.

**A bug the compiler cannot see (new).** The map's one run-time bug two
calls deep: a `List<string>` field that is never made. `PickUp` fails
(line 15), called from `Loot` (22), called from the program (2). This is
where the exception report is taught: its two parts, the list of calls
read from the top, *the line that failed*, and the note for Python readers
that the order is reversed. A second predict asks what will happen (prints,
does not compile, or stops). dewlab's "which line would you change?" moves
here as a question with an answer fold, because here the answer is
interesting: none of the three. The fold defines `null`, uses the CS0649
warning, and fixes the field with `= new()`. The section ends with the
habit it teaches: for each value on the line that failed, ask where it came
from (a parameter from the caller; a field from the class). *Exception
report* is the course map's term (`reading-an-error-message`); *stack
trace* is named once, as Visual Studio's word.

**Your turn: a bug that still compiles.** Each world keeps
`a-bug-two-calls-deep-3`, with a new bug, because dewlab's bugs (`add`,
`burn(days, rate)`) are now compiler errors.

- game: `EquipLast` calls `Equip(Bag.Count)`, one past the last position.
  `ArgumentOutOfRangeException` in `Equip`, and the mistake is in the
  caller.
- solar-system: dewlab's Juno became Voyager 2, the only probe that has
  visited all four giant planets. `Fly(4)` loops with `i <= planets`, so the
  fifth call to `NextPlanet` asks for position 4. The four planets print
  first, so the reader sees the program run until it stops. The mistake is
  on the `for` line, two lines above the line the report names.
- your-own: two empty cells (class and program), and a prompt that makes an
  exception two calls deep, not a misspelt field (a compiler error now).

Both world bugs have the mistake in the caller, where dewlab had one in the
callee. The shared NullReferenceException already shows a mistake on none
of the named lines, and the caller is the case that the section's habit
("where did this value come from?") is for.

**Printing what you need to see** stays whole, as the map says. The
armour bug is dewlab's (1; then 6, 2, 1; then 0 with the fix, probes P5 and
P6). A predict was added (0, 1 or -2), because most readers will expect 0.
"10 take away 4" became "10 minus 4", to keep a phrasal verb out. The game
task keeps dewlab's `if`/`if`/`else` bug (17, then 16). The solar-system
bug (dewlab's `total = 0` inside the loop) does not compile in C# (a
variable declared in the loop is not there for the `return`), so it became
`total =+ width;`, which C# reads as `total = +width;` with no warning: 4821,
then 16854. The last paragraph points ahead to the debugger.

**Where a bigger project lives** is now the Visual Studio walk-through the
map asks for, in five parts, each with numbered steps and what the reader
will see described in words:

1. *A cell as a project*: a clean `Character` and a program with three
   attacks (Ada 7, Grace 0) in new cells, because every `Character` above
   has a bug or has been replaced by a world's class. Download, open the
   `.csproj`, Solution Explorer, Ctrl+F5.
2. *What the editor already knows* (dewlab's section, moved here because
   the page has no autocomplete, and `what-the-editor-already-knows-1`
   goes): IntelliSense on `grace.`, the parameter line on `(`, hovering,
   F12, and the Error List with `grace.TakeDamage("lots");` (CS1503, probe
   P7).
3. *A class in a file of its own*: Add > Class, `Potion.cs`, used from
   `Program.cs` (Grace 5, probe P7). Visual Studio's start for the file has
   a namespace, so the steps say to replace the whole file; the practice
   page says what happens if the namespace stays (CS0246, probe Q6).
4. *Watching the program run*: a breakpoint in `TakeDamage`, F5, Locals
   (`this` and `amount`), F10, the Call Stack as a live exception report,
   F5 to continue, Stop Debugging, and F11. The values at each pause come
   from probe P4. dewlab's Stop button paragraph ends this part.
5. *Main, in older programs*: the one place the style guide shows the
   classic `static void Main`, as code to read, from the .NET 10 template.
   It explains `Main`, `static`, `string[] args` and the namespace line, why
   the pages use top-level statements, why no class is called `Program`,
   and rule 5. The nullable setting (style guide decision 4) closes it,
   with CS8618 on the `Bag` field.

dewlab's Notebook (Files, Variables, Stop) maps onto Solution Explorer, the
Locals window and Stop Debugging.

**Looking back and the challenge.** The question keeps dewlab's shape. The
challenge has one compiler error and one logic error, as the map says:
`Photo.Count` (CS0103) and `Burn` storing in a local. `Photos` is made with
`new()`, so there is no third bug. Probe P9: as given, CS0103; with only
the name fixed, `Voyager: 5 photos, 3 kg left`; with both,
`Voyager: 3 photos, 0 kg left`.

**Where to read more.** *Think Python*'s debugging appendix and the Python
tutorial became two Microsoft Learn pages: *Debugging code for absolute
beginners* and *Tutorial: Debug C# code and inspect data*. Both returned
HTTP 200 on 27 September 2026, and I checked the page's description of each
against its text: the first opens with "What did you expect your code to
do? What happened instead?" and fixes "several bugs" with F10 and F11; the
second uses the Locals and Call Stack windows. Both use a classic
`static void Main`, and the page says so.

**Glossary.** dewsharp has no glossary panel, so dewlab's five terms are
defined in the prose: *exception report* and *stack trace* (for
*traceback*), *debugging*, *development environment*, *autocomplete* and
*integrated development environment*. The page also defines *null*, *the
line that failed*, *debugger*, *breakpoint*, *stepping*, *overload*,
*top-level statements* and *command line*, and the practice page *hides*
(a field) and *namespace*.

## The practice page, problem by problem

1. **Which line?** dewlab's traceback came from a list passed where a
   number was expected: CS1503 in C#. It became a
   `DivideByZeroException` on a space station: `ShareFood` passes
   `Outside.Count` (0) to `PacksEach`. The report is Visual Studio's
   console form, copied from a real run; the page explains
   `Program.<Main>$` and `Int32`. The `question` block became prose and a
   fold. Fixed, `4 packs each` (probe Q1).
2. **One letter too many.** `AttributeError` became CS1061 at (4,27). C#
   gives no "Did you mean", so the fold shows where the unknown name sits in
   the message. Fixed, 8 (probe Q2).
3. **Missing self** became **A local that hides a field**, as the map says.
   `bool IsLit = true;` inside `Light` makes a local with the field's exact
   name, so the field stays `False`, with CS0219 and CS0649. The fold
   gives two fixes, deleting `bool` or `this.IsLit` (both print `True`,
   probe Q3), and says that `this.` is C#'s `self.`. It
   differs from the previous page's practice problem 2 (`int visits`, a
   different letter case) and from problem 8 here.
4. **An average that is too big.** Python's indenting bug became a
   `foreach` without braces. Retold from the ocean (dives) to the game
   (Ada's scores, the same numbers): 755 before, 188.75 after, 188 with an
   `int` total (probe Q4). The note mentions Format Document.
5. **Where the list comes from.** Visual Studio reads the class and runs
   nothing, where dewlab's editor listed names from cells that had run.
6. **A class in another file** became a Visual Studio task, as the map
   says: add `Shield.cs` with `Block(int hit)`, and use it from
   `Program.cs` (3 and 0, probe Q6). The fold covers the namespace that
   Visual Studio writes (CS0246 without `using`, probe Q6), and leaves the
   rest to `namespaces-and-libraries`.
7. **A cell that never ends** keeps Stop, and adds Break All, Locals, F10
   and Stop Debugging.
8. **From earlier: a count that never counts** (from
   `the-moves-you-already-know`). The same bug; the fold adds that C# tells
   `Burns` and `burns` apart (probe Q8: a print of `Burns` shows 0 each
   time).
9. **From earlier: an object in a list** (from `objects-and-classes`).
   `__str__` and `__repr__` became `ToString` and `List<T>`'s own
   `ToString`, which prints ``System.Collections.Generic.List`1[Character]``.
   The fold shows `string.Join` (probe Q9). This assumes the C#
   `objects-and-classes` teaches `override string ToString()`, as its map
   entry says.
10. **From earlier: three errors** became **does not compile, or stops?**,
    three runnable cells, linked to `compiler-errors` (batch 2), which
    teaches the three things that can happen on Run. `int("twelve")` became
    `int.Parse` (`FormatException`), the index stays
    (`ArgumentOutOfRangeException`), and `"depth: " + 120`, which works in
    C#, became `int depth = "120";` (CS0029). The fold says that
    `"depth: " + 120` works (probe Q10).

## What C# made different, in short

- Most of dewlab's bugs are compiler errors, found before anything runs,
  at the line that has the mistake. The page is built on that.
- The run-time bugs left are values: a field never made (`null`), a
  position one past the end, a count of 0.
- .NET lists the most recent call first, the reverse of Python.
- A field that holds an object starts as `null`; declaring it does not
  make it. The compiler often warns (CS0649, or CS8618 with nullable on).
- A local can hide a field of the same name, and `this.` reaches the field.
- Indenting means nothing to C#; braces do. `=+` compiles.
- Visual Studio can list a class's members before anything runs, because
  every variable has a type.

## To revisit once the page UI exists

1. **What the page shows for an exception** (course map open question 9).
   The prose describes the report as the engine returns it
   (`docs/ENGINE_API.md`): the exception's type and message, then a list of
   calls, most recent first, each with a file, a line and a method, the
   learner's own code only. It numbers the three calls 1 to 3. If the page
   draws the list the other way up, "read it from the top", "the first
   line" and "each line below it" change in the tutorial, and "the second
   line of the report" in the game solution. Practice problem 1 shows
   Visual Studio's own form, which is fixed.
2. **How the page writes a compiler message.** The prose quotes
   `Character.cs(16,30)` and `Character.cs(21,26)`: the `file:` name, and the
   line and column that the check printed (counted from the top of the
   cell, as `ENGINE_API.md` says). The native check prints the cell id in
   place of the file name.
3. **Warnings from cells above.** A class stays on show for every program
   below it, so its warnings do too. In the solar-system world, the
   tutorial's `Bag` class (CS0649) is never replaced before the Voyager
   task, so its warning appears under the Voyager program (see the JSON).
   On the practice page, the `Lamp` warnings (CS0219, CS0649) appear under
   every program after problem 3. The engine gives each diagnostic a
   `cellId`; the page could show only the target cell's warnings, or show
   the others as "from a cell above". The-moves-you-already-know's notes
   raise the same point.
4. **The download control.** Step 1 says "Download the program cell as a
   Visual Studio project" without naming a button. The steps assume the
   download holds `Program.cs`, `Character.cs` (from the types cell's
   `file:`) and a `.csproj`, with nullable off. In the other worlds the
   cells above also declare `Probe` or `Planet`, which may land in the
   project too; the steps name only the two files the reader needs.
5. **Pictures.** The map asks for Visual Studio steps "with pictures
   described in words". I had no Visual Studio, so each step says in words
   what the reader will see (a red dot, a yellow arrow, the Locals and Call
   Stack windows). Screenshots with descriptions could be added beside
   steps 3 and 4 of "Watching the program run".
6. **Compare with a solution** on a program cell whose solution is the
   statements plus a replacement class. The native check runs this, and the
   engine's contract covers it (the target's code is replaced, and the
   solution's class replaces the class above, rule 4). The page should
   show it in the same way.
7. **Empty "your own" cells** have kind `empty`. The page needs to label
   them until the reader writes in them.
8. **The challenge** is one block, statements then class, as on the page
   before. If the notebook splits a challenge into a types cell and a
   program cell, split this one.

## Links

- Links go only to earlier batches (course map, "Batches", rule 3):
  `keeping-details-inside-an-object` (1), `the-moves-you-already-know` (1),
  `objects-and-classes` (0), `compiler-errors` (2), and this page's own
  practice page. The link texts use the course map's titles.
- Later pages are mentioned in words, without links, because they are in
  later batches: `namespaces-and-libraries` (batch 10) is "a later page is
  about namespaces" in the tutorial and in practice problem 6. That batch
  should add the links. The earlier draft linked `documenting-a-class`
  (batch 9) from the IntelliSense paragraph; I took that sentence out, and
  batch 9 may want to add a line there about hover text.
  `one-class-many-methods` (batch 2, overloading) could be linked from the
  *overload* sentence; I left it as "a later page" because FOOP's reading
  order puts it after this page.
- `the-moves-you-already-know` (drafted in batch 1) ends with "Next, [Your
  development environment: finding a bug inside a class](lesson:the-tools-around-your-code)".
  Its link text should become this page's title, "Visual Studio: the tools
  around your code". I did not edit that file.

## Open questions for a reviewer

1. **Cell ids for a split cell.** Each dewlab cell that held a class and
   its statements became a types cell and a program cell. I kept dewlab's
   id on the types cell and gave the program cell the same id with
   `-program` (`a-bug-two-calls-deep-3--game` and
   `a-bug-two-calls-deep-3-program--game`), so that every task the map
   names keeps its dewlab id. `the-moves-you-already-know` numbered its
   program cells on (`-1--game`, `-2--game`), which works there because
   dewlab had one cell per section, but here would move
   `a-bug-two-calls-deep-3` to another task. The exemplar
   (`objects-and-classes`) should settle one rule for all FOOP pages.
2. **Where solutions go.** Here a world task's `solution` and `inputs` sit
   on the program cell, with the solution holding the statements and the
   class written again. `the-moves-you-already-know` puts them on the types
   cell, which the native check compiles but does not run against its
   inputs. This page's way is checked end to end; the other is closer to
   where the reader edits. One convention should be chosen.
3. **Page size.** The map calls this page L. The first half (20 cells, the
   bug hunts) fits one session. The Visual Studio half has two cells and
   five sets of steps, and the page says where to stop. Should
   the Visual Studio half be its own page? It would need a new id.
4. **Cell length.** The class cells are 20 to 28 lines, against the style
   guide's 5 to 15. A bug hunt inside a class needs the class.
5. **Three predicts** (which line, what happens, what number). The style
   guide allows two or three. The second could become prose if the page
   feels heavy.
6. **Public fields.** The classes use public fields, as the previous page
   does, because properties belong to the next page. If
   `objects-and-classes` uses auto-properties, each field is a one-line
   change here, and the CS0649 warnings (which the page uses) would go:
   an auto-property gives none.
7. **What the reader has met.** The page assumes `Math.Max`, `string.Join`,
   `new()` for a field, `+=`, a `for` loop with three parts, `else if`,
   `override string ToString()` and the three things that can happen on
   Run. A FOOP reader meets these in "Starting in C#" or PDP.
8. **Visual Studio only?** The steps name Visual Studio 2022's keys and
   menus. Learners on a Mac or at home may use VS Code, whose keys differ
   (course map open question 11).

## Where each number in the prose comes from

| Number or message | Source |
|---|---|
| `Character.cs(16,30)` CS0103; `Character.cs(21,26)` CS1503 | lesson cells `a-bug-two-calls-deep-1-program`, `-2-program` |
| Grace ends with 4 health (after either fix) | probe P1 |
| CS1061 and CS1501 messages in the table | probes P10, P11 |
| NullReferenceException, CS0649, lines 15, 22, 2 | lesson cell `a-bug-the-compiler-cannot-see-1-program` (line 15), console project (22, 2) |
| `rope, lamp, key` after the fix | probe P2 |
| game: sword; `Bag.Count` is 3 | the game solution; probe P3 |
| solar-system: 4 planets; `i` = 0 to 4 | the solar-system solution; probe P3 |
| 1; 6, 2, 1; 0 | lesson cell `printing-what-you-need-to-see-1-program`; probes P5, P6 |
| 16 (coins); 16,854 (moons) | the printing solutions |
| Ada 7, Grace 0 | lesson cell `where-a-bigger-project-lives-1-program` |
| Grace 8 and amount 4, then 4; Ada taking 3 | probe P4 |
| CS1503 for `"lots"`; `Grace: 5 health` | probe P7 |
| the classic `Main` compiles and runs | probe P8 |
| CS8618 | console project with nullable on |
| challenge: 3 photos, 0 kg left | probe P9 |
| practice 1: lines 16, 21, 3; `4 packs each` | console project; probe Q1 |
| practice 2: (4,27); 8 | practice cell; probe Q2 |
| practice 3: False, CS0219, CS0649; True | practice cell; probe Q3 |
| practice 4: 188.75; 188 | practice solution; probe Q4 |
| practice 6: 3 and 0; CS0246 | probe Q6 |
| practice 8: 1 and 1; 0 each time | practice cell; probe Q8 |
| practice 9: `Ada`, ``List`1[Character]``; `Ada` from `string.Join` | practice cell; probe Q9 |
| practice 10: the three outcomes, CS0029; `depth: 120` | practice cells; probe Q10 |

## Probes

Run with the same NativeCheck command, passing this file. The cells that
are meant not to compile come last, so that their classes do not reach the
others.

### P1. The opener, with `Helth` fixed (prose: Grace ends with 4 health)

```csharp exec
id: probe-attack
class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Strength);
    }
}
```

```csharp exec
id: probe-attack-program
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
Console.WriteLine(grace.Health);
```

### P4. What the breakpoint in TakeDamage shows at each pause

```csharp exec
id: probe-breakpoint-program
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
grace.Attack(ada);
ada.Attack(grace);

class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Console.WriteLine($"pause: this is {Name}, Health {Health}, amount {amount}");
        Health = Math.Max(0, Health - amount);
        Console.WriteLine($"after F10: Health {Health}");
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Strength);
    }
}
```

### P7. The Visual Studio walk-through: `"lots"`, and the Potion class (prose: CS1503; Grace: 5 health)

```csharp exec
id: probe-clean-character
class Character
{
    public string Name;
    public int Health;
    public int Strength;

    public Character(string name, int health, int strength)
    {
        Name = name;
        Health = health;
        Strength = strength;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public void Attack(Character other)
    {
        other.TakeDamage(Strength);
    }
}
```

```csharp exec
id: probe-lots
expect: CS1503
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
grace.TakeDamage("lots");
```

```csharp exec
id: probe-potion
class Potion
{
    public int Strength;

    public Potion(int strength)
    {
        Strength = strength;
    }

    public void Heal(Character who)
    {
        who.Health = who.Health + Strength;
    }
}
```

```csharp exec
id: probe-potion-program
var ada = new Character("Ada", 10, 4);
var grace = new Character("Grace", 8, 3);
ada.Attack(grace);
grace.Attack(ada);
ada.Attack(grace);
Console.WriteLine($"{ada.Name}: {ada.Health} health");
Console.WriteLine($"{grace.Name}: {grace.Health} health");
var potion = new Potion(5);
potion.Heal(grace);
Console.WriteLine($"{grace.Name}: {grace.Health} health");
```

`Potion` uses `Character.Health`, and a later probe writes `Character`
without it, so an empty `Potion` replaces this one for the probes below
(rule 4).

```csharp exec
id: probe-potion-replaced
class Potion
{
}
```

### P2 and P3. The bag with its list made (prose: rope, lamp, key; Bag.Count is 3), and the values of `i` in `Fly(4)` (prose: 0 to 4)

```csharp exec
id: probe-bag-fixed
class Character
{
    public string Name;
    public int Health;
    public List<string> Bag = new();

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void PickUp(string item)
    {
        Bag.Add(item);
    }

    public void Loot(List<string> items)
    {
        foreach (string item in items)
        {
            PickUp(item);
        }
    }
}
```

```csharp exec
id: probe-bag-fixed-program
var ada = new Character("Ada", 10);
ada.Loot(new List<string> { "rope", "lamp", "key" });
Console.WriteLine(string.Join(", ", ada.Bag));
```

```csharp exec
id: probe-bag-count
var ada = new Character("Ada", 10);
ada.PickUp("rope");
ada.PickUp("lamp");
ada.PickUp("sword");
Console.WriteLine(ada.Bag.Count);
```

```csharp exec
id: probe-fly-loop
int planets = 4;
for (int i = 0; i <= planets; i++)
{
    Console.WriteLine(i);
}
```

### P5 and P6. The armour, with the reader's line added (prose: 6, 2, 1), and with the fold's fix (prose: 0)

```csharp exec
id: probe-armour-printed-program
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
            TakeDamage(hit);
            Health = Health + 1;   // the armour blocks 1 point
            Console.WriteLine($"after a hit of {hit}, health is {Health}");
        }
    }
}
```

```csharp exec
id: probe-armour-fixed-program
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

### P8. The classic Main, as the page shows it (runs, and prints Hello, World!)

```csharp exec
id: probe-classic-main
namespace ConsoleApp1;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
```

### Q1. Practice problem 1: the station, as in the report, and fixed (prose: line 16; 4 packs each)

```csharp exec
id: probe-station
class Station
{
    public int FoodPacks;
    public List<string> Aboard;
    public List<string> Outside;

    public Station(int foodPacks, List<string> aboard, List<string> outside)
    {
        FoodPacks = foodPacks;
        Aboard = aboard;
        Outside = outside;
    }

    public int PacksEach(int people)
    {
        return FoodPacks / people;
    }

    public void ShareFood()
    {
        int each = PacksEach(Outside.Count);
        Console.WriteLine($"{each} packs each");
    }
}
```

```csharp exec
id: probe-station-program
expect: exception
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var station = new Station(24, crew, new List<string>());
station.ShareFood();
```

```csharp exec
id: probe-station-fixed-program
var crew = new List<string> { "Ada", "Grace", "Alan", "Mary", "Kofi", "Lin" };
var station = new Station(24, crew, new List<string>());
station.ShareFood();

class Station
{
    public int FoodPacks;
    public List<string> Aboard;
    public List<string> Outside;

    public Station(int foodPacks, List<string> aboard, List<string> outside)
    {
        FoodPacks = foodPacks;
        Aboard = aboard;
        Outside = outside;
    }

    public int PacksEach(int people)
    {
        return FoodPacks / people;
    }

    public void ShareFood()
    {
        int each = PacksEach(Aboard.Count);
        Console.WriteLine($"{each} packs each");
    }
}
```

### Q2 and Q3. Practice problems 2 and 3, fixed (prose: 8; True both ways)

```csharp exec
id: probe-counter-fixed-program
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
id: probe-lamp-no-bool-program
var hall = new Lamp("Hall");
hall.Light();
Console.WriteLine(hall.IsLit);

class Lamp
{
    public string Room;
    public bool IsLit;

    public Lamp(string room)
    {
        Room = room;
    }

    public void Light()
    {
        IsLit = true;
    }
}
```

```csharp exec
id: probe-lamp-this-program
var hall = new Lamp("Hall");
hall.Light();
Console.WriteLine(hall.IsLit);

class Lamp
{
    public string Room;
    public bool IsLit;

    public Lamp(string room)
    {
        Room = room;
    }

    public void Light()
    {
        this.IsLit = true;
    }
}
```

### Q4. Practice problem 4 with an int total (prose: 188)

```csharp exec
id: probe-average-int
int total = 0;
int count = 0;
foreach (int score in new List<int> { 120, 340, 85, 210 })
{
    total = total + score;
    count = count + 1;
}
Console.WriteLine(total / count);
```

### Q6. Practice problem 6: Shield in a namespace, without and with using, then as the answer writes it (prose: CS0246; 3 and 0)

```csharp exec
id: probe-shield-namespace
namespace MyProject;

class Shield
{
    public int Strength;

    public Shield(int strength)
    {
        Strength = strength;
    }

    public int Block(int hit)
    {
        return Math.Max(0, hit - Strength);
    }
}
```

```csharp exec
id: probe-shield-no-using
expect: CS0246
var shield = new Shield(2);
Console.WriteLine(shield.Block(5));
```

```csharp exec
id: probe-shield-using
using MyProject;

var shield = new Shield(2);
Console.WriteLine(shield.Block(5));
Console.WriteLine(shield.Block(1));
```

```csharp exec
id: probe-shield
class Shield
{
    public int Strength;

    public Shield(int strength)
    {
        Strength = strength;
    }

    public int Block(int hit)
    {
        return Math.Max(0, hit - Strength);
    }
}
```

```csharp exec
id: probe-shield-program
var shield = new Shield(2);
Console.WriteLine(shield.Block(5));
Console.WriteLine(shield.Block(1));
```

### Q8. Practice problem 8, with a Console.WriteLine(Burns) inside Burn (prose: 0 every time)

```csharp exec
id: probe-burns-printed-program
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

### Q9 and Q10. string.Join on the party (prose: Ada), and joining a string and a number (prose: depth: 120)

```csharp exec
id: probe-join-program
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

```csharp exec
id: probe-depth
Console.WriteLine("depth: " + 120);
```

### P9. The challenge: as given, with the name fixed, and with both fixes (prose: 3 photos, 0 kg left)

```csharp exec
id: probe-challenge-given
expect: CS0103
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
        return $"{Name}: {Photo.Count} photos, {Fuel} kg left";
    }
}
```

```csharp exec
id: probe-challenge-name-fixed
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
id: probe-challenge-both-fixed
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

### P10 and P11. The table's other two slips (prose: CS1061 and CS1501). They are meant not to compile, so they come last.

```csharp exec
id: probe-bag-lowercase-add
expect: CS1061
class Bagger
{
    public List<string> Bag = new();

    public void PickUp(string item)
    {
        Bag.add(item);
    }
}
```

```csharp exec
id: probe-bag-lowercase-add-fixed
class Bagger
{
    public List<string> Bag = new();

    public void PickUp(string item)
    {
        Bag.Add(item);
    }
}
```

```csharp exec
id: probe-burn-two-values
expect: CS1501
class Probe
{
    public int Fuel;
    public int Rate;

    public void Burn(int kg)
    {
        Fuel = Math.Max(0, Fuel - kg);
    }

    public void Travel(int days)
    {
        Burn(days, Rate);
    }
}
```
