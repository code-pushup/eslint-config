// @ts-check

import { createLintUtils } from '../helpers/lint-utils.js';

describe('playwright config', () => {
  const { setup, teardown, loadConfig } = createLintUtils(
    'playwright',
    '*.spec.ts',
  );

  beforeAll(setup);

  afterAll(teardown);

  it('should not include playwright rules for non-test file', async () => {
    const config = await loadConfig('components/Button.tsx');
    expect(Object.keys(config?.rules ?? {}).join(',')).not.toContain(
      'playwright/',
    );
  });

  it('should include playwright rules for test file', async () => {
    const config = await loadConfig('components/login.test.ts');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('playwright/');
  });

  it('should include playwright rules for page object file', async () => {
    const config = await loadConfig('components/login.po.ts');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('playwright/');
  });

  it('should include playwright rules for test folder', async () => {
    const config = await loadConfig('website-e2e/dashboard/subscription.ts');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('playwright/');
  });

  it('should have rule from extended recommended playwright config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('playwright/valid-expect', [2]);
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('playwright/prefer-native-locators', [
      1,
    ]);
  });

  it('should have customized severity level for rule from extended config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('playwright/no-conditional-expect', [
      1,
    ]);
  });
});
