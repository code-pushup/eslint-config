const { describe, expect, test } = require('@jest/globals');
const fs = require('fs/promises');
const path = require('path');
const { satisfies } = require('compare-versions');

describe('package.json checks', () => {
  /** @type {{ devDependencies: Record<string, string>, peerDependencies: Record<string, string>, peerDependenciesMeta: Record<string, { optional?: boolean }> }} */
  let packageJson;
  /** @type {{ packages: Record<string, { version: string }> }} */
  let packageLockJson;

  /** @param {string} filePath */
  const readJson = async filePath => {
    const buffer = await fs.readFile(filePath);
    return JSON.parse(buffer.toString('utf8'));
  };

  expect.extend({
    toSatisfyVersion: (version, range, name) => {
      if (satisfies(version, range)) {
        return {
          pass: true,
        };
      }
      return {
        pass: false,
        message: () =>
          `Version ${version} does not satisfy range ${range}` +
          (name ? ` [package: ${name}]` : ''),
      };
    },
  });

  beforeAll(async () => {
    packageJson = await readJson(path.join(__dirname, '..', 'package.json'));
    packageLockJson = await readJson(
      path.join(__dirname, '..', 'package-lock.json'),
    );
  });

  test('should include every eslint-related package as peer dependency', () => {
    const expected = Object.keys(packageJson.devDependencies)
      .filter(
        pkg =>
          pkg === 'eslint' ||
          pkg.startsWith('eslint-plugin-') ||
          (pkg.startsWith('@') && pkg.includes('/eslint-plugin')) ||
          pkg.includes('parser') ||
          pkg.startsWith('eslint-import-resolver-'),
      )
      .sort();
    const received = Object.keys(packageJson.peerDependencies).sort();
    expect(received).toEqual(expected);
  });

  test('should have installed matching version for each peer dependency', () => {
    const peerDeps = Object.entries(packageJson.peerDependencies);
    expect.assertions(peerDeps);
    peerDeps.forEach(([pkg, version]) => {
      expect(
        packageLockJson.packages[`node_modules/${pkg}`].version,
      ).toSatisfyVersion(version, pkg);
    });
  });

  test('should mark peer dependency as optional if not included in default config', () => {
    const defaultConfig = require('@code-pushup/eslint-config/legacy');
    const expected = Object.keys(packageJson.peerDependencies)
      .filter(pkg => {
        if (!pkg.includes('eslint-plugin')) {
          return false;
        }
        const alias = pkg.replace(/\/?eslint-plugin-?/, '');
        if (
          defaultConfig.extends.some(str => str.startsWith(`plugin:${alias}/`))
        ) {
          return false;
        }
        if (defaultConfig.plugins.includes(alias)) {
          return false;
        }
        return true;
      })
      .sort();
    const received = Object.entries(packageJson.peerDependenciesMeta)
      .filter(([, { optional }]) => optional)
      .filter(([pkg]) => pkg.includes('eslint-plugin'))
      .map(([pkg]) => pkg)
      .sort();
    expect(received).toEqual(expected);
  });
});
