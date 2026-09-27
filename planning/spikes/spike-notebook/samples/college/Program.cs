using College;

Console.Write("Your name? ");
string? name = Console.ReadLine();
Console.Write("Your age? ");
int age = int.Parse(Console.ReadLine() ?? "0");
Console.WriteLine();
Console.WriteLine($"Hello, {name}. Next year you will be {age + 1}.");

var course = new Course("5N0541", "Fundamentals of OOP");
var students = new List<Student>
{
    new Student("Ada", 21),
    new Student("Grace", 19),
    new MatureStudent("Alan", 34, "Engineer"),
    new Student(name ?? "?", age),
};
foreach (IEnrollable s in students) s.Enrol(course);

var grades = new Dictionary<string, int> { ["Ada"] = 88, ["Grace"] = 73, ["Alan"] = 91 };
grades[name ?? "?"] = 65;

var honours = from s in students
              where grades[s.Name] >= 70
              orderby grades[s.Name] descending
              select $"{s.Name} ({grades[s.Name]})";
Console.WriteLine("Honours: " + string.Join(", ", honours));
Console.WriteLine($"Average age: {students.Average(s => s.Age):F1}");
foreach (Person p in students) Console.WriteLine(p.Describe());
Console.WriteLine($"{course.Code} has {course.Count} students");

try
{
    course.Enrol(students[0]);
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Caught: {ex.Message}");
}

await Task.Delay(10);
Console.WriteLine("About to fail...");
Student nobody = students.First(s => s.Age > 100);
Console.WriteLine("never printed " + nobody);
