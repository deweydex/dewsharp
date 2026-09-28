---
title: "Variables and types: numbers, text and single characters"
version: 2026.09.28.1
from: storing-and-computing
worlds:
  secret-messages: Codes and hidden messages, the kind spies and puzzle-setters make.
  pixel-art: Pictures made of small squares, the way a screen draws them.
covers: [PDP-LO4, PDP-LO7, PDP-LO11]
---

# Variables and types: numbers, text and single characters

C# can keep a value under a name, and use it again later. Here the name
`message` holds a piece of text. What do you think the last line prints?
Run it and see.

```csharp exec
id: a-name-for-a-message-1
string message = "HELLO";
string shout = message + "!!!";
Console.WriteLine(shout);
```

It prints `HELLO!!!`. When C# meets the name `message`, it uses the value
the name holds. And `+` with two pieces of text joins them end to end.

[The first page](lesson:first-steps) gave values names and types. This page
looks more closely at both: what a name is, the kinds of value C# keeps,
and what a type decides. Then it looks at text. C# can split a piece of
text into its characters, and every character has a number.

## Variables: giving names to things

A *variable* is a name for a place in the computer's memory that holds a
value. We make one with its type, its name, the `=` sign and a value:
`int count = 5;`. In programming, `=` means "put this value in this
variable". It does not mean "is equal to", the way it does in maths, and
the next cell shows why that matters.

```csharp exec
id: variables-giving-names-to-things-1
int count = 5;
count = count + 1;
Console.WriteLine(count);
```

```predict
type: number

What will it print?
```

It prints 6. In maths, $c = c + 1$ can never be true. In C# it is an
instruction, and C# runs it once. First it calculates the part after the
`=`, which is `count + 1`, or 6. Then it puts that value in `count`. The
old value is gone.

The first line starts with a type, `int`, because it makes the variable.
The second line has no type, because `count` already exists. That line
gives it a new value. A variable's type is fixed when the variable is made,
so `count` holds an `int` for as long as it exists.

A variable's name should say what it holds. `shift` says that it holds the
number of places a secret code moves each letter. `s` does not. Somebody
reading the code, and that could be you in a few months, would not know
what `s` means. C# has a few rules for names:

- A name starts with a letter or an underscore (`_`).
- After that, it can contain letters, digits and underscores.
- Capital letters matter: `Shift` and `shift` are two different variables.
- A name cannot be a *keyword*: a word that C# keeps for its own use, such
  as `int`, `string` or `class`.

C# programmers write variable names in *camelCase*. The first word is in
small letters, and each word after it starts with a capital, like
`secretWord`. The name of a method, such as `WriteLine`, starts with a
capital, and so does each word in it. That style is called *PascalCase*.

### Your turn

<div class="dl-world" data-world="secret-messages">

Can you make a variable for a secret word of your own, one for the number
of letters in it, and one for whether you would let anybody see it: `true`
or `false`? Each one needs a type. Then can you print each one with a label
that says what it is?

```csharp exec
id: your-turn-1--secret-messages
// Your variables here

```

```solution
string secretWord = "OTTER";
int letters = 5;
bool anyoneCanSee = false;
Console.WriteLine($"secret word: {secretWord}");
Console.WriteLine($"letters: {letters}");
Console.WriteLine($"anyone can see it: {anyoneCanSee}");
---
Yours will hold different values. What matters is that each name says
what it holds, and each label says it again for the person reading the
output. Notice that the code says `false`, and the output says `False`.
C# prints a `bool` with a capital letter.
```

</div>

<div class="dl-world" data-world="pixel-art">

Can you make variables for a picture's width and height in pixels, and one
for whether it is in colour: `true` or `false`? Each one needs a type. Then
can you print how many pixels it has, with a label that says what the
number is?

```csharp exec
id: your-turn-1--pixel-art
// Your variables here

```

```solution
int width = 64;
int height = 48;
bool inColour = true;
Console.WriteLine($"pixels: {width * height}");
Console.WriteLine($"in colour: {inColour}");
---
Yours will hold different values. What matters is that each name says
what it holds, and each label says it again for the person reading the
output. Notice that the code says `true`, and the output says `True`. C#
prints a `bool` with a capital letter.
```

</div>

## Data types: different kinds of information

A *data type*, or *type* for short, is the kind of data a value is. C# has
many types built in. These are the five we use most:

| Type | What it holds | Examples |
|---|---|---|
| `int` | whole numbers | `42`, `-7`, `0` |
| `double` | numbers with a decimal point | `3.14`, `-0.5`, `2.0` |
| `char` | one character, in single quotes | `'A'`, `'7'`, `'?'` |
| `string` | text, in double quotes | `"hello"`, `"A"`, `""` |
| `bool` | true or false | `true`, `false` |

An *integer* is a whole number. In maths, the whole numbers continue in
both directions from zero, for ever: …, −3, −2, −1, 0, 1, 2, 3, …
C#'s `int` holds only some of them, because it keeps each number in a fixed
amount of memory. This cell asks C# for the smallest and the largest `int`,
and for how much memory each type uses.

```csharp exec
id: data-types-different-kinds-of-information-1
Console.WriteLine(int.MinValue);
Console.WriteLine(int.MaxValue);
Console.WriteLine(sizeof(int));      // sizeof gives bytes of memory
Console.WriteLine(sizeof(double));
Console.WriteLine(sizeof(char));
Console.WriteLine(sizeof(bool));
```

A *bit* is a single 0 or 1, and a *byte* is 8 bits. An `int` uses 4 bytes,
so it can hold any whole number from −2,147,483,648 to 2,147,483,647. For
counting people, pixels or letters, that is plenty. A later page,
*Types and their sizes*, shows what happens past the largest one, and what
the other types can hold.

A *floating-point number* is a number with a decimal point. C#'s usual
type for one is `double`, and it uses 8 bytes. A `double` can hold very
large and very small numbers, but not every number exactly. The practice
page shows why.

A *character* (`char`) is one letter, digit, space or symbol, written
between single quotes. A *string* (`string`) is a piece of text, written
between double quotes. The two kinds of quote are different in C#. `'A'` is
a `char`, and `"A"` is a `string` that holds one character. A string has no
fixed size: a long string needs more memory than a short one.

A *Boolean* (`bool`) is a value that is either `true` or `false`. Booleans
are named after George Boole, who created an algebra of logic in the
1840s.

A variable's type is fixed when the variable is made. It can hold values of
that type and no other. This cell is meant to fail: it asks an `int` to
hold some text.

```csharp exec
id: data-types-different-kinds-of-information-2
expect: CS0029
int count = "5";
Console.WriteLine(count);
```

It does not compile, so nothing runs. The compiler's message is:

```console
Program.cs(1,13): error CS0029: Cannot implicitly convert type 'string' to 'int'
```

Line 1, column 13 is where `"5"` starts. The quotes make it a `string`,
and `count` is an `int`. C# checks every line like this before it runs any
of them.

`"42"`, with quotes, is a string. To C# it is text that happens to contain
two digits. What do you think the second line of this cell prints?

```csharp exec
id: where-i-might-get-stuck-1
Console.WriteLine(40 + 2);
Console.WriteLine("40" + "2");
```

```predict
type: choice

What will the second line print?

- 42
  - This treats "40" and "2" as the numbers they look like.
- 402
  - `+` with two pieces of text joins them, whatever the characters are.
- Nothing: the program does not compile
  - Can `+` add two pieces of text?
```

It prints `402`. The `+` operator does different things for different
types. For numbers it adds, and for strings it *concatenates*, which means
it joins them end to end. The compiler looks at the types on each side of
the `+`, and they decide which job it does.

Before you run the next cell, can you write what you think each line will
print in the comment beside it?

```csharp exec
id: your-turn-2
Console.WriteLine(7 + 2);          // I think:
Console.WriteLine("7" + "2");      // I think:
Console.WriteLine("7" + 2);        // I think:
Console.WriteLine(7 + 0.5);        // I think:
Console.WriteLine(7 + 2 + "7");    // I think:
Console.WriteLine("7" + 7 + 2);    // I think:
```

<details class="dl-answer"><summary>Why do the last two lines differ?</summary>

When one side of `+` is a string, C# converts the other side to text and
joins them. And C# does the `+` signs in a line from left to right.

In `7 + 2 + "7"`, the first `+` has two numbers, so it adds them: 9, as
the first line shows. The second `+` has a string on one side, so it
joins: `97`.

In `"7" + 7 + 2`, the first `+` already has a string, so it joins the 7 to
it. The result is a string, so the second `+` joins too: `772`.

An `int` and a `double` give a `double`, so `7 + 0.5` is 7.5.

</details>

## Text and its characters

A string is a row of characters, in order. C# can tell you how long a
string is, and give you the same text in capitals. What do you think the
last line of this cell prints?

```csharp exec
id: text-you-can-take-apart-1
string message = "meet at noon";
Console.WriteLine(message.Length);    // spaces count as characters too
Console.WriteLine(message.ToUpper());
Console.WriteLine(message);
```

`Length` has no brackets, and `ToUpper()` has them. `Length` is a value the
string already knows. `ToUpper()` is a method, like `Console.WriteLine`, and
the brackets run it.

Did the last line surprise you? `ToUpper()` makes a new string in capitals,
and `message` itself does not change. In C#, a string can never be changed
once it is made. A method that seems to change a string gives you a new one
instead. To keep the capitals, give the new string a name of its own:
`string loud = message.ToUpper();`.

Every character also has a number of its own. The computer stores the
number, and shows you the character. A type name in brackets before a
value, like `(int)`, is a *cast*. It asks C# to convert the value to that
type. So `(int)'A'` gives the number that A is stored as, and `(char)67`
gives the character that is stored as 67.

```csharp exec
id: text-you-can-take-apart-2
Console.WriteLine((int)'A');
Console.WriteLine((int)'B');
Console.WriteLine((int)'Z');
Console.WriteLine((char)67);
```

`A` is 65, `B` is 66, and so on up to `Z`, which is 90. The capital letters
are numbered in order, one after another. So, to move a letter along the
alphabet, we can move its number. A section below does this.

## Type conversion

To *convert* a value is to change it to another type. You met the word on
[the powers page](lesson:powers-in-csharp), in the message *Cannot
implicitly convert type 'double' to 'int'*. A cast is one way to convert.
But a cast cannot convert text to a number, or a number to text. For those,
C# has methods. `int.Parse` reads a string as a whole number, and
`double.Parse` reads one as a number with a decimal point. In the other
direction, every value has a `ToString()` method that gives it as text. And
`+` with a string on one side converts the other side by itself, as the
section on data types showed.

```csharp exec
id: type-conversion-1
string textValue = "42";
int numberValue = int.Parse(textValue);    // read the text as a whole number
Console.WriteLine(textValue + 8);           // text and a number: + joins
Console.WriteLine(numberValue + 8);         // two numbers: + adds
```

The same 8 gives `428` with the text, and 50 with the number.

This matters most when a program asks the person using it to type
something. `Console.ReadLine()` waits for the person to type a line and
press Enter. Then it gives the program what they typed. It always gives a
string, even when the person types a number. `Console.Write` is like
`Console.WriteLine`, but it does not start a new line after the text. So
the person types the answer on the same line as the question.

When you run the next cell, it waits for you to type. It asks two
questions.

```csharp exec
id: type-conversion-2
stdin: "Aoife\n34\n"
Console.Write("What is your name? ");
string userName = Console.ReadLine();
Console.WriteLine($"Hello, {userName}");

Console.Write("How old are you? ");
string ageText = Console.ReadLine();     // what was typed is always a string
int userAge = int.Parse(ageText);        // now it is a whole number
Console.WriteLine($"Next year you will be {userAge + 1}");
```

What happens if you type your age in words, such as *thirty*? You can try
it. The program stops with an exception at the `int.Parse` line: a
`FormatException`, because the text is not a whole number. A later page,
*Reading input*, shows how a program can check the text before it converts
it.

A number can change type too. An `int` fits in a `double` with nothing
lost, so C# converts it by itself. A `double` does not always fit in an
`int`, because the part after the decimal point would be lost. So C#
converts it only when the code asks, with a cast.

```csharp exec
id: type-conversion-3
double price = 5;        // an int fits in a double: C# converts it by itself
int whole = (int)3.7;    // a double needs a cast: it keeps only the whole part
Console.WriteLine(price);
Console.WriteLine(whole);
```

It prints 5 and 3. What happens without the cast? You can remove `(int)`
and run the cell again. The program does not compile, and the message is
the one from the powers page, CS0266. It ends with *An explicit conversion
exists (are you missing a cast?)*. *Explicit* means written in the code.
The cast is how the code says that losing the .7 is what you want.

A cast helps with division too. On [the first page](lesson:first-steps),
`/` with two whole numbers gave a whole number, and dropped the part after
the point. With a cast on one of them, the division uses `double`, and it
keeps the decimal places.

```csharp exec
id: type-conversion-4
int minutes = 90;
Console.WriteLine(minutes / 60);            // two ints give an int
Console.WriteLine((double)minutes / 60);    // a double and an int give a double
```

90 minutes is 1 whole hour, or 1.5 hours.
[Dividing](lesson:dividing-in-csharp) looks at `/` more closely.

Here are the ways to convert that this page uses:

| From | To | How | Example |
|---|---|---|---|
| `string` | `int` | `int.Parse` | `int.Parse("42")` |
| `string` | `double` | `double.Parse` | `double.Parse("3.7")` |
| any value | `string` | `ToString()`, `+` with a string, or `$"..."` | `42.ToString()` |
| `int` | `double` | C# converts it by itself | `double price = 5;` |
| `double` | `int` | a cast, which loses the decimal places | `(int)3.7` |
| `char` | `int` | a cast | `(int)'A'` |
| `int` | `char` | a cast | `(char)67` |

## Putting it together: a small program

Now we can move a letter along the alphabet. This is the main step in the
oldest secret code there is. Julius Caesar is said to have written to his
generals with every letter moved three places along: A became D, B became
E. It is called a *Caesar shift*.

Here is the plan, as pseudocode:

```text
STORE the letter, and how far to move it
CHANGE the letter to a number, counting A as 0
ADD the shift, and start again at 0 after Z with % 26
CHANGE the number back to a letter
DISPLAY it
```

And here it is in C#. What will X become?

```csharp exec
id: now-the-implementation-1
char letter = 'X';
int shift = 3;
int position = letter - 'A';            // A is 0, B is 1, and so on
int moved = (position + shift) % 26;    // start again at 0 after Z
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
```

```predict
type: choice

What will X become?

- A
  - X moves to Y, then Z, and then starts again at A.
- [
  - The character after Z is not a letter. Does anything in the program
    start again at A?
- U
  - That is three places back, not three places on.
```

X moves to Y, then Z, then A. Two things in the program are new.
Subtracting one `char` from another subtracts their numbers, and gives an
`int`. So `letter - 'A'` is how far `letter` is from A. And `%` gives the
remainder after dividing, as on the first page. There are 26 letters, so
position 26 is position 0 again.

What does X become without `% 26`? You can delete it from the cell and run
it again.

To see what each line makes, we can print it. This is the same program,
with a line after each step that shows its value. Printing values like
this is called *tracing*. It is one of the first things to try when a
program prints something you did not expect.

```csharp exec
id: now-the-implementation-2
char letter = 'X';
int shift = 3;
int position = letter - 'A';
Console.WriteLine($"position: {position}");
Console.WriteLine($"position + shift: {position + shift}");
int moved = (position + shift) % 26;
Console.WriteLine($"moved: {moved}");
char newLetter = (char)(moved + 'A');
Console.WriteLine($"newLetter: {newLetter}");
```

<details class="dl-answer"><summary>What each line does</summary>

- `int position = letter - 'A';` finds the letter's place in the alphabet,
  counting A as 0. X is at position 23.
- `int moved = (position + shift) % 26;` adds the shift, which makes 26.
  Then it keeps the remainder after dividing by 26, which is 0.
- `char newLetter = (char)(moved + 'A');` adds A's number to 0, which
  gives 65, and the cast changes 65 back to a character: A.

</details>

### Your turn

<div class="dl-world" data-world="secret-messages">

A letter was moved three places along, and it became D. What was it
before? Can you change the program to move a letter backwards, and see?
Then try A: which letter moves three places along to become A?

```csharp exec
id: your-turn-4--secret-messages
char letter = 'D';
int shift = 3;
int position = letter - 'A';
int moved = (position + shift) % 26;
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
```

```inputs
newLetter
```

```hint
after: 1 runs
Moving backwards three places is a shift of −3. Does `% 26` still give a
number from 0 to 25 when the number before it is below 0?
```

```solution
title: for D
char letter = 'D';
int shift = -3;
int position = letter - 'A';
int moved = (position + shift + 26) % 26;    // + 26, so it is never below 0
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
---
D came from A. Decoding is the same program with the shift the other way.
```

```solution
title: for A
char letter = 'A';
int shift = -3;
int position = letter - 'A';
int moved = (position + shift + 26) % 26;    // + 26, so it is never below 0
char newLetter = (char)(moved + 'A');
Console.WriteLine(newLetter);
---
A came from X. Without `+ 26`, A does not become a letter at all. A's
position is 0, so `position + shift` is below 0. In C#, the remainder
keeps the sign of the number before the `%`, so `% 26` gives a number
below 0 too, and the cast gives a character that comes before A. Adding 26
first means that the number is never below 0. For a shift of any size,
`((position + shift) % 26 + 26) % 26` always gives a place from 0 to 25.
[Dividing](lesson:dividing-in-csharp) looks at `%` and numbers below 0.
```

</div>

<div class="dl-world" data-world="pixel-art">

A web page writes a colour as text: `rgb(30, 144, 255)`, with its red,
green and blue from 0 to 255. Here the three are in variables. Can you
build that text, under the name `colour`, from the three numbers?

```csharp exec
id: your-turn-4--pixel-art
int red = 30;
int green = 144;
int blue = 255;
Console.WriteLine($"{red} {green} {blue}");
string colour = "";
Console.WriteLine(colour);
```

```inputs
colour
```

```hint
after: 1 runs
Which parts of `rgb(30, 144, 255)` are the same for every colour, and
which parts come from the variables?
```

```solution
title: with +
int red = 30;
int green = 144;
int blue = 255;
string colour = "rgb(" + red + ", " + green + ", " + blue + ")";
Console.WriteLine(colour);
---
Each `+` has a string on one side, so C# converts each number to text and
joins the pieces. The commas and spaces are strings of their own.
```

```solution
title: with $"..."
int red = 30;
int green = 144;
int blue = 255;
string colour = $"rgb({red}, {green}, {blue})";
Console.WriteLine(colour);
---
This line is shorter, and it looks like the text it makes. The next
section says more about strings like this one.
```

</div>

## Putting values into text

You have used `$"..."` since [the first page](lesson:first-steps). A string
with a `$` just before the opening quote is an *interpolated string*.
Inside it, C# replaces each name in curly brackets with that name's value,
converted to text. The two lines in this cell print the same thing. Which
one is easier to read?

```csharp exec
id: putting-values-into-text-1
char letter = 'X';
char newLetter = 'A';
int shift = 3;
Console.WriteLine($"{letter} moved {shift} places is {newLetter}");
Console.WriteLine(letter + " moved " + shift + " places is " + newLetter);
```

Joining pieces with `+` works, but it is easy to forget a space. With
`$"..."`, the line looks like the text it makes.

Some results have more decimal places than anybody wants to read. A screen
1920 pixels wide and 1080 tall has a shape we can find by dividing:

```csharp exec
id: putting-values-into-text-2
double width = 1920;
double height = 1080;
double ratio = width / height;
Console.WriteLine($"The screen is {ratio} times as wide as it is tall");
Console.WriteLine($"The screen is {ratio:F2} times as wide as it is tall");
```

`:F2` after the name, inside the curly brackets, means "show this number
with 2 decimal places". The F is for *fixed*: a fixed number of decimal
places. Can you change the `2` to `1` or `4`, and run the cell again? It
changes only how the number is shown. `ratio` still holds every decimal
place.

### Your turn

<div class="dl-world" data-world="secret-messages">

A message has 47 letters, and 12 of them are E. What share of the letters
is E, as a percentage? Can you print it with a `$` string, to 1 decimal
place, like `E is 25.5% of the letters`? (Code-breakers count letters like
this. In English, E is the most common letter, so the most common letter
in a Caesar-shifted message is probably E, moved.)

```csharp exec
id: putting-values-into-text-3--secret-messages
int letters = 47;
int eCount = 12;
Console.WriteLine($"{eCount} of the {letters} letters are E");
```

```hint
after: 1 runs
What does `eCount / letters` give when both are `int`? The section on type
conversion has a cast for this.
```

```solution
int letters = 47;
int eCount = 12;
double share = (double)eCount / letters * 100;
Console.WriteLine($"E is {share:F1}% of the letters");
---
The cast makes the division use `double`. Without it, both are `int`, and
12 divided by 47 has no whole part at all. About a quarter of these
letters are E, which is more than in most English text, where E is about
one letter in eight.
```

```solution
title: with the P format
int letters = 47;
int eCount = 12;
double share = (double)eCount / letters;
Console.WriteLine($"E is {share:P1} of the letters");
---
`:P1` shows a number as a percentage with 1 decimal place. It multiplies
by 100 and adds the `%` sign for you.
```

</div>

<div class="dl-world" data-world="pixel-art">

A photo is 640 pixels wide and 480 tall. Can you print one line, with a
`$` string, like `640 × 480 is 307200 pixels, 0.31 megapixels`? A
megapixel is a million pixels.

```csharp exec
id: putting-values-into-text-3--pixel-art
int width = 640;
int height = 480;
Console.WriteLine($"{width} × {height}");
```

```hint
after: 1 runs
What does `pixels / 1000000` give when both are `int`?
```

```solution
int width = 640;
int height = 480;
int pixels = width * height;
Console.WriteLine($"{width} × {height} is {pixels} pixels, {pixels / 1000000.0:F2} megapixels");
---
Inside the curly brackets you can write a small calculation as well as a
name. `1000000.0` has a decimal point, so it is a `double`, and the
division keeps its decimal places. `{pixels / 1000000.0:F2}` divides
first, then shows 2 decimal places.
```

</div>

## Looking back

C# joined `"7" + 2` into `72` and gave no error. Some languages, Python
among them, stop with an error on that line instead. Which would you
rather have? Can you think of a program where C#'s way would hide a
mistake?

C# also stopped `int count = "5";` before the program ran at all. Why
might it help to find a problem before any line runs?

A challenge: can you move a whole word, like `CAT`, three places along,
with what this page has? Which part do you have to write again and again?
What would you want C# to do for you, if you had a word of a hundred
letters?

```csharp challenge
// Move each letter of CAT three places along the alphabet.
string word = "CAT";
int shift = 3;
Console.WriteLine((char)((word[0] - 'A' + shift) % 26 + 'A'));
```

`word[0]` is the first character of the word, as a `char`.
[Arrays and lists](lesson:lists-and-sequences) explains why it is 0, not
1. [Loops](lesson:repeating-yourself) shows how to make C# repeat that part
for you.

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves it
as a Visual Studio project, which prints the same there.

Next, the [practice page](lesson:storing-and-computing-practice) has more
problems about names, types and text. After it, *Compiler errors* looks at
the messages C# gives before it runs anything.

## Where to read more

Computerphile (2014). *Floating Point Numbers.*
<https://www.youtube.com/watch?v=PZRI1IfStY0>. This video explains why a
`double` cannot store every number exactly, and why that matters.

Microsoft. *Built-in types (C# reference).*
<https://learn.microsoft.com/dotnet/csharp/language-reference/builtin-types/built-in-types>.
This is the official list of C#'s types. It links to a page for each one,
and the pages for numbers give each type's range and size.

Microsoft. *Standard numeric format strings.*
<https://learn.microsoft.com/dotnet/standard/base-types/standard-numeric-format-strings>.
This page lists every letter that can follow the colon in `{ratio:F2}`,
such as `F`, `P` and `C`, with examples.

Singh, S. (1999). *The Code Book.* Fourth Estate. This book tells the
history of secret codes, from Caesar's shift to the machines of the Second
World War, and how each one was broken.

CrashCourse (2017). *Representing Numbers and Letters with Binary: Crash
Course Computer Science #4.*
<https://www.youtube.com/watch?v=1GSjbWt0c9M>. Every value on this page, a
number or a piece of text, is stored as ones and zeros. This video shows
how. It is about eleven minutes long.
