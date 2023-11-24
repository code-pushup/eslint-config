const { STORYBOOK_FILE_PATTERNS } = require('./lib/patterns');
const { NAMING_CONVENTION_OPTIONS_STORYBOOK } = require('./lib/rule-options');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['plugin:storybook/recommended', 'plugin:storybook/csf'],

  overrides: [
    {
      files: STORYBOOK_FILE_PATTERNS,
      rules: {
        // CUSTOMIZED RULES FROM EXTENDED CONFIGS

        '@typescript-eslint/naming-convention': [
          'warn',
          ...NAMING_CONVENTION_OPTIONS_STORYBOOK,
        ],
      },
    },
  ],
};
