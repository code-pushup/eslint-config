import {
  generateEslintConfigSnippet,
  generateEslintConfigSource,
} from './codegen.js';

describe('generateEslintConfigSource', () => {
  it('should render a javascript-only config', () => {
    const source = generateEslintConfigSource(['javascript']);
    expect(source).toMatchInlineSnapshot(`
      "import javascript from '@code-pushup/eslint-config/javascript.js';
      import { defineConfig } from 'eslint/config';

      export default defineConfig(
        ...javascript,
      );
      "
    `);
  });

  it('should render a typescript config with the tsconfig block', () => {
    const source = generateEslintConfigSource(['javascript', 'typescript'], {
      typescript: { tsconfigPath: 'tsconfig.json' },
    });
    expect(source).toMatchInlineSnapshot(`
      "import typescript from '@code-pushup/eslint-config/typescript.js';
      import { defineConfig } from 'eslint/config';

      export default defineConfig(
        ...typescript,
        {
          files: ['**/*.ts'],
          languageOptions: {
            parserOptions: {
              projectService: true,
              tsconfigRootDir: import.meta.dirname,
            },
          },
        },
        {
          settings: {
            'import/resolver': {
              typescript: {
                alwaysTryTypes: true,
                project: 'tsconfig.json',
              },
            },
          },
        },
      );
      "
    `);
  });

  it('should render a node config with a manually entered version', () => {
    const source = generateEslintConfigSource(['javascript', 'node'], {
      node: { source: 'manual', version: '>=20.0.0' },
    });
    expect(source).toContain("version: '>=20.0.0'");
    expect(source).not.toContain('import fs');
  });

  it('should render a node config reading from .node-version', () => {
    const source = generateEslintConfigSource(['javascript', 'node'], {
      node: { source: 'node-version', version: '22.1.0' },
    });
    expect(source).toContain("import fs from 'node:fs';");
    expect(source).toContain("fs.readFileSync('.node-version', 'utf8').trim()");
  });

  it('should skip the settings.node block when engines.node is used', () => {
    const source = generateEslintConfigSource(['javascript', 'node'], {
      node: { source: 'engines', version: '>=18' },
    });
    expect(source).not.toContain('settings');
    expect(source).not.toContain('import fs');
  });

  it('should camelCase hyphenated slugs into valid JS identifiers', () => {
    const source = generateEslintConfigSource(['react-testing-library']);
    expect(source).toContain(
      "import reactTestingLibrary from '@code-pushup/eslint-config/react-testing-library.js';",
    );
    expect(source).toContain('...reactTestingLibrary,');
  });

  it('should sort spreads in registry order regardless of input order', () => {
    const a = generateEslintConfigSource([
      'vitest',
      'javascript',
      'typescript',
    ]);
    const b = generateEslintConfigSource([
      'javascript',
      'typescript',
      'vitest',
    ]);
    expect(a).toBe(b);
    expect(a.indexOf('...javascript')).toBeLessThan(a.indexOf('...typescript'));
    expect(a.indexOf('...typescript')).toBeLessThan(a.indexOf('...vitest'));
  });
});

describe('generateEslintConfigSnippet', () => {
  it('should render only the body portion without defineConfig wrapper', () => {
    const snippet = generateEslintConfigSnippet(['javascript', 'vitest']);
    expect(snippet).toMatchInlineSnapshot(`
      "import javascript from '@code-pushup/eslint-config/javascript.js';
      import vitest from '@code-pushup/eslint-config/vitest.js';

      // Add these entries inside your defineConfig(...) call (or flat config array):
      ...javascript,
      ...vitest,
      "
    `);
  });
});
