# `cypress` config

Config for projects using **Cypress** for testing.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-cypress
   ```

3. Add to your `eslint.config.js` file:

   ```js
   import cpeslint from '@code-pushup/eslint-config';
   import tseslint from 'typescript-eslint';
   
   export default tseslint.config(...cpeslint.cypress);
   ```

## 📏 Rules (6)

**0** rules are included from . For brevity, only the **6** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (4)

|                                                 Plugin                                                 | Rule                                                                                                                                                                                       | Options | Autofix | Overrides |
| :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-----: | :-------: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-assigning-return-values](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-assigning-return-values.md)<br />disallow assigning return values of `cy` calls |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-async-tests](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-async-tests.md)<br />disallow using `async`/`await` in Cypress test cases                   |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-unnecessary-waiting](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-unnecessary-waiting.md)<br />disallow waiting for arbitrary time periods            |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [unsafe-to-chain-command](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/unsafe-to-chain-command.md)<br />disallow actions within chains                       |         |         |           |

### ⚠️ Warnings (2)

|                                                 Plugin                                                 | Rule                                                                                                                                                      | Options | Autofix | Overrides |
| :----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-----: | :-------: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-force](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-force.md)<br />disallow using `force: true` with action commands |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-pause](https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-pause.md)<br />disallow using `cy.pause()` calls                 |         |         |           |
