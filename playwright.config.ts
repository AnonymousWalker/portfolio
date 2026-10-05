import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'

const previewUrl = `http://127.0.0.1:4173${process.env.PLAYWRIGHT_BASE_PATH || '/'}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: previewUrl,
    colorScheme: 'light',
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined),
    },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    env: { VITE_BASE_PATH: process.env.PLAYWRIGHT_BASE_PATH || '/' },
    url: previewUrl,
    reuseExistingServer: !process.env.CI,
  },
})
