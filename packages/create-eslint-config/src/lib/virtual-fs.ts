import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { FileChange, FileSystemAdapter, Tree } from './types.js';
import { fileExists } from './utils.js';

const DEFAULT_FS: FileSystemAdapter = {
  readFile,
  writeFile,
  exists: fileExists,
  mkdir,
};

// eslint-disable-next-line max-lines-per-function
export function createTree(
  root: string,
  fs: FileSystemAdapter = DEFAULT_FS,
): Tree {
  const pending = new Map<string, Omit<FileChange, 'path'>>();
  const resolve = (filePath: string): string => path.resolve(root, filePath);

  return {
    root,

    exists: async (filePath: string): Promise<boolean> =>
      pending.has(filePath) || fs.exists(resolve(filePath)),

    read: async (filePath: string): Promise<string | null> => {
      const entry = pending.get(filePath);
      if (entry) {
        return entry.content;
      }
      const absolute = resolve(filePath);
      if (!(await fs.exists(absolute))) {
        return null;
      }
      return fs.readFile(absolute, 'utf8');
    },

    write: async (filePath: string, content: string): Promise<void> => {
      const entry = pending.get(filePath);
      if (entry) {
        if (entry.content !== content) {
          pending.set(filePath, { ...entry, content });
        }
        return;
      }
      const absolute = resolve(filePath);
      const existing = await fs.readFile(absolute, 'utf8').catch(() => null);
      if (existing !== content) {
        pending.set(filePath, {
          content,
          type: existing == null ? 'CREATE' : 'UPDATE',
        });
      }
    },

    listChanges: (): FileChange[] =>
      [...pending.entries()].map(([filePath, { content, type }]) => ({
        path: filePath,
        type,
        content,
      })),

    async flush(): Promise<void> {
      await Promise.all(
        [...pending.entries()].map(async ([filePath, { content }]) => {
          const absolutePath = resolve(filePath);
          await fs.mkdir(path.dirname(absolutePath), { recursive: true });
          await fs.writeFile(absolutePath, content);
        }),
      );
      pending.clear();
    },
  };
}
