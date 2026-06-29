/** spawn cross-platform — no Windows resolve npm/npx via node + npm-cli.js (evita cmd.exe). */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Localiza o npm-cli.js / npx-cli.js para rodar via node diretamente.
 * Evita depender de cmd.exe (que falha com ENOENT quando ComSpec não está
 * no env do processo filho) e de .cmd shims (que dão EINVAL no spawnSync).
 */
function findNpmCli(tool) {
  // tool = 'npm' | 'npx' → npm-cli.js | npx-cli.js
  const cliFile = `${tool}-cli.js`;
  const candidates = [];

  // 1. Ao lado do executável do Node (instalação padrão Windows/Unix)
  const nodeDir = path.dirname(process.execPath);
  candidates.push(path.join(nodeDir, 'node_modules', 'npm', 'bin', cliFile));
  // Windows: npm fica em node_modules/npm dentro da pasta do node
  candidates.push(path.join(nodeDir, '..', 'node_modules', 'npm', 'bin', cliFile));
  // nvm / Unix: lib/node_modules
  candidates.push(path.join(nodeDir, '..', 'lib', 'node_modules', 'npm', 'bin', cliFile));

  // 2. Variável npm_execpath (definida quando rodando dentro de npm scripts)
  if (process.env.npm_execpath && process.env.npm_execpath.endsWith('.js')) {
    const npmDir = path.dirname(path.dirname(process.env.npm_execpath)); // .../npm
    candidates.push(path.join(npmDir, 'bin', cliFile));
  }

  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) return c;
    } catch {}
  }
  return null;
}

export function runCmd(cmd, args, opts = {}) {
  const isWin = process.platform === 'win32';
  let executable = cmd;
  let finalArgs = args;

  if (cmd === 'node') {
    executable = process.execPath;
  } else if (cmd === 'npm' || cmd === 'npx') {
    const cli = findNpmCli(cmd);
    if (cli) {
      // Roda via node diretamente — sem cmd.exe, sem .cmd shim.
      executable = process.execPath;
      finalArgs = [cli, ...args];
    } else if (isWin) {
      // Fallback: shell resolve o .cmd. shell:true evita EINVAL do spawnSync.
      executable = cmd;
      finalArgs = args;
    }
  }

  const r = spawnSync(executable, finalArgs, {
    cwd: opts.cwd || process.cwd(),
    stdio: opts.stdio ?? 'inherit',
    // shell só no fallback Windows (quando não achou npm-cli.js)
    shell: executable === cmd && isWin,
    env: { ...process.env, ...opts.env },
    encoding: opts.encoding,
  });
  if (r.error) {
    const err = new Error(`${cmd} ${args.join(' ')}: ${r.error.message}`);
    err.cause = r.error;
    throw err;
  }
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} falhou (exit ${r.status})`);
  }
  return r;
}
