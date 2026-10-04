# Editing in place: the levels, and what each one costs

Written 3 October 2026. This is a plan. **Status, 4 October:** Josh chose rich
editing from the start, a draft in the browser plus a branch on GitHub, and an
"Edit as Markdown" switch on every rich block. Level 0 is built (`DECISIONS.md`
#42) and so is level 1, raw blocks in place (#43), with the draft kept in
`localStorage` rather than IndexedDB. Level 2 (rich blocks) and the branch
draft are next, each as its own change. It answers two questions from Josh: can an author click the
page as it is drawn and change it there, with the change written back to the
Markdown; and does the block structure that dewsharp already has make that
easier than the Dewnote route looked.

## The short answer

Yes to both, and the second makes the first cheaper than I said earlier. The
reason is one idea: **re-serialise only the block the author touched.** Dewnote
turns the whole document into a rich-text model and back, so every construct in
the file has to survive the trip, and 54 of the 96 pages changed their layout on
a first save. A lesson is already a list of blocks. If an edit rewrites only
the lines of the block it was made in, everything else in the file keeps its
bytes, and the risk shrinks to one paragraph at a time. I measured that
(below), and it holds.

## What every level shares

These parts are built once, and every level uses them.

- **The draft is the Markdown text.** One string, the single source of truth. It
  is kept in memory and autosaved to the browser (IndexedDB, keyed by page, a
  moment after each change), and offered back if the page is closed and opened
  again. "Propose this change" pushes it, as it does now. This is the temporary
  file you described, and it needs no server.
- **Every rendered block knows its lines.** The parser already records the line
  of each cell, each chunk of prose and each block under a cell (predict, hint,
  solution, inputs). Inside a chunk of prose, markdown-it reports the line range
  of every paragraph, heading, list, table and fold line (`token.map`), so a
  block on the page can name the exact lines it came from.
- **A change is a splice.** Replace lines *a* to *b* of the draft with the new
  text, parse again (the parser's problems show at once, as they do now), draw
  again, and keep the reader's place on the page. Nothing outside *a* to *b*
  moves.
- **Cells need no rich editor.** A cell is code, and the code editor is already
  on the page. In editing mode it edits the source code of the cell, not the
  learner's saved version; its header lines (`id:`, `hint:`, `expect:`) go in a
  small panel, with the warning about ids that exists now. Predict, hint,
  solution and inputs blocks are structured text and get plain text editors.
  Only prose needs a choice between levels.

## The levels

| | What the author sees | What happens to the file | Build | Keeps costing |
|---|---|---|---|---|
| **0. A text box** (built) | The whole page as Markdown, with a Preview | Nothing but the author's lines | Done | Nothing |
| **1. Raw block, in place** | The page as drawn. Click a block and it turns into its own Markdown, where it sits; click away and it is drawn again | Only that block's lines | Small | Nothing |
| **2. Rich block, in place** | The page as drawn. Click a paragraph, heading or list and type in it, with bold, links and code showing as they will look. Anything the rich editor cannot hold safely opens as level 1 | Only that block, written by the editor | Medium | A pinned editor library and its tests |
| **3. Whole page, rich** (the Dewnote way) | One editor over the whole page, with selection and paste across blocks | Every block, rewritten | Large | Custom handling of each of dewsharp's blocks, in a second repository or a copy |

## What I measured

- **Size.** A minimal Milkdown editor (core, CommonMark, GFM tables and history)
  bundles to 447 KB, 136 KB compressed. It would load only in editing mode, so a
  learner downloads none of it.
- **Block by block.** I took every prose chunk of the 96 pages (1,688 chunks,
  6,696 paragraph-sized blocks), put each one alone through that editor and
  back, and compared the Markdown and the HTML that dewsharp's own renderer
  makes from it. 6,475 blocks (96.7 per cent) came back byte for byte. 73 came
  back different but drawn the same. 148 (2.2 per cent) were drawn differently,
  and **every one of those 148 is a list or a table**: 135 lists gain a blank
  line between items, which turns a tight list into a loose one, and 13 tables
  turn an empty header cell into `<br />`. No paragraph, heading, link, code
  span, formula, fold line or picture came back drawn differently. Both causes
  are in how the editor writes lists and tables, which is the kind of thing its
  serialiser settings are for, and the plan below does not depend on fixing them.
- **Not measured.** How typing feels (cursor, phones, input methods), how closely
  the editor's drawing matches the page while someone types, and how well a
  screen reader copes with an editable block. These need a spike with people.

## Consequences, level by level

**Level 1.** The author edits real Markdown, so a line such as `**bold**` or
`$x^2$` is visible while the block is open. That is the whole cost, and it is
small for programming teachers. There is one parser (the page's own) for
drawing and no second one to disagree with it, so there is nothing to drift. A
plain text box is also the most accessible control there is, on a keyboard, with
a screen reader and on a phone. It is the foundation of level 2, not a rival to
it: level 2's fallback for lists, tables and anything odd is level 1, and the
block map, the splice, the draft and the autosave are shared. Nothing built for
level 1 is thrown away.

**Level 2.** This is the "cursor in the rendered text" you asked for, and the
measurement says it is safe for prose. What it adds to level 1 is a second
parser (the editor's, which reads Markdown a little differently from the
page's), so two guards are needed. *Before* a block opens, the editor reads it
and writes it back without a change; if that would draw differently, the block
opens as level 1 instead. That catches exactly the lists and tables above and
anything new, and it can run over the 96 pages as a test. *After* an edit, the
problems list still runs the real parser over the whole draft. Three weaker
points: maths shows as `$…$` text while its block is open (a formula could
become an atom later); a block that is open has the editor's undo, and a
page-level undo steps back through the draft's earlier states; and an editable
region is harder for a screen reader than a text box, so every rich block keeps
an "Edit as Markdown" switch. Loading it needs the editor bundled into
`web/vendor/` by `npm run vendor`, which the tests already check for staleness.
The alternative library is ProseMirror with `prosemirror-markdown`, which
parses with markdown-it, the page's own parser, and so would not drift; it has
not been measured, and the spike should compare the two.

**Level 3.** This gives the smoothest typing, with selection across blocks, paste
between them and drag to reorder. It means a custom node for each of dewsharp's
blocks (cells with their code editors, predict, hints, solutions, worlds, folds
written as HTML), and a rewrite of every block on a first save, so a tidy commit
before anyone edits. It is the Dewnote route of `planning/DEWNOTE.md` and costs
what that plan says. With block-scoped editing, the extra it buys over level 2
is mostly cross-block selection.

**Two things the block structure does not give.** It says nothing about the
inside of a prose chunk, which is why markdown-it's line ranges are needed. And
it does not remove the need to record `<id>.outputs.json` when a cell's output
changes; that stays a job for CI or a person.

## What I recommend

Build in this order, each step usable on its own.

1. **The shared parts and level 1.** The block map, the splice, in-place raw
   editing for prose, cells and the blocks under them, the autosave, page-level
   undo, and "discard my draft". After this, an author edits on the page as it
   is drawn, with raw text in the block being changed.
2. **Level 2 for paragraphs, headings and simple lists**, behind the open-time
   guard, with tables and anything the guard refuses left at level 1. First a
   spike comparing Milkdown with ProseMirror and `prosemirror-markdown` on the
   96 pages and on a phone.
3. **The finishing parts.** Add a block (the starter blocks that exist now,
   placed between blocks), delete and move a block, formulas as atoms, and a
   lesson picker for links.

## What I need from you

- **The order.** Level 1 first, as the foundation, then level 2 on top. If you
  want the rich editing from the start, step 2 moves up, but step 1's parts are
  needed first either way.
- **Where the draft is kept.** I recommend the browser only. The alternative is
  also writing it to a work-in-progress branch on GitHub, which survives a lost
  laptop but fills the history with commits.
- **Whether a screen-reader test must come before level 2 ships.** I would want
  one, with a colleague who uses one.
