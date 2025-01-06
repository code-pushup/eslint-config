# `ngrx` config

Config for **Angular** projects using **NgRx** library.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D @ngrx/eslint-plugin angular-eslint eslint-plugin-rxjs-x
   ```

3. Add to your `eslint.config.js` file:

   ```js
   import ngrx from '@code-pushup/eslint-config/ngrx.js';
   import tseslint from 'typescript-eslint';
   
   export default tseslint.config(
     ...ngrx,
     {
       // It is recommended that selectors in Angular use a common custom prefix
       // - see https://angular.io/guide/styleguide#style-02-07
       // To enforce this consistently, add the following rules:
       rules: {
         '@angular-eslint/component-selector': [
           'warn',
           {
             type: 'element',
             style: 'kebab-case',
             prefix: ['cp'] // <-- replace with your own prefix
           }
         ],
         '@angular-eslint/directive-selector': [
           'warn',
           {
             type: 'attribute',
             style: 'camelCase',
             prefix: 'cp' // <-- replace with your own prefix
           }
         ],
         '@angular-eslint/pipe-prefix': [
           'warn',
           {
             prefixes: ['cp'] // <-- replace with your own prefix
           }
         ]
       }
     }
   );
   ```

4. Refer to [step 3 in TypeScript config's setup docs](./typescript.md#🏗️-setup) for how to set up tsconfig properly.

## 📏 Rules (455)

**425** rules are included from [`angular` config](./angular.md#📏-rules-425). For brevity, only the **30** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (6)

|                                               Plugin                                               | Rule                                                                                                                                                                                   | Options | Autofix | Overrides |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-----: | :-------: |
|              [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)               | [avoid-cyclic-effects](https://ngrx.io/guide/eslint-plugin/rules/avoid-cyclic-effects)<br />Avoid `Effect` that re-emit filtered actions.                                              |         |         |           |
|              [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)               | [avoid-duplicate-actions-in-reducer](https://ngrx.io/guide/eslint-plugin/rules/avoid-duplicate-actions-in-reducer)<br />A `Reducer` should handle an `Action` once.                    |         |   💡    |           |
|              [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin)               | [no-effects-in-providers](https://ngrx.io/guide/eslint-plugin/rules/no-effects-in-providers)<br />`Effect` should not be listed as a provider if it is added to the `EffectsModule`.   |         |   🔧    |           |
| [![rxjs-x](./icons/other/rxjs.png)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x#readme) | [no-unsafe-catch](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/main/docs/rules/no-unsafe-catch.md)<br />Disallow unsafe `catchError` usage in effects and epics.        |         |         |           |
| [![rxjs-x](./icons/other/rxjs.png)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x#readme) | [no-unsafe-first](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/main/docs/rules/no-unsafe-first.md)<br />Disallow unsafe `first`/`take` usage in effects and epics.      |         |         |           |
| [![rxjs-x](./icons/other/rxjs.png)](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x#readme) | [no-unsafe-switchmap](https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/main/docs/rules/no-unsafe-switchmap.md)<br />Disallow unsafe `switchMap` usage in effects and epics. |         |         |           |

### ⚠️ Warnings (24)

|                                 Plugin                                  | Rule                                                                                                                                                                                                                                   | Options                                                                                  | Autofix | Overrides |
| :---------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :-----: | :-------: |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [avoid-combining-component-store-selectors](https://ngrx.io/guide/eslint-plugin/rules/avoid-combining-component-store-selectors)<br />Prefer combining selectors at the selector level.                                                |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [avoid-combining-selectors](https://ngrx.io/guide/eslint-plugin/rules/avoid-combining-selectors)<br />Prefer combining selectors at the selector level.                                                                                |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [avoid-dispatching-multiple-actions-sequentially](https://ngrx.io/guide/eslint-plugin/rules/avoid-dispatching-multiple-actions-sequentially)<br />It is recommended to only dispatch one `Action` at a time.                           |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [avoid-mapping-component-store-selectors](https://ngrx.io/guide/eslint-plugin/rules/avoid-mapping-component-store-selectors)<br />Avoid mapping logic outside the selector level.                                                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [avoid-mapping-selectors](https://ngrx.io/guide/eslint-plugin/rules/avoid-mapping-selectors)<br />Avoid mapping logic outside the selector level.                                                                                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [good-action-hygiene](https://ngrx.io/guide/eslint-plugin/rules/good-action-hygiene)<br />Ensures the use of good action hygiene.                                                                                                      |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [no-dispatch-in-effects](https://ngrx.io/guide/eslint-plugin/rules/no-dispatch-in-effects)<br />`Effect` should not call `store.dispatch`.                                                                                             |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [no-multiple-global-stores](https://ngrx.io/guide/eslint-plugin/rules/no-multiple-global-stores)<br />There should only be one global store injected.                                                                                  |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [no-reducer-in-key-names](https://ngrx.io/guide/eslint-plugin/rules/no-reducer-in-key-names)<br />Avoid the word "reducer" in the key names.                                                                                           |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [no-store-subscription](https://ngrx.io/guide/eslint-plugin/rules/no-store-subscription)<br />Using the `async` pipe is preferred over `store` subscription.                                                                           |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [no-typed-global-store](https://ngrx.io/guide/eslint-plugin/rules/no-typed-global-store)<br />The global store should not be typed.                                                                                                    |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [on-function-explicit-return-type](https://ngrx.io/guide/eslint-plugin/rules/on-function-explicit-return-type)<br />`On` function should have an explicit return type.                                                                 |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-action-creator](https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator)<br />Using `action creator` is preferred over `Action class`.                                                                                 |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-action-creator-in-dispatch](https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator-in-dispatch)<br />Using `action creator` in `dispatch` is preferred over `object` or old `Action`.                                 |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-action-creator-in-of-type](https://ngrx.io/guide/eslint-plugin/rules/prefer-action-creator-in-of-type)<br />Using `action creator` in `ofType` is preferred over `string`.                                                     |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-concat-latest-from](https://ngrx.io/guide/eslint-plugin/rules/prefer-concat-latest-from)<br />Use `concatLatestFrom` instead of `withLatestFrom` to prevent the selector from firing until the correct `Action` is dispatched. |                                                                                          |   🔧    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-inline-action-props](https://ngrx.io/guide/eslint-plugin/rules/prefer-inline-action-props)<br />Prefer using inline types instead of interfaces, types or classes.                                                             |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-one-generic-in-create-for-feature-selector](https://ngrx.io/guide/eslint-plugin/rules/prefer-one-generic-in-create-for-feature-selector)<br />Prefer using a single generic to define the feature state.                       |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefer-selector-in-select](https://ngrx.io/guide/eslint-plugin/rules/prefer-selector-in-select)<br />Using a selector in the `select` is preferred over `string` or `props drilling`.                                                 |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [prefix-selectors-with-select](https://ngrx.io/guide/eslint-plugin/rules/prefix-selectors-with-select)<br />The selector should start with "select", for example "selectEntity".                                                       |                                                                                          |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [select-style](https://ngrx.io/guide/eslint-plugin/rules/select-style)<br />Selector can be used either with `select` as a pipeable operator or as a method.                                                                           |                                                                                          |   🔧    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [updater-explicit-return-type](https://ngrx.io/guide/eslint-plugin/rules/updater-explicit-return-type)<br />`Updater` should have an explicit return type.                                                                             |                                                                                          |         |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [use-consistent-global-store-name](https://ngrx.io/guide/eslint-plugin/rules/use-consistent-global-store-name)<br />Use a consistent name for the global store.                                                                        | <details><summary>store$</summary><pre lang="json"><code>"store$"</code></pre></details> |   💡    |           |
| [![@ngrx](./icons/other/ngrx.png)](https://ngrx.io/guide/eslint-plugin) | [use-effects-lifecycle-interface](https://ngrx.io/guide/eslint-plugin/rules/use-effects-lifecycle-interface)<br />Ensures classes implement lifecycle interfaces corresponding to the declared lifecycle methods.                      |                                                                                          |   🔧    |           |
