# `@code-pushup/eslint-config/legacy/ngrx` config

Config for **Angular** projects using **NgRx** library.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D @ngrx/eslint-plugin angular-eslint eslint-plugin-rxjs
   ```

3. Refer to [step 3 in TypeScript config's setup docs](./typescript.md#🏗️-setup) for how to set up tsconfig properly.
4. Add to `extends` in your .eslintrc file:

   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/legacy/ngrx"],
     // It is recommended that selectors in Angular use a common custom prefix
     // - see https://angular.io/guide/styleguide#style-02-07
     // To enforce this consistently, add the following rules:
     "rules": {
       "@angular-eslint/component-selector": [
         "warn",
         {
           "type": "element",
           "style": "kebab-case",
           "prefix": ["cp"] // <-- replace with your own prefix
         }
       ],
       "@angular-eslint/directive-selector": [
         "warn",
         {
           "type": "attribute",
           "style": "camelCase",
           "prefix": "cp" // <-- replace with your own prefix
         }
       ],
       "@angular-eslint/pipe-prefix": [
         "warn",
         {
           "prefixes": ["cp"] // <-- replace with your own prefix
         }
       ]
     }
   }
   ```

## 📏 Rules (450)

**420** rules are included from [`angular`](./angular.md#📏-rules-420). For brevity, only the **30** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (6)

|                                         Plugin                                          | Rule                                     | Options | Autofix | Overrides |
| :-------------------------------------------------------------------------------------: | :--------------------------------------- | :------ | :-----: | :-------: |
|         [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)         | avoid-cyclic-effects<br />               |         |         |           |
|         [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)         | avoid-duplicate-actions-in-reducer<br /> |         |         |           |
|         [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)         | no-effects-in-providers<br />            |         |         |           |
| [![rxjs](./icons/other/rxjs.png)](https://github.com/cartant/eslint-plugin-rxjs#readme) | no-unsafe-catch<br />                    |         |         |           |
| [![rxjs](./icons/other/rxjs.png)](https://github.com/cartant/eslint-plugin-rxjs#readme) | no-unsafe-first<br />                    |         |         |           |
| [![rxjs](./icons/other/rxjs.png)](https://github.com/cartant/eslint-plugin-rxjs#readme) | no-unsafe-switchmap<br />                |         |         |           |

### ⚠️ Warnings (24)

|                                 Plugin                                  | Rule                                                    | Options                                                                                  | Autofix | Overrides |
| :---------------------------------------------------------------------: | :------------------------------------------------------ | :--------------------------------------------------------------------------------------- | :-----: | :-------: |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | avoid-combining-component-store-selectors<br />         |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | avoid-combining-selectors<br />                         |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | avoid-dispatching-multiple-actions-sequentially<br />   |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | avoid-mapping-component-store-selectors<br />           |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | avoid-mapping-selectors<br />                           |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | good-action-hygiene<br />                               |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | no-dispatch-in-effects<br />                            |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | no-multiple-global-stores<br />                         |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | no-reducer-in-key-names<br />                           |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | no-store-subscription<br />                             |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | no-typed-global-store<br />                             |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | on-function-explicit-return-type<br />                  |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-action-creator<br />                             |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-action-creator-in-dispatch<br />                 |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-action-creator-in-of-type<br />                  |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-concat-latest-from<br />                         |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-inline-action-props<br />                        |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-one-generic-in-create-for-feature-selector<br /> |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefer-selector-in-select<br />                         |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | prefix-selectors-with-select<br />                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | select-style<br />                                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | updater-explicit-return-type<br />                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | use-consistent-global-store-name<br />                  | <details><summary>store$</summary><pre lang="json"><code>"store$"</code></pre></details> |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | use-effects-lifecycle-interface<br />                   |                                                                                          |         |           |
