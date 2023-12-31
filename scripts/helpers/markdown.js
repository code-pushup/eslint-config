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
  return items.map(item => `- ${item.replace(/\n/g, '\n  ')}\n`).join('');
}

/**
 * @param {string[]} items
 */
function mdListOrdered(items) {
  const indentChars = `${items.length}. `.length;
  return items
    .map((item, i) => {
      const prefix = `${i + 1}. `.padStart(indentChars, ' ');
      return (
        prefix + item.replace(/\n/g, '\n' + ' '.repeat(indentChars)) + '\n'
      );
    })
    .join('');
}

/**
 * @param {string} content
 */
function mdCodeInline(content) {
  return '`' + content + '`';
}

/**
 * @param {string} content
 * @param {'ts' | 'js' | 'json' | 'sh'} [lang='ts']
 */
function mdCodeBlock(content, lang = 'sh') {
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

/**
 *
 * @param {{ id: string, label: string }[]} nodes
 * @param {{ from: string, to: string; label?: string }[]} edges
 * @param {'TD' | 'TB' | 'BT' | 'LR' | 'RL'} orientation
 */
function mdMermaidDiagram(nodes, edges, orientation = 'TD') {
  return [
    '```mermaid',
    `  graph ${orientation};`,
    ...nodes.map(node => `    ${node.id}("${node.label}")`),
    ...edges.map(
      edge =>
        '    ' +
        [edge.from, edge.label ? `--${edge.label}-->` : '-->', edge.to].join(
          ' ',
        ),
    ),
    '```',
  ].join('\n');
}

module.exports = {
  mdLink,
  mdImage,
  mdList,
  mdListOrdered,
  mdTable,
  mdCodeInline,
  mdCodeBlock,
  mdQuote,
  htmlDetails,
  mdTableCellSanitize,
  mdMermaidDiagram,
};
