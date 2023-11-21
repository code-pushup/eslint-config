const configDescriptions = {
  index: 'Default config, suitable for any JavaScript/TypeScript project.',
  typescript: 'Config for strict TypeScript projects.',
  node: 'Config for Node.js projects.',
  jest: 'Config for projects using Jest for testing.',
  vitest: 'Config for projects using Vitest for testing.',
};

const configs = Object.keys(configDescriptions);

/** @type {Record<keyof typeof configDescriptions, import('./types').Icon>} */
const configIcons = {
  index: 'material/javascript',
  typescript: 'material/typescript',
  node: 'material/nodejs',
  jest: 'material/jest',
  vitest: 'material/vitest',
};

/** @type {Partial<Record<keyof typeof configDescriptions, string>>} */
const configPatterns = {
  jest: '*.test.ts',
  vitest: '*.test.ts',
};

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

module.exports = {
  configs,
  configDescription,
  configAlias,
  configFromAlias,
  configIcon,
  configPattern,
};
