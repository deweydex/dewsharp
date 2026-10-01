---
title: "Making change: three ways to use the fewest coins"
version: 2026.09.28.1
from: three-ways-to-make-change
covers: [PDP-LO2, PDP-LO8]
---

# Making change: three ways to use the fewest coins

Here is a small problem. You have an amount to pay, and tokens of a few
different values. What is the fewest tokens that add up to the amount?

With euro coins, most people already have a way: give the largest coin
that fits, and repeat. Does that way always find the fewest? This page
tries three ways to answer the question. Each one makes a different choice
between being fast and being certain of the answer. The same choice appears
in problems much bigger than making change.

This page is an extra. The module's outcomes do not need it, so you can do
it whenever you have time. It uses methods and arrays, a class that keeps
methods together, as on [Reusable methods](lesson:building-reusable-tools),
a dictionary, from [Dictionaries](lesson:looking-things-up-by-name), and a
method that calls itself, from
[Recursion](lesson:a-function-that-calls-itself).

## Trying every combination

A game pays its players in tokens worth 1, 3 and 4. What is the fewest
tokens that make 6? Can you find it in your head, before you run the cell?

```csharp exec
id: trying-every-combination-1
// Returns the fewest tokens that add up to amount, or -1 if no tokens do.
static int FewestBruteForce(int amount, int[] tokens)
{
    if (amount == 0)
    {
        return 0;
    }
    int best = -1;
    foreach (int token in tokens)
    {
        if (token <= amount)
        {
            int rest = FewestBruteForce(amount - token, tokens);
            if (rest != -1 && (best == -1 || rest + 1 < best))
            {
                best = rest + 1;
            }
        }
    }
    return best;
}

int[] tokens = { 1, 3, 4 };
Console.WriteLine(FewestBruteForce(6, tokens));
```

```predict
type: number

What will it print?
```

It prints 2: two 3s. Look at the line inside the loop.
`FewestBruteForce` calls itself, each time with a smaller amount, so it is
a *recursive* method, as on [Recursion](lesson:a-function-that-calls-itself).
Its *base case*, the input it answers at once with no more calls, is an
amount of 0, which needs no tokens. Each call takes one token from the
amount, so each call is closer to 0.

The method returns -1 when no tokens make the amount. No real count of
tokens is below 0, so -1 is a safe sign that there is no answer. The long
`if` inside the loop keeps a new answer only when there is one
(`rest != -1`), and only when it is the first answer, or better than the
best so far (`best == -1 || rest + 1 < best`). `rest + 1` counts the token
that this call took, and the tokens for the rest of the amount.

The idea is the simplest one there is:

1. Try every token at every step.
2. Follow each choice to the end, where the amount is 0.
3. Keep the choice that used the fewest tokens.

This is called *brute force*: a way to solve a problem that checks every
possibility, without trying to decide which ones are worth checking. It is
slow. But it never misses the fewest, because it never skips a
possibility.

The rest of this page uses this method many times, and a method belongs to
its cell. So the next cell puts it in a class, as `Stats` kept its methods
on [Reusable methods](lesson:building-reusable-tools). Every cell below it
can call it as `BruteForce.Fewest` (rule 2 of the rules of the road). The
method is the same, with one line more: `Calls = Calls + 1;`. `Calls` is a
*field* of the class: a variable that belongs to the class, outside every
method. It counts how many times `Fewest` has been called, and the next
section uses it.

```csharp exec
id: trying-every-combination-class
file: BruteForce.cs
static class BruteForce
{
    public static int Calls = 0;

    /// <summary>Returns the fewest tokens that add up to amount, or -1 if no tokens do.</summary>
    public static int Fewest(int amount, int[] tokens)
    {
        Calls = Calls + 1;
        if (amount == 0)
        {
            return 0;
        }
        int best = -1;
        foreach (int token in tokens)
        {
            if (token <= amount)
            {
                int rest = Fewest(amount - token, tokens);
                if (rest != -1 && (best == -1 || rest + 1 < best))
                {
                    best = rest + 1;
                }
            }
        }
        return best;
    }
}
```

### Your turn

Can you make the program print the fewest tokens for 10? Which tokens are
they? Then, can you find an amount that tokens of 3 and 4, with no 1, can't
make? What does `BruteForce.Fewest` give for it?

```csharp exec
id: trying-every-combination-2
int[] tokens = { 1, 3, 4 };
Console.WriteLine(BruteForce.Fewest(6, tokens));
```

```hint
after: 2 runs
Which number in the last line is the amount? For the second question,
which array would you give `Fewest` in place of `tokens`?
```

```solution
int[] tokens = { 1, 3, 4 };
Console.WriteLine(BruteForce.Fewest(10, tokens));

int[] noOnes = { 3, 4 };
Console.WriteLine(BruteForce.Fewest(5, noOnes));
---
The first line is 3. One way is 4 + 3 + 3. No two tokens make 10: even
two 4s make less than 10. The second line is -1: no tokens of 3 and 4 add
up to 5.
```

## Remembering what we already found

Brute force repeats itself. Think about how it reaches 6:

- If it takes a 4, 2 is left. So it asks, "What is the fewest tokens for
  2?"
- If it takes a 1 and then a 3, 2 is left too. It asks the same question.
- If it takes a 3 and then a 1, 2 is left again. It asks the same question
  again.

Each time, it finds the answer for 2 from the start. And each time, the
answer is the same.

![The calls that brute force makes from the amount 6, two steps deep. Taking 1, 3 or 4 from 6 leaves 5, 3 or 2. Taking 1, 3 or 4 from 5 leaves 4, 2 or 1. Taking 1 or 3 from 3 leaves 2 or 0. Taking 1 from 2 leaves 1. The amount 2 appears three times, each at the end of a different path, and those three boxes have a thick border.](repeated-question.svg)

The picture shows only the first two steps. If it continued, 2 would
appear a fourth time, after four 1s.

A *cache* is a place to keep an answer the first time we find it. When the
same question appears again, we look up the answer, in place of finding it
again. A `Dictionary<int, int>` suits a cache: each key is an amount, and
its value is the fewest tokens for that amount.

The next class, `Cached`, has the same `Fewest` with a cache. The program
under it makes an empty dictionary, finds the fewest for 6, and then
prints what the cache holds.

```csharp exec
id: remembering-what-we-already-worked-out-1
file: Cached.cs
static class Cached
{
    public static int Calls = 0;

    /// <summary>Returns the fewest tokens that add up to amount, or -1 if no tokens do.
    /// cache keeps each answer already found, with the amount as its key.</summary>
    public static int Fewest(int amount, int[] tokens, Dictionary<int, int> cache)
    {
        Calls = Calls + 1;
        if (amount == 0)
        {
            return 0;
        }
        if (cache.ContainsKey(amount))
        {
            return cache[amount];
        }
        int best = -1;
        foreach (int token in tokens)
        {
            if (token <= amount)
            {
                int rest = Fewest(amount - token, tokens, cache);
                if (rest != -1 && (best == -1 || rest + 1 < best))
                {
                    best = rest + 1;
                }
            }
        }
        cache[amount] = best;
        return best;
    }
}
```

```csharp exec
id: remembering-what-we-already-worked-out-1-program
int[] tokens = { 1, 3, 4 };
Dictionary<int, int> cache = new();
Console.WriteLine(Cached.Fewest(6, tokens, cache));
foreach (int amount in cache.Keys)
{
    Console.WriteLine($"The fewest for {amount}: {cache[amount]}");
}
```

Two parts of `Fewest` are new. Before it tries any token, it asks the
cache: `ContainsKey` says whether the amount is a key already. If it is,
the method returns the answer it stored, at once. And before it returns a
new answer, it stores it: `cache[amount] = best;`.

Every call uses the same dictionary. A dictionary is a reference type, as
on [Two names, one list](lesson:two-names-one-list), so passing `cache` to
the next call passes the same dictionary, not a copy. An answer that one
call stores is there for every other call.

The first line is 2, as brute force found. The lines under it show the
cache: an answer for each amount from 1 to 6.

Keeping each answer the first time we find it, so that a repeated question
is only looked up, is called *memoization*. (The word comes from *memo*, a
note that helps you remember.) Memoization does not change the answer the
method returns. It changes only how much work the method does.

Why is it safe to trust a stored answer? The fewest tokens for an amount
depends only on the amount and the tokens. It does not matter how we got
there. "What is the fewest for 2?" has the same answer when we reach 2
from 6 by taking a 4, and when we reach it from 5 by taking a 3. So the
first time we find the answer for 2, we have found it for every path that
reaches 2.

How much work does it save? The next cell counts the calls that each way
makes, for larger and larger amounts. Before each count, it sets `Calls`
to 0. And each `Cached.Fewest` gets a new, empty dictionary, so that no
answer remains from the amount before.

```csharp exec
id: remembering-what-we-already-worked-out-2
int[] tokens = { 1, 3, 4 };
foreach (int amount in new int[] { 10, 15, 20, 22, 24 })
{
    BruteForce.Calls = 0;
    BruteForce.Fewest(amount, tokens);
    Cached.Calls = 0;
    Cached.Fewest(amount, tokens, new Dictionary<int, int>());
    Console.WriteLine($"{amount}: brute force {BruteForce.Calls} calls, cached {Cached.Calls} calls");
}
```

For 20, brute force makes 20,736 calls, and the cached way makes 56. Each
time the amount grows by 2, brute force makes more than twice as many calls
as before: 20,736 for 20, 54,288 for 22 and 142,129 for 24. The cached way
makes only a few more: 56, 62 and 68.

The two ways do not do the same work. Brute force follows every path of
choices, and it meets the same smaller amounts again and again, on
different paths. The cached way finds the answer for each amount once.
After that, it only looks the answer up.

### Your turn

Counting calls says how much work each way does. A stopwatch says how long
it takes. C#'s `Stopwatch` class measures time: `Stopwatch.StartNew()`
makes a stopwatch and starts it, `Stop()` stops it, and
`ElapsedMilliseconds` gives the time between the two, in milliseconds
(thousandths of a second).

A cell can use `Console` and `Dictionary` with no extra line. `Stopwatch`
is in `System.Diagnostics`, a part of .NET that a cell uses only when it
asks. The first line of the cell, `using System.Diagnostics;`, asks.

The program finds the fewest tokens for 100, the cached way, and times it.
Can you add a line that prints how many milliseconds it took? Your time
depends on your computer, so this page prints none of its own.

Then think about brute force, for the same amount. Before you run
anything, do you think it would finish in under a second? Why? The table
of calls above has the answer, and you do not need to run it. If you do,
the **Stop** button stops it.

```csharp exec
id: remembering-what-we-already-worked-out-3
using System.Diagnostics;

int[] tokens = { 1, 3, 4 };
Stopwatch watch = Stopwatch.StartNew();
int fewest = Cached.Fewest(100, tokens, new Dictionary<int, int>());
watch.Stop();
Console.WriteLine($"The fewest for 100: {fewest}");
// Your line: how many milliseconds did it take?
```

```hint
after: 2 runs
Which of the stopwatch's values gives the time? The paragraph above the
cell names it. Can you print it with `$"..."`, as the line above prints
`fewest`?
```

```hint
after: 3 runs
`Console.WriteLine($"It took {watch.ElapsedMilliseconds} ms");`. Can you
time `BruteForce.Fewest(30, tokens)` in the same way, and then 32 and 34?
How does the time grow?
```

## The greedy shortcut

There is a third way, and it does not check every possibility at all. At
every step, take the largest token that still fits. Repeat until nothing is
left. It is the way most people give change.

```csharp exec
id: the-greedy-shortcut-1
file: Greedy.cs
static class Greedy
{
    /// <summary>Returns how many tokens make amount when the largest token that fits is taken at each step,
    /// or -1 if an amount remains that no token fits. The tokens go from the smallest to the largest.</summary>
    public static int Fewest(int amount, int[] tokens)
    {
        int remaining = amount;
        int count = 0;
        for (int i = tokens.Length - 1; i >= 0; i--)    // the largest token first
        {
            while (remaining >= tokens[i])
            {
                remaining = remaining - tokens[i];
                count = count + 1;
            }
        }
        if (remaining == 0)
        {
            return count;
        }
        return -1;
    }
}
```

The tokens in every array on this page go from the smallest to the
largest. So the `for` loop starts at the last token and moves towards the
first: the largest token first. The `while` loop takes that token as many
times as it fits. What do you think greedy gives for 6?

```csharp exec
id: the-greedy-shortcut-1-program
int[] tokens = { 1, 3, 4 };
Console.WriteLine(Greedy.Fewest(6, tokens));
```

```predict
type: choice

What will it print?

- 2
  - Two 3s make 6.
- 3
  - The largest token that fits in 6 is a 4.
- -1
  - After it takes a 4, is anything left that no token fits?
```

It prints 3: a 4 and two 1s. But brute force and the cached way both
found 2: two 3s. Taking the largest token first was a reasonable choice.
But after that choice, greedy could never reach two 3s.

A way that always takes whatever looks best at this step, and never
changes a choice it has made, is called a *greedy* algorithm. It is a
*heuristic*: a simple rule that finds an answer quickly, without checking
that the answer is the best one.

Does greedy fail with real coins? Euro coins, in cent, are 1, 2, 5, 10, 20
and 50. The next cell compares greedy with the cached way for three
amounts, and then counts the amounts from 1 to 99 where the two differ.

```csharp exec
id: the-greedy-shortcut-2
int[] coins = { 1, 2, 5, 10, 20, 50 };   // euro coins, in cent
foreach (int amount in new int[] { 6, 41, 63 })
{
    int greedy = Greedy.Fewest(amount, coins);
    int cached = Cached.Fewest(amount, coins, new Dictionary<int, int>());
    Console.WriteLine($"{amount} cent: greedy {greedy}, cached {cached}");
}

int differ = 0;
for (int amount = 1; amount <= 99; amount++)
{
    if (Greedy.Fewest(amount, coins) != Cached.Fewest(amount, coins, new Dictionary<int, int>()))
    {
        differ = differ + 1;
    }
}
Console.WriteLine($"Amounts from 1 to 99 where they differ: {differ}");
```

For each of the three amounts, greedy and the cached way agree. The last
line is 0: they agree for every amount from 1 to 99. That is a property of
the euro's coins. It is not true of greedy in general. The tokens 1, 3 and
4 show that greedy can use more tokens than it needs, and nothing tells
you when it does.

### Your turn

With the tokens 1, 3 and 4, can you find more amounts where greedy and the
cached way differ?

1. Start from 6, where we know they differ, and try the amounts near it.
2. Can you find an amount where they differ by more than one token?
3. What do the amounts where they differ have in common?

```csharp exec
id: the-greedy-shortcut-3
int[] tokens = { 1, 3, 4 };
for (int amount = 1; amount <= 40; amount++)
{
    // Print the amount and both answers, when the two answers are different.
}
```

```hint
after: 2 runs
The cell above compares the two answers for one amount at a time. What
would the lines inside its `foreach` look like here, with `tokens` in
place of `coins`?
```

```hint
after: 3 runs
Find both answers, as the cell above does. Then an `if` with `!=` can
print a line only when they are different.
```

```solution
int[] tokens = { 1, 3, 4 };
for (int amount = 1; amount <= 40; amount++)
{
    int greedy = Greedy.Fewest(amount, tokens);
    int cached = Cached.Fewest(amount, tokens, new Dictionary<int, int>());
    if (greedy != cached)
    {
        Console.WriteLine($"{amount}: greedy {greedy}, cached {cached}");
    }
}
---
They differ at 6, 10, 14, 18 and so on, up to 38: every fourth amount,
from 6. At each one, greedy uses one token more than the cached way, never
two. These are the amounts that leave 2 after greedy has taken all the 4s
it can. For the last 6 of the amount, greedy uses a 4 and two 1s, where
two 3s would do.
```

With 1, 3 and 4, greedy is never more than one token away from the fewest.
Is that true of any tokens? Here are tokens of 1, 4 and 5, and the amount
8. How many tokens do you think greedy uses?

```csharp exec
id: when-the-shortcut-fails-1
int[] tokens = { 1, 4, 5 };
Console.WriteLine($"Greedy: {Greedy.Fewest(8, tokens)}");
Console.WriteLine($"Cached: {Cached.Fewest(8, tokens, new Dictionary<int, int>())}");
```

Greedy uses 4 tokens, and the cached way uses 2. Greedy takes the 5 first,
and 3 remains, which needs three 1s. The cached way finds two 4s. So the
difference can be more than one token.

Greedy can also give no answer where there is one. Here are tokens of 3
and 4, with no 1, and the amount 6.

```csharp exec
id: when-the-shortcut-fails-2
int[] tokens = { 3, 4 };
Console.WriteLine($"Greedy: {Greedy.Fewest(6, tokens)}");
Console.WriteLine($"Brute force: {BruteForce.Fewest(6, tokens)}");
```

```predict
type: choice

What will the first line print?

- Greedy: 2
  - Two 3s make 6.
- Greedy: 3
  - A 4 first, and then something for the 2 that remains.
- Greedy: -1
  - After a 4, 2 remains. Which token fits in 2?
```

The first line is `Greedy: -1`. Greedy takes a 4, and 2 remains. Neither
a 3 nor a 4 fits in 2, so greedy stops with an amount that remains, and
returns -1. But brute force finds 2 tokens: 3 + 3 makes 6.

So be careful what greedy's -1 means. When brute force gives -1, no tokens
make the amount. When greedy gives -1, it means only that greedy could not
continue.

## Choosing a strategy

Three ways solved the same problem. None of them is better than the others
in every way.

| Way | Speed | Always the fewest? |
|---|---|---|
| Brute force | slow, and much slower for bigger amounts | yes |
| Memoization (a cache) | fast | yes |
| Greedy | the fastest: one pass through the tokens, no waiting | no |

Brute force is the way to try first. It is slow, but it never misses the
fewest, and for a small enough amount, slow does not matter.

A cache keeps brute force's promise, and it removes its worst cost, because
it never does the same work twice. So it is usually the way to write once
brute force starts to feel too slow.

Greedy loses the promise. It is the fastest of the three. Its worst case is
not a slow answer, but an answer that uses more tokens than it needs, or no
answer at all. And it gives that answer with no sign that anything is
different.

Which one should a real program use? That depends on what the program must
do. A till that must always give change in the fewest coins, whatever
coins it holds, needs the promise that brute force or a cache gives. A program that gives a quick
suggestion, which a person checks, can often accept greedy's risk, for its
speed.

### Your turn

A vending machine gives change in euro coins after every sale, many times
a minute. Which of the three ways would you use? Why?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

Greedy. With euro coins, greedy and the cached way agreed for every amount
from 1 to 99, in the cell above, so here greedy loses nothing, and it is
the fastest. But that is true only because of the euro's coins. If the
machine ever had coins of other values, as the tokens 1, 3 and 4 show,
greedy could give more coins than it needs, and the cached way would be
the safe choice.

</details>

## Looking back

Brute force, a cache, or greedy: for a new problem, which would you write
first, and why? What would make you change to another?

The cache on this page remembers answers while one program runs. Each Run
starts a new program (rule 1), so the cache starts empty each time. Can
you think of a program that would want to remember its answers from one
day to the next?

A challenge: brute force starts from the amount and moves towards 0. You
can also go the other way, with a loop and no recursion. Start with the
answer for 0, then find the answer for 1, then 2, and so on. Each answer
uses answers that the loop has already found: for each token that fits,
the fewest for the amount without that token, plus one. Can you fill the
array `fewest`, so that `fewest[6]` is 2? Finding answers from the
smallest upward, and keeping each one in a table, is called *dynamic
programming*.

```csharp challenge
// The fewest tokens for every amount from 0 to 30, with a loop and no recursion.
// fewest[a] is the fewest tokens for the amount a, or -1 if no tokens make it.
int[] tokens = { 1, 3, 4 };
int[] fewest = new int[31];
fewest[0] = 0;
for (int amount = 1; amount <= 30; amount++)
{
    fewest[amount] = -1;
    // Your code: for each token that fits, look at fewest[amount - token].
}
Console.WriteLine(string.Join(" ", fewest));
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project, with the classes it uses from the cells
above, each in a file of its own, such as `Cached.cs`. It prints the same
there, apart from the times, which depend on the computer. This is an
extra page, so it has no practice page. The pages it uses,
[Recursion](lesson:a-function-that-calls-itself) and
[Dictionaries](lesson:looking-things-up-by-name), each have more to try.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Microsoft. *Stopwatch Class*.
<https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.stopwatch>.
Every method and value that a `Stopwatch` has, with an example program
that times a task. It is written for programmers who already know C#.

Cormen, T. H., Leiserson, C. E., Rivest, R. L. and Stein, C. (2022).
*Introduction to Algorithms* (4th ed.). MIT Press. Chapter 14 is about
dynamic programming, the general name for the cache and the table on this
page. Chapter 15 is about greedy algorithms, and when a greedy choice is
certain to find the best answer. It is a university textbook, and much
harder than this page.

Spanning Tree (2020). *How to Count Dice Rolls: An Introduction to Dynamic
Programming.* <https://www.youtube.com/watch?v=oifN-YVlrq8>. It counts the
ways that dice can add to a total. First it tries everything, then it
remembers answers in a table. These are the same two steps that this page
takes with tokens. The video is about nine minutes long.

SimonDev (2021). *What can "The Simpsons" teach us about Dynamic
Programming?* <https://www.youtube.com/watch?v=6z4ePR7YYa8>. It shows a
few problems that repeat the same work, and how remembering answers saves
it. The video is about fifteen minutes long.
