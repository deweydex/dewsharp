# mixed-programming: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (PDP
lesson 25, the last page of the series "Methods, lists and algorithms").
Action *adapt*, shape *mixed set*, size M, batch 9, no worlds. A mixed set
has no practice page ("Practice pages and mixed sets" in
`planning/COURSE_MAP.md`), so there is one page. `from: mixed-programming`
is dewlab's `tutorials/mixed-programming/`, whose problems 7 to 20 are the
core of this page.

Files:

- `lessons/mixed-programming/mixed-programming.md`: the page, version
  `2026.09.28.1`. No cell's code changed after the first recording, so the
  version did not go up. (The cells were tried first in a scratch copy of
  the page, and only then written into `lessons/` and recorded.)
- `lessons/mixed-programming/mixed-programming.outputs.json`, written by the
  browser checker.

The page has 15 problems and 14 exec cells, all of them program cells
(`Program.cs`; no types cells, no `var`, every type written). Each method is
a `static` local method in the cell that uses it, as on
`writing-your-own-functions`, so every cell works on its own (rule 1).
2 predicts (both `choice`), 24 hints, 16 solutions (three problems have two
tiers), 11 `inputs` blocks, 5 answer folds, 1 hint fold (the table of
pages), 1 challenge. 2 cells are meant to stop with an exception, and the
problem says so before the reader runs them: `where-the-null-came-from-1`
and `mines-next-door-1` (`expect: exception`). No cell reads input. No cell
warns.

`npm run check-lessons -- mixed-programming` reports no problems (42 runs).
I also opened the page in headless Chromium (`node tools/serve.mjs --port
8757 --isolate`, `lesson.html?sw=off&id=mixed-programming`): no page errors,
every cell labelled *program* and `Program.cs`, the three pieces of maths
typeset (the fraction is in a hint, which is in the page, hidden, when the
maths is typeset), and the table of pages renders with working links.

## What the page does, in order

An opening of three paragraphs says what a mixed set is (each problem needs
more than one page, and none says which), that many problems hide a
decision, and that a comment or an XML comment is where a decision is
recorded. It says that some cells are meant to fail, and it points to
rule 1.

| # | Problem | Cell | What the reader does | From dewlab |
|---|---|---|---|---|
| 1 | The longest word, however it is written | `the-longest-word-however-it-is-written-1` | writes `LongestWord`; `inputs` | 7 |
| 2 | The three commonest words | `the-three-commonest-words-1` | counts words in a dictionary, sorts by a rule; meets a three-way tie; two solutions, the second with a rule for the tie | 8 |
| 3 | Anagrams | `anagrams-1` | predicts what `==` on two dictionaries gives (`False`), then writes `SameLetters`; two solutions | 9 |
| 4 | Ten thousand searches | `ten-thousand-searches-1` | decides first, then runs a cell that counts the comparisons; a fold with the answer and why the counts are `long` | 10 (a question with no cell in dewlab) |
| 5 | A pair with a given sum | `a-pair-that-adds-up-1` | writes `PairWithSum`, returning an empty array for "none"; two solutions, nested loops and a dictionary | 11 |
| 6 | By surname | `by-surname-1` | gives `Array.Sort` a rule; the note on names that do not fit it | 12 |
| 7 | Merging two sorted arrays | `merging-two-sorted-lists-1` | writes `Merge`; the note names merge sort | 13 |
| 8 | Where the null came from | `where-the-null-came-from-1` | reads a `NullReferenceException` report, names the line that failed and the line that is responsible; changes the program; a solution with the `TryParse` shape | 14 |
| 9 | A list that will not empty | `a-list-that-will-not-empty-1` | predicts (`3 elements: 1, 2, 3`), then empties the caller's list with `Clear` | 15 |
| 10 | Any base | `any-base-1` | completes `ToBase` from a starter that finds the last digit | 16 |
| 11 | A week of steps | `a-week-of-steps-1` | writes `Report`, which returns a `Dictionary<string, int>` | 17 |
| 12 | Sorted, and the same things | `sorted-and-the-same-things-1` | writes `IsSorted` and `SameItems`; an input catches a `SameItems` that sorts the caller's array | 18 |
| 13 | The missing number | `the-missing-number-1` | writes `Missing` with the formula for 1 + 2 + … + n | 19 |
| 14 | Mines next door | `mines-next-door-1` | a Minesweeper count that stops at the corner (`IndexOutOfRangeException`); guards the edges, decides about the square itself | new: the grid problem the entry asks for |
| 15 | Somebody else's method | none | a question and a fold | 20 |

Then a closed fold, *which pages each problem draws on* (as on
`mixed-first-programs`), and the close: a question in "Looking back", a
challenge (draw a whole Minesweeper field with the reader's `MinesAround`),
the next page ([A whole program](lesson:from-cells-to-a-program)), a
sentence on Visual Studio, and three things to read or watch.

## What I decided, and why

- **Which problems.** The entry says "problems 7 to 20 in C#, with the
  first six moving to `mixed-first-programs`", and "one new problem for
  each page of the series that dewlab's set missed (grids, references)". So
  the page has dewlab's 7 to 20, in dewlab's order, and one new grid
  problem (14, Minesweeper) before the closing question, so that a teacher
  can put the two pages side by side. For references I did not add a
  separate problem: dewlab's 15 is about references already, and three more
  problems here turn on them in C# (3, `==` on two dictionaries; 12, a sort
  that changes its caller's array; 8, a `null` that travels). See "Open", 1
  and 4.
- **Cell ids.** Where the task is dewlab's, the id is dewlab's, even where
  the method's name changed (`a-pair-that-adds-up-1` holds `PairWithSum`,
  because "add up to" is a phrasal verb in the prose; `merging-two-sorted-
  lists-1` merges arrays into a `List<int>`). New ids:
  `ten-thousand-searches-1` (dewlab had no cell), `where-the-null-came-from-1`
  (dewlab's id names Python's `None`; `DECISIONS.md` 28), and
  `mines-next-door-1` (new).
- **What C# changed, problem by problem.**
  - 3, Anagrams: dewlab's first solution compares two dictionaries with
    `==` and says that "two dictionaries are equal when they have the same
    keys with the same values". In C#, `==` on two dictionaries compares
    references, so that code compiles and always says `False` (probed:
    `==` and `Equals` both give `False` for two dictionaries with the same
    pair). So the problem opens with that code and a predict, and the
    solutions compare pair by pair (with a `Count` check; the inputs
    include LOOP and LOOPS, which a one-way check says yes to) or sort the
    letters and use `SequenceEqual`, which `grids-and-references-practice`
    6 met.
  - 2, the three commonest words: dewlab's note relies on Python's stable
    sort to explain the third word. `putting-things-in-order` told the
    reader that `Array.Sort` is unstable, so the first solution's note says
    that nothing promised the third word, and a second solution adds a rule
    for a tie. The first solution also prints every word's count, so that
    the "4 times" and "2 times" in the note are recorded (decision 29).
  - 5, a pair: C# has no `None` for an `int[]` that a caller wants to
    print, so the method returns an empty array for "no pair", and the note
    says why (and points to problem 8). An input `{ 5, 1 }` with target 10
    catches a method that pairs a number with itself.
  - 8, where the null came from: dewlab's bug (a `print` where a `return`
    belongs) is a compiler error in C# (CS0029, on `writing-your-own-
    functions`), as the entry foresaw. So the page has a `null` returned
    for "not found" and used two methods later, with the vocabulary of
    `when-it-goes-wrong` (*the line that failed*, *the line that is
    responsible*). The last paragraph of the solution note mentions the
    CS0029 version, so the link to dewlab's problem is still there.
  - 4, ten thousand searches: dewlab's numbers came from its prose; here a
    cell prints them (decision 29). The fold adds a C# point from
    `types-and-their-sizes`: without `(long)`, the multiplication is done
    in `int` even though the variable is a `long` (probed: it prints
    705032704 with no message; the page says "a number that is far too
    small" and quotes no number).
  - 12: `Array.Sort` changes the array it is given, so a `SameItems` that
    sorts its parameters changes the caller's `before`. The program prints
    `before`, the last input is `before`, and the second hint asks about
    the last line. dewlab's "shorter way" with `all()` has no C# twin
    without LINQ, so it went.
  - 10: the parameter is `numberBase` because `base` is a keyword (probed:
    `int base` gives CS1001). The starter finds the last digit, so that
    `digits` is used and the starter does not warn (CS0219).
  - 11: dewlab's week has 8 days; this one has 7, so that a week is a
    week.
  - 9: a solution with `Clear()` was added, because dewlab stopped at the
    predict and a reader can now try the other row of the table on
    `grids-and-references`.
- **The new grid problem.** Minesweeper is familiar, small, and joins
  grids, methods, the off-by-one exception of `when-it-goes-wrong`, and
  `&&` stopping at the first `false` (`making-decisions`). It hides a
  decision (does a square count itself?), and the inputs include a mine
  square. The field is an `int[][]`, as on `grids-and-references`. The
  challenge builds on it, with a stub `MinesAround` so that it compiles
  alone (decision 40).
- **Two predicts**, each with the output among its options: the first line
  of the anagram cell (`False`) and the one line of the list cell
  (`3 elements: 1, 2, 3`). Other places where a guess could go (the three
  commonest words, the `null`) ask their question in the prose instead,
  because the answer is a line number or a decision, not an output.
- **Hints wait for an attempt.** On a starter that runs, `after: 2 runs`
  and `after: 3 runs`; on the two starters that stop with an exception,
  `after: 1 errors` / `after: 2 errors`. Each first hint asks a question.
- **The table of pages** is a closed `dl-hint` fold at the end, as on
  `mixed-first-programs`, so that a teacher sees what each problem uses,
  and a reader who has not tried is not told.
- **Words.** Removed or avoided: "add up to", "came in", "went in", "look
  for", "look up", "give back", "run out", "miss out", "comes up". Terms
  defined where they first appear on this page: *punctuation*, *anagram*,
  *surname*, *merge*, *merge sort*, *stable* (pointed back to `Sorting`).
  "Right" appears only as a direction (the right of `=`, the bottom right
  corner).
- **Where to read more.** Exercism's C# track and Advent of Code (more
  problems of this kind), and the Stand-up Maths video that the dewlab
  video library tags for "programming practice" and
  "mixed-algorithms-that-scale". Its title was checked with YouTube's
  oEmbed; its length (28.8 minutes) is from `picks.csv`. I could not check
  its year, so the entry gives none, unlike other pages. "It ran for about
  a month" is from memory of the video (the title's percentage is about a
  month against a few milliseconds).

## What I left out

- dewlab's problems 2 (above the average) and 3 (the second largest):
  they are in neither PDP mixed set (see "Open", 1).
- dewlab's `guess: yes` on every `inputs` block: dewsharp has no guess
  column. The opening paragraph asks the reader to write down a guess
  before comparing.
- The "shorter way" solutions that used Python's `sorted`, `set` and
  `all()`.

## Where each number and quoted output comes from

Every number and every quoted output in the prose, folds, hints and
solution notes is in `mixed-programming.outputs.json`:

- 1: `BRIDGE`, `BB`, `""` (the solution's values).
- 2: `the, cat, sat` and the counts 4 and 2 (solution 1's output);
  `the, cat, on` and the order `cat`, `on`, `sat` (solution 2's output).
- 3: `False`, `False` (the cell); `True`, twice (both solutions).
- 4: 20, 200000, 5000000000, 25000 and 20000000 (the cell).
- 5: `[2, 7]` and `[]` (both solutions' values).
- 6: `Grace Hopper, Karen Spärck Jones, Ada Lovelace, Alan Turing` (the
  solution).
- 7: `1, 2, 3, 4, 9, 10` (the solution).
- 8: `GRACE, 5 letters`, the `NullReferenceException` at line 16 in
  `Badge(string[], char)` and line 21 (the cell's exception, written in
  the page's report format, as `grids-and-references-practice` quotes
  one); `Nobody's name starts with L.` (the solution).
- 9: `3 elements: 1, 2, 3` (the cell); `0 elements:` (the solution).
- 10: `101010`, `FF`, `52`, `0` (the solution's values); `ff` (its output).
- 11: 7, 4, 5, 3 for the week and 1, 1, 0, 0 for one day (the solution's
  values).
- 12: `Is after sorted? True`, `The same items? True`, `before is 3, 1, 2`
  (the solution); `before is 3, 1, 2` in the second hint (the cell).
- 13: 3, 1, 1 (the solution's values).
- 14: 3, then the `IndexOutOfRangeException` at line 8 (the cell); 3 and 1,
  and 1 for the mine square (the solution's output and values).

Claims that no cell on the page records, each probed in a scratch lesson
with the browser checker (`node tools/check-lessons.mjs --lessons <scratch>
--write`): `int base` as a parameter is CS1001 (problem 10's text);
`Convert.ToString(42, 3)` stops with an `ArgumentException`, "Invalid
Base." (problem 10's note: "knows only a few bases"); without `(long)`, and
with `long linear = searches * (size / 2);`, the cell prints 705032704
(problem 4's fold, which quotes no number); `items.Clear()` empties the
caller's list; two dictionaries with the same pair give `False` for both
`==` and `Equals`; `Array.Sort` with the by-count rule keeps `cat`, `sat`,
`on` in the order the dictionary gives them.

## Open

Questions only Josh can settle.

1. **dewlab's problems 2 and 3 are on neither PDP mixed set.** The course
   map sends problems 1 to 6 to `mixed-first-programs` and 7 to 20 here.
   `mixed-first-programs` took 1, 4, 5 and 6, because 2 and 3 need arrays,
   which its series has not met. "Above the average" is close to
   `lists-and-sequences-practice` 10, so losing it costs little. "The
   second largest" has a real C# decision in it (an `int` cannot be
   `null`, so a method with no second value must throw, use the
   `TryParse` shape, or return a special number), and would fit here as a
   sixteenth problem. Add it, or leave both out and correct the entry?
2. **Size.** The entry says M (8 to 15 cells, about an hour). The page has
   14 cells and 15 problems, the most a learner could do in an hour only by
   choosing. dewlab's page has 20. Should the page say that a class can do
   any five, or should two problems go (10, Any base, and 13, The missing
   number, are the easiest to lose)?
3. **The table of pages in a fold.** Both PDP mixed sets now have it, and
   the FOOP mixed set does not. One rule for all six mixed sets?
4. **"Grids, references".** I read the entry's "one new problem for each
   page … that dewlab's set missed" as one new grid problem, since dewlab's
   problem 15 is already about references and three more problems here
   turn on them. If you wanted a separate references problem as well, a
   good one is a grid built from one row (`{ row, row }`), but
   `two-names-one-list` already ends with it.
5. **`Dictionary<int, bool>` as a set.** Problem 5's faster solution keeps
   only keys. C#'s own tool for that is `HashSet<int>`, which no page of
   either course meets. Name it in the note as "a type made for this",
   or leave it for the explore page on collections?
6. **A dictionary as a report.** Problem 11 returns `Dictionary<string,
   int>`, because PDP has no class for data. A FOOP reader would write a
   record. Is the dictionary acceptable in PDP, or should `Report` become
   three small methods (one job each, as `building-reusable-tools` says)?
7. **"Another version of .NET could give a different third word."** This
   follows Microsoft's documentation (`Array.Sort` is unstable), and the
   page `putting-things-in-order` says the same. For seven words, .NET's
   `Array.Sort` in fact uses an insertion sort and keeps the order, so a
   teacher who tries it will never see it change. Keep the sentence as
   it is, or soften it to "nothing promises it"?

## Review

Reviewed on 29 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one (the whole of "First
programs", then "Methods, lists and algorithms" from
`writing-your-own-functions` to `how-we-got-here`, with their practice
pages where the page points to them), once as a teacher against the course
map's entry and dewlab's problems 7 to 20, and then line by line against
the checklists in `docs/TRANSLATING.md` and the style guide.

The page does what its entry asks: dewlab's problems 7 to 20 in dewlab's
order, "Where the None came from" as a `null`, loops where dewlab used
`sorted`, `set` and `all()`, and one new grid problem. Every term is
defined on this page where it first appears, or on an earlier page with
the same word: *reference type*, *caller* and "two names lead to one
array" (`grids-and-references`), *stable*, *pass* and $n \log n$
(`putting-things-in-order`), *looks* and the halving count
(`finding-things`), *overflow* (`types-and-their-sizes`), *the line that
failed* and *the line that is responsible* (`when-it-goes-wrong`), *XML
comment*, *edge case*, `out` in a method of our own and "a NaN travels"
(`building-reusable-tools`), `SequenceEqual` and `==` on two arrays
(`grids-and-references-practice` 6), `ToCharArray` and
`new string(letters)` (`building-reusable-tools-practice`), `&&` stopping
at the first `false` (*short-circuiting*, `making-decisions-practice` 12
and `putting-things-in-order-practice`), and the formula for 1 + 2 + … + n
(`repeating-yourself-practice` 4). `Clear` is new, and the hint that
needs it says what it does. `MoreOftenFirst` over `counts.Keys.ToArray()`
is the shape of `putting-things-in-order`'s `your-turn-4`, so problem 2
starts from something the reader has written. Each cell works on its own
(rule 1, named as such, since `building-reusable-tools` has taught the
rules). Both predicts have the recorded output among their options, and
the anagram predict names its line. Both cells meant to stop have
`expect: exception` and prose that says so before the run. Every
`inputs` block and every solution sits on the cell that runs; no cell
reads input. The report quoted in problem 8 is in the page's own format
(`web/page/cell.js`, `drawException`), with the recorded lines 16 and 21.

### What I changed in the page

No cell's code changed, so `version:` stays `2026.09.28.1` and the
outputs file is the writer's. The changes are to prose, one fold's
summary, and one hint block (hints do not change what a cell does).

1. **The opening said something untrue.** "Some cells are meant not to
   compile, or to stop with an exception": no cell on this page is meant
   not to compile. It now says "Two cells are meant to stop with an
   exception". "can you write down" (a phrasal verb) is now "can you
   write", as `writing-your-own-functions` says it.
2. **Problem 11 did not name its keys.** The question asked for "a
   dictionary of four numbers", and only the solution named them
   (`"most"`, `"fewest"`, `"above average"`, `"longest run"`). A reader
   who chose other keys would see every row of **Compare with a
   solution** differ, with nothing to say why. The question is now a list
   with each key and what its number means, which also replaces a long
   sentence held together by semicolons. The note's "the lines worth
   keeping" (which reads as "keep these lines in the code") and "wins in
   a row" (an idiom) are now "worth remembering" and "wins one after
   another".
3. **Problem 8.** "makes a badge for somebody on a team, from the first
   letter of their name" suggested that the badge is made from a letter;
   it now says the program finds somebody by that letter and makes a
   badge for them. The answer fold now opens with *Here is one answer.
   Yours may be different and work too.*, as the same kind of fold does
   on `when-it-goes-wrong`, because "the line that is responsible" is a
   judgement. "the call that led there" is now "the line that called
   `Badge`". "throw an `ArgumentException` whose message names the letter,
   as `Mean` did" said that `Mean`'s message named something; `Mean`'s
   message is "Mean needs at least one number.", so it now says "throw an
   `ArgumentException`, as `Mean` did on Reusable methods, with a message
   that names the letter."
4. **Problem 4's fold.** It gained the one-answer line (the question "How
   would you find them?" has more than one answer). It now says why the
   cell's sort count is `size` times `looks` ($\log n$ is the number of
   halvings, in `finding-things`'s words), which the cell's comment
   assumed. The `(long)` paragraph now uses the series' word, *overflows*,
   with a link to `types-and-their-sizes`, and is two sentences where it
   was one long one.
5. **Problem 5.** "A dictionary finds a key without checking every pair"
   was ambiguous on a page about pairs of numbers; it now says "without
   checking every key".
6. **Problem 13 had one hint, which gave the formula.** The first hint
   now asks a question and points to where the formula is ("what should
   the total of the numbers from 1 to `n` be?"), and the formula moved to
   a second hint, `after: 3 runs`.
7. **Problem 14.** "Decide, and write your decision in a comment." was an
   order; it is now "Can you decide, and write your decision in a
   comment?" The note's "`field[r].Length` is never asked of a row that is
   not there" is now "the method asks for `field[r].Length` only when row
   `r` is there".
8. **Problem 15's fold** said "Problems 1, 5, 7 and 12 each tried one" of
   "an empty array, an empty string, 0". Problem 1 tried no empty string,
   and problem 13 also tried an empty array. It now says "Problems 5, 7,
   12 and 13 each tried an empty array, and problem 1 a sentence with no
   letters in it", which the `inputs` blocks bear out.
9. **Idioms and phrasal verbs.** "the heart of *merge sort*" is now "the
   main step"; "`Array.Sort` does the rest" now says what it does ("uses
   it each time it compares two names"); "The compiler has no reason to
   object" is now "The compiler finds no problem"; "in the word of the
   page Sorting" is now "a word from the page Sorting"; "Another rule is
   fair too" is now "works too"; "the sort put her under J" now says where
   the sort put her ("between Hopper and Lovelace, as if her surname were
   Jones", which is the recorded order). The table's summary, "which pages
   each problem draws on", is now "which pages each problem uses", as
   `mixed-first-programs`' reviewer asked, so the two PDP mixed sets agree.
10. **Plainer sentences.** Problem 1: "*Punctuation* is the marks" is now
    "means the marks", and "ideas from four pages" (the table lists three)
    is now "four ideas from earlier pages". Problem 2's note is two
    sentences where it was one, and "found" (for what a page stated from
    Microsoft's documentation) is "said". Problem 3's fold said "For two
    of them, `==` asks whether they are one dictionary with two names"; it
    now uses `grids-and-references-practice`'s words, "whether the two
    names lead to the same dictionary". Its first hint now asks its
    question first. Problem 7's "Each time the first loop repeats" is now
    "runs its body", as `lists-and-sequences` says. Problem 9's fold said
    `items = new();` "changes only the method's own name"; it now says the
    name "now leads to the new list". Problem 10's question said the
    method "writes" a number, which could be read as printing; it now
    "returns a whole number written in any base ..., as text", and its
    note puts the sentence about letters after the one about `digits`,
    which it follows from. "Looking back" said the four problems "compiled
    and ran, and still gave an answer nobody meant"; the `null` one stops
    with an exception, so it now says "compiled, and then did something
    that nobody meant".

### What I checked and left as it is

- **Numbers.** Every number and quoted output in the prose, hints, folds
  and solution notes is in `mixed-programming.outputs.json`, as the
  writer's list says, including the two exception reports (line 16 in
  `Badge(string[], char)` and line 21; line 8 in `MinesAround`), the
  Spärck Jones order, and the recorded dictionary values of problem 11
  (7, 4, 5, 3; and 1, 1, 0, 0). I added no number. The one recorded fact
  I added is the order in problem 6's note ("between Hopper and
  Lovelace"), from the solution's output. Problem 4's fold quotes no
  number for the overflow, and problem 8's fold gives no line number for
  `return null;`, which no output records.
- **The video.** Its title and channel match (YouTube's oEmbed, checked
  again). Its year could not be checked from here: the watch page gave
  no date, and the YouTube tool had no credits. The entry still has no
  year, unlike the other pages' videos.
- **Where the problems give away their pages.** The hints name pages
  (Dictionaries, Sorting, the practice page for grids), and so does
  problem 9's "why" fold. All of them wait for an attempt or a click, as
  on `mixed-first-programs`, so the problem itself still does not say
  which pages it needs.
- **The table's row for problem 14** names [Decisions](lesson:making-decisions)
  for `&&` stopping early, which that page's practice page teaches. A
  link to the practice page would be more exact; I left the tutorial, as
  the other rows do.

### Still open for Josh

The writer's seven questions under "Open" stand. What the review adds:

1. **Size (Open 2).** Read as a learner, problems 1 to 7 alone look like
   about an hour for a Level 5 class, and the page has 15. If the page keeps
   them all, one sentence in the opening ("A class can choose some of the
   problems; the table at the end says which pages each one uses") would
   let a teacher say so without cutting anything. I did not add it,
   because it depends on your answer.
2. **The unstable sort (Open 7).** Problem 2's note now says the pages
   *said* that nothing promises the order, which is what `Sorting` and
   `Dictionaries` do say. The sentence about "another version of .NET"
   stays until you decide.
3. **The video's year**, above.

### For other files (not done here)

- `courses/pdp.yaml`, line 81: `mixed-programming` still has a line under
  `planned:`, though the lesson is now in `lessons/` (the checklist in
  `docs/TRANSLATING.md` says to delete it). So does
  `mixed-first-programs` on line 80.
- `lessons/how-we-got-here/how-we-got-here.md`, line 996: "*Mixed
  problems* for this series" is in italics without a link, because the
  page was not written then. It can now be
  `[Mixed problems](lesson:mixed-programming)`.

### Final check

`npm run check-lessons -- mixed-programming` (no `--write`), after all
the changes above: "mixed-programming: 42 runs, 5.4 s / 1 page(s), 42
runs in 10.8 s: no problems."
