# Notes: objects-inside-objects

Ported from dewlab `tutorials/objects-inside-objects/` (the tutorial, its
practice page and its glossary file, all version 2026.09.26.1). Written on
27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md`, and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 17, batch 7,
"adapt", shape tutorial, size L, worlds game, solar system and your own,
covers FOOP-LO6, FOOP-LO7 and FOOP-LO8). It follows the pattern of the
drafts of the pages before it: `one-parent-many-children`,
`when-is-a-breaks` and `from-a-description-to-classes`.

**Moved into `lessons/` on 28 September 2026.** The draft's
`*.native.json` files were deleted. Every cell, solution, input and the
challenge was run in the browser engine (`npm run check-lessons -- --write
objects-inside-objects`, which checks the practice page too), and the
probes at the end of this file were run the same way, in a scratch lesson.
"Review: what changed in the move" lists what changed. "Open questions for
a reviewer" keeps the porter's questions, each with what the move decided,
and "Open" lists what is left for Josh. The sections between them are the
porter's, kept as the record of the translation; where the move made a
point stale, it says so in italics.

Files:

- `lessons/objects-inside-objects/objects-inside-objects.md`: the
  tutorial. 23 `csharp exec` cells: 12 shared (6 types cells, 6 program
  cells), 4 in the game world, 4 in the solar system, 3 in your own. A
  reader sees 16 (15 in their own world). 2 predicts, 7 hints, 4 solutions
  with `inputs`, 2 answer folds, 1 table, 1 challenge. Version
  2026.09.28.1.
- `lessons/objects-inside-objects/objects-inside-objects-practice.md`: the
  practice page. 10 problems, 7 exec cells (3 types cells, 4 program
  cells), 2 predicts, 1 hint, 2 solutions (1 with `inputs`), 9 answer
  folds, 1 fence of code to read. No worlds, as in dewlab and in the
  exemplar `objects-and-classes-practice`. Version 2026.09.28.1.
- `lessons/objects-inside-objects/*.outputs.json`: what the browser
  checker recorded.
- This file (it was the draft's `NOTES.md`). The probe cells at the end
  check the claims in the prose and folds that no lesson cell prints.
  None of those claims is a number or a quoted output any more (see
  "Review").

## Review: what changed in the move

- **Every cell ran in the browser engine**, and each recorded output,
  compiler message (code, line and column) and input value is the same as
  the native check's: `7`; CS1061 at (5,23), then `Jupiter`, `4` and
  `ArgumentOutOfRangeException` for the solution; `the Sun 0 0`; the two
  Pluto lines; `18` and `36`; `True False`; the game's four CS1061, then
  `Refused: Ada is already in Cave.` and `Mira`; the solar system's four
  CS1061, then `110` and `Voyager`; practice `40 40`, CS1061 then `62` and
  `0`, and CS7036 at (19,12). No cell on either page has a warning, so no
  warning travels down. No culture, `Console`, formatting or stack-trace
  difference showed up. The challenge compiles alone (decision 40), with
  no warning.
- **Cell ids follow decision 26**, in the shapes the pages in `lessons/`
  use: one types cell keeps the dewlab id and its program is
  `<id>-program`; several types cells from one dewlab cell are
  `<id>-<class>`, with `<id>-program` (as `when-is-a-breaks` and
  `from-a-description-to-classes`). Renamed:
  `a-system-holds-its-planets-planet`, `-star-system` and `-1` are now
  `a-system-holds-its-planets-1-planet`, `-1-star-system` and
  `-1-program`; `is-a-or-has-a-star-system` and `is-a-or-has-a-1` are now
  `is-a-or-has-a-1` and `is-a-or-has-a-1-program`; the same for
  `cases-that-are-not-clear-cut-body`/`-1`, `-shapes`/`-2` and
  `-astronaut`/`-3`, now `cases-that-are-not-clear-cut-<n>` and
  `-<n>-program`. On the practice page, `one-crew-member-two-rovers-2` and
  `gold-in-the-vault-2` are now `-1-program`. `a-system-holds-its-planets-2`
  keeps its id: it was a program alone in dewlab. The world ids are the
  draft's, in the shape `one-parent-many-children` uses
  (`your-class-4-lander--solar-system`). No class has used the page, so no
  saved work is lost.
- **The `AddRole` fold became a solution** on
  `cases-that-are-not-clear-cut-3-program`, with one input,
  `peggy.Can(Role.Pilot)`, and a hint that asks a question (checklist:
  "solutions and inputs on the cell that runs"; decision 29). The draft's
  fold quoted `True True` from a native probe; the checker now records it
  from the solution (`false` from the starter, `true` from the solution,
  for the input). The prose says where each part goes: the method in the
  `Astronaut` cell, the call in the program. The hint uses the default
  `after:`, because that program compiles from the start, as the
  exemplar's `your-class-1` does.
- **Practice problem 9 has two cells now**, `from-earlier-asking-not-reaching-1`
  (`Probe` and `Lander`, cut to the members the problem needs) and
  `-1-program`, which prints `In flight: True True` and
  `Landed: True False`. The draft's fold quoted `true` and `false` from
  native probe P7. The fold now quotes the recorded lines. The question
  "For a probe in flight, both give the same answer" moved into the fold,
  since the cell now shows it.
- **Practice problem 10 has a solution**, the classes with `: base(name)`,
  and the checker records `True`, then `Saturn` (was probe P9). The "why"
  fold points to it. Its Python sentence no longer quotes Python's
  output: "the program stops with an error only at the line that asks for
  the name". The prose before the cell says that nothing is broken,
  whatever it does, without giving the guess away (as
  `from-a-description-to-classes` did for a predict on a failing cell).
- **The square's predict is gone**, and the page has two predicts. Its
  options, `18` and `36`, are both lines of the output, so decision 37
  counts either guess as the same, and the page could never ask "Which
  line explains what you saw?" (the reason `when-is-a-breaks` gave for
  not adding one). The question stays in the prose: "What do you think
  the second line prints? Run it and see."
- **The first predict's options** are now `the Sun 0 0`,
  `Nothing: it does not compile` and `Nothing: it stops with an
  exception`, in the exemplar's form. "It prints the Sun 0 0" did not
  equal the output line, so a reader who chose it would have been asked
  "Which line explains what you saw?".
- **Every task that starts out not compiling quotes its message**
  (decision 27, as the exemplar does): `'StarSystem' does not contain a
  definition for 'Farthest'`, `'Room' does not contain a definition for
  'Enter'`, `'Mission' does not contain a definition for 'Launch'`, and
  practice `'Room' does not contain a definition for 'Gold'`. Each is the
  start of the first recorded message. "and that is expected" became "it
  is meant not to compile", the exemplar's words.
- **Solution notes open with what the program printed**: "It prints
  `Jupiter`", "It prints `Refused: Ada is already in Cave.`, then `Mira`"
  (the draft said "A refusal"), "It prints `110`, then `Voyager`", "It
  prints `40 40`", "It prints `62`". The `Farthest` note no longer says
  where the exception happened (`at _planets[0]`): inputs record the
  exception's name, not its line. It now says why: `_planets[0]` asks for
  the first planet, and the list has none.
- **Links.** `many-classes-one-promise` and `two-names-one-object` are not
  in `lessons/` or in this move's list, so they are *Interfaces* and *Two
  names, one object*, in italics (decision 32). `testing-what-a-class-does`
  is in `lessons/`, so the closing paragraph links to it:
  `[Testing a class](lesson:testing-what-a-class-does)`. The hint's link text is now the page's short title,
  *Inside a method*, and it names `WidestMoon()` beside `Heaviest()`,
  because a reader in the solar system wrote `WidestMoon` there, not
  `Heaviest`. "The page about inheritance" (twice) and "the closer look on
  'is a'" are links now.
- **The outcome words** of the style guide: "It ran, with no error and no
  warning" (was "The program compiled with no error and no warning").
- **Plain words.** "calls for" (twice) became "fits"; "take one new class"
  and "takes a new value" became "need" and "needs"; practice "turn a
  monster into a hero" became "make a monster a hero", "What would change
  your mind?" became "What would make you choose the other?", and "The
  flag works better here" became "The flag needs less work for the spell",
  which answers the question as asked. The practice intro's "more than one
  good answer" became "more than one answer that works", and its "One cell
  on this page is meant not to compile" (there are two such cells now,
  three counting problem 2's starter) became the exemplar's "Some cells are
  meant not to compile, and the problem says so", with the exemplar's
  sentence on the rules of the road.
- **Terms.** *Interface* is defined where this page first uses it, in the
  course map's words: "a list of methods that a class promises to have,
  with no code of its own". The dictionary sentence is exact now: "every
  value in a `Dictionary<string, int>` is an `int`" (open question 4).
- **The Visual Studio line** of the pages in `lessons/` is added before the
  practice link: nothing here needs Visual Studio, a program cell
  downloads as a project, each types cell becomes a file (`Planet.cs`,
  `StarSystem.cs`), and a world's program brings every class above it on
  this page (decision 38).
- **Where to read more** keeps Microsoft's tutorial only (open question
  10).
- **`version:`** is `2026.09.28.1` on both pages: ids changed, and
  solutions and cells were added.
- **Looked at in the page** (`npm run serve`'s server, headless Chromium,
  28 September 2026). Each world shows its 16 cells (15 in your own) with
  the kind and file expected: TYPES `Planet.cs`, `StarSystem.cs`,
  `Body.cs`, `Shapes.cs`, `Astronaut.cs`, `Character.cs`, `Healer.cs`,
  `Room.cs`, `Probe.cs`, `Lander.cs`, `Mission.cs`; PROGRAM for the
  others; EMPTY for the three cells of your own. Two predicts, and a
  Compare table under `a-system-holds-its-planets-2`,
  `cases-that-are-not-clear-cut-3-program` and the world's program. With
  `Farthest` typed into `a-system-holds-its-planets-1-star-system`, Run on
  `a-system-holds-its-planets-2` goes from "Did not compile, so nothing
  ran." to "Ran." and `Jupiter`; with `AddRole` written and called, the
  astronaut's program prints `True True`. Practice problem 9's program
  prints its two lines. No page errors, and no verdict word on either
  page.

## How it was checked

- `npm run check-lessons -- objects-inside-objects`, without `--write`:
  no problems (see "Review" for the recorded outputs).
- The four class-chain copies (`Character`, `Healer`, `Probe`, `Lander`)
  were compared by script with their sources in `lessons/`: `Character`
  with `another-kind-of-creature-2` of `one-parent-many-children`, and the
  other three with the classes in its `your-class-4-program--<world>`
  solutions. They are the same, except that the two `// changed` comments
  in `another-kind-of-creature-2` are left out, as that page's own
  challenge leaves them out. The fifth version, `Room` and `Mission` in
  the solutions here, was compared the same way with the copies in
  `testing-what-a-class-does` (`your-class-6-room--game`,
  `your-class-6-mission--solar-system`): the same.
- The three `expect: CS1061` program cells (`a-system-holds-its-planets-2`
  and `your-class-5-program--<world>`) and practice
  `gold-in-the-vault-1-program` fail only because the method the reader
  writes is missing. Each solution runs, and gives the values the notes
  quote.
- Every cell compiles with no warning. That matters for one sentence: "It
  ran, with no error and no warning" (`is-a-or-has-a-1-program`, and the
  types cell above it).
- The probes, in the browser engine in a scratch lesson (28 September
  2026), printed what the native check printed: P1 `with the copy: 1`,
  `without the copy: 2`; P2 `2`, `StarSystem`, `the Sun`; P3
  `ArgumentOutOfRangeException` in `StarSystem.Farthest()` at the
  `_planets[0]` line; P4 `3122` and the record's text; P5 `True True`,
  then `3`; P6 the refusal, `Ada, Ada`, `Cave: 2 standing`; P7
  `in flight: True True`, `landed: True False`, `Voyager: True True`; P8
  `Alpha Centauri A`; P9 `True`, `Saturn`; P10 `Dune: 100, fleet: 0`; P11
  CS1503; P12 CS0122; P13 CS7036.

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
under dewlab's `-2`. *(Moved: the ids are now `-1-planet`, `-1-star-system`,
`-1-program` and `-2`, and `Farthest()` is saved under
`a-system-holds-its-planets-1-star-system`; see "Review".)*

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
  `the-moves-you-already-know`, whose C# loop is the same shape. *(Now
  `Heaviest()` or `WidestMoon()`, one for each world of that page.)* The
  solution writes `StarSystem` again below the statements (rule 4), with
  the sentence the other drafts use.
- The solution note is dewlab's, with one more sentence on a method whose
  type is a class, and one more paragraph: a star system with no planets
  stops with an `ArgumentOutOfRangeException` at `_planets[0]` (the third
  input, marked `// throws`, and probe P3). dewlab asked this question in
  the ocean world, which is gone; it belongs here. *(The note no longer
  says "at `_planets[0]`": the recorded input gives the exception's name
  only. It says why instead.)*

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
  and no warning" *(now "It ran, with no error and no warning")*, plus one
  sentence on why: the compiler checks names and
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
  *(The predict is gone, and the interfaces page is named in italics, with
  a definition of interface; see "Review".)*
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
  the list, not the class" in code. *(The fold is now a solution, with an
  input and a hint, on `cases-that-are-not-clear-cut-3-program`.)*

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
them in plain text. *(Now the closer look's short title in italics,
decision 32, and a link to `testing-what-a-class-does`, which is in
`lessons/`.)*

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
syntax as much as the design. *(The move kept Microsoft's only; see open
question 10.)*

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
   task moved world. *(The closer look is now named by its short title in
   italics, and the program is `-1-program`.)*
2. **Gold in the vault.** `Treasure` becomes a one-line record, as in the
   game solution on `from-a-description-to-classes`. The reader writes
   `Gold()` in the types cell (`gold-in-the-vault-1`), and the program cell
   (`-2`, *now `-1-program`*) fails with CS1061 until then. dewlab's two inputs stay. dewlab
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
   not from copying a rule. *(The move gave the problem a types cell and a
   program, whose recorded lines the fold now quotes.)*
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
    *(The fix is now a solution on the cell, and the checker records
    `True`, then `Saturn`.)*

The page intro says one cell is meant not to compile: problem 10's. The
CS1061 program cell of problem 2 is not counted there, because its task
says that it does not compile until the method exists, as on the
tutorial. *(The intro now has the exemplar's words: "Some cells are meant
not to compile, and the problem says so.")*

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
  its next; whoever writes it can link here. *(Done by the move of
  `one-parent-many-children`: its practice problem 7 links here now. The
  checker reports that link as good since this page is in `lessons/`.)*
- **`many-classes-one-promise` is not written.** This page links to it
  twice and relies on three things the course map says it teaches: an
  interface is a list of methods a class promises to have; `IShape` with
  `Area()` lets `Square` and `Rectangle` share one list without one
  inheriting from the other; and a class can keep several promises (the
  astronaut). Check the names (`IShape`, and the `I` in front) and the
  wording when that page exists. The definition matches the one
  `when-is-a-breaks` gives. *(The page names it *Interfaces*, in italics,
  and defines interface in the course map's words. Still to check when it
  exists: see "Open".)*
- **`two-names-one-object` and `testing-what-a-class-does`** (batch 8) are
  named in plain text at the end of the tutorial, and the closer look in
  practice problem 1's fold. Their authors can add links back here.
  *(`two-names-one-object` is now *Two names, one object*, in italics.
  `testing-what-a-class-does` is in `lessons/`, so the tutorial links to
  it. That page names this one as *Composition*, in italics, in three
  places; now that this page is in `lessons/`, they can become links. That
  page is not this move's to edit.)*
- **The class chain's fifth version.** `testing-what-a-class-does` copies
  it. In the game world it is `Character` (fourth version), `Healer`, and
  `Room` as in the solution of `your-class-5-program--game`, with
  `ToString`. In the solar system it is `Probe`, `Lander`, and `Mission` as
  in the solution of `your-class-5-program--solar-system`. Until the
  format has includes (course map, open question 2), a copy must be checked
  by hand. *(Checked by script: `your-class-6-room--game` and
  `your-class-6-mission--solar-system` in `testing-what-a-class-does` are
  the same as the solutions here.)*
- **A task whose program fails until the reader edits a cell above.**
  `a-system-holds-its-planets-2` and the two world programs carry
  `expect: CS1061` for the starting state only. Once the reader writes the
  method, the program compiles, and the page should show that as an
  ordinary run, not as something unexpected. *(Checked in the page: it says
  "Did not compile, so nothing ran." before, and "Ran." with `Jupiter`
  after. The page shows nothing of `expect:`.)*
- **Compare with a solution.** The Vega input throws for the solution
  (`ArgumentOutOfRangeException`); check that the table shows the name, and
  that a reader's version that returns `null` shows as a difference, not
  as an error. `cave.Standing()` and `outer.ReadyFor(30)` are lists: the
  table should show `["Mira"]` and `["Voyager"]`, and `[]` for
  `outer.ReadyFor(100)`. *(Recorded: `ArgumentOutOfRangeException` for
  Vega; `["Mira"]`, `"Cave: 1 standing"`; `110`, `["Voyager"]`, `[]`. A
  starter's inputs that name a missing method are recorded as CS1061, and
  `cave.ToString()`, which names none, as not run. A reader's `Farthest`
  that returns `null` for Vega was not tried.)*
- **Code in a fold.** The `AddRole` fold holds a `csharp` fence. Check that
  the page renders it as code. *(Moot: the fold is now a solution.)*
- **World cells and shared classes.** Every world program is compiled with
  the page's shared classes above it (`Planet`, the second `StarSystem`,
  `Body`, `Rectangle`, `Square`, `Role`, `Astronaut`). None of their names
  is used by a world class, so nothing is replaced. A reader in their own
  world who writes a class called `Planet` or `Role` replaces the shared
  one for their cells (rule 4), which is harmless. A downloaded Visual
  Studio project of a world program will contain those classes too. *(The
  page's Visual Studio paragraph now says so.)*

## Open questions for a reviewer

Each question the porter raised is below, with what the move decided. The
ones that the playbook, the course map, the style guide and the example
lessons do not answer are under "Open", after them, for Josh.

1. **Size.** The map says L. A reader sees 16 cells, against dewlab's 8
   (or so) for one world, because each class has its own types cell and
   each task a program cell. If the page should be split, the natural
   place is after "Is a, or has a?": the four cases and the fifth version
   would be a second page. That gives a new lesson id, so it is best
   decided before any class uses the page.
   **Decided: one page.** The course map gives the page size L and says an
   L entry "says where" to split; this entry names no split. A split would
   also add a lesson id to `courses/foop.yaml`, which this move does not
   edit. `one-parent-many-children` (L, 20 or 21 cells) decided the same.
2. **The square, twice in two pages.** `when-is-a-breaks` comes two pages
   before this one (the interfaces page is between them), and its fold
   already describes
   what `AreaAtDoubleWidth` shows. The map keeps the case here; I kept it
   as a cell, from the caller's side, and pointed back. It could shrink to
   one paragraph with the link.
   **Decided: keep the cell.** The course map's entry says "The four cases
   that are not clear-cut stay", and names `Square(Rectangle)`. Its
   predict went (question 3), so the case is shorter to read.
3. **Three predicts.** Total moons (number), `StarSystem : Planet`
   (choice: prints, does not compile, or an exception), and the square's
   area (choice). dewlab had one predict and asked the other two in prose.
   The style guide allows two or three. The square's predict is the
   weakest: the paragraph above it says that the fixed square changes both
   sides. Drop it if three is too many.
   **Decided: two predicts; the square's went.** Both of its options, `18`
   and `36`, are lines of the output, so decision 37 counts either guess as
   the same as the output, and the page could never ask "Which line
   explains what you saw?". `when-is-a-breaks` gave the same reason for not
   adding one. The style guide asks for "two or three guesses at most,
   each where a guess is interesting". The question stays in the prose.
4. **The dictionary case.** "Every value in a C# dictionary has the same
   type" is true of the declared value type, but a
   `Dictionary<string, object>` exists. I judged that a Level 5 reader is
   better served without it. Is the simplification acceptable?
   **Decided: make the sentence exact.** It now says "every value in a
   `Dictionary<string, int>` is an `int`", which is true with no exception
   and needs no word about `object` (style guide, `#voice`: common words,
   say the thing first).
5. **Interfaces without a cell.** The page names `IShape`,
   `ICommander` and `IScientist` in prose only, because the interfaces page
   is not written yet and a cell would have to repeat it. Should the
   astronaut get an interface cell once that page exists, to show where
   interfaces stop (a class cannot change its promises)?
   **Decided: no cell.** The course map's entry says the astronaut "now has
   interfaces as an answer", and its list of cells to rework adds none.
   *Interfaces* is the page just before this one, so a cell would repeat
   it. The page now defines *interface* where it first uses the word.
   Checking the names against that page, once it exists, is under "Open".
6. **The penguin, a third time.** Practice problem 7 is dewlab's, but the
   reader has already met the penguin on `when-is-a-breaks` (with a fold
   that gives the `FlyingBird` fix) and on the tutorial's square. It could
   be replaced by a new problem (for example, an interface or composition
   for a bird that can both swim and fly).
   **Decided: keep.** The course map's entry asks for "Its dewlab problems
   in C#, with two or three from earlier pages". Its fold now links to
   `when-is-a-breaks`, where the reader met the penguin.
7. **Facts in the prose that no cell prints.** "Jupiter has more than 90
   known moons" (dewlab: "over 90"), Pluto's reclassification in 2006,
   Peggy Whitson as the first woman to command the International Space
   Station, and Python's `AttributeError` in practice problem 10. They come
   from dewlab's pages and general knowledge, not from a run (course map,
   open question 7).
   **Decided for Python; the rest is under "Open".** Practice problem 10
   no longer quotes what Python prints: "the program stops with an error
   only at the line that asks for the name". The three facts about the
   world are not the output of any program, so decision 29 cannot apply
   to them.
8. **Ids that changed.** The practice page's `one-crew-member-two-rovers-1`
   and `-2` are new (dewlab: `one-crew-member-two-submarines-1`), and
   `gold-in-the-vault-2` is new. dewlab's `question` ids
   (`is-a-or-has-a-q1`, `cases-that-are-not-clear-cut-q1`, `is-or-has-1`,
   `a-bird-that-cannot-fly-1`,
   `from-earlier-a-child-with-no-parents-fields-q1`) have no dewsharp
   block, so nothing is saved under them. The tutorial's types cells have
   new ids, and the reader's `Farthest()` is saved in one of them. Rename
   before any class uses the pages, if wanted.
   **Decided by decision 26** and the shapes the pages in `lessons/` use
   (see "Review"). The reader's work is saved under
   `a-system-holds-its-planets-1-star-system` (`Farthest`),
   `cases-that-are-not-clear-cut-3` (`AddRole`), `your-class-5--<world>`
   (the new class) and, on the practice page, `gold-in-the-vault-1`.
   `one-crew-member-two-rovers-1` keeps its new name (decision 28 renames
   only ids that name Python; this one names the ocean's submarines, which
   are gone). Problem 9's cells are new:
   `from-earlier-asking-not-reaching-1` and `-1-program`.
9. **Practice order.** The "from earlier" problem on a child's constructor
   moved from 8th to 10th, for the reasons in the problem-by-problem list.
   Is that acceptable, or should it keep its place with its classes renamed
   so that later cells are not affected?
   **Decided: last.** Decision 30: "A class that doesn't compile would stop
   every cell below it, so a lesson never has one, except as its last
   cell." `objects-and-classes-practice` moved a problem to the end for the
   same reason.
10. **Where to read more** has two entries, one in C# and one in Python.
    The style guide asks for "one thing to read or watch". Keep both, or
    only Microsoft's?
    **Decided: Microsoft's only.** The playbook's checklist asks for "C#
    sources that exist, such as Microsoft Learn", and no page in
    `lessons/` gives a Python source. The tutorial answered HTTP 200 on 28
    September 2026, and its "is a" section, its "can do" note and its
    `Shape`, `Square` and `Rectangle` are as the page describes them. It
    does not name "has a" or composition; see "Open".
11. **The first program opens with two types cells.** The page opens with
    prose and two classes, as dewlab's does, and the first run is the third
    cell. The style guide's checklist asks a page to open by running
    something.
    **Decided: keep.** A program can use only a class written above it
    (rule 2), so a page about two classes starts with them, as
    `one-parent-many-children` starts with `Character`. The first Run is
    the first program on the page, and it has a predict. The opening
    paragraph asks the questions that the page answers.

## Open

For Josh.

1. **Facts about the world in the prose.** "Jupiter has more than 90
   known moons", Pluto made a dwarf planet in 2006, and Peggy Whitson, a
   biochemist, as the first woman to command the International Space
   Station. No cell can print them, so "every number is run" cannot cover
   them, and no document says what does. They agree with what I know
   (Jupiter had more than 90 confirmed moons by 2023; the IAU's decision
   was in August 2006; Whitson commanded Expedition 16 in 2007 and 2008),
   but they were not checked against a source in this move. Keep them, or
   ask for a source for each?
2. **Names to check when *Interfaces* is written.** This page uses
   `IShape` (with `Area()`), `ICommander`, `IScientist` and, in practice
   problem 7, `ICanFly`, and defines an interface in the course map's
   words. The author of `many-classes-one-promise` should check that its
   names and its definition agree, and change the italic *Interfaces* here
   to a link.
3. **A C# source that names "has a".** Microsoft's tutorial names "is a"
   and "can do", but not "has a" or composition, and no Microsoft Learn
   page found in this move does. Think Python, section 18.8, does (IS-A and
   HAS-A), but it is Python, and it was dropped. Is there a C# source
   worth adding?
4. **The course file and a page that names this one.** `courses/foop.yaml`
   still has this page's line under `planned:` (the playbook's checklist
   says to delete it when a lesson moves; this move may not edit course
   files). `testing-what-a-class-does` names this page as *Composition*,
   in italics, in three places, and can link to it now.

## Where each number and message in the prose comes from

After the move, every number and every quoted output in the prose, the
folds and the solution notes is in the recorded outputs. The probes back
claims that quote no output. Numbers that are values in the code (40 kg,
a 3 by 3 rectangle, 3643 km) are the code's own.

| Number, output or claim | Source |
|---|---|
| `7` (total moons) | `a-system-holds-its-planets-1-program` |
| a copy keeps the planet's moons apart from the caller's list | P1 (`1` with the copy, `2` without) |
| `_planets` holds planets "and nothing else" | P11 (CS1503) |
| `StarSystem` could not read `_moons` | P12 (CS0122) |
| `'StarSystem' does not contain a definition for 'Farthest'` | `a-system-holds-its-planets-2` (CS1061 at 5,23) |
| `Jupiter`; `sol.Farthest().MoonCount()` is 4 | its solution and inputs |
| no planets: `ArgumentOutOfRangeException` | its third input (P3 gives the `_planets[0]` line) |
| `the Sun 0 0`; it ran, with no error and no warning | `is-a-or-has-a-1` and `is-a-or-has-a-1-program` (no diagnostics) |
| a `List<Planet>` accepts a star system | P2 |
| the dictionary and the record in the prose compile | P4 |
| `Pluto, a planet`, `Pluto, a dwarf planet` | `cases-that-are-not-clear-cut-1-program` |
| `18`, then `36` | `cases-that-are-not-clear-cut-2-program` |
| `True False` | `cases-that-are-not-clear-cut-3-program` |
| solution: `True True` | its solution (`true` for `peggy.Can(Role.Pilot)`) |
| the `if` keeps each role once (no number) | P5 (`3` roles after adding the pilot twice) |
| game: `'Room' does not contain a definition for 'Enter'` | `your-class-5-program--game` (CS1061 at 3,6) |
| game: `Refused: Ada is already in Cave.`, then `Mira` | its solution (and `["Mira"]`, `"Cave: 1 standing"`) |
| game note: a new `Character("Ada", 10)` could enter | P6 (`Ada, Ada`, `Cave: 2 standing`) |
| solar system: `'Mission' does not contain a definition for 'Launch'` | `your-class-5-program--solar-system` (CS1061 at 4,7) |
| solar system: `110`, then `Voyager` | its solution (and `110`, `["Voyager"]`, `[]`) |
| the challenge compiles alone | `challenges` in the outputs file |
| practice 1: `40 40` | `one-crew-member-two-rovers-1-program` |
| practice 2: `'Room' does not contain a definition for 'Gold'` | `gold-in-the-vault-1-program` (CS1061 at 4,25) |
| practice 2: `62`, and 0 for an empty room | its solution and inputs |
| practice 4: the fleet counts only its own crew | P10 (`Dune: 100, fleet: 0`) |
| practice 4: a fleet's constructor must pass a name | P13 (CS7036) |
| practice 9: `In flight: True True`, `Landed: True False` | `from-earlier-asking-not-reaching-1-program` |
| practice 10: CS7036 and its message | `from-earlier-a-child-with-no-parents-fields-1` (19,12) |
| practice 10: `True`, then `Saturn` | its solution |

No compiler message's line or column is quoted in the prose.

## Probes

Run with the NativeCheck command, passing this file. In the browser: copy
the cells below into a scratch lesson (a folder `<scratch>/lessons/<id>/`
with `<id>.md`, and a frontmatter with `title:` and `version:`), then run
`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`. The
move did this on 28 September 2026, and every probe gave what the native
check gave (see "How it was checked"). P3, P5, P7 and P9 now back cells
or solutions on the pages, which record the same outputs. Types carry down under
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
