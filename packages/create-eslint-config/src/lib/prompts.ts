import { checkbox, input as inputPrompt, select } from '@inquirer/prompts';
import semver from 'semver';
import {
  ALL_SLUGS,
  CONFIG_REGISTRY,
  isConfigSlug,
  normalizeSlugs,
} from './config-registry.js';
import {
  collectRecommendedConfigs,
  detectNodeVersionInfo,
  detectTsconfigPath,
} from './detection.js';
import { WizardError } from './errors.js';
import type {
  CodegenSetup,
  NodeSetup,
  NodeVersionSource,
  NodeVersionSourceOption,
  ProjectSnapshot,
  TypescriptSetup,
  WizardOptions,
} from './types.js';

/** Selects configs interactively or falls back to recommended/provided ones. */
export async function promptConfigSelection(
  options: WizardOptions,
  snapshot: ProjectSnapshot,
): Promise<string[]> {
  if (options.configs && options.configs.length > 0) {
    return normalizeSlugs(options.configs);
  }
  const recommended = collectRecommendedConfigs(snapshot);
  if (options.yes) {
    return normalizeSlugs([...recommended]);
  }
  const selected = await checkbox<string>({
    message: 'Configurations to set up:',
    required: true,
    choices: CONFIG_REGISTRY.map(config => ({
      name: config.title,
      value: config.slug,
      checked: recommended.has(config.slug),
    })),
  });
  return normalizeSlugs(selected);
}

/** Resolves the tsconfig path from flags, detection, or a prompt. */
export async function promptTypescriptSetup(
  options: WizardOptions,
  snapshot: ProjectSnapshot,
): Promise<TypescriptSetup> {
  if (options.tsconfig) {
    return { tsconfigPath: options.tsconfig };
  }
  const detectedPath = detectTsconfigPath(snapshot.files);
  const defaultPath = detectedPath ?? 'tsconfig.json';
  if (options.yes) {
    return { tsconfigPath: defaultPath };
  }
  const tsconfigPath = await inputPrompt({
    message: 'Path to tsconfig:',
    default: defaultPath,
  });
  return { tsconfigPath };
}

/** Resolves the Node version source and value from flags, detection, or prompts. */
export async function promptNodeSetup(
  options: WizardOptions,
  snapshot: ProjectSnapshot,
): Promise<NodeSetup> {
  const nodeInfo = await detectNodeVersionInfo(snapshot);
  const sources: NodeVersionSourceOption[] = [
    {
      value: 'node-version',
      name: 'Use .node-version file',
      detected: nodeInfo.file,
    },
    {
      value: 'engines',
      name: 'Use engines.node from package.json',
      detected: nodeInfo.engines,
    },
    { value: 'manual', name: 'Enter a version range manually' },
  ];
  const defaultSource = sources.find(s => s.detected)?.value ?? 'manual';

  const source =
    options.nodeVersionSource ??
    (options.yes
      ? defaultSource
      : await select<NodeVersionSource>({
          message: 'Node version source:',
          choices: sources.map(({ value, name }) => ({ value, name })),
          default: defaultSource,
        }));

  const detectedVersion = sources.find(s => s.value === source)?.detected;
  const defaultVersion = process.versions.node;

  const version =
    options.nodeVersion ??
    detectedVersion ??
    (options.yes
      ? defaultVersion
      : await inputPrompt({
          message: 'Node version range (e.g. >=24):',
          default: defaultVersion,
          validate: value =>
            semver.validRange(value) ? true : 'Invalid semver range.',
        }));

  return { source, version };
}

/** Collects follow-up inputs for configs that need them (typescript, node). */
export async function collectFollowUps(
  selected: string[],
  options: WizardOptions,
  snapshot: ProjectSnapshot,
): Promise<CodegenSetup> {
  const set = new Set(selected);
  const typescript = set.has('typescript')
    ? await promptTypescriptSetup(options, snapshot)
    : undefined;
  const node = set.has('node')
    ? await promptNodeSetup(options, snapshot)
    : undefined;
  return { typescript, node };
}

export function validateConfigSlugs(slugs: string[]): string[] {
  const valid = slugs.filter(isConfigSlug);
  if (valid.length < slugs.length) {
    const invalid = slugs.filter(slug => !isConfigSlug(slug));
    throw new WizardError(
      `Failed to resolve config slugs: unknown ${invalid.join(', ')}. Available: ${ALL_SLUGS.join(', ')}.`,
    );
  }
  return valid;
}
