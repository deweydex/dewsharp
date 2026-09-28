---
title: "Decisions: if, else if and else"
version: 2026.09.28.1
from: making-decisions
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO6, PDP-LO4]
---

# Decisions: if, else if and else

A Caesar shift moves letters, and leaves a space or a question mark where
it is. So before a program changes a character, it has to ask what kind of
character it is. C# can answer questions like that with `true` or `false`.
What do you think this cell prints?

```csharp exec
id: which-comes-first-1
Console.WriteLine('A' < 'B');
Console.WriteLine('Z' < 'a');
Console.WriteLine($"Z is stored as {(int)'Z'}, and a as {(int)'a'}");
```

```predict
type: choice

What will the second line print?

- True
  - Every character has a number, and capitals come first.
- False
  - Z is the last letter of the alphabet, so nothing comes after it.
```

The first two lines print `True`. (C# prints a `bool` with a capital
letter, though the code writes `true`.) C# compares two `char` values by
the numbers they are stored as. The last line shows the two numbers: `Z`
is 90 and `a` is 97. So every capital comes before every small letter.

A `string` can hold a single character too. What do you think happens
when we compare two strings in the same way? Whatever happens when you run
it is meant to happen, and nothing is broken.

```csharp exec
id: which-comes-first-2
expect: CS0019
Console.WriteLine("A" < "B");
```

```predict
type: choice

What will happen when you press Run?

- It prints True
  - A comes before B, as it did for the two characters.
- It prints False
- It does not compile, so nothing runs
  - Is a `string` stored as one number, the way a `char` is?
```

It does not compile, so nothing runs. The compiler's message is:

```console
Program.cs(1,19): error CS0019: Operator '<' cannot be applied to operands of type 'string' and 'string'
```

Line 1, column 19 is where `"A" < "B"` starts. An *operand* is one of the
values that an operator uses, so here the operands are `"A"` and `"B"`. C#
has `<` for numbers and for characters, and not for strings. This page
asks questions about single characters, so it uses `char`.

This page is about asking questions like these, and choosing what to do
with the answer.

## Comparisons: true or false?

Before a program can make a decision, it needs a question with a `true` or
`false` answer: a `bool`. C# has six *comparison operators* for this. A
comparison operator compares two values and gives a `bool`.

```csharp exec
id: comparisons-true-or-false-1
Console.WriteLine(5 > 3);     // greater than
Console.WriteLine(5 < 3);     // less than
Console.WriteLine(5 >= 5);    // greater than or equal to
Console.WriteLine(5 <= 4);    // less than or equal to
Console.WriteLine(5 == 5);    // equal to: two equals signs
Console.WriteLine(5 != 3);    // not equal to
```

| Operator | Meaning |
|---|---|
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `==` | equal to |
| `!=` | not equal to |

Look closely at `==`. One equals sign, `=`, stores a value in a variable.
Two, `==`, asks whether two values are equal. People confuse them very
often, both beginners and people who have programmed for years.
[The equals sign](lesson:equals-three-ways) is a closer look at them, with
an experiment that shows the difference.

Before you run the next cell, can you write what you think each line
prints in the comment beside it?

```csharp exec
id: your-turn-1
Console.WriteLine(10 > 10);            // I think:
Console.WriteLine(10 >= 10);           // I think:
Console.WriteLine("abc" == "abc");     // I think:
Console.WriteLine("abc" == "ABC");     // I think:
Console.WriteLine(1 == 1.0);           // I think:
Console.WriteLine('a' == 97);          // I think:
```

`==` on two strings compares their text, character by character. So
`"abc" == "abc"` is `True`, and `"abc" == "ABC"` is `False`, because a
capital is a different character. (Some books about Java warn that `==`
does not compare the text of two strings. In C#, it does.)

The last two lines surprise many people. `1 == 1.0` compares an `int` with a
`double`. C# converts the 1 to a `double` first, and then the two are equal.
`'a' == 97` compares a `char` with an `int`, and C# uses the number that the
`char` is stored as.

A `bool` is different: it is not a number. Some languages, Python among
them, treat `false` as 0 and `true` as 1. C# does not, and this cell is
meant to fail.

```csharp exec
id: comparisons-true-or-false-2
expect: CS0019
Console.WriteLine(0 == false);
```

It does not compile, so nothing runs. The message is:

```console
Program.cs(1,19): error CS0019: Operator '==' cannot be applied to operands of type 'int' and 'bool'
```

The link between logic and arithmetic is older than computers. George
Boole made it in the 1840s: his algebra of logic wrote true as 1 and false
as 0. The word *Boolean*, and C#'s type `bool`, come from his name. C#
keeps the two apart. A question in C# always has a `bool` answer, and a
number is never one.

## If statements: choosing a path

An *if statement* is code that runs only when a condition is `true`. A
*condition* is the question it asks: anything that gives a `bool`.

```csharp exec
id: if-statements-choosing-a-path-1
char character = '?';

if (character == ' ')
{
    Console.WriteLine("A space: leave it where it is.");
}

Console.WriteLine("On to the next character.");
```

The first line of the if statement has two parts: the keyword `if`, and a
condition in round brackets, `(character == ' ')`. The brackets are
required. The lines between the curly brackets, `{` and `}`, are the *body*
of the if statement. The body runs only when the condition is `true`. The
last line comes after the closing curly bracket, so it is not part of the
if statement, and it runs every time.

Here the character is `?`, so only the last line runs. Can you change
`'?'` to `' '`, a space, and run it again?

C# uses the curly brackets to know which lines belong to the if statement.
The spaces at the start of a line, the *indentation*, are for the person
reading the code, and C# ignores them. Visual Studio indents each level
with four spaces, and the code on this page does the same. When the
indentation matches the curly brackets, a reader sees what C# does.

There is no semicolon after `if (character == ' ')`. A semicolon there
ends the if statement before its body, and the practice page shows what
that does.

## If and else: two paths

Often we want one thing when a condition is `true`, and something else when
it is `false`. An *if-else* statement does this. Here a pixel's brightness,
from 0 for black to 255 for white, decides whether it is drawn as `#` or as
`.`.

```csharp exec
id: if-else-two-paths-1
int brightness = 128;
string pixel;

if (brightness >= 128)
{
    pixel = "#";
}
else
{
    pixel = ".";
}

Console.WriteLine(pixel);
```

```predict
type: choice

What will it print?

- #
  - `>=` is true when the two sides are equal, too.
- .
  - 128 is not more than 128.
```

It prints `#`. `>=` means "greater than *or equal to*", so 128 counts. The
body of the `else` runs in every case where the `if` condition is `false`,
so between them the two paths cover every possible brightness.

<details class="dl-why"><summary>Why is <code>pixel</code> made before the <code>if</code>?</summary>

`string pixel;` makes the variable, and gives it no value yet. It comes
before the `if` because a variable made inside curly brackets exists only
inside them. Suppose each body made its own variable instead, with
`string pixel = "#";` and `string pixel = ".";`. Then no `pixel` would
exist after the closing curly bracket, and the last line would not
compile: the compiler would find a name it does not know there. Can you
try it?

Each path then gives `pixel` a value. Before C# uses a variable, it checks
that every path to that line has given it one. The practice page has a
program where one path does not.

</details>

### Your turn

<div class="dl-world" data-world="secret-messages">

A Caesar shift keeps a space as it is, and moves anything else. Can you set
`action` to `"keep"` when `character` is a space, and to `"shift"`
otherwise? The cell makes `action` with an empty value, `""`, so that it
runs before you change anything.

```csharp exec
id: your-turn-2--secret-messages
char character = ' ';
string action = "";

Console.WriteLine($"'{character}': {action}");
```

```inputs
action
```

```hint
after: 1 runs
Which two paths are there? The condition for the first is
`character == ' '`.
```

```hint
after: 1 errors
Does the message name `action`? `action` already exists, from the second
line. Inside the curly brackets, can you give it a new value with no type
in front?
```

```solution
char character = ' ';
string action = "";
if (character == ' ')
{
    action = "keep";
}
else
{
    action = "shift";
}
Console.WriteLine($"'{character}': {action}");
---
Try a letter too, and a question mark. Which path does the question mark
take? The next section gives a program more than two paths.
```

</div>

<div class="dl-world" data-world="pixel-art">

A checkerboard stripe is dark in even columns and light in odd ones. Can
you set `shade` to `"dark"` when the column `x` is even, and to `"light"`
when it is odd? The cell makes `shade` with an empty value, `""`, so that
it runs before you change anything.

```csharp exec
id: your-turn-2--pixel-art
int x = 6;
string shade = "";

Console.WriteLine($"Column {x}: {shade}");
```

```inputs
shade
```

```hint
after: 1 runs
A number is even when its remainder after dividing by 2 is 0. Which
operator gives the remainder?
```

```hint
after: 1 errors
Does the message name `shade`? `shade` already exists, from the second
line. Inside the curly brackets, can you give it a new value with no type
in front?
```

```solution
int x = 6;
string shade = "";
if (x % 2 == 0)
{
    shade = "dark";
}
else
{
    shade = "light";
}
Console.WriteLine($"Column {x}: {shade}");
---
`x % 2 == 0` is the test for "even", and many programs use it. Try
`x = 7` too. The practice page has a surprise about odd numbers below
zero.
```

</div>

## Else if: many paths

Sometimes there are more than two cases. `else if` adds another condition,
so a program can have as many paths as it needs. Here a brightness picks
one of four characters, from dark to light.

```csharp exec
id: elif-multiple-paths-1
int brightness = 200;
string pixel;

if (brightness >= 192)
{
    pixel = "#";
}
else if (brightness >= 128)
{
    pixel = "+";
}
else if (brightness >= 64)
{
    pixel = "-";
}
else
{
    pixel = ".";
}

Console.WriteLine(pixel);
```

C# checks each condition in turn, from the top. It runs the body of the
first one that is `true`, and skips the rest. The `else` at the end runs
only when none of the conditions is `true`. For 200, the first condition
is already `true`, so it prints `#`.

So does the order matter? Suppose we checked `brightness >= 64` first. What
would 200 become then?

<details class="dl-answer"><summary>What happens</summary>

C# would check `brightness >= 64` first. 200 is more than 64, so that
condition is `true`: C# runs its body, and never reaches the check for
`#`. So the order matters. With `>=`, the check with the largest number
goes first. Can you move the checks in the cell, and see?

</details>

Can you try a few brightnesses in the cell, and then the boundaries: 64,
128 and 192? A *boundary* is a value where the answer changes. Does each
one give the character you expect? Mistakes are often at a boundary, so it
is good to test every one.

### Your turn

<div class="dl-world" data-world="secret-messages">

`char.IsUpper(character)` is a method that gives `true` when `character` is
a capital letter, and `char.IsLower(character)` gives `true` for a small
one. Can you set `kind` to `"capital"`, `"small"`, `"space"` or `"other"`,
whatever `character` holds?

```csharp exec
id: your-turn-3--secret-messages
char character = 'e';
string kind = "";

Console.WriteLine($"'{character}': {kind}");
```

```inputs
kind
```

```hint
after: 1 runs
There are four paths: `if`, two `else if`s, and `else`. Which case can the
`else` catch?
```

```solution
char character = 'e';
string kind = "";
if (char.IsUpper(character))
{
    kind = "capital";
}
else if (char.IsLower(character))
{
    kind = "small";
}
else if (character == ' ')
{
    kind = "space";
}
else
{
    kind = "other";
}
Console.WriteLine($"'{character}': {kind}");
---
A question mark, a digit and a full stop all reach the `else`. Those are
the characters a Caesar shift leaves as they are.
```

</div>

<div class="dl-world" data-world="pixel-art">

A picture is 64 pixels wide, with columns numbered 0 to 63. Can you set
`place` to `"left of the picture"` when `x` is below 0, `"on the picture"`
when it is 0 to 63, and `"right of the picture"` when it is 64 or more?

```csharp exec
id: your-turn-3--pixel-art
int x = 70;
string place = "";

Console.WriteLine($"Column {x}: {place}");
```

```inputs
place
```

```hint
after: 1 runs
Three paths: `if`, `else if`, `else`. When it runs, can you try the
boundaries: -1, 0, 63 and 64?
```

```solution
int x = 70;
string place = "";
if (x < 0)
{
    place = "left of the picture";
}
else if (x < 64)
{
    place = "on the picture";
}
else
{
    place = "right of the picture";
}
Console.WriteLine($"Column {x}: {place}");
---
The `else if` runs only when `x < 0` was `false`, so it does not need to
ask whether `x` is 0 or more: that is already known.
```

</div>

## Boolean operators: combining conditions

Sometimes one comparison is not enough. A *Boolean operator* combines
`true` and `false` values, or reverses one. C# has three: `&&` for "and",
`||` for "or", and `!` for "not". The `|` character is a vertical line. On
most Irish and British keyboards, it is Shift and the key to the left of
Z.

`&&` is `true` only when *both* sides are `true`. A capital letter is one
that is `'A'` or after, and `'Z'` or before:

```csharp exec
id: boolean-operators-combining-conditions-1
char character = 'Q';
Console.WriteLine(character >= 'A' && character <= 'Z');
```

`||` is `true` when *at least one* side is `true`. A word ends at a space
or a full stop:

```csharp exec
id: boolean-operators-combining-conditions-2
char character = '.';
Console.WriteLine(character == ' ' || character == '.');
```

`!` changes `true` to `false`, and `false` to `true`:

```csharp exec
id: boolean-operators-combining-conditions-3
bool seeThrough = false;
if (!seeThrough)
{
    Console.WriteLine("draw this pixel");
}
```

| Operator | Name | True when… |
|---|---|---|
| `a && b` | and | `a` and `b` are both true |
| `a \|\| b` | or | at least one of `a` and `b` is true |
| `!a` | not | `a` is false |

What changes if `character` is `'q'` in the first cell, or `'!'` in the
second? Can you say before you run it?

When one line uses more than one of these, C# does them in a fixed order:
`!` first, then `&&`, then `||`. When you are not sure how C# will read a
line, add round brackets to make your meaning clear.

### Your turn

<div class="dl-world" data-world="secret-messages">

Code-breakers count vowels. Can you set `isVowel` to `true` when
`character` is A, E, I, O or U, and to `false` otherwise?

```csharp exec
id: your-turn-4--secret-messages
char character = 'O';
bool isVowel = false;

Console.WriteLine($"'{character}' is a vowel: {isVowel}");
```

```inputs
isVowel
```

```hint
after: 1 runs
Five comparisons, joined by `||`. A comparison already gives `true` or
`false`, so can you store its result in `isVowel` without an `if`?
```

```solution
title: with what you've met so far
char character = 'O';
bool isVowel = character == 'A' || character == 'E' || character == 'I'
    || character == 'O' || character == 'U';
Console.WriteLine($"'{character}' is a vowel: {isVowel}");
---
C# reads a statement as far as its semicolon, so a long condition can
continue on the next line.
```

```solution
title: a shorter way you'll meet later
char character = 'O';
bool isVowel = "AEIOU".Contains(character);
Console.WriteLine($"'{character}' is a vowel: {isVowel}");
---
`Contains` asks whether a string has a character in it. A list has a
`Contains` method too, and
[the practice page for Arrays and lists](lesson:lists-and-sequences-practice)
uses it.
```

</div>

<div class="dl-world" data-world="pixel-art">

A picture is 64 pixels wide and 48 tall. Can you set `onPicture` to `true`
when the point (`x`, `y`) is on it, and to `false` when it is not?

```csharp exec
id: your-turn-4--pixel-art
int x = 10;
int y = 50;
bool onPicture = false;

Console.WriteLine($"({x}, {y}) is on the picture: {onPicture}");
```

```inputs
onPicture
```

```hint
after: 1 runs
Four things must all be true: `x` is 0 or more, `x` is less than 64, and
the same two for `y` and 48. Which operator needs everything to be true?
```

```solution
int x = 10;
int y = 50;
bool onPicture = x >= 0 && x < 64 && y >= 0 && y < 48;
Console.WriteLine($"({x}, {y}) is on the picture: {onPicture}");
---
`y` is 50, below the bottom row, so `onPicture` is `False`. Maths can write
$0 \le x < 64$, two comparisons in one. C# cannot: the practice page shows
what the compiler says.
```

</div>

## Looking back

The order of the `else if` conditions decided which character 200 became.
When does the order of the conditions *not* matter? Can you think of a set
of conditions where it makes no difference which comes first?

A challenge: can you make a Caesar shift that moves a capital letter three
places along, and leaves anything else, a space or a question mark, as it
is? Try it with `'Q'`, `'Z'`, `' '` and `'?'`.

```csharp challenge
// Move a capital letter three places along. Leave anything else as it is.
char character = 'Q';
int shift = 3;
int position = character - 'A';
int moved = (position + shift) % 26;
Console.WriteLine((char)(moved + 'A'));
```

*Sequence*, running lines one after another, and *selection*, choosing a
path, are two of the three building blocks of every program. The third,
*repetition*, running lines again, is the subject of
[Loops](lesson:repeating-yourself). C# also has a second way to choose
between many paths, `switch`, and [Reading input](lesson:reading-input) uses it for a menu.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:making-decisions-practice) has more
problems about decisions. After it,
[The equals sign](lesson:equals-three-ways) looks closely at `=` and `==`.

## Where to read more

Microsoft. *if and switch statements (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/statements/selection-statements>.
This page describes `if` and `else`, with examples. Its part on `switch`
is for later.

Microsoft. *Boolean logical operators (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/boolean-logical-operators>.
This page describes `!`, `&&` and `||`, and the order in which C# does
them.

Stand-up Maths (2016). *Leap Years: we can do better.*
<https://www.youtube.com/watch?v=qkt_wmRKYNQ>. A year is a leap year if it
can be divided by 4, unless it can be divided by 100, unless it can be
divided by 400. That rule is an `if`, `else if` and `else`. Matt Parker
explains where it comes from.
