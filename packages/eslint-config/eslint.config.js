// @ts-check

import { defineConfig } from 'eslint/config';
import * as jsoncParser from 'jsonc-eslint-parser';
import baseConfig from '../../eslint.config.js';

export default defineConfig(
  ...baseConfig,
  { rules: { '@typescript-eslint/no-magic-numbers': 'off' } },
  {
    // This package publishes from source, so typecheck stands in for the build target.
    files: ['**/package.json'],
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          buildTargets: ['typecheck'],
          ignoredFiles: [
            '{projectRoot}/scripts/**',
            '{projectRoot}/tests/**',
            '{projectRoot}/vitest.config.js',
            '{projectRoot}/eslint.config.js',
          ],
          ignoredDependencies: ['eslint-import-resolver-typescript'],
        },
      ],
    },
  },
);
