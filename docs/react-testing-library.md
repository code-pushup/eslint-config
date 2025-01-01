# `react-testing-library` config

Config for projects using **React Testing Library** for testing.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:

   ```sh
   npm install -D eslint-plugin-testing-library
   ```

3. Add to your `eslint.config.js` file:

   ```js
   import react-testing-library from '@code-pushup/eslint-config/react-testing-library.js';
   import tseslint from 'typescript-eslint';
   
   export default tseslint.config(...react-testing-library);
   ```

## 📏 Rules (25)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (9)

|                               Plugin                               | Rule                                                                                                                                                                                                                      | Options                                                                                                                                  | Autofix | Overrides |
| :----------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :-------: |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [await-async-events](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/await-async-events.md)<br />Enforce promises from async event methods are handled                              | <details><summary>eventModule: userEvent</summary><pre lang="json"><code>{&#13;  "eventModule": "userEvent"&#13;}</code></pre></details> |   🔧    |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [await-async-queries](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/await-async-queries.md)<br />Enforce promises from async queries to be handled                                |                                                                                                                                          |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [await-async-utils](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/await-async-utils.md)<br />Enforce promises from async utils to be awaited properly                             |                                                                                                                                          |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-dom-import](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-dom-import.md)<br />Disallow importing from DOM Testing Library                                                  | <details><summary>react</summary><pre lang="json"><code>"react"</code></pre></details>                                                   |   🔧    |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-global-regexp-flag-in-query](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-global-regexp-flag-in-query.md)<br />Disallow the use of the global RegExp flag (/g) in queries |                                                                                                                                          |   🔧    |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-promise-in-fire-event](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-promise-in-fire-event.md)<br />Disallow the use of promises passed to a `fireEvent` method            |                                                                                                                                          |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-unnecessary-act](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-unnecessary-act.md)<br />Disallow wrapping Testing Library utils or empty callbacks in `act`                |                                                                                                                                          |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-wait-for-side-effects](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-wait-for-side-effects.md)<br />Disallow the use of side effects in `waitFor`                          |                                                                                                                                          |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-wait-for-snapshot](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-wait-for-snapshot.md)<br />Ensures no snapshot is generated inside of a `waitFor` call                    |                                                                                                                                          |         |           |

### ⚠️ Warnings (16)

|                               Plugin                               | Rule                                                                                                                                                                                                                                | Options | Autofix | Overrides |
| :----------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :-----: | :-------: |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-await-sync-events](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-await-sync-events.md)<br />Disallow unnecessary `await` for sync events                                             |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-await-sync-queries](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-await-sync-queries.md)<br />Disallow unnecessary `await` for sync queries                                          |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-container](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-container.md)<br />Disallow the use of `container` methods                                                                  |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-debugging-utils](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-debugging-utils.md)<br />Disallow the use of debugging utilities like `debug`                                         |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-manual-cleanup](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-manual-cleanup.md)<br />Disallow the use of `cleanup`                                                                  |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-node-access](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-node-access.md)<br />Disallow direct Node access                                                                          |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-render-in-lifecycle](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-render-in-lifecycle.md)<br />Disallow the use of `render` in testing frameworks setup functions                   |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [no-wait-for-multiple-assertions](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/no-wait-for-multiple-assertions.md)<br />Disallow the use of multiple `expect` calls inside `waitFor`       |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-explicit-assert](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-explicit-assert.md)<br />Suggest using explicit assertions rather than standalone queries                     |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-find-by](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-find-by.md)<br />Suggest using `find(All)By*` query instead of `waitFor` + `get(All)By*` to wait for elements         |         |   🔧    |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-presence-queries](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-presence-queries.md)<br />Ensure appropriate `get*`/`query*` queries are used with their respective matchers |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-query-by-disappearance](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-query-by-disappearance.md)<br />Suggest using `queryBy*` queries when waiting for disappearance        |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-query-matchers](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-query-matchers.md)<br />Ensure the configured `get*`/`query*` query is used with the corresponding matchers    |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-screen-queries](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-screen-queries.md)<br />Suggest using `screen` while querying                                                  |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [prefer-user-event](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/prefer-user-event.md)<br />Suggest using `userEvent` over `fireEvent` for simulating user interactions                    |         |         |           |
| [![testing-library](./icons/other/testing-library.png)](undefined) | [render-result-naming-convention](https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/render-result-naming-convention.md)<br />Enforce a valid naming for return value from `render`              |         |         |           |
