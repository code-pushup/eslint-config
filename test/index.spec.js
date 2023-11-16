const { describe, expect, test } = require('@jest/globals');
const { ESLint } = require('eslint');

describe('base config', () => {
  const eslint = new ESLint({
    baseConfig: { extends: '@code-pushup' },
    useEslintrc: false,
  });

  /** @returns {Promise<import('eslint').Linter.Config>} */
  const loadConfig = (filePath = '*.js') =>
    eslint.calculateConfigForFile(filePath);

  test('should load config for JavaScript file', async () => {
    await expect(loadConfig('index.js')).resolves.not.toThrow();
  });

  test('should load config for TypeScript file', async () => {
    await expect(loadConfig('src/utils.ts')).resolves.not.toThrow();
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('eqeqeq');
  });

  test('should have implicitly extended rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('no-const-assign');
  });
});
