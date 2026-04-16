import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { test } from '../testing.js';
import { collectAllDeps, fileExists, readJsonFile } from './utils.js';

describe('readJsonFile', () => {
  test('should parse a valid JSON file', async ({ tmp }) => {
    const filePath = path.join(tmp, 'pkg.json');
    await writeFile(filePath, JSON.stringify({ name: 'foo' }));
    await expect(readJsonFile(filePath)).resolves.toEqual({ name: 'foo' });
  });

  test('should return null for a missing file', async ({ tmp }) => {
    await expect(
      readJsonFile(path.join(tmp, 'missing.json')),
    ).resolves.toBeNull();
  });
});

describe('fileExists', () => {
  test('should return true for a file', async ({ tmp }) => {
    const filePath = path.join(tmp, 'exists.txt');
    await writeFile(filePath, '');
    await expect(fileExists(filePath)).resolves.toBe(true);
  });

  test('should return false for a missing path', async ({ tmp }) => {
    await expect(fileExists(path.join(tmp, 'missing.txt'))).resolves.toBe(
      false,
    );
  });

  test('should return false for a directory', async ({ tmp }) => {
    const dirPath = path.join(tmp, 'sub');
    await mkdir(dirPath);
    await expect(fileExists(dirPath)).resolves.toBe(false);
  });
});

describe('collectAllDeps', () => {
  it('should merge dependencies, devDependencies, and peerDependencies', () => {
    const deps = collectAllDeps({
      dependencies: { a: '1' },
      devDependencies: { b: '2' },
      peerDependencies: { c: '3' },
    });
    expect([...deps].toSorted()).toEqual(['a', 'b', 'c']);
  });

  it('should return an empty set for null input', () => {
    expect(collectAllDeps(null).size).toBe(0);
  });
});
