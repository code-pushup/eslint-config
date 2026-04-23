import { describe, expect, it } from 'vitest';
import { isImportedFrom, resolvePeerDeps } from './peer-deps.js';

describe('isImportedFrom', () => {
  it('should match an exact-name import', () => {
    expect(
      isImportedFrom(`import x from 'eslint-plugin-n';`, 'eslint-plugin-n'),
    ).toBe(true);
  });

  it('should match a subpath import of the same package', () => {
    expect(
      isImportedFrom(`import { defineConfig } from 'eslint/config';`, 'eslint'),
    ).toBe(true);
  });

  it('should reject a name that is merely a prefix of another package', () => {
    expect(
      isImportedFrom(`import x from 'eslint-plugin-nx';`, 'eslint-plugin-n'),
    ).toBe(false);
  });

  it('should return false when the package is not imported', () => {
    expect(
      isImportedFrom(`import x from 'eslint-plugin-react';`, 'eslint-plugin-n'),
    ).toBe(false);
  });
});

describe('resolvePeerDeps', () => {
  it('should include required peer deps for any selection', async () => {
    await expect(resolvePeerDeps(['javascript'])).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint' }),
        expect.objectContaining({ name: 'globals' }),
        expect.objectContaining({ name: 'typescript-eslint' }),
      ]),
    );
  });

  it('should add the typescript resolver when typescript is selected', async () => {
    await expect(resolvePeerDeps(['typescript'])).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint-import-resolver-typescript' }),
      ]),
    );
  });

  it('should surface plugins registered by selected configs', async () => {
    await expect(resolvePeerDeps(['react'])).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint-plugin-react' }),
        expect.objectContaining({ name: 'eslint-plugin-react-hooks' }),
      ]),
    );
  });

  it('should include deps from extended configs', async () => {
    await expect(resolvePeerDeps(['ngrx'])).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'angular-eslint' }),
        expect.objectContaining({ name: '@ngrx/eslint-plugin' }),
      ]),
    );
  });

  it('should pin @code-pushup/eslint-config to a caret range of its installed version', async () => {
    await expect(resolvePeerDeps(['javascript'])).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: '@code-pushup/eslint-config',
          version: expect.stringMatching(/^\^\d+\.\d+\.\d+$/),
        }),
      ]),
    );
  });

  it('should omit optional deps not referenced by any selected config', async () => {
    await expect(resolvePeerDeps(['javascript'])).resolves.not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'angular-eslint' }),
        expect.objectContaining({ name: '@ngrx/eslint-plugin' }),
      ]),
    );
  });
});
