const {
  configDescription,
  configAlias,
  configIcon,
  configFromAlias,
} = require('./configs');
const {
  mdLink,
  mdImage,
  mdTable,
  mdList,
  mdCodeInline,
  mdMermaidDiagram,
} = require('./markdown');
const { TEST_FILE_PATTERNS } = require('../../lib/patterns');
const { packageDocs, packageIcon, sortPeerDeps } = require('./packages');

/**
 * Format Markdown documentation for README
 * @param {string[]} configs Config names
 * @param {import('./types').PeerDep[]} peerDeps Peer depdendencies
 * @param {Record<string, string[]>} extended Map of extended configs
 */
function configsToMarkdown(configs, peerDeps, extended) {
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
    'Some configs extend other configs, so for example adding `"extends": ["@code-pushup/eslint-config/angular"]` implicitly includes `@code-pushup/eslint-config/typescript` and `@code-pushup` as well.',
    mdMermaidDiagram(
      [
        { id: 'index', label: configAlias('index') },
        ...Object.entries(extended)
          .filter(([, aliases]) => aliases.length > 0)
          .map(([config]) => ({ id: config, label: configAlias(config) })),
      ],
      Object.entries(extended).flatMap(([config, aliases]) =>
        aliases.map(tgt => ({
          from: config,
          to: configFromAlias(tgt),
          label: 'extends',
        })),
      ),
      'BT',
    ),
    '### 📦 Peer dependencies',
    mdTable(
      ['', 'NPM package', 'Version', 'Required'],
      sortPeerDeps(peerDeps).map(({ pkg, version, optional }) => [
        iconToImage(packageIcon(pkg)),
        mdLink(packageDocs(pkg), pkg),
        mdCodeInline(version),
        optional ? '' : '✅',
      ]),
      ['c', 'l', 'c', 'c'],
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
