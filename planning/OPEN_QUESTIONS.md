# Open questions

This file gathers the questions in the porters', writers' and reviewers' notes
(`planning/notes/`) that only you can settle: 168 of them in all. Questions 1
to 62 come from the pages ported from dewlab, merged across pages and grouped
by theme, with the ones that touch the most pages first. Questions 63 onward
come from the 26 newer pages, in the section "From the 26 newer pages",
grouped by theme in the same way. Every page works as it stands, with the
default given under *Now*, so nothing here blocks a class. Questions 4, 5, 7
and 8 are answered (3 October 2026; decision 41), and each says what is still
open under it. Answer by number ("3: yes, 12: the second one"); a question
left unanswered keeps its default, and the last section lists faults and
checks that need no answer.

## Across both courses

**1. Which Visual Studio, and on which computers?** Which version is on the
college PCs, and can the steps assume learners have Windows at home (course
map question 11)?
- Now: every set of steps names Visual Studio 2022 on Windows (Extract All,
  Ctrl+F5, F5, F9, F10, F11), and Windows Forms needs Windows. The
  downloaded project's `README.txt` also gives `dotnet run`. `GetItems` and
  `Shuffle` on `leaving-it-to-chance` need .NET 8 or later; a college Visual
  Studio on .NET 6 would not compile them.
- Pages: `a-program-of-your-own`, `the-tools-around-your-code`,
  `from-cells-to-a-program`, `when-it-goes-wrong`, `the-team-project`,
  `testing-what-a-class-does`, `documenting-a-class`,
  `a-front-end-for-a-class`, `your-world-playable`, `leaving-it-to-chance`.
- Porter: if some learners use a Mac or VS Code, add a second set of steps
  beside the first.

**2. Pictures of Visual Studio.** The course map asks for steps "with
pictures described in words". Will you take screenshots at college, or
should the map drop the pictures?
- Now: words only; nobody porting had Visual Studio.
- Pages: `the-tools-around-your-code` (steps 3 and 4 of "Watching the
  program run"), `testing-what-a-class-does`, `a-front-end-for-a-class`.

**3. Where a team keeps its code.** Teams, OneDrive, GitHub, or something
else the college uses?
- Now: the page names none.
- Pages: `the-team-project`.
- Porter: once chosen, a teacher note in the course map, and a sentence on
  what happens when two people save the same file in a synced folder.

**4. FOOP's second world: the solar system or the ocean?** (Course map
question 13.) Decision 13 chose the solar system, but not as your choice.
- Answered, 3 October 2026: keep the solar system (decision 41). Decision 13
  stands.
- Now: the game and the solar system on every FOOP page with worlds.
  Changing means retelling every solar-system cell.
- Pages: `objects-and-classes`, `the-moves-you-already-know`,
  `the-tools-around-your-code`, `keeping-details-inside-an-object`,
  `one-class-many-methods`, `from-a-description-to-classes`,
  `one-parent-many-children`, `objects-inside-objects`,
  `testing-what-a-class-does`, `documenting-a-class`,
  `a-front-end-for-a-class`, `your-world-playable`,
  `mixed-programming-with-objects`.

**5. Which world a page teaches in.** The style guide says a page teaches in
its first world. On three pages the shared cells, which every reader sees,
teach in the solar system (the Mars mission, Juno, Jupiter), while the
frontmatter lists the game first. List the solar system first on those
pages, or change the style guide's sentence?
- Answered, 3 October 2026, for `from-a-description-to-classes`,
  `keeping-details-inside-an-object` and `the-moves-you-already-know`: list the
  solar system first (decision 41). Done: those three now open in it. The two
  newer pages below were not part of that answer, and stay open.
- Now: the game first on every other page with the mix. `one-class-many-methods`
  has the same mix and settled on the game first. `many-classes-one-promise` teaches in shapes,
  an astronaut and planets, and `asking-a-list-a-question` in planets, and
  each gives the worlds only their tasks (`when-is-a-breaks` and
  `virtual-and-override` have no worlds, so the question does not arise). For
  `asking-a-list-a-question` the other ways out are to change the map's entry
  to "solar system, game", or to teach the cells in both worlds (twice the
  cells). For `many-classes-one-promise` the other way out is to tell the
  shared sections in the game world (`IDamageable` for characters, doors and
  barrels), with shapes only as the link back to `when-is-a-breaks`.
- Pages: `from-a-description-to-classes`, `keeping-details-inside-an-object`,
  `the-moves-you-already-know`, `many-classes-one-promise`,
  `asking-a-list-a-question`.
- Porter (`the-moves-you-already-know`): opening in the game would need a
  new opening problem.

**6. Where *Compiler errors* sits** (course map question 12). The synthesis
made compiling the first lesson; the map puts it fourth in PDP, after the
reader has types to get wrong. Confirm?
- Now: fourth. `first-steps` meets one error and names compiling in a
  paragraph. Since written: `compiler-errors` is fourth in PDP and second in
  FOOP (shared, one id).
- Pages: `compiler-errors` (not written), `first-steps`.

**7. One copy of each class** (course map question 2). Long classes are
copied in full from cell to cell and page to page. Add
`{{include: <file>}}` for a types cell so each version lives once, let a
cell fold its unchanged methods, or cut stages?
- Answered, 3 October 2026: leave the copies (decision 41). No `{{include:}}`,
  no folding, no cut stages.
- Now: full copies, compared by hand when each page was ported; nothing
  catches a copy that drifts later.
- Pages: `a-polynomial-class` (17 cells, 8 of them copies of `Polynomial`,
  19 to 93 lines; cutting stages, say the derivative as a challenge, loses
  the answer to the opening question), `one-parent-many-children`
  (`Character`, 44 lines, four times plus the challenge and the practice
  page), and the FOOP class chain: `objects-inside-objects`,
  `testing-what-a-class-does`, `documenting-a-class`,
  `a-front-end-for-a-class`, `your-world-playable`,
  `mixed-programming-with-objects` (`Character`, 76 lines).

**8. Trim or split the longest pages now?** A cut is cheap before a class
has saved work under the cell ids, and costly after. Cut now, or keep them
whole until a class has been timed on them?
- Answered, 3 October 2026, for the five pages first in the list below
  (`storing-and-computing`, `writing-your-own-functions`,
  `building-reusable-tools`, `keeping-details-inside-an-object` and
  `mixed-programming-with-objects`): keep them whole (decision 41). The pages
  added after them in the list were not part of that answer, and stay open.
- Now: all kept whole. The cut each porter would make:
  - `storing-and-computing` (22 cells, 19 per world): move "Putting values
    into text" to the start of `types-and-their-sizes`, as the map allows;
    the easiest single cuts are the conversion table and the trace cell.
  - `writing-your-own-functions` (20 cells per world): move "Scope: where
    variables live" to the practice page, whose problems 18 to 20 cover
    most of it.
  - `building-reusable-tools` (6,057 words, 26 cells per world): split
    after "Your turn" in "Methods that call methods", the second page
    starting at "Handling edge cases" (each needs its own `Stats` and
    `Test`).
  - `keeping-details-inside-an-object` (18 cells, size M): move the decimal
    tank (`what-a-caller-needs-to-know-3`) to the practice page.
  - `mixed-programming-with-objects` (23 cells, size M): move new problems
    5, 8, 10 and 11 to their topics' practice pages, or split into two sets.
  - `types-and-their-sizes` (15 cells per world, the top of M, and 12
    practice problems): the largest-values cell
    (`numbers-with-a-decimal-point-2`) and the summary table, though PDP's
    "range of data" is in them.
  - `from-python-to-csharp` (13 cells, about 27 KB with ten Python fences and
    the phrasebook, longer than `objects-and-classes`): move the phrasebook
    to a help page, or "An array, a list or a dictionary" to the start of
    `types-and-their-sizes`. The reviewer would keep it whole.
  - `reading-input` (12 cells on show per world, the top of M): move the
    colour cell to the practice page.
  - `many-classes-one-promise` (15 cells on show, the top of M): move the
    abstract class to a closer look of its own, or to
    `objects-inside-objects`.
  - `mixed-first-programs` (9 problems, 10 cells): problem 9 alone is a
    23-line starter with a 38-line solution. Set it as homework, or split it
    in two (check the numbers; then check the division). The reviewer:
    homework.
  - `mixed-programming` (15 problems, 14 cells, about an hour only by
    choosing): drop 10 (Any base) and 13 (The missing number), or add a
    sentence to the opening saying that a class can choose some problems.
  - `mixed-working-in-a-team` (size S, 7 cells, but problems 4 and 5 are
    written work, nearer an hour): say that they can be done in pairs in a
    second session, or change the entry's size.
  - `a-deck-of-cards` (21 cells, the map says 8 to 15): move the closer look
    "Is every order as likely?" (four cells) to a page of its own, or drop
    it. The writer would keep it if the page has to shrink.
  - `a-model-that-corrects-itself` (17 cells, the map says 8 to 15): cut the
    learning-rate cell and its fold, and the opening cell; the page would
    then have one predict, not two. The reviewer would keep 17.

**9. Closer looks bigger than the map.** Cut the extra cells, or keep them?
- Now: all kept.
- `dividing-in-csharp` (7 cells, map 3 to 4): cut `an-experiment-2`, and
  its `Math.Floor` numbers go unrun.
- `powers-in-csharp` (5, map 2 to 3): cut `where-else-it-happens-2` and its
  fold; then the two power problems on `first-steps-practice` have no home.
- `equals-three-ways` (5, map 4): the `bool` cell `where-else-it-happens-2`
  (warning CS0665 for `if (seeThrough = true)`) is in neither dewlab nor the
  map. If kept, the map's entry should say the slip survives with `bool`.

**10. Conventions the porters followed but nobody wrote down.** Record each
in `DECISIONS.md` or the style guide? Answer "10: yes" for all, or by letter.
- a. When one dewlab cell becomes several types cells, they are
  `<id>-<class>` and the program is `<id>-program` (an addition to decision
  26). `from-a-description-to-classes`, `when-is-a-breaks`,
  `objects-inside-objects`.
- b. Decision 30 reads "last on its page, or replaced by the next class
  cell", and a class that warns is written again, fixed, further down
  (rule 4). `one-class-many-methods`, `one-parent-many-children`,
  `keeping-details-inside-an-object`, `the-tools-around-your-code`,
  `the-moves-you-already-know`.
- c. Tests (answers course map question 3): `Test.Check<T>(claim,
  expected, found)` throws an exception reading "<claim>: expected <x>,
  found <y>"; `Test.RunAll` prints "Tests run: n. Passed: m."; the suspect
  classes refuse without printing; prose says a test "passes" or "does not
  pass", with "failed" only as Test Explorer's word.
  `testing-what-a-class-does`, and every page with a `Test` class
  (`building-reusable-tools`, `when-it-goes-wrong`, `documenting-a-class`,
  `a-front-end-for-a-class`, `your-world-playable`).
- d. `_camelCase` for a private field, in the style guide's #code (the map
  settled `_fuel` for the lessons; course map question 8).
  `keeping-details-inside-an-object`.
- e. A practice page may have no worlds; `docs/TRANSLATING.md` says it has
  its tutorial's, and could add "if it has world variants".
  `one-parent-many-children`, `testing-what-a-class-does`,
  `objects-inside-objects`, `objects-and-classes`, `many-classes-one-promise`
  (its review found that every FOOP practice page in `lessons/`, the
  exemplar's included, has none).
- f. The style guide names lessons, not page counts: its terms table still
  says "*instance*, before FOOP's third page", which no longer fits now
  FOOP opens with "Starting in C#" (course map question 1).
- Porters: yes to each.

**11. Cell ids out of page order.** A few ids run against the page's order,
or against decision 26's usual pattern, because they kept dewlab's. They
cost nothing to change before a class uses them. Rename now, or leave?
- Now: dewlab's ids kept.
- `dividing-in-csharp`: the clock cell, first on the page, is
  `where-else-it-happens-2`, and the 0.1 cell is `-1`.
- `storing-and-computing`: `your-turn-4` comes after `your-turn-2`.
- `looking-things-up-by-name`: `looking-up-with-a-default-3` sits above
  `-2`.
- `testing-what-a-class-does`: the runner's types cell has a new id
  (`ten-lines-that-run-every-test-runner`) and the program keeps dewlab's
  `-1`, the reverse of decision 26; `close-enough-1` follows decision 26,
  though the first change is in its program.
- `counting-darts`: `more-is-not-reliably-better-1`, `-3`, `-2` are out of
  page order. They are dewlab's ids, so the reviewer left them.
- `bits-that-flip`: `bits-toolkit` names dewlab's toolkit, which dewsharp does
  not have. Decision 28 keeps dewlab's id when the task is the same, and
  renames only ids that name Python. A new id would be, for example,
  `bits-parity-loop`. The reviewer left it, because the choice is yours.
- `a-model-that-corrects-itself`: `a-model-that-starts-out-wrong-*` keep
  dewlab's ids, though the page keeps *right*, *wrong* and *correct* out of
  its prose (it says *mistake* and *correction*, which the reviewer thinks
  fine). The ids show only in the file name of a downloaded project, and the
  map's rule is that a cell that keeps its task keeps its dewlab id, so that a
  teacher can put the two pages side by side. The reviewer would keep them.

**12. Claims that are not numbers.** "Every number is run", and decision 29
covers numbers in folds, but some pages state an order, a compiler message,
a fact about the world or what Visual Studio shows, which no cell prints.
Accept them when the notes record a probe or a source, or ask for a cell or
a cited source on the page?
- Now: stated in the prose, with the probe or source in the page's notes
  (except on `objects-inside-objects`, where nobody checked a source).
- `finding-things`, `putting-things-in-order`: "apple" comes before
  "Banana" with `CompareTo`, and after it with `CompareOrdinal`.
- `when-is-a-breaks`: a penguin in a `List<FlyingBird>` does not compile
  (CS1950, CS1503), said in a fold; showing it would need a cell with
  `expect: CS1503`, with the answer in plain view.
- `objects-inside-objects`: Jupiter has more than 90 moons, Pluto became a
  dwarf planet in 2006, Peggy Whitson was the first woman to command the ISS.
- `documenting-a-class`: Python's docstrings and doctest; Microsoft's
  summaries start with a verb ending in -s.
- `the-tools-around-your-code`: the IntelliSense line, CS8618 with
  nullable on, CS0246 for `Shield` in a namespace, Visual Studio's form of
  the report, the template's classic `Main`.
- `powers-in-csharp`: a sentence saying Visual Studio gives the same error
  codes was left out for this reason.
- `from-python-to-csharp`: "curly brackets round every block, as Visual Studio
  does". Visual Studio's own `if` and `for` snippets write them, and its
  default C# style prefers them, but it does not add them to code you type.
  "As Visual Studio's own code does" would be more exact, if the difference
  matters.

**13. Programs that use chance, and the checker.** A cell whose output
depends on `Random` cannot be checked with `stdin:`. Write down (a) "a cell
that uses chance has no `stdin:` and stops at `null`", or add (b) an
`output: varies` header that compares only the outcome (a change to the
format, the parser and the checker)?
- Now: (a), unwritten. `from-cells-to-a-program`'s Release 1 uses a fixed
  `int shift = 3;` where the map has `Random.Shared`. `three-doors` gives
  every generator a seed, so that each output repeats, and invites the reader
  to try `Random.Shared`; its writer asks whether the format should allow a
  cell whose output the checker does not compare (an `unseeded` header).
  `three-ways-to-make-change` prints no time, because the checker compares
  outputs exactly, so the only running `Stopwatch` is the reader's own line;
  its writer asks for `output: varies`, and says the same need will come for
  any page that times something. (A cell that prints
  `watch.ElapsedMilliseconds < 1000` gives `True` on any computer, but would
  not show the growth.)
- Pages: `finding-things`, `from-cells-to-a-program`, `reading-input` ("a loop
  that asks again", now written), `three-doors`, `three-ways-to-make-change`.
- Porters: (a), as a `DECISIONS.md` entry.

**14. Two closer-look problems for home practice pages.** Add them?
- `repeating-yourself-practice`: `total = 0;` inside the loop, which prints
  "At the end: 10" (from `a-total-that-starts-again`).
- `making-decisions-practice`: `if (seeThrough = hidden)`, which compiles
  with no warning (from `equals-three-ways`).
- Now: neither added.
- Porters: add both.

**15. Challenges that lost their compiler error.** Decision 40 makes a
challenge compile on its own, so two no longer hold the compiler error the
map asks for. Keep them, add a cell with `expect: CS1002` after the
challenge, or add a second logic error?
- `the-tools-around-your-code` (map: one compiler error and one logic
  error). Now: a list never made (CS0649, then a `NullReferenceException`,
  which repeats the page's own bug) and a logic error.
- `reading-an-error-message`. Now: two kinds of error, and the reader adds
  the third.

## Teaching C#

**16. One shape for `null` from `ReadLine`, and for a menu.** `reading-input`
(not written) will set the pattern the later pages follow. Which shape?
- Now, four shapes:
  - `case null:` under the quit case: `a-front-end-for-a-class` and its
    practice page, `a-program-of-your-own` (with
    `while (choice != "9" && choice != null);`).
  - `if (choice == null) { choice = "quit"; }`: `a-front-end-for-a-class`,
    `your-world-playable`.
  - `if (choice == null || choice == "9") break;` in `while (true)`:
    `from-cells-to-a-program`, `the-team-project`.
  - `if (answer == null) break;` in a `do`...`while`: `finding-things`.
- `from-cells-to-a-program`'s recap assumes `reading-input` has a
  `do`...`while` round a `switch`, with 9 to quit.
- Porters: `reading-input` takes the `case null:` shape, with the prompt
  `Your choice: `.
- Since written: `reading-input` takes the `case null:` shape, as a second
  label on the path of `case "9":`, with
  `while (choice != "9" && choice != null);` and a prompt that ends
  `Choose: `.

**17. `} while (x);` on the brace's line, or `while` on a line of its
own?** The style guide puts each brace on its own line; `dotnet format`
accepts both.
- Now: `} while` in `a-front-end-for-a-class` (and its practice page) and
  `your-world-playable`; `while` on its own line in
  `a-program-of-your-own`, `finding-things`, `the-moves-you-already-know`
  and `reading-input`, which teaches `do`...`while`.
- Porter: `} while`, Microsoft's reference form.

**18. Lambdas in PDP** (course map question 5). Show a lambda once as code
to read, leave them all to the extra `asking-a-list-a-question`, or keep to
named methods?
- Now: `putting-things-in-order` passes a named method
  (`Array.Sort(words, ByLength)`), in the lesson and practice problems 12
  and 13. `how-we-got-here` shows `number => number % 2 == 0` and
  `Func<int, bool>` once, as code to read, and its practice problem 15 runs
  `Select(number => number * 2)` in a cell the reader rewrites as a loop.
  The reader never writes a lambda. `many-languages-one-idea`, an extra, runs
  `Average()` and `Count(...)` with `reading => reading > average`, which it
  calls "a small method with no name", in the words of *Programming
  languages*, which showed LINQ only as code to read. The reader may write
  `Max()`, and the optional LINQ one-liner in the `CountOver` note and the
  challenge's last comment ask more of it.
- Pages: `putting-things-in-order`, `how-we-got-here`,
  `many-languages-one-idea`.
- Writer (`many-languages-one-idea`): is running a lambda on an extra
  acceptable, or should the LINQ cell become code to read?
- Porter: cutting it removes "Sorting by another rule", `your-turn-4` and
  two practice problems; a lambda would add one line to read.

**19. "Every method we write has an XML comment."** `building-reusable-tools`
says this, but methods in program cells after it have none. Reword to
"every method in a class", or give every method a one-line `///` summary
(most cells change)?
- Now: methods in classes have comments; methods in program cells don't.
- Pages: `building-reusable-tools`, `when-it-goes-wrong` (`CountLetters`,
  `HasVowel`, `Median`), `how-we-got-here` (`ToBinary`, `FromBinary`,
  `ReadHex`, and the starters and solutions).

**20. Python asides on FOOP pages.** For a reader who took PDP in C#, keep
the short comparisons with Python, shorten them, or move them into a "Why
this way?" fold across the course?
- Now: kept, one bracketed sentence each, and in some practice folds. On
  `virtual-and-override` and `mixed-starting-in-csharp` the Python is a few
  lines to read, and the prose says what it prints, so that a reader who never
  met Python can follow. `compiler-errors` and `reading-input` are shared with
  PDP, where a reader who has never seen Python may find it means nothing.
- Pages: `objects-and-classes`, `one-class-many-methods` (practice folds 3, 9
  and 10), `keeping-details-inside-an-object`,
  `from-a-description-to-classes`, `one-parent-many-children`,
  `virtual-and-override` ("Why idea A is easy to believe" shows three lines of
  Python; the writer asks whether to lead with the general point, that in some
  languages every method can be replaced, and keep Python as the example),
  `mixed-starting-in-csharp` (problem 1 shows a Python program beside the C#,
  and a PDP reader who uses the page as a quick check may not know Python),
  `compiler-errors` (four mentions: the first predict's note, a paragraph for
  readers who know Python, `print` and single quotes), `reading-input` (the
  `input()` and `EOFError` aside).

**21. A solution that uses C# no page teaches.** The map has two titles,
"with what you've met so far" and "a shorter way you'll meet later". Accept
a third, "a shorter way C# has", drop these solutions, or have a later page
teach the method (for example `?:` on `reading-input`)?
- Now: "a shorter way C# has" on `lists-and-sequences-practice` 8
  (`Array.Reverse`), `grids-and-references-practice` 9,
  `looking-things-up-by-name-practice` 5 (`Values.Sum()`) and 9
  (`Zip(...).ToDictionary()`), `making-decisions-practice` 6 (`?:`); "a
  shorter way you'll meet later", with nothing later teaching it, on
  `repeating-yourself-practice` 13 (`new string('#', row)`).

**22. Collection expressions** (`[1, 2, 3]`, C# 12), course-wide, in place
of `{ 1, 2, 3 }` and `new List<int> { 1, 2, 3 }`?
- Now: no page uses them; `lists-and-sequences` and `grids-and-references`
  tell the reader that Microsoft's examples do.
- If yes: an early page teaches them, and `a-polynomial-class` shortens
  most.

**23. `const`.** Version 3 of the class writes its limits as
`public static int MaxHealth = 10;` and `TankSize = 100;`, which any
program can change (`Character.MaxHealth = 1000;`); C# would write
`public const`. Mention `const`, and where: `types-and-their-sizes` or
`from-a-description-to-classes`?
- Now: not mentioned in FOOP. The last PDP page, `mixed-working-in-a-team`,
  defines a named constant and `const` in its review fold and in the note to
  problem 5, which PDP has not met before.
- Pages: `one-class-many-methods`; a change to version 3 changes
  `one-parent-many-children` too. Also `mixed-working-in-a-team`.
- Writer (`mixed-working-in-a-team`): `const` is a natural fit for "magic
  number" (PDP-LO11's coding standard). Should an earlier PDP page
  (`storing-and-computing`, or `critique-and-reflection`'s coding standard)
  meet it first?

**24. Where FOOP meets `throw`.** The map teaches `throw` only in PDP
(`building-reusable-tools`). Should a FOOP page teach it, and which?
- Now: every rule refuses by printing "Refused: ..."; `documenting-a-class`
  has an `InvalidOperationException` section, and
  `from-a-description-to-classes` uses `NotImplementedException` before it.
- Pages: `keeping-details-inside-an-object`, `one-class-many-methods`,
  `from-a-description-to-classes`, `documenting-a-class`.

**25. `int?`.** Keep its first meeting to one sentence in a practice
problem, use -1 for "no number" (as `from-cells-to-a-program` does, since
PDP has no `int?`), use `TryParse`'s shape, or have `reading-input` or
`types-and-their-sizes` teach it and point there?
- Now: one sentence in `a-front-end-for-a-class-practice` problem 2.

**26. `OverflowException` on `reading-an-error-message`.** It is in the
page's table and practice problem 4, not in the map's entry. Keep, or leave
overflow to `types-and-their-sizes`?
- Now: kept.

**27. Subtraction as a comparison.** `putting-things-in-order` sorts with
`first.Length - second.Length` and `counts[second] - counts[first]`, which
can wrap round for very large numbers; .NET code usually calls
`CompareTo`. Say so there, or leave it to `building-reusable-tools`' edge
cases?
- Now: not mentioned.

**28. One definition of *value type*.** `grids-and-references` defines it
in its own words; `two-names-one-list` uses `storing-and-computing-practice`'s.
- Porter: use `storing-and-computing-practice`'s, the oldest, everywhere.

## PDP pages

**29. `dividing-in-csharp`: name the idea?** Whole-number division is never
named. "Truncating" (defined for a cast in `storing-and-computing-practice`
problem 7) or Microsoft's "rounded toward zero", in one sentence after the
experiment?
- Now: unnamed.

**30. `storing-and-computing`: the general backwards shift.** The map asks
for `((n % 26) + 26) % 26`; the solutions use `(position + shift + 26) % 26`
(enough for a shift back of up to 26), and the *for A* note gives the
general form in one sentence. Enough, or should a solution use it?
- Now: one sentence.

**31. `making-decisions`: `'a' == 97`.** The sixth guess in `your-turn-1`
(in place of dewlab's `0 == False`) shows a C# surprise, but a reader may
take it as leave to compare letters with numbers. Keep, or a plainer line?
- Now: kept.

**32. `reading-an-error-message`: four `FormatException` cells** (the
opening, `runtime-errors-1`, `runtime-your-turn-2`, `a-short-traceback-2`).
Change `runtime-errors-1` to a `DivideByZeroException` or an
`OverflowException`?
- Now: four.

**33. `reading-an-error-message-practice` problem 12: "12O".** The letter O
is hard to tell from a zero in some fonts, dyslexia fonts among them. Keep,
or "12 0", or "one20"?
- Now: "12O".

**34. `finding-things-practice` problem 7: the note on Joshua Bloch's
post** (Google Research blog, 2 June 2006; the page says the bug was there
"for years"). Keep, shorten or drop?
- Now: kept.

**35. `finding-things`: dewlab's halving table.** It became a cell with
whole numbers, so the 20th look leaves 0, not "about 1". Bring the table
back? It would need a `double` version of the loop.
- Now: the whole-number cell.

**36. `grids-and-references`: Polybius pairs.** In
`your-turn-2--secret-messages`, an `int[,]` with two columns
(`pairs[i, 0]`), or two arrays, `row` and `column`, side by side? Which
reads better at Level 5?
- Now: `int[,]`.

**37. `grids-and-references`: Jon Skeet's "Parameter passing in C#".** It
is written for programmers. Keep it as the second reading, or keep only
Microsoft's page and the video?
- Now: kept.

**38. `looking-things-up-by-name`: a gentler reading.** Microsoft's
`Dictionary<TKey,TValue>` reference page is for experienced programmers;
the other candidate, "How to initialize a dictionary with a collection
initializer", uses `var` and a class with `Main`. Is there a Microsoft
Learn page you prefer?
- Now: the reference page.

**39. `writing-your-own-functions-practice` problem 9: "Half of seven".**
`first-steps-practice` problem 4 has the same title (and id, on another
page, so no clash). Retitle this one?
- Now: both "Half of seven".

**40. `how-we-got-here-practice` problem 19** overlaps
`building-reusable-tools-practice` problem 16: both are `GetValueOrDefault`
with no default (an `int` gives 0 there; a `string` gives `null`, then a
`NullReferenceException`, here). Keep both, or move one?
- Now: both kept.

**41. Long program cells.** The style guide asks for 5 to 15 lines. Keep
these, or shorten?
- `from-cells-to-a-program`: `one-place-to-start-main-1-program` (43 lines,
  22 of them `TryAskShift` and its comment) and the Release 2 menu (30).
  Porter's option: a third file, `Ask.cs` (the map names two).
- `when-it-goes-wrong`: `your-turn-2` (37 lines; moving `Draw` into the
  tests cell makes it 28), `tracebacks-through-several-functions-1` (25),
  `where-it-stops-being-right-1` (23), and the practice page's
  `test-the-pieces-1` (27).
- `a-deck-of-cards`: `every-order-1-program` (29 lines) and `every-order-2`
  (30). Each is one idea, and splitting them would add cells to a page already
  over M.
- `counting-darts`: the grid cell (25 lines, "longer than most ... for running
  and looking at, and you do not need to write it"). An SVG of the same 1,500
  darts is the other way.
- `the-game-of-life`: the opening program, about 100 lines. Is a long showcase
  program acceptable on an explore page, or should the page open with a
  smaller grid (a blinker alone, say) and show the whole game later?
- `three-doors`: the careless host's cell (about 50 lines). Each cell must
  carry its own copy of the game (rule 3), and *Random numbers* has cells of
  the same size, so the reviewer left them.
- `three-ways-to-make-change`: the three class cells (22 to 31 lines), each
  holding one recursive or looping method with its XML comment. The reviewer
  left them.
- `mixed-working-in-a-team`: `Rooms.cs` (22 lines) and problem 4's
  side-by-side (24). Each is one idea, and the reviewer left them.
- Now: all kept.

**42. `when-it-goes-wrong-practice` problem 8.** dewlab's bug (looping over
a sentence as if over its words) is a compile error in C# (CS0030), so the
porter wrote a new one: the last word has no space after it. It keeps the
task and the habit, but the method is 23 lines. Keep, or a shorter bug?
- Now: the new bug.

**43. `when-it-goes-wrong`: more of *Finding where it went wrong*?** From
Computational Methods the page took symptom and cause, and a three-line log
(practice 9); it left out bisection, the smallest failing example and the
dungeon seed.
- Now: those left out.
- Porter: the smallest failing example would fit the practice page best.

## FOOP pages

**44. Pages that open by reading, not running.** The style guide's
checklist asks whether a page opens by running something. Accept these as
exceptions (a design page, a series-end task), or reorder?
- `from-a-description-to-classes` opens with a description and a noun
  hunt; the first `enum` cell could move to the top.
- `your-world-playable` opens with a list, as dewlab does; with "Your
  world, running" first it would still open with `Test` and four long types
  cells before a program.
- `three-doors` opens with the puzzle in prose, as dewlab does. A cell cannot
  come before the puzzle is told, and the guess on paper is the question it
  asks.
- `a-function-that-calls-itself` opens with a question in prose, and its first
  cell is a types cell, because the folder type has to come first. The first
  cell that runs is `calls-itself-folders-1`.
- `asking-a-list-a-question` opens with two types cells, not a program: rule 2
  needs the class above the first question, and the first program cell asks
  for a guess at once.
- Now: all keep their order. The reviewers of the last three left them.

**45. `from-a-description-to-classes`: the design task's solution.**
**Compare with a solution** compares output, which says little about a
design. Show the solution as "one answer", without the compare table?
- Now: an ordinary solution with **Compare**.

**46. `documenting-a-class`: comments on constructors.** The task asks for
one on every constructor, since Visual Studio shows it on `new Probe(`;
dewlab did not ask for one on `__init__`. Keep (the solutions are longer),
or drop?
- Now: kept.

**47. `one-parent-many-children`: a negative hit on the troll.** `amount /
2` turns -1 into 0, so `grog.TakeDamage(-1)` does nothing and prints
nothing (in Python, `-1 // 2` is -1, which was refused). The prose says
"trolls keep both rules too", true of health, not of the refusal. Leave it,
make it a practice problem on C#'s division, or have the troll refuse a
negative amount before halving?
- Now: left.

**48. `the-moves-you-already-know`: empty lists.** `Heaviest()`,
`WidestMoon()` and `NarrowestMoon()` throw `ArgumentOutOfRangeException` on
an empty list, and the page leaves that as a question for the reader.
Should `testing-what-a-class-does` come back to it?
- Now: nothing does.

**49. `testing-what-a-class-does`: Probe C's bug.** The page opens with
"One seems to have none", and "A test before the fix" then finds C's
negative refuel, to show that a test finds bugs but never proves there are
none. In dewlab, C has no bug. Keep, or give that section a class of its
own?
- Now: kept.

**50. `testing-what-a-class-does`: the stress test's second solution**
(numbers from −20, which breaks all five probes). One experiment too many
for a long page?
- Now: kept.

**51. `objects-inside-objects`: a source for *has a*.** Microsoft's
tutorial names "is a" and "can do", not "has a". Is there a C# source that
names *has a* or composition worth linking? (Think Python's 18.8 was
dropped.)
- Now: none.

**52. `mixed-classes-and-objects` needs new problems.** The map gives
dewlab's problems 1 to 3 and 5 to 8 to it as well as to
`mixed-programming-with-objects`, but they need inheritance, testing,
documentation and a front end, all later than that set.
`mixed-programming-with-objects` uses all nine. Confirm, and the map's
"From" line for `mixed-classes-and-objects` changes?
- Now: `mixed-classes-and-objects` rebuilds the ideas for the series before
  inheritance, as new problems, so that no problem appears twice (decisions 1
  and 2 in its notes). The other choices: it takes dewlab's problems and the
  last page drops them, or the map's entry names new problems.
- Pages: `mixed-classes-and-objects`, `mixed-programming-with-objects`.

**53. `mixed-programming-with-objects` problem 13: `Commands`.** The reader
copies `RunChoice` from `your-world-playable`. Or copy each world's
eighth-version `Commands` into problem 4 (one more long cell per world,
used only in problem 13's last step)?
- Now: the reader copies it.

**54. `your-world-playable`: no predict in the reader's own world.** Every
predict is in the game or the solar system, since the own-world cells are
the reader's to write. Accept?
- Now: as described.

## The page and the checker

**55. A place to write prose on a lesson page:** a notes field, or a text
cell a lesson can hold (a change to `web/` and the format)?
- Now: answers go in a text cell in My notebook, or on paper.
- Pages: `critique-and-reflection`, `a-program-of-your-own` ("Looking
  back").

**56. The label on a cell that holds only comments** ("An empty cell. Write
some C# in it.", `web/page/cell.js`). Change it, since some such cells are
plans or answers?
- Now: that label.
- Pages: `a-program-of-your-own` (a plan), `looking-things-up-by-name`
  (`dictionary-or-list-1`, answers).

**57. Pictures that follow the theme.** The page shows an SVG with `<img>`,
so it cannot follow the dark theme. Inline SVGs, as dewlab does, and say so
in the style guide's #access?
- Now: the page shows every SVG on a white card (since 28 September), so
  each picture reads the same in both themes, with fixed ink.
- Pages: `from-a-description-to-classes`, `lists-and-sequences`,
  `finding-things`, `types-and-their-sizes`.

**58. Predicts that never match a line.** When the options describe the
output, or answer yes or no, no guess equals a line, so the page always
asks "Which line explains what you saw?" (decision 37 accepts this). Add a
predict option that marks such a question, or keep decision 37 as it is?
- Now: the extra question every time.
- Pages: `finding-things` (`searches-csharp-has-1`, practice 7 and 14),
  `dividing-in-csharp` (`where-else-it-happens-1`).

**59. `expect: stop`** for a loop meant never to end: the checker would
run it, press **Stop**, and pass it if it was still running (a change to
the format, the parser and the checker)?
- Now: `repeating-yourself` (`while-loops-repeat-until-done-1`) asks the
  reader to delete a line to see it.

**60. Anchors in `lesson:` links.** `lesson:<id>#<heading>` works, but
`docs/LESSON_FORMAT.md` does not describe it, and the checker tests only
the id, so a renamed heading breaks a link without warning. Document it and
have the checker test anchors, or stop using them?
- Now: used on `dividing-in-csharp`, `powers-in-csharp`,
  `grids-and-references`, `lists-and-sequences`; `the-team-project` would
  like one.

**61. Names of downloaded projects.** **Download project** names a project
after its page and cell: `TheTeamProjectThreeReleasesNotOneDeadline1`,
`YourWorldPlayableYourWorldFrontEndGame`. Give it a shorter name in
`web/page/project.js`, or add renaming steps to `from-cells-to-a-program`?
- Pages: `the-team-project`, `your-world-playable`,
  `from-cells-to-a-program`.

**62. Mixed sets in the course files** (course map question 4): a `mixed:`
key, as dewlab has, or the last lesson of each series?
- Now: last in each series; comments in `courses/pdp.yaml` and
  `courses/foop.yaml` point to the open question.

## From the 26 newer pages

These come from the notes of the 26 pages written after questions 1 to 62 were
gathered: the extras on both courses, the pages shared by both, and the mixed
sets. Where a newer page asked something already numbered above, the page is
on that question's *Pages* line or in its *Now* line instead (1, 5, 6, 8, 10,
11, 12, 13, 18, 20, 23, 41, 44 and 52), and 16 and 17 now say what
`reading-input` does. Each page works as it stands, with the default given
under *Now*.

### The extras as a set

The extras are the explore pages. The questions that touch several of them
come first.

**63. A practice page for the extras?** The course map gives an explore page
none, but dewlab's version of most has one, with problems that teach what the
page only touches. Give any of the extras a practice page, or keep them as
they are?
- Now: none has one. Where a page needed a problem, it was moved onto the page
  (`a-chain-reads-a-book` took two of dewlab's, `three-doors` the
  favourite-door host).
- Pages: `a-chain-reads-a-book` (dewlab's problems 4 and 8 are unused),
  `a-model-that-corrects-itself` (five of dewlab's would translate easily: a
  bias of 5 and no weights, training on the reversed list, accuracy as a
  share, a blank picture, a tenth pixel that is always 0),
  `asking-a-list-a-question` (the challenge's three loops, and one "which
  methods in which order" question), `bits-that-flip` (sixteen of dewlab's
  seventeen problems have no home), `counting-darts` (dewlab's has twelve),
  `leaving-it-to-chance` (four later extras use its topic),
  `many-languages-one-idea` (dewlab's has fifteen; a C#-only page, since SQL
  does not run here, if a teacher moves the page into the contents for the
  exam), `three-doors`, `when-a-queue-never-clears` (a queue with a break, a
  second till, customers who leave).
- Writer (`bits-that-flip`): some of the problems (the XOR swap, the settings
  mask, one parity bit or sixteen) could go into `mixed-first-programs` or
  `mixed-programming` instead.

**64. What an extra may lean on.** An extra can be read long after the pages
its entry names, and some use a page that the entry does not list or that a
reader may not have read. Should an extra keep strictly to the pages its entry
lists, or may it lean on others, with the entry saying which are optional?
- Now: each page says in a sentence or two what it uses, so it can be read
  without the other page. No entry says "optional".
- Pages: `when-a-queue-never-clears` (`leaving-it-to-chance`, a PDP extra that
  a FOOP learner may not have met; and `Simulation` holds an `Arrivals` and a
  `Till`, the subject of `objects-inside-objects`, which the entry's "Depends
  on" does not list), `a-model-that-corrects-itself` (`leaving-it-to-chance`,
  "helpful, not needed"; and `grids-and-references`, a PDP page that the FOOP
  course does not list), `a-deck-of-cards` (the entry names
  `leaving-it-to-chance`, which the page no longer needs; it uses records and
  `IComparable<T>`, so it can follow *Interfaces*, and a line in the teacher
  notes could say so for a class that finishes early),
  `asking-a-list-a-question` (three pages that a FOOP reader may not have
  read: *Sorting* in PDP, *Inside a method* and *Interfaces*; a teacher who
  sends a class here straight after *Classes and objects* should know),
  `bits-that-flip` (avoids methods, because its "Depends on" does not list
  `writing-your-own-functions`; with a `ParityBit(string bits)` method the gap
  task would have a comparison table of several calls, as in dewlab, and the
  catch cells would be shorter).

**65. Pages shorter than the map's size.** Grow them, or leave them?
- `the-game-of-life`: the entry says M (8 to 15 cells); the page has 5 cells
  and about an hour of work. Add tasks (a random start, a count of the live
  cells)?
- `mixed-starting-in-csharp`: S, six problems, about half an hour, where PDP's
  set for the same pages and more is M with nine. Add problems (one with
  `switch`, one with `double.TryParse` and the decimal comma)?
- Now: both as they are. `the-game-of-life` ends by pointing to *Random
  numbers* for a random first picture.

**66. Outcomes under `covers:`.** Two pages may list the wrong set of
outcomes.
- `counting-darts` covers PDP-LO2 only, though it also uses methods, loops and
  a test with a known answer. Name PDP-LO7 or PDP-LO10 as well, as
  `three-doors` names LO7?
- `mixed-classes-and-objects` lists FOOP-LO5 because of reading an exception
  report and the optional Visual Studio steps in problem 1. Enough, or a
  Visual Studio task that every learner does (a new problem, not a change to
  problem 1)?
- Now: as they are.

**67. More than one thing to read.** The style guide says "one thing to read
or watch", and the map says a closer look ends with one. Which should stay?
- Now: all kept.
- Pages: `a-function-that-calls-itself` (four: Microsoft's pages on records,
  `StackOverflowException` and `Stack<T>`, and the Reducible video),
  `two-names-one-object` (two; the second is the source for "Class or
  struct?", and goes with that section if it goes).
- Reviewer (`a-function-that-calls-itself`): `objects-and-classes`, the
  exemplar, also lists four, so the page follows the exemplar and not the
  style guide.

### The first series, and pages for both courses

Readers of both courses meet these pages first, and some of them know no C#
yet.

**68. Shared pages and the two courses.** `compiler-errors` is fourth in PDP
and second in FOOP, and its closing sentence names both next pages. It also
links `from-python-to-csharp` once, for readers from Python, which PDP readers
see too. `types-and-their-sizes` speaks to both courses at its end ("The next
lesson depends on your course: ..."). Should every shared page say what comes
next that way, and may it link a page of one course for the readers of the
other?
- Now: `compiler-errors` copies `types-and-their-sizes`' sentence for what
  comes next.
- Pages: `compiler-errors`, `types-and-their-sizes`.

**69. `compiler-errors`: the five parts of a message.** The style guide's
`#the-compiler` lists the file, the line, the column, the code, and what the
compiler found. `first-steps` lists the file, the place (line and column
together), `error`, the code, and what the compiler found. Change
`first-steps` to match the guide, or the guide to match `first-steps`?
- Now: `compiler-errors` follows the style guide, with one sentence that links
  to the earlier pages' word *place* (`first-steps`, `powers-in-csharp` and
  `from-python-to-csharp` all call `(line,column)` the place). The sentence
  can go once this is settled.
- Pages: `compiler-errors`, `first-steps`.

**70. `compiler-errors`: CS5001 and CS0017 are named, not shown.** Is naming
them enough for PDP's "interpret compiler and linker messages", or should a
later page with classes (`building-reusable-tools` in PDP,
`the-tools-around-your-code` in FOOP) run a cell for each?
- Now: named, in the fold on linking. Probes show that the page can produce
  both.

**71. `types-and-their-sizes`: the opening.** The map's line,
`int.MaxValue + 1`, does not compile (CS0220). The page keeps the value in a
variable first, and moves the literal version to practice problem 3. Keep
that, or open on the compile error and then show the variable?
- Now: the variable first.

**72. `types-and-their-sizes`: `255 + 1` in a `byte`.** The map expected it to
print 0. C# does `byte` arithmetic as `int`, so it does not compile without a
cast, and the page teaches that in a cell meant to fail. Is one more failing
cell welcome on a page that already has two, or should the `byte` start with
`(byte)(red + 1)` and explain it afterwards?
- Now: the cell meant to fail.

**73. The college's brief for the first assessed program.**
`types-and-their-sizes` builds a data dictionary with name, type, size and
what it holds (the range inside "what it holds"), as the map says, and tells
the reader that "the brief for the first assessed program asks for one", from
the map's teacher notes. Does your college's brief ask for those columns, or
for others (an example value, a validation rule, a separate range column)? Is
the sentence true, and welcome on a page that FOOP readers also see?
- Now: as described. If the columns differ, the two tables and the three
  solutions change to match.

**74. PDP's own words for checking input and test data.** PDP's descriptor
says *error trapping and reporting*, and its first skills demonstration asks
for test data and its results. `reading-input` calls checking input *input
validation*, defines *test data* in "Looking back" and gives one list of what
to try, but no task asks the learner to write a test table.
`mixed-first-programs` problem 9 is the nearest thing in the series to that
demonstration. Should either page name the descriptor's words, for teachers,
and should a practice problem ask for a test table?
- Now: neither names them, and no task asks for a test table.
- Pages: `reading-input`, `mixed-first-programs`.
- Reviewer (`reading-input`): one clause would do ("... is called *input
  validation*, one kind of *error trapping*"); it was left out because it
  gives a Level 5 reader two names for one idea on one line. Practice problem
  4 could ask for a test table, with its own four inputs as the first rows.

**75. `reading-input`: loops that never end after End input.** The shift
loops, the taps and grey tasks, and practice problems 4 to 6 ask again for
ever once the input has ended, and the page tells the reader to press
**Stop**. Is that acceptable on the page that teaches `null`, or should every
such loop also stop on `null` (three more lines each, and a second way out of
the loop)?
- Now: the page says what happens and what to press.
- Reviewer: keep the page as it is. The central loop stays short where
  `do`...`while` is taught, and `from-cells-to-a-program` adds the `null`
  check in a method.

**76. `reading-input`: `typed[0]` in practice problem 10.** PDP readers have
seen a string indexed once (the challenge on `storing-and-computing`) before
`lists-and-sequences`, which comes after this page. The problem says what
`typed[0]` is. Keep it, or use a check that needs no index?
- Now: kept.

**77. `reading-input`: nullable reference types.** Decision 4 of the style
guide says a page that exports to Visual Studio mentions the setting. A reader
who types `string name = Console.ReadLine();` in a project of their own sees
warning CS8600, because Visual Studio's template has the setting on. Add one
sentence about it here?
- Now: none. The downloaded project has the setting off, like the page, so the
  page's own advice is enough, and `a-program-of-your-own` (PDP) and
  `the-tools-around-your-code` (FOOP) explain the setting later.

**78. `from-python-to-csharp`: an `if` with no curly brackets.** The page
shows a form of C# that no other page uses, to warn about it. Keep the cell,
or say it in a sentence with no cell?
- Now: the cell, with the rule stated after the run, so the predict is a real
  guess.
- Reviewer: keep. It is the one place where "indenting only for people" costs
  a Python reader something, and nothing warns them.

**79. `from-python-to-csharp`: "From earlier" on FOOP's first page.** No FOOP
page comes before it, so both earlier problems on its practice page come from
PDP's `first-steps`, which a reader from Python has not read. Keep them, or
give the practice page no "From earlier" problems?
- Now: kept. The problems stand on their own, and the link is there for anyone
  who wants the page. Problem 9 is the same code, with the same cell id, as
  `first-steps-practice` problem 5, with a new fold for Python readers. The
  page ids differ, so saved work does not collide, but a reader who took both
  courses meets it twice.

**80. `from-python-to-csharp`: naming dewlab.** "How this page works" says
that in a Python notebook the cells often share their variables. Many FOOP
readers will have used dewlab's Python pages, where they do. Name dewlab?
- Now: not named.

**81. `static` on a method inside a program.** `writing-your-own-functions`
and `from-python-to-csharp` write `static` on a local method;
`objects-and-classes-practice` problem 8 writes `int AddHit(...)` without it.
A rule for the course would settle it. Which?
- Now: both forms.
- Pages: `from-python-to-csharp`, `objects-and-classes`.

**82. Other languages' output in the prose.** "Every number is run" holds for
C#. `from-python-to-csharp` quotes the output of Python 3.11, and
`many-languages-one-idea` quotes what Python, JavaScript, SQL, Ruby and BASIC
print. All of it was run outside the page, and nothing checks it again if a
cell changes. Is a note in the page's notes enough, should the page say where
each was run, or should such a page avoid quoting other languages' output?
- Now: quoted, and run twice outside the page (by the writer and by the
  reviewer).
- Pages: `from-python-to-csharp`, `many-languages-one-idea`.
- Reviewer (`from-python-to-csharp`): the only Python numbers that depend on a
  C# cell's data are the week of rain's (35.0, 5.0, 0.0, 7.0). If that data
  changes, those four change with it.

### The PDP extras

The extras on recursion, making change, bits, programming languages and the
game of life.

**83. `a-function-that-calls-itself`: a record on a PDP page.** PDP never
teaches records or constructors. The page defines a record in one sentence and
uses it only to hold three values. Is that acceptable on an explore page, or
would you prefer a small class with public fields and a constructor, as FOOP's
`objects-and-classes` has?
- Now: the record.
- Reviewer: it seems right for an explore page.

**84. `a-function-that-calls-itself`: two stack overflows.** Both are meant,
and the prose says so before each run. Is the second (the countdown task) one
too many for a Level 5 reader, or does it teach the second rule better than
prose would?
- Now: both.
- Reviewer: keep it. It is the only task on the second rule.

**85. `a-function-that-calls-itself`: `Factorial` and `int`.** The page
stresses that "a promise holds only for the inputs it names", and its own
promise ("0 or more") is not true from 13 up. Should the promise say "n from 0
to 12", with a fold or a recorded line that shows `Factorial(13)` and links
back to `types-and-their-sizes`? It would add a cell to a page at the top of
size M.
- Now: the promise says "0 or more".
- Reviewer: this is the one open point that a careful teacher is likely to
  notice. The cheapest fix is a promise of "0 to 12" and one recorded line.

**86. `three-ways-to-make-change`: `using` on a PDP page.** It is the only PDP
page with a `using` line (for `Stopwatch`). The alternative is
`System.Diagnostics.Stopwatch` written in full each time, which is longer and
needs no new idea. Keep the `using` line?
- Now: `using`, with a paragraph that says C# adds `Console` and `Dictionary`
  to every cell, and that a `using` line names another part of .NET.

**87. `three-ways-to-make-change`: brute force for 100.** dewlab asks the
reader to reason about it, not to run it. It never finishes in the checker's
30 seconds, so it cannot be a recorded cell (compare 59). Should the page ask
the reader to run it on purpose?
- Now: the page says that the Stop button stops it, and that the page stops
  any program after 30 seconds. No recorded cell runs it.

**88. `three-ways-to-make-change`: the euro coins.** The vending-machine
question tests amounts from 1 to 99 cent with the six coins below one euro, so
the page says "the euro coins worth less than one euro", which is what it ran.
Should it cover the 1 and 2 euro coins too? That needs `100, 200` in the euro
cell's array, a longer loop, and new counts in the notes and the fold.
- Now: less than one euro.

**89. `three-ways-to-make-change`: memoization and dynamic programming.** The
page calls the cache memoization and the challenge's loop dynamic programming,
and its reading note calls dynamic programming "the general name for the cache
and the table". A teacher who knows the field would call both dynamic
programming (top down and bottom up). Keep the page's names?
- Now: both names, with no claim that they are different things.

**90. `bits-that-flip`: the four other operators.** The entry asks for `&`,
`|`, `<<` and `>>`, and the page gives them one cell and a table. Is that the
weight you want on an extra about XOR, or should they have tasks of their own
(for example, reading one bit with `(reading >> i) & 1`)?
- Now: one cell and a table.

**91. `bits-that-flip`: hex before `how-we-got-here`.** The page defines hex
in one paragraph for the colour section, and `how-we-got-here` teaches it
properly, later in the course. Is a short definition here acceptable, or
should the colour section go and the page stay with binary?
- Now: the paragraph.

**92. `bits-that-flip`: "Passes the check?"** It replaced dewlab's "Looks
right?", to keep *right* off the page. Is that your reading of the style guide
for text that a program prints about data, not about the reader?
- Now: "Passes the check?".
- Reviewer: kept.

**93. `many-languages-one-idea`: the four questions.** They come from a Dewey
Track page that dewsharp does not have, and they appear on no other dewsharp
page. Keep them here, in the plainer words, or drop them and keep only the
characteristics table, which is what PDP-LO3 names?
- Now: kept, in plainer words.

**94. `the-game-of-life`: *programs*, not *cells*.** The page calls its code
boxes *programs*, so that *cell* can mean a square of the grid, though its
buttons, help and the notebook still say "cell" ("Download project on its
cell"). A teacher who opens it beside `grids-and-references`, which says "Run
the cell", meets the word used two ways. Accept that? If so, a short line on
the teachers' page could say that this one page uses *program*.
- Now: *program*.

**95. `the-game-of-life`: edges.** Should the edges join by default (Conway's
own game has no edges), with dead edges as the variation?
- Now: dead edges, for the exception the page teaches.

**96. `the-game-of-life`: animation.** If the page's engine shows output
before a `Thread.Sleep` (see the faults at the end), should this page offer
the animated version, and keep Enter for stepping?
- Now: stepping with Enter.

### The extras on chance

`leaving-it-to-chance` and the extras after it use `Random`, so their recorded
numbers depend on a seed.

**97. Seeded numbers and versions of .NET.** Every seeded number on these
pages is true for .NET 10's `new Random(seed)`, and Microsoft says that
another version may give other numbers for the same seed. Is a sentence in the
Visual Studio paragraph enough, or should a page say less about particular
numbers?
- Now: `leaving-it-to-chance` says so in full; the others say only "on the
  same version of .NET as this page".
- Pages: `leaving-it-to-chance` (its word game quotes "seven rounds" and
  "round 8" from seed 1, and its argument is that the round is always the
  same, so it is affected most), `three-doors` (seed 1's game, 3391, 6598 and
  the rest), `counting-darts`, `a-chain-reads-a-book` (the order of the
  tickets also depends on the order in which a `Dictionary` gives its pairs,
  which .NET does not promise).

**98. `leaving-it-to-chance`: the fold on neighbouring seeds.** It answers a
question that a careful reader will ask. Is it too much for Level 5 on an
extra page? It can go without changing a cell.
- Now: kept.

**99. `leaving-it-to-chance`: the security paragraph.** It names
`RandomNumberGenerator` and shows no code. Is that enough, or should an extra
show one line of it?
- Now: named, no code.

**100. `counting-darts`: a rule that is stated, not shown.** The page says
that the typical error shrinks as 1/√n, as dewlab does. It now says "This page
does not prove the rule", and the lab bench's question 1 lets a reader test it
(a probe gave about eight times, not ten). Is a stated rule acceptable at
Level 5 on an extra, or should the page say less about it?
- Now: stated, with that sentence.

**101. `counting-darts`: how many guesses.** The style guide says two or
three. The page has two predict blocks, two guesses in prose before a run (the
last column of the settling table, and "will every row be closer"), and the
opening question. The weakest is the predict on (0.6, 0.8), where the paper
calculation is already the guess. Delete it?
- Now: kept. Its note on `False` sends a reader back to `0.1 * 3` on
  *Dividing*.
- Reviewer: kept it.

**102. `counting-darts`: lab bench question 4.** It needs about five million
darts a run, so about a hundred million in all, which took longer than 30
seconds in the checker. The page says what to do (make `runs` smaller, or use
Visual Studio). Is that enough, or should the question go?
- Now: kept, with that advice.

**103. `three-doors`: `6 - firstPick - opened`.** It is short, and the prose
explains it as well as a comment, but it works only for doors numbered 1, 2
and 3. dewlab's page used a second loop. Is the trick too clever for Level 5?
- Now: the trick.

**104. `three-doors`: "Your turn" on a cell that already runs.** The reader's
task on `your-turn-1` is to add two sizes and compare, and dewlab's heading is
kept. If a "your turn" should always end in code that the reader writes, this
one could become plain prose under the section. Change it?
- Now: "Your turn".

**105. `a-chain-reads-a-book`: pasting a whole Gutenberg file.** A reader who
pastes a whole file also feeds Gutenberg's header and licence to the chain.
dewlab taught cleaning the file with string searches. Leave it to the reader
("paste a chapter"), or add a cleaning step with `IndexOf` and a range?
- Now: the reading list warns that the file's first and last lines are
  Gutenberg's notes, and that the chain reads them. No cleaning step.

**106. `a-chain-reads-a-book`: the grid section.** The heading "Too many words
for a grid" is dewlab's. For two chapters it overstates, because 400,689
elements fit in memory easily, and the paragraph under the numbers now says
so. "A grid would be almost empty" would be more exact (a heading only; no
cell id depends on it). The grid's size also uses `chain.Count`, the number of
different words that have a word after them. Here that equals the number of
different words (633), but for a text of the reader's own whose last word is
new, the grid would need one more row and column. Change the heading, or the
count?
- Now: dewlab's heading and `chain.Count`. The page's label says what the cell
  counts, so nothing on the page is untrue.

### The mixed sets

Six mixed sets close the series. The first three questions are about all of
them.

**107. Labels on the problems.** `mixed-classes-and-objects` and
`mixed-starting-in-csharp` label each problem Predict, Fix, Make or Explain,
as dewlab's Dewey Track set does. The other four sets do not. Should every
mixed set label its problems, or none?
- Now: two FOOP sets label. The reviewer of `mixed-starting-in-csharp` notes
  that two PDP sets do not, so it is a question about the course, FOOP against
  PDP, as much as about mixed sets.
- Pages: `mixed-classes-and-objects`, `mixed-starting-in-csharp`,
  `mixed-first-programs`, `mixed-programming`,
  `mixed-programming-with-objects`, `mixed-working-in-a-team`.

**108. A table of pages at the end.** A mixed set does not say which page a
problem needs. Five of the six end with a closed fold, "which pages each
problem uses", for teachers and for a reader who is stuck.
`mixed-programming-with-objects` has none. Keep the fold on all six, move it
to the teachers' page, or drop it?
- Now: `mixed-first-programs` added it, and `mixed-programming`,
  `mixed-starting-in-csharp`, `mixed-classes-and-objects` and
  `mixed-working-in-a-team` have it.
- Pages: `mixed-first-programs`, `mixed-programming`,
  `mixed-working-in-a-team`, `mixed-starting-in-csharp`,
  `mixed-classes-and-objects`, `mixed-programming-with-objects`.

**109. A challenge on every mixed set.** The style guide asks every page to
end with one. Five of the six now do. Should `mixed-programming-with-objects`
gain one?
- Now: it has none.
- Pages: `mixed-programming-with-objects`.

**110. `mixed-classes-and-objects`: a "your own" world.** Every tutorial in
Classes and objects offers "your own", and the entry gives this page two
worlds, so a reader in their own world meets the game. Is a "your own" variant
wanted for any problem (for example, problem 7, on the reader's own
description)?
- Now: the game and the solar system only.

**111. `mixed-first-programs`: the remainder below zero, again.** The map asks
for "a remainder below zero", and it is already a problem on four earlier
pages. Here it is hidden inside problems 2 and 6. Is that the right amount, or
is a sixth meeting too many?
- Now: inside problems 2 and 6.

**112. `mixed-first-programs`: new names in a mixed set.** `decimal.Parse`
(problem 7) and `Random.Shared.Next` (the challenge) are new, each explained
in one sentence, and a mixed set is meant to use only what the series taught.
Are they acceptable, or should problem 7 use `double.Parse` (met on
`storing-and-computing`) and keep money in a `double`, against the advice of
`types-and-their-sizes`?
- Now: both new names.
- Reviewer: keep `decimal.Parse`, since `types-and-their-sizes` says money
  belongs in a `decimal`. `Random.Shared` is only in the challenge, and its
  sentence matches the one on `finding-things`.

**113. `mixed-first-programs`: the challenge and `finding-things`.** The
challenge asks the reader to write guess my number. `finding-things`, seven
pages later, opens by running exactly that game (`guess-my-number-3`) to lead
into binary search. A reader who did the challenge meets their own program
again, which may help or may take the surprise out of that opening. Keep it,
or give this page a different challenge (a times table, or the clock from
`first-steps` going backwards)?
- Now: guess my number.

**114. `mixed-programming`: dewlab's problems 2 and 3.** The map sends
dewlab's problems 1 to 6 to `mixed-first-programs` and 7 to 20 here.
`mixed-first-programs` took 1, 4, 5 and 6, because 2 and 3 need arrays, which
its series has not met. "Above the average" is close to
`lists-and-sequences-practice` 10, so losing it costs little. "The second
largest" has a real C# decision in it (an `int` cannot be `null`, so a method
with no second value must throw, use the `TryParse` shape, or return a special
number), and would fit here as a sixteenth problem. Add it, or leave both out
and correct the entry?
- Now: neither is on either PDP mixed set.

**115. `mixed-programming`: "Grids, references".** The entry asks for "one new
problem for each page ... that dewlab's set missed". The page reads that as
one new grid problem, since dewlab's problem 15 is already about references
and three more problems here turn on them. If you wanted a separate references
problem as well, a good one is a grid built from one row (`{ row, row }`), but
`two-names-one-list` already ends with it.
- Now: one new grid problem.

**116. `mixed-programming`: a `Dictionary<int, bool>` as a set.** Problem 5's
faster solution keeps only keys. C#'s own tool for that is `HashSet<int>`,
which no page of either course meets. Name it in the note as "a type made for
this", or leave it for the explore page on collections?
- Now: not named.

**117. `mixed-programming`: a dictionary as a report.** Problem 11 returns a
`Dictionary<string, int>`, because PDP has no class for data. A FOOP reader
would write a record. Is the dictionary acceptable in PDP, or should `Report`
become three small methods (one job each, as `building-reusable-tools` says)?
- Now: the dictionary.

**118. `mixed-programming`: the unstable sort.** Problem 2's note says that
another version of .NET could give a different third word. This follows
Microsoft's documentation (`Array.Sort` is unstable), and
`putting-things-in-order` says the same. For seven words, .NET's `Array.Sort`
in fact uses an insertion sort and keeps the order, so a teacher who tries it
will never see it change. Keep the sentence, or soften it to "nothing promises
it"?
- Now: the sentence stays. The note now says the pages said that nothing
  promises the order.

**119. `mixed-starting-in-csharp`: what `from:` means.** The entry lists
`mixed-programming` first, and this page says
`from: mixed-instructions-for-a-machine`, because most of its problems come
from there (decision 2). Is `from:` "the page it translates" (then neither,
since the action is *new*), or "the page it draws on most"?
- Now: `mixed-instructions-for-a-machine`.

**120. `mixed-working-in-a-team`: a named team.** Ciara, Dev and Maeve come
from `the-team-project`, where they appear once, as an example. This page
makes them a small cast. The style guide chose "no recurring character"
(decision 5 in its "Decided for now"), meaning a character who makes mistakes
across the course. Is a named team, on the last two pages of PDP only,
acceptable, or should the problems use "a teammate"?
- Now: the named team.

**121. `mixed-working-in-a-team`: problem 3 depends on problem 1.** Dev's menu
calls Ciara's `Rooms`, so a reader who skipped problem 1 meets a
`KeyNotFoundException` when they try a move with no exit. The page says so in
problem 3's fold, as a lesson in itself. The other choice is a menu with its
own dictionary, as on `the-team-project`, which is longer and does not depend
on problem 1. Keep the dependence?
- Now: the dependence.

**122. Roles and a definition of done.** dewlab's `building-it-together` gives
each person a role per release and a written definition of done. Neither
dewsharp's brief nor `mixed-working-in-a-team` has them. Is that a gap in
`the-team-project` that you want filled (it is the brief's job, not a mixed
set's)?
- Now: neither has them.
- Pages: `the-team-project`, `mixed-working-in-a-team`.

**123. The last page of PDP.** The close of `mixed-working-in-a-team` says
"This is the last page of *Programming and Design Principles*" and sends a
continuing learner to FOOP's `objects-and-classes`. PDP also has nine explore
pages. Should the last page name them too?
- Now: one sentence about the course page's **Explore** list, and no explore
  page named by title.

**124. "Magic number" in two senses.** `how-we-got-here-practice` uses *magic
number* for the fixed bytes at the start of a file. `mixed-working-in-a-team`
uses it for a number in code with no name. Both are real uses, but a learner
meets them a few pages apart. A sentence on one page could name the other, if
you want it.
- Now: neither names the other.
- Pages: `how-we-got-here`, `mixed-working-in-a-team`.

### The FOOP pages

Interfaces, `virtual` and `override`, namespaces, structs, LINQ, and the FOOP
extras.

**125. `a-deck-of-cards`: worlds.** The entry says "Worlds: game". The page
declares `game` and `your-own`, because the entry ends in "a card game of the
reader's own" and the style guide invites a "your own" variant where the task
does. Only the last task has variants; everything else is shared. The world
descriptions are written for this page ("On this page, two players and a game
of cards"). Keep that, give the page `game` only (a picker with one choice),
or no worlds at all, like the other explore pages?
- Now: `game` and `your-own`.

**126. `many-classes-one-promise`: the class chain.** The page makes no
version of a world's class, and its world tasks use compact stand-ins. Should
the chain gain an interface here (for example, the fourth version of
`Character` with `: IDamageable`), so that `objects-inside-objects` and the
later pages carry it? That would change the "so far" cells of every later
page.
- Now: stand-ins, each task saying "It is a smaller `Character` [`Probe`] than
  the one on *Inheritance*, with only what this task needs".

**127. `many-classes-one-promise`: multiple inheritance as a cell.** The
descriptor asks for "inheritance, single and multiple". The page says that C#
refuses two parent classes, and shows one parent with two interfaces, but it
does not run CS1721. Is a sentence enough for the exam's Section A, or do you
want a cell, with the cost of a class that does not compile (last on a page,
or followed by a rewrite)?
- Now: a sentence.

**128. `many-classes-one-promise`: default interface methods.** The page
defines an interface as having "no code of its own", the definition
`when-is-a-breaks` already gave, and a "Why this way?" fold says that C# 8
allows code in an interface. Keep the fold for the teacher who knows, or
remove it so that a Level 5 reader meets one clean definition?
- Now: the fold.

**129. "Is a" and "can do".** `many-classes-one-promise` uses both phrases to
choose between a parent class and an interface. Is "can do" a phrase you want
the course to use, beside "is a" and "has a" (`objects-inside-objects`)?
- Now: both are used. Microsoft's tutorial names "is a" and "can do" (see 51).

**130. `IComparable<T>` in two places.** Practice problem 4 on
`many-classes-one-promise` and problem 8 of `mixed-programming-with-objects`
are the same exercise with different classes (characters, moons). The mixed
one teaches it as if for the first time, with the same exception. Keep both,
or change the mixed set's problem (its hint could point back to the practice
page)?
- Now: both.
- Pages: `many-classes-one-promise`, `mixed-programming-with-objects`.

**131. `virtual-and-override`: `new` as a second meaning.** The map asks for
"`new` on purpose", so the page teaches that `new` in front of a method hides
on purpose, and says it is "the same word that makes an object, with a
different job". For a Level 5 reader in a second language, a keyword with two
jobs may confuse more than it helps, and learners rarely need it. Keep the
section, or cut it to one sentence under the warning (that removes a table row
and one pair of cells, leaving five)?
- Now: the section, which now defines *keyword*.
- Reviewer: keep it. It is short and the map asks for it.

**132. `namespaces-and-libraries`: two walk-throughs of a class library.**
This page moves the seventh version into a library, meeting CS0246, CS0122 and
CS0060. `your-world-playable` does it again with the eighth version and a test
project. Keep both (this one first, smaller, about the messages), or shorten
one to point at the other?
- Now: both.
- Reviewer: keep both. `your-world-playable` could point back to this page for
  the definitions and the messages (a change for that page).
- Pages: `namespaces-and-libraries`, `your-world-playable`.

**133. `namespaces-and-libraries`: the seventh or the eighth version.** The
map says this page uses the seventh version and leaves the chain alone, so the
task has no `Commands`, one page after the reader made it. Should the task use
the eighth version, so that the library built here is the one
`your-world-playable` needs?
- Now: the seventh, with one sentence that explains the missing `Commands`.

**134. `namespaces-and-libraries`: no "Compare with a solution" on the world
task.** Is a fold enough, or should the task change shape so that a solution
can work (for example, a small new class written in the namespace by the
reader, with the seventh version untouched)?
- Now: a fold.
- Reviewer: the fold is enough. A solution would run against the reader's
  global classes and show nothing.

**135. `namespaces-and-libraries`: `BigInteger` and 52!** It is the first type
outside the seven. Is a 68-digit number a good hook for your learners, or
would a plainer type (`StringBuilder`, which `compiler-errors` names) serve
better?
- Now: `BigInteger`.
- Reviewer: a good hook. It needs no new maths beyond multiplication, and 68
  digits against the 19 of a `long` makes the point.

**136. `namespaces-and-libraries`: the alias.** `using Path = Maps.Path;` is
Microsoft's own answer to a clash, and it is in the invitation and the
solution. Is it one idea too many at Level 5, beside the full name and a new
class name?
- Now: kept, with a definition ("a second name for one type").
- Reviewer: keep it, or cut the invitation's third way and the solution with
  it.

**137. `namespaces-and-libraries`: block-scoped namespaces.**
`namespace Maps { ... }` is not shown. Visual Studio's templates write the
file-scoped form, but older books, Microsoft's `Stopwatch` example and many
answers online use braces. Show it once, as code to read?
- Now: not shown.
- Reviewer: Microsoft's `Stopwatch` page, which the challenge sends the reader
  to, has examples in that form, so a short piece of code to read with braces
  could help there.

**138. `namespaces-and-libraries`: the documentation's English.** Microsoft's
lines use words such as *instance*, *represented*, *specified* and
*initializes*, in English only. The page explains *instance*, quotes three
lines and now glosses *represented by this instance* and *the specified
number*. Is that enough for a reader in their second language, or should the
page give a short list of the documentation's common words (*instance*,
*specified*, *represented*, *initializes*, *gets or sets*)?
- Now: the two glosses.

**139. `namespaces-and-libraries`: packages.** The descriptor's "class
libraries and packages" gets one paragraph and the menu name, not a
walk-through with a named package. Can your labs reach nuget.org, and do you
want the steps?
- Now: one paragraph.

**140. `two-names-one-object`: "Class or struct?"** This section is not in the
map's entry. Keep it, or cut the page to the map's experiment and two cases?
- Now: kept. Its second reading, Microsoft's *Structure types*, is the source
  for it.

**141. `two-names-one-object`: a struct that can change.** The page's
`Position` has public fields that can change, which Microsoft's documentation
advises against, and the page says so. The experiment needs a struct that can
change to show the copy. Is that acceptable to teach from, or should the page
end with a `readonly struct`?
- Now: as described.

**142. `two-names-one-object`: where its problems go.** The map says a closer
look's problems go into its tutorial's practice page, here
`objects-inside-objects-practice`. That page already leads into this one
(problem 1), and `mixed-programming-with-objects` problem 11 is a struct
problem. Should `objects-inside-objects-practice` gain a struct problem too,
such as the crew member as a struct (probe `crew-as-struct`, `100 100`) or a
`foreach` that tries to change a struct (CS1654, probe `struct-foreach`)?
- Now: none.
- Pages: `two-names-one-object`, `objects-inside-objects`,
  `mixed-programming-with-objects`.

**143. Rule 4 and a struct.** The style guide's rule 4 says "A class written
again further down replaces the earlier one", and `CLAUDE.md`'s rule 2 already
adds "So can an interface, a record, an enum or a struct".
`two-names-one-object` adds "and a struct with the same name does the same" to
rule 4. Should the rule's words say *a type* instead, on every page?
- Now: the addition on that page only.
- Pages: `two-names-one-object`.

**144. `two-names-one-object`: the picture.** No other closer look has one. It
uses the ink and the fonts of `the-mission-in-boxes.svg`, and no colour. At
390 px wide it is scaled to about 62%, so its 17 px labels are about 10.5 px;
they can be read, and the alt text says everything in the drawing. A version
with the two halves one above the other would keep the text near full size on
a phone, and be taller on a computer. Keep the picture as it is, stack it, or
drop it?
- Now: side by side.

**145. `two-names-one-object`: strings.** The page lists strings among the
reference types, with no word about why a string still behaves like a value
(it cannot be changed). `two-names-one-list` explains that, and this page
links there, but a FOOP reader from Python has not read it. Add one sentence,
or leave it to the link?
- Now: the link.

**146. `asking-a-list-a-question`: delegates by name.** The page teaches a
lambda as "a method with no name, written where it is used" and never says
*delegate* or `Func<Planet, bool>`. Is that enough for FOOP-LO8 (the class
library), or do you want the words on the page, perhaps in a fold?
- Now: no delegates by name.

**147. `asking-a-list-a-question`: deferred execution on an explore page.**
The last section (a sequence is a question, asked again each time it is read)
is the hardest idea on the page. It is there because it is the first thing
that surprises people who use LINQ. Keep it, move it into a fold, or leave it
out?
- Now: kept.

**148. `static` on a class.** `asking-a-list-a-question` explains
`static class` in two sentences, as `a-polynomial-class` does for a `static`
method, and `a-deck-of-cards` defines it in its closer look. No page before
them teaches it, though `a-front-end-for-a-class` has `static class Commands`.
Should a page teach it first, with the extras pointing there?
- Now: each extra explains it where it uses it.
- Pages: `asking-a-list-a-question`, `a-deck-of-cards`.

**149. `when-a-queue-never-clears`: four classes or one.** The entry names "a
`Customer` class and .NET's `Queue<T>`". The page has four classes
(`Arrivals`, `Customer`, `Till`, `Simulation`), to serve FOOP-LO6 and
FOOP-LO7. Is that the shape you want for this extra, or would you prefer the
simulation as one method over a `Queue<Customer>`, closer to dewlab's page and
shorter?
- Now: four classes.

**150. `when-a-queue-never-clears`: the formula.** The hockey-stick table
prints u / (4(1 − u)) beside the simulated wait, and says only that "a longer
calculation than this page has room for" gives it. Keep the column, move the
formula into a fold, or leave it out of a FOOP page?
- Now: the column.

**151. `when-a-queue-never-clears`: run length.** The hockey stick and the
groups run 200,000 steps (the checker ran the whole page in about 4.5 s),
because seed 1 is unusually high over 20,000 steps. The alternative is 20,000
steps with another seed chosen because it is close to the formula, which would
be quicker but hides the choice. Is 200,000 acceptable on the slowest machines
your classes use?
- Now: 200,000 steps. The reviewer says this is the one choice with a cost
  that a teacher would notice: the hockey-stick table and the groups cell each
  take a noticeable moment.

**152. `a-model-that-corrects-itself`: 0.05 or 0.125.** The page keeps
dewlab's learning rate of 0.05 and explains in a fold why it sometimes
disagrees with 0.5 in C#. The other choice is 0.125: every claim would then be
exact for every seed and the fold could go, but the reader would meet an
odd-looking number and lose the link to *Dividing*. Which do you prefer for a
FOOP extra?
- Now: 0.05. The reviewer counted over seeds 1 to 40: the mistakes on the test
  set, or the number of corrections, differ at the end for 29 of them (seed 1,
  the page's, is one of the 11 that agree), so the page now says before the
  fold that its rule is exact only with exact numbers.
- Reviewer: keep 0.05. 0.125 would print `0.63` and `0.13` at two decimals (a
  quarter of 2.50 is 0.625), so it is not neat; 0.25 prints neatly and is
  exact for every seed, but it is not "much smaller".

**153. `a-model-that-corrects-itself`: `ShapePair` does more than the page
explains.** `EveryPicture` and `TestSet` are code to read if you like: the
prose says what they give, not how each line works. Is that acceptable on an
extra, or would you rather have a fold that walks through `EveryPicture`
(doubling a list once for each pixel)?
- Now: no fold.
- Reviewer: acceptable on an extra.

### Sources and facts

What the pages say about the world, and where they send the reader.

**154. `a-chain-reads-a-book`: the book.** Two chapters of "The Boyhood of
Fionn" (1920): Irish, public domain, and dewlab's own world, but old-fashioned
English ("ere", "whither", "multitudinous") and an editor's bracket in the
first line. Keep it, or choose a passage that a reader of English as a second
language finds easier, such as *Treasure Island* or *The Time Machine* from
dewlab's other worlds?
- Now: kept, with "ere" and "whither" glossed in a sentence of their own.

**155. `a-chain-reads-a-book`: "public domain".** The page says the text's
copyright has ended. Stephens died in 1950, so in Ireland and the EU (70 years
after death) it ended in 2021, and in the United States (published 1920) in
2016. Project Gutenberg says only "public domain in the United States". Is the
page's plain sentence enough?
- Now: unchanged.

**156. `a-chain-reads-a-book`: a chatbot in the reading list.** dewlab's
3Blue1Brown video (*Large Language Models explained briefly*, about 8 minutes;
title and author confirmed) ties the chain to how a chatbot writes. Keep it on
a PDP page?
- Now: kept.

**157. `three-doors`: "people with doctorates".** dewlab says the readers who
wrote to vos Savant included "people with doctorates", and this page keeps the
claim, with the word explained. The column is from 1990 and has no free link.
Keep it, or replace it with a source a learner can open?
- Now: kept.

**158. `asking-a-list-a-question`: the Earth and Moon fact.** The `Sum` cell
tests a claim that is widely shared online (the other planets fit between the
Earth and the Moon; with these diameters the row is 387,941 km, longer than
384,400 km, so the last line is `False`). Is that fact welcome on the page, or
would you prefer a plainer total?
- Now: the fact, with a sentence that the real gap is surface to surface, so
  smaller still.

**159. `bits-that-flip`: the PPS number.** dewlab says the check letter of an
Irish PPS number "uses a similar idea" to a parity bit. It is one extra
character that catches a mistyped digit, but it is calculated with a weighted
sum and a remainder, not with parity. The review changed the sentence to "a
similar idea with a different calculation". Keep that, put back dewlab's, or
drop the sentence?
- Now: the review's sentence, which is a proposal that you can revert.

**160. `mixed-starting-in-csharp`: Voyager 1's distance.** The distance grows
by about half a billion km a year, so the numbers on the page drift. The page
now says "more than 25,000,000,000 km away, and it is farther away every day",
which stays true. Would you rather it used the real figure (26,000,000,000
km)? That changes the code of two cells and their recorded answers (about 24
hours; 48 and 27 years).
- Now: "more than 25,000,000,000 km".

**161. `virtual-and-override`: a Microsoft page with a wrong warning code.**
*Versioning with the Override and New Keywords* says that the compiler gives
CS0108 when a base class gains a `virtual` method with your method's name; it
gives CS0114 (probe `parent-gains-a-virtual-method`). The review dropped that
page from the reading list, because the reason is already in the prose and the
other Microsoft page shows an example. Leave it out, restore it with two
sentences that give the right code, or send Microsoft a correction through the
page's "Open a documentation issue" link?
- Now: left out.

### Ids, versions and words

**162. Versions bumped before any class used the page.**
`a-chain-reads-a-book` is 2026.10.02.1, `a-deck-of-cards` is 2026.10.01.1, and
`when-a-queue-never-clears` is 2026.09.28.2, each after cells changed in
writing or review. No learner has used any version, so each could go back to
`.1` if a page's first published version should end in `.1`. Reset them, or
leave them?
- Now: left as the usual bump gave them.
- Pages: `a-chain-reads-a-book`, `a-deck-of-cards`,
  `when-a-queue-never-clears`.

**163. The word *model*.** `when-a-queue-never-clears` defines *model* as a
simplified copy of something real, made to answer a question.
`a-model-that-corrects-itself` defines it as a rule that makes a decision from
some numbers. Each is defined where it first appears and fits its page, but a
reader who does both extras meets two meanings. Change one page so that there
is one?
- Now: two meanings.
- Pages: `when-a-queue-never-clears`, `a-model-that-corrects-itself`.

### The page and the checker

**164. Compare with a solution, for programs that read input.** The comparison
runs with no input (`stdin: ''`), so a task whose cell reads input has a
solution to read and no comparison table. Should the comparison pass the
cell's `stdin:` header, or the lines the reader typed on their last run, so
that these tasks can have an `inputs` block? It is a change to
`web/page/lesson.js` and the format.
- Now: a solution to read, with no table.
- Pages: `reading-input` (all six of its "your turn" tasks),
  `mixed-first-programs` (problems 5, 7 and 9), `mixed-classes-and-objects`
  (problem 6).
- Reviewer (`reading-input`): a page change, not a lesson change. The cell's
  `stdin:` would give every reader the same table; the lines the reader typed
  would compare their own run.

**165. Solutions that sit above the paragraph that asks the question.** The
page puts a cell's hints and solutions directly under the cell, wherever the
Markdown puts them. So under the experiment's program on
`virtual-and-override`, the folds "A hint" and "A solution" come before "Run
it. It prints ...", and the solution answers a question that the page asks six
paragraphs later. Both folds are closed, and the hint waits for two runs. Is
that acceptable on a closer look, or should the format let a solution sit
where the question is?
- Now: each solution has a title that names the task without giving the
  predict away. The only fix inside a page is an eighth cell, the same program
  again under the question, which makes the page size M and shows the program
  twice.
- Pages: `virtual-and-override`, `when-is-a-breaks` (the same layout),
  `many-languages-one-idea` (the BASIC task's question had to be moved before
  its cell, because on the page the solution block comes straight after the
  cell), `asking-a-list-a-question` (the `OrderBy` solution, which has a
  `title:` for this case).

**166. Colours for code in other languages.** A page whose subject is other
languages would read better if it could show them in their own colours.
`web/lesson/parse.js` accepts only `csharp`, `python`, `console` and `text`
for code to read, so SQL, JavaScript, BASIC and Ruby are `text` fences, shown
without colour; `docs/LESSON_FORMAT.md` says the same, so it is the contract.
Is it worth a change to the format, the parser and the editor bundle's
language modes?
- Now: no colour.
- Pages: `many-languages-one-idea`.

**167. A browser that cannot pause a program.** There, a cell that reads input
shows a box for the answers in advance (`web/page/cell.js`, `typedBox`), and
there is no **End input** button: the input ends after the last line written.
`reading-input` assumes the live box ("the program waits for as long as you
take", "press **End input**"), and the cell that is meant to stop with a
`NullReferenceException` needs the box left empty, not a button. The other box
has a label of its own that says what to do. Is one sentence on the help page
enough, or should a lesson that reads input say so?
- Now: nothing on the lesson.
- Pages: `reading-input`.

**168. `dotnet build` and the page after an error in a using line.** The
page's engine reports every message, as IntelliSense does, and `dotnet build`
stops after the using line's error. With the using line moved to the end of
`a-type-the-compiler-cannot-find-2`, the page shows CS0246 and CS1529, and the
downloaded project, built, shows CS1529 only. The fold describes the page,
where the reader tries it. Is the difference worth a sentence, or a line in
`docs/ENGINE_API.md`?
- Now: neither.
- Pages: `namespaces-and-libraries`.

## Not questions

Faults: the ten the notes reported were fixed on 28 September 2026 (see
the git log; each fix in code has a test): Download project keeps the types of a cell
that a later cell replaces only in part; `int class = 1;` stays in its
cell; the help under CS0103 calls a method a method; the checker records a
program cell as **Run** runs it, and keeps an exception's `inner`; the
status line names warnings for a screen reader; three hints now wait for
two runs; the sentence about stopping at 255 in
`storing-and-computing-practice` no longer promises what `making-decisions`
doesn't show; the native checker shows a dictionary. "Allowed names" in
`storing-and-computing-practice` can go back to first place if you want it
there.

One fault the new pages found is not fixed: the editor colours the text of a
raw string literal (`\"\"\"...\"\"\"`) as if it were code, as in `a-real-book-1` on
`a-chain-reads-a-book`. Compiling is not affected. The fix is in the vendored
editor bundle (`npm run vendor`).

Seen on the newer pages:

- `the-game-of-life`: output written before `Thread.Sleep` does not appear
  until the next write, so an animation shows nothing during each sleep.
  `web/engine/worker.js` posts output at most every 25 ms, and only when the
  program writes again, clears, asks for input or ends. In Visual Studio the
  same loop animates. The page steps with Enter instead.
- `types-and-their-sizes`: the engine's `(int)` of a `double` too large for an
  `int` gives -2147483648 (so do `(int)-3e9` and `(int)double.NaN`), where
  `dotnet run` on .NET 10.0.12 (x64 Linux) printed 2147483647, -2147483648 and
  0. C# leaves the result unspecified outside a `checked` context, so both are
  C#, but a downloaded project can print a different number from the page. The
  page and its practice page avoid the case. `docs/LESSON_FORMAT.md` or
  `docs/TRANSLATING.md` could list it as a pitfall for authors.
- `types-and-their-sizes`: comment lines in the data-dictionary solutions (up
  to 111 characters) wrap in the editor, so their columns do not line up on a
  narrow screen. They line up in Visual Studio. One variable to a two-line
  comment block would fix it, if it matters.
- `leaving-it-to-chance`: the first cell prints "Press End input to stop.",
  which names the page's button. A downloaded project shows the same text in
  Visual Studio, where there is no such button. The Visual Studio paragraph
  gives Ctrl+Z, and changing the cell would change its recorded output.
- `compiler-errors`: line 76 says that its cells use only what the earlier
  pages have met, "`Console.WriteLine` and `Console.ReadLine`". For a FOOP
  reader the earlier page is `from-python-to-csharp`, which names
  `Console.ReadLine()` only in its table, and the question on that cell sends
  the reader to *Variables and types* for `int.Parse`, which a FOOP reader has
  not read. The cell works, since the page explains `ReadLine` where it uses
  it.
- `many-classes-one-promise` and `objects-inside-objects`: one writes
  `class Astronaut : CrewMember, IScientist, ICommander` and the other
  `class Astronaut : ICommander, IScientist`. Both are true where they stand,
  but a reader who compares them may ask where `CrewMember` went. The second
  page could name it, or say "for example".
- `mixed-classes-and-objects` and `mixed-starting-in-csharp`: both list the
  kinds of problem, with different words for **Fix**. The second reads "find
  why a program does not compile, or does something that nobody meant", and
  the first can take that wording.
- `a-front-end-for-a-class`: writes "**Add**, then **Existing Item**", where
  `testing-what-a-class-does`, `namespaces-and-libraries` and
  `your-world-playable` write "**Add** > **Existing Item**". The page whose
  steps the others repeat should agree with them.
- `a-front-end-for-a-class`: still names *Namespaces and class libraries* in
  italics (in the `Form1.cs` notes), with no link, though that page is in
  `lessons/`.
- `objects-inside-objects-practice`: problem 1's fold names *Two names, one
  object* in italics, with no link.
- `putting-things-in-order`: names *Types and their sizes* in italics, with no
  link.
- `when-a-queue-never-clears`: ends with *The perceptron* in italics, with no
  link.
- `namespaces-and-libraries`: Visual Studio on a college PC, never walked (the
  steps were checked with the .NET command line): the menu names (**Add** >
  **New Project**, **Add** > **Existing Item**, **Dependencies** > **Add
  Project Reference**, **Set as Startup Project**, **Project** > **Manage
  NuGet Packages**); that the Error List shows one CS0246 naming the namespace
  before the reference is added, and how many messages it shows with its
  filter on **Build + IntelliSense** and on **Build Only**; and where Visual
  Studio keeps `<name>.GlobalUsings.g.cs`.
- `reading-input`: in a Windows console, whether a `ReadLine` after the one
  that Ctrl+Z and Enter ended returns `null` at once or waits for typing
  again. The page says only that Ctrl+Z makes `ReadLine` return `null`, and
  limits "every later `ReadLine` returns `null`" to **End input** on the page.
- `two-names-one-object`: that in Visual Studio the pointer over a type shows
  `class` or `struct`, and that F12 opens the type's file.
- `many-languages-one-idea`: open
  <https://rosettacode.org/wiki/Averages/Arithmetic_mean> once (the site
  answered a script with a check for robots, not the page), and check the Ben
  Eater video's year (2015) and length ("ten minutes").
- `counting-darts`: dewlab's descriptions of the AlphaPhoenix video ("four
  minutes", sensors "shaped to do the same job") and of Metropolis and Ulam
  ("problems that nobody could solve in any other way"). YouTube refused the
  request, so none of it was seen.
- `three-doors`: the Numberphile video's year (2016), copied from dewlab;
  YouTube refused the page.
- `a-function-that-calls-itself`: the Reducible video's length (about
  twenty-one minutes).
- `mixed-programming`: the video's year. The entry gives none, unlike the
  other pages' videos.

Checks only you can make:

- Visual Studio on a college PC, never walked:
  `a-front-end-for-a-class` (View Code, Add > Existing Item, Show all
  settings, Deployment Mode, the `.exe`, `object? sender` or
  `object sender`); `documenting-a-class` (hover shows `<returns>`, `(`
  shows `<param>`, what `///` writes); `from-a-description-to-classes` (the
  line *Generate method* writes); `from-cells-to-a-program` (the Call
  Stack's `Program.<Main>$`, the namespace Add > Class writes, Ctrl+Z then
  Enter ends input, the CS8802 text); `when-it-goes-wrong` (a breakpoint in
  a local method, Locals, F11 into `AverageWordLength`);
  `the-tools-around-your-code` and `testing-what-a-class-does` (keys and
  menus); `your-world-playable` (Add > New Project, Add Project Reference,
  Set as Startup Project, Test Explorer, that the Error List shows CS0246
  for `Character` or `Lander` first, that it offers `Assert.IsTrue` for
  `Assert.AreEqual(true, ...)`, and that the published folder holds the
  library's `.dll`).
- With a screen reader: how a key that is a space (`' '`) reads on
  `looking-things-up-by-name`; a full pass of `critique-and-reflection`,
  which has no cells.
- Video details carried from dewlab that could not be checked from here:
  lengths on `a-program-of-your-own` (DevDuck), `critique-and-reflection`
  (Tantacrul on Sibelius) and `the-team-project` (Tantacrul, "How We
  Designed Audacity 4", with its year); years on `lists-and-sequences`
  (Reducible), `looking-things-up-by-name` (SimonDev), `making-decisions`
  (Stand-up Maths), `repeating-yourself` (Veritasium); notes and years on
  `putting-things-in-order` (Computerphile, Polylog).

For dewlab, found while porting:

- `testing-what-a-class-does`: dewlab's challenge has no answer; with the
  submarines, no single test finds D alone.
- `storing-and-computing-practice` problem 7, "Cutting, or rounding":
  dewlab's answer says rounding gives −4, which is true of rounding down,
  not of rounding to the nearest number.
- `mixed-programming` problem 6: dewlab says taking the €5 off after the
  10% "costs the customer more". Without the €50 limit it costs them less
  (0.9x − 5 is below 0.9(x − 5)). `mixed-first-programs` gives another
  reason for the order.
