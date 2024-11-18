// @ts-check

import tseslint from 'typescript-eslint';
import node from './src/configs/node.js';
import vitest from './src/configs/vitest.js';

export default tseslint.config(...node, ...vitest, {
  rules: {
    '@typescript-eslint/no-magic-numbers': 'off',
    'import/extensions': ['error', { js: 'always', json: 'never' }],
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
});
