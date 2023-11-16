/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  globalSetup: './tests/helpers/setup.js',
  globalTeardown: './tests/helpers/teardown.js',
};

module.exports = config;
