# dewsharp

C# in the browser, for teaching Programming and Design Principles (PDP,
5N2927) and Fundamentals of Object-Oriented Programming (FOOP, 5N0541).
Markdown lessons with runnable C# cells. Roslyn compiles the learner's code
and .NET runs it, inside a Web Worker on the learner's own device. There is
no server. A sibling of [dewlab](https://github.com/deweydex/dewlab), which
does the same for Python; it shares dewlab's look and teaching approach, and
none of its code paths.

`README.md` has the overview. `docs/ARCHITECTURE.md` has the map.
`DECISIONS.md` has the reasoning. This file covers only what you need to know
before you change anything.

## Running things

```bash
dev/setup.sh               # first time: .NET SDK from global.json, npm ci
npm run build              # engine (dotnet publish) + editor bundle + site/
npm test                   # engine tests and page tests in headless Chromium
npm run check-lessons      # runs every cell of every lesson; --write refreshes outputs
npm run serve              # http://localhost:8080/
```

`site/` is generated. Never edit it.

## Before you write a word a student or teacher will read

Student-facing text includes the lessons, the course pages, the help pages,
and any string in `web/` that ends up on a page. Read
`planning/PEDAGOGICAL_STYLE_GUIDE.md` before writing any of it, and `#voice`
above all. It is dewlab's guide, copied here; the C# notes at its end are
this repo's own. The language must be plain enough for a Level 5 learner
reading in their second language, and for a teacher meeting the page for the
first time.

## Where the rest lives

| Doing | Read |
|---|---|
| Writing or translating a lesson | `docs/LESSON_FORMAT.md`, then the style guide, then `planning/COURSE_MAP.md` |
| Changing the engine or the page | `docs/ENGINE_API.md`, then `docs/ARCHITECTURE.md` |
| Wondering why something works the way it does | `DECISIONS.md`, then `planning/evidence/` |

A change isn't finished until the document that describes the behaviour
describes the new behaviour.

## The rules of the road (how cells share code)

This is the one idea every lesson and every part of the engine agrees on. Say
it the same way everywhere:

1. **Each Run starts a new program.** It runs from the first line of the
   cell to the last.
2. **A class written in a cell can be used by the cells below it.** So can
   an interface, a record, an enum or a struct.
3. **Variables stay in their cell.** Nothing a cell's statements made is
   there for the next cell. To use an object again, make it again, or write a
   method that makes it.
4. **A class written again further down replaces the earlier one** for the
   cells below it.
5. **`Main` stays in its cell**, like statements.

Early PDP lessons need only rule 1, and they don't mention the others.
The rules are taught where classes first appear.

## Three traps

**Lesson ids and cell ids are a contract.** Once a lesson has been in front
of a class, `<lesson id>/<cell id>` is the key that somebody's saved work is
stored under. Renaming either one throws that work away. A cell in a world
variant ends in its world (`your-turn-1--planets`).

**The engine has eight known traps.** Each has a regression test (see
`planning/evidence/spike_a.md`, "Fixes that were required"). Don't upgrade
.NET, Roslyn or Basic.Reference.Assemblies without running the full suite.
Stay on .NET 10 LTS, because .NET 11 moves browser .NET to a different runtime.

**Every number is run.** Every number in the prose of a lesson comes from
that cell's recorded output (`lessons/<id>/<id>.outputs.json`, written by
`npm run check-lessons -- --write`). Never from reasoning about the code.
