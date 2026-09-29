# mixed-working-in-a-team: notes for a reviewer

A new page, written on 29 September 2026 from the course map's entry (PDP
lesson 29, the last page of the series "Working in a team", and the last
page of PDP). Action *new*, shape *mixed set*, size S, batch 9, no worlds.
A mixed set has no practice page ("Practice pages and mixed sets" in
`planning/COURSE_MAP.md`), so there is one page.

Files:

- `lessons/mixed-working-in-a-team/mixed-working-in-a-team.md`: the page,
  version `2026.09.28.1` (the version the task set). The cells were tried
  first in a scratch copy of the page, and no cell's code changed after the
  page was first recorded in `lessons/`, so the version did not go up.
  Later edits were to prose, block order and solution titles only.
- `lessons/mixed-working-in-a-team/mixed-working-in-a-team.outputs.json`,
  written by the browser checker.

`npm run check-lessons -- mixed-working-in-a-team` reports no problems (13
runs). I also opened the page in headless Chromium (`node tools/serve.mjs
--port 8763 --isolate`, `lesson.html?sw=off&id=mixed-working-in-a-team`):
no page errors, and pressing **Run** on problem 1's program cell shows the
report that the answer fold quotes, word for word, including `at line 20
of Rooms.cs (in Rooms.Move(string, string))`.

## What the page does, in order

The page follows one team, Ciara, Dev and Maeve, the names that
`the-team-project` already uses for its example split ("Ciara writes the
rooms in `Rooms.cs`, Dev writes the menu in `Program.cs`, Maeve writes the
score in `Score.cs`"), building that page's text adventure. Every problem
is about code that one of them wrote and another reads. The opening says
that each problem needs more than one page and doesn't say which (the
wording of the other two PDP mixed sets), that problems 4 and 5 ask for
writing and suit pairs, and that two cells are meant to stop with an
exception.

| # | Problem | Cells | What the reader does | From |
|---|---|---|---|---|
| 1 | A method that breaks its agreement | `a-method-that-breaks-its-agreement-1` (types, `Rooms.cs`), `…-1-program` (`expect: exception`) | reads an interface agreement, runs Dev's one-line-per-case checks, reads a `KeyNotFoundException` report that names a line in `Rooms.cs` and a line in `Program.cs`, decides whose code changes, fixes `Move` with `TryGetValue`; `inputs` with a `// throws` case | entry, item 1; the interface agreement of `from-cells-to-a-program` and `the-team-project`; dewlab `code-other-people-can-read-practice` 5 ("which part is the promise?") |
| 2 | Two methods, one job | `two-methods-one-job-1` (types, `Score.cs`), `…-1-program` | predicts `2 of 3: 66 67` (whole-number division against `Math.Round`), then says which method to keep and writes a review comment | entry, item 2; review question 3 of `the-team-project`; dewlab `code-other-people-can-read` ("we have this already") |
| 3 | A menu and the end of the input | `a-menu-and-the-end-of-the-input-1` (`stdin: "North\n"`, `expect: exception`) | Dev's Release 2 adds `.Trim().ToLower()` to the `ReadLine` line, so the `null` check on the next line is too late and can never be true; the reader moves the check | entry, item 3; `reading-input`'s "When there is no more input"; `from-cells-to-a-program`'s question about **End input** |
| 4 | A change log from two versions | `a-change-log-from-two-versions-1` | predicts `[Otter] for Otter: True False`, writes the Release 3 change log entry, and finds the XML comment that no longer describes the code | entry, item 4; `from-cells-to-a-program`'s change log; dewlab `building-it-together`'s release notes |
| 5 | A method to review | `a-method-to-review-1` (a CS0219 warning on purpose) | reviews Maeve's `stars` with the checklist and the coding standard, writes review comments (what you saw, why it matters, what you suggest), then refactors it into `Stars`; `inputs` include 0 rounds played | entry, item 5; dewlab `code-other-people-can-read` (the review of `m`, review comments, refactoring, magic numbers) and its practice 3 and 7 |

Then a fold with the pages each problem uses (as on both other PDP mixed
sets), and the close: a question, a challenge (the team's agreements as a
class with placeholder bodies, and one check per case), a paragraph on
Visual Studio, a pointer to FOOP's `objects-and-classes` (where a PDP
learner starts, by the course map's teacher notes), and three things to
read.

Counts: 7 exec cells (2 types, 5 program), under the S limit of eight. 2
predicts (both `choice`, both about one named line), 6 hints, 3 solutions
(each with a title, because the page shows solutions directly under their
cell), 2 `inputs` blocks, 5 answer folds, 1 hint fold (the table of pages),
1 challenge. No `var`; every type written.

## What I decided, and why

- **One team and one program.** A mixed set in this series is about other
  people's code, so the problems read as one team's week. The text
  adventure is the brief's own example, and its `Rooms` class carries down
  (rule 2): problem 3's menu calls problem 1's `Rooms.Move`. That makes a
  real team lesson visible (Ciara's unfixed `Move` stops Dev's menu with a
  `KeyNotFoundException` on a move with no exit), and the "why" fold of
  problem 3 says so. It also means problem 3 behaves differently depending
  on whether the reader fixed problem 1. The checker's `stdin` for
  problem 3 (`North`, then the end of input) never meets a missing exit, so
  the recorded output is the same either way. See "Open", 2.
- **Problem 1 splits into a types cell and `<id>-program`**, with the
  inputs, hints and solution on the program cell, which is the cell that
  runs (decision 26's shape, used here for a new task). The program cell
  is `expect: exception`, not `expect: CS…` (decision 27 is about a method
  that doesn't exist yet; here it exists and breaks its promise at run
  time). The solution writes `Rooms` again below its statements (rule 4).
  One input is `Rooms.Move("cellar", "north")  // throws`, so the note's
  claim that an unknown room still throws is a recorded value.
- **Problem 2's two methods are in two cells**, `Score.cs` and
  `Program.cs`, because "nobody noticed the second method" only makes
  sense across files. There is no solution block: the task is a decision
  and a review comment, answered in a fold. I kept `rounds` = 0 out of
  the cell on purpose: `(int)Math.Round(double.NaN)` is one of
  `docs/TRANSLATING.md`'s pitfalls (a different number on the page and in
  Visual Studio), so the fold only says that neither XML comment covers
  0.
- **Problem 3 has no `inputs`**, because it reads input (the checker
  refuses one). Its first hint is `after: 2 errors`, because the reader's
  first run with **End input** is already an exception.
- **Problem 4 prints both versions side by side** under two names
  (`MatchesRelease2`, `MatchesRelease3`), and the prose says that in the
  project they have one name. The change of behaviour that matters most is
  the one nobody meant: Release 3 needs `word` in capitals, so
  `Matches("Otter", "Otter")` went from `True` to `False`. The predict is
  about that line. Release 3's XML comment is left as Release 2's, on
  purpose, so that the reader finds a comment that no longer describes the
  code (the "a change isn't finished until the document describes it"
  habit, said to learners in their words).
- **Problem 5 is not the median.** dewlab's review target (`m`, a median
  that sorts the caller's list) is already on `when-it-goes-wrong`
  (`the-dangerous-kind-2`) and in `mixed-programming` problem 12, so the
  page reviews a new method with a finding for each line of the checklist
  and the coding standard: a lower-case method name, one-letter names, no
  XML comment, a CS0219 warning (the checklist asks about warnings), a
  magic number that the unused `max` was meant to name, the same
  expression twice, division by `r` = 0, a comment that says what, and an
  `if` without braces. The warning is in a program cell, so it does not
  travel (decision 30 is about types cells).
- **`const` and "magic number" are defined in problem 5's review fold.**
  No PDP page had used `const`. The solution uses it
  (`const int MostStars = 5;`), and its note says what it does.
- **`Stars(0, 0)`.** The solution returns `-`, and says that this is a
  decision and a change of behaviour, not part of the refactor. The prose
  before the cell says the same, so the reader sees that a refactor and a
  fix are different things.
- **Problem 5's `inputs` call `Stars`, and the starter method is
  `stars`.** Until the reader renames it, **Compare with a solution** shows
  CS0103 in the reader's column (recorded as `compileError: CS0103`). The
  prose asks for `Stars` by that name, so the message names what is
  missing.
- **Block order.** The page shows a cell's hints, solutions and inputs
  directly under the cell, so in problems 1, 3 and 5 the task is in the
  prose before the cell, and the answer folds come after the blocks. The
  first draft had the task after the fold, and in the browser the solution
  appeared above the question it answered.
- **`from: from-cells-to-a-program`.** The entry lists four sources, and
  this is the first, as other new pages take their entry's first source.
  Most of the ideas in problems 2 and 5 come from dewlab's
  `code-other-people-can-read` (Dewey Track).
- **Numbers.** Every number and quoted output in the prose, folds, hints
  and solution notes is in `mixed-working-in-a-team.outputs.json`, with one
  exception: `You cannot go North`, quoted from Release 1, is recorded in
  `the-team-project.outputs.json`. I removed the numbers that came only
  from arithmetic (two thirds of 100, 3.33 stars) and said the same thing
  in words.
- **Links** go only to pages in `lessons/`. The two course names in the
  close are in italics, not links, because they are courses, not pages.
  The three things to read were each opened on 29 September 2026: Google's
  *How to write code review comments*, *Keep a Changelog* 1.1.0, and the
  Microsoft reference for `Dictionary.TryGetValue` (its example does
  compare `TryGetValue` with catching `KeyNotFoundException`, as the page
  says).

## What I left out

- dewlab's `doctest` and `help()` sections (`code-other-people-can-read`):
  Python only. An XML comment that no longer matches the code (problem 4)
  stands in for the docstring example that failed.
- dewlab's linter (`quick_review`): it reads Python's `__code__`. C#'s
  analyzers are an IDE matter, and the course map puts them nowhere; the
  CS0219 warning in problem 5 is the nearest the page comes.
- dewlab's `building-it-together` roles (coordinator, tester, reviewer,
  documenter, builder), definition of done and retrospective: they belong
  to the brief, `the-team-project`, which does not have them either. See
  "Open", 4.
- "From earlier" problems: the other two PDP mixed sets have none, so this
  page has none.

## Where each number and quoted output comes from

| In the prose | Cell | Recorded |
|---|---|---|
| `north, east`, `library`, `hall`; the report with `line 20 of Rooms.cs` and `line 5 of Program.cs` | `a-method-that-breaks-its-agreement-1-program` | output and `exception.frames` |
| `hall` for `west` and for `North` | the same cell's solution | solution output |
| `"cellar"` still throws `KeyNotFoundException` | the same cell's inputs | solution value 5 |
| `2 of 3: 66 67`, `1 of 3: 33 33`, `3 of 3: 100 100`, "66% … 67%" | `two-methods-one-job-1-program` | output |
| `NullReferenceException` on line 7, after `North` reaches the library | `a-menu-and-the-end-of-the-input-1` | output and `exception.frames` |
| `Goodbye.` after **End input** | the same cell's solution | solution output |
| `[Otter] for Otter: True False`, and the rows for `otter`, ` Otter `, `OTTERS` and `null` in the change log | `a-change-log-from-two-versions-1` | output |
| `*****`, `***`, `-`; CS0219 on line 3 | `a-method-to-review-1` | output and `diagnostics` |
| `Stars(4, 5)` is `****`, `Stars(0, 0)` is `-` | the same cell's inputs | solution values |

## Open

Questions only Josh can settle.

1. **The team's names.** Ciara, Dev and Maeve come from `the-team-project`,
   where they appear once, as an example. This page makes them a small
   cast. The style guide chose "no recurring character" (decision 5 in
   its "Decided for now"), meaning a character who makes mistakes across
   the course. Is a named team, on the last two pages of PDP only,
   acceptable, or should the problems use "a teammate"?
2. **Problem 3 depends on problem 1.** Dev's menu calls Ciara's `Rooms`,
   so a reader who skipped problem 1 meets a `KeyNotFoundException` when
   they try a move with no exit. The page says so in problem 3's fold, as a
   lesson in itself. The other choice is a menu with its own dictionary,
   as on `the-team-project`, which is longer and does not depend on problem 1. Keep
   the dependence?
3. **Size.** The entry says S (under eight cells, about half an hour). The
   page has 7 cells, but problems 4 and 5 ask for a written change log
   entry and a written review, and problem 5 also asks for a refactor. In
   a class, that is nearer an hour. Should the page say that problems 4
   and 5 can be done in pairs in a second session, or is the entry's size
   to change?
4. **Roles and a definition of done.** dewlab's `building-it-together`
   gives each person a role per release and a written definition of done.
   Neither dewsharp's brief nor this page has them. Is that a gap in
   `the-team-project` that you want filled (it is the brief's job, not a
   mixed set's)?
5. **`const` on the last PDP page.** The review defines a named constant
   and `const`, which PDP has not met before. It is a natural fit for
   "magic number" (PDP-LO11's coding standard). Should an earlier PDP page
   (`storing-and-computing`, or `critique-and-reflection`'s coding
   standard) meet `const` first?
6. **The last page of PDP.** The close says "This is the last page of
   *Programming and Design Principles*" and sends a continuing learner to
   FOOP's `objects-and-classes`, as the teacher notes say. PDP also has nine
   explore pages. Should the last page name them too?

## Review

Reviewed on 29 September 2026, with fresh eyes, as a Level 5 learner who
knows only the pages before it, as a teacher, and against the checklists
in `docs/TRANSLATING.md` and the style guide. The page does what its
entry asks: all five problems in the entry's list, PDP-LO10, 11 and 12,
S by cell count, and a close that says what belongs in Visual Studio.
Version bumped to `2026.09.29.1`, re-recorded with `--write`; every line
number the prose quotes (20 and 5 in the report, 7 and 8 in problem 3,
3, 6 and 10 in problem 5) is unchanged in the new recording.
`npm run check-lessons -- mixed-working-in-a-team`: 13 runs, no problems.

What I changed:

- **A wrong link, three times.** Dividing by zero, and
  `DivideByZeroException`, are taught on `reading-an-error-message`
  (*Exceptions*), not on `dividing-in-csharp`, which never mentions it.
  Problem 5's prose and review item 5 now link to *Exceptions*, and the
  table of pages adds it to problems 1 (reading the report) and 5.
  Problem 1's row loses *Debugging*, which it did not use.
- **A change log line that was not a change.** Problem 4's answer listed
  "When the input ends, Matches returns false" as new in Release 3, but
  the recorded output shows `null for OTTER: False False`: Release 2 gave
  `false` too. The line is gone, and a paragraph says why, and that
  Release 3 needs its `null` check only because it now calls `Trim()`
  (the same trap as problem 3). The known problem ("OTTERS") now says the
  team has not decided, rather than guessing what a player thinks.
- **`const` used before it was defined.** The solution to problem 5 sits
  above the review fold on the page, so a reader who opens it first met
  `const` with no definition. Its note now defines *constant* in one
  sentence. The review fold keeps its fuller definition.
- **Problem 2's fold** said "Neither comment says what happens when
  `rounds` is 0", but only `Percent` has an XML comment. Rewritten as a
  question for the review. It now also says what `(int)` does, with a
  link to *Types and their sizes*. "Neither method is broken" became
  "Both methods do what their authors meant" (no verdict words).
- **Problem 3's fold** quoted "*What does it do with `null` when the input
  ends?*" as a review question in italics; no page has those words. It
  now names the review checklist's second question and says it in plain
  prose. "One person's method reaching another person's program" became
  a plain sentence. The solution note's "makes every move small letters"
  became "puts every move in small letters".
- **Review comments that lacked "why it matters".** The page says a
  useful comment has three parts; items 4 (the same expression twice)
  and 7 (an `if` with no braces) now give the reason, and item 7 ends
  with a question, as the others do. Item 1's "say nothing" became "do
  not say what they hold"; item 6's "or it can go" became "or the line
  could be deleted". The closing ranking no longer claims that item 3 is
  about what the code does.
- **Plain words.** "a change that nobody wrote down" (phrasal verb) became
  "recorded"; "out of date" (twice) became "no longer matches";
  "agreed this *interface agreement*" became "wrote"; "looking a key up"
  in "Where to read more" became "reading the value with square
  brackets"; "for the line at the end of the game" became "to show the
  score at the end of the game"; "read every round" (Codebreaker's word,
  odd in a text adventure) became "won", in the prose and in the
  solution's XML comment.
- **Smaller clarity fixes.** Problem 1 says the reader changes `Move` "in
  the `Rooms.cs` cell above". Dev's check cell's comment said "one line
  for each case in the agreement", but `ExitList` and `North` are not
  cases in it; it is now "Dev's checks of Rooms: one case on each line"
  (still line 1, so no line number moved). "Only a test can" check the
  `Returns:` line became "A test can", since the page's own close asks
  which problems a person reading the code would find. The challenge asks
  for agreements "as classes", matching its starter comment. **Download
  project** makes one file "for each types cell above it", as
  `from-cells-to-a-program` says. The close adds one sentence about the
  course page's **Explore** list (open question 6).

Checked and left as it is: every quoted output and number against the
new outputs file; the exception report's format against
`web/page/cell.js` (`drawException`); `Math.Round` (met on
`storing-and-computing-practice`), `TryGetValue`, `new string(char,
int)` (`Row`, on `from-cells-to-a-program-practice`) and `Trim()` /
`ToLower()` (defined here) are all met before they are used; both
predicts name their line; solutions and inputs are on the program cells
that run; no *right*, *wrong*, *correct* or *well done*; Irish spelling.

Still open for Josh, in addition to "Open" 1 to 5 above:

7. **"Magic number" means two things in PDP.** `how-we-got-here-practice`
   uses *magic number* for the fixed bytes at the start of a file. This
   page uses it for a number in code with no name. Both are real uses,
   but a learner meets them a few pages apart. A sentence on one page
   could name the other, if you want it.
8. **Two cells are longer than the style guide's fifteen lines**:
   `Rooms.cs` (22 lines) and problem 4's side-by-side (24). Each is one
   idea (a class; one comparison), and splitting either would cost more
   than it saves, so I left them.
9. "Open" 6 is partly answered by the new sentence about **Explore**. The
   page still names no explore page by title.
