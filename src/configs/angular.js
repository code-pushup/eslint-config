// @ts-check

import angular from 'angular-eslint';
import rxjs from 'eslint-plugin-rxjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import {
  ANGULAR_COMPONENT_FILE_PATTERNS,
  ANGULAR_PIPE_FILE_PATTERNS,
  HTML_FILE_PATTERNS,
  TEST_FILE_PATTERNS,
  TEST_FILE_PATTERNS_INLINE_TEMPLATES,
  TYPESCRIPT_FILE_PATTERNS,
} from '../lib/patterns.js';
import { NAMING_CONVENTION_OPTIONS_ANGULAR } from '../lib/rule-options.js';
import typescript from './typescript.js';

export default tseslint.config(
  ...typescript,
  {
    files: TYPESCRIPT_FILE_PATTERNS,
    languageOptions: {
      globals: globals.browser,
    },
    processor: angular.processInlineTemplates,
    extends: [
      ...angular.configs.tsRecommended,
      {
        name: 'code-pushup/angular/rxjs-recommended',
        plugins: {
          rxjs,
        },
        rules: rxjs.configs.recommended.rules,
      },
      {
        name: 'code-pushup/angular/customized',
        rules: {
          '@angular-eslint/component-class-suffix': 'warn',
          '@angular-eslint/directive-class-suffix': 'warn',
          '@angular-eslint/no-empty-lifecycle-method': 'warn',
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
        },
      },
      {
        name: 'code-pushup/angular/disabled',
        rules: {
          '@typescript-eslint/class-methods-use-this': 'off',
          '@typescript-eslint/no-extraneous-class': 'off',
          '@typescript-eslint/no-floating-promises': 'off', // because of router.navigate
          // FIXME: this rule has been turned off as it produced errors
          'rxjs/no-implicit-any-catch': 'off',
          'promise/catch-or-return': 'off',
          'unicorn/prefer-top-level-await': 'off',
          'unicorn/prefer-event-target': 'off',
        },
      },
      {
        name: 'code-pushup/angular/additional',
        rules: {
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
      },
    ],
  },
  {
    files: HTML_FILE_PATTERNS,
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      {
        name: 'code-pushup/angular/template/customized',
        rules: {
          '@angular-eslint/template/eqeqeq': [
            'error',
            { allowNullOrUndefined: true },
          ],
          '@angular-eslint/template/no-autofocus': 'warn',
        },
      },
      {
        name: 'code-pushup/angular/template/additional',
        rules: {
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
      },
    ],
  },
  {
    name: 'code-pushup/angular/tests/customized',
    files: TEST_FILE_PATTERNS,
    rules: {
      '@angular-eslint/no-lifecycle-call': 'warn',
    },
  },
  {
    name: 'code-pushup/angular/tests/disabled',
    files: TEST_FILE_PATTERNS,
    rules: {
      '@angular-eslint/component-max-inline-declarations': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-standalone-component': 'off',
      '@angular-eslint/use-component-selector': 'off',
      '@angular-eslint/use-injectable-provided-in': 'off',
      'rxjs/finnish': 'off',
    },
  },
  {
    name: 'code-pushup/angular/components/customized',
    files: [ANGULAR_COMPONENT_FILE_PATTERNS],
    rules: {
      'max-lines': [
        'warn',
        { max: 400, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    name: 'code-pushup/angular/pipes/customized',
    files: [ANGULAR_PIPE_FILE_PATTERNS],
    rules: {
      'functional/prefer-tacit': 'off',
    },
  },
  {
    name: 'code-pushup/angular/templates/inline/disabled',
    files: TEST_FILE_PATTERNS_INLINE_TEMPLATES,
    rules: {
      '@angular-eslint/template/no-inline-styles': 'off',
      '@angular-eslint/template/no-any': 'off',
      '@angular-eslint/template/prefer-ngsrc': 'off',
      '@angular-eslint/template/use-track-by-function': 'off',
    },
  },
);
