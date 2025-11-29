import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config = ({
  testDir: './tests',
 // testMatch: '**/childwindow.js',
  //testMatch : '**/signinpageendtoend.js',
  //testMatch : '**/endtoendcode.spec.js',
  timeout: 40000,
  expect:{
    timeout : 4000
  },
  reporter : 'html',
  use:{
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure',

  },


});

module.exports=config