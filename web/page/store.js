// Saved work, in IndexedDB on this device (database "dewsharp"). Nothing is sent anywhere.
//
//   work        one record per cell a learner has touched, keyed "<page id>/<cell id>" (CLAUDE.md, "Three
//               traps": renaming either id loses the record):
//               { key, page, cell, code, output, predict, hints, version, saved_at }
//   notebooks   one record per notebook: { id, title, cells: [{ id, type: 'code'|'text', code }], created_at, saved_at }
//
// Export and import move all of it through one JSON file, because lab PCs may clear browser data at logout.
// docs/ARCHITECTURE.md, "Saved work", has the details.

const DB_NAME = 'dewsharp';
const DB_VERSION = 1;
export const OUTPUT_CAP = 20000;          // characters of a cell's output that are saved with it
export const FILE_FORMAT = 'dewsharp-work';

let dbPromise = null;
let memory = null;                         // used when IndexedDB is not available (a private window, say)

function open() {
  dbPromise ||= new Promise((resolve) => {
    let request;
    try { request = indexedDB.open(DB_NAME, DB_VERSION); } catch { resolve(null); return; }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('work')) db.createObjectStore('work', { keyPath: 'key' }).createIndex('page', 'page');
      if (!db.objectStoreNames.contains('notebooks')) db.createObjectStore('notebooks', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
  return dbPromise;
}

/** Whether work is kept after the page closes (false: IndexedDB is blocked, so only until then). */
export async function persistent() {
  return !!(await open());
}

function mem() {
  memory ||= { work: new Map(), notebooks: new Map() };
  return memory;
}

async function tx(store, mode, fn) {
  const db = await open();
  if (!db) return fn(null);
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const s = t.objectStore(store);
    let result;
    Promise.resolve(fn(s)).then(r => { result = r; });
    t.oncomplete = () => resolve(result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

const req = (r) => new Promise((resolve, reject) => { r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });

/** Every saved record of one page: Map cellId -> record. */
export async function pageWork(page) {
  const db = await open();
  let list;
  if (!db) list = [...mem().work.values()].filter(r => r.page === page);
  else list = await req(db.transaction('work').objectStore('work').index('page').getAll(page));
  return new Map(list.map(r => [r.cell, r]));
}

export async function allWork() {
  const db = await open();
  if (!db) return [...mem().work.values()];
  return req(db.transaction('work').objectStore('work').getAll());
}

export async function putWork(record) {
  const r = { ...record, key: `${record.page}/${record.cell}`, saved_at: record.saved_at || new Date().toISOString() };
  if (typeof r.output === 'string' && r.output.length > OUTPUT_CAP) r.output = r.output.slice(-OUTPUT_CAP);
  const db = await open();
  if (!db) { mem().work.set(r.key, r); return r; }
  await tx('work', 'readwrite', (s) => { s.put(r); });
  return r;
}

export async function deleteWork(page, cell) {
  const key = `${page}/${cell}`;
  const db = await open();
  if (!db) { mem().work.delete(key); return; }
  await tx('work', 'readwrite', (s) => { s.delete(key); });
}

export async function listNotebooks() {
  const db = await open();
  const list = db ? await req(db.transaction('notebooks').objectStore('notebooks').getAll()) : [...mem().notebooks.values()];
  return list.sort((a, b) => String(b.saved_at).localeCompare(String(a.saved_at)));
}

export async function getNotebook(id) {
  const db = await open();
  if (!db) return mem().notebooks.get(id) ?? null;
  return (await req(db.transaction('notebooks').objectStore('notebooks').get(id))) ?? null;
}

export async function putNotebook(nb) {
  const r = { ...nb, saved_at: new Date().toISOString() };
  const db = await open();
  if (!db) { mem().notebooks.set(r.id, r); return r; }
  await tx('notebooks', 'readwrite', (s) => { s.put(r); });
  return r;
}

export async function deleteNotebook(id) {
  const db = await open();
  if (!db) { mem().notebooks.delete(id); return; }
  await tx('notebooks', 'readwrite', (s) => { s.delete(id); });
}

export function newId(prefix = 'nb') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Everything saved on this device, as one object for a file. */
export async function exportAll() {
  return { format: FILE_FORMAT, version: 1, exported_at: new Date().toISOString(), work: await allWork(), notebooks: await listNotebooks() };
}

/**
 * Brings in a file made by exportAll(). A record replaces the one here only if it was saved later, so
 * importing an old file never loses newer work. Returns { work, notebooks, kept } counts, or throws an Error
 * whose message a learner can read.
 */
export async function importAll(text) {
  let data;
  try { data = typeof text === 'string' ? JSON.parse(text) : text; } catch { throw new Error('That file is not a dewsharp work file. It should end in .json and come from Export my work.'); }
  if (!data || data.format !== FILE_FORMAT || !Array.isArray(data.work)) throw new Error('That file is not a dewsharp work file. It should come from Export my work.');
  let work = 0, notebooks = 0, kept = 0;
  const here = new Map((await allWork()).map(r => [r.key, r]));
  for (const r of data.work) {
    if (!r || typeof r.page !== 'string' || typeof r.cell !== 'string') continue;
    const mine = here.get(`${r.page}/${r.cell}`);
    if (mine && String(mine.saved_at) > String(r.saved_at || '')) { kept++; continue; }
    await putWork(r);
    work++;
  }
  const nbs = new Map((await listNotebooks()).map(n => [n.id, n]));
  for (const n of Array.isArray(data.notebooks) ? data.notebooks : []) {
    if (!n || typeof n.id !== 'string' || !Array.isArray(n.cells)) continue;
    const mine = nbs.get(n.id);
    if (mine && String(mine.saved_at) > String(n.saved_at || '')) { kept++; continue; }
    const db = await open();
    if (!db) mem().notebooks.set(n.id, n);
    else await tx('notebooks', 'readwrite', (s) => { s.put(n); });
    notebooks++;
  }
  return { work, notebooks, kept };
}
