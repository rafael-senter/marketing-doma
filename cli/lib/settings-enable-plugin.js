'use strict';

const fs = require('node:fs');
const path = require('node:path');

function enablePlugin(settingsPath, pluginKey = 'marketing-doma@marketing-doma') {
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  let data = {};
  if (fs.existsSync(settingsPath)) {
    data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  }
  data.enabledPlugins = data.enabledPlugins || {};
  data.enabledPlugins[pluginKey] = true;
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2) + '\n');
}

function disablePlugin(settingsPath, pluginKey = 'marketing-doma@marketing-doma') {
  if (!fs.existsSync(settingsPath)) return;
  const data = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  if (data.enabledPlugins) delete data.enabledPlugins[pluginKey];
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2) + '\n');
}

module.exports = { enablePlugin, disablePlugin };
