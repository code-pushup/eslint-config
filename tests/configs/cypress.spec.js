// @ts-check

import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils';

describe('cypress config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('cypress', '*.cy.js');

  beforeAll(setup);
  afterAll(teardown);

  test('should not include Cypress rules for non-Cypress file', async () => {
    const config = await loadConfig('auth.spec.js');
    expect(Object.keys(config.rules ?? {}).join(',')).not.toContain('cypress/');
  });

  test('should include cypress rules for Cypress file', async () => {
    const config = await loadConfig('e2e/login.cy.js');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('cypress/');
  });

  test('should have rule from extended recommended cypress config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('cypress/no-unnecessary-waiting');
  });

  test('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('cypress/no-force');
  });
});
