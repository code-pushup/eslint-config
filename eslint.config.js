// @ts-check

import tseslint from 'typescript-eslint';
import cpeslint from './src/index.js';

export default tseslint.config(...cpeslint.node, ...cpeslint.vitest, {
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
