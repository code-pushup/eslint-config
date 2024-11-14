# @code-pushup/eslint-config

[![npm](https://img.shields.io/npm/v/%40code-pushup%2Feslint-config.svg)](https://www.npmjs.com/package/@code-pushup/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Recommended ESLint presets by [Code PushUp](https://github.com/code-pushup/cli/tree/main/packages/cli).

<!-- begin autogenerated -->

## ⚙️ Configs

|                                                       Stack                                                        | Config                                                                                                                    | Description                                                         |
| :----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------ |
| ![javascript](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/javascript.png) | [@code-pushup/eslint-config/legacy/javascript](https://github.com/code-pushup/eslint-config/blob/main/docs/javascript.md) | Default config, suitable for any **JavaScript/TypeScript** project. |
| ![typescript](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/typescript.png) | [@code-pushup/eslint-config/legacy/typescript](https://github.com/code-pushup/eslint-config/blob/main/docs/typescript.md) | Config for strict **TypeScript** projects.                          |
|     ![nodejs](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/nodejs.png)     | [@code-pushup/eslint-config/legacy/node](https://github.com/code-pushup/eslint-config/blob/main/docs/node.md)             | Config for **Node.js** projects.                                    |
|    ![angular](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/angular.png)    | [@code-pushup/eslint-config/legacy/angular](https://github.com/code-pushup/eslint-config/blob/main/docs/angular.md)       | Config for **Angular** projects.                                    |
|        ![ngrx](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/other/ngrx.png)         | [@code-pushup/eslint-config/legacy/ngrx](https://github.com/code-pushup/eslint-config/blob/main/docs/ngrx.md)             | Config for **Angular** projects using **NgRx** library.             |
|    ![graphql](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/graphql.png)    | [@code-pushup/eslint-config/legacy/graphql](https://github.com/code-pushup/eslint-config/blob/main/docs/graphql.md)       | Config for **GraphQL servers** implemented in Node.js.              |
|       ![jest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/jest.png)       | [@code-pushup/eslint-config/legacy/jest](https://github.com/code-pushup/eslint-config/blob/main/docs/jest.md)             | Config for projects using **Jest** for testing.                     |
|     ![vitest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/vitest.png)     | [@code-pushup/eslint-config/legacy/vitest](https://github.com/code-pushup/eslint-config/blob/main/docs/vitest.md)         | Config for projects using **Vitest** for testing.                   |
|    ![cypress](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/cypress.png)    | [@code-pushup/eslint-config/legacy/cypress](https://github.com/code-pushup/eslint-config/blob/main/docs/cypress.md)       | Config for projects using **Cypress** for testing.                  |
|  ![storybook](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/storybook.png)  | [@code-pushup/eslint-config/legacy/storybook](https://github.com/code-pushup/eslint-config/blob/main/docs/storybook.md)   | Config for projects using **Storybook** for UI components.          |

Some configs extend other configs, as illustrated below. So, for example, adding `"extends": ["@code-pushup/eslint-config/legacy/angular"]` implicitly includes `@code-pushup/eslint-config/legacy/typescript` and `@code-pushup` as well.

```mermaid
  graph BT;
    index("@code-pushup/eslint-config/legacy")
    typescript("@code-pushup/eslint-config/legacy/typescript")
    node("@code-pushup/eslint-config/legacy/node")
    angular("@code-pushup/eslint-config/legacy/angular")
    ngrx("@code-pushup/eslint-config/legacy/ngrx")
    graphql("@code-pushup/eslint-config/legacy/graphql")
    typescript --extends--> javascript
    node --extends--> javascript
    angular --extends--> typescript
    ngrx --extends--> angular
    graphql --extends--> node
```

### 🏗️ Setup

To use the default config, follow these steps:

1. You must first install all the required peer dependencies (if you haven't already):

   ```sh
   npm install -D eslint @eslint/js eslint-plugin-{functional,import,promise,sonarjs,unicorn} globals typescript-eslint
   ```

2. Install `@code-pushup/eslint-config` with:

   ```sh
   npm install -D @code-pushup/eslint-config
   ```

3. Add default config to `extends` section in your [ESLint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files) (usually called `.eslintrc.json` or `.eslintrc.js`):

   ```json
   {
     "extends": ["@code-pushup/eslint-config/legacy"]
   }
   ```

Depending on your tech stack, you may wish to extend other configs as well ([listed above](#⚙️-configs)). This will require installing additional peer dependencies. For more details, refer to setup docs for the configs you're interested in using.

#### 📦 Peer dependencies

All peer dependencies used by `@code-pushup/eslint-config` are listed below, along with their supported versions. Only the default config's dependencies are required, others are optional.

|                                                                                                                    | NPM package                                                                                          |  Version   | Required |
| :----------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------- | :--------: | :------: |
|     ![eslint](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/eslint.png)     | [eslint](https://www.npmjs.com/package/eslint)                                                       |  `^9.0.0`  |    ✅     |
|     ![eslint](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/eslint.png)     | [@eslint/js](https://www.npmjs.com/package/@eslint/js)                                               |  `^9.0.0`  |    ✅     |
|      ![lambda](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/lambda.png)      | [eslint-plugin-functional](https://www.npmjs.com/package/eslint-plugin-functional)                   |  `^7.0.0`  |    ✅     |
|      ![import](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/import.png)      | [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)                           | `^2.31.0`  |    ✅     |
|      ![import](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/import.png)      | [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript) |  `^3.0.0`  |          |
|     ![promise](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/promise.png)     | [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)                         | `>=6.4.0`  |    ✅     |
|       ![sonar](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/other/sonar.png)        | [eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs)                         | `>=1.0.4`  |    ✅     |
|     ![unicorn](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/unicorn.png)     | [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)                         | `>=50.0.0` |    ✅     |
|      ![global](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/global.png)      | [globals](https://www.npmjs.com/package/globals)                                                     | `>=14.0.0` |    ✅     |
| ![typescript](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/typescript.png) | [typescript-eslint](https://www.npmjs.com/package/typescript-eslint)                                 |  `^8.0.0`  |    ✅     |
|    ![graphql](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/graphql.png)    | [@graphql-eslint/eslint-plugin](https://www.npmjs.com/package/@graphql-eslint/eslint-plugin)         |  `^3.0.0`  |          |
|        ![ngrx](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/other/ngrx.png)         | [@ngrx/eslint-plugin](https://www.npmjs.com/package/@ngrx/eslint-plugin)                             | `^18.0.0`  |          |
|    ![angular](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/angular.png)    | [angular-eslint](https://www.npmjs.com/package/angular-eslint)                                       | `^18.0.0`  |          |
|    ![cypress](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/cypress.png)    | [eslint-plugin-cypress](https://www.npmjs.com/package/eslint-plugin-cypress)                         | `>=3.3.0`  |          |
|       ![jest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/jest.png)       | [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)                               | `^28.8.0`  |          |
|        ![test](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/icons8/test.png)        | [eslint-plugin-jest-formatting](https://www.npmjs.com/package/eslint-plugin-jest-formatting)         |  `^3.0.0`  |          |
|     ![nodejs](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/nodejs.png)     | [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)                                     | `>=17.0.0` |          |
|        ![rxjs](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/other/rxjs.png)         | [eslint-plugin-rxjs](https://www.npmjs.com/package/eslint-plugin-rxjs)                               |  `^5.0.0`  |          |
|  ![storybook](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/storybook.png)  | [eslint-plugin-storybook](https://www.npmjs.com/package/eslint-plugin-storybook)                     | `>=0.10.0` |          |
|     ![vitest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/vitest.png)     | [eslint-plugin-vitest](https://www.npmjs.com/package/eslint-plugin-vitest)                           | `>=0.5.0`  |          |

### 🧪 Test overrides

For non-production code, some rules are disabled (or downgraded from errors to warnings).

This applies to file paths matching any of the following globs:

- `**/*.spec.?(c|m)[jt]s?(x)`
- `**/*.test.?(c|m)[jt]s?(x)`
- `**/__tests__/**/*.?(c|m)[jt]s?(x)`
- `**/__mocks__/**/*.?(c|m)[jt]s?(x)`
- `**/*.cy.?(c|m)[jt]s?(x)`
- `**/*.stories.?(c|m)[jt]s?(x)`
- `**/*.e2e.?(c|m)[jt]s?(x)`
- `**/*.mock.?(c|m)[jt]s?(x)`
- `**/*.mocks.?(c|m)[jt]s?(x)`
- `**/test/**/*.?(c|m)[jt]s?(x)`
- `**/tests/**/*.?(c|m)[jt]s?(x)`
- `**/mocks/**/*.?(c|m)[jt]s?(x)`
- `**/testing-utils/**/*.?(c|m)[jt]s?(x)`
- `**/test-utils/**/*.?(c|m)[jt]s?(x)`
- `**/fixtures/**/*.?(c|m)[jt]s?(x)`
- `**/*.config.?(c|m)[jt]s`
- `**/.prettierrc.?(c|m)[jt]s`
- `**/codegen.?(c|m)[jt]s`
- `**/test-setup.?(c|m)[jt]s`

<!-- end autogenerated -->

## 🫴 Contributing

Node.js installation is a prerequisite (LTS version). Install dependencies with NPM:

```sh
npm install
```

To execute tests:

```sh
npm test
```

To generate documentation:

```sh
npm run docs
```
