using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace Dewsharp;

public sealed record Frame(string CellId, string File, int Line, string? Member);
public sealed record ExceptionInfo(string Type, string Message, List<Frame> Frames, string Trace, ExceptionInfo? Inner);

/// <summary>Turns an exception from a learner's program into the frames of their own code, with the cell and
/// line of each. The browser runtime never prints file and line (spike_a trap 6), so the lines come from the
/// program's portable PDB, read here with System.Reflection.Metadata.</summary>
sealed class Frames : IDisposable
{
    readonly System.Reflection.Assembly _user;
    readonly MetadataReaderProvider _provider;
    readonly MetadataReader _pdb;
    readonly Func<string, (string cellId, string file)?> _cellOf;

    public Frames(System.Reflection.Assembly user, byte[] pdb, Func<string, (string, string)?> cellOf)
    {
        _user = user;
        _provider = MetadataReaderProvider.FromPortablePdbImage(ImmutableArray.Create(pdb));
        _pdb = _provider.GetMetadataReader();
        _cellOf = cellOf;
    }

    public void Dispose() => _provider.Dispose();

    public ExceptionInfo Describe(Exception e)
    {
        var frames = new List<Frame>();
        var trace = new StringBuilder();
        trace.Append(e.GetType().FullName).Append(": ").Append(e.Message);
        foreach (var f in new StackTrace(e, false).GetFrames())
        {
            var m = f.GetMethod();
            if (m == null || m.Module.Assembly != _user || f.GetILOffset() < 0) continue;
            var (doc, line) = Lookup(m.MetadataToken, f.GetILOffset());
            if (doc == null || _cellOf(doc) is not { } cell) continue;
            frames.Add(new Frame(cell.cellId, cell.file, line, Member(m)));
            trace.Append("\n   at ").Append(RawName(m)).Append(" in ").Append(cell.file).Append(":line ").Append(line);
        }
        return new ExceptionInfo(e.GetType().FullName ?? e.GetType().Name, e.Message, frames, trace.ToString(),
            e.InnerException is { } inner ? Describe(inner) : null);
    }

    (string?, int) Lookup(int methodToken, int ilOffset)
    {
        try
        {
            var handle = MetadataTokens.MethodDefinitionHandle(methodToken & 0xFFFFFF);
            var info = _pdb.GetMethodDebugInformation(handle.ToDebugInformationHandle());
            SequencePoint? best = null;
            foreach (var sp in info.GetSequencePoints())
            {
                if (sp.Offset > ilOffset) break;
                if (sp.IsHidden) continue;
                best = sp;
            }
            if (best is SequencePoint b) return (_pdb.GetString(_pdb.GetDocument(b.Document).Name), b.StartLine);
        }
        catch { }
        return (null, 0);
    }

    /// <summary>The method as .NET's own console prints it: Type.Method(Type name, ...).</summary>
    static string RawName(MethodBase m) =>
        (m.DeclaringType?.FullName?.Replace('+', '.') ?? "?") + "." + m.Name + "(" +
        string.Join(", ", m.GetParameters().Select(p => p.ParameterType.Name + " " + p.Name)) + ")";

    static readonly Dictionary<Type, string> Keywords = new()
    {
        [typeof(int)] = "int", [typeof(string)] = "string", [typeof(bool)] = "bool", [typeof(double)] = "double",
        [typeof(decimal)] = "decimal", [typeof(long)] = "long", [typeof(char)] = "char", [typeof(object)] = "object",
        [typeof(float)] = "float", [typeof(byte)] = "byte", [typeof(short)] = "short", [typeof(uint)] = "uint",
    };

    static string TypeName(Type t)
    {
        if (Keywords.TryGetValue(t, out var k)) return k;
        if (t.IsArray) return TypeName(t.GetElementType()!) + "[]";
        if (t.IsGenericType)
        {
            var n = t.Name; int tick = n.IndexOf('`');
            return (tick > 0 ? n[..tick] : n) + "<" + string.Join(", ", t.GetGenericArguments().Select(TypeName)) + ">";
        }
        return t.Name;
    }

    /// <summary>The member as a learner would name it: Planet.Orbit(), Planet(string) for a constructor,
    /// Planet.Name for a property, Check(int) for a method written among the statements. Null for the
    /// cell's own statements.</summary>
    public static string? Member(MethodBase m)
    {
        var type = m.DeclaringType;
        string name = m.Name;
        // An async method or iterator runs as MoveNext on a generated class named <Method>d__N.
        if (name == "MoveNext" && type != null && type.Name.StartsWith('<'))
        {
            name = type.Name.Substring(1, type.Name.IndexOf('>') - 1);
            if (name.StartsWith('<')) name = type.Name.Substring(1, type.Name.LastIndexOf('>') - 1);
            type = type.DeclaringType;
        }
        // Lambdas live on generated classes such as <>c or <>c__DisplayClass0_0.
        while (type != null && type.Name.StartsWith("<>")) type = type.DeclaringType;
        // A method written among the statements (a local function): <<Main>$>g__Check|0_0.
        int g = name.IndexOf(">g__", StringComparison.Ordinal);
        if (g >= 0)
        {
            var local = name.Substring(g + 4);
            int bar = local.IndexOf('|');
            return (bar > 0 ? local[..bar] : local) + "(" + Params(m) + ")";
        }
        // A lambda: <Outer>b__0_0. Name the method it is written in.
        int b = name.IndexOf(">b__", StringComparison.Ordinal);
        if (b >= 0) name = name.Substring(1, b - 1);
        if (name == "<Main>$" || name == "Main" && type?.Name == "Program" && type.GetMethod("<Main>$", BindingFlags.Static | BindingFlags.NonPublic) != null)
            return null;
        var owner = type == null ? "" : TypeName(type);
        if (name == ".ctor") return owner + "(" + Params(m) + ")";
        if (name.StartsWith("get_") || name.StartsWith("set_")) return owner + "." + name[4..];
        return owner + "." + name + "(" + (b >= 0 ? "" : Params(m)) + ")";
    }

    static string Params(MethodBase m) => string.Join(", ", m.GetParameters().Select(p => TypeName(p.ParameterType)));
}
