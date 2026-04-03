// @ts-check

/** @type {Record<string, import('./types.js').Icon>} */
const pluginIcons = {
  '@angular-eslint': 'material/angular',
  '@angular-eslint/template': 'material/angular_component',
  '@graphql-eslint': 'material/graphql',
  '@ngrx': 'other/ngrx',
  '@rx-angular': 'other/rx-angular',
  '@typescript-eslint': 'material/typescript',
  '@vitest': 'material/vitest',
  cypress: 'material/cypress',
  deprecation: 'icons8/expired',
  functional: 'icons8/lambda',
  import: 'icons8/import',
  jest: 'material/jest',
  'jest-formatting': 'icons8/test',
  'jsx-a11y': 'icons8/accessibility',
  n: 'material/nodejs',
  'no-secrets': 'icons8/secure',
  playwright: 'material/playwright',
  promise: 'icons8/promise',
  react: 'material/react',
  'react-hooks': 'material/react_ts',
  rxjs: 'other/rxjs',
  'rxjs-x': 'other/rxjs',
  sonarjs: 'other/sonar',
  storybook: 'material/storybook',
  'testing-library': 'other/testing-library',
  unicorn: 'icons8/unicorn',
  vitest: 'material/vitest',
};

/** @type {Record<string, string>} */
const pluginDocsUrls = {
  '@angular-eslint':
    'https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin#readme',
  '@angular-eslint/template':
    'https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin-template#readme',
  '@graphql-eslint': 'https://the-guild.dev/graphql/eslint/docs',
  '@ngrx': 'https://ngrx.io/guide/eslint-plugin',
  '@rx-angular': 'https://www.rx-angular.io/docs/eslint-plugin',
  '@typescript-eslint': 'https://typescript-eslint.io/',
  '@vitest': 'https://github.com/veritem/eslint-plugin-vitest#readme',
  cypress: 'https://github.com/cypress-io/eslint-plugin-cypress#readme',
  deprecation: 'https://github.com/gund/eslint-plugin-deprecation#readme',
  functional:
    'https://github.com/eslint-functional/eslint-plugin-functional#readme',
  import: 'https://github.com/import-js/eslint-plugin-import#readme',
  jest: 'https://github.com/jest-community/eslint-plugin-jest#readme',
  'jest-formatting':
    'https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme',
  'jsx-a11y': 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme',
  n: 'https://github.com/eslint-community/eslint-plugin-n#readme',
  'no-secrets': 'https://github.com/nickdeis/eslint-plugin-no-secrets#readme',
  playwright:
    'https://github.com/playwright-community/eslint-plugin-playwright#readme',
  promise: 'https://github.com/eslint-community/eslint-plugin-promise#readme',
  react: 'https://github.com/jsx-eslint/eslint-plugin-react#readme',
  'react-hooks':
    'https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#readme',
  rxjs: 'https://github.com/cartant/eslint-plugin-rxjs#readme',
  'rxjs-x': 'https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x#readme',
  sonarjs: 'https://github.com/SonarSource/eslint-plugin-sonarjs#readme',
  storybook: 'https://github.com/storybookjs/eslint-plugin-storybook#readme',
  'testing-library':
    'https://github.com/testing-library/eslint-plugin-testing-library#readme',
  unicorn: 'https://github.com/sindresorhus/eslint-plugin-unicorn#readme',
  vitest: 'https://github.com/veritem/eslint-plugin-vitest#readme',
};

/**
 * @param {string} plugin
 */
export function pluginIcon(plugin) {
  const icon = pluginIcons[plugin];
  if (!icon) {
    throw new Error(`No icon found for plugin ${plugin}`);
  }
  return icon;
}

/**
 * @param {string} plugin
 */
export function pluginDocs(plugin) {
  const docsUrl = pluginDocsUrls[plugin];
  if (!docsUrl) {
    throw new Error(`No docs URL found for plugin ${plugin}`);
  }
  return docsUrl;
}
