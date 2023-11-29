const { pluginIcon } = require('./plugins');

/**
 * @param {string} pkg
 * @returns {import('./types').Icon}
 */
function packageIcon(pkg) {
  if (pkg === 'eslint') {
    return 'material/eslint';
  }
  if (pkg.includes('eslint-plugin')) {
    const alias = pkg.replace(/eslint-plugin-?/, '').replace(/\/$/, '');
    return pluginIcon(alias);
  }
  if (pkg.includes('parser')) {
    const pluginAlias = pkg.replace(/-?parser/, '').replace(/\/$/, '');
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
function packageDocs(pkg) {
  return `https://www.npmjs.com/package/${pkg}`;
}

/**
 * @param {import('./types').PeerDep[]} peerDeps
 */
function sortPeerDeps(peerDeps) {
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

module.exports = {
  packageIcon,
  packageDocs,
  sortPeerDeps,
};
