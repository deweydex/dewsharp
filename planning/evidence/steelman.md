## Placement: the case for /dewlab/csharp/

**Steelman.** The recommendation argues that a folder inside dewlab leaves two bad options: commit 27–42 MB of runtime, or put a .NET SDK into dewlab's deploy. There is a third option, and the recommendation's own deploy design makes it cheap. The engine repo tags a runtime release. dewlab's `deploy.yml` then fetches it after `build.py --clean` and checks its sha256, exactly as `dev/fetch_pyodide.py` does for Pyodide (build-publish.md option B). That puts no SDK in dewlab, no binaries in its history, and no change in `build.py`. It also adds nothing to `search-index.json`, because the folder never goes through `build.py`.

Isolation is already solved there: spike_c showed a `/csharp/` page with no shim of its own isolated by dewlab's root shim. The folder also keeps the address permanent from day one. That matters because Decision 1 says the address must never change once a class has used it, yet the graduation path moves the page to `/dewlab/csharp/`.

One repo also means one set of house rules. The style guide, the cell-id contract, CONTRIBUTING's "a change isn't finished until its document is" and DECISIONS_LOG would all live in one place. The recommendation instead copies tokens and fonts that will drift, and it needs Decision 6 ("which voice rules apply"). DECISIONS_LOG:3073 already records the cost of the "port in shape, not code" boundary: every wording change is made twice, by hand.

**What survives the steelman.** The Safari override cannot be scoped inside dewlab. The root worker keeps one COEP flag, set by whichever page loaded last (coi-serviceworker.js:75-79). So forcing require-corp for C# means changing it for every Python page. That is a dewlab-wide decision, not a C# one. Two other points also stand:
- In the folder, every Python push republishes C#, and a failed fetch either blocks a typo fix or silently drops the page.
- If the pilot fails, a separate repo can be deleted. A folder leaves workflow steps and log entries behind in dewlab.

**Verdict.** Keep the separate repo, but change the argument and one decision.
- Drop the "two bad options" framing. The real reasons are the single COEP flag, a pilot shipping on its own schedule, and being able to delete it.
- Decide in week 0 that `/dewsharp/` is the permanent address. dewlab tutorials then link to it in their prose, and nothing ever moves.
- A side effect worth knowing: dewlab's Python pages already send credentialless to Safari. So the week-0 iPad test also tells Josh whether dewlab's own Stop button works there.

## Notebook: the case for the hybrid

**Steelman.** dewlab's README promises that "cells on one page share their variables in order, the way a notebook does." PDP and FOOP students will have had a year of that. Model B breaks it on every cell, and the recommendation already plans a hint for the CS0103 it expects students to hit.

FOOP's subject is objects that hold state. The natural cell sequence is: make `ada`, enrol her, print her, watching one object change. Under Model B each Run cell rebuilds `ada`, so the object's history has to sit in one long cell or in repeated setup. The one-idea-per-cell rhythm of dewlab's lessons is lost exactly where FOOP needs it.

The hybrid keeps ordinary C# for types (`School.Student`, namespaces and extension methods all passed in hybrid.log). The dialect only reaches statement cells, where C# script and top-level statements nearly coincide. It is also faster: 45–107 ms per cell, against Model B's 775 ms once a page has 20 class cells. A replay after a class edit took 78+64+66 ms. It also gives value display and a Variables panel, the nearest thing to a watch window on a page with no debugger.

**What survives the steelman.**
- A replay asks every `ReadLine` again and re-rolls `Random`, and Lesson 2 is about input.
- Stop loses all state.
- The InternalsVisibleTo pool is a hack.
- Nobody has measured the hybrid's memory.
- Script accepts `int counter; counter++;`, so CS0165 never appears, in a page whose first lesson is about compiler errors.

**Verdict.** Keep Model B for release 1. The deciding asymmetry: script allows `var ada` to be declared again (spike_b), so a Model B lesson's Run cells should also run as hybrid cells. That is designer 2's claim and has not been tested. A hybrid lesson, though, breaks under Model B.

The steelman still changes two things:
- "Only if the pilot shows students need them" has nothing to measure it, because the page records nothing. Define the signal now: count the Run cells in lessons 2–3 that repeat setup from the cell above, and have Josh note how often the CS0103 hint appears in class.
- Measure the hybrid's memory in week 0, so the fallback is real rather than notional.

## What it most underrates

**Whether the classroom machines keep browser data between sessions.** dewlab's README already warns that work "will not follow them to a different computer." If lab PCs clear profiles at logout, three plans fail together:
- IndexedDB saved work disappears.
- Every lesson becomes a first visit: 15 MB per student, on shared Wi-Fi, plus the isolation reload.
- "Open the link once before the lesson" does nothing.

The week-0 check covers speed, isolation and memory, but not this. Add one step: log out, log back in, reopen the page, and record whether the work survived and how many bytes were fetched. If it fails, an "open a saved file" import has to join the Visual Studio export in release 1.

## What a Level 5 teacher would find missing

- **A hand-in path.** How a student submits work to Moodle, how Josh reads it, and how a student carries on from a file on another machine.
- **Practice with feedback.** dewlab has a practice page beside every tutorial, with hints and answers behind folds. The C# lessons have none. Lesson 1 asks students to predict the output but has no prediction mechanism.
- **A bridge from Python.** Side-by-side Python and C# for ideas students already know, in the spirit of FOOP's "the-moves-you-already-know".
- **A clear line about the IDE.** The page has no breakpoints or stepping. FOOP's IDE outcome, and "the-tools-around-your-code", must be evidenced in Visual Studio, so the lessons should say the page is where students rehearse. The descriptor also lists Python as an acceptable language. C# is justified by the IDE, compiler errors and do-while, not required, and the lessons should say which outcomes they evidence.
- **Placement in the term.** Where three lessons sit in FOOP's 14-tutorial sequence.
- **Accessibility.** Keyboard and screen-reader checks of the input row and the editor.

Sources: `/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad/results/{build-publish,spike_b,spike_c,designs,critique}.md`, `/home/user/dewlab/README.md:38-46`, `/home/user/dewlab/assets/vendor/coi-serviceworker.js:63-80`.