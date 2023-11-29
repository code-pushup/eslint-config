const { configDescription, configAlias, configIcon } = require('./configs');
const {
  mdLink,
  mdImage,
  mdTable,
  mdList,
  mdCodeInline,
} = require('./markdown');
const { TEST_FILE_PATTERNS } = require('../../lib/patterns');
const { packageDocs, packageIcon, sortPeerDeps } = require('./packages');

/**
 * Format Markdown documentation for README
 * @param {string[]} configs Config names
 * @param {import('./types').PeerDep[]} peerDeps Peer depdendencies
 */
function configsToMarkdown(configs, peerDeps) {
  const blocks = [
    '## ⚙️ Configs',
    'Configurations are available for different tech stacks.',
    mdTable(
      ['Stack', 'Config', 'Description'],
      configs.map(config => [
        iconToImage(configIcon(config)),
        mdLink(
          `https://github.com/code-pushup/eslint-config/blob/main/docs/${config}.md`,
          configAlias(config),
        ),
        configDescription(config),
      ]),
      ['c', 'l', 'l'],
    ),
    '### 📦 Peer dependencies',
    mdTable(
      [
        '',
        'NPM package',
        'Version',
        ...configs.map(configIcon).map(iconToImage),
      ],
      sortPeerDeps(peerDeps).map(({ pkg, version, usedByConfigs }) => [
        iconToImage(packageIcon(pkg)),
        mdLink(packageDocs(pkg), pkg),
        mdCodeInline(version),
        ...configs.map(config =>
          usedByConfigs.includes(config) ? '✅' : '❌',
        ),
      ]),
      ['c', 'l', 'c', ...configs.map(() => 'c')],
    ),
    '### 🧪 Test overrides',
    'For non-production code, some rules are disabled (or downgraded from errors to warnings).',
    'This applies to file paths matching any of the following globs:',
    mdList(TEST_FILE_PATTERNS.map(pattern => '`' + pattern + '`')),
  ];

  return blocks.join('\n\n');
}

/** @param {import('./types').Icon} icon  */
function iconToImage(icon) {
  return mdImage(
    `https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/${icon}.png`,
    icon.replace(/^\w+\//, ''),
  );
}

module.exports = {
  configsToMarkdown,
};
