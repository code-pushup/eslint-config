const { TEST_FILE_PATTERNS } = require('./lib/patterns');
const { NAMING_CONVENTION_OPTIONS } = require('./lib/rule-options');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    '@code-pushup',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/strict',
  ],
  rules: {
    // DISABLED RULES FROM EXTENDED CONFIGS

    '@typescript-eslint/unbound-method': 'off',

    // CUSTOMIZED RULES FROM EXTENDED CONFIGS

    '@typescript-eslint/prefer-nullish-coalescing': [
      'warn',
      { ignorePrimitives: { string: true } },
    ],

    // ADDITIONAL RULES

    // https://typescript-eslint.io/rules/
    '@typescript-eslint/naming-convention': [
      'warn',
      ...NAMING_CONVENTION_OPTIONS,
    ],
  },
  overrides: [
    {
      files: TEST_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR TEST FILES

        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',

        // CUSTOMIZED RULES FOR TEST FILES

        '@typescript-eslint/require-await': 'warn',
      },
    },
  ],
};
