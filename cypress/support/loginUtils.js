import '../support/commands';
const apiconfig = require('../apiconfig.json');

function login(email, password) {
    return cy.request({
        method: 'POST',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.login}`, // Replace with your login endpoint
        body: {
            email: email,
            password: password,
        },
    }).then((response) => {
        return {
            response: response, // Include the entire response object
            access_token: response.body.access_token, // Include the access token
          };
    });
}
module.exports = {
    login,
};