const { ESLint } = require('eslint');
const fs = require('node:fs/promises');
const path = require('node:path');
const { execSync } = require('node:child_process');
const { configRulesToMarkdown } = require('./helpers/markdown');

const configs = {
  index: 'Default configuration for JavaScript code.',
  typescript: 'Configuration for TypeScript code.',
};

const docsDir = path.join(__dirname, '..', 'docs');

async function generateDocs() {
  execSync('npm link');
  execSync('npm link @code-pushup/eslint-config');

  try {
    await fs.mkdir(docsDir, { recursive: true });

    for (const [name, description] of Object.entries(configs)) {
      await generateConfigDocs(name, description);
    }
  } finally {
    execSync('npm unlink @code-pushup/eslint-config');
  }
}

/**
 * Generate Markdown file for specified ESLint config.
 * @param {string} name Config file name without extension
 * @param {string} description Config description text
 */
async function generateConfigDocs(name, description) {
  const eslint = new ESLint({
    baseConfig: { extends: `./${name}.js` },
    useEslintrc: false,
  });

  /** @type {import('eslint').Linter.Config} */
  const config = await eslint.calculateConfigForFile('*.ts');
  const ruleIds = Object.entries(config.rules)
    .filter(([, entry]) => ruleLevelFromEntry(entry) !== 'off')
    .map(([ruleId]) => ruleId);
  const rules = eslint.getRulesMetaForResults([
    {
      messages: ruleIds.map(ruleId => ({ ruleId })),
      suppressedMessages: [],
    },
  ]);

  const markdown = configRulesToMarkdown(
    name,
    description,
    ruleIds.map(id => {
      const entry = config.rules[id];
      return {
        id,
        meta: rules[id],
        level: ruleLevelFromEntry(entry),
        ...(Array.isArray(entry) && {
          options: entry.slice(1),
        }),
      };
    })
  );

  const filePath = path.join(docsDir, `${name}.md`);
  await fs.writeFile(filePath, markdown);

  console.info(`Generated Markdown docs in ${filePath}`);
}

/**
 * @param {import('eslint').Linter.RuleLevelAndOptions} entry
 * @returns {import('eslint').Linter.StringSeverity}
 */
function ruleLevelFromEntry(entry) {
  const level = Array.isArray(entry) ? entry[0] : entry;
  switch (level) {
    case 0:
    case 'off':
      return 'off';
    case 1:
    case 'warn':
      return 'warn';
    case 2:
    case 'error':
      return 'error';
  }
}

if (require.main === module) {
  generateDocs().catch(console.error);
}
