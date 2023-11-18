export type RuleData = {
  id: string;
  meta: import('eslint').Rule.RuleMetaData;
  level: Exclude<import('eslint').Linter.RuleEntry, 'off'>;
  options: unknown[];
};

// corresponds to file names in docs/icons
export type Icon = 'javascript' | 'typescript';
