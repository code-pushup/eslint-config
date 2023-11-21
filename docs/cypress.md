# `@code-pushup/eslint-config/cypress` config

Config for projects using Cypress for testing.

## ⚙️ Setup

Add to `extends` in your .eslintrc file:

```json
{
  "extends": ["@code-pushup/eslint-config/cypress"]
}
```

## 📏 Rules (6)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

### 🚨 Errors (4)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-assigning-return-values](https://on.cypress.io/best-practices#Assigning-Return-Values)<br>Prevent assigning return values of cy calls |  |  |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-async-tests<br>Prevent using async/await in Cypress test cases |  |  |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [no-unnecessary-waiting](https://on.cypress.io/best-practices#Unnecessary-Waiting)<br>Prevent waiting for arbitrary time periods |  |  |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | [unsafe-to-chain-command](https://docs.cypress.io/guides/core-concepts/retry-ability#Actions-should-be-at-the-end-of-chains-not-the-middle)<br>Actions should be in the end of chains, not in the middle |  |  |

### ⚠️ Warnings (2)

| Plugin | Rule | Options | Autofix |
| :-: | :-- | :-- | :-: |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-force<br>Disallow using of 'force: true' option for click and type calls |  |  |
| [![cypress](./icons/material/cypress.png)](https://github.com/cypress-io/eslint-plugin-cypress#readme) | no-pause<br>Disallow using of 'cy.pause' calls |  |  |