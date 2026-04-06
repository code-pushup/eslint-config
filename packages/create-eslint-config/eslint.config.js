// @ts-check

import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import node from '../eslint-config/src/configs/node.js';
import vitest from '../eslint-config/src/configs/vitest.js';

export default defineConfig(
  includeIgnoreFile(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      '..',
      '..',
      '.gitignore',
    ),
  ),
  ...node,
  ...vitest,
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
);
