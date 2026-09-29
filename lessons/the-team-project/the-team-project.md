---
title: "The team project: a brief"
version: 2026.09.27.1
from: the-team-project
covers: [PDP-LO12, PDP-LO7]
---

# The team project: a brief

This page is a brief, not a tutorial. A *brief* is a description of a
piece of work you are asked to do. This one is for a project you will do
over several weeks, in a team of three to five. It is written here so
that you can return to it. How your class runs the project is your
teacher's to say: the dates, what you submit, and how it is assessed.
This page is the part that stays the same: what to build, how to build it
together, and questions to ask at the end.

The learning outcome behind the project asks you to design, develop,
release and review software **over time, in a team**. Every word of that
matters. People most often underestimate two of them: *over time* and
*review*.

## What you are being asked to do

As a team of three to five, you will build a small game or tool, and
release it three times. Here are some that fit:

- **A text adventure.** Rooms kept in a dictionary, and a `while (true)`
  loop that asks where to go next.
- **A cipher tool.** Code, decode and crack messages, from a menu.
- **A pixel-art editor.** A picture kept as a grid of characters, a
  `char[,]`, with commands to draw on it, mirror it and print it.
- **A quiz** about dinosaurs, planets, or anything your team knows well:
  questions in an array, answers checked with care, and a score.

Or propose your own, with the same shape: a loop, a way to quit, and some
data the program keeps. Everything these need is on the pages before this
one, up to [A whole program](lesson:from-cells-to-a-program).

**You build it in Visual Studio, as one project.** A *project* is a
folder of files that Visual Studio compiles together into one program.
Each person writes one part of it: a `static class` in a file of their
own, such as `Rooms.cs` or `Score.cs`. `Program.cs` holds the statements
where the program starts: the loop, and the code that talks to the
player. Codebreaker, the game on
[A whole program](lesson:from-cells-to-a-program), has this shape, with
`Cipher.cs`, `Game.cs` and `Program.cs`. That page also gives the steps
to open a project, run it, and add a file to it. The cells on these pages
are still a good place to try a method before it goes into its file.

Your team also needs one shared place for the project, where everybody
can find the latest version of every file, and a copy of every release.
Your college chooses that place. Your teacher will tell you what it is,
and how to submit your work.

**Small is important.** A project that is too big fails early, in week
two, not at the end. Nobody can see how the pieces connect, and everyone
quietly stops working on it. A good size is something one of you could
finish alone in a weekend. For a team over several weeks, that is
enough, because most of what you learn here is not how to write the code.

Some ideas fail in the same ways, whoever tries them: anything that needs
a login, anything that depends on somebody else's service, and anything
where the interesting part is a library you have not used yet.

## Three releases, not one deadline

Three releases make this a project and not an assignment. A *release* is
a version of your program that somebody outside the team could use on
the day it appears. It is a working thing, however little it does. A plan
is not a release, and neither is most of a program.

| | What it is | The question it answers |
|---|---|---|
| **Release 1** | The smallest thing that does anything at all | Does the shape of this work? |
| **Release 2** | The main feature, done properly | Can we build the thing we described? |
| **Release 3** | Finished, tidied, and documented | Would we give this to somebody? |

**Every release:**

- [ ] compiles, and runs to the end with no exception, so that somebody
  outside the team could use it;
- [ ] shows no warning that the team has not read;
- [ ] has a version number and a date, in a comment at the top of
  `Program.cs`;
- [ ] has a line in the *change log*, the team's list of what each
  release changed;
- [ ] is kept, as a copy of the whole project, after the next release
  appears.

**Most teams make Release 1 too big.** It should feel almost too small to
show anyone. Here is a Release 1 of a text adventure: two rooms, one way
between them, and a way to quit. When you run it, it waits for you to
type. Try north, then east, then south. What happens if you type North,
with a capital letter? Type quit to end.

```csharp exec
id: three-releases-not-one-deadline-1
stdin: "north\neast\nsouth\nNorth\nquit\n"
// For each room: where each of its exits leads.
Dictionary<string, Dictionary<string, string>> exits = new()
{
    ["hall"] = new Dictionary<string, string> { ["north"] = "library" },
    ["library"] = new Dictionary<string, string> { ["south"] = "hall" }
};

string room = "hall";
while (true)
{
    string exitList = string.Join(", ", exits[room].Keys);
    Console.WriteLine($"You are in the {room}. Exits: {exitList}");
    Console.Write("Where now? ");
    string move = Console.ReadLine();
    if (move == null || move == "quit")
    {
        break;
    }
    if (exits[room].ContainsKey(move))
    {
        room = exits[room][move];
    }
    else
    {
        Console.WriteLine($"You cannot go {move}");
    }
}
Console.WriteLine("Goodbye.");
```

The rooms are a *dictionary of dictionaries*: a dictionary whose values
are dictionaries too. For each room, the value is a small dictionary from
a direction to the room it leads to. So `exits["hall"]` is the hall's
exits, and `exits["hall"]["north"]` is `"library"`. `exits[room].Keys`
is the directions out of the room the player is in. A key must match
exactly, capital letters too, so `"North"` is not a key, and the program
answers `You cannot go North`. `move == null`
is the second way out of the loop, as on
[A whole program](lesson:from-cells-to-a-program). `Console.ReadLine()`
gives `null` when there is no more input: on this page, when you press
**End input**.

That is enough. It proves that the pieces work together: the rooms, the
loop, the code that asks, and the code that moves the player. Release 2
might add rooms, things to collect, a way to win, and moves that work
however they are typed. Release 3 adds XML comments, checks for the parts
that can be tested with no typing, as Codebreaker's Release 3 did, and a
change log a stranger could follow. Because Release 1 was so small, if
two people's code does not work together, you learn it in week two, not
week six.

In the team's project, this one cell could already be two files: the
rooms in one person's `Rooms.cs`, and the loop in `Program.cs`. If your
team chooses the text adventure, **Download project** on the cell above
gives you a Visual Studio project to start from.

## Working on one thing at once

When three to five people edit the same project, their changes will
clash. No way of organising a team stops this completely, but you can be
ready for it.

1. **Split the work by what each piece does,** not by who is good at
   what. "Ciara writes the rooms in `Rooms.cs`, Dev writes the menu in
   `Program.cs`, Maeve writes the score in `Score.cs`" gives everyone
   something to build, and a clear edge where one piece meets the next.
   "Ciara does the hard parts" gives you one person doing the project and
   three watching.
2. **Agree the edges before anybody writes code.** If Dev's menu will
   call Ciara's method, decide now what it is called, what it takes, and
   what it returns. In C#, the method's first line says all three. That
   line is the method's *signature*.
3. **Record that agreement** in an *interface agreement*: the short
   form from [A whole program](lesson:from-cells-to-a-program) (its
   section "Templates for a team") for each place where one person's code
   calls another person's method. Now both people can write their side of
   it, and neither has to wait.
4. **Tell the team what you are working on.** A week's work is most
   often lost when two people edit the same file at the same time. With
   one file for each person, that happens less often, but everybody needs
   `Program.cs`. A short message like "I'm changing Program.cs this
   evening" prevents nearly all of it.

Here is how steps 2 and 3 could start for Ciara and Dev. Their agreement
begins with a signature:

```csharp
public static string Move(string room, string direction)
```

`Move` takes the room the player is in and the direction they typed. It
returns the room the move leads to, or `room` itself if there is no exit
that way. On the first day, Ciara can put the signature in `Rooms.cs`
with a *placeholder* body: one that only returns `room`, so the player
never moves.

```csharp
static class Rooms
{
    public static string Move(string room, string direction)
    {
        // A placeholder: the player stays where they are.
        return room;
    }
}
```

It compiles, so Dev's menu can call `Move` at once. The real body
replaces the placeholder later, and Dev's code does not change.

The agreement in steps 2 and 3 is worth more than any amount of planning
about features. It lets four people work at the same time, instead of one
after another. The compiler helps you keep it. If Ciara changes the
signature, and Dev's call no longer matches it, the program does not
compile, and the message names the line with Dev's call.

## Reviewing each other's work

**Before each release, read each other's code.** The point is to learn
whether the code can be read, not to judge the person who wrote it. If
you cannot understand what a method does, that tells you something about
the method, not about you, and it is much cheaper to learn it now than
later. [Code review](lesson:critique-and-reflection), the page before
this one, practised this with a partner.

The compiler has already checked that every call matches a signature. A
review checks what the compiler cannot: whether each method does what its
agreement says, and whether a person can read it.

A polite review says "looks fine". A useful one asks questions:

1. **Can I tell what this does without asking?** If not, the fix is
   usually a better name or one sentence of XML comment, not more code.
2. **What happens if this gets something unexpected?** An empty array, a
   zero, a word where a number was expected, or `null` when the input
   ends. [Exceptions](lesson:reading-an-error-message) and
   [Debugging](lesson:when-it-goes-wrong) are the pages for this.
   Somebody using your program will meet every one of them.
3. **Have we already written this somewhere else?** Two people often
   solve the same problem separately. That is normal, and worth finding.

Then **record what you agreed**, in a line or two: "We are keeping
the two scoring methods separate for now." In three weeks, nobody will
remember whether that was a decision or an accident. The review checklist
on [A whole program](lesson:from-cells-to-a-program) has these questions
ready to copy.

### After the last release

The review that matters most comes at the end, and it is about how you
worked together, more than about what you built. If you wrote, on
[Code review](lesson:critique-and-reflection), what you were curious or
worried about at the start, read it again now. These questions are for
you to answer, in your own words:

- What went differently from what you expected?
- What took most of your time, compared with what you expected?
- If you started again with the same brief, what would you do
  differently?
- What did somebody else in the team do that you would like to be able to
  do?

Take the last one seriously. Building something with three to five
people is the closest this course comes to how software is made in real
jobs, and most of what people learn from it is something they watched
somebody else do.

## A last thing

The hardest problem in a team project is almost never technical. It is
almost always somebody who is stuck and does not say so, for two weeks,
because they think everybody else understands. It happens in professional
teams all the time, and it is the most expensive problem a team can have.

If you are stuck, say so on the same day. If somebody in your team has
stopped talking to the group, ask them how their work is going. These
are more than small kindnesses. Together, they are the skill this
learning outcome is about.

The next page, [Mixed problems](lesson:mixed-working-in-a-team), is the last of this series. Its problems
are about working in a team: reading, checking and reviewing code that
somebody else wrote.

## Where to read more

Fowler, M. (2024). *Continuous Integration*.
<https://martinfowler.com/articles/continuousIntegration.html>. This
article describes the professional version of "release early, release
small". Teams join and test everyone's work together all the time,
rather than once at the end. It is written for professional programmers.
Its first section, "Building a Feature with Continuous Integration",
follows one change from start to finish, and is the place to start.

Microsoft. *Common C# code conventions*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions>.
The conventions Microsoft follows in its own C# examples: comments,
braces, layout, and more. It says a team can take them as they are, or
change them to suit the team. Either way, agree yours in the first week,
in your team charter (the agreement about how your team works, from
[A whole program](lesson:from-cells-to-a-program)), so that a review is
about what the code does. The page writes `var` in places where these
pages write the type.

Tantacrul (2025). *How We Designed Audacity 4.*
<https://www.youtube.com/watch?v=QYM3TWf_G38>. This video shows how a
team changed a program millions of people already use, a little at a
time, and then released a new version. It is about fifty-three minutes
long.
