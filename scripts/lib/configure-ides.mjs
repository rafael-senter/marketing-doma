#!/usr/bin/env node
/**
 * Configura projeto para Claude Code + Cursor (local, cross-platform).
 * Uso: node configure-ides.mjs [PROJECT_ROOT]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname, '../..');
const PROJECT_ROOT = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.env.MARKETING_DOMA_PROJECT
    ? path.resolve(process.env.MARKETING_DOMA_PROJECT)
    : process.cwd();

/** Relativo ao projeto — funciona Linux, macOS, Windows (Node aceita /). */
const REMOTION_HOOK = 'node .claude/skills/marketing-doma/scripts/lib/start-remotion.mjs';

function readJson(p) {
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; }
}

function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function mergeClaudeSettings() {
  const p = path.join(PROJECT_ROOT, '.claude/settings.json');
  const s = readJson(p);

  // Plugin em .claude/skills/ é descoberto automaticamente (skills-dir) — não usa
  // enabledPlugins. Remove entrada legacy que apontava p/ marketplace inexistente.
  if (s.enabledPlugins && s.enabledPlugins['marketing-doma@marketing-doma']) {
    delete s.enabledPlugins['marketing-doma@marketing-doma'];
    if (Object.keys(s.enabledPlugins).length === 0) delete s.enabledPlugins;
  }

  const hasHook = JSON.stringify(s).includes('start-remotion');
  if (!hasHook) {
    s.hooks = s.hooks || {};
    s.hooks.SessionStart = s.hooks.SessionStart || [];
    s.hooks.SessionStart.push({
      hooks: [{ type: 'command', command: REMOTION_HOOK, timeout: 5 }],
    });
  }
  writeJson(p, s);
  console.log('  [OK]   .claude/settings.json (Claude Code)');
}

function mergeCursorHooks() {
  const p = path.join(PROJECT_ROOT, '.cursor/hooks.json');
  const h = readJson(p);
  h.version = h.version || 1;
  h.hooks = h.hooks || {};

  const list = h.hooks.sessionStart || [];
  const has = list.some((x) => (x.command || '').includes('start-remotion'));
  if (!has) {
    list.push({ command: REMOTION_HOOK, timeout: 5 });
  }
  h.hooks.sessionStart = list;
  writeJson(p, h);
  console.log('  [OK]   .cursor/hooks.json (Cursor)');
}

function installCursorRules() {
  const rulesDir = path.join(PROJECT_ROOT, '.cursor/rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const templates = [
    'marketing-doma.mdc',
    'marketing-doma-setup.mdc',
  ];
  for (const name of templates) {
    const src = path.join(PLUGIN_DIR, 'templates/cursor/rules', name);
    const dst = path.join(rulesDir, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
      console.log(`  [OK]   .cursor/rules/${name}`);
    }
  }
}

/**
 * Cursor não descobre os commands do plugin (.claude/skills/.../commands/) —
 * só lê .cursor/commands/*.md. Copiamos cada command pra lá (o Cursor não
 * suporta referência a arquivo externo, então o conteúdo precisa estar local).
 * Source of truth continua sendo o plugin; isto é um espelho gerado no install.
 */
function installCursorCommands() {
  const srcDir = path.join(PLUGIN_DIR, 'commands');
  if (!fs.existsSync(srcDir)) return;
  const dstDir = path.join(PROJECT_ROOT, '.cursor/commands');
  fs.mkdirSync(dstDir, { recursive: true });

  let n = 0;
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.endsWith('.md')) continue;
    const body = fs.readFileSync(path.join(srcDir, file), 'utf8');
    // Cursor usa o nome do arquivo como nome do comando; mantém o conteúdo igual.
    fs.writeFileSync(path.join(dstDir, file), body);
    n++;
  }
  if (n) console.log(`  [OK]   .cursor/commands/ (${n} comandos)`);
}

function copyHostFile(templateName, destName) {
  const src = path.join(PLUGIN_DIR, 'templates', templateName);
  const dst = path.join(PROJECT_ROOT, destName);
  if (!fs.existsSync(dst) && fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`  [OK]   ${destName}`);
  }
}

export function configureProject(root = PROJECT_ROOT) {
  process.env.MARKETING_DOMA_PROJECT = root;
  console.log(`==> IDE config: ${root}`);
  mergeClaudeSettings();
  mergeCursorHooks();
  installCursorRules();
  installCursorCommands();
  copyHostFile('host-CURSOR.md', 'CURSOR.md');
  copyHostFile('host-CLAUDE.md', 'CLAUDE.md');
}

if (process.argv[1] && process.argv[1].includes('configure-ides')) {
  configureProject();
  console.log('\n✅ Claude Code + Cursor configurados (local, sem global).');
}
