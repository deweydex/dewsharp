// The C# engine's Web Worker (a module worker). runner.js starts it; nothing else talks to it.
// docs/ARCHITECTURE.md, "The worker protocol", lists every message. In short:
//
//   runner -> worker   {type:'init', frameworkUrl, protocol}   boot .NET from <frameworkUrl>dotnet.js
//                      {type:'buffer', buffer}                  the SharedArrayBuffer for input and Stop
//                      {type:'warm', id}                        the warm-up compile
//                      {type:'run', id, request}                run or check (request: docs/ENGINE_API.md)
//                      {type:'classify', id, cells}             syntax-only kinds
//                      {type:'memory', id}                      memory in use
//   worker -> runner   {type:'progress', loaded, total}         files downloaded so far
//                      {type:'ready', protocol, bootMs, info}   .NET is up
//                      {type:'boot-error', code, message}       .NET could not start
//                      {type:'phase', id, phase, head}          'running': the program starts (head: the result so far)
//                      {type:'out', id, kind, text}             an output chunk
//                      {type:'input', id}                       the program waits in ReadLine/Read/ReadKey
//                      {type:'done', id, result, memory}        the reply to warm/run/classify/memory
//                      {type:'crash', message}                  .NET stopped (Environment.Exit, a fatal error)
//
// The C# side calls globalThis.__dewsharp synchronously through [JSImport] (engine/Dewsharp.Browser/Io.cs).
// readLine() blocks this worker with Atomics.wait until the page answers; a worker may block, a page may not.

const PROTOCOL = 1;
const STOP = '\u0003STOP';            // Io.StopSentinel: C# turns it into StopRequestedException
const decoder = new TextDecoder();

// The shared buffer: Int32 [0] input state (0 waiting, 1 a line, 2 end of input, 3 stop), [1] line length in
// bytes, [2] the stop flag (1: stop), [3] unused; the line's UTF-8 bytes start at byte 16.
let ctrl = null, data = null;
let current = 0;                        // the id of the request in progress
let exportsApi = null, runtime = null;
let bootPromise = null;
let chain = Promise.resolve();          // runs and warm-ups, one at a time

globalThis.__dewsharp = {
  write(kind, text) {
    postMessage({ type: 'out', id: current, kind, text });
    return ctrl ? Atomics.load(ctrl, 2) : 0;
  },
  poll() {
    return ctrl ? Atomics.load(ctrl, 2) : 0;
  },
  phase(phase, head) {
    postMessage({ type: 'phase', id: current, phase, head: head ? JSON.parse(head) : null });
  },
  readLine() {
    if (!ctrl) return null;                       // no live input: end of input
    if (Atomics.load(ctrl, 2)) return STOP;
    Atomics.store(ctrl, 0, 0);                    // before asking, so an early answer isn't lost
    postMessage({ type: 'input', id: current });
    Atomics.wait(ctrl, 0, 0);                     // sleeps until the runner stores 1, 2 or 3 and notifies
    const state = Atomics.load(ctrl, 0);
    if (state === 2) return null;
    if (state === 3) return STOP;
    const length = Atomics.load(ctrl, 1);
    return decoder.decode(data.slice(0, length)); // slice(): TextDecoder refuses views of shared memory
  },
};

function heapBytes() {
  try { return runtime.localHeapViewU8().buffer.byteLength; } catch { return null; }
}

/** Sorts a boot failure into a code that runner.js turns into words a learner can read. */
function classify(err) {
  const text = String(err && (err.stack || err.message) || err);
  if (typeof WebAssembly !== 'object') return 'unsupported';
  if (/integrity|digest|\b404\b|not found/i.test(text)) return 'changed';
  if (/out of memory|RangeError: (WebAssembly\.Memory|Array buffer allocation)/i.test(text)) return 'memory';
  if (/fetch|network|Failed to load|dynamically imported module|Load failed/i.test(text)) return 'download';
  return 'other';
}

async function boot({ frameworkUrl }) {
  const t0 = performance.now();
  try {
    const { dotnet } = await import(new URL('dotnet.js', frameworkUrl).href);
    runtime = await dotnet
      .create();
    console.log('DBG created');
    const exports = await runtime.getAssemblyExports(runtime.getConfig().mainAssemblyName);
    console.log('DBG exports', Object.keys(exports));
    exportsApi = exports.Dewsharp.Engine;
    const info = JSON.parse(exportsApi.Boot());
    console.log('DBG booted', JSON.stringify(info));
    postMessage({ type: 'ready', protocol: PROTOCOL, bootMs: performance.now() - t0, info,
      crossOriginIsolated: self.crossOriginIsolated });
  } catch (err) {
    postMessage({ type: 'boot-error', code: classify(err), message: String(err && (err.stack || err.message) || err) });
    throw err;
  }
}

function reply(id, result) {
  postMessage({ type: 'done', id, result, memory: heapBytes() });
}

async function handle(m) {
  console.log('DBG handle', m.type);
  current = m.id;
  try {
    if (m.type === 'warm') reply(m.id, JSON.parse(await exportsApi.Warm()));
    else if (m.type === 'run') reply(m.id, JSON.parse(await exportsApi.Run(JSON.stringify(m.request))));
  } catch (err) {
    reply(m.id, { outcome: 'host-error', detail: String(err && (err.stack || err.message) || err) });
  }
}

self.onmessage = (e) => {
  const m = e.data;
  switch (m.type) {
    case 'init':
      bootPromise = boot(m);
      bootPromise.catch(() => {});
      break;
    case 'buffer':
      ctrl = new Int32Array(m.buffer, 0, 4);
      data = new Uint8Array(m.buffer, 16);
      break;
    case 'classify':
    case 'memory':
      // Not queued behind a run: these are quick, synchronous calls, and .NET is free whenever this worker
      // gets a message (a run that waits in ReadLine or spins keeps the worker busy, and these wait for it).
      bootPromise.then(() => {
        try {
          if (m.type === 'classify') reply(m.id, JSON.parse(exportsApi.Classify(JSON.stringify(m.cells))));
          else reply(m.id, { ...JSON.parse(exportsApi.Memory()), wasmBytes: heapBytes() });
        } catch (err) {
          reply(m.id, { error: String(err && (err.stack || err.message) || err) });
        }
      }, () => {});
      break;
    case 'warm':
    case 'run':
      chain = chain.then(() => bootPromise).then(() => handle(m), () => {});
      break;
  }
};

self.addEventListener('unhandledrejection', (e) => {
  postMessage({ type: 'log', message: 'unhandled rejection: ' + String(e.reason && (e.reason.stack || e.reason)) });
});
