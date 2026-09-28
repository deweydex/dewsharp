# Notes: from-a-description-to-classes

Ported from dewlab `tutorials/from-a-description-to-classes/` (the
tutorial, its practice page and its glossary, all version 2026.09.26.1) on
27 September 2026, against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md`, and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 11, batch 3).
Moved from `drafts/lessons/` into `lessons/` on 28 September 2026, after a
run in the browser engine and a review against `docs/TRANSLATING.md`, the
style guide, the course map and the two exemplars. The porter's notes are
below, brought up to date with the page as it now is. Where the review
changed something, it says *Review:*.

Files, in `lessons/from-a-description-to-classes/`:

- `from-a-description-to-classes.md`: the tutorial, version
  2026.09.28.1. 15 `csharp exec` cells: 9 shared and 2 in each world. A
  reader in one world sees 11. 3 predicts, 2 hints, 2 solutions, 4 answer
  folds, 1 picture, 1 challenge.
  - Shared: `a-fixed-list-of-values-1` to `-5` (program, types, program,
    program, program), then `from-cards-to-skeletons-1-sample`, `-1-drive`
    and `-1-log` (types) and `from-cards-to-skeletons-1-program`.
  - In each world: `from-cards-to-skeletons-2--<world>` (a types cell for
    the reader's skeleton) and `from-cards-to-skeletons-2-program--<world>`
    (a program cell that makes one object of each class). Both start as a
    comment, so their kind is `empty` until the reader writes in them.
- `the-mission-in-boxes.svg`: the class diagram beside the cards.
- `from-a-description-to-classes-practice.md`: the practice page, version
  2026.09.28.1. 11 problems, 16 exec cells, 3 predicts, 3 hints, 3
  solutions (2 with `inputs`), 8 answer folds.
- `*.outputs.json`: what the browser checker recorded.

## How it was checked

- `npm run check-lessons -- from-a-description-to-classes`, in the
  browser engine: 12 runs on the page and 18 on the practice page, no
  problems. (Until `one-parent-many-children` reached `lessons/`, in the
  same batch, it reported the page's two links to it.) The recorded
  outputs are `lessons/from-a-description-to-classes/*.outputs.json`,
  version 2026.09.28.1. No cell shows a warning.
- Every number and every quoted message in the prose, the folds and the
  solution notes is in those files, except the four claims that no cell
  can hold (table at the end). Those were run in the browser engine, in a
  scratch lesson made of the probes below: all 13 probes agree with the
  native run.
- The page was served (`npm run serve -- --isolate`) and driven in
  Chromium: the enum's numbers (`0`, `1`, `2`), the CS0117 message
  (`Program.cs(1,67)`), the `Drive` cell's **Check**, the skeleton's
  exception report ("Stopped with an exception on line 15 of Drive.cs.",
  then `at line 15 of Drive.cs (in Drive.Collect(Sample))`), and practice
  problems 6 (`at line 23 of Rover.cs (in Rover.HasEngineer())`) and 7
  (the CS1061 message). No page errors, no sideways scrolling.
- The diagram was drawn in Chromium, in the light and the dark theme,
  as the page shows it (see "Found in the page").
- The two links in "Where to read more" returned HTTP 200 on 28 September
  2026.
- One sentence was not run: "When Visual Studio writes a new method for
  you, from a call to a method that does not exist yet, this is the line
  it puts inside." That is Visual Studio's *Generate method* quick action
  (see "Open").

## Found in the engine

Nothing. Every cell, solution, input and probe ran in the browser as it
did in the native check. No culture, trimming, stack-trace or `Console`
difference touches this page.

## Found in the page

**A picture drawn in `currentColor` is black in the dark theme.** dewlab
places an SVG inline, so `currentColor` follows the page's text colour.
dewsharp's Markdown renderer (`web/page/markdown.js`, the `image` rule)
writes an `<img>`, and an SVG inside an `<img>` can't see the page's
colour: its `currentColor` is black. On the dark theme, the draft's
diagram was black lines on a near-black background, and could not be
read (drawn in Chromium, `colorScheme: 'dark'`). *Review:* the SVG now has
a white card of its own behind the boxes, and fixed dark ink (`#1f2328`)
in place of `currentColor`, so it reads the same in both themes. This is
the first picture in `lessons/`, so no other page has met this. The page
itself is unchanged; see "Open".

## Review: what changed in the move

- **Cell ids follow decision 26.** dewlab's one cell
  `from-cards-to-skeletons-1` became three types cells and a program. The
  program cell is now `from-cards-to-skeletons-1-program`, and the types
  cells are `from-cards-to-skeletons-1-sample`, `-1-drive` and `-1-log`
  (they were `from-cards-to-skeletons-sample`, `-drive`, `-log`, with the
  program keeping dewlab's id). The reader's work is written in the
  `Drive` and `Log` cells, not the program, which is decision 26's reason
  for giving the dewlab id to the types cells. On the practice page, each
  program under a types cell is now `<id>-program`, as in the exemplar's
  practice page and its neighbours: `a-card-with-nothing-to-do-1-program`,
  `a-crew-with-an-engineer-2-program` (the reader writes in the `Rover`
  cell, `-2`), `a-skeleton-that-does-not-fit-1-program` (the reader writes
  in the `Route` cell, `-1`), `one-more-paragraph-1-program`, and
  `from-earlier-...-1-program` for problems 9 to 11. No class has used
  the page, so no saved work is lost.
- **The enum's numbers are printed by a cell** (decision 29). The draft's
  prose said `(int)Role.Engineer` is 2, from a native probe. A new cell,
  `a-fixed-list-of-values-4`, prints `(int)` of each role, and the prose
  quotes its `0`, `1` and `2`. It also shows a type conversion, which
  FOOP-LO1 names beside enums. The CS0117 cell moved from `-4` to `-5`, so
  the ids stay in page order. A reader sees 11 cells, inside the course
  map's M.
- **Numbers that no cell prints are gone from the prose.** `Role.Pilot`'s
  message is now a question for the reader ("What does the compiler say
  about `Role.Pilot`?"). Practice problem 9's fold no longer says the copy
  prints `2`, and problem 11's fold no longer says the balance goes from 6
  to 11, or quotes the CS0272 message; both now say what dewlab's folds
  said, with no number of their own.
- **The skeleton program says, before the run, that nothing is broken**
  (the checklist: the prose says a cell is meant to fail before the reader
  runs it). The sentence is "The classes are only a skeleton, so whatever
  the program does, nothing is broken", so that the predict still asks
  where it stops, and whether it compiles at all. Practice problem 6 now
  says its program "is meant to stop with `NotImplementedException`"
  before the run.
- **A line on Visual Studio**, before "Next": nothing on the page needs
  it; the cards and the diagram need only paper; a downloaded program
  brings each types cell above it as a file of its own, such as
  `Drive.cs` (`web/page/project.js` does that).
- **"Next" links to Inheritance** (`one-parent-many-children`), which
  moves in this batch, and names the mixed set by its short title,
  *Mixed problems* (decision 32). The game solution's note links to the
  same page.
- **Verdicts and plain words.** "One good answer" at the top of three
  solution notes became "This answer has…" or "This is one answer";
  "another good answer" and "one good home" in the practice folds became
  "another answer" and "one home for it"; "Each one is a good answer. They
  trade the same things in different amounts" became "Each one can work,
  and each one has a gain and a cost". The heading "More than one good
  answer" is dewlab's, and stays. "One noun is still left" became "One noun
  has not been sorted yet". "Takes away −5" became "subtracts −5". The game
  solution's `PickUp`, a phrasal verb, became `Carry`, the description's
  own verb.
- **The Visual Studio sentence** on `NotImplementedException` says what
  Visual Studio does ("from a call to a method that does not exist yet")
  in place of "when it makes a new method for you".
- **"From" lines** use short titles: problem 11 is now
  "From [Encapsulation](lesson:keeping-details-inside-an-object)".
- **The your-own world** now says to copy the class from
  `one-class-many-methods` into the first cell, as that page says of the
  page before it.
- Problem 6's solution note says what each line of the table shows: the
  program prints `True`, `dune.HasEngineer()` is `true`, and a rover with
  no crew gives `false`.

## The porter's second pass

What the porter's second run (27 September 2026) changed, and why:

- **Plainer words** (`#voice`). "Would you make into a class" became
  "would you write as a class" (in both pages). "It goes in a types
  cell" became "It is written in a types cell", and "the answer goes in
  `Drive`" became "is written in". "Every sample passes through that one
  method" became "every sample is added by that one method", and "every
  loan passes through it" became "every loan is made by calling it".
  "The slip" became "the same mistake". "The names are the point" became
  "it uses the names". The practice page's opening, "turning a
  description into classes", became "making classes from a description".
  "At once" (twice: the library's "five at once", and problem 6's hint)
  became "at the same time" and "without looking at the rest".
- **Terms defined where they first appear.** *Verbs* is now glossed as
  "the words for actions", as *nouns* already was. `pass` is glossed as
  "a line that does nothing", for a reader who never used Python.
  `(int)Role.Engineer` is glossed as "the value converted to an `int`"
  (casts are taught on `types-and-their-sizes`, which a FOOP reader meets
  in "Starting in C#").
- **The `Log` skeleton names every method on its card.** The card says a
  log "counts the samples with ice", but the skeleton cell and the class
  diagram had only `Add` and `Longest`; dewlab's page had the same gap
  (its `Logbook` skeleton had no `living_specimens` until the
  challenge). `from-cards-to-skeletons-1-log` now has `SamplesWithIce()`,
  with the comment `// on every drive`, and the diagram's `Log` box and
  its two descriptions (the `<desc>` and the Markdown alt text) list it.
  The challenge's copy of `Log` gained the same comment, so it is an exact
  copy of the three cells. The skeleton program does not call the new
  method, so its output and the line the prose quotes (line 15 of
  `Drive.cs`) are unchanged. The diagram was drawn again in headless
  Chromium, in light and dark: the new line fits inside the box.
- **Practice problem 7 says its cell is meant to fail.** The page's
  opening says some cells do, but the style guide asks the prose at the
  cell to say so. It now reads "The program below it is meant not to
  compile. Run it, and read the message." Its solution note no longer
  compares with Python ("even earlier"); it says the compiler shows the
  gap before anything runs.
- **Practice problem 8 has a hint**, a question, like the tutorial's world
  tasks: which noun does something now, and which class can answer "is
  there enough for this trip?"

## What changed from the Python page, and why

**Frontmatter.** `year:` is gone. The worlds are game, solar-system and
your-own, with the wording of the pages before; ocean is dropped. dewlab's
`covers:` was per section (FOOP-LO7 for each, touching FOOP-LO6); the
course map gives `[FOOP-LO7, FOOP-LO1, FOOP-LO6]`, which is what the page
has. FOOP-LO1 (data types) is the enum. The title is the course map's.

**The description.** The course map retells dewlab's ocean expedition as
a solar-system mission. Each part of the paragraph kept its job:

| dewlab (ocean) | dewsharp (solar system) |
|---|---|
| the Deep Blue expedition | the Red Plains mission to Mars |
| two submarines, the Nautilus and the Alvin | two rovers, the Dune and the Crater (made-up names: real Mars rovers had no crew) |
| dives and rises; none deeper than its hull allows | drives; neither climbs a slope steeper than its wheels allow |
| a crew of up to three; pilot, scientist or engineer | a crew of up to three; commander, geologist or engineer (the map's `Role`) |
| specimens: name, depth found at, alive or not | rock samples: name, depth dug from, holds ice or not |
| a logbook of every dive | a log of every drive |
| the leader: the deepest dive, the living specimens | mission control: the longest drive, the samples that held ice |

The word *expedition* became *mission*, so design C's class is
`Mission`. I avoided `Base`, since `base` is a keyword that the
inheritance page uses. dewlab's `Logbook.record()` became `Log.Add()`:
this page also teaches the `record` keyword, and a method called `Record`
beside it would confuse. The rover's verb "drives" is not a method called
`Drive`, because a class of that name exists (the noun). The cards give
the rover `Climb` and `Board`.

**Reading a description.** The nouns, the three questions and the verbs
stay. The rule about the hull became the rule about the slope, and the
link says the rule "belonged to the probe on Encapsulation", because the
dewsharp encapsulation page was retold with a probe's fuel. The leader,
as the program's front end, became mission control, "the team that uses
the program"; I left out the term *front end*, which this page does not
need. dewlab's fill-in-the-blank `question` block has no dewsharp twin,
so it became a list of four questions and an answer fold, as the earlier
drafts did.

**New section: "A fixed list of values".** The course map makes the
crew's role the first `enum`. The section runs first and names after:
- `-1`: roles as strings, with one typed `"geologist"`, and a loop that
  counts `"Geologist"`. A number predict. It prints `Geologists: 1`.
- `-2`: `enum Role { Commander, Geologist, Engineer }` in a types cell
  (`file: Role.cs`), written with each brace on its own line. The prose
  says rule 2 covers an enum as it covers a class (`CLAUDE.md`'s rule 2
  says so).
- `-3`: the same count with `List<Role>`. A choice predict on printing
  `roles[0]`: `Commander`, `Role.Commander` (what Python's `enum` prints),
  or `0`. It prints `Geologists: 2`, then `Commander`.
- `-4` (*Review:* new): `(int)` in front of each role prints `0`, `1` and
  `2`. The draft had this as a bracketed sentence, from probe P1.
- `-5` (`expect: CS0117`; the draft's `-4`): the typing slip again, as
  `Role.geologist`. The prose quotes the message, and asks the reader
  what the compiler says about `Role.Pilot` (probe P2).
- *Enum* and *enumeration* are defined in the prose.

**A card for each class.** The CRC card, *responsibilities* and
*collaborators* stay, and the table is retold. `CrewMember` works with
`Role`, and a sentence says why `Role` has no card. New: a *class
diagram* (`the-mission-in-boxes.svg`), which the course map asks for,
with the term defined and the alt text describing every box and line.
"Cards are cheap: you can move them about, tear one up..." lost its
phrasal verbs.

dewlab's "would a dictionary do the same job?" does not carry over: C#
has no dictionary of mixed values, and a C# programmer does not write
`{"name": "Ada", "role": "pilot"}`. The nearest C# idea is a *record*,
which the course map's `objects-and-classes` challenge meets and
`objects-inside-objects` uses ("C# leans to a class, or a `record`").
So the paragraph asks whether a type that only knows things needs a whole
class, and shows `record CrewMember(string Name, Role Role);` as code to
read, with one sentence on `Role Role` (probe P1 runs it). The page's
point stays: a class is useful when it has a rule to keep or a question
to answer.

**More than one good answer.** Design B's dictionaries became records.
Design C keeps its shape, with `Mission`. The multiple-choice `question`
("a dead specimen is never brought up") became "a sample from less than
10 cm deep is never kept", as a question in prose and an answer fold.
dewlab marked the first design as the answer. The fold keeps it as the
first answer, and adds that design B can keep the rule in the same place
if its `Drive` has a `Collect`, because in dewlab's design B the `Dive`
class still exists and the question's premise does not rule that out.

**From cards to skeletons.** The course map's change: C# has no `pass`,
and a method that returns a value cannot have an empty body, so each
skeleton method is `throw new NotImplementedException();`. *Throw*,
`NotImplementedException` and *implemented* are defined. The one Python
cell became three types cells (`Sample.cs`, `Drive.cs`, `Log.cs`, one
class each, as the map asks) and a program cell
(`from-cards-to-skeletons-1-sample`, `-1-drive`, `-1-log` and
`-1-program`, since the review).
- dewlab's predict ("None", "340", "An error") became four options,
  named as the style guide names the three outcomes: it prints 340, it
  prints 0, it does not compile, it stops with an exception. It stops at
  `Collect`, the first call. The prose says two things happened: the
  compiler checked that the cards fit (the C# version of "every call found
  its method"), and then the run stopped at the first method with no body.
  *Review:* before the run, it says that nothing is broken, whatever the
  program does; after it, that stopping is what a skeleton is meant to
  do.
- New, a "completed" step: write `Collect`'s body, and see the program
  stop one method later, at `Add` (probe P3). The fold gives the answer.
- New, an invitation with a fold: delete the `throw` from `Longest` and
  check the cell: CS0161 (probe P13, run again in the browser engine).
  The fold adds that a `void` method
  can have an empty body (probe P4), and why a throw is still better in a
  skeleton.
- dewlab's `Logbook.deepest()` returned a depth; `Log.Longest()` returns
  an `int` distance, with a comment, since C# makes the skeleton say what
  each method returns.

**Your turn.** Each world has a types cell for the reader's skeleton and a
program cell that makes one object of each class (the course map: "a
program cell below builds objects"). The types cell keeps dewlab's id,
`from-cards-to-skeletons-2--<world>`.
- **Game:** the Cave of Echoes, unchanged. The solution is dewlab's four
  cards in C#, with `Treasure` as a record (the section's idea, used), and
  `Health` as a property with a private `set`, as in the reader's
  `Character`. A new sentence says the reader's `Character` could be the
  `Hero` card. *Review:* the forward reference to inheritance links to
  `one-parent-many-children`, which moves in the same batch, and the
  hero's `PickUp` is `Carry`.
- **Solar system:** dewlab's Outer Planets mission, unchanged. The main
  description is now a solar-system mission too, so the world gives the
  reader a second one, with probes, which is where the reader's `Probe`
  class lives. dewlab's `_orbiting = None` became a property,
  `Orbiting { get; private set; }`, which starts as `null` (probe P7);
  the note defines `null`. A new paragraph notes the return types the
  skeleton had to decide (`int`, `List<string>`).
- **Ocean:** dropped (two worlds). Its task, a paragraph about the crew
  and their oxygen, is practice problem 8, retold for the rovers, where it
  also uses the enum.
- **Your own:** as dewlab's, with one new question (is one of your nouns a
  fixed list, which could be an enum?), and a line saying where the
  reader's class is saved (`your-class-3--your-own` on
  `one-class-many-methods`). Two comment-only cells.
- Hints: one for game and one for solar system, on the types cell, each
  starting with a question. The your-own world has none, as in dewlab.

**Looking back and the challenge.** The question adds "an enum". "Change
your mind" became "decide differently". The challenge is dewlab's in C#,
as statements then classes in one block (the earlier drafts' pattern), and
"fill in" became "complete". It prints nothing solved; probe P5 runs it as
given (it stops at `Collect`) and P6 solved (`1200`, `2`). The prose
states no answer.

**Next.** dewlab's "Next" links to inheritance. *Review:* it links to
`one-parent-many-children` again, which moves into `lessons/` in the same
batch, and names the mixed set that comes first by its short title,
*Mixed problems* (decision 32).

**Where to read more.** Beck and Cunningham stays. *Think Python* became
Microsoft's enum reference.

**Glossary.** dewsharp has no glossary panel yet, so dewlab's glossary
terms are defined in the prose where they first appear:
*responsibility*, *collaborator*, *CRC card*, *skeleton*. dewlab's `pass`
entry became the `throw new NotImplementedException();` paragraph. New
terms: *enum*, *enumeration*, *class diagram*, *record*, *implemented*,
and `null` (in the solar-system note).

## The practice page, problem by problem

1. **Class or field?** The `question` block became a list and a fold. New
   in the fold: C# has `DateTime`, which can count the days between two
   dates (probe P10), so a due date can stay a field even with fines.
2. **Nouns on a bus.** Unchanged, except "to get on" became "to board".
3. **Whose rule is it?** The `question` block became a question in prose
   and a fold. "Already out" became "already on loan".
4. **A card with nothing to do.** dewlab's `Colour` class, which knew
   three values, became a record, run in two cells, with a choice predict:
   a class prints its name, a record prints `Colour { Red = 255, Green =
   128, Blue = 0 }`. The fold keeps dewlab's point (a rule or a question
   earns a class) and adds that a record can have methods too.
5. **One of a fixed list?** New, for the enum. Four nouns; the fold says
   which could be an enum and why, and names .NET's `DayOfWeek` (probe
   P10: `Sunday` is 0, `Saturday` 6, seven values).
6. **A crew with an engineer.** New: an enum and a record in one types
   cell, a `Rover` whose `HasEngineer()` is still a skeleton, and a
   program that stops with `NotImplementedException` until the reader
   writes it (`expect: exception`; *Review:* the prose now says so before
   the run). The solution loops over the crew and
   compares `member.Role == Role.Engineer`. It is the "completed" step
   for enums, and it uses a skeleton the way the tutorial describes.
7. **A skeleton that does not fit.** In Python the skeleton ran and then
   stopped with `AttributeError`; in C# it does not compile (CS1061), and
   the solution's note says that the compiler shows the gap before
   anything runs. `Route` and
   `Bus` are types cells; `Bus` has `public Route Route;`, the same
   type-and-name pattern the tutorial explains for `Role Role`.
8. **One more paragraph.** dewlab's ocean-world task (a crew member's
   oxygen), retold for the rovers. The starter types cell holds the `Role`
   enum; the solution brings its own copy of `Role`, so it works even if
   the reader changed the cell. "1 litre for every 10 m" became "every
   100 m", because a rover travels farther than a submarine dives.
9. **From earlier: two names for one list.** dewlab took it from *A
   polynomial class*, which is an explore page in dewsharp. The "From"
   line links to `objects-and-classes-practice` instead, whose problem 8,
   "From earlier: one list, two names", teaches it to a FOOP reader (see
   question 5). `count()` became `StopCount()`. It prints `3`. The fold
   names the copy, `new List<string>(stops)`, and, as dewlab's fold does,
   states no count for it (*Review:*; probe P8 gives `2`).
10. **From earlier: one fare for all.** From `one-class-many-methods`.
    dewlab's point was that `bus_46.fare = 1` quietly makes a new
    attribute; in C# that line is CS0176 (probe P12), and the page before
    already has that problem ("One star, renamed"). So this problem asks
    the other half: after `Bus.Fare = 3`, what do two buses charge? A
    `Cost(int passengers)` method reads the static field. It prints `6 6`.
    The fold mentions CS0176.
11. **From earlier: a rule with a gap.** From
    `keeping-details-inside-an-object`. dewlab's heading, "a rule with a
    way around it", is an idiom, and changed. The `Card` uses the
    property with a private `set` from that page. dewlab's first way
    round, `card._balance = -5`, is now a compiler error (CS0272, probe
    P11). The second, `card.Pay(-5)`, still works (probe P9: the balance
    goes from 6 to 11, which the fold no longer states). This one is now
    runnable, where dewlab's was code to read. The fold ends with a
    question: what one line would refuse a negative fare?

The classes are placed so that each problem uses the one it declares:
problem 9's `Route` replaces problem 7's, problem 10's `Bus` replaces
problem 7's (rule 4, said in problem 10's prose), and problem 8's `Role`
replaces problem 6's with the same values.

## What C# made different, in short

- **Enums.** Python's page had no need for one (a role was a string). C#
  gives the page FOOP-LO1's enum, and the compiler checks every value.
- **The skeleton is checked before it runs.** In Python a skeleton ran
  with `pass` and printed `None`. In C#, compiling it checks that every
  call has a method and every argument has the right type, and running it
  stops at the first method with no body.
- **No `pass`.** A method that returns a value cannot have an empty body
  (CS0161). `throw new NotImplementedException();` takes its place.
- **Every method says what it returns.** A skeleton makes the designer
  choose `int`, `bool`, `List<string>` or a class, before any of it is
  written.
- **No dictionary of mixed values.** Plain data becomes a record, which
  prints its own values.
- **A misfitting skeleton does not compile** (CS1061), where Python
  stopped at run time.
- **Private is checked.** Practice problem 11's first way round the rule
  is a compiler error; the second (a negative fare) is not.

## The porter's questions, and what was decided

**1. The page opens by reading, not running.** Not decided: see "Open".
The page keeps dewlab's order (a description to read, then the noun
hunt; the first cell is in the second section), as the playbook's step 1
and the course map's entry ("the noun hunt, the three questions and the
cards stay") ask. The style guide's "run first, then name" asks for the
opposite.

**2. Records.** Decided by the exemplar: `objects-and-classes` now meets
the record in its challenge ("a short way to write a class that mostly
holds values"), so a FOOP reader has seen one before this page. Design B
and the "nothing yet" paragraph keep their records.

**3. `Role Role`.** Decided by the style guide's `#code` ("C#'s own
naming"): .NET's own naming guidance allows a property to have the same
name as its type, and the description's word is *role*. The page says in
one sentence which word is the type and which is the name.

**4. Which types cell holds the reader's skeleton.** Decided: one types
cell in each world, as the exemplars' your-own tasks have. The course
map's "one class each" is about the page's own skeleton, whose classes
the page knows. The reader chooses how many classes to write, so the
page can't give each one a cell.

**5. "From earlier" for two names for one list.** Decided: the link to
`objects-and-classes-practice` stays. Its problem 8, "From earlier: one
list, two names", is where a FOOP reader has met the idea. The PDP page
that teaches it, `two-names-one-list`, is for PDP readers, and the
exemplar names it only in italics.

**6. Size.** Decided by the course map: a reader sees 11 cells, inside M
(8 to 15).

**7. World order.** Not decided: see "Open".

**8. Cell ids.** Decided by decision 26 (see "Review: what changed in the
move"). The program under the page's skeleton is
`from-cards-to-skeletons-1-program`, and the three types cells above it
are `from-cards-to-skeletons-1-sample`, `-1-drive` and `-1-log`. The world
cells were already in decision 26's shape.

**9. The class chain.** Decided by the course map ("FOOP's class chain",
and `one-parent-many-children`'s entry, which starts from the third
version): this page makes no new version of the reader's class. The
world solutions say that the reader's `Character` or `Probe` could be one
of the cards.

**10. The design question's answer.** Decided by the playbook's step 1:
the question is dewlab's, retold, and the fold keeps dewlab's answer
first. The fold's sentence on design B stays, since it is true of the
designs as the page describes them.

**11. Python asides.** Decided by the exemplar: `objects-and-classes` has
two short Python asides ("Python calls it `self`", "Python allows the
second slip"). This page has one sentence on `pass`, and one predict
option.

The draft's "What to revisit once the page UI or the browser checker
exists":

1. **Where an exception is reported.** Decided: the page says "Stopped
   with an exception on line 15 of Drive.cs.", and its report adds
   `at line 15 of Drive.cs (in Drive.Collect(Sample))`. The prose ("at
   line 15 of `Drive.cs`, the `throw` inside `Collect`") matches both.
2. **`expect: exception` with a predict before it.** Decided: the page
   shows nothing on an `expect:` cell before a run (only the parser and
   the checker read `expect:`), so the predict keeps its point. The
   prose before the run now says that nothing is broken, whatever the
   program does.
3. **Edits that leave a types cell not compiling.** Nothing to change.
   The prose tells the reader to write the `throw` again. A message from
   a class above names its file, and a click on it goes to the line.
4. **Empty cells.** Decided by decision 26 and the exemplar: the
   solutions sit on the program cells, and the checker runs them. Whether
   a design task's solution should be shown without the compare table is
   under "Open".
5. **Hints on a types cell.** Decided by the page: `web/page/lesson.js`
   counts a **Check** that does not compile as an error, so the default
   `after: 1 errors` works on a types cell. A reader whose skeleton
   compiles does not see the hint.
6. **The picture.** Fixed in the SVG (see "Found in the page"); the page's
   side is under "Open".
7. **The challenge** is one block, statements first and the classes last
   (decision 40). The checker compiles it alone: it compiles.
8. **Cell length.** Decided by the exemplars for the cells: each shared
   type is one cell, of 6 to 22 lines. The world solutions (71 and 73
   lines) and practice problem 8's (55) hold a whole design each, as
   dewlab's solutions did; they are read, not typed.

## Open

These are for Josh.

- **The page opens by reading, not by running** (question 1). The style
  guide's first checklist question ("Does it open by running something
  and asking about it?") says no for this page. The first enum cell could
  move to the top, at the cost of the noun hunt coming second. A design
  page may be the style guide's exception.
- **World order** (question 7). The shared cells teach in the solar
  system (the Mars mission), but the frontmatter lists game first, like
  the course map, the exemplars and dewlab. The style guide says "a page
  teaches in its first world". The same question is open on
  `keeping-details-inside-an-object` and `the-moves-you-already-know`.
- **Pictures on the page.** `web/page/markdown.js` shows a picture with
  `<img>`, so an SVG can't follow the page's theme. This page's diagram
  now carries its own white card. If pictures are meant to follow the
  theme, as dewlab's do, the page could place an SVG inline; then this
  diagram could go back to `currentColor`. The style guide's `#access`
  could say which.
- **Decision 26 for one cell split into several types cells.** It says
  what to do for one types cell and one program. This page used
  `<id>-<class>` for each types cell and `<id>-program` for the program.
  Decision 26 could say so. It was not added to `DECISIONS.md` here,
  because other pages move at the same time and a numbered entry could
  clash.
- **A design task's solution.** "Compare with a solution" compares the
  output, which says little about a design: the reader's classes and
  names will differ. The page could show such a solution as "one answer",
  without the compare table.
- **Visual Studio's *Generate method*.** The page says that this is the
  line Visual Studio writes in a method it makes for you. Someone with
  Visual Studio should confirm it once.
- **The course file.** `courses/foop.yaml` still lists this lesson under
  `planned:`. The checklist says to delete that line when the lesson moves
  into `lessons/`; this move was not allowed to edit the course files.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| `Geologists: 1` | `a-fixed-list-of-values-1` |
| `Geologists: 2`, `Commander` | `a-fixed-list-of-values-3` |
| `0`, `1`, `2` | `a-fixed-list-of-values-4` |
| CS0117 message for `'geologist'` | `a-fixed-list-of-values-5` |
| `record CrewMember(string Name, Role Role);` compiles | scratch run (P1); practice `a-crew-with-an-engineer-1` |
| `NotImplementedException`, its message, line 15 of `Drive.cs`, in `Collect`, nothing printed | `from-cards-to-skeletons-1-program` |
| with `Collect` written, it stops at `Add` | scratch run (P3) |
| CS0161 message for an empty `Longest` | scratch run (P13) |
| an empty `void Collect` compiles and does nothing | scratch run (P4) |
| world solutions run and print a line | their solutions |
| `Orbiting` starts as `null` | scratch run (P7: `True`) |
| practice 4: `Colour { Red = 255, Green = 128, Blue = 0 }` | `a-card-with-nothing-to-do-1-program` |
| practice 5: `DayOfWeek` from `Sunday` to `Saturday`, seven values | scratch run (P10) |
| practice 6: `NotImplementedException`; `True`; `true`, `false` | `a-crew-with-an-engineer-2-program` and its solution |
| practice 7: CS1061 message; `True`; `true`, `false` | `a-skeleton-that-does-not-fit-1-program` and its solution |
| practice 9: `3` | `from-earlier-two-names-for-one-list-1-program` |
| practice 10: `6 6`; `bus46.Fare = 1;` is CS0176 | `from-earlier-one-fare-for-all-1-program`; scratch run (P12) |
| practice 11: refusal and `6`; `card.Balance = 50;` is CS0272; `Pay(-5)` compiles and adds money | `from-earlier-a-rule-with-a-gap-1-program`; scratch run (P11, P9) |

## Probes

Each probe is one program: its statements, then its classes. A class in a
probe carries down to the probes below it until one writes it again
(rule 4). The probes meant to fail are at the end, and each one writes
its own classes.

*Review:* all 13 were run again in the browser engine on 28 September
2026, as one scratch lesson (`node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`), with no problems. They print what the native
run printed: P1 `2` and `CrewMember { Name = Ada, Role = Commander }`;
P2 CS0117 for `'Pilot'`; P3 stops in `Log.Add(Drive)`; P4 prints its line,
then stops in `Log.Add(Drive)`; P5 stops in `Drive.Collect(Sample)`; P6
`1200` and `2`; P7 `True`; P8 `2`; P9 the refusal and `11`; P10 `Sunday
0`, `Saturday 6`, `7`, `14`; P11 CS0272 (`The property or indexer
'Card.Balance' cannot be used in this context because the set accessor
is inaccessible`); P12 CS0176 (`Member 'Bus.Fare' cannot be accessed with
an instance reference; qualify it with a type name instead`); P13 CS0161
(`'Log.Longest()': not all code paths return a value`). The page quotes
P13's message, and names P11's and P12's codes.

### P1. The enum's number, and the record (prose: `(int)Role.Engineer` is 2; `record CrewMember(string Name, Role Role);`)

```csharp exec
id: p1-role-values
Console.WriteLine((int)Role.Engineer);
Console.WriteLine(new CrewMember("Ada", Role.Commander));

enum Role
{
    Commander,
    Geologist,
    Engineer
}

record CrewMember(string Name, Role Role);
```

### P2. `Role.Pilot` (prose: the same message as `geologist`, with `'Pilot'`)

```csharp exec
id: p2-pilot
expect: CS0117
Role role = Role.Pilot;
Console.WriteLine(role);
```

### P3. The skeleton with `Collect` written (fold: it stops at `Add`)

```csharp exec
id: p3-collect-written
expect: exception
var log = new Log();
var drive = new Drive("Dune", 340);
drive.Collect(new Sample("basalt", 20, false));
log.Add(drive);
Console.WriteLine(log.Longest());

class Sample
{
    public string Name;
    public int Depth;    // centimetres below the surface
    public bool HasIce;

    public Sample(string name, int depth, bool hasIce)
    {
        Name = name;
        Depth = depth;
        HasIce = hasIce;
    }
}

class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
        _samples.Add(sample);
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}

class Log
{
    private List<Drive> _drives = new List<Drive>();

    public void Add(Drive drive)
    {
        throw new NotImplementedException();
    }

    public int Longest()    // the distance of the longest drive
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()    // on every drive
    {
        throw new NotImplementedException();
    }
}
```

The exception is at the `throw` in `Log.Add` (the check reports the line
in this probe, 50).

### P4. An empty `void` method (fold: it compiles, and does nothing)

```csharp exec
id: p4-empty-void
expect: exception
var log = new Log();
var drive = new Drive("Dune", 340);
drive.Collect(new Sample("basalt", 20, false));
Console.WriteLine("Collect ran, and did nothing.");
log.Add(drive);

class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}
```

It prints the line, and then stops at `Add`, which still throws.

### P5. The challenge, as given (it stops at `Collect`)

A copy of the `csharp challenge` block.

```csharp exec
id: p5-challenge-as-given
expect: exception
var log = new Log();
var first = new Drive("Dune", 340);
first.Collect(new Sample("basalt", 20, false));
first.Collect(new Sample("clay", 45, true));
var second = new Drive("Crater", 1200);
second.Collect(new Sample("sandstone", 80, true));
log.Add(first);
log.Add(second);
Console.WriteLine(log.Longest());
Console.WriteLine(log.SamplesWithIce());

class Sample
{
    public string Name;
    public int Depth;    // centimetres below the surface
    public bool HasIce;

    public Sample(string name, int depth, bool hasIce)
    {
        Name = name;
        Depth = depth;
        HasIce = hasIce;
    }
}

class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()
    {
        throw new NotImplementedException();
    }
}

class Log
{
    private List<Drive> _drives = new List<Drive>();

    public void Add(Drive drive)
    {
        throw new NotImplementedException();
    }

    public int Longest()    // the distance of the longest drive
    {
        throw new NotImplementedException();
    }

    public int SamplesWithIce()    // on every drive
    {
        throw new NotImplementedException();
    }
}
```

### P6. The challenge, solved (not stated in the prose: `1200`, `2`)

```csharp exec
id: p6-challenge-solved
var log = new Log();
var first = new Drive("Dune", 340);
first.Collect(new Sample("basalt", 20, false));
first.Collect(new Sample("clay", 45, true));
var second = new Drive("Crater", 1200);
second.Collect(new Sample("sandstone", 80, true));
log.Add(first);
log.Add(second);
Console.WriteLine(log.Longest());
Console.WriteLine(log.SamplesWithIce());

class Drive
{
    public string RoverName;
    public int Distance;    // metres
    private List<Sample> _samples = new List<Sample>();

    public Drive(string roverName, int distance)
    {
        RoverName = roverName;
        Distance = distance;
    }

    public void Collect(Sample sample)
    {
        _samples.Add(sample);
    }

    public int SamplesWithIce()
    {
        int count = 0;
        foreach (Sample sample in _samples)
        {
            if (sample.HasIce)
            {
                count = count + 1;
            }
        }
        return count;
    }
}

class Log
{
    private List<Drive> _drives = new List<Drive>();

    public void Add(Drive drive)
    {
        _drives.Add(drive);
    }

    public int Longest()    // the distance of the longest drive
    {
        int longest = 0;
        foreach (Drive drive in _drives)
        {
            longest = Math.Max(longest, drive.Distance);
        }
        return longest;
    }

    public int SamplesWithIce()
    {
        int count = 0;
        foreach (Drive drive in _drives)
        {
            count = count + drive.SamplesWithIce();
        }
        return count;
    }
}
```

### P7. `Orbiting` starts as `null` (solar-system solution note)

```csharp exec
id: p7-orbiting-null
var juno = new Probe("Juno", 100);
Console.WriteLine(juno.Orbiting == null);

class Planet
{
    public string Name;

    public Planet(string name)
    {
        Name = name;
    }
}

class Probe
{
    public string Name;
    public int Fuel { get; private set; }
    public Planet Orbiting { get; private set; }    // null until it reaches a planet

    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }
}
```

### P8. Practice 9: a copy of the list (fold: `2`)

```csharp exec
id: p8-copy-of-the-list
var stops = new List<string> { "Library", "Station" };
var route = new Route(stops);
stops.Add("Harbour");
Console.WriteLine(route.StopCount());

class Route
{
    private List<string> _stops;

    public Route(List<string> stops)
    {
        _stops = new List<string>(stops);
    }

    public int StopCount()
    {
        return _stops.Count;
    }
}
```

### P9. Practice 11: a negative fare (fold: the balance goes from 6 to 11)

```csharp exec
id: p9-negative-fare
var card = new Card(10);
card.Pay(4);
card.Pay(20);
card.Pay(-5);
Console.WriteLine(card.Balance);

class Card
{
    public int Balance { get; private set; }

    public Card(int balance)
    {
        Balance = balance;
    }

    public void Pay(int fare)
    {
        if (fare > Balance)
        {
            Console.WriteLine("Refused: not enough on the card.");
            return;
        }
        Balance = Balance - fare;
    }
}
```

### P10. Practice 1 and 5: dates and `DayOfWeek`

```csharp exec
id: p10-dates
Console.WriteLine($"{DayOfWeek.Sunday} {(int)DayOfWeek.Sunday}");
Console.WriteLine($"{DayOfWeek.Saturday} {(int)DayOfWeek.Saturday}");
Console.WriteLine(Enum.GetValues<DayOfWeek>().Length);
Console.WriteLine((new DateTime(2026, 10, 11) - new DateTime(2026, 9, 27)).Days);
```

### P11. Practice 11: `card.Balance = 50;` (fold: CS0272)

Uses the `Card` from P9.

```csharp exec
id: p11-balance-set
expect: CS0272
var card = new Card(10);
card.Balance = 50;
```

### P12. Practice 10: `bus46.Fare = 1;` (fold: CS0176)

```csharp exec
id: p12-fare-through-a-bus
expect: CS0176
var bus46 = new Bus(46);
bus46.Fare = 1;

class Bus
{
    public static int Fare = 2;

    public int Number;

    public Bus(int number)
    {
        Number = number;
    }
}
```

### P13. An empty `Longest` (fold: CS0161)

```csharp exec
id: p13-empty-longest
expect: CS0161
class Log
{
    public int Longest()
    {
    }
}
```
