const {
  configDescription,
  configAlias,
  configIcon,
  configFromAlias,
} = require('./configs');
const { pluginIcon, pluginDocs } = require('./plugins');
const { parseRuleId } = require('./rules');
const {
  mdLink,
  mdImage,
  mdTable,
  mdCodeBlock,
  htmlDetails,
  mdList,
  mdQuote,
  mdTableCellSanitize,
} = require('./markdown');
const { TEST_FILE_PATTERNS } = require('../../lib/patterns');

const testGlobsLink = '../README.md#🧪-test-overrides';

/**
 * Format Markdown documentation for README
 * @param {string[]} configs Config names
 */
function configsToMarkdown(configs) {
  const blocks = [
    '## ⚙️ Configs',
    'Configurations are available for different tech stacks.',
    mdTable(
      ['Stack', 'Config', 'Description'],
      configs.map(config => {
        const icon = configIcon(config);
        return [
          mdImage(
            `https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/${icon}.png`,
            icon.replace(/^\w+\//, ''),
          ),
          mdLink(
            `https://github.com/code-pushup/eslint-config/blob/main/docs/${config}.md`,
            configAlias(config),
          ),
          configDescription(config),
        ];
      }),
      ['c', 'l', 'l'],
    ),
    '### 🧪 Test overrides',
    'For non-production code, some rules are disabled (or downgraded from errors to warnings).',
    'This applies to file paths matching any of the following globs:',
    mdList(TEST_FILE_PATTERNS.map(pattern => '`' + pattern + '`')),
  ];

  return blocks.join('\n\n');
}

/**
 * Format Markdown documentation for given config.
 * @param {string} config Config name
 * @param {import('./types').RuleData[]} rules List of rules included in config
 * @param {import('./types').ExtendedConfig[]} extended List of extended Code PushUp
 * @param {{hideOverrides?: boolean}} options Extra options
 */
function configRulesToMarkdown(config, rules, extended, options = {}) {
  const alias = configAlias(config);

  const errors = rules.filter(rule => rule.level === 'error');
  const warnings = rules.filter(rule => rule.level === 'warn');

  const extendedRulesCount = extended.reduce(
    (acc, { rulesCount }) => acc + rulesCount,
    0,
  );
  const totalRulesCount = extendedRulesCount + rules.length;

  const blocks = [
    `# \`${alias}\` config`,
    configDescription(config),
    '## ⚙️ Setup',
    'Add to `extends` in your .eslintrc file:',
    mdCodeBlock(`{\n  "extends": ["${alias}"]\n}`, 'json'),
    `## 📏 Rules (${totalRulesCount})`,
    ...(extended.length
      ? [
          `**${extendedRulesCount}** rules are included from ${
            extended.length > 1
              ? `${extended.length} other configs`
              : extended[0].alias === '@code-pushup'
                ? 'the default config'
                : '`' + extended[0].alias + '`'
          }. For brevity, only the **${
            rules.length
          }** additional rules are listed in this document.`,
          "Refer to the extended config's docs:",
          mdList(
            extended.map(({ alias, rulesCount }) =>
              mdLink(
                `./${configFromAlias(alias)}.md#📏-rules-${rulesCount}`,
                `\`${alias}\` rules`,
              ),
            ),
          ),
        ]
      : []),
    mdQuote(
      [
        '🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).',
        '💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).',
        ...(options.hideOverrides
          ? []
          : [
              `🧪🚫 Disabled for [test files](${testGlobsLink}).`,
              `🧪⚠️ Severity lessened to warning for [test files](${testGlobsLink}).`,
            ]),
      ].join('<br>'),
    ),
    ...(errors.length
      ? [
          `### 🚨 Errors (${errors.length})`,
          rulesTable(errors, options.hideOverrides),
        ]
      : []),
    ...(warnings.length
      ? [
          `### ⚠️ Warnings (${warnings.length})`,
          rulesTable(warnings, options.hideOverrides),
        ]
      : []),
  ];

  return blocks.join('\n\n');
}

/**
 * @param {import('./types').RuleData[]} rules
 * @param {boolean | undefined} hideOverrides
 */
function rulesTable(rules, hideOverrides) {
  return mdTable(
    [
      'Plugin',
      'Rule',
      'Options',
      'Autofix',
      ...(hideOverrides ? [] : ['Overrides']),
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
            ? mdLink(
                pluginDocs(plugin),
                mdImage(
                  `./icons/${pluginIcon(plugin)}.png`,
                  plugin || 'ESLint core',
                ),
              )
            : '',

          mdLink(rule.meta.docs?.url, name) +
            '<br>' +
            (rule.meta.docs.description ?? ''),

          options
            ? htmlDetails(
                '<pre>' +
                  mdTableCellSanitize(JSON.stringify(options, null, 2)).replace(
                    /\n/g,
                    '<br>',
                  ) +
                  '</pre>',
                truncate(mdTableCellSanitize(optionsPreview(options)), 30),
              )
            : '',

          [rule.meta.fixable ? '🔧' : '', rule.meta.hasSuggestions ? '💡' : '']
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
    ['c', 'l', 'l', 'c', 'c'],
  );
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

module.exports = {
  configsToMarkdown,
  configRulesToMarkdown,
};
