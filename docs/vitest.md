# `@code-pushup/eslint-config/vitest` config

Config for projects using Vitest for testing.

## ⚙️ Setup

Add to `extends` in your .eslintrc file:

```json
{
  "extends": ["@code-pushup/eslint-config/vitest"]
}
```

## 📏 Rules (33)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (6)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [expect-expect](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md)<br>Enforce having expectation in test body |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-commented-out-tests](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-commented-out-tests.md)<br>Disallow commented out tests |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-identical-title](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-identical-title.md)<br>Disallow identical titles |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [valid-describe-callback](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-describe-callback.md)<br>Enforce valid describe callback |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [valid-expect](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-expect.md)<br>Enforce valid `expect()` usage |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [valid-title](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md)<br>Enforce valid titles |  | 🔧 |

### ⚠️ Warnings (27)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [consistent-test-filename](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-filename.md)<br>forbidden .spec test file pattern | <details><summary>pattern: .\*\\.spec\\.[tj]s...</summary><pre>{<br>  "pattern": ".\*\\\\.spec\\\\.[tj]sx?$",<br>  "allTestPattern": ".\*\\\\.(test\|spec)\\\\.[tj]sx?$"<br>}</pre></details> |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [consistent-test-it](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md)<br>Prefer test or it but not both |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [max-nested-describe](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/max-nested-describe.md)<br>Nested describe block should be less than set max value or default value | <details><summary>max: 2</summary><pre>{<br>  "max": 2<br>}</pre></details> |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-alias-methods](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md)<br>Disallow alias methods |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-conditional-expect](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md)<br>Disallow conditional expects |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-conditional-tests](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-tests.md)<br>Disallow conditional tests |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-disabled-tests](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-disabled-tests.md)<br>Disallow disabled tests |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-done-callback](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-done-callback.md)<br>Disallow using a callback in asynchronous tests and hooks |  | 💡 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-duplicate-hooks](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-duplicate-hooks.md)<br>Disallow duplicate hooks and teardown hooks |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-focused-tests](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-focused-tests.md)<br>Disallow focused tests |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-mocks-import](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-mocks-import.md)<br>Disallow importing from __mocks__ directory |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-standalone-expect](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-standalone-expect.md)<br>Disallow using `expect` outside of `it` or `test` blocks |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [no-test-return-statement](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-test-return-statement.md)<br>Disallow return statements in tests |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-comparison-matcher](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-comparison-matcher.md)<br>Suggest using the built-in comparison matchers |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-each](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-each.md)<br>Prefer `each` rather than manual loops |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-equality-matcher](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md)<br>Suggest using the built-in quality matchers |  | 💡 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-expect-resolves](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-resolves.md)<br>Suggest using `expect().resolves` over `expect(await ...)` syntax |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-hooks-on-top](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md)<br>Suggest having hooks before any test cases |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-mock-promise-shorthand](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-promise-shorthand.md)<br>Prefer mock resolved/rejected shorthands for promises |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-spy-on](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-spy-on.md)<br>Suggest using `vi.spyOn` |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-to-be](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md)<br>Suggest using toBe() |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-to-contain](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md)<br>Prefer using toContain() |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-to-have-length](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md)<br>Suggest using toHaveLength() |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [prefer-todo](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-todo.md)<br>Suggest using `test.todo` |  | 🔧 |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [require-hook](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/require-hook.md)<br>Require setup and teardown to be within a hook |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [require-to-throw-message](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/require-to-throw-message.md)<br>Require toThrow() to be called with an error message |  |  |
| [![vitest](./icons/material/vitest.png)](https://github.com/veritem/eslint-plugin-vitest#readme) | [require-top-level-describe](https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/require-top-level-describe.md)<br>Enforce that all tests are in a top-level describe |  |  |