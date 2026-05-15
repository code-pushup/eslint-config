import { describe, expect, it } from 'vitest';
import {
  excludeAncestors,
  findPreset,
  includeAncestors,
  PRESET_SLUGS,
} from './config-registry.js';

describe('CONFIG_PRESETS', () => {
  it('should list every preset slug shipped by the wizard', () => {
    expect(PRESET_SLUGS).toEqual([
      'javascript',
      'typescript',
      'node',
      'angular',
      'ngrx',
      'react',
      'graphql',
      'jest',
      'vitest',
      'cypress',
      'playwright',
      'storybook',
      'react-testing-library',
    ]);
  });

  it('should recommend javascript unconditionally', () => {
    expect(
      findPreset('javascript')!.isRecommended({
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
