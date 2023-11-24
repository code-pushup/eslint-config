const { ESLint } = require('eslint');

/**
 * Sets up utilities for loading configuration and rules using ESLint
 * @param {import('eslint').Linter.Config} config ESLint config
 * @param {string} defaultFilePath File path when parameter not provided
 * @returns Helper functions
 */
function setupLintUtils(config, defaultFilePath = '*.ts') {
  const eslint = new ESLint({
    baseConfig: config,
    useEslintrc: false,
  });

  /** @returns {Promise<import('eslint').Linter.Config>} */
  const loadConfig = (filePath = defaultFilePath) =>
    eslint.calculateConfigForFile(filePath);

  /** @param {string[]} ruleIds */
  const getRulesByIds = ruleIds =>
    eslint.getRulesMetaForResults([
      {
        messages: ruleIds.map(ruleId => ({ ruleId })),
        suppressedMessages: [],
      },
    ]);

  const loadRules = async (filePath = defaultFilePath) => {
    const config = await loadConfig(filePath);
    return getRulesByIds(Object.keys(config.rules));
  };

  /** @param {string | string[]} patterns */
  const lint = (patterns = defaultFilePath) => eslint.lintFiles(patterns);

  /**
   * @param {import('eslint').ESLint.ConfigData} config
   * @returns {string[]}
   */
  const getExplicitRuleIds = config => [
    ...Object.keys(config.rules ?? {}),
    ...(config.overrides?.flatMap(getExplicitRuleIds) ?? []),
  ];

  return {
    loadConfig,
    loadRules,
    getRulesByIds,
    lint,
    getExplicitRuleIds,
  };
}

module.exports = {
  setupLintUtils,
};
