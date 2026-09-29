---
title: "A polynomial class: a project in many methods"
version: 2026.09.28.1
from: a-polynomial-class
covers: [FOOP-LO4, FOOP-LO8]
---

# A polynomial class: a project in many methods

This page is a project: one class, built one method at a time, on your own
or with a partner. It is an extra, and it is harder than the pages before
it. Each stage has a first step anyone can take, more for anyone who wants
it, and one answer to compare with when you are ready. It uses only what
the course teaches by the end of
[Methods and overloading](lesson:one-class-many-methods), and it adds one
thing that C# can do: give `+` a meaning for a class of your own.

A ball is thrown straight upwards at 20 metres a second, from a hand 1.5 m
above the ground. After $x$ seconds, its height in metres is

$$-5x^2 + 20x + 1.5$$

taking gravity as 10 m/s² to keep the numbers simple. (It is nearer 9.8.)
A sum of terms like this, each a number times a power of $x$, is a
*polynomial*. The number in front of each power is its *coefficient*:
here, −5, 20 and 1.5.

## A ball in the air

We can store a polynomial as a list of its coefficients, where the item at
index `i` is the coefficient of $x^i$. So $-5x^2 + 20x + 1.5$ is the list
`{ 1.5, 20, -5 }`: first the number on its own ($x^0$), then $x^1$, then
$x^2$. If you have done dewlab's Python page
[Polynomials: representing and combining them in Python](https://deweydex.github.io/dewlab/tutorials/expressions-come-alive.html),
you have met this list, and functions that use it. Here the list and the
methods that use it become one class, `Polynomial`, and the list is a
private field.

`Evaluate(x)` gives the polynomial's value for one $x$. C# writes times as
`*`, but it has no symbol for a power. So `Evaluate` uses
`Math.Pow(x, power)`, which gives $x$ to that power, as a `double`.

```csharp exec
id: a-ball-in-the-air-1
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }
}
```

The program below makes the ball's polynomial from the class above (rule
2: a class written in a cell can be used by the cells below it). It prints
the ball's height each second for four seconds. What is the greatest
height it will print?

```csharp exec
id: a-ball-in-the-air-1-program
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
for (int second = 0; second <= 4; second++)
{
    Console.WriteLine($"{second} s: {height.Evaluate(second)} m");
}
```

```predict
type: choice

What is the greatest height it will print?

- 21.5, after 2 seconds
  - The ball slows as it rises, and stops rising half-way through its flight.
- 41.5, after 2 seconds
  - 20 metres a second for 2 seconds, plus the 1.5 m it started at.
- 81.5, after 4 seconds
  - The ball rises for as long as we watch.
```

The greatest is `21.5` m, after 2 seconds, and after 4 seconds the ball is
at 1.5 m again, the height of the hand it left. Is 2 seconds the top of
the throw, or only the highest of the five times we asked about? A later
stage of this page answers that.

## The highest power

The *degree* of a polynomial is the highest power of $x$ with a
coefficient that is not 0. The ball's polynomial has degree 2.

Can you give `Polynomial` a `Degree()` method, which returns the degree as
an `int`? Before you start: what is the degree of the polynomial with the
coefficients `{ 1, 2, 0 }`?

The class below is the one from the top of the page, written again for you
to change. The cells below it use this copy (rule 4: a class written again
further down replaces the earlier one). The program under it calls
`Degree()`, and the class has no method with that name yet, so the program
is meant to fail to compile. Run it first, and read the message. Then add
the method to the class, and run the program again. Each program on this
page makes its own polynomial (rule 3: variables stay in their cell).

```csharp exec
id: the-highest-power-1
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }
}
```

```csharp exec
id: the-highest-power-1-program
expect: CS1061
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height.Degree());
```

As the class stands, the program does not compile: `error CS1061:
'Polynomial' does not contain a definition for 'Degree' …`. The compiler
found a call to a method that the class does not have. When the class has
one, the program compiles and runs.

```inputs
new Polynomial(new List<double> { 1.5, 20, -5 }).Degree()
new Polynomial(new List<double> { 1, 2, 0 }).Degree()
new Polynomial(new List<double> { 7 }).Degree()
```

```hint
after: 2 errors
What polynomial is `{ 1, 2, 0 }`? It is $0x^2 + 2x + 1$, which is
$2x + 1$. Is its highest power 2? Which coefficient should the method
check first, and in which order should it check the others?
```

```solution
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height.Degree());

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        for (int power = _coefficients.Count - 1; power >= 0; power--)
        {
            if (_coefficients[power] != 0)
            {
                return power;
            }
        }
        return 0;
    }
}
---
2, then 1, then 0. For `{ 1, 2, 0 }`, the last coefficient in the list is
0, and that is the trap: the method has to skip the zero at the top. This
method starts at the highest power, and checks the powers below it, one at
a time, until it finds a coefficient that is not 0. (Strictly, a polynomial
whose coefficients are all 0 has no degree. Returning 0 keeps it simple
here.)

The last line, `return 0;`, is there for the compiler too. Without it, the
class does not compile: `error CS0161: 'Polynomial.Degree()': not all code
paths return a value`. If the loop finds no coefficient other than 0, the
method reaches its end, and it must still return an `int`.

The solution writes `Polynomial` again, below its program (rule 4), and C#
uses this one in place of yours. In one file, C# wants the statements
first and the classes after them.
```

## A rule for the coefficients

Zeros at the top of the list make extra work. `Degree()` had to skip
them, and every method we write later would have to remember them too.
[Encapsulation](lesson:keeping-details-inside-an-object), keeping an
object's data inside the object so that only its own methods change it,
offers a better place for the rule: the constructor, which runs once for
every polynomial. If the constructor removes the zeros at the top, every
other method can trust the list, and `Degree()` is one line.

There is a second thing the constructor should do, and it is harder to
see. Here is the class with the `Degree()` method from the solution above.
`Evaluate` is not in this copy, to keep it short.

```csharp exec
id: a-rule-for-the-coefficients-1
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        _coefficients = coefficients;
    }

    public int Degree()
    {
        for (int power = _coefficients.Count - 1; power >= 0; power--)
        {
            if (_coefficients[power] != 0)
            {
                return power;
            }
        }
        return 0;
    }
}
```

The program makes a polynomial from a list, `numbers`, and then adds one
more number to that list. With the constructor as it is, what will it
print?

```csharp exec
id: a-rule-for-the-coefficients-1-program
var numbers = new List<double> { 1.5, 20, -5 };
var height = new Polynomial(numbers);
numbers.Add(3);
Console.WriteLine(height.Degree());
```

```predict
type: number

What will it print?
```

It prints `3`. The program never used `_coefficients`, and it could not,
because the field is private. Still, the program changed the polynomial.
The reason is the constructor's line `_coefficients = coefficients;`.

`List<double>` is a class, and a variable whose type is a class does not
hold the object itself. It holds a *reference*: where to find the object.
`=` copies the reference, and not the list. So `numbers` and
`_coefficients` are two names for one list, and a change made through one
name is seen through the other.
[Two names, one list](lesson:two-names-one-list) shows this in more
detail, and [Two names, one object](lesson:two-names-one-object) is about the same idea for objects of
your own classes.

`private` stops other code from using the name `_coefficients`. It does
not stop code that has another name for the same list. So the constructor
needs its own list: `new List<double>(coefficients)` makes a new list with
the same numbers in it, a copy that belongs to the polynomial alone. Here
is the constructor with both rules, and `Degree()` in one line:

```csharp exec
id: a-rule-for-the-coefficients-2
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }
}
```

This program is the one from the predict, with `{ 1, 2, 0 }`, and one more
line that prints the caller's list. `string.Join` puts the list's items
into one piece of text, because printing a list itself prints only the
name of its type. What do you expect to see?

```csharp exec
id: a-rule-for-the-coefficients-2-program
var numbers = new List<double> { 1, 2, 0 };
var tidy = new Polynomial(numbers);
numbers.Add(3);
Console.WriteLine(tidy.Degree());
Console.WriteLine(string.Join(", ", numbers));
```

It prints `1`, then `1, 2, 0, 3`. The polynomial removed the zero from its
own list and kept its own copy, and neither rule changed the caller's
list. `top` is the index of the last item, the highest power, and
`RemoveAt(top)` removes the item at that index. The `while` loop removes
the top coefficient for as long as it is 0, but it stops at index 0
(`top > 0`), so it never removes the last one left. So
`new Polynomial(new List<double> { 0 })` is still a polynomial: the one
that is 0 everywhere.

## Printing it the way we write it

The program at the end of this section prints the ball's polynomial. Run
it, and it prints only `Polynomial`. When a class has no `ToString()` of
its own, printing an object prints the name of its class, as on
[Classes and objects](lesson:objects-and-classes). Can you give
`Polynomial` a `ToString()` that shows it the way we write it:
`-5x^2 + 20x + 1.5`?

Text on a screen cannot raise the 2 in $x^2$, so a computer usually writes
`x^2`. (In C# code, `^` does not give a power. It does a different
calculation, called *exclusive or*, which this page does not use. In the
text that a method returns, `^` is only a character.)

This task can grow in steps, and you can stop after any step. A first
version might show every term, as `-5x^2 + 20x^1 + 1.5x^0`. Then take the
cases one at a time:

- skip a term whose coefficient is 0;
- write `x^1` as `x`, and skip `x^0`;
- write `- 5` in place of `+ -5`;
- write `x^2`, not `1x^2`.

The method starts `public override string ToString()`, as on the Classes
and objects page. The class below is the one with both rules, written
again for you to change. Add the method to it, and then run the program
under it.

```csharp exec
id: printing-it-the-way-we-write-it-1
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }
}
```

```csharp exec
id: printing-it-the-way-we-write-it-1-program
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height);
```

```inputs
new Polynomial(new List<double> { 1.5, 20, -5 }).ToString()
new Polynomial(new List<double> { -1, 0, 1 }).ToString()
new Polynomial(new List<double> { 3, -1, 0, 2 }).ToString()
new Polynomial(new List<double> { 0 }).ToString()
```

```hint
after: 2 runs
Where does the text start? In a variable, from `""`, with one term added
at a time, from the highest power to the lowest. For each term, which sign
goes in front depends on two things: is the coefficient below 0, and is
the text still empty?
```

```solution
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }
}
---
`-5x^2 + 20x + 1.5`, `x^2 - 1`, `2x^3 - x + 3` and `0`. `Math.Abs` gives a
number without its sign, so the sign is written once, as `-` or `+`, and
the number after it is always the size. `ToString()` asks `Degree()` where
to start, and trusts the rule in the constructor that there is no zero at
the top.

`text + size` joins the text and the number: when one side of `+` is a
`string`, C# makes the other side into text, and joins the two. A string
cannot be changed, so each `+` makes a new string, and `text` then names
the new one.
```

## Polynomials that make polynomials

Two polynomials can be added: add the coefficients of each power. Can you
give `Polynomial` an `Add(Polynomial other)` method that returns a new
polynomial, and leaves both of the old ones as they were?

Inside `Add`, the code can use `other._coefficients`, though the field is
private. `private` means that only code inside the class `Polynomial` can
use the field. `Add` is inside that class, so it can use the private
fields of any `Polynomial`, not only its own.

The class below is one answer to the stage before, with `ToString()`. It
replaces your class for the cells below it (rule 4). If you prefer your
own `ToString()`, copy it into this class. Then write `Add` in this class.
The program under it calls `Add`, so it is meant to fail to compile until
the method exists.

```csharp exec
id: polynomials-that-make-polynomials-1
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }
}
```

```csharp exec
id: polynomials-that-make-polynomials-1-program
expect: CS1061
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first.Add(second));
```

```inputs
first.Add(second).ToString()
new Polynomial(new List<double> { 1, 2 }).Add(new Polynomial(new List<double> { 0, 0, 3 })).ToString()
first.Add(second).Degree()
first.ToString()   // first, after the Add
```

```hint
after: 2 errors
Are the two lists the same length? If not, what can you add to the end of
the shorter one, without changing the polynomial it describes?
```

```solution
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first.Add(second));

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Add(Polynomial other)
    {
        var mine = new List<double>(_coefficients);
        var theirs = new List<double>(other._coefficients);
        while (mine.Count < theirs.Count)
        {
            mine.Add(0);
        }
        while (theirs.Count < mine.Count)
        {
            theirs.Add(0);
        }
        var total = new List<double>();
        for (int power = 0; power < mine.Count; power++)
        {
            total.Add(mine[power] + theirs[power]);
        }
        return new Polynomial(total);
    }
}
---
`2x + 1`. The two $x^2$ terms cancel, and the answer's degree is 1, not 2,
because `Add` returns `new Polynomial(total)`, and the new polynomial's own
constructor removes the zero at the top. A method can make a new object of
its own class, and that object keeps the same rules. The last input shows
that `first` is still `3x^2 + 2x + 1`: `Add` makes copies of the two
lists and changes only the copies.
```

### The top of the throw

If you have met derivatives, there is one more method to write. The
*derivative* of a polynomial is another polynomial, which gives how fast
the first one changes at each $x$. (dewlab's Python page
[Derivatives: the rate of change of a curve](https://deweydex.github.io/dewlab/tutorials/rates-of-change.html)
teaches them.) By the power rule, the derivative of $ax^n$ is $nax^{n-1}$.
Can you give `Polynomial` a `Derivative()` method that returns the
derivative as a new polynomial? The ball is highest when its height stops
growing, which is where the derivative is 0. When is that?

The class below is one answer to the stage before, with `Add`. It replaces
your class for the cells below it (rule 4). Add `Derivative` to it. The
program under it calls the method, so it is meant to fail to compile until
the method exists.

```csharp exec
id: polynomials-that-make-polynomials-2
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Add(Polynomial other)
    {
        var mine = new List<double>(_coefficients);
        var theirs = new List<double>(other._coefficients);
        while (mine.Count < theirs.Count)
        {
            mine.Add(0);
        }
        while (theirs.Count < mine.Count)
        {
            theirs.Add(0);
        }
        var total = new List<double>();
        for (int power = 0; power < mine.Count; power++)
        {
            total.Add(mine[power] + theirs[power]);
        }
        return new Polynomial(total);
    }
}
```

```csharp exec
id: polynomials-that-make-polynomials-2-program
expect: CS1061
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
var speed = height.Derivative();
Console.WriteLine(speed);
Console.WriteLine(speed.Evaluate(2));
```

```inputs
height.Derivative().ToString()
height.Derivative().Evaluate(2)
new Polynomial(new List<double> { 7 }).Derivative().ToString()
```

```hint
after: 2 errors
Where does the derivative's coefficient of $x^1$ come from? From the
coefficient of $x^2$ in the polynomial, times 2. Which power of the
polynomial gives the derivative's $x^0$? And which power gives nothing at
all?
```

```solution
var height = new Polynomial(new List<double> { 1.5, 20, -5 });
var speed = height.Derivative();
Console.WriteLine(speed);
Console.WriteLine(speed.Evaluate(2));

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public double Evaluate(double x)
    {
        double total = 0;
        for (int power = 0; power < _coefficients.Count; power++)
        {
            total = total + _coefficients[power] * Math.Pow(x, power);
        }
        return total;
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Add(Polynomial other)
    {
        var mine = new List<double>(_coefficients);
        var theirs = new List<double>(other._coefficients);
        while (mine.Count < theirs.Count)
        {
            mine.Add(0);
        }
        while (theirs.Count < mine.Count)
        {
            theirs.Add(0);
        }
        var total = new List<double>();
        for (int power = 0; power < mine.Count; power++)
        {
            total.Add(mine[power] + theirs[power]);
        }
        return new Polynomial(total);
    }

    public Polynomial Derivative()
    {
        var slopes = new List<double>();
        for (int power = 1; power < _coefficients.Count; power++)
        {
            slopes.Add(power * _coefficients[power]);
        }
        if (slopes.Count == 0)
        {
            slopes.Add(0);
        }
        return new Polynomial(slopes);
    }
}
---
`-10x + 20`, and `0` at 2 seconds. So the ball is highest at exactly 2
seconds, at 21.5 m, which answers the question from the first stage. The
derivative of a number on its own is 0, so a polynomial of degree 0 gives
the polynomial `0`. The loop starts at power 1, because the term at power
0 gives nothing. For a polynomial of degree 0, the loop adds nothing to
`slopes`, and without the `if` the list would be empty.
```

## A plus sign for polynomials

We add two numbers with `+`. Can we add two polynomials with `+` too? Here
is the program from the `Add` task, with `first + second` in the place of
`first.Add(second)`. It uses the class above, which has `Add`. Whatever
happens when you run it is meant to happen, and nothing is broken.

```csharp exec
id: a-plus-sign-for-polynomials-1
expect: CS0019
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first + second);
```

```predict
type: choice

What will happen when you run it?

- It prints `2x + 1`.
  - C# sees two polynomials, and adds them.
- It prints `3x^2 + 2x + 1-3x^2`.
  - C# makes each polynomial into text, and `+` joins the two texts.
- It does not compile.
  - C# does not know what `+` means for a polynomial.
```

It does not compile: `error CS0019: Operator '+' cannot be applied to
operands of type 'Polynomial' and 'Polynomial'`. An *operator* is a symbol
that does a calculation, such as `+` or `*`, and an *operand* is a value
that an operator uses: here, the two polynomials. C# knows what `+` means
for numbers and for text. `+` joins text only when one of its operands is
a `string`, and neither of these is. And C# does not choose a method by
its name: a method called `Add` does not give `+` a meaning.

A class can give `+` a meaning of its own, with a method of a special
kind. Here is `Polynomial` with `Add` and one more method, at the end.
This copy has no `Evaluate` and no `Derivative`, to keep it short: the
program below uses neither.

```csharp exec
id: a-plus-sign-for-polynomials-2
file: Polynomial.cs
class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Add(Polynomial other)
    {
        var mine = new List<double>(_coefficients);
        var theirs = new List<double>(other._coefficients);
        while (mine.Count < theirs.Count)
        {
            mine.Add(0);
        }
        while (theirs.Count < mine.Count)
        {
            theirs.Add(0);
        }
        var total = new List<double>();
        for (int power = 0; power < mine.Count; power++)
        {
            total.Add(mine[power] + theirs[power]);
        }
        return new Polynomial(total);
    }

    public static Polynomial operator +(Polynomial left, Polynomial right)
    {
        return left.Add(right);
    }
}
```

The new method has four parts:

- `public static`: C# needs both words on an operator like this one.
  `static` means that the method belongs to the class, and not to one
  object, like the `static` fields on
  [Methods and overloading](lesson:one-class-many-methods). So the method
  has no object of its own, and both polynomials are its parameters.
- `Polynomial`: the type of the answer.
- `operator +`: the method's name, which is the word `operator` and the
  symbol.
- `(Polynomial left, Polynomial right)`: its two operands. `left` is the
  polynomial written before the `+`, and `right` is the one written after
  it.

Giving an operator a meaning for a new type is called *operator
overloading*. *Overloading* is the word that
[Methods and overloading](lesson:one-class-many-methods) uses for methods
that share a name. `+` now has several meanings, and C# chooses one by the
types of its operands, as it chooses between overloaded methods by the
types of the arguments.

Here is the program again, with two more lines: the ball's height, plus
the polynomial that is −1.5 everywhere. What do you expect the second line
to print?

```csharp exec
id: a-plus-sign-for-polynomials-2-program
var first = new Polynomial(new List<double> { 1, 2, 3 });
var second = new Polynomial(new List<double> { 0, 0, -3 });
Console.WriteLine(first + second);

var height = new Polynomial(new List<double> { 1.5, 20, -5 });
Console.WriteLine(height + new Polynomial(new List<double> { -1.5 }));
```

It prints `2x + 1`, and then `-5x^2 + 20x`. The second line is the ball's
height above the hand, not above the ground. The two numbers on their
own, 1.5 and −1.5, cancel, and `ToString()` skips a term whose coefficient
is 0. The operator did no adding of its own: `+` calls `Add`, and every
rule of `Add` and of the constructor still holds.

## Looking back

Which decision made the most methods easier to write? And which method
took you the most attempts before it did what you wanted? If you worked
with a partner, did you agree?

`private` stops other code from using the name `_coefficients`, and the
copy in the constructor stops other code from changing the list through a
name of its own. Why do you think the class needs both?

A challenge: can you give `Polynomial` a `Multiply(Polynomial other)`
method, and an `operator *` that uses it? Each term of one polynomial
multiplies each term of the other, and the powers add. So $(x + 1)$ times
$(x - 1)$ is $x^2 - 1$.

The class in the challenge has the constructor, `Degree()` and
`ToString()` from this page. Each of the two new methods holds one line
for now: `throw new NotImplementedException();`. `throw` stops the program
with an exception, and `NotImplementedException` is an exception whose
name says what happened: the method is not *implemented*, which means not
written yet. The line lets the class compile before the method is
written. In one file, C# needs the program's statements before any class,
so the class comes last.

```csharp challenge
var first = new Polynomial(new List<double> { 1, 1 });     // x + 1
var second = new Polynomial(new List<double> { -1, 1 });   // x - 1
Console.WriteLine(first.Multiply(second));
Console.WriteLine(first * second);

class Polynomial
{
    private List<double> _coefficients;

    public Polynomial(List<double> coefficients)
    {
        // A copy, so that the caller's list and this one are two lists
        _coefficients = new List<double>(coefficients);
        int top = _coefficients.Count - 1;
        while (top > 0 && _coefficients[top] == 0)
        {
            _coefficients.RemoveAt(top);
            top = top - 1;
        }
    }

    public int Degree()
    {
        return _coefficients.Count - 1;
    }

    public override string ToString()
    {
        string text = "";
        for (int power = Degree(); power >= 0; power--)
        {
            double coefficient = _coefficients[power];
            if (coefficient != 0)
            {
                if (coefficient < 0 && text == "")
                {
                    text = "-";
                }
                else if (coefficient < 0)
                {
                    text = text + " - ";
                }
                else if (text != "")
                {
                    text = text + " + ";
                }
                double size = Math.Abs(coefficient);
                if (size != 1 || power == 0)
                {
                    text = text + size;
                }
                if (power == 1)
                {
                    text = text + "x";
                }
                else if (power > 1)
                {
                    text = text + $"x^{power}";
                }
            }
        }
        if (text == "")
        {
            return "0";
        }
        return text;
    }

    public Polynomial Multiply(Polynomial other)
    {
        throw new NotImplementedException();
    }

    public static Polynomial operator *(Polynomial left, Polynomial right)
    {
        throw new NotImplementedException();
    }
}
```

Everything on this page runs here, on the page, and nothing in it needs
Visual Studio. Any program cell can be downloaded as a Visual Studio
project, and it prints the same there. The project for a program cell
holds one `Polynomial.cs`: the last copy of the class above that cell,
which is the copy the program uses (rule 4).

Next, if you came here from
[Methods and overloading](lesson:one-class-many-methods),
[Designing classes: from a description to classes and enums](lesson:from-a-description-to-classes)
starts where a real program starts: with a description in words, and no
code at all.

## Where to read more

Everything here is covered elsewhere too, often in a form that may suit
you better than this one.

Microsoft. *Operator overloading* (C# reference).
<https://learn.microsoft.com/dotnet/csharp/language-reference/operators/operator-overloading>.
This page lists every operator a class can give a meaning to, and the
rules an operator method must keep. Its example is a type for fractions,
with `+`, `-`, `*` and `/`.

Microsoft. *List&lt;T&gt; Constructor* (.NET API reference).
<https://learn.microsoft.com/dotnet/api/system.collections.generic.list-1.-ctor>.
The constructor that takes another collection is the one this page's
constructor uses to make its copy.
