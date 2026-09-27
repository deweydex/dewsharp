// Runs the .NET runtime (and Roslyn) inside a dedicated module Web Worker.
// Protocol: host posts {id, type:'run', names, texts, stdin, implicitUsings, collectible}
//           worker posts {type:'ready', bootMs} once, then {id, type:'result', result} per run.
import { dotnet } from './_framework/dotnet.js';

const t0 = performance.now();
let exportsObj;
try {
  // ?debug=N on the worker URL sets MonoConfig.debugLevel (experiment: does the runtime then print file:line?)
  const dbg = new URL(self.location.href).searchParams.get('debug');
  let builder = dotnet.withDiagnosticTracing(false);
  if (dbg !== null) builder = builder.withConfig({ debugLevel: +dbg });
  const { getAssemblyExports, getConfig } = await builder.create();
  exportsObj = await getAssemblyExports(getConfig().mainAssemblyName);
  postMessage({ type: 'ready', bootMs: performance.now() - t0 });
} catch (err) {
  postMessage({ type: 'boot-error', error: String(err && err.stack || err) });
}

onmessage = async (e) => {
  const m = e.data;
  const r = exportsObj.Runner;
  try {
    if (m.type === 'run') {
      const t = performance.now();
      const json = await r.CompileAndRun(m.names, m.texts, m.stdin ?? '', !!m.implicitUsings, !!m.collectible, m.emitPdb !== false);
      const result = JSON.parse(json);
      result.timings.totalWorkerMs = performance.now() - t;
      postMessage({ id: m.id, type: 'result', result });
    } else if (m.type === 'call') {
      // Generic: call any [JSExport] on Runner; string results that look like JSON are parsed.
      const t = performance.now();
      let v = await r[m.method](...(m.args || []));
      if (typeof v === 'string' && (v[0] === '{' || v[0] === '[')) v = JSON.parse(v);
      if (v && typeof v === 'object' && !Array.isArray(v)) v.workerMs = performance.now() - t;
      postMessage({ id: m.id, type: 'result', result: v });
    } else if (m.type === 'memory') {
      postMessage({ id: m.id, type: 'result', result: {
        dotnet: JSON.parse(m.collect ? r.Collect() : r.Memory()),
        wasmBytes: wasmMemoryBytes() } });
    }
  } catch (err) {
    postMessage({ id: m.id, type: 'error', error: String(err && err.stack || err) });
  }
};

function wasmMemoryBytes() {
  // Emscripten module is exposed on globalThis.getDotnetRuntime(0).Module in .NET 8+.
  try {
    const rt = globalThis.getDotnetRuntime && globalThis.getDotnetRuntime(0);
    const mod = rt && rt.Module;
    if (mod && mod.HEAP8) return mod.HEAP8.buffer.byteLength;
  } catch (_) {}
  return null;
}
