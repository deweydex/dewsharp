---
title: "Code review: reading your own code and someone else's"
version: 2026.09.27.1
from: critique-and-reflection
covers: [PDP-LO11, PDP-LO12]
---

# Code review: reading your own code and someone else's

On [A program of your own](lesson:a-program-of-your-own), you built
something of your own choosing, and released a first version of it.
Before the team project, this page asks you to read code twice: first your
own program, and then a partner's.

To *reflect* on your work is to think about it after you finish it, and to
ask what it can teach you. Professional programmers do it often, and
courses rarely give time to it. This page has no code to run, and nothing
on it is marked. You could write your answers in a text cell in
**My notebook** (the link at the top of every page), which keeps them in
this browser, on this device. Paper works too, and it is safer on a lab
computer that deletes what the browser saved when a session ends.

Nothing on this page needs Visual Studio. If you kept your program as a
Visual Studio project, you can read it there, but your notebook is enough.

This page is not only for today. Return to it whenever you finish
something big enough to be worth reading again.

## Part 1: reading your own code

Start by opening your program beside this page, in your notebook or in
Visual Studio. Read it as if you were seeing it for the first time.

**If you started again, what would you change?** You could ask it this
way: "What would I do differently, now that I have done it once?" The
answer helps you plan your next program.

**Where did you stop, not sure what to do next, and what helped you
continue?** A hint, an earlier page, a person, a break? The places where
you stopped are often where you learnt the most. If you know what usually
stops you, and what helps, you can continue sooner next time. You met
this question after Release 1 of your program. Is your answer the same
now?

**What do your names, comments and methods tell a reader?** Imagine that a
classmate reads your code, with nothing else to help them. Would they know
what each part does, and why? Can you name one part that is clear, and one
that could be clearer?

A team writes code that many people read, so it agrees on a *coding
standard*: rules for how the code looks. The compiler does not check these
rules. They are there for the people who read the code. The pages of this
course follow the usual C# standard, in three parts:

- **Names.** Variables and parameters are in *camelCase*: the first word
  in small letters, and each word after it with a capital, as in
  `secretWord`. Methods and classes are in *PascalCase*: every word with a
  capital, as in `WriteLine` or `Encode`. And a name says what a thing is
  or does: `highScore`, not `hs`.
- **Comments.** An XML comment (`/// <summary>`) above each method says
  what the method does, what it takes and what it returns. An ordinary
  comment (`//`) says why a line is there, not what the line already says.
- **Indentation**, the space at the start of a line. Each line inside a
  pair of braces, `{` and `}`, is indented one step more than the braces,
  and each brace has a line of its own. The compiler ignores indentation,
  so it helps only the people who read the code.

Which of these does your program follow, and where does it not? If you
wrote it before [Reusable methods](lesson:building-reusable-tools), its
comments are probably `//` lines. Would an XML comment tell a reader more?

## Part 2: reading someone else's code

Now find a partner. Your teacher may put you in pairs, or you can ask
somebody yourself. Swap programs, and read theirs. To swap, each of you can
press **Export this notebook** in your notebook, which saves it as a file,
and give the file to the other. **Import a notebook** opens that file as a
new notebook, and your own notebooks stay as they were. If your program is
a Visual Studio project, give your partner the file you downloaded for
Release 1 instead. You can also sit together and read from one screen.

This is a small *code review*: one person reads another person's code, and
says what they notice. The goal is to practise reading code, which matters
at least as much as writing it. Nobody is judging, and nothing is graded.

**What is the first thing you notice about how they organised it?** Is it
like yours, or different? Where does their program start?

<details class="dl-hint"><summary>Where to look</summary>

Which lines run when you press **Run**, and which wait until something
calls them? A method does nothing until something calls it. So a C#
program starts at its first statement that is not inside a method, which
is often below the methods. In a Visual Studio project, that is the first
statement in `Program.cs`.

</details>

**What is one thing they did that is especially clear?** What makes it work
well: a name, a method that does one job, an XML comment that answered
your question before you asked it?

**Where did you have to read twice?** It helps to write what you expected,
and what the code did. The point is to help your partner see their code as
a new reader does. "I expected `score` to be an `int`, and it was a
`List<int>`" is useful. "This is confusing" does not help them find the
line.

Then tell each other what you wrote. Try to listen to what you are told
without answering it at once. You can decide later what to change.

## Part 3: before the team project

Next comes [The team project](lesson:the-team-project): a program built in
a group of three to five, over several weeks, and released three times.
Much of it will be familiar from
[A whole program](lesson:from-cells-to-a-program): a loop in `Program.cs`
that asks the player what to do, and a `static class` in a file of its own
for each person, all in one Visual Studio project. Building it together will be new for most people,
and the reading you practised in Part 2 is a large part of it.

**What are you curious about, or worried about, as you start it?** A few
sentences in your notebook are enough. Read them again at the end of the
project. What you find there may surprise you.

## Where to read more

Google. *How to do a code review*.
<https://google.github.io/eng-practices/review/reviewer/>. This is the
professional version of Part 2. It explains what a reviewer checks, and
how to write a comment that helps.

Microsoft. *C# identifier naming rules and conventions*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names>.
Microsoft's own coding standard for names: which names are in PascalCase,
which are in camelCase, and why a name should say what a thing is. It says
that the compiler does not check these rules. Some of it is about parts of
C# that this course does not teach, such as interfaces and records.

Tantacrul (2018). *Music Software & Bad Interface Design: Avid's
Sibelius.* <https://www.youtube.com/watch?v=dKx1wnXClcI>. Martin Keary,
who designs music software, reviews a well-known program in detail. It is
a model for reading someone else's work closely, and for saying clearly
what does not work, and why. It is about twenty-two minutes long.
