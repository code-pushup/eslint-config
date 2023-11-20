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
  return items.map(item => `- ${item}\n`).join('');
}

/**
 * @param {string} content
 * @param {'ts' | 'js' | 'json'} [lang='ts']
 */
function mdCodeBlock(content, lang = 'ts') {
  return ['```' + lang, content, '```'].join('\n');
}

/**
 * @param {string | string[]} content
 */
function mdQuote(content) {
  if (Array.isArray(content)) {
    return content.map(block => `> ${block}`).join('\n>\n');
  }
  return `> ${content}`;
}

/**
 * @param {string[]} head
 * @param {string[][]} rows
 * @param {('l' | 'c' | 'r')[] | undefined} align
 */
function mdTable(head, rows, align) {
  /** @param {string[]} cells */
  const toRow = cells => '| ' + cells.join(' | ') + ' |';

  /** @type {Record<(typeof align)[number], string>} */
  const alignments = {
    l: ':--',
    c: ':-:',
    r: '--:',
  };

  return [
    toRow(head),
    toRow(
      Array.from({ length: head.length }).map(
        (_, i) => alignments[align?.[i] ?? 'l'],
      ),
    ),
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

/**
 * @param {string} content
 */
function mdTableCellSanitize(content) {
  return content
    .replace(/\\/g, '\\\\')
    .replace('|', '\\|')
    .replace(/\*/g, '\\*');
}

module.exports = {
  mdLink,
  mdImage,
  mdList,
  mdTable,
  mdCodeBlock,
  mdQuote,
  htmlDetails,
  mdTableCellSanitize,
};
