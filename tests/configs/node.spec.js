// @ts-check

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe('node config', () => {
  const { setup, teardown, loadConfig, loadRules } = createLintUtils(
    'node',
    '*.ts',
  );

  beforeAll(setup);

  afterAll(teardown);

  it('should load config for JavaScript file', async () => {
    await expect(loadConfig('src/utils.js')).resolves.not.toThrow();
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('n/prefer-promises/fs');
  });

  it('should have rule from extended base config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('import/no-commonjs');
  });

  it('should not include any rule which requires type checking', async () => {
    const rules = await loadRules();
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => meta.docs?.['requiresTypeChecking'])
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });
});
