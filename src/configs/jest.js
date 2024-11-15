// @ts-check

import jest from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import { UNIT_TEST_FILE_PATTERNS } from '../lib/patterns.js';

export default tseslint.config({
  files: UNIT_TEST_FILE_PATTERNS,
  extends: [
    jest.configs['flat/recommended'],
    {
      settings: {
        jest: {
          version: 'latest',
        },
      },
    },
    {
      name: 'code-pushup/jest/customized',
      rules: {
        'jest/no-alias-methods': 'warn',
        'jest/no-conditional-expect': 'warn',
        'jest/no-deprecated-functions': 'warn',
        'jest/no-done-callback': 'warn',
        'jest/no-export': 'warn',
        'jest/no-focused-tests': 'warn',
        'jest/no-mocks-import': 'warn',
        'jest/no-standalone-expect': 'warn',
      },
    },
    {
      name: 'code-pushup/jest/additional',
      rules: {
        // https://github.com/jest-community/eslint-plugin-jest#rules
        'jest/consistent-test-it': 'warn',
        'jest/max-nested-describe': ['warn', { max: 2 }],
        'jest/no-duplicate-hooks': 'warn',
        'jest/no-test-return-statement': 'warn',
        'jest/padding-around-after-all-blocks': 'warn',
        'jest/padding-around-after-each-blocks': 'warn',
        'jest/padding-around-before-all-blocks': 'warn',
        'jest/padding-around-before-each-blocks': 'warn',
        'jest/padding-around-describe-blocks': 'warn',
        'jest/padding-around-test-blocks': 'warn',
        'jest/prefer-comparison-matcher': 'warn',
        'jest/prefer-each': 'warn',
        'jest/prefer-equality-matcher': 'warn',
        'jest/prefer-expect-resolves': 'warn',
        'jest/prefer-hooks-on-top': 'warn',
        'jest/prefer-mock-promise-shorthand': 'warn',
        'jest/prefer-spy-on': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/prefer-to-contain': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/prefer-todo': 'warn',
        'jest/require-hook': 'warn',
        'jest/require-to-throw-message': 'warn',
        'jest/require-top-level-describe': 'warn',
      },
    },
  ],
});
