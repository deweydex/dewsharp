# Notes: one-parent-many-children (C# draft)

Ported from dewlab `tutorials/one-parent-many-children/` (the tutorial, its
practice page and its glossary, all version 2026.09.26.1). Written on 27
September 2026 against dewsharp's `docs/LESSON_FORMAT.md` (including the
`docs/PARSER.md` pointer added that day), `planning/PEDAGOGICAL_STYLE_GUIDE.md`
(draft 1), `DECISIONS.md` (to entry 25) and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 13, batch 4, the first page of
"Classes working together").

A run that was stopped mid-page had left `one-parent-many-children.md` in
this folder: the whole tutorial, but no practice page and no notes. I kept
its structure and every cell id, ran every cell, and revised the prose in
the places listed under "Changes to the partial draft". The practice page
and these notes are new. The pattern is that of the
`one-class-many-methods` and `from-a-description-to-classes` drafts, the
pages before it.

Files:

- `one-parent-many-children.md`: the tutorial. 24 `csharp exec` cells: 17
  shared (11 types cells, 6 program cells), 2 in the game world, 3 in the
  solar system and 2 in the your-own world. A reader sees 19 or 20. 3
  predicts, 4 hints, 2 solutions (each with `inputs`), 3 answer folds, 2
  fences of code to read, 1 challenge.
- `one-parent-many-children-practice.md`: the practice page. 10 problems,
  17 exec cells, 5 predicts, 3 hints, 2 solutions (each with `inputs`), 8
  answer folds.
- `one-parent-many-children.native.json`,
  `one-parent-many-children-practice.native.json` and `NOTES.native.json`:
  what the native check recorded (`--json`).
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). They check the numbers
  and messages in the prose and folds that no lesson cell prints.

## How it was checked

- NativeCheck on both lesson files: **No problems.** On `NOTES.md` (the
  probes): **No problems.**
- dewsharp's own parser, `web/lesson/parse.js` (`parseLesson`, run with
  Node), on both lesson files: no errors. It counts the cells, predicts,
  hints, solutions and inputs given above.
- The cells meant to fail, and what they give:
  - `a-method-of-its-own-1` (types, `expect: CS0506`): the troll overrides
    a method that is not virtual.
  - `another-kind-of-creature-1` (types, `expect: CS0272`): CS0506 and
    CS0272, in that order, as the prose lists them.
  - `your-class-4-program--game` and `your-class-4-program--solar-system`
    (`expect: CS1061`): the starter programs call `HealOther` and `Land`,
    which the reader writes. The prose says the failure is expected.
  - Practice `where-the-mistake-is-2` (`expect: CS1503`).
- The solutions and their inputs:
  - Game: `Ada (health 9)`; inputs `"Ada (health 9)"`, `"Mira (health 10)"`.
  - Solar system: `Refused: Philae cannot burn 5 kg now.`, then `Philae
    (fuel 30 kg)`; inputs `"Philae (fuel 30 kg)"`, `false`, `true`.
  - Practice 2: the starter gives `"Nobody"` and `"Dune"`; the solution
    gives `"Ada"` and `"Dune"`.
  - Practice 4: the starter gives `"Lancelot (health 4)"` and `4`; the
    solution gives `"Lancelot (health 7)"` and `7`.
- Warnings the check printed, all on purpose: CS0108 from
  `a-limit-of-its-own-1` (it also shows in `-2` and `-3`, until `-4`
  replaces the troll); CS0108 from practice `the-tankers-tank-1` (in `-2`
  only, since `-3` replaces both classes); CS0114 from practice
  `an-override-that-is-missing-1` (it also shows in every cell of
  problems 9 and 10). Every CS code and message quoted in the prose is
  copied from the check's output. As in the earlier drafts, the prose
  quotes the message and not the `file(line,col)` part, except "line 3 of
  the program" in practice problem 9, which is the line the check reported.
- No cell reads input. dewlab's page had no `input()` and no stand-ins, so
  no cell needs `stdin:`. No cell uses `ReadKey`, `Clear` or colours, so the
  native check could run everything.
- The three links in "Where to read more" returned HTTP 200 on 27
  September 2026, and I read the parts the page describes. The inheritance
  page says a derived class gets every member of its base class except its
  constructors and finalizers, and that every class derives from
  `System.Object`. The polymorphism page puts a `Circle`, a `Rectangle`
  and a `Triangle` in a `List<Shape>` and calls `Draw` on each, and has a
  section "Hide base class members with new members". The `base` keyword
  page shows both uses: calling a base-class method, and choosing which
  base-class constructor runs.
- One quirk of NativeCheck, not of the lessons: in the cells below a types
  cell that holds two classes, a message about the second class is one
  line lower than it should be (`the-tankers-tank-1(21,23)` in the program
  cell, `(20,23)` when the cell itself is checked; 20 is the line in the
  cell). The prose quotes no line number from such a cell.

## What changed from the Python page, and why

**Frontmatter.** `year:` is gone. The worlds are game, solar-system and
your-own, with the wording of the pages before; ocean is dropped. dewlab's
`covers:` was per section (FOOP-LO3, FOOP-LO6, FOOP-LO7); the course map
gives `[FOOP-LO3, FOOP-LO6, FOOP-LO7]`, which is what the page has. The
title is the course map's and dewlab's.

**The class chain.** `character-so-far` is a types cell (`file:
Character.cs`) that holds the game world's third version, copied exactly
from the solution of `your-class-3--game` on `one-class-many-methods`. dewlab
had `{{include: setup/oop/game-3.py}}`; dewsharp has no includes (course
map, open question 2), so the copy was checked by hand.

**A class built on another class.** dewlab's first cell was a troll with
only `take_damage`, using the parent's `__init__`. C# does not pass
constructors from a parent to a child, so the first troll
(`a-class-built-on-another-class-1`) has a constructor with `: base(name,
health)` and nothing else, and the program (`-2`) shows the parent's
`TakeDamage` and `ToString` at work: `Grog (health 3)`, then `Grog
(health 5)`. The predict asks about that, with a "Troll" option for readers
who remember that an object without `ToString` prints its class's name.
*Inheritance*, *parent class* and *child class* are defined here, as in
dewlab; *base class* and *derived class* are named, because Microsoft's
documentation and Visual Studio use them. The prose says C# has one parent
per class. `: base(...)` is explained, and compared with `: this(...)` from
the page before. An invitation (delete the constructor and press Check)
and a fold quote CS7036 (probe P14).

**A method of its own** (a new subsection). The half-damage troll comes
second, and first as a cell meant to fail: CS0506, because `TakeDamage` is
not virtual. *Inherited member*, *virtual*, *override* and *overriding* are
defined here (dewlab named overriding in the phoenix section; in C# the
reader needs the word as soon as the compiler asks for it). The paragraph
on `object` explains the `override` the reader has written on every
`ToString`. Then `Character` is written again with `virtual` (rule 4), the
same troll under it, and the program prints dewlab's first answer, `Grog
(health 7)` then `Grog (health 9)`. "Why use `super()`" became "why call
`base.TakeDamage`", with a second reason C# adds: the troll cannot set
`Health`, whose `set` is private. The line-by-line fold follows the
invitation, keeps dewlab's items, says that `/` drops the fraction (7 / 2
is 3), and now answers the invitation (`grog.TakeDamage(-8)` is refused,
probe P1).

**A limit of its own.** The course map's central change. dewlab's trap
(`Character.max_health` read by name) and its fix (`self.max_health`) have
no C# twin: a static field cannot be overridden, and C# reads it through
the class either way. So the troll's own `public static int MaxHealth =
20;` hides the parent's, the compiler warns (CS0108), and healing lowers
Grog to 10, as in dewlab. The predict keeps dewlab's three options. The
prose defines *warning* and *hides*, and names the `new` keyword without
teaching it (probe P2: `new` silences the warning and changes nothing).
The fix is the course map's `public virtual int MaxHealth => 10;`, with
`=>` for a get-only property defined in one sentence and its long form
given (probe P3). The last paragraph replaces dewlab's link to the class
attributes section with what changes for code outside the class: a
property is read through an object.

**Another kind of creature.** The phoenix is written first as a cell meant
to fail: CS0506 again (`Heal` is not virtual) and CS0272 (the private
`set`). The prose uses the style guide's "read the first message first",
defines *set accessor*, and names `protected`, which the course map puts
here and the encapsulation page promised. `Character` is written a third
time, as its fourth version (`another-kind-of-creature-2`), with `Heal`
virtual and `Health { get; protected set; }`. The predict keeps dewlab's
two options. The paragraph on two decisions (through `base`, or not) stays.
New: an invitation to add `ember.Health = 50;`, with a fold that quotes
CS0272 (probe P5), so the reader sees what `protected` still forbids.

**Many kinds, one loop.** `party` is a `List<Character>`, and the loop
variable is `Character member`. The prose adds what C# makes visible: the
compiler knows only that `member` is a `Character`, and each object still
runs its own class's method, because of `virtual` and `override`.
*Polymorphism* is defined as in dewlab. The bullets say that Grog took 6,
from 20 to 14 (probe P4).

**Your turn: your class, fourth version.** Each world has a types cell and
a program cell, as on the pages before; the solar system has a second
types cell for the child.
- Game: `your-class-4--game` holds the start of `Healer` (a constructor
  only), and `your-class-4-program--game` calls `HealOther`, so it fails
  with CS1061 until the reader writes the method. The parent is the
  shared fourth version, so the reader changes only `Healer`. The solution
  is dewlab's `game-4-kind.py` in C#. Two hints: a question, then the
  method's first line (C# needs `void`). The solution note keeps dewlab's
  point and adds a question: which `Heal` runs when a healer heals a troll
  or a phoenix (probe P6).
- Solar system: `your-class-4--solar-system` holds `Probe` as
  `one-class-many-methods` left it (version 3, copied exactly), and
  `your-class-4-lander--solar-system` the start of `Lander`. The reader
  must change both, because `CanBurn` must become virtual in `Probe`; the
  task asks "what must `Probe` say first?", and the second hint names
  CS0506. The solution is dewlab's `solar-system-4.py` and
  `solar-system-4-kind.py` in C#: `CanBurn` virtual, the refusal "cannot
  burn 5 kg now", and `TankSize` as a virtual property, ready for a child
  with a bigger tank. The inputs keep dewlab's three, with "Beagle 2" in
  place of "Rosetta": Rosetta was the orbiter that carried Philae, not a
  lander.
- Your own: two comment cells, class and program, as on the pages before.
  The program cell's comment asks for a list that holds the class and its
  child, and one loop.

**Looking back and the challenge.** The question keeps dewlab's shape. The
zombie challenge is statements, then `Zombie`, then the whole of
`Character`'s fourth version, because a challenge opens as a new notebook
and sees nothing on this page. The starter compiles with warning CS0414
(`_risen` is never used), which is a fair clue (probe P7). A solution
needs both `virtual` on `TakeDamage` and the protected `set` (probe P8:
`Mort (health 5)`, then `Mort (health 0)`). The prose states no answer.

**Next and "Where to read more".** dewlab's "Next" pointed to
`objects-inside-objects`. In dewsharp the next page is the closer look
`virtual-and-override` (batch 5). Batch rule 3 says a lesson links back
only to earlier batches, so the page names it in plain text, and the
author of that page adds the link. *Think Python* and the Python tutorial
became three Microsoft Learn pages.

**Changes to the partial draft.** The stopped run's tutorial already had
the structure above. I changed: "gives back" and "gives nothing back" to
"returns", and "before you go further" to "before you continue" (phrasal
verbs); "`protected` is the third access modifier" to "a third", since C#
has more; the definition of *warning*, now one sentence; the bullets about
Ada and Grog in the loop section; the `-8` answer in the fold; the CS0272
fold (new); and the forward link to `virtual-and-override` (now plain
text). A double blank line went.

## The practice page, problem by problem

dewlab's order is kept, with one new problem (6).

1. **Which Describe?** dewlab's `Ship` and `Tug` became `Vehicle` and
   `Rover`: *tug* is a rare word for a reader in their second language,
   and a rover belongs to the solar system. `Describe` is virtual, the
   child overrides it and calls `base.Describe()`. The predict keeps
   dewlab's three options. The fold adds that a class with no constructor
   gets an empty one, which the tutorial's first fold also says.
2. **A commander with no name.** dewlab's captain lost his name at run
   time, because a child's `__init__` replaced the parent's. In C# the
   same class does not compile (CS7036). A class that does not compile
   stops every program below it on the page, so as a compile error the
   problem would have to be last. I kept it second, and in dewlab's shape:
   `CrewMember` has a second constructor, `CrewMember() : this("Nobody")`
   (constructor overloading, from `one-class-many-methods`), which C# runs
   when `Commander` has no `: base(...)`. It prints `Nobody commands the
   Dune`. The fix is one change, `: base(name)`. The solution note gives
   CS7036 for a `CrewMember` with one constructor (probe P13). The ocean's
   Nemo and Nautilus became Ada and the Dune, the rover of the page before.
3. **Through base, or not?** dewlab's fill-in-the-blank `question` has no
   dewsharp block, so it became two questions and an answer fold, as the
   earlier drafts did. The ghost's line became "The ghost feels nothing."
4. **A knight in armour.** A types cell with `Character`'s fourth version,
   a types cell with the start of `Knight`, and a program cell. The program
   adds a hit of 1 to dewlab's, so a reader who forgets `Math.Max` sees the
   parent's refusal (probe P9). dewlab's `get_health()` input became
   `lancelot.Health`. Two hints: a question, then the first line.
5. **The tanker's tank.** The tutorial's static-field trap in the solar
   system. It prints `100`, with CS0108. New: two cells after the fold
   write both classes again with a virtual property, and the program
   prints `400`. dewlab gave that number in the fold; here it is run, and
   the CS0108 warning does not follow the reader into later problems.
6. **An override that is missing** (new; the course map asks for it).
   Problem 1's `Rover` without `override`. It prints `a rover, which is a
   vehicle`, then `a vehicle` twice, with CS0114. The fold explains
   *hides* by the type of the variable, and gives CS0108 for a parent
   method that is not virtual either (probe P10). It says that a later
   closer look goes further, without a link.
7. **Is it a kind?** Prose and a fold, as in dewlab. `Captain(CrewMember)`
   became `Commander : CrewMember` (problem 2's classes), and
   `Engine(Submarine)` became `Engine : Rover`. The link to
   `when-is-a-breaks` (batch 5) became plain text, as did the mention of
   `objects-inside-objects` (batch 7).
8. **From earlier: class or field?** From `from-a-description-to-classes`.
   The dragon stays. The fold adds that the colour could be an enum, which
   that page taught.
9. **From earlier: where the mistake is.** From
   `the-tools-around-your-code`. dewlab showed a Python traceback, two
   calls deep, and asked which line to change. In C#, text passed where an
   `int` is expected does not compile, and the message names the call
   (CS1503, line 3 of the program). So the problem runs the program, with
   a predict that keeps dewlab's three lines as options; the fold gives the
   C# answer and one sentence on what Python did. The fix prints `Ada
   (health 9)` (probe P11).
10. **From earlier: stored, or gone?** From `the-moves-you-already-know`.
    A `Healer` child of `Character` with `HealsGiven { get; private set;
    }`, and the slip `int healsGiven = HealsGiven + 1;`. It prints `0`,
    with no warning (C# warns, CS0219, only when the value given is a
    constant). The fix prints `2` (probe P12).

## What C# made different, in short

- A child class writes its own constructors, and runs the parent's with
  `: base(...)`. With none, C# runs the parent's constructor without
  values, and does not compile if there is none (CS7036).
- A child can override a method only when the parent marks it `virtual`
  (CS0506). A method with the same name and no `override` hides the
  parent's, with a warning (CS0114 or CS0108), and which one runs depends on
  the variable's type.
- A static field cannot be overridden, so a limit a child may change is a
  virtual property. C# has no twin of Python's `self.max_health` lookup.
- `protected` exists, and the compiler checks `private` and `protected`
  (CS0272), where Python's underscore only asked.
- Integer division drops the fraction towards zero. `amount / 2` gives
  dewlab's numbers for every hit on the page, but not for a negative hit:
  `grog.TakeDamage(-1)` passes 0 and does nothing (probe P1), where
  Python's `-1 // 2` is -1 and is refused. The page does not show it (open
  question 6).
- Text passed as a number is a compiler error at the call, not an
  exception two calls deep.

## What should change once the page UI or the browser checker exists

1. **Messages from cells above.** A warning in a types cell follows every
   program below it until the class is replaced (CS0108 in
   `a-limit-of-its-own-2` and `-3`; CS0114 in practice problems 9 and 10).
   The engine puts errors first and gives each message its `cellId`
   (`docs/ENGINE_API.md`), so the page can label these "from a cell above".
   Practice problem 9's point is reading the message, so check that its
   CS1503 is the first thing the reader sees.
2. **A reader's half-edited cell.** The first invitation asks the reader
   to delete the troll's constructor; until they write it again,
   `a-class-built-on-another-class-2` does not compile. Every later cell
   writes `Troll` again, so nothing further down is affected, if the page
   drops a replaced class before compiling, as NativeCheck does. The two
   broken types cells (`a-method-of-its-own-1`, `another-kind-of-creature-1`)
   are compiled with the cells below them until they are replaced, and the
   `Character` written just below each makes it compile. The check shows
   that this works; the browser engine should agree (DECISIONS 16).
3. **Compare with a solution when the starter does not compile.** Both
   world tasks start with CS1061, so "What your code gave" is a compile
   error for every input until the reader writes the method.
4. **Empty cells** (the your-own world) have kind `empty`.
5. **The challenge** is statements then two classes in one block. If the
   notebook splits a challenge into cells, split this one.
6. **Cell length.** `Character` is 44 lines, and the page writes it four
   times (`character-so-far`, `a-method-of-its-own-2`,
   `a-limit-of-its-own-3`, `another-kind-of-creature-2`), plus once in the
   challenge and once on the practice page. Each rewrite changes one or
   two lines, marked `// changed`. A way to show a class with its changed
   lines picked out, or includes (course map, open question 2), would make
   the page much shorter to read.

## Open questions for a reviewer

1. **Size.** The course map says L. A reader sees 19 or 20 cells, against
   dewlab's 6 shared cells, because C# needs the class written again for
   each change (`virtual`, the virtual property, `protected`) and a failing
   cell first for two of them. If the page should be split, the natural
   place is after "A limit of its own": the phoenix, `protected`, the loop
   and the class chain would be a second page. That would give a second
   lesson id, so it is best decided before any class uses the page.
2. **The fourth version in the game world** is in two cells: `Character`
   in the shared cell `another-kind-of-creature-2`, and the reader's
   `Healer` in `your-class-4--game`. The next page in the chain
   (`objects-inside-objects`, batch 7) must copy both. In the solar
   system, the fourth version is the reader's `Probe` and `Lander` (the
   solution). Version 4 of `Character` changes more than dewlab's
   `game-4.py` did: `TakeDamage` and `Heal` are virtual, `MaxHealth` is a
   virtual property, and `Health` has a protected `set`. One consequence
   for later pages: `Character.MaxHealth` no longer compiles; it is read
   through an object.
3. **`Probe.Fuel` keeps its private `set`** in the solar-system solution,
   because `Lander` does not need to change the fuel. `Character.Health`
   became protected because the phoenix needs it. Should the two chains
   match?
4. **Cell ids.** The shared cells keep dewlab's section prefixes, but the
   numbers shift: dewlab's `a-limit-of-its-own-2` (the fix) is now `-3` to
   `-5`, and `another-kind-of-creature-1` is now the cell meant to fail,
   with the working phoenix at `-3` and its program at `-4`. The subsection
   "A method of its own" has new ids, `a-method-of-its-own-1` to `-4`. The
   world cells follow the page before: `your-class-4--<world>`,
   `your-class-4-program--<world>`, and `your-class-4-lander--solar-system`.
   Practice ids follow dewlab's, with `a-commander-with-no-name-1/2` for
   `a-captain-with-no-name-1`, and new `the-tankers-tank-3/4`,
   `an-override-that-is-missing-1/2`, `where-the-mistake-is-1/2` and
   `stored-or-gone-1/2` (dewlab: `from-earlier-stored-or-gone-1`). Rename
   before any class uses the pages, if wanted.
5. **Forward links.** The page names the next page, `virtual-and-override`,
   and the practice page names `when-is-a-breaks` and
   `objects-inside-objects`, all in plain text (batch rule 3). The
   one-class-many-methods draft linked forward instead; the two drafts
   should agree. If the checker comes to accept links to any id a course
   lists (course map, open question 6), these can become links now.
6. **A negative hit on a troll.** `grog.TakeDamage(-1)` does nothing in C#
   (-1 / 2 is 0), where Python refuses it. It could be a practice problem
   on C#'s division, or the troll could check for a negative amount before
   halving. I left the page as dewlab has it.
7. **Practice problem 2 has a second constructor** so that it compiles and
   fails at run time, as dewlab's does. The other choice is the plain
   CS7036 (which the solution note shows), with the problem moved to the
   end of the page.
8. **Practice problem 6 and the closer look.** The course map asks this
   practice page for a child without `override`, and `virtual-and-override`
   runs the same experiment with the troll. The fold ends by pointing to
   it. That page's author may want to refer back to problem 6.
9. **Python asides.** The tutorial has none. Practice problem 9's fold has
   one sentence on what Python did, since the problem came from a Python
   traceback. A reader who took PDP in C# does not need it.
10. **World order.** The shared prose teaches in the game world, listed
    first in the frontmatter, as on the other FOOP drafts.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| `Grog (health 3)`, `Grog (health 5)` | `a-class-built-on-another-class-2` |
| CS7036 in the first fold | probe P14 |
| CS0506 for the troll | `a-method-of-its-own-1` |
| `Grog (health 7)`, `Grog (health 9)` | `a-method-of-its-own-4` |
| 7 / 2 is 3; `grog.TakeDamage(-8)` refused (fold) | probe P1 |
| `Grog (health 10)`; CS0108 message | `a-limit-of-its-own-2` (and `-1`) |
| `new` would not change what `Heal` reads | probe P2 |
| the long form of the property means the same | probe P3 |
| `Grog (health 20)`; "10 for a character, and 20 for a troll" | `a-limit-of-its-own-5`; probe P3 |
| CS0506 and CS0272 for the phoenix | `another-kind-of-creature-1` |
| `Ember (health 0) True`, `Ember (health 5)` | `another-kind-of-creature-4` |
| `ember.Health = 50;`: CS0272 | probe P5 |
| refusal, `Ada (health 0)`, `Grog (health 18)`, `Ember (health 4)` | `many-kinds-one-loop-1` |
| Grog took 6, from 20 to 14 | probe P4 |
| game: CS1061; `Ada (health 9)` | `your-class-4-program--game` and its solution |
| solar system: CS1061; the refusal, `Philae (fuel 30 kg)` | `your-class-4-program--solar-system` and its solution |
| challenge (no number in the prose) | probes P7, P8 |
| practice 1: `a vehicle`, `a rover, which is a vehicle` | `which-describe-2` |
| practice 2: `Nobody commands the Dune`; `Ada commands the Dune`; CS7036 | `a-commander-with-no-name-2` and its solution; probe P13 |
| practice 4: `Lancelot (health 7)` twice; a hit of 1 refused without `Math.Max` | `a-knight-in-armour-3` solution; probe P9 |
| practice 5: `100` and CS0108; `400` | `the-tankers-tank-2` (and `-1`); `the-tankers-tank-4` |
| practice 6: the three lines and CS0114; CS0108 when not virtual | `an-override-that-is-missing-2` (and `-1`); probe P10 |
| practice 9: CS1503, line 3; `Ada (health 9)` | `where-the-mistake-is-2`; probe P11 |
| practice 10: `0`; `2` | `stored-or-gone-2`; probe P12 |

## Probes

Each probe is one program: its statements, then its classes. A class in a
probe carries down to the probes below it until one writes it again (rule
4), so the two probes whose classes do not compile are last. The CS0108
from P10 is repeated in P11 to P14 for that reason.

### P1. Tutorial, a method of its own: `7 / 2` is 3, `grog.TakeDamage(-8)` is refused, and `grog.TakeDamage(-1)` does nothing

`Character` here is the one in `a-method-of-its-own-2`: version 3 with `TakeDamage` made virtual.

```csharp exec
id: probe-half-a-hit
Console.WriteLine(7 / 2);
var grog = new Troll("Grog", 10);
grog.TakeDamage(7);
Console.WriteLine(grog);
grog.TakeDamage(-8);
Console.WriteLine(grog);
grog.TakeDamage(-1);    // -1 / 2 is 0 in C#, so nothing is refused (not in the prose; see open question 6)
Console.WriteLine(grog);

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

class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

### P2. Tutorial, a limit of its own: `new` on the troll's static field silences CS0108 and changes nothing

```csharp exec
id: probe-new-on-purpose
var grog = new Troll("Grog", 18);
grog.Heal(5);
Console.WriteLine(grog);

class Troll : Character
{
    public static new int MaxHealth = 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

### P3. Tutorial: `{ get { return 10; } }` does what `=> 10` does

```csharp exec
id: probe-long-property
var grog = new Troll("Grog", 18);
grog.Heal(5);
Console.WriteLine($"{grog} {grog.MaxHealth}");
var ada = new Character("Ada", 8);
ada.Heal(5);
Console.WriteLine($"{ada} {ada.MaxHealth}");

class Character
{
    public virtual int MaxHealth { get { return 10; } }

    public string Name;
    public int Health { get; private set; }

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

class Troll : Character
{
    public override int MaxHealth => 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

### P4. Tutorial, many kinds, one loop: the health after the hit (prose: Grog took 6, from 20 to 14)

From here on, `Character` is version 4, as in `another-kind-of-creature-2`.

```csharp exec
id: probe-loop-step-by-step
var party = new List<Character>
{
    new Character("Ada", 10),
    new Troll("Grog", 20),
    new Phoenix("Ember", 10)
};
foreach (Character member in party)
{
    member.TakeDamage(12);
    Console.WriteLine($"after the hit: {member}");
    member.Heal(4);
    Console.WriteLine($"after healing: {member}");
}

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

class Troll : Character
{
    public override int MaxHealth => 20;

    public Troll(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}

class Phoenix : Character
{
    public Phoenix(string name, int health) : base(name, health)
    {
    }

    public override void Heal(int amount)
    {
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

### P5. Tutorial, the fold after the phoenix: `ember.Health = 50;` (prose: CS0272)

```csharp exec
id: probe-program-sets-health
expect: CS0272
var ember = new Phoenix("Ember", 10);
ember.Health = 50;
```

### P6. Tutorial, game solution note: a healer heals a troll and a phoenix (the note asks which `Heal` runs; no number in the prose)

```csharp exec
id: probe-healer-heals-others
var mira = new Healer("Mira", 10);
var grog = new Troll("Grog", 12);
var ember = new Phoenix("Ember", 10);
ember.TakeDamage(15);
mira.HealOther(grog, 10);
mira.HealOther(ember, 5);
Console.WriteLine($"{grog} {ember}");

class Healer : Character
{
    public Healer(string name, int health) : base(name, health)
    {
    }

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

### P7. The challenge, as given (the prose states no number; it compiles with warning CS0414)

```csharp exec
id: probe-challenge-as-given
var mort = new Zombie("Mort", 10);
mort.TakeDamage(12);
Console.WriteLine(mort);
mort.TakeDamage(12);
Console.WriteLine(mort);

class Zombie : Character
{
    private bool _risen = false;

    public Zombie(string name, int health) : base(name, health)
    {
    }
}

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
```

### P8. The challenge, solved: one way, which keeps the parent's rules through `base`

```csharp exec
id: probe-challenge-solved
var mort = new Zombie("Mort", 10);
mort.TakeDamage(12);
Console.WriteLine(mort);
mort.TakeDamage(12);
Console.WriteLine(mort);
mort.TakeDamage(-3);

class Zombie : Character
{
    private bool _risen = false;

    public Zombie(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount);
        if (IsDown() && !_risen)
        {
            _risen = true;
            Health = 5;
        }
    }
}
```

### P9. Practice 4: the knight without `Math.Max` (prose: a hit of 1 is refused)

```csharp exec
id: probe-knight-without-max
var lancelot = new Knight("Lancelot", 10);
lancelot.TakeDamage(5);
Console.WriteLine(lancelot);
lancelot.TakeDamage(1);
Console.WriteLine(lancelot);

class Knight : Character
{
    public Knight(string name, int health) : base(name, health)
    {
    }

    public override void TakeDamage(int amount)
    {
        base.TakeDamage(amount - 2);
    }
}
```

### P10. Practice 6: the parent's `Describe` not virtual either (prose: CS0108, and the same three lines)

```csharp exec
id: probe-rover-not-virtual
Console.WriteLine(new Rover().Describe());
foreach (Vehicle vehicle in new List<Vehicle> { new Vehicle(), new Rover() })
{
    Console.WriteLine(vehicle.Describe());
}

class Vehicle
{
    public string Describe()
    {
        return "a vehicle";
    }
}

class Rover : Vehicle
{
    public string Describe()
    {
        return $"a rover, which is {base.Describe()}";
    }
}
```

### P11. Practice 9, fixed: `5` with no quotes (prose: `Ada (health 9)`)

```csharp exec
id: probe-healer-fixed
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, 5);
Console.WriteLine(ada);
```

### P12. Practice 10, fixed: `HealsGiven = HealsGiven + 1;` (prose: 2)

```csharp exec
id: probe-heals-given-fixed
var ada = new Character("Ada", 4);
var mira = new Healer("Mira", 10);
mira.HealOther(ada, 2);
mira.HealOther(ada, 2);
Console.WriteLine(mira.HealsGiven);

class Healer : Character
{
    public int HealsGiven { get; private set; }

    public Healer(string name, int health) : base(name, health)
    {
    }

    public void HealOther(Character other, int amount)
    {
        other.Heal(amount);
        HealsGiven = HealsGiven + 1;
    }
}
```

### P13. Practice 2, solution note: `CrewMember` with one constructor, and no `: base(...)` (prose: CS7036). Near the end, because its class does not compile

```csharp exec
id: probe-commander-without-base
expect: CS7036
class CrewMember
{
    public string Name;

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Commander : CrewMember
{
    public string RoverName;

    public Commander(string name, string roverName)
    {
        RoverName = roverName;
    }
}
```

### P14. Tutorial, the first fold: the troll with its constructor deleted, and Check pressed (prose: CS7036). Last, because its class does not compile

This cell writes `Commander` again, fixed, only so that P13's message is not repeated here (rule 4). `Character` above it is version 4; the message is the same for version 3, whose constructor is the same.

```csharp exec
id: probe-troll-without-constructor
expect: CS7036
class Troll : Character
{
}

class Commander : CrewMember
{
    public string RoverName;

    public Commander(string name, string roverName) : base(name)
    {
        RoverName = roverName;
    }
}
```
