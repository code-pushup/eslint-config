import type { FileChange } from './types.js';

export function logInfo(...lines: string[]): void {
  console.info('');
  console.info(lines.join('\n'));
}

export function logError(...lines: string[]): void {
  console.error('');
  console.error('Error:', lines.join('\n'));
}

export function logChanges(files: FileChange[]): void {
  if (files.length === 0) {
    logInfo('No file changes — your project is already in sync.');
    return;
  }
  logInfo(...files.map(change => `${change.type} ${change.path}`));
}

export function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
