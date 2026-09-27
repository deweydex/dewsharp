Console.WriteLine("Loading...");
await Task.Delay(200);
Console.Write("Name after await: ");
string? n = Console.ReadLine();
await Task.Delay(50);
Console.WriteLine($"Hi {n}");
