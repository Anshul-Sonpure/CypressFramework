import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { login } = require('../../support/apiUtils');
const loginuser = require('../../fixtures/loginuser.json');


describe('Login to API to get valid access_token', () => {
  it('login with correct email & password', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)
      .then((result) => { // Receive the object containing response and access_token
        const response = result.response; // Access the entire response object
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);
        // Assert that the response body contains the 'access_token' property
        expect(response.body).to.have.property('access_token').that.is.not.empty;
        const responseBodyString = JSON.stringify(response.body, null, 2);
        cy.logger('apitest', 'Validated login with correct email & password');
        cy.logger('apitest', response.body.access_token);
      })
  })
  it('login with incorrect email & password', () => {
    login(`${loginuser.incorrectemail}`, `${loginuser.password}`)
      .then((result) => { // Receive the object containing response and access_token
        const response = result.response; // Access the entire response object
        // Assert that the response status code is 200
        expect(response.status).to.eq(401);
        // Assert that the response body contains the 'access_token' property
        expect(response.body.message).to.eq('Incorrect email or password');


      })
  })


})