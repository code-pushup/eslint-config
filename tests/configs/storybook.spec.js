// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe('storybook config', () => {
  const { setup, teardown, loadConfig } = createLintUtils(
    'storybook',
    '*.stories.ts',
  );

  beforeAll(setup);

  afterAll(teardown);

  it('should load storybook plugin rules for stories file', async () => {
    const config = await loadConfig('src/components/Button.stories.jsx');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('storybook/');
  });

  it('should not include storybook plugin rules for non-story file', async () => {
    const config = await loadConfig('src/components/Button.jsx');
    expect(Object.keys(config?.rules ?? {}).join(',')).not.toContain(
      'storybook/',
    );
  });

  it('should include storybook rule for .storybook directory', async () => {
    const config = await loadConfig('.storybook/main.js');
    expect(config.rules).toHaveProperty('storybook/no-uninstalled-addons');
  });

  it('should have rule from extended recommended config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('storybook/story-exports');
  });

  it('should have rule from extended csf config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('storybook/csf-component');
  });
});
