import '../support/commands';
const apiconfig = require('../apiconfig.json');

function login(email, password) {
    return cy.request({
        method: 'POST',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.login}`, 
        body: {
            email: email,
            password: password,
        },
        failOnStatusCode: false, // Ignore the status code and continue the test
    }).then((response) => {
        return {
            response: response, // Return the response and access_token
            access_token: response.body.access_token, 
          };
    });
}


function getproducts(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getproductswithouttoken()
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
        headers: {
          Authorization:"",
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}


function createProduct(payload, accessToken) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }

  function updateProduct(payload, accessToken, id) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }
  
  function updateProductwithoutToken(payload, id) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${id}`,
      headers: {
        Authorization: " ",
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }

  function deleteProduct(accessToken, id) {
    return cy.request({
      method: 'DELETE',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }



module.exports = {
    login,
    getproducts,
    getproductswithouttoken,
    createProduct,
    updateProduct,
    updateProductwithoutToken,
    deleteProduct
  };