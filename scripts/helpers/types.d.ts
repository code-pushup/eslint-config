export type RuleData = {
  id: string;
  meta: import('eslint').Rule.RuleMetaData;
  level: Exclude<import('eslint').Linter.RuleEntry, 'off'>;
  options: unknown[];
};
