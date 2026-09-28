---
title: "Compiler errors: practice"
version: 2026.09.28.1
from: reading-an-error-message-practice
practice_for: compiler-errors
---

# Compiler errors: practice

Here your guess is the exercise. Before you run a cell, say which code you
think the compiler will give, or whether the program will run at all. Then
run it, and read the first message first. Most cells on this page are meant
not to compile, and each problem says so. Most problems have an answer
under them, in a fold or a solution, for when you have tried them.

Everything here uses only variables and their types, arithmetic, text,
`Console.WriteLine` and `Console.ReadLine`. There are no new tools, only
new messages to read.

## 1. Name the code before you run

Each of these four cells is meant not to compile. Before you run each one,
write the code you expect in its comment. The lesson's table,
[The codes on this page](lesson:compiler-errors#the-codes-on-this-page),
may help. Then run it, and compare.

```csharp exec
id: name-the-code-1
expect: CS0117
Console.Writeline("Hello");    // I think: CS
```

```csharp exec
id: name-the-code-2
expect: CS0029
bool ready = "yes";    // I think: CS
Console.WriteLine(ready);
```

```csharp exec
id: name-the-code-3
expect: CS0266
int half = 7 / 2.0;    // I think: CS
Console.WriteLine(half);
```

```csharp exec
id: name-the-code-4
expect: CS0029
char letter = "A";    // I think: CS
Console.WriteLine(letter);
```

<details class="dl-answer"><summary>answer</summary>

The first is a code that the lesson did not show: CS0117, *'Console' does
not contain a definition for 'Writeline'*. It is not CS0103, because
`Console` is a name the compiler knows. What it cannot find is something
called `Writeline` inside `Console`. C#'s method is `WriteLine`, with a
capital L. *Does not contain a definition for* means that `Console` has
nothing with that name.

The second is CS0029, *Cannot implicitly convert type 'string' to 'bool'*.
`"yes"` is text, and a `bool` holds only `true` or `false`.

The third is CS0266, *Cannot implicitly convert type 'double' to 'int'*.
`2.0` has a decimal point, so `7 / 2.0` is a `double`. An `int` cannot hold
its decimal part, so C# puts a `double` in an `int` only with a cast.

The fourth is CS0029, *Cannot implicitly convert type 'string' to 'char'*.
Double quotes make a `string`, even around one character. A `char` needs
single quotes: `'A'`.

</details>

## 2. Change one place, and count again

This program is meant not to compile. Run it, and count the messages. Then
change only the place that the first message names, and nothing else. How
many messages are there now? Is any of them new?

```csharp exec
id: count-again-1
expect: CS1003
string name = "Aoife"
int age = "34";
Console.WriteLine($"{nme} is {age}");
```

```hint
after: 2 errors
The first message asks for a comma. What is missing at the end of line 1?
```

Here is the same program with a semicolon at the end of line 1. It is
meant not to compile too. What do its messages say?

```csharp exec
id: count-again-2
expect: CS0029
string name = "Aoife";
int age = "34";
Console.WriteLine($"{nme} is {age}");
```

```solution
string name = "Aoife";
int age = 34;
Console.WriteLine($"{name} is {age}");
---
It prints `Aoife is 34`.
```

<details class="dl-answer"><summary>what happens</summary>

The first program gives three messages: CS1003 on line 1, and two CS0103
on line 3, one for `nme` and one for `age`. With no semicolon, the
compiler read lines 1 and 2 as one step, so it never made `age`, and it
never checked `"34"`.

With the semicolon, there are two errors and a warning. The error about
`age` is gone, because now line 2 makes `age`. And there is a new error,
CS0029 on line 2: `"34"` is text, and `age` is an `int`. The compiler could
not find that mistake until it could read line 2 as a step of its own.

So a new message after a change does not mean that the change added a
mistake. It can mean that the compiler now reads further. The error about
`nme` was there from the start: it is the name `name`, spelt in another
way. The new warning is about the same slip: *The variable 'name' is
assigned but its value is never used* (CS0219). Nothing uses `name`,
because the last line asks for `nme`.

</details>

## 3. One mistake, three messages

This program is meant not to compile. How many mistakes are in it? Which
line does the last message name, and which line has the mistake?

```csharp exec
id: one-mistake-three-messages-1
expect: CS1010
string name = "Aoife;
int age = 34;
Console.WriteLine($"{name} is {age}");
```

```hint
after: 2 errors
Read the first message first. Where does the text on line 1 end?
```

```solution
string name = "Aoife";
int age = 34;
Console.WriteLine($"{name} is {age}");
---
One quote, after `Aoife`, and all three messages disappear. It prints
`Aoife is 34`.
```

<details class="dl-answer"><summary>answer</summary>

One mistake: the text on line 1 has no closing quote. It gives three
messages. The first, CS1010 on line 1, is about the quote. The second,
CS1003, asks for a comma on line 1: the semicolon became part of the
text, so nothing ended line 1, and the compiler read line 2 as part of the
same step.

The last message names line 3: *The name 'age' does not exist in the
current context*. Line 3 has no mistake. `age` does not exist because line
2 never became a step of its own, so it never made `age`. The line that a
message names is where the compiler noticed a problem. The mistake can be
on an earlier line, and the first message is the best place to start.

</details>

## 4. Three messages, three mistakes

This program is meant not to compile. Is it one mistake, or three?

```csharp exec
id: three-mistakes-1
expect: CS1002
Console.WriteLine("one")
Console.WriteLine("two")
Console.WriteLine("three")
```

```solution
Console.WriteLine("one");
Console.WriteLine("two");
Console.WriteLine("three");
---
Three semicolons, one on each line. It prints `one`, `two` and `three`.
```

<details class="dl-answer"><summary>answer</summary>

Three mistakes, and three messages, all CS1002, `; expected`. Each one
names a different line. Here, each message is a mistake of its own, so
adding one semicolon removes one message. In problem 3, three messages came
from one mistake, and they all named places near it, or places that
depended on it. When the messages name the same kind of problem on
different lines, they are often different mistakes.

</details>

## 5. Error or warning

Somebody wanted this program to print `You are 34`.

```csharp exec
id: error-or-warning-1
int age = 34;
Console.WriteLine("You are {age}");
```

```predict
type: choice

What will it print?

- You are 34
  - The curly brackets put a value in the text.
- You are {age}
  - Only a string with a `$` in front of it puts values in curly brackets.
- Nothing: it does not compile
  - Is anything in this program something the compiler cannot read?
```

Can you make it print the age?

```solution
int age = 34;
Console.WriteLine($"You are {age}");
---
It prints `You are 34`. The `$` in front of the quotes makes C# replace
`{age}` with the value of `age`.
```

<details class="dl-answer"><summary>why</summary>

It prints `You are {age}`, with its curly brackets. Without a `$` in front
of the quotes, the text is only text, and C# prints every character in it.

It is not an error, so the program runs. But above the output is a
warning: *The variable 'age' is assigned but its value is never used*
(CS0219). That warning is the only clue. The program made `age`, and then
nothing used it, because the last line never asked for its value.

</details>

## 6. Two programs, one line apart

Both programs make `total` and give it no value. One of them is meant not
to compile. Which one do you think runs? Decide, and then run them both.

```csharp exec
id: two-programs-1
int total;
Console.WriteLine("Done");
```

```csharp exec
id: two-programs-2
expect: CS0165
int total;
Console.WriteLine(total);
```

<details class="dl-answer"><summary>answer</summary>

The first one runs, and prints `Done`. It has a warning, CS0168: *The
variable 'total' is declared but never used*. To *declare* a variable is to
make it, with its type and its name. A variable with no value is allowed,
as long as nothing reads it.

The second one does not compile: CS0165, *Use of unassigned local variable
'total'*. Its last line reads `total`, and `total` has no value to read.

The difference between an error and a warning is not how serious the
mistake looks. An error is code that C# cannot run. A warning is code it
can run, that often means a mistake.

</details>

## 7. From earlier: the line in the message, and the line to change

A price was typed with quotes around it. This program is meant not to
compile.

```csharp exec
id: the-line-to-change-1
expect: CS0019
string price = "12";
int quantity = 3;
int total = price * quantity;
Console.WriteLine(total);
```

The message names line 3. Which line would you change? There is more than
one way.

```hint
after: 2 errors
What type is `price`? Which line decides its type?
```

```solution
title: change line 1
int price = 12;
int quantity = 3;
int total = price * quantity;
Console.WriteLine(total);
---
Without the quotes, `12` is a number, and `price` is an `int`. It prints
`36`. Choose this way when the price is always written in the code.
```

```solution
title: change line 3
string price = "12";
int quantity = 3;
int total = int.Parse(price) * quantity;
Console.WriteLine(total);
---
`int.Parse` reads the text as a whole number. It prints `36` too. Choose
this way when the price arrives as text, for example from
`Console.ReadLine()`.
```

<details class="dl-answer"><summary>why</summary>

The message is CS0019, *Operator '\*' cannot be applied to operands of type
'string' and 'int'*. *Operands* are the values on each side of an operator.
C# has no `*` for a string and a number, as the practice page for
[Variables and types](lesson:storing-and-computing-practice#5-a-number-times-some-text)
showed.

Line 3 is where the compiler noticed the problem. But line 3 is the kind
of line you would write for two numbers. The type of `price` was decided on
line 1. The line a message names is where to start looking, and not always
the line to change.

</details>

## 8. Habits from Python

These two lines are Python. Before you run them, how many messages do you
think C# will give? The cell is meant not to compile.

```csharp exec
id: habits-from-python-1
expect: CS0103
name = "Ada"
print(name)
```

Can you write the same program in C#? It should print `Ada`.

```hint
after: 2 errors
What does C# need in front of a new variable's name? Which method prints a
line? What ends each step?
```

```solution
string name = "Ada";
Console.WriteLine(name);
---
Three changes: a type in front of the new variable, `Console.WriteLine` in
place of `print`, and a semicolon at the end of each step.
```

<details class="dl-answer"><summary>answer</summary>

Five messages from two lines. On line 1, CS0103 for `name` (with no type
in front of it, this line does not make a variable, so `name` is a name
the compiler does not know) and CS1002 for the semicolon. On line 2,
CS0103 for `print`, CS0103 for `name` again, and CS1002 again.

Five messages, and only three kinds of change. Read the first message
first, change the place it names, and run it again.

</details>

## 9. From earlier: does the compiler find it?

This problem comes from [Your first C# program](lesson:first-steps),
[Powers](lesson:powers-in-csharp) and
[Variables and types](lesson:storing-and-computing). Somebody wrote these
three lines. They wanted a division that keeps its decimal part, a power,
and a sum. Which of the lines does the compiler stop?

```csharp exec
id: does-the-compiler-find-it-1
Console.WriteLine(17 / 5);
Console.WriteLine(2 ^ 3);
Console.WriteLine("7" + 2);
```

```predict
type: choice

What will the second line print?

- 8
  - `^` is a power on a calculator. Is it one in C#?
- 1
  - In C#, `^` does another job, and gives another number.
- Nothing: it does not compile
  - Do the types on each side of `^` fit together?
```

<details class="dl-answer"><summary>why</summary>

None of them. All three compile and run, and they print `3`, `1` and `72`.
None of these is what the person wanted.

The compiler checks that the types fit together. `17 / 5` is two `int`
values, and `/` takes two `int` values. `2 ^ 3` is two `int` values too, and
`^` takes them. `"7" + 2` is a string and a number, and `+` joins them. The
compiler cannot know which calculation you meant. To check that, run the
program, and compare what it prints with an answer you already know.

</details>

## 10. Some output, then a message

A program printed two lines, and then the page said that it stopped with
an exception. Did the program compile?

<details class="dl-answer"><summary>answer</summary>

Yes. Only a program that compiled can run, and it ran far enough to print
two lines. A program with a compiler error prints nothing at all, not even
its first line. [Exceptions](lesson:reading-an-error-message) is the page
about programs that compile, start, and then stop.

</details>

## 11. Which is more useful?

Why is a compiler error more useful than a program that runs and prints an
answer that nobody meant?

<details class="dl-answer"><summary>one answer</summary>

Here is one answer. Yours may be different and work too.

A compiler error says where and what: a file, a line, a column, a code and
a description. It stops the program before anything happens, so nobody who
uses the program ever meets it. A program that runs and prints an answer
nobody meant says nothing at all. Nobody may notice for weeks, and by then
it has printed many answers that people trusted.

</details>
