# @code-pushup/eslint-config

Recommended ESLint presets by [Code PushUp](https://github.com/code-pushup/cli/tree/main/packages/cli).

<!-- begin autogenerated -->

## ⚙️ Configs

Configurations are available for different tech stacks.

| Stack | Config | Description |
| :-: | :-- | :-- |
| ![javascript](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/javascript.png) | [@code-pushup](https://github.com/code-pushup/eslint-config/blob/main/docs/index.md) | Default config, suitable for any JavaScript/TypeScript project. |
| ![typescript](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/typescript.png) | [@code-pushup/eslint-config/typescript](https://github.com/code-pushup/eslint-config/blob/main/docs/typescript.md) | Config for strict TypeScript projects. |
| ![nodejs](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/nodejs.png) | [@code-pushup/eslint-config/node](https://github.com/code-pushup/eslint-config/blob/main/docs/node.md) | Config for Node.js projects. |
| ![jest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/jest.png) | [@code-pushup/eslint-config/jest](https://github.com/code-pushup/eslint-config/blob/main/docs/jest.md) | Config for projects using Jest for testing. |
| ![vitest](https://raw.githubusercontent.com/code-pushup/eslint-config/main/docs/icons/material/vitest.png) | [@code-pushup/eslint-config/vitest](https://github.com/code-pushup/eslint-config/blob/main/docs/vitest.md) | Config for projects using Vitest for testing. |

### 🧪 Test overrides

For non-production code, some rules are disabled (or downgraded from errors to warnings).

This applies to file paths matching any of the following globs:

- `*.spec.[jt]s?(x)`
- `*.test.[jt]s?(x)`
- `__tests__/**/*.[jt]s?(x)`
- `__mocks__/**/*.[jt]s?(x)`
- `*.cy.[jt]s?(x)`
- `*.stories.[jt]s?(x)`
- `*.mock.[jt]s?(x)`
- `*.e2e.[jt]s?(x)`
- `test/**/*.[jt]s?(x)`
- `tests/**/*.[jt]s?(x)`
- `mocks/**/*.[jt]s?(x)`
- `testing-utils/**/*.[jt]s?(x)`
- `test-utils/**/*.[jt]s?(x)`
- `fixtures/**/*.[jt]s?(x)`

<!-- end autogenerated -->
