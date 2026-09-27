# Parked: 27 September 2026, 12:10 UTC

Work was stopped at Josh's request, to be restarted about an hour later.
Everything made so far is committed on `claude/csharp-notebook-ide-design-x9jrsg`
(draft PR deweydex/dewsharp#1). **This is work in progress.** Nothing here
has passed a test suite yet, so don't merge it as it stands.

## State

| Part | State | Where |
|---|---|---|
| Contracts, house rules, style guide, decisions 1–8 | Done | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` |
| Native checker for drafts | Done, works | `drafts/tools/NativeCheck` |
| Course map | Done: 96 pages planned, batch 0 is `first-steps` and `objects-and-classes` (with practice pages) | `planning/COURSE_MAP.md`, `planning/course-map.json`, `courses/*.yaml` |
| Engine | **Partial.** C# host, cell assembler, Console shim, run context, frames, `runner.js`, `worker.js`, service worker and a dev page exist. Not finished: the Playwright tests, `web/lesson/parse.js`, `tools/check-lessons.mjs`, `tools/serve.mjs`, `tools/build-site.mjs`, `dev/setup.sh`, CI, `docs/ARCHITECTURE.md`, and a measured build. | `engine/`, `web/`, `tools/lib/`, `tests/engine/` |
| Page UI | Not started | — |
| Exemplar lessons and `docs/TRANSLATING.md` | Not started | — |
| Ported drafts, finished (native check: "No problems.") | `powers-in-csharp`, `dividing-in-csharp`, `storing-and-computing`, `the-moves-you-already-know` | `drafts/lessons/` |
| Ported drafts, partial (the agent was stopped mid-page) | `equals-three-ways`, `the-tools-around-your-code` | `drafts/lessons/` |
| Ported drafts, not started | PDP: `making-decisions` and the pages after it in `courses/pdp.yaml`'s order; FOOP: `keeping-details-inside-an-object` and the pages after it | — |

## To restart

1. Install the SDK if the container is new: `curl -sSL https://dot.net/v1/dotnet-install.sh | bash -s -- --channel 10.0 --install-dir <dir>`, then put it on `PATH`. Build the native checker: `dotnet build drafts/tools/NativeCheck -c Release`.
2. **Engine.** Start a new engine agent with the same brief as before, telling it that an earlier run was stopped partway and that it should continue from the files in `engine/`, `web/`, `tools/lib/` and `tests/engine/`, not start again. Then run the page UI, the exemplars and the integration step as planned. The blueprint doesn't need to run again: its output is `planning/COURSE_MAP.md` and `planning/course-map.json`.
3. **Ports.** In the same Claude Code session, resume the two port workflows with `resumeFromRunId` (`wf_389fed59-db9` for PDP, `wf_2b2d31a4-d2f` for FOOP). Finished pages replay from the cache, and the two partial pages are redone. In a new session, run the port script again with only the pages that are not finished.
4. Once the browser checker exists, move each draft from `drafts/lessons/` into `lessons/`. Run it through the checker, give it a review pass against the style guide, and then merge it.

## Two things to reconcile on restart

- **An id.** The port workflow was given `comprehensions-and-grids` →
  `queries-and-grids`, but the course map (decision 9) chose
  `grids-and-references`. No draft of that page exists yet. Use the course
  map's id, and change the port script's `IDMAP` before resuming.
- **FOOP's opening.** The course map (decision 11) starts FOOP with a short
  "Starting in C#" series for learners who arrive from Python. The style
  guide's "`var` on FOOP's second page" counts pages from before that series
  was added. Make the style guide name the page (`var` is taught where the
  course map puts it), not count it.
