#!/usr/bin/env node
/**
 * Habilita marketing-doma em settings.json — sem python3, cross-platform.
 * Uso: node settings-enable-plugin.js <settings.json> [plugin-key]
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const settingsPath = process.argv[2];
const pluginKey = process.argv[3] || 'marketing-doma@marketing-doma';
const action = process.argv[4] || 'enable';

if (!settingsPath) {
  console.error('Uso: node settings-enable-plugin.js <settings.json> [plugin-key] [enable|disable]');
  process.exit(2);
}

const dir = path.dirname(settingsPath);
fs.mkdirSync(dir, { recursive: true });

let data = {};
if (fs.existsSync(settingsPath)) {
  try {
    data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch (e) {
    console.error(`JSON inválido em ${settingsPath}: ${e.message}`);
    process.exit(1);
  }
}

if (action === 'disable') {
  if (data.enabledPlugins) delete data.enabledPlugins[pluginKey];
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`disabled ${pluginKey}`);
  process.exit(0);
}

const ep = data.enabledPlugins || {};
const already = ep[pluginKey] === true;
ep[pluginKey] = true;
data.enabledPlugins = ep;

fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2) + '\n');
console.log(already ? `already ${pluginKey}` : `enabled ${pluginKey}`);
