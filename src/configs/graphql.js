// @ts-check

import * as graphqlEslint from '@graphql-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import { GRAPHQL_FILE_PATTERNS, NODE_FILE_PATTERNS } from '../lib/patterns.js';
import node from './node.js';

export { NAMING_CONVENTION_OPTIONS_GRAPHQL } from '../lib/rule-options.js';

/** @type {Record<string, import('eslint').Linter.Config> | undefined} */
// @ts-expect-error flat configs were different in version 3
const v3FlatConfigs =
  'flatConfigs' in graphqlEslint ? graphqlEslint.flatConfigs : undefined;

export default tseslint.config(...node, {
  files: GRAPHQL_FILE_PATTERNS,
  plugins: {
    '@graphql-eslint': graphqlEslint,
  },
  extends: [
    v3FlatConfigs?.['schema-recommended'] ??
      graphqlEslint.configs['flat/schema-recommended'],
    v3FlatConfigs?.['relay'] ?? graphqlEslint.configs['flat/schema-relay'],
    {
      name: 'code-pushup/graphql/customized',
      rules: {
        // https://the-guild.dev/graphql/eslint/rules
        '@graphql-eslint/description-style': ['warn', { style: 'inline' }],
        '@graphql-eslint/no-hashtag-description': 'warn',
        '@graphql-eslint/relay-edge-types': [
          'error',
          { listTypeCanWrapOnlyEdgeType: false },
        ],
      },
    },
    {
      name: 'code-pushup/graphql/disabled',
      rules: {
        '@graphql-eslint/strict-id-in-types': 'off',
      },
    },
    {
      name: 'code-pushup/graphql/node-files-processor',
      files: NODE_FILE_PATTERNS,
      processor: graphqlEslint.processors.graphql,
    },
  ],
});
