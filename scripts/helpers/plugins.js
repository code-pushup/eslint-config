/** @type {Record<string, string>} */
const pluginIcons = {
  '@typescript-eslint': 'typescript',
};

/** @type {Record<string, string>} */
const pluginDocsUrls = {
  '@typescript-eslint': 'https://typescript-eslint.io/',
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
