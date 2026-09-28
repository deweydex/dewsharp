# Notes: a-front-end-for-a-class

Ported from dewlab `tutorials/a-front-end-for-a-class/` (the tutorial, its
practice page and its glossary file, all version 2026.09.26.1). Written on
27 September 2026 against dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1),
`DECISIONS.md` (to entry 39), and the entry for this page in
`planning/COURSE_MAP.md` (FOOP lesson 21, batch 10, "adapt", shape
tutorial, size L, worlds game, solar system and your own, covers
FOOP-LO11, FOOP-LO4 and FOOP-LO5). It follows the drafts of the pages
before it in the series, above all `documenting-a-class`, whose class
chain it continues, and `testing-what-a-class-does`, whose `Test` class
the practice page copies.

Status: written in one run on 27 September 2026, in
`drafts/lessons/a-front-end-for-a-class/`. Moved into
`lessons/a-front-end-for-a-class/` on 28 September 2026, run in the
browser checker, and reviewed against `docs/TRANSLATING.md`'s checklist and
the style guide. `npm run check-lessons -- a-front-end-for-a-class
a-front-end-for-a-class-practice` reports no problems. (Until
`your-world-playable` moved into `lessons/`, during the same run, it
reported the link to `lesson:your-world-playable`, and nothing else.)
What the move changed is in "Review: what changed in the move",
below. The sections after it describe the draft; each point the move made
stale is marked *(Stale: ...)*.

Files:

- `lessons/a-front-end-for-a-class/a-front-end-for-a-class.md`: the
  tutorial, version 2026.09.28.1. 23 `csharp exec` cells: 7 shared (2
  types cells, 5 program cells), 6 in the game world (4 types cells, a
  program cell meant not to compile at first, and an empty menu cell), 6
  in the solar system (the same shape), and 4 empty cells in your own. A
  reader sees 13 cells in the game or the solar system, 11 in their own
  world. 2 predicts, 4 hints, 4 solutions (no `inputs`), 1 answer fold, 1
  fence of code to read (`Form1.cs`), 1 challenge.
- `lessons/a-front-end-for-a-class/a-front-end-for-a-class-practice.md`:
  the practice page, version 2026.09.28.1. 8 problems, 6 exec cells (2
  types cells, 4 program cells), 1 predict, 3 hints, 3 solutions, 1
  `inputs` block, 6 folds (one holds a `csharp` fence to read).
- `lessons/a-front-end-for-a-class/a-front-end-for-a-class.outputs.json`
  and `a-front-end-for-a-class-practice.outputs.json`: what the browser
  checker recorded (22 and 9 runs).
- `planning/notes/a-front-end-for-a-class.md`: this file (it was the
  draft's `NOTES.md`). The draft's `*.native.json` files were deleted in
  the move. The probe cells at the end are the draft's native probes, and
  one more (P8); all of them were run again in the browser (see
  "Probes").

## Review: what changed in the move

- **Every cell ran in the browser engine**, and each recorded output is
  the same as the native checker's, line for line, with three differences
  that come from the browser and that no prose quotes: each typed line is
  echoed after its prompt (`What now? look`, then `Ada (health 10)`); each
  `Console.Clear()` in `a-menu-to-choose-from-2` is recorded as a form
  feed, `\f`; and the inputs table of practice problem 2 names the
  exception `FormatException`, where the native checker wrote
  `System.FormatException`. Culture made no difference: the page prints no
  decimals, money or dates. No cell stopped with an exception, so no stack
  trace is quoted, and no cell compiles with a warning, so none travels
  down the page.
- **Every number and quoted output in the prose now comes from a recorded
  output** (decision 29). The draft took three from native probes:
  - The solar system's test program, `your-class-8-program--solar-system`,
    and its solution end with two more lines: `philae.Land();` and
    `Commands.RunChoice(philae, "status");`. The recorded last line is
    `Philae (fuel 50 kg) | can burn 10 kg: False`, and the solution note
    quotes it: 50 kg in the tank, and still no burn, because a lander runs
    its own `CanBurn` (was probe P1). The prose above the cell says what
    the program does. The cell now fails with two CS0117 messages (lines 6
    and 10), so the task's paragraph says "the first message says".
  - *A loop that asks* no longer quotes `Not a command:` for `null`. It
    says that `RunChoice` would answer `null` as it answers any text it
    does not know, return `true`, and ask again (probe P4, true in the
    browser too).
  - Practice problem 5 no longer quotes `Refused: Juno cannot burn 10 kg
    now.`, which no cell on the practice page prints (probe P2). The fold
    says that when Juno's fuel is gone, its own `Burn` refuses and prints
    why. dewlab's fold had no quote either.
- **Claims with no number, checked in the browser**: P3 (a character who
  is down is not healed), P5 to P7 (the challenge), and a new probe, P8:
  with `Console.Clear();` moved to the first line inside the loop, the
  result of each command is printed and then cleared before Ada's health
  and the menu, as the fold says. In the page itself (headless Chromium,
  `npm run serve`'s server with `--isolate`, 28 September 2026):
  `a-loop-that-asks-1`, given `look` and then **End input**, ends with
  `Goodbye.`; `a-menu-to-choose-from-2`, given `2`, shows the attack's
  result, `Ada (health 3)` in red (`--ds-con-Red`) and the menu, and
  nothing from before the clear; **End input** then ends it with
  `Goodbye.`.
- **Links** (decision 32, and the move's list of pages): every page the
  draft named in italics that is in `lessons/`, or moves in this batch, is
  a link by its short title: Documenting a class (three times in the
  lesson, once in the practice page), Testing a class (both pages),
  Inheritance (practice 8, and the window's new bullet), Your world,
  playable (in the "Next" paragraph; it moved into `lessons/` during this
  run, and the link resolves), and, new, Designing classes (where `enum` is recalled).
  The practice page links back to the lesson in problem 1. *Reading
  input* and *Namespaces and class libraries* stay in italics: neither is
  in `lessons/` nor in this batch. Same-page sections stay in italics, as
  in the exemplar (*Printing an object*, above).
- **What belongs in Visual Studio** is said in one place, before the
  window, in the words `documenting-a-class` and
  `the-tools-around-your-code` use: "Everything above this part runs
  here, in the browser. The rest of this page needs a computer with
  Visual Studio. If you are not at one now, this is a good place to stop,
  and to return to later." The paragraph after it says the window also
  needs Windows. Both Visual Studio sections now start with **Download
  project**, the button's own name, and step 1 of the window says how to
  unzip, as `the-tools-around-your-code` does.
- **Terms defined where first used**, added: `null` is recalled where the
  loop leans on it ("C#'s value for *nothing here*"); *enum* is defined
  again in one line, with a link to *Designing classes*, where it first
  appeared; the window's code gets a fourth bullet, "Visual Studio wrote
  the first lines", for `Form1 : Form` (a child class of `Form`),
  `partial` (the class continues in `Form1.Designer.cs`),
  `InitializeComponent()` and the namespace line; **Release** gets one
  sentence; and the practice hint says what `out` is ("a variable that
  `TryParse` sets").
- **Plain words**: "Grog hits back" and the predict note "hits back for 2"
  became "then Grog hits Ada" and "then hits Ada for 2", and the code
  comment `// a monster that is down cannot hit back` (three copies)
  became `// ... cannot hit the hero`. The heading "Deciding, kept apart
  from asking" became "Deciding, separate from asking" (its cell ids keep
  `kept-apart`: an id is a contract), practice problem 3's heading became
  "Why keep them separate?", and practice 7's note says "separate from".
  "puts every version of your class together" became "makes one program
  from every version of your class". Practice 2's note said `TryParse`
  "never stops"; it now says it "never stops the program: for text that
  is not a whole number, it returns `false`". Practice 4's fold said that
  in C and Java "this menu would run"; C cannot `switch` on text, so it
  now says "a menu like this one", after saying what those languages do
  without `break`.
- **Folds**: the practice page's three "one answer" folds (problems 3, 5
  and 6) now open with the format's line, *Here is one answer. Yours may
  be different and work too.* (`docs/LESSON_FORMAT.md`, "Folds", and the
  exemplar's practice page). Problem 3's fold was "answer"; its question
  has more than one answer, so it is "one answer" now.
- **Ids**: on the practice page, `four-commands-commands` became
  `four-commands-1` (the types cell) and `four-commands-1` became
  `four-commands-1-program`. dewlab's `four-commands-1` held both the
  method and the program, and decision 26 gives the dewlab id to the
  types cell. No class has used the page, so nothing is lost.
- **`version:`** is `2026.09.28.1` on both pages: cells changed (the solar
  program, the code comments) and ids were renamed.
- **The class chain** was checked by script against
  `lessons/documenting-a-class` as it stands now: `the-game-so-far` and
  the three "so far" cells in each world are identical, comments
  included, to the classes in the solutions of
  `your-class-7-program--game` and `your-class-7-program--solar-system`.
  The practice page's `Test` is identical to the testing page's
  `ten-lines-that-run-every-test-runner` and to its practice page's
  `the-test-class`.
- **Looked at in the page** (headless Chromium, 28 September 2026), in
  each world: the kind labels (TYPES for the two shared types cells and
  each world's four, PROGRAM for the rest, empty for the menu cells and
  your own), the files (`Character.cs`, `Commands.cs`, `Healer.cs`,
  `Room.cs`, `Probe.cs`, `Lander.cs`, `Mission.cs`, `Test.cs`), and every
  `lesson:` link, each of which answers. No page errors.
- **The two downloads the Visual Studio sections start from** were built
  outside the page: the files that `projectFiles` (`web/page/project.js`)
  writes for `deciding-kept-apart-from-asking-1-program` and for
  `a-menu-to-choose-from-2` (the program, `Character.cs`, `Commands.cs`,
  `IrishCulture.cs` and the `.csproj`), assembled by a script, not by the
  page's button. With .NET SDK 10.0.401 both build with 0 warnings and 0
  errors, and print what the page recorded (the menu read its choices
  from standard input). `dotnet publish` on the second writes
  `bin/Release/net10.0/publish`, as step 5 says. The world cells are all
  below both targets, so the download is the same in every world.
- **Microsoft Learn**, fetched again on 28 September 2026: the Windows
  Forms tutorial still says to type `winforms`, to choose
  **.NET 10.0 (Long Term Support)**, and that double-clicking a button
  writes `private void btnAdd_Click(object sender, EventArgs e)`; F5 runs
  the app. The three addresses under "Where to read more" answer with
  HTTP 200, and YouTube's oEmbed still gives the video's title.
- **Not changed, and not this move's to change**: `courses/foop.yaml`
  still has `a-front-end-for-a-class` under `planned:` (line 93). The
  playbook's checklist says to delete that line when a lesson moves, and
  the course page uses the lesson's own title from then on.

## How it was checked

*(The draft's checks, with the native checker, on 27 September 2026.
The move's are in the review above.)*

- **NativeCheck** on both lesson files and on this file: **No problems.**
  No cell compiles with a warning, so no warning travels down the page
  (`DECISIONS.md` 30). The two world program cells stop with CS0117, as
  their `expect:` says, and practice problem 4 with CS0163.
- **`web/lesson/parse.js`** reads both files with no errors: 23 and 6
  cells. Each predict, hint, solution and `inputs` block is attached to
  the cell intended, and the `stdin:`, `expect:` and `file:` headers read
  as written.
- **The class chain.** The seven cells that hold the seventh version (the
  shared `the-game-so-far`, and the three so-far cells in each world) were
  compared by script with the classes in the two world solutions of the
  `documenting-a-class` draft: all seven are identical, comments included.
- **The window.** `Form1.cs` as the page shows it was compiled in a scratch
  Windows Forms project (`dotnet new winforms`, .NET 10, with
  `EnableWindowsTargeting` so that it builds on Linux), with the page's
  `Character.cs` and `Commands.cs` added and a hand-written
  `Form1.Designer.cs` holding the four buttons and the label under the
  names in step 4: 0 warnings, 0 errors. It was not run: Windows Forms
  needs Windows. The project was in the scratchpad, and is not part of the
  draft.
- **Microsoft Learn**, fetched on 27 September 2026, for the Visual Studio
  steps: *Create a Windows Forms app tutorial* (the template search word
  `winforms`, "Don't select the Windows Forms App (.NET Framework)
  template", **.NET 10.0 (Long Term Support)**, **View** > **Toolbox** and
  **Properties Window**, the handler's first line
  `private void btnAdd_Click(object sender, EventArgs e)`, F5 to run);
  *Publish a .NET console application* (Release, right-click the project
  and not the solution, **Folder** twice, **Finish**, **Close**,
  **Publish**, `bin/Release/net10.0/publish`, a framework-dependent app
  needs .NET installed, `dotnet publish` on other systems); and *.NET
  application publishing overview* (**Show all settings**, **Deployment
  Mode**, **Self-contained**, which needs no .NET installed). The
  CrashCourse video's title was checked through YouTube's oEmbed; its
  length was not, so the page no longer gives one.

## What changed from the Python page, and why

**Frontmatter.** `year:` goes. The per-section `covers:` becomes
`[FOOP-LO11, FOOP-LO4, FOOP-LO5]`, as in the course map. The worlds are
the game, the solar system and your own, with the sentences the earlier
FOOP drafts use; the ocean goes (`DECISIONS.md` 13). dewlab's glossary had
five entries. *Front end* and *input validation* are defined in the prose
where they first appear, as before. *Widget*, `text_input()` and
`dropdown()` go with the widgets (see "A menu to choose from"). The page
defines its new terms where they appear: *window*, *Windows Forms*,
*designer*, *publish* and *deploying*.

**Links.** The task text asked for `[text](lesson:<id>)` links to other
lessons. `DECISIONS.md` 32 and 39, `docs/LESSON_FORMAT.md` and the
checklist in `docs/TRANSLATING.md` say that the checker refuses a
`lesson:` link to a page that is not in `lessons/`, and that a page not
written yet is named by its short title in italics. Only `first-steps`
and `objects-and-classes` are in `lessons/`, so every other page is named
that way: *Documenting a class*, *Testing a class*, *Reading input*,
*Inheritance*, *Namespaces and class libraries* and *Your world,
playable*. The one link is to this page's own practice page, which moves
into `lessons/` with it, as in the `documenting-a-class` draft. See open
question 1. *(Stale: the move links every page that is in `lessons/` or
moves in its batch; see "Links" in the review.)*

**The opening.** dewlab's first cell included `game-7.py` and printed
nothing. Here `the-game-so-far` is a types cell holding the seventh
version of `Character` (with its comments), and the reader presses Check.
The style guide asks a page to open by running something, so a new
program cell, `a-program-only-its-author-can-use-1`, plays a short fight
as code: the three calls dewlab's next section names in prose
(`grog.TakeDamage(3)`, a print, `ada.Heal(2)`). It prints
`Ada (health 8) | Grog (health 5)` and `Ada (health 10)`. The question
under it ("Can you change it so that Ada attacks twice...? What did you
need to know?") sets up the section's point. Only `Character` is in the
shared cell: the shared cells use nothing else, and dewlab's `Healer` and
`Room` are in the game world's own cells below.

**A program only its author can use.** dewlab's two paragraphs, in C#.
"On this page we build two" becomes two front ends and a third, a window,
in Visual Studio.

**Deciding, kept apart from asking.** The course map's first note:
`RunChoice` takes the command as text and never reads input, and a
program cell tests it with an array. The main change is where
`RunChoice` lives. In dewlab it was a function in a cell, and every cell
below could call it. In C#, a method written in a program cell belongs to
that cell, so the test, the loop and the menu would each need a copy.
Here it is a `static` method of a `static class Commands` in a types cell
(`Commands.cs`), and every cell below uses it (rule 2). That is also the
shape the reader's world task, the window and *Your world, playable* need.
`static` is explained in one sentence, pointing back to `Test.Check` on
*Testing a class*. `RunChoice` has a documentation comment, because the
course map says the pages after `documenting-a-class` keep XML comments
on every method they add. Its comment includes the unknown-command
promise; practice problem 6 is changed to fit (see below). One `//`
comment says why the monster's hit back is inside the `if`.

*(Stale: the heading is now "Deciding, separate from asking"; the ids
keep `kept-apart`.)*

dewlab's cell becomes two, by `DECISIONS.md` 26: the types cell keeps the
dewlab id, `deciding-kept-apart-from-asking-1`, and the program is
`deciding-kept-apart-from-asking-1-program`, with the predict. The
predict is dewlab's, word for word; the course map says it stays. The
list of commands is a `string[]`, and `still playing:` prints `False`,
which one sentence explains (as `documenting-a-class` does for `True`).

**A loop that asks.** The course map's second note: `ReadLine` in a
`do`...`while`, with no stand-in. dewlab's code to read (`while` with
`input()`) and its `typed` list with `ask()` both go; one real cell,
`a-loop-that-asks-1`, keeps dewlab's id, with dewlab's typed answers as
its `stdin:` (`look`, `attack`, `fly`, `quit`). `do`...`while` is named
with a pointer to *Reading input*, and why it fits: the player is always
asked at least once.

New: the loop treats `null` from `ReadLine` as `quit`. On the page,
**End input** makes `ReadLine` give `null`, and so does a page without
cross-origin isolation once the answers typed in advance run out
(`docs/ARCHITECTURE.md`, "Input"). Without the check, `RunChoice(null)`
prints `Not a command: `, returns `true`, and the loop never ends (probe
P4). The course map's entry for `reading-input` says its menu "copes
with" `null`, and the `a-program-of-your-own` draft's menu does too
(`choice != null` in its condition). This page's loops keep
`RunChoice`'s `bool`, so the check is an `if` that turns `null` into
`quit`, with a `//` comment saying why. The input validation paragraph
is dewlab's; "cannot fix it" became "cannot change it". *(Stale: the
prose no longer quotes `Not a command:` for `null`; see the review.)*

**A menu to choose from.** dewlab's second front end was a `dropdown`
widget in two cells: one started a game, the other played one turn per
run. dewsharp has no widgets, and each Run is a new program, so the
course map makes it "a numbered menu with a `switch`, `Console.Clear()`
between turns and a colour for the hero's health". Two cells:

- `a-menu-to-choose-from-1`: the numbered menu, a `do`...`while` round a
  `switch` on the typed text, in the shape the course map gives
  `reading-input`. Each `case` calls `RunChoice` with one command, which
  is how a window's buttons will work later. `case null:` shares the path
  of `case "4":` (quit), and `default` answers anything else with
  `Choose 1, 2, 3 or 4.`. `switch`, `case`, `default` and `break` are
  recalled in one sentence each, pointing to *Reading input*.
- A new predict on it: the reader types the word `attack`, not a number.
  It prints `Choose 1, 2, 3 or 4.`: the word never reaches `RunChoice`.
  This is where the page's input validation point changes most (below),
  and it is the kind of thing a reader would not expect, so it earns one
  of the style guide's two or three guesses.
- dewlab's paragraph "A menu also changes what input validation has to
  do" is rewritten: a console menu cannot stop a player typing `fly`, but
  its `default` answers it before `RunChoice` sees it. The point that a
  front end which makes a mistake impossible is kinder moves to the
  window, which has no button for `fly`.
- dewlab's paragraph about the cell's Run being the Go button (Pyodide
  in the background) has no C# meaning, and goes. The window section
  answers "a program on your own computer can have a button".
- `a-menu-to-choose-from-2`, under a new subheading, "Colours, and a
  clean screen": the same menu with `Console.Clear()` after each choice
  and Ada's health in green, or red at 3 or less, with
  `Console.ForegroundColor` and `Console.ResetColor()`. `ConsoleColor` is
  named as an `enum`, which *Designing classes* introduced. Ada starts
  with 5 health, so that one attack shows the red (the check prints
  `Ada (health 3)` after one attack). The colour could be written in
  fewer lines with `?:`, which no page has taught, so it is a green
  default and one `if`. An invitation to move `Console.Clear()` to the
  top of the loop, with a fold: the result of each command would be
  cleared before anyone reads it.

The page says why colours and the clear screen are in the front end's
code and not in `RunChoice` or `Character`.

**Your turn: your class, eighth version.** Each world has:

- three types cells with the seventh version, copied exactly from the
  `documenting-a-class` draft's solutions (`your-class-8-so-far--<world>`
  for the parent class, as dewlab's id; `-healer`, `-room`, `-lander` and
  `-mission` for the others, as the `objects-inside-objects` draft names
  them);
- `your-class-8--<world>`, a types cell holding `static class Commands`
  with a class comment and no `RunChoice`: the reader's work, under
  dewlab's id (`DECISIONS.md` 26). It replaces the shared `Commands`
  (rule 4), and the prose says so;
- `your-class-8-program--<world>`, the test with an array, dewlab's
  commands and objects. It does not compile until the reader writes
  `RunChoice`: CS0117, `'Commands' does not contain a definition for
  'RunChoice'`, which names the method to write (`DECISIONS.md` 27; the
  decision names CS1061 and CS0246, and CS0117 is the same idea for a
  `static` method). The prose says it is meant to fail. The hint is
  dewlab's, `after: 2 errors`, since the first error is by design. The
  solution writes `Commands` again below its statements (rule 4), with a
  full documentation comment;
- `your-class-8-menu--<world>`, new: an empty cell for the menu, with
  `stdin:` for the checker, a hint (`after: 2 runs`) and a solution that
  brings its own `Commands`. dewlab put the menu in the solution's note
  as two lines of code to read. In C# the menu is a whole loop, and it
  is the eighth version's front end, which *Your world, playable* builds
  on, so it gets a cell.

Game: dewlab's `run_choice(hero, healer, monster, choice)`. The solution
note keeps dewlab's summary, with `Ada (health 10)` after Mira's heal,
and adds that `HealOther` calls Ada's own `Heal`, so her rules still hold
(probe P3). Solar system: dewlab's `run_choice(probe, choice)`, with a
`Lander` so that `CanBurn` is the lander's own (`virtual` and
`override`); dewlab's point that `status` says `False` after `Land()` is
probe P1. *(Stale: the test program now lands Philae and asks for the
status, so the `False` is recorded; see the review.)* The solar menu's `stdin:` burns five times, so its recorded
output shows the probe's own refusal, `Refused: Philae cannot burn 10 kg
now.`, which the solution note quotes: dewlab's ocean note said the same
of the hull limit. Your own: four empty cells, in the same order as the
other worlds, and dewlab's instructions.

**A third front end: a window** is new. The course map: "a Windows Forms
app with a button for each command, each calling the same `RunChoice`;
the page gives the steps and says it needs Windows". Seven numbered steps
(download the deciding program as a project, make a **Windows Forms App**
for .NET 10 and not the .NET Framework one, add `Character.cs` and
`Commands.cs` as existing items, four buttons and a label with names,
**View Code**, double-click each button, F5), then `Form1.cs` in full, to
read. Two problems had to be solved, and the page names both:

- The game must last between clicks, and a window has no loop the reader
  writes, so `ada` and `grog` are fields of the form. This is a FOOP
  point in its own right: a field lives as long as its object.
- `RunChoice` writes with `Console.WriteLine`, and a Windows Forms app has
  no console. `Play` sends the console's output into a `StringWriter`
  with `Console.SetOut`, and shows it in the label. The other choice was
  to change `RunChoice` to return text, but then the page's point ("no
  change at all") would not hold.

The section ends with a question (a fifth button). The page says that it
needs Windows, and that a reader with no Windows computer at home has the
console menu as a front end and can build the window in class (the course
map's teacher note).

**Giving your program to someone** is new: the course map's
"Deploying: publishing the console app to a folder gives a program
someone can run without Visual Studio". It defines *publish* and
*deploying*, then gives six steps from Microsoft's tutorial for the cell
with colours, which shows the colours and the clear screen in a real
console window. One paragraph says the friend's computer needs .NET 10,
and that **Deployment Mode** set to **Self-contained** puts .NET in the
folder. One sentence gives `dotnet publish` for a Mac or Linux.

**Looking back and the challenge.** The question is dewlab's, with "a
list" as "an array". The challenge is dewlab's (`Attack`, ` attack `,
`ATTACK`), with `Trim()` and `ToLower()` in place of `.strip()` and
`.lower()`, and one sentence on strings that cannot be changed: each
method returns a new string (the course map's "immutable strings"). Its
starter reads real input, since it opens in the notebook, where the
reader types. It copes with `null` like the page's loops, so a run with
no input ends. As given, the three typed commands print `Not a command:`
three times (probe P5); with `choice.Trim().ToLower()`, all three attack
the troll (probe P6).

**Next.** dewlab's next page was `your-world-playable`. In dewsharp's
FOOP, `namespaces-and-libraries` comes between them (course map, lessons
21 to 23), so the page names both, in italics.

**Where to read more.** dewlab's first two entries were Python's
(*Automate the Boring Stuff*, chapter 8, and the Python tutorial's output
formatting). They are replaced by Microsoft's *Create a Windows Forms app
tutorial* and *Publish a .NET console application*, both on Microsoft
Learn, which the page's two Visual Studio sections follow. The
CrashCourse video on command line interfaces stays: it is about any
language. Its length ("about eleven minutes") is dropped, because it
could not be checked here.

**Wording.** The style guide asks for no phrasal verbs or idioms. Changed
from dewlab: "cannot fix it" (the player) became "cannot change it", and
"that mistake cannot happen at all" became a sentence about the window.
"Returns" replaces "gives back" everywhere, since the pages before use
it. The one phrasal form kept is dewlab's heading "Deciding, kept apart
from asking", which the course map also uses. *(Stale: the move changed
that heading, "hits back" and three more phrases; see "Plain words" in
the review.)*

## The practice page, problem by problem

dewlab's eight problems, in C#. Its `question` block becomes a cell meant
not to compile, as the course map says. The ocean goes.

1. **Four commands.** `Commands` with a one-parameter `RunChoice` in a
   types cell (`four-commands-commands`, new id), and dewlab's program in
   `four-commands-1`, with its predict. The list of results is a
   `List<bool>`, printed with `string.Join`, so the options read
   `True, True, False, True` as C# prints them. The fold adds why the
   `foreach` continues after `quit`. Problems 4, 6 and 7 use this class
   (rule 2), and the problem says so. *(Stale: the ids are now
   `four-commands-1` for the types cell and `four-commands-1-program`,
   by decision 26.)*
2. **Reading a number.** The course map: "becomes `int.TryParse`". The
   ocean's metres of dive become kilograms of fuel to burn. dewlab's
   function returned the number or `None`; the C# method returns `int?`,
   defined in one sentence as an `int` that can also be `null`. The other
   choice was the `TryParse` shape (`bool` and `out`), but an `inputs`
   line cannot show an `out` value, and all the inputs share one scope
   (`DECISIONS.md` 18), so `out int kg` in several lines would clash. The
   starter uses `int.Parse`, so "Compare with a solution" shows
   `FormatException` for `"ten"` and `""`, and `-5` where the solution
   gives `null`. The solution note says that `TryParse`, like `Parse`,
   accepts spaces at the ends: C# needs no `Trim()` here, where dewlab
   needed `.strip()`. The hint waits for runs (`after: 2 runs`), since
   the starter runs.
3. **Why keep them apart?** dewlab's question and answer, with a window
   added to the list of other front ends.
4. **What the menu does.** dewlab's fill-in-the-blank `question` about
   the dropdown has no dewsharp block, and the course map makes it a
   `switch` with a missing `break`. The menu uses problem 1's
   `RunChoice`; `case "2":` has no `break`. It stops with CS0163,
   `Control cannot fall through from one case label ('case "2":') to
   another`, and the problem says it is meant to fail. The hint asks a
   question (`after: 2 errors`). The solution adds the `break`, and runs
   with the cell's `stdin:`. The fold explains the rule, why
   `case "3": case null:` is allowed, and what C and Java would do with
   the same code (run on into `quit`), and ends with dewlab's first
   blank: each time round the loop, the menu asks once and plays one
   turn.
5. **A command that goes too far.** dewlab's submarine at its hull limit
   becomes Juno, a probe with 40 kg, burning 10 kg five times. The fold
   keeps dewlab's answer, and quotes the probe's own refusal (probe P2).
   *(Stale: the fold no longer quotes the refusal; see the review.)*
6. **From earlier: a promise for RunChoice.** dewlab asked what the
   docstring should say about an unknown command. The lesson's
   `RunChoice` comment already says it, so the question points at
   problem 1's comment instead, which says only what `RunChoice` runs
   and returns. The fold gives the full comment.
7. **From earlier: a test for a front end.** dewlab's answer was a
   two-line pytest function in a fold. Here the problem copies `Test`
   from the `testing-what-a-class-does` draft exactly (`Check<T>` and
   `RunAll`, as in its practice page), in a types cell
   (`a-test-for-a-front-end-test`), and gives a starter test with no
   checks in `a-test-for-a-front-end-1`. The page says that a test with
   no checks passes whatever `RunChoice` does; the cell prints
   `Tests run: 1. Passed: 1.` The solution has the two checks, and prints
   `Not a command: xyzzy` and the same last line.
8. **From earlier: one front end, every kind.** dewlab's fold, with
   `virtual` and the lander's override named. *Polymorphism* was defined
   on the `one-parent-many-children` draft, so the word stays.

## What C# made different, in short

- A method in a program cell belongs to that cell (rule 3's cousin), so
  the shared deciding code is a `static` method in a types cell, and the
  world tasks write `Commands` again (rule 4).
- Input is real. Each loop copes with `null` from `ReadLine`, which the
  page's **End input** gives, or a loop can run with no end.
- There are no widgets. The second front end is a numbered console menu
  with a `switch`, and a menu in a console cannot make `fly` impossible,
  so that point moves to the window.
- A window is a Visual Studio project, Windows only, and has no console,
  so `Console.SetOut` collects what `RunChoice` writes. The objects live
  in fields, because there is no loop the reader writes.
- Deploying is a real step: publishing to a folder, framework-dependent
  or self-contained.
- `bool` prints as `True` and `False`; an `int?` holds `null`; a `switch`
  path must end (CS0163); strings cannot be changed, so `Trim()` and
  `ToLower()` return new strings.

## What to revisit once the page UI or the browser checker exists

- **Typed input in the recorded output.** The native check does not echo
  what `stdin:` types: its output reads `What now? Ada (health 10)`. The
  browser checker echoes each typed line (`docs/ENGINE_API.md`), so the
  recorded output will read `What now? look`, then `Ada (health 10)`. No
  prompt line with a typed answer is quoted in the prose, so no sentence
  depends on which. *(Checked in the move: the browser echoes each typed
  line.)*
- **`Console.Clear()` and colours.** The native check runs them silently:
  no error, no form feed, no colour. The browser checker records `\f` for
  each clear (`docs/PARSER.md`), so `a-menu-to-choose-from-2`, and nothing
  else, will show one after each choice. Check on the page that the
  console clears, that Ada's line is green and then red, and that the
  fold's claim holds:
  with the clear moved to the top of the loop, the result of each command
  is gone before it can be read. The note in the native check about
  features it cannot run did not appear, since nothing threw. *(Checked
  in the move: `\f` is recorded; in the page the console empties, and
  Ada's line is red at 3; the fold holds, probe P8.)*
- **End input.** Check that pressing **End input** during
  `a-loop-that-asks-1` and both menus ends the game with `Goodbye.`, and
  that a page without cross-origin isolation (answers typed in advance)
  does the same when the answers run out. *(Checked in the move for
  `a-loop-that-asks-1` and `a-menu-to-choose-from-2`, on an isolated page;
  not on a page without isolation.)*
- **The two predicts on typed input.** The menu's predict asks what
  happens after the reader types `attack`. Check that the guess is shown
  beside the output in a way that makes sense when the reader has typed
  something else first. *(Not checked.)*
- **Empty menu cells with `stdin:`.** `your-class-8-menu--<world>` is
  empty at first and has `stdin:` only for its solution. Check that the
  page does not show an input box, or anything about `stdin:`, for an
  empty cell, and that "Compare with a solution" on an interactive cell
  is sensible (the reader's run asks for input; the solution's uses
  `stdin:`). *(Not checked in the page. The menu cells have no `inputs`
  block, so they have no comparison, and their solutions show as
  folds.)*
- **Hints after runs on an empty cell.** The menu hints use
  `after: 2 runs`; check that runs are counted once the reader has
  written code in the cell. *(Not checked.)*
- **Download project.** Step 1 of the window section downloads
  `deciding-kept-apart-from-asking-1-program`, and expects `Character.cs`
  and `Commands.cs` in the ZIP (`DECISIONS.md` 38). The publishing
  section downloads `a-menu-to-choose-from-2`. Check both, in both
  worlds, and that the game world's own `Character` copy (a later cell)
  does not change what the shared cells download. *(Checked in the move
  by assembling the files that `projectFiles` writes and building them;
  not through the button. The world cells are below both targets.)*
- **Visual Studio, for real.** The window steps and the publishing steps
  come from Microsoft Learn and from a build on Linux, not from a session
  in Visual Studio on Windows. Check each step, the names of the menu
  items, and that double-clicking a button writes `object sender` (the
  page's `Form1.cs` shows it that way, as Microsoft's tutorial does; a
  project with nullable warnings on may write `object? sender`).
  *(Still open: "Open", 4.)*
- **Forward links (batch rule 3).** When *Your world, playable* and
  *Namespaces and class libraries* exist, the "Next" paragraph becomes
  links, and `documenting-a-class`'s "Next" line should link here. The
  pages named in italics become links when they reach `lessons/`.
  *(Done in the move, for the pages in `lessons/` and in the batch;
  `documenting-a-class` already links here.)*
- **The class chain's eighth version** is `Commands` with `RunChoice`
  and the menu, in each world's solutions. `your-world-playable` copies
  it. Until the format has includes (course map, open question 2), a
  copy must be checked by hand, as above. *(See "The class chain: the
  eighth version".)*

## Open questions for a reviewer: what was decided

The porter's nine questions. Where the course map, the playbook, the style
guide or an exemplar answers one, the answer is here. The others are under
"Open", below.

1. **Links.** Decided, by decision 32 and the move's list of pages: a page
   in `lessons/`, or one that moves in this batch, is a link by its short
   title; any other page is its short title in italics. See "Links" in the
   review above.
2. **`Commands` as a `static class`.** Decided: keep. The course map's
   entry asks for a window whose buttons each call "the same `RunChoice`",
   and step 3 of the window adds `Commands.cs` to the project as a file.
   By the rules of the road a method written in a program cell stays in
   that cell, so the only way for the test, the loop, both menus and the
   window to share one `RunChoice` is a class in a types cell (rule 2).
   `testing-what-a-class-does`, in `lessons/`, already shares its `Check`
   this way (`static class Test`, "like `Math`: it holds methods, and no
   objects are made from it"), and this page points back to it. The rules
   of the road and that page cover the choice, so it needs no new entry
   in `DECISIONS.md`.
3. **`null` means quit.** Decided for this page: keep. The page has an
   **End input** button, and `web/help.html` says that `Console.ReadLine()`
   then gives `null`; without the check the loop would never end (probe
   P4), and in the page **End input** ends both loops with `Goodbye.`.
   Which shape the other pages with a menu use is under "Open", 1.
4. **`} while (...)`.** Not settled by a contract: "Open", 2.
5. **Size.** Decided: one page. The course map's entry names the window
   and publishing as parts of this page, and does not say where to split
   it. The standard line before the window ("this is a good place to
   stop") marks where a class can divide it over two sessions.
6. **The menu cells in each world.** Decided: keep. The page covers
   FOOP-LO11 (a front end), and without these cells the reader never
   writes a front end for their own classes on the page. The style
   guide's "worked, then completed, then your own" asks for that last
   step, and *Your world, playable* builds its console front end on the
   eighth version. Each menu cell has a hint and a solution that the
   checker runs with its `stdin:`.
7. **`int?` on the practice page.** No page in `lessons/`, and no entry
   in the course map, teaches `int?`: "Open", 3.
8. **Ids.** Decided: dewlab's ids where the task is the same
   (`the-game-so-far`, `deciding-kept-apart-from-asking-1`,
   `a-loop-that-asks-1`, `your-class-8-so-far--<world>`,
   `your-class-8--<world>`, `reading-a-number-1`); `a-menu-to-choose-from-1`
   and `-2` hold the numbered menus, as the course map's entry lists them;
   `what-the-menu-does-1` holds the `switch` that the entry makes of
   dewlab's `question`; `<id>-program` for a split cell, by decision 26,
   which renamed practice problem 1's cells (see the review). The world
   cells for the other classes follow `documenting-a-class`
   (`your-class-7-healer--game` there, `your-class-8-so-far-healer--game`
   here). Practice problem 7's cells (`a-test-for-a-front-end-test` and
   `-1`) have no dewlab cell to follow, since dewlab's answer was a fold,
   and the reader's work is in the program, as on
   `testing-what-a-class-does`'s `ten-lines-that-run-every-test-runner`
   and `-1`.
9. **Facts in the prose that no cell prints.** Partly decided. Checked
   here: the publish folder (`dotnet publish`), the Windows Forms steps
   against Microsoft Learn again, and the reading list's addresses. The C
   and Java sentence now claims only what those languages do without
   `break`. What Visual Studio itself shows is under "Open", 4.

## Open

For Josh. Each says what the page does now.

1. **One shape for `null` from `ReadLine` across the menus.** This page
   turns `null` into `quit` with an `if` in the loop, and the menus share
   the path of `case "4":` with `case null:`. The `a-program-of-your-own`
   draft, which moves in this batch, puts `choice != null` in the loop's
   condition instead. `reading-input`, which teaches `do`...`while`,
   `switch` and `TryParse` first, is not drafted. A reader would meet one
   shape more easily than two.
2. **`} while (stillPlaying);` or `while` on its own line.** This page
   writes `} while (...)`, as Microsoft's C# reference does (the `do`
   statement, *Iteration statements*, fetched 28 September 2026:
   `} while (n < 5);`). The style guide says "Put each brace on its own
   line, as Visual Studio does"; `dotnet format`, which uses the same
   formatter as Visual Studio, keeps both shapes, so it does not decide.
   The `a-program-of-your-own` draft puts `while` on the line after the
   brace. This is the first page in `lessons/` with `do`...`while`; one of
   the two should change.
3. **`int?` on the practice page.** Problem 2 meets `int?` for the first
   time, in one sentence ("an `int` that can also be `null`, which means
   *no number*"), so that the `inputs` table can show `null` for text
   that is not a number. The other choices were a sentinel such as `-1`,
   or the `TryParse` shape (`bool` and `out`) without an `inputs` block,
   since an inputs line cannot show an `out` value. If `reading-input` or
   `types-and-their-sizes` teaches `int?`, the problem can point to it.
4. **Visual Studio itself.** The window and publishing steps come from
   Microsoft Learn and from the .NET SDK on Linux, not from Visual Studio
   on Windows: the menu names (**View Code**, **Add**, **Existing Item**,
   **Show all settings**, **Deployment Mode**), what the designer writes,
   and the `.exe` in the publish folder were not seen. The Windows Forms
   template turns nullable reference types on, so the handler Visual
   Studio writes may read `object? sender`, where the page's `Form1.cs`
   shows `object sender`, as Microsoft's tutorial does; the reader writes
   only `Play("look");` inside it, so the steps work either way. The
   course map asks for steps "with pictures described in words"; there
   are none. Which Visual Studio the steps assume is the course map's
   open question 11.
5. **`courses/foop.yaml`** still lists `a-front-end-for-a-class` under
   `planned:` (line 93). It should go now that the lesson is in
   `lessons/` (the playbook's checklist); this move was not allowed to
   edit the course files.
6. **The eighth version in `your-world-playable`** (compared by script,
   28 September 2026): its game cells (`Character`, `Healer`, `Room`,
   `Commands`) and its solar system's `Probe`, `Lander` and `Mission` are
   identical to this page's. Its solar `Commands`
   (`your-world-running-commands--solar-system`) has the same code, but
   different documentation comments ("burn uses 10 kg, refuel adds 20
   kg, ...", "as the player typed it", "false when the mission is over")
   and one more `//` comment above `status`. The course map says the next
   page copies the class exactly, so that page's copy is the one to
   change; this move was not allowed to edit it.

## The class chain: the eighth version

`your-world-playable` copies it. In each world it is the seventh version
(the three "so far" cells here, unchanged from `documenting-a-class`), and
`Commands` with its `RunChoice`, as in the solution of
`your-class-8-program--<world>`; the numbered menu is the solution of
`your-class-8-menu--<world>`. Until the format has includes (course map,
open question 2), a copy must be checked by hand.

## Where each number and message in the prose comes from

Every source is a recorded output in
`lessons/a-front-end-for-a-class/*.outputs.json`, except the claims marked
"probe", which quote no output and were run in the browser (see
"Probes").

| Number, message or claim | Source |
|---|---|
| the third line `Ada (health 8) \| Grog (health 5)`; `Not a command: dance`; `still playing: False` | lesson cell `deciding-kept-apart-from-asking-1-program` |
| **End input** ends the loop (no number quoted) | the page, headless Chromium; probe P4 for the loop without the `if` |
| typing `attack` in the menu prints `Choose 1, 2, 3 or 4.`, then the menu again | lesson cell `a-menu-to-choose-from-1` |
| Ada from 5 health is `Ada (health 3)`, red, after one attack | lesson cell `a-menu-to-choose-from-2` (the red: the page, headless Chromium) |
| the fold: with the clear at the top of the loop, each result is cleared before it can be read | probe P8 |
| CS0117, `'Commands' does not contain a definition for 'RunChoice'` | lesson cells `your-class-8-program--game` and `--solar-system` |
| game: a look, an attack, `Ada (health 10)` after Mira's heal, `Not a command: sing`, `still playing: False` | the solution of `your-class-8-program--game` |
| game: `HealOther` cannot heal a character who is down | probe P3 |
| solar: `Philae (fuel 30 kg)`, the status with `True`, `Philae (fuel 50 kg)`, `Not a command: orbit`, `still flying: False`, then `Philae (fuel 50 kg) \| can burn 10 kg: False` after `Land()` | the solution of `your-class-8-program--solar-system` |
| solar menu: the fifth burn prints `Refused: Philae cannot burn 10 kg now.`, then the status says `False` | the solution of `your-class-8-menu--solar-system` |
| the challenge: as given, three unknown commands; with `Trim()` and `ToLower()`, three attacks | probes P5 and P6 (the prose quotes neither) |
| `Trim()` and `ToLower()` return a new string and leave the old one | probe P7 |
| practice 1: `True, True, False, True`; `Not a command: Look` | practice cell `four-commands-1-program` |
| practice 2: `120` and `40`, then `null` three times; `FormatException` for `"ten"` and `""` | practice cell `reading-a-number-1`, its inputs and its solution |
| practice 4: CS0163 and its message | practice cell `what-the-menu-does-1` |
| practice 5: Juno's own `Burn` refuses, and prints why (no message quoted) | probe P2 |
| practice 7: `Tests run: 1. Passed: 1.` with no checks; `Not a command: xyzzy` with them | practice cell `a-test-for-a-front-end-1` and its solution |

No compiler message's line or column is quoted in the prose.

## Probes

The draft ran these with the NativeCheck command, passing this file. The
move ran them again in the browser engine, on 28 September 2026: the
cells from here to the end, with a frontmatter (`title:` and `version:`)
added, as `lessons/front-end-probes/front-end-probes.md` in a scratch
folder, with `node tools/check-lessons.mjs --lessons <scratch>/lessons
--write`. It reported no problems. The first cells hold the seventh
version's classes, and each `Commands` below replaces the one above it
(rule 4), so each probe uses the nearest `Commands` above it. P8 must
stay above P5, whose own `Commands` replaces the cave's.

What the browser recorded:

- P1: `Philae (fuel 40 kg) | can burn 10 kg: True`, then `... False`
  after `Land()`. (The lesson now records this itself.)
- P2: `Juno (fuel 30 kg)` down to `Juno (fuel 0 kg)`, then `Refused:
  Juno cannot burn 10 kg now.` on the fifth burn.
- P3: `Ada (health 0) | Grog (health 5)`, then `Refused: Ada is down.`
  and `Ada (health 0)`.
- P4: `What now? Not a command: ` and `True`, three times.
- P5: `Not a command: Attack`, `Not a command:  attack `, `Not a command:
  ATTACK`, then `Goodbye.`
- P6: `You swing at the troll.` three times, then `Goodbye.`
- P7: `[ ATTACK ] [attack]`.
- P8: `\f`, Ada and the menu; `2`; the attack's result; then `\f`
  before Ada's health and the menu, so each result is cleared before the
  next menu is shown.

```csharp exec
id: probe-character
file: Character.cs
/// <summary>
/// One character in the game: a name, and health from 0 up to MaxHealth.
/// A character with 0 health is down.
/// </summary>
class Character
{
    /// <summary>The most health a character can have.</summary>
    public virtual int MaxHealth => 10;

    public string Name;

    /// <summary>The character's health, a whole number from 0 up to MaxHealth.</summary>
    public int Health { get; protected set; }

    /// <summary>Makes a character with a name and some health.</summary>
    /// <param name="name">The character's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Character(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public override string ToString()
    {
        return $"{Name} (health {Health})";
    }

    /// <summary>Says whether the character's health is 0.</summary>
    /// <returns>true if the character is down.</returns>
    /// <example>
    /// <code>
    /// new Character("Ada", 0).IsDown()    // true
    /// new Character("Ada", 1).IsDown()    // false
    /// </code>
    /// </example>
    public bool IsDown()
    {
        return Health == 0;
    }

    /// <summary>
    /// Lowers the character's health by amount, stopping at 0.
    /// Refuses a negative amount, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void TakeDamage(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: damage cannot be negative.");
            return;
        }
        Health = Math.Max(0, Health - amount);
    }

    /// <summary>
    /// Adds amount to the character's health, stopping at MaxHealth.
    /// Refuses a negative amount, or a character who is down, and prints why.
    /// </summary>
    /// <param name="amount">A whole number, 0 or more.</param>
    public virtual void Heal(int amount)
    {
        if (amount < 0)
        {
            Console.WriteLine("Refused: healing cannot be negative.");
            return;
        }
        if (IsDown())
        {
            Console.WriteLine($"Refused: {Name} is down.");
            return;
        }
        Health = Math.Min(MaxHealth, Health + amount);
    }
}
```

```csharp exec
id: probe-healer
file: Healer.cs
/// <summary>A character who can also heal someone else.</summary>
class Healer : Character
{
    /// <summary>Makes a healer with a name and some health.</summary>
    /// <param name="name">The healer's name.</param>
    /// <param name="health">The health it starts with, from 0 up to MaxHealth.</param>
    public Healer(string name, int health) : base(name, health)
    {
    }

    /// <summary>
    /// Asks other to heal by amount, by other's own rules.
    /// Refuses if the healer is down, and prints why.
    /// </summary>
    /// <param name="other">Any character, a healer too.</param>
    /// <param name="amount">A whole number, 0 or more.</param>
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

```csharp exec
id: probe-probe
file: Probe.cs
/// <summary>
/// One space probe: a name, and fuel in kilograms, from 0 up to TankSize.
/// </summary>
class Probe
{
    /// <summary>The most fuel the probe can hold, in kilograms.</summary>
    public virtual int TankSize => 100;

    public string Name;

    /// <summary>The probe's fuel now, in kilograms.</summary>
    public int Fuel { get; private set; }

    /// <summary>Makes a probe with a name and some fuel.</summary>
    /// <param name="name">The probe's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Probe(string name, int fuel)
    {
        Name = name;
        Fuel = fuel;
    }

    public override string ToString()
    {
        return $"{Name} (fuel {Fuel} kg)";
    }

    /// <summary>Says whether the probe can burn kg kilograms now.</summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>true if kg is 0 or more, and no more than the fuel.</returns>
    /// <example>
    /// <code>
    /// new Probe("Voyager", 70).CanBurn(30)    // true
    /// new Probe("Voyager", 70).CanBurn(80)    // false
    /// new Probe("Voyager", 70).CanBurn(70)    // true: all of it
    /// new Probe("Voyager", 70).CanBurn(-5)    // false
    /// </code>
    /// </example>
    public virtual bool CanBurn(int kg)
    {
        if (kg < 0)
        {
            return false;    // a burn below 0 would add fuel
        }
        return kg <= Fuel;
    }

    /// <summary>
    /// Burns kg kilograms of fuel. If CanBurn(kg) is false, it changes
    /// nothing, and prints why.
    /// </summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Burn(int kg)
    {
        if (!CanBurn(kg))
        {
            Console.WriteLine($"Refused: {Name} cannot burn {kg} kg now.");
            return;
        }
        Fuel = Fuel - kg;
    }

    /// <summary>Adds kg kilograms of fuel, stopping at TankSize.</summary>
    /// <param name="kg">A number of kilograms, 0 or more.</param>
    public void Refuel(int kg)
    {
        Fuel = Math.Min(TankSize, Fuel + kg);
    }
}
```

```csharp exec
id: probe-lander
file: Lander.cs
/// <summary>
/// A probe that can land. Once it has landed, it burns no more fuel.
/// </summary>
class Lander : Probe
{
    private bool _landed = false;

    /// <summary>Makes a lander that has not landed yet.</summary>
    /// <param name="name">The lander's name.</param>
    /// <param name="fuel">The fuel it starts with, in kilograms, from 0 up to TankSize.</param>
    public Lander(string name, int fuel) : base(name, fuel)
    {
    }

    /// <summary>Lands the lander. After this, it burns no more fuel.</summary>
    public void Land()
    {
        _landed = true;
    }

    /// <summary>
    /// Says false once the lander has landed. Before that, it answers
    /// as any probe does.
    /// </summary>
    /// <param name="kg">A number of kilograms.</param>
    /// <returns>false after Land(); before that, what Probe.CanBurn gives.</returns>
    /// <example>
    /// <code>
    /// var philae = new Lander("Philae", 40);
    /// philae.Land();
    /// philae.CanBurn(10)    // false
    /// </code>
    /// </example>
    public override bool CanBurn(int kg)
    {
        if (_landed)
        {
            return false;
        }
        return base.CanBurn(kg);
    }
}
```

### The solar system's `Commands` (the world solution)

```csharp exec
id: probe-commands-solar
file: Commands.cs
/// <summary>The commands a player can give to a probe.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command for the probe: burn (10 kg), refuel (20 kg), status
    /// or quit. For any other text, it prints that the text is not a
    /// command, and changes nothing.
    /// </summary>
    /// <param name="probe">Any probe, a lander too.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the mission stops; otherwise true.</returns>
    public static bool RunChoice(Probe probe, string choice)
    {
        if (choice == "burn")
        {
            probe.Burn(10);
            Console.WriteLine(probe);
        }
        else if (choice == "refuel")
        {
            probe.Refuel(20);
            Console.WriteLine(probe);
        }
        else if (choice == "status")
        {
            Console.WriteLine($"{probe} | can burn 10 kg: {probe.CanBurn(10)}");
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P1. Solar solution note: the status says `False` after `Land()`

```csharp exec
id: p1-status-after-landing
var philae = new Lander("Philae", 40);
Commands.RunChoice(philae, "status");
philae.Land();
Commands.RunChoice(philae, "status");
```

### P2. Practice 5: Juno, 40 kg, five burns of 10 kg

```csharp exec
id: p2-five-burns-from-forty
var juno = new Probe("Juno", 40);
for (int burn = 1; burn <= 5; burn++)
{
    Commands.RunChoice(juno, "burn");
}
```

### The game's `Commands` (the world solution)

```csharp exec
id: probe-commands-game
file: Commands.cs
/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: look, attack, heal or quit. For any other text, it
    /// prints that the text is not a command, and changes nothing.
    /// </summary>
    /// <param name="hero">The player's character.</param>
    /// <param name="healer">The healer in the hero's party.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the game stops; otherwise true.</returns>
    public static bool RunChoice(Character hero, Healer healer, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine($"{hero} | {healer} | {monster}");
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // a monster that is down cannot hit back
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "heal")
        {
            healer.HealOther(hero, 2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P3. Game solution note: a character who is down is not healed

```csharp exec
id: p3-no-heal-when-down
var ada = new Character("Ada", 2);
var mira = new Healer("Mira", 10);
var grog = new Character("Grog", 8);
Commands.RunChoice(ada, mira, grog, "attack");
Commands.RunChoice(ada, mira, grog, "heal");
```

### The page's own `Commands` (the cave)

```csharp exec
id: probe-commands-cave
file: Commands.cs
/// <summary>The commands a player can give in the cave.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: look, attack, rest or quit. For any other text, it
    /// prints that the text is not a command, and changes nothing.
    /// </summary>
    /// <param name="hero">The player's character.</param>
    /// <param name="monster">The character the hero fights.</param>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit, so that the game stops; otherwise true.</returns>
    public static bool RunChoice(Character hero, Character monster, string choice)
    {
        if (choice == "look")
        {
            Console.WriteLine(hero);
            Console.WriteLine(monster);
        }
        else if (choice == "attack")
        {
            monster.TakeDamage(3);
            if (!monster.IsDown())
            {
                hero.TakeDamage(2);    // a monster that is down cannot hit back
            }
            Console.WriteLine($"{hero} | {monster}");
        }
        else if (choice == "rest")
        {
            hero.Heal(2);
            Console.WriteLine(hero);
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P4. "A loop that asks", without the `if`: three turns with no input

The loop is a `for` of three turns, so that the probe ends. With no
`stdin:`, `ReadLine` gives `null` each time.

```csharp exec
id: p4-no-check-for-null
var ada = new Character("Ada", 10);
var grog = new Character("Grog", 8);
for (int turn = 1; turn <= 3; turn++)
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    Console.WriteLine(Commands.RunChoice(ada, grog, choice));
}
```

### P8. The colour menu with `Console.Clear();` moved to the first line inside the loop (the fold)

```csharp exec
id: p8-clear-at-the-top
stdin: "2\n3\n4\n"
var ada = new Character("Ada", 5);
var grog = new Character("Grog", 8);
bool stillPlaying = true;
do
{
    Console.Clear();
    Console.ForegroundColor = ConsoleColor.Green;
    if (ada.Health <= 3)
    {
        Console.ForegroundColor = ConsoleColor.Red;
    }
    Console.WriteLine(ada);
    Console.ResetColor();
    Console.WriteLine("1: look   2: attack   3: rest   4: quit");
    Console.Write("Choose a number: ");
    string number = Console.ReadLine();
    switch (number)
    {
        case "1":
            stillPlaying = Commands.RunChoice(ada, grog, "look");
            break;
        case "2":
            stillPlaying = Commands.RunChoice(ada, grog, "attack");
            break;
        case "3":
            stillPlaying = Commands.RunChoice(ada, grog, "rest");
            break;
        case "4":
        case null:
            stillPlaying = Commands.RunChoice(ada, grog, "quit");
            break;
        default:
            Console.WriteLine("Choose 1, 2, 3 or 4.");
            break;
    }
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

### P5. The challenge, as given

```csharp exec
id: p5-the-challenge-as-given
stdin: "Attack\n attack \nATTACK\n"
bool stillPlaying = true;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";    // the input has ended, so nobody is left to play
    }
    stillPlaying = Commands.RunChoice(choice);
} while (stillPlaying);
Console.WriteLine("Goodbye.");

/// <summary>The commands a player can give in a cave with a troll.</summary>
static class Commands
{
    /// <summary>
    /// Runs one command: attack, look or quit. For any other text, it prints
    /// that the text is not a command.
    /// </summary>
    /// <param name="choice">The command, as text.</param>
    /// <returns>false for quit; otherwise true.</returns>
    public static bool RunChoice(string choice)
    {
        if (choice == "attack")
        {
            Console.WriteLine("You swing at the troll.");
        }
        else if (choice == "look")
        {
            Console.WriteLine("A cave, and a troll.");
        }
        else if (choice == "quit")
        {
            return false;
        }
        else
        {
            Console.WriteLine($"Not a command: {choice}");
        }
        return true;
    }
}
```

### P6. The challenge, one answer: `Trim()` and `ToLower()` in the front end

`Commands` is P5's (rule 2: a class in a program cell carries down too),
so this probe has statements only.

```csharp exec
id: p6-the-challenge-answered
stdin: "Attack\n attack \nATTACK\nquit\n"
bool stillPlaying = true;
do
{
    Console.Write("What now? ");
    string choice = Console.ReadLine();
    if (choice == null)
    {
        choice = "quit";
    }
    stillPlaying = Commands.RunChoice(choice.Trim().ToLower());
} while (stillPlaying);
Console.WriteLine("Goodbye.");
```

### P7. Strings cannot be changed: `Trim()` and `ToLower()` return new ones

```csharp exec
id: p7-a-new-string
string typed = " ATTACK ";
string command = typed.Trim().ToLower();
Console.WriteLine($"[{typed}] [{command}]");
```
