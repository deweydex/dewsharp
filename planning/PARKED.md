# Where the work stands

Updated 2 October 2026. This file says what is finished,
what is next, and how to pick the work up in a new session. The history
of how it got here is in the git log and `DECISIONS.md`.

## Finished and on the site

| Part | State |
|---|---|
| Engine, page, checker, CI | Done, and live at <https://deweydex.github.io/dewsharp/>. `npm test` and `npm run check-lessons` pass. |
| Contracts and guides | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` (1–41). |
| Course map | `planning/COURSE_MAP.md` and `planning/course-map.json`: 96 pages planned. |
| FOOP | All 14 pages ported from dewlab are in `lessons/`, run in the browser engine and reviewed. |
| PDP | All 22 pages ported from dewlab (with `critique-and-reflection` and `the-team-project`) are in `lessons/`, run in the browser engine and reviewed. |
| Porters' notes | `planning/notes/<id>.md`: what each page changed, and its open questions. The questions for Josh, merged into one numbered list, are in `planning/OPEN_QUESTIONS.md`; the new pages' writers and reviewers add theirs to their notes. |

A course page shows each lesson that is not written yet by its title,
without a link (decision 39). Those titles are the `planned:` entries in
`courses/*.yaml`.

## Every page on the course map is written

All 96 entries on the course map have a page in `lessons/` (44 tutorials, 32
practice pages, 6 mixed sets and 14 explore pages), run in the browser engine
and reviewed. 26 of them are new pages with no dewlab original: compiler-errors,
types-and-their-sizes, reading-input and from-python-to-csharp; FOOP's four class
pages; five mixed sets; and thirteen explore pages. The rest are ported from
dewlab. The `planned:` lists in `courses/*.yaml` are empty.

Left to do, none of it urgent:

- **Josh's questions.** `planning/OPEN_QUESTIONS.md` has 62, from the ported
  pages. The 26 new pages' writers and reviewers left theirs in
  `planning/notes/<id>.md`, under "Open" and "Review"; they are not merged
  into that list yet.
- **Checks only a person can make:** Visual Studio on a college PC, a screen
  reader pass, and video links and lengths copied from dewlab (listed at the
  end of `OPEN_QUESTIONS.md`).
- **Editing in Dewnote.** `planning/DEWNOTE.md` says what works today (opening
  and saving all 96 pages is safe) and what would have to change in Dewnote
  and in dewsharp before colleagues edit lessons there. Nothing in it is built.
- **Known faults,** also at the end of `OPEN_QUESTIONS.md`: the editor colours
  the text of a raw string literal as code (`a-chain-reads-a-book`); fixing it
  means rebuilding the vendored editor bundle (`npm run vendor`).

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
