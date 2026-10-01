---
title: "Monte Carlo: estimating π with random darts"
version: 2026.10.01.1
from: counting-darts
covers: [PDP-LO2]
---

# Monte Carlo: estimating π with random darts

This program throws 10,000 darts at random, and counts how many of them
hit something. Run it. The last line is close to a number that you have
met in maths. Which number is it?

```csharp exec
id: darts-at-a-square-1
Random random = new Random(0);
int darts = 10000;
int hits = 0;
for (int i = 0; i < darts; i++)
{
    double x = random.NextDouble();
    double y = random.NextDouble();
    if (x * x + y * y <= 1)
    {
        hits++;
    }
}
Console.WriteLine($"{hits} of {darts} darts hit");
Console.WriteLine(4.0 * hits / darts);
```

It prints `7895 of 10000 darts hit`, and then 3.158. That is close to π,
the number that starts 3.14: the distance around any circle, divided by
the distance across it. Nothing in the cell knows the value of π. It makes
random numbers, tests each pair of them, and counts. This page explains
why the answer comes so close to π, and how close it can come.

This is an extra page, so you can do it whenever you have time. It uses
the loops from [Loops](lesson:repeating-yourself), methods from
[Methods](lesson:writing-your-own-functions), and the random number
generator and its seed from [Random numbers](lesson:leaving-it-to-chance).
As on that page, the seed makes every Run throw the same darts, so this
page can say what each cell prints.

The way this program finds π has a name. The *Monte Carlo method* answers
a question by making many random cases, and counting how many of them meet
a condition. It is named after the casino in Monte Carlo, where people
play games that depend on chance. A *simulation* is a program that copies
something from the world, so that we can study it. A program that uses the
Monte Carlo method is a *Monte Carlo simulation*.

## A question you can answer by throwing things

Think of a square, with sides of length 1. Inside it, draw a quarter of a
circle. Its centre is the bottom-left corner of the square, and its
*radius*, the distance from the centre to the curve, is 1.

![A square with sides of length 1. A quarter of a circle of radius 1 fills the part nearest the bottom-left corner, which is the point (0, 0). The point (0.2, 0.3) is inside the curve, and the point (0.9, 0.9) is outside it, in the top-right corner of the square.](quarter-circle.svg)

The square's area is $1 \times 1 = 1$. A circle's area is $\pi$ times its
radius times its radius, so a whole circle of radius 1 has an area of
$\pi$, and the quarter circle has an area of $\pi / 4$.

Now throw darts at the square, at random, so that every point of the
square is as likely to be hit as every other. What share of the darts
lands inside the curve? It should be the quarter circle's share of the
square:

$$\frac{\text{area of the quarter circle}}{\text{area of the square}} = \frac{\pi/4}{1} = \frac{\pi}{4}$$

We can use this in the other direction. Count the share of darts that
lands inside, and multiply it by 4. That gives an *estimate* of π: a
number that is close to the true value, but not exactly equal to it. We
never measure a circle, and we do not need to know π at the start.

We need only one thing: a test that says whether a point is inside the
curve. A point $(x, y)$ is inside a circle of radius 1, with its centre at
$(0, 0)$, when $x^2 + y^2 \le 1$. This is Pythagoras' theorem: $x^2 + y^2$
is the square of the point's distance from the centre. It is the only
geometry that the method uses.

```csharp exec
id: a-question-you-can-answer-by-throwing-things-1
static bool InsideCircle(double x, double y)
{
    return x * x + y * y <= 1;
}

Console.WriteLine(InsideCircle(0.2, 0.3));    // near the corner
Console.WriteLine(InsideCircle(0.9, 0.9));    // past the curve
```

The cell prints `True` for $(0.2, 0.3)$, near the corner, and `False` for
$(0.9, 0.9)$, past the curve. `InsideCircle` has no square root in it.
When the square of the distance is at most 1, the distance is at most 1
too.

Where does the point $(0.6, 0.8)$ fall? Can you calculate $0.6^2 +
0.8^2$ on paper first? Then run the cell. Each Run starts a new program,
so this cell has its own copy of `InsideCircle`.

```csharp exec
id: a-question-you-can-answer-by-throwing-things-2
static bool InsideCircle(double x, double y)
{
    return x * x + y * y <= 1;
}

Console.WriteLine(0.6 * 0.6 + 0.8 * 0.8);
Console.WriteLine(InsideCircle(0.6, 0.8));
```

```predict
type: choice

What will the second line print?

- True
  - The test is `<=`: "at most 1".
- False
  - On [Dividing](lesson:dividing-in-csharp), `0.1 * 3` was not exactly
    `0.3`. Could that happen here?
- Nothing: it does not compile
```

The first line is `1`, and the second is `True`. The point is exactly on
the curve, and the test says "at most 1", so a point on the curve counts
as inside. What would the second line print with `<` in place of `<=`?
Can you change it and see?

A dart that lands exactly on the curve is very rare, so `<` or `<=` makes
almost no difference to the darts. But a test that has to decide about the
edge should decide on purpose.

## Where the darts land

The next cell draws the square as 20 lines of 40 characters, and throws
1,500 darts at it. A dart inside the curve leaves a `#`, and a dart outside
it leaves a `.`. Run it. Can you see the curve?

```csharp exec
id: where-the-darts-land-1
Random random = new Random(0);
char[][] wall = new char[20][];    // 20 lines of 40 characters
for (int row = 0; row < 20; row++)
{
    wall[row] = new string(' ', 40).ToCharArray();
}
for (int dart = 0; dart < 1500; dart++)
{
    double x = random.NextDouble();
    double y = random.NextDouble();
    int row = 19 - (int)(y * 20);    // y = 0 is the bottom line
    int column = (int)(x * 40);
    if (x * x + y * y <= 1)
    {
        wall[row][column] = '#';
    }
    else
    {
        wall[row][column] = '.';
    }
}
foreach (char[] line in wall)
{
    Console.WriteLine(new string(line));
}
```

The `#` characters fill most of the square, and the `.` characters fill
the top-right corner. The edge between them is the curve. The spaces are
places that no dart hit.

The picture is 40 characters wide and only 20 lines high, because a
character on the screen is about twice as tall as it is wide. So the
square looks square. Here is how the cell makes it:

- `wall` is an array of arrays, a jagged array, as on
  [Grids and references](lesson:grids-and-references). It holds one array
  of characters for each line.
- `new string(' ', 40)` is a string of 40 spaces, and `ToCharArray()`
  makes an array of its characters. So each line of `wall` starts empty.
- `y * 20` is a number from 0 up to 20, but never 20. `(int)` drops the
  part after the point, so `(int)(y * 20)` is a whole number from 0 to 19.
  On a graph, $y = 0$ is at the bottom, but the console prints the first
  line at the top. So `19 -` reverses the order of the lines.
- `new string(line)` makes a string from a line's characters, so that
  `Console.WriteLine` can print it.

## One dart at a time

Here is the program from the top of the page as a method, `EstimatePi`.
It takes the number of darts and a seed, and it makes its own generator
from the seed. So every call with the same two numbers throws the same
darts, whatever ran before it. The test from `InsideCircle` is written
inside the loop, so the cell needs no other method.

This cell has a surprise in it. Someone wrote the last line of the method
as `return 4 * hits / darts;`.

```csharp exec
id: one-dart-at-a-time-1
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4 * hits / darts;
}

Console.WriteLine(EstimatePi(1000, 0));
```

```predict
type: choice

What will the cell print?

- A number with decimals, close to 3.14
  - The method's return type is `double`, so it returns a `double`.
- 3
  - `4`, `hits` and `darts` are all whole numbers.
- Nothing: it does not compile
  - Can a method whose return type is `double` return a calculation made
    with `int`s?
```

```hint
after: guess differed
What type are `4`, `hits` and `darts`? What does `/` do with two whole
numbers, as on [Dividing](lesson:dividing-in-csharp)? Can you change one
character so that the division keeps its decimal part?
```

```solution
title: the division that keeps its decimal part
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

Console.WriteLine(EstimatePi(1000, 0));
---
With `4.0`, the calculation is made with `double`s, and it keeps its
decimal part: 1,000 darts give 3.216.
```

It prints `3`. It ran, and 3 even looks like a possible answer for π. But
`4`, `hits` and `darts` are all `int`s, so `/` is whole-number division,
and it drops the part after the point. The method's return type is
`double`, so C# makes the 3 a `double` when the method returns it, but by
then the decimal part is gone. Can you change one character to keep it?
The solution under the cell writes `4.0`, and prints 3.216.

A mistake like this does not stop the program, and C# does not warn about
it. The answer 3 is still near π, so nothing about it looks strange. So it
is worth having a test: a call whose answer you already know. Here,
`EstimatePi(10000, 0)` throws the same darts as the program at the top of
the page, so it should give 3.158 too.

### Your turn

What happens with more darts? Can you try 10,000, and then 100,000? How
close does each one come to π? `Math.PI` is C#'s own value of π, to as
many decimal places as a `double` holds. `Math.Abs(number)` gives the
number without its minus sign. So `Math.Abs(estimate - Math.PI)` is how
far `estimate` is from π, above or below it.

Each Run starts a new program, so this cell has its own copy of
`EstimatePi`, and so does each cell below it that uses the method.

```csharp exec
id: one-dart-at-a-time-2
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

double estimate = EstimatePi(1000, 0);
Console.WriteLine($"{estimate}, off by {Math.Abs(estimate - Math.PI):F5}");
```

```hint
after: 2 runs
Can you call `EstimatePi` three times, with a different number of darts
each time? A `foreach` loop over an array such as
`{ 1000, 10000, 100000 }` is one way.
```

```solution
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

int[] counts = { 1000, 10000, 100000 };
foreach (int darts in counts)
{
    double estimate = EstimatePi(darts, 0);
    Console.WriteLine($"{darts} darts: {estimate}, off by {Math.Abs(estimate - Math.PI):F5}");
}
---
1,000 darts give 3.216, off by 0.07441. 10,000 darts give 3.158, the
number from the top of the page, off by 0.01641. 100,000 darts give
3.14764, off by 0.00605. Each estimate is closer than the one before, but
each one needed ten times the darts.
```

## Watching it settle

Three numbers say that the answer improves. They do not show *how* it
improves, and that is the most important thing on this page.

A *running estimate* is the estimate of π that we would have if we stopped
after the dart just thrown. This cell counts the hits as it goes, and
prints the running estimate after 10 darts, then after 20, 40, 80, and so
on, with twice the darts on each line. The last column is the estimate
minus π, so a minus sign means that the estimate is below π.

`{dart,5}` makes the number take 5 characters, with spaces in front of it,
so that the columns line up. `{estimate - Math.PI,7:F4}` takes 7
characters, and `:F4` shows four decimal places, as `:F2` showed two on
[Variables and types](lesson:storing-and-computing).

Before you run it, what do you think the last column will do, from the top
line to the bottom one?

```csharp exec
id: watching-it-settle-1
Random random = new Random(0);
int hits = 0;
int nextLine = 10;
for (int dart = 1; dart <= 10240; dart++)
{
    double x = random.NextDouble();
    double y = random.NextDouble();
    if (x * x + y * y <= 1)
    {
        hits++;
    }
    if (dart == nextLine)
    {
        double estimate = 4.0 * hits / dart;
        Console.WriteLine($"{dart,5} darts: {estimate:F4}  {estimate - Math.PI,7:F4}");
        nextLine = nextLine * 2;    // each line has twice the darts of the line above
    }
}
```

That table holds the main idea of this page. Here are three things to see
in it.

**It moves a long way at the start.** After 10 darts, and after 20, the
estimate is 2.4000, and the last column is -0.7416. After 40 darts it is
2.6000. When there are only a
few darts, each one is a large part of the total, so one dart moves the
estimate a long way. Each new dart is a smaller part of the total than the
one before, so it moves the estimate less.

**It never stops moving.** On the last line, after 10,240 darts, it is
3.1598, still 0.0182 above π. It does not arrive at π and stay there. With
more darts, it still moves, but it stays closer to π.

**It does not come from one direction.** The estimate is below π for the
first six lines, and above π from 640 darts on. Whether it is above or
below π when you stop is decided by luck.

### Your turn

What does the same table look like with another seed? This cell is the
same program with the seed 1. Can you run it, and put its table beside the
one above? Then try a seed of your own.

What stays the same from one seed to the next? What changes?

```csharp exec
id: watching-it-settle-2
Random random = new Random(1);
int hits = 0;
int nextLine = 10;
for (int dart = 1; dart <= 10240; dart++)
{
    double x = random.NextDouble();
    double y = random.NextDouble();
    if (x * x + y * y <= 1)
    {
        hits++;
    }
    if (dart == nextLine)
    {
        double estimate = 4.0 * hits / dart;
        Console.WriteLine($"{dart,5} darts: {estimate:F4}  {estimate - Math.PI,7:F4}");
        nextLine = nextLine * 2;    // each line has twice the darts of the line above
    }
}
```

```hint
after: 2 runs
How far from 0 are the numbers in the last column, near the top of each
table? How far from 0 are they near the bottom?
```

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

The numbers change. With seed 1, the first four lines are all 3.2000, above
π, where seed 0 was far below it. Seed 1 stays above π, except at 1,280
darts, where it is 3.1344, and the last column is -0.0072.

The shape stays the same. In both tables, the number in the last column
that is furthest from 0 is near the top: -0.7416 for seed 0, and 0.1584
for seed 1 after 160 darts. Near the bottom, both are close to 0, and both
still move a little. The last three lines are 0.0381, 0.0326 and 0.0182 for
seed 0, and 0.0334, 0.0279 and 0.0334 for seed 1. Every seed gives its own
path, but on every path the estimate comes closer to π in the same way.
The seed decides which path you get. It does not decide how quickly the
path comes close to π.

</details>

## More darts, better on average

The next cell shows a limit of this method. It calls `EstimatePi` with 100,
1,000, 10,000 and 100,000 darts, and with three seeds: 0, 1 and 2. Each
number in the table is how far the estimate is from π. There is one row for
each number of darts, and one column for each seed. `Console.Write` prints
without starting a new line, so each row's numbers stay on one line.

Before you run it: in each column, will every row be closer to π than the
row above it?

```csharp exec
id: more-is-not-reliably-better-1
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

int[] counts = { 100, 1000, 10000, 100000 };
Console.WriteLine("  darts   seed 0   seed 1   seed 2");
foreach (int darts in counts)
{
    Console.Write($"{darts,7}");
    for (int seed = 0; seed <= 2; seed++)
    {
        Console.Write($"  {Math.Abs(EstimatePi(darts, seed) - Math.PI):F5}");
    }
    Console.WriteLine();
}
```

Read each column from the top down. For seed 0, every row is closer than
the row above: 0.34159, 0.07441, 0.01641, 0.00605.

Seed 1 is different. 1,000 darts are off by 0.01041, and 10,000 darts are
off by 0.03201. Ten times the work gave an answer further from π. Seed 2
does the same one row lower: 10,000 darts are off by 0.00439, and 100,000
darts are off by 0.00775.

This is not a mistake in the code, and it is not a bad seed. It is a
normal thing for this method to do. On average, more darts give a better
answer, slowly. But that is not true of every single run.

The next cell makes four runs of 100,000 darts each, with four different
seeds. Then it takes the *mean* of the four estimates: their total divided
by 4.

```csharp exec
id: more-is-not-reliably-better-3
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

double total = 0;
for (int seed = 0; seed <= 3; seed++)
{
    double estimate = EstimatePi(100000, seed);
    Console.WriteLine($"seed {seed}: {estimate:F5}, off by {Math.Abs(estimate - Math.PI):F5}");
    total = total + estimate;
}
double mean = total / 4;
Console.WriteLine($"mean:   {mean:F5}, off by {Math.Abs(mean - Math.PI):F5}");
```

The four runs give four different answers. Two are above π (3.14764 and
3.14572) and two are below it (3.13384 and 3.13620). Two start 3.14, and
two start 3.13. This shows two different questions that we can ask about
any estimate:

- *Accuracy* is whether the estimates are centred on the true answer. If
  we took the mean of a great many runs, would it be π?
- *Precision* is how close the runs are to each other: how much the answer
  changes when the whole program runs again with another seed.

Darts are accurate. The four runs fall on both sides of π, and their mean,
3.14085, is off by only 0.00074. That is closer than any one of the four
runs. Darts are not precise. Runs of 100,000 darts disagree in the second
decimal place.

If you know which of the two is missing, you know what will help. An
estimate that is not precise, like this one, improves with more darts.
An estimate that is not accurate is different. If every run is off in the
same direction, more darts only make you more sure of an answer that is
not true, and you need a better method instead.

Under all of this is a rule about the *typical error*: how far from π a
run usually is. (Here, an *error* is a distance from the true answer, not
a compiler error.) The typical error is in proportion to $1/\sqrt{n}$.
$n$ is the number of darts, and $\sqrt{n}$ is its *square root*: the
number that gives $n$ when you multiply it by itself. So when $\sqrt{n}$
is ten times bigger, the typical error is ten times smaller. This page
shows the rule at work, but it does not prove it. Here is what it means:

- A hundred times as many darts make the typical error ten times smaller,
  because $\sqrt{100} = 10$. That is about one more decimal place that
  matches π.
- Two more decimal places need about $100 \times 100$, ten thousand, times
  as many darts.

That is why nobody calculates π this way. There are far better methods.
But it is still the first example that everyone meets, because the
arithmetic is simple enough that you can watch what the method does.

### Your turn

Runs of 100,000 darts were off by less than a hundredth: about two
decimal places that match π. Roughly how many darts would four decimal
places need? Can you use the rule above to find it? This cell can do the
arithmetic.

```csharp exec
id: more-is-not-reliably-better-2
// How many darts would four decimal places need?
int darts = 100000;    // about two decimal places
Console.WriteLine(darts);
```

```hint
after: 2 runs
How many extra decimal places do you need, to go from two to four? Each
extra decimal place needs about a hundred times the darts.
```

```solution
int darts = 100000;    // about two decimal places
Console.WriteLine(darts * 100 * 100);
---
Two more decimal places need $100 \times 100$ times the darts, and the
cell prints 1000000000: a thousand million darts, for four decimal places
of a number that anyone can find in a book.
```

Now try one large run in one of the cells above, such as
`EstimatePi(10000000, 0)`: ten million darts. How long does it take on
your computer? A thousand million darts is a hundred times more. Would
you wait that long for the answer?

<details class="dl-answer"><summary>answer</summary>

Here is one answer. Yours may be different and work too.

A thousand million darts take about a hundred times as long as ten million.
Multiply your own time by 100 to see. Then, after all that waiting, the
answer has about four decimal places that match π. People already know π
to far more places than anyone needs, from better methods.

For π, this method is only an exercise. It is most useful for questions
that have no better method at all.

</details>

## Any shape at all

The darts work on any shape, as long as we can test whether a point is
inside it. They also work in any box, as long as we know the box's area.

An *atoll* is a ring of coral reef around a lake of sea water, called a
*lagoon*. Seen from above, this atoll is the ring between two circles with
the same centre, $(1, 1)$: an outer circle of radius 1, and the lagoon, a
circle of radius 0.5. The atoll fits in a square that is 2 wide and 2
high. `OnReef` tests whether a point is on the ring. What is the reef's
area?

Can you write `EstimateArea`? It throws `darts` darts at a box `width`
wide and `height` high, with its bottom-left corner at $(0, 0)$. It counts
the darts for which `OnReef` gives `true`, and returns an estimate of the
reef's area.

```csharp exec
id: any-shape-at-all-1
static bool OnReef(double x, double y)
{
    // the square of the distance from the centre, (1, 1)
    double distanceSquared = (x - 1) * (x - 1) + (y - 1) * (y - 1);
    return distanceSquared >= 0.25 && distanceSquared <= 1;
}

static double EstimateArea(double width, double height, int darts, int seed)
{
    // Your code: throw the darts, and return an estimate of the reef's area
    return 0;
}

Console.WriteLine(OnReef(0.2, 1));    // a point on the reef
Console.WriteLine(EstimateArea(2, 2, 1000, 0));
```

```inputs
Math.Round(EstimateArea(2, 2, 1000, 0), 3)
Math.Round(EstimateArea(2, 2, 100000, 0), 3)
OnReef(1, 1)      // the centre of the lagoon
```

```hint
after: 2 runs
Can you start from a copy of `EstimatePi`, from a cell above?
`random.NextDouble()` is a number from 0 up to 1. How can you make it a
number from 0 up to `width`?
```

```hint
after: 4 runs
`hits` divided by `darts` is the reef's share of the box. To make a share
of the box an area, what do you multiply it by? If your answer is 0, is
there a division of two whole numbers?
```

```solution
static bool OnReef(double x, double y)
{
    // the square of the distance from the centre, (1, 1)
    double distanceSquared = (x - 1) * (x - 1) + (y - 1) * (y - 1);
    return distanceSquared >= 0.25 && distanceSquared <= 1;
}

static double EstimateArea(double width, double height, int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble() * width;
        double y = random.NextDouble() * height;
        if (OnReef(x, y))
        {
            hits++;
        }
    }
    return width * height * hits / darts;
}

Console.WriteLine(OnReef(0.2, 1));    // a point on the reef
Console.WriteLine(EstimateArea(2, 2, 1000, 0));
Console.WriteLine(EstimateArea(2, 2, 100000, 0));
Console.WriteLine($"exact: {Math.PI * 1 * 1 - Math.PI * 0.5 * 0.5:F3}");
---
1,000 darts give 2.28, and 100,000 darts give 2.3418. The exact area is
the outer circle's area minus the lagoon's, and the last line prints it:
2.356. The darts never needed that formula. A real reef has an uneven
edge, and no formula for its area. The darts would measure it in the same
way, with only a new `OnReef`.

`width * height` comes first in the last line of `EstimateArea`, so the
calculation is made with `double`s from the start. `hits / darts * width *
height` would divide two `int`s first, and drop the part after the point,
as `4 * hits / darts` did.
```

## Lab bench

The three numbers that you might want to change have names, just under
`EstimatePi`. Change them, run it, and see what happens. The cell makes
`runs` runs of `darts` darts each, with a new seed for each run. It prints
the lowest estimate, the highest, the gap between them, and the mean of
all the runs.

```csharp exec
id: lab-bench-1
static double EstimatePi(int darts, int seed)
{
    Random random = new Random(seed);
    int hits = 0;
    for (int i = 0; i < darts; i++)
    {
        double x = random.NextDouble();
        double y = random.NextDouble();
        if (x * x + y * y <= 1)
        {
            hits++;
        }
    }
    return 4.0 * hits / darts;
}

int darts = 10000;     // darts in each run
int runs = 20;         // how many runs
int firstSeed = 0;     // the runs use the seeds firstSeed, firstSeed + 1, and so on

double lowest = 4;     // no estimate can be higher than 4
double highest = 0;
double total = 0;
for (int run = 0; run < runs; run++)
{
    double estimate = EstimatePi(darts, firstSeed + run);
    total = total + estimate;
    if (estimate < lowest)
    {
        lowest = estimate;
    }
    if (estimate > highest)
    {
        highest = estimate;
    }
}
Console.WriteLine($"lowest:  {lowest:F4}");
Console.WriteLine($"highest: {highest:F4}");
Console.WriteLine($"gap:     {highest - lowest:F4}");
Console.WriteLine($"mean:    {total / runs:F4}");
```

As it is, the 20 runs are between 3.1112 and 3.1736, a gap of 0.0624, and
their mean is 3.1455. Choose one of these questions, or ask one of your own:

1. Multiply `darts` by 100. How much smaller does the gap become? Is that
   what the $1/\sqrt{n}$ rule says?
2. Twenty runs of 10,000 darts are 200,000 darts. Is their mean closer to
   π than one run of 200,000 darts?
3. On line 9, change the test to a shape whose area you know exactly, such
   as the triangle `x + y <= 1`, whose area is one half. The method still
   multiplies by 4, so what should the mean be? Do the darts find it?
4. How many darts does one run need before all 20 runs start with 3.14?

Millions of darts take time. The page stops a program after 30 seconds of
running. If that happens to a large run, make `runs` smaller. Or use
**Download project** on the cell, and run the program in Visual Studio,
where there is no such limit.

## Looking back

There is no formula for π anywhere in the method on this page. The method
does not know what π is. It counts a share of darts, and the shape of the
question gives us π.

That idea works for much more than circles. Can you write a number as "the share of
cases in which something is true"? Then you can estimate it by making cases
and counting them. Many real questions have that shape, and have no formula
at all. What share of delivery routes finish before 5 pm? How often does a
design fail when it is busy? A simulation can answer questions like these,
and we can throw darts at them as easily as at a quarter circle.

Did the wandering estimate feel strange to look at? Most of the
mathematics you have met gives an exact answer. This method gives an answer
that is close, and only statistics can say how far from the truth it is
likely to be. It asks you to trust an answer in a new way. It makes sense
to feel unsure about that.

A challenge: two friends arrive at the gate of a park, each at a random
moment in the same hour. Each one waits 10 minutes for the other, and then
enters alone. How often do they meet? Each *trial*, one turn of the loop,
is one dart: `first` and `second` are the two arrival times, in minutes
after the hour, and the square is every pair of times. Can you count the trials in which they
meet? Here the "area" is a chance.

```csharp challenge
// Two friends arrive at the gate at random moments in the same hour.
// Each waits 10 minutes for the other, then enters alone.
// How often do they meet?
Random random = new Random(0);
int trials = 100000;
int meetings = 0;
for (int trial = 0; trial < trials; trial++)
{
    double first = random.NextDouble() * 60;     // minutes after the hour
    double second = random.NextDouble() * 60;
    // Your code: count the trials in which they meet
}
Console.WriteLine($"They meet in {meetings} of {trials} trials.");
```

Two more extras use chance as this page does.
[The Monty Hall problem](lesson:three-doors) plays a game show many times
to settle an argument. *Markov chains*, which is not written yet, chooses
words at random, one after another, to write new sentences in the voice of
a book. This is an extra page, so it has no practice page.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project. A seeded program prints the same numbers there,
on the same version of .NET as this page.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one. These are worth your time.

Microsoft. *Random.NextDouble Method*.
<https://learn.microsoft.com/en-us/dotnet/api/system.random.nextdouble>.
Microsoft's own description of the method that throws every dart on this
page, with an example. It is written for programmers who already know C#.

Metropolis, N. and Ulam, S. (1949). *The Monte Carlo Method.* Journal of
the American Statistical Association, 44(247), 335–341.
<https://doi.org/10.1080/01621459.1949.10483310>. The paper that gave the
method its name. The authors wrote it while they were using the method on
problems that nobody could solve in any other way. It is short.

AlphaPhoenix (2016). *RainPi: Calculate Pi with Raindrops!*
<https://www.youtube.com/watch?v=I-BC_vI4CAE>. Our darts are random numbers
from C#. Brian Haidet used real raindrops instead, falling on sensors
shaped to do the same job. The video is four minutes long.
