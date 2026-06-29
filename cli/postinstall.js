#!/usr/bin/env node
'use strict';
/** Após npm install marketing-doma-cli — cria/atualiza package.json do projeto com scripts doma:*. */
const fs = require('node:fs');
const path = require('node:path');

const root = process.env.INIT_CWD || process.cwd();
const pkgPath = path.join(root, 'package.json');

const ver = require('./package.json').version;

const SCRIPTS = {
  'doma:install': 'marketing-doma install',
  'doma:update': 'marketing-doma update',
  'doma:status': 'marketing-doma status',
  'doma:setup': 'node .claude/skills/marketing-doma/scripts/lib/install-deps.mjs',
  'doma:export': 'marketing-doma export',
};

/** Sanitiza um nome para o padrão NPM (lowercase, sem acento/espaço). */
function sanitizeName(name) {
  const s = String(name)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')      // troca inválidos por hífen
    .replace(/^[._-]+/, '')             // tira leading . _ -
    .replace(/[._-]+$/, '')             // tira trailing . _ -
    .replace(/-+/g, '-');               // colapsa hífens
  return s || 'marketing-doma-projeto';
}

let pkg;
const exists = fs.existsSync(pkgPath);

if (exists) {
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch {
    // package.json corrompido — não mexe
    process.exit(0);
  }
  // Guarda: NUNCA modificar o próprio pacote (ex: npm install dentro de cli/ durante dev)
  if (pkg.name === 'marketing-doma-cli') {
    process.exit(0);
  }
} else {
  // Sem package.json (npm init -y falhou com nome inválido, ou usuário não rodou).
  // Cria um do zero com nome sanitizado a partir do diretório.
  pkg = {
    name: sanitizeName(path.basename(root)),
    version: '1.0.0',
    private: true,
  };
}

// Sanitiza nome existente se for inválido (acento/espaço/maiúsculas)
if (pkg.name) {
  const clean = sanitizeName(pkg.name);
  if (clean !== pkg.name) pkg.name = clean;
} else {
  pkg.name = sanitizeName(path.basename(root));
}

pkg.scripts = pkg.scripts || {};
for (const [k, v] of Object.entries(SCRIPTS)) {
  pkg.scripts[k] = v;
}
if (pkg.private !== true) pkg.private = true;

try {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(
    exists
      ? '[marketing-doma-cli] ✓ scripts doma:* adicionados ao package.json'
      : `[marketing-doma-cli] ✓ package.json criado (name: ${pkg.name}) + scripts doma:*`
  );
} catch (e) {
  console.error('[marketing-doma-cli] ✗ Erro ao escrever package.json:', e.message);
  // Não falha a instalação
}
