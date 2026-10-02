---
title: "The Monty Hall problem: three doors and a simulation"
version: 2026.09.28.2
from: three-doors
covers: [PDP-LO2, PDP-LO7]
---

# The Monty Hall problem: three doors and a simulation

On a game show there are three doors. Behind one of them is a car. Behind
each of the other two is a goat.

You choose a door. Suppose you choose door 1. It stays shut for now.

The host knows what is behind every door. He opens one of the two doors
you did not choose, and he always opens one with a goat behind it. Suppose
he opens door 3, and there is the goat.

Then he offers you a choice. You can keep door 1, or you can switch to
door 2. Does it matter which you do? If you switch, how often do you win
the car? Before you read further, make your own guess, and write it on
paper.

This puzzle is called the *Monty Hall problem*, after the host of an old
American game show. On this page we:

- play one game in C#
- look at the answer that most people give first
- play thousands of games, and count the wins
- find the line of code that makes the difference
- count the three possible cases, to see why the result is true
- change the host, and see what happens to the answer

This page is an extra, so you can do it whenever you have time. It needs
loops, methods and lists, and a random number generator with a seed. The
pages to read first are [Loops](lesson:repeating-yourself) and
[Random numbers](lesson:leaving-it-to-chance).

## Playing one game

Here is one game, written out step by step so that we can watch it
happen. Run it. Which choice wins this game: staying, or switching?

```csharp exec
id: playing-one-game-1
int seed = 1;    // change it to play another game
Random generator = new Random(seed);

int car = generator.Next(1, 4);          // the door with the car
int firstPick = generator.Next(1, 4);    // the door you choose

// The host opens a door that is neither your pick nor the car. When your
// pick is the car, both other doors have goats, and he can open either one.
List<int> choicesForHost = new List<int>();
for (int door = 1; door <= 3; door++)
{
    if (door != firstPick && door != car)
    {
        choicesForHost.Add(door);
    }
}
int opened = choicesForHost[generator.Next(choicesForHost.Count)];

// 1 + 2 + 3 is 6, so the door that is left is 6 minus the other two.
int otherDoor = 6 - firstPick - opened;

Console.WriteLine($"The car is behind door {car}.");
Console.WriteLine($"You choose door {firstPick}.");
Console.WriteLine($"The host opens door {opened}.");
Console.WriteLine($"Switching takes you to door {otherDoor}.");
Console.WriteLine($"Staying wins: {firstPick == car}");
Console.WriteLine($"Switching wins: {otherDoor == car}");
```

A *random number generator* is a thing that gives a new number each time
you ask it, and its *seed* is the number it starts from. The same seed
gives the same game on every Run, as on
[Random numbers](lesson:leaving-it-to-chance). `generator.Next(1, 4)`
gives a whole number from 1 up to 4, but not 4: door 1, 2 or 3.

`choicesForHost` is a list of the doors the host may open. When your pick
is the car, it has two doors. When your pick is a goat, it has only one.
`choicesForHost[generator.Next(choicesForHost.Count)]` chooses one door
from the list, as `weather[generator.Next(weather.Length)]` chose a day on
[Random numbers](lesson:leaving-it-to-chance).

`otherDoor` is the door that switching takes you to. The sum of the three
door numbers is 1 + 2 + 3 = 6. Subtract your door and the opened door
from 6, and the result is the one door that is still shut.

With seed 1, the car is behind door 1, and you choose door 1. So the
host has two goat doors to choose from, and he opens door 2. Switching
takes you to door 3, and staying wins: the last two lines are `True` and
`False`.

Can you change the seed to 2, then 3, then 4, and play those games too?
You can also change `new Random(seed)` to `Random.Shared`, the generator
that .NET makes for every program. Then each Run plays a game that nobody
can predict. C# warns that `seed` is not used any more (CS0219), but a
warning never stops a program. Sometimes staying wins, and sometimes
switching wins. One game tells us nothing about which is better. That is
why we need a lot of games.

## Why staying feels fine

Here is the reasoning that most people reach first, step by step.

Two doors are still shut. One of them has the car. Nothing you have been
told makes one door different from the other. So the chance is one in two
for either door, and switching gains you nothing.

That argument is careful, and one step in it fails. This page finds that
step.

If you are still not convinced at the end, many clever people agree with
you. This problem caused a public argument among people who do mathematics
for a living. So we will not settle it by arguing. We will play the game
thousands of times, and count.

## Playing it ten thousand times

A *simulation* is a program that copies something from the world, such as
a game show, so that we can study it. This one puts one game inside a
method, `SwitchingWins`, and then plays it 10,000 times.

In this game, one of the two choices always wins: the car is behind your
door, or behind the other door that is still shut. So a method that says
whether switching won also says whether staying won. Staying won in every
game that switching lost.

The program counts the wins, and divides by the number of games. The
result is each choice's *share* of the games: a number from 0 to 1. A
share of 0.5 means one game in two.

```csharp exec
id: playing-it-ten-thousand-times-1
static bool SwitchingWins(Random generator)
{
    int car = generator.Next(1, 4);
    int firstPick = generator.Next(1, 4);
    List<int> choicesForHost = new List<int>();
    for (int door = 1; door <= 3; door++)
    {
        if (door != firstPick && door != car)
        {
            choicesForHost.Add(door);
        }
    }
    int opened = choicesForHost[generator.Next(choicesForHost.Count)];
    int otherDoor = 6 - firstPick - opened;
    return otherDoor == car;
}

Random generator = new Random(1);
int games = 10000;
int switchingWins = 0;
for (int game = 0; game < games; game++)
{
    if (SwitchingWins(generator))
    {
        switchingWins++;
    }
}
int stayingWins = games - switchingWins;
Console.WriteLine($"Games played:  {games}");
Console.WriteLine($"Staying won:   {stayingWins}, a share of {(double)stayingWins / games:F3}");
Console.WriteLine($"Switching won: {switchingWins}, a share of {(double)switchingWins / games:F3}");
```

```predict
type: number
tolerance: 0.03

The last line ends with the share of the games that switching won. What
share will the last line show?
```

Staying won 3391 games, a share of 0.339. Switching won 6609, a share of
0.661. That is about two games in three. Neither share is one in two.

`(double)` makes the count a `double`, so that the division keeps its
decimal part, and `:F3` shows the result with three digits after the
point.

The program makes one generator, and passes it to `SwitchingWins` for
every game. So each game asks the same generator for its next numbers: one
generator, and many numbers, as on
[Random numbers](lesson:leaving-it-to-chance).

### Your turn

How much do the shares change from one seed to another? This cell plays
100 games with each of five seeds, and then 100,000 games with the same
five seeds. Each Run starts a new program, so this cell has its own copy
of `SwitchingWins`. Before you run it, on which line do you expect the
five shares to differ more?

```csharp exec
id: your-turn-1
static bool SwitchingWins(Random generator)
{
    int car = generator.Next(1, 4);
    int firstPick = generator.Next(1, 4);
    List<int> choicesForHost = new List<int>();
    for (int door = 1; door <= 3; door++)
    {
        if (door != firstPick && door != car)
        {
            choicesForHost.Add(door);
        }
    }
    int opened = choicesForHost[generator.Next(choicesForHost.Count)];
    int otherDoor = 6 - firstPick - opened;
    return otherDoor == car;
}

int[] sizes = { 100, 100000 };
foreach (int games in sizes)
{
    Console.Write($"{games} games, seeds 1 to 5:");
    for (int seed = 1; seed <= 5; seed++)
    {
        Random generator = new Random(seed);
        int switchingWins = 0;
        for (int game = 0; game < games; game++)
        {
            if (SwitchingWins(generator))
            {
                switchingWins++;
            }
        }
        Console.Write($" {(double)switchingWins / games:F3}");
    }
    Console.WriteLine();
}
```

With 100 games, the five seeds give shares from 0.610 to 0.750. With
100,000 games, every share is between 0.666 and 0.669. The differences
come from the randomness. The value that the shares stay close to is not
random at all.

The more games we play, the closer the share comes to one value. This is
called the *law of large numbers*: when something that has chance in it
happens many times, the share of the times that one result happens comes
closer and closer to one number. On
[Random numbers](lesson:leaving-it-to-chance), the mean of many rolls of
a die did the same: seed 7 and seed 8 took different paths, and finished
in the same place.

Can you add 1000 and 10000 to `sizes`, between the two numbers that are
there, and see what shares they give?

## Where the two thirds comes from

The simulation says that switching is better. It does not say why, and a
number that we cannot explain does not help us much. So let's look again
at the lines that decide which door the host may open.

```csharp
for (int door = 1; door <= 3; door++)
{
    if (door != firstPick && door != car)
    {
        choicesForHost.Add(door);
    }
}
```

The `if` line has two conditions. The second one, `door != car`, is the
most important part of the problem. It means that the host never opens the
door with the car. He is not guessing. He knows where the car is, and he
opens a door that he knows has a goat behind it.

The "one in two" argument misses this step. It treats the two shut doors
as if nothing had happened to make them different. But something did happen.
The host chose a door, and the doors he was allowed to choose depended on
where the car was.

How often does the host have a choice at all? This cell counts the games
in which `choicesForHost` has only one door in it.

```csharp exec
id: where-the-two-thirds-comes-from-1
Random generator = new Random(1);
int games = 10000;
int noChoice = 0;
for (int game = 0; game < games; game++)
{
    int car = generator.Next(1, 4);
    int firstPick = generator.Next(1, 4);
    List<int> choicesForHost = new List<int>();
    for (int door = 1; door <= 3; door++)
    {
        if (door != firstPick && door != car)
        {
            choicesForHost.Add(door);
        }
    }
    if (choicesForHost.Count == 1)
    {
        noChoice++;
    }
}
Console.WriteLine($"The host had only one door he could open in {noChoice} of {games} games.");
```

In 6598 of the 10,000 games, the host had only one door that he could
open: about two games in three. In those games, the door he opens is not
his choice. Where the car is decides it. So the door he opens tells us
something about where the car is.

## Three cases you can count

There are only three places the car can be, and each is as likely as the
others. Suppose you picked door 1. The picture shows what happens in each
case.

![The three places the car can be, when you pick door 1. Each has a chance of 1 in 3. Car behind door 1: the host may open door 2 or door 3, and switching loses. Car behind door 2: the host must open door 3, and switching wins. Car behind door 3: the host must open door 2, and switching wins. Switching wins in two of the three cases.](monty-hall-cases.svg)

Look at the row about the host. In two of the three cases, the host has no
choice at all. One door is yours, and another hides the car, so only one
door is left for him to open. When the host has only one door that he can
open, the door he opens tells us where the car is.

Now count the bottom row. Switching wins in two of the three cases. That
is two out of three, the number that the simulation kept giving us.

The picture kept your pick at door 1. The next cell looks at every pair:
a place for the car, and a door that you pick. There are 3 places for the
car and 3 doors to pick, so there are $3 \times 3 = 9$ pairs, and each
pair is as likely as the others. Two loops, one inside the other, list them all:
these are *nested loops*, as on [Loops](lesson:repeating-yourself). Each
time the outer loop moves the car, the inner loop tries all three picks.

```csharp exec
id: three-cases-counted
int switchingWins = 0;
for (int car = 1; car <= 3; car++)
{
    for (int firstPick = 1; firstPick <= 3; firstPick++)
    {
        // He leaves the car shut, so switching wins if your pick missed it.
        if (firstPick != car)
        {
            switchingWins++;
        }
    }
}
Console.WriteLine($"Switching wins in {switchingWins} of the 9 pairs.");
```

```predict
type: choice

What will the last line print?

- Switching wins in 3 of the 9 pairs.
  - Your first pick has one chance in three of being the car.
- Switching wins in 6 of the 9 pairs.
  - Your first pick misses the car more often than it finds it.
- Switching wins in 9 of the 9 pairs.
  - The host always leaves the car shut.
```

It prints `Switching wins in 6 of the 9 pairs.` Six of nine is two thirds
again. The cell asks only one question about each pair: did the first pick
miss the car? That is the whole argument. Switching wins exactly when your
first pick missed the car, because then the host must leave the car shut.
Your first pick was a guess with one chance in three, so it misses two
times in three. Switching makes every miss a win.

Can you add a line inside the inner loop that prints each pair, such as
`car 2, pick 1`? Then you can check the count yourself.

## A host who is not paying attention

Does switching win more often because the host knows where the car is? If
so, a host who knows nothing should make the advantage disappear. A
simulation can test that.

So here is a careless host. He opens one of the other two doors at random,
without knowing what is behind it. Sometimes he opens the door with the
car himself, and the game is spoiled: there is nothing left to decide.
`CarelessGame` plays one game, and returns what happened, as a string:
`"spoiled"`, or the choice that won, `"staying"` or `"switching"`. The
`if` inside it is the knowing host's `if` without `&& door != car`.

```csharp exec
id: a-host-who-is-not-paying-attention-1
static string CarelessGame(Random generator)
{
    int car = generator.Next(1, 4);
    int firstPick = generator.Next(1, 4);
    // He avoids your door only. He does not know where the car is.
    List<int> choicesForHost = new List<int>();
    for (int door = 1; door <= 3; door++)
    {
        if (door != firstPick)
        {
            choicesForHost.Add(door);
        }
    }
    int opened = choicesForHost[generator.Next(choicesForHost.Count)];
    if (opened == car)
    {
        return "spoiled";
    }
    int otherDoor = 6 - firstPick - opened;
    if (otherDoor == car)
    {
        return "switching";
    }
    return "staying";
}

Random generator = new Random(1);
int games = 10000;
int spoiled = 0;
int stayingWins = 0;
int switchingWins = 0;
for (int game = 0; game < games; game++)
{
    string result = CarelessGame(generator);
    if (result == "spoiled")
    {
        spoiled++;
    }
    else if (result == "staying")
    {
        stayingWins++;
    }
    else
    {
        switchingWins++;
    }
}
int finished = games - spoiled;
Console.WriteLine($"Spoiled, because he opened the car: {spoiled} of {games}");
Console.WriteLine($"Games that finished: {finished}");
Console.WriteLine($"Staying won:   a share of {(double)stayingWins / finished:F3}");
Console.WriteLine($"Switching won: a share of {(double)switchingWins / finished:F3}");
```

```predict
type: number
tolerance: 0.03

The last line gives the share of the finished games that switching won.
What share will the last line show?
```

He opened the car in 3311 of the 10,000 games, about a third of them,
and 6689 games finished. In those, staying won a share of 0.507, and
switching a share of 0.493. Each is close to one in two.

So the first argument, "one in two", holds for this game with a careless
host, but not for the original game. Against a careless host, the two shut
doors are equally good. The two thirds came from the host knowing where
the car was, and from the fact that in two cases out of three he had no
choice. It never came from the number of doors that were still shut.

### Your turn: a hundred doors

What happens to the original game with a hundred doors in place of three?
You pick one door. The host, who knows where the car is, opens 98 doors
with goats behind them. One other door is still shut. How often does
switching win now? Make a guess first.

The program below plays the game 10,000 times. The doors are numbered
from 1 to 100. The host's part is `OtherShutDoor`: it returns the door he
leaves shut, besides yours. Can you write it? Until you do, it returns 0,
which is not a door, so switching never wins.

```csharp exec
id: your-turn-2
static int OtherShutDoor(int car, int firstPick, Random generator)
{
    // Which door does the host leave shut, besides yours?
    return 0;
}

Random generator = new Random(1);
int games = 10000;
int switchingWins = 0;
for (int game = 0; game < games; game++)
{
    int car = generator.Next(1, 101);
    int firstPick = generator.Next(1, 101);
    if (OtherShutDoor(car, firstPick, generator) == car)
    {
        switchingWins++;
    }
}
Console.WriteLine($"Switching won: {switchingWins} of {games}, a share of {(double)switchingWins / games:F3}");
```

```inputs
OtherShutDoor(7, 42, new Random(1))            // you picked a goat
OtherShutDoor(100, 1, new Random(1))           // you picked a goat
OtherShutDoor(7, 7, new Random(1)) != 7        // you picked the car: any door but 7
```

```hint
after: 2 runs
The host never opens the car. If your first pick is not the car, which
door must he leave shut?
```

```hint
after: 4 runs
If your first pick is the car, the other shut door can be any of the
other 99. Can you make a list of them, as `choicesForHost` was made, and
choose one with `generator`?
```

```solution
static int OtherShutDoor(int car, int firstPick, Random generator)
{
    if (firstPick != car)
    {
        return car;    // he must leave the car shut
    }
    List<int> otherDoors = new List<int>();
    for (int door = 1; door <= 100; door++)
    {
        if (door != firstPick)
        {
            otherDoors.Add(door);
        }
    }
    return otherDoors[generator.Next(otherDoors.Count)];
}

Random generator = new Random(1);
int games = 10000;
int switchingWins = 0;
for (int game = 0; game < games; game++)
{
    int car = generator.Next(1, 101);
    int firstPick = generator.Next(1, 101);
    if (OtherShutDoor(car, firstPick, generator) == car)
    {
        switchingWins++;
    }
}
Console.WriteLine($"Switching won: {switchingWins} of {games}, a share of {(double)switchingWins / games:F3}");
---
It prints `Switching won: 9895 of 10000, a share of 0.990`. Your first
pick is the car only one time in a hundred, and switching wins all the
other times. With a hundred doors, the host's 98 goats clearly tell you
something: of all the doors he could have left shut, he left that one.
Three doors work in the same way, but the numbers are too small to make it
obvious.

In the table under **Compare with a solution**, the first two rows are
games where your pick is a goat, so the door left shut must be the car.
In the last row your pick is the car, and any door but 7 can be left
shut, so the row asks only whether the door is not 7.
```

## A host with a favourite door

Here is one more host. You always pick door 1. He still never opens the
car. But when he has a choice between door 2 and door 3, which happens
when the car is behind door 1, he always opens door 3, his favourite.

Suppose he opens door 3. Should you switch? And if he opens door 2?

### Your turn

Can you finish the game in this cell? Its last two lines print how often
he opens each door, and how often switching wins after each one. When he
opens door 3, add 1 to `openedThree`, and add 1 to `switchingWonThree` too
if switching wins. Do the same for door 2.

```csharp exec
id: doors-favourite-door
Random generator = new Random(1);
int openedThree = 0;
int switchingWonThree = 0;
int openedTwo = 0;
int switchingWonTwo = 0;

for (int game = 0; game < 30000; game++)
{
    int car = generator.Next(1, 4);
    // You always pick door 1. Which door does this host open?
    // Which door would switching take you to?
}

Console.WriteLine($"He opened door 3 in {openedThree} games. Switching won {switchingWonThree} of them.");
Console.WriteLine($"He opened door 2 in {openedTwo} games. Switching won {switchingWonTwo} of them.");
```

```inputs
openedThree
switchingWonThree
openedTwo
switchingWonTwo
```

```hint
after: 2 runs
Where is the car when he opens door 3? There are two places. Where is it
when he opens door 2?
```

```hint
after: 4 runs
Can an `if`, an `else if` and an `else` choose `opened` for each of the
three places the car can be? Then the door that switching takes you to is
`6 - 1 - opened`, as in the first cell on this page.
```

```solution
Random generator = new Random(1);
int openedThree = 0;
int switchingWonThree = 0;
int openedTwo = 0;
int switchingWonTwo = 0;

for (int game = 0; game < 30000; game++)
{
    int car = generator.Next(1, 4);
    int opened;
    if (car == 1)
    {
        opened = 3;    // his favourite, when he has a choice
    }
    else if (car == 2)
    {
        opened = 3;
    }
    else
    {
        opened = 2;
    }
    int otherDoor = 6 - 1 - opened;
    if (opened == 3)
    {
        openedThree++;
        if (otherDoor == car)
        {
            switchingWonThree++;
        }
    }
    else
    {
        openedTwo++;
        if (otherDoor == car)
        {
            switchingWonTwo++;
        }
    }
}

Console.WriteLine($"He opened door 3 in {openedThree} games. Switching won {switchingWonThree} of them.");
Console.WriteLine($"He opened door 2 in {openedTwo} games. Switching won {switchingWonTwo} of them.");
Console.WriteLine($"Over all the games, switching won a share of {(double)(switchingWonThree + switchingWonTwo) / 30000:F3}");
---
He opened door 3 in 20025 games, and switching won 9875 of them: about
half. He opened door 2 in 9975 games, and switching won all 9975. He opens
door 3 when the car is behind door 1 and when it is behind door 2. Those
two cases are equally likely, and switching wins in one of them. He opens
door 2 only when he has to, when the car is behind door 3. So when he
opens door 3, switching and staying are equally good. When he opens door
2, switching always wins.

Over all the games, switching still won a share of 0.662, about two
thirds. The host's habit changes what each door tells you, but not how
often switching wins.
```

## Looking back

You now have a puzzle where the first answer most people give does not
match the games. You also have a way to settle a question like it that
does not depend on who argues best.

The simulation convinced us, and the three cases explained why. We need
both. A number with no argument behind it is a fact that you have to trust
without knowing why. And the "one in two" answer lasted so long because
people argued without checking.

In the careless host's finished games, he also opened a door with a goat
behind it, just as the knowing host always does. Can you say, in one
sentence, why the same goat means two thirds in one game and a half in the
other?

A challenge: here is one program for every version. There are `doors`
doors. A host who knows where the car is opens `opened` of the goat
doors. Then you switch to one of the other shut doors, chosen at random.
Can you simulate it for any numbers, and find a formula that matches?
Three doors with one opened should give about two thirds, and a hundred
doors with 98 opened, about 99 in 100.

```csharp challenge
// There are `doors` doors. The host, who knows where the car is, opens
// `opened` goat doors. You switch to one of the other shut doors at random.
static bool SwitchingWins(int doors, int opened, Random generator)
{
    // Your code here
    return false;
}

Random generator = new Random(1);
// Try (3, 1), (4, 1), (4, 2) and (100, 98), 100,000 games each.
int games = 100000;
int wins = 0;
for (int game = 0; game < games; game++)
{
    if (SwitchingWins(3, 1, generator))
    {
        wins++;
    }
}
Console.WriteLine($"3 doors, 1 opened: {(double)wins / games:F3}");
```

Two more extras use chance as this page does.
[Monte Carlo](lesson:counting-darts) estimates π from darts thrown at
random. [Markov chains](lesson:a-chain-reads-a-book) chooses words at
random, one after another, to write new sentences in the voice of a book.
This is an extra page, so it has no practice page.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project, and a seeded program prints the same
numbers there, on the same version of .NET as this page.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

vos Savant, M. (1990). *Ask Marilyn*. Parade Magazine. The column that
started the argument. Her answer was to switch. Thousands of readers wrote
to say that she was mistaken, and many of them had doctorates, the highest
university degree. It is worth remembering the next time an answer feels
obvious.

Rosenhouse, J. (2009). *The Monty Hall Problem: The Remarkable Story of
Math's Most Contentious Brain Teaser*. Oxford University Press. A whole
book on this one question, with the versions where the answer changes,
such as a host with a favourite door, or one who offers the switch only
sometimes.

Numberphile (2016). *Monty Hall Problem.*
<https://www.youtube.com/watch?v=4Lb-6rxZxx0>. The classic argument, on
paper. It is worth watching after you have run the simulation, not before.
