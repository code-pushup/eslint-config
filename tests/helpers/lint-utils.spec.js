// @ts-check

import { describe, expect, it } from 'vitest';
import { kebabToCamelCase } from './lint-utils.js';

describe('kebabToCamelCase', () => {
  it('should transform kebak-case to camelCase', async () => {
    expect(kebabToCamelCase('kebab-case')).toBe('kebabCase');
  });

  it('should capitalize subsequent words', async () => {
    expect(kebabToCamelCase('ke-bAB-CAse')).toBe('keBabCase');
  });
});
