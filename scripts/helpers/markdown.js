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
  mdLink,
  mdImage,
  mdList,
  mdTable,
  mdCodeBlock,
  htmlDetails,
};
