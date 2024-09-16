const {
  TEST_FILE_PATTERNS,
  GENERATED_FILE_PATTERNS,
  CONFIG_FILE_PATTERNS,
  JSON_FILE_PATTERNS,
  COMMONJS_FILE_PATTERNS,
  SVELTE_FILE_PATTERN,
} = require('./lib/patterns');
const { packageExists, convertErrorsToWarnings } = require('./lib/utils');
const unicorn = require('eslint-plugin-unicorn');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

const isPrettierAvailable =
  packageExists('prettier') && packageExists('eslint-config-prettier');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'functional'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    ...(isPrettierAvailable ? ['prettier'] : []),
  ],

  rules: {
    // CUSTOMIZED RULES FROM EXTENDED CONFIGS

    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    ...convertErrorsToWarnings(unicorn.configs.recommended.rules),
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

    // DISABLED RULES FROM EXTENDED CONFIGS

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

    // ADDITIONAL RULES

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
    'no-bitwise': 'warn',
    'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
    'no-duplicate-imports': 'warn',
    'no-eval': 'error',
    'no-param-reassign': ['error', { props: true }],
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-undef-init': 'warn',
    'no-unreachable-loop': 'error',
    'prefer-template': 'warn',
    radix: 'warn',
    yoda: 'warn',

    // https://typescript-eslint.io/rules/
    '@typescript-eslint/default-param-last': 'warn',
    // TODO - remove condition after updating to "@typescript-eslint/eslint-plugin": "^7.0.0" in peerDependencies
    // add new "class-methods-use-this" rule (added in @typescript-eslint/eslint-plugin@6.2.0)
    ...(typescriptEslint.rules['class-methods-use-this']
      ? {
          '@typescript-eslint/class-methods-use-this': 'warn',
        }
      : {}),
    '@typescript-eslint/max-params': ['warn', { max: 4 }],
    '@typescript-eslint/method-signature-style': 'warn',
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

  overrides: [
    {
      files: TEST_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR TEST FILES

        '@typescript-eslint/no-magic-numbers': 'off',
        'max-lines-per-function': 'off',
        'max-lines': 'off',
        curly: 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'functional/no-let': 'off',
        'promise/catch-or-return': 'off',

        // CUSTOMIZED RULES FOR TEST FILES

        'max-nested-callbacks': ['warn', { max: 10 }],
      },
    },

    {
      files: CONFIG_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR CONFIG FILES

        'import/no-anonymous-default-export': 'off',
        'import/no-unassigned-import': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/prefer-module': 'off',
      },
    },

    {
      files: GENERATED_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR GENERATED FILES

        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },

    {
      files: JSON_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR JSON FILES

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
      files: COMMONJS_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR CJS FILES

        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-commonjs': 'off',
      },
    },

    {
      files: SVELTE_FILE_PATTERN,
      rules: {
        // DISABLED RULES FOR SVELTE FILES

        'import/no-mutable-exports': 'off',
        'functional/no-let': 'off',
      },
    },
  ],
};
