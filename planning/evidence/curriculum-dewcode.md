# Curriculum and repository facts for the C# decision

## 1. The three courses (dewlab)

**Everything is Python, and every course is live on the home page.**

- **PDP**, `courses/programming-design-principles.yaml:1-3` ("5N2927 · QQI Level 5", beta). It has 23 tutorials in two series (`:24-50`):
  - **Programming Foundations (20):** first-steps, powers-in-python, storing-and-computing, dividing-in-python, making-decisions, equals-three-ways, reading-an-error-message, repeating-yourself, a-total-that-starts-again, writing-your-own-functions, lists-and-sequences, comprehensions-and-grids, two-names-one-list, looking-things-up-by-name, a-program-of-your-own, finding-things (linear and binary search), putting-things-in-order (bubble, insertion and selection sort), building-reusable-tools, when-it-goes-wrong, how-we-got-here.
  - **Working in a Team (3):** from-cells-to-a-program, critique-and-reflection, the-team-project.
  - The description says the pages "are the ones the integrated course uses" (`:9-11`). They are the same files, not copies (DECISIONS_LOG.md:3799).
- **FOOP**, `courses/fundamentals-of-oop.yaml:1-3` (5N0541). It assumes the learner "can already write a function and a loop in Python" (`:9-10`). It has 14 tutorials (`:24-37`) plus a mixed set (`:38-39`): objects-and-classes, the-moves-you-already-know, the-tools-around-your-code (IDE and debugging), keeping-details-inside-an-object, one-class-many-methods, a-polynomial-class, from-a-description-to-classes, one-parent-many-children, when-is-a-breaks, objects-inside-objects, testing-what-a-class-does, documenting-a-class, a-front-end-for-a-class, your-world-playable. Most pages carry 4 worlds (game, ocean, solar-system, your-own), e.g. `tutorials/objects-and-classes/objects-and-classes.md:5-9`.
- **Integrated course**, `courses/mit-pdp-maths-prog-integration.yaml:1-3` (5N2927 + 5N18396). It has 59 tutorials (`:32-102`): the same 20 Foundations pages, then Data, Chance and Logic (11), Algebra and Functions (12), Trigonometry and Calculus (12), Review (1) and the 3 team pages, plus 5 mixed sets (`:103-108`).

**Cell counts** come from counting fences in my script, `scratchpad/curriculum/survey.py`. The counts include world variants.

| Course | Tutorial `python exec` | Practice `python exec` |
|---|---|---|
| PDP | 255 | 191 |
| FOOP | 134 | 55 (+9 in the mixed set) |
| Integrated | 691 | 360 |

None of these pages uses any other fence language. Site-wide there are 2,821 `python exec` fences, 54 `sql exec` and 14 `js site` (all in other courses).

**Console input**
- Lessons deliberately avoid a live `input()`. `a-front-end-for-a-class.md:96` says "`run_choice` never calls `input()`". At `:108` a plain (non-exec) fence shows `input("What now? ")`, and `:113` says "A cell on this page cannot wait for someone to type", so a stand-in `ask` is used.
- The same pattern appears in `from-cells-to-a-program.md:54-66`, where `ask()` stands in for `input()`. `:296-310` tells students to run the program in Thonny with `ask = input`, and says the Notebook "cannot wait for typing either".
- The-team-project (`:88`) uses the same stand-in.
- FOOP's front ends use widgets (`text_input()`, `dropdown()`) instead: `a-front-end-for-a-class.glossary.yaml:7,31-36`.
- **Inconsistency:** `storing-and-computing.md:272` says an `input()` cell "waits for you to type something". But there is no stdin handling anywhere in `assets/pyodide-worker.js` or `assets/pyodide-engine.js`. My grep found none; I have not run it in a browser.
- `inputs` fences (550 site-wide) are not stdin. They are expressions used to check answers (`assets/pyodide-worker.js:279-282`).

**Language mentions**
- There is no C#, .NET, csharp or dotnet anywhere in dewlab's planning, docs, DECISIONS_LOG.md or QUESTIONS.md.
- The only "C#" hits are musical note names (`tutorials/waves/waves.md:442`, `tutorials/a-tool-of-your-own/a-tool-of-your-own.md:65`) and four Sebastian Lague C#/Unity videos (`planning/video-library/all-videos.csv:289,290,315,432`).
- Java appears once, in a fact-check note: "Java named as having a separate linker step" (DECISIONS_LOG.md:4525).

**Module descriptors** (`planning/curriculum/descriptors/*.pdf`). pdftotext was missing, so I pulled the text out with a small zlib script; no page numbers.
- **FOOP 5N0541, §11c:** "Java, C#, C++, Visual Basic .NET, Python, Ruby, etc. … an integrated development environment should be used." Other requirements:
  - "correctly compile and execute programs written within an IDE"
  - "troubleshoot compiler errors"
  - "do-while loop" (Python has none)
  - "deploy the program to the end user via a suitable front end"
- **PDP 5N2927:** always says "a chosen programming language". Other requirements:
  - "identify the range of data that it can store and the amount of RAM that it requires"
  - "develop a program that reads data from a user"
  - LO9: "Interpret compiler and linker messages"
- dewlab maps these outcomes onto Python: `planning/curriculum/outcomes.yaml:285` (PDP-LO9) and `:314` (FOOP-LO5). `planning/CURRICULUM_MAP.md:535` covers LO9 with Python tracebacks.
- It has already departed from a descriptor's own tooling once, for Database Methods (Access → SQL and Python): `outcomes.yaml:20-24`.

**The plan's baseline** is commit `58b81e4`, PR #399. It is 10 commits behind HEAD `eebb97f` (#406). Its claim `CELL_TYPES = {"python", "sql"}` still holds (`build.py:165`).

## 2. dewcode vs dewlab

**Git history**
- **dewlab** is a shallow clone: `.git/shallow` holds `2070a0d` (2026-09-25). 68 commits are visible (50 Joshua Aaron, 18 Claude), and PR numbers reach #406. The remote has 152 branches.
- **dewcode** has its full history: 4 commits, all on 2026-09-09 by Joshua Aaron. The "Initial commit" `048aded` adds 517 files and 236,087 lines at once, then #1 is a documentation/glossary review. The remote has only `main` and `review/documentation-and-glossary`.
- The two repos share no Git history.

**Where dewcode came from**
- dewlab's remote has a branch named `dewcode`, at `38630ad` (2026-09-08). Its parent is PR #166, which records DECISIONS_LOG 7.139.
- dewcode's decisions log ends at exactly 7.139 (`dewcode/DECISIONS_LOG.md:6875-6893`). The same entry sits at dewlab's `DECISIONS_LOG.md:2947-2957`. dewlab has since reached 7.272 and 8.7.
- The file contents are not byte-identical: `build.py` is blob `9473adc` in dewcode's initial commit and `b850ccf` on the `dewcode` branch. `planning/IMPLEMENTATION.md` explains the gap: comments and docs were rewritten.
- **Verdict:** dewcode is a copy of dewlab as of about 8 September (#166), edited, re-committed without history, and heading its own way. It is not a live fork. It is also not a C# product.

**Where dewcode is now**
- It still uses the old layout, `tutorials/<module>/<slug>` with `tutorials/modules.yaml` and `*.order.yaml`. dewlab replaced that with `courses/` in 7.173 (DECISIONS_LOG.md:3817-3825).

| | dewcode | dewlab |
|---|---|---|
| Tutorial folders | 64 (CM 18, FOOP 9 incl. mixed, integrated 37, DBM 0) | 272 |
| `build.py` lines | 4,461 | 7,691 |
| `tutorial-runtime.js` lines | 4,473 | 6,502 |
| Test files | 2 (31 tests) | 69 |

**What dewcode says it is for**
- `README.md:12-14`: "being prepared for GitHub and GitHub Pages… does not yet establish a public deployment".
- `planning/IMPLEMENTATION.md:1-10`: a documentation revision begun 9 September. "The former pedagogical style guide has been removed at the owner's request." `dewcode/CLAUDE.md` says the same.
- It rejects `sql` fences in tutorials (IMPLEMENTATION.md, "Completed in this revision").
- It has no C#. The only relevant hit is "Java" in a chart label list (`tutorials/mit-pdp-maths-prog-integration/pictures-worth-numbers/pictures-worth-numbers.md:85`).

**The C# branch**
- Both repos have a local `claude/csharp-notebook-ide-design-x9jrsg` equal to their main HEAD (dewlab `eebb97f`, dewcode `6e9c68d`).
- `git ls-remote` shows that branch on neither remote. It has not been pushed.

## 3. DECISIONS_LOG.md entries that matter here

**Separate repositories and products**
- **0.27:** "dewlab is its own repository" (`:198-203`).
- **The rule between dewlab and dewstack:** "'Port in shape, not code' is the rule for the boundary between dewlab and dewstack" (`:3073-3074`, also `:2769-2770`). It costs manual double edits: "a wording change there is a change to make here by hand".
- **7.143, dewmini web:** "a second, standalone product sharing the site-relay engine" (`:3103`). It cost "three new files… No change to `assets/site-relay.js`, `assets/tutorial-runtime.js`, or `compose/dewmini.js`" (`:3131-3135`).
- **7.91:** Mini IDE retired; "The original app survives, unlinked" (`:2083-2087`). This is a precedent for pages you reach only by link.

**Adding a second language or engine**
- **7.117:** "SQL and JavaScript won't get the same discount: both need a genuinely new execution engine" (`:2427`).
- **7.118:** sql.js, "a second WebAssembly interpreter alongside Pyodide", was dropped: "Two engines would mean two data models with nothing bridging them" (`:2429`).
- **7.119, JavaScript cells:**
  - "`compose/js-cell-engine.js` plays the role `pyodide-engine.js` plays for Python" (`:2441`).
  - A documented gap: `let`/`const` do not persist between cells (`:2445`).
  - "`runCellBatch()` only boots each cell's engine right before its own turn, so an all-JavaScript batch never downloads Python" (`:2449`).
- **7.140, `sql exec`:** `Cell` gained a `type` field. The manifest gets `needsSqlite: true` "under the same 'only pay for what you use' reasoning" (`:2959-2980`).
- **7.180:** "a sixth fence kind rather than a third site-pane language", kept separate "so nothing about loosening a site editor's own sandbox can happen by editing the wrong branch… by accident" (`:3905-3907`).

**Keeping pages light**
- **7.99:** "nothing new opens on a first visit" (`:2199`).
- **7.122:** Web and SQL cells are "default off, behind a per-type Settings toggle". Writing notebooks to disk would mean "booting Pyodide on every page load — against the project's own 'nothing opens on a first visit' rule" (`:2487-2489`).
- `ARCHITECTURE.md:204-205`: "A tutorial with no cells never fetches Pyodide". `:215-216`: Pyodide boots lazily on the first Run.

**Saved-work compatibility**
- **2.2:** "Restore matches on cell id" (`:393-395`).
- **7.12:** "Renaming a cell id destroys saved work" (`:713-718`).
- **7.173:** the key is now `dewlab:<kind>:<id>`, with `migrateStorage()` for old keys (`:3825`). `ARCHITECTURE.md:207-209` gives the form `dewlab:progress:<id>`.
- **7.171:** PDP reuses the integrated course's pages because "copying them would make every future edit a two-file edit and split the saved work" (`:3799`).

**Hiding a C# area inside dewlab**
- A tutorial that no course lists "builds, at its address, with a note" (DECISIONS_LOG.md:3827).
- But every `courses/*.yaml` file shows up on the home page. Files not named in `index.yaml` are added alphabetically at the end (`build.py:2892-2893`).
- Course `status` is only draft, beta or live (`build.py:2773`) and is shown as a badge (`:6770-6771`). There is no hidden status.
- The search index includes every live default tutorial, whether a course lists it or not (`build.py:7226-7229`). So a link-only page inside dewlab would still turn up in site search.
- Any change to `tutorial-runtime.js` also needs the vendor bundle rebuilt, or CI's `standalone-bundle-is-current` check fails (dewlab `CLAUDE.md`, "Two traps").

Scratch files: `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/curriculum/` (`survey.py`, `pdftxt.py`, and the extracted descriptor text in `*5N0541.txt` and `*5N2927.txt`).