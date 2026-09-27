namespace College;

public interface IEnrollable
{
    void Enrol(Course course);
}

public abstract class Person
{
    public string Name { get; }
    public int Age { get; }
    protected Person(string name, int age) { Name = name; Age = age; }
    public abstract string Describe();
}

public class Student : Person, IEnrollable
{
    public static int Created;
    public Student(string name, int age) : base(name, age) { Created++; }
    public void Enrol(Course course) => course.Enrol(this);
    public override string Describe() => $"Student {Name}, {Age}";
}

public class MatureStudent : Student
{
    public string Job { get; }
    public MatureStudent(string name, int age, string job) : base(name, age) { Job = job; }
    public override string Describe() => base.Describe() + $" (works as {Job})";
}
