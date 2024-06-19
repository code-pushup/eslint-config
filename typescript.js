const {
  TEST_FILE_PATTERNS,
  TYPESCRIPT_FILE_PATTERNS,
} = require('./lib/patterns');
const { NAMING_CONVENTION_OPTIONS } = require('./lib/rule-options');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

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
        // TODO - remove condition after updating to "@typescript-eslint/eslint-plugin": "^7.0.0" in peerDependencies
        // convert new "no-unnecessary-template-expression" rule to warning (used to be "no-useless-template-literals")
        ...(typescriptEslint.rules['no-unnecessary-template-expression']
          ? {
              '@typescript-eslint/no-unnecessary-template-expression': 'warn',
            }
          : {}),
        // TODO - remove condition after updating to "@typescript-eslint/eslint-plugin": "^7.0.0" in peerDependencies
        // convert new "prefer-promise-reject-errors" rule to warning (added in @typescript-eslint/eslint-plugin@6.19.0)
        ...(typescriptEslint.rules['prefer-promise-reject-errors']
          ? {
              '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            }
          : {}),
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': [
          'warn',
          { ignorePrimitives: { string: true } },
        ],
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-return-this-type': 'warn',
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowBoolean: true,
            allowNumber: true,
          },
        ],

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
        // TODO - remove condition after updating to "@typescript-eslint/eslint-plugin": "^7.0.0" in peerDependencies
        // add new "no-unsafe-unary-minus" rule (added in @typescript-eslint/eslint-plugin@6.11.0)
        ...(typescriptEslint.rules['no-unsafe-unary-minus']
          ? {
              '@typescript-eslint/no-unsafe-unary-minus': 'error',
            }
          : {}),

        // https://github.com/eslint-functional/eslint-plugin-functional#rules
        'functional/immutable-data': [
          'error',
          { ignoreImmediateMutation: true, ignoreClasses: true },
        ],
        'functional/prefer-property-signatures': 'warn',
        'functional/prefer-tacit': 'warn',
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
