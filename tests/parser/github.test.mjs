// The editing mode's GitHub client (web/page/github.js) against a stand-in for GitHub: the calls it makes,
// in order, with what they carry; the sentences it gives when a call is refused; and the guards that stop
// it overwriting a change it has not seen. Nothing here reaches the network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { githubClient, GithubProblem, toBase64, fromBase64, branchName } from '../../web/page/github.js';

const reply = (status, body = {}, headers = {}) => ({
  ok: status >= 200 && status < 300, status,
  headers: { get: (k) => headers[k.toLowerCase()] ?? null },
  json: async () => body,
});

/** A fetch that answers from `routes` ("METHOD /path" -> reply or function) and records every call. */
function stand(routes) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    const path = url.replace('https://api.github.com', '');
    const key = `${init.method || 'GET'} ${path.split('?')[0]}`;
    calls.push({ key, path, body: init.body ? JSON.parse(init.body) : null, headers: init.headers });
    const answer = routes[key];
    if (!answer) throw new Error(`unexpected call: ${key}`);
    return typeof answer === 'function' ? answer(calls.at(-1)) : answer;
  };
  return { calls, fetchImpl };
}

const PAGE = 'lessons/every-feature/every-feature.md';
const TEXT = '---\ntitle: "Hello"\n---\n\nSpeed: 10 m/s² for €5 — naïve.\n';
const R = '/repos/deweydex/dewsharp';

function happy(extra = {}) {
  return {
    [`GET ${R}/git/ref/heads/main`]: reply(200, { object: { sha: 'basesha' } }),
    [`GET ${R}/contents/${PAGE}`]: reply(200, { sha: 'filesha', content: toBase64(TEXT) }),
    [`POST ${R}/git/refs`]: reply(201),
    [`PUT ${R}/contents/${PAGE}`]: reply(200),
    [`POST ${R}/pulls`]: reply(201, { html_url: 'https://github.com/deweydex/dewsharp/pull/7', number: 7 }),
    ...extra,
  };
}

const fixed = { now: () => new Date(Date.UTC(2026, 9, 3, 14, 25, 30)), random: () => 0.123456 };

test('base64 carries UTF-8 text both ways, including text longer than one chunk', () => {
  assert.equal(fromBase64(toBase64(TEXT)), TEXT);
  const long = 'é€²'.repeat(30000);
  assert.equal(fromBase64(toBase64(long)), long);
  assert.equal(fromBase64(toBase64(TEXT).replace(/(.{20})/g, '$1\n')), TEXT, 'GitHub wraps its base64 in newlines');
});

test('a branch name says what it is for, when, and cannot collide', () => {
  const name = branchName('Every Feature (practice)', new Date(Date.UTC(2026, 9, 3, 14, 25, 30)), () => 0.5);
  assert.match(name, /^edit\/every-feature-practice-20261003-142530-[a-z0-9]{3}$/);
});

test('propose: reads the base, makes a branch, writes the file, opens a draft pull request', async () => {
  const { calls, fetchImpl } = stand(happy());
  const client = githubClient({ token: 'tkn', fetchImpl, ...fixed });
  const out = await client.propose({ path: PAGE, text: TEXT + 'More.\n', baseText: TEXT, name: 'every-feature', summary: 'Say more', description: 'Page: `x`' });
  assert.deepEqual(calls.map(c => c.key), [
    `GET ${R}/git/ref/heads/main`, `GET ${R}/contents/${PAGE}`, `POST ${R}/git/refs`, `PUT ${R}/contents/${PAGE}`, `POST ${R}/pulls`,
  ]);
  const branch = out.branch;
  assert.match(branch, /^edit\/every-feature-20261003-142530-/);
  assert.deepEqual(calls[2].body, { ref: `refs/heads/${branch}`, sha: 'basesha' });
  const put = calls[3].body;
  assert.equal(put.message, 'Say more');
  assert.equal(put.sha, 'filesha');
  assert.equal(put.branch, branch);
  assert.equal(fromBase64(put.content), TEXT + 'More.\n');
  assert.deepEqual(calls[4].body, { title: 'Say more', head: branch, base: 'main', body: 'Page: `x`', draft: true });
  assert.deepEqual(out, { url: 'https://github.com/deweydex/dewsharp/pull/7', number: 7, branch });
  assert.equal(calls[0].headers.Authorization, 'Bearer tkn');
});

test('propose: if the page on GitHub is not the text the author opened, nothing is written', async () => {
  const routes = happy({ [`GET ${R}/contents/${PAGE}`]: reply(200, { sha: 'newer', content: toBase64(TEXT + 'Someone else.\n') }) });
  const { calls, fetchImpl } = stand(routes);
  const client = githubClient({ token: 't', fetchImpl, ...fixed });
  await assert.rejects(client.propose({ path: PAGE, text: 'mine', baseText: TEXT, name: 'x', summary: 's' }),
    (e) => e instanceof GithubProblem && /changed on GitHub since you opened it/.test(e.message));
  assert.ok(!calls.some(c => c.key.startsWith('POST') || c.key.startsWith('PUT')), 'no branch, no file, no pull request');
});

test('propose: if the file cannot be written, the new branch is removed again and the problem is passed on', async () => {
  let branch = null;
  const routes = happy({
    [`PUT ${R}/contents/${PAGE}`]: reply(409, { message: 'sha does not match' }),
    [`POST ${R}/git/refs`]: (call) => { branch = call.body.ref.replace('refs/heads/', ''); return reply(201); },
  });
  const { calls, fetchImpl: inner } = stand(routes);
  const fetchImpl = async (url, init) => {
    if (init?.method !== 'DELETE') return inner(url, init);
    calls.push({ key: `DELETE ${url.replace('https://api.github.com', '')}` });
    return reply(204);
  };
  const client = githubClient({ token: 't', fetchImpl, ...fixed });
  await assert.rejects(client.propose({ path: PAGE, text: 'mine', baseText: TEXT, name: 'x', summary: 's' }), /409/);
  assert.equal(calls.at(-1).key, `DELETE ${R}/git/refs/heads/${branch}`);
  assert.ok(!calls.some(c => c.key === `POST ${R}/pulls`));
});

test('refusals come with a sentence a person can act on', async () => {
  const ask = (status, headers) => {
    const { fetchImpl } = stand({ [`GET /user`]: reply(status, { message: 'Bad thing' }, headers) });
    return githubClient({ token: 't', fetchImpl }).check().then(() => null, e => e);
  };
  assert.match((await ask(401)).message, /did not accept the token/);
  assert.match((await ask(403)).message, /Contents.*Pull requests.*Read and write/);
  assert.match((await ask(403, { 'x-ratelimit-remaining': '0' })).message, /limiting/);
  assert.match((await ask(404)).message, /cannot find deweydex\/dewsharp/);
  assert.match((await ask(500)).message, /refused the request \(500: Bad thing\)/);
  const offline = githubClient({ token: 't', fetchImpl: async () => { throw new TypeError('Failed to fetch'); } });
  await assert.rejects(offline.check(), /Could not reach GitHub/);
});

test('check: a token that can read the repository but not change it is refused, and one that can is accepted', async () => {
  const withPush = (push) => stand({ 'GET /user': reply(200, { login: 'josh' }), [`GET ${R}`]: reply(200, { permissions: { push } }) });
  assert.deepEqual(await githubClient({ token: 't', fetchImpl: withPush(true).fetchImpl }).check(), { login: 'josh' });
  await assert.rejects(githubClient({ token: 't', fetchImpl: withPush(false).fetchImpl }).check(), /read .* but not change it/);
});
