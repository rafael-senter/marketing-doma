#!/usr/bin/env node
/**
 * Garante package.json do projeto host — CLI local (sem npm -g).
 * Mescla scripts doma:* + devDependency marketing-doma-cli.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_DIR = path.resolve(__dirname, '../..');

const DOMa_SCRIPTS = {
  'doma:install': 'marketing-doma install',
  'doma:update': 'marketing-doma update',
  'doma:status': 'marketing-doma status',
  'doma:setup': 'node .claude/plugins/marketing-doma/scripts/lib/install-deps.mjs',
  'doma:export': 'marketing-doma export',
};

function sanitizePackageName(name) {
  // Valida nome contra regex NPM: lowercase alphanumeric, hyphens, dots
  const sanitized = name
    .toLowerCase()
    .replace(/[^\w\.\-]/g, '-')  // substitui caracteres inválidos por hífens
    .replace(/^[\.\-]+/, '')      // remove leading dots/hyphens
    .replace(/[\.\-]+$/, '');     // remove trailing dots/hyphens
  return sanitized || 'marketing-doma-project';
}

function readJson(p, fallback = {}) {
  if (!fs.existsSync(p)) return { ...fallback };
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return { ...fallback };
  }
}

function cliVersionHint(projectRoot) {
  const fromNodeModules = path.join(projectRoot, 'node_modules/marketing-doma-cli/package.json');
  if (fs.existsSync(fromNodeModules)) {
    try {
      return JSON.parse(fs.readFileSync(fromNodeModules, 'utf8')).version;
    } catch {}
  }
  const pluginJson = path.join(PLUGIN_DIR, 'plugin.json');
  if (fs.existsSync(pluginJson)) {
    try {
      return JSON.parse(fs.readFileSync(pluginJson, 'utf8')).version;
    } catch {}
  }
  return 'latest';
}

export function ensureHostPackage(projectRoot = process.cwd()) {
  const pkgPath = path.join(projectRoot, 'package.json');
  const tplPath = path.join(PLUGIN_DIR, 'templates/host-package.json');
  const tpl = readJson(tplPath, { private: true, scripts: {}, devDependencies: {} });

  let pkg = readJson(pkgPath);
  const created = !fs.existsSync(pkgPath);

  if (created) {
    pkg = { ...tpl };
  } else {
    pkg.private = pkg.private !== false ? true : pkg.private;
    pkg.scripts = pkg.scripts || {};
    pkg.devDependencies = pkg.devDependencies || {};
    for (const [k, v] of Object.entries(DOMa_SCRIPTS)) {
      pkg.scripts[k] = v;
    }
  }

  // Garantir que o nome é válido (sem acentuação, espaços, etc)
  if (!pkg.name) {
    const dirName = path.basename(projectRoot);
    const sanitized = sanitizePackageName(dirName);
    pkg.name = sanitized;
  } else {
    const original = pkg.name;
    pkg.name = sanitizePackageName(original);
    if (pkg.name !== original) {
      console.log(`  [WARN] Nome do projeto sanitizado: "${original}" → "${pkg.name}"`);
    }
  }

  const ver = cliVersionHint(projectRoot);
  pkg.devDependencies['marketing-doma-cli'] = pkg.devDependencies['marketing-doma-cli'] || `^${ver}`;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  return { created, path: pkgPath, cliVersion: ver };
}

if (process.argv[1]?.includes('ensure-host-package')) {
  const root = process.argv[2] || process.cwd();
  const r = ensureHostPackage(root);
  console.log(`  [OK]   package.json ${r.created ? 'criado' : 'atualizado'} (CLI local ^${r.cliVersion})`);
}
