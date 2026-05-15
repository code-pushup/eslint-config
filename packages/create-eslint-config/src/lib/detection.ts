import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { CONFIG_PRESETS } from './config-registry.js';
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

export function collectRecommendedSlugs(
  snapshot: ProjectSnapshot,
): Set<string> {
  return new Set(
    CONFIG_PRESETS.filter(p => p.isRecommended(snapshot)).map(p => p.slug),
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
  const candidates = [...snapshot.files]
    .filter(name => ESLINT_CONFIG_PATTERN.test(name))
    .map(name => ({
      name,
      format: classifyFormat(name, snapshot.packageJson),
    }));
  const chosen =
    candidates.find(({ format }) => format === 'esm') ?? candidates[0];
  if (!chosen) {
    return null;
  }
  return {
    path: path.join(snapshot.targetDir, chosen.name),
    format: chosen.format,
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
