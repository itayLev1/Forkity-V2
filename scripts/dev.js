import { spawn } from 'node:child_process';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const isPortOpen = (port) =>
  new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close(() => resolve(false));
    });
    server.listen(port, '127.0.0.1');
  });

const forwardOutput = (proc, label) => {
  proc.stdout?.on('data', (chunk) => process.stdout.write(`[${label}] ${chunk}`));
  proc.stderr?.on('data', (chunk) => process.stderr.write(`[${label}] ${chunk}`));
};

const processes = [];

const startBackend = async () => {
  if (!(await isPortOpen(4000))) {
    const proc = spawn(npmExecutable, ['run', 'backend'], {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    processes.push(proc);
    forwardOutput(proc, 'backend');
    return;
  }

  console.log('Backend already running on port 4000; reusing existing instance.');
};

const startFrontend = () => {
  const proc = spawn(npmExecutable, ['run', 'frontend'], {
    cwd: rootDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
  });
  processes.push(proc);
  forwardOutput(proc, 'frontend');
};

const cleanup = () => {
  for (const proc of processes) {
    if (!proc.killed) proc.kill('SIGTERM');
  }
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

await startBackend();
startFrontend();

for (const proc of processes) {
  proc.on('exit', (code, signal) => {
    if (code !== null && code !== 0) {
      console.error(`Process exited with code ${code} signal ${signal ?? 'none'}`);
      cleanup();
      process.exit(code ?? 1);
    }
  });
}
