// A small GitHub client for the editing mode (docs/ARCHITECTURE.md, "Editing"). It knows nothing about
// lessons: give it a repository, a token and one file's new text, and it proposes the change as a draft
// pull request. It can also keep a work-in-progress draft of one file on a branch of its own, so that an
// author can carry on from another computer ("Editing in place", "The draft on GitHub"). Nothing here can
// publish anything. The token can open a branch and a draft pull request; merging is somebody's decision on
// GitHub. The module has no dependencies, so another site can copy it.

const API = 'https://api.github.com';

export const DEFAULTS = { repo: 'deweydex/dewsharp', base: 'main', tokenKey: 'dewsharp:edit:token' };

// ---- the token, kept in this browser only

export function readToken(key = DEFAULTS.tokenKey) {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
export function writeToken(token, key = DEFAULTS.tokenKey) {
  try { localStorage.setItem(key, token); return true; } catch { return false; }
}
export function forgetToken(key = DEFAULTS.tokenKey) {
  try { localStorage.removeItem(key); } catch { /* storage blocked: nothing was kept */ }
}

/** A problem with a sentence a person can read. `message` is always that sentence. `status` is GitHub's, if it answered. */
export class GithubProblem extends Error {
  constructor(message, { status = 0 } = {}) { super(message); this.status = status; }
}

// ---- text and base64 (GitHub sends and takes file contents as base64 of the UTF-8 bytes)

export function toBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export function fromBase64(base64) {
  const binary = atob(String(base64).replace(/\s/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0)));
}

/**
 * The name git gives a file that holds exactly `text`: what GitHub calls the file's `sha`. A draft remembers
 * the name of the page it was made from, so that it is not opened over a page that has changed since.
 */
export async function gitBlobSha(text) {
  const body = new TextEncoder().encode(text);
  const head = new TextEncoder().encode(`blob ${body.length}\0`);
  const bytes = new Uint8Array(head.length + body.length);
  bytes.set(head);
  bytes.set(body, head.length);
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-1', bytes));
  return Array.from(digest, b => b.toString(16).padStart(2, '0')).join('');
}

/** draft/<login>/<name>: where one author keeps the work in progress on one page. */
export const draftBranch = (login, name) => `draft/${login}/${name}`;

const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');
const two = (n) => String(n).padStart(2, '0');

/** edit/<name>-20261003-142530-x7k: a branch name that cannot collide with another author's. */
export function branchName(name, now, random) {
  const d = now;
  const stamp = `${d.getUTCFullYear()}${two(d.getUTCMonth() + 1)}${two(d.getUTCDate())}-${two(d.getUTCHours())}${two(d.getUTCMinutes())}${two(d.getUTCSeconds())}`;
  const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'page';
  return `edit/${slug}-${stamp}-${random().toString(36).slice(2, 5).padEnd(3, '0')}`;
}

/**
 * @param {object} o
 * @param {string} o.token
 * @param {string} [o.repo]   "owner/name"
 * @param {string} [o.base]   the branch a change is proposed against
 */
export function githubClient({
  token, repo = DEFAULTS.repo, base = DEFAULTS.base,
  fetchImpl = (...args) => fetch(...args), now = () => new Date(), random = Math.random,
}) {
  async function call(method, route, body) {
    let response;
    try {
      response = await fetchImpl(API + route, {
        method,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw new GithubProblem('Could not reach GitHub. Check that you are online, then try again.');
    }
    if (response.ok) return response.status === 204 ? null : response.json();
    throw new GithubProblem(await explain(response), { status: response.status });
  }

  async function explain(response) {
    let detail = '';
    try { detail = (await response.json())?.message || ''; } catch { /* no body */ }
    const status = response.status;
    if (status === 401) return 'GitHub did not accept the token. It may have expired, or it may have a typing mistake. Make a new one and paste it in Settings.';
    if (status === 403 && response.headers?.get?.('x-ratelimit-remaining') === '0') return 'GitHub is limiting how fast this token can ask. Wait a few minutes and try again.';
    if (status === 403) return `The token is not allowed to do this. It needs "Contents" and "Pull requests" set to "Read and write", for ${repo} only. GitHub said: ${detail || 'forbidden'}.`;
    if (status === 404) return `GitHub cannot find ${repo} with this token. Check that the token was made for that repository, and that you have been added to it.`;
    return `GitHub refused the request (${status}${detail ? `: ${detail}` : ''}).`;
  }

  /** Whether a branch exists. Asks for the branches that start with its name, which is an empty answer, not a 404, when there is none. */
  async function branchExists(branch) {
    const found = await call('GET', `/repos/${repo}/git/matching-refs/heads/${branch.split('/').map(encodeURIComponent).join('/')}`);
    return Array.isArray(found) && found.some(r => r.ref === `refs/heads/${branch}`);
  }

  return {
    /** Checks that the token works and may change the repository. Returns { login }. */
    async check() {
      const user = await call('GET', '/user');
      const info = await call('GET', `/repos/${repo}`);
      if (info.permissions && info.permissions.push === false) {
        throw new GithubProblem(`The token can read ${repo} but not change it. Make a new one with "Contents" and "Pull requests" set to "Read and write", and check that you have been added to the repository.`);
      }
      return { login: user.login };
    },

    /** The work-in-progress draft of one file, kept on a branch of its own, `draft/<login>/<name>`. */
    draft: {
      /**
       * The draft kept for `path`, or null if there is none. `baseBlob` is the sha of the file on the base
       * branch when the draft was begun, `sha` the file's sha on the draft branch (to save over it later).
       * @returns {Promise<{text:string,sha:string,baseBlob:string,savedAt:string}|null>}
       */
      async load({ login, path, name }) {
        const branch = draftBranch(login, name);
        if (!(await branchExists(branch))) return null;
        const file = await call('GET', `/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`);
        const list = await call('GET', `/repos/${repo}/commits?sha=${encodeURIComponent(branch)}&path=${encodeURIComponent(path)}&per_page=1`);
        const commit = list?.[0]?.commit;
        const baseBlob = /^Base-Blob: ([0-9a-f]{40})$/m.exec(commit?.message || '')?.[1];
        if (!baseBlob) return null;       // a branch of that name that is not a draft of ours
        return { text: fromBase64(file.content), sha: file.sha, baseBlob, savedAt: commit.committer?.date || commit.author?.date || '' };
      },

      /**
       * Keeps `text` as the draft of `path`. `sha` is the file's sha on the draft branch from the last load or
       * save, or null if the branch may not exist yet (it is made from the base branch). If someone saved to
       * the branch since, nothing is written and the problem has `conflict: true`.
       * @returns {Promise<{sha:string}>}
       */
      async save({ login, path, name, text, baseBlob, sha = null }) {
        const branch = draftBranch(login, name);
        const here = `/repos/${repo}/contents/${encodePath(path)}`;
        if (!sha) {
          if (!(await branchExists(branch))) {
            const head = await call('GET', `/repos/${repo}/git/ref/heads/${encodeURIComponent(base)}`);
            try { await call('POST', `/repos/${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: head.object.sha }); } catch (again) {
              if (again.status !== 422) throw again;           // already there: another save made it first
            }
          }
          sha = (await call('GET', `${here}?ref=${encodeURIComponent(branch)}`)).sha;
        }
        try {
          const put = await call('PUT', here, {
            message: `Draft of ${path}\n\nBase-Blob: ${baseBlob}`, content: toBase64(text), sha, branch,
          });
          return { sha: put.content.sha };
        } catch (problem) {
          if (problem.status === 409) {
            const conflict = new GithubProblem('The draft on GitHub was saved from somewhere else since this page opened it.', { status: 409 });
            conflict.conflict = true;
            throw conflict;
          }
          throw problem;
        }
      },

      /** Removes the draft branch. Nothing is wrong if it is already gone. */
      async remove({ login, name }) {
        const branch = draftBranch(login, name);
        try { await call('DELETE', `/repos/${repo}/git/refs/heads/${encodeURIComponent(branch).replace(/%2F/g, '/')}`); } catch (problem) {
          if (problem.status !== 404 && problem.status !== 422) throw problem;
        }
      },
    },

    /**
     * Proposes `text` as the new content of `path`, as a draft pull request from a new branch.
     * If `baseText` is given and the file on the base branch is no longer exactly that, nothing is
     * written: someone else's change would be undone.
     * @returns {{ url: string, number: number, branch: string }}
     */
    async propose({ path, text, baseText = null, name, summary, description = '' }) {
      const head = await call('GET', `/repos/${repo}/git/ref/heads/${encodeURIComponent(base)}`);
      const file = await call('GET', `/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(base)}`);
      if (baseText != null && fromBase64(file.content) !== baseText) {
        throw new GithubProblem('This page has changed on GitHub since you opened it, so saving now could undo someone else\'s change. Copy your text somewhere safe, reload the page, and make your change again on the new version.');
      }
      const branch = branchName(name, now(), random);
      await call('POST', `/repos/${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: head.object.sha });
      try {
        await call('PUT', `/repos/${repo}/contents/${encodePath(path)}`, {
          message: summary, content: toBase64(text), sha: file.sha, branch,
        });
        const pull = await call('POST', `/repos/${repo}/pulls`, { title: summary, head: branch, base, body: description, draft: true });
        return { url: pull.html_url, number: pull.number, branch };
      } catch (problem) {
        // Leave nothing behind: a branch with no pull request would only confuse the next person.
        await call('DELETE', `/repos/${repo}/git/refs/heads/${encodeURIComponent(branch).replace(/%2F/g, '/')}`).catch(() => { });
        throw problem;
      }
    },
  };
}
