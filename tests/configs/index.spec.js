const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('../helpers/lint-utils');

describe('base config', () => {
  const { loadConfig, loadRules, lint } = setupLintUtils(
    { extends: '@code-pushup/eslint-config/legacy' },
    '*.js',
  );

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

  test('should have rule disabled if known config file pattern matches', async () => {
    const config = await loadConfig('jest.config.ts');
    expect(config.rules['import/no-anonymous-default-export']).toEqual(['off']);
  });

  test('should have rule disabled if generated file pattern matches', async () => {
    const config = await loadConfig(
      'src/graphql/generated/introspection-result.ts',
    );
    expect(config.rules['unicorn/no-abusive-eslint-disable']).toEqual(['off']);
  });

  test('should not throw when linting project without tsconfig', async () => {
    await expect(lint(['src/**/*.js'])).resolves.not.toThrow();
  });

  test('should only warn for all unicorn plugin rules', async () => {
    const config = await loadConfig();
    const unicornErrorRules = Object.entries(config.rules)
      .filter(([ruleId]) => ruleId.startsWith('unicorn/'))
      .filter(([, entry]) => {
        const severity = Array.isArray(entry) ? entry[0] : entry;
        return severity === 'error' || severity === 2;
      });
    expect(unicornErrorRules).toHaveLength(0);
  });
});
