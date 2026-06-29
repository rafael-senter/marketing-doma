#!/usr/bin/env node
/**
 * Setup do projeto — 100% Node. Sem Python no fluxo padrão.
 * Uso: node install-deps.mjs [--advanced]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCmd } from './run-cmd.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname, '../..');
const PROJECT_ROOT = process.env.MARKETING_DOMA_PROJECT
  ? path.resolve(process.env.MARKETING_DOMA_PROJECT)
  : process.cwd();
const HOST = path.join(PROJECT_ROOT, 'remotion-doma');
const ADVANCED = process.argv.includes('--advanced');

const ok = (m) => console.log(`  [OK]   ${m}`);
const inst = (m) => console.log(`  [INSTALL] ${m}`);
const fail = (m) => { console.error(`  [FAIL] ${m}`); process.exit(1); };

function run(cmd, args, cwd = PROJECT_ROOT) {
  runCmd(cmd, args, { cwd });
}

function assertRemotionReady() {
  const remotionPkg = path.join(HOST, 'node_modules', 'remotion', 'package.json');
  if (!fs.existsSync(remotionPkg)) {
    fail(
      'Remotion não instalado (node_modules/remotion ausente).\n' +
      '  Windows: abra PowerShell na pasta do projeto e rode:\n' +
      '    cd remotion-doma && npm i --no-fund --no-audit\n' +
      '  Ou: marketing-doma install  /  /marketing-doma-setup'
    );
  }
  ok('Remotion verificado (node_modules/remotion OK)');
}

function cpFile(src, dst) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

if (/\s/.test(PROJECT_ROOT)) {
  fail(`Caminho com espaços não suportado: ${PROJECT_ROOT}`);
}

console.log('==> 0/5 package.json (CLI local no projeto)');
const { ensureHostPackage } = await import('./ensure-host-package.mjs');
const pkgInfo = ensureHostPackage(PROJECT_ROOT);
ok(`package.json ${pkgInfo.created ? 'criado' : 'OK'} — use npm run doma:install (sem npm -g)`);

console.log('==> 1/5 Verificando Node.js');
run('node', ['--version']);
ok(`Node OK — projeto: ${PROJECT_ROOT}`);

console.log('==> 2/5 Remotion');
const TPL = path.join(PLUGIN_DIR, 'templates/remotion-init');
if (!fs.existsSync(TPL)) fail(`template ausente: ${TPL}`);

if (!fs.existsSync(HOST)) {
  inst(`criando ${HOST}`);
  fs.mkdirSync(path.join(HOST, 'src'), { recursive: true });
  for (const f of ['package.json', 'tsconfig.json', 'remotion.config.ts', '.npmrc']) {
    cpFile(path.join(TPL, f), path.join(HOST, f));
  }
  for (const f of ['index.ts', 'Root.tsx']) {
    cpFile(path.join(TPL, 'src', f), path.join(HOST, 'src', f));
  }
  ok('template Remotion copiado');
}

fs.mkdirSync(path.join(HOST, 'scripts'), { recursive: true });
cpFile(path.join(TPL, 'scripts/resize-lanczos.mjs'), path.join(HOST, 'scripts/resize-lanczos.mjs'));
cpFile(path.join(PLUGIN_DIR, 'templates/render-still.sh'), path.join(HOST, 'render-still.sh'));
if (process.platform !== 'win32') {
  fs.chmodSync(path.join(HOST, 'render-still.sh'), 0o755);
}

if (!fs.existsSync(path.join(HOST, 'node_modules', 'remotion'))) {
  inst('npm i em remotion-doma (~2min na 1ª vez)');
  try {
    run('npm', ['i', '--no-fund', '--no-audit'], HOST);
  } catch (e) {
    fail(`npm install falhou em remotion-doma: ${e.message}`);
  }
} else {
  ok('node_modules Remotion já existem');
}

assertRemotionReady();

console.log('==> 3/5 Sync componentes/assets');
process.env.MARKETING_DOMA_PROJECT = PROJECT_ROOT;
await import('./sync-components.mjs');

function copyHostFile(templateName, destName) {
  const src = path.join(PLUGIN_DIR, 'templates', templateName);
  const dst = path.join(PROJECT_ROOT, destName);
  if (!fs.existsSync(dst) && fs.existsSync(src)) {
    cpFile(src, dst);
    ok(`${destName} criado`);
  }
}

console.log('==> 4/5 IDE config (Claude Code + Cursor, local)');
const { configureProject } = await import('./configure-ides.mjs');
configureProject(PROJECT_ROOT);

console.log('==> 4b/5 Host files');
copyHostFile('host-README.md', 'README.md');
copyHostFile('host-.gitignore', '.gitignore');

if (ADVANCED) {
  console.log('==> 5/5 Advanced (Python — layout-mapper, audit, wizard cliente)');
  const adv = path.join(PLUGIN_DIR, 'scripts/lib/install-advanced.mjs');
  run('node', [adv], PROJECT_ROOT);
} else {
  console.log('==> 5/5 Python — SKIP (fluxo marketing não precisa)');
  console.log('  ℹ️  Audit/recreate/wizard: marketing-doma install-advanced');
}

console.log(`
🎉 Setup completo!

✅ Claude Code + Cursor configurados (local)
✅ Remotion + sharp
✅ Hook studio :3010

Claude Code: /marketing-doma
Cursor: peça "cria post Doma" ou leia CURSOR.md
`);
