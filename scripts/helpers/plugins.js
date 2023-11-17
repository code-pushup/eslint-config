const coreIcon = 'javascript';

/** @type {Record<string, string>} */
const pluginIcons = {
  '@typescript-eslint': 'typescript',
};

const coreDocsUrl = 'https://eslint.org/';

/** @type {Record<string, string>} */
const pluginDocsUrls = {
  '@typescript-eslint': 'https://typescript-eslint.io/',
};

/**
 * @param {string | undefined} plugin
 */
function pluginIcon(plugin) {
  if (!plugin) {
    return coreIcon;
  }
  if (!(plugin in pluginIcons)) {
    throw new Error(`No icon found for plugin ${plugin}`);
  }
  return pluginIcons[plugin];
}

/**
 * @param {string | undefined} plugin
 */
function pluginDocs(plugin) {
  if (!plugin) {
    return coreDocsUrl;
  }
  if (!(plugin in pluginIcons)) {
    throw new Error(`No docs URL found for plugin ${plugin}`);
  }
  return pluginDocsUrls[plugin];
}

module.exports = {
  pluginIcon,
  pluginDocs,
};
