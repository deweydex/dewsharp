Console.Write("Two letters: ");
int a = Console.Read(); int b = Console.Read();
string? rest = Console.ReadLine();
Console.WriteLine($"a={(char)a} b={(char)b} rest='{rest}'");
Console.Write("Anything: ");
Console.WriteLine($"got '{Console.ReadLine()}'");
