# Notes: from-a-description-to-classes (C# draft)

Ported from dewlab `tutorials/from-a-description-to-classes/` (the
tutorial, its practice page and its glossary, all version 2026.09.26.1).
Written on 27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md`, and the
entry for this page in `planning/COURSE_MAP.md` (FOOP lesson 11, batch 3).
It follows the pattern of the `one-class-many-methods` and
`keeping-details-inside-an-object` drafts, the pages before it.

Two runs wrote it. The first wrote the three files and stopped before it
recorded the `--json` outputs. The second (this one, the same day) found
that every cell still passed, reviewed both pages against the style guide
and the course map, made the changes listed under "Second pass" below,
ran every cell again, and recorded the outputs.

Files:

- `from-a-description-to-classes.md`: the tutorial. 14 `csharp exec`
  cells: 8 shared (5 program cells, 3 types cells... see below) and 2 in
  each world. A reader in one world sees 10. 3 predicts, 2 hints, 2
  solutions, 4 answer folds, 1 picture, 1 challenge.
  - Shared: `a-fixed-list-of-values-1` to `-4` (program, types, program,
    program) and `from-cards-to-skeletons-sample`, `-drive`, `-log`
    (types) and `from-cards-to-skeletons-1` (program).
  - In each world: `from-cards-to-skeletons-2--<world>` (a types cell for
    the reader's skeleton) and `from-cards-to-skeletons-2-program--<world>`
    (a program cell that makes one object of each class). Both start as a
    comment, so their kind is `empty` until the reader writes in them.
- `the-mission-in-boxes.svg`: the class diagram beside the cards. It uses
  `currentColor` only, as dewlab's pictures do, and has a `<title>` and a
  `<desc>`; the page's Markdown gives the same description as alt text.
- `from-a-description-to-classes-practice.md`: the practice page. 11
  problems, 16 exec cells, 3 predicts, 3 hints, 3 solutions (2 with
  `inputs`), 8 answer folds.
- `from-a-description-to-classes.native.json`,
  `from-a-description-to-classes-practice.native.json` and
  `NOTES.native.json`: what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the
  numbers and messages in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files and on this file: **No problems.**
- `web/lesson/parse.js` (the parser the page and the browser checker
  share) reads both lesson files with no errors: 14 and 16 cells, and every
  predict, hint, solution and inputs block attached to the cell intended
  (second pass, 27 September 2026).
- The skeleton program, `from-cards-to-skeletons-1`, is `expect:
  exception`: it compiles, and then stops with `NotImplementedException`
  at line 15 of the `Drive` cell, the `throw` in `Collect`. The prose
  quotes that line and the exception's message from the check.
- Practice problem 6 is `expect: exception` in the same way (line 23 of
  the `Rover` cell), and its solution gives `True` for the program, and
  `true` and `false` for the inputs. Problem 7 is `expect: CS1061`; its
  solution gives `True`, `true`, `false`.
- The two world solutions (game and solar system) and practice problem 8's
  solution are skeletons. Their programs only make objects and read
  fields, so that each solution runs to the end, as the checker requires.
  They print `Ada, Troll, gold cup, Great Hall`, `Outer Planets: Juno to
  Jupiter` and `Ada, Commander, on the Dune`.
- No cell reads input. dewlab's page had no `input()` and no stand-ins,
  so no cell needs `stdin:`. No cell uses `ReadKey`, `Clear` or colours.
- No cell prints a compiler warning. Two kinds of skeleton field do: a
  private field that is never given a value (CS0169), and a private field
  set to a constant and never read (CS0414, for `private int _passengers
  = 0;`). The skeletons avoid both. Lists are made with `new`, which gives
  no warning, `Probe.Orbiting` is a property with a private `set`, and
  dewlab's `_passengers` in practice problem 7 became a comment on
  `Board`.
- The two links in "Where to read more" returned HTTP 200 on 27 September
  2026, and I read the parts the page describes. Beck and Cunningham's
  paper introduces CRC cards by class name, responsibilities and
  collaborators. Microsoft's enum page shows how to write an enum, says
  that values start at zero and go up by one unless you choose the
  numbers, and has a section on conversions between an enum and its
  number.
- The diagram was drawn in headless Chromium, in light and dark, with the
  SVG inline (as dewlab places its pictures): the text and lines follow
  the page's colour in both.
- One sentence was not run: "Visual Studio writes the same line when it
  makes a new method for you." That is Visual Studio's "Generate method"
  quick action, from my knowledge of Visual Studio 2022. Someone with
  Visual Studio should confirm it once.

## Second pass

What the second run changed, and why:

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
  challenge). `from-cards-to-skeletons-log` now has `SamplesWithIce()`,
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
  or `0`. It prints `Geologists: 2`, then `Commander`. One bracketed
  sentence says the values are whole numbers underneath (probe P1:
  `(int)Role.Engineer` is 2).
- `-4` (`expect: CS0117`): the typing slip again, as `Role.geologist`.
  The prose quotes the message and adds `Role.Pilot` (probe P2).
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
class each, as the map asks) and a program cell.
- dewlab's predict ("None", "340", "An error") became four options,
  named as the style guide names the three outcomes: it prints 340, it
  prints 0, it does not compile, it stops with an exception. It stops at
  `Collect`, the first call. The prose says two things happened: the
  compiler checked that the cards fit (the C# version of "every call found
  its method"), and then the run stopped at the first method with no body.
  It also says nothing is broken, since the cell is `expect: exception`
  and the predict comes first.
- New, a "completed" step: write `Collect`'s body, and see the program
  stop one method later, at `Add` (probe P3). The fold gives the answer.
- New, an invitation with a fold: delete the `throw` from `Longest` and
  check the cell: CS0161 (probe P13). The fold adds that a `void` method
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
  `Hero` card. The forward reference to inheritance keeps its point with
  no link (see "Links").
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

**Next.** dewlab's "Next" links to inheritance. That page and the mixed
set that comes first are batch 4, so, following the course map's batch
rule 3, the page names them in words without links. Their authors add the
links.

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
   writes it (`expect: exception`). The solution loops over the crew and
   compares `member.Role == Role.Engineer`. It is the "completed" step
   for enums, and it uses a skeleton the way the tutorial describes.
7. **A skeleton that does not fit.** In Python the skeleton ran and then
   stopped with `AttributeError`; in C# it does not compile (CS1061), and
   the solution's note says that C# shows the gap even earlier. `Route` and
   `Bus` are types cells; `Bus` has `public Route Route;`, the same
   type-and-name pattern the tutorial explains for `Role Role`.
8. **One more paragraph.** dewlab's ocean-world task (a crew member's
   oxygen), retold for the rovers. The starter types cell holds the `Role`
   enum; the solution brings its own copy of `Role`, so it works even if
   the reader changed the cell. "1 litre for every 10 m" became "every
   100 m", because a rover travels farther than a submarine dives.
9. **From earlier: two names for one list.** dewlab took it from *A
   polynomial class*, which is an explore page in dewsharp (batch 13). The
   heading links to `objects-and-classes-practice` instead, whose course
   map entry lists "two names for one list" among its problems from
   earlier (see open question 5). `count()` became `StopCount()`. It
   prints `3`; the fold's copy, `new List<string>(stops)`, gives `2`
   (probe P8).
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
    P11). The second, `card.Pay(-5)`, still works, and the balance goes
    from 6 to 11 (probe P9). This one is now runnable, where dewlab's was
    code to read. The fold ends with a question: what one line would
    refuse a negative fare?

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

## What to revisit once the page UI or the browser checker exists

1. **Where an exception is reported.** The skeleton's prose says it
   stops "at line 15 of `Drive.cs`, the `throw` inside `Collect`". The
   native check reports the cell id and line; the page will show its own
   report (course map, open question 9). If the page names the method
   (`Drive.Collect`), the prose could say so. If it names only the
   program's line, the prose needs "in `Collect`" to stay.
2. **`expect: exception` with a predict before it.** The skeleton cell is
   meant to stop, and the predict asks what will happen, so the prose
   cannot say beforehand that it is meant to stop. It says so after the
   run ("Nothing is broken"). If the page marks `expect:` cells in some
   way before a run, the predict loses its point.
3. **Edits that leave a types cell not compiling.** Two invitations ask
   the reader to edit a types cell above a program: write `Collect` in
   `from-cards-to-skeletons-drive`, and delete a `throw` from
   `from-cards-to-skeletons-log`. The second leaves `Log` broken, so
   `from-cards-to-skeletons-1` stops compiling until the line is written
   again; the prose says so. Nothing below depends on `Log`, because the
   world cells start empty and the solutions bring their own classes.
4. **Empty cells.** The six world cells start as comments, kind `empty`.
   Their solutions sit on the program cells. "Compare with a solution"
   compares output, which for a design task says little: the reader's
   classes and names will differ. The solutions are there mainly to be
   read. The page could show a design task's solution as "one answer",
   without the compare table.
5. **Hints on a types cell.** The two world hints belong to the types
   cell, with the default `after: 1 errors`. A types cell has **Check**,
   not **Run**. Does a Check that fails count as an error for `after:`?
6. **The picture.** `the-mission-in-boxes.svg` uses `currentColor`, which
   only follows the page's theme if the SVG is placed inline (as dewlab
   does). Shown with `<img>`, it is black on any background, and so hard
   to read in a dark theme.
7. **The challenge** is statements then three classes in one block. If
   the notebook splits a challenge into cells, split this one.
8. **Cell length.** The shared cells are 2 to 22 lines of code (the
   `Log` skeleton is 19 since the second pass, and `Drive` 22); the world
   solutions are 71 and 73 lines, the challenge 67, and practice problem
   8's solution 55. They are skeletons, with braces on their own lines,
   and a skeleton cell of one class is longer than the style guide's
   fifteen lines because each method takes five.

## Open questions for a reviewer

1. **The page opens by reading, not running.** The style guide asks a page
   to open with code that runs. dewlab's page opens with a paragraph to
   read and a question, and the first cell comes in the second section
   (the enum). A design page may be the exception; or the first enum cell
   could move to the top, at the cost of the noun hunt coming second.
2. **Records.** Design B and the "nothing yet" paragraph use `record`,
   defined here in one sentence, because C# has no mixed dictionary. The
   course map says `objects-and-classes` meets records in its challenge
   and practice, which have no draft yet. If records are not to appear
   before `objects-inside-objects`, design B could use classes with public
   fields and no methods, and lose some of its contrast.
3. **`Role Role`.** The record and practice problem 8 use a field or
   property with the same name as its type (`public Role Role;`), as .NET
   code often does, and the page explains it in one sentence. The other
   choice is a different name (`Job`), which would not match the
   description's word.
4. **Which types cell holds the reader's skeleton.** The course map says
   one class a cell for the skeleton cells. The page's own skeleton does
   that. The world tasks give the reader one types cell for all their
   classes, since the number of classes is the reader's choice. Should
   the task offer several types cells instead?
5. **"From earlier" for two names for one list.** No FOOP page drafted so
   far teaches it. The course map lists it as a problem from earlier on
   `objects-and-classes-practice`, so problem 9 links there. The PDP pages
   that teach it (`two-names-one-list`, batch 5) are later batches. Keep
   the link, drop it, or choose another earlier problem (for example, the
   list field that was never made, from `the-tools-around-your-code`)?
6. **Size.** The course map says M (8 to 15 cells). A reader sees 10.
7. **World order.** The shared prose teaches in the solar system (the
   Mars mission), and the frontmatter lists game first, as the other FOOP
   drafts and the course map do. "A page teaches in its first world."
8. **Cell ids.** The shared skeleton cells are named for their classes
   (`from-cards-to-skeletons-sample`, `-drive`, `-log`), so that the
   program cell keeps dewlab's `from-cards-to-skeletons-1`, and the world
   types cells keep `from-cards-to-skeletons-2--<world>`. The world
   program cells are new (`-2-program--<world>`, as the predecessor's
   `your-class-3-program--<world>`). Rename before any class uses the
   page, if wanted.
9. **The class chain.** This page makes no new version of the reader's
   class, as in dewlab: `one-parent-many-children` starts from version 3.
   The world solutions only say that the reader's `Character` or `Probe`
   could be one of the cards.
10. **The design question's answer.** dewlab marked the first design as
    the answer to "which design gives the rule the most natural home". The
    fold keeps it first, but says design B can do the same with a
    `Collect` method. A reviewer may prefer a question whose answer is
    sharper, such as a rule about one sample on its own ("a depth cannot
    be negative"), whose home is the `Sample` constructor, which design B
    does not have.
11. **Python asides.** One sentence in the skeleton section says Python's
    skeletons hold `pass`, and the predict option `Role.Commander` is what
    Python's `enum` prints. A reader who took PDP in C# does not need them.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| `Geologists: 1` | `a-fixed-list-of-values-1` |
| `Geologists: 2`, `Commander` | `a-fixed-list-of-values-3` |
| `(int)Role.Engineer` is 2 | probe P1 |
| CS0117 for `'geologist'` | `a-fixed-list-of-values-4` |
| CS0117 for `'Pilot'` | probe P2 |
| `record CrewMember(string Name, Role Role);` compiles | probe P1 |
| `NotImplementedException`, its message, line 15 of `Drive.cs`, nothing printed | `from-cards-to-skeletons-1` |
| with `Collect` written, it stops at `Add` | probe P3 |
| CS0161 for an empty `Longest` | probe P13 |
| an empty `void Collect` compiles, runs and does nothing | probe P4 |
| world solutions run and print a line | their solutions |
| `Orbiting` starts as `null` | probe P7 |
| challenge: stops at `Collect` as given; `1200` and `2` solved (not in the prose) | probes P5, P6 |
| practice 1: days between two dates (14 for 27 September to 11 October; not in the prose) | probe P10 |
| practice 4: `Colour { Red = 255, Green = 128, Blue = 0 }` | `a-card-with-nothing-to-do-2` |
| practice 5: `DayOfWeek` from `Sunday` to `Saturday`, seven values | probe P10 |
| practice 6: `NotImplementedException`; `True`; `true`, `false` | `a-crew-with-an-engineer-3` and its solution |
| practice 7: CS1061 message; `True`; `true`, `false` | `a-skeleton-that-does-not-fit-3` and its solution |
| practice 9: `3`; `2` with a copy | `from-earlier-two-names-for-one-list-2`; probe P8 |
| practice 10: `6 6`; CS0176 | `from-earlier-one-fare-for-all-2`; probe P12 |
| practice 11: refusal and `6`; CS0272 message; 6 to 11 | `from-earlier-a-rule-with-a-gap-2`; probes P11, P9 |

## Probes

Each probe is one program: its statements, then its classes. A class in a
probe carries down to the probes below it until one writes it again
(rule 4). The probes meant to fail are at the end, and each one writes
its own classes.

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
