---
title: "Mixed problems: starting in C#"
version: 2026.09.28.3
from: mixed-instructions-for-a-machine
worlds:
  game: A game world, with characters, the things they carry, and rooms.
  solar-system: A solar system, with planets, moons and the probes sent to them.
covers: [FOOP-LO1, FOOP-LO2, FOOP-LO5, FOOP-LO10]
---

# Mixed problems: starting in C#

Every problem on this page needs more than one page of the first series
of this course, Starting in C#, and none of them says which. Part of each
problem is to decide what it needs: a type with more room, a conversion, a
loop that asks again, or a careful reading of a message from the compiler.
Deciding what a problem needs is a skill of its own.

Each problem says what kind it is:

- **Predict:** say what a cell will do, and then run it.
- **Fix:** find why a program does not compile, or does something that
  nobody meant, and change it.
- **Make:** write part of a program.
- **Explain:** answer in words.

Choose a world under the title: a game, or a solar system. The problems
are the same in both worlds. The story changes, and so do some of the
numbers. There are no classes on this page. The next page,
[Classes and objects](lesson:objects-and-classes), makes the first class in
the world you choose here, and the pages after it add to that class.

Try each problem before you open anything under it. Some cells are meant
not to compile, and the problem says so before you run them. When that
happens, nothing is broken: the message is part of the problem. Each Run
starts a new program, so each cell makes the values it uses.

If you took Programming and Design Principles in C#, this page is a quick
check before [Classes and objects](lesson:objects-and-classes).

Every problem runs here, in the browser. To try one in Visual Studio, press
**Download project** on its cell. Visual Studio shows the same messages,
with the same codes, in its Error List.

## 1. A method that never runs

<div class="dl-world" data-world="game">

**Predict**, then **Fix**. This program has a method that shows a hero's
health. The line after the method is a slip, on purpose: the method's
name, with no brackets. Here is the same program in Python. It prints
only `Done.`, with no error.

```python
def show_hero(name, health):
    print(f"{name} has {health} health.")

show_hero
print("Done.")
```

What do you think C# does with it? When you have run it, can you make the
program show Ada, with 10 health, and then `Done.`? After each change, run
it again. If a new message appears, read it as you read the first one.

```csharp exec
id: a-method-that-never-runs-1--game
expect: CS0201
static void ShowHero(string name, int health)
{
    Console.WriteLine($"{name} has {health} health.");
}

ShowHero;
Console.WriteLine("Done.");
```

```predict
type: choice

What will appear under the cell?

- Done.
  - Python prints this. Does C# allow a line that names a method, and
    does nothing with it?
- Only a message: it does not compile
  - C# checks every line before it runs any of them.
- It stops with an exception on line 6
  - An exception can happen only while a program runs. Does this one
    start?
```

```hint
after: 2 errors
The message lists what a statement can do. Which of those did line 6
mean to do? What does a line that does it look like?
```

```hint
after: 3 errors
Look at the method's first line. What does it need from each call, and in
which order?
```

```solution
static void ShowHero(string name, int health)
{
    Console.WriteLine($"{name} has {health} health.");
}

ShowHero("Ada", 10);
Console.WriteLine("Done.");
---
It prints `Ada has 10 health.`, and then `Done.` A *parameter* is the
name that the method uses for a value, and an *argument* is the value
that a call gives it. The call names the method, and it gives an argument
for each parameter, in order: a `string` for `name`, and then an `int`
for `health`.
```

</div>

<div class="dl-world" data-world="solar-system">

**Predict**, then **Fix**. This program has a method that shows a probe's
fuel. The line after the method is a slip, on purpose: the method's name,
with no brackets. Here is the same program in Python. It prints only
`Done.`, with no error.

```python
def show_probe(name, fuel):
    print(f"{name} has {fuel} kg of fuel.")

show_probe
print("Done.")
```

What do you think C# does with it? When you have run it, can you make the
program show Juno, with 12 kg of fuel, and then `Done.`? After each
change, run it again. If a new message appears, read it as you read the
first one.

```csharp exec
id: a-method-that-never-runs-1--solar-system
expect: CS0201
static void ShowProbe(string name, int fuel)
{
    Console.WriteLine($"{name} has {fuel} kg of fuel.");
}

ShowProbe;
Console.WriteLine("Done.");
```

```predict
type: choice

What will appear under the cell?

- Done.
  - Python prints this. Does C# allow a line that names a method, and
    does nothing with it?
- Only a message: it does not compile
  - C# checks every line before it runs any of them.
- It stops with an exception on line 6
  - An exception can happen only while a program runs. Does this one
    start?
```

```hint
after: 2 errors
The message lists what a statement can do. Which of those did line 6
mean to do? What does a line that does it look like?
```

```hint
after: 3 errors
Look at the method's first line. What does it need from each call, and in
which order?
```

```solution
static void ShowProbe(string name, int fuel)
{
    Console.WriteLine($"{name} has {fuel} kg of fuel.");
}

ShowProbe("Juno", 12);
Console.WriteLine("Done.");
---
It prints `Juno has 12 kg of fuel.`, and then `Done.` A *parameter* is
the name that the method uses for a value, and an *argument* is the value
that a call gives it. The call names the method, and it gives an argument
for each parameter, in order: a `string` for `name`, and then an `int`
for `fuel`.
```

</div>

<details class="dl-answer"><summary>why</summary>

It does not compile, so nothing runs, not even the last line. The message
is:

```console
Program.cs(6,1): error CS0201: Only assignment, call, increment, decrement, await, and new object expressions can be used as a statement
```

Line 6 is the line with no brackets. A *statement* is one complete
instruction, and in C# a statement must do something. The message lists
what a statement can do: store a value (an *assignment*), call a method,
add 1 or subtract 1 (an *increment* or a *decrement*), and two more kinds.
Line 6 does none of these. It names the method, and does nothing with it.
A method runs only when a line *calls* it, and a call has round brackets
after the method's name.

Python allows a line that names a function and does nothing with it. So
the Python program runs, and the function never does. C# refuses the line
before anything runs, and the message says where it is.

</details>

## 2. A number typed as text

<div class="dl-world" data-world="game">

**Predict**, then **Fix**. Ada has 7 health, and she drinks a potion. The
program asks how much the potion heals. Run it, and type `3`.

```csharp exec
id: a-number-typed-as-text-1--game
stdin: "3\n"
int health = 7;
Console.Write("How much does the potion heal? ");
string heal = Console.ReadLine();
Console.WriteLine($"Ada's health: {health + heal}");
```

```predict
type: choice

You type 3. What will the last line print?

- Ada's health: 10
  - 7 and 3 make 10.
- Ada's health: 73
  - `Console.ReadLine()` gives text. What does `+` do with a number and
    a piece of text?
- Only a message: it does not compile
  - `health` is an `int`, and `heal` is a `string`.
- It stops with an exception
  - Does any line try to read the text as a number?
```

A hit lowers Ada's health. The next cell does the same for a hit, with
`-` in place of `+`. It is meant not to compile. Why do you think the compiler
refuses `-`, when it allowed `+`?

Then can you make this second program subtract the damage from Ada's
health? When somebody types a word, such as `lots`, can it say what it
wanted, without stopping with an exception? And can you change the first
program in the same way?

```csharp exec
id: a-number-typed-as-text-2--game
stdin: "3\n"
expect: CS0019
int health = 7;
Console.Write("How much damage does the hit do? ");
string damage = Console.ReadLine();
Console.WriteLine($"Ada's health: {health - damage}");
```

```hint
after: 2 errors
Which method reads text as a whole number? Which one does it without
stopping the program when the text is a word?
```

```hint
after: 3 errors
`int.TryParse(damage, out int amount)` returns `true` when `damage` is a
whole number, and puts the number in `amount`. Can it be the condition of
an `if`?
```

```solution
int health = 7;
Console.Write("How much damage does the hit do? ");
string damage = Console.ReadLine();
if (int.TryParse(damage, out int amount))
{
    Console.WriteLine($"Ada's health: {health - amount}");
}
else
{
    Console.WriteLine($"{damage} is not a whole number.");
}
---
With 3, it prints `Ada's health: 4`. `int.TryParse` reads the text as a
whole number, and the program uses the number only when `TryParse`
returns `true`. With a word, the `else` says what the program wanted, and
the program ends with no exception. The first program changes in the same
way, with `health + amount`.
```

</div>

<div class="dl-world" data-world="solar-system">

**Predict**, then **Fix**. A probe on the launch pad has 70 kg of fuel,
and the crew adds more. The program asks how much. Run it, and type `15`.

```csharp exec
id: a-number-typed-as-text-1--solar-system
stdin: "15\n"
int fuel = 70;
Console.Write("How many kg of fuel to add? ");
string added = Console.ReadLine();
Console.WriteLine($"Fuel: {fuel + added} kg");
```

```predict
type: choice

You type 15. What will the last line print?

- Fuel: 85 kg
  - 70 and 15 make 85.
- Fuel: 7015 kg
  - `Console.ReadLine()` gives text. What does `+` do with a number and
    a piece of text?
- Only a message: it does not compile
  - `fuel` is an `int`, and `added` is a `string`.
- It stops with an exception
  - Does any line try to read the text as a number?
```

In space, each burn of the engine uses fuel. The next cell does the same
for a burn, with `-` in place of `+`. It is meant not to compile. Why do you
think the compiler refuses `-`, when it allowed `+`?

Then can you make this second program subtract the burn from the fuel?
When somebody types a word, such as `lots`, can it say what it wanted,
without stopping with an exception? And can you change the first program
in the same way?

```csharp exec
id: a-number-typed-as-text-2--solar-system
stdin: "15\n"
expect: CS0019
int fuel = 70;
Console.Write("How many kg does the burn use? ");
string burned = Console.ReadLine();
Console.WriteLine($"Fuel: {fuel - burned} kg");
```

```hint
after: 2 errors
Which method reads text as a whole number? Which one does it without
stopping the program when the text is a word?
```

```hint
after: 3 errors
`int.TryParse(burned, out int kg)` returns `true` when `burned` is a whole
number, and puts the number in `kg`. Can it be the condition of an `if`?
```

```solution
int fuel = 70;
Console.Write("How many kg does the burn use? ");
string burned = Console.ReadLine();
if (int.TryParse(burned, out int kg))
{
    Console.WriteLine($"Fuel: {fuel - kg} kg");
}
else
{
    Console.WriteLine($"{burned} is not a whole number.");
}
---
With 15, it prints `Fuel: 55 kg`. `int.TryParse` reads the text as a
whole number, and the program uses the number only when `TryParse`
returns `true`. With a word, the `else` says what the program wanted, and
the program ends with no exception. The first program changes in the same
way, with `fuel + kg`.
```

</div>

<details class="dl-answer"><summary>why</summary>

`Console.ReadLine()` returns a `string`, even when the person types
digits. So the variable holds the text that was typed, and not a number.
When one side of `+` is a `string`, C# changes the other side into text,
and joins the two. So the first program's last line joins two pieces of
text, and prints them side by side. The compiler checked the types on
every line, and found nothing it could refuse: `+` has a meaning for a
number and a piece of text together. The compiler cannot know that you
meant to add.

The second program gives this message, on line 4:

```console
error CS0019: Operator '-' cannot be applied to operands of type 'int' and 'string'
```

An *operator* is a symbol that does a calculation, such as `+` or `-`.
Its *operands* are the values it works on, one on each side of it. `-` has
no meaning for a number and a piece of text, so the compiler refuses it,
and nothing runs. `+` has a meaning, joining, so the compiler allows it.
With `+`, the slip shows only when the program runs, in its answer.

</details>

## 3. Too large for an int

<div class="dl-world" data-world="game">

**Fix.** A dragon sleeps on a *hoard*, a great pile of treasure:
5,000,000,000 gold coins. Three heroes share the hoard equally, and the
dragon keeps the coins that cannot be shared equally.

This program is meant not to compile. Run it, and read the first message.
It ends with a question: *are you missing a cast?* A *cast* is a type in
brackets before a value, such as `(int)`, which converts the value to
that type. Is a cast the answer here? Can you make the program compile,
and share the hoard? After each change, run it again, and read the first
message again. Does the compiler find something new?

```csharp exec
id: too-large-for-an-int-1--game
expect: CS0266
int hoard = 5000000000;    // gold coins under the dragon
int heroes = 3;
int share = hoard / heroes;
int left = hoard % heroes;
Console.WriteLine($"Each hero gets {share} coins.");
Console.WriteLine($"The dragon keeps {left}.");
```

```hint
after: 2 errors
Is 5,000,000,000 more than an `int` can hold? Which type holds more?
```

```hint
after: 3 errors
When `hoard` holds more, what type is `hoard / heroes`? Where is that
answer stored?
```

```solution
long hoard = 5000000000;    // gold coins under the dragon
int heroes = 3;
long share = hoard / heroes;
long left = hoard % heroes;
Console.WriteLine($"Each hero gets {share} coins.");
Console.WriteLine($"The dragon keeps {left}.");
---
It prints `Each hero gets 1666666666 coins.` and
`The dragon keeps 2.` `hoard`, `share` and `left` are each a `long`.
`heroes` can stay an `int`, because 3 fits in an `int`.
```

</div>

<div class="dl-world" data-world="solar-system">

**Fix.** Voyager 1 is the probe farthest from Earth, more than
25,000,000,000 km away, and it is farther away every day. A radio message
travels at the speed of light, 299,792 km a second. How long does a
message take to reach the probe?

This program is meant not to compile. Run it, and read the first message.
It ends with a question: *are you missing a cast?* A *cast* is a type in
brackets before a value, such as `(int)`, which converts the value to
that type. Is a cast the answer here? Can you make the program compile,
and find the time? After each change, run it again, and read the first
message again. Does the compiler find something new?

```csharp exec
id: too-large-for-an-int-1--solar-system
expect: CS0266
int distance = 25000000000;    // km from Earth to Voyager 1
int lightSpeed = 299792;       // km a second
int seconds = distance / lightSpeed;
int hours = seconds / 3600;
int minutes = seconds % 3600 / 60;
Console.WriteLine($"{hours} hours and {minutes} minutes");
```

```hint
after: 2 errors
Is 25,000,000,000 more than an `int` can hold? Which type holds more?
```

```hint
after: 3 errors
When `distance` holds more, what type is `distance / lightSpeed`? Where
is that answer stored?
```

```solution
long distance = 25000000000;    // km from Earth to Voyager 1
int lightSpeed = 299792;        // km a second
long seconds = distance / lightSpeed;
long hours = seconds / 3600;
long minutes = seconds % 3600 / 60;
Console.WriteLine($"{hours} hours and {minutes} minutes");
---
It prints `23 hours and 9 minutes`: nearly a day, for one message.
`distance`, `seconds`, `hours` and `minutes` are each a `long`.
`lightSpeed` can stay an `int`, because 299,792 fits in an `int`.
```

</div>

<details class="dl-answer"><summary>why</summary>

The first message is on line 1:

```console
error CS0266: Cannot implicitly convert type 'long' to 'int'. An explicit conversion exists (are you missing a cast?)
```

The number on line 1 is a *literal*: a value written in the code. It is
more than the largest `int`, so C# makes it a `long`, the type for larger
whole numbers. And C# does not store a `long` in an `int` by itself.
*Implicitly* means by itself. An *explicit conversion* is one written in
the code: a cast.

A cast is not the answer here. A cast keeps only the part of a value that
fits in the new type, and the number on line 1 does not fit in an `int`.
The number is written in the code, so the compiler sees that before
anything runs, and it refuses the cast too, with a different message. Can
you try it? A message's suggestion is worth reading, and it is not always
the answer.

The answer is a type with more room: `long` on line 1. Then new messages
appear, on lines that had none before. Those lines had no problem while
the variable on line 1 was an `int`. Now one side of the `/` is a `long`,
so its answer is a `long` too, and C# does not store that in an `int` by
itself either. One change to a type can bring messages on other lines. So
after each change, run the program again, and read the first message
again.

Could a variable that holds an answer stay an `int`, with a cast? A cast
is safe only while every value fits in an `int`. A `long` holds every
value here, with no cast at all.

</details>

## 4. The test data that finds it

<div class="dl-world" data-world="game">

**Fix.** A game has thousands of characters, so it keeps each one's purse
in a `byte`, to save memory. A `byte` holds a small whole number, never
below zero, in one byte of memory. A purse holds at most 100 gold coins.
A hero has 60 coins, and finds more in a room.

The inputs you choose to try a program with are its *test data*. In this
program, the array `tests` holds them, and the loop runs the same lines
once for each amount, so the output is a small table. The programmer
chose 10 coins and 30, and both answers were what they expected. Which
amounts would you add to `tests`? Can you find an amount that gives an
answer nobody meant? There is more than one kind. Then can you change the
program, so that the purse never holds more than 100?

```csharp exec
id: the-test-data-that-finds-it-1--game
int[] tests = { 10, 30 };    // the test data
foreach (int found in tests)
{
    byte purse = 60;
    purse = (byte)(purse + found);
    Console.WriteLine($"Found {found}: purse {purse}");
}
```

```hint
after: 2 runs
Where are the limits in this program? What is the most that a purse
holds, and what is the most that a `byte` holds?
```

```hint
after: 3 runs
Which amount takes the purse to exactly 100, and which takes it one past
100? Which amounts take the sum past the most that a `byte` holds?
```

```hint
after: 4 runs
`Math.Min(a, b)` gives the smaller of two numbers. Which two numbers
should the purse choose between?
```

```solution
title: test data that finds it
int[] tests = { 10, 30, 40, 41, 196, 200 };    // the test data
foreach (int found in tests)
{
    byte purse = 60;
    purse = (byte)(purse + found);
    Console.WriteLine($"Found {found}: purse {purse}");
}
---
Two kinds of answer that nobody meant. With 40 coins, the purse holds 100,
its limit, and with 41, it holds 101: nothing in the program checks the
limit. With 196, it holds 0, and with 200, it holds 4. The sum is too
large for a `byte`, and the cast keeps only the part that fits. Nothing
warned anybody. The test data that finds a problem is at a limit, and
just past it.
```

```solution
title: a purse that stops at 100
int[] tests = { 10, 30, 40, 41, 196, 200 };    // the test data
foreach (int found in tests)
{
    byte purse = 60;
    purse = (byte)Math.Min(purse + found, 100);
    Console.WriteLine($"Found {found}: purse {purse}");
}
---
From 40 coins up, every test gives 100. `purse + found` is an `int`, and
`Math.Min` gives the smaller of it and 100, so the answer is never more
than 100, and the cast loses nothing. An `if` can do the same. Should the
hero leave the other coins in the room? That is a rule of the game, and a
program needs somebody to decide it.
```

</div>

<div class="dl-world" data-world="solar-system">

**Fix.** A probe sends the charge of its battery home as one `byte`, to
save radio time. A `byte` holds a small whole number, never below zero,
in one byte of memory. The charge is a percentage, so it should never be
more than 100. The battery holds 60%, and the solar panels add more.

The inputs you choose to try a program with are its *test data*. In this
program, the array `tests` holds them, and the loop runs the same lines
once for each amount, so the output is a small table. The programmer
chose 10% and 30%, and both answers were what they expected. Which
amounts would you add to `tests`? Can you find an amount that gives an
answer nobody meant? There is more than one kind. Then can you change the
program, so that the charge is never more than 100%?

```csharp exec
id: the-test-data-that-finds-it-1--solar-system
int[] tests = { 10, 30 };    // the test data
foreach (int added in tests)
{
    byte charge = 60;
    charge = (byte)(charge + added);
    Console.WriteLine($"Added {added}%: charge {charge}%");
}
```

```hint
after: 2 runs
Where are the limits in this program? What is the most that the battery
holds, and what is the most that a `byte` holds?
```

```hint
after: 3 runs
Which amount takes the charge to exactly 100%, and which takes it one
past 100? Which amounts take the sum past the most that a `byte` holds?
```

```hint
after: 4 runs
`Math.Min(a, b)` gives the smaller of two numbers. Which two numbers
should the charge choose between?
```

```solution
title: test data that finds it
int[] tests = { 10, 30, 40, 41, 196, 200 };    // the test data
foreach (int added in tests)
{
    byte charge = 60;
    charge = (byte)(charge + added);
    Console.WriteLine($"Added {added}%: charge {charge}%");
}
---
Two kinds of answer that nobody meant. With 40% added, the charge is
100%, its limit, and with 41%, it is 101%: nothing in the program checks
the limit. With 196%, it is 0%, and with 200%, it is 4%. The sum is too
large for a `byte`, and the cast keeps only the part that fits. Nothing
warned anybody. The test data that finds a problem is at a limit, and
just past it.
```

```solution
title: a charge that stops at 100%
int[] tests = { 10, 30, 40, 41, 196, 200 };    // the test data
foreach (int added in tests)
{
    byte charge = 60;
    charge = (byte)Math.Min(charge + added, 100);
    Console.WriteLine($"Added {added}%: charge {charge}%");
}
---
From 40% up, every test gives 100%. `charge + added` is an `int`, and
`Math.Min` gives the smaller of it and 100, so the answer is never more
than 100, and the cast loses nothing. An `if` can do the same. Can the
panels add 196% at once? Perhaps not, but a program that reads a number
from a radio or a keyboard can receive anything.
```

</div>

## 5. A number the person chooses

<div class="dl-world" data-world="game">

**Make.** Here is the hoard from problem 3 again, in a `long`. The program
always shares it between 3 heroes. Can you make it ask how many heroes
there are, from 1 to 10, and ask again until the answer makes sense? When
you run your version, try `none`, then `0`, then `7`.

```csharp exec
id: a-number-the-person-chooses-1--game
stdin: "none\n0\n7\n"
long hoard = 5000000000;    // gold coins under the dragon
int heroes = 3;             // ask for this: 1 to 10
long share = hoard / heroes;
long left = hoard % heroes;
Console.WriteLine($"Each of {heroes} heroes gets {share} coins.");
Console.WriteLine($"The dragon keeps {left}.");
```

```hint
after: 2 runs
Which loop asks at least once, and then again while the answer makes no
sense? Which lines have to run again each time?
```

```hint
after: 3 runs
The answer makes sense when `int.TryParse` returns `true`, the number is
1 or more, and it is 10 or less. Can you keep that in a `bool`, and repeat
the question while the `bool` is `false`?
```

```hint
after: 1 errors
Is the message about `heroes`? A variable made inside a loop's curly
brackets exists only inside them. Can you make `heroes` above the loop,
with `int heroes;`, and write `out heroes` inside it?
```

```solution
long hoard = 5000000000;    // gold coins under the dragon
int heroes;
bool makesSense;
do
{
    Console.Write("How many heroes, 1 to 10? ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out heroes)
        && heroes >= 1 && heroes <= 10;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 1 to 10.");
    }
}
while (!makesSense);
long share = hoard / heroes;
long left = hoard % heroes;
Console.WriteLine($"Each of {heroes} heroes gets {share} coins.");
Console.WriteLine($"The dragon keeps {left}.");
---
With `none`, 0 and then 7, it asks three times, and then prints
`Each of 7 heroes gets 714285714 coins.` and `The dragon keeps 2.` The
question must be asked at least once, so the loop is a `do`...`while`.
The program divides only after the loop, when `heroes` is sure to make
sense.
```

</div>

<div class="dl-world" data-world="solar-system">

**Make.** This program uses 25,000,000,000 km for Voyager 1's distance
from Earth, as problem 3 did. How many years would a new probe take to
fly that far? The program finds the answer at 17 km a second, which is
about the speed of Voyager 1 itself. Can you make it ask for the speed,
in km a second, from 1 to 100, and ask again until the answer makes
sense? When you run your version, try `fast`, then `0`, then `30`.

```csharp exec
id: a-number-the-person-chooses-1--solar-system
stdin: "fast\n0\n30\n"
long distance = 25000000000;    // km from Earth to Voyager 1
int speed = 17;                 // ask for this: 1 to 100
long seconds = distance / speed;
long years = seconds / (60 * 60 * 24 * 365);
Console.WriteLine($"{years} years at {speed} km a second");
```

```hint
after: 2 runs
Which loop asks at least once, and then again while the answer makes no
sense? Which lines have to run again each time?
```

```hint
after: 3 runs
The answer makes sense when `int.TryParse` returns `true`, the number is
1 or more, and it is 100 or less. Can you keep that in a `bool`, and
repeat the question while the `bool` is `false`?
```

```hint
after: 1 errors
Is the message about `speed`? A variable made inside a loop's curly
brackets exists only inside them. Can you make `speed` above the loop,
with `int speed;`, and write `out speed` inside it?
```

```solution
long distance = 25000000000;    // km from Earth to Voyager 1
int speed;
bool makesSense;
do
{
    Console.Write("Speed in km a second, 1 to 100? ");
    string typed = Console.ReadLine();
    makesSense = int.TryParse(typed, out speed)
        && speed >= 1 && speed <= 100;
    if (!makesSense)
    {
        Console.WriteLine("Please type a whole number from 1 to 100.");
    }
}
while (!makesSense);
long seconds = distance / speed;
long years = seconds / (60 * 60 * 24 * 365);
Console.WriteLine($"{years} years at {speed} km a second");
---
With `fast`, 0 and then 30, it asks three times, and then prints
`26 years at 30 km a second`. The question must be asked at least once,
so the loop is a `do`...`while`. The program divides only after the
loop, when `speed` is sure to make sense.
```

</div>

What would you type to test your program? Can you make a list before you
open the answer?

<details class="dl-answer"><summary>one list</summary>

Here is one answer. Yours may be different and work too.

A number in the middle; the two limits; the numbers just outside them;
a word; nothing at all; and **End input**.

Of these, 0 matters most here, because the program divides by the
number. What does C# do when a whole number is divided by 0? In your
program, change `>= 1` to `>= 0`, run it, and type 0.

And **End input**: `Console.ReadLine()` returns `null`, `int.TryParse`
returns `false` for it, and the loop asks again at once, and never ends.
Press **Stop**. Can you make the loop end when the input ends?

</details>

## 6. Which kind of problem was it?

**Explain.** When you press Run, one of three things happens: it does not
compile, it stops with an exception, or it runs. In problems 1 to 5,
which programs did the compiler stop? Which ran, and gave an answer that
nobody meant? For each kind, what showed you the problem?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

The compiler stopped three: the method with no brackets in problem 1, the
`-` in problem 2, and the number too large for an `int` in problem 3. Each
time, nothing ran, and the message named the line.

Two ran, and gave answers that nobody meant: the `+` in problem 2 joined
a number and the typed text, where it was meant to add, and the program
in problem 4 passed its limit of 100, or started again from 0. Nothing
warned anybody. Only a run with test data, whose answers you knew before
you ran it, showed the problem.

Problem 5 could have stopped with an exception, if nothing had checked the
number and somebody had typed 0.

So the compiler finds a type that does not fit, and a line that does
nothing. It cannot find a calculation that C# allows but that you did not
mean. For that, you need test data, and the answers you expect for it.

</details>

## A challenge

<div class="dl-world" data-world="game">

Can you make a menu for the purse from problem 4? Choice 1 finds coins,
choice 2 spends coins, and 9 quits. Choices 1 and 2 each ask how many
coins. The purse never holds more than 100 coins, or fewer than 0, and the
program says what it wanted when an amount makes no sense.

```csharp challenge
// A menu for the purse. 1: find coins   2: spend coins   9: quit
// The purse never holds more than 100 coins, or fewer than 0.
byte purse = 60;
Console.WriteLine($"The purse holds {purse} coins.");
```

</div>

<div class="dl-world" data-world="solar-system">

Can you make a menu for the battery from problem 4? Choice 1 charges the
battery, choice 2 uses power, and 9 quits. Choices 1 and 2 each ask how
much, in per cent. The charge is never more than 100%, or less than 0%,
and the program says what it wanted when an amount makes no sense.

```csharp challenge
// A menu for the battery. 1: charge   2: use power   9: quit
// The charge is never more than 100%, or less than 0%.
byte charge = 60;
Console.WriteLine($"The battery holds {charge}%.");
```

</div>

## Where to go next

Next, [Classes and objects](lesson:objects-and-classes) starts the second
series. It keeps data, and the actions on that data, together in a class,
in the world you choose.

If a problem here took you a long time, the page it needs is one of these
four: [C# for Python programmers](lesson:from-python-to-csharp),
[Compiler errors](lesson:compiler-errors),
[Types and their sizes](lesson:types-and-their-sizes) and
[Reading input](lesson:reading-input). The fold below says which pages
each problem uses.

<details class="dl-hint"><summary>which pages each problem uses</summary>

For a teacher, or for anybody who is stuck: these are the pages whose
ideas each problem uses.

| Problem | Pages |
|---|---|
| 1. A method that never runs | [C# for Python programmers](lesson:from-python-to-csharp), [Compiler errors](lesson:compiler-errors) |
| 2. A number typed as text | [Reading input](lesson:reading-input), [C# for Python programmers](lesson:from-python-to-csharp), [Compiler errors](lesson:compiler-errors) |
| 3. Too large for an int | [Types and their sizes](lesson:types-and-their-sizes), [Compiler errors](lesson:compiler-errors) |
| 4. The test data that finds it | [Types and their sizes](lesson:types-and-their-sizes), [Reading input](lesson:reading-input), [C# for Python programmers](lesson:from-python-to-csharp) |
| 5. A number the person chooses | [Reading input](lesson:reading-input), [Types and their sizes](lesson:types-and-their-sizes) |
| 6. Which kind of problem was it? | [C# for Python programmers](lesson:from-python-to-csharp), [Compiler errors](lesson:compiler-errors), [Reading input](lesson:reading-input) |

</details>

## Where to read more

Microsoft. *Casting and type conversions (C# Programming Guide)*.
<https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions>.
Most problems on this page are about a value and its type: text where a
number was meant, a number too large for its type, or a cast that keeps
only part of a value. Microsoft's page describes the kinds of conversion
in one place: the ones C# makes by itself, casts, and methods such as
`int.Parse` and the methods of `Convert`. It also mentions conversions between
classes, which later pages meet.
