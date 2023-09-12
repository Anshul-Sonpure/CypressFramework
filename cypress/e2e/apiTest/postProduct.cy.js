import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login,createProduct } = require('../../support/apiUtils');
const loginuser = require('../../fixtures/loginuser.json');

const payload={
  name:faker.commerce.productName(),
  cost:faker.number.int({ min: 100, max: 90000}),
  quantity: faker.number.int({ min: 100, max: 500 }),
  locationId: faker.number.int({ min: 1, max: 5 }),
  DealerId: faker.number.int({ min: 1, max: 5 })
}

describe('Create new products', () => {
  it('Validate user is able to create new products', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)
    .then((result) => {
      const accessToken = result.access_token; // Access the access_token
      createProduct(payload, accessToken).then((response) => {
        expect(response.status).to.eq(201); 
        expect(response.body.name).to.eq(payload.name);
        cy.logger('apitest','Validate user is able to create new products -- Test Passed');
        cy.logger('apitest',JSON.stringify(response.body, null, 2));
      });
    })
  })

})