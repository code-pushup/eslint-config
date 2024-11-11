// @ts-check

import { ESLint } from 'eslint';
const fs = require('node:fs/promises');
const path = require('node:path');

/**
 * Sets up utilities for loading configuration and rules using ESLint
 * @param {string} configName Name of config exported from package
 * @param {string} defaultFilePath File path when parameter not provided
 * @param {string[]} filesToCreate List of empty files to create
 * @returns Helper functions
 */
export function createLintUtils(
  configName,
  defaultFilePath = '*.ts',
  filesToCreate = [],
) {
  const cwd = path.join(process.cwd(), 'tmp', configName);

  const eslint = new ESLint({ cwd });

  const setup = async () => {
    await fs.rm(cwd, { recursive: true, force: true });
    await fs.mkdir(cwd, { recursive: true });
    await fs.writeFile(
      path.join(cwd, 'eslint.config.js'),
      `import cpeslint from '@code-pushup/eslint-config'

export default [
  ...cpeslint['${configName}'],
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json'
      },
    },
  },
];
`,
    );
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      `{ "include": ["**/*.ts"] }`,
    );
    await Promise.all(
      [
        `__placeholder__.${defaultFilePath.split('.').at(-1)}`,
        ...filesToCreate,
      ].map(async file => {
        const fullPath = path.join(cwd, file);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, '// empty file for linting\n');
      }),
    );
  };

  const teardown = async () => {
    await fs.rm(cwd, { recursive: true, force: true });
  };

  /** @returns {Promise<import('eslint').Linter.Config>} */
  const loadConfig = (filePath = defaultFilePath) =>
    eslint.calculateConfigForFile(filePath);

  const loadRules = async (filePath = defaultFilePath) => {
    const config = await loadConfig(filePath);
    const ruleIds = Object.keys(config.rules ?? {});
    return loadRulesByIds(ruleIds, filePath);
  };

  /** @param {string[]} ruleIds */
  const loadRulesByIds = async (ruleIds, filePath = defaultFilePath) => {
    const results = await eslint.lintFiles(filePath);
    return eslint.getRulesMetaForResults([
      {
        filePath: results[0]?.filePath ?? filePath,
        // @ts-expect-error incomplete message (hack to load rule metadata)
        messages: ruleIds.map(ruleId => ({ ruleId })),
        suppressedMessages: [],
      },
    ]);
  };

  /** @param {string | string[]} patterns */
  const lint = (patterns = defaultFilePath) => eslint.lintFiles(patterns);

  /**
   * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} configs
   * @returns {string[]}
   */
  const getExplicitRuleIds = configs =>
    configs
      .filter(config => config.name?.startsWith(`code-pushup/${configName}`))
      .flatMap(config =>
        Object.keys(config.rules ?? {}).filter(
          id => config.rules?.[id] !== 'off',
        ),
      );

  return {
    setup,
    teardown,
    loadConfig,
    loadRules,
    loadRulesByIds,
    lint,
    getExplicitRuleIds,
  };
}
