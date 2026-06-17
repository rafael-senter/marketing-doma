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
  const result = spawnSync('bash', ['-c', cmd], {
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

function cmdInstall() {
  header('marketing-doma install');
  checkPrereqs();

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

  log(`  CLI version (este script):  ${c('cyan', CLI_VERSION)}`);

  if (!fs.existsSync(PLUGIN_DIR)) {
    warn('Plugin NÃO instalado.');
    info('Rode `marketing-doma install`.');
    return;
  }

  const local = pluginVersion();
  log(`  Plugin local (${PLUGIN_DIR}):  ${c('cyan', local || '?')}`);

  info('Verificando última versão no GitHub...');
  const remote = remoteVersion();
  if (!remote) {
    warn('Não foi possível consultar GitHub (offline ou acesso negado).');
    return;
  }
  log(`  Plugin remoto (GitHub):  ${c('cyan', remote)}`);

  if (local && remote && local !== remote) {
    warn(`Há atualização disponível: ${local} → ${remote}`);
    info('Rode `marketing-doma update`.');
  } else if (local === remote) {
    ok('Plugin atualizado.');
  }

  // Symlink check
  if (fs.existsSync(CLAUDE_SYMLINK)) {
    const target = fs.realpathSync(CLAUDE_SYMLINK);
    ok(`Symlink Claude Code: ${CLAUDE_SYMLINK} → ${target}`);
  } else {
    warn(`Symlink ${CLAUDE_SYMLINK} não encontrado — install.sh não rodou ou foi removido.`);
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

function cmdHelp() {
  log(`
${c('bold', 'marketing-doma')} — CLI do plugin Claude Code

${c('bold', 'Comandos:')}
  ${c('cyan', 'install')}      Instala plugin (clone GitHub + registra no Claude Code).
  ${c('cyan', 'update')}       Atualiza plugin (git pull no GitHub).
  ${c('cyan', 'status')}       Mostra versão local vs remota + saúde da instalação.
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
