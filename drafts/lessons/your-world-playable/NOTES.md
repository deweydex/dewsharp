# Notes: your-world-playable (C# draft)

Ported from dewlab `tutorials/your-world-playable/` (the tutorial and its
glossary file, version 2026.09.26.1; the page has no practice page, and
its glossary has no entries). Written on 27 September 2026 against
dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` (to entry
39), and the entry for this page in `planning/COURSE_MAP.md` (FOOP lesson
23, batch 11, "adapt", shape series-end task, size M, worlds game, solar
system and your own, covers FOOP-LO6, FOOP-LO7, FOOP-LO10, FOOP-LO11).
The class chain continues from the drafts of `testing-what-a-class-does`
(the tests, and `Test`) and `documenting-a-class` (the seventh version).

There was no partial draft: the folder did not exist when this run
started, so the page was written from the beginning.

Files:

- `your-world-playable.md`: the page. 19 `csharp exec` cells: 2 shared
  (`Test`, and the blank `making-it-yours-1`), 7 in the game world, 7 in
  the solar system, 3 in your own. A reader in the game or the solar
  system sees 9 cells; in their own world, 5. 2 predicts (one in each of
  the two worlds, so a reader meets one), 2 hints, 2 solutions (no
  `inputs`), 1 answer fold, 6 fences of code to read, no challenge.
- `your-world-playable.native.json` and `NOTES.native.json`: what the
  native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file).

## How it was checked

- NativeCheck on the page and on this file: **No problems.** Every cell
  compiles with no warning, so no warning travels down the page
  (`DECISIONS.md` 30). No cell is meant to fail, so none has `expect:`.
- `web/lesson/parse.js` (the real parser, run from Node) reads the page
  with no errors: 19 cells, and each hint, predict and solution attached
  to the cell intended (`a-test-first--game` and
  `a-test-first--solar-system`, one of each).
- **The class chain.** A script compared each world cell with its
  source. `Character`, `Healer`, `Room`, `Probe`, `Lander` and `Mission`
  are exact copies of the classes in the two solutions of
  `your-class-7-program--<world>` in the `documenting-a-class` draft
  (the seventh version, with its XML comments). `Test` is an exact copy
  of `ten-lines-that-run-every-test-runner` in the
  `testing-what-a-class-does` draft, and the two test programs are
  exact copies of the solutions of `your-class-6-tests--<world>` there.
  Only `Commands` is new (see "The eighth version", below).
- **The Visual Studio section**, with the .NET 10 SDK's command line in
  the scratchpad, not with Visual Studio itself (nothing here runs
  Windows). For the game: the project that "Download project" makes
  (dewsharp's own `CSPROJ` and `IrishCulture.cs` from
  `web/page/project.js`, `Program.cs` = `your-world-front-end--game`,
  one file per class) built and played. Then a `classlib` project
  `GameWorld`; the four class files moved into it, with
  `namespace GameWorld;` and `public`. Building then gave 4 errors, the
  first `Program.cs(1,15): error CS0246: The type or namespace name
  'Character' could not be found (are you missing a using directive or
  an assembly reference?)`, then CS0246 for `Healer` and `Character`,
  and `error CS0103: The name 'Commands' does not exist in the current
  context`. With the `using` line and no reference: `error CS0246: The
  type or namespace name 'GameWorld' could not be found`. With the
  reference and no `using` line: the same four errors as before. With
  both: 0 warnings, 0 errors, and the game played the same. An `mstest`
  project (the .NET 10 template: MSTest 4.0.2, `Nullable` enabled) with
  the five tests as `[TestMethod]`s: 5 passed. `Assert.AreEqual(true,
  ada.IsDown())` gave `warning MSTEST0037: Use 'Assert.IsTrue' instead
  of 'Assert.AreEqual'`, which is why the page names `Assert.IsTrue` and
  `Assert.IsFalse`; with them, 0 warnings. The library and the test
  project, with `Nullable` enabled, gave 0 warnings, which is why the
  page says the classes give no nullable warnings. The same for the
  solar system (`SolarSystem`, its five tests: 5 passed, 0 warnings).
  `dotnet publish` of the console app wrote a folder with `Play` (the
  program) and `GameWorld.dll`, and the published program played. The
  scratch solutions are in the scratchpad, not in the draft.
- **Where to read more.** Each address was fetched (HTTP 200), and its
  title checked against the page's own `<h1>`.

## What changed from the Python page, and why

**Frontmatter.** `year:` goes. The per-section `covers:` becomes one
list, the course map's. The title says "course" where dewlab's said
"series", as the course map's title does: the class chain runs across
two series here ("Classes and objects" and "Classes working together").
The worlds are the game, the solar system and your own, with the
sentences the earlier FOOP drafts use. The ocean goes (`DECISIONS.md`
13). dewlab's glossary file is empty (the page introduces no terms), so
nothing had to be defined from it. The page defines the few terms that
are new here where they first appear: *solution*, *project*, *internal*,
*nullable warnings*. *Class library* and *namespace* come from
`namespaces-and-libraries`, and the page does not define them again.

**Links.** The task for this run asked for `[text](lesson:<id>)` links
with the course map's ids. The first mention of each earlier page is a
link: all twelve are in earlier batches, which batch rule 3 allows. A
later mention of the same page is its short title in italics, as the
`documenting-a-class` draft names pages. The one page after this one,
*Mixed problems* (`mixed-programming-with-objects`, batch 12), is in
italics with no link, as batch rule 3 says. See open question 1.

**What you have.** dewlab's nine pages, in C#: the constructor and
`ToString` for `__init__` and `__str__`; a private field behind a
property for "a private field with a getter"; a static field for "a
class attribute"; XML comments with examples that a program checks for
docstrings and doctest; `RunChoice` "tested with an array of commands,
and a loop that asks" for dewlab's `run_choice` and its menu (the
course map's entry for `a-front-end-for-a-class`). A new paragraph names
the three FOOP pages that gave tools and no version (*Visual Studio*,
*Interfaces*, *Namespaces and class libraries*), because the course map
says "What you have" lists the C# pages, and two of them are used in
the second half.

**Your world, running.** dewlab had three cells per world: all the
classes, the tests and the runner in one (with `{{include:}}`), a cell
that starts a new game, and a cell with a `dropdown` that plays one turn
each time it is run, using the variables of the cell above. Each part
changed:

- The classes go into types cells, one class each, with `file:`, as the
  course map asks. So "Download project" on the game gives one file per
  class, which is what the Visual Studio section moves into a library.
  The types cell holding the first class keeps dewlab's id
  (`your-world-running--<world>`, `DECISIONS.md` 26); the others are
  `your-world-running-<class>--<world>`, in the pattern of
  `your-class-7-healer--game` in `documenting-a-class`.
- `run_tests()` over `globals()` becomes `Test.RunAll` with a
  `List<Action>`, from `testing-what-a-class-does`. `Test` is the same in
  every world, so it is one shared types cell above the worlds
  (`your-world-running-test`), not three copies.
- The tests are a program cell, `your-world-running-program--<world>`
  (decision 26's `<id>-program`; the testing draft called its own
  `your-class-6-tests--<world>`).
- dewlab's new-game cell and front-end cell become one program,
  `your-world-front-end--<world>`: it makes the objects, and then a
  `do`...`while` loop reads a command with `Console.ReadLine()` and
  calls `Commands.RunChoice`, until `quit`. Rule 3 (variables stay in
  their cell) makes this necessary, and the course map's principles
  ("a game started in one cell and played in another ... becomes one
  program, usually a loop that reads input") say how. So the ids
  `your-world-new-game--<world>` are gone. The player types the command
  word (`look`, `attack` ...), and the program lists the commands first.
  This is the first front end of `a-front-end-for-a-class`, not its
  numbered menu, for two reasons: `Console.Clear()` and colours cannot
  be checked natively, and "What did they type that you never planned
  for?" in "Making it yours" needs a front end that lets a player type.
  `stdin:` gives the checker a game of six commands, one of them not a
  command (`dance`, `orbit`).
- The question under each world's game is new: what `Attack` or `Burn`,
  with a capital letter, does. A player meets it in the first minute,
  and `a-front-end-for-a-class` has the challenge that fixes it. Probes
  P1 and P3 show the answer (`Not a command: Attack`); the page leaves
  it to the run.
- The sentence after the worlds keeps dewlab's point ("different names,
  a different child class, a different rule") and turns "Every piece
  should be there, and the tests should pass" into two questions.

**Your world in Visual Studio** is new. The course map asks for it: the
world as one solution, with a class library, a console app that uses
it, and a test project, "the shape of FOOP's third skills
demonstration", plus a Windows Forms app "for readers who want one".
It starts from "Download project" on the game, because that project
already holds one file per class; the reader then adds a library, moves
the classes into it, meets CS0246 (which `namespaces-and-libraries`
meets on purpose, by the course map), adds the reference and the
`using` line, adds an MSTest project as `testing-what-a-class-does`
did, and publishes. The code to read is at column 0 between short
numbered lists, not inside a list item: the real parser takes a fence
indented up to three spaces as a block of its own, which would break
the list. A window gets one sentence, because `a-front-end-for-a-class`
is not written (see "The eighth version").

**Making it yours.** dewlab's paragraph, its ideas in each world and its
blank cell stay (`making-it-yours-1`). The order changes to the course
map's: a test first, then the rule, its XML comment and a command. The
worked first step is new: in the game and the solar system, a test for
a rule the world is missing, run before the rule exists, with a predict
on its last line, a hint, and a solution that writes the class again
below (rule 4, `DECISIONS.md` 26). The two rules are real gaps in the
seventh version: a hero who is down can still attack (nothing in
`RunChoice` asks), and `Refuel` accepts a negative number of kilograms
(dewlab's `solar-system-8.py` has the same gap). They give the page a
predict, where dewlab had none, and a first step anyone can take
(style guide checklist). See open question 2. The ideas lose `super()`:
the game's monster that fights back becomes a child class that
`RunChoice` asks how hard it hits, and the solar system's `Orbiter`
asks which method of `Probe` must be `virtual` first (`Burn` is not
virtual in the chain; only `CanBurn` is). "Show it to somebody" gains
the published program.

**Looking back.** dewlab's four questions stay. "There are no right
answers to them" and "put in the right place" used a word the style
guide bans; they are now "there is no answer to find on a page" and
"hardest to find a place for". The line about the Notebook becomes one
about Visual Studio, where the world now is.

**The end of the page.** No practice page and no challenge, as in
dewlab: a series-end task is its own challenge. The next page is
named. **Where to read more** replaces Sweigart's Python games book and
the Python tutorial with Microsoft's three tutorials that match the
Visual Studio section (a class library, testing it, publishing) and
Microsoft's object-oriented programming tutorial, which continues the
bank account tutorial the `objects-and-classes` exemplar lists.

## What C# made different, in short

- A method must be in a class, so `run_choice` lives in a class,
  `static class Commands`, in a types cell of its own.
- Each Run is a new program, so the game cannot be started in one cell
  and played in another: one program, with a loop that reads real
  input.
- Classes live in types cells, one per class with `file:`, which makes
  "Download project" give the files the Visual Studio section needs.
- A test runner cannot find tests by name, so the tests are a
  `List<Action>` for `Test.RunAll`, and MSTest's `[TestMethod]` in
  Visual Studio.
- A class needs `public` to be used from another project, and a
  namespace needs `using` or a reference fails with CS0246: both are
  compiler messages the reader meets on purpose.

## The eighth version

`a-front-end-for-a-class` (batch 10) is not drafted, so this page had to
decide what the eighth version is. It is the seventh version exactly,
plus one new class in each world:

- game: `static class Commands` with
  `public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)`;
- solar system: `static class Commands` with
  `public static bool RunChoice(Probe probe, string choice)`.

Each is dewlab's `run_choice` from `game-8.py` and `solar-system-8.py`
in C#: the same commands, amounts and messages (`Not a command: ...`),
`if`/`else if` rather than `switch`, `false` for `quit`, with an XML
comment in the style of the seventh version. `Commands` was chosen over
a name of the world (`Cave`) so that both worlds use the same name, and
so that the class does not look like a second `Room`. When
`a-front-end-for-a-class` is written, it must make this same eighth
version, or this page must change to match it. Two things that page
must settle:

- **A window cannot show what `RunChoice` prints.** `RunChoice`, and the
  refusals inside the classes, write with `Console.WriteLine`. The
  course map has a Windows Forms front end call "the same `RunChoice`",
  but in a Windows Forms app the console output goes nowhere. That page
  needs `RunChoice` to return its text, or the form to redirect
  `Console.Out`. This page mentions a window in one sentence only, as a
  fourth project, so that it does not depend on the answer.
- **`static` or an object.** A `Game` object holding the hero, the
  healer and the monster, with `RunChoice(string choice)`, would be more
  object-oriented, and the front end would pass one object. It would
  also change the signature that dewlab and this page use.

## What to revisit once the page UI or the browser checker exists

- Run the browser checker, and copy the outputs into
  `lessons/your-world-playable/your-world-playable.outputs.json`. The
  native check shows no typed input, so the recorded game shows
  `What now? Ada (health 10) | ...` on one line, and the page will show
  the typed command after each prompt. The prose quotes no output of the
  games, so nothing in it should change.
- The shared `Test` cell sits above the three world variants. Check how
  it looks between the section's first paragraph and the world picker's
  first variant.
- The class cells are long (`Character` is 76 lines, with its comments).
  They are the reader's own classes, and the whole point of the page,
  so they are shown in full. If the page gains a way to fold a long
  types cell, these are the first to use it.
- "Download project" on `your-world-front-end--game`: check that the ZIP
  has `Program.cs`, `Test.cs`, `Character.cs`, `Healer.cs`, `Room.cs`,
  `Commands.cs` and `IrishCulture.cs`, as the section says. The section
  does not name the project, because the name comes from
  `projectName(title)` in `web/page/project.js`, and the page never sees
  it.
- The two worked-step solutions have no `inputs`. Check that "Compare
  with a solution" shows the two outputs side by side, as it does for
  the documenting draft's solutions.
- The Visual Studio steps were run with the command line, not in Visual
  Studio. The menu names (**Add** > **New Project**, **Add Project
  Reference**, **Set as Startup Project**, **Test Explorer**, **Publish**)
  are those of Microsoft's tutorials and the testing draft, and should be
  checked once in Visual Studio on a college PC. The page names no
  version of Visual Studio: projects for .NET 10, which the downloaded
  project targets, need a Visual Studio that supports .NET 10 (course
  map, open question 11).
- When `a-front-end-for-a-class` and `namespaces-and-libraries` are
  written: check the eighth version against the first, and the
  namespace and CS0246 steps against the second.

## Open questions for a reviewer

1. **Links or italics.** The first mention of each of the twelve earlier
   pages is a `lesson:` link, as this run's task asked. `DECISIONS.md`
   32 and 39 say to link only to pages in `lessons/`, and the build
   refuses any other. Only `objects-and-classes` is there now. This page
   is batch 11, so every page it links to should be in `lessons/` first;
   if it moves before them, the links become italics.
2. **The worked first step** (`a-test-first--game`,
   `a-test-first--solar-system`) is an addition. dewlab's "Making it
   yours" was a list of ideas and a blank cell. Keep it, or cut it back
   to dewlab's shape? Without it, the page has no predict.
3. **One predict for each reader.** The style guide asks for two or
   three where a guess is interesting. The other candidates were weak:
   how many of the five tests pass (all, as on the page before), or what
   the game prints after two attacks (a sum, not a C# surprise). The
   capital letters are a question in the prose instead, answered by
   playing.
4. **The page opens with a list, not a run**, in dewlab's order. The
   style guide's first check is "Does it open by running something?"
   Moving "Your world, running" first, and "What you have" after it as
   a look at what just ran, would satisfy it, at the cost of dewlab's
   order.
5. **`Commands.RunChoice`**, static, with dewlab's parameters: see "The
   eighth version". It is the one decision here that a page before this
   one must share.
6. **Naming the assessment.** "The third skills demonstration of this
   course asks for this shape" is on the page, for learners. The course
   map says it in the teacher notes. Keep it on the page?
7. **The Visual Studio section is long**: five short parts. It could be
   its own session in class, as the course map says of
   `the-tools-around-your-code`.
8. **Names in the solution.** `MyWorld`, `GameWorld`, `GameWorld.Play`,
   `GameWorld.Tests` (and `SolarSystem...`). `namespaces-and-libraries`
   may choose other names for the library first; this page should then
   use them.

## Where each number and message in the prose comes from

- "`Refused: healing cannot be negative.` ... `Tests run: 5. Passed:
  5.`": `your-world-running-program--game`.
- "`Refused: Voyager cannot burn -50 kg now.` ... `Tests run: 5.
  Passed: 5.`": `your-world-running-program--solar-system`.
- "40 kg of fuel": the code of `your-world-front-end--solar-system`,
  and its first line of output.
- The three lines in the game's worked step, and "hit Grog for 3" (8
  expected, 5 found): `a-test-first--game`.
- The two lines in the solar system's worked step, and "removed 50 kg"
  (70 expected, 20 found): `a-test-first--solar-system`.
- "`Refused: Ada is down.`, and then `Tests run: 1. Passed: 1.`" and
  "`Refused: Voyager cannot refuel -50 kg.`, and then `Tests run: 1.
  Passed: 1.`": the two solutions, as NativeCheck ran them.
- "`refuel` always adds 20 kg": the code of `Commands` (solar system),
  and the recorded game, where one refuel takes Philae from 20 kg to
  40 kg.
- CS0246, CS0103, the text of the first message, `GameWorld.dll`, and
  `Assert.IsTrue`: the command-line build in "How it was checked".
- CS8600 and CS8618 are named as examples of nullable warnings; none of
  them happened, and the page says the classes give none.

## Probes

Each probe runs with the page's classes, copied exactly. The game's
types come first, then its probes, then the solar system's types (whose
`Commands` replaces the game's for the cells below it, rule 4), then its
probes.

### Types for the game probes

```csharp exec
id: probe-test
file: Test.cs
static class Test
{
    public static void Check<T>(string claim, T expected, T found)
    {
        if (!expected.Equals(found))
        {
            throw new Exception($"{claim}: expected {expected}, found {found}");
        }
    }

    public static void RunAll(List<Action> tests)
    {
        int passed = 0;
        foreach (Action test in tests)
        {
            try
            {
                test();
                passed = passed + 1;
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
            }
        }
        Console.WriteLine($"Tests run: {tests.Count}. Passed: {passed}.");
    }
}
```

```csharp exec
id: probe-character
file: Character.cs
/// <summary>
/// One character in the game: a name, and health from 0 up to MaxHealth.
/// A character with 0 health is down.
/// </summary>
class Character
{
    /// <summary>The most health a character can have.</summary>
    public virtual int MaxHealth => 10;

    public string Name;

    /// <summary>The character's health, a whole number from 0 up to MaxHealth.</summary>
    public int Health { get; protected set; }

    /// <summary>Makes a character with a name and some health.</summary>
    /// <param name="name">The character's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    /// <summary>Says whether the character's health is 0.</summary>
    /// <returns>true if the character is down.</returns>
    /// <example>
    /// <code>
    /// new Character("Ada", 0).IsDown()    // true
    /// new Character("Ada", 1).IsDown()    // false
    /// </code>
    /// </example>
    public bool IsDown()
    {
        return Health == 0;
    }

    /// <summary>
    /// Lowers the character's health by amount, stopping at 0.
    /// Refuses a negative amount, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    /// <summary>
    /// Adds amount to the character's health, stopping at MaxHealth.
    /// Refuses a negative amount, or a character who is down, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void Heal(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: healing cannot be negative.");
            return;
        }
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

```csharp exec
id: probe-healer
file: Healer.cs
/// <summary>A character who can also heal someone else.</summary>
class Healer : Character
{
    /// <summary>Makes a healer with a name and some health.</summary>
    /// <param name="name">The healer's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Healer(string name, int health) : base(name, health)
    {
    }

    /// <summary>
    /// Asks other to heal by amount, by other's own rules.
    /// Refuses if the healer is down, and prints why.
    /// </summary>
    /// <param name="other">Any character, a healer too.</param>
    /// <param name="amount">A whole number, 0 or more.</param>
    public void HealOther(Character other, int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        other.Heal(amount);
    }
}
```

```csharp exec
id: probe-room
file: Room.cs
/// <summary>A room in the game, and the characters inside it. Nobody is inside twice.</summary>
class Room
{
    public string Name;
    private List<Character> _characters = new List<Character>();

    /// <summary>Makes an empty room.</summary>
    /// <param name="name">The room's name.</param>
    public Room(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return $"{Name}: {Standing().Count} standing";
    }

    /// <summary>
    /// Puts a character in the room.
    /// Refuses a character who is already inside, and prints why.
    /// </summary>
    /// <param name="character">Any character, a healer too.</param>
    public void Enter(Character character)
    {
        if (_characters.Contains(character))
        {
            Console.WriteLine($"Refused: {character.Name} is already in {Name}.");
            return;
        }
        _characters.Add(character);
    }

    /// <summary>Lists the names of the characters in the room who are not down.</summary>
    /// <returns>The names, in the order the characters entered. The list can be empty.</returns>
    /// <example>
    /// <code>
    /// var cave = new Room("Cave");
    /// cave.Enter(new Character("Ada", 10));
    /// cave.Enter(new Character("Grace", 0));
    /// string.Join(", ", cave.Standing())    // "Ada"
    /// </code>
    /// </example>
    public List<string> Standing()
    {
        var names = new List<string>();
        foreach (Character character in _characters)
        {
            if (!character.IsDown())
            {
                names.Add(character.Name);
            }
        }
        return names;
    }
}
```

```csharp exec
id: probe-commands-game
file: Commands.cs
/// <summary>The commands a player can give in the cave, and what each one does.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command in the cave: look, attack, heal or quit.
    /// Any other text prints that it is not a command, and the game continues.
    /// </summary>
    /// <param name="hero">The character the player plays.</param>
    /// <param name="healer">The healer on the hero's side.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as the player typed it.</param>
    /// <returns>false when the game should stop; true when it continues.</returns>
    public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine($"{hero} | {healer} | {monster}");
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // only a monster still standing can hit the hero
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "heal")
        {
            healer.HealOther(hero, 2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P1. The game, when a player types `Attack` with a capital letter

```csharp exec
id: probe-capital-attack
stdin: "Attack\nattack\nquit\n"
var ada = new Character("Ada", 10);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
Console.WriteLine("A new game: Ada and Mira against Grog.");
Console.WriteLine("Commands: look, attack, heal, quit");

bool stillPlaying;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    stillPlaying = Commands.RunChoice(ada, mira, grog, choice);
}
while (stillPlaying);
Console.WriteLine("Goodbye.");
```

### P2. The game's new rule leaves the five tests as they were

The five tests of `your-world-running-program--game`, with the
solution's `Commands` written again below them.

```csharp exec
id: probe-rule-and-tests-game
Test.RunAll(new List<Action>
{
    AHitTakesHealth,
    AHitToExactlyZeroLeavesAdaDown,
    AHealOfANegativeAmountChangesNothing,
    AHealStopsAtMaxHealth,
    NobodyDownIsStanding
});

void AHitTakesHealth()
{
    var ada = new Character("Ada", 10);
    ada.TakeDamage(3);
    Test.Check("a hit of 3 takes 3 health", 7, ada.Health);
}

void AHitToExactlyZeroLeavesAdaDown()
{
    var ada = new Character("Ada", 10);
    ada.TakeDamage(10);
    Test.Check("a hit of 10 leaves Ada down", true, ada.IsDown());
}

void AHealOfANegativeAmountChangesNothing()
{
    var ada = new Character("Ada", 5);
    ada.Heal(-50);
    Test.Check("a heal of -50 changes nothing", 5, ada.Health);
}

void AHealStopsAtMaxHealth()
{
    var ada = new Character("Ada", 9);
    ada.Heal(5);
    Test.Check("a heal stops at MaxHealth", 10, ada.Health);
}

void NobodyDownIsStanding()
{
    var cave = new Room("Cave");
    var ada = new Character("Ada", 10);
    cave.Enter(ada);
    cave.Enter(new Healer("Mira", 10));
    ada.TakeDamage(12);
    Test.Check("only Mira is standing", "Mira", string.Join(", ", cave.Standing()));
}

/// <summary>The commands a player can give in the cave, and what each one does.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command in the cave: look, attack, heal or quit.
    /// A hero who is down cannot attack: the attack is refused, and nobody is hurt.
    /// Any other text prints that it is not a command, and the game continues.
    /// </summary>
    /// <param name="hero">The character the player plays.</param>
    /// <param name="healer">The healer on the hero's side.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as the player typed it.</param>
    /// <returns>false when the game should stop; true when it continues.</returns>
    public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine($"{hero} | {healer} | {monster}");
        }
        else if (choice == "attack" && hero.IsDown())
        {
            Console.WriteLine($"Refused: {hero.Name} is down.");
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // only a monster still standing can hit the hero
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "heal")
        {
            healer.HealOther(hero, 2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### Types for the solar-system probes

```csharp exec
id: probe-probe
file: Probe.cs
/// <summary>
/// One space probe: a name, and fuel in kilograms, from 0 up to TankSize.
/// </summary>
class Probe
{
    /// <summary>The most fuel the probe can hold, in kilograms.</summary>
    public virtual int TankSize => 100;

    public string Name;

    /// <summary>The probe's fuel now, in kilograms.</summary>
    public int Fuel { get; private set; }

    /// <summary>Makes a probe with a name and some fuel.</summary>
    /// <param name="name">The probe's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// new Probe("Voyager", 70).CanBurn(-5)    // false
    /// </code>
    /// </example>
    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;    // a burn below 0 would add fuel
        }
        return kg <= Fuel;
    }

    /// <summary>
    /// Burns kg kilograms of fuel. If CanBurn(kg) is false, it changes
    /// nothing, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    /// <summary>Adds kg kilograms of fuel, stopping at TankSize.</summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: probe-lander
file: Lander.cs
/// <summary>
/// A probe that can land. Once it has landed, it burns no more fuel.
/// </summary>
class Lander : Probe
{
    private bool _landed = false;

    /// <summary>Makes a lander that has not landed yet.</summary>
    /// <param name="name">The lander's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    /// <summary>Lands the lander. After this, it burns no more fuel.</summary>
    public void Land()
    {
        _landed = true;
    }

    /// <summary>
    /// Says false once the lander has landed. Before that, it answers
    /// as any probe does.
    /// </summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>false after Land(); before that, what Probe.CanBurn gives.</returns>
    /// <example>
    /// <code>
    /// var philae = new Lander("Philae", 40);
    /// philae.Land();
    /// philae.CanBurn(10)    // false
    /// </code>
    /// </example>
    public override bool CanBurn(int kg)
    {
        if (_landed)
        {
            return false;
        }
        return base.CanBurn(kg);
    }
}
```

```csharp exec
id: probe-mission
file: Mission.cs
/// <summary>A mission, and the probes it has launched.</summary>
class Mission
{
    public string Name;
    private List<Probe> _probes = new List<Probe>();

    /// <summary>Makes a mission with no probes yet.</summary>
    /// <param name="name">The mission's name.</param>
    public Mission(string name)
    {
        Name = name;
    }

    /// <summary>Adds a probe to the mission.</summary>
    /// <param name="probe">Any probe, a lander too.</param>
    public void Launch(Probe probe)
    {
        _probes.Add(probe);
    }

    /// <summary>Adds together the fuel of every probe in the mission.</summary>
    /// <returns>The total, in kilograms. 0 for a mission with no probes.</returns>
    public int TotalFuel()
    {
        int total = 0;
        foreach (Probe probe in _probes)
        {
            total = total + probe.Fuel;
        }
        return total;
    }

    /// <summary>Lists the names of the probes that can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>The names, in the order the probes were launched. The list can be empty.</returns>
    public List<string> ReadyFor(int kg)
    {
        var names = new List<string>();
        foreach (Probe probe in _probes)
        {
            if (probe.CanBurn(kg))
            {
                names.Add(probe.Name);
            }
        }
        return names;
    }
}
```

```csharp exec
id: probe-commands-solar
file: Commands.cs
/// <summary>The commands a player can give to a probe, and what each one does.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command for the probe: burn uses 10 kg, refuel adds 20 kg,
    /// status shows the fuel, and quit ends the mission.
    /// Any other text prints that it is not a command, and the mission continues.
    /// </summary>
    /// <param name="probe">Any probe, a lander too.</param>
    /// <param name="choice">The command, as the player typed it.</param>
    /// <returns>false when the mission is over; true when it continues.</returns>
    public static bool RunChoice(Probe probe, string choice)
    {
        if (choice == "burn")
        {
            probe.Burn(10);
            Console.WriteLine(probe);
        }
        else if (choice == "refuel")
        {
            probe.Refuel(20);
            Console.WriteLine(probe);
        }
        else if (choice == "status")
        {
            // CanBurn tells the player whether the next burn will work.
            Console.WriteLine($"{probe} | can burn 10 kg: {probe.CanBurn(10)}");
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P3. The mission, when a player types `Burn` with a capital letter

```csharp exec
id: probe-capital-burn
stdin: "Burn\nburn\nquit\n"
var philae = new Lander("Philae", 40);
Console.WriteLine("A new mission: Philae, with 40 kg of fuel.");
Console.WriteLine("Commands: burn, refuel, status, quit");

bool stillFlying;
do
{
    Console.Write("Command: ");
    string choice = Console.ReadLine();
    stillFlying = Commands.RunChoice(philae, choice);
}
while (stillFlying);
Console.WriteLine("Mission over.");
```

### P4. The solar system's new rule leaves the five tests as they were

The five tests of `your-world-running-program--solar-system`, with the
solution's `Probe` written again below them.

```csharp exec
id: probe-rule-and-tests-solar
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    AProbeCanBurnAllThatItHas,
    ANegativeBurnChangesNothing,
    ALandedLanderCannotBurn,
    OnlyReadyProbesAreListed
});

void ABurnUsesFuel()
{
    var voyager = new Probe("Voyager", 100);
    voyager.Burn(30);
    Test.Check("a burn of 30 kg leaves 70 kg", 70, voyager.Fuel);
}

void AProbeCanBurnAllThatItHas()
{
    var voyager = new Probe("Voyager", 70);
    Test.Check("a probe with 70 kg can burn 70 kg", true, voyager.CanBurn(70));
}

void ANegativeBurnChangesNothing()
{
    var voyager = new Probe("Voyager", 70);
    voyager.Burn(-50);
    Test.Check("a burn of -50 kg changes nothing", 70, voyager.Fuel);
}

void ALandedLanderCannotBurn()
{
    var philae = new Lander("Philae", 40);
    philae.Land();
    Test.Check("a landed lander cannot burn 5 kg", false, philae.CanBurn(5));
}

void OnlyReadyProbesAreListed()
{
    var outer = new Mission("Outer Planets");
    var philae = new Lander("Philae", 40);
    outer.Launch(new Probe("Voyager", 70));
    outer.Launch(philae);
    philae.Land();
    Test.Check("only Voyager is ready for 30 kg", "Voyager", string.Join(", ", outer.ReadyFor(30)));
}

/// <summary>
/// One space probe: a name, and fuel in kilograms, from 0 up to TankSize.
/// </summary>
class Probe
{
    /// <summary>The most fuel the probe can hold, in kilograms.</summary>
    public virtual int TankSize => 100;

    public string Name;

    /// <summary>The probe's fuel now, in kilograms.</summary>
    public int Fuel { get; private set; }

    /// <summary>Makes a probe with a name and some fuel.</summary>
    /// <param name="name">The probe's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// new Probe("Voyager", 70).CanBurn(-5)    // false
    /// </code>
    /// </example>
    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;    // a burn below 0 would add fuel
        }
        return kg <= Fuel;
    }

    /// <summary>
    /// Burns kg kilograms of fuel. If CanBurn(kg) is false, it changes
    /// nothing, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    /// <summary>
    /// Adds kg kilograms of fuel, stopping at TankSize.
    /// Refuses a negative kg, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Refuel(int kg)
    {
        if (kg < 0)
        {
            Console.WriteLine($"Refused: {Name} cannot refuel {kg} kg.");
            return;
        }
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```
