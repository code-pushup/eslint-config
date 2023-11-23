# `@code-pushup/eslint-config/jest` config

Config for projects using **Jest** for testing.

## ⚙️ Setup

Add to `extends` in your .eslintrc file:

```json
{
  "extends": ["@code-pushup/eslint-config/jest"]
}
```

## 📏 Rules (37)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (8)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-identical-title](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-identical-title.md)<br>Disallow identical titles |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-interpolation-in-snapshots](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-interpolation-in-snapshots.md)<br>Disallow string interpolation inside snapshots |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-jasmine-globals](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-jasmine-globals.md)<br>Disallow Jasmine globals |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-test-prefixes](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-test-prefixes.md)<br>Require using `.only` and `.skip` over `f` and `x` |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [valid-describe-callback](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/valid-describe-callback.md)<br>Enforce valid `describe()` callback |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [valid-expect](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/valid-expect.md)<br>Enforce valid `expect()` usage |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [valid-expect-in-promise](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/valid-expect-in-promise.md)<br>Require promises that have expectations in their chain to be valid |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [valid-title](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/valid-title.md)<br>Enforce valid titles |  | 🔧 |

### ⚠️ Warnings (29)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [consistent-test-it](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/consistent-test-it.md)<br>Enforce `test` and `it` usage conventions |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [expect-expect](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/expect-expect.md)<br>Enforce assertion to be made in a test body |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [max-nested-describe](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/max-nested-describe.md)<br>Enforces a maximum depth to nested describe calls | <details><summary>max: 2</summary><pre>{<br>  "max": 2<br>}</pre></details> |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-alias-methods](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-alias-methods.md)<br>Disallow alias methods |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-commented-out-tests](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-commented-out-tests.md)<br>Disallow commented out tests |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-conditional-expect](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-conditional-expect.md)<br>Disallow calling `expect` conditionally |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-deprecated-functions](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-deprecated-functions.md)<br>Disallow use of deprecated functions |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-disabled-tests](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-disabled-tests.md)<br>Disallow disabled tests |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-done-callback](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-done-callback.md)<br>Disallow using a callback in asynchronous tests and hooks |  | 💡 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-duplicate-hooks](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-duplicate-hooks.md)<br>Disallow duplicate setup and teardown hooks |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-export](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-export.md)<br>Disallow using `exports` in files containing tests |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-focused-tests](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-focused-tests.md)<br>Disallow focused tests |  | 💡 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-mocks-import](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-mocks-import.md)<br>Disallow manually importing from `__mocks__` |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-standalone-expect](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-standalone-expect.md)<br>Disallow using `expect` outside of `it` or `test` blocks |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [no-test-return-statement](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/no-test-return-statement.md)<br>Disallow explicitly returning from tests |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-comparison-matcher](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-comparison-matcher.md)<br>Suggest using the built-in comparison matchers |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-each](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-each.md)<br>Prefer using `.each` rather than manual loops |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-equality-matcher](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-equality-matcher.md)<br>Suggest using the built-in equality matchers |  | 💡 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-expect-resolves](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-expect-resolves.md)<br>Prefer `await expect(...).resolves` over `expect(await ...)` syntax |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-hooks-on-top](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-hooks-on-top.md)<br>Suggest having hooks before any test cases |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-mock-promise-shorthand](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-mock-promise-shorthand.md)<br>Prefer mock resolved/rejected shorthands for promises |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-spy-on](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-spy-on.md)<br>Suggest using `jest.spyOn()` |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-to-be](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-to-be.md)<br>Suggest using `toBe()` for primitive literals |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-to-contain](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-to-contain.md)<br>Suggest using `toContain()` |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-to-have-length](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-to-have-length.md)<br>Suggest using `toHaveLength()` |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [prefer-todo](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/prefer-todo.md)<br>Suggest using `test.todo` |  | 🔧 |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [require-hook](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/require-hook.md)<br>Require setup and teardown code to be within a hook |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [require-to-throw-message](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/require-to-throw-message.md)<br>Require a message for `toThrow()` |  |  |
| [![jest](./icons/material/jest.png)](https://github.com/jest-community/eslint-plugin-jest#readme) | [require-top-level-describe](https://github.com/jest-community/eslint-plugin-jest/blob/v27.6.0/docs/rules/require-top-level-describe.md)<br>Require test cases and hooks to be inside a `describe` block |  |  |