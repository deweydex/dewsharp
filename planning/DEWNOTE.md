# Editing dewsharp with Dewnote

Written 3 October 2026. This is a plan; nothing in it is built. It answers
three questions: can Dewnote edit dewsharp's lessons, what would have to
change, and in what order.

## The short answer

Dewnote can open and save every lesson today without damaging one. It cannot
yet edit them well. Its editor is built around dewlab's layout and dewlab's
Python, and a dewsharp lesson differs from a dewlab tutorial in the places
where Dewnote makes decisions: the folder, the link scheme, the course files,
the front matter, the language of a cell. Opened as it stands, a lesson reads
and saves correctly, but Dewnote offers it commands that would write files
dewsharp's build refuses, and its Run button starts Python on C# code.

The repair is mostly in Dewnote, with a small amount in dewsharp. The largest
piece is not code: a lesson whose cell changes has to have its recorded
outputs refreshed, and Dewnote has no C# engine to do that. Section 4 gives
the way round it.

## 1. What I measured

I read Dewnote (`deweydex/dewnote` at `889fca1`), built it from source in a
scratch copy (355 unit tests pass), and ran it against all 96 pages in
`lessons/`. Nothing in dewnote or in dewlab was changed.

**Saving is safe.** Each page was opened in Dewnote's editor, serialised, then
opened and serialised again.

- All 96 are stable: the second pass changes nothing.
- I parsed every page with dewsharp's own parser (`web/lesson/parse.js`),
  before and after. There are no errors either time. The front matter is
  identical in all 96. Every one of the 1,433 cells is identical (id, headers,
  code), and so is every hint, predict, solution, inputs and challenge block.
- 54 pages change on their first save, and 42 come back byte for byte. The
  changes are layout and escaping: table columns padded to a common width, a
  display formula written over three lines in place of one, `\.` after a
  number that starts a line, `\_\_\_` for the blanks in a fill-in list, `<T>`
  written as `\<T>` (and `&lt;T&gt;` with it), and `C#` at the end of a
  heading written as `C\#` (three headings). Each of these renders the same.
  The page's maths reader accepts the three-line form (`web/page/markdown.js`).
- After that first save a page stays as it is. So the right order is one
  tidy commit made by Dewnote, then real edits, and no later change shows
  noise.

**Editing is not right yet.** I put four lessons and both course files in a
scratch Dewnote's sample workspace and used the real shell.

- Lessons appear under *Documents*, not *Tutorials*. The six series show
  "0 tutorials", because Dewnote reads `tutorials:` in a course file and
  dewsharp's key is `lessons:`.
- Prose, headings, the outline in the margin and C# colouring all work. The
  header lines of a cell (`id:`, `file:`) show as code, as they do in dewlab.
- All 1,433 cells are classed as Python (`cellLanguage` in `src/cells.ts`
  returns Python for anything that is not `sql`). A **Run** button is drawn on
  each one. I pressed it: Dewnote starts to download Python (Pyodide). The
  download failed in my sandbox, so I did not see what Python says about C#.
  *Run every cell* is built on the same call, so it would do this to the whole
  page.
- A `predict` block shows as grey raw text. Nothing in `fences.ts` mentions
  `solution`, `inputs` or `challenge`, so they get the same treatment. Dewnote
  draws a staged hint and a question the way a reader sees them, and these
  four have no drawing.
- The *Status* field shows "live". Changing it would add a `status:` line,
  and dewsharp's parser refuses that: *The frontmatter has no "status:" key.*
  The same holds for `year:`. I ran both lines through the parser.
- The empty page offers **New tutorial…**, because Dewnote sees two course
  files and takes the workspace for dewlab. That command writes
  `tutorials/<id>/<id>.md`, with `year:`, `status: draft` and a `python exec`
  cell. It is the wrong folder, and dewsharp refuses two of its keys.
- Its checker reports no problems on all 96 pages. That is true, and it proves
  little: it applies none of dewsharp's rules. It does not read `expect:`, a
  predict that names a line the output does not have, a world's cell ids, or
  a `lesson:` link to a page that does not exist. A mistyped link would pass
  Dewnote and stop dewsharp's build.
- On an open lesson Dewnote offers *Move or rename this file…* and *Delete
  this document…*, the plain versions it offers for any note. They move or
  delete the file and check nothing. A lesson renamed that way leaves the
  `lesson:` links and the course entry pointing at the old id, and
  dewsharp's build stops. The careful versions, which rewrite every
  reference and refuse a delete while something points at the page, are
  offered only under `tutorials/`. When N1 makes lessons tutorials, those take
  over, and one hazard comes with them: Dewnote's rename writes
  `courses/redirects.yaml`, and dewsharp's build reads every YAML file in
  `courses/` as a course. I tested this: with that file in place the build
  stops with six errors. Dewsharp has no redirects, so that step has to be
  switched off for it.

**The recorded outputs.** `npm run check-lessons` (and CI) fails when a cell's
recorded output differs from what the cell now prints. Prose-only edits do
not trip it, and numbers in prose that no longer match are not caught by
anything but a reader. Dewnote edits text; it cannot run a cell.

## 2. What to build in Dewnote

Everything below sits behind one switch, so dewlab's behaviour does not
change by a character. Dewnote reads a small file at the root of a workspace
(see S1). With no file, it behaves as it does today. The two tests that guard
dewlab (`tests/e2e/roundtrip.spec.ts` and the corpus test against a dewlab
checkout) stay as they are, and a third guards dewsharp: the probe I used
above, kept as a test.

**N1. Layout from the file.** Where lessons live (`lessons/`), the link scheme
(`lesson:`), the key in a course file that lists them (`lessons:`), the extra
keys (`explore:`, `planned:`), and the front-matter keys a lesson may hold
(`title`, `version`, `from`, `worlds`, `covers`, `practice_for`). Dewnote's
hard-coded `tutorials/` appears in `workspace.ts`, `checks.ts`, `authoring.ts`,
`rename.ts` and `shell-commands.ts`, and the key `tutorials:` in `courses.ts`
(which `placement.ts` edits); those become reads from the layout. Result: lessons are tutorials, the series show their lessons, the
breadcrumb works, and the *Status* field and `year:` go.

**N2. A C# cell is not a Python cell.** `cellLanguage` learns `csharp`. A
C# cell gets no Python engine and no Jedi help. It carries a label ("C# · runs
on the dewsharp page") and a button that opens the preview (N5). *Run every
cell* skips it. The headers `file:` and `stdin:` are read as headers.

**N3. New lesson, new practice page.** The templates write
`lessons/<id>/<id>.md` with `title`, `version`, and one `csharp exec` cell, and
`<id>-practice.md` with `practice_for`. No `year`, no `status`. A new lesson
is added to a course's `lessons:` list or to `planned:`, since dewsharp's build
refuses a course that lists a lesson neither written nor planned.

**N4. Dewsharp's rules, from dewsharp's parser.** Dewnote's checker calls
`parseLesson` and `parseCourse` and shows their errors, with their line
numbers, in its own report. I recommend a vendored copy of `parse.js` pinned
to a dewsharp commit, with a script that updates it and a test that every page
in dewsharp parses without error. The alternative is to import the file from
the live site; that never drifts, but the downloaded copy of Dewnote then needs
a connection to check anything. Either way there is one set of rules, which is
how Dewnote already treats dewlab's. It also adds `lesson:` links to the
existing broken-link check, and draws `predict`, `solution`, `inputs` and
`challenge` so an author sees them as labelled blocks, as hints and
questions are.

**N5. Preview in dewsharp.** A button posts the open document's text to a
dewsharp tab (S3). The learner's page does the rest: worlds, predicts, hints,
the comparison, and real runs. This is the right way to run C# from Dewnote.
The engine is 42.6 MB of .NET and needs cross-origin isolation, which a
single-file editor cannot provide; a tab of its own can.

**N6. Remove what does not apply.** For a dewsharp workspace, switch off
release and freeze (dewsharp has no `v<version>.md` files) and redirects on
rename. Rename keeps its other work: it moves the folder, rewrites the
`lesson:` links and the `lessons:` lists, and renames `<id>.outputs.json`
with the lesson. It should still warn that a rename throws away anyone's saved
work (the id is the key).

## 3. What to change in dewsharp

**S1. The layout file.** One small file, `dewnote.yaml`, at the root. A page
on how to open the repository in Dewnote beside it (`docs/EDITING.md`), written
for a colleague: connect the repository, edit, save, open the pull request,
and what to do when a cell changes.

**S2. A parser Dewnote can import.** `web/lesson/parse.js` already runs without
a page and never throws. What is missing is a promise: `docs/PARSER.md` states
the interface, and a change to it changes a version number that Dewnote's
copy pins.

**S3. A preview mode on the lesson page.** `lesson.html?preview` waits for a
message from the tab that opened it, parses the text it receives in place of
fetching a file, and renders as usual. In preview it must not read or write
saved work. Otherwise an author's earlier edits to a cell, kept under the same
`<lesson id>/<cell id>`, would replace the cell they are previewing. It shows
a line saying that the text is unsaved.

**S4. Outputs refreshed on the pull request.** When a pull request changes a
lesson, a workflow runs `check-lessons --write` on the branch, commits the
recorded outputs, and posts what changed as a comment. Then a reader still
reads what changed before it is merged, as `PARKED.md` asks, but a colleague
without .NET does not have to produce it. The checker's failures that are not
output differences (a predict about a missing line, an `expect:` that did not
hold) still stop the pull request and are the author's to fix.

## 4. What editing in Dewnote cannot do

It cannot confirm that a number in the prose is right. "Every number is run"
is a rule for the writer, and nothing mechanical enforces it: S4 refreshes the
outputs, and a person still reads the prose against them. A colleague who
changes wording is safe. A colleague who changes code that changes a printed
value has to read the changed outputs in the pull request and fix the prose
that quotes them. The editing page (S1) says so in those words, and the
comment S4 posts is where the reader sees it.

## 5. Order

1. **S1, S2, N1, N2, N6.** Dewnote opens a lesson as a lesson, and does nothing
   harmful. The dewsharp corpus test goes in with it.
2. **The tidy commit.** Dewnote opens and saves the 54 pages that change, and
   the result is committed on its own, before anyone edits.
3. **N3, N4.** New lessons, and the checker that knows dewsharp.
4. **S3, N5.** The preview. After this an author sees what a learner sees.
5. **S4.** Recorded outputs on the pull request.

Steps 1 and 2 make editing safe. Step 4 makes it pleasant. Step 5 is what lets
a colleague change code.

## 6. Unknowns to settle by trying

- **The preview tab.** Both sites live on `deweydex.github.io`, so a tab opened
  by Dewnote shares its origin and `postMessage` is straightforward. A copy of
  Dewnote opened from disk is another origin; messages with a stated origin
  still work, and I would test that case.
- **C# colouring in Dewnote.** It works today (Crepe's code block already knows
  C#). Dewnote's notes forbid adding a `@codemirror/*` package at the top
  level, so nothing needs adding, and nothing should be.
- **`C\#` in headings.** Dewnote's serialiser writes it. It renders the same,
  but it is untidy in the source. I would try to stop it in Dewnote, and live
  with it if that proves a Milkdown limit.
- **Running C# inside Dewnote.** Not planned. If wanted later, the cost is
  cross-origin isolation for the editor page, and a 42.6 MB engine that the
  single-file build cannot hold.

## 7. What I need from you

- **Permission to push a branch to `deweydex/dewnote`.** This session can read
  it; its branch rule names dewsharp, dewlab and dewcode only. The dewsharp
  side I can do now.
- **Your word on the tidy commit** (order, step 2): Dewnote rewrites 54 pages
  once, so later changes are clean. I recommend it.
- **Which of the two ways to take the parser** (N4). I recommend the pinned copy.

I have not touched dewlab or dewcode, and the other agent's work on dewlab is
unaffected by any of this.
