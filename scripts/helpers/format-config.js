// @ts-check

import { MarkdownDocument, md } from 'build-md';
import {
  configDescription,
  configsExtraEslintrc,
  configsExtraSetupDocs,
} from './configs.js';
import { abbreviatePackageList, sortPeerDeps } from './packages.js';
import { pluginDocs, pluginIcon } from './plugins.js';
import { parseRuleId } from './rules.js';

const testGlobsLink = '../README.md#🧪-test-overrides';
const setupLink = '../README.md#🏗️-setup';

/**
 * Format Markdown documentation for given config.
 * @param {string} config Config name
 * @param {import('./types.js').RuleData[]} rules List of rules included in config
 * @param {import('./types.js').ExtendedConfig[]} extended List of extended Code PushUp configs
 * @param {import('./types.js').PeerDep[]} peerDeps Peer dependencies
 * @param {{hideOverrides?: boolean}} options Extra options
 */
// eslint-disable-next-line @typescript-eslint/max-params
export function configRulesToMarkdown(
  config,
  rules,
  extended,
  peerDeps,
  options = {},
) {
  return new MarkdownDocument()
    .heading(1, md`${md.code(config)} config`)
    .paragraph(configDescription(config))
    .$concat(
      setupDocs(config, peerDeps),
      rulesDocs(config, rules, extended, options),
    )
    .toString();
}

/**
 * Generate docs on how to setup given config
 * @param {string} config Config name
 * @param {import('./types.js').PeerDep[]} peerDeps Peer dependencies
 */
function setupDocs(config, peerDeps) {
  const extraSetupDocs = configsExtraSetupDocs[config];

  const dependencies = sortPeerDeps(peerDeps)
    .filter(
      ({ usedByConfigs, optional }) =>
        usedByConfigs.includes(config) && optional,
    )
    .map(({ pkg }) => pkg);

  return new MarkdownDocument().heading(2, '🏗️ Setup').$if(
    config === 'javascript',
    doc =>
      doc.paragraph(
        md`Refer to ${md.link(setupLink, 'setup instructions in README')}.`,
      ),
    doc =>
      doc.list('ordered', [
        md`If you haven't already, make sure to ${md.link(
          setupLink,
          md`install ${md.code('@code-pushup/eslint-config')} and its required peer dependencies`,
        )}.`,
        ...(dependencies.length > 0
          ? [
              md`Since this plugin requires additional peer dependencies, you have to install them as well:${md.codeBlock(
                'sh',
                `npm install -D ${abbreviatePackageList(dependencies)}`,
              )}`,
            ]
          : []),
        md`Add to your ${md.code('eslint.config.js')} file:${md.codeBlock(
          'js',
          [
            `import ${config} from '@code-pushup/eslint-config/${config}.js';`,
            "import tseslint from 'typescript-eslint';",
            '',
            ...(configsExtraEslintrc[config]
              ? [
                  'export default tseslint.config(',
                  `  ...${config}${configsExtraEslintrc[config]}`,
                  ');',
                ]
              : [`export default tseslint.config(...${config});`]),
          ].join('\n'),
        )}`,
        ...(extraSetupDocs ? [extraSetupDocs] : []),
      ]),
  );
}

/**
 * Generate docs on rules included in given config
 * @param {string} config Config name
 * @param {import('./types.js').RuleData[]} rules List of rules included in config
 * @param {import('./types.js').ExtendedConfig[]} extended List of extended Code PushUp configs
 * @param {{hideOverrides?: boolean}} options Extra options
 */
function rulesDocs(config, rules, extended, options) {
  const errors = rules.filter(rule => rule.level === 'error');
  const warnings = rules.filter(rule => rule.level === 'warn');

  const extendedRulesCount = extended.reduce(
    (acc, { rulesCount }) => acc + rulesCount,
    0,
  );
  const totalRulesCount = extendedRulesCount + rules.length;

  return new MarkdownDocument()
    .heading(2, `📏 Rules (${totalRulesCount})`)
    .paragraph(
      extended.length > 0 &&
        md`${md.bold(extendedRulesCount.toString())} rules are included from ${extended
          .map(({ alias, rulesCount }, _, { length }) =>
            md.link(
              `./${alias}.md#📏-rules-${rulesCount}`,
              md`${md.code(
                alias,
                // eslint-disable-next-line sonarjs/no-nested-template-literals
              )} config${length > 1 ? ` (${rulesCount})` : ''}`.toString(),
            ),
          )
          .join(
            ' and ',
          )}. For brevity, only the ${md.bold(rules.length.toString())} additional rules are listed in this document.`,
    )
    .quote(
      // eslint-disable-next-line sonarjs/no-nested-template-literals
      md`🔧 Automatically fixable by the ${md.link('https://eslint.org/docs/user-guide/command-line-interface#--fix', md`${md.code('--fix')} CLI option`)}.<br>💡 Manually fixable by ${md.link('https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions', 'editor suggestions')}.${options.hideOverrides ? '' : md`<br>🧪🚫 Disabled for ${md.link(testGlobsLink, 'test files')}.<br>🧪⚠️ Severity lessened to warning for ${md.link(testGlobsLink, 'test files')}.`}`,
    )
    .$if(errors.length > 0, doc =>
      doc
        .heading(3, `🚨 Errors (${errors.length})`)
        .table(...rulesTable(errors)),
    )
    .$if(warnings.length > 0, doc =>
      doc
        .heading(3, `⚠️ Warnings (${warnings.length})`)
        .table(...rulesTable(warnings)),
    );
}

/**
 * @param {import('./types.js').RuleData[]} rules
 * @param {boolean} hideOverrides
 * @returns {Parameters<import('build-md').MarkdownDocument['table']>}
 */
function rulesTable(rules, hideOverrides = false) {
  /** @type {import('build-md').TableColumn[]} */
  const columns = [
    { heading: 'Plugin', alignment: 'center' },
    { heading: 'Rule', alignment: 'left' },
    { heading: 'Options', alignment: 'left' },
    { heading: 'Autofix', alignment: 'center' },
    { heading: 'Overrides', alignment: 'center' },
  ];
  return [
    hideOverrides ? columns.slice(0, -1) : columns,
    rules
      .sort((a, b) => {
        const { name: name1, plugin: plugin1 = '' } = parseRuleId(a.id);
        const { name: name2, plugin: plugin2 = '' } = parseRuleId(b.id);
        return plugin1.localeCompare(plugin2) || name1.localeCompare(name2);
      })
      .map(rule => [
        formatRulePlugin(rule),
        formatRuleName(rule),
        formatRuleOptions(rule),
        formatRuleAutofix(rule),
        formatRuleOverrides(rule),
      ]),
  ];
}

/**
 * Format table cell for rule's "Plugin" column
 * @param {import('../helpers/types.js').RuleData} rule Rule
 * @returns {import('build-md').BlockText}
 */
function formatRulePlugin(rule) {
  const { plugin } = parseRuleId(rule.id);
  if (!plugin) {
    return '';
  }
  return md.link(
    pluginDocs(plugin),
    md.image(`./icons/${pluginIcon(plugin)}.png`, plugin || 'ESLint core'),
  );
}

/**
 * Format table cell for rule's "Name" column
 * @param {import('../helpers/types.js').RuleData} rule Rule
 * @returns {import('build-md').BlockText}
 */
function formatRuleName(rule) {
  const { name } = parseRuleId(rule.id);
  return md`${rule.meta?.docs?.url ? md.link(rule.meta.docs.url, name) : name}\n${rule.meta?.docs?.description ?? ''}`;
}

/**
 * Format table cell for rule's "Options" column
 * @param {import('../helpers/types.js').RuleData} rule Rule
 * @returns {import('build-md').BlockText}
 */
function formatRuleOptions(rule) {
  const options =
    rule.options && rule.options.length > 1
      ? rule.options
      : rule.options?.length === 1
        ? rule.options[0]
        : undefined;
  if (!options) {
    return '';
  }
  return md.details(
    truncate(sanitizeRuleOptions(optionsPreview(options)), 30),
    md.codeBlock('json', sanitizeRuleOptions(JSON.stringify(options, null, 2))),
  );
}

/**
 * Format table cell for rule's "Autofix" column
 * @param {import('../helpers/types.js').RuleData} rule Rule
 * @returns {import('build-md').BlockText}
 */
function formatRuleAutofix(rule) {
  return (
    [rule.meta?.fixable ? '🔧' : '', rule.meta?.hasSuggestions ? '💡' : '']
      .filter(Boolean)
      .join(', ') || ''
  );
}

/**
 * Format table cell for rule's "Overrides" column
 * @param {import('../helpers/types.js').RuleData} rule Rule
 * @returns {import('build-md').BlockText}
 */
function formatRuleOverrides(rule) {
  if (!rule.testOverride) {
    return '';
  }
  return rule.testOverride.level === 'off' ? '🧪🚫' : '🧪⚠️';
}

/**
 * @param {unknown} options
 */
function optionsPreview(options) {
  if (Array.isArray(options)) {
    return options.map(optionsPreview).join(', ');
  }
  if (
    typeof options === 'string' ||
    typeof options === 'number' ||
    typeof options === 'boolean'
  ) {
    return options.toString();
  }
  if (typeof options === 'object' && options != null) {
    return Object.entries(options)
      .map(([key, value]) => {
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          return `${key}: ${value}`;
        }
        if (
          Array.isArray(value) &&
          value.every(val => typeof val === 'string' || typeof val === 'number')
        ) {
          return `${key}: ${value.join(', ')}`;
        }
        return `${key}: ${JSON.stringify(value)}`;
      })
      .join(', ');
  }
  return JSON.stringify(options);
}

/**
 * @param {string} text
 * @param {number} max
 */
function truncate(text, max) {
  if (text.length > max) {
    return `${text.slice(0, max - 3)}...`;
  }
  return text;
}

/**
 * @param {string} content
 */
function sanitizeRuleOptions(content) {
  return content.replace(/\\/g, '\\\\').replace(/\*/g, String.raw`\*`);
}
