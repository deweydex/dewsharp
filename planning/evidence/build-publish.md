# How dewlab builds, lists and publishes pages, and where a link-only C# area could live

The short answer: keep the C# runtime out of `build.py` and out of dewlab's Git history. For the pilot, the lowest-friction route is a small separate repo with its own Pages site. If it earns a place in dewlab later, bring it in as a folder that `deploy.yml` fetches and merges, not as committed binaries.

## 1. How pages are made, and whether anything can be hidden

- **Tutorials.** `load_all()` reads every `tutorials/*/*.md` (build.py:7441-7465). `build()` removes `status: draft` pages completely (build.py:7477). The allowed statuses are draft, beta, live and archived (build.py:137).
  - The default version is the newest `live` one. If no version is live, the newest of any status is the default (build.py:3061-3066).
  - A `beta` page is built with a "This is a draft, not the tutorial your course uses" banner (build.py:5396-5404).
- **Courses.** `courses()` reads every `courses/*.yaml` except `index.yaml` and `redirects.yaml` (build.py:2873-2877). Courses missing from `index.yaml` are **still included**, added alphabetically (build.py:2887).
  - Every course gets a page (build.py:7575-7579) and a front-page card, because `course_card_order()` returns all courses (build.py:6724).
  - A course with `status: draft` still gets a card, with a "Draft" badge (build.py:2773, 2500-2502). **So there is no hidden course.**
- **`pages/*.md`.** These are not globbed. Only the five names in `SITE_PAGES` are built (build.py:6488-6496, 7571-7588). A new `pages/csharp.md` would be ignored unless `build.py` changed.
- **Redirects.** `write_redirects()` writes stub pages from `courses/redirects.yaml`. It refuses a target the build did not write (build.py:6840-6875), so it cannot point at something outside `build.py`.
- **`staging/`.** This is not a staging site. It is source material that is never built ("`build.py` only globs `tutorials/`", staging/dewstack-import/README.md:4-6).
- **A tutorial that no course lists** is not an error. It builds at `tutorials/<id>.html` with a stderr note, "nothing links to it" (build.py:7505-7510).
  - It still gets a downloadable standalone copy (build.py:7542).
  - It still appears in site search and the reference index (see section 2).
  - A course that lists a draft gets a note; a course that lists a missing folder fails the build (build.py:2996-3005).
- **Conclusion:** the only real "unlisted" mechanism is a folder that `build.py` copies wholesale and nothing links to. Unlisted tutorials are not actually hidden.

## 2. Where a page could be discovered

| Surface | What it includes | Evidence |
|---|---|---|
| Home course cards | Every course file | build.py:6708-6746 |
| `all-tutorials.html` | Only tutorials placed on a course and live | build.py:3282, 4467 |
| `assets/search-index.json` | **Every** non-archived default page that is not a practice/context page, including unlisted and beta ones | build.py:7228 |
| `assets/reference-index.json` (the Notebook's Library) | Same filter as search | build.py:7347 |
| Topic tree / topics page | Live default pages with `covers:` | build.py:3929 |
| `assets/routes.json` | Courses only | build.py:6878-6926 |
| sitemap.xml, robots.txt, 404.html | **Do not exist** in the repo or the build (grep found none) | — |
| Glossary panel | That page's own series chain | build.py:3650 |

A non-tutorial folder (like `topic_editor/`) appears on none of these. The only precedent for keeping a page out of search engines is a per-page `<meta name="robots" content="noindex">` (compose/dewmini.html:14).

## 3. The precedent for sibling apps

At the end of `build()` (build.py:7603-7626), four folders are copied into `site/` wholesale with `shutil.copytree`:

- `COMPOSE` → `site/compose/` (build.py:7609)
- `dewmark/workbench` → `site/dewmark/` (build.py:7613)
- `topic_tree_game/` → `site/topic_tree_game/`, without its README (build.py:7617)
- `topic_editor/` → `site/topic_editor/`, commented "reached by typing /topic_editor/ … and never linked" (build.py:7620-7626)

The constants for these live at build.py:127-130. `topic_tree_game/README.md:5-9` states the policy: "Nothing on the site links to it, so you reach it by typing the address."

How much they share with the main site:

- `topic_editor`, `topic_tree_game` and the dewmark workbench are single files that load nothing from `../assets/` (grep found no references).
- `compose/` shares `../assets/` heavily: `tutorial-style.css`, `pyodide-engine.js` and `vendor/codemirror.bundle.js` (compose/notebook.html:14-18, compose/dewmini.js:2-7).
- `compose/` is also copied into the offline Notebook zip (build.py:6390). **So C# must not go under `compose/`**, or the Python download would carry it.
- `assets/` is copied wholesale on every build (build.py:7594). **So C# must not go under `assets/`** either, which is where the plan puts it (plan line 453).
- The shared CodeMirror bundle has no C# mode (vendor-src/package.json lists only the Python, SQL, HTML, CSS and JS language packages). Adding one would change a file every Python page loads, and would bring in the `standalone-bundle-is-current` check.

## 4. CI and deployment

- **What runs.** `deploy.yml` runs on every push to main (deploy.yml:9-13). It installs Python only, runs `python build.py --clean` (:47), checks the build, then `upload-pages-artifact` with `path: site` (:98-100) and `deploy-pages` (:103).
  - Because the site is uploaded as an artifact, Jekyll never runs. A `_framework/` folder, the underscore-prefixed folder .NET's browser output uses, is served without a `.nojekyll` file.
- **The build check** counts only `site/tutorials` and `site/download` (deploy.yml:51-87). A new `site/csharp/` would not affect it.
- **`tests.yml`:**
  - The `unit` job also runs `build.py --clean` (:40). Anything `build.py` copies gets copied here too.
  - `standalone-bundle-is-current` (:131) only covers `assets/vendor/`.
  - `dewmark` (:98-103) is the precedent for "a sibling folder with its own dependencies and tests gets its own job".
- **No size checks** exist anywhere in the repo.
  - The pack is currently 13.65 MiB, and that count is from a shallow clone (`git count-objects` in this checkout).
  - The project already refuses to commit a ~30 MB runtime: Pyodide is ignored and fetched on demand (.gitignore:5-6, 20-24; dev/fetch_pyodide.py; cached in CI at tests.yml:184-193). Live pages load Pyodide from jsDelivr (assets/pyodide-engine.js:313-316), so the site hosts no large binaries today.
  - A Roslyn + .NET WebAssembly bundle has no public CDN, so it would be the first 20-60 MB the site hosts itself.
  - GitHub's published limits are not in the repo: sites up to 1 GB, a 10-minute deploy timeout, a soft 100 GB/month bandwidth limit, and pushes rejected for files over 100 MiB.
- **Where the site is served from.** There is no CNAME file in dewlab or dewcode. The site is `https://deweydex.github.io/dewlab/` (README.md:12). dewcode also has its own Pages workflow (`/home/user/dewcode/.github/workflows/deploy.yml`), so it is already a second project site **on the same origin**, `deweydex.github.io`.
- **The service worker covers any folder inside `/dewlab/`.** Every shell page loads `coi-serviceworker.js` from the site root (assets/shell.html:9; the build copies it at build.py:7633-7635). It registers from its own URL (coi-serviceworker.js:97), so its default scope is `/dewlab/`. It adds COOP/COEP headers (coi-serviceworker.js:44-49).
  - For a same-origin .NET runtime this helps: multithreading needs it.
  - But anything the C# page loads from another origin must allow it (CORS or CORP headers).
  - A separate repo's path would be outside this scope.

## 5. The editor token (the plan's claim is correct)

- `TOKEN_KEY = "dewlab:editor:token"` (assets/editor.js:6).
- It is read from `localStorage` (:1043), written (:1053), and removed by "Forget my token" (:993). The token has contents and pull-request write on `deweydex/dewlab` (:1057-1059; ARCHITECTURE.md:371-378).
- The page is `site/editor.html` (build.py:7436, 7589), served at `deweydex.github.io/dewlab/editor.html`.
- `localStorage` belongs to the whole origin, not to a path. Any script on any `deweydex.github.io/*` page can read the token and every `dewlab:progress:*` key (tutorial-runtime.js:19-27). That includes dewcode and any new repo on this account.
- **So a separate repo on the same account gives no isolation.** Only a custom domain (CNAME) or a different GitHub org/user gives a separate origin.
- A Web Worker has no access to `localStorage`, so the risk comes from code on the page's main thread. (Pyodide already has a main-thread path, `pyodideMT`, at pyodide-engine.js:164/325.)

## 6. Judgement

**A. A folder `build.py` copies verbatim** (e.g. `csharp/` → `site/csharp/`)

- Changes:
  - build.py: a constant near :130 and a `copytree` block after :7626.
  - The new `csharp/` folder.
  - ARCHITECTURE.md and README, per the CONTRIBUTING rule.
- It meets (a) as long as nothing in `assets/` references it. It meets (b) the same way `topic_editor` does. It can reuse `../assets/tutorial-style.css` and fonts the way `compose/` does.
- It meets (c) **only if the runtime binaries are committed**. That goes against the .gitignore stance on Pyodide, multiplies the repo size, and every CI job and every local build carries or copies 20-60 MB.
- Fine for the thin HTML/JS. Wrong for the runtime.

**B. A folder built separately and merged in `deploy.yml`**

- Changes:
  - The HTML/JS lives in dewlab as `csharp/` (source, not copied by `build.py`).
  - New `dev/fetch_csharp_runtime.py`, modelled on `dev/fetch_pyodide.py`: a pinned release asset plus a sha256 check.
  - deploy.yml: a step after :47, `cp -r csharp site/csharp` plus the fetch. It has to come after `build.py --clean`, which deletes `site/` (build.py:7473-7474).
  - An optional `csharp` job in tests.yml, like `dewmark`.
  - A `.gitignore` entry for the fetched runtime.
- The runtime itself is built in its own workflow or repo that has `setup-dotnet`. `build.py` is untouched and no .NET SDK is involved.
- The risk: a failed fetch would block Python publishes unless the step skips C# on failure. Local `build.py` output would not include C#.

**C. A separate repo with its own Pages site** (a new small repo, **not** a fork and **not** dewcode)

- A fork drags along all 7,691 lines of `build.py`, the Python CI and the Pyodide assets, which is the coupling Josh wants to avoid. GitHub also will not let you fork your own repo into the same account. dewcode is an older full copy of dewlab and has the same problem.
- Changes to dewlab: **none**. The C# repo has its own `deploy.yml` (checkout → `dotnet publish` → `upload-pages-artifact`).
- It can copy `tutorial-style.css` and the fonts, or link `/dewlab/assets/…`, which works because the origin is the same.
- Add a `noindex` meta tag, following compose/dewmini.html:14.
- It meets (a), (b) and (c) completely, and Phase 0 can use any .NET tooling. dewstack is the precedent: incubated separately, then ported in (staging/dewstack-import/README.md).
- It is served at `deweydex.github.io/<repo>/`. That shares `localStorage` with dewlab but sits outside the service-worker scope.

**Recommendation:** C for the feasibility pilot. B as the landing shape if it graduates. A only for the HTML shell, never for the binaries.

If C# will ever run code that students share with each other, give the C# repo a custom domain now. That buys the origin boundary the plan's §13 asks for at no extra cost, which none of the options above provides on `deweydex.github.io`.

Weaving C# into tutorials, as the plan's §9 proposes, means changing `CELL_TYPES` (build.py:165), solution checking and the manifests. None of that is needed for a standalone C# page.

The copy of the plan I read: /tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/csharp-plan.md