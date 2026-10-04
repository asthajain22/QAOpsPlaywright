// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 30*1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
    screenshot: 'on',
    trace: 'on' //off,on
  },

  //it can also be written in this way
  //const config = ({ testDir:40*1000});  creating 1 config variable which holds all the information required nto run the tests
  //module.exports = config  export config variable so that it is available across all files in the project

});

