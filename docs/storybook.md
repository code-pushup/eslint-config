# `@code-pushup/eslint-config/storybook` config

Config for projects using **Storybook** for UI components.

## ⚙️ Setup

Add to `extends` in your .eslintrc file:

```json
{
  "extends": ["@code-pushup/eslint-config/storybook"]
}
```

## 📏 Rules (11)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (7)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [await-interactions](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/await-interactions.md)<br>Interactions should be awaited |  | 🔧, 💡 |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [context-in-play-function](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/context-in-play-function.md)<br>Pass a context when invoking play function of another story |  |  |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [default-exports](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/default-exports.md)<br>Story files should have a default export |  | 🔧, 💡 |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [no-uninstalled-addons](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/no-uninstalled-addons.md)<br>This rule identifies storybook addons that are invalid because they are either not installed or contain a typo in their name. |  |  |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [story-exports](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/story-exports.md)<br>A story file must contain at least one story export |  |  |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [use-storybook-expect](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/use-storybook-expect.md)<br>Use expect from `@storybook/jest` |  | 🔧, 💡 |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [use-storybook-testing-library](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/use-storybook-testing-library.md)<br>Do not use testing-library directly on stories |  | 🔧, 💡 |  |

### ⚠️ Warnings (4)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [csf-component](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/csf-component.md)<br>The component property should be set |  |  |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [hierarchy-separator](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/hierarchy-separator.md)<br>Deprecated hierarchy separator in title property |  | 🔧, 💡 |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [no-redundant-story-name](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/no-redundant-story-name.md)<br>A story should not have a redundant name property |  | 🔧, 💡 |  |
| [![storybook](./icons/material/storybook.png)](https://github.com/storybookjs/eslint-plugin-storybook#readme) | [prefer-pascal-case](https://github.com/storybookjs/eslint-plugin-storybook/blob/main/docs/rules/prefer-pascal-case.md)<br>Stories should use PascalCase |  | 🔧, 💡 |  |