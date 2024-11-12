import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe('jest config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('jest', '*.spec.ts');

  beforeAll(setup);
  afterAll(teardown);

  test('should not include jest rules for non-test file', async () => {
    const config = await loadConfig('lib/auth.ts');
    expect(Object.keys(config?.rules ?? {}).join(',')).not.toContain('jest/');
  });

  test('should include jest rules for test file', async () => {
    const config = await loadConfig('__test__/auth.spec.js');
    expect(Object.keys(config.rules).join(',')).toContain('jest/');
  });

  test('should have rule from extended recommended jest config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jest/no-identical-title');
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jest/no-test-return-statement');
  });

  test('should have customized severity level for rule from extended config', async () => {
    const config = await loadConfig();
    expect(config.rules['jest/no-mocks-import']).toEqual([1]);
  });
});
