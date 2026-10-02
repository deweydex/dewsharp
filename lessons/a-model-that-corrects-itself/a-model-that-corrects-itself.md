---
title: "The perceptron: a class that learns from its mistakes"
version: 2026.10.02.1
from: a-model-that-corrects-itself
covers: [FOOP-LO3, FOOP-LO7]
---

# The perceptron: a class that learns from its mistakes

This program draws a small picture, made of `#` and `.` characters. What do
you think it draws? Run it and see.

```csharp exec
id: a-model-that-starts-out-wrong-1
bool[,] plus =
{
    { false, true, false },
    { true, true, true },
    { false, true, false },
};

for (int row = 0; row < 3; row++)
{
    string line = "";
    for (int column = 0; column < 3; column++)
    {
        if (plus[row, column])
        {
            line = line + "#";
        }
        else
        {
            line = line + ".";
        }
    }
    Console.WriteLine(line);
}
```

It draws a plus, one row on each line: `#` for a black pixel, and `.` for
a white one. A *pixel* is one of the small squares that a screen makes a
picture from. This picture is a grid of 3 by 3 pixels, and each pixel is
black or white.

The program keeps the grid in a *two-dimensional array* of `bool`: an
array with rows and columns. It holds `true` for a black pixel and `false`
for a white one. `plus[row, column]` is one pixel. The row and the column
both count from 0, so `plus[1, 0]` is the pixel at the left of the middle
row.

Can you change the `true`s and `false`s, so that it draws a cross? A cross
has a black pixel in each corner and one in the centre.

The plus and the cross are the two shapes on this page. We want a program
that decides whether a picture shows a plus sign or a cross.

On the pages before this one, the program decides how much an object
changes. `TakeDamage(5)` takes 5 from a character's health, and `Burn(30)`
takes 30 from a probe's fuel. On this page, we build an object that
decides for itself. The program only shows it an example, and the object
changes its own fields, after its own mistakes.

The object is a *perceptron*. A perceptron is a small *model*: a rule that
makes a decision from some numbers. It starts knowing nothing, and it
learns from examples. A *neural network*, the kind of program behind many
tools that recognise speech and pictures, is made of many small models
like it.

This page is an extra. It uses three earlier pages:

- [Classes and objects](lesson:objects-and-classes), for classes and
  objects;
- [Grids and references](lesson:grids-and-references), for
  two-dimensional arrays;
- [Random numbers](lesson:leaving-it-to-chance), for random numbers with
  a seed.

If you have not read one of the last two, the page says in a sentence what
each idea is, where it first uses the idea.

## A picture is an object

The rest of the page needs many pictures, so we give them a class. A
`Picture` keeps its pixels in a field, `Pixels`, of type `bool[,]`. Its
constructor takes the three rows as text, such as `".#."`. That is quicker
to write and to read than nine `true`s and `false`s.

The first cell below holds only the class, so it has a **Check** button in
place of **Run**. The program in the cell under it uses the class (rule 2:
a class written in a cell can be used by the cells below it). A variable
does not carry down like that, so every program on this page makes its own
pictures again (rule 3: variables stay in their cell).

`Picture` has three methods:

- `ToString` draws the picture with `#` and `.`, as the cell above did.
  `"\n"` is a string that holds a new line.
- `DifferencesFrom` counts the pixels that are black in one picture and
  white in the other.
- `Switched` makes a new picture, the same as this one except at one
  pixel, which it changes from black to white or from white to black. We
  use it later, to make messy pictures. The pixels are numbered from 0 to
  8, row by row, so pixel 4 is the centre. `spot / 3` is the row of pixel
  `spot`, and `spot % 3` is its column. `!` gives the opposite of a
  `bool`, so `!true` is `false`.

```csharp exec
id: a-model-that-starts-out-wrong-2
file: Picture.cs
class Picture
{
    public bool[,] Pixels;

    // Each row is three characters: '#' for a black pixel, '.' for a white one.
    public Picture(string top, string middle, string bottom)
    {
        string[] rows = { top, middle, bottom };
        Pixels = new bool[3, 3];
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                Pixels[row, column] = rows[row][column] == '#';
            }
        }
    }

    public override string ToString()
    {
        string text = "";
        for (int row = 0; row < 3; row++)
        {
            if (row > 0)
            {
                text = text + "\n";    // a new line between the rows
            }
            for (int column = 0; column < 3; column++)
            {
                if (Pixels[row, column])
                {
                    text = text + "#";
                }
                else
                {
                    text = text + ".";
                }
            }
        }
        return text;
    }

    // How many pixels are black in one picture and white in the other.
    public int DifferencesFrom(Picture other)
    {
        int count = 0;
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (Pixels[row, column] != other.Pixels[row, column])
                {
                    count = count + 1;
                }
            }
        }
        return count;
    }

    // A new picture, the same as this one except at one spot.
    // The spots are numbered 0 to 8, row by row.
    public Picture Switched(int spot)
    {
        Picture copy = new Picture("...", "...", "...");
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                copy.Pixels[row, column] = Pixels[row, column];
            }
        }
        copy.Pixels[spot / 3, spot % 3] = !Pixels[spot / 3, spot % 3];
        return copy;
    }
}
```

The program below makes the plus and the cross as `Picture` objects. What
do you think the last three lines will draw, when the centre of the plus
is switched?

```csharp exec
id: a-model-that-starts-out-wrong-2-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Console.WriteLine(cross);
Console.WriteLine($"The plus and the cross differ in {plus.DifferencesFrom(cross)} pixels.");
Console.WriteLine();
Console.WriteLine(plus.Switched(4));
```

The first three lines are the cross. The plus and the cross differ in 8
pixels: every pixel except the centre, which is black in both. The last
three lines are the plus with a white centre. `Switched` made a new
picture, and left `plus` as it was. Can you check? Add
`Console.WriteLine(plus);` at the end of the program, and run it again.

## A model that knows nothing

Now the model. Ours makes its decision from the nine pixels of a picture,
in three steps:

1. Each pixel has a number of its own, called its *weight*.
2. Add the weights of the black pixels, and one more number, called the
   *bias*. The result is the *total*.
3. If the total is above 0, decide "plus", and return 1. If not, decide
   "cross", and return 0.

Books often write step 2 another way. They multiply each pixel by its
weight, with 1 for black and 0 for white, and add the results. The total
is the same, because a white pixel adds 0.

The class `Perceptron` has two fields. `Weights` holds the nine weights,
in a `double[,]`, with each weight in the same place as its pixel.
`new double[3, 3]` makes nine weights, each 0. `Bias` holds the bias.
`Total` does steps 1 and 2, and `Predict` does step 3.

```csharp exec
id: a-model-that-starts-out-wrong-3
file: Perceptron.cs
class Perceptron
{
    public double[,] Weights;
    public double Bias;

    public Perceptron()
    {
        Weights = new double[3, 3];    // nine weights, each 0 to start
        Bias = 0;
    }

    // The bias, plus the weight of every black pixel.
    public double Total(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (picture.Pixels[row, column])
                {
                    total = total + Weights[row, column];
                }
            }
        }
        return total;
    }

    // 1 means "a plus", and 0 means "a cross".
    public int Predict(Picture picture)
    {
        if (Total(picture) > 0)
        {
            return 1;
        }
        return 0;
    }
}
```

This model is new: every weight is 0, and so is the bias. What do you
think it says about each picture?

```csharp exec
id: a-model-that-starts-out-wrong-3-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
Console.WriteLine(model.Predict(plus));
Console.WriteLine(model.Predict(cross));
```

```predict
type: choice

What will the first line print?

- 1
  - The first line is about the plus. Which number in the model would
    make its total above 0?
- 0
  - Every weight is 0, and so is the bias. What total can they make?
- It does not compile
  - `new double[3, 3]` gives every weight a value: 0.
```

Both lines are `0`. With every weight and the bias at 0, every total is 0,
whatever picture goes in, and 0 is not above 0. So the model says "cross"
for everything. Its answer for the cross is the one we want, by accident,
and its answer for the plus is not. No pixel can change an answer yet.

That is the whole model: nine weights, one bias and a rule. They are
ordinary numbers, kept in fields. What makes this class different is in
the next section, where the object changes them itself.

### Your turn: set one weight yourself

In this program, one weight is set to 1.0: the weight of the top-left
pixel. `model.Weights[0, 0]` is that weight, in row 0 and column 0.
`Weights` is a public field, so code outside the class can reach its
elements. (The page [Encapsulation](lesson:keeping-details-inside-an-object)
shows how a class can stop that.) Run the program. The model now says 1
for the cross and 0 for the plus. That is the opposite of what we want.
Can you move the 1.0 to a different pixel, so that the model says 1 for
the plus and 0 for the cross?

```csharp exec
id: a-model-that-starts-out-wrong-4
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
model.Weights[0, 0] = 1.0;    // the weight of the top-left pixel
Console.WriteLine($"plus:  {model.Predict(plus)}");
Console.WriteLine($"cross: {model.Predict(cross)}");
```

```hint
after: 2 runs
A weight counts only when its pixel is black. Which pixels are black in
the plus and white in the cross?
```

```solution
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
model.Weights[0, 1] = 1.0;    // the weight of the top-middle pixel
Console.WriteLine($"plus:  {model.Predict(plus)}");
Console.WriteLine($"cross: {model.Predict(cross)}");
---
It prints `plus:  1` and `cross: 0`. The top-middle pixel is black in the
plus and white in the cross, so its weight adds 1.0 to the total of the
plus, and nothing to the total of the cross. Which other pixels would do
the same? And what happens if you choose the centre, `[1, 1]`, which is
black in both?
```

## Running it again and again

We could choose all nine weights ourselves. For a plus and a cross, nine
numbers are not many. For a photo of a face, with far more pixels, nobody
could. So we let the model find its own weights, one mistake at a time:

1. Show it a picture, with its *label*: the answer we want, 1 for a plus
   and 0 for a cross.
2. If the model's answer matches the label, change nothing.
3. If not, move the weight of every black pixel a little, in the
   direction that would have helped, and move the bias too. That change
   is a *correction*.

The size of "a little" is one number, called the *learning rate*.

First, the model needs pictures to learn from. Real pictures are messy,
so ours are too. Two small classes make them. An `Example` holds a picture
and its label: 1 for the first shape of a pair, and 0 for the second. A
`ShapePair` holds two shapes, `First` and `Second`, and has four methods:

- `Messy` makes a copy of a shape with `flips` pixels switched, chosen at
  random by a random number generator that it is given.
  `generator.Shuffle(spots)` puts the nine pixel numbers in an order
  chosen at random, and `spots[..flips]` takes the first `flips` of them,
  as on [Random numbers](lesson:leaving-it-to-chance).
- `TrainingSet` makes `perShape` messy pictures of each shape, puts each
  one in an `Example` with its label, and shuffles the examples. The
  examples that a model learns from are called its *training set*.
- `EveryPicture` and `TestSet` are for later on this page.

```csharp exec
id: running-it-again-and-again-1
file: ShapePair.cs
class Example
{
    public Picture Picture;
    public int Label;    // 1 for the first shape of a pair, 0 for the second

    public Example(Picture picture, int label)
    {
        Picture = picture;
        Label = label;
    }
}

class ShapePair
{
    public Picture First;     // label 1
    public Picture Second;    // label 0

    public ShapePair(Picture first, Picture second)
    {
        First = first;
        Second = second;
    }

    // A copy of shape with flips different pixels switched, chosen at random.
    public Picture Messy(Picture shape, int flips, Random generator)
    {
        int[] spots = { 0, 1, 2, 3, 4, 5, 6, 7, 8 };
        generator.Shuffle(spots);
        Picture messy = shape;
        foreach (int spot in spots[..flips])
        {
            messy = messy.Switched(spot);
        }
        return messy;
    }

    // perShape messy pictures of each shape, in an order chosen at random.
    public Example[] TrainingSet(int perShape, int flips, Random generator)
    {
        Example[] examples = new Example[2 * perShape];
        for (int i = 0; i < perShape; i++)
        {
            examples[2 * i] = new Example(Messy(First, flips, generator), 1);
            examples[2 * i + 1] = new Example(Messy(Second, flips, generator), 0);
        }
        generator.Shuffle(examples);
        return examples;
    }

    // Every picture that a 3 by 3 grid can show.
    public List<Picture> EveryPicture()
    {
        // Start from one white picture. For each of the nine spots, add a
        // copy of every picture so far, with that spot switched.
        List<Picture> every = new List<Picture> { new Picture("...", "...", "...") };
        for (int spot = 0; spot < 9; spot++)
        {
            int count = every.Count;    // the pictures made before this spot
            for (int i = 0; i < count; i++)
            {
                every.Add(every[i].Switched(spot));
            }
        }
        return every;
    }

    // Every picture exactly flips pixels from one of the shapes, with that
    // shape's label, except the pictures in seen.
    public Example[] TestSet(int flips, Example[] seen)
    {
        List<Example> test = new List<Example>();
        foreach (Picture picture in EveryPicture())
        {
            bool wasSeen = false;
            foreach (Example example in seen)
            {
                if (picture.DifferencesFrom(example.Picture) == 0)
                {
                    wasSeen = true;
                }
            }
            if (!wasSeen && picture.DifferencesFrom(First) == flips)
            {
                test.Add(new Example(picture, 1));
            }
            if (!wasSeen && picture.DifferencesFrom(Second) == flips)
            {
                test.Add(new Example(picture, 0));
            }
        }
        return test.ToArray();    // an array, as TrainingSet gives
    }
}
```

The program below makes a training set: 10 messy pictures of each shape,
each with 3 of its 9 pixels switched. `new Random(1)` makes a random
number generator. Its *seed*, 1, makes it give the same numbers every time
the cell runs, so the pictures are the same each time. The program prints
the first three. Would you have called each of them a plus or a cross?

```csharp exec
id: running-it-again-and-again-1-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));

Console.WriteLine($"{training.Length} pictures. The first three:");
for (int i = 0; i < 3; i++)
{
    Console.WriteLine();
    Console.WriteLine($"label {training[i].Label}");
    Console.WriteLine(training[i].Picture);
}
```

There are 20 pictures. The first three all have the label 0: each one is
a cross with 3 pixels switched. The third has lost the two corners at the
bottom, and has a black pixel between them instead. Would you have known
that it was a cross?

Now the model learns. Here is `Perceptron` again, with two new fields and
three new methods. It replaces the first version for every cell below it
(rule 4: a class written again further down replaces the earlier one).

- `LearningRate` is a field: the size of each correction. The constructor
  now takes it.
- `Corrections` is a field that counts the corrections the model has
  made.
- `Learn` takes one example. `direction` is the label minus the model's
  answer. It is 1 when the model said 0 for a plus, and -1 when it said 1
  for a cross. It is 0 when the answer matched the label. After a mistake,
  the weight of every black pixel changes by the learning rate times
  `direction`. It grows after a missed plus, and shrinks after a missed
  cross. The bias changes in the same way.
- `Mistakes` counts the examples for which the model's answer is not the
  label.
- `ToString` shows the nine weights in their places on the grid, and the
  bias. `,6` gives each weight six places, so that the columns stay
  straight, and `:F2` shows it with two digits after the point.

```csharp exec
id: running-it-again-and-again-2
file: Perceptron.cs
class Perceptron
{
    public double[,] Weights;
    public double Bias;
    public double LearningRate;    // new: the size of each correction
    public int Corrections;        // new: how many corrections it has made

    public Perceptron(double learningRate)
    {
        Weights = new double[3, 3];
        Bias = 0;
        LearningRate = learningRate;
        Corrections = 0;
    }

    public double Total(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (picture.Pixels[row, column])
                {
                    total = total + Weights[row, column];
                }
            }
        }
        return total;
    }

    public int Predict(Picture picture)
    {
        if (Total(picture) > 0)
        {
            return 1;
        }
        return 0;
    }

    // new: after a mistake, change the bias and the weight of every black pixel.
    public void Learn(Example example)
    {
        int direction = example.Label - Predict(example.Picture);
        if (direction == 0)
        {
            return;    // no mistake, so nothing changes
        }
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (example.Picture.Pixels[row, column])
                {
                    Weights[row, column] = Weights[row, column] + LearningRate * direction;
                }
            }
        }
        Bias = Bias + LearningRate * direction;
        Corrections = Corrections + 1;
    }

    // new: how many of the examples have a label that is not the model's answer.
    public int Mistakes(Example[] examples)
    {
        int mistakes = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) != example.Label)
            {
                mistakes = mistakes + 1;
            }
        }
        return mistakes;
    }

    // new: the nine weights, in their places on the grid, and the bias.
    public override string ToString()
    {
        string text = "";
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                text = text + $"{Weights[row, column],6:F2}";
            }
            text = text + "\n";
        }
        return text + $"bias {Bias:F2}";
    }
}
```

One time through every example in the training set is called a *pass*.
(Books often call it an *epoch*.) This program makes a model with a
learning rate of 0.5, and lets it learn from the training set for ten
passes. After each pass, it prints how many mistakes the model makes on
the training set, and how many corrections it has made so far.

```csharp exec
id: running-it-again-and-again-2-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
    Console.WriteLine($"after pass {pass}: mistakes {model.Mistakes(training)}, corrections {model.Corrections}");
}
```

After the first pass, the model makes 2 mistakes in the 20 pictures. It
made 7 corrections during that pass, while it was learning. The mistakes
are counted at the end of the pass, with the weights as they are then.
After the fourth pass, the model makes no mistakes, and it has made 21
corrections. After that, nothing changes. Every answer matches its label,
so `direction` is 0 every time, and no weight moves.

This loop is called *training*. Before it, every weight is 0, so no pixel
changes an answer. After it, the model is the same object, with the same
methods, and different values in its fields: `Weights`, `Bias` and
`Corrections` changed with every correction. No line outside the class set
them. `Learn` did, from the model's own mistakes.

Can you change `pass <= 10` to `pass <= 2`, and add
`Console.WriteLine(model);` after the loop? That shows the weights after
two passes, while the model still makes mistakes.

<details class="dl-answer"><summary>What each line of <code>Learn</code> does</summary>

1. `int direction = example.Label - Predict(example.Picture);` compares
   the label with the model's answer. Both are 1 or 0, so `direction` is
   1, -1 or 0.
2. `if (direction == 0) { return; }` stops the method when there is no
   mistake. `return` in a `void` method ends it at once, and returns no
   value.
3. The two loops visit the nine pixels. For each black pixel, the weight
   in the same place changes by `LearningRate * direction`. The learning
   rate is added after a missed plus, and subtracted after a missed
   cross. A white pixel added nothing to the total, so its weight did not
   cause the mistake, and it stays as it is.
4. `Bias = Bias + LearningRate * direction;` changes the bias in the same
   way. The bias counts for every picture, as if it were the weight of a
   pixel that is always black.
5. `Corrections = Corrections + 1;` counts this correction.

</details>

### A smaller learning rate

What do you think happens with a much smaller learning rate? The next
program trains two models on the same training set: `fast`, with a
learning rate of 0.5, and `slow`, with 0.05, ten times smaller. It prints
two lines, one for each model, and then the weights of each model.

```csharp exec
id: running-it-again-and-again-3
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));

Perceptron fast = new Perceptron(0.5);
Perceptron slow = new Perceptron(0.05);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        fast.Learn(example);
        slow.Learn(example);
    }
}
Console.WriteLine($"0.5:  mistakes {fast.Mistakes(training)}, corrections {fast.Corrections}");
Console.WriteLine($"0.05: mistakes {slow.Mistakes(training)}, corrections {slow.Corrections}");
Console.WriteLine();
Console.WriteLine(fast);
Console.WriteLine();
Console.WriteLine(slow);
```

```predict
type: choice

What will the second line print?

- 0.05: mistakes 6, corrections 95
  - Smaller steps: after ten passes, it is still learning.
- 0.05: mistakes 0, corrections 150
  - Smaller steps: it learns, but with many more corrections.
- 0.05: mistakes 0, corrections 21
  - Smaller steps make every weight smaller by the same amount. Does
    that change which side of 0 a total is on?
```

The second line is `0.05: mistakes 0, corrections 21`, the same as the
first. The weights are not the same. Every weight of the slow model is a
tenth of the fast model's weight in the same place: `0.05` where the fast
model has `0.50`, and `-0.15` where it has `-1.50`. The bias is a tenth
too: `0.05` and `0.50`.

Why? Every weight starts at 0, and each correction adds the learning rate
to a weight, or subtracts it. So after each correction, every number in
the slow model is a tenth of the same number in the fast model, and so is
every total. A tenth of a number above 0 is above 0, and a tenth of a
number below 0 is below 0. So, with exact numbers, the two models make the
same decisions, and the same corrections. In this model, the learning rate
changes only the size of the numbers. In bigger models, the weights do not
all start at 0, and then the learning rate matters much more.

But C# keeps the weights in `double`s, which are not always exact. With
many other seeds, the two models do not agree. The fold below says why.

<details class="dl-why"><summary>Is that always so?</summary>

With exact numbers, yes. In C#, not always. A `double` is kept in binary,
so it cannot hold 0.05 exactly, as [Dividing](lesson:dividing-in-csharp)
showed for 0.1. So a total that should be exactly 0 can be a tiny amount
above 0, or below it. Then `Total(picture) > 0` gives the other
answer, and the two models make a different correction. With the training
set on this page, the two models still end the same. With many other
seeds, they do not, and the lab bench, below, lets you find one. A
`double` holds 0.5, 0.25 and 0.125 exactly, because each is half of the
one before. So a model with 0.25 or 0.125 makes the same decisions as one
with 0.5.

</details>

## Checking it against patterns it has never seen

The model makes no mistakes on its training set. That shows that it fits
the 20 pictures it learned from. But has it learned anything about plus
signs and crosses? Or has it only remembered those 20 pictures?

To tell the difference, we need pictures that the model never saw while
it learned. These are called the *test set*. `TestSet`, in `ShapePair`,
makes one. It starts from every picture that a 3 by 3 grid can show,
which `EveryPicture` makes. Then it keeps each picture that differs from
one of the shapes in exactly `flips` pixels and is not in the training
set, and gives it that shape's label. The first line of the program below
counts every picture. How many do you think there are?

```csharp exec
id: checking-it-against-patterns-it-has-never-seen-1
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));
Example[] test = shapes.TestSet(3, training);

Perceptron model = new Perceptron(0.5);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
}
Console.WriteLine($"Every picture: {shapes.EveryPicture().Count}");
Console.WriteLine($"Training set: {training.Length} pictures, mistakes {model.Mistakes(training)}");
Console.WriteLine($"Test set: {test.Length} pictures, mistakes {model.Mistakes(test)}");
```

A 3 by 3 grid can show 512 pictures. Each of the nine pixels can be black
or white, so each pixel doubles the number of pictures. Nine 2s multiplied
together make $2^9 = 512$. `EveryPicture` makes them in the same way, one
pixel at a time.

The test set has 148 pictures, and the model makes 10 mistakes in them.
On the 20 pictures that it learned from, it makes none. On pictures that
it never saw, it makes a few.

A gap like that is common. The mistakes on the test set tell us more than
the mistakes on the training set, because a model is useful only if it
works on pictures that it did not learn from. A model with no mistakes on
its training set can still make many on a test set.

### Your turn: which pictures?

The model makes 10 mistakes on the test set. Which pictures are they? Can
you complete the loop at the end of this program, so that it prints each
of them, with its label and the model's answer? Would you have known which
shape each one was meant to be?

```csharp exec
id: checking-it-against-patterns-it-has-never-seen-2
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));
Example[] test = shapes.TestSet(3, training);

Perceptron model = new Perceptron(0.5);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
}

foreach (Example example in test)
{
    // Print each picture for which the model's answer is not the label,
    // with its label and the model's answer.
}
```

```hint
after: 2 runs
Which method of `Perceptron` gives the model's answer for a picture? When
is that answer not the example's `Label`?
```

```hint
after: 3 runs
title: the test
`if (model.Predict(example.Picture) != example.Label)`. Inside the `if`,
print the label, the model's answer and `example.Picture`.
```

```solution
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));
Example[] test = shapes.TestSet(3, training);

Perceptron model = new Perceptron(0.5);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
}

foreach (Example example in test)
{
    if (model.Predict(example.Picture) != example.Label)
    {
        Console.WriteLine($"label {example.Label}, the model says {model.Predict(example.Picture)}");
        Console.WriteLine(example.Picture);
        Console.WriteLine();
    }
}
---
It prints 10 pictures. In 7 of them, crosses with label 0, the model says
1. In the other 3, plus signs with label 1, it says 0. Read the middle row
of each picture. In all 7 crosses, the pixel on the left of the middle row
is black, as it is in a plus. In all 3 plus signs, that pixel is white.
The model gives that one pixel a lot of weight. The next section shows how
much.
```

## What the model learned

We can read the weights. Before you run the next cell, think about the
four arms of the plus: the pixels at the top, on the left, on the right
and at the bottom. Do you expect their weights to be above 0 or below it?
And the four corners of the cross?

```csharp exec
id: what-the-model-actually-learned-1
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] training = shapes.TrainingSet(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int pass = 1; pass <= 10; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
}
Console.WriteLine(model);
Console.WriteLine();
Console.WriteLine($"The clean plus:  total {model.Total(plus):F2}, so {model.Predict(plus)}");
Console.WriteLine($"The clean cross: total {model.Total(cross):F2}, so {model.Predict(cross)}");
```

The grid of weights has the shape of a picture.

- All four arms of the plus have a weight above 0: `0.50` at the top,
  `2.50` on the left, `0.50` on the right and `2.00` at the bottom. A
  black pixel in one of these places raises the total, towards "plus".
- All four corners have a weight below 0: `-1.00` at the top left, and
  `-1.50` in the other three. A black pixel in a corner lowers the total,
  towards "cross".
- The centre is black in both shapes, so it cannot tell them apart. Its
  weight is `0.00`.

The clean plus, with no pixels switched, has a total of 6.00, so the
model says 1. The clean cross has a total of -5.00, so the model says 0.
Both answers match the labels, and neither clean picture was in the
training set or in the test set.

That is the pattern a person would name. But the sizes are not equal. The
left arm has `2.50`, and the right arm only `0.50`. Nothing about a plus
makes its left arm more important than its right. Training changes a
weight only after a mistake, and only for the pixels that were black in
that picture. So the sizes record which pixels happened to be black in
the pictures that caused a correction. This is why the model said 1 for
a cross, in the test set, when the pixel on the left of the middle row was
black. Another training set gives other sizes: you can try another seed
in the lab bench.

The rule in `Predict` never says that a weight above 0 means "plus". It
never says which pixels belong to which shape. The object found that
itself, from its corrections, one mistake at a time.

A real network that reads handwriting uses the same idea: numbers that
multiply the inputs, changed a little after each mistake. But it is not
only a bigger version of this model. It is made of many small models like
ours, in layers, and each layer passes its results to the next. It also
uses a smoother rule than "above 0 or not". And a single perceptron like
ours has a limit: there are patterns that it can never learn, however many
examples it sees. The challenge at the end of this page lets you find one.

## Lab bench

Every number that the training uses is named at the top of the next cell.
What happens when you change one of them, and run the cell again?

```csharp exec
id: lab-bench-1
Picture first = new Picture(".#.", "###", ".#.");     // label 1
Picture second = new Picture("#.#", ".#.", "#.#");    // label 0
int flips = 3;               // pixels switched in each messy picture
int perShape = 10;           // messy training pictures of each shape
double learningRate = 0.5;
int passes = 10;
int seed = 1;                // change it for another training set

ShapePair shapes = new ShapePair(first, second);
Example[] training = shapes.TrainingSet(perShape, flips, new Random(seed));
Example[] test = shapes.TestSet(flips, training);
Perceptron model = new Perceptron(learningRate);
for (int pass = 1; pass <= passes; pass++)
{
    foreach (Example example in training)
    {
        model.Learn(example);
    }
}
Console.WriteLine($"Training set: {training.Length} pictures, mistakes {model.Mistakes(training)}");
Console.WriteLine($"Test set: {test.Length} pictures, mistakes {model.Mistakes(test)}");
Console.WriteLine($"Corrections: {model.Corrections}");
Console.WriteLine(model);
```

Choose one of these questions, or ask one of your own:

1. Set `flips` to 4. The plus and the cross differ in 8 pixels, so 4
   switches can make the same picture from either shape. What happens to
   the mistakes on the test set? And on the training set?
2. Set `perShape` to 2. How many mistakes does a model make on the test
   set, if it learned from only two pictures of each shape?
3. Try five other seeds. How much do the mistakes on the test set depend
   on which pictures the model learned from? How much do the weights
   change?
4. Try the same seeds with a learning rate of 0.5 and of 0.05. Do the two
   always give the same result? The fold *Is that always so?*, above,
   says why they may not.
5. Does training for 100 passes, not 10, change the mistakes on the test
   set?

## Your turn: tracks in the snow

Can the same class learn to tell two other shapes apart? In fresh snow, a
bird's footprint has three toes, in the shape of a Y. Here, a fox's
pawprint has four marks, one in each corner:

```text
the bird's footprint
#.#
.#.
.#.

the fox's pawprint
#.#
...
#.#
```

This time the training set has 10 messy pictures of each track, each with
2 pixels switched. The test set has every other picture that is 2
switches from a track.

Every program on this page that trains a model has its own copy of the
training loop. A method of the class could hold the loop in one place. Can
you give `Perceptron` a method, `Train(Example[] examples, int passes)`,
that lets the model learn from every example in `examples`, `passes`
times? Write it in the first cell below, and then run the program in the
second. The program is meant not to compile until you do. Its message says
what is missing: `'Perceptron' does not contain a definition for 'Train'`.

```csharp exec
id: your-turn-1
file: Perceptron.cs
class Perceptron
{
    public double[,] Weights;
    public double Bias;
    public double LearningRate;
    public int Corrections;

    public Perceptron(double learningRate)
    {
        Weights = new double[3, 3];
        Bias = 0;
        LearningRate = learningRate;
        Corrections = 0;
    }

    public double Total(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (picture.Pixels[row, column])
                {
                    total = total + Weights[row, column];
                }
            }
        }
        return total;
    }

    public int Predict(Picture picture)
    {
        if (Total(picture) > 0)
        {
            return 1;
        }
        return 0;
    }

    public void Learn(Example example)
    {
        int direction = example.Label - Predict(example.Picture);
        if (direction == 0)
        {
            return;
        }
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (example.Picture.Pixels[row, column])
                {
                    Weights[row, column] = Weights[row, column] + LearningRate * direction;
                }
            }
        }
        Bias = Bias + LearningRate * direction;
        Corrections = Corrections + 1;
    }

    public int Mistakes(Example[] examples)
    {
        int mistakes = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) != example.Label)
            {
                mistakes = mistakes + 1;
            }
        }
        return mistakes;
    }

    public override string ToString()
    {
        string text = "";
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                text = text + $"{Weights[row, column],6:F2}";
            }
            text = text + "\n";
        }
        return text + $"bias {Bias:F2}";
    }
}
```

```csharp exec
id: your-turn-1-program
expect: CS1061
Picture bird = new Picture("#.#", ".#.", ".#.");    // a bird's footprint: label 1
Picture fox = new Picture("#.#", "...", "#.#");     // a fox's pawprint: label 0
ShapePair tracks = new ShapePair(bird, fox);
Example[] training = tracks.TrainingSet(10, 2, new Random(1));
Example[] test = tracks.TestSet(2, training);

Perceptron model = new Perceptron(0.5);
model.Train(training, 10);
Console.WriteLine($"The tracks differ in {bird.DifferencesFrom(fox)} pixels.");
Console.WriteLine($"Training set: {training.Length} pictures, mistakes {model.Mistakes(training)}");
Console.WriteLine($"Test set: {test.Length} pictures, mistakes {model.Mistakes(test)}");
```

```inputs
model.Mistakes(training)    // on the 20 pictures it learned from
model.Mistakes(test)        // on the test set
test.Length                 // the number of pictures in the test set
model.Corrections           // made while it learned
```

```hint
after: 2 errors
Which loop on this page trains a model for ten passes? What would it look
like inside a method of `Perceptron`, where the model is the object
itself?
```

```hint
after: 3 errors
title: the first line
`public void Train(Example[] examples, int passes)`. Inside it, a loop
for the passes, a `foreach` for the examples, and `Learn(example);`.
Inside a method, `Learn` means this object's own `Learn`.
```

```solution
Picture bird = new Picture("#.#", ".#.", ".#.");    // a bird's footprint: label 1
Picture fox = new Picture("#.#", "...", "#.#");     // a fox's pawprint: label 0
ShapePair tracks = new ShapePair(bird, fox);
Example[] training = tracks.TrainingSet(10, 2, new Random(1));
Example[] test = tracks.TestSet(2, training);

Perceptron model = new Perceptron(0.5);
model.Train(training, 10);
Console.WriteLine($"The tracks differ in {bird.DifferencesFrom(fox)} pixels.");
Console.WriteLine($"Training set: {training.Length} pictures, mistakes {model.Mistakes(training)}");
Console.WriteLine($"Test set: {test.Length} pictures, mistakes {model.Mistakes(test)}");

class Perceptron
{
    public double[,] Weights;
    public double Bias;
    public double LearningRate;
    public int Corrections;

    public Perceptron(double learningRate)
    {
        Weights = new double[3, 3];
        Bias = 0;
        LearningRate = learningRate;
        Corrections = 0;
    }

    public double Total(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (picture.Pixels[row, column])
                {
                    total = total + Weights[row, column];
                }
            }
        }
        return total;
    }

    public int Predict(Picture picture)
    {
        if (Total(picture) > 0)
        {
            return 1;
        }
        return 0;
    }

    public void Learn(Example example)
    {
        int direction = example.Label - Predict(example.Picture);
        if (direction == 0)
        {
            return;
        }
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                if (example.Picture.Pixels[row, column])
                {
                    Weights[row, column] = Weights[row, column] + LearningRate * direction;
                }
            }
        }
        Bias = Bias + LearningRate * direction;
        Corrections = Corrections + 1;
    }

    public void Train(Example[] examples, int passes)
    {
        for (int pass = 1; pass <= passes; pass++)
        {
            foreach (Example example in examples)
            {
                Learn(example);
            }
        }
    }

    public int Mistakes(Example[] examples)
    {
        int mistakes = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) != example.Label)
            {
                mistakes = mistakes + 1;
            }
        }
        return mistakes;
    }

    public override string ToString()
    {
        string text = "";
        for (int row = 0; row < 3; row++)
        {
            for (int column = 0; column < 3; column++)
            {
                text = text + $"{Weights[row, column],6:F2}";
            }
            text = text + "\n";
        }
        return text + $"bias {Bias:F2}";
    }
}
---
The solution writes `Perceptron` again, below its program (rule 4), and C#
uses this one in place of yours. In one file, C# wants the statements
first and the classes after them.

The tracks differ in 4 pixels. The model makes no mistakes on its 20
training pictures, and 4 mistakes on the 50 pictures of the test set,
after 12 corrections. Why does it make any? Two switches can make the
same picture from either track: switch two of the four pixels in which the
tracks differ. Unless it is in the training set, a picture like that is in
the test set twice, once with each label, and no model can give it both
labels. Each of the model's 4 mistakes is one of those pictures.

The plus and the cross differ in 8 pixels, so 3 switches never make the
same picture from both of them. None of the 10 mistakes on that test set
came from a picture with two labels.
```

## Looking back

A `Perceptron` has four fields. Which of them changed while the model
learned, and which line of code changed each one? Which field never
changed after the constructor set it?

The page made four classes, one for each thing in the problem: `Picture`,
`Example` (a picture and its label), `ShapePair` (two shapes, and the sets
of pictures made from them) and `Perceptron`.

A model and its training are two different things. The model is the
object: its weights, its bias, and the rule in `Predict`. The training is
the loop that calls `Learn`, again and again. When the training ends, the
model is used alone, on pictures that it never saw.

A challenge: the program below is a perceptron with two inputs, each 0 or
1, and no pictures. Its labels are for *OR*: the answer is 1 when either
input is 1. For each pair of inputs, the program prints the label and the
model's answer. Open it in your notebook and run it. Can the model learn
OR? Then change the labels to `{ 0, 1, 1, 0 }`. That is *exclusive or*: 1
when exactly one input is 1. (In C#, `^` does this job from logic, as
[Powers](lesson:powers-in-csharp) said.) Can the model learn exclusive or?
Can you find two weights and a bias that give those four answers? The
challenge has its own small class, because it opens in a new notebook,
with no cells above it.

```csharp challenge
// A perceptron with two inputs, each 0 or 1. Can it learn OR? Exclusive or?
int[,] inputs = { { 0, 0 }, { 0, 1 }, { 1, 0 }, { 1, 1 } };
int[] labels = { 0, 1, 1, 1 };    // OR. For exclusive or, try { 0, 1, 1, 0 }.

TwoInputs model = new TwoInputs();
for (int pass = 1; pass <= 20; pass++)
{
    for (int i = 0; i < 4; i++)
    {
        model.Learn(inputs[i, 0], inputs[i, 1], labels[i]);
    }
}
for (int i = 0; i < 4; i++)
{
    Console.WriteLine($"{inputs[i, 0]} {inputs[i, 1]}: label {labels[i]}, the model says {model.Predict(inputs[i, 0], inputs[i, 1])}");
}

class TwoInputs
{
    public double FirstWeight;
    public double SecondWeight;
    public double Bias;

    public int Predict(int first, int second)
    {
        double total = FirstWeight * first + SecondWeight * second + Bias;
        if (total > 0)
        {
            return 1;
        }
        return 0;
    }

    public void Learn(int first, int second, int label)
    {
        int direction = label - Predict(first, second);
        FirstWeight = FirstWeight + 0.5 * direction * first;
        SecondWeight = SecondWeight + 0.5 * direction * second;
        Bias = Bias + 0.5 * direction;
    }
}
```

Everything on this page runs here, and nothing in it needs Visual Studio.
Any program cell can be downloaded as a Visual Studio project, and it
prints the same there.

There is no practice page for this extra. Another FOOP extra,
[Simulating a queue](lesson:when-a-queue-never-clears), is also a program
made from small classes, with random numbers and a seed.

## Where to read more

Everything here is covered elsewhere too, often in a form that will suit
you better than this one.

Spanning Tree (2025). *Perceptrons: The First Trainable Neural Networks.*
<https://www.youtube.com/watch?v=Ip6RIHwi21c>. Brian Yu tells the story of
Frank Rosenblatt's perceptron, from 1957, and shows how it learns: after
each mistake on an example, it changes its weights a little. The video
is about twelve minutes long.

Nielsen, M. (2015). *Neural Networks and Deep Learning*.
<http://neuralnetworksanddeeplearning.com/>. A free book on the web. Its
first chapter starts from a perceptron like the one on this page, and
ends with a network that reads handwritten digits.

Rosenblatt, F. (1958). *The Perceptron: A Probabilistic Model for
Information Storage and Organization in the Brain.* Psychological Review,
65(6), 386–408. The original paper. The class on this page is a simple
form of the perceptron it describes.

Microsoft. *What is ML.NET and how does it work?*
<https://learn.microsoft.com/en-us/dotnet/machine-learning/how-does-mldotnet-work>.
ML.NET is Microsoft's library for machine learning in C#: models that
learn from examples, as this one does, at a much larger size.
