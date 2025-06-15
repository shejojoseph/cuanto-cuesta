// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
