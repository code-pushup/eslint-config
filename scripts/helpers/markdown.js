const { configDescription, configAlias, configIcon } = require('./configs');
const { pluginIcon, pluginDocs } = require('./plugins');
const { parseRuleId } = require('./rules');

/**
 * Format Markdown documentation for README
 * @param {string[]} configs Config names
 */
function configsToMarkdown(configs) {
  const blocks = [
    `## ⚙️ Configs (${configs.length})`,
    'Configurations are available for different tech stacks.',
    mdTable(
      ['Stack', 'Config', 'Description'],
      configs.map(config => {
        const icon = configIcon(config);
        return [
          mdImage(
            `https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/${icon}.png`,
            icon,
          ),
          mdLink(
            `https://github.com/code-pushup/eslint-config/blob/main/docs/${config}.md`,
            configAlias(config),
          ),
          configDescription(config),
        ];
      }),
    ),
  ];

  return blocks.join('\n\n');
}

/**
 * Format Markdown documentation for given config.
 * @param {string} config Config name
 * @param {import('./types').RuleData[]} rules List of rules included in config
 */
function configRulesToMarkdown(config, rules) {
  const alias = configAlias(config);

  const errors = rules.filter(rule => rule.level === 'error');
  const warnings = rules.filter(rule => rule.level === 'warn');

  const blocks = [
    `# \`${alias}\` config`,
    configDescription(config),
    '## ⚙️ Setup',
    'Add to `extends` in your .eslintrc file:',
    mdCodeBlock(`{\n  "extends": ["${alias}"]\n}`, 'json'),
    `## 📏 Rules (${rules.length})`,
    [
      '🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).',
      '💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).',
    ].join('<br>'),
    ...(errors.length
      ? [`### 🚨 Errors (${errors.length})`, rulesTable(errors)]
      : []),
    ...(warnings.length
      ? [`### ⚠️ Warnings (${warnings.length})`, rulesTable(warnings)]
      : []),
  ];

  return blocks.join('\n\n');
}

/** @param {import('./types').RuleData[]} rules  */
function rulesTable(rules) {
  return mdTable(
    ['Plugin', 'Rule', 'Options', 'Autofix'],
    rules
      .sort((a, b) => {
        const { name: name1, plugin: plugin1 = '' } = parseRuleId(a.id);
        const { name: name2, plugin: plugin2 = '' } = parseRuleId(b.id);
        return plugin1.localeCompare(plugin2) || name1.localeCompare(name2);
      })
      .map(rule => {
        const { name, plugin } = parseRuleId(rule.id);

        const options =
          rule.options.length > 1
            ? rule.options
            : rule.options.length === 1
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
            : '-',

          mdLink(rule.meta.docs?.url, name) +
            '<br>' +
            rule.meta.docs.description ?? '',

          options
            ? htmlDetails(
                '<pre>' +
                  JSON.stringify(options, null, 2).replace(/\n/g, '<br>') +
                  '</pre>',
                truncate(optionsPreview(options), 30),
              )
            : '-',

          [rule.meta.fixable ? '🔧' : '', rule.meta.hasSuggestions ? '💡' : '']
            .filter(Boolean)
            .join(' ') || '-',
        ];
      }),
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

/**
 * @param {string} url
 * @param {string} text
 */
function mdLink(url, text) {
  if (!url) {
    return text;
  }
  return `[${text}](${url})`;
}

/**
 * @param {string} url
 * @param {string} alt
 */
function mdImage(url, alt) {
  return `![${alt}](${url})`;
}

/**
 * @param {string[]} items
 */
function mdList(items) {
  return items.map(item => `- ${item}\n`);
}

/**
 * @param {string} content
 * @param {'ts' | 'js' | 'json'} [lang='ts']
 */
function mdCodeBlock(content, lang = 'ts') {
  return ['```' + lang, content, '```'].join('\n');
}

/**
 * @param {string[]} head
 * @param {string[][]} rows
 */
function mdTable(head, rows) {
  /** @param {string[]} cells */
  const toRow = cells => '| ' + cells.join(' | ') + ' |';

  return [
    toRow(head),
    toRow(Array(head.length).fill(':--')),
    ...rows.map(toRow),
  ].join('\n');
}

/**
 * @param {string} content
 * @param {string | undefined} summary
 */
function htmlDetails(content, summary) {
  return [
    '<details>',
    ...(summary ? [`<summary>${summary}</summary>`] : []),
    content,
    '</details>',
  ].join('');
}

module.exports = {
  configsToMarkdown,
  configRulesToMarkdown,
};
