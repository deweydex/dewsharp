// help.html and teachers.html: the masthead, the foot, and highlighted code to read. No C# runs here.
import { renderChrome, renderFoot } from './common.js';
import { enhance } from './markdown.js';

const page = location.pathname.split('/').pop().replace('.html', '');
renderChrome({ current: page === 'help' ? 'help' : page === 'teachers' ? 'teachers' : null });
renderFoot();
await enhance(document.getElementById('main'));
document.documentElement.dataset.page = 'ready';
