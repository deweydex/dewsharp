# Parked: 27 September 2026, 12:10 UTC

Work was stopped at Josh's request, to be restarted about an hour later.
Everything made so far is committed on `claude/csharp-notebook-ide-design-x9jrsg`
(draft PR deweydex/dewsharp#1). **This is work in progress.** Nothing here
has passed a test suite yet, so don't merge it as it stands.

## State (updated 18:15 UTC)

Resumed at 13:05 UTC. Every agent stopped at 14:00 UTC on a session usage
limit, and all of them were relaunched at 18:12 UTC, after the limit reset.
The tables below were true at the relaunch.

| Part | State | Where |
|---|---|---|
| Contracts, house rules, style guide, decisions | Done | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` |
| Course map | Done: 96 pages planned | `planning/COURSE_MAP.md`, `planning/course-map.json`, `courses/*.yaml` |
| Engine | **Nearly done.** Host, runner, worker, parser (`web/lesson/`), checker (`tools/check-lessons.mjs`), dev server, site build, `web/check.html`, and tests for the traps, input, lifecycle and rules. Still open: docs, CI, setup and measurements. | `engine/`, `web/`, `tools/`, `tests/`, `dev/` |
| Page UI, exemplar lessons, `docs/TRANSLATING.md`, integration | Not started | — |
| Drafts, finished (native check: "No problems.") | PDP: `powers-in-csharp`, `storing-and-computing`, `dividing-in-csharp`, `equals-three-ways`, `making-decisions`, `reading-an-error-message`, `repeating-yourself`, `a-total-that-starts-again`, `writing-your-own-functions`, `lists-and-sequences`. FOOP: `the-moves-you-already-know`, `the-tools-around-your-code`, `keeping-details-inside-an-object`, `one-class-many-methods`, `a-polynomial-class` | `drafts/lessons/` |
| Drafts, partial | `from-a-description-to-classes`, `one-parent-many-children` | `drafts/lessons/` |
| Drafts, not started | PDP: `grids-and-references` onwards in the course order. FOOP: `when-is-a-breaks` onwards | — |

Runs relaunched at 18:12 UTC: foundation `wf_80c866dd-ad7`, PDP ports
`wf_18db58e1-b30`, FOOP ports `wf_91c56d5c-86e`. Each was resumed with
`resumeFromRunId`, so finished pages replay from the cache.

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
