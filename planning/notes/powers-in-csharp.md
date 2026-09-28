# powers-in-csharp: notes for a reviewer

Ported from dewlab `tutorials/powers-in-python/powers-in-python.md`
(version 2026.09.26.1), a "closer look" page (dewlab DECISIONS_LOG 7.261)
that sits after `first-steps`. dewlab has no practice page for it, and its
glossary file has `entries: []`, so there is neither here. A closer look
keeps no worlds (`planning/COURSE_MAP.md`, "Lessons with no worlds").

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/powers-in-csharp/powers-in-csharp.md`, its recorded
outputs are `lessons/powers-in-csharp/powers-in-csharp.outputs.json`
(written by the browser checker), and this file was the draft's
`NOTES.md`. The `*.native.json` file was deleted: the browser checker's
outputs file replaces it. "What was done when it moved", just below, says
what changed in the move. The porter's notes follow it, with anything the
move made stale marked. "The porter's questions, and what was decided"
settles the open questions where the playbook, the course map, the style
guide or the exemplars answer them; the rest are under "Open".

Files:

- `powers-in-csharp.md`: the lesson. Five program cells, two of them meant
  not to compile (`expect: CS0193`, `expect: CS0266`), two choice predicts,
  one solution, and two answer folds. No hints, `inputs` or challenge.
- `powers-in-csharp.outputs.json`: what the browser checker recorded.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write powers-in-csharp`
  ran the draft's two cells in the real engine. Both did what the native
  check said: `an-experiment-1` printed `8` and `1`, and
  `where-else-it-happens-1` did not compile, with CS0266 at line 1, column
  12 and the same text. The page shows it as
  `Program.cs(1,12): error CS0266: …`, as the prose quotes it.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches the native check's:
  `0 4 7 25 1 0 1 1 9 -9` for `fold-numbers`, one agreeing pair (1 and 0)
  for `fold-search`, CS0019 at (1,19) for `fold-decimal`
  (*Operator '^' cannot be applied to operands of type 'double' and
  'int'*), CS0193 at (1,22) for `python-power` (*The * or -> operator must
  be applied to a pointer*), `25` for `fold-fix`, and `True`, `False` for
  `xor-bool`. Two more probes, run only in the browser, are at the end:
  `search-negatives` finds a second agreeing pair, -1 and -2, and
  `cast-fix` prints 25.
- **Every number in a fold now comes from a cell on the page** (decision
  29, which answers the course map's open question 7: no hidden cell). The
  draft's first fold quoted numbers that only the probes printed, so:
  - A new cell, `an-experiment-2`, sits under the question "Can you find
    two numbers where `^` and `Math.Pow` give the same answer?". It prints
    three pairs, one on each line, as `0 and 4`, `7 and 25` and `1 and 0`,
    and the reader changes them or copies a line to try more. The fold
    quotes those three lines.
  - The fold no longer says "both give 1" for `1 ^ 0`: it says the two
    give the same number, and asks the reader to add a line and run it.
    The claim "with whole numbers from 0 to 20, only 1 and 0 agree" went:
    it needs two loops, which PDP meets on *Loops*. The fold says pairs
    like this are hard to find.
  - The fold no longer quotes the CS0019 message for `2.5 ^ 2`. It says the
    program did not compile, because `^` works only with whole numbers
    (probe `fold-decimal`). `double` is not defined until "Where else it
    happens", so the fold says "a number with a decimal point".
- **`2 ** 3` is now a cell**, `why-idea-a-is-easy-to-believe-1`, with
  `expect: CS0193`, and the prose says before it that it is meant not to
  compile. The course map's entry names CS0193 as page content, and a
  quoted error code is recorded output like a number. The prose no longer
  quotes the message's text (its `->` would only confuse); it says the
  message points at the second `*` (column 22) and talks about a
  *pointer*, "a part of C# that this course does not use".
- **The second fold became a `solution` block** on
  `where-else-it-happens-1`, so "the cell prints 25" is recorded (the
  checker runs solutions: `solutions[0].output` is `25`). This is the
  exemplar's shape for "Can you make this cell work?"
  (`objects-and-classes`, `the-rules-of-the-road-3`). Its note also names
  the other change the message suggests, the cast
  `int area = (int)Math.Pow(5, 2);` (probe `cast-fix`), without a number.
- **The prose says the cell is meant to fail before it runs** (TRANSLATING
  checklist; `first-steps-practice`, "One semicolon"; `objects-and-classes`,
  `the-rules-of-the-road-3`). The draft said it only after the run, to keep
  the guess open. The guess stays open anyway: the predict's three options
  are now the three ways it could fail, and the first is "It runs, and
  prints a number that is not 25", with the note "That is what `2 ^ 3`
  did. Is this the same kind of mistake?".
- **The three outcomes are pointed back to, not defined again.**
  `first-steps` defines compiling and the three outcomes ("When C# finds a
  problem"), so the sentence before the cell now says "After a Run, the
  page says which of three things happened, as on the first page: it did
  not compile, it stopped with an exception, or it ran", which is also
  what the page's status line says.
- **The opening** now links to `first-steps#a-few-more-things-c-can-do`,
  the section where `Math.Pow(2, 3)` prints 8 (the renderer supports the
  anchor, and the page scrolls to it). `first-steps` defines *operator*
  and *method*, so the opening recalls them in half a sentence ("no symbol
  that does it, as `*` does multiplication") instead of two definitions.
- **A new definition, *type*.** The draft's "the compiler checks that the
  types on each line fit together" came before PDP defines *type*
  (`storing-and-computing` does, a page later). The paragraph now starts
  "Every value in C# has a *type*: the kind of value it is." `double` is
  defined where it first appears, in the CS0266 paragraph, as before.
- **"A later page explains casts"** became a link,
  `[The next page](lesson:storing-and-computing#type-conversion)`, and
  *Types and their sizes* in italics, as the course map's entry asks. The
  link text is "The next page" because `storing-and-computing` is the next
  page in `courses/pdp.yaml`, and its title has changed during this round
  ("Variables, types and text" on disk, "Variables and types" in the
  map). That section refers back here for CS0266 and the word *convert*,
  so both stay.
- **A fifth cell, `where-else-it-happens-2`, and an answer fold.** The
  course map's `first-steps` entry says "The two power problems move to
  the closer look's answer folds", and `first-steps-practice` dropped them.
  dewlab's problem 5 (`2 ** 10`, `10 ** 2`, `2 ** 0.5`, `2 ** -1`) is now
  a cell of four `Math.Pow` lines under the question "Why does `Math.Pow`
  give a `double`, even for 5 squared?", and its fold gives the four
  numbers from the recorded output: 1024, 100, 1.4142135623730951 and 0.5.
  It gives the CS0266 paragraph its reason. Problem 6 (powers of powers,
  `2 ** 3 ** 2`) has no C# version: `Math.Pow`'s brackets say which power
  comes first (probe `power-of-power`: 512 and 64), so there is no
  surprise to show.
- **The first predict's options name their ideas**, as dewlab's
  closer-look shape asks (7.261: "one experiment whose predict block names
  the idea behind each option"): `1` is "what idea B allows", and "Nothing:
  the program does not compile" is "idea B too, if C# does not accept `^`
  between two whole numbers".
- **Frontmatter.** `covers: [PDP-LO4, PDP-LO9]`, from the course map's
  entry (the draft had none because dewlab's page has none; the style
  guide's checklist asks each page to name its outcomes). `version:` is
  `2026.09.28.1`: three cells are new and a solution was added.
- **Visual Studio.** One line before "Where to read more": everything on
  the page runs in the browser, and nothing needs Visual Studio
  (`#the-ide`; the style guide's checklist).
- **Where to read more** keeps one source, as the course map says a closer
  look does ("it ends with one thing to read"), written in `first-steps`'s
  form: Microsoft, *C# operators and expressions*, whose precedence table
  lists `x ^ y` as logical XOR. It returned HTTP 200 on 28 September 2026.
  The `Math.Pow` API page went: it is a reference page, dense for a Level
  5 reader, and the page now shows what `Math.Pow` does with 0.5 and -1.
- **A pointer to the extra lesson** *Bits that flip* (PDP's explore list,
  `bits-that-flip`, not written yet, so in italics under decision 32),
  where the course map says `^` is explained.
- **The page was looked at** in headless Chromium on the real site, at 900
  and 390 pixels wide: each cell is labelled PROGRAM with `Program.cs`,
  the two compiler messages read as the prose quotes them, the solution
  fold sits under its cell, the three folds open with their text, there is
  no sideways scroll at 390 pixels, and the console showed no errors.
- **Not done here: `courses/pdp.yaml`** still has
  `powers-in-csharp: "Powers: a closer look at Math.Pow and ^"` under
  `planned:`. The playbook's checklist says to delete it when the lesson
  moves; this round's instructions leave the course files to the
  orchestrator.

## What changed from dewlab, and why (the porter's notes)

**The pair of ideas.** Python's page compares `**` with `^`. C# has no
operator for a power, so the page compares `Math.Pow` with `^`. The title
became "Powers: a closer look at Math.Pow and ^". (The draft's opening
defined *operator* and *method*; since `first-steps` defines both, the
moved page recalls them instead.)

**The experiment** keeps its cell and its predict. `Math.Pow(2, 3)` prints 8
and `2 ^ 3` prints 1, as in Python. The third option "An error" became
"Nothing: the program does not compile". In C# a failed compile prints
nothing, not even the first line, and the prose above the cell says so. That
is the compile step from `first-steps`, used again.

**New paragraph: why the compiler says nothing.** This is the C# point of
the page. The compiler checks that types fit; `2 ^ 3` is two `int` values
giving an `int`, so it passes. It cannot know which calculation you meant.

**The first answer fold** keeps dewlab's pairs, in C#, now printed by
`an-experiment-2` (see above). It gains one paragraph: `2.5 ^ 2` does not
compile, because `^` is not defined for `double`. Python only finds that at
run time (a TypeError), so here C# behaves differently and the page says so.

**"Why idea A feels right" became "Why idea A is easy to believe".** The
style guide's list of verdict words includes *right*, and dewlab's own
closer-look template describes this section as explaining why the other idea
"is so easy to believe". The section anchor changes; nothing links to it.

**The history sentence.** "Python took `^` from C and `**` from Fortran"
became "C# took `^` from C, and C has no power operator either; it has a
function, `pow`, and C# has the method `Math.Pow`." A new short part is for
learners who know Python: `2 ** 3` does not compile in C#, and the message
(CS0193) is about pointers, because C# reads `**` as `*` followed by a
pointer operator. It tells the reader what to look for when they meet it.

**"Where else it happens" has a new second surprise.** Python's was
`-3 ** 2` printing -9 (powers before the minus sign). That does not carry
over: C# has no power operator, and the brackets of `Math.Pow` say which
number is raised. `Math.Pow(-3, 2)` is 9 and `-Math.Pow(3, 2)` is -9 (probe
below), with no surprise either way. C#'s own second surprise with powers is
the type: `Math.Pow` always gives a `double`, so
`int area = Math.Pow(5, 2);` does not compile (CS0266). This cell is a
mistake on purpose (`expect: CS0266`). Its predict offers the three ways it
could fail. The message is read in the order `first-steps` teaches; the page
explains *convert* and *implicitly*, and links to the page that explains
casts. The solution changes `int` to `double`, and notes that
`Console.WriteLine` shows a whole `double` as `25`, not `25.0` (Python
learners expect `25.0`).

**A closing paragraph** puts the two surprises side by side: one compiled
and gave a number that is not a power, the other did not compile and said
where. The compiler checks types, not intentions.

## What C# made different, in short

- No power operator. A power is a method call, and it returns a `double`.
- `^` compiles for whole numbers and quietly gives a number that is not a
  power, exactly as in Python. For a `double` it does not compile, where
  Python fails only at run time.
- A failed compile runs nothing, so "the second line fails" means "neither
  line prints".
- `Console.WriteLine` prints a whole `double` without `.0`.
- `2 ** 3` does not compile, with a message about pointers.

## Where each number in the prose comes from

| Number or claim | Source |
|---|---|
| 8 for `Math.Pow(2, 3)` (opening, experiment), and 1 for `2 ^ 3` | cell `an-experiment-1`, output `8`, `1` |
| 0 and 4, 7 and 25, 1 and 0 (first fold) | cell `an-experiment-2` |
| 25 square metres (set-up of the task), the solution prints 25 | `an-experiment-2` (`7 and 25`), and `where-else-it-happens-1`'s solution, output `25` |
| CS0193, "points at the second `*`", "talks about a pointer" | cell `why-idea-a-is-easy-to-believe-1`: CS0193 at line 1, column 22 |
| CS0266 at line 1, the 12th character, and its text | cell `where-else-it-happens-1` |
| 1024, 100, 1.4142135623730951, 0.5 (last fold) | cell `where-else-it-happens-2` |
| `1 ^ 0` and `Math.Pow(1, 0)` give the same number (no number quoted) | probes `fold-numbers`, `fold-search` |
| another answer exists, so the fold keeps "Yours may be different" | probe `search-negatives`: -1 and -2 |
| `2.5 ^ 2` does not compile (no message quoted) | probe `fold-decimal` |
| the cast `(int)Math.Pow(5, 2)` also works (no number quoted) | probe `cast-fix` |
| `=2^3` gives 8 in a spreadsheet; 5 metres | not program output: carried over from dewlab, or the set-up of the task |

## The porter's questions, and what was decided

From "Once the course map or the page UI exist":

- **The link to first-steps has no section anchor.** Decided: the anchor
  is `#a-few-more-things-c-can-do`, the section where `first-steps` shows
  `Math.Pow(2, 3)` and says "A later page looks closely at powers". The
  opening sentence's assumption holds.
- **"A later page explains casts" has no link.** Decided: it links to
  `storing-and-computing#type-conversion` (in `lessons/` this round), and
  names *Types and their sizes* in italics, as the course map's entry says.
- **Course map placement.** Done by the map: second in PDP's "First
  programs", after `first-steps`.
- **A choice predict before a cell that fails to compile.** Checked on the
  real page: after the run, the predict shows the guess beside "Nothing:
  it did not compile. The messages are under the cell.", then the chosen
  option's note and "Which line explains what you saw?". It reads
  sensibly with every option.
- **A `console` fence inside a `dl-answer` fold.** No longer arises: the
  fold does not quote the CS0019 message (see above). `first-steps-practice`
  quotes messages inline in folds, which renders.
- **The fixed answer-fold line.** Decided: the first fold now has *Here is
  one answer. Yours may be different and work too.* (LESSON_FORMAT, "The
  line in an answer fold"). The porter left it out because only one pair
  agrees from 0 to 20, but -1 and -2 agree too (probe `search-negatives`),
  so a reader can find a different answer. The last fold is a factual
  answer, like `first-steps-practice`'s "Which comes first", and has no
  such line.

From "Open questions for a reviewer":

1. **A challenge at the end?** Decided: no. The course map's "Closer
   looks" says a closer look "has no worlds and no practice page ... and it
   ends with one thing to read", which is dewlab's shape too. The page ends
   with its closing paragraph, the line on Visual Studio, and one thing to
   read.
2. **Should the page name `^` (exclusive or)?** Decided: not on this page.
   The course map gives `^` its own page, the extra lesson `bits-that-flip`
   ("C#'s `^` is the exclusive or that `powers-in-csharp` found by
   accident"), which depends on this page and on *Types and their sizes*
   for bits. Naming it here would need a definition, and the one that
   works for `2 ^ 3` needs binary. The page now points to *Bits that flip*
   in italics. The `bool` probe (`true ^ false`) stays unused: `bool` is
   met on the next page. The second job of `^`, "from the end"
   (`letters[^1]`), is for the lists page to mention, and a link back
   here, if wanted, is added by that page's batch (course map, batch
   rule 3).
3. **Keep the Python paragraph (CS0193)?** Decided: keep it. The course
   map's entry lists "`2 ** 3` does not compile (CS0193, a message about
   pointers)" as part of the page. It is now a cell meant not to compile,
   so the code the prose names is recorded.
4. **Shorten the exception sentence if `first-steps` defines it.** Decided:
   `first-steps` defines all three outcomes, so the sentence now points
   back to them in the style guide's words, and defines none of them again.
5. **A note about `Math.Pow(-3, 2)`?** Decided: leave it out. The course map
   replaces Python's `-3 ** 2` with CS0266 ("C#'s own second surprise in
   place of Python's `-3 ** 2`"), and a note would need a cell for its two
   numbers.
6. **A fourth option, "It stops with an exception", in the first
   predict?** Decided: no. The exemplars' predicts on the same question
   have two or three options with no exception option
   (`first-steps-practice`, "One semicolon";
   `objects-and-classes-practice`, "A name that is not there"), and the
   prose above the cell names the one other outcome worth a guess, that
   C# refuses the line.

## Open

For Josh:

1. **The page has five cells; the course map's entry says two or three.**
   Each new cell follows a rule: `an-experiment-2` and
   `where-else-it-happens-2` hold numbers their folds quote (decision 29),
   `why-idea-a-is-easy-to-believe-1` holds the CS0193 the map's entry
   names, and `where-else-it-happens-2` is also where the map sends
   `first-steps-practice`'s power problems. It is still an S page (under
   eight cells). If it should be shorter, `where-else-it-happens-2` and its
   fold are the part to cut; then the two power problems have no home, and
   the course map's `first-steps` entry should say so.
2. **The first predict can be counted as the same when it is not.** It
   asks "What will the second line print?". The page compares a `choice`
   guess with the whole output and with each of its lines (decision 37),
   so the guess `8` matches the first line, `8`, although the second line
   printed `1`. The page then shows the guess and the output side by side,
   with the note "This is what idea A predicts.", but does not ask "Which
   line explains what you saw?". Nothing on this cell waits for
   `after: guess differed`, so nothing else is lost. The cell and its
   predict are dewlab's, and the lesson can't avoid it without labelling
   the lines. A fix belongs in the page (a way for a predict to name the
   line it asks about), not in this lesson.
3. **The Visual Studio line.** The page says only that nothing on it needs
   Visual Studio. It could also say that Visual Studio gives the same
   error codes, since it uses the same compiler, but the checker can't
   run that claim, so it is left out.

## Probe cells

Run with the NativeCheck command, passing this file, or in the browser by
copying them into a scratch lesson (`node tools/check-lessons.mjs
--lessons <scratch>/lessons --write`). The `expect:` cells fail on purpose.

```csharp exec
id: fold-numbers
Console.WriteLine(2 ^ 2);
Console.WriteLine(Math.Pow(2, 2));
Console.WriteLine(5 ^ 2);
Console.WriteLine(Math.Pow(5, 2));
Console.WriteLine(0 ^ 1);
Console.WriteLine(Math.Pow(0, 1));
Console.WriteLine(1 ^ 0);
Console.WriteLine(Math.Pow(1, 0));
Console.WriteLine(Math.Pow(-3, 2));
Console.WriteLine(-Math.Pow(3, 2));
```

```csharp exec
id: fold-search
for (int a = 0; a <= 20; a++)
{
    for (int b = 0; b <= 20; b++)
    {
        if ((a ^ b) == Math.Pow(a, b))
        {
            Console.WriteLine($"{a} ^ {b} and Math.Pow({a}, {b}) agree");
        }
    }
}
```

```csharp exec
id: search-negatives
for (int a = -20; a <= 20; a++)
{
    for (int b = -20; b <= 20; b++)
    {
        if ((a ^ b) == Math.Pow(a, b))
        {
            Console.WriteLine($"{a} ^ {b} and Math.Pow({a}, {b}) agree");
        }
    }
}
```

```csharp exec
id: fold-decimal
expect: CS0019
Console.WriteLine(2.5 ^ 2);
```

```csharp exec
id: python-power
expect: CS0193
Console.WriteLine(2 ** 3);
```

```csharp exec
id: fold-fix
double area = Math.Pow(5, 2);
Console.WriteLine(area);
```

```csharp exec
id: cast-fix
int area = (int)Math.Pow(5, 2);
Console.WriteLine(area);
```

```csharp exec
id: power-of-power
Console.WriteLine(Math.Pow(2, Math.Pow(3, 2)));
Console.WriteLine(Math.Pow(Math.Pow(2, 3), 2));
```

```csharp exec
id: xor-bool
Console.WriteLine(true ^ false);
Console.WriteLine(true ^ true);
```

Browser results (28 September 2026): `fold-numbers` 0, 4, 7, 25, 1, 0, 1,
1, 9, -9; `fold-search` one line, for 1 and 0; `search-negatives` two
lines, for -1 and -2 and for 1 and 0; `fold-decimal` CS0019 at (1,19);
`python-power` CS0193 at (1,22); `fold-fix` 25; `cast-fix` 25;
`power-of-power` 512 and 64; `xor-bool` True and False.
