# looking-things-up-by-name: notes for a reviewer

Ported from dewlab `tutorials/looking-things-up-by-name/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 18):
action *adapt*, shape *tutorial*, size L, batch 4, depends on
`lists-and-sequences`. There was no partial draft in this folder, so both
pages were written from the start by the porter.

**Moved into `lessons/` on 28 September 2026.** The draft folder is gone.
The pages are `lessons/looking-things-up-by-name/looking-things-up-by-name.md`
and `looking-things-up-by-name-practice.md`; their recorded outputs are the
two `*.outputs.json` files beside them, written by the browser checker; and
this file was the draft's `NOTES.md`. The three `*.native.json` files were
deleted: the browser checker's outputs files replace them. "What was done
when it moved", just below, says what changed in the move. The rest of this
file is the porter's, brought up to date (what the move made stale is
marked *(stale)* or rewritten), with the porter's questions settled where
the playbook, the course map, the style guide or the exemplars answer them.
What none of them answers is under "Open", at the end of the questions.

Files:

- `looking-things-up-by-name.md`: the lesson, version `2026.09.28.1`. 23
  exec cells, 8 of them in world variants (19 on show in either world); 3
  predicts, 11 hints, 9 solutions, 9 `inputs` blocks, 1 fold, 1 challenge.
  One cell is meant to fail: `checking-whether-a-key-is-there-1`
  (`expect: exception`). No cell and no challenge warns.
- `looking-things-up-by-name-practice.md`: the practice page, version
  `2026.09.28.1`, 14 problems. 15 exec cells, 2 of them in world variants
  (14 on show in either world); 3 predicts, 6 hints, 9 solutions, 7
  `inputs` blocks, 8 folds. Three cells are meant to fail: `five-lookups-1`
  and `the-same-key-twice-2` (`expect: exception`), and `the-first-pair-1`
  (`expect: CS1503`). No cell warns.
- `looking-things-up-by-name.outputs.json`,
  `looking-things-up-by-name-practice.outputs.json`: what the browser
  checker recorded, per world.
- `NOTES.md` is now this file, `planning/notes/looking-things-up-by-name.md`.

## What was done when it moved

- **The browser run.** `npm run check-lessons -- --write
  looking-things-up-by-name looking-things-up-by-name-practice` ran every
  cell, solution and `inputs` row of both pages in the real engine, in both
  worlds, and reported no problems. On the draft as it came, every output,
  diagnostic and exception was the same as the native check's, character
  for character: no difference in culture or number formatting, in
  `Console.WriteLine` of a dictionary
  (``System.Collections.Generic.Dictionary`2[System.Char,System.String]``),
  in trimmed APIs (`GetValueOrDefault`, `TryGetValue`, `ContainsValue`,
  `Zip(...).ToDictionary()`, `Values.Sum()` all work), in compiler messages
  (the same codes, lines, columns and text) or in exceptions (the same
  types and messages, at the same lines). The only difference is the one
  the porter predicted: the `inputs` rows that hold a dictionary, which the
  native check showed as `System.InvalidCastException`, show in the
  browser as `{ ['B'] = 1, ['A'] = 3, ['N'] = 2 }` (see "The native check
  and dictionaries", now resolved). The porter's 31 probes (at the end of
  this file), with the `Display` types cell they share, were run in the
  browser too, in a scratch lesson (`node
  tools/check-lessons.mjs --lessons <scratch>/lessons --write`): each did
  what its comment says, with the same output as natively.
- **Starters that warned.** `your-turn-2--secret-messages` (`shift`) and
  `your-turn-3--secret-messages` (`message`) made variables they did not
  use, so an untouched Run showed CS0219, and the prose explained the
  warning twice. The playbook's pitfall says a starter's variables must be
  used, and the pages moved before this one settled it the same way. Each
  starter now prints a line that uses its given values, and each solution
  prints the same line: `HELLO with a shift of 3: ` (the solution: `...:
  KHOOR`) and `EQRT decodes to ` (the solution: `... CADE`). The two
  paragraphs about CS0219 went. For the same reason as on the lists page
  (no starter's first run only an empty line, where its twin in the other
  world prints something), `your-turn-1--secret-messages` now prints `BEAD
  in code: `, and its solution `BEAD in code: WTQR`. The `inputs` blocks
  are unchanged.
- **Numbers and messages the prose quoted but no cell printed**
  (decision 29, and the instruction that every number and quoted output
  comes from a recorded output). Each is now printed by a cell or a
  solution, or no longer quoted:
  - Lesson, your-turn-1 (secret messages), second hint: the quoted text of
    CS0029 (probe only) became "Does the message say CS0029, and name
    `'int'` and `'string'`?", the shape of the hints on the loops, lists
    and methods pages. "as `'A' + 3` did" named something no page shows; it
    became "C# adds the numbers the letters are stored as, as `moved +
    'A'` did on [the page about variables]", which is
    `storing-and-computing`'s code.
  - Lesson, your-turn-2 (pixel art), second hint: "Did level 1 give 63, and
    level 2 give 127?" (probe only) became "Are some of your brightnesses a
    little smaller than a solution's?".
  - Lesson, `checking-whether-a-key-is-there-2`: "`key.ContainsValue('Q')`
    gives `True`" (probe only) became "`ContainsValue` checks the values,
    but it has to check every pair to know".
  - Lesson, "Looking up with a default": "0 for an `int`, and `null` for a
    `string` ... it prints as an empty line" (probe only). A new cell,
    `looking-up-with-a-default-3`, asks the reader what the default is for
    an `int` and prints `4`, then `0`, from the same `counts` as
    `adding-and-changing-values-2`. The prose now says "It prints 4, then
    0: C#'s default for an `int` is 0. For a `string`, it is `null`", with
    no claim about what `null` prints. This also backs the sentence under
    `counting-things-2` that 0 is the default of an `int`. The cell sits
    between `-1` and `-2`; its id is `-3` so that no id changed. dewlab's
    `looking-up-with-a-default-1` printed its third line, `.get("Z")`, for
    the same reason.
  - Lesson, your-turn-5 (pixel art): "14 times out of 24" (24 probe only)
    became "14 times".
  - Lesson, "Looking back": "In this message, two letters share the
    biggest count" (probe only; the checker compiles a challenge and never
    runs it, decision 40) became a question: "Does one letter have the
    biggest count, or do two share it?".
  - Practice 1: (b) to (e) (probe only). `five-lookups-1` now tries all
    five in the order of the list and has `expect: exception`: it prints
    `W`, `3`, `False` and `?`, and then stops at line 9. The problem says,
    before the run, "Whatever happens when you run it is meant to happen,
    and nothing is broken", without giving the answer, and the fold names
    line 9. The id is kept: the task is the same.
  - Practice 2, the fold: "with `Add`'s shape ... a repeated key stops the
    program" (probe only) became an invitation to try it in the first cell.
  - Practice 3, the fold: "`shades[0]` does compile" (probe only) became
    `shades[1]`, which the lesson's pixel-art solution uses and records.
  - Practice 12, the fold: "`new(key)` makes a new dictionary" stays as a
    sentence with no output, and now invites the reader to change the line
    and run it again.
  - Practice 14, the fold: `double.Parse("12.5")` "gives 12.5" (probe only)
    became "`double.Parse` can read it", and (d)'s quoted CS0019 message
    (probe only) became "It does not compile, so nothing runs. C# has no
    `*` for a string and a number", in the words of the exceptions page's
    own practice problem 1, which names outcomes and exception types in the
    same way.
- **The exception, as the page shows it.** `checking-whether-a-key-is-there-1`
  asks what the first line of the report says. The prose now quotes the
  report as the page shows it, `Unhandled exception.
  System.Collections.Generic.KeyNotFoundException: The given key 'Z' was
  not present in the dictionary.` with `at line 5 of Program.cs` under it,
  as the lists page does for its `indexes-1`.
- **Cells meant to fail, said before the run.** Practice 3 carries a
  predict whose answer is the failure. "This cell is meant to fail" gave
  part of the answer, so it became a question ("An array's first element is
  at `[0]`. Is a dictionary's first pair there too?") and "Whatever happens
  when you run the cell is meant to happen, and nothing is broken", as the
  lists and decisions pages say.
- **Links** (decision 32, and the list of pages moving in this round).
  Every `lesson:` link goes to a page in `lessons/` or one on the list:
  [the page about variables] (`storing-and-computing`, new, in the hint
  above), [the page about grids] (`grids-and-references`; the lesson's
  pixel-art your-turn-1 and practice 12, which were plain text), [the page
  about loops] (`repeating-yourself`), [the page about decisions]
  (`making-decisions`), [the closer look at dividing]
  (`dividing-in-csharp`), [A program of your own] (`a-program-of-your-own`,
  on the list, which was plain text), [the page about arrays and lists]
  (`lists-and-sequences`) and [the page about exceptions]
  (`reading-an-error-message`). *Reading input* is neither in `lessons/`
  nor on the list, so it is named by its short title in italics, as
  `writing-your-own-functions` names it ("from the page about reading
  input" was plain text). While `a-program-of-your-own` was still a
  draft, the checker reported that link and nothing else; by the final
  check it had moved into `lessons/`, and the checker reported no
  problems.
- **Visual Studio.** "Looking back" now says that everything on this page
  runs in the browser, and that **Download project** saves a cell as a
  Visual Studio project, which prints the same there, in the words of the
  lists and grids pages. It ends with the exemplars' "Next, the practice
  page ...", and names [A program of your own] as the page after it.
- **Plain words.** "To look up a value" became "To find a value by its
  key"; "You look up an Irish word" became "Each Irish word is a key"; the
  heading "Looking up with a default" became "A default for a missing key"
  (the cell ids keep `looking-up-with-a-default`); "says so at once" became
  "stops the program ..., and the report names the key"; "checks for the
  key" became "checks whether the key is there"; "Two lookups in a row"
  became "Two lookups, one after the other"; "When a letter moves back past
  A" became "When a shift goes backwards past A"; practice 9's "count
  through the indexes" became "count the indexes", as on the lists page.
  *Look up* stays once, as the term the title uses (question 9).
  *palette* is now defined where it first appears ("a picture's palette
  (the colours it uses)").
- **Where to read more.** Microsoft's *Dictionary<TKey,TValue> Class*
  answered HTTP 200 on 28 September 2026. Its example does not use every
  method on this page, as the draft said: it uses `Add`, the indexer,
  `ContainsKey`, `TryGetValue`, `Keys`, `Values`, `Remove` and a `foreach`
  over `KeyValuePair`, with explicit types, and not `GetValueOrDefault` or
  `ContainsValue`. The note now lists what it uses. Its Remarks say "The
  order in which the items are returned is undefined" and that the class
  "is implemented as a hash table", so the video's note now says "as
  Microsoft's page above says". YouTube's oEmbed confirms *Hash Tables,
  Associative Arrays, and Dictionaries (Data Structures and Optimization)*
  by SimonDev. Its length, "About twelve minutes", came from dewlab and
  could not be checked from here (the TubeAlfred lookup had no credits), so
  it went. The year, 2021, is dewlab's and is not checked either.
- **The page, looked at.** Both pages were opened in headless Chromium on
  the real server (`tools/serve.mjs --isolate`), in both worlds, at 390 and
  900 pixels wide: no errors in the console, no sideways scroll, every cell
  labelled PROGRAM except the comment cell, `dictionary-or-list-1`, which
  is `empty`, and every link answered 200. See "Page behaviour" below for
  the porter's UI questions.
- **Version.** Both pages are `2026.09.28.1`, since cells changed.
- **Left for the orchestrator:** `courses/pdp.yaml` still has
  `looking-things-up-by-name: "Dictionaries: looking things up by key"`
  under `planned:`. The playbook's checklist says to delete it when the
  lesson moves; this move was told not to edit the course files.

## Frontmatter

- `title`: "Dictionaries: looking things up by key", the course map's
  title. dewlab's was "... by name". The id keeps "by-name" (the course map
  keeps dewlab's id).
- `covers: [PDP-LO4]`, from the course map. dewlab gives the same outcome
  for its first section only (`touches: [PDP-LO4]`).
- `worlds`: dewlab's two, with dewlab's sentences, as the course map says
  for PDP. `year:` is dropped: the format has no such field.
- The practice page has `from: looking-things-up-by-name-practice`,
  `practice_for: looking-things-up-by-name`, the same worlds and no
  `covers`, as the other drafted practice pages do. Its title follows
  `lists-and-sequences-practice`: "Dictionaries: practice".

## What changed from dewlab, and why (the porter's notes)

### What the reader already knows

PDP's order before this page: "First programs" (13 pages), then
`writing-your-own-functions`, `lists-and-sequences`,
`grids-and-references` and `two-names-one-list`. From the drafts, the
reader has met: typed variables and `char` arithmetic (`moved + 'A'` is
an `int`, on `storing-and-computing`), `$"..."`, `if`, `char.IsUpper`, `for` and `foreach`, `+=` and `++`,
the accumulator pattern, exceptions and their reports, `static` local
methods written above their calls, "Compare with a solution" with
`inputs`, arrays, `List<T>` with `new()` and `Add`, `Count`,
`string.Join`, `Console.WriteLine` printing a collection's type name,
`new int[] { ... }` inside another collection, and reference types and
aliasing (`grids-and-references`, drafted in the same batch during this
run). `int.TryParse` with `out` belongs to `reading-input`, which is not
drafted; `writing-your-own-functions` already names it ("from the page on
reading input") and defines `out`, and this page defines `out` again in
one sentence so that it does not depend on the undrafted page.

### Links: back only, as the batch rule says *(stale)*

*When the page moved, the three plain-text references to pages on the
list of this round became links (the grids page twice, and A program of
your own), and "the page about reading input" became* Reading input *in
italics, since that page is neither in `lessons/` nor on the list
(decision 32). `grids-and-references` now links to this page from its
"Looking back". What follows is the porter's record.*

This page is batch 4. The lesson links to `repeating-yourself`,
`making-decisions` (batch 2), `dividing-in-csharp` (batch 1) and its own
practice page. The practice page links to `lists-and-sequences` and
`reading-an-error-message` (batch 3). Everything else is plain text, and
can become a link when that page lands:

| Where | Plain text now | Link to add | That page's batch |
|---|---|---|---|
| lesson, pixel-art your-turn-1 | "the page about grids and references" | `lesson:grids-and-references` | 4 (same batch) |
| lesson, "Looking up with a default" | "from the page about reading input" | `lesson:reading-input` | 4 (same batch) |
| lesson, "Looking back" | "The next page, A program of your own" | `lesson:a-program-of-your-own` | 5 |
| practice 12 | "From the page about grids and references." | `lesson:grids-and-references` | 4 (same batch) |

`grids-and-references` (its NOTES, "Links") already lists "the page on
dictionaries" as a link to add to its own "Looking back" once this page
lands. dewlab's links to `repeating-yourself`, `lists-and-sequences`,
`making-decisions` and `a-program-of-your-own` keep their targets;
`comprehensions-and-grids` is now `grids-and-references`.

### The lesson, section by section

**Opening (`a-shared-key-1`).** The same cell and predict, with
`Dictionary<char, char>` as the course map writes it and the
index-initializer form (`['A'] = 'Q'`). The pairs sit on one line
between braces on their own lines: one pair to a line would make most
cells of this page three lines longer, and the one-line form of the whole
dictionary is over 100 characters. The printing line uses `$"..."`,
because `key['C'] + key['A'] + key['B']` adds three `char` values and
prints a number (the second hint of your-turn-1 turns this into a lesson).
dewlab's third option, "An error", became "Nothing: it does not compile",
with dewlab's note about positions.

**Making a dictionary.** Defines *dictionary*, *key*, *value* and *look
up* (a phrasal verb, but it is the topic of the page and the name of the
id, so it is defined as a term and used as one). New for C#: the type
names two types between `<` and `>`, and the three rules of the
initializer replace dewlab's three rules of `{`, `:` and `,`.
`making-a-dictionary-1` keeps dewlab's three lines (value, count, whole
dictionary), in the order value, `Count`, dictionary, so that the type
name comes last. The prose names the type name
(`` Dictionary`2[System.Char,System.String] ``) and the `` `2 ``. dewlab's
paragraph on single quotes goes (C# prints no quotes). "A value can be any
type, a list included" became "an array included", which your-turn-1
(pixel art) uses.

**Your turn 1.** Both worlds keep their tasks. Secret messages gains two
hints: a question (`after: 1 runs`) and CS0029 for `char + char` assigned
to a `string` (`after: 1 errors`, probe `l-char-plus-char`), a mistake a
reader from dewlab's `key["B"] + key["E"]` will make. The solution builds
the word with `$"..."`. Pixel art is `Dictionary<char, int[]>`, with
`new int[] { ... }` for each colour and a sentence that points back to
the grids page, where the same rule appeared. Without `new int[]`, the
compiler gives three CS1061 messages about `Add` (probe
`l-array-without-new`); the page does not show them, because they are
hard to read (see question 4). *(When it moved, the CS0029 hint lost its
quoted message, and its `'A' + 3` became `moved + 'A'`; the grids page is
now a link; the secret-messages starter prints `BEAD in code: `.)*

**Adding and changing values.** `adding-and-changing-values-1` keeps its
number predict (4). It prints `palette['r']` and `palette.Count` instead of
the dictionary. dewlab's sentence "A dictionary keeps its pairs in the
order they were added" goes: C#'s `Dictionary` promises no order (see
"Looping"). In its place, one sentence says the initializer follows the
same rule as the indexer (probe `l-initializer-replaces`), which prepares
practice 2. `adding-and-changing-values-2` prints `counts['E']`; the prose
adds `+= 1` and `++` (probe `l-plus-equals`). "the right-hand side" became
"the part after `=`", to keep "right" out of the page.

**Your turn 2.** Secret messages: the key is built with
`(char)('A' + number)` and `(char)((number + shift) % 26 + 'A')`, the
casts `lists-and-sequences` uses. *(Stale: the stub showed CS0219 for
`shift`, and the prose said so. It now prints `HELLO with a shift of 3: `,
and does not warn.)* `inputs` are `key.Count` and
`coded`. Pixel art: `Dictionary<int, int>`. dewlab's "each 255 / 4 more
than the last" became "each a quarter of 255 more", because `255 / 4` is
63 in C#. The first hint gives `(int)Math.Round(level * 255 / 4.0)`
(`Math.Round` was met on `storing-and-computing-practice`); a second hint
(`after: 2 runs`) is for `level * 255 / 4`, which gives 63 and 127 (probe
`l-shades-inputs`; since the move, the hint no longer quotes the two
numbers). The stub cannot print the dictionary, and a loop over
its pairs comes later on the page, so it prints `Count` and invites the
reader to print a pair. dewlab's note that a key cannot be a list is not
true of C# (any type can be a key), so it became a note that `shades[1]`
is a key, not an index.

**Checking whether a key is there.** `KeyError` becomes
`KeyNotFoundException`, `expect: exception`, with its message quoted
(since the move, the whole report, as the page shows it).
dewlab's "Read the last line" became a question about the first line of
the report, because .NET names the exception first
(`reading-an-error-message`). `in` becomes `ContainsKey`; the predict
keeps its two options, now `True` and `False` as C# prints them. One
sentence adds `ContainsValue` (probe `l-contains-value`), because a reader
who asks "and the values?" has an answer. *(Since the move, the sentence
no longer quotes `True`.)*

**Looking up with a default.** `.get()` has two C# answers, as the course
map says. `looking-up-with-a-default-1` is `GetValueOrDefault` with `'?'`.
dewlab's third line, `.get("Z")` giving `None`, has no clean C# twin: for a
`char` the default is the character with code 0, which prints as nothing
visible. So the cell keeps two lines, and the prose says what the default
is for an `int` (0) and a `string` (`null`, an empty line; probe
`l-default-of-type`). *(Stale: a new cell, `looking-up-with-a-default-3`,
now prints the default for an `int`, and the prose no longer says what
`null` prints. The heading is now "A default for a missing key".)* `looking-up-with-a-default-2` is new: `TryGetValue`
with `out char code`, in the `TryParse` pattern the course map names, and
an invitation to try `'Z'` (probe `l-try-get-value-z`). dewlab's "Which
should you use?" paragraph became three bullets, one for each way.

**Looping over a dictionary.** Both of the course map's forms, `.Keys` and
`KeyValuePair<char, string>` written in full, in one cell. The prose names
`.Values` too. dewlab's comparison with `enumerate()` goes (the lists page
dropped `enumerate`). A new paragraph says that a dictionary does not
promise an order, and that a program that needs one keeps a list. The
reference page in the reading list says "undefined", and probe
`l-order-after-remove` shows a new pair taking the place of a removed one.

**Your turn 3.** Secret messages: `decodeKey`, CADE, as dewlab. *(Stale:
the stub's CS0219, for `message`, was named. The stub now prints `EQRT
decodes to `, and does not warn.)* Pixel art: dewlab's `drawn` was a list of
lists of names, printed as nested Python lists. In C# that would be a
`List<List<string>>` and a nested print. The task is the same, but each
row becomes one string of names joined with spaces, so `drawn` is a
`List<string>`, and `inputs` shows `["black red black", "white ? white"]`.
The id is kept, because the task is the same. The solution note's "stop
halfway through" is probe `l-drawn-with-indexer` (since the move, "stop at
the `x` ..., as `key['Z']` did above", the page's own recorded
exception).

**Counting things.** The pseudocode stays; its last line now says "each
letter and its count", because the cell prints them one to a line. Both
cells print each key in quotes, `'E' 6`, so that the space shows, and a
sentence says why. `.get(letter, 0)` becomes `GetValueOrDefault`, and a
sentence adds that 0 is also an `int`'s own default.

**Your turn 4.** `count_letters` becomes `static Dictionary<char, int>
CountLetters(string text)`, written above its call as on
`writing-your-own-functions`. The stub prints the pairs for `"BANANA"`.
The `inputs` lose `guess: yes`; in its place, the page asks the reader to
write down a guess for each case, as `writing-your-own-functions` does.
The hint gains `after: 1 runs` and a question. "which is the right
answer" left the solution note.

**Your turn 5.** Both worlds keep their tasks. *(Since the move, the
pixel-art note says "14 times", without "out of 24".)* `most` is a `char` starting
at `'?'`, which is not a key, so `GetValueOrDefault(most, 0)` gives 0, as
dewlab's `counts.get("", 0)` did. The secret-messages hint no longer says
"the way you kept the brightest pixel": that task was in the other world
on the lists page. The picture is a `string[]`.

**Dictionary or list?** The table gains the C# names: its type names one
type or two, and a missing item gives three different exceptions (probes
`l-array-past-end`, `l-list-past-end`). The question becomes "an array, a
list or a dictionary?", and the fold gives each answer's C# type: the
rainfall is a `double[]` of 31, since March's length never changes. The
comment cell stays (course map); the native check calls it `empty`, and
so does the page (see "Page behaviour").

**Looking back.** dewlab's question stays, with "array" for "list" and
"key" for "name". The challenge keeps its message and starter, in C#.
The native check found something dewlab's prose did not say: V and H
share the biggest count (4 each), and V comes first. Guessing V as E,
then T, then A gives nonsense three times; only H as E decodes it (probe
`l-challenge-answer`: THIS IS A MESSAGE FROM THE FRONT LINE). So the
prose now says that two letters share the biggest count, and invites the
reader to try the other letter. It also points to the dividing page for a
shift that goes back past A. The next page, `a-program-of-your-own`, is
plain text (batch 5). *(Stale: the challenge is compiled and never run
(decision 40), so the tie is not in any recorded output. The prose now
asks "Does one letter have the biggest count, or do two share it?", and
`a-program-of-your-own` is a link.)*

**Where to read more.** The Python tutorial goes. Microsoft's reference
page, *Dictionary<TKey,TValue> Class*, replaces it. I fetched it on 27
September 2026: its example uses explicit types (no `var`) and every
method on this page, plus `Remove` *(stale: it does not use
`GetValueOrDefault` or `ContainsValue`; see "What was done when it
moved")*, and its Remarks say "The order in
which the items are returned is undefined." It is written for experienced
programmers, and the note says so. The other candidate, *How to initialize
a dictionary with a collection initializer*, shows both initializer forms
and the duplicate-key difference that practice 2 teaches, but it uses
`var`, nested object initializers and a class with `Main`, too much for
this point in PDP (open question 7). Singh's *The Code Book* stays as
dewlab had it. SimonDev's video stays; its full title and channel were
confirmed through YouTube's oEmbed on 27 September 2026 ("Hash Tables,
Associative Arrays, and Dictionaries (Data Structures and Optimization)").
The year (2021) and the length (about twelve minutes) are dewlab's and were
not checked *(the length went when the page moved)*. A sentence says that a C# `Dictionary` is a hash table, which
makes the video about C#'s own type.

### Predicts

The style guide allows two or three. The lesson keeps dewlab's three:
the opening, the number of pairs, and `ContainsKey('Q')`. The practice
page had five (2, 3, 4, 12, 13). It keeps three: 2 (the course map asks
for it), 3 (C# answers differently: it does not compile) and 12 (a
reference type). Problems 4 and 13 keep their questions, in the prose,
with a fold.

### The practice page

1. **Five lookups.** C# names; (c) is `ContainsKey('W')`. (e) quotes the
   exception's message (probes `p-five-lookups`, `p-five-lookups-e`).
   *(Since the move, the cell tries all five and has `expect: exception`,
   so every answer in the fold is recorded.)*
2. **The same key twice.** As the course map asks: the first cell repeats
   a key in the initializer and prints 2, then 2, quietly; a new second
   cell (`the-same-key-twice-2`, `expect: exception`) shows `Add` stopping
   with an `ArgumentException`. The predict has four options, adding "It
   stops with an exception". The fold defines *argument* in passing (the
   message has the word in its type name), says `[key] =` adds or
   replaces while `Add` only adds, and names the `{ { 'E', 1 } }` form,
   which calls `Add` (probe `p-add-shape`), because learners meet it in
   books and on Microsoft's pages. *(Since the move, the fold asks what a
   repeated key does in that form, and invites the reader to try it.)*
3. **The first pair.** `key[0]` does not compile in C#: CS1503, `int` to
   `char`, at (5,23). The cell has `expect: CS1503` and the prose says it
   is meant to fail. The predict's options are the three things that can
   happen when you press Run. The fold adds that with `int` keys,
   `shades[0]` compiles and finds the key 0 (probe `p-int-keys`).
   *(Since the move, the prose asks a question and says "Whatever happens
   ... is meant to happen", and the fold uses `shades[1]`, which the
   lesson records.)*
4. **Two changes.** Prints `E 3, T 1` as one line. The predict became a
   question in the prose (see "Predicts"). The fold's
   `counts['T'] + 1` is probe `p-two-changes-indexer` (since the move, it
   points to (e) in problem 1, which records the same exception).
5. **How many in all.** Tier 1 loops over `counts.Values`; tier 2 is
   `counts.Values.Sum()`, titled "a shorter way C# has", as
   `lists-and-sequences-practice` titles its C#-only second tier. A hint
   was added (dewlab had none).
6. **The rarest.** `rarest` is a `char` starting at `'?'`; the note's
   "would stop" is probe `p-rarest-from-question-mark`. The hint now
   suggests `'H'` as a start, in a question.
7. **By first letter.** `Dictionary<char, List<string>>`, with a sentence
   that reads the type aloud. The solution writes `new List<string>()` in
   full, because `groups[first] = new();` hides the type. The note ties
   `Add` on the inner list to reference types.
8. **Counting a vote.** `Dictionary<string, int>`, otherwise dewlab's.
9. **Two arrays into one dictionary** (title changed from "Two lists",
   id kept). The second tier, dewlab's `dict(zip(plain, code))`, is
   `plain.Zip(code).ToDictionary()`: no lambda, but `ToDictionary()` with
   no arguments needs .NET 8 or later (open question 6).
10. **Array, list or dictionary** (dewlab: "List or dictionary"). The
    answers gain C# types. dewlab's "each entry might be a small
    dictionary holding a name and a score" does not fit C#, whose
    dictionaries hold one type of value; it became "each entry holds two
    values, a name and a score".
11. **Letting things through.** Both worlds keep their tasks, as `static`
    methods with typed parameters, above the line that makes the
    dictionary. The `inputs` lose `guess: yes` and gain notes. "leave it
    alone" became "leave it as it is"; "Is that right?" became "Is that
    what you want?".
12. **From earlier: two names for one dictionary.** From the grids page
    (plain text, same batch; a link since the move). The cell prints `key.Count` (2) where dewlab
    printed the dictionary. The fold uses the grids page's words
    (*reference type*, *aliasing*) and `new(key)` for a copy (probe
    `p-separate-copy`).
13. **From earlier: counting from 1.** dewlab's `enumerate(..., 1)` has no
    C# twin. The problem became the lists page's `{index + 1}`, with the
    same answer, `3 Z`, and the same point: the printed number is not the
    index. The id is kept.
14. **From earlier: which error.** Now covers the three things that can
    happen when you press Run: (a) `FormatException`, (b)
    `IndexOutOfRangeException`, (c) runs and prints 125 (Python's
    `TypeError`), and a new (d) `"12" * 5`, CS0019. A new cell,
    `from-earlier-which-error-1`, lets the reader try each; it runs as it
    is (item (c)). Probes `p-which-error-a`, `p-which-error-a-double`,
    `p-which-error-b`, `p-which-error-d`. *(Since the move, the fold quotes
    no output that the cell does not print: (a) says `double.Parse` "can
    read it", and (d) says "It does not compile, so nothing runs", without
    the message.)*

### The glossary file

dewsharp has no glossary panel, so each of dewlab's entries is defined in
the prose where it first appears:

| dewlab entry | Here |
|---|---|
| dictionary | "Making a dictionary", first paragraph |
| key, value | the same paragraph, with *look up* |
| `in` | `ContainsKey`, in "Checking whether a key is there" |
| `.items()` | `KeyValuePair<TKey, TValue>`, `.Key`, `.Value`, in "Looping over a dictionary"; `.Keys` and `.Values` beside it |
| `.get()`, default | `GetValueOrDefault` and *default*, in "A default for a missing key"; `TryGetValue` beside it |

New terms, each defined where it first appears: the dictionary's type
with two type arguments, `Count` for pairs, *palette* (since the move),
C#'s default for a type (since the move), `out` (again), *hash table*
(in the reading list), and, on the practice page, *argument* (in the fold
of problem 2) and `Add`.

## What C# made different, in short

- A dictionary's type names the key's type and the value's type, and the
  compiler checks both: `key[0]` on `char` keys does not compile (CS1503).
- `Console.WriteLine` on a dictionary prints its type's name, so every
  cell that shows a dictionary prints its pairs in a loop, and the stubs
  that come before the loop section print `Count` or a single value.
- `char + char` is an `int`, so building a word from lookups needs
  `$"..."` or a string first (CS0029).
- A missing key is a `KeyNotFoundException`; a repeated key with `Add` is
  an `ArgumentException`; with `[key] =` it is a quiet replace.
- `.get()` splits into `GetValueOrDefault` and `TryGetValue`, and a
  `GetValueOrDefault` with no default gives the type's default, not
  Python's `None`.
- `foreach` over a dictionary gives `KeyValuePair` values, written in full
  in PDP.
- A `Dictionary` promises no order, where Python's `dict` keeps the order
  of insertion.
- `255 / 4` is 63, so the shades task divides by `4.0`.

## The native check and dictionaries *(resolved for this page)*

*When the page moved, the browser checker recorded every one of these rows
as the engine shows it (for example `{ ['Q'] = 'A', ['W'] = 'B', ['E'] =
'C', ['R'] = 'D', ['T'] = 'E' }` for `decodeKey`), and the page's "Compare
with a solution" table shows them the same way. The native check's
display in `drafts/tools/NativeCheck/Program.cs` still has the `Cast`
(line 325 on 28 September 2026), so other drafts with a dictionary in an
`inputs` row will show the same `InvalidCastException` natively; that tool
was not changed in this move. The porter's record follows.*

For an `inputs` row whose value is a non-empty dictionary, NativeCheck
prints `System.InvalidCastException` in place of the value, for the
reader's cell and for the solution. Its display (`ShowSource` in
`drafts/tools/NativeCheck/Program.cs`) writes
`Enumerable.Cast<DictionaryEntry>(d)`. That uses the dictionary's plain
`IEnumerable` enumerator, which gives `KeyValuePair` values, and the cast
to `DictionaryEntry` fails. The check does not count it as a problem,
because only a compile error in a value fails a solution. The engine is not
affected: `engine/Dewsharp.Browser/Shim.cs` writes
`foreach (DictionaryEntry kv in dict)`, which uses `IDictionary`'s own
enumerator, and shows `{ ['B'] = 1, ['A'] = 3, ['N'] = 2 }`
(`docs/ENGINE_API.md`: `{ ["Ada"] = 3 }` for a dictionary). An empty
dictionary shows as `{}` in both.

The rows affected are `decodeKey` (lesson, your-turn-3, secret messages),
`shades` (lesson, your-turn-2, pixel art), the first two rows of
`CountLetters` (lesson, your-turn-4), `groups`, `votes` and `key`
(practice 7, 8 and 9, both solutions of 9). The probes whose ids end in
`-inputs` record what the engine should show for each, with a `Display.Of`
that copies the engine's rules for strings, characters, dictionaries and
collections. I did not edit NativeCheck, because this run writes only in
this folder. The fix is one line: `foreach (DictionaryEntry e in d)` in
place of the `Cast`.

## Where each number and message in the prose comes from

Every number and quoted output on both pages is in
`looking-things-up-by-name.outputs.json` or
`looking-things-up-by-name-practice.outputs.json` (browser checker, 28
September 2026). Cells after the world variants are recorded once per
world, as `<id>@<world>`, with the same output in each.

| Number or message | Recorded by |
|---|---|
| `EQW` | `a-shared-key-1` |
| `red`, 3, the type name with `` `2 `` | `making-a-dictionary-1` |
| WTQR | solution of `your-turn-1--secret-messages` (`BEAD in code: WTQR`) |
| 165 | solution of `your-turn-1--pixel-art` |
| `dark red`; 4 (the predict) | `adding-and-changing-values-1` |
| 5 | `adding-and-changing-values-2` |
| KHOOR | solution of `your-turn-2--secret-messages` |
| six pairs; 0, 64, 128, 191, 255 and 255 | solution of `your-turn-2--pixel-art` (`6 pairs`, `level 1 is 64, level 3 is 191`, and its `shades` row) |
| the report for `'Z'`, at line 5 | `checking-whether-a-key-is-there-1` |
| `False` (the predict) | `checking-whether-a-key-is-there-2` |
| 4, then 0; 0 is the default of an `int` (also under `counting-things-2`) | `looking-up-with-a-default-3` |
| the loop meets the pairs in the order they were added | `looping-over-a-dictionary-1` |
| CADE | solution of `your-turn-3--secret-messages` |
| `palette[character]` would stop with a `KeyNotFoundException` | the same exception as `checking-whether-a-key-is-there-1`; probe `l-drawn-with-indexer`, run in the browser |
| the space has a count; both cells make the same counts | `counting-things-1`, `counting-things-2` |
| B 1, A 3 and N 2; an empty text gives no pairs | solution of `your-turn-4` (its output, and its `inputs` rows, the last `{}`) |
| H, nine times | solution of `your-turn-5--secret-messages` (`H 9`) |
| `r`, 14 times | solution of `your-turn-5--pixel-art` (`r 14`) |
| the challenge compiles, with no warning | `challenges` in the lesson's outputs file |
| practice 1: `W`, 3, `False`, `?`, then the `KeyNotFoundException` for `'D'` at line 9 | `five-lookups-1` |
| practice 2: 2, then 2, and no warning | `the-same-key-twice-1` |
| practice 2: 2, then the `ArgumentException` at line 4, and its message | `the-same-key-twice-2` |
| practice 3: CS1503 at (5,23) and its text | `the-first-pair-1` |
| practice 3: `shades[1]` compiles, and finds the key 1 | the lesson's solution of `your-turn-2--pixel-art` |
| practice 4: `E 3, T 1` | `two-changes-1` |
| practice 5: 24 | both solutions of `how-many-in-all-1` |
| practice 6: P | solution of `the-rarest-1` |
| practice 7: `O: OTTER, OWL`, `H: HEDGEHOG, HARE`, `B: BAT` | solution of `by-first-letter-1` |
| practice 8: red 3, blue 2 and green 1 | solution of `counting-a-vote-1` |
| practice 11: 255, 0 and 0 | solution of `letting-things-through-1--pixel-art`, its second `inputs` row |
| practice 12: 2 | `from-earlier-two-names-1` |
| practice 13: `3 Z` | `from-earlier-counting-from-1-1` |
| practice 14: 125 | `from-earlier-which-error-1` |

The rest are the tasks' own numbers (a shift of 3, colours from 0 to 255,
levels 0 to 4, the counts in practice 5 and 6, March's 31 days, the
indexes 0 to 2 of three elements), the exception names that the
exceptions and lists pages record (`FormatException`,
`IndexOutOfRangeException`, `ArgumentOutOfRangeException`), named here as
the exceptions page's own practice problem 1 names them, or facts that
are not program output: E, then T and A, are the commonest letters in
English; H is three letters after E; Arab scholars in the ninth century.

## Page behaviour, checked when it moved

The porter listed these under "Once the page UI exists". Each was looked
at in headless Chromium on the real server, at 390 pixels wide.

- **What the page shows for an exception** (course map, open question 9).
  For `checking-whether-a-key-is-there-1`, the state line says "Stopped
  with an exception on line 5 of Program.cs.", and the output shows
  `Unhandled exception. System.Collections.Generic.KeyNotFoundException:
  The given key 'Z' was not present in the dictionary.` with `at line 5 of
  Program.cs` under it, and a fold, *What .NET said, in full*. The lesson
  now quotes that report. Practice 1 and 2 say "stops at line 9" and "at
  line 4", the lines the state line names.
- **"Compare with a solution" with dictionaries.** On `your-turn-4` and
  `your-turn-3--secret-messages`, the table shows `{}` for the starter and
  `{ ['B'] = 1, ['A'] = 3, ['N'] = 2 }` or the five pairs of `decodeKey`
  for the solution, each row marked "different". The long row wraps inside
  its column at 390 pixels, and the page does not scroll sideways.
- **Stubs that print nothing.** The page says "Ran." and, in the empty
  output area, "It printed nothing." So `your-turn-3--pixel-art`,
  `your-turn-4` and practice 7, 8 and 9 show that the program ran.
  `your-turn-1--secret-messages` now prints a line of its own (see
  "Starters that warned"). The two starters of practice 11 print one empty
  line, and the page says "Ran.", as on the lists page.
- **The comment-only cell** (`dictionary-or-list-1`) is labelled EMPTY,
  with the title "An empty cell. Write some C# in it.", and the checker
  records it as `empty`. The playbook's pitfalls say this is fine ("A cell
  with only a comment is `empty`"). The reader's answers are comments, so
  the cell stays `empty` when it is done.
- **A key that is a space.** The counting cells print `' ' 4`, and the
  quotes show the space. It was not tried with a screen reader (see
  "Open").
- **The type name** printed by `making-a-dictionary-1` wraps once, at the
  backtick, at 390 pixels, and reads well.

## The porter's questions, and what was decided

1. **Two initializer forms.** *Decided by the course map:* its entry writes
   the dictionary as `new() { ['A'] = 'Q', ... }`, and its practice entry
   puts `Add` beside `[key] =` in "The same key twice". So the page writes
   one form everywhere, and practice 2 names `Add`'s form once. Since the
   move, that fold asks the reader to try a repeated key in `Add`'s form,
   and the reading list says that Microsoft's example adds pairs with
   `Add`.
2. **`KeyValuePair<char, int>` in full, or deconstruction?** *Decided by
   the course map:* "PDP writes every type (the style guide), so the page
   writes that type in full, or loops over `.Keys`". The long form stays;
   deconstruction is not taught here.
3. **No order.** *Decided by the playbook's first step* ("Change what C#
   changes") *and accuracy:* dewlab's sentence "A dictionary keeps its
   pairs in the order they were added" is not true of C#'s `Dictionary`,
   whose reference page (on the reading list) says "The order in which
   the items are returned is undefined". The paragraph stays, and practice
   6 keeps "the first one the loop meets".
4. **CS1061 for an array without `new int[]`.** *Decided by the course
   map:* its practice entry changes one problem and says "the rest stay",
   so no problem is added. The lesson's sentence now links to the grids
   page, where the same rule and its CS0623 are shown.
5. **`GetValueOrDefault` with no default.** *Decided by decision 29* ("A
   number the prose needs is printed by a cell"): a new cell,
   `looking-up-with-a-default-3`, prints the default for an `int`, which
   `counting-things-2` relies on. The default for a `char` stays unshown:
   it prints as nothing visible, and no cell needs it.
6. **Methods that need .NET 8.** *Decided by `docs/LESSON_FORMAT.md`*
   ("C# 14 on .NET 10", for the page and the exported project) *and
   decision 38*, as the lists page's question 3 was: every cell and every
   downloaded project has `ToDictionary()` with no arguments. The second
   solution of practice 9 stays. Which Visual Studio the college has is
   the course map's open question 11. The solution's title is under
   "Open".
7. **The reading list.** *Decided as far as the playbook goes:* its
   checklist asks for "C# sources that exist, such as Microsoft Learn".
   The reference page exists (HTTP 200, 28 September 2026), and its note
   now says what its example uses. Whether a gentler page would serve a
   Level 5 reader better is under "Open".
8. **The challenge.** *Decided by the playbook's checklist* (the same
   challenge as the dewlab page) *and decision 40* (a challenge is compiled,
   not run): the message stays, with its tie between V and H, and the
   prose now asks whether one letter has the biggest count or two share
   it, instead of saying so, since no recorded output shows the counts.
9. **`look up`.** *Decided by the course map's title and the style guide
   together:* the title, "Dictionaries: looking things up by key", uses the
   phrase, so the page defines *look up* once, in one plain sentence, as
   the term the title uses. Everywhere else the prose now says *find*, and
   the heading "Looking up with a default" became "A default for a missing
   key". The noun *lookup* stays.

### Open

For Josh. None of the playbook, the course map, the style guide or the
exemplars answers these.

- **"a shorter way C# has"** on the second solutions of practice 5
  (`Values.Sum()`) and practice 9 (`Zip(...).ToDictionary()`). No page in
  the course map is known to teach either, so the exemplars' "a shorter
  way you'll meet later" would promise something the course doesn't give.
  The practice pages of the lists, grids and decisions pages use the same
  title, and the lists page left the same question open. One title for "a C# method the course
  doesn't teach" would settle all of them.
- **A gentler reading.** Microsoft's reference page is written for
  experienced programmers. The porter's other candidate, *How to
  initialize a dictionary with a collection initializer*, matches practice
  2 but uses `var` and a class with `Main`. Is there a beginner's page on
  Microsoft Learn for `Dictionary` that the course prefers?
- **The video's year.** *Hash Tables, Associative Arrays, and Dictionaries
  (Data Structures and Optimization)* (SimonDev) is confirmed by title and
  channel. The year, 2021, is dewlab's, and its length could not be
  checked from here, so "About twelve minutes" went.
- **A predict whose options are all lines of the output.**
  `checking-whether-a-key-is-there-2` asks "What will the last line
  print?", with `True` and `False`, and the cell prints `True`, `False`,
  `False`. Decision 37 counts a choice as the same when it equals any line
  of the output, so both options count as the same, and the page never
  asks "Which line explains what you saw?" for this predict. The page
  shows the guess and the output side by side either way, so a reader
  still sees the difference. `making-decisions-practice` problem 1 has the
  same shape. A change would be to decision 37 (compare with the last line
  when the question says so), not to this page.
- **A key that is a space, read aloud.** The counting cells print `' ' 4`.
  How a screen reader reads a quoted space was not tried.
- **The id `looking-up-with-a-default-3`** sits above `-2` on the page, so
  that no existing id changed. Renaming the two now costs nothing, since no
  class has used the page; after that, it would lose saved work. Leave it,
  or put them in page order now?

## Probes

Each cell below checked a claim in the draft's prose that no page cell
printed. None of them is part of either page, and the cells with `expect:`
fail on purpose. When the lesson moved, all 31 were run in the browser, in
a scratch lesson made from this section (`node tools/check-lessons.mjs
--lessons <scratch>/lessons --write`), and each gave the same output,
diagnostics and exception as the native check did (the lines are one more
than a page cell's, because each probe starts with a comment line). The
claims that stayed in the prose are now printed by a page cell, or no
longer quote output (see "What was done when it moved"), so these cells
are a record, not a source of numbers.

The first cell is a types cell. `Display.Of` writes a value the way the
engine's "Compare with a solution" table does (`engine/Dewsharp.Browser/Shim.cs`),
so that the probes marked "inputs" record what the page will show for each
`inputs` row that holds a dictionary. The native check cannot show those
rows itself (see "The native check and dictionaries" above).

```csharp exec
id: display
file: Display.cs
static class Display
{
    public static string Of(object value)
    {
        switch (value)
        {
            case null:
                return "null";
            case string text:
                return $"\"{text}\"";
            case char character:
                return $"'{character}'";
            case System.Collections.IDictionary dictionary:
                List<string> pairs = new();
                foreach (System.Collections.DictionaryEntry entry in dictionary)
                {
                    pairs.Add($"[{Of(entry.Key)}] = {Of(entry.Value)}");
                }
                return pairs.Count == 0 ? "{}" : "{ " + string.Join(", ", pairs) + " }";
            case System.Collections.IEnumerable items:
                List<string> parts = new();
                foreach (object item in items)
                {
                    parts.Add(Of(item));
                }
                return "[" + string.Join(", ", parts) + "]";
            default:
                return value.ToString();
        }
    }
}
```

```csharp exec
id: l-char-plus-char
expect: CS0029
// Lesson, your-turn-1 (secret messages), second hint: two char values joined with + give an int.
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
string coded = key['B'] + key['E'] + key['A'] + key['D'];
Console.WriteLine(coded);
```

```csharp exec
id: l-char-plus-char-value
// Lesson, your-turn-1 (secret messages), second hint: the number that + makes, and 'A' + 3.
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
int sum = key['B'] + key['E'] + key['A'] + key['D'];
Console.WriteLine(sum);
Console.WriteLine('A' + 3);
```

```csharp exec
id: l-array-without-new
expect: CS1061
// Lesson, your-turn-1 (pixel art): inside a dictionary's brackets, an array needs new int[].
Dictionary<char, int[]> palette = new()
{
    ['#'] = { 0, 0, 0 }
};
Console.WriteLine(palette.Count);
```

```csharp exec
id: l-plus-equals
// Lesson, adding-and-changing-values-2: += 1 and ++ each do the same as counts['E'] + 1.
Dictionary<char, int> first = new() { ['E'] = 4, ['T'] = 2 };
first['E'] += 1;
Dictionary<char, int> second = new() { ['E'] = 4, ['T'] = 2 };
second['E']++;
Console.WriteLine($"{first['E']} {second['E']}");
```

```csharp exec
id: l-initializer-replaces
// Lesson, adding and changing: a key written twice between the curly brackets replaces, like palette['r'] = ...
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['r'] = "red", ['r'] = "dark red"
};
Console.WriteLine(palette['r']);
Console.WriteLine(palette.Count);
```

```csharp exec
id: l-shades-inputs
// Lesson, your-turn-2 (pixel art): the solution's six pairs (inputs), and 63 and 127 without 4.0.
Dictionary<int, int> shades = new();
for (int level = 0; level < 5; level++)
{
    shades[level] = (int)Math.Round(level * 255 / 4.0);
}
shades[5] = 255;
Console.WriteLine(Display.Of(shades));
for (int level = 0; level < 5; level++)
{
    Console.Write($"{level * 255 / 4} ");
}
Console.WriteLine();
```

```csharp exec
id: l-contains-value
// Lesson, checking-whether-a-key-is-there-2: ContainsValue('Q') is True.
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key.ContainsValue('Q'));
```

```csharp exec
id: l-default-of-type
// Lesson, looking up with a default: with no default, 0 for an int and null for a string, which prints an empty line.
Dictionary<string, int> goals = new() { ["Ada"] = 3 };
Dictionary<char, string> palette = new() { ['r'] = "red" };
Console.WriteLine(goals.GetValueOrDefault("Grace"));
Console.WriteLine(palette.GetValueOrDefault('x') == null);
Console.WriteLine(palette.GetValueOrDefault('x'));
Console.WriteLine("(the line above is empty)");
```

```csharp exec
id: l-try-get-value-z
// Lesson, looking-up-with-a-default-2: with 'Z' in place of 'B'.
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
char letter = 'Z';
if (key.TryGetValue(letter, out char code))
{
    Console.WriteLine($"{letter} codes to {code}");
}
else
{
    Console.WriteLine($"{letter} is not in the key");
}
```

```csharp exec
id: l-order-after-remove
// Lesson, looping: the order is not promised. After Remove, a new pair takes the place of the old one.
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
palette.Remove('.');
palette['g'] = "green";
foreach (KeyValuePair<char, string> pair in palette)
{
    Console.WriteLine($"{pair.Key} is {pair.Value}");
}
```

```csharp exec
id: l-decode-key-inputs
// Lesson, your-turn-3 (secret messages): the solution's decodeKey (inputs).
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E', ['D'] = 'R', ['E'] = 'T'
};
Dictionary<char, char> decodeKey = new();
foreach (KeyValuePair<char, char> pair in key)
{
    decodeKey[pair.Value] = pair.Key;
}
Console.WriteLine(Display.Of(decodeKey));
```

```csharp exec
id: l-drawn-with-indexer
expect: exception
// Lesson, your-turn-3 (pixel art): with palette[character], the program stops halfway through the picture.
Dictionary<char, string> palette = new()
{
    ['#'] = "black", ['.'] = "white", ['r'] = "red"
};
string[] picture = { "#r#", ".x." };
foreach (string row in picture)
{
    List<string> names = new();
    foreach (char character in row)
    {
        names.Add(palette[character]);
    }
    Console.WriteLine(string.Join(" ", names));
}
```

```csharp exec
id: l-count-letters-inputs
// Lesson, your-turn-4: the solution's value for each input (inputs).
static Dictionary<char, int> CountLetters(string text)
{
    Dictionary<char, int> counts = new();
    foreach (char character in text)
    {
        if (char.IsUpper(character))
        {
            counts[character] = counts.GetValueOrDefault(character, 0) + 1;
        }
    }
    return counts;
}

Console.WriteLine(Display.Of(CountLetters("BANANA")));
Console.WriteLine(Display.Of(CountLetters("MEET ME")));
Console.WriteLine(Display.Of(CountLetters("")));
```

```csharp exec
id: l-decode-with-3
// Lesson, your-turn-5 (secret messages): H is a coded E, and a shift of 3 decodes the message.
string message = "WKH HQHPB LV PHHWLQJ DW WKH EULGJH DW WKUHH";
string plain = "";
foreach (char character in message)
{
    if (char.IsUpper(character))
    {
        plain += (char)((character - 'A' - 3 + 26) % 26 + 'A');
    }
    else
    {
        plain += character;
    }
}
Console.WriteLine('H' - 'E');
Console.WriteLine(plain);
```

```csharp exec
id: l-picture-total
// Lesson, your-turn-5 (pixel art): 24 characters in all, and the count of each.
string[] picture =
{
    "..rr..",
    ".rrrr.",
    "rr##rr",
    ".rrrr."
};
Dictionary<char, int> counts = new();
int total = 0;
foreach (string row in picture)
{
    foreach (char character in row)
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
        total++;
    }
}
Console.WriteLine(total);
Console.WriteLine(Display.Of(counts));
```

```csharp exec
id: l-array-past-end
expect: exception
// Lesson, dictionary or list: an array read past its end.
int[] row = { 10, 20, 30 };
Console.WriteLine(row[3]);
```

```csharp exec
id: l-list-past-end
expect: exception
// Lesson, dictionary or list: a list read past its end.
List<int> row = new() { 10, 20, 30 };
Console.WriteLine(row[3]);
```

```csharp exec
id: l-challenge-starter
// Lesson, challenge: the starter as it is. V and H share the biggest count, 4.
// Crack this Caesar shift: count, guess E, find the shift, decode.
string message = "WKLV LV D PHVVDJH IURP WKH IURQW OLQH";
Dictionary<char, int> counts = new();
foreach (char character in message)
{
    if (char.IsUpper(character))
    {
        counts[character] = counts.GetValueOrDefault(character, 0) + 1;
    }
}
foreach (KeyValuePair<char, int> pair in counts)
{
    Console.WriteLine($"{pair.Key} {pair.Value}");
}
```

```csharp exec
id: l-challenge-answer
// Lesson, challenge: each guess for V and H, as E, T and A. Only H as E gives English.
string message = "WKLV LV D PHVVDJH IURP WKH IURQW OLQH";
foreach (char guess in "ETA")
{
    foreach (char common in "VH")
    {
        int shift = ((common - guess) % 26 + 26) % 26;
        string plain = "";
        foreach (char character in message)
        {
            if (char.IsUpper(character))
            {
                plain += (char)(((character - 'A' - shift) % 26 + 26) % 26 + 'A');
            }
            else
            {
                plain += character;
            }
        }
        Console.WriteLine($"{common} as {guess}, shift {shift}: {plain}");
    }
}
```

```csharp exec
id: p-five-lookups
// Practice 1: (b), (c) and (d).
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key.Count);
Console.WriteLine(key.ContainsKey('W'));
Console.WriteLine(key.GetValueOrDefault('D', '?'));
```

```csharp exec
id: p-five-lookups-e
expect: exception
// Practice 1 (e): key['D'] stops with a KeyNotFoundException.
Dictionary<char, char> key = new()
{
    ['A'] = 'Q', ['B'] = 'W', ['C'] = 'E'
};
Console.WriteLine(key['D']);
```

```csharp exec
id: p-add-shape
expect: exception
// Practice 2, fold: with Add's shape, a repeated key stops the program.
Dictionary<char, int> counts = new() { { 'E', 1 }, { 'T', 4 }, { 'E', 2 } };
Console.WriteLine(counts['E']);
```

```csharp exec
id: p-int-keys
// Practice 3, fold: with int keys, shades[0] compiles, and finds the pair whose key is 0 wherever it is.
Dictionary<int, int> shades = new() { [5] = 255, [0] = 0 };
Console.WriteLine(shades[0]);
Console.WriteLine(shades[5]);
```

```csharp exec
id: p-two-changes-indexer
expect: exception
// Practice 4, fold: counts['T'] + 1 would have stopped the program.
Dictionary<char, int> counts = new() { ['E'] = 2 };
counts['T'] = counts['T'] + 1;
Console.WriteLine(counts['T']);
```

```csharp exec
id: p-rarest-from-question-mark
expect: exception
// Practice 6, solution note: starting from '?' stops the first time the loop runs its body.
Dictionary<char, int> counts = new()
{
    ['H'] = 9, ['W'] = 6, ['K'] = 3, ['D'] = 2, ['P'] = 1, ['B'] = 1
};
char rarest = '?';
foreach (KeyValuePair<char, int> pair in counts)
{
    if (pair.Value < counts[rarest])
    {
        rarest = pair.Key;
    }
}
Console.WriteLine(rarest);
```

```csharp exec
id: p-groups-votes-key-inputs
// Practice 7, 8 and 9: the solutions' dictionaries, as the comparison table shows them (inputs).
string[] words = { "OTTER", "OWL", "HEDGEHOG", "BAT", "HARE" };
Dictionary<char, List<string>> groups = new();
foreach (string word in words)
{
    char first = word[0];
    if (!groups.ContainsKey(first))
    {
        groups[first] = new List<string>();
    }
    groups[first].Add(word);
}
Console.WriteLine(Display.Of(groups));

string[] ballots = { "red", "blue", "red", "green", "red", "blue" };
Dictionary<string, int> votes = new();
foreach (string colour in ballots)
{
    votes[colour] = votes.GetValueOrDefault(colour, 0) + 1;
}
Console.WriteLine(Display.Of(votes));

char[] plain = { 'A', 'B', 'C', 'D' };
char[] code = { 'X', 'M', 'Q', 'L' };
Console.WriteLine(Display.Of(plain.Zip(code).ToDictionary()));
```

```csharp exec
id: p-separate-copy
// Practice 12, fold: new(key) makes a separate dictionary with the same pairs.
Dictionary<char, char> key = new() { ['A'] = 'Q' };
Dictionary<char, char> spare = new(key);
spare['B'] = 'W';
Console.WriteLine($"{key.Count} {spare.Count}");
```

```csharp exec
id: p-which-error-a
expect: exception
// Practice 14 (a): int.Parse("12.5") stops with a FormatException.
Console.WriteLine(int.Parse("12.5"));
```

```csharp exec
id: p-which-error-a-double
// Practice 14 (a): double.Parse("12.5") gives 12.5 on the page's Irish settings.
Console.WriteLine(double.Parse("12.5"));
```

```csharp exec
id: p-which-error-b
expect: exception
// Practice 14 (b): numbers[3] stops with an IndexOutOfRangeException.
int[] numbers = { 1, 2, 3 };
Console.WriteLine(numbers[3]);
```

```csharp exec
id: p-which-error-d
expect: CS0019
// Practice 14 (d): "12" * 5 does not compile.
Console.WriteLine("12" * 5);
```
