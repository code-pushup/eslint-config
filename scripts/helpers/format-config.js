import { MarkdownDocument, md } from 'build-md';
import {
  configAlias,
  configDescription,
  configFromAlias,
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
 * @param {import('./types').RuleData[]} rules List of rules included in config
 * @param {import('./types').ExtendedConfig[]} extended List of extended Code PushUp configs
 * @param {import('./types').PeerDep[]} peerDeps Peer dependencies
 * @param {{hideOverrides?: boolean}} options Extra options
 */
export function configRulesToMarkdown(
  config,
  rules,
  extended,
  peerDeps,
  options = {},
) {
  const alias = configAlias(config);

  const errors = rules.filter(rule => rule.level === 'error');
  const warnings = rules.filter(rule => rule.level === 'warn');

  const extendedRulesCount = extended.reduce(
    (acc, { rulesCount }) => acc + rulesCount,
    0,
  );
  const totalRulesCount = extendedRulesCount + rules.length;

  const extraSetupDocs = configsExtraSetupDocs[config];

  return new MarkdownDocument()
    .heading(1, md`${md.code(alias)} config`)
    .paragraph(configDescription(config))
    .heading(2, '🏗️ Setup')
    .$if(
      config === 'index',
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
          md`Since this plugin requires additional peer dependencies, you have to install them as well:${md.codeBlock(
            'sh',
            `npm install -D ${abbreviatePackageList(
              sortPeerDeps(peerDeps)
                .filter(
                  ({ usedByConfigs, optional }) =>
                    usedByConfigs.includes(config) && optional,
                )
                .map(({ pkg }) => pkg),
            )}`,
          )}`,
          ...(extraSetupDocs ? [extraSetupDocs] : []),
          md`Add to ${md.code('extends')} in your .eslintrc file:${md.codeBlock(
            'jsonc',
            `{\n  "extends": ["${alias}"]${
              configsExtraEslintrc[config] ?? ''
            }\n}`,
          )}`,
        ]),
    )
    .heading(2, `📏 Rules (${totalRulesCount})`)
    .paragraph(
      extended.length &&
        md`${md.bold(extendedRulesCount.toString())} rules are included from ${extended.map(
          ({ alias, rulesCount }, index, { length }) =>
            md`${md.link(
              `./${configFromAlias(alias)}.md#📏-rules-${rulesCount}`,
              md`${
                alias === '@code-pushup' ? 'the default config' : md.code(alias)
              }${length > 1 ? ` (${rulesCount})` : ''}`,
            )}${index < length - 1 ? ' and ' : ''}`,
        )}. For brevity, only the ${md.bold(rules.length.toString())} additional rules are listed in this document.`,
    )
    .quote(
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
    )
    .toString();
}

/**
 * @param {import('./types').RuleData[]} rules
 * @param {boolean | undefined} hideOverrides
 */
function rulesTable(rules, hideOverrides) {
  return [
    [
      { heading: 'Plugin', alignment: 'center' },
      { heading: 'Rule', alignment: 'left' },
      { heading: 'Options', alignment: 'left' },
      { heading: 'Autofix', alignment: 'center' },
      ...(hideOverrides ? [] : [{ heading: 'Overrides', alignment: 'center' }]),
    ],
    rules
      .sort((a, b) => {
        const { name: name1, plugin: plugin1 = '' } = parseRuleId(a.id);
        const { name: name2, plugin: plugin2 = '' } = parseRuleId(b.id);
        return plugin1.localeCompare(plugin2) || name1.localeCompare(name2);
      })
      .map(rule => {
        const { name, plugin } = parseRuleId(rule.id);

        const options =
          rule.options?.length > 1
            ? rule.options
            : rule.options?.length === 1
              ? rule.options[0]
              : undefined;

        return [
          plugin
            ? md.link(
                pluginDocs(plugin),
                md.image(
                  `./icons/${pluginIcon(plugin)}.png`,
                  plugin || 'ESLint core',
                ),
              )
            : '',

          md`${rule.meta?.docs?.url ? md.link(rule.meta.docs.url, name) : name}\n${rule.meta?.docs?.description ?? ''}`,

          options
            ? md.details(
                truncate(sanitizeRuleOptions(optionsPreview(options)), 30),
                md.codeBlock(
                  'json',
                  sanitizeRuleOptions(JSON.stringify(options, null, 2)),
                ),
              )
            : '',

          [
            rule.meta?.fixable ? '🔧' : '',
            rule.meta?.hasSuggestions ? '💡' : '',
          ]
            .filter(Boolean)
            .join(', ') || '',

          ...(hideOverrides
            ? []
            : [
                rule.testOverride
                  ? rule.testOverride.level === 'off'
                    ? '🧪🚫'
                    : '🧪⚠️'
                  : '',
              ]),
        ];
      }),
  ];
}

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
  if (typeof options === 'object' && options !== null) {
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
    return text.slice(0, max - 3) + '...';
  }
  return text;
}

/**
 * @param {string} content
 */
function sanitizeRuleOptions(content) {
  return content.replace(/\\/g, '\\\\').replace(/\*/g, '\\*');
}
