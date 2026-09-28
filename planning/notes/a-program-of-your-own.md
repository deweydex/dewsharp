# a-program-of-your-own: notes for a reviewer

Ported from dewlab `tutorials/a-program-of-your-own/a-program-of-your-own.md`
(version 2026.09.26.1) and its `.glossary.yaml`. It is a project page: one
whole program to open with, three starting points, a plan, a release
checklist, and questions to look back with. The work is the learner's, over
a week or two. It follows `looking-things-up-by-name` in PDP's "Methods,
lists and algorithms" series (`planning/COURSE_MAP.md`, PDP row 19: "adapt",
shape "project", size S, no worlds, batch 5). As in dewlab, it has no
solutions and no practice page, and the course map lists it under "Lessons
with no worlds". So dewlab PDP's two worlds are not used here: the map's
entry overrides the default, and the cipher tool and the pixel-art maker
stay as two of the three starting points in the prose, as in dewlab.

`covers: [PDP-LO7, PDP-LO5, PDP-LO6]` is the course map's list, in the map's
order. dewlab's frontmatter gave each section its own `covers:` (choosing:
LO7; planning: LO6; release: LO7); dewsharp's format has one flat list.
`year:` is dropped, as dewsharp has no such field.

Status: written in one run on 27 September 2026, as a draft in
`drafts/lessons/a-program-of-your-own/`.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/a-program-of-your-own/a-program-of-your-own.md`, its
recorded outputs are
`lessons/a-program-of-your-own/a-program-of-your-own.outputs.json` (written
by the browser checker, version `2026.09.28.1`), and this file was the
draft's `NOTES.md`. The two `*.native.json` files were deleted: the browser
checker's outputs file replaces them. The draft had no pictures and no
practice page, and the course map gives it none. "What was done when it
moved", just below, says what changed in the move. The porter's notes
follow it, with anything the move made stale marked *(stale)*. "The
porter's questions, and what was decided" settles the open questions where
the playbook, the course map, the style guide or the example lessons answer
them; the rest are under "Open".

Files:

- `a-program-of-your-own.md`: the lesson. Two exec cells (the course map's
  "Two cells"): one program cell and one cell of comments only (kind
  `empty`). One predict, one challenge, a release checklist, and no
  solutions, inputs, hints or answer folds, as in dewlab.
- `a-program-of-your-own.outputs.json`: what the browser checker recorded.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  a-program-of-your-own` ran the draft in the real engine. It did what the
  native check said, with the same text: `a-whole-program-1` printed
  `PHHW PH DW QRRQ` and `MEET ME AT NOON`, with no diagnostic;
  `planning-before-you-code-1` is kind `empty`; the challenge compiled
  alone (`outcome: ok`). The browser differed from the draft in nothing:
  the page prints no decimals, money or dates, uses no trimmed API, has no
  stray warning, and `Console` behaved as on a computer. The only problems
  reported were the two links to `reading-input` (see "Links").
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probe cells" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). All ten gave what the native check gave,
  with one difference that is the browser's and is expected: the page
  echoes each typed line after its prompt, as a console does
  (`Your choice: 1`, then `Message: MEET ME AT NOON`), where the native
  check ran the prompts together. The CS8321 message is word for word the
  one the checklist quotes: `The local function 'Decode' is declared but
  never used` (line 19, column 15 of its probe). `stubs-compile` has no
  diagnostic, `stub-that-does-not-fit` is CS1503 (`Argument 2: cannot
  convert from 'string' to 'int'`), `edge-word-for-a-number` stops with
  `System.FormatException` (`The input string 'three' was not in a correct
  format.`) at line 14, and `edge-shift-below-zero` prints `>?@`, `XYZ`
  and `[]`.
- **Links** (task step 3, decision 32). `reading-input` is neither in
  `lessons/` nor among the pages moved in this round, so both links to it
  became its short title in italics, *Reading input*, as
  `making-decisions`, `repeating-yourself`, `looking-things-up-by-name`
  and `writing-your-own-functions` already name it. `finding-things` is
  moved in this round, so "The next page, Searching: linear and binary
  search" became a link, `[Searching](lesson:finding-things)` (the course
  map's short title). One new link: the cipher tool's "cracking a shift
  with no key, by counting letters" now points to the challenge on
  `looking-things-up-by-name`, which starts exactly that. The links to
  `writing-your-own-functions`, `grids-and-references` and `first-steps`
  go to pages in `lessons/`.
- **The challenge ends quietly when input ends.** Probe
  `challenge-starter-input-ends` showed that when `ReadLine` gives `null`
  (on the page, the **End input** button, `web/page/cell.js`), the draft's
  starter printed `Please type 1 or 9.` and then stopped: it told a person
  to type after the input had ended. `case null:` now sits under
  `case "9":`, so the end of input stops the menu as 9 does, which is the
  shape `a-front-end-for-a-class` uses (`case null:` under the quit case)
  and what the course map asks of *Reading input*'s menu ("the menu copes
  with it"). The probe now prints only the menu and `Your choice: `. The
  starter is 30 lines. The prose before it now defines `null` in the words
  `a-front-end-for-a-class` uses ("C#'s value for *nothing here*") and
  names **End input**, because the starter's `choice != null` was the
  page's first `null` with no word about it. The page's `version:` is now
  `2026.09.28.1`, because the challenge's code changed; neither cell's
  code changed.
- **The notebook, the button and the steps now match the site.** The
  checklist's last line says "you have pressed **Download project** on its
  cell, and kept the file it saves", the button's label on a lesson cell
  and on a notebook cell (`web/page/lesson.js`, `web/page/notebook.js`).
  The paragraph before the challenge names **Open in my notebook**, the
  button under a challenge. The Visual Studio steps now follow
  `the-tools-around-your-code` and the ZIP's own `README.txt`
  (`web/page/project.js`): the ZIP holds a `.sln`, so step 2 double-clicks
  the `.sln` (or **File**, **Open**, **Project/Solution**), where the
  draft chose the `.csproj`; step 1 unzips with **Extract All**. A
  sentence names `IrishCulture.cs`, the extra file a learner sees in the
  project (decision 38). A new sentence after the challenge says that some
  computers clear what a browser saves at the end of a session, and names
  **Export this notebook**: a project that lasts a week or two lives in
  the notebook, and the notebook page itself gives this warning.
  "Looking back" now says "in a text cell in your notebook", since the
  notebook has text cells for notes.
- **A clear line on what belongs in Visual Studio** (style guide
  `#the-ide`, the task's checklist). "Your release in Visual Studio" now
  opens with "You can write, run and test every release here, in your
  notebook, and none of it needs Visual Studio. Visual Studio is where
  your program runs on its own, outside this site". The style guide's
  "Decided for now" 4 says a page that exports to Visual Studio mentions
  the nullable setting, so a new paragraph does, in the words of
  `the-tools-around-your-code`: the downloaded project has the page's
  settings; a project from Visual Studio's own template has *nullable
  reference types* on, and then the starter's `choice =
  Console.ReadLine();` gives warning CS8600. That was run natively
  (`dotnet build` of the starter in a console project with
  `<Nullable>enable</Nullable>`, .NET 10 SDK, 28 September 2026): one
  warning, `Program.cs(16,14): warning CS8600: Converting null literal or
  possible null value to non-nullable type.`, and none once the line reads
  `string? choice;`. The Microsoft Learn entry now says the same in two
  sentences ("its project has *nullable reference types* on. The `?` says
  that the variable can hold `null`, and it stops the warning CS8600"),
  where the draft said only "a setting in its project".
- **Terms defined where they are first used.** *Edge* ("an input at the
  limit of what the program expects"; no PDP page defines it for inputs),
  `null` (above), *nullable reference types* (above). The planning
  paragraph now says "as pseudocode", the term `first-steps` defined, and
  keeps its "one line of plain English for each step", which is what
  `first-steps`'s "Your turn" asks for.
- **"26 lines" is from the editor, not an output.** No cell can print its
  own length. The prose now says "The whole program is 26 lines long, as
  the numbers beside its lines show": the editor numbers every line
  (`lineNumbers()` in `web/page/editor.js`), and the parser gives the
  cell's code as 26 lines (checked with `parseLesson`). "It uses nothing
  from after the page about methods" became "Everything in it is from the
  page about methods or the pages before it", which is plainer.
  `writing-your-own-functions` has the same `Encode` and `Decode`, and
  `return "";` placeholders in its tasks, as the page says.
- **Wording.** "A good project for this page" became "A project that suits
  this page", and "whether it is a good size" became "whether its size
  suits this page", so that nothing reads as a judgement. "during a week or
  two" became "in the next week or two". "it runs to the end with no
  exception" became "it runs ... and it never stops with an exception", in
  the style guide's words for the three outcomes (`#the-compiler`). "it
  often names a line" became "it can name a line". A sentence with *log
  out* (a phrasal verb) was written without it.
- **The reading list was checked again, 28 September 2026.** The Microsoft
  Learn module answers (200) and lists eight units; unit 3 shows the menu
  of eight choices, the `switch` with a "coming soon" message for each,
  the loop that ends on "exit", and `string? readResult;`; units 4 and 5
  write choices 1 and 2. The DevDuck video's title and channel were
  checked through YouTube's oEmbed. Its length ("about seven minutes") is
  still dewlab's: the TubeAlfred tool had no credits, and YouTube's watch
  page asked for a sign-in (see "Open").
- **The page was opened** with `node tools/serve.mjs --port 8793
  --isolate` and headless Chromium (`/lesson.html?sw=off&id=a-program-of-your-own`).
  No page errors. The first cell is labelled `PROGRAM` and prints the
  recorded two lines; the planning cell is `EMPTY`; the challenge shows
  **Open in my notebook**; the checklist has its eight boxes; every
  `lesson:` link reaches its page, and "Next" is *Searching: linear and
  binary search*, since `finding-things` is now in `lessons/`. The
  challenge's two longest lines are wider than its box at a 1100-pixel
  window and scroll, as other code blocks do. A first screenshot showed
  the planning cell's line numbers out of line with its comments; measured
  again after the fonts had loaded, every number sits on its line, so that
  was the screenshot's timing, not the page.
- **The final check.** `npm run check-lessons -- a-program-of-your-own`,
  without `--write`, reports "no problems": the recorded outputs match,
  and every link resolves, `finding-things` included.
- **Not changed, and why.** `courses/pdp.yaml` still lists this page under
  `planned:` (line 97); the playbook's checklist says to delete that line
  when a lesson moves, but this move may not edit the course files. Cell
  ids are the draft's (`a-whole-program-1` and `planning-before-you-code-1`
  are dewlab's).

## Where each number and message in the prose comes from, now

| Number, message or claim | Source |
|---|---|
| `MEET ME AT NOON` on the second line | `a-whole-program-1` in the outputs file |
| "26 lines long" | the cell's code as the parser gives it, 26 lines; the editor shows the numbers |
| CS8321, *The local function 'Decode' is declared but never used* | probe `warning-decode-never-called`, in the browser |
| a placeholder body compiles; a call with text for a whole number does not | probes `stubs-compile` and `stub-that-does-not-fit` (CS1503), in the browser |
| `ReadLine` gives `null` on **End input**; the menu stops, as for 9 | `web/page/cell.js` (`endInput`), `docs/ENGINE_API.md` ("ReadLine returns null"), probe `challenge-starter-input-ends` |
| CS8600 on `choice = Console.ReadLine();` with nullable on; none with `string?` | a native `dotnet build`, 28 September 2026 (above) |
| `.sln`, **Extract All**, `IrishCulture.cs`, `Program.cs` | `web/page/project.js` and decision 38 |
| **Download project**, **Open in my notebook**, **End input**, **Export this notebook**, text cells | `web/page/lesson.js`, `web/page/cell.js`, `web/page/notebook.js` |
| "eight parts", "a menu of eight choices", "two of the choices" | the Microsoft Learn module, read again on 28 September 2026 |
| "Chapters 1 and 2", "about seven minutes" | dewlab's page, unchanged (not checked again) |

## What changed from dewlab, and why (the porter's notes)

These are the porter's notes from 27 September 2026. Where the move
changed what they describe, a note in *(stale: ...)* says what the page
does now.

**The opening program is the Caesar coder with methods**, as the map asks.
dewlab's program was one Python function, `encode`, called with 3 and then
with -3. The C# program has the two methods the reader wrote on
`writing-your-own-functions`: `Encode`, with the `((position + shift) % 26
+ 26) % 26` form that page's solutions settled on, and `Decode`, which
calls `Encode` with `-shift`. The message and shift are dewlab's
(`MEET ME AT NOON`, 3). The cell keeps dewlab's id, `a-whole-program-1`.

The cell is 26 lines, where dewlab's was fourteen: C# puts each brace on its
own line, and the program has a second method. That is longer than the
style guide's "five to fifteen lines", but this is the one place where the
page shows a whole program, as dewlab's did. The prose says "26 lines long"
(counted from the cell: the last line of the cell is line 26, blank lines
included). *(stale: the prose now says "as the numbers beside its lines
show", and "uses nothing from after" became "Everything in it is from the
page about methods or the pages before it".)*

dewlab asked "what do you think the second line of its output will be?" in
prose only. The C# page keeps the sentence and adds a `predict` of type
`text` under the cell, so that the page records the guess. It is the only
predict on the page; a project page has one program to guess about. The
answer (`MEET ME AT NOON`) is in the prose after it, from the recorded
output. The page then invites a change ("Can you change the message, or the
shift, and run it again?"), which dewlab did not have: the style guide's
"run first, then change".

"Something goes in, something is done to it, and something useful comes
out" became "It has an input, it does some work on it, and it gives an
output that is useful": *goes in* and *comes out* are phrasal verbs. The new
paragraph after it says that the input here is written in the code, and
that a program of the reader's own can ask for its input with
`Console.ReadLine()`, as `reading-input` did. That is the map's "A program
of your own can now ask its user for input". *(stale: `reading-input` is
not in `lessons/`, so the page names it *Reading input*, in italics, here
and at the menu.)*

**"No tasks to check and no solutions to open"** became "no solutions to
compare with and no answers to open", in the words of the page's own
button, **Compare with a solution**. *Check* could read as a verdict.

**Choosing what to build.** dewlab's two imperatives ("Choose
something...") became a statement: "A good project for this page has a
first version you could finish in an evening. It also has *room to grow*".
The term *room to grow* is defined where it appears, as in dewlab. dewlab's
glossary had a second term, *low floor*, that its page never used; this page
does not use it either. dewsharp has no glossary panel, so both glossary
definitions are in the prose (*room to grow* here, *release* in Release 1).

**Each starting point begins with a menu**, as the map asks. One new
paragraph defines *menu* in the reader's terms from `reading-input`: "a
list of choices, with 9 to quit, in a loop that asks again after each
choice". It adds the structure the page leans on: the first version has one
or two choices, and each step of room to grow can add one more. Then:

- *Cipher tool*: the first version has two choices, code and decode, asks
  for the message and the shift, and uses `Encode` and `Decode` from the
  opening program. Probe `cipher-release-1` shows that this first version
  needs only what the reader has met (62 lines, comments included, with
  `int.Parse`).
  The four steps of room to grow are dewlab's, unchanged.
- *Pixel-art maker*: the first version has one choice, draw a picture, kept
  as an array of strings with `#` and `.` (dewlab: "a list of strings";
  `looking-things-up-by-name` keeps pictures as `string[]`). Probe
  `pixel-art-first-version`. The palette step now names
  `Console.BackgroundColor` and links to `grids-and-references`, which
  draws pixels in colour; the native check cannot run colours, and no cell
  on this page uses them. "functions that change a picture" became
  "methods". The rule step gained "at a size the person types", the one
  place where input enters the list.
- *Something of your own*: "Its first version starts with a menu too, even
  if the menu has only one choice and 9 to quit." dewlab's "decide whether
  it is the right size" became "help you decide whether it is a good size"
  (*right* is on the style guide's list). "or can look up in an afternoon"
  became "or what you can find and learn in an afternoon" (*look up* is a
  phrasal verb).

The paragraph on ideas that fail adds one C# line: "So does anything these
pages cannot do, such as reading a file or opening a window." The teacher
notes in the course map list files and windows among what the page cannot
do. dewlab's "the first version never arrives" became "the first version
is never finished".

**Planning before you code.** "Before you write any Python, write the
plan" became a question: "Can you write the plan before any C#, the way the
first page did...?" The next sentences keep dewlab's order (the plan, then
the methods, and for each one what goes in and out), and add the menu's
choices. "What goes in and what comes out" became "what it takes and what
it returns", which avoids two phrasal verbs and uses the words the page
about methods taught.

Two short paragraphs are new, and both are about what C# makes different:

- "In C#, a method's first line says both." The signature of `Encode` is
  the example. In Python, dewlab's reader had to write the types in a
  comment; in C# the first line is the decision.
- A placeholder body (`return "";` or `return 0;`) compiles, as the
  your-turn cells on `writing-your-own-functions` did, so the compiler
  checks that each call in the menu matches a method's first line before
  any body is written. *Placeholder* is defined in the sentence ("a value
  that holds the place of the real answer"). Probe `stubs-compile` runs a
  whole menu over three placeholder methods, with no warning. Probe
  `stub-that-does-not-fit` shows the other half: a call that passes a
  `string` where the method takes an `int` does not compile (CS1503), even
  with a placeholder body. The page names no code for it, to keep the
  paragraph short.

The planning cell keeps dewlab's id, `planning-before-you-code-1`, and
stays a cell of comments, with one line added ("The choices on its menu,
and 9 to quit:") and "functions" changed to "methods ... its first line".
The native check calls it kind `empty` (see "Once the page UI exists").

**The challenge.** dewlab's challenge was a comment template for the
Notebook. The C# challenge keeps the template (name, version and date,
one sentence, and a comment for each method) and adds a menu that already
runs: a `do`...`while` round a `switch`, with one choice that prints "This
choice is still to be written.", 9 to quit, and a `default` that asks again.
This is where "each starting point begins with a menu" becomes code the
reader starts from. It is the shape the map gives `reading-input` ("a
`do`...`while` round a `switch` on the choice (`case "1":`, `default:`),
with 9 to quit ... `ReadLine` gives `null` when input ends ... and the
menu copes with it"): the loop's condition is
`choice != "9" && choice != null`. *(stale: `case null:` now sits under
`case "9":`, so the end of input no longer prints "Please type 1 or 9."
first, and the prose before the starter defines `null`; the starter is 30
lines.)* The placeholder message follows the
Microsoft Learn project in "Where to read more", which starts the same
way. The message says "still to be written" rather than "not written
yet": *not yet* is on the style guide's list of verdict words, even though
here it would describe the program and not the reader.
Probes `challenge-starter` (typed 1, 5, 9) and
`challenge-starter-input-ends` (no input) are exact copies of it. dewlab's
sentence "For a program longer than a few cells, the Notebook is a better
place" became "A program that grows for a week or two needs more room than
this page", because in dewsharp a whole PDP program is one cell.

**Release 1.** The definition of *release* is dewlab's, with "the day it
comes out" as "the day it appears". The checklist:

| dewlab | C# page |
|---|---|
| runs from the top, on a freshly loaded page, with no errors | "it compiles, and it runs to the end with no exception: a person can use each choice on its menu, and then quit". A fresh page means nothing in dewsharp, where each Run starts a new program; the check is now about the menu. *(stale: now "it compiles, and it runs: a person can use each choice on its menu, and then quit, and it never stops with an exception", in the style guide's words.)* |
| (new, from the map) | "every warning it shows is one you have read", with one sentence on why, and CS8321 as the example: "can mean that a menu choice does not call the method it should" (probe `warning-decode-never-called`: a menu whose choice 2 is not written yet, so `Decode` is never called). |
| one thing a person could use | unchanged |
| a comment at the top: name, version, date | unchanged |
| a comment under each `def` line | "a comment above its first line says what it takes and what it returns". C# puts comments above a method; XML comments wait for `building-reusable-tools`. |
| three inputs, one at an edge | two edges added: "a shift below zero" (probe `edge-shift-below-zero`: without the `+ 26`, `ABC` with -3 gives `>?@`, and with it `XYZ`) and "a word typed where the program asks for a number" (probe `edge-word-for-a-number`: `int.Parse` stops with a `FormatException`; probe `edge-word-for-a-number-tryparse`: `TryParse` asks again). The page says only that these are edges to try, not what a program should do with them. |
| somebody else has run it, and you watched where they got stuck | "where they stopped, not sure what to do next" (*get stuck* is an idiom) |
| a copy kept, with **Export a copy** in the Notes panel | "you have downloaded it as a Visual Studio project, and kept that copy, before you change it for Release 2" (the map's second new line; it replaces dewlab's export, which dewsharp does not have). *(stale: now "you have pressed **Download project** on its cell, and kept the file it saves, before you change anything for Release 2", in the button's words.)* |

So the list has eight lines where dewlab's had seven: the map's two new
lines, one of which takes the place of dewlab's last.

**"Your release in Visual Studio" is new.** The map names this page as one
of PDP's three with a Visual Studio part ("the release on
`a-program-of-your-own`"), and in PDP's order it is the first of them
(`when-it-goes-wrong` and `from-cells-to-a-program` come later). The steps
use the same words as the FOOP draft `the-tools-around-your-code` (download,
unzip, **File** > **Open** > **Project/Solution**, the `.csproj`, Ctrl+F5,
press a key to close). Two things are added: keep the downloaded file
unchanged as the copy of Release 1, and the code is in `Program.cs`, the
default `file:` name for a program cell (`docs/LESSON_FORMAT.md`). The
section says "On a computer with Visual Studio", because a learner at home
may not have it; downloading the copy needs no Visual Studio. *(stale:
the ZIP holds a `.sln`, so step 2 now double-clicks the `.sln`, as
`the-tools-around-your-code` in `lessons/` does, and step 1 names
**Extract All**. The section now opens with a line on what belongs in
Visual Studio, names `IrishCulture.cs`, and ends with a paragraph on the
nullable setting. See "What was done when it moved".)*

**Looking back.** The five questions are dewlab's, with "Where did you get
stuck" as "Where did you stop, not sure what to do next". dewlab sent the
answers to **Your notes** in its Notes panel, which dewsharp does not have.
The C# page says "You could write yours where you keep your plan: as
comments in your notebook, or on paper." *(stale: now "in a text cell in
your notebook, beside your program, or on paper".)*

**The next page** is `finding-things`, whose map title is "Searching:
linear and binary search". It is in the same batch (5), so by the batch
rules the sentence names it in plain text, with no link, as
`looking-things-up-by-name` does for this page. *(stale: `finding-things`
moved in the same round, so the sentence now links to it as
`[Searching](lesson:finding-things)`; and `looking-things-up-by-name` in
`lessons/` now links to this page.)*

**Where to read more.**

- Downey's *Think Python*, chapter 4, is a Python book. In its place:
  Microsoft Learn,
  [Guided project - Develop conditional branching and looping structures in C#](https://learn.microsoft.com/training/modules/guided-project-develop-conditional-branching-looping/),
  a beginner module in eight units. It was read on 27 September 2026 (the
  module page, and units 2 and 3 in full). It starts from a program that
  shows a menu of eight choices, puts the menu in a `do` loop with a
  `switch`, gives each
  choice a "coming soon" message, and then writes two of the choices, one
  at a time, building and running after each step. That is this page's
  idea (a first version, then one step at a time) in C#, with a menu. Three
  differences, of which the page names two: it uses Visual Studio Code; it
  writes `string?` for `ReadLine`'s result, because its project has nullable
  reference types on (the page says "because of a setting in its project;
  the `?` stops a warning that these pages do not show"); and its menu ends
  when you type `exit`, not 9 (not mentioned). Its data is a `string[,]`,
  which `grids-and-references` shows. *(stale: the page now names the
  setting, *nullable reference types*, which its Visual Studio section
  defines, and says the `?` "stops the warning CS8600". The module was
  read again on 28 September 2026: eight units, and units 3 to 5 as
  described.)*
- Singh, *The Code Book*: kept, with "a cipher tool could grow into" as
  "a cipher tool could add" (*grow into* is a phrasal verb).
- DevDuck's video: kept. Its title and channel were checked through
  YouTube's oEmbed on 27 September 2026 ("When is it Time to Move On from a
  Personal Project?", DevDuck). The length ("about seven minutes") and the
  summary are dewlab's and were not checked again: the transcript tool had
  no credits. "losing the will to work on a project" became "a project of
  his own that he no longer wanted to continue" (an idiom and a phrasal
  verb).

## What C# made different, in short

- The opening program has a method's first line to plan with:
  `static string Encode(string message, int shift)` says what goes in and
  what comes out, where Python needed a comment.
- A plan can compile before the program works: placeholder bodies let the
  compiler check that the calls fit.
- Real input (`Console.ReadLine()`) means a first version can have a menu,
  so each starting point begins with one, and the challenge starts with a
  menu that runs.
- The release checklist gains the compiler's warnings, and the copy is a
  Visual Studio project, which also runs outside the page.
- Two edges that are C#'s own: a shift below zero (`%` keeps the sign), and
  a word typed where `int.Parse` expects a number.
- "A freshly loaded page" means nothing when each Run starts a new program.
- Files and windows are named as things the page cannot do.

## Where each number and message in the prose came from (the porter's table)

The table "Where each number and message in the prose comes from, now",
above, replaces this one.


| Number, message or claim | Source |
|---|---|
| `MEET ME AT NOON` on the second line (and `PHHW PH DW QRRQ` above it, not quoted) | lesson cell `a-whole-program-1` |
| "26 lines long" | the cell's code, counted: 26 lines, blank lines included (`awk` over the cell; the recorded output does not count lines) |
| "uses nothing from after the page about methods" | the cell uses `foreach` over a string, `char.IsUpper`, `+=` on a string, a cast to `char`, `%`, and two `static` methods, all met by `writing-your-own-functions` (whose solutions have the same `Encode` and `Decode`) |
| a placeholder body compiles; a menu over placeholder methods runs with no warning | probe `stubs-compile` |
| text passed where a method takes a whole number does not compile | probe `stub-that-does-not-fit` (CS1503) |
| the challenge runs as it is: choice 1 prints "This choice is still to be written.", 5 asks again, 9 quits, and the end of input ends it | probes `challenge-starter`, `challenge-starter-input-ends` |
| CS8321, *The local function 'Decode' is declared but never used* | probe `warning-decode-never-called` |
| a shift below zero is an edge | probe `edge-shift-below-zero` (`>?@` without `+ 26`, `XYZ` with it; an empty message gives an empty string) |
| a word where a number is asked for is an edge | probes `edge-word-for-a-number` (`FormatException`), `edge-word-for-a-number-tryparse` |
| a cipher tool's first version needs only what the reader has met | probe `cipher-release-1` |
| a pixel-art maker's first version | probe `pixel-art-first-version` |
| "9 to quit" | the map's entry for `reading-input` |
| "eight parts", "a menu of eight choices", "two of the choices" | the Microsoft Learn module, read on 27 September 2026 |
| "Chapters 1 and 2", "about seven minutes" | dewlab's page, unchanged |

The one compiler message quoted in the prose (CS8321) is quoted without a
file, line or column, so no position needs checking against the page.

## Notes that were for later, and what became of them

The porter listed these under "Once the page UI and the other pages
exist". The page UI exists now, and most of the pages do.

- **`reading-input` is not drafted.** Still true: it is neither in
  `lessons/` nor in this round's moves. The page names it *Reading input*
  (decision 32). The challenge's menu follows the course map's entry for
  it (a `do`...`while` round a `switch`, `case "1":`, `default:`, 9 to
  quit, and a menu that copes with `null`), and now also the one written
  menu in `lessons/` that does the same, on `a-front-end-for-a-class`
  (`case null:` under the quit case). Matching *Reading input* line for
  line waits for that page (see "Open").
- **`first-steps` is not drafted.** Settled: it is in `lessons/`. Its
  pseudocode uses capital verbs (`GET`, `DIVIDE`, `DISPLAY`), and its
  "Your turn" asks the reader to "write your pseudocode as comments, one
  line of plain English for each step". The planning paragraph now says
  "as pseudocode, the way the first page did: one line of plain English
  for each step", which describes that page.
- **The download button.** Settled: its label is **Download project**, on
  a lesson's program cell and on every notebook code cell
  (`web/page/lesson.js`, `web/page/notebook.js`). The page now uses that
  name.
- **The notebook.** Settled: `web/page/notebook.js` says "Your notebooks
  are saved in this browser, on this device", and **Open in my notebook**
  (`web/page/lesson.js`) makes a new notebook from the challenge
  (`fromChallenge`). The page now says "saved in this browser, on this
  device", names the button, and adds the notebook's own warning that some
  computers clear what a browser saves, with **Export this notebook**. The
  notebook has text cells, so "Looking back" names one.
- **The planning cell has only comments.** Settled: the browser checker
  also calls it `empty`. The page shows it as it shows the comment-only
  cells on other pages: the label says "An empty cell. Write some C# in
  it." (`web/page/cell.js`). That label is the page's, not this lesson's;
  the cell's comments are still the plan's headings.
- **The predict of type `text`** on a cell with two lines of output: the
  page shows the guess beside the whole output, and a `text` guess counts
  as the same when it equals the whole output or any one of its lines
  (decision 37). So `MEET ME AT NOON` is the same, with no question after
  it. A reader who guesses the first line, `PHHW PH DW QRRQ`, is also
  "the same", and is not asked "Which line explains what you saw?". That
  costs little here, since the prose under the cell says the second line
  is `MEET ME AT NOON`, and the page never marks a guess. Nothing to
  change.
- **The console echo.** Settled: the browser checker's recorded output
  shows each typed line after its prompt (`Your choice: 1`), as a
  console does. Nothing in the prose quotes that output.
- **A forward link to this page.** Settled: `looking-things-up-by-name`
  in `lessons/` now links here (`[A program of your own](lesson:a-program-of-your-own)`).
  `critique-and-reflection` depends on this page; whether it links here
  is for its own move.

## The porter's questions, and what was decided

1. **Menus everywhere?** Decided: the menu stays in every starting point,
   "something of your own" included. The course map's entry says "A
   program of your own can now ask its user for input (`reading-input`),
   so each starting point begins with a menu", and "something of your
   own" is one of the three starting points. A menu with one choice and 9
   to quit costs a quiz three lines, and the challenge's starter already
   has it. If Josh wants the menu to be a suggestion for "something of
   your own", it is one sentence ("Its first version starts with a menu
   too, even if the menu has only one choice and 9 to quit").
2. **The challenge is 29 lines** (30 now, with `case null:`). Decided:
   keep the menu in the starter. The course map asks that each starting
   point begin with a menu, and gives this page "Two cells and the
   challenge"; the style guide's checklist asks "is there a first step
   anyone can take?", and a menu that runs, with one choice "still to be
   written", is that first step. The comment template that dewlab had is
   still its first six lines. The reader's own work (the methods, what
   choice 1 does, and every choice after it) is all still to write.
3. **The placeholder paragraph.** Decided: keep it. The style guide's
   `#the-compiler` treats the compiler "as the first place the reader gets
   feedback", and the course map's "What changes because of C#" says of
   the compile step: "The pages say so and use it." A plan whose methods
   have placeholder bodies is the compiler checking the plan. It is prose,
   with no new cell, and it uses the `return "";` shape the reader met in
   the tasks on `writing-your-own-functions`. Decision 27 (a task starts
   out not compiling) is about the page's own tasks, not a habit for the
   reader's own program, so it does not apply. `from-cells-to-a-program`
   can still use the same idea for the team's agreement on signatures.
4. **The opening program is 26 lines.** Decided: keep `Decode`. The
   course map's entry says "The opening program is the Caesar coder with
   methods", and the cipher tool's first version uses both methods. The
   style guide's "five to fifteen lines" is for cells that teach; this is
   the page's one whole program, as dewlab's was.
5. **Visual Studio at home.** Not decided: see "Open".
6. **Two edges in the checklist are C#'s own.** Decided: keep both. The
   course map's "What changes because of C#" names both: "A Caesar shift
   going backwards needs `((n % 26) + 26) % 26`" (the shift below zero),
   and real input, with `int.Parse` until the reader has met `TryParse`
   (the word typed where a number is asked for, which is the edge every
   menu program meets). They are examples in a list, and the reader tries
   one.
7. **No link to `finding-things`.** Settled: it moved in this round, so
   the page links to it.

## Open

For Josh, or for the orchestrator:

1. **Visual Studio or Visual Studio Code** (the porter's question 5, the
   course map's open question 11: which Visual Studio, and do learners
   have Windows?). The steps are for "a computer with Visual Studio" and
   use **Extract All** and Ctrl+F5, which are Windows. If learners work on
   a Mac or with Visual Studio Code, the section needs a second set of
   steps (the ZIP's `README.txt` already gives `dotnet run`).
2. **`courses/pdp.yaml`** still lists this page under `planned:` (line
   97). The playbook's checklist says to delete that line when the lesson
   moves; this move may not edit the course files.
3. **The menu on *Reading input*.** When that page is written, the
   challenge's menu should match its menu (the prompt `Your choice: `, the
   `default` text, `case null:`), and "a loop that asks again after each
   choice" should use its words. Or *Reading input* can take this shape,
   which `a-front-end-for-a-class` already uses.
4. **The DevDuck video's length** ("about seven minutes") is dewlab's, and
   was not checked in either run: TubeAlfred had no credits, and YouTube's
   watch page asks for a sign-in. Its title and channel are checked.
5. **The label on the planning cell.** A cell of comments only is labelled
   "An empty cell. Write some C# in it." On this page the comments are a
   plan, not C#. That label is the page code's (`web/page/cell.js`), and
   the same on every comment-only cell, so this move did not change it.

## Probe cells

Run with the NativeCheck command, passing this file. The two cells with
`expect:` fail on purpose.

```csharp exec
id: challenge-starter
stdin: "1\n5\n9\n"
// Name:
// Version 1, and the date:
// What it does, in one sentence:

// Your methods go here, above the menu.
// Above each one, a comment: what it takes, and what it returns.


// The menu: one choice to start with, and 9 to quit.
string choice;
do
{
    Console.WriteLine("1. (your first choice)");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: challenge-starter-input-ends
// Name:
// Version 1, and the date:
// What it does, in one sentence:

// Your methods go here, above the menu.
// Above each one, a comment: what it takes, and what it returns.


// The menu: one choice to start with, and 9 to quit.
string choice;
do
{
    Console.WriteLine("1. (your first choice)");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
        case null:
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: cipher-release-1
stdin: "1\nMEET ME AT NOON\n3\n2\nPHHW PH DW QRRQ\n3\n7\n9\n"
// Cipher tool
// Version 1, 27/09/2026
// Codes and decodes a message with a Caesar shift.

// Takes a message and a shift. Returns the message with each capital
// letter moved shift places along the alphabet.
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

// Takes a coded message and its shift. Returns the message decoded.
static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string plain = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine(Encode(plain, shift));
            break;
        case "2":
            Console.Write("Coded message: ");
            string coded = Console.ReadLine();
            Console.Write("Shift: ");
            int backShift = int.Parse(Console.ReadLine());
            Console.WriteLine(Decode(coded, backShift));
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: warning-decode-never-called
stdin: "1\nHELLO\n3\n2\n9\n"
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine(Encode(message, shift));
            break;
        case "2":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: stubs-compile
stdin: "1\nHELLO\n2\nKHOOR\n9\n"
// Each method's first line is written; each body is a placeholder.
static string Encode(string message, int shift)
{
    return "";
}

static string Decode(string message, int shift)
{
    return "";
}

static int ReadShift()
{
    return 0;
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.WriteLine(Encode(message, ReadShift()));
            break;
        case "2":
            Console.Write("Message: ");
            string coded = Console.ReadLine();
            Console.WriteLine(Decode(coded, ReadShift()));
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: stub-that-does-not-fit
expect: CS1503
static string Encode(string message, int shift)
{
    return "";
}

string message = "HELLO";
string shift = "3";
Console.WriteLine(Encode(message, shift));
```

```csharp exec
id: edge-shift-below-zero
static string EncodeWithoutPlus26(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)((position + shift) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

Console.WriteLine(EncodeWithoutPlus26("ABC", -3));
Console.WriteLine(Encode("ABC", -3));
Console.WriteLine($"[{Encode("", 3)}]");
```

```csharp exec
id: edge-word-for-a-number
stdin: "1\nHELLO\nthree\n"
expect: exception
string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine($"{message} {shift}");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: edge-word-for-a-number-tryparse
stdin: "three\n3\n"
int shift;
Console.Write("Shift: ");
while (!int.TryParse(Console.ReadLine(), out shift))
{
    Console.Write("Please type a whole number: ");
}
Console.WriteLine($"The shift is {shift}.");
```

```csharp exec
id: pixel-art-first-version
stdin: "1\n9\n"
// Takes a picture, one string for each row. Returns nothing: it prints
// the picture.
static void Draw(string[] picture)
{
    foreach (string row in picture)
    {
        Console.WriteLine(row);
    }
}

string[] heart =
{
    ".#...#.",
    "###.###",
    "#######",
    ".#####.",
    "..###..",
    "...#...",
};

string choice;
do
{
    Console.WriteLine("1. Draw the picture");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Draw(heart);
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```
