#!/usr/bin/env node
'use strict';
/** Após npm install marketing-doma-cli — adiciona scripts doma:* no package.json do projeto. */
const fs = require('node:fs');
const path = require('node:path');

const root = process.env.INIT_CWD || process.cwd();
const pkgPath = path.join(root, 'package.json');
if (!fs.existsSync(pkgPath)) {
  // Postinstall rodou em um contexto sem package.json (ex: npm install -g)
  // Isso é OK — os scripts serão adicionados quando o usuário rodar em uma pasta com package.json
  process.exit(0);
}

let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch {
  // Não conseguiu fazer parse — maybe corrupted, skip silenciosamente
  process.exit(0);
}

const ver = require('./package.json').version;
pkg.scripts = pkg.scripts || {};
pkg.devDependencies = pkg.devDependencies || {};

const scripts = {
  'doma:install': 'marketing-doma install',
  'doma:update': 'marketing-doma update',
  'doma:status': 'marketing-doma status',
  'doma:setup': 'node .claude/plugins/marketing-doma/scripts/lib/install-deps.mjs',
  'doma:export': 'marketing-doma export',
};

let changed = false;
for (const [k, v] of Object.entries(scripts)) {
  if (pkg.scripts[k] !== v) {
    pkg.scripts[k] = v;
    changed = true;
  }
}
const dep = `^${ver}`;
if (pkg.devDependencies['marketing-doma-cli'] !== dep) {
  pkg.devDependencies['marketing-doma-cli'] = dep;
  changed = true;
}
if (pkg.private !== true) {
  pkg.private = true;
  changed = true;
}

if (changed) {
  try {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('[marketing-doma-cli] ✓ scripts doma:* adicionados ao package.json');
  } catch (e) {
    console.error('[marketing-doma-cli] ✗ Erro ao escrever package.json:', e.message);
    // Não falha a instalação — o usuário pode rodar npm run doma:install mesmo assim
  }
}
