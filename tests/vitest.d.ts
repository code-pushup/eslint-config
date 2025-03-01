// eslint-disable-next-line import/no-unassigned-import
import 'vitest';

interface CustomMatchers<R = unknown> {
  toSatisfyVersion: (range: string, name: string) => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
