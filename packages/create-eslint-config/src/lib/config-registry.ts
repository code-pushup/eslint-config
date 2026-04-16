import type {
  ConfigDefinition,
  ConfigSlug,
  ProjectSnapshot,
  PeerDep,
} from './types.js';

const BACKEND_FRAMEWORKS = [
  'express',
  '@nestjs/core',
  '@apollo/server',
  'fastify',
  'next',
  '@angular/ssr',
  'nuxt',
  '@sveltejs/kit',
];

const GRAPHQL_SERVERS = ['@apollo/server', 'graphql-yoga', 'type-graphql'];

const JEST_CONFIG_PATTERN = /^jest\.config\.[mc]?[tj]s$/;
const VITEST_CONFIG_PATTERN = /^vi(test|te)\.config\.[mc]?[tj]s$/;
const CYPRESS_CONFIG_PATTERN = /^cypress\.config\.[mc]?[tj]s$/;

function hasAnyDep(snapshot: ProjectSnapshot, names: string[]): boolean {
  return names.some(name => snapshot.allDeps.has(name));
}

function hasAnyFile(snapshot: ProjectSnapshot, pattern: RegExp): boolean {
  return [...snapshot.files].some(file => pattern.test(file));
}

/** Toolchain peer dependencies installed whenever any slug is selected. */
export const BASE_PEER_DEPS: PeerDep[] = [
  { name: 'eslint', version: '^9.0.0' },
  { name: '@eslint/js', version: '^9.0.0' },
  {
    name: 'eslint-plugin-functional',
    version: '^7.0.0 || ^8.0.0 || ^9.0.0',
  },
  { name: 'eslint-plugin-import', version: '^2.31.0' },
  { name: 'eslint-plugin-promise', version: '>=6.4.0' },
  { name: 'eslint-plugin-sonarjs', version: '^1.0.4' },
  { name: 'eslint-plugin-unicorn', version: '>=50.0.0' },
  { name: 'globals', version: '>=14.0.0' },
  { name: 'typescript-eslint', version: '^8.0.0' },
];

export const CONFIG_REGISTRY: ConfigDefinition[] = [
  {
    slug: 'javascript',
    title: 'JavaScript (default)',
    peerDeps: [],
    isRecommended: () => true,
  },
  {
    slug: 'typescript',
    title: 'TypeScript (strict)',
    extends: 'javascript',
    peerDeps: [
      {
        name: 'eslint-import-resolver-typescript',
        version: '^3.0.0 || ^4.0.0',
      },
    ],
    isRecommended: snapshot =>
      snapshot.files.has('tsconfig.json') || snapshot.allDeps.has('typescript'),
  },
  {
    slug: 'node',
    title: 'Node.js',
    extends: 'javascript',
    peerDeps: [{ name: 'eslint-plugin-n', version: '>=17.0.0' }],
    isRecommended: snapshot => hasAnyDep(snapshot, BACKEND_FRAMEWORKS),
  },
  {
    slug: 'angular',
    title: 'Angular',
    extends: 'typescript',
    peerDeps: [
      {
        name: 'angular-eslint',
        version: '^18.0.0 || ^19.0.0 || ^20.0.0 || ^21.0.0',
      },
      { name: 'eslint-plugin-rxjs-x', version: '>=0.6.0' },
    ],
    isRecommended: snapshot => snapshot.allDeps.has('@angular/core'),
  },
  {
    slug: 'ngrx',
    title: 'Angular & NgRx',
    extends: 'angular',
    peerDeps: [
      {
        name: '@ngrx/eslint-plugin',
        version: '^18.0.0 || ^19.0.0 || ^20.0.0 || ^21.0.0',
      },
    ],
    isRecommended: snapshot => snapshot.allDeps.has('@ngrx/core'),
  },
  {
    slug: 'react',
    title: 'React',
    extends: 'javascript',
    peerDeps: [
      { name: 'eslint-plugin-react', version: '^7.36.0' },
      { name: 'eslint-plugin-react-hooks', version: '>=5.0.0' },
      { name: 'eslint-plugin-jsx-a11y', version: '^6.10.0' },
    ],
    isRecommended: snapshot => snapshot.allDeps.has('react'),
  },
  {
    slug: 'graphql',
    title: 'GraphQL (server)',
    extends: 'node',
    peerDeps: [
      {
        name: '@graphql-eslint/eslint-plugin',
        version: '^3.0.0 || ^4.0.0',
      },
    ],
    isRecommended: snapshot => hasAnyDep(snapshot, GRAPHQL_SERVERS),
  },
  {
    slug: 'jest',
    title: 'Jest',
    peerDeps: [{ name: 'eslint-plugin-jest', version: '^28.8.0 || ^29.0.0' }],
    isRecommended: snapshot =>
      snapshot.allDeps.has('jest') || hasAnyFile(snapshot, JEST_CONFIG_PATTERN),
  },
  {
    slug: 'vitest',
    title: 'Vitest',
    peerDeps: [{ name: '@vitest/eslint-plugin', version: '^1.1.9' }],
    isRecommended: snapshot =>
      snapshot.allDeps.has('vitest') ||
      hasAnyFile(snapshot, VITEST_CONFIG_PATTERN),
  },
  {
    slug: 'cypress',
    title: 'Cypress',
    peerDeps: [{ name: 'eslint-plugin-cypress', version: '>=3.3.0' }],
    isRecommended: snapshot =>
      snapshot.allDeps.has('cypress') ||
      hasAnyFile(snapshot, CYPRESS_CONFIG_PATTERN),
  },
  {
    slug: 'playwright',
    title: 'Playwright',
    peerDeps: [{ name: 'eslint-plugin-playwright', version: '^2.1.0' }],
    isRecommended: snapshot =>
      snapshot.allDeps.has('@playwright/test') ||
      snapshot.files.has('playwright.config.ts'),
  },
  {
    slug: 'storybook',
    title: 'Storybook',
    peerDeps: [{ name: 'eslint-plugin-storybook', version: '>=0.10.0' }],
    isRecommended: snapshot =>
      snapshot.allDeps.has('storybook') || snapshot.files.has('.storybook'),
  },
  {
    slug: 'react-testing-library',
    title: 'React Testing Library',
    peerDeps: [{ name: 'eslint-plugin-testing-library', version: '^7.1.1' }],
    isRecommended: snapshot => snapshot.allDeps.has('@testing-library/react'),
  },
];

export function findConfig(slug: ConfigSlug): ConfigDefinition | undefined {
  return CONFIG_REGISTRY.find(c => c.slug === slug);
}

export const ALL_SLUGS: ConfigSlug[] = CONFIG_REGISTRY.map(c => c.slug);

export function isConfigSlug(value: string): value is ConfigSlug {
  return (ALL_SLUGS as string[]).includes(value);
}

/** Deduplicates and realigns slugs to registry declaration order. */
export function normalizeSlugs(slugs: string[]): ConfigSlug[] {
  const set = new Set(slugs);
  return ALL_SLUGS.filter(slug => set.has(slug));
}

/** Selected slugs minus any that are ancestors of another selected slug. */
export function excludeAncestors(selected: ConfigSlug[]): ConfigSlug[] {
  const subsumed = new Set(selected.flatMap(collectAncestors));
  return normalizeSlugs(selected.filter(slug => !subsumed.has(slug)));
}

/** Selected slugs together with all of their ancestors. */
export function includeAncestors(selected: ConfigSlug[]): ConfigSlug[] {
  return normalizeSlugs(
    selected.flatMap(slug => [slug, ...collectAncestors(slug)]),
  );
}

/** CamelCase JS identifier for a slug. */
export function toIdentifier(slug: ConfigSlug): string {
  return slug.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());
}

function collectAncestors(slug: ConfigSlug): ConfigSlug[] {
  const parent = findConfig(slug)?.extends;
  return parent ? [parent, ...collectAncestors(parent)] : [];
}
