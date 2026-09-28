# the-team-project: notes for a reviewer

Written from dewlab `tutorials/the-team-project/` (version
2026.09.26.1): the page and its glossary file. dewlab has no practice page
for it, and the course map gives it none (a brief has no practice page).
The brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row
28): action *adapt*, shape *brief*, size S, batch 9, worlds none, depends
on `from-cells-to-a-program`, "One cell" to rework. The folder did not
exist when this run started, so there was no partial draft to finish; the
page was written from the start.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The lesson is `lessons/the-team-project/the-team-project.md`, its recorded
outputs are `lessons/the-team-project/the-team-project.outputs.json`
(written by the browser checker), and this file was the draft's
`NOTES.md`. The two `*.native.json` files were deleted: the browser
checker's outputs file replaces them. "What was done when it moved", just
below, says what changed in the move; the rest of this file is the
porter's, with the open questions settled where the playbook, the course
map, the style guide or the exemplars answer them.

Files:

- `the-team-project.md`: the lesson. 1 exec cell (a program cell that
  reads input, with `stdin:`), 2 `csharp` fences to read, 1 table, 1 task
  list. No predict, hint, solution, `inputs`, fold or challenge, as in
  dewlab's page. No cell is meant to fail.
- `the-team-project.outputs.json`: what the browser checker recorded.

In the draft, the cell was run with NativeCheck, and so were the probes; the last line
was "No problems." for each file, and again with `--json` for each. The
page also went through the real parser, `web/lesson/parse.js`
(`parseLesson`, with the page id), with no errors: one cell, two
read-only fences, and the Markdown between them. The cell does not use
`Console.ReadKey`, `Clear` or colours, so nothing on the page is beyond
what NativeCheck can run.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write the-team-project`
  ran the one cell in the real engine: it ran, as NativeCheck said, and
  printed the same lines. The one difference is the one this file
  expected under "Once the page UI exists": the page shows each typed line
  after its prompt (`Where now? north`), and NativeCheck did not. No cell
  changed, so `version:` stays `2026.09.27.1`.
- **The probes ran in the browser too**, in a scratch lesson made from the
  "Probes" section below (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`). Every result matches NativeCheck's: the
  same lines of output, the same `ArgumentNullException` (`Value cannot be
  null. (Parameter 'key')`) for `p-no-null-check`, and CS7036 at (3,14),
  CS1503 at (3,25) and CS0117 at (3,14) for the three changed signatures.
- **Links.** The four pages the brief names are all being moved into
  `lessons/` in this round, so each italic name became a link (decision 32
  applies only to a page that isn't in `lessons/`). See "Links" below.
- **"Templates for a team" is not the last section** of *A whole program*
  ("Looking back" and "Where to read more" follow it), so step 3 now says
  "its section", not "its last section".
- **The `null` way out** says how the input ends on the page, in
  `from-cells-to-a-program`'s words: `Console.ReadLine()` gives `null` when
  there is no more input, "on this page, when you press **End input**".
- **The answer to the `North` question** is now quoted from the recorded
  output: "the program answers `You cannot go North`".
- **Codebreaker** is named as "the game on A whole program", and the
  paragraph on Visual Studio now says what shape Codebreaker has (`Cipher.cs`,
  `Game.cs`, `Program.cs`) before it points to that page's steps. A reader
  who opens this page first would not know the name.
- **A pointer to the next page**, at the end of "A last thing": *Mixed
  problems* (short title, in italics: `mixed-working-in-a-team` is not
  written), "the last of this series", whose problems are about working in
  a team. The exemplars and `critique-and-reflection` each name the page
  that comes next; see "No challenge" below.
- **The page was looked at** with `npm run serve` at 1200 and 390 pixels
  wide: the table fits at phone width with no sideways scroll, the two
  fences to read sit between the paragraphs after the list, the ten
  `lesson:` links point where they should, and the five boxes of the task
  list are `disabled` (the page neither saves nor scores them). The
  console showed no errors.

## Frontmatter

- `title`: the course map's, "The team project: a brief". dewlab's was
  "The Team Project".
- `version: 2026.09.27.1`, as the task asked. Today is 28 September; the
  other drafts of this batch kept the task's value too.
- `from: the-team-project`.
- No `worlds`. The course map's entry says *none*, and "Lessons with no
  worlds" gives the reason: a brief is the learner's own work. The task
  text said to keep secret messages and pixel art unless the map says
  otherwise; it does.
- `covers: [PDP-LO12, PDP-LO7]`, from the course map. dewlab's
  per-section map gave only PDP-LO12; the map adds LO7 ("develop
  documented programs"), which the release checklist and Release 3 serve.
- dewlab's `year:` is dropped: the format has no such field.

## Links

In the draft, none of the four pages this one names was in `lessons/`, so
each was an italic short title (decision 32). When the page moved, all
four were being moved in the same round, so each is now a link. Until the
other three land, `npm run check-lessons -- the-team-project` reports the
links to them; `critique-and-reflection` was already in `lessons/`.

| Where | Link now |
|---|---|
| "What you are being asked to do" (twice), after the Release 1 cell, step 3, the review checklist sentence, the Microsoft reading | `[A whole program](lesson:from-cells-to-a-program)` |
| "Reviewing each other's work", first paragraph; "After the last release" | `[Code review](lesson:critique-and-reflection)` |
| review question 2 | `[Exceptions](lesson:reading-an-error-message)` |
| review question 2 | `[Debugging](lesson:when-it-goes-wrong)` |

The one italic name left is *Mixed problems* (`mixed-working-in-a-team`,
not written), at the end of "A last thing".

dewlab's two links to `from-cells-to-a-program#templates-for-a-team`
had an anchor. The format documents `lesson:<id>` with no anchor, so the
page names the section in words instead: "(its last section, 'Templates
for a team')". See open question 3.

Links the other way: `from-cells-to-a-program` names *The team project*
in italics ("Looking back"), and so does `critique-and-reflection` (Part 3,
"Next comes *The team project*"). Now that this page is in `lessons/`,
each can become `[The team project](lesson:the-team-project)`; that is an
edit to those pages, not made here.

## What changed, and why

### The thread

dewlab's brief says what to build (a small game or tool, three to five
people), why three releases, how to share the work, how to review it,
and what to ask at the end. The C# page keeps all of it, in the same
order, under the same headings, with most of dewlab's sentences. The map
asks for four changes, and each is made: Release 1 is C# with real
input; the team builds in Visual Studio, one `static class` per person in
its own file, in one project; the page says the team needs one shared
place, chosen by the college, and leaves submission to the teacher; and
the interface agreement starts from a method signature.

### Section by section

**Opening.** Kept. "A group" became "a team", as in the map. "Written
down here so that you can come back to it" became "written here so that
you can return to it", "what is handed in" became "what you
submit", and "questions to look back with" became "questions to ask at
the end" (no phrasal verbs, `#voice`). "The two that people most often
underestimate" became "People most often underestimate two of them":
the subject first.

**What you are being asked to do.**

- The four ideas are kept. The text adventure has `while (true)` for
  `while True`. The pixel-art editor keeps its picture in a `char[,]`,
  not "a list of lists": a string cannot be changed, so an editor that
  changes one pixel needs a grid of `char`, and `grids-and-references`
  teaches `char[,]`. The quiz keeps its questions "in an array".
- "in one of the worlds" is dropped: two of the four ideas (the text
  adventure and the quiz) are in neither PDP world, and the page has no
  worlds.
- "Programming Foundations and From cells to a program" became "the pages
  before this one, up to *A whole program*": dewsharp's PDP has no series
  of that name.
- New: a paragraph on building it in Visual Studio (the map's "one
  `static class` per person in its own file, in one project"), which
  defines *project* again in one sentence (dewsharp has no glossary
  panel), names `Rooms.cs`, `Score.cs` and `Program.cs`, and points to
  *A whole program* for the steps (open, run, add a file). The page gives
  no steps of its own: `from-cells-to-a-program` has them, and a second
  copy would drift.
- New: the paragraph on one shared place, from the map. It names no
  product (OneDrive, Teams, GitHub, a network drive), because the map
  says it is the college's choice. It says the teacher will say how to
  submit, as the map's "leaves submission to the teacher" asks, and as
  the teacher notes ("Submitting work") expect: one Visual Studio
  project, with its change log.
- "Small is important" is kept. "how the pieces fit together" became
  "how the pieces connect" (phrasal verb).
- "Some ideas go wrong in the same ways" became "fail in the same ways"
  (`a-program-of-your-own` made the same change).

**Three releases, not one deadline.**

- The definition of *release* and the table are kept. "on the day it
  comes out" became "on the day it appears".
- The release checklist gains C#'s words: "works" became "compiles, and
  runs to the end with no exception" (the style guide's names for what
  Run can do); a new line, "shows no warning that the team has not read"
  (from the release checklist on `a-program-of-your-own` and the review
  checklist on `from-cells-to-a-program`); the version number and date
  go "in a comment at the top of `Program.cs`" (as `a-program-of-your-own`
  asks); "is kept after the next release comes out" became "is kept, as a
  copy of the whole project, after the next release appears". *Change
  log* is defined in the checklist, in a clause.
- `three-releases-not-one-deadline-1` keeps its id: the task is the same.
  `typed`, `ask()` and its docstring go (the map; "What PDP leaves out").
  The rooms are a `Dictionary<string, Dictionary<string, string>>`, as
  the map says, written with `new Dictionary<string, string> { ... }` for
  each room so the reader sees the inner type (the style guide writes
  every type in PDP, and `looking-things-up-by-name` writes nested values
  the same way: `['#'] = new int[] { 0, 0, 0 }`). `", ".join(exits[room])`
  became `string.Join(", ", exits[room].Keys)`, in a variable of its own,
  `exitList`, to keep the line short. `move in exits[room]` became
  `ContainsKey`, which `looking-things-up-by-name` teaches. The loop's
  way out is `move == null || move == "quit"`, as on
  `from-cells-to-a-program`: without the `null` check, **End input** would
  stop the program with an `ArgumentNullException` from `ContainsKey`
  (probe `p-no-null-check`). The prompt uses `Console.Write`, so the
  answer stays on the prompt's line.
- `stdin:` is dewlab's typed answers (north, east, south, quit) with
  `North` added before quit, because the prose now asks "What happens if
  you type North, with a capital letter?". With real input, a reader types
  whatever they like, and this is the first thing a player of a text
  adventure tries. The answer is the cell's own output (`You cannot go
  North`), and the paragraph under the cell names the reason (a key must
  match exactly). Release 2's list gains "moves that work however they are
  typed", which is the question's other half. This is the one question
  added to dewlab's page.
- The paragraph under the cell is new: it defines *dictionary of
  dictionaries*, says what `exits["hall"]["north"]` and
  `exits[room].Keys` are (probe `p-nested-lookup`), and names the `null`
  way out. dewsharp has no glossary panel, and the nested type is the one
  thing on the page a reader has not met.
- dewlab's closing paragraph is kept. "things to pick up" became "things
  to collect", "docstrings" became "XML comments", "tests" became "checks
  for the parts that can be tested with no typing, as Codebreaker's
  Release 3 did" (from-cells-to-a-program's `Test.Check`), and "you find
  out in week two ... when two people's code does not fit together" became
  "if two people's code does not work together, you learn it in week two".
- New: a paragraph saying the one cell could already be two files
  (`Rooms.cs` and `Program.cs`), and that **Download project** gives a
  team that chooses the adventure a project to start from.

**Working on one thing at once.** Kept, four steps.

- Step 1 names a file for each person: "Ciara writes the rooms in
  `Rooms.cs`, Dev writes the menu in `Program.cs`, Maeve writes the score
  in `Score.cs`".
- Step 2: "function" became "method", and the method's first line is
  named its *signature* (the map: "its interface agreement is a method
  signature"). `from-cells-to-a-program` defines *signature* the same
  way, and this page defines it again (no glossary panel).
- Step 3 gives the interface agreement a one-clause definition, since
  the page cannot link to it yet. "Write that agreement down" became
  "Record that agreement", and "write down what you agreed" (in the
  review section) "record what you agreed" (phrasal verbs).
- Step 4 is kept, with a C# turn: one file for each person makes two
  people in one file less likely, but everybody needs `Program.cs`.
  "I'm in the scoring code" became "I'm changing Program.cs".
- My first version put the signature and the placeholder inside steps 2
  and 3, as indented fences. The parser takes an indented fence out of
  its list item (it becomes a read-only item of its own, with the indent
  kept in its code), which breaks the list in two. So both fences now come after the
  list, in a short passage of their own: the signature
  `public static string Move(string room, string direction)`, what it
  takes and returns, and `Rooms` with a *placeholder* body (a term from
  `a-program-of-your-own`, defined again here). Probes
  `p-rooms-placeholder` and `p-menu-with-placeholder` show that the
  placeholder compiles and a menu can call it; `p-rooms-real` and
  `p-menu-with-real-rooms` show that a real body replaces it with no
  change to the menu, and that `Move` returning `room` for "no exit" is
  enough for the menu to say `You cannot go east`.
- The last paragraph gains two sentences: the compiler helps to keep the
  agreement, because a call that no longer matches does not compile, and
  the message names the line with the call. Probes
  `p-call-after-new-parameter` (CS7036), `p-call-after-new-type` (CS1503)
  and `p-call-after-new-name` (CS0117) change the signature three ways,
  and each message is at line 3 of the calling cell, the call. Only
  CS7036 and CS0117 name `Move` in their text, so the prose says the
  message names the *line*, not the method.

**Reviewing each other's work.**

- "not to find fault" became "not to judge the person who wrote it"
  (idiom); "follow what a function does" became "understand what a
  method does".
- New: one sentence pointing back to *Code review*, the page before this
  one, which practised a review with a partner (dewlab's page did not
  mention it, though it sits in the same place in dewlab's series).
- New: a short paragraph on what the compiler has already checked
  (every call matches a signature) and what a review checks that the
  compiler cannot. This is the C# version of the review's purpose.
- The three questions are kept. "docstring" became "XML comment"; "an
  empty list" became "an empty array", and `null` when the input ends is
  added, as in `from-cells-to-a-program`'s checklist. dewlab's two links
  are *Exceptions* and *Debugging*, by their dewsharp short titles.
  "worth catching" became "worth finding".
- "the two scoring functions" became "methods".

**After the last release.** Kept, with one new sentence: if the reader
wrote down, on *Code review*, what they were curious or worried about,
they read it again now. The `critique-and-reflection` draft, which
appeared in `drafts/lessons/` while this page was being written, ends
with that task ("Read them again at the end of the project"), and this
is the end of the project. If that part of *Code review* changes, this
sentence changes with it. "Where did the time go, compared with
where you thought it would go?" became "What took most of your time,
compared with what you expected?", and "With the same brief and a fresh
start" became "If you started again with the same brief" (both idioms).

**A last thing.** Kept. "the most expensive thing that goes wrong"
became "the most expensive problem a team can have".

**Where to read more.** Three sources, each checked on 28 September 2026:

- Fowler's *Continuous Integration*, kept, now dated 2024: the page says
  "Last significant update: 18 January 2024", a rewrite of the 2006
  version dewlab cites. A sentence is new: it is written for
  professionals, and its first section, "Building a Feature with
  Continuous Integration", is the place to start.
- New: Microsoft's *Common C# code conventions* (the page's heading; its
  `<title>` is ".NET Coding Conventions"), for the checklist's "points to
  C# sources that exist, such as Microsoft Learn". It says a team can take
  the conventions as they are or change them, which fits a team agreeing
  its own in the charter. It uses `var` in places, which the entry says,
  as `from-cells-to-a-program` does for its Microsoft tutorial.
- Tantacrul's *How We Designed Audacity 4*, kept. Its title and channel
  were checked through YouTube's oEmbed; its length ("about fifty-three
  minutes") and year (2025) are dewlab's, and I could not check them
  here (open question 6).

### No challenge, and a pointer to the next page

The style guide asks every page to end with somewhere to go: a practice
page, a challenge, and one thing to read. dewlab's brief has neither a
practice page nor a challenge, and the course map gives it neither
("Practice pages and mixed sets": a brief has no practice page); the
project is the task. I added none. In the draft, the page did not name the
next page either. When it moved, one sentence was added at the end of "A
last thing": "The next page, *Mixed problems*, is the last of this series.
Its problems are about working in a team: reading, checking and reviewing
code that somebody else wrote." The exemplars end by naming what comes
next (`first-steps`: "Later, *Variables and types* ..."), and so does
`critique-and-reflection`. The sentence says only what the course map's
entry for `mixed-working-in-a-team` promises ("Problems about other
people's code"), so it should hold when that page is written.

## The glossary file

dewsharp has no glossary panel yet (`LESSON_FORMAT.md`), so every term
is defined in the prose where it first appears. dewlab's entries:

| dewlab entry | Here |
|---|---|
| brief | the first paragraph |
| release | the first paragraph of "Three releases, not one deadline" |

New terms, each defined where it first appears: *project*, *change log*,
*dictionary of dictionaries*, *signature*, *interface agreement*,
*placeholder*, and *team charter* (in the Microsoft reading).

## What C# made different, in short

- Real input: `Console.ReadLine()` in place of `ask()` over a `typed`
  list, and `stdin:` for the checker. `ReadLine` gives `null` when the
  input ends, so the loop needs a way out for `null`, or `ContainsKey`
  stops it with an `ArgumentNullException`.
- Types written out: the rooms are a
  `Dictionary<string, Dictionary<string, string>>`, which the prose
  names and explains.
- Keys match exactly: `North` is not `north`, which gave the page its one
  question.
- A team's program is files: one `static class` per person, and one
  `Program.cs` with the statements; the interface agreement starts from a
  signature; a placeholder body lets the caller compile on day one.
- The compiler checks the agreement: a call that no longer matches the
  signature does not compile (CS7036, CS1503, CS0117), at the line of the
  call.
- A picture that can be edited is a `char[,]`, because strings cannot be
  changed.
- docstrings become XML comments.

## Where each claim comes from

From the browser checker's run of the lesson
(`three-releases-not-one-deadline-1`, with
`stdin: "north\neast\nsouth\nNorth\nquit\n"`), recorded in
`the-team-project.outputs.json`:

```text
You are in the hall. Exits: north
Where now? north
You are in the library. Exits: south
Where now? east
You cannot go east
You are in the library. Exits: south
Where now? south
You are in the hall. Exits: north
Where now? North
You cannot go North
You are in the hall. Exits: north
Where now? quit
Goodbye.
```

The prose quotes one line of it, `You cannot go North`, under the cell.
`exits["hall"]["north"]` is `"library"` and "`exits[room].Keys` is the
directions out" agree with the first three lines. The page has no number that comes from
code: "three to five", "three releases", "week two", "week six" and
"three weeks" are the brief's own.

From the probes at the end of this file (NativeCheck, and the browser
checker in a scratch lesson, with the same results):

- `exits["hall"]["north"]` is `"library"`: `p-nested-lookup` printed
  `library`, and `north` for `string.Join(", ", exits["hall"].Keys)`.
- The `null` way out: `p-release-1-no-input` (no `stdin:`) printed the
  first room and `Goodbye.`; `p-no-null-check`, the same loop without
  `move == null`, stopped with `System.ArgumentNullException: Value
  cannot be null. (Parameter 'key')` when the input ended.
- The placeholder compiles, and a menu can call it: `p-rooms-placeholder`
  checked, and `p-menu-with-placeholder` printed `You cannot go north`.
- The real body replaces it with no change to the menu:
  `p-menu-with-real-rooms`, the same menu, printed `You are in the
  library.`, then `You cannot go east`.
- A changed signature does not compile, at the call:
  `p-call-after-new-parameter(3,14): error CS7036: There is no argument
  given that corresponds to the required parameter 'steps' of
  'Rooms.Move(string, string, int)'`;
  `p-call-after-new-type(3,25): error CS1503: Argument 2: cannot convert
  from 'string' to 'char'`;
  `p-call-after-new-name(3,14): error CS0117: 'Rooms' does not contain a
  definition for 'Move'`. Line 3 of each cell is
  `room = Rooms.Move(room, move);`.

## Once the page UI exists

Each of these was checked when the page moved (28 September 2026).

- **The typed lines.** NativeCheck does not echo `stdin:`; the page does.
  The recorded output shows each typed line after its prompt (`Where now?
  north`). Nothing in the prose quotes a line with a prompt in it.
- **Download project.** The project is called
  `TheTeamProjectThreeReleasesNotOneDeadline1` (`projectName` in
  `web/page/project.js`, from the page id and the cell id). Whether it
  builds in Visual Studio was not checked here: this machine has no Visual
  Studio. Decision 38 says the project from the page tests builds with no
  warnings and prints what the page printed, and this cell has no types
  cells above it. Renaming it is open question 5.
- **The two read-only fences** show as code to read, with no Run or Check,
  between the paragraphs after the numbered list.
- **The task list** ("Every release") renders as `disabled` boxes: the page
  neither saves nor scores them.
- **The table** fits at 390 pixels wide, with no sideways scroll.

## Open questions for a reviewer

The porter's eight questions, each with what was decided when the page
moved, and what the decision rests on. What none of the documents
answers is under "Open", at the end of this section, for Josh.

1. **The added question about `North`.** dewlab's brief asks no question
   about its cell. With real input, a reader will type anything, and a
   text adventure invites `North`; the question costs one line of
   `stdin:` and one sentence. If a reviewer wants the brief to stay a
   brief, drop the question, `North` from `stdin:`, and the sentence
   "A key must match exactly ...".

   *Decided: keep it.* The style guide's first rule of voice is "Invite,
   and wait. Ask a question, give the reader something to try, and let
   the code answer", and the course map's entry asks for "real input".
   The answer is now quoted from the recorded output (`You cannot go
   North`). It is a question in the prose, not a `predict` block, so the
   page still has none, as dewlab's brief has none.

2. **The signature and the placeholder are code to read**, not cells,
   because the map says "One cell" and a brief teaches no new code. As a
   types cell and a program cell they would give the reader a Check and
   a Run, and the page would show the two-file shape working (the probes
   `p-rooms-placeholder` and `p-menu-with-placeholder` are those cells,
   ready to move). The cost is two cells on a page the map sizes at one.

   *Decided: code to read.* The course map's entry says "Cells and blocks
   to rework: One cell" and "Size: S", and the playbook's checklist keeps
   the dewlab page's cells unless the entry says otherwise. The claims the
   fences support (it compiles; a changed signature stops the call
   compiling) were run in the browser engine, in the probes.

3. **Anchors in `lesson:` links.** dewlab linked
   `from-cells-to-a-program#templates-for-a-team`. `LESSON_FORMAT.md`
   documents `[text](lesson:<id>)` only. If the page and the checker
   accept `lesson:<id>#<heading>`, step 3 and the review checklist
   sentence could link to the section directly when the links are made.

   *Decided for this page: no anchor.* `LESSON_FORMAT.md` documents
   `lesson:<id>` only, and says "If something is not described here, it
   is not part of the format", so the links go to the page and name the
   section in words. The code would already accept an anchor:
   `web/page/markdown.js` allows `lesson:<id>#...` and gives each heading
   an id (`templates-for-a-team`), `web/page/lesson.js` scrolls to
   `location.hash` after rendering, and the checker's link test reads
   only the id. Whether to document it is under "Open".

4. **"Signature" in its everyday sense.** In the C# specification, a
   method's signature is its name and its parameters' types, not its
   return type or `public static`. This page and
   `from-cells-to-a-program` both call the whole first line the
   signature, because that is what an interface agreement writes down.
   A reader who meets the stricter meaning later may notice.

   *Decided: keep the whole first line.* The course map's entry for
   `from-cells-to-a-program` calls `public static bool PlayRound(string
   word)` "the method's signature", and this page's entry says "its
   interface agreement is a method signature". Both pages now use the
   word the same way.

5. **Renaming a downloaded project.** A team that starts from
   **Download project** gets a project named after the cell. Neither this
   page nor `from-cells-to-a-program` says how to rename it in Visual
   Studio. It may belong on `from-cells-to-a-program`, beside "add a file
   to a project"; I did not add it here, to keep the brief a brief.

   *Not decided here*: see "Open". The name is
   `TheTeamProjectThreeReleasesNotOneDeadline1`.

6. **The video's length and year** ("about fifty-three minutes", 2025)
   are dewlab's. The title and channel were checked; the length could not
   be read here (the YouTube page gave no length to a plain request, and
   the YouTube tool had no credits). Someone with a browser can check it
   in a moment.

   *Still not checked.* On 28 September 2026 the title and channel were
   confirmed again through YouTube's oEmbed ("How We Designed Audacity
   4", Tantacrul), but the watch page answered with a captcha, and the
   YouTube tool again had no credits. The other two readings were checked:
   both addresses answer, Microsoft's page is headed *Common C# code
   conventions* and says "You can take our conventions as-is, or modify
   them to suit your team's needs", and Fowler's first section is
   "Building a Feature with Continuous Integration", with a 2024 update
   date. See "Open".

7. **One shared place.** The map leaves it to the college, and the page
   names nothing. If the college has chosen (a Teams channel, OneDrive,
   GitHub), a teacher note in `COURSE_MAP.md` could say so, and the page
   could name it. Two people opening the same synced project at the same
   time in Visual Studio can cause file conflicts; if the college's choice
   is a synced folder, a sentence on that may help.

   *Decided for the page: it names nothing.* The course map's entry says
   "The page says the team needs one shared place for the project (the
   college's choice) and leaves submission to the teacher", and the
   teacher notes ("Submitting work") agree. Whether the college has chosen
   is under "Open".

8. **The Release 1 cell has 28 lines of code**, against the style
   guide's five to fifteen. It is a whole program, and dewlab's had 24
   (with its `ask()` stand-in); C#'s braces add the rest. Splitting it
   would hide what the prose asks the reader to see: that the whole of
   Release 1 fits in one small program.

   *Decided: keep it whole.* The style guide's test for splitting is "a
   cell with two ideas in it wants to be two cells", and this cell is one
   idea, Release 1. It also must work on its own (`#code`, and rule 3:
   variables stay in their cell), so the dictionary can't move to a cell
   above. The braces on their own lines, which make it long, are the
   style guide's own rule. `from-cells-to-a-program`'s whole-program cells
   are as long or longer: 25 to 43 lines in its draft of 28 September.

Two more, found when the page moved:

9. **No `predict` on the page.** The style guide asks for two or three
   guesses on a page, and the playbook's checklist for "two or three
   predicts". *Decided: none.* The page is a brief, dewlab's has none,
   the course map's entry lists one cell to rework and no blocks, and the
   checklist's first item keeps the dewlab page's predicts unless the
   entry says otherwise. The `North` question does the inviting.

10. **The `planned:` line in `courses/pdp.yaml`** (`the-team-project: "The
    team project: a brief"`) should go now that the lesson is in
    `lessons/` (the playbook's checklist). This move was told not to edit
    the course files, so it is left for the orchestrator.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **Anchors in `lesson:` links** (question 3). The page code and the
  checker already accept `lesson:<id>#<heading>`; `LESSON_FORMAT.md` does
  not say so. Documenting it would let step 3 and the review checklist
  sentence here link to `from-cells-to-a-program#templates-for-a-team`, as
  dewlab did. The cost: a heading renamed on one page would silently break
  the anchor on another, since the checker tests only the id.
- **Renaming a downloaded project** (question 5). A team that starts from
  **Download project** here gets `TheTeamProjectThreeReleasesNotOneDeadline1`.
  Should `from-cells-to-a-program` say how to rename a project in Visual
  Studio, beside "add a file to a project"? Or should the name come from
  something shorter?
- **The video's length and year** (question 6): "about fifty-three
  minutes" and 2025 are dewlab's, and still unchecked.
- **The college's shared place** (question 7). If the college has chosen
  one (a Teams channel, OneDrive, GitHub), a teacher note in
  `COURSE_MAP.md` could name it, and a sentence could warn that two people
  opening one synced project at the same time in Visual Studio can cause
  file conflicts.

## Probes

Each cell below checks a claim in the prose that the page's one cell does
not print. They were run with NativeCheck (passing the draft's `NOTES.md`
as the file) and, when the page moved, with the browser checker: copy
this section into a scratch lesson under a frontmatter with a `title:`
and a `version:`, and run `node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`. The cells with `expect:` fail on purpose. None
of them is part of the page.

The dictionary of dictionaries, looked up twice, and its keys joined:

```csharp exec
id: p-nested-lookup
Dictionary<string, Dictionary<string, string>> exits = new()
{
    ["hall"] = new Dictionary<string, string> { ["north"] = "library" },
    ["library"] = new Dictionary<string, string> { ["south"] = "hall" }
};
Console.WriteLine(exits["hall"]["north"]);
Console.WriteLine(string.Join(", ", exits["hall"].Keys));
```

Release 1 ends quietly when the input ends at once (no `stdin:`):

```csharp exec
id: p-release-1-no-input
Dictionary<string, Dictionary<string, string>> exits = new()
{
    ["hall"] = new Dictionary<string, string> { ["north"] = "library" },
    ["library"] = new Dictionary<string, string> { ["south"] = "hall" }
};

string room = "hall";
while (true)
{
    string exitList = string.Join(", ", exits[room].Keys);
    Console.WriteLine($"You are in the {room}. Exits: {exitList}");
    Console.Write("Where now? ");
    string move = Console.ReadLine();
    if (move == null || move == "quit")
    {
        break;
    }
    if (exits[room].ContainsKey(move))
    {
        room = exits[room][move];
    }
    else
    {
        Console.WriteLine($"You cannot go {move}");
    }
}
Console.WriteLine("Goodbye.");
```

Without `move == null`, the end of the input stops it with an exception:

```csharp exec
id: p-no-null-check
stdin: "north\n"
expect: exception
Dictionary<string, Dictionary<string, string>> exits = new()
{
    ["hall"] = new Dictionary<string, string> { ["north"] = "library" },
    ["library"] = new Dictionary<string, string> { ["south"] = "hall" }
};

string room = "hall";
while (true)
{
    string exitList = string.Join(", ", exits[room].Keys);
    Console.WriteLine($"You are in the {room}. Exits: {exitList}");
    Console.Write("Where now? ");
    string move = Console.ReadLine();
    if (move == "quit")
    {
        break;
    }
    if (exits[room].ContainsKey(move))
    {
        room = exits[room][move];
    }
    else
    {
        Console.WriteLine($"You cannot go {move}");
    }
}
```

The placeholder from "Working on one thing at once", as Ciara's
`Rooms.cs`, and Dev's menu calling it:

```csharp exec
id: p-rooms-placeholder
file: Rooms.cs
static class Rooms
{
    public static string Move(string room, string direction)
    {
        // A placeholder: the player stays where they are.
        return room;
    }
}
```

```csharp exec
id: p-menu-with-placeholder
stdin: "north\nquit\n"
string room = "hall";
while (true)
{
    Console.WriteLine($"You are in the {room}.");
    Console.Write("Where now? ");
    string move = Console.ReadLine();
    if (move == null || move == "quit")
    {
        break;
    }
    string next = Rooms.Move(room, move);
    if (next == room)
    {
        Console.WriteLine($"You cannot go {move}");
    }
    room = next;
}
Console.WriteLine("Goodbye.");
```

The real body replaces the placeholder (rule 4), and the same menu works
with no change:

```csharp exec
id: p-rooms-real
file: Rooms.cs
static class Rooms
{
    // For each room: where each of its exits leads.
    static Dictionary<string, Dictionary<string, string>> exits = new()
    {
        ["hall"] = new Dictionary<string, string> { ["north"] = "library" },
        ["library"] = new Dictionary<string, string> { ["south"] = "hall" }
    };

    public static string Move(string room, string direction)
    {
        if (exits[room].ContainsKey(direction))
        {
            return exits[room][direction];
        }
        return room;
    }
}
```

```csharp exec
id: p-menu-with-real-rooms
stdin: "north\neast\nsouth\nquit\n"
string room = "hall";
while (true)
{
    Console.WriteLine($"You are in the {room}.");
    Console.Write("Where now? ");
    string move = Console.ReadLine();
    if (move == null || move == "quit")
    {
        break;
    }
    string next = Rooms.Move(room, move);
    if (next == room)
    {
        Console.WriteLine($"You cannot go {move}");
    }
    room = next;
}
Console.WriteLine("Goodbye.");
```

Ciara changes the signature three ways, and Dev's call, which has not
changed, does not compile. Each message is at line 3, the call:

```csharp exec
id: p-rooms-new-parameter
file: Rooms.cs
static class Rooms
{
    public static string Move(string room, string direction, int steps)
    {
        return room;
    }
}
```

```csharp exec
id: p-call-after-new-parameter
expect: CS7036
string room = "hall";
string move = "north";
room = Rooms.Move(room, move);
Console.WriteLine(room);
```

```csharp exec
id: p-rooms-new-type
file: Rooms.cs
static class Rooms
{
    public static string Move(string room, char direction)
    {
        return room;
    }
}
```

```csharp exec
id: p-call-after-new-type
expect: CS1503
string room = "hall";
string move = "north";
room = Rooms.Move(room, move);
Console.WriteLine(room);
```

```csharp exec
id: p-rooms-new-name
file: Rooms.cs
static class Rooms
{
    public static string Go(string room, string direction)
    {
        return room;
    }
}
```

```csharp exec
id: p-call-after-new-name
expect: CS0117
string room = "hall";
string move = "north";
room = Rooms.Move(room, move);
Console.WriteLine(room);
```
