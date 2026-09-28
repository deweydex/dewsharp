// "Download project": a program cell, and the types cells above it, as a Visual Studio project in a ZIP.
// The .csproj has the compiler settings of docs/LESSON_FORMAT.md ("Compiler settings"): C# 14, .NET 10, the
// implicit usings of `dotnet new console`, nullable off, and the en-IE culture (from a small file, since a
// project has no setting for it). The Console shim is left out: in a real console, Console is the real one.
import { count } from './common.js';

// ---- a ZIP file, stored without compression (the files are small, and every tool opens it)

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** files: [{ name: 'Folder/File.cs', text }] -> a Blob holding a ZIP. */
export function zip(files) {
  const enc = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;
  const now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  for (const f of files) {
    const name = enc.encode(f.name);
    const data = enc.encode(f.text);
    const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true);          // names are UTF-8
    local.setUint16(8, 0, true);               // stored
    local.setUint16(10, time, true);
    local.setUint16(12, date, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    local.setUint16(28, 0, true);
    parts.push(new Uint8Array(local.buffer), name, data);
    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x0800, true);
    entry.setUint16(10, 0, true);
    entry.setUint16(12, time, true);
    entry.setUint16(14, date, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, data.length, true);
    entry.setUint32(24, data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((n, p) => n + p.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, size, true);
  end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
}

// ---- the project

/** "my first notebook" -> "MyFirstNotebook": a name C# and Visual Studio accept for a project. */
export function projectName(text) {
  const words = String(text || '').normalize('NFKD').replace(/[^\w\s]/g, ' ').split(/[\s_]+/).filter(Boolean);
  let name = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  if (!name) name = 'MyProgram';
  if (/^\d/.test(name)) name = 'Program' + name;
  return name.slice(0, 60);
}

export const CSPROJ = `<Project Sdk="Microsoft.NET.Sdk">

  <!-- The same settings as the dewsharp pages: C# 14 on .NET 10, the usual using lines, nullable off. -->
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <LangVersion>14</LangVersion>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>disable</Nullable>
  </PropertyGroup>

</Project>
`;

export const CULTURE_FILE = `// The dewsharp pages show money and dates as they are written in Ireland: 12.5 as money is €12.50, and
// the 3rd of September is 03/09/2026. This file makes the program do the same on any computer.
using System.Globalization;
using System.Runtime.CompilerServices;

static class IrishCulture
{
#pragma warning disable CA2255 // A module initializer runs before the program's first line, which is what we want here.
    [ModuleInitializer]
    internal static void Use()
    {
        CultureInfo irish = CultureInfo.GetCultureInfo("en-IE");
        CultureInfo.DefaultThreadCurrentCulture = irish;
        CultureInfo.DefaultThreadCurrentUICulture = irish;
        CultureInfo.CurrentCulture = irish;
        CultureInfo.CurrentUICulture = irish;
    }
#pragma warning restore CA2255
}
`;

function sln(name, guid) {
  return [
    '',
    'Microsoft Visual Studio Solution File, Format Version 12.00',
    '# Visual Studio Version 17',
    'VisualStudioVersion = 17.0.31903.59',
    'MinimumVisualStudioVersion = 10.0.40219.1',
    `Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "${name}", "${name}\\${name}.csproj", "{${guid}}"`,
    'EndProject',
    'Global',
    '\tGlobalSection(SolutionConfigurationPlatforms) = preSolution',
    '\t\tDebug|Any CPU = Debug|Any CPU',
    '\t\tRelease|Any CPU = Release|Any CPU',
    '\tEndGlobalSection',
    '\tGlobalSection(ProjectConfigurationPlatforms) = postSolution',
    `\t\t{${guid}}.Debug|Any CPU.ActiveCfg = Debug|Any CPU`,
    `\t\t{${guid}}.Debug|Any CPU.Build.0 = Debug|Any CPU`,
    `\t\t{${guid}}.Release|Any CPU.ActiveCfg = Release|Any CPU`,
    `\t\t{${guid}}.Release|Any CPU.Build.0 = Release|Any CPU`,
    '\tEndGlobalSection',
    'EndGlobal',
    '',
  ].join('\r\n');
}

function guid() {
  const h = [...crypto.getRandomValues(new Uint8Array(16))].map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

/**
 * The files of the project for the last of `cells` (what runner.run() takes). It asks the engine, in check
 * mode, which cells above are types cells and which of their types a later cell replaced (rule 4).
 * Returns { name, files: [{ name, text }], left: [notes] }.
 */
export async function projectFiles(runner, cells, title) {
  const name = projectName(title);
  const check = await runner.run({ cells, mode: 'check' }).done;
  const target = cells[cells.length - 1];
  const replacedCells = new Set((check.replaced || []).map(r => r.cellId));
  const used = new Set(['IrishCulture.cs']);
  const unique = (file) => {
    let f = file, n = 2;
    while (used.has(f.toLowerCase()) || used.has(f)) f = file.replace(/\.cs$/, `${n++}.cs`);
    used.add(f); used.add(f.toLowerCase());
    return f;
  };
  const files = [];
  const left = [];
  for (const c of cells.slice(0, -1)) {
    const kind = check.kind?.[c.id];
    const file = check.files?.[c.id] || c.file || 'Types.cs';
    if (kind !== 'types') continue;
    // A cell further down may write some of this cell's types again (rule 4): then only the later ones are
    // in the project. The engine gives the code of a cell that keeps some of its types (projectCode).
    const kept = check.projectCode?.[c.id];
    const gone = (check.replaced || []).filter(r => r.cellId === c.id).map(r => r.type);
    if (!replacedCells.has(c.id)) files.push({ name: `${name}/${unique(file)}`, text: c.code.replace(/\s*$/, '\n') });
    else if (kept) {
      files.push({ name: `${name}/${unique(file)}`, text: kept });
      left.push(`${file}: ${gone.join(', ')} ${gone.length === 1 ? 'is' : 'are'} written again in a cell further down (rule 4), so ${gone.length === 1 ? 'it is' : 'they are'} left out of this file.`);
    } else left.push(`${file}: a cell further down writes its class again (rule 4), so only the later one is in the project.`);
  }
  const programFile = unique(check.files?.[target.id] || target.file || 'Program.cs');
  files.unshift({ name: `${name}/${programFile}`, text: target.code.replace(/\s*$/, '\n') });
  files.push({ name: `${name}/IrishCulture.cs`, text: CULTURE_FILE });
  files.push({ name: `${name}/${name}.csproj`, text: CSPROJ });
  files.push({ name: `${name}.sln`, text: sln(name, guid()) });
  const types = files.length - 4;
  files.push({ name: 'README.txt', text: readme(name, programFile, types, left, check) });
  return { name, files, left };
}

function readme(name, programFile, types, left, check) {
  const lines = [
    `${name}: a C# project made by dewsharp`,
    '',
    'To open it in Visual Studio:',
    '  1. Unzip this file (right-click it, then Extract All).',
    `  2. Double-click ${name}.sln, or in Visual Studio choose File, Open, Project/Solution and pick it.`,
    '  3. Press Ctrl+F5 to run it, or F5 to run it with the debugger.',
    '',
    'Or, in a terminal, in the folder with the .csproj file:  dotnet run',
    '',
    'What is in it:',
    `  ${programFile}  the program cell`,
    types ? `  ${count(types, 'other .cs file')}  the types cells above it, one file each` : '  no other .cs files: no types cells were above the program cell',
    '  IrishCulture.cs  makes money and dates look as they do on the page (€12.50, 03/09/2026)',
    `  ${name}.csproj  the settings: C# 14, .NET 10, nullable off, like the page`,
    '',
    'Console.Clear, the colours and ReadKey were drawn by the page itself. In this project, a real console window does that.',
  ];
  if (left.length) lines.push('', 'Left out:', ...left.map(l => '  ' + l));
  if (check.outcome === 'compile-error') lines.push('', 'The code did not compile on the page when you downloaded it, so Visual Studio will show the same compiler errors.');
  lines.push('', 'Statements in cells above the program cell are not in the project: each Run on the page started a new program (the rules of the road).', '');
  return lines.join('\r\n');
}
