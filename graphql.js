const { NODE_FILE_PATTERNS, GRAPHQL_FILE_PATTERN } = require('./lib/patterns');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@code-pushup/eslint-config/node'],

  overrides: [
    {
      files: GRAPHQL_FILE_PATTERN,
      extends: [
        'plugin:@graphql-eslint/schema-recommended',
        'plugin:@graphql-eslint/relay',
      ],
      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

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
