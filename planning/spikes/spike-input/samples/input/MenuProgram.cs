namespace College;

public class MenuProgram
{
    public static void Main()
    {
        var register = new Register();
        bool running = true;
        while (running)
        {
            Console.WriteLine();
            Console.WriteLine("1. Add a student");
            Console.WriteLine("2. List students");
            Console.WriteLine("3. Quit");
            Console.Write("Choose an option: ");
            string? choice = Console.ReadLine();
            switch (choice)
            {
                case "1":
                    Console.Write("Name: ");
                    string name = Console.ReadLine() ?? "";
                    int age = ReadInt("Age: ");
                    register.Add(new Student(name, age));
                    Console.WriteLine($"Added {name}.");
                    break;
                case "2":
                    register.PrintAll();
                    break;
                case "3":
                    running = false;
                    Console.WriteLine("Goodbye.");
                    break;
                default:
                    Console.WriteLine($"'{choice}' is not an option. Type 1, 2 or 3.");
                    break;
            }
        }
    }

    static int ReadInt(string prompt)
    {
        while (true)
        {
            Console.Write(prompt);
            if (int.TryParse(Console.ReadLine(), out int value)) return value;
            Console.WriteLine("Please type a whole number.");
        }
    }
}
