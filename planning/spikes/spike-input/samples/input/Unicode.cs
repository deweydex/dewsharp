Console.Write("Say something: ");
string s = Console.ReadLine() ?? "";
Console.WriteLine($"You said '{s}' ({s.Length} UTF-16 chars)");
