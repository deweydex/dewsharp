# Notes: one-class-many-methods (C# draft)

Ported from dewlab `tutorials/one-class-many-methods/` (the tutorial, its
practice page and its glossary, all version 2026.09.26.1). Written on 27
September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 10, batch 2).
No earlier partial draft existed in this folder, so this is a first draft.
It follows the pattern of the `keeping-details-inside-an-object` draft, the
page before it in the series, whose second version of the class chain it
starts from.

Files:

- `one-class-many-methods.md`: the tutorial. 22 `csharp exec` cells: 16
  shared, and 2 in each world (a class cell and a program cell). A reader
  in one world sees 18. 3 predicts, 4 hints, 3 solutions (each with
  `inputs`), 1 answer fold, 1 challenge.
- `one-class-many-methods-practice.md`: the practice page. 18 cells (a
  class cell and a program cell for each of problems 1 to 5 and 7 to 10),
  5 predicts, 2 hints, 2 solutions (each with `inputs`), 9 answer folds.
- `one-class-many-methods.native.json`,
  `one-class-many-methods-practice.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the
  numbers and messages in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files: **No problems.** On `NOTES.md` (the
  probes): **No problems.**
- Every `solution` sits on a program cell, as the statements followed by
  the whole class, so the native check runs each one against its
  `inputs`. Values:
  - `LightHours()`: the starter does not compile (CS1061, expected); the
    solution gives `4.2` and `0.7`.
  - Game: the starter gives `"Ada (health 13)"` and `"Grace (health 4)"`,
    and `IsDown()` does not compile yet; the solution gives
    `"Ada (health 10)"`, `"Grace (health 0)"`, `false`, `true`.
  - Solar system: the starter gives `"Voyager (fuel 120 kg)"`, and
    `CanBurn` does not compile yet; the solution gives `true`, `false`,
    `"Voyager (fuel 100 kg)"`.
  - Practice 2: `"Earth"` in both orders. Practice 7: `"Juno (fuel 100
    kg)"` and `"Voyager (fuel 40 kg)"`.
- Every CS code and message quoted in the prose is copied from the
  check's output. As in the earlier drafts, the prose quotes the message
  and not the `file(line,col)` part. Where the page says "line 3" or
  "line 19 of the class", that is the line the check reported.
- No cell reads input. dewlab's page had no `input()` and no stand-ins,
  so no cell needs `stdin:`. No cell uses `ReadKey`, `Clear` or colours,
  so the native check could run everything.
- The four links in "Where to read more" returned HTTP 200 on 27
  September 2026, and I read the parts the page describes: the overloading
  guidelines (same parameter names and the same order in every overload),
  the static members page (static fields and methods, and `Math` as a
  static class), the constructors page (an `Employee` class with two
  constructors, one calling the other with `: this(...)`), and NASA's
  fact sheet (the distances 57.9, 108.2, 149.6, 228.0, 778.5 and 4515.0).

## What changed from the Python page, and why

**Frontmatter.** `year:` is gone. The worlds are game, solar-system and
your-own, with the predecessor's wording; ocean is dropped. dewlab's
`covers:` was per section (FOOP-LO4, FOOP-LO8, FOOP-LO3); the course map
gives `[FOOP-LO3, FOOP-LO4, FOOP-LO8]`, which is what the page has. The
title is the course map's.

**Cells follow the rules of the road.** Each Python cell became a class
cell and a program cell below it. Each class cell writes `Planet` again,
complete, and replaces the one above for the cells below it (rule 4); the
prose says so at the first replacement. Rules 1, 2 and 4 are pointed to
where the page relies on them.

**The opening (`sunlight-1`, `-2`).** Keeps its number predict
(tolerance 10). `round()` became `Math.Round(x, 1)`, defined in one
sentence before the cell. C# prints `251`, not Python's `251.0`, and the
prose says why in one sentence (the course map's "numbers print C#'s
way").

**Giving it more to do.** `-1` (class) and `-2` (program) are dewlab's
first cell. `self.light_minutes()` became `LightMinutes()` by its name
alone, with one sentence on `this.LightMinutes()`, which the-moves page
taught. The paragraph on reuse keeps dewlab's point, with "a method
outside the class" in place of "a stand-alone function". The task,
`-3`, is a program cell that calls `LightHours()`, so it fails with
CS1061 until the reader adds the method to the class cell above
(`expect: CS1061`, and the prose says the failure is expected, as the
the-moves draft does). Two hints, the second giving the method's first
line, as in the the-moves draft, because C# needs the return type.

**Data that belongs together.** `self._moons = []` became
`private List<string> _moons = new List<string>();` and `moon in
self._moons` became `_moons.Contains(moon)`, defined in the prose. The
loop over `[earth, mars]` became `foreach (Planet planet in new
List<Planet> { earth, mars })`, and the prose says that a list can hold
objects. The paragraph "why is `_moons` private" now says what a public
list would allow in C# (`mars._moons.Add("Phobos")`), since the page
before taught that `private` is checked by the compiler.

**New section: "One name, two methods: overloading".** The course map
asks for it (FOOP's descriptor names method overloading). It sits after
"Data that belongs together", because its second half uses the moons.
- `overloading-1`, `-2`: `IsFartherThan(Planet other)` and
  `IsFartherThan(double distance)`. *Overload* and *overloading* are
  defined after the run. The prose names two overloads the reader has
  already used (`Math.Round` with one and two arguments, and
  `Console.WriteLine`), and says that C# chooses when it compiles.
- An invitation, not a cell: add `mars.IsFartherThan("Jupiter")` and read
  the message. The answer fold quotes CS1503 (probe P1) and says that
  the message names only one of the two methods.
- `overloading-3`, `-4`, "A second constructor": the moons class again,
  with `Planet(string name, double distance, List<string> moons) :
  this(name, distance)`, which adds each moon with `AddMoon`, so the rule
  holds for moons given to the constructor. The prose explains
  `: this(...)`, and invites the reader to put Phobos in the list twice
  (probe P2: one refusal, `Mars 2`). `: this(...)` is on its own line,
  indented, to keep the line short.

**"Class attributes and instance attributes" became "One value for the
whole class".** The course map's central change. C# has no *attribute*
in Python's sense (an attribute in C# is `[Obsolete]` and its kind), so
the page never uses the word. dewlab's glossary terms became: *instance*,
*instance field*, *static field* and *member*, each defined where it
first appears.
- `-1`, `-2`: `public static string Star = "the Sun";`, read inside the
  class by an `Orbits()` method, and changed once through the class,
  `Planet.Star = "Sol";`. In C# a program cannot read `earth.Star`, so
  dewlab's `print(earth.star)` became `earth.Orbits()`, which reads the
  static field from inside the class. A new choice predict: both show Sol,
  both show the Sun ("each planet kept its own copy"), or only one.
- `-3` (new, `expect: CS0176`): `Console.WriteLine(earth.Star);`. The
  prose explains every part of the message: *member*, *instance
  reference*, *qualify it with a type name*. dewlab's trap section
  (`earth.star = "Proxima"` quietly making a new attribute) cannot
  happen in C#; it became one bracketed paragraph for readers who know
  Python, and practice problem 3.
- `-4`, `-5`: the count of planets made, `public static int PlanetsMade =
  0;`. It prints `3`. The prose adds that each Run starts a new program
  (rule 1), so the count starts at 0 on every run.
- New: `Math.Round`, `Math.Max` and `Console.WriteLine` are static
  methods, which is why they are called through a class name.
- The table keeps dewlab's four rows (how it is written, who has it,
  example, how to change it), with "inside the class" and "outside the
  class" in place of "example", because C# reads a static field
  differently from the two places. Probe P3 checks the last row.

**Your turn: your class, third version.** Each world has a class cell
(`your-class-3--<world>`, with `file:`) and a program cell
(`your-class-3-program--<world>`), as in the predecessor. The class cell
is the predecessor's solution (version 2) copied exactly. The task is
dewlab's `game-3.py` and `solar-system-3.py` in C#:
- Game: `public static int MaxHealth = 10;`, `IsDown()`, and `Heal`
  refusing a character who is down and using `Math.Min(MaxHealth, ...)`.
- Solar system: `public static int TankSize = 100;`, `CanBurn(int kg)`,
  `Burn` using `!CanBurn(kg)`, and `Refuel` using `Math.Min(TankSize,
  ...)`.
- The starter programs compile and show the problem first: Ada heals to
  13 and Grace heals from 0 to 4; Voyager refuels to 120 kg. dewlab's
  solar-system program printed `can_burn(80)` in the middle, which in C#
  would stop the starter from compiling; the call moved to `inputs`, and
  the program gained a refused burn of 80 so that the refusal still
  appears in the output with the new `CanBurn` check.
- The `inputs` call `IsDown()` and `CanBurn()`, which the starter class
  does not have. Their "What your code gave" column is a compile error
  until the reader writes the methods.
- The solution notes keep dewlab's question (what does a negative heal or
  burn do to this version? Probes P5 and P6: Ada ends with −42 health,
  Voyager with 150 kg, over its tank) and add one about overloading: could
  a second constructor start a character at `MaxHealth`, or a probe with
  a full tank? (P5, P6: `Alan (health 10)`, `Juno (fuel 100 kg)`.)
  Practice problem 7 is that task, for the probe.
- The hints begin with a question. The solar-system hint defines `!`,
  which PDP's `making-decisions` teaches, for readers who came from
  Python (`not`).
- The your-own world has two comment-only cells (class and program), as in
  the predecessor.

**Looking back and the challenge.** The question keeps dewlab's shape,
worded as a question rather than "Look at…". dewlab's "Every method on
this page found what it needed on self, with nothing given to it" was
changed to "Most methods", because the next sentence names two methods
that take a parameter. The Kepler challenge is statements then the class,
as in the earlier drafts, and the prose gives `Math.Pow(x, 1.5)`, since
C# has no power operator and a FOOP reader from Python may not know it.
Probe P4: the starter prints 0 and 0; a solution rounded to one place
gives 1.9 (Mars), 165.8 (Neptune) and 1 (Earth). The prose states no
answer.

**Next and "Where to read more".** dewlab's "Next" offered the polynomial
project, then designing classes. In dewsharp the polynomial page is an
explore page (`DECISIONS.md` 15, batch 13), so "Next" goes to
`from-a-description-to-classes` only. *Think Python* and the Python
tutorial became Microsoft Learn (member overloading, static members,
constructors). NASA's fact sheet stays.

**Style.** Phrasal verbs and idioms were taken out where dewlab's wording
had them ("leaves out", "keep in step", "look at", "just as well").
Every term is defined where it first appears: *reusable*, *overload*,
*overloading*, *instance*, *instance field*, *static field*, *member*,
*instance reference*, and on the practice page *ambiguous*.

## The practice page, problem by problem

1. **Two questions for one planet.** Unchanged in substance; class and
   program cells, with the predict.
2. **The closer of two.** A program cell that calls `CloserOf`
   (`expect: CS1061` until the reader writes it), with the solution on the
   program cell. The solution returns `this`, which the note explains.
   The hint asks what type the method returns, which C# needs written.
3. **One star, renamed.** In Python, `earth.star = "Proxima"` made a new
   attribute; in C# it is CS0176 at line 3 (`expect: CS0176`). The
   predict keeps dewlab's two outcomes and adds "It does not compile".
   The fold keeps dewlab's lesson: if each planet needs its own star,
   make it an instance field. `Orbits()` reads the static field, since
   the program cannot.
4. **A planet counter.** `for name in [...]: Planet(name)` became a
   `foreach` with `new Planet(name);` as a statement. Prints `4`. New in
   the fold: a public static count can be reset by any program (probe
   P7), and the page before gives the fix, a property with a private
   `set`, which works with `static` too (P7: `4`, and CS0272 for
   `Planet.PlanetsMade = 0;`).
5. **Moons for everyone.** dewlab's shared class list works the same way
   in C#: `public static List<string> Moons`. Printing through
   `earth.Moons` would be CS0176, so the class has a `MoonNames()`
   method. Prints `Phobos`.
6. **One limit or many.** The ocean's Nautilus and Alvin became two
   probes in the solar system, with made-up tank sizes (100 kg and
   500 kg). Prose and a fold, as in dewlab.
7. **A full tank to start** (new). Constructor overloading with
   `: this(name, TankSize)`, in the solar system. The program fails with
   CS7036 until the reader writes the constructor (`expect: CS7036`). The
   course map asks for a second constructor; the tutorial shows one, and
   this is the "completed" step.
8. **Two methods, one name** (new). Two `Describe()` methods, one
   returning and one printing: CS0111, with CS0121 (*ambiguous*) after
   it. The fold uses "read the first message first" from the style guide,
   and says that the return type does not count. The fix prints `Mars is
   a planet.` (probe P8).
9. **From earlier: reaching in.** In Python the program printed 2; in C#
   it is CS0122 at line 3. No predict block (the page already has five);
   the prose asks for a guess and a run.
10. **From earlier: one argument short.** Python's `TypeError` became
    CS7036 at line 19 of the class. The fold adds that with the
    tutorial's two overloads the message is CS1501, "No overload for
    method 'IsFartherThan' takes 0 arguments" (probe P11). The fix prints
    `Mars` (P10).
11. **From earlier: which move?** dewlab's fill-in-the-blank `question`
    became a list with an answer fold, as the the-moves draft did. The
    code is to read, not run. P9 checks that the loop and `_moons.Count`
    agree.

The broken classes are placed so that they do not stop later problems:
problem 8's class is replaced by problem 9's `Planet` (rule 4, said in
the prose), and problem 10's is the last class on the page.

## What C# made different, in short

- Overloading exists, and FOOP names it. Python has no overloading of
  this kind (a second `def` with the same name replaces the first).
- A static field is reached through the class from outside it, and by
  its name alone from inside. Python's `earth.star` trap is a compiler
  error (CS0176).
- A constructor can call another constructor of the same class with
  `: this(...)`.
- A missing argument is found before the program runs (CS7036, or
  CS1501 when there are overloads).
- Two methods that differ only in what they return do not compile
  (CS0111).
- `Math.Round(x, 1)` in place of `round()`; `251`, not `251.0`.

## What should change once the page UI or the browser checker exists

1. **Compare with a solution when the starter does not compile.** The
   `LightHours`, `CloserOf` and full-tank tasks call a method or a
   constructor that the reader has not written yet, so "What your code
   gave" is a compile error for every input until they do. The world
   tasks' `IsDown()` and `CanBurn()` inputs are the same. The page should
   show that as information ("does not compile yet"), not as a long
   message in a table cell.
2. **Messages from cells above.** Practice problems 8 and 10 have their
   error in the class cell, and the program cell below shows it too
   (with CS0121 appearing twice in problem 8). The fold for problem 8
   says so. If the page shows only the target cell's own diagnostics, or
   labels the others "from a cell above", that sentence needs a look.
3. **A reader's half-edited class.** The `LightHours` task asks the reader
   to edit `giving-it-more-to-do-1`. If it is left not compiling, `-2` and
   `-3` stop compiling too. Every later shared cell writes `Planet` again,
   so nothing further down is affected, if the page drops a replaced class
   before compiling, as NativeCheck does. Check that the browser engine
   does the same.
4. **Empty cells** (the your-own world) have kind `empty`.
5. **The challenge** is statements then a class in one block. If the
   notebook splits a challenge into cells, split this one.
6. **Cell length.** Class cells are 12 to 36 lines (the solutions up to
   51), against the guide's 5 to 15. `overloading-3`, with two
   constructors, `AddMoon` and `MoonCount`, is the longest class cell.

## Open questions for a reviewer

1. **Size.** The course map says M (8 to 15 cells). A reader sees 18: the
   split into class and program cells, plus the new overloading section
   (4 cells) and the CS0176 cell. If it is too long, the second
   constructor (`overloading-3`, `-4`) could move to the practice page,
   which already has the constructor task (problem 7); but then the
   reader writes `: this(...)` without a worked example first.
2. **`static` or `const` for the limits.** Version 3 has `public static
   int MaxHealth = 10;` and `public static int TankSize = 100;`, because
   the section teaches static fields and dewlab's version is a class
   attribute. A C# programmer would more often write `public const int
   MaxHealth = 10;`, since any code can change a public static field
   (`Character.MaxHealth = 1000;`). Should the page mention `const`, or
   should version 3 use it? A later page (`from-a-description-to-classes`
   or `types-and-their-sizes`) might be the place.
3. **`PlanetsMade` is a public static field** in the tutorial, as dewlab's
   class attribute was. The page before made a count a property with a
   private `set`; here that appears only in practice problem 4's fold. It
   could be the tutorial's own form, at the cost of one more idea in that
   cell.
4. **The class chain's third version has no second constructor.** It is
   dewlab's version 3 in C#, and the solution notes invite the second
   constructor as a question. If the chain should show overloading (FOOP
   names it), version 3 could add `Character(string name) : this(name,
   MaxHealth)` and `Probe(string name) : this(name, TankSize)` (probes P5
   and P6 run both). The next page's first types cell copies whatever
   version 3 is.
5. **Version 2 is copied from the predecessor's draft solutions.** If the
   `keeping-details-inside-an-object` draft changes (for example, if
   `Name` becomes a property, its open question 4), the class cells in
   `your-class-3--game` and `--solar-system` must be copied again. The
   first version is still a guess, as that draft notes, because
   `objects-and-classes` has no draft yet.
6. **Cell ids.** `class-attributes-and-instance-attributes-1` to `-5` keep
   dewlab's prefix, as the course map lists them, though the page never
   says *attribute* and the heading is "One value for the whole class".
   New cells use `overloading-1` to `-4`. The ids of the split cells
   shift (dewlab's `giving-it-more-to-do-2`, the task, is now `-3`), as
   in the earlier drafts. Rename before any class uses the page, if
   wanted.
7. **Python asides.** The page has one bracketed paragraph for readers
   who know Python (CS0176), and folds on the practice page (problems 3,
   9 and 10) compare with Python. A reader who took PDP in C# does not
   need them. Keep, shorten, or put them in a `dl-why` fold?
8. **World order.** The shared prose teaches with planets, and the
   frontmatter lists game first, to match the other FOOP drafts. The same
   question the predecessors raised.
9. **Links and batches.** This page is batch 2. It links back to
   `keeping-details-inside-an-object` (batch 1) and, on the practice page,
   `the-moves-you-already-know` (batch 1) and `the-tools-around-your-code`
   (batch 3, whose problem it draws on in reading order), and forward to
   `from-a-description-to-classes` (batch 3, "Next"). The polynomial
   explore page (batch 13) is not linked; its author could add a line
   here, since it meets overloading again, for operators.
10. **The CS1503 fold** says that the message names only one of the two
    methods. That is what the check printed; I did not find a rule for
    which overload Roslyn names, so the fold does not give one.
11. **Five predicts on the practice page** (dewlab had five, counting the
    number predicts). Problem 9 asks for a guess in prose instead of a
    block.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| `8.3`, `251` | `sunlight-2` |
| `True`, `Mars: sunlight takes 12.7 minutes` | `giving-it-more-to-do-2` |
| CS1061 on `LightHours`; `4.2` (and `0.7`) | `giving-it-more-to-do-3` and its solution |
| refusal, `Earth 1`, `Mars 2` | `data-that-belongs-together-2` |
| `True`, `False` | `overloading-2` |
| CS1503 message | probe P1 |
| `Earth 0`, `Mars 2` | `overloading-4` |
| Phobos twice: one refusal, `Mars 2` (not stated in the prose) | probe P2 |
| `Sol` for both planets | `class-attributes-and-instance-attributes-2` |
| CS0176 message | `class-attributes-and-instance-attributes-3` |
| `3` | `class-attributes-and-instance-attributes-5` |
| table: `mars.Distance = 230.0;` changes Mars's only | probe P3 |
| game: Ada 13, Grace heals from 0; then `Ada (health 10)`, refusal, `Grace (health 0)` | `your-class-3-program--game` and its solution |
| solar system: 120 kg; then refusal, `Voyager (fuel 100 kg)` | `your-class-3-program--solar-system` and its solution |
| the notes' questions (−42 health, 150 kg; `Alan (health 10)`, `Juno (fuel 100 kg)`) | probes P5, P6 |
| challenge: 0 and 0 as given; 1.9, 165.8 solved | probe P4 |
| practice 1: `False`, `43.3` | `two-questions-2` |
| practice 2: `Earth` in both orders | `the-closer-of-two-2` solution |
| practice 3: CS0176, line 3 | `one-star-renamed-2` |
| practice 4: `4`; reset to 0; CS0272 with a private `set` | `a-planet-counter-2`; probe P7 |
| practice 5: `Phobos` | `moons-for-everyone-2` |
| practice 7: CS7036; `Juno (fuel 100 kg)` | `a-full-tank-to-start-2` and its solution |
| practice 8: CS0111, then CS0121; the fix prints `Mars is a planet.` | `two-methods-one-name-1/2`; probe P8 |
| practice 9: CS0122, line 3 | `from-earlier-reaching-in-2` |
| practice 10: CS7036, line 19; `Mars`; CS1501 | `from-earlier-one-argument-short-1/2`; probes P10, P11 |
| practice 11: the loop and `_moons.Count` agree | probe P9 |

## Probes

Each probe is one program: its statements, then its class. A class in a
probe carries down to the probes below it until one writes it again
(rule 4), so the probe whose class does not compile is last.

### P1. Tutorial, overloading: `mars.IsFartherThan("Jupiter")` (prose: CS1503, naming only `Planet`)

```csharp exec
id: probe-no-overload-fits
expect: CS1503
var mars = new Planet("Mars", 228.0);
Console.WriteLine(mars.IsFartherThan("Jupiter"));

class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public bool IsFartherThan(Planet other)
    {
        return Distance > other.Distance;
    }

    public bool IsFartherThan(double distance)
    {
        return Distance > distance;
    }
}
```

### P2. Tutorial, a second constructor: Mars made with Phobos twice in its list (the rule still holds)

```csharp exec
id: probe-constructor-keeps-rule
var mars = new Planet("Mars", 228.0, new List<string> { "Phobos", "Deimos", "Phobos" });
Console.WriteLine($"{mars.Name} {mars.MoonCount()}");

class Planet
{
    public string Name;
    public double Distance;
    private List<string> _moons = new List<string>();

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public Planet(string name, double distance, List<string> moons)
        : this(name, distance)
    {
        foreach (string moon in moons)
        {
            AddMoon(moon);
        }
    }

    public void AddMoon(string moon)
    {
        if (_moons.Contains(moon))
        {
            Console.WriteLine($"Refused: {moon} is already a moon of {Name}.");
            return;
        }
        _moons.Add(moon);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

### P3. Tutorial, the table: `mars.Distance = 230.0;` changes Mars's only; `Planet.Star` changes for every planet

```csharp exec
id: probe-table
var earth = new Planet("Earth", 149.6);
var mars = new Planet("Mars", 228.0);
mars.Distance = 230.0;
Planet.Star = "Sol";
Console.WriteLine($"{earth.Distance} {mars.Distance}");
Console.WriteLine(earth.Orbits());
Console.WriteLine(mars.Orbits());

class Planet
{
    public static string Star = "the Sun";

    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public string Orbits()
    {
        return $"{Name} orbits {Star}";
    }
}
```

### P4. The challenge, as given, then with `Math.Pow` (the prose states no number)

```csharp exec
id: probe-challenge-as-given
Console.WriteLine(new Planet("Mars", 228.0).YearLength());
Console.WriteLine(new Planet("Neptune", 4515.0).YearLength());

class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double YearLength()
    {
        // Earth is 149.6 million km from the Sun.
        return 0;
    }
}
```

```csharp exec
id: probe-challenge-solved
Console.WriteLine(new Planet("Mars", 228.0).YearLength());
Console.WriteLine(new Planet("Neptune", 4515.0).YearLength());
Console.WriteLine(new Planet("Earth", 149.6).YearLength());

class Planet
{
    public string Name;
    public double Distance;    // millions of km from the Sun

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public double YearLength()
    {
        return Math.Round(Math.Pow(Distance / 149.6, 1.5), 1);
    }
}
```

### P5. Game, version 3: the solution note's two questions (`ada.Heal(-50)`, and a second constructor)

```csharp exec
id: probe-game-v3-questions
var ada = new Character("Ada", 8);
ada.Heal(-50);
Console.WriteLine(ada);
var alan = new Character("Alan");
Console.WriteLine(alan);

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

    public Character(string name)
        : this(name, MaxHealth)
    {
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

### P6. Solar system, version 3: the solution note's two questions (`voyager.Burn(-50)`, and a second constructor)

```csharp exec
id: probe-solar-v3-questions
var voyager = new Probe("Voyager", 100);
voyager.Burn(-50);
Console.WriteLine(voyager);
var juno = new Probe("Juno");
Console.WriteLine(juno);

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

    public Probe(string name)
        : this(name, TankSize)
    {
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

### P7. Practice 4: a public static count can be reset; with a private `set` it cannot

```csharp exec
id: probe-count-public
foreach (string name in new List<string> { "Mercury", "Venus", "Earth", "Mars" })
{
    new Planet(name);
}
Planet.PlanetsMade = 0;
Console.WriteLine(Planet.PlanetsMade);

class Planet
{
    public static int PlanetsMade = 0;

    public string Name;

    public Planet(string name)
    {
        Name = name;
        PlanetsMade = PlanetsMade + 1;
    }
}
```

```csharp exec
id: probe-count-private-set
foreach (string name in new List<string> { "Mercury", "Venus", "Earth", "Mars" })
{
    new Planet(name);
}
Console.WriteLine(Planet.PlanetsMade);

class Planet
{
    public static int PlanetsMade { get; private set; }

    public string Name;

    public Planet(string name)
    {
        Name = name;
        PlanetsMade = PlanetsMade + 1;
    }
}
```

```csharp exec
id: probe-count-private-set-refused
expect: CS0272
Planet.PlanetsMade = 0;
```

### P8. Practice 8, fixed: the second method renamed, and the program calls it (prose: Mars is a planet.)

```csharp exec
id: probe-two-names-fixed
var mars = new Planet("Mars");
mars.PrintDescription();

class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }

    public string Describe()
    {
        return $"{Name} is a planet.";
    }

    public void PrintDescription()
    {
        Console.WriteLine(Describe());
    }
}
```

### P9. Practice 11: the loop and `_moons.Count` give the same answer

```csharp exec
id: probe-moon-count-loop
var mars = new Planet("Mars");
mars.AddMoon("Phobos");
mars.AddMoon("Deimos");
Console.WriteLine($"{mars.MoonCount()} {mars.MoonCountByLoop()}");

class Planet
{
    public string Name;
    private List<string> _moons = new List<string>();

    public Planet(string name)
    {
        Name = name;
    }

    public void AddMoon(string moon)
    {
        _moons.Add(moon);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }

    public int MoonCountByLoop()
    {
        int count = 0;
        foreach (string moon in _moons)
        {
            count = count + 1;
        }
        return count;
    }
}
```

### P10. Practice 10, fixed (prose: prints Mars)

```csharp exec
id: probe-one-argument-fixed
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.FartherOf(earth).Name);

class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public bool IsFartherThan(Planet other)
    {
        return Distance > other.Distance;
    }

    public Planet FartherOf(Planet other)
    {
        if (IsFartherThan(other))
        {
            return this;
        }
        return other;
    }
}
```

### P11. Practice 10, with the tutorial's two overloads (prose: CS1501). Last, because its class does not compile

```csharp exec
id: probe-one-argument-two-overloads
expect: CS1501
var mars = new Planet("Mars", 228.0);
var earth = new Planet("Earth", 149.6);
Console.WriteLine(mars.FartherOf(earth).Name);

class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }

    public bool IsFartherThan(Planet other)
    {
        return Distance > other.Distance;
    }

    public bool IsFartherThan(double distance)
    {
        return Distance > distance;
    }

    public Planet FartherOf(Planet other)
    {
        if (IsFartherThan())
        {
            return this;
        }
        return other;
    }
}
```
