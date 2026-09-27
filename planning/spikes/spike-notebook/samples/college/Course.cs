namespace College;

public class Course
{
    private readonly List<Student> _students = new();
    public string Code { get; }
    public string Title { get; }
    public int Count => _students.Count;
    public Course(string code, string title) { Code = code; Title = title; }

    public void Enrol(Student s)
    {
        if (_students.Contains(s))
            throw new InvalidOperationException($"{s.Name} is already enrolled on {Code}");
        _students.Add(s);
    }
}
