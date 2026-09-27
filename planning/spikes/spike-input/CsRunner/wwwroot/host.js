// Main-thread side: owns one worker running .NET + Roslyn.
//
// Interactive input: when the C# program calls Console.ReadLine, the worker posts 'stdin-request' and blocks.
// The page answers with sendLine(text) / sendEof(). Two transports:
//   'atomics'  - a SharedArrayBuffer the worker Atomics.wait()s on. Needs crossOriginIsolated (COOP+COEP
//                headers, or a service worker such as coi-serviceworker that adds them).
//   'sync-xhr' - the worker makes a synchronous XHR that stdin-sw.js holds open until the page POSTs the
//                answer. Needs only a service worker controlling the page; no isolation.
// Stop: with 'atomics' a flag in the shared buffer makes the next Console write/read throw inside the
// program (no reboot). Otherwise, or if the program is not printing, the worker is terminated and rebooted.
const BUF_BYTES = 64 * 1024;

export class CSharpRunner {
  constructor(workerUrl = './worker.js', { transport = 'auto', stdinUrl = null } = {}) {
    this.workerUrl = workerUrl; this.nextId = 1; this.pending = new Map();
    this.wantTransport = transport; this.stdinUrl = stdinUrl;
    this.token = Math.random().toString(36).slice(2);
  }

  pickTransport() {
    if ((this.wantTransport === 'auto' || this.wantTransport === 'atomics') && globalThis.crossOriginIsolated) return 'atomics';
    if ((this.wantTransport === 'auto' || this.wantTransport === 'sync-xhr') && this.stdinUrl && navigator.serviceWorker?.controller) return 'sync-xhr';
    return 'none';
  }

  start() {
    const created = performance.now();
    this.transport = this.pickTransport();
    this.worker = new Worker(this.workerUrl, { type: 'module' });
    this.ready = new Promise((resolve, reject) => {
      this.worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'ready') {
          if (this.transport === 'atomics') {
            this.sab = new SharedArrayBuffer(12 + BUF_BYTES);
            this.ctrl = new Int32Array(this.sab, 0, 3);
            this.worker.postMessage({ type: 'stdin-buffer', buffer: this.sab });
          } else if (this.transport === 'sync-xhr') {
            this.worker.postMessage({ type: 'stdin-xhr', url: this.stdinUrl, token: this.token });
          }
          resolve({ bootMs: m.bootMs, readyMs: performance.now() - created, transport: this.transport,
            workerIsolated: m.crossOriginIsolated });
        } else if (m.type === 'boot-error') reject(new Error(m.error));
        else this.onWorkerMessage(m);
      };
      this.worker.onerror = (e) => reject(new Error('worker error: ' + (e.message || e)));
    });
    return this.ready;
  }

  onWorkerMessage(m) {
    const p = this.pending.get(m.id);
    if (!p) return;
    if (m.type === 'out') { p.opts.onOutput?.(m.text, m.err); return; }
    if (m.type === 'stdin-request') {
      p.waiting = m; p.pauseTimer();
      p.opts.onInputRequest?.(m);
      return;
    }
    this.pending.delete(m.id); p.settle();
    m.type === 'error' ? p.reject(new Error(m.error)) : p.resolve(m.result);
  }

  current() { for (const p of this.pending.values()) if (p.kind === 'run') return p; return null; }
  get waitingForInput() { return !!this.current()?.waiting; }

  /** Send one line (without the newline) to a program blocked in Console.ReadLine. */
  sendLine(text) { return this.answer({ line: String(text) }); }
  /** End of input: ReadLine returns null. */
  sendEof() { return this.answer({ eof: true }); }

  answer(a) {
    const p = this.current();
    if (!p || !p.waiting) return false;
    const req = p.waiting; p.waiting = null; p.resumeTimer();
    if (req.transport === 'atomics') {
      if (a.eof || a.stop) Atomics.store(this.ctrl, 0, a.stop ? 3 : 2);
      else {
        const bytes = new TextEncoder().encode(a.line).slice(0, BUF_BYTES);
        new Uint8Array(this.sab, 12).set(bytes);
        Atomics.store(this.ctrl, 1, bytes.length);
        Atomics.store(this.ctrl, 0, 1);
      }
      Atomics.notify(this.ctrl, 0);
    } else if (req.transport === 'sync-xhr') {
      fetch(this.stdinUrl + '/answer', { method: 'POST', body: JSON.stringify({ key: req.key, ...a }) });
    }
    return true;
  }

  call(msg, opts = {}, kind = 'call') {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      let timer = null, remaining = opts.timeoutMs || 0, startedAt = 0;
      const arm = () => { if (remaining > 0) { startedAt = performance.now(); timer = setTimeout(onTimeout, remaining); } };
      const onTimeout = () => { this.pending.delete(id); resolve({ ok: false, phase: 'timeout', timedOut: true }); };
      const entry = { kind, opts, resolve, reject, waiting: null,
        settle: () => clearTimeout(timer),
        // The timeout counts the program's own running time, not the time the learner spends typing.
        pauseTimer: () => { if (timer) { clearTimeout(timer); timer = null; remaining -= performance.now() - startedAt; } },
        resumeTimer: () => arm() };
      this.pending.set(id, entry);
      arm();
      if (this.ctrl) Atomics.store(this.ctrl, 2, 0);   // clear a Stop left over from the previous run
      this.worker.postMessage({ ...msg, id });
    });
  }

  run(files, stdin = '', opts = {}) {
    return this.call({ type: 'run', names: files.map(f => f.name), texts: files.map(f => f.text), stdin,
      implicitUsings: opts.implicitUsings ?? true, collectible: !!opts.collectible, emitPdb: opts.emitPdb ?? true,
      interactive: !!opts.interactive }, opts, 'run');
  }

  probe() { return this.call({ type: 'probe' }); }
  memory(collect = false) { return this.call({ type: 'memory', collect }); }

  /** Stop the running program. Tries the cooperative route first (Atomics only), then terminates the worker.
   *  Resolves to {how:'cooperative'|'terminated', ms}. */
  async stop({ graceMs = 750 } = {}) {
    const t = performance.now();
    const p = this.current();
    if (!p) return { how: 'idle', ms: 0 };
    if (this.transport === 'atomics') {
      Atomics.store(this.ctrl, 2, 1);
      if (p.waiting) this.answer({ stop: true });
      const done = new Promise(r => { const o = p.resolve; p.resolve = (v) => { o(v); r(true); }; });
      const ok = await Promise.race([done, new Promise(r => setTimeout(() => r(false), graceMs))]);
      if (ok) return { how: 'cooperative', ms: performance.now() - t };
    } else if (this.transport === 'sync-xhr' && p.waiting) {
      const done = new Promise(r => { const o = p.resolve; p.resolve = (v) => { o(v); r(true); }; });
      this.answer({ stop: true });
      const ok = await Promise.race([done, new Promise(r => setTimeout(() => r(false), graceMs))]);
      if (ok) return { how: 'cooperative', ms: performance.now() - t };
    }
    const ms = await this.restart();
    return { how: 'terminated', ms: performance.now() - t, restartMs: ms };
  }

  /** Kill the worker and boot a fresh one. Returns ms from terminate() to 'ready'. */
  async restart() {
    const t = performance.now();
    this.worker.terminate();
    for (const p of this.pending.values()) { p.settle(); p.resolve({ ok: false, phase: 'terminated' }); }
    this.pending.clear();
    this.ctrl = null; this.sab = null;
    await this.start();
    return performance.now() - t;
  }
}
