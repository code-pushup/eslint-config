// @ts-check

import ngrx from '@ngrx/eslint-plugin';
import tseslint from 'typescript-eslint';
import { TYPESCRIPT_FILE_PATTERNS } from '../lib/patterns.js';
import angular from './angular.js';

export default tseslint.config(...angular, {
  files: TYPESCRIPT_FILE_PATTERNS,
  extends: [
    {
      name: 'code-pushup/ngrx/ngrx',
      plugins: {
        '@ngrx': ngrx,
      },
      rules: {
        // https://github.com/ngrx/platform/tree/main/modules/eslint-plugin
        '@ngrx/avoid-combining-component-store-selectors': 'warn',
        '@ngrx/avoid-cyclic-effects': 'error',
        '@ngrx/avoid-duplicate-actions-in-reducer': 'error',
        '@ngrx/avoid-mapping-component-store-selectors': 'warn',
        '@ngrx/updater-explicit-return-type': 'warn',
        '@ngrx/no-dispatch-in-effects': 'warn',
        '@ngrx/no-effects-in-providers': 'error',
        '@ngrx/prefer-action-creator-in-of-type': 'warn',
        '@ngrx/prefer-concat-latest-from': 'warn',
        '@ngrx/use-effects-lifecycle-interface': 'warn',
        '@ngrx/avoid-combining-selectors': 'warn',
        '@ngrx/avoid-dispatching-multiple-actions-sequentially': 'warn',
        '@ngrx/avoid-mapping-selectors': 'warn',
        '@ngrx/good-action-hygiene': 'warn',
        '@ngrx/no-multiple-global-stores': 'warn',
        '@ngrx/no-reducer-in-key-names': 'warn',
        '@ngrx/no-store-subscription': 'warn',
        '@ngrx/no-typed-global-store': 'warn',
        '@ngrx/on-function-explicit-return-type': 'warn',
        '@ngrx/prefer-action-creator-in-dispatch': 'warn',
        '@ngrx/prefer-action-creator': 'warn',
        '@ngrx/prefer-inline-action-props': 'warn',
        '@ngrx/prefer-one-generic-in-create-for-feature-selector': 'warn',
        '@ngrx/prefer-selector-in-select': 'warn',
        '@ngrx/prefix-selectors-with-select': 'warn',
        '@ngrx/select-style': 'warn',
        '@ngrx/use-consistent-global-store-name': ['warn', 'store$'],

        // https://github.com/cartant/eslint-plugin-rxjs#rules
        'rxjs-x/no-unsafe-catch': 'error',
        'rxjs-x/no-unsafe-first': 'error',
        'rxjs-x/no-unsafe-switchmap': 'error',
      },
    },
    {
      name: 'code-pushup/ngrx/rjxs',
      rules: {
        // https://github.com/cartant/eslint-plugin-rxjs#rules
        'rxjs-x/no-unsafe-catch': 'error',
        'rxjs-x/no-unsafe-first': 'error',
        'rxjs-x/no-unsafe-switchmap': 'error',
      },
    },
  ],
});
