import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { assert, beforeEach, describe, expect, vi } from 'vitest';
import { test } from '../test-setup.js';
import type { FileChange } from './types.js';
import { runSetupWizard } from './wizard.js';

const { checkbox, input, select } = vi.hoisted(() => ({
  checkbox: vi.fn(),
  input: vi.fn(),
  select: vi.fn(),
}));

vi.mock('@inquirer/prompts', () => ({ checkbox, input, select }));

function findChange(files: FileChange[], name: string): FileChange {
  const found = files.find(f => f.path.endsWith(name));
  assert(found, `expected file change ending with ${name}`);
  return found;
}

function parseJson<T = Record<string, unknown>>(
  files: FileChange[],
  name: string,
): T {
  return JSON.parse(findChange(files, name).content) as T;
}

describe('runSetupWizard', () => {
  beforeEach(() => {
    checkbox.mockReset();
    input.mockReset();
    select.mockReset();
  });

  test('should create eslint.config.mjs when type:module is not set', async ({
    tmp,
  }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      yes: true,
    });
    expect(files).toContainEqual(
      expect.objectContaining({
        path: 'eslint.config.mjs',
        type: 'CREATE',
        content: expect.stringContaining('defineConfig('),
      }),
    );
  });

  test('should create eslint.config.js when type:module is set', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ type: 'module' }),
    );
    const { files } = await runSetupWizard({ targetDir: tmp, yes: true });
    expect(files).toContainEqual(
      expect.objectContaining({ path: 'eslint.config.js' }),
    );
    expect(files).not.toContainEqual(
      expect.objectContaining({ path: 'eslint.config.mjs' }),
    );
  });

  test('should add deps to package.json', async ({ tmp }) => {
    const { files } = await runSetupWizard({ targetDir: tmp, yes: true });
    expect(files).toContainEqual(
      expect.objectContaining({ path: 'package.json', type: 'CREATE' }),
    );
    const packageJson = parseJson<{ devDependencies: Record<string, string> }>(
      files,
      'package.json',
    );
    expect(packageJson.devDependencies.eslint).toBeDefined();
    expect(
      packageJson.devDependencies['@code-pushup/eslint-config'],
    ).toBeDefined();
  });

  test('should update existing package.json while preserving other fields', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({
        name: 'demo',
        scripts: { test: 'vitest' },
        devDependencies: { vitest: '1.0.0' },
      }),
    );
    const { files } = await runSetupWizard({ targetDir: tmp, yes: true });
    expect(files).toContainEqual(
      expect.objectContaining({ path: 'package.json', type: 'UPDATE' }),
    );
    const packageJson = parseJson<{
      name: string;
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    }>(files, 'package.json');
    expect(packageJson.name).toBe('demo');
    expect(packageJson.scripts).toEqual({ test: 'vitest' });
    expect(packageJson.devDependencies.vitest).toBe('1.0.0');
    expect(packageJson.devDependencies.eslint).toBeDefined();
  });

  test('should not modify the eslint config when re-running with the same configs', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ type: 'module' }),
    );
    await writeFile(
      path.join(tmp, 'eslint.config.js'),
      [
        "import { defineConfig } from 'eslint/config';",
        '',
        'export default defineConfig();',
        '',
      ].join('\n'),
    );

    const first = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript'],
      yes: true,
    });
    await first.flush();

    const second = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript'],
      yes: true,
    });

    expect(second.files).not.toContainEqual(
      expect.objectContaining({ path: 'eslint.config.js' }),
    );
  });

  test('should throw and leave package.json untouched when the existing config has an unsupported shape', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ type: 'module' }),
    );
    await writeFile(
      path.join(tmp, 'eslint.config.js'),
      ['const config = [];', 'export default config;', ''].join('\n'),
    );
    const before = await readFile(path.join(tmp, 'package.json'), 'utf8');

    await expect(
      runSetupWizard({
        targetDir: tmp,
        configs: ['javascript'],
        yes: true,
      }),
    ).rejects.toThrow(/defineConfig/);

    const after = await readFile(path.join(tmp, 'package.json'), 'utf8');
    expect(after).toBe(before);
  });

  test('should throw when a CJS config is detected', async ({ tmp }) => {
    await writeFile(path.join(tmp, 'eslint.config.cjs'), 'module.exports=[];');
    await expect(runSetupWizard({ targetDir: tmp, yes: true })).rejects.toThrow(
      /ESM format/,
    );
  });

  test('should create .node-version when source is node-version', async ({
    tmp,
  }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript', 'node'],
      nodeVersionSource: 'node-version',
      nodeVersion: '>=22.0.0',
    });
    expect(files).toContainEqual({
      path: '.node-version',
      type: 'CREATE',
      content: '>=22.0.0\n',
    });
  });

  test('should set engines.node when source is engines', async ({ tmp }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript', 'node'],
      nodeVersionSource: 'engines',
      nodeVersion: '>=20.0.0',
    });
    const packageJson = parseJson<{ engines: { node: string } }>(
      files,
      'package.json',
    );
    expect(packageJson.engines.node).toBe('>=20.0.0');
  });

  test('should include config-specific deps', async ({ tmp }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript', 'react'],
    });
    const packageJson = parseJson<{ devDependencies: Record<string, string> }>(
      files,
      'package.json',
    );
    expect(packageJson.devDependencies['eslint-plugin-react']).toBeDefined();
  });
});
