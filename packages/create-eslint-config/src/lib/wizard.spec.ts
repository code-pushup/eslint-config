import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { beforeEach, describe, expect, vi } from 'vitest';
import { test } from '../testing.js';
import type { FileChange } from './types.js';
import { runSetupWizard } from './wizard.js';

const { checkbox, input, select } = vi.hoisted(() => ({
  checkbox: vi.fn(),
  input: vi.fn(),
  select: vi.fn(),
}));

vi.mock('@inquirer/prompts', () => ({ checkbox, input, select }));

function findChange(files: FileChange[], name: string): FileChange | undefined {
  return files.find(f => f.path.endsWith(name));
}

function parseJson<T = Record<string, unknown>>(
  files: FileChange[],
  name: string,
): T {
  return JSON.parse(findChange(files, name)?.content ?? '{}') as T;
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
    const { files, manualSnippet } = await runSetupWizard({
      targetDir: tmp,
      yes: true,
    });
    const config = findChange(files, 'eslint.config.mjs');
    expect(config?.type).toBe('CREATE');
    expect(config?.content).toContain('defineConfig(');
    expect(manualSnippet).toBeUndefined();
  });

  test('should create eslint.config.js when type:module is set', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ type: 'module' }),
    );
    const { files } = await runSetupWizard({ targetDir: tmp, yes: true });
    expect(findChange(files, 'eslint.config.js')).toBeDefined();
    expect(findChange(files, 'eslint.config.mjs')).toBeUndefined();
  });

  test('should add deps to package.json', async ({ tmp }) => {
    const { files } = await runSetupWizard({ targetDir: tmp, yes: true });
    expect(findChange(files, 'package.json')?.type).toBe('CREATE');
    const pkg = parseJson<{ devDependencies?: Record<string, string> }>(
      files,
      'package.json',
    );
    expect(pkg.devDependencies?.eslint).toBeDefined();
    expect(pkg.devDependencies?.['@code-pushup/eslint-config']).toBeDefined();
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
    expect(findChange(files, 'package.json')?.type).toBe('UPDATE');
    const pkg = parseJson<{
      name: string;
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    }>(files, 'package.json');
    expect(pkg.name).toBe('demo');
    expect(pkg.scripts).toEqual({ test: 'vitest' });
    expect(pkg.devDependencies.vitest).toBe('1.0.0');
    expect(pkg.devDependencies.eslint).toBeDefined();
  });

  test('should return a snippet when an ESM config already exists', async ({
    tmp,
  }) => {
    await writeFile(
      path.join(tmp, 'package.json'),
      JSON.stringify({ type: 'module' }),
    );
    await writeFile(path.join(tmp, 'eslint.config.js'), 'export default [];');
    const { files, manualSnippet, manualSnippetPath } = await runSetupWizard({
      targetDir: tmp,
      yes: true,
    });
    expect(findChange(files, 'eslint.config.js')).toBeUndefined();
    expect(manualSnippet).toContain('defineConfig');
    expect(manualSnippetPath).toMatch(/eslint\.config\.js$/);
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
    const nv = findChange(files, '.node-version');
    expect(nv?.type).toBe('CREATE');
    expect(nv?.content).toBe('>=22.0.0\n');
  });

  test('should set engines.node when source is engines', async ({ tmp }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript', 'node'],
      nodeVersionSource: 'engines',
      nodeVersion: '>=20.0.0',
    });
    const pkg = parseJson<{ engines?: { node: string } }>(
      files,
      'package.json',
    );
    expect(pkg.engines?.node).toBe('>=20.0.0');
  });

  test('should include config-specific deps', async ({ tmp }) => {
    const { files } = await runSetupWizard({
      targetDir: tmp,
      configs: ['javascript', 'react'],
    });
    const pkg = parseJson<{ devDependencies?: Record<string, string> }>(
      files,
      'package.json',
    );
    expect(pkg.devDependencies?.['eslint-plugin-react']).toBeDefined();
  });
});
