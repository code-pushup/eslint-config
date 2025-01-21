/**
 * Missing type definitions for ESLint plugins.
 * Defined to match package exports, may require changes when updating versions.
 */

type Plugin = import('eslint').ESLint.Plugin;
type Config = import('eslint').Linter.Config;
type LegacyConfig = import('eslint').Linter.LegacyConfig;
type Processor = import('eslint').Linter.Processor;

declare module 'eslint-plugin-import' {
  const plugin: Plugin & {
    flatConfigs: {
      recommended: Config;
      errors: Config;
      warnings: Config;
      react: Config;
      'react-native': Config;
      electron: Config;
      typescript: Config;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-promise' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
      'flat/recommended': Config;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-jest-formatting' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
      strict: LegacyConfig;
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-react' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
      strict: LegacyConfig;
      flat: {
        recommended: Config;
        strict: Config;
      };
    };
  };
  export = plugin;
}

declare module 'eslint-plugin-react-hooks' {
  const plugin: Plugin & {
    configs: {
      recommended: LegacyConfig;
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

declare module '@graphql-eslint/eslint-plugin' {
  const plugin: Plugin & {
    flatConfigs: {
      'operations-all': Config;
      'operations-recommended': Config;
      relay: Config;
      'schema-all': Config;
      'schema-recommended': Config;
    };
    processors: {
      graphql: Processor;
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
