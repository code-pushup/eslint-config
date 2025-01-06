// @ts-check

import { md } from 'build-md';
import { getEnabledRuleIds } from './rules.js';

const configDescriptions = {
  javascript: md`Default config, suitable for any ${md.bold('JavaScript/TypeScript')} project.`,
  typescript: md`Config for strict ${md.bold('TypeScript')} projects.`,
  node: md`Config for ${md.bold('Node.js')} projects.`,
  angular: md`Config for ${md.bold('Angular')} projects.`,
  ngrx: md`Config for ${md.bold('Angular')} projects using ${md.bold('NgRx')} library.`,
  react: md`Config for ${md.bold('React')} projects.`,
  graphql: md`Config for ${md.bold('GraphQL servers')} implemented in Node.js.`,
  jest: md`Config for projects using ${md.bold('Jest')} for testing.`,
  vitest: md`Config for projects using ${md.bold('Vitest')} for testing.`,
  cypress: md`Config for projects using ${md.bold('Cypress')} for testing.`,
  playwright: md`Config for projects using ${md.bold('Playwright')} for testing.`,
  storybook: md`Config for projects using ${md.bold('Storybook')} for UI components.`,
  'react-testing-library': md`Config for projects using ${md.bold('React Testing Library')} for testing.`,
};

/** @type {(keyof typeof configDescriptions)[]} */
// @ts-expect-error keys won't be any string
export const configNames = Object.keys(configDescriptions);

/** @type {Record<keyof typeof configDescriptions, import('./types').Icon>} */
const configIcons = {
  javascript: 'material/javascript',
  typescript: 'material/typescript',
  node: 'material/nodejs',
  angular: 'material/angular',
  ngrx: 'other/ngrx',
  react: 'material/react',
  graphql: 'material/graphql',
  jest: 'material/jest',
  vitest: 'material/vitest',
  cypress: 'material/cypress',
  playwright: 'material/playwright',
  storybook: 'material/storybook',
  'react-testing-library': 'other/testing-library',
};

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configPatterns = {
  graphql: '*.graphql',
  jest: '*.test.ts',
  vitest: '*.test.ts',
  cypress: '*.cy.ts',
  playwright: '*.spec.ts',
  storybook: '*.stories.ts',
  'react-testing-library': '*.spec.tsx',
};

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configExtraPatterns = {
  angular: '*.html',
  storybook: '.storybook/main.ts',
};

/** @type {(keyof typeof configDescriptions)[]} */
const testConfigs = [
  'jest',
  'vitest',
  'cypress',
  'playwright',
  'react-testing-library',
];

const tsConfigDocsReference = md`Refer to ${md.link('./typescript.md#🏗️-setup', "step 3 in TypeScript config's setup docs")} for how to set up tsconfig properly.`;

/** @type {Partial<Record<keyof typeof configDescriptions, import('build-md').FormattedText>>} */
export const configsExtraSetupDocs = {
  typescript: md`${md.paragraph(
    md`Because this config includes rules which require type information, make sure to configure ${md.code('parserOptions.project')} in your ${md.code('eslint.config.js')} points to your project's tsconfig.
For more information, refer to ${md.link('https://typescript-eslint.io/linting/typed-linting', md`${md.italic('Linting with Type Information')} (typescript-eslint)`)}.${md.list(
      [
        md`Example for library in Nx monorepo:${md.codeBlock(
          'js',
          `import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.js';

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    ignores: ['**/code-pushup.config.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
);`,
        )}`,
      ],
    )}`,
  )}${md.paragraph(
    md`Similarly, you may need to ${md.link('https://www.npmjs.com/package/eslint-plugin-import#typescript', md`configure a tsconfig file for ${md.code('eslint-plugin-import')} rules`)} (e.g. if using path aliases in ${md.code('.ts')} files):${md.list(
      [
        md`Install additional import resolver:${md.codeBlock('sh', 'npm i -D eslint-import-resolver-typescript')}`,
        md`Example ${md.code('eslint.config.js')} for Nx monorepo:${md.codeBlock(
          'js',
          `export default tseslint.config(
  // ...
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: 'tsconfig.base.json'
        }
      }
    }
  }
);`,
        )}`,
      ],
    )}`,
  )}`,

  angular: tsConfigDocsReference,
  ngrx: tsConfigDocsReference,

  node: md`Some rules (e.g. ${md.code('n/no-unsupported-features/node-builtins')}) need to know which Node version is being used. Configuration options include:${md.list(
    [
      md`${md.code('engines')} field in ${md.code('package.json')}: ${md.codeBlock(
        'jsonc',
        `{
  // ...
  "engines": {
    "node": ">=22.12.0"
  }
`,
      )}`,
      md`${md.code('settings.node.version')} in ${md.code('eslint.config.js')}: ${md.codeBlock(
        'js',
        `export default tseslint.config({
  // ...
  {
    settings: {
       node: {
         version: '>=22.12.0'
       }
    }
  }
});
`,
      )}`,
    ],
  )}${md.paragraph(md`For more information, refer to ${md.link('https://github.com/eslint-community/eslint-plugin-n?tab=readme-ov-file#configured-nodejs-version-range', md`${md.code('eslint-plugin-n')} docs`)}.`)}`,

  graphql: md`The GraphQL ESLint plugin needs to know where your GraphQL schema is located. For more information, refer to ${md.link('https://the-guild.dev/graphql/eslint/docs/getting-started#extended-linting-rules-with-graphql-schema', md`${md.italic('Extended Linting Rules with GraphQL Schema')} in GraphQL ESLint docs`)}.${md.list(
    [
      md`If you're using ${md.link('https://the-guild.dev/graphql/config/docs', 'graphql-config')}, then your GraphQL schema will be loaded automatically from your ${md.code('.graphqlrc.yml')} (or equivalent) file. So no extra setup is required in this case.`,
      md`Otherwise, you can use ${md.link('https://the-guild.dev/graphql/eslint/docs/getting-started/parser-options#schema', md.code('parserOptions.schema'))}, e.g.:${md.codeBlock(
        'js',
        `export default tseslint.config(
  // ...
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parserOptions: {
        schema: './schema.graphql'
        // globs are also supported:
        // schema: './src/schema/**/*.graphql.ts'
      }
    }
  }
);`,
      )}`,
    ],
  )}`,
};

const angularExtraEslintrc = `,
  {
    // It is recommended that selectors in Angular use a common custom prefix
    // - see https://angular.io/guide/styleguide#style-02-07
    // To enforce this consistently, add the following rules:
    rules: {
      '@angular-eslint/component-selector': [
        'warn',
        {
          type: 'element',
          style: 'kebab-case',
          prefix: ['cp'] // <-- replace with your own prefix
        }
      ],
      '@angular-eslint/directive-selector': [
        'warn',
        {
          type: 'attribute',
          style: 'camelCase',
          prefix: 'cp' // <-- replace with your own prefix
        }
      ],
      '@angular-eslint/pipe-prefix': [
        'warn',
        {
          prefixes: ['cp'] // <-- replace with your own prefix
        }
      ]
    }
  }`;

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
export const configsExtraEslintrc = {
  angular: angularExtraEslintrc,
  ngrx: angularExtraEslintrc,
  jest: `,
  {
    // customize rules if needed:
    rules: {
      // e.g. to customize \`test\` or \`it\` usage (default is \`it\` in \`describe\` and \`test\` at top-level):
      'jest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }]
    }
  }`,
  vitest: `,
  {
    // customize rules if needed:
    rules: {
      // e.g. to customize file naming convention (default pattern is '.*\\\\.spec\\\\.[tj]sx?$'):
      'vitest/consistent-test-filename': [
        'warn',
        { 'pattern': '.*\\\\.(unit|integration|e2e)\\\\.test\\\\.ts$' }
      ],
      // e.g. to customize \`test\` or \`it\` usage (default is \`it\` in \`describe\` and \`test\` at top-level):
      'vitest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }]
    }
  }`,
};

/**
 * Get description for given config.
 * @param {string} name Config file name without extension
 */
export function configDescription(name) {
  if (!(name in configDescriptions)) {
    throw new Error(`No description found for config ${name}`);
  }
  return configDescriptions[name];
}

/**
 * Get icon name for given config.
 * @param {string} name Config file name without extension
 * @returns {import('./types').Icon}
 */
export function configIcon(name) {
  if (!(name in configIcons)) {
    throw new Error(`No icon found for config ${name}`);
  }
  return configIcons[name];
}

/**
 * Get file pattern for given config.
 * @param {string} name Config file name without extension
 */
export function configPattern(name) {
  if (!(name in configPatterns)) {
    return '*.ts';
  }
  return configPatterns[name];
}

/**
 * Get additional file pattern for given config.
 * @param {string} name Config file name without extension
 * @returns {string | undefined}
 */
export function configExtraPattern(name) {
  return configExtraPatterns[name];
}

/**
 * Is config targetting some testing framework?
 * @param {string} name Config file name without extension
 */
export function isConfigForTests(name) {
  // @ts-expect-error the point is to check if string is a union
  return testConfigs.includes(name);
}

/**
 * Imports flat config array by name.
 * @param {string} name Config file name without extension
 * @returns {Promise<import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray>}
 */
export async function importConfig(name) {
  const m = await import(`../../src/configs/${name}.js`);
  return m.default;
}

/**
 * Get all extended code-pushup configs from flat config.
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} flatConfig Flat config array
 */
export function extractCodePushUpConfigs(flatConfig) {
  return [
    ...new Set(
      flatConfig
        .map(cfg => cfg.name)
        .filter(name => name?.startsWith('code-pushup/'))
        .map(name => name?.split('/')[1])
        .filter(name => name != null),
    ),
  ];
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} flatConfig
 */
export function getAllEnabledRuleIds(flatConfig) {
  return [
    ...new Set(
      flatConfig.map(({ rules = {} }) => rules).flatMap(getEnabledRuleIds),
    ),
  ];
}
