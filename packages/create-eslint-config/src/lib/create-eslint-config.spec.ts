import { createEslintConfig } from './create-eslint-config';

describe('createEslintConfig', () => {
  it('should work', () => {
    expect(createEslintConfig()).toEqual('create-eslint-config');
  });
});
