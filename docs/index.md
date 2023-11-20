# `@code-pushup` config

Default configuration, suitable for any JavaScript/TypeScript project.

## ⚙️ Setup

Add to `extends` in your .eslintrc file:

```json
{
  "extends": ["@code-pushup"]
}
```

## 📏 Rules (153)

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (118)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
|  | [eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq)<br>Require the use of `===` and `!==` | <details><summary>always, null: never</summary><pre>[<br>  "always",<br>  {<br>    "null": "never"<br>  }<br>]</pre></details> | 🔧 |  |
|  | [for-direction](https://eslint.org/docs/latest/rules/for-direction)<br>Enforce "for" loop update clause moving the counter in the right direction |  |  |  |
|  | [guard-for-in](https://eslint.org/docs/latest/rules/guard-for-in)<br>Require `for-in` loops to include an `if` statement |  |  |  |
|  | [no-async-promise-executor](https://eslint.org/docs/latest/rules/no-async-promise-executor)<br>Disallow using an async function as a Promise executor |  |  |  |
|  | [no-case-declarations](https://eslint.org/docs/latest/rules/no-case-declarations)<br>Disallow lexical declarations in case clauses |  |  |  |
|  | [no-class-assign](https://eslint.org/docs/latest/rules/no-class-assign)<br>Disallow reassigning class members |  |  |  |
|  | [no-compare-neg-zero](https://eslint.org/docs/latest/rules/no-compare-neg-zero)<br>Disallow comparing against -0 |  |  |  |
|  | [no-cond-assign](https://eslint.org/docs/latest/rules/no-cond-assign)<br>Disallow assignment operators in conditional expressions |  |  |  |
|  | [no-constant-condition](https://eslint.org/docs/latest/rules/no-constant-condition)<br>Disallow constant expressions in conditions |  |  |  |
|  | [no-control-regex](https://eslint.org/docs/latest/rules/no-control-regex)<br>Disallow control characters in regular expressions |  |  |  |
|  | [no-debugger](https://eslint.org/docs/latest/rules/no-debugger)<br>Disallow the use of `debugger` |  |  |  |
|  | [no-delete-var](https://eslint.org/docs/latest/rules/no-delete-var)<br>Disallow deleting variables |  |  |  |
|  | [no-dupe-else-if](https://eslint.org/docs/latest/rules/no-dupe-else-if)<br>Disallow duplicate conditions in if-else-if chains |  |  |  |
|  | [no-duplicate-case](https://eslint.org/docs/latest/rules/no-duplicate-case)<br>Disallow duplicate case labels |  |  |  |
|  | [no-empty](https://eslint.org/docs/latest/rules/no-empty)<br>Disallow empty block statements |  | 💡 |  |
|  | [no-empty-character-class](https://eslint.org/docs/latest/rules/no-empty-character-class)<br>Disallow empty character classes in regular expressions |  |  |  |
|  | [no-empty-pattern](https://eslint.org/docs/latest/rules/no-empty-pattern)<br>Disallow empty destructuring patterns |  |  |  |
|  | [no-eval](https://eslint.org/docs/latest/rules/no-eval)<br>Disallow the use of `eval()` |  |  |  |
|  | [no-ex-assign](https://eslint.org/docs/latest/rules/no-ex-assign)<br>Disallow reassigning exceptions in `catch` clauses |  |  |  |
|  | [no-extra-boolean-cast](https://eslint.org/docs/latest/rules/no-extra-boolean-cast)<br>Disallow unnecessary boolean casts |  | 🔧 |  |
|  | [no-extra-semi](https://eslint.org/docs/latest/rules/no-extra-semi)<br>Disallow unnecessary semicolons |  | 🔧 |  |
|  | [no-fallthrough](https://eslint.org/docs/latest/rules/no-fallthrough)<br>Disallow fallthrough of `case` statements |  |  |  |
|  | [no-global-assign](https://eslint.org/docs/latest/rules/no-global-assign)<br>Disallow assignments to native objects or read-only global variables |  |  |  |
|  | [no-inner-declarations](https://eslint.org/docs/latest/rules/no-inner-declarations)<br>Disallow variable or `function` declarations in nested blocks |  |  |  |
|  | [no-invalid-regexp](https://eslint.org/docs/latest/rules/no-invalid-regexp)<br>Disallow invalid regular expression strings in `RegExp` constructors |  |  |  |
|  | [no-irregular-whitespace](https://eslint.org/docs/latest/rules/no-irregular-whitespace)<br>Disallow irregular whitespace |  |  |  |
|  | [no-misleading-character-class](https://eslint.org/docs/latest/rules/no-misleading-character-class)<br>Disallow characters which are made with multiple code points in character class syntax |  | 💡 |  |
|  | [no-mixed-spaces-and-tabs](https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs)<br>Disallow mixed spaces and tabs for indentation |  |  |  |
|  | [no-nonoctal-decimal-escape](https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape)<br>Disallow `\8` and `\9` escape sequences in string literals |  | 💡 |  |
|  | [no-octal](https://eslint.org/docs/latest/rules/no-octal)<br>Disallow octal literals |  |  |  |
|  | [no-param-reassign](https://eslint.org/docs/latest/rules/no-param-reassign)<br>Disallow reassigning `function` parameters | <details><summary>props: true</summary><pre>{<br>  "props": true<br>}</pre></details> |  |  |
|  | [no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins)<br>Disallow calling some `Object.prototype` methods directly on objects |  | 💡 |  |
|  | [no-regex-spaces](https://eslint.org/docs/latest/rules/no-regex-spaces)<br>Disallow multiple spaces in regular expressions |  | 🔧 |  |
|  | [no-self-assign](https://eslint.org/docs/latest/rules/no-self-assign)<br>Disallow assignments where both sides are exactly the same |  |  |  |
|  | [no-sequences](https://eslint.org/docs/latest/rules/no-sequences)<br>Disallow comma operators |  |  |  |
|  | [no-shadow-restricted-names](https://eslint.org/docs/latest/rules/no-shadow-restricted-names)<br>Disallow identifiers from shadowing restricted names |  |  |  |
|  | [no-sparse-arrays](https://eslint.org/docs/latest/rules/no-sparse-arrays)<br>Disallow sparse arrays |  |  |  |
|  | [no-template-curly-in-string](https://eslint.org/docs/latest/rules/no-template-curly-in-string)<br>Disallow template literal placeholder syntax in regular strings |  |  |  |
|  | [no-unexpected-multiline](https://eslint.org/docs/latest/rules/no-unexpected-multiline)<br>Disallow confusing multiline expressions |  |  |  |
|  | [no-unreachable-loop](https://eslint.org/docs/latest/rules/no-unreachable-loop)<br>Disallow loops with a body that allows only one iteration |  |  |  |
|  | [no-unsafe-finally](https://eslint.org/docs/latest/rules/no-unsafe-finally)<br>Disallow control flow statements in `finally` blocks |  |  |  |
|  | [no-unsafe-optional-chaining](https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining)<br>Disallow use of optional chaining in contexts where the `undefined` value is not allowed |  |  |  |
|  | [no-unused-labels](https://eslint.org/docs/latest/rules/no-unused-labels)<br>Disallow unused labels |  | 🔧 |  |
|  | [no-useless-backreference](https://eslint.org/docs/latest/rules/no-useless-backreference)<br>Disallow useless backreferences in regular expressions |  |  |  |
|  | [no-useless-catch](https://eslint.org/docs/latest/rules/no-useless-catch)<br>Disallow unnecessary `catch` clauses |  |  |  |
|  | [no-useless-escape](https://eslint.org/docs/latest/rules/no-useless-escape)<br>Disallow unnecessary escape characters |  | 💡 |  |
|  | [no-var](https://eslint.org/docs/latest/rules/no-var)<br>Require `let` or `const` instead of `var` |  | 🔧 |  |
|  | [no-with](https://eslint.org/docs/latest/rules/no-with)<br>Disallow `with` statements |  |  |  |
|  | [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)<br>Require `const` declarations for variables that are never reassigned after declared |  | 🔧 |  |
|  | [prefer-rest-params](https://eslint.org/docs/latest/rules/prefer-rest-params)<br>Require rest parameters instead of `arguments` |  |  |  |
|  | [prefer-spread](https://eslint.org/docs/latest/rules/prefer-spread)<br>Require spread operators instead of `.apply()` |  |  |  |
|  | [require-yield](https://eslint.org/docs/latest/rules/require-yield)<br>Require generator functions to contain `yield` |  |  |  |
|  | [use-isnan](https://eslint.org/docs/latest/rules/use-isnan)<br>Require calls to `isNaN()` when checking for `NaN` |  |  |  |
|  | [valid-typeof](https://eslint.org/docs/latest/rules/valid-typeof)<br>Enforce comparing `typeof` expressions against valid strings |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [ban-ts-comment](https://typescript-eslint.io/rules/ban-ts-comment)<br>Disallow `@ts-<directive>` comments or require descriptions after directives |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [ban-types](https://typescript-eslint.io/rules/ban-types)<br>Disallow certain types |  | 🔧, 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-array-constructor](https://typescript-eslint.io/rules/no-array-constructor)<br>Disallow generic `Array` constructors |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-duplicate-enum-values](https://typescript-eslint.io/rules/no-duplicate-enum-values)<br>Disallow duplicate enum member values |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-explicit-any](https://typescript-eslint.io/rules/no-explicit-any)<br>Disallow the `any` type |  | 🔧, 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-extra-non-null-assertion](https://typescript-eslint.io/rules/no-extra-non-null-assertion)<br>Disallow extra non-null assertions |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-loss-of-precision](https://typescript-eslint.io/rules/no-loss-of-precision)<br>Disallow literal numbers that lose precision |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-misused-new](https://typescript-eslint.io/rules/no-misused-new)<br>Enforce valid definition of `new` and `constructor` |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-namespace](https://typescript-eslint.io/rules/no-namespace)<br>Disallow TypeScript namespaces |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-non-null-asserted-optional-chain](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain)<br>Disallow non-null assertions after an optional chain expression |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-require-imports](https://typescript-eslint.io/rules/no-require-imports)<br>Disallow invocation of `require()` |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-this-alias](https://typescript-eslint.io/rules/no-this-alias)<br>Disallow aliasing `this` |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unnecessary-type-constraint](https://typescript-eslint.io/rules/no-unnecessary-type-constraint)<br>Disallow unnecessary constraints on generic types |  | 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unsafe-declaration-merging](https://typescript-eslint.io/rules/no-unsafe-declaration-merging)<br>Disallow unsafe declaration merging |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unused-vars](https://typescript-eslint.io/rules/no-unused-vars)<br>Disallow unused variables |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-var-requires](https://typescript-eslint.io/rules/no-var-requires)<br>Disallow `require` statements except in import statements |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [prefer-as-const](https://typescript-eslint.io/rules/prefer-as-const)<br>Enforce the use of `as const` over literal type |  | 🔧, 💡 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [triple-slash-reference](https://typescript-eslint.io/rules/triple-slash-reference)<br>Disallow certain triple slash directives in favor of ES6-style import declarations |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [default](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/default.md)<br>Ensure a default export is present, given a default import. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [export](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/export.md)<br>Forbid any invalid exports, i.e. re-export of the same name. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [named](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/named.md)<br>Ensure named imports correspond to a named export in the remote file. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [namespace](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/namespace.md)<br>Ensure imported namespaces contain dereferenced properties as they are dereferenced. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-absolute-path](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-absolute-path.md)<br>Forbid import of modules using absolute paths. |  | 🔧 |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-amd](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-amd.md)<br>Forbid AMD `require` and `define` calls. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-commonjs](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-commonjs.md)<br>Forbid CommonJS `require` calls and `module.exports` or `exports.*`. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-cycle](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-cycle.md)<br>Forbid a module from importing a module with a dependency path back to itself. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-mutable-exports](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-mutable-exports.md)<br>Forbid the use of mutable exports with `var` or `let`. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-self-import](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-self-import.md)<br>Forbid a module from importing itself. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-unresolved](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-unresolved.md)<br>Ensure imports point to a file/module that can be resolved. |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [always-return](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [catch-or-return](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/catch-or-return.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-new-statics](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-new-statics.md)<br> |  | 🔧 |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-return-wrap](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-wrap.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [param-names](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/param-names.md)<br> |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [cognitive-complexity](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/cognitive-complexity.md)<br>Cognitive Complexity of functions should not be too high |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [max-switch-cases](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/max-switch-cases.md)<br>"switch" statements should not have too many "case" clauses |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-all-duplicated-branches](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-all-duplicated-branches.md)<br>All branches in a conditional structure should not have exactly the same implementation |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-collapsible-if](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-collapsible-if.md)<br>Collapsible "if" statements should be merged |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-collection-size-mischeck](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-collection-size-mischeck.md)<br>Collection sizes and array length comparisons should make sense |  | 💡 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-duplicate-string](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-duplicate-string.md)<br>String literals should not be duplicated |  |  | 🧪🚫 |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-duplicated-branches](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-duplicated-branches.md)<br>Two branches in a conditional structure should not have exactly the same implementation |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-element-overwrite](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-element-overwrite.md)<br>Collection elements should not be replaced unconditionally |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-empty-collection](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-empty-collection.md)<br>Empty collections should not be accessed or iterated |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-extra-arguments](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-extra-arguments.md)<br>Function calls should not pass extra arguments |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-gratuitous-expressions](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-gratuitous-expressions.md)<br>Boolean expressions should not be gratuitous |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-identical-conditions](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-conditions.md)<br>Related "if-else-if" and "switch-case" statements should not have the same condition |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-identical-expressions](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-expressions.md)<br>Identical expressions should not be used on both sides of a binary operator |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-identical-functions](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-functions.md)<br>Functions should not have identical implementations |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-ignored-return](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-ignored-return.md)<br>Return values from functions without side effects should not be ignored |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-nested-switch](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-nested-switch.md)<br>"switch" statements should not be nested |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-nested-template-literals](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-nested-template-literals.md)<br>Template literals should not be nested |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-one-iteration-loop](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-one-iteration-loop.md)<br>Loops with at most one iteration should be refactored |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-redundant-boolean](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-boolean.md)<br>Boolean literals should not be redundant |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-redundant-jump](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-jump.md)<br>Jump statements should not be redundant |  | 💡 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-same-line-conditional](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-same-line-conditional.md)<br>Conditionals should start on new lines |  | 💡 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-small-switch](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-small-switch.md)<br>"switch" statements should have at least 3 "case" clauses |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-unused-collection](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-unused-collection.md)<br>Collection and array contents should be used |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-use-of-empty-return-value](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-use-of-empty-return-value.md)<br>The output of functions that don't return anything should not be used |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [no-useless-catch](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-useless-catch.md)<br>"catch" clauses should do more than rethrow |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [non-existent-operator](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/non-existent-operator.md)<br>Non-existent operators "=+", "=-" and "=!" should not be used |  | 💡 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [prefer-immediate-return](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-immediate-return.md)<br>Local variables should not be declared and then immediately returned or thrown |  | 🔧 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [prefer-object-literal](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-object-literal.md)<br>Object literal syntax should be used |  |  |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [prefer-single-boolean-return](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-single-boolean-return.md)<br>Return of boolean expressions should not be wrapped into an "if-then-else" statement |  | 💡 |  |
| [![sonarjs](./icons/other/sonar.png)](https://github.com/SonarSource/eslint-plugin-sonarjs#readme) | [prefer-while](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-while.md)<br>A "while" loop should be used instead of a "for" loop |  | 🔧 |  |

### ⚠️ Warnings (35)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
|  | [arrow-body-style](https://eslint.org/docs/latest/rules/arrow-body-style)<br>Require braces around arrow function bodies | <details><summary>as-needed</summary><pre>"as-needed"</pre></details> | 🔧 |  |
|  | [complexity](https://eslint.org/docs/latest/rules/complexity)<br>Enforce a maximum cyclomatic complexity allowed in a program |  |  |  |
|  | [curly](https://eslint.org/docs/latest/rules/curly)<br>Enforce consistent brace style for all control statements |  | 🔧 | 🧪🚫 |
|  | [max-depth](https://eslint.org/docs/latest/rules/max-depth)<br>Enforce a maximum depth that blocks can be nested |  |  |  |
|  | [max-lines](https://eslint.org/docs/latest/rules/max-lines)<br>Enforce a maximum number of lines per file | <details><summary>skipBlankLines: true, skipC...</summary><pre>{<br>  "skipBlankLines": true,<br>  "skipComments": true<br>}</pre></details> |  |  |
|  | [max-lines-per-function](https://eslint.org/docs/latest/rules/max-lines-per-function)<br>Enforce a maximum number of lines of code in a function | <details><summary>skipBlankLines: true, skipC...</summary><pre>{<br>  "skipBlankLines": true,<br>  "skipComments": true<br>}</pre></details> |  | 🧪🚫 |
|  | [max-nested-callbacks](https://eslint.org/docs/latest/rules/max-nested-callbacks)<br>Enforce a maximum depth that callbacks can be nested | <details><summary>max: 3</summary><pre>{<br>  "max": 3<br>}</pre></details> |  |  |
|  | [no-bitwise](https://eslint.org/docs/latest/rules/no-bitwise)<br>Disallow bitwise operators |  |  |  |
|  | [no-console](https://eslint.org/docs/latest/rules/no-console)<br>Disallow the use of `console` | <details><summary>allow: error, warn, info</summary><pre>{<br>  "allow": [<br>    "error",<br>    "warn",<br>    "info"<br>  ]<br>}</pre></details> |  |  |
|  | [no-duplicate-imports](https://eslint.org/docs/latest/rules/no-duplicate-imports)<br>Disallow duplicate module imports |  |  |  |
|  | [no-magic-numbers](https://eslint.org/docs/latest/rules/no-magic-numbers)<br>Disallow magic numbers | <details><summary>ignore: -1, 0, 1, 2, 7, 10,...</summary><pre>{<br>  "ignore": [<br>    -1,<br>    0,<br>    1,<br>    2,<br>    7,<br>    10,<br>    24,<br>    60,<br>    100,<br>    1000,<br>    3600<br>  ],<br>  "ignoreDefaultValues": true,<br>  "enforceConst": true,<br>  "detectObjects": true,<br>  "ignoreArrayIndexes": false,<br>  "ignoreClassFieldInitialValues": false<br>}</pre></details> |  | 🧪🚫 |
|  | [no-undef-init](https://eslint.org/docs/latest/rules/no-undef-init)<br>Disallow initializing variables to `undefined` |  | 🔧 |  |
|  | [prefer-template](https://eslint.org/docs/latest/rules/prefer-template)<br>Require template literals instead of string concatenation |  | 🔧 |  |
|  | [radix](https://eslint.org/docs/latest/rules/radix)<br>Enforce the consistent use of the radix argument when using `parseInt()` |  | 💡 |  |
|  | [yoda](https://eslint.org/docs/latest/rules/yoda)<br>Require or disallow "Yoda" conditions |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [consistent-type-definitions](https://typescript-eslint.io/rules/consistent-type-definitions)<br>Enforce type definitions to consistently use either `interface` or `type` | <details><summary>type</summary><pre>"type"</pre></details> | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [default-param-last](https://typescript-eslint.io/rules/default-param-last)<br>Enforce default parameters to be last |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [method-signature-style](https://typescript-eslint.io/rules/method-signature-style)<br>Enforce using a particular method signature syntax |  | 🔧 |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-shadow](https://typescript-eslint.io/rules/no-shadow)<br>Disallow variable declarations from shadowing variables declared in the outer scope |  |  |  |
| [![@typescript-eslint](./icons/material/typescript.png)](https://typescript-eslint.io/) | [no-unused-expressions](https://typescript-eslint.io/rules/no-unused-expressions)<br>Disallow unused expressions |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [extensions](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/extensions.md)<br>Ensure consistent use of file extension within the import path. | <details><summary>never, json: always</summary><pre>[<br>  "never",<br>  {<br>    "json": "always"<br>  }<br>]</pre></details> |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [max-dependencies](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/max-dependencies.md)<br>Enforce the maximum number of dependencies a module can have. | <details><summary>ignoreTypeImports: true</summary><pre>{<br>  "ignoreTypeImports": true<br>}</pre></details> |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-anonymous-default-export](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-anonymous-default-export.md)<br>Forbid anonymous values as default exports. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-deprecated](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-deprecated.md)<br>Forbid imported names marked with `@deprecated` documentation tag. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-duplicates.md)<br>Forbid repeated import of the same module in multiple places. |  | 🔧 |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-named-as-default](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-named-as-default.md)<br>Forbid use of exported name as identifier of default export. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-named-as-default-member](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-named-as-default-member.md)<br>Forbid use of exported name as property of default export. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-named-default](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-named-default.md)<br>Forbid named default exports. |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-unassigned-import](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-unassigned-import.md)<br>Forbid unassigned imports |  |  |  |
| [![import](./icons/icons8/import.png)](https://github.com/import-js/eslint-plugin-import#readme) | [no-useless-path-segments](https://github.com/import-js/eslint-plugin-import/blob/v2.29.0/docs/rules/no-useless-path-segments.md)<br>Forbid unnecessary path segments in import and require statements. |  | 🔧 |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-callback-in-promise](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-callback-in-promise.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-nesting](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-nesting.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-promise-in-callback](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-promise-in-callback.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [no-return-in-finally](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-in-finally.md)<br> |  |  |  |
| [![promise](./icons/icons8/promise.png)](https://github.com/eslint-community/eslint-plugin-promise#readme) | [valid-params](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/valid-params.md)<br>Ensures the proper number of arguments are passed to Promise functions |  |  |  |