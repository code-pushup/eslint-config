import { describe, expect, it } from 'vitest';
import { WizardError } from '../errors.js';
import { generateEslintConfig, extendEslintConfig } from './index.js';

describe('generateEslintConfig', () => {
  it('should render a javascript-only config', async () => {
    const source = await generateEslintConfig(['javascript']);
    expect(source).toMatchInlineSnapshot(`
      "import { defineConfig } from 'eslint/config';
      import javascript from '@code-pushup/eslint-config/javascript.js';
      export default defineConfig(...javascript);
      "
    `);
  });

  it('should render a typescript config with the tsconfig block', async () => {
    const source = await generateEslintConfig(['javascript', 'typescript'], {
      typescript: { tsconfigPath: 'tsconfig.json' },
    });
    expect(source).toMatchInlineSnapshot(`
      "import { defineConfig } from 'eslint/config';
      import typescript from '@code-pushup/eslint-config/typescript.js';
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

  it('should render a node config with a manually entered version', async () => {
    const source = await generateEslintConfig(['javascript', 'node'], {
      node: { source: 'manual', version: '>=20.0.0' },
    });
    expect(source).toContain("version: '>=20.0.0'");
    expect(source).not.toContain('import fs');
  });

  it('should render a node config reading from .node-version', async () => {
    const source = await generateEslintConfig(['javascript', 'node'], {
      node: { source: 'node-version', version: '22.1.0' },
    });
    expect(source).toContain("import fs from 'node:fs';");
    expect(source).toContain("fs.readFileSync('.node-version', 'utf8').trim()");
  });

  it('should skip the settings.node block when engines.node is used', async () => {
    const source = await generateEslintConfig(['javascript', 'node'], {
      node: { source: 'engines', version: '>=18' },
    });
    expect(source).not.toContain('settings');
    expect(source).not.toContain('import fs');
  });

  it('should camelCase hyphenated slugs into valid JS identifiers', async () => {
    const source = await generateEslintConfig(['react-testing-library']);
    expect(source).toContain(
      "import reactTestingLibrary from '@code-pushup/eslint-config/react-testing-library.js';",
    );
    expect(source).toContain('...reactTestingLibrary');
  });

  it('should sort spreads in registry order regardless of input order', async () => {
    const a = await generateEslintConfig([
      'vitest',
      'javascript',
      'typescript',
    ]);
    const b = await generateEslintConfig([
      'javascript',
      'typescript',
      'vitest',
    ]);
    expect(a).toBe(b);
    expect(a.indexOf('...javascript')).toBeLessThan(a.indexOf('...typescript'));
    expect(a.indexOf('...typescript')).toBeLessThan(a.indexOf('...vitest'));
  });
});

describe('extendEslintConfig', () => {
  it('should append imports and entries to an existing defineConfig call', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig(',
      "  { rules: { 'no-console': 'warn' } },",
      ');',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
        "import { defineConfig } from 'eslint/config';

        import javascript from '@code-pushup/eslint-config/javascript.js';

        export default defineConfig({ rules: { 'no-console': 'warn' } }, ...javascript);
        "
      `);
  });

  it('should append imports and entries to an existing tseslint.config call', async () => {
    const source = [
      "import tseslint from 'typescript-eslint';",
      '',
      'export default tseslint.config(',
      "  { rules: { 'no-console': 'warn' } },",
      ');',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
        "import tseslint from 'typescript-eslint';

        import javascript from '@code-pushup/eslint-config/javascript.js';

        export default tseslint.config(
          { rules: { 'no-console': 'warn' } },
          ...javascript,
        );
        "
      `);
  });

  it('should append entries to an array-literal default export', async () => {
    const source = [
      'export default [',
      '  {',
      "    files: ['**/*.js'],",
      '  },',
      '];',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
        "import javascript from '@code-pushup/eslint-config/javascript.js';
        export default [
          {
            files: ['**/*.js'],
          },
          ...javascript,
        ];
        "
      `);
  });

  it('should leave the file unchanged when re-merging the same configs', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig();',
      '',
    ].join('\n');

    const first = await extendEslintConfig(source, ['javascript', 'vitest']);
    expect(first).toMatchInlineSnapshot(`
      "import { defineConfig } from 'eslint/config';

      import javascript from '@code-pushup/eslint-config/javascript.js';
      import vitest from '@code-pushup/eslint-config/vitest.js';

      export default defineConfig(...javascript, ...vitest);
      "
    `);
    await expect(
      extendEslintConfig(first, ['javascript', 'vitest']),
    ).resolves.toBe(first);
  });

  it('should not duplicate typescript option blocks when re-merging', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig();',
      '',
    ].join('\n');
    const setup = { typescript: { tsconfigPath: 'tsconfig.json' } };

    const first = await extendEslintConfig(source, ['typescript'], setup);
    expect(first).toMatchInlineSnapshot(`
      "import { defineConfig } from 'eslint/config';

      import typescript from '@code-pushup/eslint-config/typescript.js';

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
    await expect(
      extendEslintConfig(first, ['typescript'], setup),
    ).resolves.toBe(first);
  });

  it('should treat option blocks with the same keys as duplicates regardless of values', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig();',
      '',
    ].join('\n');
    const setup = { typescript: { tsconfigPath: 'tsconfig.json' } };

    const initial = await extendEslintConfig(source, ['typescript'], setup);
    const userEdited = initial.replace(
      "project: 'tsconfig.json'",
      "project: 'tsconfig.lib.json'",
    );

    await expect(
      extendEslintConfig(userEdited, ['typescript'], setup),
    ).resolves.toBe(userEdited);
  });

  it('should preserve user comments outside the inserted regions', async () => {
    const source = [
      '// my project rules',
      "import { defineConfig } from 'eslint/config';",
      '',
      '// keep this comment',
      'export default defineConfig(',
      '  // entry comment',
      "  { rules: { 'no-console': 'warn' } },",
      ');',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
        "// my project rules
        import { defineConfig } from 'eslint/config';

        import javascript from '@code-pushup/eslint-config/javascript.js';

        // keep this comment
        export default defineConfig(
          // entry comment
          { rules: { 'no-console': 'warn' } },
          ...javascript,
        );
        "
      `);
  });

  it('should throw WizardError for export shapes that are not arrays or known helpers', async () => {
    const source = ['const config = [];', 'export default config;', ''].join(
      '\n',
    );
    await expect(extendEslintConfig(source, ['javascript'])).rejects.toThrow(
      /only defineConfig/,
    );
    await expect(
      extendEslintConfig(source, ['javascript']),
    ).rejects.toBeInstanceOf(WizardError);
  });

  it('should throw WizardError for syntactically invalid sources', async () => {
    await expect(
      extendEslintConfig('export default defineConfig(', ['javascript']),
    ).rejects.toThrow(/syntax error/);
  });

  it('should reuse an existing aliased import instead of duplicating it', async () => {
    const source = [
      "import jsConfig from '@code-pushup/eslint-config/javascript.js';",
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig(',
      '  ...jsConfig,',
      ');',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
        "import jsConfig from '@code-pushup/eslint-config/javascript.js';
        import { defineConfig } from 'eslint/config';

        export default defineConfig(...jsConfig);
        "
      `);
  });

  it('should handle a trailing inline comment when the last entry lacks a comma', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig(',
      "  { rules: { 'no-console': 'warn' } }",
      '  // trailing note',
      ');',
      '',
    ].join('\n');

    await expect(extendEslintConfig(source, ['javascript'])).resolves
      .toMatchInlineSnapshot(`
      "import { defineConfig } from 'eslint/config';

      import javascript from '@code-pushup/eslint-config/javascript.js';

      export default defineConfig(
        // trailing note
        { rules: { 'no-console': 'warn' } },
        ...javascript,
      );
      "
    `);
  });

  it('should preserve CRLF line endings when the source uses CRLF', async () => {
    const source = [
      "import { defineConfig } from 'eslint/config';",
      '',
      'export default defineConfig();',
      '',
    ].join('\r\n');

    const merged = await extendEslintConfig(source, ['javascript']);
    expect(merged).toContain('\r\n');
    expect(merged).not.toMatch(/[^\r]\n/);
  });
});
