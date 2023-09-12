import { before } from "mocha";
import Login from "../PageClass/Login";
import AddProduct from "../PageClass/AddProduct";
import '../support/commands';
const startTime = Date.now();
describe('Validate User is able to make Purchase',()=>{

    beforeEach(() => {
        // Launch the application URL
        cy.visit('https://www.demoblaze.com/');
        cy.logger('application',"Launched Application-->Login Test");
      });

      it('Validate Add Product',()=> {
        cy.viewport(1920, 1080);
        cy.fixture('product').then((data) => {
            const loginobj = new Login();
                       loginobj.clickLogin();
                       loginobj.setUserName(data.UserName);
                       loginobj.setPassword(data.UserPassword);
                       cy.logger('application',"Entered User Details-->Login Test");
                       loginobj.clickLoginbtn();
                       loginobj.verifyLoginSuccessMsg(data.loginmsg);
                       cy.logger('application',"Validated success Login Msg-->Login Test");
                       const prdobj = new AddProduct();
                       prdobj.addProduct();
                       prdobj.enterName(data.name);
                       prdobj.entercountry(data.Country);
                       prdobj.entercity(data.City);
                       prdobj.entercard(data.Creditcard);
                       prdobj.entermonth(data.Month);
                       prdobj.enteryear(data.Year);
                       prdobj.clickPurchase();
                       prdobj.validateOrder();
                       const loadTime = Date.now() - startTime;
                cy.logger('performance',`TotalTime taken to Purchase Product: ${loadTime}ms`);
             
      })



    })

})
