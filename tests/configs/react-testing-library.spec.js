// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('react-testing-library config', () => {
  const { setup, teardown, loadConfig } = createLintUtils(
    'react-testing-library',
    '*.spec.tsx',
  );

  beforeAll(setup);

  afterAll(teardown);

  it('should not include react-testing-library rules for non-test file', async () => {
    const config = await loadConfig('components/Button.tsx');
    expect(Object.keys(config?.rules ?? {}).join(',')).not.toContain(
      'testing-library/',
    );
  });

  it('should include react-testing-library rules for test file', async () => {
    const config = await loadConfig('components/Button.test.tsx');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain(
      'testing-library/',
    );
  });

  it('should have rule from extended recommended react-testing-library config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('testing-library/await-async-events');
  });

  it('should have explicitly added rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('testing-library/prefer-user-event');
  });

  it('should have customized severity level for rule from extended config', async () => {
    const config = await loadConfig();
    expect(config.rules?.['testing-library/no-await-sync-queries']).toEqual([
      1,
    ]);
  });

  it('should have customized rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      'testing-library/prefer-query-matchers',
    );
    expect(
      config.rules?.['testing-library/prefer-query-matchers'],
    ).toStrictEqual([
      1,
      {
        validEntries: [
          { matcher: 'toBeVisible', query: 'get' },
          { matcher: 'toHaveTextContent', query: 'get' },
          { matcher: 'toBeEnabled', query: 'get' },
          { matcher: 'toBeDisabled', query: 'get' },
          { matcher: 'toBeChecked', query: 'get' },
        ],
      },
    ]);
  });
});
