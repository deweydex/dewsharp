# Notes: one-class-many-methods

Ported from dewlab `tutorials/one-class-many-methods/` (the tutorial, its
practice page and its glossary, all version 2026.09.26.1). First drafted on
27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 10, batch 2).
It starts from the second version of the class chain, which
`keeping-details-inside-an-object` makes.

**Moved into `lessons/` on 28 September 2026.** The drafts' `*.native.json`
files were deleted. Every cell, solution, input and the challenge was run in
the browser engine (`npm run check-lessons -- --write one-class-many-methods
one-class-many-methods-practice`), and the probes at the end of this file
were run the same way, in a scratch lesson. "Decisions on the porter's
questions" says what was settled, and "Open" lists what is left for Josh.

Files:

- `lessons/one-class-many-methods/one-class-many-methods.md`: the tutorial.
  24 `csharp exec` cells: 18 shared, and 2 in each world (a types cell and a
  program cell). A reader in one world sees 20. 3 predicts, 4 hints, 3
  solutions (each with `inputs`), 1 challenge. Version 2026.09.28.1.
- `lessons/one-class-many-methods/one-class-many-methods-practice.md`: the
  practice page. 18 cells (a types cell and a program cell for each of
  problems 1 to 5 and 7 to 10), 6 predicts, 2 hints, 4 solutions (2 with
  `inputs`), 9 answer folds. Version 2026.09.28.1.
- `lessons/one-class-many-methods/*.outputs.json`: what the browser checker
  recorded.
- This file. The probes at the end check the claims in the prose and folds
  that no lesson cell prints.

## How it was checked

- `npm run check-lessons -- one-class-many-methods
  one-class-many-methods-practice`, without `--write`: no problems, except
  that `lesson:a-polynomial-class` is not in `lessons/` yet. That page is
  being moved in the same batch, so the orchestrator's full run checks it.
- The browser engine printed the same values as the native check, for every
  cell and every solution: no culture, `Console` or formatting difference
  showed up on this page. Values:
  - `LightHours()`: the starter does not compile (CS1061, expected); the
    solution gives `4.2` and `0.7`.
  - Game: the starter gives `"Ada (health 13)"` and `"Grace (health 4)"`,
    and `IsDown()` does not compile yet (CS1061); the solution gives
    `"Ada (health 10)"`, `"Grace (health 0)"`, `false`, `true`.
  - Solar system: the starter gives `"Voyager (fuel 120 kg)"`, and
    `CanBurn` does not compile yet (CS1061); the solution gives `true`,
    `false`, `"Voyager (fuel 100 kg)"`.
  - Practice 2: `"Earth"` in both orders. Practice 7: the starter does not
    compile (CS7036), so its inputs are recorded as not run; the solution
    gives `"Juno (fuel 100 kg)"` and `"Voyager (fuel 40 kg)"`. Practice 8
    and 10: the solutions print `Mars is a planet.` and `Mars`.
- The probes, run in the browser engine in a scratch lesson (28 September
  2026), printed what the native check printed: P1 CS1503; P2 one refusal,
  then `Mars 2`; P3 `149.6 230`, then `Sol` for both planets; P4 `0` and
  `0`, then `1.9`, `165.8` and `1`; P5 `Ada (health -42)` and `Alan (health
  10)`; P6 `Voyager (fuel 150 kg)` and `Juno (fuel 100 kg)`; P7 `0`, `4`,
  and CS0272; P8 `Mars is a planet.`; P9 `2 2`; P10 `Mars`; P11 CS1501. A
  further probe showed that `this.LightMinutes()` in `Describe` prints the
  same line as `LightMinutes()` (`Mars: sunlight takes 12.7 minutes`).
- Every CS code and message quoted in the prose is copied from the
  recorded outputs. The prose quotes the message and not the
  `file(line,col)` part. Where it says "line 3" or "line 19 of
  `Planet.cs`", that is the line the checker recorded.
- No cell reads input, so no cell needs `stdin:`.
- The four links in "Where to read more" returned HTTP 200 on 27 and on 28
  September 2026: the overloading guidelines (the same parameter names and
  order in every overload), the static members page (static fields and
  methods, and `Math` as a static class), the constructors page (a
  constructor that calls another with `: this(...)`), and NASA's fact sheet
  (the distances 57.9, 108.2, 149.6, 228.0, 778.5 and 4515.0).
- The page was opened with `npm run serve` (game and solar-system worlds,
  and the practice page): no errors in the console, a kind label and a file
  name on every cell, and every link going to a page in `lessons/` or in
  this batch.

## What changed from the Python page, and why

**Frontmatter.** `year:` is gone. The worlds are game, solar-system and
your-own, with the predecessor's wording; ocean is dropped. dewlab's
`covers:` was per section (FOOP-LO4, FOOP-LO8, FOOP-LO3); the course map
gives `[FOOP-LO3, FOOP-LO4, FOOP-LO8]`, which is what the page has. The
title is the course map's.

**Cells follow the rules of the road.** Each Python cell became a types
cell (dewlab's id, with `file: Planet.cs`) and a program cell below it
(`<id>-program`, decision 26). Each types cell writes `Planet` again,
complete, and replaces the one above for the cells below it (rule 4); the
prose says so at the first replacement. Rules 1, 2 and 4 are pointed to
where the page relies on them.

**The opening (`sunlight-1`, `sunlight-1-program`).** Keeps its number
predict (tolerance 10). `round()` became `Math.Round(x, 1)`, defined in one
sentence before the cell. C# prints `251`, not Python's `251.0`, and the
prose says why in one sentence (a `double` with no decimal part prints
with no point).

**Giving it more to do.** `giving-it-more-to-do-1` (types) and `-1-program`
are dewlab's first cell. `self.light_minutes()` became `LightMinutes()` by
its name alone, with one sentence on `this.LightMinutes()`. The paragraph
on reuse keeps dewlab's point, with "a method outside the class" in place
of "a stand-alone function". The task is `giving-it-more-to-do-2` (the
class the reader changes) and `giving-it-more-to-do-2-program`, which calls
`LightHours()` and so fails with CS1061 until the reader adds the method
(`expect: CS1061`; the prose says the failure is expected and that the
message names what is missing, decision 27). Two hints, the first a
question, the second the method's first line, because C# needs the return
type.

**Data that belongs together.** `self._moons = []` became
`private List<string> _moons = new List<string>();` and `moon in
self._moons` became `_moons.Contains(moon)`, defined in the prose. The
loop over `[earth, mars]` became `foreach (Planet planet in new
List<Planet> { earth, mars })`, and the prose says that a list can hold
objects. The paragraph "why is `_moons` private" says what a public list
would allow in C# (`mars._moons.Add("Phobos")`).

**New section: "One name, two methods: overloading".** The course map
asks for it (FOOP's descriptor names method overloading). It sits after
"Data that belongs together", because its second half uses the moons.

- `overloading-1`, `-1-program`: `IsFartherThan(Planet other)` and
  `IsFartherThan(double distance)`. *Parameter*, *overload*,
  *overloading* and *argument* are defined where they appear. The prose
  names two overloads the reader has already used (`Math.Round` with one
  and two arguments, and `Console.WriteLine`), and says that C# chooses
  when it compiles.
- `overloading-2` (`expect: CS1503`): `mars.IsFartherThan("Jupiter")`. The
  prose says the cell is meant to fail, asks what the compiler will say,
  and then quotes the recorded message, which is about only the overload
  that takes a `Planet`.
- "A second constructor", `overloading-3`, `-3-program`: the moons class
  again, with `Planet(string name, double distance, List<string> moons) :
  this(name, distance)`, which adds each moon with `AddMoon`, so the rule
  holds for moons given to the constructor. The prose explains `: this(...)`
  and asks the reader to put Phobos in the list twice (probe P2).

**"Class attributes and instance attributes" became "One value for the
whole class".** The course map's central change. C# has no *attribute* in
Python's sense (an attribute in C# is `[Obsolete]` and its kind), so the
page never uses the word. dewlab's glossary terms became *instance*,
*instance field*, *static field*, *member*, *instance reference* and
*static method*, each defined where it first appears.

- `class-attributes-and-instance-attributes-1`, `-1-program`: `public
  static string Star = "the Sun";`, read inside the class by an `Orbits()`
  method, and changed once through the class, `Planet.Star = "Sol";`. In C#
  a program cannot read `earth.Star`, so dewlab's `print(earth.star)` became
  `earth.Orbits()`. A choice predict: both show Sol, both show the Sun
  ("each planet kept its own copy"), or only one.
- `class-attributes-and-instance-attributes-2`, `-2-program`: the count of
  planets made, `public static int PlanetsMade = 0;`. It prints `3`. The
  prose adds that each Run starts a new program (rule 1), so the count
  starts at 0 on every run.
- `class-attributes-and-instance-attributes-3` (new, `expect: CS0176`):
  `Console.WriteLine(earth.PlanetsMade);`, using the class from `-2`. The
  prose explains every part of the message: *member*, *instance
  reference*, *qualify it with a type name*. dewlab's trap
  (`earth.star = "Proxima"` quietly making a new attribute) cannot happen
  in C#; it became one bracketed sentence for readers who know Python, and
  practice problem 3.
- New: `Math.Round`, `Math.Max` and `Console.WriteLine` are static
  methods, which is why they are called through a class name.
- The table keeps dewlab's rows, with "inside the class" and "outside the
  class" in place of "example", because C# reads a static field
  differently from the two places. Probe P3 checks the last row.

**Your turn: your class, third version.** Each world has a types cell
(`your-class-3--<world>`, with `file:`) and a program cell
(`your-class-3-program--<world>`). The types cell is the predecessor's
solution (version 2), copied exactly. The task is dewlab's `game-3.py` and
`solar-system-3.py` in C#:

- Game: `public static int MaxHealth = 10;`, `IsDown()`, and `Heal`
  refusing a character who is down and using `Math.Min(MaxHealth, ...)`.
- Solar system: `public static int TankSize = 100;`, `CanBurn(int kg)`,
  `Burn` using `!CanBurn(kg)`, and `Refuel` using `Math.Min(TankSize,
  ...)`.
- The starter programs compile and show the problem first: Ada heals to
  13, and Grace, down with 0 health, heals to 4; Voyager refuels to 120 kg.
  dewlab's solar-system program printed `can_burn(80)` in the middle, which
  in C# would stop the starter from compiling; the call moved to `inputs`,
  and the program gained a refused burn of 80.
- The `inputs` call `IsDown()` and `CanBurn()`, which the starter class
  does not have. The page shows "did not compile: CS1061" in those rows
  until the reader writes the methods.
- The solution notes say that the solution writes the class again (rule
  4), keep dewlab's question (what does a negative heal or burn do to this
  version? P5, P6), and add one about overloading: could a second
  constructor start a character at `MaxHealth`, or a probe with a full
  tank? (P5, P6.) Practice problem 7 is that task, for the probe.
- The hints begin with a question. The solar-system hint defines `!`.
- The your-own world has two comment-only cells, recorded as `empty`.

**Looking back and the challenge.** The question keeps dewlab's shape,
worded as a question. dewlab's "Every method on this page found what it
needed on self" became "Most methods", because the next sentence names two
methods that take a parameter. The Kepler challenge is statements then the
class, and the prose gives `Math.Pow(x, 1.5)`. Probe P4: the starter
prints 0 and 0. The prose states no answer.

**Next and "Where to read more".** "Next" goes to the practice page, then
`from-a-description-to-classes`, and offers `a-polynomial-class` as an
extra project that meets overloading again, for `+` (its draft overloads
`operator +` and links back here). *Think Python* and the Python tutorial
became Microsoft Learn (member overloading, static members, constructors).
NASA's fact sheet stays. The closing paragraph says that nothing on the
page needs Visual Studio, and what Visual Studio shows for overloads.

**Style.** Phrasal verbs and idioms were taken out ("leaves out", "keep in
step", "look at", "just as well", "keeps Phobos out"). Every term is
defined where it first appears.

## Changes made when the page moved (28 September 2026)

No cell's code changed in this pass, so the version stayed 2026.09.28.1.

- Tutorial: the sentence under `sunlight-1-program` says why `251` has no
  point; the CS1503 paragraph says the message is *about* one overload
  (it names the type `Planet`, not a method); *instance* is defined before
  *instance field*; the game task says Grace is down with 0 health and
  still heals to 4 (both numbers recorded); both world solutions say the
  class is written again (rule 4), as the predecessor's do; the polynomial
  link says what that page adds, in place of "It is harder than this page".
- Practice: problem 2 says the program is meant not to compile and quotes
  what its message names (decision 27); problems 2 and 7 say the solution
  writes the class again (rule 4); problem 7 says "meant not to compile";
  problem 9's predict note no longer uses a phrasal verb; problem 10's
  "meant not to compile" sentence moved above its cells, so the reader
  reads it before running.

## The practice page, problem by problem

1. **Two questions for one planet.** Unchanged in substance; types and
   program cells, with the predict.
2. **The closer of two.** A program cell that calls `CloserOf`
   (`expect: CS1061` until the reader writes it), with the solution on the
   program cell. The solution returns `this`, which the note explains.
   The hint asks what type the method returns, which C# needs written.
3. **One star, renamed.** In Python, `earth.star = "Proxima"` made a new
   attribute; in C# it is CS0176 at line 3 (`expect: CS0176`). The
   predict keeps dewlab's two outcomes and adds "It does not compile".
   The fold keeps dewlab's lesson: if each planet needs its own star,
   make it an instance field.
4. **A planet counter.** `for name in [...]: Planet(name)` became a
   `foreach` with `new Planet(name);` as a statement. Prints `4`. New in
   the fold: a public static count can be reset by any program (P7), and
   the page before gives the fix, a property with a private `set`, which
   works with `static` too (P7: `4`, and CS0272 for `Planet.PlanetsMade =
   0;`).
5. **Moons for everyone.** dewlab's shared class list works the same way
   in C#: `public static List<string> Moons`. Printing through
   `earth.Moons` would be CS0176, so the class has a `MoonNames()`
   method. Prints `Phobos`.
6. **One limit or many.** The ocean's Nautilus and Alvin became two
   probes in the solar system, with invented tank sizes (100 kg and
   500 kg). Prose and a fold, as in dewlab.
7. **A full tank to start** (new). Constructor overloading with
   `: this(name, TankSize)`. The program fails with CS7036 until the reader
   writes the constructor (`expect: CS7036`). The course map asks for a
   second constructor; the tutorial shows one, and this is the "completed"
   step.
8. **Two methods, one name** (new). Two `Describe()` methods, one
   returning and one printing: CS0111, with CS0121 (*ambiguous*) after
   it. The fold uses "read the first message first", and says that the
   return type does not count. The program cell shows the class cell's two
   messages (as `Planet.cs(15,17)` and `Planet.cs(17,27)`) and its own
   CS0121 on line 2, which the fold's last sentence describes.
9. **From earlier: reaching in.** In Python the program printed 2; in C#
   it is CS0122 at line 3. A choice predict, with "it does not compile" as
   one option. The prose under its types cell says that this `Planet`
   replaces problem 8's (rule 4).
10. **From earlier: one argument short.** Python's `TypeError` became
    CS7036 at line 19 of `Planet.cs`. The fold asks what the compiler says
    once the tutorial's second `IsFartherThan` is added (P11: CS1501), and
    does not answer it. The fix prints `Mars`.
11. **From earlier: which move?** dewlab's fill-in-the-blank `question`
    became a list with an answer fold. The code is to read, not run. P9
    checks that the loop and `_moons.Count` agree.

Problem 8's class does not compile, and it is not the last class on the
page: problem 9's `Planet` replaces it straight away (rule 4), and the
recorded outputs show that problem 9's program gets only its own CS0122.
Problem 10's class is the last class on the page. See "Open", item 3.

## Decisions on the porter's questions

1. **Size.** The course map says M (8 to 15 cells); a reader sees 20.
   *Decided: keep the page as it is.* Decision 26 splits each class and
   its program into two cells, so the page has 11 tasks, counting each
   pair once, which is inside M. The course map's entry asks for the
   second constructor on this page ("a second constructor calls the first
   with `: this(...)`"), so it stays here, and practice problem 7 is the
   step where the reader writes one.
2. **`static` or `const` for the limits.** *Decided in part: version 3
   keeps `public static int MaxHealth = 10;` and `public static int
   TankSize = 100;`.* The course map says "Class attributes become
   `static` fields", this section teaches static fields, and the next
   page's draft (`one-parent-many-children`) copies version 3 as it is.
   Whether a page should mention `const`, and which, is under "Open".
3. **`PlanetsMade` as a public static field.** *Decided: keep the field in
   the tutorial.* The style guide's `#code` says a cell with two ideas in
   it wants to be two cells, and the count cell's idea is one value for the
   whole class. Practice problem 4's fold gives the property with a private
   `set`, from the page before, and P7 ran it in the browser (`4`, and
   CS0272 for a program that tries to reset it).
4. **The class chain's third version has no second constructor.**
   *Decided: keep dewlab's version 3.* The course map's entry asks for "the
   third version" of dewlab's chain, and the next page's draft copies it
   exactly as this page's solutions have it: `character-so-far` and
   `your-class-4--solar-system` in `one-parent-many-children` match the game
   and solar-system solutions line for line (checked 28 September 2026).
   Adding a constructor here would change that page too. The solution notes
   ask about a second constructor, and practice problem 7 writes one.
5. **Version 2 copied from the predecessor's draft.** *Resolved.*
   `keeping-details-inside-an-object` is in `lessons/` (version
   2026.09.28.1), and `your-class-3--game` and `your-class-3--solar-system`
   match its two solutions exactly (checked 28 September 2026).
6. **Cell ids.** *Decided: keep them.*
   `class-attributes-and-instance-attributes-1` to `-3` keep dewlab's
   prefix: the course map's entry lists them, and decision 28 renames only
   ids that name Python (`let-python-...`, `...-to-python-...`). The split
   cells follow decision 26: the types cell keeps dewlab's id and the
   program cell is `<id>-program` (`giving-it-more-to-do-2` and
   `giving-it-more-to-do-2-program` for the `LightHours` task; the practice
   page's `<id>-1-program`). New cells are `overloading-1` to `-3` and
   `class-attributes-and-instance-attributes-3`. No class has used these
   ids yet.
7. **Python asides.** *Decided: keep them, short and in brackets.* The
   exemplar `objects-and-classes` does the same ("(Python allows the second
   slip, and quietly adds a new piece of data.)", "(Python calls it
   `self`, and needs it every time.)"), and the practice pages of
   `keeping-details-inside-an-object` compare with Python in their folds.
8. **World order.** *Decided: game first.* The course map's entry lists
   "game, solar system, your own", as every FOOP page in `lessons/` does,
   and decision 36 carries the reader's world from page to page. The shared
   sections teach with `Planet`, as dewlab's page did, and
   `keeping-details-inside-an-object` teaches its shared sections with
   `Probe` in the same way.
9. **Links and batches.** *Decided by the move's rules.* The pages link
   to `keeping-details-inside-an-object`, `the-moves-you-already-know` and
   `the-tools-around-your-code` (in `lessons/`), and to
   `from-a-description-to-classes` and `a-polynomial-class`, which move in
   the same batch. The polynomial page is offered as an extra project,
   since its draft overloads `operator +` and links back to this page.
10. **The CS1503 message.** *Resolved.* It is now a cell
    (`overloading-2`, `expect: CS1503`), and the browser engine records the
    same message the native check did: `Argument 1: cannot convert from
    'string' to 'Planet'`. The prose says the message is about the overload
    that takes a `Planet`, and gives no rule for which overload the
    compiler names.
11. **Predicts on the practice page.** *Decided: six (problems 1, 3, 4, 5, 8
    and 9).* The exemplar practice pages keep dewlab's count
    (`objects-and-classes-practice` has 6, `first-steps-practice` 7); the
    style guide's "two or three" is followed on the tutorial, which has 3.

The questions under "What should change once the page UI or the browser
checker exists" in the first draft are answered:

- **Compare with a solution when the starter does not compile.** The page
  shows "did not compile: CS1061" and the message in each row, and for
  practice problem 7, where the starter never reaches the inputs, "did not
  run" and the note "Your cell did not reach the inputs."
- **Messages from cells above.** The page lists them under the program
  cell with the class cell's file and line (`Planet.cs(15,17): error
  CS0111 ...`), and a click goes to that cell. Practice problem 8's fold
  describes this.
- **A reader's half-edited class.** The browser engine leaves out a class
  that a later cell writes again: practice problem 9's program compiles
  with only its own CS0122, below problem 8's class that does not compile.
- **Empty cells.** Recorded as `empty`.
- **The challenge.** The checker compiles it alone (decision 40): it
  compiles.
- **Cell length.** Types cells are 14 to 36 lines, against the style
  guide's five to fifteen, and program cells are 1 to 10. A types cell
  holds a whole class, as in the exemplars (`objects-and-classes` has
  class cells of 16 to 30 lines), so the page follows them.

## Open

For Josh.

1. **`const`.** Version 3's limits are `public static` fields, which any
   program can change (`Character.MaxHealth = 1000;` compiles). A C#
   programmer would more often write `public const int MaxHealth = 10;`.
   Should a page mention `const`, and which one? `types-and-their-sizes`
   or `from-a-description-to-classes` might be the place. Changing version
   3 itself would also change `one-parent-many-children`, which copies it.
2. **Python asides for readers who took PDP in C#.** The page keeps one
   bracketed sentence about Python, and the practice folds for problems 3,
   9 and 10 compare with Python, as the exemplars do. A reader who never
   met Python does not need them. Keep them, shorten them, or put them in
   a `dl-why` fold across the course?
3. **Decision 30 and a class that does not compile in the middle of a
   page.** Decision 30 and `docs/TRANSLATING.md` say a class that doesn't
   compile may only be the last cell on a page. Practice problem 8 has one
   in the middle, replaced straight away by problem 9's `Planet` (rule 4).
   The engine handles that (the recorded outputs show it), and
   `the-moves-you-already-know-practice` does the same with
   `the-highest-score-too-soon-1` and `-2`. The practice page cannot put
   both of its broken classes (problems 8 and 10) last. Should decision 30
   say "last on its page, or replaced by the next class cell"? This move
   did not edit `DECISIONS.md`, because other pages are moving at the same
   time and their entries would take the same number.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| `8.3`, `251` | `sunlight-1-program` |
| more than four hours | `4.2`, the `LightHours` solution on `giving-it-more-to-do-2-program` |
| `True`, `Mars: sunlight takes 12.7 minutes` | `giving-it-more-to-do-1-program` |
| `this.LightMinutes()` means the same | probe `probe-this-light-minutes` |
| CS1061 on `LightHours`; `4.2` (and `0.7`) | `giving-it-more-to-do-2-program` and its solution |
| refusal, `Earth 1`, `Mars 2` | `data-that-belongs-together-1-program` |
| `True`, `False` | `overloading-1-program` |
| CS1503 message | `overloading-2` |
| `Earth 0`, `Mars 2` | `overloading-3-program` |
| Phobos twice (a question; the prose gives no answer) | P2 |
| `Sol` for both planets | `class-attributes-and-instance-attributes-1-program` |
| `3` | `class-attributes-and-instance-attributes-2-program` |
| CS0176 message | `class-attributes-and-instance-attributes-3` |
| table: `mars.Distance = 230.0;` changes Mars's only | P3 |
| game: Ada 13, Grace 4; then `Ada (health 10)`, refusal, `Grace (health 0)` (Grace's 0 health) | `your-class-3-program--game` and its solution |
| solar system: 120 kg; then refusal, `Voyager (fuel 100 kg)` | `your-class-3-program--solar-system` and its solution |
| the notes' questions (a negative heal or burn; a second constructor) | P5, P6 (the prose gives no answer) |
| challenge (the prose gives no answer) | P4 |
| practice 1: `False`, `43.3` | `two-questions-1-program` |
| practice 2: CS1061 message; `Earth` in both orders | `the-closer-of-two-1-program` and its solution |
| practice 3: CS0176, line 3 | `one-star-renamed-1-program` |
| practice 4: `4`; reset to 0; CS0272 with a private `set` | `a-planet-counter-1-program`; P7 |
| practice 5: `Phobos` | `moons-for-everyone-1-program` |
| practice 7: CS7036; `Juno (fuel 100 kg)`; Voyager's 40 kg | `a-full-tank-to-start-1-program` and its solution |
| practice 8: CS0111, then CS0121; the fix prints `Mars is a planet.` | `two-methods-one-name-1` and `-1-program`, and its solution |
| practice 9: CS0122, line 3 | `from-earlier-reaching-in-1-program` |
| practice 10: CS7036, line 19; `Mars` | `from-earlier-one-argument-short-1` and `-1-program`, and its solution |
| practice 10: the message with two overloads (a question; the prose gives no answer) | P11 |
| practice 11: the loop and `_moons.Count` agree | P9 |

## Probes

Each probe is one program: its statements, then its class. They were
first run with the native check, and on 28 September 2026 in the browser
engine, as a scratch lesson (`node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`), with the same results ("How it was checked"). A class in a
probe carries down to the probes below it until one writes it again
(rule 4), so the probe whose class does not compile is last.

### P1. Tutorial, overloading: `mars.IsFartherThan("Jupiter")` (CS1503; now the lesson cell `overloading-2`)

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

### P11. Practice 10, with the tutorial's two overloads (CS1501; the fold asks, and gives no answer). Last, because its class does not compile

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
