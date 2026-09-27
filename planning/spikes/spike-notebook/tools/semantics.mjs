// Model A (own executor over CreateScriptCompilation): what C# script changes for FOOP teaching.
// Each case is a list of cells run from a fresh state. Usage: node tools/semantics.mjs <wwwroot> [port] [filter]
import { chromium, serve, openPage } from './common.mjs';
const root = process.argv[2], port = +(process.argv[3] || 8815), filter = process.argv[4] || '';
export const cases = {
  'namespace block': [`namespace School { public class Student { } }`],
  'file-scoped namespace': [`namespace School;\npublic class Student { }`],
  'type names and default ToString': [`class Student { public string Name = "Ada"; }
var s = new Student();
Console.WriteLine(s);
Console.WriteLine(typeof(Student).FullName);
Console.WriteLine(s.GetType().Name);
Console.WriteLine(nameof(Student));
s`],
  'record ToString': [`record Point(int X, int Y);\nvar p = new Point(1, 2);\nConsole.WriteLine(p);\np`],
  'static members': [
`class Counter { public static int Count; public Counter() { Count++; } }`,
`new Counter(); new Counter();\nCounter.Count`,
`static int Twice(int n) => n * 2;\nTwice(4)`,
`static int shared = 5;\nshared`,
`const int Max = 10;\nMax`,
`static class MathHelpers { public static int Square(int n) => n * n; }\nMathHelpers.Square(7)`],
  'extension methods': [
`static class StringExt { public static string Shout(this string s) => s.ToUpper() + "!"; }\n"hi".Shout()`,
`static string Whisper(this string s) => s.ToLower() + "...";\n"HI".Whisper()`,
`static class E14 { extension(string s) { public int Twice => s.Length * 2; } }\n"abc".Twice`],
  'interfaces': [
`interface IShape { double Area(); string Name => GetType().Name; }
class Circle : IShape { double r; public Circle(double r) { this.r = r; } public double Area() => Math.PI * r * r; }`,
`IShape sh = new Circle(1);\nConsole.WriteLine($"{sh.Name} {sh.Area():F2}");`,
`interface IShape { double Area(); double Perimeter(); }`,
`IShape again = new Circle(2);`,
`sh.Area()`],
  'access modifiers': [
`public class A { }\nprivate class B { }\ninternal class C { }\nprotected class D { }`,
`class Account { private decimal balance = 10; protected int id; public decimal Balance => balance; }`,
`new Account().balance`,
`new Account().Balance`,
`private int hidden = 3;\npublic int shown = 4;\nhidden + shown`,
`private void Helper() { Console.WriteLine("helper"); }\nHelper();`],
  'Main': [
`static void Main() { Console.WriteLine("Main ran"); }\nConsole.WriteLine("top-level ran");`,
`class Program { static void Main(string[] args) { Console.WriteLine("Program.Main ran"); } }\nConsole.WriteLine("after class Program");`,
`Program.Main(new string[0]);`],
  'redefinition': [
`class Student { public string Name = "Ada"; }
void Show(Student s) => Console.WriteLine("Show: " + s.Name);
var ada = new Student();
Show(ada);`,
`class Student { public string Name = "Grace"; public int Credits = 5; }
var grace = new Student();
Console.WriteLine(grace.Credits);`,
`Show(grace);`,
`Show(ada);`,
`ada.Credits`,
`var ada = "now a string";\nada.Length`,
`int Sq(int n) => n * n;\nSq(3)`,
`int Sq(int n) => n * n * n;\nSq(3)`],
  'inheritance across cells': [
`abstract class Animal { public abstract string Speak(); public override string ToString() => $"{GetType().Name} says {Speak()}"; }`,
`class Dog : Animal { public override string Speak() => "Woof"; }\nAnimal a = new Dog();\nConsole.WriteLine(a);`,
`abstract class Animal { public abstract string Speak(); public virtual int Legs => 4; }`,
`Animal b = new Dog();`],
  'partial class across cells': [
`partial class P { public int A = 1; }`,
`partial class P { public int B = 2; }\nvar p = new P();\np.B`,
`p.A`],
  'usings alone': [`using System.Text;`],
  'usings then expression': [`using System.Text;\n1`, `new StringBuilder("ok").ToString()`],
  'usings persist': [
`using System.Text;\nusing static System.Math;`,
`var sb = new StringBuilder("x");\nsb.Append(Sqrt(16));\nsb.ToString()`],
  'enum struct generic': [
`enum Grade { A, B, C }\nstruct Pair { public int L, R; }\nclass Box<T> { public T Value; public Box(T v) { Value = v; } }`,
`var b = new Box<Grade>(Grade.B);\nConsole.WriteLine($"{b.Value} {new Pair { L = 1, R = 2 }.R}");\nb.Value`],
  'stdin': [`Console.Write("Name? ");\nvar name = Console.ReadLine();\nConsole.WriteLine($"Hello, {name}");`],
  'await': [`await Task.Delay(10);\nvar r = await Task.FromResult(42);\nr`],
  'nullable': [`string? maybe = null;\nConsole.WriteLine(maybe.Length);`],
  'compile error keeps state': [`var keep = 1;`, `keep = "x";`, `keep + 1`],
  'throw keeps earlier variables': [`var before = 1;\nthrow new Exception("boom");\nvar after = 2;`, `$"before={before}, after={after}"`],
  'object printing in a variable list': [`class Dog { public string Name = "Rex"; }\nvar d = new Dog();\nd`, `class Dog { public string Name = "Rex"; public override string ToString() => $"Dog {Name}"; }\nvar d2 = new Dog();\nd2`],
  'uninitialised and top-level fields': [`int counter;\ncounter++;\ncounter`, `counter`],
};
if (process.argv[1].endsWith('semantics.mjs')) {
  const srv = await serve(root, port);
  const browser = await chromium.launch();
  const { page } = await openPage(browser, srv.url);
  for (const [name, cells] of Object.entries(cases)) {
    if (filter && !name.includes(filter)) continue;
    await page.evaluate(() => window.runner.invoke('SubReset'));
    console.log(`\n##### ${name}`);
    for (let i = 0; i < cells.length; i++) {
      const r = await page.evaluate(([c, i]) => window.runner.invoke('SubRun', ['cell' + (i + 1), c, 'Ada\n', true]), [cells[i], i]);
      console.log(`--- cell${i + 1}: ${cells[i].replace(/\n/g, ' | ')}`);
      console.log(`    ${r.phase}${r.hostError ? ' ' + r.hostError.split('\n')[0] : ''}`);
      for (const d of r.diagnostics || []) console.log(`    ${d.severity} ${d.id} ${d.file}:${d.line}:${d.col} ${d.message}`);
      if (r.phase === 'compile' && !(r.diagnostics || []).length) console.log('    ALL: ' + JSON.stringify(r.allDiagnostics));
      if (r.stdout) console.log('    stdout: ' + JSON.stringify(r.stdout));
      if (r.stderr) console.log('    stderr: ' + JSON.stringify(r.stderr));
      if (r.returnValue != null) console.log(`    value: ${r.returnValue} (${r.returnType})`);
    }
  }
  await browser.close(); srv.stop();
}
