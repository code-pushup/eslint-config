import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { CONFIG_REGISTRY } from './config-registry.js';
import type {
  ExistingConfig,
  NodeVersionInfo,
  PackageJson,
  ProjectSnapshot,
} from './types.js';
import { collectAllDeps, isProjectEsm, readPackageJson } from './utils.js';

const TSCONFIG_PATTERN = /^tsconfig\..+\.json$/;
const ESLINT_CONFIG_PATTERN = /^eslint\.config\.[cm]?[jt]s$/;

export async function snapshotProject(
  targetDir: string,
): Promise<ProjectSnapshot> {
  const [packageJson, files] = await Promise.all([
    readPackageJson(targetDir),
    readdir(targetDir)
      .then(entries => new Set(entries))
      .catch(() => new Set<string>()),
  ]);
  const allDeps = collectAllDeps(packageJson);
  return { targetDir, packageJson, allDeps, files };
}

export function collectRecommendedConfigs(
  snapshot: ProjectSnapshot,
): Set<string> {
  return new Set(
    CONFIG_REGISTRY.filter(c => c.isRecommended(snapshot)).map(c => c.slug),
  );
}

export function detectTsconfigPath(files: Set<string>): string | undefined {
  if (files.has('tsconfig.json')) {
    return 'tsconfig.json';
  }
  return [...files].find(entry => TSCONFIG_PATTERN.test(entry));
}

/** Collects every Node version hint available: `.node-version` file and `engines.node`. */
export async function detectNodeVersionInfo(
  snapshot: ProjectSnapshot,
): Promise<NodeVersionInfo> {
  const file = await readNodeVersionFile(snapshot);
  const engines = snapshot.packageJson?.engines?.node;
  return {
    ...(file && { file }),
    ...(engines && { engines }),
  };
}

async function readNodeVersionFile(
  snapshot: ProjectSnapshot,
): Promise<string | undefined> {
  if (!snapshot.files.has('.node-version')) {
    return undefined;
  }
  const contents = await readFile(
    path.join(snapshot.targetDir, '.node-version'),
    'utf8',
  ).catch(() => null);
  return contents?.trim();
}

export async function detectExistingEslintConfig(
  snapshot: ProjectSnapshot,
): Promise<ExistingConfig | null> {
  const configFilename = [...snapshot.files].find(name =>
    ESLINT_CONFIG_PATTERN.test(name),
  );
  if (!configFilename) {
    return null;
  }
  return {
    path: path.join(snapshot.targetDir, configFilename),
    format: classifyFormat(configFilename, snapshot.packageJson),
  };
}

function classifyFormat(
  filename: string,
  packageJson: PackageJson | null,
): ExistingConfig['format'] {
  switch (path.extname(filename)) {
    case '.cjs':
    case '.cts':
      return 'cjs';
    case '.mjs':
    case '.mts':
      return 'esm';
    default:
      return isProjectEsm(packageJson) ? 'esm' : 'cjs';
  }
}
