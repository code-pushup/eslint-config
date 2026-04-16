# @code-pushup/create-eslint-config

[![npm](https://img.shields.io/npm/v/%40code-pushup%2Fcreate-eslint-config.svg)](https://www.npmjs.com/package/@code-pushup/create-eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Interactive setup wizard for [`@code-pushup/eslint-config`](../eslint-config/README.md).

## Usage

### Quick start

```sh
npm init @code-pushup/eslint-config
```

The wizard will:

1. Scan your project for installed packages and config files.
2. Prompt you to select which ESLint configs to include.
3. Ask follow-up questions for configs that need them.
4. Generate an `eslint.config.mjs` (or `.js` for ESM projects) with the selected presets.
5. Add all required peer dependencies to `package.json` and run install.

### Non-interactive

Use `--yes` to skip all prompts and accept detected defaults:

```sh
npm init @code-pushup/eslint-config -- --yes
```

### Options

| Option                      | Type                                             | Default       | Description                        |
| --------------------------- | ------------------------------------------------ | ------------- | ---------------------------------- |
| **`--configs`**             | `string[]`                                       |               | Configs to include                 |
| **`--tsconfig`**            | `string`                                         | auto-detected | Path to tsconfig                   |
| **`--node-version-source`** | `'node-version'` \| `'engines'` \| `'manual'`   | auto-detected | Where to read the Node version     |
| **`--node-version`**        | `string`                                         |               | Node version range (e.g. `>=20.0.0`) |
| **`--dry-run`**             | `boolean`                                        | `false`       | Preview changes without writing    |
| **`--yes`**, `-y`           | `boolean`                                        | `false`       | Skip prompts and use defaults      |

### Programmatic API

```ts
import { runSetupWizard } from '@code-pushup/create-eslint-config';

const result = await runSetupWizard({
  targetDir: process.cwd(),
  yes: true,
});

// result.files   pending file changes (relative paths)
// result.flush() write all changes to disk
```

## Available configs

| Slug                     | Detected when                                      |
| ------------------------ | -------------------------------------------------- |
| `javascript`             | Always recommended                                 |
| `typescript`             | `tsconfig.json` exists or `typescript` is installed |
| `node`                   | Backend/full-stack framework is installed           |
| `angular`                | `@angular/core` is installed                       |
| `ngrx`                   | `@ngrx/core` is installed                          |
| `react`                  | `react` is installed                               |
| `graphql`                | GraphQL server package is installed                |
| `jest`                   | `jest` is installed or config file exists           |
| `vitest`                 | `vitest` is installed or config file exists         |
| `cypress`                | `cypress` is installed or config file exists        |
| `playwright`             | `@playwright/test` is installed or config exists   |
| `storybook`              | `storybook` is installed or `.storybook` exists    |
| `react-testing-library`  | `@testing-library/react` is installed              |

Configs follow an inheritance hierarchy. Selecting a child preset subsumes its parent. For example, picking `typescript` automatically includes `javascript`.
