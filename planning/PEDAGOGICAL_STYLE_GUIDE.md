# Style guide

How dewsharp writes for learners and teachers. Draft 1, 27 September 2026.
This guide was written for C# from the start. It does not copy dewlab's, and
the choices in it are dewsharp's own. Where a choice is still open, it is
marked **Open** and listed at the end for Josh to decide.

Cite a part of it by its anchor, as `PEDAGOGICAL_STYLE_GUIDE.md#voice`.

<a id="who-reads-this"></a>
## Who reads this

Adults in Irish further education at QQI Level 5, taking Programming and
Design Principles (5N2927) or Fundamentals of Object-Oriented Programming
(5N0541). Some have never programmed, and some already have, perhaps in
Python. Many read English as a second language. Some use a screen reader,
a large font or a dyslexia font. Most read the page in class with a teacher
nearby, and some read it at home with nobody to ask. Write for the reader at
home.

A teacher reads it too. They should be able to open any page and see at once
what it teaches, what the learner does, and which outcome it serves.

<a id="voice"></a>
## Voice

- **Invite, and wait.** Ask a question, give the reader something to try,
  and let the code answer. *What do you think this prints? Run it and see.*
  A task is a question or a challenge, never an order to think: not
  *Explain why…*, but *Why do you think…?*
- **Define every term where it first appears, in one plain sentence.** Say
  what a thing is before saying what it is not.
- **Common words and short sentences.** Every sentence has a subject and a
  verb. Use the plain verb: *find*, not *work out*; *start*, not *set up*;
  *stop*, not *give up*. Phrasal verbs and idioms don't survive translation.
  Leave them out.
- **Say the thing first.** *C# checks the whole program before it runs any
  of it.* Not *What happens first is the checking.*
- **Humour where it fits**, about a situation and never about the reader.
- **"We" when we explore together, "you" for the reader's own work.** *We
  add a method. Your version is saved on this device.*
- **Irish and British spelling in the prose** (*colour*, *behaviour*,
  *programme* for a course of study). Code keeps .NET's own names
  (`ConsoleColor`, `Color`).
- **No verdicts.** The page shows what the code did, and when the reader asks,
  what a solution does with the same inputs. It never says *right*,
  *wrong*, *correct*, *well done* or *not yet*, and it shows no ticks and no
  scores. A difference is information about a line of code.

<a id="how-a-page-teaches"></a>
## How a page teaches

- **Run first, then name.** A page opens with code that does something the
  reader can see, and asks about it. The name for the idea comes after the
  reader has seen it work.
- **Predict, then run**, two or three times on a page, where a guess is
  likely to be interesting. A page that asks for a guess before every cell
  teaches readers to skip the guesses.
- **Worked, then completed, then your own.** First a program the reader
  runs and changes, then one with a gap to fill, then a task with a blank
  cell.
- **Mistakes on purpose.** A cell that fails to compile, on a page about
  compiler errors, teaches more than a paragraph about them. The prose says
  the cell is meant to fail (`expect:` in the cell), so the reader knows they
  haven't broken anything.
- **Help waits for an attempt.** A hint appears after the reader has tried.
  The first hint asks a question. An answer sits in a fold that the reader
  opens for themselves: *Here is one answer. Yours may be different and work
  too.*
- **Every page ends with somewhere to go:** its practice page, a challenge
  for the notebook, and one thing to read or watch.

<a id="csharp"></a>
<a id="the-compiler"></a>
## The compiler is part of the lesson

C# checks the whole program before it runs any of it. That step is
*compiling*, and it is the biggest difference a Python learner meets. We
treat it as the first place the reader gets feedback, not as an obstacle.

- Name it on the first page with an error: *Before C# runs a program, it
  reads all of it and checks it. That is compiling. If it finds a problem, it
  runs nothing and tells you where the problem is.*
- Teach the shape of a message once, and use it the same way after that:
  `Program.cs(3,19): error CS0103: The name 'totl' does not exist in the
  current context`. That is the file, the line, the column, the code, and what
  the compiler found.
- **Read the first message first.** One mistake can cause several messages.
- Three things can happen when you press Run, and a page names them the same
  way every time: **it did not compile** (nothing ran), **it stopped with an
  exception** (it ran until a line it could not complete), or **it ran**
  (whether the result is what you wanted is for you to decide).
- A message is never the reader's fault in the prose. *The compiler found a
  name it doesn't know*, not *You misspelled the variable.*

<a id="rules-of-the-road"></a>
## The rules of the road

How cells on a page share code. Say it in these words, and nowhere else in
other words:

1. **Each Run starts a new program.** It runs from the first line of the cell
   to the last.
2. **A class written in a cell can be used by the cells below it.**
3. **Variables stay in their cell.**
4. **A class written again further down replaces the earlier one.**
5. **`Main` stays in its cell.**

Early PDP pages need rule 1 only, and never say "rules". The first page with
a class of its own teaches all five, with a small cell for each. After that, a
page can point back to them: *(rule 3: variables stay in their cell)*.

<a id="code"></a>
## Code in a lesson

- **Short cells:** five to fifteen lines. A cell with two ideas in it wants to
  be two cells.
- **Each program cell works on its own.** If a cell needs the list that the
  cell above made, make it again in this cell (rule 3).
- **Top-level statements.** Never write `class Program`. **Open:** where
  and how to show the classic `static void Main`.
- **Explicit types until `var` has been taught:** `int count = 0;`, so that
  the reader always sees the type. **Open:** which page teaches `var`.
- **C#'s own naming:** `PascalCase` for classes, methods and properties,
  `camelCase` for local variables and parameters. Put each brace on its own
  line, as Visual Studio does.
- **Names read as words:** `total`, `highScore`, `planet`, not `t`, `hs`,
  `p`. A loop index `i` and coordinates `x`, `y` are fine.
- **`$"..."` for text with values in it**, from the first page that prints a
  value.
- **Comments say why**, never what the line already says.
- **Input is real.** A program that asks uses `Console.ReadLine()`, and it
  turns text into a number in a way the reader can see: `int.Parse` first,
  then `int.TryParse` once the page has met input that won't convert.
- **Every number is run.** A number in the prose comes from the cell's
  recorded output (`lessons/<id>/<id>.outputs.json`), never from reading the
  code.

<a id="terms"></a>
## Terms

Use these words, and define each where it first appears:

| Say | Not | Because |
|---|---|---|
| **compile**, **compiler error** (with its code) | *build*, *syntax error* for every error | Most errors a learner meets are about names and types, not syntax. |
| **exception** | *crash*, *bug* | Say what happened: the program stopped at a line. |
| **method** | *function*, after the first page with one | C# calls a function a method. Say so once. |
| **type** | *kind of value* | `int`, `double`, `string`, `bool`, and later a class. A variable's type is fixed when the variable is made. |
| **class**, **object** | *instance*, before FOOP's third page | *A class is a description. An object is one thing made from it.* |
| **field**, **property** | *attribute* | A property is how C# lets code outside the class read or change a value that the class guards. |
| **parameter**, **argument** | using them as the same thing | A parameter is the name in the method. An argument is the value passed in. |

<a id="the-ide"></a>
## The page and Visual Studio

The page is where a learner practises. Outcomes about an IDE (projects,
several files, breakpoints, stepping) are met in Visual Studio, and a page
that covers one says so and gives the steps. Any program cell can be
downloaded as a Visual Studio project that builds and prints the same output.

<a id="access"></a>
## Access

Short paragraphs, real headings, a description on every picture, and colour
that is never the only signal. The console output and the compiler messages
must be readable with a screen reader and usable from the keyboard.

<a id="checklist"></a>
## Before a page ships

- Does it open by running something and asking about it?
- Is every term defined where it first appears?
- Is every task a question or an invitation, and is there a first step anyone
  can take?
- Are there two or three guesses at most, each where a guess is interesting?
- Does any line say right, wrong, correct or well done, or show a tick?
- Does every sentence use plain words, with no phrasal verbs and no idioms?
- Does each program cell work on its own, and does the page follow the rules
  of the road?
- Is every number in the prose taken from a recorded output?
- Does it name the outcomes it covers, and say what belongs in Visual Studio?

<a id="open"></a>
## Open decisions for Josh

1. Classic `static void Main`: shown once as code to read, taught on a FOOP
   page, or used throughout FOOP?
2. When to teach `var`.
3. Worlds (the same task set in a game, an ocean, planets and so on): as many
   as dewlab offers, fewer, or only in FOOP?
4. Nullable reference types: off for the whole course (the current setting),
   or switched on in FOOP to match Visual Studio's template?
5. A recurring character who makes the mistakes, or none?
