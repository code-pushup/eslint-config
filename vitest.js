const { UNIT_TEST_FILE_PATTERNS } = require('./lib/patterns');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: UNIT_TEST_FILE_PATTERNS,
      extends: ['plugin:vitest/recommended'],
      rules: {
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
        'vitest/prefer-equality-matcher': 'warn',
        'vitest/prefer-hooks-on-top': 'warn',
        'vitest/prefer-mock-promise-shorthand': 'warn',
        'vitest/prefer-spy-on': 'warn',
        'vitest/prefer-to-be': 'warn',
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
