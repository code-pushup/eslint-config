const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('./helpers/lint-utils');

describe('storybook config', () => {
  const { loadConfig } = setupLintUtils(
    { extends: '@code-pushup/eslint-config/storybook' },
    '*.stories.ts',
  );

  test('should load storybook plugin rules for stories file', async () => {
    const config = await loadConfig('src/components/Button.stories.jsx');
    expect(Object.keys(config.rules).join(',')).toContain('storybook/');
  });

  test('should not include storybook plugin rules for non-story file', async () => {
    const config = await loadConfig('src/components/Button.jsx');
    expect(Object.keys(config.rules).join(',')).not.toContain('storybook/');
  });

  test('should include storybook rule for .storybook directory', async () => {
    const config = await loadConfig('.storybook/main.js');
    expect(config.rules).toHaveProperty('storybook/no-uninstalled-addons');
  });

  test('should have rule from extended recommended config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('storybook/story-exports');
  });

  test('should have rule from extended csf config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('storybook/csf-component');
  });
});
