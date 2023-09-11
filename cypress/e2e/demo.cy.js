import '../support/commands';
const apiconfig = require('../apiconfig.json');
const { login } = require('../support/loginUtils');
const loginuser = require('../fixtures/loginuser.json');
describe('get call', () => {
  it('Login and perform actions', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)
    .then((result) => {
      const accessToken = result.access_token; // Access the access_token
      cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`, // Replace with your endpoint
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        // Perform assertions or actions on the response
        expect(response.status).to.eq(200);
        const responseBodyString = JSON.stringify(response.body, null, 2); 
        cy.log(responseBodyString);
      })
    })
  })
})