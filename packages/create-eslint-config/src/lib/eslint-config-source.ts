import { readdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

type EslintConfigPackageJson = {
  peerDependencies: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  version: string;
};

const require_ = createRequire(import.meta.url);

/** Path to sibling eslint-config's package.json; resolves in monorepo and installed layouts. */
const PACKAGE_JSON_PATH = require_.resolve(
  '../../../eslint-config/package.json',
);
const PACKAGE_ROOT = path.dirname(PACKAGE_JSON_PATH);
const CONFIGS_DIR = path.join(PACKAGE_ROOT, 'src/configs');

/** Parsed contents of eslint-config's package.json. */
export const packageJson = require_(
  PACKAGE_JSON_PATH,
) as EslintConfigPackageJson;

/** Lists slugs for every config file shipped by the eslint-config package. */
export async function listAvailableConfigs(): Promise<string[]> {
  const entries = await readdir(CONFIGS_DIR);
  return entries
    .filter(name => name.endsWith('.js'))
    .map(name => name.replace(/\.js$/, ''));
}

/** Reads a config file's source text (used to introspect imports without loading the module). */
export async function loadConfigSource(slug: string): Promise<string> {
  return readFile(path.join(CONFIGS_DIR, `${slug}.js`), 'utf8');
}
