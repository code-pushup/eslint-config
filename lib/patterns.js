/** @param {string} suffix */
const fromSuffix = suffix => `*.${suffix}`;

/** @param {string} dir */
const fromDirectory = dir => `**/${dir}/**/*`;

/**
 * @param {string[]} patterns
 * @param {{ skipJSX?: boolean }} options
 * @returns {string[]}
 */
const withExtensions = (patterns, options = {}) =>
  patterns.map(
    pattern => `${pattern}.?(c|m)[jt]s${options.skipJSX ? '' : `?(x)`}`,
  );

const CONFIG_FILE_PATTERNS = withExtensions(
  ['*.config', '.prettierrc', 'codegen'],
  { skipJSX: true },
);

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
  ...CONFIG_FILE_PATTERNS,
];

// @angular-eslint's inline templates processor transforms .ts files to .html
// https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/src/processors.ts#L164
const TEST_FILE_PATTERNS_INLINE_TEMPLATES = TEST_FILE_PATTERNS.map(pattern =>
  pattern.startsWith('*.') ? `${pattern}*` : pattern,
);

const TYPESCRIPT_FILE_PATTERNS = ['*.ts', '*.tsx'];

const HTML_FILE_PATTERNS = ['*.html'];

const CYPRESS_FILE_PATTERNS = ['*.cy.[jt]s?(x)', 'e2e/**/*.[jt]s?(x)'];

const NODE_FILE_PATTERNS = ['*.ts', '*.js'];

const GRAPHQL_FILE_PATTERN = '*.graphql';

const STORYBOOK_FILE_PATTERNS = withExtensions([fromSuffix('stories')]);

const GENERATED_FILE_PATTERNS = withExtensions([
  fromDirectory('generated'),
  'generated',
]);

module.exports = {
  TEST_FILE_PATTERNS,
  TEST_FILE_PATTERNS_INLINE_TEMPLATES,
  UNIT_TEST_FILE_PATTERNS,
  TYPESCRIPT_FILE_PATTERNS,
  HTML_FILE_PATTERNS,
  CYPRESS_FILE_PATTERNS,
  NODE_FILE_PATTERNS,
  GRAPHQL_FILE_PATTERN,
  STORYBOOK_FILE_PATTERNS,
  GENERATED_FILE_PATTERNS,
  CONFIG_FILE_PATTERNS,
};
