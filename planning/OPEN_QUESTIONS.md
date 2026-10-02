# Open questions

This file gathers the questions in the porters' notes (`planning/notes/`)
that only you can settle: 62 of them, merged across pages and grouped by
theme, with the ones that touch the most pages first. Every page works as it
stands, with the default given under *Now*, so nothing here blocks a class.
Answer by number ("3: yes, 7: the second one"); a question left unanswered
keeps its default, and the last section lists faults and checks that need no
answer.

## Across both courses

**1. Which Visual Studio, and on which computers?** Which version is on the
college PCs, and can the steps assume learners have Windows at home (course
map question 11)?
- Now: every set of steps names Visual Studio 2022 on Windows (Extract All,
  Ctrl+F5, F5, F9, F10, F11), and Windows Forms needs Windows. The
  downloaded project's `README.txt` also gives `dotnet run`.
- Pages: `a-program-of-your-own`, `the-tools-around-your-code`,
  `from-cells-to-a-program`, `when-it-goes-wrong`, `the-team-project`,
  `testing-what-a-class-does`, `documenting-a-class`,
  `a-front-end-for-a-class`, `your-world-playable`.
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
- Now: the game first everywhere. `one-class-many-methods` has the same mix
  and settled on the game first.
- Pages: `from-a-description-to-classes`, `keeping-details-inside-an-object`,
  `the-moves-you-already-know`.
- Porter (`the-moves-you-already-know`): opening in the game would need a
  new opening problem.

**6. Where *Compiler errors* sits** (course map question 12). The synthesis
made compiling the first lesson; the map puts it fourth in PDP, after the
reader has types to get wrong. Confirm?
- Now: fourth. `first-steps` meets one error and names compiling in a
  paragraph.
- Pages: `compiler-errors` (not written), `first-steps`.

**7. One copy of each class** (course map question 2). Long classes are
copied in full from cell to cell and page to page. Add
`{{include: <file>}}` for a types cell so each version lives once, let a
cell fold its unchanged methods, or cut stages?
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
  `objects-inside-objects`, `objects-and-classes`.
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

**13. Programs that use chance, and the checker.** A cell whose output
depends on `Random` cannot be checked with `stdin:`. Write down (a) "a cell
that uses chance has no `stdin:` and stops at `null`", or add (b) an
`output: varies` header that compares only the outcome (a change to the
format, the parser and the checker)?
- Now: (a), unwritten. `from-cells-to-a-program`'s Release 1 uses a fixed
  `int shift = 3;` where the map has `Random.Shared`.
- Pages: `finding-things`, `from-cells-to-a-program`, `reading-input` (not
  written; "a loop that asks again").
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

**17. `} while (x);` on the brace's line, or `while` on a line of its
own?** The style guide puts each brace on its own line; `dotnet format`
accepts both.
- Now: `} while` in `a-front-end-for-a-class` (and its practice page) and
  `your-world-playable`; `while` on its own line in
  `a-program-of-your-own`, `finding-things`, `the-moves-you-already-know`.
- Porter: `} while`, Microsoft's reference form.

**18. Lambdas in PDP** (course map question 5). Show a lambda once as code
to read, leave them all to the extra `asking-a-list-a-question`, or keep to
named methods?
- Now: `putting-things-in-order` passes a named method
  (`Array.Sort(words, ByLength)`), in the lesson and practice problems 12
  and 13. `how-we-got-here` shows `number => number % 2 == 0` and
  `Func<int, bool>` once, as code to read, and its practice problem 15 runs
  `Select(number => number * 2)` in a cell the reader rewrites as a loop.
  The reader never writes a lambda.
- Pages: `putting-things-in-order`, `how-we-got-here`.
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
- Now: kept, one bracketed sentence each, and in some practice folds.
- Pages: `objects-and-classes`, `one-class-many-methods` (practice folds 3,
  9 and 10), `keeping-details-inside-an-object`,
  `from-a-description-to-classes`, `one-parent-many-children`.

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
- Now: not mentioned.
- Pages: `one-class-many-methods`; a change to version 3 changes
  `one-parent-many-children` too.

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
- Now: both keep dewlab's order.

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

The 26 pages written after this list was made (the new class pages, the mixed
sets and the explore pages) have their open questions in
`planning/notes/<id>.md`, under "Open" and "Review". They are not merged into
the numbered list above.

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
