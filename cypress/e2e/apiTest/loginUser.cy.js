import '../../support/commands';

describe('Login to API',()=>{
    it('POST Call',()=>{
        cy.fixture('loginuser.json').then((requestBody) => {
            // Make a POST request with the loaded request body
            cy.request({
              method: 'POST',
              url: 'https://mobilestoreapi.onrender.com/auth/login',
              body: requestBody, // Use the loaded request body
            }).then((response) => {
              // Assertions or actions based on the response
              expect(response.status).to.eq(200); // Check the response status code
              cy.logger('apitest',"Access Token for Login User");
             cy.logger('apitest',"access_token:"+response.body.access_token);
            });
          });
    })
})