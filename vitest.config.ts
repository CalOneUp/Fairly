import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [
      'node_modules/**',
      'dist/**',
      'e2e/**', // exclude Playwright specs from Vitest
    ],
    setupFiles: [],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
