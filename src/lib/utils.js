// @ts-check

/**
 * Changes all errors to warnings in rule config
 * @param {import('eslint').Linter.RulesRecord} rules rules config (e.g. recommended)
 * @returns {import('eslint').Linter.RulesRecord}
 */
export function convertErrorsToWarnings(rules) {
  return Object.fromEntries(Object.entries(rules).map(
    ( [ruleId, entry]) => [ruleId, entry === 'error' || entry === 2 ? 'warn' : entry],
  ));
}
