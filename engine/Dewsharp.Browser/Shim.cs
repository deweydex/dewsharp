using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Text;

namespace Dewsharp;

/// <summary>The page's own assembly, <c>Dewsharp.Page</c>, compiled once when the engine warms up and referenced
/// by every learner program. It holds:
/// <list type="bullet">
/// <item><c>Dewsharp.Page.Console</c>, the Console shim of DECISIONS.md #8. An injected
/// <c>global using Console = global::Dewsharp.Page.Console;</c> points the learner's <c>Console</c> at it. It
/// is generated from System.Console's own public surface (in the reference assemblies the learner compiles
/// against), so every member exists with the same signature and passes straight through, except Clear,
/// ForegroundColor, BackgroundColor, ResetColor, ReadKey and In, which work on the page. The class is called
/// Console, so compiler messages still say 'Console'.</item>
/// <item><c>Dewsharp.Page.Environment</c>, the same for System.Environment, so that <c>Environment.Exit</c> ends
/// the run and not the whole of .NET in the worker.</item>
/// <item><c>Dewsharp.Page.Values</c>, which evaluates the inputs of a comparison.</item>
/// <item><c>Dewsharp.Page.Hooks</c>: delegates the engine fills in, since the shim can't reference the engine
/// (the engine ships as Webcil, which Roslyn can't read).</item>
/// </list></summary>
static class Shim
{
    public const string AssemblyName = "Dewsharp.Page";
    /// <summary>The injected global usings that point a learner's <c>Console</c> and <c>Environment</c> at the shim.</summary>
    public const string Aliases = "global using Console = global::Dewsharp.Page.Console;\nglobal using Environment = global::Dewsharp.Page.Environment;";

    static byte[]? _image;
    static Assembly? _assembly;
    static MetadataReference? _reference;

    public static MetadataReference Reference => _reference ?? throw new InvalidOperationException("shim not built");
    public static bool Built => _reference != null;
    public static string? Source { get; private set; }

    static readonly SymbolDisplayFormat TypeFormat = new(
        globalNamespaceStyle: SymbolDisplayGlobalNamespaceStyle.Included,
        typeQualificationStyle: SymbolDisplayTypeQualificationStyle.NameAndContainingTypesAndNamespaces,
        genericsOptions: SymbolDisplayGenericsOptions.IncludeTypeParameters,
        miscellaneousOptions: SymbolDisplayMiscellaneousOptions.UseSpecialTypes
            | SymbolDisplayMiscellaneousOptions.EscapeKeywordIdentifiers
            | SymbolDisplayMiscellaneousOptions.IncludeNullableReferenceTypeModifier);

    // Members the shim implements itself. Everything else on System.Console and System.Environment is forwarded.
    static readonly HashSet<string> OwnConsoleMethods = new() { "Clear()", "ResetColor()", "ReadKey()", "ReadKey(bool)" };
    static readonly HashSet<string> OwnConsoleProperties = new() { "ForegroundColor", "BackgroundColor", "In" };
    static readonly HashSet<string> OwnEnvironmentMethods = new() { "Exit(int)" };

    /// <summary>Generates, compiles and loads the shim. Called once, from the warm-up.</summary>
    public static void Build(IReadOnlyList<MetadataReference> refs, CSharpParseOptions parse)
    {
        if (_reference != null) return;
        var probe = CSharpCompilation.Create("probe", references: refs);
        var source = Generate(probe);
        var tree = CSharpSyntaxTree.ParseText(SourceText.From(source, Encoding.UTF8), parse, path: "");
        var comp = CSharpCompilation.Create(AssemblyName, new[] { tree }, refs,
            new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary,
                optimizationLevel: OptimizationLevel.Release, nullableContextOptions: NullableContextOptions.Enable,
                concurrentBuild: false));
        using var pe = new MemoryStream();
        var emit = comp.Emit(pe);
        if (!emit.Success)
            throw new InvalidOperationException("The Console shim did not compile:\n" +
                string.Join("\n", emit.Diagnostics.Where(d => d.Severity == DiagnosticSeverity.Error)));
        _image = pe.ToArray();
        _assembly = Assembly.Load(_image);
        // Learner assemblies are loaded from bytes, each into its own load context, and find the shim here.
        AppDomain.CurrentDomain.AssemblyResolve += (_, e) =>
            new AssemblyName(e.Name).Name == AssemblyName ? _assembly : null;
        Wire(_assembly.GetType("Dewsharp.Page.Hooks")!);
        _reference = MetadataReference.CreateFromImage(_image);
        Source = source;
    }

    static void Set(Type hooks, string name, object value) =>
        hooks.GetField(name, BindingFlags.Public | BindingFlags.Static)!.SetValue(null, value);

    static void Wire(Type hooks)
    {
        Set(hooks, "In", (Func<TextReader>)(() => (TextReader?)RunContext.Current?.Reader ?? TextReader.Null));
        Set(hooks, "Clear", (Action)(() => RunContext.Current?.Clear()));
        Set(hooks, "GetFg", (Func<int>)(() => RunContext.Current?.Fg ?? -1));
        Set(hooks, "GetBg", (Func<int>)(() => RunContext.Current?.Bg ?? -1));
        Set(hooks, "SetColours", (Action<int, int>)((fg, bg) => RunContext.Current?.SetColours(fg, bg)));
        Set(hooks, "ReadLine", (Func<string?>)(() => RunContext.Current?.Reader.ReadLine()));
        Set(hooks, "IsControl", (Func<Exception, bool>)(e => e is StopRequestedException or ExitRequestedException));
        Set(hooks, "Exit", (Func<int, Exception>)(code => RunContext.Current is { Closed: false } ctx
            ? ctx.Exit(code) : new ExitRequestedException(code)));
        Set(hooks, "Value", (Action<int, bool, string?, string?, string?>)((index, ok, display, error, message) =>
        {
            var ctx = RunContext.Current;
            if (ctx == null || ctx.Closed) return;
            ctx.Values[index] = new ValueRecord(ok, display, error, message, ok ? "value" : "exception");
        }));
    }

    static string Escape(string name) =>
        SyntaxFacts.GetKeywordKind(name) != SyntaxKind.None ? "@" + name : name;

    static string Param(IParameterSymbol p, Func<ITypeSymbol, string> typeOf)
    {
        var sb = new StringBuilder();
        if (p.IsParams) sb.Append("params ");
        sb.Append(p.RefKind switch { RefKind.Ref => "ref ", RefKind.Out => "out ", RefKind.In => "in ", _ => "" });
        sb.Append(typeOf(p.Type)).Append(' ').Append(Escape(p.Name));
        return sb.ToString();
    }

    static string Arg(IParameterSymbol p) =>
        (p.RefKind switch { RefKind.Ref => "ref ", RefKind.Out => "out ", RefKind.In => "in ", _ => "" }) + Escape(p.Name);

    static string Signature(IMethodSymbol m) =>
        m.Name + "(" + string.Join(",", m.Parameters.Select(p => p.Type.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat))) + ")";

    /// <summary>The shim's C# source: the hand-written part, then the pass-through members of System.Console
    /// and System.Environment, generated from the reference assemblies the learner compiles against.</summary>
    public static string Generate(CSharpCompilation probe)
    {
        var sb = new StringBuilder();
        sb.Append(StaticPart);
        sb.Append("namespace Dewsharp.Page\n{\n");
        PassThrough(sb, probe, "System.Console", OwnConsoleMethods, OwnConsoleProperties);
        PassThrough(sb, probe, "System.Environment", OwnEnvironmentMethods, new HashSet<string>());
        sb.Append("}\n");
        return sb.ToString();
    }

    /// <summary>Writes <c>public static partial class Name</c> with every public static member of the real class
    /// that the shim doesn't implement itself, each calling the real one. A nested enum
    /// (Environment.SpecialFolder) is copied, so that <c>Environment.SpecialFolder.Desktop</c> still compiles,
    /// and converted back when it is passed on.</summary>
    static void PassThrough(StringBuilder sb, CSharpCompilation probe, string metadataName, HashSet<string> ownMethods, HashSet<string> ownProperties)
    {
        var type = probe.GetTypeByMetadataName(metadataName) ?? throw new InvalidOperationException("no " + metadataName);
        var real = "global::" + metadataName;
        var nested = new HashSet<ITypeSymbol>(SymbolEqualityComparer.Default);
        sb.Append("public static partial class ").Append(type.Name).Append("\n{\n");
        foreach (var n in type.GetTypeMembers())
        {
            if (n.DeclaredAccessibility != Accessibility.Public || n.TypeKind != TypeKind.Enum) continue;
            nested.Add(n);
            sb.Append("    public enum ").Append(n.Name).Append(" : ").Append(n.EnumUnderlyingType!.ToDisplayString(TypeFormat)).Append("\n    {\n");
            foreach (var f in n.GetMembers().OfType<IFieldSymbol>().Where(f => f.HasConstantValue))
                sb.Append("        ").Append(Escape(f.Name)).Append(" = ").Append(Convert.ToString(f.ConstantValue, System.Globalization.CultureInfo.InvariantCulture)).Append(",\n");
            sb.Append("    }\n");
        }
        string TypeOf(ITypeSymbol t) => nested.Contains(t) ? t.Name : t.ToDisplayString(TypeFormat);
        string ArgOf(IParameterSymbol p) => nested.Contains(p.Type) ? "(" + p.Type.ToDisplayString(TypeFormat) + ")" + Escape(p.Name) : Arg(p);
        foreach (var member in type.GetMembers())
        {
            if (member.DeclaredAccessibility != Accessibility.Public || !member.IsStatic) continue;
            switch (member)
            {
                case IMethodSymbol m when m.MethodKind == MethodKind.Ordinary && !m.IsGenericMethod:
                    if (ownMethods.Contains(Signature(m))) continue;
                    var ret = m.ReturnsVoid ? "void" : TypeOf(m.ReturnType);
                    var call = real + "." + Escape(m.Name) + "(" + string.Join(", ", m.Parameters.Select(ArgOf)) + ")";
                    if (nested.Contains(m.ReturnType)) call = "(" + ret + ")" + call;
                    sb.Append("    public static ").Append(ret).Append(' ').Append(Escape(m.Name)).Append('(')
                      .Append(string.Join(", ", m.Parameters.Select(p => Param(p, TypeOf)))).Append(") => ").Append(call).Append(";\n");
                    break;
                case IPropertySymbol p when !p.IsIndexer:
                    if (ownProperties.Contains(p.Name)) continue;
                    sb.Append("    public static ").Append(TypeOf(p.Type)).Append(' ').Append(Escape(p.Name)).Append(" { ");
                    if (p.GetMethod is { DeclaredAccessibility: Accessibility.Public })
                        sb.Append("get => ").Append(real).Append('.').Append(Escape(p.Name)).Append("; ");
                    if (p.SetMethod is { DeclaredAccessibility: Accessibility.Public })
                        sb.Append("set => ").Append(real).Append('.').Append(Escape(p.Name)).Append(" = value; ");
                    sb.Append("}\n");
                    break;
                case IEventSymbol e:
                    sb.Append("    public static event ").Append(e.Type.ToDisplayString(TypeFormat)).Append(' ').Append(Escape(e.Name))
                      .Append(" { add => ").Append(real).Append('.').Append(Escape(e.Name)).Append(" += value; remove => ").Append(real).Append('.')
                      .Append(Escape(e.Name)).Append(" -= value; }\n");
                    break;
            }
        }
        sb.Append("}\n");
    }

    // The hand-written part: the hooks, the members the page implements, and the comparison's Values.
    const string StaticPart = """
#nullable enable
namespace Dewsharp.Page
{
    /// Filled in by the engine (Dewsharp.Shim.Wire) when this assembly is loaded.
    public static class Hooks
    {
        public static global::System.Func<global::System.IO.TextReader>? In;
        public static global::System.Action? Clear;
        public static global::System.Func<int>? GetFg, GetBg;
        public static global::System.Action<int, int>? SetColours;
        public static global::System.Func<string?>? ReadLine;
        public static global::System.Func<global::System.Exception, bool>? IsControl;
        public static global::System.Action<int, bool, string?, string?, string?>? Value;
        public static global::System.Func<int, global::System.Exception>? Exit;
    }

    public static partial class Environment
    {
        /// Ends the program with this exit code. On the page it ends the run, not the whole of .NET.
        [global::System.Diagnostics.CodeAnalysis.DoesNotReturn]
        public static void Exit(int exitCode) => throw (Hooks.Exit?.Invoke(exitCode) ?? new global::System.InvalidOperationException("Environment.Exit"));
    }

    public static partial class Console
    {
        // Console.In's getter throws on browser .NET; this one gives the run's own reader.
        public static global::System.IO.TextReader In => Hooks.In?.Invoke() ?? global::System.IO.TextReader.Null;

        /// Clears the output on the page.
        public static void Clear() => Hooks.Clear?.Invoke();

        // A new console starts grey on black; the page draws those as its own default colours.
        public static global::System.ConsoleColor ForegroundColor
        {
            get { var c = Hooks.GetFg?.Invoke() ?? -1; return c < 0 ? global::System.ConsoleColor.Gray : (global::System.ConsoleColor)c; }
            set => Hooks.SetColours?.Invoke((int)value, Hooks.GetBg?.Invoke() ?? -1);
        }

        public static global::System.ConsoleColor BackgroundColor
        {
            get { var c = Hooks.GetBg?.Invoke() ?? -1; return c < 0 ? global::System.ConsoleColor.Black : (global::System.ConsoleColor)c; }
            set => Hooks.SetColours?.Invoke(Hooks.GetFg?.Invoke() ?? -1, (int)value);
        }

        public static void ResetColor() => Hooks.SetColours?.Invoke(-1, -1);

        public static global::System.ConsoleKeyInfo ReadKey() => ReadKey(false);

        /// The page has no key presses, only lines: ReadKey takes the first character of the next line the
        /// learner types. An empty line, or the end of input, is the Enter key.
        public static global::System.ConsoleKeyInfo ReadKey(bool intercept)
        {
            var line = Hooks.ReadLine?.Invoke();
            if (string.IsNullOrEmpty(line)) return new global::System.ConsoleKeyInfo('\r', global::System.ConsoleKey.Enter, false, false, false);
            char c = line[0];
            global::System.ConsoleKey key = 0;
            bool shift = false;
            if (c >= 'a' && c <= 'z') key = global::System.ConsoleKey.A + (c - 'a');
            else if (c >= 'A' && c <= 'Z') { key = global::System.ConsoleKey.A + (c - 'A'); shift = true; }
            else if (c >= '0' && c <= '9') key = global::System.ConsoleKey.D0 + (c - '0');
            else if (c == ' ') key = global::System.ConsoleKey.Spacebar;
            else if (c == '\t') key = global::System.ConsoleKey.Tab;
            else if (c == '+') key = global::System.ConsoleKey.OemPlus;
            else if (c == '-') key = global::System.ConsoleKey.OemMinus;
            else if (c == ',') key = global::System.ConsoleKey.OemComma;
            else if (c == '.') key = global::System.ConsoleKey.OemPeriod;
            return new global::System.ConsoleKeyInfo(c, key, shift, false, false);
        }
    }

    /// Evaluates the inputs of a comparison: the engine appends one Values.Record call per input.
    public static class Values
    {
        public static void Record<T>(int index, global::System.Func<T> produce)
        {
            T value;
            try { value = produce(); }
            catch (global::System.Exception e) when (!(Hooks.IsControl?.Invoke(e) ?? false))
            {
                Hooks.Value?.Invoke(index, false, null, e.GetType().Name, e.Message);
                return;
            }
            string display;
            try { display = Show(value); }
            catch (global::System.Exception e) when (!(Hooks.IsControl?.Invoke(e) ?? false)) { display = "(" + e.GetType().Name + " while showing the value)"; }
            Hooks.Value?.Invoke(index, true, display, null, null);
        }

        public static void Record(int index, global::System.Action act)
        {
            try { act(); }
            catch (global::System.Exception e) when (!(Hooks.IsControl?.Invoke(e) ?? false))
            {
                Hooks.Value?.Invoke(index, false, null, e.GetType().Name, e.Message);
                return;
            }
            Hooks.Value?.Invoke(index, true, "(no value)", null, null);
        }

        const int MaxItems = 100, MaxLength = 2000;

        /// Writes a value the way C# code would write it: "text", 'c', 12.5, true, [1, 2, 3].
        public static string Show(object? value)
        {
            var sb = new global::System.Text.StringBuilder();
            Append(sb, value, 0);
            return sb.Length > MaxLength ? sb.ToString(0, MaxLength) + "…" : sb.ToString();
        }

        static void Append(global::System.Text.StringBuilder sb, object? v, int depth)
        {
            var inv = global::System.Globalization.CultureInfo.InvariantCulture;
            switch (v)
            {
                case null: sb.Append("null"); return;
                case string s: Quote(sb, s, '"'); return;
                case char c: Quote(sb, c.ToString(), '\''); return;
                case bool b: sb.Append(b ? "true" : "false"); return;
                case double d: sb.Append(d.ToString("R", inv)); return;
                case float f: sb.Append(f.ToString("R", inv)); return;
                case decimal m: sb.Append(m.ToString(inv)); return;
                case global::System.Enum e:
                    var t = e.GetType();
                    sb.Append(global::System.Enum.IsDefined(t, e) ? t.Name + "." + e.ToString() : "(" + t.Name + ")" + global::System.Convert.ToInt64(e, inv));
                    return;
                case global::System.IFormattable n when v.GetType().IsPrimitive: sb.Append(n.ToString(null, inv)); return;
            }
            if (depth > 3 || sb.Length > MaxLength) { sb.Append("…"); return; }
            if (v is global::System.Runtime.CompilerServices.ITuple tuple && v.GetType().FullName!.StartsWith("System.ValueTuple"))
            {
                sb.Append('(');
                for (int i = 0; i < tuple.Length; i++) { if (i > 0) sb.Append(", "); Append(sb, tuple[i], depth + 1); }
                sb.Append(')');
                return;
            }
            if (v is global::System.Collections.IDictionary dict)
            {
                sb.Append('{');
                int n = 0;
                foreach (global::System.Collections.DictionaryEntry kv in dict)
                {
                    if (n++ == MaxItems) { sb.Append(", …"); break; }
                    sb.Append(n == 1 ? " [" : ", [");
                    Append(sb, kv.Key, depth + 1); sb.Append("] = "); Append(sb, kv.Value, depth + 1);
                }
                sb.Append(n == 0 ? "}" : " }");
                return;
            }
            if (v is global::System.Collections.IEnumerable seq)
            {
                sb.Append('[');
                int n = 0;
                foreach (var item in seq)
                {
                    if (n == MaxItems) { sb.Append(", …"); break; }
                    if (n++ > 0) sb.Append(", ");
                    Append(sb, item, depth + 1);
                }
                sb.Append(']');
                return;
            }
            sb.Append(v.ToString());
        }

        static void Quote(global::System.Text.StringBuilder sb, string s, char q)
        {
            sb.Append(q);
            foreach (var c in s)
            {
                switch (c)
                {
                    case '\\': sb.Append("\\\\"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    case '\0': sb.Append("\\0"); break;
                    default: if (c == q) sb.Append('\\'); sb.Append(c); break;
                }
            }
            sb.Append(q);
        }
    }
}

""";
}
