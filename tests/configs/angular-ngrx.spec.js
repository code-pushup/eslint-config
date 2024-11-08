const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('../helpers/lint-utils');

describe('angular-ngrx config', () => {
  const { loadConfig } = setupLintUtils(
    { extends: '@code-pushup/eslint-config/legacy/angular-ngrx' },
    '*.ts',
  );

  test('should load config for TypeScript file', async () => {
    await expect(
      loadConfig('src/app/store/auth.reducer.ts'),
    ).resolves.not.toThrow();
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('rxjs/no-unsafe-catch');
  });

  test('should have rule from extended angular config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@angular-eslint/prefer-on-push-component-change-detection',
    );
  });

  test('should have rule from extended recommended ngrx config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@ngrx/good-action-hygiene');
  });
});
