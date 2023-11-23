const { TYPESCRIPT_FILE_PATTERNS } = require('./lib/patterns');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: TYPESCRIPT_FILE_PATTERNS,

      extends: [
        '@code-pushup/eslint-config/angular',
        'plugin:@ngrx/recommended-requiring-type-checking',
      ],

      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@ngrx/avoid-cyclic-effects': 'error',
        '@ngrx/avoid-duplicate-actions-in-reducer': 'error',
        '@ngrx/no-multiple-actions-in-effects': 'off',
        '@ngrx/prefer-effect-callback-in-block-statement': 'off',
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
