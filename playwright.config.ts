import { defineConfig, devices } from '@playwright/test';

const SHARED_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'https://www.leidos.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
    userAgent: SHARED_USER_AGENT,
  },

  timeout: 60000,

  projects: [
    // --- leidos.com projects ---
    {
      name: 'chromium',
      testMatch: '**/homepage.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: '**/homepage.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: '**/homepage.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: '**/homepage.spec.ts',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      testMatch: '**/homepage.spec.ts',
      use: { ...devices['iPhone 12'] },
    },

    // --- careers.leidos.com project ---
    // Note: careers.leidos.com uses Cloudflare Turnstile bot protection which may
    // block headless browsers. Tests are skipped in CI unless CAREERS_TESTS_ENABLED=true.
    {
      name: 'careers',
      testMatch: '**/careers.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://careers.leidos.com',
        userAgent: SHARED_USER_AGENT,
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled'],
        },
      },
    },
  ],
});
