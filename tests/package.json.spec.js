// @ts-check

import { satisfies } from 'compare-versions';
import { readFile } from 'node:fs/promises';
import { beforeAll, describe, expect, it } from 'vitest';

describe('package.json checks', () => {
  /** @type {{ devDependencies: Record<string, string>, peerDependencies: Record<string, string>, peerDependenciesMeta: Record<string, { optional?: boolean }> }} */
  let packageJson;
  /** @type {{ packages: Record<string, { version: string }> }} */
  let packageLockJson;

  /** @param {string} filePath */
  const readJson = async filePath => {
    const buffer = await readFile(filePath);
    return JSON.parse(buffer.toString('utf8'));
  };

  expect.extend({
    toSatisfyVersion(version, range, name) {
      const { isNot } = this;
      return {
        pass: satisfies(version, range),
        message: () =>
          `Version ${version} ${isNot ? 'does not satisfy' : 'satisfies'} range ${range}${
            name ? ` [package: ${name}]` : ''
          }`,
      };
    },
  });

  beforeAll(async () => {
    packageJson = await readJson('package.json');
    packageLockJson = await readJson('package-lock.json');
  });

  it('should include every eslint-related package as peer dependency', () => {
    const expected = Object.keys(packageJson.devDependencies)
      .filter(
        pkg =>
          (pkg.includes('eslint') || pkg === 'globals') &&
          !pkg.startsWith('@types/') &&
          !pkg.startsWith('@typescript-eslint/'), // installed via "typescript-eslint"
      )
      .sort();
    const received = Object.keys(packageJson.peerDependencies).sort();
    expect(received).toEqual(expected);
  });

  it('should have installed matching version for each peer dependency', () => {
    const peerDeps = Object.entries(packageJson.peerDependencies);
    expect.assertions(peerDeps.length);
    peerDeps.forEach(([pkg, version]) => {
      expect(
        packageLockJson.packages[`node_modules/${pkg}`].version,
      ).toSatisfyVersion(version, pkg);
    });
  });

  it('should mark peer dependency as optional if not included in default config', async () => {
    const { default: javascript } = await import('@code-pushup/eslint-config');
    const plugins = new Set(
      javascript.flatMap(config => Object.keys(config.plugins ?? {})),
    );
    const expected = Object.keys(packageJson.peerDependencies)
      .filter(pkg => {
        if (!pkg.includes('eslint-plugin')) {
          return false;
        }
        const alias = pkg.replace(/\/?eslint-plugin-?/, '');
        return !plugins.has(alias);
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
