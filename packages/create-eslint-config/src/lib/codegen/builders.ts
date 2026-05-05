import * as t from '@babel/types';
import recast from 'recast';
import babelTsParser from 'recast/parsers/babel-ts.js';
import { excludeAncestors } from '../config-registry.js';
import type {
  CodegenSetup,
  ImportDeclarationStructure,
  NodeSetup,
  TypescriptSetup,
} from '../types.js';
import { singleQuote } from '../utils.js';

export const PRESET_MODULE_PREFIX = '@code-pushup/eslint-config/';

export type FlatConfigEntry = {
  ast: t.SpreadElement | t.ObjectExpression;
  matches: (existing: t.Node) => boolean;
};

export function buildEntries(
  slugs: string[],
  setup: CodegenSetup,
  existingImports: Map<string, string>,
): FlatConfigEntry[] {
  return [
    ...excludeAncestors(slugs).map(slug =>
      buildPresetSpread(slug, existingImports),
    ),
    ...buildTypescriptEntries(setup.typescript),
    ...buildNodeEntries(setup.node),
  ];
}

export function buildImports(
  slugs: string[],
  setup: CodegenSetup,
): ImportDeclarationStructure[] {
  const presetImports: ImportDeclarationStructure[] = excludeAncestors(
    slugs,
  ).map(slug => ({
    moduleSpecifier: `${PRESET_MODULE_PREFIX}${slug}.js`,
    defaultImport: toIdentifier(slug),
  }));
  const extras: ImportDeclarationStructure[] =
    setup.node?.source === 'node-version'
      ? [{ moduleSpecifier: 'node:fs', defaultImport: 'fs' }]
      : [];
  return [...presetImports, ...extras].toSorted((a, b) =>
    a.moduleSpecifier.localeCompare(b.moduleSpecifier),
  );
}

export function buildImportDeclaration({
  moduleSpecifier,
  defaultImport,
  namedImports,
}: ImportDeclarationStructure): t.ImportDeclaration {
  const defaultSpec = defaultImport
    ? [t.importDefaultSpecifier(t.identifier(defaultImport))]
    : [];
  const namedSpecs = (namedImports ?? []).map(name =>
    t.importSpecifier(t.identifier(name), t.identifier(name)),
  );
  return t.importDeclaration(
    [...defaultSpec, ...namedSpecs],
    t.stringLiteral(moduleSpecifier),
  );
}

function buildPresetSpread(
  slug: string,
  existingImports: Map<string, string>,
): FlatConfigEntry {
  const localName =
    existingImports.get(`${PRESET_MODULE_PREFIX}${slug}.js::default`) ??
    toIdentifier(slug);
  return {
    ast: t.spreadElement(t.identifier(localName)),
    matches: existing =>
      t.isSpreadElement(existing) &&
      t.isIdentifier(existing.argument) &&
      existing.argument.name === localName,
  };
}

function buildTypescriptEntries(
  ts: TypescriptSetup | undefined,
): FlatConfigEntry[] {
  if (!ts) {
    return [];
  }
  const filesBlock = parseObjectExpression(`{
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }`);
  const settingsBlock = parseObjectExpression(`{
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ${singleQuote(ts.tsconfigPath)},
        },
      },
    },
  }`);
  return [filesBlock, settingsBlock].map(toObjectEntry);
}

/** Skips the `engines` source, since eslint-plugin-n reads engines.node from package.json directly. */
function buildNodeEntries(node: NodeSetup | undefined): FlatConfigEntry[] {
  if (!node || node.source === 'engines') {
    return [];
  }
  const versionExpression =
    node.source === 'node-version'
      ? `fs.readFileSync(${singleQuote('.node-version')}, ${singleQuote('utf8')}).trim()`
      : singleQuote(node.version);
  const block = parseObjectExpression(`{
    settings: {
      node: {
        version: ${versionExpression},
      },
    },
  }`);
  return [toObjectEntry(block)];
}

function toObjectEntry(ast: t.ObjectExpression): FlatConfigEntry {
  const shape = keyShape(ast);
  return {
    ast,
    matches: existing =>
      t.isObjectExpression(existing) && keyShape(existing) === shape,
  };
}

/** Keeps the option-block templates readable instead of nesting Babel builders. */
function parseObjectExpression(source: string): t.ObjectExpression {
  const file = recast.parse(`(${source});\n`, {
    parser: babelTsParser,
  }) as t.File;
  const statement = file.program.body[0] as t.ExpressionStatement;
  return statement.expression as t.ObjectExpression;
}

/** Sorted key paths only; values are ignored so user edits don't break dedup. */
function keyShape(objectLiteral: t.ObjectExpression): string {
  return collectPropertyKeys(objectLiteral, '').toSorted().join('|');
}

function collectPropertyKeys(
  objectLiteral: t.ObjectExpression,
  prefix: string,
): string[] {
  return objectLiteral.properties.flatMap(property => {
    if (!t.isObjectProperty(property)) {
      return [];
    }
    const key = getPropertyName(property.key);
    if (!key) {
      return [];
    }
    const propertyPath = prefix ? `${prefix}.${key}` : key;
    return t.isObjectExpression(property.value)
      ? [propertyPath, ...collectPropertyKeys(property.value, propertyPath)]
      : [propertyPath];
  });
}

function getPropertyName(node: t.Node): string | null {
  if (t.isIdentifier(node)) {
    return node.name;
  }
  if (t.isStringLiteral(node)) {
    return node.value;
  }
  return null;
}

function toIdentifier(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}
