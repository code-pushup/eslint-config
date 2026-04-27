import { excludeAncestors } from './config-registry.js';
import type {
  CodegenSetup,
  ImportDeclarationStructure,
  NodeSetup,
  PackageJson,
  PeerDep,
  TypescriptSetup,
} from './types.js';
import { singleQuote } from './utils.js';

export class CodeBuilder {
  private lines: string[] = [];

  addLine(text: string, depth = 0): void {
    this.lines.push(`${'  '.repeat(depth)}${text}`);
  }

  addLines(texts: string[], depth = 0): void {
    texts.forEach(text => {
      this.addLine(text, depth);
    });
  }

  addEmptyLine(): void {
    this.lines.push('');
  }

  toString(): string {
    return `${this.lines.join('\n')}\n`;
  }
}

/**
 * Generates a complete `eslint.config.(m)js` for a fresh project. Parent
 * presets are subsumed (e.g., picking `typescript` drops `javascript`).
 */
export function generateEslintConfigSource(
  slugs: string[],
  setup: CodegenSetup = {},
): string {
  const effective = excludeAncestors(slugs);
  const imports = collectImports(effective, setup);
  const entries = formatConfigEntries(effective, setup);
  const builder = new CodeBuilder();

  builder.addLines(imports.map(formatImport));
  builder.addLine(
    formatImport({
      moduleSpecifier: 'eslint/config',
      namedImports: ['defineConfig'],
    }),
  );
  builder.addEmptyLine();
  builder.addLine('export default defineConfig(');
  builder.addLines(entries, 1);
  builder.addLine(');');

  return builder.toString();
}

/**
 * Generates imports and config entries to paste into an existing
 * `eslint.config.*`. TODO: drop once the wizard can merge into existing configs.
 */
export function generateEslintConfigSnippet(
  slugs: string[],
  setup: CodegenSetup = {},
): string {
  const effective = excludeAncestors(slugs);
  const imports = collectImports(effective, setup);
  const entries = formatConfigEntries(effective, setup);
  const builder = new CodeBuilder();

  builder.addLines(imports.map(formatImport));
  builder.addEmptyLine();
  builder.addLine(
    '// Add these entries inside your defineConfig(...) call (or flat config array):',
  );
  builder.addLines(entries);

  return builder.toString();
}

function collectImports(
  slugs: string[],
  setup: CodegenSetup,
): ImportDeclarationStructure[] {
  const imports: ImportDeclarationStructure[] = slugs.map(slug => ({
    moduleSpecifier: `@code-pushup/eslint-config/${slug}.js`,
    defaultImport: toIdentifier(slug),
  }));
  if (setup.node?.source === 'node-version') {
    imports.push({ moduleSpecifier: 'node:fs', defaultImport: 'fs' });
  }
  return sortImports(imports);
}

function formatConfigEntries(slugs: string[], setup: CodegenSetup): string[] {
  return [
    ...slugs.map(slug => `...${toIdentifier(slug)},`),
    ...typescriptEntries(setup.typescript),
    ...nodeEntry(setup.node),
  ];
}

function formatImport({
  moduleSpecifier,
  defaultImport,
  namedImports,
}: ImportDeclarationStructure): string {
  const named = namedImports?.length ? `{ ${namedImports.join(', ')} }` : '';
  const bindings = [defaultImport, named].filter(Boolean).join(', ');
  const from = bindings ? `${bindings} from ` : '';
  return `import ${from}${singleQuote(moduleSpecifier)};`;
}

function sortImports(
  imports: ImportDeclarationStructure[],
): ImportDeclarationStructure[] {
  return imports.toSorted((a, b) =>
    a.moduleSpecifier.localeCompare(b.moduleSpecifier),
  );
}

function typescriptEntries(ts: TypescriptSetup | undefined): string[] {
  if (!ts) {
    return [];
  }
  return [
    '{',
    `  files: [${singleQuote('**/*.ts')}],`,
    '  languageOptions: {',
    '    parserOptions: {',
    '      projectService: true,',
    '      tsconfigRootDir: import.meta.dirname,',
    '    },',
    '  },',
    '},',
    '{',
    '  settings: {',
    `    ${singleQuote('import/resolver')}: {`,
    '      typescript: {',
    '        alwaysTryTypes: true,',
    `        project: ${singleQuote(ts.tsconfigPath)},`,
    '      },',
    '    },',
    '  },',
    '},',
  ];
}

/**
 * Emits the settings.node.version block. Returns empty for the engines
 * source, which eslint-plugin-n reads from package.json directly.
 */
function nodeEntry(node: NodeSetup | undefined): string[] {
  if (!node || node.source === 'engines') {
    return [];
  }
  return [
    '{',
    '  settings: {',
    '    node: {',
    `      version: ${nodeVersionExpression(node)},`,
    '    },',
    '  },',
    '},',
  ];
}

function nodeVersionExpression(node: NodeSetup): string {
  if (node.source === 'node-version') {
    return `${readFileSyncCall('.node-version')}.trim()`;
  }
  return singleQuote(node.version);
}

function readFileSyncCall(filePath: string): string {
  return `fs.readFileSync(${singleQuote(filePath)}, ${singleQuote('utf8')})`;
}

/** CamelCase JS identifier for a slug. */
function toIdentifier(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());
}

export function generatePackageJson(
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
