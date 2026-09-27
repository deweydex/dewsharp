int count = 0; string? line;
Console.WriteLine("Type lines; End input to finish.");
while ((line = Console.ReadLine()) != null) count++;
Console.WriteLine($"Read {count} lines, then end of input.");
int c = Console.Read();
Console.WriteLine($"Console.Read after EOF = {c}");
