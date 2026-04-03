// @ts-check

import nodePlugin from 'eslint-plugin-n';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import javascript from './javascript.js';

export default defineConfig(...javascript, {
  name: 'code-pushup/node',
  languageOptions: {
    globals: globals.node,
  },
  plugins: {
    n: nodePlugin,
  },
  rules: {
    // https://github.com/eslint-community/eslint-plugin-n#-rules
    'n/no-unsupported-features/node-builtins': 'error',
    'n/no-process-exit': 'warn',
    'n/no-sync': 'warn',
    'n/prefer-promises/fs': 'warn',
  },
});
