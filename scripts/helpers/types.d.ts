import type { Linter, Rule } from 'eslint';

export type RuleData = {
  id: string;
  meta: Rule.RuleMetaData;
  level: Exclude<Linter.RuleEntry, 'off'>;
  options: unknown[];
  testOverride?: {
    level: Linter.RuleEntry;
  };
};

// corresponds to file names in docs/icons
export type Icon = 'javascript' | 'typescript';
