// Runs the .NET runtime (and Roslyn) inside a dedicated module Web Worker.
// Protocol (host -> worker):  {id, type:'run', names, texts, stdin, interactive, ...}
//                             {type:'stdin-buffer', buffer}   SharedArrayBuffer for the Atomics transport
//                             {type:'stdin-xhr', url, token}  service-worker transport (no isolation needed)
// Protocol (worker -> host):  {type:'ready', bootMs, transport}
//                             {id, type:'out', text, err}     streamed output (interactive runs only)
//                             {id, type:'stdin-request', seq} the program is blocked in Console.ReadLine
//                             {id, type:'result', result}
//
// C# calls globalThis.__csio.readLine() and .write() synchronously through [JSImport]. readLine blocks
// this worker's thread until the page answers, which is allowed in a worker (never on the main thread).
import { dotnet } from './_framework/dotnet.js';

const STOP = '\u0003STOP';           // sentinel string C# turns into StopRequestedException
const decoder = new TextDecoder();
let currentId = 0, seq = 0;
let ctrl = null, data = null;        // Atomics transport: ctrl = [state, length, stopFlag]
let xhrUrl = null, xhrToken = null;  // sync-XHR transport
// Set when the sync XHR fails. terminate() aborts the pending XHR at once but the worker can keep running
// for ~2 s more; a student's catch-all loop would then fire thousands of failing XHRs. From here on every
// read and write reports Stop without touching the network.
let dying = false;

function transport() { return ctrl ? 'atomics' : xhrUrl ? 'sync-xhr' : 'none'; }

globalThis.__csio = {
  write(text, err) {
    if (text) postMessage({ id: currentId, type: 'out', text, err });
    return ctrl ? Atomics.load(ctrl, 2) : 0;   // 1 = Stop pressed (only visible with the Atomics transport)
  },
  readLine() {
    const n = ++seq;
    if (dying) return STOP;
    if (ctrl) {
      if (Atomics.load(ctrl, 2)) return STOP;
      Atomics.store(ctrl, 0, 0);
      postMessage({ id: currentId, type: 'stdin-request', seq: n, transport: 'atomics' });
      Atomics.wait(ctrl, 0, 0);                  // sleeps until the page stores 1/2/3 and notifies
      const state = Atomics.load(ctrl, 0);
      if (state === 2) return null;              // end of input
      if (state === 3) return STOP;
      const len = Atomics.load(ctrl, 1);
      return decoder.decode(data.slice(0, len)); // slice(): TextDecoder refuses views on shared memory
    }
    if (xhrUrl) {
      const key = `${xhrToken}:${currentId}:${n}`;
      postMessage({ id: currentId, type: 'stdin-request', seq: n, key, transport: 'sync-xhr' });
      for (let attempt = 0; ; attempt++) {
        const x = new XMLHttpRequest();
        x.open('POST', xhrUrl + '/read', false);   // synchronous: the service worker holds it until answered
        try { x.send(key); } catch (e) { /* aborted: status stays 0 */ }
        if (x.status !== 200) {
          dying = true;
          postMessage({ id: currentId, type: 'out', err: true, text: `\n[Input connection lost (HTTP ${x.status}).]\n` });
          return STOP;
        }
        const r = JSON.parse(x.responseText);
        if (r.retry) continue;                     // the SW lets a held request go every so often; ask again
        if (r.stop) return STOP;
        return r.eof ? null : r.line;
      }
    }
    postMessage({ id: currentId, type: 'out', err: true,
      text: '[This page cannot pause for typing: no SharedArrayBuffer and no stdin service worker.]\n' });
    return null;
  },
};

const t0 = performance.now();
let exportsObj;
try {
  const { getAssemblyExports, getConfig } = await dotnet.withDiagnosticTracing(false).create();
  exportsObj = await getAssemblyExports(getConfig().mainAssemblyName);
  postMessage({ type: 'ready', bootMs: performance.now() - t0, crossOriginIsolated: self.crossOriginIsolated,
    hasSAB: typeof SharedArrayBuffer !== 'undefined' });
} catch (err) {
  postMessage({ type: 'boot-error', error: String(err && err.stack || err) });
}

onmessage = async (e) => {
  const m = e.data;
  if (m.type === 'stdin-buffer') { ctrl = new Int32Array(m.buffer, 0, 3); data = new Uint8Array(m.buffer, 12); return; }
  if (m.type === 'stdin-xhr') { xhrUrl = m.url; xhrToken = m.token; return; }
  const r = exportsObj.Runner;
  try {
    if (m.type === 'run') {
      currentId = m.id; seq = 0;
      const t = performance.now();
      const json = await r.CompileAndRun(m.names, m.texts, m.stdin ?? '', !!m.implicitUsings, !!m.collectible,
        m.emitPdb !== false, !!m.interactive);
      const result = JSON.parse(json);
      result.timings.totalWorkerMs = performance.now() - t;
      result.transport = transport();
      postMessage({ id: m.id, type: 'result', result });
    } else if (m.type === 'memory') {
      postMessage({ id: m.id, type: 'result', result: { dotnet: JSON.parse(m.collect ? r.Collect() : r.Memory()) } });
    } else if (m.type === 'probe') {
      postMessage({ id: m.id, type: 'result', result: {
        crossOriginIsolated: self.crossOriginIsolated, hasSAB: typeof SharedArrayBuffer !== 'undefined',
        jspi: typeof WebAssembly.Suspending === 'function' && typeof WebAssembly.promising === 'function' } });
    }
  } catch (err) {
    postMessage({ id: m.id, type: 'error', error: String(err && err.stack || err) });
  }
};
