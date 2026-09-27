# a-program-of-your-own: notes for a reviewer

Ported from dewlab `tutorials/a-program-of-your-own/a-program-of-your-own.md`
(version 2026.09.26.1) and its `.glossary.yaml`. It is a project page: one
whole program to open with, three starting points, a plan, a release
checklist, and questions to look back with. The work is the learner's, over
a week or two. It follows `looking-things-up-by-name` in PDP's "Methods,
lists and algorithms" series (`planning/COURSE_MAP.md`, PDP row 19: "adapt",
shape "project", size S, no worlds, batch 5). As in dewlab, it has no
solutions and no practice page, and the course map lists it under "Lessons
with no worlds". So dewlab PDP's two worlds are not used here: the map's
entry overrides the default, and the cipher tool and the pixel-art maker
stay as two of the three starting points in the prose, as in dewlab.

`covers: [PDP-LO7, PDP-LO5, PDP-LO6]` is the course map's list, in the map's
order. dewlab's frontmatter gave each section its own `covers:` (choosing:
LO7; planning: LO6; release: LO7); dewsharp's format has one flat list.
`year:` is dropped, as dewsharp has no such field.

Status: written in one run on 27 September 2026. There was no partial draft
in this folder. The native check prints "No problems." for both files.

Files:

- `a-program-of-your-own.md`: the lesson. Two exec cells (the course map's
  "Two cells"), one predict, one challenge, and a release checklist.
- `a-program-of-your-own.native.json`: what the native check recorded for
  the lesson's cells.
- `NOTES.md`: this file. The probe cells at the end run with the same
  NativeCheck command (pass `NOTES.md` as the file). Two of them are exact
  copies of the lesson's challenge, which the checker does not run.
- `NOTES.native.json`: what the native check recorded for the probes.

## What changed, and why

**The opening program is the Caesar coder with methods**, as the map asks.
dewlab's program was one Python function, `encode`, called with 3 and then
with -3. The C# program has the two methods the reader wrote on
`writing-your-own-functions`: `Encode`, with the `((position + shift) % 26
+ 26) % 26` form that page's solutions settled on, and `Decode`, which
calls `Encode` with `-shift`. The message and shift are dewlab's
(`MEET ME AT NOON`, 3). The cell keeps dewlab's id, `a-whole-program-1`.

The cell is 26 lines, where dewlab's was fourteen: C# puts each brace on its
own line, and the program has a second method. That is longer than the
style guide's "five to fifteen lines", but this is the one place where the
page shows a whole program, as dewlab's did. The prose says "26 lines long"
(counted from the cell: the last line of the cell is line 26, blank lines
included).

dewlab asked "what do you think the second line of its output will be?" in
prose only. The C# page keeps the sentence and adds a `predict` of type
`text` under the cell, so that the page records the guess. It is the only
predict on the page; a project page has one program to guess about. The
answer (`MEET ME AT NOON`) is in the prose after it, from the recorded
output. The page then invites a change ("Can you change the message, or the
shift, and run it again?"), which dewlab did not have: the style guide's
"run first, then change".

"Something goes in, something is done to it, and something useful comes
out" became "It has an input, it does some work on it, and it gives an
output that is useful": *goes in* and *comes out* are phrasal verbs. The new
paragraph after it says that the input here is written in the code, and
that a program of the reader's own can ask for its input with
`Console.ReadLine()`, as `reading-input` did. That is the map's "A program
of your own can now ask its user for input".

**"No tasks to check and no solutions to open"** became "no solutions to
compare with and no answers to open", in the words of the page's own
button, **Compare with a solution**. *Check* could read as a verdict.

**Choosing what to build.** dewlab's two imperatives ("Choose
something...") became a statement: "A good project for this page has a
first version you could finish in an evening. It also has *room to grow*".
The term *room to grow* is defined where it appears, as in dewlab. dewlab's
glossary had a second term, *low floor*, that its page never used; this page
does not use it either. dewsharp has no glossary panel, so both glossary
definitions are in the prose (*room to grow* here, *release* in Release 1).

**Each starting point begins with a menu**, as the map asks. One new
paragraph defines *menu* in the reader's terms from `reading-input`: "a
list of choices, with 9 to quit, in a loop that asks again after each
choice". It adds the structure the page leans on: the first version has one
or two choices, and each step of room to grow can add one more. Then:

- *Cipher tool*: the first version has two choices, code and decode, asks
  for the message and the shift, and uses `Encode` and `Decode` from the
  opening program. Probe `cipher-release-1` shows that this first version
  needs only what the reader has met (62 lines, comments included, with
  `int.Parse`).
  The four steps of room to grow are dewlab's, unchanged.
- *Pixel-art maker*: the first version has one choice, draw a picture, kept
  as an array of strings with `#` and `.` (dewlab: "a list of strings";
  `looking-things-up-by-name` keeps pictures as `string[]`). Probe
  `pixel-art-first-version`. The palette step now names
  `Console.BackgroundColor` and links to `grids-and-references`, which
  draws pixels in colour; the native check cannot run colours, and no cell
  on this page uses them. "functions that change a picture" became
  "methods". The rule step gained "at a size the person types", the one
  place where input enters the list.
- *Something of your own*: "Its first version starts with a menu too, even
  if the menu has only one choice and 9 to quit." dewlab's "decide whether
  it is the right size" became "help you decide whether it is a good size"
  (*right* is on the style guide's list). "or can look up in an afternoon"
  became "or what you can find and learn in an afternoon" (*look up* is a
  phrasal verb).

The paragraph on ideas that fail adds one C# line: "So does anything these
pages cannot do, such as reading a file or opening a window." The teacher
notes in the course map list files and windows among what the page cannot
do. dewlab's "the first version never arrives" became "the first version
is never finished".

**Planning before you code.** "Before you write any Python, write the
plan" became a question: "Can you write the plan before any C#, the way the
first page did...?" The next sentences keep dewlab's order (the plan, then
the methods, and for each one what goes in and out), and add the menu's
choices. "What goes in and what comes out" became "what it takes and what
it returns", which avoids two phrasal verbs and uses the words the page
about methods taught.

Two short paragraphs are new, and both are about what C# makes different:

- "In C#, a method's first line says both." The signature of `Encode` is
  the example. In Python, dewlab's reader had to write the types in a
  comment; in C# the first line is the decision.
- A placeholder body (`return "";` or `return 0;`) compiles, as the
  your-turn cells on `writing-your-own-functions` did, so the compiler
  checks that each call in the menu matches a method's first line before
  any body is written. *Placeholder* is defined in the sentence ("a value
  that holds the place of the real answer"). Probe `stubs-compile` runs a
  whole menu over three placeholder methods, with no warning. Probe
  `stub-that-does-not-fit` shows the other half: a call that passes a
  `string` where the method takes an `int` does not compile (CS1503), even
  with a placeholder body. The page names no code for it, to keep the
  paragraph short.

The planning cell keeps dewlab's id, `planning-before-you-code-1`, and
stays a cell of comments, with one line added ("The choices on its menu,
and 9 to quit:") and "functions" changed to "methods ... its first line".
The native check calls it kind `empty` (see "Once the page UI exists").

**The challenge.** dewlab's challenge was a comment template for the
Notebook. The C# challenge keeps the template (name, version and date,
one sentence, and a comment for each method) and adds a menu that already
runs: a `do`...`while` round a `switch`, with one choice that prints "This
choice is still to be written.", 9 to quit, and a `default` that asks again.
This is where "each starting point begins with a menu" becomes code the
reader starts from. It is the shape the map gives `reading-input` ("a
`do`...`while` round a `switch` on the choice (`case "1":`, `default:`),
with 9 to quit ... `ReadLine` gives `null` when input ends ... and the
menu copes with it"): the loop's condition is
`choice != "9" && choice != null`. The placeholder message follows the
Microsoft Learn project in "Where to read more", which starts the same
way. The message says "still to be written" rather than "not written
yet": *not yet* is on the style guide's list of verdict words, even though
here it would describe the program and not the reader.
Probes `challenge-starter` (typed 1, 5, 9) and
`challenge-starter-input-ends` (no input) are exact copies of it. dewlab's
sentence "For a program longer than a few cells, the Notebook is a better
place" became "A program that grows for a week or two needs more room than
this page", because in dewsharp a whole PDP program is one cell.

**Release 1.** The definition of *release* is dewlab's, with "the day it
comes out" as "the day it appears". The checklist:

| dewlab | C# page |
|---|---|
| runs from the top, on a freshly loaded page, with no errors | "it compiles, and it runs to the end with no exception: a person can use each choice on its menu, and then quit". A fresh page means nothing in dewsharp, where each Run starts a new program; the check is now about the menu. |
| (new, from the map) | "every warning it shows is one you have read", with one sentence on why, and CS8321 as the example: "can mean that a menu choice does not call the method it should" (probe `warning-decode-never-called`: a menu whose choice 2 is not written yet, so `Decode` is never called). |
| one thing a person could use | unchanged |
| a comment at the top: name, version, date | unchanged |
| a comment under each `def` line | "a comment above its first line says what it takes and what it returns". C# puts comments above a method; XML comments wait for `building-reusable-tools`. |
| three inputs, one at an edge | two edges added: "a shift below zero" (probe `edge-shift-below-zero`: without the `+ 26`, `ABC` with -3 gives `>?@`, and with it `XYZ`) and "a word typed where the program asks for a number" (probe `edge-word-for-a-number`: `int.Parse` stops with a `FormatException`; probe `edge-word-for-a-number-tryparse`: `TryParse` asks again). The page says only that these are edges to try, not what a program should do with them. |
| somebody else has run it, and you watched where they got stuck | "where they stopped, not sure what to do next" (*get stuck* is an idiom) |
| a copy kept, with **Export a copy** in the Notes panel | "you have downloaded it as a Visual Studio project, and kept that copy, before you change it for Release 2" (the map's second new line; it replaces dewlab's export, which dewsharp does not have) |

So the list has eight lines where dewlab's had seven: the map's two new
lines, one of which takes the place of dewlab's last.

**"Your release in Visual Studio" is new.** The map names this page as one
of PDP's three with a Visual Studio part ("the release on
`a-program-of-your-own`"), and in PDP's order it is the first of them
(`when-it-goes-wrong` and `from-cells-to-a-program` come later). The steps
use the same words as the FOOP draft `the-tools-around-your-code` (download,
unzip, **File** > **Open** > **Project/Solution**, the `.csproj`, Ctrl+F5,
press a key to close). Two things are added: keep the downloaded file
unchanged as the copy of Release 1, and the code is in `Program.cs`, the
default `file:` name for a program cell (`docs/LESSON_FORMAT.md`). The
section says "On a computer with Visual Studio", because a learner at home
may not have it; downloading the copy needs no Visual Studio.

**Looking back.** The five questions are dewlab's, with "Where did you get
stuck" as "Where did you stop, not sure what to do next". dewlab sent the
answers to **Your notes** in its Notes panel, which dewsharp does not have.
The C# page says "You could write yours where you keep your plan: as
comments in your notebook, or on paper."

**The next page** is `finding-things`, whose map title is "Searching:
linear and binary search". It is in the same batch (5), so by the batch
rules the sentence names it in plain text, with no link, as
`looking-things-up-by-name` does for this page.

**Where to read more.**

- Downey's *Think Python*, chapter 4, is a Python book. In its place:
  Microsoft Learn,
  [Guided project - Develop conditional branching and looping structures in C#](https://learn.microsoft.com/training/modules/guided-project-develop-conditional-branching-looping/),
  a beginner module in eight units. It was read on 27 September 2026 (the
  module page, and units 2 and 3 in full). It starts from a program that
  shows a menu of eight choices, puts the menu in a `do` loop with a
  `switch`, gives each
  choice a "coming soon" message, and then writes two of the choices, one
  at a time, building and running after each step. That is this page's
  idea (a first version, then one step at a time) in C#, with a menu. Three
  differences, of which the page names two: it uses Visual Studio Code; it
  writes `string?` for `ReadLine`'s result, because its project has nullable
  reference types on (the page says "because of a setting in its project;
  the `?` stops a warning that these pages do not show"); and its menu ends
  when you type `exit`, not 9 (not mentioned). Its data is a `string[,]`,
  which `grids-and-references` shows.
- Singh, *The Code Book*: kept, with "a cipher tool could grow into" as
  "a cipher tool could add" (*grow into* is a phrasal verb).
- DevDuck's video: kept. Its title and channel were checked through
  YouTube's oEmbed on 27 September 2026 ("When is it Time to Move On from a
  Personal Project?", DevDuck). The length ("about seven minutes") and the
  summary are dewlab's and were not checked again: the transcript tool had
  no credits. "losing the will to work on a project" became "a project of
  his own that he no longer wanted to continue" (an idiom and a phrasal
  verb).

## What C# made different, in short

- The opening program has a method's first line to plan with:
  `static string Encode(string message, int shift)` says what goes in and
  what comes out, where Python needed a comment.
- A plan can compile before the program works: placeholder bodies let the
  compiler check that the calls fit.
- Real input (`Console.ReadLine()`) means a first version can have a menu,
  so each starting point begins with one, and the challenge starts with a
  menu that runs.
- The release checklist gains the compiler's warnings, and the copy is a
  Visual Studio project, which also runs outside the page.
- Two edges that are C#'s own: a shift below zero (`%` keeps the sign), and
  a word typed where `int.Parse` expects a number.
- "A freshly loaded page" means nothing when each Run starts a new program.
- Files and windows are named as things the page cannot do.

## Where each number and message in the prose comes from

| Number, message or claim | Source |
|---|---|
| `MEET ME AT NOON` on the second line (and `PHHW PH DW QRRQ` above it, not quoted) | lesson cell `a-whole-program-1` |
| "26 lines long" | the cell's code, counted: 26 lines, blank lines included (`awk` over the cell; the recorded output does not count lines) |
| "uses nothing from after the page about methods" | the cell uses `foreach` over a string, `char.IsUpper`, `+=` on a string, a cast to `char`, `%`, and two `static` methods, all met by `writing-your-own-functions` (whose solutions have the same `Encode` and `Decode`) |
| a placeholder body compiles; a menu over placeholder methods runs with no warning | probe `stubs-compile` |
| text passed where a method takes a whole number does not compile | probe `stub-that-does-not-fit` (CS1503) |
| the challenge runs as it is: choice 1 prints "This choice is still to be written.", 5 asks again, 9 quits, and the end of input ends it | probes `challenge-starter`, `challenge-starter-input-ends` |
| CS8321, *The local function 'Decode' is declared but never used* | probe `warning-decode-never-called` |
| a shift below zero is an edge | probe `edge-shift-below-zero` (`>?@` without `+ 26`, `XYZ` with it; an empty message gives an empty string) |
| a word where a number is asked for is an edge | probes `edge-word-for-a-number` (`FormatException`), `edge-word-for-a-number-tryparse` |
| a cipher tool's first version needs only what the reader has met | probe `cipher-release-1` |
| a pixel-art maker's first version | probe `pixel-art-first-version` |
| "9 to quit" | the map's entry for `reading-input` |
| "eight parts", "a menu of eight choices", "two of the choices" | the Microsoft Learn module, read on 27 September 2026 |
| "Chapters 1 and 2", "about seven minutes" | dewlab's page, unchanged |

The one compiler message quoted in the prose (CS8321) is quoted without a
file, line or column, so no position needs checking against the page.

## Once the page UI and the other pages exist

- **`reading-input` is not drafted.** Four things rest on the map's entry
  for it: the menu as "a `do`...`while` round a `switch`", "9 to quit", the
  `choice != null` check for the end of input, and `TryParse` (named only
  in these notes). When that page exists, the challenge's menu should match
  its menu line for line (the prompt, the text of `default`, how it ends on
  `null`), so that the reader meets one shape. The phrase "a loop that asks
  again after each choice" should match its words too.
- **`first-steps` is not drafted.** The planning paragraph says the first
  page wrote a plan "with one line of plain English for each step". The
  dewsharp drafts write pseudocode with capital verbs (`STORE`, `ADD`,
  `DISPLAY`); check that the sentence still describes what that page does.
- **The download button.** The checklist and the Visual Studio steps say
  "Download the cell that holds your program as a Visual Studio project".
  The words should match the button's label once the page exists, and the
  notebook must have the same button, since the reader's program lives
  there.
- **The notebook.** The page says the notebook is "a page of your own,
  where your cells are saved on this device", and that the starter "opens
  there, as a new notebook". Check both against `notebook.html` when it
  exists. "Looking back" suggests comments in the notebook; if the notebook
  has a place for notes, the sentence could name it.
- **The planning cell has only comments.** NativeCheck calls it kind
  `empty`. Check what the page shows for it (a Run button that does
  nothing, or no button), as for the comment-only cells on
  `looking-things-up-by-name` and the FOOP "your own" worlds.
- **The predict of type `text`** is on a cell whose output has two lines,
  and it asks about the second. Check how the page lays the guess beside a
  two-line output.
- **The console echo.** The native check does not show what is typed, so
  the probes' outputs run the prompts together (`Your choice: Message:`).
  On the page, the typed line should appear after each prompt. Nothing in
  the prose quotes this output.
- **A forward link to this page.** `looking-things-up-by-name` (batch 4)
  ends with "The next page, A program of your own, is a chance to build
  something with everything so far". By the batch rules, this batch should
  turn that into a link, `[A program of your own](lesson:a-program-of-your-own)`.
  This run could not edit that folder; whoever merges the two should make
  the change. `critique-and-reflection` (batch 6) depends on this page and
  will link to it.

## Open questions for a reviewer

1. **Menus everywhere?** The map says each starting point "begins with a
   menu". For "something of your own", the page says the first version
   "starts with a menu too, even if the menu has only one choice and 9 to
   quit". A small quiz might be better as questions in order, with no menu.
   Is the menu a rule for this page, or a suggestion?
2. **The challenge is 29 lines** of starter code, where dewlab's was five
   comment lines. The menu makes it longer, but it runs as it is, and the
   reader's first Release is then "write choice 1". Is that too much of the
   program given away for a project page? The other choice is dewlab's
   comment template alone, with the menu described in prose.
3. **The placeholder paragraph** ("You can even write every method's first
   line before you write its body") is not in dewlab. It is the one C#
   planning habit the compiler makes possible, and it uses a shape the
   reader met on the page about methods. Keep it, or leave it for
   `from-cells-to-a-program`, where the team agrees on method signatures?
4. **The opening program is 26 lines.** Dropping `Decode` and calling
   `Encode(secret, -3)`, as dewlab did, would make it 21 lines, and the
   `+ 26` would still be needed for a coded message with A, B or C in it. `Decode`
   was kept because the map says "methods" and the cipher tool's first
   version uses both.
5. **Visual Studio at home.** The steps are for "a computer with Visual
   Studio". Map open question 11 (which Visual Studio, and do learners have
   Windows?) decides whether the steps should also name Visual Studio Code,
   which the Microsoft Learn project uses.
6. **Two edges in the checklist are C#'s own** (a shift below zero; a word
   where a number is asked for). The checklist was already the longest list
   on the page. Keep both, or keep one?
7. **No link to `finding-things`** until that page exists (same batch).

## Probe cells

Run with the NativeCheck command, passing this file. The two cells with
`expect:` fail on purpose.

```csharp exec
id: challenge-starter
stdin: "1\n5\n9\n"
// Name:
// Version 1, and the date:
// What it does, in one sentence:

// Your methods go here, above the menu.
// Above each one, a comment: what it takes, and what it returns.


// The menu: one choice to start with, and 9 to quit.
string choice;
do
{
    Console.WriteLine("1. (your first choice)");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: challenge-starter-input-ends
// Name:
// Version 1, and the date:
// What it does, in one sentence:

// Your methods go here, above the menu.
// Above each one, a comment: what it takes, and what it returns.


// The menu: one choice to start with, and 9 to quit.
string choice;
do
{
    Console.WriteLine("1. (your first choice)");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: cipher-release-1
stdin: "1\nMEET ME AT NOON\n3\n2\nPHHW PH DW QRRQ\n3\n7\n9\n"
// Cipher tool
// Version 1, 27/09/2026
// Codes and decodes a message with a Caesar shift.

// Takes a message and a shift. Returns the message with each capital
// letter moved shift places along the alphabet.
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

// Takes a coded message and its shift. Returns the message decoded.
static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string plain = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine(Encode(plain, shift));
            break;
        case "2":
            Console.Write("Coded message: ");
            string coded = Console.ReadLine();
            Console.Write("Shift: ");
            int backShift = int.Parse(Console.ReadLine());
            Console.WriteLine(Decode(coded, backShift));
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: warning-decode-never-called
stdin: "1\nHELLO\n3\n2\n9\n"
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine(Encode(message, shift));
            break;
        case "2":
            Console.WriteLine("This choice is still to be written.");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: stubs-compile
stdin: "1\nHELLO\n2\nKHOOR\n9\n"
// Each method's first line is written; each body is a placeholder.
static string Encode(string message, int shift)
{
    return "";
}

static string Decode(string message, int shift)
{
    return "";
}

static int ReadShift()
{
    return 0;
}

string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("2. Decode a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.WriteLine(Encode(message, ReadShift()));
            break;
        case "2":
            Console.Write("Message: ");
            string coded = Console.ReadLine();
            Console.WriteLine(Decode(coded, ReadShift()));
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1, 2 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: stub-that-does-not-fit
expect: CS1503
static string Encode(string message, int shift)
{
    return "";
}

string message = "HELLO";
string shift = "3";
Console.WriteLine(Encode(message, shift));
```

```csharp exec
id: edge-shift-below-zero
static string EncodeWithoutPlus26(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)((position + shift) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

Console.WriteLine(EncodeWithoutPlus26("ABC", -3));
Console.WriteLine(Encode("ABC", -3));
Console.WriteLine($"[{Encode("", 3)}]");
```

```csharp exec
id: edge-word-for-a-number
stdin: "1\nHELLO\nthree\n"
expect: exception
string choice;
do
{
    Console.WriteLine("1. Code a message");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.Write("Message: ");
            string message = Console.ReadLine();
            Console.Write("Shift: ");
            int shift = int.Parse(Console.ReadLine());
            Console.WriteLine($"{message} {shift}");
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

```csharp exec
id: edge-word-for-a-number-tryparse
stdin: "three\n3\n"
int shift;
Console.Write("Shift: ");
while (!int.TryParse(Console.ReadLine(), out shift))
{
    Console.Write("Please type a whole number: ");
}
Console.WriteLine($"The shift is {shift}.");
```

```csharp exec
id: pixel-art-first-version
stdin: "1\n9\n"
// Takes a picture, one string for each row. Returns nothing: it prints
// the picture.
static void Draw(string[] picture)
{
    foreach (string row in picture)
    {
        Console.WriteLine(row);
    }
}

string[] heart =
{
    ".#...#.",
    "###.###",
    "#######",
    ".#####.",
    "..###..",
    "...#...",
};

string choice;
do
{
    Console.WriteLine("1. Draw the picture");
    Console.WriteLine("9. Quit");
    Console.Write("Your choice: ");
    choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Draw(heart);
            break;
        case "9":
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```
