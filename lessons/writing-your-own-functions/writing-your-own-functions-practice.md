---
title: "Methods: practice"
version: 2026.09.28.1
from: writing-your-own-functions-practice
practice_for: writing-your-own-functions
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Methods: practice

These problems are on methods, with three from earlier pages. Where a
problem has cases to try, can you write what you think each case
gives, before you compare your code with a solution? Each problem has an
answer or a solution under it, for when you have tried it. Some cells are
meant not to compile, and the problem says so. When that happens, nothing
is broken: the message is part of the answer.

Each Run starts a new program, so every cell has its own copy of each
method it uses. A method that nothing calls yet shows the warning CS8321.
A warning does not stop the program.

## 1. Three ways to write Wave

What does each of these three cells print? Say what you think, then run
each one. Whatever happens when you run them is meant to happen, and
nothing is broken.

(a)

```csharp exec
id: three-ways-to-write-wave-1
static void Wave()
{
    Console.WriteLine("Hi!");
}
```

(b)

```csharp exec
id: three-ways-to-write-wave-2
static void Wave()
{
    Console.WriteLine("Hi!");
}

Wave();
Wave();
```

(c)

```csharp exec
id: three-ways-to-write-wave-3
expect: CS0201
static void Wave()
{
    Console.WriteLine("Hi!");
}

Wave;
```

<details class="dl-answer"><summary>answer</summary>

(a) Nothing, and the warning CS8321: the method is written, but nothing
calls it.

(b) `Hi!` twice, once for each call.

(c) It did not compile. Without brackets, `Wave` is the name of the
method, not a call to it, and a name on its own is not something C# can
run:

```console
Program.cs(6,1): error CS0201: Only assignment, call, increment, decrement, await, and new object expressions can be used as a statement
```

The brackets make it a call.

</details>

## 2. Too few arguments, or too many

```csharp exec
id: defining-and-calling-1
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("Tom", "cat");
```

What happens with `DescribePet("cat", "Tom");`? Can you try it on the
last line?

The next cell calls `DescribePet` with one argument, and then with three.
It is meant to fail. What do you think the compiler will say about each
call?

```csharp exec
id: defining-and-calling-2
expect: CS7036
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("Tom");
DescribePet("Tom", "cat", "grey");
```

<details class="dl-answer"><summary>answer</summary>

`DescribePet("cat", "Tom");` compiles, and swaps the name and the animal,
as `dog is a Rex.` did on the lesson page.

The second cell did not compile. It gives one message for each call:

```console
Program.cs(6,1): error CS7036: There is no argument given that corresponds to the required parameter 'animal' of 'DescribePet(string, string)'
Program.cs(7,1): error CS1501: No overload for method 'DescribePet' takes 3 arguments
```

Arguments are matched to parameters by position, so the order matters, and
the number must match. The first message names the parameter that got
nothing. In the second, an *overload* is one version of a method: C# lets
several methods share a name if their parameters are different. No version
of `DescribePet` takes three arguments.

</details>

## 3. Called too soon

```csharp exec
id: called-too-soon-1
Shout("hello");

static void Shout(string word)
{
    Console.WriteLine(word + "!");
}
```

```predict
type: choice

What will it print?

- hello!
  - The compiler reads the whole cell before anything runs.
- It does not compile
  - The first line uses `Shout` before the lines that make it.
- Nothing
  - The call runs before the program reaches the method.
```

<details class="dl-answer"><summary>why</summary>

`hello!`. C# compiles the whole cell before it runs any of it, so it knows
`Shout` before the first line runs. A method can be called above the lines
that make it, or below them.

A variable is different. A variable exists from the line that makes it,
to the end of its curly brackets, so it cannot be used above that line.
What does the compiler say about this program? Can you try it in the cell?

```csharp
Console.WriteLine(greeting);
string greeting = "Hi";
```

</details>

## 4. Countdown

Can you write `Countdown(int start)`, which prints the whole numbers from
`start` down to 1, one on each line, and then `Go!`?

```csharp exec
id: countdown-1
static void Countdown(int start)
{
    // Your code
}

Countdown(3);
```

```hint
after: 1 runs
A for loop can count down, with `--`. What should its condition be, so
that the last number it prints is 1? And where does the `Go!` line go:
inside the loop's curly brackets, or after them?
```

```solution
static void Countdown(int start)
{
    for (int number = start; number >= 1; number--)
    {
        Console.WriteLine(number);
    }
    Console.WriteLine("Go!");
}

Countdown(3);
---
If `Console.WriteLine("Go!");` is inside the loop's curly brackets, it is
part of the loop, and `Go!` appears after every number.
```

## 5. Is it even

Can you write `IsEven(int number)`, which returns `true` when `number` is
even and `false` when it is not?

```csharp exec
id: is-it-even-1
static bool IsEven(int number)
{
    // Your code
    return false;
}

Console.WriteLine(IsEven(4));
```

```inputs
IsEven(4)
IsEven(7)
IsEven(0)
IsEven(-2)
IsEven(-3)     // below zero, and odd
```

```solution
static bool IsEven(int number)
{
    return number % 2 == 0;
}

Console.WriteLine(IsEven(4));
---
`number % 2 == 0` is already `true` or `false`, so the method can return
it as it is. An `if` with `return true;` and `return false;` does the same,
in more lines.

If you wrote `number % 2 != 1`, compare your answer for `IsEven(-3)` with
this one's. What does `%` give when the number in front of it is below
zero? [The closer look at dividing](lesson:dividing-in-csharp) shows it.
```

## 6. Factorial

Can you write `Factorial(int number)`, which returns $n!$ for the number
$n$ it is given? What should `Factorial(0)` give?

```csharp exec
id: factorial-1
static int Factorial(int number)
{
    // Your code
    return 0;
}

Console.WriteLine(Factorial(5));
```

```inputs
Factorial(5)
Factorial(1)
Factorial(0)
```

```hint
after: 1 runs
It is an accumulator that multiplies. What should it start at? And what
does your method return when the loop runs zero times?
```

```solution
static int Factorial(int number)
{
    int product = 1;
    for (int i = 2; i <= number; i++)
    {
        product *= i;
    }
    return product;
}

Console.WriteLine(Factorial(5));
---
`Factorial(0)` gives 1: the loop does not run, and the method returns the
starting value. Mathematicians define $0!$ as 1 too, which is one reason
to start the accumulator at 1.
```

## 7. Found, or not found

This method asks whether `number` has a factor between 2 and
`number - 1`. Before you run the cell, can you write what each line
will print?

```csharp exec
id: found-or-not-found-1
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

Console.WriteLine(HasFactor(9));
Console.WriteLine(HasFactor(7));
Console.WriteLine(HasFactor(2));
```

<details class="dl-answer"><summary>why</summary>

`True` for 9, `False` for 7, and `False` for 2. For 9, the loop tries 2,
then 3, and 3 divides 9, so the method returns `true` and stops. For 7,
nothing from 2 to 6 divides it, so the loop ends, and the last line
returns `false`. For 2, the condition `2 < 2` is `false` at the start, so
the loop never runs, and the next line the method reaches is
`return false;`.

</details>

## 8. One step too far in

Somebody wrote `HasFactor` with its last `return` inside the loop's curly
brackets. As it is, the cell does not compile: it is meant to fail. Can you
find why, and change it so that it gives the same answers as the method in
problem 7?

```csharp exec
id: one-step-too-far-in-1
expect: CS0161
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
        return false;
    }
}

Console.WriteLine(HasFactor(9));
```

```inputs
HasFactor(9)
HasFactor(15)
HasFactor(7)
```

```hint
Which line does the first message name? Can the loop run zero times? What
would the method return then?
```

```hint
after: 3 errors
If you add `return false;` after the loop and keep the one inside it, the
cell compiles. What does `HasFactor(9)` give then, and why?
```

```solution
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

Console.WriteLine(HasFactor(9));
---
The message is `error CS0161: 'HasFactor(int)': not all code paths return
a value`, on line 1, where the method starts. For `HasFactor(2)`, the loop
never runs, and then no `return` is reached. The compiler checks every
path, so it finds this before anything runs. There is a warning too,
CS0162, `Unreachable code detected`, at `divisor++`. With a `return` at
the end of the body, the loop never reaches its third part.

With `return false;` inside the loop, the method returns on the first
number it tries, whether that number divides or not. So for 9 it tries
only 2, and never reaches 3. "Found it" can be answered inside the loop,
but "not found" only after the loop has tried every number.
```

## 9. Half of seven

```csharp exec
id: half-of-seven-1
static double Half(int number)
{
    return number / 2;
}

Console.WriteLine(Half(7));
```

```predict
type: number

What will it print?
```

Why does it print that? Then can you change one number in the method, so
that it keeps the part after the point?

<details class="dl-answer"><summary>why</summary>

3. `number` is an `int`, and so is 2, so `number / 2` divides two whole
numbers and drops the part after the point. That happens before the value
is returned. The return type, `double`, changes 3 into a `double` as it is
returned, but the .5 is already gone.

</details>

```solution
static double Half(int number)
{
    return number / 2.0;
}

Console.WriteLine(Half(7));
---
3.5. With `2.0`, one of the two numbers has a decimal point, so `/` keeps
the part after the point, before the value is returned.
```

## 10. What WriteLine returns

This cell stores what `Console.WriteLine` returns, and prints it.
Whatever happens when you run it is meant to happen, and nothing is broken.

```csharp exec
id: print-a-print-1
expect: CS0029
string shown = Console.WriteLine("hi");
Console.WriteLine(shown);
```

```predict
type: choice

What will it print?

- hi, and then hi again
  - The first line prints `hi`, and `shown` keeps what it printed.
- hi, and then an empty line
  - `Console.WriteLine` shows text on the screen, and keeps none of it.
- It does not compile
  - Is there anything to store in `shown`?
```

Once you have run it, can you say why?

<details class="dl-answer"><summary>why</summary>

It did not compile:

```console
Program.cs(1,16): error CS0029: Cannot implicitly convert type 'void' to 'string'
```

`Console.WriteLine` is a `void` method. Its job is to show things, and it
returns nothing. So there is nothing to store in `shown`.

</details>

## 11. Two rooms

Can you change `FloorArea` so that `FloorArea(4, 3) + FloorArea(5, 2)`
gives the total floor area of two rooms? As it is, the cell does not
compile: it is meant to fail.

```csharp exec
id: two-rooms-1
expect: CS0019
static void FloorArea(int length, int width)
{
    Console.WriteLine(length * width);
}

Console.WriteLine(FloorArea(4, 3) + FloorArea(5, 2));
```

```inputs
FloorArea(4, 3) + FloorArea(5, 2)
```

```solution
static int FloorArea(int length, int width)
{
    return length * width;
}

Console.WriteLine(FloorArea(4, 3) + FloorArea(5, 2));
---
22. With `void`, each call returns nothing, so there is nothing to add, and
CS0019 says that `+` cannot be used with `void`. A method that returns its
answer can be part of a bigger calculation.
```

## 12. Which are pure

A *pure method* depends only on its arguments: the same input always gives
the same output, and it changes nothing outside itself. Which of these are
pure?

```csharp
// (a)
static int Double(int number)
{
    return number * 2;
}

// (b) taxRate is a variable made outside the method
double PriceWithTax(double price)
{
    return price * (1 + taxRate);
}

// (c) Random.Shared.Next(1, 7) gives a random whole number from 1 to 6
static int Roll()
{
    return Random.Shared.Next(1, 7);
}

// (d)
static double Area(double radius)
{
    return 3.14159 * radius * radius;
}
```

<details class="dl-answer"><summary>answer</summary>

(a) and (d).

(b) depends on `taxRate`, outside the method, so changing `taxRate` changes
the answer for the same price. It has no `static`, and it cannot have one:
with `static`, it does not compile (CS8421).

(c) gives a different answer each time, even though it is `static`.
`static` stops a method from using the program's variables, but it does
not stop everything that can change.

A change that a method makes outside itself, such as printing, or changing
a variable outside it, is called a *side effect*. Pure methods are the
easiest to test, but the others are needed too. A dice game needs `Roll`.

</details>

## 13. A method that undoes itself

Some methods undo themselves. If you use one twice, you have what you
started with.

<div class="dl-world" data-world="secret-messages">

Can you write `Reverse(string message)`, which returns the message
backwards? Then what is `Reverse(Reverse("OTTER"))`?

```csharp exec
id: its-own-inverse-1--secret-messages
static string Reverse(string message)
{
    // Your code
    return "";
}

Console.WriteLine(Reverse("RETTO"));
```

```inputs
Reverse("RETTO")
Reverse(Reverse("OTTER"))
Reverse("")
```

```hint
after: 1 runs
An accumulator can add to the front as well as the end. What does
`letter + backwards` do, where `backwards + letter` would add to the end?
```

```solution
static string Reverse(string message)
{
    string backwards = "";
    foreach (char letter in message)
    {
        backwards = letter + backwards;
    }
    return backwards;
}

Console.WriteLine(Reverse("RETTO"));
---
Turning a message backwards twice gives the message you started with, so
`Reverse` undoes itself. ROT13, a Caesar shift of 13, is another: two
shifts of 13 move each letter the whole length of the alphabet, back to
where it started.
```

</div>

<div class="dl-world" data-world="pixel-art">

A photo negative turns each brightness `b`, from 0 to 255, into `255 - b`.
Can you write `Invert(int brightness)`? Then what is
`Invert(Invert(200))`?

```csharp exec
id: its-own-inverse-1--pixel-art
static int Invert(int brightness)
{
    // Your code
    return 0;
}

Console.WriteLine(Invert(200));
```

```inputs
Invert(0)
Invert(200)
Invert(Invert(200))
```

```solution
static int Invert(int brightness)
{
    return 255 - brightness;
}

Console.WriteLine(Invert(200));
---
Black becomes white, and white becomes black. Inverting twice gives the
brightness you started with, so `Invert` undoes itself.
```

</div>

## 14. An input it cannot take

```csharp exec
id: an-input-it-cannot-take-1
static int ShareEqually(int total, int people)
{
    return total / people;
}

Console.WriteLine(ShareEqually(12, 4));
```

Which input can this method not take? What happens if you call it with
that input? Can you try it?

<details class="dl-answer"><summary>answer</summary>

0 people. `ShareEqually(12, 0)` divides a whole number by 0, so the
program stops with a `DivideByZeroException`, as on
[the page about exceptions](lesson:reading-an-error-message).

With `double` in place of each `int`, the program does not stop. Can you
try it, and see what the method returns?

When a method has an input it cannot handle, decide on purpose what should
happen. [Reusable methods](lesson:building-reusable-tools), a later page,
returns to inputs like this, which are called *edge cases*.

</details>

## 15. Counting primes

A *prime* is a whole number above 1 that only 1 and itself divide.

```csharp exec
id: functions-that-use-other-functions-2
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

static bool IsPrime(int number)
{
    if (number < 2)
    {
        return false;
    }
    return !HasFactor(number);
}

Console.WriteLine($"{IsPrime(7)} {IsPrime(9)} {IsPrime(1)}");
```

Why does `IsPrime` need the line `if (number < 2)`? Then can you use
`IsPrime` to count the primes below 50? The next cell has both methods
already.

```csharp exec
id: counting-primes-1
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

static bool IsPrime(int number)
{
    if (number < 2)
    {
        return false;
    }
    return !HasFactor(number);
}

int count = 0;

Console.WriteLine(count);
```

```inputs
count
```

```solution
static bool HasFactor(int number)
{
    for (int divisor = 2; divisor < number; divisor++)
    {
        if (number % divisor == 0)
        {
            return true;
        }
    }
    return false;
}

static bool IsPrime(int number)
{
    if (number < 2)
    {
        return false;
    }
    return !HasFactor(number);
}

int count = 0;
for (int number = 1; number < 50; number++)
{
    if (IsPrime(number))
    {
        count++;
    }
}
Console.WriteLine(count);
---
15 primes are below 50. Without `if (number < 2)`, the loop in
`HasFactor(1)` never runs, so `HasFactor` says that 1 has no factor, and
`IsPrime` would call 1 a prime. But 1 is not a prime. Can you delete the
`if` and its curly brackets from `IsPrime` in the first cell, and see?
```

## 16. Distance on a screen

Two pixels are at (`x1`, `y1`) and (`x2`, `y2`). You can find the distance
between them with Pythagoras again. It is the square root of the difference
across, squared, plus the difference down, squared. Can you write
`Distance(int x1, int y1, int x2, int y2)`?

```csharp exec
id: distance-on-a-screen-1
static double Distance(int x1, int y1, int x2, int y2)
{
    // Your code
    return 0;
}

Console.WriteLine(Distance(0, 0, 3, 4));
```

```inputs
Distance(0, 0, 3, 4)
Distance(1, 1, 4, 5)
Distance(2, 3, 2, 3)      // the same pixel
```

```solution
static double Distance(int x1, int y1, int x2, int y2)
{
    int across = x2 - x1;
    int down = y2 - y1;
    return Math.Sqrt(across * across + down * down);
}

Console.WriteLine(Distance(0, 0, 3, 4));
---
Naming `across` and `down` makes the line with Pythagoras in it read like
the formula.
```

## 17. Two answers at once

Can you write `DivideWithRemainder(int number, int divisor)`, which returns
two values: how many whole times `divisor` goes into `number`, and what
remains? `(int, int)` in front of the method's name says that it returns
two `int` values together. Values together in brackets like this are called
a *tuple*.

```csharp exec
id: two-answers-at-once-1
static (int, int) DivideWithRemainder(int number, int divisor)
{
    // Your code
    return (0, 0);
}

Console.WriteLine(DivideWithRemainder(17, 5));
```

```inputs
DivideWithRemainder(17, 5)
DivideWithRemainder(5, 17)
DivideWithRemainder(-7, 2)     // below zero
```

```solution
static (int, int) DivideWithRemainder(int number, int divisor)
{
    return (number / divisor, number % divisor);
}

Console.WriteLine(DivideWithRemainder(17, 5));
---
The two values in brackets are returned together. The caller can keep them
under two names at once:
`(int times, int remainder) = DivideWithRemainder(17, 5);`.

For -7 and 2, it gives (-3, -1): the division drops the part after the
point, towards zero, and the remainder keeps the sign of -7, as
[the closer look at dividing](lesson:dividing-in-csharp) showed. C#'s own
`Math.DivRem(17, 5)` does the same job. The other way to return two values
is an `out` parameter, as `int.TryParse` has.
```

## 18. A copy of the value

```csharp exec
id: a-copy-of-the-value-1
static void AddOne(int number)
{
    number = number + 1;
    Console.WriteLine($"inside: {number}");
}

int score = 5;
AddOne(score);
Console.WriteLine($"outside: {score}");
```

What do you think the last line prints? Run it and see.

<details class="dl-answer"><summary>why</summary>

`outside: 5`. When `AddOne(score)` is called, the parameter `number` gets a
copy of the value in `score`, which is 5. The method changes its copy to 6,
and `score` keeps 5. This is *passing by value*. To change `score`, let the
method return the new value, and store it: `score = AddOne(score);`, with a
method that returns `number + 1`.

</details>

## 19. A count inside and outside

```csharp exec
id: scope-1
int count = 0;

int Bump()
{
    int count = 10;
    return count;
}

Console.WriteLine($"{Bump()} {count}");
```

What do you think it prints? Run it and see.

<details class="dl-answer"><summary>why</summary>

`10 0`. The line `int count = 10;` has a type in front of it, so it makes a
new variable, local to `Bump`, which hides the `count` outside. The `count`
outside is still 0. If you want a method to change a value, return the new
value, and let the caller keep it.

</details>

## 20. Reading and changing a variable outside

Neither of these methods has `static`, and both programs compile. What do
you think each one prints? Say what you think, then run it.

(a)

```csharp exec
id: reading-and-changing-outside-1
string greeting = "Hello";

string Greet(string name)
{
    return greeting + ", " + name;
}

Console.WriteLine(Greet("Ada"));
```

(b)

```csharp exec
id: reading-and-changing-outside-2
int total = 0;

void Add(int amount)
{
    total = total + amount;
}

Add(5);
Console.WriteLine(total);
```

And what happens if you write `static` in front of each method?

<details class="dl-answer"><summary>answer</summary>

(a) prints `Hello, Ada`, and (b) prints 5. A method without `static` can
read a variable from outside, as `Greet` reads `greeting`. It can also
change one, as `Add` changes `total`, and nothing in the call `Add(5);`
says so.

With `static`, neither compiles. The message is CS8421, because a `static`
method cannot use the program's variables at all. The clear way is to pass
the value in, and return the new one:

```csharp
static int Add(int total, int amount)
{
    return total + amount;
}

int total = 0;
total = Add(total, 5);
Console.WriteLine(total);
```

</details>

## 21. From earlier: how many steps

From [the page about loops](lesson:repeating-yourself).

```csharp exec
id: from-earlier-how-many-times-1
int number = 100;
int steps = 0;
while (number > 1)
{
    number = number / 3;
    steps++;
    Console.WriteLine(number);
}
Console.WriteLine($"{steps} steps");
```

Before you run it, how many steps do you think it counts?

<details class="dl-answer"><summary>why</summary>

4 steps. Dividing two `int` values drops the part after the point, so 100
becomes 33, then 11, then 3, then 1. The loop stops there, because 1 is
not more than 1.

</details>

## 22. From earlier: the biggest first

From [the page about decisions](lesson:making-decisions). This program is
meant to print `#` for a brightness of 192 or more, and the brightness is
200. What do you think it prints? Run it, and then can you say why?

```csharp exec
id: from-earlier-the-biggest-first-1
int brightness = 200;
string pixel = ".";
if (brightness >= 64)
{
    pixel = "-";
}
else if (brightness >= 192)
{
    pixel = "#";
}
Console.WriteLine(pixel);
```

<details class="dl-answer"><summary>answer</summary>

`-`. C# runs the first path whose condition is `true`. 200 is 64 or more,
so the first path takes it, and the second condition is never checked.
With `>=`, the biggest threshold goes first.

</details>

## 23. From earlier: two decimal places

From [the page about variables and types](lesson:storing-and-computing).
What do you think the first two lines print? Say what you think, then run
it.

```csharp exec
id: from-earlier-two-decimal-places-1
Console.WriteLine($"{2 / 3:F2}");
Console.WriteLine($"{2.0 / 3:F2}");
Console.WriteLine(2 / 3);
Console.WriteLine(2.0 / 3);
```

<details class="dl-answer"><summary>answer</summary>

`0.00`, and then `0.67`. `2 / 3` divides two whole numbers, so it is 0, as
the third line shows, and `:F2` shows 0 with two decimal places. `2.0 / 3`
is a `double`, 0.6666666666666666, as the last line shows, and `:F2` shows
it with two decimal places. The value itself keeps every place: `:F2` only
changes how it is shown.

</details>
