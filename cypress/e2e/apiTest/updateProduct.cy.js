import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login, updateProduct, updateProductwithoutToken } = require('../../support/apiUtils');
const loginuser = require('../../fixtures/loginuser.json');

const productId = 1;
const payload = {

    cost: faker.number.int({ min: 100, max: 90000 }),
    quantity: faker.number.int({ min: 100, max: 500 }),
    locationId: faker.number.int({ min: 1, max: 5 }),
    DealerId: faker.number.int({ min: 1, max: 5 })
}
describe('Update Products', () => {
    it('Validate user is able to update existing products', () => {
        login(`${loginuser.email}`, `${loginuser.password}`)
            .then((result) => {
                const accessToken = result.access_token; // Access the access_token
                updateProduct(payload, accessToken, productId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.quantity).to.eq(payload.quantity);
                    cy.logger('apitest', 'Validate user is able to update existing products -- Test Passed');
                    cy.logger('apitest', JSON.stringify(response.body, null, 2));
                });
            })
    })
    it('Validate if no auth token send', () => {
      
            cy.wait(2500)
            updateProductwithoutToken(payload, productId).then((response) => {
            // Assertion for the status code
            expect(response.status).to.eq(401); // validate status code as 401

            // Assertion for the error message
            expect(response.body.message).to.eq('Error in authorization format');
        });
       
    })
    it('Validate if Token is revoked', () => {
        cy.wait(2500)
        const accessToken = `${loginuser.revokedtoken}`;
        updateProduct(payload, accessToken, productId).then((response) => {
            // Assertion for the status code
            expect(response.status).to.eq(401); // validate status code as 401

            // Assertion for the error message
            expect(response.body.message).to.eq('Error access_token is revoked');
        });
    })

})
