# two-names-one-object: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry
(FOOP lesson 18: "new", shape "closer look", covers FOOP-LO1 and
FOOP-LO8, worlds none, size S, batch 8, depends on
`objects-inside-objects` and `two-names-one-list`). It draws on dewlab's
`two-names-one-list` (two ideas that cannot both be true, the experiment
with a value that is copied and a value that is shared, why the other
idea is easy to believe, where else it happens, the shared document) and
on dewlab's `objects-inside-objects-practice` problem 1, "One crew member,
two submarines", whose C# version is problem 1 of
`objects-inside-objects-practice` here, "One crew member, two rovers".
`from:` names `two-names-one-list`, the page whose shape and questions
this one follows. There is no practice page: a closer look has none
(course map, "Practice pages and mixed sets").

Files:

- `lessons/two-names-one-object/two-names-one-object.md`: the lesson. Six
  exec cells (two types cells, four program cells), no worlds, no `var`.
  Two predicts (both `choice`, both "What will the first line print?"),
  three hints, three solutions (no `inputs`, so each shows as a fold with
  no Compare button), one cell meant to fail (`expect: CS1612`), one
  "Why this way?" fold, one picture, no challenge.
- `lessons/two-names-one-object/two-names-one-object.svg`: the picture,
  with a `<title>`, a `<desc>`, and the same description as its alt text.
- `lessons/two-names-one-object/two-names-one-object.outputs.json`: what
  the browser checker recorded (nine runs: six cells and three
  solutions).
- `planning/notes/two-names-one-object.md`: this file.

`npm run check-lessons -- two-names-one-object` reports no problems.

## What the page does, in order

1. **Opening.** Points back to Ada on two rovers
   (`objects-inside-objects-practice#1-one-crew-member-two-rovers`): both
   rovers saw her oxygen change, because both lists held the one object.
   Then the question: when does C# copy an object, and when does it give
   it a second name? A rover keeps its landing site in `start`, and
   `Position here = start;` makes a second variable. Idea A: that line
   copies the position. Idea B: it gives the one position a second name.
   One sentence says why the page writes every type and not `var`.
2. **An experiment.** `Position` as a class (`X` km east and `Y` km north
   of the landing site, a constructor, a `ToString` that gives `(X, Y)`).
   The program copies `start` into `here` and moves `here` 5 km east.
   What each idea predicts is said above the cell. Predict on the first
   line. The run: `start is (5, 0)`, as idea B predicts: the landing site
   moved with the rover. One `new`, so one object. The reader changes the
   second line so that `start` stays; a hint (how many times is `new`
   used?) and a solution (`new Position(start.X, start.Y)`).
3. **The same code, with struct.** *Struct* is defined in the words of
   `mixed-programming-with-objects` problem 11. `Position` again as a
   struct, replacing the class (rule 4, with a clause saying that a
   struct with the same name does the same). The same program, line for
   line, and the same predict question. The run: `start is (0, 0)`: this
   time it is as idea A says.
4. **Value types and reference types.** The type decides. A class is a
   *reference type*, and a *reference* is defined; `=` copies the
   reference. A struct is a *value type*; `=` copies every field. The
   picture: two variables with arrows to one object, beside two variables
   each with a position of its own. `int`, `double`, `bool` and `char` are
   value types and structs (`Int32`); an enum is a value type; arrays,
   lists, dictionaries, strings, records and classes are reference types.
   A link to PDP's `two-names-one-list`, which does the same experiment
   with an `int` and an array.
5. **Why each idea is easy to believe.** Idea A: numbers, and a line that
   looks like `int other = width;` and says nothing about the type; how to
   find the type in Visual Studio (Quick Info on hover, and F12 from
   `the-tools-around-your-code`). Idea B: Python. Each idea has some
   truth: `=` always copies, and for a class it copies the reference.
6. **Class or struct?** Two of them with the same values: the same thing
   or not? A crew member is a class (as a struct, her oxygen would fall in
   neither rover); a position can be a struct. Microsoft's guidelines: a
   struct for a small value, and one that does not change; the page says
   that its own `Position` can change so that the experiment can show the
   copy. A question for the reader about their own world's classes.
7. **Where else it happens.** *A struct passed to a method*: `Drive`
   moves its own copy, and `here` stays at `(0, 0)`; *passing by value*
   is defined in the words of `writing-your-own-functions`; with the class,
   `Drive` would move the caller's position, which is how `Board` kept one
   Ada in both rovers. The reader makes `Drive` return the moved position;
   a hint and a solution. *A list of structs*: `path[1].Y = 3;` is meant to
   fail, CS1612, quoted as the page shows it; `this[int]` explained; with
   the class the same line compiles. The reader keeps the change; a hint
   and a solution (copy into a variable, change it, store it in the list
   again). A "Why this way?" fold: an array of structs allows the line,
   with an invitation to try it.
8. **Closing.** Nothing needs Visual Studio; next,
   [Testing a class](lesson:testing-what-a-class-does); two things to
   read.

## What I decided, and why

1. **`Position`, not `CrewMember`, for the experiment.** The map asks for
   "the same code with `struct` in place of `class`", so the experiment
   needs a type that makes sense as either. A crew member is a thing with
   an identity, and a struct crew member is the design the page argues
   against in "Class or struct?". A position is the textbook struct, and
   `mixed-programming-with-objects` problem 11 already has
   `struct Position` with the same fields, constructor and `ToString`
   format (`(0, 0)`), so the reader meets the same type again there. The
   rover's landing site gives the class half a real mistake to show: the
   saved landing site moves with the rover.
2. **Two pairs of cells, one for each kind of type.** The two programs are
   the same, line for line, so the only difference the reader can see is
   the first word of the type. The struct replaces the class by rule 4.
   `docs/LESSON_FORMAT.md` says "A type declared again lower down replaces
   the earlier one", and the engine does it by name: the cells below the
   struct use the struct (the recorded outputs show it). The style guide's
   rule 4 says "a class", so the page adds "and a struct with the same
   name does the same" (see "Open", 4). A single cell with two types of
   different names would have broken "the same code".
3. **Six cells, where the map says "three or four".** The map counts
   programs and experiments; the rules of the road put each type in a
   types cell above the program that uses it. There are four program
   cells: the two halves of the experiment and the map's two "where else"
   cases. `virtual-and-override` made the same reading. The page is still
   S (under eight cells).
4. **Two predicts, both on the first line.** Both ask "What will the first
   line print?", and each option is that line exactly, so the page
   compares a guess with that line only (decision 37). The first line is
   the one where the two ideas differ; the second line is `here is (5, 0)`
   in both halves. The struct's predict has different notes from the
   class's, and a third option, "Nothing: it does not compile", which the
   page counts as different when the cell compiles. The `Drive` cell asks
   in prose ("What do you think the last line prints? Run it and see."),
   so the page has two guesses, not three: the method case is the struct
   case again, and a third guess on the same question would teach the
   reader to skip them.
5. **Explicit types, not `var`.** FOOP allows `var` from
   `the-moves-you-already-know` on. The type is what the experiment is
   about, so every variable shows it, and one sentence says so, as
   `virtual-and-override` does.
6. **The words for the terms come from the pages the reader has met.**
   *Struct*: `mixed-programming-with-objects` problem 11 ("a type that is
   written like a class, with the word `struct` in place of `class`").
   *Reference*: `objects-inside-objects-practice` problem 1 ("a value that
   says where the object is"), with "in the computer's memory" from
   `two-names-one-list` and `grids-and-references`. *Value type*: the
   sentence that `storing-and-computing-practice` and `two-names-one-list`
   use ("each variable of that type holds its own copy of the value").
   *Reference type*: `two-names-one-list`'s sentence, with "an object" for
   "the value". *Passing by value*: `writing-your-own-functions` ("each
   parameter gets a copy of its argument's value. This is called *passing
   by value*").
7. **"Why each idea is easy to believe", not "Why idea A is easy to
   believe".** The other closer looks name the idea the experiment ruled
   out. Here the experiment rules out each idea for one kind of type, so
   the section gives each its reason: idea A from numbers (and from a line
   that does not show the type), idea B from Python, which matters to
   FOOP's readers who come from Python. It ends as `two-names-one-list`
   does: `=` always copies, and for a class it copies the reference.
8. **"Class or struct?" is not in the map's entry, and I added it.** It is
   the question a reader and a teacher ask as soon as the experiment has
   run, and FOOP-LO1 is about the data types of an object-oriented
   program. It is short (two bullets and a paragraph), it uses the crew
   member from the opening, and it rests on Microsoft's two pages (both in
   "Where to read more"; the second is now *Structure types*, see
   "Review"). It says plainly that the page's own `Position`
   breaks the guideline "a struct should not change", and why. It can be
   cut as one section; nothing below depends on it except the sentence
   "The next section shows what else that allows".
9. **The two "where else" cases are the map's.** For the method, the fix
   is a method that returns the new value (`here = Drive(here, 5);`), the
   shape that .NET's own structs use, rather than `ref`, which no page
   teaches. For the list, the fix is the one `mixed-programming-with-objects`
   problem 11 uses (a copy in a variable, changed, then stored in the list
   again), with `path[1] = new Position(5, 3);` named as the one-line way.
   The array case, which compiles, went into a "Why this way?" fold,
   because a reader who knows arrays will ask, and it is one more idea
   than the map lists.
10. **The CS1612 message is quoted whole, in a `console` block.** The page
    shows it as `Program.cs(2,1): error CS1612: Cannot modify the return
    value of 'List<Position>.this[int]' because it is not a variable`
    (checked in the browser, below). `this[int]` is explained in one
    sentence, as C#'s name for a list's square brackets.
11. **A picture.** The map does not ask for one, and the other closer
    looks have none. A drawing of two arrows to one box, beside two boxes,
    is the usual way to show a reference, and it gives a teacher something
    to draw on the board. It is drawn for a white background, with the ink
    (`#1f2328`) and font stacks of `the-mission-in-boxes.svg` and no
    colour, and its alt text says everything in it. I redrew it narrower
    (580 wide, 17 px text) after the first version's labels shrank to about
    8 px at 390 px wide.
12. **The opening quotes no output from another page.** The practice page
    records `40 40`; this page says "Both rovers saw the change", and
    names only 40, the value the practice page's code gives her oxygen.
13. **Visual Studio.** Everything runs on the page, and the closing line
    says so, as the other closer looks do. The one Visual Studio step is
    optional: rest the pointer on a type's name to see `class` or
    `struct`, or press F12 (from `the-tools-around-your-code`, whose words
    "Rest the mouse pointer" the page reuses).
14. **Links** go only to pages in `lessons/`: `objects-inside-objects-practice`
    (with the anchor of problem 1, which the page's slug rule makes
    `#1-one-crew-member-two-rovers`), `from-a-description-to-classes`,
    `two-names-one-list`, `the-tools-around-your-code` and
    `testing-what-a-class-does`. The link to `two-names-one-list` says it
    is "a closer look in Programming and Design Principles", because a
    FOOP reader who came from Python has not read it.
15. **Where to read more.** Microsoft's *The C# type system* (C#
    fundamentals), for its sections "Value types and reference types" and
    "Choose which kind of type" (which says "Most custom types are
    classes"), and *Choosing Between Class and Struct* (Framework Design
    Guidelines), for the two rules the page gives. Both returned HTTP 200
    on 28 September 2026, and I read both. The first uses `var`, a
    `readonly record struct` and the words "managed heap", and the entry
    says so. The second says on its page that it is from a 2008 edition
    and may be out of date in places; its two rules are still the ones the
    first page gives ("Small data ... value semantics, or immutability").
    `virtual-and-override` also gives a main page and a second one.
    *(Review: the second page was replaced by the C# reference's
    *Structure types*, and `virtual-and-override` gives one page, not
    two. See "Review" below.)*

## What I left out

- **`ref` parameters**, the other way for a method to change the caller's
  struct. No page teaches them, and returning the new value is the shape
  .NET's own structs use.
- **`readonly struct`, `record struct` and `with`.** The guideline "a
  struct should not change" is given in words. Showing a struct that
  cannot change would need a second struct and a second experiment.
- **Comparing structs.** `start == copy` does not compile for a struct
  without an operator of its own (CS0019, probe `struct-equals`), and
  `Equals` compares the fields (`True`, probe `struct-equals-only`).
  Equality is a topic of its own
  (`equals-three-ways`, and `documenting-a-class-practice` problem 3).
- **A `foreach` over a list of structs.** `step.Y = 3;` inside the loop is
  CS1654 (probe `struct-foreach`): a third "where else", left out to keep
  the page S. It would make a practice problem.
- **Boxing**: a struct held in an `object` or interface variable is
  copied into an object. It matters for `many-classes-one-promise` (a
  struct that implements an interface), not for this page's outcomes.
- **The stack and the heap.** The page does not need them, as
  `two-names-one-list` does not.
- **dewlab's grid made with `* 2`.** It belongs to PDP's page, which has
  its C# version.
- **A challenge and a practice page**, which a closer look does not have.

## Where each number and message in the prose comes from

All from `lessons/two-names-one-object/two-names-one-object.outputs.json`,
except where the table says otherwise.

| Number, message or claim | Source |
|---|---|
| Ada's oxygen "fell to 40"; "both rovers saw the change" | the code of `objects-inside-objects-practice` cell `one-crew-member-two-rovers-1-program` (`ada.Oxygen = 40;`), and its recorded output `40 40` |
| `start is (5, 0)`, then `here is (5, 0)`; the first predict's `start is (5, 0)` | cell `an-experiment-1-program` |
| solution "with a second object": `start is (0, 0)`, then `here is (5, 0)` | `an-experiment-1-program`, `solutions[0].output` |
| `start is (0, 0)`, then `here is (5, 0)`, with the struct; both predicts' `start is (0, 0)` | cell `the-same-code-with-struct-1-program` |
| the picture: X 5, Y 0 for the class; X 0, Y 0 and X 5, Y 0 for the struct | cells `an-experiment-1-program` and `the-same-code-with-struct-1-program` |
| `start` and `here` hold the same reference; a second `new` makes a different object | probe `class-same-reference` (`True`, `False`) |
| `int`, `double` are structs (`Int32`, `Double`); `DateTime` is a struct; `string`, `List<int>` and the class `Position` are not value types; the struct `Position` is | probe `which-are-structs`, probe `class-print-plain` |
| an enum is a value type; a record, an array and a dictionary are not | probe `enum-and-record` (`True`, `False`, `False`, `False`) |
| `int other = width;` copies the number | probe `int-copy` (`width is 5`) |
| as a struct, Ada's oxygen falls in neither rover | probe `crew-as-struct` (`100 100`; the class gives `40 40`, probe `crew-as-class`) |
| `here is (0, 0)` | cell `where-else-it-happens-1` |
| with the class, `Drive` moves the caller's position | probe `class-method-changes` (`here is (5, 0)`) |
| solution: `here is (5, 0)` | `where-else-it-happens-1`, `solutions[0].output` |
| `Program.cs(2,1): error CS1612: Cannot modify the return value of 'List<Position>.this[int]' because it is not a variable` | cell `where-else-it-happens-2` (line 2, column 1); the file name as the page shows it, checked in the browser |
| with the class, `path[1].Y = 3;` compiles and changes the list | probe `class-list-changes` (`(0, 0) (5, 3)`) |
| solution: `(0, 0) (5, 3)` | `where-else-it-happens-2`, `solutions[0].output` |
| `path[1] = new Position(5, 3);` gives the same result | probe `struct-list-new` (`(0, 0) (5, 3)`) |
| an array of structs allows `path[1].Y = 3;` | probe `struct-array` (`(0, 0) (5, 3)`) |

"5 km", "3 km" and `other = 7;` are values in the code, not outputs.
`Int32` is .NET's name for `int`, from probe `which-are-structs` and
Microsoft's documentation, not a quoted output.

## How it was checked

- `npm run check-lessons -- --write two-names-one-object`, then the same
  without `--write`: nine runs, no problems. Every cell did what the
  prose says; no cell has a warning.
- The probes below ran in the browser checker, in two scratch lessons
  (`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`),
  with the results given in the table above and beside each probe.
- The page was looked at in headless Chromium on the real server
  (`tools/serve.mjs --isolate`), at 900 and 390 pixels wide, and in dark
  mode at 390. Each cell has the label and file the page should give:
  `an-experiment-1-position` and `the-same-code-with-struct-1-position`
  are `types`, `Position.cs`; the four others are `program`,
  `Program.cs`. The two predicts render their options as code. There are
  seven folds (three hints, three solutions, one "Why this way?"). Every
  `lesson.html` link returned 200. The picture loads (580 by 250) and is
  legible at 390 px. There is no sideways scroll at 390 px, and the
  console showed no errors. Run on the page, `an-experiment-1-program`
  printed what the checker recorded, and `where-else-it-happens-2` showed
  the CS1612 line quoted in the lesson, with no extra help line under it.
- Not checked: the Visual Studio sentence (Quick Info shows `class` or
  `struct` before a type's name; F12 opens a type you wrote at its first
  line). It is how Visual Studio 2022 behaves as far as I know, and the
  F12 half is what `the-tools-around-your-code` already says, but no
  machine here has Visual Studio.

## For other pages (not done here: this run edits only its own files)

- `courses/foop.yaml` still lists `two-names-one-object` under
  `planned:`. The line can go now that the lesson is in `lessons/`.
- Pages that name this one in italics, which can now link to it
  (decisions 14 and 32): `objects-inside-objects.md` ("After it, *Two
  names, one object* is a closer look ...", in its closing section);
  `objects-inside-objects-practice.md`, problem 1's fold ("*Two names,
  one object*, the closer look after the tutorial"); 
  `documenting-a-class-practice.md` ("as on *Two names, one object*");
  `a-polynomial-class.md` ("*Two names, one object* is about the same
  idea for objects of your own classes").
- `mixed-programming-with-objects` problem 11 defines *struct* where it
  first appears, because this page did not exist; it could now link here.

## Open

For Josh:

1. **"Class or struct?"** is not in the course map's entry. Keep it, or
   cut the page to the map's experiment and two cases? (Decision 8
   above.)
2. **A struct that can change.** The page's `Position` has public fields
   that can change, which Microsoft's guidelines advise against, and the
   page says so. The experiment needs a struct that can change to show
   the copy. Is that acceptable to teach from, or should the page end
   with a `readonly struct`, as the guidelines would have it?
3. **Where this page's problems go.** The course map says a closer look's
   problems go into its tutorial's practice page, here
   `objects-inside-objects-practice`. That page already leads into this
   one (problem 1), and `mixed-programming-with-objects` problem 11 is a
   struct problem. Should `objects-inside-objects-practice` gain a struct
   problem too, such as the crew member as a struct (probe
   `crew-as-struct`, `100 100`) or a `foreach` that tries to change a
   struct (CS1654, probe `struct-foreach`)?
4. **Rule 4 and a struct.** The style guide's rule 4 says "A class written
   again further down replaces the earlier one", and `CLAUDE.md`'s rule 2
   already adds "So can an interface, a record, an enum or a struct". This
   page adds "and a struct with the same name does the same" to rule 4.
   Should the rule's words say *a type* instead, on every page?
5. **The picture.** No other closer look has one. Keep it? It uses the
   ink and the fonts of `the-mission-in-boxes.svg`, and no colour.

## Review

A second reader went through the page on 28 September 2026: once as a
Level 5 learner who knows only the pages before it, once as a teacher
against the course map's entry, and then line by line against the
checklists in `docs/TRANSLATING.md` and the style guide. It also checked
every number and message against the outputs file. No cell changed, so
`version:` stays `2026.09.28.1` and the outputs file was not rewritten.
`npm run check-lessons -- two-names-one-object` still reports 9 runs and
no problems.

What held up: every number and message in the prose, the predicts, the
solution notes and the picture matches
`two-names-one-object.outputs.json` (and `40` and `40 40` match
`objects-inside-objects-practice`). Each program cell works on its own
and uses only types from above it. The cell meant to fail says so before
it runs, with `expect: CS1612`. There are two predicts, each asking about
"the first line", with no option marked. The first hint on each task asks
a question, and each `after:` suits its cell (`2 runs` on the two tasks
that already run, `2 errors` on the one that does not compile). There are
no verdict words, no phrasal verbs and no American spellings. Every term
the page uses is defined on it or on a page the reader has met: *caller*
on `keeping-details-inside-an-object`, `.NET` and `Int32` on
`types-and-their-sizes`, `Role` on `from-a-description-to-classes`,
*library* on `virtual-and-override`. The anchor
`#1-one-crew-member-two-rovers` matches the page's slug rule
(`web/page/markdown.js`). The page covers everything in the map's entry,
and says that nothing on it needs Visual Studio.

### What changed in the lesson

1. **"They cannot both be true", then "Both of them".** The opening says
   the two ideas cannot both be true, and "Value types and reference
   types" began *So which idea does C# follow? Both of them.* A teacher
   would stop at that. It now reads *So which idea is true? For a class,
   idea B. For a struct, idea A. The type decides.* For one type, the
   two ideas still cannot both be true.
2. **Counting `new`.** The first experiment teaches the reader to count
   `new` (one `new`, so one object), and its hint asks the same question.
   The struct program also has one `new`, and two positions, and the page
   did not say why. The value-type paragraph now says that for a struct,
   `new Position(0, 0)` gives a value with two fields, not a reference,
   that `start` holds it itself, and that there are two positions
   "although the program uses `new` only once". The sentence *A variable
   of the struct `Position` holds its two fields, `X` and `Y`, itself*
   went with it.
3. **A term used before it was defined.** *Reference type* was defined
   with the word *reference* one sentence before *reference* was. The
   two definitions swapped places, so *reference* comes first.
4. **`Position` before the experiment.** The opening used
   `Position here = start;` with no word about what `Position` is. It now
   says the landing site is "a place on the map, in a `Position` variable
   called `start`".
5. **"From the cell above".** The `Drive` section said `Position` was the
   struct "from the cell above", but the cell just above is a program.
   It now names the section: "`Position` is still the struct from *The
   same code, with struct*, above (rule 4)".
6. **CS1612 and the class.** The paragraph said a list's brackets return
   a copy, and then that with the class the same line compiles, without
   saying why. It now says that with the class the copy is a reference
   to the object in the list. *The compiler refuses the line, so the
   change is not lost without a message* became two plainer sentences:
   *…a change to it would be lost at once, and nothing would say so. So
   the compiler refuses the line.*
7. **Shorter or plainer sentences.** Rule 4's long bracket became its own
   sentence (*That is rule 4: a class written again further down replaces
   the earlier one, and so does a struct with the same name.*). The F12
   sentence and the sentence about `Board` each became two. *without
   meaning to* became *by mistake*, and *`=` makes its copies without a
   line that says "copy"* became *`=` copies a struct, and nothing in the
   line says so.* The `Drive` solution note no longer says "a method that
   changes a struct" (the method changes its own copy); it says *For a
   struct, a method like `Drive` usually has this shape*. The array fold
   now says which cell to change ("the cell above").
8. **The second reading, and where "Class or struct?" gets its advice.**
   *Choosing Between Class and Struct* is a 2008 book extract, and it
   says "reference types are passed by reference, whereas value types
   are passed by value". This page teaches the opposite, in C#'s own
   terms: every argument is passed by value, and for a class the value is
   a reference. A learner who followed the link would meet a sentence
   that contradicts the page, beside stack, heap, boxing and "16 bytes".
   It is replaced by Microsoft's current C# reference page, *Structure
   types*
   (<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct>,
   read on 28 September 2026). Before its first heading it says both
   things the section says: structs are "typically" for "small
   data-centric types", as .NET's numbers, `bool`, `char` and `DateTime`
   are, and "we recommend you define immutable structure types". The
   section now says *Microsoft's documentation for C#* where it said
   *Microsoft's guidelines for .NET*, and *It also recommends a struct
   that cannot change* where it said *The guidelines add one more rule*.
   The entry says the page calls a struct a *structure type*, and that
   the rest of the page goes beyond these pages. The first entry's last
   sentence was split in two. Both entries were checked against the live
   pages: the first still has the two sections named, "Most custom types
   are classes", the managed heap and a `readonly record struct`.
   (Microsoft's C# fundamentals page *C# structs* was also a candidate:
   plainer, and its "When to use structs" test, "two instances with the
   same data should be equal", is this page's test. But it does not
   state the recommendation about structs that cannot change, so the
   section would have lost its source.)

### What changed in the picture

The struct half's labels were written `X  0   Y  0`, and SVG folds
runs of spaces into one, so the boxes read `X 0 Y 0`. Each field is now
its own `<text>` (`X 0` at x 382, `Y 0` at x 446), and the class box's
`X  5` and `Y  0` lost their double space. Nothing else changed; the
alt text and `<desc>` still match. Looked at on the real server
(`tools/serve.mjs --isolate`) at 390 and 900 px wide: the picture loads
(580 wide; 361 px on the page at 390), no sideways scroll, no console
errors. The `lesson.html` links are the five in decision 14, plus the
page's own links to the practice page before it and the lesson after it.

### Still open for Josh (added by the review)

6. **Two things to read.** The course map says a closer look "ends with
   one thing to read", and `virtual-and-override`, `when-is-a-breaks`
   and `two-names-one-list` each give one. (The writer's note that
   `virtual-and-override` gives two is not so.) This page gives two,
   because the second is the source for "Class or struct?". If that
   section goes (Open 1), the second entry goes with it.
7. **The picture on a phone.** At 390 px the drawing is scaled to about
   62%, so its 17 px labels are about 10.5 px. They can be read, and the
   alt text says everything in the drawing, but a version with the two
   halves one above the other would keep the text near full size on a
   phone and be taller on a computer. Worth it?
8. **Strings.** The page lists strings among the reference types, with
   no word about why a string still behaves like a value (it cannot be
   changed). `two-names-one-list` explains that, and this page links
   there. A FOOP reader who came from Python has not read it. Add one
   sentence, or leave it to the link?
9. **The Visual Studio sentence** (hover shows `class` or `struct`; F12
   opens the type's file) is still unchecked on a machine with Visual
   Studio, as the writer said.

## Probes

Run in the browser checker by copying them into a scratch lesson
(`node tools/check-lessons.mjs --lessons <scratch>/lessons --write`). The
cells up to `struct-position` use the class; the cells after it use the
struct, which replaces it (rule 4). The last five (`crew-as-class` to
`struct-equals-only`) ran in two other scratch lessons, and each declares
the types it needs. What each printed:

- `class-program`: `start is (5, 0)`, `here is (5, 0)`.
- `class-copy-by-hand`: `start is (0, 0)`, `here is (5, 0)`.
- `class-same-reference`: `True`, `False`, `True`, `False`.
- `class-list-changes`: `(0, 0) (5, 3)`.
- `class-method-changes`: `here is (5, 0)`.
- `class-print-plain`: `False`, `True`.
- `struct-program`: `start is (0, 0)`, `here is (5, 0)`.
- `struct-method`: `here is (0, 0)`; `struct-method-return`: `here is (5, 0)`.
- `struct-list`: does not compile, CS1612 at (2,1), *Cannot modify the
  return value of 'List<Position>.this[int]' because it is not a
  variable*.
- `struct-list-fix` and `struct-list-new`: `(0, 0) (5, 3)`.
- `struct-array`: `(0, 0) (5, 3)`.
- `struct-foreach`: does not compile, CS1654 at (4,5), *Cannot modify
  members of 'step' because it is a 'foreach iteration variable'*.
- `struct-equals`: does not compile, CS0019 at (4,19), *Operator '=='
  cannot be applied to operands of type 'Position' and 'Position'*.
  `struct-equals-only`, the `Equals` line alone with its own struct,
  prints `True`.
- `struct-new-no-args`: `(0, 0)`, `(1, 2)`.
- `which-are-structs`: `Int32`, `True`, `Double`, `True`, `False`,
  `True`, `False`.
- `struct-print-no-tostring`: `{X=1,Y=2}` (.NET's own
  `System.Drawing.Point`, a struct that can change, with its own
  `ToString`).
- `crew-as-class`: `40 40`; `crew-as-struct`: `100 100`.
- `int-copy`: `width is 5`.
- `enum-and-record`: `True`, `False`, `False`, `False`.

```csharp exec
id: class-position
file: Position.cs
class Position
{
    public int X;    // km east of the landing site
    public int Y;    // km north of the landing site

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

```csharp exec
id: class-program
Position start = new Position(0, 0);
Position here = start;
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
```

```csharp exec
id: class-copy-by-hand
Position start = new Position(0, 0);
Position here = new Position(start.X, start.Y);
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
```

```csharp exec
id: class-same-reference
Position start = new Position(0, 0);
Position here = start;
Position copy = new Position(0, 0);
Console.WriteLine(ReferenceEquals(start, here));
Console.WriteLine(ReferenceEquals(start, copy));
Console.WriteLine(start == here);
Console.WriteLine(start == copy);
```

```csharp exec
id: class-list-changes
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
path[1].Y = 3;
Console.WriteLine(string.Join(" ", path));
```

```csharp exec
id: class-method-changes
Position here = new Position(0, 0);
Drive(here, 5);
Console.WriteLine($"here is {here}");

void Drive(Position position, int km)
{
    position.X = position.X + km;
}
```

```csharp exec
id: class-print-plain
Console.WriteLine(new Position(1, 2).GetType().IsValueType);
Console.WriteLine(typeof(Position).IsClass);
```

```csharp exec
id: struct-position
file: Position.cs
struct Position
{
    public int X;    // km east of the landing site
    public int Y;    // km north of the landing site

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}
```

```csharp exec
id: struct-program
Position start = new Position(0, 0);
Position here = start;
here.X = 5;
Console.WriteLine($"start is {start}");
Console.WriteLine($"here is {here}");
```

```csharp exec
id: struct-method
Position here = new Position(0, 0);
Drive(here, 5);
Console.WriteLine($"here is {here}");

void Drive(Position position, int km)
{
    position.X = position.X + km;
}
```

```csharp exec
id: struct-method-return
Position here = new Position(0, 0);
here = Drive(here, 5);
Console.WriteLine($"here is {here}");

Position Drive(Position position, int km)
{
    position.X = position.X + km;
    return position;
}
```

```csharp exec
id: struct-list
expect: CS1612
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
path[1].Y = 3;
Console.WriteLine(string.Join(" ", path));
```

```csharp exec
id: struct-list-fix
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
Position last = path[1];
last.Y = 3;
path[1] = last;
Console.WriteLine(string.Join(" ", path));
```

```csharp exec
id: struct-list-new
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
path[1] = new Position(5, 3);
Console.WriteLine(string.Join(" ", path));
```

```csharp exec
id: struct-array
Position[] path = { new Position(0, 0), new Position(5, 0) };
path[1].Y = 3;
Console.WriteLine(string.Join(" ", path));
```

```csharp exec
id: struct-foreach
expect: CS1654
List<Position> path = new List<Position> { new Position(0, 0), new Position(5, 0) };
foreach (Position step in path)
{
    step.Y = 3;
}
```

```csharp exec
id: struct-equals
expect: CS0019
Position start = new Position(0, 0);
Position copy = new Position(0, 0);
Console.WriteLine(start.Equals(copy));
Console.WriteLine(start == copy);
```

```csharp exec
id: struct-new-no-args
Position empty = new Position();
Console.WriteLine(empty);
Position unset;
unset.X = 1;
unset.Y = 2;
Console.WriteLine(unset);
```

```csharp exec
id: which-are-structs
Console.WriteLine(typeof(int).Name);
Console.WriteLine(typeof(int).IsValueType);
Console.WriteLine(typeof(double).Name);
Console.WriteLine(typeof(DateTime).IsValueType);
Console.WriteLine(typeof(string).IsValueType);
Console.WriteLine(typeof(Position).IsValueType);
Console.WriteLine(typeof(List<int>).IsValueType);
```

```csharp exec
id: struct-print-no-tostring
Console.WriteLine(new System.Drawing.Point(1, 2));
```

```csharp exec
id: crew-as-class
var ada = new CrewMember("Ada");
var dune = new Rover("Dune");
var crater = new Rover("Crater");
dune.Board(ada);
crater.Board(ada);
ada.Oxygen = 40;
Console.WriteLine($"{dune.OxygenLeft()} {crater.OxygenLeft()}");

class CrewMember
{
    public string Name;
    public int Oxygen = 100;

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Rover
{
    public string Name;
    private List<CrewMember> _crew = new List<CrewMember>();

    public Rover(string name)
    {
        Name = name;
    }

    public void Board(CrewMember member)
    {
        _crew.Add(member);
    }

    public int OxygenLeft()
    {
        int total = 0;
        foreach (CrewMember member in _crew)
        {
            total = total + member.Oxygen;
        }
        return total;
    }
}
```

```csharp exec
id: crew-as-struct
var ada = new CrewMember("Ada");
var dune = new Rover("Dune");
var crater = new Rover("Crater");
dune.Board(ada);
crater.Board(ada);
ada.Oxygen = 40;
Console.WriteLine($"{dune.OxygenLeft()} {crater.OxygenLeft()}");

struct CrewMember
{
    public string Name;
    public int Oxygen = 100;

    public CrewMember(string name)
    {
        Name = name;
    }
}

class Rover
{
    public string Name;
    private List<CrewMember> _crew = new List<CrewMember>();

    public Rover(string name)
    {
        Name = name;
    }

    public void Board(CrewMember member)
    {
        _crew.Add(member);
    }

    public int OxygenLeft()
    {
        int total = 0;
        foreach (CrewMember member in _crew)
        {
            total = total + member.Oxygen;
        }
        return total;
    }
}
```

```csharp exec
id: int-copy
int width = 5;
int other = width;
other = 7;
Console.WriteLine($"width is {width}");
```

```csharp exec
id: enum-and-record
Console.WriteLine(typeof(Role).IsValueType);
Console.WriteLine(typeof(Treasure).IsValueType);
Console.WriteLine(typeof(int[]).IsValueType);
Console.WriteLine(typeof(Dictionary<string, int>).IsValueType);

enum Role
{
    Commander,
    Geologist,
    Engineer
}

record Treasure(string Name, int Gold);
```

```csharp exec
id: struct-equals-only
Position start = new Position(0, 0);
Position copy = new Position(0, 0);
Console.WriteLine(start.Equals(copy));

struct Position
{
    public int X;
    public int Y;

    public Position(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```
