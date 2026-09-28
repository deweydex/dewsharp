# from-cells-to-a-program: notes for a reviewer

Written from dewlab `tutorials/from-cells-to-a-program/` (version
2026.09.26.1): the lesson and its glossary file. dewlab has no practice
page for it, so the practice page is new, from the course map's list. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 26):
action *adapt*, shape *tutorial*, size M, batch 8, worlds none, depends
on `building-reusable-tools` and `reading-input`. The folder did not
exist when this run started, so there was no partial draft to finish;
both pages were written from the start.

Files:

- `from-cells-to-a-program.md`: the lesson. 13 exec cells, 3 of them
  types cells (`Cipher.cs`, `Game.cs`, `Test.cs`). 2 predicts, 3 hints,
  2 solutions, 1 `inputs` block, 1 "why" fold, 3 text fences (the
  templates), 1 task list and 1 challenge. No cell is meant to fail.
  Six cells read input and have `stdin:`.
- `from-cells-to-a-program-practice.md`: the practice page, 7 problems.
  10 exec cells, 1 of them a types cell (`Picture.cs`). 2 predicts,
  3 hints, 3 solutions, 2 `inputs` blocks, 5 answer folds. Two cells are
  meant to fail, and their problems say so:
  `one-long-cell-two-files-2-program` (CS0117, the task's starting point,
  decision 27) and `a-method-that-returns-nothing-1` (CS0029). Three
  cells read input and have `stdin:`.
- `from-cells-to-a-program.native.json`,
  `from-cells-to-a-program-practice.native.json`: what NativeCheck
  recorded for every cell, solution and `inputs` row.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell on both pages, every solution and every `inputs` row was run
with NativeCheck. The last line was "No problems." for each page and for
the probes, and again with `--json` for each of the three files. Both
pages also went through the real parser, `web/lesson/parse.js`
(`parseLesson`, with the page id), with no errors, and every block is
attached to the cell it was written for; the counts above are the
parser's. No cell uses `Console.ReadKey`, `Clear` or colours.

Four claims about Visual Studio projects can't be run by NativeCheck,
which builds one program from cells. They were run with `dotnet build`
and `dotnet run` (SDK 10.0.401) in a scratch console project with the
page's settings (`Program.cs` plus `Cipher.cs` or `Game.cs`); the output
is in "Where each number comes from".

## Frontmatter

- `title`: the course map's, "A whole program: from cells to Visual
  Studio". dewlab's was "From cells to a program". The practice page is
  "A whole program: practice", as the other drafted practice pages are
  named.
- `version: 2026.09.27.1`, as the task asked, on both pages. The date
  moved to 28 September while this run was working; `TRANSLATING.md`
  says "today's date with `.1`". I kept the task's value.
- `from: from-cells-to-a-program` on the lesson. The practice page has
  no `from:`, because dewlab has no practice page for this lesson; the
  other drafted practice pages use `from: <id>-practice`, which would
  name a dewlab page that does not exist.
- No `worlds`. The course map's entry says *none*, and "Lessons with no
  worlds" gives the reason: the page follows one program, Codebreaker, as
  dewlab's does. The task text said to keep secret messages and pixel art
  unless the map says otherwise; it does.
- `covers: [PDP-LO5, PDP-LO6, PDP-LO7, PDP-LO8, PDP-LO11, PDP-LO12]`,
  from the course map. dewlab's per-section map gave LO6, LO7, LO8, LO11
  and LO12; the map adds LO5.
- dewlab's `year:` is dropped: the format has no such field.

## Links: decision 32

`DECISIONS.md` 32 says a lesson names a page that is not in `lessons/`
yet by its short title, in italics, with no link, and decision 39 makes
the build refuse a `lesson:` link to a page that is not there. Only
`first-steps` and `objects-and-classes` are in `lessons/`, and this page
needs neither. The task text said links use `[text](lesson:<id>)`; I read
that as the form a link takes, and decision 32 as which pages get one,
as the `when-it-goes-wrong` and `building-reusable-tools` drafts in the
same batch do. The one link is to this page's own practice page, which
moves into `lessons/` with it.

| Where | Italic name now | Link to make when that page is in `lessons/` | That page's batch |
|---|---|---|---|
| lesson, "A loop that waits for quit" (three times), "Asking until"; practice 1 | *Reading input* | `lesson:reading-input` | 4 |
| lesson, your turn 2 | *Searching* | `lesson:finding-things` | 5 |
| lesson, "One place to start" (twice), Release 3 (twice) | *Reusable methods* | `lesson:building-reusable-tools` | 7 |
| lesson, after the Program.cs cell | *Methods* | `lesson:writing-your-own-functions` | 3 |
| lesson, "Running it outside the page", step 6 | *Debugging* | `lesson:when-it-goes-wrong` | 8 |
| lesson, Release 2 | *Decisions* | `lesson:making-decisions` | 2 |
| lesson, opening; "Looking back" | *The team project* | `lesson:the-team-project` | 9 |
| lesson, "Looking back" (the next page) | *Code review* | `lesson:critique-and-reflection` | 6 |

Links the other way: the `building-reusable-tools` draft ends with
"Later, *A whole program* puts a class like `Stats` in a file of its own,
in Visual Studio", which becomes a link to this page when both are in
`lessons/`. This page does put `Cipher` in a file of its own, as that
sentence promises.

## What changed, and why

### The thread

dewlab's page makes three steps: a program that talks to a person (a
menu, and asking again), a program in a file (`main()`), and a program on
your own computer (Python or Thonny). Then it builds Codebreaker in three
releases and gives a team its templates. The C# page keeps all of it,
and the map changes the weight. *Reading input* has already taught
`ReadLine`, the menu loop and `TryParse`, so the first two sections are a
recap. The weight moves to what C# and Visual Studio add: a program in
several files, where the program starts, and a project the learner runs
with and without the debugger. The team shape is concrete: one file for
each person (`Cipher.cs`, `Game.cs`, `Program.cs`), and an interface
agreement that starts from a method's signature.

### The lesson, section by section

**Opening (`a-loop-that-stops-itself-1`).** Kept, with its number
predict. `while (true)` and `break` are C#'s own. "go round for ever"
became "repeat for ever" (the style guide's plain verbs).

**The paragraph after it** is rewritten. dewlab said a program somebody
else can use "runs from its first line to its last". In dewsharp each
Run already does (rule 1, "each Run is a whole program" on
`first-steps`), so the paragraph names the three things that are still
new: a loop that keeps asking and copes with what is typed, files for
each part, and running on the person's own computer.

**A loop that waits for quit.**

- `a-loop-that-waits-for-quit-1`: the course map, "become real input".
  `typed`, `ask()`, `.pop(0)` and the paragraph explaining them go, and
  so does "on your own computer, `ask = input`". The cell reads with
  `Console.ReadLine()`, and `stdin:` gives the checker dewlab's typed
  answers, plus `7` for "a choice that is not on the menu", which the
  prose asks the reader to try. The prose is a recap that points to
  *Reading input*. `choice == null` is a second way out (**End input**),
  because *Reading input* teaches that the menu copes with `null` (course
  map, row 12). The menu keeps dewlab's `if`/`else if` chain.
- `a-loop-that-waits-for-quit-2` is new. *Reading input*'s menu is a
  `do`...`while` round a `switch`; this page's menus are `while (true)`
  with `if`. The cell shows why the two are not mixed: in C#, `break`
  inside a `switch` leaves the `switch`, not the loop. It is a bounded
  `for` loop, so it ends, and it has no input. Its predict is the page's
  second; its three options are the two readings of `break` and a third
  ("the program ends"). The practice page's first problem is the menu
  where this bites.
- `your-turn-1`: kept. `[::-1]` has no C# twin, so the hint and solution
  count down with a `for` loop and build a new string (strings cannot be
  changed, `lists-and-sequences`). A second hint is new, after three
  errors, with that loop; the first hint is dewlab's, as a question. The
  solution note keeps dewlab's two sentences and adds one on two
  `message` variables in two `else if` blocks (scope, from
  `a-total-that-starts-again`). One solution only: `Array.Reverse` on a
  `char[]` would be a shorter tier, but the page has not met it.

**Asking until the answer makes sense.** The course map: "shrink".

- `asking-until-the-answer-makes-sense-1`: `.isdigit()` and `int()`
  become `int.TryParse`. dewlab's `ask_shift` returns the shift and
  loops for ever. In C#, `ReadLine` gives `null` for ever once the input
  has ended, and `TryParse(null)` is `false`, so a plain loop would ask
  for ever after **End input**. The method is `TryAskShift(out int
  shift)`, in the shape of `int.TryParse` and of `TryMean` on
  *Reusable methods*: it returns `false` when the input ends. dewlab's
  paragraph on the short-circuit (`int("seven")` never runs) has no C#
  twin here, because `TryParse` never throws; the short-circuit point
  moves to Release 2, where it keeps `guess.ToUpper()` from running on
  `null`.
- `your-turn-2`: `first_valid` returned the number or `None`. PDP has no
  `int?`. Two C# shapes were possible: a `TryFirstValid(..., out int
  value)` in the same Try shape, or a method that returns a position,
  with -1 for none, as `LinearSearch` does on *Searching*. I chose the
  second: the `inputs` table can then show every answer (a Try method's
  row would show only `true` or `false`, and hide the value), and the
  solution is a linear search with a test in place of `==`, which ties
  the page to *Searching*. The cell keeps its id: the task is the same
  (find the first valid answer, with no typing). See open question 3.
  The `inputs` rows lose `guess: yes`. dewlab's `tests:` cell
  (`assert first_valid(["25"], 1, 25) == 25`) goes: dewsharp has no
  `tests:` cell, and its first row is covered by the `inputs`. Two rows
  are new: spaces round a number, and a temperature range, because
  `int.TryParse` behaves differently from `.isdigit()` (it accepts `-3`
  and `" 7 "`). The solution note is rewritten round those two facts.

**One place to start.** The heading "One place to start: main()" became
"One place to start: Program.cs".

- `one-place-to-start-main-1` splits, as the map asks, into a types cell
  `Cipher.cs` (keeps the id, decision 26) and
  `one-place-to-start-main-1-program` (`Program.cs`). `Cipher` has only
  `Encode`, and never reads or prints; the menu and `TryAskShift` are in
  `Program.cs`, with `TryAskShift` below the statements, so the top of
  the file reads like dewlab's `main()`. `Encode` tests `'A'` to `'Z'`
  rather than `char.IsUpper`, which is also `true` for `É` (an Irish
  name in a message would be coded into another letter and never come
  back). It uses `((position + shift) % 26 + 26) % 26`, so a shift below
  zero works, as a test in Release 3 checks.
- The typed answers are dewlab's, with `hello` in small letters in place
  of `HELLO`, so that `message.ToUpper()` has something to do.
- `message != null && TryAskShift(out int shift)` makes the program end
  quietly whenever the input ends: probes `p-coder-ends-at-message` and
  `p-coder-ends-at-shift`.
- The `__name__` section goes (course map). In its place: where a C#
  program starts (the top-level statements, named here), that the
  compiler makes them into `Main`, a pointer back to rule 5's `Main` on
  *Reusable methods*, and the Visual Studio box *Do not use top-level
  statements*. The classic `Main` is described in one sentence and not
  shown, as the map says ("this page says only that Visual Studio's
  template can show it"). A "why" fold answers the question a reader
  asks next, with the message Visual Studio gives (CS8802), run in a
  scratch project.

**Running it outside the page.** dewlab's steps (install Python or
Thonny, copy into a `.py` file, run) become the map's: download the cell
as a project, open it, and run it with and without the debugger. The
steps follow `project.js` (the ZIP holds `<Name>.sln`, `Program.cs`, a
file for each types cell above, `IrishCulture.cs`, the `.csproj` and a
`README.txt`, whose steps are the same: Extract All, open the `.sln`,
Ctrl+F5 or F5) and the `when-it-goes-wrong` draft's debugger steps
(breakpoint in the margin, F5, Locals, Call Stack, F10, Shift+F5). New
here: the Call Stack shows two files as one program; Ctrl+Z then Enter
ends the input in a real console (Microsoft's `Console.ReadLine`
reference); a project made from Visual Studio's own template shows
nullable warnings (CS8600), which the teacher notes and the style
guide's "decided for now" 4 ask a page that exports to mention; and how
to add a class file, with the namespace trap (CS0103), which a team
meets on its first day. dewlab's Notebook paragraph is kept for
dewsharp's notebook (which can wait for typing). dewlab's GitHub
paragraph goes: dewsharp has no GitHub page, and the map's entry for
`the-team-project` leaves the shared place to the college. Its point
(keep every version, because a release needs it) is kept, with the ZIP.

**Three releases of a small game.**

- Release 1 (`three-releases-of-a-small-game-1`): `random.randint(1,
  25)` becomes `Random.Shared.Next(1, 26)`, as the map asks, and the
  prose says what the second number means. It uses `Cipher` from above
  (rule 2) in place of repeating `encode`. It compares the guess with
  `==` and no `ToUpper()`, so that dewlab's line "a guess is compared in
  capitals, so `otter` counts" really is Release 2's change (dewlab's
  Release 1 already had `.upper()`). The prose invites the reader to type
  `otter` in Release 1 (probe `p-release-1-otter`).
- Release 2: `play_round` becomes `Game.PlayRound`, in a types cell
  `Game.cs` (keeps the id, decision 26), because the map's interface
  agreement names `public static bool PlayRound(string word)`, which
  needs a class. The menu is `three-releases-of-a-small-game-2-program`,
  with dewlab's typed answers. So the page shows three files, three
  people. `guess != null && guess.ToUpper() == word` is where the
  short-circuit paragraph went.
- Release 3 stays a list, as in dewlab, with one change: its tests are
  now two cells, a types cell `Test.cs` (a copy of `Check` from
  `building-reusable-tools`, word for word) and a program cell with five
  checks: dewlab's two asserts, and three more (Z to A, a space, and
  a shift below zero). docstrings become XML comments, which the page
  already has on every method, and the list says so. `random.choice`
  becomes `words[Random.Shared.Next(words.Length)]` (probe
  `p-random-word`). An invitation to add a test for small letters is new
  (probe `p-small-letters`).

**Templates for a team.** Kept. The interface agreement starts from the
signature, as the map asks, names the file, and gains a `Reads:` line
(the method reads the player's answer, which a caller needs to know).
"Function" becomes "Method", "Gives back" becomes "Returns". "Who is
building which piece" became "which file". The review checklist says
"XML comment" for "docstring", adds `null` when the input ends, and adds
a line on warnings, from the release checklist on `a-program-of-your-own`.
Each template now has a one-sentence definition, because dewsharp has no
glossary panel.

**Looking back.** The reflection question replaces "a function standing
in for a person typing" (gone with `ask`) with "a program in several
files". The challenge is the same task, a `while (true)` menu with real
input and a place for one round. It compiles alone (probe `p-challenge`,
decision 40). The next page is *Code review*, as in dewlab; a sentence
names *The team project* after it.

**Where to read more.** Sweigart and the Python tutorial go. Three
Microsoft pages take their place, each checked on 28 September 2026: the
top-level statements article (it says a project can have only one file
with top-level statements), the tutorial that makes a console app in
Visual Studio (its page has a choice of three editors, and it writes
`var`, which the entry says), and the `Console.ReadLine` reference (it
says `ReadLine` returns `null` after Ctrl+Z, followed by Enter on
Windows). No video: dewlab's page had none, and I found none I could
check.

### The practice page

dewlab has none; the map lists four problems: "a menu loop with a bug, a
validation method tested with a `string[]`, a `static class` to split out
of a long cell, a change log to write". The practice-page rule adds two
or three from earlier pages.

1. **A menu that does not end.** The `switch`-in-`while (true)` menu,
   the bug the lesson's second cell warns about. It ends in the checker,
   and on the page after **End input**, because `choice == null` still
   breaks the loop; the intro says to press **End input** if a program
   keeps asking. A predict, a fold, a hint that is a question, and a
   solution with a `bool running` flag. The note names the `do`...`while`
   of *Reading input* as the other fix.
2. **A word for the game.** A validation method, tested with an array
   and a loop, with no typing. The `inputs` include `""` and `null`
   ("what `ReadLine` gives when the input ends"). The note is about `||`
   short-circuiting, the partner of the lesson's `&&`.
3. **One long cell, two files.** A long cell with two methods; the reader
   moves them into `static class Picture` in a types cell. The program
   cell below starts as CS0117 (decision 27), and its solution writes the
   class again below its statements (rule 4, decision 26).
4. **A change log to write.** Two releases of a quiz, run with ` 56`,
   typed with a space. Release 1 compares text (`No: it is 56`); release
   2 uses `int.TryParse`, which ignores the space. The fold has one
   answer, and a paragraph on writing a change log for the person who
   uses the program.
5. **From earlier: a remainder below zero** (*Dividing*,
   `storing-and-computing`): why `Cipher.Encode` adds 26. A predict.
   The cell prints `-3 % 26` too, so the fold's -3 is recorded
   (decision 29).
6. **From earlier: the words in turn** (`%` with an array's length,
   Release 2). The cell prints each position, so the fold's 0, 1, 2 are
   recorded.
7. **From earlier: a method that returns nothing** (*Methods*, "Print a
   print"): `bool finished = ShowScore(1, 2);` is CS0029, tied to the
   interface agreement's `Returns:` line.

### The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`), so every term
is defined in the prose where it first appears. dewlab's entries:

| dewlab entry | Here |
|---|---|
| `while True, break` | the opening paragraph |
| `.pop()` | gone, with `ask` |
| `.isdigit()` | gone; `int.TryParse` (from *Reading input*) |
| `main()` | "top-level statements" and `Main`, in "One place to start" |
| `if __name__ == "__main__":` | gone (course map) |
| interface agreement | its template's first sentence |
| change log | its template's first sentence |

New terms, each defined where it first appears: *project*, *top-level
statements*, *compilation unit* (in the fold), *solution*, *Solution
Explorer*, *namespace*, *release*, *signature*, *team charter*, *review
checklist*.

## What C# made different, in short

- Real input. Every stand-in goes; nine cells on the two pages have
  `stdin:`. `ReadLine`
  gives `null` when the input ends, so every loop that reads input needs
  a way out for `null`, or it asks for ever. This shaped
  `TryAskShift` and the null checks in the menus and in `PlayRound`.
- `break` inside a `switch` leaves only the `switch`: a new cell, and the
  first practice problem.
- No `[::-1]`: a loop that counts down.
- `int.TryParse` in place of `.isdigit()` and `int()`: it accepts a
  minus sign and spaces round the digits, and `null` gives `false`.
- No `None`: `FirstValid` returns a position, or -1.
- A program in several files: a `static class` in each types cell, and
  one `Program.cs` with the statements. Only one file may have
  statements (CS8802).
- A class in Visual Studio's new file is inside a namespace, which
  top-level statements can't see without `using` (CS0103).
- `%` keeps the sign, so `Encode` adds 26 before the second `%`.
- The debugger and the Call Stack show the two files as one program
  (`Program.<Main>$`).

## Where each number comes from

From NativeCheck's run of the lesson:

- "It prints 3": `a-loop-that-stops-itself-1` printed `3`.
- "It prints `Round 3`, and then `After the loop`":
  `a-loop-that-waits-for-quit-2` printed `Round 1`, `Round 2: break`,
  `Round 3`, `After the loop`.
- "NOON stays NOON, and OTTER becomes RETTO": `your-turn-1`'s solution
  printed `NOON` and `RETTO`.
- `FirstValid`: the starter prints `-1` (its `return -1;`). The
  solution's rows: 2, 1, -1, 0, -1, 0. The note quotes "the last input
  gives 0" and "its input gives 0 too" (the `" 7 "` row); -3, 1, -20
  and 40 are the inputs themselves.
- "It prints `KHOOR`": `one-place-to-start-main-1-program`, with `hello`
  and 3, printed `KHOOR`.
- "`otter` counts": `three-releases-of-a-small-game-2-program` printed
  `Yes!` after the answer `otter`.
- `Random.Shared.Next(1, 26)`, "from 1 up to 26, but not 26 itself":
  probe `p-shift-range`, 100,000 draws, smallest 1, largest 25.
- 5, 21, -5 and the other numbers in the tests cell are its arguments;
  the cell printed `Every check held.`

From the practice page's run:

- Problem 1: "The `2` after it prints `meet me...`": the cell printed
  `MEET ME!`, `Goodbye.`, `meet me...`.
- Problem 4: `No: it is 56` (release 1); `Yes!`, `Yes!`,
  `No: it is 36`, `You scored 2 of 3` (release 2). The fold quotes
  `No: it is 56` and `You scored 2 of 3`; 56, 42 and 30 are the typed
  answers.
- Problem 5: `>`, `X`, `-3`.
- Problem 6: `Round 7: position 0, OTTER`, and positions 0, 1, 2, 0, 1,
  2, 0.
- Problem 7: `error CS0029: Cannot implicitly convert type 'void' to
  'bool'`.
- Problem 3: the message quoted before the cell, `'Picture' does not
  contain a definition for 'Row'`, is NativeCheck's first CS0117.

From a scratch console project (`dotnet build` and `dotnet run`, SDK
10.0.401, the page's settings: C# 14, .NET 10, implicit usings, nullable
off), not from a cell:

- `Program.cs(1,1): error CS8802: Only one compilation unit can have
  top-level statements.` (`Cipher.cs` with one statement above its
  class).
- `Program.cs(1,19): error CS0103: The name 'Game' does not exist in the
  current context` (`Game.cs` as Visual Studio's **Add Class** writes
  it: `using` lines, `namespace two`, `internal class Game`). With the
  file replaced by the class alone, the build succeeded.
- `warning CS8600: Converting null literal or possible null value to
  non-nullable type.`, for `string choice = Console.ReadLine();` with
  `<Nullable>enable</Nullable>`, the template's setting.
- `at Cipher.Encode(String m, Int32 s) in .../Cipher.cs:line 5` over
  `at Program.<Main>$(String[] args) in .../Program.cs:line 3`, from an
  exception thrown in `Cipher.Encode` called from `Program.cs`: the name
  the lesson gives for the Call Stack's second line.

## Once the page UI exists

- **The typed lines.** NativeCheck does not echo `stdin:`, so its output
  runs a prompt into the next line (`Choose: Message: MEET ME!`). The
  page shows each typed line after its prompt, in bold. Nothing in the
  prose quotes a line with a prompt in it, but read the recorded outputs
  once `npm run check-lessons -- --write` has run.
- **Random output.** `three-releases-of-a-small-game-1` and
  `-2-program` print `Decode this:` and a code made with
  `Random.Shared`, so their output differs on every run, and the browser
  checker without `--write` will report a difference each time. This is
  the `finding-things` draft's open question 1, and the same three ways
  out apply (see open question 1 below). The prose quotes no coded word.
- **Download project.** Check the ZIP of `one-place-to-start-main-1-program`
  holds `Program.cs`, `Cipher.cs` and `IrishCulture.cs` (step 4 names
  them), and that `three-releases-of-a-small-game-2-program`'s holds
  `Cipher.cs` and `Game.cs` too. The project name will be long
  (`FromCellsToAProgramOnePlaceToStartMain1Program`); the prose does
  not quote it.
- **The Visual Studio steps** need a lab PC: that the Call Stack shows
  `Program.<Main>$` in the form the prose gives (the frame name is
  verified; Visual Studio's layout of the line is not), that **Add** >
  **Class** writes a namespace in a project whose `Program.cs` has
  top-level statements, and that Ctrl+Z then Enter ends the input in
  Visual Studio's console window.
- **Labels.** Three program cells on the lesson are labelled
  `Program.cs`; with `file:` absent that is the default. Check that the
  page's labels make `Cipher.cs`, `Game.cs` and `Test.cs` stand out as
  files the program cells below use.

## Open questions for a reviewer

1. **Random output and the browser checker.** Release 1 and Release 2
   use `Random.Shared`, as the course map asks, so their recorded output
   changes each run. The ways out are those in the `finding-things`
   notes: an `output: varies` header (a format change), `new Random(42)`
   (every learner gets the same shift), or a design where the checker
   sees no coded word. I kept the map's version and changed nothing
   outside this folder.
2. **`null` at the Message prompt.** In the two recap menus
   (`a-loop-that-waits-for-quit-1`, `your-turn-1`), pressing **End
   input** at `Message:` stops with a `NullReferenceException` (probe
   `p-menu-ends-at-message`). I left it, to keep the recap cells short;
   the coder and Codebreaker handle it, and the prose teaches the check
   there. An `if (message != null)` in each would close it, at three
   lines a cell.
3. **`FirstValid` returns a position.** dewlab returned the number or
   `None`. A `TryFirstValid(answers, low, high, out int value)` would
   match `TryAskShift` and `TryMean`, but its `inputs` rows could show
   only `true` or `false`. If a reviewer prefers the Try shape, the rows
   would need a helper in the cell, or the task would move to a tests
   cell with `Check`.
4. **`TryAskShift` is written twice**, in the "Asking until" cell and at
   the bottom of `Program.cs`, because a method in a program cell
   belongs to its cell. A third file, `Ask.cs`, with a `static class
   Ask`, would remove the copy and show three files earlier; the map
   names two files for the coder, so I kept two.
5. **Long cells.** `one-place-to-start-main-1-program` has 43 lines,
   Release 2's menu 30, and the first menu 25, against the style guide's
   five to fifteen. A whole
   program is the point of the section, and dewlab's cell was as long.
   Splitting it would hide the thing the prose asks the reader to see:
   the top of `Program.cs` reading like a plan.
6. **The `Test` class is copied** from `building-reusable-tools`, word
   for word. Nothing checks that the copies stay the same (course map,
   open question 2, for classes).
7. ***Reading input* is not drafted yet.** The recap assumes what the
   course map says it teaches: `Console.Write` prompts, `int.TryParse`
   with `out`, a `do`...`while` menu round a `switch`, 9 to quit, and
   `null` at **End input**. When it is written, check the recap and the
   `switch` cell against it. If its menu uses `while (true)` with a
   `switch`, it has the bug that practice problem 1 shows.
8. **Opening the project.** `a-program-of-your-own`'s draft opens the
   `.csproj`; this page, `when-it-goes-wrong` and the ZIP's `README.txt`
   open the `.sln`. One wording across the pages would help.
9. **The namespace paragraph** (adding a class in Visual Studio) may
   belong on `the-team-project`, where a team first adds files, or may
   wait for FOOP's `namespaces-and-libraries`. I put it here because the
   map makes this the page where a learner first runs a project, and a
   team hits the trap the first time it adds a file.
10. **`bool` prints as `True` in text.** Practice problem 2's cell prints
    `OTTER: True`, while its `inputs` rows show `true`. The fold does not
    comment. A reader may ask; a sentence could say that `$"..."` writes
    a `bool` with a capital.
11. **New cell ids.** `a-loop-that-waits-for-quit-2`,
    `one-place-to-start-main-1-program`,
    `three-releases-of-a-small-game-2-program` (decision 26),
    `three-releases-of-a-small-game-check` (`Test.cs`, after
    `when-it-goes-wrong`'s `the-dangerous-kind-check`) and
    `three-releases-of-a-small-game-3` (the tests; dewlab had no third
    release cell). The practice page's ids are all new.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
the challenge. Run them with the same NativeCheck command, passing
`NOTES.md` as the file. The cell with `expect:` fails on purpose. None of
them is part of either page.

A copy of the lesson's `Cipher` and `Game` comes first, so the probes
below can use them.

```csharp exec
id: p-cipher
file: Cipher.cs
static class Cipher
{
    public static string Encode(string message, int shift)
    {
        string coded = "";
        foreach (char character in message)
        {
            if (character >= 'A' && character <= 'Z')
            {
                int position = character - 'A';
                int moved = ((position + shift) % 26 + 26) % 26;
                coded = coded + (char)('A' + moved);
            }
            else
            {
                coded = coded + character;
            }
        }
        return coded;
    }
}
```

```csharp exec
id: p-game
file: Game.cs
static class Game
{
    public static bool PlayRound(string word)
    {
        int shift = Random.Shared.Next(1, 26);
        Console.WriteLine($"Decode this: {Cipher.Encode(word, shift)}");
        Console.Write("Your answer: ");
        string guess = Console.ReadLine();
        if (guess != null && guess.ToUpper() == word)
        {
            Console.WriteLine("Yes!");
            return true;
        }
        Console.WriteLine($"No: it was {word}");
        return false;
    }
}
```

The challenge compiles alone, and with no input it ends at once
(decision 40).

```csharp exec
id: p-challenge
// Release 1 of a game of your own: a loop, a way to quit,
// and an answer checked with care.
while (true)
{
    Console.Write("1: play   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    if (choice == "1")
    {
        // Your game's one round goes here.
    }
}
Console.WriteLine("Goodbye.");
```

The first menu ends when the input ends at `Choose:` (no `stdin:`), and
stops with an exception when it ends at `Message:` (open question 2).

```csharp exec
id: p-menu-ends-at-choose
while (true)
{
    Console.WriteLine("1: shout a message   2: count the messages   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        Console.WriteLine(message.ToUpper() + "!");
    }
}
Console.WriteLine("Goodbye.");
```

```csharp exec
id: p-menu-ends-at-message
stdin: "1\n"
expect: exception
while (true)
{
    Console.WriteLine("1: shout a message   2: count the messages   9: quit");
    Console.Write("Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        Console.WriteLine(message.ToUpper() + "!");
    }
}
Console.WriteLine("Goodbye.");
```

The coder ends quietly when the input ends at `Message:`, or at the
shift.

```csharp exec
id: p-coder-ends-at-message
stdin: "1\n"
while (true)
{
    Console.Write("1: code a message   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        if (message != null && TryAskShift(out int shift))
        {
            Console.WriteLine(Cipher.Encode(message.ToUpper(), shift));
        }
    }
}
Console.WriteLine("Goodbye.");

static bool TryAskShift(out int shift)
{
    while (true)
    {
        Console.Write("Shift, 1 to 25: ");
        string text = Console.ReadLine();
        if (text == null)
        {
            shift = 0;
            return false;
        }
        if (int.TryParse(text, out shift) && shift >= 1 && shift <= 25)
        {
            return true;
        }
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}
```

```csharp exec
id: p-coder-ends-at-shift
stdin: "1\nhello\nseven\n"
while (true)
{
    Console.Write("1: code a message   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    if (choice == "1")
    {
        Console.Write("Message: ");
        string message = Console.ReadLine();
        if (message != null && TryAskShift(out int shift))
        {
            Console.WriteLine(Cipher.Encode(message.ToUpper(), shift));
        }
    }
}
Console.WriteLine("Goodbye.");

static bool TryAskShift(out int shift)
{
    while (true)
    {
        Console.Write("Shift, 1 to 25: ");
        string text = Console.ReadLine();
        if (text == null)
        {
            shift = 0;
            return false;
        }
        if (int.TryParse(text, out shift) && shift >= 1 && shift <= 25)
        {
            return true;
        }
        Console.WriteLine("Please type a whole number from 1 to 25.");
    }
}
```

Release 1 with `otter`, in small letters, and Release 2 when the input
ends at the answer.

```csharp exec
id: p-release-1-otter
stdin: "otter\n"
string word = "OTTER";
int shift = Random.Shared.Next(1, 26);
Console.WriteLine($"Decode this: {Cipher.Encode(word, shift)}");
Console.Write("Your answer: ");
string guess = Console.ReadLine();
if (guess == word)
{
    Console.WriteLine("Yes!");
}
else
{
    Console.WriteLine($"No: it was {word}");
}
```

```csharp exec
id: p-release-2-ends-at-answer
stdin: "1\n"
string[] words = { "OTTER", "HERON", "BADGER" };
int rounds = 0;
int score = 0;
while (true)
{
    Console.Write("1: play   2: score   9: quit   Choose: ");
    string choice = Console.ReadLine();
    if (choice == null || choice == "9")
    {
        break;
    }
    else if (choice == "1")
    {
        string word = words[rounds % words.Length];
        rounds = rounds + 1;
        if (Game.PlayRound(word))
        {
            score = score + 1;
        }
    }
}
Console.WriteLine($"Goodbye. {score} of {rounds}");
```

`Random.Shared.Next(1, 26)` gives 1 to 25, and Release 3's random word
compiles.

```csharp exec
id: p-shift-range
int smallest = 100;
int largest = 0;
for (int i = 0; i < 100000; i++)
{
    int shift = Random.Shared.Next(1, 26);
    smallest = Math.Min(smallest, shift);
    largest = Math.Max(largest, shift);
}
Console.WriteLine($"smallest {smallest}, largest {largest}");
```

```csharp exec
id: p-random-word
string[] words = { "OTTER", "HERON", "BADGER", "KITE", "WREN" };
string word = words[Random.Shared.Next(words.Length)];
Console.WriteLine(Array.IndexOf(words, word) >= 0);
```

What `Encode` does with small letters, for the invitation after the
tests.

```csharp exec
id: p-small-letters
Console.WriteLine(Cipher.Encode("abc", 1));
Console.WriteLine(Cipher.Encode("Otter", 1));
```
