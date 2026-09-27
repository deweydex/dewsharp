// Hybrid: declaration cells -> ordinary library; statement cells -> script submissions referencing it.
import { chromium, serve, openPage } from './common.mjs';
const srv = await serve(process.argv[2], +(process.argv[3] || 8880));
const browser = await chromium.launch();
const { page } = await openPage(browser, srv.url);
const decl1 = [
`namespace School;
class Student
{
    public string Name { get; }
    public int Credits { get; private set; }
    public Student(string name) { Name = name; }
    public void Enrol(int credits) { if (credits <= 0) throw new ArgumentOutOfRangeException(nameof(credits)); Credits += credits; }
}`,
`namespace School;
static class StudentExtensions { public static bool IsFullTime(this Student s) => s.Credits >= 12; }
interface IReport { string Report(); }`];
const decl2 = [decl1[0].replace('public void Enrol', 'public override string ToString() => $"{Name} ({Credits})";\n    public void Enrol'), decl1[1]];
const log = (label, r) => { console.log(`--- ${label}: ${r.phase ?? (r.ok ? 'ok' : 'fail')} ${r.ms ? Math.round(r.ms) + ' ms' : ''}${r.timings ? Math.round(r.timings.total) + ' ms' : ''}`);
  for (const d of r.diagnostics || []) console.log(`    ${d.severity} ${d.id} ${d.file}:${d.line}:${d.col} ${d.message}`);
  if (r.stdout) console.log('    stdout: ' + JSON.stringify(r.stdout)); if (r.stderr) console.log('    stderr: ' + JSON.stringify(r.stderr));
  if (r.returnValue != null) console.log(`    value: ${r.returnValue} (${r.returnType})`); if (r.hostError) console.log('    host: ' + r.hostError.split('\n')[0]); };
const inv = (m, a) => page.evaluate(([m, a]) => window.runner.invoke(m, a), [m, a]);
await inv('SubReset');
log('lib v1', await inv('LibBuild', [['decl1', 'decl2'], decl1]));
const cells = [
  `using School;\nvar total = 0;\nvar ada = new Student("Ada");\nada.Enrol(15);\ntotal += ada.Credits;\nConsole.WriteLine(ada);\n$"{ada.Name} full-time? {ada.IsFullTime()} total={total}"`,
  `total += 1;\nada.Enrol(-1);`,
  `total`,
];
for (let i = 0; i < cells.length; i++) log('stmt' + (i + 1), await inv('SubRun', ['stmt' + (i + 1), cells[i], '', true]));
log('lib v2 (Student gets ToString), state kept', await inv('LibBuild', [['decl1', 'decl2'], decl2]));
log('stmt4 after rebuild without reset', await inv('SubRun', ['stmt4', `var bo = new Student("Bo");\nbo`, '', true]));
await inv('SubReset');
log('lib v2 after reset', await inv('LibBuild', [['decl1', 'decl2'], decl2]));
for (let i = 0; i < cells.length; i++) log('replay stmt' + (i + 1), await inv('SubRun', ['stmt' + (i + 1), cells[i], '', true]));
await browser.close(); srv.stop();
