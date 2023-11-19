import type { Linter, Rule } from 'eslint';

export type RuleData = {
  id: string;
  meta: Rule.RuleMetaData;
  level: Exclude<Linter.RuleEntry, 'off'>;
  options?: unknown[];
  testOverride?: {
    level: Linter.RuleEntry;
  };
};

export type ExtendedConfig = {
  alias: string;
  rulesCount: number;
};

// corresponds to PNG file names in docs/icons
export type Icon =
  | 'expired'
  | 'import'
  | 'javascript'
  | 'lambda'
  | 'promise'
  | 'secure'
  | 'sonar'
  | 'typescript'
  | 'unicorn';
