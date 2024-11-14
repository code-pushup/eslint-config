// @ts-check

import { pluginIcon } from './plugins.js';

/**
 * @param {string} pkg
 * @returns {import('./types').Icon}
 */
export function packageIcon(pkg) {
  if (pkg === 'eslint' || pkg === '@eslint/js') {
    return 'material/eslint';
  }
  if (pkg === 'globals') {
    return 'icons8/global';
  }
  if (pkg.includes('eslint-plugin')) {
    const alias = pkg.replace(/eslint-plugin-?/, '').replace(/\/$/, '');
    return pluginIcon(alias);
  }
  if (pkg.endsWith('eslint')) {
    const pluginAlias = `@${pkg}`;
    return pluginIcon(pluginAlias);
  }
  if (pkg.startsWith('eslint-import-resolver')) {
    return pluginIcon('import');
  }
  throw new Error(`No icon found for package ${pkg}`);
}

/**
 * @param {string} pkg
 */
export function packageDocs(pkg) {
  return `https://www.npmjs.com/package/${pkg}`;
}

/**
 * @param {import('./types').PeerDep[]} peerDeps
 * @returns {import('./types').PeerDep[]}
 */
export function sortPeerDeps(peerDeps) {
  return Object.values(
    [...peerDeps]
      .sort((a, b) => {
        if (a.pkg === 'eslint') {
          return -1;
        }
        if (b.pkg === 'eslint') {
          return 1;
        }
        return Number(a.optional) - Number(b.optional);
      })
      .reduce(
        (acc, peerDep) => ({
          ...acc,
          [packageIcon(peerDep.pkg)]: [
            ...(acc[packageIcon(peerDep.pkg)] ?? []),
            peerDep,
          ],
        }),
        {},
      ),
  ).flat();
}

/** @param {string[]} packages */
export function abbreviatePackageList(packages) {
  const groups = packages.reduce((acc, pkg) => {
    if (pkg.startsWith('@')) {
      const prefix = pkg.slice(0, pkg.indexOf('/') + 1);
      return {
        ...acc,
        [prefix]: [...(acc[prefix] ?? []), pkg],
      };
    }
    const pluginPrefix = 'eslint-plugin-';
    if (pkg.startsWith(pluginPrefix)) {
      return {
        ...acc,
        [pluginPrefix]: [...(acc[pluginPrefix] ?? []), pkg],
      };
    }
    return acc;
  }, {});
  return packages
    .map(pkg => {
      const group = Object.entries(groups).find(([, packages]) =>
        packages.includes(pkg),
      );
      if (!group) {
        return pkg;
      }
      const [prefix, packages] = group;
      if (packages[0] !== pkg) {
        return null;
      }
      if (packages.length === 1) {
        return pkg;
      }
      return `${prefix}{${packages
        .map(pkg => pkg.slice(prefix.length))
        .join(',')}}`;
    })
    .filter(val => val != null)
    .join(' ');
}
