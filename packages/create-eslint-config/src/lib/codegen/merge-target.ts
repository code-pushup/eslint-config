import * as t from '@babel/types';
import recast from 'recast';
import babelTsParser from 'recast/parsers/babel-ts.js';
import { WizardError } from '../errors.js';
import type { CodegenSetup, ImportDeclarationStructure } from '../types.js';
import {
  buildEntries,
  buildImportDeclaration,
  buildImports,
  type FlatConfigEntry,
} from './builders.js';

type HelperPattern =
  | { kind: 'function'; module: string; importedName: string }
  | { kind: 'method'; module: string; method: string };

const SUPPORTED_HELPERS: HelperPattern[] = [
  { kind: 'function', module: 'eslint/config', importedName: 'defineConfig' },
  { kind: 'method', module: 'typescript-eslint', method: 'config' },
];

export type MergeTarget = {
  program: t.Program;
  hasEntry: (predicate: (existing: t.Node) => boolean) => boolean;
  push: (entry: t.SpreadElement | t.ObjectExpression) => void;
};

export function parseSource(source: string): t.File {
  try {
    return recast.parse(source, { parser: babelTsParser }) as t.File;
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    throw new WizardError(
      `Cannot extend the existing eslint config: syntax error (${details}).`,
    );
  }
}

/** Returns null if the default export isn't `defineConfig(...)`, `tseslint.config(...)`, or `[...]`. */
export function findMergeTarget(file: t.File): MergeTarget | null {
  const exportDefault = file.program.body.find(t.isExportDefaultDeclaration);
  const expression = exportDefault?.declaration;
  if (!expression) {
    return null;
  }
  if (t.isArrayExpression(expression)) {
    return {
      program: file.program,
      hasEntry: predicate =>
        expression.elements.some(e => e != null && predicate(e)),
      push: entry => expression.elements.push(entry),
    };
  }
  if (
    t.isCallExpression(expression) &&
    isSupportedHelperCall(file, expression)
  ) {
    return {
      program: file.program,
      hasEntry: predicate => expression.arguments.some(predicate),
      push: entry => expression.arguments.push(entry),
    };
  }
  return null;
}

export function applyEntries(
  target: MergeTarget,
  slugs: string[],
  setup: CodegenSetup,
): void {
  const existingImports = collectExistingImports(target.program);
  const newImports = filterNewImports(
    buildImports(slugs, setup),
    existingImports,
  );
  insertImports(target.program, newImports);

  const newEntries = filterNewEntries(
    buildEntries(slugs, setup, existingImports),
    target,
  );
  newEntries.forEach(entry => target.push(entry.ast));
}

function isSupportedHelperCall(
  file: t.File,
  expression: t.CallExpression,
): boolean {
  return SUPPORTED_HELPERS.some(helper =>
    matchesHelperCall(file, expression, helper),
  );
}

function matchesHelperCall(
  file: t.File,
  expression: t.CallExpression,
  helper: HelperPattern,
): boolean {
  const { callee } = expression;
  if (helper.kind === 'function') {
    if (!t.isIdentifier(callee)) {
      return false;
    }
    const localName = findLocalImportName(
      file.program,
      helper.module,
      helper.importedName,
    );
    return localName != null && callee.name === localName;
  }
  if (
    !t.isMemberExpression(callee) ||
    callee.computed ||
    !t.isIdentifier(callee.object) ||
    !t.isIdentifier(callee.property) ||
    callee.property.name !== helper.method
  ) {
    return false;
  }
  const localName = findLocalImportName(file.program, helper.module, 'default');
  return localName != null && callee.object.name === localName;
}

function findLocalImportName(
  program: t.Program,
  moduleSpecifier: string,
  importedName: string,
): string | null {
  const declaration = program.body
    .filter(t.isImportDeclaration)
    .find(decl => decl.source.value === moduleSpecifier);
  if (!declaration) {
    return null;
  }
  const specifier = declaration.specifiers.find(
    spec => getImportedName(spec) === importedName,
  );
  return specifier?.local.name ?? null;
}

function getImportedName(
  specifier: t.ImportDeclaration['specifiers'][number],
): string {
  if (
    t.isImportDefaultSpecifier(specifier) ||
    t.isImportNamespaceSpecifier(specifier)
  ) {
    return 'default';
  }
  const { imported } = specifier;
  return t.isIdentifier(imported) ? imported.name : imported.value;
}

/** Map keyed as `${moduleSpecifier}::${importedName}` to local name. */
function collectExistingImports(program: t.Program): Map<string, string> {
  return new Map(
    program.body
      .filter(t.isImportDeclaration)
      .flatMap(declaration =>
        declaration.specifiers.map(
          specifier =>
            [
              `${declaration.source.value}::${getImportedName(specifier)}`,
              specifier.local.name,
            ] as const,
        ),
      ),
  );
}

function filterNewImports(
  candidates: ImportDeclarationStructure[],
  existingImports: Map<string, string>,
): ImportDeclarationStructure[] {
  return candidates.filter(
    ({ moduleSpecifier, defaultImport, namedImports }) => {
      const importedName = defaultImport
        ? 'default'
        : (namedImports?.[0] ?? 'default');
      return !existingImports.has(`${moduleSpecifier}::${importedName}`);
    },
  );
}

function insertImports(
  program: t.Program,
  newImports: ImportDeclarationStructure[],
): void {
  if (newImports.length === 0) {
    return;
  }
  const declarations = newImports.map(buildImportDeclaration);
  const lastImportIdx = program.body.findLastIndex(t.isImportDeclaration);
  const insertAt = lastImportIdx === -1 ? 0 : lastImportIdx + 1;
  program.body.splice(insertAt, 0, ...declarations);
}

function filterNewEntries(
  candidates: FlatConfigEntry[],
  target: MergeTarget,
): FlatConfigEntry[] {
  return candidates.filter(
    candidate => !target.hasEntry(existing => candidate.matches(existing)),
  );
}
