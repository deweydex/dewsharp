---
title: "Recursion: a method that calls itself"
version: 2026.09.28.1
from: a-function-that-calls-itself
covers: [PDP-LO8, PDP-LO2]
---

# Recursion: a method that calls itself

The photo folder on your laptop is called Holidays. It has some photos in
it, and some folders. Some of those folders have folders of their own. How
many photos are there in all, counting every folder inside every folder?

A simple loop cannot answer that, and this page shows why. One answer is
a method that calls itself. That sounds like a circle, like a
dictionary that explains a word with the same word. But when the method is
careful, it works, and it can be the shortest code on the page.

This page is an extra. The module's outcomes do not need it, so you can do
it whenever you have time. It uses methods, from
[Methods](lesson:writing-your-own-functions), arrays, from
[Arrays and lists](lesson:lists-and-sequences), and a class that is written
in one cell and used in the cells below it, as on
[Reusable methods](lesson:building-reusable-tools).

## Folders inside folders

A folder can hold two kinds of thing: files, and other folders. So in C#,
a folder can be three values: its name, the names of the files in it, and
the folders in it. The first cell below describes that as a new type,
called `Folder`, in one line.

```csharp exec
id: calls-itself-folder
file: Folder.cs
record Folder(string Name, string[] Files, Folder[] Folders);
```

This line is a *record*: a short way to describe a new type that holds a
few values. Every `Folder` has a `Name`, which is a `string`; `Files`,
which is an array of strings; and `Folders`, which is an array of `Folder`.
The cell holds only a type, so it has a **Check** button in place of
**Run**. Every cell below it can use `Folder`, as the cells on
[Reusable methods](lesson:building-reusable-tools) used `Stats` (rule 2 of
the rules of the road).

Look at the type of `Folders`: `Folder[]`. The description of a folder
uses `Folder` itself. A folder holds folders, and each of those can hold
more folders, as many levels deep as anyone likes.

`new Folder(...)` makes one folder, with its three values in that order.
The next cell makes the Holidays folder in a method, `Photos.Holidays()`.
Variables stay in their cell (rule 3), so each program below makes its own
Holidays folder, with one line: `Folder holidays = Photos.Holidays();`.

```csharp exec
id: calls-itself-photos
file: Photos.cs
static class Photos
{
    /// <summary>Returns the Holidays folder, with the folders inside it.</summary>
    public static Folder Holidays()
    {
        Folder kerry = new Folder("kerry",
            new string[] { "kerry-1.jpg", "kerry-2.jpg", "kerry-3.jpg" },
            new Folder[0]);
        Folder louvre = new Folder("louvre",
            new string[] { "louvre-1.jpg", "louvre-2.jpg" },
            new Folder[0]);
        Folder paris = new Folder("paris",
            new string[] { "paris-1.jpg", "paris-2.jpg" },
            new Folder[] { louvre });
        return new Folder("Holidays",
            new string[] { "sunset.jpg", "cake.jpg" },
            new Folder[] { kerry, paris });
    }
}
```

The folders inside are made first, because a folder must exist before
another folder can hold it. `new Folder[0]` is an array with no folders in
it: kerry has no folders inside it. Here is the same Holidays folder, drawn
as a file browser shows it.

![The Holidays folder drawn as a file browser shows it, one item to a line, with each level further to the right. Directly inside Holidays, at level 1, are two photos, sunset.jpg and cake.jpg, and two folders, kerry and paris. Inside kerry, at level 2, are kerry-1.jpg, kerry-2.jpg and kerry-3.jpg. Inside paris, at level 2, are paris-1.jpg, paris-2.jpg and a folder called louvre. Inside louvre, at level 3, are louvre-1.jpg and louvre-2.jpg. There are 9 photos in all.](holidays-folders.svg)

Each folder inside another is one *level* deeper. A shape like this, where
each folder can lead to several others and none leads back, is called a
*tree*.

A dot after a folder gives one of its values, and square brackets choose
one folder from an array, as they chose an element on
[Arrays and lists](lesson:lists-and-sequences). What do you think the last
line will print?

```csharp exec
id: calls-itself-folders-1
Folder holidays = Photos.Holidays();
Console.WriteLine(holidays.Name);
Console.WriteLine(holidays.Files.Length);
Console.WriteLine(holidays.Folders.Length);
Console.WriteLine(holidays.Folders[1].Name);
Console.WriteLine(holidays.Folders[1].Folders[0].Name);
```

The last line is `louvre`: the first folder inside the second folder
inside Holidays. `holidays.Files.Length` is 2, and
`holidays.Folders.Length` is 2 as well. Each one counts only what is
directly inside Holidays. Can you add a line that prints the name of the
first photo in louvre?

To count every photo, a program has to look inside the folders. Here is a
loop that counts the photos in Holidays, and then the photos in each folder
inside it.

```csharp exec
id: calls-itself-folders-2
Folder holidays = Photos.Holidays();
int found = holidays.Files.Length;
foreach (Folder inner in holidays.Folders)
{
    found = found + inner.Files.Length;
}
Console.WriteLine(found);
```

```predict
type: choice

How many photos will it count?

- 9
  - The loop looks inside the folders, so it finds every photo.
- 7
  - It counts the photos in Holidays, kerry and paris.
- 4
  - Two photos, and the two folders counted as one each.
```

It counts 7. The loop looks one level down, inside kerry and paris. But
paris has a folder of its own, louvre, and no line looks inside louvre, so
its photos are not counted.

We could put a second loop inside the first, to look inside louvre. But a
folder inside louvre would need a third loop, and a folder inside that
would need a fourth. We need one loop for each level, and we cannot know
how many levels there are until we look.

## A promise that uses itself

For a moment, we leave the folders, and look at a smaller question with
the same shape. On [Loops](lesson:repeating-yourself), a loop calculated
$5!$, *5 factorial*: $5 \times 4 \times 3 \times 2 \times 1$. Look at the
part after the 5: $4 \times 3 \times 2 \times 1$ is $4!$. So
$5! = 5 \times 4!$. The factorial of 5 has the factorial of 4 inside it,
the factorial of 4 has the factorial of 3 inside it, and so on, down to
the smallest.

In words: the factorial of $n$ is $n$ times the factorial of the number
one smaller. In symbols:

$$n! = n \times (n - 1)!$$

That rule uses factorial to explain factorial, so on its own it would
never end: $1! = 1 \times 0!$, then $0! = 0 \times (-1)!$, and so on. It
needs a place to stop. Mathematicians define $0!$ as 1, and that is where
it stops.

Here is the rule as a C# method. The comment above the method is its
promise: what it returns, and for which inputs. What do you think it
returns for 5?

```csharp exec
id: calls-itself-promise-1
// Returns n!, which is 1 × 2 × ... × n. n is a whole number, 0 or more.
static int Factorial(int n)
{
    if (n == 0)
    {
        return 1;
    }
    return n * Factorial(n - 1);
}

Console.WriteLine(Factorial(5));
```

It returns 120. Look at the last line of the method: `Factorial` calls
`Factorial`. A method that calls itself is a *recursive* method.
*Recursion* is solving a problem by using the same method on a smaller
problem of the same kind. A method can call itself in the same way as it
calls any other method in its cell.

Here is how to read that last line. Do not follow each call to the next
one. Trust the promise instead. The comment promises that
`Factorial(n - 1)` returns $(n - 1)!$. Then $n \times (n - 1)!$ is $n!$,
which is what this call promised. So the promise keeps itself, as long as
it stops somewhere.

If trusting the promise feels like cheating, the next section follows
every call, one at a time, so that you can see that nothing is hidden. You
can read it first, and then return here.

Every recursive method has two parts:

- The *base case* is an input small enough to answer at once, with no more
  calls. Here it is `n == 0`, and the answer is 1. It is the place where
  the promise stops.
- The *recursive case* is every other input. It gives a smaller problem to
  the same method, and builds its own answer from the answer that the
  smaller call returns.

### Your turn

The sum $1 + 2 + \dots + n$ has the same shape. In words, the sum up to
$n$ is $n$ plus the sum up to $n - 1$. What is the sum up to 0? Can you
finish `SumUpTo`, with a base case and a recursive case? Problem 4 on
[the practice page for Loops](lesson:repeating-yourself-practice#4-one-to-a-hundred) found
the sum up to 100 with a loop. Does your method agree with it?

```csharp exec
id: calls-itself-promise-your-turn
// Returns 1 + 2 + ... + n. n is a whole number, 0 or more.
static int SumUpTo(int n)
{
    // Your base case, then your recursive case
    return 0;
}

Console.WriteLine(SumUpTo(100));
```

```inputs
SumUpTo(0)
SumUpTo(1)
SumUpTo(4)
SumUpTo(100)
```

```hint
after: 1 runs
What should `SumUpTo(0)` return? That is the base case. For any other `n`,
which smaller sum is inside the sum up to `n`?
```

```hint
after: 3 runs
If `n == 0`, return 0. If not, return `n` plus the sum up to the number
one smaller. Which call to `SumUpTo` gives that sum?
```

```solution
// Returns 1 + 2 + ... + n. n is a whole number, 0 or more.
static int SumUpTo(int n)
{
    if (n == 0)
    {
        return 0;
    }
    return n + SumUpTo(n - 1);
}

Console.WriteLine(SumUpTo(100));
---
It prints 5050, as the loop did. The base case returns 0, because a sum
of nothing is 0, as a running total starts at 0. Put it beside
`Factorial`: only the base case's answer, and `+` in place of `*`, are
different.
```

## Calls that wait

When you write a recursion, you trust the promise. Now let's watch what C#
does. This version of `Factorial` prints a line when each call starts, and
another line when it returns its answer. The parameter `indent` is there
only for the printing: each call gives the next one four more spaces, so a
deeper call prints further to the right.

```csharp exec
id: calls-itself-wait-1
static int FactorialShown(int n, string indent)
{
    Console.WriteLine($"{indent}FactorialShown({n}) starts");
    int answer;
    if (n == 0)
    {
        answer = 1;
    }
    else
    {
        answer = n * FactorialShown(n - 1, indent + "    ");
    }
    Console.WriteLine($"{indent}FactorialShown({n}) returns {answer}");
    return answer;
}

FactorialShown(4, "");
```

```predict
type: choice

What will the last line print?

- FactorialShown(0) returns 1
  - The call for 0 is the last call to start.
- FactorialShown(4) returns 24
  - The call for 4 needs the answers of all the other calls.
- FactorialShown(4) starts
  - The call for 4 is the first call.
```

The last line is `FactorialShown(4) returns 24`. Five calls start, for 4,
3, 2, 1 and 0. Here is what happens, in order.

1. The call for 4 starts. It needs `FactorialShown(3)` before it can
   multiply, so it waits, and the call for 3 starts.
2. The call for 3 waits for 2, 2 waits for 1, and 1 waits for 0.
3. The call for 0 is the base case. It returns 1 at once.
4. Now the call for 1 can finish: $1 \times 1 = 1$. Then 2 finishes with
   $2 \times 1 = 2$, then 3 with $3 \times 2 = 6$, then 4 with
   $4 \times 6 = 24$.

![Five boxes in a staircase, each one lower and further right than the one before: FactorialShown(4), then FactorialShown(3), (2), (1) and (0). An arrow marked "waits for" goes down from each box to the next. Beside each box is what it returns, and when it starts and finishes. The call for 0 is the base case: it returns 1, starts 5th and finishes 1st. The call for 1 returns 1 × 1 = 1. The call for 2 returns 2 × 1 = 2. The call for 3 returns 3 × 2 = 6. The call for 4 returns 4 × 6 = 24: it starts 1st and finishes 5th.](calls-that-wait.svg)

The call for 4 starts first and finishes last. While the call for 0 runs,
four other calls are waiting, each one at the same line. Each call has its
own `n`:

| Call | Its own `n` | Waiting for | Then returns |
|---|---|---|---|
| first | 4 | the call for 3 | $4 \times 6 = 24$ |
| second | 3 | the call for 2 | $3 \times 2 = 6$ |
| third | 2 | the call for 1 | $2 \times 1 = 2$ |
| fourth | 1 | the call for 0 | $1 \times 1 = 1$ |
| fifth | 0 | nothing: the base case | 1 |

There are five variables called `n`, all at the same time, and none of
them changes another. Each call of a method gets its own parameters and
its own local variables, as [Methods](lesson:writing-your-own-functions)
found: a variable made in a method is *local* to it. Here, that matters.

The calls that have started and not yet finished make a list, with the
newest at the top. This list is the *call stack*. A new call goes on the
top, and only the call on the top runs. When it returns its answer, it
leaves the stack, and the call under it continues. It works like a stack
of plates: the last plate placed on the top is the first one removed.
Visual Studio's **Call Stack** window, on
[Debugging](lesson:when-it-goes-wrong), shows this list while a program
runs.

## Where the promise stops: the base case

What if we forget the base case? Here is `Factorial` without it. So that
we can see how far it goes, it prints `n` once in every 1,000 calls.
Printing every call would print thousands of lines. The cell is meant to
fail, and nothing is broken. Before you run it, what do you think will
happen?

```csharp exec
id: calls-itself-stop-1
expect: exception
// Meant to return n!, but it has no base case.
static int FactorialNoStop(int n)
{
    if (n % 1000 == 0)    // print n once in every 1,000 calls
    {
        Console.WriteLine(n);
    }
    return n * FactorialNoStop(n - 1);
}

Console.WriteLine(FactorialNoStop(4));
```

```predict
type: choice

What will happen when you press Run?

- It prints 24
  - 4 × 3 × 2 × 1 is 24.
- It runs until you press Stop
  - Nothing tells the calls to stop, as in a loop that never ends.
- It stops with an exception
  - Every call that waits needs some memory.
- It does not compile
  - The compiler can see that the method has no base case.
```

It compiles, and it does not print 24. `n` is 4, then 3, 2, 1 and 0, and
nothing tells it to stop there. The first line it prints is `0`, where the
base case would have stopped it. Then come `-1000`, `-2000`, and so on,
down to `-21000`. Then the program stops with an exception:

```console
Unhandled exception. System.StackOverflowException: The requested operation caused a stack overflow.
   at Program.cs (in FactorialNoStop(int))
```

Every call that waits keeps its own `n`, and that takes memory. The call
stack has a fixed amount of memory, and here more than 21,000 calls were
waiting at once. When the stack is full, the program cannot make another
call. That is a *stack overflow*: the call stack has no more room. The
report names the method, and not a line, because .NET stops before it can
say which line.

In maths, the rule $n! = n \times (n - 1)!$ would continue for ever without
$0! = 1$ to stop it. The computer does not continue for ever. It has no
more room.

A stack overflow is different from the exceptions on
[Exceptions](lesson:reading-an-error-message). It ends the whole program
at once, and `try` and `catch`, from
[Reusable methods](lesson:building-reusable-tools), cannot catch it. So a
recursion has to stop by itself. A program run from Visual Studio ends at
once too, and its console shows `Stack overflow.`. It can reach a very
different number of calls there, because the stack can have a different
size.

On [Loops](lesson:repeating-yourself), a `while` loop needed a line in its
body that changes its condition, so that the condition becomes `false`
after some steps. Without it, the loop never stopped. A recursion needs
the same, in two parts:

1. There is a base case: an input that makes no more calls.
2. Every call gives the method a smaller problem, one that is closer to
   the base case.

Without the second part, the base case is never reached. Which inputs
would take `Factorial` away from its base case? C#'s types stop some of
them before the program runs. The next cell gives `Factorial` the number
2.5. It is meant not to compile.

```csharp exec
id: calls-itself-stop-3
expect: CS1503
// Returns n!, which is 1 × 2 × ... × n. n is a whole number, 0 or more.
static int Factorial(int n)
{
    if (n == 0)
    {
        return 1;
    }
    return n * Factorial(n - 1);
}

Console.WriteLine(Factorial(2.5));
```

It does not compile, and nothing runs. The compiler says:

```console
Program.cs(11,29): error CS1503: Argument 1: cannot convert from 'double' to 'int'
```

`n` is an `int`, so a number with a decimal point cannot be its argument.
If it could, `n` would become 1 smaller at each call, and pass 0 without
ever being equal to it.

But a whole number below 0 is an `int`, so the compiler accepts it. Can
you change `2.5` to `-1`? Before you run it, which numbers will `n` be, call
after call? Will it ever equal 0? A promise holds only for the inputs it
names: here, whole numbers from 0 up.

### Your turn

Before a game of tag, a child counts backwards in twos: 5, 3, 1, Go! This
method never says Go!, and the cell is meant to stop with an exception. It
prints only the numbers above `-10`, so that its output stays short, and
those numbers are the clue. Why does the count never stop? Can you change
one line so that it does? (`return;`, with no value after it, ends a
`void` method at once.)

```csharp exec
id: calls-itself-stop-your-turn
expect: exception
// Counts backwards in twos from number, then says Go!
static void CountInTwos(int number)
{
    if (number == 0)
    {
        Console.WriteLine("Go!");
        return;
    }
    if (number > -10)    // print only the first numbers, to keep the output short
    {
        Console.WriteLine(number);
    }
    CountInTwos(number - 2);
}

CountInTwos(5);
```

```hint
after: 2 errors
Write down `number` for each call: 5, 3, 1, and then what? Does `number`
ever equal 0?
```

```hint
after: 3 errors
The base case should stop the count for 0, and for every number below 0
too. Which comparison is `true` for 0 and for every number below it?
```

```solution
// Counts backwards in twos from number, then says Go!
static void CountInTwos(int number)
{
    if (number <= 0)
    {
        Console.WriteLine("Go!");
        return;
    }
    if (number > -10)    // print only the first numbers, to keep the output short
    {
        Console.WriteLine(number);
    }
    CountInTwos(number - 2);
}

CountInTwos(5);
---
It prints 5, 3, 1 and `Go!`. With `==`, `number` went 5, 3, 1, -1: it
passed 0 without ever being equal to it, so the base case was never
reached. Would the first version have worked if the count started from 6?
A base case that stops at only one number can be missed when each step is
bigger than 1.
```

## Counting every photo

Back to the photos. Let's say the promise first, in words:
`CountPhotos(folder)` returns how many photos are inside `folder`, at any
depth.

Now keep the promise by using it on a smaller problem:

- start with the photos directly in the folder, `folder.Files.Length`;
- for each folder inside it, add `CountPhotos(inner)`: the same promise,
  on a smaller folder.

Where is the base case? A folder with no folders inside it makes no more
calls. Its loop runs zero times, and it returns its own photos. So the
recursion stops at every folder that has no folders inside it, with no
`if` for it.

The method is yours to write:

1. Start a count, `found`, at the number of photos directly in `folder`.
2. Loop over each folder `inner` in `folder.Folders`.
3. Add `CountPhotos(inner)` to `found`.
4. After the loop, return `found`.

Then compare it with a solution. How many photos should `CountPhotos`
give for an empty folder? And for a folder that holds only an empty
folder?

```csharp exec
id: calls-itself-toolkit
// Returns how many photos are inside folder, at any depth.
static int CountPhotos(Folder folder)
{
    // Your code
    return 0;
}

Folder holidays = Photos.Holidays();
Console.WriteLine(CountPhotos(holidays));
```

```inputs
CountPhotos(holidays)
CountPhotos(holidays.Folders[1])    // paris
CountPhotos(new Folder("empty", new string[0], new Folder[0]))
CountPhotos(new Folder("boxes", new string[0], new Folder[] { new Folder("box", new string[0], new Folder[0]) }))    // a folder, and no photos
```

```hint
after: 1 runs
What should `CountPhotos` return for kerry, which has no folders inside
it? Start there. Then, what does each folder inside add?
```

```hint
after: 3 runs
Does your method call `CountPhotos(inner)` inside the loop? And does it
add what that call returns to `found`? A call whose answer is not used
changes nothing.
```

```solution
// Returns how many photos are inside folder, at any depth.
static int CountPhotos(Folder folder)
{
    int found = folder.Files.Length;
    foreach (Folder inner in folder.Folders)
    {
        found = found + CountPhotos(inner);
    }
    return found;
}

Folder holidays = Photos.Holidays();
Console.WriteLine(CountPhotos(holidays));
---
It counts 9 photos in Holidays, where the loop found 7. It does not matter
how deep a folder is. Each folder is counted by its own call, and each
call looks only one level down.
```

### Your turn

Can you write `CountFolders(folder)`, which counts the folders inside
`folder`, at any depth, in place of the photos? For Holidays, those are
kerry, paris and louvre. A method belongs to its cell, so copy your
`CountPhotos` into this cell as a start, and change its name. It needs two
more changes. What does each folder inside add, besides the folders inside
it?

```csharp exec
id: calls-itself-count-your-turn
// Returns how many folders are inside folder, at any depth.
static int CountFolders(Folder folder)
{
    // Your code
    return 0;
}

Folder holidays = Photos.Holidays();
Console.WriteLine(CountFolders(holidays));
```

```inputs
CountFolders(holidays)
CountFolders(holidays.Folders[0])    // kerry
CountFolders(holidays.Folders[1])    // paris
```

```hint
after: 1 runs
Where does `CountPhotos` start its count, and what does it add for each
folder inside? Which of those two should change, when the files are not
counted?
```

```solution
// Returns how many folders are inside folder, at any depth.
static int CountFolders(Folder folder)
{
    int found = 0;
    foreach (Folder inner in folder.Folders)
    {
        found = found + 1 + CountFolders(inner);
    }
    return found;
}

Folder holidays = Photos.Holidays();
Console.WriteLine(CountFolders(holidays));
---
It prints 3. The count starts at 0, because the files are not counted
now. Each folder inside counts 1 for itself, and then the folders inside
it. The base case is the same as before: a folder with no folders inside
it returns 0.
```

## Recursion or a loop?

Is there a loop that can count every photo? There is, if it keeps a list
of the folders it has not opened yet. Here is the plan:

1. Put the whole folder in the list of folders to open.
2. While that list is not empty, take one folder from it. Count its
   photos, and put each folder inside it into the list, for later.

C# has a collection that suits this list: a *stack*, `Stack<Folder>`.
`Push` puts an element on the top. `Pop` removes the element on the top,
and returns it. `Count` says how many are left. Like the call stack, the
last element in is the first one out. Will this loop find every photo too?
And in what order will it open the folders?

```csharp exec
id: calls-itself-loop-1
// Returns how many photos are inside folder, at any depth, with a loop.
static int CountPhotosByLoop(Folder folder)
{
    int found = 0;
    Stack<Folder> toOpen = new();
    toOpen.Push(folder);
    while (toOpen.Count > 0)
    {
        Folder current = toOpen.Pop();
        Console.WriteLine($"Opening {current.Name}");
        found = found + current.Files.Length;
        foreach (Folder inner in current.Folders)
        {
            toOpen.Push(inner);
        }
    }
    return found;
}

Console.WriteLine(CountPhotosByLoop(Photos.Holidays()));
```

It finds 9, as `CountPhotos` did. The stack `toOpen` does the job that the
call stack did for `CountPhotos`: it keeps the work that is still waiting.
Look at the order. It opens paris, and louvre inside it, before kerry,
because the loop pushed kerry and then paris, and a stack returns the last
element first. The
order changes nothing about the total.

Any recursion can be written as a loop with a stack like this one, and any
loop can be written as a recursion. So which is better?

| | Recursion | A loop with a stack |
|---|---|---|
| How it reads | close to the promise in words | more lines, and the stack is ours to manage |
| What waits | calls, on the call stack | folders, in our own `Stack` |
| How deep it can go | until the call stack is full: more than 21,000 calls of `FactorialNoStop`, on this page | as deep as the computer's memory allows |

A folder tree is rarely thousands of levels deep, so for folders,
recursion is easier to read, and the call stack has room for it. For a
list of a million numbers, a recursion that makes one call for each
number, as `Factorial` does, would fill the call stack, and a loop is the
better tool.

C# has a `Queue<Folder>` too, which returns the element that went in
first: `Enqueue` puts an element in, and `Dequeue` removes one and returns
it. Can you change the stack in the cell into a queue? In what order does
the loop open the folders now?

<details class="dl-why"><summary>Why this way?</summary>

This page asked you to trust the promise before it showed you the calls.
You read `n * Factorial(n - 1)` as "$n$ times $(n - 1)!$", and only then
watched five calls wait inside each other.

Many courses go the other way. They trace every call first, with a drawing
of the call stack, and the promise comes later. To *trace* a program is to
follow it one step at a time and write down what each step does. The trace
shows that nothing is hidden, and it is what Visual Studio's debugger shows you when a
recursion does something you did not expect.

We started with the promise because tracing stops working quickly. You can
trace `Factorial(4)`. You cannot trace a folder of ten thousand photos. The
two checks from this page, a base case that stops and a promise kept for
one step, work at any size. Mathematicians use the same two checks to
prove that a rule holds for every whole number.

</details>

## Looking back

How many times is `CountPhotos` called, in all, for Holidays? Does that
number depend on the photos, or on the folders? You could add a line at
the top of the method that prints `folder.Name`, and count the lines.

Trusting the promise, or following every call: which one helped you more
on this page?

A challenge: can you print every photo with the folders it is in, such as
`Holidays/paris/louvre/louvre-1.jpg`? The method `PrintAll` is given a
folder and its path: the names of the folders from the top to it, with a
`/` between one name and the next. It prints the path of each of its photos,
and then calls itself for each folder inside, with a path that is one
folder longer. The challenge opens in a new notebook, with no cells above
it, so it brings its own `Folder` and a smaller Holidays. In one file, C#
needs the program's statements before any type, so the record comes last.

```csharp challenge
// Print every photo with the folders it is in, like Holidays/paris/louvre/louvre-1.jpg.
static void PrintAll(Folder folder, string path)
{
    // Your code: print this folder's photos, then call PrintAll for each folder inside it
}

Folder louvre = new Folder("louvre",
    new string[] { "louvre-1.jpg", "louvre-2.jpg" },
    new Folder[0]);
Folder paris = new Folder("paris",
    new string[] { "paris-1.jpg", "paris-2.jpg" },
    new Folder[] { louvre });
Folder holidays = new Folder("Holidays",
    new string[] { "sunset.jpg", "cake.jpg" },
    new Folder[] { paris });
PrintAll(holidays, "Holidays");

record Folder(string Name, string[] Files, Folder[] Folders);
```

Everything on this page runs here, in the browser, and none of it needs
Visual Studio. To keep a program, **Download project** on its cell saves
it as a Visual Studio project. It prints the same there, apart from the
two cells that end with a stack overflow. The types that a program uses
from the cells above go into the project too, each in a file of its own: `Folder.cs` and
`Photos.cs`.

The extra page *Making change* has a recursion that asks the same smaller
question many times, and it remembers each answer in a `Dictionary`, so
that it calculates each one only once.

## Where to read more

Microsoft. *Records*.
<https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records>.
What a record is, and what C# writes for you when you describe a type in
one line, as `Folder` is on this page.

Microsoft. *StackOverflowException Class*.
<https://learn.microsoft.com/en-us/dotnet/api/system.stackoverflowexception>.
The official description of a stack overflow in .NET. It says that `try`
and `catch` cannot catch one, and that a program that uses recursion
should make sure that the recursion stops. It is written for programmers
who know C# well, so read the part called *Remarks*.

Microsoft. *Stack&lt;T&gt; Class*.
<https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.stack-1>.
Every method a `Stack` has, including `Push`, `Pop` and `Peek`, with an
example program that uses them.

Reducible (2019). *5 Simple Steps for Solving Any Recursive Problem.*
<https://www.youtube.com/watch?v=ngCos392W4w>. Reducible solves three
recursive problems, each harder than the last, by asking the question this
page asks: if a smaller case were already solved, how would we use it? Its
examples are not in C#, but the ideas are the same. The video is about
twenty-one minutes long.
