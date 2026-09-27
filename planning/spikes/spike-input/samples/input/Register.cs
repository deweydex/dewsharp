namespace College;

public class Student(string name, int age)
{
    public string Name { get; } = name;
    public int Age { get; } = age;
    public override string ToString() => $"{Name} ({Age})";
}

public class Register
{
    private readonly List<Student> _students = new();
    public void Add(Student s) => _students.Add(s);
    public void PrintAll()
    {
        if (_students.Count == 0) { Console.WriteLine("No students yet."); return; }
        for (int i = 0; i < _students.Count; i++) Console.WriteLine($"{i + 1}. {_students[i]}");
    }
}
