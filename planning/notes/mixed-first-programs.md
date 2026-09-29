# mixed-first-programs: notes for a reviewer

A new page, written on 28 September 2026 from the course map's entry (PDP
lesson 13, the last page of the series "First programs"). Action *new*,
shape *mixed set*, size M, batch 5, no worlds. A mixed set has no practice
page ("Practice pages and mixed sets" in `planning/COURSE_MAP.md`), so
there is one page. `from: mixed-programming` names the main source: four of
its problems are the core of this page.

Files:

- `lessons/mixed-first-programs/mixed-first-programs.md`: the page,
  version `2026.09.28.2`. Version `.1` was recorded once; then the output
  text of `threes-and-fives-1` changed ("adding up to" became "with a total
  of", to lose a phrasal verb), so the version went up. The review made it
  `2026.09.28.3` (see "Review").
- `lessons/mixed-first-programs/mixed-first-programs.outputs.json`, written
  by the browser checker.

The page has 9 problems and 10 exec cells, all of them program cells
(`Program.cs`; no classes, no `var`, every type written). 3 predicts (all
`choice`), 16 hints, 10 solutions (two problems have two tiers), 3 `inputs`
blocks, 5 answer folds, 1 hint fold (the table of pages), 1 challenge.
3 cells are meant to fail, and the problem says so before the reader runs
them: `tickets-for-a-group-1` (`expect: CS0103`), `tickets-for-a-group-2`
(`expect: CS0165`) and `a-calculator-1` (`expect: exception`). 3 cells read
input and have `stdin:`; none of them has an `inputs` block. No cell warns.

`npm run check-lessons -- mixed-first-programs` reports no problems
(24 runs). I also opened the page in headless Chromium
(`npm run serve -- --port 8743 --isolate`,
`lesson.html?sw=off&id=mixed-first-programs`): no page errors, every cell
labelled *program* and `Program.cs`, and the table in the last fold renders
with working links.

## What the page does, in order

An opening of three short paragraphs says what a mixed set is (each
problem needs more than one page, and none says which), that many problems
hide a decision the question does not make, and that a comment is where a
decision is recorded. It says that some cells are meant to fail, and it
gives rule 1 in the style guide's words, without the word "rule" (early PDP
pages need only rule 1).

| # | Problem | Cells | What the reader does | Draws on | From |
|---|---|---|---|---|---|
| 1 | Six lines | `six-lines-1` | writes a guess beside each of six lines (`7 / 2`, `7 / 2.0`, `-7 / 2`, `"7" + 2`, `'7' + 2`, `(int)7.9`), runs, opens a fold | first-steps, storing-and-computing, dividing, types | the warm-up of `mixed-instructions-for-a-machine` (problem 1: `7 // 2`, `7 / 2`) |
| 2 | Even, odd and zero | `even-odd-and-zero-1` | counts in a loop from -3 to 6; `inputs` | decisions, loops, dividing | `mixed-programming` 1 |
| 3 | FizzBuzz | `fizzbuzz-1` | predicts the last line of a program whose tests are in the order 3, 5, 15; changes the order | decisions, loops | `mixed-programming` 4; the order of checks in `mixed-decisions-and-logic` 7 (the wind warning) |
| 4 | Threes and fives | `threes-and-fives-1` | writes the loop; `inputs`; then tries 100,000 and meets an `int` total below zero | loops, decisions, types | `mixed-programming` 5 |
| 5 | Tickets for a group | `tickets-for-a-group-1`, `-2` | fixes the first message (CS0103), then meets a second one (CS0165) that the first hid, and decides what 0 tickets costs | compiler errors, decisions, reading input | the entry's "a compiler message that hides a second one" |
| 6 | The time, some hours ago | `the-time-some-hours-ago-1` | predicts the last line of a clock loop whose `+ 24` fix fails past a day; makes it work for any number of hours | dividing, loops, storing-and-computing | the entry's "a remainder below zero" |
| 7 | Two discounts | `two-discounts-1` | adds two discount rules to a till that reads input, in `decimal` | decisions, types, reading input | `mixed-programming` 6 |
| 8 | Bright pixels | `bright-pixels-1` | predicts a count kept in a `short` (the author "saved memory"), which prints -32768; chooses a type; `inputs` | types (data dictionary), loops, decisions | the entry's "a type that is too small for its value"; the counting in `mixed-loops-counting-and-chance` 8 |
| 9 | A calculator that checks what it is given | `a-calculator-1` | runs a trusting calculator into a `DivideByZeroException`; plans (as comments) and writes one that checks; lists test data | reading input, exceptions, decisions | the entry's "a calculator that checks its input"; "the line that failed and the line responsible" of `mixed-instructions-for-a-machine` 12 |

Then a closed fold, *which pages each problem draws on*, with a link to
each page (for a teacher, or a reader who is stuck), and the usual close:
a question in "Looking back", a challenge (guess my number), the next page
([Methods](lesson:writing-your-own-functions)), Visual Studio, and three
things to read or watch.

## What I decided, and why

- **Which problems.** The entry names six things and four problems of
  `mixed-programming`; two of the six are the same as two of the four
  (even, odd and zero; FizzBuzz). So the page has those eight, plus a
  warm-up. The four `mixed-programming` problems keep dewlab's cell ids
  (`even-odd-and-zero-1`, `fizzbuzz-1`, `threes-and-fives-1`,
  `two-discounts-1`), so a teacher can compare the two pages. Everything
  else in `mixed-programming` needs methods, lists, dictionaries or
  sorting, which PDP meets in the next series; its own mixed set,
  `mixed-programming`, is where they belong.
- **No methods.** dewlab's four problems are functions with `inputs`
  (`parity_counts(numbers)`, `fizzbuzz(n)`, `to_pay(total, loyalty)`). A
  PDP reader here has not met methods, so each is a program: a loop over a
  fixed range with `inputs` on its variables (problems 2 and 4), a loop
  that prints its own table (problems 3 and 6), or a program that reads
  input (problems 5, 7 and 9). Reading input rules out an `inputs` block
  (the checker refuses it, and Compare runs with no input), so problems 5,
  7 and 9 have solutions to read and no comparison table. I kept `inputs`
  wherever a problem did not need input.
- **Mixed, and not labelled.** Each problem needs at least two pages, and
  its title never names a page or an idea ("Bright pixels", not "A type
  too small"). The table of pages is at the end, in a closed fold, so it
  does not tell a reader before they try. The FOOP mixed set
  (`mixed-programming-with-objects`) has no such table; I added one
  because the style guide asks that a teacher see at once what a page
  teaches, and a mixed set's own premise hides that. See "Open", 2.
- **Not the same problems as the practice pages.** Several ideas here are
  already problems on earlier practice pages: a remainder below zero
  (`first-steps-practice` 5), an odd number below zero
  (`making-decisions-practice` 17), `&&` protecting a division
  (`making-decisions-practice` 12), "three or seven"
  (`repeating-yourself-practice` 14), 13! in an `int`
  (`repeating-yourself-practice` 6), the order of `else if` tests
  (`repeating-yourself-practice` 21). So each problem here puts the idea
  inside a task about something else, where the reader has to see that it
  applies: the negative remainder is inside the counting of problem 2 and
  the clock of problem 6; the order of tests is the whole of FizzBuzz;
  overflow comes from a type chosen to "save memory" (problem 8) and from
  the reader's own threes-and-fives program at 100,000 (problem 4's
  fold); `&&` protects nothing new, but the calculator's solution uses it.
- **Problem 6 goes past the closer look.** `dividing-in-csharp` already has
  "2 o'clock, 5 hours earlier" and its `+ 24` fix, and says that the fix
  "works when `hoursBack` is 24 or less". So problem 6 starts with that fix
  already in the code, and a loop that goes back 48 hours in steps of 12.
  The reader predicts the last line, and needs the two-`%` form that
  `storing-and-computing`'s solution note gave for "a shift of any size".
- **Problem 5's hidden message.** I probed four ways to hide a message
  (below). CS1002 and CS0029 did not hide CS0165: the compiler reported
  both at once. A misspelt name did, because with `prise` on the last line
  no line reads `price`, and the compiler checks a variable's value only
  at a line that reads it. That is a true story a learner can use ("a new
  message after one change can mean that the compiler now sees further"),
  it is different from `compiler-errors-practice` 2 (where a missing `;`
  hid a type error), and it joins three pages: compiler errors, every path
  of an `if` (`making-decisions`), and asking again (`reading-input`).
  Two solutions: an `else` (it compiles, but gives a price to -3 tickets,
  which the note calls a decision too) and asking again with the
  `reading-input` shape (`makesSense`, `do`...`while`).
- **Problem 7's decisions.** dewlab's solution note says the €5 comes off
  after the 10%, "which costs the customer more". Without the €50 limit,
  the €5 after the 10% costs the customer *less* (0.9x − 5 is less than
  0.9(x − 5)). So my note gives a different reason (the question says "a
  further discount") and says that taking the €5 first would make the 10%
  a little smaller. See "For other files", 3. Money is a `decimal`, as
  `types-and-their-sizes` said it should be; `decimal.Parse` is new, and
  the problem says in one sentence that it works as `int.Parse` does. A
  hint names CS0019, the message for `toPay * 0.9` (probed).
- **Problem 8's type.** A `short` that overflows by exactly one
  (32768 bright pixels in a 256 by 256 gradient) prints -32768. The story
  is a data dictionary that chose a small type to save 2 bytes, the choice
  `types-and-their-sizes` warned about ("For five variables, the memory
  saved is too small to matter"). The predict's fourth option, "It does not
  compile", is the distractor a careful reader chooses, because
  `red = red + 1` on a `byte` did not compile; a fold explains why `++`
  compiles (probed: `count = count + 1` on a `short` is CS0266, and `+=`
  and `++` overflow to -32768). The solution prints `short.MaxValue`, so
  that the note's 32767 is recorded (decision 29).
- **Problem 9's size.** The calculator is 23 lines, and its solution 38.
  That is long for this course, but it is the series' largest program, it
  is last, and its shape (a `switch` with `default`) is the menu of
  `reading-input`. The solution checks once and says what it wanted,
  rather than asking again, because asking again for two numbers needs the
  same loop twice, and the note uses that to point to methods, the next
  page. The problem asks for a plan as comments first (PDP-LO6: pseudocode)
  and ends with test data (PDP-LO10, and skills demonstration 1).
- **The starter's `stdin:` in problem 9** is `12`, `/`, `0`, so that the
  `DivideByZeroException` the prose names is recorded (line 19). The
  prose invites the reader to try `twelve` and `7 / 2` too, and describes
  what the solution decided for them; the fold's "7 / 2 gives 3.5, where
  two `int` values give 3" is recorded in problem 1.
- **Three predicts**, each on one line and each with the output itself
  among its options: FizzBuzz's last line (`Fizz`), the clock's last line
  (`48 hours before 2:00, it was -22:00.`), and the bright-pixels line
  (`Bright pixels: -32768`). Problem 1 uses `// I think:` comments, as
  `storing-and-computing` and `making-decisions` do, not a predict block,
  because it asks about six lines at once.
- **Hints wait for runs** on every task whose starter runs (`after: 2
  runs`, `after: 3 runs`, `after: guess differed`); `after: 1 errors` and
  `after: 2 errors` only where the starter is meant to fail, or where the
  hint names the message a reader is likely to meet (CS0019 in problem 7).
  Each problem's first hint asks a question.
- **The challenge** is guess my number, the dewlab game that the course
  map says becomes "one program, usually a loop that reads input". It uses
  `Random.Shared.Next(1, 101)`, which no PDP page has met yet; the prose
  says what it gives and that the 101 is not included. Probed: the
  checker compiles the challenge alone, and a probe ran the `Random` line.
- **Words.** I removed the phrasal verbs "add up to", "leave out" and an
  idiom, "plenty of room". Terms defined where they first appear on this
  page: *multiple*, *discount*, *loyalty card*, *operation*, *test data*,
  and a one-line reminder of *data dictionary*. The three outcomes use the
  style guide's words.

## Where each number and quoted output comes from

Every number and every quoted output in the prose, folds, hints and
solution notes is in `mixed-first-programs.outputs.json`:

- Problem 1's fold: 3, 3.5, -3, 72, 57, 7 (`six-lines-1`).
- Problem 2: `even 5, odd 5, zero 1` (the solution's output and values).
- Problem 3: the last line `Fizz`, and no `FizzBuzz` anywhere
  (`fizzbuzz-1`); `FizzBuzz` as the last line of both solutions.
- Problem 4: 466 and 233168 (the solution). The fold about 100,000 gives
  no number; a probe recorded 46666 and -1961650628.
- Problem 5: `4 tickets cost €40.` (both solutions, `stdin: "4\n"`); the
  messages CS0103 and CS0165 (both cells).
- Problem 6: `-10:00` and `-22:00` (`the-time-some-hours-ago-1`); 14:00
  for 36 hours and for 12 hours (the solution and the cell).
- Problem 7: `To pay: €49.00` (the solution, `stdin: "60\ny\n"`).
- Problem 8: -32768 (the cell); 32768 and 32767 (the solution, which
  prints `short.MaxValue` for that reason).
- Problem 9: `DivideByZeroException` at line 19 (the cell's exception);
  `A number cannot be divided by 0.` (the solution).

Claims that no cell on the page records, each probed in a scratch lesson
with the browser checker (`node tools/check-lessons.mjs --lessons <scratch>
--write`): CS0019 for `decimal * double` (problem 7's hint); CS0266 for
`count = count + 1` on a `short`, and `+=` and `++` giving -32768 (problem
8's fold); a `FormatException` for `twelve` (problem 9's prose names none,
only invites the reader); infinity for a `double` divided by 0 (problem 9's
note, which gives no number); an `int` total below zero at 100,000 (problem
4's fold).

## Probes

A scratch lesson in the session's scratchpad, run through the browser
checker:

| Probe | Result |
|---|---|
| tickets program with `prise` | only CS0103 (12,31): `price` is never read, so no CS0165 |
| the same with `price` | CS0165 (12,31) |
| the same with a missing `;` on line 6 | CS1002 and CS0165 together: a syntax error does not hide it |
| the same with `int tickets = Console.ReadLine();` | CS0029 and CS0165 together |
| a variable made inside a `for`, read after it, and a misspelt name | two CS0103, one for each |
| calculator with `int`, `12 / 0` | `DivideByZeroException` |
| calculator with `twelve` | `FormatException` at line 2 |
| `7 / 2` with `int`; `7.0 / 0`, `-7.0 / 0`, `0.0 / 0` | `3`; `∞ -∞ NaN` |
| `short` count of 32768 | -32768 |
| threes and fives below 100,000 in an `int` | 46666 numbers, total -1961650628 |
| `-3..6` with `% 2 == 1` for odd | 3 odd, where `!= 0` gives 5 |
| `decimal`: `3m - 5`, `Math.Max(0, 3m - 5)`, `49.95m * 0.9m` | -2, 0, 44.955 |
| `short s; s = s + 1;` | CS0266 |
| `short s = 32767; s += 1;` and `s++` | -32768 both |
| `decimal toPay; toPay * 0.9` | CS0019 |
| the discounts starter, with `loyaltyCard` unused | runs, no warning (its value is not a constant) |
| `double.TryParse` calculator with `7 / 2` | `7 / 2 = 3.5`; `12.0 / 0` prints ∞ |
| the calculator with no input | `double.TryParse(null)` is `false`; `switch (null)` reaches `default` |
| `Random.Shared.Next(1, 101)` | compiles and runs |

## What I left out

- `mixed-programming` problems 2, 3 and 7 to 20: they need methods, lists,
  dictionaries, sorting or searching, which come in the next series and
  in PDP's second mixed set.
- From the three Dewey Track mixed sets: everything built on their
  toolkits (`digit_at`, `to_binary`, `truth_table`, `same_rule`,
  `simulate`), the seven-segment display and pixel font, the
  password-strength checker, logarithms, probability, De Morgan's laws,
  XOR and parity. None of these is in dewsharp's PDP. I took ideas, not
  problems: the warm-up of six lines, the order of tests (the wind warning),
  a count that overflows (counting passwords), and "the line that failed
  and the line responsible" (the number from a web form).
- "Goals and points" (the GAA score, `mixed-instructions-for-a-machine`
  18): written in my plan as a tenth problem (read two scores, compare
  them), and dropped to keep the page near an hour. It would suit a
  practice page, or a class that wants more.
- "750 or 1250" (a value is calculated when its line runs,
  `mixed-instructions-for-a-machine` 6): close to the assignment
  experiment of `equals-three-ways`, and left out for size.

## For other files (not done here: the brief allowed only these two)

1. **`courses/pdp.yaml`** still lists `mixed-first-programs` under
   `planned:`. The lesson now exists, so its own title is used and the
   line can go (`docs/TRANSLATING.md`, checklist). The checker did not
   complain.
2. **`lessons/reading-input/reading-input.md`**, "Looking back", names
   this page in italics without a link: "*Mixed problems: first programs*
   in Programming and Design Principles". Batch rule 3 has the author of
   this page add the link; the brief did not allow editing other lessons.
   The text could become
   `[Mixed problems: first programs](lesson:mixed-first-programs)`.
3. **dewlab's `mixed-programming`, problem 6** says the €5 after the 10%
   "costs the customer more". Without the €50 limit it costs them less.
   dewlab is read-only here; this is for whoever looks after it.

## Open

Questions only Josh can settle:

1. **Size.** Nine problems and ten cells is inside the course map's M (8 to
   15 cells), but problem 9 alone is a 23-line program with a 38-line
   solution. For a Level 5 class, is this an hour, or should problem 9 be
   set as homework, or split into two problems (check the numbers; then
   check the division)?
2. **The table of pages at the end.** A mixed set does not say which page
   a problem needs, and the FOOP mixed set has no such table. I added one,
   in a closed fold at the very end, for teachers and for a reader who is
   stuck. Keep it, move it to the teachers' page, or drop it?
3. **The remainder below zero, again.** The course map asks for "a
   remainder below zero", and it is already a problem on four earlier
   pages. Here it is hidden inside problems 2 and 6. Is that the right
   amount, or is a sixth meeting too many?
4. **New names in a mixed set.** `decimal.Parse` (problem 7) and
   `Random.Shared.Next` (the challenge) are new, each explained in one
   sentence. A mixed set is meant to use only what the series taught. Are
   these two acceptable, or should problem 7 use `double.Parse` (met on
   `storing-and-computing`) and keep money in a `double`, against the
   advice of `types-and-their-sizes`?
5. **Compare with a solution for input.** Problems 5, 7 and 9 read input,
   so they have solutions to read and no comparison table. This is the
   same question as open question 1 in `planning/notes/reading-input.md`:
   should Compare pass the cell's `stdin:`, or the reader's last input?
6. **"Error trapping" and "test data".** Problem 9 is the closest thing in
   the series to PDP's skills demonstration 1 (types, input and output,
   operators, selection, iteration, test data). Should the page say so, for
   teachers, or is that for the teachers' page?

## Review

Reviewed on 28 September 2026 with fresh eyes: once as a Level 5 learner
who has read only the pages before this one in "First programs" (from
`first-steps` to `reading-input`), once as a teacher against the course
map's entry, and then line by line against the checklists in
`docs/TRANSLATING.md` and the style guide.

The page does what its entry asks. All six things the entry names are
here (even, odd and zero; FizzBuzz; a calculator that checks its input; a
type too small for its value; a compiler message that hides a second one;
a remainder below zero), with two tiers of solution on FizzBuzz and on the
tickets. Every term is either defined on this page where it first appears
or defined on an earlier page of the series, with the same word: *overflow*
and *data dictionary* (`types-and-their-sizes`), *path* and *condition*
(`making-decisions`), *body* (`repeating-yourself`), *flag*, *prompt*,
*test data* and **End input** (`reading-input`), *infinity*
(`reading-an-error-message`), *unassigned* and "the line reads the
variable" (`compiler-errors`). Each cell works on its own (rule 1 only, and
never the word "rule"). Every predict names its line or is about a cell
with one line of output; every predict has the recorded output among its
options; each cell meant to fail has `expect:` and prose that says so
before the run; solutions and `inputs` sit on the cell that runs; no cell
that reads input has `inputs`. The two outside sources were checked: the
Microsoft page does end with "the sum of all integers 1 through 20 that
are divisible by 3", and the video's title and channel match (YouTube's
own oEmbed; the video itself was not watched).

### What I changed in the page

One cell changed: the starter comment of `even-odd-and-zero-1`, from
`// Count number here.` to `// Count this number here.`, which read as a
broken sentence. So `version:` went from `2026.09.28.2` to `2026.09.28.3`,
and the page was recorded again with `--write`. The new outputs file
differs from the writer's only in its `version` line: every output is
the same, so every number the prose quotes still holds.

Prose, all checked against the outputs file after the change:

1. **Problem 4 left a decision open that its solution did not record.**
   "How many whole numbers below 1,000 can be divided by 3 or by 5?" says
   nothing about where to start, and 0 is a multiple of 3: a reader whose
   loop starts at 0 counts one more number than the solution, and
   **Compare** shows the `count` rows as different, with no note to say
   why. The question now starts "Start at 1." It also said "can be divided
   by", which any number can be; it now says "multiples of 3 or of 5, that
   is, numbers that 3 or 5 divides with nothing left", because *multiple*
   is defined in problem 3 and the problems can be done in any order. The
   solution note's first sentence had no verb ("466 numbers, with a total
   of 233168."); it is now "It prints `466 numbers, ...`".
2. **Problem 6's second hint and its note** said "less than a whole day
   away from 0", which mixes a clock and a number line. Both now say "less
   than 24 hours from 0". The intro said the program's `+ 24` makes the
   hour "never below 0", which the predict then shows is not so; it is now
   what the author intended ("so that the hour would never be below 0"),
   as problem 8 tells its author's choice. The note said that "a Caesar
   shift that moves a letter backwards needs the same line"; a shift of 3
   backwards needs only `+ 26`, as `storing-and-computing` shows, so it now
   says "can move a letter backwards by any number of places", the words
   of `storing-and-computing`'s own note.
3. **Problem 8.** The intro's "a brightness from 0 to 255, which goes from
   dark to light across the picture" had a "which" that could mean the
   range or the brightness; it is two sentences now. The note's "An `int`
   holds the count easily" and "Saving 2 bytes on one variable was never
   worth it" (an idiom, and close to a verdict on the author) became "An
   `int` can hold a much larger count. For one variable, the 2 bytes saved
   are too few to matter.", as `types-and-their-sizes` puts it.
4. **Problem 7.** The loyalty card was defined in an aside in the middle
   of a long sentence; *loyalty card* now has its own sentence, in italics
   like *discount*. The line breaks in that paragraph were uneven. The
   note said that taking the €5 first "would make the 10% a little
   smaller", and left the reader to see what that means; it now adds "so
   the customer would pay a little more".
5. **Problem 9.** "It trusts whoever uses it" now says what that means
   ("it never checks what they type"). The note's last sentences about
   `double` and division by 0 were one sentence with a colon inside a
   "so"; they are two plain sentences now. "Those two loops would be the
   same, apart from their prompts" (and the same sentence in "Looking
   back") now says "apart from their prompts and their names", because the
   two lines also differ in `first` and `second`. The test-data fold's
   "one sum of each kind, with small numbers you can check in your head"
   used *sum* for four operations and an idiom; it is now "one calculation
   with each operation, with small numbers whose answers you know".
6. **Phrasal verbs and idioms.** "draws on" (the summary of the table of
   pages) is now "uses". "count in turn" (FizzBuzz) is now "count from 1,
   and each player says the next number". "Counting zero only as zero is
   fair too" (problem 2) is now "A program that counts zero only as zero
   decides the other way, and works too", the words of the page's opening.
   "does not always mean that your change made a mistake" (problem 5's
   fold) is now "added a mistake", so it reads as information about the
   code, not about the reader.
7. **Problem 1.** "For the others, what did you expect the line to do?"
   asked for what the reader had just written in the comment. It now asks
   "For each line that did not, what do you think C# did?"
8. **The challenge.** "a different one each time the program runs" was
   not true: two runs can choose the same number. The sentence now uses
   `finding-things`'s words for `Random.Shared.Next`: "a whole number
   chosen at random, from the first number up to the second, but not the
   second itself: here, 1 to 100. Each run chooses again."
9. **The close.** "saves it as a Visual Studio project, which prints the
   same there. There, ..." is now one plain sentence. The Microsoft
   tutorial now runs its code in a GitHub Codespace, so its entry says
   that this needs a free GitHub account and that it can be read without
   one. The video's "why it is harder than it looks" was an idiom and a
   claim nobody here checked; the entry keeps "why FizzBuzz is a common
   test ... and how to solve it".

### What I checked and left as it is

- **Numbers.** Every number and quoted output in the prose, the hints,
  the folds and the solution notes is in the outputs file, as the writer's
  list says, and none moved. Two statements rest on facts that no cell on
  this page records, and I left both: "a `short` uses 2 bytes and an `int`
  uses 4" (problem 8's story; recorded by `sizeof` on
  `types-and-their-sizes`, and the reader's own data dictionary), and
  problem 4's fold, "The total is below zero", which the writer probed
  (-1961650628) and which gives no number.
- **Problem 5**, the message that hides a second one. The writer's
  explanation (no line reads `price`, so there is nothing to check) is
  what the recorded diagnostics show: CS0103 alone, then CS0165 alone, at
  the same place, (12,46).
- **The three predicts** are where C# does something a reader would not
  expect, and problem 1 keeps the `// I think:` comments of
  `storing-and-computing`, which suit six lines at once.
- **The hint after CS0019 in problem 7** names a message the reader meets
  only if they write `0.9` without `m`; the writer probed it.

### Still open for Josh

The writer's six questions under "Open" stand. What the review adds to
them, and one new one:

1. **Size (Open 1).** On a read-through, problems 1 to 8 look like about
   an hour for a Level 5 class on their own. Problem 9 is the one that
   makes the page long: a 23-line starter, a plan, a 38-line solution and
   a list of test data. Setting problem 9 as homework, or as the start of
   the next class, keeps the page inside M without cutting anything.
2. **The table of pages (Open 2).** The PDP set for the next series,
   `mixed-programming`, has the same fold with the same summary, so the two
   PDP mixed sets agree. `mixed-starting-in-csharp` does something
   different: under "Where to go next", it names the four pages "a problem
   here" may need, with no table. One answer for all six mixed sets would
   help a teacher. Note that the summary here now says "which pages each
   problem uses", and `mixed-programming`'s still says "draws on" (see
   below).
3. **The challenge and `finding-things`.** The challenge asks the reader
   to write guess my number. `finding-things`, seven pages later, opens by
   running exactly that game (`guess-my-number-3`) as a new program, to
   lead into binary search. A reader who did the challenge meets their own
   program again, which may help, or may take the surprise out of that
   opening. Keep it, or give this page a different challenge (for example
   a times table, or the clock from `first-steps` going backwards)?
4. **`Random.Shared` (Open 4).** It is new here, but only in the
   challenge, and the sentence that explains it now matches the one in
   `finding-things`. `decimal.Parse` in problem 7 is the only new name in
   a problem; it is one sentence, next to `int.Parse`, and I would keep it,
   since `types-and-their-sizes` says money belongs in a `decimal`.

### For other files (not done here)

- `lessons/mixed-programming/mixed-programming.md`, line 1332: the fold's
  summary says "which pages each problem draws on", a phrasal verb. This
  page now says "which pages each problem uses". The same change there
  keeps the two PDP mixed sets alike.
- The writer's three items under "For other files" still stand
  (`courses/pdp.yaml`'s `planned:` line, the link from `reading-input`'s
  "Looking back", and dewlab's note on the order of the discounts).

### Final check

`npm run check-lessons -- mixed-first-programs` (no `--write`), after all
the changes above: "mixed-first-programs: 24 runs, 2.7 s / 1 page(s), 24
runs in 8.2 s: no problems."
