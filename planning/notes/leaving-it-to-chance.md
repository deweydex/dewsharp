# leaving-it-to-chance: notes for a reviewer

The PDP extra E3 in `planning/COURSE_MAP.md`: *Random numbers: seeds and
surprises you can repeat*. Adapted from dewlab's `leaving-it-to-chance`
(Computational Methods). Explore shape, no worlds, size M (14 cells), no
practice page. Covers PDP-LO10 (the testing process). Depends on
`finding-things`.

Files:

- `lessons/leaving-it-to-chance/leaving-it-to-chance.md` (version
  2026.09.28.3, not the .1 the brief names: the draft from the earlier,
  interrupted session had already changed cells after recording and moved
  the version twice. This session changed prose only, so the version
  stays.)
- `lessons/leaving-it-to-chance/leaving-it-to-chance.outputs.json`

`npm run check-lessons -- leaving-it-to-chance` reports 24 runs and no
problems.

## What the page does, in order

1. **A die you roll with Enter** (`asking-the-machine-for-a-number-1`).
   `Random.Shared.Next(1, 7)` in a `ReadLine` loop, so every Run and every
   press is different. It opens the page by running something, and it
   points back to `Random.Shared.Next(1, 101)` in *Searching*, where the
   reader met "up to the second number, but not the second itself".
2. **The same numbers twice.** `new Random(42)` gives `5, 1, 1, 4, 2, 2`
   on every Run. The prose then names a *random number generator*, the
   *seed* and *pseudo-random*. A predict: two generators with seed 42
   (both lines `5 1 1`). A task: find a seed whose first roll is 1 (a
   linear search over seeds; seed 14). A "Why this way?" fold shows that
   neighbouring seeds give related first rolls, and draws the lesson "one
   generator, many numbers".
3. **Numbers of every shape.** `Next(a, b)`, `Next(n)`, `NextDouble()` and
   `NextDouble() * 100`, with seed 1, in a table. A task: two dice.
4. **What random is good enough for.** Reproducibility and tests, the
   running mean for seeds 7, 7 and 8 as four columns of numbers (dewlab's
   chart), a word game whose bug the seed makes appear every time
   (`expect: exception`), a paragraph on security and
   `RandomNumberGenerator`, a predict on `firstRun == secondRun` (it prints
   `False`), and a task: write `Same`, which compares two arrays element by
   element.
5. **Choosing from a list.** `weather[generator.Next(weather.Length)]`,
   then `GetItems` (with replacement) and `Shuffle` plus a range (without
   replacement). A task: a prize draw with no double winners.
6. **Lab bench.** A histogram of `*` characters for a die, with seed,
   rolls and sides named at the top, and four questions.
7. **Looking back**, a challenge (a hand-written shuffle: is it fair?),
   the two later extras named without links, a paragraph on Visual Studio,
   and **Where to read more**.

## What I decided, and why

- **The testing thread leads.** The map gives the page PDP-LO10, the
  testing process. dewlab's page argues for reproducibility with a
  simulation that "gives a strange result". Here the argument is a word
  game with a bug that players see and the programmer never does, and a
  test (`Same`) that a seed repeats a run. Both are things a PDP learner
  will meet in their own games. The link to *Reusable methods*
  (`building-reusable-tools`) is where the reader met the word *test*.
- **The word game's bug is `Next(0, words.Length + 1)`.** It is the
  off-by-one that "up to, but not" invites. With seed 1 it runs seven rounds
  and stops in round 8, on every Run. The prose invites the reader to swap
  in `Random.Shared` and see the game the players had, then return to the
  seed. The cell has `expect: exception`, and the prose says, before the
  Run, that it is meant to stop.
- **The predict on `==` for arrays.** C# adds a surprise that Python's page
  does not have: dewlab's task "check that the two lists match" is one `==`
  in Python, and `False` in C#. The predict names the last line, and the
  prose points back to *Two names, one list* for *reference type*. That
  makes `Same` a real task rather than one `==`.
- **Two predicts, both with a named line.** "What will the second line
  print?" (the two generators) and "What will the last line print?" (the
  arrays). The running-mean cell asks a question in prose only, as dewlab's
  does. The style guide asks for two or three.
- **`GetItems` and `Shuffle` for `choices` and `sample`.** They are .NET
  8's own twins of Python's two functions, and the table keeps dewlab's
  columns. `Shuffle` plus `deck[..4]` stands for `sample`; the range is
  from *Arrays and lists*.
- **`Next(1, 7)` is exclusive at the top.** Python's `randint(1, 6)`
  includes both ends. The page says "up to 7, but not 7: from 1 to 6" each
  time, in the words *Searching* used, and the table spells out each
  method's range.
- **The running mean is a table of numbers, not a chart.** Four columns
  (after 10, 100, 1,000 and 10,000 rolls) for seeds 7, 7 and 8, and the
  mean of the six faces on its own first line so that 3.50 is a recorded
  number. The prose keeps dewlab's "The seed decides which path you get.
  It does not decide where the path finishes."
- **The "Why this way?" fold on neighbouring seeds.** The seed search
  shows 5, 2, 5, 2, 5, then 3, 6, 3, 6 ..., which a curious reader will
  notice. .NET's `new Random(seed)` uses the old Knuth subtractive
  generator (`CompatSeedImpl`, in `Random.CompatImpl.cs`, whose comments
  say "a modified version of Knuth's subtractive random number generator
  algorithm"), whose first outputs for nearby seeds
  are related. Leaving it unexplained would leave the reader thinking the
  page had hidden something. The fold says what to do about it (one
  generator, many numbers), which is also the reason the page's methods
  each make one generator.
- **Methods are `static` local functions**, as on `writing-your-own-functions`
  and `finding-things`. Each program cell that needs `Rolls` has its own
  copy, and the prose says why (each Run starts a new program).
- **The first cell reads input and has no `stdin:`.** The checker runs it
  with no input, so it prints the first line only. That is enough: the
  prose quotes nothing from it. It has no `inputs` block (a cell that
  reads input cannot).
- **Terms defined where they appear:** simulation, random number
  generator, seed, pseudo-random, reproducibility, test (with a link),
  mean, bug, shuffle, with and without replacement, histogram, LINQ.
- **Prose changes in this session** (no cell code changed, so no new
  version): *bug* is defined where it first appears (the page can be read
  before *Debugging*, which defines it); *slip* became *mistake*;
  *second best*, *tell the two apart*, *easy to miss* and *rise and fall
  in turns* became plainer words; a sentence above the challenge says what
  `GetValueOrDefault` does, because the dictionaries page meets it only on
  its practice page.

## Where each number and quoted output comes from

All from `leaving-it-to-chance.outputs.json`:

| Prose | Cell |
|---|---|
| `5, 1, 1, 4, 2, 2` | `the-same-numbers-twice-1` |
| both lines `5 1 1` | `the-same-numbers-twice-3` |
| seed 14; first rolls 5, 2, 5, 2, 5, 3, 6, 3, 6, 3, 6, 3, 6, 4, 1 | solution of `the-same-numbers-twice-2` |
| 2, 1, `0.46701067987224587` | `asking-the-machine-for-a-number-2` |
| dice 3 and 2, total 5 | solution of `asking-the-machine-for-a-number-3` |
| 4.10, 3.44, 3.38, 3.50; 3.50, 3.40, 3.48, 3.50; 3.50 | `what-random-is-good-enough-for-3` |
| seven rounds, stops in round 8, line 5, `IndexOutOfRangeException` message | `what-random-is-good-enough-for-4` |
| `3, 6, 4, 1, 3` twice, `False` | `what-random-is-good-enough-for-2` |
| two empty arrays give `true` | solution values of `what-random-is-good-enough-for-5` |
| `rain`, three of seven days | `choosing-from-a-list-1` |
| the K twice | `choosing-from-a-list-2` |
| Ciara, Dara, Aoife, Eimear, Brendan | solution of `choosing-from-a-list-3` |
| 191 and 148 | `lab-bench-1` |

60,000, 10,000, 1,000 and 200 are numbers written in the code, not
results.

## Probes (a scratch lesson, not part of the page)

Run in the browser engine with `node tools/check-lessons.mjs --lessons
<scratch>/lessons --write`, so a teacher knows what the challenge and one
lab-bench question give. The page quotes none of these numbers.

- The challenge as written (seed 1, 60,000 shuffles): `BCA: 11033`,
  `CAB: 8956`, `ACB: 11103`, `CBA: 8941`, `BAC: 10916`, `ABC: 9051`. Three
  orders near 11,000, three near 9,000: not fair.
- With `generator.Next(i, cards.Length)`: every order between 9862 and
  10133.
- Lab bench question 3 (`dice.Next(1, sides)`, seed 42): faces 1 to 5 get
  226, 178, 199, 189 and 208; face 6 gets 0.

## What I left out

- **dewlab's "Your world" section** (four worlds: reef survey, café
  orders, rumour spread, random walk). The map gives the page no worlds,
  and the style guide allows two at most. The reef and café tasks need a
  weighted choice, which .NET's `Random` does not have.
- **dewlab's `what-random-is-good-enough-for-1`** (three seeds, three
  dice). The running-mean cell and `Rolls` make the same point.
- **dewlab's practice page.** The map's rule gives practice pages to
  tutorials, and this page is an explore page.
- **dewlab's `random.uniform`.** C# has no twin; `NextDouble() * 100` is
  shown instead, with the rule "multiply it, add to it or round it".
- **dewlab's reading list:** the Python documentation and *Think Python*
  gave way to Microsoft's `Random` and `RandomNumberGenerator` pages, and
  the Mersenne Twister paper to .NET's own `Random.CompatImpl.cs`, the code
  that `new Random(42)` runs. The Veritasium video stays.
- **dewlab's lab-bench question on a 20-sided die** became question 3, the
  `sides + 1` mistake, which serves the testing outcome.

## For other files (not done here: the brief allowed only these two)

- `courses/pdp.yaml` line 83: the `planned:` line for
  `leaving-it-to-chance` can go now that the lesson is in `lessons/`
  (`docs/TRANSLATING.md` checklist).
- When *The Monty Hall problem* (`three-doors`) and *Monte Carlo*
  (`counting-darts`) exist, the closing paragraph can link to them.

## Open

Questions only Josh can settle:

1. **A practice page for extras?** dewlab's page has one (the inclusive
   `randint` against `randrange`, heads in 100 flips, and more). The map
   gives explore pages none. Should this extra have one, since its topic
   is used by four later extras?
2. **`GetItems` and `Shuffle` need .NET 8 or later.** A college Visual
   Studio on .NET 6 would not compile `choosing-from-a-list-2` or the
   prize-draw solution. This depends on the map's open question 11 (which
   Visual Studio the college has).
3. **Seeded numbers can change between versions of .NET.** Microsoft
   says so, and the page says so in its Visual Studio paragraph. Every
   seeded number on the page (seed 14, round 8, the winners) is true for
   .NET 10. Is that caveat enough, or should the page say less about
   particular numbers?
4. **The fold on neighbouring seeds.** It is honest, and it answers a
   question a careful reader will ask. Is it too much for Level 5 on an
   extra page? It can be removed without changing any cell.
5. **The security paragraph** names `RandomNumberGenerator` and shows no
   code. Enough, or should an extra show one line of it?
6. **The two later extras** (`three-doors`, `counting-darts`) and the
   FOOP extras that depend on this page will want to point back to it.
   Should they reuse its words (*seed*, *generator*, *with replacement*)
   exactly, as the map's "same words for the same things" suggests?

## Review

A fresh-eyes review (29 September 2026): read as a Level 5 learner who
has met the pages up to *Searching*, as a teacher against the map's E3
entry, and against the checklists in `docs/TRANSLATING.md` and the style
guide. Every number and quoted output in the prose was checked against
`leaving-it-to-chance.outputs.json`, and all of them match. The two
reading-list claims were checked at the source: Microsoft's `System.Random`
page does warn that a seed can give other numbers on another major version
of .NET, and `Random.CompatImpl.cs` does hold `CompatSeedImpl` and name
Knuth's subtractive generator.

The map's entry is covered in full: `Random.Shared`, `Next`, `NextDouble`,
a seed, choosing from an array, a shuffle, and a histogram of `*`
characters. The page opens by running something, has two predicts that
each name their line, has `expect: exception` on the one cell meant to
fail with the prose saying so first, and has no verdict words or US
spellings.

**What changed (prose only).** No cell's code changed, so the version
stays 2026.09.28.3 and the outputs file was not rewritten.

- The word game's story did not match its code. The prose said the
  players see it stop "sometimes" and the programmer "never saw it
  happen", but `Next(0, words.Length + 1)` with four words chooses the
  bad index one time in five, so an unseeded game rarely finishes ten
  rounds. The story now says it stops in the middle of a game, "and not
  always in the same round", and the invitation to try `Random.Shared`
  asks "Does it stop in the same round each time?" The claim no longer
  depends on a rate that no cell measures.
- "so nothing is broken" on that cell became "so you have not broken
  anything": the game *is* broken, and that is the point of the section.
- *With replacement* was explained with "returns each card to the deck",
  and the table and the prize-draw hint used "returned". On a page where
  methods *return* values, that verb has two meanings for a reader in
  their second language. The paragraph now says `GetItems` chooses from
  the whole deck each time, "as if each card were put in the deck again";
  the table's column asks "Is each item put in again before the next
  choice?"; the hint asks "can it be drawn again?"
- Two questions about one line now name the line, as the checklist asks:
  lab-bench question 3 says "On line 9, change `dice.Next(1, sides + 1)`"
  (the cell has two `sides + 1`), and the challenge says "change line 10
  to `int j = generator.Next(i, cards.Length);`" (the sentence that ended
  in a bare code fragment was hard to follow).
- `new string('*', n)` (lab bench) and `new string(cards)` (challenge)
  are now said in one sentence each. The reader has met the first only on
  a practice page, and the second only on a later one.
- The lab bench's "200 stars would be all of the rolls" became "a bar of
  200 stars would mean that every roll was that face".
- The introduction now says what an extra is ("you can do it whenever you
  have time"), what this one is about (testing a program that has chance
  in it), and that the challenge uses the swap from *Sorting*, which comes
  after *Searching* in the course.
- "as on [Reusable methods]" assumed the reader had read a page that comes
  after this page's one dependency. It is now "The page [Reusable methods]
  writes tests for its methods."
- The closing paragraph named two later extras; the map gives three PDP
  extras that depend on this page, so *Markov chains* is named too
  (without a link). It also says, as the other extras do, that an extra
  page has no practice page.
- The Visual Studio paragraph now says how to stop the first cell's die
  in a console window (Ctrl+Z, then Enter), with a link to *Reading
  input*, which teaches it. The cell's own prompt says "Press End input",
  which is the page's button.
- Smaller: "Do the rolls come in the same order" became "Are the rolls in
  the same order"; the fold's "change between 5 and 2" became "give only
  5 and 2, one after the other"; the choosing-from-a-list cell has an
  invitation before it ("What do you think this cell chooses? Run it and
  see."); a line in the word-game paragraph that ran past the wrap width
  was rewrapped.

`npm run check-lessons -- leaving-it-to-chance`: 24 runs, no problems.

**Still open for Josh**, in addition to the six questions above:

- The word game quotes "seven rounds" and "round 8" from seed 1 on .NET
  10. Open question 3 (seeds across versions) applies to it most of all,
  because the section's argument is that the round is always the same.
- The first cell prints "Press End input to stop." That is the page's
  button, and a downloaded project shows the same text in Visual Studio,
  where there is no such button. The Visual Studio paragraph now gives
  Ctrl+Z. Changing the cell would change its recorded output; I left it.
- `courses/pdp.yaml`'s `planned:` line for `leaving-it-to-chance` is still
  there (outside this review's brief).
