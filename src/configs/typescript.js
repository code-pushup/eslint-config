// @ts-check

import * as importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import {
  CONFIG_FILE_PATTERNS,
  negatePatterns,
  STORYBOOK_FILE_PATTERNS,
  TEST_FILE_PATTERNS,
  TYPESCRIPT_FILE_PATTERNS,
} from '../lib/patterns.js';
import {
  NAMING_CONVENTION_OPTIONS,
  NAMING_CONVENTION_OPTIONS_STORYBOOK,
} from '../lib/rule-options.js';
import javascript from './javascript.js';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} */
// @ts-expect-error inferred from .js incorrectly
const importConfigTypescript = importPlugin.flatConfigs?.typescript;

export default tseslint.config(
  ...javascript,
  {
    files: TYPESCRIPT_FILE_PATTERNS,
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      importConfigTypescript,
      {
        name: 'code-pushup/typescript/customized',
        rules: {
          '@typescript-eslint/no-confusing-void-expression': 'warn',
          '@typescript-eslint/no-meaningless-void-operator': 'warn',
          '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
          '@typescript-eslint/no-unnecessary-condition': 'warn',
          '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
          '@typescript-eslint/no-unnecessary-template-expression': 'warn',
          '@typescript-eslint/prefer-promise-reject-errors': 'warn',
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
        },
      },
      {
        name: 'code-pushup/typescript/disabled',
        rules: {
          '@typescript-eslint/unbound-method': 'off',
          '@typescript-eslint/no-unsafe-enum-comparison': 'off',
          'unicorn/prefer-string-starts-ends-with': 'off', // superseded by @typescript-eslint/prefer-string-starts-ends-with
        },
      },
      {
        name: 'code-pushup/typescript/additional',
        rules: {
          // https://typescript-eslint.io/rules/
          '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
              assertionStyle: 'as',
              objectLiteralTypeAssertions: 'never',
            },
          ],
          '@typescript-eslint/dot-notation': [
            'warn',
            { allowIndexSignaturePropertyAccess: true },
          ],
          '@typescript-eslint/naming-convention': [
            'warn',
            ...NAMING_CONVENTION_OPTIONS,
          ],
          '@typescript-eslint/no-unsafe-unary-minus': 'error',
          '@typescript-eslint/non-nullable-type-assertion-style': 'error',
          '@typescript-eslint/prefer-optional-chain': 'warn',
          '@typescript-eslint/prefer-string-starts-ends-with': 'warn',

          // https://github.com/eslint-functional/eslint-plugin-functional#rules
          'functional/immutable-data': [
            'error',
            { ignoreImmediateMutation: true, ignoreClasses: true },
          ],
          'functional/prefer-property-signatures': 'warn',
          'functional/prefer-tacit': 'warn',
        },
      },
    ],
  },
  {
    files: TEST_FILE_PATTERNS,
    ignores: negatePatterns(TYPESCRIPT_FILE_PATTERNS),
    extends: [
      {
        name: 'code-pushup/typescript/tests/disabled',
        rules: {
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/prefer-reduce-type-parameter': 'off',
          '@typescript-eslint/restrict-template-expressions': 'off',
        },
      },
      {
        name: 'code-pushup/typescript/tests/customized',
        rules: {
          '@typescript-eslint/consistent-type-assertions': [
            'warn',
            {
              assertionStyle: 'as',
              objectLiteralTypeAssertions: 'allow',
            },
          ],
          '@typescript-eslint/dot-notation': [
            'warn',
            {
              allowPrivateClassPropertyAccess: true,
              allowProtectedClassPropertyAccess: true,
              allowIndexSignaturePropertyAccess: true,
            },
          ],
          '@typescript-eslint/require-await': 'warn',
          'functional/immutable-data': [
            'warn',
            { ignoreImmediateMutation: true },
          ],
        },
      },
    ],
  },
  {
    name: 'code-pushup/javascript/configs/disabled',
    files: CONFIG_FILE_PATTERNS,
    rules: {
      'functional/immutable-data': 'off',
    },
  },
  {
    name: 'code-pushup/typescript/storybook/customized',
    files: STORYBOOK_FILE_PATTERNS,
    ignores: negatePatterns(TYPESCRIPT_FILE_PATTERNS),
    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        ...NAMING_CONVENTION_OPTIONS_STORYBOOK,
      ],
    },
  },
  {
    files: negatePatterns(TYPESCRIPT_FILE_PATTERNS),
    ...tseslint.configs.disableTypeChecked,
  },
);
