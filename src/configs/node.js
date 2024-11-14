// @ts-check

import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import javascript from './javascript.js';

export default tseslint.config(...javascript, {
  name: 'code-pushup/node/custom',
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
