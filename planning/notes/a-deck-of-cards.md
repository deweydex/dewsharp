# Notes: a-deck-of-cards

Written new on 29 September 2026 (FOOP explore E2 in
`planning/COURSE_MAP.md`: "new", shape explore, size M, world game,
covers FOOP-LO1, FOOP-LO3 and FOOP-LO7, batch 14). No dewlab page
teaches it. It draws on three dewlab pages: `sorting-a-hand-of-cards`
(Dewey Track; the `from:` in the frontmatter), `counting-every-outfit`
(Dewey Track) and `putting-things-in-order`. Written against dewsharp's
`CLAUDE.md`, `docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1) and the two exemplars,
and against the pages it depends on as they are now in `lessons/`:
`many-classes-one-promise` (and its practice page, problem 4, where
`Sort` on a class with no `IComparable` stops), `from-a-description-to-classes`
(the first enum and the first record), `leaving-it-to-chance`
(`Random.Shuffle`, seeds), `namespaces-and-libraries` (the seed, and the
52! orders with `BigInteger`), `one-parent-many-children` (`=>` for a
property) and `putting-things-in-order` (the one-line swap, text sorted
character by character).

Files:

- `lessons/a-deck-of-cards/a-deck-of-cards.md`, version 2026.10.01.1
  (2026.09.28.3 as written; see "Review").
  21 `csharp exec` cells: 7 types cells, 12 program cells and 2 empty
  cells (the "your own" task). 3 predicts, 2 hints, 2 solutions (each
  with `inputs`), 1 answer fold, 1 challenge. No pictures.
- `lessons/a-deck-of-cards/a-deck-of-cards.outputs.json`, written by
  `npm run check-lessons -- --write a-deck-of-cards`.
- No practice page. The entry names none, and the course map's
  "Practice pages" section gives one to tutorials only.

## How it was checked

- `npm run check-lessons -- a-deck-of-cards`, without `--write`: 24 runs
  (21 cells, 2 solutions, 1 challenge), no problems. No cell gives a
  compiler warning, so no warning travels down the page.
- The version was bumped twice while the page was being written, because
  cells changed after a recorded run: .2 when the game's seed changed
  from 7 to 12, .3 when `two-fixed-lists-2` gained its last line and
  `every-order-1-program` its first `WriteLine`. The brief asked for
  2026.09.28.1 in the frontmatter, and for a bump when a cell's code
  changes after the page is first recorded; I followed the second. No
  learner has seen any version, so Josh may prefer it reset to .1.
- The seed for *Highest card wins* was chosen with a scratch lesson (not
  in the repository) that played five rounds for seeds 1 to 40. Seed 7,
  the first choice, gave Aoife 5 and Kwame 0 with no draw, which teaches
  nothing about the `else if`. Seed 12 gives 3 to 1 with one draw (two
  Aces), so the draw case is on the page.
- I did not open the page with `npm run serve`. The parser is the one
  the page uses, and the checker reported no parse problem, but nobody
  has looked at the world picker with this page's two worlds, or at the
  two exception reports as the page draws them.

## What the page does, and why

The entry asks for `Suit` and `Rank` enums, a `Card` record, a `Deck`
that shuffles (Fisher and Yates) and deals, a hand sorted through
`IComparable<Card>`, and a card game of the reader's own. The page does
those, in that order:

1. **A card as text** (1 program cell, predict). Five cards as strings,
   sorted: `10 of Spades` comes first, and the King before the Queen.
   The reader of `putting-things-in-order` has seen text sort this way;
   here it motivates two typed parts. It opens by running something, as
   the style guide asks.
2. **Two fixed lists** (types cell, then a program cell with a number
   predict on `(int)Rank.Jack`). New: choosing an enum's numbers
   (`Two = 2`), comparing enum values with `<`, and
   `Enum.GetValues<T>()`. The suits are listed in alphabetical order,
   which is also bridge order, so that the tie-break in `CompareTo` later
   has a real-world meaning.
3. **A card** (record with a body and its own `ToString`; program). New:
   a record with a body, and `==` on records comparing values. (As
   written, it pointed to `two-names-one-object` for "a record is a
   reference type"; the review took that out, see "Review".)
4. **A deck** (class; program; a cell meant to stop with an exception).
   The private list, a constructor with a loop inside a loop, `Count =>`,
   and `Deal` from index 0. The counting principle (4 × 13) comes from
   `counting-every-outfit`, named once, with a link to dewlab's page. The
   53rd `Deal` stops with `ArgumentOutOfRangeException`, and *Looking back*
   asks what a deck should do instead.
5. **Shuffling** (the class again with `Shuffle(Random generator)`;
   program with seed 42; a "what each line does" fold after an
   invitation to change the seed). Fisher and Yates in three plain steps.
   The generator is a parameter, so the page can pass a seed and a game
   can pass `Random.Shared`. The count 52 × 51 × … × 2 ties the shuffle
   to the 52! orders that `namespaces-and-libraries` computes.
6. **A closer look: is every order as likely?** A static class with two
   shuffles for three cards, a 60,000-round experiment (choice predict),
   then a program with three nested loops that lists all 27 ways the
   simple shuffle can run and shows 5, 5, 5, 4, 4, 4. This is the
   `counting-every-outfit` idea used to explain a real bug: 27 ways cannot
   be shared among 6 orders. It is the part of the page I think most
   worth keeping if the page has to shrink.
7. **Sorting a hand** (a cell meant to stop with
   `InvalidOperationException`; `Card` again with `IComparable<Card>`,
   rank first and then suit; a program that sorts a dealt hand). Then
   *Your turn: a hand in suits*: change `CompareTo` so that the suit
   decides first. Inputs compare the sorted hand and two `CompareTo(...) < 0`
   results (not the raw number, which may differ between two correct
   answers), and one `CompareTo` of a card with itself.
8. **A card game.** In the game world, *Highest card wins*: the program
   deals five rounds for Aoife and Kwame, and the reader writes the
   `if`/`else if` that counts wins. In the "your own" world, a deck for a
   card game the reader knows, in two empty cells.
9. **Looking back**, a challenge for the notebook (*Higher or lower*, which
   reads input and so cannot be a cell with `inputs`; it carries its own
   enums, record and deck, since a challenge compiles alone), and four
   places to read more.

The page has 21 cells, which is more than the course map's M (8 to 15).
The closer look accounts for four of them. It is still about an hour's
work for a reader who does the two tasks; the closer look could become
its own page if Josh wants the page smaller (see Open).

### Choices a teacher may notice

- **`var`** is used where the type is written on the right, as FOOP pages
  do from `the-moves-you-already-know` on. Loop variables keep their types
  (`foreach (Suit suit in ...)`).
- **`Deal` removes from index 0.** Removing from the end would be cheaper,
  but "the top of the deck is index 0" is easier to picture, and the deck
  has 52 cards.
- **The simple shuffle is called *simple*, not *naive* or *wrong***, to
  keep verdict words out of the prose. The page shows it is uneven by
  counting, and says so as a fact about the counts.
- **`Random.Shuffle`** is named, with the reason the deck has its own: it
  takes an array, and the deck keeps a `List<Card>`.
- **Rank-then-suit** is the worked `CompareTo`, so that two cards are
  never equal unless they are the same card. The reader's task reverses
  the order of the two questions. The game compares `Rank` with `>`
  directly, so that it has draws, and it does not depend on which
  `CompareTo` the reader's `Card` has.

## What the dewlab pages gave, and what was left out

- From `sorting-a-hand-of-cards`: the hand of cards as the picture of
  sorting, and the idea that a sort only compares two values at a time
  (here: `Sort` asks two cards, through `CompareTo`). Left out: selection
  and insertion sort themselves, the comparison counts and the swap
  demonstration. dewsharp's `putting-things-in-order` already teaches all
  three, and this page's subject is the types, not the sort.
- From `counting-every-outfit`: the loop inside a loop that meets every
  pair once, and the counting principle, used twice (52 cards; 27 ways
  against 6 orders). Left out: sample spaces, tree diagrams, PINs and
  passwords, `all_pairs`.
- From `putting-things-in-order` (dewlab's, through dewsharp's): the swap
  and sorting by a rule. Left out: everything else.
- Left out on purpose: poker hands (a pair, a flush). They need counting
  of ranks, which is a good practice problem but a second topic.
- No practice page, no glossary (dewsharp has none), no pictures. A
  drawing of Fisher and Yates, round by round, like dewlab's
  `selection-rounds.svg`, would help; I did not draw one because every
  number in it would have to come from a recorded run, and the page has
  no cell that prints the deck after each round.

## Open

Questions only Josh can settle:

1. **Worlds.** The entry says "Worlds: game". The page declares `game`
   and `your-own`, because the entry ends in "a card game of the reader's
   own" and the style guide invites a "your own" variant where the task
   does. Only the last task has variants; everything else is shared. The
   world descriptions in the frontmatter are written for this page ("On
   this page, two players and a game of cards"), not copied from the FOOP
   pages. Is that what you want, or should the page have `game` only (a
   picker with one choice), or no worlds at all, like the other explore
   pages?
2. **Size.** 21 cells against M's 8 to 15. Keep the closer look on the
   page, move it to a closer-look page of its own (*Is every order as
   likely?*), or drop it?
3. **Version.** 2026.09.28.3 after two bumps during writing, or reset to
   .1 since no class has used it?
4. **The Bostock link** in *Where to read more*
   (<https://bost.ocks.org/mike/shuffle/>, 2012) is from memory, and was
   not fetched from this machine. Please check that it still says what
   the page says it does before the page goes to a class.
5. **Where it sits.** The entry says it could start from batch 7. The
   page uses records (from `from-a-description-to-classes`) and
   `IComparable<T>` (from `many-classes-one-promise`), so it cannot come
   much earlier. Is it worth a line in the teacher notes as a lesson after
   *Interfaces* for a class that finishes early?

## Review

Reviewed on 1 October 2026 with fresh eyes: once as a Level 5 learner who
has read the FOOP pages up to *Interfaces* and nothing else, once as a
teacher against the course map's entry (E2), and then line by line
against the checklists in `docs/TRANSLATING.md` and the style guide. The
page does what the entry asks, in the order it asks: `Suit` and `Rank`,
a `Card` record, a `Deck` that shuffles (Fisher and Yates) and deals, a
hand sorted once `Card` implements `IComparable<Card>`, and a card game.
What failed is below, and it was fixed in the page.

### Used before it was taught

FOOP meets `Random` for the first time on *Testing a class*, and seeds
there and on *Namespaces and class libraries*, all after *Interfaces*. A
learner who comes here from *Interfaces*, as the page's own "Next" line
expects, had met none of it. The opening sent them to *Namespaces*
(FOOP's page 22) for the seed.

- The opening now says the page uses what the course teaches by the end
  of *Interfaces*, and `Random`, which the page explains where it first
  uses it, with *Random numbers* for more.
- *Shuffling* now defines a *random number generator* and a *seed*, one
  sentence each, in the words *Random numbers* uses.
- It said `Random.Shared` has "no seed". *Random numbers* says it has
  one, which .NET chooses, different on every run. The page now says so.
- *A card* used *reference type*, with a link to *Two names, one object*
  (FOOP's page 18). It now says what it needs without the term: each
  `new` makes an object; for a class, `==` asks whether both sides are one
  object, so it would print `False`; a record's `==` compares the values.
  The `False` was run in a scratch lesson (not in the repository), and so
  was what a record prints by itself, `Card { Rank = Queen, Suit = Hearts }`.
- *A static class* had no definition on any FOOP page. The closer look
  now gives one, beside `Math.Max`, which FOOP readers have called
  through its class's name.
- *Hand* and *deal* are defined where they first appear.
- *A closer look* referred to `Namespaces` for 52 × 51 × … × 1 as if the
  reader had seen it. It is now a sentence in brackets that says that page
  prints the number in full.

### Claims that needed changing

- **Fisher and Yates.** The 1938 method is for pencil and paper and does
  not swap; the swap version programs use came later (Durstenfeld, 1964).
  The page said the swap version was theirs. It now says they described a
  way to shuffle in 1938, and that the version programs use swaps cards
  and keeps their names.
- **The 53rd deal.** The prose quoted the message as if it ended at
  *collection.*, but the page adds `(Parameter 'index')`. It now says the
  message *starts* with those words, and names the two lines of the report
  as the page draws them: line 21 of `Deck.cs`, in `Deal`, and line 4 of
  the program (both from the recorded frames).
- **Sorting with no promise.** The prose quoted the cause without the
  words the page shows. It now quotes the line as the page draws it,
  `It was caused by System.ArgumentException: At least one object must implement IComparable.`,
  and says, as the *Interfaces* practice page does, that `IComparable` is
  an older form of the same promise.
- **"`Ten` has the number 10".** No cell prints 10. The sentence now
  counts on from `Two` to `Jack`, so the only numbers are the recorded
  `2` and `11`.
- **`Rank.CompareTo(other.Rank)`.** After `Rank Rank`, `Rank` on its own
  could be read as the enum. The paragraph now says that inside `Card` it
  is this card's rank, and `other.Rank` the other card's.
- **`Random.Shuffle`** is now written as *Random numbers* writes it,
  `generator.Shuffle(cards)`, a method of every `Random`.

### Words

- *Bad luck* (an idiom) became *does not come from chance*.
- *Unfair* and *a fair shuffle* were never defined. The page now says what
  the counts show: the simple shuffle cannot make every order as likely.
- *Which part of this page's code made that mistake impossible* called the
  sort a mistake; it sorted text by text's rule. The question is now which
  part puts a Two before a Ten and a Queen before a King.
- *Do you know why, before you run it?* became *Why do you think it will
  stop?*
- *Take the last card* could mean "remove it"; the steps now start *Start
  with the last card* and *Move to the card before it*.
- *The player's answer matches* became *the next card does what the
  player said*, and the challenge now asks what should happen when two
  ranks are the same.
- The counting principle was one long sentence with a clause in the
  middle. It is three short ones.
- Before the 60,000-round predict, the page now says what the two columns
  are, and after it, that `every-order-2`'s three swaps are the simple
  shuffle's with `first`, `second` and `third` in place of its random
  choices.

### Code

- `a-card-as-text-1`: the list was one 117-character line, in the first
  cell on the page. It is now one card a line, as `sorting-a-hand-1`
  writes its list. Its output did not change.
- `your-turn-1-program`: each `inputs` line has a note, so that the
  **Compare with a solution** table says what each row asks.
- `version:` is now 2026.10.01.1. `npm run check-lessons -- --write
  a-deck-of-cards` recorded the page again, and the only difference in
  the outputs file is the version: every cell, solution and challenge gave
  what it gave before. Every number in the prose, the fold and the solution
  notes was checked against that file.

### Seen in the page

Opened in headless Chromium against the real lessons (a scratch script,
deleted after use). The world chooser sits under the title with *Game*
and *Your own*; *Game* is chosen at first, and the game's cell shows while
the your-own cells are hidden. The two exception reports are drawn as the
prose now describes them:

```text
Unhandled exception. System.ArgumentOutOfRangeException: Index was out of range. Must be non-negative and less than the size of the collection. (Parameter 'index')
   at line 21 of Deck.cs (in Deck.Deal())
   at line 4 of Program.cs

Unhandled exception. System.InvalidOperationException: Failed to compare two elements in the array.
   at line 7 of Program.cs
It was caused by System.ArgumentException: At least one object must implement IComparable.
```

The page reported no errors.

### Links

Fetched on 1 October 2026. Bostock's page is *Fisher–Yates Shuffle*, by
Mike Bostock, 14 January 2012, at the address the page gives. It animates
the shuffle and compares it with two slower ways, in JavaScript, so the
page's description holds (open question 4 is answered). Microsoft's
*Enumeration types* shows a value's number chosen by hand and the casts
both ways. *Random.Shuffle Method* lists an array and a span, and says
the shuffle is in place; it does not name its method, so "the same idea
as Fisher and Yates" rests on .NET's source (a loop that swaps each place
with one chosen by `Next(i, n)` from the places not fixed yet).

### The checklists

Opens by running something and asking: yes. Terms defined where they
first appear: yes, after the changes above. Every task an invitation with
a first step: yes. Three predicts, each where C# surprises (text order,
`Two = 2`, the two shuffles); no option marked. Hints on both tasks,
`after: 2 runs` because both starters run, and each first hint a
question. Solutions and inputs on the program cells that run. No verdict
words. Irish spelling (*colours*). Both cells meant to stop say so before
they run, with `expect: exception`, and the prose uses *it stopped with
an exception*. Each program cell works on its own, and the page cites
rule 4 where a type is written again. Links go to lessons that exist.
What belongs in Visual Studio: nothing, and the page says so.

Final run, without `--write`: `a-deck-of-cards: 24 runs, 4.2 s` / `1
page(s), 24 runs in 9.5 s: no problems.`

### Still open for Josh

1. **Worlds, size and placement** (open questions 1, 2 and 5 above) are
   unchanged. On placement: the page no longer needs *Random numbers* or
   *Namespaces*, so it can follow *Interfaces* for a class that finishes
   early, as question 5 asks.
2. **Version** (question 3): the review's change moved it to
   2026.10.01.1, the next version in the usual way. No learner has used
   any version.
3. **`courses/foop.yaml` still lists `a-deck-of-cards` under `planned:`**,
   although the page is in `lessons/`. The checklist in
   `docs/TRANSLATING.md` says to delete that line; this review was not
   allowed to edit course files. `when-a-queue-never-clears` and
   `a-model-that-corrects-itself` are in `lessons/` too, and still have
   their `planned:` lines.
4. **Two long cells.** `every-order-1-program` (29 lines) and
   `every-order-2` (30 lines) are past the style guide's fifteen. Each is
   one idea, and splitting them would add cells to a page already over M.
5. **The course map's entry** names `leaving-it-to-chance` (a PDP extra)
   under *Depends on*. A FOOP learner may never have opened it, and the
   page no longer needs it. The entry could say so.
