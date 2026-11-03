// @ts-check

import fs from 'node:fs/promises';
import path from 'node:path';
import { createLintUtils } from '../helpers/lint-utils.js';

describe('graphql config', () => {
  const { setup, teardown, loadConfig, lint, cwd } = createLintUtils(
    'graphql',
    '*.graphql',
    ['src/schema.ts'],
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
    expect(config.rules).toHaveProperty('@graphql-eslint/naming-convention', [
      2,
      expect.any(Object),
    ]);
  });

  it('should have rule from extended relay config', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty(
      '@graphql-eslint/relay-connection-types',
      [2],
    );
  });

  it('should parse GraphQL files with GraphQL parser', async () => {
    const config = await loadConfig('src/schema.graphql');
    expect(config.languageOptions?.parser).toHaveProperty(
      'meta.name',
      '@graphql-eslint/parser',
    );
  });

  it.each(['src/schema.ts', 'src/schema.js'])(
    'should attach GraphQL processor to %s',
    async filePath => {
      const config = await loadConfig(filePath);
      expect(config.processor).toBeDefined();
    },
  );

  it('should lint GraphQL in tagged template of TypeScript file', async () => {
    // schema-aware rules need the schema
    await fs.writeFile(
      path.join(cwd, '.graphqlrc.yml'),
      'schema: src/schema.ts\n',
    );
    await fs.writeFile(
      path.join(cwd, 'src/schema.ts'),
      [
        'declare const gql: (strings: TemplateStringsArray) => unknown;',
        'export const schema = gql`',
        '  type query_root {',
        '    id: ID!',
        '  }',
        '`;',
      ].join('\n'),
    );
    const [result] = await lint('src/schema.ts');
    expect(result?.messages.map(({ ruleId }) => ruleId)).toContain(
      '@graphql-eslint/naming-convention',
    );
  });

  it('should have customized rule', async () => {
    const config = await loadConfig();
    expect(config.rules).toHaveProperty('@graphql-eslint/description-style', [
      1,
      { style: 'inline' },
    ]);
  });
});
