#!/usr/bin/env node
/** Sync plugin → remotion-doma host (Node, cross-platform). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname, '../..');
const PROJECT_ROOT = process.env.MARKETING_DOMA_PROJECT
  ? path.resolve(process.env.MARKETING_DOMA_PROJECT)
  : process.cwd();
const HOST = path.join(PROJECT_ROOT, 'remotion-doma');

function cpNewer(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (!fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs) {
    fs.copyFileSync(src, dst);
  }
}

function cpGlob(srcDir, dstDir, exts) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    if (exts.some((e) => f.endsWith(e))) cpNewer(path.join(srcDir, f), path.join(dstDir, f));
  }
}

if (!fs.existsSync(HOST)) {
  console.error(`[ERRO] remotion-doma não existe em ${PROJECT_ROOT}. Rode marketing-doma install.`);
  process.exit(1);
}

console.log('==> Sync plugin → host');
console.log(`    Plugin: ${PLUGIN_DIR}`);
console.log(`    Host:   ${HOST}\n`);

console.log('[1/4] Infra');
cpNewer(path.join(PLUGIN_DIR, 'templates/components/_base/theme.ts'), path.join(HOST, 'src/theme.ts'));
cpNewer(path.join(PLUGIN_DIR, 'templates/components/_base/components.tsx'), path.join(HOST, 'src/components.tsx'));

console.log('[2/4] Componentes');
const compsRoot = path.join(PLUGIN_DIR, 'templates/components');
for (const cat of fs.readdirSync(compsRoot)) {
  if (cat === '_base' || cat === 'blocks') continue;
  const catDir = path.join(compsRoot, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  const dstCat = path.join(HOST, 'src/v2/categorias', cat);
  fs.mkdirSync(dstCat, { recursive: true });
  for (const f of fs.readdirSync(catDir)) {
    if (f.endsWith('.tsx')) cpNewer(path.join(catDir, f), path.join(dstCat, f));
  }
}

console.log('[3/4] Assets');
cpGlob(path.join(PLUGIN_DIR, 'assets/oficial'), path.join(HOST, 'public/oficial'), ['.png', '.svg']);
cpGlob(path.join(PLUGIN_DIR, 'assets/icones'), path.join(HOST, 'public/icones'), ['.png', '.svg', '.jpg']);
cpGlob(path.join(PLUGIN_DIR, 'assets/fontes'), path.join(HOST, 'public/fontes'), ['.woff', '.woff2', '.ttf', '.otf']);
for (const sub of ['bases-nanobanana', 'bases-nanobanana-transparente', 'bases-nanobanana-soft', 'bases-nanobanana-grafite']) {
  cpGlob(path.join(PLUGIN_DIR, 'assets', sub), path.join(HOST, 'public/oficial'), ['.png']);
}
for (const sub of ['fotos', 'grafismos', 'cards-clientes']) {
  cpGlob(path.join(PLUGIN_DIR, 'assets', sub), path.join(HOST, 'public/oficial'), ['.png', '.jpg']);
}
const blocks = path.join(PLUGIN_DIR, 'templates/components/blocks');
if (fs.existsSync(blocks)) {
  const dstBlocks = path.join(HOST, 'src/v2/blocks');
  fs.mkdirSync(dstBlocks, { recursive: true });
  for (const f of fs.readdirSync(blocks)) {
    if (f.endsWith('.tsx')) cpNewer(path.join(blocks, f), path.join(dstBlocks, f));
  }
}

console.log('[4/4] .npmrc');
const npmrc = path.join(HOST, '.npmrc');
if (!fs.existsSync(npmrc) || !fs.readFileSync(npmrc, 'utf8').includes('min-release-age=0')) {
  fs.writeFileSync(npmrc, 'min-release-age=0\n');
}

console.log('\n✅ Sync OK.');
