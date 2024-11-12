// @ts-check

import eslint from '@eslint/js';
import functional from 'eslint-plugin-functional';
import * as importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import {
  COMMONJS_FILE_PATTERNS,
  CONFIG_FILE_PATTERNS,
  GENERATED_FILE_PATTERNS,
  JSON_FILE_PATTERNS,
  SVELTE_FILE_PATTERN,
  TEST_FILE_PATTERNS,
} from '../lib/patterns.js';
import { convertErrorsToWarnings, packageExists } from '../lib/utils.js';

const isPrettierAvailable =
  packageExists('prettier') && packageExists('eslint-config-prettier');

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...(isPrettierAvailable ? [require('eslint-config-prettier')] : []),
  importPlugin.flatConfigs?.recommended,
  sonarjs.configs.recommended,
  // @ts-expect-error incorrectly inferred as possible legacy config from .js
  unicorn.configs['flat/recommended'],
  promise.configs['flat/recommended'],
  {
    name: 'code-pushup/javascript/customized',
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      ...convertErrorsToWarnings(unicorn.configs['flat/recommended'].rules),
      'unicorn/switch-case-braces': ['warn', 'avoid'],
      'unicorn/better-regex': ['warn', { sortCharacterClasses: false }],
      'unicorn/no-useless-undefined': ['warn', { checkArguments: false }],
      'unicorn/consistent-function-scoping': [
        'warn',
        { checkArrowFunctions: false },
      ],
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/prefer-immediate-return': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'promise/always-return': ['error', { ignoreLastCallback: true }],
    },
  },
  {
    name: 'code-pushup/javascript/disabled',
    rules: {
      'no-case-declarations': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prefer-string-replace-all': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/additional',
    plugins: {
      functional,
    },
    rules: {
      // https://eslint.org/docs/latest/rules/
      'arrow-body-style': ['warn', 'as-needed'],
      complexity: 'warn',
      curly: 'warn',
      eqeqeq: ['error', 'always', { null: 'never' }],
      'guard-for-in': 'error',
      'max-depth': 'warn',
      'max-lines': ['warn', { skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        'warn',
        { skipBlankLines: true, skipComments: true },
      ],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'object-shorthand': 'warn',
      'no-bitwise': 'warn',
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
      'no-duplicate-imports': 'warn',
      'no-eval': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-sequences': 'error',
      'no-template-curly-in-string': 'error',
      'no-undef-init': 'warn',
      'no-unreachable-loop': 'error',
      'no-useless-rename': 'warn',
      'prefer-template': 'warn',
      radix: 'warn',
      yoda: 'warn',

      // https://typescript-eslint.io/rules/
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/adjacent-overload-signatures': 'warn',
      '@typescript-eslint/ban-tslint-comment': 'warn',
      '@typescript-eslint/class-methods-use-this': 'warn',
      '@typescript-eslint/consistent-generic-constructors': 'warn',
      '@typescript-eslint/default-param-last': 'warn',
      '@typescript-eslint/max-params': ['warn', { max: 4 }],
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-function': [
        'warn',
        {
          allow: [
            'private-constructors',
            'protected-constructors',
            'decoratedFunctions',
            'overrideMethods',
          ],
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2, 7, 10, 24, 60, 100, 1000, 3600],
          ignoreClassFieldInitialValues: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
          enforceConst: true,
          detectObjects: true,
        },
      ],
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',

      // https://github.com/import-js/eslint-plugin-import#rules
      'import/extensions': ['warn', 'never', { json: 'always' }],
      'import/max-dependencies': ['warn', { ignoreTypeImports: true }],
      'import/no-absolute-path': 'error',
      'import/no-amd': 'error',
      'import/no-anonymous-default-export': 'warn',
      'import/no-commonjs': 'error',
      'import/no-cycle': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'warn',
      'import/no-self-import': 'error',
      'import/no-unassigned-import': 'warn',
      'import/no-useless-path-segments': 'warn',

      // https://github.com/eslint-functional/eslint-plugin-functional#rules
      'functional/no-let': 'warn',
      'functional/no-loop-statements': 'warn',
    },
  },
  {
    name: 'code-pushup/javascript/tests/disabled',
    files: TEST_FILE_PATTERNS,
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      curly: 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'functional/no-let': 'off',
      'promise/catch-or-return': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/tests/customized',
    files: TEST_FILE_PATTERNS,
    rules: {
      'max-nested-callbacks': ['warn', { max: 10 }],
    },
  },
  {
    name: 'code-pushup/javascript/configs/disabled',
    files: CONFIG_FILE_PATTERNS,
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-unassigned-import': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/generated/disabled',
    files: GENERATED_FILE_PATTERNS,
    rules: {
      '@typescript-eslint/ban-tslint-comment': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/json/disabled',
    files: JSON_FILE_PATTERNS,
    rules: {
      'max-lines': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/numeric-separators-style': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/cjs/disabled',
    files: COMMONJS_FILE_PATTERNS,
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off',
    },
  },
  {
    name: 'code-pushup/javascript/svelte/disabled',
    files: [SVELTE_FILE_PATTERN],
    rules: {
      'import/no-mutable-exports': 'off',
      'functional/no-let': 'off',
    },
  },
);
