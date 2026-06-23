// @ts-check

import { createLintUtils } from '../helpers/lint-utils.js';

describe('jest config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('jest', '*.spec.ts');

  beforeAll(setup);

  afterAll(teardown);

  it('should not include jest rules for non-test file', async () => {
    const config = await loadConfig('lib/auth.ts');
    expect(Object.keys(config?.rules ?? {}).join(',')).not.toContain('jest/');
  });

  it('should include jest rules for test file', async () => {
    const config = await loadConfig('__test__/auth.spec.js');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('jest/');
  });

  it('should have rule from extended recommended jest config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jest/no-identical-title', [2]);
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jest/no-test-return-statement', [1]);
  });

  it('should have customized severity level for rule from extended config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('jest/no-mocks-import', [1]);
  });
});
