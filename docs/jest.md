# `@code-pushup/eslint-config/legacy/jest` config

Config for projects using **Jest** for testing.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-jest
   ```

3. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/jest"],
     // customize rules if needed:
     "rules": {
       // e.g. to customize `test` or `it` usage (default is `it` in `describe` and `test` at top-level):
       "jest/consistent-test-it": ["warn", { "fn": "test", "withinDescribe": "test" }]
     }
   }
   ```

## 📏 Rules (43)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (16)

|                                              Plugin                                               | Rule                                | Options | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------: | :---------------------------------- | :------ | :-----: | :-------: |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-alias-methods<br />              |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-conditional-expect<br />         |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-deprecated-functions<br />       |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-done-callback<br />              |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-export<br />                     |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-focused-tests<br />              |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-identical-title<br />            |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-interpolation-in-snapshots<br /> |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-jasmine-globals<br />            |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-mocks-import<br />               |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-standalone-expect<br />          |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-test-prefixes<br />              |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | valid-describe-callback<br />       |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | valid-expect<br />                  |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | valid-expect-in-promise<br />       |         |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | valid-title<br />                   |         |         |           |

### ⚠️ Warnings (27)

|                                              Plugin                                               | Rule                                    | Options                                                                                                | Autofix | Overrides |
| :-----------------------------------------------------------------------------------------------: | :-------------------------------------- | :----------------------------------------------------------------------------------------------------- | :-----: | :-------: |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | consistent-test-it<br />                |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | expect-expect<br />                     |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | max-nested-describe<br />               | <details><summary>max: 2</summary><pre lang="json"><code>{&#13;  "max": 2&#13;}</code></pre></details> |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-commented-out-tests<br />            |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-disabled-tests<br />                 |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-duplicate-hooks<br />                |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | no-test-return-statement<br />          |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-after-all-blocks<br />   |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-after-each-blocks<br />  |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-before-all-blocks<br />  |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-before-each-blocks<br /> |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-describe-blocks<br />    |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | padding-around-test-blocks<br />        |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-comparison-matcher<br />         |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-each<br />                       |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-equality-matcher<br />           |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-expect-resolves<br />            |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-hooks-on-top<br />               |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-mock-promise-shorthand<br />     |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-spy-on<br />                     |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-to-be<br />                      |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-to-contain<br />                 |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-to-have-length<br />             |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | prefer-todo<br />                       |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | require-hook<br />                      |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | require-to-throw-message<br />          |                                                                                                        |         |           |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | require-top-level-describe<br />        |                                                                                                        |         |           |
