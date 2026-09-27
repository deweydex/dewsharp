# Notes: a-polynomial-class (C# draft)

Ported from dewlab `tutorials/a-polynomial-class/` (the tutorial and its
glossary, version 2026.09.26.1, and the three class files it includes,
`setup/polynomial/tidy.py`, `printed.py` and `added.py`). Written on 27
September 2026 against dewsharp's `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1), `DECISIONS.md` (entry 15
moves this page to FOOP's explore list) and the entry for this page in
`planning/COURSE_MAP.md` (FOOP explore E1, batch 13). There was no earlier
partial draft in this folder, so this is a first draft.

Files:

- `a-polynomial-class.md`: the lesson. 14 `csharp exec` cells: 5 types
  cells (each `file: Polynomial.cs`) and 9 program cells. 3 predicts, 4
  hints, 4 solutions (each with `inputs`), 1 challenge. No worlds, and no
  practice page (an explore page has none).
- `a-polynomial-class.native.json`: what the native check recorded
  (`--json`).
- `NOTES.md`: this file, and `NOTES.native.json`, what its probes printed.
  The probe cells at the end run with the same NativeCheck command (pass
  `NOTES.md` as the file). They check the messages and texts in the prose
  that no lesson cell prints.

## How it was checked

- NativeCheck on the lesson: **No problems.** On `NOTES.md` (the probes):
  **No problems.**
- Each `solution` sits on a program cell, as the statements followed by
  the whole class, so the native check runs every solution against its
  `inputs`:
  - Degree: the starter does not compile (CS1061); the solution gives
    `2`, `1`, `0`.
  - ToString: the starter gives `"Polynomial"` four times; the solution
    gives `"-5x^2 + 20x + 1.5"`, `"x^2 - 1"`, `"2x^3 - x + 3"`, `"0"`.
  - Add: the starter does not compile (CS1061); the solution gives
    `"2x + 1"`, `"3x^2 + 2x + 1"`, `1`, and `"3x^2 + 2x + 1"` for `first`
    after the Add.
  - Derivative: the starter does not compile (CS1061); the solution gives
    `"-10x + 20"`, `0`, `"0"`.
- The three cells that fail on purpose carry `expect: CS1061` (Degree,
  Add, Derivative: the method the reader is asked to write) and one
  carries `expect: CS0019` (`first + second` before `operator +` exists).
  The prose says each is meant to fail.
- Every compiler message quoted in the prose is copied from the check's
  output. As in the other drafts, the prose quotes the message and not the
  `file(line,col)` part. CS1061's message is long, so the prose quotes its
  start and ends it with "…", as the tools draft does.
- The Microsoft Learn pages in "Where to read more", and the two dewlab
  pages the lesson links to, returned HTTP 200 on 27 September 2026. The
  operator-overloading page says an operator declaration "includes a
  public modifier" and "includes the static modifier" (except compound
  assignment operators, new in C# 14), which is what the prose says about
  `public static`. The List constructor page describes the constructor
  that copies "elements copied from the specified collection".

## What changed from the Python page, and why

**The shape stays.** One class, built a stage at a time, following the
thrown ball: `Evaluate`, `Degree` (the trailing zero in `{ 1, 2, 0 }` is
the trap), a constructor with two rules (no zero at the top; a copy of the
caller's list), a `ToString` that writes `-5x^2 + 20x + 1.5`, `Add`, and
for readers who know derivatives, `Derivative`, which answers the opening
question (the ball is highest at 2 s). Each stage has a question, a hint
that opens with a question, a solution with notes, and `inputs`. Every
number in dewlab's prose came out the same in C#.

**Cells follow the rules of the road.** dewlab's cells each held the class
(written out, or included from `setup/polynomial/`) and the program. Here
each class is a types cell (`file: Polynomial.cs`) and the program cell
below uses it. There are five versions of the class, and each replaces the
one above it (rule 4):

| Cell | Version | What the reader adds to it |
|---|---|---|
| `a-ball-in-the-air-1` | `Evaluate` | `Degree()` |
| `a-rule-for-the-coefficients-1` | a loop `Degree()`, no `Evaluate` | nothing: it holds the predict's class |
| `a-rule-for-the-coefficients-3` | both rules, one-line `Degree()` (dewlab's `tidy.py`) | `ToString()` |
| `polynomials-that-make-polynomials-1` | with `ToString()` (dewlab's `printed.py`) | `Add()` |
| `a-plus-sign-for-polynomials-2` | with `Add()` and `operator +` (`added.py`, plus the operator) | `Derivative()` |

This keeps dewlab's design, "each starter is the stage before's answer":
a reader who did not finish one stage starts the next from a class that
works. The prose says, each time, which cell to add the method to, and
that the next class replaces the reader's (with an invitation to copy
their own `ToString()` into it). Each program makes its own polynomial
(rule 3 is named once, at the first task).

**Cell ids.** The types cell takes dewlab's number and the program cell
below it the next one, as in the keeping-details draft. So
`the-highest-power-1` and `printing-it-the-way-we-write-it-1` are the task
programs (the reader writes into a class cell above them),
`a-rule-for-the-coefficients-1..4` are two class-and-program pairs where
dewlab had `-1` and `-2`, and `polynomials-that-make-polynomials-1..3` are
the class for Add, the Add task and the Derivative task. The operator
section is new, with new ids (`a-plus-sign-for-polynomials-1..3`). No
class has used this page, so no saved work depends on these ids yet.

**A task starter that does not compile.** In Python, calling
`height.degree()` before it exists raised `AttributeError` when the line
ran. In C# the compiler refuses the whole program first (CS1061). So the
Degree, Add and Derivative starters carry `expect: CS1061`, the prose says
so and quotes the message, and their hints wait for `after: 2 errors`
(the first failure comes before the reader has written anything). The
ToString starter runs (it prints `Polynomial`), so its hint waits for
`after: 2 runs`.

**`degree` needs `return 0;` for the compiler.** New in the Degree
solution's notes: without the last `return 0;`, the class does not
compile (CS0161: not all code paths return a value; probe P4). Python
would have returned `None`.

**Aliasing, with C#'s words.** dewlab's point stands unchanged: the
program changes the polynomial without touching the private field, and
prints `3`. The prose now says why in C# terms: `List<double>` is a class,
a variable of a class type holds a *reference*, and `=` copies the
reference. It adds a C# sentence that follows from the page before:
`private` stops other code from using the name `_coefficients`, not from
changing the list through a name of its own. `list(coefficients)` became
`new List<double>(coefficients)`, which is the form the course map gives
for `objects-inside-objects` too. Python's `coefficients[-1]` and `pop()`
became a local `top`, the index of the highest power, with
`RemoveAt(top)`: C#'s `_coefficients[^1]` would be shorter, but a FOOP
reader from Python may not have met the index from the end, and
`_coefficients[_coefficients.Count - 1]` made an 86-character line. dewlab linked to
`comprehensions-and-grids` for aliasing; the C# page links to
`two-names-one-list` (PDP) and `two-names-one-object` (FOOP), because a
FOOP reader from Python may not have taken PDP in C#.

**Printing.** Python's `print(height)` showed the memory form; C# prints
the class's name, `Polynomial`, as `objects-and-classes` teaches.
`__str__` became `public override string ToString()`. `abs()` became
`Math.Abs`, and `str(size)` became `text + size`. The prose adds a note
that `^` in C# code is exclusive or, not a power (the course map's "no
power operator"); in `ToString`'s text it is only a character. The
solution's notes add that each `+` on a string makes a new string (strings
cannot be changed).

**`add` stays, and `private` gets one more sentence.** In Python,
`other._coefficients` worked by convention. In C# it compiles because
`private` means private to the class, not to the object. The prose says
so before the task, because a reader would otherwise not know how `Add`
can reach the other polynomial's list.

**Operator overloading moved from the challenge into the page.** dewlab's
challenge asked for `__add__`. The course map says the C# page gains
`operator +`, so it is a short worked section, "A plus sign for
polynomials", between Add and the derivative:

1. `a-plus-sign-for-polynomials-1`: `first + second` with the class as it
   stands, `expect: CS0019`, with a predict. The predict's second option
   (`3x^2 + 2x + 1-3x^2`, `+` joining two texts) is what the two
   `ToString()` results joined would give (probe P2); it is there because
   `"10" + 2` is `"102"` in C#, and a reader may expect `+` to join.
2. `-2` (types): the class with `Add` and
   `public static Polynomial operator +(Polynomial left, Polynomial right)`,
   read in four parts. `static` is tied to the static fields of
   `one-class-many-methods`, and *operator overloading* to method
   overloading on the same page. The claim that C# needs both `public`
   and `static` is probe P5 (CS0558 without either).
3. `-3`: `first + second` prints `2x + 1`, and dewlab's challenge line,
   `height + Polynomial([-1.5])`, now runs in the page: `-5x^2 + 20x`, the
   height above the hand.

The challenge became `Multiply` and `operator *`: dewlab's `multiply`
with the operator on top. Probe P1 runs it with one answer and gets
`x^2 - 1` twice.

**Derivative.** Unchanged in substance: `-10x + 20`, `0` at 2 seconds,
`0` for the derivative of `{ 7 }`. It sits under its own heading, "The
top of the throw", after the operator section, so the page still ends by
answering the question it opened with.

**The rest.**

- `question` (multiple choice, "the greatest height") became a `choice`
  predict with dewlab's three options and notes. The aliasing `predict`
  stays a `number` predict. The operator predict is new. That is three
  predicts, the most the style guide allows.
- dewlab's `Polynomial([1.5, 20, -5])` became
  `new Polynomial(new List<double> { 1.5, 20, -5 })`, in the programs and
  in every `inputs` line. It is long; see open question 3.
- `var` is used for a line whose type is written on the right, as FOOP
  does from `the-moves-you-already-know` on. Local variables inside the
  class that start from a literal (`double total = 0;`,
  `string text = "";`) write their type.
- Private field `_coefficients`, following the keeping-details draft and
  Microsoft's naming convention.
- dewlab's glossary terms (polynomial, coefficient, degree) are defined in
  the prose where they first appear, because dewsharp has no glossary
  panel yet. So are *reference*, *operator*, *operand* and *operator
  overloading*.
- The two maths pages the Python page linked to (`expressions-come-alive`
  and `rates-of-change`) have no dewsharp page, so they are linked by their
  full dewlab addresses, as `LESSON_FORMAT.md` allows, and the prose says
  they are Python pages.
- "Where to read more" cites Microsoft Learn (operator overloading; the
  `List<T>` constructors) in place of *Think Python* and the Python
  language reference.
- "Next" keeps dewlab's pointer to the designing-classes page, and says
  "if you came here from" Methods and overloading, because an explore
  page is not in the course's reading order.
- Wording: phrasal verbs from dewlab's text were replaced ("leave out"
  became "skip", "walks down" became "checks each power below it in
  turn", "go through" and "look at" were rephrased), and "a nuisance"
  became "make extra work". "Which method was the hardest to get exactly
  right?" became "Which method took you the most attempts before it did
  what you wanted?", because *right* is a verdict word. The parameters of
  `operator +` keep Microsoft's names, `left` and `right`; the prose
  describes them as "written before the `+`" and "after it". "Looking
  back" stays as the closing heading, to match the other drafts.
- One question was added to "Looking back": `private` and the copy each
  close one door, so why does the class need both?

## What C# made different, in short

- A method that does not exist yet is a compiler error (CS1061), so every
  "add a method" task starts from a program that does not compile.
- A method that returns a value must return one on every path (CS0161).
- The list is a reference type; `private` guards the name, not the list.
  The copy in the constructor is the only guard for the list.
- `private` is per class, so `other._coefficients` compiles in `Add`.
- `+` between two objects of a new class does not compile (CS0019) until
  the class declares `public static ... operator +`. This is the page's
  new section.
- No power operator: `Math.Pow`, and `^` is exclusive or.
- Printing an object prints its class's name until `ToString()` is
  overridden.

## What should change once the page UI or the browser checker exists

1. **Long class cells.** The class cells are 19, 21, 31, 72 and 97 lines
   (and the last solution 116), against the style guide's 5 to 15. dewlab's cells were as long once its
   includes were expanded. Each stage repeats the whole class so that each
   starter is the stage before's answer. If the format gains includes
   (course map, open question 2), or the page can fold part of a cell,
   the last two class cells could show only their new methods. Without
   either, the alternative is to drop `polynomials-that-make-polynomials-1`
   and let the reader add `Add` to their own class from the stage before;
   that saves 72 lines but loses the working `ToString()` for a reader who
   did not finish it.
2. **Where the reader writes.** Each task's method goes into a class cell
   above the task's program cell, sometimes a few cells above (Degree goes
   into the first cell of the page). The prose names the cell each time.
   If the page can link to a cell, or show which class a program cell is
   using, the prose could be shorter.
3. **Compare with a solution.** Each solution is the program's statements
   and then the whole class, so it replaces the reader's class for that
   run (rule 4). The native check runs it that way; the page should do the
   same. "Show the solution" will show statements before a class, a
   different layout from the page's two cells. The same point as in the
   keeping-details notes.
4. **Inputs on a starter that does not compile.** For the three CS1061
   starters, every input shows a compile error until the reader writes
   the method. That is expected, but the Compare table should say "did not
   compile" rather than show the long message in each row.
5. **The challenge does not compile as given.** It holds the statements
   and a comment that asks the reader to paste their class below them.
   The native check does not run challenges. Probe P1 runs it with one
   answer. If the notebook should open with code that compiles, the
   challenge would need the whole class (about 100 lines).
6. **A reader's half-edited class.** A class cell that does not compile
   stops every program below it until a later class cell replaces it. On
   this page each stage's class replaces the one before, so a broken class
   affects only the programs of its own stage.

## Open questions for a reviewer

1. **Size.** The course map says M (8 to 15 cells). The page has 14 cells,
   near the top of M, but the class cells make it long to read. See item 1
   above.
2. **Operator section placement.** It sits after Add and before the
   derivative, so the derivative (optional) still closes the story. The
   other order (derivative, then `+` as the last section) would end the
   page on the C# idea, and leave the ball's answer in the middle.
3. **`new Polynomial(new List<double> { 1.5, 20, -5 })` is long.** Two
   shorter forms exist: a collection expression,
   `new Polynomial([1.5, 20, -5])` (C# 12, which no dewsharp page teaches
   yet; it would match Python's list exactly), or a `params double[]`
   constructor, `new Polynomial(1.5, 20, -5)` (which hides the list the
   aliasing section depends on). The draft uses the form earlier pages
   use. Worth deciding course-wide whether collection expressions appear
   at all.
4. **`Degree()` as a method.** Idiomatic C# might make it a property,
   `Degree`, once it is one line. The page keeps dewlab's method, because
   the first version has a loop, and a property with a loop is a new idea.
5. **Links to dewlab's Python maths pages.** The two links send a C#
   reader to Python pages for the maths. Keep, or drop them and say only
   "if you have met this list in a maths class"?
6. **`covers`.** The course map says `[FOOP-LO4, FOOP-LO8]`, which the
   page has. dewlab gave FOOP-LO3 to the constructor's rule. As an explore
   page it is not counted in the outcome table anyway.
7. **Batch and links.** The page links back to `one-class-many-methods`,
   `objects-and-classes`, `two-names-one-list`, `two-names-one-object` and
   `from-a-description-to-classes`, all of earlier batches (2, 0, 5, 8
   and 3). Only `keeping-details-inside-an-object` and
   `the-moves-you-already-know` of those have drafts so far; the link
   texts use the course map's titles.
8. **The "rules of the road" references** point to rules 2, 3 and 4 by
   number, as the other FOOP drafts do. The page assumes the reader met
   them on `objects-and-classes`.

## Where each number and message in the prose comes from

| Number or claim | Source |
|---|---|
| `0 s: 1.5 m` … `4 s: 1.5 m`; greatest `21.5` after 2 s | `a-ball-in-the-air-2` |
| CS1061 for `Degree` | `the-highest-power-1` |
| `2`, `1`, `0` | `the-highest-power-1`, solution with inputs |
| CS0161 message | probe P4 |
| `3` | `a-rule-for-the-coefficients-2` |
| `1`, then `1, 2, 0, 3` | `a-rule-for-the-coefficients-4` |
| printing a list prints its type's name | probe P3 |
| `"10" + 2` gives `"102"` (ToString notes, operator predict) | probe P3 |
| `Polynomial` | `printing-it-the-way-we-write-it-1` |
| `-5x^2 + 20x + 1.5`, `x^2 - 1`, `2x^3 - x + 3`, `0` | `printing-it-the-way-we-write-it-1`, solution with inputs |
| CS1061 for `Add` | `polynomials-that-make-polynomials-2` |
| `2x + 1`, degree 1, `first` still `3x^2 + 2x + 1` | `polynomials-that-make-polynomials-2`, solution with inputs |
| CS0019 message | `a-plus-sign-for-polynomials-1` |
| predict option `3x^2 + 2x + 1-3x^2` | probe P2 |
| `public static` both needed (CS0558) | probe P5 |
| `2x + 1`, then `-5x^2 + 20x` | `a-plus-sign-for-polynomials-3` |
| CS1061 for `Derivative` | `polynomials-that-make-polynomials-3` |
| `-10x + 20`, `0` at 2 s, `0` for `{ 7 }` | `polynomials-that-make-polynomials-3`, solution with inputs |
| `x^2 - 1` for $(x + 1)(x - 1)$ | probe P1 |

## Probes

Each probe is one program: its statements, then its class. The probes
whose class does not compile come last, because a class carries down to
the cells below it.

### P1. The challenge, with one answer (prose: $x^2 - 1$)

```csharp exec
id: probe-challenge-multiply
var first = new Polynomial(new List<double> { 1, 1 });     // x + 1
var second = new Polynomial(new List<double> { -1, 1 });   // x - 1
Console.WriteLine(first.Multiply(second));
Console.WriteLine(first * second);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Multiply(Polynomial other)
    {
        var product = new List<double>();
        for (int i = 0; i < _coefficients.Count + other._coefficients.Count - 1; i++)
        {
            product.Add(0);
        }
        for (int mine = 0; mine < _coefficients.Count; mine++)
        {
            for (int theirs = 0; theirs < other._coefficients.Count; theirs++)
            {
                product[mine + theirs] = product[mine + theirs] + _coefficients[mine] * other._coefficients[theirs];
            }
        }
        return new Polynomial(product);
    }

    public static Polynomial operator *(Polynomial left, Polynomial right)
    {
        return left.Multiply(right);
    }
}
```

### P2. The operator predict's second option: the two texts joined

```csharp exec
id: probe-texts-joined
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first.ToString() + second.ToString());

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }
}
```

### P3. Printing a list prints its type; `"10" + 2` (prose: "printing a list itself prints only the name of its type"; `"102"`)

```csharp exec
id: probe-print-a-list
var numbers = new List<double> { 1, 2, 0, 3 };
Console.WriteLine(numbers);
Console.WriteLine(string.Join(", ", numbers));
Console.WriteLine("10" + 2);
```

### P4. `Degree()` without its last `return 0;` (prose: CS0161)

```csharp exec
id: probe-degree-without-return
expect: CS0161
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height.Degree());

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public int Degree()
    {
        for (int power = _coefficients.Count - 1; power >= 0; power--)
        {
            if (_coefficients[power] != 0)
            {
                return power;
            }
        }
    }
}
```

### P5. `operator +` without `static`, then without `public` (prose: C# needs both)

```csharp exec
id: probe-operator-not-static
expect: CS0558
var first = new Polynomial();
Console.WriteLine(first + first);

class Polynomial
{
    public Polynomial Add(Polynomial other)
    {
        return this;
    }

    public Polynomial operator +(Polynomial left, Polynomial right)
    {
        return left.Add(right);
    }
}
```

```csharp exec
id: probe-operator-not-public
expect: CS0558
var first = new Polynomial();
Console.WriteLine(first + first);

class Polynomial
{
    public Polynomial Add(Polynomial other)
    {
        return this;
    }

    static Polynomial operator +(Polynomial left, Polynomial right)
    {
        return left.Add(right);
    }
}
```
