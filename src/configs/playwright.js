// @ts-check

import * as jestFormatting from 'eslint-plugin-jest-formatting';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import { PLAYWRIGHT_FILE_PATTERNS } from '../lib/patterns.js';

export default tseslint.config({
  files: PLAYWRIGHT_FILE_PATTERNS,
  extends: [
    playwright.configs['flat/recommended'],
    {
      name: 'code-pushup/playwright/jest-formatting',
      plugins: {
        'jest-formatting': jestFormatting,
      },
      rules: {
        'jest-formatting/padding-around-describe-blocks': 'warn',
        'jest-formatting/padding-around-test-blocks': 'warn',
      },
    },
    {
      name: 'code-pushup/playwright/customized',
      rules: {
        'playwright/no-conditional-expect': 'warn',
        'playwright/no-conditional-in-test': 'warn',
        'playwright/no-focused-test': 'warn',
        'playwright/no-standalone-expect': 'warn',
      },
    },
    {
      name: 'code-pushup/playwright/additional',
      rules: {
        'playwright/no-commented-out-tests': 'warn',
        'playwright/no-duplicate-hooks': 'warn',
        'playwright/no-nested-step': 'warn',
        'playwright/prefer-comparison-matcher': 'warn',
        'playwright/prefer-equality-matcher': 'warn',
        'playwright/prefer-hooks-in-order': 'warn',
        'playwright/prefer-hooks-on-top': 'warn',
        'playwright/prefer-native-locators': 'warn',
        'playwright/prefer-locator': 'warn',
        'playwright/prefer-to-be': 'warn',
        'playwright/prefer-to-contain': 'warn',
        'playwright/prefer-to-have-count': 'warn',
        'playwright/prefer-to-have-length': 'warn',
        'playwright/require-hook': 'warn',
        'playwright/require-to-throw-message': 'warn',
      },
    },
  ],
});
