// @ts-check

import { MarkdownDocument, md } from 'build-md';
import { TEST_FILE_PATTERNS } from '../../src/lib/patterns.js';
import { configDescription, configIcon } from './configs.js';
import {
  abbreviatePackageList,
  packageDocs,
  packageIcon,
  sortPeerDeps,
} from './packages.js';

/**
 * Format Markdown documentation for README
 * @param {string[]} configs Config names
 * @param {import('./types').PeerDep[]} peerDeps Peer dependencies
 * @param {Record<string, string[]>} extended Map of extended configs
 */
export function configsToMarkdown(configs, peerDeps, extended) {
  return new MarkdownDocument()
    .heading(2, '⚙️ Configs')
    .table(
      [
        { heading: 'Stack', alignment: 'center' },
        { heading: 'Config', alignment: 'left' },
        { heading: 'Description', alignment: 'left' },
      ],
      configs.map(config => [
        iconToImage(configIcon(config)),
        md.link(`./docs/${config}.md`, config),
        configDescription(config),
      ]),
    )
    .paragraph(
      md`Some configs extend other configs, as illustrated below. So, for example, extending ${md.code('angular')} config implicitly extends ${md.code('typescript')} and ${md.code('javascript')} configs as well.`,
    )
    .code(
      'mermaid',
      mermaidDiagram(
        [
          { id: 'javascript', label: 'javascript' },
          ...Object.entries(extended)
            .filter(([, aliases]) => aliases.length > 0)
            .map(([config]) => ({ id: config, label: config })),
        ],
        Object.entries(extended).flatMap(([config, aliases]) =>
          aliases.map(tgt => ({
            from: config,
            to: tgt,
            label: 'extends',
          })),
        ),
        'BT',
      ),
    )
    .heading(3, '🏗️ Setup')
    .paragraph('To use the default config, follow these steps:')
    .list('ordered', [
      md`You must first install all the required peer dependencies (if you haven't already):${md.codeBlock(
        'sh',
        `npm install -D ${abbreviatePackageList(
          sortPeerDeps(peerDeps)
            .filter(({ optional }) => !optional)
            .map(({ pkg }) => pkg),
        )}`,
      )}`,
      md`Install ${md.code('@code-pushup/eslint-config')} with:${md.codeBlock('sh', 'npm install -D @code-pushup/eslint-config')}`,
      md`Include default config in your ${md.link('https://eslint.org/docs/latest/use/configure/configuration-files', 'ESLint configuration file')} (usually ${md.code('eslint.config.js')}):${md.codeBlock(
        'js',
        [
          "import javascript from '@code-pushup/eslint-config/javascript.js';",
          "import tseslint from 'typescript-eslint';",
          '',
          'export default tseslint.config(...javascript);',
        ].join('\n'),
      )}`,
    ])
    .paragraph(
      md`Depending on your tech stack, you may wish to extend other configs as well (${md.link(
        '#⚙️-configs',
        'listed above',
      )}). This will require installing additional peer dependencies. For more details, refer to setup docs for the configs you're interested in using.`,
    )
    .heading(4, '📦 Peer dependencies')
    .paragraph(
      md`All peer dependencies used by ${md.code(
        '@code-pushup/eslint-config',
      )} are listed below, along with their supported versions. Only the default config's dependencies are required, others are optional.`,
    )
    .table(
      [
        { heading: '', alignment: 'center' },
        { heading: 'NPM package', alignment: 'left' },
        { heading: 'Version', alignment: 'center' },
        { heading: 'Required', alignment: 'center' },
      ],
      sortPeerDeps(peerDeps).map(({ pkg, version, optional }) => [
        iconToImage(packageIcon(pkg)),
        md.link(packageDocs(pkg), pkg),
        md.code(version),
        optional ? '' : '✅',
      ]),
    )
    .heading(3, '🧪 Test overrides')
    .paragraph(
      'For non-production code, some rules are disabled (or downgraded from errors to warnings).',
    )
    .paragraph(
      'This applies to file paths matching any of the following globs:',
    )
    .list(TEST_FILE_PATTERNS.map(md.code))
    .toString();
}

/** @param {import('./types').Icon} icon  */
function iconToImage(icon) {
  return md.image(`./docs/icons/${icon}.png`, icon.replace(/^\w+\//, ''));
}

/**
 *
 * @param {{ id: string, label: string }[]} nodes
 * @param {{ from: string, to: string; label?: string }[]} edges
 * @param {'TD' | 'TB' | 'BT' | 'LR' | 'RL'} orientation
 */
function mermaidDiagram(nodes, edges, orientation = 'TD') {
  return [
    `  graph ${orientation};`,
    ...nodes.map(node => `    ${node.id}("${node.label}")`),
    ...edges.map(
      edge =>
        '    ' +
        [edge.from, edge.label ? `--${edge.label}-->` : '-->', edge.to].join(
          ' ',
        ),
    ),
  ].join('\n');
}
