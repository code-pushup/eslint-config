const {
  TEST_FILE_PATTERNS,
  TEST_FILE_PATTERNS_INLINE_TEMPLATES,
  TYPESCRIPT_FILE_PATTERNS,
  HTML_FILE_PATTERNS,
  ANGULAR_PIPE_FILE_PATTERNS,
} = require('./lib/patterns');
const { NAMING_CONVENTION_OPTIONS_ANGULAR } = require('./lib/rule-options');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: TYPESCRIPT_FILE_PATTERNS,

      extends: [
        '@code-pushup/eslint-config/typescript',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:rxjs/recommended',
      ],

      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@angular-eslint/component-class-suffix': 'warn',
        '@angular-eslint/directive-class-suffix': 'warn',
        '@angular-eslint/no-empty-lifecycle-method': 'warn',
        '@angular-eslint/no-host-metadata-property': [
          'warn',
          { allowStatic: true },
        ],
        '@angular-eslint/no-input-rename': 'warn',
        '@angular-eslint/no-inputs-metadata-property': 'warn',
        '@angular-eslint/no-output-native': 'warn',
        '@angular-eslint/no-output-on-prefix': 'warn',
        '@angular-eslint/no-output-rename': 'warn',
        '@angular-eslint/no-outputs-metadata-property': 'warn',
        'rxjs/no-async-subscribe': 'warn',
        'rxjs/no-create': 'warn',
        'rxjs/no-nested-subscribe': 'warn',
        '@typescript-eslint/naming-convention': [
          'warn',
          ...NAMING_CONVENTION_OPTIONS_ANGULAR,
        ],

        // DISABLED RULES FROM EXTENDED CONFIGS

        // TODO - remove condition after updating to "@typescript-eslint/eslint-plugin": "^7.0.0" in peerDependencies
        // override new "class-methods-use-this" rule from defaults in index.js (added in @typescript-eslint/eslint-plugin@6.2.0)
        ...(typescriptEslint.rules['class-methods-use-this']
          ? {
              '@typescript-eslint/class-methods-use-this': 'off',
            }
          : {}),
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-floating-promises': 'off', // because of router.navigate
        'promise/catch-or-return': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prefer-event-target': 'off',

        // ADDITIONAL RULES

        // https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin#rules
        '@angular-eslint/component-max-inline-declarations': 'warn',
        '@angular-eslint/component-selector': [
          'warn',
          { type: 'element', style: 'kebab-case' },
        ],
        '@angular-eslint/contextual-decorator': 'error',
        '@angular-eslint/directive-selector': [
          'warn',
          { type: 'attribute', style: 'camelCase' },
        ],
        '@angular-eslint/no-attribute-decorator': 'warn',
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/no-pipe-impure': 'warn',
        '@angular-eslint/no-queries-metadata-property': 'warn',
        '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
        '@angular-eslint/prefer-output-readonly': 'warn',
        '@angular-eslint/prefer-standalone-component': 'warn',
        '@angular-eslint/relative-url-prefix': 'warn',
        '@angular-eslint/sort-lifecycle-methods': 'warn',
        '@angular-eslint/use-component-selector': 'warn',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-injectable-provided-in': 'warn',
        '@angular-eslint/use-lifecycle-interface': 'warn',
        // https://github.com/cartant/eslint-plugin-rxjs/tree/main#rules
        'rxjs/finnish': 'warn',
        'rxjs/no-compat': 'warn',
        'rxjs/no-exposed-subjects': 'warn',
        'rxjs/no-ignored-observable': 'warn',
        'rxjs/prefer-observer': 'warn',
        'rxjs/throw-error': 'warn',
        // https://github.com/import-js/eslint-plugin-import#rules
        'import/no-namespace': 'error',
        'import/no-nodejs-modules': 'error',
      },

      overrides: [
        {
          files: TEST_FILE_PATTERNS,
          rules: {
            // DISABLED RULES FOR TEST FILES

            '@angular-eslint/component-max-inline-declarations': 'off',
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
            '@angular-eslint/prefer-standalone-component': 'off',
            '@angular-eslint/use-component-selector': 'off',
            '@angular-eslint/use-injectable-provided-in': 'off',
            'rxjs/finnish': 'off',

            // CUSTOMIZED RULES FOR TEST FILES

            '@angular-eslint/no-lifecycle-call': 'warn',
          },
        },

        {
          files: ANGULAR_PIPE_FILE_PATTERNS,
          rules: {
            // DISABLED RULES FOR ANGULAR PIPES
            'prefer-tacit': 'off',
          },
        },
      ],
    },

    {
      files: HTML_FILE_PATTERNS,
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@angular-eslint/template/eqeqeq': [
          'error',
          { allowNullOrUndefined: true },
        ],
        '@angular-eslint/template/no-autofocus': 'warn',

        // ADDITIONAL RULES

        // https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template#rules
        '@angular-eslint/template/conditional-complexity': 'warn',
        '@angular-eslint/template/cyclomatic-complexity': [
          'warn',
          { maxComplexity: 20 },
        ],
        '@angular-eslint/template/interactive-supports-focus': 'warn',
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/no-inline-styles': [
          'warn',
          { allowNgStyle: true, allowBindToStyle: true },
        ],
        '@angular-eslint/template/no-interpolation-in-attributes': 'warn',
        '@angular-eslint/template/no-positive-tabindex': 'warn',
        // "@angular-eslint/template/prefer-control-flow": "warn", <-- disabled until control flow out of developer preview
        '@angular-eslint/template/prefer-ngsrc': 'warn',
        '@angular-eslint/template/prefer-self-closing-tags': 'warn',
        '@angular-eslint/template/role-has-required-aria': 'error',
        '@angular-eslint/template/use-track-by-function': 'warn',
      },

      overrides: [
        {
          files: TEST_FILE_PATTERNS_INLINE_TEMPLATES,
          rules: {
            // DISABLED RULES FOR TEST FILES

            '@angular-eslint/template/no-inline-styles': 'off',
            '@angular-eslint/template/no-any': 'off',
            '@angular-eslint/template/prefer-ngsrc': 'off',
            '@angular-eslint/template/use-track-by-function': 'off',
          },
        },
      ],
    },
  ],
};
