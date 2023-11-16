/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
};

module.exports = config;
