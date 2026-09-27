// What every dewsharp page shares: a tiny DOM helper, the masthead with its links and the reader's
// settings, the lesson index, and file downloads. docs/ARCHITECTURE.md, "The page", lists the files.

/** el('p', { class: 'x', onclick }, 'text', child) -> an element. Attributes that are null are left out. */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value == null || value === false) continue;
    if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
    else if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

// ---- the reader's settings: the same localStorage key as dewlab's texture panel, so each site shows the
// other's choices. The snippet in each page's <head> applies them before the first paint.

const TEXTURE_KEY = 'dewlab:texture';

export function readTexture() {
  try { return JSON.parse(localStorage.getItem(TEXTURE_KEY) || '{}') || {}; } catch { return {}; }
}

function writeTexture(changes) {
  const t = { ...readTexture(), ...changes };
  try { localStorage.setItem(TEXTURE_KEY, JSON.stringify(t)); } catch { /* storage blocked: still applies now */ }
  applyTexture(t);
}

export function applyTexture(t) {
  const r = document.documentElement;
  if (t.theme && t.theme !== 'system') r.setAttribute('data-theme', t.theme); else r.removeAttribute('data-theme');
  if (t.font && t.font !== 'serif') r.setAttribute('data-font', t.font); else r.removeAttribute('data-font');
  if (t.size) r.style.setProperty('--dl-font-size', t.size + 'px'); else r.style.removeProperty('--dl-font-size');
  if (t.motion && t.motion !== 'normal') r.setAttribute('data-motion', t.motion); else r.removeAttribute('data-motion');
}

function settingsPanel() {
  const t = readTexture();
  const group = (legend, name, options, current) => el('fieldset', {},
    el('legend', {}, legend),
    options.map(([value, label]) => el('label', {},
      el('input', { type: 'radio', name: 'ds-' + name, value, checked: String(current) === String(value),
        onchange: () => writeTexture({ [name]: name === 'size' ? Number(value) : value }) }),
      label)));
  return el('section', { class: 'ds-settings', id: 'ds-settings', 'aria-label': 'Settings', hidden: true },
    group('Colours', 'theme', [['system', 'Like this device'], ['light', 'Light'], ['dark', 'Dark']], t.theme || 'system'),
    group('Font', 'font', [['serif', 'Serif'], ['sans', 'Sans'], ['lexend', 'Lexend'], ['opendyslexic', 'OpenDyslexic']], t.font || 'serif'),
    group('Text size', 'size', [[16, 'Small'], [18, 'Medium'], [20, 'Large'], [23, 'Larger']], t.size || 18),
    group('Movement', 'motion', [['normal', 'Normal'], ['reduced', 'Less']], t.motion || 'normal'),
    el('p', {}, 'These settings stay on this device. dewlab uses the same ones.'));
}

/**
 * The masthead: the wordmark, where the reader is, and the links every page has.
 * crumbs: [{ text, href? }]. current: 'home' | 'notebook' | 'help' | 'teachers' | null.
 */
export function renderChrome({ crumbs = [], current = null } = {}) {
  const chrome = document.getElementById('chrome');
  if (!chrome) return;
  const link = (key, href, text) => el('a', { href, 'aria-current': current === key ? 'page' : null }, text);
  const panel = settingsPanel();
  const toggle = el('button', { type: 'button', 'aria-expanded': 'false', 'aria-controls': 'ds-settings',
    onclick: () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('input:checked')?.focus();
    } }, 'Settings');
  const crumbNodes = [];
  crumbs.forEach((c, i) => {
    if (i) crumbNodes.push(' › ');
    crumbNodes.push(c.href ? el('a', { href: c.href }, c.text) : el('span', {}, c.text));
  });
  chrome.replaceChildren(
    el('a', { class: 'ds-skip', href: '#main' }, 'Skip to the page'),
    el('div', { class: 'dl-masthead' },
      el('a', { class: 'dl-wordmark', href: 'index.html' }, 'dewsharp'),
      el('nav', { class: 'dl-crumbs', 'aria-label': 'Where you are' }, crumbNodes),
      el('nav', { class: 'ds-nav', 'aria-label': 'Site' },
        link('notebook', 'notebook.html', 'My notebook'),
        link('help', 'help.html', 'Help'),
        toggle)),
    panel);
}

/** A line at the foot of the page. */
export function renderFoot() {
  const foot = document.getElementById('foot');
  if (!foot) return;
  foot.replaceChildren(
    el('p', {}, 'dewsharp runs C# in your browser, on this device. Nothing you write is sent anywhere. ',
      el('a', { href: 'teachers.html' }, 'For teachers'), ' · ',
      el('a', { href: 'check.html' }, 'Check this device'), ' · ',
      el('a', { href: 'https://deweydex.github.io/dewlab/' }, 'dewlab, for Python')));
}

// ---- screen readers

let announcer = null;
/** Says `text` through a polite live region, for things that change away from the focus. */
export function announce(text) {
  if (!announcer) {
    announcer = el('div', { class: 'dl-sr-only', role: 'status', 'aria-live': 'polite' });
    document.body.append(announcer);
  }
  announcer.textContent = '';
  setTimeout(() => { announcer.textContent = text; }, 30);
}

// ---- the lesson index (docs/PARSER.md, "lessons/index.json")

let indexPromise = null;
export function loadIndex() {
  indexPromise ||= fetch('lessons/index.json', { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : { courses: [], pages: {} }))
    .catch(() => ({ courses: [], pages: {} }));
  return indexPromise;
}

/** A course's lessons in reading order (contents only, not explore). */
export function readingOrder(course) {
  return (course?.contents || []).flatMap(s => s.lessons);
}

/**
 * Where a page sits: the course it is read in (`preferred` if that course lists it), and the pages before
 * and after it. A practice page sits after its lesson.
 */
export function placeOf(index, pageId, preferred) {
  const page = index.pages[pageId];
  const lessonId = page?.lesson ?? pageId.replace(/-practice$/, '');
  const lessonPage = index.pages[lessonId];
  const listing = (c) => readingOrder(c).includes(lessonId) || (c.explore || []).includes(lessonId);
  const course = index.courses.find(c => c.id === preferred && listing(c)) || index.courses.find(listing) || null;
  if (!course) return { course: null, prev: null, next: null, series: null };
  const order = readingOrder(course).filter(id => index.pages[id]);
  const inExplore = !readingOrder(course).includes(lessonId);
  const series = course.contents.find(s => s.lessons.includes(lessonId))?.title ?? (inExplore ? 'Explore' : null);
  // The sequence a reader walks: each lesson, then its practice page.
  const walk = [];
  for (const id of order) { walk.push(id); if (index.pages[id]?.practicePage) walk.push(index.pages[id].practicePage); }
  const k = walk.indexOf(pageId);
  if (k < 0) {
    // In explore, or not yet in the walk: back to the course, and on to this lesson's practice page.
    const next = !page?.practice && lessonPage?.practicePage ? lessonPage.practicePage : null;
    return { course, series, prev: page?.practice ? lessonId : null, next };
  }
  return { course, series, prev: walk[k - 1] ?? null, next: walk[k + 1] ?? null };
}

// ---- files

/** Offers `data` (a Blob, or a string) to the reader as a file called `name`. */
export function download(name, data, type = 'application/json') {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: name, hidden: true });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

/** Asks the reader for a file and resolves to its text (or null if they cancel). */
export function pickFile(accept = '.json,application/json') {
  return new Promise((resolve) => {
    const input = el('input', { type: 'file', accept, hidden: true });
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      input.remove();
      resolve(file ? await file.text() : null);
    });
    document.body.append(input);
    input.click();
  });
}

export const today = () => new Date().toISOString().slice(0, 10);

/** "3 cells", "1 cell". */
export const count = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;
