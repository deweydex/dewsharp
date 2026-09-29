# virtual-and-override: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (FOOP
lesson 14: "new", shape "closer look", covers FOOP-LO3, worlds none, size
S, batch 5, depends on `one-parent-many-children`). It draws on dewlab's
`one-parent-many-children` (its troll, which halves a hit through
`super()`) and on dewlab's `when-is-a-breaks` (the shape of a closer look:
two ideas that cannot both be true, an experiment, why the other idea is
easy to believe, where else it happens, one thing to read). `from:` names
`one-parent-many-children`, the source of the troll. There is no practice
page: a closer look has none (course map, "Practice pages and mixed
sets").

A first run of this task left the lesson and its outputs file in
`lessons/virtual-and-override/`, and no notes. This run read that draft
against the course map, the style guide, `docs/TRANSLATING.md` and the
pages around it, ran its claims, and changed its prose only. No cell's
code changed, so `version:` stays `2026.09.28.1`, and the outputs file
written again with `--write` is byte for byte the same as before.

Files:

- `lessons/virtual-and-override/virtual-and-override.md`: the lesson.
  Seven exec cells (four types cells, three program cells), no worlds, no
  `var`. Two predicts (both `choice`, both about the second line), one
  hint, two solutions (no `inputs`, so each shows as a fold with no
  Compare button), one table, no challenge.
- `lessons/virtual-and-override/virtual-and-override.outputs.json`: what
  the browser checker recorded (nine runs: seven cells and two solutions).
- `planning/notes/virtual-and-override.md`: this file.

`npm run check-lessons -- virtual-and-override` reports no problems.

## What the page does, in order

1. **Opening.** Points back to the troll on
   `one-parent-many-children`, and to the CS0506 it met there, then asks
   what happens with neither word. Idea A: a child's method with the same
   name replaces the parent's, and the two words are only for people who
   read the code. Idea B: it replaces it only with `virtual` in the parent
   and `override` in the child; otherwise the type of the variable
   decides.
2. **An experiment.** A small `Character` with a non-virtual
   `TakeDamage`; a `Troll` whose `TakeDamage` has no `override` and calls
   `base.TakeDamage(amount / 2)`; a program with `Troll grog` and
   `Character brak = new Troll(...)`, each hit for 7. The page says why a
   `Character` variable can hold a troll, links to "Many kinds, one loop",
   and says that a variable has a type and an object has a class. Predict:
   "What will the second line print?" The run: `Grog (health 7)`, `Brak
   (health 3)`, and warning CS0108, quoted as the page shows it. *Warning*,
   *inherited member* and *hides* are defined. Why the variable decides:
   without `virtual` the compiler chooses before the program runs; with
   it, the object decides when it runs. The reader adds the two words; a
   hint and a solution (`Brak (health 7)`, no warning).
3. **Why idea A is easy to believe.** It is how Python works (dewlab's
   three-line troll, as code to read). C# has two types that could decide.
   The two ideas differ only where a parent-typed variable holds a child:
   a list element, a loop variable, a parameter. Three reasons for the two
   words, the third being a parent class that later gains a method with
   the same name.
4. **Where else it happens.** *Hiding on purpose*: the same troll with
   `new`; the same two lines, no warning. When `new` is for, and *library*
   defined. *A warning as a clue*: a `Potion` whose `ToString` has no
   `override` (CS0114); a predict on the second line (`Potion`); why
   `Console.WriteLine` and `$"..."` find `object`'s `ToString`; the reader
   adds `override`, with a solution. A pointer to practice problem 10 on
   `one-parent-many-children-practice`, the same case with a rover. *The
   words, side by side*: a table of five cases.
5. **Closing.** Nothing needs Visual Studio; next, `when-is-a-breaks`;
   Where to read more.

## What I decided, and why

1. **The draft's cells and ids stay.** The ids follow `when-is-a-breaks`,
   the other closer look in this batch: `<section>-1-<class>` for each
   types cell and `<section>-1-program` for the program under them. No
   class has used the page, so nothing saved is at stake either way.
2. **Seven cells, where the map says "three or four".** The map counts
   programs; the rules of the road put each class in a types cell above
   the program that uses it, which makes the experiment three cells and
   each "where else" two. Seven is under the map's eight for size S.
   `when-is-a-breaks` made the same choice for the same reason (its
   notes, question 2).
3. **A small `Character` of its own, not the class chain's.** The chain's
   fourth version (end of `one-parent-many-children`) already has
   `virtual` on `TakeDamage`, and carries `MaxHealth`, `IsDown` and `Heal`,
   which the experiment does not need. The page says the class is smaller
   and that its `TakeDamage` has no `virtual`. It leaves the chain as it
   is: this page makes no version of it.
4. **Explicit types, and the page says why.** FOOP uses `var` from
   `the-moves-you-already-know` on, but here the variable's type is the
   whole experiment, so each is written out, and one sentence says so.
5. **Two predicts.** The experiment's and the potion's are the two places
   a guess is interesting, and each asks about one named line, with the
   output itself among the options. The program under *Hiding on purpose*
   is the experiment's program again, so it asks "What do you think `new`
   changes?" in prose. A third predict would have put a guess on every
   program cell on the page (`#how-a-page-teaches`).
6. **Warnings are quoted as the page shows them**, in a `console` fence
   with the file, line and column (`Troll.cs(7,17): warning CS0108: ...`),
   as `equals-three-ways` does. The line, column, code and message come
   from the outputs file; the file name is the cell's `file:`, and the
   page showed exactly these two lines, above the output, in headless
   Chromium (see "How it was checked").
7. **"Why idea A is easy to believe" uses Python only.** The course map
   says "Python works that way". The draft also named Java; I removed it,
   because one comparison is enough, it cannot be run here, and a Level 5
   reader is more likely to know Python (FOOP's first series is for
   readers who know Python). The Python lines are dewlab's own troll.
   Their claim (the troll's method runs whatever holds it) was checked
   with `python3`: both trolls print `(health 7)`.
8. **The third reason for two words names no warning code.** The draft
   said "the compiler warns, CS0108". Probes show that it depends on the
   new method: a parent that gains a non-virtual method gives CS0108, and
   one that gains a `virtual` method gives CS0114. So the page says only
   that the compiler warns.
9. **The two "where else" cases are the map's**: `new` on purpose, and a
   warning as a clue. The clue is a `ToString` with no `override`, because
   every reader has written `override string ToString()` since
   `objects-and-classes`, and it is the one case the experiment did not
   try (a `virtual` parent, a child with no word). `object` as every
   class's parent was taught on `one-parent-many-children`, and the page
   says so. The potion is the last class on the page (decision 30); the
   experiment's troll warns too, but the troll under *Hiding on purpose*
   replaces it (rule 4), so its warning reaches no cell below that.
10. **The prose after *Hiding on purpose* works whatever the reader did
    above.** It says Brak "took the whole hit again, as it did in the
    experiment before you changed it". In the browser, with `virtual` and
    `override` typed into the experiment's two classes, the experiment
    prints `Brak (health 7)` and the hiding program still prints `Brak
    (health 3)` with no warning (a `new` method under a `virtual` one).
11. **A hint on the experiment, none on the potion.** The experiment's
    program runs without an error, so its hint waits for `after: 2 runs`
    and asks a question. The potion's warning names its own fix ("add the
    override keyword"), so a hint would only repeat it.
12. **The table is a summary**, for a teacher and for a reader coming
    back. Each row is backed by a cell on this page, a cell on
    `one-parent-many-children`, or a probe (see "Where each number and
    message comes from").
13. **"The inheritance page"**, after the first link, in place of the
    draft's "that page", which became unclear after several paragraphs.
    The troll is "it", as `one-parent-many-children` calls Grog.
14. **Plain words.** "goes on", "goes through" and "looks in/at" became
    "adds ... to", "uses", "searches" and "asks"; the draft's fragment
    "Rarely." became "You will not want it often."; "by accident" became
    "unless you say so"; "in play" and "in the way" went.
15. **Next points to `when-is-a-breaks`**, the next page in reading
    order, as that page's notes asked ("If it ends with a "Next" line, it
    should point here").
16. **Where to read more** is one Microsoft page, *Knowing When to Use
    Override and New Keywords* (HTTP 200 on 28 September 2026), which runs
    this page's experiment with `BaseClass`, `DerivedClass` and `bcdc`,
    and its companion *Versioning with the Override and New Keywords*
    (HTTP 200), which gives the third reason. The companion says CS0108
    for a base class that gains a `virtual` method; the compiler gives
    CS0114 for that (probe `parent-gains-a-virtual-method`), so the page
    says so in two sentences. See "Open", 1. *(The review dropped the
    companion page and its two sentences: see "Review", R9.)*

## What I left out

- `abstract` and `sealed`. `abstract` is for `many-classes-one-promise`
  (its entry shows an abstract class beside an interface); `sealed`
  (a class, or `sealed override`) is not in the map or the descriptor.
- The words *compile time*, *run time*, *static* and *dynamic binding*,
  and *polymorphism* again. The page says "before the program runs" and
  "when the program runs"; *polymorphism* was named on
  `one-parent-many-children`.
- A cast, `((Character)grog).TakeDamage(7)`, which would show the hidden
  method a second way. The `Character` variable already does it.
- Virtual properties. `MaxHealth` on the inheritance page was the
  example, and the table's rows hold for properties too; the page does
  not say so.
- The overload trap on Microsoft's versioning page (`DoWork(double)`
  chosen over an `override DoWork(int)`), which is further than FOOP goes.
- A cell for CS0506. The inheritance page runs it (twice); the opening
  names it and the table points there. Probe `override-without-virtual`
  gives it in this page's classes too.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| two trolls with 10 health, hit for 7 | the code of `an-experiment-1-program` |
| `Grog (health 7)`, `Brak (health 3)`; "the whole hit of 7" | `an-experiment-1-program`, recorded |
| `Troll.cs(7,17): warning CS0108: 'Troll.TakeDamage(int)' hides ...` | `an-experiment-1-troll` and `an-experiment-1-program`, recorded (line 7, column 17, message); file name as the page showed it |
| "Above the output, the page shows a warning" | the page in headless Chromium (message list before the console) |
| the troll on the inheritance page had the same warning for `MaxHealth` | `one-parent-many-children.outputs.json`, `a-limit-of-its-own-1` (CS0108) |
| CS0506 without `virtual` | `one-parent-many-children.outputs.json`, `a-method-of-its-own-1` |
| solution: `Grog (health 7)`, `Brak (health 7)`, no warning | the solution of `an-experiment-1-program`, recorded (no diagnostics) |
| Python: the troll's method runs whatever holds it | `python3` with dewlab's classes: both trolls `(health 7)` |
| a list element, a loop variable and a parameter find the parent's method | probe `hidden-in-a-list-and-a-parameter` (`Grog (health 3)`, `Brak (health 3)`) |
| a parent that gains a method: the compiler warns | probes `parent-gains-a-method` (CS0108) and `parent-gains-a-virtual-method` (CS0114) |
| `new`: `Grog (health 7)`, `Brak (health 3)`, no warning | `hiding-on-purpose-1-program`, recorded (no diagnostics) |
| the same after the reader's fix above | the page in headless Chromium, with `virtual` and `override` typed in; and probe `virtual-then-new` |
| `a potion of healing`, `Potion`, `You find Potion.` | `a-warning-as-a-clue-1-program`, recorded |
| `Potion.cs(10,19): warning CS0114: ...` | `a-warning-as-a-clue-1-potion` and `-program`, recorded; file name as the page showed it |
| solution: `a potion of healing` twice, `You find a potion of healing.`, no warning | the solution of `a-warning-as-a-clue-1-program`, recorded |
| practice problem 10: a rover, `Describe` with no `override`, a `Vehicle` variable | `one-parent-many-children-practice.outputs.json`, `an-override-that-is-missing-1/2` (CS0114; `a rover, which is a vehicle`, `a vehicle`, `a vehicle`) |
| table, row "`virtual`, or no word / `new`": no warning | `hiding-on-purpose-1-program` (no word), probe `virtual-then-new` (`virtual`) and probe `potion-with-new` (`virtual`, on `object.ToString`) |
| Microsoft's pages: `BaseClass`, `DerivedClass`, `bcdc`, `class Program`, the versioning reason, "CS0108" | the pages themselves, fetched on 28 September 2026 |
| Microsoft's page gives `BaseClass` a second method with the name of one in `DerivedClass`, and the compiler warns (review) | *Knowing When to Use Override and New Keywords*, fetched again on 28 September 2026: `Method2` added to `BaseClass`, "causes a warning ... hides" |
| the classic `Main` on `the-tools-around-your-code` | that lesson, lines 1251 to 1253 |

## How it was checked

- `npm run check-lessons -- --write virtual-and-override`, then without
  `--write`: nine runs, no problems. The rewritten outputs file is the
  same as the one the first run recorded.
- The page in headless Chromium (the page tests' helpers, the real
  lesson): the cells show TYPES `Character.cs`, TYPES `Troll.cs`, PROGRAM,
  TYPES `Troll.cs`, PROGRAM, TYPES `Potion.cs`, PROGRAM. Check on the
  troll says "Compiled, with 1 warning"; Run on the experiment says "Ran,
  with 1 warning." and shows `Troll.cs(7,17): warning CS0108: ...` above
  `Grog (health 7)` and `Brak (health 3)`. The potion's program shows
  `Potion.cs(10,19): warning CS0114: ...` above its three lines. With the
  two words typed into the experiment's classes, it prints `Brak (health
  7)` with no warning. Two predicts, one hint, two solution folds, a
  five-row table, links to four lessons that exist, and no page errors.
- Six probes in a scratch lesson, run in the browser checker (below).

## For other pages (not done here: this run edits only its own files)

- **Forward links, batch rule 3.** `one-parent-many-children.md` ends
  "After it, *Overriding* is a closer look at `virtual` and `override`",
  and problem 10's fold on `one-parent-many-children-practice.md` says
  "*Overriding*, a later closer look, tries this with the troll". Both
  can now be `[Overriding](lesson:virtual-and-override)`.
- **`courses/foop.yaml`** still lists `virtual-and-override` under
  `planned:`. The page is in `lessons/` now, so its own title takes over
  and that line can go (`docs/LESSON_FORMAT.md`, "Courses";
  `docs/TRANSLATING.md`, checklist).
- **`mixed-programming-with-objects`** depends on this page in the map. A
  problem built on the table's rows (a missing `override` that still
  compiles) would fit there.

## Open

Questions only Josh can settle:

1. **A Microsoft page with a wrong warning code.** *Versioning with the
   Override and New Keywords* says the compiler gives CS0108 when a base
   class gains a `virtual` method with your method's name; it gives CS0114.
   The page keeps the link and says so in two sentences. The other
   choices: drop the companion page (the reason is already in the prose),
   or send Microsoft a correction through the page's "Open a
   documentation issue" link. Which do you prefer? *(The review took the
   second choice; see "Review", R9, and "Still open for Josh", 1.)*
2. **`new` as a second meaning.** The map asks for "`new` on purpose", so
   the page teaches that `new` in front of a method hides on purpose, and
   says it is "the same word that makes an object, with a different job".
   For a Level 5 reader in a second language, a keyword with two jobs may
   confuse more than it helps, and learners rarely need it. Keep the
   section, or cut it to one sentence under the warning?
3. **Python for readers who never met it.** A FOOP learner who took PDP
   in C# may not know Python. "Why idea A is easy to believe" explains
   in words and shows three lines of Python to read. Is that enough, or
   should the section lead with the general point (in some languages every
   method can be replaced) and keep Python as the example?
4. **A solution shows before the paragraph that explains the result.**
   The page puts a cell's hints and solutions directly under the cell,
   wherever the Markdown puts them. So under the experiment's program, the
   folds "A hint" and "A solution" come before "Run it. It prints ...",
   and the solution answers a question the page asks six paragraphs
   later. `when-is-a-breaks` has the same layout. Both folds are closed,
   and the hint waits for two runs. Is that acceptable on a closer look,
   or should the format let a solution sit where the question is?

## Probes

A scratch lesson (`<scratch>/lessons/vo-probes/vo-probes.md`, with a
frontmatter of `title:` and `version:`), run on 28 September 2026 with
`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`. Each
probe is one program cell that declares all its classes, so each replaces
the classes of the probe above it (rule 4). The one that fails to compile
is last.

| Probe | Result |
|---|---|
| `virtual-then-new` | `Grog (health 7)`, `Brak (health 3)`, no diagnostics |
| `hidden-in-a-list-and-a-parameter` | `Grog (health 3)`, `Brak (health 3)`, no diagnostics |
| `potion-with-new` | `a potion of healing`, `Potion`, `You find Potion.`, no diagnostics |
| `parent-gains-a-virtual-method` | `Grog ROARS.`, `Brak makes a small noise.`; warning CS0114 at (27,17) |
| `parent-gains-a-method` | the same two lines; warning CS0108 at (27,17) |
| `override-without-virtual` | did not compile: CS0506 at (25,26) |

The probes' code:

```csharp
// virtual-then-new: Character's TakeDamage is virtual, Troll's is new.
Troll grog = new Troll("Grog", 10);
Character brak = new Troll("Brak", 10);
grog.TakeDamage(7);
brak.TakeDamage(7);
Console.WriteLine(grog);
Console.WriteLine(brak);

class Character
{
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

    public virtual void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }
}

class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public new void TakeDamage(int amount)
    {
        base.TakeDamage(amount / 2);
    }
}
```

```csharp
// hidden-in-a-list-and-a-parameter: the same classes, but Character's
// TakeDamage is not virtual.
List<Character> party = new List<Character> { new Troll("Grog", 10) };
foreach (Character member in party)
{
    member.TakeDamage(7);
    Console.WriteLine(member);
}
Troll brak = new Troll("Brak", 10);
Hit(brak);
Console.WriteLine(brak);

void Hit(Character target)
{
    target.TakeDamage(7);
}
```

```csharp
// potion-with-new: the page's Potion, with new in place of override.
Potion potion = new Potion("healing");
Console.WriteLine(potion.ToString());
Console.WriteLine(potion);
Console.WriteLine($"You find {potion}.");

class Potion
{
    public string Effect;

    public Potion(string effect)
    {
        Effect = effect;
    }

    public new string ToString()
    {
        return $"a potion of {Effect}";
    }
}
```

```csharp
// parent-gains-a-virtual-method and parent-gains-a-method: Character
// "gains" Roar, which Troll already had. The second probe is the same
// with `public void Roar()` in Character.
Troll grog = new Troll("Grog", 10);
Character brak = new Troll("Brak", 10);
grog.Roar();
brak.Roar();

class Character
{
    public string Name;

    public Character(string name, int health)
    {
        Name = name;
    }

    public virtual void Roar()
    {
        Console.WriteLine($"{Name} makes a small noise.");
    }
}

class Troll : Character
{
    public Troll(string name, int health) : base(name, health)
    {
    }

    public void Roar()
    {
        Console.WriteLine($"{Name} ROARS.");
    }
}
```

```csharp
// override-without-virtual (expect: CS0506)
Troll grog = new Troll("Grog", 10);
grog.TakeDamage(7);

class Character
{
    public int Health;

    public Character(string name, int health)
    {
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
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

## Review

A second reader went through the page on 28 September 2026: once as a
Level 5 learner who knows only the pages before it, once as a teacher
against the course map's entry, and then line by line through the
checklists of `docs/TRANSLATING.md` and the style guide. No cell's code
changed, so `version:` stays `2026.09.28.1` and the outputs file is
untouched; `npm run check-lessons -- virtual-and-override` (no
`--write`) reports "9 runs ... no problems". The page was also opened in
headless Chromium: three folds ("A hint", hidden until two runs; "A
solution, with virtual and override"; "A solution, with override"), nine
links, the new text present, and no page errors.

### What the review checked and found sound

- The course map's entry is covered in full: idea A and idea B; a troll
  with neither word, held in a `Character` variable and a `Troll`
  variable; CS0108 quoted; both words, and both take half; Python as the
  reason idea A is easy to believe; `new` on purpose; a warning as a clue.
  It fits between `one-parent-many-children` (which it names and links,
  and whose troll, CS0506, `MaxHealth` warning, `object.ToString` and
  "Many kinds, one loop" it builds on) and `when-is-a-breaks` (its Next
  line).
- Every number and quoted output matches `virtual-and-override.outputs.json`:
  `Grog (health 7)`, `Brak (health 3)`; `Troll.cs(7,17)` and the CS0108
  message; the solution's `Brak (health 7)` with no diagnostics; `new`
  giving the same two lines with no diagnostics; `a potion of healing`,
  `Potion`, `You find Potion.`; `Potion.cs(10,19)` and the CS0114 message;
  the potion solution's three lines with no diagnostics. The checker
  records a solution's diagnostics when there are any (`summarise` in
  `tools/check-lessons.mjs`), so "there is no warning" in both solution
  notes is recorded, not reasoned.
- Two predicts, each naming its line ("the second line"), no option
  marked; one hint, a question, `after: 2 runs` on a program that runs
  without an error; solutions on the program cells, each writing its
  classes again below the statements (rule 4). Each program cell makes
  its own objects. The potion is the last class on the page. No verdict
  words, no *-ize* spellings, and every link goes to a lesson in
  `lessons/`.
- The two Microsoft pages were fetched again. *Knowing When to Use
  Override and New Keywords* does run the experiment with `BaseClass`,
  `DerivedClass` and `bcdc`, uses `class Program` and `static void
  Main`, and says *base class* and *derived class*. The companion does
  say CS0108 for a base class that gains a `virtual` `DrawRectangle`.

### What the review changed (prose only)

- R1. **Opening.** "the troll's `override` did not compile" became "the
  troll with `override` did not compile"; "neither method has either
  word" became "with no `virtual` and no `override`", the words
  `one-parent-many-children` used for the same question.
- R2. **Idea B** says whose type decides: "the type of the variable that
  holds the troll". Before, "the variable" had no variable to point to.
- R3. **Two types.** "So there are two types here ... Brak's variable is
  a `Character`, and Brak itself is a `Troll`" became "So two types
  matter here ... The variable `brak` has the type `Character`, and the
  object it holds is a `Troll`."
- R4. **The predict's third note** was a fragment ("and neither word").
  It is now a sentence: "and neither method says `virtual` or
  `override`."
- R5. **Why the variable decides.** "All it knows then is the type of
  each variable" became "It uses only the type of each variable": the
  compiler can see `new Troll` on the line, so "knows" invited a fair
  objection. "runs the version that belongs to that class" became "If
  that class has an `override` of the method, C# runs it", because the
  potion later shows a class whose own `ToString` belongs to it and does
  not run.
- R6. **Solution titles.** The page puts a cell's folds directly under
  the cell (see "Open", 4), so "A solution" sat under the experiment's
  program with nothing to say what it solved. Each solution now has a
  `title:`, and the folds read "A solution, with virtual and override"
  and "A solution, with override". This names the task without giving
  away either predict. The checker does not record titles, so the
  outputs file is the same.
- R7. **Python.** "the troll from the Python version of the inheritance
  page" assumed the reader knew dewlab. It is now "the same troll in
  Python", and two sentences read it for a reader who never met Python:
  `class Troll(Character)` makes `Character` the parent, `super()` does
  the job of `base`, and `amount // 2` is half the amount as a whole
  number. (Open question 3 stays open; this is the smaller answer.)
- R8. **Where the ideas differ.** "an element of a `List<Character>`, in
  the variable of a loop over that list" used *element*, which only
  PDP's `lists-and-sequences` defines. It is now "three common places: a
  `List<Character>` that holds a troll, a loop variable of type
  `Character`, and a parameter of type `Character`". "Most of the time"
  became "Often".
- R9. **The third reason, and Where to read more.** The course map says
  a closer look ends with one thing to read, and the companion page was a
  second, followed by two sentences correcting Microsoft's warning code,
  which is more than a Level 5 reader needs. *Knowing When to Use
  Override and New Keywords* already shows the third reason happen: it
  gives `BaseClass` a second method, `Method2`, with the name of one in
  `DerivedClass`, and the compiler warns. So the companion and its two
  sentences went, the one entry now says that, and the prose's "Microsoft's
  guide to C# gives this reason" became "The Microsoft page in *Where to
  read more* shows an example." The third reason itself was reworded: "a
  new method" became "a method" (this page gives `new` a meaning of its
  own), "your method does not replace the new one" became "does not
  replace the parent's method", and "and you decide" became "Then you
  decide what your method should do."
- R10. **Keyword.** The warnings say "the new keyword" and "the override
  keyword", and *keyword* is defined only on PDP's `storing-and-computing`,
  which a FOOP reader from Python never meets. *Hiding on purpose* now
  defines it in that page's words: "a word that C# keeps for its own use,
  such as `class`, `int` or `new`."
- R11. **After `new`.** "as it did in the experiment before you changed
  it" assumed the reader had changed it. It is now "as it did in the
  experiment without `virtual` and `override`", which is true either way
  (the writer's decision 10 and probe `virtual-then-new`).
- R12. **When to want `new`.** "When you see CS0108 on a method of your
  own, the two words you usually want are `virtual` and `override`"
  became "When you see CS0108, and you can change the parent class, ...":
  the paragraph before it is about a parent you cannot change, where
  `virtual` is not yours to add.
- R13. **The table's CS0114 row** said "The same as the row above". A
  screen reader reads a table a row at a time, so the row now says what
  happens: "The child's method hides the parent's, as in the row above."
- R14. **Visual Studio.** The page is about warnings, and in Visual Studio
  a program with a warning compiles and runs as it does here, so a
  warning is easy to miss. After "nothing needs Visual Studio", one
  sentence says the warning is in the Error List (**View**, then **Error
  List**), the steps `the-tools-around-your-code` taught.
- R15. Three paragraphs rewrapped after the edits.

### Still open for Josh

1. **The companion page (writer's "Open", 1).** The review dropped it
   (R9). To restore it: *Versioning with the Override and New Keywords*,
   <https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/versioning-with-the-override-and-new-keywords>.
   Whether to send Microsoft a correction (it says CS0108 where the
   compiler gives CS0114, probe `parent-gains-a-virtual-method`) is still
   yours to decide.
2. **`new` as a second meaning (writer's "Open", 2).** Unchanged. The
   section is short, the map asks for it, and it now defines *keyword*;
   the reviewer would keep it. Cutting it to one sentence would also
   remove a table row and one pair of cells (the page would have five).
3. **Python for a reader who never met it (writer's "Open", 3).** R7
   reads the three lines in words. Whether to lead with the general point
   instead is still open.
4. **Folds above the question (writer's "Open", 4).** R6 names each
   solution, but the fold still sits under the program, above "Run it.
   It prints ...", and the question it answers comes six paragraphs
   later. The only fix inside the page would be an eighth cell, the same
   program again, directly under the question, with the hint and the
   solution on it. That makes the page size M in the map's terms (8
   cells), and the experiment's program would appear twice. The review
   did not do it. The general fix is in the page code (a solution block
   that stays where the Markdown puts it), which this review may not
   touch.
5. **Other files, unchanged by this review** (as the writer listed):
   `courses/foop.yaml` still has `virtual-and-override` under `planned:`;
   `one-parent-many-children.md` and problem 10's fold on
   `one-parent-many-children-practice.md` still name *Overriding* in
   italics, and can now link to `lesson:virtual-and-override`.
