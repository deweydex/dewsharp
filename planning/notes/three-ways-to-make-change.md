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

## Review

Reviewed on 2 October 2026 as a Level 5 learner, as a teacher, and against
`docs/TRANSLATING.md` and the style guide's checklists. Version is now
`2026.10.02.1`. I re-ran `npm run check-lessons -- --write
three-ways-to-make-change`: 16 runs, no problems, and the recorded outputs
are the same as before, except for the version. So no number in the prose
changed. I also opened the page with `npm run serve` and looked at the
opening, the bullet lists and the picture. The two YouTube links are real
videos (title and channel checked with YouTube's oEmbed; the lengths, 9.4
and 15.1 minutes, are from dewlab's `planning/video-library`), and the
Microsoft Learn link answers.

### What I changed

Words and sentences:

- **"Token" was never defined**, and the page never said that a reader has
  as many tokens of each value as they need. The opening now says both, and
  says what it means for tokens to *make* an amount.
- **"Add up to" (eight times) and "add to" are phrasal verbs.** They are now
  "make" (defined in the opening), in the prose and in the XML comments of
  the cells. "Comes from *memo*" is now "is built from *memo*".
- **"What is the fewest tokens...?" was not grammatical.** It is "What is the
  fewest number of tokens...?" in the opening and in the cache bullet.
- **"Fits" was used three times and defined none.** It is defined in the
  opening and again where greedy begins.
- **"In your head" (an idiom)** is now "by thinking".
- **The list of what the page uses** was one long sentence whose commas could
  be read two ways. It is now four bullets, with links to *Methods* and
  *Arrays and lists* added.
- **"Look at the line inside the loop" did not name the line.** It now quotes
  `int rest = FewestBruteForce(amount - token, tokens);`. The hint on
  `trying-every-combination-2` quotes `BruteForce.Fewest(6, tokens)` in
  place of "the last line". The hint on `the-greedy-shortcut-3` says which
  lines of the cell above to copy.
- **The line `if (token <= amount)` was never explained.** It is now, in the
  paragraph on the base case.
- **The long `if` was one hard sentence.** It is now one sentence and two
  bullets, and says what `rest` is and why `best` starts at -1.
- **"Think about how it reaches 6" and "Then think about brute force"** were
  orders to think. They are now "Here is how it reaches 6" and "Then what
  about brute force...?".
- **"Path"** is defined where the picture needs it (a list of choices).
- **Four names for the second way** (cache, memoization, "the cached way",
  and `Cached`) are now tied together: "We call it *the cached way*", and the
  table row is "The cached way (memoization)".
- **"Promise"** (never defined here; Recursion uses it in another sense) is now
  "certain" and "certainty", matching the opening's "being certain of the
  answer".
- **"A till" and "no waiting"**: till is defined, and "no waiting" (which meant
  nothing for greedy) is gone from the table.
- **Greedy is defined before it is used.** The definition now comes with the
  first description of the way, not after the first run.
- **`Greedy.Fewest` has a name that claims what the page then disproves.**
  I kept the name, so that the three calls look alike, and added a sentence
  that says so.
- **A dictionary as a reference type** pointed to *Two names, one list*, which
  covers arrays and lists. It now says "like the arrays and lists on...".
- **The `using` paragraph** said a cell "asks". It now says that C# adds
  `Console` and `Dictionary` to every cell, and that a `using` line names
  another part of .NET.

Accuracy, against the recorded outputs:

- **"Euro coins, in cent, are 1, 2, 5, 10, 20 and 50"** left out the 1 euro
  and 2 euro coins. The page tested only amounts from 1 to 99 with those six
  coins, so it now says "the euro coins worth less than one euro". The code
  comment, the fold under the vending machine question, and the question
  itself say the same, so the page claims no more than it ran.
- **"With 1, 3 and 4, greedy is never more than one token away"** is now "for
  the amounts up to 40", which is what the cell ran.
- **The note on `the-greedy-shortcut-3`** ("for the last 6 of the amount") was
  hard to follow. It now uses the recorded line `10: greedy 4, cached 3`
  (4, 4, 1, 1 against 4, 3, 3).
- **A cache holds answers for one set of tokens only.** The page was silent
  about why each cell makes a new `Dictionary`. It now says so, and says the
  count cell does it so that each count starts with nothing stored.
- **"The table of calls above"** was not a table. It is "the calls that the
  last cell counted".
- **The page said the Stop button stops brute force for 100.** It now adds
  that the page stops any program after 30 seconds (`web/help.html`).
- **"Apart from the times"** in the Visual Studio paragraph: the page prints
  no times. It now says "except for a time that you print yourself".
- **`repeated-question.svg`**: the last line of its caption ran past the
  right edge of the picture, so "2." was cut off. It is now two lines, and
  the picture is 22 pixels taller.
- The count cell now invites a guess in prose ("What do you think happens
  to each count as the amount grows?").

Nothing in a cell's code changed except its comments, and the version
changed for that reason.

### What I checked and left alone

- Every number in the prose and the folds is in the outputs file: 2, 3 and
  -1; 25 for 100; the six lines of the cache; 168, 1,869, 20,736, 54,288 and
  142,129 calls against 26, 41, 56, 62 and 68; 0 amounts that differ below
  100 cent; the nine amounts from 6 to 38; 4 against 2 for 1, 4, 5 at 8; and
  `Greedy: -1`, `Brute force: 2`. The picture's counts (2 appears three times
  in two steps, and a fourth time after four 1s) are right.
- Three predicts (a number and two choices, no option marked), five hints
  (the first of each a question, all with `after:` that the starter can
  reach), two solutions, one fold with the line the format asks for, and one
  challenge that compiles alone. No verdict words; Irish and British
  spelling; no cell warns, fails or reads input. Every program cell stands
  on its own and uses only types from the cells above it.
- The outcomes (PDP-LO2, PDP-LO8) are in the frontmatter, the page says it
  is an extra, and it says that none of it needs Visual Studio.
- The course-map entry is covered: euro coins, greedy failing at 1, 3 and 4,
  and a `Dictionary` that makes the slow way fast. `Stopwatch` is there in
  one cell (see "Open for Josh", 1).

### Open for Josh

1. **`Stopwatch` times the ways, says the entry. On the page it times one
   way, in the reader's own line.** The checker compares outputs exactly, so
   no cell can print a time. One idea needs no change to the format: a cell
   that prints `watch.ElapsedMilliseconds < 1000` gives `True` on any
   computer, and shows that cached for 100 and brute force for 20 are both
   quick. It would not show the growth, so I did not add it. The format
   question in "Open", 1 above still stands.
2. **Other pages and files that should now point here.** I was not to edit
   them. `lessons/a-function-that-calls-itself/a-function-that-calls-itself.md`
   ends "The extra page *Making change* ..." in italics with no link, and
   can now link to `lesson:three-ways-to-make-change`. In `courses/pdp.yaml`,
   the `planned:` line for `three-ways-to-make-change` can go, as
   `docs/TRANSLATING.md` says (the lines for `three-doors` and
   `counting-darts` can go too, since both are in `lessons/`).
3. **The euro coins.** The page now says "less than one euro" because that
   is what it ran. If you want the vending machine question to cover the 1
   and 2 euro coins as well, the euro cell needs `100, 200` in its array and
   a longer loop, and the notes and the fold need the new count.
4. **Cell length.** The style guide says five to fifteen lines. The three
   class cells are 22 to 31 lines, because each holds one recursive or
   looping method with its XML comment. I did not cut them: each is one
   idea, and the comment is the page's own rule from *Reusable methods*.
5. **"Memoization" and "dynamic programming".** The page calls the cache
   memoization and the challenge's loop dynamic programming, and the reading
   note says dynamic programming is "the general name for the cache and the
   table". A teacher who knows the field would call both dynamic programming
   (top down and bottom up). I left it, because the page does not claim the
   two are different things.
6. **The writer's open questions 2 and 3** (brute force for 100 on purpose,
   and `using` on a PDP page) stand. I kept both as written, and made the
   `using` paragraph plainer.
