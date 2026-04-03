// @ts-check

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('graphql config', () => {
  const { setup, teardown, loadConfig } = createLintUtils(
    'graphql',
    '*.graphql',
  );

  beforeAll(setup);

  afterAll(teardown);

  it('should have graphql plugin rules for GraphQL file', async () => {
    const config = await loadConfig('src/schema.graphql');
    expect(Object.keys(config.rules ?? {}).join(',')).toContain(
      '@graphql-eslint/',
    );
  });

  it('should have rule from extended schema config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@graphql-eslint/naming-convention');
  });

  it('should have rule from extended relay config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@graphql-eslint/relay-connection-types',
    );
  });

  it('should have customized rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@graphql-eslint/description-style');
    expect(config.rules?.['@graphql-eslint/description-style']).toEqual([
      1,
      { style: 'inline' },
    ]);
  });
});
