# many-classes-one-promise: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (FOOP
lesson 16, batch 6, "new", shape tutorial, size M, worlds game, solar
system and your own, covers FOOP-LO3, FOOP-LO4 and FOOP-LO6). No dewlab
page teaches interfaces, so the page is new, and it draws on the three
pages the entry names:

- `when-is-a-breaks` (dewlab and dewsharp): the square that stops being a
  square, and the answer "a parent that promises less, a `Shape` with
  `Area` and no `Stretch`". dewsharp's `when-is-a-breaks` ends by naming
  the interface and sending the reader here, so this page opens from that
  point. `from:` names it.
- `objects-inside-objects` (dewlab's "Two things at once"): the astronaut
  who is a commander and a scientist, and Peggy Whitson. dewsharp's
  `objects-inside-objects`, the page after this one, already refers back
  to "`class Astronaut : ICommander, IScientist`" and to `IShape` with
  `Area()` and no `Stretch`, so this page uses those names.
- `one-parent-many-children-practice` (dewsharp's problem 6, "Is it a
  kind?"): "a moon and a planet ... could be children of one parent,
  perhaps `Body`". That became the abstract class, and the practice page's
  question "Interface or parent class?" keeps the problem's shape.

Files:

- `lessons/many-classes-one-promise/many-classes-one-promise.md`: the
  tutorial, version 2026.09.28.1. 20 `csharp exec` cells: 12 shared (7
  types cells, 5 program cells), 3 in the game world, 3 in the solar
  system, 2 in your own. A reader sees 15 (14 in their own world), which
  is the top of size M. 3 predicts, 4 hints, 2 solutions with `inputs`, 1
  answer fold, 1 "Why this way?" fold, 1 table, 1 challenge.
- `lessons/many-classes-one-promise/many-classes-one-promise-practice.md`:
  the practice page, version 2026.09.28.1. 10 problems, 15 exec cells (7
  types cells, 8 program cells), 5 predicts, 6 hints, 5 solutions (3 with
  `inputs`), 9 answer folds. No worlds, as in the exemplar
  `objects-and-classes-practice` (see "What I decided").
- The two `.outputs.json` files, written by the browser checker.

`npm run check-lessons -- many-classes-one-promise` (which checks the
practice page too) reports no problems: 23 runs on each page. I also
opened both pages in headless Chromium (`lesson.html?sw=off&id=…`, the
server isolating the page) in each world: every types cell is labelled
*types*, every program cell *program*, and the two cells of "your own"
*empty*; the messages the page shows are the ones the prose quotes
(`Program.cs(4,29): error CS1061: ...`, `Circle.cs(1,16): error CS0535:
...`, `Program.cs(5,10): error CS1503: ...`); there were no page errors.

## What the page does, in order

1. **Opening (no heading).** The rectangle and the square again, each a
   class of its own with a `double Area()`. A floor plan wants them in one
   list; the only type they share is `object`, so the program uses a
   `List<object>`. It is meant not to compile (`expect: CS1061`), and the
   prose says so ("a problem in it, on purpose") before asking the first
   predict: *What will appear under the cell?* (12 and 9; does not compile;
   12 and then an exception). The message is shown whole, and its first
   half explained: the compiler checks the call against the variable's
   type, as on `virtual-and-override`. A paragraph for Python readers
   (Python finds the method on the object when the line runs). Why a
   parent class is not the answer: what would its `Area` do, and a class
   has only one parent.
2. **An interface: a promise in code.** *Interface* defined in the words
   `when-is-a-breaks` already used ("a list of methods that a class
   promises to have, with no code of its own"). One types cell holds
   `IShape` and both classes again with `: IShape` (rule 4 named). The
   same program with `object` changed to `IShape` prints `12` and `9`.
   *Implements* defined ("to implement an interface is to keep its
   promise", the words `mixed-programming-with-objects` uses). Three facts:
   the capital *I*, an interface is a type (rule 2 extends to it), and it
   has no objects of its own. A fold, *What each line does*: no body, no
   `public` (public without saying so), the same colon as a parent, no
   `override`, and `int` to `double`.
3. **The compiler checks the promise.** A `Circle : IShape` with no `Area`
   (`expect: CS0535`, "meant to fail. Press Check"), then the circle with
   its `Area`, which replaces it (rule 4), so the cells below compile. The
   three shapes in one loop that prints `{shape}` and the rounded area;
   the second predict: *What will the first line print?* (`Rectangle: 12`,
   `IShape: 12`, does not compile). The answer: C# asks the object for its
   text, and every object has `object`'s members, whatever the type of its
   variable. An invitation to break `Area` two ways (`area`, and no
   `public`) and read the messages, then press **Reset**.
4. **One class, several promises.** Peggy Whitson. *Multiple inheritance*
   defined, and C#'s answer: one parent class, any number of interfaces.
   `IScientist` (with a property, `string Name { get; }`, so the page
   extends the definition to "methods and properties", the words
   `testing-what-a-class-does` uses when it points back here) and
   `ICommander`; `CrewMember`, `Astronaut : CrewMember, IScientist,
   ICommander`, and `Rover : IScientist` (Curiosity and its laser). The
   program prints three lines. One object has many types; an invitation to
   put both in a `List<ICommander>`; an inherited property keeps a
   promise.
5. **An abstract class: a parent that is only a parent.** `Body`, from the
   inheritance practice page. *Abstract class* and *abstract method*
   defined; the page pays off `one-parent-many-children`'s "(`abstract` is
   another way to allow it, which a later page meets)". `Planet` and
   `Moon` override `Orbits`; `Body`'s `ToString` calls it. The third
   predict: *What will the second line print?* A pointer to practice
   problem 5 for `new Body(...)`. Then *An interface, or a parent class?*:
   a table, and when to choose each ("is a" and "can do"). A `dl-why`
   fold: default interface methods exist since C# 8, and this course does
   not use them.
6. **Promises that C# already has.** `IComparable<T>` named, in prose:
   why `Sort` works on `List<string>` and `List<int>`. Practice problem 4
   makes a class keep it.
7. **Your turn**, in each world: a promise and one class that keeps it are
   given; the reader makes a second class, not a kind of the first, keep
   it. Game: `IDamageable` (`int Health { get; }`, `TakeDamage`),
   `Character`, and a `Door`. Solar system: `ICanPhotograph` (`int Photos
   { get; }`, `Photograph`), `Probe`, and the Hubble `Telescope`. Your own:
   an interface of the reader's own and two classes. Each program adds the
   new object with `List.Add`, so it starts with one message,
   `Argument 1: cannot convert from 'Door' to 'IDamageable'` (decision 27:
   `expect: CS1503`, and the prose quotes the message).
8. **Looking back.** A question ("is" and "can do"); the challenge adds
   `double Perimeter();` to `IShape` and asks how many messages the
   compiler will show; the Visual Studio light bulb, *Implement
   interface*; the practice page; the next page, `objects-inside-objects`.
9. **Where to read more.** Microsoft's *Interfaces* page (fundamentals),
   the `abstract` keyword reference, and the `IComparable<T>` API page. I
   read the first two (fetched 28 September 2026) and described what is
   on them.

The practice page: 1 what an `IShape` variable lets you see (predict,
CS1061, a one-word fix); 2 interface or parent class, five pairs
(explain); 3 the birds that fly, `ICanFly` for a sparrow and a bat and not
the penguin (make; `expect: CS0246`); 4 the weakest first,
`IComparable<Character>` (fix; `expect: exception`); 5 a body that is only
a parent (predict, CS0144, then make `DwarfPlanet` for Ceres); 6 a child
keeps its parent's promise (predict: a troll in a `List<IDamageable>`
takes half); 7 from earlier, *Inheritance*: a `protected set` (predict,
CS0272); 8 from earlier, *Methods and overloading*: `Weigh(2)` picks the
`int` overload (predict); 9 from earlier, *Designing classes*: enum, child
classes or an interface for kinds of potion (explain); 10 a promise
forgotten, a `Barrel` with no `Health` property (fix; CS0535), last on the
page because its class does not compile.

## What I decided, and why

- **The teaching is not in the game world.** The style guide says a page
  teaches in its first world. The course map's entry names `IShape` for
  the teaching, and `IDamageable` and `ICanPhotograph` for the worlds, so
  the shared sections use shapes (from `when-is-a-breaks`), the astronaut
  (from `objects-inside-objects`) and `Body` (from the inheritance
  practice page), and the worlds get the task. `when-is-a-breaks` and
  `virtual-and-override` also teach outside the worlds. See "Open".
- **The opening fails on purpose.** A `List<object>` with a loop that calls
  `Area` is the shortest way to show why C# needs an interface where
  Python needs nothing: the compiler checks the call against the
  variable's type. It ties to `virtual-and-override`, where the variable's
  type decided which method ran. The prose says there is a problem on
  purpose, as `compiler-errors` does, and still asks what will appear.
- **`double Area()` from the first cell**, so that the circle can join
  without changing `IShape`. Whole areas print as `12` and `9`, which the
  fold explains.
- **CS0535 as a mistake on purpose, then a rewrite.** A types cell that
  does not compile stops every cell below it (decision 30), unless a later
  cell writes the same type again, which blanks it out for the cells below
  (decision 16). The broken `Circle` is followed at once by the working
  one, the pattern `one-parent-many-children` uses for CS0506. The probes
  confirmed that the cells below compile.
- **`List.Add` in the world programs, not a collection initializer.** With
  `new List<IDamageable> { ada, door }` the compiler gives two messages,
  and the first is CS1950 ("The best overloaded Add method ... has some
  invalid arguments"), which a Level 5 reader cannot use. With
  `room.Add(door);` it gives one: CS1503, `cannot convert from 'Door' to
  'IDamageable'`, which names both the class and the promise.
- **Compact classes in the world tasks, not the fourth version.** The page
  makes no version of the class chain (the entry names none). The given
  `Character` has a name, health, `ToString` and `TakeDamage` only, and
  the given `Probe` has a name, fuel, a photo count and `Photograph`. They
  are recognisably the world's classes, and short enough that the reader
  can see the interface at work. `virtual-and-override` made the same
  choice ("a smaller `Character` than the one on that page").
- **The given class and the reader's class are two cells**
  (`your-turn-1-character--game`, `your-turn-1--game`), in the id shape
  `one-parent-many-children` uses (`your-class-4-lander--solar-system`).
  The reader's cell keeps the plain id, because it holds their work
  (decision 26). The solution writes only the reader's class again.
- **Three predicts**, each where C# does something a reader may not
  expect: the compiler refusing what Python runs; the class name, not
  the interface's, from `{shape}`; an abstract method called from the
  parent's own code.
- **Multiple inheritance is described, not run.** `class Astronaut :
  Commander, Scientist` is CS1721 (probed), but showing it needs two
  leftover classes that would carry down to every cell below, or a class
  that does not compile. `one-parent-many-children` already says that a
  class has one parent. See "Open".
- **`IComparable<T>` is named in prose** in the tutorial, as the entry
  says, and made in the practice page (problem 4), which the entry asks
  for. The page does not show the exception twice.
- **Explicit types where the type is the lesson.** `var` for a line that
  makes a list or an object (FOOP after `the-moves-you-already-know`), but
  `IShape tile`, `foreach (IShape shape ...)` and `foreach (Body body
  ...)`, because the type of the variable is what the page is about.
- **The practice page has no worlds.** `docs/TRANSLATING.md` says a
  practice page has the same worlds as its tutorial; the FOOP exemplar
  `objects-and-classes-practice`, and every FOOP practice page in
  `lessons/`, has none. The exemplar wins (TRANSLATING's own rule).
- **Practice problem 10 is last** because its class does not compile. Its
  program cell expects CS0535 too, which the compiler reports for the cell
  above.
- **Facts.** Peggy Whitson was the first woman to command the ISS, and is
  a biochemist. Curiosity has a laser (ChemCam) that it fires at rocks.
  Hubble has no rockets, and turns with reaction wheels on solar power;
  Voyager turns with small thrusters. Ceres is about 940 km wide and is
  called a dwarf planet. Europa's width (3122 km) is the figure
  `objects-inside-objects` and `mixed-programming-with-objects` already
  use; Jupiter's (139820 km) is its mean diameter, rounded, which no other
  page uses.

## What I left out

- Explicit interface implementation, interface inheritance (`interface
  IShape : IDrawable`), generic interfaces beyond naming
  `IComparable<T>`, `IEnumerable<T>`, default interface methods (a fold
  names them), static abstract members, and `is` and casts from an
  interface variable back to a class.
- Abstract properties (`public abstract int MaxSpeed { get; }`): the page
  shows an abstract method only.
- A cell for CS1721 (two parent classes), CS1722 (the parent after an
  interface), CS0737 (a method that is not public) and CS0738 (a different
  return type). The reader meets CS0737 by the tutorial's invitation to
  remove `public`; the others are only in the probes.

## Probes

Run in the browser engine in a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), to
choose cells and to check claims that the prose makes without quoting a
recorded output:

- `class Astro : Commander, Scientist` is `error CS1721: Class 'Astro'
  cannot have multiple base classes: 'Commander' and 'Scientist'`. (The
  tutorial: "the compiler refuses the class".)
- `class Astro2 : IShape, Base1` is CS1722, `Base class 'Base1' must come
  before any interfaces`. (The tutorial: "the parent class comes first".)
- `double Area()` without `public` is CS0737, `'Hexagon.Area()' cannot
  implement an interface member because it is not public`; `int Area()`
  is CS0738, `... does not have the matching return type of 'double'`.
- `new IShape()` is CS0144, `Cannot create an instance of the abstract
  type or interface 'IShape'`. (The tutorial: "`new IShape()` does not
  compile"; the practice page: "gives the same error, CS0144".)
- A public field `Name` does not keep `string Name { get; }`: CS0535.
  (Practice problem 10: "a field with the same name would not keep the
  promise either".)
- A child of the abstract `Body` without `Orbits` is CS0534, `'Star' does
  not implement inherited abstract member 'Body.Orbits()'`. (The
  tutorial and practice problem 5: "does not compile".)
- `new List<ICommander> { peggy, curiosity }` is CS1950, then CS1503
  `cannot convert from 'Rover' to 'ICommander'`. (The tutorial's
  invitation, which asks the reader which one the compiler refuses.)
- A broken types cell followed by a cell that writes the same class again:
  the cells below compile. (The CS0535 circle.)

## For other pages (not done here: the brief allows only these files)

- `courses/foop.yaml`: the `planned:` line for `many-classes-one-promise`
  can go now that the page is in `lessons/` (`docs/TRANSLATING.md`,
  checklist). It does no harm meanwhile: the lesson's own title takes
  over.
- Pages that name this one in italics, by decision 32, can now link to it:
  `when-is-a-breaks` ("The next page, *Interfaces*, writes one."),
  `objects-inside-objects` ("*Interfaces*, the page before this one"),
  `testing-what-a-class-does` ("As on *Interfaces*"), and
  `your-world-playable` ("*Interfaces*, where several classes keep one
  promise"). A search for `*Interfaces*` finds each.
- `mixed-programming-with-objects`, problem 8, teaches `IComparable<Moon>`
  as if for the first time ("To *implement* an interface is to keep its
  promise"), with the same exception this page's practice problem 4
  shows. Its hint could now point back here, or the problem could move to
  something the practice page does not do.
- `objects-inside-objects` says an interface is "a list of methods that a
  class promises to have"; this page ends with "methods and properties".
  Both are true where they stand.

## Open

Questions only Josh can settle.

1. **Which world teaches.** The style guide says a page teaches in its
   first world, and the course map's entry names `IShape` for the
   teaching. The page teaches with shapes, an astronaut and planets, and
   gives the worlds the task. Is that acceptable for a FOOP tutorial, or
   should the shared sections be told in the game world (`IDamageable` for
   characters, doors and barrels), with shapes only as the link back to
   `when-is-a-breaks`?
2. **The class chain.** This page makes no version of a world's class, and
   its world tasks use compact stand-ins. Should the chain gain an
   interface here (for example, the fourth version of `Character` with
   `: IDamageable`), so that `objects-inside-objects` and the later pages
   carry it? That would change the "so far" cells of every later page.
3. **Size.** A reader in the game or the solar system sees 15 cells, the
   top of M. The abstract class is the part that could move: to its own
   closer look, or to `objects-inside-objects`. Is the page too long for
   one hour at Level 5?
4. **Multiple inheritance as a cell.** The descriptor asks for
   "inheritance, single and multiple". The page says that C# refuses two
   parent classes, and shows one parent with two interfaces, but it does
   not run CS1721. Is a sentence enough for the exam's Section A, or do
   you want a cell, with the cost of a class that does not compile (last
   on a page, or followed by a rewrite)?
5. **Default interface methods.** The page defines an interface as having
   "no code of its own", the definition `when-is-a-breaks` already gave,
   and a `dl-why` fold says that C# 8 allows code in an interface. Keep
   the fold for the teacher who knows, or remove it so that a Level 5
   reader meets one clean definition?
6. **"Is a" and "can do".** The page uses both phrases to choose between a
   parent class and an interface. Is "can do" a phrase you want the course
   to use, beside "is a" and "has a" (`objects-inside-objects`)?
7. **`IComparable<T>` in two places.** Practice problem 4 here and problem
   8 of `mixed-programming-with-objects` are the same exercise with
   different classes (characters, moons). Keep both, or change the mixed
   set's problem?

## Review

Reviewed on 28 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one (`one-parent-many-children`
and its practice page, `virtual-and-override`, `when-is-a-breaks`, and
the exemplars `objects-and-classes` and `first-steps`), once as a teacher
against the course map's entry, and then line by line against the
checklists in `docs/TRANSLATING.md` and the style guide. The page does
what its entry asks: `IShape` with `Area()` for a rectangle and a square
that neither builds on the other, a `List<IShape>`, one parent class and
several interfaces for the astronaut, an abstract class beside an
interface with when to choose each, `IDamageable` and `ICanPhotograph` in
the worlds, and `IComparable<T>` named. The practice page has the three
problems the entry lists (CS0535, interface or parent class,
`IComparable<T>`). It fits between `when-is-a-breaks`, whose last
paragraph sends the reader here with the same definition of an
interface, and `objects-inside-objects`, which points back to `IShape`
and the astronaut. Every number and every quoted message in the prose,
the folds and the solution notes is in the two outputs files.

No cell's code changed. Only prose, hints and solution notes did, so
neither `version:` changed, and both outputs files are as the writer
recorded them. The final `npm run check-lessons -- many-classes-one-promise`
(no `--write`): 23 runs on each page, 46 runs in 8.9 s, no problems.

### Probes

Run in the browser engine in a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`), for
the claims the edits below add or reword:

| Probe | Result |
|---|---|
| `new List<IShape> { new Rectangle(3, 4), new Square(3), new IShape() }` | one message, CS0144 `Cannot create an instance of the abstract type or interface 'IShape'` |
| a third shape, `new Square(5)`, in the same list | runs: `12`, `9`, `25` |
| `var commanders = new List<ICommander>();` with `commanders.Add(peggy);` and `commanders.Add(curiosity);` | one message, CS1503 `Argument 1: cannot convert from 'Rover' to 'ICommander'` (7,16) |
| the working `Circle` with `area` in place of `Area` | CS0535, the same message as the first `Circle` |
| the working `Circle` with no `public` on `Area` | CS0737: the CS0535 sentence, then `'Circle.Area()' cannot implement an interface member because it is not public.` |
| an abstract `Shape` with an abstract `Area`, and two children | runs: `12`, `9` |
| `fliers.Add(new Penguin());` | CS1503 `cannot convert from 'Penguin' to 'ICanFly'` |
| `List<string>.Sort()` on Mira, Ada, Grog | `Ada, Grog, Mira` |

The CS0737 probe shows that the tutorial's question "Which parts of the
message change?" has an answer: nothing changes for `area`, and for a
missing `public` the code changes and a second sentence is added. It
stays.

### Changed in the tutorial

1. **The opening names the answer from `when-is-a-breaks` in its own
   words.** "Give the two classes something that both of them can
   promise: an area, and nothing to stretch" became "a promise that both
   classes can keep: an `Area`, and no `Stretch`", the page's own verb
   (*keep a promise*).
2. **The first failing cell uses the style guide's words.** "Nothing
   runs." became "It does not compile, and nothing runs."
   (`#the-compiler`, the three outcomes).
3. **"Searches", not "looks for"** (the Python paragraph and CS0535),
   the verb `virtual-and-override` uses ("C# searches `Potion` for an
   `override`"). A vague clause, "and it knows nothing more", went.
4. **Say the thing first:** "The interface says that every `IShape` has
   an `Area`, so the compiler lets the loop ask for it." (It was
   "because ..., so ...".)
5. **"Three more things are true of every interface"** became "Three more
   things to know about an interface". The capital *I* is a habit, not a
   rule, and the bullet itself says that C# does not need it.
6. **An invitation before the line-by-line fold.** The style guide and the
   course map put a fold after an invitation to change something, and
   this one came straight after the three facts. The reader now adds a
   square with sides of 5, then tries `new IShape()`, so the claim "`new
   IShape()` does not compile" is something they can see (probe).
7. **`int` to `double`, in the words of `types-and-their-sizes`.** "Every
   whole number is also a number with a decimal point" became "every
   `int` fits in a `double`", with a link to that page, which named the
   conversion that C# makes by itself.
8. **The members of an interface.** "The methods (and, as a later section
   shows, the properties) that it lists" became "the things it lists:
   here, one method, `Area`". The property section extends it later, as
   before.
9. **A class does not run.** "In Python, a class like this one runs until
   a loop reaches it" became "a program with a class like this one runs
   until a line asks a circle for its area, and only then stops", and
   "finds it" names what it finds: the missing method.
10. **"The `Circle` cell just above"** was two cells above, with the
    program between. It is now "the second `Circle` cell, above the
    program".
11. ***Multiple inheritance* is defined as what it is.** "A class with
    more than one parent class is called multiple inheritance" named a
    class as a technique. It now reads "To build one class on two or more
    parent classes is called *multiple inheritance*. Some languages allow
    it, Python among them. C# does not."
12. **"One object can have many types"** contradicted
    `virtual-and-override` ("Every object has a class, fixed when `new`
    makes it"; a variable has a type). It now says "An object has one
    class, but a variable of several types can hold it."
13. **The `List<ICommander>` invitation leads to a readable message.**
    "Add a line that puts both of them in a `List<ICommander>`" invites a
    collection initializer, whose first message is CS1950, which the
    writer had already judged unreadable for the world tasks. The reader
    now makes the list and uses `Add` twice, and the only message names
    `Rover` and `ICommander` (probe).
14. **The abstract class.** The definition is two sentences in place of a
    fragment after a colon, and one long sentence about the compiler
    checking `Orbits` is two. "Share a parent that holds their fields,
    their constructor" became "the constructor that stores them", because
    `one-parent-many-children` says that constructors do not pass from a
    parent to a child.
15. **The shapes get their answer.** The opening asks "A parent class
    could say it. But what would the parent's own `Area` do?", and the
    abstract section then shows a parent whose method needs no code. A
    reader would ask why the shapes did not get an abstract `Shape`. A
    paragraph under the table now says that it would compile (probe), but
    the shapes share no fields and no code, so the parent would hold only
    a promise and use each shape's one parent class.
16. **The `Sort` paragraph follows its own logic.** "`Sort` was written
    long before your classes. So how does it know how to compare two
    strings?" asked about strings with a reason about the reader's
    classes. The question is now about strings and numbers, and the
    sentence about your classes moved to the paragraph about your
    classes.
17. **The world classes say they are small.** The game's `Character` and
    the solar system's `Probe` are compact stand-ins, not the chain's
    fourth version, and a reader who knows the fourth version would
    notice. Each task now says "It is a smaller `Character` [`Probe`]
    than the one on *Inheritance*, with only what this task needs", the
    sentence `virtual-and-override` uses.
18. **"Both promises" became "both members".** The page calls the
    interface one promise ("`IDamageable`, a promise to have a `Health`
    and a `TakeDamage` method"), so the solution notes say "`Door` now
    has both members of `IDamageable`, so it keeps the promise", and the
    same for `Telescope`. "Really" went from "what it really shares".
19. **"One same thing" became "the same thing"** (the table's paragraph,
    the "your own" world, practice problem 2), and the "your own" task
    says what to do in the loop: "call the interface's method on each of
    them".
20. **The challenge and the next page.** "So they come last here" names
    what comes last: the interface and the classes. "*Composition: objects
    inside other objects* puts objects inside other objects" repeated its
    own title, and now says "builds classes whose fields hold other
    objects".
21. **Where to read more, checked against the pages (28 September
    2026).** The *Interfaces* page's first example is `IEquatable<T>`
    with `string?`, tuples and `is not null`, so the entry now sends the
    reader to *Declare an interface* and *Implement an interface* (an
    `ILogger` kept by two classes), and names the part *Interfaces vs.
    abstract classes*. The `abstract` entry was accurate (`Vehicle`,
    `Car`, `Boat`, `Move`), and now also says that its programs start in
    a `static void Main` inside a class, as `virtual-and-override`'s entry
    does. The `IComparable<T>` entry sent the reader to the example
    first, which sorts temperatures with a `SortedList` and four
    overloaded operators. It now sends them to *Remarks*, which says that
    `List<T>.Sort()` calls `CompareTo` and has the table of what it
    returns.

### Changed in the practice page

22. **Problem 3.** The second hint said "`Bat` has no parent", which the
    tutorial's own `object` paragraph contradicts. It now says "`Bat`
    names no parent". The solution note's "On that page" had no page
    before it in the note; it is now "On the closer look at "is a"".
23. **Problem 4.** A stray comma went ("... about characters that nobody
    has told it?"). The fold said that `Sort` asks "through the interface
    `IComparable`", while the hint and the solution use
    `IComparable<Character>`. It now says that the message names
    `IComparable`, an older form of the same promise without the angle
    brackets, and that `int` and `string` keep both forms.
24. **Problem 5** says where to write `DwarfPlanet` (the first cell, under
    `Planet`: a first step anyone can take), and its solution note ends
    with the course's usual two sentences on why the class comes after
    the statements, and that the copy replaces the reader's (rule 4).

### Checked, and left as it was

- The three predicts in the tutorial and the five in the practice page:
  each question about one line names it, no option is marked, and the
  options for a cell that does not compile say so in words the page's
  matcher (`web/page/guess.js`) counts. "9, and then a message from the
  compiler" (practice problem 1) does not count as "does not compile", as
  it should not: it guesses that the program runs first.
- The exception report's line "It was caused by
  System.ArgumentException: ..." is the page's own wording
  (`web/page/cell.js`), as practice problem 4 quotes it.
- **Reset** exists on every cell (`web/page/cell.js`), as the tutorial's
  invitation says.
- `NotImplementedException` and `throw`, in the Visual Studio paragraph,
  were taught on `from-a-description-to-classes`.
- Every task is a question or an invitation; each cell meant to fail has
  `expect:` and prose that says so before the run; each program cell
  makes its own objects; hints wait for an attempt and the first one
  asks a question; the solutions and `inputs` sit under the cells that
  run; no verdict words, phrasal verbs or idioms; Irish spelling in the
  prose (*centre*), with Microsoft's title keeping *behavior*.

### Still open for Josh

The writer's seven questions under "Open" stand; the review settled none
of them. One more:

8. **Worlds on practice pages.** `docs/TRANSLATING.md` says a practice
   page has the same worlds as its tutorial, and every FOOP practice page
   in `lessons/`, the exemplar's included, has none. This page follows
   the pages. The playbook or the pages should change, and that is a
   choice for Josh.

### For other pages (not done here)

- `objects-inside-objects` writes `class Astronaut : ICommander,
  IScientist`; this page writes `class Astronaut : CrewMember,
  IScientist, ICommander`. Both are true where they stand, but a reader
  who compares them may ask where `CrewMember` went. That page could
  name it, or say "for example".
