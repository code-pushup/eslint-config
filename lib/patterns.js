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

const UNIT_TEST_FILE_PATTERNS = withExtensions([
  fromSuffix('spec'),
  fromSuffix('test'),
  fromDirectory('__tests__'),
]);

const TEST_FILE_PATTERNS = [
  ...UNIT_TEST_FILE_PATTERNS,
  ...withExtensions([
    fromDirectory('__mocks__'),
    fromSuffix('cy'),
    fromSuffix('stories'),
    fromSuffix('e2e'),
    fromSuffix('mock'),
    fromSuffix('mocks'),
    fromDirectory('test'),
    fromDirectory('tests'),
    fromDirectory('mocks'),
    fromDirectory('testing-utils'),
    fromDirectory('test-utils'),
    fromDirectory('fixtures'),
  ]),
];

const TYPESCRIPT_FILE_PATTERNS = ['*.ts', '*.tsx'];

const HTML_FILE_PATTERNS = ['*.html'];

const CYPRESS_FILE_PATTERNS = ['*.cy.[jt]s?(x)', 'e2e/**/*.[jt]s?(x)'];

const NODE_FILE_PATTERNS = ['*.ts', '*.js'];

const GRAPHQL_FILE_PATTERN = '*.graphql';

module.exports = {
  TEST_FILE_PATTERNS,
  UNIT_TEST_FILE_PATTERNS,
  TYPESCRIPT_FILE_PATTERNS,
  HTML_FILE_PATTERNS,
  CYPRESS_FILE_PATTERNS,
  NODE_FILE_PATTERNS,
  GRAPHQL_FILE_PATTERN,
};
