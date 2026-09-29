# many-languages-one-idea: notes for a reviewer

The PDP extra E9 in `planning/COURSE_MAP.md`: *Many languages, one idea:
the same job in five languages*. Adapted from dewlab's
`many-languages-one-idea` (Dewey Track, version 2026.09.24.1). Explore
shape, no worlds, size M (9 cells), no practice page. Covers PDP-LO3.
Depends on `how-we-got-here`, which already names this page in italics.

Files:

- `lessons/many-languages-one-idea/many-languages-one-idea.md`, version
  2026.09.28.1. 9 exec cells (8 program, 1 empty), 3 predicts, 8 hints,
  4 solutions, 1 `inputs` block, 1 challenge, 2 answer folds, 2 "why"
  folds, 9 fences to read (1 `python`, 8 `text`), 4 tables, 1 picture.
  Two cells are meant to fail, and the prose says so before each Run:
  `two-ways-to-answer-2` (`expect: CS0019`) and `the-same-job-in-basic-1`
  (`expect: exception`).
- `lessons/many-languages-one-idea/many-languages-one-idea.outputs.json`.
- `lessons/many-languages-one-idea/from-code-to-running.svg`: five rows,
  the four of dewlab's picture plus C#, with a note that this page
  interprets the IL. Drawn for a white background in fixed black and
  greys (dewlab's used its own CSS variables), with a `<title>` and a
  `<desc>`, and a full description in the Markdown.

`npm run check-lessons -- many-languages-one-idea` reports 14 runs and no
problems. Looked at in headless Chromium (`npm run serve -- --isolate`) at
900 and 390 pixels: no console errors, no sideways scrolling, the kind
labels as expected (`your-turn-2` is `empty`), every `lesson:` link loads,
and the picture draws.

## What the page does, in order

1. **The rainfall job in C#** (`one-job-in-csharp-1`), with a predict on
   the first line (`average: 5`, not `5.0`). Then a paragraph for the
   teacher and reader: this is an extra, for PDP-LO3 and the theory exam,
   and it needs nothing past *Programming languages*.
2. **One job in C#, and in Python.** The four questions, asked of the job
   itself. The Python version as a `python` fence, and the syntax
   differences from C# (indentation, no types, no `;`, `len`, the naming
   habit). Python prints `average: 5.0`.
3. **The same job in SQL.** The table, `AVG`, the query in brackets,
   *declarative* against *step by step*; a fold on the name SEQUEL. Then
   C#'s own declarative twin, LINQ (`the-same-job-in-sql-1`: `Average()`
   and `Count(reading => reading > average)`). A task (`your-turn-1`):
   the wettest reading, and the days above the average, which SQL gives
   with `MAX` and `SELECT day`.
4. **The same job in JavaScript.** Read beside C#, which it looks much more
   like than Python does. Then "Two ways to answer "5" + 1": a predict on
   C#'s `"5" + 1` (it prints `51`, as JavaScript does), then `"5" - 1`,
   which JavaScript makes 4 and C# refuses to compile (CS0019). A table
   of the three languages.
5. **The same job in BASIC.** Read, with line numbers, `DATA`/`READ`,
   two-letter names and `$`. Then BASIC's loop copied line by line into C#
   (`the-same-job-in-basic-1`), which stops with an
   `IndexOutOfRangeException` because BASIC's array counted from 1. The
   cell is also the task: can you make it run? A second task
   (`your-turn-2`): a short BASIC program with `N$` and `STEP -3`, in C#.
6. **What changes from one language to the next.** Compiler and
   interpreter, the picture, the table of characteristics with a C#
   column, and a question with a fold: "C# is a compiled language" — the
   most careful reply.
7. **What stays the same: the four questions**, in a table of five
   columns. A task on Ruby, a language the reader has never seen, with a
   C# twin to run and a predict (`15`: whole-number division, the same in
   Ruby and C#). A task (`your-turn-3`): JavaScript's `countOver` in C#,
   with inputs. The "Why this way?" fold.
8. **Looking back** (the four questions, with what the page showed for
   each), a question, a challenge (one job, step by step and in LINQ), a
   line on Visual Studio and on the missing practice page, and **Where to
   read more**.

## What I decided, and why

- **C# is the language that runs, and it comes first.** The map says only
  the C# runs. dewlab opened with Python and ran Python and SQL. Here C#
  opens the page (run first, then name), and each other language is
  compared with the C# cell. Python becomes the second language, read,
  not run, because many readers met it first.
- **Each language's section has a C# cell with something to find.** An
  explore page of M size needs cells, and a page that only showed fences
  to read would not invite anything. So SQL gets its C# twin, LINQ;
  JavaScript gets the `"5" + 1` and `"5" - 1` pair; BASIC gets the
  line-by-line copy that stops. Each shows a characteristic from the C#
  side: style, types, and how arrays are counted.
- **`"5" + 1` gained a twist that dewlab's page did not have.** In
  dewlab, Python refuses and JavaScript joins. C# joins too, as
  JavaScript does, which a reader will not expect after hearing that C#
  is strict about types. `"5" - 1` then shows where C# is strict, and
  that it is strict before the program runs, not when the line runs as
  Python is. That makes the types row of the table three answers, not
  two.
- **The BASIC copy that stops replaces dewlab's practice problem 11** (a
  Python `range(1, 7)` that missed Monday). In C#, the line-by-line copy
  `i <= 7` does not miss a reading quietly; it stops with an exception,
  which a PDP reader has met on *Debugging*. The failing cell is also the
  task, with two hints and a solution; the prose says before the Run that
  it is meant to stop.
- **LINQ is shown and used, but not taught as something needed later.**
  *Programming languages* read `Where` and `Sum` as code to read; this
  page runs `Average()` and `Count(...)`, and names the small method with
  no name in the words that page used. `values.Max()` is from *Reusable
  methods*. The page says it adds nothing the course needs later, and it
  links to the FOOP extra *LINQ: asking a list a question* for more.
- **The four questions are kept, in plainer words.** dewlab asks "What is
  named here? What is promised? What happens when? What does this space
  let us do?", from a Dewey Track page that dewsharp does not have. Here
  they are "What is named? What is promised? What happens first? What
  does the language allow?", and *promise* is defined where it first
  appears. They give the page its idea and give the reader a method for
  the Ruby task.
- **Three predicts**, each on a named line: the first line of the first
  cell (`5` against `5.0`, which ties to Python's and JavaScript's
  printing later), the first line of `"5" + 1`, and the first line of the
  Ruby twin (`15` against `15.25`). Each option set includes the output.
- **Two "your turn" tasks from dewlab's practice page** moved onto this
  page, because the map gives the page no practice page: the BASIC `N$`
  and `STEP -3` program (practice 7, now "write it in C#") and
  `countOver` (practice 8, now JavaScript to C# rather than to Python).
  The Ruby reading (practice 14) became the page's last task on the four
  questions.
- **Fences for SQL, JavaScript, BASIC and Ruby are `text`.** The parser
  (`web/lesson/parse.js`, `READONLY_LANGS`) accepts only `csharp`,
  `python`, `console` and `text` for code to read. See "Engine or page".
- **The characteristics table has a C# column first**, and C#'s paradigm
  cell says "procedural, and declarative with LINQ", which is what the
  page shows. (The review renamed the row from "Style" to "Paradigm"; see
  "Review".) The "most careful reply" question is about C# ("C# is a
  compiled language"), not BASIC, because *Programming languages* already
  said that this page interprets the IL, and the reader can check it
  against the picture. BASIC's two tools stay in the picture and the
  prose.
- **Names in the C# cells:** `rainfall`, `runningSum`, `wetDays`,
  `reading`, `temps`, `temp`, `answerTimes`. The output text keeps
  dewlab's `average:` and `days above it:`, lower case, so the three
  languages that print it can be compared line for line.
- **The page quotes what the other languages print, which no cell here
  records.** Each was run outside the page on 29 September 2026: Python
  3 (`average: 5.0`, `days above it: 3`; both `TypeError` messages),
  Node.js (`average: 5`, `days above it: 3`; `"5" + 1` is `51`;
  `"5" - 1` is 4; `countOver` gives 3), SQLite through Python's
  `sqlite3` (5.0, 3, 12.6, and Wed, Thu, Sun), Ruby (`15`, and
  `15.25` with `to_f`), and PC-BASIC 2.0.8, a GW-BASIC interpreter
  (`AVERAGE 5`, `DAYS ABOVE IT 3`; `ADA LOVELACE`, 10, 7, 4, 1). The
  page says in its opening that the other languages were run outside it.
  The C# numbers come from the outputs file.

## Where each number and quoted output comes from

| Prose | Source |
|---|---|
| `average: 5`, `days above it: 3` | `one-job-in-csharp-1`; again in `the-same-job-in-sql-1` |
| "an average of 5, and 3 days above it" (the SQL answers) | `one-job-in-csharp-1`; SQLite gives the same |
| 12.6; Wed, Thu, Sun | solution of `your-turn-1` |
| `51`, then `6` | `two-ways-to-answer-1` |
| `Program.cs(1,19): error CS0019: Operator '-' cannot be applied to operands of type 'string' and 'int'` | `two-ways-to-answer-2` |
| `IndexOutOfRangeException` on line 6 | `the-same-job-in-basic-1` |
| `average: 5` (the loop from 0) | solution of `the-same-job-in-basic-1` |
| `ADA LOVELACE`, 10, 7, 4, 1 | solution of `your-turn-2` |
| 15 and 15.25 | `what-stays-the-same-1` |
| 3 (`countOver`) | solution of `your-turn-3` |

The readings, 7, 10, 100 and 1974 are numbers written in the code or in
the history, not results. The inputs for `your-turn-3` give 3, 0, 1 and 0
from the solution; the prose quotes only the 3.

## What I left out

- **dewlab's warm-up** (two `question` blocks: who BASIC was for, and the
  mean of 2, 4 and 9). dewsharp has no `question` block, and the page
  opens by running something. The first fact is now in the BASIC section.
- **Running SQL.** dewlab ran SQL on its page, with a small database; the
  map says only the C# runs here. The SQL is shown to read, the database's
  answers are quoted, and LINQ is the SQL-like thing the reader runs.
  `DROP TABLE IF EXISTS` went with it, because nothing is run twice.
- **The `mean` of dewlab's toolkit.** dewsharp has no toolkit. `Average()`
  takes its place.
- **dewlab's links to Dewey Track pages** (*Where programming came from*,
  *What is typical?*, *When Python says no*, *Four questions for any
  puzzle*). None has a dewsharp page. The history they gave is on
  *Programming languages*, which the page links to.
- **dewlab's practice page.** The map gives explore pages none. Its
  problems 7, 8 and 14 moved onto this page as tasks (above). The SQL
  problems (the playlist table, the misuse of `AVG` in `WHERE`) need SQL
  that runs, and are left out. Problem 13 (`"5" * 3`: `555` in Python, 15
  in JavaScript) would be a good third line for the `"5" - 1` cell; it is
  left out to keep the cell one line and one message.
- **The Ruby name story** (the aside on why Matsumoto chose "Ruby"). The
  page keeps one sentence on who made Ruby and when.
- **dewlab's Database Methods link.** dewsharp has no database course.
- **The reading list:** dewlab's Ben Eater video stays. Added: Rosetta
  Code's *Averages/Arithmetic mean* (the page's own job in hundreds of
  languages), and Microsoft's two *Tips for ... developers* pages from
  *A tour of C#*.

## Engine or page

- **`text` fences for other languages.** `web/lesson/parse.js` line 31,
  `READONLY_LANGS = new Set(['csharp', 'python', 'console', 'text', ''])`,
  refuses `sql`, `js`/`javascript`, `basic` and `ruby` ("... is not a
  language this site shows"). So SQL, JavaScript, BASIC and Ruby are
  `text` fences, shown without colour. `docs/LESSON_FORMAT.md` says the
  same, so this is the contract, not a bug. A page whose subject is other
  languages would read better if the page could show them with their own
  colours; that needs the editor bundle's language modes and a change to
  the parser and the format.

## For other files (not done here: the brief allowed only these)

- `courses/pdp.yaml`: the `planned:` line for `many-languages-one-idea`
  can go now that the lesson is in `lessons/`.
- `lessons/how-we-got-here/how-we-got-here.md` line 726 names this page
  in italics, *Many languages, one idea*. It can now be a link:
  `[Many languages, one idea](lesson:many-languages-one-idea)`.

## Open

Questions only Josh can settle:

1. **A practice page?** dewlab's page has one, with fifteen problems, and
   the map gives explore pages none. Three of its problems are tasks on
   this page. If a teacher moves this page into the contents for the
   exam, as the map suggests one may, should it gain a practice page
   (a C#-only one, since SQL does not run here)?
2. **The four questions.** They come from a Dewey Track page that
   dewsharp does not have, and they appear on no other dewsharp page. Keep
   them here, in the plainer words above, or drop them and keep only the
   characteristics table, which is what PDP-LO3 names?
3. **LINQ on a PDP page.** The page runs `Average()` and `Count(...)`
   with a small method with no name, which PDP never teaches.
   *Programming languages* showed LINQ only as code to read. Is running
   it on an extra acceptable, or should the LINQ cell become code to
   read?
4. **Rosetta Code link.** The address
   <https://rosettacode.org/wiki/Averages/Arithmetic_mean> could not be
   fetched from here (the site answered with a check for robots, not the
   page). It is the task's long-standing name on Rosetta Code, but please
   open it once before the page is used.
5. **Colours for code to read** (see "Engine or page"): worth a change to
   the format, since this page is mostly other languages?
6. **Quoted output from other languages.** The rule "every number is run"
   is met for C#. The page also quotes what Python, JavaScript, SQL, Ruby
   and BASIC print, checked outside the page (listed above), not by the
   checker. Is a note in these notes enough, or should the page say where
   each was run?

## Review

A second reader went through the page on 29 September 2026: once as a
Level 5 learner who has read only the PDP pages before it, once as a
teacher against its course-map entry (E9), and then down the checklists
in `docs/TRANSLATING.md` and `PEDAGOGICAL_STYLE_GUIDE.md#checklist`.
The page does what E9 asks: one job, five languages, only the C# runs,
PDP-LO3, depends only on *Programming languages*. Every number and every
C# message in the prose matches `many-languages-one-idea.outputs.json`.

The quoted output of the other languages was run again, independently:
Python 3 (`average: 5.0`, `days above it: 3`, both `TypeError`s), SQLite
through Python's `sqlite3` (5.0, 3, 12.6, and Wed, Thu, Sun), Node 22
(`average: 5`, `days above it: 3`, `51`, 4, and 3 for `countOver`), Ruby
(15 and 15.25), and PC-BASIC 2.0.8 (`AVERAGE 5`, `DAYS ABOVE IT 3`;
`ADA LOVELACE`, 10, 7, 4, 1). All agree with the page. The picture was
rendered in headless Chromium and matches its description. The two
Microsoft links load and have the titles the page gives; the Ben Eater
link is the video *Comparing C to machine language*.

### What changed

No cell's code changed, so `version:` stays 2026.09.28.1 and the outputs
file is unchanged. `npm run check-lessons -- many-languages-one-idea`
passes without `--write`.

- **The first result is read where it happens.** "It prints `average: 5`
  ... not `5.0`" moved from under the first heading, twenty lines later,
  to straight after the opening cell, as on *Programming languages*.
- **"The other four languages" became "the other languages"**: the page
  also shows Ruby, a sixth.
- **"Promise" is defined with a concrete example:** "what a name or a
  step says it gives. Here, `average` promises to hold the total...". The
  old sentence had "the average promises to be", which reads oddly.
- **The naming bullet under Python** compared `rainfall_mm` with
  `rainfall` (which has no capital in the middle) and called `_` "a line".
  It now compares `running_sum` with `runningSum`, and shows `_`.
- **"Step by step" became *procedural*, and "Style" became "Paradigm".**
  *Programming languages* taught *paradigm* and *procedural* for exactly
  this idea; this page had invented a second name. The prose now names
  both paradigms with that page's words and links to it; the table's row
  and the sentence under it follow. "Step by step" stays only as a plain
  description in the challenge.
- **SQL:** `PRIMARY KEY` is explained in one sentence, and `INTEGER` is
  named with the other types. "LINQ was made to look like SQL" was too
  strong for the method form the page shows; it now says LINQ took ideas
  and names from SQL (`Where`, `Count`, `Max`).
- **"Position" became "index"**, the word *Arrays and lists* taught, in
  the first task's hint and note, the BASIC hints, note and prose
  ("indexes", the plural the other pages use).
- **The BASIC task is asked before its cell.** "Can you change the loop so
  that it runs?" came after the cell, which on the page is after the
  solution block. It now stands with "Can you see which line it stops
  on?" before the Run, and the solution has a title ("the loop, changed so
  that it runs"), as the format asks. "Lines 30 to 80" became "30 to 90"
  (the cell prints, as line 90 does), and `R` as `rainfall` is named.
- **Plain words:** "BASIC was waiting" became "BASIC was the first thing
  on the screen"; "go through the positions" became "visit each index";
  "the method gives back" became "returns"; "each temperature in turn"
  became "one at a time"; `BASIC says "down to 1" in one word, TO` (the
  "down" comes from `STEP -3`) became "BASIC says where to stop with
  `TO 1`".
- **"Think about it before you open the fold"** was an order to think; it
  is now a question, "What would you say, before you open the fold?".
- **The `CountOver` note** said everything but the types and names "did
  not change at all"; the loop did (`for ... of` to `foreach`), and the
  note now says so.
- **The challenge** asked the reader to find "the same job" (their own)
  on Rosetta Code, which may not have it; it now says "a job like it".
- Three paragraphs had broken line wraps in the source; rewrapped.

### Still open for Josh

The six questions under "Open" stand. From the review:

7. **The `planned:` line and the italic mention.** `courses/pdp.yaml`
   still has a `planned:` title for this page, and
   `how-we-got-here.md` (line 726) names it in italics, not as a link.
   Both can change now the page exists; the review was not allowed to
   touch either file.
8. **The Ben Eater video's year and length.** The link resolves to the
   right video, but its year (2015) and "Ten minutes" could not be read
   from here. Please check both when you open the Rosetta Code link.
9. **LINQ's `=>` is used, not taught.** The page names
   `reading => reading > average` as "a small method with no name", in
   *Programming languages*' words, and the reader runs it and may write
   `Max()`. The optional LINQ one-liner in the `CountOver` note and the
   challenge's last comment ask more of it. Fine for an extra; worth
   knowing if the page moves into the contents (open question 3).

