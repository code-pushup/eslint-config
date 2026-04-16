import type { FileChange } from './types.js';

/** Logs lines to stdout, preceded by a blank line. */
export function logInfo(...lines: string[]): void {
  console.info('');
  console.info(lines.join('\n'));
}

/** Logs lines to stderr, preceded by a blank line. */
export function logError(...lines: string[]): void {
  console.error('');
  console.error(lines.join('\n'));
}

/** Logs each file change, or a no-op message when there are none. */
export function printChanges(files: FileChange[]): void {
  if (files.length === 0) {
    logInfo('No file changes — your project is already in sync.');
    return;
  }
  logInfo(...files.map(change => `${change.type} ${change.path}`));
}

export function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
