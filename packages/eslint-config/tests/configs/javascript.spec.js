// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('javascript config', () => {
  const { setup, teardown, loadConfig, loadRules, lint, requiresTypeChecking } =
    createLintUtils('javascript', '*.js');

  beforeAll(setup);

  afterAll(teardown);

  it('should load config for JavaScript file', async () => {
    await expect(loadConfig('index.js')).resolves.not.toThrow();
  });

  it('should load config for TypeScript file', async () => {
    await expect(loadConfig('src/utils.ts')).resolves.not.toThrow();
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('eqeqeq');
  });

  it('should have implicitly extended rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('no-const-assign');
  });

  it('should not include any rule which requires type checking', async () => {
    const rules = await loadRules();
    const rulesWithTypes = Object.entries(rules)
      .filter(([, meta]) => requiresTypeChecking(meta))
      .map(([ruleId]) => ruleId);
    expect(rulesWithTypes).toHaveLength(0);
  });

  it('should have rule disabled if test file pattern matches', async () => {
    const config = await loadConfig('utils.spec.js');
    expect(config.rules?.['@typescript-eslint/no-non-null-assertion']).toEqual([
      0,
    ]);
  });

  it('should have rule disabled if known config file pattern matches', async () => {
    const config = await loadConfig('jest.config.ts');
    expect(config.rules?.['import/no-anonymous-default-export']).toEqual([0]);
  });

  it('should have rule disabled if generated file pattern matches', async () => {
    const config = await loadConfig(
      'src/graphql/generated/introspection-result.ts',
    );
    expect(config.rules?.['unicorn/no-abusive-eslint-disable']).toEqual([0]);
  });

  it('should not throw when linting project without tsconfig', async () => {
    await expect(lint(['*.js'])).resolves.not.toThrow();
  });

  it('should only warn for all unicorn plugin rules', async () => {
    const config = await loadConfig();
    const unicornErrorRules = Object.entries(config.rules ?? {})
      .filter(([ruleId]) => ruleId.startsWith('unicorn/'))
      .filter(([, entry]) => {
        const severity = Array.isArray(entry) ? entry[0] : entry;
        return severity === 'error' || severity === 2;
      });
    expect(unicornErrorRules).toHaveLength(0);
  });
});
