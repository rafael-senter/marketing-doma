#!/usr/bin/env node
/**
 * Python venv (audit, layout-mapper, wizard) — cross-platform, sem bash.
 * Fluxo marketing NÃO chama isso. Só: marketing-doma install-advanced
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipRunner, venvDir, venvPython, venvReady } from './venv-paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname, '../..');
const PROJECT_ROOT = process.env.MARKETING_DOMA_PROJECT
  ? path.resolve(process.env.MARKETING_DOMA_PROJECT)
  : process.cwd();
const VENV = venvDir(PROJECT_ROOT);

const ok = (m) => console.log(`  [OK]   ${m}`);
const inst = (m) => console.log(`  [INSTALL] ${m}`);
const fail = (m) => { console.error(`  [FAIL] ${m}`); process.exit(1); };

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: opts.cwd || PROJECT_ROOT,
    stdio: 'inherit',
    shell: false,
    env: { ...process.env, ...opts.env },
  });
  if (r.status !== 0) fail(`${cmd} ${args.join(' ')} falhou`);
}

function findSystemPython() {
  const cands = process.platform === 'win32'
    ? ['py', 'python', 'python3']
    : ['python3', 'python'];
  for (const c of cands) {
    const args = c === 'py' ? ['-3', '--version'] : ['--version'];
    const r = spawnSync(c, args, { encoding: 'utf8', shell: process.platform === 'win32' });
    if (r.status === 0) {
      const out = (r.stdout || r.stderr || '').trim();
      if (/WindowsApps/i.test(r.error?.path || '')) continue;
      return { cmd: c, pyArgs: c === 'py' ? ['-3'] : [] };
    }
  }
  return null;
}

function pipInstall(packagesOrArgs) {
  const runner = pipRunner(PROJECT_ROOT);
  if (!runner) fail('pip não encontrado no venv');
  const args = [...runner.prefix, ...packagesOrArgs];
  run(runner.cmd, args);
}

console.log('==> Advanced: venv Python');
console.log(`    Projeto: ${PROJECT_ROOT}`);
console.log(`    Venv:    ${VENV}`);

if (venvReady(PROJECT_ROOT)) {
  ok('venv já existe (Windows Scripts/ ou Unix bin/)');
} else if (fs.existsSync(VENV)) {
  inst('venv parcial — recriando');
  fs.rmSync(VENV, { recursive: true, force: true });
}

if (!venvReady(PROJECT_ROOT)) {
  const sys = findSystemPython();
  if (!sys) {
    fail('Python 3.10+ não encontrado. Windows: winget install Python.Python.3.11 e desative alias Microsoft Store.');
  }
  inst(`criando venv (${sys.cmd})`);
  run(sys.cmd, [...sys.pyArgs, '-m', 'venv', VENV]);
}

if (!venvPython(PROJECT_ROOT)) {
  fail(`python não encontrado em ${VENV} (esperado Scripts/python.exe ou bin/python)`);
}

if (!pipRunner(PROJECT_ROOT)) {
  fail(`pip não encontrado em ${VENV} (Scripts/pip.exe ou bin/pip)`);
}

inst('pip install Pillow numpy scipy scikit-image');
pipInstall(['install', '--quiet', '--upgrade', 'pip']);
pipInstall(['install', '--quiet', 'Pillow', 'numpy', 'scipy', 'scikit-image']);

const lmPaths = [
  path.join(PROJECT_ROOT, '.claude/skills/layout-mapper/requirements.txt'),
  path.join(process.env.HOME || process.env.USERPROFILE || '', '.claude/skills/layout-mapper/requirements.txt'),
];
for (const lm of lmPaths) {
  if (fs.existsSync(lm)) {
    inst(`layout-mapper: ${lm}`);
    pipInstall(['install', '--quiet', '-r', lm]);
    break;
  }
}

const py = venvPython(PROJECT_ROOT);
ok(`venv advanced pronto (${py})`);
console.log('');
console.log('✅ Advanced OK — /audit-post, layout-mapper, wizard-cliente');
console.log(`   Python: ${py}`);
