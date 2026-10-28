import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/',
 
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,
 
  workers: process.env.CI ? 1 : undefined,

  reporter:[
    ['html', { open: 'always' }]
  ] ,
  
  use: {
   headless:false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry'
  },


projects: [
    {
        name: 'setup',
        testMatch: /.*\.setup\.js/
    },
    {
        name: 'chromium',
        use: {
            ...devices['Desktop Chrome'],
            storageState: 'playwright/.auth/user.json'
        },
        dependencies: ['setup']
    }
]

});

