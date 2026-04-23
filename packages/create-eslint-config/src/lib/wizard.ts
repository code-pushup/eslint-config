import path from 'node:path';
import {
  generateEslintConfigSnippet,
  generateEslintConfigSource,
  generatePackageJson,
} from './codegen.js';
import { detectExistingEslintConfig, snapshotProject } from './detection.js';
import { resolvePeerDeps } from './peer-deps.js';
import { collectFollowUps, promptConfigSelection } from './prompts.js';
import type { PackageJson, WizardOptions, WizardResult } from './types.js';
import { isProjectEsm } from './utils.js';
import { createTree } from './virtual-fs.js';

export async function runSetupWizard(
  options: WizardOptions,
): Promise<WizardResult> {
  const targetDir = path.resolve(options.targetDir);
  const normalized = { ...options, targetDir };

  const snapshot = await snapshotProject(targetDir);

  const existingConfig = await detectExistingEslintConfig(snapshot);
  if (existingConfig?.format === 'cjs') {
    throw new Error('Only ESLint configs in ESM format are supported.');
  }

  const configs = await promptConfigSelection(normalized, snapshot);
  const followUps = await collectFollowUps(configs, normalized, snapshot);

  const deps = await resolvePeerDeps(configs);

  const tree = createTree(targetDir);
  await tree.write(
    'package.json',
    generatePackageJson(
      JSON.parse((await tree.read('package.json')) ?? '{}') as PackageJson,
      deps,
      followUps,
    ),
  );
  if (followUps.node?.source === 'node-version') {
    await tree.write('.node-version', `${followUps.node.version}\n`);
  }
  if (!existingConfig) {
    await tree.write(
      isProjectEsm(snapshot.packageJson)
        ? 'eslint.config.js'
        : 'eslint.config.mjs',
      generateEslintConfigSource(configs, followUps),
    );
  }

  // TODO: merge into existing config instead of returning a snippet
  return {
    root: tree.root,
    files: tree.listChanges(),
    flush: () => tree.flush(),
    ...(existingConfig && {
      manualSnippet: generateEslintConfigSnippet(configs, followUps),
      manualSnippetPath: existingConfig.path,
    }),
  };
}
