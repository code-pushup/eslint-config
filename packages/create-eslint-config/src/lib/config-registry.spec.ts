import { describe, expect, it } from 'vitest';
import {
  ALL_SLUGS,
  CONFIG_REGISTRY,
  excludeAncestors,
  findConfig,
  includeAncestors,
} from './config-registry.js';

describe('CONFIG_REGISTRY', () => {
  it('should enumerate every config exported by eslint-config', () => {
    expect(ALL_SLUGS).toEqual(expect.arrayContaining(['javascript', 'react']));
    expect(CONFIG_REGISTRY.length).toBeGreaterThan(0);
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
