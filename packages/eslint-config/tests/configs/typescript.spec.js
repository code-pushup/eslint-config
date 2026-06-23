// @ts-check

import { NAMING_CONVENTION_OPTIONS } from '../../src/lib/rule-options.js';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('typescript config', () => {
  const {
    setup,
    teardown,
    loadConfig,
    getEnabledRuleIds,
    loadRules,
    requiresTypeChecking,
  } = createLintUtils('typescript', '*.ts', ['src/utils.js']);

  beforeAll(setup);

  afterAll(teardown);

  it('should load config for TypeScript file', async () => {
    await expect(loadConfig('index.ts')).resolves.not.toThrow();
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/naming-convention',
      [1, ...NAMING_CONVENTION_OPTIONS],
    );
  });

  it('should have rule from extended base config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@typescript-eslint/no-shadow', [1]);
  });

  it('should have rule from extended recommended type-checked config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-unsafe-assignment',
      [2],
    );
  });

  it('should have rule from extended strict config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-non-null-assertion',
      [2],
    );
  });

  it('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('index.test.ts');
    expect(config.rules).toHaveProperty(
      '@typescript-eslint/no-unsafe-assignment',
      [0],
    );
  });

  it('should not include extra rules for non-TS file', async () => {
    const config = await loadConfig('src/utils.js');
    const ruleIds = getEnabledRuleIds(config);
    expect(ruleIds).not.toContain('@typescript-eslint/naming-convention');
    expect(ruleIds).not.toContain('@typescript-eslint/no-non-null-assertion');
    expect(ruleIds).not.toContain('@typescript-eslint/no-unsafe-assignment');
  });

  it('should not include any rule which requires type checking for non-TS files', async () => {
    const rules = await loadRules('src/utils.js');
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => requiresTypeChecking(meta))
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });
});
