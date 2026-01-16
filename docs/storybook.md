# `storybook` config

Config for projects using **Storybook** for UI components.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-storybook
   ```

3. Add to your `eslint.config.js` file:

   ```js
   import storybook from '@code-pushup/eslint-config/storybook.js';
   import tseslint from 'typescript-eslint';
   
   export default tseslint.config(...storybook);
   ```

## 📏 Rules (12)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (8)

|                                                    Plugin                                                     | Rule                                                                                                                                                                                                                                                                      | Options | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ | :-----: | :-------: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [await-interactions](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/await-interactions.md)<br />Interactions should be awaited                                                                                                      |         | 🔧, 💡  |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [context-in-play-function](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/context-in-play-function.md)<br />Pass a context when invoking play function of another story                                                             |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [default-exports](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/default-exports.md)<br />Story files should have a default export                                                                                                  |         | 🔧, 💡  |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [no-renderer-packages](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-renderer-packages.md)<br />Do not import renderer packages directly in stories                                                                             |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [no-uninstalled-addons](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-uninstalled-addons.md)<br />This rule identifies storybook addons that are invalid because they are either not installed or contain a typo in their name. |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [story-exports](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/story-exports.md)<br />A story file must contain at least one story export                                                                                           |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [use-storybook-expect](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/use-storybook-expect.md)<br />Use expect from `@storybook/test`, `storybook/test` or `@storybook/jest`                                                        |         |   🔧    |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [use-storybook-testing-library](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/use-storybook-testing-library.md)<br />Do not use testing-library directly on stories                                                                |         | 🔧, 💡  |           |

### ⚠️ Warnings (4)

|                                                    Plugin                                                     | Rule                                                                                                                                                                                              | Options | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ | :-----: | :-------: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [csf-component](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/csf-component.md)<br />The component property should be set                                  |         |         |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [hierarchy-separator](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/hierarchy-separator.md)<br />Deprecated hierarchy separator in title property          |         | 🔧, 💡  |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [no-redundant-story-name](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/no-redundant-story-name.md)<br />A story should not have a redundant name property |         | 🔧, 💡  |           |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [prefer-pascal-case](https://github.com/storybookjs/storybook/blob/next/code/lib/eslint-plugin/docs/rules/prefer-pascal-case.md)<br />Stories should use PascalCase                               |         | 🔧, 💡  |           |
