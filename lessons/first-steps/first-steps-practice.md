---
title: "Your first C# program: practice"
version: 2026.09.27.2
from: first-steps-practice
practice_for: first-steps
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Your first C# program: practice

Problems on the operators, `Console.WriteLine`, algorithms and pseudocode.
Most are short. Try each one before you open anything under it. Say what
you think first, then run it. One cell is meant not to compile, and the
problem says so.

## 1. Which comes first

```csharp exec
id: which-comes-first-1
Console.WriteLine(20 - 6 / 3);
Console.WriteLine(9 + 4 * 2);
Console.WriteLine((9 + 4) * 2);
Console.WriteLine((20 - 6) / 3);
```

```predict
type: number

What will the first line print?
```

What will the other three lines print, and why? Say what you think, then
run it.

<details class="dl-answer"><summary>answer</summary>

`20 - 6 / 3` is 18. The division happens first, 6 / 3 is 2, and 20 − 2 is
18. The others are 17, 26 and 4.

Multiplication and division happen before addition and subtraction, unless
brackets say otherwise. The last line is 14 / 3. Both are whole numbers,
so C# gives a whole number, and drops the part after the point: 4.

</details>

## 2. Hours and minutes

A film is 143 minutes long. Can you print how many whole hours that is, and
how many minutes are left?

```csharp exec
id: hours-and-minutes-1
// How many whole hours in 143 minutes, and how many minutes are left?

```

```hint
There are 60 minutes in an hour. Which operator counts the whole 60s, and
which gives what is left?
```

```solution
Console.WriteLine($"{143 / 60} hours and {143 % 60} minutes");
---
2 hours and 23 minutes. This pair is very common: with two whole
numbers, `/` counts how many whole ones there are, and `%` gives what is
left. The `$` in front of the quotes lets C# put each value into the text,
where its curly brackets are.
```

## 3. When it does not fit at all

```csharp exec
id: when-it-does-not-fit-1
Console.WriteLine(5 / 17);
Console.WriteLine(5 % 17);
```

```predict
type: number

What will the first line print?
```

And the second line? Have a guess before you run it.

<details class="dl-answer"><summary>answer</summary>

`5 / 17` is 0, and `5 % 17` is 5. Seventeen does not go into 5 at all, so
the whole part is 0, and *all* of the 5 is left.

</details>

## 4. Half of seven

Two friends share a bill of 7 euro. How much does each one pay?

```csharp exec
id: half-of-seven-1
Console.WriteLine(7 / 2);
```

```predict
type: number

What will it print?
```

Can you make it print the half with its decimal part? Change one of the
numbers, not the operator.

```hint
What makes `/` keep the part after the point? Look at the table on the
lesson page.
```

```solution
Console.WriteLine(7.0 / 2);
---
3.5. `7 / 2` is 3, because both numbers are whole numbers, and C# drops
the part after the point. Write either number with a decimal point, as
`7.0` or `2.0`, and C# keeps it. A later page, *Dividing*, looks closely at
`/` and `%`.
```

## 5. A remainder below zero

```csharp exec
id: a-remainder-below-zero-1
Console.WriteLine(-7 % 3);
Console.WriteLine(-7 / 3);
Console.WriteLine(-7.0 / 3);
```

```predict
type: number

What will the first line print?
```

<details class="dl-answer"><summary>why</summary>

It prints -1, and some people expect 2. Python, for one, gives 2.

In C#, the result of `%` has the same sign as the number on the left, or
is 0. C# makes `(a / b) * b + (a % b)` always equal `a`. And `-7 / 3` is
-2, as the second line shows. The third line shows the division with its
decimal part, -2.3333333333333335. C# drops the part after the point, so
−2.33… becomes −2. So (−2 × 3) + (−1) = −7.

Programming languages do not all agree about this. It is worth knowing
before you move code from one language to another.

</details>

## 6. Text, or a sum

```csharp exec
id: text-or-a-sum-1
Console.WriteLine("5 + 3");
```

```predict
type: choice

What will it print?

- 8
  - C# calculates a sum when it sees one.
- 5 + 3
  - Inside quotes, the plus sign is a character in the text.
```

<details class="dl-answer"><summary>why</summary>

Quotes mean "this is text, so do not calculate it". Without quotes,
`Console.WriteLine(5 + 3);` prints 8. With them, C# has a piece of writing
that happens to contain a plus sign.

</details>

## 7. Let C# calculate it

Can you write one `Console.WriteLine` that shows `The answer is 42`, with
C# calculating the 42 from `6 * 7`, rather than you typing it?

```csharp exec
id: let-csharp-calculate-it-1

```

```hint
The lesson printed the middle of a screen with `$"..."`. What went inside
its curly brackets?
```

```solution
Console.WriteLine($"The answer is {6 * 7}");
---
The `$` in front of the quotes lets you put a value inside the text, in
curly brackets. C# calculates what is inside them, and puts the result in
the text. *Variables and types* shows another way, which joins pieces of
text with `+`.
```

## 8. Hidden lines

```csharp exec
id: hidden-lines-1
// Console.WriteLine("first");
Console.WriteLine("second");  // Console.WriteLine("third");
```

```predict
type: choice

What will it print?

- first, second and third
  - Each of the three lines runs.
- second and third
  - The first line starts with //, so it does not run.
- second
  - Everything after a // on a line is a comment, even code.
```

## 9. One semicolon

This cell is meant not to compile. One of its lines has no semicolon.

```csharp exec
id: one-semicolon-1
expect: CS1002
Console.WriteLine("one");
Console.WriteLine("two")
Console.WriteLine("three");
```

```predict
type: choice

What will appear under the cell?

- one, two and three
  - C# can see where each line ends, so the semicolon does not matter.
- one, and then a message
  - C# runs the lines in order, and stops at the one with the problem.
- only a message
  - C# checks the whole program before it runs any of it.
```

<details class="dl-answer"><summary>why</summary>

Only a message: `Program.cs(2,25): error CS1002: ; expected`. Not even
`one` is printed. C# compiles the whole program before it runs any of it,
and a program with an error does not run at all.

The message names line 2, and the 25th character along it, just after the
closing bracket. Add the semicolon there, and all three lines print.

</details>

## 10. A toast algorithm

Here is an algorithm for making toast. Where would a machine get stuck
following it?

```text
1. Put bread in the toaster
2. Wait
3. Take out the toast
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

Step 2 does not say how long to wait, or what to wait *for*. A machine
cannot follow "Wait". It can follow "While the toaster has not popped,
wait", because that step names what ends the waiting. Every loop needs
something like this.

Something else is missing too: no step starts the toaster.

</details>

## 11. The largest number

Can you write an algorithm, as numbered steps, to find the largest number
in a list written on paper? You can look at only one number at a time.

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```text
1. Look at the first number and remember it as the largest so far
2. For each number after it:
3.     If it is bigger than the largest so far, remember it instead
4. The largest so far is the answer
```

Because you can see only one number at a time, you have to remember one
number as you go, the "largest so far". That is a variable, which a later
page explains. C# can find the largest number in a list for you, and
inside, it follows this same algorithm.

</details>

## 12. Two ways to make tea

Two algorithms both make tea. One boils the kettle, then gets a cup. The
other gets a cup, then boils the kettle. Are they the same algorithm?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

No, even though they make the same tea. The order of the steps is part of
an algorithm. Some steps cannot change places. If the second step needs the
first, the algorithm breaks when you swap them. When you read an
algorithm, look for the steps whose order matters, and the steps whose
order does not.

In real life you would probably do something faster than either: start
the kettle, then get the cup while the water boils. Doing two things at
the same time like this is called *concurrency*. It is a topic for later.

</details>

## 13. From a plan to C#

Can you write this plan in C#, one line for each step?

<div class="dl-world" data-world="secret-messages">

Number the letters from 0: A is 0, B is 1, and so on, up to Z, which is 25.
This plan moves a letter five places along the alphabet, and starts again
at A after Z. It is the main step of a secret code called a Caesar shift.

```text
SET the letter to 23, which is X
ADD 5 to move it along
FIND the remainder after dividing by 26, so it starts again at A after Z
DISPLAY the new letter's number
```

```csharp exec
id: from-a-plan-to-csharp-1--secret-messages
// One line of C# under each step of the plan

```

```solution
int letter = 23;
int moved = letter + 5;
moved = moved % 26;
Console.WriteLine(moved);
---
It prints 2, which is C: X moves to Y and Z, and then starts again at A,
B and C. The remainder makes the alphabet start again, as the hours on a
clock do.
```

</div>

<div class="dl-world" data-world="pixel-art">

A small picture is 64 pixels wide and 48 tall. Each pixel takes three bytes
of memory: one for red, one for green and one for blue. This plan
calculates how much memory the picture takes.

```text
SET the width to 64
SET the height to 48
MULTIPLY them to get the number of pixels
MULTIPLY by 3 to get the number of bytes
DISPLAY the bytes
```

```csharp exec
id: from-a-plan-to-csharp-1--pixel-art
// One line of C# under each step of the plan

```

```solution
int width = 64;
int height = 48;
int pixels = width * height;
int bytesNeeded = pixels * 3;
Console.WriteLine(bytesNeeded);
---
It prints 9216: the picture takes 9,216 bytes. You could write
`64 * 48 * 3` on one line. It gives the same answer, but it hides what each
number means.
```

</div>

## 14. Why plan at all

Why write pseudocode at all, when you could write the C# straight away?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

Programming has two hard parts. If you do both at once, it can feel
impossible at the start. When you decide *what* the steps are, you think
about the problem. When you decide how to say them in C#, you think about
C#. Pseudocode lets you finish the first before you start the second. Then,
when the code does something you did not expect, you know which of the two
to look at.

For a three-line program, pseudocode is more than you need. Keep the habit
anyway. You will not notice the moment a problem grows past three lines.

</details>

## 15. Even or odd

A number is even when its remainder after dividing by 2 is 0. Can you
check whether 1234567 is even, with only what the lesson covered?

```csharp exec
id: even-or-odd-1

```

```solution
Console.WriteLine(1234567 % 2);
---
It prints 1, so the number is odd. Making C# print the word "odd" needs a
decision, and a later page, *Decisions*, teaches them.
```
