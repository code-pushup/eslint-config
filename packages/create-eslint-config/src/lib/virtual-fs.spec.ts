import { readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect } from 'vitest';
import { test } from '../test-setup.js';
import type { FileChange } from './types.js';
import { createTree } from './virtual-fs.js';

describe('createTree', () => {
  test('should stage writes without touching disk until flushed', async ({
    tmp,
  }) => {
    const tree = createTree(tmp);
    await tree.write('a.txt', 'alpha\n');
    await tree.write('b.txt', 'beta\n');

    await expect(
      readFile(path.join(tmp, 'a.txt'), 'utf8'),
    ).rejects.toMatchObject({ code: 'ENOENT' });

    await tree.flush();

    await expect(readFile(path.join(tmp, 'a.txt'), 'utf8')).resolves.toBe(
      'alpha\n',
    );
    await expect(readFile(path.join(tmp, 'b.txt'), 'utf8')).resolves.toBe(
      'beta\n',
    );
  });

  test('should create parent directories on flush', async ({ tmp }) => {
    const tree = createTree(tmp);
    await tree.write('nested/dir/file.txt', 'deep\n');
    await tree.flush();

    await expect(
      readFile(path.join(tmp, 'nested', 'dir', 'file.txt'), 'utf8'),
    ).resolves.toBe('deep\n');
  });

  test('should overwrite existing files on flush', async ({ tmp }) => {
    const filePath = path.join(tmp, 'existing.txt');
    await writeFile(filePath, 'old');

    const tree = createTree(tmp);
    await tree.write('existing.txt', 'new\n');
    await tree.flush();

    await expect(readFile(filePath, 'utf8')).resolves.toBe('new\n');
  });

  test('should list changes with relative paths and correct types', async ({
    tmp,
  }) => {
    await writeFile(path.join(tmp, 'existing.txt'), 'old');

    const tree = createTree(tmp);
    await tree.write('new.txt', 'hello\n');
    await tree.write('existing.txt', 'updated\n');

    expect(tree.listChanges()).toEqual(
      expect.arrayContaining<FileChange>([
        { path: 'new.txt', type: 'CREATE', content: 'hello\n' },
        { path: 'existing.txt', type: 'UPDATE', content: 'updated\n' },
      ]),
    );
  });

  test('should drain pending changes after flush', async ({ tmp }) => {
    const tree = createTree(tmp);
    await tree.write('a.txt', 'alpha\n');
    await tree.flush();

    expect(tree.listChanges()).toEqual([]);
  });

  test('should roll back a partial flush when one write fails', async ({
    tmp,
  }) => {
    const existingPath = path.join(tmp, 'existing.txt');
    const createdPath = path.join(tmp, 'created.txt');
    await writeFile(existingPath, 'original');

    const tree = createTree(tmp, {
      readFile,
      writeFile: async (filePath, content) => {
        if (filePath.endsWith('boom.txt')) {
          throw new Error('disk full');
        }
        await writeFile(filePath, content);
      },
      exists: filePath =>
        readFile(filePath, 'utf8').then(
          () => true,
          () => false,
        ),
      mkdir: async () => 'created',
      unlink,
    });

    await tree.write('existing.txt', 'updated');
    await tree.write('created.txt', 'new');
    await tree.write('boom.txt', 'never');

    await expect(tree.flush()).rejects.toThrow(/disk full/);

    await expect(readFile(existingPath, 'utf8')).resolves.toBe('original');
    await expect(readFile(createdPath, 'utf8')).rejects.toMatchObject({
      code: 'ENOENT',
    });
  });
});
