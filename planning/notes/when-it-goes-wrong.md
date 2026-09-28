# when-it-goes-wrong: notes for a reviewer

Ported from dewlab `tutorials/when-it-goes-wrong/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file, with one idea from
`tutorials/finding-where-it-went-wrong/` (Computational Methods). The brief
is the course map's entry (`planning/COURSE_MAP.md`, PDP row 23): action
*adapt*, shape *tutorial*, size L, batch 8, depends on
`building-reusable-tools` and `looking-things-up-by-name`.

## Moved into `lessons/` (28 September 2026)

The draft was ported and checked with the native checker in `drafts/`.
On 28 September 2026 it moved into `lessons/`, was run in the browser
engine, and was revised against the recorded outputs, the playbook's
checklist (`docs/TRANSLATING.md`) and the style guide. What that changed
is under "What the move changed". The porter's open questions are settled
under "Open questions", except for the ones under "Open", which are for
Josh.

Files now:

- `lessons/when-it-goes-wrong/when-it-goes-wrong.md`: the lesson, version
  2026.09.28.1, about 5,900 words. 24 exec cells, 4 of them in world
  variants (so 22 in each world), 6 of them types cells; 3 predicts,
  4 hints, 4 solutions, 3 `inputs` blocks, 3 answer folds, 3 fences to read
  (two `console`, one C#), 1 table and 1 challenge. Eleven cells are meant
  to fail: `a-count-that-forgets-1` (CS0103),
  `errors-from-lists-and-dictionaries-3` (CS1061), `the-dangerous-kind-5`
  (CS0161), and `expect: exception` on
  `errors-from-lists-and-dictionaries-1`, `-2` and `-4`,
  `reading-a-traceback-1-program`,
  `tracebacks-through-several-functions-1-program`, `the-dangerous-kind-3`
  and the two `your-turn-1-tests--<world>` cells (a check that does not
  hold until the reader fixes the class).
- `lessons/when-it-goes-wrong/when-it-goes-wrong-practice.md`: the practice
  page, version 2026.09.28.1, 13 problems. 15 exec cells, 4 in world
  variants (13 in each world); 3 predicts, 4 hints, 5 solutions, 4
  `inputs` blocks, 10 folds. Eight cells are meant to fail: CS0165
  (`a-list-that-was-never-made-1`), CS0136 (`the-same-name-twice-1`), and
  `expect: exception` on `which-error-1`,
  `a-count-that-starts-from-nothing-1`, `two-things-to-find-1-program`,
  the two `counting-in-the-wrong-thing-1-tests--<world>` cells and
  `from-earlier-throw-on-purpose-1`.
- `when-it-goes-wrong.outputs.json` and
  `when-it-goes-wrong-practice.outputs.json` beside them: what the browser
  checker recorded.
- This file, which was `NOTES.md` in the draft folder.

The draft's `*.native.json` files are deleted, and so is the draft folder.
The pages have no pictures. `courses/pdp.yaml` still has a `planned:` line
for `when-it-goes-wrong`; the playbook says to delete it when the lesson
moves, and this move was not allowed to edit the course files.

## What the browser showed

Before any change, the browser checker recorded the same outputs as the
native checker for every cell, solution and `inputs` row of both pages, in
both worlds: the same printed text, the same compiler codes, lines and
columns, the same exception types and messages. `3.75` prints with a point
in `en-IE`, as it did natively; no number on either page depends on the
culture. No warnings travel down either page. The differences were in what
each checker can record, not in what the code did:

- The native checker labelled a compiler message with the cell id where
  the page shows `Program.cs` or the cell's `file:`, and it kept only the
  innermost frame of an exception report. The browser records every frame,
  with its cell, line and method:
  `reading-a-traceback-1-program` has line 5 and line 13 of `Cipher.cs`
  (`Cipher.EncodeLetter(char, Dictionary<char, char>)`,
  `Cipher.Encode(string, Dictionary<char, char>)`) and line 3 of
  `Program.cs`, which is what the draft's prose said from `dotnet run`.
- The native checker could not show a dictionary as an `inputs` value
  (`System.InvalidCastException`); the browser shows
  `{ ['A'] = 'Q', ['B'] = 'W' }` and `{}`.

The page itself (looked at with Playwright, `npm run serve`): the kind
label and file of each cell are as the prose says (`Cipher.cs`,
`Brightness.cs`, `Test.cs`, `KeyTools.cs` or `Pixels.cs`, `Drawing.cs`;
program cells `Program.cs`); a compiler message shows as
`Program.cs(8,12): error CS0103: ...`; a report shows as
`at line 5 of Cipher.cs (in Cipher.EncodeLetter(char, Dictionary<char,
char>))`, with a fold *What .NET said, in full*. That fold has no line
from inside .NET (the draft's `Dictionary`2.get_Item` line came from
`dotnet run`). The page does not show `expect:` before a run, so a
predict whose answer is a failure is not given away.

`Download project` on `debugging-habits-1` (the debugger's program) writes
`Program.cs`, `Cipher.cs`, `Brightness.cs`, `Test.cs`, `KeyTools.cs` (in
the secret-messages world), `IrishCulture.cs`, the `.csproj`, the `.sln`
and `README.txt`. `dotnet build` of that solution (SDK 10.0.401): 0
warnings; `dotnet run` prints 3.75. Nobody has stepped through it in
Visual Studio (see "Open").

## What the move changed

### `Check`: the site's one version

The draft's `Test.Check(string claim, object expected, object found)`
printed a line for every check and never stopped. Every other `Test` class
in `lessons/` is `Check<T>(string claim, T expected, T found)`, which
throws when the values differ, word for word, including the page just
before this one, `building-reusable-tools`, which this page says it copies
("the same method as on Reusable methods, word for word"). Both porters
asked for one version for the site. So both pages now have that
`Check<T>`, with its XML comment, exactly as `building-reusable-tools` has
it (`the-dangerous-kind-check`, `counting-in-the-wrong-thing-check`). What
followed from it:

- The tests cells whose starter check does not hold until the reader fixes
  the class now have `expect: exception`, and the prose says so before the
  reader runs them: `your-turn-1-tests--<world>` in the lesson and
  `counting-in-the-wrong-thing-1-tests--<world>` in the practice page.
  Their report names the claim, what it expected and what it found, for
  example `E in the reversed key: expected C, found ?`, at line 11 of
  `Test.cs` and line 3 of `Program.cs`.
- Each tests cell and each solution ends with
  `Console.WriteLine("Every check held.");`, as on
  `building-reusable-tools`, since a check that holds prints nothing.
- The solutions add a check that does not hold for the first version.
  The draft's secret-messages solution added a check on an empty key,
  which holds for both versions (its own note said so); it now checks
  `W` in a reversed key of two pairs. Practice 7's secret-messages
  solution checked `SKY`, which also holds for both; it now checks
  `TREE`.
- The prose about `object` and `Equals` went; a paragraph says what
  *holds* means and what the exception's message holds, and one sentence
  says what **Compare with a solution** shows while a check stops the
  cell (as `building-reusable-tools` does).
- `your-turn-2`'s first hint ("What does each test print?") became
  "Which of your checks does not hold? Which method does it test?", and
  "the second habit" says that the report names the line of the check.
- The challenge now ends with its own copy of `Test` (the draft asked the
  reader to copy it, with the reason "Each Run starts a new program",
  which is not why: the challenge opens alone in a new notebook). The
  checker compiles it alone, and it compiles.

### Every number and quoted output from a recorded cell

The draft took several numbers and one compiler message from probes and
from `python3`. Each is now printed by a cell on the page, or the
sentence no longer needs it:

- **CS0161** was quoted in prose from a probe. It is a new cell,
  `the-dangerous-kind-5` (`expect: CS0161`), the method without its last
  `return false;`, with the question "Which line do you think the message
  names?" (line 1, column 13: the method's first line). This is also the
  course map's "a `return` inside a loop (CS0161)".
- **The average word length**: `debugging-habits-2` has a solution, the
  loop with `if (character != ' ')`, which prints `letters: 12, words: 4`
  and `3`. The prose now says "`"MEET ME AT NOON"` has 12 letters in 4
  words, so the average we mean is 3" (dewlab's "4, 2, 2 and 4 letters"
  went), and "the three spaces" became "the spaces". "Without `(double)`
  ... gives 3" became a question ("What does the first program print if
  you delete `(double)`?") with no number; probe `p-no-double` prints 3.
- **The debugger fold** gave 0, 4 and 5, from a probe that printed them;
  no debugger was run. It now says what the Locals window shows in words
  ("has not counted anything yet", "the number of letters in MEET",
  "counted the space as a letter") and ties it to the recorded 15.
- **`your-turn-2`** has two more `inputs` rows, `{ 200 }` (one pixel) and
  `{ 0, 200, 0 }` (the same both ways). The solution note's claim that
  those rows and the empty row give the same line with the bug is now in
  the table (`"#"` and `".#."` in both columns).
- **Python's outputs** (`{'A': 1}`, `[255, 0]`, `3 ####` three times) are
  gone. Each aside now says what Python does in words that point to a C#
  output on the page ("counts only one letter, as the next cell does";
  "misses one of the 0s, as the next cell does in C#"; "every line shows
  the same number").
- **Positions** ("0, 1 and 2", "0 to 4", "places 0 and 1") became "the
  positions start at 0, so the last position is one less than the length",
  and "the first two places".
- **Practice 3**: "prints 1" became "runs".
- **Practice 6** gained a solution (`row` and `column`), which records
  `0 ####`, `1 ####`, `2 ####`.
- **Practice 8**: the note's "prints 4, 2, 2, 3 and 6" became "prints one
  line for each word but the last", with the `"TONIGHT"` row of the table
  (0 and 1) as the evidence.
- **Practice 9** has a fourth `inputs` row, `-3 % 26`, which records -3.
  "`ShiftBack('A', 3)` gives `>`" became "would give a character that is
  not a letter" (probe `pp-shift-minus-only` prints `>`).
- **Practice 11**: the cell prints `Half(-7)` before `Half(7)`
  (decision 29: a number that dewlab left to "try it too" is printed by
  the cell), and the question is "What will each of the last three lines
  do?". It prints 4 and -3, then stops. "`-7 % 2` is -1" became "the
  remainder of a number below zero is below zero too, as on *Dividing*",
  and "`7 / 2` would quietly give 3" became "`Half(7)` would return a
  whole number, and nothing would say that the half was lost".
- **Practice 13**: "A is 65 and B is 66" became "0 plus the number for A"
  and "1 plus the number for B"; "`$"..."` prints `0A` and `1B`" became an
  invitation to change the line and run it.
- **Practice 7, secret messages**: "the number 69 underneath" became "a
  number underneath".

### The exception report

The lesson now shows the report as the page draws it (a `console` fence
with `at line 5 of Cipher.cs (in Cipher.EncodeLetter(char,
Dictionary<char, char>))`), then its two parts, *stack trace*, "Read it
from the top", and a paragraph on the fold *What .NET said, in full* and
on lines from inside .NET in Visual Studio. The draft's numbered list and
its `dotnet run` fence, with the `get_Item` line the page never shows,
went. This is the shape `the-tools-around-your-code` uses for the same
idea in FOOP, and the page before, `reading-an-error-message`, shows a
one-line report the same way.

### Links

Every page this one names that is in `lessons/` or moves in this batch is
now a `lesson:` link: *Exceptions* (`reading-an-error-message`), *Grids
and references* (`grids-and-references`), *Reusable methods*
(`building-reusable-tools`, three places over both pages), *Sorting*
(`putting-things-in-order`, both pages), *Programming languages*
(`how-we-got-here`), *Dictionaries* (`looking-things-up-by-name`),
*Dividing* (`dividing-in-csharp`, two places), *Variables and types*
(`storing-and-computing`) and *Arrays and lists* (`lists-and-sequences`).
No page is named in italics any more. Pages that link here:
`reading-an-error-message`, `lists-and-sequences-practice`,
`building-reusable-tools` and `the-team-project`.

### Plain words and verdicts

- Practice 7's heading, dewlab's "Counting in the wrong thing", has a
  verdict word; it is "Which thing is the loop counting?". The cell ids
  keep `wrong`, since they are dewlab's.
- "follow it back to where it came from" became "follow it to the place
  where it was made"; "A goes back to X" became "three letters back from A
  is X"; "the check lets it through" became "the check does not stop it";
  "Which end of `line` does each new character go on?" became "At which
  end of `line` does each new character appear?"; "the space came from
  the message" became "the space was in the message"; "as the loop goes"
  became "as the loop repeats".
- "passes the bug" (three solution notes) became "holds for both
  versions", the word `building-reusable-tools` teaches for a check.
- "a test that would have caught the bug" became "a test of your own ...
  that does not hold for the first version".

### Smaller changes

- `GetValueOrDefault(letter)` became `GetValueOrDefault(letter, 0)`, as
  every other PDP page writes it; the practice fold for problem 2 says
  what the 0 does.
- The `HasVowel` paragraph said "The `return false;` belongs after the
  loop", while the cell has one there; it now says that the `else` and its
  `return false;` do not belong in the loop.
- A copy of an array is "as on *Sorting*", where `ToArray()` was taught.
- The debugger's step 1 names the page's button, **Download project**,
  and step 2 names `IrishCulture.cs`, which Solution Explorer lists.
- A paragraph before "The next page" says what belongs in Visual Studio:
  everything on the page runs in the browser except the debugger.

## Frontmatter

- `title`: the course map's, "Debugging: finding bugs in bigger programs".
  The practice page is "Debugging: practice".
- `from: when-it-goes-wrong`; the practice page has
  `from: when-it-goes-wrong-practice` and `practice_for`.
- `worlds`: dewlab PDP's two, with dewlab's sentences. As in dewlab, only
  one task on each page has world variants (`your-turn-1` in the lesson,
  problem 7 on the practice page); everything else is shared.
- `covers: [PDP-LO9, PDP-LO10]`, from the course map.

## The lesson, section by section

**Opening (`a-count-that-forgets-1`, `-2`).** The course map: "becomes a
compiler error with a predict". `counts` is made inside the loop's braces
and returned after them: CS0103 at line 8. The predict keeps dewlab's
three options, reworded. `a-count-that-forgets-2` is new: it makes the
compiler accept the method by making `counts` before the loop and keeping
`counts = new();` inside it, so it runs and prints `A: 1`, which is
dewlab's Python answer. That is where the page names *symptom* and
*cause*, from `finding-where-it-went-wrong` ("Fixing the symptom or the
cause"). *Bug*, *debugging* and *logical error* are defined in the
paragraph after it.

**Errors from lists and dictionaries.** The table: `IndexError` became
`IndexOutOfRangeException` and `ArgumentOutOfRangeException`; `KeyError`
became `KeyNotFoundException`; `NullReferenceException` is new. dewlab's
`AttributeError` and "not callable" rows go (the first is CS1061 in C#;
the second has no C# twin). `-3` is `row.add(128)`, CS1061. `-4` is new:
the course map's "a list that was declared and never made" is CS0165 for a
local variable, so the cell uses an array of strings with its third place
never filled, and the fold says both things. The comment under each cell
is `// I think:`, because one of the four does not stop with an exception.

**Exception reports through several methods** (dewlab's "Tracebacks
through several functions"). The course map: "`reading-a-traceback-1`
needs an error that happens at run time". The new program is a
substitution cipher in `static class Cipher` (`Cipher.cs`), with the
program below it (`reading-a-traceback-1-program`, decision 26):
`Encode("MEET ME", key)` reaches the space three calls deep. A class, and
not local methods, because .NET names a local method in top-level
statements `Program.<<Main>$>g__EncodeLetter|0_0(...)` in Visual Studio's
report. The report is read from the top, as .NET prints it; one sentence
tells readers from Python. *Your turn*
(`tracebacks-through-several-functions-1`) is the same task in
`Brightness.cs`, with `int` values, so an empty row is a
`DivideByZeroException` (with `double`, `0.0 / 0` would be NaN, and no
exception).

**The dangerous kind.** `the-dangerous-kind-1`: `HasVowel`, with its
predict. dewlab's version has no `return` after the loop, which is CS0161
in C#; the cell has one, and `the-dangerous-kind-5` shows the version
without it. `the-dangerous-kind-2`: `Median` sorts its caller's array;
*side effect* is named here. `the-dangerous-kind-3`: removing from a list
inside its own `foreach` stops with an `InvalidOperationException` in C#,
where Python skipped an element with no message, so the cell has `expect:
exception` and the page's third predict. `the-dangerous-kind-4` is new: a
`for` loop with `RemoveAt(i)` runs and prints `0, 255`, which is dewlab's
skipped element. dewlab's comprehension is a loop that builds a new list,
in a fence to read.

*Your turn* in both worlds: the `Test` types cell, then in each world a
types cell (dewlab's `your-turn-1--<world>` id) and a tests cell (dewlab's
`your-turn-1-tests--<world>` id) with the `inputs`, a hint and the
solution. Secret messages: `ReverseKey` over `Dictionary<char, char>`.
Pixel art: `LitCount` from index 1. dewlab's `guess: yes` goes. Both
hints are `after: 1 runs`.

**Debugging habits.** `debugging-habits-1/2`: `AverageWordLength` returns
a `double`, with `(double)letters / words`. Without the cast, whole-number
division gives the answer the reader expects, from the bug; a paragraph
says one bug can hide behind another. The second habit keeps dewlab's
words, with `Check` for `assert`. *Your turn* (`your-turn-2`): the course
map asks for a new bug ("`return` in the loop is now CS0161"):
`line = Shade(value) + line;` draws every row backwards. The three methods
are in `static class Drawing`; `your-turn-2-tests` draws the picture and
holds the tests, the `inputs`, two hints and the solution.

**The next step: a debugger** is new. The course map asks for "a
breakpoint, Step Over, Step Into and the Locals window, with steps", and
the teacher notes put PDP's debugger work here. It follows
`the-tools-around-your-code`'s steps and words (F9, F5, the yellow arrow,
Locals, F10, F11, Shift+F5, Call Stack), on this page's
`debugging-habits-1`, so the reader sees the space counted without a
`Console.WriteLine`. Keys and menu paths agree with Microsoft's tutorial
cited at the end.

**Looking back.** A question about what the compiler found is added. The
challenge is rebuilt, since dewlab's third bug (`return best` inside the
loop) is CS0161 in C#: `LitCount` stops before the last pixel, `>=` keeps
the last of equal rows, and `Busiest`'s loop stops before the last row. On
the page's picture it prints `####`, the row a reader would choose (probe
`p-challenge-run`); probe `p-challenge-bugs` has a case that shows each
bug.

**Where to read more.** Evans's zine, and Microsoft's *Tutorial: Debug C#
code and inspect data* (both pages fetched again on 28 September 2026:
titles as cited).

## The practice page

dewlab's problems, in dewlab's order, with ids kept except where noted.
Predicts on 1, 6 and 13, the three where C# does something a reader would
not expect; 2 and 11 ask in prose.

| dewlab | Here | What changed |
|---|---|---|
| 1. Which error | 1 | `word[5]` on a `string`: `IndexOutOfRangeException`. The predict gains "It does not compile". |
| 2. A count that starts from nothing | 2 | `KeyNotFoundException`; the fold gives `GetValueOrDefault('E', 0)`. |
| 3. A name that was a function | 3. A list that was never made (`a-list-that-was-never-made-1`, new id) | Reusing `list` as a name is not a C# trap. `List<string> names;` then `names.Add` is CS0165. |
| 4. Two things to find | 4 | `Palette` in a types cell and `two-things-to-find-1-program`: `KeyNotFoundException` for `'x'`, line 5 of `Palette.cs`, line 3 of `Program.cs`. |
| 5. The whole chain | 5 | "traceback" became "exception report". |
| 6. The same name twice | 6 | Two nested loops that both make `i` is CS0136. A solution with `row` and `column`. |
| 7. Counting in the wrong thing | 7. Which thing is the loop counting? | A `Test` types cell first. Secret messages: `for (int letter = 0; ...)` compared with `'E'` compiles, because a `char` is a number. Pixel art: `picture[c][row]`; the third `inputs` row shows `IndexOutOfRangeException` for the first version. |
| 8. Where it stops being right | 8. What the loop sees (id kept) | dewlab's bug (a loop over a sentence as if over words) is CS0030 in C#. The new bug: a loop that checks the count at each space never checks the last word. A solution with `Split(' ')` and `inputs`. |
| 9. Test the pieces | 9 | `ShiftBack` and `Decode` as local methods; the three-line log from `finding-where-it-went-wrong`; `inputs`, a hint and a solution, whose note explains C#'s remainder below zero. |
| 10. Explain it to a duck | 10 | "stuck" became "cannot find a bug". |
| 11. From earlier: raise on purpose | 11. From earlier: throw on purpose (`from-earlier-throw-on-purpose-1`, new id) | `throw new ArgumentException`, from *Reusable methods*; the cell prints `Half(-7)` too. |
| 12. From earlier: nearly in order | 12 | "without a flag" became "with no way to know that the array is sorted". |
| 13. From earlier: a number and a letter | 13 | `index + word[index]` adds an `int` and a `char`, and prints 65 and 67, where Python stopped. |

## The glossary file

dewsharp has no glossary panel (`docs/LESSON_FORMAT.md`), so no
`.glossary.yaml` was written. Each term is defined in the prose where it
first appears: *symptom*, *cause*, *bug*, *debugging*, *logical error*
(the opening); the four exceptions and `null` (the table); *off-by-one
error* (the fold); *stack trace*, *the line that failed*, *the line that
is responsible* (reports); *side effect*; *holds* (the `Test` cell);
*debugger*, *breakpoint*, *stepping*, **Step Into**, **Step Over**; and on
the practice page, *log*.

## What C# made different, in short

- The compiler finds several of dewlab's run-time bugs before the program
  runs: a variable used outside its braces (CS0103), a method a list does
  not have (CS1061), a method with a path and no `return` (CS0161), two
  loop variables with one name (CS0136); and one new to C#, a local
  variable never given a value (CS0165).
- What the compiler cannot see is a value: a position, a key, `null`, a
  space in a message. Those are the page's exceptions.
- Changing a list inside its own `foreach` stops the program, where
  Python skipped an element quietly; the quiet version needs a `for` loop.
- `+` on an `int` and a `char` adds, and `==` compares an `int` with a
  `char`, so two of dewlab's `TypeError`s become silent logical errors.
- Whole-number division hides the average bug, and `-7 % 2` is not 1,
  which lets a negative odd number past `n % 2 == 1`.
- An exception report lists the most recent call first.
- No `tests:` cell and no `assert`: `Test.Check<T>`, which throws, in a
  types cell, and tests in the program cell below it.
- The page cannot pause a program, so the debugger is taught in Visual
  Studio, with steps.

## Where each number in the prose comes from

All from the browser checker's recorded outputs (`*.outputs.json`), run
on 28 September 2026, unless the row says otherwise.

| Number or quoted output | Recorded by |
|---|---|
| `Program.cs(8,12): error CS0103: ...`; line 8 | `a-count-that-forgets-1` |
| `A: 1` | `a-count-that-forgets-2` |
| *Index was outside the bounds of the array.* | `errors-from-lists-and-dictionaries-1`; practice `which-error-1` |
| *The given key 'a' was not present in the dictionary.* | `errors-from-lists-and-dictionaries-2` |
| `error CS1061: 'List<int>' does not contain a definition for 'add'` | `errors-from-lists-and-dictionaries-3` |
| *Object reference not set to an instance of an object.* | `errors-from-lists-and-dictionaries-4` |
| `ArgumentOutOfRangeException` for a list (a name, no number) | probe `p-list-past-end`, in the browser |
| CS0165 for a list never given one (the lesson names no message) | practice `a-list-that-was-never-made-1`; probe `p-list-never-given` |
| `DQQZ`; the report: line 5 and line 13 of `Cipher.cs`, line 3 of `Program.cs`, the methods, the message | `reading-a-traceback-1-program` |
| `DivideByZeroException`; line 10 of `Brightness.cs`; line 4 of `Program.cs` | `tracebacks-through-several-functions-1-program` |
| `True False False` | `the-dangerous-kind-1` |
| `error CS0161: 'HasVowel(string)': not all code paths return a value`; line 1 | `the-dangerous-kind-5` |
| 20; `10, 20, 30` | `the-dangerous-kind-2` |
| a copy leaves `readings` as it was (no number) | probe `p-median-copy` (20; `30, 10, 20`) |
| *Collection was modified; enumeration operation may not execute.* | `the-dangerous-kind-3` |
| `0, 255` | `the-dangerous-kind-4` |
| the report for a check that does not hold | `your-turn-1-tests--<world>` (not quoted in the prose) |
| an empty key gives `{}` both ways | the second `inputs` row of `your-turn-1-tests--secret-messages` |
| `".##"` gives 2 both ways | the second `inputs` row of `your-turn-1-tests--pixel-art` |
| 3.75 | `debugging-habits-1` |
| `letters: 15, words: 4` | `debugging-habits-2` |
| 12 letters, 4 words, 3 | the solution of `debugging-habits-2` |
| the answer we expected without `(double)` (no number) | probe `p-no-double` (3) |
| `.-#` and `#+.` | the solution of `your-turn-2-tests` |
| the empty row, one pixel and `{ 0, 200, 0 }` give the same line both ways | the last three `inputs` rows of `your-turn-2-tests` |
| 15, in the debugger fold | `debugging-habits-2` |
| the challenge prints the row you would choose (no number) | probe `p-challenge-run` (`####`); probe `p-challenge-bugs` |
| practice 2: *The given key 'E' ...* | `a-count-that-starts-from-nothing-1` |
| practice 3: `error CS0165: Use of unassigned local variable 'names'` | `a-list-that-was-never-made-1` |
| practice 4: `black, white, black`; `'x'`; line 5 of `Palette.cs`; line 3 of `Program.cs` | `two-things-to-find-1-program` |
| practice 6: CS0136 and its message; `0 ####`, `1 ####`, `2 ####` | `the-same-name-twice-1` and its solution |
| practice 7: 0 for every word; the `"SKY"` row; the `IndexOutOfRangeException` row | the tests cells and their `inputs` |
| practice 8: 1; two words | `where-it-stops-being-right-1` (1) and its solution (2) |
| practice 9: G; A; MEET ME; X; -3 | `test-the-pieces-1`, its `inputs` and its solution |
| practice 11: 4; -3; `Half needs an even number` | `from-earlier-throw-on-purpose-1` |
| practice 13: 65, 67 | `from-earlier-a-number-and-a-letter-1` |

## Open questions

The porter's nine questions, with what was decided on 28 September 2026
and what decided it. Three stay open for Josh, under "Open" below.

1. **The shape of `Check`.** The porter used a printing `Check` with
   `object` parameters, and asked that this page copy whatever
   `building-reusable-tools` chose, "exactly, with its wording".
   *Decided:* `Check<T>`, which throws, word for word as on
   `building-reusable-tools`. That page chose it, and every `Test` class in
   `lessons/` has it (`testing-what-a-class-does`, `documenting-a-class`,
   `mixed-programming-with-objects`, `your-world-playable`,
   `building-reusable-tools` and its practice page). The page says "the
   same method as on Reusable methods, word for word". What it changed is
   under "What the move changed".
2. **"Meant to fail" before a predict.** The porter said "many of its
   cells are meant to fail" at the top of the page, and after the run of a
   predicted cell "and it is meant to", so as not to give the guess away.
   *Decided:* keep it. The style guide's reason for saying so
   (`#how-a-page-teaches`: "so the reader knows they haven't broken
   anything") is met by the page's first paragraph, before any cell, and
   by the practice page's first paragraph. `the-tools-around-your-code`
   does the same for its predicted exception ("This program is meant to
   fail too", after the run). Every other cell meant to fail is named as
   meant to fail before it runs, except the two practice problems that
   ask for the guess in prose (2 and 11), under the practice page's own
   first paragraph. The page does not show `expect:` before a run, so
   nothing else gives the guess away.
3. **Cell ids of the tests cells.** *Decided:* keep
   `your-turn-1-tests--<world>`, `your-turn-2-tests` and
   `counting-in-the-wrong-thing-1-tests--<world>`. Each is a cell id on
   dewlab's page with the same task, so decision 28 keeps it; decision 26
   (`<id>-program`) is for one dewlab cell that becomes two, and the
   report cells, which were one cell in dewlab, use it. The same reading
   was settled for `building-reusable-tools` (its open question 6).
4. **Two new ids on the practice page.** *Decided:* keep both.
   `from-earlier-raise-on-purpose-1` names Python's keyword, and decision
   28 renames such ids. `a-name-that-was-a-function-1` became a different
   task, and `docs/LESSON_FORMAT.md` ("Cell ids") gives a new id to a cell
   that becomes a different task.
5. **Practice 8 has a new bug.** Open: see below.
6. **Long cells.** *Decided in part:* cells of 16 or 17 lines stay
   (`a-count-that-forgets-2`, `reading-a-traceback-1`,
   `the-dangerous-kind-1`, the new `the-dangerous-kind-5`,
   `your-turn-1--pixel-art`; practice `two-things-to-find-1`,
   `counting-in-the-wrong-thing-1--secret-messages`). The exemplar
   `objects-and-classes` has cells of 16, 17 and 21 lines, and most of the
   length is braces on their own lines, which the style guide asks for.
   The four longer ones are under "Open".
7. **One idea from `finding-where-it-went-wrong`.** Open: see below.
8. **The debugger section without a debugger run.** Open: see below. The
   downloaded project was built and run (see "What the browser showed"),
   and the fold no longer quotes numbers that only a debugger shows.
9. **Link to *Exceptions*.** *Decided:* both pages are in `lessons/`, and
   each now links to the other.

### Open

For Josh:

- **Step through the debugger once in Visual Studio** (the porter's
  question 8). The steps follow `the-tools-around-your-code` and
  Microsoft's tutorial, and the project from **Download project** builds
  with no warnings and prints 3.75. Nobody has put a breakpoint on
  `letters = letters + 1;`, a line inside a local method in top-level
  statements, and checked that Locals shows `character` and `letters` and
  that F11 on the last line enters `AverageWordLength`. It needs Windows.
- **The four longest cells** (question 6): `your-turn-2` (37 lines,
  `Drawing` with three methods: the habit is testing the pieces of a
  whole small program), `tracebacks-through-several-functions-1` (25),
  practice `test-the-pieces-1` (27, with the three log lines) and
  `where-it-stops-being-right-1` (23). Moving `Draw` out of `Drawing`
  into the tests cell would take `your-turn-2` to 28 lines. Keep, or
  shorten?
- **Practice 8's bug** (question 5). dewlab's bug, a loop over a sentence
  as if over its words, is CS0030 in C# with a `string` loop variable,
  and a different lesson with a `char`. The new bug (the last word has no
  space after it) keeps the task and the habit (print inside the loop,
  and see), but the method is 23 lines. Keep, or find a shorter bug?
- **How much of `finding-where-it-went-wrong`** (question 7). The course
  map lists it as a source and says nothing else. The page takes
  *symptom* and *cause* (the opening) and the three-line log (practice 9).
  Bisection, the smallest example that still fails, and the dungeon
  game's seed are left out, to keep the page at the map's size L. If more
  is wanted, the smallest example fits the practice page best.

## Probes

Each probe checks a claim in the prose that no page cell prints. The
porter ran them with the native checker in `drafts/`; on 28 September
2026 they were run again in the browser engine, in a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`,
`docs/TRANSLATING.md`, "The checker"), and every probe printed what the
native checker had. Four probes were added in the move (`p-no-double`,
`p-challenge-run`, `p-challenge-with-checks`, `pp-joined`). The cells
with `expect:` fail on purpose. Probes whose claim a page cell now prints
(`p-has-vowel-no-last-return`, `p-letters-only`, `p-drawrow-same`,
`pp-names-fixed`, `pp-half`) are kept as the porter's evidence.

Results in the browser, 28 September 2026:

| Probe | Printed |
|---|---|
| `p-count-fixed` | `B: 1`, `A: 3`, `N: 2` |
| `p-list-past-end` | `ArgumentOutOfRangeException`: *Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')* |
| `p-list-never-given` | CS0165, `Use of unassigned local variable 'row'` |
| `p-has-vowel-no-last-return` | CS0161 at (1,13) |
| `p-median-copy` | `20`, `30, 10, 20` |
| `p-kept` | `kept: 255`, `row: 0, 0, 255, 0` |
| `p-reverse-key-pairs` | `[A, Q], [B, W]` as given; `[Q, A], [W, B]` fixed; 0 and 0 for an empty key |
| `p-letters-only` | `letters: 12, words: 4`, `3` |
| `p-int-division` | `3` |
| `p-no-double` | `3` |
| `p-debugger-pauses` | pause 1: `'M'`, 0; pause 5: `' '`, 4; after the line: 5 |
| `p-drawrow-same` | `""`, `"#"`, `".#."` both ways; `"#-."` as given and `".-#"` fixed for `{ 0, 100, 200 }` |
| `p-challenge-as-given`, `p-challenge-run` | `####` |
| `p-challenge-with-checks` | `####`, then *LitCount of ###: expected 3, found 2* (the challenge with one check added) |
| `p-challenge-bugs` | `LitCount("###")`: 2 as given, 3 fixed; a tie in rows 0 and 1: 1 and 0; the last row busiest: 0 and 2; the lesson's picture: 1 and 1 |
| `pp-count-default` | `1` |
| `pp-list-made` | `1` |
| `pp-names-fixed` | `0 ####`, `1 ####`, `2 ####` |
| `pp-e-is-69` | `69`, then `letter: 0` to `letter: 3` |
| `pp-long-words-print` | a word of 4, 2, 2, 3 and 6 letters; `1` |
| `pp-long-words-after-loop` | `2` |
| `pp-shift-minus-only` | `-3`, `>`, `A`, `MEET ME` |
| `pp-half` | `3`, `-1`, `-3`, `HalfBoth(-7): Half needs an even number` |
| `pp-a-is-65`, `pp-joined` | `65`, `66`, `0A`, `1B` |

### Lesson

```csharp exec
id: p-count-fixed
static Dictionary<char, int> CountLetters(string text)
{
    Dictionary<char, int> counts = new();
    foreach (char letter in text)
    {
        counts[letter] = counts.GetValueOrDefault(letter) + 1;
    }
    return counts;
}

Dictionary<char, int> result = CountLetters("BANANA");
foreach (char letter in result.Keys)
{
    Console.WriteLine($"{letter}: {result[letter]}");
}
```

```csharp exec
id: p-list-past-end
expect: exception
List<string> letters = new() { "A", "B", "C" };
Console.WriteLine(letters[letters.Count]);
```

```csharp exec
id: p-list-never-given
expect: CS0165
List<int> row;
row.Add(5);
```

```csharp exec
id: p-has-vowel-no-last-return
expect: CS0161
static bool HasVowel(string word)
{
    foreach (char letter in word)
    {
        if ("AEIOU".Contains(letter))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

Console.WriteLine(HasVowel("EGG"));
```

```csharp exec
id: p-median-copy
static int Median(int[] numbers)
{
    int[] sorted = numbers.ToArray();
    Array.Sort(sorted);
    return sorted[sorted.Length / 2];
}

int[] readings = { 30, 10, 20 };
Console.WriteLine(Median(readings));
Console.WriteLine(string.Join(", ", readings));
```

```csharp exec
id: p-kept
List<int> row = new() { 0, 0, 255, 0 };
List<int> kept = new();
foreach (int value in row)
{
    if (value != 0)
    {
        kept.Add(value);
    }
}
Console.WriteLine($"kept: {string.Join(", ", kept)}");
Console.WriteLine($"row: {string.Join(", ", row)}");
```

```csharp exec
id: p-reverse-key-pairs
static Dictionary<char, char> AsGiven(Dictionary<char, char> key)
{
    Dictionary<char, char> reverse = new();
    foreach (char letter in key.Keys)
    {
        reverse[letter] = key[letter];
    }
    return reverse;
}

static Dictionary<char, char> Fixed(Dictionary<char, char> key)
{
    Dictionary<char, char> reverse = new();
    foreach (char letter in key.Keys)
    {
        reverse[key[letter]] = letter;
    }
    return reverse;
}

Dictionary<char, char> key = new() { ['A'] = 'Q', ['B'] = 'W' };
Console.WriteLine($"as given: {string.Join(", ", AsGiven(key))}");
Console.WriteLine($"fixed: {string.Join(", ", Fixed(key))}");
Console.WriteLine($"empty, as given: {AsGiven(new Dictionary<char, char>()).Count}; fixed: {Fixed(new Dictionary<char, char>()).Count}");
```

```csharp exec
id: p-letters-only
static double AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        if (character != ' ')
        {
            letters = letters + 1;
        }
    }
    int words = sentence.Split(' ').Length;
    Console.WriteLine($"letters: {letters}, words: {words}");
    return (double)letters / words;
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
```

```csharp exec
id: p-int-division
static int AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        letters = letters + 1;
    }
    int words = sentence.Split(' ').Length;
    return letters / words;
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
```

```csharp exec
id: p-no-double
// debugging-habits-1 with (double) deleted, as the prose invites.
static double AverageWordLength(string sentence)
{
    int letters = 0;
    foreach (char character in sentence)
    {
        letters = letters + 1;
    }
    int words = sentence.Split(' ').Length;
    return letters / words;    // (double) keeps the part after the point
}

Console.WriteLine(AverageWordLength("MEET ME AT NOON"));
```

```csharp exec
id: p-debugger-pauses
string sentence = "MEET ME AT NOON";
int letters = 0;
int pause = 0;
foreach (char character in sentence)
{
    pause = pause + 1;
    if (pause == 1 || pause == 5)
    {
        Console.WriteLine($"pause {pause}: character '{character}', letters {letters}");
    }
    letters = letters + 1;
    if (pause == 5)
    {
        Console.WriteLine($"after the line: letters {letters}");
    }
}
```

```csharp exec
id: p-drawrow-same
static char Shade(int value)
{
    if (value >= 192) { return '#'; }
    else if (value >= 128) { return '+'; }
    else if (value >= 64) { return '-'; }
    return '.';
}

static string AsGiven(int[] row)
{
    string line = "";
    foreach (int value in row) { line = Shade(value) + line; }
    return line;
}

static string Fixed(int[] row)
{
    string line = "";
    foreach (int value in row) { line = line + Shade(value); }
    return line;
}

int[][] rows = { new int[0], new int[] { 200 }, new int[] { 0, 200, 0 }, new int[] { 0, 100, 200 } };
foreach (int[] row in rows)
{
    Console.WriteLine($"{{ {string.Join(", ", row)} }}: as given \"{AsGiven(row)}\", fixed \"{Fixed(row)}\"");
}
Console.WriteLine($"Shade: 200 {Shade(200)}, 130 {Shade(130)}, 100 {Shade(100)}, 0 {Shade(0)}");
```

```csharp exec
id: p-challenge-as-given
// The challenge's program, as the draft gave it (without its Test class).
static int LitCount(string row)
{
    int count = 0;
    for (int index = 0; index < row.Length - 1; index++)
    {
        if (row[index] == '#')
        {
            count = count + 1;
        }
    }
    return count;
}

static int Busiest(string[] picture)
{
    int best = 0;
    for (int i = 1; i < picture.Length - 1; i++)
    {
        if (LitCount(picture[i]) >= LitCount(picture[best]))
        {
            best = i;
        }
    }
    return best;
}

string[] picture = { "#..#", "####", "##..", "...." };
Console.WriteLine(picture[Busiest(picture)]);
```

`p-challenge-run` is the lesson's challenge fence exactly as it is now,
with its `Test` class, run as a program cell. `p-challenge-with-checks`
is the same with `// Your checks here` replaced by
`Test.Check("LitCount of ###", 3, LitCount("###"));`; it stops with that
check's exception, on purpose.

```csharp exec
id: p-challenge-bugs
// The three bugs, each caught by one case; then the fixed version on the same cases.
static int LitCount(string row)
{
    int count = 0;
    for (int index = 0; index < row.Length - 1; index++)
    {
        if (row[index] == '#') { count = count + 1; }
    }
    return count;
}

static int Busiest(string[] picture)
{
    int best = 0;
    for (int i = 1; i < picture.Length - 1; i++)
    {
        if (LitCount(picture[i]) >= LitCount(picture[best])) { best = i; }
    }
    return best;
}

static int LitCountFixed(string row)
{
    int count = 0;
    foreach (char pixel in row)
    {
        if (pixel == '#') { count = count + 1; }
    }
    return count;
}

static int BusiestFixed(string[] picture)
{
    int best = 0;
    for (int i = 1; i < picture.Length; i++)
    {
        if (LitCountFixed(picture[i]) > LitCountFixed(picture[best])) { best = i; }
    }
    return best;
}

string[] tie = { "##.", "##.", "..." };
string[] lastIsBusiest = { "#..", "...", "##." };
Console.WriteLine($"LitCount(\"###\"): as given {LitCount("###")}, fixed {LitCountFixed("###")}");
Console.WriteLine($"a tie in rows 0 and 1: as given {Busiest(tie)}, fixed {BusiestFixed(tie)}");
Console.WriteLine($"the last row busiest: as given {Busiest(lastIsBusiest)}, fixed {BusiestFixed(lastIsBusiest)}");
string[] picture = { "#..#", "####", "##..", "...." };
Console.WriteLine($"the lesson's picture: as given {Busiest(picture)}, fixed {BusiestFixed(picture)}");
```

### Practice page

```csharp exec
id: pp-count-default
Dictionary<char, int> counts = new();
counts['E'] = counts.GetValueOrDefault('E') + 1;
Console.WriteLine(counts['E']);
```

```csharp exec
id: pp-list-made
List<string> names = new();
names.Add("Ada");
Console.WriteLine(names.Count);
```

```csharp exec
id: pp-names-fixed
for (int row = 0; row < 3; row++)
{
    string line = "";
    for (int column = 0; column < 4; column++)
    {
        line = line + "#";
    }
    Console.WriteLine($"{row} {line}");
}
```

```csharp exec
id: pp-e-is-69
Console.WriteLine((int)'E');
string word = "TREE";
for (int letter = 0; letter < word.Length; letter++)
{
    Console.WriteLine($"letter: {letter}");
}
```

```csharp exec
id: pp-long-words-print
static int LongWords(string sentence)
{
    int count = 0;
    int letters = 0;
    foreach (char character in sentence)
    {
        if (character == ' ')
        {
            Console.WriteLine($"a word of {letters} letters");
            if (letters > 4)
            {
                count = count + 1;
            }
            letters = 0;
        }
        else
        {
            letters = letters + 1;
        }
    }
    return count;
}

Console.WriteLine(LongWords("MEET ME BY THE BRIDGE TONIGHT"));
```

```csharp exec
id: pp-long-words-after-loop
static int LongWords(string sentence)
{
    int count = 0;
    int letters = 0;
    foreach (char character in sentence)
    {
        if (character == ' ')
        {
            if (letters > 4)
            {
                count = count + 1;
            }
            letters = 0;
        }
        else
        {
            letters = letters + 1;
        }
    }
    if (letters > 4)
    {
        count = count + 1;
    }
    return count;
}

Console.WriteLine(LongWords("MEET ME BY THE BRIDGE TONIGHT"));
```

```csharp exec
id: pp-shift-minus-only
static char ShiftBack(char letter, int shift)
{
    return (char)((letter - 'A' - shift) % 26 + 'A');
}

Console.WriteLine(-3 % 26);
Console.WriteLine(ShiftBack('A', 3));
Console.WriteLine(ShiftBack('D', 3));
string plain = "";
foreach (char character in "PHHW PH")
{
    plain = plain + (char.IsUpper(character) ? ShiftBack(character, 3) : character);
}
Console.WriteLine(plain);
```

```csharp exec
id: pp-half
static int Half(int n)
{
    if (n % 2 == 1)
    {
        throw new ArgumentException("Half needs an even number");
    }
    return n / 2;
}

static int HalfBoth(int n)
{
    if (n % 2 != 0)
    {
        throw new ArgumentException("Half needs an even number");
    }
    return n / 2;
}

Console.WriteLine(7 / 2);
Console.WriteLine(-7 % 2);
Console.WriteLine(Half(-7));
try
{
    Console.WriteLine(HalfBoth(-7));
}
catch (ArgumentException exception)
{
    Console.WriteLine($"HalfBoth(-7): {exception.Message}");
}
```

```csharp exec
id: pp-a-is-65
Console.WriteLine((int)'A');
Console.WriteLine((int)'B');
string word = "AB";
for (int index = 0; index < word.Length; index++)
{
    Console.WriteLine($"{index}{word[index]}");
}
```
