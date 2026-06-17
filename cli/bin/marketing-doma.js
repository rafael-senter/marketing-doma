#!/usr/bin/env node
/*
 * marketing-doma CLI — wrapper Node.js do plugin Claude Code.
 *
 * Comandos:
 *   marketing-doma install         clone plugin + bash install.sh  (1ª vez)
 *   marketing-doma update          git pull no plugin              (atualizar)
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
const PLUGIN_DIR = path.join(os.homedir(), '.local', 'share', 'marketing-doma');
const CLAUDE_SYMLINK = path.join(os.homedir(), '.claude', 'plugins', 'marketing-doma');
const CLI_VERSION = require('../package.json').version;

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
  // No Windows usa bash do Git for Windows se não está no PATH.
  // No Linux/macOS usa 'bash' (sempre presente).
  // Cache findBash() pra não procurar todo call.
  if (!sh._bashPath) sh._bashPath = process.platform === 'win32' ? (findBash() || 'bash') : 'bash';
  const result = spawnSync(sh._bashPath, ['-c', cmd], {
    stdio: opts.silent ? 'pipe' : 'inherit',
    encoding: 'utf8',
    ...opts,
  });
  if (result.status !== 0 && !opts.allowFail) {
    fail(`Comando falhou: ${cmd}\n${result.stderr || ''}`);
  }
  return { ok: result.status === 0, stdout: result.stdout || '', stderr: result.stderr || '' };
}

function checkPrereqs() {
  for (const cmd of ['git', 'bash']) {
    const r = sh(`command -v ${cmd}`, { silent: true, allowFail: true });
    if (!r.ok) fail(`${cmd} não encontrado. Instale ${cmd} antes de continuar.`);
  }
}

function pluginVersion() {
  const pluginJson = path.join(PLUGIN_DIR, 'plugin.json');
  if (!fs.existsSync(pluginJson)) return null;
  try {
    return JSON.parse(fs.readFileSync(pluginJson, 'utf8')).version;
  } catch {
    return null;
  }
}

function remoteVersion() {
  const r = sh(
    `git ls-remote --tags ${REPO_URL} 'v*' | awk '{print $2}' | sed 's|refs/tags/||; s|\\^{}||' | sort -V -u | tail -1`,
    { silent: true, allowFail: true }
  );
  if (!r.ok) return null;
  return r.stdout.trim().replace(/^v/, '').replace(/\^\{\}$/, '') || null;
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
  const deps = depsTable();
  return deps.filter(d => {
    // No Windows, 'bash' é checado via findBash() (que procura no Git for Windows também).
    if (d.name === 'bash' && osTag === 'windows') {
      return !findBash();
    }
    const cmdName = osTag === 'windows' && !isGitBash() && d.altWindows ? d.altWindows : d.name;
    return !which(cmdName);
  });
}

function cmdInstall() {
  header('marketing-doma install');
  checkPrereqs();

  // Pré-check: verificar deps no PATH antes de prosseguir
  const osTag = detectOS();
  const missing = missingDeps(osTag);
  if (missing.length > 0) {
    warn(`Pré-requisitos faltando: ${missing.map(d => d.name).join(', ')}`);
    log('');
    if (process.env.MARKETING_DOMA_FORCE) {
      log(c('yellow', 'MARKETING_DOMA_FORCE=1 setado — pulando install-deps.'));
    } else {
      const wantAuto = promptYesNo('Instalar automaticamente agora? (sudo/admin)', true);
      if (wantAuto) {
        cmdInstallDeps();
        // Re-verifica
        const stillMissing = missingDeps(osTag);
        if (stillMissing.length > 0) {
          warn(`Ainda faltam: ${stillMissing.map(d => d.name).join(', ')}`);
          info('Instale manualmente (rode `marketing-doma doctor` pra ver comandos) e tente de novo.');
          process.exit(1);
        }
        ok('Deps OK. Continuando install do plugin...');
        log('');
      } else {
        info('Rode `marketing-doma doctor` pra ver comandos manuais.');
        process.exit(1);
      }
    }
  }

  if (fs.existsSync(PLUGIN_DIR)) {
    warn(`Plugin já existe em ${PLUGIN_DIR}`);
    info('Rode `marketing-doma update` para atualizar ou `marketing-doma uninstall` para remover.');
    process.exit(0);
  }

  info(`Clonando plugin em ${PLUGIN_DIR}`);
  fs.mkdirSync(path.dirname(PLUGIN_DIR), { recursive: true });
  sh(`git clone --depth 1 ${REPO_URL} ${PLUGIN_DIR}`);
  ok('Plugin clonado');

  info('Rodando install.sh (registra no Claude Code global)');
  sh(`bash ${PLUGIN_DIR}/install.sh`);
  ok('install.sh concluído');

  const v = pluginVersion();
  log('');
  log(c('green', `🎉 Plugin marketing-doma ${v || ''} instalado!`));
  log('');
  log('Próximo passo: abrir Claude Code numa pasta de trabalho qualquer e rodar:');
  log(c('cyan', '  /marketing-doma:marketing-doma-setup'));
  log('');
  log('Para atualizar futuramente:');
  log(c('cyan', '  marketing-doma update'));
}

function cmdUpdate() {
  header('marketing-doma update');
  checkPrereqs();

  if (!fs.existsSync(PLUGIN_DIR)) {
    warn('Plugin não está instalado.');
    info('Rode `marketing-doma install` primeiro.');
    process.exit(1);
  }

  const before = pluginVersion();
  info(`Versão atual: ${before || 'desconhecida'}`);

  info('Buscando atualizações no GitHub...');
  const pullResult = sh(`cd ${PLUGIN_DIR} && git fetch --tags origin main && git pull --ff-only origin main`, {
    allowFail: true,
  });

  if (!pullResult.ok) {
    warn('git pull falhou — possível conflito local. Forçando reset?');
    fail('Conflito em ' + PLUGIN_DIR + '. Investigue manualmente (git status) ou rode `marketing-doma uninstall && marketing-doma install`.');
  }

  const after = pluginVersion();
  if (before === after) {
    ok(`Já está na última versão (${after}).`);
  } else {
    ok(`Atualizado: ${before} → ${after}`);
  }

  // Re-rodar install.sh é seguro (idempotente) — garante symlink + settings.json corretos.
  info('Re-rodando install.sh (idempotente)');
  sh(`bash ${PLUGIN_DIR}/install.sh`);
  ok('install.sh OK');

  log('');
  log(c('green', '🎉 Plugin atualizado!'));
}

function cmdStatus() {
  header('marketing-doma status');

  // 1. Versões CLI + plugin
  log(`  CLI version:                ${c('cyan', CLI_VERSION)}`);

  if (!fs.existsSync(PLUGIN_DIR)) {
    warn('Plugin NÃO instalado.');
    info('Rode `marketing-doma install`.');
    log('');
  } else {
    const local = pluginVersion();
    log(`  Plugin local:               ${c('cyan', local || '?')}  ${c('gray', PLUGIN_DIR)}`);

    info('Verificando última versão no GitHub...');
    const remote = remoteVersion();
    if (remote) {
      log(`  Plugin remoto (GitHub):     ${c('cyan', remote)}`);
      if (local && remote && local !== remote) {
        warn(`Há atualização disponível: ${local} → ${remote}`);
        info('Rode `marketing-doma update`.');
      } else if (local === remote) {
        ok('Plugin atualizado.');
      }
    } else {
      warn('Não foi possível consultar GitHub (offline ou acesso negado).');
    }

    if (fs.existsSync(CLAUDE_SYMLINK)) {
      const target = fs.realpathSync(CLAUDE_SYMLINK);
      ok(`Symlink Claude Code OK  ${c('gray', '→ ' + target)}`);
    } else {
      warn(`Symlink ${CLAUDE_SYMLINK} não encontrado — install.sh não rodou.`);
    }
  }

  // 2. Pré-requisitos do sistema
  log('');
  log(c('bold', '── Pré-requisitos do sistema ──'));
  const osTag = detectOS();
  log(`  Sistema: ${c('cyan', osTag)} ${isGitBash() ? c('gray', '(Git Bash)') : ''}`);
  log('');

  const deps = depsTable();
  const missing = [];

  for (const d of deps) {
    // Bash no Windows: usa findBash() (procura no Git for Windows também).
    if (d.name === 'bash' && osTag === 'windows') {
      const bashPath = findBash();
      if (!bashPath) {
        log(`  ${c('red', '✗')} ${d.label.padEnd(20)} ${c('gray', 'não encontrado (precisa Git for Windows)')}`);
        missing.push(d.name);
      } else {
        log(`  ${c('green', '✓')} ${d.label.padEnd(20)} ${c('gray', bashPath)}`);
      }
      continue;
    }
    const cmdName = osTag === 'windows' && !isGitBash() && d.altWindows ? d.altWindows : d.name;
    const path = which(cmdName);
    if (!path) {
      log(`  ${c('red', '✗')} ${d.label.padEnd(20)} ${c('gray', 'não encontrado')}`);
      missing.push(d.name);
      continue;
    }
    const v = checkCmdVersion(cmdName);
    log(`  ${c('green', '✓')} ${d.label.padEnd(20)} ${c('cyan', v || '?')}`);
  }

  log('');
  if (missing.length === 0) {
    ok('Todos os pré-requisitos OK.');
  } else {
    warn(`${missing.length} dep(s) faltando: ${missing.map(d => d).join(', ')}`);
    info('Rode `marketing-doma install` (oferece instalar automaticamente).');
    info('Ou veja comandos manuais: `marketing-doma install-deps --dry-run` (não implementado — use install-deps).');
  }
}

function cmdUninstall() {
  header('marketing-doma uninstall');

  if (!fs.existsSync(PLUGIN_DIR)) {
    warn('Plugin não está instalado.');
    process.exit(0);
  }

  info('Rodando install.sh --uninstall (remove symlinks + settings)');
  sh(`bash ${PLUGIN_DIR}/install.sh --uninstall`, { allowFail: true });

  info(`Apagando ${PLUGIN_DIR}`);
  fs.rmSync(PLUGIN_DIR, { recursive: true, force: true });
  ok('Plugin removido.');

  log('');
  log('CLI continua instalado. Para remover: ' + c('cyan', 'npm uninstall -g marketing-doma-cli'));
}

function cmdVersion() {
  log(`marketing-doma-cli ${CLI_VERSION}`);
  const v = pluginVersion();
  if (v) log(`plugin ${v} (em ${PLUGIN_DIR})`);
  else log('plugin não instalado');
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
  // Cross-platform "which" — usa spawnSync direto pra evitar dependência circular com sh()/findBash().
  // Linux/macOS: `command -v` via /bin/sh (sempre presente).
  // Windows: `where.exe` (built-in, não precisa de bash).
  const isWin = process.platform === 'win32';
  const r = isWin
    ? spawnSync('where.exe', [cmd], { encoding: 'utf8' })
    : spawnSync('/bin/sh', ['-c', `command -v ${cmd}`], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  return (r.stdout || '').trim().split('\n')[0] || null;
}

// Localiza bash.exe no Windows mesmo sem estar no PATH (vem com Git for Windows).
// No Linux/macOS, retorna 'bash' (sempre no PATH).
function findBash() {
  if (process.platform !== 'win32') return 'bash';
  // Tenta no PATH primeiro
  const inPath = which('bash');
  if (inPath) return inPath;
  // Locais conhecidos do Git for Windows
  const candidates = [
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
    `${process.env.LOCALAPPDATA || ''}\\Programs\\Git\\bin\\bash.exe`,
    `${process.env.ProgramW6432 || ''}\\Git\\bin\\bash.exe`,
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
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
    { name: 'node', minVersion: '18', label: 'Node.js' },
    { name: 'npm', minVersion: '9', label: 'npm' },
    { name: 'git', minVersion: '2.30', label: 'git' },
    { name: 'bash', minVersion: '4', label: 'bash' },
    { name: 'python3', minVersion: '3.10', label: 'Python 3', altWindows: 'python' },
    { name: 'claude', minVersion: null, label: 'Claude Code CLI' },
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
      'linux-debian': 'curl -fsSL https://claude.ai/install.sh | sh',
      'linux-fedora': 'curl -fsSL https://claude.ai/install.sh | sh',
      'linux-arch':   'curl -fsSL https://claude.ai/install.sh | sh',
      'macos':        'curl -fsSL https://claude.ai/install.sh | sh',
      'windows':      '# Baixar de https://claude.com/claude-code (instalador Windows)',
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

  for (const d of missing) {
    const cmd = installCmdFor(d.name, osTag);
    if (!cmd) {
      warn(`${d.name}: sem comando automático — instale manualmente.`);
      continue;
    }
    log(c('bold', `\n▸ Instalando ${d.label}:`));
    log(c('gray', `  $ ${cmd}`));
    const r = sh(cmd, { allowFail: true });
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
  ${c('cyan', 'install')}      Instala plugin. Verifica pré-requisitos e oferece instalar faltantes.
  ${c('cyan', 'update')}       Atualiza plugin (git pull no GitHub).
  ${c('cyan', 'status')}       Versão local vs remota + saúde da instalação + pré-requisitos.
  ${c('cyan', 'install-deps')} Instala pré-requisitos faltantes (sudo/admin) — chamado automático pelo install.
  ${c('cyan', 'uninstall')}    Remove plugin (mantém este CLI).
  ${c('cyan', 'version')}      Mostra versão do CLI + plugin.
  ${c('cyan', 'help')}         Esta tela.

${c('bold', 'Uso típico (1ª vez):')}
  npm install -g marketing-doma-cli
  marketing-doma install

${c('bold', 'Atualizar:')}
  marketing-doma update

${c('bold', 'Mais info:')}
  Plugin: ${REPO_URL.replace('.git', '')}
  Instala em: ${PLUGIN_DIR}
  Symlink Claude Code: ${CLAUDE_SYMLINK}
`);
}

function main() {
  const cmd = (process.argv[2] || 'help').toLowerCase();
  switch (cmd) {
    case 'doctor':       // alias retrocompat — mergeado em status
    case 'd':
    case 'check':
      return cmdStatus();
    case 'install-deps':
    case 'deps':
      return cmdInstallDeps();
    case 'install':
    case 'i':
      return cmdInstall();
    case 'update':
    case 'upgrade':
    case 'u':
      return cmdUpdate();
    case 'status':
    case 's':
      return cmdStatus();
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
