---
title: "A program of your own: plan it, build it, release it"
version: 2026.09.28.1
from: a-program-of-your-own
covers: [PDP-LO7, PDP-LO5, PDP-LO6]
---

# A program of your own: plan it, build it, release it

Here is a whole program. Before you run it, what do you think the second
line of its output will be?

```csharp exec
id: a-whole-program-1
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

string secret = Encode("MEET ME AT NOON", 3);
Console.WriteLine(secret);
Console.WriteLine(Decode(secret, 3));
```

```predict
type: text

What will the second line print?
```

It codes a message, and then decodes it again, by moving each letter the
same number of places in the other direction. The second line is
`MEET ME AT NOON`. The whole program is 26 lines long, as the numbers
beside its lines show. Everything in it is from
[the page about methods](lesson:writing-your-own-functions) or the pages
before it. That is enough to count as a program. It has an input, it does
some work on it, and it gives an output that is useful. Can you change the
message, or the shift, and run it again?

Here, the input is written in the code. A program of your own can ask the
person using it to type its input, with `Console.ReadLine()`, as
[Reading input](lesson:reading-input) did.

This page is not like the others. It has no solutions to compare with and
no answers to open. It asks you to build a small program of your own in
the next week or two, and to release a first version of it. Everything from
the pages before this one is yours to use, and so is anything you find
elsewhere.

## Choosing what to build

A project that suits this page has a first version you could finish in an
evening. It also has *room to grow*: a next step, and a step after that,
each one small.

Here are three starting points. Each one begins with a *menu*, like the one
on [Reading input](lesson:reading-input): a list of choices, with 9 to quit, in a loop that asks
again after each choice. The first version has one or two choices. Each
step of room to grow can add one more.

**A cipher tool.** The first version has two choices: code a message, or
decode one. It asks for the message and the shift, and uses `Encode` and
`Decode` from the program above. It has room to grow:

- a key of your own, kept in a dictionary, in place of a shift;
- small letters, spaces and punctuation handled on purpose;
- cracking a shift with no key, by counting letters, as in the challenge
  on [the page about dictionaries](lesson:looking-things-up-by-name);
- a keyword cipher, where each letter has its own shift, taken from a
  word the two spies share.

**A pixel-art maker.** The first version has one choice: draw a picture.
The picture is kept in the program as an array of strings, with `#` and
`.`. It has room to grow:

- a palette dictionary, with more characters, each drawn in its own colour
  with `Console.BackgroundColor`, as on
  [the page about grids](lesson:grids-and-references);
- methods that change a picture: mirror it, turn it upside down, make
  its negative;
- a method that makes a picture twice as big, each pixel becoming a
  2 × 2 square;
- a picture made by a rule, such as a checkerboard, a border or a circle,
  at a size the person types.

**Something of your own.** It could be a tool for a thing you do by hand,
a small quiz or game, or a program that answers a question you have. Its
first version starts with a menu too, even if the menu has only one choice
and 9 to quit. Two questions help you decide whether its size suits this
page:

- Can you say, in one sentence, what its first version will do?
- Does that first version need only what you have met, or what you can
  find and learn in an afternoon?

Some ideas fail in the same ways, whoever tries them: anything that needs a
login, or somebody else's service, or a library you have never used. So
does anything these pages cannot do, such as reading a file or opening a
window. The interesting part of those is hard to reach, and the first
version is never finished.

## Planning before you code

Can you write the plan before any C#, as pseudocode, the way
[the first page](lesson:first-steps) did: one line of plain English for
each step? After the plan, you can list the choices on the first version's
menu, and name the methods the program needs. For each method, the plan
says what it takes and what it returns.

In C#, a method's first line says both.
`static string Encode(string message, int shift)` takes a string and a
whole number, and returns a string. Once you have decided that, you can
write the method and try it in a cell of its own, with a few calls under
it, before the menu exists.

You can even write every method's first line before you write its body. A
body that only returns a *placeholder*, a value that holds the place of the
real answer, such as `return "";` or `return 0;`, compiles, as in the tasks
on the page about methods. Then the compiler checks that each call in the
menu matches a method's first line, before any of the real work is
written. A call that passes text where a method takes a whole number does
not compile, even with a placeholder body.

```csharp exec
id: planning-before-you-code-1
// My program:
// What its first version does, in one sentence:
//
// The plan, one step per line:
//
// The choices on its menu, and 9 to quit:
//
// The methods it needs. For each one, its first line,
// and what it takes and what it returns:
//
```

A program that grows for a week or two needs more room than this page. The
notebook is a page of your own, where your cells are saved in this
browser, on this device. **Open in my notebook**, under the starter below,
opens it there as a new notebook. It has a place for your program's name
and your methods, and a menu that already runs, with one choice that is
still to be written. `Console.ReadLine()` gives `null`, C#'s value for
*nothing here*, when there is no more input: on the page, when you press
**End input**. Then the menu stops, as it does for 9.

```csharp challenge
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
        case null:
            break;
        default:
            Console.WriteLine("Please type 1 or 9.");
            break;
    }
}
while (choice != "9" && choice != null);
```

Some computers clear what a browser saves at the end of each session. So
before you leave, press **Export this notebook**, under the notebook's
cells. It saves the notebook to a file, which you can import again on any
computer.

## Release 1

A *release* is a version of your program that somebody else could use on
the day it appears, however little it does. A plan is not a release, and
neither is most of a program. Release 1 is the smallest thing that does
anything at all. It should feel almost too small to show anyone.

**Before you call it Release 1, check that:**

- [ ] it compiles, and it runs: a person can use each choice on its menu,
  and then quit, and it never stops with an exception;
- [ ] every warning it shows is one you have read. A warning does not stop
  the program, but it can name a line that does not do what you meant.
  CS8321, *The local function 'Decode' is declared but never used*, can
  mean that a menu choice does not call the method it should;
- [ ] it does one thing a person could use, however small;
- [ ] a comment at the top gives its name, a version number and the date;
- [ ] each method's name says what it does, and a comment above its first
  line says what it takes and what it returns;
- [ ] you have tried it on at least three inputs whose answers you knew
  already, and one of them was at an *edge*, an input at the limit of what
  the program expects: an empty message, a shift below zero, a word typed
  where the program asks for a number, a picture one pixel wide;
- [ ] somebody else has run it, before you explained anything, and you
  watched where they stopped, not sure what to do next;
- [ ] you have pressed **Download project** on its cell, and kept the file
  it saves, before you change anything for Release 2.

The last check is more important than it looks. Release 2 will break
something that Release 1 did, and with a copy, you can see what changed.

### Your release in Visual Studio

You can write, run and test every release here, in your notebook, and none
of it needs Visual Studio. Visual Studio is where your program runs on its
own, outside this site, as a program somebody could use. On a computer with
Visual Studio, you can open the copy you downloaded and run it:

1. Press **Download project** on the cell that holds your program. The
   page saves a ZIP file. Keep that file as it is: it is your copy of
   Release 1. To open it, unzip it: right-click it, and choose
   **Extract All**.
2. In the folder, double-click the file that ends in `.sln`. Or, in Visual
   Studio, choose **File**, then **Open**, then **Project/Solution**, and
   choose that file.
3. Press Ctrl+F5 to run the program. A console window opens, and your menu
   appears in it. Type your choices there, as you did on the page. When the
   program ends, press a key to close the window.

Your program's code is in the file `Program.cs`. The project also has
`IrishCulture.cs`, which makes money and dates look as they do on the page.
The console window should show what the page showed. If it does not, that
is worth a note for Release 2.

The project has the same settings as the page, so it shows the same
warnings. A new project from Visual Studio's own template has one setting
on that these pages have off: *nullable reference types*. With it on, the
compiler warns about each place where a value could be `null`. In the
starter above, it gives warning CS8600 for the line
`choice = Console.ReadLine();`, because `ReadLine` can give `null`.

## Looking back

These questions have no answers to open. You could write yours where you
keep your plan: in a text cell in your notebook, beside your program, or
on paper.

- What did you plan that you did not build? What did you build that you
  had not planned?
- Where did you stop, not sure what to do next, and what helped you
  continue: a hint, an earlier page, a person, or a break?
- Which part of your program would you most like somebody to read? Which
  part would you least like them to?
- When somebody else ran it, what did they do that you did not expect?
- What would Release 2 add, and what is the smallest version of that?

The next page, [Searching](lesson:finding-things), looks at a question that
every program meets: how to find one thing among many, and how long it
takes.

## Where to read more

Microsoft. *Guided project: Develop conditional branching and looping
structures in C#.*
<https://learn.microsoft.com/training/modules/guided-project-develop-conditional-branching-looping/>.
A project for beginners, in eight parts. It starts from a program that
shows a menu of eight choices. You put the menu in a loop, give each choice
a message that says it is still to come, and then write two of the choices,
one at a time, running the program after each step. It uses Visual Studio
Code, another editor from Microsoft. Its code writes `string?` in some
places where these pages write `string`, because its project has
*nullable reference types* on. The `?` says that the variable can hold
`null`, and it stops the warning CS8600.

Singh, S. (1999). *The Code Book: The Secret History of Codes and
Codebreaking*. Fourth Estate. Chapters 1 and 2 are full of ciphers that a
cipher tool could add, including the keyword cipher above.

DevDuck (2020). *When is it Time to Move On from a Personal Project?*
<https://www.youtube.com/watch?v=4f3Ss5n7SRQ>. A developer talks about a
project of his own that he no longer wanted to continue. He talks about
creative blocks and burnout, and what a person can do when they happen. The
video is about seven minutes long.
