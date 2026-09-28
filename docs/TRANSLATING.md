# Translating a dewlab page into a dewsharp lesson

The playbook for turning one dewlab tutorial and its practice page into a
dewsharp lesson. It is distilled from the two exemplars, `first-steps` (PDP)
and `objects-and-classes` (FOOP), in `lessons/`. When this file and an
exemplar disagree, the exemplar shows what was actually run; say so in your
report.

This file doesn't repeat the contracts. Read these first, in this order:

1. `docs/LESSON_FORMAT.md`: the format.
2. `planning/PEDAGOGICAL_STYLE_GUIDE.md`: `#voice`, `#the-compiler`,
   `#rules-of-the-road` and `#code`.
3. `planning/COURSE_MAP.md`: "Principles of translation", then your
   lesson's entry, which lists the cells and blocks to rework.
4. The dewlab page, its practice page and its glossary file, in full:
   `/home/user/dewlab/tutorials/<id>/`.

## The steps

1. **Start from dewlab's page, section by section.** Keep its order, its
   headings, its worlds (at most two, plus "your own" in FOOP), its
   predicts, hints, solutions, inputs and folds, and its voice. Change what
   C# changes. The course map's entry says what that is.
2. **Write the frontmatter.** `from:` is the dewlab id. `version:` is
   today's date with `.1`. `covers:` is one flat list; dewlab's
   per-section `covers:` map doesn't exist here. A practice page has
   `practice_for:` and the same worlds as its tutorial.
3. **Translate each cell** (see "Before and after"). Keep the cell's id
   when its task is the same (`DECISIONS.md` 28 renames ids that name
   Python). Each program cell must work on its own.
4. **Put every number in the prose there from a recorded output.** Write
   the prose with no numbers, run the checker with `--write`, then read
   `lessons/<id>/<id>.outputs.json` and copy each number from it. If a fold
   needs a number that no cell prints, make a cell print it (decision 29).
5. **Run the checker until it passes without `--write`** (see "The
   checker").
6. **Open the page** with `npm run serve` and look at it: the kind label on
   each cell, the compiler messages, and each world.
7. **Go through the checklist**, and write your report.

## Before and after

### A Python cell and its C# version

dewlab, `first-steps`, `more-operators-1`:

```python
print(2 ** 3)      # a power: 2 to the power of 3
print(17 / 5)      # division
print(17 // 5)     # floor division: how many whole 5s fit into 17
print(17 % 5)      # remainder: what is left over
```

dewsharp. C# has no `**` and no `//`. `/` with two whole numbers is
whole-number division, so the cell shows both kinds, and the table under it
changes to match:

```csharp
Console.WriteLine(17 / 5);           // two whole numbers
Console.WriteLine(17.0 / 5);         // one number with a decimal point
Console.WriteLine(17 % 5);           // the remainder
Console.WriteLine(Math.Pow(2, 3));   // a power: 2 to the power of 3
```

Every surprise moved. Python's `100 / 4` is `25.0` and C#'s is `25`, so
the predict on `how-this-page-works-1` got new options and notes. Python's
`-7 % 3` is 2 and C#'s is -1, so the practice problem "A remainder below
zero" is now about C#'s surprise, not Python's.

### An `ask()` stand-in and its `ReadLine` version

Neither exemplar reads input. This one is from dewlab's
`from-cells-to-a-program`, `a-loop-that-waits-for-quit-1`, and the C# was
run through the checker. dewlab typed the answers in advance:

```python
typed = ["1", "MEET ME", "2", "9"]

def ask(prompt):
    answer = typed.pop(0)
    print(prompt + answer)
    return answer

while True:
    choice = ask("Choose: ")
    ...
```

dewsharp waits for the learner. `ask`, `typed` and the paragraph that
explains them go. The checker's answers go in `stdin:`, which the learner
never sees:

````markdown
```csharp exec
id: a-loop-that-waits-for-quit-1
stdin: "1\nMEET ME\n2\n9\n"
while (true)
{
    Console.WriteLine("1: shout a message   2: count the messages   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == "9")
    {
        break;
    }
    ...
}
```
````

The recorded output shows each typed line after its prompt, as a console
does: `Choose: 1`, then `Message: MEET ME`. Use `Console.Write` for a
prompt, so the answer stays on the prompt's line. Turn text into a number
with `int.Parse` until the page has met `TryParse` (`#code`).

### Cells that shared variables, made to stand alone

In dewlab, every cell on a page shares its variables. In dewsharp,
nothing but types carries down (rule 3). Repeat the line that makes the
value:

```csharp
// the-rules-of-the-road-2
Character alan = new Character("Alan", 9);
alan.TakeDamage(4);
Console.WriteLine($"{alan.Name} {alan.Health}");
```

```csharp
// the-rules-of-the-road-3, and its solution: make alan again
Character alan = new Character("Alan", 9);
alan.TakeDamage(2);
Console.WriteLine(alan.Health);
```

The same goes for prose that says "now try `9 + 4 * 2` in the cell". In
`first-steps-practice`, `which-comes-first-1` prints all four lines, so
the numbers in its fold are recorded (decision 29).

### A class split into a types cell and a program cell

dewlab, `objects-and-classes`, `your-turn-1--game`: the class and the code
that uses it in one cell, and a solution that repeats both.

```python
class Character:
    def __init__(self, name, health):
        ...
    def take_damage(self, amount):
        self.health = max(0, self.health - amount)

ada = Character("Ada", 4)
ada.heal(3)
print(ada.health)
```

dewsharp: two cells (decision 26). The types cell keeps the dewlab id,
because it holds the reader's work. The program cell below it is
`<id>-program`, and it has the inputs, the hints and the solution. It does
not compile until the reader writes `Heal`, and the prose says so
(`expect:`, decision 27).

````markdown
```csharp exec
id: your-turn-1--game
file: Character.cs
class Character
{
    public string Name;
    public int Health;
    ...
}
```

```csharp exec
id: your-turn-1-program--game
expect: CS1061
Character ada = new Character("Ada", 4);
ada.Heal(3);
Console.WriteLine(ada.Health);
```

```inputs
ada.Health
```

```solution
Character ada = new Character("Ada", 4);
ada.Heal(3);
Console.WriteLine(ada.Health);

class Character
{
    ...
    public void Heal(int amount)
    {
        Health = Health + amount;
    }
}
---
The solution writes `Character` again, below its program (rule 4), and C#
uses this one in place of yours. ...
```
````

The solution's statements come first and its class after them (C# needs
that order: CS8803). The first page with classes teaches all five rules
of the road, each with its own small cell, in the style guide's words
(`objects-and-classes`, "The rules of the road"). Later pages point back:
*(rule 3: variables stay in their cell)*.

## C# pitfalls we hit

- **Whole-number division.** `17 / 5` is 3, `100 / 4` prints `25`, and
  `-7 / 3` is -2. `-7 % 3` is -1. To keep the decimal part, write one number
  with a point: `17.0 / 5`.
- **Numbers print C#'s way.** A whole `double` prints with no point:
  `100.0 / 4` prints `25`, where Python prints `25.0`. Other doubles print
  in full (`-7.0 / 3` is `-2.3333333333333335`), and money uses the page's
  Irish settings (`12.5.ToString("C")` is `€12.50`). Never copy a number
  from dewlab's page; copy it from the outputs file.
- **Printing an object or a list prints its type's name**: `Character`,
  and ``System.Collections.Generic.List`1[Character]``. There is no memory
  address, as in Python. Use `ToString()` for an object and `string.Join`
  for a list. A `record` prints its values: `Probe { Name = Voyager, Fuel =
  70 }`. `__str__` and `__repr__` become an `override` of `ToString()`.
- **A misspelt key in a `Dictionary` is still silent**, but a misspelt field
  or method is a compiler error (CS1061). Python allowed `grace.heath = 3`;
  C# does not compile it. Where dewlab's prose relied on the Python
  behaviour, rewrite it.
- **Warnings travel.** Every cell below a class compiles that class, and
  shows its warnings. `name = name;` in a constructor gives two CS1717 and
  two CS0649 warnings in every cell below. Put a class meant to warn last on
  its page (decision 30).
- **A class that doesn't compile stops every cell below it.** Only the last
  cell on a page may hold one.
- **A class in a program cell carries down too** (rule 2), and so do its
  warnings. A class with a `Main` does not (rule 5): below it, `Game` is
  CS0246.
- **An unused variable in a starter warns** (CS0219). A starter such as
  `int blocks = 0;` must be used, for example in the `Console.WriteLine`.
  It warns only when the value is a constant (`0`, `12 + 30`); a value from
  a method call gives no warning.
- **A missing `;` after a declaration is CS1003, not CS1002.** `int count =
  5` followed by `Console.WriteLine(count);` gives `(2,14): error CS1003:
  Syntax error, ',' expected`, because C# reads the next line as more of
  the declaration. A missing `;` after a statement such as
  `Console.WriteLine(...)` gives CS1002.
- **`int.TryParse(null, out int x)` with the word `null` is CS0121**: the
  call could mean two methods. A `string` variable that holds `null` works,
  and gives `false`.
- **The sections of a `switch` share one scope.** Two `case`s that each
  make a variable with the same name are CS0128, even `out int x` inside an
  `if` in each case. Use two names, or put each case's lines in braces.
- **A cell that reads input has no `inputs` block.** **Compare with a
  solution** runs both programs with no input, so `ReadLine` gives `null` at
  once, and a loop that asks again runs until the time limit. The checker
  refuses it.
- **`(int)` of a `double` outside the `int` range is a different number on
  the page and in Visual Studio.** `(int)3e9` is -2147483648 on the page and
  2147483647 with `dotnet run`: C# leaves it unspecified. Don't show it;
  `checked((int)x)` and `Convert.ToInt32(x)` throw an `OverflowException`
  in both.
- **Never name a class `Program`.** The top-level statements already make
  one (CS0260).
- **`ReadLine` without `stdin:` returns `null`.** The checker gives a cell
  no input unless it has `stdin:`, so `choice.ToUpper()` then stops with a
  `NullReferenceException`.
- **Empty "your turn" cells are fine.** A cell with only a comment is
  `empty`. The checker runs its solution in its place.
- **A shared cell below a world's cells is recorded once per world**, as
  `<cell id>@<world>`, even when those cells declare no types. This is the
  checker being careful, not a problem.
- **The checker compiles a `challenge` fence alone, and doesn't run it.** A
  challenge opens in a new notebook with no cells above it, so it can't use
  a class from the page: give it its own. To see what it prints, run its
  code in a scratch lesson (below).

## The checker

Run these from the repository's root. The checker runs every cell in the
real engine, in headless Chromium, so the engine must be built once:
`npm run build:engine`, which needs .NET (`dev/setup.sh` installs it into
`.dotnet/` on a new machine). The checker itself needs only Node.

```bash
npm run check-lessons -- --write first-steps first-steps-practice   # run and record
npm run check-lessons -- first-steps first-steps-practice           # run and compare
npm run check-lessons                                               # every page in lessons/
```

A page is its id: `<id>` or `<id>-practice`. Name both. Bump `version:`
when you change what a cell does, then run with `--write` again. The
checker fails when a cell without `expect:` doesn't run to the end, when a
cell with `expect:` does anything else, when a solution fails on an input
not marked `// throws`, when a challenge doesn't compile on its own, when a
`lesson:` link goes to a page that isn't in `lessons/`, or, without
`--write`, when anything differs from the recorded file.

To try code that isn't in a lesson (a challenge, or a claim in your
prose), write a small lesson in a scratch folder and point the checker at
it:

```bash
node tools/check-lessons.mjs --lessons <scratch>/lessons --write
```

To look at a page: `npm run serve -- --port <a free port> --isolate`, then
open `/lesson.html?sw=off&id=<id>`. Stop the server by its PID. `pkill -f`
with a pattern that is also in your own command ends your own shell.

`drafts/` has its own native checker, for the port agents. A lesson moves
into `lessons/` only when the browser checker passes on it.

## Checklist

- [ ] Same sections, worlds, predicts, hints, solutions and folds as the
      dewlab page, or the course map's entry says why not.
- [ ] Every program cell works on its own. Classes are in types cells with
      `file:`. No `class Program`.
- [ ] Cell ids: dewlab's where the task is the same; `--<world>` on world
      cells; `<id>-program` for the program under a world's types cell.
- [ ] Two or three predicts, where C# does something a reader would not
      expect. No option is marked right.
- [ ] Each cell meant to fail has `expect:`, and the prose says it is meant
      to fail before the reader runs it.
- [ ] The three outcomes use the style guide's words: *it did not compile*,
      *it stopped with an exception*, *it ran*.
- [ ] Input is real `Console.ReadLine()`, with `stdin:` for the checker.
- [ ] Every number in the prose, the folds and the solution notes is in the
      outputs file.
- [ ] Links go only to lessons that exist in `lessons/`; a page not written
      yet is named by its short title in italics (decisions 14 and 32).
      The checker refuses a `lesson:` link to a page that isn't there
      (decision 39).
- [ ] When the lesson moves from `drafts/` into `lessons/`, delete its line
      under `planned:` in the course files. The course page uses the
      lesson's own title from then on, so the line would only go stale.
- [ ] "Where to read more" points to C# sources that exist, such as
      Microsoft Learn.
- [ ] No *right*, *wrong*, *correct* or *well done*; no phrasal verbs or
      idioms (*work out*, *left over*, *go round*); Irish spelling in the
      prose.
- [ ] `npm run check-lessons -- <id> <id>-practice` passes without
      `--write`, and the page looks right in `npm run serve`.

## When something is wrong

Don't change the engine, the page code (`web/`) or the checker to make a
lesson pass, and don't change a cell to hide a problem.

- **The engine or the page does something C# on a computer doesn't**:
  report it in your report's "not done". Name the page, the cell id, the
  code, what `dotnet run` prints, and what the checker recorded. A second
  copy of the cell in a scratch lesson, with only the problem in it, is
  the best evidence.
- **A contract doesn't cover your case** (the format, the style guide or
  the course map): make the choice that the exemplars would make, write it
  as a numbered entry in `DECISIONS.md` with what it would cost to change,
  and name it in your report.
- **A dewlab section can't be translated** (a widget, a chart, a Python-only
  idea): check the course map's entry first. If it says nothing, leave the
  section out, and say so in your report.
