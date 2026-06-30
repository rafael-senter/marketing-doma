#!/usr/bin/env node
/**
 * render-batch.mjs — renderiza N stills via render-still.mjs do host. 100% Node.
 * Funciona no Windows nativo (sem bash/Git Bash).
 *
 * Uso:
 *   node render-batch.mjs <id1> <id2> ...
 *   node render-batch.mjs <prefix> <N>     (range numerado: prefix-1..prefix-N)
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = __dirname; // render-batch.mjs vive na raiz de remotion-doma/
const RENDER_STILL = path.join(DIR, 'render-still.mjs');

const argv = process.argv.slice(2);
let ids = [];
if (argv.length === 2 && /^[0-9]+$/.test(argv[1])) {
  const prefix = argv[0];
  const n = parseInt(argv[1], 10);
  for (let i = 1; i <= n; i++) ids.push(`${prefix}-${i}`);
} else {
  ids = argv;
}

if (ids.length === 0) {
  console.log('Uso: node render-batch.mjs <id1> <id2> ... | <prefix> <N>');
  process.exit(1);
}

let ok = 0;
let fail = 0;
const failedIds = [];
for (const id of ids) {
  const r = spawnSync(process.execPath, [RENDER_STILL, id], { cwd: DIR, stdio: 'inherit' });
  if (r.status === 0) ok++;
  else { fail++; failedIds.push(id); }
}

console.log('');
console.log(`==> Render batch: ${ok} ok / ${fail} falha (total ${ids.length})`);
if (fail > 0) {
  console.log(`    Falharam: ${failedIds.join(' ')}`);
  process.exit(1);
}
