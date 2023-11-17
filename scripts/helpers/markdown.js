const { pluginIcon, pluginDocs } = require('./plugins');
const { parseRuleId } = require('./rules');

/**
 * Format Markdown documentation for given config.
 * @param {string} name Config name
 * @param {string} description Config description
 * @param {import('./types').RuleData[]} rules List of rules included in config
 */
function configRulesToMarkdown(name, description, rules) {
  const extendName =
    name === 'index' ? '@code-pushup' : `@code-pushup/eslint-config/${name}`;

  const errors = rules.filter(rule => rule.level === 'error');
  const warnings = rules.filter(rule => rule.level === 'warn');

  const blocks = [
    `# ${extendName} config`,
    description,
    '## 🔧 Usage',
    'Add to `extends` in .eslintrc file:',
    mdCodeBlock(`{\n  "extends": ["${extendName}"]\n}`, 'json'),
    `## 📏 Rules (${rules.length})`,
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
    ['Plugin', 'Rule', 'Description', 'Options'],
    rules
      .sort((a, b) => {
        const { name: name1, plugin: plugin1 = '' } = parseRuleId(a.id);
        const { name: name2, plugin: plugin2 = '' } = parseRuleId(b.id);
        return plugin1.localeCompare(plugin2) || name1.localeCompare(name2);
      })
      .map(rule => {
        const { name, plugin } = parseRuleId(rule.id);
        const icon = pluginIcon(plugin);
        const pluginDocsUrl = pluginDocs(plugin);

        const options =
          rule.options.length > 1
            ? rule.options
            : rule.options.length === 1
            ? rule.options[0]
            : undefined;

        return [
          mdLink(
            pluginDocsUrl,
            mdImage(`./icons/${icon}.png`, plugin || 'ESLint core')
          ),

          mdLink(rule.meta.docs?.url, name),

          rule.meta.docs.description ?? '',

          options
            ? htmlDetails(
                '<pre>' +
                  JSON.stringify(options, null, 2).replace(/\n/g, '<br>') +
                  '</pre>',
                truncate(optionsPreview(options), 30)
              )
            : '-',
        ];
      })
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
  const colWidths = head.map((th, i) =>
    Math.max(th.length, ...rows.map(row => row[i].length))
  );

  /** @param {string[]} cells */
  const toRow = (cells, char = ' ') => {
    const paddedCells = cells.map((td, i) => td.padEnd(colWidths[i], char));
    return '| ' + paddedCells.join(' | ') + ' |';
  };

  return [
    toRow(head),
    toRow(Array(head.length).fill(':--'), '-'),
    ...rows.map(cells => toRow(cells)),
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
  configRulesToMarkdown,
};
