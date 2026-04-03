// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('cypress config', () => {
  const { setup, teardown, loadConfig } = createLintUtils('cypress', '*.cy.js');

  beforeAll(setup);

  afterAll(teardown);

  it('should not include Cypress rules for non-Cypress file', async () => {
    const config = await loadConfig('auth.spec.js');
    expect(Object.keys(config.rules ?? {}).join(',')).not.toContain('cypress/');
  });

  it('should include cypress rules for Cypress file', async () => {
    const config = await loadConfig('app/submit-form.cy.js');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('cypress/');
  });

  it('should include cypress rules for Cypress folder', async () => {
    const config = await loadConfig('app-e2e/login.js');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain('cypress/');
  });

  it('should have rule from extended recommended cypress config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('cypress/no-unnecessary-waiting');
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('cypress/no-force');
  });
});
