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

## Not written yet

Every course-map page except seven explore pages is in `lessons/`, among
them 19 new pages with no dewlab original. The seven still to write (the
`planned:` entries):

- **PDP:** `three-doors`, `counting-darts`, `three-ways-to-make-change`,
  `a-chain-reads-a-book`.
- **FOOP:** `a-deck-of-cards`, `when-a-queue-never-clears`,
  `a-model-that-corrects-itself`.

The plan is batches of four: a writer agent writes each page straight into
`lessons/<id>/` from its course-map entry and runs every cell in the browser
engine; then a second agent reviews it as a learner and as a teacher would.
The explore pages that use random numbers come after
`leaving-it-to-chance`, and `three-ways-to-make-change` after
`a-function-that-calls-itself`.

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
