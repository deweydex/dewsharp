# Notes: keeping-details-inside-an-object (C# draft)

Ported from dewlab `tutorials/keeping-details-inside-an-object/` (the
tutorial, its practice page and its glossary, all version 2026.09.26.1).
Written on 27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 9, batch 1).
No earlier partial draft existed in this folder, so this is a first draft.

Files:

- `keeping-details-inside-an-object.md`: the tutorial. 21 `csharp exec`
  cells: 15 shared, and 2 in each world (a class cell and a program cell).
  A reader in one world sees 17. 3 predicts, 3 hints, 3 solutions (each
  with `inputs`), 1 challenge.
- `keeping-details-inside-an-object-practice.md`: the practice page. 16
  cells (a class cell and a program cell for each of 8 problems), 4
  predicts, 1 hint, 1 solution, 9 answer folds.
- `keeping-details-inside-an-object.native.json` and
  `keeping-details-inside-an-object-practice.native.json`: what the native
  check recorded (`--json`).
- `NOTES.md`: this file, and `NOTES.native.json`, what its probes printed.
  The probe cells at the end run with the same NativeCheck command (pass
  `NOTES.md` as the file). They check the numbers
  and messages in the prose that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files: **No problems.** On `NOTES.md` (the
  probes): **No problems.**
- Each `solution` sits on a program cell, as the statements followed by the
  whole class. So the native check runs every solution against its
  `inputs` (it does not do that for a solution on a types cell; see the
  notes for `the-moves-you-already-know`). Values:
  - Refuel task: the starter gives `-50`, the solution gives `100`.
  - Game: `"Ada (health 15)"` and `15`, then `"Ada (health 10)"` and `10`.
  - Solar system: `"Voyager (fuel 0 kg)"` and `0`, then
    `"Voyager (fuel 70 kg)"` and `70`.
  - Practice 2: all five names, then `"Ada, Grace, Alan, Katherine"`.
- Every CS code and message quoted in the prose is copied from the check's
  output. As in the earlier drafts, the prose quotes the message and not
  the `file(line,col)` part, because the page names files differently from
  the native check. It does give line numbers where the page says "line 3"
  (CS0122 at lines 3, and 3 and 5 on the practice page), and those are the
  lines the check reported.
- The three Microsoft Learn pages in "Where to read more" returned HTTP 200
  on 27 September 2026, and I read the parts the page cites. The naming
  page (*C# identifier naming rules and conventions*) says that private
  instance fields start with an underscore; the floating-point page says
  that `decimal` represents 0.1 exactly and `double` does not.

## What changed from the Python page, and why

**The world.** dewlab taught the page in the ocean: a submarine whose hull
is safe to 400 m. The course map (and `DECISIONS.md` 13) retells it in the
solar system: Juno, a probe that refuses a burn bigger than its fuel.
Every shared example follows: `dive`/`rise` became `Burn`/`Refuel`, the
spare oxygen tank became a spare fuel tank (litres and millilitres became
kilograms and grams), and the practice page's submarine became a lander
and a station. The ocean world variant is gone.

**Cells follow the rules of the road.** Each Python cell became a types
cell and a program cell below it. Each program makes its own objects, and
the prose points to rules 2, 3 and 4 where it relies on them. The
opening's class includes `Refuel` from the start, so that the Refuel task
needs only a program cell: the reader edits the class at the top of the
page and runs the program again.

**"Reaching in from outside" became "Changing a field from outside", and
the compiler refuses.** The course map's central change. The section now
runs:

1. `reaching-in-from-outside-1`: with the opening's public `Fuel`, the
   program changes the field directly and prints `-50`. This is dewlab's
   own experiment, and in C# it gives the same result, because the field
   is public.
2. `public` and `private` are named as *access modifiers*; `protected` is
   mentioned and left for inheritance. The page says that a member with no
   modifier is private (the tools page's practice problem 3 met this).
3. `-2` (types): the fuel as `private int _fuel`, with a getter,
   `GetFuel()`. `-3`: the same change from outside, `expect: CS0122`. The
   message comes twice (line 3 uses `_fuel` twice), and the prose says so.
4. `-4`: a program that uses only the methods: `40`.
5. `-5` (types): `public int Fuel { get; private set; }`, C#'s own way,
   with the line read in three parts, and *automatic property* named.
   `-6`: the same program with `juno.Fuel`: `40`. The reader is invited to
   add `juno.Fuel = 600;` and read the compiler's answer (CS0272; probe
   P3). The message is quoted on the practice page, problem 1, not here.

The heading changed because "reaching in" is a phrasal verb. The cell ids
keep dewlab's `reaching-in-from-outside-` so that a teacher can compare
the two pages.

**The underscore.** Python's underscore convention becomes C#'s naming
convention for a private field (`_fuel`), which is what the course map
asks for and what Microsoft's naming page says. The page separates the two
things: `private` is the lock the compiler checks, and the underscore is a
sign for people. Practice problem 4 makes the point with a public field
named `_checks`. The two-underscore paragraph (Python's name mangling) is
gone.

**Your turn, the class chain's second version.** Each world has a class
cell (`your-class-2--<world>`, with `file:`) and a program cell
(`your-class-2-program--<world>`). The change asked for is: a rule in a
method, and the field made a property with a private `set`. In C# this is
two changes, not dewlab's three: `public int Health;` becomes
`public int Health { get; private set; }`, and every other line of the
class keeps working, because inside the class the property is used as the
field was. dewlab's rename to `_health` on every line, and its
`get_health()`, have no counterpart. The solution notes say so. The hints
use `after: 2 runs`, because the starter runs without an error.

**What a caller needs to know.** The spare tank keeps dewlab's point and
numbers: ten uses of 0.1 leave `1.3877787807814457E-16`, and `False`. The
prose explains `E-16`. Then:

- The whole-units tank keeps grams in a private `int`, and its
  `Kilograms` property now has a body in `get`. The page says that a
  property can calculate its value and a field cannot. This is where the
  reader first sees a property with a body.
- dewlab's `question` block ("which caller's line stops working?") became
  the predict the course map asks for: "Which of the program's lines stops
  compiling?", on the program cell under the new class. The answer is
  none of them, and the run shows `0` and `True`.
- New, from the course map: a third tank with a private `decimal`, which
  prints `0` and `True` too. Its public methods still take and give
  `double`, so the program is the same for all three tanks. The prose says
  that `(decimal)` turns the double 0.1 into exactly 0.1 (probe P4).
- The closing paragraph says what C# changes: in Python a caller could
  still use `_litres` and would stop working; in C# the compiler refused
  that line from the start.

**Looking back and the challenge.** The question changes with the
language: in C# the compiler checks `private` and nothing checks the
underscore, so what is each for? The challenge keeps dewlab's health bar,
as statements followed by the class, with "the six lines above the class"
in place of "any line below the class". It invites either fix: whole hit
points or `decimal`. Probe P2 runs it as given (`1.3877787807814457E-16
False`) and with each fix (`0 True`).

**The rest.**

- Titles use the course map's titles. The practice page is
  "Encapsulation: practice", the form the-moves draft used.
- The glossary terms (encapsulation, convention, private, getter, caller,
  abstraction) are defined in the prose where they first appear, because
  dewsharp has no glossary panel yet. So are *access modifier*, *property*,
  *automatic property*, *inaccessible*, `decimal`, and on the practice page
  *accessor* and `value`.
- "Where to read more" cites Microsoft Learn (access modifiers,
  properties, floating-point types) in place of the Python tutorial and
  *Think Python*.
- The page ends with the practice page, the challenge, the next page and
  three things to read.
- Phrasal verbs were taken out of dewlab's wording where they appeared
  ("goes through", "go around", "gives back", "goes back to", "come
  together"). "Looking back" stays as the closing heading, to match the
  other drafts; it is a phrasal verb too, and could become "What you
  have seen" on every page at once.
- Every hint now opens with a question, as the style guide asks. dewlab's
  began "Copy the shape…" and "There are three changes."

## The practice page, problem by problem

1. **A line that skips the rule** (dewlab "Around the rule"). The field is
   now a property with a private `set`, and the line that changes it from
   outside does not compile: `expect: CS0272`, with a predict. The fold
   defines *accessor*, the word in the message. (dewlab's title was
   changed because "go around" is a phrasal verb.)
2. **Room for four.** The submarine became a lander. `len()` became
   `_crew.Count`. The list's contents are printed with `string.Join`
   inside a method, `CrewNames()`, so the private list is never handed to
   a caller. (Handing out the list itself would let a caller call `Add`
   on it and skip the rule. That belongs to `two-names-one-object`.)
3. **The heating.** Python's `set_temperature()` method became a property
   whose `set` holds the check, the usual C# form. dewlab's second question
   ("why call the method rather than write the field?") has no point in C#,
   where the field cannot be written from outside. It became: why does
   `heating.Temperature = 35;` compile, when `juno.Fuel = 600;` did not?
   `value` is defined in the fold. This is the only place the course meets
   a `set` with a body; one-class-many-methods may want to use it.
4. **Which are private?** dewlab's list of names became a class and a
   program with `expect: CS0122`, so the reader can test the answer. It
   adds two C# points: a field with no modifier is private, and a public
   field whose name starts with an underscore is still public.
5. **Enough for the trip.** Grams in place of millilitres; the same three
   results (`True`, `False`, `True`). The fold's 999, 1001 and 1000 g come
   from probe P5.
6. **A change the callers never see.** In Python, `spare._millilitres`
   worked until the field changed, then stopped with `AttributeError`. In
   C# it would never have compiled, so the question now asks about a field
   the writer made public (`public int _grams;`). The fold says that the
   line stops compiling (probe P9: CS1061).
7. **Two ideas, one class.** Unchanged in substance.
8. **From earlier: storing on the object** (dewlab problem 10, "storing on
   self"). `refusals = self._refusals + 1` became
   `int refusals = Refusals + 1;`, with `Refusals` a property with a
   private `set`. It prints `0`; the fix gives 2 (probe P8). No warning
   (CS0219 appears only when a constant is stored).
9. **From earlier: a list that was never made** (new; replaces dewlab's
   problem 8, "a rule that forgot self", which has no C# counterpart
   because a field is reached without `this`). It uses the bug from the
   tools page's game world: a private `List<string>` field that is never
   made, a `NullReferenceException` in `Board`, and warning CS0649 before
   the run. The fix prints 1 (probe P7).
10. **From earlier: printed, not returned** (dewlab problem 9). `__str__`
    that prints became a `ToString()` that prints, which is CS0161 in C#:
    the compiler finds it before anything runs. dewlab's `question` block
    became a predict. Both cells carry `expect: CS0161`, because the error
    is in the class cell and every program below it shows the same error.
    The fix prints `Ada` (probe P6). The cells are `-2` and `-3`, so that
    the class cell keeps dewlab's id (`from-earlier-printed-not-returned-2`).

Problems 9 and 10 are last on purpose; see "What should change once the
page UI exists", item 2.

## What C# made different, in short

- The lock exists. `private` is checked by the compiler (CS0122), and a
  property's private `set` too (CS0272). dewlab's "the underscore is a sign,
  not a lock" becomes "the underscore is a sign, and `private` is the
  lock".
- A property does a getter's work, and more: it can have a private `set`,
  a `get` that calculates, and a `set` that checks. C# classes use
  properties for this, not `GetFuel()` methods, so the page shows the
  getter once and moves to the property.
- Changing a field to an automatic property changes one line, not every
  line of the class.
- `decimal` is a second way to keep 0.1 exactly.
- A caller that used a private field cannot exist, so "which caller
  breaks?" becomes "which line stops compiling?", and the answer is none.
- `ToString()` that forgets `return` is a compiler error, not an exception.

## What should change once the page UI or the browser checker exists

1. **Compare with a solution on a program cell whose solution declares a
   class.** Each solution is the statements and then the whole class, so
   it replaces the reader's class above for that run (rule 4). The native
   check runs it. The page should do the same, and "show the solution"
   will show statements before a class, which is a different layout from
   the two cells on the page. If the page gains Compare on a types cell,
   these solutions could move to the class cells, as the-moves draft has
   them.
2. **Messages from cells above.** Practice problem 9's CS0649 warning is
   shown again under problem 10's two cells, and problem 10's CS0161 is
   shown under its program cell as well as its class cell. Problem 10 is
   last, so its broken class does not stop any later program. If the page
   shows only the target cell's own diagnostics, or labels the others "from
   a cell above", the prose for problem 10 ("the class cell and the program
   both show it") needs a look.
3. **A reader's half-edited class.** On the tutorial page, a world's class
   cell sits above the six spare-tank cells. If a reader leaves that class
   in a state that does not compile, the tank programs below it stop
   compiling too, in that world only. The same holds for the opening
   class, which the Refuel task asks the reader to edit. The page could
   say which cell the error is in.
4. **Empty cells** (the your-own world) have kind `empty`. They become a
   types cell and a program cell once the reader writes in them.
5. **The challenge** is statements and then a class in one block. If the
   notebook splits a challenge into cells, split this one.
6. **Cell length.** The class cells are 17 to 32 lines, and the solutions up
   to 37, against the guide's 5 to 15. With a brace on its own line, a
   class with a constructor and three methods cannot be shorter.
7. **Size.** The course map says M (8 to 15 cells). A reader sees 17: the
   split into class and program cells, the getter step the map asks for,
   and the `decimal` tank add about eight cells to dewlab's seven. If it is
   too long, the `decimal` tank (`what-a-caller-needs-to-know-5/6`) could
   move to the practice page.

## Open questions for a reviewer

1. **The class chain's first version is a guess.** `objects-and-classes`
   has no draft yet. `your-class-2--game` and `your-class-2--solar-system`
   start from my C# reading of dewlab's `setup/oop/game-1.py` and
   `solar-system-1.py` and the course map's description (public fields, a
   constructor, `ToString()`, `TakeDamage` with `Math.Max`, `Heal`; and
   `Burn` with `Math.Max`, `Refuel`). Check both against that page's
   `your-class-1` cells once they exist, and copy them exactly.
2. **The second version uses automatic properties** (`Health { get;
   private set; }`, `Fuel { get; private set; }`), not a private `_health`
   field with a getter. The course map calls the automatic property "C#'s
   own way". `one-class-many-methods` (version 3) should start from these.
3. **Private field names: `_fuel`.** This answers the course map's open
   question 8 for this page, following the course map's note and
   Microsoft's naming page. The style guide's `#code` names PascalCase and
   camelCase only; it could add "`_camelCase` for a private field".
4. **`Name` stays a public field** in version 2 of both worlds, so the
   chain changes one thing at a time. The game's solution note asks the
   reader whether a character's name should be changeable. Should the
   chain make `Name` a property now, or on the next page?
5. **World order.** The shared prose teaches in the solar system, and the
   frontmatter lists game first, to match the other FOOP pages. This is
   the same question the-moves draft raised.
6. **Links and batches.** The course map's batch rule 3 says a lesson
   links back only to earlier batches, and a forward link is added by the
   later batch. This page is batch 1. It links to `objects-and-classes`
   (batch 0), but also to `one-class-many-methods` (batch 2, "Next") and,
   on the practice page, to `the-moves-you-already-know` (batch 1) and
   `the-tools-around-your-code` (batch 3), whose problems it draws on in
   reading order. The other batch-1 drafts do the same. Remove them until
   those pages exist, or keep them (open question 6 of the map).
7. **Link texts** use the course map's titles. The drafts of
   `the-moves-you-already-know` and `the-tools-around-your-code` use other
   titles for themselves and for this page ("Encapsulation: keeping an
   object's data behind its methods", in the tools draft's practice
   problem 3 and its "Next" line). One of the two should change.
8. **`covers`.** dewlab gives FOOP-LO3 to every section and FOOP-LO4 to
   "What a caller needs to know"; the course map says
   `[FOOP-LO3, FOOP-LO4]`, which is what the page has. The `decimal` part
   also touches FOOP-LO1 (data types).
9. **Refusing with a message.** Every rule on the page prints "Refused:
   ..." and returns, as dewlab's did. Real C# code would usually `throw`
   an exception. Is that for `testing-what-a-class-does`, or earlier?
10. **The spare tank's `Kilograms` property on the `decimal` tank** hides
    that the value goes back to a `double` on the way out. For 0 this is
    exact; the page does not claim more. Is it worth one sentence?
11. **The predict before `which-are-private-2`** was left out on purpose:
    the page asks the reader to decide for each line and then run the
    program, which works as a guess without a block. There are 4 predicts
    on the practice page; dewlab had 3 and a `question`.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| refusal, `70` | `keeping-details-to-itself-2` |
| `-50`; refusal and `100` | `keeping-details-to-itself-3` and its solution |
| refusal, `-50` | `reaching-in-from-outside-1` |
| CS0122 message, twice, line 3 | `reaching-in-from-outside-3` |
| refusal, `40` (twice) | `reaching-in-from-outside-4`, `-6` |
| `juno.Fuel = 600;` does not compile | probe P3 (CS0272) |
| `Ada (health 15)`; refusal and `Ada (health 10)` | `your-class-2-program--game` and its solution |
| `Voyager (fuel 0 kg)`; refusal and `Voyager (fuel 70 kg)` | `your-class-2-program--solar-system` and its solution |
| `1.3877787807814457E-16`, `False` | `what-a-caller-needs-to-know-2` |
| 0.00000000000000013877… (fifteen zeros) | probe P1 |
| `0`, `True` (grams, then `decimal`) | `what-a-caller-needs-to-know-4`, `-6` |
| `(decimal)` makes the double 0.1 exactly 0.1 | probe P4 |
| challenge: not 0 as given; `0 True` with either fix | probe P2 |
| practice 1: CS0272 message | `around-the-rule-2` |
| practice 2: the refusal for Mary, four names | `room-for-four-2` and its solution |
| practice 3: refusal, `22` | `the-heating-2` |
| practice 4: CS0122 at lines 3 and 5 | `which-are-private-2` |
| practice 5: `True`, `False`, `True`; 999, 1001, 1000 g | `enough-for-the-trip-2`; probe P5 |
| practice 6: `spare._grams` stops compiling | probe P9 (CS1061) |
| practice 8: `0`; the fix gives 2 | `from-earlier-storing-on-self-2`; probe P8 |
| practice 9: exception text and line, CS0649 text; the fix gives 1 | `from-earlier-a-list-that-was-never-made-2`; probe P7 |
| practice 10: CS0161 message; the fix prints `Ada` | `from-earlier-printed-not-returned-3`; probe P6 |

## Probes

Each probe is one program: its statements, then its class.

### P1. The digits of 1.3877787807814457E-16 (prose: 0.00000000000000013877…)

```csharp exec
id: probe-small-number
double left = 1.0;
for (int i = 0; i < 10; i++)
{
    left = left - 0.1;
}
Console.WriteLine(left.ToString("F20"));
Console.WriteLine((decimal)left);
```

### P2. The challenge as given, then with whole hit points, then with decimal

```csharp exec
id: probe-challenge-as-given
var ada = new Character("Ada");
for (int i = 0; i < 10; i++)
{
    ada.TakeDamage(0.1);
}
Console.WriteLine($"{ada.Health} {ada.IsDown()}");

class Character
{
    public string Name;
    public double Health { get; private set; }

    public Character(string name)
    {
        Name = name;
        Health = 1.0;   // a full health bar
    }

    public void TakeDamage(double fraction)
    {
        Health = Math.Max(0, Health - fraction);
    }

    public bool IsDown()
    {
        return Health == 0;
    }
}
```

```csharp exec
id: probe-challenge-whole-points
var ada = new Character("Ada");
for (int i = 0; i < 10; i++)
{
    ada.TakeDamage(0.1);
}
Console.WriteLine($"{ada.Health} {ada.IsDown()}");

class Character
{
    public string Name;
    private int _points;

    public Character(string name)
    {
        Name = name;
        _points = 100;   // a full health bar
    }

    public double Health
    {
        get
        {
            return _points / 100.0;
        }
    }

    public void TakeDamage(double fraction)
    {
        _points = Math.Max(0, _points - (int)Math.Round(fraction * 100));
    }

    public bool IsDown()
    {
        return _points == 0;
    }
}
```

```csharp exec
id: probe-challenge-decimal
var ada = new Character("Ada");
for (int i = 0; i < 10; i++)
{
    ada.TakeDamage(0.1);
}
Console.WriteLine($"{ada.Health} {ada.IsDown()}");

class Character
{
    public string Name;
    private decimal _health;

    public Character(string name)
    {
        Name = name;
        _health = 1.0m;   // a full health bar
    }

    public double Health
    {
        get
        {
            return (double)_health;
        }
    }

    public void TakeDamage(double fraction)
    {
        _health = Math.Max(0, _health - (decimal)fraction);
    }

    public bool IsDown()
    {
        return _health == 0;
    }
}
```

### P3. The tutorial's invitation: `juno.Fuel = 600;` with an automatic property

```csharp exec
id: probe-fuel-600
expect: CS0272
var juno = new Probe("Juno", 100);
juno.Fuel = 600;
Console.WriteLine(juno.Fuel);

class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }
}
```

### P4. `(decimal)` and the double 0.1 (prose: exactly 0.1)

```csharp exec
id: probe-decimal-conversion
Console.WriteLine((decimal)0.1);
Console.WriteLine((decimal)0.1 == 0.1m);
```

### P5. Practice 5: kilograms to grams (prose: 999, 1001, 1000)

```csharp exec
id: probe-grams
Console.WriteLine((int)Math.Round(0.999 * 1000));
Console.WriteLine((int)Math.Round(1.001 * 1000));
Console.WriteLine((int)Math.Round(1.0 * 1000));
```

### P6. Practice 10, fixed (prose: prints Ada)

```csharp exec
id: probe-tostring-fixed
var ada = new Character("Ada");
Console.WriteLine(ada);

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

### P7. Practice 9, fixed (the list is made)

```csharp exec
id: probe-list-made
var selene = new Lander("Selene");
selene.Board("Ada");
Console.WriteLine(selene.CrewCount());

class Lander
{
    public string Name;
    private List<string> _crew = new List<string>();

    public Lander(string name)
    {
        Name = name;
    }

    public void Board(string person)
    {
        _crew.Add(person);
    }

    public int CrewCount()
    {
        return _crew.Count;
    }
}
```

### P8. Practice 8, fixed (the count is stored on the object)

```csharp exec
id: probe-refusals-fixed
var juno = new Probe("Juno", 100);
juno.Burn(150);
juno.Burn(200);
Console.WriteLine(juno.Refusals);

class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public int Refusals { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
        Refusals = 0;
    }

    public void Burn(int kg)
    {
        if (kg > Fuel)
        {
            Refusals = Refusals + 1;
            return;
        }
        Fuel = Fuel - kg;
    }
}
```

### P9. Practice 6: a caller of `_grams`, after the tank goes back to a double

```csharp exec
id: probe-grams-gone
expect: CS1061
var spare = new FuelTank(1.0);
Console.WriteLine(spare._grams / 1000.0);

class FuelTank
{
    public double Kilograms { get; private set; }

    public FuelTank(double kilograms)
    {
        Kilograms = kilograms;
    }
}
```
