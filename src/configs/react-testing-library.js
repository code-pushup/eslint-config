// @ts-check

import rtl from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';
import { UNIT_TEST_FILE_PATTERNS } from '../lib/patterns.js';

export default tseslint.config({
  files: UNIT_TEST_FILE_PATTERNS,
  extends: [
    rtl.configs['flat/react'],
    {
      name: 'code-pushup/react-testing-library/customized',
      rules: {
        'testing-library/no-await-sync-events': 'warn',
        'testing-library/no-await-sync-queries': 'warn',
        'testing-library/no-container': 'warn',
        'testing-library/no-manual-cleanup': 'warn',
        'testing-library/no-node-access': 'warn',
        'testing-library/no-render-in-lifecycle': 'warn',
        'testing-library/no-wait-for-multiple-assertions': 'warn',
        'testing-library/prefer-find-by': 'warn',
        'testing-library/prefer-presence-queries': 'warn',
        'testing-library/prefer-query-by-disappearance': 'warn',
        'testing-library/prefer-query-matchers': 'warn',
        'testing-library/prefer-screen-queries': 'warn',
        'testing-library/render-result-naming-convention': 'warn',
      },
    },
    {
      name: 'code-pushup/react-testing-library/additional',
      rules: {
        'testing-library/prefer-explicit-assert': 'warn',
        'testing-library/prefer-query-matchers': [
          'warn',
          {
            validEntries: [
              { matcher: 'toBeVisible', query: 'get' },
              { matcher: 'toHaveTextContent', query: 'get' },
              { matcher: 'toBeEnabled', query: 'get' },
              { matcher: 'toBeDisabled', query: 'get' },
              { matcher: 'toBeChecked', query: 'get' },
            ],
          },
        ],
        'testing-library/prefer-user-event': 'warn',
      },
    },
  ],
});
