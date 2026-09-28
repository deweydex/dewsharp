# The lesson parser: what it returns

`web/lesson/parse.js` is the one parser of `docs/LESSON_FORMAT.md`. The
lesson page, the notebook, `tools/check-lessons.mjs`, `tools/build-site.mjs`
and `tools/serve.mjs` all import it, so a lesson means the same thing
everywhere. This file describes its output field by field. Change it together
with `parse.js` and `tests/parser/parse.test.mjs`.

It is a plain ES module with one import, `web/vendor/js-yaml.mjs` (a copy of
js-yaml that `npm run vendor` makes, `DECISIONS.md` #19). It runs in the
browser and in Node without a build step:

```js
import { parseLesson, cellsForRun } from "./lesson/parse.js";
```

It never throws, whatever it is given. Every problem it finds is an entry in
`errors`, and it still returns everything it could read. The page should
show a lesson with errors as well as it can; the build and the checker refuse
one.

## Exports

| Export | What it does |
|---|---|
| `parseLesson(source, { id }?)` | Parses a lesson or a practice page. `id` is the page's id (its file name without `.md`); with it, the parser checks `practice_for:`. |
| `parseCourse(source)` | Parses `courses/<id>.yaml`. Returns `{ course, errors }`. |
| `cellsOf(lesson)` | Every cell of a parsed lesson, in page order. |
| `cellsInWorld(lesson, world)` | The cells a reader in `world` sees: the shared cells and that world's, in page order. `world` null (or a page without worlds): the shared cells. |
| `cellsForRun(lesson, target, { world?, code? })` | What `runner.run()` takes as `cells`: the visible cells above `target`, then `target`, each as `{ id, file, code }`. `code` replaces the target's own code (the reader's edit, or a solution). `world` defaults to the target's own world. |
| `worldLabel(key)` | How the page names a world: `sea-floor` → `Sea floor`. |
| `splitComment(line)` | Splits an inputs line into `{ expr, note }` at the first `//` that is not inside a string or a character. |

## `parseLesson(source)`

```js
{
  frontmatter: { title, version, from?, worlds?, covers?, practice_for? },
  worlds: [ { key: "game", label: "Game", description: "A game world with ..." } ],
  items: [ ...one entry per part of the page, in page order ],
  errors: [ { line: 12, message: "The cell id \"x\" is used twice (first on line 5)." } ],
}
```

- `frontmatter` holds only the keys that passed their checks. An unknown
  key, or a key with a bad value, is left out and reported in `errors`.
- `worlds` is `[]` for a page without worlds. Its order is the
  frontmatter's order.
- `errors` is sorted by line. Lines are one-based and count from the top of
  the file, frontmatter included. An error's `message` is a sentence the
  author can act on.

### Items

Every item has `type` and `line` (the line of its first line in the file).
An item inside a world variant also has `world` (the world's key) and `group`
(a number shared by the variants that sit side by side, which the page shows
as one task, one variant per world). An item outside every variant has
neither field: test `item.world === undefined`.

**Markdown**: `{ type: "markdown", text, line }`. The prose between the other
items, with blank lines trimmed from both ends. It is still Markdown: the page
renders it. A `<details>` fold stays whole inside one markdown item, together
with any code to read that it holds.

**A cell**: a ` ```csharp exec ` fence.

```js
{
  type: "cell",
  id: "your-turn-1--game",          // null if the id: line is missing (an error)
  line: 40,                         // the ```csharp exec line
  headers: { id: "...", hint: "...", file: "Hero.cs", expect: "CS0103", stdin: "\"Ada\\n\"" },   // as written
  code: "var hero = new Hero();\n...",   // everything after the headers, without the closing fence
  codeLine: 42,                     // the line of the code's first line, to map a cell line to a file line
  expect: { outcome: "compile-error", code: "CS0103" } | { outcome: "exception" },   // only with a valid expect:
  stdin: "Ada\n",                   // only with a valid stdin:, decoded from its JSON string
  world: "game", group: 3,          // only inside a variant
  blocks: {
    hints: [ { line, after: "2 errors", when: { signal: "errors", count: 2 }, title: null, text } ],
    predict: null | { line, type: "choice" | "number" | "text", tolerance: null | 0.5, question,
                      options: [ { text: "12", note: "The loop adds ..." | null } ],
                      outputLine: null | 2 | "last" },
    solutions: [ { line, title: null | "with LINQ", code, codeLine, notes: null | "Markdown" } ],
    inputs: null | { line, items: [ { expr: "Total(new List<int>())", note: "an empty list" | null,
                                      throws: false, line } ] },
  },
}
```

- `headers` keeps every header as written, including ones that failed their
  check. Use `expect` and `stdin`, not `headers.expect` and `headers.stdin`.
  `headers.file` is the only header the engine needs; `cellsForRun` passes it
  on.
- `hint.after` is the text of `after:` (default `1 errors`). `hint.when` is
  the same, parsed: `signal` is `errors`, `runs`, `unsure` or
  `guess-differed`, and `count` is the number (1 for the last two). `when`
  is null if `after:` was not understood (an error).
- `predict.options` is `[]` for `number` and `text`. `question` is Markdown.
- `predict.outputLine` is the line of the output the question asks about,
  counted from 1, or `"last"`: from `line:` if there is one, or else from
  the question's words (*the second line* is 2, *the last line* is
  `"last"`, up to *the fifth line*). It is null when the question is about
  the whole output.
- `inputs.items[].throws` is true when the note starts with `throws`. The
  checker then accepts an exception from a solution on that input.
- A block is attached to the cell above it, or to the cell its `for:` names.
  Blocks do not appear in `items` themselves.

**Code to read**: `{ type: "readonly", lang, code, line }`. A fence without
`exec`: `lang` is `csharp`, `python`, `console`, `text` or `""`. A fence the
parser could not accept (an unknown language, `python exec`, a stray word
after the language) is also shown as code to read, and reported in `errors`.

**A challenge**: `{ type: "challenge", lang: "csharp", code, line }`. A
` ```csharp challenge ` fence.

### What the parser checks

Each of these is an entry in `errors`:

- Frontmatter: missing or unclosed; not YAML; an unknown key; `title:`
  missing or empty; `version:` missing or not `YYYY.MM.DD.n`; `from:` or
  `practice_for:` not an id; `covers:` not a list of strings; a world key
  that is not an id, or a world without its sentence. A practice page
  (`<id>-practice`) must say `practice_for: <id>`; any other page must not
  have `practice_for:`.
- Cells: a missing `id:`; an id that is not small letters, digits and single
  hyphens; an id used twice in the file; an unknown header; a header written
  twice; `expect:` that is not `CS` and four digits, or `exception`;
  `stdin:` that is not a JSON string; `file:` that is not a `.cs` file name;
  an empty `hint:`.
- Worlds: a variant on a page whose frontmatter has no `worlds:`; a world
  the frontmatter doesn't list; a variant inside another, or inside a
  `<details>` fold; a variant with no closing `</div>`; an opening tag that is
  not on a line of its own; two variants of the same world side by side; a
  cell in a variant whose id doesn't end in `--<world>`; a cell outside every
  variant whose id has `--`.
- Blocks: a block with no cell above it; `for:` naming no cell; a block in a
  different world from its cell (or shared while its cell is in a world);
  an unknown header; a header written twice; words after the block's name
  (` ```hint extra `); `after:` not understood; an empty hint; a second
  `predict` or `inputs` block for one cell; a predict block without a
  question, a `choice` with fewer than two options, a `number` or `text`
  with options, `tolerance:` on anything but a `number`, or a `tolerance:`
  that isn't a number; a solution without code; an inputs block without an
  expression.
- Fences: one that is never closed; a cell, block or challenge inside a
  `<details>` fold.

It does not compile anything. Whether a cell compiles, what kind it is, and
whether an input is a C# expression are the engine's to say
(`docs/ENGINE_API.md`), and `npm run check-lessons` asks it.

## `parseCourse(source)`

```js
{
  course: { title, code, card, description,
            contents: [ { title: "Programming with objects", lessons: ["objects-and-classes", ...] } ],
            explore: ["a-polynomial-class"],
            planned: { "a-polynomial-class": "A polynomial class: a project in many methods" } },
  errors: [ { line: 1, message: "A course needs card: with some text." } ],
}
```

`course` is null only when the file is not YAML at all. Course errors carry
line 1, except YAML errors, which carry their own line. It checks the four
text keys, unknown keys, that each series has a title and a list of lessons,
that each lesson is an id, that no lesson is listed twice in `contents`, and
that each `planned:` entry is a listed lesson with a title. `planned` is `{}`
when the file has none. It does not check that a listed lesson exists, since
it sees one file; `buildIndex` does (below).

## `lessons/index.json`

`tools/build-site.mjs` writes it into `site/lessons/`, and `tools/serve.mjs`
makes it afresh on every request. Both use `buildIndex` in
`tools/lib/lessons.mjs`. The home page and the course pages read it instead
of fetching every lesson.

```js
{
  courses: [ { id: "foop", title, code, card, description, contents, explore, planned } ],   // courses/*.yaml, in id order
  pages: {
    "objects-and-classes": {
      path: "objects-and-classes/objects-and-classes.md",   // under lessons/
      title: "Objects and classes: ...", version: "2026.09.27.1",
      lesson: "objects-and-classes",          // the lesson this page belongs to
      practice: false,                        // true for <id>-practice
      practicePage: "objects-and-classes-practice" | null,
      worlds: ["game", "space"], covers: ["FOOP-LO1"],
      courses: ["foop"],                      // the courses that list it; [] for a draft or a practice page
    },
  },
}
```

A lesson that no course lists is still in `pages`. The build fails if any
page or course has a parser error, if a folder name is not an id, or if a
folder holds a Markdown file other than `<id>.md` and `<id>-practice.md`.
It also fails if a course lists a lesson that is neither in `pages` nor named
under `planned:`, and if a page has a `[text](lesson:<id>)` link to a page
that is not in `pages` (`DECISIONS.md` #39). `npm run check-lessons` reports
the same errors: the course errors only when it checks the real `lessons/`.

## Recorded outputs

`npm run check-lessons -- --write` writes one file for each page, beside it:
`lessons/<id>/<id>.outputs.json`, and `lessons/<id>/<id>-practice.outputs.json`
for a practice page. Lessons quote their numbers from these files
(`CLAUDE.md`, "Every number is run"). Without `--write`, the checker fails if
a new run differs from the file.

```js
{
  page: "every-feature", version: "2026.09.27.1",
  cells: {
    "a-first-program-1": { kind: "program", outcome: "ok", output: "Hello!\n..." },
    "mistakes-1": { kind: "program", outcome: "compile-error", output: "",
                    diagnostics: [ { severity: "error", code: "CS0103", line: 2, column: 19, message: "..." } ] },
    "mistakes-2": { kind: "program", outcome: "exception", output: "before\n",
                    exception: { type: "System.IndexOutOfRangeException", message: "...",
                                 frames: [ { line: 3, member: null } ] } },
    "totals-1": { kind: "program", outcome: "ok", output: "",
                  values: [ { display: "27" }, { exception: "ArgumentNullException" }, { compileError: "CS1503" } ],
                  solutions: [ { outcome: "ok", output: "", values: [ ... ] } ] },
    "shared-cell@space": { ... },
  },
  challenges: [ { kind: "program", outcome: "ok", output: "" } ],   // only when the page has a challenge
}
```

- The key is the cell id. A shared cell that comes after a world's cells is
  run once for each world, since the types above it differ, and is recorded
  as `<cell id>@<world>`.
- `output` is everything the program printed, typed lines included (the
  checker types the cell's `stdin:`). `Console.Clear()` shows as a form feed,
  `\f`; colours are left out.
- `diagnostics[].cellId` and `exception.frames[].cellId` appear only when
  they name a cell other than the one recorded. Lines count from the top of
  their cell.
- `exitCode` appears only when it is not 0 and there was no exception.
- `kind: "empty"` cells (a blank "your turn") are not run, and are recorded
  with their kind alone, plus `solutions` when they have any: the checker
  runs an empty cell's solutions like any other cell's.
- `challenges` has one entry for each ` ```csharp challenge ` fence, in page
  order: the challenge compiled alone, in check mode, as it would be in a new
  notebook. Its `outcome` is `ok` or `compile-error`, and `output` is always
  empty.
- Timings are never recorded, so a file changes only when what the cells do
  changes.
