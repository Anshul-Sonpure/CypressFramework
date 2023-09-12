const { defineConfig } = require('cypress');

const reportDir = process.env.REPORT_DIR || 'cypress/reports';
const reportName = process.env.REPORT_NAME || 'TestReport';

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: `${reportDir}/${reportName}`, // Report directory based on environment variables
    overwrite: false, // Set to true to overwrite reports on each run
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
