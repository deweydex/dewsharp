# dewsharp

C# lessons that run in the browser, for two QQI Level 5 modules:
Programming and Design Principles (PDP, 5N2927) and Fundamentals of
Object-Oriented Programming (FOOP, 5N0541).

A lesson is a Markdown file with C# cells. The page renders it in the
browser, and a learner edits a cell and runs it there: Roslyn compiles the
code and .NET 10 runs it, in a Web Worker on the learner's own device. There
is no server and no account, and nothing a learner writes is sent anywhere.
`Console.ReadLine()` waits for the learner to type, compiler messages look
like Visual Studio's, and any program cell can be downloaded as a Visual
Studio project that builds and prints the same output.

dewsharp is the C# sibling of [dewlab](https://github.com/deweydex/dewlab),
which does the same for Python. It shares dewlab's look, its lesson format
and its way of teaching, and none of its code.

## What is on the site

- **The home page** (`index.html`): the two courses, and the notebook.
- **A course page** (`course.html?c=pdp`, `?c=foop`): its lessons in order,
  each with a practice page, and a list of extras. Lessons not written yet
  are listed in their place, without a link.
- **A lesson** (`lesson.html?id=<id>`): reading and C# cells, with guesses
  before some runs, hints that appear after a learner has tried, solutions
  in folds, a comparison of the learner's code with a solution, and a
  challenge to take to the notebook. Work is saved on the device as the
  learner types, and can be exported to a file.
- **My notebook** (`notebook.html`): the learner's own notebooks of C# and
  text cells.
- **Help** (`help.html`) for learners, **For teachers** (`teachers.html`),
  and **Check this device** (`check.html`), which tests whether a browser
  can run the lessons.

## Running it

You need Node 22 and a Linux, macOS or Windows machine that can run the
.NET 10 SDK.

```bash
dev/setup.sh               # first time: the .NET SDK from global.json into .dotnet/, npm ci, Chromium
npm run build              # the engine (dotnet publish, about 45 s) and site/
npm run serve              # http://localhost:8080/, straight from the sources
npm test                   # parser, engine, checker and page tests, in headless Chromium
npm run check-lessons      # runs every cell of every lesson in lessons/, and checks the links and course files
```

`npm run serve -- --port 8123` picks another port. The first visit to a
lesson downloads about 15 MB of .NET; after that the browser keeps it. The
engine only needs building again when something in `engine/` changes. Pages,
lessons and courses are served from their sources, so a reload shows an
edit.

On GitHub, `.github/workflows/site.yml` builds and tests every pull request,
and publishes `site/` to GitHub Pages from `main`.

## Where things are

| Path | What it is |
|---|---|
| `lessons/<id>/` | A lesson, its practice page, and the output of every cell, recorded by the checker. |
| `courses/` | The two courses: their series and lessons, in order, with the titles of the lessons not written yet. |
| `web/` | The site: the pages (`*.html`, `page/`), the engine's JavaScript (`engine/`), the lesson parser (`lesson/`), and third-party code (`vendor/`). |
| `engine/` | The C# engine: .NET 10 for WebAssembly, with Roslyn. |
| `tools/` | The build, the dev server, the lesson checker, and `npm run vendor`. |
| `tests/` | The tests, and a fixture lesson that uses every part of the format. |
| `docs/` | `LESSON_FORMAT.md` (how to write a lesson), `ENGINE_API.md` (the engine and the page), `PARSER.md`, `ARCHITECTURE.md` (the map), `TRANSLATING.md` (porting a dewlab page). |
| `planning/` | The style guide, the course map, and the evidence behind the design. |
| `drafts/` | Lessons being ported from dewlab. Nothing reads them until they move to `lessons/`. |
| `DECISIONS.md` | Why things are the way they are. |

Read `CLAUDE.md` before changing anything, and
`planning/PEDAGOGICAL_STYLE_GUIDE.md` before writing anything a learner or a
teacher will read.

## Licence

MIT (`LICENSE`). Third-party code and fonts in `web/vendor/` keep their own
licences, listed in `web/vendor/THIRD-PARTY.txt`.
