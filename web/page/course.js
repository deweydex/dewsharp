// A course page, course.html?c=<course id>: its series and lessons in reading order, each lesson's practice
// page, and the Explore list (docs/LESSON_FORMAT.md, "Courses").
import { el, renderChrome, renderFoot, loadIndex } from './common.js';
import { allWork } from './store.js';

const main = document.getElementById('main');
const id = new URLSearchParams(location.search).get('c') || '';
renderFoot();
const index = await loadIndex();
const course = index.courses.find(c => c.id === id);

if (!course) {
  renderChrome();
  document.title = 'No such course — dewsharp';
  main.replaceChildren(el('h1', {}, 'There is no course here'),
    el('p', {}, `No course has the address "${id}".`), el('p', {}, el('a', { href: 'index.html' }, 'Go to the courses')));
} else {
  document.title = `${course.title} — dewsharp`;
  renderChrome({ crumbs: [{ text: course.title }] });
  const worked = new Set((await allWork().catch(() => [])).map(r => r.page));
  const lessonItem = (lessonId) => {
    const page = index.pages[lessonId];
    if (!page) return el('li', { class: 'ds-lesson-later' }, readable(lessonId), el('small', {}, 'not ready yet'));
    const practice = page.practicePage;
    return el('li', {},
      el('a', { href: `lesson.html?id=${lessonId}&c=${course.id}` }, page.title || lessonId),
      worked.has(lessonId) ? el('span', { class: 'ds-saved-dot' }, '· your work is saved') : null,
      practice ? el('a', { class: 'ds-lesson-practice', href: `lesson.html?id=${practice}&c=${course.id}` }, 'Practice') : null);
  };
  const paragraphs = String(course.description || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  main.replaceChildren(...[
    el('p', { class: 'ds-card-code' }, course.code),
    el('h1', {}, course.title),
    ...paragraphs.map(p => el('p', {}, p)),
    ...course.contents.map(s => el('section', { class: 'ds-series' },
      el('h2', {}, s.title),
      el('ol', { class: 'ds-lessons' }, s.lessons.map(lessonItem)))),
    course.explore.length ? el('section', { class: 'ds-series' },
      el('h2', {}, 'Explore'),
      el('p', {}, 'Extra lessons. They are worth doing, and the module does not need them.'),
      el('ol', { class: 'ds-lessons' }, course.explore.map(lessonItem))) : null].filter(Boolean));
}
document.documentElement.dataset.page = 'ready';

/** "objects-and-classes" -> "Objects and classes", for a lesson that is not written yet. */
function readable(lessonId) {
  const words = lessonId.split('-').join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
