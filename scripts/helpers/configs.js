const configDescriptions = {
  index:
    'Default configuration, suitable for any JavaScript/TypeScript project.',
  typescript: 'Configuration for strict TypeScript projects.',
};

const configs = Object.keys(configDescriptions);

/** @type {Record<keyof typeof configDescriptions, import('./types').Icon>} */
const configIcons = {
  index: 'javascript',
  typescript: 'typescript',
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
 */
function configIcon(name) {
  if (!(name in configIcons)) {
    throw new Error(`No icon found for config ${name}`);
  }
  return configIcons[name];
}

module.exports = {
  configs,
  configDescription,
  configAlias,
  configIcon,
};
