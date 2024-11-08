const {
  NODE_FILE_PATTERNS,
  GRAPHQL_FILE_PATTERN,
  TYPESCRIPT_FILE_PATTERNS,
} = require('../../lib/patterns');
const { NAMING_CONVENTION_OPTIONS_GRAPHQL } = require('../../lib/rule-options');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@code-pushup/eslint-config/legacy/node'],

  overrides: [
    {
      files: TYPESCRIPT_FILE_PATTERNS,
      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@typescript-eslint/naming-convention': [
          'warn',
          ...NAMING_CONVENTION_OPTIONS_GRAPHQL,
        ],
      },
    },
    {
      files: GRAPHQL_FILE_PATTERN,
      extends: [
        'plugin:@graphql-eslint/schema-recommended',
        'plugin:@graphql-eslint/relay',
      ],
      rules: {
        // https://the-guild.dev/graphql/eslint/rules
        '@graphql-eslint/description-style': ['warn', { style: 'inline' }],
        '@graphql-eslint/no-hashtag-description': 'warn',
        '@graphql-eslint/relay-edge-types': [
          'error',
          { listTypeCanWrapOnlyEdgeType: false },
        ],
        '@graphql-eslint/strict-id-in-types': 'off',
      },
    },
    {
      files: NODE_FILE_PATTERNS,
      processor: '@graphql-eslint/graphql',
    },
  ],
};
