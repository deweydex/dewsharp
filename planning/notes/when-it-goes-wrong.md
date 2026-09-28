# when-it-goes-wrong: notes for a reviewer

Written from dewlab `tutorials/when-it-goes-wrong/` (version 2026.09.26.1):
the lesson, its practice page and its glossary file, with one idea from
`tutorials/finding-where-it-went-wrong/` (Computational Methods). The brief
is the course map's entry (`planning/COURSE_MAP.md`, PDP row 23): action
*adapt*, shape *tutorial*, size L, batch 8, depends on
`building-reusable-tools` and `looking-things-up-by-name`. The folder did
not exist when this run started, so there was no partial draft to finish;
both pages were written from the start.

Files:

- `when-it-goes-wrong.md`: the lesson. 23 exec cells, 4 of them in world
  variants, so 21 in each world; 6 are types cells (5 in each world).
  3 predicts, 4 hints, 3 solutions, 3 `inputs` blocks, 3 answer folds,
  3 fences to read (two console fences, one C# fence), 1 table and
  1 challenge. Eight cells are meant to fail: `a-count-that-forgets-1`
  (CS0103), `errors-from-lists-and-dictionaries-1`, `-2` and `-4`
  (exceptions), `errors-from-lists-and-dictionaries-3` (CS1061),
  `reading-a-traceback-1-program`,
  `tracebacks-through-several-functions-1-program` and
  `the-dangerous-kind-3` (exceptions).
- `when-it-goes-wrong-practice.md`: the practice page, 13 problems.
  15 exec cells, 4 in world variants (13 in each world); 4 are types
  cells. 3 predicts, 4 hints, 4 solutions, 4 `inputs` blocks, 10 folds.
  Six cells are meant to fail: `which-error-1`,
  `a-count-that-starts-from-nothing-1`, `two-things-to-find-1-program` and
  `from-earlier-throw-on-purpose-1` (exceptions),
  `a-list-that-was-never-made-1` (CS0165) and `the-same-name-twice-1`
  (CS0136).
- `when-it-goes-wrong.native.json`,
  `when-it-goes-wrong-practice.native.json`: what the native check
  recorded for every cell, solution and `inputs` row, in both worlds.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell on both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds. The last line was "No problems." for each
page and for the probes, and again with `--json` for each of the three
files. Both pages also went through the real parser, `web/lesson/parse.js`
(`parseLesson`, with the page id), with no errors, and every block is
attached to the cell it was written for; the counts above are the
parser's. No cell reads input, so no cell has `stdin:`: dewlab's page had
no `input()` stand-ins either. No cell uses `Console.ReadKey`, `Clear` or
colours.

Three exception reports were also run with `dotnet run` (SDK 10.0.401) in
scratch console projects that hold the same files, because NativeCheck
prints only the innermost frame of a report. Their output is in "Where
each number comes from".

## Frontmatter

- `title`: the course map's, "Debugging: finding bugs in bigger programs".
  dewlab's was "Finding bugs in bigger programs". The practice page is
  "Debugging: practice", as the other drafted practice pages are named.
- `from: when-it-goes-wrong`; the practice page has
  `from: when-it-goes-wrong-practice` and `practice_for`, as the other
  drafted practice pages do.
- `worlds`: dewlab PDP's two, with dewlab's sentences. As in dewlab, only
  one task on each page has world variants (`your-turn-1` in the lesson,
  problem 7 on the practice page); everything else is shared.
- `covers: [PDP-LO9, PDP-LO10]`, from the course map. dewlab gives PDP-LO9
  for each section and "touches" PDP-LO10 in "Debugging habits".
- `year:` is dropped: the format has no such field.

## Links: decision 32

`DECISIONS.md` 32 says a lesson names a page that is not in `lessons/` yet
by its short title, in italics, with no link, and decision 39 makes the
build refuse a `lesson:` link to a page that is not there. Only
`first-steps` and `objects-and-classes` are in `lessons/`, and this page
names neither. The task text for this run said that links use
`[text](lesson:<id>)`; I read that as the form a link takes, and decision
32 as which pages get one, as the `putting-things-in-order` and
`finding-things` drafts did. The one link is to this page's own practice
page, which moves into `lessons/` with it.

| Where | Italic name now | Link to make when that page is in `lessons/` | That page's batch |
|---|---|---|---|
| lesson, the paragraph after the opening | *Exceptions* | `lesson:reading-an-error-message` | 3 |
| lesson, after `the-dangerous-kind-2` | *Grids and references* | `lesson:grids-and-references` | 4 |
| lesson, the answer to the reports' your turn; the `Test` cell; practice 11 | *Reusable methods* | `lesson:building-reusable-tools` | 7 |
| lesson, "Looking back" (the next page) | *Programming languages* | `lesson:how-we-got-here` | 5 |
| practice 12 | *Sorting* | `lesson:putting-things-in-order` | 6 |
| practice 13 | *Variables and types*, *Arrays and lists* | `lesson:storing-and-computing`, `lesson:lists-and-sequences` | 1, 3 |

Forward links the other way: the `reading-an-error-message` draft ends
with "A later page, on debugging bigger programs, returns to the three
kinds there" in plain text, and its notes list it as a link to add when
this page exists.

## What changed, and why

### The thread

dewlab's page is about the errors that bigger programs bring, and the
logical errors that hide in them. In C#, several of dewlab's run-time bugs
are compiler errors, and the course map asks the page to open with that.
So the page has a thread dewlab's does not: **the compiler checks names
and types, and it cannot check what you meant.** The opening shows a bug
the compiler finds (CS0103), then a change that satisfies the compiler and
keeps the bug. After that, every section is about what the compiler cannot
see, and it names the compiler's part where C# has one (CS1061, CS0161,
CS0165, CS0136).

### The lesson, section by section

**Opening (`a-count-that-forgets-1`, `-2`).** The course map: "becomes a
compiler error with a predict". `counts` is made inside the loop's braces
and returned after them, which is CS0103 at line 8. The predict keeps
dewlab's three options, reworded: the two answers a reader might expect,
and "It does not compile". Because the answer is a failure, the prose
before the cell says only that "many of its cells are meant to fail",
rather than that this one is, so that the guess is not given away. The
TRANSLATING checklist asks for the second; see open question 2.

`a-count-that-forgets-2` is new. It "fixes" the compiler error by making
`counts` before the loop and keeping `counts = new();` inside it, so the
program runs and prints `A: 1`, which is dewlab's Python answer. That
gives dewlab's point ("one line in the wrong place, and nothing
complains") back to the C# page, and it is where the page names *symptom*
and *cause*, from `finding-where-it-went-wrong`'s section "Fixing the
symptom or the cause". The reader is invited to delete the line (probe
`p-count-fixed`: B 1, A 3, N 2).

The paragraph after it keeps dewlab's "since then, programs have grown",
names *Exceptions* as the page before, and adds the thread. *Bug* and
*debugging* are defined here, not in "Debugging habits" as in dewlab,
because the title uses the word and the opening prose needs *bug*.
*Logical error* is defined again here, at its first use (the reader met
it on *Exceptions*).

**Errors from lists and dictionaries.**

- The table: `IndexError` became `IndexOutOfRangeException` (arrays and
  strings) and `ArgumentOutOfRangeException` (lists); `KeyError` became
  `KeyNotFoundException`; `NullReferenceException` is new. dewlab's
  `AttributeError` and "`TypeError`: not callable" rows go: the first is
  CS1061 in C#, a compiler error, and the second has no C# twin (the
  course map: "reusing `max` as a name is not a C# trap").
- `-1`: `letters[letters.Length]` on a `string[]`,
  `IndexOutOfRangeException`. The fold adds that a `List<string>` gives
  `ArgumentOutOfRangeException` for the same slip (probe
  `p-list-past-end`).
- `-2`: `key['a']` on a `Dictionary<char, char>`, `KeyNotFoundException`.
- `-3`: `row.add(128)` is CS1061 (`expect: CS1061`). The comment asks
  which of the three things will happen, so a compiler error is one of the
  answers. The fold says Python finds the same slip only at run time.
- `-4` is new, as the course map says: a `NullReferenceException`. The
  map describes it as "a list that was declared and never made", but a
  *local* list that is never given one is CS0165 in C#, a compiler error
  (probe `p-list-never-given`). So the cell uses the place the compiler
  cannot follow: an array of strings, with place 2 never filled. The fold
  says both things, and practice problem 3 shows CS0165 as its own
  problem. `grids-and-references` has already met `null` in a jagged
  array, and `the-tools-around-your-code` (FOOP) meets it in a field.
- The comment line under each cell is dewlab's `# I think it raises:`,
  now `// I think:`, because one of the four does not raise anything.

**Tracebacks through several functions** became **Exception reports
through several methods**.

- The course map: "`reading-a-traceback-1` needs an error that happens at
  run time (a string shift is now CS1503)". The new program is a
  substitution cipher with the key the reader knows from *Dictionaries*,
  `Dictionary<char, char>`. `Encode("MEET ME", key)` reaches the space,
  which the key does not have, three calls deep: a
  `KeyNotFoundException` in `EncodeLetter`, called by `Encode`, called by
  the program. dewlab's lesson survives whole: the line that failed does
  what it is for, and the line responsible is the call that passed the
  value in, which in a real program would come from
  `Console.ReadLine()`.
- The two methods are in `static class Cipher`, in a types cell with
  `file: Cipher.cs` (the shape *Reusable methods* teaches), and the program
  is a cell below it. dewlab's cell id is kept by the types cell, and the
  program is `reading-a-traceback-1-program` (decision 26). The reason is
  the report: .NET names a method of a class plainly
  (`Cipher.EncodeLetter(Char letter, ...)`), but it names a local method
  in top-level statements `Program.<<Main>$>g__EncodeLetter|0_0(...)`
  (checked with `dotnet run`, below). The page shows a local method as
  `EncodeLetter(char, ...)` (`docs/ENGINE_API.md`), but a reader who meets
  the report in Visual Studio would not.
- The report is read **from the top**, most recent call first, which is
  how .NET prints it and how the engine lists `frames`
  (`docs/ENGINE_API.md`: "innermost first"). dewlab's "read it from the
  bottom" is reversed, and one sentence tells readers from Python. This is
  the course map's "read in the order the page shows it"; open question 9
  in the map is still open (see "Once the page UI exists").
- dewlab's `dl-traceback` drawing is replaced by two things: a list in the
  prose (the exception, its message, and the three calls with their files,
  lines and code), and a `console` fence with the report exactly as
  `dotnet run` printed it, with the folders removed. The fence has a line
  inside .NET (`Dictionary`2.get_Item`), so the prose says to start from
  the first line that names a file of yours, and explains ``Dictionary`2``
  in one sentence. The words (*the line that failed*, *one call further
  out*, *stack trace*) are the ones the `the-tools-around-your-code` draft
  uses for FOOP, so the two courses say it the same way.
- **Your turn** (`tracebacks-through-several-functions-1`): the same
  task, split the same way (`Brightness.cs` and a program cell). The
  values stay `int`, so an empty row is a `DivideByZeroException`; with
  `double`, `0.0 / 0` would be NaN, and the program would run on with no
  message. The fold links the choice ("refuse an empty row") to `Mean` on
  *Reusable methods*, which the course map says throws an
  `ArgumentException` there.

**The dangerous kind.**

- `the-dangerous-kind-1`: `HasVowel` with its predict, unchanged in
  meaning. In C# dewlab's version does not compile: with the `return` in
  both branches and nothing after the loop, it is CS0161, "not all code
  paths return a value" (probe `p-has-vowel-no-last-return`). This is where
  the course map's CS0161 lands: the cell has `return false;` after the
  loop, which a reader might add to satisfy the compiler, and the paragraph
  after the predict explains what the compiler checked. The bug (the
  `else`) is still there, and the output is `True False False`.
- `the-dangerous-kind-2`: `Median` sorts the caller's array with
  `Array.Sort`. The paragraph names *side effect*, and points to reference
  types on *Grids and references*. `sorted(numbers)` became
  `numbers.ToArray()` and `Array.Sort` on the copy (probe
  `p-median-copy`).
- `the-dangerous-kind-3`: the course map moves this one: in C#, removing
  from a list inside its own `foreach` stops with an
  `InvalidOperationException`, where Python skipped an element with no
  message. So the cell is `expect: exception`, it gains the page's third
  predict (what does C# do?), and the prose says that stopping is kind.
- `the-dangerous-kind-4` is new, so that the dangerous kind is still on
  the page: a `for` loop with `RemoveAt(i)` runs, and prints `0, 255`,
  which is dewlab's skipped element. dewlab's comprehension becomes a loop
  that builds a new list, in a fence to read (probe `p-kept`).

**Your turn** in both worlds.

- A new types cell, `the-dangerous-kind-check` (`Test.cs`), holds
  `Test.Check(string claim, object expected, object found)`. It stands in
  for dewlab's `tests:` cell and `assert`, as the course map's open
  question 3 asks: it prints one line either way, "`claim`: `found`, as
  expected" or "`claim`: expected X, found Y", never a verdict. It is the
  shape of `Example.Check` in the `documenting-a-class` draft, not the
  throwing `Test.Check` of the `testing-what-a-class-does` draft (see open
  question 1). `object` and `Equals` get one sentence each.
- Each world has a types cell and a program cell. The types cell keeps
  dewlab's id (`your-turn-1--<world>`); the program cell keeps dewlab's
  *tests* id (`your-turn-1-tests--<world>`), because dewlab already had a
  second cell with this task, and it holds the tests. It carries the
  `inputs`, the hint and the solution (decision 26 would call it
  `-program`; see open question 3). The solution writes the class again
  below its tests (rule 4), and its note says so.
- Secret messages: `ReverseKey` over `Dictionary<char, char>`. The test
  looks up E in the reversed key with `GetValueOrDefault('E', '?')`, which
  *Dictionaries* teaches, and prints "expected C, found ?" until the bug
  is fixed. The two `inputs` rows are dictionaries; NativeCheck shows
  `System.InvalidCastException` for the non-empty one, which is a fault in
  its display, not in the page (the `looking-things-up-by-name` notes
  explain it). Probe `p-reverse-key-pairs` prints the pairs: `[A, Q], [B,
  W]` as given, `[Q, A], [W, B]` fixed.
- Pixel art: `LitCount` from index 1, fixed with `foreach`.
- dewlab's `inputs` had `guess: yes`; dewsharp has no guess column. Both
  tasks gain a hint (dewlab had none), `after: 1 runs`, because the cells
  run without an error and the default (`after: 1 errors`) would never
  show it.

**Debugging habits.**

- `debugging-habits-1/2`: `AverageWordLength` returns `double`, with
  `(double)letters / words` and a comment on the cast. Without the cast,
  `15 / 4` is 3, which is the answer the reader expects, from the bug
  (probe `p-int-division`). A paragraph after the second cell says so:
  one bug can hide behind another, which is one more reason to look at the
  values in the middle. dewlab's "take the extra `print` out" became
  "delete the extra line", and the reader is invited to fix the loop with
  `character != ' '` (probe `p-letters-only`: 12 letters, 3).
- The second habit keeps dewlab's words, with `Check` for `assert`.
- **Your turn** (`your-turn-2`): the course map: "needs a new bug
  (`return` in the loop is now CS0161)". The new bug is
  `line = Shade(value) + line;`, which draws every row backwards: the
  first row is `#-.` where `.-#` was meant. Testing `Shade` on its own
  shows four expected values; testing `DrawRow` on `{ 0, 100, 200 }` shows
  the reversal, which is the habit the task teaches. The three methods are
  in `static class Drawing` (`Drawing.cs`), and `your-turn-2-tests` below
  it runs the drawing and holds the tests, the `inputs`, two hints and the
  solution. `Shade` returns a `char`. dewlab's hint became the second
  hint; the first asks a question. The solution note replaces dewlab's
  "`None` from an empty row" with the rows that pass the bug: an empty
  row, one pixel, or a row that reads the same both ways (probe
  `p-drawrow-same`).

**The next step: a debugger** is new. The course map: "add the Visual
Studio debugger as the next step: a breakpoint, Step Over, Step Into and
the Locals window, with steps", and the teacher notes put PDP's debugger
work on this page. It follows the `the-tools-around-your-code` draft's
steps and words (the menus, F9, F5, the yellow arrow, Locals, Shift+F5,
Call Stack), and uses the page's own `debugging-habits-1`, so that the
reader sees the space being counted without a `Console.WriteLine`. The
keys and menu paths agree with Microsoft's tutorial cited at the end
(fetched 27 September 2026). The fold's values (`'M'` and 0 at the first
pause; `' '` and 4 at the fifth; 5 after the line) come from probe
`p-debugger-pauses`, which prints the same values; no debugger was run.

**Looking back.** A question about what the compiler found is added. The
challenge is rebuilt: dewlab's third bug was `return best` inside the loop,
which is CS0161 in C#, so the program would not run. The C# program
returns the position of the busiest row, and its three bugs all compile:
`LitCount` stops before the last pixel, `>=` keeps the last of equal rows
and not the first, and `Busiest`'s loop stops before the last row. On the
page's picture it prints `####`, the row a reader would choose (probes
`p-challenge-as-given` and `p-challenge-bugs`, which show a case that
catches each bug).

**Where to read more.** Evans's zine is kept (page checked 27 September
2026: title and author; the year is dewlab's). Corey Schafer's video is
about Python's `try` and `except`; it is replaced by Microsoft's
*Tutorial: Debug C# code and inspect data*, whose title and contents were
checked the same day. Its program uses a classic `Main`, and the page says
so in one clause.

### The practice page

dewlab's problems, in dewlab's order, with ids kept except where noted.
Predicts: dewlab had five (1, 2, 6, 11, 13); the style guide asks for two
or three, so 1, 6 and 13 keep theirs, the three where C# does something a
reader would not expect. 2 and 11 ask the question in prose.

| dewlab | Here | What changed |
|---|---|---|
| 1. Which error | 1 | `word[5]` on a `string` is `IndexOutOfRangeException`. The predict gains "It does not compile", and the fold says why not: a position is a value. |
| 2. A count that starts from nothing | 2 | `KeyNotFoundException`; `GetValueOrDefault('E') + 1` starts at 0 (probe `pp-count-default`). The predict became a question in prose. |
| 3. A name that was a function | 3. A list that was never made (`a-list-that-was-never-made-1`, new id) | Reusing `list` as a name is not a C# trap (course map). The new problem is the C# trap beside it: `List<string> names;` then `names.Add` is CS0165. It pairs with the lesson's `NullReferenceException` cell. The fold's "prints 1" is probe `pp-list-made`. |
| 4. Two things to find | 4 | `Palette` in a types cell (`two-things-to-find-1`, dewlab's id) and `two-things-to-find-1-program`. `KeyNotFoundException` for `'x'` at line 5 of `Palette.cs`; line 3 of `Program.cs` is responsible (`dotnet run`, below). |
| 5. The whole chain | 5 | "traceback" became "exception report". |
| 6. The same name twice | 6 | Two nested loops that both make `i` is CS0136 in C#: the predict's third option is now the answer. The fold gives Python's `3 ####` (checked with `python3`) and the fixed output (probe `pp-names-fixed`). |
| 7. Counting in the wrong thing | 7, both worlds | A `Test` types cell first (`counting-in-the-wrong-thing-check`), since a practice page has its own classes. Each world is a types cell and a tests cell, as in the lesson. Secret messages: `for (int letter = 0; ...)` compared with `'E'` compiles in C#, because a `char` is a number (69, probe `pp-e-is-69`), so the bug survives translation as a silent one. Pixel art: `picture[c][row]`; its test compares `string.Join` text, and the third `inputs` row shows `IndexOutOfRangeException` for the reader's version. |
| 8. Where it stops being right | 8. What the loop sees (id kept) | Retitled (no *right*). dewlab's bug (a loop over the characters of a sentence) is CS0030 in C# if the loop variable is a `string`. The new bug keeps the task (print inside the loop and see): a loop over characters that counts letters and checks at each space, so it never checks the last word. It prints 1; the labelled print shows 4, 2, 2, 3 and 6 (probe `pp-long-words-print`). A solution with `Split(' ')` and `inputs` are added; the note mentions the other fix (probe `pp-long-words-after-loop`). |
| 9. Test the pieces | 9 | `ShiftBack` and `Decode` as local methods. Gains the three-line log from `finding-where-it-went-wrong` ("Keeping a log"): *Guess*, *Test*, *What happened*. Gains `inputs`, a hint and a solution. The solution uses `((... - shift) % 26 + 26) % 26`, and its note explains C#'s negative remainder (probe `pp-shift-minus-only`: `-3`, `>`). |
| 10. Explain it to a duck | 10 | Unchanged in meaning; "stuck" became "cannot find a bug" (an idiom). |
| 11. From earlier: raise on purpose | 11. From earlier: throw on purpose (`from-earlier-throw-on-purpose-1`, new id) | `throw new ArgumentException`, from *Reusable methods*. The id named Python's `raise`, so it follows decision 28 (see open question 4). The fold adds a C# twist: `Half(-7)` returns -3, because `-7 % 2` is -1 (probe `pp-half`). |
| 12. From earlier: nearly in order | 12 | From *Sorting*. "without a flag" became "with no way to know that the array is sorted": the flag is on that page's practice page, not in its lesson. |
| 13. From earlier: a number and a letter | 13 | `enumerate` goes. `index + word[index]` adds an `int` and a `char`, and prints 65 and 67, where Python stopped (probe `pp-a-is-65`). |

### The glossary file

dewsharp has no glossary panel (`docs/LESSON_FORMAT.md`), so no
`.glossary.yaml` was written. Each term is defined in the prose where it
first appears:

| dewlab entry | Here |
|---|---|
| `IndexError` | `IndexOutOfRangeException` and `ArgumentOutOfRangeException` (the table) |
| `KeyError` | `KeyNotFoundException` (the table) |
| `AttributeError` | CS1061, a compiler error (`errors-from-lists-and-dictionaries-3` and its fold) |
| off-by-one error | the fold after the four cells |
| bug, debugging | the paragraph after the opening |

New terms: *symptom* and *cause* (opening), *logical error* (again, at its
first use), `null` and `NullReferenceException` (the table),
*stack trace*, *the line that failed*, *the line that is responsible*
(reports), *side effect* (`the-dangerous-kind-2`), `object` as a parameter
type (the `Test` cell), *debugger*, *breakpoint*, *stepping*, *Step Over*,
*Step Into* (the debugger), and on the practice page *log*.

## What C# made different, in short

- The compiler finds four of dewlab's run-time bugs before the program
  runs: a variable used outside its braces (CS0103), a method a list does
  not have (CS1061), a `return` that leaves a path with none (CS0161), two
  loop variables with one name (CS0136). A fifth is new to C#: a local
  variable never given a value (CS0165).
- What the compiler cannot see is a value: a position, a key, `null`, a
  space in a message. Those are the page's exceptions.
- Changing a list inside its own `foreach` stops the program, where Python
  skipped an element quietly; the quiet version needs a `for` loop.
- `+` on an `int` and a `char` adds, and `==` compares an `int` with a
  `char`, so two of dewlab's `TypeError`s become silent logical errors.
- Whole-number division hides the average bug (3 for 3.75), and
  `-7 % 2` is -1, which lets a negative odd number past `n % 2 == 1`.
- An exception report lists the most recent call first, and .NET names a
  method of a class plainly and a local method in top-level statements
  with a generated name, which is why the report tasks use a
  `static class` in a types cell.
- No `tests:` cell and no `assert`: a `Check` method in a types cell, and
  tests in the program cell below it.
- The page cannot pause a program, so the debugger is taught in Visual
  Studio, with steps.

## Where each number comes from

Recorded outputs are in the `.native.json` files. The native check labels
a cell's compiler messages and exceptions with the cell id where the page
would show `Program.cs` (or the cell's `file:`); line and column are the
same. For an exception, it prints only the innermost frame.

| Number or claim | Source |
|---|---|
| CS0103 at `Program.cs(8,12)`; line 8 | lesson cell `a-count-that-forgets-1` |
| Python prints `{'A': 1}` | `python3` with dewlab's function, 27 September 2026 |
| `A: 1` | lesson cell `a-count-that-forgets-2` |
| B 1, A 3, N 2 once the line is deleted | probe `p-count-fixed` |
| `IndexOutOfRangeException` and its message; 0, 1, 2 and 3 | lesson cell `errors-from-lists-and-dictionaries-1` |
| `ArgumentOutOfRangeException` for a list | probe `p-list-past-end` |
| `KeyNotFoundException`, key `'a'` | lesson cell `errors-from-lists-and-dictionaries-2` |
| CS1061 and its text | lesson cell `errors-from-lists-and-dictionaries-3` |
| `NullReferenceException` and its message | lesson cell `errors-from-lists-and-dictionaries-4` |
| CS0165 and its text | probe `p-list-never-given`; practice cell `a-list-that-was-never-made-1` |
| `DQQZ`; `KeyNotFoundException` for `' '`; line 5 of `Cipher.cs` | lesson cell `reading-a-traceback-1-program` |
| the whole report: line 5, line 13 of `Cipher.cs`, line 3 of `Program.cs`, the `Dictionary`2.get_Item` line, the console fence | `dotnet run` of the same two files (below) |
| `1`; `DivideByZeroException`; line 10 of `Brightness.cs` | lesson cell `tracebacks-through-several-functions-1-program` |
| line 4 of `Program.cs` (and line 18 of `Brightness.cs`, not quoted) | `dotnet run` (below) |
| `True False False` | lesson cell `the-dangerous-kind-1` |
| CS0161 and its text | probe `p-has-vowel-no-last-return` |
| 20; 10, 20, 30 | lesson cell `the-dangerous-kind-2` |
| a copy leaves `readings` as it was | probe `p-median-copy` (20; 30, 10, 20) |
| `InvalidOperationException` and its message | lesson cell `the-dangerous-kind-3` |
| Python prints `[255, 0]` | `python3`, 27 September 2026 |
| `0, 255` | lesson cell `the-dangerous-kind-4` |
| the new list keeps 255 | probe `p-kept` |
| "expected C, found ?" with the bug | lesson cell `your-turn-1-tests--secret-messages` |
| the reversed pairs; an empty key gives an empty dictionary both ways | probe `p-reverse-key-pairs`; the `inputs` row `{}` |
| `".##"` gives 2 with the bug; `"###"` gives 2 | lesson cell `your-turn-1-tests--pixel-art` and its `inputs` |
| 3.75 | lesson cell `debugging-habits-1` |
| letters 15, words 4 | lesson cell `debugging-habits-2` |
| 12 letters; 3 with the loop fixed | probe `p-letters-only` |
| 3 without `(double)` | probe `p-int-division` |
| 4, 2, 2 and 4 letters; average 3 | carried over from dewlab; confirmed by probe `p-letters-only` |
| `#-.` and `.+#` with the bug | lesson cell `your-turn-2-tests` |
| `.-#` and `#+.`; `Shade` for 200, 130, 100, 0 | solution of `your-turn-2-tests`; probe `p-drawrow-same` |
| empty row, one pixel and `{ 0, 200, 0 }` pass the bug | probe `p-drawrow-same` |
| the debugger fold: `'M'` and 0, `' '` and 4, then 5 | probe `p-debugger-pauses` |
| the challenge prints `####`; each bug has a case that shows it | probes `p-challenge-as-given`, `p-challenge-bugs` |
| practice 1: `IndexOutOfRangeException`; positions 0 to 4 | practice cell `which-error-1` |
| practice 2: `KeyNotFoundException` for `'E'`; starts at 0 | practice cell `a-count-that-starts-from-nothing-1`; probe `pp-count-default` |
| practice 3: CS0165; prints 1 with `= new()` | practice cell `a-list-that-was-never-made-1`; probe `pp-list-made` |
| practice 4: `black, white, black`; `'x'`; line 5 of `Palette.cs`; line 3 of `Program.cs` | practice cell `two-things-to-find-1-program`; `dotnet run` (below) |
| practice 6: CS0136 and its text; Python's `3 ####` three times; `0 ####`, `1 ####`, `2 ####` | practice cell `the-same-name-twice-1`; `python3`; probe `pp-names-fixed` |
| practice 7, secret messages: 0 for every word; 69; positions 0, 1, 2 | practice cell and `inputs`; probe `pp-e-is-69` |
| practice 7, pixel art: `1, 2` for `1, 3`; `IndexOutOfRangeException` on a wide picture | practice cell `counting-in-the-wrong-thing-1-tests--pixel-art` and its `inputs` |
| practice 8: 1; 4, 2, 2, 3, 6; 2 with either fix | practice cell and solution; probes `pp-long-words-print`, `pp-long-words-after-loop` |
| practice 9: `SKKZ SK`; G for `ShiftBack('D', 3)`; A; MEET ME; `>`; -3; X | practice cell `test-the-pieces-1`, its `inputs` and solution; probe `pp-shift-minus-only` |
| practice 11: 4, then `ArgumentException` with its message; `7 / 2` is 3; -1; -3 | practice cell `from-earlier-throw-on-purpose-1`; probe `pp-half` |
| practice 13: 65 and 67; A is 65, B is 66; `0A`, `1B` | practice cell `from-earlier-a-number-and-a-letter-1`; probe `pp-a-is-65` |
| practice 13: Python stops with a `TypeError` | `python3`: `unsupported operand type(s) for +: 'int' and 'str'` |

`dotnet run` output (scratch console projects with `ImplicitUsings`
enabled and `Nullable` disabled, SDK 10.0.401, 27 September 2026; the
scratch folder path removed):

```text
DQQZ
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key ' ' was not present in the dictionary.
   at System.Collections.Generic.Dictionary`2.get_Item(TKey key)
   at Cipher.EncodeLetter(Char letter, Dictionary`2 key) in Cipher.cs:line 5
   at Cipher.Encode(String message, Dictionary`2 key) in Cipher.cs:line 13
   at Program.<Main>$(String[] args) in Program.cs:line 3

1
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
   at Brightness.RowBrightness(Int32[] row) in Brightness.cs:line 10
   at Brightness.BrightestRow(Int32[][] picture) in Brightness.cs:line 18
   at Program.<Main>$(String[] args) in Program.cs:line 4

black, white, black
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'x' was not present in the dictionary.
   at System.Collections.Generic.Dictionary`2.get_Item(TKey key)
   at Palette.ColourOf(Char character, Dictionary`2 palette) in Palette.cs:line 5
   at Palette.RowColours(String row, Dictionary`2 palette) in Palette.cs:line 13
   at Program.<Main>$(String[] args) in Program.cs:line 3
```

And the same cipher written as local methods in one `Program.cs`, which is
why the report tasks use a class:

```text
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key ' ' was not present in the dictionary.
   at System.Collections.Generic.Dictionary`2.get_Item(TKey key)
   at Program.<<Main>$>g__EncodeLetter|0_0(Char letter, Dictionary`2 key) in Program.cs:line 3
   at Program.<<Main>$>g__Encode|0_1(String message, Dictionary`2 key) in Program.cs:line 11
   at Program.<Main>$(String[] args) in Program.cs:line 17
```

## Once the page UI exists

- **What the page shows for an exception** (course map, open question 9).
  The lesson describes the report in parts that the engine returns (the
  type, the message, and `frames` with a file, a line and a member,
  innermost first) and says "Read it from the top". If the page draws the
  frames in the other order, or leaves out the file, the list after
  `reading-a-traceback-1-program` and the paragraph "Read it from the top"
  change with it. The console fence stays either way: it is what Visual
  Studio shows. dewlab's `dl-traceback` drawing could come back once
  `web/` draws a report.
- **Frames for a static class in a types cell.** The prose says the report
  names `Cipher.cs` and `Program.cs`. The engine's frames carry the cell's
  `file:`, so this should hold; check it on the page, with the method
  shown as `Cipher.EncodeLetter(char, ...)` or similar.
- **Predicts whose answer is a failure** (`a-count-that-forgets-1`,
  `the-dangerous-kind-3`, practice 1 and 6). If the page marks an
  `expect:` cell as "meant to fail" before the run, it gives the guess
  away. Check what the page shows above such a cell.
- **Tests cells that print a difference.** `your-turn-1-tests--*`,
  `your-turn-2-tests` and practice 7 run to the end and print "expected
  …, found …" until the reader fixes the class above them. The hints use
  `after: 1 runs` for that reason. Check that the hint appears.
- **Compare with a solution when the class is above.** The solutions write
  the class again below their tests (rule 4). Check that "Compare with a
  solution" runs the reader's class for the reader's column and the
  solution's class for the other, and that the dictionary `inputs` rows
  show `{ ['Q'] = 'A', ['W'] = 'B' }` (NativeCheck cannot show them).
- **Download project from `debugging-habits-1`.** The debugger steps
  assume the ZIP has a `.sln`, and that Solution Explorer lists
  `Program.cs` and a file for each types cell above (decision 38): here
  `Cipher.cs`, `Brightness.cs`, `Test.cs`, and `KeyTools.cs` or
  `Pixels.cs` by world. Check that the project builds with no warnings and
  that a breakpoint in a local method inside top-level statements shows
  `character` and `letters` in Locals.
- **The challenge** is a `csharp challenge` fence, which no checker runs.
  The probes `p-challenge-*` stand in for it. It asks the reader to copy
  `Test` into the notebook; check that the notebook follows rule 2.

## Open questions for a reviewer

1. **The shape of `Check`.** `building-reusable-tools` is not drafted, and
   this page says its `Check` is "like the `Check` on *Reusable methods*".
   The two drafts that write one differ: `documenting-a-class` prints one
   line either way (`object` parameters), and `testing-what-a-class-does`
   throws on a difference (`Check<T>`). This page uses the printing kind,
   because a PDP test cell then runs every check and shows each
   difference, and it needs neither generics nor `try`. Whoever writes
   `building-reusable-tools` should choose one shape for PDP, and this page
   should then copy it exactly, with its wording ("as expected",
   "expected …, found …").
2. **"Meant to fail" before a predict.** The TRANSLATING checklist says the
   prose says a cell is meant to fail before the reader runs it. Where the
   predict's answer is the failure, this page says instead that "many of
   its cells are meant to fail" (the opening, and the practice page's
   introduction), and says "and it is meant to" after the run
   (`the-dangerous-kind-3`). The `putting-things-in-order` draft did the
   same for its CS0029 predict. Confirm, or say it before and accept the
   hint it gives.
3. **Cell ids of the test cells.** dewlab had two cells for each "your
   turn" (the function and its `tests:` cell). Here the function's cell is
   the types cell and keeps its id, and the tests cell is the program cell
   and keeps its own id (`your-turn-1-tests--<world>`, `your-turn-2-tests`,
   `counting-in-the-wrong-thing-1-tests--<world>`). Decision 26 would
   name the program cell `<id>-program`, but that would leave dewlab's
   tests id unused and invent a third cell. The report cells, which were
   one cell in dewlab, do use `-program`. Confirm this reading of decision
   26.
4. **Two new ids on the practice page.** `a-list-that-was-never-made-1`
   replaces a problem with no C# twin (`a-name-that-was-a-function-1`), and
   `from-earlier-throw-on-purpose-1` replaces
   `from-earlier-raise-on-purpose-1`, whose id names Python's keyword
   (decision 28 renames ids that name Python). No class has used either
   page, so this is the last free moment. Keep dewlab's ids instead?
5. **Practice 8 has a new bug.** dewlab's (looping over a sentence as if
   over words) is a compiler error in C# when the loop variable is a
   `string` (CS0030), and a different lesson if it is a `char`. The new bug
   (the last word has no space after it) keeps the task and the habit, but
   the method is longer (23 lines). Keep, or find a shorter bug?
6. **Long cells.** Over the style guide's fifteen lines: lesson
   `a-count-that-forgets-2` (16), `reading-a-traceback-1` (17),
   `tracebacks-through-several-functions-1` (25), `the-dangerous-kind-1`
   (17), `your-turn-1--pixel-art` (16) and `your-turn-2` (37, three
   methods); practice
   `two-things-to-find-1` (17), `where-it-stops-being-right-1` (23),
   `test-the-pieces-1` (27), `counting-in-the-wrong-thing-1--secret-messages`
   (16). Most of the length is braces on their own lines. `your-turn-2` is
   a whole small program on purpose (the habit is testing its pieces);
   `Draw` could move into the tests cell to shorten it.
7. **One idea from `finding-where-it-went-wrong`, not more.** The map
   lists it as a source and says nothing else about it. This page takes
   *symptom* and *cause* (the opening) and the three-line log (practice
   9). Bisection, the smallest example that still fails, and the dungeon
   game's seed are left out, to keep the page at the map's size L. If a
   reviewer wants more, the smallest example fits the practice page best.
8. **The debugger section without a debugger run.** The steps were written
   from the FOOP draft and checked against Microsoft's tutorial, and the
   fold's values from a probe that prints them. Nobody has stepped through
   the downloaded project in Visual Studio. Someone with Windows should,
   once, before a class uses it.
9. **Link to *Exceptions*.** The `reading-an-error-message` draft's closing
   paragraph points here in plain text; when both pages are in `lessons/`,
   that becomes a link, and this page's italic *Exceptions* becomes one
   too.

## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file.
The cells with `expect:` fail on purpose. None of them is part of either
page.

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
// The challenge, exactly as the lesson gives it.
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
