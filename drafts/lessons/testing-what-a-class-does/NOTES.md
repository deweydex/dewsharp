# Notes: testing-what-a-class-does (C# draft)

Ported from dewlab `tutorials/testing-what-a-class-does/` (the tutorial,
its practice page and its glossary file, all version 2026.09.26.1).
Written on 27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to decision 32), and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 19, batch 8, "adapt", shape
tutorial, size L, worlds game, solar system and your own, covers FOOP-LO10
and FOOP-LO4). It follows the drafts of the pages before it in the series,
`objects-inside-objects` above all, and the exemplar
`lessons/objects-and-classes`.

There was no partial draft: the folder did not exist when this run started.
The native check prints "No problems." for all three files.

Files:

- `testing-what-a-class-does.md`: the tutorial. 21 `csharp exec` cells:
  11 shared (5 types cells, 6 program cells), 4 in the game world, 4 in the
  solar system, 2 in your own. A reader sees 15 (13 in their own world).
  3 predicts, 3 hints, 3 solutions (no `inputs`), 2 answer folds, 1
  challenge.
- `testing-what-a-class-does-practice.md`: the practice page. 8 problems,
  7 exec cells (3 types cells, 4 program cells), 2 predicts, 1 hint, 1
  solution, 7 folds.
- `testing-what-a-class-does.native.json`,
  `testing-what-a-class-does-practice.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the numbers
  and claims in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files and on this file: **No problems.** The
  one warning on either page is the CS8321 that practice problem 2 is
  about. No cell reads input, so no cell has `stdin:`. No cell uses
  `Console.ReadKey`, `Clear` or colours, so the native check could run
  everything.
- `web/lesson/parse.js` (the parser the page and the browser checker
  share) reads both lesson files with no errors: 21 and 7 cells. Every
  predict, hint and solution is attached to the cell intended, and the
  challenge is read as a challenge.
- The class-chain copies in the world cells (`Character`, `Healer`, `Room`;
  `Probe`, `Lander`, `Mission`) were copied from the `objects-inside-objects`
  draft: `Character` and `Probe` from `your-class-5-so-far--<world>`,
  `Healer` and `Lander` from the `-so-far-healer` and `-so-far-lander`
  cells, and `Room` and `Mission` from the solutions of
  `your-class-5-program--<world>`. The world solutions change one method
  each, as dewlab's `game-6.py` and `solar-system-6.py` do.
- Two facts about Visual Studio come from Microsoft Learn, fetched on 27
  September 2026: the steps for a test project and Test Explorer (*Get
  started with unit testing*, updated 29 July 2026: File > Add > New
  Project, search "test", MSTest; Dependencies > Add Project Reference;
  Test > Test Explorer, Ctrl+E, T; Run All), and that MSTest makes a new
  object of the test class for each test method (*MSTest test lifecycle*:
  "Complete test-level order: 1. Create instance of test class
  (constructor)"). Neither could be run here.

## What changed from the Python page, and why

**Frontmatter.** `year:` goes. dewlab's per-section `covers:` becomes the
course map's list, `[FOOP-LO10, FOOP-LO4]`. The ocean world goes (decision
13). The practice page has no `worlds:`, as the exemplar's practice page
has none; `docs/TRANSLATING.md` step 2 says a practice page has its
tutorial's worlds, and the exemplar wins where they disagree.

**The opening and "Five suspects".** The five submarines become five
probes, as the course map asks. Each is a class that implements one
interface, `IProbe`, so one `TestProbe(IProbe probe)` tests any of them;
dewlab passed a class around as a value and made the object inside
`check`. `Suspects.All()`, a static method in the suspects' cell, makes a
new list of the five for each program cell (rule 3: "make it again, or
write a method that makes it"). The bugs map one to one:

| dewlab | dewsharp |
|---|---|
| A refuses a dive to exactly 400 m (`>=`) | A refuses a burn of exactly all its fuel (`kg < Fuel`) |
| B dives, then refuses (the depth has already changed) | B burns what it has when it should refuse (`Math.Max(0, Fuel - kg)`) |
| C has no bug | C holds every check in this section |
| D checks each dive against the hull limit, not the room left | D compares each burn with the size of the tank, not the fuel left (`kg <= 100`) |
| E rises above the surface (no `max(0, ...)`) | E fills past its tank (no `Math.Min`) |

B changed shape. The suspects print nothing when they refuse, because the
stress test runs each of them 100,000 times and a line per refusal would
be thousands of lines. dewlab's B only made sense with a printed refusal,
so B became the bug the solar-system probe had on *Encapsulation* (it
burned what it had). The comments in `IProbe` state the promises the tests
check.

`assert` becomes `Test.Check(claim, expected, found)` in a static class
`Test`, in its own types cell, so that every program cell below can use it
(rule 2). It throws an `Exception` whose message is
`"<claim>: expected <x>, found <y>"`, as the course map's open question 3
asks: it says what was expected and what came back, never "failed". The
first program keeps dewlab's loop with `try`/`catch`, which the course map
names. The question "How many will pass?" became a `number` predict, since
the answer (all five) is the surprise the section rests on.

The solution adds four checks in dewlab's order (the limit, just past it,
past the other end). With probes, one step past the limit (71 kg from 70)
comes before exactly at it (70 kg). B shows only at a burn bigger than
the fuel left while the tank still has fuel: once the tank is empty, B's
`Math.Max(0, ...)` leaves it at 0, as C's refusal does (probe T9). The
note keeps dewlab's point that each bug shows at an edge.

**"Ten lines that run every test" becomes "Many small tests".** C# has no
`globals()`, and a test runner that finds methods by name would need
reflection. The course map asks for "a list of tests called in turn". So
`Test` is written again below (rule 4), with `RunAll(List<Action> tests)`.
`Action` and passing a method by its name are new, and the prose defines
both. The tests are local methods in the program cell. The summary line
is `Tests run: 3. Passed: 3.`, which avoids "failed" and reads the same
for one test or many. dewlab's predict stays, with its two options in
this form. The cell keeps dewlab's id, `ten-lines-that-run-every-test-1`,
because its task is the same (the course map's rule), though the heading
changed. dewlab's paragraph on pytest becomes one on test frameworks, and
points to the Visual Studio section.

**"A test before the fix".** dewlab used the ocean world's submarine
(`ocean-5.py`) and asked about `rise(-500)`. With the ocean gone, the
section uses Probe C, written again in a types cell (rule 4), and asks
about `Refuel(-50)`. Every reader met that question on *Encapsulation*,
where the shared section had them add a check to Juno's `Refuel`. The
alternative, the solar system's `Probe` from the class chain, would have
given away the solar-system world's own task (`Burn(-50)`), and dewlab's
ocean world had that problem. Using Probe C also gives the section a new
point, added after dewlab's: C passed every test in *Five suspects* and
still had this bug, so a test can show that a bug is there, never that no
bug is there. The opening says "One seems to have none" (dewlab: "One is
right"), which also keeps a verdict word out. dewlab's point that "the
three tests from before still pass" relied on the runner finding every
test on the page; in C#, a cell runs only its own tests (rule 3), so the
program repeats one earlier test beside the new one. The cell is split
into a types cell and a program cell (decision 26:
`a-test-before-the-fix-1` and `a-test-before-the-fix-1-program`).

**"Close enough".** The oxygen tank becomes the spare tank from
*Encapsulation* in its first version (`FuelTank`, a `double`), split into a
types cell and a program cell. The question "What will the test say?"
became a predict. The fix with `abs` becomes `Math.Abs(a - b) < 0.001`, as
the course map asks, and `decimal` is added as the second fix, pointing to
the tank's third version on *Encapsulation*. "Which one is wrong: the code,
or the test?" became "is the mistake in the code, or in the test?", to
keep *wrong* out.

**"A stress test" (new).** The course map asks for a loop that runs a
method 100,000 times with random input and checks a rule each time. It
runs on the five suspects, with `new Random(42)` (the course map's seed),
so the prose can quote the steps. The rule is the one `IProbe` promises:
fuel from 0 to 100 kg. It finds D and E, and not A or B, which gives the
section its point: a stress test finds the bugs that break its rule, and
only those. Two folds follow: a rule that B breaks (probe T4), and random
numbers from −20 (probe T5a), which every suspect breaks. The inputs are
0 to 120 kg, never negative, so a reader's fix of Probe C in the section
above does not change what this cell prints (probe T5c).

**"Your turn: your class, sixth version".** Each world has three types
cells with the fifth version (one class each, with `file:`), and a program
cell with the tests. The reader's class to change keeps dewlab's id
(`your-class-6--<world>`, decision 26), and the tests cell keeps dewlab's
id for it (`your-class-6-tests--<world>`). The two other classes have new
ids: `your-class-6-healer--game`, `your-class-6-room--game`,
`your-class-6-lander--solar-system`, `your-class-6-mission--solar-system`.
The starting tests cell runs one test and passes, as dewlab's does. The
solutions hold dewlab's five tests (`game-tests.py`,
`solar-system-tests.py`) and the class with its one change, written again
below the statements (rule 4). Hints now wait for 2 runs, because these
cells compile and run from the start, and the default (`after: 1 errors`)
would never show them. The solar-system hint's last question changed from
"refuel when the tank is exactly full" to the lander, because the fifth
test is about a landed lander. The your-own variant keeps two comment
cells.

**"The next step: tests in Visual Studio" (new).** The course map asks for
a test project and Test Explorer, with steps. The steps follow Microsoft's
page (see "How it was checked"), and add two things a reader of this site
needs: write `public` on the classes the tests use (the page's classes
have no access modifier, so they are `internal`), and start from the
downloaded project. `[TestClass]`, `[TestMethod]` and `Assert.AreEqual`
are named, and so are attributes. No pictures (see "What to revisit").

**Looking back and the challenge.** The question keeps dewlab's shape. It
now says all five suspects had a bug, Probe C too. dewlab's challenge
("the one test that D fails and every other suspect passes") has no
solution in dewlab: with the submarines, B's depth is never less than D's,
and D's never less than C's (a dive that D or C takes, B takes too, and a
rise keeps the order), so whenever B matches C, D does too. In C#, D's bug
is in `CanBurn`, so the test is one line (probe T8:
`Test.Check("a probe with 50 kg cannot burn 60 kg", false,
probe.CanBurn(60))` after a burn of 50). The starter asks the reader to
copy the suspects and `Test` into a cell above, as dewlab's did, because a
challenge opens as a new notebook. Probe T8 runs the starter below them.

**Next, and Where to read more.** Links follow decision 32: only
`objects-and-classes` and `first-steps` are in `lessons/`, so every other
page is named by its short title in italics (*Interfaces*, *Designing
classes*, *Encapsulation*, *Composition*, *Inheritance*, *Documenting a
class*), and nothing links to them. The link to this page's own practice
page stays, as in every draft, because the two move into `lessons/`
together. The task brief asked for `lesson:` links; decision 32 is newer
and says otherwise. dewlab's readings (pytest, Beck, Python's `assert`)
become Microsoft's two pages on unit testing and Beck.

**The practice page.** Every dewlab problem stays, in its order, and the
page starts with a types cell holding `Test` (the same code as the
lesson's second version), because nothing carries between pages.

1. "Where are the boundaries?": the fill-in-the-blank `question` becomes a
   list with blanks and a fold. The fold's second sentence changed: C#'s
   `TakeDamage` refuses with `amount < 0`, so the slip is `<=` (probe P1).
2. "Which tests run?": the runner runs its list, so the test that is left
   out is left out of the list. C# adds something Python did not have: the
   compiler warns (CS8321) about a local method that nothing calls. The
   fold names it, and MSTest's `[TestMethod]` as the same trap.
3. "Twice in the hall": `Room` in a types cell, the test in a program cell
   below, and the solution on the program cell (decision 26). dewlab's
   prompt said "write a test" while giving the test; the prompt now says
   "Here is a test". A hint is added.
4. "A test that is wrong" keeps its id and becomes "A test with a mistake
   in it". The fold adds the `decimal` fix (probe P2).
5. "What pytest adds" becomes "What a test project adds", as the course
   map says.
6. to 8. keep dewlab's three problems from earlier pages: two missions
   (a `number` predict), the knight's `base.TakeDamage` (probe P3), and a
   skeleton's method, which in C# throws `NotImplementedException` (probe
   P4). "If `Character` is right" became "if `Character` keeps its own
   rules".

**The glossary file.** dewsharp has no glossary panel yet, so each of
dewlab's terms is defined in the prose where it first appears: *test*,
*passes*, *boundary*, *test runner*, *test framework*, `Test.Check` in
place of `assert`, and `Action` and a list of tests in place of
`globals()`. New terms, also defined where they appear: *claim*,
*throws*, `try`/`catch`, *stress test*, *seed*, *test project*, *Test
Explorer*, *attributes*.

## What C# made different

- **No `assert` and no `tests:` cell.** A helper class does the job,
  and C# needs it in a types cell to reach every program cell below.
- **No `globals()`.** A runner cannot find methods by name without
  reflection, so it takes a list. That makes "a test left out never runs"
  a question of the list, and C#'s compiler warns about it (CS8321).
- **A class is not a value to pass around; an interface is C#'s way.**
  `TestProbe(IProbe probe)` receives an object, where dewlab's `check(Sub)`
  received a class and made the object itself.
- **Nothing carries between cells but types.** Every program cell makes
  its own probes, through `Suspects.All()` or `new ProbeC(...)`, and every
  program cell lists its own tests.
- **Decimals.** The double arithmetic is the same as Python's
  (`0.7000000000000001`, `0.30000000000000004`), and C# adds `decimal` as
  a second fix.
- **The test project.** Visual Studio has one; the page cannot, so the
  page ends with steps.

## Choices a contract did not cover

`docs/TRANSLATING.md` asks for a numbered entry in `DECISIONS.md` for each;
this run may write only in this folder, so they are proposed here.

1. **The shape of `Test.Check`.** `static class Test` with
   `Check<T>(string claim, T expected, T found)`, which throws `Exception`
   with the message `"<claim>: expected <x>, found <y>"`, and
   `RunAll(List<Action> tests)`, which ends with
   `Tests run: <n>. Passed: <m>.` The claim first, then expected, then
   found, the order of MSTest's `Assert.AreEqual(expected, actual)`. It is
   generic so that one method checks `int`, `bool`, `string`, `double` and
   `decimal`, and so that comparing a `double` with a `decimal` does not
   compile (CS0411), where an `object` version prints "expected 0.7, found
   0.7" (probe T10). The course map says this is "the same small `Check` method
   `building-reusable-tools` writes"; that page (PDP, batch 7) is not
   drafted, so this page sets the shape, and `building-reusable-tools` and
   `documenting-a-class` should use the same class.
   *Cost to change: moderate. Every program cell on this page and its
   practice page calls it.*
2. **Suspects that refuse without printing.** See B above.
   *Cost to change: low, if the stress test goes.*
3. **"Passes" and "does not pass" in the prose; "failed" only as Test
   Explorer's own word.** The style guide bans verdicts about the reader's
   work. A test's result is about a class, but the page still says "does
   not pass" rather than "fails", and the check's message says what it
   expected and found.
   *Cost to change: low. A search for "not pass".*

## What to revisit once the page UI or the browser checker exists

- **No `inputs` on the three solutions.** The engine shows a `void` input
  as `(no value)` and an input that throws by its exception's name
  (`docs/ENGINE_API.md`), so `TestProbe(new ProbeA("Probe A", 100))` with
  a note `// throws when a check does not hold` on each suspect would make
  a good comparison table for `five-suspects-3`. NativeCheck cannot
  evaluate a `void` input (it wraps each input in a call that takes a
  value, and records a compile error), so the draft leaves `inputs` out.
  Decide once the browser checker runs. The world tests cells have no
  natural input either: what they compare is the classes, through the
  tests' output.
- **"Compare with a solution" without inputs.** Check what the page shows
  for a solution with no `inputs` block. Earlier drafts have the same case.
- **The Check button and `Test.Check`.** A types cell's button is labelled
  **Check**, and the page's method is `Test.Check`. The prose never tells
  the reader to press the button, but a reader may confuse the two.
- **Warnings in the world cells.** None: every cell compiles with no
  warning. Only practice problem 2 warns (CS8321), in a program cell, so
  nothing below it shows it.
- **Time in the browser.** `a-stress-test-1` runs about 300,000 steps (A,
  B and C all 100,000; D and E stop early), and the fold with negatives
  fewer. Native .NET runs it at once; check the time in the browser
  engine, which interprets.
- **The downloaded project.** A download of a world's tests cell would hold
  every shared class above it (`IProbe`, the suspects, `Test`, Probe C,
  `FuelTank`) as well as the world's classes. The Visual Studio steps
  should still work, since only the classes the tests use need `public`.
  Not tried: a test project that references a console app with top-level
  statements.
- **Pictures.** The course map asks for Visual Studio steps "with pictures
  described in words". This draft has the steps and no pictures.
- **Forward links.** `objects-inside-objects` names "a page on testing"
  in plain text; `one-parent-many-children-practice` and others may too.
  Under decision 32 they stay plain until the pages move into `lessons/`.

## Open questions for a reviewer

1. **Size.** The map says L. A reader sees 15 cells, and the suspects'
   cell is about 175 lines (five classes of 30 lines, the interface and
   `Suspects`). It could be five types cells, one for each suspect, which
   fits the style guide's "short cells" better; the course map asks for
   one cell with the five. If the page should be split, the natural place
   is before "A stress test": the stress test and the Visual Studio part
   would be a second page, with a new lesson id.
2. **The generic `Check<T>`.** The page explains `<T>` in one sentence.
   An `object` version is simpler to read and has the trap above. Or
   three overloads (`int`, `bool`, `string`), which uses overloading from
   *Methods and overloading* but triples the code.
3. **`Action` and methods passed by name.** New to a FOOP reader, and the
   runner needs it. The alternative, an interface `ITest` with a class for
   each test, is heavier. Is one paragraph enough?
4. **Probe C in "A test before the fix".** It gives the page the point
   "a test cannot show that no bug is there", and it changes dewlab's
   story: the one suspect with no bug turns out to have one. Keep, or use
   a class from the chain as dewlab did?
5. **The stress test's second fold** (negatives) shows that none of the
   suspects refuses a negative number, which the boundary tests never
   looked for. Is that one fold too many?
6. **Three readings.** The style guide asks for one thing to read or
   watch. Keep Microsoft's two pages and Beck, or only *Get started with
   unit testing*?
7. **Visual Studio version.** The steps are for Visual Studio 2022
   (course map, open question 11). Microsoft's page covers 2022 and later
   with the same menus.
8. **The practice page's worlds.** None, as in the exemplar; see
   "Frontmatter" above.
9. **dewlab's challenge.** It has no solution as written (see "Looking
   back and the challenge"). That is dewlab's to fix; this page's
   version works.

## The class chain: the sixth version

`documenting-a-class` copies it. In the game world it is `Character` as in
the solution of `your-class-6-tests--game` (with `Heal` refusing a
negative amount), `Healer` as in `your-class-6-healer--game`, and `Room`
as in `your-class-6-room--game`. In the solar system it is `Probe` as in
the solution of `your-class-6-tests--solar-system` (with `CanBurn`
refusing a negative burn), `Lander` and `Mission` as in their cells here.
The five tests in each solution come with it. Until the format has
includes (course map, open question 2), a copy must be checked by hand.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| all five print `every check held` (the predict's answer, 5) | lesson cell `five-suspects-2` |
| A found 70, B found 0, D found −1, E found 500; C holds every check | solution of `five-suspects-3` |
| `Tests run: 3. Passed: 3.` | lesson cell `ten-lines-that-run-every-test-1` |
| with `ProbeA`, one test does not pass and two still run | probe T1 (`Tests run: 3. Passed: 2.`) |
| a refuel of −50 kg: from 70 kg to 20 kg; the older test passes | lesson cell `a-test-before-the-fix-1-program` |
| after the fix, both pass | probe T2 |
| `0.7000000000000001` kg; the test does not pass | lesson cell `close-enough-1-program` |
| "the sixteenth place after the point" | the same output: 16 digits after the point |
| the check with `Math.Abs` passes | probe T3a |
| the `decimal` tank passes the first test as it is | probe T3b |
| D at step 8 with −35 kg, E at step 4 with 102 kg; A, B, C hold | lesson cell `a-stress-test-1` |
| fold: B breaks the burn rule at step 8; the other four hold it | probe T4 |
| fold: both rules find B, D and E; only a boundary test found A | probe T4, `a-stress-test-1`, solution of `five-suspects-3` |
| fold: from −20, all five break, between step 4 and step 29; A and C at 113 kg, B at −13 kg | probe T5a |
| fold: with C's `Refuel` fixed, C breaks at the same step, through `Burn` | probe T5b (step 29, 113 kg: above 100, which only a burn can do) |
| a reader's fix of C does not change `a-stress-test-1` | probe T5c |
| game: the refusal, then `Tests run: 5. Passed: 5.` | solution of `your-class-6-tests--game` |
| game: before the change, −45, and not down | probe T6 (`Ada: -45, down: False`) |
| solar system: the refusal, then `Tests run: 5. Passed: 5.` | solution of `your-class-6-tests--solar-system` |
| solar system: before the change, 70 kg to 120 kg | probe T7 (in `t6-t7-open-doors`) |
| the starting world cells pass their one test | lesson cells `your-class-6-tests--<world>` |
| the challenge's starter runs; a `CanBurn` test finds only D | probe T8 (`t8-challenge-starter`, `t8-challenge-answer`) |
| B and D did not pass the same check | solution of `five-suspects-3` |
| practice 1: 10, 0 and 11; `<=` refuses 0; no `Math.Max` leaves −1; down at 10 | probe P1 |
| practice 2: `sums: expected 3, found 2`, `Tests run: 2. Passed: 1.`, CS8321 and its text | practice cell `which-tests-run-1` |
| practice 3: a count of 2; the refusal, then the test passes | practice cell `twice-in-the-hall-tests` and its solution |
| practice 4: `0.30000000000000004` | practice cell `a-test-that-is-wrong-1` |
| practice 4: both fixes pass | probe P2 |
| practice 5: MSTest makes a new object for each test method | Microsoft Learn, *MSTest test lifecycle* |
| practice 6: `2` | practice cell `from-earlier-the-same-object-1-program` |
| practice 7: all three tests pass | probe P3 |
| practice 8: the message, and the other tests still run | probe P4 |

No compiler message's line or column is quoted in the prose.

## Probes

Run with the NativeCheck command, passing this file. Types carry down under
the rules of the road, and a class written again replaces the earlier one
for the cells below (rule 4). So the probes run in an order that keeps each
one's classes as its claim needs them: the probes that need the suspects
as the lesson has them first, then the `FuelTank` versions, the chain's
classes and the practice classes, then the fixed `ProbeC` (T2), with the
two stress tests that must run below it (T5b, T5c). T9 and T10 come last,
and the last cell of all (T10's generic version) is meant not to compile.

### Types for the probes

```csharp exec
id: probe-types
interface IProbe
{
    string Name { get; }
    int Fuel { get; }
    bool CanBurn(int kg);
    void Burn(int kg);
    void Refuel(int kg);
}

class ProbeA : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }
    public ProbeA(string name, int fuel) { Name = name; Fuel = fuel; }
    public bool CanBurn(int kg) { return kg < Fuel; }
    public void Burn(int kg) { if (!CanBurn(kg)) { return; } Fuel = Fuel - kg; }
    public void Refuel(int kg) { Fuel = Math.Min(100, Fuel + kg); }
}

class ProbeB : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }
    public ProbeB(string name, int fuel) { Name = name; Fuel = fuel; }
    public bool CanBurn(int kg) { return kg <= Fuel; }
    public void Burn(int kg) { Fuel = Math.Max(0, Fuel - kg); }
    public void Refuel(int kg) { Fuel = Math.Min(100, Fuel + kg); }
}

class ProbeC : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }
    public ProbeC(string name, int fuel) { Name = name; Fuel = fuel; }
    public bool CanBurn(int kg) { return kg <= Fuel; }
    public void Burn(int kg) { if (!CanBurn(kg)) { return; } Fuel = Fuel - kg; }
    public void Refuel(int kg) { Fuel = Math.Min(100, Fuel + kg); }
}

class ProbeD : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }
    public ProbeD(string name, int fuel) { Name = name; Fuel = fuel; }
    public bool CanBurn(int kg) { return kg <= 100; }
    public void Burn(int kg) { if (!CanBurn(kg)) { return; } Fuel = Fuel - kg; }
    public void Refuel(int kg) { Fuel = Math.Min(100, Fuel + kg); }
}

class ProbeE : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }
    public ProbeE(string name, int fuel) { Name = name; Fuel = fuel; }
    public bool CanBurn(int kg) { return kg <= Fuel; }
    public void Burn(int kg) { if (!CanBurn(kg)) { return; } Fuel = Fuel - kg; }
    public void Refuel(int kg) { Fuel = Fuel + kg; }
}

static class Suspects
{
    public static List<IProbe> All()
    {
        return new List<IProbe>
        {
            new ProbeA("Probe A", 100),
            new ProbeB("Probe B", 100),
            new ProbeC("Probe C", 100),
            new ProbeD("Probe D", 100),
            new ProbeE("Probe E", 100)
        };
    }
}

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

### T1. Many small tests, with `ProbeA` in place of `ProbeC`

```csharp exec
id: t1-three-tests-on-probe-a
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    ABurnOfAllTheFuelIsAllowed,
    ARefuelStopsAtAFullTank
});

void ABurnUsesFuel()
{
    var probe = new ProbeA("Probe C", 100);
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
}

void ABurnOfAllTheFuelIsAllowed()
{
    var probe = new ProbeA("Probe C", 100);
    probe.Burn(100);
    Test.Check("a burn of all 100 kg is allowed", 0, probe.Fuel);
}

void ARefuelStopsAtAFullTank()
{
    var probe = new ProbeA("Probe C", 60);
    probe.Refuel(50);
    Test.Check("a refuel stops at a full tank", 100, probe.Fuel);
}
```

### T4. The stress test's fold: a rule that B breaks

The lesson cell `a-stress-test-1`, with the fold's burn rule added to the
burn step, and the range rule kept.

```csharp exec
id: t4-a-rule-that-b-breaks
foreach (IProbe probe in Suspects.All())
{
    Console.WriteLine($"{probe.Name}: {StressTest(probe)}");
}

string StressTest(IProbe probe)
{
    var random = new Random(42);
    for (int step = 1; step <= 100000; step++)
    {
        int kg = random.Next(0, 121);
        if (random.Next(2) == 0)
        {
            int before = probe.Fuel;
            probe.Burn(kg);
            if (probe.Fuel != before && probe.Fuel != before - kg)
            {
                return $"the burn rule broke at step {step}";
            }
        }
        else
        {
            probe.Refuel(kg);
        }
    }
    return "the burn rule held for all 100,000 steps";
}
```

### T5a. The stress test with random numbers from −20 to 120

```csharp exec
id: t5a-negative-numbers
foreach (IProbe probe in Suspects.All())
{
    Console.WriteLine($"{probe.Name}: {StressTest(probe)}");
}

string StressTest(IProbe probe)
{
    var random = new Random(42);
    for (int step = 1; step <= 100000; step++)
    {
        int kg = random.Next(-20, 121);
        if (random.Next(2) == 0)
        {
            probe.Burn(kg);
        }
        else
        {
            probe.Refuel(kg);
        }
        if (probe.Fuel < 0 || probe.Fuel > 100)
        {
            return $"the rule broke at step {step}, with {probe.Fuel} kg";
        }
    }
    return "the rule held for all 100,000 steps";
}
```

### T8. The challenge: its starter runs, and a `CanBurn` check finds only D

The challenge's starter as written (with `TestOnlyD` empty), then one
answer, then a test that only B does not pass. The starter needs the
suspects and `Test` above it, which is what its first comment asks for.

```csharp exec
id: t8-challenge-starter
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestOnlyD(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestOnlyD(IProbe probe)
{
    // One test here
}
```

```csharp exec
id: t8-challenge-answer
foreach (IProbe probe in Suspects.All())
{
    try
    {
        TestOnlyD(probe);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}

void TestOnlyD(IProbe probe)
{
    probe.Burn(50);
    Test.Check("a probe with 50 kg cannot burn 60 kg", false, probe.CanBurn(60));
}
```

```csharp exec
id: t8-only-b
foreach (IProbe probe in Suspects.All())
{
    try
    {
        probe.Burn(150);
        Test.Check("a burn of 150 kg from a full tank changes nothing", 100, probe.Fuel);
        Console.WriteLine($"{probe.Name}: every check held");
    }
    catch (Exception exception)
    {
        Console.WriteLine($"{probe.Name}: {exception.Message}");
    }
}
```

### T3. Close enough: the check with `Math.Abs`, and the `decimal` tank

```csharp exec
id: t3-fuel-tank-double
class FuelTank
{
    public double Kilograms { get; private set; }

    public FuelTank(double kilograms)
    {
        Kilograms = kilograms;
    }

    public void Use(double amount)
    {
        Kilograms = Kilograms - amount;
    }

    public bool IsEmpty()
    {
        return Kilograms == 0;
    }
}
```

```csharp exec
id: t3a-close-enough
Test.RunAll(new List<Action> { ThreeUsesLeaveSevenTenths });

void ThreeUsesLeaveSevenTenths()
{
    var spare = new FuelTank(1.0);
    spare.Use(0.1);
    spare.Use(0.1);
    spare.Use(0.1);
    Test.Check("three uses of 0.1 kg leave 0.7 kg, to within 0.001 kg", true, Math.Abs(spare.Kilograms - 0.7) < 0.001);
}
```

The third version of the spare tank, as on *Encapsulation*
(`what-a-caller-needs-to-know-5` in that draft). It replaces the tank above
(rule 4).

```csharp exec
id: t3-fuel-tank-decimal
class FuelTank
{
    private decimal _kilograms;

    public FuelTank(double kilograms)
    {
        _kilograms = (decimal)kilograms;
    }

    public double Kilograms
    {
        get
        {
            return (double)_kilograms;
        }
    }

    public void Use(double amount)
    {
        _kilograms = _kilograms - (decimal)amount;
    }

    public bool IsEmpty()
    {
        return _kilograms == 0;
    }
}
```

```csharp exec
id: t3b-decimal-tank-first-test
Test.RunAll(new List<Action> { ThreeUsesLeaveSevenTenths });

void ThreeUsesLeaveSevenTenths()
{
    var spare = new FuelTank(1.0);
    spare.Use(0.1);
    spare.Use(0.1);
    spare.Use(0.1);
    Test.Check("three uses of 0.1 kg leave 0.7 kg", 0.7, spare.Kilograms);
}
```

### T6 and T7. The open doors, before each world's fix

The fourth versions of `Character` and `Probe`, as in the lesson's world
cells, and the test the reader writes first.

```csharp exec
id: t6-character-fourth-version
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
```

```csharp exec
id: t6-t7-open-doors
Test.RunAll(new List<Action>
{
    AHealOfANegativeAmountChangesNothing,
    ANegativeBurnChangesNothing
});
var ada = new Character("Ada", 5);
ada.Heal(-50);
Console.WriteLine($"Ada: {ada.Health}, down: {ada.IsDown()}");

void AHealOfANegativeAmountChangesNothing()
{
    var ada = new Character("Ada", 5);
    ada.Heal(-50);
    Test.Check("a heal of -50 changes nothing", 5, ada.Health);
}

void ANegativeBurnChangesNothing()
{
    var voyager = new Probe("Voyager", 70);
    voyager.Burn(-50);
    Test.Check("a burn of -50 kg changes nothing", 70, voyager.Fuel);
}
```

### P1. Practice 1: the boundaries of `TakeDamage`

Two versions with a slip each: one whose check is written `amount <= 0`,
and one without `Math.Max`. Each hit is on a new character with 10 health.

```csharp exec
id: p1-slips-at-the-boundaries
file: Slips.cs
class RefusesZero : Character
{
    public RefusesZero(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        if (amount <= 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }
}

class NoFloor : Character
{
    public NoFloor(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Health - amount;
    }
}
```

```csharp exec
id: p1-hits
foreach (int hit in new int[] { 0, 3, 5, 10, 11 })
{
    var kept = new Character("Ada", 10);
    var refusesZero = new RefusesZero("Ada", 10);
    var noFloor = new NoFloor("Ada", 10);
    kept.TakeDamage(hit);
    refusesZero.TakeDamage(hit);
    noFloor.TakeDamage(hit);
    Console.WriteLine($"hit {hit}: {kept.Health} (down: {kept.IsDown()}), refuses zero: {refusesZero.Health}, no floor: {noFloor.Health}");
}
```

### P3. Practice 7: the knight

```csharp exec
id: p3-knight
file: Knight.cs
class Knight : Character
{
    public Knight(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(Math.Max(0, amount - 2));
    }
}
```

```csharp exec
id: p3-knight-tests
Test.RunAll(new List<Action> { AHitOf5, AHitOfMinus3, AHitOf20 });

void AHitOf5()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(5);
    Test.Check("a hit of 5 leaves 7", 7, knight.Health);
}

void AHitOfMinus3()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(-3);
    Test.Check("a hit of -3 leaves 10", 10, knight.Health);
}

void AHitOf20()
{
    var knight = new Knight("Lancelot", 10);
    knight.TakeDamage(20);
    Test.Check("a hit of 20 leaves 0", 0, knight.Health);
}
```

### P4. Practice 8: a skeleton's method under `RunAll`

```csharp exec
id: p4-skeleton
file: Rover.cs
class Rover
{
    public int Drive(int metres)
    {
        throw new NotImplementedException();
    }
}
```

```csharp exec
id: p4-skeleton-test
Test.RunAll(new List<Action> { ADriveOf10Metres, AnotherTest });

void ADriveOf10Metres()
{
    var rover = new Rover();
    Test.Check("a drive of 10 m returns 10", 10, rover.Drive(10));
}

void AnotherTest()
{
    Test.Check("one and one", 2, 1 + 1);
}
```

### P2. Practice 4: the two ways to fix the test of three tenths

```csharp exec
id: p2-three-tenths-fixed
Test.RunAll(new List<Action> { CloseEnough, WithDecimal });

void CloseEnough()
{
    Test.Check("three tenths, to within 0.001", true, Math.Abs(0.1 * 3 - 0.3) < 0.001);
}

void WithDecimal()
{
    Test.Check("three tenths", 0.3m, 0.1m * 3);
}
```

### T2. A test before the fix, after the fix

`ProbeC` written again with the lesson's fix in `Refuel`. It replaces the
suspect above (rule 4), as the reader's edit of `a-test-before-the-fix-1`
does on the lesson.

```csharp exec
id: t2-probe-c-fixed
file: ProbeC.cs
class ProbeC : IProbe
{
    public string Name { get; private set; }
    public int Fuel { get; private set; }

    public ProbeC(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public bool CanBurn(int kg)
    {
        return kg <= Fuel;
    }

    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            return;
        }
        Fuel = Fuel - kg;
    }

    public void Refuel(int kg)
    {
        if (kg < 0)
        {
            return;    // a refuel never takes fuel away
        }
        Fuel = Math.Min(100, Fuel + kg);
    }
}
```

```csharp exec
id: t2-after-the-fix
Test.RunAll(new List<Action>
{
    ABurnUsesFuel,
    ANegativeRefuelChangesNothing
});

void ABurnUsesFuel()
{
    var probe = new ProbeC("Probe C", 100);
    probe.Burn(30);
    Test.Check("a burn of 30 kg from a full tank leaves 70 kg", 70, probe.Fuel);
}

void ANegativeRefuelChangesNothing()
{
    var probe = new ProbeC("Probe C", 70);
    probe.Refuel(-50);
    Test.Check("a refuel of -50 kg changes nothing", 70, probe.Fuel);
}
```

### T5b. Negative numbers, with Probe C's `Refuel` fixed

The same program as T5a, below the fixed `ProbeC`.

```csharp exec
id: t5b-negative-numbers-after-the-fix
foreach (IProbe probe in Suspects.All())
{
    Console.WriteLine($"{probe.Name}: {StressTest(probe)}");
}

string StressTest(IProbe probe)
{
    var random = new Random(42);
    for (int step = 1; step <= 100000; step++)
    {
        int kg = random.Next(-20, 121);
        if (random.Next(2) == 0)
        {
            probe.Burn(kg);
        }
        else
        {
            probe.Refuel(kg);
        }
        if (probe.Fuel < 0 || probe.Fuel > 100)
        {
            return $"the rule broke at step {step}, with {probe.Fuel} kg";
        }
    }
    return "the rule held for all 100,000 steps";
}
```

The lesson's own stress test (0 to 120 kg), below the fixed `ProbeC`: the
reader's fix above does not change what the lesson's cell prints.

```csharp exec
id: t5c-lesson-stress-test-after-the-fix
foreach (IProbe probe in Suspects.All())
{
    Console.WriteLine($"{probe.Name}: {StressTest(probe)}");
}

string StressTest(IProbe probe)
{
    var random = new Random(42);
    for (int step = 1; step <= 100000; step++)
    {
        int kg = random.Next(0, 121);
        if (random.Next(2) == 0)
        {
            probe.Burn(kg);
        }
        else
        {
            probe.Refuel(kg);
        }
        if (probe.Fuel < 0 || probe.Fuel > 100)
        {
            return $"the rule broke at step {step}, with {probe.Fuel} kg";
        }
    }
    return "the rule held for all 100,000 steps";
}
```

### T9. Why the solution checks 71 kg before 70 kg

After a burn of exactly all its fuel, B's tank is empty, and a burn of 1 kg
more leaves it at 0, as C's does. D goes below 0 at any burn bigger than
the fuel left, full tank or empty.

```csharp exec
id: t9-b-at-an-empty-tank
foreach (IProbe probe in Suspects.All())
{
    probe.Burn(100);
    probe.Burn(1);
    Console.WriteLine($"{probe.Name}: {probe.Fuel} kg after 100, then 1");
}
```

### T10. `Check<T>` with a `double` and a `decimal`, and an `object` version

An `object` version compiles, and says "expected 0.7, found 0.7". The
generic version does not compile (the probe after this one), because C#
cannot choose one type for `T`.

```csharp exec
id: t10-object-version
CheckObject("three uses leave 0.7 kg", 0.7, 1.0m - 0.1m - 0.1m - 0.1m);

void CheckObject(string claim, object expected, object found)
{
    if (!expected.Equals(found))
    {
        Console.WriteLine($"{claim}: expected {expected}, found {found}");
    }
}
```

This probe is meant not to compile, so it is the last cell in this file.

```csharp exec
id: t10-generic-version
expect: CS0411
Test.Check("three uses leave 0.7 kg", 0.7, 1.0m - 0.1m - 0.1m - 0.1m);
```
