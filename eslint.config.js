// @ts-check

import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import nxPlugin from '@nx/eslint-plugin';
import * as jsoncParser from 'jsonc-eslint-parser';
import fs from 'node:fs';
import path from 'node:path';
import node from './packages/eslint-config/src/configs/node.js';
import vitest from './packages/eslint-config/src/configs/vitest.js';

export default defineConfig(
  includeIgnoreFile(path.join(import.meta.dirname, '.gitignore')),
  ...node,
  ...vitest,
  ...nxPlugin.configs['flat/base'],
  { settings: { 'import/resolver': { typescript: true, node: true } } },
  {
    // tests need only be compatible with local Node version
    // publishable packages should pick up version range from "engines" in their package.json
    files: ['tests/**/*', '**/*.spec.ts', '**/*.spec.js'],
    settings: {
      node: {
        version: fs.readFileSync(
          path.join(import.meta.dirname, '.node-version'),
          'utf8',
        ),
      },
    },
  },
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            String.raw`^.*/eslint\.config\.js$`,
            '^@code-pushup/eslint-config$',
          ],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],
    },
  },
  {
    files: ['**/package.json'],
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
);
