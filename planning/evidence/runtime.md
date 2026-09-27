# dewlab browser runtime: what a standalone C# page can reuse and what it should avoid

**Bottom line:** A C#-only page can reuse dewlab's look and its cross-origin isolation just by linking the existing files, with no edits. It can also reuse the output protocol, either by importing it or by copying about 25 lines. It cannot use `tutorial-runtime.js`, `shell.html`, `dewmini.js` or `dewmini-fs.js` without booting or depending on Python. The only shared piece that needs an edit is the CodeMirror bundle, if you want C# highlighting, and every dewlab page loads that bundle. So the C# page should ship its own editor bundle.

## 1. How a tutorial page boots

- **Scripts in the shell.** `coi-serviceworker.js` is a classic script in the head (`assets/shell.html:9`). The manifest is JSON (`shell.html:628`). Then come two modules: `tutorial-runtime.js` and `search.js` (`shell.html:629-630`).
- **What the runtime imports.** It statically imports `vendor/codemirror.bundle.js`, `site-relay.js`, `search-words.js` and `cell-widgets.js` (`tutorial-runtime.js:2-8`). It does **not** import `pyodide-engine.js`. It has its own copy of the worker client and the main-thread code paths (`tutorial-runtime.js:3648-3700`, `3822-3867`), and `DECISIONS_LOG.md:1672-1677` explains why.
- **KaTeX loads only when needed.** `katex.bundle.js` is imported dynamically, only on pages that contain maths (`tutorial-runtime.js:5185-5190`).
- **Pyodide starts downloading as soon as the page loads, not on first Run.** If a page has any cells, the init code calls `ensureBooted(currentManifest)` straight away (`tutorial-runtime.js:6445-6451`). The comment on the CI browser job confirms it: "a page with cells boots it even when no test presses Run" (`.github/workflows/tests.yml` browser job).
  - It loads `numpy`, `pandas` and `matplotlib` by default (`tutorial-runtime.js:15`), plus `pyodide-http` (`pyodide-worker.js:241`).
  - Jedi loads after boot and is not awaited (`pyodide-worker.js:265-267`).
- **Worker or main thread.** Hosted pages use a module Worker (`tutorial-runtime.js:3822-3825`, `3906-3908`). Only the offline standalone export runs on the main thread (`bootMainThread`, `tutorial-runtime.js:3648`).
- **What every page loads, whatever the language.** Every page, including the contents, tree and about pages, loads `tutorial-runtime.js` (`build.py:5860`, `6544`, `6601`, …). Sizes on disk:

| File | Bytes |
|---|---|
| `codemirror.bundle.js` | 619,166 |
| `tutorial-runtime.js` | 247,298 |
| `tutorial-style.css` | 144,140 |
| `katex.min.css` | 23,352 |
| `cell-widgets.js` | 5,516 |
| `site-relay.js` | 5,232 |
| `search.js` | 4,956 |
| `search-words.js` | 4,827 |
| `coi-serviceworker.js` | 4,678 |
| `accessible-fonts.css` | 1,250 |
| **Total** | **about 1.06 MB before Python** |

- **What the worker adds.** `pyodide-worker.js` (14,466), `module-watch.js` (1,588) and `tutorial_tools.py` (96,459), which is fetched at boot (`pyodide-worker.js:248-253`). Pyodide itself and its packages come from the jsDelivr CDN (`tutorial-runtime.js:10-14`).
- **Not loaded by tutorial pages.** `milkdown.bundle.js` (2.94 MB) and `standalone.bundle.js` (1.0 MB) are used only by the editor and the offline export.

## 2. input(), Stop and cross-origin isolation

- **Python `input()` is not supported.** There is no stdin handling anywhere: `setStdin`, `Atomics` and `stdin` return nothing across `assets/*.js`, `assets/*.py` and `compose/*.js`. Tutorials fake it with a list of pre-typed answers and a small `ask()` function (`DECISIONS_LOG.md:4875-4877`). The only `prompt()` calls are in the notebook's own UI, for renaming files and notebooks (`dewmini.js:357`, `3662`, `3700`).
- **How Stop works.**
  - After boot, if `crossOriginIsolated` is true, the page makes a `SharedArrayBuffer(4)` and sends it to the worker (`tutorial-runtime.js:3855-3858`). The worker passes it to `pyodide.setInterruptBuffer` (`pyodide-worker.js:362-363`).
  - Pressing Run on a running cell writes `2` (SIGINT) into the buffer (`tutorial-runtime.js:3869-3873`, `4803-4805`).
  - `canStop()` is true only on the worker path with a real buffer (`tutorial-runtime.js:6482`).
  - Restart falls back to `worker.terminate()` and a fresh boot (`tutorial-runtime.js:4911-4923`).
- **Cross-origin isolation on GitHub Pages: yes, through a shim.**
  - Pages can't set COOP/COEP headers, so dewlab uses the vendored `coi-serviceworker` v0.1.7 (`DECISIONS_LOG.md:1680-1685`). It rewrites responses to add COEP, CORP and COOP headers (`coi-serviceworker.js:36-50`). On the first visit it registers and reloads the page once (`:88`, `:97-109`).
  - `build.py` copies it to the **site root** so that its scope covers every page (`build.py:7633-7635`, `vendor-src/build-vendor.mjs:103-110`).
  - The standalone export strips it out (`build.py:5995-5997`).
- **What this means for C#.**
  - A page under `deweydex.github.io/dewlab/…` that includes `<script src="../coi-serviceworker.js">` gets `SharedArrayBuffer` and `Atomics.wait`. That is what a blocking `Console.ReadLine()` in a worker, or a cooperative stop flag, needs.
  - A **separate repo** would be at `deweydex.github.io/<repo>` (`README.md:12`). That is the same origin, so it shares localStorage, IndexedDB and OPFS with dewlab. But it is outside the `/dewlab/` service-worker scope, so it would need its own copy of the shim.
  - Under COEP, every cross-origin subresource needs CORS or CORP headers. Serving the .NET assets from the same origin avoids that.

## 3. Saved work

- **Tutorial pages.** The code lives inside `tutorial-runtime.js`; there is no separate module.
  - Keys follow `dewlab:<kind>:<tutorial id>` (`pageKey`, `tutorial-runtime.js:2980-2987`). The prefixes are `dewlab:progress:` (`:20`), `dewlab:custom-cells:` (`:2912`), `dewlab:world:` (`:2252`) and `dewlab:version:` (`:5853`).
  - The record is `{tutorial-id, tutorial-slug, tutorial-version, saved_at, world?, notes, highlights, cells:[{task_id, student_code, output_html, …}], siteEditors, questions, appCells}` (`saveNow`, `:5248-5300`). It is saved to localStorage and trimmed if the quota overflows (`:5301-5330`).
  - It is tied to module state (`cells`, `currentManifest`, `highlights`), so another page can't reuse it by inclusion.
- **The notebook.** `dewmini:notebooks:v1` in localStorage (`dewmini.js:14`), plus IndexedDB `dewmini-fs` and an OPFS subfolder `dewmini` (`dewmini-fs.js:6-9`, `:21`).
- **Pick a new prefix for C#.** `my-notes.js` reads every `dewlab:progress:*` key on the origin (`my-notes.js:3`, `20-33`). A C# page should use its own prefix, for example `dewcs:`, unless you want its records to show up in My Notes. It should also avoid `dewmini:*`.

## 4. The dewmini notebook

- **How it loads.** `notebook.html` loads only the shim and `dewmini.js` (`notebook.html:9`, `604`). `dewmini.js` statically imports `pyodide-engine.js`, `js-cell-engine.js` and `dewmini-fs.js` (`dewmini.js:1-7`). Importing them boots nothing: there is no Python boot in `init()` (`dewmini.js:4420-4455`). Pyodide boots **lazily** through `ensureSessionFor(cell)` (`:1941-1944`) and then `ensurePyodide()` (`:1914-1925`).
- **How cell types dispatch.** There is no registry, just string constants (`dewmini.js:33`) and if/else or ternaries:
  - `ensureSessionFor`, `canStopFor` and `requestInterruptFor` each choose between two options: JavaScript or Python (`:1941-1953`).
  - `executeCell` sends JavaScript to `jsEngine` and **every other type to Python** (`:1976-1981`).
- **How tightly it is tied to Python.**
  - Python is always enabled (`:41`, `:4259`) and the seed cells are Python (`:437-445`).
  - Export to `.ipynb` treats non-Python cells as markdown (`:2541-2551`).
  - The Files panel runs every file operation through the Pyodide filesystem and boots Python on init (`dewmini-fs.js:2`, `:110-147`, `:197-219`).
  - The Variables panel reads Pyodide's namespace (`dewmini.js:1993-2010`).
- **How the JavaScript engine was added (the best precedent for a C# engine).**
  - Its whole interface is `ensureSession`, `sessionReady`, `runCell(cellId, code)` returning `{ok}`, `canStop` (always false), `requestInterrupt` (does nothing) and `restart` (`js-cell-engine.js:100-152`).
  - It runs code in a sandboxed `srcdoc` iframe, created on first use (`:103-108`).
  - The iframe posts `{type:"output", cellId, kind:"stream"|"append", cssClass, text, markup}`. The parent passes these to `applyOutputEvent`, **imported** from `pyodide-engine.js` rather than copied (`js-cell-engine.js:1`, `:87-98`; `DECISIONS_LOG.md:2449`).
  - That import works only because `dewmini.js` has already called `engine.configure({getOutputEl})` (`dewmini.js:1900-1912`, `pyodide-engine.js:48-55`, `:63-64`).
  - The stream/append/clear protocol is the de facto output contract. The Python worker uses it too (`pyodide-worker.js:271-273`), and the tutorial runtime has its own copy (`tutorial-runtime.js:3789-3820`).
  - Wiring it into `dewmini.js` took **19** JavaScript-specific references (settings toggle, insert button, label, render branch, run, stop, restart, file and variables guards).
  - A batch of only JavaScript cells never downloads Python (`DECISIONS_LOG.md:2449`).
  - Separately, `docs/js-cell-engine-explained.md` tells readers to start with "the file banner", but the file has no banner (`js-cell-engine.js:1` is the import). The doc has drifted from the code.

## 5. CodeMirror bundle and the vendor freshness check

- **Languages bundled.** Direct dependencies are `lang-python`, `lang-html`, `lang-css`, `lang-javascript` and `lang-sql` (`vendor-src/package.json`, `codemirror-entry.js:8-12`).
- **Only these can be selected.** `createCodeEditor` indexes `OTHER_LANGUAGES[language]()` (`codemirror-entry.js:303-308`, `:337`), so `language: "csharp"` throws a TypeError. Nothing is exported for passing in extra extensions (the exports are at `:310`, `:373`, `:378`, `:388`, `:396`).
- **C# grammar is not a direct dependency.** `@codemirror/legacy-modes` 6.5.3 is in the lockfile only as a transitive dependency: `@milkdown/crepe` → `@codemirror/language-data` → `legacy-modes` (`package-lock.json:423-457`, `:1285`). Its `clike` C# mode ends up inside `milkdown.bundle.js`, not `codemirror.bundle.js`.
- **The freshness check covers the whole folder.** `build-vendor.mjs` deletes all of `assets/vendor/` and rebuilds it (`:16`), including `standalone.bundle.js` from `tutorial-runtime.js` (`:47-65`). CI runs `npm ci && npm run build` and fails on any `git diff` in `assets/vendor/` (`tests.yml:130-154`).
- **So adding C# to `codemirror-entry.js` costs every dewlab page.** It grows the 619 KB bundle that every page imports, and it also changes `standalone.bundle.js`.

## 6. What a C#-only page could reuse

**Reusable just by linking, with no edits:**

- `assets/tutorial-style.css`, including the `.dl-stdout` and `.dl-error` classes (`tutorial-style.css:826`, `842`) and dark mode (`:54`, `:84`).
- `accessible-fonts.css` and `favicon.svg`.
- A copy of the texture bootstrap snippet (`shell.html:28-42`), so the page shares `dewlab:texture` theme settings.
- The root `coi-serviceworker.js`.
- `pyodide-engine.js`'s `applyOutputEvent` and `clearOutput`: importing the module has no side effects, but you must call `configure()` first, and it pulls in `module-watch.js` and `cell-widgets.js`. Copying the roughly 25 lines is cleaner.

**The unlinked-folder pattern already exists:**

- `topic_editor/` is copied wholesale and is "never linked" (`build.py:7621-7625`). A `csharp/` folder would need the same four lines in `build.py`.
- A file dropped into `compose/` publishes with **no** `build.py` change (`:7607-7609`). But it would also end up in the offline notebook zip (`:6390`).
- No sitemap is generated. Add `<meta name="robots" content="noindex">` as `compose/dewmini.html:14` does.

**Avoid, or it needs edits:**

- `tutorial-runtime.js`: its top-level code depends on the shell's DOM and boots Pyodide as soon as a page has cells.
- `shell.html` and the manifest pipeline, which are Python-specific, including a Python reference tab (`shell.html:614-623`) and ipynb export as `python3` (`tutorial-runtime.js:3452-3457`).
- `dewmini.js`, where every non-JavaScript cell runs as Python.
- `dewmini-fs.js`, which goes through the Pyodide filesystem.
- `codemirror.bundle.js`, which can't highlight C#. Build a separate bundle, for example with `StreamLanguage` and `legacy-modes/clike`. Keep it in its own folder with its own build script, because `build-vendor.mjs` deletes `assets/vendor/` on every run.

**Where the Python assumptions bite:**

1. **Stop.** The Pyodide interrupt buffer has no .NET equivalent. Stop would mean `worker.terminate()` plus restarting the .NET runtime from scratch, or a flag the compiled code checks itself.
2. **Input.** dewlab has no stdin mechanism to copy. Real `Console.ReadLine()` needs `SharedArrayBuffer` plus `Atomics.wait` in a worker, which the shim makes possible.
3. **Execution model.** dewlab assumes one shared live namespace (`_page_globals`, and `RUNS_AGAINST_SESSION` at `dewmini.js:51`). C# compiles whole programs, so the Variables panel, the toolkit and the idea of cells sharing a namespace don't carry over.
4. **Output.** The stream/append/clear message protocol does carry over, unchanged.