import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    reporters: [['default', { summary: false }]],
    coverage: {
      include: ['src/**/*.js'],
      reporter: ['text', 'lcov'],
    },
  },
});
