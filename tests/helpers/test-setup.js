import { execSync } from 'node:child_process';

export function setup() {
  execSync('npm link');
  execSync('npm link @code-pushup/eslint-config');
}

export function teardown() {
  execSync('npm unlink @code-pushup/eslint-config');
}
