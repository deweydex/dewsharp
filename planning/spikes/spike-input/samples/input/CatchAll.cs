// A menu loop that swallows every exception, as student code often does.
while (true)
{
    try
    {
        Console.Write("Number (or q): ");
        string? s = Console.ReadLine();
        if (s == "q" || s == null) break;
        Console.WriteLine(int.Parse(s) * 2);
    }
    catch (Exception e) { Console.WriteLine("Oops: " + e.Message); }
}
