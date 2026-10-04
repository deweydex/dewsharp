# Where the work stands

Updated 4 October 2026. This file says what is finished,
what is next, and how to pick the work up in a new session. The history
of how it got here is in the git log and `DECISIONS.md`.

## Finished and on the site

| Part | State |
|---|---|
| Engine, page, checker, CI | Done, and live at <https://deweydex.github.io/dewsharp/>. `npm test` and `npm run check-lessons` pass. |
| Contracts and guides | `docs/`, `CLAUDE.md`, `planning/PEDAGOGICAL_STYLE_GUIDE.md`, `DECISIONS.md` (1–43). |
| Course map | `planning/COURSE_MAP.md` and `planning/course-map.json`: 96 pages planned. |
| FOOP | All 14 pages ported from dewlab are in `lessons/`, run in the browser engine and reviewed. |
| PDP | All 22 pages ported from dewlab (with `critique-and-reflection` and `the-team-project`) are in `lessons/`, run in the browser engine and reviewed. |
| Porters' notes | `planning/notes/<id>.md`: what each page changed, and its open questions. The questions for Josh, merged into one numbered list, are in `planning/OPEN_QUESTIONS.md`; the newer pages' questions are merged into it as well. |

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

- **Josh's questions.** `planning/OPEN_QUESTIONS.md` has 168: 1 to 62 from the
  ported pages, 63 onward from the 26 newer pages. Four are answered (4, 5, 7
  and 8; decision 41), each with a note of what is still open under it. The
  rest keep their defaults, and no page waits on them.
- **Checks only a person can make:** Visual Studio on a college PC, a screen
  reader pass, and video links and lengths copied from dewlab (listed at the
  end of `OPEN_QUESTIONS.md`).
- **Editing in the page.** Built (`DECISIONS.md` #42, #43): a token in Settings
  turns on "Edit on the page" and "Edit as text" on each lesson, and a change
  goes to GitHub as a draft pull request. The text box worked with a real
  token (Josh, 3 October). On the page, each block of prose, and each cell's
  settings and blocks, opens as its own lines of Markdown where it stands; the
  draft is kept in the browser, with Undo, Redo and Start again. Tested
  against a stand-in for GitHub. Not yet tried with a colleague's token: a
  fine-grained token for a repository owned by someone else may not be
  possible (then an organisation, or a classic `public_repo` token).
- **Editing in place, still to build.** Josh chose rich editing from the start,
  a draft in the browser plus a branch on GitHub, and an "Edit as Markdown"
  switch on every rich block (`planning/IN_PLACE_EDITING.md`). Stage 2: prose
  blocks as a rich view, with a check at opening that the block round-trips,
  else it opens as Markdown. Stage 3: the draft on a branch
  `draft/<login>/<page>`, to resume on another computer. A screen-reader test
  of the rich view is still to be done.
- **Editing in Dewnote.** Not needed now. `planning/DEWNOTE.md` keeps the two
  heavier routes, and what was measured about them, for the day a rich-text
  editor is wanted beside the edit mode.
- **Known faults,** also at the end of `OPEN_QUESTIONS.md`: the editor colours
  the text of a raw string literal as code (`a-chain-reads-a-book`); fixing it
  means rebuilding the vendored editor bundle (`npm run vendor`). The same
  section lists the smaller faults the newer pages' reviewers found, a line
  each.

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
