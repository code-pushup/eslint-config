import { describe, expect, it } from 'vitest';
import { resolvePeerDeps } from './peer-deps.js';

describe('resolvePeerDeps', () => {
  it('should always include eslint, globals, and typescript-eslint', () => {
    expect(resolvePeerDeps(['javascript'])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint' }),
        expect.objectContaining({ name: 'globals' }),
        expect.objectContaining({ name: 'typescript-eslint' }),
      ]),
    );
  });

  it('should add the typescript resolver when typescript is selected', () => {
    expect(resolvePeerDeps(['typescript'])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint-import-resolver-typescript' }),
      ]),
    );
  });

  it('should surface plugins registered by selected configs', () => {
    expect(resolvePeerDeps(['react'])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'eslint-plugin-react' }),
        expect.objectContaining({ name: 'eslint-plugin-react-hooks' }),
      ]),
    );
  });

  it('should pull in ancestor deps when a descendant is selected', () => {
    expect(resolvePeerDeps(['ngrx'])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'angular-eslint' }),
        expect.objectContaining({ name: '@ngrx/eslint-plugin' }),
      ]),
    );
  });

  it('should pin @code-pushup/eslint-config to a caret range of the installed version', () => {
    expect(resolvePeerDeps(['javascript'])).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: '@code-pushup/eslint-config',
          version: expect.stringMatching(/^\^\d+\.\d+\.\d+$/),
        }),
      ]),
    );
  });

  it('should omit plugins from configs that were not selected', () => {
    expect(resolvePeerDeps(['javascript'])).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'angular-eslint' }),
        expect.objectContaining({ name: '@ngrx/eslint-plugin' }),
      ]),
    );
  });
});
