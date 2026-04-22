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
  {
    // in bin files, imports with side effects are allowed
    files: ['**/bin.js'],
    rules: {
      'import/no-unassigned-import': 'off',
    },
  },
  {
    // specs call a custom test created via test.extend
    // all variants are listed so the vitest rules treat them as test blocks
    files: ['**/*.spec.ts'],
    rules: {
      'vitest/no-standalone-expect': [
        'warn',
        { additionalTestBlockFunctions: ['test', 'test.for', 'test.each'] },
      ],
      'vitest/require-hook': [
        'warn',
        { allowedFunctionCalls: ['test', 'test.for', 'test.each'] },
      ],
    },
  },
  {
    // test.extend belongs at module scope (the documented vitest pattern)
    files: ['**/test-setup.ts'],
    rules: {
      'vitest/require-hook': 'off',
    },
  },
);
