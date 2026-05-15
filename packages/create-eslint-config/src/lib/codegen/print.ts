import { createRequire } from 'node:module';
import path from 'node:path';
import type * as t from '@babel/types';
import recast from 'recast';

const PRINT_OPTIONS: recast.Options = {
  quote: 'single',
  tabWidth: 2,
  trailingComma: true,
};

type LineEnding = 'lf' | 'crlf';

type PrettierModule = {
  format: (source: string, options: Record<string, unknown>) => Promise<string>;
  resolveConfig: (path: string) => Promise<Record<string, unknown> | null>;
};

export function detectLineEnding(source: string): LineEnding {
  return source.includes('\r\n') ? 'crlf' : 'lf';
}

export async function finalize(
  file: t.File,
  lineEnding: LineEnding = 'lf',
  targetDir?: string,
): Promise<string> {
  const printed = stripBlankLinesInsideBlocks(
    recast.print(file, PRINT_OPTIONS).code,
  );
  const prettier = await loadPrettier(targetDir);
  const formatted = prettier
    ? await runPrettier(prettier, printed, lineEnding, targetDir)
    : ensureTrailingNewline(printed);
  return lineEnding === 'crlf'
    ? formatted.replace(/\r?\n/g, '\r\n')
    : formatted;
}

async function runPrettier(
  prettier: PrettierModule,
  source: string,
  lineEnding: LineEnding,
  targetDir: string | undefined,
): Promise<string> {
  const config = await prettier.resolveConfig(targetDir ?? process.cwd());
  return prettier.format(source, {
    ...config,
    parser: 'babel-ts',
    singleQuote: config?.singleQuote ?? true,
    trailingComma: config?.trailingComma ?? 'all',
    endOfLine: lineEnding,
  });
}

/**
 * Recast occasionally emits a blank line between properties of freshly built
 * object literals; collapse blank lines whose preceding line is indented
 * (i.e. lives inside a brace or bracket). Top-level blank lines are preserved.
 */
function stripBlankLinesInsideBlocks(source: string): string {
  return source.replace(/^([ \t]+[^\n]*)\n[ \t]*\n/gm, '$1\n');
}

function ensureTrailingNewline(source: string): string {
  return source.endsWith('\n') ? source : `${source}\n`;
}

async function loadPrettier(
  targetDir: string | undefined,
): Promise<PrettierModule | null> {
  const anchor = targetDir
    ? path.join(targetDir, 'package.json')
    : import.meta.url;
  try {
    const require = createRequire(anchor);
    const resolved = require.resolve('prettier');
    return (await import(resolved)) as PrettierModule;
  } catch {
    return null;
  }
}
