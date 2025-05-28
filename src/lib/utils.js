// @ts-check

/**
 * Changes all errors to warnings in rule config
 * @param {Partial<import('eslint').Linter.RulesRecord> | undefined} rules rules config (e.g. recommended)
 * @returns {Partial<import('eslint').Linter.RulesRecord>}
 */
export function convertErrorsToWarnings(rules) {
  return Object.fromEntries(
    Object.entries(rules ?? {}).map(([ruleId, entry]) => [
      ruleId,
      entry === 'error' || entry === 2 ? 'warn' : entry,
    ]),
  );
}

/**
 * Checks if the rule supports a specific option by checking rule schema
 * @param {object | object[]} ruleSchema rules schema that holds options
 * @param {string} option rule option to check if supported
 * @returns {boolean}
 */
export function isOptionSupported(ruleSchema, option) {
  return (Array.isArray(ruleSchema) ? ruleSchema : [ruleSchema]).some(
    schema => 'properties' in schema && option in schema.properties,
  );
}
