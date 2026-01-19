// @ts-check

import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  name: 'code-pushup/storybook',
  // @ts-expect-error incompatible rules types (create function's context parameter)
  extends: [
    ...storybook.configs['flat/recommended'],
    ...storybook.configs['flat/csf'],
  ],
});
