// One runner per page (docs/ENGINE_API.md), and the status line that says how C# is getting on while it
// downloads and starts. A page with no C# cells never calls this, so it downloads nothing.
import { createRunner } from '../engine/runner.js';
import { el } from './common.js';

const MB = (bytes) => (bytes / 1e6).toFixed(1).replace(/\.0$/, '') + ' MB';

/** Creates the page's runner and ties the status line (`statusEl`) to it. */
export function startEngine(statusEl) {
  const runner = createRunner({ frameworkUrl: new URL('_framework/', location.href) });
  let hideTimer = null;
  let everReady = false;
  const text = el('span', { class: 'dl-status-text' });
  const dots = el('span', { class: 'dl-boot-dots', 'aria-hidden': 'true' }, el('span'), el('span'), el('span'));
  statusEl.replaceChildren(text, dots);
  statusEl.setAttribute('role', 'status');
  statusEl.setAttribute('aria-live', 'polite');

  const show = (message, { busy = true } = {}) => {
    clearTimeout(hideTimer);
    statusEl.hidden = false;
    statusEl.classList.remove('dl-status-error');
    text.textContent = message;
    dots.hidden = !busy;
  };

  runner.onStatus((status, detail) => {
    document.documentElement.dataset.engine = status;
    if (status === 'loading') {
      if (detail?.total) {
        const bytes = detail.bytes ? `, ${MB(detail.bytes)}` : '';
        show(`Downloading C# (about 15 MB the first time, then this device keeps it): ${detail.loaded} of ${detail.total} files${bytes}.`);
      } else show('Starting C#…');
    } else if (status === 'warming') {
      show('Starting the compiler. You can read on while it starts.');
    } else if (status === 'restarting') {
      show('Starting C# again, after a program that had to be stopped. The next Run takes a few seconds.');
    } else if (status === 'ready') {
      if (!everReady) {
        everReady = true;
        show('C# is ready.', { busy: false });
        hideTimer = setTimeout(() => { statusEl.hidden = true; }, 2500);
      } else if (!statusEl.hidden && !statusEl.classList.contains('dl-status-error')) {
        hideTimer = setTimeout(() => { statusEl.hidden = true; }, 800);
      }
    } else if (status === 'unavailable') {
      clearTimeout(hideTimer);
      statusEl.hidden = false;
      statusEl.classList.add('dl-status-error');
      statusEl.replaceChildren(
        el('p', { style: 'margin:0' }, detail?.reason || 'C# could not start on this page.'),
        el('p', { style: 'margin:0.3rem 0 0' }, 'You can still read the page. ', el('a', { href: 'check.html' }, 'Check this device'), ' to see which part does not work.'),
        el('details', {}, el('summary', {}, 'Details for a teacher or for support'), el('pre', {}, detail?.technical || '')));
    }
  });
  return runner;
}
