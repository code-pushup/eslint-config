import type { TSESLint } from '@typescript-eslint/utils';
import type { Linter, Rule } from 'eslint';

export type ConfigName =
  | 'javascript'
  | 'typescript'
  | 'node'
  | 'angular'
  | 'ngrx'
  | 'react'
  | 'graphql'
  | 'jest'
  | 'vitest'
  | 'cypress'
  | 'playwright'
  | 'storybook'
  | 'react-testing-library';

export type ExportedConfig = {
  name: ConfigName;
  flatConfig: TSESLint.FlatConfig.ConfigArray;
};

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

export type PeerDep = {
  pkg: string;
  version: string;
  optional: boolean;
  usedByConfigs: string[];
};

// corresponds to PNG file names in docs/icons
export type Icon =
  | 'icons8/accessibility'
  | 'icons8/expired'
  | 'icons8/global'
  | 'icons8/import'
  | 'icons8/lambda'
  | 'icons8/promise'
  | 'icons8/secure'
  | 'icons8/test'
  | 'icons8/unicorn'
  | 'material/angular_component'
  | 'material/angular'
  | 'material/cypress'
  | 'material/eslint'
  | 'material/graphql'
  | 'material/javascript'
  | 'material/jest'
  | 'material/nodejs'
  | 'material/playwright'
  | 'material/react_ts'
  | 'material/react'
  | 'material/storybook'
  | 'material/typescript'
  | 'material/vitest'
  | 'other/ngrx'
  | 'other/rx-angular'
  | 'other/rxjs'
  | 'other/sonar'
  | 'other/testing-library';
