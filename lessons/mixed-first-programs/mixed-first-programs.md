---
title: "Mixed problems: first programs"
version: 2026.09.28.3
from: mixed-programming
covers: [PDP-LO4, PDP-LO6, PDP-LO7, PDP-LO9, PDP-LO10]
---

# Mixed problems: first programs

Every problem on this page needs more than one page of this series, and
none of them says which. That is on purpose. A problem does not say that it
needs a loop with a decision inside it, or a type that holds larger
numbers. Seeing that is a skill of its own, and this page is practice for
it.

Many of the problems hide a decision that the question does not make:
whether zero counts as even, or whether €50 is "over €50". Where a problem
hides one, its solution says what it decided, and why. Your program can
decide another way and work too. A comment in the code is the place to say
which way you decided.

Try each problem before you open anything under it. Some cells are meant
not to compile, or to stop with an exception, and the problem says so
before you run them. Each Run starts a new program, and no cell needs
anything from the cells above it, so you can do the problems in any order.
They go from shorter to longer.

## 1. Six lines

What does each line print? Can you write your guess in the comment beside
it, and then run the cell?

```csharp exec
id: six-lines-1
Console.WriteLine(7 / 2);        // I think:
Console.WriteLine(7 / 2.0);      // I think:
Console.WriteLine(-7 / 2);       // I think:
Console.WriteLine("7" + 2);      // I think:
Console.WriteLine('7' + 2);      // I think:
Console.WriteLine((int)7.9);     // I think:
```

Which lines printed what you wrote? For each line that did not, what do
you think C# did?

<details class="dl-answer"><summary>why</summary>

- `7 / 2` is 3. Both numbers are whole numbers, so `/` gives a whole
  number, and drops the part after the point.
- `7 / 2.0` is 3.5. `2.0` has a decimal point, so the division keeps the
  decimal part.
- `-7 / 2` is -3. C# drops the part after the point here too. For a number
  below zero, that moves the answer up, towards zero.
- `"7" + 2` is 72. One side of the `+` is a string, so C# changes the 2 to
  text, and joins the two.
- `'7' + 2` is 57. `'7'` is a `char`, and every `char` is stored as a
  number. Arithmetic on a `char` uses that number, and gives an `int`. So
  57 is 2 more than the number that the character 7 is stored as.
- `(int)7.9` is 7. A cast to `int` keeps the whole part. It does not
  round.

</details>

## 2. Even, odd and zero

How many of the whole numbers from -3 to 6 are even? How many are odd, and
how many are zero? Can you make the loop count them?

```csharp exec
id: even-odd-and-zero-1
int even = 0;
int odd = 0;
int zero = 0;
for (int number = -3; number <= 6; number++)
{
    // Count this number here.
}
Console.WriteLine($"even {even}, odd {odd}, zero {zero}");
```

```inputs
even
odd
zero
```

```hint
after: 2 runs
Which questions does the loop's body need to ask about each number? Can one
number say yes to more than one of them?
```

```hint
after: 3 runs
How many odd numbers does your program count? Is -3 odd? What does
`-3 % 2` give in C#? You can print it.
```

```solution
int even = 0;
int odd = 0;
int zero = 0;
// Zero is even, so it is counted twice: once as even, and once as zero.
for (int number = -3; number <= 6; number++)
{
    if (number % 2 == 0)
    {
        even++;
    }
    else
    {
        odd++;
    }
    if (number == 0)
    {
        zero++;
    }
}
Console.WriteLine($"even {even}, odd {odd}, zero {zero}");
---
It prints `even 5, odd 5, zero 1`. The question hides a decision: is zero
even, or a group of its own? Zero is even, because 2 divides it with
nothing left. So this solution counts it twice, and the three counts
together are more than the numbers in the loop. A program that counts zero
only as zero decides the other way, and works too. Either way, a comment
says which.

The test for odd is the `else`: every number that is not even. A test of
`number % 2 == 1` misses the odd numbers below zero. In C#, a remainder
has the same sign as the number before the `%`, so for an odd number below
zero, `number % 2` is below zero too.
```

## 3. FizzBuzz

FizzBuzz is a counting game. The players count from 1, and each player
says the next number. A *multiple* of 3 is a number that 3 divides with
nothing left. For a multiple of 3, the player says Fizz, not the number.
For a multiple of 5, they say Buzz, and for a multiple of both 3 and 5,
FizzBuzz. Programmers often use the game as a small test in job
interviews. This program plays it from 1 to 15.

```csharp exec
id: fizzbuzz-1
for (int number = 1; number <= 15; number++)
{
    if (number % 3 == 0)
    {
        Console.WriteLine("Fizz");
    }
    else if (number % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else if (number % 15 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else
    {
        Console.WriteLine(number);
    }
}
```

```predict
type: choice

What will the last line print?

- FizzBuzz
  - 15 is a multiple of 3 and of 5, and the program has a path for that.
- Fizz
  - C# runs the first path whose condition is `true`.
- Buzz
- 15
```

The last line is `Fizz`, and the program never prints `FizzBuzz` at all.
Can you change it, so that 15 is FizzBuzz? When it is, can you make it
count to 100?

```hint
after: guess differed
Which condition does 15 meet first? Once C# has taken a path, does it ask
the conditions under it?
```

```hint
after: 2 runs
Which of the three conditions should C# ask first?
```

```solution
title: with else if
for (int number = 1; number <= 15; number++)
{
    if (number % 15 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else if (number % 3 == 0)
    {
        Console.WriteLine("Fizz");
    }
    else if (number % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else
    {
        Console.WriteLine(number);
    }
}
---
The last line is now `FizzBuzz`. The order is the whole problem. C# runs
the first path whose condition is `true`, and 15 is a multiple of 3, so a
test for 3 that comes first takes it. The test for 15 goes first, because
every multiple of 15 is a multiple of 3 and of 5 too.
`number % 3 == 0 && number % 5 == 0` works in place of `number % 15 == 0`.
```

```solution
title: another way, with no test for 15
for (int number = 1; number <= 15; number++)
{
    string word = "";
    if (number % 3 == 0)
    {
        word += "Fizz";
    }
    if (number % 5 == 0)
    {
        word += "Buzz";
    }
    if (word == "")
    {
        word = number.ToString();
    }
    Console.WriteLine(word);
}
---
This one never asks about 15. It builds the word: Fizz for a multiple of
3, and then Buzz for a multiple of 5, so a multiple of both gets both.
Each `if` is separate, not an `else if`, because a number can say yes to
both. Only a number with no word is printed as a number. To add a rule,
such as Bazz for a multiple of 7, this version needs one more `if`, and
its other lines stay as they are.
```

## 4. Threes and fives

Start at 1. How many whole numbers below 1,000 are multiples of 3 or of 5,
that is, numbers that 3 or 5 divides with nothing left? And what is their
total? Can you make the program find both?

```csharp exec
id: threes-and-fives-1
int count = 0;
int total = 0;

Console.WriteLine($"{count} numbers, with a total of {total}");
```

```inputs
count
total
```

```hint
after: 2 runs
Which loop gives the whole numbers below 1,000? Which question does its
body ask about each one?
```

```hint
after: 3 runs
Is 1,000 below 1,000? Which comparison stops before it?
```

```solution
int count = 0;
int total = 0;
for (int number = 1; number < 1000; number++)
{
    if (number % 3 == 0 || number % 5 == 0)
    {
        count++;
        total += number;
    }
}
Console.WriteLine($"{count} numbers, with a total of {total}");
---
It prints `466 numbers, with a total of 233168`. `||` asks "3 or 5", so a
number that both divide, such as 15, is counted once. "Below 1,000" does
not include 1,000, though 5 divides it, so the loop's condition is `<`,
not `<=`. A question that says "up to" or "from … to" wants `<=`.
```

When your program works, what is the total of the numbers below 100,000?
Does that total make sense?

<details class="dl-answer"><summary>what happens</summary>

The total is below zero, and a total of whole numbers above zero cannot be
below zero. The total grew too large for an `int`, and C# started
again from the smallest `int`, with no message. The count is still a number
that makes sense, because it grows much more slowly. A `long` holds the
total: `long total = 0;` is the only change.

</details>

## 5. Tickets for a group

A cinema sells tickets at €10 each, or €8 each for a group of 10 or more.
This program asks how many tickets somebody wants, and says the price. It
is meant not to compile. Can you read its first message, and change only
the place it names?

```csharp exec
id: tickets-for-a-group-1
expect: CS0103
Console.Write("How many tickets? ");
int tickets = int.Parse(Console.ReadLine());
int price;
if (tickets >= 10)
{
    price = tickets * 8;
}
else if (tickets > 0)
{
    price = tickets * 10;
}
Console.WriteLine($"{tickets} tickets cost €{prise}.");
```

Here is the program with that one change: the last line says `price`, not
`prise`. It is meant not to compile too. How many messages do you expect
now? Run it, and read what the compiler found.

```csharp exec
id: tickets-for-a-group-2
expect: CS0165
stdin: "4\n"
Console.Write("How many tickets? ");
int tickets = int.Parse(Console.ReadLine());
int price;
if (tickets >= 10)
{
    price = tickets * 8;
}
else if (tickets > 0)
{
    price = tickets * 10;
}
Console.WriteLine($"{tickets} tickets cost €{price}.");
```

Can you make this program compile? What should it do when somebody asks
for 0 tickets?

```hint
after: 1 errors
The message says that `price` may have no value on the last line. Is there
a number of tickets for which neither path runs?
```

```hint
after: 2 errors
What should the cinema say to somebody who asks for 0 tickets, or for a
number below 0? Is that a price, or a reason to ask again?
```

```solution
title: with an else
Console.Write("How many tickets? ");
int tickets = int.Parse(Console.ReadLine());
int price;
if (tickets >= 10)
{
    price = tickets * 8;
}
else if (tickets > 0)
{
    price = tickets * 10;
}
else
{
    price = 0;    // no tickets, so no price
}
Console.WriteLine($"{tickets} tickets cost €{price}.");
---
With 4, it prints `4 tickets cost €40.` Every path now gives `price` a
value, so the program compiles. But this version gives a price to any
number of tickets, even one below zero, and prints it as if it were a
sale. That is a decision too, and perhaps not the one the cinema wants.
```

```solution
title: asking again
int tickets;
bool makesSense;
do
{
    Console.Write("How many tickets? ");
    makesSense = int.TryParse(Console.ReadLine(), out tickets) && tickets >= 1;
}
while (!makesSense);

int price;
if (tickets >= 10)
{
    price = tickets * 8;
}
else
{
    price = tickets * 10;
}
Console.WriteLine($"{tickets} tickets cost €{price}.");
---
With 4, it prints `4 tickets cost €40.` too. The program asks again until
it has a whole number of tickets, 1 or more. After that loop, there are
only two cases, so the second path is an `else`, and every path gives
`price` a value. It also no longer stops with an exception when somebody
types a word.
```

<details class="dl-answer"><summary>why the second message waited</summary>

The first program never read `price`. Its last line asked for `prise`, a
name that the compiler did not know. The compiler checks that a variable
has a value at each line that reads it, and no line read `price`, so there
was nothing to check.

When the last line says `price`, it reads the variable, and the compiler
finds a path to that line that gives it no value. With 0 tickets, or any
number below 1, neither `tickets >= 10` nor `tickets > 0` is `true`. That
second mistake was there from the start, and the first message hid it.

So a new message, after you change one place, does not always mean that
your change added a mistake. It can mean that the compiler can now see
further.

</details>

## 6. The time, some hours ago

It is 2:00 in the morning. This program prints the time on a 24-hour
clock, some hours before now. Its author added 24 before the `%`, so that
the hour would never be below 0.

```csharp exec
id: the-time-some-hours-ago-1
int now = 2;    // 2:00, two o'clock in the morning
for (int hoursBack = 0; hoursBack <= 48; hoursBack += 12)
{
    int then = (now - hoursBack + 24) % 24;    // + 24, so it is never below 0
    Console.WriteLine($"{hoursBack} hours before {now}:00, it was {then}:00.");
}
```

```predict
type: choice

What will the last line print?

- 48 hours before 2:00, it was 2:00.
  - 48 hours is two whole days, so the clock shows the same time.
- 48 hours before 2:00, it was -22:00.
  - Adding 24 once moves the time forward by one day. Is one day enough?
- 48 hours before 2:00, it was 22:00.
```

The last two lines say `-10:00` and `-22:00`, and no clock shows those.
Can you make the program give an hour from 0 to 23, however many hours
back it goes?

```hint
after: guess differed
For which lines is `now - hoursBack + 24` still below 0? What does `%` do
with a number below 0?
```

```hint
after: 2 runs
After `(now - hoursBack) % 24`, the number is always less than 24 hours
from 0, but it can still be below 0. What happens if you add 24 to it, and
then use `% 24` again?
```

```solution
int now = 2;    // 2:00, two o'clock in the morning
for (int hoursBack = 0; hoursBack <= 48; hoursBack += 12)
{
    int then = ((now - hoursBack) % 24 + 24) % 24;    // always from 0 to 23
    Console.WriteLine($"{hoursBack} hours before {now}:00, it was {then}:00.");
}
---
Now 36 hours before 2:00 is 14:00, the same time as 12 hours before, one
day earlier. After the first `% 24`, the number is less than 24 hours
from 0, but it keeps the sign of `now - hoursBack`. Adding 24 then makes
it 0 or more. The second `% 24` changes 24 to 0, and leaves the other
hours as they are. Adding 24 once, as the program did, worked for 12 and
24 hours back, and not for 36 or 48. A Caesar shift that can move a letter
backwards by any number of places needs the same line, with 26 in place of
24.
```

## 7. Two discounts

A *discount* is an amount taken from a price. A shop gives a discount of
10% on an order over €50. Some customers have a *loyalty card*, a card
that the shop gives to people who buy there often. A customer with a card
gets a further discount of €5. This program asks for the order's total,
and whether the customer has a card. `decimal.Parse` reads text as a
`decimal`, in the same way that `int.Parse` reads it as an `int`.
`decimal` is C#'s type for money.

```csharp exec
id: two-discounts-1
stdin: "60\ny\n"
Console.Write("Order total, in euro: ");
decimal orderTotal = decimal.Parse(Console.ReadLine());
Console.Write("Loyalty card? Type y or n: ");
bool loyaltyCard = Console.ReadLine() == "y";
decimal toPay = orderTotal;

// Take the discounts from toPay here.

Console.WriteLine($"To pay: €{toPay:F2}");
```

Can you add the two discounts? When you have, try an order of 60 with a
card, and without one. Then try 50 with a card, and 3 with a card. What
should each one cost?

```hint
after: 2 runs
There are two rules. Each one asks a question with a yes or no answer, and
each one changes `toPay`. Which rule comes first?
```

```hint
after: 1 errors
Does the message say CS0019? A number with a decimal point, such as `0.9`,
is a `double`, and C# will not multiply a `decimal` by a `double`. Which
letter at the end of the number makes it a `decimal`?
```

```hint
after: 3 runs
Is an order of exactly €50 "over €50"? And what should an order of €3
cost with a card?
```

```solution
Console.Write("Order total, in euro: ");
decimal orderTotal = decimal.Parse(Console.ReadLine());
Console.Write("Loyalty card? Type y or n: ");
bool loyaltyCard = Console.ReadLine() == "y";
decimal toPay = orderTotal;

// Exactly €50 is not over €50, so it gets no 10%.
if (toPay > 50)
{
    toPay = toPay * 0.9m;    // 10% less is 90% of the price
}
// The €5 comes after the 10%, and the price never goes below €0.
if (loyaltyCard)
{
    toPay = toPay - 5;
    if (toPay < 0)
    {
        toPay = 0;
    }
}
Console.WriteLine($"To pay: €{toPay:F2}");
---
With 60 and y, it prints `To pay: €49.00`. The question left three
decisions open, and the comments record them. Is exactly €50 "over €50"?
Here it is not, so the test is `>`, not `>=`. Does the €5 come before the
10% or after it? After, because the question says "a further discount".
Taken first, the €5 would make the 10% a little smaller, so the customer
would pay a little more. Can the price go
below zero? No: with a card, a small order costs nothing, and not less
than nothing.

Real instructions are often like this. When a question leaves a decision
open, the program still has to make one. A comment that records it lets
somebody else see the decision, and change it.
```

## 8. Bright pixels

A picture is 256 pixels wide and 256 tall. Each pixel has a brightness,
from 0 for dark to 255 for light. Across the picture, the brightness goes
from dark to light, and then starts again at dark. The program counts the
bright pixels, those with a brightness of 128 or more. Its author wrote a
data dictionary first, a table of each variable's name, type, size and
what it holds. For the count, the author chose a `short`, because a
`short` uses 2 bytes and an `int` uses 4.

```csharp exec
id: bright-pixels-1
short brightPixels = 0;
for (int row = 0; row < 256; row++)
{
    for (int column = 0; column < 256; column++)
    {
        int brightness = (row + column) % 256;
        if (brightness >= 128)
        {
            brightPixels++;
        }
    }
}
Console.WriteLine($"Bright pixels: {brightPixels}");
```

```predict
type: choice

What will it print?

- Bright pixels: 32768
  - Half of the pixels are bright.
- Bright pixels: -32768
  - A count below zero. Where could that come from?
- It stops with an exception
  - The count becomes too large for a `short`, and C# notices.
- It does not compile
  - Can `++` add 1 to a `short`?
```

It prints a count below zero. Which type would you choose for the count,
and why? Can you change the program so that it prints how many pixels are
bright?

```inputs
brightPixels
```

```hint
after: 2 runs
What is the largest value that a `short` can hold? `short.MaxValue` gives
it. Is the number of bright pixels larger than that?
```

```solution
int brightPixels = 0;
for (int row = 0; row < 256; row++)
{
    for (int column = 0; column < 256; column++)
    {
        int brightness = (row + column) % 256;
        if (brightness >= 128)
        {
            brightPixels++;
        }
    }
}
Console.WriteLine($"Bright pixels: {brightPixels}");
Console.WriteLine($"The largest short: {short.MaxValue}");
---
It prints `Bright pixels: 32768`, one more than the largest `short`,
32767. The count passed the largest `short` at its very last step, and
started again from the smallest one, -32768, with no message. An `int`
can hold a much larger count. For one variable, the 2 bytes saved are too
few to matter. A smaller type is worth choosing when a program keeps very
many values, such as the colour of every pixel, and each value is sure to
fit.
```

<details class="dl-answer"><summary>why ++ compiles</summary>

`brightPixels = brightPixels + 1;` does not compile. C# does arithmetic on
a `short` as an `int`, so `brightPixels + 1` is an `int`, and C# will not
put an `int` in a `short` without a cast (CS0266). `++` and `+=` are
different: they change the answer back to the variable's type by
themselves. So they compile, and they also hide the overflow.

</details>

## 9. A calculator that checks what it is given

This calculator asks for two whole numbers and an *operation*, the
calculation to do: `+`, `-`, `*` or `/`. Then it prints the answer. It
trusts whoever uses it: it never checks what they type. Run it, and type
12, then `/`, then 0. It is meant to stop with an exception. Then run it
again, and try the word `twelve` as the first number. Then try 7, `/` and
2.

```csharp exec
id: a-calculator-1
expect: exception
stdin: "12\n/\n0\n"
Console.Write("First number: ");
int first = int.Parse(Console.ReadLine());
Console.Write("+, -, * or /: ");
string operation = Console.ReadLine();
Console.Write("Second number: ");
int second = int.Parse(Console.ReadLine());
switch (operation)
{
    case "+":
        Console.WriteLine($"{first} + {second} = {first + second}");
        break;
    case "-":
        Console.WriteLine($"{first} - {second} = {first - second}");
        break;
    case "*":
        Console.WriteLine($"{first} * {second} = {first * second}");
        break;
    case "/":
        Console.WriteLine($"{first} / {second} = {first / second}");
        break;
    default:
        Console.WriteLine($"There is no operation {operation}.");
        break;
}
```

With 12, `/` and 0, it stops at line 19 with a `DivideByZeroException`.
Can you make the calculator check what it is given, so that it never stops
with an exception, and never gives an answer that nobody meant? Can you
plan it first, as comments? At each question, what could a person type
that the calculator cannot use?

```hint
after: 2 errors
Which lines can stop the program? For each one, what could a person type
that makes it stop?
```

```hint
after: 3 runs
`double.TryParse` works as `int.TryParse` does, for a number that can have
a decimal point. Which operation needs one more check, and what is it?
```

```solution
// Read each number with TryParse, so that a word does not stop the program.
// Use double, so that 7 / 2 keeps its decimal part.
// Check for division by 0 before dividing.
Console.Write("First number: ");
bool firstIsNumber = double.TryParse(Console.ReadLine(), out double first);
Console.Write("+, -, * or /: ");
string operation = Console.ReadLine();
Console.Write("Second number: ");
bool secondIsNumber = double.TryParse(Console.ReadLine(), out double second);

if (!firstIsNumber || !secondIsNumber)
{
    Console.WriteLine("Please type a number each time the calculator asks for one.");
}
else if (operation == "/" && second == 0)
{
    Console.WriteLine("A number cannot be divided by 0.");
}
else
{
    switch (operation)
    {
        case "+":
            Console.WriteLine($"{first} + {second} = {first + second}");
            break;
        case "-":
            Console.WriteLine($"{first} - {second} = {first - second}");
            break;
        case "*":
            Console.WriteLine($"{first} * {second} = {first * second}");
            break;
        case "/":
            Console.WriteLine($"{first} / {second} = {first / second}");
            break;
        default:
            Console.WriteLine($"There is no operation {operation}.");
            break;
    }
}
---
With 12, `/` and 0, it prints `A number cannot be divided by 0.` The
comments at the top are the plan, and they record the three decisions.
`double` means that 7 / 2 gives 3.5, as problem 1 showed, where two `int`
values give 3. `TryParse` means that a word gets a message, not an
exception. And the check for 0 comes before the division. The check
matters with `double` too. A `double` divided by 0 does not stop the
program: it gives infinity, an answer that nobody meant.

This calculator checks once, and says what it wanted. A kinder one would
ask again, with a loop for each number. Those two loops would be the same,
apart from their prompts and their names.
```

A program that checks what it is given deserves test data that tries every
check. *Test data* is the inputs you choose, to try a program with. What
would you type to test this calculator? Can you make a list before you
open the answer?

<details class="dl-answer"><summary>one list</summary>

Here is one answer. Yours may be different and work too.

- one calculation with each operation, with small numbers whose answers
  you know;
- a division whose answer has a decimal part;
- a division by 0, and 0 divided by a number;
- numbers below zero, and numbers with a decimal point;
- a word where a number should be, and an empty line;
- an operation that is not on the list, such as `%`;
- **End input**, at each of the three questions.

</details>

<details class="dl-hint"><summary>which pages each problem uses</summary>

For a teacher, or for anybody who is stuck: these are the pages whose
ideas each problem uses.

| Problem | Pages |
|---|---|
| 1. Six lines | [Your first C# program](lesson:first-steps), [Variables and types](lesson:storing-and-computing), [Dividing](lesson:dividing-in-csharp), [Types and their sizes](lesson:types-and-their-sizes) |
| 2. Even, odd and zero | [Decisions](lesson:making-decisions), [Loops](lesson:repeating-yourself), [Dividing](lesson:dividing-in-csharp) |
| 3. FizzBuzz | [Decisions](lesson:making-decisions), [Loops](lesson:repeating-yourself) |
| 4. Threes and fives | [Decisions](lesson:making-decisions), [Loops](lesson:repeating-yourself), [Types and their sizes](lesson:types-and-their-sizes) |
| 5. Tickets for a group | [Compiler errors](lesson:compiler-errors), [Decisions](lesson:making-decisions), [Reading input](lesson:reading-input) |
| 6. The time, some hours ago | [Dividing](lesson:dividing-in-csharp), [Loops](lesson:repeating-yourself), [Variables and types](lesson:storing-and-computing) |
| 7. Two discounts | [Decisions](lesson:making-decisions), [Types and their sizes](lesson:types-and-their-sizes), [Reading input](lesson:reading-input) |
| 8. Bright pixels | [Types and their sizes](lesson:types-and-their-sizes), [Loops](lesson:repeating-yourself), [Decisions](lesson:making-decisions) |
| 9. A calculator that checks what it is given | [Reading input](lesson:reading-input), [Exceptions](lesson:reading-an-error-message), [Decisions](lesson:making-decisions) |

</details>

## Looking back

Which problem took you longest? Was the hard part the C#, or deciding what
the program should do? Many of the decisions on this page were not about
C# at all: whether zero is even, or whether €50 is over €50. Where did you
record your decisions?

A challenge: can you write a game? The program chooses a whole number from
1 to 100, and the player guesses until they find it. After each guess, the
program says "higher" or "lower". At the end, it says how many guesses the
player took. `Random.Shared.Next(1, 101)` gives a whole number chosen at
random, from the first number up to the second, but not the second
itself: here, 1 to 100. Each run chooses again.

```csharp challenge
// Guess my number: a whole number from 1 to 100.
// Can the program say "higher" or "lower" after each guess,
// and count the guesses until the player finds it?
int secret = Random.Shared.Next(1, 101);
Console.Write("Your guess, 1 to 100: ");
string typed = Console.ReadLine();
Console.WriteLine($"You typed {typed}. The number was {secret}.");
```

In problem 9, the lines that read the two numbers are the same, apart from
their prompts and their names. The next series, *Methods, lists and
algorithms*, starts with [Methods](lesson:writing-your-own-functions). A
method gives lines like those a name, so that a program can use them twice
without writing them twice.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project. There, it prints the same, and a program that
reads input asks its questions in a console window.

## Where to read more

Microsoft. *Branches and loops*, from *A tour of C#*.
<https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/branches-and-loops>.
Microsoft's own lesson on `if`, `else`, `&&`, `||`, and the `while`, `do`
and `for` loops. It ends with a smaller version of problem 4: the numbers
from 1 to 20 that 3 divides, added together. It asks you to run its code
in a GitHub Codespace, which needs a free GitHub account, but you can read
it without one.

Tom Scott (2017). *FizzBuzz: One Simple Interview Question.*
<https://www.youtube.com/watch?v=QPZ0pIK_wsc>. Why FizzBuzz is a common
test for people who apply for jobs as programmers, and how to solve it.
His code is JavaScript, not C#, but the ideas are the ones in problem 3.

Miles, R. *The C# Programming Yellow Book*. Free at
<https://www.robmiles.com/c-yellow-book>. A book for people who have
never programmed. Its early chapters cover the ideas of this series, at
greater length.
