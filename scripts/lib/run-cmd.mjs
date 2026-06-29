/** spawn cross-platform — npm/npx no Windows usam .cmd */
import { spawnSync } from 'node:child_process';

export function runCmd(cmd, args, opts = {}) {
  const isWin = process.platform === 'win32';
  let executable = cmd;
  if (isWin) {
    if (cmd === 'npm') executable = 'npm.cmd';
    else if (cmd === 'npx') executable = 'npx.cmd';
    else if (cmd === 'node') executable = process.execPath;
  }
  const r = spawnSync(executable, args, {
    cwd: opts.cwd || process.cwd(),
    stdio: opts.stdio ?? 'inherit',
    shell: false,
    env: { ...process.env, ...opts.env },
    encoding: opts.encoding,
  });
  if (r.error) {
    const err = new Error(`${executable} ${args.join(' ')}: ${r.error.message}`);
    err.cause = r.error;
    throw err;
  }
  if (r.status !== 0) {
    throw new Error(`${executable} ${args.join(' ')} falhou (exit ${r.status})`);
  }
  return r;
}
