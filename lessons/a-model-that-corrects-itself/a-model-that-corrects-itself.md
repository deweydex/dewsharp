---
title: "The perceptron: a class that learns from its mistakes"
version: 2026.09.28.1
from: a-model-that-corrects-itself
covers: [FOOP-LO3, FOOP-LO7]
---

# The perceptron: a class that learns from its mistakes

## A model that starts out wrong

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
    for (int col = 0; col < 3; col++)
    {
        if (plus[row, col])
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
            for (int col = 0; col < 3; col++)
            {
                Pixels[row, col] = rows[row][col] == '#';
            }
        }
    }

    public override string ToString()
    {
        string[] lines = new string[3];
        for (int row = 0; row < 3; row++)
        {
            lines[row] = "";
            for (int col = 0; col < 3; col++)
            {
                if (Pixels[row, col])
                {
                    lines[row] = lines[row] + "#";
                }
                else
                {
                    lines[row] = lines[row] + ".";
                }
            }
        }
        return string.Join("\n", lines);
    }

    // The number of pixels that are black in one picture and white in the other.
    public int DifferencesFrom(Picture other)
    {
        int count = 0;
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (Pixels[row, col] != other.Pixels[row, col])
                {
                    count = count + 1;
                }
            }
        }
        return count;
    }

    // The pixels are numbered 0 to 8, row by row. Flip switches one of them.
    public void Flip(int spot)
    {
        int row = spot / 3;
        int col = spot % 3;
        Pixels[row, col] = !Pixels[row, col];
    }

    public Picture Copy()
    {
        Picture copy = new Picture("...", "...", "...");
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                copy.Pixels[row, col] = Pixels[row, col];
            }
        }
        return copy;
    }
}
```

```csharp exec
id: a-model-that-starts-out-wrong-2-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Console.WriteLine(plus);
Console.WriteLine();
Console.WriteLine(cross);
Console.WriteLine();
Console.WriteLine($"They differ in {plus.DifferencesFrom(cross)} pixels.");
```

```csharp exec
id: a-model-that-starts-out-wrong-3
file: Perceptron.cs
class Perceptron
{
    public double[,] Weights;
    public double Bias;

    public Perceptron()
    {
        Weights = new double[3, 3];    // every weight starts at 0
        Bias = 0;
    }

    // 1 means "a plus", and 0 means "a cross".
    public int Predict(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (picture.Pixels[row, col])
                {
                    total = total + Weights[row, col];
                }
            }
        }
        if (total > 0)
        {
            return 1;
        }
        return 0;
    }
}
```

```csharp exec
id: a-model-that-starts-out-wrong-3-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
Console.WriteLine(model.Predict(plus));
Console.WriteLine(model.Predict(cross));
```

```csharp exec
id: a-model-that-starts-out-wrong-4
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
model.Weights[0, 1] = 0.0;    // the top-middle pixel's weight
Console.WriteLine($"plus:  {model.Predict(plus)}");
Console.WriteLine($"cross: {model.Predict(cross)}");
```

```solution
title: with the top-middle weight at 1.0
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
Perceptron model = new Perceptron();
model.Weights[0, 1] = 1.0;    // the top-middle pixel's weight
Console.WriteLine($"plus:  {model.Predict(plus)}");
Console.WriteLine($"cross: {model.Predict(cross)}");
---
Notes.
```

## Running it again and again

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

    // A copy of shape, with some different pixels switched, chosen at random.
    public Picture Messy(Picture shape, int flips, Random generator)
    {
        int[] spots = { 0, 1, 2, 3, 4, 5, 6, 7, 8 };
        generator.Shuffle(spots);
        Picture messy = shape.Copy();
        foreach (int spot in spots[..flips])
        {
            messy.Flip(spot);
        }
        return messy;
    }

    // perShape messy pictures of each shape, in an order chosen at random.
    public Example[] Noisy(int perShape, int flips, Random generator)
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

    // Every picture that is exactly flips pixels away from one of the shapes,
    // except the pictures in seen.
    public Example[] NeverSeen(int flips, Example[] seen)
    {
        // Start from one white picture. Each of the nine pixels doubles the
        // list: every picture so far, and a copy with that pixel switched.
        List<Picture> every = new List<Picture> { new Picture("...", "...", "...") };
        for (int spot = 0; spot < 9; spot++)
        {
            int count = every.Count;
            for (int i = 0; i < count; i++)
            {
                Picture switched = every[i].Copy();
                switched.Flip(spot);
                every.Add(switched);
            }
        }

        List<Example> test = new List<Example>();
        foreach (Picture picture in every)
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
        return test.ToArray();
    }
}
```

```csharp exec
id: running-it-again-and-again-1-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Console.WriteLine($"{train.Length} pictures");
for (int i = 0; i < 3; i++)
{
    Console.WriteLine();
    Console.WriteLine($"label {train[i].Label}");
    Console.WriteLine(train[i].Picture);
}
```

```csharp exec
id: running-it-again-and-again-2
file: Perceptron.cs
class Perceptron
{
    public double[,] Weights;
    public double Bias;
    public double LearningRate;    // new
    public int Corrections;        // new

    public Perceptron(double learningRate)
    {
        Weights = new double[3, 3];    // every weight starts at 0
        Bias = 0;
        LearningRate = learningRate;
        Corrections = 0;
    }

    // 1 means the first shape of the pair, and 0 means the second.
    public int Predict(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (picture.Pixels[row, col])
                {
                    total = total + Weights[row, col];
                }
            }
        }
        if (total > 0)
        {
            return 1;
        }
        return 0;
    }

    // new: true if the guess matched the label. After a wrong guess, the
    // model moves the weight of every black pixel, and the bias.
    public bool Learn(Example example)
    {
        int error = example.Label - Predict(example.Picture);
        if (error == 0)
        {
            return true;
        }
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (example.Picture.Pixels[row, col])
                {
                    Weights[row, col] = Weights[row, col] + LearningRate * error;
                }
            }
        }
        Bias = Bias + LearningRate * error;
        Corrections = Corrections + 1;
        return false;
    }

    // new: how many of the examples it gets right, without learning from them.
    public int Score(Example[] examples)
    {
        int right = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) == example.Label)
            {
                right = right + 1;
            }
        }
        return right;
    }
}
```

```csharp exec
id: running-it-again-and-again-2-program
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int epoch = 1; epoch <= 10; epoch++)
{
    int right = 0;
    foreach (Example example in train)
    {
        if (model.Learn(example))
        {
            right = right + 1;
        }
    }
    Console.WriteLine($"pass {epoch}: {right} of {train.Length} right, {model.Corrections} corrections so far");
}
```

```csharp exec
id: running-it-again-and-again-3
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

double[] rates = { 0.5, 0.05 };
foreach (double rate in rates)
{
    Perceptron model = new Perceptron(rate);
    string line = $"rate {rate}:";
    for (int epoch = 1; epoch <= 10; epoch++)
    {
        int right = 0;
        foreach (Example example in train)
        {
            if (model.Learn(example))
            {
                right = right + 1;
            }
        }
        line = line + $" {right}";
    }
    Console.WriteLine($"{line}  (mid-right weight {model.Weights[1, 2]:F2})");
}
```

## Checking it against patterns it has never seen

```csharp exec
id: checking-it-against-patterns-it-has-never-seen-1
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int epoch = 1; epoch <= 10; epoch++)
{
    foreach (Example example in train)
    {
        model.Learn(example);
    }
}

Example[] test = shapes.NeverSeen(3, train);
Console.WriteLine($"Training pictures: {model.Score(train)} of {train.Length} right");
Console.WriteLine($"Never seen: {model.Score(test)} of {test.Length} right");
```

```csharp exec
id: checking-it-against-patterns-it-has-never-seen-2
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int epoch = 1; epoch <= 10; epoch++)
{
    foreach (Example example in train)
    {
        model.Learn(example);
    }
}

foreach (Example example in shapes.NeverSeen(3, train))
{
    // Print the pictures that the model gets wrong, each with its label.
}
```

```solution
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int epoch = 1; epoch <= 10; epoch++)
{
    foreach (Example example in train)
    {
        model.Learn(example);
    }
}

foreach (Example example in shapes.NeverSeen(3, train))
{
    if (model.Predict(example.Picture) != example.Label)
    {
        Console.WriteLine($"label {example.Label}, the model said {model.Predict(example.Picture)}");
        Console.WriteLine(example.Picture);
        Console.WriteLine();
    }
}
---
Notes.
```

## What the model learned

```csharp exec
id: what-the-model-learned-1
Picture plus = new Picture(".#.", "###", ".#.");
Picture cross = new Picture("#.#", ".#.", "#.#");
ShapePair shapes = new ShapePair(plus, cross);
Example[] train = shapes.Noisy(10, 3, new Random(1));

Perceptron model = new Perceptron(0.5);
for (int epoch = 1; epoch <= 10; epoch++)
{
    foreach (Example example in train)
    {
        model.Learn(example);
    }
}

for (int row = 0; row < 3; row++)
{
    Console.WriteLine($"{model.Weights[row, 0],5:F1} {model.Weights[row, 1],5:F1} {model.Weights[row, 2],5:F1}");
}
Console.WriteLine($"bias: {model.Bias:F1}");
```

## Lab bench

```csharp exec
id: lab-bench-1
Picture first = new Picture(".#.", "###", ".#.");     // label 1
Picture second = new Picture("#.#", ".#.", "#.#");    // label 0
int flips = 3;               // pixels switched in each messy picture
int perShape = 10;           // messy training pictures of each shape
double learningRate = 0.5;
int epochs = 10;
int seed = 1;                // change it for another set of training pictures

ShapePair shapes = new ShapePair(first, second);
Example[] train = shapes.Noisy(perShape, flips, new Random(seed));
Perceptron model = new Perceptron(learningRate);
for (int epoch = 1; epoch <= epochs; epoch++)
{
    foreach (Example example in train)
    {
        model.Learn(example);
    }
    Console.WriteLine($"after pass {epoch}: {model.Score(train)} of {train.Length} training pictures right");
}
Example[] test = shapes.NeverSeen(flips, train);
Console.WriteLine($"never seen: {model.Score(test)} of {test.Length} right");
```

## Your turn

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

    public int Predict(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (picture.Pixels[row, col])
                {
                    total = total + Weights[row, col];
                }
            }
        }
        if (total > 0)
        {
            return 1;
        }
        return 0;
    }

    public bool Learn(Example example)
    {
        int error = example.Label - Predict(example.Picture);
        if (error == 0)
        {
            return true;
        }
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (example.Picture.Pixels[row, col])
                {
                    Weights[row, col] = Weights[row, col] + LearningRate * error;
                }
            }
        }
        Bias = Bias + LearningRate * error;
        Corrections = Corrections + 1;
        return false;
    }

    public int Score(Example[] examples)
    {
        int right = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) == example.Label)
            {
                right = right + 1;
            }
        }
        return right;
    }
}
```

```csharp exec
id: your-turn-1-program
expect: CS1061
Picture bird = new Picture("#.#", ".#.", ".#.");    // a bird's footprint: label 1
Picture fox = new Picture("#.#", "...", "#.#");     // a fox's pawprint: label 0
ShapePair tracks = new ShapePair(bird, fox);
Example[] train = tracks.Noisy(10, 2, new Random(1));
Example[] test = tracks.NeverSeen(2, train);

Perceptron model = new Perceptron(0.5);
model.Train(train, 10);
Console.WriteLine($"Training pictures: {model.Score(train)} of {train.Length} right");
Console.WriteLine($"Never seen: {model.Score(test)} of {test.Length} right");
Console.WriteLine($"Corrections: {model.Corrections}");
```

```inputs
model.Score(train)
model.Score(test)
test.Length
model.Corrections
```

```solution
Picture bird = new Picture("#.#", ".#.", ".#.");    // a bird's footprint: label 1
Picture fox = new Picture("#.#", "...", "#.#");     // a fox's pawprint: label 0
ShapePair tracks = new ShapePair(bird, fox);
Example[] train = tracks.Noisy(10, 2, new Random(1));
Example[] test = tracks.NeverSeen(2, train);

Perceptron model = new Perceptron(0.5);
model.Train(train, 10);
Console.WriteLine($"Training pictures: {model.Score(train)} of {train.Length} right");
Console.WriteLine($"Never seen: {model.Score(test)} of {test.Length} right");
Console.WriteLine($"Corrections: {model.Corrections}");

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

    public int Predict(Picture picture)
    {
        double total = Bias;
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (picture.Pixels[row, col])
                {
                    total = total + Weights[row, col];
                }
            }
        }
        if (total > 0)
        {
            return 1;
        }
        return 0;
    }

    public bool Learn(Example example)
    {
        int error = example.Label - Predict(example.Picture);
        if (error == 0)
        {
            return true;
        }
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                if (example.Picture.Pixels[row, col])
                {
                    Weights[row, col] = Weights[row, col] + LearningRate * error;
                }
            }
        }
        Bias = Bias + LearningRate * error;
        Corrections = Corrections + 1;
        return false;
    }

    public int Score(Example[] examples)
    {
        int right = 0;
        foreach (Example example in examples)
        {
            if (Predict(example.Picture) == example.Label)
            {
                right = right + 1;
            }
        }
        return right;
    }

    public void Train(Example[] examples, int passes)
    {
        for (int pass = 0; pass < passes; pass++)
        {
            foreach (Example example in examples)
            {
                Learn(example);
            }
        }
    }
}
---
Notes.
```

## Looking back

```csharp challenge
// A perceptron with two inputs, each 0 or 1. It learns OR: the answer is 1
// when either input is 1. Can it learn XOR, which is 1 when exactly one is?
int[,] inputs = { { 0, 0 }, { 0, 1 }, { 1, 0 }, { 1, 1 } };
int[] labels = { 0, 1, 1, 1 };    // OR. For XOR, try { 0, 1, 1, 0 }.

TwoInputs model = new TwoInputs();
for (int pass = 0; pass < 20; pass++)
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
        int error = label - Predict(first, second);
        FirstWeight = FirstWeight + 0.5 * error * first;
        SecondWeight = SecondWeight + 0.5 * error * second;
        Bias = Bias + 0.5 * error;
    }
}
```
