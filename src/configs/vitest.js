// @ts-check

import vitest from '@vitest/eslint-plugin';
import tseslint from 'typescript-eslint';
import { UNIT_TEST_FILE_PATTERNS } from '../lib/patterns.js';

export default tseslint.config({
  files: UNIT_TEST_FILE_PATTERNS,
  extends: [
    vitest.configs.recommended,
    {
      name: 'code-pushup/vitest/globals',
      languageOptions: {
        globals: vitest.environments.env.globals,
      },
    },
    {
      name: 'code-pushup/vitest/customized',
      rules: {
        'vitest/prefer-to-be': 'warn',
      },
    },
    {
      name: 'code-pushup/vitest/additional',
      rules: {
        // https://github.com/vitest-dev/eslint-plugin-vitest#rules
        'vitest/consistent-test-filename': [
          'warn',
          { pattern: String.raw`.*\.spec\.[tj]sx?$` },
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
        'vitest/padding-around-after-all-blocks': 'warn',
        'vitest/padding-around-after-each-blocks': 'warn',
        'vitest/padding-around-before-all-blocks': 'warn',
        'vitest/padding-around-before-each-blocks': 'warn',
        'vitest/padding-around-describe-blocks': 'warn',
        'vitest/padding-around-test-blocks': 'warn',
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
});
