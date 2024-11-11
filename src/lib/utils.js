// @ts-check

/**
 * Checks if package is available
 * @param {string} name name of the package
 * @returns {boolean}
 */
export function packageExists(name) {
  try {
    require.resolve(name);
    return true;
  } catch {
    return false;
  }
}

/**
 * Changes all errors to warnings in rule config
 * @param {import('eslint').Linter.RulesRecord} rules rules config (e.g. recommended)
 * @returns {import('eslint').Linter.RulesRecord}
 */
export function convertErrorsToWarnings(rules) {
  return Object.entries(rules).reduce(
    (acc, [ruleId, entry]) => ({
      ...acc,
      [ruleId]: entry === 'error' || entry === 2 ? 'warn' : entry,
    }),
    {},
  );
}
