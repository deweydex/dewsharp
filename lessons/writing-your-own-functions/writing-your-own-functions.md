---
title: "Methods: writing your own"
version: 2026.09.28.1
from: writing-your-own-functions
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO8, PDP-LO11]
---

# Methods: writing your own

Here is a small program with a secret in it. What will appear under the
cell when you run it?

```csharp exec
id: defining-a-function-1
static void Secret()
{
    Console.WriteLine("The password is OTTER");
}
```

```predict
type: choice

What will appear under the cell?

- The password is OTTER
  - The `Console.WriteLine` line is there in the cell.
- Nothing
  - These lines give some steps a name. They do not run the steps.
- Secret
  - This is what you would see if C# printed the name.
```

Nothing appears, except a warning:

```console
Program.cs(1,13): warning CS8321: The local function 'Secret' is declared but never used
```

These four lines teach C# a new name, `Secret`, and what the name means.
They do not run the line between the curly brackets. That line runs only
when we *call* `Secret`: we write its name and a pair of brackets. Nothing
in this cell calls it, and the warning says the same thing in the
compiler's words. *Declared* means that the program makes the name. A
*warning* is a message about something that may be a mistake. It does not
stop the program.

`Secret` is a *method*: a named block of code that does one job. We have
used C#'s own methods from the start: `Console.WriteLine`, `int.Parse`,
`Math.Pow`, `char.IsUpper`. Each has a name, and each takes something in
its brackets. On this page we write our own methods, so that code we need
again, like the Caesar shift, has a name we can call as often as we like.

Many programming languages call a named block of code a *function*. C#
calls it a method, and so does this page. The compiler's messages call a
method that is written among a program's other lines a *local function*,
as the warning above did.

In the next cell, the two calls are above the method. What do you think
will appear this time?

```csharp exec
id: defining-a-function-2
Secret();
Secret();

static void Secret()
{
    Console.WriteLine("The password is OTTER");
}
```

```predict
type: choice

What will appear under the cell?

- The password is OTTER, twice
  - There are two calls.
- Nothing
  - The calls run before the program reaches the method.
- It does not compile
  - The calls use the name `Secret` before the lines that make it.
```

The password appears twice. C# reads and checks the whole program before
it runs any of it: that is compiling. So it knows every method in the cell
before the first line runs, and a call can be above the method or below
it. On this page, we write each method above its calls, so that you read
what a name means before you see it used.

This cell writes `Secret` again. Each Run starts a new program, which runs
from the first line of the cell to the last. So the `Secret` in the cell
above is not part of this program. A cell that calls a method has its own
copy of the method.

## Writing a method

We write a method once, and then call it whenever we need it, with
different values each time.

```csharp exec
id: functions-reusable-algorithms-1
static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

Greet("Ada");
Greet("Grace");
Greet("Alan");
```

Can you add a fourth call, with your own name, and run it again?

<details class="dl-answer"><summary>What each line does</summary>

- `static void Greet(string name)` is the method's first line. It gives
  the method's name, `Greet`, and says what the method takes and what it
  returns. To *return* a value is to send it to the code that called the
  method.
  - `(string name)`: `Greet` takes one value, a `string`. Inside the
    method, its name is `name`.
  - `void`: `Greet` returns nothing. It does a job, printing, and sends no
    value to the code that called it.
  - `static`: `Greet` works only with what it is given. A later section of
    this page shows what that means.
- There is no semicolon at the end of the first line, as there is none
  after an `if` line or a `for` line.
- The lines between the curly brackets are the method's *body*. They run
  each time the method is called, not when the method is written.
- `Greet("Ada");` calls the method. C# puts `"Ada"` into `name`, and runs
  the body.

</details>

`name` is a *parameter*: the name, in the method, for a value that the
method will be given. The value in a call, like `"Ada"`, is an *argument*:
the value that the call passes in. C# puts each argument into its
parameter. A parameter has a type, as every variable does, so `Greet(42)`
does not compile: 42 is not a `string`.

A method can have more than one parameter, with commas between them. A call
passes the same number of arguments, in the same order. What will the last
line of this cell print?

```csharp exec
id: defining-a-function-3
static void DescribePet(string petName, string animal)
{
    Console.WriteLine($"{petName} is a {animal}.");
}

DescribePet("Rex", "dog");
DescribePet("dog", "Rex");
```

```predict
type: text

What will the last line print?
```

C# matches arguments to parameters by their position: the first argument
goes into the first parameter. It does not know that "Rex" sounds like a
name, so the last line prints `dog is a Rex.` Both arguments are strings,
and both parameters are `string`, so the compiler accepts both calls.

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you write a method `PrintCodeTable(int shift)`, which prints every
letter of the alphabet beside the letter that a Caesar shift of `shift`
moves it to? Then can you call it with a shift of 3, and again with 13?

```csharp exec
id: your-turn-1--secret-messages
// Your PrintCodeTable method

// Call it with 3, then with 13

```

```hint
after: 1 runs
On [the page about loops](lesson:repeating-yourself), a for loop printed
this table for a shift of 3. That loop can be the method's body. Where did
it use the number 3?
```

```solution
static void PrintCodeTable(int shift)
{
    for (int position = 0; position < 26; position++)
    {
        char letter = (char)(position + 'A');
        char moved = (char)((position + shift) % 26 + 'A');
        Console.WriteLine($"{letter} {moved}");
    }
}

PrintCodeTable(3);
PrintCodeTable(13);
---
The 3 became the parameter `shift`, so one method prints the table for any
shift from 0 to 25.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write a method `DrawSquare(int size)`, which prints a square of
`#`, `size` pixels wide and `size` pixels tall? Then can you call it with
3, and again with 5?

```csharp exec
id: your-turn-1--pixel-art
// Your DrawSquare method

// Call it with 3, then with 5

```

```hint
after: 1 runs
Can you use two loops, one inside the other, as the checkerboard on
[the page about loops](lesson:repeating-yourself) did? The outer loop
counts the rows. The inner loop prints one row with `Console.Write`. How
many times does each loop run?
```

```solution
static void DrawSquare(int size)
{
    for (int row = 0; row < size; row++)
    {
        for (int column = 0; column < size; column++)
        {
            Console.Write("#");
        }
        Console.WriteLine();
    }
}

DrawSquare(3);
DrawSquare(5);
---
Everything that changes from one square to the next is the parameter,
`size`.
```

</div>

## Returning a value

A method can also return a value to the code that called it. Most useful
methods return a value, so that we can continue to work with it.

```csharp exec
id: functions-reusable-algorithms-2
static int Square(int number)
{
    return number * number;
}

int result = Square(7);
Console.WriteLine(result);
Console.WriteLine(Square(12));
```

`int` in front of the name `Square` is the method's *return type*: the
type of the value it returns. In the methods above, `void` meant "no
value". The line `return number * number;` sends the value to the code
that called the method. C# has no operator for a power, as
[the closer look at powers](lesson:powers-in-csharp) found, so the square
is `number * number`.

The call `Square(7)` then gives the value 49, in the same way that
`int.Parse(text)` gives the number in `text`. We can store it, print
it, or use it in more calculations.

A `return` also ends the method at once. Any lines after it do not run.
Which `return` runs for `Larger(5, 5)`?

```csharp exec
id: giving-a-value-back-1
static int Larger(int first, int second)
{
    if (first > second)
    {
        return first;
    }
    return second;
}

Console.WriteLine(Larger(3, 8));
Console.WriteLine(Larger(10, 2));
Console.WriteLine(Larger(5, 5));
```

For `Larger(10, 2)`, `first > second` is `true`, so the method returns 10
and stops. For `Larger(5, 5)`, it is `false`, so the method continues to
the last line and returns `second`, which is 5.

A method with a return type must return a value, whether its `if`
conditions are `true` or `false`. The next cell is `Larger` without its
last line, `return second;`. It is meant to fail. Before you run it, which
line do you think the compiler will name?

```csharp exec
id: giving-a-value-back-2
expect: CS0161
static int Larger(int first, int second)
{
    if (first > second)
    {
        return first;
    }
}

Console.WriteLine(Larger(3, 8));
```

It did not compile, so nothing ran. The message is:

```console
Program.cs(1,12): error CS0161: 'Larger(int, int)': not all code paths return a value
```

A *code path* is one way through the method. Here, the path where
`first > second` is `false` reaches the end of the method with no value to
return. The compiler checks every path before the program runs, and it
names line 1, the method's first line, because the problem is in the whole
method, not in one line of it.

### Your turn

From here on, a task has cases to try, and **Compare with a solution** runs
your method and a solution on each case, side by side. Before you compare,
can you write what you think your method gives for each case?

<div class="dl-world" data-world="secret-messages">

Can you write `Encode(string message, int shift)`, which returns the
message with every capital letter moved `shift` places along the alphabet?
Anything else, such as a space or a full stop, stays as it is.

```csharp exec
id: your-turn-2--secret-messages
static string Encode(string message, int shift)
{
    // Your code: make the coded message, then return it
    return "";
}

Console.WriteLine(Encode("HELLO", 3));
```

```inputs
Encode("HELLO", 3)
Encode("ZOO", 1)
Encode("HI THERE", 13)    // with a space
Encode("", 5)             // an empty message
```

```hint
after: 1 runs
Can you start with an empty accumulator, `string coded = "";`? Take each
character of the message in turn. A capital gets the shift, and anything
else is added as it is. What does the method return at the end?
```

```solution
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)((position + shift) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

Console.WriteLine(Encode("HELLO", 3));
---
Every piece of this is from an earlier page: the shift, the `if`, the loop
and the accumulator. The method gives them one name.
```

</div>

<div class="dl-world" data-world="pixel-art">

A checkerboard has `#` where the column number plus the row number is
even, and `.` where it is odd. Can you write
`Checker(int x, int y)`, which returns the pixel for column `x` and row `y`
as a string?

```csharp exec
id: your-turn-2--pixel-art
static string Checker(int x, int y)
{
    // Your code: return "#" or "."
    return "";
}

Console.WriteLine(Checker(0, 0));
```

```inputs
Checker(0, 0)
Checker(1, 0)
Checker(3, 5)
Checker(-1, 0)     // a column past the left edge
```

```hint
after: 1 runs
`(x + y) % 2` is 0 when the sum is even. Which pixel goes with which?
```

```solution
static string Checker(int x, int y)
{
    if ((x + y) % 2 == 0)
    {
        return "#";
    }
    return ".";
}

Console.WriteLine(Checker(0, 0));
---
It returns the pixel, and does not print it, so that another method can
use it to build a whole picture. A later section of this page does that.

If your method asks `(x + y) % 2 == 1` for the `.`, and returns `#`
otherwise, compare its answer for `Checker(-1, 0)` with this one's. What
does `%` give when the number in front of it is below zero?
[The closer look at dividing](lesson:dividing-in-csharp) shows what C#
does with a remainder below zero.
```

</div>

## Return or print?

A method that prints a value and a method that returns a value can look the
same when we run them. They are not the same, and nearly everyone confuses
them at first.

Here are two methods. How many lines do you think this cell prints: one, or
two? Run it and see.

```csharp exec
id: return-or-print-1
static int DoubleAndReturn(int number)
{
    return number * 2;
}

static void DoubleAndPrint(int number)
{
    Console.WriteLine(number * 2);
}

DoubleAndReturn(5);
DoubleAndPrint(5);
```

Only one line appears. `DoubleAndReturn(5)` did calculate 10, and it
returned 10. But nothing on that line used the value, so the program did
nothing with it. `DoubleAndPrint(5)` showed 10 on the screen, because
`Console.WriteLine` puts text on the screen.

Now let's keep what each method returns, and look at it. This cell is meant
to fail. Before you run it, which line do you think the compiler will name,
and why?

```csharp exec
id: return-or-print-2
expect: CS0029
static int DoubleAndReturn(int number)
{
    return number * 2;
}

static void DoubleAndPrint(int number)
{
    Console.WriteLine(number * 2);
}

int a = DoubleAndPrint(5);
int b = DoubleAndReturn(5);
Console.WriteLine($"a is {a}");
Console.WriteLine($"b is {b}");
Console.WriteLine($"b + 1 is {b + 1}");
```

It did not compile, so nothing ran. The message is:

```console
Program.cs(11,9): error CS0029: Cannot implicitly convert type 'void' to 'int'
```

Line 11 is `int a = DoubleAndPrint(5);`. `DoubleAndPrint` is `void`: it
returns nothing. So there is no value to store in `a`, and the compiler
says so before the program runs. `void` means "no value", and no value can
become an `int`.

Can you make the cell compile, by deleting line 11 and the line that
prints `a`? What does it print then?

```solution
static int DoubleAndReturn(int number)
{
    return number * 2;
}

static void DoubleAndPrint(int number)
{
    Console.WriteLine(number * 2);
}

int b = DoubleAndReturn(5);
Console.WriteLine($"b is {b}");
Console.WriteLine($"b + 1 is {b + 1}");
---
It prints `b is 10` and `b + 1 is 11`. The value that
`DoubleAndReturn(5)` returned is in `b`, and the program can calculate
with it. The compiler also shows the warning CS8321, because nothing calls
`DoubleAndPrint` now. A warning does not stop the program.
```

| | `Console.WriteLine` inside the method | `return` inside the method |
|---|---|---|
| Who sees the value? | a person, on the screen | the code that called the method |
| Can the program store it, or calculate with it? | no | yes |
| What is in front of the method's name? | `void`, when the method returns nothing | the value's type, such as `int` |

So when a method calculates an answer, let it return the answer. The code
that calls the method can then decide what to do with it: print it, store
it, or use it in a bigger calculation.

### Your turn

This cell does not compile as it is. It is meant to fail, and your task is
to change it. Before you run it, which line do you think the compiler will
name? Then can you change `AddPostage` so that the last line prints 48?

```csharp exec
id: your-turn-4
expect: CS0019
static void AddPostage(int price)
{
    Console.WriteLine(price + 4);
}

int total = AddPostage(20) * 2;
Console.WriteLine(total);
```

```inputs
total
```

```hint
What does `AddPostage(20)` return? What does `void` in front of its name
say?
```

```hint
after: 2 errors
Does the message say CS0019, and name `'void' and 'int'`? The method needs
a return type in place of `void`, and a `return` line in place of
`Console.WriteLine`.
```

```solution
static int AddPostage(int price)
{
    return price + 4;
}

int total = AddPostage(20) * 2;
Console.WriteLine(total);
---
With `void`, the method returned nothing, so `AddPostage(20) * 2` had
nothing to multiply, and the program did not compile. CS0019 says that the
operator `*` cannot be used with `void` and `int`. With `int` and `return`,
the call `AddPostage(20)` gives a number, and `* 2` can use it.
```

## Methods as input-output machines

In mathematics, a function is a rule that gives *exactly one output* for
each input. $f(x) = x^2$ takes 7 and gives 49, as `Square(7)` did above.
The same input always gives the same output. `Square` is a rule like that,
written in C#, and so is `Encode`: the same message and shift always give
the same code.

Not every method works this way. Some depend on things outside the method.
This method has no `static`. What do you think the cell prints? The two
calls have the same input.

```csharp exec
id: functions-as-input-output-machines-1
double discountRate = 0.10;

double WithDiscount(double price)
{
    return price - price * discountRate;
}

Console.WriteLine(WithDiscount(50));
discountRate = 0.25;
Console.WriteLine(WithDiscount(50));
```

The same input, 50, gave 45 and then 37.5. The answer depends on
`discountRate`, a variable outside the method, so we cannot know what
`WithDiscount(50)` gives by looking at the call. A *pure method* is a
method whose output depends only on its inputs. Pure methods are the
easiest to understand, to test and to trust. `WithDiscount` becomes pure
if the rate is passed in as a second parameter:
`static double WithDiscount(double price, double rate)`.

Every method on this page so far, apart from this one, starts with
`static`. The next cell is the same program, with `static` in front of
`double WithDiscount`. It is meant to fail. Which name in the method do you
think the compiler will point to?

```csharp exec
id: functions-as-input-output-machines-2
expect: CS8421
double discountRate = 0.10;

static double WithDiscount(double price)
{
    return price - price * discountRate;
}

Console.WriteLine(WithDiscount(50));
discountRate = 0.25;
Console.WriteLine(WithDiscount(50));
```

It did not compile, so nothing ran:

```console
Program.cs(5,28): error CS8421: A static local function cannot contain a reference to 'discountRate'.
```

`static` in front of a method means that the method can use only its
parameters and the variables it makes itself. It cannot use a variable
that the program's other lines made, such as `discountRate`. The compiler
checks this before the program runs. So `static` helps to keep a method
pure, and that is why this page writes it in front of almost every method.

### Your turn

Some methods undo others. Decoding undoes encoding, and mirroring a picture
twice gives the picture you started with.

<div class="dl-world" data-world="secret-messages">

Can you write `Decode(string message, int shift)`, which undoes `Encode`?
It should move each capital letter `shift` places back. Can you do it by
calling `Encode`?

Each Run starts a new program, so this cell needs its own copy of
`Encode`. Can you copy yours from the task above into the space at the top
of the cell?

```csharp exec
id: your-turn-5--secret-messages
// Copy your Encode method to here.

static string Decode(string message, int shift)
{
    // Your code: can Decode call Encode?
    return "";
}

Console.WriteLine(Decode("KHOOR", 3));
```

```inputs
Decode("KHOOR", 3)
Decode(Encode("OTTER", 5), 5)
Decode("URYYB", 13)
```

```hint
after: 1 runs
Moving back 3 places is the same as moving forward -3 places. What does
`Encode(message, -shift)` do?
```

```hint
after: 1 errors
Does the message say CS0103, and name `Encode`? Your `Encode` is in
another cell, and each Run starts a new program. Can you copy it into this
cell?
```

```hint
after: 3 runs
Does one case give a character that is not a letter? What does `%` give
when the number in front of it is below zero?
```

```solution
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

Console.WriteLine(Decode("KHOOR", 3));
---
`Decode` is one line, because `Encode` already does the work. This
solution brings its own `Encode`, in case yours is not finished.

Its `Encode` adds 26 before the last `% 26`. Decoding moves a letter
back, so a letter near the start of the alphabet gets a position below
zero, and in C#, `%` keeps the minus sign. Without the extra 26, that
position does not become a letter. If your `Encode` has no `+ 26`,
compare the third case, `Decode("URYYB", 13)`, with this one's.
[The closer look at dividing](lesson:dividing-in-csharp) explains the
remainder below zero.

`Decode(Encode("OTTER", 5), 5)` gives `OTTER`: decoding undoes encoding.
```

</div>

<div class="dl-world" data-world="pixel-art">

When we mirror a picture, so that it faces the other way, column 0 goes to
the last column, and the last column goes to column 0. For a picture
`width` pixels wide, can you write `Mirror(int x, int width)`, which
returns the column that `x` moves to?

```csharp exec
id: your-turn-5--pixel-art
static int Mirror(int x, int width)
{
    // Your code: return the column that x moves to
    return 0;
}

Console.WriteLine(Mirror(0, 8));
```

```inputs
Mirror(0, 8)
Mirror(7, 8)
Mirror(Mirror(3, 8), 8)
```

```hint
after: 1 runs
In a picture 8 pixels wide, the columns are 0 to 7. Column 0 goes to 7,
and column 1 goes to 6. What is the sum of the two numbers in each pair?
```

```solution
static int Mirror(int x, int width)
{
    return width - 1 - x;
}

Console.WriteLine(Mirror(0, 8));
---
Mirroring twice moves every column to where it started, so `Mirror` undoes
itself: `Mirror(Mirror(3, 8), 8)` is 3 again.
```

</div>

## Methods that use other methods

A method can call another method in its own body. How many times does
`SumOfSquares` call `Square`?

```csharp exec
id: functions-that-use-other-functions-1
static int Square(int number)
{
    return number * number;
}

static int SumOfSquares(int a, int b)
{
    return Square(a) + Square(b);
}

static double Hypotenuse(int a, int b)
{
    return Math.Sqrt(SumOfSquares(a, b));
}

Console.WriteLine(SumOfSquares(3, 4));
Console.WriteLine(Hypotenuse(3, 4));
```

`SumOfSquares` calls `Square` twice. `Hypotenuse` then uses
`SumOfSquares`, and takes the square root with `Math.Sqrt`. This is
Pythagoras' theorem, $a^2 + b^2 = c^2$. In a triangle with a square corner
and sides 3 and 4, the longest side is 5. `Hypotenuse` returns a `double`,
because a square root is not always a whole number.

Each method does one small job, so we can test each one on its own, and
then build bigger methods from the ones we trust. If we find a mistake in
`Square`, we fix it in one place, and every method that uses it is fixed
too.

### Your turn

<div class="dl-world" data-world="secret-messages">

A code-breaker who does not know the shift can try all 26. Can you write
`TryEveryShift(string message)`, which prints each shift beside the message
decoded with it, using your `Decode`? Can you try it on
`"WKLV LV D VHFUHW"`? This cell needs your `Encode` and `Decode` too.

```csharp exec
id: your-turn-7--secret-messages
// Copy your Encode and Decode methods to here.

static void TryEveryShift(string message)
{
    // Your code: one line for each shift from 0 to 25
}

TryEveryShift("WKLV LV D VHFUHW");
```

```hint
after: 1 runs
Which loop gives the shifts 0 to 25? Inside it, one line can print the
shift and `Decode(message, shift)`.
```

```solution
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

static string Decode(string message, int shift)
{
    return Encode(message, -shift);
}

static void TryEveryShift(string message)
{
    for (int shift = 0; shift < 26; shift++)
    {
        Console.WriteLine($"{shift} {Decode(message, shift)}");
    }
}

TryEveryShift("WKLV LV D VHFUHW");
---
One line of the 26 reads as English: shift 3, `THIS IS A SECRET`.
`TryEveryShift` is short, because `Decode` and `Encode` do the rest.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you write `DrawCheckerboard(int width, int height)`, which returns a
whole checkerboard as one string, and uses your `Checker` for each pixel?
`"\n"` in a string starts a new line. This cell needs your `Checker` too.

```csharp exec
id: your-turn-7--pixel-art
// Copy your Checker method to here.

static string DrawCheckerboard(int width, int height)
{
    // Your code: use Checker for each pixel
    return "";
}

Console.WriteLine(DrawCheckerboard(8, 4));
```

```inputs
DrawCheckerboard(4, 2)
DrawCheckerboard(1, 1)
```

```hint
after: 1 runs
Can you start with an accumulator, `string picture = "";`? One loop for the
rows, and inside it one loop for the columns, which adds `Checker(x, y)`
for each pixel. After each row, add `"\n"`.
```

```solution
static string Checker(int x, int y)
{
    if ((x + y) % 2 == 0)
    {
        return "#";
    }
    return ".";
}

static string DrawCheckerboard(int width, int height)
{
    string picture = "";
    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            picture += Checker(x, y);
        }
        picture += "\n";
    }
    return picture;
}

Console.WriteLine(DrawCheckerboard(8, 4));
---
It returns the picture, and does not print it, so that a caller can print
it, store it, or change it first. `Checker` decides each pixel, and
`DrawCheckerboard` only puts the pixels in order.
```

</div>

## Scope: where variables live

A variable's *scope* is the part of a program where its name can be used.
[The closer look at starting a total](lesson:a-total-that-starts-again)
found that a variable made between a loop's curly brackets exists only
inside them. A method's body is between curly brackets too. So a variable
made in a method's body exists only in that method. We say that it is
*local* to the method.

Look at the last line of the next cell. It prints `area`, a variable that
`CalculateArea` makes in its body. The cell is meant to fail. What do you
think the compiler will say about that line? And will the first lines run?

```csharp exec
id: scope-where-variables-live-1
expect: CS0103
static double CalculateArea(double radius)
{
    double pi = 3.14159;
    double area = pi * radius * radius;
    return area;
}

double result = CalculateArea(5);
Console.WriteLine(result);

Console.WriteLine(area);
```

It did not compile:

```console
Program.cs(11,19): error CS0103: The name 'area' does not exist in the current context
```

The name `area` exists only inside `CalculateArea`. Nothing ran, not even
the first lines, because C# checks the whole program before it runs any of
it. Can you delete the last line, and run the cell again?

Local variables help us. Each method has its own workspace. A variable in
one method cannot be confused with a variable in another method, even when
the two have the same name. A parameter is local too: `radius` exists only
inside `CalculateArea`.

When a method is called, each parameter gets a copy of its argument's
value. This is called *passing by value*. If a method gives its parameter a
new value, it changes only its copy, and a variable used as the argument
keeps its value. Problem 18 on the
[practice page](lesson:writing-your-own-functions-practice) shows it. Some
of C#'s own methods also send a value to the caller through a parameter.
`int.TryParse(text, out int number)`, from [Reading input](lesson:reading-input), returns `true`
or `false`, and puts the number it read into `number`. `out` marks a
parameter that the method fills. This page does not write `out` parameters
of its own.

A method written without `static` can use a variable that the program's
lines above it made, outside every method. `discountRate`, earlier on this
page, was one. It is the nearest thing C# has to a *global variable*: a
variable that every part of a program can use. Even so, it is better to
pass values into a method as parameters than to use variables outside it.
Then the method depends on nothing outside it, so we can move it to
another program and test it on its own.

What happens when a method makes a variable with the same name as one
outside it? This method has no `static`, so it could use the `count`
outside. What do you think the cell prints?

```csharp exec
id: scope-where-variables-live-2
int count = 0;

void SetCount()
{
    int count = 10;
    Console.WriteLine($"inside: {count}");
}

SetCount();
Console.WriteLine($"outside: {count}");
```

The line `int count = 10;` has a type in front of it, so it makes a new
variable, local to `SetCount`, and also called `count`. Inside the method,
the name `count` means the new variable: it *hides* the one outside. The
`count` outside is still 0.

What if the line in the method were `count = 10;`, with no type in front of
it? Can you delete `int` from that line, and run the cell? What does the
last line print now?

Without a type in front of it, the line does not make a variable. It gives
the `count` outside a new value. A method that changes a variable outside
it is hard to follow, because nothing in the call `SetCount();` says that
`count` will change. If we want a method to change a value, the clear way
is to return the new value, and let the caller store it:
`count = NewCount();`. A `static` method cannot change a variable outside
it at all, as the discount cell with `static` showed.

### Your turn

In this cell, can you write two methods that each make a variable called
`total` inside them, for different jobs? For example, one could add the
numbers from 1 to a number it is given, and the other could add three
prices it is given as three parameters.

Below the methods, the cell makes a variable `total` of its own, with the
value 1000. Can you call both methods, and print what each one returns?
The last line prints `total`. Is it still 1000? Why do you think so?

```csharp exec
id: your-turn-9
// Two methods that each make a variable called total

int total = 1000;
// Call both methods, and print what each one returns

Console.WriteLine(total);
```

```hint
after: 1 runs
Each method needs a type in front of `total` when it makes it:
`int total = 0;` in one, and `double total = ...;` in the other. What does
each method return?
```

```solution
static int SumUpTo(int last)
{
    int total = 0;
    for (int number = 1; number <= last; number++)
    {
        total += number;
    }
    return total;
}

static double AddThreePrices(double first, double second, double third)
{
    double total = first + second + third;
    return total;
}

int total = 1000;
Console.WriteLine(SumUpTo(10));
Console.WriteLine(AddThreePrices(2.50, 4.00, 1.25));
Console.WriteLine(total);
---
It prints 55, 7.75 and 1000. Each `total` inside a method is a new local
variable, which exists only while that method runs. The methods are
`static`, so they could not change the `total` outside, even by mistake.
```

## Looking back

Which is easier to test: a method that prints its answer, or one that
returns it? Think of the **Compare with a solution** tables on this page.
Could they have shown your answer if your method had only printed it?

A challenge: `TryEveryShift` prints 26 lines, and you find the English one
by eye. Can you make the computer choose? Here is one way. English text has
many E's, so the shift whose decoded message has the most E's is probably
the shift that was used.

```csharp challenge
// Which shift gives the decoded message with the most E's?
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

string message = "WKH HDJOH KDV ODQGHG DW WKUHH";
int bestShift = 0;
// Try every shift, count the E's, and keep the best.
Console.WriteLine($"{bestShift} {Encode(message, -bestShift)}");
```

From now on, when we solve a problem, we often put the solution in a
method, so that we can use it again. Building a large program from small
pieces, each one tested on its own, is called *modular programming*.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:writing-your-own-functions-practice) has
more problems about methods. After it,
[Arrays and lists](lesson:lists-and-sequences) keeps many values under one
name, and our methods start to work on whole lists.

## Where to read more

Microsoft. *Write your first C# method.*
<https://learn.microsoft.com/en-us/training/modules/write-first-c-sharp-method/>.
A course for beginners, in nine parts, with exercises. It writes methods
among a program's other lines, as this page does. Its methods have no
`static`, so they can use the program's variables, and it often writes
them at the end of the program, below the calls, which C# allows too. It
uses Visual Studio Code, which is a different program from Visual Studio.
You do not need it: the whole programs in its second part, *Understand
the syntax of methods*, also run in a cell on this page.
