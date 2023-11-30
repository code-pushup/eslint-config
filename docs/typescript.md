# `@code-pushup/eslint-config/typescript` config

Config for strict **TypeScript** projects.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:
   
   ```sh
   npm install -D eslint-plugin-deprecation
   ```
3. Because this config includes rules which require type information, make sure to configure `parserOptions.project` in your .eslintrc points to your project's tsconfig.
   For more information, refer to [_Linting with Type Information_ (typescript-eslint)](https://typescript-eslint.io/linting/typed-linting), or [_Configuring ESLint with Typescript_ (Nx)](https://nx.dev/recipes/tips-n-tricks/eslint) if using Nx monorepo.
   
   - Example for library in Nx monorepo:
     ```json
     {
       "extends": ["../../.eslintrc.json"],
       "ignorePatterns": ["!**/*"],
       "overrides": [
         {
           "files": "*.ts",
           "parserOptions": {
             "project": ["libs/shared-utils/tsconfig.*?.json"]
           }
         }
       ]
     }
     ```
   
   Similarly, you may need to [configure a tsconfig file for `eslint-plugin-import` rules](https://www.npmjs.com/package/eslint-plugin-import#typescript) (e.g. if using path aliases in `.ts` files):
   
   - Install additional import resolver:
     ```sh
     npm i -D eslint-import-resolver-typescript
     ```
     
   - Example `.eslintrc.json` for Nx monorepo:
     ```jsonc
     {
       // ...
       "settings": {
         "import/resolver": {
           "typescript": {
             "alwaysTryTypes": true,
             "project": "tsconfig.base.json"
             // or if using RxJS:
             // "project": ["tsconfig.base.json", "node_modules/rxjs/tsconfig.json"]
           }
         }
       }
     }
     ```
   
4. Add to `extends` in your .eslintrc file:
   
   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/typescript"]
   }
   ```


## 📏 Rules (292)

**252** rules are included from [the default config](./index.md#📏-rules-252). For brevity, only the **40** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (30)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [await-thenable](https://typescript-eslint.io/rules/await-thenable)<br>Disallow awaiting a value that is not a Thenable |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [consistent-type-assertions](https://typescript-eslint.io/rules/consistent-type-assertions)<br>Enforce consistent usage of type assertions | <details><summary>assertionStyle: as, objectL...</summary><pre>{<br>  "assertionStyle": "as",<br>  "objectLiteralTypeAssertions": "never"<br>}</pre></details> | 🔧, 💡 | 🧪⚠️ |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-base-to-string](https://typescript-eslint.io/rules/no-base-to-string)<br>Require `.toString()` to only be called on objects which provide useful information when stringified |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-duplicate-type-constituents](https://typescript-eslint.io/rules/no-duplicate-type-constituents)<br>Disallow duplicate constituents of union or intersection types |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-dynamic-delete](https://typescript-eslint.io/rules/no-dynamic-delete)<br>Disallow using the `delete` operator on computed key expressions |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-extraneous-class](https://typescript-eslint.io/rules/no-extraneous-class)<br>Disallow classes used as namespaces |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-floating-promises](https://typescript-eslint.io/rules/no-floating-promises)<br>Require Promise-like statements to be handled appropriately |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-for-in-array](https://typescript-eslint.io/rules/no-for-in-array)<br>Disallow iterating over an array with a for-in loop |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-implied-eval](https://typescript-eslint.io/rules/no-implied-eval)<br>Disallow the use of `eval()`-like methods |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-invalid-void-type](https://typescript-eslint.io/rules/no-invalid-void-type)<br>Disallow `void` type outside of generic or return types |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-misused-promises](https://typescript-eslint.io/rules/no-misused-promises)<br>Disallow Promises in places not designed to handle them |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-mixed-enums](https://typescript-eslint.io/rules/no-mixed-enums)<br>Disallow enums from having both number and string members |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-non-null-asserted-nullish-coalescing](https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing)<br>Disallow non-null assertions in the left operand of a nullish coalescing operator |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-non-null-assertion](https://typescript-eslint.io/rules/no-non-null-assertion)<br>Disallow non-null assertions using the `!` postfix operator |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-redundant-type-constituents](https://typescript-eslint.io/rules/no-redundant-type-constituents)<br>Disallow members of unions and intersections that do nothing or override type information |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-throw-literal](https://typescript-eslint.io/rules/no-throw-literal)<br>Disallow throwing literals as exceptions |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unnecessary-type-assertion](https://typescript-eslint.io/rules/no-unnecessary-type-assertion)<br>Disallow type assertions that do not change the type of an expression |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-argument](https://typescript-eslint.io/rules/no-unsafe-argument)<br>Disallow calling a function with a value with type `any` |  |  | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-assignment](https://typescript-eslint.io/rules/no-unsafe-assignment)<br>Disallow assigning a value with type `any` to variables and properties |  |  | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-call](https://typescript-eslint.io/rules/no-unsafe-call)<br>Disallow calling a value with type `any` |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-member-access](https://typescript-eslint.io/rules/no-unsafe-member-access)<br>Disallow member access on a value with type `any` |  |  | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-return](https://typescript-eslint.io/rules/no-unsafe-return)<br>Disallow returning a value with type `any` from a function |  |  | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-useless-constructor](https://typescript-eslint.io/rules/no-useless-constructor)<br>Disallow unnecessary constructors |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-literal-enum-member](https://typescript-eslint.io/rules/prefer-literal-enum-member)<br>Require all enum members to be literal values |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-ts-expect-error](https://typescript-eslint.io/rules/prefer-ts-expect-error)<br>Enforce using `@ts-expect-error` over `@ts-ignore` |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [require-await](https://typescript-eslint.io/rules/require-await)<br>Disallow async functions which have no `await` expression |  |  | 🧪⚠️ |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [restrict-plus-operands](https://typescript-eslint.io/rules/restrict-plus-operands)<br>Require both operands of addition to be the same type and be `bigint`, `number`, or `string` |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [restrict-template-expressions](https://typescript-eslint.io/rules/restrict-template-expressions)<br>Enforce template literal expressions to be of `string` type |  |  | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [unified-signatures](https://typescript-eslint.io/rules/unified-signatures)<br>Disallow two overloads that could be unified into one with a union or an optional/rest parameter |  |  |  |
| [![deprecation](./icons/icons8/expired.png)](https://github.com/gund/eslint-plugin-deprecation#readme) | [deprecation](https://github.com/gund/eslint-plugin-deprecation)<br>Do not use deprecated APIs. |  |  |  |

### ⚠️ Warnings (10)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [naming-convention](https://typescript-eslint.io/rules/naming-convention)<br>Enforce naming conventions for everything across a codebase | <details><summary>selector: variableLike, met...</summary><pre>[<br>  {<br>    "selector": [<br>      "variableLike",<br>      "method",<br>      "typeProperty",<br>      "parameterProperty",<br>      "classProperty"<br>    ],<br>    "format": [<br>      "camelCase"<br>    ]<br>  },<br>  {<br>    "selector": "variable",<br>    "format": [<br>      "camelCase",<br>      "UPPER_CASE"<br>    ]<br>  },<br>  {<br>    "selector": "typeLike",<br>    "format": [<br>      "PascalCase"<br>    ]<br>  },<br>  {<br>    "selector": "enumMember",<br>    "format": [<br>      "PascalCase"<br>    ]<br>  },<br>  {<br>    "selector": "parameter",<br>    "modifiers": [<br>      "unused"<br>    ],<br>    "format": null,<br>    "custom": {<br>      "regex": "^(_+\|[a-z][a-zA-Z0-9]\*)$",<br>      "match": true<br>    }<br>  },<br>  {<br>    "selector": "objectLiteralProperty",<br>    "modifiers": [<br>      "requiresQuotes"<br>    ],<br>    "format": null<br>  },<br>  {<br>    "selector": [<br>      "variable",<br>      "parameter"<br>    ],<br>    "modifiers": [<br>      "destructured"<br>    ],<br>    "format": null<br>  }<br>]</pre></details> |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-confusing-void-expression](https://typescript-eslint.io/rules/no-confusing-void-expression)<br>Require expressions of type void to appear in statement position |  | 🔧, 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-meaningless-void-operator](https://typescript-eslint.io/rules/no-meaningless-void-operator)<br>Disallow the `void` operator except when used to discard a value |  | 🔧, 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unnecessary-boolean-literal-compare](https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare)<br>Disallow unnecessary equality comparisons against boolean literals |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unnecessary-condition](https://typescript-eslint.io/rules/no-unnecessary-condition)<br>Disallow conditionals where the type is always truthy or always falsy |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unnecessary-type-arguments](https://typescript-eslint.io/rules/no-unnecessary-type-arguments)<br>Disallow type arguments that are equal to the default |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-includes](https://typescript-eslint.io/rules/prefer-includes)<br>Enforce `includes` method over `indexOf` method |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-nullish-coalescing](https://typescript-eslint.io/rules/prefer-nullish-coalescing)<br>Enforce using the nullish coalescing operator instead of logical assignments or chaining | <details><summary>ignorePrimitives: {"string"...</summary><pre>{<br>  "ignorePrimitives": {<br>    "string": true<br>  }<br>}</pre></details> | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-reduce-type-parameter](https://typescript-eslint.io/rules/prefer-reduce-type-parameter)<br>Enforce using type parameter when calling `Array#reduce` instead of casting |  | 🔧 | 🧪🚫 |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-return-this-type](https://typescript-eslint.io/rules/prefer-return-this-type)<br>Enforce that `this` is used when only `this` type is returned |  | 🔧 |  |