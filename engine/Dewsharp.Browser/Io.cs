using System.Runtime.InteropServices.JavaScript;

namespace Dewsharp;

/// <summary>Synchronous calls into the worker's JavaScript. web/engine/worker.js defines
/// <c>globalThis.__dewsharp</c> before the runtime starts.</summary>
static partial class Io
{
    /// <summary>Hands one output chunk to the worker, which posts it to the page, batched: at most every
    /// 25 ms, or at once when <paramref name="flush"/> is true. <paramref name="kind"/> is out, err, echo,
    /// clear or style (for style, <paramref name="text"/> is JSON: {"fg":..,"bg":..}). Returns the control
    /// flag: 0 carry on, 1 the learner pressed Stop (or the run timed out).</summary>
    [JSImport("globalThis.__dewsharp.write")] internal static partial int Write(string kind, string text, bool flush);

    /// <summary>Blocks the worker until the page sends a line (live input only). Returns the line, null at
    /// the end of input, or <see cref="StopSentinel"/> if the learner pressed Stop while it waited.</summary>
    [JSImport("globalThis.__dewsharp.readLine")] internal static partial string? ReadLine();

    /// <summary>Reads the control flag without posting anything (0 or 1, as for Write).</summary>
    [JSImport("globalThis.__dewsharp.poll")] internal static partial int Poll();

    /// <summary>Tells the runner which phase the run is in. "running" starts the timeout clock; <paramref name="head"/>
    /// is the result so far (kinds, files, diagnostics), which the runner keeps in case it has to end the run.</summary>
    [JSImport("globalThis.__dewsharp.phase")] internal static partial void Phase(string phase, string head);

    internal const string StopSentinel = "\u0003STOP";
}
