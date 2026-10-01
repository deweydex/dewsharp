# Where the work stands

Updated 29 September 2026. This file says what is finished,
what is next, and how to pick the work up in a new session. The history
of how it got here is in the git log and `DECISIONS.md`.

## Finished and on the site

| Part | State |
|---|---|
| Engine, page, checker, CI | Done, and live at <https://deweydex.github.io/dewsharp/>. `npm test` and `npm run check-lessons` pass. |
| Contracts and guides | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` (1–40). |
| Course map | `planning/COURSE_MAP.md` and `planning/course-map.json`: 96 pages planned. |
| FOOP | All 14 pages ported from dewlab are in `lessons/`, run in the browser engine and reviewed. |
| PDP | All 22 pages ported from dewlab (with `critique-and-reflection` and `the-team-project`) are in `lessons/`, run in the browser engine and reviewed. |
| Porters' notes | `planning/notes/<id>.md`: what each page changed, and its open questions. The questions for Josh, merged into one numbered list, are in `planning/OPEN_QUESTIONS.md`; the new pages' writers and reviewers add theirs to their notes. |

A course page shows each lesson that is not written yet by its title,
without a link (decision 39). Those titles are the `planned:` entries in
`courses/*.yaml`.

## Not written yet: paused 1 October 2026, 21:10 UTC

Every course-map page except seven explore pages is merged. The seven are
in `lessons/` on this branch as a work-in-progress snapshot, not merged:

| Page | State |
|---|---|
| `three-doors`, `a-deck-of-cards`, `when-a-queue-never-clears` | Written and reviewed. |
| `counting-darts`, `three-ways-to-make-change` | Written; review still to run. |
| `a-chain-reads-a-book`, `a-model-that-corrects-itself` | Partial drafts; writing still to finish, then review. |

To finish: run the four reviews and two writers (in this session, the
scratchpad's `finish-new-pages.js`, with review agents on Sonnet); then take
the seven off `planned:`, link italic mentions of them, run `npm run build`,
`npm test` and `npm run check-lessons`, and merge once CI is green. Then every
course-map page has a lesson.

## To pick the work up in a new session

1. `dev/setup.sh` installs the .NET SDK from `global.json` and runs `npm ci`.
   Then `npm run build`, `npm test` and `npm run check-lessons`.
2. Read `CLAUDE.md`, then `docs/LESSON_FORMAT.md` and the style guide.
3. For a new page: its entry in `planning/COURSE_MAP.md` is the brief. Write
   `lessons/<id>/<id>.md`, run `npm run check-lessons -- --write <id>`, make
   every number in the prose match the recorded outputs, and remove its
   `planned:` line from `courses/*.yaml`. A page that mentions it in italics
   can then link to it.
4. `drafts/tools/NativeCheck/` is the native checker the porters used before
   the browser checker existed. The browser checker is the one that counts.
