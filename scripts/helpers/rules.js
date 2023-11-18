/** @param {string} ruleId  */
function parseRuleId(ruleId) {
  const i = ruleId.lastIndexOf('/');
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

module.exports = {
  parseRuleId,
  ruleLevelFromEntry,
};
