// @ts-check

import { ESLint } from 'eslint';
import fs from 'node:fs/promises';
import path from 'node:path';

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
  const camelCaseConfig = kebabToCamelCase(configName);

  const cwd = path.join(process.cwd(), 'tmp', configName);
  const eslint = new ESLint({ cwd });

  const setup = async () => {
    await fs.rm(cwd, { recursive: true, force: true });
    await fs.mkdir(cwd, { recursive: true });
    await fs.writeFile(
      path.join(cwd, 'eslint.config.js'),
      `import ${camelCaseConfig} from '@code-pushup/eslint-config/${configName}.js'

export default [
  ...${camelCaseConfig},
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
    const ruleIds = getEnabledRuleIds(config);
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
      .flatMap(getEnabledRuleIds);

  /**
   * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} config
   * @returns {string[]}
   */
  const getEnabledRuleIds = config =>
    Object.keys(config.rules ?? {}).filter(id => {
      const entry = config.rules?.[id];
      const level = Array.isArray(entry) ? entry[0] : entry;
      return level !== 0 && level !== 'off';
    });

  /** @param {import('eslint').Rule.RuleMetaData} meta */
  const requiresTypeChecking = meta => {
    /** @type {Record<string, unknown> | undefined} */
    const docs = meta.docs;
    return docs?.['requiresTypeChecking'] === true;
  };

  return {
    setup,
    teardown,
    loadConfig,
    loadRules,
    loadRulesByIds,
    lint,
    getExplicitRuleIds,
    getEnabledRuleIds,
    requiresTypeChecking,
  };
}

/**
 * Transforms kebab-case into camelCase
 * @param {string} text
 * @returns {string}
 */
export function kebabToCamelCase(text) {
  return text
    .split('-')
    .map((word, index) =>
      index > 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase(),
    )
    .join('');
}
