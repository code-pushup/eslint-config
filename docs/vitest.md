# `@code-pushup/eslint-config/legacy/vitest` config

Config for projects using **Vitest** for testing.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-{jest-formatting,vitest}
   ```

3. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/vitest"],
     // customize rules if needed:
     "rules": {
       // e.g. to customize file naming convention (default pattern is ".*\\.spec\\.[tj]sx?$"):
       "vitest/consistent-test-filename": [
         "warn",
         { "pattern": ".*\\.(unit|integration|e2e)\\.test\\.ts$" }
       ],
       // e.g. to customize `test` or `it` usage (default is `it` in `describe` and `test` at top-level):
       "vitest/consistent-test-it": ["warn", { "fn": "test", "withinDescribe": "test" }]
     }
   }
   ```

## 📏 Rules (41)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (8)

|                                              Plugin                                              | Rule                                                      | Options | Autofix | Overrides |
| :----------------------------------------------------------------------------------------------: | :-------------------------------------------------------- | :------ | :-----: | :-------: |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | expect-expect<br />                                       |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | no-commented-out-tests<br />                              |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | no-identical-title<br />                                  |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | no-import-node-test<br />                                 |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | require-local-test-context-for-concurrent-snapshots<br /> |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | valid-describe-callback<br />                             |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | valid-expect<br />                                        |         |         |           |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | valid-title<br />                                         |         |         |           |

### ⚠️ Warnings (33)

|                                                        Plugin                                                         | Rule                                    | Options                                                                                                                                                      | Autofix | Overrides |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :-------: |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-after-all-blocks<br />   |                                                                                                                                                              |         |           |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-after-each-blocks<br />  |                                                                                                                                                              |         |           |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-before-all-blocks<br />  |                                                                                                                                                              |         |           |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-before-each-blocks<br /> |                                                                                                                                                              |         |           |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-describe-blocks<br />    |                                                                                                                                                              |         |           |
| [![jest-formatting](./icons/icons8/test.png)](https://github.com/dangreenisrael/eslint-plugin-jest-formatting#readme) | padding-around-test-blocks<br />        |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | consistent-test-filename<br />          | <details><summary>pattern: .\*\\.spec\\.[tj]sx?$</summary><pre lang="json"><code>{&#13;  "pattern": ".\*\\\\.spec\\\\.[tj]sx?$"&#13;}</code></pre></details> |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | consistent-test-it<br />                |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | max-nested-describe<br />               | <details><summary>max: 2</summary><pre lang="json"><code>{&#13;  "max": 2&#13;}</code></pre></details>                                                       |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-alias-methods<br />                  |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-conditional-expect<br />             |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-conditional-tests<br />              |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-disabled-tests<br />                 |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-done-callback<br />                  |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-duplicate-hooks<br />                |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-focused-tests<br />                  |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-mocks-import<br />                   |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-standalone-expect<br />              |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | no-test-return-statement<br />          |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-comparison-matcher<br />         |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-each<br />                       |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-equality-matcher<br />           |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-expect-resolves<br />            |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-hooks-on-top<br />               |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-mock-promise-shorthand<br />     |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-spy-on<br />                     |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-to-be<br />                      |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-to-contain<br />                 |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-to-have-length<br />             |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | prefer-todo<br />                       |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | require-hook<br />                      |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | require-to-throw-message<br />          |                                                                                                                                                              |         |           |
|           [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme)            | require-top-level-describe<br />        |                                                                                                                                                              |         |           |
