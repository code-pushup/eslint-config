import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ALL_SLUGS,
  BASE_PEER_DEPS,
  CONFIG_REGISTRY,
  excludeAncestors,
  includeAncestors,
  findConfig,
  toIdentifier,
} from './config-registry.js';
import type { PackageJson } from './types.js';

const eslintConfigPackageJson = JSON.parse(
  await readFile(
    path.join(
      import.meta.dirname,
      '..',
      '..',
      '..',
      'eslint-config',
      'package.json',
    ),
    'utf8',
  ),
) as PackageJson;

const eslintConfigPeerDeps: Record<string, string> =
  eslintConfigPackageJson.peerDependencies ?? {};

describe('CONFIG_REGISTRY', () => {
  it('should contain 13 entries matching the documented config list', () => {
    expect(CONFIG_REGISTRY).toHaveLength(13);
  });

  it('should have unique slugs', () => {
    expect(new Set(ALL_SLUGS).size).toBe(ALL_SLUGS.length);
  });

  it('should recommend javascript unconditionally', () => {
    expect(
      findConfig('javascript')!.isRecommended({
        targetDir: '',
        packageJson: null,
        allDeps: new Set(),
        files: new Set(),
      }),
    ).toBe(true);
  });

  it.each(CONFIG_REGISTRY.filter(config => config.slug !== 'javascript'))(
    '$slug should declare at least one peer dep',
    config => {
      expect(config.peerDeps.length).toBeGreaterThan(0);
    },
  );

  it.each([
    ...BASE_PEER_DEPS,
    ...CONFIG_REGISTRY.flatMap(config => config.peerDeps),
  ])(
    '$name version should match eslint-config peerDependencies',
    ({ name, version }) => {
      expect(eslintConfigPeerDeps[name]).toBeDefined();
      expect(version).toBe(eslintConfigPeerDeps[name]);
    },
  );
});

describe('toIdentifier', () => {
  it('should pass single-word slugs through unchanged', () => {
    expect(toIdentifier('javascript')).toBe('javascript');
    expect(toIdentifier('vitest')).toBe('vitest');
  });

  it('should camelCase hyphenated slugs', () => {
    expect(toIdentifier('react-testing-library')).toBe('reactTestingLibrary');
  });
});

describe('excludeAncestors', () => {
  it('should drop ancestors when a descendant is selected', () => {
    expect(excludeAncestors(['javascript', 'typescript', 'vitest'])).toEqual([
      'typescript',
      'vitest',
    ]);
  });

  it('should collapse a deep chain to its leaf', () => {
    expect(
      excludeAncestors(['javascript', 'typescript', 'angular', 'ngrx']),
    ).toEqual(['ngrx']);
  });

  it('should keep unrelated branches side by side', () => {
    expect(excludeAncestors(['react', 'node'])).toEqual(['node', 'react']);
  });
});

describe('includeAncestors', () => {
  it('should include all ancestors of a selected slug', () => {
    expect(includeAncestors(['ngrx'])).toEqual([
      'javascript',
      'typescript',
      'angular',
      'ngrx',
    ]);
  });

  it('should merge ancestor chains across selections', () => {
    expect(includeAncestors(['typescript', 'react'])).toEqual([
      'javascript',
      'typescript',
      'react',
    ]);
  });

  it('should return the selection itself when no ancestors exist', () => {
    expect(includeAncestors(['javascript'])).toEqual(['javascript']);
  });
});
