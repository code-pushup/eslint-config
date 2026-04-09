// @ts-check

import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

export default defineConfig(...baseConfig, {
  rules: { '@typescript-eslint/no-magic-numbers': 'off' },
});
