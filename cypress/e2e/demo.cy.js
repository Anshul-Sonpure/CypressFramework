import '../support/commands';
const apiconfig = require('../apiconfig.json');
describe('get call',()=>{
  let access_token;
  let revoked_token;
  beforeEach(() => {
      // Read the access token from apilogs.log under the logs folder
      cy.readFile('cypress/logs/apitest.log').then((fileContent) => {
          // Split the file content into lines
          const lines = fileContent.split(' ').reverse();
          const revokedlines = fileContent.split(' ');
          // Find the line that starts with 'access_token:'
          const accessTokenLine = lines.find((line) => line.startsWith('access_token:'));
          const revokedaccessTokenLine = revokedlines.find((line) => line.startsWith('access_token:'));
          // Extract the access token from the line (remove the 'access_token:' prefix)
          access_token = accessTokenLine.split('[')[0].trim().replace(/access_token:/g, '').trim();
          revoked_token = revokedaccessTokenLine.split('[')[0].trim().replace(/access_token:/g, '').trim();
          // cy.log(access_token);
          // cy.log("revoked_token"+revoked_token);
        });
      });

      it.only('Validation for authorization format', () => {
        
        // Make a GET request with the revoked token in the Authorization header
        cy.request({
          method: 'GET',
          url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
          headers: {
            Authorization:" ",
          },
          failOnStatusCode: false, // Add this option to prevent the request from failing due to StatusCode
        }).then((response) => {
          cy.log(access_token);
          // Assertion for the status code
          expect(response.status).to.eq(401); // validate status code as 401
      
          // Assertion for the error message
          expect(response.body.message).to.eq('Error in authorization format');
        });
      });
      


  })


