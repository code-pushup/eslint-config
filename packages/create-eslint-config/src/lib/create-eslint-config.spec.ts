import { createEslintConfig } from './create-eslint-config.js';

describe('createEslintConfig', () => {
  it('should work', () => {
    expect(createEslintConfig()).toBe('create-eslint-config');
  });
});
