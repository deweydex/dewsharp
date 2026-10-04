// The draft: the Markdown of the page being edited, as one string (docs/ARCHITECTURE.md, "Editing in
// place"). Every way of editing, the text box and each block on the page, changes this string and nothing
// else, so what is proposed is exactly what the author sees in the text box. It knows nothing about lessons
// or pages. Lines are counted from 1, and a range of lines includes both ends, as the parser's are.

export class Draft {
  /** @param {string} text  @param {string} [base]  the text the page had when editing began */
  constructor(text, base = text) {
    this.base = base;
    this._text = text;
    this._past = [];       // { text, key, at }: what the text was before an edit
    this._future = [];
    this._listeners = new Set();
  }

  get text() { return this._text; }
  get dirty() { return this._text !== this.base; }
  get canUndo() { return this._past.length > 0; }
  get canRedo() { return this._future.length > 0; }
  lines() { return this._text.split('\n'); }

  /** The text of lines `first` to `last`. */
  slice(first, last) { return this.lines().slice(first - 1, last).join('\n'); }

  /**
   * Replaces lines `first` to `last` with `replacement` (an empty string removes them). Returns how many
   * lines the text gained (negative when it lost some). Edits with the same `key` made within `within`
   * milliseconds are one step of undo, so that typing in a cell is not a hundred steps.
   */
  splice(first, last, replacement, { key = null, within = 1500, now = Date.now() } = {}) {
    const lines = this.lines();
    const inserted = replacement === '' ? [] : replacement.split('\n');
    lines.splice(first - 1, last - first + 1, ...inserted);
    const delta = inserted.length - (last - first + 1);
    this._apply(lines.join('\n'), { key, within, now, change: { first, last, delta } });
    return delta;
  }

  /** Replaces the whole text, as the text box does. */
  set(text, { key = null, within = 1500, now = Date.now() } = {}) {
    this._apply(text, { key, within, now, change: { first: 1, last: this.lines().length, delta: text.split('\n').length - this.lines().length } });
  }

  _apply(text, { key, within, now, change }) {
    if (text === this._text) return;
    const top = this._past[this._past.length - 1];
    if (!(key && top && top.key === key && now - top.at <= within)) this._past.push({ text: this._text, key, at: now });
    else top.at = now;
    this._future = [];
    this._text = text;
    this._emit({ reason: 'edit', ...change });
  }

  undo() {
    const step = this._past.pop();
    if (!step) return false;
    this._future.push({ text: this._text });
    this._text = step.text;
    this._emit({ reason: 'undo' });
    return true;
  }

  redo() {
    const step = this._future.pop();
    if (!step) return false;
    this._past.push({ text: this._text, key: null, at: 0 });
    this._text = step.text;
    this._emit({ reason: 'redo' });
    return true;
  }

  /** Calls `fn(change)` after every change; returns a function that stops the calls. */
  onChange(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _emit(change) { for (const fn of this._listeners) fn(change); }
}

// ---- keeping a draft in this browser, so that closing the page does not lose it

const KEY = (page) => `dewsharp:draft:${page}`;

/** Keeps the draft of `page`. `base` is the text of the page the draft was made from. */
export function saveDraft(page, { text, base }, storage = globalThis.localStorage) {
  try { storage.setItem(KEY(page), JSON.stringify({ text, base, savedAt: new Date().toISOString() })); return true; } catch { return false; }
}

/** The draft kept for `page`, or null. */
export function loadDraft(page, storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(KEY(page)) || 'null');
    return saved && typeof saved.text === 'string' && typeof saved.base === 'string' ? saved : null;
  } catch { return null; }
}

export function clearDraft(page, storage = globalThis.localStorage) {
  try { storage.removeItem(KEY(page)); } catch { /* nothing was kept */ }
}
