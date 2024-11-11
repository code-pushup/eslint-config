import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe.skip('angular-ngrx config', () => {
  const { setup, teardown, loadConfig } = createLintUtils(
    'angular-ngrx',
    '*.ts',
  );

  beforeAll(setup);
  afterAll(teardown);

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
