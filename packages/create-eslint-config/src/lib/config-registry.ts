import { listAvailableConfigs } from './eslint-config-source.js';
import type { ConfigDefinition, ProjectSnapshot } from './types.js';

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

type ConfigMetadata = Omit<ConfigDefinition, 'slug'>;

const CONFIG_METADATA: Record<string, ConfigMetadata> = {
  javascript: {
    title: 'JavaScript (default)',
    isRecommended: () => true,
  },
  typescript: {
    title: 'TypeScript (strict)',
    extends: 'javascript',
    isRecommended: snapshot =>
      snapshot.files.has('tsconfig.json') || snapshot.allDeps.has('typescript'),
  },
  node: {
    title: 'Node.js',
    extends: 'javascript',
    isRecommended: snapshot => hasAnyDep(snapshot, BACKEND_FRAMEWORKS),
  },
  angular: {
    title: 'Angular',
    extends: 'typescript',
    isRecommended: snapshot => snapshot.allDeps.has('@angular/core'),
  },
  ngrx: {
    title: 'Angular & NgRx',
    extends: 'angular',
    isRecommended: snapshot => snapshot.allDeps.has('@ngrx/core'),
  },
  react: {
    title: 'React',
    extends: 'javascript',
    isRecommended: snapshot => snapshot.allDeps.has('react'),
  },
  graphql: {
    title: 'GraphQL (server)',
    extends: 'node',
    isRecommended: snapshot => hasAnyDep(snapshot, GRAPHQL_SERVERS),
  },
  jest: {
    title: 'Jest',
    isRecommended: snapshot =>
      snapshot.allDeps.has('jest') || hasAnyFile(snapshot, JEST_CONFIG_PATTERN),
  },
  vitest: {
    title: 'Vitest',
    isRecommended: snapshot =>
      snapshot.allDeps.has('vitest') ||
      hasAnyFile(snapshot, VITEST_CONFIG_PATTERN),
  },
  cypress: {
    title: 'Cypress',
    isRecommended: snapshot =>
      snapshot.allDeps.has('cypress') ||
      hasAnyFile(snapshot, CYPRESS_CONFIG_PATTERN),
  },
  playwright: {
    title: 'Playwright',
    isRecommended: snapshot =>
      snapshot.allDeps.has('@playwright/test') ||
      snapshot.files.has('playwright.config.ts'),
  },
  storybook: {
    title: 'Storybook',
    isRecommended: snapshot =>
      snapshot.allDeps.has('storybook') || snapshot.files.has('.storybook'),
  },
  'react-testing-library': {
    title: 'React Testing Library',
    isRecommended: snapshot => snapshot.allDeps.has('@testing-library/react'),
  },
};

const AVAILABLE_SLUGS = new Set(await listAvailableConfigs());
const METADATA_SLUGS = new Set(Object.keys(CONFIG_METADATA));
const KNOWN_SLUGS = [...METADATA_SLUGS.intersection(AVAILABLE_SLUGS)];
const UNKNOWN_SLUGS = [
  ...AVAILABLE_SLUGS.difference(METADATA_SLUGS),
].toSorted();

function slugToTitle(slug: string): string {
  return slug.replaceAll('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export const CONFIG_REGISTRY: ConfigDefinition[] = [
  ...KNOWN_SLUGS,
  ...UNKNOWN_SLUGS,
].map(slug => {
  const meta = CONFIG_METADATA[slug];
  return {
    slug,
    title: meta?.title ?? slugToTitle(slug),
    ...(meta?.extends && { extends: meta.extends }),
    isRecommended: meta?.isRecommended ?? (() => false),
  };
});

export const ALL_SLUGS: string[] = CONFIG_REGISTRY.map(c => c.slug);

export function findConfig(slug: string): ConfigDefinition | undefined {
  return CONFIG_REGISTRY.find(c => c.slug === slug);
}

export function isConfigSlug(value: string): boolean {
  return AVAILABLE_SLUGS.has(value);
}

/** Deduplicates and realigns slugs to registry declaration order. */
export function normalizeSlugs(slugs: string[]): string[] {
  const set = new Set(slugs);
  return ALL_SLUGS.filter(slug => set.has(slug));
}

/** Selected slugs minus any that are ancestors of another selected slug. */
export function excludeAncestors(selected: string[]): string[] {
  const subsumed = new Set(selected.flatMap(collectAncestors));
  return normalizeSlugs(selected.filter(slug => !subsumed.has(slug)));
}

/** Selected slugs together with all of their ancestors. */
export function includeAncestors(selected: string[]): string[] {
  return normalizeSlugs(
    selected.flatMap(slug => [slug, ...collectAncestors(slug)]),
  );
}

function collectAncestors(slug: string): string[] {
  const parent = findConfig(slug)?.extends;
  return parent ? [parent, ...collectAncestors(parent)] : [];
}
