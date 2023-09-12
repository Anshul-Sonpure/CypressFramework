import '../support/commands';
const apiconfig = require('../apiconfig.json');


function createProduct(payload, accessToken) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
      failOnStatusCode: false, // Ignore the status code and continue the test
    }).then((response) => {
      return response; // Return the response directly
    });
  }
  
module.exports = {
    createProduct,
};