// The draft of one file, kept on GitHub (docs/ARCHITECTURE.md, "Editing in place", "The draft on GitHub"), so
// that an author can carry on from another computer. It is a branch of its own, draft/<login>/<page>, that
// holds the file as the author has it; the page's own pull request is made from the page's text when the
// author proposes it, and this branch is removed then. It remembers which version of the page the draft was
// made from (the file's sha on the base branch), so that a draft is not opened over a page that has changed.
// It knows nothing about lessons: `client` is a githubClient() and `path` the file.
import { gitBlobSha } from './github.js';

export function remoteDraft({ client, path, name, baseText }) {
  let login = null;
  let sha = null;                       // the file's sha on the draft branch, from the last load or save
  let baseBlob = null;
  const ready = gitBlobSha(baseText).then(blob => { baseBlob = blob; });

  return {
    /**
     * Checks the token and looks for a draft. `draft` is a draft made from this version of the page; `stale`
     * one made from an older version, which is not offered as the page. Both are
     * `{ text, savedAt }`. Throws a GithubProblem with a sentence for the author.
     */
    async open() {
      await ready;
      login = (await client.check()).login;
      const found = await client.draft.load({ login, path, name });
      sha = found ? found.sha : null;
      if (!found) return { draft: null, stale: null };
      return found.baseBlob === baseBlob ? { draft: found, stale: null } : { draft: null, stale: found };
    },

    /** Saves `text` as the draft. A GithubProblem with `conflict` set means it was saved from elsewhere since. */
    async save(text) {
      const saved = await client.draft.save({ login, path, name, text, baseBlob, sha });
      sha = saved.sha;
    },

    /** Removes the draft from GitHub. */
    async discard() {
      await client.draft.remove({ login, name });
      sha = null;
    },

    /** The draft as it is on GitHub now. A later save replaces it, so ask this before keeping one's own. */
    async latest() {
      const found = await client.draft.load({ login, path, name });
      sha = found ? found.sha : null;
      return found;
    },

    /** Whether there is a draft on GitHub that this has seen or made. */
    get exists() { return sha != null; },
  };
}
