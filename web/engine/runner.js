// The one module the page uses to run C#. It owns the Web Worker (worker.js), the .NET runtime inside it, the
// shared buffer for input and Stop, restarts, and recycling. docs/ENGINE_API.md is the contract: change it
// together with this file. docs/ARCHITECTURE.md describes how it works.

const PROTOCOL = 1;                    // must match worker.js
const LINE_BYTES = 64 * 1024;          // the longest line of input, in UTF-8 bytes
const RELOAD_KEY = 'dewsharp:reloaded-after-boot-failure';

/** Memory, in bytes, above which an idle runner replaces its worker (docs/ENGINE_API.md, "Recycling").
 *  A new worker uses about 50 MB after boot and 120 MB after the first compile; each run adds 0.5-0.9 MB
 *  that .NET in the browser never gives back (planning/evidence/spike_a.md). */
export const RECYCLE_BYTES = 320 * 1024 * 1024;

/** What the learner reads when C# can't start. Keyed by the code worker.js gives the failure. */
const REASONS = {
  download: 'C# could not be downloaded. Check that you are online, then reload the page.',
  changed: 'This site was updated while the page was open. Reload the page to get the new version.',
  unsupported: 'This browser cannot run C#. Try the newest Chrome, Edge, Firefox or Safari.',
  memory: 'The device ran out of memory while starting C#. Close some other tabs, then reload the page.',
  other: 'C# could not start on this page. Reload the page. If that does not help, try another browser.',
};

function storage() {
  try { return globalThis.sessionStorage ?? null; } catch { return null; }
}

/**
 * Creates a runner and starts booting .NET at once.
 * @param {object} options
 * @param {URL|string} options.frameworkUrl  the folder that holds dotnet.js (the published _framework/)
 * @param {URL|string} [options.workerUrl]   defaults to worker.js beside this module
 * @param {number} [options.timeoutMs=30000] a run's own time before it is stopped (time waiting for input doesn't count)
 * @param {number} [options.graceMs=750]     how long Stop waits for the program to stop by itself
 * @param {number} [options.recycleBytes]    memory above which an idle runner replaces its worker
 * @param {boolean} [options.warm=true]      compile a small program at boot so the first Run is quick
 * @param {boolean} [options.reloadOnBootFailure=true]  reload the page once if .NET can't start
 */
export function createRunner(options) {
  return new Runner(options);
}

class Runner {
  constructor({ frameworkUrl, workerUrl, timeoutMs = 30000, graceMs = 750, recycleBytes = RECYCLE_BYTES,
    warm = true, reloadOnBootFailure = true } = {}) {
    if (!frameworkUrl) throw new Error('createRunner needs a frameworkUrl');
    this.frameworkUrl = new URL(String(frameworkUrl), globalThis.location?.href).href.replace(/\/?$/, '/');
    this.workerUrl = workerUrl ? String(workerUrl) : new URL('./worker.js', import.meta.url).href;
    this.opts = { timeoutMs, graceMs, recycleBytes, warm, reloadOnBootFailure };
    this.liveInput = !!globalThis.crossOriginIsolated && typeof SharedArrayBuffer === 'function';
    this.status = 'loading';
    this.detail = undefined;
    this.listeners = new Set();
    this.queue = [];                  // jobs waiting for the worker
    this.active = null;               // the job the worker is running
    this.stats = { boots: 0, restarts: 0, recycles: 0, runs: 0, lastBootMs: null, lastWarmMs: null, lastRecycleMs: null, memory: null };
    this.readyPromise = new Promise((resolve, reject) => { this.resolveReady = resolve; this.rejectReady = reject; });
    this.readyPromise.catch(() => {});
    this.worker = this.spawn({ primary: true });
  }

  /** Calls fn(status, detail) now and on every change. Returns a function that stops the calls. */
  onStatus(fn) {
    this.listeners.add(fn);
    try { fn(this.status, this.detail); } catch (e) { console.error(e); }
    return () => this.listeners.delete(fn);
  }

  setStatus(status, detail) {
    this.status = status;
    this.detail = detail;
    for (const fn of this.listeners) { try { fn(status, detail); } catch (e) { console.error(e); } }
  }

  /** Resolves after boot and the warm-up; rejects with an Error whose .reason a learner can read. */
  ready() { return this.readyPromise; }

  spawn({ primary }) {
    const w = new EngineWorker(this, { primary });
    w.start().then(() => this.onWorkerReady(w), (err) => this.onWorkerFailed(w, err));
    return w;
  }

  onWorkerReady(w) {
    if (w === this.worker) {
      storage()?.removeItem(RELOAD_KEY);
      this.resolveReady();
      this.pump();
    } else if (w === this.spare) {
      if (!this.active) this.swapToSpare();
    }
  }

  onWorkerFailed(w, err) {
    if (w === this.spare) { this.spare = null; w.terminate(); return; }
    if (w !== this.worker) return;
    const code = err.code || 'other';
    const store = storage();
    if (this.opts.reloadOnBootFailure && code !== 'unsupported' && globalThis.location && store && !store.getItem(RELOAD_KEY)) {
      // Most often, the site was updated and the files this page expects are gone. One reload fixes that.
      store.setItem(RELOAD_KEY, String(Date.now()));
      globalThis.location.reload();
      return;
    }
    const reason = REASONS[code] || REASONS.other;
    this.setStatus('unavailable', { reason, code, technical: err.message });
    const e = new Error(reason); e.reason = reason; e.code = code; e.technical = err.message;
    this.rejectReady(e);
    for (const job of [...this.queue, this.active].filter(Boolean)) job.finish({ outcome: 'host-error', detail: reason });
    this.queue = []; this.active = null;
  }

  /**
   * Runs (or checks) the last of `cells`, with the types of the cells above it. See docs/ENGINE_API.md.
   * Returns a job: { sendLine(text), endInput(), stop(), done: Promise<result> }.
   */
  run({ cells, mode = 'run', stdin, inputs, onOutput, onInputRequest, timeoutMs } = {}) {
    const live = stdin === undefined && this.liveInput && mode === 'run';
    const request = {
      cells: (cells || []).map(c => ({ id: String(c.id), file: c.file ?? null, code: String(c.code ?? '') })),
      mode, stdin: live ? null : String(stdin ?? ''), inputs: Array.isArray(inputs) ? inputs.map(String) : null, live,
    };
    const job = new Job(this, request, { onOutput, onInputRequest, live, timeoutMs: timeoutMs ?? this.opts.timeoutMs });
    if (this.status === 'unavailable') job.finish({ outcome: 'host-error', detail: this.detail?.reason });
    else { this.queue.push(job); this.pump(); }
    return job.handle;
  }

  /** Each cell's kind ('types' | 'program' | 'empty') from a syntax-only parse: { id: kind }. */
  async classify(cells) {
    const list = (cells || []).map(c => ({ id: String(c.id), code: String(c.code ?? '') }));
    for (;;) {
      const w = this.worker;
      await w.started;
      try { return await w.request({ type: 'classify', cells: list }); }
      catch (e) { if (e.retry && this.status !== 'unavailable') continue; throw e; }
    }
  }

  /** Memory in use: { wasmBytes, managedBytes, runs }. */
  async memory() {
    await this.worker.started;
    return this.worker.request({ type: 'memory' });
  }

  pump() {
    if (this.active || !this.worker.isReady) return;
    if (this.spare?.isReady) { this.swapToSpare(); if (!this.worker.isReady) return; }
    const job = this.queue.shift();
    if (!job) { if (this.status !== 'unavailable') this.setStatus('ready'); return; }
    this.active = job;
    this.setStatus('busy');
    job.start(this.worker);
  }

  jobFinished(job, memory) {
    if (this.active !== job) return;
    this.active = null;
    this.stats.runs++;
    if (memory != null) this.stats.memory = memory;
    if (memory != null && memory > this.opts.recycleBytes && !this.spare) {
      // Replace the worker while nobody waits for it: boot and warm a new one, then swap when idle.
      this.spareStarted = performance.now();
      this.spare = this.spawn({ primary: false });
    }
    this.pump();
  }

  swapToSpare() {
    const old = this.worker;
    this.worker = this.spare;
    this.spare = null;
    this.stats.recycles++;
    this.stats.lastRecycleMs = Math.round(performance.now() - this.spareStarted);
    old.terminate();
  }

  /** Ends the worker (and the active job with `result`), and starts a new one. */
  restart(result) {
    const old = this.worker;
    const job = this.active;
    this.active = null;
    old.terminate();
    this.stats.restarts++;
    if (job) job.finish(result);
    if (this.spare?.isReady) {
      this.worker = this.spare; this.spare = null;
      this.pump();
      return;
    }
    this.setStatus('restarting');
    this.worker = this.spawn({ primary: true });
  }

  /** Ends everything. The runner can't be used afterwards. */
  dispose() {
    this.worker?.terminate();
    this.spare?.terminate();
    for (const job of [...this.queue, this.active].filter(Boolean)) job.finish({ outcome: 'host-error', detail: 'disposed' });
    this.queue = []; this.active = null;
  }
}

/** One Web Worker running .NET. */
class EngineWorker {
  constructor(runner, { primary }) {
    this.runner = runner;
    this.primary = primary;
    this.nextId = 1;
    this.pending = new Map();         // id -> { resolve, reject } for warm/classify/memory
    this.isReady = false;
    this.dead = false;
    this.sab = runner.liveInput ? new SharedArrayBuffer(16 + LINE_BYTES) : null;
    this.ctrl = this.sab ? new Int32Array(this.sab, 0, 4) : null;
  }

  start() {
    const r = this.runner;
    const t0 = performance.now();
    let resolveStarted, rejectStarted;
    this.started = new Promise((res, rej) => { resolveStarted = res; rejectStarted = rej; });
    this.started.catch(() => {});
    return new Promise((resolve, reject) => {
      const fail = (code, message) => { const e = new Error(message); e.code = code; rejectStarted(e); reject(e); };
      try {
        this.worker = new Worker(r.workerUrl, { type: 'module' });
      } catch (err) {
        fail(typeof Worker === 'undefined' ? 'unsupported' : 'other', String(err));
        return;
      }
      this.worker.onerror = (e) => {
        e.preventDefault?.();
        if (!this.isReady) fail('download', 'worker error: ' + (e.message || 'the worker script could not start'));
        else this.crashed({ reason: 'error', message: 'worker error: ' + (e.message || '') });
      };
      this.worker.onmessage = async (e) => {
        const m = e.data;
        switch (m.type) {
          case 'progress':
            if (this.primary && r.worker === this && r.status !== 'restarting') r.setStatus('loading', { loaded: m.loaded, total: m.total, unit: 'files' });
            return;
          case 'ready': {
            if (m.protocol !== PROTOCOL) { fail('changed', `engine protocol ${m.protocol}, page expects ${PROTOCOL}`); return; }
            if (this.sab) this.worker.postMessage({ type: 'buffer', buffer: this.sab });
            r.stats.boots++;
            r.stats.lastBootMs = Math.round(performance.now() - t0);
            this.info = m.info;
            resolveStarted();
            // Warm up, unless a learner is already waiting to run something (a cold run is quicker then).
            if (r.opts.warm && !(this.primary && r.queue.length)) {
              if (this.primary && r.worker === this && r.status !== 'restarting') r.setStatus('warming');
              const w0 = performance.now();
              try { await this.request({ type: 'warm' }); } catch (err) { fail('other', 'warm-up failed: ' + err.message); return; }
              r.stats.lastWarmMs = Math.round(performance.now() - w0);
            }
            this.isReady = true;
            resolve();
            return;
          }
          case 'boot-error':
            fail(m.code, m.message);
            return;
          case 'crash':
            this.crashed(m);
            return;
          case 'log':
            console.warn('[dewsharp worker]', m.message);
            return;
          case 'done': {
            const p = this.pending.get(m.id);
            if (p) { this.pending.delete(m.id); p.resolve(m.result, m.memory); return; }
            break;
          }
        }
        if (this.job && m.id === this.job.id) this.job.onMessage(m);
      };
      this.worker.postMessage({ type: 'init', frameworkUrl: r.frameworkUrl, protocol: PROTOCOL });
    });
  }

  request(msg) {
    return new Promise((resolve, reject) => {
      if (this.dead) { const e = new Error('worker ended'); e.retry = true; reject(e); return; }
      const id = this.nextId++;
      this.pending.set(id, { resolve: (result) => result && result.error ? reject(new Error(result.error)) : resolve(result), reject });
      this.worker.postMessage({ ...msg, id });
    });
  }

  post(msg) { this.worker.postMessage(msg); }

  /** .NET in this worker has stopped for good. `m` is the worker's crash message, or { reason: 'error', message }. */
  crashed(m) {
    if (this.dead) return;
    const r = this.runner;
    if (r.worker !== this) { this.terminate(); if (r.spare === this) r.spare = null; return; }
    const job = r.active;
    const head = job?.head || {};
    let result;
    if (m.reason === 'exit') {
      // System.Environment.Exit, written in full, ends .NET itself (Environment.Exit goes through the shim and
      // doesn't). The program chose to stop, so its run is 'ok'.
      result = { ...head, outcome: 'ok', exitCode: m.code ?? 0 };
    } else if (m.reason === 'fatal' && m.fatal) {
      result = { ...head, outcome: 'exception', exitCode: m.code ?? 1, exception: fatalException(m.fatal, head, job?.request.cells.at(-1)?.id) };
    } else {
      result = { outcome: 'host-error', detail: m.message || 'The engine stopped unexpectedly.' };
    }
    r.restart(result);
  }

  terminate() {
    if (this.dead) return;
    this.dead = true;
    this.isReady = false;
    try { this.worker?.terminate(); } catch { }
    for (const p of this.pending.values()) { const e = new Error('worker ended'); e.retry = true; p.reject(e); }
    this.pending.clear();
  }
}

const encoder = new TextEncoder();

/** One run or check. `handle` is what run() returns to the page. */
class Job {
  constructor(runner, request, { onOutput, onInputRequest, live, timeoutMs }) {
    this.runner = runner;
    this.request = request;
    this.onOutput = onOutput;
    this.onInputRequest = onInputRequest;
    this.live = live;
    this.timeoutMs = timeoutMs;
    this.id = 0;
    this.lines = [];                 // lines sent before the program asked for them
    this.eof = false;
    this.waiting = false;
    this.phase = 'queued';
    this.stopReason = null;
    this.head = null;
    this.usedMs = 0;                 // the program's own running time so far
    this.clockStart = null;
    this.t0 = performance.now();
    this.done = new Promise(resolve => { this.resolveDone = resolve; });
    this.handle = {
      sendLine: (text) => this.sendLine(text),
      endInput: () => this.endInput(),
      stop: () => this.stop('stopped'),
      done: this.done,
    };
  }

  start(worker) {
    this.worker = worker;
    this.id = worker.nextId++;
    worker.job = this;
    if (this.stopReason) { this.finish({ outcome: this.stopReason }); return; }
    this.phase = 'compiling';
    if (worker.ctrl) { Atomics.store(worker.ctrl, 2, 0); Atomics.store(worker.ctrl, 0, 0); }   // clear the last run's Stop
    worker.post({ type: 'run', id: this.id, request: this.request });
  }

  onMessage(m) {
    if (this.finished) return;
    switch (m.type) {
      case 'out': {
        let chunk;
        if (m.kind === 'style') { try { chunk = { kind: 'style', style: JSON.parse(m.text) }; } catch { return; } }
        else if (m.kind === 'clear') chunk = { kind: 'clear' };
        else chunk = { kind: m.kind, text: m.text };
        try { this.onOutput?.(chunk); } catch (e) { console.error(e); }
        return;
      }
      case 'phase':
        if (m.phase === 'running') {
          this.phase = 'running';
          this.head = m.head;
          this.resumeClock();
          if (this.stopReason) this.armGrace();
        }
        return;
      case 'input':
        this.pauseClock();
        if (this.stopReason) { this.answer(3); return; }
        if (this.lines.length) { this.answer(1, this.lines.shift()); return; }
        if (this.eof) { this.answer(2); return; }
        this.waiting = true;
        try { this.onInputRequest?.(); } catch (e) { console.error(e); }
        return;
      case 'done': {
        let result = m.result;
        if (this.stopReason && result.outcome === 'stopped') result = { ...result, outcome: this.stopReason };
        this.finish(result, m.memory);
        return;
      }
    }
  }

  /** Writes the answer into the shared buffer and wakes the worker. state: 1 a line, 2 end of input, 3 stop. */
  answer(state, line) {
    const ctrl = this.worker.ctrl;
    if (state === 1) {
      // encodeInto refuses shared memory, so encode first and copy. A line longer than the buffer is cut
      // at the last whole character that fits.
      let encoded = encoder.encode(line);
      if (encoded.length > LINE_BYTES) {
        let end = LINE_BYTES;
        while (end > 0 && (encoded[end] & 0xc0) === 0x80) end--;
        encoded = encoded.subarray(0, end);
      }
      new Uint8Array(this.worker.sab, 16, LINE_BYTES).set(encoded);
      Atomics.store(ctrl, 1, encoded.length);
    }
    this.waiting = false;
    Atomics.store(ctrl, 0, state);
    Atomics.notify(ctrl, 0);
    if (state !== 3) this.resumeClock();
  }

  sendLine(text) {
    if (this.finished || !this.live) return false;
    const line = String(text).replace(/\r?\n[\s\S]*$/, '');
    if (this.waiting) this.answer(1, line);
    else this.lines.push(line);
    return true;
  }

  endInput() {
    if (this.finished || !this.live) return false;
    if (this.waiting) this.answer(2);
    else this.eof = true;
    return true;
  }

  pauseClock() {
    if (this.clockStart != null) { this.usedMs += performance.now() - this.clockStart; this.clockStart = null; }
    clearTimeout(this.timer);
  }

  resumeClock() {
    if (this.phase !== 'running' || this.finished || this.clockStart != null) return;
    this.clockStart = performance.now();
    const left = this.timeoutMs - this.usedMs;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.stop('timeout'), Math.max(0, left));
  }

  /** Stop: ask the program to stop by itself, then end the worker if it hasn't after graceMs. */
  stop(reason) {
    if (this.finished || this.stopReason) return;
    this.stopReason = reason;
    const r = this.runner;
    if (this.phase === 'queued') {
      r.queue = r.queue.filter(j => j !== this);
      this.finish({ outcome: reason });
      return;
    }
    const ctrl = this.worker.ctrl;
    if (!ctrl) { this.kill(); return; }                // no shared buffer: ending the worker is the only way
    Atomics.store(ctrl, 2, 1);
    if (this.waiting) this.answer(3);
    // While compiling, the engine sees the flag before it starts the program; the clock starts after that.
    if (this.phase === 'running') this.armGrace();
  }

  armGrace() {
    clearTimeout(this.grace);
    this.grace = setTimeout(() => this.kill(), this.runner.opts.graceMs);
  }

  kill() {
    if (this.finished) return;
    this.runner.restart({ ...(this.head || {}), outcome: this.stopReason || 'stopped' });
  }

  finish(result, memory) {
    if (this.finished) return;
    this.finished = true;
    this.pauseClock();
    clearTimeout(this.timer);
    clearTimeout(this.grace);
    if (this.worker && this.worker.job === this) this.worker.job = null;
    const full = normalise(result, this);
    this.resolveDone(full);
    this.runner.jobFinished(this, memory);
  }
}

/**
 * The exception of a fatal error (a stack overflow), from the methods .NET printed as it stopped. .NET stops
 * before the engine can read the program's PDB, so these frames have a cell and a member but no line.
 */
function fatalException(fatal, head, targetId) {
  const typeCells = head.typeCells || {};
  const frames = [];
  for (const raw of fatal.members || []) {
    // "Hero.set_Name (string)" or "Program.<<Main>$>g__F|0_0 (int)"
    const m = /^([\w.`+<>$|]+)\.([^.\s(]+)(?: \(([^)]*)\))?$/.exec(raw);
    if (!m) continue;
    const typeName = m[1].split(/[.+]/).filter(Boolean).pop().replace(/`\d+$/, '');
    let name = m[2];
    // The top-level statements are a class called Program, in the cell being run.
    const cell = typeCells[typeName] || (typeName === 'Program' && targetId != null ? `${targetId}|${head.files?.[targetId] ?? ''}` : undefined);
    if (!cell) continue;
    let member;
    const local = /g__([^|]+)\|/.exec(name);
    if (local) member = `${local[1]}(${m[3] || ''})`;
    else if (/^[gs]et_/.test(name)) member = `${typeName}.${name.slice(4)}`;
    else if (name === '.ctor' || name === 'ctor') member = `${typeName}(${m[3] || ''})`;
    else if (name.startsWith('<')) member = null;
    else member = `${typeName}.${name}(${m[3] || ''})`;
    const [cellId, file] = (cell || '|').split('|');
    const frame = { cellId: cellId || null, file: file || null, line: null, member };
    const last = frames[frames.length - 1];
    if (last && last.cellId === frame.cellId && last.member === frame.member) continue;   // one line per repeat
    frames.push(frame);
  }
  const overflow = /StackOverflow/.test(fatal.type);
  return {
    type: overflow ? 'System.StackOverflowException' : fatal.type,
    message: fatal.message || (overflow ? 'The requested operation caused a stack overflow.' : ''),
    frames,
    trace: [fatal.type + ': ' + fatal.message, ...(fatal.members || []).slice(0, 10).map(x => '   at ' + x)].join('\n'),
  };
}

/** Every result has every field of docs/ENGINE_API.md, whatever happened. */
function normalise(result, job) {
  const inputs = job.request.inputs;
  const kind = result.kind || Object.fromEntries(job.request.cells.map(c => [c.id, undefined]).filter(() => false));
  const out = {
    outcome: result.outcome,
    ran: result.ran ?? (result.outcome === 'ok' || result.outcome === 'exception' || result.outcome === 'stopped' || result.outcome === 'timeout'),
    kind,
    files: result.files || {},
    diagnostics: result.diagnostics || [],
    exception: result.exception || null,
    exitCode: result.exitCode ?? null,
    values: inputs ? (result.values || inputs.map(() => ({ ok: false, kind: 'not-run', error: null }))) : undefined,
    replaced: result.replaced || [],
    timings: { compileMs: result.timings?.compileMs ?? null, runMs: result.timings?.runMs ?? (job.usedMs ? Math.round(job.usedMs) : null),
      wallMs: Math.round(performance.now() - job.t0), ...(result.timings || {}) },
  };
  if (result.detail) out.detail = result.detail;
  if (out.values === undefined) delete out.values;
  return out;
}
