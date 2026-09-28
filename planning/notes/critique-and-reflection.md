# critique-and-reflection: notes for a reviewer

Ported from dewlab `tutorials/critique-and-reflection/critique-and-reflection.md`
(version 2026.09.26.1) and its `.glossary.yaml`. It is a reflection page:
questions about the learner's own program, then about a partner's, then one
about the team project. It is PDP row 27 in `planning/COURSE_MAP.md`
("translate", shape "reflection", size S, no worlds, batch 6, depends on
`a-program-of-your-own`). The map's entry says "No cells" and "Prose only",
so the page has no exec cell, no predict, no hint, no solution and no
challenge. As in dewlab, it has no practice page.

Status: written in one run on 28 September 2026. There was no partial draft
in this folder. The frontmatter's `version:` is `2026.09.27.1`, as the task
asked. The native check printed "No problems." for the lesson (it has no
cells to run) and for this file (its probe cells). dewsharp's own parser,
`web/lesson/parse.js`, run under Node, reads the lesson with no errors and
zero cells.

**Moved into `lessons/` on 28 September 2026.** What the move did:

- The lesson is `lessons/critique-and-reflection/critique-and-reflection.md`,
  and this file moved from the draft's `NOTES.md` to
  `planning/notes/critique-and-reflection.md`. The two `*.native.json`
  files and the draft folder were deleted. There is no practice page and
  no picture.
- `npm run check-lessons -- --write critique-and-reflection` recorded
  `critique-and-reflection.outputs.json` with `"cells": {}`: 0 runs. With
  no cell, there is no number or output in the prose for the browser to
  contradict.
- The four probe cells below were run in the browser engine too, as a
  scratch lesson (`node tools/check-lessons.mjs --lessons <scratch>
  --write`). Each printed what the native check printed (`HELLO`; `6`;
  the first statement's line, then `Greet`'s; `PHHW PH DW QRRQ`), with
  `outcome: "ok"` and no diagnostic, so no warning either. The claims the
  prose makes about names, indentation and where a program starts hold on
  the page as they do in `dotnet run`.
- Opened with `npm run serve -- --isolate` in headless Chromium: 0 cells,
  the fold opens, the four `lesson:` links go to their ids, "Learning
  outcomes this page covers: PDP-LO11, PDP-LO12." shows at the end, and the
  page loads `page/engine.js` and `engine/runner.js` (small modules) but no
  .NET download.
- The version stays `2026.09.27.1`: the format bumps it when a cell
  changes, and the page has none.
- The course files were not edited in this step. `courses/pdp.yaml` still
  has `critique-and-reflection` under `planned:` (line 105); the
  checklist in `docs/TRANSLATING.md` says to delete that line now that the
  page is in `lessons/`.

Files, as they were in the draft:

- `critique-and-reflection.md`: the lesson.
- `critique-and-reflection.native.json`: what the native check recorded for
  the lesson. It was `[]`, because the lesson has no cells.
- `NOTES.md`: this file. The probe cells at the end back the four claims
  about C# that the prose makes. They run with the same NativeCheck command
  (pass `NOTES.md` as the file).
- `NOTES.native.json`: what the native check recorded for the probes.

## Frontmatter

- `title`: the course map's title.
- `covers: [PDP-LO11, PDP-LO12]`, from the course map. dewlab's frontmatter
  gave each part its own `covers:`, and both were PDP-LO11 only. The map
  adds LO12 (team programming: "design, develop, release and review over
  time, in teams of three to five"), which Part 2 (a review) and Part 3
  (the team project) serve.
- No `worlds`. The task text said to keep secret messages and pixel art
  unless the map says otherwise; the map's entry says *none*, and "Lessons
  with no worlds" lists this page ("a project, a reflection and a brief are
  the learner's own work").
- dewlab's `year:` is dropped: the format has no such field.

## Links: decision 32

`DECISIONS.md` 32 says a lesson names a page that is not in `lessons/` yet
by its short title, in italics, with no link, and decision 39 makes the
build refuse a `lesson:` link to a page that is not there. In the draft,
all four names below were in italics.

**At the move (28 September 2026)** all four pages are in `lessons/` or
move there in the same step, so all four are now links, with the same
short title as their text. `the-team-project` was already in `lessons/`;
the checker reported the other three as "goes nowhere" until their pages
land, which the orchestrator's full check settles.

| Where | Was | Now |
|---|---|---|
| opening paragraph | *A program of your own* | `[A program of your own](lesson:a-program-of-your-own)` |
| Part 1, after the coding standard | *Reusable methods* | `[Reusable methods](lesson:building-reusable-tools)` |
| Part 3 | *The team project* | `[The team project](lesson:the-team-project)` |
| Part 3 | *A whole program* | `[A whole program](lesson:from-cells-to-a-program)` |

The page has no italic page name left. Each linked page is named once;
a second mention (Part 1's "You met this question after Release 1 of your
program") names no page, so that it needs no link.

Three of the four are in later batches than this page (6), although they
come earlier in PDP's order (`building-reusable-tools` is 22,
`from-cells-to-a-program` is 26, this page is 27). That is the batch plan's
doing: this page depends only on `a-program-of-your-own`. The prose uses
nothing those pages teach that the learner would not have met by page 27,
in the course's order.

Links the other way: the `from-cells-to-a-program` draft ends with "The
next page, *Code review*, is about reading code: your own program, and
somebody else's." That matches this page's title and what it does.
`a-program-of-your-own`'s notes say that this page "will link to it"; it
now does. `lessons/the-team-project/the-team-project.md` names this page
twice as *Code review*, in italics ("the page before this one, practised
this with a partner", and "If you wrote, on *Code review*, what you were
curious or worried about at the start, read it again now"). Both match
what this page does, and both can become `lesson:critique-and-reflection`
links now that this page is in `lessons/`; so can the `from-cells-to-a-program`
sentence above. This step did not edit other lessons.

## What changed, and why

**The opening.** dewlab: "Before the team project, this page looks back at
it twice: once through your own eyes, and once through somebody else's."
*Look back* is a phrasal verb and *through your own eyes* is an idiom, so
the C# page says what the reader does: "this page asks you to read code
twice: first your own program, and then a partner's." That is also the
course map's title. "On *A program of your own* you built something of your
own choosing, and released a first version of it" is dewlab's sentence.

**Reflect** keeps its definition, reworded without *look back*: "To
*reflect* on your work is to think about it after you finish it, and to ask
what it can teach you." "Professional developers do it all the time" became
"Professional programmers do it often" (*all the time* is an idiom).

**Where to write the answers.** dewlab sent them to **Your notes**, in its
**Notes** panel, "saved with the page, in this browser". dewsharp's pages
have no notes panel. Its notebook has text cells ("write notes in a text
cell", `web/page/notebook.js`), and the link **My notebook** is at the top
of every page (`web/page/common.js`). So the page says: "You could write
your answers in a text cell in **My notebook** (the link at the top of
every page), which keeps them in this browser, on this device. Paper works
too, and it is safer on a lab computer that deletes what the browser saved
when a session ends." The last sentence is from the course map's teacher
notes, which ask teachers to check whether lab computers keep browser data.
The `a-program-of-your-own` draft sends its "Looking back" answers to the
same places ("as comments in your notebook, or on paper").

**"There is no single right time for this page"** became "This page is not
only for today. Return to it whenever you finish something big enough to be
worth reading again." *Right* is on the style guide's list, and *come back*
is a phrasal verb.

**Part 1.**

- "Open your program beside this page" gained where the program is: "in
  your notebook or in Visual Studio". `a-program-of-your-own` has the
  learner keep it in the notebook and download it as a Visual Studio
  project.
- "Put it this way: ... now that I have been through it once?" became "You
  could ask it this way: ... now that I have done it once?" (*put it* is an
  idiom, *been through* a phrasal verb).
- "Where did you get stuck, and what got you moving again?" became "Where
  did you stop, not sure what to do next, and what helped you continue?",
  the words of the `a-program-of-your-own` draft's "Looking back", so a
  reader meets one phrasing. "You learn most when you are stuck" became
  "The places where you stopped are often where you learnt the most", and
  "find a way forward faster" became "continue sooner".
- **"What do your names, docstrings and functions tell a reader?"** became
  "names, comments and methods". "Name one part that is clear" became a
  question ("Can you name ...?"), by the style guide's `#voice`.

**The coding standard (new).** The map says: "Docstrings become XML
comments; the questions about names mention C#'s naming (PascalCase
methods, camelCase variables), which is the coding standard PDP-LO11 asks
for." PDP-LO11's title in dewlab's `outcomes.yaml` is "Coding standards:
comments, indentation, variable naming". So after the question about
names, one paragraph defines *coding standard* ("rules for how the code
looks", which "the compiler does not check") and lists the three parts the
outcome names, as C# writes them:

- names: camelCase for variables and parameters, PascalCase for methods and
  classes, and names that read as words (`highScore`, not `hs`, the style
  guide's own example). camelCase and PascalCase were defined on
  `storing-and-computing`; the page defines them again in half a sentence
  each, because dewsharp has no glossary panel and a reflection page is
  one a reader may open on its own, weeks later.
- comments: an XML comment above each method (what it does, what it takes,
  what it returns, as `building-reusable-tools` teaches `<summary>`,
  `<param>` and `<returns>`), and `//` comments that say why, not what
  (the style guide's `#code`).
- indentation, defined as "the space at the start of a line": one step
  more inside each pair of braces, and each brace on its own line (the
  style guide's "Put each brace on its own line, as Visual Studio does").
  "The compiler ignores indentation, so it helps only the people who read
  the code." This is the one place where C# differs most from Python for
  this outcome: in Python, indentation is part of the program, so dewlab's
  page had nothing to say about it.

It ends with two questions for the reader: which of these their program
follows, and whether an XML comment would tell a reader more, since a
program written for *A program of your own* (page 19) comes before *Reusable
methods* (page 22), where XML comments start. That draft's checklist asks
for a `//` comment above each method, so "its comments are probably `//`
lines".

**Part 2.**

- "Swap programs, and read theirs" gained how: **Export this notebook**
  saves the notebook as a file, and **Import a notebook** opens it as a new
  notebook, so the reader's own notebooks are not changed
  (`web/page/notebook.js`, lines 105, 106 and 348). "You can also sit
  together and read from one screen." dewlab did not say how to swap.
- *Code review* keeps dewlab's definition (the glossary's wording is
  close to it).
- "Where does their program start?" gained one sentence for C#: "A method
  does nothing until something calls it, so a C# program starts at its
  first statement that is not inside a method." In the learner's program,
  the methods usually come first (as in `a-program-of-your-own`'s opening
  cell), and the start is below them. `from-cells-to-a-program` teaches
  the start as "the first statement in `Program.cs`"; this sentence says
  the same for a program in one cell. At the move, the sentence went into
  a `dl-hint` fold, "Where to look", that opens with a question and ends
  with `from-cells-to-a-program`'s words for a project (open question 5
  below).
- "a function doing one job, a docstring that answered your question" became
  "a method that does one job, an XML comment that answered your question".
  "Say what makes it work well" became a question.
- The example of a useful comment, "I expected `score` to be a number, and
  it was a list", became "I expected `score` to be an `int`, and it was a
  `List<int>`", in C#'s type names. It still makes sense in C#: the type is
  written where the variable is made, but a reader who meets `score` fifty
  lines lower reads the name, not the type.
- "Describe what you expected" became "It helps to write what you
  expected", and "without answering it straight away" became "without
  answering it at once" (*straight away* is an idiom).

**Part 3.** The heading "looking ahead" became "before the team project"
(*look ahead* is a phrasal verb). "The code will feel familiar, from *From
cells to a program*" became "Much of it will be familiar from *A whole
program*: a loop in `Program.cs` that asks the player what to do, and a
`static class` in a file of its own for each person, all in one Visual
Studio project." That is the course map's entry for `the-team-project`
("a loop that asks where to go"; "one `static class` per person in its own
file, in one project") and the shape the `from-cells-to-a-program` draft
teaches (`Cipher.cs` and `Program.cs`). "A group of three to five, over
several weeks, released three times" is dewlab's `the-team-project`. "as
you move on?" became "as you start it?" (*move on* is a phrasal verb), and
"in Your notes" became "in your notebook".

**Where to read more.**

- Google, *How to do a code review*: kept. The title is the page's own
  ("How to do a code review", read on 28 September 2026). Its sections
  include "What to Look For In a Code Review" and "How to Write Code Review
  Comments", so "It explains what a reviewer looks for, and how to write a
  comment that helps" holds. dewlab said "how to say it usefully". At the
  move, "looks for" (a phrasal verb) became "checks".
- Microsoft, *C# identifier naming rules and conventions*: new, for the
  coding standard, since the checklist in `docs/TRANSLATING.md` asks for C#
  sources such as Microsoft Learn. Read on 28 September 2026. It says
  "These conventions provide consistency for names, but the compiler
  doesn't enforce them", "Use PascalCase for class names and method names",
  "Use camelCase for method arguments, local variables ...", and "Prefer
  clarity over brevity". It also covers interfaces (the `I` prefix),
  records and `_` for private fields, which PDP does not teach; the page
  says so. (Its `_` for private fields touches the map's open question 8.)
- Tantacrul's video: kept. Its title and channel were checked through
  YouTube's oEmbed on 28 September 2026 ("Music Software & Bad Interface
  Design: Avid's Sibelius", Tantacrul). The length ("about twenty-two
  minutes") and the summary are dewlab's and were not checked again: the
  TubeAlfred tool had no credits, and YouTube's watch page answered 429.

## What C# made different, in short

- Indentation is a coding standard in C#, not part of the program, so the
  page names it; in Python it was the syntax.
- Names have a house style that the compiler does not check: camelCase and
  PascalCase.
- Docstrings are XML comments, and a program written before *Reusable
  methods* probably has `//` comments instead, which is itself something
  to reflect on.
- Where a program starts needs one sentence: methods first, statements
  below, and nothing in a method runs until something calls it.
- The page has nowhere of its own to keep answers, so they go to the
  notebook, which is also how two learners swap programs.

## Where each claim in the prose comes from

The prose has no number that a cell printed. Its numbers are "three to
five", "three times" and "several weeks" (dewlab's `the-team-project`, lines
20, 33 and 59 to 70), "twenty-two minutes" (dewlab, not checked again),
"2018" (dewlab), and "Part 2" (this page).

| Claim | Source |
|---|---|
| the compiler does not check names | probe `naming-not-checked` (a method `encode`, a parameter `Message`, a variable `SecretWord`: it prints `HELLO`, with no warning); Microsoft's page |
| the compiler ignores indentation | probe `indentation-not-checked` (a `for` loop indented at random prints `6`, with no warning) |
| a method does nothing until something calls it; the program starts at its first statement that is not in a method | probe `where-a-program-starts` (the statement below the method prints first) |
| an XML comment above a method in a program compiles | probe `xml-comment-on-a-method-in-a-program` (no warning). The engine parses with `DocumentationMode.None` (`engine/Dewsharp.Browser/Engine.cs`, line 25), so on the page `///` is an ordinary comment to the compiler; the native check parses with the default mode, and shows no warning either |
| camelCase and PascalCase, in these words | `storing-and-computing` draft (its section on names); style guide `#code` |
| what an XML comment says | `building-reusable-tools` draft ("An XML comment") |
| `highScore`, not `hs` | style guide `#code` |
| each brace on its own line | style guide `#code` |
| **My notebook** at the top of every page; text cells | `web/page/common.js` (the site's navigation); `web/page/notebook.js` (the first notebook's text cell; **+ Text cell**) |
| **Export this notebook**, **Import a notebook**; an import makes a new notebook | `web/page/notebook.js` |
| a page with no cells | `web/page/lesson.js`, line 54: the engine starts only when the lesson has cells |
| some lab computers delete browser data | course map, teacher notes ("The first visit"); `web/help.html`, "Your work" |
| the team project's shape | course map entry for `the-team-project`; dewlab's `the-team-project`; checked at the move against `lessons/the-team-project/the-team-project.md` ("a team of three to five", "release it three times", "over several weeks", one Visual Studio project, "a `static class` in a file of their own", "`Program.cs` holds ... the loop, and the code that talks to the player") |
| in a Visual Studio project, the program starts at the first statement in `Program.cs` | `from-cells-to-a-program` draft ("Where does the program start? At the first statement in `Program.cs`.") |
| the file you downloaded for Release 1 | `a-program-of-your-own` draft, "Your release in Visual Studio" (keep the downloaded file as the copy of Release 1) and its checklist; the download is a ZIP (`DECISIONS.md` 38) |
| you met the "where did you stop" question after Release 1 | `a-program-of-your-own` draft, "Looking back", which follows "Release 1" |

## Once the page UI and the other pages exist

- **A page with no cells.** `web/page/lesson.js` starts the engine only when
  a lesson has cells, so this page should not download .NET. Check that it
  shows nothing that expects a cell (a status line for C#, say), and that
  its headings and bold questions read well with a screen reader.
- **The button labels.** The page names **My notebook**, **Export this
  notebook** and **Import a notebook** as `web/page/` has them on 28
  September 2026. If a label changes, this page changes with it.
- **The four italic names** become links when their pages move into
  `lessons/` (see "Links" above). *Done at the move.*
- **`the-team-project` is not drafted.** Part 3 rests on the map's entry
  for it: three releases, a group of three to five, one `static class` per
  person in its own file, one Visual Studio project, and "a loop that asks
  where to go". Check the sentence against that page when it exists.
  *Done at the move: the page is in `lessons/`, and Part 3 matches it (see
  the table above). Nothing changed.*
- **`a-program-of-your-own`'s "Looking back"** asks two questions that this
  page asks again (where you stopped, and what helped), as dewlab's two
  pages do. Read the two pages together once both are in `lessons/`; this
  page could say that the question comes back, now that the program is
  finished. *Done at the move: Part 1's question now ends "You met this
  question after Release 1 of your program. Is your answer the same
  now?"*
- **A page with no cells**, checked at the move in headless Chromium: no
  .NET download, no cell, nothing that expects one. A screen-reader pass
  is still to do.

## Open questions for a reviewer

The porter asked six questions. At the move (28 September 2026), five were
settled from the course map, the style guide, the playbook and the lessons
already in `lessons/`, and the page was changed to match. What was decided
is written under each question. What is left for Josh is under "Open",
below.

1. **A place to write.** dewlab kept the answers with the page, in its Notes
   panel. dewsharp's answer here is a text cell in the notebook, or paper.
   A reflection page is the one kind of page where the reader's writing is
   the work. Should dewsharp's lesson page have somewhere to write prose (a
   notes field, or a text cell on the page), or is the notebook enough? The
   map says "No cells", so this page has no comment-only exec cell, which
   would be the one way to keep writing on the page today (the
   `a-program-of-your-own` draft has such a cell for its plan).

   *Decided for this page:* no cell, as the course map's entry says ("No
   cells", "Prose only"). The answers go in a text cell in **My notebook**,
   or on paper, which is also where `a-program-of-your-own` sends its
   "Looking back" answers. *Whether the lesson page should gain a place to
   write prose is a change to `web/`, and is left under "Open".*

2. **The coding standard paragraph** is the one part of the page that
   teaches, rather than asks. It comes from the map's note on names and
   PDP-LO11's three words. Is it the right size for a reflection page, or
   should it be one sentence, with the list left to *Reusable methods* or
   to `mixed-working-in-a-team` (whose last problem is "a method to review
   against the checklist")? If that mixed set has a checklist, the two
   should use the same three parts in the same words.

   *Decided: keep it as it is.* The course map's entry asks for it: "the
   questions about names mention C#'s naming ..., which is the coding
   standard PDP-LO11 asks for". The page covers PDP-LO11, whose title is
   "Coding standards: comments, indentation, variable naming", and no other
   page in `lessons/` or `drafts/lessons/` names a *coding standard*, so the
   style guide's "define every term where it first appears" puts the
   definition here. `the-team-project` (now in `lessons/`) asks the team to
   agree its own conventions in the first week, which builds on this
   paragraph. For whoever writes `mixed-working-in-a-team`: use the same
   three parts (names, comments, indentation) in the same words.

3. **Three things to read or watch,** where dewlab had two and the style
   guide asks for one. The Microsoft page is the C# source for the coding
   standard; the video is the one thing to watch. Drop one?

   *Decided: keep all three.* The exemplars read the style guide's "one
   thing to read or watch" as at least one: `first-steps` ends with five,
   and `the-team-project` with three. The Microsoft page is the C# source
   that the playbook's checklist asks for, and it backs the one paragraph
   the page teaches.

4. **Swapping programs.** The page gives the notebook's export and import.
   A learner whose program is a Visual Studio project would swap the
   project's folder instead; the page does not say so, to keep the
   paragraph short. Add a sentence?

   *Decided: yes, and the page now says what belongs in Visual Studio.*
   The style guide's "Before a page ships" asks each page to "say what
   belongs in Visual Studio", and `a-program-of-your-own` has the learner
   keep the downloaded project as the copy of Release 1. The introduction
   now says "Nothing on this page needs Visual Studio. If you kept your
   program as a Visual Studio project, you can read it there, but your
   notebook is enough." Part 2 adds "If your program is a Visual Studio
   project, give your partner the file you downloaded for Release 1
   instead." That file (a ZIP, `DECISIONS.md` 38) is one thing to give, where
   a folder is not; `a-program-of-your-own` has the steps to open it.

5. **"Where does their program start?"** now carries one sentence of
   answer. It uses nothing new, but it tells the reader something the
   question asked them to find. Keep it, or leave the question bare, as
   dewlab did?

   *Decided: keep it, in a fold.* The style guide (`#how-a-page-teaches`)
   says help waits for an attempt and the first hint asks a question, and
   `docs/LESSON_FORMAT.md` has `dl-hint` for a hint in prose. So the
   question stays bare in the text, and a `dl-hint` fold, "Where to look",
   holds a question ("Which lines run when you press **Run**, and which
   wait until something calls them?"), then the sentence, then
   `from-cells-to-a-program`'s words for a project: "In a Visual Studio
   project, that is the first statement in `Program.cs`."

6. **The `score` example.** In C# the declaration shows the type, so a
   reader could say "check the declaration". The example keeps dewlab's
   point (a name that suggests a number). Another C# example: "I expected
   `Encode` to print the message, and it returns it."

   *Decided: keep `score`.* It is an example of the rule the page has just
   taught, "a name says what a thing is or does" (and the style guide's
   `#code`, "Names read as words"): a list of scores named `score` reads as
   one number wherever it is used, far from its declaration. The `Encode`
   example would move the point from what a name says to what a method
   does; the page keeps it on names, which its coding standard has just
   taught.

## Open

For Josh:

- **A place to write prose on a lesson page** (question 1). A reflection
  page is the one page where the reader's writing is the work, and today it
  goes to the notebook or to paper. A notes field on the lesson page, or a
  text cell a lesson can hold, would be a change to `web/` and to
  `docs/LESSON_FORMAT.md`.
- **The video's length.** "About twenty-two minutes" is dewlab's, not
  checked again: TubeAlfred still had no credits at the move (402,
  "insufficient_credits").

For the orchestrator's last step, outside this page:

- `courses/pdp.yaml` line 105, `critique-and-reflection: "Code review:
  ..."` under `planned:`, can go now that the page is in `lessons/`
  (`docs/TRANSLATING.md`, checklist). This step was told not to edit the
  course files.
- `lessons/the-team-project/the-team-project.md` names this page twice as
  *Code review* in italics, and the `from-cells-to-a-program` draft once;
  each can become `[Code review](lesson:critique-and-reflection)`.

## Probe cells

Run with the NativeCheck command, passing this file. None is meant to fail.

```csharp exec
id: naming-not-checked
static string encode(string Message)
{
    return Message.ToUpper();
}

string SecretWord = encode("hello");
Console.WriteLine(SecretWord);
```

```csharp exec
id: indentation-not-checked
int total = 0;
      for (int i = 1; i <= 3; i++)
{
total = total + i;
            }
   Console.WriteLine(total);
```

```csharp exec
id: where-a-program-starts
static void Greet()
{
    Console.WriteLine("Greet runs when it is called.");
}

Console.WriteLine("The first statement runs first.");
Greet();
```

```csharp exec
id: xml-comment-on-a-method-in-a-program
/// <summary>
/// Returns message with each capital letter moved shift places along
/// the alphabet.
/// </summary>
/// <param name="message">The message to code.</param>
/// <param name="shift">How many places to move each letter.</param>
/// <returns>The coded message.</returns>
static string Encode(string message, int shift)
{
    string coded = "";
    foreach (char character in message)
    {
        if (char.IsUpper(character))
        {
            int position = character - 'A';
            coded += (char)(((position + shift) % 26 + 26) % 26 + 'A');
        }
        else
        {
            coded += character;
        }
    }
    return coded;
}

Console.WriteLine(Encode("MEET ME AT NOON", 3));
```
