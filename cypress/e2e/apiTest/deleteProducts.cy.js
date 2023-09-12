import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login,deleteProduct } = require('../../support/apiUtils');
const loginuser = require('../../fixtures/loginuser.json');

const productId = 6;

describe('Delete Product', () => {
    it('Validate user is able to delete existing products', () => {
        login(`${loginuser.email}`, `${loginuser.password}`)
            .then((result) => {
                const accessToken = result.access_token; // Access the access_token
                deleteProduct(accessToken, productId).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.logger('apitest', 'Validate user is able to delete products -- Test Passed');
                    cy.logger('apitest', JSON.stringify(response.body, null, 2));
                });
            })
    })
})