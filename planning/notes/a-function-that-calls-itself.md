# a-function-that-calls-itself: notes for a reviewer

A new page, written from the course map's entry (PDP explore E1,
"Recursion: a method that calls itself"). Action *adapt*, shape *explore*,
size M, no worlds, covers PDP-LO8 and PDP-LO2. The entry names no practice
page, and explore pages have none, so there is one page.
`from: a-function-that-calls-itself` names the main source (Dewey Track);
the folder tree as a type of its own, and the loop with a stack, come from
`finding-everything-inside-a-folder` (Computational Methods).

A first draft of the page and both pictures was written on 28 September
2026 by an earlier run that stopped before it ran anything. This run (29
September) ran it in the browser checker for the first time, checked every
claim against the outputs and against the pages it links to, and changed
what is listed under "Changed in this run".

Files:

- `lessons/a-function-that-calls-itself/a-function-that-calls-itself.md`,
  version `2026.09.28.1`. The version stays at `.1`: no class has seen the
  page, and the only code change after the first recording was a comment
  (`// Counts down in twos` became `// Counts backwards in twos`).
- `lessons/a-function-that-calls-itself/a-function-that-calls-itself.outputs.json`,
  written by the browser checker.
- `holidays-folders.svg` (the Holidays tree, as a file browser shows it)
  and `calls-that-wait.svg` (five calls of `FactorialShown` in a
  staircase). Both are redrawn from dewlab's pictures, with C#'s names and
  with the photos before the folders (a `Folder` keeps its files and its
  folders in two arrays, so the order inside a folder is no longer mixed).
  Both have a full description in the Markdown and a `<title>`, and both
  draw on their own white card.

13 exec cells: 2 types cells (`Folder.cs`, a one-line `record`; and
`Photos.cs`, a `static class` whose method `Holidays()` makes the tree) and
11 program cells. 3 predicts (all `choice`), 7 hints, 4 solutions, 3
`inputs` blocks, 1 "Why this way?" fold, 1 challenge. 3 cells are meant to
fail, and the prose says so before the reader runs each one:
`calls-itself-stop-1` and `calls-itself-stop-your-turn`
(`expect: exception`, a `StackOverflowException`) and `calls-itself-stop-3`
(`expect: CS1503`). No cell reads input. No cell warns.

`npm run check-lessons -- a-function-that-calls-itself` reports no
problems (21 runs). I also opened the page in headless Chromium
(`lesson.html?sw=off&id=a-function-that-calls-itself`): no page errors, 30
KaTeX formulas, both pictures load.

## What the page does, in order

| Section | Cells | What the reader does | From dewlab |
|---|---|---|---|
| (opening) | | The Holidays question: how many photos, counting every folder inside every folder? | the same |
| Folders inside folders | `calls-itself-folder`, `calls-itself-photos`, `calls-itself-folders-1`, `calls-itself-folders-2` | meets `Folder` as a record whose `Folders` is a `Folder[]`; reads values with `.` and `[ ]`; predicts what a loop one level deep counts (7, not 9) | `calls-itself-folders-1/2`; the record replaces the nested list and `isinstance` |
| A promise that uses itself | `calls-itself-promise-1`, `calls-itself-promise-your-turn` | runs `Factorial(5)` (120); reads the promise in the comment; writes `SumUpTo`, with `inputs` and a solution (5050) | `calls-itself-promise-1`, `-your-turn` |
| What happens when: calls that wait | `calls-itself-wait-1` | predicts the last line of `FactorialShown(4, "")`; table of five `n`; the call stack, and Visual Studio's Call Stack window | `calls-itself-wait-1` |
| Where the promise stops: the base case | `calls-itself-stop-1`, `calls-itself-stop-3`, `calls-itself-stop-your-turn` | predicts what a factorial with no base case does (a stack overflow after more than 21,000 waiting calls); meets CS1503 for `Factorial(2.5)` and is invited to try `-1`; mends a countdown in twos whose base case is stepped over | `calls-itself-stop-1`, `-stop-3`; the countdown is new |
| Counting every photo | `calls-itself-toolkit`, `calls-itself-count-your-turn` | writes `CountPhotos` (9), with `inputs` for paris, an empty folder and a folder that holds only an empty folder; then `CountFolders` (3) | `calls-itself-toolkit`, `-count-your-turn` |
| Recursion or a loop? | `calls-itself-loop-1` | counts with `Stack<Folder>` (9), sees the order Holidays, paris, louvre, kerry; a table compares the two ways; is invited to try `Queue<Folder>` | `calls-itself-loop-1`; the order and the queue from `finding-everything-inside-a-folder` |

Then "Why this way?" (promise first, trace second), "Looking back" (two
questions), a challenge (`PrintAll`, a path for every photo, with its own
`Folder` and a smaller tree), a paragraph on Visual Studio, a pointer to
*Making change* (not written yet, so in italics with no link), and four
things to read or watch.

## What I decided, and why

- **A record for a folder.** The course map asks for "a `Folder` with a
  list of files and a list of folders". A PDP reader has met one class, the
  `static class Stats` of `building-reusable-tools`, and no constructor. A
  one-line `record Folder(string Name, string[] Files, Folder[] Folders);`
  gives them a type and `new Folder(...)` without a constructor to explain,
  and the page defines *record* in one sentence. FOOP's
  `objects-inside-objects` uses records the same way. Arrays, not
  `List<T>`, because the tree never changes, and `Length` and `new
  Folder[0]` are from `lists-and-sequences`.
- **The tree is made by a method in a types cell** (`Photos.Holidays()`),
  so every program cell makes it with one line and works on its own
  (rule 3). The page points to rules 2 and 3 by number, as the style guide
  asks of pages after the one that teaches them (for PDP,
  `building-reusable-tools`).
- **The loop that counts one level deep finds 7**, where dewlab's found 8.
  dewlab's loop counted the louvre folder as one photo, through `len`. With
  a record, the loop adds `Files.Length` for each folder inside, so louvre
  is not counted at all. The point stays: one loop for each level.
- **`SumUpTo` is compared with the loop of `repeating-yourself-practice`,
  problem 4**, in place of Gauss's formula on a dewlab page that PDP does
  not have. The link has the problem's anchor.
- **The stack overflow is shown on purpose**, as the course map asked me to
  check first. On the page it ends the program with
  `System.StackOverflowException`, and the report names the method but no
  line; the page says why. The cell prints `n` once in every 1,000 calls,
  so the output is 22 lines and shows how deep it went. I ran the same
  program with `dotnet run` (.NET 10 on Linux): it prints `Stack overflow.`
  and `Repeated 174439 times:`, so a computer goes much deeper than the page.
  The page says only that Visual Studio's message is `Stack overflow.` and
  that the number of calls can be very different, since the stack size
  depends on the machine (Windows' default is smaller than Linux's).
- **`Factorial(2.5)` is a cell meant not to compile** (`calls-itself-stop-3`,
  the id of dewlab's 2.5 experiment). In Python, 2.5 steps over 0 and
  overflows; in C#, the type stops it first. The message in the prose is
  the recorded one. `Factorial(-1)` is left to the reader as a question,
  with no fold: it overflows exactly as `FactorialNoStop` does, and the page
  quotes no number for it.
- **A new "your turn" in the base-case section**, `CountInTwos`: dewlab
  had none there, and this is the second part of the rule (every call
  closer to the base case) as a task. The cell prints only numbers above
  −10, so the output is 8 lines before the exception.
- **`calls-itself-toolkit` keeps dewlab's id** although dewsharp has no
  toolkit. The task is the same (write the counting method), and decision
  28 renames only ids that name Python.
- **Three predicts**: the loop one level deep, the last line of the trace,
  and the missing base case. The question on `calls-itself-folders-1` is
  asked in prose, without a predict block.
- **No worlds**, as the entry says.

## What I left out

- dewlab's warm-up `question` blocks (dewsharp has none). The factorial
  warm-up is now one sentence pointing to `repeating-yourself`.
- `calls-itself-promise-2` (checking `factorial_again` against the
  toolkit's `factorial`): dewsharp has no toolkit. The `SumUpTo` task
  compares with a loop in its place.
- `calls-itself-stop-2` (`sys.getrecursionlimit()`): .NET has no such
  limit; the stack's size is the limit, and the page says so.
- The fill-in-the-blank `calls-itself-wait-2` (how many calls for 10), the
  "Did you mean: recursion?" aside, the "four questions" table and the
  "what we have now" table. Terms are defined where they first appear
  instead.
- The music library in `calls-itself-count-your-turn`: `CountFolders` on
  Holidays is the task, since a library would need a second `Photos`-like
  method or a long cell.
- `deepest_level` from `finding-everything-inside-a-folder`: the page was
  already at size M.
- `int` overflow in `Factorial`: `Factorial(13)` is too big for an `int`
  and gives a wrong number with no exception. The promise says "0 or
  more", and the page does not mention the limit (see "Open").

## Changed in this run

- The draft said, without a cell, that `Factorial(2.5)` gives `cannot
  convert from 'double' to 'int'` and that `Factorial(-1)` overflows. Now
  the first is the recorded cell `calls-itself-stop-3`, and the second is a
  question for the reader.
- The countdown task's id changed from `calls-itself-stop-3` to
  `calls-itself-stop-your-turn`, so that dewlab's id stays with dewlab's
  task.
- Phrasal verbs out: "follow the call down", "come back", "what comes
  back", "runs out of room", "counts down".
- "apart from the cell with the stack overflow" became "the two cells",
  since two cells end with one.
- `-1` in code format, in place of a typographic minus that a reader might
  copy into code.

## Open

1. **A record on a PDP page.** PDP never teaches records or constructors.
   The page defines a record in one sentence and uses it only as a holder
   of three values. Is that acceptable on an explore page, or would you
   prefer a small class with public fields and a constructor, as FOOP's
   `objects-and-classes` has?
2. **Two stack overflows on one page.** Both are meant, and the prose says
   so. Is a second one (the countdown task) one too many for a Level 5
   reader, or does it teach the second rule better than prose would?
3. **`Factorial` and `int`.** Should the promise say "n from 0 to 12", or
   should a fold show `Factorial(13)` giving a wrong number, as a link back
   to `types-and-their-sizes`? It would add a cell to a page at the top of
   size M.
4. **Four things to read or watch.** The style guide says "one thing to
   read or watch". The page has Microsoft's pages on records,
   `StackOverflowException` and `Stack<T>`, and the Reducible video. Which
   should stay?
5. **The course file.** `courses/pdp.yaml` still has a `planned:` line for
   this page, and the page now exists, so the line can go (the page's own
   title is the same). I did not edit the course file, as instructed.

## Review

A second reader went through the page on 29 September 2026, once as a
Level 5 learner, once as a teacher, and then against the checklists in
`docs/TRANSLATING.md` and the style guide. Every number and quoted output
in the prose was checked against `a-function-that-calls-itself.outputs.json`
(7 and 9 photos, 120, 5050, the trace, 0 to -21000, CS1503 at (11,29), 5, 3,
1 and `Go!`, 3 folders, the order Holidays, paris, louvre, kerry). All of them
match. The quoted exception report matches the shape `web/page/cell.js`
draws. The anchor `#4-one-to-a-hundred` matches the practice page's
heading. No cell's code changed, so the version stays at `2026.09.28.1` and
the outputs file was not rewritten.

### Changed

- The opening said "A loop cannot answer that … The answer is a method that
  calls itself", but the last section shows a loop that can. It now says
  "A simple loop cannot answer that … One answer is a method that calls
  itself."
- The heading "What happens when: calls that wait" became "Calls that
  wait". The first half read as an unfinished question.
- *trace* was used in the "Why this way?" fold without a definition. It is
  now defined there, and "no magic" (an idiom) became "nothing is hidden",
  the words the page already uses in its body.
- The countdown task: "Can you find the line that lets the count continue"
  could send a reader to the recursive call. It now asks "Why does the
  count never stop? Can you change one line so that it does?" `−10` with a
  typographic minus became `` `-10` ``, as with `-1` above it.
- The countdown hint and solution note used *catch* just after the page
  said `catch` cannot catch a stack overflow, and used "the count is over",
  "stepped over" (a phrasal verb) and "fragile". They now say "stop the
  count for 0, and for every number below 0" and "passed 0 without ever
  being equal to it", in the same words as the 2.5 paragraph.
- "stops at the bottom of every branch of the tree" (*branch* is not
  defined) became "stops at every folder that has no folders inside it".
- "What is an empty folder worth?" became "How many photos should
  `CountPhotos` give for an empty folder?"
- The `CountFolders` task said "It needs two changes to `CountPhotos`", but
  its starter is empty and a method belongs to its cell. It now asks the
  reader to copy their `CountPhotos` into the cell, change its name, and
  make two more changes.
- "Can a loop count every photo after all?" (an idiom) became "Is there a
  loop that can count every photo?"
- "because Holidays pushed kerry and then paris": the loop pushes, not the
  folder. It now says "the loop pushed", and names louvre in the order too.
- The table's "more than 21,000 calls" now says "of `FactorialNoStop`":
  the recorded depth is that method's, and another method's calls can use
  more or less of the stack.
- "recursion reads better and costs nothing" became "recursion is easier
  to read, and the call stack has room for it".
- The `while` loop sentence ("a change in its body that, in the end, makes
  its condition `false`") was rewritten in plainer words.
- "In Visual Studio, the program ends at once too, with the message
  `Stack overflow.`" now says that the console of a program run from
  Visual Studio shows it, since the debugger shows its own window as well.
- Smaller wording: "Here, that does real work" became "Here, that matters";
  "from the top down to it, with a `/` between each pair" became "from the
  top to it, with a `/` between one name and the next"; the Reducible
  entry says "but the ideas are the same". Three long lines were reflowed.

### Checked and left as they are

- `after: 1 runs` on the first hints of the three blank tasks. The format
  suggests `2 runs` for starters that run, but 124 hints across the lessons
  use `1 runs`, so the page follows the lessons.
- The page opens with a question in prose, and its first cell is a types
  cell; the first cell that runs is `calls-itself-folders-1`. The style
  guide asks a page to open by running something. The folder type has to
  come first, and the question is concrete, so I left the order.
- The claim "the report names the method, and not a line, because .NET
  stops before it can say which line" is a simplification of why the
  engine has no line for a stack overflow. It matches what the page shows.
- The Reducible video's length (about twenty-one minutes) could not be
  checked from here (the YouTube tool had no credits).
- `putting-things-in-order-practice`, problem 14, already shows a binary
  search that calls itself and names *recursion* and *stack overflow*. That
  page could link here. I did not edit other lessons.

### Still open for Josh

The five questions under "Open" stand. My view on each, for what it is
worth:

1. The record is defined in one sentence, used only to hold three values,
   and saves a constructor that PDP never teaches. It seems right for an
   explore page.
2. The second stack overflow (the countdown) is the only task on the
   second rule, and the prose says before each run that the cell is meant
   to stop. I would keep it.
3. `Factorial` with `int`: the page stresses that "a promise holds only for
   the inputs it names", and its own promise ("0 or more") is not true from
   13 up. This is the one open point that a careful teacher is likely to
   notice. The cheapest honest fix is a promise of "0 to 12", plus one
   recorded line (`Factorial(13)`) that shows why, pointing back to
   *Types and their sizes*.
4. Four things to read: `objects-and-classes`, the exemplar, also lists
   four, so the page follows the exemplar and not the style guide's "one".
5. The `planned:` line in `courses/pdp.yaml` can go.
