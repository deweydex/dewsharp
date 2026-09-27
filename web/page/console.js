// The console under a cell: what the program printed, drawn at most once per animation frame (the engine
// sends output every 25 ms at most; docs/ENGINE_API.md), with the colours and Clear of the Console shim.
import { el } from './common.js';

/** Windows Terminal's "Campbell" colours: used when a program sets a background colour, as a real console would. */
const TERMINAL = {
  Black: '#0c0c0c', DarkBlue: '#0037da', DarkGreen: '#13a10e', DarkCyan: '#3a96dd', DarkRed: '#c50f1f',
  DarkMagenta: '#881798', DarkYellow: '#c19c00', Gray: '#cccccc', DarkGray: '#767676', Blue: '#3b78ff',
  Green: '#16c60c', Cyan: '#61d6d6', Red: '#e74856', Magenta: '#b4009e', Yellow: '#f9f1a5', White: '#f2f2f2',
};
const LIGHT_BACKGROUNDS = new Set(['Gray', 'Green', 'Cyan', 'Yellow', 'White', 'DarkYellow']);

/** Past this many characters on screen, the oldest are dropped from the page (not from the program). */
const SCREEN_CAP = 400000;

export class ConsoleView {
  constructor(pre) {
    this.pre = pre;
    this.queue = [];
    this.frame = 0;
    this.style = { fg: null, bg: null };
    this.text = '';                     // everything printed, as plain text (for saving and for guesses)
  }

  clear() {
    this.queue = [];
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.pre.textContent = '';
    this.style = { fg: null, bg: null };
    this.text = '';
  }

  /** A chunk from runner.run()'s onOutput. */
  push(chunk) {
    if (chunk.kind === 'clear') this.text += '\f';
    else if (chunk.kind !== 'style') this.text += chunk.text;
    if (this.text.length > 2 * SCREEN_CAP) this.text = this.text.slice(-SCREEN_CAP);
    this.queue.push(chunk);
    if (!this.frame) this.frame = requestAnimationFrame(() => this.flush());
  }

  /** Draws everything waiting now (also called when the run ends, so nothing waits for a frame). */
  flush() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (!this.queue.length) return;
    const nearBottom = this.pre.scrollHeight - this.pre.scrollTop - this.pre.clientHeight < 40;
    let fragment = document.createDocumentFragment();
    let span = null;
    const pending = this.queue;
    this.queue = [];
    for (const chunk of pending) {
      if (chunk.kind === 'clear') {
        this.pre.textContent = '';
        fragment = document.createDocumentFragment();
        span = null;
        continue;
      }
      if (chunk.kind === 'style') {
        this.style = { fg: chunk.style?.fg ?? null, bg: chunk.style?.bg ?? null };
        span = null;
        continue;
      }
      const kind = chunk.kind === 'err' ? 'ds-err' : chunk.kind === 'echo' ? 'ds-echo' : 'ds-out';
      const key = kind + '|' + this.style.fg + '|' + this.style.bg;
      if (!span || span.dataset.key !== key) {
        span = el('span', { class: kind, dataset: { key } });
        this.paint(span);
        fragment.append(span);
      }
      span.append(chunk.text);
    }
    this.pre.append(fragment);
    // Keep the page light: very long output keeps only its end on screen.
    while (this.pre.textContent.length > SCREEN_CAP && this.pre.firstChild) this.pre.firstChild.remove();
    if (nearBottom) this.pre.scrollTop = this.pre.scrollHeight;
  }

  paint(span) {
    const { fg, bg } = this.style;
    if (bg && TERMINAL[bg]) {
      span.classList.add('ds-con-bg');
      span.style.backgroundColor = TERMINAL[bg];
      span.style.color = fg && TERMINAL[fg] ? TERMINAL[fg] : (LIGHT_BACKGROUNDS.has(bg) ? '#0c0c0c' : '#f2f2f2');
    } else if (fg && TERMINAL[fg]) {
      span.style.color = `var(--ds-con-${fg})`;
    }
  }

  /** A line from the page itself, not the program (an exception, a note). */
  appendNode(node) {
    this.flush();
    this.pre.append(node);
  }
}
