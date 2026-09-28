// projectFiles (web/page/project.js) with a stand-in runner: which cells above become files. No browser.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projectFiles } from '../../web/page/project.js';

const runnerGiving = (check) => ({ run: () => ({ done: Promise.resolve({ outcome: 'ok', replaced: [], projectCode: {}, ...check }) }) });

test('a types cell that a later cell replaces in part keeps its other types; one replaced whole is left out', async () => {
  const cells = [
    { id: 'probes', code: 'interface IProbe { int Read(); }\nclass Probe : IProbe { public int Read() => 1; }' },
    { id: 'old-tank', code: 'class Tank { }' },
    { id: 'probe-2', code: 'class Probe : IProbe { public int Read() => 2; }' },
    { id: 'tank-2', code: 'class Tank { public int Kg; }' },
    { id: 'run', code: 'Console.WriteLine(new Probe().Read());' },
  ];
  const check = {
    kind: { probes: 'types', 'old-tank': 'types', 'probe-2': 'types', 'tank-2': 'types', run: 'program' },
    files: { probes: 'IProbe.cs', 'old-tank': 'Tank.cs', 'probe-2': 'Probe.cs', 'tank-2': 'Tank.cs', run: 'Program.cs' },
    replaced: [{ type: 'Probe', cellId: 'probes', by: 'probe-2' }, { type: 'Tank', cellId: 'old-tank', by: 'tank-2' }],
    projectCode: { probes: 'interface IProbe { int Read(); }\n' },
  };
  const { name, files, left } = await projectFiles(runnerGiving(check), cells, 'Probes: a test');
  const byName = Object.fromEntries(files.map(f => [f.name, f.text]));
  assert.equal(byName[`${name}/IProbe.cs`], 'interface IProbe { int Read(); }\n');
  assert.equal(byName[`${name}/Probe.cs`], 'class Probe : IProbe { public int Read() => 2; }\n');
  assert.equal(byName[`${name}/Tank.cs`], 'class Tank { public int Kg; }\n');
  assert.equal(files.filter(f => /Tank\d*\.cs$/.test(f.name)).length, 1);
  assert.deepEqual(left, [
    'IProbe.cs: Probe is written again in a cell further down (rule 4), so it is left out of this file.',
    'Tank.cs: a cell further down writes its class again (rule 4), so only the later one is in the project.',
  ]);
  assert.match(byName['README.txt'], /Left out:/);
});
