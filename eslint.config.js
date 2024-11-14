// @ts-check

import tseslint from 'typescript-eslint';
import cpeslint from './src/index.js';

export default tseslint.config(...cpeslint.javascript, ...cpeslint.vitest);
