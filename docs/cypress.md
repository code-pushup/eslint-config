# `@code-pushup/eslint-config/legacy/cypress` config

Config for projects using **Cypress** for testing.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-cypress
   ```

3. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/cypress"]
   }
   ```

## 📏 Rules (6)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (4)

|                                                 Plugin                                                 | Rule                             | Options | Autofix | Overrides |
| :----------------------------------------------------------------------------------------------------: | :------------------------------- | :------ | :-----: | :-------: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-assigning-return-values<br /> |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-async-tests<br />             |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-unnecessary-waiting<br />     |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | unsafe-to-chain-command<br />    |         |         |           |

### ⚠️ Warnings (2)

|                                                 Plugin                                                 | Rule           | Options | Autofix | Overrides |
| :----------------------------------------------------------------------------------------------------: | :------------- | :------ | :-----: | :-------: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-force<br /> |         |         |           |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-pause<br /> |         |         |           |
