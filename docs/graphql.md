# `@code-pushup/eslint-config/graphql` config

Config for **GraphQL servers** implemented in Node.js.

## 🏗️ Setup

1. If you haven't already, make sure to [install `@code-pushup/eslint-config` and its required peer dependencies](../README.md#🏗️-setup).
2. Since this plugin requires additional peer dependencies, you have to install them as well:
   
   ```sh
   npm install -D @graphql-eslint/eslint-plugin eslint-plugin-n
   ```
3. The GraphQL ESLint plugin needs to know where your GraphQL schema is located. For more information, refer to [_Extended Linting Rules with GraphQL Schema_ in GraphQL ESLint docs](https://the-guild.dev/graphql/eslint/docs/getting-started#extended-linting-rules-with-graphql-schema).
     
   - If you're using [graphql-config](https://the-guild.dev/graphql/config/docs), then your GraphQL schema will be loaded automatically from your `.graphqlrc.yml` (or equivalent) file. So no extra setup is required in this case.
   - Otherwise, you can use [`parserOptions.schema`](https://the-guild.dev/graphql/eslint/docs/getting-started/parser-options#schema), e.g.:
     ```jsonc
     {
       // ...
       "parserOptions": {
         "schema": "./schema.graphql"
         // globs are also supported:
         // "schema": "./src/schema/**/*.graphql.ts"
       }
     }
     ```
   
4. Add to `extends` in your .eslintrc file:
   
   ```jsonc
   {
     "extends": ["@code-pushup/eslint-config/graphql"]
   }
   ```


## 📏 Rules (294)

**267** rules are included from [`@code-pushup/eslint-config/node`](./node.md#📏-rules-267). For brevity, only the **27** additional rules are listed in this document.

> 🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).<br>💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).<br>🧪🚫 Disabled for [test files](../README.md#🧪-test-overrides).<br>🧪⚠️ Severity lessened to warning for [test files](../README.md#🧪-test-overrides).

### 🚨 Errors (20)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [known-argument-names](https://the-guild.dev/graphql/eslint/rules/known-argument-names)<br>A GraphQL field is only valid if all supplied arguments are defined by that field.> This rule is a wrapper around a `graphql-js` validation function. |  | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [known-directives](https://the-guild.dev/graphql/eslint/rules/known-directives)<br>A GraphQL document is only valid if all `@directive`s are known by the schema and legally positioned.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [known-type-names](https://the-guild.dev/graphql/eslint/rules/known-type-names)<br>A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.> This rule is a wrapper around a `graphql-js` validation function. |  | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [lone-schema-definition](https://the-guild.dev/graphql/eslint/rules/lone-schema-definition)<br>A GraphQL document is only valid if it contains only one schema definition.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [naming-convention](https://the-guild.dev/graphql/eslint/rules/naming-convention)<br>Require names to follow specified conventions. | <details><summary>types: PascalCase, FieldDef...</summary><pre>{<br>  "types": "PascalCase",<br>  "FieldDefinition": "camelCase",<br>  "InputValueDefinition": "camelCase",<br>  "Argument": "camelCase",<br>  "DirectiveDefinition": "camelCase",<br>  "EnumValueDefinition": "UPPER_CASE",<br>  "FieldDefinition[parent.name.value=Query]": {<br>    "forbiddenPrefixes": [<br>      "query",<br>      "get"<br>    ],<br>    "forbiddenSuffixes": [<br>      "Query"<br>    ]<br>  },<br>  "FieldDefinition[parent.name.value=Mutation]": {<br>    "forbiddenPrefixes": [<br>      "mutation"<br>    ],<br>    "forbiddenSuffixes": [<br>      "Mutation"<br>    ]<br>  },<br>  "FieldDefinition[parent.name.value=Subscription]": {<br>    "forbiddenPrefixes": [<br>      "subscription"<br>    ],<br>    "forbiddenSuffixes": [<br>      "Subscription"<br>    ]<br>  },<br>  "allowLeadingUnderscore": false,<br>  "allowTrailingUnderscore": false<br>}</pre></details> | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [no-case-insensitive-enum-values-duplicates](https://the-guild.dev/graphql/eslint/rules/no-case-insensitive-enum-values-duplicates)<br>Disallow case-insensitive enum values duplicates. |  | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [no-typename-prefix](https://the-guild.dev/graphql/eslint/rules/no-typename-prefix)<br>Enforces users to avoid using the type name in a field name while defining your schema. |  | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [no-unreachable-types](https://the-guild.dev/graphql/eslint/rules/no-unreachable-types)<br>Requires all types to be reachable at some level by root level fields. |  | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [provided-required-arguments](https://the-guild.dev/graphql/eslint/rules/provided-required-arguments)<br>A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [relay-arguments](https://the-guild.dev/graphql/eslint/rules/relay-arguments)<br>Set of rules to follow Relay specification for Arguments.- A field that returns a Connection type must include forward pagination arguments (`first` and `after`), backward pagination arguments (`last` and `before`), or bothForward pagination arguments- `first` takes a non-negative integer- `after` takes the Cursor typeBackward pagination arguments- `last` takes a non-negative integer- `before` takes the Cursor type |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [relay-connection-types](https://the-guild.dev/graphql/eslint/rules/relay-connection-types)<br>Set of rules to follow Relay specification for Connection types.- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`- Connection type must be an Object type- Connection type must contain a field `edges` that return a list type that wraps an edge type- Connection type must contain a field `pageInfo` that return a non-null `PageInfo` Object type |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [relay-edge-types](https://the-guild.dev/graphql/eslint/rules/relay-edge-types)<br>Set of rules to follow Relay specification for Edge types.- A type that is returned in list form by a connection type's `edges` field is considered by this spec to be an Edge type- Edge type must be an Object type- Edge type must contain a field `node` that return either Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types. Notably, this field cannot return a list- Edge type must contain a field `cursor` that return either String, Scalar, or a non-null wrapper around one of those types- Edge type name must end in "Edge" _(optional)_- Edge type's field `node` must implement `Node` interface _(optional)_- A list type should only wrap an edge type _(optional)_ | <details><summary>listTypeCanWrapOnlyEdgeType...</summary><pre>{<br>  "listTypeCanWrapOnlyEdgeType": false,<br>  "withEdgeSuffix": true,<br>  "shouldImplementNode": true<br>}</pre></details> |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [relay-page-info](https://the-guild.dev/graphql/eslint/rules/relay-page-info)<br>Set of rules to follow Relay specification for `PageInfo` object.- `PageInfo` must be an Object type- `PageInfo` must contain fields `hasPreviousPage` and `hasNextPage`, that return non-null Boolean- `PageInfo` must contain fields `startCursor` and `endCursor`, that return either String or Scalar, which can be null if there are no results |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [require-deprecation-reason](https://the-guild.dev/graphql/eslint/rules/require-deprecation-reason)<br>Require all deprecation directives to specify a reason. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [require-description](https://the-guild.dev/graphql/eslint/rules/require-description)<br>Enforce descriptions in type definitions and operations. | <details><summary>types: true, DirectiveDefin...</summary><pre>{<br>  "types": true,<br>  "DirectiveDefinition": true<br>}</pre></details> |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [unique-directive-names](https://the-guild.dev/graphql/eslint/rules/unique-directive-names)<br>A GraphQL document is only valid if all defined directives have unique names.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [unique-directive-names-per-location](https://the-guild.dev/graphql/eslint/rules/unique-directive-names-per-location)<br>A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [unique-field-definition-names](https://the-guild.dev/graphql/eslint/rules/unique-field-definition-names)<br>A GraphQL complex type is only valid if all its fields are uniquely named.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [unique-operation-types](https://the-guild.dev/graphql/eslint/rules/unique-operation-types)<br>A GraphQL document is only valid if it has only one type per operation.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [unique-type-names](https://the-guild.dev/graphql/eslint/rules/unique-type-names)<br>A GraphQL document is only valid if all defined types have unique names.> This rule is a wrapper around a `graphql-js` validation function. |  |  |  |

### ⚠️ Warnings (2)

| Plugin | Rule | Options | Autofix | Overrides |
| :-: | :-- | :-- | :-: | :-: |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [description-style](https://the-guild.dev/graphql/eslint/rules/description-style)<br>Require all comments to follow the same style (either block or inline). | <details><summary>style: inline</summary><pre>{<br>  "style": "inline"<br>}</pre></details> | 💡 |  |
| [![@graphql-eslint](./icons/material/graphql.png)](https://the-guild.dev/graphql/eslint/docs) | [no-hashtag-description](https://the-guild.dev/graphql/eslint/rules/no-hashtag-description)<br>Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.Allows to use hashtag for comments, as long as it's not attached to an AST definition. |  | 💡 |  |