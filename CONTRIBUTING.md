# Contributing

## Setup

Prerequisites:

- Node.js installed (version specified in [`.node-version`](./.node-version))

Make sure to install dependencies:

```sh
npm install
```

## Development

Refer to docs on [how to run tasks in Nx](https://nx.dev/features/run-tasks).

Some examples:

```sh
# visualize project graph
npx nx graph

# run tests for all projects
npx nx run-many -t test

# run tests for a specific project
npx nx run eslint-config:test

# run lint for all projects
npx nx run-many -t lint

# run type check for all projects
npx nx run-many -t typecheck

# check formatting
npx nx format:check

# fix formatting
npx nx format:write

# generate docs for eslint-config
npx nx run eslint-config:docs
```

## Commits

This repository uses [conventional commits](https://www.conventionalcommits.org/). Commit messages are linted with [Commitlint](https://commitlint.js.org/) and must follow the format:

```
type(scope): description
```

Valid scopes correspond to Nx project names (e.g. `eslint-config`, `create-eslint-config`).

You can use [Commitizen](https://commitizen-tools.github.io/commitizen/) to create commits interactively:

```sh
npm run commit
```

## Releases

Releases are managed with [Nx release](https://nx.dev/features/manage-releases). Both packages are published together under the same version (fixed releases).

To create a release manually:

```sh
npx nx release
```

To preview a release without making changes:

```sh
npx nx release --dry-run
```
