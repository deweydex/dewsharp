---
title: "Compiler errors: what C# checks before it runs anything"
version: 2026.09.28.1
from: reading-an-error-message
covers: [PDP-LO9, PDP-LO4, FOOP-LO5, FOOP-LO10]
---

# Compiler errors: what C# checks before it runs anything

This program has a mistake in it, on purpose. Its first two lines have no
mistake. Its third line has a name with a letter missing. What do you
think will appear under the cell when you run it?

```csharp exec
id: a-first-error-1
expect: CS0103
string message = "MEET AT NOON";
Console.WriteLine(message);
Console.WriteLine(mesage.Length);
```

```predict
type: choice

What will appear under the cell?

- `MEET AT NOON`, and then a message about line 3
  - Some languages run a program one line at a time, and stop at the first
    line they cannot run. Python is one of them. Is C# one of them?
- Only a message about line 3
  - C# checks the whole program before it runs any of it.
- `MEET AT NOON`, and then the number of characters in it
  - That needs C# to know what `mesage` means. Does anything in the
    program have that name?
```

Nothing is printed, not even `MEET AT NOON`. The page shows one message
instead:

```console
Program.cs(3,19): error CS0103: The name 'mesage' does not exist in the current context
```

Line 2 has no mistake, and it did not run either. Before C# runs a program,
it reads all of it and checks it. That is *compiling*. If it finds a
problem, it runs nothing and tells you where the problem is. The part of C#
that does the checking is the *compiler*. A *compiler error* is a problem
that the compiler finds, and that stops the program from running.

Can you make the program run? It takes one change, on line 3.

```solution
string message = "MEET AT NOON";
Console.WriteLine(message);
Console.WriteLine(message.Length);
---
It prints `MEET AT NOON`, and then `12`: the message has 12 characters,
and the spaces count. With the name spelt the same way on every line, the
compiler finds no problem, and the program runs.
```

On [Your first C# program](lesson:first-steps#when-c-finds-a-problem), you
met one compiler error: a missing semicolon. On
[Variables and types](lesson:storing-and-computing#data-types-different-kinds-of-information),
you met another: some text put in a variable that holds whole numbers. If
you know Python, [C# for Python programmers](lesson:from-python-to-csharp)
showed you the same message. This page is about messages like these: how
to read one, which ones people meet most in their first weeks of C#, what
to do when there are several, and a quieter kind of message, called a
warning.

So here we break things on purpose. Most cells below are meant not to
compile, and each one says so before you run it. When one does not
compile, nothing is broken: the page is working as it should. Every cell
uses only what the earlier pages have met: variables and their types,
arithmetic, text, `Console.WriteLine` and `Console.ReadLine`.

A compiler error is a fact about one line of code. It is not a fact about
whether you can learn to program.

## Compiling: C# checks first

When you press Run, the compiler reads the whole cell. It checks every
name: is there a variable, a type or a method with that name? It checks
every value: does its type fit the place where it is put? It checks that
every bracket and every quote that opens also closes, and that every step
ends with a semicolon. Nothing runs until the whole program passes these
checks.

If you know Python: Python also checks some things before it starts, such
as a bracket or a quote that never closes. But it finds a misspelt name
only when it reaches that line. So in Python, the first program on this
page would print its first line and then stop. C# finds both kinds of
mistake before anything runs.

When you press Run, one of three things happens, and this site always
names them the same way. After each Run, the words beside the **Run**
button say which one happened:

- **It did not compile.** The compiler found a problem, so nothing ran. The
  messages under the cell say where.
- **It stopped with an exception.** The program compiled and started. It
  ran until it reached a line it could not complete, and it stopped there.
  [Exceptions](lesson:reading-an-error-message) is the page about these.
- **It ran.** It ran from the first line to the last. Whether the result is
  what you wanted is for you to decide.

A mistake that the compiler finds costs a few seconds. Nobody who uses the
program ever meets it, because a program with a compiler error never runs.
A mistake in a line that runs only on some days, or only when somebody
types a certain answer, can be there for weeks before anybody sees it.

<details class="dl-why"><summary>What does compiling make?</summary>

The code you write is *source code*: text that people can read and change.
A computer's *processor*, the part that follows a program's instructions,
cannot follow source code. It follows only *machine code*: instructions
written as numbers. Each kind of processor has its own machine code.

A compiler translates source code into another form. A compiler for the
language C translates it into machine code for one kind of processor. The
C# compiler does not make machine code. It makes an in-between form,
called *Intermediate Language*, or IL. IL is not the machine code of any
processor.

C# comes with *.NET*: the tools that compile and run C# programs, and a
large collection of ready-made code, such as `Console` and `Math`. When
the program runs, the *.NET runtime*, the part of .NET that runs
programs, changes the IL into machine code for the machine it is on, just
before each part runs. The part of the runtime that does this is the *JIT
compiler*. JIT is short for *just in time*.

So one compiled C# program can run on Windows, on a Mac and on Linux, and
on different kinds of processor. Each machine makes its own machine code.
A program like this is *architecture neutral*: it does not depend on the
design of the machine, which is called its *architecture*.

On this page, all of this happens inside the browser tab. The compiler runs
in the tab, and so does the .NET runtime. Here, the runtime runs the IL with
an *interpreter*: a program that reads another program's instructions and
does what each one says, one after another, without making machine code
first. So the same C# is compiled, and then interpreted. Python works in a
similar way: it translates your code into its own in-between form, called
bytecode, and its interpreter runs that.

[Programming languages](lesson:how-we-got-here) tells the longer story of
compilers and interpreters.

</details>

## Reading a message

The message from the first cell has five parts. Nearly every message from
the compiler has the same five, in the same order.

```console
Program.cs(3,19): error CS0103: The name 'mesage' does not exist in the current context
```

| Part | In this message | What it tells you |
|---|---|---|
| the file | `Program.cs` | Which file the problem is in. A cell's code is in a file called `Program.cs`. |
| the line | `3` | Which line to look at first. |
| the column | `19` | How far along the line: the 19th character, counting from 1. Spaces count too. |
| the code | `CS0103` | The kind of problem. Every kind has its own code, and you can search for it. |
| what the compiler found | `The name 'mesage' does not exist in the current context` | The problem, in words. |

Between the column and the code is the word `error`. It means that the
program cannot run until something changes. A message with the word
`warning` in its place is a quieter kind, and a section below is about
those.

Earlier pages called the two numbers in brackets, `(3,19)`, the *place*:
the line and the column together. Here each of them has a row of its own,
because each tells you something different.

Line 3 is `Console.WriteLine(mesage.Length);`. Count along it, starting
from 1 and counting every character: the 19th is where `mesage` starts.
*Does not exist* means that nothing in the program has that name. *In the
current context* means here, at this place in the program.

You do not have to count. Click a message, and the page moves the cursor to
that place in the code. The page also draws a line under the place, and a
mark beside the line's number.

Visual Studio, the program that many C# programmers write their code in,
shows the same messages, with the same codes. It draws a red wavy line
under the place, often while you type, before you run anything. Choose
**View**, then **Error List**, to see every message with its code, its
description, its file and its line. Double-click a message, and Visual
Studio moves to that line.

## The messages you will meet most

Here are the compiler errors that people meet most in their first weeks of
C#. Each cell in this section is meant not to compile. Run it, and read the
message before you read the paragraph under it.

### A name it does not know

```csharp exec
id: a-name-it-does-not-know-1
expect: CS0103
print("Hello, world!");
console.WriteLine("Hello, world!");
```

Two messages, both CS0103, one for each line:

```console
Program.cs(1,1): error CS0103: The name 'print' does not exist in the current context
Program.cs(2,1): error CS0103: The name 'console' does not exist in the current context
```

`print` is how Python and some other languages show text. C# has no method
called `print`, so to the compiler it is a name that means nothing. On line
2, `console` starts with a small c. C# sees a capital letter and a small
letter as different letters, so `console` and `Console` are two different
names, and only `Console` exists.

When you meet CS0103, compare the name in the message with the name you
meant, letter by letter, capitals included. Often the two are the same
name, spelt in two ways. Can you make both lines print `Hello, world!`?

```solution
Console.WriteLine("Hello, world!");
Console.WriteLine("Hello, world!");
---
Both lines use `Console.WriteLine`, with a capital C and a capital W.
```

### A quote left open

How many messages do you think one missing quote can cause? This cell is
meant not to compile. Run it, and count them.

```csharp exec
id: a-quote-left-open-1
expect: CS1010
Console.WriteLine("Hello, world!);
```

Three messages, and all three come from one missing quote:

```console
Program.cs(1,19): error CS1010: Newline in constant
Program.cs(1,35): error CS1026: ) expected
Program.cs(1,35): error CS1002: ; expected
```

The first message is the one about the quote. A *constant* here is a value
written in the code, such as `"Hello, world!"` or `42`. A *newline* is the
end of a line. So CS1010 says that a piece of text reached the end of the
line before its closing quote. Its column, 19, is where the text starts.

The compiler then read `);` as part of the text. So, to the compiler, the
line has no closing bracket and no semicolon, and that gives the other two
messages: CS1026, `) expected`, and CS1002, `; expected`. What happens to
the three messages when you add the closing quote after the `!`?

This is why, when there are several messages, the page adds a line under
them: *Read the first message first: one mistake can cause several
messages.* Change the place that the first message names, and run the cell
again. Often some of the others disappear with it. Several messages can
also be several mistakes, one for each message. The practice page has both
kinds.

CS1026 on its own means a bracket that opens and never closes. The fourth
of the broken programs below has one.

### A value of another type

A variable's type is fixed when the variable is made. This program is
written to ask for your age, and it is meant to fail. Of the three things
that can happen when you press Run, which do you think it will be?

```csharp exec
id: a-value-of-another-type-1
expect: CS0029
stdin: "34\n"
Console.Write("How old are you? ");
int age = Console.ReadLine();
Console.WriteLine($"Next year you will be {age + 1}");
```

```predict
type: choice

What will happen when you press Run?

- It asks your age, and then says how old you will be next year
  - That needs C# to change what you type into a number. Does anything on
    line 2 ask it to?
- It asks your age, and stops with an exception when you type it
  - An exception can happen only while a program runs. Did this one start?
- It does not compile, so nothing runs
  - The compiler checks the types on each side of the `=`.
```

It does not compile, and it never asks for your age. The message is:

```console
Program.cs(2,11): error CS0029: Cannot implicitly convert type 'string' to 'int'
```

Column 11 is where `Console.ReadLine()` starts. `Console.ReadLine()` always
gives a `string`, even when the person types a number, and `age` is an
`int`. To *convert* a value is to change it to another type. *Implicitly*
means without being told to. C# changes text into a number only when the
code asks it to, with a method. Can you change line 2 so that it asks, with
the method from [Variables and types](lesson:storing-and-computing#type-conversion)?

```solution
Console.Write("How old are you? ");
int age = int.Parse(Console.ReadLine());
Console.WriteLine($"Next year you will be {age + 1}");
---
`int.Parse` reads the text as a whole number, and it gives an `int`, so
the types on each side of the `=` are the same. With `34` typed, the
program prints `Next year you will be 35`. The compiler cannot know what
somebody will type, though. [Variables and types](lesson:storing-and-computing#type-conversion)
showed what happens when the text is a word, such as *thirty*.
```

Here is a second message about types. This cell is meant not to compile
too.

```csharp exec
id: a-value-of-another-type-2
expect: CS0266
double price = 4.50;
int euro = price;
Console.WriteLine(euro);
```

```console
Program.cs(2,12): error CS0266: Cannot implicitly convert type 'double' to 'int'. An explicit conversion exists (are you missing a cast?)
```

You met this message on [the powers page](lesson:powers-in-csharp#where-else-it-happens).
Why does it have a different code from the cell above? CS0029 means that
C# has no conversion from one type to the other, not even with a cast: text
is not a number, and only a method such as `int.Parse` can read it as one.
CS0266 means that a conversion exists, but it could lose something, here
the .50. So C# converts only when the code says so, with a cast.
*Explicit* means written in the code. Can you add the cast to line 2?

```solution
double price = 4.50;
int euro = (int)price;
Console.WriteLine(euro);
---
It prints `4`. The cast `(int)` keeps only the whole part, and the .50 is
lost. A cast is how the code says that losing it is what you want.
```

### A variable with no value

This cell is meant not to compile. The first line makes a variable,
`total`, and gives it no value.

```csharp exec
id: a-variable-with-no-value-1
expect: CS0165
int total;
total = total + 5;
Console.WriteLine(total);
```

```console
Program.cs(2,9): error CS0165: Use of unassigned local variable 'total'
```

To *assign* a value is to put it in a variable with `=`. So an *unassigned*
variable is one that has never had a value. A *local variable* is one made
inside a program or a method, as every variable on these pages is. Column
9 is the second `total` on line 2: the one whose value the line reads, to
add 5 to it. `total` has no value yet, so there is nothing to add to. Some
languages would start it at 0 without saying so. C# asks the code to say
what it starts at. Can you give `total` a value on line 1?

```solution
int total = 0;
total = total + 5;
Console.WriteLine(total);
---
It prints `5`. A total usually starts at 0, and now the code says so.
```

## Warnings

Not every message stops a program. What do you think this cell will print?

```csharp exec
id: warnings-1
string message = "MEET AT NOON";
int shift = 3;
Console.WriteLine(message);
```

```predict
type: choice

What will appear under the cell?

- MEET AT NOON
  - A variable that is never used is allowed.
- Nothing: it does not compile
  - `shift` is made, and never used. Is that a reason to stop a program?
```

It runs, and it prints `MEET AT NOON`. Above the output, the page shows a
message:

```console
Program.cs(2,5): warning CS0219: The variable 'shift' is assigned but its value is never used
```

A *warning* is a message about code that can run, but that often means a
mistake. A warning never stops a program. The message says `warning` where
an error says `error`, and the page shows it in a quieter colour.

Why warn about a variable that nothing uses? Often, a line that was meant
to use it has another name in it, or the line is missing. Here, perhaps the
program was meant to move each letter of the message `shift` places, and
that part was never written. When a program runs and does something you
did not expect, read its warnings. A warning is something the compiler
noticed, and allowed. The practice page has a program where a warning is
the only clue.

## Your turn: four broken programs

Here are four broken programs. Each one is meant not to compile. Can you
fix them, one at a time and in order? For each one:

1. Run it.
2. Read the first message. Which character of the line does its column
   name?
3. Change the line.
4. Run it again.

```csharp exec
id: four-broken-programs-1
expect: CS0246
// 1. A type the compiler cannot find
Int hours = 12;
Console.WriteLine(hours);
```

```solution
// 1. A type the compiler cannot find
int hours = 12;
Console.WriteLine(hours);
---
C#'s type for whole numbers is `int`, with a small i. It prints `12`.
```

```csharp exec
id: four-broken-programs-2
expect: CS1012
// 2. Text in single quotes
string name = 'Aoife';
Console.WriteLine(name);
```

```hint
after: 2 errors
Which quotes does a `string` use, and which does a `char` use?
```

```solution
// 2. Text in single quotes
string name = "Aoife";
Console.WriteLine(name);
---
Text goes in double quotes. It prints `Aoife`.
```

```csharp exec
id: four-broken-programs-3
expect: CS1003
// 3. A step with no end
int count = 5
Console.WriteLine(count);
```

```hint
after: 2 errors
What marks the end of a step in C#? Does line 2 have one?
```

```solution
// 3. A step with no end
int count = 5;
Console.WriteLine(count);
---
Line 2 needed a semicolon at its end. It prints `5`.
```

```csharp exec
id: four-broken-programs-4
expect: CS1026
// 4. A bracket that opens and never closes
int result = (5 + 3;
Console.WriteLine(result);
```

```solution
// 4. A bracket that opens and never closes
int result = (5 + 3);
Console.WriteLine(result);
---
The bracket closes after the 3. It prints `8`.
```

The first one gave CS0246. `Int`, with a capital I, is not a type that C#
knows, so the message says *The type or namespace name 'Int' could not be
found*. A *namespace* is a group of types with a name of its own: `Console`
and `Math` are in the namespace `System`. The message ends with a question:
*(are you missing a using directive or an assembly reference?)*. Those are
two other reasons why a type can be missing, and the fold below says what
they are. Here, neither was the reason. A message's suggestion is worth
reading, and it is not always the answer.

The second one gave CS1012, *Too many characters in character literal*. A
*literal* is a value written in the code, like the *constant* in the
message about a quote left open. Single quotes make a `char`, which holds
one character, so the compiler expected one character between them, and it
found a whole name. Text needs double quotes. (Python accepts either kind of quote for text, so this message is
common for anybody who knows Python.)

The third one asked for a comma: *Syntax error, ',' expected*. The mark
that is missing is a semicolon. *Syntax* is the grammar of a language:
which words and marks may go where. Nothing ended line 2, so the compiler
read lines 2 and 3 as one step: `int count = 5 Console.WriteLine(count);`.
A comma could come after the 5 in a step like that: `int count = 5, total
= 0;` makes two variables in one step. So the compiler asked for a mark
that it could use there. Its column, 14, is just after the 5. When a
message asks for something that makes no sense, look at the place it
names, and just before it.

The fourth one gave CS1026, `) expected`, at column 20. Column 20 is the
semicolon: the compiler expected a `)` there. The bracket that opens after
the `=` never closes. The compiler names the place where it expected the
`)`, not the place where the bracket opened. So search the line, before
that place, for a bracket that opens.

<details class="dl-why"><summary>What joins the parts of a program?</summary>

A program uses parts that it did not write. `Console`, `Math` and `string`
are parts of .NET, written by Microsoft. In languages such as C, a separate
tool called a *linker* joins a compiled program to the parts it uses. That
step is called *linking*, and the linker has messages of its own.

C# has no separate step that you run. The compiler does this job while it
compiles. It searches for every part the program names, in the program's
own files, and in the *libraries* that the program references: the
collections of ready-made code that the program is allowed to use. Three
of its messages come from this job:

| Code | What the compiler found | Where you meet it |
|---|---|---|
| CS0246 | It cannot find a type. | A type name spelt in another way, as in the first broken program. Or a missing `using` line: a line at the top of a file, such as `using System.Text;`, that lets the code use the types in a namespace by their short names. The message calls it a *using directive*. Or a missing *reference*: a library that the project has not been told about. The message calls it an *assembly reference*. |
| CS5001 | The program has no place to start. | In Visual Studio, for example when `Program.cs` is empty. Many books, and older programs, start in a method called `Main`, and a program with no `Main` and no lines of its own has no place to start. A cell on these pages starts at its first line, so a program cell always has a place to start. |
| CS0017 | The program has more than one `Main` method, so the compiler cannot choose where to start. | In Visual Studio, in a project with several files, when two of them have a `Main`. |

On this page, and in a new Visual Studio project, the most common `using`
lines are already there, without being written. That is why `Console`
works without one.

</details>

## Your turn: break it on purpose

This program runs. Can you break it, one mistake at a time, and say which
code the compiler will give before you run it? Write your guess in the
comment at the top of the cell each time, then run it. Before the next
mistake, press **Reset**, or press Ctrl+Z, to undo the last one.

```csharp exec
id: break-it-on-purpose-1
// Before each Run, write the code you expect here.
// I think: CS
string message = "MEET AT NOON";
int letters = message.Length;
Console.WriteLine($"{message} has {letters} characters.");
```

Here are some mistakes to try:

- Delete the semicolon at the end of line 3.
- Delete the closing quote after `NOON` on line 3.
- Write `Letters`, with a capital L, in the last line.
- Change `int` to `string` on line 4.
- Delete `= message.Length` from line 4.
- Delete the last `)` on line 5.
- Delete the `$` on line 5. This one is different. Does the compiler find
  it?

Which of your guesses were the same as the code the compiler gave? For the
ones that were not, what does the message say that you did not expect?
Every code on this page is in the table below.

## The codes on this page

| Code | What the compiler found | What to check |
|---|---|---|
| CS0103 | a name it does not know | the spelling, letter by letter, capitals included |
| CS1002 | `; expected` | a missing semicolon, at the place it names |
| CS1003 | a mark it expected, such as a comma | a missing semicolon at the end of the line it names |
| CS1010 | a piece of text that reaches the end of the line | a missing closing quote |
| CS1012 | too many characters between single quotes | text that needs double quotes |
| CS1026 | `) expected` | a bracket that opens and never closes |
| CS0029 | a value it cannot convert to the variable's type | a value of one type where another type is needed, such as text where a number is needed |
| CS0266 | a conversion that could lose something | a cast, or a variable with another type |
| CS0165 | a variable with no value | a variable made without `=` |
| CS0246 | a type it cannot find | the spelling of the type, or a missing `using` line |
| CS0219 (a warning) | a variable that is given a value and never used | a line that was meant to use it |

## Looking back

The compiler found nearly every mistake on this page before anything ran.
It did not find a missing `$`. Can it find every mistake? On
[the powers page](lesson:powers-in-csharp), `2 ^ 3` compiled and ran, and
it gave a number that is not a power. What does the compiler check, and
what can it not check?

A challenge: the program below compiles and runs. Can you make the compiler
give five different error codes at once, with as few changes as you can?
Then look at the order of the messages. Is the first message always about
the first change you made?

```csharp challenge
// This program compiles and runs.
// Can you make the compiler give five different codes at once?
string message = "MEET AT NOON";
int shift = 3;
Console.WriteLine($"{message}, moved {shift} places");
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. Visual Studio shows the same codes, in its Error List.

Next, the [practice page](lesson:compiler-errors-practice) has more
messages to read, and more programs to fix. The next lesson depends on
your course: [Dividing](lesson:dividing-in-csharp) in Programming and
Design Principles, and [Types and their sizes](lesson:types-and-their-sizes)
in Fundamentals of Object-Oriented Programming. Later,
[Exceptions](lesson:reading-an-error-message) is about the mistakes that
the compiler cannot find.

## Where to read more

Microsoft. *Compiler messages (C# reference)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/>.
Many error codes have a page of their own, which says why the compiler
gives that message, and often how to change the code. This page says how
to find the one for your code: type the code, such as CS0103, in the box
called *Filter by title*.

Microsoft. *Managed execution process*.
<https://learn.microsoft.com/en-us/dotnet/standard/managed-execution-process>.
It describes the steps in the fold "What does compiling make?": the
compiler makes IL, and the runtime changes the IL into machine code while
the program runs. It calls IL *CIL*, for *Common Intermediate Language*.
It is written for programmers, so read it for the steps, not for every
detail.

CrashCourse (2017). *The First Programming Languages: Crash Course Computer
Science #11.* <https://www.youtube.com/watch?v=RU1u-js7db8>. It goes from
machine code to assembly language and the first compilers, and explains why
each step made programs easier for people to write. The video is about
twelve minutes long.
