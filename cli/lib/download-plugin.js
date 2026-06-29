'use strict';

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { pipeline } = require('node:stream/promises');
const tar = require('tar');

const REPO = 'rafael-senter/marketing-doma';
const ARCHIVE_URL = `https://github.com/${REPO}/archive/refs/heads/main.tar.gz`;
const RAW_PLUGIN_JSON = `https://raw.githubusercontent.com/${REPO}/main/plugin.json`;

function fetchUrl(url, dest) {
  return new Promise((resolve, reject) => {
    const go = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Muitos redirects'));
      const req = https.get(u, { headers: { 'User-Agent': 'marketing-doma-cli' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          return go(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} ao baixar ${u}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        pipeline(res, file).then(resolve).catch(reject);
      });
      req.on('error', reject);
      req.setTimeout(60000, () => {
        req.destroy(new Error('Timeout ao baixar tarball do GitHub (60s)'));
      });
    };
    go(url);
  });
}

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const go = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Muitos redirects'));
      const req = https.get(u, { headers: { 'User-Agent': 'marketing-doma-cli' } }, (res) => {
        // Trata redirects (raw.githubusercontent pode redirecionar)
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          res.resume();
          return go(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} ao buscar ${u}`));
        }
        let data = '';
        res.on('data', (c) => { data += c; });
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.setTimeout(15000, () => {
        req.destroy(new Error('Timeout ao conectar com GitHub (15s)'));
      });
    };
    go(url);
  });
}

async function remotePluginVersion() {
  try {
    const j = await fetchJson(RAW_PLUGIN_JSON);
    return j.version || null;
  } catch {
    return null;
  }
}

async function downloadPlugin(destDir) {
  // Extrai tarball GitHub direto em destDir — sem git clone, sem ~/.local/share
  const tmp = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'mdoma-'));
  const tgz = path.join(tmp, 'plugin.tar.gz');
  const extractDir = path.join(tmp, 'extract');

  await fetchUrl(ARCHIVE_URL, tgz);
  fs.mkdirSync(extractDir, { recursive: true });
  await tar.x({ file: tgz, cwd: extractDir });

  const entries = fs.readdirSync(extractDir);
  const root = entries.length === 1 ? path.join(extractDir, entries[0]) : extractDir;

  fs.mkdirSync(destDir, { recursive: true });

  // Copia todos os arquivos recursivamente (preserva estrutura)
  function copyRecursive(src, dst) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      fs.mkdirSync(dst, { recursive: true });
      for (const entry of fs.readdirSync(src)) {
        copyRecursive(path.join(src, entry), path.join(dst, entry));
      }
    } else {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
  }

  for (const name of fs.readdirSync(root)) {
    const src = path.join(root, name);
    const dst = path.join(destDir, name);
    copyRecursive(src, dst);
  }

  fs.rmSync(tmp, { recursive: true, force: true });
}

module.exports = { downloadPlugin, remotePluginVersion, ARCHIVE_URL };
