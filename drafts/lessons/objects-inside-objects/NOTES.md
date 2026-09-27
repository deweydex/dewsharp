# Notes: objects-inside-objects (C# draft)

Ported from dewlab `tutorials/objects-inside-objects/` (the tutorial, its
practice page and its glossary file, all version 2026.09.26.1). Written on
27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md`, and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 17, batch 7,
"adapt", shape tutorial, size L, worlds game, solar system and your own,
covers FOOP-LO6, FOOP-LO7 and FOOP-LO8). It follows the pattern of the
drafts of the pages before it: `one-parent-many-children`,
`when-is-a-breaks` and `from-a-description-to-classes`.

There was no partial draft: the folder did not exist when this run
started. The native check prints "No problems." for all three files.

Files:

- `objects-inside-objects.md`: the tutorial. 23 `csharp exec` cells: 12
  shared (6 types cells, 6 program cells), 4 in the game world, 4 in the
  solar system, 3 in your own. A reader sees 16 (15 in their own world).
  3 predicts, 6 hints, 3 solutions with `inputs`, 3 answer folds, 1 table,
  1 challenge.
- `objects-inside-objects-practice.md`: the practice page. 10 problems, 5
  exec cells (2 types cells, 3 program cells), 2 predicts, 1 hint, 1
  solution with `inputs`, 9 answer folds, 1 fence of code to read.
- `objects-inside-objects.native.json`,
  `objects-inside-objects-practice.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the numbers
  and messages in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files and on this file: **No problems.**
- `web/lesson/parse.js` (the parser the page and the browser checker
  share) reads both lesson files with no errors: 23 and 5 cells. Every
  predict, hint, solution and inputs block is attached to the cell
  intended, and the input `new StarSystem("Vega").Farthest()` is read as
  `throws: true`.
- The four class-chain copies (`Character`, `Healer`, `Probe`, `Lander`)
  were compared by script with their sources in the
  `one-parent-many-children` draft: `Character` with
  `another-kind-of-creature-2`, and the other three with the classes in the
  `your-class-4-program--<world>` solutions. They are the same, except that
  the two `// changed` comments in `another-kind-of-creature-2` are left
  out, as that page's own challenge leaves them out.
- The three `expect: CS1061` program cells (`a-system-holds-its-planets-2`
  and `your-class-5-program--<world>`) fail only because the method the
  reader writes is missing. Each solution runs, and gives the values the
  notes quote.
- Every cell in the tutorial compiles with no warning. That matters for
  one sentence: "The program compiled with no error and no warning"
  (`is-a-or-has-a-1`, and the types cell above it).

## What changed from the Python page, and why

**Frontmatter.** `year:` goes (dewsharp has no such key). dewlab's
per-section `covers:` becomes the course map's list,
`[FOOP-LO6, FOOP-LO7, FOOP-LO8]`. The worlds are the game, the solar system
and your own, with the sentences the `one-parent-many-children` draft uses.
The ocean goes (`DECISIONS.md` 13). The glossary's three terms
(*composition*, *is a*, *has a*) are defined in the prose where they first
appear, since dewsharp has no glossary panel yet.

**A system holds its planets.** dewlab's first cell held two classes and a
program. Under the rules of the road it becomes a types cell for each class
(`Planet.cs`, `StarSystem.cs`) and a program cell. The program cells keep
dewlab's ids (`a-system-holds-its-planets-1`, `-2`), and the types cells
get descriptive ids (`-planet`, `-star-system`), as
`from-a-description-to-classes` did for its skeleton cells. So the reader's
`Farthest()` is saved under `a-system-holds-its-planets-star-system`, not
under dewlab's `-2`.

- `list(moons)` becomes `new List<string>(moons)`, as the map asks, with a
  comment and two sentences on why (probe P1: with the copy, a moon added
  to the caller's list later leaves the planet with 1; without it, 2). The
  reader met this copy in problem 9 of `from-a-description-to-classes-practice`,
  which comes from the practice page of `objects-and-classes`.
- A new sentence says that each planet is made inside the call to `Add`
  and has no variable of its own. dewlab's Python needed no comment; the C#
  line is longer, with `new` twice, and a reader may wonder where the
  planet lives.
- The first program names rule 2, the first time a class is used from a
  cell below on this page.
- The predict keeps dewlab's number question. It prints `7`.
- The bullet list gains two C# points. `_planets` is a `List<Planet>`,
  which holds planets "and nothing else" (probe P11: `sol.Add("Mars")` is
  CS1503). And `StarSystem` "could not read" a planet's moons "even if it
  tried", because `_moons` is private (probe P12: CS0122). The prose quotes
  no code or message for either.
- The `Farthest()` task follows the pattern of the pages before: the
  reader writes the method in the types cell above, and the program cell
  fails with CS1061 until then. The prose says so. The first hint asks two
  questions; the second gives the first line (`public Planet Farthest()`,
  since C# needs a return type) and points to `Heaviest()` on
  `the-moves-you-already-know`, whose C# loop is the same shape. The
  solution writes `StarSystem` again below the statements (rule 4), with
  the sentence the other drafts use.
- The solution note is dewlab's, with one more sentence on a method whose
  type is a class, and one more paragraph: a star system with no planets
  stops with an `ArgumentOutOfRangeException` at `_planets[0]` (the third
  input, marked `// throws`, and probe P3). dewlab asked this question in
  the ocean world, which is gone; it belongs here.

**Is a, or has a?** dewlab's cell becomes a types cell with
`class StarSystem : Planet` and a two-line program.

- `super().__init__(star, 0, [])` becomes
  `: base(star, 0, new List<string>())`. That is the C# point of the
  section, and a new paragraph makes it: the compiler made us invent a
  distance and a list of moons for the parent's constructor, and a child
  that must invent values for its parent is often not a kind of it. One
  more sentence says that a `List<Planet>` would now accept a whole star
  system (probe P2).
- dewlab asked "What will this print?" in prose. It is now a predict
  (choice), because in C# the reader has learned to expect the compiler to
  refuse, and "It does not compile" is a real guess. It prints
  `the Sun 0 0`. "Python raised no error" became "compiled with no error
  and no warning", plus one sentence on why: the compiler checks names and
  types, and every one fits (the same reasoning as `when-is-a-breaks`).
- This `StarSystem` replaces the first one for every cell below it
  (rule 4), and the prose says so. No cell below uses `StarSystem`, so
  nothing else changes.
- The table and the two definitions stay. "swap it for a different one"
  became "replace it with a different one"; "Say the sentences out loud"
  became "Say each sentence aloud".
- dewlab's `question` block (fill in the blank, four pairs) has no dewsharp
  block. It becomes a list of four pairs, a question, and an answer fold.
  "A submarine and its crew" became "a rover and its crew" (the ocean is
  gone; the rover is the Red Plains mission's, from
  `from-a-description-to-classes`). The fold links the rover and the
  lander to the pages where the reader met them.

**Four cases where programmers disagree.** dewlab's heading was "Cases
that are not clear-cut". *Clear-cut* is an idiom, so the heading changed;
the cell ids keep dewlab's `cases-that-are-not-clear-cut-` prefix.

- *A dictionary or a class?* becomes *A dictionary, a record or a class?*,
  as the map asks ("C# leans to a class, or a record"). A Python
  dictionary with a name and a width has no simple C# twin, because a C#
  dictionary's values share one type. So the C# dictionary is the one a
  C# programmer would write, moon name to width, and the reason it stops
  fitting is C#'s: the day a moon needs a value of another type. The
  record is the next step, and the class the step after that, for a rule
  or a question. dewlab's last sentence ("start with a dictionary and grow
  a class") became "start with the smallest thing that works, and write a
  class the day the first rule arrives". Probe P4 checks that the
  dictionary and the record in the prose compile. No cell: dewlab had
  none, and the page is long.
- *A child class or a flag?* keeps dewlab's cell, with the flag as an enum
  (`BodyKind`), as the map asks. *Flag* is defined, because dewlab never
  defined it. The enum is in the same types cell as `Body` (`Body.cs`). A
  field named `Kind` of type `BodyKind` avoids the `Role Role` naming that
  `from-a-description-to-classes` had to explain. The prose now states
  what the cell prints (`Pluto, a planet`, then `Pluto, a dwarf planet`).
  "a new `elif`" became "a new value in `BodyKind`, and a new `else if`".
  dewlab's multiple-choice `question` becomes a list and a "one answer"
  fold, which gives dewlab's third option and its note.
- *When "is a" breaks.* The reader met this square on the closer look
  `when-is-a-breaks`, just before. The map keeps the case, so the page
  keeps it, and points back. It uses that page's classes (`Stretch`,
  `protected set`), with the fix from that page's fold, so it shows the
  one thing the closer look only described: a method written for
  rectangles, given the fixed square (`18`, then `36`). dewlab's
  `double_width` became `AreaAtDoubleWidth`, a local method in the program
  cell, because it returns the area, not a width. The two classes share
  one types cell (`Shapes.cs`), since the reader does not change them.
  This cell gets a predict, the page's third (see open question 3). A new
  paragraph gives the interface answer from `many-classes-one-promise`.
- *Two things at once* keeps dewlab's astronaut and cell. The map says the
  astronaut "now has interfaces as an answer", so a paragraph says what an
  interface offers (a class can keep several promises,
  `class Astronaut : ICommander, IScientist`) and where it stops: the
  promises are fixed when the program is compiled, and a person's roles
  change. The roles become an enum, `Role`, as on
  `from-a-description-to-classes`, but with this page's values
  (`Commander`, `Scientist`, `Pilot`). It prints `True False`. An
  invitation and a fold are new: an `AddRole` method (probe P5: `True
  True`, and the `if` keeps each role once), to show "a new mission changes
  the list, not the class" in code.

**Your turn: your class, fifth version.** Each world has two types cells
with the fourth version (one class each, with `file:`), a types cell with
the start of the new class, and a program cell that fails with CS1061 until
the reader writes the methods. dewlab had one "so far" cell per world
(`{{include: setup/oop/<world>-4.py}}` and `-4-kind.py`), and one cell for
the reader's class and program. The ids:
`your-class-5-so-far--<world>` (dewlab's, for the parent class),
`your-class-5-so-far-healer--game` and
`your-class-5-so-far-lander--solar-system` (new), `your-class-5--<world>`
(dewlab's id, now the reader's class), and `your-class-5-program--<world>`
(new, as on the page before).

- Game: `Room`, with dewlab's task and program. `in` becomes `Contains`,
  and the list of names is printed with `string.Join`. dewlab's inputs
  included `str(cave)` without asking for `__str__`; the task now names
  `ToString()` as a useful extra, so the input is not a surprise. Two
  hints: questions, then the two first lines and the field. The note keeps
  dewlab's points and adds two: a healer can enter because `Enter` takes a
  `Character`, and `Contains` finds Ada the second time because she is the
  same object; a new `Character("Ada", 10)` could enter (probe P6). That
  second point prepares the closer look that follows this page.
- Solar system: `Mission`, with dewlab's task and program. `get_fuel()`
  becomes the property `Fuel`, and the output is two lines, `110` and
  `Voyager`, where dewlab printed `110 ['Voyager']`. The note keeps
  dewlab's point (the mission never asks which kind of probe it has) and
  adds that `Fuel`'s private `set` lets the mission read the fuel and never
  change it. "The last page's polymorphism" became "polymorphism, from the
  page about inheritance", because in dewsharp the page before is on
  interfaces.
- Your own: three comment cells (the classes so far, the new class, a
  program), as on the page before. The prose says where the reader's
  classes are saved.

**Looking back and the challenge.** The question keeps dewlab's two parts;
"which would you still argue about?" became "which one are you still not
sure about?", because *argue about* is a phrasal verb. The challenge keeps
dewlab's task. Its starter is statements, then `StarSystem` (with
`TotalMoons`, so that "without changing how planets are ... counted" has
something to keep), then `Planet`, because a challenge opens as a new
notebook and sees nothing on this page. It compiles and prints
`Alpha Centauri A` (probe P8).

**Next.** dewlab's next page was `testing-what-a-class-does`. In dewsharp,
the next page is the closer look `two-names-one-object`, then the page on
testing. Both are batch 8, so batch rule 3 allows no link: the page names
them in plain text.

**Where to read more.** dewlab gave three: Think Python 18.8 (Python),
R. C. Martin on the Liskov substitution principle (C++), and Real Python on
inheritance and composition (Python). This page gives two. First,
Microsoft's *Tutorial: Introduction to Inheritance* (fetched 27 September
2026): its section "Inheritance and an "is a" relationship" says when a
child class fits and when a value fits better (the `Automobile` and
`Packard` example), and a note in the same section calls an interface a
"can do" relationship. Its later `Square` and `Rectangle` are both children
of an abstract `Shape`. It does not use the words "has a" or
"composition". Second, Think Python 18.8, "Class diagrams", which names
IS-A and HAS-A (checked on greenteapress.com the same day), with a note
that its code is Python. Martin's article went because
`when-is-a-breaks` already covers the principle, and its notes found no
stable address for the article; Real Python went because it is about Python's
syntax as much as the design.

## The practice page, problem by problem

dewlab's ten problems, in C#, with the three "from earlier" problems kept.
Its `question` blocks become lists and folds. The ocean goes.

1. **One crew member, two rovers** (dewlab: two submarines), as the map
   asks. The same classes and numbers in C#: `CrewMember` with a public
   field `Oxygen = 100`, and `Rover` with `Board` and `OxygenLeft`. It
   prints `40 40`. The predict keeps dewlab's three options and notes. The
   fold defines *reference* in one sentence, because the fold's point is
   that both lists hold a reference to one object, and it mentions the
   closer look after this page in plain text (batch 8). New ids,
   `one-crew-member-two-rovers-1` (types) and `-2` (program), because the
   task moved world.
2. **Gold in the vault.** `Treasure` becomes a one-line record, as in the
   game solution on `from-a-description-to-classes`. The reader writes
   `Gold()` in the types cell (`gold-in-the-vault-1`), and the program cell
   (`-2`) fails with CS1061 until then. dewlab's two inputs stay. dewlab
   had no hint here; one is added (a question), because the program starts
   out not compiling. The solution gives `62`, and `0` for a room with no
   treasure.
3. **Is, or has?** The fill-in-the-blank `question` becomes a list with
   blanks and dewlab's fold. "A fleet has submarines" became "A mission has
   rovers".
4. **A fleet that is a rover** (dewlab: a fleet that is a submarine). A
   fleet is defined, and the `Rover` is problem 1's. The fold keeps
   dewlab's argument in this world: a fleet's `OxygenLeft` would count
   only the people who boarded the fleet itself (probe P10: the Dune has
   100, the fleet 0), and adds the C# sign from the tutorial: a fleet's
   constructor must pass `Rover` a name with `: base(...)` (probe P13:
   CS7036 without it). "What goes wrong?" became "What problems would that
   cause?", to keep *wrong* off the page.
5. **A sample: record or class?** dewlab's specimen (ocean) becomes a
   rock sample of the Red Plains mission, and "dictionary or class" becomes
   "record or class", following the tutorial. The fold adds that a record
   can have methods too, so a rule is the stronger reason for a class.
6. **Hero or monster: child class or flag?** Kept in the game, with the
   flag as an enum (`Side`). "Copes better" became "needs less work for the
   spell" (*cope with* is a phrasal verb). The fold adds "because an object
   cannot change its class", from the tutorial.
7. **A bird that cannot fly.** The Python classes become C# (`virtual`,
   `override`), as code to read. The multiple-choice `question` becomes a
   list and a fold. The fold points to `AreaAtDoubleWidth` on the tutorial
   (dewlab: `double_width`), repeats the `FlyingBird` fix from
   `when-is-a-breaks`, and adds the interface answer. The reader has seen
   this penguin on `when-is-a-breaks`; see open question 6.
8. **From earlier: whose rule?** From `from-a-description-to-classes`.
   dewlab's text, with "passes through to get in" (two phrasal verbs)
   rewritten.
9. **From earlier: asking, not reaching.** From
   `keeping-details-inside-an-object`. dewlab's problem asked why
   `Expedition.deepest()` calls `get_depth()` rather than reading
   `_depth`. In C#, a private field cannot be read from outside at all
   (CS0122), so the question as asked has no C# form, and the ocean is
   gone. It is retold with the tutorial's `Mission`: why ask
   `probe.CanBurn(kg)` rather than compare `kg <= probe.Fuel`, which any
   caller can read? For a landed Philae the two differ (probe P7: `True`
   and `False`); in flight they agree. The fold's last paragraph makes the
   C# point: the compiler stops a caller from reaching a private field, but
   not from copying a rule.
10. **From earlier: a child with no parent's constructor** (dewlab's
    problem 8, "a child with no parent's fields"). In Python it ran, and
    stopped with an `AttributeError` at the name. In C# it does not compile
    (CS7036), so the predict's options change: "It does not compile" is the
    one that happens. It moved to the end of the page, and it is one
    program cell with the classes below the statements, for two reasons.
    First, its classes fail to compile, and types carry down, so every cell
    below it would fail too. Second, a separate types cell would show the
    compiler's answer on Check, before the reader's guess. The fold quotes
    the message and says that `: base(name)` fixes it (probe P9: `True`,
    then `Saturn`). Its id stays `from-earlier-a-child-with-no-parents-fields-1`.

The page intro says one cell is meant not to compile: problem 10's. The
CS1061 program cell of problem 2 is not counted there, because its task
says that it does not compile until the method exists, as on the
tutorial.

## What C# made different, in short

- Each class goes in a types cell above the program that uses it, so every
  dewlab cell with a class became two or three cells, and the reader's
  method goes in a cell above the program that calls it.
- A child class must call its parent's constructor. Building `StarSystem`
  on `Planet` forced us to invent a distance and moons, which is a sign of
  a design that does not fit. The same holds for a fleet built on a rover.
- The compiler checks that a `List<Planet>` holds only planets, and that
  nothing outside `Planet` reads `_moons`. It cannot check that a design
  makes sense: `StarSystem : Planet` compiles with no warning.
- A C# dictionary's values share one type, so "a dictionary or a class"
  becomes "a dictionary, a record or a class", and the flag is an enum.
- An interface answers "two things at once" for a class that is always
  both. Composition still answers it for an object whose roles change.
- `Contains` on a list of objects finds the same object, not an object
  with the same values: the reference point that the next closer look
  takes further.
- Python's `print` of a list becomes `string.Join`; `list(moons)` becomes
  `new List<string>(moons)`; `super().__init__` becomes `: base(...)`;
  `__str__` becomes `ToString()`.

## What to revisit once the page UI or the browser checker exists

- **Forward links (batch rule 3).** This batch owes a link to this page
  from earlier pages, and this run may write only in this folder.
  `one-parent-many-children-practice.md`, problem 7's fold, says "A later
  page, on objects inside other objects, builds classes that hold other
  objects in this way." That can become
  `[Composition: objects inside other objects](lesson:objects-inside-objects)`.
  `many-classes-one-promise` (batch 6, not drafted) will name this page as
  its next; whoever writes it can link here.
- **`many-classes-one-promise` is not written.** This page links to it
  twice and relies on three things the course map says it teaches: an
  interface is a list of methods a class promises to have; `IShape` with
  `Area()` lets `Square` and `Rectangle` share one list without one
  inheriting from the other; and a class can keep several promises (the
  astronaut). Check the names (`IShape`, and the `I` in front) and the
  wording when that page exists. The definition matches the one
  `when-is-a-breaks` gives.
- **`two-names-one-object` and `testing-what-a-class-does`** (batch 8) are
  named in plain text at the end of the tutorial, and the closer look in
  practice problem 1's fold. Their authors can add links back here.
- **The class chain's fifth version.** `testing-what-a-class-does` copies
  it. In the game world it is `Character` (fourth version), `Healer`, and
  `Room` as in the solution of `your-class-5-program--game`, with
  `ToString`. In the solar system it is `Probe`, `Lander`, and `Mission` as
  in the solution of `your-class-5-program--solar-system`. Until the
  format has includes (course map, open question 2), a copy must be checked
  by hand.
- **A task whose program fails until the reader edits a cell above.**
  `a-system-holds-its-planets-2` and the two world programs carry
  `expect: CS1061` for the starting state only. Once the reader writes the
  method, the program compiles, and the page should show that as an
  ordinary run, not as something unexpected.
- **Compare with a solution.** The Vega input throws for the solution
  (`ArgumentOutOfRangeException`); check that the table shows the name, and
  that a reader's version that returns `null` shows as a difference, not
  as an error. `cave.Standing()` and `outer.ReadyFor(30)` are lists: the
  table should show `["Mira"]` and `["Voyager"]`, and `[]` for
  `outer.ReadyFor(100)`.
- **Code in a fold.** The `AddRole` fold holds a `csharp` fence. Check that
  the page renders it as code.
- **World cells and shared classes.** Every world program is compiled with
  the page's shared classes above it (`Planet`, the second `StarSystem`,
  `Body`, `Rectangle`, `Square`, `Role`, `Astronaut`). None of their names
  is used by a world class, so nothing is replaced. A reader in their own
  world who writes a class called `Planet` or `Role` replaces the shared
  one for their cells (rule 4), which is harmless. A downloaded Visual
  Studio project of a world program will contain those classes too.

## Open questions for a reviewer

1. **Size.** The map says L. A reader sees 16 cells, against dewlab's 8
   (or so) for one world, because each class has its own types cell and
   each task a program cell. If the page should be split, the natural
   place is after "Is a, or has a?": the four cases and the fifth version
   would be a second page. That gives a new lesson id, so it is best
   decided before any class uses the page.
2. **The square, twice in two pages.** `when-is-a-breaks` comes two pages
   before this one (the interfaces page is between them), and its fold
   already describes
   what `AreaAtDoubleWidth` shows. The map keeps the case here; I kept it
   as a cell, from the caller's side, and pointed back. It could shrink to
   one paragraph with the link.
3. **Three predicts.** Total moons (number), `StarSystem : Planet`
   (choice: prints, does not compile, or an exception), and the square's
   area (choice). dewlab had one predict and asked the other two in prose.
   The style guide allows two or three. The square's predict is the
   weakest: the paragraph above it says that the fixed square changes both
   sides. Drop it if three is too many.
4. **The dictionary case.** "Every value in a C# dictionary has the same
   type" is true of the declared value type, but a
   `Dictionary<string, object>` exists. I judged that a Level 5 reader is
   better served without it. Is the simplification acceptable?
5. **Interfaces without a cell.** The page names `IShape`,
   `ICommander` and `IScientist` in prose only, because the interfaces page
   is not written yet and a cell would have to repeat it. Should the
   astronaut get an interface cell once that page exists, to show where
   interfaces stop (a class cannot change its promises)?
6. **The penguin, a third time.** Practice problem 7 is dewlab's, but the
   reader has already met the penguin on `when-is-a-breaks` (with a fold
   that gives the `FlyingBird` fix) and on the tutorial's square. It could
   be replaced by a new problem (for example, an interface or composition
   for a bird that can both swim and fly).
7. **Facts in the prose that no cell prints.** "Jupiter has more than 90
   known moons" (dewlab: "over 90"), Pluto's reclassification in 2006,
   Peggy Whitson as the first woman to command the International Space
   Station, and Python's `AttributeError` in practice problem 10. They come
   from dewlab's pages and general knowledge, not from a run (course map,
   open question 7).
8. **Ids that changed.** The practice page's `one-crew-member-two-rovers-1`
   and `-2` are new (dewlab: `one-crew-member-two-submarines-1`), and
   `gold-in-the-vault-2` is new. dewlab's `question` ids
   (`is-a-or-has-a-q1`, `cases-that-are-not-clear-cut-q1`, `is-or-has-1`,
   `a-bird-that-cannot-fly-1`,
   `from-earlier-a-child-with-no-parents-fields-q1`) have no dewsharp
   block, so nothing is saved under them. The tutorial's types cells have
   new ids, and the reader's `Farthest()` is saved in one of them. Rename
   before any class uses the pages, if wanted.
9. **Practice order.** The "from earlier" problem on a child's constructor
   moved from 8th to 10th, for the reasons in the problem-by-problem list.
   Is that acceptable, or should it keep its place with its classes renamed
   so that later cells are not affected?
10. **Where to read more** has two entries, one in C# and one in Python.
    The style guide asks for "one thing to read or watch". Keep both, or
    only Microsoft's?
11. **The first program opens with two types cells.** The page opens with
    prose and two classes, as dewlab's does, and the first run is the third
    cell. The style guide's checklist asks a page to open by running
    something.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `7` (total moons) | lesson cell `a-system-holds-its-planets-1` |
| a copy keeps the planet's moons apart from the caller's list | probe P1 (`1` with the copy, `2` without) |
| `_planets` holds planets "and nothing else" | probe P11 (CS1503) |
| `StarSystem` could not read `_moons` | probe P12 (CS0122) |
| `Jupiter`; `sol.Farthest().MoonCount()` is 4 | solution of `a-system-holds-its-planets-2` and its inputs |
| no planets: `ArgumentOutOfRangeException` at `_planets[0]` | the third input of that cell; probe P3 (line 21 of the probe, the `_planets[0]` line) |
| `the Sun 0 0`; no error and no warning | lesson cells `is-a-or-has-a-star-system` and `is-a-or-has-a-1` (no diagnostics) |
| a `List<Planet>` accepts a star system | probe P2 |
| the dictionary and the record in the prose compile | probe P4 |
| `Pluto, a planet`, `Pluto, a dwarf planet` | lesson cell `cases-that-are-not-clear-cut-1` |
| `18`, then `36` | lesson cell `cases-that-are-not-clear-cut-2` |
| `True False` | lesson cell `cases-that-are-not-clear-cut-3` |
| fold: `True True`; the `if` keeps each role once | probe P5 (`True True`, then 3 roles after adding the pilot twice) |
| game: a refusal, then `Mira`; `Cave: 1 standing` | solution of `your-class-5-program--game` and its inputs |
| game note: a new `Character("Ada", 10)` could enter | probe P6 (`Ada, Ada`, `Cave: 2 standing`) |
| solar system: `110`, then `Voyager` | solution of `your-class-5-program--solar-system` and its inputs (`[]` for 100 kg) |
| the challenge prints `Alpha Centauri A` | probe P8 |
| practice 1: `40 40` | practice cell `one-crew-member-two-rovers-2` |
| practice 2: `62`, and 0 for an empty room | solution of `gold-in-the-vault-2` and its inputs |
| practice 4: the fleet counts only its own crew | probe P10 (`Dune: 100, fleet: 0`) |
| practice 4: a fleet's constructor must pass a name | probe P13 (CS7036) |
| practice 9: `30 <= philae.Fuel` is `true`, `philae.CanBurn(30)` is `false`; in flight they agree | probe P7 |
| practice 10: CS7036 and its message | practice cell `from-earlier-a-child-with-no-parents-fields-1` |
| practice 10: with `: base(name)`, `True`, then `Saturn` | probe P9 (with the parent named `Body`; see its note) |

No compiler message's line or column is quoted in the prose, so none needs
checking against the page.

## Probes

Run with the NativeCheck command, passing this file. Types carry down under
the rules of the road, including classes declared in a program cell, and a
class written again replaces the earlier one for the cells below (rule 4).
So the probes run in an order that keeps each one's classes as its claim
needs them: the passing probes first, then the three that are meant not to
compile (P11 to P13), because a class that fails to compile would make
every cell below it fail too. P13 writes `StarSystem` again, in a form that
compiles, only so that P12's broken `StarSystem` does not add CS0122 to its
messages.

P9 names the parent class `Body`, not `Planet` as practice problem 10 does.
A one-argument `Planet` here would replace the three-argument `Planet` that
P11 and P12 need. The fix it checks, `: base(name)`, is the same.

### P1. Tutorial: the constructor keeps a copy of the moons

```csharp exec
id: p1-a-copy-of-the-moons
var moons = new List<string> { "the Moon" };
var copied = new Planet("Earth", 149.6, moons);
var shared = new SharedPlanet("Earth", 149.6, moons);
moons.Add("Theia");
Console.WriteLine($"with the copy: {copied.MoonCount()}");
Console.WriteLine($"without the copy: {shared.MoonCount()}");

class Planet
{
    public string Name;
    public double Distance;    // millions of km from its star
    private List<string> _moons;

    public Planet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        _moons = new List<string>(moons);    // a copy, not the caller's list
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}

class SharedPlanet
{
    public string Name;
    public double Distance;
    private List<string> _moons;

    public SharedPlanet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        _moons = moons;
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

### P2. Tutorial, "Is a, or has a?": a `List<Planet>` accepts a star system

```csharp exec
id: p2-a-list-of-planets-accepts-a-star-system
var planets = new List<Planet>
{
    new Planet("Earth", 149.6, new List<string> { "the Moon" }),
    new StarSystem("the Sun")
};
Console.WriteLine(planets.Count);
Console.WriteLine(planets[1].GetType().Name);
Console.WriteLine(planets[1].Name);

class StarSystem : Planet    // a star system is not a planet
{
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star) : base(star, 0, new List<string>())
    {
    }
}
```

### P3. Tutorial, `Farthest()` solution note: a star system with no planets

```csharp exec
id: p3-farthest-with-no-planets
expect: exception
var vega = new StarSystem("Vega");
Console.WriteLine(vega.Farthest().Name);

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
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

### P4. Tutorial, the dictionary and the record in the prose compile

```csharp exec
id: p4-a-dictionary-and-a-record
var widths = new Dictionary<string, int> { ["Io"] = 3643, ["Europa"] = 3122 };
Console.WriteLine(widths["Europa"]);
var io = new Moon("Io", 3643, "Galileo Galilei");
Console.WriteLine(io);

record Moon(string Name, int Width, string FoundBy);
```

### P5. Tutorial, the `AddRole` fold (prose: `True True`)

```csharp exec
id: p5-add-role
var peggy = new Astronaut("Peggy Whitson", new List<Role> { Role.Commander, Role.Scientist });
peggy.AddRole(Role.Pilot);
peggy.AddRole(Role.Pilot);
Console.WriteLine($"{peggy.Can(Role.Scientist)} {peggy.Can(Role.Pilot)}");
Console.WriteLine(peggy.RoleCount());

enum Role
{
    Commander,
    Scientist,
    Pilot
}

class Astronaut
{
    public string Name;
    private List<Role> _roles;

    public Astronaut(string name, List<Role> roles)
    {
        Name = name;
        _roles = new List<Role>(roles);
    }

    public bool Can(Role role)
    {
        return _roles.Contains(role);
    }

    public void AddRole(Role role)
    {
        if (!_roles.Contains(role))
        {
            _roles.Add(role);
        }
    }

    public int RoleCount()    // for this probe only: the if keeps each role once
    {
        return _roles.Count;
    }
}
```

### P6. Game, fifth version: `Contains` finds the same object only

```csharp exec
id: p6-contains-finds-the-same-object
var cave = new Room("Cave");
var ada = new Character("Ada", 10);
cave.Enter(ada);
cave.Enter(ada);
cave.Enter(new Character("Ada", 10));
Console.WriteLine(string.Join(", ", cave.Standing()));
Console.WriteLine(cave);

class Character
{
    public virtual int MaxHealth => 10;

    public string Name;
    public int Health { get; protected set; }

    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    public bool IsDown()
    {
        return Health == 0;
    }

    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    public virtual void Heal(int amount)
    {
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}

class Room
{
    public string Name;
    private List<Character> _characters = new List<Character>();

    public Room(string name)
    {
        Name = name;
    }

    public override string ToString()
    {
        return $"{Name}: {Standing().Count} standing";
    }

    public void Enter(Character character)
    {
        if (_characters.Contains(character))
        {
            Console.WriteLine($"Refused: {character.Name} is already in {Name}.");
            return;
        }
        _characters.Add(character);
    }

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

### P7. Practice 9: comparing the fuel, or asking `CanBurn`

```csharp exec
id: p7-asking-not-reaching
var philae = new Lander("Philae", 40);
var voyager = new Probe("Voyager", 70);
Console.WriteLine($"in flight: {30 <= philae.Fuel} {philae.CanBurn(30)}");
philae.Land();
Console.WriteLine($"landed: {30 <= philae.Fuel} {philae.CanBurn(30)}");
Console.WriteLine($"Voyager: {30 <= voyager.Fuel} {voyager.CanBurn(30)}");

class Probe
{
    public virtual int TankSize => 100;

    public string Name;
    public int Fuel { get; private set; }

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    public virtual bool CanBurn(int kg)
    {
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

    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}

class Lander : Probe
{
    // A lander is a probe that can land, and once it has landed, it burns no more.

    private bool _landed = false;

    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    public void Land()
    {
        _landed = true;
    }

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

### P8. The challenge, as given

```csharp exec
id: p8-the-challenge-as-given
var alpha = new StarSystem("Alpha Centauri A");
Console.WriteLine(alpha.Star);

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    public int TotalMoons()
    {
        int total = 0;
        foreach (Planet planet in _planets)
        {
            total = total + planet.MoonCount();
        }
        return total;
    }
}

class Planet
{
    public string Name;
    public double Distance;    // millions of km from its star
    private List<string> _moons;

    public Planet(string name, double distance, List<string> moons)
    {
        Name = name;
        Distance = distance;
        _moons = new List<string>(moons);
    }

    public int MoonCount()
    {
        return _moons.Count;
    }
}
```

### P9. Practice 10, fixed with `: base(name)` (prose: `True`, then `Saturn`)

```csharp exec
id: p9-a-gas-giant-with-base
var saturn = new GasGiant("Saturn", true);
Console.WriteLine(saturn.Rings);
Console.WriteLine(saturn.Name);

class Body
{
    public string Name;

    public Body(string name)
    {
        Name = name;
    }
}

class GasGiant : Body
{
    public bool Rings;

    public GasGiant(string name, bool rings) : base(name)
    {
        Rings = rings;
    }
}
```

### P10. Practice 4: a fleet built on a rover counts only its own crew

```csharp exec
id: p10-a-fleet-that-is-a-rover
var ada = new CrewMember("Ada");
var dune = new Rover("Dune");
var fleet = new Fleet("Red Plains");
fleet.AddRover(dune);
dune.Board(ada);
Console.WriteLine($"Dune: {dune.OxygenLeft()}, fleet: {fleet.OxygenLeft()}");

class CrewMember
{
    public string Name;
    public int Oxygen = 100;

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Rover
{
    public string Name;
    private List<CrewMember> _crew = new List<CrewMember>();

    public Rover(string name)
    {
        Name = name;
    }

    public void Board(CrewMember member)
    {
        _crew.Add(member);
    }

    public int OxygenLeft()
    {
        int total = 0;
        foreach (CrewMember member in _crew)
        {
            total = total + member.Oxygen;
        }
        return total;
    }
}

class Fleet : Rover
{
    private List<Rover> _rovers = new List<Rover>();

    public Fleet(string name) : base(name)
    {
    }

    public void AddRover(Rover rover)
    {
        _rovers.Add(rover);
    }
}
```

### P11. Tutorial: a `List<Planet>` holds planets and nothing else (CS1503)

```csharp exec
id: p11-a-list-of-planets-refuses-text
expect: CS1503
var sol = new StarSystem("the Sun");
sol.Add("Mars");
```

### P12. Tutorial: `StarSystem` cannot read `_moons` (CS0122)

```csharp exec
id: p12-star-system-reads-the-moons
expect: CS0122
var sol = new StarSystem("the Sun");
Console.WriteLine(sol.TotalMoons());

class StarSystem
{
    public string Star;
    private List<Planet> _planets = new List<Planet>();

    public StarSystem(string star)
    {
        Star = star;
    }

    public void Add(Planet planet)
    {
        _planets.Add(planet);
    }

    public int TotalMoons()
    {
        int total = 0;
        foreach (Planet planet in _planets)
        {
            total = total + planet._moons.Count;
        }
        return total;
    }
}
```

### P13. Practice 4: a fleet with no `: base(...)` (CS7036). Last, because its class does not compile

```csharp exec
id: p13-a-fleet-with-no-base
expect: CS7036
var fleet = new Fleet("Red Plains");
Console.WriteLine(fleet.Name);

class Fleet : Rover
{
    private List<Rover> _rovers = new List<Rover>();

    public Fleet(string name)
    {
    }
}

// StarSystem again, as in P8, only so that P12's broken StarSystem does not
// add its CS0122 to this probe (rule 4).
class StarSystem
{
    public string Star;

    public StarSystem(string star)
    {
        Star = star;
    }
}
```
