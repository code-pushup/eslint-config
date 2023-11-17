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

module.exports = {
  parseRuleId,
};
