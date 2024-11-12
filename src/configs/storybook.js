// @ts-check

import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...storybook.configs['flat/recommended'],
  ...storybook.configs['flat/csf'],
);
