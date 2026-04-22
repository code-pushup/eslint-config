import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { test } from '../test-setup.js';
import { detectPackageManager, resolvePackages } from './packages.js';

describe('resolvePackages', () => {
  it('should include base, ancestor, config-specific, and self deps', () => {
    expect(resolvePackages(['ngrx'], '0.15.1')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint' }),
        expect.objectContaining({ name: 'eslint-import-resolver-typescript' }),
        expect.objectContaining({ name: 'angular-eslint' }),
        expect.objectContaining({ name: '@ngrx/eslint-plugin' }),
        expect.objectContaining({
          name: '@code-pushup/eslint-config',
          version: '^0.15.1',
        }),
      ]),
    );
  });
});

describe('detectPackageManager', () => {
  test('should default to npm', async ({ tmp }) => {
    await expect(detectPackageManager(tmp)).resolves.toBe('npm');
  });

  test('should detect pnpm from pnpm-lock.yaml', async ({ tmp }) => {
    await writeFile(path.join(tmp, 'pnpm-lock.yaml'), '');
    await expect(detectPackageManager(tmp)).resolves.toBe('pnpm');
  });

  test('should detect yarn from yarn.lock', async ({ tmp }) => {
    await writeFile(path.join(tmp, 'yarn.lock'), '');
    await expect(detectPackageManager(tmp)).resolves.toBe('yarn');
  });

  test('should detect npm from package-lock.json', async ({ tmp }) => {
    await writeFile(path.join(tmp, 'package-lock.json'), '');
    await expect(detectPackageManager(tmp)).resolves.toBe('npm');
  });

  test('should prefer pnpm when multiple lockfiles coexist', async ({
    tmp,
  }) => {
    await writeFile(path.join(tmp, 'pnpm-lock.yaml'), '');
    await writeFile(path.join(tmp, 'package-lock.json'), '');
    await expect(detectPackageManager(tmp)).resolves.toBe('pnpm');
  });

  test('should read packageManager field from package.json', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ packageManager: 'pnpm@9.0.0' }),
    );
    await expect(detectPackageManager(tmp)).resolves.toBe('pnpm');
  });

  test('should prefer packageManager field over lockfiles', async ({ tmp }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ packageManager: 'yarn@4.0.0' }),
    );
    await writeFile(path.join(tmp, 'package-lock.json'), '');
    await expect(detectPackageManager(tmp)).resolves.toBe('yarn');
  });
});
