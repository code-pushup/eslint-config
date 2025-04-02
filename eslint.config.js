// @ts-check

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import node from './src/configs/node.js';
import vitest from './src/configs/vitest.js';

export default tseslint.config(
  includeIgnoreFile(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '.gitignore'),
  ),
  ...node,
  ...vitest,
  {
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
);
