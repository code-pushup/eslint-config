import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  promptConfigSelection,
  promptNodeSetup,
  promptTypescriptSetup,
  validateConfigSlugs,
} from './prompts.js';
import type { ProjectSnapshot } from './types.js';

const { checkbox, input, select } = vi.hoisted(() => ({
  checkbox: vi.fn(),
  input: vi.fn(),
  select: vi.fn(),
}));

vi.mock('@inquirer/prompts', () => ({ checkbox, input, select }));

const makeSnapshot = (
  overrides: Partial<ProjectSnapshot> = {},
): ProjectSnapshot => ({
  targetDir: '/test',
  packageJson: null,
  allDeps: new Set(),
  files: new Set(),
  ...overrides,
});

describe('promptConfigSelection', () => {
  beforeEach(() => {
    checkbox.mockReset();
    input.mockReset();
    select.mockReset();
  });

  it('should bypass the prompt when --configs is provided', async () => {
    await expect(
      promptConfigSelection(
        { targetDir: '/x', configs: ['javascript', 'react'] },
        makeSnapshot(),
      ),
    ).resolves.toEqual(['javascript', 'react']);
    expect(checkbox).not.toHaveBeenCalled();
  });

  it('should not force javascript when --configs omits it', async () => {
    await expect(
      promptConfigSelection(
        { targetDir: '/x', configs: ['react'] },
        makeSnapshot(),
      ),
    ).resolves.toEqual(['react']);
  });

  it('should return recommended set when --yes is passed', async () => {
    await expect(
      promptConfigSelection(
        { targetDir: '/x', yes: true },
        makeSnapshot({
          files: new Set(['tsconfig.json']),
          allDeps: new Set(['vitest']),
        }),
      ),
    ).resolves.toEqual(['javascript', 'typescript', 'vitest']);
    expect(checkbox).not.toHaveBeenCalled();
  });

  it('should return only what the user selected when prompting', async () => {
    checkbox.mockResolvedValueOnce(['react']);
    await expect(
      promptConfigSelection({ targetDir: '/x' }, makeSnapshot()),
    ).resolves.toEqual(['react']);
  });
});

describe('promptTypescriptSetup', () => {
  it('should use --tsconfig when provided', async () => {
    await expect(
      promptTypescriptSetup(
        { targetDir: '/x', tsconfig: 'custom.json' },
        makeSnapshot(),
      ),
    ).resolves.toEqual({ tsconfigPath: 'custom.json' });
    expect(input).not.toHaveBeenCalled();
  });

  it('should default to tsconfig.json when prompting is skipped', async () => {
    await expect(
      promptTypescriptSetup({ targetDir: '/x', yes: true }, makeSnapshot()),
    ).resolves.toEqual({ tsconfigPath: 'tsconfig.json' });
  });
});

describe('promptNodeSetup', () => {
  it('should use CLI flags when fully specified', async () => {
    await expect(
      promptNodeSetup(
        {
          targetDir: '/x',
          nodeVersionSource: 'manual',
          nodeVersion: '>=20.0.0',
        },
        makeSnapshot(),
      ),
    ).resolves.toEqual({ source: 'manual', version: '>=20.0.0' });
    expect(select).not.toHaveBeenCalled();
  });

  it('should fall back to the running Node version when no flag is set', async () => {
    await expect(
      promptNodeSetup(
        { targetDir: '/x', nodeVersionSource: 'manual', yes: true },
        makeSnapshot(),
      ),
    ).resolves.toEqual({
      source: 'manual',
      version: process.versions.node,
    });
  });

  it('should prompt when --yes is not set', async () => {
    select.mockResolvedValueOnce('manual');
    input.mockResolvedValueOnce('>=22.0.0');
    await expect(
      promptNodeSetup({ targetDir: '/x' }, makeSnapshot()),
    ).resolves.toEqual({
      source: 'manual',
      version: '>=22.0.0',
    });
  });
});

describe('validateConfigSlugs', () => {
  it('should accept known slugs', () => {
    expect(validateConfigSlugs(['javascript', 'react'])).toEqual([
      'javascript',
      'react',
    ]);
  });

  it('should throw on unknown slugs', () => {
    expect(() => validateConfigSlugs(['unknown'])).toThrow(/Unknown configs/);
  });
});
