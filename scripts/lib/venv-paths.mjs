#!/usr/bin/env node
/** Paths cross-platform do venv .venv-instagram (Windows Scripts/ vs Unix bin/). */
import fs from 'node:fs';
import path from 'node:path';

export function venvDir(projectRoot) {
  return path.join(projectRoot, '.venv-instagram');
}

export function venvPython(projectRoot) {
  const v = venvDir(projectRoot);
  const cands = [
    path.join(v, 'Scripts', 'python.exe'),
    path.join(v, 'Scripts', 'python'),
    path.join(v, 'bin', 'python3'),
    path.join(v, 'bin', 'python'),
  ];
  return cands.find((p) => fs.existsSync(p)) || null;
}

/** Retorna executável pip ou null. Use pipArgs() se retornar python (python -m pip). */
export function venvPip(projectRoot) {
  const v = venvDir(projectRoot);
  const cands = [
    path.join(v, 'Scripts', 'pip.exe'),
    path.join(v, 'Scripts', 'pip3.exe'),
    path.join(v, 'Scripts', 'pip'),
    path.join(v, 'bin', 'pip3'),
    path.join(v, 'bin', 'pip'),
  ];
  return cands.find((p) => fs.existsSync(p)) || null;
}

/** { cmd, argsPrefix } — argsPrefix vazio ou ['-m', 'pip'] */
export function pipRunner(projectRoot) {
  const pip = venvPip(projectRoot);
  if (pip) return { cmd: pip, prefix: [] };
  const py = venvPython(projectRoot);
  if (py) return { cmd: py, prefix: ['-m', 'pip'] };
  return null;
}

export function venvReady(projectRoot) {
  return !!(venvPython(projectRoot) && (venvPip(projectRoot) || venvPython(projectRoot)));
}

if (process.argv[1]?.includes('venv-paths.mjs')) {
  const root = process.argv[2] || process.cwd();
  const mode = process.argv[3] || 'python';
  if (mode === 'pip') {
    const r = pipRunner(root);
    if (!r) process.exit(1);
    console.log(r.cmd);
    if (r.prefix.length) console.log('python -m pip');
  } else {
    const py = venvPython(root);
    if (!py) process.exit(1);
    console.log(py);
  }
}
