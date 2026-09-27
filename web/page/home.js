// The home page: the two courses as cards, the notebook, help, and where dewsharp comes from.
import { el, renderChrome, renderFoot, loadIndex } from './common.js';

const ORDER = ['pdp', 'foop'];
const main = document.getElementById('main');

renderChrome({ current: 'home' });
renderFoot();
const index = await loadIndex();
const courses = [...index.courses].sort((a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99));

main.replaceChildren(
  el('h1', {}, 'C# in your browser'),
  el('p', { class: 'ds-lede' }, 'Lessons where you read a little, then run C# and change it, right on the page. The code runs in your browser, on this device, so there is nothing to install.'),
  el('h2', {}, 'Courses'),
  courses.length
    ? el('div', { class: 'ds-cards' }, courses.map(c => el('a', { class: 'ds-card', href: `course.html?c=${c.id}` },
        el('span', { class: 'ds-card-code' }, c.code),
        el('h3', {}, c.title),
        el('p', {}, c.card),
        el('span', { class: 'ds-card-go' }, 'Open the course →'))))
    : el('p', {}, 'There are no courses on this site yet.'),
  el('h2', {}, 'Your own C#'),
  el('div', { class: 'ds-cards' },
    el('a', { class: 'ds-card', href: 'notebook.html' },
      el('h3', {}, 'My notebook'),
      el('p', {}, 'Write and run your own C#, with notes beside it. Keep several notebooks, and download a program as a Visual Studio project.'),
      el('span', { class: 'ds-card-go' }, 'Open my notebook →'))),
  el('ul', { class: 'ds-links' },
    el('li', {}, el('a', { href: 'help.html' }, 'How the pages work')),
    el('li', {}, el('a', { href: 'teachers.html' }, 'For teachers')),
    el('li', {}, el('a', { href: 'check.html' }, 'Check this device'))),
  el('p', { class: 'ds-sibling' }, 'dewsharp is the C# sibling of ', el('a', { href: 'https://deweydex.github.io/dewlab/' }, 'dewlab'), ', which teaches the same way in Python.'));
document.documentElement.dataset.page = 'ready';
