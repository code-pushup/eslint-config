/** @param {string} suffix */
const fromSuffix = suffix => `*.${suffix}`;

/** @param {string} dir */
const fromDirectory = dir => `${dir}/**/*`;

/** @param {string[]} patterns */
const withExtensions = patterns =>
  patterns.reduce(
    (acc, pattern) => [
      ...acc,
      `${pattern}.ts`,
      `${pattern}.js`,
      `${pattern}.tsx`,
      `${pattern}.jsx`,
    ],
    []
  );

const TEST_FILE_PATTERNS = withExtensions([
  fromSuffix('spec'),
  fromSuffix('test'),
  fromSuffix('cy'),
  fromSuffix('mock'),
  fromSuffix('e2e'),
  fromDirectory('__test__'),
  fromDirectory('__mocks__'),
  fromDirectory('test'),
  fromDirectory('mocks'),
  fromDirectory('testing-utils'),
  fromDirectory('test-utils'),
  fromDirectory('fixtures'),
]);

module.exports = {
  TEST_FILE_PATTERNS,
};
