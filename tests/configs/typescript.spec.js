import { describe, expect, test } from 'vitest';
import { setupLintUtils } from '../helpers/lint-utils';

describe('typescript config', () => {
  const { loadConfig, getRulesByIds, getExplicitRuleIds, loadRules } =
    setupLintUtils(
      { extends: '@code-pushup/eslint-config/legacy/typescript' },
      '*.ts',
    );

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
    const config = require('@code-pushup/eslint-config/legacy/typescript');
    const ruleIds = getExplicitRuleIds(config);
    const rules = getRulesByIds(ruleIds);
    const rulesWithoutTypes = Object.entries(rules)
      .filter(([, meta]) => !meta.docs?.requiresTypeChecking)
      .map(([ruleId]) => ruleId)
      .sort();
    expect(rulesWithoutTypes).toEqual([
      '@typescript-eslint/consistent-type-assertions',
    ]);
  });

  test('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('index.test.ts');
    expect(config.rules['@typescript-eslint/no-unsafe-assignment']).toEqual([
      'off',
    ]);
  });

  test('should not include extra rules for non-TS file', async () => {
    const config = await loadConfig('src/utils.js');
    expect(config.rules).not.toHaveProperty(
      '@typescript-eslint/naming-convention',
    );
    expect(config.rules).not.toHaveProperty(
      '@typescript-eslint/no-non-null-assertion',
    );
    expect(config.rules).not.toHaveProperty(
      '@typescript-eslint/no-unsafe-assignment',
    );
  });

  test('should not include any rule which requires type checking for non-TS files', async () => {
    const rules = await loadRules('src/utils.js');
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => meta.docs.requiresTypeChecking)
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });
});
