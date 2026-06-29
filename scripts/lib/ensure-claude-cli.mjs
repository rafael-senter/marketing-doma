#!/usr/bin/env node
/**
 * Instala Claude Code CLI se ausente — por OS, tenta métodos em ordem até um funcionar.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ok = (m) => console.log(`  [OK]   ${m}`);
const inst = (m) => console.log(`  [INSTALL] ${m}`);
const warn = (m) => console.warn(`  [WARN] ${m}`);

function isWindowsStoreStub(p) {
  const norm = String(p).replace(/\\/g, '/').toLowerCase();
  return norm.includes('windowsapps') || norm.includes('microsoft/windowsapps');
}

function which(cmd) {
  const isWin = process.platform === 'win32';
  const r = isWin
    ? spawnSync('where.exe', [cmd], { encoding: 'utf8', shell: false })
    : spawnSync('/bin/sh', ['-c', `command -v ${cmd} 2>/dev/null`], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  for (const line of (r.stdout || '').trim().split(/\r?\n/)) {
    const p = line.trim();
    if (p && !(isWin && isWindowsStoreStub(p))) return p;
  }
  return null;
}

export function findClaudeCli() {
  const inPath = which('claude');
  if (inPath) return inPath;
  const home = os.homedir();
  for (const p of [
    path.join(home, '.local', 'bin', 'claude'),
    path.join(home, '.local', 'bin', 'claude.exe'),
    path.join(process.env.APPDATA || '', 'npm', 'claude.cmd'),
    path.join(process.env.APPDATA || '', 'npm', 'claude'),
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'claude', 'claude.exe'),
  ]) {
    if (p && fs.existsSync(p)) return p;
  }
  return null;
}

function runShell(label, shellCmd, opts = {}) {
  inst(label);
  const isWin = process.platform === 'win32';
  let r;
  if (isWin && opts.powershell) {
    r = spawnSync(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', shellCmd],
      { stdio: 'inherit', shell: false }
    );
  } else if (isWin) {
    r = spawnSync('cmd.exe', ['/c', shellCmd], { stdio: 'inherit', shell: false });
  } else {
    r = spawnSync('bash', ['-lc', shellCmd], { stdio: 'inherit', shell: false });
  }
  if (r.status !== 0 && !opts.allowFail) {
    throw new Error(`${label} exit ${r.status}`);
  }
  return r.status === 0;
}

function installMethodsForPlatform() {
  if (process.platform === 'win32') {
    return [
      {
        label: 'Claude Code — PowerShell (install.ps1)',
        run: () => runShell(
          'Windows: irm claude.ai/install.ps1 | iex',
          'irm https://claude.ai/install.ps1 | iex',
          { powershell: true, allowFail: true }
        ),
      },
      {
        label: 'Claude Code — WinGet Anthropic.ClaudeCode',
        run: () => runShell(
          'Windows: winget install Anthropic.ClaudeCode',
          'winget install Anthropic.ClaudeCode --accept-source-agreements --accept-package-agreements',
          { allowFail: true }
        ),
      },
    ];
  }
  if (process.platform === 'darwin') {
    return [
      {
        label: 'Claude Code — install.sh (macOS/Linux)',
        run: () => runShell(
          'macOS: curl claude.ai/install.sh | bash',
          'curl -fsSL https://claude.ai/install.sh | bash',
          { allowFail: true }
        ),
      },
      ...(which('brew') ? [{
        label: 'Claude Code — Homebrew cask',
        run: () => runShell(
          'macOS: brew install --cask claude-code',
          'brew install --cask claude-code',
          { allowFail: true }
        ),
      }] : []),
    ];
  }
  // linux / WSL
  return [
    {
      label: 'Claude Code — install.sh',
      run: () => runShell(
        'Linux/WSL: curl claude.ai/install.sh | bash',
        'curl -fsSL https://claude.ai/install.sh | bash',
        { allowFail: true }
      ),
    },
  ];
}

/** @returns {{ installed: boolean, path: string|null, skipped: boolean }} */
export function ensureClaudeCli() {
  const existing = findClaudeCli();
  if (existing) {
    ok(`Claude Code CLI já instalado (${existing})`);
    return { installed: true, path: existing, skipped: true };
  }

  warn('Claude Code CLI não encontrado — tentando instalar automaticamente...');
  warn('Requer conta Claude paga (Pro/Max/Team/Enterprise/Console).');

  for (const method of installMethodsForPlatform()) {
    try {
      method.run();
    } catch (e) {
      warn(`${method.label} falhou: ${e.message}`);
      continue;
    }
    const found = findClaudeCli();
    if (found) {
      ok(`Claude Code CLI instalado (${found})`);
      return { installed: true, path: found, skipped: false };
    }
    warn(`${method.label} terminou mas 'claude' ainda não está no PATH — tentando próximo método...`);
  }

  warn('Não foi possível instalar Claude Code CLI automaticamente.');
  warn('Instale manualmente: https://claude.com/claude-code');
  warn('Ou use a extensão Claude Code no VS Code (conta Anthropic necessária).');
  return { installed: false, path: null, skipped: false };
}

if (process.argv[1]?.includes('ensure-claude-cli')) {
  const r = ensureClaudeCli();
  process.exit(r.installed ? 0 : 0); // não bloqueia setup — VS Code extension OK
}
