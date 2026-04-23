// @ts-check

import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

export default defineConfig(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/package.json'],
    rules: {
      // sibling install target, not an imported module
      '@nx/dependency-checks': [
        'error',
        { ignoredDependencies: ['@code-pushup/eslint-config'] },
      ],
    },
  },
);
