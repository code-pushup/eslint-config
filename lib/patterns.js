/** @param {string} suffix */
const fromSuffix = suffix => `*.${suffix}`;

/** @param {string} dir */
const fromDirectory = dir => `${dir}/**/*`;

/**
 * @param {string[]} patterns
 * @returns {string[]}
 */
const withExtensions = patterns =>
  patterns.map(pattern => `${pattern}.[jt]s?(x)`);

const TEST_FILE_PATTERNS = withExtensions([
  fromSuffix('spec'),
  fromSuffix('test'),
  fromSuffix('cy'),
  fromSuffix('stories'),
  fromSuffix('mock'),
  fromSuffix('e2e'),
  fromDirectory('__tests__'),
  fromDirectory('__mocks__'),
  fromDirectory('test'),
  fromDirectory('tests'),
  fromDirectory('mocks'),
  fromDirectory('testing-utils'),
  fromDirectory('test-utils'),
  fromDirectory('fixtures'),
]);

module.exports = {
  TEST_FILE_PATTERNS,
};
