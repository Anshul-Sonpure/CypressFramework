import '../support/commands';
const apiconfig = require('../apiconfig.json');

function getproducts(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, // Ignore the status code and continue the test
      }).then((response) => {
        return response;
      })
}

function getproductswithtoken()
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
        headers: {
          Authorization:"",
        },
        failOnStatusCode: false, // Ignore the status code and continue the test
      }).then((response) => {
        return response;
      })
}

module.exports = {
  getproducts,
  getproductswithtoken,
};