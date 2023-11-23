const configDescriptions = {
  index: 'Default config, suitable for any **JavaScript/TypeScript** project.',
  typescript: 'Config for strict **TypeScript** projects.',
  node: 'Config for **Node.js** projects.',
  angular: 'Config for **Angular** projects.',
  'angular-ngrx': 'Config for **Angular** projects using **NgRx** library.',
  graphql: 'Config for **GraphQL servers** implemented in Node.js.',
  jest: 'Config for projects using **Jest** for testing.',
  vitest: 'Config for projects using **Vitest** for testing.',
  cypress: 'Config for projects using **Cypress** for testing.',
  storybook: 'Config for projects using **Storybook** for UI components.',
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

/**
 * Get config string as used with `extends` in .eslintrc file.
 * @param {string} name Config file name without extension
 */
function configAlias(name) {
  if (name === 'index') {
    return '@code-pushup';
  }
  return `@code-pushup/eslint-config/${name}`;
}

/**
 * Get config file name (without extension) from `extends` alias.
 * @param {string} alias Config file name without extension
 */
function configFromAlias(alias) {
  if (alias === '@code-pushup') {
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
  const config = require(`../../${name}.js`);

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
};
