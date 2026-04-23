import { includeAncestors } from './config-registry.js';
import { loadConfigSource, packageJson } from './eslint-config-source.js';
import type { PeerDep } from './types.js';

const { peerDependencies, peerDependenciesMeta, version } = packageJson;

export async function resolvePeerDeps(slugs: string[]): Promise<PeerDep[]> {
  const expanded = includeAncestors(slugs);
  const importedNames = new Set(
    (await Promise.all(expanded.map(collectImportedPeers))).flat(),
  );
  const isOptional = (name: string): boolean =>
    peerDependenciesMeta?.[name]?.optional === true;
  const isCodegenRequired = (name: string): boolean =>
    expanded.includes('typescript') &&
    name === 'eslint-import-resolver-typescript';

  return [
    ...Object.entries(peerDependencies)
      .filter(
        ([name]) =>
          !isOptional(name) ||
          importedNames.has(name) ||
          isCodegenRequired(name),
      )
      .map(([name, range]) => ({ name, version: range })),
    { name: '@code-pushup/eslint-config', version: `^${version}` },
  ];
}

async function collectImportedPeers(slug: string): Promise<string[]> {
  const source = await loadConfigSource(slug);
  return Object.keys(peerDependencies).filter(name =>
    isImportedFrom(source, name),
  );
}

export function isImportedFrom(source: string, packageName: string): boolean {
  return (
    source.includes(`from '${packageName}'`) ||
    source.includes(`from '${packageName}/`)
  );
}
