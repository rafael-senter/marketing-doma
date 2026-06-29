/** spawn cross-platform — npm/npx no Windows usam .cmd */
import { spawnSync } from 'node:child_process';

export function runCmd(cmd, args, opts = {}) {
  const isWin = process.platform === 'win32';
  let executable = cmd;
  let finalArgs = args;
  if (isWin) {
    if (cmd === 'npm' || cmd === 'npx') {
      // npm/npx no Windows: rodar via cmd.exe /c para evitar EINVAL
      // Escapar argumentos com espaços ou aspas
      const escaped = args.map(arg =>
        arg.includes(' ') || arg.includes('"') ? `"${arg.replace(/"/g, '\\"')}"` : arg
      ).join(' ');
      executable = 'cmd.exe';
      finalArgs = ['/c', `${cmd} ${escaped}`];
    } else if (cmd === 'node') {
      executable = process.execPath;
    }
  }
  const r = spawnSync(executable, finalArgs, {
    cwd: opts.cwd || process.cwd(),
    stdio: opts.stdio ?? 'inherit',
    shell: false,
    env: { ...process.env, ...opts.env },
    encoding: opts.encoding,
  });
  if (r.error) {
    const err = new Error(`${executable} ${finalArgs.join(' ')}: ${r.error.message}`);
    err.cause = r.error;
    throw err;
  }
  if (r.status !== 0) {
    throw new Error(`${executable} ${finalArgs.join(' ')} falhou (exit ${r.status})`);
  }
  return r;
}
