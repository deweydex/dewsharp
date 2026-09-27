Console.Write("What is your name? ");
string? name = Console.ReadLine();
Console.Write("How old are you? ");
int age = int.Parse(Console.ReadLine() ?? "0");
Console.WriteLine($"Hello, {name}! Next year you will be {age + 1}.");
