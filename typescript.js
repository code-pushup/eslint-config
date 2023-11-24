const {
  TEST_FILE_PATTERNS,
  TYPESCRIPT_FILE_PATTERNS,
} = require('./lib/patterns');
const { NAMING_CONVENTION_OPTIONS } = require('./lib/rule-options');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@code-pushup'],

  overrides: [
    {
      files: TYPESCRIPT_FILE_PATTERNS,

      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:import/typescript',
        'plugin:deprecation/recommended',
      ],

      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@typescript-eslint/no-confusing-void-expression': 'warn',
        '@typescript-eslint/no-meaningless-void-operator': 'warn',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': [
          'warn',
          { ignorePrimitives: { string: true } },
        ],
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-return-this-type': 'warn',

        // DISABLED RULES FROM EXTENDED CONFIGS

        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',

        // ADDITIONAL RULES

        // https://typescript-eslint.io/rules/
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never',
          },
        ],
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

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/prefer-reduce-type-parameter': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',

            // CUSTOMIZED RULES FOR TEST FILES

            '@typescript-eslint/consistent-type-assertions': [
              'warn',
              {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow',
              },
            ],
            '@typescript-eslint/require-await': 'warn',
          },
        },
      ],
    },
  ],
};
