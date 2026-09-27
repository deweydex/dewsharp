// The C# engine's Web Worker (a module worker). runner.js starts it; nothing else talks to it.
// docs/ARCHITECTURE.md, "The worker protocol", lists every message. In short:
//
//   runner -> worker   {type:'init', frameworkUrl, protocol}   boot .NET from <frameworkUrl>dotnet.js
//                      {type:'buffer', buffer}                  the SharedArrayBuffer for input and Stop
//                      {type:'warm', id}                        the warm-up compile
//                      {type:'run', id, request}                run or check (request: docs/ENGINE_API.md)
//                      {type:'classify', id, cells}             syntax-only kinds
//                      {type:'memory', id}                      memory in use
//   worker -> runner   {type:'progress', loaded, total, bytes}  files (and bytes) downloaded so far
//                      {type:'ready', protocol, bootMs, info}   .NET is up
//                      {type:'boot-error', code, message}       .NET could not start
//                      {type:'phase', id, phase, head}          'running': the program starts (head: the result so far)
//                      {type:'out', id, kind, text}             an output chunk
//                      {type:'input', id}                       the program waits in ReadLine/Read/ReadKey
//                      {type:'done', id, result, memory}        the reply to warm/run/classify/memory
//                      {type:'crash', id, reason, code, fatal}  .NET itself stopped: reason 'exit' (the
//                                                               program called System.Environment.Exit) or
//                                                               'fatal' (a stack overflow); the runner replaces
//                                                               this worker
//
// The C# side calls globalThis.__dewsharp synchronously through [JSImport] (engine/Dewsharp.Browser/Io.cs).
// readLine() blocks this worker with Atomics.wait until the page answers; a worker may block, a page may not.

const PROTOCOL = 1;
const STOP = '\u0003STOP';            // Io.StopSentinel: C# turns it into StopRequestedException
const POST_EVERY_MS = 25;             // output is posted to the page at most this often while a program prints
const POST_BYTES = 64 * 1024;         // ... or when this much has piled up
const decoder = new TextDecoder();

// The shared buffer: Int32 [0] input state (0 waiting, 1 a line, 2 end of input, 3 stop), [1] line length in
// bytes, [2] the stop flag (1: stop), [3] unused; the line's UTF-8 bytes start at byte 16.
let ctrl = null, data = null;
let current = 0;                        // the id of the request in progress
let exportsApi = null, runtime = null;
let bootPromise = null;
let chain = Promise.resolve();          // runs and warm-ups, one at a time

// Output waiting to be posted. C# hands over each finished line; posting every line would flood the page
// (spike_c: 281,000 lines in 0.7 s froze the main thread, and the Stop button with it).
let pending = '', pendingKind = 'out', lastPost = 0;

function post() {
  if (pending) postMessage({ type: 'out', id: current, kind: pendingKind, text: pending });
  pending = '';
  lastPost = performance.now();
}

// What .NET prints on a fatal error (a stack overflow) goes to console.error. While a program runs, it is
// also kept here, so that the runner can tell the learner what happened.
let fatalLines = null;
const consoleError = console.error.bind(console);
console.error = (...args) => {
  if (fatalLines) {
    // The first lines name the error and the innermost methods; the last ones reach the learner's statements.
    fatalLines.push(args.map(String).join(' '));
    if (fatalLines.length > 120) fatalLines.splice(60, 1);
  }
  consoleError(...args);
};

globalThis.__dewsharp = {
  write(kind, text, flush) {
    if (kind === 'clear' || kind === 'style') {
      post();
      postMessage({ type: 'out', id: current, kind, text });
    } else {
      if (pending && kind !== pendingKind) post();
      pendingKind = kind;
      pending += text;
      if (flush || pending.length >= POST_BYTES || performance.now() - lastPost >= POST_EVERY_MS) post();
    }
    return ctrl ? Atomics.load(ctrl, 2) : 0;
  },
  poll() {
    return ctrl ? Atomics.load(ctrl, 2) : 0;
  },
  phase(phase, head) {
    postMessage({ type: 'phase', id: current, phase, head: head ? JSON.parse(head) : null });
  },
  readLine() {
    post();
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
function classifyBootError(err) {
  const text = String(err && (err.stack || err.message) || err);
  if (typeof WebAssembly !== 'object') return 'unsupported';
  if (/integrity|digest|\b404\b|not found|Failed to fetch dynamically imported module/i.test(text)) return 'changed';
  if (/out of memory|RangeError: (WebAssembly\.Memory|Array buffer allocation)/i.test(text)) return 'memory';
  if (/fetch|network|Failed to load|Load failed/i.test(text)) return 'download';
  return 'other';
}

/** Bytes of _framework/ files fetched so far, as the network sent them (compressed), from this worker's
 *  resource timings. .NET 10 reports files, not bytes; the page shows both. Null if the browser won't say. */
function frameworkBytes(frameworkUrl) {
  try {
    let bytes = 0;
    for (const e of performance.getEntriesByType('resource'))
      if (e.name.startsWith(frameworkUrl)) bytes += e.encodedBodySize || e.transferSize || 0;
    return bytes;
  } catch { return null; }
}

async function boot({ frameworkUrl }) {
  const t0 = performance.now();
  try {
    const { dotnet } = await import(new URL('dotnet.js', frameworkUrl).href);
    let lastProgress = 0;
    runtime = await dotnet
      .withModuleConfig({
        // Files downloaded so far, and their bytes, for the page's progress line (at most every 100 ms).
        onDownloadResourceProgress(loaded, total) {
          const now = performance.now();
          if (now - lastProgress < 100 && loaded < total) return;
          lastProgress = now;
          postMessage({ type: 'progress', loaded, total, bytes: frameworkBytes(frameworkUrl) });
        },
      })
      .create();
    const exports = await runtime.getAssemblyExports(runtime.getConfig().mainAssemblyName);
    exportsApi = exports.Dewsharp.Engine;
    const info = JSON.parse(exportsApi.Boot());
    postMessage({ type: 'ready', protocol: PROTOCOL, bootMs: performance.now() - t0, info,
      crossOriginIsolated: self.crossOriginIsolated });
  } catch (err) {
    postMessage({ type: 'boot-error', code: classifyBootError(err), message: String(err && (err.stack || err.message) || err) });
    throw err;
  }
}

function reply(id, result) {
  postMessage({ type: 'done', id, result, memory: heapBytes() });
}

/** .NET stopped for good: the program called System.Environment.Exit, or it overflowed the stack. */
function exitCodeOf(err) {
  if (err && err.name === 'ExitStatus' && typeof err.status === 'number') return err.status;
  const m = /Program terminated with exit\((-?\d+)\)/.exec(String(err && (err.message || err)));
  return m ? Number(m[1]) : null;
}

/** The type, message and methods of a fatal error, from what .NET printed. */
function fatalOf(lines) {
  const text = (lines || []).join('\n');
  const m = /FATAL UNHANDLED EXCEPTION: ([\w.]+): ([^\n]*)/.exec(text) || /Unhandled Exception:\s*\n?\s*([\w.]+)(?::\s*([^\n]*))?/.exec(text);
  if (!m) return null;
  const members = [];
  for (const line of text.split('\n')) {
    const f = /^\s*at ([^\s(]+(?: \([^)]*\))?)/.exec(line);
    if (f) members.push(f[1]);
  }
  return { type: m[1], message: m[2] || '', members };
}

async function handle(m) {
  current = m.id;
  pending = '';
  lastPost = 0;
  fatalLines = m.type === 'run' ? [] : null;
  try {
    if (m.type === 'warm') reply(m.id, JSON.parse(await exportsApi.Warm()));
    else if (m.type === 'run') {
      const result = JSON.parse(await exportsApi.Run(JSON.stringify(m.request)));
      post();
      reply(m.id, result);
    }
  } catch (err) {
    post();
    const code = exitCodeOf(err);
    if (code != null) {
      const fatal = fatalOf(fatalLines);
      postMessage({ type: 'crash', id: m.id, reason: fatal ? 'fatal' : 'exit', code, fatal });
    } else {
      reply(m.id, { outcome: 'host-error', detail: String(err && (err.stack || err.message) || err) });
    }
  } finally {
    fatalLines = null;
  }
}

// addEventListener, never `self.onmessage =`: with an onmessage handler already set when dotnet.create() runs,
// .NET 10 never finishes starting (it hangs after dotnet.js loads). Found while merging the prototypes.
self.addEventListener('message', (e) => {
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
      // Not queued behind a run: these are quick, synchronous calls. A run that waits in ReadLine or spins
      // keeps this worker busy, and these wait for it.
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
});

self.addEventListener('unhandledrejection', (e) => {
  postMessage({ type: 'log', message: 'unhandled rejection: ' + String(e.reason && (e.reason.stack || e.reason)) });
});
