// Is a reader's guess the same as what the program printed? The answer only chooses what the page asks next;
// it is never shown (DECISIONS.md #37).

const squash = (t) => String(t).replace(/\s+/g, ' ').trim();

/**
 * spec: a parsed predict block ({ type, tolerance, outputLine }). guess: the text of the reader's guess.
 * output: what the program printed, without the trailing newline.
 * A question about one line (outputLine: 1, 2, ... or 'last') is compared with that line of the output alone.
 */
export function guessMatches(spec, guess, output) {
  // "Nothing" is what a program that prints nothing prints.
  if (!output) return spec.type !== 'number' && /^nothing\.?$/i.test(squash(guess));
  let text = output;
  if (spec.outputLine != null) {
    const lines = output.split('\n');
    const line = spec.outputLine === 'last' ? lines[lines.length - 1] : lines[spec.outputLine - 1];
    if (line === undefined) return false;
    text = line;
  }
  if (spec.type === 'number') {
    const value = Number(String(guess).replace(/,/g, ''));
    const numbers = text.replace(/,/g, '').match(/-?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi);
    if (Number.isNaN(value) || !numbers) return false;
    const last = Number(numbers[numbers.length - 1]);
    return Math.abs(value - last) <= (spec.tolerance ?? 0) + 1e-9 * Math.max(1, Math.abs(last));
  }
  const said = squash(guess);
  if (spec.outputLine != null) return said === squash(text);
  const lines = output.split('\n').map(squash).filter(Boolean);
  return said === squash(output) || lines.includes(said);
}
