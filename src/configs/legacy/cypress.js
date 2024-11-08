const { CYPRESS_FILE_PATTERNS } = require('../../lib/patterns');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: CYPRESS_FILE_PATTERNS,
      extends: ['plugin:cypress/recommended'],
      rules: {
        // ADDITIONAL RULES

        // https://github.com/cypress-io/eslint-plugin-cypress#rules
        'cypress/no-force': 'warn',
        'cypress/no-pause': 'warn',
      },
    },
  ],
};
