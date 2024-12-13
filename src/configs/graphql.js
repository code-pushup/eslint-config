// @ts-check

import * as graphqlEslint from '@graphql-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import { GRAPHQL_FILE_PATTERNS, NODE_FILE_PATTERNS } from '../lib/patterns.js';
import node from './node.js';

export { NAMING_CONVENTION_OPTIONS_GRAPHQL } from '../lib/rule-options.js';

export default tseslint.config(...node, {
  files: GRAPHQL_FILE_PATTERNS,
  plugins: {
    '@graphql-eslint': graphqlEslint,
  },
  extends: [
    // @ts-expect-error rule severity inferred as string from .js
    graphqlEslint.flatConfigs['schema-recommended'],
    // @ts-expect-error rule severity inferred as string from .js
    graphqlEslint.flatConfigs['relay'],
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
