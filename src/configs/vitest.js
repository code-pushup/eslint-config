// @ts-check

import * as jestFormatting from 'eslint-plugin-jest-formatting';
import vitest from 'eslint-plugin-vitest';
import tseslint from 'typescript-eslint';
import { UNIT_TEST_FILE_PATTERNS } from '../lib/patterns.js';
import { convertErrorsToWarnings } from '../lib/utils.js';

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
      name: 'code-pushup/vitest/jest-formatting',
      plugins: {
        'jest-formatting': jestFormatting,
      },
      rules: convertErrorsToWarnings(
        // @ts-expect-error severity 2 incorrectly inferred as number from .js
        jestFormatting.configs.recommended.overrides[0].rules,
      ),
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
});
