import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe.skip('angular config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('angular');

  beforeAll(setup);
  afterAll(teardown);

  test('should load config for TypeScript file', async () => {
    await expect(loadConfig('src/app/app.component.ts')).resolves.not.toThrow();
  });

  test('should load config for HTML file', async () => {
    await expect(
      loadConfig('src/app/app.component.html'),
    ).resolves.not.toThrow();
  });

  test('should not include template rules for non-HTML file', async () => {
    const config = await loadConfig('src/app/app.component.ts');
    expect(Object.keys(config.rules).join(',')).not.toContain(
      '@angular-eslint/template/',
    );
  });

  test('should have explicitly added rule for TS file', async () => {
    const config = await loadConfig('src/app/app.component.ts');
    expect(config.rules).toHaveProperty(
      '@angular-eslint/prefer-on-push-component-change-detection',
    );
  });

  test('should have explicitly added rule for HTML file', async () => {
    const config = await loadConfig('src/app/app.component.html');
    expect(config.rules).toHaveProperty('@angular-eslint/template/no-any');
  });

  test('should have rule from extended typescript config', async () => {
    const config = await loadConfig('src/app/app.component.ts');
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-non-null-assertion',
    );
  });

  test('should have rule from extended recommended angular config', async () => {
    const config = await loadConfig('src/app/app.component.ts');
    expect(config.rules).toHaveProperty('@angular-eslint/contextual-lifecycle');
  });

  test('should have rule from extended recommended angular template config', async () => {
    const config = await loadConfig('src/app/app.component.html');
    expect(config.rules).toHaveProperty(
      '@angular-eslint/template/banana-in-box',
    );
  });

  test('should have rule from extended angular template accessibility config', async () => {
    const config = await loadConfig('src/app/app.component.html');
    expect(config.rules).toHaveProperty('@angular-eslint/template/alt-text');
  });

  test('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig(
      'src/app/components/accordion/accordion.component.stories.ts',
    );
    expect(
      config.rules['@angular-eslint/component-max-inline-declarations'],
    ).toEqual(['off']);
  });
});
