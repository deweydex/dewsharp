// The editing mode's GitHub client (web/page/github.js) against a stand-in for GitHub: the calls it makes,
// in order, with what they carry; the sentences it gives when a call is refused; and the guards that stop
// it overwriting a change it has not seen. Nothing here reaches the network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { githubClient, GithubProblem, toBase64, fromBase64, branchName, gitBlobSha, draftBranch } from '../../web/page/github.js';

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

// ---- the draft kept on a branch of its own

const BASE = 'a'.repeat(40);
const BRANCH = 'draft/josh/every-feature';
const where = `${R}/contents/${PAGE}`;

test('gitBlobSha is the name git gives the text, accents included', async () => {
  assert.equal(await gitBlobSha('hello\n'), 'ce013625030ba8dba906f756967f9e9ca394464a');
  assert.equal(await gitBlobSha('café ✓\n'), '6b2b281e1146f9673f218f9c76042db37be95d03');
  assert.equal(draftBranch('josh', 'every-feature'), BRANCH);
});

test('draft.save the first time: makes the branch from the base, then writes the file with the page it was made from', async () => {
  const { calls, fetchImpl } = stand({
    [`GET ${R}/git/matching-refs/heads/${BRANCH}`]: reply(200, []),
    [`GET ${where}`]: reply(200, { sha: 'mainblob', content: toBase64(TEXT) }),
    [`GET ${R}/git/ref/heads/main`]: reply(200, { object: { sha: 'basesha' } }),
    [`POST ${R}/git/refs`]: reply(201),
    [`PUT ${where}`]: reply(200, { content: { sha: 'draftblob1' } }),
  });
  const client = githubClient({ token: 't', fetchImpl });
  const out = await client.draft.save({ login: 'josh', path: PAGE, name: 'every-feature', text: TEXT + 'More.\n', baseBlob: BASE });
  assert.deepEqual(out, { sha: 'draftblob1' });
  assert.deepEqual(calls.map(c => c.key), [`GET ${R}/git/matching-refs/heads/${BRANCH}`, `GET ${R}/git/ref/heads/main`, `POST ${R}/git/refs`, `GET ${where}`, `PUT ${where}`]);
  assert.deepEqual(calls[2].body, { ref: `refs/heads/${BRANCH}`, sha: 'basesha' });
  const put = calls[4].body;
  assert.equal(put.branch, BRANCH);
  assert.equal(put.sha, 'mainblob', 'over the file as the new branch has it');
  assert.equal(fromBase64(put.content), TEXT + 'More.\n');
  assert.equal(put.message, `Draft of ${PAGE}\n\nBase-Blob: ${BASE}`);
});

test('draft.save after that: one call, over the sha it was given; a save from elsewhere is a conflict and writes nothing', async () => {
  const routes = { [`PUT ${where}`]: reply(200, { content: { sha: 'draftblob2' } }) };
  const first = stand(routes);
  const out = await githubClient({ token: 't', fetchImpl: first.fetchImpl }).draft.save({ login: 'josh', path: PAGE, name: 'every-feature', text: TEXT, baseBlob: BASE, sha: 'draftblob1' });
  assert.deepEqual(out, { sha: 'draftblob2' });
  assert.deepEqual(first.calls.map(c => c.key), [`PUT ${where}`]);
  assert.equal(first.calls[0].body.sha, 'draftblob1');

  const second = stand({ [`PUT ${where}`]: reply(409, { message: 'does not match' }) });
  await assert.rejects(
    githubClient({ token: 't', fetchImpl: second.fetchImpl }).draft.save({ login: 'josh', path: PAGE, name: 'every-feature', text: TEXT, baseBlob: BASE, sha: 'stale' }),
    (problem) => problem instanceof GithubProblem && problem.conflict === true && /saved from somewhere else/.test(problem.message));
});

test('draft.load: the text, the page it was made from, and when; nothing if there is no branch or it is not a draft', async () => {
  const exists = reply(200, [{ ref: `refs/heads/${BRANCH}`, object: { sha: 'tip' } }]);
  const found = stand({
    [`GET ${R}/git/matching-refs/heads/${BRANCH}`]: exists,
    [`GET ${where}`]: reply(200, { sha: 'draftblob1', content: toBase64(TEXT + 'Mine.\n') }),
    [`GET ${R}/commits`]: reply(200, [{ sha: 'c1', commit: { message: `Draft of ${PAGE}\n\nBase-Blob: ${BASE}`, committer: { date: '2026-10-04T09:30:00Z' } } }]),
  });
  const draft = await githubClient({ token: 't', fetchImpl: found.fetchImpl }).draft.load({ login: 'josh', path: PAGE, name: 'every-feature' });
  assert.deepEqual(draft, { text: TEXT + 'Mine.\n', sha: 'draftblob1', baseBlob: BASE, savedAt: '2026-10-04T09:30:00Z' });
  assert.match(found.calls[1].path, /\?ref=draft%2Fjosh%2Fevery-feature$/);
  assert.match(found.calls[2].path, /sha=draft%2Fjosh%2Fevery-feature&path=/);

  const none = stand({ [`GET ${R}/git/matching-refs/heads/${BRANCH}`]: reply(200, []) });
  assert.equal(await githubClient({ token: 't', fetchImpl: none.fetchImpl }).draft.load({ login: 'josh', path: PAGE, name: 'every-feature' }), null);

  const other = stand({
    [`GET ${R}/git/matching-refs/heads/${BRANCH}`]: exists,
    [`GET ${where}`]: reply(200, { sha: 'x', content: toBase64(TEXT) }),
    [`GET ${R}/commits`]: reply(200, [{ sha: 'c', commit: { message: 'Some other commit', committer: { date: '2026-10-04T09:30:00Z' } } }]),
  });
  assert.equal(await githubClient({ token: 't', fetchImpl: other.fetchImpl }).draft.load({ login: 'josh', path: PAGE, name: 'every-feature' }), null, 'no Base-Blob: not a draft of ours');
});

test('draft.remove: deletes the branch, and is not troubled if it is already gone', async () => {
  const gone = stand({ [`DELETE ${R}/git/refs/heads/${BRANCH}`]: reply(204) });
  await githubClient({ token: 't', fetchImpl: gone.fetchImpl }).draft.remove({ login: 'josh', name: 'every-feature' });
  assert.equal(gone.calls.length, 1);
  const missingBranch = stand({ [`DELETE ${R}/git/refs/heads/${BRANCH}`]: reply(422, { message: 'Reference does not exist' }) });
  await githubClient({ token: 't', fetchImpl: missingBranch.fetchImpl }).draft.remove({ login: 'josh', name: 'every-feature' });
  const refused = stand({ [`DELETE ${R}/git/refs/heads/${BRANCH}`]: reply(403, { message: 'no' }) });
  await assert.rejects(githubClient({ token: 't', fetchImpl: refused.fetchImpl }).draft.remove({ login: 'josh', name: 'every-feature' }), GithubProblem);
});
