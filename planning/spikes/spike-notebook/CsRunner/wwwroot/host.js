// Main-thread side: owns one worker, restarts it on timeout (the only way to stop `while(true){}`).
export class CSharpRunner {
  constructor(workerUrl = './worker.js') { this.workerUrl = workerUrl; this.nextId = 1; this.pending = new Map(); }

  start() {
    const created = performance.now();
    this.worker = new Worker(this.workerUrl, { type: 'module' });
    this.ready = new Promise((resolve, reject) => {
      this.worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'ready') resolve({ bootMs: m.bootMs, readyMs: performance.now() - created });
        else if (m.type === 'boot-error') reject(new Error(m.error));
        else { const p = this.pending.get(m.id); if (p) { this.pending.delete(m.id); m.type === 'error' ? p.reject(new Error(m.error)) : p.resolve(m.result); } }
      };
      this.worker.onerror = (e) => reject(new Error('worker error: ' + (e.message || e)));
    });
    return this.ready;
  }

  call(msg, timeoutMs = 0) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      let timer;
      this.pending.set(id, { resolve: (v) => { clearTimeout(timer); resolve(v); }, reject: (e) => { clearTimeout(timer); reject(e); } });
      if (timeoutMs > 0) timer = setTimeout(() => {
        this.pending.delete(id);
        resolve({ ok: false, phase: 'timeout', timedOut: true });
      }, timeoutMs);
      this.worker.postMessage({ ...msg, id });
    });
  }

  run(files, stdin = '', opts = {}) {
    return this.call({ type: 'run', names: files.map(f => f.name), texts: files.map(f => f.text), stdin,
      implicitUsings: opts.implicitUsings ?? true, collectible: !!opts.collectible, emitPdb: opts.emitPdb ?? true }, opts.timeoutMs ?? 0);
  }

  invoke(method, args = [], timeoutMs = 0) { return this.call({ type: 'call', method, args }, timeoutMs); }

  memory(collect = false) { return this.call({ type: 'memory', collect }); }

  /** Kill the worker and boot a fresh one. Returns ms from terminate() to 'ready'. */
  async restart() {
    const t = performance.now();
    this.worker.terminate();
    for (const p of this.pending.values()) p.reject(new Error('terminated'));
    this.pending.clear();
    await this.start();
    return performance.now() - t;
  }
}
