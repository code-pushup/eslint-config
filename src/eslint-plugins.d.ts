/**
 * Missing type definitions for ESLint plugins.
 * Defined to match package exports, may require changes when updating versions.
 */

type Plugin = import('eslint').ESLint.Plugin;
type Config = import('eslint').Linter.Config;
type LegacyConfig = import('eslint').Linter.LegacyConfig;
type Processor = import('eslint').Linter.Processor;

declare module 'eslint-plugin-promise' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
      'flat/recommended': Config;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-jsx-a11y' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
      strict: LegacyConfig;
    };
    flatConfigs: {
      recommended: Config;
      strict: Config;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-cypress/flat' {
  const plugin: Plugin & {
    configs: {
      recommended: Config;
    };
  };
  export = plugin;
}
