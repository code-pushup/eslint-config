# `@code-pushup/eslint-config/legacy/node` config

Config for **Node.js** projects.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-n
   ```

3. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/node"]
   }
   ```

## 📏 Rules (293)

**289** rules are included from [`javascript`](./javascript.md#📏-rules-289). For brevity, only the **4** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (1)

|                                             Plugin                                              | Rule                                        | Options | Autofix | Overrides |
| :---------------------------------------------------------------------------------------------: | :------------------------------------------ | :------ | :-----: | :-------: |
| [![n](./icons/material/nodejs.png)](https://github.com/eslint-community/eslint-plugin-n#readme) | no-unsupported-features/node-builtins<br /> |         |         |           |

### ⚠️ Warnings (3)

|                                             Plugin                                              | Rule                     | Options | Autofix | Overrides |
| :---------------------------------------------------------------------------------------------: | :----------------------- | :------ | :-----: | :-------: |
| [![n](./icons/material/nodejs.png)](https://github.com/eslint-community/eslint-plugin-n#readme) | no-process-exit<br />    |         |         |           |
| [![n](./icons/material/nodejs.png)](https://github.com/eslint-community/eslint-plugin-n#readme) | no-sync<br />            |         |         |           |
| [![n](./icons/material/nodejs.png)](https://github.com/eslint-community/eslint-plugin-n#readme) | prefer-promises/fs<br /> |         |         |           |
