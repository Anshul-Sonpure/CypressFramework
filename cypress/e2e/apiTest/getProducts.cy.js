import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { JSONPath } = require('jsonpath-plus');
const { login, getproducts, getproductswithouttoken } = require('../../support/apiUtils');
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
          expect(productNames).to.include('Samsung Galaxy A23 Blue','Redmi 11 Prime 5G','Samsung Galaxy Flip 5G');

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
          const A23Price  = JSONPath({ path: '$.[0].cost', json: response.body });
          const M33Name = JSONPath({ path: '$.[2].name', json: response.body });
          // Assertion for products
          expect(M33Name[0]).to.equal('Samsung Galaxy M33 5G ');
          expect(A23Price).to.deep.eq([18999]);
          cy.log(JSON.stringify(response.body, null, 2))
        })
      })
  })

  it('Validation for revoked access token', () => {
    const accessToken = `${loginuser.revokedtoken}`;
    getproducts(accessToken).then((response) => {
      // Assertion for the status code
      expect(response.status).to.eq(401); // validate status code as 401

      // Assertion for the error message
      expect(response.body.message).to.eq('Error access_token is revoked');
    })
  })

  it('Validation for no Auth Token Send', () => {
    getproductswithouttoken().then((response) => {
      // Assertion for the status code
      expect(response.status).to.eq(401); // validate status code as 401

      // Assertion for the error message
      expect(response.body.message).to.eq('Error in authorization format');
    })
  })
})
