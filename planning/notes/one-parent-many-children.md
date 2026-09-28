# Notes: one-parent-many-children

Ported from dewlab `tutorials/one-parent-many-children/` (the tutorial, its
practice page and its glossary, all version 2026.09.26.1). First drafted on
27 September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` (to entry
25) and the entry for this page in `planning/COURSE_MAP.md` (FOOP lesson
13, batch 4, the first page of "Classes working together"). It starts from
the third version of the class chain, which `one-class-many-methods` makes.

**Moved into `lessons/` on 28 September 2026.** The drafts'
`*.native.json` files were deleted. Every cell, solution, input and the
challenge was run in the browser engine (`npm run check-lessons -- --write
one-parent-many-children one-parent-many-children-practice`), and the
probes at the end of this file were run the same way, in a scratch lesson.
"Changes made when the page moved" lists what changed, "Decisions on the
porter's questions" says what was settled, and "Open" lists what is left
for Josh. The sections between them are the porter's, kept as the record of
the translation; where they give practice problem numbers, they are the
draft's (see "Changes made when the page moved" for the new ones).

Files:

- `lessons/one-parent-many-children/one-parent-many-children.md`: the
  tutorial. 25 `csharp exec` cells: 18 shared (12 types cells, 6 program
  cells), 2 in the game world, 3 in the solar system and 2 in the your-own
  world. A reader sees 20 or 21. 3 predicts, 4 hints, 2 solutions (each
  with `inputs`), 2 answer folds, 2 fences of code to read, 1 challenge.
  Version 2026.09.28.1.
- `lessons/one-parent-many-children/one-parent-many-children-practice.md`:
  the practice page. 10 problems, 17 exec cells, 5 predicts, 3 hints, 2
  solutions (each with `inputs`), 8 answer folds. No worlds, as in dewlab
  and in the exemplar `objects-and-classes-practice`. Version
  2026.09.28.1.
- `lessons/one-parent-many-children/*.outputs.json`: what the browser
  checker recorded.
- This file. The probes at the end check the claims in the prose and folds
  that no lesson cell prints. None of those claims is a number or a quoted
  output any more (see "Changes made when the page moved").

## How it was checked

- `npm run check-lessons -- one-parent-many-children
  one-parent-many-children-practice`, without `--write`: no problems,
  except that `lesson:objects-inside-objects` is not in `lessons/` yet.
  That page is being moved in the same batch, so the orchestrator's full
  run checks it. `lesson:when-is-a-breaks` passed, because that page
  reached `lessons/` during this move.
- The browser engine recorded the same outputs, messages and values as the
  native check, for every cell and every solution: no culture, `Console`,
  formatting or stack-trace difference showed up on this page. Values:
  - Game: the starter does not compile (CS1061, expected), so its inputs
    are recorded as not run; the solution gives `"Ada (health 9)"` and
    `"Mira (health 10)"`.
  - Solar system: the starter does not compile (CS1061); the solution
    prints `Refused: Philae cannot burn 5 kg now.` and `Philae (fuel 30
    kg)`, and gives `"Philae (fuel 30 kg)"`, `false`, `true`.
  - Practice 2: the starter gives `"Nobody"` and `"Dune"`; the solution
    gives `"Ada"` and `"Dune"`. Practice 4: the starter gives
    `"Lancelot (health 4)"` and `4`; the solution gives
    `"Lancelot (health 7)"` and `7`.
  - The challenge compiles alone (decision 40), with warning CS0414
    (`_risen` is never used).
- The cells meant to fail record what the prose quotes:
  `a-class-built-on-another-class-3` CS7036 (new in the move),
  `a-method-of-its-own-1` CS0506, `another-kind-of-creature-1` CS0506 then
  CS0272, the two world programs CS1061, and practice
  `where-the-mistake-is-2` CS1503 at line 3. The broken types cells are
  followed by a cell that makes them compile or replaces them, and the
  browser engine records every cell below them as the prose says (the
  cell after `a-class-built-on-another-class-3` has only its own CS0506).
- Warnings recorded: CS0108 in `a-limit-of-its-own-1`, `-2` and `-3`
  (until `-4` writes `Troll` again); practice CS0108 in
  `the-tankers-tank-1` and `-2`; practice CS0114 in
  `an-override-that-is-missing-1` and `-2` only, now that problem is last.
- The probes, run in the browser engine in a scratch lesson (28 September
  2026), printed what the native check printed: P1 `3`, `Grog (health 7)`,
  the refusal, then `Grog (health 7)` twice (so a hit of -1 does nothing);
  P2 `Grog (health 10)`; P3 `Grog (health 20) 20` and `Ada (health 10)
  10`; P4 Grog 14 after the hit and 18 after healing; P5 CS0272 with the
  same text as `another-kind-of-creature-1`; P6 `Grog (health 20) Ember
  (health 5)`; P7 `Mort (health 0)` twice, with CS0414; P8 `Mort (health
  5)`, `Mort (health 0)`, then the refusal; P9 `Lancelot (health 7)`, the
  refusal, `Lancelot (health 7)`; P10 the same three lines as practice
  problem 10, with CS0108; P11 `Ada (health 9)`; P12 `2`; P13 CS7036 for
  `CrewMember.CrewMember(string)`; P14 CS7036 at line 1, column 7, as the
  new lesson cell records.
- Every CS code and message quoted in the prose is copied from the
  recorded outputs. The prose quotes the message and not the
  `file(line,col)` part, except "line 3 of the program" in practice
  problem 8, which is the line the checker recorded.
- No cell reads input, so no cell needs `stdin:`.
- The three links in "Where to read more" returned HTTP 200 on 27 and on
  28 September 2026.
- The page was opened with `npm run serve -- --isolate` in headless
  Chromium: no errors in the console; a kind label and a file name on
  every cell (20 in the game world, 21 in the solar system, 20 in your own;
  17 on the practice page); the world switch shows each world's cells.
  Check on `a-class-built-on-another-class-3` shows `Troll.cs(1,7): error
  CS7036: ...` in the style guide's shape; Run on `a-method-of-its-own-4`
  shows no message from the broken cells above it; Run on
  `a-limit-of-its-own-2` shows the CS0108 warning as `Troll.cs(3,23)`,
  from the cell above; Run on `many-kinds-one-loop-1` prints the four lines
  the prose quotes.

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

## Changes made when the page moved (28 September 2026)

Both pages are now version 2026.09.28.1: the tutorial gained a cell, and
the practice page's order changed which warnings its cells show.

Tutorial:

- **The constructor experiment is a cell.** The draft asked the reader to
  delete the troll's constructor and press Check, and quoted CS7036 in a
  fold that only probe P14 backed. It is now
  `a-class-built-on-another-class-3` (`file: Troll.cs`, `expect: CS7036`):
  `class Troll : Character` with an empty body, introduced as meant to
  fail, with a question before it. The prose after it quotes the recorded
  message and ends with why a child writes a constructor. As in
  `one-class-many-methods`, where probe P1 became `overloading-2`, a
  message the prose quotes now comes from a lesson cell. It also removes
  the draft's worry about a half-edited cell: the reader no longer leaves
  `Troll` broken above the first program.
- **Numbers that no cell printed are gone.** "so 7 / 2 is 3" (probe P1)
  became "as [Dividing](lesson:dividing-in-csharp) shows";
  `grog.TakeDamage(-8)` "passes -4" and quoted the refusal (P1), and now
  "passes half of -8", which the parent's first rule refuses; "Grog took
  half the hit, 6, and went from 20 to 14" (P4) became "Grog took only
  half the hit, and then healed to 18". The loop's first line is quoted,
  `Refused: Ada is down.`, in place of "the refusal for Ada".
- **Decision 27.** Both world tasks now say the program is meant not to
  compile, and quote what the recorded CS1061 names (`'Healer' does not
  contain a definition for 'HealOther'`; the same for `'Lander'` and
  `'Land'`), as the exemplar does.
- **Visual Studio.** A paragraph before the practice link: everything runs
  on the page, nothing needs Visual Studio, a downloaded project of the
  loop has `Character.cs`, `Troll.cs` and `Phoenix.cs` as files of their
  own (decision 38: the last version of each class), and Visual Studio
  lists the methods a child may override after `override` and a space.
- **The next page** is named by its short title in italics, *Overriding*
  (decision 32), since `virtual-and-override` is not in `lessons/` and is
  not in this batch.
- **Wording:** "points at" became "shows"; "healed anyway" became "still
  healed"; "What happens without it?" became "What happens when a child
  class has no constructor?".

Practice page:

- **"An override that is missing" is last** (was problem 6, now 10).
  Decision 30 and `docs/TRANSLATING.md` ("Warnings travel") put a class
  meant to warn last on its page, and the exemplar
  `objects-and-classes-practice` moved its warning problem to the end in
  the same way. Before the move, its CS0114 showed in every cell of
  problems 9 and 10. The problem now says why it is last. The others
  moved up: 7 → 6 (Is it a kind?), 8 → 7 (class or field), 9 → 8 (where
  the mistake is), 10 → 9 (stored, or gone); problem 9's "the `Healer` of
  problem 9" became "problem 8". Cell ids are unchanged.
- **Quoted outputs that no cell printed are gone.** Problem 2's note gave
  the CS7036 message for `CrewMember` (P13); it now names CS7036 and
  points to the tutorial's troll, where the page records it. Problem 4's
  note quoted the refusal for `amount - 2` (P9); it now says the parent's
  first rule would refuse the amount, with a message about negative
  damage. Problem 8's fold said the fix prints `Ada (health 9)` (P11); it
  now says "run the program again". Problem 9's fold said the fix prints
  `2` (P12); it now says the healer keeps its count. Problem 10's fold
  quoted CS0108's message (P10); it now names CS0108, which the tutorial
  records for the troll's `MaxHealth`.
- **Links.** Problem 6's fold links to
  [Composition: objects inside other objects](lesson:objects-inside-objects)
  and [Inheritance: a closer look at "is a"](lesson:when-is-a-breaks), both
  in this batch (the objects-inside-objects draft's notes ask for the
  first). Problem 10's fold names *Overriding*. Problem 9's link to
  `the-moves-you-already-know` had an old title; it now has the page's
  title, *Inside a method: sequence, selection and iteration in a class*.
- **Wording:** the introduction says a problem either says its cell is
  meant not to compile or asks you to guess (as in
  `one-class-many-methods-practice`), since problem 8's predict is about
  where the compiler reports; "Both are good answers" (a verdict) became
  "Either can work"; "passes the amount on" became "gives the amount to
  `Heal`".

## Decisions on the porter's questions

1. **Size.** *Decided: one page.* The course map gives the page size L,
   and says an L entry "says where" to split; this entry names no split.
   A split would also add a lesson id to `courses/foop.yaml`, which this
   move does not edit. A reader sees 20 or 21 cells, one more than in the
   draft, because the CS7036 experiment is now a cell.
2. **The fourth version in the game world is two cells** (`Character` in
   `another-kind-of-creature-2`, the reader's `Healer` in
   `your-class-4--game`). *Decided: keep.* The course map's "FOOP's class
   chain" makes the page that writes a version its source, and the
   `objects-inside-objects` draft already copies "`Character` and
   `Healer`, the fourth version" and, in the solar system, "`Probe` and
   `Lander`". `Character.MaxHealth` no longer compiles after this page;
   that draft uses `MaxHealth` and `TankSize` only inside their classes,
   so it is not affected.
3. **`Probe.Fuel` keeps its private `set`, `Character.Health` gets a
   protected one.** *Decided: keep.* The course map names `protected`
   here as "a field a child can reach and a caller cannot", and the page
   needs it for the phoenix. `Lander` never sets `Fuel`, and
   `keeping-details-inside-an-object` teaches giving code outside a class
   no more than it needs. The `objects-inside-objects` draft copies both
   as they are.
4. **Cell ids.** *Decided: keep them*, with one new id,
   `a-class-built-on-another-class-3`. Decision 26 (types cell keeps the
   task's id, the program is `<id>-program`) and decision 28 (only ids
   that name Python are renamed) cover the rest, and no class has used
   the page.
5. **Forward links.** *Decided by the move's rules.* `when-is-a-breaks`
   and `objects-inside-objects` are in this batch, so practice problem 6
   links to them. `virtual-and-override` is not, so the tutorial and
   practice problem 10 name it *Overriding*, in italics (decision 32).
6. **A negative hit on a troll.** Not settled: see "Open", 1.
7. **Practice problem 2's second constructor.** *Decided: keep.* Decision
   30 lets only the last cell on a page hold a class that does not
   compile, and the second constructor keeps dewlab's run-time surprise
   with the constructor overloading of `one-class-many-methods`. The
   solution note names CS7036, which the tutorial now records.
8. **Practice problem 10 (was 6) and the closer look.** *Decided: keep
   it*, and its fold names *Overriding*. The course map asks this practice
   page for a child without `override`, with CS0114 and CS0108; the
   recorded CS0114 is quoted, and CS0108 is named with the tutorial's
   recorded one. The author of `virtual-and-override` can refer back to
   practice problem 10.
9. **Python asides.** *Decided: keep the one sentence*, in practice
   problem 8's fold, as the exemplar `objects-and-classes` and
   `one-class-many-methods` keep theirs. Whether the course keeps Python
   asides for readers who took PDP in C# is already open for Josh in
   `planning/notes/one-class-many-methods.md` ("Open", 2).
10. **World order.** *Decided: game first.* The course map's entry lists
    "game, solar system, your own", as every FOOP page in `lessons/` does,
    and decision 36 carries the reader's world between pages.

The porter's list under "What should change once the page UI or the
browser checker exists":

- **Messages from cells above.** The page lists them under the program
  with the class cell's file and line (`Troll.cs(3,23): warning CS0108`
  under `a-limit-of-its-own-2`). On the practice page, CS0114 now shows
  only in problem 10's own cells, so CS1503 is the only message in
  problem 8.
- **A reader's half-edited cell.** Gone: the experiment is a cell (above).
  The browser engine leaves out a class that a later cell writes again,
  and a broken class is made to compile by the `Character` below it.
- **Compare with a solution when the starter does not compile.** The
  inputs are recorded as not run. The page's table then says that the
  reader's cell did not reach the inputs, and shows the solution's values
  beside them.
- **Empty cells** are recorded as `empty`.
- **The challenge** compiles alone (decision 40), with CS0414.
- **Cell length** is under "Open".

## Open

For Josh.

1. **A negative hit on a troll** (the porter's question 6). `amount / 2`
   turns a hit of -1 into 0, so `grog.TakeDamage(-1)` does nothing and
   prints nothing (probe P1), where Python's `-1 // 2` is -1 and is
   refused. The prose says "trolls keep both rules too", which holds for
   the health (it never rises) but not for the refusal message. The page
   could leave it, make it a practice problem on C#'s division, or have
   the troll refuse a negative amount before halving. No source settles
   which.
2. **The same class written four times.** `Character` (44 lines) is
   written in `character-so-far`, `a-method-of-its-own-2`,
   `a-limit-of-its-own-3` and `another-kind-of-creature-2`, each time
   with one or two lines changed and marked `// changed`, and again in the
   challenge and on the practice page. Includes, or a way to show only the
   changed lines, would shorten the page a lot (course map, open question
   2).
3. **Decision 30 and broken classes in the middle of a page.** The
   tutorial has three types cells that do not compile
   (`a-class-built-on-another-class-3`, `a-method-of-its-own-1`,
   `another-kind-of-creature-1`), each followed by a cell that replaces
   it or makes it compile. The recorded outputs show that the engine
   handles this, and `one-class-many-methods` raised the same wording
   question ("Open", 3): should decision 30 say "last on its page, or
   replaced by the next class cell"? This move did not edit
   `DECISIONS.md`.
4. **Practice pages and worlds.** `docs/TRANSLATING.md` says "A practice
   page has `practice_for:` and the same worlds as its tutorial". This
   practice page has no worlds and no world variants, like dewlab's and
   like the exemplar `objects-and-classes-practice`, so it follows the
   exemplar. The playbook's sentence may want "if it has world variants".

## Where each number in the prose comes from

After the move, every number and every quoted output in the prose, the
folds and the solution notes is in the recorded outputs. The probes back
claims that quote no output.

| Number, output or claim | Source |
|---|---|
| `Grog (health 3)`, `Grog (health 5)` | `a-class-built-on-another-class-2` |
| CS7036 and its message | `a-class-built-on-another-class-3` (was probe P14) |
| CS0506 for the troll | `a-method-of-its-own-1` |
| `Grog (health 7)`, `Grog (health 9)` | `a-method-of-its-own-4` |
| `grog.TakeDamage(-8)` is refused (no output quoted) | P1 |
| `Grog (health 10)`; the CS0108 message | `a-limit-of-its-own-2` (and `-1`) |
| `new` would not change what `Heal` reads | P2 |
| the long form of the property means the same | P3 |
| `Grog (health 20)`; 10 and 20 are the code's own values | `a-limit-of-its-own-5`; P3 |
| CS0506 and CS0272 for the phoenix | `another-kind-of-creature-1` |
| `Ember (health 0) True`, `Ember (health 5)` | `another-kind-of-creature-4` |
| `ember.Health = 50;`: the CS0272 message | the same text as `another-kind-of-creature-1`; P5 |
| `Refused: Ada is down.`, `Ada (health 0)`, `Grog (health 18)`, `Ember (health 4)` | `many-kinds-one-loop-1` |
| Grog took only half the hit (no number) | P4 |
| game: the CS1061 text; `Ada (health 9)` | `your-class-4-program--game` and its solution |
| solar system: the CS1061 text; the refusal, "cannot burn 5 kg now", `Philae (fuel 30 kg)` | `your-class-4-program--solar-system` and its solution |
| challenge (no number in the prose) | the recorded challenge (CS0414); P7, P8 |
| practice 1: `a vehicle`, `a rover, which is a vehicle` | `which-describe-2` |
| practice 2: `Ada commands the Dune`; CS7036 named | `a-commander-with-no-name-2` and its solution; the tutorial's `a-class-built-on-another-class-3`; P13 |
| practice 4: `Lancelot (health 7)` twice; without `Math.Max` the parent refuses (no output quoted) | `a-knight-in-armour-3` solution; P9 |
| practice 5: `100` and the CS0108 message; `400` | `the-tankers-tank-2` (and `-1`); `the-tankers-tank-4` |
| practice 8: the CS1503 message, line 3 | `where-the-mistake-is-2`; P11 (the fix runs; no output quoted) |
| practice 9: `0` | `stored-or-gone-2`; P12 (the fix keeps the count; no number quoted) |
| practice 10: the three lines and the CS0114 message; CS0108 named, and the same three lines | `an-override-that-is-missing-2` (and `-1`); P10; the tutorial's `a-limit-of-its-own-1` |

## Probes

Each probe is one program: its statements, then its classes. They were
first run with the native check, and on 28 September 2026 in the browser
engine, as a scratch lesson (`node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`), with the same results ("How it was checked").
A class in a probe carries down to the probes below it until one writes it
again (rule 4), so the two probes whose classes do not compile are last.
The CS0108 from P10 is repeated in P11 to P14 for that reason.

Since the move, no probe is the source of a number or a quoted output in
the prose. P14 became the lesson cell `a-class-built-on-another-class-3`;
the numbers from P1, P4, P9, P11 and P12, and the messages from P10 and
P13, were taken out of the prose ("Changes made when the page moved").
The headings below keep the porter's wording, and the practice numbers
in them are the draft's: P9 is problem 4, P10 is now problem 10, P11 is
now problem 8, P12 is now problem 9, and P13 is problem 2.

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
