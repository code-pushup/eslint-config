export type PeerDep = {
  name: string;
  version: string;
};

export type PackageJson = {
  name?: string;
  version?: string;
  type?: 'module' | 'commonjs';
  packageManager?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  engines?: { node?: string };
};

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export type FileChange = {
  path: string;
  type: 'CREATE' | 'UPDATE';
  content: string;
};

export const NODE_VERSION_SOURCES = [
  'node-version',
  'engines',
  'manual',
] as const;

export type NodeVersionSource = (typeof NODE_VERSION_SOURCES)[number];

export type ProjectSnapshot = {
  targetDir: string;
  packageJson: PackageJson | null;
  allDeps: Set<string>;
  files: Set<string>;
};

export type NodeVersionInfo = {
  file?: string;
  engines?: string;
};

export type ExistingConfig = {
  path: string;
  format: 'esm' | 'cjs';
};

export type ConfigDefinition = {
  slug: string;
  title: string;
  extends?: string;
  isRecommended: (snapshot: ProjectSnapshot) => boolean;
};

export type TypescriptSetup = {
  tsconfigPath: string;
};

export type NodeSetup = {
  source: NodeVersionSource;
  version: string;
};

export type CodegenSetup = {
  typescript?: TypescriptSetup;
  node?: NodeSetup;
};

export type ImportDeclarationStructure = {
  moduleSpecifier: string;
  defaultImport?: string;
  namedImports?: string[];
};

export type FileSystemAdapter = {
  readFile: (path: string, encoding: 'utf8') => Promise<string>;
  writeFile: (path: string, content: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
  mkdir: (
    path: string,
    options: { recursive: true },
  ) => Promise<string | undefined>;
};

export type Tree = {
  root: string;
  exists: (filePath: string) => Promise<boolean>;
  read: (filePath: string) => Promise<string | null>;
  write: (filePath: string, content: string) => Promise<void>;
  listChanges: () => FileChange[];
  flush: () => Promise<void>;
};

export type WizardOptions = {
  targetDir: string;
  configs?: string[];
  tsconfig?: string;
  nodeVersionSource?: NodeVersionSource;
  nodeVersion?: string;
  yes?: boolean;
};

/**
 * Return shape of `runSetupWizard`. `files` paths are relative to `root`;
 * call `flush()` to persist all pending changes to disk.
 *
 * TODO: once the wizard can merge into existing configs, drop
 * `manualSnippet` and `manualSnippetPath` and collapse this type.
 */
export type WizardResult = {
  root: string;
  files: FileChange[];
  flush: () => Promise<void>;
  manualSnippet?: string;
  manualSnippetPath?: string;
};
