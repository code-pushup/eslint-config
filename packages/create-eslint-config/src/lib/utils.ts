import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { WizardError } from './errors.js';
import type { PackageJson } from './types.js';

export async function readJsonFile<T = unknown>(
  filePath: string,
): Promise<T | null> {
  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    if (error instanceof SyntaxError) {
      throw new WizardError(
        `Failed to parse JSON at ${filePath}: ${error.message}`,
      );
    }
    throw error;
  }
}

export function readPackageJson<T extends PackageJson = PackageJson>(
  dir: string,
): Promise<T | null> {
  return readJsonFile<T>(path.join(dir, 'package.json'));
}

export async function fileExists(filePath: string): Promise<boolean> {
  return stat(filePath)
    .then(stats => stats.isFile())
    .catch(() => false);
}

export function isProjectEsm(packageJson: PackageJson | null): boolean {
  return packageJson?.type === 'module';
}

export function collectAllDeps(pkg: PackageJson | null): Set<string> {
  if (!pkg) {
    return new Set();
  }
  return new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]);
}

/** Escapes a string and wraps it in single quotes for emission as a JS literal. */
export function singleQuote(value: string): string {
  const inner = JSON.stringify(value)
    .slice(1, -1)
    .replace(/\\"/g, '"')
    .replace(/'/g, String.raw`\'`);
  return `'${inner}'`;
}
