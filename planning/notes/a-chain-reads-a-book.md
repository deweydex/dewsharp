# a-chain-reads-a-book: notes for a reviewer

The PDP extra E7 in `planning/COURSE_MAP.md`: *Markov chains: a dictionary
that writes like a book*. Adapted from dewlab's `a-chain-reads-a-book`
(Computational Methods). Explore shape, no worlds, size M (15 cells), no
practice page (an explore page has none: "Practice pages and mixed sets").
Covers PDP-LO4 and PDP-LO7. Depends on `looking-things-up-by-name` and
`leaving-it-to-chance`, and also uses the static class of
`building-reusable-tools`.

Read before writing: dewsharp's `CLAUDE.md`, `docs/LESSON_FORMAT.md`,
`planning/PEDAGOGICAL_STYLE_GUIDE.md`, `docs/TRANSLATING.md`, the course
map's reading guide, principles and PDP explore entries; the exemplars
`first-steps` and `objects-and-classes`; `looking-things-up-by-name`,
`leaving-it-to-chance` and the static-class part of
`building-reusable-tools`; the openings and closings of the other PDP
extras (`a-function-that-calls-itself`, `three-doors`, `counting-darts`,
`three-ways-to-make-change`) and `three-doors`'s notes; dewlab's page, its
practice page and its glossary.

Files:

- `lessons/a-chain-reads-a-book/a-chain-reads-a-book.md`, version
  2026.09.28.2. 15 `csharp exec` cells (11 program cells, 4 types cells);
  3 predicts, 3 hints, 1 solution, 1 `inputs` block, 2 answer folds, 2
  "why" folds, 1 challenge, 1 picture.
- `lessons/a-chain-reads-a-book/a-weighted-choice.svg`: the inner
  dictionary of "the" and its four tickets. It has a `<title>`, a `<desc>`
  and a description in the Markdown. The two tickets of "age" are shaded
  with lines and labelled, and the drawn ticket has a thick border and an
  arrow, so colour is never the only signal. Drawn on its own white card,
  as `three-ways-to-make-change`'s picture is.
- `lessons/a-chain-reads-a-book/a-chain-reads-a-book.outputs.json`, written
  by the checker.

`npm run check-lessons -- a-chain-reads-a-book`: 18 runs, no problems.

## Where the page started

A run that a usage limit stopped had left a full draft in `lessons/`, with
placeholders such as `[[GRID-RESULT]]` where the recorded numbers were to
go, an outputs file recorded at 2026.09.28.1, and no picture (the Markdown
named `a-weighted-choice.svg`, which did not exist). Its structure was
sound, so I kept it and finished it: I filled every placeholder from the
recorded outputs, drew the picture, ran probes for the claims the prose
makes, and went through the prose against the style guide. The changes
that matter are listed under "What I decided".

## What the page does, in order

1. **Words that follow "the"** (`words-that-follow-words-1`). The opening
   of *A Tale of Two Cities*, in small letters, split into words; the loop
   prints each word after "the". It prints `the best`, `the worst`, and
   `the age` twice. An invitation to try "of". Then a line the real-book
   chain wrote later on the page (seed 3), as the promise of the page, and
   the paragraph that says this is an extra and what it needs.
2. **Words that follow words.** A walk through the Dickens text by hand
   ("it was the age of times"); *Markov chain* and *state* defined; Markov
   and *Eugene Onegin* (1913); predictive text.
3. **A dictionary of dictionaries.** The cat-and-mat chain typed in
   (`-1`), with a choice predict on `chain.Count` (4, 5 or 6). The type
   read from the outside in; two lookups in a row. The loop that builds
   the Dickens chain (`-2`), a line-by-line fold, the same loop without
   its `if` (`-3`, `expect: exception`, `KeyNotFoundException` for 'the'
   at line 7), and the class `Chain` with `Words` and `Build` (`-4`).
4. **Choosing the next word.** Tickets and the picture; *weighted choice*
   and *weight*. The class `Writer` with `ChooseNext` and `Write`
   (`choosing-the-next-word-1`), a fold on how `ChooseNext` finds the
   ticket, 4,000 draws (`best 1000`, `worst 983`, `age 2017`), a "why" fold
   on counts against a list, and five lines written from "it"
   (`choosing-the-next-word-2`).
5. **A real book.** `Book.Text`: the first two chapters of "The Boyhood of
   Fionn", as a raw string in a types cell (`a-real-book-1`). *Public
   domain* and *raw string* defined.
6. **Too many words for a grid** (`too-many-words-for-a-grid-1`). 1,543
   words, 633 different words, a grid of 400,689 cells, 1,352 pairs, 0.34%.
   A number predict on the last line. `:N0` explained; punctuation stays
   with its word.
7. **A chain from a real book.** Three seeds from "Fionn"
   (`a-chain-from-a-real-book-1`); an invitation to try other words, and
   "fionn". Seed 1 again with 5 steps, twice, one generator
   (`a-chain-from-a-real-book-2`), with a choice predict whose first option
   is the output line itself; a "why" fold on the second line. Your turn:
   `MostFollowers` (`your-turn-1`), with `inputs`, two hints and a solution
   (`and`, 73).
8. **A chain from your book.** `Book` written again (rule 4) with
   placeholder lines to paste over (`a-chain-from-your-book-1`), and a
   program under it (`a-chain-from-your-book-1-program`) with a hint for a
   paste that breaks the raw string.
9. **Looking back**: the grid against the dictionary, a question about
   seeds (dewlab's, with its classmate challenge folded in), the challenge
   (a chain that remembers two words), the other extras, a paragraph on
   Visual Studio, and **Where to read more**.

## What I decided, and why

- **The page builds the Markov chain from nothing.** dewlab's page starts
  from *Markov chains: where repeated steps settle* (`where-chains-lead`),
  which built a chain from a short text as a transition matrix. That page
  is not on dewsharp's map, so this one starts with its short text
  ("it was the ___ of ___", from Dickens) and its idea, then reaches the
  real book. The order is: pairs of words, the dictionary of dictionaries,
  the weighted choice, the book, the grid, writing. dewlab's argument (a
  grid is too big) still has its own section and its dewlab id, but it
  comes after the dictionary, because a PDP reader has never seen a
  transition matrix to compare with. The section compares the grid with
  the dictionary the reader has just built.
- **The book is two chapters, as a raw string in a types cell**, as the
  map's entry says ("a public-domain passage is kept as a string in a
  types cell"). The text is the first two chapters of "The Boyhood of
  Fionn" from James Stephens's *Irish Fairy Tales*, 1,543 words: dewlab's
  `irish-fairy-tales` world, an Irish author, and enough different words
  (633) for the grid argument. I checked it line for line against
  dewlab's `data/irish-fairy-tales.txt` (Project Gutenberg #2892): it is
  identical apart from the two chapter headings, which are left out.
  Gutenberg's own slip, "when Uall died" for "Uail", is kept. A raw string
  (`"""`) holds the curly quotes and line breaks as they are. Its closing
  `"""` is at the left edge, so a pasted text needs no indenting. The page
  defines *raw string* and says the reader need not read the cell.
- **The whole book fits, if a reader wants it.** A probe put the whole
  Gutenberg file (header and licence included, 69,135 words) into `Book`
  in a scratch lesson. It compiled and ran in about two seconds in the
  browser engine. So the reading list invites the reader to paste the
  whole book, and the page did not need to stay small for the engine's
  sake. Two chapters keep the page itself light.
- **dewlab's "Loading a real book" goes**: `load_text`, the Gutenberg
  markers, the predict on "Project Gutenberg" still being in the book, and
  the `strip_gutenberg` task. The page cannot load a file, and the map's
  entry replaces the file with a string. The paste task says to paste "a
  chapter" or a text of the reader's own.
- **The five book worlds go.** The map gives the page none. The choice of
  book became the paste task, *A chain from your book*, which also uses
  rule 4: `Book` written again replaces the two chapters for the program
  under it, and only for that one.
- **A weighted choice written out, with tickets.** Python's
  `random.choices(..., weights=...)` has no C# twin. `ChooseNext` draws a
  ticket with `generator.Next(total)` (the wording of *Random numbers*)
  and walks the pairs, subtracting each count. That is a small algorithm
  of its own (PDP-LO7), and the picture and a fold explain it. A second
  fold (`dl-why`) shows the other way, a list with a word once for each
  time it followed, and why the page keeps counts.
- **Two static classes, `Chain` and `Writer`**, each in a types cell with
  `file:` and XML comments, as `building-reusable-tools` set the pattern
  ("from here on, every method we write has an XML comment"). Every
  program below calls them (rule 2), and each builds its own chain in one
  line (rule 3, said where it first matters).
- **`return "";` at the end of `ChooseNext`**, with a comment saying it
  never runs, and a fold that says why the compiler needs it. A probe
  confirmed that without it the class does not compile:
  `error CS0161: 'Writer.ChooseNext(Dictionary<string, int>, Random)': not
  all code paths return a value`. The fold quotes only the code and the
  words after the colon, and points to the same error on *Searching*.
- **`'\r'` in `Words`.** A raw string takes the line breaks of the file it
  is in. In a project downloaded to Windows, a line break is `'\r'` then
  `'\n'`, so `Words` cuts at both, and the comment above the line says so.
  The seeded lines are then the same in Visual Studio as on the page.
- **The grid's last line was reworded.** The draft printed `0.34% of the
  grid's cells would not be 0`. A number predict is compared with the last
  number on its line (`web/page/guess.js`), which there was the 0 in "not
  be 0", so every guess would have been compared with 0. The line is now
  `cells in the grid that would hold a count: 0.34%`. Because a cell
  changed after the first recording, `version:` went from .1 to .2.
- **Three predicts, each naming its line.** "What will the last line
  print?" on the cat-and-mat chain (options 4, 5, 6, the output itself);
  the same question as a number on the grid (tolerance 0.3); and "What
  will the first line print?" on the short walk, whose first option is the
  output line exactly. The first cell's question ("which words do you
  expect?") and the 4,000 draws ("about how many times?") are asked in
  prose, because their answer is several lines.
- **Two of dewlab's practice problems come onto the page**, since an
  explore page has no practice page. Problem 3 (`busiest`) is the "your
  turn", `MostFollowers`; dewlab's solution used `max(..., key=lambda)`,
  and this one is the loop from *Dictionaries*' "most common letter", with
  no lambda (the map's open question 5). Problem 7 (a short run with the
  same seed) is the third predict. Problem 5's idea, a word with no word
  after it, appears three times on the page: "mat", "foolishness" and
  "fewer.".
- **The "why" fold under the short walk.** The second line,
  `Fionn as the other than Fionn`, repeats four words of seed 1's long
  line. A reader who notices deserves a reason, and the reason is the
  Markov property itself: once both reach "as" with the same random
  numbers to come, they make the same choices. The fold says that the
  first "as" is luck.
- **The challenge is dewlab's next page in miniature**: a chain that
  remembers two words (*N-grams*, `how-much-it-remembers`, which is not on
  dewsharp's map). It compiles alone and prints nothing until the reader
  fills the loop. dewlab's own challenge, giving a classmate a seed and a
  start word, became the question in "Looking back".
- **Terms defined where they appear**: Markov chain, state, dictionary of
  dictionaries, inner dictionary, weighted choice, weight, public domain,
  raw string, and `:N0`. `:F2` points to *Variables and types*, `!` to
  *Decisions*, `Split(' ')` was met on *Arrays and lists*.
- **Explicit types throughout** (PDP), with `new()` where the type is on
  the left, as *Dictionaries* does. No `var`, no lambda, no LINQ.
- **Words changed in the draft** for the style guide: "straight after"
  became "directly after"; "Say we choose" became "Suppose we choose" (as
  `three-doors`); "scroll past it to continue" became "the page continues
  under it"; "grew up" (a phrasal verb) became "spent his childhood";
  "leave those out" became "drop those empty strings"; "by hand is fine"
  became "we can type the chain ourselves"; "walk", which was never
  defined, became "steps" and "line". A sentence that pointed to
  `palette['o'][1]` on *Dictionaries* went, because that cell is in the
  pixel-art world only. A line that began "1." and another that began
  "0." would have rendered as numbered lists; both were reflowed. The
  hint under the paste task no longer says to run the `Book` cell first:
  the page uses the reader's edits of the cells above without that.
- **Long lines.** The XML comments and the `Write` signature are wrapped,
  so no line of code is much wider than the cell.

## Where each number and quoted output comes from

All from `a-chain-reads-a-book.outputs.json`:

| Prose | Cell |
|---|---|
| `the best`, `the worst`, `the age` twice | `words-that-follow-words-1` |
| the hook, "Fionn long time, ... on him," | `a-chain-from-a-real-book-1` (seed 3) |
| 1, 2, 4 | `a-dictionary-of-dictionaries-1` |
| `best 1`, `worst 1`, `age 2`; "best" once, "worst" once, "age" twice | `a-dictionary-of-dictionaries-2` |
| line 7, `KeyNotFoundException`, 'the' | `a-dictionary-of-dictionaries-3` |
| `best 1000`, `worst 983`, `age 2017` | `choosing-the-next-word-1-program` |
| the first and third lines from "it" | `choosing-the-next-word-2` |
| 1,543; 633; 400,689; 1,352; 0.34% (also in "Looking back") | `too-many-words-for-a-grid-1` |
| seed 1's line; "was Ethlinn. That is," twice in seed 2 | `a-chain-from-a-real-book-1` |
| `Fionn there are better. These were`; `Fionn as the other than Fionn` | `a-chain-from-a-real-book-2` |
| `and: 73 different words after it`; "Fionn" has 7; "a" | `your-turn-1`, its starter and its solution |
| `Paste a text gives it fewer.` | `a-chain-from-your-book-1-program` |

"4 tickets in all" in the picture is 1 + 1 + 2 from the recorded counts.
4,000, 12, 20, 5 and the seeds are numbers written in the code. 1859, 1913
and 1920 are dates. "Twice as often" for "age" is the page's reading of
the counts 1, 1 and 2, and "about half" of 2017 in 4,000.

## Probes (scratch lessons, not part of the page)

Run in the browser engine with `node tools/check-lessons.mjs --lessons
<scratch>`:

- `Writer` without `return "";`: CS0161 at (5,26), the message above.
- `Writer.Write(chain, "fionn", 20, new Random(1))` prints `fionn` alone:
  "fionn" is not a key. "Fionn" has 7 followers, each once: `[pronounce`,
  `there`, `long`, `as`, `did`, `would`, `was`. (For a teacher answering
  the invitation on the page.)
- The Dickens chain in full: `of` is followed by `times` 2, `wisdom` 1,
  `foolishness` 1, so "times" follows "of" most often (the invitation
  under `a-dictionary-of-dictionaries-2`).
- The challenge, solved: keys `was the` (best, worst, age) and `age of`
  (wisdom, foolishness) have more than one word after them; the other ten
  keys have one.
- In the two chapters, the words with 15 or more different followers:
  `and` 73, `the` 56, `was` 29, `to` 28, `that` 28, `a` 27, `of` 23, `in`
  17, `have` 16, `one` 15. All 633 different words have a word after them;
  the last word, "him.", appears earlier too.
- The whole of *Irish Fairy Tales* (Gutenberg's file, header and licence
  included) as `Book.Text`: 69,135 words, 11,068 different words with a
  word after them, about two seconds for the four runs.

The page quotes none of these, except the CS0161 message in its fold.

## What I left out

- dewlab's "Loading a real book" section, its four cells and its predict,
  and the `strip_gutenberg` half of the task (above).
- dewlab's per-section `covers:` map (CMPS-LO1, CMPS-LO4). The map's entry
  gives PDP-LO4 and PDP-LO7, as one flat list.
- dewlab's link to *Matrix multiplication* (`zip`) and to
  `where-chains-lead`: neither page is on dewsharp's map. `zip` and
  `words[1:]` became the index loop with `i + 1`.
- dewlab's remark that `random.choices` takes counts, not probabilities:
  there is no `random.choices` here, and the page never divides counts.
- dewlab's practice page, except problems 3 and 7 (above). Left out:
  characters lost to cleaning (1) and counting chapter headings (2), which
  need the Gutenberg file; fixed pairs (4), the share of words with one
  follower (8) and the other book worlds. Problem 4 or 8 would make a good
  second "your turn" if Josh wants a longer page.
- A "shorter way you'll meet later" solution with LINQ's `MaxBy`: it needs
  a lambda, which PDP leaves to *asking-a-list-a-question* (open question
  5 of the map).

## For other files (not done here: the brief allowed only these)

- `courses/pdp.yaml`: the `planned:` line for `a-chain-reads-a-book` can
  go now that the lesson is in `lessons/` (`docs/TRANSLATING.md`
  checklist). So can the lines for `three-doors`, `counting-darts` and
  `three-ways-to-make-change`, which are in `lessons/` too.
- `leaving-it-to-chance`, `three-doors` and `counting-darts` each name
  *Markov chains* in italics in "Looking back", with "which is not written
  yet" in the last two. They can link to `lesson:a-chain-reads-a-book` now
  (batch rule 3: the author of the later page adds the link, but this
  brief did not allow edits to other lessons).

## Engine and page

- **The editor does not know raw strings.** In `a-real-book-1` the book's
  text is coloured as code: "is", "for", "in", "do" and "from" in the
  keyword colour, "long" in the type colour. The highlighting returns to
  normal after the closing `"""`, and compiling is not affected. It may
  puzzle a reader for a moment. Seen in a screenshot of the page served
  with `npm run serve`.
- **`docs/LESSON_FORMAT.md` does not say** that a number predict is
  compared with the *last number* on its line (`web/page/guess.js`). An
  author who prints a sentence after the number, as this page's draft did,
  gets a predict that compares every guess with the wrong number, and the
  checker does not catch it. One sentence in "predict" would cover it, or
  the checker could warn when the named line has more than one number.

## Open

Questions only Josh can settle:

1. **The book.** Two chapters of "The Boyhood of Fionn" (1920): Irish,
   public domain, and dewlab's own world, but old-fashioned English
   ("ere", "whither", "multitudinous") and an editor's bracket in the first
   line. Keep it, or choose a passage that a reader of English as a second
   language finds easier, such as *Treasure Island* or *The Time Machine*
   from dewlab's other worlds?
2. **"Public domain".** The page says the text's copyright has ended.
   Stephens died in 1950, so in Ireland and the EU (70 years after death)
   it ended in 2021; Project Gutenberg says only "public domain in the
   United States". Is the page's plain sentence enough?
3. **No practice page.** As for the other extras, I moved two of dewlab's
   practice problems onto the page instead. Keep that, or give the extras
   practice pages (the question `three-doors`' notes also ask)?
4. **The paste task and Gutenberg's header.** A reader who pastes a whole
   Gutenberg file also feeds its header and licence to the chain. dewlab
   taught cleaning the file with string searches. Leave it to the reader
   ("paste a chapter"), or add a cleaning step with `IndexOf` and a range?
5. **The Hayes article.** <https://www.americanscientist.org/article/first-links-in-the-markov-chain>
   answered this machine only with a bot check, so I could not confirm the
   page. The article and its details (American Scientist 101(2), 2013) are
   as I know them. Worth a click before the page is in front of a class.
6. **A chatbot in the reading list.** dewlab's 3Blue1Brown video
   (confirmed: *Large Language Models explained briefly*, 3Blue1Brown) ties
   the chain to how a chatbot writes. Keep it on a PDP page?
7. **Numbers that depend on .NET 10.** Every seeded line, and the order of
   the tickets, depends on .NET's `Random` and on the order in which a
   `Dictionary` gives its pairs (the order they were added, which .NET
   does not promise). The page says "on the same version of .NET as this
   page", as `leaving-it-to-chance` does. Enough?
8. **The version.** The stopped run recorded 2026.09.28.1; one cell
   changed after that, so the page is 2026.09.28.2. No learner can have
   saved work under .1, so it could go back to .1 if a page's first
   published version should end in .1.

## Review

Reviewed on 2 October 2026 with fresh eyes: once as a Level 5 learner who
has read the PDP pages up to *Dictionaries*, *Reusable methods* and
*Random numbers* and nothing else, once as a teacher against the course
map's entry (E7), and then line by line against the checklists in
`docs/TRANSLATING.md` and the style guide. The page does what the entry
asks. It keeps a passage in a types cell as a string, builds
`Dictionary<string, Dictionary<string, int>>` from it, and writes new
lines in the book's style. It covers PDP-LO4 and PDP-LO7, it depends only
on pages that come before it, and it says that none of it needs Visual
Studio. Every number and quoted output was checked against
`a-chain-reads-a-book.outputs.json`. The version is now 2026.10.02.1,
because one cell's output changed (see "Code"). The final
`npm run check-lessons -- a-chain-reads-a-book` printed `18 runs ... no
problems`.

### Used before it was taught

- *Outer dictionary* was used (in a predict note and in the answer under
  the first cell) before it was defined. It is now defined with *inner
  dictionary*.
- *Project Gutenberg* was named with no explanation, and *the Fianna* was
  not explained. Each now has a short clause.
- `'\r'` was in the code of `Chain.Words` and in a comment, and the prose
  explained only `'\n'`. The prose now says that a file made on Windows
  ends each line with `'\r'` and then `'\n'`.
- The word *cells* meant two things: the boxes of code, and the squares of
  the grid in "Too many words for a grid". *Grids and references* calls a
  place in a grid an *element*, so the grid section now says *element*,
  with a sentence that links the word to that page. This changed the
  printed lines of `too-many-words-for-a-grid-1` and the variable in it.
- The seed in the 4,000-draw cell was not mentioned. A sentence says the
  seed is 1, as on *Random numbers*, so every Run gives the same counts.

### Claims that needed changing

- The opening said the program "prints each word that comes directly
  after the". It prints each pair, `the best`. It now says "with `the` in
  front of it". "The first lines" is now "the first words", because the
  text is one string of 24 words, with no line breaks.
- "Writes words like these, which nobody has written before" was a claim
  the page could not support. The words are a new line, and I checked
  with a script that none of the three seeded lines is in the book (the
  longest run of the book's words in any of them is 5) and that every
  pair of neighbouring words in them is. The hook now says "This is one
  of them, and it is not in the book".
- "It is the last line of the text" (for `it was the age of foolishness`)
  now says "These are the last words of the text". The text is one line.
- "The lookup stops the program" now names the exception, as the page
  calls the three outcomes.
- The paragraph on Markov said he "counted how often a vowel came after a
  vowel, and how often a vowel came after a consonant". Hayes (the page's
  own reading) says that Markov sorted each pair of neighbouring letters
  by vowel and consonant and counted the pairs (1,104 vowel-vowel pairs
  in 20,000 letters). The page now says that.
- "The predictive text on a phone does a similar job" followed that
  sentence and read as if Markov's counting was predictive text. It now
  says that the same idea is used today, with predictive text as an
  example.
- "Too many words for a grid" is a heading over 400,689 elements, which a
  computer holds easily. A sentence now says so, and says that the grid
  grows much faster than the text. I did not add the whole-book number,
  because no cell prints it (the writer's probe found 11,068 different
  words with a word after them in the whole of *Irish Fairy Tales*).
- The predict on the grid printed a line that ends in `%`, and a reader
  who types `0.5%` is compared as not a number. The question now says to
  type only the number before the `%` sign.
- The second option of the seed predict, "Six other words, starting with
  Fionn", could be read as six words in addition to something. It is now
  "A different line of six words, starting with Fionn".

### Words

- The definition of a *Markov chain* was one long sentence with
  *process* and *condition* in it. It is now four short sentences: it moves
  from one *state* to another, a state is a word, the next state is chosen
  at random, and the chances depend only on the state it is in now.
- "Start on" and "starts on" became "start with" and "starts with".
- "In the voice of" (twice) became "in the style of".
- The sentence about the book (the Fianna, the old Irish stories, the
  hidden childhood, Project Gutenberg) had two appositions in one
  sentence. It is now four sentences.
- The raw-string paragraph said a line "can start anywhere". It now says
  that C# takes no spaces from the start of any line, because the last
  `"""` is at the left edge.
- The steps of the ticket draw in the answer fold ("2 is not less than
  1 ...") started sentences with a number, and said which word only in
  brackets. Each step now names the word and its count.
- The fold on CS0161 said "as in the search on *Searching*". It now says
  what that page showed: a search with its last `return` missing.
- The paste task was three orders ("Paste it ... Then run ... and
  choose"). It is now two questions and a statement. It also says that a
  start word must be written exactly as it is in the text.
- "Every line on this page came with its seed" was not true of the first
  cell, which uses no random numbers. It now says "Every line that the
  chain wrote".
- A short invitation was added after the hand-written sentence: "Can you
  write another sentence in the same way?"
- The old-fashioned English of the book ("ere", "whither") now has a
  sentence of its own, with each word explained, so a reader of English as
  a second language is not surprised in the long cell.

### Code

- `too-many-words-for-a-grid-1`: the variable `cells` is now `elements`,
  and its two printed lines say *elements*. The numbers are the same
  (1,543; 633; 400,689; 1,352; 0.34%).
- `a-dictionary-of-dictionaries-4`: the XML comment of `Words` said
  "whatever is between two spaces or line breaks", which is not how a
  first word is found. It now says "A word ends at a space or at a line
  break". The code did not change.
- The second hint on `your-turn-1` now shows the `foreach` header with
  its long type, because that type is the part a reader cannot guess.
  The first hint now begins with its question.
- `--write` was run once. The only differences in the outputs file are
  the version and the two lines above.
- Nothing else in the cells changed: ids, `expect:`, `stdin:` (none),
  the solution, the `inputs`, the three predicts and their line names.

### Links

All three in the "Where to read more" list that could be opened from this
machine were checked: Project Gutenberg's page for #2892 is *Irish Fairy
Tales by James Stephens*; Microsoft's *Raw string literals* page exists;
YouTube's oEmbed gives *Large Language Models explained briefly* by
3Blue1Brown.

The Hayes article answered a direct request only with a bot check. A
search found it at the same address, titled *First Links in the Markov
Chain*, American Scientist 101(2), March-April 2013, pages 92 to 97 (the
page numbers are now in the citation). I read the PDF of it that American
Scientist serves: it is about Markov and *Eugene Onegin* in 1913, it has a
weather example, it describes PageRank and web search, and it describes
random text "in the manner of a particular author". So the page's
description of it ("text, weather and the web") is right.

I checked the text of `Book.Text` against dewlab's
`data/irish-fairy-tales.txt` (Project Gutenberg #2892): it is the same,
word for word, from the first line of chapter I to the end of chapter II,
without the "CHAPTER II" heading. It has 1,543 words.

### The checklists

- Opens by running something and asking about it: yes.
- Terms defined where they first appear: yes now (see above).
- Tasks are questions or invitations, and there is a first step anyone can
  take: yes. `MostFollowers` starts with a guess so the cell runs.
- Two or three guesses: three, each naming its line (`the last line`, `the
  last line`, `the first line`). The first and third are choice predicts
  whose options match the output (the third's first option is the output
  line itself), the second is a number with a tolerance of 0.3.
- No *right*, *wrong*, *correct*, *well done* or *not yet*, and no ticks:
  none. (The word *better* appears only in the book, in what the chain
  writes, and in the standard "suit you better" line of "Where to read
  more".)
- Plain words: the phrasal verbs I found are changed (*start on*). *Asks
  for*, *looks at* and *come after* are verbs with a preposition and are
  used as the exemplars use them.
- Irish and British spelling: *neighbouring*. No American spellings.
- Each program cell works on its own, and the page follows the rules of
  the road, each said in the style guide's words, with the rule's number
  where it is used (rules 2, 3 and 4).
- Every number in the prose is in the outputs file, or is a number in the
  code (4,000 draws, 12 and 20 and 5 steps, the seeds).
- Names the outcomes it covers: in the frontmatter (`covers:`), as the
  other extras do. Says what belongs in Visual Studio: nothing, and how
  **Download project** names the files.
- `expect:` on the one cell meant to fail, and the prose says so before
  it runs.
- The hint on the paste cell has no `after:`, so it appears after one
  error, which is what a bad paste gives.

### Still open for Josh

Questions 1 to 4, 6 and 7 of "Open" above are still his. In short:

1. **The book.** I kept it, and glossed "ere" and "whither" on the page.
   An easier passage (*Treasure Island*, *The Time Machine*) is still a
   choice for him.
2. **"Public domain".** The page's sentence is unchanged. Stephens died in
   1950, so the text has been free in Ireland and the EU since 2021, and in
   the United States since 2016 (published 1920). Gutenberg's own words
   are about the United States only.
3. **No practice page.** Two of dewlab's practice problems are on the
   page. Problems 4 and 8 of dewlab's practice page are still unused.
4. **Pasting a whole Gutenberg file.** The reading list now warns that the
   file's first and last lines are Gutenberg's notes, and that the chain
   reads them. Teaching a cleaning step is still his choice.
5. **The Hayes link** is answered (see "Links"). Josh need not click.
6. **3Blue1Brown on a PDP page.** Unchanged and still his. The video is
   about 8 minutes, and the title and author are confirmed.
7. **Seeded lines and .NET 10.** Unchanged. The page says "on the same
   version of .NET as this page", as *Random numbers* does.
8. **The version** is answered: 2026.10.02.1, because a cell changed.

New:

9. **Three other pages are now out of date, and this review was not
   allowed to edit them.** `leaving-it-to-chance`, `three-doors` and
   `counting-darts` each name *Markov chains* in italics, two of them with
   "which is not written yet". They can link to
   `lesson:a-chain-reads-a-book` now. `leaving-it-to-chance` also says that
   *The Monty Hall problem* and *Monte Carlo* "are not written yet", and
   both are in `lessons/`.
10. **`courses/pdp.yaml`** still has `planned:` lines for
    `three-doors`, `counting-darts`, `three-ways-to-make-change` and
    `a-chain-reads-a-book`. All four are in `lessons/`, so the lines can go
    (`docs/TRANSLATING.md`, checklist).
11. **The heading "Too many words for a grid"** is dewlab's. For two
    chapters it overstates, because 400,689 elements fit in memory. The
    page now says so in the paragraph under the numbers. A heading such as
    "A grid would be almost empty" would be more exact, and it is a
    heading only: no cell id depends on it.
12. **The grid size uses `chain.Count`**, the number of different words
    that have a word after them, not the number of different words. They
    are the same here (633), because the last word of the book also
    appears earlier. For a text of the reader's own whose last word is
    new, the grid would need one more row and column. The page's label
    says what the cell counts, so nothing on the page is untrue.

### Engine and page

Nothing new. The writer's two notes still stand: the editor colours the
raw string's text as code, and `docs/LESSON_FORMAT.md` does not say that a
number predict is compared with the last number on its line. One more
consequence of that, which I fixed on this page: a printed `%` sign is not
part of the number, so a reader who types it is compared as not a number.
Nothing in the format or the checker warns an author about that.
