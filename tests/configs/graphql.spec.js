const { describe, expect, test } = require('@jest/globals');
const { setupLintUtils } = require('../helpers/lint-utils');

describe('graphql config', () => {
  const { loadConfig } = setupLintUtils(
    { extends: '@code-pushup/eslint-config/legacy/graphql' },
    '*.graphql',
  );

  test('should have graphql plugin rules for GraphQL file', async () => {
    const config = await loadConfig('src/schema.graphql');
    expect(Object.keys(config.rules).join(',')).toContain('@graphql-eslint/');
  });

  test('should have rule from extended schema config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@graphql-eslint/naming-convention');
  });

  test('should have rule from extended relay config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@graphql-eslint/relay-connection-types',
    );
  });

  test('should have customized rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@graphql-eslint/description-style');
    expect(config.rules['@graphql-eslint/description-style']).toEqual([
      'warn',
      { style: 'inline' },
    ]);
  });
});
