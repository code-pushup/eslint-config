const { TYPESCRIPT_FILE_PATTERNS } = require('./lib/patterns');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: TYPESCRIPT_FILE_PATTERNS,

      plugins: ['@ngrx'],
      extends: ['@code-pushup/eslint-config/angular'],

      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS
        '@ngrx/avoid-combining-component-store-selectors': 'warn',
        '@ngrx/avoid-cyclic-effects': 'error',
        '@ngrx/avoid-duplicate-actions-in-reducer': 'error',
        '@ngrx/avoid-mapping-component-store-selectors': 'warn',
        '@ngrx/updater-explicit-return-type': 'warn',
        '@ngrx/avoid-cyclic-effects': 'warn',
        '@ngrx/no-dispatch-in-effects': 'warn',
        '@ngrx/no-effects-in-providers': 'error',
        '@ngrx/no-multiple-actions-in-effects': 'off',
        '@ngrx/prefer-action-creator-in-of-type': 'warn',
        '@ngrx/prefer-concat-latest-from': 'warn',
        '@ngrx/prefer-effect-callback-in-block-statement': 'off',
        '@ngrx/use-effects-lifecycle-interface': 'warn',
        '@ngrx/avoid-combining-selectors': 'warn',
        '@ngrx/avoid-dispatching-multiple-actions-sequentially': 'warn',
        '@ngrx/avoid-duplicate-actions-in-reducer': 'warn',
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

        // ADDITIONAL RULES

        // https://github.com/cartant/eslint-plugin-rxjs#rules
        'rxjs/no-unsafe-catch': 'error',
        'rxjs/no-unsafe-first': 'error',
        'rxjs/no-unsafe-switchmap': 'error',
      },
    },
  ],
};
