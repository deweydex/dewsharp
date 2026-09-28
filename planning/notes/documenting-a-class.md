# Notes: documenting-a-class

Ported from dewlab `tutorials/documenting-a-class/` (the tutorial, its
practice page and its glossary file, all version 2026.09.26.1) on
27 September 2026, as a draft in `drafts/lessons/documenting-a-class/`.
Moved into `lessons/documenting-a-class/` on 28 September 2026, checked in
the browser engine, and revised; both pages are now version
2026.09.28.1. Written against dewsharp's `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to entry 40), and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 20, batch 9, "adapt", shape
tutorial, size M, worlds game, solar system and your own, covers
FOOP-LO9).

Files:

- `lessons/documenting-a-class/documenting-a-class.md`: the tutorial. 19
  `csharp exec` cells: 9 shared (5 types cells, 4 program cells), 4 in the
  game world, 4 in the solar system, 2 in your own. A reader sees 13 (11
  in their own world), which is size M in the course map's terms (8 to 15
  cells). 2 predicts, 4 hints, 2 solutions (no `inputs`), 3 answer folds,
  6 fences of code to read, 1 challenge.
- `lessons/documenting-a-class/documenting-a-class-practice.md`: the
  practice page. 8 problems, 6 exec cells (3 types cells, 3 program
  cells), 1 predict, 8 answer folds, 2 fences of code to read (and one
  inside a fold). The cells: `the-test-class` (types),
  `a-promise-for-enter-1` (types) and its `-program`,
  `the-same-list-written-differently-1` (program), and
  `a-comment-that-stopped-1` (types) and its `-program`.
- The two `.outputs.json` files beside them, written by
  `npm run check-lessons -- --write documenting-a-class`.

## How it was checked

- **The browser checker** (`npm run check-lessons -- documenting-a-class`)
  passes on both pages: 20 runs and 6 runs, no problems. Every cell
  compiles with no warning, so no warning travels down the page
  (`DECISIONS.md` 30).
- **The draft in the browser.** Before any change, the draft's cells were
  run in the browser with `--write`, and every output was the same as the
  native checker's. The only difference in what was recorded is the line
  of the exception's frame in `StarSystem.Farthest()` (39 in the browser,
  41 natively, since the browser counts from the cell's first line of
  code), and no prose quotes a line number.
- **The porter's probes in the browser.** P1, P2 and P8 (below) were run
  in a scratch lesson with `node tools/check-lessons.mjs --lessons <scratch>`,
  and print what the native run printed.
- **The class chain, backwards.** The six world cells were compared by
  script with the sixth version on `testing-what-a-class-does` (`Character`
  and `Probe` from its "then the rule" solutions; `Healer`, `Room`,
  `Lander` and `Mission` from its world cells). All six are identical. The
  two solutions here (the seventh version) differ from the sixth only in
  comments: the `///` lines, the `//` comments on `Healer` and `Lander`
  that became class summaries, and `// a burn below 0 would add fuel` in
  `Probe.CanBurn`.
- **The class chain, forwards.** `a-front-end-for-a-class` reached
  `lessons/` while this page was being revised. Its seven world cells that
  copy the seventh version (`the-game-so-far` and the
  `your-class-8-so-far-*` cells) are identical to the classes in this
  page's two solutions.
- **Download project.** For each world, the page's own `projectFiles`
  (`web/page/project.js`) was called in headless Chromium with the reader's
  finished task: the seventh-version classes in the three types cells, and
  the solution's tests in the program cell. The project holds
  `Program.cs`, `StarSystem.cs`, `Test.cs`, the world's three classes and
  `IrishCulture.cs`; the earlier `Probe` copies are left out (rule 4), and
  the README says so. `dotnet run` prints `Tests run: 3. Passed: 3.` (game)
  and `Tests run: 5. Passed: 5.` (solar system), as the page does.
- **The XML in every comment.** The same two projects build with
  `-p:GenerateDocumentationFile=true`, which makes the compiler check the
  comments: 0 warnings, and a documentation file is written. With a
  `<param>` renamed on purpose, that build gives CS1572 and CS1573; without
  the setting, as on the page and in a new project, it gives none. So the
  page never says that the compiler checks a comment, except in "Where to
  read more", which names the setting.
- **The page itself.** Both pages were opened headlessly in each world
  (`lesson.html?sw=off&id=...`): no page errors, the kind labels are
  `types` and `program` where intended (`empty` for the two your-own
  cells), every `lesson:` link resolves, and no `<summary>` in a hint, a
  fold or a predict option became an HTML element: they all render as
  code. The Visual Studio section was looked at in a screenshot.

## What changed from the Python page, and why

**Frontmatter.** `year:` goes. The per-section `covers:` becomes
`[FOOP-LO9]`, as in the course map. The worlds are the game, the solar
system and your own; the ocean goes (`DECISIONS.md` 13). The title is the
course map's. dewlab's glossary had three terms (*docstring*, *doctest*,
`help()`). The page defines their C# counterparts where they first
appear: *documentation*, *documentation comment*, *XML*, *tag*, and later
*pseudocode*. It names docstring and doctest once each, for readers from
Python. `help()` has no C# counterpart on the page: Visual Studio's hover
takes its place, in the last section.

**Links.** Every earlier page this one names is now in `lessons/`, so
each is a link: [Composition](lesson:objects-inside-objects),
[Testing a class](lesson:testing-what-a-class-does),
[Visual Studio](lesson:the-tools-around-your-code) and, on the practice
page, [Inheritance](lesson:one-parent-many-children). The next page,
[A front end](lesson:a-front-end-for-a-class), is a link too. *Two names,
one object* (`two-names-one-object`, practice problem 3) is not in
`lessons/` and not in this batch, so it stays in italics, with no link
(`DECISIONS.md` 32).

**The opening.** dewlab opened with a question and a definition, and its
first cell showed `help(Probe)`. On the page, a documentation comment
does nothing that a program can show: the compiler skips it, and .NET
cannot read it back while a program runs. So the style guide's "run
first, then name" needed a different first cell. The page keeps dewlab's
two questions, and then runs the probe with no comments at all:
`voyager.Burn(200)` on a probe with 70 kg. The predict asks what happens,
with four answers that a method called `Burn` could each give. It prints
the refusal, then `70`. The name does not say which, and that is the
reason for documentation. The refusal case is dewlab's own. New ids:
`no-comments-yet-1` (types) and `no-comments-yet-1-program`.

**A comment for the class** (dewlab: "A class docstring"). The comment is
shown as code to read, with the place it goes ("just above `class
Probe`", where Python's is inside), and the reader adds it to the first
cell, presses Check, and runs the program again. A fold answers "What
changes?": nothing (probe P1). dewlab's `a-class-docstring-1` has no cell
here.

**What a method promises.** The four things stay, three with their own
tag (`<summary>`, `<param name="kg">`, `<returns>`), and the refusal, in
the summary or in `<exception>`. The two comments for `Burn` stay as code
to read, and dewlab's multiple-choice `question` becomes a question in
prose with the answer in a fold. The C# comment has no `<returns>`, and a
paragraph says why. "A good one says four things" became "A useful one"
(no verdict words).

**A method that refuses with an exception** is new: the course map lists
`<exception>`, and the class chain refuses only by printing. It takes
`Farthest()` from *Composition*, where a star system with no planets
stopped with an `ArgumentOutOfRangeException` at `_planets[0]` (recorded
there, in the `a-system-holds-its-planets-2` solution's inputs) and the
solution note asked "What should it do instead?". Here it refuses with an
`InvalidOperationException` and a message, and the program cell
(`expect: exception`) prints `Mars`, then stops with it.

**Two kinds of comment** and **A plan in pseudocode** are new, from the
course map ("Comments that say why stay"; "an algorithm written as
pseudocode above a method").

**Examples a program can check** (dewlab: "Examples Python can check";
ids renamed, `DECISIONS.md` 28). doctest has no C# twin. The draft wrote
a checker of its own, `Example.Check(string call, object expected, object
actual)`, which printed a line either way. Since the draft,
`testing-what-a-class-does` reached `lessons/` with `Test.Check<T>` and
`Test.RunAll`, and the course map calls FOOP's checker "the same small
`Check` method" (see "Decided", question 2). So the examples are now
tests, and the section, the world tasks, the challenge and practice
problems 3 and 4 use `Test`:

- `examples-a-program-can-check-test` (types, `Test.cs`) is `Test`,
  copied exactly from the testing page, with two sentences that remind the
  reader what `Check` and `RunAll` do. The draft's paragraph on `static`,
  `static class`, `object` and `Equals` went, since the testing page
  taught them.
- The probe with three examples in its comment (`-1`), and a program with
  one small test for each example (`SomeOfTheFuel`, `MoreThanTheFuel`,
  `AllOfTheFuel`), each making its own probe, as the testing page taught.
  It prints `Tests run: 3. Passed: 3.`
- The teammate's `<` for `<=` (`-2`), the same three tests, and the page's
  second predict, with its options now in `RunAll`'s terms. It prints
  `a probe with 70 kg can burn all 70 kg: expected True, found False`,
  then `Tests run: 3. Passed: 2.`
- "In a larger project, the checks ... run every time the code changes"
  was more than the testing page says. It is now "the tests go in a test
  project, as on Testing a class, and **Run All** in Test Explorer runs
  every one of them", which is that page's own description.

**Your turn: your class, seventh version.** Each world has three types
cells with the sixth version, and a program cell that runs one test of an
example with `Test.RunAll`. The program compiles and runs from the start
(no `expect:`), because a comment changes nothing that runs. The hints
wait for runs (`after: 2 runs`, `after: 4 runs`); the page counts runs of
the program cell itself (`web/page/lesson.js`, `afterRun`), so a Check on
a types cell above does not count. The second game hint now shows a test
method, and its name going in the list. The solutions add a test for each
example in their comments: 3 in the game, 5 in the solar system. The
your-own world now says where the reader's classes are: the first cell of
their own world on *Testing a class* (the draft said "the last cells",
which is where the tests are).

**What Visual Studio shows** is new: the course map says the page ends
with one Visual Studio step. Its opening now uses the testing page's
words for what runs where ("Everything above this part runs here, in the
browser. This part needs a computer with Visual Studio."). Step 3 says to
click at the end of the first line of `Program.cs`, since the program now
ends with test methods.

**Looking back and the challenge.** The question now compares an example
in a comment with a test. The challenge's starter is statements (one test
of an empty mission, for a first step), then `Test`, a short `Probe` and
`Mission`, with a line that says the challenge brings its own copies, as
the testing page's challenge does. It compiles alone (recorded under
`challenges`). The prose asks "Which of your tests notices?" and quotes no
result.

**Where to read more.** Microsoft's *Recommended XML documentation tags*
and *XML API documentation comments*, both on Microsoft Learn; both
addresses answered on 28 September 2026. "the setting that switches it
on" became "the setting that asks the compiler for that file" (a phrasal
verb).

## The practice page, problem by problem

dewlab's eight problems, in C#. Its `question` blocks become lists and
folds, or a predict. The ocean goes. `Test` is in the first cell, as on
`testing-what-a-class-does-practice`, and problems 3 and 4 use it.

1. **Which comment helps?** dewlab's three docstrings for `heal`, as three
   `<summary>` lines, with a fold.
2. **A promise for Enter.** A `Room` of names, so that the page needs no
   `Character`, and problem 3 can use it. The model comment is in a "one
   answer" fold, since a solution that adds only comments would show
   nothing in "Compare with a solution". The fold's CS0815 and its message
   are probe P8's.
3. **The same names, two lists.** Two tests: the example as written (a
   list) and the list joined into one string. The first does not pass,
   because `Equals` asks whether two lists are the same object, and both
   print as their type's name; the second passes: `Tests run: 2. Passed:
   1.` The predict's third note now says what `Check` has compared so far,
   since `Check<T>` compiles for two lists.
4. **A comment that stopped telling the truth.** The bag, with `<` for
   `<=`, and two tests. "the comment is out of date" became "it is the
   comment that no longer says what the code does" (an idiom).
5. **Where does it go?** Unchanged.
6. **From earlier: a test at the edge.** Unchanged, with links.
7. **From earlier: what the container asks.** The fold no longer says
   "Voyager now has 50 kg", a number that no cell on the page prints; it
   says that Voyager's own `Fuel` is now lower, and the list still says
   70, the amount given in the question. "goes down" became "is now lower"
   (a phrasal verb).
8. **From earlier: one sentence for a child class.** "built to last" (an
   idiom) became "hard to defeat", and "goes up to 20" became "can reach
   20". "a hit of 7 takes 3" is recorded on *Inheritance*
   (`one-parent-many-children.outputs.json`, `a-method-of-its-own-4`:
   `Grog (health 7)` after `new Troll("Grog", 10)` and `TakeDamage(7)`),
   and the fold says "as it did to Grog on that page".

## The porter's questions

### Decided

1. **The practice page link.** Kept as a link. The two pages moved into
   `lessons/` together, the checker accepts the link, and the exemplars
   link to their own practice pages.
2. **`Example.Check`.** Replaced by `Test.Check` and `Test.RunAll` from
   `testing-what-a-class-does`. The course map's entry for that page says
   it uses "the same small `Check` method" as `building-reusable-tools`,
   and this page's entry says the examples are checked "with `Check`": one
   checker for the course. The testing page is in `lessons/`, and the next
   page, `a-front-end-for-a-class`, already uses `Test.Check` and calls it
   the testing page's, so this page was the one to change.
3. **The sixth version.** Checked by script against
   `testing-what-a-class-does`: the six world cells are identical to it.
4. **Two predicts.** Kept: the style guide asks for two or three.
5. **The sentence about assessment.** Kept, reworded. The FOOP descriptor
   (`/home/user/dewlab/planning/curriculum/descriptors/FundamentalsofObjectOrientedProgramming5N0541.pdf`,
   read from its text streams) asks each skills demonstration for
   "appropriate program documentation to include the algorithm", its
   marking sheets have "algorithm/pseudocode provided" and "intelligent use
   of comments", and section 6 asks the learner to "state the purpose of
   pseudocode and provide examples". The page now says: "The skills
   demonstrations in this module, its assessed projects, ask for the
   algorithm behind your program as well as its code".
7. **Size.** A reader sees 13 cells (11 in their own world): size M in the
   course map's terms. Using the testing page's `Test` also removed a
   paragraph of new ideas (`static class`, `object`, `Equals`).
8. **Ids.** No class has used this page, so the ids follow the playbook:
   dewlab's where the task is the same (`your-class-7--<world>`,
   `the-same-list-written-differently-1`), `-program` for a program under a
   types cell (`DECISIONS.md` 26), and new ids for new tasks. dewlab's
   `examples-python-can-check-1` names Python and became
   `examples-a-program-can-check-1` (`DECISIONS.md` 28). The draft's
   `examples-a-program-can-check-example` and
   `the-same-list-written-differently-example` held `Example`, which is
   gone; `Test` is in `examples-a-program-can-check-test` and, on the
   practice page, `the-test-class`, as on the testing practice page.
9. **"Where to read more" has two entries.** Kept: the exemplars list four
   and five, and the testing page three.

From "What to revisit": hints after runs, code inside folds and hints,
`<summary>` in prose, the forward link and the seventh version's copy were
all checked (see "How it was checked"). A solution that changed only
comments would show nothing in "Compare with a solution"; the solutions
now add tests too, so the program's last line differs
(`Tests run: 1. Passed: 1.` against `Tests run: 3. Passed: 3.` in the
game).

### Open

For Josh:

1. **Visual Studio, for real.** The last section's fold is written from
   Microsoft's documentation and general knowledge, not from a session in
   Visual Studio. Microsoft's page says only that IntelliSense shows
   `<summary>`. Check that the hover also shows the `<returns>` text, that
   typing the opening bracket shows the `<param>` text, and what typing
   `///` above a method writes (the fold says only that `<summary>` comes
   first, with the cursor inside it). The downloaded projects build and run
   with `dotnet` (above), but were not opened in Visual Studio.
2. **Constructors in the task** (the porter's question 6). The task asks
   for a comment on every constructor, which dewlab did not ask for
   `__init__`. Visual Studio shows a constructor's comment when you type
   `new Probe(`, so it is where "fuel in kilograms, from 0 up to TankSize"
   belongs; but it makes the solutions longer. Nothing in the contracts
   decides it. Kept for now.
3. **Facts in the prose that no cell prints** (the porter's question 10).
   That Python calls the idea a docstring and has doctest, and that
   Microsoft's documentation starts summaries with a verb in *-s*, come
   from dewlab's page and from Microsoft Learn. They are not numbers, so
   "every number is run" does not cover them.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `Refused: Voyager cannot burn 200 kg now.`, then `70` | lesson cell `no-comments-yet-1-program` |
| with the class comment added, the same two lines | probe P1 |
| *Composition*'s `Farthest()` stopped with `ArgumentOutOfRangeException` at `_planets[0]` | `objects-inside-objects.outputs.json`, `a-system-holds-its-planets-2`, solution input 3; probe P2 |
| `Mars`, then `InvalidOperationException`, `Vega has no planets, so none is farthest.` | lesson cell `what-a-method-promises-1-program` |
| `Tests run: 3. Passed: 3.` | lesson cell `examples-a-program-can-check-1-program` |
| `a probe with 70 kg can burn all 70 kg: expected True, found False`, `Tests run: 3. Passed: 2.`; C# prints `True` | lesson cell `examples-a-program-can-check-2-program` |
| game solution: `Tests run: 3. Passed: 3.` | the solution of `your-class-7-program--game` |
| solar-system solution: `Tests run: 5. Passed: 5.` | the solution of `your-class-7-program--solar-system` |
| the `Standing` example takes four lines | the solution's comment on `Standing` |
| the compiler checks `<param>` names once a documentation file is asked for | the project build in "How it was checked" (CS1572, CS1573) |
| practice 2: CS0815 and its message | probe P8 |
| practice 3: the ``List`1[System.String]`` message, and `Tests run: 2. Passed: 1.` | practice cell `the-same-list-written-differently-1` |
| practice 3: `Contains` did not find a second `Character("Ada", 10)` | *Composition*'s solution note for `your-class-5-program--game` |
| practice 4: `an empty bag can take 20 kg: expected True, found False`, `Tests run: 2. Passed: 1.` | practice cell `a-comment-that-stopped-1-program` |
| practice 7: 70 kg and a burn of 20 kg | given in the question; no result is quoted |
| practice 8: a hit of 7 takes 3 | `one-parent-many-children.outputs.json`, `a-method-of-its-own-4` |

No compiler message's line or column is quoted in the prose.

## Probes

Run in the browser with the checker, from a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), on
28 September 2026. Each probe writes every class it needs below its
statements. P8 is last, because it is meant not to compile. The draft's
P3 to P7 and P9 backed sentences that the revision removed or rewrote
around `Test` (the 50 kg in practice 7, the troll's 7 now cited from
*Inheritance*, and the challenge's results, which the page no longer
quotes), so they are not kept here.

### P1. Tutorial, "A comment for the class": the comment changes nothing

Prints `Refused: Voyager cannot burn 200 kg now.`, then `70`.

```csharp
var voyager = new Probe("Voyager", 70);
voyager.Burn(200);
Console.WriteLine(voyager.Fuel);

/// <summary>
/// One space probe: a name, and fuel in kilograms. The fuel is never below 0.
/// </summary>
class Probe
{
    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;
        }
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
}
```

### P2. Tutorial: *Composition*'s `Farthest()` with no planets

The version the reader wrote on *Composition* (its solution), with no
check for an empty list. Stops with `System.ArgumentOutOfRangeException`,
`Index was out of range. Must be non-negative and less than the size of
the collection. (Parameter 'index')`, in `StarSystem.Farthest()`.

```csharp
var vega = new StarSystem("Vega");
Console.WriteLine(vega.Farthest().Name);

class Planet
{
    public string Name;
    public double Distance;

    public Planet(string name, double distance)
    {
        Name = name;
        Distance = distance;
    }
}

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public Planet Farthest()
    {
        Planet best = _planets[0];
        foreach (Planet planet in _planets)
        {
            if (planet.Distance > best.Distance)
            {
                best = planet;
            }
        }
        return best;
    }
}
```

### P8. Practice 2: storing what a `void` method returns

Does not compile: `CS0815`, `Cannot assign void to an implicitly-typed
variable`, line 2, column 5.

```csharp
var hall = new Room("Hall");
var result = hall.Enter("Ada");

class Room
{
    public string Name;
    private List<string> _names = new List<string>();

    public Room(string name)
    {
        Name = name;
    }

    public void Enter(string name)
    {
        if (_names.Contains(name))
        {
            Console.WriteLine($"Refused: {name} is already in {Name}.");
            return;
        }
        _names.Add(name);
    }
}
```
