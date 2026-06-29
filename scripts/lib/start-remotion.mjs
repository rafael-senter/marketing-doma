#!/usr/bin/env node
/** Sobe Remotion studio :3010 (Windows-friendly, sem bash). */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '../../../../..');
const REMOTION = path.join(PROJECT, 'remotion-doma');
const LOG = path.join(process.env.TEMP || '/tmp', 'remotion-marketing-doma.log');

function portOpen(port) {
  return new Promise((resolve) => {
    const s = net.createConnection({ port, host: '127.0.0.1' });
    s.on('connect', () => { s.destroy(); resolve(true); });
    s.on('error', () => resolve(false));
  });
}

if (!fs.existsSync(REMOTION)) process.exit(0);
if (await portOpen(3010)) process.exit(0);

const out = fs.openSync(LOG, 'a');
const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['remotion', 'studio', '--no-open', '--port', '3010'],
  { cwd: REMOTION, detached: true, stdio: ['ignore', out, out], shell: process.platform === 'win32' }
);
child.unref();
