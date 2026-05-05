import { WizardError } from '../errors.js';
import type { CodegenSetup, PackageJson, PeerDep } from '../types.js';
import { applyEntries, findMergeTarget, parseSource } from './merge-target.js';
import { detectLineEnding, finalize } from './print.js';

const BASE_CONFIG_TEMPLATE =
  "import { defineConfig } from 'eslint/config';\nexport default defineConfig();\n";

/** Subsumes parent presets, so picking `typescript` drops `javascript`. */
export async function generateEslintConfig(
  slugs: string[],
  setup: CodegenSetup = {},
  targetDir?: string,
): Promise<string> {
  const file = parseSource(BASE_CONFIG_TEMPLATE);
  const target = findMergeTarget(file);
  if (!target) {
    throw new Error('base config template did not produce a mergeable shape');
  }
  applyEntries(target, slugs, setup);
  return finalize(file, 'lf', targetDir);
}

/** Throws WizardError if the export isn't `defineConfig(...)`, `tseslint.config(...)`, or `[...]`. */
export async function extendEslintConfig(
  source: string,
  slugs: string[],
  setup: CodegenSetup = {},
  targetDir?: string,
): Promise<string> {
  const file = parseSource(source);
  const target = findMergeTarget(file);
  if (!target) {
    throw new WizardError(
      'Cannot extend the existing eslint config: only defineConfig(...), tseslint.config(...), and array-literal default exports are supported.',
    );
  }
  applyEntries(target, slugs, setup);
  return finalize(file, detectLineEnding(source), targetDir);
}

export function extendPackageJson(
  current: PackageJson,
  deps: PeerDep[],
  followUps: CodegenSetup,
): string {
  const updated: PackageJson = {
    ...current,
    devDependencies: {
      ...current.devDependencies,
      ...Object.fromEntries(deps.map(dep => [dep.name, dep.version])),
    },
  };
  if (followUps.node?.source === 'engines') {
    updated.engines = { ...current.engines, node: followUps.node.version };
  }
  return `${JSON.stringify(updated, null, 2)}\n`;
}
