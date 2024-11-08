/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ['n'],

  extends: ['@code-pushup/eslint-config/legacy'],

  rules: {
    // ADDITIONAL RULES

    // https://github.com/eslint-community/eslint-plugin-n#-rules
    'n/no-unsupported-features/node-builtins': 'error',
    'n/no-process-exit': 'warn',
    'n/no-sync': 'warn',
    'n/prefer-promises/fs': 'warn',
  },
};
