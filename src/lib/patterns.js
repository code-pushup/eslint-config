// @ts-check

/** @param {string} suffix */
const fromSuffix = suffix => `**/*.${suffix}`;

/** @param {string} dir */
const fromDirectory = dir => `**/${dir}/**/*`;

/**
 * @param {string[]} patterns
 * @param {{ skipJSX?: boolean }} options
 * @returns {string[]}
 */
export const withExtensions = (patterns, options = {}) =>
  patterns.map(
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    pattern => `${pattern}.?(c|m)[jt]s${options.skipJSX ? '' : `?(x)`}`,
  );

export const CONFIG_FILE_PATTERNS = withExtensions(
  ['**/*.config', '**/.prettierrc', '**/codegen', '**/test-setup'],
  { skipJSX: true },
);

export const UNIT_TEST_FILE_PATTERNS = withExtensions([
  fromSuffix('spec'),
  fromSuffix('test'),
  fromDirectory('__tests__'),
]);

export const TEST_FILE_PATTERNS = [
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

export const MOCKS_FILE_PATTERNS = [fromDirectory('__mocks__')];

// @angular-eslint's inline templates processor transforms .ts files to .html
// https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/src/processors.ts#L164
export const TEST_FILE_PATTERNS_INLINE_TEMPLATES = TEST_FILE_PATTERNS.map(
  pattern => (pattern.startsWith('**/*.') ? `${pattern}*` : pattern),
);

export const TYPESCRIPT_FILE_PATTERNS = ['**/*.ts', '**/*.tsx'];

export const TYPESCRIPT_DECLARATION_FILE_PATTERNS = ['**/*.d.ts'];

export const JSON_FILE_PATTERNS = ['**/*.json', '**/*.jsonc'];

export const JS_TS_JSON_FILE_PATTERNS = [
  ...withExtensions(['**/*']),
  ...JSON_FILE_PATTERNS,
];

export const REACT_FILE_PATTERNS = withExtensions(['**/*']);

export const VUE_FILE_PATTERNS = ['**/*.vue'];

export const HTML_FILE_PATTERNS = ['**/*.html'];

export const CYPRESS_FILE_PATTERNS = [
  '**/*.cy.[jt]s?(x)',
  '**/?(*-)e2e/**/*.[jt]s?(x)',
];

export const PLAYWRIGHT_FILE_PATTERNS = [
  '**/*.+(test|spec).[jt]s?(x)',
  '**/*.po.[jt]s?(x)',
  '**/?(*-)e2e/**/*.[jt]s?(x)',
];

export const NODE_FILE_PATTERNS = ['**/*.ts', '**/*.js'];

export const GRAPHQL_FILE_PATTERNS = ['**/*.graphql'];

export const STORYBOOK_FILE_PATTERNS = withExtensions([fromSuffix('stories')]);

export const ANGULAR_COMPONENT_FILE_PATTERNS = '**/*.component.ts';
export const ANGULAR_PIPE_FILE_PATTERNS = '**/*.pipe.ts';

export const GENERATED_FILE_PATTERNS = withExtensions([
  fromDirectory('generated'),
  '**/generated',
]);

export const COMMONJS_FILE_PATTERNS = ['**/*.cjs', '**/*.cts'];

export const SVELTE_FILE_PATTERNS = ['**/*.svelte'];

/** @param {string[]} patterns  */
export function negatePatterns(patterns) {
  return patterns.map(pattern => `!${pattern}`);
}
