import path from 'node:path';
import {
  generateEslintConfig,
  extendPackageJson,
  extendEslintConfig,
} from './codegen/index.js';
import { detectExistingEslintConfig, snapshotProject } from './detection.js';
import { WizardError } from './errors.js';
import { resolvePeerDeps } from './peer-deps.js';
import {
  collectFollowUps,
  promptConfigSelection,
  validateConfigSlugs,
} from './prompts.js';
import type {
  LoadedEslintConfig,
  ProjectSnapshot,
  Tree,
  WizardOptions,
  WizardResult,
} from './types.js';
import { isProjectEsm } from './utils.js';
import { createTree } from './virtual-fs.js';

export async function runSetupWizard(
  options: WizardOptions,
): Promise<WizardResult> {
  if (options.configs) {
    validateConfigSlugs(options.configs);
  }
  const targetDir = path.resolve(options.targetDir);
  const normalized = { ...options, targetDir };

  const snapshot = await snapshotProject(targetDir);
  const tree = createTree(targetDir);
  const existingConfig = await loadExistingEslintConfig(tree, snapshot);

  const configs = await promptConfigSelection(normalized, snapshot);
  const followUps = await collectFollowUps(configs, normalized, snapshot);

  const eslintConfigPath = existingConfig
    ? existingConfig.relativePath
    : isProjectEsm(snapshot.packageJson)
      ? 'eslint.config.js'
      : 'eslint.config.mjs';

  const eslintConfigSource = existingConfig
    ? await extendEslintConfig(
        existingConfig.source,
        configs,
        followUps,
        targetDir,
      )
    : await generateEslintConfig(configs, followUps, targetDir);

  await tree.write(
    'package.json',
    extendPackageJson(
      snapshot.packageJson ?? {},
      resolvePeerDeps(configs),
      followUps,
    ),
  );
  if (followUps.node?.source === 'node-version') {
    await tree.write('.node-version', `${followUps.node.version}\n`);
  }
  await tree.write(eslintConfigPath, eslintConfigSource);

  return {
    root: tree.root,
    files: tree.listChanges(),
    flush: () => tree.flush(),
  };
}

async function loadExistingEslintConfig(
  tree: Tree,
  snapshot: ProjectSnapshot,
): Promise<LoadedEslintConfig | null> {
  const detected = await detectExistingEslintConfig(snapshot);
  if (detected == null) {
    return null;
  }
  if (detected.format === 'cjs') {
    throw new WizardError(
      'Failed to extend existing eslint config: only ESM format is supported.',
    );
  }
  const relativePath = path.relative(tree.root, detected.path);
  const source = await tree.read(relativePath);
  if (source == null) {
    throw new WizardError(
      `Failed to read existing eslint config at ${relativePath}.`,
    );
  }
  return { source, relativePath };
}
