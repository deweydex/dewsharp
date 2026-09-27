# C# beside dewlab: one recommendation

## Recommendation in one paragraph

Build C# as a small new repository with its own GitHub Pages site (placeholder deweydex/dewsharp, at deweydex.github.io/dewsharp/). Nothing in dewlab links to it and it is marked noindex. No dewlab file changes. The engine is the three spikes merged: Roslyn and .NET 10 in one warm Web Worker, a blocking `Console.ReadLine` over SharedArrayBuffer and Atomics, and cooperative Stop. The notebook follows one rule, taken from spike B's Model B: types carry down the page and variables stay in their cell. That keeps ordinary C#, adds nothing to the download and leaves no hidden state. Ship the untrimmed runtime, keep saved work in IndexedDB, and test on the classroom devices in week 0 before building any interface. All three designers reached this placement and this model on their own. They disagreed on scope, trimming and storage, which the last section settles.

## Placement and deployment

No file in dewlab changes. A folder inside dewlab would have two bad options:
- Commit 27–42 MB of runtime whose fingerprinted file names change on every rebuild (spike_a). That goes against dewlab's choice to fetch Pyodide rather than commit it.
- Build the runtime in dewlab's workflow, which puts a .NET SDK in front of every Python deploy.

A fork or dewcode brings in the 7,691-line build.py and the Python CI. Anything routed through build.py lands in search-index.json (build.py:7228).

The repo holds:
- engine/: the csproj, Program.cs, Notebook.cs and global.json;
- web/: index, notebook, host, worker, lesson, store, export, the editor bundle, style and check.html;
- lessons/ and tests/;
- README, CLAUDE.md, DECISIONS.md and two workflows.

I would change one thing in the designers' deploy. Pilot and maintenance cache the built runtime with actions/cache, so that pushing a lesson redeploys identical `_framework` files. Actions deletes cache entries that nobody has read for seven days. So the first lesson push after a quiet week would rebuild the runtime. Unless `dotnet publish` is byte-deterministic (unverified), that renames every file and every student downloads the runtime again.

Instead, build the runtime in its own step:
1. An engine workflow builds the runtime on a tag and attaches it to a GitHub Release.
2. The site workflow fetches that pinned version and checks its sha256, the same pattern as dev/fetch_pyodide.py.
3. It runs Playwright and publishes with upload-pages-artifact. That skips Jekyll, so `_framework/` is served.

If C# ever moves to /dewlab/csharp/, dewlab's deploy.yml would fetch the same asset. Both sites share an origin, so saved work survives that move.

**Isolation.** The repo serves its own copy of coi-serviceworker 0.1.7, scoped to /dewsharp/ only (verified in spike_c). Adopt the pilot's fix: set `window.coi = {coepCredentialless: () => false}` before loading it. By default the shim sends COEP credentialless to any browser that has neither `window.chrome` nor `window.netscape` (coi-serviceworker.js:67). That means Safari, and Safari is not known to support credentialless. Forcing require-corp costs nothing, because the page loads nothing from another origin.

## The notebook and its execution model

Each Run compiles one ordinary program from every type declared in the cells above plus the cell being run, and runs only that cell's statements. This is `NotebookAssemble` (spike-notebook/CsRunner/Notebook.cs:329) on spike C's interactive runner. Namespaces, interfaces, extension methods and a student's own Main behave as in Visual Studio. Objects print as `School.Student`, not `Submission#0+Student`. The worker keeps nothing the student owns, so Stop, memory recycling and a crash are all handled by starting a fresh worker.

What the student sees:
- **Labels.** Each cell is labelled with a file name, as the learner design proposed: "Planet.cs, used by the cells below" for types, "Program.cs" for statements.
- **Buttons.** Type cells get Build, which compiles only. Program cells get Run, which becomes Stop while the program runs.
- **Status line.** It separates compiling, "did not compile, so nothing ran", running, and "stopped with an exception on line 4 of Program.cs". That shows PDP's three kinds of wrong on every run.
- **Compiler messages.** They use Visual Studio's format, `Program.cs(3,19): error CS0103: …`, and clicking one moves to the line. Warnings appear in a quieter style.
- **Exceptions.** They show only the student's own stack frames, with file and line from the spike's PDB reader.
- **Input.** `ReadLine` opens an input row, and End input makes it return null.
- **Hint.** When CS0103 names a variable from another cell, one extra line says variables do not carry between cells.

Some pages will not be cross-origin isolated: Safari may fail, and some browsers have no service worker (the shim's own comment names Chrome incognito, coi-serviceworker.js:95). There, a "type your answers first" box supplies the stdin string the runner already accepts, and Stop falls back to killing the worker.

Left out of release 1:
- Run all, Restart and a Variables panel, because there is no state to reset;
- live variables;
- completion, which adds 6.4 MB gzip;
- shims for ReadKey, colours and Clear;
- file I/O and offline download.

One sharp edge from spike_b: a student class named `Program` anywhere above collides with the class generated for top-level statements (CS0260). So each page uses one style: either top-level run cells, or a classic `class Program { static void Main() }` in a type cell that runs on its own.

## First release and sequence

0. **Week 0 (1–2 sessions).**
   - Create the repo and put the spike code and findings in its first commit. The scratchpad will not outlive this session.
   - Merge spike-input's runner with NotebookAssemble. They have never run together, so the merged build must pass both harnesses (tools/input.mjs and tools/modelB.mjs).
   - Publish check.html in a trimmed and an untrimmed build. It reports isolation, boot time, first and warm Run times, a ReadLine round trip, both kinds of Stop, and memory after 100 runs.
   - Josh opens it on every device the class uses, several at once on the college network.
   - Go ahead only if every device is isolated, the first Run takes under about 6 s after the download, a warm Run under 1.5 s, and the tab survives 100 runs.
1. **Engine and CI (2 sessions).**
   - Pin the SDK, Roslyn 5.0.0, Basic.Reference.Assemblies.Net100 1.8.12 and the language version.
   - Keep spike_a's eight fixes and spike_c's output backpressure, output cap and dying flag, each with a regression test.
   - Set the culture to match the college machines.
2. **Notebook page (3–4 sessions).**
   - One warm worker, with a warm-up compile at boot so the first real Run takes about 1 s rather than 3 s.
   - Recycle the worker while idle once memory passes a threshold set from the week-0 data.
   - Save work to IndexedDB.
3. **Lessons (2 sessions, plus Josh's writing).** The lesson loader, the CI checks, two lessons and the scratch notebook.
4. **Download as a Visual Studio project (1 session)**, once the college IDE is known. CI builds each export with the native SDK and compares its output with the page's.
5. **Rehearse, then pilot** with one group for two to three weeks.

In all, about 25 files and 3,000–3,500 lines, most of the C# ported from the spikes. That is 9–12 sessions, or three to four weeks part-time.

## What is reused and what is not

Copied rather than linked live, so a dewlab edit cannot break the C# page in the middle of term:
- coi-serviceworker;
- the `dewlab:texture` bootstrap (assets/shell.html:28-42), so the student's theme, font and size carry over;
- the `--dl-*` tokens and the `.dl-stdout`/`.dl-error` rules;
- the self-hosted fonts (assets/vendor/accessible-fonts.css and fonts/). Without them the dyslexia-font setting is read but has no effect.

Ported as patterns rather than code:
- the exec fence with an `id:` line;
- cell and lesson ids as the key for saved work;
- the stream/append/clear output event;
- the end of deploy.yml;
- the noindex meta tag.

The engine is spike code: Program.cs, host.js, worker.js, NotebookAssemble and the csproj settings. The spike harnesses become the first tests.

Not reused:
- tutorial-runtime.js, which boots Pyodide on any page with cells;
- shell.html and build.py;
- dewmini.js and dewmini-fs.js, which have Python underneath;
- codemirror.bundle.js, which has no C# mode and is loaded by every Python page. The repo builds its own bundle with the legacy-modes clike C# mode;
- the `dewlab:progress:` storage prefix, which My Notes reads;
- the Scripting package and WasmSharp.

## Lessons and content

Lessons are Markdown files in the C# repo, rendered by notebook.html?lesson=<id>. They never go through build.py, whose CELL_TYPES allows only python and sql.

A runnable cell is a `csharp exec` fence whose first line is `id:`. Optional headers:
- `file:` names the cell's file;
- `expect: CS0103` marks a cell that is meant to fail with that error;
- `check-input:` and `check-output:` are read only by CI, so interactive examples are run before they ship.

A short contents page lists released lessons. A lesson missing from it is a draft, reachable only by its URL.

CI runs every cell in headless Chromium against the built site. It fails on:
- a compile error that no `expect:` line predicted;
- an `expect:` cell that compiles, or fails with a different code;
- output that differs from `check-output:`;
- a TypeLoadException;
- a lesson id or cell id that has disappeared from main.

The first two lessons aim at what Python cannot cover:
- **Lesson 1, compiling** (from the learner design). Students predict what C# prints when line 3 misspells a name. They then read CS0103 in its five parts, meet CS0029, CS0266 and CS1002, and learn to fix the first message first. This covers PDP LO9 and FOOP's "troubleshoot compiler errors".
- **Lesson 2, reading input.** A program that waits for typing; `int.Parse` failing on "three"; `TryParse`; do-while, discovered from a loop that has to ask twice; then a menu. This covers PDP's "reads data from a user" and FOOP's do-while.
- **Lesson 3, a class across cells**, teaches the notebook's rule. It follows before the pilot reaches classes.

## Risks and the tests that settle them

- **Safari and iPad isolation.** Use the require-corp override and run check.html on a real iPad and a real Mac. The WebKit browser in CI is only an early signal.
- **Chromebook speed and memory.** Every timing so far came from a 4-CPU container, and memory climbs to 208–250 MB over 200 runs. check.html on the classroom device settles it.
- **The merged engine is unproven.** Both harnesses must pass against it in week 0.
- **Shared Wi-Fi on the first visit.** The untrimmed build is 15.0 MB in 184 requests; the trimmed one is 9.0 MB in 65. Test several devices at once in week 0, and have students open the link once before the lesson.
- **Upgrades reopening the eight traps.** Pin every version and keep one test per trap. Stay on .NET 10 LTS, supported to November 2028, because .NET 11 moves browser .NET to CoreCLR.
- **The page drifting from Visual Studio.** CI builds the exports with the native SDK.
- **Output floods that stop the Stop button working.** A regression test for backpressure.
- **Same origin as dewlab's editor token.** Student code runs only in the worker and the page loads no third-party scripts. Get a custom domain before the page ever runs code someone else wrote.

## Decisions for Josh

1. The repo name. It becomes the address and must not change once a class has used it. Also whether the repo is public or private: Pages on a private repo needs a paid plan.
2. Which group pilots it, from which week, and on which devices. FOOP fits best, because 5N0541 names C#, an IDE, compiler errors and do-while.
3. Whether "types carry down, variables don't" is acceptable. The hybrid, which keeps live variables, would come only if the pilot shows students need them.
4. The college's IDE and .NET version. These fix the language version, the nullable setting, implicit usings, the culture and the export.
5. Top-level statements or `class Program` as the house style.
6. Which voice rules apply: dewlab's style guide, or dewcode's note that you had it removed.
7. Untrimmed, or switch to trimmed after week 0.
8. Whether dewlab gets one documentation-only DECISIONS_LOG entry saying C# lives elsewhere by design, so a later session does not weave it back in. I recommend it.

## Disagreements resolved

**Trimming: untrimmed.** Pilot and learner chose the 9.0 MB trimmed build, which keeps only a list of 23 assemblies. Any program that touches an assembly outside that list fails with a TypeLoadException before printing anything (spike_a). CI can check the lesson cells, but not what students type into their own cells. System.Text.Json and System.Collections.NonGeneric are not on the list. Six extra megabytes on the first visit, then served from the cache, is the cheaper cost. If week 0 shows trouble, switching is one property, but only together with a list of test programs for the APIs students use.

**Storage: IndexedDB**, as maintenance proposed. The 5 MB localStorage quota is shared across the whole origin. When it fills, dewlab's save tells the student it could not save (tutorial-runtime.js:5301-5330). The C# site should never cause that.

**Build, but no Run all or Restart.** Without Build, a type cell gives no feedback until a cell below it runs. There is no state for Restart to clear.

**Warnings shown quietly**, because FOOP is assessed in an IDE that shows them.

**The typed-ahead fallback and the export ship in release 1.** The fallback reuses a path the runner already has. The export matters because FOOP requires code produced in an IDE.

**Lesson checks run in the browser**, not in a native .NET checker, because only the WebAssembly build shows WebAssembly failures.

**Where the evidence contradicts a designer:**
- The learner design, following research.md §4, says the shim falls back to require-corp on Safari. The code does the opposite: Safari is the browser it sends credentialless.
- The pilot blames CS0260 on mixing top-level statements with a static Main. Spike_b traces it to a class named `Program`.
- Maintenance's "about 23 MB a Python page already downloads" rests on a figure for the Python packages that is not in the evidence.
- Maintenance also calls the C# shim harmless if it moved inside /dewlab/. That misses that the shim posts its COEP setting to whichever service worker controls the page (coi-serviceworker.js:75-79), and dewlab's root shim keeps one setting for all pages. Delete the C# copy on any move.
- The 114 MB memory figure cited against the hybrid was measured for script submissions. Nobody measured the hybrid's memory.