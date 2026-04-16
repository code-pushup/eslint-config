import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test as baseTest } from 'vitest';

/**
 * Vitest test with a per-test `tmp` fixture: a fresh temporary directory
 * that is automatically removed when the test settles.
 */
export const test = baseTest.extend<{ tmp: string }>({
  tmp: async ({ task: _task }, use) => {
    const dir = await mkdtemp(path.join(tmpdir(), 'create-eslint-config-'));
    await use(dir);
    await rm(dir, { recursive: true, force: true });
  },
});
