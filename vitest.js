const { UNIT_TEST_FILE_PATTERNS } = require('./lib/patterns');
const vitest = require('eslint-plugin-vitest');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: UNIT_TEST_FILE_PATTERNS,
      extends: [
        // vitest recommended uses flat config format since v5.0.0: https://github.com/veritem/eslint-plugin-vitest/releases/tag/v0.5.0
        'legacy-recommended' in vitest.configs
          ? 'plugin:vitest/legacy-recommended'
          : 'plugin:vitest/recommended',
      ],
      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        'vitest/prefer-to-be': 'warn',

        // ADDITIONAL RULES

        // https://github.com/veritem/eslint-plugin-vitest#rules
        'vitest/consistent-test-filename': [
          'warn',
          { pattern: '.*\\.spec\\.[tj]sx?$' },
        ],
        'vitest/consistent-test-it': 'warn',
        'vitest/max-nested-describe': ['warn', { max: 2 }],
        'vitest/no-alias-methods': 'warn',
        'vitest/no-conditional-tests': 'warn',
        'vitest/no-conditional-expect': 'warn',
        'vitest/no-disabled-tests': 'warn',
        'vitest/no-focused-tests': 'warn',
        'vitest/no-done-callback': 'warn',
        'vitest/no-duplicate-hooks': 'warn',
        'vitest/no-mocks-import': 'warn',
        'vitest/no-standalone-expect': 'warn',
        'vitest/no-test-return-statement': 'warn',
        'vitest/prefer-comparison-matcher': 'warn',
        'vitest/prefer-each': 'warn',
        'vitest/prefer-expect-resolves': 'warn',
        'vitest/prefer-equality-matcher': 'warn',
        'vitest/prefer-hooks-on-top': 'warn',
        'vitest/prefer-mock-promise-shorthand': 'warn',
        'vitest/prefer-spy-on': 'warn',
        'vitest/prefer-to-contain': 'warn',
        'vitest/prefer-to-have-length': 'warn',
        'vitest/prefer-todo': 'warn',
        'vitest/require-hook': 'warn',
        'vitest/require-to-throw-message': 'warn',
        'vitest/require-top-level-describe': 'warn',
      },
    },
  ],
};
