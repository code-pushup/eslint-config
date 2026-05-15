import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { test } from '../test-setup.js';
import {
  collectRecommendedSlugs,
  detectExistingEslintConfig,
  detectNodeVersionInfo,
  detectTsconfigPath,
  snapshotProject,
} from './detection.js';
import type { ProjectSnapshot } from './types.js';

const makeSnapshot = (
  overrides: Partial<ProjectSnapshot> = {},
): ProjectSnapshot => ({
  targetDir: '/test',
  packageJson: null,
  allDeps: new Set(),
  files: new Set(),
  ...overrides,
});

describe('collectRecommendedSlugs', () => {
  it('should recommend only javascript for an empty project', () => {
    expect([...collectRecommendedSlugs(makeSnapshot())]).toEqual([
      'javascript',
    ]);
  });

  it('should recommend slugs matching the project snapshot', () => {
    const snapshot = makeSnapshot({
      allDeps: new Set(['react', 'vitest']),
      files: new Set(['tsconfig.json']),
    });
    const recommended = collectRecommendedSlugs(snapshot);
    expect(recommended).toContain('javascript');
    expect(recommended).toContain('typescript');
    expect(recommended).toContain('react');
    expect(recommended).toContain('vitest');
  });
});

describe('snapshotProject', () => {
  test('should load package.json deps and list top-level files', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({
        dependencies: { react: '18.0.0' },
        devDependencies: { vitest: '1.0.0' },
      }),
    );
    await writeFile(path.join(tmp, 'tsconfig.json'), '{}');

    const snapshot = await snapshotProject(tmp);
    expect(snapshot.allDeps).toContain('react');
    expect(snapshot.allDeps).toContain('vitest');
    expect(snapshot.files).toContain('tsconfig.json');
    expect(snapshot.files).toContain('package.json');
  });

  test('should produce an empty snapshot when package.json is missing', async ({
    tmp,
  }) => {
    const snapshot = await snapshotProject(tmp);
    expect(snapshot.packageJson).toBeNull();
    expect(snapshot.allDeps.size).toBe(0);
  });
});

describe('detectTsconfigPath', () => {
  it('should prefer tsconfig.json', () => {
    expect(
      detectTsconfigPath(new Set(['tsconfig.json', 'tsconfig.lib.json'])),
    ).toBe('tsconfig.json');
  });

  it('should fall back to tsconfig.*.json', () => {
    expect(detectTsconfigPath(new Set(['tsconfig.lib.json']))).toBe(
      'tsconfig.lib.json',
    );
  });

  it('should return undefined when no tsconfig is present', () => {
    expect(detectTsconfigPath(new Set())).toBeUndefined();
  });
});

describe('detectNodeVersionInfo', () => {
  test('should read .node-version when present', async ({ tmp }) => {
    await writeFile(path.join(tmp, '.node-version'), '22.1.0\n');
    const snapshot = await snapshotProject(tmp);
    const sources = await detectNodeVersionInfo(snapshot);
    expect(sources.file).toBe('22.1.0');
  });

  test('should read engines.node when present', async ({ tmp }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ engines: { node: '>=20' } }),
    );
    const snapshot = await snapshotProject(tmp);
    const sources = await detectNodeVersionInfo(snapshot);
    expect(sources.engines).toBe('>=20');
  });

  test('should return an empty result when neither source exists', async ({
    tmp,
  }) => {
    const snapshot = await snapshotProject(tmp);
    await expect(detectNodeVersionInfo(snapshot)).resolves.toEqual({});
  });
});

describe('detectExistingEslintConfig', () => {
  it.each([
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ])('should detect %s', async fileName => {
    const snapshot = makeSnapshot({ files: new Set([fileName]) });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      path: path.join('/test', fileName),
    });
  });

  it.each([
    ['eslint.config.cjs', 'cjs'],
    ['eslint.config.cts', 'cjs'],
    ['eslint.config.mjs', 'esm'],
    ['eslint.config.mts', 'esm'],
  ])('should classify %s as %s by extension', async (fileName, format) => {
    const snapshot = makeSnapshot({ files: new Set([fileName]) });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      format,
    });
  });

  it('should classify .js as esm when package.json declares type:module', async () => {
    const snapshot = makeSnapshot({
      files: new Set(['eslint.config.js']),
      packageJson: { type: 'module' },
    });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      format: 'esm',
    });
  });

  it('should classify .js as cjs when package.json omits type', async () => {
    const snapshot = makeSnapshot({ files: new Set(['eslint.config.js']) });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      format: 'cjs',
    });
  });

  it('should return null when no config exists', async () => {
    await expect(
      detectExistingEslintConfig(makeSnapshot()),
    ).resolves.toBeNull();
  });

  it('should prefer an ESM config over a CJS one when both exist', async () => {
    const snapshot = makeSnapshot({
      files: new Set(['eslint.config.cjs', 'eslint.config.mjs']),
    });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      path: path.join('/test', 'eslint.config.mjs'),
      format: 'esm',
    });
  });

  it('should fall back to a CJS config when no ESM config exists', async () => {
    const snapshot = makeSnapshot({
      files: new Set(['eslint.config.cjs', 'eslint.config.cts']),
    });
    await expect(detectExistingEslintConfig(snapshot)).resolves.toMatchObject({
      path: path.join('/test', 'eslint.config.cjs'),
      format: 'cjs',
    });
  });
});
