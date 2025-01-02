// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe('react config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('react', '*.tsx');

  beforeAll(setup);

  afterAll(teardown);

  it('should include react rules for JS file', async () => {
    const config = await loadConfig('components/Button.js');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('react/');
  });

  it('should include react rules for TSX file', async () => {
    const config = await loadConfig('components/Button.tsx');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('react/');
  });

  it('should have rule from extended recommended react config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('react/jsx-key');
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('react/no-array-index-key');
  });

  it('should include react-hooks rule', async () => {
    const config = await loadConfig();
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('react-hooks/');
  });

  it('should have rule from extended recommended jsx-a11y config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jsx-a11y/alt-text');
  });
});
