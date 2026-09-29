# Notes: asking-a-list-a-question

A new page, written on 28 and 29 September 2026 from its entry in
`planning/COURSE_MAP.md` (FOOP explore E3, "LINQ: asking a list a
question": action *new*, shape explore, size M, worlds game and solar
system, covers FOOP-LO4 and FOOP-LO8, depends on `lists-and-sequences`
and `objects-and-classes`). Written against dewsharp's `CLAUDE.md`,
`docs/LESSON_FORMAT.md`, `docs/TRANSLATING.md` and
`planning/PEDAGOGICAL_STYLE_GUIDE.md` (draft 1). It draws on dewlab's
`comprehensions-and-grids` (its section "Comprehensions: a loop that
builds a list", with "Keeping only some values" and "Inside sum(), max()
and join()") and on `putting-things-in-order` (sorting with `key=`).
Version 2026.09.28.1.

Files:

- `lessons/asking-a-list-a-question/asking-a-list-a-question.md`: the
  page. 17 `csharp exec` cells: 4 types cells (`Planet`, `SolarSystem`,
  and one class for each world's first task, `Item` or `Moon`) and 13
  program cells. A reader in one world sees 14 of them. 3 predicts,
  9 hints, 6 solutions (4 with `inputs`), 1 challenge. No pictures.
- `lessons/asking-a-list-a-question/asking-a-list-a-question.outputs.json`,
  written by `npm run check-lessons -- --write asking-a-list-a-question`.
- No practice page. The course map gives an explore page none, and its
  list of practice pages does not name one for this page.

## How it was checked

- `npm run check-lessons -- asking-a-list-a-question`, without `--write`:
  33 runs, no problems. Every cell not meant to fail compiles with no
  warning, so no warning travels down the page.
- Two cells are meant to fail, and the prose says so before the reader
  runs them: `a-new-value-from-each-element-2` (`expect: CS1061`,
  `'string' does not contain a definition for 'Diameter'`, line 4) and
  `a-question-not-an-answer-1` (`expect: CS0266`, `IEnumerable<Planet>`
  to `List<Planet>`, line 2).
- Every number and every quoted output in the prose, the solution notes
  and the predicts' follow-up paragraphs was compared with the outputs
  file: 4 giants; 3.2 … 8.3 … 251 minutes; 2 planets closer than Earth;
  387941 km, `False`; 20 kg and Gold cup, Map, Shield; Ganymede and
  Titan, 4 of Jupiter's; the two `OrderBy` orders; 25, 16, 7, 3, 2, 1
  gold a kilogram; 0 and 652 km for Earth and Venus; `4` then `5`, and
  `4` then `4` with `ToList()`.
- One claim in the prose has no cell of its own, and was run in a scratch
  lesson in the browser engine (`node tools/check-lessons.mjs --lessons
  <scratch>/lessons --write`): `(List<Planet>)planets.Where(...)`
  compiles, then stops with `System.InvalidCastException: Specified cast
  is not valid.` on line 2. The prose says only that it stops with an
  exception, and does not name it.
- The sentence about a project without `using System.Linq;` no longer
  quotes an error code, because no cell records one (the page's cells
  always have the seven implicit using lines). It says that the program
  does not compile, and why.
- Links: `objects-and-classes`, `lists-and-sequences`,
  `putting-things-in-order`, `the-moves-you-already-know`,
  `many-classes-one-promise` and `namespaces-and-libraries`, all in
  `lessons/`. The page's claims about them were checked: *Sorting* gives
  `Array.Sort` a method (`Array.Sort(words, ByLength)`); *Inside a
  method* has `Planet.MoonsWiderThan` with the same class the challenge
  copies; *Namespaces and class libraries* has the section "The using
  lines you do not see"; *Classes and objects* prints a list of objects
  with `string.Join` and an overridden `ToString`. *Simulating a queue*
  is not written, so it is named in italics without a link.

## What the page does, and why

- **Teaching data in the shared cells, worlds only in the tasks.** The
  course map's entry says `Where`, `Select`, `OrderBy`, `Sum` and `Count`
  "on a `List<Planet>`", and also lists the worlds as game and solar
  system. The page does both: the eight planets (a `Planet` class and a
  `static class SolarSystem` with one method that makes the list) carry
  every teaching cell, and the two "Your turn" tasks come in the two
  worlds. The game world uses an `Item` class (a chest of things with a
  weight and a value), and the solar system world uses a `Moon` class. So
  the teaching happens in the second world listed, which the style guide's
  "a page teaches in its first world" does not quite allow (Open, 1).
- **`SolarSystem.Planets()`** is how every program cell gets the list
  without repeating eight lines (rule 3). A method that makes the list
  is the style `CLAUDE.md` suggests ("write a method that makes it").
  `static` on a class and a method is explained in one sentence, by
  comparison with `Math.Max`. A FOOP reader has met `static` only on a
  method in a program cell (`from-python-to-csharp`), not on a class or
  a class's member, and this page may be read straight after
  `objects-and-classes`.
- **Order of ideas:** `Where` with a lambda, run first and named after
  (style guide, "Run first, then name"); the loop that `Where` replaces;
  a named method (`IsGiant`) passed to `Where`, which leads to the lambda
  as "a method with no name", with a table matching its parts; `Select`
  and the chain; `Count` and `Sum`; `OrderBy` with a key; then the
  sequence that is a question, not an answer (`IEnumerable<T>` and
  deferred execution), which is the one idea in LINQ that surprises
  readers most.
- **Predicts (3):** the first line of `Where` (three options, including
  "it removes the ones that pass" and "it gives true or false"); what an
  `OrderBy` whose answer is not kept prints (the list does not change);
  and the second `Count()` after a planet is added (deferred execution).
  Each is a place where a reader is likely to guess something other than
  what happens. The other cells run without a guess.
- **Mistakes on purpose (2):** `Select` before `Where` (CS1061: the
  lambda's parameter is still called `planet`, but it is a `string`), and
  `Where` without `ToList()` into a `List<Planet>` (CS0266, whose message
  names `IEnumerable<Planet>` and so gives the next section its word).
- **Comprehensions.** The Python comprehension is shown once, as code to
  read, beside the same chain in C#, for readers who know Python; the
  page does not need it.
- **A small fact for interest** in the `Sum` cell: the claim that the
  other planets fit between the Earth and the Moon. With these diameters
  the row is 387941 km, longer than 384,400 km, so the last line is
  `False`. The prose adds that the real gap is surface to surface, so
  smaller still.
- **Whole-number division** in the game world's key (`item.Value /
  item.Weight`) is kept and pointed out in the solution note, since the
  order of these six items is the same either way. The note ends with a
  question about two items for which it would not be.
- **The challenge** copies `Planet` from *Inside a method* and asks for
  each of its three loops as one line of LINQ, with `Max` and `Any`,
  which the page does not show, to be found from their names or from
  Microsoft's reference. It asks what each does for a planet with no
  moons; the loop version of `WidestMoon` and LINQ's `Max` both stop with
  an exception on an empty list, and the page leaves that for the reader
  to find.
- **Explicit types everywhere, no `var`.** The page depends only on
  `objects-and-classes`, which comes before `the-moves-you-already-know`,
  where `var` is taught. The chains therefore write `List<string>` and
  `List<double>` in full.
- **Visual Studio:** nothing on the page needs it; the closing section
  says so, and says where `System.Linq` comes from.

## Left out

- LINQ's query syntax (`from … where … select`): named in "Where to read
  more", with a sentence saying that it does the same work.
- `First`, `FirstOrDefault`, `Any`, `All`, `Max`, `Min`, `Average`,
  `Distinct`, `GroupBy`, `ThenBy`, `Take` and `Skip`. `Any` and `Max`
  appear only in the challenge. Each would add a section to a page that
  is already at the top of size M.
- The words *delegate*, `Func<T, TResult>` and *extension method*. The
  page says "we give it a method" and "every list has these methods",
  which is what a reader needs to use LINQ. A teacher may want the words;
  the Microsoft lambda page in "Where to read more" has them.
- `var` and anonymous types (`new { planet.Name, planet.Diameter }`),
  which LINQ often uses. Both need `var`.
- The rest of dewlab's `comprehensions-and-grids` (grids, two names for
  one list, sequences as functions, the dot product). Other dewsharp
  pages cover grids and aliasing (`grids-and-references`,
  `two-names-one-list`), and PDP leaves the maths out.
- `List<T>.Sort` with a key: the page names the list's own `Sort` once,
  to contrast it with `OrderBy`, and links to *Sorting*.

## Open

Questions only Josh can settle:

1. **Which world teaches?** The course map's entry lists "game, solar
   system", and says the page works on "a `List<Planet>`". The page
   teaches with the planets in shared cells and uses the worlds only for
   the two tasks, so its teaching world is the second one listed. Should
   the frontmatter list `solar-system` first, should the entry be changed
   to "solar system, game", or should the teaching cells come in both
   worlds (which would double them)?
2. **Delegates by name?** The page teaches a lambda as "a method with no
   name, written where it is used" and never says *delegate* or
   `Func<Planet, bool>`. Is that enough for FOOP-LO8 (the class library),
   or do you want the words on the page, perhaps in a fold?
3. **Deferred execution on an explore page.** The last section (a
   sequence is a question, asked again each time it is read) is the
   hardest idea on the page. It is there because it is the first thing
   that surprises people who use LINQ. Keep it, move it into a fold, or
   leave it out?
4. **The Earth and Moon fact.** The `Sum` cell tests a claim that is
   widely shared online. Is that fact welcome on the page, or would you
   prefer a plainer total?
5. **No practice page.** The course map gives an explore page none. If
   colleagues use this page in class, would they want a short practice
   page (for example, the challenge's three loops and one "which methods
   in which order" question)?

## Review

A second reader went through the page on 29 September 2026: once as a
Level 5 learner who knows only the pages before it, once as a teacher
against the course map's entry, and then through the checklists in
`docs/TRANSLATING.md` and the style guide. Every number and quoted output
in the prose, the predicts' follow-ups and the solution notes was checked
against `asking-a-list-a-question.outputs.json` again, and all of them
match. No cell's code changed, so `version:` stays at 2026.09.28.1 and the
outputs file was not rewritten. `npm run check-lessons --
asking-a-list-a-question`: 33 runs, no problems.

Changed, all in the prose:

- **The opening.** "Here are the eight planets" stood above a class, not
  the planets. It now says that the next two cells hold them, and which
  cell does what.
- **`static class`.** The page explained `static` on the method only. One
  sentence now says why the class is `static` too.
- **"Every program on this page starts with that line"** was not so (the
  game world's tasks start with a chest). It now says every program about
  the planets starts with the line, and quotes it.
- **"Read the program's second line aloud, from its start"**: its start is
  `List<Planet> giants =`, not the words that follow. It now says "from the
  word after `=`".
- **The Sorting page is PDP's.** A FOOP reader may never have seen it, so
  the three references to it say "the PDP page Sorting", in the present
  tense, and none assumes the reader was there.
- **The entry asks for "the loop each one replaces".** `Where`, `Count`
  and `Sum` had theirs; `Select` now has a five-line loop to read, and the
  `OrderBy` section says that its loop is a whole sort, such as the Sorting
  page's insertion sort.
- **"A line of methods like this … is a chain"**, for methods written on
  several lines, now reads "Methods called one after another like this …
  make a *chain*."
- **CS1061's message** was quoted as if it were the whole of it. It now
  says that the message begins with those words (the rest is about
  extension methods, which the page does not name).
- **"A name is only a name"** (an idiom) is now "its name does not change
  its type".
- **The `Count` and `Sum` cell** asks two questions, and the paragraph
  before it named only the second. It now names both.
- **"Every question on this page so far ended with `ToList()` …"** was not
  so: the `OrderBy` cell's question did not. It now says every question
  that kept its answer in a variable.
- **`IEnumerable`** gains one sentence on what *enumerable* means.
- **Phrasal verbs:** "made up" is now "invented", and "can be put in
  order" is now "C# can sort".
- **The challenge** said "each of its three methods", though *Inside a
  method* has only two of them. It now says that two come from that page
  and `HasMoonWiderThan` is new.
- Two long source lines were rewrapped.

Checked and left as it was:

- The page opens with two types cells, not a program: rule 2 needs the
  class above the first question, and the first program cell asks for a
  guess at once.
- The `OrderBy` solution sits directly under its cell, so on the page it
  comes before the paragraphs that invite it. It has a `title:`, as the
  format asks for that case.
- The three Microsoft Learn links were fetched on 29 September 2026 and
  each returned its page, and the `Enumerable` page's remarks do explain
  *deferred execution*, as the page says.
- The claim in the game world's second solution note, that keeping the
  fraction would not change the order of the six items, has no number in
  it and follows from the six values (25, 16, 7.5, 3.75, 2, 1.33); no cell
  prints the fractions.

Still open for Josh, in addition to the writer's five questions above:

6. **A reader who skipped PDP.** The page leans on three pages a FOOP
   reader may not have read: *Sorting* (PDP), *Inside a method* and
   *Interfaces*. Each reference now stands on its own, but a teacher
   sending a class here straight after *Classes and objects* should know.
7. **`static` on a class.** The page explains it in two sentences, as
   *A polynomial class* does for a `static` method. If the course wants a
   `static class` taught somewhere first (FOOP has `a-front-end-for-a-class`
   with `static class Commands`), this page could point to it.
