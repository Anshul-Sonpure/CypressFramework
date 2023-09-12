import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { JSONPath } = require('jsonpath-plus');
const { login } = require('../../support/loginUtils');
const { getproducts, getproductswithtoken } = require('../../support/getProductsUtils');
const loginuser = require('../../fixtures/loginuser.json');


describe('Get all products', () => {

  it('GET Request with Bearer Token', () => {
    // Call the login function to log in and get the access token
    login(`${loginuser.email}`, `${loginuser.password}`)
      .then((result) => {
        const accessToken = result.access_token;
        getproducts(accessToken).then((response) => {
          expect(response.status).to.eq(200); // validate status code as 200 OK
          const productNames = JSONPath({ path: '$..name', json: response.body });

          // Assertion for products
          expect(productNames).to.include('Samsung Galaxy A23 Blue');
          expect(productNames).to.include('Samsung Galaxy S23 Blue');

          //logging the reponse in log file;
          const responseBodyString = JSON.stringify(response.body, null, 2);
          cy.logger('apitest', "\n" + 'Validated products for getproduct call' + "\n");
          cy.logger('apitest', 'Response Body:\n' + responseBodyString);
        })

      })
  })


  it('Validation on the request body', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)
      .then((result) => {
        const accessToken = result.access_token;
        getproducts(accessToken).then((response) => {

          expect(response.status).to.eq(200); // validate status code as 200 OK
          const quantityValue = JSONPath({ path: '$[?(@.name === "Samsung Galaxy A23 Blue")].quantity', json: response.body });
          const appleprice = JSONPath({ path: '$.[6].cost', json: response.body });
          const oneplusDealerId = JSONPath({ path: '$.[2].DealerId', json: response.body });
          // Assertion for products
          expect(quantityValue).to.deep.eq([100]);
          expect(appleprice).to.deep.eq(['67000']);
          expect(oneplusDealerId).to.deep.eq([3]);
        })
      })
  })

  it('Validation for revoked access token', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)

    const accessToken = `${loginuser.revokedtoken}`;
    getproducts(accessToken).then((response) => {
      // Assertion for the status code
      expect(response.status).to.eq(401); // validate status code as 401

      // Assertion for the error message
      expect(response.body.message).to.eq('Error access_token is revoked');
    })
  })

  it('Validation for authorization format', () => {
    // login(`${loginuser.incorrectemail}`, `${loginuser.password}`).then((result) => {
    //   const accessToken = result.access_token;
    getproductswithtoken().then((response) => {
        // Assertion for the status code
        expect(response.status).to.eq(401); // validate status code as 401

        // Assertion for the error message
        expect(response.body.message).to.eq('Error in authorization format');
      })
    })
  })
