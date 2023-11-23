const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('../helpers/lint-utils');

describe('vitest config', () => {
  const { loadConfig } = setupLintUtils(
    { extends: '@code-pushup/eslint-config/vitest' },
    '*.test.ts',
  );

  test('should not include vitest rules for non-test file', async () => {
    const config = await loadConfig('src/main.js');
    expect(Object.keys(config.rules).join(',')).not.toContain('vitest/');
  });

  test('should include vitest rules for test file', async () => {
    const config = await loadConfig('test/main.spec.js');
    expect(Object.keys(config.rules).join(',')).toContain('vitest/');
  });

  test('should have rule from extended recommended vitest config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('vitest/expect-expect');
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('vitest/prefer-to-have-length');
  });
});
