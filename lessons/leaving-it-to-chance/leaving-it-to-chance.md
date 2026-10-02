---
title: "Random numbers: seeds and surprises you can repeat"
version: 2026.09.28.3
from: leaving-it-to-chance
covers: [PDP-LO10]
---

# Random numbers: seeds and surprises you can repeat

This program is a die that you roll with the Enter key. Run it, and press
Enter a few times. Then press **End input**, run it again, and roll a few
more times. Are the rolls in the same order the second time?

```csharp exec
id: asking-the-machine-for-a-number-1
Console.WriteLine("Press Enter to roll the die. Press End input to stop.");
while (Console.ReadLine() != null)
{
    int roll = Random.Shared.Next(1, 7);
    Console.WriteLine($"You rolled a {roll}.");
}
```

Each press gives a roll that you could not have guessed, and each Run gives
a different series of rolls. `Random.Shared.Next(1, 7)` chooses each one.
As on the page [Searching](lesson:finding-things), it gives a whole number
from the first number up to the second, but not the second itself: here,
1 to 6. `Console.ReadLine()` waits for you to press Enter, and gives
`null` when you press **End input**, so the loop stops.

Games, card shuffles, lottery draws and simulations all start with that
one request: give me a number that I could not have predicted. A
*simulation* is a program that copies something from the world, such as a
queue at a shop, so that we can study it. This page looks at that request
on its own. We find that the computer is not doing what it seems to do,
and that this is useful.

This page is an extra, so you can do it whenever you have time. It is
about testing a program that has chance in it. It needs methods, arrays
and loops, and the linear search from [Searching](lesson:finding-things).
The challenge at the end also uses the swap from
[Sorting](lesson:putting-things-in-order).

## The same numbers twice

The next cell does something that looks like a mistake. Run it. Then run
it again, and again. What do you notice?

```csharp exec
id: the-same-numbers-twice-1
Random dice = new Random(42);
int[] rolls = new int[6];
for (int i = 0; i < rolls.Length; i++)
{
    rolls[i] = dice.Next(1, 7);
}
Console.WriteLine(string.Join(", ", rolls));
```

It prints `5, 1, 1, 4, 2, 2`, on every Run. Change the 42 to another
whole number, and you get six other rolls. But those six also repeat, on
every Run.

`Random dice = new Random(42);` makes a *random number generator* of our
own: a thing that gives a new number each time you ask it. `Random` is its
type, as `int[]` is the type of an array, and `new` makes one, as it makes
a new list. We call it `dice`, and `dice.Next(1, 7)` asks it for a roll.
`Random.Shared`, in the first cell, is a generator that .NET makes for
every program.

Here is what is happening. The numbers were never random. A random number
generator is an ordinary calculation. It keeps some numbers of its own,
and each time you ask, it mixes them in a fixed way and gives you a number
made from the result. The mixing is so thorough that you will not see a
pattern in the numbers it gives. But it is still a calculation, and a
calculation that starts from the same place gives the same answers, in
the same order.

The *seed* is that starting place. `new Random(42)` makes a generator
whose seed is 42. `Random.Shared` has a seed too, but .NET chooses it, and
it is different on every run, so the rolls look different each time.
`new Random()`, with nothing in the brackets, lets .NET choose the seed
too. Numbers made this way are called *pseudo-random*: they come from a
calculation, but for most uses they are as good as random ones.

Here are two generators, each made with the seed 42. The cell above showed
the first rolls that seed 42 gives. What will the second line print?

```csharp exec
id: the-same-numbers-twice-3
Random first = new Random(42);
Random second = new Random(42);
Console.WriteLine($"{first.Next(1, 7)} {first.Next(1, 7)} {first.Next(1, 7)}");
Console.WriteLine($"{second.Next(1, 7)} {second.Next(1, 7)} {second.Next(1, 7)}");
```

```predict
type: choice

What will the second line print?

- 5 1 1
  - Each generator starts from its own seed, 42.
- 4 2 2
  - The second generator continues from where the first one stopped.
- Nothing: it does not compile
  - Can two generators have the same seed?
```

Both lines are `5 1 1`. Each generator keeps its own numbers, and starts
from its own seed. Nothing that `first` does changes `second`.

### Your turn

Can you find a seed that makes the first roll a 1? You could change the
seed by hand, one number at a time. Or can you make the program try the
seeds for you?

```csharp exec
id: the-same-numbers-twice-2
// Can you find a seed that makes the first roll a 1?
Random dice = new Random(0);
Console.WriteLine(dice.Next(1, 7));
```

```hint
after: 2 runs
Can a loop try the seeds 0, 1, 2 and so on, as a linear search tries the
elements of an array? For each seed, make a new generator, roll once, and
print the seed and its roll. How does a loop stop when it finds a 1?
```

```solution
for (int seed = 0; seed <= 100; seed++)
{
    Random dice = new Random(seed);
    int firstRoll = dice.Next(1, 7);
    Console.WriteLine($"seed {seed}: {firstRoll}");
    if (firstRoll == 1)
    {
        break;
    }
}
---
Seed 14 is the first seed whose first roll is a 1. The loop is a linear
search, as on [Searching](lesson:finding-things): it tries one seed at a
time, and `break` stops it at the first seed that gives a 1.
```

<details class="dl-why"><summary>Did you see a pattern in the first rolls?</summary>

Look at the first roll of each seed, from seed 0 to seed 14: 5, 2, 5, 2,
5, 3, 6, 3, 6, 3, 6, 3, 6, 4, 1. Seeds 0 to 4 give only 5 and 2, one
after the other. Seeds 5 to 12 give only 3 and 6, one after the other.
That is a pattern.

.NET's `Random` makes its starting numbers from the seed with simple
arithmetic. So seeds that are next to each other, such as 13 and 14, start
in ways that are related, and their first rolls show it. The rolls that
one seed gives, one after another, do not show a pattern like this.

So a program makes one generator, with one seed, and asks it for many
numbers. It does not make a new generator, with the next seed, for each
number it needs.

</details>

## Numbers of every shape

A die needs a whole number from 1 to 6. Other problems need other numbers:
an index into an array, a number with decimals, a percentage. A generator
has a method for each. This cell uses the seed 1, so that this page can
say what it prints.

```csharp exec
id: asking-the-machine-for-a-number-2
Random generator = new Random(1);
Console.WriteLine($"a roll of a die:        {generator.Next(1, 7)}");
Console.WriteLine($"a whole number, 0 to 9: {generator.Next(10)}");
Console.WriteLine($"a number from 0 to 1:   {generator.NextDouble()}");
Console.WriteLine($"a number from 0 to 100: {generator.NextDouble() * 100}");
```

Here are the methods in that cell:

| Code | What it gives |
|---|---|
| `generator.Next(1, 7)` | a whole number from 1 up to 7, but not 7: from 1 to 6 |
| `generator.Next(10)` | a whole number from 0 up to 10, but not 10: from 0 to 9 |
| `generator.NextDouble()` | a `double` from 0 up to 1, but never 1 |
| `generator.NextDouble() * 100` | a `double` from 0 up to 100, but never 100 |

The first line is a 2, and the second a 1. The third line is
`0.46701067987224587`: `NextDouble` gives every decimal place it has.
From a number between 0 and 1 you can make almost any other: multiply it,
add to it or round it, until it has the shape that your problem needs.
The last line multiplies by 100.

### Your turn: two dice

Many board games roll two dice and add them. Can you roll two dice with
`dice`, and put their total in `total`?

```csharp exec
id: asking-the-machine-for-a-number-3
// Roll two dice, and add them.
Random dice = new Random(5);
int total = 0;
Console.WriteLine($"Two dice: {total}");
```

```inputs
total
```

```hint
after: 2 runs
`dice.Next(1, 7)` is one die. How do you roll a second one? Can you keep
each roll in a variable of its own, and add the two?
```

```solution
Random dice = new Random(5);
int firstDie = dice.Next(1, 7);
int secondDie = dice.Next(1, 7);
int total = firstDie + secondDie;
Console.WriteLine($"Two dice: {firstDie} + {secondDie} = {total}");
---
With seed 5, the dice are 3 and 2, and the total is 5. A variable for each
die lets the program show both rolls, so a player can check the total.

Why not `dice.Next(2, 13)`, which also gives a whole number from 2 to 12?
Try it. The **Lab bench**, further down this page, can show you the
difference.
```

## What random is good enough for

Your first thought might be that pseudo-random numbers are not as good
as real random numbers, and that we use them only because real ones are
hard to get.
For testing a program, it is almost the opposite.

Think about what you did to find a seed that gives a 1. You ran an
experiment, and anyone can run it again and get the same result.

Now think about a game with chance in it that has a problem in one game in
ten, and you want to know why. With numbers that nobody can repeat, the
game with the problem is gone. You cannot run it again and watch it
closely, or show it to anyone else. With a seed, you record one whole
number, and you can repeat the whole game exactly. Being able to repeat a
run exactly is called *reproducibility*. A *test* gives a program an input
whose answer we already know, and checks that the program gives that
answer. The page [Reusable methods](lesson:building-reusable-tools) writes
tests for its methods. A seed is what makes a test possible for a program
with chance in it.

The next cell shows the same idea with more rolls. It rolls a die many
times, and gives the *mean* of the rolls: their average, the total divided
by how many there are. It gives it after 10 rolls, 100, 1,000 and 10,000,
for seed 7, for seed 7 again, and for seed 8. Before you run it, what do
you expect the two seed 7 lines to look like?

```csharp exec
id: what-random-is-good-enough-for-3
static double MeanOfRolls(int seed, int rolls)
{
    Random dice = new Random(seed);
    int total = 0;
    for (int i = 0; i < rolls; i++)
    {
        total = total + dice.Next(1, 7);
    }
    return (double)total / rolls;
}

Console.WriteLine($"the mean of the six faces: {(1 + 2 + 3 + 4 + 5 + 6) / 6.0:F2}");
int[] seeds = { 7, 7, 8 };
foreach (int seed in seeds)
{
    Console.WriteLine($"seed {seed}: {MeanOfRolls(seed, 10):F2}, {MeanOfRolls(seed, 100):F2}, {MeanOfRolls(seed, 1000):F2}, {MeanOfRolls(seed, 10000):F2}");
}
```

The two seed 7 lines are the same, number for number: 4.10, 3.44, 3.38
and 3.50. The same seed gives the same rolls, however many you ask for.

Seed 8 takes a different path: 3.50, 3.40, 3.48 and 3.50. It is not a
better run or a worse one. It is only another run, and after 10,000 rolls
it is at 3.50, the same place as seed 7, and the mean of the six faces on
the first line. The seed decides which path you get. It does not decide
where the path finishes.

### A bug that appears again

Here is a word game with a *bug*: a mistake in a program's code. It
chooses a word at random for each of ten rounds. The people who play it
say that it stops in the middle of a game, and not always in the same
round. The cell uses the seed 1. It is meant to stop with an exception,
so you have not broken anything. Run it, and then run it again. Where
does it stop?

```csharp exec
id: what-random-is-good-enough-for-4
expect: exception
string[] words = { "OTTER", "HERON", "BADGER", "WREN" };
Random generator = new Random(1);
for (int round = 1; round <= 10; round++)
{
    string word = words[generator.Next(0, words.Length + 1)];
    Console.WriteLine($"Round {round}: {word}");
}
```

```hint
The message says that an index was outside the bounds of the array. What
is the largest index of `words`? What is the largest number that
`generator.Next(0, words.Length + 1)` can give?
```

```solution
title: the mistake in line 5, changed
string[] words = { "OTTER", "HERON", "BADGER", "WREN" };
Random generator = new Random(1);
for (int round = 1; round <= 10; round++)
{
    string word = words[generator.Next(words.Length)];
    Console.WriteLine($"Round {round}: {word}");
}
---
`words` has four elements, so its indexes are 0 to 3.
`generator.Next(0, words.Length + 1)` gives a number from 0 to 4, and 4
is not an index. `generator.Next(words.Length)` gives 0 to 3: every index,
and nothing else. All ten rounds run now.
```

It prints seven rounds, and then it stops with an exception:

```console
Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.
   at line 5 of Program.cs
```

It stops in round 8, on every Run. That is what the seed gives the
programmer: a bug that appears every time, at the same place, is a bug
that you can study. Can you change `new Random(1)` to `Random.Shared`, and
run it five or six times? Does it stop in the same round each time? That
is the game the players had. Then write `new Random(1)` again. Can you
find the mistake in line 5, and change it?

There is one job where a number that can be predicted is a weakness:
security. If someone finds your seed, they can calculate every number your
program will make. For a password, or a code that a bank sends to your
phone, that would be a disaster. .NET has another generator for that job,
`RandomNumberGenerator`, in `System.Security.Cryptography`. For a game or
a simulation, nobody is trying to guess your dice, and `Random`, with a
seed that you can record, is the tool to use.

### Your turn: does a seed repeat a run?

`Rolls` makes its own generator from the seed it is given, so each call
starts again from that seed. The first two lines print the rolls of two
calls with the seed 7. What will the last line print?

```csharp exec
id: what-random-is-good-enough-for-2
static int[] Rolls(int seed, int count)
{
    Random dice = new Random(seed);
    int[] rolls = new int[count];
    for (int i = 0; i < count; i++)
    {
        rolls[i] = dice.Next(1, 7);
    }
    return rolls;
}

int[] firstRun = Rolls(7, 5);
int[] secondRun = Rolls(7, 5);
Console.WriteLine(string.Join(", ", firstRun));
Console.WriteLine(string.Join(", ", secondRun));
Console.WriteLine(firstRun == secondRun);
```

```predict
type: choice

What will the last line print?

- True
  - The two lines above it are the same.
- False
  - `Rolls` makes a new array each time it is called.
- Nothing: it does not compile
  - Can `==` compare two arrays?
```

It prints `False`, under two lines that are the same: `3, 6, 4, 1, 3`
twice. `==` on two arrays does not compare the numbers in them. An array
is a reference type, as [Two names, one list](lesson:two-names-one-list)
showed, so `==` asks whether the two variables hold the same reference:
whether they are one array. `Rolls` makes a new array each time it is
called, so there are two arrays, with the same numbers in them.

So a test that a seed repeats a run needs a method that compares the
numbers. Can you write `Same`? It gives `true` when the two arrays hold
the same numbers in the same order, and `false` when they do not. Each Run
starts a new program, so this cell has its own copy of `Rolls`.

```csharp exec
id: what-random-is-good-enough-for-5
static int[] Rolls(int seed, int count)
{
    Random dice = new Random(seed);
    int[] rolls = new int[count];
    for (int i = 0; i < count; i++)
    {
        rolls[i] = dice.Next(1, 7);
    }
    return rolls;
}

static bool Same(int[] first, int[] second)
{
    // Your code: true when both hold the same numbers, in the same order
    return false;
}

Console.WriteLine(Same(Rolls(7, 5), Rolls(7, 5)));
```

```inputs
Same(Rolls(7, 5), Rolls(7, 5))    // one seed, twice
Same(Rolls(7, 5), Rolls(8, 5))    // two seeds
Same(Rolls(7, 5), Rolls(7, 6))    // one roll more
Same(new int[0], new int[0])      // two empty arrays
```

```hint
after: 2 runs
Two arrays of different lengths cannot hold the same numbers. What should
`Same` give then? After that, can a loop compare `first[i]` with
`second[i]` for each index?
```

```hint
after: 4 runs
As soon as one pair of numbers differs, the answer is `false`. When can
the method be sure that the answer is `true`? Where does that `return`
go: inside the loop, or after it?
```

```solution
title: with what you've met so far
static int[] Rolls(int seed, int count)
{
    Random dice = new Random(seed);
    int[] rolls = new int[count];
    for (int i = 0; i < count; i++)
    {
        rolls[i] = dice.Next(1, 7);
    }
    return rolls;
}

static bool Same(int[] first, int[] second)
{
    if (first.Length != second.Length)
    {
        return false;
    }
    for (int i = 0; i < first.Length; i++)
    {
        if (first[i] != second[i])
        {
            return false;
        }
    }
    return true;
}

Console.WriteLine(Same(Rolls(7, 5), Rolls(7, 5)));
---
The `return true;` is after the loop, as the `return -1;` was in
`LinearSearch` on [Searching](lesson:finding-things): only when every pair
has been checked is the answer sure. Two empty arrays give `true`, because
no pair of their numbers differs.
```

```solution
title: a shorter way you'll meet later
static int[] Rolls(int seed, int count)
{
    Random dice = new Random(seed);
    int[] rolls = new int[count];
    for (int i = 0; i < count; i++)
    {
        rolls[i] = dice.Next(1, 7);
    }
    return rolls;
}

static bool Same(int[] first, int[] second)
{
    return first.SequenceEqual(second);
}

Console.WriteLine(Same(Rolls(7, 5), Rolls(7, 5)));
---
`SequenceEqual` compares two arrays, or two lists, element by element. It
is part of LINQ, a set of methods that C# has for asking questions of a
collection.
```

## Choosing from a list

Often we do not want a number. We want a thing: a word, a card, a name.
What do you think this cell chooses? Run it and see.

```csharp exec
id: choosing-from-a-list-1
Random generator = new Random(0);
string[] weather = { "sunny", "cloudy", "rain" };

Console.WriteLine($"one day: {weather[generator.Next(weather.Length)]}");

string[] week = new string[7];
for (int day = 0; day < week.Length; day++)
{
    week[day] = weather[generator.Next(weather.Length)];
}
Console.WriteLine($"a week:  {string.Join(", ", week)}");
```

`generator.Next(weather.Length)` gives a whole number from 0 up to 3, but
not 3: one of the array's indexes, and each index is as likely as the
others. So `weather[generator.Next(weather.Length)]` is one element,
chosen at random. With seed 0, the day is `rain`, and so are three of the
seven days in the week.

Sometimes we want several things. There are two ways to choose them, and
people often confuse them. Look at the two lines this cell prints. Can you
find a card that appears twice?

```csharp exec
id: choosing-from-a-list-2
Random generator = new Random(8);
string[] deck = { "A", "K", "Q", "J", "10" };

string[] drawn = generator.GetItems(deck, 4);
Console.WriteLine($"with replacement:    {string.Join(" ", drawn)}");

generator.Shuffle(deck);
Console.WriteLine($"without replacement: {string.Join(" ", deck[..4])}");
```

`generator.GetItems(deck, 4)` chooses four cards, one at a time. Each
time, it chooses from the whole deck, and that includes the cards it has
already chosen. This is choosing *with replacement*: it is as if each
card were put in the deck again before the next choice. So the same card
can appear twice: here, the K appears twice.

`generator.Shuffle(deck)` *shuffles* the array: it puts its elements in an
order chosen at random. Like `Array.Sort` on
[Sorting](lesson:putting-things-in-order), `Shuffle` changes the array it
is given, and makes no new one. Then `deck[..4]` takes the first four
cards, a range as on [Arrays and lists](lesson:lists-and-sequences). Each
card is in the deck once, so no card can appear twice. This is choosing
*without replacement*.

| Code | Is each item put in again before the next choice? | Can an item appear twice? | Like |
|---|---|---|---|
| `generator.GetItems(items, 4)` | yes | yes | rolling a die four times |
| `generator.Shuffle(items)`, then `items[..4]` | no | no | dealing four cards |

Rolling a die four times is choosing with replacement, because a die does
not remember what it showed last time.

### Your turn

You are drawing five winners from seven names for a prize draw, and
nobody can win twice. Which of the two ways would you use? Can you fill
`winners`?

```csharp exec
id: choosing-from-a-list-3
string[] names = { "Aoife", "Brendan", "Ciara", "Dara", "Eimear", "Fionn", "Gráinne" };
Random generator = new Random(9);
string[] winners = new string[5];

Console.WriteLine(string.Join(", ", winners));
```

```inputs
winners
```

```hint
after: 2 runs
After a name is drawn, can it be drawn again? Which of the two ways in
the cell above never chooses an item twice?
```

```solution
string[] names = { "Aoife", "Brendan", "Ciara", "Dara", "Eimear", "Fionn", "Gráinne" };
Random generator = new Random(9);
generator.Shuffle(names);
string[] winners = names[..5];

Console.WriteLine(string.Join(", ", winners));
---
With seed 9, the winners are Ciara, Dara, Aoife, Eimear and Brendan.
`Shuffle` changes only the order of `names`, so each name is still there
once, and the first five are five different names. If you used
`GetItems`, the table under **Compare with a solution** shows your draw
beside this one. Does a name appear twice in yours?

Your draw may name other winners and still be fair, if it uses the
generator in another way. How could a program check that no name appears
twice in `winners`? Two loops, one inside the other, can compare each
name with every name after it.
```

## Lab bench

The three numbers that you might want to change have names at the top of
the cell. Change them, run it, and see what happens. Each line of the
output is one face of the die: a bar of `*` characters, and how many
times that face was rolled. A chart like this, with a bar for how often
each value appeared, is a *histogram*. `new string('*', n)` makes a string
of `n` stars. The length of a bar is the face's share of the rolls: a bar
of 200 stars would mean that every roll was that face.

```csharp exec
id: lab-bench-1
int seed = 42;       // change it for another run
int rolls = 1000;    // how many times to roll
int sides = 6;       // the number of faces on the die

Random dice = new Random(seed);
int[] counts = new int[sides + 1];    // counts[0] is not used
for (int i = 0; i < rolls; i++)
{
    counts[dice.Next(1, sides + 1)]++;
}
for (int face = 1; face <= sides; face++)
{
    string bar = new string('*', counts[face] * 200 / rolls);
    Console.WriteLine($"{face}: {bar} {counts[face]}");
}
```

With seed 42, the 1 was rolled 191 times in 1,000 rolls, and the 2 only
148 times. Choose one of these questions, or ask one of your own:

1. How uneven are the bars with 60 rolls? With 60,000?
2. Can you find a seed where, in 60 rolls, one face is rolled twice as
   often as another?
3. On line 9, change `dice.Next(1, sides + 1)` to `dice.Next(1, sides)`.
   Which face is never rolled? A mistake like this is hard to see in a few rolls. Is it hard
   to see here?
4. Change the cell to roll two dice and add them, with `counts` long
   enough for totals up to 12. Which total is rolled most often, and why?
   Then try `dice.Next(2, 13)` for the total instead. Is it the same as
   two dice?

## Looking back

The word *random* means less now than it did at the top of this page. For
a generator, it does not mean "impossible to predict". It means
"impossible to predict for anyone who does not know the seed", and "mixed
so well that the difference does not show in the answer".

When the rolls first repeated, did it feel like a trick? Or did the
reason make sense before you read it? Where else have you met something
that is not exactly what it claims to be, but is so close that the
difference never matters?

A challenge: here is a shuffle that someone wrote by hand. It swaps each
card with a card chosen from anywhere in the array, with the swap from
[Sorting](lesson:putting-things-in-order). It shuffles A, B and C 60,000
times, and counts how often each of the six orders appears. A fair shuffle
gives each order about the same count. Is this one fair? Then change line
10 to `int j = generator.Next(i, cards.Length);`, so that each card is
swapped only with itself or a card after it. What happens to the counts?
To test code whose answer changes every time, run it many times and
count. (`new string(cards)` makes a string from the array's characters.
`counts.GetValueOrDefault(order)` gives the count for `order`, or 0 when
that order is not in the dictionary yet.)

```csharp challenge
// A shuffle written by hand. Is it fair?
Random generator = new Random(1);
Dictionary<string, int> counts = new();
for (int game = 0; game < 60000; game++)
{
    char[] cards = { 'A', 'B', 'C' };
    for (int i = 0; i < cards.Length; i++)
    {
        // j can be any place in the array
        int j = generator.Next(cards.Length);
        (cards[i], cards[j]) = (cards[j], cards[i]);
    }
    string order = new string(cards);
    counts[order] = counts.GetValueOrDefault(order) + 1;
}
foreach (string order in counts.Keys)
{
    Console.WriteLine($"{order}: {counts[order]}");
}
```

Three more extras use what this page has built: [The Monty Hall
problem](lesson:three-doors), which plays a game show many times to settle
an argument; [Monte Carlo](lesson:counting-darts), which estimates π from
darts thrown at random; and [Markov chains](lesson:a-chain-reads-a-book),
which chooses words at random, one after another, to write new sentences in
the voice of a book. This is an extra
page, so it has no practice page.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project, and a seeded program prints the same
numbers there, on the same version of .NET as this page. In a console
window on Windows, the die in the first cell stops when you press Ctrl+Z
and then Enter, as on [Reading input](lesson:reading-input). Microsoft warns
that another version of .NET may give different numbers for the same
seed. So a program that records its seed for a test records its version
of .NET too.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Microsoft. *System.Random class*.
<https://learn.microsoft.com/en-us/dotnet/fundamentals/runtime-libraries/system-random>.
Microsoft's own description of `Random`: seeds, the methods on this page,
and a note on when to use `RandomNumberGenerator` instead. Its warning
about seeds and versions of .NET is here too. It is written for
programmers who already know C#.

Microsoft. *RandomNumberGenerator Class*.
<https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.randomnumbergenerator>.
The generator for security, for the cases where a number that can be
predicted is a weakness.

.NET. *Random.CompatImpl.cs*.
<https://github.com/dotnet/runtime/blob/main/src/libraries/System.Private.CoreLib/src/System/Random.CompatImpl.cs>.
The code that `new Random(42)` runs, which anyone can read. Its comments
say that it is a changed version of an algorithm by Donald Knuth. It is
much harder than anything on this page. It is here because you can check
the claim that an ordinary calculation makes the numbers.

Veritasium (2014). *What is NOT Random?*
<https://www.youtube.com/watch?v=sMb00lz-IfE>. Is anything truly random,
or would it all be predictable if we knew enough? Veritasium asks
physicists. The video is ten minutes long.
