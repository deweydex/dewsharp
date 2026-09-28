# Notes: keeping-details-inside-an-object

Ported from dewlab `tutorials/keeping-details-inside-an-object/` (the
tutorial, its practice page and its glossary, all version 2026.09.26.1) on
27 September 2026. Moved from `drafts/lessons/` into `lessons/` on 28
September 2026, after a review against `docs/TRANSLATING.md`, the style
guide, the course map and the two exemplars. The porter's notes are below,
brought up to date with the page as it now is. Where the review changed
something, it says *Review:*.

## How it was checked

- `npm run check-lessons -- keeping-details-inside-an-object
  keeping-details-inside-an-object-practice`, in the browser engine: 36 runs
  on the page and 19 on the practice page, no problems. The recorded
  outputs are `lessons/keeping-details-inside-an-object/*.outputs.json`,
  version 2026.09.28.1. No cell shows a warning except practice problem 9,
  which is meant to (below).
- Every number and every quoted message in the prose, the folds and the
  solution notes is in those files (table at the end).
- The draft's native probes were run again in the browser engine, in a
  scratch lesson, for the claims no cell can hold: the challenge as given
  prints `1.3877787807814457E-16 False`, and `0 True` with whole hit
  points or with `decimal`; `juno.Fuel = 600;` on the property probe is
  CS0272; `(decimal)0.1` prints `0.1` and equals `0.1m`; a caller of
  `spare._grams` on a tank without it is CS1061. All agree with the native
  run.
- *Review:* one place where the browser differs from what the draft wrote.
  The `double` left after taking 0.1 from 1.0 ten times, printed with
  `ToString("F20")`, is `0.00000000000000013878` in the browser (rounded
  at the 20th place), where the draft's prose wrote
  `0.00000000000000013877…`. No cell prints
  either, so the prose no longer writes the number out. It says that
  `E-16` moves the decimal point 16 places to the left.
- The page was served (`npm run serve -- --isolate`) and driven in
  Chromium: each world, the CS0122 and CS0272 messages, the exception
  report of practice problem 9 (`at line 13 of Lander.cs (in
  Lander.Board(string))`), and practice problem 10, which now shows only
  CS0161. No page errors.
- The three Microsoft Learn links returned HTTP 200 on 28 September 2026.
  The floating-point page says that a `decimal` represents 0.1 exactly and
  a `double` does not. The properties page calls an automatic property an
  *automatically implemented property*, so the lesson now gives that name
  too.

## What changed from the Python page, and why

**The world.** dewlab taught the page in the ocean: a submarine whose hull
is safe to 400 m. The course map (and `DECISIONS.md` 13) retells it in the
solar system: Juno, a probe that refuses a burn bigger than its fuel.
`dive`/`rise` became `Burn`/`Refuel`, the spare oxygen tank became a spare
fuel tank (litres and millilitres became kilograms and grams), and the
practice page's submarine became a lander and a station. The ocean world
variant is gone.

**Cells follow the rules of the road.** Each Python cell became a types
cell (with `file:`) and a program cell below it. *Review:* the program cell
is now `<id>-program` and holds the inputs, the hint and the solution
(`DECISIONS.md` 26); the draft numbered the program cells on (`-2`, `-3`
and so on). The draft's `keeping-details-to-itself-3`, the Refuel task, is
now `keeping-details-to-itself-2`, a types cell with `Refuel` and no
check, and `-2-program`, as dewlab's `-2` was the rise task and the
exemplars give a task its own class cell. The opening class has only
`Burn`, as dewlab's had only `dive`. Rule references are in italics, as on
the other FOOP pages.

**"Reaching in from outside" became "Changing a field from outside", and
the compiler refuses.** The course map's central change. The section now
runs:

1. `reaching-in-from-outside-1`: with the public `Fuel`, the program
   changes the field directly and prints `-50`. This is dewlab's own
   experiment, and in C# it gives the same result, because the field is
   public.
2. `public` and `private` are named as *access modifiers*; `protected` is
   mentioned and left for inheritance. A member with no modifier is
   private.
3. `-2` (types): the fuel as `private int _fuel`, with a getter,
   `GetFuel()`. `-2-program`: a program that uses only the methods: `40`
   (dewlab's `-2` program). *Review:* moved above the cell meant to fail,
   so that the ids follow the page.
4. `-3`: the same change from outside, `expect: CS0122`. The message comes
   twice (line 3 uses `_fuel` twice), and the prose says so.
5. `-4` (types): `public int Fuel { get; private set; }`, C#'s own way,
   with the line read in three parts, and *automatic property* named.
   `-4-program`: the same program with `juno.Fuel`: `40`. The reader is
   invited to add `juno.Fuel = 600;` and read the compiler's answer
   (CS0272, run in the scratch lesson). The message is quoted on the
   practice page, problem 1, not here.

The heading changed because "reaching in" is a phrasal verb. The cell ids
keep dewlab's `reaching-in-from-outside-` so that a teacher can compare
the two pages.

**The underscore.** Python's underscore convention becomes C#'s naming
convention for a private field (`_fuel`), as the course map asks. The page
separates the two things: `private` is the lock the compiler checks, and
the underscore is a sign for people. Practice problem 4 makes the point
with a public field named `_checks`. The two-underscore paragraph
(Python's name mangling) is gone.

**Your turn, the class chain's second version.** Each world has a class
cell (`your-class-2--<world>`, with `file:`) and a program cell
(`your-class-2-program--<world>`). The change asked for is a rule in a
method, and the field made a property with a private `set`. In C# this is
two changes, not dewlab's three: `public int Health;` becomes
`public int Health { get; private set; }`, and every other line of the
class keeps working. dewlab's rename to `_health` on every line, and its
`get_health()`, have no counterpart. The hints use `after: 2 runs`,
because the starter runs without an error.

**What a caller needs to know.** The spare tank keeps dewlab's point:
ten uses of 0.1 leave `1.3877787807814457E-16`, and `False`. Then:

- The whole-units tank keeps grams in a private `int`, and its
  `Kilograms` property has a body in `get`. This is where the reader first
  sees a property with a body.
- dewlab's `question` block ("which caller's line stops working?") became
  the predict the course map asks for: "Which of the program's lines stops
  compiling?", on the program under the new class. The answer is none of
  them, and the run shows `0` and `True`.
- New, from the course map: a third tank with a private `decimal`, which
  prints `0` and `True` too. Its public methods still take and give
  `double`, so the program is the same for all three tanks.
- *Review:* `binary` is defined where it first appears ("with only the
  digits 0 and 1"), and a `decimal` keeps "the digits 0 to 9, as we write
  numbers on paper" in place of "in tens".

**Looking back and the challenge.** The question changes with the
language: in C# the compiler checks `private` and nothing checks the
underscore, so what is each for? The challenge keeps dewlab's health bar,
as statements followed by the class (decision 40), with "the six lines
above the class" in place of "any line below the class". It invites
either fix: whole hit points or `decimal`.

**Visual Studio.** *Review:* new. The page says that nothing on it needs
Visual Studio, that any program cell downloads as a project that prints
the same, and that Visual Studio's list after `juno` and a dot leaves out
a private field (the tools page's practice problem 4 asks where that list
comes from).

**The rest.**

- Titles are the course map's. The practice page is "Encapsulation:
  practice", like the exemplars'.
- The glossary terms (encapsulation, convention, private, getter, caller,
  abstraction) are defined in the prose where they first appear. So are
  *access modifier*, *property*, *automatic property*, *inaccessible*,
  *binary*, `decimal`, and on the practice page *accessor* and `value`.
- "Where to read more" cites Microsoft Learn (access modifiers,
  properties, floating-point types).
- *Review:* wording. "at once" became "immediately", "goes wrong in the
  same way" became "has the same problem", "a lot of freedom" became
  "freedom", "That is better than Python" (practice 6) went, and the code
  comment "straight to the field" became "to the field directly".

## The practice page, problem by problem

1. **A line that skips the rule** (dewlab "Around the rule"). The fuel is
   a property with a private `set`, and the line that changes it from
   outside does not compile: `expect: CS0272`, with a predict. The fold
   defines *accessor*, the word in the message.
2. **Room for four.** The submarine became a lander. `len()` became
   `_crew.Count`. The list is printed with `string.Join` inside a method,
   `CrewNames()`, so the private list is never handed to a caller.
3. **The heating.** Python's `set_temperature()` became a property whose
   `set` holds the check. dewlab's second question ("why call the method
   rather than write the field?") became: why does
   `heating.Temperature = 35;` compile, when `juno.Fuel = 600;` did not?
4. **Which are private?** dewlab's list of names became a class and a
   program with `expect: CS0122`, so the reader can test the answer. It
   adds two C# points: a field with no modifier is private, and a public
   field whose name starts with an underscore is still public.
5. **Enough for the trip.** Grams in place of millilitres; the same three
   results. *Review:* the fold said "0.999 kg is 999 g" and so on. No cell
   prints the grams, so the fold now says that `HasEnough` compares two
   whole numbers of grams, and which trip needs less, more or exactly what
   the tank holds.
6. **A change the callers never see.** In C# a caller of a private field
   would never have compiled, so the question asks about a field the
   writer made public (`public int _grams;`). The fold says that the line
   stops compiling (CS1061 in the scratch lesson).
7. **Two ideas, one class.** Unchanged in substance.
8. **From earlier: storing on the object** (dewlab problem 10). *Review:*
   the id `from-earlier-storing-on-self-1` named Python's `self`, and is
   now `from-earlier-storing-on-the-object-1` (decision 28). It prints
   `0`, with no warning.
9. **From earlier: a list that was never made** (new; replaces dewlab's
   "a rule that forgot self", which has no C# counterpart because a field
   is reached without `this`). The bug from the tools page: a private
   `List<string>` field that is never made, a `NullReferenceException` at
   line 13 of `Lander.cs`, and warning CS0649 before the run. *Review:* the
   warning travelled into problem 10's two cells, which decision 30 rules
   out, and problem 10's class, which does not compile, has to be last. So
   problem 9 now ends as the tools page's own section does: the class
   written again with the list made (`-2`, rule 4) and its program
   (`-2-program`), which prints `1` with no warning. The warning stops
   there.
10. **From earlier: printed, not returned** (dewlab problem 9). A
    `ToString()` that prints is CS0161 in C#. Both cells carry
    `expect: CS0161`, because the error is in the class cell and the
    program below it shows the same error. The class cell keeps dewlab's
    id, `from-earlier-printed-not-returned-2`, and the program is
    `-2-program`.

"From earlier" lines use each page's short title: *Inside a method*,
*Visual Studio*, *Classes and objects*.

## The porter's questions, and what was decided

**1. The class chain's first version was a guess.** Decided: it is not a
guess now. The starters `your-class-2--game` and `your-class-2--solar-system`
are byte for byte the classes in the solutions of `objects-and-classes`'
`your-class-1-program--game` and `--solar-system` (compared with the
parser). And the classes in this page's solutions are byte for byte the
starters of `one-class-many-methods`' `your-class-3--game` and
`--solar-system`, so the chain holds in both directions.

**2. The second version uses automatic properties.** Decided by the course
map's entry ("then `public int Fuel { get; private set; }` as C#'s own
way"), and `one-class-many-methods` already starts from them.

**3. Private field names: `_fuel`.** Decided for the lessons by the course
map ("the underscore convention becomes C#'s way of naming a private
field"). Whether the style guide's `#code` should say so is under "Open".

**4. `Name` stays a public field in version 2.** Decided for this page by
the course map's entry, which makes one field private ("the field it
protects"), and by the style guide's "one idea" habit. The game's solution
note asks the reader whether a name should be changeable.
`one-class-many-methods` keeps `Name` public in version 3.

**5. World order.** Not decided: see "Open".

**6. Links and batches.** Decided by decisions 32 and 39 and the move
instructions: links go to pages in `lessons/` or moved with this batch.
`objects-and-classes`, `the-moves-you-already-know`,
`the-tools-around-your-code` and `one-class-many-methods` are all in
`lessons/`.

**7. Link texts.** Decided: `the-tools-around-your-code` now names this
page by the course map's title in its "Next" line, and by its short title,
*Encapsulation*, in its practice page. This page uses the course map's
titles and short titles.

**8. `covers`.** Decided by the course map's entry: `[FOOP-LO3,
FOOP-LO4]`.

**9. Refusing with a message.** Decided for this page: every rule prints
"Refused: ..." and returns, as dewlab's page does (the playbook keeps
dewlab's shape unless C# changes it, and the course map's entry does not
ask for `throw`). Where FOOP first meets `throw` is under "Open".

**10. The `decimal` tank's `Kilograms` goes back to a `double`.** Decided:
no extra sentence. The page says what `(double)` does, and the only value
the program reads is 0, which is recorded.

**11. No predict before `which-are-private-1-program`.** Decided: the
practice page has four predicts, fewer than the exemplars' practice
pages have (six and seven), and the problem asks the reader to
decide for each line before the run.

The draft's "What should change once the page UI or the browser checker
exists":

1. **Compare with a solution on a program cell.** Decided by decision 26.
   The browser checker ran every solution against its inputs, in every
   world.
2. **Messages from cells above.** The page shows them, under the cell that
   ran, with the file they are in. Problem 9's warning no longer reaches
   problem 10 (above). Problem 10's fold says that the class cell and the
   program both show CS0161, which is what the page does.
3. **A reader's half-edited class.** Nothing to change on this page. A
   message from a class above names its file (`Probe.cs`,
   `Character.cs`), and a click on it goes to the line. Each types cell
   that writes `Probe` again replaces the one above it (rule 4), so a
   broken Refuel class stops only the two programs under it. A broken
   world class stops the tank programs of that world, which is the same
   on every page with worlds.
4. **Empty cells** (the your-own world) are recorded as `empty`, as in the
   exemplar.
5. **The challenge** is one block, statements first and the class last
   (decision 40). The checker compiles it alone.
6. **Cell length.** Decided by the exemplars: their classes are 20 to 25
   lines and their solutions about 30. The longest solution here is 36
   lines.
7. **Size.** See "Open".

## Found in the engine

Nothing. Every cell, solution and input ran in the browser as it did in
the native check, apart from the `F20` rounding above, which no cell or
prose uses now.

## Open

These are for Josh.

- **World order.** The shared cells teach with Juno (solar system), as the
  course map's entry says, but the frontmatter lists game first, like the
  course map, the exemplars and dewlab. The style guide says "a page
  teaches in its first world". The same question is open on
  `the-moves-you-already-know`.
- **Size.** A reader in one world sees 18 cells, where the course map says
  M (8 to 15). Splitting each Python cell into a class and a program, the
  getter step and the `decimal` tank make it longer. If it is too long,
  the `decimal` tank (`what-a-caller-needs-to-know-3` and `-3-program`)
  could move to the practice page, though the course map's entry asks for
  it here.
- **Where FOOP first meets `throw`.** Every rule on this page, and on
  `one-class-many-methods`, refuses by printing a message. Real C# code
  would usually `throw` an exception. The course map places `throw` in
  PDP (`building-reusable-tools`) and says nothing for FOOP.
- **`_camelCase` in the style guide.** `#code` names PascalCase and
  camelCase only. It could add "`_camelCase` for a private field", which
  this page teaches.
- **Two classes that each want to be last** (decision 30). A class meant
  to warn and a class that doesn't compile can't both be last. This page
  writes the warning class again with the fix (rule 4), as
  `the-tools-around-your-code` does. Decision 30 could say so.
- **The course file.** `courses/foop.yaml` still lists this lesson under
  `planned:`. The checklist says to delete that line when the lesson moves
  into `lessons/`; this move was not allowed to edit the course files.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| refusal, `70` | `keeping-details-to-itself-1-program` |
| `-50`; refusal and `100` | `keeping-details-to-itself-2-program` and its solution |
| refusal, `-50` | `reaching-in-from-outside-1` |
| refusal, `40` (twice) | `reaching-in-from-outside-2-program`, `-4-program` |
| CS0122 message, twice, line 3 | `reaching-in-from-outside-3` |
| `juno.Fuel = 600;` does not compile | scratch run (CS0272) |
| `Ada (health 15)`; refusal and `Ada (health 10)` | `your-class-2-program--game` and its solution |
| `Voyager (fuel 0 kg)`; refusal and `Voyager (fuel 70 kg)` | `your-class-2-program--solar-system` and its solution |
| `1.3877787807814457E-16`, `False`; 16 places | `what-a-caller-needs-to-know-1-program` |
| `0`, `True` (grams, then `decimal`) | `what-a-caller-needs-to-know-2-program`, `-3-program` |
| `(decimal)` makes the double 0.1 exactly 0.1 | scratch run (`0.1`, `True`) |
| challenge: not 0 as given; `0 True` with either fix | scratch run |
| practice 1: CS0272 message, line 3 | `around-the-rule-1-program` |
| practice 2: the refusal for Mary, four names | `room-for-four-1-program` and its solution |
| practice 3: refusal, `22` | `the-heating-1-program` |
| practice 4: CS0122 at lines 3 and 5 | `which-are-private-1-program` |
| practice 5: `True`, `False`, `True` | `enough-for-the-trip-1-program` |
| practice 6: `spare._grams` stops compiling | scratch run (CS1061) |
| practice 8: `0` | `from-earlier-storing-on-the-object-1-program` |
| practice 9: exception, line 13 of `Lander.cs`, CS0649 text; `1` | `from-earlier-a-list-that-was-never-made-1-program`, `-2-program` |
| practice 10: CS0161 message, line 10 of `Character.cs` | `from-earlier-printed-not-returned-2-program` |
