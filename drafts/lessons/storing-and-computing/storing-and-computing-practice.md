---
title: "Variables, types and text: practice"
version: 2026.09.27.1
from: storing-and-computing-practice
practice_for: storing-and-computing
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
---

# Variables, types and text: practice

These problems are about names, types and text. Take your time with the
ones about types. In C#, most early compiler errors come from a value whose
type is not the one the code expected. Each problem has an answer in a
fold under it, for when you have tried it. Some cells are meant not to
compile, or to stop with an exception, and the problem says so.

## 1. Allowed names

Which of these can be variable names in C#? For the ones that cannot, can
you say why?

`total`, `2ndPlace`, `first name`, `_hidden`, `class`, `Total`,
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
- `class`: this is a keyword, which C# keeps for its own use.
- `my-name`: the hyphen is a minus sign, so C# reads it as `my - name`.

For `2ndPlace` and `class`, the compiler's first message is `error CS1001:
Identifier expected`. An *identifier* is the compiler's word for a name.

`Total` is allowed, and it is a different variable from `total`. If you
confuse the two, the compiler may not notice, because both names are
allowed.

</details>

## 2. A copy, or a link

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

## 3. Swap them

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
title: a shorter way C# has
string first = "left";
string second = "right";
(first, second) = (second, first);
Console.WriteLine($"{first} {second}");
---
C# can swap two variables in one line. It finds both values on the right
of the `=` before it gives either variable a new one.
```

## 4. Names that explain

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

## 5. What type is it

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

You can also ask a value for its type: `(4 / 2).GetType()` gives
`System.Int32`. That is .NET's full name for `int`: a whole number in 32
bits.

</details>

## 6. A number times some text

This cell is here to show what C# does with a number times some text.
What do you think that is?

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

If the cell did not compile, nothing is broken. That is what C# does with
this line, and the message says why.

What do `"5" + "3"` and `"5" + 3` do? You can try them in the same cell.

<details class="dl-answer"><summary>why</summary>

`5 * "3"` does not compile. The message is:

```console
Program.cs(1,19): error CS0019: Operator '*' cannot be applied to operands of type 'int' and 'string'
```

*Operands* are the values on each side of an operator. C# has no `*` for a
number and a string, so the compiler stops before anything runs.

`"5" + "3"` joins two pieces of text: `53`. And `"5" + 3` gives `53` too.
With a string on one side, `+` converts the other side to text and joins.
(There is more on compiler messages in
[Reading an error message](lesson:reading-an-error-message).)

</details>

## 7. Text that looks like a number

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
takes a *string* and reads it as a whole number, and "3.7" is not a whole
number written down. So the program stops with a `FormatException`: *The
input string '3.7' was not in a correct format.*

`double.Parse("3.7")` works, and `(int)double.Parse("3.7")` gives 3 by
doing the two steps in order.

</details>

## 8. Cutting, or rounding

```csharp exec
id: cutting-or-rounding-1
Console.WriteLine((int)-3.7);
```

```predict
type: number

What will it print?
```

<details class="dl-answer"><summary>why</summary>

−3. A cast to `int` removes the part after the decimal point, which moves
the number towards zero. That is called *truncating*. Rounding down would
give −4, and `Math.Floor(-3.7)` does. Truncating and rounding down agree on
positive numbers and differ on negative ones. This difference can hide in
code for months.

To round to the nearest whole number, C# has `Math.Round`. `Math.Round(-3.7)`
is −4 too, but `Math.Round(3.7)` is 4, where `(int)3.7` is 3.

</details>

## 9. The word False

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
`true` and `false`, with any mix of capitals. Other text stops the program
with a `FormatException`: try `bool.Parse("yes")`.

Some languages, Python among them, treat 0 and empty text as false, and
everything else as true. C# never treats a number or a string as a `bool`.
`bool member = 1;` does not compile: *Cannot implicitly convert type 'int'
to 'bool'*.

</details>

## 10. 25 plus 1 is 251

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

## 11. Past the end

<div class="dl-world" data-world="secret-messages">

A code called ROT13 moves every letter 13 places along. Can you use the
Caesar shift from the lesson to find what N becomes? Then can you move the
answer 13 places again? What do you notice?

```csharp exec
id: thirteen-places-along-1--secret-messages
char letter = 'N';
int shift = 13;

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
(byte)brighter    // byte: a whole number from 0 to 255
```

```solution
int red = 200;
int brighter = red + 100;
Console.WriteLine(brighter % 256);
---
`300 % 256` is 44: starting again after 255 turns a bright red almost
black. A remainder fits a clock or an alphabet, which really do start
again. A colour does not.
[Making decisions](lesson:making-decisions) shows how to stop at 255
instead.

C# has a type for one colour channel: `byte`, a whole number from 0 to 255
in one byte of memory. A cast to `byte` starts again after 255 in the same
way, so `(byte)brighter` is 44 too.
```

</div>

## 12. Point one plus point two

In this cell, `==` asks whether two values are equal, and gives a `bool`.
[Equals, three ways](lesson:equals-three-ways) looks at it closely.

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

## 13. Exact in binary

Which of these can a `double` store exactly? `0.5`, `0.25`, `0.1`,
`0.75`, `0.3`

<details class="dl-answer"><summary>answer</summary>

`0.5`, `0.25` and `0.75` are exact. `0.1` and `0.3` are not. A number is
exact in binary when it is made of halves, quarters, eighths and so on. A
tenth is not, because 10 has a factor of 5, and binary has only 2s to work
with. A third is not exact in decimal for the same reason.

</details>

## 14. Hours and minutes

Can you change a number of minutes to hours and minutes, with clear names,
and print it with a `$` string?

```csharp exec
id: hours-and-minutes-1
int totalMinutes = 500;

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

## 15. Counting in cents

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
Try `1.10m + 2.20m` in the cell: it prints 3.30.

</details>

## 16. Four answers from two values

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

## 17. An interpolated string instead

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

## 18. Decimal places

```csharp exec
id: putting-values-into-text-practice-1
double share = 2.0 / 3;    // 2.0, so that the division keeps its decimal places
Console.WriteLine($"{share:F0}");
```

```predict
type: number

What will it print?
```

Then you can try `:F2` and `:F4`, and `$"{5:F2}"`.

<details class="dl-answer"><summary>why</summary>

`1`. With no decimal places, 0.666… rounds up to 1. `:F2` gives `0.67`,
`:F4` gives `0.6667`, and `$"{5:F2}"` gives `5.00`. So `:F2` can add places
as well as remove them. That is useful for prices.

</details>

## 19. A price from cents

The till's total is `int totalCents = 1234;`. Can you print it as
`Total: €12.34`?

```csharp exec
id: a-price-from-cents-1
int totalCents = 1234;

```

```solution
title: with F2
int totalCents = 1234;
Console.WriteLine($"Total: €{totalCents / 100.0:F2}");
---
Inside the curly brackets, a small calculation works as well as a name.
`100.0` has a decimal point, so the division keeps the cents:
`totalCents / 100` would give 12. The `:F2` matters when the total is a
whole number of euro: 500 cents prints as `€5.00`, not `€5`.
```

```solution
title: with C
int totalCents = 1234;
Console.WriteLine($"Total: {totalCents / 100.0:C}");
---
`:C` is for *currency*. It shows the number as money, with the euro sign
and 2 decimal places, the way Ireland writes it. On this page C# always
uses Ireland's way. In Visual Studio, `:C` uses the region your computer
is set to, so it may show a different currency.
```

## 20. One past the largest

An `int` holds whole numbers up to 2,147,483,647. What do you think happens
when you add 1 to the largest one? You can run it and see.

```csharp exec
id: one-past-the-largest-1
int largest = int.MaxValue;
int onePast = largest + 1;
Console.WriteLine(largest);
Console.WriteLine(onePast);
```

<details class="dl-answer"><summary>why</summary>

It prints −2,147,483,648, the smallest `int`. An `int` has 4 bytes, and
there is no room in them for a bigger number, so it starts again at the
other end, like the alphabet after Z. This is called *overflow*. C# does
not stop, and it does not warn you.

For bigger whole numbers, C# has `long`. It uses 8 bytes, and
`long.MaxValue` is 9,223,372,036,854,775,807.

</details>

## 21. A letter that stays

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
