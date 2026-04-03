// @ts-check

/** @param {string} ruleId  */
export function parseRuleId(ruleId) {
  const i = ruleId.startsWith('@')
    ? ruleId.lastIndexOf('/')
    : ruleId.indexOf('/');
  if (i < 0) {
    return {
      name: ruleId,
    };
  }
  return {
    name: ruleId.slice(i + 1),
    plugin: ruleId.slice(0, i),
  };
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.RuleEntry} entry
 * @returns {import('@typescript-eslint/utils').TSESLint.FlatConfig.SeverityString}
 */
export function ruleLevelFromEntry(entry) {
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

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules} rules
 */
export function getEnabledRuleIds(rules) {
  return Object.entries(rules)
    .filter(([, entry]) => entry != null && ruleLevelFromEntry(entry) !== 'off')
    .map(([ruleId]) => ruleId);
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} config
 * @param {string} ruleId
 */
export function findRuleEntry(config, ruleId) {
  return config
    .map(({ rules }) => rules?.[ruleId])
    .find(entry => entry != null);
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} config
 * @param {string[]} ruleIds
 * @param {import('eslint').ESLint} eslint
 * @param {string} dummyFile
 * @returns {Record<string, import('eslint').Rule.RuleMetaData>}
 */
export function getRulesMetadata(config, ruleIds, eslint, dummyFile) {
  const plugins = Object.fromEntries(
    config.flatMap(cfg => Object.entries(cfg.plugins ?? {})),
  );
  return Object.fromEntries(
    ruleIds
      .map(
        /** @returns {[string, import('eslint').Rule.RuleMetaData] | null} */
        id => {
          const rule = parseRuleId(id);
          if (!rule.plugin) {
            const rules = eslint.getRulesMetaForResults([
              {
                filePath: dummyFile,
                // @ts-expect-error hack
                messages: [{ ruleId: id }],
                suppressedMessages: [],
              },
            ]);
            const meta = rules[id];
            if (!meta) {
              return null;
            }
            return [id, meta];
          }
          const plugin = plugins[rule.plugin];
          const ruleDef = plugin?.rules?.[rule.name];
          if (typeof ruleDef === 'object') {
            /** @type {import('@typescript-eslint/utils').TSESLint.RuleMetaDataWithDocs<string>} */
            // @ts-expect-error assuming valid metadata
            const meta = ruleDef.meta;
            return [id, meta];
          }
          return null;
        },
      )
      .filter(rule => rule != null),
  );
}
