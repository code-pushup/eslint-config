# `@code-pushup/eslint-config/legacy/storybook` config

Config for projects using **Storybook** for UI components.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-storybook
   ```

3. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/storybook"]
   }
   ```

## 📏 Rules (11)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (7)

|                                                    Plugin                                                     | Rule                                | Options | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------------------: | :---------------------------------- | :------ | :-----: | :-------: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | await-interactions<br />            |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | context-in-play-function<br />      |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | default-exports<br />               |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | no-uninstalled-addons<br />         |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | story-exports<br />                 |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | use-storybook-expect<br />          |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | use-storybook-testing-library<br /> |         |         |           |

### ⚠️ Warnings (4)

|                                                    Plugin                                                     | Rule                          | Options | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------------------: | :---------------------------- | :------ | :-----: | :-------: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | csf-component<br />           |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | hierarchy-separator<br />     |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | no-redundant-story-name<br /> |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | prefer-pascal-case<br />      |         |         |           |
