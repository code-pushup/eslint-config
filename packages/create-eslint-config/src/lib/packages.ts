import { spawn } from 'node:child_process';
import path from 'node:path';
import {
  BASE_PEER_DEPS,
  includeAncestors,
  findConfig,
} from './config-registry.js';
import type {
  ConfigSlug,
  PackageJson,
  PackageManager,
  PeerDep,
} from './types.js';
import { fileExists, readJsonFile } from './utils.js';

export async function detectPackageManager(
  targetDir: string,
): Promise<PackageManager> {
  const pkg = await readJsonFile<PackageJson>(
    path.join(targetDir, 'package.json'),
  );
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

/**
 * Resolves the full install list: base toolchain, each config's peer deps
 * (including ancestors), and the eslint-config package itself.
 */
export function resolvePackages(
  slugs: ConfigSlug[],
  selfVersion: string,
): PeerDep[] {
  const configDeps = includeAncestors(slugs).flatMap(
    slug => findConfig(slug)?.peerDeps ?? [],
  );
  const allDeps = [
    ...BASE_PEER_DEPS,
    ...configDeps,
    { name: '@code-pushup/eslint-config', version: `^${selfVersion}` },
  ];
  return [...new Map(allDeps.map(dep => [dep.name, dep])).values()];
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
