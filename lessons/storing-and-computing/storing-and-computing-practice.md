---
title: "Variables and types: practice"
version: 2026.09.28.1
from: storing-and-computing-practice
practice_for: storing-and-computing
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Variables and types: practice

These problems are about names, types and text. Spend longer on the ones
about types. In C#, most early compiler errors come from a value whose
type is not the one the code expected. Most problems have an answer under
them, in a fold or a solution, for when you have tried them. Some cells are
meant not to compile, or to stop with an exception, and the problem says
so.

## 1. A copy, or a link

```csharp exec
id: a-copy-or-a-link-1
int mine = 5;
int yours = mine;
mine = 10;
Console.WriteLine(yours);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

`yours` is still 5. The line `int yours = mine;` copied the value 5 into
`yours` at the moment it ran. It did not tie `yours` to `mine`. In maths,
an equation stays true. In C#, `=` is a single instruction, and C# ran it
once.

An `int` is a *value type*: each variable of that type holds its own copy
of the value. Not every type works this way.
[Two names, one list](lesson:two-names-one-list) shows a type where two
names share one thing.

</details>

## 2. Swap them

Can you swap the values of `first` and `second`, so that `first` has what
`second` had, and `second` has what `first` had?

```csharp exec
id: swap-them-1
string first = "left";
string second = "right";
// swap them here

Console.WriteLine($"{first} {second}");
```

```inputs
first
second
```

```solution
title: with what you've met so far
string first = "left";
string second = "right";
string spare = first;
first = second;
second = spare;
Console.WriteLine($"{first} {second}");
---
Without `spare`, the line `first = second;` would come first. It would
replace the value of `first` that you still need.
```

```solution
title: a shorter way you'll meet later
string first = "left";
string second = "right";
(first, second) = (second, first);
Console.WriteLine($"{first} {second}");
---
C# can swap two variables in one line. It finds both values on the right
of the `=` before it gives either variable a new one.
```

## 3. Names that explain

Can you rename these so that a person reading the code can tell what it
does?

```csharp exec
id: names-that-explain-1
int x = 64;
int y = 48;
int z = x * y;
Console.WriteLine(z);
```

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

```csharp
int width = 64;
int height = 48;
int pixels = width * height;
Console.WriteLine(pixels);
```

The arithmetic is the same, and now the code says what it is about.

</details>

## 4. What type is it

Can you say the type of each of these?
`42`, `42.0`, `"42"`, `'4'`, `true`, `4 / 2`, `4.0 / 2`, `"4" + "2"`,
`"4" + 2`

To check one, put it in a variable of the type you think it is. If the
type does not fit, the program does not compile, and the message names
both types.

```csharp exec
id: what-type-is-it-1
int check = 4 / 2;
Console.WriteLine(check);
```

<details class="dl-answer"><summary>answer</summary>

`int`, `double`, `string`, `char`, `bool`, `int`, `double`, `string`,
`string`.

Two of these surprise people who know Python. `4 / 2` is an `int` in C#,
because two `int` values give an `int`. And `"4" + 2` is a `string`,
because `+` with a string on one side joins.

</details>

## 5. A number times some text

This cell shows what C# does with a number times some text. Whatever
happens when you run it is meant to happen, and nothing is broken. What do
you think it does?

```csharp exec
id: a-number-times-some-text-1
expect: CS0019
Console.WriteLine(5 * "3");
```

```predict
type: choice

What will happen?

- It prints 15
  - This reads "3" as the number it looks like.
- It prints 33333
  - Some languages repeat the text. Python does.
- Nothing: the program does not compile
  - Multiplying text by a number sounds like it should not work.
```

What do `"5" + "3"` and `"5" + 3` do? This cell has both.

```csharp exec
id: a-number-times-some-text-2
Console.WriteLine("5" + "3");
Console.WriteLine("5" + 3);
```

<details class="dl-answer"><summary>why</summary>

`5 * "3"` does not compile. The message is:

```console
Program.cs(1,19): error CS0019: Operator '*' cannot be applied to operands of type 'int' and 'string'
```

*Operands* are the values on each side of an operator. C# has no `*` for a
number and a string, so the compiler stops before anything runs.

`"5" + "3"` joins two pieces of text: `53`. And `"5" + 3` gives `53` too.
With a string on one side, `+` converts the other side to text and joins.
A later page, [Compiler errors](lesson:compiler-errors), has more on compiler messages.

</details>

## 6. Text that looks like a number

Why does `int.Parse("3.7")` stop with an exception, when `(int)3.7` gives
3? This cell has both. The second line is meant to stop with an exception.

```csharp exec
id: text-that-looks-like-a-number-1
expect: exception
Console.WriteLine((int)3.7);
Console.WriteLine(int.Parse("3.7"));
```

<details class="dl-answer"><summary>answer</summary>

`(int)3.7` takes a `double` and keeps the whole part. `int.Parse("3.7")`
takes a *string* and reads it as a whole number, and the text "3.7" is
not a whole number. So the program stops with a `FormatException`: *The
input string '3.7' was not in a correct format.*

`double.Parse("3.7")` can read it. Can you use it, and then a cast, to get
the whole part of `"3.7"`?

</details>

## 7. Cutting, or rounding

```csharp exec
id: cutting-or-rounding-1
Console.WriteLine((int)-3.7);          // a cast
Console.WriteLine(Math.Floor(-3.7));   // rounding down
Console.WriteLine(Math.Round(-3.7));   // rounding to the nearest whole number
Console.WriteLine(Math.Round(3.7));
```

```predict
type: number

What will the first line print?
```

What will the other three lines print? Say what you think, then run it.

<details class="dl-answer"><summary>why</summary>

The first line prints −3. A cast to `int` removes the part after the
decimal point, which moves the number towards zero. That is called
*truncating*. Rounding down gives −4, and `Math.Floor(-3.7)` does that.
Truncating and rounding down agree on numbers above zero, and differ on
numbers below it. This difference can hide in code for months.

`Math.Round` rounds to the nearest whole number. `Math.Round(-3.7)` is −4
too, but `Math.Round(3.7)` is 4, where `(int)3.7` is 3, as problem 6
showed.

</details>

## 8. The word False

```csharp exec
id: the-word-false-1
Console.WriteLine(bool.Parse("False"));
```

```predict
type: choice

What will it print?

- True
  - In some languages, any text that is not empty counts as true,
    whatever it says.
- False
  - This reads what the text says.
```

<details class="dl-answer"><summary>why</summary>

`False`. `bool.Parse` reads what the text says, and it knows two words,
`true` and `false`. What does it do with `"FALSE"`, or with other text,
such as `"yes"`? You can try them in the cell.

</details>

Some languages, Python among them, treat 0 as false and any other number
as true. Does C#? This cell is meant not to compile.

```csharp exec
id: the-word-false-2
expect: CS0029
bool member = 1;
Console.WriteLine(member);
```

<details class="dl-answer"><summary>the message</summary>

```console
Program.cs(1,15): error CS0029: Cannot implicitly convert type 'int' to 'bool'
```

C# never treats a number or a piece of text as a `bool`. A `bool` is
`true` or `false`, and nothing else.

</details>

## 9. 25 plus 1 is 251

This program asks for an age and adds 1. Somebody typed 25, and it printed
`251`. You can run it and type 25 too. What happened? Can you change the
program so that it prints 26?

```csharp exec
id: twenty-five-plus-one-1
stdin: "25\n"
Console.Write("How old are you? ");
string age = Console.ReadLine();
Console.WriteLine(age + 1);
```

```solution
Console.Write("How old are you? ");
int age = int.Parse(Console.ReadLine());
Console.WriteLine(age + 1);
---
`Console.ReadLine()` always gives a string, so `age + 1` joined `"25"` and
`1` into `251`. `int.Parse` converts the text to a number the moment it
arrives, and then `+` adds.
```

## 10. Past the end

<div class="dl-world" data-world="secret-messages">

A code called ROT13 moves every letter 13 places along. Can you use the
Caesar shift from the lesson to find what N becomes? Then can you move the
answer 13 places again? What do you notice?

```csharp exec
id: thirteen-places-along-1--secret-messages
char letter = 'N';
int shift = 13;
Console.WriteLine($"{letter}, moved {shift} places along:");
```

```inputs
newLetter
```

```solution
char letter = 'N';
int shift = 13;
int position = letter - 'A';
int moved = (position + shift) % 26;
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
int movedAgain = (moved + shift) % 26;    // the answer, moved 13 places again
Console.WriteLine((char)(movedAgain + 'A'));
---
N becomes A, and A moved 13 places becomes N again. There are 26 letters,
so two moves of 13 make a full circle: ROT13 decodes itself. People once
used it online to hide the end of a joke or a spoiler.
```

</div>

<div class="dl-world" data-world="pixel-art">

A pixel's red is 200, and a brush adds 100 to it. A colour stops at 255,
so the brush should stop there. Can you find what `%` would do to 300, if
it started again at 0 after 255, like a clock with 256 steps? And why would
a brush not want that?

```csharp exec
id: thirteen-places-along-1--pixel-art
int red = 200;
int brighter = red + 100;

```

```inputs
brighter % 256
```

```solution
int red = 200;
int brighter = red + 100;
Console.WriteLine(brighter % 256);
---
`300 % 256` is 44: starting again after 255 turns a bright red almost
black. A remainder fits a clock or an alphabet, which really do start
again. A colour does not.
[Decisions](lesson:making-decisions) has what you need to stop at 255
instead.
```

</div>

## 11. Point one plus point two

In this cell, `==` asks whether two values are equal, and gives a `bool`.
[The equals sign](lesson:equals-three-ways) looks at it closely.

```csharp exec
id: floating-point-1
Console.WriteLine(0.1 + 0.2);
Console.WriteLine(0.1 + 0.2 == 0.3);
```

```predict
type: choice

What will the last line print?

- True
  - 0.1 and 0.2 do make 0.3. There is
    [a closer look at this](lesson:dividing-in-csharp).
- False
  - A computer cannot store 0.1 exactly.
```

<details class="dl-answer"><summary>why</summary>

0.1 and 0.2 cannot be stored exactly in binary, in the same way that a
third cannot be written exactly in decimal (0.333…). The computer stores
each as the nearest number it can, and the two small differences do not
cancel. The sum is 0.30000000000000004, which is different from 0.3 in the
seventeenth decimal place. That rarely matters, except when you ask
whether two values are exactly equal.

To compare two `double` values, ask whether they are close enough:
`Math.Abs(a - b) < 1e-9`. `Math.Abs` gives a number without its minus
sign, and `1e-9` is how C# writes 0.000000001. The limit depends on what
the numbers are. Money in cents needs a different limit from the distance
between stars.

</details>

## 12. Exact in binary

Which of these can a `double` store exactly? `0.5`, `0.25`, `0.1`,
`0.75`, `0.3`

<details class="dl-answer"><summary>answer</summary>

`0.5`, `0.25` and `0.75` are exact. `0.1` and `0.3` are not. A number is
exact in binary when it is made of halves, quarters, eighths and so on. A
tenth is not, because 10 has a factor of 5, and binary has only 2s to work
with. A third is not exact in decimal for the same reason.

</details>

## 13. Hours and minutes

Can you change a number of minutes to hours and minutes, with clear names,
and print it with a `$` string?

```csharp exec
id: hours-and-minutes-1
int totalMinutes = 500;
Console.WriteLine(totalMinutes);
```

```inputs
hours
minutes
```

```solution
int totalMinutes = 500;
int hours = totalMinutes / 60;
int minutes = totalMinutes % 60;
Console.WriteLine($"{totalMinutes} minutes is {hours} hours and {minutes} minutes");
---
8 hours and 20 minutes. With two `int` values, `/` keeps only the whole
part, which is what we want here, and `%` gives what is left.
```

## 14. Counting in cents

A shop's till stores prices in euro as `double`. Two items cost €1.10 and
€2.20. What does the till show for the total?

```csharp exec
id: counting-in-cents-1
Console.WriteLine(1.10 + 2.20);
```

What should the till store instead?

<details class="dl-answer"><summary>answer</summary>

Whole cents, as `int`. The two prices are 110 and 220 cents, and adding
whole numbers is always exact. The till divides by 100 only when it shows
the total. Real payment systems work this way. When a quantity is made of
whole small units, store the whole units. A `double` is for measurements.
For counting, use `int`.

C# also has a type made for money, `decimal`. A number with `m` after it,
like `1.10m`, is a `decimal`, and it stores tenths and hundredths exactly.
What does `1.10m + 2.20m` print? You can try it in the cell.

</details>

## 15. Four answers from two values

```csharp exec
id: four-answers-from-two-values-1
string text = "10";
int number = 5;
Console.WriteLine(text + number);
Console.WriteLine(int.Parse(text) + number);
Console.WriteLine(number + number + text);
Console.WriteLine(text + number + number);
```

```predict
type: number

What will the last line print?
```

<details class="dl-answer"><summary>why</summary>

`105`, then `15`, then `1010`, then `1055`. The same two values give four
different answers. The types decide every one, and so does the order: C#
does the `+` signs from left to right. In the last line, `text + number`
is the string `105`, so the second `+` joins again.

</details>

## 16. An interpolated string instead

Can you rewrite the last line with `$"..."`, and without `+`?

```csharp exec
id: an-f-string-instead-1
string name = "Aoife";
int age = 34;
Console.WriteLine("Hello, " + name + ". You are " + age + " years old.");
```

```solution
string name = "Aoife";
int age = 34;
Console.WriteLine($"Hello, {name}. You are {age} years old.");
---
The `$` string converts `age` to text for you. If you forget the `$`, C#
prints the curly brackets and the names as they are, with no error, so
that slip is easy to miss.
```

## 17. Decimal places

```csharp exec
id: putting-values-into-text-practice-1
double share = 2.0 / 3;    // 2.0, so that the division keeps its decimal places
Console.WriteLine($"{share:F0}");
Console.WriteLine($"{share:F2}");
Console.WriteLine($"{share:F4}");
Console.WriteLine($"{5:F2}");
```

```predict
type: number

What will the first line print?
```

What will the other three lines print? Say what you think, then run it.

<details class="dl-answer"><summary>why</summary>

The first line prints `1`. With no decimal places, 0.666… rounds up to 1.
`:F2` gives `0.67`, `:F4` gives `0.6667`, and `$"{5:F2}"` gives `5.00`. So
`:F2` can add places as well as remove them. That is useful for prices.

</details>

## 18. A price from cents

The till's total is `int totalCents = 1234;`. Can you print it as
`Total: €12.34`?

```csharp exec
id: a-price-from-cents-1
int totalCents = 1234;
Console.WriteLine(totalCents);
```

```solution
title: with F2
int totalCents = 1234;
Console.WriteLine($"Total: €{totalCents / 100.0:F2}");
---
Inside the curly brackets, a small calculation works as well as a name.
`100.0` has a decimal point, so the division keeps the cents. What does
`totalCents / 100` give? And what does `:F2` change when the total is a
whole number of euro, such as 500 cents? You can try both.
```

```solution
title: with C
int totalCents = 1234;
Console.WriteLine($"Total: {totalCents / 100.0:C}");
---
`:C` is for *currency*. It shows the number as money, with the euro sign
and 2 decimal places, the way Ireland writes it. On this page C# always
uses Ireland's way, and so does a project from **Download project**. A
new project that you make in Visual Studio uses the region your computer
is set to, so there `:C` may show a different currency.
```

## 19. A letter that stays

`word[0]` is the first character of `word`. This cell tries to change it to
B, and it is meant not to compile. What does the message say?

```csharp exec
id: a-letter-that-stays-1
expect: CS0200
string word = "CAT";
word[0] = 'B';
Console.WriteLine(word);
```

Can you make the cell print BAT, without changing a character inside
`word`?

```solution
string word = "CAT";
word = word.Replace("C", "B");
Console.WriteLine(word);
---
`Replace` makes a new string, and `word = ` gives that new string the name
`word`. The old string, CAT, does not change. Nothing uses it any more.
```

<details class="dl-answer"><summary>the message</summary>

```console
Program.cs(2,1): error CS0200: Property or indexer 'string.this[int]' cannot be assigned to -- it is read only
```

*Read only* means the code can read it, but it cannot change it. A string
in C# can never be changed once it is made.

</details>

## 20. Allowed names

Which of these can be variable names in C#? For the ones that cannot, can
you say why?

`total`, `2ndPlace`, `first name`, `_hidden`, `class`, `int`, `Total`,
`total_2`, `my-name`

```csharp exec
id: allowed-names-1
// Try a name here, and see what the compiler says
int total = 1;
Console.WriteLine(total);
```

<details class="dl-answer"><summary>answer</summary>

Allowed: `total`, `_hidden`, `Total`, `total_2`. C# programmers would
write `total2` rather than `total_2`, but the compiler accepts both.

- `2ndPlace`: a name cannot start with a digit.
- `first name`: a name cannot contain a space. C# reads it as two
  separate names.
- `class` and `int`: these are keywords, which C# keeps for its own use.
- `my-name`: the hyphen is a minus sign, so C# reads it as `my - name`.

When a name is not allowed, the compiler's message may use the word
*identifier*. An *identifier* is the compiler's word for a name.

`Total` is allowed, and it is a different variable from `total`. If you
confuse the two, the compiler may not notice, because both names are
allowed.

</details>
