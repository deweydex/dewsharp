# Adversarial review: C# implementation plan (baseline 58b81e4, reviewed against dewlab HEAD eebb97f)

Since 58b81e4 there have been 24 commits. Only two touch infrastructure the plan names. **bca7e9b** moved widget and slider code out of `tutorial-runtime.js` into a new shared `assets/cell-widgets.js`, which both runtimes now import (`assets/tutorial-runtime.js:6-8`, `assets/pyodide-engine.js:3`). It also gave `pyodide-engine.js` per-cell widget state (`assets/pyodide-engine.js:513-557`). **d5d9849** changed the download count in `.github/workflows/deploy.yml:71-78`. Nothing else in the section 2 or section 9 file set has changed.

## 1. Factual claims

| Claim (section 2) | Verdict | Evidence |
|---|---|---|
| `CELL_TYPES` = python, sql; `Cell.type` defaults to python | TRUE | `build.py:165`, `build.py:301` |
| `parse_cell` reads headers and expands includes | TRUE | `build.py:857-893`, includes at `:882`. Header keys are a fixed regex (`build.py:157`), so `project:`/`file:` mean a grammar change |
| `parse_solution` compiles as Python | TRUE | `build.py:924-929` |
| `render_solution` renders as Python | TRUE | `build.py:1259` |
| `check_solutions`/`_run_solutions` run a separate Python process on Python cells only | TRUE | `build.py:4756`, `build.py:4777-4780` |
| Manifest omits `type` for Python cells | TRUE | `build.py:5773` |
| `tutorial-runtime.js` has its own Pyodide worker and main-thread paths | PARTLY | It has its own worker client and main-thread path (`:3648`, `:3735`, `:3822-3867`), but the worker script is the shared `assets/pyodide-worker.js` (`:3824`; `pyodide-engine.js:110`). Since bca7e9b it also shares `cell-widgets.js`. The plan names neither file |
| `executeCell` runs Python and feeds hints and predictions | TRUE, CHANGED | `tutorial-runtime.js:4175-4197`; the widget seeding in it was reworked in bca7e9b |
| `pyodide-engine.js` is the Notebook's page-independent interface | TRUE, CHANGED | `compose/dewmini.js:4`; it now also owns widget state (`:513-557`) |
| dewmini has python, text, web, sql and javascript cells | TRUE | `compose/dewmini.js:33` |
| `js-cell-engine.js` reuses the Python output plumbing | TRUE | `compose/js-cell-engine.js:1`. Missed by the plan: it runs code in a `sandbox="allow-scripts"` iframe (`:103`), which already gives the opaque-origin isolation section 13 asks for |
| `dewmini-fs.js` delegates to Pyodide | TRUE | `compose/dewmini-fs.js:2,93,110` |
| CodeMirror has language selection plus Jedi | TRUE | `vendor-src/codemirror-entry.js:8-12,51-110,303-336` |
| `editor.js` handles Python and SQL exec fences | TRUE | `assets/editor.js:176,212` |
| Exports use Python kernel metadata | TRUE | `tutorial-runtime.js:3456-3457`; `dewmini.js:2537-2538` |
| `from_notebook.py` emits `python exec` | TRUE | `dev/from_notebook.py:211` |
| Saved work keys on stable IDs and saves code and output | TRUE | `tutorial-runtime.js:5261-5263` |
| `tests.yml` has a limited browser job that runs no cells | TRUE | `.github/workflows/tests.yml:131-155,157-201` |
| `deploy.yml` builds and publishes to Pages | TRUE, CHANGED | `.github/workflows/deploy.yml:46-103` (d5d9849) |
| §10: `readCells()` drops unknown types | TRUE | `compose/dewmini.js:112` |
| §10: `ensureSessionForCell`, `canStopCell` | PARTLY | The real names are `ensureSessionFor`, `canStopFor` and `requestInterruptFor` (`dewmini.js:1941-1952`) |

**Section 9 file map.** All 22 existing paths it names are present; the proposed paths are, as expected, absent. What the map leaves out:

- `assets/pyodide-worker.js` and `assets/cell-widgets.js`.
- `DEWMINI_ASSET_FILES` (`build.py:6312`). Any module the Notebook imports has to be listed there.
- `standalone.bundle.js` is built from `tutorial-runtime.js` (`vendor-src/build-vendor.mjs:55`). So C# dispatch code would ship inside every downloaded Python tutorial, and CI's freshness check would gate every such edit.
- Every page that has cells starts Pyodide as soon as it loads (`tutorial-runtime.js:6444-6451`). The Phase 1 gate says C#-only runs must not boot Pyodide, and nothing in the map changes that eager boot.
- About seven `docs/*-explained.md` files that the `CONTRIBUTING.md:131` rule would require updating.
- Help that already exists: `check.py:47` already matches any `\w+ exec` fence, and Crepe uses its default CodeMirror language set (`vendor-src/milkdown-entry.js:13-18`).

## 2. Section classification

(a) = needed for any in-browser C# tool. (b) = needed only because C# is woven into dewlab. (c) = over-engineering for a first pilot.

| § | Class | Note |
|---|---|---|
| 1 Direction | a/b | Roslyn, .NET WASM and the program model are (a); "alongside Pyodide in the same lessons" is (b) |
| 2 Repo inventory | b | |
| 3 Scope | a | |
| 4 Architecture | a | The build-time vs runtime table is partly (b) |
| 5.1 Program cells | a | |
| 5.2 Project groups across Markdown cells | b | Multi-file support is (a); Run-all deduplication, per-file reset and shared panels are (b) |
| 5.3 Worker per Run | c | See weakness 2 |
| 6 Markdown grammar and `stdin` fence | b | |
| 7.1–7.2 Manifest, engine registry | b | |
| 7.3 Message protocol | a | Protocol versioning and "engine generation" are (c) |
| 8 Runtime host, failure handling | a | |
| 9 File map | b | |
| 10 Tutorial and Notebook integration | b | |
| 11 Saved work and exports | a/b/c | Local save and a `.cs`/`.csproj` export are (a); the ipynb import/export matrix is (b); the offline bundle is (c) |
| 12 Solution checking and comparisons | b/c | |
| 13 Input and output | a | |
| 13 File I/O and a dedicated origin | c | |
| 14 Pinning, lazy load, project path | a | Keeping old versions available and service-worker caching are (c) |
| 15 Validation | a/b | Compiler, entry points, Stop, input and device tests are (a); Crepe round trips and mixed-page routing are (b) |
| 16 Phases | a/b/c | Phase 0 is (a), Phases 1–4 are (b), Phase 5 is (c) |
| 17 Risks | a | |
| 18 Definition of done | b-heavy | Roughly 6 of 15 items exist only because of integration: Run all, round trips, Python/SQL left intact, mislabelling, credential origin, CI regressions |

## 3. Five most serious weaknesses

1. **It picks the wrong place to integrate, which is the opposite of what Josh wants.** Phases 1–4 weld C# into the three largest and most tightly coupled files: `build.py` (7,691 lines), `tutorial-runtime.js` (6,502) and `dewmini.js` (4,455). The runtime change then lands in every downloaded tutorial through the standalone bundle. The plan never considers the pattern dewlab already uses for unlisted tools. `topic_tree_game/`, `topic_editor/` and `dewmark/workbench` are copied wholesale into `site/` (`build.py:7608-7625`) and are "reached by typing the address… never linked" (`topic_tree_game/README.md:6-9`). The Notebook itself is a self-contained folder (`build.py:7604-7609`).

2. **It underrates what Roslyn costs in the browser, and "one worker per Run" makes that cost worse.**
   - The plan gives no payload figure. My unmeasured estimate: Microsoft.CodeAnalysis plus its C# assembly, the reference assemblies and the runtime plus base class libraries come to tens of MB uncompressed. That is about the same order as the roughly 32 MB trimmed Pyodide dewlab already self-hosts for tests (`dev/fetch_pyodide.py:16-18`), so it is a real cost but not a disqualifying one.
   - Roslyn itself runs under the WASM interpreter, so the first compile in a fresh runtime is slow; warming up the compiler is the dominant cost.
   - A worker per Run pays that warm-up on every Run. The plan treats a persistent compiler worker as an optional optimisation, which inverts the priorities.
   - The plan never mentions AOT-compiling the host and Roslyn while still interpreting student IL.
   - It is also unnecessary. Each `Assembly.Load` of newly emitted bytes creates new types, so student statics start fresh. What can leak is timers, tasks, event subscriptions and the Console redirect, and the host can reset those.
   - Better: reuse one warm worker, and terminate it only on Stop or timeout. A tight loop in single-threaded WASM can only be stopped by killing the worker.

3. **The input model is weaker than dewlab can already support.** Pre-supplied stdin matches dewlab's own Python decision (`DECISIONS_LOG.md:4875-4877`), so it is not a regression. But PDP and FOOP C# is full of `Console.ReadLine` menus. The plan treats cross-origin isolation as unknown ("evaluate… SharedArrayBuffer/cross-origin-isolation requirements", §13) and defers live input to Phase 5. dewlab already ships `coi-serviceworker` (`assets/shell.html:9`, `compose/notebook.html:9`, `build.py:7633-7635`, `DECISIONS_LOG.md:1680-1686`). That makes a blocking `Console.In` reader inside a worker, using SharedArrayBuffer and Atomics.wait, feasible now. This should be a Phase 0 test, with pre-supplied input as the fallback when the page is not cross-origin isolated. The plan also never says which `System.Console` members a lesson may use: `ReadKey`, `Clear`, colours and cursor positioning are marked unsupported on browser .NET.

4. **It never designs the notebook-style mini-IDE Josh asked for, and it muddles the models.** It treats "notebook" as meaning C# Script with shared state, rejects that, and then calls program-per-cell "Notebook C# cells" (§10, Phase 4). Program-per-cell is a stack of scratchpads, not a notebook. The real choice has four options:
   - **(i) Roslyn script submissions.** Live shared state; classes, interfaces and inheritance are allowed but namespaces are not.
   - **(ii) Program per cell.**
   - **(iii) Cumulative declarations.** Type cells above accumulate, and each Run compiles them together with the current cell's top-level statements, fresh each time. Types are shared, variables are not, namespaces are allowed, and runs are deterministic.
   - **(iv) Replay-above.** Each Run re-executes all statement cells above in order.

   Option (iii) probably fits FOOP best. That choice decides the UI, saving and export design, and the plan leaves it open.

5. **Its isolation gate is misdirected.**
   - The GitHub token sits in `localStorage` (`assets/editor.js:6,1043`), and Web Workers cannot read `localStorage`.
   - dewlab already runs arbitrary learner Python on the same origin, including on the main thread in the standalone path (`tutorial-runtime.js:3648`), and the Notebook runs imported `.ipynb` files. C# adds no new class of risk, yet §13 and §18 make a dedicated origin a release gate.
   - A separate repo would not change the origin anyway. Both dewlab and `deweydex/dewcode` (git remote) publish under `https://deweydex.github.io` (`README.md:12`), and project sites under one account share one origin and one `localStorage`. Only a custom domain or a different account or org would change it.

## 4. Five real strengths

1. **Regular compilation (`SourceCodeKind.Regular`) with explicit entry points and multi-file projects** is the right semantics for FOOP, and the plan is candid about how C# Script differs (§5.1, §19).
2. **Phase 0 is a feasibility gate with concrete exit criteria**, and the plan commits to "revise the design before touching all tutorial layers" if a gate fails (§16).
3. **Its reading of the repository is mostly accurate.** Most section 2 rows check out, and it caught real traps: Python compilation of solutions (`build.py:924`), unknown cells being dropped (`dewmini.js:112`), and the Python kernelspec in exports.
4. **Its result taxonomy is well built for teaching:** compile-error, runtime-error, stopped, timeout and host-error; Stop and missing runtime assets do not count as failed attempts; predictions settle only after a successful run; spans use UTF-16 offsets (§7.3).
5. **It gives students a bridge out of the browser:** a `.csproj` ZIP export with pinned LangVersion and no implicit usings, so the same code builds locally (§11). It also labels every performance figure as unmeasured.

## 5. Size of change

**The plan as written.** About 22 existing files, 17 new files, plus docs and tests, so roughly 45–55 files in total. My rough line estimate:

| Area | Lines |
|---|---|
| `build.py` | 500–800 |
| `tutorial-runtime.js` | 700–1,200 |
| `dewmini.js` | 400–700 |
| `editor.js`, CSS, CI | 300–500 |
| New JS modules | 1,000–1,500 |
| .NET host and tests | 800–1,300 |
| Docs and tests | 1,500–2,500 |
| **Total** | **about 5,000–8,500** |

It also forces a `standalone.bundle.js` rebuild and gives every Python series a new code path.

**A standalone unlisted C# folder** (for example `csharp/`, modelled on `topic_tree_game/`):

| Part | Lines |
|---|---|
| Page, worker and notebook UI | 1,000–1,800 |
| .NET host | 300–600 |
| Tests | 300–500 |
| Folder copy in `build.py` (as at `build.py:7614-7625`) | about 5 |
| `setup-dotnet` and publish step in `deploy.yml` | 20–30 |
| **Total** | **about 10–15 files, 1,700–3,000 lines** |

`tutorial-runtime.js`, `dewmini.js` and the vendor bundles are untouched. The page can still include `../coi-serviceworker.js` (as `compose/notebook.html:9` does) to get live stdin.

**A separate repo** gives cleaner CI with no .NET SDK in dewlab's pipeline, but the same origin. Namespace its storage keys.

**A fork is the worst option.** `/home/user/dewcode` already shows the drift: 4 commits, 59 lessons, and different house rules (`/home/user/dewcode/CLAUDE.md`, `/home/user/dewcode/planning/IMPLEMENTATION.md`).

I changed nothing in either repository. The plan I reviewed is at `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/csharp-plan.md`.