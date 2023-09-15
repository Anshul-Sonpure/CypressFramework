const { defineConfig } = require('cypress');
const mysql = require('mysql')
const reportDir = process.env.REPORT_DIR || 'cypress/reports';
const reportName = process.env.REPORT_NAME || 'TestReport';


module.exports = defineConfig({
  projectId: "kveppv",
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: `${reportDir}/${reportName}`, // Report directory based on environment variables
    overwrite: false, // Set to true to overwrite reports on each run
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task',
        {
          queryDb: query => { return queryTestDb(query, config) },
        });
    },
  },
  "env": {
    "db": {
      "host": "db4free.net",
      "user": "mobilestoreuser",
      "password": "mobilestoreuser",
      "database": "mymobilestore"
    }
  }
})

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
          if (error) reject(error)
          else {
              connection.end()
              return resolve(results)
          }
      })
  })
}