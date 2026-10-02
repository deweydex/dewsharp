// Is a reader's guess the same as what the program printed? The answer only chooses what the page asks next;
// it is never shown (DECISIONS.md #37).

const squash = (t) => String(t).replace(/\s+/g, ' ').trim();

/**
 * A number guess is the same as the last number in the output (or in the line asked about), within the
 * tolerance; a % sign or a currency sign around the guess is ignored.
 * spec: a parsed predict block ({ type, tolerance, outputLine }). guess: the text of the reader's guess.
 * output: what the program printed, without the trailing newline. result: the run's outcome and exception.
 * A question about one line (outputLine: 1, 2, ... or 'last') is compared with that line of the output alone.
 * When the program did not compile, a guess that says so ("It does not compile", "Only a message") is the
 * same; when it stopped with an exception, a guess that says so is the same, unless it names another one.
 */
export function guessMatches(spec, guess, output, result = { outcome: 'ok' }) {
  if (result.outcome === 'compile-error') return /(?:\bnot|n't|\bnever) compile\b/i.test(guess) || /^only (?:a )?messages?\b/i.test(squash(guess));
  if (result.outcome === 'exception') {
    const named = /\b(\w+Exception)\b/.exec(guess);
    if (named) return named[1] === String(result.exception?.type ?? '').split('.').pop();
    return /\bexception\b/i.test(guess);
  }
  if (result.outcome !== 'ok') return false;
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
    // A sign around the number is not part of it: "0.5%" and "€12.50" are the numbers 0.5 and 12.5.
    const value = Number(String(guess).trim().replace(/^[€$£]\s*/, '').replace(/\s*%$/, '').replace(/,/g, ''));
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
