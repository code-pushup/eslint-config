// @ts-check

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('typescript config', () => {
  const {
    setup,
    teardown,
    loadConfig,
    loadRulesByIds,
    getExplicitRuleIds,
    getEnabledRuleIds,
    loadRules,
  } = createLintUtils('typescript', '*.ts', ['src/utils.js']);

  beforeAll(setup);
  afterAll(teardown);

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
      '@typescript-eslint/no-unsafe-assignment',
    );
  });

  test('should have rule from extended strict config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-non-null-assertion',
    );
  });

  test('should only explicitly reference rules which require type checking (with specified exceptions)', async () => {
    const { default: typescript } = await import(
      '@code-pushup/eslint-config/typescript'
    );
    const ruleIds = getExplicitRuleIds(typescript);
    const rules = await loadRulesByIds(ruleIds);
    const rulesWithoutTypes = Object.entries(rules)
      .filter(([, meta]) => !meta.docs?.['requiresTypeChecking'])
      .map(([ruleId]) => ruleId)
      .sort();
    expect(rulesWithoutTypes).toEqual([
      '@typescript-eslint/consistent-type-assertions',
    ]);
  });

  test('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('index.test.ts');
    expect(config.rules?.['@typescript-eslint/no-unsafe-assignment']).toEqual([
      0,
    ]);
  });

  test('should not include extra rules for non-TS file', async () => {
    const config = await loadConfig('src/utils.js');
    const ruleIds = getEnabledRuleIds(config);
    expect(ruleIds).not.toContain('@typescript-eslint/naming-convention');
    expect(ruleIds).not.toContain('@typescript-eslint/no-non-null-assertion');
    expect(ruleIds).not.toContain('@typescript-eslint/no-unsafe-assignment');
  });

  test('should not include any rule which requires type checking for non-TS files', async () => {
    const rules = await loadRules('src/utils.js');
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => meta.docs?.['requiresTypeChecking'])
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });
});
