import { spawn } from 'node:child_process';
import path from 'node:path';
import type { PackageManager } from './types.js';
import { fileExists, readPackageJson } from './utils.js';

export async function detectPackageManager(
  targetDir: string,
): Promise<PackageManager> {
  const pkg = await readPackageJson(targetDir);
  const manager = pkg?.packageManager?.split('@')[0];
  if (manager === 'pnpm' || manager === 'yarn' || manager === 'npm') {
    return manager;
  }
  if (await fileExists(path.join(targetDir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (await fileExists(path.join(targetDir, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

export async function installDependencies(targetDir: string): Promise<void> {
  const manager = await detectPackageManager(targetDir);
  const exitCode = await new Promise<number>((resolve, reject) => {
    const child = spawn(manager, ['install'], {
      cwd: targetDir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    child.once('error', reject);
    child.once('exit', code => resolve(code ?? 0));
  });
  if (exitCode !== 0) {
    throw new Error(`${manager} install failed (exit code ${exitCode})`);
  }
}
