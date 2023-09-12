import '../support/commands';
import { Faker, en } from '@faker-js/faker';

const faker = new Faker({ locale: [en] });
const apiconfig = require('../apiconfig.json');
const { login, getproducts, getproductswithtoken, createProduct, updateProduct} = require('../support/apiUtils');
const loginuser = require('../fixtures/loginuser.json');

const productId = 8;
const payload = {

  cost: faker.number.int({ min: 100, max: 90000 }),
  quantity: faker.number.int({ min: 100, max: 500 }),
  locationId: faker.number.int({ min: 1, max: 5 }),
  DealerId: faker.number.int({ min: 1, max: 5 })
}
var statusCode;
describe('Update', () => {
  it('Validate user is able to update existing products', () => {
    login(`${loginuser.email}`, `${loginuser.password}`)
      .then((result) => {
        const accessToken = result.access_token; // Access the access_token
        updateProduct(payload, accessToken, productId).then((response) => {
          statusCode = response.status; // Set the status code to statusCode
          expect(statusCode).to.equal(200); // Assert the status code here
          expect(response.body.quantity).to.eq(payload.quantity);
          cy.logger('apitest', 'Validate user is able to create new products -- Test Passed');
          cy.logger('apitest', JSON.stringify(response.body, null, 2));
        });
      });
  });

  it('Second Test: Wait for Status Code 200', () => {
   if(statusCode == 200)
   {
    cy.wait(2500)
     // Now you can use 'statusCode' in your assertions or other tests
     cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
    }).then((response) => {
      expect(statusCode).to.equal(200);
    });
  }
})
  it('Third Test: Another Test Block', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
    }).then((response) => {
      expect(statusCode).to.equal(200);
    });
  });
});