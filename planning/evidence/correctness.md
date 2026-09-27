## Corrections, most serious first

1. **Keeping the runtime files byte-identical does not save students a download. Contradicted by live headers.** GitHub Pages stamps every file's `Last-Modified`/`ETag` at deploy time, not from the artifact.
   - dewlab's unchanged `coi-serviceworker.js` and `assets/vendor/katex.min.css` report `last-modified: 11:05:14 GMT` with `etag: W/"6ab8f86a-…"` (0x6ab8f86a is that timestamp).
   - That run's checkout took 11:00:26–29 and `deploy-pages` ran 11:04:36–11:05:24 (Actions API, publish run of 2026-09-27).
   - `cache-control: max-age=600` and the loader fetches assemblies through the ordinary HTTP cache. So any push to the site that serves `_framework` makes every student re-download the whole runtime (about 15 MB, 184 requests) on their next visit more than 10 minutes later.
   - This undoes the stated reason for the release-asset step ("pushing a lesson redeploys identical `_framework` files"), the line "then served from the cache", and "have students open the link once before the lesson".
   - Fix options (unverified):
     - serve `_framework` from a same-origin site that is redeployed only on engine releases, for example a second repo at `/dewsharp-runtime/vN/`;
     - have the page's service worker cache files cache-first by their fingerprinted names;
     - or push no lessons during term hours.
   - The move to `/dewlab/csharp/` makes this far worse. dewlab publishes several times a day, and every publish would throw away every C# student's cached runtime.

2. **The later move into dewlab is described without its mechanics.**
   - `upload-pages-artifact` + `deploy-pages` replace the whole site (deploy.yml:98-103). If the C# fetch step is made skippable so Python publishes are not blocked (build-publish.md §6B), one failed fetch publishes a site with no `/dewlab/csharp/`, and live links 404 until the next good deploy. If the step is not skippable, a C# failure blocks every Python publish.
   - The address also changes from `/dewsharp/` to `/dewlab/csharp/`. That breaks the recommendation's own rule that the address "must not change once a class has used it", so a redirect page must stay at `/dewsharp/`.
   - In the separate repo as recommended, a failed build or test step stops before the upload and the last good deployment stays live. That part is correct.

3. **"Get a custom domain" conflicts with "saved work survives a move".**
   - A custom domain is a new origin. IndexedDB work does not follow, the address changes, and the `dewlab:texture` settings can no longer be read.
   - It must be set on the dewsharp repo itself. The user-site repo exists (deweydex.github.io/ returns 200), and a domain set there would move dewlab too.
   - Decide in week 0, not after the pilot.

4. **The sha256 check is not "the same pattern as dev/fetch_pyodide.py". Contradicted.** fetch_pyodide.py pins `PYODIDE_VERSION` and downloads the release tarball, with no checksum (no `hashlib` or `sha256` in the file). The check would be new code.

5. **"Anything routed through build.py lands in search-index.json (build.py:7228)". Contradicted.** `write_search_index(tutorials, …)` loops over tutorials only (build.py:7205-7229). Folders copied wholesale (compose, topic_editor, topic_tree_game at build.py:7603-7626) appear in no index (build-publish.md §2).

6. **The "two bad options" for a dewlab folder leave out option B.** Option B commits nothing and needs no .NET SDK: `deploy.yml` fetches a pinned asset (build-publish.md §6B), which is the route the recommendation itself proposes for a later move. The real costs of B are items 1 and 2.

7. **The rebuttal about the shim after a move is half right.**
   - Supported: `coi-serviceworker.js:75-79` posts its COEP value to whichever service worker controls the page, before the early return at `:88`.
   - But it only does harm together with the `window.coi` override, and only on browsers without `window.chrome` or `window.netscape`. On Chrome and Firefox, dewlab pages already post `false` (`:67`).
   - "Delete the C# copy" does not fix it. The same override loaded through `../coi-serviceworker.js` posts the same value, and dropping the override loses isolation on Safari.
   - After a move, Safari's COEP mode becomes a decision for all of dewlab.
   - The service worker's flag is a module global that resets to require-corp whenever the worker restarts (`:2`). So there is no fixed "one setting": the last page to post wins.

8. **Build vs classic Main contradict each other.**
   - Type cells get "Build, compiles only", yet the classic style needs "`class Program { static void Main() }` in a type cell that runs on its own".
   - In the spike, NotebookAssemble with no statements and a student `static Main` makes that Main the entry point (Notebook.cs:430-437), and CompileAndRun then runs it. So Build on any type cell below a Main would execute the program.
   - No compile-only path exists for Model B. The only library emit is the hybrid's `LibBuild` (Notebook.cs:313).

9. **The recommended untrimmed build has never run the notebook or input engine.**
   - Model B (spike_b out/nb) and the interactive runner (spike_c: 64 files, 9.44 MB) ran only the trimmed build.
   - "About 1 s rather than 3 s" was measured only on the trimmed build (964 ms, after a 1.74 s warm-up, spike_a). This is unsupported for the untrimmed build.

10. **Worker restarts can fail for a while after an engine release (inference, unverified).**
    - `dotnet.js` has no fingerprint in its name and embeds the list of fingerprinted file names with sha256 integrity (checked in spike-program `out/notrim/_framework/dotnet.js`).
    - Each deploy deletes the old files. A tab that restarts its worker (Stop on a silent loop, or memory recycling) within 10 minutes of a runtime change can load a cached old `dotnet.js`, get 404s and fail to boot.
    - Release engine changes outside class time, or keep the previous version under a versioned path.

11. **The citation `Notebook.cs:329` is wrong.** NotebookAssemble is at `spike-notebook/CsRunner/Notebook.cs:366` (doc comment from `:359`). Line 329 is inside `LibBuild`, the hybrid.

12. **dewcode's build.py is 4,461 lines, not 7,691** (`wc -l`). The 7,691 figure applies only to a fork of dewlab.

13. **The trimming description is imprecise.** 23 BCL assemblies are rooted whole (CsRunner.csproj:23). The others ship trimmed, not absent (64 files), and the failure happens per trimmed-away API, not per assembly. It is true that NonGeneric is not on the list, but no failure was measured for it.

14. **The "23 MB" rebuttal is overstated.** designs.md:521 gives a source: 17.6 MB of wheels from jsDelivr `Content-Length`, plus the 5.45 MB core. Python pages do load numpy, pandas and matplotlib by default (tutorial-runtime.js:15). The figure is unverified, not unsourced.

15. **The 114 MB rebuttal is weak.** The hybrid's statement cells are the same chained script submissions whose growth produced 114 MB. "Nobody measured the hybrid" is true.

16. **The "dying flag" only matters for the sync-XHR transport** (spike-input worker.js:22,33,53), which the recommendation drops.

17. **Minor points.**
    - The failed-save message is at tutorial-runtime.js:5336. Lines 5301-5330 are the step that first drops large outputs and tries again.
    - The "Chrome incognito" at coi-serviceworker.js:95 is the shim's own comment. As far as I know, Chrome incognito does support service workers now (not checked).
    - The page says "first two lessons" but lists three.
    - On a new repo, set the Pages source to "GitHub Actions" by hand. Don't rely on `configure-pages` `enablement: true` with GITHUB_TOKEN (unverified).

## Deployment mechanics that check out

- **Two sites on one account.** A separate repo's site at `deweydex.github.io/<repo>/` sits alongside `/dewlab/` and the live user site at `/`. Each repo deploys on its own, and `concurrency: pages` is per repo. `/dewsharp/` and `/dewcode/` currently return 404, so the name is free.
- **No service-worker interaction.** Scopes `/dewsharp/` and `/dewlab/` do not nest, and the user site at `/` registers no service worker (checked live). Neither worker can take the other's pages.
- **Forking.** GitHub does not allow forking your own repo into the same account (build-publish.md §6C). The recommendation rejects a fork for other reasons, which is fine.
- **Jekyll.** `upload-pages-artifact` skips Jekyll, so `_framework/` is served (build-publish.md §4).

## Claim ledger

| Claim | Verdict | Evidence |
|---|---|---|
| Shim sends credentialless to browsers without `window.chrome`/`netscape`, so Safari gets it | SUPPORTED | coi-serviceworker.js:67 (0.1.7 has no fallback logic) |
| Learner design's "falls back to require-corp on Safari" is wrong | SUPPORTED | :67; research.md:81 is the source of the error |
| `window.coi` override works | SUPPORTED | :64-71 (`...window.coi`) |
| Shim posts its COEP value to the controlling service worker | SUPPORTED | :75-79 |
| Chrome incognito comment | SUPPORTED as a quote | :95 |
| Scoping to own folder, one reload, no double download | SUPPORTED (local server only) | spike_c scope.log |
| `/dewlab/csharp/` needs no shim of its own | SUPPORTED | spike_c |
| Same origin shares localStorage and IndexedDB | SUPPORTED | research.md:9,100; my-notes.js:22 |
| 5 MB localStorage quota shared; dewlab save fails when full | SUPPORTED | tutorial-runtime.js:5303-5336 |
| Texture bootstrap at shell.html:28-42 | SUPPORTED | |
| Fonts in assets/vendor/accessible-fonts.css + fonts/ | SUPPORTED | |
| `--dl-*`, `.dl-stdout`, `.dl-error` | SUPPORTED | tutorial-style.css:12, 826, 842 |
| `CELL_TYPES` = python, sql | SUPPORTED | build.py:165 |
| Pages eagerly booted on any page with cells | SUPPORTED | runtime.md, tutorial-runtime.js:6445-6451 |
| CodeMirror bundle has no C# mode | SUPPORTED | runtime.md §5 |
| `dewlab:progress:` is read by My Notes | SUPPORTED | runtime.md §3 |
| noindex precedent | SUPPORTED | compose/dewmini.html:14 |
| Upload skips Jekyll | SUPPORTED | build-publish.md §4 |
| Pages on a private repo needs a paid plan; Actions cache evicted after 7 days unread | SUPPORTED | external GitHub docs, not in the evidence |
| 27–42 MB raw; 9.03 MB/65 requests and 15.03 MB/184 requests | SUPPORTED | spike_a (local server, not Pages) |
| Names "change on every rebuild" | PARTLY | spike_a says "whenever trimming output changes"; the recommendation elsewhere calls this unverified; moot given item 1 |
| First run 2.5–3 s; warm 350–450 ms; Stop 12–83 ms | SUPPORTED | spike_a, spike_c |
| Memory 0.5–0.9 MB per run, 208–250 MB at 200 runs | SUPPORTED | spike_a |
| Scripting API fails; Model B adds 0 bytes; completion +6.4 MB | SUPPORTED | spike_b |
| Model B keeps ordinary C# and prints `School.Student` | SUPPORTED | spike_b modelB.log |
| CS0260 comes from a class named `Program` | SUPPORTED | spike_b |
| Typed-ahead stdin path exists | SUPPORTED | spike-input Program.cs:99 (`StringReader(stdin)`) |
| The two engines were never merged; both harnesses exist | SUPPORTED | spike-input/tools/input.mjs, spike-notebook/tools/modelB.mjs |
| Pinned versions; .NET 11 moves to CoreCLR | SUPPORTED | spike_a, research.md:58 |
| .NET 10 LTS to November 2028 | SUPPORTED | external |
| All three designers chose a separate repo and Model B | SUPPORTED | designs.md:4, 300, 592, 53, 353, 624 |
| Pilot and learner chose trimmed; maintenance chose IndexedDB | SUPPORTED | designs.md:24, 598, 492 |
| FOOP names C#, an IDE, compiler errors, do-while; PDP LO9 | SUPPORTED | curriculum-dewcode.md §1 |
| Search-index claim, sha256 pattern, Notebook.cs:329, dewcode 7,691 lines, "served from the cache" | CONTRADICTED | items 1, 4, 5, 11, 12 |
| ~1 s first Run on the untrimmed build; Safari works with require-corp | UNSUPPORTED | not measured; untested |