# Parked: 27 September 2026, 12:10 UTC

Work was stopped at Josh's request, to be restarted about an hour later.
Everything made so far is committed on `claude/csharp-notebook-ide-design-x9jrsg`
(draft PR deweydex/dewsharp#1). **This is work in progress.** Nothing here
has passed a test suite yet, so don't merge it as it stands.

## State (parked again 18:50 UTC)

Josh asked to park at 18:48 UTC. All three runs were stopped, and everything
they wrote is committed.

| Part | State | Where |
|---|---|---|
| Contracts, house rules, style guide, decisions | Done | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` |
| Course map | Done: 96 pages planned | `planning/COURSE_MAP.md`, `planning/course-map.json`, `courses/*.yaml` |
| Engine | **Done.** Host, runner, worker, parser, checker, dev server, site build, `web/check.html`, `dev/setup.sh`, CI (`.github/workflows/site.yml`), `docs/ARCHITECTURE.md`, `docs/PARSER.md`, decisions 16–25 and measurements. At 18:50 UTC, `npm test` passed 18 of 18 parser tests and 54 of 54 engine and checker tests. The agent's report is in `planning/evidence/engine-report.json`. | `engine/`, `web/engine/`, `web/lesson/`, `tools/`, `tests/`, `dev/`, `docs/` |
| Page UI | **Partial.** Vendor bundles are done (editor, Markdown, KaTeX, fonts). The shared CSS and JS were in progress. `index`, `course`, `lesson`, `notebook`, `help` and `teachers` exist as first versions, not tested yet. | `web/*.html`, `web/page/`, `web/vendor/` |
| Exemplar lessons | **Nearly done.** `first-steps` and `objects-and-classes`, with practice pages and recorded outputs. At 18:50 UTC, `npm run check-lessons` reported 4 pages, 75 runs, no problems. `docs/TRANSLATING.md` is not written yet. | `lessons/` |
| Integration pass | Not started | — |
| Drafts, finished (native check: "No problems.") | PDP (14): `powers-in-csharp`, `storing-and-computing`, `dividing-in-csharp`, `equals-three-ways`, `making-decisions`, `reading-an-error-message`, `repeating-yourself`, `a-total-that-starts-again`, `writing-your-own-functions`, `lists-and-sequences`, `two-names-one-list`, `grids-and-references`, `looking-things-up-by-name`, `a-program-of-your-own`. FOOP (9): `the-moves-you-already-know`, `the-tools-around-your-code`, `keeping-details-inside-an-object`, `one-class-many-methods`, `a-polynomial-class`, `from-a-description-to-classes`, `when-is-a-breaks`, `one-parent-many-children`, `objects-inside-objects` | `drafts/lessons/` |
| Drafts, partial | `finding-things` (PDP) | `drafts/lessons/` |
| Drafts, not started | PDP: `putting-things-in-order`, `building-reusable-tools`, `when-it-goes-wrong`, `how-we-got-here`, `from-cells-to-a-program`, `critique-and-reflection`, `the-team-project`. FOOP: `testing-what-a-class-does`, `documenting-a-class`, `a-front-end-for-a-class`, `your-world-playable`, `mixed-programming-with-objects`. The course map's new pages (such as `compiler-errors`, `reading-input` and `from-python-to-csharp`) and the explore pages have not been started either. | — |

To resume in this session, relaunch with `resumeFromRunId`: foundation
`wf_80c866dd-ad7`, where the engine is cached and the page and exemplars
restart from their files; PDP ports `wf_18db58e1-b30`; FOOP ports
`wf_91c56d5c-86e`. The workflow scripts are under
`~/.claude/projects/-home-user-dewsharp/*/workflows/scripts/`.

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
