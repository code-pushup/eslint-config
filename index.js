const {
  TEST_FILE_PATTERNS,
  GENERATED_FILE_PATTERNS,
  CONFIG_FILE_PATTERNS,
  JSON_FILE_PATTERNS,
} = require('./lib/patterns');
const { packageExists } = require('./lib/utils');
const unicorn = require('eslint-plugin-unicorn');

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
    // convert unicorn errors to warnings
    ...Object.entries(unicorn.configs.recommended.rules).reduce(
      (acc, [ruleId, entry]) => ({
        ...acc,
        [ruleId]: entry === 'error' ? 'warn' : entry,
      }),
      {},
    ),
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
    'no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 1, 2, 7, 10, 24, 60, 100, 1000, 3600],
        ignoreDefaultValues: true,
        ignoreClassFieldInitialValues: true,
        enforceConst: true,
        detectObjects: true,
      },
    ],
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
    '@typescript-eslint/max-params': ['warn', { max: 4 }],
    '@typescript-eslint/method-signature-style': 'warn',
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
    'functional/immutable-data': [
      'error',
      { ignoreImmediateMutation: true, ignoreClasses: true },
    ],
    'functional/no-let': 'warn',
    'functional/no-loop-statements': 'warn',
    'functional/prefer-property-signatures': 'warn',
    'functional/prefer-tacit': 'warn',
  },

  overrides: [
    {
      files: TEST_FILE_PATTERNS,
      rules: {
        // DISABLED RULES FOR TEST FILES

        'no-magic-numbers': 'off',
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
        'functional/immutable-data': [
          'warn',
          { ignoreImmediateMutation: true },
        ],
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

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ],
};
