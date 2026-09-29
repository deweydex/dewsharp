---
title: "Mixed problems: working in a team"
version: 2026.09.29.1
from: from-cells-to-a-program
covers: [PDP-LO10, PDP-LO11, PDP-LO12]
---

# Mixed problems: working in a team

Every problem on this page is about code that somebody else wrote. Ciara,
Dev and Maeve are building the text adventure from
[The team project](lesson:the-team-project). Ciara writes the rooms, in
`Rooms.cs`. Maeve writes the score, in `Score.cs`. Dev writes the menu, in
`Program.cs`. All of their code compiles. Each problem is something that
the compiler cannot check: a method that does not do what its agreement
says, two methods for one job, a menu that stops when the input ends, a
change that nobody recorded, and a method that is hard to read.

As on the other pages of mixed problems, each problem needs more than one
page of the course, and none of them says which. Most problems have more
than one answer that works. Try each one before you open anything under
it. Problems 4 and 5 ask you to write, as well as to code: a change log
entry and a review. They work well in pairs, as the review on
[Code review](lesson:critique-and-reflection) did.

The team's classes are in cells of their own, and the cells below use
them (rule 2: a class written in a cell can be used by the cells below
it). Two cells are meant to stop with an exception, and the problem says
so before you run them.

## 1. A method that breaks its agreement

Before anybody wrote code, Ciara and Dev wrote this *interface
agreement*, in the form from
[A whole program](lesson:from-cells-to-a-program). It says what Ciara's
method is called, what it takes and what it returns, so that each of them
could build one side at the same time.

```text
Method:      public static string Move(string room,
                                       string direction)
             in Rooms.cs
Written by:  Ciara
Called by:   Program.cs, written by Dev
Takes:       room, the room the player is in;
             direction, the direction they typed
Returns:     the room the move leads to, or room itself
             if there is no exit that way
Prints:      nothing
Reads:       nothing
```

Here is Ciara's `Rooms.cs`. It keeps the rooms in a dictionary of
dictionaries, as Release 1 on [The team project](lesson:the-team-project)
did.

```csharp exec
id: a-method-that-breaks-its-agreement-1
file: Rooms.cs
static class Rooms
{
    // For each room: where each of its exits leads.
    static Dictionary<string, Dictionary<string, string>> exits = new()
    {
        ["hall"] = new Dictionary<string, string> { ["north"] = "library", ["east"] = "kitchen" },
        ["library"] = new Dictionary<string, string> { ["south"] = "hall" },
        ["kitchen"] = new Dictionary<string, string> { ["west"] = "hall" }
    };

    /// <summary>Returns the exits from room, as text, such as "north, east".</summary>
    public static string ExitList(string room)
    {
        return string.Join(", ", exits[room].Keys);
    }

    /// <summary>Returns the room that direction leads to from room.</summary>
    public static string Move(string room, string direction)
    {
        return exits[room][direction];
    }
}
```

Dev tests the agreement before his menu uses it, one case on each line,
with no typing, as `FirstValid` was tested on
[A whole program](lesson:from-cells-to-a-program). His program is meant to
stop with an exception. Run it, and read the report. Which line failed?
And whose code should change: Ciara's, or Dev's?

Then can you change `Move` in the `Rooms.cs` cell above, so that it keeps
the agreement, and run Dev's checks again? What does its XML comment need to say now?

```csharp exec
id: a-method-that-breaks-its-agreement-1-program
expect: exception
// Dev's checks of Rooms: one case on each line.
Console.WriteLine(Rooms.ExitList("hall"));
Console.WriteLine(Rooms.Move("hall", "north"));
Console.WriteLine(Rooms.Move("library", "south"));
Console.WriteLine(Rooms.Move("hall", "west"));
Console.WriteLine(Rooms.Move("hall", "North"));
```

```inputs
Rooms.Move("hall", "north")
Rooms.Move("kitchen", "west")
Rooms.Move("hall", "west")         // no exit that way
Rooms.Move("hall", "North")        // a capital letter
Rooms.Move("cellar", "north")      // throws: a room that is not on the map
```

```hint
after: 2 errors
What does the agreement say `Move` returns when there is no exit? What
does `exits[room][direction]` do when `direction` is not a key?
```

```hint
after: 3 errors
On [Dictionaries](lesson:looking-things-up-by-name), `TryGetValue`
checked whether a key is there, and gave its value, in one step. What
should `Move` return when `TryGetValue` gives `false`?
```

```solution
title: Move, as the agreement says
Console.WriteLine(Rooms.ExitList("hall"));
Console.WriteLine(Rooms.Move("hall", "north"));
Console.WriteLine(Rooms.Move("library", "south"));
Console.WriteLine(Rooms.Move("hall", "west"));
Console.WriteLine(Rooms.Move("hall", "North"));

static class Rooms
{
    // For each room: where each of its exits leads.
    static Dictionary<string, Dictionary<string, string>> exits = new()
    {
        ["hall"] = new Dictionary<string, string> { ["north"] = "library", ["east"] = "kitchen" },
        ["library"] = new Dictionary<string, string> { ["south"] = "hall" },
        ["kitchen"] = new Dictionary<string, string> { ["west"] = "hall" }
    };

    /// <summary>Returns the exits from room, as text, such as "north, east".</summary>
    public static string ExitList(string room)
    {
        return string.Join(", ", exits[room].Keys);
    }

    /// <summary>
    /// Returns the room that direction leads to from room, or room itself
    /// if there is no exit that way.
    /// </summary>
    public static string Move(string room, string direction)
    {
        if (exits[room].TryGetValue(direction, out string next))
        {
            return next;
        }
        return room;    // no exit that way, so the player stays
    }
}
---
Dev's checks now print `hall` for `west`, and `hall` for `North`. The
solution writes `Rooms` again, below its statements (rule 4), and C# uses
this one in place of yours. The XML comment now says what the agreement
says.

Two cases show what the agreement does not say. Is `North`, with a capital,
a direction with no exit, or the same as `north`? The agreement does not
say, so this `Move` treats it as a direction with no exit. And a room
that is not on the map, such as `"cellar"`, still stops with a
`KeyNotFoundException`, because `exits[room]` needs the room before it
does anything else. Both are questions for Ciara and Dev to decide together,
and each answer belongs in the agreement. Problem 3 is where Dev decides
the first one.
```

<details class="dl-answer"><summary>the report, and whose code changes</summary>

Here is one answer. Yours may be different and work too.

It prints `north, east`, `library` and `hall`. Then it stops with an
exception, and the page shows this report:

```console
Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'west' was not present in the dictionary.
   at line 20 of Rooms.cs (in Rooms.Move(string, string))
   at line 5 of Program.cs
```

The line that failed is line 20 of `Rooms.cs`, in Ciara's `Move`. Line 5
of `Program.cs` is Dev's line that called it, with `"west"`. The hall has
no exit to the west, so `exits["hall"]` has no key `"west"`, and
`exits[room][direction]` stops with a `KeyNotFoundException`, as a
missing key did on [Dictionaries](lesson:looking-things-up-by-name).

The agreement's `Returns:` line says that a move with no exit gives
`room` itself: the player stays in the hall. Dev's call follows the
agreement, and Ciara's method does not. So the method is the part to
change. The agreement is what both of them promised, so it decides. If
the team would rather have a different rule, the team changes the
agreement first, and then both sides change to match it.

The compiler checked that Dev's call matches the signature of `Move`. It
cannot check the `Returns:` line. A test can, such as Dev's.

</details>

## 2. Two methods, one job

Maeve wrote `Percent` in `Score.cs`, to show the score at the end of the
game.

```csharp exec
id: two-methods-one-job-1
file: Score.cs
static class Score
{
    /// <summary>Returns score as a percentage of rounds, from 0 to 100.</summary>
    public static int Percent(int score, int rounds)
    {
        return score * 100 / rounds;
    }
}
```

Dev needed a percentage too, for the menu. He did not know that `Score`
had one, so he wrote his own, in `Program.cs`. This cell prints both, for
a score of 1, 2 and 3 out of 3 rounds.

```csharp exec
id: two-methods-one-job-1-program
// Dev's own method, in Program.cs.
static int PercentOf(int score, int rounds)
{
    return (int)Math.Round(100.0 * score / rounds);
}

for (int score = 1; score <= 3; score++)
{
    Console.WriteLine($"{score} of 3: {Score.Percent(score, 3)} {PercentOf(score, 3)}");
}
```

```predict
type: choice

What will the second line print?

- 2 of 3: 66 67
  - `Percent` divides two whole numbers. `PercentOf` starts with
    `100.0`, and then rounds.
- 2 of 3: 67 67
  - Both methods find two thirds of 100.
- 2 of 3: 66 66
  - Both methods give an `int`.
- 2 of 3: 66.67 66.67
  - Two thirds of 100 has a part after the point.
```

Each method gives what its author expected. Which one would you keep?
What would you say about them in the team's review?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

It prints `2 of 3: 66 67`. The other two lines are the same for both
methods: `1 of 3: 33 33` and `3 of 3: 100 100`. `Percent` multiplies and
divides whole numbers, so its division drops the part after the point,
as on [Dividing](lesson:dividing-in-csharp). `PercentOf` starts with
`100.0`, a `double`, so it keeps the part after the point. Then
`Math.Round` gives the nearest whole number, and `(int)` makes it an
`int`, as on [Types and their sizes](lesson:types-and-their-sizes).
So the same game shows 66% at the end, and 67% on the menu.

Both methods do what their authors meant. The problem is that there are
two of them. This is the third question of a review on
[The team project](lesson:the-team-project): *Have we already written
this somewhere else?* A review comment for it could be:

> `PercentOf` in `Program.cs` does the same job as `Score.Percent`, and
> for 2 of 3 they give 66 and 67. Could we keep one method, in
> `Score.cs`, and agree how it rounds?

Then the team decides, and records it in a line: *Percentages round to
the nearest whole number, in `Score.Percent`.* One method goes, and its
calls use the other. The method that stays needs an XML comment that
says how it rounds. What should it give when `rounds` is 0? Neither
method says, and that is a question for the same review.

</details>

## 3. A menu and the end of the input

Release 1 of the adventure answered `You cannot go North` when a player
typed a capital letter. For Release 2, Dev wants a move to count however
it is typed. So he added `.Trim().ToLower()` to the line that reads the
move. `Trim()` gives the string without the spaces at its start and its
end, and `ToLower()` gives it in small letters.

This is his `Program.cs`. It uses Ciara's `Rooms` from problem 1
(rule 2). It is meant to stop with an exception when the input ends. Run
it, type `North`, and then press **End input**. The loop checks
`move == null` on line 8. Why doesn't that check help?

Then can you change the program, so that **End input** ends the menu with
`Goodbye.`, and `North` still counts?

```csharp exec
id: a-menu-and-the-end-of-the-input-1
stdin: "North\n"
expect: exception
// Program.cs, Release 2: a move counts however it is typed.
string room = "hall";
while (true)
{
    Console.WriteLine($"You are in the {room}. Exits: {Rooms.ExitList(room)}");
    Console.Write("Where now? ");
    string move = Console.ReadLine().Trim().ToLower();
    if (move == null || move == "quit")
    {
        break;
    }
    room = Rooms.Move(room, move);
}
Console.WriteLine("Goodbye.");
```

```hint
after: 2 errors
What does `Console.ReadLine()` give after **End input**? Which runs
first: `.Trim()` on line 7, or the check on line 8?
```

```hint
after: 3 errors
Can one line keep what `ReadLine` gives, in a variable of its own? Then
an `if` can check it for `null` before anything asks it a question.
```

```solution
title: the input checked before it is used
string room = "hall";
while (true)
{
    Console.WriteLine($"You are in the {room}. Exits: {Rooms.ExitList(room)}");
    Console.Write("Where now? ");
    string typed = Console.ReadLine();
    if (typed == null)
    {
        break;    // the input has ended: nobody is left to choose
    }
    string move = typed.Trim().ToLower();
    if (move == "quit")
    {
        break;
    }
    room = Rooms.Move(room, move);
}
Console.WriteLine("Goodbye.");
---
`typed` keeps what `ReadLine` gave, and the check for `null` comes before
`Trim()`. So after **End input**, the loop ends, and the program prints
`Goodbye.` `move` is made only when there is a line to make it from.

Dev has now decided a question from problem 1: `North` and `north` are
the same move. `Program.cs` puts every move in small letters before it
calls `Move`, so `Rooms.cs` never sees a capital. That decision belongs in
the agreement, on its `Takes:` line: *direction, in small letters*.
```

<details class="dl-answer"><summary>why</summary>

`North` counts, and the player reaches the library. Then **End input**
stops the program with a `NullReferenceException`, on line 7.

After **End input**, `Console.ReadLine()` gives `null`, as on
[Reading input](lesson:reading-input). Line 7 then asks that `null` for
`.Trim()` at once, and there is no string to ask. C# does
everything on line 7 before it reaches line 8, so the check comes one
line too late. And it can never be `true`: `Trim()` and `ToLower()`
always give a string, so `move` is never `null`. Release 1 had the same
check, and it worked there, because nothing used `move` before it.

The review checklist on
[A whole program](lesson:from-cells-to-a-program) asks about this in its
second question: what does the code do with `null` when the input ends?
A change that looks small, such as adding `.Trim().ToLower()`, can break
a check on the line below it.

If you have not changed `Move` in problem 1, a move with no exit stops
this program too, with a `KeyNotFoundException`. That is how a mistake in
one person's method stops another person's program. It is why Dev tested
`Move` before his menu used it.

</details>

## 4. A change log from two versions

The library has a riddle, and Dev's `Matches` checks the player's answer.
Here are two versions of it: the one from Release 2, and the one from
Release 3. In the project they have the same name, `Matches`. On this
page, they need two names, so that one cell can run both. The square
brackets in the output show where the typed text starts and ends, so that
you can see its spaces.

```csharp exec
id: a-change-log-from-two-versions-1
/// <summary>Returns true if typed is word.</summary>
static bool MatchesRelease2(string typed, string word)
{
    return typed == word;
}

/// <summary>Returns true if typed is word.</summary>
static bool MatchesRelease3(string typed, string word)
{
    if (typed == null)
    {
        return false;
    }
    return typed.Trim().ToUpper() == word;
}

string[] tries = { "OTTER", "otter", " Otter ", "OTTERS" };
foreach (string typed in tries)
{
    Console.WriteLine($"[{typed}] for OTTER: {MatchesRelease2(typed, "OTTER")} {MatchesRelease3(typed, "OTTER")}");
}
Console.WriteLine($"null for OTTER: {MatchesRelease2(null, "OTTER")} {MatchesRelease3(null, "OTTER")}");
Console.WriteLine($"[Otter] for Otter: {MatchesRelease2("Otter", "Otter")} {MatchesRelease3("Otter", "Otter")}");
```

```predict
type: choice

What will the last line print?

- [Otter] for Otter: True True
  - The player typed the word exactly, so both versions should say yes.
- [Otter] for Otter: True False
  - Release 3 puts what was typed in capitals. Is the word in
    capitals?
- [Otter] for Otter: False True
  - Release 3 is the newer one.
```

Nobody wrote a change log entry for Release 3. Can you write it? What was
added, what was changed, and what is still a known problem? You could
write it as comments in the cell, or on paper. And one more thing in the
code no longer matches what the code does. Can you find it?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

```text
Release 3, 5 December
- An answer counts in small letters or capitals, and with spaces before
  or after it: "otter" and " Otter " now count for OTTER.
- Changed: the word must now be in capitals. Matches("Otter", "Otter")
  was true in Release 2, and it is false now.
- Known problem: "OTTERS" does not count. We have not decided whether
  it should.
```

The last line prints `[Otter] for Otter: True False`. Release 3 puts
what was typed in capitals, and compares it with `word` as it is. So a
word with any small letter in it never matches, even when the player
types it exactly. Every riddle in the game has its answer in capitals, so
the game works. But a teammate who calls `Matches` with `"Otter"` gets
`False` every time, and nothing tells them why. The change log is where
they would learn it.

The thing that no longer matches is the XML comment. Release 3 still says
*Returns true if typed is word*, the promise from Release 2. A change is
finished when the comment, the agreement and the change log all describe
what the code does now. For example:

```csharp
/// <summary>
/// Returns true if typed, in any mix of capitals and small letters, and
/// with any spaces before or after it, is word. word must be in capitals.
/// Returns false if typed is null.
/// </summary>
```

The `null` line prints `False False`. Release 2 gave `false` for `null`
too, so that is not a change, and it is not in the change log. Release 3
needs its check for `null` only because it calls `Trim()`. Without the
check, it would stop with a `NullReferenceException`, as the menu in
problem 3 did.

A change log is for the people who use the program, and for the team.
*Added `Trim()` and `ToUpper()`* says what changed in the code. *"otter"
now counts* says what changed for the player, and *the word must now be
in capitals* says what changed for the team.

</details>

## 5. A method to review

At the end of the game, Maeve's method shows the score as stars: five
for a player who won every round. It compiles, with one warning, and it
prints what Maeve expected for her three calls.

Run it. Then can you review it? Use the review checklist from
[A whole program](lesson:from-cells-to-a-program) (its section
"Templates for a team"), and the coding standard from
[Code review](lesson:critique-and-reflection): names, comments and
indentation.

Write what you find as *review comments*: short notes about lines of
code, for the person who wrote them. A useful review comment says three
things: what you saw, why it matters, and what you suggest. *This is a
mess* says how the reviewer feels, and it gives Maeve nothing to change.
Each comment is about the code, never about the person.

Changing how code is written, without changing what it does, is called
*refactoring*. Can you refactor Maeve's method into `Stars`, with what
your review suggested? Before you change anything, note what the three
lines print. Then change one thing at a time, and run the cell after each
change. The three lines should stay the same.

**Compare with a solution** tries `Stars` with more cases, including 0
rounds played. What should that give? There, the old method divides a
whole number by 0, which stops with an exception, as on
[Exceptions](lesson:reading-an-error-message). So whatever you choose is a
change of behaviour, not a refactor. It belongs in the XML comment, and in
the change log.

```csharp exec
id: a-method-to-review-1
static string stars(int s, int r)
{
    int max = 5;
    // make the stars
    string t = "";
    for (int i = 0; i < s * 5 / r; i++)
    {
        t = t + "*";
    }
    if (s * 5 / r == 0) t = "-";
    return t;
}

Console.WriteLine(stars(3, 3));
Console.WriteLine(stars(2, 3));
Console.WriteLine(stars(1, 9));
```

```inputs
Stars(3, 3)
Stars(2, 3)
Stars(1, 9)
Stars(4, 5)
Stars(0, 0)       // no rounds played
```

```hint
after: 2 runs
Which names would you change first? After each change, do the three lines
still print `*****`, `***` and `-`?
```

```hint
after: 3 runs
`new string('*', count)` makes a string of `count` stars, as `Row` did on
[the practice page for A whole program](lesson:from-cells-to-a-program-practice).
Could it replace the loop?
```

```solution
title: Stars, refactored
/// <summary>
/// Returns one star for each fifth of the rounds that the player won,
/// rounded down: "*****" for every round. Returns "-" when that makes no
/// stars, and when no rounds were played.
/// </summary>
static string Stars(int score, int rounds)
{
    const int MostStars = 5;
    if (rounds == 0)
    {
        return "-";
    }
    int count = score * MostStars / rounds;
    if (count == 0)
    {
        return "-";
    }
    return new string('*', count);
}

Console.WriteLine(Stars(3, 3));
Console.WriteLine(Stars(2, 3));
Console.WriteLine(Stars(1, 9));
---
It prints the same three lines as Maeve's method: `*****`, `***` and
`-`. `Stars(4, 5)` gives `****`. `Stars(0, 0)` gives `-`: that is the
decision this solution made, and its XML comment says so. `count` is
calculated once. `const int MostStars = 5;` gives the 5 a name: `const`
makes `MostStars` a *constant*, a name for a value that never changes.
There is no warning, and no loop: `new string('*', count)` makes the
stars in one step.

"Rounded down" is in the XML comment on purpose. For 2 of 3 rounds, the
exact number of stars has a fraction, and the method gives 3. It is the
same whole-number division as `Percent` in problem 2, and this time the
comment says so.
```

<details class="dl-answer"><summary>one review</summary>

Here is one answer. Yours may be different and work too.

1. **Names.** `stars` is a method, so the course's standard writes it in
   PascalCase: `Stars`. `s`, `r` and `t` do not say what they hold. I had
   to read the loop to learn that `s` is the score. Could they be
   `score`, `rounds` and `result`?
2. **An XML comment.** There isn't one. From the name, I can tell that it
   makes stars, but not how many, or what `-` means. Could it say both?
3. **The warning.** The cell shows `warning CS0219: The variable 'max'
   is assigned but its value is never used`, on line 3. Was `max` meant
   to be the 5 in the loop? At the moment, the 5 is a *magic number*: a
   number in the code with no name to say what it means. Most coding
   standards ask for a name in its place. In C#, `const int MostStars =
   5;` makes a *constant*: a name for a value that never changes. The
   compiler refuses any line that tries to change it.
4. **The same thing twice.** `s * 5 / r` is calculated on line 6, and
   again on line 10. If one of them changes, the other must change too.
   Could it have a name, and be calculated once?
5. **The edges.** A game with no rounds played gives `r` as 0, and a
   whole number divided by 0 stops with a `DivideByZeroException`, as on
   [Exceptions](lesson:reading-an-error-message). What should it show
   then?
6. **Comments.** `// make the stars` says what the loop already says.
   A comment could say why instead, or the line could be deleted.
7. **Layout.** `if (s * 5 / r == 0) t = "-";` is on one line, with no
   braces. A line added under it later looks as if it belongs to the
   `if`, and it does not. Could it have braces, each on its own line, as
   the standard says?

Seven comments is a lot for one short method, and a review can stop at
the three that matter most. Here, those could be 3, 4 and 5. The compiler
found 3, and 4 and 5 are about what the code does. The others are about
how a person reads it.

</details>


<details class="dl-hint"><summary>which pages each problem uses</summary>

For a teacher, or for anybody who is stuck: these are the pages whose
ideas each problem uses.

| Problem | Pages |
|---|---|
| 1. A method that breaks its agreement | [A whole program](lesson:from-cells-to-a-program), [Dictionaries](lesson:looking-things-up-by-name), [Exceptions](lesson:reading-an-error-message), [Reusable methods](lesson:building-reusable-tools) |
| 2. Two methods, one job | [Dividing](lesson:dividing-in-csharp), [Types and their sizes](lesson:types-and-their-sizes), [The team project](lesson:the-team-project) |
| 3. A menu and the end of the input | [Reading input](lesson:reading-input), [A whole program](lesson:from-cells-to-a-program), [The team project](lesson:the-team-project) |
| 4. A change log from two versions | [A whole program](lesson:from-cells-to-a-program), [Reusable methods](lesson:building-reusable-tools), [Reading input](lesson:reading-input) |
| 5. A method to review | [Code review](lesson:critique-and-reflection), [A whole program](lesson:from-cells-to-a-program), [Compiler errors](lesson:compiler-errors), [Dividing](lesson:dividing-in-csharp), [Exceptions](lesson:reading-an-error-message) |

</details>

## Looking back

Every program on this page compiled. Which of the five problems would a
test have found, and which only a person reading the code? Which of them
would you have found in your own code, and which only in somebody else's?

A challenge for your team project: can you write your team's interface
agreements as classes whose methods have *placeholder* bodies, as Ciara
did on [The team project](lesson:the-team-project)? A placeholder body
returns a value of the agreed type and does nothing else, so the code
that calls it compiles on the first day. Then add one line to the program
for each case in each agreement, as Dev did in problem 1.

```csharp challenge
// Your team's agreements, as classes whose methods have placeholder bodies.
// Each placeholder returns a value of the agreed type, so that Program.cs
// compiles on the first day. Add one line for each case in the agreement.
Console.WriteLine(Rooms.Move("hall", "north"));

static class Rooms
{
    /// <summary>
    /// Returns the room that direction leads to from room, or room itself
    /// if there is no exit that way.
    /// </summary>
    public static string Move(string room, string direction)
    {
        // A placeholder: the player stays where they are.
        return room;
    }
}
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. Your team project is built in Visual Studio, as
[The team project](lesson:the-team-project) says. **Download project** on
any program cell here saves it as a Visual Studio project, with one file
for each types cell above it, such as `Rooms.cs`.

This is the last page of *Programming and Design Principles*. If you
continue to *Fundamentals of Object-Oriented Programming*, start at
[Classes and objects](lesson:objects-and-classes). A class there holds
data as well as methods, and the rules of the road work the same way.
The course page also lists extra pages under **Explore**. They are not
part of the module, and they are there for when you have time.

## Where to read more

Google. *How to write code review comments*.
<https://google.github.io/eng-practices/review/reviewer/comments.html>.
Google's advice to its own reviewers: be kind, explain why, and comment on
the code, never on the person. It is written for professional
programmers, and it is short.

Olivier Lacan. *Keep a Changelog*. <https://keepachangelog.com/en/1.1.0/>.
A short guide to change logs, used by many open-source projects. It sorts
each release's changes under headings such as *Added*, *Changed* and
*Fixed*, and it explains why a change log is written for people, not
copied from the code.

Microsoft. *Dictionary.TryGetValue method*.
<https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.trygetvalue>.
The official reference for the method in the solution to problem 1. Its
example compares `TryGetValue` with the other way: reading the value with
square brackets, and catching the `KeyNotFoundException`. It is written for programmers who know C# well,
so read its first few paragraphs and the example.
