import { createRequire } from 'node:module';
import {
  BASE_PEER_DEPS,
  findConfig,
  includeAncestors,
} from './config-registry.js';
import type { PeerDep } from './types.js';

const { version: PACKAGE_VERSION } = createRequire(import.meta.url)(
  '../../package.json',
) as typeof import('../../package.json');

export function resolvePeerDeps(slugs: string[]): PeerDep[] {
  const configDeps = includeAncestors(slugs).flatMap(
    slug => findConfig(slug)?.peerDeps ?? [],
  );
  const all: PeerDep[] = [
    ...BASE_PEER_DEPS,
    ...configDeps,
    { name: '@code-pushup/eslint-config', version: `^${PACKAGE_VERSION}` },
  ];
  const seen = new Set<string>();
  return all.filter(dep => {
    if (seen.has(dep.name)) {
      return false;
    }
    seen.add(dep.name);
    return true;
  });
}
