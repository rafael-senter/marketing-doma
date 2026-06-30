#!/usr/bin/env node
/**
 * Renderiza um still scale 2 → Lanczos via sharp. 100% Node, cross-platform.
 * Substitui render-still.sh — funciona no Windows nativo (sem bash/Git Bash).
 *
 * Uso: node render-still.mjs <id> [width] [height]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = __dirname; // render-still.mjs vive na raiz de remotion-doma/

const id = process.argv[2];
const W = process.argv[3] || '1080';
const H = process.argv[4] || '1350';
if (!id) {
  console.error('Uso: node render-still.mjs <id> [width] [height]');
  process.exit(2);
}

const OUT = path.join(DIR, 'out', `${id}.png`);
const TMP = path.join(DIR, 'out', `_hi_${id}.png`);
const ENTRY = path.join(DIR, 'src', 'index.ts');
const RESIZE = path.join(DIR, 'scripts', 'resize-lanczos.mjs');

fs.mkdirSync(path.join(DIR, 'out'), { recursive: true });

/** Resolve o entrypoint JS do remotion CLI (sem .cmd, sem cmd.exe). */
function remotionCli() {
  const cli = path.join(DIR, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
  if (fs.existsSync(cli)) return cli;
  return null;
}

// 1. Render scale 2 (alta resolução) via node remotion-cli.js
const cli = remotionCli();
let r;
if (cli) {
  r = spawnSync(process.execPath, [cli, 'still', ENTRY, id, TMP, '--image-format=png', '--scale=2'], {
    cwd: DIR,
    stdio: ['ignore', 'ignore', 'inherit'],
  });
} else {
  // Fallback: npx via shell (resolve .cmd no Windows)
  r = spawnSync('npx', ['remotion', 'still', ENTRY, id, TMP, '--image-format=png', '--scale=2'], {
    cwd: DIR,
    stdio: ['ignore', 'ignore', 'inherit'],
    shell: true,
  });
}
if (r.status !== 0) {
  console.error(`✗ remotion still falhou (exit ${r.status})`);
  process.exit(r.status || 1);
}

// 2. Resize Lanczos → tamanho final (sharp)
const rz = spawnSync(process.execPath, [RESIZE, TMP, OUT, W, H], { stdio: 'inherit' });
if (rz.status !== 0) {
  console.error('✗ resize-lanczos falhou');
  process.exit(rz.status || 1);
}

// 3. Limpa o tmp de alta resolução
try { fs.unlinkSync(TMP); } catch {}

console.log(`✓ ${OUT}  (${W}×${H}, scale2→Lanczos/sharp, sem franja)`);
