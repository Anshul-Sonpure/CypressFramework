import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { JSONPath } = require('jsonpath-plus');


describe('Get all products', () => {
    let access_token;
    let revoked_token;
    beforeEach(() => {
        // Read the access token from apitest.log under the logs folder
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
          });
        });
  
it('GET Request with Bearer Token', () => {
      // Verify that the access token was successfully obtained
      expect(access_token).to.exist;
  
      // Make a GET request with the Bearer token in the Authorization header
      cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`, 
        headers: {
            Authorization:'Bearer '+access_token,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // validate status code as 200 OK
        const productNames = JSONPath({ path: '$..name', json: response.body });

        // Assertion for products
        expect(productNames).to.include('Samsung Galaxy A23 Blue');
        expect(productNames).to.include('Samsung Galaxy S23 Blue');

        //logging the reponse in log file;
        const responseBodyString = JSON.stringify(response.body, null, 2); 
        cy.logger('apitest',"\n"+'Validated products for getproduct call'+"\n");
        cy.logger('apitest','Response Body:\n'+responseBodyString);
      });
});

it('Validation on the request body',()=>{
        // Verify that the access token was successfully obtained
      expect(access_token).to.exist;
  
      // Make a GET request with the Bearer token in the Authorization header
      cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`, 
        headers: {
            Authorization:'Bearer '+access_token,
        },
      }).then((response) => {
        
        expect(response.status).to.eq(200); // validate status code as 200 OK
        const quantityValue = JSONPath({ path: '$[?(@.name === "Samsung Galaxy A23 Blue")].quantity', json: response.body });
        const appleprice = JSONPath({ path: '$.[6].cost', json: response.body });
        const oneplusDealerId = JSONPath({path: '$.[2].DealerId', json: response.body });
        // Assertion for products
        expect(quantityValue).to.deep.eq([100]); 
        expect(appleprice).to.deep.eq(['67000']); 
        expect(oneplusDealerId).to.deep.eq([3]);
      });

})

it('Validation for revoked access token', () => {
    // Make a GET request with the revoked token in the Authorization header
    cy.request({
      method: 'GET',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
      headers: {
        Authorization: 'Bearer ' + revoked_token,
      },
      failOnStatusCode: false, // Add this option to prevent the request from failing due to StatusCode
    }).then((response) => {
      // Assertion for the status code
      expect(response.status).to.eq(401); // validate status code as 401
  
      // Assertion for the error message
      expect(response.body.message).to.eq('Error access_token is revoked');
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
      // Assertion for the status code
      expect(response.status).to.eq(401); // validate status code as 401
  
      // Assertion for the error message
      expect(response.body.message).to.eq('Error in authorization format');
    });
  });


});
  