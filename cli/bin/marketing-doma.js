#!/usr/bin/env node
/*
 * marketing-doma CLI — wrapper Node.js do plugin Claude Code.
 *
 * Comandos:
 *   marketing-doma install         download + Remotion + sync + IDE config
 *   marketing-doma update          atualiza plugin + re-sync (preserva live-rules)
 *   marketing-doma install-advanced  Python venv (audit/layout-mapper — opcional)
 *   marketing-doma status          mostra versão local + remota
 *   marketing-doma uninstall       bash install.sh --uninstall
 *   marketing-doma version         mostra versão deste CLI
 *
 * Filosofia: CLI = wrapper minúsculo. Plugin vive no GitHub.
 * Updates do plugin = git push GitHub → user roda `marketing-doma update`.
 * Updates do CLI = npm publish (raro, só se mudar fluxo de install).
 */

'use strict';

const { execSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const REPO_URL = 'https://github.com/rafael-senter/marketing-doma.git';
const { downloadPlugin, remotePluginVersion } = require('../lib/download-plugin');
const { enablePlugin, disablePlugin } = require('../lib/settings-enable-plugin');
const CLI_VERSION = require('../package.json').version;

function projectRoot() {
  return process.env.MARKETING_DOMA_PROJECT || process.cwd();
}

function projectPluginDir(root = projectRoot()) {
  return path.join(root, '.claude', 'plugins', 'marketing-doma');
}

function resolveInstall() {
  const root = projectRoot();
  const local = projectPluginDir(root);
  // 100% local — sempre instala em <projeto>/.claude/plugins/marketing-doma
  return { dir: local, root, mode: 'project', settings: path.join(root, '.claude', 'settings.json') };
}

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function c(color, text) {
  return process.stdout.isTTY ? `${COLORS[color]}${text}${COLORS.reset}` : text;
}

function log(msg) {
  console.log(msg);
}

function ok(msg) {
  log(`  ${c('green', '✓')} ${msg}`);
}

function info(msg) {
  log(`  ${c('cyan', 'ℹ')} ${msg}`);
}

function warn(msg) {
  log(`  ${c('yellow', '⚠')} ${msg}`);
}

function fail(msg) {
  log(`  ${c('red', '✗')} ${msg}`);
  process.exit(1);
}

function header(text) {
  log(`\n${c('bold', '═══ ' + text + ' ═══')}`);
}

function sh(cmd, opts = {}) {
  if (!sh._bashPath) sh._bashPath = process.platform === 'win32' ? (findBash() || 'bash') : 'bash';
  const bash = sh._bashPath;
  const result = spawnSync(bash, ['-lc', cmd], {
    stdio: opts.silent ? 'pipe' : 'inherit',
    encoding: 'utf8',
    env: { ...process.env, ...(opts.env || {}) },
    ...opts,
  });
  if (result.status !== 0 && !opts.allowFail) {
    fail(`Comando falhou: ${cmd}\n${result.stderr || ''}`);
  }
  return { ok: result.status === 0, stdout: result.stdout || '', stderr: result.stderr || '' };
}

function toBashPath(p) {
  if (process.platform !== 'win32') return p.replace(/\\/g, '/');
  const abs = path.resolve(p);
  if (/^[A-Za-z]:/.test(abs)) {
    return `/${abs[0].toLowerCase()}${abs.slice(2).replace(/\\/g, '/')}`;
  }
  return abs.replace(/\\/g, '/');
}

function semverGte(a, b) {
  const pa = String(a).split('.').map((n) => parseInt(n, 10) || 0);
  const pb = String(b).split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if (pa[i] > pb[i]) return true;
    if (pa[i] < pb[i]) return false;
  }
  return true;
}

function remotionReady(root) {
  return fs.existsSync(path.join(root, 'remotion-doma', 'node_modules', 'remotion', 'package.json'));
}

function runInstallProject(pluginDir, root) {
  const setup = path.join(pluginDir, 'scripts/lib/install-deps.mjs');
  if (fs.existsSync(setup)) {
    info('Configurando projeto (Remotion + IDE)...');
    const r = spawnSync('node', [setup], {
      stdio: 'inherit',
      encoding: 'utf8',
      cwd: root,
      env: { ...process.env, MARKETING_DOMA_PROJECT: root },
    });
    if (r.status !== 0) fail('Setup do projeto falhou');
    if (!remotionReady(root)) {
      fail('Remotion não instalado após setup. Rode: node .claude/plugins/marketing-doma/scripts/lib/install-deps.mjs');
    }
    ok('Remotion instalado e verificado');
    return;
  }
  const configure = path.join(pluginDir, 'scripts/lib/configure-ides.mjs');
  if (fs.existsSync(configure)) {
    const r = spawnSync('node', [configure, root], { stdio: 'inherit', encoding: 'utf8' });
    if (r.status !== 0) fail('configure-ides falhou');
  } else {
    enablePlugin(path.join(root, '.claude', 'settings.json'));
    ok(`enabledPlugins em ${path.join(root, '.claude', 'settings.json')}`);
  }
}

function checkPrereqs() {
  if (!which('node')) fail('node não encontrado.');
}

// Executa comando de install que NÃO depende de bash (importante no Windows
// quando git/bash ainda não foram instalados). Usa cmd /c no Windows nativo,
// /bin/sh no Unix.
function runInstallCmd(cmd) {
  if (process.platform === 'win32' && !findBash()) {
    const r = spawnSync('cmd.exe', ['/c', cmd], {
      stdio: 'inherit',
      shell: false,
    });
    return { ok: r.status === 0 };
  }
  return sh(cmd, { allowFail: true });
}

function pluginVersion(pluginDir) {
  const pluginJson = path.join(pluginDir || resolveInstall().dir, 'plugin.json');
  if (!fs.existsSync(pluginJson)) return null;
  try {
    return JSON.parse(fs.readFileSync(pluginJson, 'utf8')).version;
  } catch {
    return null;
  }
}

function remoteVersion() {
  // sync wrapper — cmdStatus usa spawnSync; remote real é async em fetchRemoteVersion
  return null;
}

async function fetchRemoteVersion() {
  return remotePluginVersion();
}

function promptYesNo(question, defaultYes = true) {
  // Síncrono via readline-sync style — usa /dev/tty pra evitar issues com pipes
  try {
    const def = defaultYes ? 'Y/n' : 'y/N';
    process.stdout.write(`${question} [${def}] `);
    const fd = process.stdin.isTTY ? 0 : fs.openSync('/dev/tty', 'r');
    const buf = Buffer.alloc(8);
    const n = fs.readSync(fd, buf, 0, buf.length, null);
    if (!process.stdin.isTTY) fs.closeSync(fd);
    const answer = buf.slice(0, n).toString('utf8').trim().toLowerCase();
    if (answer === '') return defaultYes;
    return answer.startsWith('y') || answer.startsWith('s');
  } catch {
    return defaultYes;
  }
}

function missingDeps(osTag) {
  const deps = depsTable().filter(d => d.requiredForInstall);
  return deps.filter(d => !depPresent(d, osTag));
}

function depPresent(d, osTag) {
  if (d.name === 'bash' && osTag === 'windows') return !!findBash();
  if (d.name === 'claude') return !!findClaude();
  if (d.name === 'python3') return !!findPython();
  const cmdName = osTag === 'windows' && !isGitBash() && d.altWindows ? d.altWindows : d.name;
  return !!which(cmdName);
}

function ensureHostPackageJson(root) {
  const pkgPath = path.join(root, 'package.json');
  let pkg = { name: 'marketing-doma-projeto', private: true, scripts: {}, devDependencies: {} };
  if (fs.existsSync(pkgPath)) {
    try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')); } catch {}
  }
  pkg.private = pkg.private !== false;
  pkg.scripts = pkg.scripts || {};
  pkg.devDependencies = pkg.devDependencies || {};
  const domaScripts = {
    'doma:install': 'marketing-doma install',
    'doma:update': 'marketing-doma update',
    'doma:status': 'marketing-doma status',
    'doma:setup': 'node .claude/plugins/marketing-doma/scripts/lib/install-deps.mjs',
    'doma:export': 'marketing-doma export',
  };
  Object.assign(pkg.scripts, domaScripts);
  pkg.devDependencies['marketing-doma-cli'] = pkg.devDependencies['marketing-doma-cli'] || `^${CLI_VERSION}`;
  if (!pkg.name) pkg.name = 'marketing-doma-projeto';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function cmdInstall() {
  return (async () => {
    header('marketing-doma install');
    const root = projectRoot();
    const pluginDir = projectPluginDir(root);

    info(`Projeto: ${root}`);
    info(`Plugin:  ${pluginDir}`);
    info('Modo:    100% local (sem npm -g, sem clone global)');
    log('');

    ensureHostPackageJson(root);
    ok('package.json — CLI local (npm install marketing-doma-cli nesta pasta)');

    if (fs.existsSync(path.join(pluginDir, 'plugin.json'))) {
      warn('Plugin já existe neste projeto.');
      runInstallProject(pluginDir, root);
      log('');
      log(c('green', `🎉 Plugin marketing-doma ${pluginVersion(pluginDir) || ''} pronto!`));
      printNextSteps(root);
      return;
    }

    fs.mkdirSync(path.dirname(pluginDir), { recursive: true });
    info('Baixando plugin do GitHub → .claude/plugins/marketing-doma/ (direto, sem git clone)...');
    await downloadPlugin(pluginDir);
    ok('Plugin baixado');

    info('Registrando no projeto...');
    runInstallProject(pluginDir, root);

    log('');
    log(c('green', `🎉 Plugin marketing-doma ${pluginVersion(pluginDir) || ''} instalado!`));
    printNextSteps(root);
  })();
}

function printNextSteps(root) {
  log('');
  log('Próximos passos (tudo nesta pasta — nada global):');
  log(c('cyan', `  cd "${root}"`));
  log('  Claude Code: claude → /marketing-doma');
  log('  Cursor: ler CURSOR.md · "cria post Doma"');
  log('');
  log('Comandos locais (npm run):');
  log(c('cyan', '  npm run doma:status'));
  log(c('cyan', '  npm run doma:update'));
  log('Reparar: ' + c('cyan', 'npm run doma:setup') + '  ou  /marketing-doma-setup');
}

// Pastas dentro do clone que NUNCA podem ser sobrescritas pelo update
// (são geradas em runtime pelo uso real do cliente — auto-melhoria, planos locais).
const PRESERVED_DIRS = [
  'knowledge-base/live-rules',
  'templates/planos',
];

function moveOrCopy(src, dst) {
  // Tenta rename (atomic, rápido); se falhar EXDEV (cross-device), copia + remove.
  try {
    fs.renameSync(src, dst);
  } catch (e) {
    if (e.code !== 'EXDEV') throw e;
    fs.cpSync(src, dst, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
  }
}

function preserveBeforeReset(pluginDir) {
  const stash = path.join(pluginDir, `.marketing-doma-preserve-${process.pid}`);
  fs.mkdirSync(stash, { recursive: true });
  const saved = [];
  for (const rel of PRESERVED_DIRS) {
    const src = path.join(pluginDir, rel);
    if (!fs.existsSync(src)) continue;
    const dst = path.join(stash, rel);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    moveOrCopy(src, dst);
    saved.push(rel);
  }
  return { stash, saved };
}

function restoreAfterReset(pluginDir, { stash, saved }) {
  for (const rel of saved) {
    const src = path.join(stash, rel);
    const dst = path.join(pluginDir, rel);
    if (!fs.existsSync(src)) continue;
    if (fs.existsSync(dst)) {
      mergeDir(src, dst);
      fs.rmSync(src, { recursive: true, force: true });
    } else {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      moveOrCopy(src, dst);
    }
  }
  try { fs.rmSync(stash, { recursive: true, force: true }); } catch {}
}

function mergeDir(srcDir, dstDir) {
  // Copia arquivos de srcDir pra dstDir SEM sobrescrever — preserva edits do cliente.
  // Se conflito de nome: cliente vence (manter arquivo do clone) e o do remoto é descartado.
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dst = path.join(dstDir, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
      mergeDir(src, dst);
    } else if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
    }
  }
}

function cmdUpdate() {
  return (async () => {
    header('marketing-doma update');
    checkPrereqs();
    const inst = resolveInstall();
    const root = inst.root || projectRoot();

    if (!fs.existsSync(path.join(inst.dir, 'plugin.json'))) {
      warn('Plugin não instalado neste projeto.');
      info('Rode `marketing-doma install` na pasta do projeto.');
      process.exit(1);
    }

    const before = pluginVersion(inst.dir);
    const remote = await fetchRemoteVersion();
    info(`Versão local: ${before || '?'}`);
    if (remote) info(`Versão GitHub: ${remote}`);
    if (before && remote && semverGte(before, remote)) {
      ok('Já está na última versão.');
      info('Re-sincronizando Remotion + IDE...');
      runInstallProject(inst.dir, root);
      log('');
      log(c('green', '🎉 Projeto sincronizado.'));
      return;
    }

    info('Preservando live-rules e planos...');
    const preserved = preserveBeforeReset(inst.dir);
    if (preserved.saved.length) ok(`Preservado: ${preserved.saved.join(', ')}`);

    info('Baixando versão nova...');
    fs.rmSync(inst.dir, { recursive: true, force: true });
    await downloadPlugin(inst.dir);
    restoreAfterReset(inst.dir, preserved);

    const after = pluginVersion(inst.dir);
    ok(`Atualizado: ${before} → ${after}`);
    runInstallProject(inst.dir, root);

    log('');
    log(c('green', '🎉 Plugin atualizado!'));
    log('Remotion + componentes + IDE reconfigurados.');
    log(c('gray', 'Export: ' + c('cyan', 'marketing-doma export')));
  })();
}

function cmdStatus() {
  return (async () => {
    header('marketing-doma status');
    const inst = resolveInstall();

    log(`  CLI version:                ${c('cyan', CLI_VERSION)}`);
    log(`  Projeto (CWD):              ${c('gray', projectRoot())}`);

    if (!fs.existsSync(path.join(inst.dir, 'plugin.json'))) {
      warn('Plugin NÃO instalado neste projeto.');
      info('Rode `marketing-doma install` na pasta do projeto.');
    } else {
      const local = pluginVersion(inst.dir);
      log(`  Plugin local:               ${c('cyan', local || '?')}`);
      log(`  Caminho:                    ${c('gray', inst.dir)}`);

      const remote = await fetchRemoteVersion();
      if (remote) {
        log(`  Plugin remoto (GitHub):     ${c('cyan', remote)}`);
        if (local && remote !== local) {
          if (semverGte(local, remote)) ok('Plugin local ≥ remoto.');
          else {
            warn(`Atualização disponível: ${local} → ${remote}`);
            info('Rode `marketing-doma update`.');
          }
        } else ok('Plugin atualizado.');
      }

      if (inst.settings && fs.existsSync(inst.settings)) {
        try {
          const s = JSON.parse(fs.readFileSync(inst.settings, 'utf8'));
          if (s.enabledPlugins?.['marketing-doma@marketing-doma']) ok('Claude Code: enabledPlugins OK');
          else warn('Claude: rode marketing-doma install');
        } catch { warn('Claude: settings.json inválido'); }
      }
      const cursorHooks = path.join(inst.root || projectRoot(), '.cursor/hooks.json');
      const cursorRules = path.join(inst.root || projectRoot(), '.cursor/rules/marketing-doma.mdc');
      if (fs.existsSync(cursorHooks)) ok('Cursor: hooks.json OK');
      else info('Cursor: rode marketing-doma install');
      if (fs.existsSync(cursorRules)) ok('Cursor: rules OK');

      const root = inst.root || projectRoot();
      if (venvPythonReady(root)) ok('Python advanced (.venv-instagram) instalado');
      else info('Python advanced: não instalado (opcional — install-advanced)');
    }

    log('');
    log(c('bold', '── Stack ──'));
    log(`  ${c('green', '✓')} Node.js (obrigatório)`);
    log(`  ${remotionReady(inst.root || projectRoot()) ? c('green', '✓') : c('red', '✗')} Remotion (remotion-doma/node_modules)`);
    log(`  ${findPython() ? c('green', '✓') : c('gray', '○')} Python (opcional — audit/recreate)`);
    log(`  ${findClaude() ? c('green', '✓') : c('yellow', '⚠')} Claude Code CLI ${findClaude() ? '' : '(rode npm run doma:setup ou instale manual)'}`);
  })();
}

function cmdInstallAdvanced() {
  header('marketing-doma install-advanced');
  const inst = resolveInstall();
  const root = inst.root || projectRoot();
  if (!fs.existsSync(path.join(inst.dir, 'plugin.json'))) {
    fail('Plugin não instalado. Rode marketing-doma install primeiro.');
  }
  const adv = path.join(inst.dir, 'scripts/lib/install-advanced.mjs');
  if (!fs.existsSync(adv)) fail('install-advanced.mjs não encontrado no plugin.');
  const r = spawnSync('node', [adv], {
    stdio: 'inherit',
    encoding: 'utf8',
    env: { ...process.env, MARKETING_DOMA_PROJECT: root },
    cwd: root,
  });
  if (r.status !== 0) fail('install-advanced falhou');
  ok('Advanced instalado.');
}

function venvPythonReady(root) {
  const v = path.join(root, '.venv-instagram');
  return (
    fs.existsSync(path.join(v, 'Scripts', 'python.exe')) ||
    fs.existsSync(path.join(v, 'Scripts', 'python')) ||
    fs.existsSync(path.join(v, 'bin', 'python3')) ||
    fs.existsSync(path.join(v, 'bin', 'python'))
  );
}

function cmdUninstall() {
  header('marketing-doma uninstall');
  const inst = resolveInstall();
  const root = inst.root || projectRoot();

  if (!fs.existsSync(path.join(inst.dir, 'plugin.json'))) {
    warn('Plugin não instalado.');
    process.exit(0);
  }

  disablePlugin(path.join(root, '.claude', 'settings.json'));
  const cursorHooks = path.join(root, '.cursor', 'hooks.json');
  if (fs.existsSync(cursorHooks)) {
    try {
      const h = JSON.parse(fs.readFileSync(cursorHooks, 'utf8'));
      if (h.hooks?.sessionStart) {
        h.hooks.sessionStart = h.hooks.sessionStart.filter(
          (x) => !(x.command || '').includes('start-remotion')
        );
        fs.writeFileSync(cursorHooks, JSON.stringify(h, null, 2) + '\n');
      }
    } catch {}
  }
  fs.rmSync(inst.dir, { recursive: true, force: true });
  ok('Plugin removido do projeto.');
  log('Plugin removido. CLI local: ' + c('cyan', 'npm uninstall marketing-doma-cli'));
}

function walkFiles(dir, base, out) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.join(base, e.name);
    if (e.isDirectory()) walkFiles(full, rel, out);
    else out.push(rel);
  }
}

function cmdExport() {
  header('marketing-doma export');
  const inst = resolveInstall();
  const pluginDir = inst.dir;

  if (!fs.existsSync(path.join(pluginDir, 'plugin.json'))) {
    fail('Plugin não instalado.');
  }

  const files = [];
  for (const rel of [...PRESERVED_DIRS, 'knowledge-base/padroes', 'templates/components']) {
    walkFiles(path.join(pluginDir, rel), rel, files);
  }

  if (files.length === 0) {
    ok('Nenhum arquivo local pra exportar.');
    return;
  }

  log(`  Arquivos: ${c('cyan', files.length)}`);
  const now = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outPath = path.join(process.cwd(), `marketing-doma-export-${now}.tar.gz`);

  if (fs.existsSync(path.join(pluginDir, '.git'))) {
    const statusResult = sh(`cd "${toBashPath(pluginDir)}" && git status --porcelain=v1`, { silent: true, allowFail: true });
    if (statusResult.ok && statusResult.stdout.trim()) {
      sh(`cd "${toBashPath(pluginDir)}" && git status --porcelain=v1 | awk '{print $2}' | tar -czf "${toBashPath(outPath)}" -T -`, { allowFail: true });
    }
  }

  if (!fs.existsSync(outPath)) {
    const listFile = path.join(os.tmpdir(), `mdoma-export-${process.pid}.txt`);
    fs.writeFileSync(listFile, files.map((f) => path.join(pluginDir, f)).join('\n'));
    sh(`tar -czf "${toBashPath(outPath)}" -T "${toBashPath(listFile)}"`, { allowFail: true });
    try { fs.unlinkSync(listFile); } catch {}
  }

  if (!fs.existsSync(outPath)) fail('Falha ao gerar tarball.');
  ok(`Tarball: ${outPath} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);
}

function cmdVersion() {
  log(`marketing-doma-cli ${CLI_VERSION}`);
  const inst = resolveInstall();
  const v = pluginVersion(inst.dir);
  if (v) log(`plugin ${v} (${inst.mode}) em ${inst.dir}`);
  else log('plugin não instalado neste projeto');
}

// === Detecção de OS + comandos por OS ===

function detectOS() {
  const p = process.platform;
  if (p === 'linux') {
    // Detecta distro
    try {
      const osRelease = fs.readFileSync('/etc/os-release', 'utf8');
      if (/ID(_LIKE)?=.*(debian|ubuntu)/i.test(osRelease)) return 'linux-debian';
      if (/ID(_LIKE)?=.*(fedora|rhel|centos)/i.test(osRelease)) return 'linux-fedora';
      if (/ID(_LIKE)?=.*(arch)/i.test(osRelease)) return 'linux-arch';
    } catch {}
    return 'linux-other';
  }
  if (p === 'darwin') return 'macos';
  if (p === 'win32') return 'windows';
  return 'unknown';
}

function isGitBash() {
  // Git Bash define MSYSTEM=MINGW64/MINGW32 e HOME no formato unix
  return process.env.MSYSTEM && /MINGW/.test(process.env.MSYSTEM);
}

function which(cmd) {
  const isWin = process.platform === 'win32';
  const r = isWin
    ? spawnSync('where.exe', [cmd], { encoding: 'utf8' })
    : spawnSync('/bin/sh', ['-c', `command -v ${cmd}`], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  const lines = (r.stdout || '').trim().split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const p = line.trim();
    if (isWin && isWindowsStoreStub(p)) continue;
    return p;
  }
  return null;
}

function isWindowsStoreStub(p) {
  const norm = p.replace(/\\/g, '/').toLowerCase();
  return norm.includes('windowsapps') || norm.includes('microsoft/windowsapps');
}

function findBash() {
  if (process.platform !== 'win32') return which('bash') || 'bash';
  const inPath = which('bash');
  if (inPath) return inPath;
  const candidates = [
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Git', 'bin', 'bash.exe'),
    path.join(process.env.ProgramW6432 || '', 'Git', 'bin', 'bash.exe'),
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

function findClaude() {
  const inPath = which('claude');
  if (inPath && !isWindowsStoreStub(inPath)) return inPath;
  const home = os.homedir();
  const candidates = [
    path.join(home, '.local', 'bin', 'claude'),
    path.join(home, '.local', 'bin', 'claude.exe'),
    path.join(process.env.APPDATA || '', 'npm', 'claude.cmd'),
    path.join(process.env.APPDATA || '', 'npm', 'claude'),
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'claude', 'claude.exe'),
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

function findPython() {
  for (const cmd of process.platform === 'win32' ? ['python', 'python3', 'py'] : ['python3', 'python']) {
    const p = which(cmd);
    if (!p || isWindowsStoreStub(p)) continue;
    const r = spawnSync(p, ['--version'], { encoding: 'utf8' });
    if (r.status === 0 && /python\s+\d/i.test(r.stdout || r.stderr || '')) return p;
  }
  return null;
}

function checkCmdVersion(cmd, args = '--version') {
  const r = sh(`${cmd} ${args}`, { silent: true, allowFail: true });
  if (!r.ok) return null;
  // Extrai primeira linha + primeiro número Y.Y.Y
  const line = r.stdout.split('\n')[0] || r.stderr.split('\n')[0] || '';
  const m = line.match(/(\d+\.\d+(\.\d+)?)/);
  return m ? m[1] : line.trim();
}

// Tabela de pré-requisitos + comandos de instalação por OS
function depsTable() {
  return [
    { name: 'node', minVersion: '18', label: 'Node.js', requiredForInstall: false },
    { name: 'npm', minVersion: '9', label: 'npm', requiredForInstall: false },
    { name: 'git', minVersion: '2.30', label: 'git', requiredForInstall: false },
    { name: 'bash', minVersion: '4', label: 'bash', requiredForInstall: false },
    { name: 'python3', minVersion: '3.10', label: 'Python 3', altWindows: 'python', requiredForInstall: false },
    { name: 'claude', minVersion: null, label: 'Claude Code CLI', requiredForInstall: false },
  ];
}

function installCmdFor(depName, osTag) {
  // Comandos canônicos por OS pra cada dep
  const cmds = {
    'node': {
      'linux-debian': 'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt install -y nodejs',
      'linux-fedora': 'curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash - && sudo dnf install -y nodejs',
      'linux-arch':   'sudo pacman -S --noconfirm nodejs npm',
      'macos':        'brew install node',
      'windows':      'winget install OpenJS.NodeJS.LTS',
    },
    'git': {
      'linux-debian': 'sudo apt install -y git',
      'linux-fedora': 'sudo dnf install -y git',
      'linux-arch':   'sudo pacman -S --noconfirm git',
      'macos':        'brew install git',
      'windows':      'winget install Git.Git',
    },
    'bash': {
      'windows':      'winget install --id Git.Git --silent --accept-source-agreements --accept-package-agreements',
    },
    'python3': {
      'linux-debian': 'sudo apt install -y python3 python3-venv python3-pip',
      'linux-fedora': 'sudo dnf install -y python3 python3-pip',
      'linux-arch':   'sudo pacman -S --noconfirm python python-pip',
      'macos':        'brew install python@3.11',
      'windows':      'winget install Python.Python.3.11',
    },
    'claude': {
      'linux-debian': 'curl -fsSL https://claude.ai/install.sh | bash',
      'linux-fedora': 'curl -fsSL https://claude.ai/install.sh | bash',
      'linux-arch':   'curl -fsSL https://claude.ai/install.sh | bash',
      'linux-other':  'curl -fsSL https://claude.ai/install.sh | bash',
      'macos':        'curl -fsSL https://claude.ai/install.sh | bash  # fallback: brew install --cask claude-code',
      'windows':      'powershell -Command "irm https://claude.ai/install.ps1 | iex"  # fallback: winget install Anthropic.ClaudeCode',
    },
  };
  return (cmds[depName] && cmds[depName][osTag]) || null;
}

function cmdInstallDeps() {
  header('marketing-doma install-deps — instalação automática de pré-requisitos');

  const osTag = detectOS();
  log(`  Sistema: ${c('cyan', osTag)}`);

  if (osTag === 'unknown' || osTag === 'linux-other') {
    warn('Sistema não reconhecido. Use `marketing-doma doctor` pra ver comandos sugeridos.');
    process.exit(1);
  }

  const missing = missingDeps(osTag);

  if (missing.length === 0) {
    ok('Todas as dependências já instaladas.');
    return;
  }

  warn(`${missing.length} dependência(s) faltando: ${missing.map(d => d.name).join(', ')}`);
  log('');
  log(c('yellow', '⚠️  ATENÇÃO: install-deps roda comandos com privilégio elevado (sudo/admin).'));
  log(c('yellow', '   Você verá prompts de senha. Verifique cada comando antes de aceitar.'));
  log('');

  // git + bash primeiro no Windows; claude/python são opcionais no install
  const order = ['git', 'bash', 'python3', 'node', 'npm'];
  const sorted = missing.slice().sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  for (const d of sorted) {
    const cmd = installCmdFor(d.name, osTag);
    if (!cmd) {
      warn(`${d.name}: sem comando automático — instale manualmente.`);
      continue;
    }
    log(c('bold', `\n▸ Instalando ${d.label}:`));
    log(c('gray', `  $ ${cmd}`));
    // runInstallCmd usa cmd.exe no Windows se bash ainda falta (catch-22 git/bash).
    const r = runInstallCmd(cmd);
    if (r.ok) ok(`${d.label} instalado.`);
    else warn(`${d.label}: install falhou. Tente manualmente: ${cmd}`);
  }

  log('');
  log(c('green', '🎉 install-deps concluído.'));
  log(`Verifique com: ${c('cyan', 'marketing-doma doctor')}`);
  log(`Depois rode: ${c('cyan', 'marketing-doma install')}`);
}

function cmdHelp() {
  log(`
${c('bold', 'marketing-doma')} — CLI do plugin Claude Code

${c('bold', 'Comandos:')}
  ${c('cyan', 'install-advanced')} Python venv (audit, layout-mapper, wizard — opcional).
  ${c('cyan', 'install')}      Download + Remotion + sync + Claude/Cursor (tudo em um).
  ${c('cyan', 'update')}       Atualiza plugin + re-sync Remotion/IDE (mesmo se já na última).
  ${c('cyan', 'status')}       Versão local vs remota + saúde da instalação + pré-requisitos.
  ${c('cyan', 'export')}       Empacota edições locais (live-rules, planos, edits) em tarball pro dev.
  ${c('cyan', 'install-deps')} Instala git/bash/python no SO (legado — install não precisa).
  ${c('cyan', 'uninstall')}    Remove plugin (mantém este CLI).
  ${c('cyan', 'version')}      Mostra versão do CLI + plugin.
  ${c('cyan', 'help')}         Esta tela.

${c('bold', 'Instalação 100% local — só nesta pasta, nada global.')}

${c('bold', 'Instalação (100% local — só nesta pasta):')}
  mkdir meu-projeto && cd meu-projeto
  npm init -y
  npm install marketing-doma-cli      ← local, NÃO usar -g
  npm run doma:install                ← plugin + Remotion + .claude + .cursor
  claude → /marketing-doma

${c('bold', 'Onde fica cada coisa:')}
  node_modules/marketing-doma-cli/    ← CLI (local)
  .claude/plugins/marketing-doma/     ← plugin (tarball GitHub, sem clone)
  .claude/settings.json               ← Claude Code
  .cursor/hooks.json + rules/         ← Cursor
  remotion-doma/                      ← renders
`);
}

function main() {
  const cmd = (process.argv[2] || 'help').toLowerCase();
  const run = (fn) => Promise.resolve(fn()).catch((e) => fail(e.message || String(e)));

  switch (cmd) {
    case 'doctor':
    case 'd':
    case 'check':
      return run(cmdStatus);
    case 'install-deps':
    case 'deps':
      return cmdInstallDeps();
    case 'export':
    case 'pack':
      return cmdExport();
    case 'install':
    case 'i':
      return run(cmdInstall);
    case 'install-advanced':
    case 'advanced':
      return cmdInstallAdvanced();
    case 'update':
    case 'upgrade':
    case 'u':
      return run(cmdUpdate);
    case 'status':
    case 's':
      return run(cmdStatus);
    case 'uninstall':
    case 'remove':
      return cmdUninstall();
    case 'version':
    case '-v':
    case '--version':
      return cmdVersion();
    case 'help':
    case '-h':
    case '--help':
      return cmdHelp();
    default:
      log(c('red', `Comando desconhecido: ${cmd}`));
      cmdHelp();
      process.exit(1);
  }
}

main();
