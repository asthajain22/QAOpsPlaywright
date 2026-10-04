// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2,
  //workers: 3,
  /* Maximum time one test can run for */
  timeout: 30*1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name : 'safari',
      use: {
    browserName: 'webkit',
    headless: true,
    screenshot: 'off',
    trace: 'on', //off,on
    ...devices['iPhone 11']
      }
    },
    {
      name : 'chrome',
      use: {
      browserName: 'chromium',
      headless:true,
      screenshot: 'on',
      video: 'retain-on-failure',
      trace: 'on',
      ignoreHTTPSErrors: true,
      permissions: ['geolocation'],
      //viewport: {width: 720,height: 720}
      }
    }
  ]

  //it can also be written in this way
  //const config = ({ testDir:40*1000});  creating 1 config variable which holds all the information required nto run the tests
  //module.exports = config  export config variable so that it is available across all files in the project

});

