import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['./src/__tests__/setup.ts'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // Add this to ensure path aliases work in tests
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
)
