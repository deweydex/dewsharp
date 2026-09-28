# from-cells-to-a-program: notes for a reviewer

Written from dewlab `tutorials/from-cells-to-a-program/` (version
2026.09.26.1): the lesson and its glossary file. dewlab has no practice
page for it, so the practice page is new, from the course map's list. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 26):
action *adapt*, shape *tutorial*, size M, batch 8, worlds none, depends
on `building-reusable-tools` and `reading-input`. The folder did not
exist when this run started, so there was no partial draft to finish;
both pages were written from the start.

## Moved into `lessons/` (28 September 2026)

The draft was ported and checked with the native checker in `drafts/`.
On 28 September 2026 it moved into `lessons/`, was run in the browser
engine, and was revised against the recorded outputs, the playbook's
checklist (`docs/TRANSLATING.md`) and the style guide. What that changed
is under "What the move changed". The porter's open questions are settled
under "Open questions", except for the ones under "Open", which are for
Josh. The porter's own notes follow from "Frontmatter" on, corrected
where the move changed what they describe.

Files now:

- `lessons/from-cells-to-a-program/from-cells-to-a-program.md`: the
  lesson, version 2026.09.28.1. 13 exec cells, 3 of them types cells
  (`Cipher.cs`, `Game.cs`, `Test.cs`); 2 predicts, 3 hints, 2 solutions,
  1 `inputs` block, 1 "why" fold, 3 text fences (the templates), 1 task
  list and 1 challenge. No cell is meant to fail. Five cells read input
  and have `stdin:`; Release 2's menu reads input and has none (see
  "Random output").
- `lessons/from-cells-to-a-program/from-cells-to-a-program-practice.md`:
  the practice page, version 2026.09.28.1, 7 problems. 10 exec cells, 1
  of them a types cell (`Picture.cs`); 2 predicts, 3 hints, 3 solutions,
  2 `inputs` blocks, 5 answer folds. Two cells are meant to fail, and
  their problems say so: `one-long-cell-two-files-2-program` (CS0117, the
  task's starting point, decision 27) and
  `a-method-that-returns-nothing-1` (CS0029). Three cells read input and
  have `stdin:`.
- `from-cells-to-a-program.outputs.json` and
  `from-cells-to-a-program-practice.outputs.json` beside them: what the
  browser checker recorded.
- This file, which was `NOTES.md` in the draft folder.

The draft's `*.native.json` files are deleted, and so is the draft folder.
The pages have no pictures. `courses/pdp.yaml` still has a `planned:` line
for `from-cells-to-a-program`; the playbook says to delete it when the
lesson moves, and this move was not allowed to edit the course files.
`npm run check-lessons -- from-cells-to-a-program
from-cells-to-a-program-practice` passes without `--write`, twice in a
row, with no problems.

### What the browser showed

Before any change, the browser checker recorded the same outputs as the
native checker for every cell, solution and `inputs` row of both pages:
the same printed text, the same compiler codes, lines, columns and
messages (CS0117 at (1,27) and (2,27); CS0029 at (6,17)), and the same
`inputs` values. No cell warns, so no warning travels down either page. No
number depends on the culture. No cell stops with an exception, so there
was no stack trace to compare. The differences:

- **Typed lines.** The page shows each typed line after its prompt, as a
  console does (`Choose: 1`, then `Message: MEET ME`), where the native
  check showed the prompts alone (`Choose: Message: MEET ME!`). No
  sentence in the prose quotes a line with a prompt in it.
- **Random output.** Release 1 and Release 2's menu printed a code made
  with `Random.Shared` (`JOOZM` and `ZEEPC` on two runs of Release 1), so
  `npm run check-lessons` without `--write` reported "output differs" for
  `three-releases-of-a-small-game-1` and `-2-program` on every run. This
  was the porter's open question 1; see "What the move changed".
- **Values.** The native checker wrote a compiler error in an `inputs` row
  as nothing, and a string with new lines unescaped; the browser records
  `{ "compileError": "CS0117" }` and `"####\n#..#\n#..#\n####"`. Same
  facts.

The page itself, opened in headless Chromium with `npm run serve`'s
server: each cell's kind and file label are as the prose says (`Cipher.cs`,
`Game.cs`, `Test.cs` and `Picture.cs` are types cells; every other cell is
a program cell labelled `Program.cs`). All 19 `lesson:` links on the
lesson go to pages in `lessons/`. Driven as a learner would: pressing
**End input** at `Message:` in the first menu gives "Stopped with an
exception on line 14 of Program.cs", a `NullReferenceException`, and
*What .NET said, in full* names `Program.<Main>$(String[] args)`, the
name step 7 gives for the Call Stack's line; Release 2 with `otter` prints
`Yes!`; Release 1 with `otter` prints `No: it was OTTER`. No page errors.

**Download project** on `one-place-to-start-main-1-program` writes
`Program.cs`, `Cipher.cs`, `IrishCulture.cs`, the `.csproj`, the `.sln`
and `README.txt`, as step 4 says; on
`three-releases-of-a-small-game-2-program` it adds `Game.cs`. `dotnet
build` of the first (SDK 10.0.401): 0 warnings; `dotnet run` with `1`,
`hello`, `3`, `9` typed prints `KHOOR`. Nobody has opened it in Visual
Studio (see "Open").

### What the move changed

**Random output (the porter's question 1).** The playbook says to run the
checker until it passes without `--write`, and not to change the checker
or the format to make a lesson pass. So:

- Release 1 has a shift written into the code, `int shift = 3;`, as its
  word already was. It is "the smallest thing that is a game", and a
  reader can see the word in the code anyway, so a fixed shift costs the
  game nothing; the prose now says "the secret is not much of a secret
  yet" and asks the reader to decode it without looking at the program.
  It records `Decode this: RWWHU`, `Your answer: KITE`, `No: it was
  OTTER` on every run. The `Random.Shared.Next(1, 26)` paragraph moved to
  Release 2.
- Release 2 keeps `Random.Shared` in `PlayRound`, as the course map asks.
  Its menu cell has no `stdin:`, so the checker records the menu and
  `Goodbye.`, the same on every run, as `finding-things` did for its
  guessing game. The prose invites the reader to play two or three
  rounds, type one answer in small letters, and choose 2 and 9. Release
  2's intro and the change log template gain "a new shift for each
  round". What the typed answers showed is now probe
  `p-release-2-typed` (`Yes!` for `otter`).

**Links.** Every page this one names that is in `lessons/` is now a
`lesson:` link (decisions 32 and 39): *The team project* (twice), *A
program of your own* (four times: the `switch` menu starter, the
**Download project** button, nullable reference types, *release*),
*Arrays and lists* (strings cannot be changed, in a hint), the closer look
at starting a total (scope, in a solution note), *Reusable methods* (five
times), *Searching*, *Methods*, *Debugging*, *Code review*, and the
practice page for *Decisions* (short-circuiting, which is taught there
under that name, not on the lesson). The practice page links its lesson,
*Decisions* (a `bool` prints with a capital), *Dividing* and *Methods*.
Only *Reading input* stays in italics: it is not in `lessons/` and was not
in this round's list.

**Every number and quoted output from a recorded output.**

- Practice 6's fold said "`rounds` 6", which no cell printed. The cell now
  prints `rounds` on each line (`Round 7: rounds is 6, position 0,
  OTTER`), and the fold reads it (decision 29).
- Three Visual Studio messages can't come from a page cell: CS8802 (two
  files with statements: on the page, statements in cells above are
  blanked, decision 16), CS0103 for `Game` in a namespace, and CS8600
  with nullable on. The last two were checked in the browser engine
  (probes `p-program-without-using` and `p-nullable-cs8600`) and have the
  same text as the porter's `dotnet build`. CS8802 is still from the
  porter's `dotnet build` only (see "Open").
- "1 to 25" for `Random.Shared.Next(1, 26)` is probe `p-shift-range`, as
  `finding-things` quotes "1 to 100" for its game.

**The predict on the `switch` cell** has `line: 3`. Its question, "What
will it print after `Round 2: break`?", names no line the parser knows,
and both `Round 3` and `After the loop` are lines of the output, so the
page would have treated either guess as the same as the output (decision
37). With `line: 3`, only `Round 3` matches, and a reader who chose
`After the loop` is asked "Which line explains what you saw?".

**Hint triggers.** A starter that runs never gives an error, so the
default `after: 1 errors` would never show a hint on this page's tasks.
`your-turn-1` now has `after: 1 runs` and `after: 3 runs`, `your-turn-2`
and practice 2 have `after: 1 runs`, and practice 1, whose first run is
the demonstration, has `after: 2 runs`, as `finding-things` and
`when-it-goes-wrong` do.

**The gap at `Message:` (the porter's question 2).** After Release 2's
paragraph on `guess != null &&`, the lesson now says that the coder has
the same check and the first menus do not, and asks what happens there
if you press **End input** at `Message:`, pointing to the review
checklist.

**The page and Visual Studio.** "Looking back" now says that everything
on the page runs in the browser except the steps under "Running it
outside the page", and that *The team project* is built in Visual Studio
from its first day, so the reader should try those steps first.

**Smaller changes.**

- `null` is defined where it first appears ("C#'s value for *nothing
  here*"), in the words of `finding-things` and `a-program-of-your-own`.
- The `switch` menu is "the menu on *Reading input*, and the starter on
  *A program of your own*", which a reader has run.
- *Release* is "as on *A program of your own*", which defined it first;
  the nullable paragraph names *nullable reference types* and points
  there; step 1 names the cell ("the one that prints `KHOOR`"); step 3
  says a Visual Studio solution is not the solution you compare with;
  step 7 says where the Call Stack window is; the namespace paragraph
  says "with no `namespace` line".
- The `TryAskShift` paragraph names `TryMean` on *Reusable methods*,
  which taught `out`; the tests paragraph says `Check` is the same method
  "word for word".
- "Every program on this site so far has lived in a cell" became "Almost
  every program on these pages": `a-program-of-your-own` sent the reader
  to the notebook and to Visual Studio.
- "needs changing" became "needs a change"; long lines in two paragraphs
  were wrapped.
- Practice 2's note says the cell prints `True` with a capital and the
  table writes `true` (the porter's question 10), and names
  short-circuiting.

## Frontmatter

- `title`: the course map's, "A whole program: from cells to Visual
  Studio". dewlab's was "From cells to a program". The practice page is
  "A whole program: practice", as the other drafted practice pages are
  named.
- `version: 2026.09.27.1`, as the task asked, on both pages. The date
  moved to 28 September while this run was working; `TRANSLATING.md`
  says "today's date with `.1`". I kept the task's value. (The move
  changed cells on both pages, so both are now 2026.09.28.1.)
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

The porter named every other page in italics, because only the two
exemplars were in `lessons/` then. The move made each one a link, since
each is now in `lessons/` (see "What the move changed"). The porter's
table, as it now stands:

| Where | Was | Now |
|---|---|---|
| lesson, "A loop that waits for quit" (three times), "Asking until"; practice 1 | *Reading input* | still italics: `reading-input` is not in `lessons/` |
| lesson, your turn 2 | *Searching* | `lesson:finding-things` |
| lesson, "One place to start" (twice), Release 3 (twice), "Asking until" | *Reusable methods* | `lesson:building-reusable-tools` |
| lesson, after the Program.cs cell | *Methods* | `lesson:writing-your-own-functions` |
| lesson, "Running it outside the page", step 6 | *Debugging* | `lesson:when-it-goes-wrong` |
| lesson, Release 2 | *Decisions* | `lesson:making-decisions-practice`, where short-circuiting is taught |
| lesson, opening; "Looking back" | *The team project* | `lesson:the-team-project` |
| lesson, "Looking back" (the next page) | *Code review* | `lesson:critique-and-reflection` |

Links the other way: `building-reusable-tools`, `critique-and-reflection`
and `the-team-project` already link here as *A whole program*.
`the-team-project` says this page "gives the steps to open a project, run
it, and add a file to it", and names Codebreaker's three files; both are
still true.

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
  errors (after three runs since the move), with that loop; the first hint is dewlab's, as a question. The
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
  *The move changed this:* Release 1's shift is now written into the
  code, `int shift = 3;`, like its word, so that its output is the same
  on every run, and the `Random.Shared.Next(1, 26)` paragraph is under
  Release 2 (see "What the move changed").
- Release 2: `play_round` becomes `Game.PlayRound`, in a types cell
  `Game.cs` (keeps the id, decision 26), because the map's interface
  agreement names `public static bool PlayRound(string word)`, which
  needs a class. The menu is `three-releases-of-a-small-game-2-program`,
  with dewlab's typed answers (*the move removed them*: with a random
  shift, no typed answers give the same output twice; they are probe
  `p-release-2-typed` now). So the page shows three files, three
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
names *The team project* after it. (The move made both links, and added
a paragraph on what belongs in Visual Studio.)

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
   recorded. (Since the move it prints `rounds` too, so the fold's 6 is
   recorded as well.)
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

- Real input. Every stand-in goes; eight cells on the two pages have
  `stdin:` (nine before the move took it from Release 2's menu).
  `ReadLine` gives `null` when the input ends, so every loop that reads input needs
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

All from the browser checker's recorded outputs (`*.outputs.json`), run
on 28 September 2026, unless the row says otherwise.

| Number or quoted output | Recorded by |
|---|---|
| 3 | `a-loop-that-stops-itself-1` |
| `Round 3`, then `After the loop` | `a-loop-that-waits-for-quit-2` |
| NOON stays NOON; OTTER becomes RETTO | the solution of `your-turn-1` |
| `FirstValid`: the last input gives 0; the `" 7 "` input gives 0 too (-3, 1, -20 and 40 are the inputs themselves) | the solution's `inputs` rows of `your-turn-2` (2, 1, -1, 0, -1, 0) |
| `KHOOR` (prose and step 1) | `one-place-to-start-main-1-program` |
| Release 1 shows the same coded word on every run (no word quoted) | `three-releases-of-a-small-game-1` (`RWWHU`), the same in every run of the checker |
| "1 to 25" for `Random.Shared.Next(1, 26)` | probe `p-shift-range` (smallest 1, largest 25) |
| `otter` counts in Release 2 | probe `p-release-2-typed` (`Yes!`); the page, driven in Chromium (`Yes!`) |
| what `otter` does in Release 1 (asked, not answered) | probe `p-release-1-fixed-otter` (`No: it was OTTER`) |
| End input at `Message:` in the first menus (asked, not answered) | probe `p-menu-ends-at-message`; the page: "Stopped with an exception on line 14 of Program.cs" |
| the checks hold (5, 21, -5 are arguments) | `three-releases-of-a-small-game-3` (`Every check held.`) |
| `Program.<Main>$` (step 7) | the page's *What .NET said, in full* for the first menu's exception; Visual Studio's own Call Stack not seen (Open) |
| `error CS0103: The name 'Game' does not exist in the current context` | probe `p-program-without-using` (the porter's `dotnet build` too) |
| `warning CS8600` | probe `p-nullable-cs8600` (`#nullable enable` in the cell; the porter's `dotnet build` too) |
| `error CS8802: Only one compilation unit can have top-level statements.` | the porter's `dotnet build` only; no page cell can show it (Open) |
| practice 1: `Goodbye.`, then the menu again; `meet me...`; the solution never reads the `2` | `a-menu-that-does-not-end-1` and its solution |
| practice 2: `True` with a capital; `true` in the table | `a-word-for-the-game-1`'s solution output and `inputs` rows |
| practice 3: `'Picture' does not contain a definition for 'Row'` | `one-long-cell-two-files-2-program` (CS0117 at (1,27)) |
| practice 4: `No: it is 56`; `You scored 2 of 3` (56, 42 and 30 are typed) | `a-change-log-to-write-1` and `-2` |
| practice 5: `>`, `X`, -3 | `a-remainder-below-zero-1` |
| practice 6: round 7, `rounds` 6, position 0, `OTTER`; positions 0, 1, 2, 0, 1, 2, 0 | `the-words-in-turn-1` |
| practice 7: `error CS0029: Cannot implicitly convert type 'void' to 'bool'`; without `bool finished =` it runs | `a-method-that-returns-nothing-1`; probe `pp-show-score-fixed` |

## Once the page UI exists

The porter's list, checked on 28 September 2026:

- **The typed lines.** The page and the browser checker show each typed
  line after its prompt. Nothing in the prose quotes a line with a prompt
  in it.
- **Random output.** Settled: see "What the move changed".
- **Download project.** Checked: see "What the browser showed". The
  project name is long, as the porter expected
  (`FromCellsToAProgramOnePlaceToStartMain1Program`), and the prose does
  not quote it.
- **The Visual Studio steps** still need a lab PC (see "Open").
- **Labels.** Each types cell shows its kind, *types*, and its file,
  `Cipher.cs`, `Game.cs` or `Test.cs`; each program cell shows *program*
  and `Program.cs`.

## Open questions

The porter's eleven questions, with what was decided on 28 September 2026
and what decided it. Four stay open for Josh, under "Open" below.

1. **Random output and the browser checker.** *Decided by the playbook*
   ("run the checker until it passes without `--write`"; don't change the
   checker or the format to make a lesson pass) *and the course map's
   principles* ("`Random.Shared` is for games the reader plays"): Release
   1 writes its shift into the code, and Release 2's menu has no `stdin:`,
   the shape `finding-things` chose for its guessing game. The porter's
   (a), a format change, was not open to this move, and (b), `new
   Random(42)`, would give every learner the same shift in the game they
   play. See "What the move changed". It departs from the course map
   entry's "Three releases of Codebreaker, with `Random.Shared`" for
   Release 1 (see "Open").
2. **`null` at the Message prompt.** *Decided by the style guide's
   `#voice` ("Invite, and wait") and the page's own review checklist:*
   the recap cells stay short, and the page now names the gap and asks
   about it, after Release 2's `guess != null &&`: "What do you think
   happens there if you choose 1, and then press **End input** at
   `Message:`? Run one of them and see." The reader meets *it stopped
   with an exception* on a cell they chose to test, and the checklist
   question about `null` has an example on the same page.
3. **`FirstValid` returns a position.** *Decided: keep.* The `inputs`
   table shows what a method returns (`docs/LESSON_FORMAT.md`,
   "solution and inputs"), so a Try method's rows would show only `true`
   or `false`; -1 for "none" is the convention of `LinearSearch` on
   `finding-things`, which the task names; and PDP has no `int?`.
4. **`TryAskShift` is written twice.** *Decided by the course map:* its
   entry names two files for the coder ("a `static class Cipher` in a
   types cell (`Cipher.cs`), and the menu into `Program.cs`"), and its
   principles say "a solution brings its own copies of the methods it
   needs" because a method in a program cell belongs to that cell. The
   prose says why it is written again.
5. **Long cells.** *Decided in part:* cells of 16 to 27 lines stay
   (`your-turn-1` 21, `three-releases-of-a-small-game-2` 22,
   `a-loop-that-waits-for-quit-1` 25, `one-place-to-start-main-1` 26,
   `asking-until-the-answer-makes-sense-1` 27; practice 1 25, 3 19, 4
   20). The exemplar `objects-and-classes` has cells of 16, 17 and 21
   lines, most of the length is braces on their own lines (the style
   guide's `#code`), and `when-it-goes-wrong` kept cells of this length.
   The two longest are under "Open".
6. **The `Test` class is copied.** *Decided:* checked against
   `building-reusable-tools` (lines 293 to 306), word for word, and the
   prose now says "word for word", as `when-it-goes-wrong` does. Keeping
   copies of a class in step is the course map's open question 2, not a
   question for this page.
7. ***Reading input* is not written yet.** Open: see below.
8. **Opening the project.** *Decided by the pages in `lessons/`:*
   `a-program-of-your-own` now opens the `.sln`, as this page,
   `when-it-goes-wrong`, `the-tools-around-your-code` and the ZIP's
   `README.txt` do. One wording already.
9. **The namespace paragraph.** *Decided: keep it here.*
   `the-team-project`, in `lessons/`, says that this page "gives the steps
   to open a project, run it, and add a file to it", so the team's first
   file relies on it. The message was checked in the browser engine
   (probe `p-program-without-using`).
10. **`bool` prints as `True`.** *Decided by `making-decisions`,* which
    says "C# prints a `bool` with a capital letter, though the code writes
    `true`": practice 2's note now says so in one sentence, with a link.
11. **New cell ids.** *Decided: keep them all.* `-program` for the
    program under a types cell that keeps dewlab's id is decision 26;
    `docs/LESSON_FORMAT.md` ("Cell ids") gives a new id to a new task;
    `three-releases-of-a-small-game-check` follows `when-it-goes-wrong`'s
    `the-dangerous-kind-check`. `one-place-to-start-main-1` keeps `main`:
    C# has a `Main` too, which the section names, so decision 28 (ids
    that name Python) does not apply. No class has used the page yet.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **A game with a random shift, and the checker** (question 1). This page
  now does what `finding-things` did: no `stdin:` where the output
  depends on chance, and a fixed shift in Release 1, which departs from
  the course map entry's "Three releases of Codebreaker, with
  `Random.Shared`". `finding-things` asked for a numbered entry in
  `DECISIONS.md` ("a cell whose output depends on chance has no `stdin:`,
  and stops at `null`", or an `output: varies` header); this page is a
  second case, and the first where the random part is printed before any
  input, so `stdin:` alone could not have fixed it. `DECISIONS.md` and
  the course map were not changed here.
- ***Reading input* is not written yet** (question 7). The recap assumes
  what the course map says it teaches: `Console.Write` prompts,
  `int.TryParse` with `out`, a `do`...`while` menu round a `switch`, 9 to
  quit, and `null` at **End input**. `a-program-of-your-own`'s starter
  has that menu, so the recap's "a different shape" holds for a reader
  who has done that page. When `reading-input` is written, check the
  recap, the `switch` cell and the two italic *Reading input* names
  against it, and make them links. If its menu uses `while (true)` with a
  `switch`, it has the bug that practice problem 1 shows.
- **The two longest cells** (question 5):
  `one-place-to-start-main-1-program` (43 lines, 22 of them
  `TryAskShift` and its XML comment) and Release 2's menu (30). A whole
  program is the point of the section: the top of `Program.cs` reads
  like a plan. A third file, `Ask.cs`, would take `TryAskShift` out of
  both the coder and the "Asking until" cell, but the course map names
  two files for the coder. Keep, or add `Ask.cs`?
- **The Visual Studio steps, on a lab PC.** The downloaded project builds
  with no warnings and prints what the page prints, and the frame name
  `Program.<Main>$` is what .NET reports. Nobody has checked in Visual
  Studio that the Call Stack shows it in the form step 7 gives, that
  **Add** > **Class** writes a namespace in this project, that Ctrl+Z then
  Enter ends the input in its console window, or the exact CS8802 message
  (from `dotnet build` only: no page cell can have two files with
  statements). It needs Windows.

## Probes

Each cell below checks a claim in the prose that no page cell prints, or
the challenge. The porter ran them with the native checker in `drafts/`.
On 28 September 2026 they were run again in the browser engine, in a
scratch lesson made from this section (`node tools/check-lessons.mjs
--lessons <scratch>/lessons --write`, `docs/TRANSLATING.md`, "The
checker"), and each printed what the native checker had, apart from the
coded words, which are random. The cell with `expect:` fails on purpose.
None of them is part of either page. Six probes were added in the move,
at the end of this section.

Results in the browser, 28 September 2026:

| Probe | Printed |
|---|---|
| `p-challenge` | the menu, then `Goodbye.` (no input) |
| `p-menu-ends-at-choose` | the menu, then `Goodbye.` |
| `p-menu-ends-at-message` | `NullReferenceException`: *Object reference not set to an instance of an object.* |
| `p-coder-ends-at-message` | the menu again, then `Goodbye.` |
| `p-coder-ends-at-shift` | `Please type a whole number from 1 to 25.`, the menu again, `Goodbye.` |
| `p-release-1-otter` | a random code, `No: it was OTTER` |
| `p-release-2-ends-at-answer` | a random code, `No: it was OTTER`, `Goodbye. 0 of 1` |
| `p-shift-range` | `smallest 1, largest 25` |
| `p-random-word` | `True` |
| `p-small-letters` | `abc`, `Ptter` |
| `p-release-2-typed` (new) | a random code, `Yes!` for `otter`; `No: it was HERON` for `BADGER`; `You have read 1 of 2` |
| `p-release-1-fixed-otter` (new) | `Decode this: RWWHU`, `No: it was OTTER` |
| `p-nullable-cs8600` (new) | `True`, and warning CS8600 at (2,17): *Converting null literal or possible null value to non-nullable type.* |
| `pp-show-score-fixed` (new) | `You have read 1 of 2` |
| `p-program-without-using` (new) | CS0103 at (1,13): *The name 'Game' does not exist in the current context* |
| `p-program-with-using` (new) | `OTTER`, `True` |

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

### Probes added in the move

Release 2's menu with dewlab's typed answers, which the page cell no
longer has, and Release 1 as it now is, with `otter`.

```csharp exec
id: p-release-2-typed
stdin: "1\notter\n1\nBADGER\n2\n9\n"
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
    else if (choice == "2")
    {
        Console.WriteLine($"You have read {score} of {rounds}");
    }
    else
    {
        Console.WriteLine($"There is no choice {choice}");
    }
}
Console.WriteLine("Goodbye.");
```

```csharp exec
id: p-release-1-fixed-otter
stdin: "otter\n"
string word = "OTTER";
int shift = 3;
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

The warning a project from Visual Studio's template shows: the page has
nullable reference types off, and `#nullable enable` turns them on for
one file.

```csharp exec
id: p-nullable-cs8600
#nullable enable
string choice = Console.ReadLine();
Console.WriteLine(choice == null);
```

Practice 7, with `bool finished =` and the last line deleted.

```csharp exec
id: pp-show-score-fixed
static void ShowScore(int score, int rounds)
{
    Console.WriteLine($"You have read {score} of {rounds}");
}

ShowScore(1, 2);
```

`Game.cs` as Visual Studio's **Add** > **Class** writes it, with the
round inside. It was run in a scratch lesson of its own, so that its
`Game` does not meet the `Game` above.

```text
id: p-game-in-namespace
file: Game.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace two
{
    internal class Game
    {
        public static bool PlayRound(string word)
        {
            Console.WriteLine(word);
            return true;
        }
    }
}
```

```text
id: p-program-without-using
expect: CS0103
bool read = Game.PlayRound("OTTER");
Console.WriteLine(read);
```

```text
id: p-program-with-using
using two;

bool read = Game.PlayRound("OTTER");
Console.WriteLine(read);
```

