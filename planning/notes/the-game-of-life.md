# Notes: the-game-of-life

A new page, written on 28 and 29 September 2026 for the course map's PDP
explore entry E8 ("new", shape explore, size M, no worlds, covers PDP-LO7
and PDP-LO8, depends on `grids-and-references` and `reading-input`). The
first draft was written in a run that stopped before it was checked; this
run checked every claim in it against the browser engine, changed what
the recorded outputs did not support, and wrote these notes. The page is
version 2026.09.28.1, and it was first recorded in this run, so the
version was not bumped: no cell's code changed after that recording.

Written against dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`docs/TRANSLATING.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1)
and `planning/COURSE_MAP.md`, with `grids-and-references`,
`reading-input`, `writing-your-own-functions`, `leaving-it-to-chance` and
`a-function-that-calls-itself` read for the words the reader has met.

Files:

- `lessons/the-game-of-life/the-game-of-life.md`: the page. 5
  `csharp exec` cells, all program cells. 2 predicts, 6 hints, 4
  solutions (2 of them with `inputs`), 1 challenge, 1 picture. No
  worlds, and no practice page (the entry names none, and an explore page
  has none).
- `lessons/the-game-of-life/neighbours.svg`: a cell and its eight
  neighbours, labelled `row − 1`, `column + 1` and so on, with a
  `<title>`, a `<desc>`, and the same description in the Markdown.
- `lessons/the-game-of-life/the-game-of-life.outputs.json`, written by
  `npm run check-lessons -- --write the-game-of-life`.

## What the page does

1. **A grid that changes by itself.** It opens with the whole game: a
   `bool[,]` made from a picture of `#` and `.`, drawn again after each
   press of Enter (`Console.Clear()`, a `do`...`while` over
   `Console.ReadLine()`, `q` or **End input** to stop). The picture holds
   a glider, a blinker (the line of three), a toad (the shape of six) and
   a block (the square). The page then names what the reader saw: the
   Game of Life, cell, alive, dead, generation, still life, oscillator,
   spaceship, glider, cellular automaton.
2. **How the program is built.** A table of the five methods. Statements
   at the top and methods under them (the first program is the one the
   reader changes, and its picture should be the first thing they see).
   Rule 1 only: each program has its own copy of every method it uses.
   A small program shows that a new `bool[,]` is all `false`.
3. **The rules**, with the picture of the eight neighbours.
4. **Counting the neighbours.** A `CountNeighbours` with no edge check,
   meant to stop with `IndexOutOfRangeException` at the corner cell. The
   reader adds `inside`; the solution's notes say why it must come first
   in the `&&` (short-circuit, as `reading-input` found). Then the reader
   finds the next generation on paper from the counts, in a fold.
5. **The rules in a method.** A `WillBeAlive` that returns `alive`,
   printed as a table for 0 to 8 neighbours. Two solutions: an `if` for
   each kind of cell, and one line with `||` and `&&`.
6. **All the cells at once.** A `Step` that changes the grid it is
   reading. The blinker becomes a block, which the rules never give. The
   reader makes `Step` write into a second grid, `next`. This is the
   page's main idea about algorithms: a simultaneous update needs the old
   state kept while the new one is built, and it ties back to
   `grids-and-references` (a method can change the array it was given).
7. **Shapes of your own**: a beehive, the R-pentomino and a line of ten,
   with open questions.
8. **Looking back**, a challenge (edges that join, with `%`), the page
   and Visual Studio (an animated loop with `Thread.Sleep`), and three
   things to read or watch.

## Decisions

- **"Cell" means a square of the grid on this page.** The Game of Life's
  own word is *cell*, and so is the page's word for a box of code. Using
  both would confuse a reader in their second language at every
  sentence. The page says once that the boxes of code are *programs* here,
  and the page's own buttons and labels still say what they say.
- **The first program is long** (about 100 lines, against the style
  guide's five to fifteen). It is the whole game, shown working before
  anything is named (run first, then name), and the reader is not asked
  to read it all at once: the table and the sections take it one method
  at a time, each in a short program of its own. The later programs
  repeat only the methods they need.
- **The edges are dead.** Conway's grid has no edges; a page must choose.
  Dead edges make the first exception real and teachable
  (`IndexOutOfRangeException` at row −1), and edges that join are the
  challenge, which needs `%` and the sign of a remainder
  (`storing-and-computing`). A probe showed the glider becomes a block
  when it reaches the bottom edge (generation 27 of the opening picture);
  the page asks the reader what happens there, and does not say.
- **The counting program says before it runs that it is meant to stop
  with an exception**, as the translation checklist asks and as
  `grids-and-references` does, and asks in the prose which cell it is
  counting when it stops. The first draft had a predict here and a
  sentence that hid the exception; the predict moved to
  `a-grid-of-true-and-false-1` ("What will the second line print?").
- **The second predict names one line.** It asks for the middle row of
  generation 1, which is line 10 of the output (`line: 10`), and its three
  options are outputs: `..#..` (the rules), `.###.` (no change) and
  `.#.#.` (what the in-place `Step` prints). The options are in backticks
  so that they show in a fixed-width font; the page compares the text of
  the rendered label, so the backticks do not stop a match.
- **No animation on the page.** The course map asked for this to be
  checked. `Thread.Sleep` works in the page's engine (a probe timed three
  sleeps of 200 ms at 550 ms or more), but the console shows nothing
  while a program sleeps (see "Engine and page" below). So the page keeps
  one generation for each press of Enter, and the animated loop is code
  to read, for Visual Studio. The loop was run as a replacement in the
  first program (51 generations), and it compiles and runs.
- **Covers** PDP-LO7 and PDP-LO8, as the entry says. The page adds no
  outcome.
- **Size.** The entry says M (8 to 15 cells). The page has 5 program
  cells and a challenge, but three of them are tasks and one is long, and
  the reading is about an hour. No cell was added to reach a count.
- **Links** go only to lessons that exist: `grids-and-references`,
  `writing-your-own-functions`, `reading-input`, `making-decisions` and
  `storing-and-computing`.
- **Where to read more**: Gardner's 1970 *Scientific American* column
  (the PDF at Stanford answered 200, `application/pdf`), Numberphile's
  *Inventing Game of Life (John Conway)* (title checked with YouTube's
  oEmbed), and Microsoft's arrays reference, as `grids-and-references`
  links it. The argonaut video is already at the end of
  `grids-and-references`, so it is not repeated here.

## How it was checked

`npm run check-lessons -- --write the-game-of-life`, then without
`--write`: 12 runs, no problems. Probes in a scratch lesson
(`scratchpad/gol/lessons/`) ran every claim the page makes that no page
cell prints:

- `inside` last in the `if` still stops with `IndexOutOfRangeException`
  (the solution's notes say the order matters).
- A picture row longer than the first makes `FromPicture` stop with
  `IndexOutOfRangeException` (the page warns about it).
- The glider at the bottom edge becomes a block (not quoted; "Looking
  back" asks).
- One answer to the challenge gives 3 for each corner (not quoted; the
  challenge asks).
- The glider on an 8 × 8 grid whose edges join returns to its first
  picture at generation 32 (not quoted).
- The animated loop for Visual Studio compiles and runs, and
  `Thread.Sleep` really waits on the page.

Every number and output the prose quotes is in the outputs file: the
four shapes of the opening program at generations 0, 1, 2 and 4; `True`,
`False`, 3 and 4; the exception's type, message and lines 24 and 11; the
five rows of counts and the inputs' values 0, 3, 2, 0; the two `True`
rows of the rules table (both solutions); generation 1 of the in-place
`Step` and the block at generations 2 and 3; and the blinker in the
solution.

One fault in the first draft was found this way: the first solution on
`the-rules-in-a-method-1` had a ```` ```console ```` fence in its notes,
which closed the solution block early, so the second solution showed as
a plain code block and never ran. The notes now say the same in words,
and both solutions run.

## Engine and page

- **An array's rank is lost in an exception's frame.** The report under
  `counting-the-neighbours-1` reads
  `at line 24 of Program.cs (in CountNeighbours(bool[], int, int))`, but
  the parameter is a `bool[,]`. A probe with `int[,]` gives `Show(int[])`.
  The cause is `engine/Dewsharp.Browser/Frames.cs` line 88,
  `if (t.IsArray) return TypeName(t.GetElementType()!) + "[]";`, which
  ignores `t.GetArrayRank()`. The page's prose does not quote the member,
  so it stays true when this is fixed.
- **Output written before `Thread.Sleep` does not appear until the next
  write.** `web/engine/worker.js` posts waiting output at most every
  25 ms, and only when the program writes again (or clears, asks for
  input, or ends). A timed run of a loop of `Console.Clear()`, three
  lines and `Thread.Sleep(300)` delivered each picture at the same moment
  as the next clear (at 469, 769, 1069 and 1369 ms), so the console was
  empty during every sleep, and only the last picture stayed. In Visual
  Studio the same loop animates. If the worker flushed before a sleep,
  the page could offer the animation too, and this page's paragraph on
  it would need to change.

## Left out

- The dewlab source, `comprehensions-and-grids`, has only a video link
  about cellular automata; nothing else of it is used here, and its
  grids are already in `grids-and-references`.
- Randomly filled grids (the extra `leaving-it-to-chance` would give the
  tools), counting the live cells in each generation, detecting a still
  life, and Gosper's glider gun (it needs a grid wider than the console
  on a phone).
- A `class` for the grid: PDP's explore pages use methods only.

## Open

1. Is it acceptable that this page calls its code boxes *programs*, so
   that *cell* can mean a square of the grid? The page's buttons are
   unchanged.
2. The opening program is about 100 lines. Is a long showcase program
   acceptable on an explore page, or should the page open with a smaller
   grid (a blinker alone, say) and show the whole game later?
3. Should the edges join by default (Conway's own game has no edges), with
   dead edges as the variation? The page chose dead edges, for the
   exception it teaches.
4. The entry's size is M (8 to 15 cells); the page has 5 cells and about
   an hour of work. Is that the size you want, or should it gain tasks
   (a random start, a count of the live cells)?
5. If the page's engine is changed to show output before a
   `Thread.Sleep`, should this page offer the animated version on the
   page, and keep Enter for stepping?

## Review

Reviewed on 29 September 2026, with fresh eyes, as a Level 5 learner who
knows only the pages before this one, as a teacher, and against the
checklists in `docs/TRANSLATING.md` and the style guide. Every number and
quoted output in the prose was checked against
`the-game-of-life.outputs.json`: the glider at generations 0 and 4, the
blinker and the toad, `True`, `False`, 3 and 4, the exception's type,
message and lines 24 and 11, the counts `00000`, `12321`, `11211`, the
inputs' 0, 3, 2 and 0, the two `True` rows of the rules table, the
in-place `Step`'s generation 1 (`..##.`, `.#.#.`) and the square at
generations 2 and 3, and the blinker in the solution. All of them match.
The claims about earlier pages were checked too: `&&` checks its right side
only when its left side is `true` (`reading-input`), `!`, then `&&`, then
`||` (`making-decisions`), a remainder keeps the sign of the number before
`%` (`storing-and-computing`), and a method can be called above the line
that writes it (`writing-your-own-functions`).

No cell's code changed, so the version stays 2026.09.28.1 and the outputs
file was not rewritten. The changes are all in the prose and the blocks:

- The first predict asked "What will the second line print?", and its note
  on `True` said "Line 2 makes one element `true`", which is a line of
  code. The question now says "the second line of the output", and the
  note names the statement, `grid[1, 2] = true;`.
- The second predict's question now names its line: "What will line 10 of
  the output be, the middle row of generation 1?" (`line: 10` is kept,
  because the parser reads only *first* to *fifth* and *last*).
- The sentence on the rules of the road now says rule 1 in the style
  guide's words (two sentences, "from the first line of the program to the
  last").
- Plain words in place of idioms: "so you can watch the shapes change" (was
  "in front of you"), "directly above" (was "straight above"), "in the
  place of the old value" (was "straight back into"), "Be careful with −1"
  (was "Take care").
- "This program is meant to stop with an exception, so nothing is broken"
  became two sentences that say what is meant: "When it stops, you have not
  broken anything."
- "Conway described his game on a grid with no edges, which is as large as
  the shapes on it need" was hard to read. It is now "Conway's own grid has
  no edges: it has no end in any direction."
- The solution's notes said "the exception returns", and *returns* is also
  what a method does. They now say "the program stops with the exception
  again".
- One sentence was left unwrapped at 110 characters (after the second
  predict); it is wrapped.
- "Looking back" asked where the glider's movement comes from, which the
  page had already answered in its opening section. It now asks whether the
  reader could have said from the four rules alone that a shape would move,
  and what that says about reading a program and running it.
- "The page and Visual Studio" was a `###` inside "Looking back"; it is a
  `##` of its own, since it is not a question for looking back.
- The ending now says, as `bits-that-flip` does, that this extra page has
  no practice page, and points to [Random numbers](lesson:leaving-it-to-chance)
  for a random first picture (one of the tasks the notes left out).
- Microsoft's page is titled *The array reference type (C# reference)*
  (checked on the live page, and as `grids-and-references` cites it), not
  *Arrays (C# reference)*. Its note adds that the page passes a
  two-dimensional array to a method, as this page does.

Checked and left as they are:

- The list of what the four shapes do comes straight after "What does each
  shape do?". The exemplars answer an opening question in the prose under
  the cell in the same way (`objects-and-classes`: "It prints `Grace 8`").
- Hints: each task's first hint asks a question; the counting task's are
  `after: 2 errors` and `3 errors` (its starter stops with an exception, so
  the first run is already one), and the other two tasks' are
  `after: 2 runs` and `3 runs`. Solutions and inputs sit on the cells that
  run. No cell that reads input has `inputs`.
- No verdict words: every *right* on the page is a place ("on the right").
  Spelling is Irish and British (*neighbours*).
- The page never defines *static* in front of a local method, and does not
  need to: `writing-your-own-functions` writes methods this way.

### Still open for Josh

The five questions under "Open" stand as the writer wrote them. The review
adds one:

6. A teacher who opens this page next to `grids-and-references` meets the
   word *cell* used in two ways: that page says "Run the cell", and this
   one says "program", because *cell* is a square of the grid. The page's
   own help and the notebook still say "cell" ("Download project on its
   cell"). If Josh accepts question 1, a short line on the teachers' page
   could say that this one page uses *program*.

### Engine and page (unchanged)

The frame that shows `CountNeighbours(bool[], int, int)` for a `bool[,]`
parameter (`engine/Dewsharp.Browser/Frames.cs`, line 88) is still there,
and still reported, not fixed: the review may not change `engine/`. The
prose does not quote the frame's member, so the page stays true after the
fix.
