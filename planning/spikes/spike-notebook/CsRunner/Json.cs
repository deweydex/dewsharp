using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

// Tiny reflection-free JSON writer (JsonSerializer's reflection mode is off in trimmed wasm builds).
static class J
{
    public static string Write(object? value)
    {
        using var ms = new MemoryStream();
        using (var w = new Utf8JsonWriter(ms)) Emit(w, value);
        return Encoding.UTF8.GetString(ms.ToArray());
    }

    static void Emit(Utf8JsonWriter w, object? v)
    {
        switch (v)
        {
            case null: w.WriteNullValue(); break;
            case string s: w.WriteStringValue(s); break;
            case bool b: w.WriteBooleanValue(b); break;
            case int i: w.WriteNumberValue(i); break;
            case long l: w.WriteNumberValue(l); break;
            case double d: w.WriteNumberValue(Math.Round(d, 1)); break;
            case IDictionary<string, object?> dict:
                w.WriteStartObject();
                foreach (var kv in dict) { w.WritePropertyName(kv.Key); Emit(w, kv.Value); }
                w.WriteEndObject(); break;
            case IDictionary<string, double> dd:
                w.WriteStartObject();
                foreach (var kv in dd) { w.WritePropertyName(kv.Key); Emit(w, kv.Value); }
                w.WriteEndObject(); break;
            case IEnumerable e:
                w.WriteStartArray();
                foreach (var x in e) Emit(w, x);
                w.WriteEndArray(); break;
            default: w.WriteStringValue(v.ToString()); break;
        }
    }
}
