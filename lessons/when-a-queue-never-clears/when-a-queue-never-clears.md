---
title: "Simulating a queue: how busy is too busy?"
version: 2026.09.28.2
from: when-a-queue-never-clears
covers: [FOOP-LO6, FOOP-LO7, FOOP-LO8]
---

# Simulating a queue: how busy is too busy?

A café has one till, and people wait in a line in front of it. Here is
that line in C#. Three people join it, the till serves one of them, and
then one more person joins. Before you run it, who do you think is
served?

```csharp exec
id: a-line-at-the-counter-1
Queue<string> counter = new Queue<string>();
counter.Enqueue("Aoife");
counter.Enqueue("Brian");
counter.Enqueue("Chen");

string served = counter.Dequeue();
Console.WriteLine($"Served: {served}");

counter.Enqueue("Dara");
Console.WriteLine($"Next: {counter.Peek()}");
Console.WriteLine($"Waiting: {counter.Count}");
Console.WriteLine(string.Join(", ", counter));
```

```predict
type: choice

What will the first line print?

- Served: Aoife
  - The person who joined first is served first.
- Served: Chen
  - The person who joined last is served first. C# has a collection
    that works that way too: a *stack*, `Stack<T>`.
- Served: Dara
  - Dara is in the program too. Is she in the line when the till serves?
- It does not compile
  - The page has not written a class called `Queue`.
```

The first line is `Served: Aoife`. Aoife joined the line first, so she is
served first. The other lines are `Next: Brian`, `Waiting: 3` and
`Brian, Chen, Dara`.

`counter` is a *queue*: a collection in which the first value in is the
first value out, as in a line of people at a till. (A *collection* is a
value that holds many other values, as a list does.) Programmers call this
rule *first in, first out*. The type in the angle brackets is the type of
the values that the queue holds, so `Queue<string>` is a queue of strings,
as `List<int>` is a list of whole numbers.

A queue has fewer methods than a list, and each one says what it is for.

| Code | What it does |
|---|---|
| `counter.Enqueue("Dara")` | adds a value at the back of the queue |
| `counter.Dequeue()` | removes the value at the front, and returns it |
| `counter.Peek()` | returns the value at the front, and leaves it in the queue |
| `counter.Count` | the number of values in the queue |

A queue has no index: `counter[1]` does not compile. `foreach` and
`string.Join` read a queue from the front to the back, and that is how the
last line printed it.

![The queue after the program: three names in a dashed box, "Brian" at the front on the left, then "Chen", then "Dara" at the back. To the left of the queue is a box labelled Till, with an arrow from "Brian" to it, labelled Dequeue(): leaves from the front. On the far side, a fourth name, "Eve", has an arrow into the back of the queue, labelled Enqueue("Eve"): joins at the back.](a-queue-at-the-counter.svg)

`Queue<T>` is a class, as `List<T>` is. The `T` is the type of the values
it holds, which you choose when you make one. Both classes are part of
.NET's *class library*: the classes that come with C#, ready to use. They
are in the namespace `System.Collections.Generic`. (A *namespace* is a
group of types with a name of its own.) It is one of the namespaces that
every cell can use without a `using` line (see "The using
lines you do not see", on the page
[Namespaces and class libraries](lesson:namespaces-and-libraries)).

<details class="dl-why"><summary>Why not use a list?</summary>

A `List<string>` can do the same job. `Add` puts a value at the back, and
`RemoveAt(0)` takes the value at the front. A queue says what the code
means: someone who reads `Dequeue` knows at once that the first in is the
first out. It also prevents a slip, because a queue has no way to take a
value from the middle. And it is faster when the line is long. When a list
removes its first value, it moves every other value one place forward. A
queue does not need to.

</details>

What happens if the till tries to serve when nobody is waiting? The next
cell is meant to stop with an exception, so you have not broken anything.
Run it, and read the message.

```csharp exec
id: a-line-at-the-counter-2
expect: exception
Queue<string> counter = new Queue<string>();
counter.Enqueue("Aoife");
Console.WriteLine($"Served: {counter.Dequeue()}");
Console.WriteLine($"Served: {counter.Dequeue()}");
```

It prints `Served: Aoife`, and then it stops with an exception on line 4:
`System.InvalidOperationException: Queue empty.` An
`InvalidOperationException` means that an object was asked to do
something that it cannot do in the state it is in. An empty queue has no
front, so it has no value to give. Code that takes values from a queue
checks `Count` first. The till later on this page does.

This page is an extra. It uses the classes and objects of
[Classes and objects](lesson:objects-and-classes), and the random numbers
with a seed from [Random numbers](lesson:leaving-it-to-chance), and it
adds `Queue<T>`.

## Arrivals you cannot predict, one at a time

A till in a café, a check-in desk at an airport, and a web server's list
of waiting requests all work in the same way:

1. People (or requests) arrive at moments that nobody can predict.
2. Something serves them, at a fixed rate.
3. A queue grows between the two.

The people in the queue care about one thing: how long they wait. On the
rest of this page, we *simulate* a queue. A *simulation* is a program that
copies something from the world, step by step, so that we can study it. We
time every wait, and we measure how the wait changes as the till gets
busier. The answer surprised the engineers who first measured it, and it
still surprises people who plan shops, hospitals and computer systems.

We divide time into *steps*. A step could be one minute in the café. In
each step, we check twice whether someone new has arrived, as if we tossed a
coin twice. Each check says yes with the same chance. So each step brings
0, 1 or 2 new arrivals.

The class `Arrivals` does this. `Chance` is the chance that one check says
yes, as a number from 0 to 1: 0.3 means 30%. `Generator` is the object's
own random number generator, made with a seed. As on the page Random
numbers, the seed makes the numbers the same on every run, so that this
page can say what they are. `Generator.NextDouble()` gives a number from 0
up to 1, and a number like that is below 0.3 in about 30% of checks.

```csharp exec
id: arrivals-you-cannot-predict-one-at-a-time-1
file: Arrivals.cs
class Arrivals
{
    public double Chance;
    public Random Generator;

    public Arrivals(double chance, int seed)
    {
        Chance = chance;
        Generator = new Random(seed);
    }

    // Two checks in each step, so a step brings 0, 1 or 2 new arrivals.
    public int ThisStep()
    {
        int count = 0;
        for (int check = 0; check < 2; check++)
        {
            if (Generator.NextDouble() < Chance)
            {
                count = count + 1;
            }
        }
        return count;
    }
}
```

The program below makes `door`, an `Arrivals` object, and asks it for the
arrivals in ten steps. Then it asks for 20,000 more steps, and prints
their average.

```csharp exec
id: arrivals-you-cannot-predict-one-at-a-time-1-program
Arrivals door = new Arrivals(0.3, 1);
int[] firstTen = new int[10];
for (int step = 0; step < firstTen.Length; step++)
{
    firstTen[step] = door.ThisStep();
}
Console.WriteLine(string.Join(", ", firstTen));

int total = 0;
for (int step = 0; step < 20000; step++)
{
    total = total + door.ThisStep();
}
Console.WriteLine($"Average over 20,000 more steps: {(double)total / 20000:F2}");
Console.WriteLine($"Twice the chance: {2 * door.Chance:F2}");
```

The first line shows the arrivals in ten steps: `2, 0, 0, 0, 1, 2, 0, 0, 1, 0`. The
second is the average number of arrivals in a step, over 20,000 more
steps: `0.61`. The third line is twice the chance, `0.60`. Two checks, each
with a chance of 0.3, bring 0.6 arrivals a step on average, and the long
run comes very close to it. That number decides everything that follows.

Now something must serve the people who arrive. On this page it is a
*till*. (Books about queues call it the *server*.) The till's *capacity*
is the most customers it can serve in one step, however many are
waiting.

## Timing every wait

To time a wait, we need to know when each customer arrived. So a
`Customer` object remembers the step at which it arrived, in its field
`ArrivedAt`. When the till serves a customer, the wait is the step now,
minus the step of arrival, and the method `WaitUntil` does that
subtraction. A customer who is served in the step of their arrival waited
0 steps.

```csharp exec
id: timing-every-wait-1
file: Customer.cs
class Customer
{
    public int ArrivedAt;

    public Customer(int arrivedAt)
    {
        ArrivedAt = arrivedAt;
    }

    public int WaitUntil(int step)
    {
        return step - ArrivedAt;
    }
}
```

The till holds a `Queue<Customer>`: a queue of customer objects, not of
names. A queue can hold values of any type, as a list can. The till's
`Serve` method takes customers from the front, as many as its `Capacity`
allows, but never more than are waiting. It keeps each customer's wait in
the list `Waits`. `AverageWait` and `LongestWait` answer two questions
about that list.

```csharp exec
id: timing-every-wait-2
file: Till.cs
class Till
{
    public int Capacity;
    public Queue<Customer> Waiting;
    public List<int> Waits;

    public Till(int capacity)
    {
        Capacity = capacity;
        Waiting = new Queue<Customer>();
        Waits = new List<int>();
    }

    public void Arrive(Customer customer)
    {
        Waiting.Enqueue(customer);
    }

    public void Serve(int step)
    {
        int served = 0;
        while (served < Capacity && Waiting.Count > 0)
        {
            Customer customer = Waiting.Dequeue();
            Waits.Add(customer.WaitUntil(step));
            served = served + 1;
        }
    }

    public double AverageWait()
    {
        int total = 0;
        foreach (int wait in Waits)
        {
            total = total + wait;
        }
        return (double)total / Waits.Count;
    }

    public int LongestWait()
    {
        int longest = 0;
        foreach (int wait in Waits)
        {
            longest = Math.Max(longest, wait);
        }
        return longest;
    }
}
```

Each class describes one thing from the café: it keeps the data that
matters about that thing, and does its job. `Arrivals` is the door,
`Customer` is one person in the line, and `Till` is the till with its
line. The program below puts the three together. For each of 200 steps, it
asks `door` how many people arrive, makes a `Customer` for each of them
with the number of the step, and then lets the till serve.

```csharp exec
id: timing-every-wait-2-program
Arrivals door = new Arrivals(0.3, 1);
Till till = new Till(1);
for (int step = 0; step < 200; step++)
{
    int arrivals = door.ThisStep();
    for (int i = 0; i < arrivals; i++)
    {
        till.Arrive(new Customer(step));
    }
    till.Serve(step);
}
Console.WriteLine($"Served: {till.Waits.Count}");
Console.WriteLine($"Average wait: {till.AverageWait():F2} steps");
Console.WriteLine($"Longest wait: {till.LongestWait()} steps");
```

It served 132 customers. The average wait was 0.49 steps, and the longest
wait was 3 steps: no customer waited longer than that.

Can you change `0.3` to `0.45` in the first line, and run the cell again?
What happens to the average wait? And to the longest?

<details class="dl-answer"><summary>What each line of <code>Serve</code> does</summary>

1. `int served = 0;` counts the customers served in this step.
2. `while (served < Capacity && Waiting.Count > 0)` repeats while the till
   has room for one more in this step, and someone is waiting. Without
   `Waiting.Count > 0`, the program would stop with the exception from
   the top of this page as soon as the queue was empty.
3. `Waiting.Dequeue()` removes the customer at the front, the one who has
   waited longest.
4. `customer.WaitUntil(step)` is that customer's wait: the step now, minus
   the step they arrived at.
5. `Waits.Add(...)` keeps the wait, so that `AverageWait` and
   `LongestWait` can use it later.

</details>

With a chance of 0.3, 0.6 customers arrive in a step on average, and the
till can serve 1. So it is busy 60% of the time, and has nothing to do
the rest of the time. The share of its capacity that the till uses is
called its *utilisation*:

$$\text{utilisation} = \frac{\text{average arrivals in a step}}{\text{capacity}} = \frac{2 \times \text{chance}}{\text{capacity}}$$

### The whole simulation in one class

Most experiments on the rest of this page run the same loop, with other
numbers. Variables stay in their cell (rule 3), so the cells below cannot
use a loop written in a program cell. They can use a class (rule 2). So
we put the loop in a class of its own, `Simulation`. Its
constructor takes three numbers: the chance at each check, the till's
capacity, and the seed. A simulation has two objects in its fields: the
`Arrivals` that it uses as its door, and its `Till`. An object that holds
other objects is the subject of the page
[Composition](lesson:objects-inside-objects).

```csharp exec
id: the-whole-simulation-in-one-class-1
file: Simulation.cs
class Simulation
{
    public Arrivals Door;
    public Till Till;

    public Simulation(double arrivalChance, int capacity, int seed)
    {
        Door = new Arrivals(arrivalChance, seed);
        Till = new Till(capacity);
    }

    public void Run(int steps)
    {
        for (int step = 0; step < steps; step++)
        {
            int arrivals = Door.ThisStep();
            for (int i = 0; i < arrivals; i++)
            {
                Till.Arrive(new Customer(step));
            }
            Till.Serve(step);
        }
    }
}
```

The field `Till` has the same name as its class. C# allows that, and it
can tell from the place which one you mean. In `public Till Till;` the
first `Till` is the type, and the second is the field's name. So
`shop.Till.AverageWait()` means *the till of the simulation `shop`, and
its average wait*.

This is how a larger program is made: from small parts that each do one
job. `Simulation` does not know how a till serves, and `Till` does not
know where its customers come from. The experiment with groups of
customers, further down this page, uses that.

## The hockey stick

The next cell runs two simulations of 200,000 steps each. The first is
the till from above, 60% busy. The second is a till that is 90% busy, one
and a half times as busy. `:F1` shows each average wait with one digit
after the point.

```csharp exec
id: the-hockey-stick-1
Simulation quiet = new Simulation(0.3, 1, 1);
quiet.Run(200000);
Console.WriteLine($"{quiet.Till.AverageWait():F1}");

Simulation busy = new Simulation(0.45, 1, 1);
busy.Run(200000);
Console.WriteLine($"{busy.Till.AverageWait():F1}");
```

```predict
type: number
tolerance: 0.5

What will the second line print?
```

The first line is `0.4`, and the second is `2.3`. The till is one and a
half times as busy, and the wait is more than five times as long. What
happens between those two? The next cell tries ten levels of utilisation,
from half busy to 98% busy, and prints a table: the utilisation, the
average wait, and a column called `formula`, which the text after the
table explains. Each `#` is half a step of waiting, so the bar shows the
wait as a length. In `{simulated,10:F2}`, the `,10` gives the number ten
places, so that the columns line up.

```csharp exec
id: the-hockey-stick-2
double[] levels = { 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.93, 0.95, 0.97, 0.98 };
Console.WriteLine("busy  simulated  formula");
foreach (double utilisation in levels)
{
    Simulation shop = new Simulation(utilisation / 2, 1, 1);
    shop.Run(200000);
    double simulated = shop.Till.AverageWait();
    double formula = utilisation / (4 * (1 - utilisation));
    string bar = new string('#', (int)Math.Round(simulated * 2));
    Console.WriteLine($"{utilisation:F2} {simulated,10:F2} {formula,8:F2}  {bar}");
}
```

From half busy to 80% busy, the average wait grows from 0.25 steps to
1.01 steps. From 90% to 98%, it grows from 2.30 steps to 15.58. The bars
are almost the same length at first, and then they grow fast. If we drew
the waits as a graph, the line would be nearly flat, and then rise
steeply, like a hockey stick: a short flat blade, and then a long handle
that rises. People who plan queues call it that: the *hockey stick*.

Why does it rise so steeply? Think about the time when the till has
nothing to do. At half busy, it is free in one step out of two. When
several people arrive close together, the till soon serves them. At 98%
busy, it is free in only one step out of fifty. Several people still
arrive close together sometimes, but the till has almost no free time in
which to serve the extra people, so they stay in the queue.

For this model, a longer calculation than this page has room for gives
the average wait exactly: $\dfrac{u}{4(1 - u)}$ steps, where $u$ is the
utilisation. That is the `formula` column. The $1 - u$ underneath is the
share of the time when the till is free. As it gets close to 0, the wait
grows without limit. The simulated waits are close to the formula, and
furthest from it at 97% and 98%: 8.59 and 15.58 steps, where the formula
gives 8.08 and 12.25. Close to full, a run must be very long before its
average settles.

That is why a supermarket opens another till before every till is busy,
and why engineers call a web server that is 95% busy nearly full.

## Past full: a queue that never clears

What happens at 100% busy, or more? With a chance of 0.6 at each check,
more customers arrive in a step, on average, than the till can serve. The next cell
runs for 2,000 steps, and prints the wait of every 200th customer, with a
bar in which each `#` is 10 steps. Its last line counts the customers
still in the queue when the run stops.

```csharp exec
id: past-full-a-queue-that-never-clears-1
Simulation shop = new Simulation(0.6, 1, 1);
shop.Run(2000);
List<int> waits = shop.Till.Waits;
for (int i = 199; i < waits.Count; i = i + 200)
{
    string bar = new string('#', waits[i] / 10);
    Console.WriteLine($"customer {i + 1,4}: waited {waits[i],3} steps  {bar}");
}
Console.WriteLine($"Still waiting at the end: {shop.Till.Waiting.Count}");
```

Customer 200 waited 43 steps, customer 1000 waited 155, and customer
1800 waited 277. When the run stopped, 370 customers were still waiting.
Each customer waits longer, on average, than the one before, and the
queue behind them keeps growing. A queue like this is called *unstable*.
It has no typical wait, because the longer it runs, the longer the wait
gets. Can you change `2000` to `4000`? What happens to the last lines?

So one number decides whether a queue ever *clears*, or becomes empty
again: the utilisation.

- If the utilisation is *below* 1, the queue returns to empty again and
  again, and its average wait settles. It is *stable*.
- If the utilisation is *1 or more*, the queue is unstable.

The hockey stick adds something that the rule does not say. A stable
queue can still have a very long wait, if its utilisation is close to 1.

## Is this a good model of a real queue?

A *model* is a simplified copy of something real, made to answer a
question. Making one means choosing what to keep and what to drop. Our
model keeps one thing, the balance between arrivals and capacity, and it
drops a great deal. Here is one thing it drops. In our model,
people arrive at most two in a step, and each one alone. In a real café,
a family of four arrives together.

The next cell changes only that. It does not use `Arrivals`. People now
arrive in groups, of 2, of 4 and then of 8, and the chance of a group is
chosen so that the till is still 90% busy. The cell uses the same `Till`
and `Customer` classes as before: the till does not need to know how its
customers came.

```csharp exec
id: is-this-a-good-model-of-a-real-queue-1
int[] groupSizes = { 2, 4, 8 };
foreach (int groupSize in groupSizes)
{
    Random generator = new Random(1);
    Till till = new Till(1);
    double groupChance = 0.9 / groupSize;    // keeps the till 90% busy
    for (int step = 0; step < 200000; step++)
    {
        if (generator.NextDouble() < groupChance)
        {
            for (int i = 0; i < groupSize; i++)
            {
                till.Arrive(new Customer(step));
            }
        }
        till.Serve(step);
    }
    Console.WriteLine($"groups of {groupSize}: average wait {till.AverageWait():F2} steps");
}
```

Every one of these tills is 90% busy, like the one that gave 2.3 steps in
*The hockey stick*. With groups of 2, the average wait is 5.22 steps. With
groups of 4, it is 16.03 steps, and with groups of 8, 42.18 steps. The
average number of arrivals is the same each time. The way that they
arrive is different. So a model can match the average number of arrivals
exactly, and still be far from the real wait.

Here are some more things that the model drops:

- Every customer takes exactly one step to serve. A real barista is
  quicker with some orders than with others.
- Nobody leaves. At a real clinic, some people see a long queue and go
  home.
- Arrivals do not depend on the time of day. A real café is busiest at
  lunchtime.
- The till never stops. A real one closes for a break.

Choose two. Would each one make the real wait longer than the model says,
or shorter? A model is only as useful as the question it is used for.
This one is useful for "How does the wait change as the till gets busier?"
It is not useful for "Exactly how long will I wait at the café on
Monday?"

## Your turn

At an airport, one check-in desk serves one passenger in a step. In the
morning *rush*, the busiest time of the day, passengers arrive with a
chance of 0.47 at each check. How long do they wait? What if a second desk
opens?

Can you write the method `MeanWait`? It makes a `Simulation` from its
three parameters, runs it for 20,000 steps, and returns the average wait.
`static` in front of it means, as in the program cells of earlier pages,
that it uses only its parameters and what it makes itself. At the moment
it returns 0, so the program runs and prints 0.00 twice. **Compare with a
solution** tries your method with four sets of numbers.

```csharp exec
id: your-turn-1
static double MeanWait(double arrivalChance, int capacity, int seed)
{
    // Run a Simulation for 20,000 steps, and return its average wait.
    return 0;
}

Console.WriteLine($"One desk:  {MeanWait(0.47, 1, 1):F2} steps");
Console.WriteLine($"Two desks: {MeanWait(0.47, 2, 1):F2} steps");
```

```inputs
Math.Round(MeanWait(0.47, 1, 1), 2)
Math.Round(MeanWait(0.47, 2, 1), 2)    // a second desk opens
Math.Round(MeanWait(0.3, 1, 1), 2)     // after the rush
Math.Round(MeanWait(0.47, 1, 2), 2)    // the same desk, another seed
```

```hint
after: 2 runs
Which class on this page runs a whole simulation? What does it need to be
given when it is made, and which of its methods runs it?
```

```hint
after: 3 runs
title: three lines
Make a `Simulation` with the three parameters, call `Run(20000)` on it,
and return the average wait of its `Till`.
```

```solution
static double MeanWait(double arrivalChance, int capacity, int seed)
{
    Simulation desk = new Simulation(arrivalChance, capacity, seed);
    desk.Run(20000);
    return desk.Till.AverageWait();
}

Console.WriteLine($"One desk:  {MeanWait(0.47, 1, 1):F2} steps");
Console.WriteLine($"Two desks: {MeanWait(0.47, 2, 1):F2} steps");
Console.WriteLine($"After the rush: {MeanWait(0.3, 1, 1):F2} steps");
Console.WriteLine($"Another seed: {MeanWait(0.47, 1, 2):F2} steps");
---
With one desk, which is nearly full, a passenger waits 4.79 steps on
average. With two desks, the wait is 0.00. No real airport is like that,
and the model says why: at most two passengers arrive in a step, and two
desks serve two. A real morning brings a coach full of passengers at once,
and the cell with groups showed what that does to the wait. After the
rush, with a chance of 0.3, one desk is enough: 0.39 steps.

With seed 2, the same desk gives 3.66 steps, not 4.79. A queue this close
to full takes a long time to settle, so one run of 20,000 steps tells you
less than you might think.
```

## Lab bench

Every number that the simulation uses is named at the top of the next
cell. What happens when you change one of them, and run the cell again?

```csharp exec
id: lab-bench-1
int steps = 5000;             // how long the run lasts
double arrivalChance = 0.45;  // the chance of an arrival, at each of the two checks
int capacity = 1;             // the most customers the till serves in one step
int seed = 1;                 // change it for another run

Simulation shop = new Simulation(arrivalChance, capacity, seed);
shop.Run(steps);
Console.WriteLine($"Utilisation:   {2 * arrivalChance / capacity:F2}");
Console.WriteLine($"Served:        {shop.Till.Waits.Count}");
Console.WriteLine($"Average wait:  {shop.Till.AverageWait():F2} steps");
Console.WriteLine($"Longest wait:  {shop.Till.LongestWait()} steps");
Console.WriteLine($"Still waiting: {shop.Till.Waiting.Count}");
```

Choose one of these questions, or ask one of your own:

1. How far apart are the average waits from five different seeds, with
   the same settings? Does a longer run bring them closer together?
2. At what utilisation does the longest wait first pass 20 steps?
3. Set `capacity` to 2 and `arrivalChance` to 0.9. The till is 90% busy,
   but nobody waits. Why? What does that tell you about the model?
4. The utilisation is exactly 1 when `arrivalChance` is 0.5. Is that
   queue stable? Run it for 1,000 steps, then for 10,000, and compare the
   number still waiting.

## Looking back

The page made four classes, and each one is small. `Customer` remembers
when it arrived. `Till` serves a queue. `Arrivals` decides how many come.
`Simulation` puts them together. When we wanted groups in place of single
arrivals, we replaced one part, `Arrivals`, and kept `Till` and
`Customer` as they were. Which class would you
change to give each customer a different time to serve? Which class would
you change to let people leave when the queue is long?

A challenge: in the program below, the till is 98% busy, and everyone
joins the line, however long it is. Real people do not. Can you change
`Arrive` so that a customer who finds 5 or more people waiting leaves at
once, and give the till a field that counts the people who leave? What
happens to the average wait? Is a shorter wait better news for the café,
or worse? The challenge has its own, shorter copies of `Customer` and
`Till`, because it opens in a new notebook, with no cells above it.

```csharp challenge
// Everyone joins the line. What if some people leave when it is long?
Till till = new Till(1);
Random generator = new Random(1);
for (int step = 0; step < 20000; step++)
{
    for (int check = 0; check < 2; check++)
    {
        if (generator.NextDouble() < 0.49)
        {
            till.Arrive(new Customer(step));
        }
    }
    till.Serve(step);
}
Console.WriteLine($"Served: {till.Waits.Count}");
Console.WriteLine($"Average wait: {till.AverageWait():F2} steps");

class Customer
{
    public int ArrivedAt;

    public Customer(int arrivedAt)
    {
        ArrivedAt = arrivedAt;
    }
}

class Till
{
    public int Capacity;
    public Queue<Customer> Waiting;
    public List<int> Waits;

    public Till(int capacity)
    {
        Capacity = capacity;
        Waiting = new Queue<Customer>();
        Waits = new List<int>();
    }

    // Everyone joins the line, however long it is.
    public void Arrive(Customer customer)
    {
        Waiting.Enqueue(customer);
    }

    public void Serve(int step)
    {
        int served = 0;
        while (served < Capacity && Waiting.Count > 0)
        {
            Customer customer = Waiting.Dequeue();
            Waits.Add(step - customer.ArrivedAt);
            served = served + 1;
        }
    }

    public double AverageWait()
    {
        int total = 0;
        foreach (int wait in Waits)
        {
            total = total + wait;
        }
        return (double)total / Waits.Count;
    }
}
```

Everything on this page runs here, and nothing in it needs Visual Studio.
Any program cell can be downloaded as a Visual Studio project, and it
prints the same there.

There is no practice page for this extra. Another FOOP extra, *The
perceptron*, is also a program made from a class whose fields change as it
runs.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Microsoft. *Queue&lt;T&gt; Class*.
<https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1>.
The reference for `Queue<T>`: every method it has, with an example.
`Stack<T>`, its partner, works the other way: the last value in is the
first value out.

engineerguy (2010). *Why the other line is likely to move faster.*
<https://www.youtube.com/watch?v=F5Ri_HhziI0>. Bill Hammack explains
queueing theory, the mathematics of queues. It started with telephone
calls in Copenhagen. He also shows how a shop can arrange its lines so
that people wait less. The video is four minutes long.

Harchol-Balter, M. (2013). *Performance Modeling and Design of Computer
Systems: Queueing Theory in Action*. Cambridge University Press. This
textbook is about computing. Its early chapters explain why a server close
to full capacity makes everyone wait, for the kinds of request queues that
this page started with.
