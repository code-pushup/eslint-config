const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('./helpers/lint-utils');

describe('base config', () => {
  const { loadConfig, loadRules } = setupLintUtils({
    extends: '@code-pushup',
  });

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

  test('should not include any rule which requires type checking', async () => {
    const rules = await loadRules();
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => meta.docs.requiresTypeChecking)
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });

  test('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('utils.spec.js');
    expect(config.rules['@typescript-eslint/no-non-null-assertion']).toEqual([
      'off',
    ]);
  });
});
