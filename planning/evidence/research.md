# C# in the browser: external research, as of 27 September 2026

## Headline findings

1. **Compiling and running C# entirely in the browser works, including a real interactive `Console.ReadLine()`.** I built a small prototype in scratch (.NET SDK 10.0.401, Roslyn 5.0.0, Basic.Reference.Assemblies.Net100, untrimmed) and ran it in headless Chromium 153. It worked with a normal blocking `ReadLine`, an OOP program with `static void Main()`, `$"{x:F2}"`, LINQ, async Main and real exception messages.
2. **WasmSharp is not usable as a dependency for teaching.** I built its npm package (0.10.2) with Vite and ran it. It fails to compile `Console.ReadLine`, `Console.Write`, `Console.WriteLine()`, `$"{x:F2}"` and `list.Sum()`. It also crashes on a classic `static void Main()`. It proves the idea works, but it is not a base to build on.
3. **First-visit payload is about 11–15 MB compressed.** GitHub Pages serves gzip only, so expect about 15 MB. Warm runs take 30–300 ms, but booting the runtime and doing the first compile costs about 3 s even with every file cached.
4. **Microsoft itself left in-browser C#.** Try .NET retired on 31 Dec 2025, and the Microsoft Learn C# tutorials now use GitHub Codespaces.
5. **A separate repo on the same GitHub account is not a separate origin.** `deweydex.github.io/<repo>` shares an origin (and so localStorage) with `deweydex.github.io/dewlab`.

## 1. WasmSharp (JakeYallop/WasmSharp)

- **Activity.** Last commit 2025-11-16 (README only). Last code change 2025-08-18 ("Complete update to .NET 10"). No GitHub releases or tags. 12 stars, 2 forks, 1 open issue, one maintainer. Licence Apache-2.0.
- **Packages.** `@wasmsharp/core` 0.10.0–0.10.2 were all published on 2025-08-18. `@wasmsharp/vite-plugin` 0.10.0 pins `@wasmsharp/core` to exactly 0.10.0 as a peer, so npm refuses to install it next to 0.10.2 without `--legacy-peer-deps`. There is no NuGet package.
- **Needs Vite.** The shipped `dotnet.js` uses bundler-style imports (`import x from "./Foo.dll"`, 156 of them). Served statically without Vite it fails ("Expected a JavaScript-or-Wasm module script"). It also imports Comlink from unpkg.com at runtime (`WasmCompiler.ts:3-4`).
- **Build choices behind the failures.**
  - Full trimming: `Directory.Build.props:9,14`, `TrimMode=link`.
  - Webcil turned off, with a TODO saying the author could not load Webcil DLLs (`WasmSharp.Core.csproj:19`).
  - It uses its own trimmed runtime assemblies as Roslyn metadata references, including every satellite resource assembly (`initializeWasmSharpModule.ts:79-93`). Anything the trimmer removed is invisible to student code.
- **What it supports.**
  - Compile, run, diagnostics and completion (it references Roslyn Features/Workspaces).
  - One document per compilation (`CodeSession.cs:25`).
  - No stdin.
  - stdout is collected in a `StringWriter` and returned only when the run ends (`CodeSession.cs:176-207`).
  - The entry point is always invoked with an args array (`:179,:189`). That is why `static void Main()` throws `TargetParameterCountException`.
- **Other probe failures.** Exceptions show resource keys ("Arg_IndexOutOfRangeException"), `Task.Delay(int)` does not compile, and `Console.ForegroundColor` does not exist.
- **What worked.** Records, abstract classes and interfaces, primary constructors, List/Dictionary/Stack/Queue/HashSet, string methods, Math, Random and pattern matching.
- **Size.** The npm package unpacks to 41.6 MB (180 files). Excluding satellites it is 30.5 MB raw, 11.3 MB gzip, 8.9 MB brotli.
  - The live demo (Cloudflare Pages) transferred 37.5 MB in 156 requests, because the `.dll` files arrived uncompressed and only `.wasm` was brotli-compressed.
- **Timing (localhost, no network).** Init 1.5–1.7 s, first compile and run 1.7–1.8 s, warm runs 25–450 ms.
- **Maintenance risk.** High: single maintainer, dormant for over a year, still on Roslyn 4.14.

## 2. Other prior art

| Tool | Where it compiles and runs | Status |
|---|---|---|
| Try .NET (dotnet/try) | In the browser (Blazor) | Retired 2025-12-31; repo archived 2025-12-03. try-dotnet page now redirects to dotnet.microsoft.com; try.dot.net TLS is broken |
| Microsoft Learn "Tour of C#" | GitHub Codespaces + file-based apps | Page dated 2026-02-09 |
| DotNetLab / lab.razor.fyi | In the browser, in a Web Worker | Very active (commit 2026-09-20, .NET 11 RC1), MIT. Untrimmed. Embeds `Microsoft.NETCore.App.Ref`. Measured 43.9 MB brotli in 362 requests (includes Razor, VB, decompiler, FluentUI). No stdin |
| BlazorRepl → Telerik REPL | In the browser (Blazor components) | Source withdrawn 2021; now closed-source |
| SharpLab | Server (Azure containers) | Last commit 2024-11-19. ReadLine reported not to work well |
| .NET Fiddle | Server | ReadLine support reported, **not verified** |
| Uno Playground | Browser, but it renders XAML, not a C# console | Per Uno's description, **not checked in detail** |

## 3. .NET 10 browser facts that matter for a Roslyn host

- **Webcil.** It is on by default: assemblies ship as `.wasm`-wrapped Webcil, not PE files, so Roslyn cannot use them as references. There are three ways round it:
  - Turn Webcil off and serve `.dll` files. Some CDNs won't compress these.
  - Convert Webcil back to PE. DotNetLab does this via `MetadataReferenceService.BlazorWasm` 0.0.1 (January 2024, one maintainer).
  - Compile against reference assemblies. This is the cleanest option.
- **Basic.Reference.Assemblies 1.8.12** (published 2026-09-16, MIT).
  - Net100: 6.3 MB DLL, about 2.2 MB gzip.
  - Net100.Wasm: 22 MB, made from the browser runtime pack 10.0.7.
  - Net110 also exists, plus Net80, Net90 and older.
- **Trimming.** DotNetLab turns it off ("Cannot trim because we dynamically execute programs…", `Directory.Build.props:26-29`). WasmSharp shows what happens if you don't.
- **Exception messages.** Browser Release builds default to resource-key messages. Setting `UseSystemResourceKeys=false` gave "Index was outside the bounds of the array." in my prototype.
- **Web Worker.** Supported and documented (Microsoft Learn "NET on Web Workers", updated 2026-07-22); .NET 11 adds a `blazorwebworker` template. `[JSImport]`/`[JSExport]` work inside the worker.
- **Multithreading.** Still experimental (`WasmEnableThreads`, needs COOP/COEP). .NET 11 is moving browser .NET to CoreCLR. Don't depend on threads.
- **Console input.** `ReadLine`, `In` and `SetIn` are marked `[UnsupportedOSPlatform("browser")]` in the .NET 10 reference source. But `Console.SetIn` only stores the reader (`Console.cs:659-668`), so a host can install its own blocking reader. That is what my prototype does.
- **Caching.** .NET 10 relies on the ordinary HTTP cache (dotnet/aspnetcore#64866). GitHub Pages sends `max-age=600`.

### Prototype results

The scratch prototype is about 100 lines of C# plus 60 lines of JS, running Chromium 153 on localhost.

- **Payload.** 182 requests, 39.8 MB raw, **14.8 MB gzip, 11.0 MB brotli**. That is without completion; Roslyn Workspaces/Features for completion would add roughly 3–4 MB gzip (an estimate).
- **Timing.** Boot 1.2–1.7 s, first compile 1.5–2.0 s, warm runs 30–280 ms. 20,000 lines streamed in about 160 ms.
- **Gotchas the host must handle.**
  - It must inject the implicit global usings; without them, `Console` gives CS0103.
  - Roslyn's entry point for async Main is a synchronous wrapper. Invoking it throws "Cannot wait on monitors on this runtime", so the host must call the async method itself.
  - `Console.ForegroundColor` throws `PlatformNotSupportedException`. `ReadKey` and cursor or colour menus won't work without a shim.
- **Consequence for the plan.** The plan's baseline is one disposable worker per Run (`csharp-plan.md:176`). By my measurements that costs about 3–3.7 s per Run even with every file cached, which is above its own target of about 2 s for a warm run (`:630`).

## 4. Interactive stdin

- **SharedArrayBuffer + `Atomics.wait` in the worker.** Proven in my prototype: the prompt text flushes first, then the worker blocks, and EOF comes back as `null`. It needs `crossOriginIsolated`.
  - **dewlab already has this.** It vendors coi-serviceworker 0.1.7 (`vendor-src/package.json:25`), loads it on every page (`assets/shell.html:9`, `compose/notebook.html:9`), and uses a SharedArrayBuffer for Pyodide interrupts (`assets/pyodide-engine.js:144-145`). The interrupt-buffer setup is also in `assets/tutorial-runtime.js:3857-3858`.
- **coi-serviceworker caveats.**
  - It reloads the page on the first visit.
  - It must be a separate same-origin file (not from a CDN), served over HTTPS or localhost.
  - It defaults to COEP `credentialless`, which Chrome 96+ and Firefox 119+ support and Safari does not. On Safari it falls back to `require-corp`, which blocks cross-origin embeds without CORP headers, such as YouTube iframes.
  - Last commit December 2023.
- **Document-Isolation-Policy.** Gives per-document isolation with no requirements on subframes, but only Chrome 137+ on desktop has it.
- **Synchronous XHR to a service worker.** The `sync-message` library (0.0.12, last published September 2023) works without cross-origin isolation.
- **JSPI.** Now in all three engines: Chrome 137 (May 2025), Firefox 153 (21 Jul 2026), Safari 27 (14 Sep 2026), per MDN compat data. **.NET does not use it**: dotnet/runtime#80904 is open with milestone "Future".
- **How Pyodide handles `input()`.** The main-thread default is `prompt()`. In a worker, its docs recommend the SharedArrayBuffer/`Atomics.wait` pattern with `checkInterrupt`. JupyterLite uses a SharedArrayBuffer first and falls back to a service worker.

## 5. CodeMirror 6

- `@codemirror/legacy-modes` 6.5.4 (2026-09-02), clike `csharp`: a tokenizer only, but its keyword list includes `record`, `init` and `required`. Adequate for highlighting.
- `@replit/codemirror-lang-csharp` 6.2.0 is a Lezer grammar, last published 2023-09-13. Treat it as stale.
- There is no official `@codemirror/lang-csharp`. Diagnostics and completion have to come from Roslyn in the worker.

## 6. GitHub Pages

- **Headers I observed** on dotnet.github.io/blazor-samples: `application/wasm`, gzip applied when requested, brotli never, `max-age=600`, `access-control-allow-origin: *`.
- **No custom headers**, so COOP/COEP needs the service-worker shim.
- **Limits.** Site 1 GB; soft bandwidth 100 GB/month; soft 10 builds/hour; 10-minute deploy timeout. Git warns at 50 MiB and blocks files over 100 MiB.
- **Brotli workaround.** Microsoft documents decoding brotli in the client with a `decode.js` script.
- **Origin.** Project sites live at `<owner>.github.io/<repo>`, so every project site on one account shares an origin. dewlab lives at deweydex.github.io/dewlab (`README.md:12`), and the editor keeps a GitHub token in localStorage there (`assets/editor.js:6`, `:1053`).
  - A new repo on the same account shares that storage.
  - A genuinely separate origin needs a separate org or account, or a custom (sub)domain.

## 7. Server-side alternatives

- **Piston.** The public API has not been free since 15 Feb 2026. Keys go only to non-commercial educational projects, and not to "temporary projects". Self-hosting needs privileged Docker.
- **Judge0.** GPL-3.0; last release v1.13.1 (18 Apr 2024), after three sandbox-escape CVEs (2024-28185, -28189, -29021). Its CE instance has C# only via Mono 6.6; extra-ce has .NET SDK 8.0.302. stdin is supplied up front, not interactive. Self-hosting needs privileged containers and cgroup v1.
- **Codespaces.** Personal accounts get 120 compute hours a month on Free and 180 on Pro (the docs say "hrs"; I believe these are core-hours, not checked). Organisations get no free quota, and every student needs a GitHub account.
- **Your own small function** (Azure Function, Cloudflare Worker). Compiling is easy; running untrusted student code safely is the hard part, as Judge0's CVEs show. Cloudflare Workers cannot run .NET natively — **not verified in detail**.

Trade-offs for a school, weighed against the in-browser option:

| | Server-side | In-browser |
|---|---|---|
| Download to the device | Tiny | 11–15 MB per device on first visit |
| Full .NET (colours, `ReadKey`) | Yes | No, without shims |
| Needs a network connection to run code | Yes | No |
| Accounts or keys | Needed | None |
| Cost and upkeep | Yes | No server to run |
| Student code | Leaves the device (safeguarding and data protection) | Stays on the device |

## Not verified

- Whether GitHub Pages compresses `.dll` files.
- Timings on a real classroom device. Mine came from this container's CPU; a Chromebook is probably slower.
- .NET Fiddle's `ReadLine` behaviour.
- The size WasmSharp would reach if it were fixed.

## Sources (all accessed 2026-09-27)

- WasmSharp: github.com/JakeYallop/WasmSharp (cloned at 2f8c93b); registry.npmjs.org/@wasmsharp/core; wasmsharp.pages.dev (measured)
- DotNetLab: github.com/jjonescz/DotNetLab (cloned at fe8db1c); lab.razor.fyi (measured)
- Try .NET: raw.githubusercontent.com/dotnet/try/main/README.md; github.com/dotnet/try; learn.microsoft.com/dotnet/csharp/tour-of-csharp/tutorials/ (dated 2026-02-09)
- github.com/BlazorRepl/BlazorRepl; github.com/ashmind/SharpLab; platform.uno/blog/the-state-of-webassembly-2025-2026/ (2026-01-19)
- NuGet: Basic.Reference.Assemblies.* (api.nuget.org); github.com/jaredpar/basic-reference-assemblies; nuget.org/packages/MetadataReferenceService.BlazorWasm; microsoft.netcore.app.runtime.mono.browser-wasm 10.0.12
- raw.githubusercontent.com/dotnet/runtime/main/src/mono/wasm/features.md; dotnet/runtime release/10.0 `System.Console/ref/System.Console.cs` and `src/System/Console.cs`; github.com/dotnet/runtime/issues/80904; github.com/dotnet/aspnetcore/issues/64866
- learn.microsoft.com/aspnet/core/client-side/dotnet-on-webworkers (updated 2026-07-22); learn.microsoft.com/aspnet/core/blazor/host-and-deploy/webassembly/github-pages (updated 2026-07-22)
- github.com/mdn/browser-compat-data (`webassembly/jspi.json`, COEP data, commit of 2026-09-26); github.com/mdn/browser-compat-data/pull/30552; developer.chrome.com/blog/document-isolation-policy
- github.com/gzuidhof/coi-serviceworker (cloned); github.com/alexmojaki/sync-message; pyodide.org/en/stable/usage/streams.html; jupyterlite.readthedocs.io/en/latest/howto/content/python.html
- npm: @codemirror/legacy-modes, @replit/codemirror-lang-csharp; cdn.jsdelivr.net/npm/@codemirror/legacy-modes@6.5.4/mode/clike.js
- docs.github.com: github-pages-limits, about-github-pages, about-large-files-on-github, codespaces billing; github.com/orgs/community/discussions/54257; dotnet.github.io/blazor-samples (headers observed)
- raw.githubusercontent.com/engineer-man/piston/master/readme.md; ce.judge0.com/languages; extra-ce.judge0.com/languages; judge0 LICENSE and CHANGELOG; tantosec.com/blog/judge0/ (2024-04-29)

All my working files are in `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/research-csharp/`:
- `wasmsharp-probe-results.txt` — the WasmSharp probe results
- `prototype-probe-results.txt` — the prototype probe results
- `proto/` — the prototype source (`Program.cs`, `Proto.csproj`, `wwwroot/worker.js`, `wwwroot/index.html`)
- `viteapp/` — the Vite harness used to run WasmSharp