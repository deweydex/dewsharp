# looking-things-up-by-name: notes for a reviewer

Ported from dewlab `tutorials/looking-things-up-by-name/` (version
2026.09.26.1): the lesson, its practice page and its glossary file. The
brief is the course map's entry (`planning/COURSE_MAP.md`, PDP row 18):
action *adapt*, shape *tutorial*, size L, batch 4, depends on
`lists-and-sequences`. There was no partial draft in this folder, so both
pages were written from the start in this run.

Files:

- `looking-things-up-by-name.md`: the lesson. 22 exec cells, 8 of them in
  world variants (18 tasks when a pair of variants counts once); 3
  predicts, 11 hints, 9 solutions, 9 `inputs` blocks, 1 challenge, 1 fold.
  One cell is meant to fail: `checking-whether-a-key-is-there-1`
  (`expect: exception`).
- `looking-things-up-by-name-practice.md`: the practice page, 14 problems.
  15 exec cells, 2 of them in world variants; 3 predicts, 6 hints, 9
  solutions, 7 `inputs` blocks, 8 folds. Two cells are meant to fail:
  `the-same-key-twice-2` (`expect: exception`) and `the-first-pair-1`
  (`expect: CS1503`).
- `looking-things-up-by-name.native.json`,
  `looking-things-up-by-name-practice.native.json`: what the native check
  recorded for every cell, solution and `inputs` row.
- `NOTES.native.json`: what it recorded for the probes at the end of this
  file.
- `NOTES.md`: this file.

Every cell of both pages, every solution and every `inputs` row was run
with NativeCheck, in both worlds, and the last line was "No problems." for
each page and for the probes. Both pages also parse with no errors in the
real parser (`web/lesson/parse.js`, run with Node). The native check shows
`System.InvalidCastException` for seven `inputs` rows that hold a dictionary.
That is a fault in the native check's display, not in the pages: see "The
native check and dictionaries" below.

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

## What changed, and why

### What the reader already knows

PDP's order before this page: "First programs" (13 pages), then
`writing-your-own-functions`, `lists-and-sequences`,
`grids-and-references` and `two-names-one-list`. From the drafts, the
reader has met: typed variables and `char` arithmetic (`'A' + 3` is an
`int`), `$"..."`, `if`, `char.IsUpper`, `for` and `foreach`, `+=` and `++`,
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

### Links: back only, as the batch rule says

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
hard to read (see open question 4).

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
casts `lists-and-sequences` uses. The stub shows CS0219 for `shift`, and
the prose says so, as on the lists page. `inputs` are `key.Count` and
`coded`. Pixel art: `Dictionary<int, int>`. dewlab's "each 255 / 4 more
than the last" became "each a quarter of 255 more", because `255 / 4` is
63 in C#. The first hint gives `(int)Math.Round(level * 255 / 4.0)`
(`Math.Round` was met on `storing-and-computing-practice`); a second hint
(`after: 2 runs`) is for `level * 255 / 4`, which gives 63 and 127 (probe
`l-shades-inputs`). The stub cannot print the dictionary, and a loop over
its pairs comes later on the page, so it prints `Count` and invites the
reader to print a pair. dewlab's note that a key cannot be a list is not
true of C# (any type can be a key), so it became a note that `shades[1]`
is a key, not an index.

**Checking whether a key is there.** `KeyError` becomes
`KeyNotFoundException`, `expect: exception`, with its message quoted.
dewlab's "Read the last line" became a question about the first line of
the report, because .NET names the exception first
(`reading-an-error-message`). `in` becomes `ContainsKey`; the predict
keeps its two options, now `True` and `False` as C# prints them. One
sentence adds `ContainsValue` (probe `l-contains-value`), because a reader
who asks "and the values?" has an answer.

**Looking up with a default.** `.get()` has two C# answers, as the course
map says. `looking-up-with-a-default-1` is `GetValueOrDefault` with `'?'`.
dewlab's third line, `.get("Z")` giving `None`, has no clean C# twin: for a
`char` the default is the character with code 0, which prints as nothing
visible. So the cell keeps two lines, and the prose says what the default
is for an `int` (0) and a `string` (`null`, an empty line; probe
`l-default-of-type`). `looking-up-with-a-default-2` is new: `TryGetValue`
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

**Your turn 3.** Secret messages: `decodeKey`, CADE, as dewlab; the stub's
CS0219 (for `message`) is named. Pixel art: dewlab's `drawn` was a list of
lists of names, printed as nested Python lists. In C# that would be a
`List<List<string>>` and a nested print. The task is the same, but each
row becomes one string of names joined with spaces, so `drawn` is a
`List<string>`, and `inputs` shows `["black red black", "white ? white"]`.
The id is kept, because the task is the same. The solution note's "stop
halfway through" is probe `l-drawn-with-indexer`.

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

**Your turn 5.** Both worlds keep their tasks. `most` is a `char` starting
at `'?'`, which is not a key, so `GetValueOrDefault(most, 0)` gives 0, as
dewlab's `counts.get("", 0)` did. The secret-messages hint no longer says
"the way you kept the brightest pixel": that task was in the other world
on the lists page. The picture is a `string[]`.

**Dictionary or list?** The table gains the C# names: its type names one
type or two, and a missing item gives three different exceptions (probes
`l-array-past-end`, `l-list-past-end`). The question becomes "an array, a
list or a dictionary?", and the fold gives each answer's C# type: the
rainfall is a `double[]` of 31, since March's length never changes. The
comment cell stays (course map); the native check calls it `empty` (see
"Once the page UI exists").

**Looking back.** dewlab's question stays, with "array" for "list" and
"key" for "name". The challenge keeps its message and starter, in C#.
The native check found something dewlab's prose did not say: V and H
share the biggest count (4 each), and V comes first. Guessing V as E,
then T, then A gives nonsense three times; only H as E decodes it (probe
`l-challenge-answer`: THIS IS A MESSAGE FROM THE FRONT LINE). So the
prose now says that two letters share the biggest count, and invites the
reader to try the other letter. It also points to the dividing page for a
shift that goes back past A. The next page, `a-program-of-your-own`, is
plain text (batch 5).

**Where to read more.** The Python tutorial goes. Microsoft's reference
page, *Dictionary<TKey,TValue> Class*, replaces it. I fetched it on 27
September 2026: its example uses explicit types (no `var`) and every
method on this page, plus `Remove`, and its Remarks say "The order in
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
not checked. A sentence says that a C# `Dictionary` is a hash table, which
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
2. **The same key twice.** As the course map asks: the first cell repeats
   a key in the initializer and prints 2, then 2, quietly; a new second
   cell (`the-same-key-twice-2`, `expect: exception`) shows `Add` stopping
   with an `ArgumentException`. The predict has four options, adding "It
   stops with an exception". The fold defines *argument* in passing (the
   message has the word in its type name), says `[key] =` adds or
   replaces while `Add` only adds, and names the `{ { 'E', 1 } }` form,
   which calls `Add` (probe `p-add-shape`), because learners meet it in
   books and on Microsoft's pages.
3. **The first pair.** `key[0]` does not compile in C#: CS1503, `int` to
   `char`, at (5,23). The cell has `expect: CS1503` and the prose says it
   is meant to fail. The predict's options are the three things that can
   happen when you press Run. The fold adds that with `int` keys,
   `shades[0]` compiles and finds the key 0 (probe `p-int-keys`).
4. **Two changes.** Prints `E 3, T 1` as one line. The predict became a
   question in the prose (see "Predicts"). The fold's
   `counts['T'] + 1` is probe `p-two-changes-indexer`.
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
    (plain text, same batch). The cell prints `key.Count` (2) where dewlab
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
    `p-which-error-b`, `p-which-error-d`.

### The glossary file

dewsharp has no glossary panel, so each of dewlab's entries is defined in
the prose where it first appears:

| dewlab entry | Here |
|---|---|
| dictionary | "Making a dictionary", first paragraph |
| key, value | the same paragraph, with *look up* |
| `in` | `ContainsKey`, in "Checking whether a key is there" |
| `.items()` | `KeyValuePair<TKey, TValue>`, `.Key`, `.Value`, in "Looping over a dictionary"; `.Keys` and `.Values` beside it |
| `.get()`, default | `GetValueOrDefault` and *default*, in "Looking up with a default"; `TryGetValue` beside it |

New terms, each defined where it first appears: the dictionary's type
with two type arguments, `Count` for pairs, `out` (again), *hash table*
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

## The native check and dictionaries

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

## Where each number in the prose comes from

Recorded outputs are in the `.native.json` files. On the page, a compiler
message starts with `Program.cs`; the native check labels it with the cell
id. Line and column match.

| Number or claim | Source |
|---|---|
| `EQW` | lesson cell `a-shared-key-1` |
| `red`, 3, the type name with `` `2 `` | lesson cell `making-a-dictionary-1` |
| WTQR | solution of `your-turn-1--secret-messages` |
| CS0029, *Cannot implicitly convert type 'int' to 'string'*; `'A' + 3` is a number | probes `l-char-plus-char`, `l-char-plus-char-value` |
| 165 | solution of `your-turn-1--pixel-art` |
| without `new int[]` it does not compile | probe `l-array-without-new` |
| `dark red`, 4 | lesson cell `adding-and-changing-values-1` |
| a repeated key in the initializer replaces | probe `l-initializer-replaces` |
| 4, then 5; `+= 1` and `++` give the same | lesson cell `adding-and-changing-values-2`; probe `l-plus-equals` |
| CS0219 on the stubs that say so | lesson cells `your-turn-2--secret-messages`, `your-turn-3--secret-messages` |
| KHOOR; 26 pairs | solution of `your-turn-2--secret-messages` |
| six pairs, 0, 64, 128, 191, 255, 255; 63 and 127 without `4.0` | solution of `your-turn-2--pixel-art`; probe `l-shades-inputs` |
| `KeyNotFoundException` and its message for `'Z'` | lesson cell `checking-whether-a-key-is-there-1` |
| `True`, `False`, `False` | lesson cell `checking-whether-a-key-is-there-2` |
| `ContainsValue('Q')` is `True` | probe `l-contains-value` |
| `Z is not in the key` | lesson cell `checking-whether-a-key-is-there-3` |
| `Q`, `?` | lesson cell `looking-up-with-a-default-1` |
| 0 for an `int`, `null` for a `string`, an empty line | probe `l-default-of-type` |
| `B codes to W`; with `'Z'`, `Z is not in the key` | lesson cell `looking-up-with-a-default-2`; probe `l-try-get-value-z` |
| the loop meets the pairs in the order they were added; no order is promised | lesson cell `looping-over-a-dictionary-1`; probe `l-order-after-remove`; Microsoft's reference page |
| CADE | solution of `your-turn-3--secret-messages`; probe `l-decode-key-inputs` |
| `black red black`, `white ? white`; `palette[character]` stops at the second row | solution of `your-turn-3--pixel-art`; probe `l-drawn-with-indexer` |
| the space has a count; both cells make the same counts | lesson cells `counting-things-1`, `counting-things-2` |
| B 1, A 3, N 2; an empty text gives no pairs | solution of `your-turn-4`; probe `l-count-letters-inputs` |
| H, nine times; shift 3; it reads as English | solution of `your-turn-5--secret-messages`; probe `l-decode-with-3` |
| `r`, 14 times out of 24 | solution of `your-turn-5--pixel-art`; probe `l-picture-total` |
| the three exceptions in the table | probes `l-array-past-end`, `l-list-past-end`; lesson cell `checking-whether-a-key-is-there-1` |
| two letters share the biggest count; which guesses work | probes `l-challenge-starter`, `l-challenge-answer` |
| practice 1: W; 3, `False`, `?`; the exception for `'D'` | practice cell `five-lookups-1`; probes `p-five-lookups`, `p-five-lookups-e` |
| practice 2: 2, then 2; 2, then the exception at line 4, and its message; `Add`'s shape stops too | practice cells `the-same-key-twice-1`, `the-same-key-twice-2`; probe `p-add-shape` |
| practice 3: CS1503 at (5,23) and its text; `shades[0]` with `int` keys | practice cell `the-first-pair-1`; probe `p-int-keys` |
| practice 4: `E 3, T 1`; `counts['T'] + 1` stops | practice cell `two-changes-1`; probe `p-two-changes-indexer` |
| practice 5: 24 | both solutions of `how-many-in-all-1` |
| practice 6: P; starting from `'?'` stops | solution of `the-rarest-1`; probe `p-rarest-from-question-mark` |
| practice 7, 8, 9: the groups, the votes, the key | solutions; probe `p-groups-votes-key-inputs` |
| practice 11: BEAD, BEAD BEAD, empty; 255 128 32, 255 0 0, empty | solutions of `letting-things-through-1--*` |
| practice 12: 2; `new(key)` is a separate copy | practice cell `from-earlier-two-names-1`; probe `p-separate-copy` |
| practice 13: `3 Z` | practice cell `from-earlier-counting-from-1-1` |
| practice 14: 125; `FormatException`; 12.5; `IndexOutOfRangeException`; CS0019 and its text | practice cell `from-earlier-which-error-1`; probes `p-which-error-a`, `p-which-error-a-double`, `p-which-error-b`, `p-which-error-d` |
| E, then T and A, are the commonest letters in English; Arab scholars in the ninth century; March has 31 days | carried over from dewlab, or general knowledge; not program output |

## Once the page UI exists

- **What the page shows for an exception** (course map, open question 9).
  `checking-whether-a-key-is-there-1` asks what the first line of the
  report says, and practice 2 says the program stops "at line 4". Check
  both against what the page shows.
- **"Compare with a solution" with dictionaries.** Eight `inputs` rows
  hold a dictionary, seven of them with pairs in it (see "The native
  check and dictionaries"). The engine's format is `{ ['B'] = 1 }`. Check
  that a table of these is readable, and that a long one (`decodeKey`,
  five pairs; `shades`, six) fits the column.
- **Stubs that print nothing.** `your-turn-3--pixel-art`, `your-turn-4`,
  and practice 7, 8 and 9 print nothing until the reader's code adds a
  pair. `your-turn-1--secret-messages` and the secret-messages stub of
  practice 11 print an empty line. Check that the page makes clear the
  program ran.
- **The comment-only cell** (`dictionary-or-list-1`) has kind `empty` in
  the native check. The format defines a program cell and a types cell,
  and nothing else. The same question is open on other drafts
  (`the-moves-you-already-know` NOTES, open question 3).
- **A key that is a space.** The counting cells print `' ' 4`. Check that
  a screen reader reads the quoted space in a useful way.
- **The type name** printed by `making-a-dictionary-1` is long, 66
  characters. Check that it wraps well in the output area on a phone.

## Open questions for a reviewer

1. **Two initializer forms.** The page writes `['A'] = 'Q'` everywhere, as
   the course map does, and shows `{ { 'E', 1 } }` once, in practice 2's
   fold. Many books and Microsoft's pages use the second form. Should the
   lesson show it too, or is one form enough?
2. **`KeyValuePair<char, int>` in full, or deconstruction?** PDP writes
   every type, and the course map says to write the type in full or loop
   over `.Keys`. C# also allows `foreach ((char letter, int count) in
   counts)`, which writes every type and reads like the pair it is. The
   reader has met a tuple on `writing-your-own-functions-practice` and
   `storing-and-computing-practice`. It would make every loop on this
   page shorter. Keep the long form, or teach both?
3. **No order.** The page says a dictionary promises no order, and the
   native check shows insertion order in every cell here. Some
   "keeps the first one it finds" answers (practice 6) depend on the order
   the loop meets the pairs. They are worded as "the first one the loop
   meets", which stays true. Is the paragraph needed at PDP level, or is
   it enough to say it on the practice page?
4. **CS1061 for an array without `new int[]`.** The grids page names
   CS0623 for a row without `new int[]` inside an array. Inside a
   dictionary, the same slip gives three CS1061 messages about `Add`
   (probe `l-array-without-new`), which are hard to read. The page says
   only that each array needs its own `new int[]`. Worth a practice
   problem, or leave it?
5. **`GetValueOrDefault` with no default.** The lesson names the defaults
   for `int` and `string` and never shows the one for `char` (the
   character with code 0, which prints as nothing visible). Enough?
6. **Methods that need .NET 8.** `GetValueOrDefault` on a `Dictionary`
   works from .NET Core 2.0; `ToDictionary()` with no arguments (practice
   9, second tier) needs .NET 8. The page and the exported project are
   .NET 10. A learner with an older Visual Studio project would see that
   one solution fail to compile. Keep it, or drop the second tier?
7. **The reading list.** The Microsoft reference page is dense for Level
   5. The how-to page on initializers matches practice 2 exactly, but is
   written with `var` and classes. Would a Microsoft Learn training module
   serve better, if one covers `Dictionary` for beginners?
8. **The challenge.** The tie between V and H is kept and named, because
   finding that the first guess fails is the point of frequency analysis.
   Another message with one clear winner would make the challenge
   smoother, if that is preferred.
9. **`look up`.** The style guide asks for no phrasal verbs, and the page
   is about looking things up. The page defines *look up* as a term and
   uses it, with *lookup* as its noun. Acceptable, or should the page say
   *find a value by its key* everywhere, as the course map's title does
   not?


## Probes

Each cell below checks a claim in the prose that no page cell prints. Run
them with the same NativeCheck command, passing `NOTES.md` as the file. The
cells with `expect:` fail on purpose. None of them is part of either page.

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
