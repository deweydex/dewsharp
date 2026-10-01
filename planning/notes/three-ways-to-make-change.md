# three-ways-to-make-change: notes for a reviewer

A new page, written from the course map's entry (PDP explore E6, "Making
change: three ways to use the fewest coins"). Action *adapt*, shape
*explore*, size M, no worlds, covers PDP-LO2 and PDP-LO8. The entry names
no practice page, and explore pages have none, so there is one page.
`from: three-ways-to-make-change` (Computational Methods). Written on 29
September 2026, version `2026.09.28.1`, as the task asked.

Files:

- `lessons/three-ways-to-make-change/three-ways-to-make-change.md`
- `lessons/three-ways-to-make-change/three-ways-to-make-change.outputs.json`,
  written by the browser checker.
- `lessons/three-ways-to-make-change/repeated-question.svg`: redrawn from
  dewlab's picture of the same name. dewlab's used the page's CSS variables
  (`--dl-cell-bg` and so on), which an `<img>` cannot see, so this one has
  fixed ink on its own white card, like `calls-that-wait.svg`. The amount 2
  is marked by a thick border and bold text as well as a colour, and a line
  at the bottom says so. It has a `<title>` and a full description in the
  Markdown.

13 exec cells: 3 types cells (`BruteForce.cs`, `Cached.cs`, `Greedy.cs`,
each a `static class` with a method `Fewest`) and 10 program cells. 3
predicts (1 `number`, 2 `choice`), 5 hints, 2 solutions, 1 answer fold, 1
challenge. No cell is meant to fail, no cell reads input, no cell warns.
`npm run check-lessons -- three-ways-to-make-change` reports no problems
(16 runs).

## What the page does, in order

| Section | Cells | What the reader does | From dewlab |
|---|---|---|---|
| (opening) | | the problem; greedy named as the way people give change; "this page is an extra" and what it uses | the same, with the extra paragraph |
| Trying every combination | `trying-every-combination-1`, `-class`, `-2` | predicts brute force for 6 (2); reads the recursion, the base case, -1 for "no answer"; meets `BruteForce` in a class with a field `Calls`; finds 10 (3) and an amount that 3 and 4 cannot make (-1) | `trying-every-combination-1/2`, plus dewlab practice problem 4's "no 1" |
| Remembering what we already found | `remembering-what-we-already-worked-out-1`, `-1-program`, `-2`, `-3` | meets a cache as a `Dictionary<int, int>` and sees what it holds after 6; memoization; counts calls for 10 to 24 (20,736 against 56 for 20); times the cached way for 100 with `Stopwatch` and adds the line that prints the time | `remembering-...-1/2/3`; `time` becomes `Stopwatch`, and the table counts calls |
| The greedy shortcut | `the-greedy-shortcut-1`, `-1-program`, `-2`, `-3`, `when-the-shortcut-fails-1`, `-2` | predicts greedy for 6 (3); greedy and heuristic defined; euro coins agree for every amount from 1 to 99; finds the amounts from 1 to 40 where 1, 3, 4 differ; 1, 4, 5 at 8 (4 against 2); predicts greedy's -1 for 3, 4 at 6, where brute force finds 2 | `the-greedy-shortcut-1/2/3`; the last two cells are dewlab practice problems 3 and 4, with their ids |
| Choosing a strategy | | the table; the vending machine question, now with an answer fold | the same |

Then "Looking back" (two questions), a challenge (the fewest for 0 to 30
with a loop and an array, named *dynamic programming*), a paragraph on
Visual Studio, and four things to read or watch.

## What I decided, and why

- **Three static classes, one for each way** (`BruteForce.Fewest`,
  `Cached.Fewest`, `Greedy.Fewest`). A method belongs to its cell, and the
  page compares the ways in six cells. Copying 20-line methods into each
  would make every cell long. A `static class` in a types cell is what a
  PDP reader has met on `building-reusable-tools` (with a field, in
  "Variable scope, again"), and `a-function-that-calls-itself` uses one the
  same way. The page opens with the method as a local method in a program
  cell (run first), and then moves it into the class, and says why.
- **`Calls`, a public static field, counts the calls.** A static local
  function cannot use a variable of its cell, so a counter needs a field.
  The count cell sets it to 0 before each count.
- **Counting calls, not times, in the table.** The checker compares every
  recorded output exactly, so a cell that prints a time would differ on
  every run, and the check without `--write` would fail. The call counts
  are exact and the same everywhere, and dewlab's own prose quoted them
  (20,736 and 56 for 20, which C# gives too). `Stopwatch`, which the entry
  asks for, is in the "your turn" `remembering-...-3`: the starter starts
  and stops a stopwatch and prints only the answer (25 for 100), and the
  reader adds the line that prints `ElapsedMilliseconds`. That cell has no
  solution, because its solution's output would be a time and would be
  recorded. The prose says the page prints no times of its own.
- **The timing hint suggests 30, 32 and 34 for brute force.** In a scratch
  lesson in the browser engine, the cached way for 100 took 1 ms, and brute
  force took 2 ms for 20 and 22, 6 for 24, 16 for 26, 42 for 28 and 127
  for 30. dewlab's 20 to 24 are too fast on the page to show growth, so the
  hint starts at 30. These times are not on the page.
- **`using System.Diagnostics;`** at the top of a program cell compiles
  with classes from the cells above; the page explains it in two
  sentences. PDP has no other page with `using`; FOOP's
  `namespaces-and-libraries` teaches it properly.
- **-1 for "no answer"**, in place of Python's `None`. An `int?` would be
  new to a PDP reader. The prose says why -1 is safe.
- **Greedy goes through the array from the end**, and the tokens in every
  array are written from the smallest to the largest. dewlab sorted a copy;
  `Array.Sort` sorts in place and would change the caller's array, which is
  a lesson of its own.
- **The euro cell also counts the amounts from 1 to 99 where greedy and the
  cached way differ** (0). dewlab tried only 6, 41 and 63. The count makes
  the vending machine fold's answer rest on a recorded number.
- **Two of dewlab's practice problems are on the page**
  (`when-the-shortcut-fails-1` and `-2`, dewlab's ids): an explore page has
  no practice page, and "greedy is more than one token away" and "greedy's
  -1 is not brute force's -1" are the two surprises worth keeping. The
  second has the third predict.
- **Three predicts**: brute force for 6 (number), greedy for 6 (choice),
  greedy's first line with 3 and 4 (choice, the options are the line's
  text). The count table has a question in the prose, not a predict.
- **The heading "Remembering what we already worked out" became
  "Remembering what we already found"** (a phrasal verb), and the cell ids
  keep dewlab's words, as decision 28 renames only ids that name Python.
- **The challenge is the loop version (dynamic programming, from the
  smallest amount upward).** It compiles alone, as the checker requires. I
  ran a solution in a scratch lesson: `0 1 2 1 1 2 2 2 2 3 ...`, with
  `fewest[6]` 2, as the prose says.
- **"wrong change" for the till** became "a till that must always give
  change in the fewest coins", to keep verdict words out.

## What I left out

- dewlab's per-section `covers:` map, and CMPS outcomes (the entry gives
  PDP-LO2 and PDP-LO8).
- dewlab practice problems 1, 2 and 5 (10 by hand is now the first "your
  turn"; the base case and the trade-off are in the prose and the table).
- The link to *Recursion: finding every file in a folder tree*: dewsharp's
  `a-function-that-calls-itself` covers it, and the page links there.
- A glossary file: dewsharp has no glossary panel, and each term (brute
  force, cache, memoization, greedy, heuristic, field, dynamic programming)
  is defined where it first appears.

## Open

1. **Times on a page whose outputs are compared exactly.** The entry says
   "`Stopwatch` times the ways". The page cannot record a time, so the only
   running `Stopwatch` is the reader's own line in a "your turn". Is that
   enough, or should the format have a way to mark a cell's output as
   varying (for example `output: varies`), so that the checker records the
   run but does not compare it? The same need will come for any page that
   times something.
2. **Should brute force for 100 be run on purpose?** dewlab asks the reader
   to reason, not run. The page says the Stop button stops it. It never
   finishes in the checker's 30 seconds, so it can't be a recorded cell.
3. **`using` on a PDP page.** This is the only PDP page with a `using`
   line. The alternative is `System.Diagnostics.Stopwatch` written in full
   each time, which is longer but needs no new idea.
