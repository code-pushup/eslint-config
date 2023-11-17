const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('./helpers/lint-utils');

describe('typescript config', () => {
  const { loadConfig, getRulesByIds } = setupLintUtils({
    extends: '@code-pushup/eslint-config/typescript',
  });

  test('should load config for JavaScript file', async () => {
    await expect(loadConfig('src/utils.js')).resolves.not.toThrow();
  });

  test('should load config for TypeScript file', async () => {
    await expect(loadConfig('index.ts')).resolves.not.toThrow();
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@typescript-eslint/naming-convention');
  });

  test('should have rule from extended base config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@typescript-eslint/no-shadow');
  });

  test('should have rule from extended recommended type-checked config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-unsafe-assignment'
    );
  });

  test('should have rule from extended strict config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-non-null-assertion'
    );
  });

  test('should only explicitly reference rules which require type checking', async () => {
    const config = require('../typescript');
    const ruleIds = [
      ...Object.keys(config.rules),
      ...config.overrides.flatMap(({ rules }) => Object.keys(rules)),
    ];
    const rules = getRulesByIds(ruleIds);
    const rulesWithoutTypes = Object.entries(rules)
      .filter(([, meta]) => !meta.docs?.requiresTypeChecking)
      .map(([ruleId]) => ruleId);
    expect(rulesWithoutTypes).toHaveLength(0);
  });

  test('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('index.test.ts');
    expect(config.rules['@typescript-eslint/no-unsafe-assignment']).toEqual([
      'off',
    ]);
  });
});
