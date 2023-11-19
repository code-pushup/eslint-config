/** @type {Record<string, import('./types').Icon>} */
const pluginIcons = {
  '@typescript-eslint': 'typescript',
  deprecation: 'expired',
  functional: 'lambda',
  import: 'import',
  'no-secrets': 'secure',
  promise: 'promise',
  sonarjs: 'sonar',
  unicorn: 'unicorn',
};

/** @type {Record<string, string>} */
const pluginDocsUrls = {
  '@typescript-eslint': 'https://typescript-eslint.io/',
  deprecation: 'https://github.com/gund/eslint-plugin-deprecation#readme',
  functional:
    'https://github.com/eslint-functional/eslint-plugin-functional#readme',
  import: 'https://github.com/import-js/eslint-plugin-import#readme',
  'no-secrets': 'https://github.com/nickdeis/eslint-plugin-no-secrets#readme',
  promise: 'https://github.com/eslint-community/eslint-plugin-promise#readme',
  sonarjs: 'https://github.com/SonarSource/eslint-plugin-sonarjs#readme',
  unicorn: 'https://github.com/sindresorhus/eslint-plugin-unicorn#readme',
};

/**
 * @param {string} plugin
 */
function pluginIcon(plugin) {
  if (!(plugin in pluginIcons)) {
    throw new Error(`No icon found for plugin ${plugin}`);
  }
  return pluginIcons[plugin];
}

/**
 * @param {string} plugin
 */
function pluginDocs(plugin) {
  if (!(plugin in pluginIcons)) {
    throw new Error(`No docs URL found for plugin ${plugin}`);
  }
  return pluginDocsUrls[plugin];
}

module.exports = {
  pluginIcon,
  pluginDocs,
};
