const { md } = require('build-md');

const configDescriptions = {
  index: md`Default config, suitable for any ${md.bold('JavaScript/TypeScript')} project.`,
  typescript: md`Config for strict ${md.bold('TypeScript')} projects.`,
  node: md`Config for ${md.bold('Node.js')} projects.`,
  angular: md`Config for ${md.bold('Angular')} projects.`,
  'angular-ngrx': md`Config for ${md.bold('Angular')} projects using ${md.bold('NgRx')} library.`,
  graphql: md`Config for ${md.bold('GraphQL servers')} implemented in Node.js.`,
  jest: md`Config for projects using ${md.bold('Jest')} for testing.`,
  vitest: md`Config for projects using ${md.bold('Vitest')} for testing.`,
  cypress: md`Config for projects using ${md.bold('Cypress')} for testing.`,
  storybook: md`Config for projects using ${md.bold('Storybook')} for UI components.`,
};

const configs = Object.keys(configDescriptions);

/** @type {Record<keyof typeof configDescriptions, import('./types').Icon>} */
const configIcons = {
  index: 'material/javascript',
  typescript: 'material/typescript',
  node: 'material/nodejs',
  angular: 'material/angular',
  'angular-ngrx': 'other/ngrx',
  graphql: 'material/graphql',
  jest: 'material/jest',
  vitest: 'material/vitest',
  cypress: 'material/cypress',
  storybook: 'material/storybook',
};

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configPatterns = {
  graphql: '*.graphql',
  jest: '*.test.ts',
  vitest: '*.test.ts',
  cypress: '*.cy.ts',
  storybook: '*.stories.ts',
};

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configExtraPatterns = {
  angular: '*.html',
  storybook: '.storybook/main.ts',
};

/** @type {(keyof typeof configDescriptions)[]} */
const testConfigs = ['jest', 'vitest', 'cypress'];

const tsConfigDocsReference = md`Refer to ${md.link('./typescript.md#🏗️-setup', "step 3 in TypeScript config's setup docs")} for how to set up tsconfig properly.`;

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configsExtraSetupDocs = {
  typescript: md`${md.paragraph(
    md`Because this config includes rules which require type information, make sure to configure ${md.code('parserOptions.project')} in your .eslintrc points to your project's tsconfig.
For more information, refer to ${md.link('https://typescript-eslint.io/linting/typed-linting', md`${md.italic('Linting with Type Information')} (typescript-eslint)`)}, or ${md.link('https://nx.dev/recipes/tips-n-tricks/eslint', md`${md.italic('Configuring ESLint with Typescript')} (Nx)`)} if using Nx monorepo.${md.list(
      [
        md`Example for library in Nx monorepo:${md.codeBlock(
          'json',
          `{
  "extends": ["../../.eslintrc.json"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": "*.ts",
      "parserOptions": {
        "project": ["libs/shared-utils/tsconfig.*?.json"]
      }
    }
  ]
}`,
        )}`,
      ],
    )}`,
  )}${md.paragraph(
    md`Similarly, you may need to ${md.link('https://www.npmjs.com/package/eslint-plugin-import#typescript', md`configure a tsconfig file for ${md.code('eslint-plugin-import')} rules`)} (e.g. if using path aliases in ${md.code('.ts')} files):${md.list(
      [
        md`Install additional import resolver:${md.codeBlock('sh', 'npm i -D eslint-import-resolver-typescript')}`,
        md`Example ${md.code('.eslintrc.json')} for Nx monorepo:${md.codeBlock(
          'jsonc',
          `{
  // ...
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "tsconfig.base.json"
        // or if using RxJS:
        // "project": ["tsconfig.base.json", "node_modules/rxjs/tsconfig.json"]
      }
    }
  }
}`,
        )}`,
      ],
    )}`,
  )}`,

  angular: tsConfigDocsReference,
  'angular-ngrx': tsConfigDocsReference,

  graphql: md`The GraphQL ESLint plugin needs to know where your GraphQL schema is located. For more information, refer to ${md.link('https://the-guild.dev/graphql/eslint/docs/getting-started#extended-linting-rules-with-graphql-schema', md`${md.italic('Extended Linting Rules with GraphQL Schema')} in GraphQL ESLint docs`)}.${md.list(
    [
      md`If you're using ${md.link('https://the-guild.dev/graphql/config/docs', 'graphql-config')}, then your GraphQL schema will be loaded automatically from your ${md.code('.graphqlrc.yml')} (or equivalent) file. So no extra setup is required in this case.`,
      md`Otherwise, you can use ${md.link('https://the-guild.dev/graphql/eslint/docs/getting-started/parser-options#schema', md.code('parserOptions.schema'))}, e.g.:${md.codeBlock(
        'jsonc',
        `{
  // ...
  "parserOptions": {
    "schema": "./schema.graphql"
    // globs are also supported:
    // "schema": "./src/schema/**/*.graphql.ts"
  }
}`,
      )}`,
    ],
  )}`,
};

const angularExtraEslintrc = `,
  // It is recommended that selectors in Angular use a common custom prefix
  // - see https://angular.io/guide/styleguide#style-02-07
  // To enforce this consistently, add the following rules:
  "rules": {
    "@angular-eslint/component-selector": [
      "warn",
      {
        "type": "element",
        "style": "kebab-case",
        "prefix": ["cp"] // <-- replace with your own prefix
      }
    ],
    "@angular-eslint/directive-selector": [
      "warn",
      {
        "type": "attribute",
        "style": "camelCase",
        "prefix": "cp" // <-- replace with your own prefix
      }
    ],
    "@angular-eslint/pipe-prefix": [
      "warn",
      {
        "prefixes": ["cp"] // <-- replace with your own prefix
      }
    ]
  }`;

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configsExtraEslintrc = {
  angular: angularExtraEslintrc,
  'angular-ngrx': angularExtraEslintrc,
  jest: `,
  // customize rules if needed:
  "rules": {
    // e.g. to customize \`test\` or \`it\` usage (default is \`it\` in \`describe\` and \`test\` at top-level):
    "jest/consistent-test-it": ["warn", { "fn": "test", "withinDescribe": "test" }]
  }`,
  vitest: `,
  // customize rules if needed:
  "rules": {
    // e.g. to customize file naming convention (default pattern is ".*\\\\.spec\\\\.[tj]sx?$"):
    "vitest/consistent-test-filename": [
      "warn",
      { "pattern": ".*\\\\.(unit|integration|e2e)\\\\.test\\\\.ts$" }
    ],
    // e.g. to customize \`test\` or \`it\` usage (default is \`it\` in \`describe\` and \`test\` at top-level):
    "vitest/consistent-test-it": ["warn", { "fn": "test", "withinDescribe": "test" }]
  }`,
};

/**
 * Get config string as used with `extends` in .eslintrc file.
 * @param {string} name Config file name without extension
 */
function configAlias(name) {
  if (name === 'index') {
    return '@code-pushup/eslint-config/legacy';
  }
  return `@code-pushup/eslint-config/legacy/${name}`;
}

/**
 * Get config file name (without extension) from `extends` alias.
 * @param {string} alias Config file name without extension
 */
function configFromAlias(alias) {
  if (alias === '@code-pushup/eslint-config/legacy') {
    return 'index';
  }
  return alias.slice(alias.lastIndexOf('/') + 1);
}

/**
 * Get description for given config.
 * @param {string} name Config file name without extension
 */
function configDescription(name) {
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
function configIcon(name) {
  if (!(name in configIcons)) {
    throw new Error(`No icon found for config ${name}`);
  }
  return configIcons[name];
}

/**
 * Get file pattern for given config.
 * @param {string} name Config file name without extension
 */
function configPattern(name) {
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
function configExtraPattern(name) {
  return configExtraPatterns[name];
}

/**
 * Is config targetting some testing framework?
 * @param {string} name Config file name without extension
 */
function isConfigForTests(name) {
  return testConfigs.includes(name);
}

/**
 * Get all extended configs from config file.
 * @param {string} name Config file name without extension
 */
function getConfigExtends(name) {
  /** @param {import('eslint').Linter.Config['extends']} configExtends */
  const normalizeExtends = configExtends =>
    Array.isArray(configExtends)
      ? configExtends
      : typeof configExtends === 'string'
        ? [configExtends]
        : [];

  /** @type {import('eslint').Linter.Config} */
  const config = require(`@code-pushup/eslint-config/legacy/${name}.js`);

  return [
    ...normalizeExtends(config.extends),
    ...(config.overrides?.flatMap(cfg => normalizeExtends(cfg.extends)) ?? []),
  ];
}

module.exports = {
  configs,
  configDescription,
  configAlias,
  configFromAlias,
  configIcon,
  configPattern,
  configExtraPattern,
  isConfigForTests,
  getConfigExtends,
  configsExtraSetupDocs,
  configsExtraEslintrc,
};
