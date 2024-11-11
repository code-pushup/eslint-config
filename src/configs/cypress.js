// @ts-check

import cypress from 'eslint-plugin-cypress/flat';
import tseslint from 'typescript-eslint';
import { CYPRESS_FILE_PATTERNS } from '../lib/patterns.js';

export default tseslint.config({
  files: CYPRESS_FILE_PATTERNS,
  extends: [
    cypress.configs.recommended,
    {
      name: 'code-pushup/cypress/additional',
      rules: {
        // https://github.com/cypress-io/eslint-plugin-cypress#rules
        'cypress/no-force': 'warn',
        'cypress/no-pause': 'warn',
      },
    },
  ],
});
