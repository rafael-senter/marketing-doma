#!/usr/bin/env node
/** Sobe Remotion studio :3010 (cross-platform, sem cmd.exe nem .cmd shim). */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '../../../../..');
const REMOTION = path.join(PROJECT, 'remotion-doma');
const LOG = path.join(process.env.TEMP || process.env.TMP || '/tmp', 'remotion-marketing-doma.log');

function portOpen(port) {
  return new Promise((resolve) => {
    const s = net.createConnection({ port, host: '127.0.0.1' });
    s.on('connect', () => { s.destroy(); resolve(true); });
    s.on('error', () => resolve(false));
  });
}

/**
 * Resolve o entrypoint JS do remotion CLI para rodar via `node` diretamente.
 * spawn('npx.cmd') / spawn('remotion.cmd') dá EINVAL no Windows com shell:false
 * (Node 24). Rodar o .js via process.execPath evita cmd.exe e .cmd shims.
 */
function resolveLauncher() {
  // Entrypoint real do CLI: remotion-doma/node_modules/@remotion/cli/remotion-cli.js
  const cliJs = path.join(REMOTION, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
  if (fs.existsSync(cliJs)) {
    return { exec: process.execPath, args: [cliJs, 'studio', '--no-open', '--port', '3010'] };
  }
  // Fallback: npx-cli.js via node (sem cmd.exe)
  const nodeDir = path.dirname(process.execPath);
  for (const npx of [
    path.join(nodeDir, 'node_modules', 'npm', 'bin', 'npx-cli.js'),
    path.join(nodeDir, '..', 'lib', 'node_modules', 'npm', 'bin', 'npx-cli.js'),
  ]) {
    if (fs.existsSync(npx)) {
      return { exec: process.execPath, args: [npx, 'remotion', 'studio', '--no-open', '--port', '3010'] };
    }
  }
  // Último recurso: npx via shell (resolve .cmd no Windows)
  return { exec: 'npx', args: ['remotion', 'studio', '--no-open', '--port', '3010'], shell: true };
}

if (!fs.existsSync(REMOTION)) process.exit(0);
if (await portOpen(3010)) process.exit(0);

const out = fs.openSync(LOG, 'a');
const { exec, args, shell } = resolveLauncher();
const child = spawn(exec, args, {
  cwd: REMOTION,
  detached: true,
  stdio: ['ignore', out, out],
  shell: shell || false,
  windowsHide: true,
});
child.unref();
